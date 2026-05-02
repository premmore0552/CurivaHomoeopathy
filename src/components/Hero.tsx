import React from 'react';
import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { useLanguage } from './LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section className="relative bg-bg-secondary py-24 lg:py-32 overflow-hidden transition-colors duration-300">
      {/* Abstract background shapes */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left lg:col-span-7"
          >
            <motion.span variants={itemVariants} className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-8">
              Empowering Natural Wellness
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-display font-black text-text-primary leading-[1.1] mb-8 text-balance">
              {t('hero.title').split(' ').slice(0, -1).join(' ')} <span className="text-primary italic">{t('hero.title').split(' ').pop()}</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Access a comprehensive clinical database of 8,000+ remedy options across 570 conditions, based on standard homeopathic research.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/explore-symptoms"
                onClick={() => trackEvent('cta_click', { cta_id: 'hero_health_guides' })}
                className="px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:scale-105 hover:shadow-2xl hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-3 text-lg group"
              >
                {t('btn.explore')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/learn"
                onClick={() => trackEvent('cta_click', { cta_id: 'hero_read_articles' })}
                className="px-10 py-5 bg-bg-primary text-text-primary font-bold rounded-2xl border-2 border-border hover:border-primary hover:text-primary active:scale-95 transition-all text-lg flex items-center justify-center shadow-sm"
              >
                {t('btn.read')}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
            className="mt-16 lg:mt-0 relative lg:col-span-5"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-border group aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
                alt="Natural Healing and Homoeopathy Concept"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-xs font-bold tracking-[0.3em] text-primary-light uppercase mb-2"
                >
                  "Similia Similibus Curentur"
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="text-3xl font-display font-medium"
                >
                  Let likes be cured by likes
                </motion.p>
              </div>
            </div>
            
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-bg-primary p-6 rounded-3xl shadow-2xl hidden md:flex items-center gap-5 border border-border z-20"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="text-primary font-black text-3xl">8K+</span>
              </div>
              <div>
                <p className="font-black text-text-primary text-xl tracking-tight">Clinical Solutions</p>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">570+ Conditions Indexed</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Hero;
