import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useRole } from '../context/RoleContext';
import * as Icons from 'lucide-react';
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
  Info,
  Users,
  Globe,
  Scale
} from 'lucide-react';
import SEO from '../components/SEO';
import StudyQuickReferenceModal, { StudyTopic } from '../components/StudyQuickReferenceModal';
import ProfileDashboard from '../components/ProfileDashboard';
import { conditionsData } from '../data/conditionsData';

const activeFAQ = [
  {
    q: "How does Curiva support Homoeopathic Students & BHMS Learners?",
    a: "Curiva provides an integrated suite of study aids: a fully indexed classical Materia Medica (with Allen's Keynotes and Kent's lectures), an interactive Organon & Philosophy tool for learning Hahnemann's aphorisms, high-yield Student Reference Guides, and mock clinical MCQ practice boards tailored for AIAPGET exam preparations."
  },
  {
    q: "What clinical research & study tools are available for professionals and students?",
    a: "Curiva simplifies practitioner cases with smart clinical decision-support modules, an advanced symptomatic checker, a Kent repertory calculator to compute remedy weights, and a side-by-side comparative analyzer to differentiate sister remedies."
  },
  {
    q: "Can normal citizens or patients use Curiva?",
    a: "Yes! Curiva offers safe Homoeopathic self-assessment symptom checkers, myth-busting resources, and educational guides to understand classical Homoeopathy, without replacing professional medical advice."
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
    title: "Foundations of Homoeopathy",
    subtitle: "The Core Philosophical Principles of Healing",
    distilledSummary: "Homoeopathy stimulates the body’s own healing system rather than suppressing individual symptoms. Treatment must always match the absolute totality of symptoms, delivering individualized care via simple, single, and minimum medicinal doses.",
    coreConcepts: [
      { name: "Law of Similars (Similia)", description: "Like cures like. A substance that causes symptoms in health can stimulate a cure for similar symptoms in illness." },
      { name: "Totality of Symptoms", description: "Evaluating complete physical, mental, and constitutional details of the person rather than isolated local pains." },
      { name: "Minimum Dose", description: "Using micro-diluted potentized remedies to spark positive healing reactions while fully ensuring safety." },
      { name: "The Vital Force", description: "The internal energetic engine governing physical health. Remedies aim to assist and clear vital blocks." }
    ],
    practicalTip: "Prioritize mental symptoms (fears, temperature responses, desires) over standard local pathology during evaluation.",
    quickFact: "Established in 1796, Hahnemann's laws remain verified guidelines for finding correct Homoeopathic matches.",
    targetLink: "/organon-philosophy",
    linkLabel: "Read Organon Philosophy"
  },
  {
    id: "materia-medica",
    category: "Academic Stage 2",
    title: "Materia Medica Studies",
    subtitle: "Remedy Symptom Archetypes & Drug Provings",
    distilledSummary: "Homoeopathic Materia Medica compiles verified environmental, thermal, and emotional changes documented during pure healthy drug trials. It lists safe natural remedies and their comprehensive systemic symptoms.",
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
  const { currentRole, getQuickActions, getRecommendations, getNotifications } = useRole();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIntentTab, setActiveIntentTab] = useState<'curriculum' | 'remedy' | 'practice' | 'allied' | 'clinical' | 'heritage'>('curriculum');

  const isStudentGroup = ['BHMS Student', 'Intern', 'Faculty'].includes(currentRole);
  const isPractitionerGroup = ['Practitioner', 'Researcher', 'Administrator'].includes(currentRole);

  // Customize Hero parameters based on role
  let heroSubtitle = "Curiva Clinical Homoeopathy";
  let heroTitleFirst = "Tiny Doses.";
  let heroTitleItalic = "True Shifts";
  let heroDescription = "Welcome to a direct, simple learning space. Master classical Homoeopathic principles, search comprehensive remedies, and apply advanced AI clinical tools built for students and practitioners alike.";
  let heroPrimaryCTA = "Start Studying";
  let heroPrimaryLink = "#learning-path";
  let heroSecondaryCTA = "Clinical Study Tools";
  let heroSecondaryLink = "#clinical-workspace";
  let HeroLogoIconClass = GraduationCap;

  if (isStudentGroup) {
    heroSubtitle = "BHMS Academic Success Suite";
    heroTitleFirst = "Tiny Doses.";
    heroTitleItalic = "True Shifts";
    heroDescription = "Ace your BHMS curriculum with NCH CBDC syllabus-aligned revision guides, flippable flashcards, high-yield organon lectures, and interactive exam practice boards.";
    heroPrimaryCTA = "Study Curriculum";
    heroPrimaryLink = "#study-desk";
    heroSecondaryCTA = "Revision Guides";
    heroSecondaryLink = "/student-resources";
    HeroLogoIconClass = GraduationCap;
  } else if (isPractitionerGroup) {
    heroSubtitle = "Clinical Decision Support Desk";
    heroTitleFirst = "Tiny Doses.";
    heroTitleItalic = "True Shifts";
    heroDescription = "Streamline your Homoeopathic practice. Repertorize case totalities, run complex comparative remedy evaluations, check active miasms, and audit classic stalwart cure logs.";
    heroPrimaryCTA = "Symptom Repertoriser";
    heroPrimaryLink = "/symptom-checker";
    heroSecondaryCTA = "Comparative Matrix";
    heroSecondaryLink = "/analysis";
    HeroLogoIconClass = Cpu;
  } else {
    // Public/Guest
    heroSubtitle = "Empowering Public Health Education";
    heroTitleFirst = "Tiny Doses.";
    heroTitleItalic = "True Shifts";
    heroDescription = "Discover classical Homoeopathic principles. Learn how natural remedies stimulate your body's vital healing defenses, bust common myths, and access patient wellness handbooks safely.";
    heroPrimaryCTA = "Explore Public Library";
    heroPrimaryLink = "/public-education";
    heroSecondaryCTA = "Read Health eBooks";
    heroSecondaryLink = "/ebooks";
    HeroLogoIconClass = Globe;
  }

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => prev === idx ? null : idx);
  };

  const openQuickStudy = (topic: StudyTopic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  // Intent-based tabs data
  const intentTabs = [
    { id: 'curriculum', label: "🎓 Study BHMS Curriculum", subtitle: "I need to prepare for my university courses or check the official syllabus." },
    { id: 'remedy', label: "🌿 Research Remedies", subtitle: "I want to read the Materia Medica, evaluate relationships, or compare remedies." },
    { id: 'practice', label: "📚 Practice & Review", subtitle: "I want to challenge myself with MCQs, study maps, flashcards, or viva preparation." },
    { id: 'allied', label: "🩺 Allied Medical Sciences", subtitle: "I need to review Anatomy, Physiology, CBC diagnostics, or clinical handbooks." },
    { id: 'clinical', label: "💻 Clinical Decision Tools", subtitle: "I want to repertorize a case or map specific symptom modalities to candidate remedies." },
    { id: 'heritage', label: "🏛️ Heritage & History", subtitle: "I want to explore pioneering doctors, stalwarts, and the timeline of Homoeopathy." }
  ] as const;

  const intentCards = {
    curriculum: [
      {
        title: "NCH CBDC Syllabus",
        description: "Official year-wise competency syllabus, hours allocation, and curriculum mappings.",
        icon: FileText,
        link: "/cbdc-syllabus",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50",
        badge: "NCH Official"
      },
      {
        title: "Anatomy Core Studies",
        description: "High-yield anatomy notes, structural diagrams, and regional dissection references.",
        icon: Activity,
        link: "/anatomy",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50",
        badge: "1st BHMS"
      },
      {
        title: "Physiology Core Studies",
        description: "Systemic physiology vital mechanisms, Homoeostatic controls, and biochemistry portals.",
        icon: Layers,
        link: "/physiology",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "1st BHMS"
      },
      {
        title: "Materia Medica Core",
        description: "Classic drug proving records, keynotes, characteristics, and basic polychrests.",
        icon: BookOpen,
        link: "/materia-medica",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Core"
      },
      {
        title: "Organon & Philosophy",
        description: "Samuel Hahnemann's classical laws and active aphorisms annotated for modern students.",
        icon: GraduationCap,
        link: "/organon-philosophy",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50",
        badge: "Philosophy"
      },
      {
        title: "Academic Revisions Hub",
        description: "Browse university solved previous year papers, university plans, and guides.",
        icon: CheckCircle2,
        link: "/student-resources",
        color: "text-teal-600 bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/50",
        badge: "Exam Board"
      }
    ],
    remedy: [
      {
        title: "Materia Medica Index",
        description: "Comprehensive browser covering 150+ classical remedies with Boericke, Kent and Allen notes.",
        icon: BookOpen,
        link: "/materia-medica",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50",
        badge: "Materia Medica"
      },
      {
        title: "Relationship Nexus",
        description: "Explore remedy concordances, drug complementaries, inimicals, and detailed antidotes.",
        icon: Zap,
        link: "/nexus",
        color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-900/50",
        badge: "Nexus"
      },
      {
        title: "Comparative Analyzer",
        description: "Interactive clinical comparison matrix to differentiate overlapping remedy parameters.",
        icon: Cpu,
        link: "/analysis",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "Analyzer"
      },
      {
        title: "Miasms Encyclopedia",
        description: "Deep study portal mapping chronic disease roots: Psora, Sycosis, and Syphilis.",
        icon: Layers,
        link: "/miasms",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Miasms"
      }
    ],
    practice: [
      {
        title: "MCQ Practice Arena",
        description: "Challenge your concepts with over 5,000 university and AIAPGET exam board preps.",
        icon: Zap,
        link: "/mcq-practice",
        color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-900/50",
        badge: "Self-Test"
      },
      {
        title: "Interactive Study Maps",
        description: "Dynamic layout mapping networks of remedy properties and conceptual connections.",
        icon: Layers,
        link: "/visualization",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50",
        badge: "Study Tool"
      },
      {
        title: "Remedy Flashcards",
        description: "Active recall study cards matching polychrest keynotes, modals, and modulations.",
        icon: Sparkles,
        link: "/student-resources",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50",
        badge: "Active Recall"
      },
      {
        title: "Viva Oral Booster",
        description: "Quick-response oral definitions, standard clinical values, and examiner lists.",
        icon: HelpCircle,
        link: "/student-resources",
        color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50",
        badge: "Viva Voce"
      }
    ],
    allied: [
      {
        title: "Anatomy Library",
        description: "Detailed systems covering osteology, muscles, neurovascular pathways & regional organs.",
        icon: Activity,
        link: "/anatomy",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50",
        badge: "Anatomy"
      },
      {
        title: "Physiology Library",
        description: "Learn vital renal, respiratory, cardiac, and endocrine pathways with high-yield notes.",
        icon: Layers,
        link: "/physiology",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "Physiology"
      },
      {
        title: "CBC Diagnostic Handbook",
        description: "Interactive blood report analyzer mapping hemogram values to classical chronic miasms.",
        icon: Cpu,
        link: "/cbc-handbook",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Interactive Lab"
      },
      {
        title: "Clinical Condition Handbook",
        description: "Comprehensive diagnostics, signs, symptoms, and simulator for 15 major pathologies.",
        icon: FileText,
        link: "/clinical-handbook",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50",
        badge: "Clinical Cases"
      }
    ],
    clinical: [
      {
        title: "Symptom Repertoriser",
        description: "Input multiple symptoms, select thermal modalities, and compute mathematical remedy matches.",
        icon: Cpu,
        link: "/symptom-checker",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "Decision Engine"
      },
      {
        title: "Clinical Therapeutics",
        description: "Direct organ-wise pathology index matching clinical symptoms to high-yield remedies.",
        icon: Activity,
        link: "/disease-hub",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Therapeutics"
      }
    ],
    heritage: [
      {
        title: "Historic Pioneer Timelines",
        description: "Explore standard milestones, chronicles, and historical development of Hahnemann's system.",
        icon: Clock,
        link: "/lexicon/historical",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50",
        badge: "History"
      },
      {
        title: "Stalwarts Biography Gallery",
        description: "Read biographies, historical essays, and classic cases from historical clinical masters.",
        icon: Users,
        link: "/stalwarts",
        color: "text-teal-600 bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/50",
        badge: "Stalwarts"
      },
      {
        title: "Public Education Center",
        description: "Beginner-friendly introductory guides, safe health rules, and standard patient FAQs.",
        icon: Globe,
        link: "/public-education",
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50",
        badge: "Public Hub"
      },
      {
        title: "Myth vs Fact Busters",
        description: "Clear evidence-informed explanations addressing standard misconceptions about Homoeopathy.",
        icon: ShieldCheck,
        link: "/public-education",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50",
        badge: "Myths"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-primary/20 selection:text-primary pb-24">
      <SEO 
        title="Curiva Homoeopathy | Academic & Clinical Study Center"
        description="Learn classical Homoeopathy with our Materia Medica suite and prepare for exams. Practice with advanced AI symptom-checkers and repertory tools."
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-bg-primary overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(19,70,52,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center space-y-6 animate-fadeIn">
          {/* Meta label */}
          <span className="font-mono text-[0.75rem] tracking-[0.2em] uppercase text-[#BF8F02] dark:text-amber-400 font-bold block">
            ELEVATE YOUR PRACTICE
          </span>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-normal text-text-primary">
            {heroTitleFirst} <br />
            <em className="italic text-[#134634] dark:text-emerald-400 font-serif font-normal">{heroTitleItalic}</em>.
          </h1>

          <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {heroPrimaryLink.startsWith('#') ? (
              <a
                href={heroPrimaryLink}
                className="px-8 py-4 bg-[#134634] hover:bg-[#BF8F02] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                {heroPrimaryCTA} <GraduationCap className="w-4 h-4 text-amber-300" />
              </a>
            ) : (
              <Link
                to={heroPrimaryLink}
                className="px-8 py-4 bg-[#134634] hover:bg-[#BF8F02] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                {heroPrimaryCTA} <GraduationCap className="w-4 h-4 text-amber-300" />
              </Link>
            )}

            {heroSecondaryLink.startsWith('#') ? (
              <a
                href={heroSecondaryLink}
                className="px-8 py-4 border border-border bg-white dark:bg-zinc-900 text-text-primary hover:border-[#134634] hover:text-[#134634] rounded-full font-bold text-sm tracking-wide transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                {heroSecondaryCTA} <Cpu className="w-4 h-4 text-[#134634]" />
              </a>
            ) : (
              <Link
                to={heroSecondaryLink}
                className="px-8 py-4 border border-border bg-white dark:bg-zinc-900 text-text-primary hover:border-[#134634] hover:text-[#134634] rounded-full font-bold text-sm tracking-wide transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                {heroSecondaryCTA} <Cpu className="w-4 h-4 text-[#134634]" />
              </Link>
            )}
          </div>

          {/* Hero Circle Stats */}
          <div className="pt-10 flex flex-wrap justify-center gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="w-28 h-28 sm:w-36 sm:h-36 border border-border/80 rounded-full bg-white/80 dark:bg-zinc-900/80 shadow-soft flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-transform">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#134634] dark:text-emerald-400">100+</span>
              <label className="text-[0.6rem] font-mono uppercase tracking-widest text-text-tertiary mt-0.5">Remedies</label>
            </div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 border border-border/80 rounded-full bg-white/80 dark:bg-zinc-900/80 shadow-soft flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-transform">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#BF8F02] dark:text-amber-400">290+</span>
              <label className="text-[0.6rem] font-mono uppercase tracking-widest text-text-tertiary mt-0.5">Aphorisms</label>
            </div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 border border-border/80 rounded-full bg-white/80 dark:bg-zinc-900/80 shadow-soft flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-transform">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#134634] dark:text-emerald-400">10k+</span>
              <label className="text-[0.6rem] font-mono uppercase tracking-widest text-text-tertiary mt-0.5">MCQs</label>
            </div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 border border-border/80 rounded-full bg-white/80 dark:bg-zinc-900/80 shadow-soft flex flex-col items-center justify-center text-center p-2 hover:scale-105 transition-transform">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#BF8F02] dark:text-amber-400">4+</span>
              <label className="text-[0.6rem] font-mono uppercase tracking-widest text-text-tertiary mt-0.5">AI Systems</label>
            </div>
          </div>
        </div>
      </section>

      {/* Board Grid Cards */}
      <section className="py-12 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/cbdc-syllabus"
            className="group bg-white dark:bg-zinc-900 border border-border/80 hover:border-[#134634]/40 rounded-[32px] p-8 sm:p-10 shadow-soft hover:shadow-hover-card transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#BF8F02] font-bold block mb-2">Academic Hub</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-text-primary group-hover:text-[#134634] transition-colors">
                NCH CBDC <br />Syllabus Mapping
              </h3>
            </div>
            <div className="space-y-4 pt-6">
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Official year-wise competency syllabus, allocation hours, and curriculum mapping.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134634] dark:text-emerald-400">
                View Syllabus <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link 
            to="/anatomy"
            className="group bg-white dark:bg-zinc-900 border border-border/80 hover:border-[#134634]/40 rounded-[32px] p-8 sm:p-10 shadow-soft hover:shadow-hover-card transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#BF8F02] font-bold block mb-2">Anatomy Lab</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-text-primary group-hover:text-[#134634] transition-colors">
                Anatomy Core <br />Studies
              </h3>
            </div>
            <div className="space-y-4 pt-6">
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Regional dissection references and structural diagrams for the first year BHMS student.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134634] dark:text-emerald-400">
                Explore Dissections <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link 
            to="/student-resources"
            className="group bg-white dark:bg-zinc-900 border border-border/80 hover:border-[#134634]/40 rounded-[32px] p-8 sm:p-10 shadow-soft hover:shadow-hover-card transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-[#BF8F02] font-bold block mb-2">Clinical Intelligence</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-text-primary group-hover:text-[#134634] transition-colors">
                Revisions <br />Exam Board
              </h3>
            </div>
            <div className="space-y-4 pt-6">
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Solved previous year papers, university plans, and targeted clinical revision guides.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#134634] dark:text-emerald-400">
                Access Exam Board <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION: Quick-Access Study Desk / Main Navigation Terminal */}
      <section id="study-desk" className="py-12 bg-gradient-to-b from-bg-secondary/20 to-bg-primary border-y border-border/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mednix-section-subtitle mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" /> Student &amp; Practitioner Dashboard
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              What do you need to accomplish?
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              Instead of navigating separate features, select your direct educational goal or intent below:
            </p>
          </div>

          {/* Interactive Intent-Based Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {intentTabs.map((tab) => {
              const isActive = activeIntentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveIntentTab(tab.id)}
                  className={`px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-[1.03]'
                      : 'bg-white dark:bg-gray-900 text-text-secondary border-border hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tab.label.split(" ")[0]} {tab.label.split(" ").slice(1).join(" ")}
                </button>
              );
            })}
          </div>

          {/* Active Tab Subtitle Indicator */}
          <div className="text-center max-w-xl mx-auto mt-2 animate-fadeIn">
            <p className="text-xs font-serif italic text-text-tertiary">
              &ldquo;{intentTabs.find((t) => t.id === activeIntentTab)?.subtitle}&rdquo;
            </p>
          </div>

          {/* Dynamic Grid of Cards matching user intent */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-4">
            {intentCards[activeIntentTab].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <Link
                  key={idx}
                  to={card.link}
                  className="group relative p-6 bg-white dark:bg-gray-900 border border-border/40 dark:border-border/10 rounded-[2rem] shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl border ${card.color}`}>
                        <CardIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary px-3 py-1 rounded-full bg-bg-secondary dark:bg-gray-800">
                        {card.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-display font-bold text-text-primary group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {card.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </h3>
                      <p className="text-[11px] text-text-secondary leading-relaxed font-sans">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: Featured Interactive eBook Publication */}
      <section className="py-12 bg-bg-secondary/40 border-b border-border relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12 animate-fadeIn">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mednix-section-subtitle mx-auto">
              <BookOpen className="w-3.5 h-3.5" /> Featured Publication
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary">
              The Interactive eBook Series
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              Read our complete, professionally curated publications directly in your browser. Fully integrated with comfort controls, progress tracking, and supportive AI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 3D-styled physical Book Cover Mockup built purely with Tailwind CSS */}
            <div className="lg:col-span-5 flex justify-center">
              <Link 
                to="/read/hair-loss-Homoeopathy" 
                className="group relative block w-72 sm:w-80 h-[400px] sm:h-[450px] rounded-r-3xl rounded-l-md shadow-2xl transition-transform duration-500 ease-out hover:-rotate-1 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1b3028 0%, #325b4b 50%, #1b3028 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), -6px 0 0px #0c1814'
                }}
              >
                {/* Book spine lighting overlay */}
                <div className="absolute top-0 left-0 w-3.5 h-full bg-gradient-to-r from-black/40 via-white/10 to-transparent rounded-l-md" />
                <div className="absolute top-0 left-3.5 w-1 h-full bg-black/25" />

                {/* Cover Frame Border */}
                <div className="absolute inset-4 sm:inset-5 border border-white/10 rounded-r-2xl pointer-events-none" />

                {/* Cover Content */}
                <div className="h-full p-8 sm:p-10 flex flex-col justify-between items-center text-center text-white select-none">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-emerald-350 block">CURIVA ACADEMIC PRESS</span>
                    <div className="h-0.5 w-10 bg-emerald-400 mx-auto opacity-60" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-black leading-tight tracking-tight text-white/95">
                      HAIR FALL<br />
                      <span className="text-emerald-450 font-normal italic font-serif">RECOVERY GUIDE</span>
                    </h3>
                    <p className="text-[10px] sm:text-xs text-emerald-100/70 font-serif italic max-w-[200px] mx-auto leading-relaxed">
                      Understanding Hair Loss, Building Better Habits &amp; Supporting Healthier Hair Naturally
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/15">
                      <Sparkles className="w-3 h-3 text-emerald-300 animate-pulse" /> Interactive Edition
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-emerald-250 block">By Curiva Homoeopathy</span>
                  </div>
                </div>

                {/* Animated hover highlight layer */}
                <div className="absolute inset-0 rounded-r-3xl rounded-l-md bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
            </div>

            {/* Right: eBook Highlights, Quick links, & Direct button */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Best-selling Guide &bull; Complete Reference
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary">
                  Hair Fall Recovery Guide
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                  A high-yield, step-by-step practical publication written in an approachable, warm, and professional tone. Get past commercial miracle oil myths and understand the exact biological triggers of hair thinning, nutrition guidelines, and authentic Homoeopathic constitutional analysis.
                </p>
              </div>

              {/* Grid of highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-primary block">25 Structured Chapters</span>
                    <span className="text-[11px] text-text-secondary block">Full comfort controls (Light, Cream, and Dark eye-safe reading themes).</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-primary block">Built-in AI Scalp Coach</span>
                    <span className="text-[11px] text-text-secondary block">Ask custom questions about stress, sleep, or individualization side-by-side.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-primary block">Risk Quiz &amp; Habit Trackers</span>
                    <span className="text-[11px] text-text-secondary block">Interactive scorecard tools to calculate risks and build weekly check-off schedules.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-primary block">Copy Protection Enabled</span>
                    <span className="text-[11px] text-text-secondary block">Secure DRM platform ensures copyright safety and clean academic standards.</span>
                  </div>
                </div>
              </div>

              {/* Jump Straight to Chapters section */}
              <div className="p-5 bg-white border border-border rounded-2xl space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-text-tertiary block">
                  Jump Straight to High-Yield Chapters:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <Link 
                    to="/read/hair-loss-Homoeopathy?chapter=0"
                    className="flex items-center justify-between p-2 rounded-lg bg-bg-primary/55 border border-border hover:border-primary text-text-primary hover:text-primary transition"
                  >
                    <span>📖 Cover &amp; Core Overview</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                  <Link 
                    to="/read/hair-loss-Homoeopathy?chapter=4"
                    className="flex items-center justify-between p-2 rounded-lg bg-bg-primary/55 border border-border hover:border-primary text-text-primary hover:text-primary transition"
                  >
                    <span>🔬 Ch 5: The Hair Growth Cycle</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                  <Link 
                    to="/read/hair-loss-Homoeopathy?chapter=19"
                    className="flex items-center justify-between p-2 rounded-lg bg-bg-primary/55 border border-border hover:border-primary text-text-primary hover:text-primary transition"
                  >
                    <span>📅 Ch 20: 90-Day Blueprint Plan</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                  <Link 
                    to="/read/hair-loss-Homoeopathy?chapter=20"
                    className="flex items-center justify-between p-2 rounded-lg bg-bg-primary/55 border border-border hover:border-primary text-text-primary hover:text-primary transition"
                  >
                    <span>🌿 Ch 21: Homoeopathy Expectations</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  to="/read/hair-loss-Homoeopathy" 
                  className="btn-premium btn-premium-primary text-xs font-bold uppercase tracking-wider px-6 py-3 w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  Launch Interactive eBook Reader <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
                <Link 
                  to="/read/hair-loss-Homoeopathy?chapter=23"
                  className="w-full sm:w-auto text-center px-5 py-3 border border-border hover:border-primary text-text-secondary hover:text-primary rounded-2xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-bg-primary/10 transition cursor-pointer"
                >
                  Take Interactive Hair Quiz
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION: Interactive Therapeutics Hub */}
      <section id="disease-hub" className="py-12 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#134634] text-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-lg">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BF8F02] font-bold block mb-2">
                  The Therapeutics Hub
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
                  Interactive Disease Hub
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                  Explore dynamic therapeutics and clinical patterns of major chronic and acute ailments mapped with proven Homoeopathic remedies.
                </p>
              </div>
              <Link 
                to="/disease-hub" 
                className="px-6 py-3 bg-[#BF8F02] hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all inline-flex items-center gap-2 self-start md:self-auto cursor-pointer"
              >
                Explore All Patterns <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/conditions/migraine-headaches" className="bg-white/5 hover:bg-[#BF8F02] border border-white/10 hover:border-[#BF8F02] p-6 rounded-2xl transition-all group block">
                <h4 className="font-serif text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">Migraine</h4>
                <p className="font-mono text-[0.7rem] text-white/50 group-hover:text-white/80 mt-2 uppercase tracking-wider">Nervous System</p>
              </Link>
              <Link to="/conditions/acidity-gerd" className="bg-white/5 hover:bg-[#BF8F02] border border-white/10 hover:border-[#BF8F02] p-6 rounded-2xl transition-all group block">
                <h4 className="font-serif text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">GERD</h4>
                <p className="font-mono text-[0.7rem] text-white/50 group-hover:text-white/80 mt-2 uppercase tracking-wider">Digestive Hub</p>
              </Link>
              <Link to="/conditions/stress-anxiety" className="bg-white/5 hover:bg-[#BF8F02] border border-white/10 hover:border-[#BF8F02] p-6 rounded-2xl transition-all group block">
                <h4 className="font-serif text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">Anxiety</h4>
                <p className="font-mono text-[0.7rem] text-white/50 group-hover:text-white/80 mt-2 uppercase tracking-wider">Mental Health</p>
              </Link>
              <Link to="/conditions/respiratory-asthma-allergies" className="bg-white/5 hover:bg-[#BF8F02] border border-white/10 hover:border-[#BF8F02] p-6 rounded-2xl transition-all group block">
                <h4 className="font-serif text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">Asthma</h4>
                <p className="font-mono text-[0.7rem] text-white/50 group-hover:text-white/80 mt-2 uppercase tracking-wider">Respiratory Lab</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Clinical Tools (Easy clinical tool shortcuts for practitioners and advanced students) */}
      <section id="clinical-workspace" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mednix-section-subtitle mx-auto">Practitioner workspace</span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-primary">
              Advanced Clinical Study Tools
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-normal">
              Apply scientific Homoeopathic repertorization. Translate case symptoms, compare complex remedies, and gain decision support in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Public Education Center */}
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-md">Public Resource</span>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-md">General Wellness</span>
                </div>
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Public Education Hub &amp; FAQ</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Explore how classical homoeopathy works, read comprehensive disease education guides, and find authoritative answers to common questions about holistic natural health.
                </p>
              </div>
              <div>
                <Link 
                  to="/public-education"
                  className="w-full text-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xs font-bold uppercase tracking-wider block transition-all"
                >
                  Explore Education Hub
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

      {/* Comparisons Matrix Table */}
      <section className="py-12 bg-bg-primary">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BF8F02] font-bold block">Philosophy Comparison</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-primary">Restoration vs. Suppression</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Compare conventional suppression-based drug interactions against the restorative, holistic focus of Homoeopathy.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-white dark:bg-zinc-900 shadow-soft">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-bg-tertiary/60 border-b border-border">
                  <th className="p-5 text-[0.7rem] uppercase tracking-widest font-mono text-text-tertiary">Pathway Model</th>
                  <th className="p-5 text-[0.7rem] uppercase tracking-widest font-mono text-text-tertiary">Approach Focus</th>
                  <th className="p-5 text-[0.7rem] uppercase tracking-widest font-mono text-text-tertiary">Long-term Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-bg-primary/40 transition-colors">
                  <td className="p-6">
                    <h4 className="font-serif text-xl font-semibold text-text-primary">Allopathy</h4>
                    <p className="text-xs text-text-tertiary">Conventional Model</p>
                  </td>
                  <td className="p-6 text-sm text-text-secondary">Temporary Symptom Relief (Suppression)</td>
                  <td className="p-6 text-sm font-semibold text-rose-600 dark:text-rose-400">Recurring Chronic Risk</td>
                </tr>
                <tr className="hover:bg-bg-primary/40 transition-colors">
                  <td className="p-6">
                    <h4 className="font-serif text-xl font-semibold text-[#134634] dark:text-emerald-400">Homoeopathy</h4>
                    <p className="text-xs text-text-tertiary">Vitalistic Model</p>
                  </td>
                  <td className="p-6 text-sm text-text-secondary">Whole-Vitality Restorative Recovery</td>
                  <td className="p-6 text-sm font-semibold text-[#134634] dark:text-emerald-400">Constitutional Root Cause</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-12 bg-bg-secondary/40">
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

