import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Heart,
  ChevronRight,
  ChevronDown,
  Clock,
  BookOpen,
  Cpu,
  GraduationCap,
  FileText,
  Search,
  BookMarked,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import SEO from '../components/SEO';
import StudyQuickReferenceModal, { StudyTopic } from '../components/StudyQuickReferenceModal';
import { conditionsData } from '../data/conditionsData';

const activeFAQ = [
  {
    q: "How does Curiva support Homeopathic Students & BHMS Learners?",
    a: "Curiva provides an integrated suite of study aids: a fully indexed classical Materia Medica (with Allen's Keynotes and Kent's lectures), an interactive Organon & Philosophy tool for learning Hahnemann's aphorisms, high-yield Student Reference Guides, and mock clinical MCQ practice boards tailored for AIAPGET exam preparations."
  },
  {
    q: "What clinical research & study tools are available for professionals and students?",
    a: "Curiva simplifies practitioner cases with smart clinical decision-support modules, an advanced symptomatic checker, a Kent repertory calculator to compute remedy weights, and a side-by-side comparative analyzer to differentiate sister remedies."
  },
  {
    q: "Can normal citizens or patients use Curiva?",
    a: "Yes! Curiva offers safe homeopathic self-assessment symptom checkers, myth-busting resources, and educational guides to understand classical homeopathy, without replacing professional medical advice."
  },
  {
    q: "Is Curiva's library authentic and verified?",
    a: "Absolutely. All reference materials, rubrics, and lectures are derived directly from centuries of peer-verified classical literature, including Organon of Medicine, Kent's lectures, Boericke's Materia Medica, and Allen's Keynotes."
  }
];

const studyPathTopics: StudyTopic[] = [
  {
    id: "foundations",
    category: "Academic Stage 1",
    title: "Foundations of Homeopathy",
    subtitle: "The Core Philosophical Principles of Healing",
    distilledSummary: "Homeopathy stimulates the body’s own healing system rather than suppressing individual symptoms. Treatment must always match the absolute totality of symptoms, delivering individualized care via simple, single, and minimum medicinal doses.",
    coreConcepts: [
      { name: "Law of Similars (Similia)", description: "Like cures like. A substance that causes symptoms in health can stimulate a cure for similar symptoms in illness." },
      { name: "Totality of Symptoms", description: "Evaluating complete physical, mental, and constitutional details of the person rather than isolated local pains." },
      { name: "Minimum Dose", description: "Using micro-diluted potentized remedies to spark positive healing reactions while fully ensuring safety." },
      { name: "The Vital Force", description: "The internal energetic engine governing physical health. Remedies aim to assist and clear vital blocks." }
    ],
    practicalTip: "Prioritize mental symptoms (fears, temperature responses, desires) over standard local pathology during evaluation.",
    quickFact: "Established in 1796, Hahnemann's laws remain verified guidelines for finding correct homeopathic matches.",
    targetLink: "/organon-philosophy",
    linkLabel: "Read Organon Philosophy"
  },
  {
    id: "materia-medica",
    category: "Academic Stage 2",
    title: "Materia Medica Studies",
    subtitle: "Remedy Symptom Archetypes & Drug Provings",
    distilledSummary: "Homeopathic Materia Medica compiles verified environmental, thermal, and emotional changes documented during pure healthy drug trials. It lists safe natural remedies and their comprehensive systemic symptoms.",
    coreConcepts: [
      { name: "Polychrest Remedies", description: "Broad-acting remedies (like Lachesis, Nux Vomica) with wide therapeutic effects across multiple organ networks." },
      { name: "Modalities (Better / Worse)", description: "Thermal, postural, or temporal settings that cause symptom levels to fluctuate (such as 'better in cool open air')." },
      { name: "Keynotes & Characteristics", description: "Rare, striking personal symptoms that point directly to specific remedy profiles with high accuracy." },
      { name: "Verified Drug Provings", description: "Comprehensive historic trials mapping biological and sensory changes produced by organic compounds in healthy human provers." }
    ],
    practicalTip: "Check for unique modifiers or thermal affinities. Differentiating remedy states is the key to constitutional matches.",
    quickFact: "A single classic polychrest remedy profile can contain over four thousand distinct physical and emotional symptom nodes.",
    targetLink: "/materia-medica",
    linkLabel: "Explore Materia Medica"
  },
  {
    id: "clinical-practice",
    category: "Academic Stage 3",
    title: "Clinical Repertorization",
    subtitle: "Symptom Logic, Kent Rubrics & Posology",
    distilledSummary: "Clinical practice relies on accurate symptom synthesis. We translate natural patient details into official repertory indexes (rubrics), perform logical symptom weight assessments, and select matching potencies and dosages safely.",
    coreConcepts: [
      { name: "Holistic Case Recording", description: "Documenting patient history, sleep indices, temperaments, and somatic patterns without preconceptions." },
      { name: "Rubric Translation", description: "Converting raw symptom expressions into formal repertory titles mapped in Kent's historical indexes." },
      { name: "Mathematical Synthesis", description: "Ranking candidates based on the scale of matched symptom categories, modal generalities, and clinical scores." },
      { name: "Syllabus Posology", description: "Gauging exact remedy strengths (e.g., 30C vs 200C vs LM) matching the defensive strength of the body." }
    ],
    practicalTip: "Be thorough with underlying chronic disease patterns (Miasmatic roots). Overcoming obstacles is key to lasting vitality.",
    quickFact: "Kent's classical repertorization system simplifies clinical lists from over 1,500 substances down to the target top matches.",
    targetLink: "/repertory",
    linkLabel: "Search Kent Repertory"
  }
];

export default function Home() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => prev === idx ? null : idx);
  };

  const openQuickStudy = (topic: StudyTopic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-primary/20 selection:text-primary pb-24">
      <SEO 
        title="Curiva Homoeopathy | Academic & Clinical Study Center"
        description="Learn classical homeopathy with our Materia Medica suite and prepare for exams. Practice with advanced AI symptom-checkers and repertory tools."
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 bg-white overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(194,24,122,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent rounded-full filter blur-[100px] opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center space-y-6 md:space-y-8 animate-fadeIn">
          {/* Logo badge */}
          <div className="mednix-section-subtitle mx-auto">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Curiva Clinical Homoeopathy
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-primary leading-tight max-w-4xl mx-auto">
            Classical Healing, <br />
            <span className="font-medium italic text-accent">Simplified for All</span>.
          </h1>

          <p className="text-text-secondary text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
            Welcome to a direct, simple learning space. Master classical homeopathic principles, search comprehensive remedies, and apply advanced AI clinical tools built for students and practitioners alike.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#learning-path"
              className="btn-premium btn-premium-primary"
            >
              Start Studying &amp; Learning <GraduationCap className="w-4 h-4 text-accent" />
            </a>
            <a
              href="#clinical-workspace"
              className="btn-premium btn-premium-secondary"
            >
              Clinical Study Tools <Cpu className="w-4 h-4 text-primary" />
            </a>
          </div>

          {/* Quick direct metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-border mt-12 max-w-3xl mx-auto">
            <div>
              <span className="text-2xl font-bold text-primary block">100+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-text-tertiary">Remedies Mapped</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-accent block">290+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-text-tertiary">Organon Aphorisms</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-primary block">10k+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-text-tertiary">Practice Questions</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-accent block">4+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-text-tertiary">Expert AI Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Progressive Student Learning Path (Displays stages for students, simplified without jargon) */}
      <section id="learning-path" className="py-20 bg-bg-primary/45 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mednix-section-subtitle mx-auto">Student Roadmap</span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary">
              Your Professional Learning Path
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              A progressive, simplified guide to mastering classical homeopathy step-by-step. Click on any stage to see a quick study reference summary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studyPathTopics.map((topic, index) => (
              <div 
                key={topic.id} 
                className={`mednix-card mednix-float float-delay-${(index % 3) + 1} mednix-card-hover-float flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-accent tracking-widest bg-accent-light px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                    <span className="text-xs font-black text-text-tertiary">Stage 0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary">{topic.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {topic.subtitle}. Explore primary concepts, tips, and guidelines directly.
                  </p>
                </div>
                <div className="pt-6 space-y-3">
                  <button 
                    onClick={() => openQuickStudy(topic)}
                    className="w-full text-center px-4 py-2 text-[10px] border border-border hover:border-primary text-text-secondary hover:text-primary rounded-xl font-bold uppercase tracking-wider bg-white shadow-sm transition-colors cursor-pointer"
                  >
                    Quick Study Reference
                  </button>
                  <Link 
                    to={topic.targetLink} 
                    className="text-[10px] font-black uppercase text-primary tracking-widest inline-flex items-center gap-1.5 hover:text-accent transition-colors pl-1"
                  >
                    Launch Full Study Suite <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Board and Study Guide quick links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Board Practice */}
            <div className="p-6 bg-white border border-border rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <h4 className="text-sm font-bold text-primary">MCQ Board Practice &amp; Exam Prep</h4>
                </div>
                <p className="text-xs text-text-secondary max-w-md">Practice over 10k BHMS &amp; AIAPGET syllabus questions with explanation logs.</p>
              </div>
              <Link 
                to="/mcq-practice" 
                className="btn-premium btn-premium-primary text-[9px] py-2 px-4 whitespace-nowrap"
              >
                Start Quiz Practice
              </Link>
            </div>

            {/* Student Guides */}
            <div className="p-6 bg-white border border-border rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-650" />
                  <h4 className="text-sm font-bold text-primary">Student Reference Guides &amp; Notes</h4>
                </div>
                <p className="text-xs text-text-secondary max-w-md">Download cheat sheets, study schedules, and student-curated summaries.</p>
              </div>
              <Link 
                to="/student-resources" 
                className="btn-premium btn-premium-secondary text-[9px] py-2 px-4 whitespace-nowrap"
              >
                Access Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Disease Hub (Grid layout using the new premium card design with consistent image-to-text ratios) */}
      <section id="disease-hub" className="py-20 bg-bg-secondary/35 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 space-y-12 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mednix-section-subtitle mx-auto">Therapeutics Explorer</span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary">
              The Interactive Disease Hub
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              Explore dynamic therapeutics and clinical patterns of major chronic and acute ailments mapped with proven homeopathic remedies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conditionsData.slice(0, 6).map((condition) => {
              const ConditionIcon = condition.icon || Activity;
              return (
                <div 
                  key={condition.id} 
                  className="mednix-card bg-white border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all flex flex-col h-full group"
                >
                  {/* Consistent image ratio container */}
                  <div className="h-48 w-full overflow-hidden relative shrink-0">
                    <img 
                      src={condition.imageUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000"} 
                      alt={condition.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
                    
                    {/* Category overlay */}
                    <span className="absolute top-4 left-4 bg-white/95 text-primary text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-primary/5">
                      {condition.category}
                    </span>
                  </div>

                  {/* Card Content portion */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary-light text-primary shrink-0">
                          <ConditionIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                          {condition.title}
                        </h3>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                        {condition.excerpt || condition.description}
                      </p>
                    </div>

                    {/* Footer list with remedies and link */}
                    <div className="pt-5 mt-5 border-t border-border/65 space-y-4">
                      {condition.relatedRemedies && condition.relatedRemedies.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary block">
                            Key Candidate Remedies
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {condition.relatedRemedies.slice(0, 3).map((rem) => (
                              <Link 
                                key={rem.id} 
                                to={`/remedy/${rem.id}`}
                                className="text-[10px] font-semibold bg-primary-light/60 text-primary hover:bg-primary hover:text-white transition-colors px-2.5 py-0.5 rounded-md"
                              >
                                {rem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link 
                        to={`/conditions/${condition.id}`}
                        className="w-full text-center py-2.5 border border-border hover:border-primary text-text-secondary hover:text-primary rounded-xl text-[10px] font-bold uppercase tracking-wider bg-bg-secondary hover:bg-white transition-all block cursor-pointer"
                      >
                        Explore Clinical Patterns
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link 
              to="/disease-hub"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-accent transition-colors group/all"
            >
              Browse All Therapeutics Areas <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: Clinical Tools (Easy clinical tool shortcuts for practitioners and advanced students) */}
      <section id="clinical-workspace" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mednix-section-subtitle mx-auto">Practitioner workspace</span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary">
              Advanced Clinical Study Tools
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              Apply scientific homeopathic repertorization. Translate case symptoms, compare complex remedies, and gain decision support in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. AI Homeopathic Assistant */}
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-md">Smart consultation</span>
                  <span className="px-2.5 py-1 bg-[#06B6D4]/10 text-[#06B6D4] text-[10px] font-black uppercase tracking-wider rounded-md">AI Guidance</span>
                </div>
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Interactive Ask AI Homeopathic Assistant</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Submit comprehensive health queries, physical patterns, and emotional modalities to receive customized educational analysis and remedy profiles instantly.
                </p>
              </div>
              <div>
                <Link 
                  to="/ask-homeopath"
                  className="w-full text-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xs font-bold uppercase tracking-wider block transition-all"
                >
                  Consult AI Assistant
                </Link>
              </div>
            </div>

            {/* 2. Interactive symptom checker */}
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider rounded-md">Safe assessment</span>
                  <span className="px-2.5 py-1 bg-[#0F3D75]/10 text-[#0F3D75] text-[10px] font-black uppercase tracking-wider rounded-md">Self check</span>
                </div>
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Symptom Checker &amp; Map</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Safely cross-check mental and physical symptoms against recorded natural modalities. Gain structured educational insights for case synthesis.
                </p>
              </div>
              <div>
                <Link 
                  to="/symptom-checker"
                  className="w-full text-center px-6 py-3 border border-primary text-primary hover:bg-primary/5 rounded-2xl text-xs font-bold uppercase tracking-wider block transition-all"
                >
                  Start Symptom Checker
                </Link>
              </div>
            </div>

            {/* 3. Repertory Search */}
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Rubric Synthesis</span>
                <h4 className="text-base font-bold text-primary">Kent's Repertory &amp; Rubric Finder</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Select and synthesize symptoms numerically. Search Kent's rubrics easily to build patient profiles with exact remedy rankings.
                </p>
              </div>
              <div className="pt-2">
                <Link 
                  to="/repertory"
                  className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  Search Kent Rubrics <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. Comparative Analyzer */}
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#06B6D4]">Remedy Differentiator</span>
                <h4 className="text-base font-bold text-primary">Comparative Remedy Matrix</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Differentiate sister remedies side by side. Highlight complementary interactions, food cravings, aggregate modalities, and lock-and-key points.
                </p>
              </div>
              <div className="pt-2">
                <Link  
                  to="/analysis"
                  className="text-xs font-bold text-accent hover:text-primary flex items-center gap-1.5 transition-colors"
                >
                  Compare Remedies Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="py-20 bg-bg-primary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="mednix-section-subtitle mx-auto">Philosophy Matrix</span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary">Classical vs. Conventional Pathways</h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              Compare conventional suppression-based drug interactions against the restorative, holistic focus of homeopathy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Conventional Medicine */}
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Conventional Medicine (Allopathy)</span>
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Temporary Symptom Relief (Suppression)</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Standard prescription medicines often focus on just one organ or symptom to quickly block discomfort or signs of illness. While this works fast, it can overlook the deeper constitutional cause.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-700" /> Focuses on isolated pathology rather than whole vitality
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-text-tertiary" /> Risk of recurring chronic conditions once doses stop
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-text-tertiary" /> Fixed formulas lacking personalized holistic mapping
                </li>
              </ul>
            </div>

            {/* Curiva Homoeopathy */}
            <div className="border border-primary/20 rounded-3xl p-8 bg-primary/5 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-display font-black text-[9px] tracking-widest text-primary bg-primary/10 rounded-bl-3xl">curiva holistic</div>
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Classical Homeopathy</span>
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Whole-Vitality Natural Recovery (Constitutional)</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Homeopathy treats the complete individual; evaluating mental states, metabolic preferences, and chronic patterns. By selecting a single matched remedy, we gently stimulate the body's native vital energy to heal itself.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-primary font-medium">
                <li className="flex items-center gap-2 text-green-850">
                  <CheckCircle2 className="w-4 h-4 text-green-700" /> 100% safe, non-toxic, organic individual preparations
                </li>
                <li className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-700" /> Root-cause focus addressing underlying chronic trends
                </li>
                <li className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-700" /> Wholly customized dosage strengths matched to patient vitality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-bg-secondary/40">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="mednix-section-subtitle mx-auto">SUPPORT RESOURCES</span>
            <h2 className="text-3xl font-display font-light text-primary">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {activeFAQ.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-border rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left font-bold text-xs md:text-sm text-text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-bg-primary/20"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform duration-305 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-border/40 animate-slideDown">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Study Quick-Reference Modal */}
      <StudyQuickReferenceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        topic={selectedTopic} 
      />
    </div>
  );
}

