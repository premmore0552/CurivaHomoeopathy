import React, { useState } from 'react';
import { Book, Sparkles, Filter, Leaf, Database, Activity } from 'lucide-react';
import SEO from '../components/SEO';
import AZIndex from '../components/AZIndex';
import { enhancedRemedies } from '../data/enhancedRemedies';
import { conditionsData } from '../data/conditionsData';
import { allBlogPosts } from '../data/blogPosts';

export default function Encyclopedia() {
  const [activeFamily, setActiveFamily] = useState<string | null>(null);

  const families = [
    { id: 'Plant', icon: Leaf },
    { id: 'Mineral', icon: Database },
    { id: 'Animal', icon: Activity },
  ];

  const encyclopediaItems = [
    ...enhancedRemedies
      .filter(r => !activeFamily || r.family === activeFamily)
      .map(r => ({
        id: `rem-${r.id}`,
        name: r.name,
        category: 'Remedy',
        description: r.family + ' Family',
        link: `/remedy/${r.id}`
      })),
    ...conditionsData.map(c => ({
      id: `cond-${c.id}`,
      name: c.title,
      category: 'Ailment',
      description: c.category,
      link: `/conditions/${c.id}`
    })),
    ...allBlogPosts.map(p => ({
      id: `post-${p.id}`,
      name: p.title,
      category: 'Article',
      description: p.category,
      link: `/read/${p.slug}`
    }))
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Homeopathic Encyclopedia | Curiva Homoeopathy"
        description="Browse our comprehensive A-Z index of remedies, clinical topics, and research articles."
      />

      <header className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
           <Book className="w-96 h-96" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-6 border border-white/20">
             <Sparkles className="w-4 h-4 text-white" /> Learning Repository
           </div>
           <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight italic mb-6">
             Homeopathic <span className="opacity-60 italic">Encyclopedia</span>
           </h1>
           <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
             Access a centralized directory of Materia Medica notes, clinical summaries, and evidence-based research articles organized for ease of reference.
           </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div>
              <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">A–Z <span className="text-primary">Index</span></h2>
              <p className="text-text-secondary font-medium mt-1">Browse all repository contents alphabetically.</p>
           </div>
           
           <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-border shadow-soft mr-2">
                 <Filter className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">Filter Remedies</span>
              </div>
              <button 
                onClick={() => setActiveFamily(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${!activeFamily ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/50'}`}
              >
                All
              </button>
              {families.map(family => {
                const Icon = family.icon;
                return (
                  <button 
                    key={family.id}
                    onClick={() => setActiveFamily(family.id === activeFamily ? null : family.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeFamily === family.id ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/50'}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {family.id}
                  </button>
                );
              })}
           </div>
        </div>

        <AZIndex items={encyclopediaItems} />
      </main>
    </div>
  );
}
