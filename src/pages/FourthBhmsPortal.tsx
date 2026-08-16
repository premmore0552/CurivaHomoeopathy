import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Stethoscope, 
  Compass, 
  BookOpen, 
  ArrowRight, 
  Award
} from 'lucide-react';
import SEO from '../components/SEO';

export default function FourthBhmsPortal() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="4th BHMS Final Year Academic Portal | Curiva Homoeopathy"
        description="Dedicated academic portal for 4th BHMS & Final Year students. Practice of Medicine, Repertory, Materia Medica, Organon & Community Medicine."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            4th Year BHMS Final Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            4th BHMS Final Academic Center
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Master Practice of Medicine, Clinical Homoeopathic Therapeutics, Advanced Repertorization, Organon Philosophy, and Community Medicine for University Finals & Internship Readiness.
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 w-fit rounded-2xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Practice of Medicine</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Internal medicine, systemic diagnosis, tropical fevers, and clinical therapeutics.
          </p>
          <Link to="/subject/practice-of-medicine" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Medicine Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 w-fit rounded-2xl">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Repertory & Case Logic</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Boenninghausen TPB, Boger BBCR, computer software, and case analysis.
          </p>
          <Link to="/subject/repertory" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Repertory Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 w-fit rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Materia Medica & Organon</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Comparative Materia Medica, clinical keynotes, and organon philosophy.
          </p>
          <Link to="/subject/materia-medica" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Materia Medica Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
