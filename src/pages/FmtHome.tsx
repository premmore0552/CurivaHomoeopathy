import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, BookOpen, Zap, Layers, HelpCircle, 
  ChevronRight, ArrowRight, Sparkles,
  ShieldAlert, Scale, Clock, Award, GraduationCap
} from 'lucide-react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

import FmtBottomNav from '../components/FmtBottomNav';

export default function FmtHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/fmt/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const modules = [
    {
      title: 'Forensic Medicine',
      icon: <Scale className="w-6 h-6 text-primary" />,
      topics: [
        { name: 'Death & Postmortem Changes', count: 9, to: '/fmt/learn/death-postmortem-changes' },
        { name: 'Mechanical Injuries', count: 10, to: '/fmt/learn/mechanical-injuries' },
        { name: 'Violent Asphyxia', count: 12, to: '/fmt/learn/asphyxia' },
        { name: 'Identification', count: 8, to: '/fmt/learn/identification' },
        { name: 'Autopsy Procedures', count: 6, to: '/fmt/learn/autopsy' },
        { name: 'Sexual Jurisprudence', count: 7, to: '/fmt/learn/sexual-jurisprudence' },
      ]
    },
    {
      title: 'Toxicology',
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
      topics: [
        { name: 'General Toxicology', count: 9, to: '/fmt/learn/general-toxicology' },
        { name: 'Corrosive Poisons', count: 8, to: '/fmt/learn/corrosives' },
        { name: 'Metallic Poisons', count: 12, to: '/fmt/learn/metals' },
        { name: 'Plant Poisons', count: 15, to: '/fmt/learn/plants' },
        { name: 'Animal Poisons', count: 6, to: '/fmt/learn/animal-poisons' },
        { name: 'Pesticides', count: 8, to: '/fmt/learn/pesticides' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="FMTMedEasy | Master Forensic Medicine & Toxicology for BHMS"
        description="Structured forensic medicine and toxicology learning designed for BHMS students. Understand concepts, revise rapidly, and practice for exams."
      />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-border/60 rounded-full shadow-soft"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-text-secondary">
              The Definitive FMT Learning Platform
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-7xl font-display font-black text-text-primary tracking-tight leading-[1.1]">
              Master FMT for BHMS.<br />
              <span className="text-primary">Understand it.</span> Revise it.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed italic">
              Structured forensic medicine and toxicology learning designed specifically for the BHMS curriculum.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link 
              to="/fmt/learn"
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/fmt/quick-revision"
              className="px-8 py-4 bg-white dark:bg-zinc-900 border border-border/60 text-text-primary rounded-2xl font-bold flex items-center gap-2 shadow-soft hover:border-primary/30 transition-all"
            >
              <Zap className="w-5 h-5 text-primary" />
              Quick Revision
            </Link>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto pt-8"
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any FMT topic (e.g., Algor Mortis, Hanging)..."
                className="w-full h-16 pl-14 pr-32 bg-white dark:bg-zinc-900 border-2 border-border/60 rounded-3xl text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-soft"
              />
              <button 
                type="submit"
                className="absolute top-2 right-2 bottom-2 px-6 bg-bg-secondary hover:bg-primary hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Search
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">
              <span>Try:</span>
              {['Algor Mortis', 'Hanging', 'Abrasion', 'Pesticides'].map(term => (
                <button 
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="hover:text-primary transition-colors border-b border-transparent hover:border-primary/30"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Learning Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, mIdx) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, x: mIdx === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (mIdx * 0.1) }}
              className="bg-white dark:bg-zinc-900 border border-border/70 rounded-[2.5rem] p-8 shadow-soft space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-bg-secondary rounded-2xl">
                    {module.icon}
                  </div>
                  <h2 className="text-2xl font-display font-black text-text-primary tracking-tight">
                    {module.title}
                  </h2>
                </div>
                <div className="px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                  {module.topics.length} Modules
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {module.topics.map((topic, tIdx) => (
                  <Link 
                    key={topic.name}
                    to={topic.to}
                    className="p-5 bg-bg-secondary hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-border/60 rounded-3xl transition-all group flex flex-col gap-2"
                  >
                    <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                      {topic.name}
                    </span>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">
                        {topic.count} Topics
                      </span>
                      <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link 
                to="/fmt/learn" 
                className="flex items-center justify-center gap-2 w-full py-4 bg-bg-secondary hover:bg-primary/5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group/btn"
              >
                View Full Learning Path
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Quick Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Quick Revision', icon: <Zap />, to: '/fmt/quick-revision', color: 'bg-amber-500', desc: 'Revise high-yield topics in minutes.' },
            { title: 'Comparison Hub', icon: <Layers />, to: '/fmt/compare', color: 'bg-primary', desc: 'Differential findings at a glance.' },
            { title: 'MCQ Practice', icon: <HelpCircle />, to: '/fmt/mcq', color: 'bg-indigo-500', desc: 'Test your knowledge with 1000+ MCQs.' },
            { title: 'Viva Mode', icon: <GraduationCap />, to: '/fmt/viva', color: 'bg-emerald-500', desc: 'Master oral exams with flashcards.' }
          ].map((feat, idx) => (
            <Link 
              key={feat.title}
              to={feat.to}
              className="p-6 bg-white dark:bg-zinc-900 border border-border/70 rounded-[2rem] shadow-soft hover:shadow-glow hover:border-primary/30 transition-all group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 ${feat.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-${feat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(feat.icon as React.ReactElement, { className: 'w-6 h-6' })}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-display font-black text-text-primary tracking-tight group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FmtBottomNav />
    </div>
  );
}
