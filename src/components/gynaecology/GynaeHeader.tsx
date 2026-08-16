import React from 'react';
import { 
  Baby, 
  BookOpen, 
  Clock, 
  Award, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Activity, 
  Stethoscope, 
  HeartHandshake 
} from 'lucide-react';
import { nchGynaeCourseDetails } from '../../data/nchGynecologyCurriculum';

interface GynaeHeaderProps {
  onExploreSyllabus: () => void;
  onExploreCompetencies: () => void;
  onExploreTherapeutics: () => void;
}

export function GynaeHeader({
  onExploreSyllabus,
  onExploreCompetencies,
  onExploreTherapeutics
}: GynaeHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-rose-950 via-pink-900 to-purple-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-rose-800/40 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs font-bold uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5 text-rose-300" />
            Subject Code: {nchGynaeCourseDetails.subjectCode}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-100 border border-white/15 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-pink-300" />
            {nchGynaeCourseDetails.revisionDate}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            NCH Competency-Based Dynamic Curriculum (CBDC)
          </span>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-3 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Gynaecology & Obstetrics
            <span className="block text-xl sm:text-2xl lg:text-3xl font-light text-rose-200 font-sans mt-1">
              Including Neonatology & Classical Homoeopathic Therapeutics
            </span>
          </h1>
          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-normal">
            Official 2nd Professional BHMS digital curriculum portal. Comprehensive mastery of female reproductive anatomy and physiology, normal pregnancy, mechanism of labor, puerperal care, neonatal resuscitation, gynaecological pathologies, emergency triage, and evidence-informed Homoeopathic prescribing.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/30 text-rose-200 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">150 Hrs</div>
              <div className="text-xs text-rose-200/80">Theory Lectures</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/30 text-purple-200 shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">150 Hrs</div>
              <div className="text-xs text-rose-200/80">Clinical & Practical</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-500/30 text-pink-200 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">12 Weeks</div>
              <div className="text-xs text-rose-200/80">Bedside Postings</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/30 text-amber-200 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">300 Marks</div>
              <div className="text-xs text-rose-200/80">200 Th + 100 Prac</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onExploreSyllabus}
            className="inline-flex items-center gap-2 bg-white text-rose-950 hover:bg-rose-50 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all duration-200 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-rose-700" />
            Explore Complete Syllabus
          </button>

          <button
            onClick={onExploreCompetencies}
            className="inline-flex items-center gap-2 bg-rose-800/80 hover:bg-rose-700/80 text-white border border-rose-400/30 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-rose-300" />
            CBDC Competency Matrix
          </button>

          <button
            onClick={onExploreTherapeutics}
            className="inline-flex items-center gap-2 bg-purple-800/80 hover:bg-purple-700/80 text-white border border-purple-400/30 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95"
          >
            <Activity className="w-4 h-4 text-purple-300" />
            OBG Homoeopathic Therapeutics
          </button>
        </div>
      </div>
    </div>
  );
}
