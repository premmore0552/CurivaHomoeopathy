import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Microscope, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Activity,
  ShieldAlert,
  BookMarked,
  HeartPulse,
  Award,
  Zap,
  ChevronRight,
  ListTree,
  Stethoscope,
  Filter,
  ShieldCheck,
  GraduationCap,
  Flame
} from 'lucide-react';
import SEO from '../components/SEO';
import { PathologyHeader } from '../components/pathology/PathologyHeader';
import { PathologySearch } from '../components/pathology/PathologySearch';
import { PathologyOverviewGrid } from '../components/pathology/PathologyOverviewGrid';
import { PathologySectionCards } from '../components/pathology/PathologySectionCards';
import { PathologyStudyTools } from '../components/pathology/PathologyStudyTools';
import { PathologyExamPrep } from '../components/pathology/PathologyExamPrep';
import { PathologyProgressCard } from '../components/pathology/PathologyProgressCard';
import { PathologyDetailModal } from '../components/pathology/PathologyDetailModal';

import { NchCurriculumDashboard } from '../components/pathology/NchCurriculumDashboard';
import { NchCurriculumExplorer } from '../components/pathology/NchCurriculumExplorer';
import { PathologyPracticalHub } from '../components/pathology/PathologyPracticalHub';
import { NchCompetencyModal } from '../components/pathology/NchCompetencyModal';
import { CellInjuryChapterView } from '../components/pathology/CellInjuryChapterView';

import { 
  generalPathologyChapters, 
  systemicPathologyChapters, 
  pathologyStudyTools, 
  sampleDefinitions, 
  sampleComparisons, 
  examQuestionsBank 
} from '../data/pathologyData';

import { allNchPathologyCompetencies } from '../data/nchPathologyCurriculum';
import { PathologyChapter, PathologyTopic, PathologyProgress, NchCompetency } from '../types/pathology';

export default function PathologySubject() {
  const [activeTab, setActiveTab] = useState<'hub' | 'cell-injury' | 'curriculum' | 'general' | 'systemic' | 'practical' | 'exam-prep' | 'tools' | 'miasmatic' | 'lab'>('hub');
  
  // Modal preview state for legacy items
  const [selectedModalData, setSelectedModalData] = useState<{ type: string | null; data: any }>({
    type: null,
    data: null,
  });

  // Selected NCH Competency Modal
  const [selectedCompetency, setSelectedCompetency] = useState<NchCompetency | null>(null);

  // Reference for scrolling to study modules
  const overviewRef = useRef<HTMLDivElement>(null);
  const syllabusRef = useRef<HTMLDivElement>(null);

  // Dynamic progress stats
  const totalGeneralTopics = generalPathologyChapters.reduce((acc, chap) => acc + chap.topics.length, 0);
  const totalSystemicTopics = systemicPathologyChapters.reduce((acc, chap) => acc + chap.topics.length, 0);
  const laqsCount = examQuestionsBank.filter(q => q.type === 'laq').length;
  const saqsCount = examQuestionsBank.filter(q => q.type === 'saq').length;
  const mcqsCount = 28; // Standard starter bank count
  const vivaCount = examQuestionsBank.filter(q => q.type === 'viva').length;

  const currentProgress: PathologyProgress = {
    generalCompleted: 0,
    generalTotal: totalGeneralTopics,
    systemicCompleted: 0,
    systemicTotal: totalSystemicTopics,
    mcqsCompleted: 0,
    mcqsTotal: mcqsCount,
    laqsCompleted: 0,
    laqsTotal: laqsCount,
    saqsCompleted: 0,
    saqsTotal: saqsCount,
    vivaCompleted: 0,
    vivaTotal: vivaCount,
  };

  const handleStartPathology = () => {
    setActiveTab('curriculum');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleExploreSyllabus = () => {
    setActiveTab('curriculum');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleOpenItemModal = (type: string, item: any) => {
    setSelectedModalData({ type, data: item });
  };

  const handleCloseModal = () => {
    setSelectedModalData({ type: null, data: null });
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEO 
        title="2nd BHMS Pathology — NCH CBDC Master Curriculum Map & Exam Prep | Curiva Homoeopathy"
        description="Official NCH Competency Based Dynamic Curriculum (CBDC) map for 2nd BHMS Pathology. Paper I, Paper II, Histopathology slides, Gross specimens, Lab reports, and examination schemes."
      />

      {/* 1. HERO / HEADER */}
      <PathologyHeader 
        onStartPathology={handleStartPathology}
        onExploreSyllabus={handleExploreSyllabus}
        totalChapters={generalPathologyChapters.length + systemicPathologyChapters.length}
        totalTopics={allNchPathologyCompetencies.length}
      />

      {/* 2. PRIMARY SEARCH INTERFACE */}
      <PathologySearch 
        generalChapters={generalPathologyChapters}
        systemicChapters={systemicPathologyChapters}
        definitions={sampleDefinitions}
        comparisons={sampleComparisons}
        questions={examQuestionsBank}
        onSelectItem={handleOpenItemModal}
      />

      {/* 3. NAVIGATION VIEW TABS */}
      <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'hub', label: 'Pathology Hub', icon: Microscope },
          { id: 'cell-injury', label: 'Cell Injury & Adaptations (Part 3 Master)', icon: Flame },
          { id: 'curriculum', label: 'NCH CBDC Syllabus Map', icon: ShieldCheck },
          { id: 'practical', label: 'Practical (Slides & Specimens)', icon: Layers },
          { id: 'general', label: 'General Pathology (Paper I-A)', icon: BookOpen },
          { id: 'systemic', label: 'Systemic Pathology (Paper I-B)', icon: HeartPulse },
          { id: 'exam-prep', label: 'Exam Prep (LAQ/SAQ/MCQ)', icon: FileText },
          { id: 'tools', label: 'Study Tools', icon: Zap },
          { id: 'miasmatic', label: 'Miasmatic Correlations', icon: Activity },
          { id: 'lab', label: 'Clinical Lab Values', icon: Stethoscope },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-red-800 text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-text-primary border border-border/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT SECTIONS */}

      {/* VIEW: PATHOLOGY HUB (DEFAULT LANDING VIEW) */}
      {activeTab === 'hub' && (
        <div ref={overviewRef} className="space-y-12 animate-fadeIn">
          {/* Section: Master NCH Curriculum Dashboard */}
          <NchCurriculumDashboard 
            onExploreCurriculum={() => setActiveTab('curriculum')}
            onOpenPracticalHub={() => setActiveTab('practical')}
          />

          {/* Spotlight: Cell Injury, Adaptations & Cell Death Master Digital Chapter */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  ⚡ Comprehensive Master Chapter Available
                </span>
                <span className="text-xs text-slate-300">
                  Paper I Section A • HomUG-PM I.2, I.3, I.4, I.5
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Cell Injury, Cellular Adaptations & Cell Death (Complete Master Suite)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Full 8-part digital textbook, 15 interactive flowcharts, 10 comparison tables, 10 clinical cases simulator, histopathology spotters, and university exam blueprints.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('cell-injury')}
                className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Open Master Chapter <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/subject/pathology/cell-injury"
                className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-center"
              >
                Standalone View
              </Link>
            </div>
          </div>

          {/* Section: Overview Grid */}
          <PathologyOverviewGrid 
            onSelectSection={(key) => {
              if (key === 'general') setActiveTab('general');
              else if (key === 'systemic') setActiveTab('systemic');
              else if (['laq', 'saq', 'mcq', 'viva'].includes(key)) setActiveTab('exam-prep');
              else if (key === 'revision' || key === 'definitions') setActiveTab('tools');
            }}
            counts={{
              generalTopics: totalGeneralTopics,
              systemicTopics: totalSystemicTopics,
              laqCount: laqsCount,
              saqCount: saqsCount,
              mcqCount: mcqsCount,
              vivaCount: vivaCount,
              definitionsCount: sampleDefinitions.length,
            }}
          />

          {/* Section: Dedicated General & Systemic Pathology Cards */}
          <PathologySectionCards 
            generalChapters={generalPathologyChapters}
            systemicChapters={systemicPathologyChapters}
            onOpenGeneral={() => setActiveTab('general')}
            onOpenSystemic={() => setActiveTab('systemic')}
            onSelectChapter={(chap) => handleOpenItemModal('chapter', chap)}
          />

          {/* Section: Pathology Study Tools */}
          <PathologyStudyTools 
            tools={pathologyStudyTools}
            onSelectTool={(tool) => handleOpenItemModal('study-tool', tool)}
          />

          {/* Section: Exam Preparation Suite */}
          <PathologyExamPrep 
            onSelectType={(type) => {
              const matched = examQuestionsBank.find(q => q.type === type);
              if (matched) handleOpenItemModal(type, matched);
              else setActiveTab('exam-prep');
            }}
            counts={{
              laqs: laqsCount,
              saqs: saqsCount,
              mcqs: mcqsCount,
              viva: vivaCount,
            }}
          />

          {/* Section: Student Progress Dashboard */}
          <PathologyProgressCard progress={currentProgress} />
        </div>
      )}

      {/* VIEW: CELL INJURY & ADAPTATIONS MASTER DIGITAL CHAPTER */}
      {activeTab === 'cell-injury' && (
        <div className="space-y-6 animate-fadeIn">
          <CellInjuryChapterView />
        </div>
      )}

      {/* VIEW: NCH CBDC CURRICULUM EXPLORER */}
      {activeTab === 'curriculum' && (
        <div className="space-y-8 animate-fadeIn">
          <NchCurriculumDashboard 
            onOpenPracticalHub={() => setActiveTab('practical')}
          />
          <NchCurriculumExplorer 
            onSelectCompetency={(comp) => setSelectedCompetency(comp)}
          />
        </div>
      )}

      {/* VIEW: PRACTICAL & DEMONSTRATION HUB */}
      {activeTab === 'practical' && (
        <PathologyPracticalHub />
      )}

      {/* VIEW: GENERAL PATHOLOGY CHAPTERS */}
      {activeTab === 'general' && (
        <div ref={syllabusRef} className="space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-secondary p-6 rounded-3xl border border-border">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 mb-1">
                Paper I Section A (50 Marks)
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">General Pathology Chapters</h2>
              <p className="text-xs text-text-secondary">NCH-CBDC aligned competency mapped syllabus modules (HomUG-PM I.1 to I.12)</p>
            </div>
            <button
              onClick={() => setActiveTab('curriculum')}
              className="px-3.5 py-1.5 bg-red-800 text-white text-xs font-bold rounded-xl shadow-sm self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              View NCH Competency Map
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generalPathologyChapters.map((chap, idx) => (
              <div key={chap.id} className="bg-bg-secondary border border-border rounded-3xl p-6 hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-red-700 dark:text-red-400">Chapter {idx + 1}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-bg-primary border border-border text-text-tertiary">
                      {chap.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-text-primary">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {chap.description}
                  </p>

                  {/* Topics List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      Chapter Topics:
                    </div>
                    {chap.topics.map((top) => (
                      <div 
                        key={top.id}
                        onClick={() => handleOpenItemModal('topic', top)}
                        className="p-3 bg-bg-primary rounded-xl border border-border/80 hover:border-red-500/40 cursor-pointer group flex items-start justify-between gap-2"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 block leading-tight">
                              {top.title}
                            </span>
                            <span className="text-[10px] text-text-tertiary line-clamp-1">{top.description}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-text-tertiary group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-red-700 dark:text-red-400 font-bold">{chap.competencies.join(', ')}</span>
                  <button 
                    onClick={() => handleOpenItemModal('chapter', chap)}
                    className="text-red-700 dark:text-red-400 font-bold hover:underline cursor-pointer"
                  >
                    View Chapter Blueprint →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: SYSTEMIC PATHOLOGY CHAPTERS */}
      {activeTab === 'systemic' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-secondary p-6 rounded-3xl border border-border">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 mb-1">
                Paper I Section B (50 Marks)
              </div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">Systemic Pathology & Organ Systems</h2>
              <p className="text-xs text-text-secondary">Organ-system based pathology arranged according to 2nd BHMS NCH competencies (HomUG-PM II.1 to II.6)</p>
            </div>
            <button
              onClick={() => setActiveTab('curriculum')}
              className="px-3.5 py-1.5 bg-rose-800 text-white text-xs font-bold rounded-xl shadow-sm self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              View NCH Competency Map
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemicPathologyChapters.map((chap, idx) => (
              <div key={chap.id} className="bg-bg-secondary border border-border rounded-3xl p-6 hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-400">System {idx + 1}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-bg-primary border border-border text-text-tertiary">
                      {chap.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-text-primary">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {chap.description}
                  </p>

                  {/* Topics List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                      Systemic Topics:
                    </div>
                    {chap.topics.map((top) => (
                      <div 
                        key={top.id}
                        onClick={() => handleOpenItemModal('topic', top)}
                        className="p-3 bg-bg-primary rounded-xl border border-border/80 hover:border-rose-500/40 cursor-pointer group flex items-start justify-between gap-2"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold text-text-primary group-hover:text-rose-700 dark:group-hover:text-rose-400 block leading-tight">
                              {top.title}
                            </span>
                            <span className="text-[10px] text-text-tertiary line-clamp-1">{top.description}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-text-tertiary group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-rose-700 dark:text-rose-400 font-bold">{chap.competencies.join(', ')}</span>
                  <button 
                    onClick={() => handleOpenItemModal('chapter', chap)}
                    className="text-rose-700 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                  >
                    View System Blueprint →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: EXAM PREPARATION (LAQ, SAQ, MCQ, VIVA) */}
      {activeTab === 'exam-prep' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-bg-secondary p-6 rounded-3xl border border-border space-y-2">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Pathology University Question Bank</h2>
            <p className="text-xs text-text-secondary">Structured model answers for Long-Answer (10M), Short-Answer (5M), and Oral Examination</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examQuestionsBank.map((q) => (
              <div 
                key={q.id}
                onClick={() => handleOpenItemModal(q.type, q)}
                className="bg-bg-secondary border border-border rounded-3xl p-6 hover:border-red-500/40 hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300">
                      {q.type.toUpperCase()} {q.marks ? `• ${q.marks} Marks` : ''}
                    </span>
                    {q.frequency && (
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        {q.frequency}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {q.preview}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary group-hover:text-red-700 dark:group-hover:text-red-400">
                  <span>View Answer Framework</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: STUDY TOOLS */}
      {activeTab === 'tools' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-bg-secondary p-6 rounded-3xl border border-border space-y-2">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Pathology Study Tools & Quick Tables</h2>
            <p className="text-xs text-text-secondary">Essential textbook definitions and high-yield differentiating tables</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-text-primary">Important Definitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleDefinitions.map((def) => (
                <div 
                  key={def.id}
                  onClick={() => handleOpenItemModal('definition', def)}
                  className="bg-bg-secondary border border-border rounded-2xl p-5 hover:border-red-500/40 cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400">
                      {def.term}
                    </h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300">
                      High Yield
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary italic">"{def.definition}"</p>
                  <p className="text-[11px] text-text-tertiary pt-1 border-t border-border/40">
                    Significance: {def.significance}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-serif font-bold text-text-primary pt-4">High-Yield Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleComparisons.map((comp) => (
                <div 
                  key={comp.id}
                  onClick={() => handleOpenItemModal('comparison', comp)}
                  className="bg-bg-secondary border border-border rounded-2xl p-5 hover:border-red-500/40 cursor-pointer space-y-3 group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block mb-1">
                      {comp.points.length} Differentiating Points
                    </span>
                    <h4 className="text-base font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400">
                      {comp.title}
                    </h4>
                  </div>
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary group-hover:text-red-700">
                    <span>View Table Matrix</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: MIASMATIC PATHOLOGY */}
      {activeTab === 'miasmatic' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                Classical Hahnemannian Synthesis
              </span>
              <h2 className="text-2xl font-serif font-bold text-text-primary">Miasmatic Cleavage in Pathology</h2>
              <p className="text-xs text-text-secondary mt-1">Understanding modern cellular and tissue alterations through fundamental homoeopathic miasms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-bg-primary rounded-2xl border border-border space-y-3">
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-lg inline-block">
                  Psora (Functional & Sensational)
                </span>
                <h4 className="text-sm font-serif font-bold text-text-primary">Hyper-sensitivity & Reversible Congestion</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Characterized by functional disturbances, hyperesthesia, itching without structural lesion, vascular congestion, mild reversible cell swelling, and acute serous inflammation.
                </p>
                <div className="text-[11px] text-text-tertiary pt-2 border-t border-border/50">
                  <strong>Pathology equivalent:</strong> Cellular cloudy swelling, hyperemia, serous catarrhal inflammation.
                </div>
              </div>

              <div className="p-6 bg-bg-primary rounded-2xl border border-border space-y-3">
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-lg inline-block">
                  Sycosis (Infiltrative & Hypertrophic)
                </span>
                <h4 className="text-sm font-serif font-bold text-text-primary">Overgrowth, Hyperplasia & Fibrosis</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Characterized by cellular hyperplasia, tissue hypertrophy, fibrous scarring, keloid formation, cystic degeneration, benign neoplasms, and chronic proliferative inflammation.
                </p>
                <div className="text-[11px] text-text-tertiary pt-2 border-t border-border/50">
                  <strong>Pathology equivalent:</strong> Hypertrophy, hyperplasia, keloids, warts, atherosclerosis, cirrhosis.
                </div>
              </div>

              <div className="p-6 bg-bg-primary rounded-2xl border border-border space-y-3">
                <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 text-xs font-bold rounded-lg inline-block">
                  Syphilis (Destructive & Necrotic)
                </span>
                <h4 className="text-sm font-serif font-bold text-text-primary">Necrosis, Ulceration & Malignancy</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Characterized by cellular death, coagulative/caseous necrosis, deep tissue ulceration, gangrene, malignant anaplasia, structural deformities, and irreversible parenchymal breakdown.
                </p>
                <div className="text-[11px] text-text-tertiary pt-2 border-t border-border/50">
                  <strong>Pathology equivalent:</strong> Coagulative/liquefactive necrosis, caseation in TB, malignant tumors, gangrene.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: LAB & HEMATOLOGY VALUES */}
      {activeTab === 'lab' && (
        <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">Clinical Hematology Reference Values</h2>
              <p className="text-xs text-text-secondary">Standard reference ranges for 2nd BHMS clinical pathology practical examination</p>
            </div>
            <Link 
              to="/cbc-handbook" 
              className="inline-flex items-center gap-1.5 bg-red-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-900 transition-all shadow-sm"
            >
              Full CBC Analyzer <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-text-secondary">
            <div className="p-4 bg-bg-primary rounded-2xl border border-border/80 space-y-1">
              <strong className="text-text-primary font-bold block text-sm">Hemoglobin (Hb)</strong>
              <p>Males: 13.5–17.5 g/dL</p>
              <p>Females: 12.0–15.5 g/dL</p>
            </div>
            <div className="p-4 bg-bg-primary rounded-2xl border border-border/80 space-y-1">
              <strong className="text-text-primary font-bold block text-sm">Total Leukocytes (TLC)</strong>
              <p>4,000 – 11,000 cells/cu.mm</p>
              <p className="text-[11px] text-text-tertiary">Leukocytosis &gt; 11k | Leukopenia &lt; 4k</p>
            </div>
            <div className="p-4 bg-bg-primary rounded-2xl border border-border/80 space-y-1">
              <strong className="text-text-primary font-bold block text-sm">Platelet Count</strong>
              <p>150,000 – 450,000 /cu.mm</p>
              <p className="text-[11px] text-text-tertiary">Critical bleeding alert &lt; 50k</p>
            </div>
            <div className="p-4 bg-bg-primary rounded-2xl border border-border/80 space-y-1">
              <strong className="text-text-primary font-bold block text-sm">ESR (Westergren)</strong>
              <p>Males: 0–15 mm/1st hr</p>
              <p>Females: 0–20 mm/1st hr</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW DRAWER (FOR TOPICS, CHAPTERS, QUESTIONS) */}
      <PathologyDetailModal 
        isOpen={Boolean(selectedModalData.data)}
        onClose={handleCloseModal}
        type={selectedModalData.type}
        data={selectedModalData.data}
      />

      {/* NCH COMPETENCY DETAIL MODAL */}
      <NchCompetencyModal 
        competency={selectedCompetency}
        onClose={() => setSelectedCompetency(null)}
      />
    </div>
  );
}
