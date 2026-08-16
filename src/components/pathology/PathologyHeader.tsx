import React from 'react';
import { Microscope, BookOpen, Layers, Award, Sparkles, ArrowRight } from 'lucide-react';

interface PathologyHeaderProps {
  onStartPathology: () => void;
  onExploreSyllabus: () => void;
  totalChapters: number;
  totalTopics: number;
}

export const PathologyHeader: React.FC<PathologyHeaderProps> = ({
  onStartPathology,
  onExploreSyllabus,
  totalChapters,
  totalTopics,
}) => {
  return (
    <div className="bg-gradient-to-r from-red-950 via-rose-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl space-y-5">
        {/* NCH Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-red-200 text-xs font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md">
          <Award className="w-4 h-4 text-red-400 shrink-0" />
          <span>NCH-CBDC 2nd Professional BHMS Curriculum</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            2nd BHMS Pathology
          </h1>
          <p className="text-base sm:text-xl font-medium text-red-200">
            Complete NCH-CBDC aligned notes, exam preparation, MCQs, LAQs, SAQs, viva and rapid revision.
          </p>
        </div>

        {/* Short Description */}
        <p className="text-red-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          This comprehensive study center is designed specifically for 2nd BHMS students. Master cellular alterations, hemodynamic derangements, systemic organ changes, diagnostic lab profiles, and their classical Hahnemannian miasmatic correlations.
        </p>

        {/* Quick Highlights / Stats Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
            <div className="text-xl font-bold text-white">{totalChapters} Chapters</div>
            <div className="text-[10px] text-red-200 uppercase font-semibold">General & Systemic</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
            <div className="text-xl font-bold text-white">{totalTopics} Topics</div>
            <div className="text-[10px] text-red-200 uppercase font-semibold">Competency Mapped</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
            <div className="text-xl font-bold text-white">LAQ & SAQ</div>
            <div className="text-[10px] text-red-200 uppercase font-semibold">University Exam Banks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
            <div className="text-xl font-bold text-white">Viva Ready</div>
            <div className="text-[10px] text-red-200 uppercase font-semibold">Oral Questions & Tests</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-3">
          <button
            onClick={onStartPathology}
            className="inline-flex items-center gap-2 bg-white text-red-950 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-red-50 hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Microscope className="w-4 h-4 text-red-700" />
            Start Pathology
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          
          <button
            onClick={onExploreSyllabus}
            className="inline-flex items-center gap-2 bg-red-800/60 text-white border border-red-400/30 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-red-800 hover:border-red-400/50 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-red-200" />
            Explore Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};
