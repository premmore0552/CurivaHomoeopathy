import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { conditionsData } from '../data/conditionsData';
import SEO from '../components/SEO';

export default function ConditionsExplained() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Conditions Explained | Curiva Homoeopathy"
        description="Explore common health conditions and their homeopathic clinical patterns. Medically responsible guides for students and patients."
      />

      <header className="relative pt-32 pb-24 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 border border-primary/20 text-primary"
          >
            <BookOpen className="w-4 h-4" /> Clinical Reference
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary mb-6 tracking-tight">
            Conditions <span className="text-primary italic">Explained</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A comprehensive guide to understanding common ailments through the lens of Homoeopathic philosophy and clinical patterns.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditionsData.map((condition, index) => {
            const Icon = condition.icon;
            return (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-zinc-900 border border-border rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={condition.imageUrl} 
                    alt={condition.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 opacity-20 ${condition.color}`} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-text-primary text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                      {condition.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl ${condition.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                      {condition.title}
                    </h2>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {condition.excerpt}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Homoeopathic Perspective
                    </h3>
                    {condition.patterns.slice(0, 1).map((pattern, pIdx) => (
                      <div key={pIdx} className="bg-bg-secondary p-4 rounded-2xl border border-border/50">
                        <p className="text-xs font-bold text-text-primary mb-1">{pattern.name}</p>
                        <p className="text-[11px] text-text-secondary leading-tight">{pattern.tendency}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => navigate(`/conditions/${condition.id}`)}
                      className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                      Deep Dive Overview
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    {condition.relatedBlogPosts && condition.relatedBlogPosts.length > 0 && (
                      <button
                        onClick={() => navigate(`/articles?search=${encodeURIComponent(condition.title)}`)}
                        className="w-full py-4 bg-bg-secondary text-primary font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-border transition-all flex items-center justify-center gap-2 border border-border"
                      >
                        Read Related Articles
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-4 py-20 text-center border-t border-border mt-12">
        <div className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10">
          <h3 className="text-2xl font-display font-bold text-text-primary mb-4">Medically Responsible Information</h3>
          <p className="text-text-secondary leading-relaxed mb-8 italic">
            "These guides are intended for educational purposes for BHMS students and healthcare practitioners. 
            Homoeopathy is a constitutional science; individual case taking is essential for accurate prescription."
          </p>
          <div className="flex justify-center gap-4">
             <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/10">Student-Friendly</span>
             <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/10">Clinical References</span>
             <span className="px-4 py-2 bg-white rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/10">Evidence-Informed</span>
          </div>
        </div>
      </section>
    </div>
  );
}
