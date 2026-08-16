import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  History, 
  Search, 
  Stethoscope, 
  Database, 
  Activity, 
  User, 
  Globe,
  X,
  ChevronRight, 
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Award,
  Check,
  Quote,
  Network,
  Filter,
  BookOpen,
  GraduationCap,
  HelpCircle,
  FileText,
  Lightbulb,
  AlertTriangle,
  ChevronLeft,
  RotateCw
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ContentNavigator } from '../components/ContentNavigator';
import { organonData, OrganonAphorism } from '../data/organon_data';
import { prefacesData, westernPhilosophyData } from '../data/prefacesData';
import { getProfessorLecture } from '../data/professor_lectures';
import { CbdcLearningEcosystem } from '../components/CbdcLearningEcosystem';
import { PSYCHOLOGY_TOPICS } from '../data/psychologyData';
import { PHILOSOPHY_BOOKS } from '../data/philosophyBooksData';
import { stalwartsData } from '../data/stalwartsData';

// Define standard glossary tooltips for accessibility and scholarly learning
const GLOSSARY_TERMS: Record<string, string> = {
  "Vital Force": "The spirit-like dynamis that animates the material organism, keeping all parts in harmonious play and resisting disease.",
  "Similia Similibus Curantur": "Hahnemann's fundamental therapeutic law: 'Let likes be treated with likes'—curing with substances that mimic symptoms.",
  "Miasm": "A chronic disease-producing power or dynamic poison (Psora, Sycosis, Syphilis) that lies at the root of hereditary chronic complaints.",
  "Totality of Symptoms": "The complete, individualized picture of the patient's deviance from health—mental, general, and physical.",
  "Drug Proving": "The scientific testing of potentized remedies on healthy human beings to record the absolute symptoms they generate.",
  "LM Potency": "The 50-millesimal scale (1:50,000 dilution ratio per stage) introduced in the 6th edition to secure rapid, gentle cures.",
  "Homoeopathic Aggravation": "A slight, temporary intensification of the disease symptoms after the correct remedy acts on the vital plane.",
  "Peculiar Symptoms": "Unusual, rare, or characteristic symptoms of the patient that hold key importance for individualization.",
  "Physician's Mission": "The sole and high duty to restore the sick to health, to cure, rejecting theoretical speculations."
};

interface KeyTermProps {
  term: string;
}

const KeyTerm: React.FC<KeyTermProps> = ({ term }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const definition = GLOSSARY_TERMS[term] || "A core term in Hahnemannian Homoeopathic therapeutics.";

  return (
    <span 
      className="relative inline-block border-b-2 border-dotted border-amber-600/50 text-[#2c241a] font-bold cursor-help transition-all hover:text-amber-700"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {term}
      <AnimatePresence>
        {showTooltip && (
          <motion.span 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-900 text-white text-xs font-sans font-normal rounded-xl shadow-2xl z-50 text-justify leading-relaxed pointer-events-none"
          >
            <strong className="block text-amber-400 mb-1 border-b border-zinc-800 pb-0.5">{term}</strong>
            {definition}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

// Inline vector Caduceus icon for consistent medical symbolism and anti-slop visuals
const CaduceusIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v20" />
    <path d="M12 4c1.5 2 3 3.5 3 5s-1.5 3-3 5-3-3.5-3-5 1.5-3 3-5z" />
    <path d="M12 4c-1.5 2-3 3.5-3 5s1.5 3 3 5 3-3.5 3-5-1.5-3-3-5z" />
    <path d="M12 12c2.5 1.5 5.5 1.5 7.5-1v0c2-2.5 1-6.5-2-7.5-3-1-5 1-5.5 3" />
    <path d="M12 12c-2.5 1.5-5.5 1.5-7.5-1v0c-2-2.5-1-6.5 2-7.5 3-1 5 1 5.5 3" />
    <circle cx="12" cy="2" r="1.5" fill="currentColor" />
  </svg>
);

// High-yield stalwart interpretations to support "compare interpretations"
const STALWART_COMMENTARIES: Record<string, Record<string, string>> = {
  Hahnemann: {
    "1": "The dynamic vital principles represent an inductive law of biology. Any speculation regarding the mechanical, chemical, or internal essence of life is completely useless for saving a human life.",
    "2": "A true cure must eliminate the dynamic disease state entirely in a rapid, mild, and secure path based on easily intelligible principles.",
    "3": "Every true healer must understand the disease elements (indications), remedy dynamics (provings), posology (dosing), and what stands in the path of recovery.",
    "default": "Always base clinical actions strictly on observable, natural laws. Avoid speculation and focus purely on restoring the dynamic balance of the patient."
  },
  Kent: {
    "1": "The physician's true mission is first directed towards the inner, spiritual man. The material body is merely an instrument, and true sickness begins in the will and understanding.",
    "2": "Gentle restoration implies that there is no violence to the vital force. Aggressive allopathic mixtures disrupt the delicate harmony of the human soul.",
    "3": "We must understand what is sick in man—not merely pathology or tissues, but the spiritual deviations. Tissues are only the results of the disease.",
    "default": "The vital energy is prior to the physical organs. All healing flows from within outward—from centers to circumference, and in reverse order of the symptoms."
  },
  Sarkar: {
    "1": "Sarkar views this as Hahnemann applying Lord Bacon's inductive logic. Sickness is a natural state of deviation that is mapped purely by empirical symptoms, not hypotheses.",
    "2": "The ideal of cure combines speed, safety, and scientific rationality. It requires a mathematical application of potency matching the client's vital susceptibility.",
    "3": "The doctor requires systematic cognitive skills. Synthesis is critical—uniting the remedy portrait with the patient's diagnostic and physical totality.",
    "default": "Homoeopathy is an observation-based clinical science. Hahnemann builds his guidelines as a strict direct response to the scientific limitations of 19th-century therapeutics."
  }
};

const getCompareInterpretations = (id: number) => {
  const idStr = id.toString();
  return {
    hahnemann: STALWART_COMMENTARIES.Hahnemann[idStr] || STALWART_COMMENTARIES.Hahnemann["default"],
    kent: STALWART_COMMENTARIES.Kent[idStr] || STALWART_COMMENTARIES.Kent["default"],
    sarkar: STALWART_COMMENTARIES.Sarkar[idStr] || STALWART_COMMENTARIES.Sarkar["default"]
  };
};

const OrganonMedicine: React.FC = () => {
  // Main Navigation Tabs
  const [activeTab, setActiveTab] = useState<'cbdc' | 'matrix' | 'psychology' | 'philosophers' | 'study' | 'prefaces' | 'chronology'>('cbdc');

  // Psychology Tab States
  const [selectedPsychologyId, setSelectedPsychologyId] = useState<string>(PSYCHOLOGY_TOPICS[0].id);

  // Philosophy Books & Stalwarts States
  const [philosophySubTab, setPhilosophySubTab] = useState<'books' | 'stalwarts'>('books');
  const [selectedBookId, setSelectedBookId] = useState<string>(PHILOSOPHY_BOOKS[0].id);
  const [selectedStalwartId, setSelectedStalwartId] = useState<string>('hahnemann');
  const [stalwartSearch, setStalwartSearch] = useState('');

  // Matrix tab states (Syllabus Years 1st - 4th)
  const [selectedYear, setSelectedYear] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAphorismId, setSelectedAphorismId] = useState<number | null>(1);
  const [activeAphorismFilter, setActiveAphorismFilter] = useState<'All' | 'Philosophical' | 'Practical' | 'Therapeutic' | 'Historical'>('All');

  const aphorismIndex = organonData.findIndex(a => a.id === selectedAphorismId);
  const prevAph = aphorismIndex > 0 ? organonData[aphorismIndex - 1] : null;
  const nextAph = aphorismIndex < organonData.length - 1 ? organonData[aphorismIndex + 1] : null;

  // Study Tools states
  const [flashcardYear, setFlashcardYear] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  // Practice Quiz states
  const [quizYear, setQuizYear] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Detail panel inner tabs (Commentary, Clinical, Exam, Compare, Quiz)
  const [detailTab, setDetailTab] = useState<'commentary' | 'clinical' | 'exam' | 'compare' | 'quiz'>('commentary');

  // Historical Prefaces State
  const [selectedPrefaceId, setSelectedPrefaceId] = useState(prefacesData[prefacesData.length - 1]?.id || "6th");

  // Sarkar Study Toggle State
  const [showSarkarStudy, setShowSarkarStudy] = useState(false);

  // Interactive Footnote Highlights
  const [activeFootnoteId, setActiveFootnoteId] = useState<string | null>(null);

  // Reset indices and tabs when states change
  useEffect(() => {
    setCurrentFlashcardIndex(0);
    setIsFlipped(false);
  }, [flashcardYear]);

  useEffect(() => {
    setQuizSelectedAnswers({});
    setQuizSubmitted(false);
  }, [quizYear]);

  useEffect(() => {
    setDetailTab('commentary');
    setActiveFootnoteId(null);
  }, [selectedAphorismId]);

  // Curriculum mappings strictly aligned to BHMS Syllabus
  const BHMS_CURRICULUM = {
    '1st': {
      title: "1st Year BHMS – Foundations of Organon & Psychology",
      badge: "Syllabus Compliant §1–27 & §105–145",
      weightage: "High Weightage (40 Marks)",
      difficulty: "Beginner",
      objectives: "Foundations of Organon, History of Medicine & Homoeopathy, Stalwarts, Logic, Fundamental Principles, Basic Concepts, Health/Disease/Cure, Aphorisms §1-27 & §105-145, Drug Proving, Physician, and Fundamentals of Psychology.",
      aphorismRange: [1, 28] as [number, number],
      lessons: [
        { title: "1. History of Medicine", range: "Evolution, Milestones, Ancient Systems" },
        { title: "2. History of Homoeopathy", range: "Discovery 1790, Hahnemann, India, Europe, USA" },
        { title: "3. Stalwarts of Homoeopathy", range: "Boenninghausen, Hering, Kent, Dutt, Sircar, Sarkar" },
        { title: "4. Introduction to Organon", range: "Science & Art, Editions, Construction, Ground Plan" },
        { title: "5. Logic in Homoeopathy", range: "Inductive & Deductive Logic (Baconian)" },
        { title: "6. Fundamental Principles", range: "Similia, Simplex, Minimum, Proving, Vital Force" },
        { title: "7. Basic Concepts", range: "Individualistic, Holistic, Dynamic Concepts" },
        { title: "8. Health, Disease & Cure", range: "Concept of Life, Health, Disease & Cure" },
        { title: "9. Organon Aphorisms", range: "§1–27 (Principles) & §105–145 (Proving)" },
        { title: "10. Drug Proving", range: "Purpose, Method, Ethics, Provers, Recording" },
        { title: "11. The Physician", range: "Mission, Duties, Qualities & Knowledge (§1–4)" },
        { title: "12. Fundamentals of Psychology", range: "Learning, Memory, Emotion, Stress, Defense Mechs" }
      ]
    },
    '2nd': {
      title: "2nd Year BHMS – Disease, Case Taking & Philosophy",
      badge: "Syllabus Compliant §28–104",
      weightage: "Medium Weightage (30 Marks)",
      difficulty: "Intermediate",
      objectives: "Organon Aphorisms §28-104, Natural vs Artificial Disease, Therapeutic Law, Classification of Diseases, Miasms, Case Taking, Record Keeping, Symptomatology, Case Processing, Susceptibility & Causation.",
      aphorismRange: [29, 104] as [number, number],
      lessons: [
        { title: "1. Organon Aphorisms", range: "§28–70 & §71–104" },
        { title: "2. Natural vs Artificial Disease", range: "Dynamic interactions & disease behavior (§29–34)" },
        { title: "3. Therapeutic Law of Nature", range: "Nature's Law of Cure (§26)" },
        { title: "4. Classification of Diseases", range: "Acute, Chronic, Surgical, Pseudo-chronic, Local" },
        { title: "5. Introduction to Miasms", range: "Psora, Sycosis, Syphilis (§72–81)" },
        { title: "6. Scientific Case Taking", range: "Principles, History, Observation, Acute/Chronic (§83–104)" },
        { title: "7. Record Keeping", range: "Systematic case records & longitudinal logs" },
        { title: "8. Symptomatology", range: "Analysis, Evaluation, Grading, Totality" },
        { title: "9. Case Processing", range: "Portrait of Disease & Individualization" },
        { title: "10. Susceptibility", range: "Dynamic capacity to react to stimuli" },
        { title: "11. Causation in Disease", range: "Predisposing, Exciting, Maintaining & Fundamental" },
        { title: "12. Anamnesis & Disease Progress", range: "Historical recollection & pathology course" },
        { title: "13. Complex Disease & Suppression", range: "Dual disease states & intro to suppression" },
        { title: "14. Various Systems of Medicine", range: "Allopathy, Antipathy, Isopathy, Homoeopathy" }
      ]
    },
    '3rd': {
      title: "3rd Year BHMS – Chronic Diseases & Advanced Organon",
      badge: "Syllabus Compliant §146–209 & §231–294",
      weightage: "High Weightage (35 Marks)",
      difficulty: "Advanced",
      objectives: "Prefaces & Introduction of Organon, §146-209 & §231-294, Action of Medicines, Management of Acute/Chronic/Surgical/Epidemic diseases, Posology, Follow-up, Remedy Reactions, Second Prescription, and J.H. Allen Miasms.",
      aphorismRange: [105, 244] as [number, number],
      lessons: [
        { title: "1. Prefaces & Introduction", range: "Historical evolution & review of allopathy" },
        { title: "2. Organon Aphorisms", range: "§146–209 & §231–294" },
        { title: "3. Action of Medicines", range: "Primary & Secondary action of remedies (§63–66)" },
        { title: "4. Disease Management", range: "Acute, Chronic, Surgical, Epidemic, One-sided" },
        { title: "5. Repetition & Posology", range: "Dose repetition, Posology & LM Scale (§245–271)" },
        { title: "6. Follow-up & Remedy Reaction", range: "12 Observations, Aggravation, Amelioration" },
        { title: "7. Second Prescription", range: "8 choices in second prescription" },
        { title: "8. Pharmacy & Administration", range: "Potentisation, Routes, Fundamental Laws" },
        { title: "9. Diet, Regimen & Auxiliary", range: "Dietary restrictions & auxiliary measures (§286–294)" },
        { title: "10. Scope & Limitations", range: "Boundaries of Homoeopathy & General Pathology" },
        { title: "11. Theory of Chronic Diseases", range: "Hahnemann's Miasmatic evolution (1828)" },
        { title: "12. J.H. Allen's Chronic Miasms", range: "Psora, Pseudo-Psora (Tubercular), Sycosis" }
      ]
    },
    '4th': {
      title: "4th Year BHMS – Clinical Application & Revision",
      badge: "Syllabus Compliant §210–230 & Full Revision",
      weightage: "Expert Weightage (45 Marks)",
      difficulty: "Expert",
      objectives: "Mental Diseases §210-230, Complete Revision of Organon §1-294, Clinical Case Taking, Symptomatology & Value of Symptoms, Portrait Formation, Susceptibility & Miasms, Posology, Remedy Reactions, and Philosophy Revision (Kent, Close, Roberts).",
      aphorismRange: [245, 294] as [number, number],
      lessons: [
        { title: "1. Mental Diseases (§210–230)", range: "Classification, Somato-psychic & Psychosomatic" },
        { title: "2. Full Organon Revision", range: "§1–70, §71–104, §105–145, §146–209, §231–294" },
        { title: "3. Clinical Case Taking", range: "Bedside clinic & complex multi-miasmatic cases" },
        { title: "4. Value of Symptoms", range: "Characteristic, Strange-rare-peculiar, Generals" },
        { title: "5. Forming Disease Portrait", range: "Individualization & synthetic totality formation" },
        { title: "6. Susceptibility & Miasms", range: "Clinical assessment of reaction & miasmatic blend" },
        { title: "7. Posology & Remedy Reaction", range: "Potency selection & evaluating progress" },
        { title: "8. Kent's Philosophy Revision", range: "37 Lectures, Simple Substance, 12 Observations" },
        { title: "9. Stuart Close Philosophy", range: "Genius of Homoeopathy, Drug Proving, Susceptibility" },
        { title: "10. H.A. Roberts Philosophy", range: "Principles & Art of Cure, Miasms, Vital Force" }
      ]
    }
  };

  // Filter Aphorisms dynamically by Search, Category, and Selected Year
  const getFilteredAphorisms = () => {
    const range = BHMS_CURRICULUM[selectedYear].aphorismRange;
    return organonData.filter(aph => {
      // Must fall in correct Year range
      const inYearRange = aph.id >= range[0] && aph.id <= range[1];
      if (!inYearRange) return false;

      // Category matching
      let categoryMatches = true;
      if (activeAphorismFilter !== 'All') {
        const mappedCat = 
          activeAphorismFilter === 'Philosophical' ? 'Philosophy' :
          activeAphorismFilter === 'Practical' ? 'Clinical' :
          activeAphorismFilter === 'Therapeutic' ? 'Pharmacy' : 'Historical';
        categoryMatches = aph.category === mappedCat;
      }

      // Search matching
      let searchMatches = true;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesId = aph.id.toString() === query || `§${aph.id}` === query;
        const matchesText = aph.versions.some(v => v.content.toLowerCase().includes(query));
        searchMatches = matchesId || matchesText;
      }

      return categoryMatches && searchMatches;
    });
  };

  const filteredAphorisms = getFilteredAphorisms();

  // Helper to extract study lectures safely
  const currentLecture = selectedAphorismId ? getProfessorLecture(selectedAphorismId) : null;
  const currentAphorism = selectedAphorismId ? organonData.find(a => a.id === selectedAphorismId) : null;

  // Flashcards builder based on selected syllabus year
  const getFlashcardsForYear = () => {
    const range = BHMS_CURRICULUM[flashcardYear].aphorismRange;
    const cards = organonData.filter(aph => aph.id >= range[0] && aph.id <= range[1]);
    
    if (cards.length > 0) {
      return cards.map(aph => {
        const aid = selectedAphorismId ? getProfessorLecture(aph.id) : null;
        return {
          id: aph.id,
          title: `Aphorism §${aph.id}`,
          category: aph.category,
          front: `What is the core therapeutic philosophy or requirement set forth by Hahnemann in Aphorism §${aph.id}?`,
          back: aph.versions[0]?.content || "Syllabus learning guidance placeholder.",
          takeaway: aid?.whyThisMatters || "Crucial for university exam parameters."
        };
      });
    }

    return [
      {
        id: 1,
        title: "Aphorism §1",
        category: "Philosophy" as const,
        front: "What is the primary mission of the physician?",
        back: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.",
        takeaway: "Reject speculative systems and act to cure."
      }
    ];
  };

  const activeFlashcards = getFlashcardsForYear();
  const currentCard = activeFlashcards[currentFlashcardIndex] || activeFlashcards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentFlashcardIndex(prev => (prev + 1) % activeFlashcards.length);
    }, 200);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentFlashcardIndex(prev => (prev - 1 + activeFlashcards.length) % activeFlashcards.length);
    }, 200);
  };

  const handleMarkMastered = () => {
    if (!masteredCards.includes(currentCard.id)) {
      setMasteredCards(prev => [...prev, currentCard.id]);
    } else {
      setMasteredCards(prev => prev.filter(id => id !== currentCard.id));
    }
  };

  // Mock quiz setup
  const getMockQuizQuestions = () => {
    const range = BHMS_CURRICULUM[quizYear].aphorismRange;
    // Collect lectures that contain custom MCQs in this range
    const validLectures = [];
    for (let id = range[0]; id <= range[1]; id++) {
      const lec = getProfessorLecture(id);
      if (lec && lec.mcqs && lec.mcqs.length > 0) {
        validLectures.push({ id, mcqs: lec.mcqs });
      }
    }

    const flatQuestions = validLectures.flatMap(item => 
      item.mcqs.map((q, idx) => ({
        aphorismId: item.id,
        question: `[§${item.id}] ${q.question}`,
        options: q.options,
        correctIndex: q.correctIndex,
        rationale: q.rationale
      }))
    );

    if (flatQuestions.length > 0) {
      return flatQuestions.slice(0, 8); // Display top 8 questions
    }

    // Default high-quality quiz if no specific mapped lectures
    return [
      {
        aphorismId: 1,
        question: "[§1] Hahnemann declares that the physician's 'high and only mission' is to:",
        options: [
          "Explain the deep material pathology of human cells",
          "Restore the sick to health, to cure, as it is termed",
          "Formulate complex speculative medical systems",
          "Analyze chemistry records in academic laboratories"
        ],
        correctIndex: 1,
        rationale: "Aphorism §1 sets the absolute purpose of medicine: clinical action and cure, rejecting purely theoretic structures."
      },
      {
        aphorismId: 2,
        question: "[§2] What does Hahnemann state are the attributes of the 'highest ideal of cure'?",
        options: [
          "Rapid, gentle, and permanent restoration of health on easily comprehensible principles",
          "Slow, gradual, and chemical suppression of skin complaints",
          "Violent dynamic shock therapy to stimulate active nerve systems",
          "Speculative and mysterious formulas wrapped in unintelligible terminology"
        ],
        correctIndex: 0,
        rationale: "Hahnemann demands rapid, gentle, permanent cure, based on straightforward, comprehensible principles."
      },
      {
        aphorismId: 3,
        question: "[§3] Which of the following is NOT listed as a requirement for a true practitioner of the healing art?",
        options: [
          "Knowledge of what is curative in medicines",
          "Knowledge of the exact material cost of commercial herbs",
          "Knowledge of how to adapt drug powers to dynamic disease",
          "Knowledge of obstacles to recovery and their removal"
        ],
        correctIndex: 1,
        rationale: "Aphorism §3 outlines clinical knowledge, drug knowledge, dosage adaptations, and obstacle removal—not commercial cost."
      },
      {
        aphorismId: 4,
        question: "[§4] The physician is termed a 'preserver of health' if they understand:",
        options: [
          "How to perform major cardiac surgeries",
          "The exciting causes that derange health and how to remove them",
          "The chemical structures of organic antibiotics",
          "How to manufacture glass remedy bottles"
        ],
        correctIndex: 1,
        rationale: "Aphorism §4 mandates hygiene, prevention, and identification of maintaining or exciting causes of disease."
      }
    ];
  };

  const activeQuizQuestions = getMockQuizQuestions();

  const handleSelectQuizAnswer = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setQuizSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    activeQuizQuestions.forEach((q, idx) => {
      if (quizSelectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  // Humanize/Commentary Text extraction helpers
  const getSimpleExplanation = () => {
    if (!currentLecture) return "";
    return currentLecture.simpleTranslation || currentLecture.simpleExplanation || "Hahnemann details the core clinical tenets to maintain scientific integrity.";
  };

  const getHahnemannDetailed = () => {
    if (!currentLecture) return "";
    return currentLecture.whatHahnemannMeans || currentLecture.detailedUnderstanding || "A critical milestone in your BHMS university studies.";
  };

  const getConversationalExplanation = () => {
    if (!currentLecture) return "";
    return currentLecture.conversationalExplanation || "Look, beta, in clinical cases, keep your mind clear and your senses active. That is the gold standard of prescribing.";
  };

  // Clean formatted content for original text highlighting glossary terms
  const highlightGlossaryTerms = (text: string) => {
    if (!text) return "";
    
    // Split the text based on glossary terms
    const terms = Object.keys(GLOSSARY_TERMS);
    const pattern = new RegExp(`(${terms.join('|')})`, 'g');
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      if (GLOSSARY_TERMS[part]) {
        return <KeyTerm key={`${part}-${index}`} term={part} />;
      }
      return part;
    });
  };

  // Prefaces selection rendering
  const activePreface = prefacesData.find(p => p.id === selectedPrefaceId) || prefacesData[prefacesData.length - 1];

  return (
    <div id="organon-parent" className="bg-[#fcfbf7] min-h-screen pb-24 selection:bg-[#d4b982]/30 selection:text-[#5c401b]">
      <Helmet>
        <title>Organon of Medicine | BHMS Scholarly Academy | Curiva</title>
        <meta name="description" content="A comprehensive academic study suite for Samuel Hahnemann's Organon of Medicine, designed strictly for BHMS curriculum compliance." />
      </Helmet>

      {/* Parchment Page Overlay effect for academic texture */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-[0.03] mix-blend-multiply" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #dcd3b8, transparent)' }} />

      {/* Academic Header Banner */}
      <header id="organon-header" className="relative pt-28 pb-14 border-b border-[#ebdcb9] bg-[#faf8f0] overflow-hidden text-[#2c241a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcf9] to-transparent opacity-80" />
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-5 pointer-events-none animate-pulse">
          <CaduceusIcon className="w-96 h-96" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          {/* Breadcrumb Navigation for Enhanced Accessibility */}
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700/80 uppercase">
            <span>Curiva Academy</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>BHMS Curriculum</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#2c241a] font-bold">Organon of Medicine</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-serif text-[#2c241a] tracking-tight leading-none">
            Organon <span className="text-amber-700 italic font-normal">of Medicine</span>
          </h1>
          <p className="text-sm md:text-base text-stone-600 max-w-2xl mx-auto italic font-sans">
            "The truth we mortals need, Us blest to make and keep, The All-wise slightly covered o'er, But did not bury deep."
          </p>

          {/* Core Applet Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {[
              { id: 'cbdc', label: 'NCH CBDC Syllabus Platform', icon: <Award className="w-4 h-4" /> },
              { id: 'matrix', label: 'Aphorisms & Split Desk', icon: <Layers className="w-4 h-4" /> },
              { id: 'psychology', label: 'Fundamentals of Psychology', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'philosophers', label: 'Philosophy Books & Stalwarts', icon: <Book className="w-4 h-4" /> },
              { id: 'study', label: 'Academic Study Hub', icon: <GraduationCap className="w-4 h-4" /> },
              { id: 'prefaces', label: 'Translator\'s Prefaces', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'chronology', label: 'Historical Chronology', icon: <History className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm border ${
                  activeTab === tab.id
                    ? 'bg-amber-800 text-[#fdfcf9] border-amber-900 shadow-[#d4b982]/30 scale-[1.02]'
                    : 'bg-white text-stone-700 hover:text-amber-800 border-[#ebdcb9] hover:bg-stone-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <AnimatePresence mode="wait">
          
          {/* TAB 0: NCH CBDC LEARNING ECOSYSTEM */}
          {activeTab === 'cbdc' && (
            <motion.div 
              key="cbdc-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CbdcLearningEcosystem 
                onSelectAphorism={(id) => {
                  setSelectedAphorismId(id);
                  setActiveTab('matrix');
                }}
              />
            </motion.div>
          )}

          {/* TAB 1: CURRICULUM MATRIX (Dashboard & Split Layout Detail Desk) */}
          {activeTab === 'matrix' && (
            <motion.div 
              key="matrix-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
              id="matrix-anchor"
            >
              {/* Year-Wise Tabs Dashboard */}
              <section className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-[#f3ebda]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-1">BHMS Academic Curriculum</span>
                    <h2 className="text-2xl md:text-3xl font-serif text-[#2c241a] flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-amber-700 shrink-0" />
                      Syllabus Year-Wise Categorization
                    </h2>
                  </div>

                  {/* Syllabus Compliance Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span>NCH CBDC v2024 Compliant Syllabus</span>
                  </div>
                </div>

                {/* Years Selector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(['1st', '2nd', '3rd', '4th'] as const).map((yr) => {
                    const info = BHMS_CURRICULUM[yr];
                    const isSelected = selectedYear === yr;
                    return (
                      <button
                        key={yr}
                        onClick={() => {
                          setSelectedYear(yr);
                          // Set first aphorism in that range as selected
                          setSelectedAphorismId(info.aphorismRange[0]);
                        }}
                        className={`text-left p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#fcfaf3] border-amber-800 ring-2 ring-amber-800/10 shadow-md'
                            : 'bg-white border-stone-200 hover:border-amber-600/50 hover:bg-[#fdfcf9] hover:shadow-sm'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              isSelected ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-600'
                            }`}>
                              {yr} Year BHMS
                            </span>
                            <span className="text-xs font-semibold text-stone-400">
                              §{info.aphorismRange[0]}–§{info.aphorismRange[1]}
                            </span>
                          </div>
                          <h3 className={`text-base font-bold ${isSelected ? 'text-amber-900' : 'text-[#2c241a]'}`}>
                            {yr === '1st' ? 'Foundations' : yr === '2nd' ? 'Case Taking' : yr === '3rd' ? 'Drug Proving' : 'Posology & Scales'}
                          </h3>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {info.objectives}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#f3ebda] flex items-center justify-between text-[10px] font-bold text-stone-400">
                          <span>Difficulty: <strong className="text-amber-700">{info.difficulty}</strong></span>
                          <span className="text-amber-800 font-semibold flex items-center gap-0.5">
                            Details <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Current Year Syllabus Highlights */}
                <div className="bg-[#FAF8F2] rounded-2xl border border-[#ebdcb9] p-6 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#ebdcb9]/40 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Book className="w-4 h-4" /> {BHMS_CURRICULUM[selectedYear].title} Highlights
                    </h3>
                    <span className="text-xs text-stone-500 font-medium italic">
                      {BHMS_CURRICULUM[selectedYear].weightage}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {BHMS_CURRICULUM[selectedYear].lessons.map((lesson, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-stone-200 text-center space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700">{lesson.range}</span>
                        <h4 className="text-xs font-bold text-stone-800 leading-tight">{lesson.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Aphorism Index Grid & Split Detail Desk */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT SIDEBAR: Aphorism Index Searcher & List */}
                <aside className="lg:col-span-4 bg-white rounded-3xl border border-[#ebdcb9] p-6 shadow-sm space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#2c241a] uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-stone-100">
                      <Filter className="w-4 h-4 text-amber-800" />
                      Aphorism Index Selector
                    </h3>

                    {/* Quick Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input 
                        type="text"
                        placeholder="Search ID (e.g. 1) or keyword..."
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Categorized Filter Tabs */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Thematic Themes</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['All', 'Philosophical', 'Practical', 'Therapeutic', 'Historical'] as const).map(f => (
                          <button
                            key={f}
                            onClick={() => setActiveAphorismFilter(f)}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border text-center transition-all ${
                              activeAphorismFilter === f
                                ? 'bg-amber-800/10 text-amber-900 border-amber-800/40'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Aphorisms List for the selected syllabus Year */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-1 border-b border-stone-100">
                      <span>Syllabus Aphorisms List</span>
                      <span>{filteredAphorisms.length} Nodes</span>
                    </div>

                    <div className="max-h-[450px] overflow-y-auto pr-1 space-y-2 scrollbar-thin">
                      {filteredAphorisms.length > 0 ? (
                        filteredAphorisms.map(aph => {
                          const isSelected = selectedAphorismId === aph.id;
                          return (
                            <button
                              key={aph.id}
                              onClick={() => setSelectedAphorismId(aph.id)}
                              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                                isSelected
                                  ? 'bg-[#fdfbf2] border-amber-800 ring-2 ring-amber-800/5'
                                  : 'bg-stone-50 border-stone-100 hover:border-amber-600/30 hover:bg-white'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSelected ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-700'
                              }`}>
                                §{aph.id}
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <h4 className={`text-xs font-semibold truncate ${isSelected ? 'text-amber-900 font-bold' : 'text-[#2c241a]'}`}>
                                  {aph.versions[0]?.content || "Original text unavailable"}
                                </h4>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] text-stone-400 font-semibold">{aph.category}</span>
                                  <span className="text-[8px] bg-[#d4b982]/10 text-amber-800 font-black uppercase px-1.5 rounded">
                                    {aph.versions[0]?.edition || "Standard"}
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-stone-400 text-xs">
                          No matching syllabus nodes. Use filter terms above.
                        </div>
                      )}
                    </div>
                  </div>
                </aside>

                {/* RIGHT MAIN PANEL: Split-Layout Aphorism Detail (The Scholar's Desk) */}
                <section className="lg:col-span-8 bg-white rounded-3xl border border-[#ebdcb9] overflow-hidden shadow-sm flex flex-col">
                  
                  {/* Scholar Desk Toolbar */}
                  <div className="bg-[#faf8f0] p-4 border-b border-[#ebdcb9] flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-800/10 text-amber-800 flex items-center justify-center font-serif font-black text-sm italic">
                        §{selectedAphorismId}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-tight">Logical Study Desk</h3>
                        <p className="text-[10px] text-stone-500 font-medium">Syllabus Node: {currentAphorism?.category || "Philosophy"} Principle</p>
                      </div>
                    </div>

                    {/* High-yield NCH difficulty tag and exam metadata */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">
                        Exam Weightage: High
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-[#fdfbf2] text-amber-800 border border-[#ebdcb9] px-2.5 py-1 rounded-md">
                        University Core
                      </span>
                    </div>
                  </div>

                  {/* Interactive Split-Layout Container */}
                  <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#ebdcb9]">
                    
                    {/* LEFT SPLIT PANE: Original Hahnemann Text in Parchment Styling */}
                    <div className="md:col-span-6 p-6 bg-[#fdfcf9] space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                          <Book className="w-3.5 h-3.5 text-amber-700" />
                          <span>Hahnemann's Verbatim Original</span>
                        </div>

                        {/* Traditional Serif Parchment Text Area */}
                        <div className="p-5 rounded-2xl bg-[#faf7ee] border border-[#ebdcb9] relative text-[#2d2922] font-serif text-base md:text-lg leading-relaxed text-justify italic">
                          <Quote className="absolute top-2.5 right-2.5 w-10 h-10 text-amber-900/[0.03] pointer-events-none" />
                          <p className="relative z-10">
                            {highlightGlossaryTerms(currentAphorism?.versions[0]?.content || "Original standard Hahnemann text is being rendered.")}
                          </p>
                        </div>
                      </div>

                      {/* Interactive Footnotes section of the original text */}
                      {currentAphorism?.versions[0]?.footnotes && currentAphorism.versions[0].footnotes.length > 0 && (
                        <div className="pt-4 border-t border-[#ebdcb9]/40 space-y-2">
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-800 block">Verbatim Scholar Footnotes:</span>
                          <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-thin">
                            {currentAphorism.versions[0].footnotes.map(fn => (
                              <button
                                key={fn.id}
                                onClick={() => setActiveFootnoteId(activeFootnoteId === fn.id ? null : fn.id)}
                                className={`w-full text-left p-2 rounded-lg border text-[10px] leading-relaxed transition-all flex items-start gap-1.5 ${
                                  activeFootnoteId === fn.id
                                    ? 'bg-[#faf8f0] border-amber-800/50 text-[#5c401b]'
                                    : 'bg-stone-50 border-stone-100 text-stone-500 hover:bg-stone-100'
                                }`}
                              >
                                <span className="w-4 h-4 rounded bg-amber-800/15 text-amber-900 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">
                                  {fn.id}
                                </span>
                                <span className={activeFootnoteId === fn.id ? 'font-serif' : 'line-clamp-2'}>
                                  {fn.text}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* RIGHT SPLIT PANE: Commentary, Exam Notes, and Allied Application Suite */}
                    <div className="md:col-span-6 p-6 bg-white flex flex-col justify-between">
                      <div className="space-y-6">
                        {/* Tab Headers inside right desk */}
                        <div className="flex border-b border-stone-100 pb-2 overflow-x-auto gap-1 scrollbar-none">
                          {[
                            { id: 'commentary', label: 'Commentary', icon: <BookOpen className="w-3.5 h-3.5" /> },
                            { id: 'clinical', label: 'Clinical Vocation', icon: <Stethoscope className="w-3.5 h-3.5" /> },
                            { id: 'exam', label: 'Exam Booster', icon: <Award className="w-3.5 h-3.5" /> },
                            { id: 'compare', label: 'Compare Interpretations', icon: <Layers className="w-3.5 h-3.5" /> }
                          ].map(subTab => (
                            <button
                              key={subTab.id}
                              onClick={() => setDetailTab(subTab.id as any)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 ${
                                detailTab === subTab.id
                                  ? 'bg-stone-100 text-amber-800 font-bold border-b border-amber-800'
                                  : 'text-stone-400 hover:text-stone-700'
                              }`}
                            >
                              {subTab.icon}
                              {subTab.label}
                            </button>
                          ))}
                        </div>

                        {/* Interactive Tab Contents */}
                        <div className="space-y-4 text-stone-600 font-sans text-xs">
                          
                          {/* SubTab 1: Commentary */}
                          {detailTab === 'commentary' && (
                            <div className="space-y-4 animate-fadeIn">
                              <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
                                  <Lightbulb className="w-3.5 h-3.5" /> What Hahnemann Means
                                </h4>
                                <p className="leading-relaxed text-justify text-stone-700 font-medium">
                                  {getHahnemannDetailed()}
                                </p>
                              </div>

                              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                                <span className="text-[8px] font-black uppercase tracking-widest text-amber-700 block">Professor's Concise Revision Summary</span>
                                <p className="leading-relaxed text-[#2c241a] font-serif italic text-justify">
                                  "{getSimpleExplanation()}"
                                </p>
                              </div>

                              <div className="space-y-1 pb-2">
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-[#2c241a] block">Classroom Colloquial Explanation:</h4>
                                <p className="leading-relaxed text-stone-500 italic font-serif">
                                  {getConversationalExplanation()}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* SubTab 2: Clinical Application */}
                          {detailTab === 'clinical' && (
                            <div className="space-y-4 animate-fadeIn">
                              <div className="p-4 bg-[#fcfbf7] border border-[#ebdcb9] rounded-xl space-y-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1">
                                  <Activity className="w-3.5 h-3.5" />
                                  Homoeopathic Vocation Correlation
                                </span>
                                <p className="text-stone-700 leading-relaxed">
                                  {currentLecture?.clinicalRelevance || "Select remedy strictly based on the totality of symptoms without pathological bias."}
                                </p>
                              </div>

                              {/* Indian clinical story example */}
                              <div className="space-y-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Indian Clinical Scenario:</span>
                                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1 text-[11px]">
                                  <p className="text-[#2c241a] font-bold text-xs">Setting: <span className="font-normal text-stone-600">{currentLecture?.indianContextExample?.setting || "OPD Case Simulation"}</span></p>
                                  <p className="text-stone-600 italic">"{currentLecture?.indianContextExample?.scenario || "A patient presented with severe acidity aggravated by mental tension. Instead of choosing a generic mixture, the senior Homoeopath mapped their unique personal cravings."}"</p>
                                  <p className="pt-1 text-[11px] text-amber-900 font-bold border-t border-stone-200/50 mt-1">Learning: {currentLecture?.indianContextExample?.learningPoint || "Treat the individual patient, not the generic textbook diagnosis."}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SubTab 3: Exam Booster */}
                          {detailTab === 'exam' && (
                            <div className="space-y-4 animate-fadeIn">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Exam Importance</span>
                                  <p className="text-stone-700 leading-tight font-medium">{currentLecture?.examBooster?.universityImportance || "Frequently requested as a 5-mark short note question."}</p>
                                </div>
                                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Viva Voce Pointer</span>
                                  <p className="text-amber-900 leading-tight font-semibold italic">"{currentLecture?.examBooster?.vivaPoint || "Always outline exciting vs fundamental causes."}"</p>
                                </div>
                              </div>

                              <div className="p-4 bg-amber-500/5 border border-amber-600/10 rounded-xl space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 block">Examiner Expectation Key</span>
                                <p className="text-stone-700 leading-relaxed font-semibold">
                                  {currentLecture?.teachersNotes?.examinerExpectation || "Draw a schematic flow linking the dynamis balance with symptom totals."}
                                </p>
                              </div>

                              {/* Previous University Questions */}
                              <div className="space-y-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Previous Year Questions:</span>
                                <div className="space-y-1">
                                  {(currentLecture?.previousYearQuestions || [
                                    "Define the highest ideal of cure and how to adapt it. (5 Marks)",
                                    "Briefly discuss the exciting vs maintaining causes. (3 Marks)"
                                  ]).map((q, qIdx) => (
                                    <div key={qIdx} className="p-2 bg-stone-50 rounded-lg border border-stone-200/40 text-[10px] text-stone-700 italic">
                                      &bull; {q}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SubTab 4: Compare Interpretations */}
                          {detailTab === 'compare' && (
                            <div className="space-y-4 animate-fadeIn text-stone-600">
                              <p className="text-[10px] text-stone-400 italic">Compare commentaries of key stalwarts of Homoeopathic logic to build robust dynamic analytical skills.</p>
                              
                              <div className="space-y-3">
                                {/* Hahnemann */}
                                <div className="p-3 bg-[#fdfcf9] border border-amber-900/10 rounded-xl space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-amber-900 uppercase">Dr. Samuel Hahnemann (Verbatim)</span>
                                    <span className="text-[8px] uppercase font-bold text-stone-400">Classical Induction</span>
                                  </div>
                                  <p className="text-[11px] font-serif leading-relaxed text-stone-700 italic">
                                    "{getCompareInterpretations(selectedAphorismId || 1).hahnemann}"
                                  </p>
                                </div>

                                {/* Kent */}
                                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-stone-800 uppercase">Dr. James Tyler Kent (Constitutional)</span>
                                    <span className="text-[8px] uppercase font-bold text-stone-400">Spiritual Vitalism</span>
                                  </div>
                                  <p className="text-[11px] font-serif leading-relaxed text-stone-600 italic">
                                    "{getCompareInterpretations(selectedAphorismId || 1).kent}"
                                  </p>
                                </div>

                                {/* Sarkar */}
                                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-stone-800 uppercase">Dr. B.K. Sarkar (Critical Study)</span>
                                    <span className="text-[8px] uppercase font-bold text-stone-400">Baconian Inductive Science</span>
                                  </div>
                                  <p className="text-[11px] font-serif leading-relaxed text-stone-600 italic">
                                    "{getCompareInterpretations(selectedAphorismId || 1).sarkar}"
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Summary indicator */}
                      <div className="pt-4 border-t border-stone-100 text-[10px] font-semibold text-stone-400 flex items-center justify-between mt-6">
                        <span>Curiva Scholar Suite</span>
                        <span>BHMS Approved Coursework</span>
                      </div>

                      {/* Previous / Next Aphorism Navigation */}
                      <ContentNavigator 
                        className="mt-8 pt-8"
                        prev={prevAph ? { 
                          onClick: () => {
                            setSelectedAphorismId(prevAph.id);
                            document.getElementById('matrix-anchor')?.scrollIntoView({ behavior: 'smooth' });
                          },
                          title: `Aphorism §${prevAph.id}`,
                          label: 'Previous Aphorism'
                        } : null}
                        next={nextAph ? { 
                          onClick: () => {
                            setSelectedAphorismId(nextAph.id);
                            document.getElementById('matrix-anchor')?.scrollIntoView({ behavior: 'smooth' });
                          },
                          title: `Aphorism §${nextAph.id}`,
                          label: 'Next Aphorism'
                        } : null}
                      />
                    </div>

                  </div>
                </section>

              </div>
            </motion.div>
          )}

          {/* TAB: FUNDAMENTALS OF PSYCHOLOGY */}
          {activeTab === 'psychology' && (
            <motion.div 
              key="psychology-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Psychology Section Banner */}
              <section className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-4 text-center max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <Sparkles className="w-10 h-10 text-amber-800 mx-auto" />
                <h2 className="text-3xl font-serif text-[#2c241a]">Fundamentals of Psychology</h2>
                <p className="text-xs md:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
                  Mind and body form an indivisible dynamic unity in Homoeopathic therapeutics. Hahnemann's directives in Aphorisms §210–§230 mandate a deep understanding of psychological processes for accurate case taking and constitutional prescribing.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                  <span>13 Core BHMS Psychology Syllabus Topics</span>
                </div>
              </section>

              {/* Psychology Interactive Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT SIDEBAR: 13 Topics List */}
                <aside className="lg:col-span-4 bg-white rounded-3xl border border-[#ebdcb9] p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-stone-100">
                    <BookOpen className="w-4 h-4 text-amber-800" />
                    Psychology Syllabus Topics
                  </h3>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
                    {PSYCHOLOGY_TOPICS.map((topic) => {
                      const isSelected = selectedPsychologyId === topic.id;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedPsychologyId(topic.id)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#fdfbf2] border-amber-800 ring-2 ring-amber-800/10 shadow-sm'
                              : 'bg-stone-50 border-stone-100 hover:border-amber-600/30 hover:bg-white'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <h4 className={`font-bold ${isSelected ? 'text-amber-900' : 'text-[#2c241a]'}`}>
                              {topic.title}
                            </h4>
                            <p className="text-[10px] text-stone-400 font-medium truncate max-w-[220px]">
                              {topic.organonCorrelation.aphorisms}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-800 translate-x-1' : 'text-stone-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* RIGHT MAIN PANEL: Active Psychology Topic Details */}
                {(() => {
                  const activePsychology = PSYCHOLOGY_TOPICS.find(t => t.id === selectedPsychologyId) || PSYCHOLOGY_TOPICS[0];
                  return (
                    <main className="lg:col-span-8 bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                      {/* Topic Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#f3ebda]">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block mb-1">
                            {activePsychology.category}
                          </span>
                          <h3 className="text-2xl font-serif font-bold text-[#2c241a]">
                            {activePsychology.title}
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {activePsychology.organonCorrelation.aphorisms}
                        </span>
                      </div>

                      {/* Definition Box */}
                      <div className="p-5 bg-[#faf8f0] border border-[#ebdcb9] rounded-2xl space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">Formal Definition</span>
                        <p className="text-sm font-serif italic text-stone-800 leading-relaxed">
                          "{activePsychology.definition}"
                        </p>
                      </div>

                      {/* Overview */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c241a]">Academic Overview</h4>
                        <p className="text-xs text-stone-700 leading-relaxed text-justify font-sans">
                          {activePsychology.overview}
                        </p>
                      </div>

                      {/* Organon Correlation */}
                      <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                          <Book className="w-4 h-4 text-amber-800" />
                          Hahnemannian Organon Correlation ({activePsychology.organonCorrelation.aphorisms})
                        </span>
                        <p className="text-xs text-stone-700 leading-relaxed italic font-serif">
                          {activePsychology.organonCorrelation.explanation}
                        </p>
                      </div>

                      {/* Key Concepts Grid */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c241a]">Key Core Concepts</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activePsychology.keyConcepts.map((kc, idx) => (
                            <div key={idx} className="p-4 bg-[#fcfbf7] border border-[#ebdcb9] rounded-xl space-y-1.5">
                              <h5 className="text-xs font-bold text-amber-900">{kc.heading}</h5>
                              <p className="text-[11px] text-stone-600 leading-relaxed">{kc.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Clinical Relevance in Case Taking */}
                      <div className="p-5 bg-amber-500/5 border border-amber-600/15 rounded-2xl space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
                          <Stethoscope className="w-4 h-4 text-amber-800" />
                          Clinical Application in Homoeopathic Case Taking
                        </span>
                        <p className="text-xs text-stone-700 font-medium leading-relaxed">
                          {activePsychology.clinicalRelevance}
                        </p>
                      </div>

                      {/* University Exam Questions */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-800" />
                          University Exam & Viva Questions
                        </h4>
                        <div className="space-y-3">
                          {activePsychology.examQuestions.map((eq, idx) => (
                            <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  eq.type === 'LAQ' ? 'bg-amber-800 text-white' : eq.type === 'SAQ' ? 'bg-amber-100 text-amber-900' : 'bg-stone-200 text-stone-700'
                                }`}>
                                  {eq.type} {eq.marks ? `(${eq.marks} Marks)` : ''}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-[#2c241a]">{eq.question}</p>
                              <p className="text-[11px] text-stone-600 italic bg-white p-2.5 rounded-lg border border-stone-200/50">
                                <strong>Model Answer Key:</strong> {eq.answerKey}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Takeaways */}
                      <div className="p-4 bg-[#faf8f0] rounded-xl border border-[#ebdcb9] space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-900">Key Takeaways</span>
                        <ul className="space-y-1 text-xs text-stone-700">
                          {activePsychology.takeaways.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-800 font-bold">&bull;</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </main>
                  );
                })()}
              </div>
            </motion.div>
          )}

          {/* TAB: PHILOSOPHY BOOKS & STALWARTS */}
          {activeTab === 'philosophers' && (
            <motion.div 
              key="philosophers-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Philosophy Header and Sub-Tab Toggle */}
              <section className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6 text-center max-w-4xl mx-auto">
                <Book className="w-10 h-10 text-amber-800 mx-auto" />
                <h2 className="text-3xl font-serif text-[#2c241a]">Homoeopathic Philosophy & Stalwarts</h2>
                <p className="text-xs md:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
                  Cross-reference classical treatises by Kent, Stuart Close, H.A. Roberts, Carroll Dunham, and R.E. Dudgeon alongside biographies and clinical contributions of 18 monumental stalwarts.
                </p>

                {/* Sub-Tab Selector Buttons */}
                <div className="inline-flex p-1.5 bg-stone-100 rounded-2xl border border-stone-200 gap-1">
                  <button
                    onClick={() => setPhilosophySubTab('books')}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      philosophySubTab === 'books'
                        ? 'bg-amber-800 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Classic Philosophy Textbooks
                  </button>
                  <button
                    onClick={() => setPhilosophySubTab('stalwarts')}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      philosophySubTab === 'stalwarts'
                        ? 'bg-amber-800 text-white shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Homoeopathic Stalwarts ({stalwartsData.length})
                  </button>
                </div>
              </section>

              {/* SUB-VIEW A: CLASSIC PHILOSOPHY TEXTBOOKS */}
              {philosophySubTab === 'books' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Sidebar: Books Selector */}
                  <aside className="lg:col-span-4 bg-white rounded-3xl border border-[#ebdcb9] p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-stone-100">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      Classical Textbooks
                    </h3>

                    <div className="space-y-3">
                      {PHILOSOPHY_BOOKS.map((book) => {
                        const isSelected = selectedBookId === book.id;
                        return (
                          <button
                            key={book.id}
                            onClick={() => setSelectedBookId(book.id)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1 ${
                              isSelected
                                ? 'bg-[#fdfbf2] border-amber-800 ring-2 ring-amber-800/10 shadow-sm'
                                : 'bg-stone-50 border-stone-100 hover:border-amber-600/30 hover:bg-white'
                            }`}
                          >
                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-800 block">
                              {book.bhmsYear} &bull; {book.author}
                            </span>
                            <h4 className={`text-xs font-bold font-serif ${isSelected ? 'text-amber-900' : 'text-[#2c241a]'}`}>
                              {book.title}
                            </h4>
                          </button>
                        );
                      })}
                    </div>
                  </aside>

                  {/* Right Panel: Selected Book Content */}
                  {(() => {
                    const activeBook = PHILOSOPHY_BOOKS.find(b => b.id === selectedBookId) || PHILOSOPHY_BOOKS[0];
                    return (
                      <main className="lg:col-span-8 bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#f3ebda]">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block mb-1">
                              {activeBook.bhmsYear} Syllabus Textbook &bull; Published {activeBook.year}
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-[#2c241a]">
                              {activeBook.title}
                            </h3>
                            <p className="text-xs text-stone-500 font-medium italic mt-0.5">By {activeBook.author}</p>
                          </div>
                          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {activeBook.subtitle}
                          </span>
                        </div>

                        {/* Overview */}
                        <div className="p-5 bg-[#faf8f0] border border-[#ebdcb9] rounded-2xl space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">Treatise Overview</span>
                          <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                            "{activeBook.overview}"
                          </p>
                        </div>

                        {/* Key Chapters */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c241a]">Key Chapters & Organon Correlations</h4>
                          <div className="space-y-3">
                            {activeBook.keyChapters.map((ch, idx) => (
                              <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                                <div className="flex items-center justify-between border-b border-stone-200/50 pb-1.5">
                                  <span className="text-xs font-bold text-amber-900">{ch.chapterNumber}: {ch.chapterTitle}</span>
                                  <span className="text-[9px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                                    Organon: {ch.organonCorrelation}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-700 leading-relaxed">{ch.summary}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Clinical Pearls & Exam Pointers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-emerald-500/5 border border-emerald-600/15 rounded-2xl space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900 block">Clinical Pearls</span>
                            <ul className="space-y-1 text-xs text-stone-700">
                              {activeBook.clinicalPearls.map((cp, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-700 font-bold">&bull;</span>
                                  <span>{cp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 bg-amber-500/5 border border-amber-600/15 rounded-2xl space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">University Exam Pointers</span>
                            <ul className="space-y-1 text-xs text-stone-700">
                              {activeBook.examPointers.map((ep, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-amber-800 font-bold">&bull;</span>
                                  <span>{ep}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </main>
                    );
                  })()}
                </div>
              )}

              {/* SUB-VIEW B: HOMOEOPATHIC STALWARTS */}
              {philosophySubTab === 'stalwarts' && (
                <div className="space-y-6">
                  {/* Search Bar for Stalwarts */}
                  <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search stalwart by name, title, or key work..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
                      value={stalwartSearch}
                      onChange={(e) => setStalwartSearch(e.target.value)}
                    />
                  </div>

                  {/* Stalwarts Grid and Detail Modal/Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Stalwarts List */}
                    <aside className="lg:col-span-5 bg-white rounded-3xl border border-[#ebdcb9] p-6 shadow-sm space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                        <span className="text-xs font-bold text-[#2c241a] uppercase">Stalwarts Index</span>
                        <span className="text-[10px] font-bold text-amber-800">{stalwartsData.length} Masters</span>
                      </div>

                      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
                        {stalwartsData
                          .filter(s => 
                            stalwartSearch === '' || 
                            s.name.toLowerCase().includes(stalwartSearch.toLowerCase()) || 
                            s.title.toLowerCase().includes(stalwartSearch.toLowerCase())
                          )
                          .map((s) => {
                            const isSelected = selectedStalwartId === s.id;
                            return (
                              <button
                                key={s.id}
                                onClick={() => setSelectedStalwartId(s.id)}
                                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                                  isSelected
                                    ? 'bg-[#fdfbf2] border-amber-800 ring-2 ring-amber-800/10 shadow-sm'
                                    : 'bg-stone-50 border-stone-100 hover:border-amber-600/30 hover:bg-white'
                                }`}
                              >
                                <img 
                                  src={s.imageUrl} 
                                  alt={s.name} 
                                  className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="space-y-0.5 min-w-0">
                                  <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-amber-900' : 'text-[#2c241a]'}`}>
                                    {s.name}
                                  </h4>
                                  <p className="text-[10px] text-stone-500 font-medium truncate">{s.title}</p>
                                  <p className="text-[9px] text-stone-400">{s.years}</p>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </aside>

                    {/* Right Column: Selected Stalwart Profile */}
                    {(() => {
                      const activeStalwart = stalwartsData.find(s => s.id === selectedStalwartId) || stalwartsData[0];
                      return (
                        <main className="lg:col-span-7 bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#f3ebda]">
                            <img 
                              src={activeStalwart.imageUrl} 
                              alt={activeStalwart.name} 
                              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-800 shadow-md shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block">
                                {activeStalwart.years}
                              </span>
                              <h3 className="text-2xl font-serif font-bold text-[#2c241a]">
                                {activeStalwart.name}
                              </h3>
                              <p className="text-xs text-stone-600 font-semibold">{activeStalwart.title}</p>
                            </div>
                          </div>

                          {/* Quote */}
                          {activeStalwart.quote && (
                            <div className="p-4 bg-[#faf8f0] border-l-4 border-amber-800 rounded-r-xl italic font-serif text-stone-800 text-sm">
                              "{activeStalwart.quote}"
                            </div>
                          )}

                          {/* Biography */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c241a]">Biography</h4>
                            <p className="text-xs text-stone-700 leading-relaxed font-sans text-justify">
                              {activeStalwart.biography}
                            </p>
                          </div>

                          {/* Clinical Philosophy */}
                          <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 block">
                              Clinical Philosophy & Method
                            </span>
                            <p className="text-xs text-stone-700 leading-relaxed italic font-serif">
                              {activeStalwart.clinicalPhilosophy}
                            </p>
                          </div>

                          {/* Contributions */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c241a]">Key Contributions</h4>
                            <ul className="space-y-1.5 text-xs text-stone-700">
                              {activeStalwart.contributions.map((c, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-amber-800 font-bold">&bull;</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Key Works */}
                          <div className="p-4 bg-amber-500/5 border border-amber-600/15 rounded-xl space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">
                              Monumental Key Works
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {activeStalwart.keyWorks.map((kw, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[11px] font-medium text-stone-800 shadow-2xs">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </main>
                      );
                    })()}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: ACADEMIC STUDY TOOLS (Flashcards & Quizzes Dashboard) */}
          {activeTab === 'study' && (
            <motion.div 
              key="study-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Introduction header */}
              <section className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-4 text-center max-w-3xl mx-auto">
                <GraduationCap className="w-12 h-12 text-amber-800 mx-auto" />
                <h2 className="text-2xl font-serif text-[#2c241a]">Academic Retention & Study Hub</h2>
                <p className="text-xs text-stone-500 max-w-lg mx-auto leading-relaxed">
                  Homoeopathic philosophy requires active retention. Use our tactile syllabus flashcards and practice quizzes mapped directly to BHMS exam questions to test your progress.
                </p>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                
                {/* PART A: TACTILE FLASHCARDS */}
                <div className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-100">
                    <div className="space-y-1">
                      <h3 className="text-lg font-serif text-[#2c241a] flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-800" />
                        Aphorism Concept Flashcards
                      </h3>
                      <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest">Flip to test retention</p>
                    </div>

                    {/* Filter Cards by Syllabus Year */}
                    <select
                      className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 outline-none"
                      value={flashcardYear}
                      onChange={(e) => setFlashcardYear(e.target.value as any)}
                    >
                      <option value="1st">1st Year (§1–28)</option>
                      <option value="2nd">2nd Year (§29–104)</option>
                      <option value="3rd">3rd Year (§105–244)</option>
                      <option value="4th">4th Year (§245–294)</option>
                    </select>
                  </div>

                  {/* Tactile Card Interface */}
                  <div className="flex flex-col items-center space-y-6">
                    <div 
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="w-full h-80 relative cursor-pointer group perspective-1000"
                    >
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full h-full absolute rounded-3xl preserve-3d shadow-md border border-[#ebdcb9] bg-[#faf8f0]"
                      >
                        {/* Front of Card */}
                        <div className="absolute inset-0 backface-hidden p-8 flex flex-col justify-between rounded-3xl">
                          <div className="flex justify-between items-center border-b border-[#ebdcb9]/40 pb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">{currentCard.category}</span>
                            <span className="text-xs font-bold text-stone-400">Card {currentFlashcardIndex + 1} of {activeFlashcards.length}</span>
                          </div>

                          <div className="text-center space-y-4 my-auto">
                            <h4 className="text-2xl font-serif text-amber-900 font-bold">{currentCard.title}</h4>
                            <p className="text-stone-700 text-sm md:text-base leading-relaxed font-medium font-serif italic max-w-sm mx-auto">
                              "{currentCard.front}"
                            </p>
                          </div>

                          <div className="text-center text-[10px] font-black uppercase tracking-widest text-[#2c241a]/60 animate-bounce">
                            Tap Card to Reveal Answer
                          </div>
                        </div>

                        {/* Back of Card */}
                        <div className="absolute inset-0 backface-hidden p-8 flex flex-col justify-between rounded-3xl bg-[#fdfdfc] transform rotate-Y-180">
                          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 font-bold">Answer Rationale</span>
                            <span className="text-xs font-bold text-[#2c241a]">§{currentCard.id}</span>
                          </div>

                          <div className="my-auto space-y-4 overflow-y-auto max-h-[160px] pr-1">
                            <p className="text-stone-700 text-xs md:text-sm leading-relaxed text-justify font-sans font-medium">
                              {currentCard.back}
                            </p>
                            <p className="text-[11px] text-amber-900 font-bold font-serif italic border-t border-stone-100 pt-2">
                              Takeaway: {currentCard.takeaway}
                            </p>
                          </div>

                          <div className="text-center text-[10px] font-black uppercase tracking-widest text-stone-400">
                            Tap Card to Flip Back
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Progress Track and Buttons */}
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <button
                          onClick={handleMarkMastered}
                          className={`px-4 py-2 rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all border ${
                            masteredCards.includes(currentCard.id)
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {masteredCards.includes(currentCard.id) ? '✓ Mastered' : 'Mark as Mastered'}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrevCard}
                            className="p-2.5 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-all active:scale-95"
                          >
                            <ChevronLeft className="w-4 h-4 text-stone-700" />
                          </button>
                          <button
                            onClick={handleNextCard}
                            className="p-2.5 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-all active:scale-95"
                          >
                            <ChevronRight className="w-4 h-4 text-stone-700" />
                          </button>
                        </div>
                      </div>

                      {/* Card mastery tracker bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                          <span>Study Mastered Progress</span>
                          <span>{masteredCards.length} / {activeFlashcards.length} Cards</span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-amber-800 h-full transition-all duration-500 rounded-full"
                            style={{ width: `${(masteredCards.length / activeFlashcards.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PART B: INTERACTIVE UNIVERSITY PRACTICE QUIZZES */}
                <div className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-100">
                    <div className="space-y-1">
                      <h3 className="text-lg font-serif text-[#2c241a] flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-amber-800" />
                        Syllabus University Mock Exam
                      </h3>
                      <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest">Mailed from university papers</p>
                    </div>

                    <select
                      className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 outline-none"
                      value={quizYear}
                      onChange={(e) => setQuizYear(e.target.value as any)}
                    >
                      <option value="1st">1st Year Mock</option>
                      <option value="2nd">2nd Year Mock</option>
                      <option value="3rd">3rd Year Mock</option>
                      <option value="4th">4th Year Mock</option>
                    </select>
                  </div>

                  {/* Active Questions list */}
                  <div className="space-y-6 max-h-[440px] overflow-y-auto pr-2 scrollbar-thin">
                    {activeQuizQuestions.map((q, qIdx) => {
                      const selectedOpt = quizSelectedAnswers[qIdx];
                      const isCorrect = selectedOpt === q.correctIndex;

                      return (
                        <div key={qIdx} className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/50">
                          <div className="flex items-start gap-2 text-xs font-bold text-stone-800">
                            <span className="w-5 h-5 rounded bg-amber-800/10 text-amber-900 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                              {qIdx + 1}
                            </span>
                            <p>{q.question}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              let btnStyle = "bg-white border-stone-200 text-stone-700 hover:bg-stone-50";

                              if (quizSubmitted) {
                                if (oIdx === q.correctIndex) {
                                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold";
                                } else if (isSelected) {
                                  btnStyle = "bg-rose-50 border-rose-500 text-rose-800 font-semibold";
                                } else {
                                  btnStyle = "bg-white border-stone-100 text-stone-400 opacity-60";
                                }
                              } else if (isSelected) {
                                btnStyle = "bg-amber-800/10 border-amber-800 text-amber-900 font-semibold";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={quizSubmitted}
                                  onClick={() => handleSelectQuizAnswer(qIdx, oIdx)}
                                  className={`p-3 rounded-xl border text-left text-[11px] leading-snug transition-all ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {/* Instant Explanation display */}
                          {quizSubmitted && (
                            <div className="pl-7 pt-2 text-[10px] text-stone-500 italic leading-relaxed font-serif border-t border-stone-200/40">
                              <strong>Rationale:</strong> {q.rationale}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit score and restart toolbar */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                    {quizSubmitted ? (
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold text-stone-800">
                          Mock Score: <strong className="text-amber-800 text-lg">{calculateQuizScore()}</strong> / {activeQuizQuestions.length}
                        </p>
                        <button
                          onClick={() => {
                            setQuizSelectedAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-lg transition-all"
                        >
                          <RotateCw className="w-3.5 h-3.5" /> Restart
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={Object.keys(quizSelectedAnswers).length === 0}
                        className="w-full py-3 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-md shadow-amber-800/10"
                      >
                        Submit Examination Answers
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: TRANSLATOR PREFACES (Historical document translations) */}
          {activeTab === 'prefaces' && (
            <motion.div 
              key="prefaces-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <section className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block">Hahnemann's Personal Prefaces</span>
                    <h2 className="text-2xl font-serif text-[#2c241a] flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-amber-700 shrink-0" />
                      Original Edition Declarations
                    </h2>
                  </div>

                  {/* Selector dropdown for prefaces */}
                  <select
                    className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 outline-none cursor-pointer"
                    value={selectedPrefaceId}
                    onChange={(e) => setSelectedPrefaceId(e.target.value)}
                  >
                    {prefacesData.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                {/* Preface Verbatim View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Key Takeaway Box */}
                  <div className="lg:col-span-4 bg-[#faf8f0] p-6 rounded-2xl border border-[#ebdcb9] space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-900 flex items-center gap-1.5 border-b border-[#ebdcb9]/40 pb-2">
                      <Award className="w-4 h-4" /> Core Academic Milestone
                    </h3>
                    <p className="text-stone-700 font-serif italic text-sm leading-relaxed text-justify">
                      "{activePreface.keyTakeaway}"
                    </p>
                    <div className="pt-2 text-[10px] text-stone-400 font-semibold space-y-1">
                      <p>Author: <strong className="text-stone-700">{activePreface.author}</strong></p>
                      <p>Date: <strong className="text-stone-700">{activePreface.date}</strong></p>
                    </div>
                  </div>

                  {/* Main Document Texts scrollable */}
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-100">
                      Verbatim Historical Text
                    </h3>
                    <div className="space-y-4 max-h-[480px] overflow-y-auto pr-3 scrollbar-thin text-justify">
                      {activePreface.content.map((para, idx) => (
                        <p key={idx} className="font-serif italic text-stone-700 text-sm md:text-base leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 4: CHRONOLOGY & CRITICAL COMMENTARY (Historical Evolution) */}
          {activeTab === 'chronology' && (
            <motion.div 
              key="chronology-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Timeline cards */}
              <section className="space-y-6 bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm">
                <div className="pb-6 border-b border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-1">Historical Milestones</span>
                  <h2 className="text-2xl font-serif text-[#2c241a] flex items-center gap-2">
                    <History className="w-6 h-6 text-amber-700 shrink-0" />
                    Evolution of the Six Editions
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { year: "1810", title: "1st Edition", location: "Dresden/Leipzig", aphorisms: "271 Aphorisms", detail: "The birth of Homoeopathy. Introduced the title 'Organon of the Rational Art of Healing'. Focused on Similia and proving." },
                    { year: "1819", title: "2nd Edition", location: "Leipzig", aphorisms: "318 Aphorisms", detail: "Title changed to 'Organon of Medicine'. Vital force is introduced as a concept. Strong criticism of Allopathy." },
                    { year: "1824", title: "3rd Edition", location: "Köthen", aphorisms: "320 Aphorisms", detail: "Refinement of clinical methods. Emphasized the spiritual nature of disease more explicitly." },
                    { year: "1829", title: "4th Edition", location: "Köthen", aphorisms: "292 Aphorisms", detail: "The 'Miasmatic' edition. Introduced the theory of Chronic Diseases (Psora, Sycosis, Syphilis)." },
                    { year: "1833", title: "5th Edition", location: "Köthen", aphorisms: "294 Aphorisms", detail: "Final edition published by Hahnemann. Introduced the Vital Force and Doctrine of Drug Dynamization (Centesimal scale)." },
                    { year: "1842 / 1921", title: "6th Edition", location: "Paris / Seattle", aphorisms: "291 Aphorisms", detail: "The 'Posthumous' perfection. Published by Richard Haehl. Introduced the LM Scale and liquid dosing. The ultimate version." }
                  ].map((ed, idx) => (
                    <div key={idx} className="p-6 bg-stone-50 rounded-2xl border border-stone-200/50 space-y-3 hover:shadow-sm transition-all group">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-serif text-amber-900 font-bold">{ed.year}</span>
                        <span className="text-[9px] bg-amber-800/10 text-amber-900 font-black uppercase px-2 py-0.5 rounded-full">
                          {ed.aphorisms}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#2c241a]">{ed.title}</h4>
                      <p className="text-xs text-stone-500 font-semibold italic">{ed.location}</p>
                      <p className="text-xs text-stone-600 font-serif italic leading-relaxed pt-2 border-t border-stone-200/40">
                        {ed.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sarkar's Critical Study Panel Toggle */}
              <section className="bg-white rounded-3xl border border-[#ebdcb9] p-8 shadow-sm space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block">Sarkar's Critical Commentary</span>
                  <h2 className="text-2xl font-serif text-[#2c241a] flex items-center gap-2">
                    <Globe className="w-6 h-6 text-amber-700 shrink-0" />
                    Evolution of Western Therapeutics
                  </h2>
                </div>

                <p className="text-sm text-stone-600 font-serif italic leading-relaxed text-justify max-w-3xl">
                  B.K. Sarkar, one of India's preeminent Homoeopathic commentators, argues that Hahnemann's clinical methodology represents the pinnacle of Francis Bacon's Inductive Logic applied directly to physiological medicine. Learn how Hahnemann resolved the classical disputes of the Dogmatists, Empirics, and Methodists.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => setShowSarkarStudy(!showSarkarStudy)}
                    className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all shadow-md shadow-amber-800/10"
                  >
                    {showSarkarStudy ? "Collapse Western Logic Section" : "Explore Western Logic Analysis"}
                  </button>
                </div>

                <AnimatePresence>
                  {showSarkarStudy && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-6 pt-6 border-t border-stone-100"
                    >
                      {westernPhilosophyData.sections.map((sec, i) => (
                        <div key={i} className="space-y-3">
                          <h4 className="text-base font-serif font-bold text-amber-900 italic border-l-2 border-amber-800 pl-3">
                            {sec.heading}
                          </h4>
                          <div className="space-y-3 text-justify">
                            {sec.paragraphs.map((p, idx) => (
                              <p key={idx} className="font-serif italic text-stone-700 text-xs md:text-sm leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default OrganonMedicine;
