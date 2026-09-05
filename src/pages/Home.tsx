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

// New Components
import HighImpactHero from '../components/home/HighImpactHero';
import QuickNavigation from '../components/home/QuickNavigation';
import ClinicalTipOfTheDay from '../components/home/ClinicalTipOfTheDay';
import RecommendedForYou from '../components/home/RecommendedForYou';
import AccordionSection from '../components/home/AccordionSection';
import IconDivider from '../components/home/IconDivider';

const activeFAQ = [
  {
    q: "What is Curiva Homoeopathy?",
    a: "An integrated digital platform providing study materials, classical literature, and clinical decision-support tools for BHMS students, educators, and clinicians."
  },
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
    { id: 'curriculum', label: "🎓 Study BHMS Curriculum"},
    { id: 'remedy', label: "🌿 Research Remedies"},
    { id: 'practice', label: "📚 Practice & Review"},
    { id: 'allied', label: "🩺 Allied Medical Sciences"},
    { id: 'clinical', label: "💻 Clinical Decision Tools"},
    { id: 'heritage', label: "🏛️ Heritage & History"}
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
        title: "Anatomy",
        description: "High-yield anatomy notes, structural diagrams, and regional dissection references.",
        icon: Activity,
        link: "/anatomy",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50",
        badge: "1st BHMS"
      },
      {
        title: "Physiology",
        description: "Systemic physiology vital mechanisms, Homoeostatic controls, and biochemistry portals.",
        icon: Layers,
        link: "/physiology",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "1st BHMS"
      },
      {
        title: "Materia Medica",
        description: "Classic drug proving records, keynotes, characteristics, and basic polychrests.",
        icon: BookOpen,
        link: "/materia-medica",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Core"
      },
      {
        title: "Organon of Medicine, Homoeopathic Philosophy & Fundamentals of Psychology",
        description: "Samuel Hahnemann's classical laws and active aphorisms annotated for modern students.",
        icon: GraduationCap,
        link: "/organon-philosophy",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50",
        badge: "Philosophy"
      },
      {
        title: "Student Resources",
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
        title: "Remedy Comparison",
        description: "Interactive clinical comparison matrix to differentiate overlapping remedy parameters.",
        icon: Cpu,
        link: "/analysis",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "Analyzer"
      },
      {
        title: "Miasms",
        description: "Deep study portal mapping chronic disease roots: Psora, Sycosis, and Syphilis.",
        icon: Layers,
        link: "/miasms",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Miasms"
      }
    ],
    practice: [
      {
        title: "MCQ Practice",
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
        title: "Viva",
        description: "Quick-response oral definitions, standard clinical values, and examiner lists.",
        icon: HelpCircle,
        link: "/student-resources",
        color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50",
        badge: "Viva Voce"
      }
    ],
    allied: [
      {
        title: "Anatomy",
        description: "Detailed systems covering osteology, muscles, neurovascular pathways & regional organs.",
        icon: Activity,
        link: "/anatomy",
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50",
        badge: "Anatomy"
      },
      {
        title: "Physiology",
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
        title: "Symptom Checker",
        description: "Input multiple symptoms, select thermal modalities, and compute mathematical remedy matches.",
        icon: Cpu,
        link: "/symptom-checker",
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/50",
        badge: "Decision Engine"
      },
      {
        title: "Disease Hub",
        description: "Direct organ-wise pathology index matching clinical symptoms to high-yield remedies.",
        icon: Activity,
        link: "/disease-hub",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/50",
        badge: "Therapeutics"
      }
    ],
    heritage: [
      {
        title: "Pioneers of Homoeopathy",
        description: "Explore standard milestones, chronicles, and historical development of Hahnemann's system.",
        icon: Clock,
        link: "/lexicon/historical",
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50",
        badge: "History"
      },
      {
        title: "Stalwarts",
        description: "Read biographies, historical essays, and classic cases from historical clinical masters.",
        icon: Users,
        link: "/stalwarts",
        color: "text-teal-600 bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/50",
        badge: "Stalwarts"
      },
      {
        title: "Public Education",
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

      {/* High Impact Hero Banner */}
      <HighImpactHero />

      {/* Quick Navigation Below Hero */}
      <QuickNavigation />

      {/* High-Contrast Divider with Icon */}
      <IconDivider icon="sparkles" />

      {/* Clinical Tip of the Day */}
      <div className="mb-12">
        <ClinicalTipOfTheDay />
      </div>

      {/* Recommended for You Section */}
      <RecommendedForYou />

      <IconDivider icon="library" />

      {/* Main Content Sections wrapped in Accordion for cleaner layout */}
      <div className="space-y-4">
        <AccordionSection title="Academic Board Grid" icon={GraduationCap} defaultOpen={true}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/cbdc-syllabus"
              className="group bg-white dark:bg-zinc-900 border border-border/85 hover:border-primary/40 rounded-2xl p-8 sm:p-10 shadow-soft hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-primary font-bold block mb-2">Academic Hub</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-text-primary group-hover:text-primary transition-colors">
                  NCH CBDC <br />Syllabus Mapping
                </h3>
              </div>
              <div className="space-y-4 pt-6">
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Official year-wise competency syllabus, allocation hours, and curriculum mapping.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
                  View Syllabus <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link 
              to="/anatomy"
              className="group bg-white dark:bg-zinc-900 border border-border/85 hover:border-primary/40 rounded-2xl p-8 sm:p-10 shadow-soft hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-primary font-bold block mb-2">Anatomy Lab</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-text-primary group-hover:text-primary transition-colors">
                  Anatomy Core <br />Studies
                </h3>
              </div>
              <div className="space-y-4 pt-6">
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Regional dissection references and structural diagrams for the first year BHMS student.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
                  Explore Dissections <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link 
              to="/student-resources"
              className="group bg-white dark:bg-zinc-900 border border-border/85 hover:border-primary/40 rounded-2xl p-8 sm:p-10 shadow-soft hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-primary font-bold block mb-2">Clinical Intelligence</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-text-primary group-hover:text-primary transition-colors">
                  Revisions <br />Exam Board
                </h3>
              </div>
              <div className="space-y-4 pt-6">
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Solved previous year papers, university plans, and targeted clinical revision guides.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
                  Access Exam Board <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </AccordionSection>

        <AccordionSection title="Quick-Access Study Desk" icon={Sparkles}>
          <div className="py-8 bg-gradient-to-b from-bg-secondary/20 to-bg-primary border-y border-border/30 relative overflow-hidden rounded-[2.5rem]">
            <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
                  What do you need to accomplish?
                </h2>
                <p className="text-xs md:text-sm text-text-secondary leading-normal">
                  Select your direct educational goal or intent below:
                </p>
              </div>

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
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-4">
                {intentCards[activeIntentTab].map((card, idx) => {
                  const CardIcon = card.icon;
                  return (
                    <Link
                      key={idx}
                      to={card.link}
                      className="group relative p-6 bg-white dark:bg-gray-900 border border-border/80 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 hover:border-primary/40 flex flex-col justify-between"
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
          </div>
        </AccordionSection>

        <AccordionSection title="Interactive eBook Library" icon={BookOpen}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <Link 
                to="/read/hair-loss-Homoeopathy" 
                className="group relative block w-72 sm:w-80 h-[400px] sm:h-[450px] rounded-r-3xl rounded-l-md shadow-2xl transition-transform duration-500 ease-out hover:-rotate-1 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1b3028 0%, #325b4b 50%, #1b3028 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), -6px 0 0px #0c1814'
                }}
              >
                <div className="absolute top-0 left-0 w-3.5 h-full bg-gradient-to-r from-black/40 via-white/10 to-transparent rounded-l-md" />
                <div className="absolute top-0 left-3.5 w-1 h-full bg-black/25" />
                <div className="h-full p-8 sm:p-10 flex flex-col justify-between items-center text-center text-white select-none">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-black leading-tight tracking-tight text-white/95">
                      HAIR FALL<br />
                      <span className="text-emerald-450 font-normal italic font-serif">RECOVERY GUIDE</span>
                    </h3>
                  </div>
                </div>
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary">Hair Fall Recovery Guide</h3>
              <p className="text-xs md:text-sm text-text-secondary">High-yield, step-by-step practical publication written in an approachable, warm, and professional tone.</p>
              <div className="pt-2">
                <Link to="/read/hair-loss-Homoeopathy" className="btn-premium btn-premium-primary text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2">
                  Launch eBook Reader <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </div>
          </div>
        </AccordionSection>

        <AccordionSection title="Interactive Therapeutics Hub" icon={Activity}>
          <div className="bg-emerald-950 text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-emerald-900/40">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-white mb-6">Interactive Disease Hub</h2>
            <Link 
              to="/disease-hub" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all inline-flex items-center gap-2"
            >
              Explore All Patterns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AccordionSection>

        <AccordionSection title="Clinical Workspace & Tools" icon={Layers}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Public Education Hub</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Explore how classical homoeopathy works and find authoritative answers to common questions.
                </p>
              </div>
              <Link to="/public-education" className="w-full text-center px-6 py-3 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-wider block">
                Explore Hub
              </Link>
            </div>
            <div className="border border-border rounded-3xl p-8 bg-bg-primary/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-xl font-display text-primary leading-tight font-bold">Symptom Checker</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Safely cross-check mental and physical symptoms against recorded natural modalities.
                </p>
              </div>
              <Link to="/symptom-checker" className="w-full text-center px-6 py-3 border border-primary text-primary rounded-2xl text-xs font-bold uppercase tracking-wider block">
                Start Checker
              </Link>
            </div>
          </div>
        </AccordionSection>

        <AccordionSection title="Support & FAQ" icon={HelpCircle}>
          <div className="space-y-4 py-4">
            {activeFAQ.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="bg-white border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left font-bold text-xs md:text-sm text-text-primary flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform duration-305 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </AccordionSection>
      </div>

      {/* Study Quick-Reference Modal */}
      <StudyQuickReferenceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        topic={selectedTopic} 
      />
    </div>
  );
}

