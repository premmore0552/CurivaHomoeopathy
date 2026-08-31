import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, Clock, BookOpen, ChevronRight, Zap, Target } from 'lucide-react';
import { FMT_DETAILED_CHAPTERS } from '../data/fmtDetailedChapters';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FmtModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  
  // In a real app, we'd have a MODULES data object. For now, we derive it.
  const moduleTitle = moduleId?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Module';
  const topics = FMT_DETAILED_CHAPTERS.filter(t => t.id.includes(moduleId || ''));

  // Mock progress (in real app, this comes from a context/localStorage)
  const completedCount = 2; // Mock
  const totalCount = topics.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title={`${moduleTitle} | FMT Learning Path | Curiva Homoeopathy`}
        description={`Master ${moduleTitle} with our structured learning path designed for BHMS students.`}
      />

      <div className="max-w-4xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6">
          <Breadcrumbs />
          <div className="space-y-4">
            <Link 
              to="/fmt/learn" 
              className="inline-flex items-center gap-2 text-xs font-bold text-text-tertiary hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO LEARN DASHBOARD
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
                {moduleTitle}
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl font-medium leading-relaxed">
                Understand the core concepts, mechanisms, and medicolegal significance of {moduleTitle.toLowerCase()}.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[2rem] p-8 shadow-soft flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-bg-secondary"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - progressPercent / 100)}
                className="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-black text-text-primary">{progressPercent}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-text-primary">Your Progress</h3>
            <p className="text-sm text-text-secondary font-medium">
              You've completed <span className="text-primary font-bold">{completedCount}</span> out of <span className="font-bold">{totalCount}</span> topics in this module.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                <Clock className="w-3.5 h-3.5" />
                ~45 mins left
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                <Target className="w-3.5 h-3.5" />
                Exam Focus: High
              </div>
            </div>
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Continue Learning
          </button>
        </div>

        {/* Learning Path */}
        <div className="space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-tertiary px-2">
            YOUR LEARNING PATH
          </h2>
          <div className="grid gap-4">
            {topics.map((topic, idx) => (
              <Link 
                key={topic.id}
                to={`/fmt/learn/${moduleId}/${topic.id}`}
                className="group p-6 bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl shadow-soft hover:border-primary/30 transition-all flex items-center gap-6"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-bg-secondary text-text-tertiary group-hover:bg-primary group-hover:text-white transition-all font-black text-lg">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                      {topic.title}
                    </h3>
                    {idx < completedCount && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {topic.studyTime || '10 min'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-amber-500" />
                      {topic.examImportance || 'High Yield'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Revision Card */}
        <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-800/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-4 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-500/20">
            <Zap className="w-8 h-8" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200">Revision Ready?</h3>
            <p className="text-sm text-amber-800/70 dark:text-amber-400/70 font-medium leading-relaxed">
              Quickly revise all high-yield points from this module before your practical or viva.
            </p>
          </div>
          <Link 
            to="/fmt/quick-revision"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
          >
            Open Revision Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
