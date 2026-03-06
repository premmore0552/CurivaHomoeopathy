import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <SEO 
        title="About Curiva Homoeopathy - Our Mission & Vision" 
        description="Learn about Curiva Homoeopathy, our mission to provide authentic homoeopathic education, and our vision for a healthier world through tiny doses."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-32 h-32 bg-[#D12B81] rounded-3xl flex items-center justify-center overflow-hidden shadow-lg shrink-0">
              <svg 
                viewBox="0 0 100 100" 
                className="w-20 h-20 text-white" 
                fill="currentColor"
              >
                <path d="M50 10c-1.1 0-2 .9-2 2v76c0 1.1.9 2 2 2s2-.9 2-2V12c0-1.1-.9-2-2-2z" />
                <path d="M50 25c-8.3 0-15 6.7-15 15 0 5.1 2.5 9.6 6.4 12.4-3.9 2.8-6.4 7.3-6.4 12.4 0 8.3 6.7 15 15 15s15-6.7 15-15c0-5.1-2.5-9.6-6.4-12.4 3.9-2.8 6.4-7.3 6.4-12.4 0-8.3-6.7-15-15-15zm0 50c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0-25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
                <path d="M30 20c0-5.5 4.5-10 10-10h20c5.5 0 10 4.5 10 10s-4.5 10-10 10H40c-5.5 0-10-4.5-10-10z" opacity="0.3" />
                <path d="M20 30c0-5.5 13.4-10 30-10s30 4.5 30 10-13.4 10-30 10-30-4.5-30-10z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">About Curiva Homoeopathy</h1>
              <p className="text-xl text-gray-500 font-medium">Tiny Doses. True Shifts.</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-xl font-medium text-gray-900 italic border-l-4 border-accent pl-4 py-2">
              "Tiny Doses. True Shifts."
            </p>
            
            <p>
              Curiva Homoeopathy was founded with a single mission: to bridge the gap between traditional homoeopathic wisdom and modern health awareness. We believe that true healing comes from understanding the body's innate intelligence and supporting it with the gentle, yet profound, power of homoeopathy.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-12 mb-4">Our Vision</h2>
            <p>
              We envision a world where homoeopathy is recognized as a primary pillar of holistic health. Through education, research, and community engagement, we strive to make homoeopathic knowledge accessible to everyone—from curious beginners to dedicated students of the Materia Medica.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-12 mb-4">What We Do</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Educational Resources:</strong> We provide in-depth articles on homoeopathic remedies, principles, and history.</li>
              <li><strong>Materia Medica Insights:</strong> Our structured medicine profiles help students and practitioners understand the core essence of remedies.</li>
              <li><strong>Community Support:</strong> We foster a space for learning and sharing experiences with homoeopathic healing.</li>
              <li><strong>Advocacy:</strong> We promote the safe and effective use of homoeopathy as part of a balanced lifestyle.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-12 mb-4">Our Philosophy</h2>
            <p>
              Homoeopathy is more than just medicine; it's a philosophy of life. It teaches us to look beyond the symptoms and see the whole person. At Curiva, we honor the principles laid down by Dr. Samuel Hahnemann while embracing the evolving science of holistic wellness.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
