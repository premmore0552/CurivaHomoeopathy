import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Scissors, 
  Baby, 
  Compass, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';

export default function ThirdBhmsPortal() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="3rd BHMS Academic Portal | Curiva Homoeopathy"
        description="Dedicated academic portal for 3rd BHMS students. Surgery, Gynecology & Obstetrics, Repertory, Materia Medica, and Organon."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            3rd Year BHMS Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            3rd BHMS Academic Center
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Master General Surgery, ENT, Ophthalmology, Orthopaedics, Gynecology & Obstetrics, Repertory fundamentals, and Organon posology (§146–§291).
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 w-fit rounded-2xl">
            <Scissors className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Surgery & Therapeutics</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            General surgery, GI surgery, ENT, Ophthalmology, Orthopaedics, and pre/post-op remedies.
          </p>
          <Link to="/subject/surgery" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Surgery Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300 w-fit rounded-2xl">
            <Baby className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Gynecology & Obstetrics</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Antenatal care, labor mechanisms, menstrual disorders, PCOS, and OBG therapeutics.
          </p>
          <Link to="/subject/gynecology-obstetrics" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View OBG Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 w-fit rounded-2xl">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-text-primary">Repertory & Organon</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Kent repertory 37 chapters, case taking methods, and chronic disease management.
          </p>
          <Link to="/subject/repertory" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline pt-2">
            View Repertory Module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
