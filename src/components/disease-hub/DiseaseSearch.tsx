import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, Activity, Pill, Microscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { diseaseHubData } from '../../data/diseaseHubData';

export const DiseaseSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return diseaseHubData.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.simpleExplanation.toLowerCase().includes(q) ||
      d.system.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  return (
    <div className="relative max-w-2xl mx-auto z-50">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a disease, symptom, investigation, or remedy..."
          className="w-full bg-white dark:bg-zinc-900 border-2 border-border focus:border-primary rounded-full py-4 pl-14 pr-6 text-sm font-bold text-text-primary placeholder:text-text-secondary/50 outline-none transition-all shadow-lg shadow-black/5"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-5 flex items-center text-text-secondary hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-border rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-border bg-zinc-50 dark:bg-zinc-800/50">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Search Results ({results.length})</h4>
          </div>
          <div className="divide-y divide-border">
            {results.map(disease => (
              <button
                key={disease.id}
                onClick={() => {
                  navigate(`/disease-hub/${disease.system}/${disease.slug}`);
                  setQuery('');
                }}
                className="w-full p-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-text-primary uppercase tracking-tight group-hover:text-primary transition-colors">{disease.name}</h5>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{disease.system.replace('-', ' ')}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Search Architecture Preparation Hint */}
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {['Diseases', 'Symptoms', 'Remedies', 'Lab Tests'].map(type => (
          <span key={type} className="text-[9px] font-black uppercase tracking-widest text-text-secondary/60">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
