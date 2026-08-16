import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Filter, Heart, Brain, Shield, Library, 
  Search, Globe, Database, BookOpen, ArrowRight, 
  ExternalLink, Loader2, BookMarked, CheckCircle, AlertCircle 
} from 'lucide-react';
import SEO from '../components/SEO';
import AZIndex from '../components/AZIndex';
import { conditionsData } from '../data/conditionsData';
import { allBlogPosts } from '../data/blogPosts';

export default function ClinicalGuides() {
  const [activeTab, setActiveTab] = useState<'index' | 'search'>('index');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (link: string) => {
    navigate(link);
  };

  const categories = [
    { id: 'Nervous System', icon: Brain },
    { id: 'Diseases and Conditions', icon: Shield },
    { id: 'Lifestyle and Natural Healing', icon: Heart },
  ];

  const rawGuideItems = [
    ...conditionsData
      .filter(c => !activeCategory || c.category === activeCategory)
      .map(c => ({
        id: `cond-${c.id}`,
        name: c.title,
        category: 'Clinical Ailment Guide',
        description: c.category + ' Therapeutics',
        imageUrl: c.imageUrl,
        link: `/conditions/${c.id}`
      })),
    ...allBlogPosts
      .filter(p => p.category !== 'Materia Medica')
      .filter(p => !activeCategory || p.category === activeCategory)
      .map(p => ({
        id: `post-${p.id}`,
        name: p.title,
        category: 'Clinical Article',
        description: p.category,
        imageUrl: p.image,
        link: `/read/${p.slug}`
      }))
  ];

  // Uniqueify by ID to prevent duplicate keys
  const guideItems = Array.from(new Map(rawGuideItems.map(item => [item.id, item])).values());

  const quickSuggestions = [
    "Nanoparticles in Homoeopathy",
    "Arnica clinical trials",
    "Chronic eczema evidence",
    "High Dilution physicochemical studies",
    "ADD ADHD Homoeopathic treatment",
    "Individualized Homoeopathy vs placebo"
  ];

  const handleSearch = async (queryToSearch?: string) => {
    const q = queryToSearch !== undefined ? queryToSearch : searchQuery;
    if (!q.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearched(true);
    
    if (queryToSearch !== undefined) {
      setSearchQuery(queryToSearch);
    }
    
    try {
      const response = await fetch('/api/custom-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: q }),
      });
      
      if (!response.ok) {
        throw new Error('Search failed to complete. Please try again.');
      }
      
      const data = await response.json();
      setSearchResults(data.items || []);
      setUsingFallback(!!data.usingFallback);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while connecting to the search service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setActiveTab('search');
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Clinical Guides & Treatment Protocols | Curiva Homoeopathy"
        description="Explore detailed clinical guides, peer-reviewed therapeutics, and real-time medical research paper search."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-bg-secondary border-b border-border text-text-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-10 text-primary"
           >
             <Sparkles className="w-4 h-4 text-primary" /> Therapeutics & Evidence Reference
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-text-primary tracking-tighter leading-[0.85] mb-12 uppercase"
           >
             Clinical <br/> <span className="text-primary italic">Guides</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-relaxed"
           >
             Centralized therapeutic strategies, clinical patterns, and evidence-supported management of diseases and conditions.
           </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Segment Tabs */}
        <div className="flex border-b border-border mb-12">
          <button
            onClick={() => setActiveTab('index')}
            className={`flex items-center gap-2 pb-4 px-6 text-sm font-bold tracking-wider uppercase transition-all relative ${
              activeTab === 'index' 
                ? 'text-primary font-black' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Library className="w-4 h-4" />
            Therapeutic Index
            {activeTab === 'index' && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 pb-4 px-6 text-sm font-bold tracking-wider uppercase transition-all relative ${
              activeTab === 'search' 
                ? 'text-primary font-black' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Globe className="w-4 h-4" />
            Real-Time Research Search
            {activeTab === 'search' && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'index' ? (
            <motion.div
              key="index-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">
                    Therapeutic <span className="text-primary">Index</span>
                  </h2>
                  <p className="text-text-secondary font-medium mt-1">
                    Browse all treatment protocols and study guides alphabetically.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-border shadow-soft mr-2">
                    <Filter className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">Filter Guides</span>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${!activeCategory ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/50'}`}
                  >
                    All
                  </button>
                  {categories.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeCategory === cat.id ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/50'}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {cat.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AZIndex items={guideItems} onItemClick={handleItemClick} />

              {/* Quick Prompt to switch to Real-Time Search */}
              <div className="mt-16 bg-bg-secondary border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary mt-1">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Looking for peer-reviewed journal papers?</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Query our global real-time knowledge base search indexing medical journals, high-dilution studies, and clinical outcomes.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('search')}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0"
                >
                  Launch Research Search <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Search Hub Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">
                  Clinical & <span className="text-primary">Research Search</span>
                </h2>
                <p className="text-text-secondary font-medium mt-2 max-w-2xl mx-auto">
                  Scan global medical repositories, PubMed clinical trials, molecular research databases, and Homoeopathic clinical registries live.
                </p>
              </div>

              {/* Advanced Search Input Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-text-secondary" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter medical condition, remedy name, or research keywords..."
                  className="block w-full pl-12 pr-32 py-4 text-base bg-white border border-border rounded-2xl shadow-soft text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                />
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                  className="absolute right-2.5 top-2.5 px-6 py-2 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all shadow-sm disabled:bg-primary/50 flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
                </button>
              </div>

              {/* Suggestions Chips */}
              <div className="mb-10">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Suggested Medical Queries:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3.5 py-1.5 bg-bg-secondary border border-border hover:border-primary/50 text-xs font-semibold text-text-primary rounded-lg transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results Display Area */}
              <div className="space-y-6">
                {isLoading && (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-text-secondary font-medium">Scanning live medical databases and indexing publications...</p>
                  </div>
                )}

                {error && (
                  <div className="p-5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Search Service Error</h4>
                      <p className="text-xs mt-1 text-red-600">{error}</p>
                    </div>
                  </div>
                )}

                {!isLoading && !error && searched && searchResults.length === 0 && (
                  <div className="py-16 text-center border-2 border-dashed border-border rounded-2xl">
                    <BookMarked className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-text-primary">No research articles found</h3>
                    <p className="text-sm text-text-secondary mt-1 max-w-md mx-auto">
                      No matches found for "{searchQuery}". Try refining your keywords or searching general topics like "remedy nanotechnology" or "arnica trials".
                    </p>
                  </div>
                )}

                {!isLoading && !error && searchResults.length > 0 && (
                  <div className="space-y-6">
                    {/* Database Search Indicator Banner */}
                    <div className="flex items-center justify-between text-xs font-medium text-text-secondary px-2">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Showing {searchResults.length} real-time verified search results</span>
                      </div>
                      {usingFallback ? (
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Curated Academic Archive
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Google Search Index Live
                        </span>
                      )}
                    </div>

                    {/* Results Cards List */}
                    <div className="space-y-4">
                      {searchResults.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-6 bg-white border border-border rounded-2xl shadow-soft hover:shadow-medium transition-all group"
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-bg-secondary text-text-secondary border border-border">
                              <BookOpen className="w-3 h-3" />
                              {item.source}
                            </span>
                            {item.date && item.date !== "N/A" && (
                              <span className="text-xs text-text-secondary font-mono">{item.date}</span>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-all mb-2.5">
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 hover:underline"
                            >
                              {item.title}
                              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                            </a>
                          </h3>
                          
                          <p className="text-sm text-text-secondary leading-relaxed mb-4">
                            {item.snippet}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-text-secondary">
                            <span className="font-medium text-text-secondary/80">Source link: <span className="text-primary hover:underline">{item.displayLink}</span></span>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/85 font-bold flex items-center gap-1 transition-all"
                            >
                              View Publication <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Introductory Default Search State Dashboard */}
                {!searched && !isLoading && (
                  <div className="bg-bg-secondary border border-border rounded-2xl p-8 mt-4 text-center">
                    <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-text-primary">Query the Clinical Knowledge Base</h3>
                    <p className="text-sm text-text-secondary mt-1 max-w-lg mx-auto">
                      Search and index high-dilution studies, peer-reviewed clinical research trials, Materia Medica evaluations, and classical disease guides in real time.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                      <div className="p-4 bg-white border border-border rounded-xl text-left">
                        <span className="font-bold text-xs uppercase tracking-wider text-primary block mb-1">Step 1</span>
                        <p className="text-xs text-text-secondary">Enter a medical topic, symptom group, or remedy of interest.</p>
                      </div>
                      <div className="p-4 bg-white border border-border rounded-xl text-left">
                        <span className="font-bold text-xs uppercase tracking-wider text-primary block mb-1">Step 2</span>
                        <p className="text-xs text-text-secondary">Our server proxies your query securely, hiding API secrets.</p>
                      </div>
                      <div className="p-4 bg-white border border-border rounded-xl text-left">
                        <span className="font-bold text-xs uppercase tracking-wider text-primary block mb-1">Step 3</span>
                        <p className="text-xs text-text-secondary">Read actual clinical findings, molecular research abstracts, and PDFs.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
