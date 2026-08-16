import React from 'react';
import { 
  FileText, 
  Target, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Building2, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { 
  nchGynaeCourseDetails, 
  nchGynaeCourseOutcomes, 
  teachingHoursBreakdown 
} from '../../data/nchGynecologyCurriculum';

export function GynaePreambleOutcomes() {
  return (
    <div className="space-y-10">
      {/* 1. Official Preamble & Course Overview */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Building2 className="w-4 h-4" />
              NCH Official CBDC Framework
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              Course Preamble & Educational Philosophy
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 rounded-full text-xs font-bold">
              Subject Code: HomUG-ObGy-I
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans text-justify">
          {nchGynaeCourseDetails.preamble}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-bg-primary rounded-2xl border border-border/60 space-y-1.5">
            <div className="text-xs font-bold text-primary uppercase tracking-wide">1. Holistic Foundation</div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Integrates reproductive anatomy, endocrine physiology, and pathological deviations with constitutional Homoeopathic similia principles.
            </p>
          </div>
          <div className="p-4 bg-bg-primary rounded-2xl border border-border/60 space-y-1.5">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">2. Bedside Competency</div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Rigorous 12-week clinical training in antenatal clinics, labor room observations, partograph charting, and infant examinations.
            </p>
          </div>
          <div className="p-4 bg-bg-primary rounded-2xl border border-border/60 space-y-1.5">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">3. Life Safety & Referral</div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Mandatory recognition of obstetric red flags (PPH, APH, Eclampsia, Asphyxia) for immediate first-aid and tertiary referral.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Course Outcomes (COs) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Target className="w-4 h-4" />
              Graduate Competencies
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              Course Outcomes (CO 1 – CO 6)
            </h3>
          </div>
          <span className="text-xs text-text-secondary bg-bg-secondary px-3 py-1 rounded-full border border-border">
            6 Core Outcomes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nchGynaeCourseOutcomes.map((co) => (
            <div 
              key={co.code}
              className="bg-bg-secondary border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-primary/10 text-primary font-bold text-xs rounded-lg border border-primary/20">
                    {co.code}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-text-primary font-serif">
                  {co.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {co.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Teaching Hours Breakdown Table */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Clock className="w-4 h-4" />
            Curriculum Time Allocation
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
            Teaching Hours Distribution (Theory & Clinical)
          </h3>
          <p className="text-xs text-text-secondary">
            Official NCH prescribed distribution across lectures, non-lecture sessions, and hospital postings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theory Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                Theory Lecture Hours (150 Hours)
              </h4>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                150 Hours Min
              </span>
            </div>
            <div className="space-y-2">
              {teachingHoursBreakdown.theory.map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs ${
                    idx === teachingHoursBreakdown.theory.length - 1
                      ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                      : 'bg-bg-primary border border-border/60 text-text-secondary'
                  }`}
                >
                  <span>{item.component}</span>
                  <span className="font-semibold">{item.hours} Hrs</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical & Clinical Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                Practical, Clinical & Skill Hours (150 Hours)
              </h4>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                150 Hours Min
              </span>
            </div>
            <div className="space-y-2">
              {teachingHoursBreakdown.practical.map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs ${
                    idx === teachingHoursBreakdown.practical.length - 1
                      ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/20'
                      : 'bg-bg-primary border border-border/60 text-text-secondary'
                  }`}
                >
                  <span>{item.component}</span>
                  <span className="font-semibold">{item.hours} Hrs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>
              <strong>Total Minimum Curricular Load:</strong> 300 Hours (150 Theory + 150 Practical/Clinical) over 2nd BHMS Academic Term.
            </span>
          </div>
          <div className="font-bold text-text-primary shrink-0">
            Bedside Postings: 12 Weeks (OPD / IPD / Labour Room / ANC)
          </div>
        </div>
      </div>
    </div>
  );
}
