import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowRight, Zap, BookOpen, Activity, Sparkles, 
  GraduationCap, Compass, BookMarked, History, X, Mic, 
  MicOff, Globe, Loader2, Info, Keyboard, CornerDownLeft, 
  AlertCircle, CheckCircle, Flame, Sparkle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useRole } from '../context/RoleContext';
import { 
  searchGlobalIndex, 
  getSearchSuggestions, 
  SearchDocument, 
  SearchResult, 
  levenshteinDistance 
} from '../utils/searchIndex';

export default function SearchAutocomplete({ hideTrigger = false }: { hideTrigger?: boolean }) {
  const { currentRole } = useRole();
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'remedy' | 'aphorism' | 'clinical' | 'academics' | 'article'>('all');

  // Automatically adjust search filter preferences when the modal opens or role is changed
  useEffect(() => {
    if (isModalOpen) {
      if (currentRole === 'BHMS Student' || currentRole === 'Faculty') {
        setActiveFilter('academics');
      } else if (currentRole === 'Intern' || currentRole === 'Practitioner' || currentRole === 'Researcher') {
        setActiveFilter('remedy');
      } else if (currentRole === 'General Public' || currentRole === 'Guest') {
        setActiveFilter('article');
      } else {
        setActiveFilter('all');
      }
    }
  }, [currentRole, isModalOpen]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Google Custom Search states
  const [isGoogleSearching, setIsGoogleSearching] = useState(false);
  const [googleResults, setGoogleResults] = useState<any[]>([]);
  const [googleSearchError, setGoogleSearchError] = useState<string | null>(null);
  const [searchedGoogle, setSearchedGoogle] = useState(false);
  const [isUsingGoogleFallback, setIsUsingGoogleFallback] = useState(false);

  // Voice Search states
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load Search History and check Voice support
  useEffect(() => {
    const history = localStorage.getItem('curiva_global_search_history');
    if (history) {
      try {
        setSearchHistory(JSON.parse(history).slice(0, 5));
      } catch (e) {
        setSearchHistory([]);
      }
    } else {
      // Pre-seed some history if empty
      setSearchHistory(["Arnica montana", "Vital Force", "Aphorism 1"]);
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
    }
  }, []);

  // Keyboard shortcut CMD+K or Ctrl+K to open search console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    const handleCustomOpen = () => {
      setIsModalOpen(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Execute instant local search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      setGoogleResults([]);
      setSearchedGoogle(false);
      return;
    }

    // Measure execution performance (instantly under 1 second constraint)
    const t0 = performance.now();
    const searchResults = searchGlobalIndex(query, activeFilter);
    const t1 = performance.now();
    
    // Limit to top 15 results for speedy rendering
    setResults(searchResults.slice(0, 15));
    setSelectedIndex(0);

    // Get autocomplete word suggestions
    const autocompleteSuggestions = getSearchSuggestions(query);
    setSuggestions(autocompleteSuggestions.slice(0, 4));

    // Clear google results when query changes
    setGoogleResults([]);
    setSearchedGoogle(false);
  }, [query, activeFilter]);

  // Focus modal input on open
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsListening(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Voice recognition handler
  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  // Trigger server-side Google Custom Search API
  const handleGoogleWebSearch = async () => {
    if (!query.trim()) return;
    setIsGoogleSearching(true);
    setGoogleSearchError(null);
    setSearchedGoogle(true);

    try {
      const response = await fetch('/api/custom-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to Google Custom Search Proxy");
      }

      const data = await response.json();
      setGoogleResults(data.items || []);
      setIsUsingGoogleFallback(!!data.usingFallback);
    } catch (err: any) {
      console.error(err);
      setGoogleSearchError(err.message || "An error occurred executing global web search.");
    } finally {
      setIsGoogleSearching(false);
    }
  };

  // Keyboard navigation inside result lists
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    const totalResults = results.length + (googleResults.length > 0 ? googleResults.length : 0);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalResults));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResults) % Math.max(1, totalResults));
    } else if (e.key === 'Escape') {
      setIsModalOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && selectedIndex < results.length) {
        handleSelectDoc(results[selectedIndex].doc);
      } else if (googleResults.length > 0 && selectedIndex >= results.length) {
        const gIdx = selectedIndex - results.length;
        window.open(googleResults[gIdx].link, '_blank', 'noopener,noreferrer');
      } else {
        // No items selected, trigger search page navigation or google search fallback
        handleSearchSubmit();
      }
    }
  };

  const handleSelectDoc = (doc: SearchDocument) => {
    // Add to Recent Searches history
    const updatedHistory = [doc.title, ...searchHistory.filter(item => item !== doc.title)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('curiva_global_search_history', JSON.stringify(updatedHistory));

    setIsModalOpen(false);
    setQuery('');
    navigate(doc.link);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      const updatedHistory = [query.trim(), ...searchHistory.filter(item => item !== query.trim())].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('curiva_global_search_history', JSON.stringify(updatedHistory));

      setIsModalOpen(false);
      navigate(`/clinical-guides?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('curiva_global_search_history');
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
  };

  // Highlight matched substrings cleanly
  const highlightText = (text: string, q: string) => {
    if (!q.trim()) return text;
    // escape regex special chars
    const escapedQ = q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQ})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary font-bold px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  // Determine Icon for medical category types
  const getIcon = (type: string) => {
    switch (type) {
      case 'remedy': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'ailment': return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'article': return <BookOpen className="w-4 h-4 text-sky-500" />;
      case 'aphorism': return <BookMarked className="w-4 h-4 text-primary" />;
      case 'anatomy': return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'physiology': return <GraduationCap className="w-4 h-4 text-rose-500" />;
      case 'fmt': return <Compass className="w-4 h-4 text-purple-500" />;
      case 'glossary': return <Info className="w-4 h-4 text-indigo-500" />;
      case 'stalwart': return <History className="w-4 h-4 text-zinc-500" />;
      default: return <Sparkles className="w-4 h-4 text-primary" />;
    }
  };

  // Label style matches
  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'remedy': return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'ailment': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'article': return 'bg-sky-50 text-sky-600 border border-sky-100';
      case 'aphorism': return 'bg-primary/5 text-primary border border-primary/10';
      case 'anatomy': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'physiology': return 'bg-rose-50 text-rose-600 border border-rose-100';
      case 'fmt': return 'bg-purple-50 text-purple-600 border border-purple-100';
      case 'glossary': return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
      case 'stalwart': return 'bg-zinc-50 text-zinc-600 border border-zinc-100';
      default: return 'bg-primary/5 text-primary border border-primary/10';
    }
  };

  // Generate typo corrections using Levenshtein distance
  const getTypoSuggestions = (): string[] => {
    if (!query.trim() || query.length < 3) return [];
    // Only return if results are empty
    if (results.length > 0) return [];
    
    // Match against primary list of medical words
    const commonVocabulary = [
      "Arnica", "Belladonna", "Bryonia", "Aconite", "Sulphur", "Calcarea", "Lycopodium", "Nux vomica", "Pulsatilla", "Silicea",
      "Miasm", "Psora", "Sycosis", "Syphilis", "Organon", "Aphorism", "Vital Force", "Potentization", "Succussion", "Trituration",
      "Anatomy", "Clavicle", "Physiology", "Homeostasis", "Forensic", "Toxicology", "Autopsy", "Misconduct", "Hemogram"
    ];

    return commonVocabulary
      .filter(term => {
        const dist = levenshteinDistance(term.toLowerCase(), query.toLowerCase());
        return dist > 0 && dist <= 2; // tolerates 1 or 2 letter changes
      })
      .slice(0, 3);
  };

  const typoCorrections = getTypoSuggestions();

  return (
    <>
      {/* Outer Click Trigger Bar (Algolia styled) */}
      {!hideTrigger && <div 
        ref={containerRef} 
        onClick={() => setIsModalOpen(true)}
        className="relative group w-full md:w-60 lg:w-72 cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 pl-4 pr-3 py-2.5 bg-bg-secondary hover:bg-white dark:hover:bg-zinc-800 border border-border rounded-full shadow-inner hover:shadow-soft hover:border-primary/40 transition-all">
          <Search className="text-text-secondary group-hover:text-primary w-4 h-4 transition-colors" />
          <span className="text-xs font-semibold text-text-tertiary flex-1 truncate">
            Search remedies, clinical guides...
          </span>
          <kbd className="hidden xl:inline-flex items-center h-5 px-1.5 font-sans text-[9px] font-black uppercase bg-bg-primary text-text-tertiary rounded border border-border select-none shrink-0 tracking-widest gap-0.5">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>
      </div>}

      {/* Modern Blurred Full-Screen Modal Search Console */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] overflow-y-auto">
            {/* Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md"
            />

            {/* Inner Console Container */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onKeyDown={handleModalKeyDown}
                className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl border border-border dark:border-zinc-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden max-h-[85vh]"
              >
                {/* 1. Header Search Input Bar */}
                <div className="flex items-center gap-4 px-6 py-4.5 border-b border-border dark:border-zinc-800 bg-bg-secondary/40">
                  <Search className="w-5 h-5 text-primary shrink-0" />
                  
                  <input
                    ref={modalInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search remedies, aphorisms, anatomy modules, diagnostic tools, clinical cases..."
                    className="flex-1 min-w-0 bg-transparent border-none text-text-primary dark:text-white font-sans text-base font-medium focus:outline-none placeholder-text-tertiary"
                  />

                  {/* Micro Indicators & Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Voice Search Button */}
                    {voiceSupported && (
                      <button
                        onClick={handleVoiceSearch}
                        className={`p-2 rounded-xl transition-all ${
                          isListening 
                          ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/20' 
                          : 'bg-white dark:bg-zinc-800 text-text-secondary hover:text-primary hover:shadow-soft border border-border dark:border-zinc-700'
                        }`}
                        title="Voice Search"
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    )}

                    {/* Clear Button */}
                    {query && (
                      <button
                        onClick={() => {
                          setQuery('');
                          modalInputRef.current?.focus();
                        }}
                        className="p-2 rounded-xl bg-white dark:bg-zinc-800 text-text-secondary hover:text-primary hover:shadow-soft border border-border dark:border-zinc-700 transition-all"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {/* Close Console ESC Key helper */}
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-1.5 text-[10px] font-black uppercase text-text-tertiary bg-white dark:bg-zinc-800 hover:text-primary border border-border dark:border-zinc-700 rounded-lg shadow-sm font-mono tracking-widest hidden sm:inline-block select-none shrink-0"
                    >
                      esc
                    </button>
                  </div>
                </div>

                {/* 2. Intelligent Search Filter Category Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto px-6 py-3 border-b border-border dark:border-zinc-800/80 scrollbar-none bg-white dark:bg-zinc-900 shrink-0">
                  {[
                    { id: 'all', label: 'All Content' },
                    { id: 'remedy', label: 'Remedies (MM)' },
                    { id: 'aphorism', label: 'Organon (Aphorisms)' },
                    { id: 'clinical', label: 'Clinical Guides & Glossary' },
                    { id: 'academics', label: 'Academics (Anatomy/Phys/FMT)' },
                    { id: 'article', label: 'Research & Pioneers' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setActiveFilter(filter.id as any);
                        modalInputRef.current?.focus();
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                        activeFilter === filter.id
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-bg-secondary text-text-secondary border-transparent hover:bg-bg-secondary/85 hover:text-text-primary'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* 3. Main Console Display Content area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-bg-secondary/10 dark:bg-zinc-900/40 min-h-[300px]">
                  
                  {/* Listening State Overlay */}
                  {isListening && (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-red-500/10 rounded-full scale-150 animate-ping" />
                        <div className="p-6 bg-red-500 text-white rounded-full relative z-10 shadow-lg shadow-red-500/25">
                          <Mic className="w-8 h-8" />
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-text-primary">Listening to Clinical Terms...</h4>
                      <p className="text-sm text-text-secondary mt-1">Speak clearly. Say remedy names or clinical conditions (e.g., "Arnica montana").</p>
                    </div>
                  )}

                  {/* ZERO-STATE: Recent searches & pre-seeded trending items */}
                  {!query.trim() && !isListening && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
                      {/* Left: Recent Searches History */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2 select-none">
                            <History className="w-4 h-4 text-primary" />
                            Recent Searches
                          </h4>
                          {searchHistory.length > 0 && (
                            <button 
                              onClick={clearHistory}
                              className="text-[10px] font-bold text-red-500 hover:underline hover:text-red-600 cursor-pointer"
                            >
                              Clear History
                            </button>
                          )}
                        </div>
                        {searchHistory.length > 0 ? (
                          <div className="space-y-1.5">
                            {searchHistory.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(item)}
                                className="w-full text-left px-4 py-2.5 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 rounded-xl text-xs font-bold text-text-primary hover:text-primary hover:border-primary/30 transition-all flex items-center justify-between group shadow-sm"
                              >
                                <span>{item}</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 rounded-2xl text-center shadow-sm">
                            <p className="text-xs text-text-secondary">Your recent search terms will appear here.</p>
                          </div>
                        )}
                      </div>

                      {/* Right: Trending / High-Yield Clinical Searches */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2 select-none">
                          <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                          Trending Searches
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Lycopodium clavatum",
                            "Vital Force",
                            "Aphorism 1",
                            "Clavicle applied anatomy",
                            "Homeostasis",
                            "Informed Consent",
                            "Nanoparticles",
                            "Arnica clinical study",
                            "Thanatology"
                          ].map((trending, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(trending)}
                              className="px-3.5 py-2 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 hover:border-primary/40 rounded-xl text-xs font-bold text-text-primary hover:text-primary transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-accent" />
                              {trending}
                            </button>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t border-border dark:border-zinc-800/80">
                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-start gap-3">
                            <Keyboard className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <h5 className="text-xs font-black text-text-primary uppercase tracking-wider">Keyboard Navigation shortcuts</h5>
                              <p className="text-[10.5px] text-text-secondary leading-relaxed mt-1">
                                Use <kbd className="font-mono bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 px-1 rounded shadow-sm text-text-primary">↑</kbd> and <kbd className="font-mono bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 px-1 rounded shadow-sm text-text-primary">↓</kbd> arrows to select, <kbd className="font-mono bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 px-1.5 rounded shadow-sm text-text-primary">Enter</kbd> to open page, and <kbd className="font-mono bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 px-1.5 rounded shadow-sm text-text-primary">Esc</kbd> to close.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE SEARCH: Suggestions bar */}
                  {query.trim() && suggestions.length > 0 && !isListening && (
                    <div className="flex flex-wrap items-center gap-2 select-none bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 px-4 py-2.5 rounded-2xl shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mr-1">AutoComplete suggestions:</span>
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(s)}
                          className="px-2.5 py-1 bg-bg-secondary hover:bg-primary/10 text-xs font-bold text-text-primary hover:text-primary rounded-lg border border-border hover:border-primary/20 transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ACTIVE SEARCH: LOCAL RESULTS MAPS */}
                  {query.trim() && !isListening && (
                    <div className="space-y-4">
                      {results.length > 0 ? (
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary px-1 mb-3">
                            Local Clinical Knowledge Base ({results.length} Matches)
                          </h4>
                          
                          <div className="space-y-2">
                            {results.map((result, idx) => {
                              const isSelected = idx === selectedIndex;
                              return (
                                <div
                                  key={result.doc.id}
                                  onClick={() => handleSelectDoc(result.doc)}
                                  onMouseEnter={() => setSelectedIndex(idx)}
                                  className={`p-4 bg-white dark:bg-zinc-800 border rounded-2xl transition-all cursor-pointer flex items-start gap-4 shadow-sm relative group ${
                                    isSelected 
                                    ? 'border-primary ring-1 ring-primary shadow-md' 
                                    : 'border-border dark:border-zinc-800 hover:border-primary/40'
                                  }`}
                                >
                                  {/* Item icon and indicator */}
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    isSelected ? 'bg-primary/10 text-primary' : 'bg-bg-secondary/80'
                                  }`}>
                                    {getIcon(result.doc.type)}
                                  </div>

                                  {/* Document core info */}
                                  <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <span className="text-sm font-bold text-text-primary dark:text-white truncate">
                                        {highlightText(result.doc.title, query)}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getTypeBadgeStyle(result.doc.type)}`}>
                                        {result.doc.type}
                                      </span>
                                      {result.doc.category && (
                                        <span className="text-[10px] text-text-tertiary font-mono">
                                          {result.doc.category}
                                        </span>
                                      )}
                                    </div>
                                    
                                    <p className="text-xs text-text-secondary dark:text-zinc-300 leading-relaxed font-normal line-clamp-2">
                                      {highlightText(result.snippet, query)}
                                    </p>
                                  </div>

                                  {/* Action instructions */}
                                  <div className="flex flex-col items-end self-center shrink-0">
                                    <ArrowRight className={`w-4 h-4 text-primary transition-all ${
                                      isSelected ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                                    }`} />
                                    {isSelected && (
                                      <span className="text-[8px] font-black uppercase tracking-wider text-primary mt-1 flex items-center gap-0.5 select-none animate-pulse">
                                        Open <CornerDownLeft className="w-2.5 h-2.5" />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        // Zero results Local view
                        <div className="p-8 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 rounded-3xl text-center shadow-sm">
                          <Compass className="w-10 h-10 text-text-secondary mx-auto mb-3" />
                          <h4 className="font-bold text-text-primary">No local study guides or remedies matched</h4>
                          <p className="text-xs text-text-secondary mt-1.5 max-w-md mx-auto leading-relaxed">
                            No indexed clinical guides or Materia Medica remedies found for "{query}".
                          </p>

                          {/* Typo Correction Suggestions */}
                          {typoCorrections.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border dark:border-zinc-700/50 flex flex-col items-center justify-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Did you mean?</span>
                              <div className="flex gap-2">
                                {typoCorrections.map((typo, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(typo)}
                                    className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-all"
                                  >
                                    {typo}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 4. GOOGLE CUSTOM SEARCH API BACKFALL INTEGRATION */}
                      <div className="pt-4 border-t border-border dark:border-zinc-800/80">
                        <div className="p-6 bg-gradient-to-br from-primary/5 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-primary/10 dark:border-zinc-850 rounded-3xl">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                                <Globe className="w-5 h-5 animate-pulse" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-text-primary">Scan Global Medical Research Live</h4>
                                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                                  Trigger secure real-time search proxies referencing PubMed clinical trials, high-dilution characterizations, and international medical libraries.
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={handleGoogleWebSearch}
                              disabled={isGoogleSearching}
                              className="px-5 py-2.5 bg-primary text-white hover:bg-primary/95 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
                            >
                              {isGoogleSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                              Search Web Live
                            </button>
                          </div>

                          {/* Google Custom Search Results display */}
                          {searchedGoogle && (
                            <div className="mt-6 pt-6 border-t border-border dark:border-zinc-800/80 space-y-4">
                              <div className="flex items-center justify-between text-[11px] font-bold text-text-secondary px-1">
                                <span className="flex items-center gap-1.5 text-primary">
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                  Google Search Verified Results
                                </span>
                                {isUsingGoogleFallback ? (
                                  <span className="bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-widest font-black">Curated Database Fallback</span>
                                ) : (
                                  <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-widest font-black">Search Engine Live Proxy</span>
                                )}
                              </div>

                              {isGoogleSearching ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
                                  <p className="text-xs text-text-secondary">Securing encrypted proxy request and fetching articles...</p>
                                </div>
                              ) : googleSearchError ? (
                                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-start gap-2 text-xs">
                                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                  <p>{googleSearchError}</p>
                                </div>
                              ) : googleResults.length === 0 ? (
                                <div className="p-4 bg-zinc-50 border border-border text-center rounded-xl text-xs text-text-secondary">
                                  No global web research matched this query. Try generic terms.
                                </div>
                              ) : (
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                  {googleResults.map((gDoc, gIdx) => {
                                    const indexInList = results.length + gIdx;
                                    const isSelected = indexInList === selectedIndex;
                                    return (
                                      <a
                                        key={gIdx}
                                        href={gDoc.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setSelectedIndex(indexInList)}
                                        className={`block p-4.5 bg-white dark:bg-zinc-850 border rounded-2xl transition-all shadow-sm relative group ${
                                          isSelected 
                                          ? 'border-primary ring-1 ring-primary' 
                                          : 'border-border dark:border-zinc-800 hover:border-primary/40'
                                        }`}
                                      >
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                                            <Globe className="w-2.5 h-2.5" />
                                            {gDoc.source}
                                          </span>
                                          {gDoc.date && gDoc.date !== "N/A" && (
                                            <span className="text-[10px] text-text-secondary font-mono">{gDoc.date}</span>
                                          )}
                                        </div>

                                        <h5 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">
                                          {gDoc.title}
                                        </h5>
                                        <p className="text-xs text-text-secondary leading-relaxed mt-1.5 line-clamp-2">
                                          {gDoc.snippet}
                                        </p>
                                        
                                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-border dark:border-zinc-800 text-[10px] text-text-secondary">
                                          <span>Verified Source: <span className="text-primary font-semibold">{gDoc.displayLink}</span></span>
                                          <span className="text-primary hover:underline font-bold flex items-center gap-1 transition-all">
                                            Read Publication <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                          </span>
                                        </div>
                                      </a>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}

                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* 4. Footer shortcuts bar */}
                <div className="px-6 py-4 border-t border-border dark:border-zinc-800 bg-bg-secondary/40 flex items-center justify-between text-xs text-text-tertiary select-none shrink-0 font-sans font-semibold">
                  <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 rounded shadow-sm text-text-primary text-[10px] font-mono font-black">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 rounded shadow-sm text-text-primary text-[10px] font-mono font-black">↵</kbd>
                      Open Link
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 rounded shadow-sm text-text-primary text-[10px] font-mono font-black">Esc</kbd>
                      Close
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Real-Time Index Active</span>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
