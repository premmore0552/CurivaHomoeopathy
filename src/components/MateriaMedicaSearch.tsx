
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Book, ArrowRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  snippet?: string;
  keynotes?: string;
}

export default function MateriaMedicaSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [registry, setRegistry] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('mm_search_history');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('mm_search_history', JSON.stringify(newHistory));
  };

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const res = await fetch('/data/materia-medica/search-index.json');
        if (!res.ok) throw new Error(`Search index not found (${res.status})`);
        
        const isJson = res.headers.get('content-type')?.includes('application/json');
        if (!isJson) throw new Error('Search index response is not JSON');
        
        const data = await res.json();
        setRegistry(data.map((r: any) => ({ ...r, category: 'Remedy' })));
      } catch (err) {
        console.error('Failed to load search index', err);
      }
    };
    fetchIndex();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && e.target instanceof HTMLBodyElement) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = registry
      .filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.slug.toLowerCase().includes(q) ||
        (r.snippet && r.snippet.toLowerCase().includes(q)) ||
        (r.keynotes && r.keynotes.toLowerCase().includes(q))
      )
      .slice(0, 8);
    
    setResults(filtered);
    setSelectedIndex(0);
  }, [query, registry]);

  const handleSelect = (slug: string) => {
    const selectedResult = registry.find(r => r.slug === slug);
    if (selectedResult) {
      saveToHistory(selectedResult.title);
    }
    setIsOpen(false);
    setQuery('');
    navigate(`/homoeopathy/materia-medica/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].slug);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{part}</mark> 
        : part
    );
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[60] p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 transition-all group lg:left-auto lg:right-32"
        title="Search Materia Medica (/)"
      >
        <Search className="w-6 h-6" />
        <span className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Press <kbd className="font-sans font-bold">/</kbd> to search
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-border"
            >
              <div className="p-6 border-b border-border flex items-center gap-4">
                <Search className="w-6 h-6 text-primary" />
                <input 
                  ref={inputRef}
                  type="text"
                  placeholder="Search 1,200+ remedies and symptoms..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow bg-transparent border-none focus:ring-0 text-lg font-medium text-text-primary placeholder-text-tertiary"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-bg-secondary rounded-xl transition-colors text-text-tertiary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
                {results.length > 0 ? (
                  results.map((result, idx) => (
                    <button
                      key={result.slug}
                      onClick={() => handleSelect(result.slug)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all text-left ${
                        idx === selectedIndex 
                        ? 'bg-primary/10 border-primary/20 shadow-sm' 
                        : 'hover:bg-bg-secondary border-transparent'
                      } border`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                          idx === selectedIndex ? 'bg-primary text-white' : 'bg-bg-secondary text-text-tertiary'
                        }`}>
                          <Book className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`font-bold truncate transition-colors ${
                            idx === selectedIndex ? 'text-primary' : 'text-text-primary'
                          }`}>
                            {highlightMatch(result.title, query)}
                          </h4>
                          {result.snippet && (
                            <p className="text-[10px] text-text-tertiary line-clamp-1 italic font-serif mt-1">
                              {highlightMatch(result.snippet, query)}
                            </p>
                          )}
                          <span className="text-[9px] uppercase font-black tracking-widest text-primary/60">
                            {result.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-all ${
                        idx === selectedIndex ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-2'
                      }`} />
                    </button>
                  ))
                ) : query.trim() ? (
                  <div className="py-12 text-center text-text-tertiary">
                    <p className="text-sm font-medium">No matches found for "{query}"</p>
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    {history.length > 0 && (
                      <div className="space-y-2 px-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary px-2">Recent Searches</h4>
                        <div className="flex flex-wrap gap-2">
                          {history.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => setQuery(term)}
                              className="px-4 py-2 rounded-full bg-bg-secondary hover:bg-primary/10 hover:text-primary border border-border text-xs font-bold transition-all"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                        <Command className="w-8 h-8 text-primary/40" />
                      </div>
                      <p className="text-sm text-text-tertiary font-medium">
                        Search by remedy name or clinical symptom...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-bg-secondary border-t border-border flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><kbd className="bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-border shadow-sm">Enter</kbd> to select</span>
                  <span className="flex items-center gap-1"><kbd className="bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-border shadow-sm">↑↓</kbd> to navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-border shadow-sm">Esc</kbd> to close
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
