import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { stalwartsData } from '../data/stalwartsData';
import { Quote, Award, History, ArrowRight, Search, Sparkles, Filter } from 'lucide-react';
import SEO from '../components/SEO';

const Stalwarts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStalwart, setSelectedStalwart] = useState<string | null>(null);

  const filteredStalwarts = stalwartsData.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Homoeopathy Stalwarts | Historical Masters"
        description="Learn about the pioneers and historical figures who shaped the principles of homoeopathic medicine."
      />

      <header className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-light text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
          >
            <History className="w-4 h-4" />
            The Lineage of Wisdom
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display font-medium tracking-tighter leading-[0.8] uppercase mb-8 md:mb-12"
          >
            The <span className="text-accent italic">Stalwarts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white/60 max-w-2xl font-serif italic leading-[1.4]"
          >
            Architects of the healing principle, whose clinical observations remain the bedrock of modern practice.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        {/* Search Bar */}
        <div className="mb-12 md:mb-20">
          <div className="relative max-w-4xl">
            <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-text-tertiary" />
            <input 
              type="text"
              placeholder="Search by name, era, or contribution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-secondary border-2 border-border focus:border-primary px-14 md:px-20 py-5 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] text-base md:text-xl font-bold text-text-primary shadow-2xl transition-all outline-none placeholder:text-text-tertiary placeholder:opacity-50"
            />
            <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary hidden lg:block">
                {filteredStalwarts.length} Masters Found
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredStalwarts.map((stalwart, index) => (
            <motion.div
              key={stalwart.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedStalwart(selectedStalwart === stalwart.id ? null : stalwart.id)}
              className={`group relative bg-bg-secondary rounded-[2rem] md:rounded-[3rem] border-2 border-border p-6 md:p-8 hover:border-primary transition-all cursor-pointer overflow-hidden ${
                selectedStalwart === stalwart.id ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div className="flex flex-col gap-6 md:gap-8 h-full">
                {/* Visual Identity */}
                <div className="flex items-start justify-between gap-4 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-border group-hover:border-primary shadow-xl">
                      <img 
                        src={stalwart.imageUrl} 
                        alt={stalwart.name}
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(stalwart.name)}&background=2c4c3b&color=fff&size=512`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-text-primary uppercase tracking-tighter italic leading-none group-hover:text-accent transition-colors">
                      {stalwart.name}
                    </h2>
                    <p className="text-[9px] md:text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-2 group-hover:text-text-primary transition-colors">
                      {stalwart.years}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full mb-6 italic">
                    {stalwart.title}
                  </span>
                  
                  {selectedStalwart === stalwart.id ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <p className="text-lg text-text-secondary leading-relaxed font-serif italic">
                        {stalwart.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stalwart.contributions.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-bg-primary rounded-2xl border border-border">
                            <Award className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-xs font-bold text-text-primary uppercase tracking-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-text-secondary line-clamp-3 font-serif italic leading-relaxed opacity-90">
                      {stalwart.description}
                    </p>
                  )}
                </div>

                {/* Interactions */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                  {stalwart.quote && (
                    <div className="flex items-center gap-2">
                      <Quote className="w-4 h-4 text-accent/40" />
                      <span className="text-[10px] text-text-secondary font-medium italic line-clamp-1 max-w-[150px]">
                        "{stalwart.quote}"
                      </span>
                    </div>
                  )}
                  <div className="text-primary flex items-center gap-2 font-bold uppercase tracking-widest text-[9px]">
                    {selectedStalwart === stalwart.id ? 'View Less' : 'Enter History'}
                    <ArrowRight className={`w-3 h-3 transform transition-transform ${selectedStalwart === stalwart.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>
              </div>
              
              {/* Abstract Background Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {filteredStalwarts.length === 0 && (
          <div className="py-40 text-center">
            <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 border border-border">
              <Search className="w-8 h-8 text-text-tertiary" />
            </div>
            <h3 className="text-2xl font-display font-black text-text-primary uppercase mb-2 italic">No Masters Found</h3>
            <p className="text-text-secondary font-medium tracking-tight">Try adjusting your search criteria or era name.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Stalwarts;
