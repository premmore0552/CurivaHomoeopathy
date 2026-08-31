import React from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FMT_FULL_STRUCTURE } from '../data/fmtFullStructure';

const FmtQuickRevision = () => {
  const revisionTopics = FMT_FULL_STRUCTURE.filter(t => !t.isComingSoon && t.quickRevision);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <Link 
              to="/fmt" 
              className="inline-flex items-center gap-2 text-xs font-bold text-text-tertiary hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO LIBRARY
            </Link>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-tight">
                Quick <span className="text-primary">Revision</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl font-medium">
                Last-minute exam capsules. 1-minute revision sheets for every high-yield topic in Forensic Medicine & Toxicology.
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search revision sheets..."
              className="w-full md:w-80 bg-white dark:bg-zinc-900 border border-border/60 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {revisionTopics.map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative group overflow-hidden"
            >
              <Link to={`/fmt/${topic.id}`} className="block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[2rem] p-8 shadow-soft hover:shadow-glow hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-bg-secondary rounded-full">
                      <Clock className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-black uppercase text-text-tertiary tracking-widest">1 MIN READ</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm font-bold text-text-secondary line-clamp-2">
                        {topic.quickRevision?.definition}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {topic.quickRevision?.keyPoints.slice(0, 3).map((point, pIdx) => (
                        <span key={pIdx} className="text-[10px] font-bold text-text-tertiary bg-bg-secondary px-2 py-1 rounded-md">
                          • {point}
                        </span>
                      ))}
                      {(topic.quickRevision?.keyPoints.length || 0) > 3 && (
                        <span className="text-[10px] font-bold text-primary">
                          +{(topic.quickRevision?.keyPoints.length || 0) - 3} more
                        </span>
                      )}
                    </div>

                    <div className="pt-4 flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                      REVIVE NOW
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FmtQuickRevision;
