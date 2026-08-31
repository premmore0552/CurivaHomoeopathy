import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MessageCircle, ChevronDown, ChevronUp, ArrowLeft, Search, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FMT_FULL_STRUCTURE } from '../data/fmtFullStructure';

const FmtVivaBank = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const vivaTopics = FMT_FULL_STRUCTURE.filter(t => !t.isComingSoon && t.vivaQuestions && t.vivaQuestions.length > 0);

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
                Viva <span className="text-primary">Bank</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl font-medium">
                Ace your practical exams with our curated list of 500+ rapid-fire viva questions. Real questions asked by university examiners.
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search viva topics..."
              className="w-full md:w-80 bg-white dark:bg-zinc-900 border border-border/60 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {vivaTopics.map((topic, idx) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white dark:bg-zinc-900 border ${expandedId === topic.id ? 'border-primary' : 'border-border/60'} rounded-3xl overflow-hidden transition-all shadow-soft`}
            >
              <button 
                onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${expandedId === topic.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} flex items-center justify-center transition-all`}>
                    <Mic className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-display font-bold text-text-primary">{topic.title}</h3>
                    <p className="text-[10px] font-black uppercase text-text-tertiary tracking-widest">
                      {topic.vivaQuestions?.length || 0} RAPID-FIRE QUESTIONS
                    </p>
                  </div>
                </div>
                {expandedId === topic.id ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-text-tertiary" />}
              </button>

              <AnimatePresence>
                {expandedId === topic.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-border/40"
                  >
                    <div className="p-6 space-y-6 bg-bg-secondary/20">
                      {topic.vivaQuestions?.map((q, qIdx) => (
                        <div key={qIdx} className="space-y-2 group">
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-black">
                              Q
                            </span>
                            <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                              {q.question}
                            </h4>
                          </div>
                          <div className="flex items-start gap-3 pl-9">
                            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">
                              A
                            </span>
                            <p className="text-xs font-medium text-text-secondary leading-relaxed">
                              {q.answer}
                            </p>
                          </div>
                          <div className="pl-9 pt-1">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                              q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-500' :
                              q.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                              'bg-emerald-500/10 text-emerald-500'
                            }`}>
                              DIFFICULTY: {q.difficulty}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border/40 flex justify-center">
                        <Link 
                          to={`/fmt/${topic.id}`}
                          className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                        >
                          <GraduationCap className="w-4 h-4" />
                          VIEW COMPLETE CHAPTER NOTES
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FmtVivaBank;
