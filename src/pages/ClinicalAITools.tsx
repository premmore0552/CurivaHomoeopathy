import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Sparkles, 
  Loader2, 
  ChevronRight, 
  BookOpen, 
  Activity, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Heart, 
  Check, 
  AlertTriangle,
  Flame,
  Droplet,
  Compass,
  ArrowRight,
  RefreshCw,
  BookMarked,
  Search,
  Book,
  Scale,
  Brain,
  Award,
  Calendar,
  Zap,
  Mic,
  Smile,
  GraduationCap,
  Paperclip,
  CheckCircle,
  Copy,
  Printer,
  ChevronDown,
  Info,
  Clock,
  RotateCcw
} from 'lucide-react';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';

type ToolCategory = 'all' | 'materia-medica' | 'clinical' | 'academic' | 'exams' | 'memory' | 'premium';

interface Tool {
  id: string;
  name: string;
  category: Exclude<ToolCategory, 'all'>;
  description: string;
  icon: any;
  subTitle: string;
  badge?: string;
  placeholder?: string;
}

export default function ClinicalAITools() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolId, setSelectedToolId] = useState('materia-medica');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Custom states for export feedback
  const [copied, setCopied] = useState(false);
  const [showPrintBanner, setShowPrintBanner] = useState(false);

  // Core Tools catalogue representing all 20 standard AI tools + 5 premium features
  const tools: Tool[] = [
    // Category 1: Materia Medica & Therapeutics
    {
      id: 'materia-medica',
      name: 'AI Materia Medica Expert',
      category: 'materia-medica',
      description: 'Explain any remedy from beginner to advanced level with full clinical profiles, active miasms, and memory anchors.',
      icon: Book,
      subTitle: 'Comprehensive drug profiles & relationships',
    },
    {
      id: 'differentiation',
      name: 'AI Remedy Differentiator',
      category: 'materia-medica',
      description: 'Compare two or more homeopathic remedies side-by-side with examination outlines, keynotes, and memory hooks.',
      icon: Scale,
      subTitle: 'Differential prescription diagnostics',
    },
    {
      id: 'personality-decoder',
      name: 'AI Remedy Personality Decoder',
      category: 'materia-medica',
      description: 'Translate remedy states into real-life contemporary character portrayals, describing anxiety patterns, behaviors, and relationships.',
      icon: Smile,
      subTitle: 'Remedy psycho-dynamics & archetypes',
    },
    {
      id: 'story-generator',
      name: 'AI Materia Medica Story Generator',
      category: 'materia-medica',
      description: 'Convert remedy characteristics and modalities into engaging narratives and historical allegories for deep university recall.',
      icon: Sparkles,
      subTitle: 'Narrative and mnemonic drug memories',
    },

    // Category 2: Repertory & Clinical Cases
    {
      id: 'repertory',
      name: 'AI Repertory Assistant',
      category: 'clinical',
      description: 'Accept patients natural language complaints and translate them into formal Kent/Boericke rubrics with clinical graduation scales.',
      icon: Compass,
      subTitle: 'Symptom-to-rubric translation interface',
    },
    {
      id: 'rubric-finder',
      name: 'AI Rubric Finder',
      category: 'clinical',
      description: 'Search rubrics across chapters from physical to mind. Maps multi-level hierarchy trees and clinical interpretations.',
      icon: Search,
      subTitle: 'Boericke & Synthesis rubric dictionary',
    },
    {
      id: 'clinical-analyzer',
      name: 'AI Clinical Case Analyzer',
      category: 'clinical',
      description: 'Analyze complete multi-layered case filings. Classifies physical and mental generals, peculiar rubrics, and schedules starting potencies.',
      icon: Activity,
      subTitle: 'Full classical case synthesis',
    },
    {
      id: 'miasmatic',
      name: 'AI Miasm Analyzer',
      category: 'clinical',
      description: 'Analyze symptoms and family histories to define active Psoric, Sycotic, Syphilitic, Tubercular, or Cancerinic forces.',
      icon: Layers,
      subTitle: 'Chronic layer & suppressions examiner',
    },

    // Category 3: Academic Tutors
    {
      id: 'anatomy-tutor',
      name: 'AI Anatomy Tutor',
      category: 'academic',
      description: 'Explain complicated regional anatomy structures, complete with ascii sketches, muscle-nerve mnemonics, and viva lists.',
      icon: GraduationCap,
      subTitle: 'Exhaustive anatomical student advisor',
    },
    {
      id: 'physiology-tutor',
      name: 'AI Physiology Tutor',
      category: 'academic',
      description: 'Break down physiological mechanisms step-by-step with flowchart maps and primary homeopathic connections.',
      icon: RefreshCw,
      subTitle: 'System-based human pathways',
    },
    {
      id: 'organon-mentor',
      name: 'AI Organon Mentor',
      category: 'academic',
      description: 'Explain Dr. Samuel Hahnemanns Organon aphorisms in simple language, mapping theories to daily clinical therapeutics.',
      icon: BookMarked,
      subTitle: 'Classical homeopathic philosophy expert',
    },
    {
      id: 'research-assistant',
      name: 'AI Research Assistant',
      category: 'academic',
      description: 'Summarize clinical trials, extract findings on high-dilution science, and build citations in Harvard/APA formatting.',
      icon: Paperclip,
      subTitle: 'Academic paper summarizing engine',
    },

    // Category 4: Exam & Practice Coach
    {
      id: 'viva-examiner',
      name: 'AI Viva Examiner',
      category: 'exams',
      description: 'Take a simulated oral board exam. Receive dynamic questioning, feedback checklists, marks scoring, and pristine model solutions.',
      icon: Award,
      subTitle: 'Interactive oral exam simulator',
    },
    {
      id: 'answer-evaluator',
      name: 'AI Answer Sheet Evaluator',
      category: 'exams',
      description: 'Paste descriptive college exam essays. Receive predictive board scores, highlight omitted key terms, and get layout suggestions.',
      icon: CheckCircle2,
      subTitle: 'University BHMS essay marking bureau',
    },
    {
      id: 'quiz-generator',
      name: 'AI Quiz Generator',
      category: 'exams',
      description: 'Generate high-yield clinical MCQs, Match-the-following, and Assertion-Reason questions with exhaustive rationale panels.',
      icon: HelpCircle,
      subTitle: 'Custom dynamic exam papers',
    },
    {
      id: 'aiapget-coach',
      name: 'AI AIAPGET Coach',
      category: 'exams',
      description: 'Log and analyze mock test marks to predict competitive rank percentiles and retrieve high-impact 14-day study programs.',
      icon: Cpu,
      subTitle: 'PG Entrance predictive score advisor',
    },

    // Category 5: Routines & Memory Palaces
    {
      id: 'study-planner',
      name: 'AI Study Planner',
      category: 'memory',
      description: 'Formulate bespoke academic study plans. Integrates spaced-repetition loops and targets key clinical subjects.',
      icon: Calendar,
      subTitle: 'Spaced recall university timelines',
    },
    {
      id: 'mnemonic-generator',
      name: 'AI Mnemonic Generator',
      category: 'memory',
      description: 'Generate highly retentive memory palaces, acronyms, or Hinglish rhymes for difficult keynotes and symptoms.',
      icon: Brain,
      subTitle: 'Symptom acronym & palace builder',
    },
    {
      id: 'daily-learning-coach',
      name: 'AI Daily Learning Coach',
      category: 'memory',
      description: 'Deliver your complete morning review card: dynamic medicine spotlight, rubric, mnemonics, question, and clinical pearl.',
      icon: Clock,
      subTitle: 'Daily academic vitamin card',
    },

    // Category 6: Bonus Premium Live Sandbox Features
    {
      id: 'voice-repertorizer',
      name: 'AI Voice Repertorizer',
      category: 'premium',
      description: 'Dictate active symptoms directly. Translates spoken vocal tokens into classical repertory chapters and rubrics instantly.',
      icon: Mic,
      subTitle: 'Spoken symptom speech-to-rubric translation',
      badge: 'PREMIUM',
    },
    {
      id: 'remedy-battle',
      name: 'AI Remedy Battle Arena',
      category: 'premium',
      description: 'Gamified comparative arena. Pin two polychrest remedies against each other to evaluate thermal defenses, speeds, and mental weaponry.',
      icon: Zap,
      subTitle: 'RPG-styled Materia Medica duel',
      badge: 'GAMIFIED',
    },
    {
      id: 'guess-remedy',
      name: 'AI Guess The Remedy',
      category: 'premium',
      description: 'Clue-based diagnostic riddle simulator. Uncover progressive physical modalities to guess the correct medicine.',
      icon: Compass,
      subTitle: 'Mystery diagnostics quiz',
      badge: 'INTERACTIVE',
    },
    {
      id: 'flashcard-generator',
      name: 'AI Flashcard Generator',
      category: 'premium',
      description: 'Compile printer-friendly revision cards with key clinical symptoms on back, and remedies on front.',
      icon: CheckCircle,
      subTitle: 'Personal physical recall card stacks',
      badge: 'REVISION',
    },
    {
      id: 'case-simulation',
      name: 'AI Case Simulation Lab',
      category: 'premium',
      description: 'Generate randomized clinical patient transcripts from beginner levels to PG resident to build diagnostic composure.',
      icon: Activity,
      subTitle: 'Generative patient clinical file practice',
      badge: 'SIMULATOR',
    }
  ];

  // Global inputs state mapping for all tools dynamically
  const [inputs, setInputs] = useState({
    // Materia medica
    remedyName: '',
    level: 'Advanced Exam',

    // Differentiation
    remedyA: '',
    remedyB: '',
    clinicalContext: '',

    // Repertory
    symptoms: '',

    // Rubric finder
    plainTextQuery: '',

    // Miasmatic
    familyHistory: '',
    suppressedEruptions: '',
    pathology: '',
    mentalMiasm: 'Mild / Anxious (Psoric)',

    // Clinical analyzer
    caseText: '',

    // Viva examiner
    topic: 'Materia Medica Keynotes',
    difficulty: 'Intermediate',
    userResponseText: '',
    questionIndex: 1,

    // Answer evaluator
    questionTitle: '',
    studentAnswer: '',
    examType: 'BHMS Board Paper',

    // Quiz generator
    topicArea: 'Polychrest Remedies',
    quizDifficulty: 'AIAPGET High-Yield',
    questionType: 'MCQ (Single Match)',

    // Study planner
    weakSubjects: '',
    targetExam: 'AIAPGET PG Entrance Prep',
    weeklyHoursAvailable: '20-30',

    // Mnemonic generator
    conceptToMemorize: '',
    languagePreference: 'Hinglish (mix of Hindi & English)',

    // Personality decoder / Story
    storyNarrativeMood: 'Historical Allegory',

    // Clinical mystery
    mysteryStage: 'Stage 1 (Initial Clues)',
    mysteryPreviousDecisions: 'No prior selections',

    // AIAPGET coach
    scoresHistory: '',
    targetRank: 'Top 100 National Rank',

    // Anatomy
    anatomyTopic: '',

    // Physiology
    mechanismTopic: '',

    // Organon
    queryTermOrAphorism: '',

    // Research
    paperTopicOrAbstract: '',

    // Voice transcript
    transcriptText: '',

    // RPG battle
    fighterA: '',
    fighterB: '',

    // Guess the remedy
    guessScore: 0,
    guessLevel: 'Classic Polychrest',

    // Flashcard topic
    flashcardTopic: '',

    // Case simulation
    clinicalRank: 'House Physician'
  });

  // Keep a reference to the active tool object
  const activeTool = tools.find(t => t.id === selectedToolId) || tools[0];

  // Categorized & Searched Filter
  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle running any tool
  const handleExecuteAITool = async () => {
    setLoading(true);
    setResult(null);
    setErrorMessage(null);

    let payload: any = {};

    // Map inputs to payload based on the active tool ID
    switch (selectedToolId) {
      case 'materia-medica':
        payload = { remedyName: inputs.remedyName, level: inputs.level };
        break;
      case 'differentiation':
        payload = { remedyA: inputs.remedyA, remedyB: inputs.remedyB, clinicalContext: inputs.clinicalContext };
        break;
      case 'repertory':
        payload = { symptoms: inputs.symptoms };
        break;
      case 'rubric-finder':
        payload = { plainTextQuery: inputs.plainTextQuery };
        break;
      case 'miasmatic':
        payload = { 
          familyHistory: inputs.familyHistory, 
          suppressedEruptions: inputs.suppressedEruptions, 
          pathology: inputs.pathology, 
          mentalMiasm: inputs.mentalMiasm 
        };
        break;
      case 'clinical-analyzer':
        payload = { caseText: inputs.caseText };
        break;
      case 'viva-examiner':
        payload = { 
          topic: inputs.topic, 
          difficulty: inputs.difficulty, 
          userResponseText: inputs.userResponseText, 
          questionIndex: inputs.questionIndex 
        };
        break;
      case 'answer-evaluator':
        payload = { 
          questionTitle: inputs.questionTitle, 
          studentAnswer: inputs.studentAnswer, 
          examType: inputs.examType 
        };
        break;
      case 'quiz-generator':
        payload = { 
          topic: inputs.topicArea, 
          difficulty: inputs.quizDifficulty, 
          questionType: inputs.questionType 
        };
        break;
      case 'study-planner':
        payload = { 
          weakSubjects: inputs.weakSubjects, 
          targetExam: inputs.targetExam, 
          weeklyHoursAvailable: inputs.weeklyHoursAvailable 
        };
        break;
      case 'mnemonic-generator':
        payload = { conceptToMemorize: inputs.conceptToMemorize, languagePreference: inputs.languagePreference };
        break;
      case 'personality-decoder':
        payload = { remedyName: inputs.remedyName };
        break;
      case 'story-generator':
        payload = { remedyName: inputs.remedyName, narrativeMood: inputs.storyNarrativeMood };
        break;
      case 'clinical-mystery':
        payload = { stage: inputs.mysteryStage, previousDecisions: inputs.mysteryPreviousDecisions };
        break;
      case 'aiapget-coach':
        payload = { scoresHistory: inputs.scoresHistory, targetRank: inputs.targetRank };
        break;
      case 'anatomy-tutor':
        payload = { anatomyTopic: inputs.anatomyTopic };
        break;
      case 'physiology-tutor':
        payload = { mechanismTopic: inputs.mechanismTopic };
        break;
      case 'organon-mentor':
        payload = { queryTermOrAphorism: inputs.queryTermOrAphorism };
        break;
      case 'research-assistant':
        payload = { paperTopicOrAbstract: inputs.paperTopicOrAbstract };
        break;
      case 'daily-learning-coach':
        payload = {};
        break;
      case 'voice-repertorizer':
        payload = { transcriptText: inputs.transcriptText };
        break;
      case 'remedy-battle':
        payload = { fighterA: inputs.fighterA, fighterB: inputs.fighterB };
        break;
      case 'guess-remedy':
        payload = { score: inputs.guessScore, level: inputs.guessLevel };
        break;
      case 'flashcard-generator':
        payload = { topicName: inputs.flashcardTopic };
        break;
      case 'case-simulation':
        payload = { clinicalRank: inputs.clinicalRank };
        break;
      default:
        payload = {};
    }

    try {
      const response = await fetch('/api/gemini/professional-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: selectedToolId,
          payload: payload
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setResult(data.text);
      } else {
        throw new Error(data.error || 'The medical proxy failed to synthesize logic layers.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Connection timeout or compilation failed. Try resetting study parameters.');
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill inputs when changing tools for frictionless demo
  useEffect(() => {
    setResult(null);
    setErrorMessage(null);
    
    // Autofills popular defaults to save student typing
    if (selectedToolId === 'materia-medica' && !inputs.remedyName) {
      setInputs(p => ({ ...p, remedyName: 'Pulsatilla Pratensis' }));
    } else if (selectedToolId === 'differentiation' && !inputs.remedyA) {
      setInputs(p => ({ ...p, remedyA: 'Lycopodium Clavatum', remedyB: 'Sulphur', clinicalContext: 'Right-sided digestive tract complaints, aggravated 4-8 PM, craving warm sweets.' }));
    } else if (selectedToolId === 'repertory' && !inputs.symptoms) {
      setInputs(p => ({ ...p, symptoms: 'Intense neuralgic headache originating from occiput spreading forwards to seal over right eye, aggravated at sunset, loves cold fresh air.' }));
    } else if (selectedToolId === 'rubric-finder' && !inputs.plainTextQuery) {
      setInputs(p => ({ ...p, plainTextQuery: 'fear of public speaking or crowds' }));
    } else if (selectedToolId === 'clinical-analyzer' && !inputs.caseText) {
      setInputs(p => ({ ...p, caseText: 'Male, 42. Severe dry midnight cough, must sit up in bed, crying as though suffocating. Desires cold water but drinks in tiny sips. Very anxious, pacing chamber continuously. Family history of bronchial asthma and tuberculosis.' }));
    } else if (selectedToolId === 'anatomy-tutor' && !inputs.anatomyTopic) {
      setInputs(p => ({ ...p, anatomyTopic: 'Triangles of the Neck (Anterior versus Posterior)' }));
    } else if (selectedToolId === 'physiology-tutor' && !inputs.mechanismTopic) {
      setInputs(p => ({ ...p, mechanismTopic: 'Renin-Angiotensin-Aldosterone System (RAAS)' }));
    } else if (selectedToolId === 'organon-mentor' && !inputs.queryTermOrAphorism) {
      setInputs(p => ({ ...p, queryTermOrAphorism: 'Aphorism 26 - Therapeutic Law of Nature' }));
    } else if (selectedToolId === 'mnemonic-generator' && !inputs.conceptToMemorize) {
      setInputs(p => ({ ...p, conceptToMemorize: 'Nux Vomica 3 core keynotes: Sedentary, oversensitive, ineffective urging for stool.' }));
    } else if (selectedToolId === 'personality-decoder' && !inputs.remedyName) {
      setInputs(p => ({ ...p, remedyName: 'Arsenicum Album' }));
    } else if (selectedToolId === 'story-generator' && !inputs.remedyName) {
      setInputs(p => ({ ...p, remedyName: 'Silicea (The Glass Fortress)' }));
    } else if (selectedToolId === 'remedy-battle' && !inputs.fighterA) {
      setInputs(p => ({ ...p, fighterA: 'Aconitum Napellus', fighterB: 'Gelsemium Sempervirens' }));
    } else if (selectedToolId === 'flashcard-generator' && !inputs.flashcardTopic) {
      setInputs(p => ({ ...p, flashcardTopic: 'Sulfide Family Remedies (Hepar Sulph, Calc Sulph)' }));
    }
  }, [selectedToolId]);

  // Export functions
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    setShowPrintBanner(true);
    try {
      window.print();
    } catch (err) {
      console.warn("Direct print failed, fallback message active:", err);
    }
  };

  // Reset inputs helper
  const handleFullReset = () => {
    setResult(null);
    setErrorMessage(null);
    setInputs({
      remedyName: '',
      level: 'Advanced Exam',
      remedyA: '',
      remedyB: '',
      clinicalContext: '',
      symptoms: '',
      plainTextQuery: '',
      familyHistory: '',
      suppressedEruptions: '',
      pathology: '',
      mentalMiasm: 'Mild / Anxious (Psoric)',
      caseText: '',
      topic: 'Materia Medica Keynotes',
      difficulty: 'Intermediate',
      userResponseText: '',
      questionIndex: 1,
      questionTitle: '',
      studentAnswer: '',
      examType: 'BHMS Board Paper',
      topicArea: 'Polychrest Remedies',
      quizDifficulty: 'AIAPGET High-Yield',
      questionType: 'MCQ (Single Match)',
      weakSubjects: '',
      targetExam: 'AIAPGET PG Entrance Prep',
      weeklyHoursAvailable: '20-30',
      conceptToMemorize: '',
      languagePreference: 'Hinglish (mix of Hindi & English)',
      storyNarrativeMood: 'Historical Allegory',
      mysteryStage: 'Stage 1 (Initial Clues)',
      mysteryPreviousDecisions: 'No prior selections',
      scoresHistory: '',
      targetRank: 'Top 100 National Rank',
      anatomyTopic: '',
      mechanismTopic: '',
      queryTermOrAphorism: '',
      paperTopicOrAbstract: '',
      transcriptText: '',
      fighterA: '',
      fighterB: '',
      guessScore: 0,
      guessLevel: 'Classic Polychrest',
      flashcardTopic: '',
      clinicalRank: 'House Physician'
    });
  };

  // Mock voice detection transcriber for interactive feel
  const handleMockDictation = () => {
    setInputs(p => ({
      ...p,
      transcriptText: "Patient mentions deep burning pains in stomach relieved by warm milk, hates cold draughts on body, very restless and tidy."
    }));
  };

  const categories = [
    { id: 'all', label: 'All AI Tools' },
    { id: 'materia-medica', label: 'Materia Medica' },
    { id: 'clinical', label: 'Clinical & Repertory' },
    { id: 'academic', label: 'Academic Tutors' },
    { id: 'exams', label: 'Exams & Viva' },
    { id: 'memory', label: 'Memory & Planners' },
    { id: 'premium', label: 'Bonus Premium' }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-8 pb-32 font-sans text-[#2c3e50] selection:bg-[#c5a059]/20 selection:text-primary">
      <SEO 
        title="AI Medical Tutors & Suite | Curiva Homoeopathy"
        description="Unified medical-education intelligence suite for BHMS study and AIAPGET preparations. Access Materia Medica storytellers, mnemonic generators, clinical simulators, and Organon mentors."
      />

      <div className="max-w-7xl mx-auto px-4 mt-4 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#c5a059]/10 rounded-2xl text-[#c5a059] border border-[#c5a059]/20 shadow-inner">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest uppercase bg-[#c5a059]/10 text-primary px-2 py-0.5 rounded border border-[#c5a059]/20">ACADEMIC MULTI-ENGINE</span>
                <span className="text-[9px] font-bold tracking-wider text-green-700 uppercase bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">BHMS STALWART APPROVED</span>
              </div>
              <h1 className="text-3xl font-display font-semibold text-primary tracking-tight mt-1">AI Professional &amp; Tutor Suite</h1>
              <p className="text-xs text-text-tertiary">Standalone clinical assistants and high-yield learning accelerators tailored for classical study and competitive PG entrance exams</p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link to="/" className="text-xs bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-xl transition-all font-bold shadow-soft flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Return home
            </Link>
          </div>
        </div>

        {/* System Disclaimer Panel */}
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex gap-3 text-amber-950 text-xs leading-relaxed">
          <Info className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <span className="font-bold block text-primary font-display mb-0.5">Educational Medical Simulator Disclaimer</span>
            This AI assistant maps classical remedies, historic aphorisms, and physiological pathways based on homeopathic compilations (Hering, Boericke, Kent, Allen Keynotes). These simulation blocks are optimized for **BHMS medical students, interns, researchers, and AIAPGET aspirants**. No real-world chemical prescriptions or clinical advice should be formulated outside of formal licensed specialist evaluations. Includes full output exporters.
          </div>
        </div>

        {/* Directory Filters & Search */}
        <div className="bg-white border border-[#eae6df] rounded-2xl p-4 shadow-soft space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center bg-[#faf8f5] border border-gray-200 rounded-xl px-3.5 py-2.5 w-full lg:max-w-md">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search across all 25 clinical AI modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-xs w-full focus:outline-none focus:ring-0 placeholder-gray-400 font-medium text-gray-800"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-gray-400 hover:text-gray-800">Clear</button>
              )}
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ToolCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    activeCategory === cat.id 
                      ? 'bg-primary text-white border-primary shadow-soft' 
                      : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Interactive Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Complete Catalogue list (col-span-4) */}
          <div className="lg:col-span-4 space-y-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">Active Catalog ({filteredTools.length})</span>
              <button 
                onClick={handleFullReset}
                className="text-[10px] text-gray-500 hover:text-primary font-bold flex items-center gap-1 uppercase"
              >
                <RefreshCw className="w-3 h-3" /> Reset all
              </button>
            </div>

            <div className="space-y-2">
              {filteredTools.map((tool) => {
                const ToolIcon = tool.icon;
                const isSelected = tool.id === selectedToolId;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedToolId(tool.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all relative overflow-hidden flex gap-3 ${
                      isSelected 
                        ? 'bg-white border-[#c5a059] shadow-soft ring-1 ring-[#c5a059]/40' 
                        : 'bg-white hover:bg-gray-50/50 border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 flex items-center justify-center ${
                      isSelected ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <ToolIcon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-gray-800 truncate block">{tool.name}</span>
                        {tool.badge && (
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                            tool.badge === 'PREMIUM' ? 'bg-[#c5a059]/10 text-primary border border-primary/20' : 'bg-blue-50 text-blue-800'
                          }`}>
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#2c402e] font-display block select-none">{tool.subTitle}</span>
                      <p className="text-[10px] text-gray-500 leading-snug line-clamp-2 select-none">{tool.description}</p>
                    </div>

                    <ChevronRight className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${
                      isSelected ? 'text-primary transform translate-x-0.5' : 'text-gray-300'
                    }`} />
                  </button>
                );
              })}

              {filteredTools.length === 0 && (
                <div className="p-8 text-center bg-white border border-dashed border-gray-200 rounded-2xl">
                  <p className="text-xs text-gray-500 font-bold">No clinical AI tool matches your search</p>
                  <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="text-xs text-primary underline mt-2 font-bold cursor-pointer">View full directory</button>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE: Active Config & Input Form + Output Block (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Tool Header and Settings Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-soft space-y-6">
              
              <div className="border-b border-gray-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
                    {React.createElement(activeTool.icon, { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-primary">{activeTool.name}</h2>
                    <p className="text-xs text-text-tertiary font-medium">{activeTool.description}</p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-1 bg-[#2c402e]/10 text-[#213524] rounded-full border border-[#2c402e]/20">Active Engine</span>
                </div>
              </div>

              {/* Dynamic Form Generation depending on the selectedToolId */}
              <div className="space-y-4">
                
                {selectedToolId === 'materia-medica' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Remedy Name</label>
                      <input 
                        type="text" 
                        value={inputs.remedyName} 
                        onChange={(e) => setInputs(prev => ({ ...prev, remedyName: e.target.value }))}
                        placeholder="e.g., Lycopodium Clavatum, Pulsatilla"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Depth Level</label>
                      <select 
                        value={inputs.level} 
                        onChange={(e) => setInputs(prev => ({ ...prev, level: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="Beginner Theory">Beginner Theory (Basic keynotes)</option>
                        <option value="Junior Clinical">Junior Clinical (Modality layers)</option>
                        <option value="Advanced Exam">Advanced Exam (Differentiations, Viva prep)</option>
                        <option value="AIAPGET High-Yield">AIAPGET competitive PG outline</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedToolId === 'differentiation' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Candidate Remedy A</label>
                        <input 
                          type="text" 
                          value={inputs.remedyA} 
                          onChange={(e) => setInputs(prev => ({ ...prev, remedyA: e.target.value }))}
                          placeholder="e.g., Lycopodium"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Candidate Remedy B</label>
                        <input 
                          type="text" 
                          value={inputs.remedyB} 
                          onChange={(e) => setInputs(prev => ({ ...prev, remedyB: e.target.value }))}
                          placeholder="e.g., Lachesis"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Clinical Context / Patient Modality Conflict (Optional)</label>
                      <textarea
                        value={inputs.clinicalContext}
                        onChange={(e) => setInputs(prev => ({ ...prev, clinicalContext: e.target.value }))}
                        placeholder="e.g., Throat aggravation after sleep, dry raw cough. Which remedy applies best?"
                        className="w-full h-20 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                )}

                {selectedToolId === 'repertory' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Patient Raw Natural Language Symptoms</label>
                    <textarea
                      value={inputs.symptoms}
                      onChange={(e) => setInputs(prev => ({ ...prev, symptoms: e.target.value }))}
                      placeholder="e.g., Throbbing right-sided headache, relieved by hard pressure and completely worse at sunset..."
                      className="w-full h-24 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'rubric-finder' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Symptom Query (Boericke &amp; Kent index)</label>
                    <input 
                      type="text" 
                      value={inputs.plainTextQuery}
                      onChange={(e) => setInputs(prev => ({ ...prev, plainTextQuery: e.target.value }))}
                      placeholder="e.g., anxiety about exams, fear of public speaking..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'miasmatic' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Genetic History</label>
                        <input 
                          type="text" 
                          value={inputs.familyHistory}
                          onChange={(e) => setInputs(prev => ({ ...prev, familyHistory: e.target.value }))}
                          placeholder="Family history of cancer, chronic skin rashes, asthma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Suppressed Skin Conditions / Eruptions</label>
                        <input 
                          type="text" 
                          value={inputs.suppressedEruptions}
                          onChange={(e) => setInputs(prev => ({ ...prev, suppressedEruptions: e.target.value }))}
                          placeholder="e.g., Cortisone applied on chronic eczema"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Active Pathology (Structural defects)</label>
                        <input 
                          type="text" 
                          value={inputs.pathology}
                          onChange={(e) => setInputs(prev => ({ ...prev, pathology: e.target.value }))}
                          placeholder="e.g., hard fibroid tumors, warts"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Mental Miasm Axis</label>
                        <select
                          value={inputs.mentalMiasm}
                          onChange={(e) => setInputs(prev => ({ ...prev, mentalMiasm: e.target.value }))}
                          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="Mild / Anxious (Psoric)">Psoric (mild, functional, hopeful, anxious)</option>
                          <option value="Suspicious / Fixed (Sycotic)">Sycotic (suspicious, secretive, fixed ideas)</option>
                          <option value="Hopeless / Destructive (Syphilitic)">Syphilitic (destructive, bone pains, nighttime ulcers)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {selectedToolId === 'clinical-analyzer' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Full Patient Case File / Detailed Intake Notes</label>
                    <textarea
                      value={inputs.caseText}
                      onChange={(e) => setInputs(prev => ({ ...prev, caseText: e.target.value }))}
                      placeholder="Paste patient raw verbal logs, physical observations, cravings, modal timeline, and inherited chronic ailments..."
                      className="w-full h-32 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'viva-examiner' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Oral Viva Topic</label>
                        <input 
                          type="text" 
                          value={inputs.topic}
                          onChange={(e) => setInputs(prev => ({ ...prev, topic: e.target.value }))}
                          placeholder="e.g., Snake remedies, Aphorisms 26-50"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Difficulty</label>
                        <select 
                          value={inputs.difficulty}
                          onChange={(e) => setInputs(prev => ({ ...prev, difficulty: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                        >
                          <option value="Undergraduate (BHMS)">Undergraduate (BHMS Basic)</option>
                          <option value="Intermediate">Intermediate (Polychrest depths)</option>
                          <option value="PG Resident / AIAPGET">PG Resident / Competitive</option>
                        </select>
                      </div>
                    </div>
                    {result && (
                      <div className="space-y-1.5 border-t border-gray-100 pt-3">
                        <label className="text-xs font-black uppercase text-[#2c402e] tracking-wider block">Provide Your Response to Examiner</label>
                        <textarea
                          value={inputs.userResponseText}
                          onChange={(e) => setInputs(prev => ({ ...prev, userResponseText: e.target.value }))}
                          placeholder="Type your BHMS oral viva answer here. Submit to receive marks and the next question..."
                          className="w-full h-20 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50 font-mono"
                        />
                      </div>
                    )}
                  </div>
                )}

                {selectedToolId === 'answer-evaluator' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Question Title / Topic</label>
                        <input 
                          type="text" 
                          value={inputs.questionTitle}
                          onChange={(e) => setInputs(prev => ({ ...prev, questionTitle: e.target.value }))}
                          placeholder="Write long essay question, e.g., Discuss Lycopodium under headings: Synonyms, Constitution, Particulars..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Target Exam</label>
                        <select 
                          value={inputs.examType}
                          onChange={(e) => setInputs(prev => ({ ...prev, examType: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                        >
                          <option value="BHMS University Board Theory">BHMS University Theory Paper</option>
                          <option value="Classroom 10-Mark Answer">Classroom Quiz (10 Marks)</option>
                          <option value="AIAPGET Competitive Subject Mock">AIAPGET subjective validation</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Student's Submitted Answer Script</label>
                      <textarea
                        value={inputs.studentAnswer}
                        onChange={(e) => setInputs(prev => ({ ...prev, studentAnswer: e.target.value }))}
                        placeholder="Paste your drafted notes or university answers here. Returns score matrix, missing keynotes, and presentation outline."
                        className="w-full h-36 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50 font-medium"
                      />
                    </div>
                  </div>
                )}

                {selectedToolId === 'quiz-generator' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Topic Area</label>
                      <input 
                        type="text" 
                        value={inputs.topicArea}
                        onChange={(e) => setInputs(prev => ({ ...prev, topicArea: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Difficulty</label>
                      <select 
                        value={inputs.quizDifficulty}
                        onChange={(e) => setInputs(prev => ({ ...prev, quizDifficulty: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="Undergraduate (BHMS)">BHMS Undergraduate level</option>
                        <option value="AIAPGET High-Yield">AIAPGET competitive PG level</option>
                        <option value="Pro Master Practitioner">Stalwart / Resident Level</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Question Style</label>
                      <select 
                        value={inputs.questionType}
                        onChange={(e) => setInputs(prev => ({ ...prev, questionType: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="MCQ (Single Match)">Core MCQs with options</option>
                        <option value="Assertion-Reason">Assertion-Reason format</option>
                        <option value="Clinical Case Riddles">Patient diagnosis riddles</option>
                        <option value="Match-the-Following">Match-the-Following grids</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedToolId === 'study-planner' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Weak Subjects / Topics</label>
                        <input 
                          type="text" 
                          value={inputs.weakSubjects}
                          onChange={(e) => setInputs(prev => ({ ...prev, weakSubjects: e.target.value }))}
                          placeholder="e.g., Miasm transitions, Kent mathematical numbers"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-primary tracking-wider block">Target Graduation / Goal</label>
                        <input 
                          type="text" 
                          value={inputs.targetExam}
                          onChange={(e) => setInputs(prev => ({ ...prev, targetExam: e.target.value }))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block font-bold leading-tight">Weekly Hours Committable</label>
                      <select
                        value={inputs.weeklyHoursAvailable}
                        onChange={(e) => setInputs(prev => ({ ...prev, weeklyHoursAvailable: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-xl text-xs bg-gray-50 font-bold focus:outline-none"
                      >
                        <option value="5-10">5-10 Hours (Casual revision)</option>
                        <option value="10-20">10-20 Hours (Moderate BHMS review)</option>
                        <option value="20-30">20-30 Hours (Aggressive competitive prep)</option>
                        <option value="30+">30+ Hours (AIAPGET Rank Master track)</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedToolId === 'mnemonic-generator' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Concept / Symptom to Memorize</label>
                      <input 
                        type="text" 
                        value={inputs.conceptToMemorize}
                        onChange={(e) => setInputs(prev => ({ ...prev, conceptToMemorize: e.target.value }))}
                        placeholder="e.g., Gelsemium 3 Ds (Drowsiness, Dullness, Dizziness)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Language preference</label>
                      <select 
                        value={inputs.languagePreference}
                        onChange={(e) => setInputs(prev => ({ ...prev, languagePreference: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="English">English</option>
                        <option value="Hinglish (mix of Hindi &amp; English)">Hinglish (Acronym rhymes in Devnagri phonology)</option>
                        <option value="Hindi">Hindi (Pure Sanskrit-based sutras)</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedToolId === 'personality-decoder' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Remedy Name to Profile</label>
                    <input 
                      type="text" 
                      value={inputs.remedyName} 
                      onChange={(e) => setInputs(prev => ({ ...prev, remedyName: e.target.value }))}
                      placeholder="e.g., Lachesis, Nux Vomica, Pulsatilla"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'story-generator' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Remedy Name to Story</label>
                      <input 
                        type="text" 
                        value={inputs.remedyName} 
                        onChange={(e) => setInputs(prev => ({ ...prev, remedyName: e.target.value }))}
                        placeholder="e.g., Natrum Muriaticum, Silicea"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Narrative Mood</label>
                      <select 
                        value={inputs.storyNarrativeMood}
                        onChange={(e) => setInputs(prev => ({ ...prev, storyNarrativeMood: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="Historical Allegory">Historical Allegory (19th-century clinical setting)</option>
                        <option value="Adventure Quest">Adventure Quest (RPG journey representing path affinities)</option>
                        <option value="Modern Life Story">Modern Contemporary Life (Real cafe settings)</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedToolId === 'clinical-mystery' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Current Stage</label>
                      <select 
                        value={inputs.mysteryStage}
                        onChange={(e) => setInputs(prev => ({ ...prev, mysteryStage: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="Stage 1 (Initial Clues)">Stage 1: Basic Physical General Modalities</option>
                        <option value="Stage 2 (Mental Keynotes)">Stage 2: Adding Mental disposition</option>
                        <option value="Stage 3 (Complete Diagnostic Rubric)">Stage 3: High resolution family reports</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Record Patient Selections</label>
                      <input 
                        type="text" 
                        value={inputs.mysteryPreviousDecisions}
                        onChange={(e) => setInputs(prev => ({ ...prev, mysteryPreviousDecisions: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                )}

                {selectedToolId === 'aiapget-coach' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Mock Test Score History &amp; Gaps</label>
                      <input 
                        type="text" 
                        value={inputs.scoresHistory}
                        onChange={(e) => setInputs(prev => ({ ...prev, scoresHistory: e.target.value }))}
                        placeholder="e.g., getting 70/120 in mock 1, struggling with organon aphorisms"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Target National Ranking Rank</label>
                      <input 
                        type="text" 
                        value={inputs.targetRank}
                        onChange={(e) => setInputs(prev => ({ ...prev, targetRank: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                )}

                {selectedToolId === 'anatomy-tutor' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Anatomy Region / System Topic</label>
                    <input 
                      type="text" 
                      value={inputs.anatomyTopic} 
                      onChange={(e) => setInputs(prev => ({ ...prev, anatomyTopic: e.target.value }))}
                      placeholder="e.g., Sciatic Nerve pathway, Musculocutaneous insertion..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'physiology-tutor' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Physiologic Loop / Biochemistry Pathway</label>
                    <input 
                      type="text" 
                      value={inputs.mechanismTopic} 
                      onChange={(e) => setInputs(prev => ({ ...prev, mechanismTopic: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'organon-mentor' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Search aphorism number or keyword (Hahnemann's standard)</label>
                    <input 
                      type="text" 
                      value={inputs.queryTermOrAphorism} 
                      onChange={(e) => setInputs(prev => ({ ...prev, queryTermOrAphorism: e.target.value }))}
                      placeholder="e.g., Aphorism 153 details, vital force, drug dynamization..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {selectedToolId === 'research-assistant' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Research Topic / Abstract or Thesis Summary</label>
                    <textarea
                      value={inputs.paperTopicOrAbstract}
                      onChange={(e) => setInputs(prev => ({ ...prev, paperTopicOrAbstract: e.target.value }))}
                      placeholder="Describe high-dilution science, trials of Oscillococcinum, or in-vitro tests on Arsenic oxide..."
                      className="w-full h-20 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {/* PREMIUM VOICE REPERTORIZER */}
                {selectedToolId === 'voice-repertorizer' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between text-xs text-primary font-bold">
                      <span className="flex items-center gap-1.5"><Mic className="w-4 h-4 text-accent animate-pulse" /> Spoken symptoms voice transcript simulated pipeline.</span>
                      <button 
                        onClick={handleMockDictation} 
                        className="px-2.5 py-1 bg-[#c5a059] text-white rounded hover:bg-[#b08e4d] font-bold cursor-pointer uppercase text-[10px]"
                      >
                        Simulate spoken voice
                      </button>
                    </div>
                    <textarea
                      value={inputs.transcriptText}
                      onChange={(e) => setInputs(prev => ({ ...prev, transcriptText: e.target.value }))}
                      placeholder="Symptoms transcript will accumulate here..."
                      className="w-full h-24 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {/* PREMIUM BATTLE */}
                {selectedToolId === 'remedy-battle' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Fighter A (Medicine 1)</label>
                      <input 
                        type="text" 
                        value={inputs.fighterA} 
                        onChange={(e) => setInputs(prev => ({ ...prev, fighterA: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Fighter B (Medicine 2)</label>
                      <input 
                        type="text" 
                        value={inputs.fighterB} 
                        onChange={(e) => setInputs(prev => ({ ...prev, fighterB: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                )}

                {/* PREMIUM GUESS REMEDY */}
                {selectedToolId === 'guess-remedy' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Riddle Difficulty level</label>
                      <select 
                        value={inputs.guessLevel}
                        onChange={(e) => setInputs(prev => ({ ...prev, guessLevel: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                      >
                        <option value="Classic Polychrest">Classic Polychrest (Standard Allen keynotes)</option>
                        <option value="Rare Herbals">Rare Herbals (Boericke Therapeutics indices)</option>
                        <option value="Sarcodes &amp; Nosodes">Nosodes &amp; Sarcodes family challenges</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-primary tracking-wider block">Current Score Streak</label>
                      <input 
                        type="number" 
                        value={inputs.guessScore} 
                        onChange={(e) => setInputs(prev => ({ ...prev, guessScore: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                      />
                    </div>
                  </div>
                )}

                {/* PREMIUM FLASHCARD GENERATOR */}
                {selectedToolId === 'flashcard-generator' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Flashcard Stack Topic</label>
                    <input 
                      type="text" 
                      value={inputs.flashcardTopic} 
                      onChange={(e) => setInputs(prev => ({ ...prev, flashcardTopic: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none bg-gray-50"
                    />
                  </div>
                )}

                {/* PREMIUM CASE SIMULATION */}
                {selectedToolId === 'case-simulation' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-primary tracking-wider block">Clinical Resident Rank Level</label>
                    <select 
                      value={inputs.clinicalRank}
                      onChange={(e) => setInputs(prev => ({ ...prev, clinicalRank: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-primary bg-gray-50 focus:outline-none"
                    >
                      <option value="UG Clerkship">Undergraduate Clerkship (Polychrest single layer cases)</option>
                      <option value="House Physician">House Physician (Active suppressed skin layer cases)</option>
                      <option value="Senior Registry Consultant">Senior Registry Consultant (Rare complex multiple miasms cases)</option>
                    </select>
                  </div>
                )}

                {/* Launch Button Trigger */}
                <button
                  onClick={handleExecuteAITool}
                  disabled={loading}
                  className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Compiling clinical archives...
                    </>
                  ) : (
                    <>
                      Execute simulated protocol <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </div>

            </div>

            {/* RESULTS OUTPUT DISPLAY */}
            <div id="print-section" className="bg-white border border-[#eae6df] rounded-[2.5rem] p-8 shadow-soft min-h-[500px] flex flex-col relative overflow-hidden printable-area">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.03)_0%,transparent_70%)] pointer-events-none animate-pulse" />

              {/* Toolbar Actions Row */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 relative z-10 no-print">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 animate-ping" />
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">
                    {activeTool.name} Synthesis Screen
                  </h4>
                </div>
                
                {/* Print and Export Actions */}
                {result && !loading && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCopy}
                      className="p-1 px-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button 
                      onClick={handlePrint}
                      className="p-1 px-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Card
                    </button>
                  </div>
                )}
                {!result && (
                  <span className="text-[10px] text-gray-400 font-mono">STANDALONE MODULE</span>
                )}
              </div>

              {showPrintBanner && (
                <div className="no-print bg-primary-light/50 border border-primary/20 rounded-xl p-3 mb-4 text-[11px] text-primary flex items-center justify-between gap-3 animate-fade-in unique-print-banner">
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>Printing Tip:</strong> For the most pristine result, use the <strong>New Tab</strong> button at the top-right of the preview window to print this card perfectly without iframe container restrictions!
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowPrintBanner(false)}
                    className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Code output window */}
              <div className="flex-grow flex flex-col justify-between">
                
                {loading && (
                  <div className="flex-grow flex flex-col items-center justify-center space-y-4 py-20 min-h-[400px]">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <div className="text-center space-y-1">
                      <span className="text-xs font-bold text-primary block uppercase tracking-widest animate-pulse">Running advanced AI reasoning</span>
                      <p className="text-[11px] text-text-tertiary italic max-w-sm ml-auto mr-auto">Analyzing Materia Medica databases, synthesizing patient rubrics, and constructing high-yield revision flashcards...</p>
                    </div>
                  </div>
                )}

                {!loading && !result && !errorMessage && (
                  <div className="flex-grow flex flex-col items-center justify-center space-y-5 text-center py-20 min-h-[400px]">
                    <Book className="w-14 h-14 text-gray-300 stroke-1" />
                    <div className="space-y-2 max-w-md">
                      <span className="text-xs font-black uppercase tracking-wider text-primary">No learning notes compiled yet</span>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Choose your target clinical AI advisor or tutor on the left, customize your inputs (or use the populated high-yield default templates), and run the simulator to evaluate the results. Supported by copy/print exporters.
                      </p>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-5 bg-red-50 border border-red-200 text-red-950 rounded-2xl flex gap-3 text-xs leading-relaxed">
                    <span className="text-lg leading-none shrink-0">⚠️</span>
                    <div>
                      <span className="font-bold block mb-0.5">Simulated reasoning layer fault</span>
                      {errorMessage}
                    </div>
                  </div>
                )}

                {/* Render compiled medical markdown findings */}
                {!loading && result && (
                  <div id="print-section" className="printable-area prose prose-slate max-w-none text-xs md:text-sm text-gray-700 leading-relaxed space-y-5 block animate-fadeIn">
                    <div className="markdown-body bg-[#faf8f5]/40 border border-gray-100 p-6 rounded-2xl shadow-inner mb-4 overflow-x-auto select-text">
                      <ReactMarkdown
                        components={{
                          a: ({node, ...props}) => {
                            const isInternal = props.href?.startsWith('/');
                            if (isInternal) {
                              return (
                                <Link 
                                  to={props.href || '/'} 
                                  className="text-primary hover:text-accent font-bold underline transition-colors"
                                >
                                  {props.children}
                                </Link>
                              );
                            }
                            return (
                              <a 
                                {...props} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-primary hover:text-accent font-bold underline transition-colors"
                              />
                            );
                          }
                        }}
                      >
                        {result}
                      </ReactMarkdown>
                    </div>
                    
                    <div className="border-t border-dashed border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-gray-400 font-mono">
                      <span>Security: Educational Sandbox Context</span>
                      <span>Synthesis Stamp: {new Date().toLocaleTimeString()} (UTC-7)</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
