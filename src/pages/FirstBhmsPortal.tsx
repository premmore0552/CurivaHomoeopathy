import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  FlaskConical, 
  Activity, 
  Heart, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';

export default function FirstBhmsPortal() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="1st BHMS Academic Portal | Curiva Homoeopathy"
        description="Dedicated academic portal for 1st BHMS students. Anatomy, Physiology & Biochemistry, Homoeopathic Pharmacy, and Organon Philosophy syllabus."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-primary to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            1st Year BHMS Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            1st BHMS Academic Center
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Your essential guide to first-year subjects, including Organon of Medicine, Homoeopathic Philosophy and Fundamentals of Psychology. Organon covers §§1–27 and §§105–145.
          </p>
        </div>
      </div>

      <section className="mb-7 rounded-3xl border border-purple-200 bg-purple-50/70 p-6 dark:border-purple-900/50 dark:bg-purple-950/20">
        <p className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">HomUG-OM-I · NCH CBDC</p>
        <h2 className="mt-1 text-xl font-serif font-bold text-text-primary">Organon of Medicine & Homoeopathic Philosophy — I</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">History, logic, fundamentals, physician, drug proving, §§1–27, §§105–145 and Fundamentals of Psychology.</p>
        <Link to="/organon/1st-bhms" className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-800 px-5 py-3 text-xs font-bold text-white hover:bg-purple-700">Open Organon — 1st BHMS <ArrowRight className="h-4 w-4" /></Link>
      </section>

      {/* 1st BHMS Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 w-fit rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Anatomy Paper I & II</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Gross Anatomy, Histology, Embryology, Neuroanatomy, and Surface Marking.
          </p>
          <Link to="/subject/anatomy" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Anatomy Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 w-fit rounded-2xl">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Physiology & Biochemistry</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Systemic organ functions, Hematology, Endocrinology, Biophysics & Metabolism.
          </p>
          <Link to="/subject/physiology" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Physiology Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 w-fit rounded-2xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Homoeopathic Pharmacy</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Drug sources, vehicles, potentisation scales, trituration, and prescription writing.
          </p>
          <Link to="/subject/pharmacy" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Pharmacy Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
