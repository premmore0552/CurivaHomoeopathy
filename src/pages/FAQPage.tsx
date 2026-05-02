import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FAQPage() {
  return (
    <div className="bg-bg-primary min-h-screen transition-colors duration-300">
      <SEO 
        title="FAQ | Curiva Homoeopathy" 
        description="Frequently asked questions about homeopathy, treatment duration, and safety."
      />
      
      <section className="pt-24 pb-12 bg-bg-secondary border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" />
              Resource Knowledge Base
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
              Frequently Asked <span className="text-primary italic">Questions.</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We understand you may have questions about starting your homeopathic journey. Here are some of the most common inquiries we receive.
            </p>
          </motion.div>
        </div>
      </section>

      <FAQ />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Still have questions?</h3>
          <p className="text-text-secondary mb-8">
            If you couldn't find the answer you were looking for, or want to suggest a new topic, our community feedback form is always open.
          </p>
          <a 
            href="/guidance" 
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            Submit Feedback
          </a>
        </div>
      </section>
    </div>
  );
}
