import React from 'react';
import { motion, Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, User } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../hooks/useUser';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { profile, loading } = useUser();
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
    <section className="relative bg-bg-primary pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden transition-colors duration-300">
      {/* Animated geometric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] border border-accent/10 rounded-[10rem] opacity-20"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
          }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-primary/5 rounded-[8rem] opacity-20"
        />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-accent/5 to-transparent opacity-30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left lg:col-span-7"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <span className="px-4 py-1.5 bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.25em] rounded-full border border-primary/20">
                Pioneering Homoeopathy
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-[0.25em] rounded-full border border-accent/20">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Expert Materia Medica
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium text-text-primary leading-[1.05] mb-8 tracking-tight">
              {t('hero.title').split(' ').slice(0, -1).join(' ')} <br className="hidden xl:block" />
              <span className="text-accent italic relative">
                {t('hero.title').split(' ').pop()}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/20 fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5 L 100 0 L 0 0 Z" />
                </svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed italic font-serif opacity-90">
              Transform clinical results with evidence-backed protocols and a modern approach to Materia Medica.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link
                to="/glossary"
                onClick={() => trackEvent('cta_click', { cta_id: 'hero_health_guides' })}
                className="px-10 py-6 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                {t('btn.explore')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {!profile ? (
                <Link
                  to="/auth"
                  onClick={() => trackEvent('cta_click', { cta_id: 'hero_portal_login' })}
                  className="px-10 py-6 bg-accent text-primary-dark font-black uppercase tracking-widest text-[11px] rounded-2xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2.5 group shadow-sm border border-transparent"
                >
                  <ShieldCheck className="w-4 h-4 text-primary-dark" />
                  Scholars & Doctors Login
                </Link>
              ) : (
                <Link
                  to="/profile"
                  onClick={() => trackEvent('cta_click', { cta_id: 'hero_portal_profile' })}
                  className="px-10 py-6 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 group shadow-sm"
                >
                  <User className="w-4 h-4 text-white" />
                  My Workspace Panel
                </Link>
              )}

              <Link
                to="/research"
                onClick={() => trackEvent('cta_click', { cta_id: 'hero_marketplace' })}
                className="px-10 py-6 bg-bg-secondary text-text-primary font-bold uppercase tracking-widest text-xs rounded-2xl border border-border hover:border-primary hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2 group shadow-sm"
              >
                Research Database
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring' }}
            className="mt-16 lg:mt-0 relative lg:col-span-5"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-2 border-border group aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1540348922527-3efe7d3f94ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85"
                alt="Medical Wisdom"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 sepia-[0.3]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-xs font-bold tracking-[0.4em] text-accent-light uppercase mb-2"
                >
                  "Similia Similibus Curentur"
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="text-3xl font-display italic font-light"
                >
                  Healing through Natural Intelligence
                </motion.p>
              </div>
            </div>
            
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-2xl hidden md:flex items-center gap-5 border border-border z-20"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <span className="text-accent font-display font-bold text-3xl">XII</span>
              </div>
              <div>
                <p className="font-display font-medium text-text-primary text-xl tracking-tight">Clinical Pillars</p>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">Verified Historical Wisdom</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Hero;
