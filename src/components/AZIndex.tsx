import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AZIndexProps {
  items: { 
    id: string; 
    name: string; 
    category: string; 
    description?: string; 
    slug?: string;
    link?: string;
    imageUrl?: string;
  }[];
  onItemClick?: (link: string) => void;
}

export default function AZIndex({ items, onItemClick }: AZIndexProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(link);
    }
  };

  const filteredItems = items.filter(item => {
    if (!item.name) return false;
    const nameStr = String(item.name);
    const matchesLetter = selectedLetter ? nameStr.toUpperCase().startsWith(selectedLetter) : true;
    const matchesSearch = searchQuery ? nameStr.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesLetter && matchesSearch;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const lettersWithItems = [...new Set(items.filter(item => item.name).map(item => item.name[0].toUpperCase()))];

  return (
    <div className="space-y-10">
      {/* Search & Filter bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors w-5 h-5" />
          <input
            type="text"
            placeholder="Search encyclopedia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
        
        <div className="flex flex-nowrap overflow-x-auto pb-4 gap-1 no-scrollbar justify-start md:justify-center w-full md:w-auto px-2">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 ${!selectedLetter ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-bg-secondary text-text-secondary hover:bg-border'}`}
          >
            ALL
          </button>
          {ALPHABET.map(letter => {
            const hasItems = lettersWithItems.includes(letter);
            return (
              <button
                key={letter}
                disabled={!hasItems}
                onClick={() => setSelectedLetter(letter)}
                className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 ${
                  selectedLetter === letter 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
                  : hasItems 
                    ? 'bg-bg-secondary text-text-secondary hover:bg-border' 
                    : 'bg-bg-secondary/30 text-text-secondary/20 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              className="relative group/card"
            >
              {/* Tooltip Preview */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-primary text-white rounded-2xl shadow-2xl opacity-0 group-hover/card:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover/card:translate-y-0 z-50">
                <div className="text-[10px] font-black uppercase tracking-widest mb-2 border-b border-white/20 pb-2">Quick Preview</div>
                <p className="text-xs font-medium leading-relaxed italic line-clamp-4">
                  {item.description || 'Clinical metadata for this node is currently being processed by our research modules.'}
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-primary" />
              </div>

              <Link
                to={item.link || (item.slug ? `/read/${item.slug}` : `/guide/${item.id}`)}
                onClick={(e) => handleLinkClick(e, item.link || (item.slug ? `/read/${item.slug}` : `/guide/${item.id}`))}
                className="group block bg-bg-secondary border border-border rounded-3xl hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden"
              >
                {item.imageUrl && (
                  <div className="w-full aspect-[2/1] overflow-hidden bg-primary/5">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2 py-1 bg-primary/5 rounded-full border border-primary/20">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-black text-text-primary mb-3 leading-tight group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed mb-6 line-clamp-2">
                    {item.description || 'Comprehensive clinical research and therapeutic indications database node.'}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Module <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-xl font-bold text-text-primary">No results found</h4>
            <p className="text-text-secondary">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
