import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Filter, Heart, Brain, Wind, Shield, Library } from 'lucide-react';
import SEO from '../components/SEO';
import AZIndex from '../components/AZIndex';
import { conditionsData } from '../data/conditionsData';
import { allBlogPosts } from '../data/blogPosts';

export default function ClinicalGuides() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Clinical Guides & Treatment Protocols | Curiva Homoeopathy"
        description="Explore detailed clinical guides, therapeutics, and holistic care pathways for common and chronic ailments."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-[#13222e] dark:bg-[#070e14] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-10 border border-white/15 text-accent-light"
           >
             <Sparkles className="w-4 h-4" /> Therapeutics Reference
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-white tracking-tighter leading-[0.85] mb-12"
           >
             Clinical <br/> <span className="text-accent italic">Guides</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-xl md:text-2xl text-white/60 max-w-2xl font-serif italic leading-relaxed"
           >
             Centralized therapeutic strategies, clinical patterns, and evidence-supported management of diseases and conditions.
           </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div>
              <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">Therapeutic <span className="text-primary">Index</span></h2>
              <p className="text-text-secondary font-medium mt-1">Browse all treatment protocols and study guides alphabetically.</p>
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
      </main>
    </div>
  );
}
