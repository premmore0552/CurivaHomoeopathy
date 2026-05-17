import React from 'react';
import ResearchMindMap from '../components/ResearchMindMap';
import SEO from '../components/SEO';
import { LayoutGrid } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <>
      <SEO 
        title="Research Database | Curiva Homoeopathy" 
        description="Browse our specialized research topics and academic homoeopathic categories to explore holistic insights."
      />
      <main className="pt-24 bg-bg-primary transition-colors duration-300 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-medium text-text-primary uppercase tracking-tight italic">
              Research <span className="text-accent">Repository</span>
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl font-serif italic leading-relaxed">
            An interactive visualization of homoeopathic clinical patterns, remedy relationships, and pioneering research topics curated for the modern practitioner.
          </p>
        </div>
        
        <ResearchMindMap />
      </main>
    </>
  );
}
