import React from 'react';
import { motion } from 'motion/react';
import Myths from '../components/Myths';
import SEO from '../components/SEO';
import { Sparkles } from 'lucide-react';

export default function MythsAndFacts() {
  return (
    <div className="bg-bg-primary min-h-screen transition-colors duration-300">
      <SEO 
        title="Myths & Facts | Curiva Homoeopathy" 
        description="Discover the genuine facts about homoeopathy and clear up common misconceptions."
      />
      
      <section className="pt-24 pb-12 bg-bg-secondary border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Transparency
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
              Myths <span className="text-primary italic">&</span> Facts
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We believe in transparency. Let's clear up some common misconceptions about homoeopathic treatment and discover the genuine facts.
            </p>
          </motion.div>
        </div>
      </section>

      <Myths />
    </div>
  );
}
