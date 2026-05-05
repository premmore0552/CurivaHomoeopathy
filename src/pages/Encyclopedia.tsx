import React, { useState } from 'react';
import { motion } from 'motion/react';
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

      <header className="relative pt-32 pb-48 overflow-hidden bg-text-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-white/10 text-primary-light"
           >
             <Sparkles className="w-4 h-4" /> Living Archive
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-[0.85] mb-12"
           >
             Materia <br/> <span className="text-primary italic">Medica</span> <span className="opacity-20">&</span> <br/> <span className="opacity-40 italic">Clinical Guides</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed"
           >
             Your centralized gateway for evidence-based research, clinical patterns, and holistic philosophy.
           </motion.p>
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
