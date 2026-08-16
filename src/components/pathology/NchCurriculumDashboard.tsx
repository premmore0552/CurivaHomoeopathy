import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Award, 
  FileText, 
  HelpCircle, 
  Activity,
  Microscope,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';
import { getCurriculumCoverageStats, nchExamBlueprint } from '../../data/nchPathologyCurriculum';

interface NchCurriculumDashboardProps {
  onExploreCurriculum?: () => void;
  onOpenPracticalHub?: () => void;
}

export const NchCurriculumDashboard: React.FC<NchCurriculumDashboardProps> = ({
  onExploreCurriculum,
  onOpenPracticalHub
}) => {
  const stats = getCurriculumCoverageStats();

  return (
    <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900">
              <ShieldCheck className="w-3.5 h-3.5" />
              NCH CBDC Master Curriculum Map
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-3 h-3" />
              Source: CBDC-2nd-BHMS-Professional-Course
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
            Official 2nd BHMS Pathology Curriculum Coverage
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-3xl leading-relaxed">
            Strictly derived from the National Commission for Homoeopathy (NCH) Competency Based Dynamic Curriculum. 
            All competencies, Specific Learning Objectives (SLOs), Miller's levels, and examination patterns mapped.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-center">
          {onExploreCurriculum && (
            <button
              onClick={onExploreCurriculum}
              className="px-4 py-2.5 bg-red-800 hover:bg-red-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Explore All Competencies
            </button>
          )}
        </div>
      </div>

      {/* 2. Coverage Metrics & Dynamic Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-red-700 dark:text-red-400" />
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
              NCH Pathology Syllabus Coverage Status
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 rounded-lg">
            Curriculum mapped — study content pending
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* General Pathology Progress Card */}
          <div className="bg-bg-primary border border-border p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-text-primary">General Pathology</span>
              <span className="font-mono text-red-700 dark:text-red-400 font-bold">
                {stats.generalCompetencies} / {stats.generalCompetencies} Mapped
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <div className="bg-red-700 h-2 rounded-full w-full"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-tertiary">
              <span>Paper I (Section A)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Mapped</span>
            </div>
          </div>

          {/* Systemic Pathology Progress Card */}
          <div className="bg-bg-primary border border-border p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-text-primary">Systemic Pathology</span>
              <span className="font-mono text-red-700 dark:text-red-400 font-bold">
                {stats.systemicCompetencies} / {stats.systemicCompetencies} Mapped
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <div className="bg-red-700 h-2 rounded-full w-full"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-tertiary">
              <span>Paper I (Section B)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Mapped</span>
            </div>
          </div>

          {/* Practical Pathology Progress Card */}
          <div className="bg-bg-primary border border-border p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-text-primary">Practical Pathology</span>
              <span className="font-mono text-red-700 dark:text-red-400 font-bold">
                {stats.practicalCompetencies} / {stats.practicalCompetencies} Mapped
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <div className="bg-red-700 h-2 rounded-full w-full"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-tertiary">
              <span>Slides, Specimens & Lab</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Mapped</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official University Examination Blueprint */}
      <div className="bg-bg-primary border border-border/80 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">
              Official University Examination Scheme (2nd BHMS)
            </h4>
          </div>
          <span className="text-xs font-mono text-text-secondary bg-bg-secondary px-2.5 py-1 rounded border border-border">
            Total Course Marks: 300 (Theory 200 + Practical 100)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Paper I Blueprint */}
          <div className="border border-red-200 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-800 dark:text-red-300">PAPER I (THEORY)</span>
              <span className="px-2 py-0.5 bg-red-800 text-white text-[11px] font-bold rounded">100 Marks</span>
            </div>
            <div className="text-xs font-semibold text-text-primary">
              General Pathology & Systemic Pathology
            </div>
            <div className="space-y-1.5 text-xs text-text-secondary pt-1 border-t border-red-200/60 dark:border-red-900/60">
              <div className="flex justify-between">
                <span>• Long Answer Questions (LAQs):</span>
                <span className="font-bold text-text-primary">50 Marks (5 × 10M)</span>
              </div>
              <div className="flex justify-between">
                <span>• Short Answer Questions (SAQs):</span>
                <span className="font-bold text-text-primary">40 Marks (8 × 5M)</span>
              </div>
              <div className="flex justify-between">
                <span>• Multiple Choice Questions (MCQs):</span>
                <span className="font-bold text-text-primary">10 Marks (10 × 1M)</span>
              </div>
            </div>
          </div>

          {/* Paper II Blueprint */}
          <div className="border border-border bg-bg-secondary p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-primary">PAPER II (THEORY)</span>
              <span className="px-2 py-0.5 bg-bg-primary text-text-secondary text-[11px] font-bold rounded border border-border">100 Marks</span>
            </div>
            <div className="text-xs font-semibold text-text-primary">
              Microbiology & Parasitology
            </div>
            <div className="space-y-1.5 text-xs text-text-secondary pt-1 border-t border-border">
              <div className="flex justify-between">
                <span>• Bacteriology (General & Systemic):</span>
                <span className="font-bold text-text-primary">50 Marks</span>
              </div>
              <div className="flex justify-between">
                <span>• Virology, Parasitology & Mycology:</span>
                <span className="font-bold text-text-primary">50 Marks</span>
              </div>
              <div className="text-[11px] text-text-tertiary italic pt-1">
                (Kept as separate Paper II syllabus as per NCH standards)
              </div>
            </div>
          </div>

          {/* Practical Blueprint */}
          <div className="border border-border bg-bg-secondary p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-primary">PRACTICAL & VIVA VOCE</span>
              <span className="px-2 py-0.5 bg-bg-primary text-text-secondary text-[11px] font-bold rounded border border-border">100 Marks</span>
            </div>
            <div className="text-xs font-semibold text-text-primary">
              Laboratory, Histopath & Morbid Anatomy
            </div>
            <div className="space-y-1.5 text-xs text-text-secondary pt-1 border-t border-border">
              <div className="flex justify-between">
                <span>• Clinical Pathology / Urine / Hb:</span>
                <span className="font-bold text-text-primary">25 Marks</span>
              </div>
              <div className="flex justify-between">
                <span>• Histopathology Slides:</span>
                <span className="font-bold text-text-primary">15 Marks</span>
              </div>
              <div className="flex justify-between">
                <span>• Gross Pathology Specimens:</span>
                <span className="font-bold text-text-primary">15 Marks</span>
              </div>
              <div className="flex justify-between">
                <span>• Lab Reports / OSPE:</span>
                <span className="font-bold text-text-primary">15 Marks</span>
              </div>
              <div className="flex justify-between">
                <span>• Viva Voce & Journal:</span>
                <span className="font-bold text-text-primary">30 Marks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Category Jump Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-bg-primary border border-border rounded-xl p-3 text-center space-y-1">
          <div className="text-xl font-bold font-serif text-red-800 dark:text-red-400">
            {stats.totalCompetencies}
          </div>
          <div className="text-[11px] text-text-secondary uppercase font-semibold">
            Official Competencies
          </div>
        </div>
        <div className="bg-bg-primary border border-border rounded-xl p-3 text-center space-y-1">
          <div className="text-xl font-bold font-serif text-text-primary">
            {stats.slidesCount}
          </div>
          <div className="text-[11px] text-text-secondary uppercase font-semibold">
            Histopath Slides
          </div>
        </div>
        <div className="bg-bg-primary border border-border rounded-xl p-3 text-center space-y-1">
          <div className="text-xl font-bold font-serif text-text-primary">
            {stats.specimensCount}
          </div>
          <div className="text-[11px] text-text-secondary uppercase font-semibold">
            Gross Specimens
          </div>
        </div>
        <div className="bg-bg-primary border border-border rounded-xl p-3 text-center space-y-1">
          <div className="text-xl font-bold font-serif text-text-primary">
            {stats.labReportsCount}
          </div>
          <div className="text-[11px] text-text-secondary uppercase font-semibold">
            Lab Diagnostic Panels
          </div>
        </div>
      </div>
    </div>
  );
};
