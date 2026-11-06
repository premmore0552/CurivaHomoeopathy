import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  Activity, 
  Heart, 
  Search, 
  Filter, 
  Layers, 
  Award, 
  ShieldAlert, 
  FileText, 
  Stethoscope, 
  Scissors, 
  Baby, 
  BookMarked, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Flame,
  Brain,
  FlaskConical,
  Compass,
  Cpu
} from 'lucide-react';
import SEO from '../components/SEO';
import SubjectStudyTools from '../components/SubjectStudyTools';

import { allBhmsSubjects } from '../data/bhmsSubjects';
export { allBhmsSubjects };
export type { SubjectChapter, SubjectItem } from '../data/bhmsSubjects';

export default function AllSubjectsHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearParam = searchParams.get('year');

  const [selectedYear, setSelectedYear] = useState<'All' | '1st BHMS' | '2nd BHMS' | '3rd BHMS' | '4th BHMS'>(() => {
    if (yearParam && ['1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'].includes(yearParam)) {
      return yearParam as any;
    }
    return 'All';
  });

  useEffect(() => {
    if (yearParam && ['1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'].includes(yearParam)) {
      setSelectedYear(yearParam as any);
    } else if (!yearParam && selectedYear !== 'All') {
      // Keep selectedYear or reset if empty
    }
  }, [yearParam]);

  const handleYearChange = (year: 'All' | '1st BHMS' | '2nd BHMS' | '3rd BHMS' | '4th BHMS') => {
    setSelectedYear(year);
    if (year === 'All') {
      searchParams.delete('year');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), year });
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Pre-Clinical' | 'Para-Clinical' | 'Clinical' | 'Homoeopathic Core'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  const filteredSubjects = useMemo(() => {
    return allBhmsSubjects.filter(sub => {
      const matchesYear = selectedYear === 'All' || sub.year === selectedYear;
      const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        sub.title.toLowerCase().includes(q) ||
        sub.code.toLowerCase().includes(q) ||
        sub.summary.toLowerCase().includes(q) ||
        sub.chapters.some(ch => ch.title.toLowerCase().includes(q)) ||
        sub.highYieldTopics.some(t => t.toLowerCase().includes(q));

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [selectedYear, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEO 
        title="BHMS Subject Directory & Study Center (1st, 2nd, 3rd, 4th Year) | Curiva Homoeopathy"
        description="Master index of all 1st, 2nd, 3rd, and 4th BHMS subjects, chapters, NCH CBDC syllabus maps, high-yield exam notes, flashcards, MCQs, and clinical correlations."
      />

      {/* Top Breadcrumb & Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">BHMS Subject Directory &amp; Study Center</span>
        </div>

        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              NCH Competency-Based Curriculum (CBDC)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              All BHMS Subjects &amp; Study Center
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Explore the complete 4.5-year BHMS academic curriculum organized strictly by Professional Year (1st, 2nd, 3rd, and 4th BHMS). Access full subject textbooks, core chapters, university blueprints, active recall flashcards, and 5,000+ AIAPGET practice questions in one unified place.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards to Dedicated Study Suites */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Link
          to="/university-blueprints"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-xl">
              <FileText className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              University Blueprints
            </h3>
            <p className="text-[11px] text-text-tertiary">Solved PYQs &amp; Model LAQ/SAQs</p>
          </div>
        </Link>

        <Link
          to="/flashcards"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-xl">
              <Layers className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              100+ Flashcards
            </h3>
            <p className="text-[11px] text-text-tertiary">Active Recall &amp; 3D Flip System</p>
          </div>
        </Link>

        <Link
          to="/aiapget-mcq-simulator"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              5000+ AIAPGET MCQs
            </h3>
            <p className="text-[11px] text-text-tertiary">Sandbox &amp; Timed Exam Modes</p>
          </div>
        </Link>

        <Link
          to="/clinical-therapeutics"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-xl">
              <Stethoscope className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              Clinical Therapeutics
            </h3>
            <p className="text-[11px] text-text-tertiary">Bedside Remedy Protocols</p>
          </div>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-5 space-y-4 shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, chapters, topics (e.g., 'Cell Injury', 'Brachial Plexus', 'Aphorism 153', 'Inguinal Hernia')..."
            className="w-full pl-11 pr-4 py-3 bg-bg-primary rounded-2xl border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-text-primary placeholder:text-text-tertiary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary hover:text-text-primary px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Year Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">Year:</span>
          {(['All', '1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'] as const).map((yr) => (
            <button
              key={yr}
              onClick={() => handleYearChange(yr)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedYear === yr
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">Category:</span>
          {(['All', 'Pre-Clinical', 'Para-Clinical', 'Clinical', 'Homoeopathic Core'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-text-primary text-bg-primary shadow-sm'
                  : 'bg-bg-primary text-text-tertiary hover:text-text-primary border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary flex items-center gap-2">
          <span>Curriculum Subject Matrix</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'Subject' : 'Subjects'} Found
          </span>
        </h2>
        <div className="text-xs text-text-tertiary hidden sm:block">
          Showing {selectedYear} • {selectedCategory}
        </div>
      </div>

      {/* Subjects Grid & Detailed Cards */}
      <div className="space-y-6">
        {filteredSubjects.map((sub) => {
          const SubIcon = sub.icon;
          const isExpanded = expandedSubjectId === sub.id;

          return (
            <div
              key={sub.id}
              className="bg-bg-secondary border border-border rounded-3xl p-5 sm:p-7 space-y-5 hover:border-primary/30 transition-all shadow-sm"
            >
              {/* Top Header of the Subject Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl ${sub.iconBg} shrink-0`}>
                    <SubIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                        {sub.code}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${sub.badgeColor}`}>
                        {sub.year}
                      </span>
                      <span className="text-[11px] font-bold text-text-tertiary px-2 py-0.5 bg-bg-primary rounded-md border border-border">
                        {sub.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-text-primary">
                      {sub.title}
                    </h3>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={sub.mainRoute}
                    className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Open Subject Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                    className="px-3 py-2.5 rounded-xl bg-bg-primary text-text-secondary hover:text-text-primary border border-border text-xs font-bold transition-all"
                  >
                    {isExpanded ? 'Hide Chapters' : 'View Chapters & Topics'}
                  </button>
                </div>
              </div>

              {/* Subject Info & Summary */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {sub.summary}
              </p>

              {/* Exam & Hours Metadata Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3.5 bg-bg-primary rounded-2xl border border-border text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Total Marks</span>
                  <span className="font-bold text-text-primary">{sub.totalMarks} Marks</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Theory Hours</span>
                  <span className="font-bold text-text-primary">{sub.theoryHours} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Practical Hours</span>
                  <span className="font-bold text-text-primary">{sub.practicalHours} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Exam Pattern</span>
                  <span className="font-bold text-text-primary truncate block" title={sub.examPattern}>{sub.examPattern}</span>
                </div>
              </div>

              {/* Spotlight: Cell Injury if Pathology */}
              {sub.id === 'pathology' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-slate-900 text-white border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Flagship Digital Chapter Active</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Cell Injury, Cellular Adaptations &amp; Cell Death Master Suite
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      8-part textbook, 15 flowcharts, 10 comparison tables, 10 clinical vignettes, and spotter keys.
                    </p>
                  </div>
                  <Link
                    to="/subject/pathology/cell-injury"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shrink-0 transition-all flex items-center gap-1"
                  >
                    Open Master Chapter <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Expandable Chapters & High-Yield Topics */}
              {isExpanded && (
                <div className="pt-2 space-y-4 border-t border-border animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">
                      Core Syllabus Chapters &amp; Units
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {sub.chapters.map((ch, chIdx) => (
                        <div
                          key={chIdx}
                          className="p-3 bg-bg-primary rounded-xl border border-border flex items-center justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs font-medium text-text-primary leading-tight">
                              {ch.title}
                            </span>
                          </div>
                          {ch.tag && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-bg-secondary text-text-tertiary border border-border shrink-0">
                              {ch.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                      High-Yield University Topics (LAQ &amp; SAQ Focus)
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                      {sub.highYieldTopics.map((top, topIdx) => (
                        <li key={topIdx} className="flex items-start gap-2 bg-bg-primary p-2.5 rounded-xl border border-border/60">
                          <span className="text-primary font-bold">•</span>
                          <span className="leading-relaxed">{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SubjectStudyTools subject={sub.title} chapters={sub.chapters.map(ch => ch.title)} />
                </div>
              )}
            </div>
          );
        })}

        {filteredSubjects.length === 0 && (
          <div className="p-12 text-center bg-bg-secondary rounded-3xl border border-border space-y-3">
            <Search className="w-8 h-8 text-text-tertiary mx-auto opacity-50" />
            <h3 className="text-base font-bold text-text-primary">No subjects found</h3>
            <p className="text-xs text-text-secondary">
              Try adjusting your year, category, or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedYear('All');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Curriculum Standards Notice */}
      <div className="p-6 rounded-3xl bg-bg-secondary border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <BookMarked className="w-4 h-4" />
          <span>Curiva Curriculum Alignment Standard</span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Every subject on Curiva is structured according to the latest Competency-Based Dynamic Curriculum (CBDC) framed by the National Commission for Homoeopathy (NCH). High-yield exam notes, 10-mark essay blueprints, spotter slides, and viva questions are continuously updated and verified against standard medical textbooks (Gray\'s, Guyton, Robbins, Parikh) and homoeopathic authorities (Hahnemann, Kent, Boericke, Allen, Boger).
        </p>
      </div>
    </div>
  );
}
