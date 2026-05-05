
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, GraduationCap, ExternalLink, Bookmark, Info, Sparkles, Filter, ChevronRight, Library, Brain } from 'lucide-react';
import SEO from '../components/SEO';
import { glossary, materiaMedicaConcepts, academicLinks, GlossaryTerm } from '../data/studentResourcesData';

function ConceptCard({ concept }: { concept: typeof materiaMedicaConcepts[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      key={concept.title}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: isExpanded ? 0 : -10 }}
      className={`bg-text-primary p-12 rounded-[4rem] border border-white/5 relative overflow-hidden group shadow-2xl cursor-pointer transition-all duration-500 ${isExpanded ? 'md:col-span-2' : ''}`}
    >
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
        <Sparkles size={120} className="text-white" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-6 tracking-tighter leading-none italic">
          <span className="text-primary not-italic uppercase tracking-widest text-xs block mb-4">Materia Medica</span>
          {concept.title}
        </h3>
        <p className="text-xl text-white/60 mb-10 leading-relaxed font-medium italic">
          {concept.summary}
        </p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Key Learning Points</h4>
                <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {concept.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-4 text-white/80 font-bold group/item">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0 group-hover/item:scale-150 transition-transform" />
                      <span className="text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  Click to collapse <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </motion.div>
          )}
          {!isExpanded && (
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
              Read more <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function GlossaryItem({ item }: { item: GlossaryTerm }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, scale: 1 }}
      whileHover={{ y: isExpanded ? 0 : -5 }}
      className={`bg-white dark:bg-bg-secondary p-8 rounded-[2.5rem] border border-border hover:border-primary/30 shadow-soft transition-all group cursor-pointer ${isExpanded ? 'md:col-span-2' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full">
          {item.category}
        </span>
        <div className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </div>
      <h3 className="text-2xl font-display font-black text-text-primary mb-4 italic group-hover:text-primary transition-colors">
        {item.term}
      </h3>
      <p className={`text-text-secondary leading-relaxed font-medium transition-all duration-500 ${isExpanded ? 'text-lg' : 'line-clamp-2'}`}>
        {item.definition}
      </p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                Detailed concept info <Sparkles size={12} />
              </div>
              <p className="mt-4 text-text-secondary italic">
                This term is essential for understanding the {item.category.toLowerCase()} of classical homeopathy. Master this concept to improve clinical results.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StudentResources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'glossary' | 'concepts' | 'links'>('glossary');
  const [searchTerm, setSearchTerm] = useState('');
  const [glossaryFilter, setGlossaryFilter] = useState<GlossaryTerm['category'] | 'All'>('All');

  const filteredGlossary = glossary.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = glossaryFilter === 'All' || item.category === glossaryFilter;
    return matchesSearch && matchesFilter;
  });

  const glossaryCategories: (GlossaryTerm['category'] | 'All')[] = ['All', 'Philosophy', 'Pharmacy', 'Clinical', 'Historical'];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Student Resources | Curiva Homoeopathy"
        description="Academic resources for homeopathy students, including a glossary, Materia Medica summaries, and academic journal links."
      />

      {/* Hero Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-white/10 text-primary-light"
          >
            <GraduationCap className="w-4 h-4" /> Academic Excellence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.85] mb-12"
          >
            Student <br/> <span className="text-primary italic">Resources</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed"
          >
            A curated sanctuary for homoeopathic scholars. Dive into clinical patterns, scientific literature, and historical philosophy.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Navigation Tabs */}
        <div className="bg-bg-secondary p-2 rounded-[2.5rem] border border-border shadow-2xl flex flex-wrap justify-center md:justify-start gap-2 mb-16 max-w-fit mx-auto lg:mx-0">
          {[
            { id: 'glossary', label: 'Glossary', icon: BookOpen },
            { id: 'concepts', label: 'Core Concepts', icon: Bookmark },
            { id: 'links', label: 'Academic Links', icon: Library },
            { id: 'recall', label: 'Clinical Recall', icon: Brain },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => tab.id === 'recall' ? navigate('/study-tool') : setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                : 'text-text-secondary hover:bg-bg-primary hover:text-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <section className="space-y-12">
          {/* Glossary Section */}
          <AnimatePresence mode="wait">
            {activeTab === 'glossary' && (
              <motion.div
                key="glossary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div className="relative flex-1 max-w-xl">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input 
                      type="text"
                      placeholder="Search for terms (e.g. Miasm, Succussion)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-5 bg-bg-secondary border border-border rounded-3xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-lg font-medium"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {glossaryCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setGlossaryFilter(cat)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          glossaryFilter === cat 
                          ? 'bg-primary/10 text-primary border-primary/30' 
                          : 'bg-bg-secondary text-text-tertiary border-border hover:border-primary/20'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGlossary.map((item) => (
                    <GlossaryItem key={item.term} item={item} />
                  ))}
                  {filteredGlossary.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-text-tertiary text-lg font-medium italic">No terms found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Core Concepts Section */}
            {activeTab === 'concepts' && (
              <motion.div
                key="concepts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {materiaMedicaConcepts.map((concept, idx) => (
                  <ConceptCard key={concept.title} concept={concept} />
                ))}
              </motion.div>
            )}

            {/* Academic Links Section */}
            {activeTab === 'links' && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <div className="space-y-8">
                  <div className="bg-primary/5 p-12 rounded-[4rem] border border-primary/10">
                    <h3 className="text-3xl font-display font-black text-text-primary mb-6 italic">
                      Scholarly <span className="text-primary">Journals</span>
                    </h3>
                    <p className="text-text-secondary text-lg font-medium leading-relaxed mb-8">
                      Stay updated with the latest clinical research and double-blind studies from internationally recognized homeopathic journals.
                    </p>
                    <div className="space-y-4">
                      {academicLinks.filter(l => l.type === 'Journal').map(link => (
                        <a 
                          key={link.title}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-6 bg-white dark:bg-bg-secondary rounded-[2.5rem] border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
                        >
                          <div>
                            <h4 className="text-lg font-black text-text-primary group-hover:text-primary transition-colors">{link.title}</h4>
                            <p className="text-sm text-text-tertiary mt-1 opacity-80">{link.description}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-bg-secondary p-12 rounded-[4rem] border border-border">
                    <h3 className="text-3xl font-display font-black text-text-primary mb-6 italic">
                      Study <span className="text-primary">Material</span>
                    </h3>
                    <p className="text-text-secondary text-lg font-medium leading-relaxed mb-8">
                      Access historical databases and comprehensive learning portals for deeper clinical understanding.
                    </p>
                    <div className="space-y-4">
                      {academicLinks.filter(l => l.type !== 'Journal').map(link => (
                        <a 
                          key={link.title}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-6 bg-bg-primary rounded-[2.5rem] border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-text-primary text-white px-2 py-0.5 rounded-full">
                                {link.type}
                              </span>
                            </div>
                            <h4 className="text-lg font-black text-text-primary group-hover:text-primary transition-colors">{link.title}</h4>
                            <p className="text-sm text-text-tertiary mt-1 opacity-80">{link.description}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CTA Section */}
        <section className="mt-32">
          <div className="bg-primary p-12 md:p-20 rounded-[4rem] relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter italic leading-none">
                Expand Your <br/> <span className="text-text-primary not-italic uppercase tracking-widest text-2xl md:text-3xl">Clinical Horizon.</span>
              </h2>
              <p className="text-xl text-white/80 font-medium mb-12 leading-relaxed">
                Connect with our community of students and practitioners to discuss complex cases and philosophy.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
                  Join Student Forum
                </button>
                <button className="px-10 py-5 bg-primary-dark text-white border border-white/20 font-black uppercase tracking-widest text-xs rounded-3xl hover:bg-white/10 transition-all">
                  Request Case Study
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
