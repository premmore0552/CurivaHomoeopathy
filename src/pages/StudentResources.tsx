import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  Stethoscope, 
  FileCheck2, 
  HelpCircle,
  Clock,
  BookMarked,
  Library,
  Zap,
  Search,
  X
} from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/curiva-design-system.css';

const resourceCenters = [
  {
    title: "Subject-Wise Study Center",
    description: "Access complete syllabus, chapters, clinical competencies, high-yield notes, and viva questions for all 11 BHMS subjects (1st to 4th Year).",
    icon: Library,
    link: "/subjects",
    badge: "1st - 4th Year",
    color: "from-blue-600 to-indigo-700",
    features: [
      "All 11 NCH Subjects Organized by Year",
      "Chapter Lists & Core Competencies",
      "High-Yield University Notes & Rubrics",
      "Direct Links to Specialized Tools"
    ]
  },
  {
    title: "University Blueprints & Model Answers",
    description: "Official NCH exam paper patterns, mark weightage distributions, 10-mark LAQs, 5-mark SAQs, and verified step-by-step model answer keys.",
    icon: FileCheck2,
    link: "/university-blueprints",
    badge: "NCH Blueprints",
    color: "from-emerald-600 to-teal-700",
    features: [
      "Official 100M & 200M Paper Distribution",
      "Solved University PYQs with 100% Mark Rubric",
      "MUHS, WBUHS, RGUHS & Central Pattern Papers",
      "High-Yield Topic Priority Checklists"
    ]
  },
  {
    title: "100+ Active Recall Flashcards",
    description: "Interactive 3D flip cards with auto-play and shuffle for rapid spaced repetition of Materia Medica keynotes, Organon aphorisms, and Pharmacy rules.",
    icon: Layers,
    link: "/flashcards",
    badge: "100+ Cards",
    color: "from-amber-600 to-orange-700",
    features: [
      "Interactive 3D Flip Flashcards",
      "Autoplay & Spaced Repetition Timer",
      "Category Filters & Term Search",
      "Clinical Application Callout Pearls"
    ]
  },
  {
    title: "5,000+ AIAPGET MCQ Simulator",
    description: "Practice topic-wise MCQs in the interactive sandbox pool or test yourself under real exam pressure with timed 10-Q drills and 50-Q mock exams.",
    icon: BrainCircuit,
    link: "/mcq-simulator",
    badge: "5,000+ Questions",
    color: "from-purple-600 to-pink-700",
    features: [
      "5,000+ Verified AIAPGET & State PSC MCQs",
      "Interactive Sandbox Pool with Instant Feedback",
      "Timed 10-Q Drill & 50-Q Full Mock Exam",
      "Detailed High-Yield Clinical Explanations"
    ]
  },
  {
    title: "Clinical Therapeutics Center",
    description: "Evidence-informed bedside prescribing protocols mapping acute & chronic conditions to precise remedy differentials, modalities, dosages, and emergency red flags.",
    icon: Stethoscope,
    link: "/clinical-therapeutics",
    badge: "Bedside Guide",
    color: "from-rose-600 to-red-700",
    features: [
      "Organized by Organ System (Resp, GIT, CVS, etc.)",
      "Keynote Differential Remedy Comparisons",
      "Dosages, Potency & Repetition Schedules",
      "Critical Red Flags & Emergency Referrals"
    ]
  },
  {
    title: "Previous Year Question Papers (PYQs)",
    description: "Comprehensive repository of past university examination questions and verified solved papers arranged subject-wise and topic-wise.",
    icon: FileText,
    link: "/pyqs",
    badge: "University Archive",
    color: "from-cyan-600 to-blue-700",
    features: [
      "Past 10 Years University Papers",
      "Arranged by Subject and Year",
      "Verified Faculty Model Answers",
      "Downloadable Practice Sets"
    ]
  }
];

export default function StudentResources() {
  const [resourceQuery, setResourceQuery] = useState('');
  const filteredCenters = useMemo(() => {
    const query = resourceQuery.trim().toLocaleLowerCase();
    if (!query) return resourceCenters;
    return resourceCenters.filter((center) =>
      [center.title, center.description, center.badge, ...center.features].some((value) => value.toLocaleLowerCase().includes(query))
    );
  }, [resourceQuery]);

  return (
    <div className="curiva-page curiva-resource-hub min-h-screen bg-bg-primary text-text-primary py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10 pb-28 lg:pb-10">
      <SEO 
        title="Student Resources & Academic Study Suite | Curiva Homoeopathy"
        description="Central academic study suite for BHMS & AIAPGET students. Access subject study centers, university exam blueprints, active recall flashcards, MCQ simulator, and clinical therapeutics."
      />

      {/* Breadcrumb & Hero */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Academic Resources Suite</span>
        </div>

        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              BHMS &amp; AIAPGET Academic Suite
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              Academic Resources &amp; Study Centers
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Explore dedicated learning hubs built specifically for BHMS undergraduate students and AIAPGET postgraduate aspirants. Select a learning tool below to begin.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid of Dedicated Resource Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceCenters.map((center, idx) => {
          const Icon = center.icon;

          return (
            <div
              key={idx}
              className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${center.color} text-white shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {center.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-serif font-bold text-text-primary group-hover:text-primary transition-colors">
                    {center.title}
                  </h2>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {center.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">
                    Key Features:
                  </span>
                  <ul className="space-y-1 text-xs text-text-secondary">
                    {center.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={center.link}
                  className="w-full py-3 px-4 bg-bg-primary hover:bg-primary text-text-primary hover:text-white border border-border hover:border-primary rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-sm"
                >
                  <span>Open {center.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Year-by-Year Fast Jump Section */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              Quick Jump: Subjects by Professional Year
            </h2>
            <p className="text-xs text-text-tertiary">
              Jump straight to your syllabus and high-yield notes in the Subject-Wise Study Center
            </p>
          </div>
          <Link
            to="/subjects"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View all 11 subjects</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/subjects?year=1st%20BHMS"
            className="p-5 rounded-2xl bg-bg-primary border border-border hover:border-primary/40 transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Pre-Clinical</span>
            <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-primary transition-colors">
              1st BHMS
            </h3>
            <p className="text-xs text-text-secondary">Anatomy, Physiology &amp; Biochemistry, Homoeopathic Pharmacy</p>
          </Link>

          <Link
            to="/subjects?year=2nd%20BHMS"
            className="p-5 rounded-2xl bg-bg-primary border border-border hover:border-primary/40 transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Para-Clinical</span>
            <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-primary transition-colors">
              2nd BHMS
            </h3>
            <p className="text-xs text-text-secondary">Pathology &amp; Microbiology, FMT, Materia Medica, Organon of Medicine</p>
          </Link>

          <Link
            to="/subjects?year=3rd%20BHMS"
            className="p-5 rounded-2xl bg-bg-primary border border-border hover:border-primary/40 transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Clinical &amp; Surgical</span>
            <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-primary transition-colors">
              3rd BHMS
            </h3>
            <p className="text-xs text-text-secondary">Surgery &amp; Therapeutics, Obstetrics &amp; Gynecology (OBG), Materia Medica, Organon</p>
          </Link>

          <Link
            to="/subjects?year=4th%20BHMS"
            className="p-5 rounded-2xl bg-bg-primary border border-border hover:border-primary/40 transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Final Professional</span>
            <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-primary transition-colors">
              4th BHMS
            </h3>
            <p className="text-xs text-text-secondary">Practice of Medicine, Repertory, Community Medicine, Materia Medica, Organon</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
