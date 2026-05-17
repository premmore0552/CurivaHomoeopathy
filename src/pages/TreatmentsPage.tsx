import React from 'react';
import RemedyExplorer from '../components/RemedyExplorer';
import TreatmentAreas from '../components/TreatmentAreas';
import SEO from '../components/SEO';
import AZIndex from '../components/AZIndex';
import { Activity, Book } from 'lucide-react';
import { motion } from 'motion/react';

export default function TreatmentsPage() {
  const ailments = [
    { id: 'skin-health', name: 'Skin Conditions (Eczema, Psoriasis)', category: 'Dermatology', link: '/conditions/skin-health' },
    { id: 'chronic-pain', name: 'Chronic Pain (Arthritis)', category: 'Musculoskeletal', link: '/conditions/chronic-pain' },
    { id: 'stress-anxiety', name: 'Stress and Anxiety', category: 'Mental Health', link: '/conditions/stress-anxiety' },
    { id: 'digestive-issues', name: 'Digestive Issues (IBS)', category: 'Gastrointestinal', link: '/conditions/digestive-issues' },
    { id: 'respiratory-health', name: 'Respiratory (Asthma, Allergies)', category: 'Respiratory', link: '/conditions/respiratory-health' },
    { id: 'immunity-wellness', name: 'Immunity & Vitality', category: 'Constitutional', link: '/conditions/immunity-wellness' },
    { id: 'acidity', name: 'Acidity & GERD', category: 'Digestive', link: '/conditions/acidity' },
    { id: 'migraine', name: 'Migraine & Headaches', category: 'Nervous System', link: '/conditions/migraine' },
    { id: 'pcos', name: 'PCOS & Hormonal Balance', category: 'Endocrine', link: '/conditions/pcos' },
  ];
  return (
    <div className="bg-bg-primary min-h-screen transition-colors duration-300">
      <SEO 
        title="Homoeopathy Care & Information | Curiva Homoeopathy" 
        description="Learn about comprehensive homeopathic approaches for skin health, chronic pain, mental wellness, and more."
      />
      
      <section className="pt-24 pb-4 bg-bg-secondary transition-colors duration-300 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full mb-6 tracking-widest uppercase">
              <Activity className="w-4 h-4" />
              Clinical Repository
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black text-text-primary mb-6 leading-[1.1] uppercase tracking-tighter">
              Research <span className="text-primary italic">Database.</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 font-bold opacity-60">
              Visualizing connections between symptoms and traditional clinical models.
            </p>
          </motion.div>
        </div>
      </section>

      <RemedyExplorer />

      <TreatmentAreas />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-primary/10 rounded-[2rem] text-primary">
            <Book className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">
              Ailment <span className="text-primary italic">Index</span>
            </h2>
            <p className="text-text-secondary font-bold opacity-60 uppercase tracking-[0.2em] text-[10px]">
              Browse the clinical research repository alphabetically
            </p>
          </div>
        </div>
        <AZIndex items={ailments} />
      </section>

      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Curious About Homoeopathy?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Though we are not currently treating patients, we are building a vast library of educational resources. Feel free to explore our blogs or connect with us on Instagram to learn more.
          </p>
          <a 
            href="https://www.instagram.com/curivahomoeopathy/" 
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:scale-105 transition-all"
          >
            Follow Us On Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
