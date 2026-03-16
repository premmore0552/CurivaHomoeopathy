import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import SEO from '../components/SEO';

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#about') {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <SEO />
      <main>
        <Hero />
        <AboutSection />
        
        {/* Articles CTA Section */}
        <section className="py-20 bg-bg-secondary border-t border-border transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
              Ready to Dive Deeper?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
              Explore our extensive collection of educational articles, patient stories, and holistic health guides.
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all"
            >
              Explore All Articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
