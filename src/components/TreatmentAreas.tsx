import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { conditionsData } from '../data/conditionsData';

export default function TreatmentAreas() {
  return (
    <section className="py-24 bg-bg-primary dark:bg-zinc-950 transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="mednix-section-subtitle mx-auto">
            Educational Exploration
          </div>
          <h2 className="mednix-section-title">
            Explore by <span className="text-primary italic">Symptoms</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            Rather than just disease labels, we focus on symptom patterns. Choose an area below to understand the homeopathic "fingerprint" of the condition.
          </p>
          <div className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-3xl flex gap-4 text-left max-w-3xl mx-auto">
            <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
            <p className="text-xs text-text-secondary dark:text-text-secondary leading-relaxed font-medium">
              We are strictly educational and currently not treating patients clinically. The information below describes homeopathic perspectives and does not constitute medical advice or prescriptions.
            </p>
          </div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-8 flex md:grid md:flex-none no-scrollbar">
          {conditionsData.map((condition, idx) => (
            <motion.div
              key={condition.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-bg-secondary dark:bg-zinc-900 rounded-[2.5rem] p-10 border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 min-w-full md:min-w-0 mednix-card-hover-float"
            >
              <div className={`w-16 h-16 ${condition.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform duration-500`}>
                <condition.icon className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary/50 mb-3 block">{condition.category}</span>
              <h4 className="text-2xl font-display font-black text-text-primary mb-4 group-hover:text-primary transition-colors">
                {condition.title}
              </h4>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed font-medium">
                {condition.excerpt}
              </p>
              <Link 
                to={`/conditions/${condition.id}`}
                className="inline-flex items-center gap-2 text-primary font-bold text-sm bg-white px-6 py-3 rounded-xl border border-border group-hover:border-primary transition-all"
              >
                Browse Patterns
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
