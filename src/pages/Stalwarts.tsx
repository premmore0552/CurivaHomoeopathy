import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { stalwartsData, Stalwart } from '../data/stalwartsData';
import { 
  Quote, 
  Award, 
  History, 
  ArrowRight, 
  Search, 
  Sparkles, 
  X, 
  BookOpen, 
  Brain, 
  Heart,
  Globe,
  ChevronLeft
} from 'lucide-react';
import SEO from '../components/SEO';

const Stalwarts: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'bio' | 'philosophy' | 'works'>('bio');

  const isIndianStalwart = (id: string) => {
    return ['sircar', 'dutt', 'chand', 'majumdar', 'kishore', 'jaichand'].includes(id);
  };

  const filteredStalwarts = stalwartsData.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.biography.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If a slug is present in the URL path, show the fully detailed separate page view
  if (slug) {
    const selectedStalwart = stalwartsData.find(s => s.id === slug);

    if (!selectedStalwart) {
      return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8 text-center">
          <SEO title="Stalwart Not Found | Curiva Homoeopathy" />
          <h2 className="text-3xl font-display font-medium text-text-primary mb-4">Pioneer Not Found</h2>
          <p className="text-text-secondary mb-8 max-w-md">The historical homoeopathic stalwart you are looking for does not exist in our archives.</p>
          <Link 
            to="/stalwarts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Stalwarts Index
          </Link>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-bg-primary pb-24">
        <SEO 
          title={`${selectedStalwart.name} | Homoeopathy Stalwarts`}
          description={`Discover the complete biography, medical philosophy, and historical contributions of Dr. ${selectedStalwart.name} (${selectedStalwart.years}).`}
        />

        {/* Back navigation & breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
          <button 
            onClick={() => navigate('/stalwarts')}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-border rounded-full text-xs font-bold text-text-secondary hover:text-primary hover:border-primary/30 transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Pioneers Index
          </button>
        </div>

        {/* PROFILE HEADER / HERO */}
        <main className="max-w-7xl mx-auto px-6">
          <div className="bg-bg-secondary dark:bg-gray-900 rounded-[2.5rem] border border-border shadow-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Profile Card Column */}
              <div className="lg:col-span-5 bg-bg-secondary border-b lg:border-b-0 lg:border-r border-border p-8 md:p-12 flex flex-col justify-between items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                <div className="space-y-6 w-full relative z-10 my-auto">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto relative group">
                    <img 
                      src={selectedStalwart.imageUrl} 
                      alt={selectedStalwart.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedStalwart.name)}&background=10B981&color=fff&size=512`;
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-display font-medium text-text-primary tracking-tight">
                      {selectedStalwart.name}
                    </h1>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest">
                      {selectedStalwart.years}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full italic border border-primary/20">
                        {selectedStalwart.title}
                      </span>
                      {isIndianStalwart(selectedStalwart.id) && (
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-full italic border border-amber-500/20">
                          🇮🇳 Indian Pioneer
                        </span>
                      )}
                    </div>
                  </div>

                  {selectedStalwart.quote && (
                    <div className="p-6 bg-bg-primary dark:bg-gray-955 rounded-2xl border border-border max-w-sm mx-auto shadow-sm">
                      <Quote className="w-6 h-6 text-primary/20 mx-auto mb-2" />
                      <p className="text-sm text-text-secondary leading-relaxed italic font-serif">
                        "{selectedStalwart.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Detailed Tab Content Column */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-8">
                  {/* Interactive Tabs */}
                  <div className="flex gap-1.5 border-b border-border pb-1">
                    {[
                      { id: 'bio', label: 'Biography', icon: BookOpen },
                      { id: 'philosophy', label: 'Clinical Philosophy', icon: Brain },
                      { id: 'works', label: 'Key Publications', icon: Award }
                    ].map(tab => {
                      const Icon = tab.icon;
                      const isSelected = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            isSelected ? 'text-white' : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                          }`}
                        >
                          <Icon className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">{tab.label}</span>
                          {isSelected && (
                            <motion.div 
                              layoutId="stalwartActiveTab"
                              className="absolute inset-0 bg-primary rounded-xl z-0 shadow-md shadow-primary/20"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Content Panels */}
                  <div className="min-h-[250px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6 text-text-primary"
                      >
                        {activeTab === 'bio' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4 text-primary" /> Comprehensive Biography
                            </h4>
                            <p className="text-base text-text-secondary leading-relaxed font-serif">
                              {selectedStalwart.biography}
                            </p>
                            <p className="text-base text-text-secondary leading-relaxed font-serif pt-4 border-t border-border/40">
                              {selectedStalwart.description}
                            </p>
                          </div>
                        )}

                        {activeTab === 'philosophy' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Brain className="w-4 h-4 text-primary" /> Medical & Therapeutics Approach
                            </h4>
                            <p className="text-base text-text-secondary leading-relaxed font-serif">
                              {selectedStalwart.clinicalPhilosophy}
                            </p>
                          </div>
                        )}

                        {activeTab === 'works' && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-primary" /> Major Writings & Key Books
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              {selectedStalwart.keyWorks.map((work, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-bg-secondary rounded-2xl border border-border">
                                  <BookOpen className="w-4 h-4 text-primary shrink-0" />
                                  <span className="text-xs font-bold text-text-primary leading-tight">{work}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Contributions Checklist */}
                  <div className="pt-8 border-t border-border/60">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-tertiary mb-4 flex items-center gap-1">
                      <Award className="w-4 h-4 text-primary" /> Core Contributions & Legacy
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedStalwart.contributions.map((contr, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3.5 bg-bg-secondary rounded-xl border border-border">
                          <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">✓</span>
                          <span className="text-xs font-semibold text-text-secondary leading-relaxed">{contr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-12 pt-4 border-t border-border/40 text-text-tertiary text-[10px]">
                  <span>Curiva Medical Pioneers Archive</span>
                  <span>Last updated: July 2026</span>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }

  // DEFAULT VIEW: Searchable gallery index of all pioneers
  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Homoeopathy Stalwarts & Pioneers | Historical Masters"
        description="Learn about the pioneers and historical figures who shaped the principles of homoeopathic medicine, including legendary Indian practitioners."
      />

      {/* Hero Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-bg-secondary border-b border-border text-text-primary mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
          >
            <History className="w-4 h-4 text-primary animate-pulse" />
            The Lineage of Wisdom
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display font-medium tracking-tighter leading-[0.8] uppercase mb-8 md:mb-12 text-text-primary"
          >
            The <span className="text-primary italic">Stalwarts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-[1.4]"
          >
            Architects of the healing principle, whose clinical observations remain the bedrock of modern practice.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Search Bar */}
        <div className="mb-12 md:mb-10">
          <div className="relative max-w-4xl">
            <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-text-tertiary" />
            <input 
              type="text"
              placeholder="Search by name, biography, or contribution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-secondary dark:bg-gray-900 border border-border focus:border-primary px-14 md:px-20 py-5 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] text-base md:text-xl font-bold text-text-primary shadow-soft transition-all outline-none placeholder:text-text-tertiary placeholder:opacity-50"
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

        {/* Grid Layout of Pioneers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredStalwarts.map((stalwart, index) => (
            <motion.div
              key={stalwart.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/stalwarts/${stalwart.id}`)}
              className="group relative bg-bg-secondary dark:bg-gray-900 rounded-[2rem] md:rounded-[3rem] border border-border p-6 md:p-8 hover:border-primary transition-all cursor-pointer overflow-hidden shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Visual Identity */}
                <div className="flex items-start justify-between gap-4 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-border group-hover:border-primary shadow-md">
                      <img 
                        src={stalwart.imageUrl} 
                        alt={stalwart.name}
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(stalwart.name)}&background=10B981&color=fff&size=512`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <h2 className="text-xl sm:text-2xl font-display font-medium text-text-primary uppercase tracking-tighter italic leading-none group-hover:text-primary transition-colors">
                      {stalwart.name}
                    </h2>
                    <p className="text-[9px] md:text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-2 group-hover:text-text-primary transition-colors">
                      {stalwart.years}
                    </p>
                  </div>
                </div>

                {/* Tags / Subtitle */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full italic border border-primary/10">
                      {stalwart.title}
                    </span>
                    {isIndianStalwart(stalwart.id) && (
                      <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-700 text-[9px] font-bold uppercase tracking-widest rounded-full italic border border-amber-500/20">
                        🇮🇳 Indian Stalwart
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-text-secondary line-clamp-3 font-serif italic leading-relaxed">
                    {stalwart.description}
                  </p>
                </div>
              </div>

              {/* Interaction details at bottom */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/60">
                {stalwart.quote && (
                  <div className="flex items-center gap-1.5 max-w-[60%]">
                    <Quote className="w-3.5 h-3.5 text-primary/30 shrink-0" />
                    <span className="text-[10px] text-text-tertiary font-medium italic line-clamp-1">
                      "{stalwart.quote}"
                    </span>
                  </div>
                )}
                <div className="text-primary flex items-center gap-2 font-bold uppercase tracking-widest text-[9px] ml-auto shrink-0 group-hover:text-primary-dark">
                  View Full Profile
                  <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Abstract background glow element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {filteredStalwarts.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 border border-border">
              <Search className="w-8 h-8 text-text-tertiary" />
            </div>
            <h3 className="text-2xl font-display font-black text-text-primary uppercase mb-2 italic">No Masters Found</h3>
            <p className="text-text-secondary font-medium tracking-tight">Try adjusting your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Stalwarts;
