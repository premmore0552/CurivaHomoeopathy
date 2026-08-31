import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Search, ShieldAlert, Award, Clock, ArrowRight, CheckCircle2, 
  Sparkles, FileText, Scale, HelpCircle, Layers, Bookmark, BookmarkCheck,
  ChevronRight, Activity, Zap, Brain, CheckSquare, RefreshCw, HeartPulse
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { FMT_DETAILED_CHAPTERS, FMTChapterDetail } from '../data/fmtDetailedChapters';
import { searchFMTTopics } from '../utils/fmtSearch';

import FmtBottomNav from '../components/FmtBottomNav';

export default function FmtLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'all' | 'section-a' | 'section-b'>('all');
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [bookmarkedChapters, setBookmarkedChapters] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem('curiva_fmt_completed');
      if (savedCompleted) setCompletedChapters(JSON.parse(savedCompleted));

      const savedBookmarks = localStorage.getItem('curiva_fmt_bookmarks');
      if (savedBookmarks) setBookmarkedChapters(JSON.parse(savedBookmarks));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedChapters.includes(id)) {
      updated = bookmarkedChapters.filter((chId) => chId !== id);
    } else {
      updated = [...bookmarkedChapters, id];
    }
    setBookmarkedChapters(updated);
    localStorage.setItem('curiva_fmt_bookmarks', JSON.stringify(updated));
  };

  const modules = [
    {
      id: 'death-postmortem-changes',
      title: 'Death & Postmortem Changes',
      icon: <Clock className="w-6 h-6" />,
      section: 'Forensic Medicine',
      topics: FMT_DETAILED_CHAPTERS.filter(t => t.id.includes('death-postmortem-changes'))
    },
    {
      id: 'mechanical-injuries',
      title: 'Mechanical Injuries',
      icon: <Activity className="w-6 h-6" />,
      section: 'Forensic Medicine',
      topics: FMT_DETAILED_CHAPTERS.filter(t => t.id.includes('mechanical-injuries'))
    },
    {
      id: 'asphyxia',
      title: 'Violent Asphyxia',
      icon: <HeartPulse className="w-6 h-6" />,
      section: 'Forensic Medicine',
      topics: FMT_DETAILED_CHAPTERS.filter(t => t.id.includes('asphyxia'))
    },
    {
      id: 'general-toxicology',
      title: 'General Toxicology',
      icon: <ShieldAlert className="w-6 h-6" />,
      section: 'Toxicology',
      topics: FMT_DETAILED_CHAPTERS.filter(t => t.id.includes('general-toxicology'))
    },
    {
      id: 'pesticides',
      title: 'Pesticides & Agrochemicals',
      icon: <Zap className="w-6 h-6" />,
      section: 'Toxicology',
      topics: FMT_DETAILED_CHAPTERS.filter(t => t.id.includes('pesticides'))
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Learn FMT | Structured BHMS Learning Dashboard | Curiva Homoeopathy"
        description="Master Forensic Medicine and Toxicology with our module-based learning paths."
      />

      <div className="max-w-5xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
                Learn FMT
              </h1>
              <p className="text-lg text-text-secondary font-medium italic">
                Structured learning paths for BHMS students.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-border/60 rounded-2xl text-xs font-medium focus:border-primary outline-none transition-all shadow-soft"
              />
            </div>
          </div>
        </div>

        {/* Forensic Medicine Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-black text-text-primary uppercase tracking-widest">
              Forensic Medicine
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.filter(m => m.section === 'Forensic Medicine').map((module) => (
              <Link 
                key={module.id}
                to={`/fmt/learn/${module.id}`}
                className="group p-8 bg-white dark:bg-zinc-900 border border-border/60 rounded-[2rem] shadow-soft hover:shadow-glow hover:border-primary/30 transition-all flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-bg-secondary rounded-2xl text-primary group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  <div className="px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                    {module.topics.length} Topics
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-black text-text-primary group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-primary rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">
                    Continue Learning
                  </span>
                  <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Toxicology Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500 rounded-xl text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-black text-text-primary uppercase tracking-widest">
              Toxicology
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.filter(m => m.section === 'Toxicology').map((module) => (
              <Link 
                key={module.id}
                to={`/fmt/learn/${module.id}`}
                className="group p-8 bg-white dark:bg-zinc-900 border border-border/60 rounded-[2rem] shadow-soft hover:shadow-glow hover:border-rose-500/30 transition-all flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-bg-secondary rounded-2xl text-rose-500 group-hover:scale-110 transition-transform">
                    {module.icon}
                  </div>
                  <div className="px-3 py-1 bg-rose-500/5 rounded-full text-[10px] font-black uppercase tracking-widest text-rose-500 border border-rose-500/10">
                    {module.topics.length} Topics
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-black text-text-primary group-hover:text-rose-500 transition-colors">
                    {module.title}
                  </h3>
                  <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-rose-500 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">
                    Start Module
                  </span>
                  <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <FmtBottomNav />
    </div>
  );
}
