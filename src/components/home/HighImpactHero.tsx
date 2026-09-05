import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, BookOpen, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HighImpactHero: React.FC = () => {
  return (
    <section 
      className="relative overflow-hidden pt-16 pb-24"
      style={{ height: '700px', width: '1200px', paddingBottom: '0px', paddingTop: '0px', marginRight: '0px', marginTop: '64px', marginLeft: '0px', paddingRight: '0px', paddingLeft: '0px' }}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Medical Excellence Refined</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-text-primary leading-[1.1] tracking-tight">
            The Digital Heart of <br />
            <span className="text-primary italic">Homoeopathic</span> <br />
            Education.
          </h1>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl font-serif italic">
            Curiva Homoeopathy bridges classical wisdom with modern clinical precision. 
            An authoritative ecosystem designed for BHMS students, practitioners, and clinical researchers.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link 
              to="/student-resources" 
              className="px-8 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Explore Syllabus</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/clinical-guides" 
              className="px-8 py-4 bg-bg-secondary text-text-primary border border-border rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-bg-tertiary hover:border-primary/30 transition-all group"
            >
              <BookOpen className="w-5 h-5 text-accent" />
              <span>Clinical Hub</span>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-8 border-t border-border/50 max-w-2xl">
            <div className="space-y-1">
              <span className="block text-2xl font-black text-primary">150+</span>
              <span className="block text-[10px] font-black uppercase tracking-wider text-text-tertiary">Remedy Keynotes</span>
            </div>
            <div className="space-y-1">
              <span className="block text-2xl font-black text-primary">NCH</span>
              <span className="block text-[10px] font-black uppercase tracking-wider text-text-tertiary">Aligned Curriculum</span>
            </div>
            <div className="space-y-1">
              <span className="block text-2xl font-black text-primary">5k+</span>
              <span className="block text-[10px] font-black uppercase tracking-wider text-text-tertiary">Solved MCQs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GraduationCap = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default HighImpactHero;
