import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-bg-secondary py-20 lg:py-32 overflow-hidden transition-colors duration-300">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-6">
              Empowering Natural Wellness
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-6">
              Curiva Homoeopathy – <span className="text-primary">Learn Natural Healing</span>
            </h1>
            <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
              Explore educational articles about homoeopathy, remedies, diseases, and holistic health. 
              Join thousands of students and patients in discovering the power of natural medicine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/articles"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Explore
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-bg-primary text-text-primary font-semibold rounded-xl border border-border hover:border-primary/30 hover:bg-bg-secondary transition-all"
              >
                About Homoeopathy
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 lg:mt-0 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/homeopathy-hero/800/600"
                alt="Natural Healing"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-medium opacity-80 mb-1 italic">"Similia Similibus Curentur"</p>
                <p className="text-lg font-semibold">Let likes be cured by likes</p>
              </div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -bottom-6 -left-6 bg-bg-primary p-6 rounded-2xl shadow-xl hidden md:block border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">50+</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Expert Articles</p>
                  <p className="text-xs text-text-secondary">Updated weekly</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
