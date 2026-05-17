import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Zap, BookOpen, Activity, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { allBlogPosts } from '../data/blogPosts';
import { enhancedRemedies } from '../data/enhancedRemedies';
import { conditionsData } from '../data/conditionsData';
import { aiSearch } from '../services/gemini';

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setAiResults([]);
      return;
    }

    const blogResults = allBlogPosts
      .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      .map(p => ({ title: p.title, type: 'article', link: `/read/${p.slug}` }));

    const remedyResults = enhancedRemedies
      .filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
      .map(r => ({ title: r.name, type: 'remedy', link: `/remedy/${r.id}` }));

    const ailmentResults = conditionsData
      .filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
      .map(c => ({ title: c.title, type: 'ailment', link: `/conditions/${c.id}` }));

    setResults([...remedyResults, ...ailmentResults, ...blogResults].slice(0, 5));
  }, [query]);

  const handleAiSearch = async () => {
    if (query.length < 3) return;
    setIsAiLoading(true);
    setIsOpen(true);
    const results = await aiSearch(query);
    setAiResults(results);
    setIsAiLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/encyclopedia?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'remedy': return <Zap className="w-4 h-4" />;
      case 'ailment': return <Activity className="w-4 h-4" />;
      case 'ai': return <Sparkles className="w-4 h-4 text-primary" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remedy': return 'bg-amber-500/10 text-amber-600';
      case 'ailment': return 'bg-emerald-500/10 text-emerald-600';
      case 'ai': return 'bg-primary/10 text-primary border border-primary/20';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div ref={containerRef} className="relative group w-full md:w-64 lg:w-80">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search research..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="w-full pl-11 pr-12 py-2.5 bg-bg-secondary border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium dark:text-white"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary w-4 h-4" />
        {query.length >= 3 && (
          <button
            type="button"
            onClick={handleAiSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all group/ai"
            title="AI Search with Gemini"
          >
            {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && (results.length > 0 || aiResults.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-3 bg-bg-primary border border-border rounded-2xl shadow-2xl overflow-hidden z-[100] max-h-[500px] overflow-y-auto"
          >
            <div className="p-2 space-y-1">
              {aiResults.length > 0 && (
                <div className="px-3 py-2">
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary mb-2">
                     <Sparkles className="w-3 h-3" /> Gemini Insights
                   </div>
                   {aiResults.map((res: any, idx) => (
                     <Link
                       key={`ai-${idx}`}
                       to={res.link}
                       onClick={() => setIsOpen(false)}
                       className="flex items-start gap-3 p-3 hover:bg-primary/5 rounded-xl transition-colors group/ai-item border border-transparent hover:border-primary/10"
                     >
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getTypeColor('ai')}`}>
                        <Sparkles className="w-4 h-4" />
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className="text-xs font-black text-text-primary truncate">{res.title}</div>
                         <div className="text-[10px] text-text-secondary italic leading-tight mt-1">
                           {res.reason}
                         </div>
                       </div>
                     </Link>
                   ))}
                   <div className="h-px bg-border my-2" />
                </div>
              )}

              {results.map((res) => (
                <Link
                  key={`${res.type}-${res.link}`}
                  to={res.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-bg-secondary rounded-xl transition-colors group/item"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getTypeColor(res.type)}`}>
                    {getIcon(res.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-text-primary truncate">{res.title}</div>
                    <div className="text-[9px] font-bold text-text-secondary uppercase tracking-widest opacity-60">
                      {res.type === 'article' ? 'Research Article' : res.type === 'remedy' ? 'Materia Medica Node' : 'Clinical Area'}
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
