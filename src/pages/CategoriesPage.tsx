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
      <main className="pt-24 bg-bg-primary transition-colors duration-300 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center gap-4 mb-2">
            <LayoutGrid className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary uppercase tracking-tighter italic">
              Research <span className="text-primary">Database</span>
            </h1>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl font-medium">
            An interactive visualization of homeopathic clinical patterns, remedies, and research topics curated for academic study.
          </p>
        </div>
        
        <ResearchMindMap />
      </main>
    </>
  );
}
