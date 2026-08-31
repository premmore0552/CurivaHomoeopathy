import React from 'react';
import { motion } from 'motion/react';
import { Layers, ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FMT_COMPARISONS } from '../data/fmtComparisons';

const FmtComparisons = () => {
  const categories = Array.from(new Set(FMT_COMPARISONS.map(c => c.category)));

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
                Comparison <span className="text-primary">Hub</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl font-medium">
                Master high-yield differentials with side-by-side comparison tables. Essential for clinical accuracy and university exams.
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search comparisons..."
              className="w-full md:w-80 bg-white dark:bg-zinc-900 border border-border/60 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-16">
          {categories.map((category, catIdx) => (
            <section key={catIdx} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary uppercase tracking-wide">
                  {category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FMT_COMPARISONS.filter(c => c.category === category).map((comp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl p-6 shadow-soft hover:shadow-glow hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <Link to={`/fmt/compare/${comp.slug}`} className="space-y-4 block">
                      <div className="space-y-1">
                        <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                          {comp.title}
                        </h3>
                        <p className="text-xs text-text-tertiary font-medium line-clamp-2">
                          {comp.summary}
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-border/40 bg-bg-secondary/30">
                        <table className="w-full text-[10px]">
                          <thead>
                            <tr className="bg-bg-secondary border-b border-border/40">
                              <th className="px-2 py-1 text-left font-black text-text-tertiary uppercase tracking-tighter w-1/3">Feature</th>
                              <th className="px-2 py-1 text-left font-black text-primary uppercase tracking-tighter">Compare</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/30">
                            {comp.rows.slice(0, 3).map((row, rIdx) => (
                              <tr key={rIdx}>
                                <td className="px-2 py-1.5 font-bold text-text-secondary">{row[0]}</td>
                                <td className="px-2 py-1.5 text-text-tertiary line-clamp-1">{row[1]} vs {row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="w-full py-3 bg-bg-secondary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn">
                        VIEW FULL COMPARISON
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FmtComparisons;
