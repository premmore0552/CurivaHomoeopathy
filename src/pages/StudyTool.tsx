import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, 
  Star, GraduationCap, Crown, Target, Layers, ExternalLink,
  BookOpen, Compass, Award, Activity, Flame, Thermometer, Dna, Check, HelpCircle,
  Sliders, ArrowRight, Play, CheckCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { comparisonRemedies } from '../data/comparisonData';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { auth } from '../lib/firebase';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  remedy: string;
  remedyId?: string;
  category: 'Keynote' | 'Thermal' | 'Origin' | 'Modality' | 'Scenario' | 'Difference';
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
}

interface PerformanceData {
  correct: number;
  total: number;
  lastDifficulty: string;
}

const StudyTool: React.FC = () => {
  const navigate = useNavigate();
  
  // Setup & Configuration state
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Advanced' | 'Expert'>('Beginner');
  const [studyMode, setStudyMode] = useState<'quiz' | 'flashcard'>('quiz');

  // Interactive Game/Study States
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [performance, setPerformance] = useState<Record<string, PerformanceData>>({});
  const [sessionResults, setSessionResults] = useState<{ remedyId: string, correct: boolean }[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);
  const [lastChoice, setLastChoice] = useState<'correct' | 'incorrect' | null>(null);

  // Dynamic MCQ Option selections
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Load user statistics on mount if logged in
  useEffect(() => {
    const loadStats = async () => {
      if (auth.currentUser) {
        const profile = await userService.getProfile(auth.currentUser.uid);
        if (profile?.studyStats) {
          const stats: Record<string, PerformanceData> = {};
          Object.entries(profile.studyStats).forEach(([id, data]) => {
            stats[id] = {
              correct: data.correct,
              total: data.total,
              lastDifficulty: data.lastDifficulty
            };
          });
          setPerformance(stats);
        }
      }
    };
    loadStats();
  }, []);

  // Whenever cards change or we move to a new index, populate the MCQ quiz choices
  useEffect(() => {
    if (cards.length > 0 && cards[currentIndex]) {
      const currentCard = cards[currentIndex];
      const correctAnswer = currentCard.answer;
      
      let allPossibleAnswers: string[] = [];
      if (currentCard.category === 'Thermal') {
        allPossibleAnswers = comparisonRemedies.map(r => `Thermal: ${r.thermal} | Thirst: ${r.thirst}`);
      } else if (currentCard.category === 'Origin') {
        allPossibleAnswers = comparisonRemedies.map(r => r.origin);
      } else {
        // Fallback or remedies
        allPossibleAnswers = comparisonRemedies.map(r => r.name);
      }
      
      const uniqueAnswers = Array.from(new Set(allPossibleAnswers));
      const filteredDecoys = uniqueAnswers.filter(a => a !== correctAnswer);
      const chosenDecoys = filteredDecoys.sort(() => Math.random() - 0.5).slice(0, 3);
      const finalOptions = [correctAnswer, ...chosenDecoys].sort(() => Math.random() - 0.5);
      
      setQuizOptions(finalOptions);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  }, [currentIndex, cards]);

  // Comprehensive, Premium Question Pool Generator
  const generateAllQuestions = (level: 'Beginner' | 'Advanced' | 'Expert'): Flashcard[] => {
    const newCards: Flashcard[] = [];
    
    comparisonRemedies.forEach((remedy, idx) => {
      if (level === 'Beginner') {
        // 1. Key Characteristic
        newCards.push({
          id: `${remedy.id}-key-${idx}`,
          question: `Which homeopathic remedy is characterized by: "${remedy.keyCharacteristic}"?`,
          answer: remedy.name,
          remedy: remedy.name,
          remedyId: remedy.id,
          category: 'Keynote',
          difficulty: 'Beginner'
        });
        
        // 2. Tendency Keynote
        newCards.push({
          id: `${remedy.id}-tend-${idx}`,
          question: `Which remedy exhibits a typical onset tendency and clinical behavior described as: "${remedy.tendency}"?`,
          answer: remedy.name,
          remedy: remedy.name,
          remedyId: remedy.id,
          category: 'Keynote',
          difficulty: 'Beginner'
        });
      } else if (level === 'Advanced') {
        // 1. Better with modalities
        if (remedy.betterWith && remedy.betterWith.length > 0) {
          newCards.push({
            id: `${remedy.id}-better-${idx}`,
            question: `Identify the remedy that is significantly Ameliorated (conditions improve) by: ${remedy.betterWith.join(', ')}.`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Modality',
            difficulty: 'Advanced'
          });
        }
        
        // 2. Worse with modalities
        if (remedy.worseWith && remedy.worseWith.length > 0) {
          newCards.push({
            id: `${remedy.id}-worse-${idx}`,
            question: `Identify the remedy that is significantly Aggravated (symptoms worsen) by: ${remedy.worseWith.join(', ')}.`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Modality',
            difficulty: 'Advanced'
          });
        }
        
        // 3. Thermal & Thirst Profile matching
        newCards.push({
          id: `${remedy.id}-therm-${idx}`,
          question: `Match the remedy with this Thermal and Thirst profile: Thermal: "${remedy.thermal}" | Thirst state: "${remedy.thirst}".`,
          answer: remedy.name,
          remedy: remedy.name,
          remedyId: remedy.id,
          category: 'Thermal',
          difficulty: 'Advanced'
        });
      } else if (level === 'Expert') {
        // 1. Taxonomic Origin matching
        newCards.push({
          id: `${remedy.id}-orig-${idx}`,
          question: `What is the plant, mineral, chemical or biological origin for the remedy: ${remedy.name}?`,
          answer: remedy.origin,
          remedy: remedy.name,
          remedyId: remedy.id,
          category: 'Origin',
          difficulty: 'Expert'
        });
        
        // 2. Differential diagnostics
        if (remedy.keyDifference) {
          newCards.push({
            id: `${remedy.id}-diff-${idx}`,
            question: `Differential Analysis: ${remedy.keyDifference} Which remedy is this?`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Difference',
            difficulty: 'Expert'
          });
        }
        
        // 3. Highly detailed premium clinical scenario simulation cases
        const manualCases: Record<string, string> = {
          'aconite': 'A 28-year-old patient comes down with a sudden, violent fever at midnight after walking in cold, dry winds. He is intensely restless, pacing the room, and expresses an overwhelming crying fear of death.',
          'arnica': 'A patient who just underwent major dental surgery complains of a sore, bruised, aching feeling in his gums and face. He insists he is "perfectly fine" and begs you not to touch him or come near him.',
          'arsenicum-album': 'A patient presents with acute gastroenteritis. She is highly anxious, extremely weak, yet restlessly tosses from side to side. She complains of burning pains which are paradoxically relieved by sips of warm water.',
          'belladonna': 'A child presents with a very sudden, high fever. The face is red, hot, and flushed, the pupils are widely dilated, and there is a throbbing, burning headache worse from light, noise, or motion.',
          'bryonia': 'A patient complains of sharp, stitching chest pain during a cold. He lies perfectly still on his painful side, explaining that even the slightest movement or throat clearing makes the pain unbearable.',
          'gelsemium': 'A student preparing for an exam feels extremely listless and heavy. Her eyelids are half-closed, she has no thirst, and she suffers from a dull headache at the base of the skull, feeling weak and drowsy.',
          'ignatia': 'Following a sudden bereavement, a patient is sighing deeply and crying. She displays highly erratic, changing moods—laughing one minute and weeping the next—and has a choking globus sensation in her throat.',
          'lycopodium': 'A patient suffers from severe bloating and gas, especially between 4 PM and 8 PM. He has a craving for warm food and sweets, and presents a dry, hard stool with pain on the right side.',
          'nux-vomica': 'A highly competitive executive complains of chronic indigestion and constipation with an ineffectual, constant urge to stool. He is extremely irritable, chilly, and sensitive to noise and draft.',
          'pulsatilla': 'A gentle, weepy patient presents with a thick, yellow-green nasal discharge. She is entirely thirstless, craves cool open air, and her physical and emotional symptoms change continuously.',
          'rhus-tox': 'A patient reports stiff, painful joints that are worst when first getting out of bed, but gradually improve as he continues walking around, though damp weather makes them much worse.',
          'sulphur': 'A patient complains of severe, burning heat in the soles of his feet, forcing him to stick them out of the bedsheets at night. He is highly sensitive to heat, worse at 11 AM, and craves sweets.',
          'lachesis': 'A patient is highly loquaceous, jumping rapidly from one topic to another. She cannot tolerate any tight clothing around her neck, and all her symptoms are significantly worse after sleeping.',
          'calcarea-carb': 'A chubby, chilly infant sweats profusely on the head during sleep, wetting the pillow. He is slow to walk or cut teeth, and craves soft-boiled eggs and chalk.',
          'silicea': 'A thin, delicate baby is extremely chilly and lacks self-confidence. She sweats offensive perspiration on her cold feet, has brittle nails with white spots, and is sensitive to cold drafts.',
          'sepia': 'A mother feels completely overwhelmed and indifferent toward her family. She complains of a bearing-down sensation in the pelvis as if everything would escape, and feels better from rapid, vigorous exercise.'
        };
        
        const caseText = manualCases[remedy.id];
        if (caseText) {
          newCards.push({
            id: `${remedy.id}-case-${idx}`,
            question: `Clinical Case Study: ${caseText}`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Scenario',
            difficulty: 'Expert'
          });
        } else {
          // Dynamic scenario generation that handles other remedies
          const betterStr = remedy.betterWith && remedy.betterWith.length > 0 ? `ameliorated by ${remedy.betterWith.join(', ')}` : '';
          const worseStr = remedy.worseWith && remedy.worseWith.length > 0 ? `aggravated by ${remedy.worseWith.join(', ')}` : '';
          const modalPart = [betterStr, worseStr].filter(Boolean).join(' and ');
          
          newCards.push({
            id: `${remedy.id}-case-dynamic-${idx}`,
            question: `Clinical Patient Profile: Presenting with: "${remedy.keyCharacteristic}". Chronically "${remedy.thermal}" with thirst noted as "${remedy.thirst}". Conditions are ${modalPart || 'highly characteristic'}.`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Scenario',
            difficulty: 'Expert'
          });
        }
      }
    });

    return newCards;
  };

  // Launch the configured study session
  const startSession = () => {
    const rawPool = generateAllQuestions(difficulty);
    
    // Sort pool based on user's past accuracy to optimize learning reinforcement
    const sortedPool = [...rawPool].sort((a, b) => {
      if (!a.remedyId || !b.remedyId) return 0;
      const perfA = performance[a.remedyId]?.correct / performance[a.remedyId]?.total || 1;
      const perfB = performance[b.remedyId]?.correct / performance[b.remedyId]?.total || 1;
      return perfA - perfB;
    });

    const randomized = sortedPool.sort(() => Math.random() - 0.5);
    const selectedCards = randomized.slice(0, numQuestions === -1 ? randomized.length : numQuestions);

    setCards(selectedCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setCompleted(false);
    setSessionResults([]);
    setIsConfiguring(false);
  };

  const handleNext = (correct: boolean) => {
    if (isShowingFeedback) return;
    
    setIsShowingFeedback(true);
    setLastChoice(correct ? 'correct' : 'incorrect');

    const currentCard = cards[currentIndex];
    if (correct) setScore(prev => prev + 1);
    
    if (currentCard?.remedyId) {
      const rid = currentCard.remedyId;
      setSessionResults(prev => [...prev, { remedyId: rid, correct }]);
      
      userService.updateStudyStats(rid, correct, difficulty);
      
      setPerformance(prev => {
        const current = prev[rid] || { correct: 0, total: 0, lastDifficulty: difficulty };
        return {
          ...prev,
          [rid]: {
            correct: current.correct + (correct ? 1 : 0),
            total: current.total + 1,
            lastDifficulty: difficulty
          }
        };
      });
    }
    
    setTimeout(() => {
      setIsShowingFeedback(false);
      setLastChoice(null);

      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        generateLearningPath();
        setCompleted(true);
      }
    }, 1300);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered || isShowingFeedback) return;
    setIsAnswered(true);
    setSelectedOption(option);
    
    const currentCard = cards[currentIndex];
    const isCorrect = option === currentCard?.answer;
    handleNext(isCorrect);
  };

  const generateLearningPath = () => {
    const pathSuggestions: string[] = [];
    const accuracy = (score / cards.length) * 100;
    
    if (accuracy < 60) {
      pathSuggestions.push(`Deep Dive: Re-study ${difficulty} basics focusing on keynotes.`);
      pathSuggestions.push("Try switching to 'Beginner' level to reinforce fundamental patterns.");
    } else if (accuracy >= 90) {
      if (difficulty === 'Beginner') pathSuggestions.push("Mastery Detected: Ready to advance to 'Advanced' level modalities.");
      else if (difficulty === 'Advanced') pathSuggestions.push("Expert Insight: Level up to 'Expert' to learn rare clinical origins and complex scenarios.");
      else pathSuggestions.push("Materia Medica Legend: Explore the Relationship Map to see how these remedies interact.");
    }

    const mistakes = sessionResults.filter(r => !r.correct).map(r => r.remedyId);
    const uniqueMistakes = [...new Set(mistakes)];
    
    if (uniqueMistakes.length > 0) {
      const topMistake = uniqueMistakes[0];
      const remedyName = comparisonRemedies.find(r => r.id === topMistake)?.name;
      if (remedyName) {
        pathSuggestions.push(`Remedy Focus: Review ${remedyName} in the Encyclopedia to master its nuances.`);
      }
    }

    const modalMistakes = cards.filter((c, i) => !sessionResults[i]?.correct && c.category === 'Modality').length;
    if (modalMistakes > 2) {
      pathSuggestions.push("Modality Workshop: Use the Comparison Tool specifically for Thermal and Thirst states.");
    }

    setSuggestions(pathSuggestions.slice(0, 3));
  };

  const currentCard = cards[currentIndex];

  // Helper config for visual icons and clues based on question category
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'Thermal':
        return {
          icon: Thermometer,
          title: 'Thermal & Thirst Profile',
          clue: 'Focus instantly on the temperature cravings and heat/cold sensitivity ratios.',
          color: 'text-amber-500 bg-amber-500/10'
        };
      case 'Modality':
        return {
          icon: Activity,
          title: 'Aggravation & Amelioration',
          clue: 'Look for distinct situational change triggers: times, posture, weather conditions.',
          color: 'text-sky-500 bg-sky-500/10'
        };
      case 'Origin':
        return {
          icon: Dna,
          title: 'Remedy Origin Taxa',
          clue: 'Trace the natural taxonomical kingdom: plant family, raw chemicals, or organic tissues.',
          color: 'text-violet-500 bg-violet-500/10'
        };
      case 'Scenario':
        return {
          icon: Brain,
          title: 'Clinical Case Scenario',
          clue: 'Synthesize the dynamic symptom complex, onset velocity, and psychological posture.',
          color: 'text-rose-500 bg-rose-500/10'
        };
      case 'Difference':
        return {
          icon: Star,
          title: 'Differential Diagnosis',
          clue: 'Isolate the core keynotes that separate this remedy from closely paired compounds.',
          color: 'text-teal-500 bg-teal-500/10'
        };
      case 'Keynote':
      default:
        return {
          icon: Target,
          title: 'Keynote Characteristics',
          clue: 'Identify unique core sensations, psychic fears, and hallmark guiding keynotes.',
          color: 'text-emerald-500 bg-emerald-500/10'
        };
    }
  };

  const categoryInfo = currentCard ? getCategoryConfig(currentCard.category) : null;
  const CategoryIcon = categoryInfo ? categoryInfo.icon : HelpCircle;

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-zinc-950 pb-20 transition-colors duration-300">
      <SEO 
        title="Clinical Recall Tool | Curiva Homoeopathy"
        description="Master Materia Medica with our dynamic study system. Test your knowledge on keynotes, clinical modalities, and detailed case studies."
      />

      {/* Styled Header */}
      <header className="relative pt-24 pb-36 md:pt-32 md:pb-40 overflow-hidden bg-primary-dark dark:bg-zinc-900 border-b border-border dark:border-zinc-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.1)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full border border-white/10 mb-6 md:mb-8 backdrop-blur-md"
          >
            <Brain className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Homoeopathic Memory Palace</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6.5xl font-display font-medium text-white tracking-tighter uppercase mb-4"
          >
            Clinical <span className="text-emerald-400 italic font-serif">Recall</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-white/70 max-w-2xl font-serif italic leading-relaxed"
          >
            High-speed clinical mental training. Toggle between dynamic interactive quizzes and classical self-study cards to master organic drug pictures.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-20 relative z-20 space-y-10 md:space-y-12">
        {/* CONFIGURATION DASHBOARD (SETUP MODE) */}
        <AnimatePresence mode="wait">
          {isConfiguring ? (
            <motion.div
              key="setup-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 p-6 md:p-10 rounded-[2.5rem] shadow-xl max-w-2xl mx-auto space-y-10"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-emerald-500/10 flex items-center justify-center text-primary dark:text-emerald-400 mx-auto">
                  <Sliders className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3.5xl font-display font-bold text-text-primary dark:text-zinc-100">
                  Configure <span className="text-primary dark:text-emerald-400 italic">Recall Session</span>
                </h2>
                <p className="text-xs text-text-secondary dark:text-zinc-400 font-serif italic">
                  Select your metrics. The system dynamically pulls quality case histories matching your choices.
                </p>
              </div>

              {/* 1. DIFFICULTY LEVEL (TAB SELECTOR WITH VIBRANT INTERACTIVES) */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-zinc-400">
                  Practice Difficulty Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['Beginner', 'Advanced', 'Expert'] as const).map((level) => {
                    const isActive = difficulty === level;
                    
                    const levelMeta = {
                      Beginner: {
                        icon: BookOpen,
                        label: 'Beginner',
                        desc: 'Keynotes & Onset',
                        color: 'from-emerald-500 to-teal-500',
                        shadow: 'shadow-emerald-500/20',
                        bg: 'bg-emerald-50 dark:bg-emerald-950/20',
                        text: 'text-emerald-700 dark:text-emerald-400'
                      },
                      Advanced: {
                        icon: Compass,
                        label: 'Advanced',
                        desc: 'Thermal & Modalities',
                        color: 'from-indigo-500 to-blue-500',
                        shadow: 'shadow-indigo-500/20',
                        bg: 'bg-indigo-50 dark:bg-indigo-950/20',
                        text: 'text-indigo-700 dark:text-indigo-400'
                      },
                      Expert: {
                        icon: Award,
                        label: 'Expert',
                        desc: 'Clinical Cases & Origin',
                        color: 'from-amber-500 to-rose-500',
                        shadow: 'shadow-amber-500/20',
                        bg: 'bg-amber-50 dark:bg-amber-950/20',
                        text: 'text-amber-700 dark:text-amber-400'
                      }
                    }[level];

                    const Icon = levelMeta.icon;

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`relative flex items-center gap-3.5 p-4 rounded-2xl transition-all text-left group cursor-pointer border ${
                          isActive 
                            ? `bg-gradient-to-r ${levelMeta.color} text-white shadow-lg ${levelMeta.shadow} border-transparent`
                            : `border-border dark:border-zinc-800 text-text-secondary dark:text-zinc-400 hover:bg-bg-secondary dark:hover:bg-zinc-800/30`
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : `${levelMeta.bg} ${levelMeta.text} group-hover:scale-105`
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-xs font-black uppercase tracking-wider leading-none mb-1">
                            {levelMeta.label}
                          </span>
                          <span className={`block text-[10px] leading-none ${
                            isActive ? 'text-white/80' : 'text-text-tertiary dark:text-text-tertiary'
                          }`}>
                            {levelMeta.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CHOOSE QUANTITY */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-zinc-400">
                  Target Question Quantity
                </label>
                <div className="flex flex-wrap gap-2">
                  {([5, 10, 15, 25, 40, -1] as const).map((qty) => {
                    const isActive = numQuestions === qty;
                    const label = qty === -1 ? 'Show All Available' : `${qty} Questions`;
                    return (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setNumQuestions(qty)}
                        className={`px-4.5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                          isActive
                            ? 'bg-primary border-primary text-white shadow-md'
                            : 'bg-bg-secondary dark:bg-zinc-800/35 border-transparent hover:border-border text-text-secondary dark:text-zinc-400'
                        }`}
                      >
                        {qty === -1 ? '✨ Maximum Pool' : `${qty} Cases`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. CHOOSE PRACTICE MODE */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary dark:text-zinc-400">
                  Select Training Format
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setStudyMode('quiz')}
                    className={`p-5 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                      studyMode === 'quiz'
                        ? 'bg-primary/5 dark:bg-emerald-500/5 border-primary dark:border-emerald-500 text-text-primary dark:text-zinc-100 ring-1 ring-primary/20'
                        : 'border-border dark:border-zinc-800 bg-bg-secondary/40 dark:bg-zinc-800/20 text-text-secondary dark:text-zinc-400 hover:border-primary/30'
                    }`}
                  >
                    <div className={`p-2 rounded-xl border ${
                      studyMode === 'quiz' ? 'bg-primary/10 border-primary/20 text-primary dark:text-emerald-400' : 'bg-white dark:bg-zinc-800 border-border'
                    }`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-black uppercase tracking-wider">
                        📝 Multiple Choice Quiz
                      </span>
                      <span className="block text-[10px] font-serif italic text-text-tertiary mt-1">
                        Interactive exam with 4 dynamic decoy choices for fast diagnostic retrieval.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudyMode('flashcard')}
                    className={`p-5 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                      studyMode === 'flashcard'
                        ? 'bg-primary/5 dark:bg-emerald-500/5 border-primary dark:border-emerald-500 text-text-primary dark:text-zinc-100 ring-1 ring-primary/20'
                        : 'border-border dark:border-zinc-800 bg-bg-secondary/40 dark:bg-zinc-800/20 text-text-secondary dark:text-zinc-400 hover:border-primary/30'
                    }`}
                  >
                    <div className={`p-2 rounded-xl border ${
                      studyMode === 'flashcard' ? 'bg-primary/10 border-primary/20 text-primary dark:text-emerald-400' : 'bg-white dark:bg-zinc-800 border-border'
                    }`}>
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-black uppercase tracking-wider">
                        💡 Classic Flashcard
                      </span>
                      <span className="block text-[10px] font-serif italic text-text-tertiary mt-1">
                        Self-evaluation 3D card layout allowing in-depth review before showing answer.
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* INTEGRATIVE TEMPERATURE BANNER (ADAPTIVE AMBIENT ENVIRONMENT DESIGN) */}
              <div className="bg-bg-secondary dark:bg-zinc-800/20 border border-border dark:border-zinc-800 p-4.5 rounded-2xl flex gap-3 text-xs text-text-secondary dark:text-zinc-450 font-serif italic leading-relaxed items-center">
                <Thermometer className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  <strong>Tip:</strong> Curiva is in real-time sync with day-night cycles. Ambient colors dynamically shift contrast parameters so your eyes stay fresh during prolonged sessions.
                </span>
              </div>

              {/* LAUNCH TRIGGER */}
              <button
                type="button"
                onClick={startSession}
                className="w-full py-4 bg-primary text-white hover:bg-primary-dark rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" /> Initialize Recall Arena
              </button>
            </motion.div>
          ) : (
            /* ACTIVE QUIZ/FLASHCARD LEARNING VIEW */
            <motion.div
              key="active-study-session"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Back to configuration button */}
              <div className="flex justify-between items-center max-w-6xl mx-auto">
                <button
                  onClick={() => setIsConfiguring(true)}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-secondary dark:text-zinc-400 hover:text-primary transition-all bg-white dark:bg-zinc-900 px-4.5 py-3.5 border border-border dark:border-zinc-800 rounded-xl"
                >
                  <Sliders className="w-3.5 h-3.5" /> Reconfigure Practice
                </button>
                
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Recall active
                </span>
              </div>

              {!completed ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
                  {/* Left Spatial Panel: Segment Details & Progress Indicator */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Part Identifier info card */}
                    <div className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-3xl p-6 md:p-6.5 shadow-md">
                      <div className="flex items-center gap-2 mb-4">
                        <CategoryIcon className={`w-5 h-5 ${categoryInfo?.color || 'text-primary'}`} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary dark:text-zinc-400">
                          Section Segment
                        </h4>
                      </div>
                      
                      <h3 className="text-xl font-bold text-text-primary dark:text-zinc-100 mb-2 font-display">
                        {categoryInfo?.title}
                      </h3>
                      <p className="text-xs text-text-secondary dark:text-zinc-400 leading-relaxed font-serif italic bg-bg-secondary dark:bg-zinc-800/30 p-4 rounded-xl border border-dashed border-border dark:border-zinc-800">
                        "{categoryInfo?.clue}"
                      </p>

                      <div className="mt-6 pt-5 border-t border-border dark:border-zinc-800 flex justify-between text-[11px] text-text-tertiary">
                        <span className="font-bold uppercase tracking-wider">Active Level</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">
                          {difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Progress tracking information */}
                    <div className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-3xl p-6 shadow-md space-y-5">
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-black text-text-secondary dark:text-zinc-400 uppercase tracking-wider">Progress Gauge</span>
                          <span className="font-mono text-text-primary dark:text-zinc-200 font-bold">
                            {currentIndex + 1} / {cards.length} Cases
                          </span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-bg-secondary/40 dark:bg-zinc-800/20 p-3 rounded-2xl text-center border border-border/40 dark:border-zinc-800">
                          <span className="block text-[10px] uppercase font-black tracking-wider text-text-tertiary mb-1">Score Matches</span>
                          <span className="text-xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                            {score}
                          </span>
                        </div>
                        <div className="bg-bg-secondary/40 dark:bg-zinc-800/20 p-3 rounded-2xl text-center border border-border/40 dark:border-zinc-800">
                          <span className="block text-[10px] uppercase font-black tracking-wider text-text-tertiary mb-1">Accuracy</span>
                          <span className="text-xl font-display font-bold text-text-primary dark:text-zinc-100">
                            {currentIndex > 0 ? Math.round((score / currentIndex) * 100) : 100}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Spaced Panel: Core Questions Presentation Zone */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Toggle dynamic practice mode immediately during trial session */}
                    <div className="flex justify-center bg-bg-secondary/80 dark:bg-zinc-900 border border-border dark:border-zinc-800 p-1.5 rounded-2xl max-w-sm mx-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setStudyMode('quiz');
                          setIsFlipped(false);
                        }}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          studyMode === 'quiz' 
                            ? 'bg-white dark:bg-zinc-800 text-text-primary dark:text-zinc-100 shadow-sm'
                            : 'text-text-tertiary hover:text-text-primary'
                        }`}
                      >
                        📝 MCQ Quiz
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudyMode('flashcard')}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          studyMode === 'flashcard' 
                            ? 'bg-white dark:bg-zinc-800 text-text-primary dark:text-zinc-100 shadow-sm'
                            : 'text-text-tertiary hover:text-text-primary'
                        }`}
                      >
                        💡 Flashcard
                      </button>
                    </div>

                    {studyMode === 'quiz' ? (
                      /* 4-OPTION MULTIPLE CHOICE INTERFACE */
                      <div className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-[2.5rem] p-6 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                        
                        <div className="space-y-4">
                          <span className="block text-[10px] font-black uppercase tracking-wider text-text-tertiary">
                            Case Question #{currentIndex + 1}
                          </span>
                          <h2 className="text-xl md:text-2.5xl font-serif text-text-primary dark:text-zinc-100 tracking-tight leading-relaxed">
                            {currentCard?.question}
                          </h2>
                        </div>

                        {/* Interactive Feedback banner inside actual screen block */}
                        <AnimatePresence>
                          {isShowingFeedback && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className={`p-4 rounded-2xl flex items-center gap-3.5 border ${
                                lastChoice === 'correct' 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-800 dark:text-emerald-300' 
                                  : 'bg-red-50 dark:bg-red-950/20 border-red-200 text-red-800 dark:text-red-300'
                              }`}
                            >
                              {lastChoice === 'correct' ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" /> : <XCircle className="w-5 h-5 shrink-0 text-red-500" />}
                              <div className="text-left">
                                <p className="text-xs font-black uppercase tracking-wider leading-none mb-1">
                                  {lastChoice === 'correct' ? 'Perfect Match' : 'Incorrect Choice'}
                                </p>
                                <p className="text-[11px] leading-tight opacity-90">
                                  {lastChoice === 'correct' 
                                    ? 'Exceptional clinical recall! Modality statistics synced to archive.' 
                                    : `The correct remedy matches: "${currentCard?.answer}". Check encyclopedia to learn.`}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Multiple Choice Options selection section provided ample spatial arrangement */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 pt-2">
                          {quizOptions.map((option, index) => {
                            const letter = ['A', 'B', 'C', 'D'][index];
                            const isSelected = selectedOption === option;
                            const isCorrectAnswer = option === currentCard?.answer;
                            
                            let optionStyle = 'border-border dark:border-zinc-805 hover:border-primary/50 text-text-primary dark:text-zinc-200 hover:bg-bg-secondary dark:hover:bg-zinc-800/40 bg-white dark:bg-zinc-900';
                            
                            if (isAnswered) {
                              if (isCorrectAnswer) {
                                  optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/20';
                              } else if (isSelected) {
                                  optionStyle = 'border-red-500 bg-red-500/10 text-red-800 dark:text-red-300 ring-1 ring-red-500/20';
                              } else {
                                  optionStyle = 'border-border dark:border-zinc-800 opacity-40 text-text-secondary';
                              }
                            }

                            return (
                              <button
                                key={option}
                                type="button"
                                disabled={isAnswered}
                                onClick={() => handleOptionSelect(option)}
                                className={`flex items-center gap-4.5 p-5 rounded-2xl border text-left transition-all font-serif text-base cursor-pointer disabled:cursor-default w-full min-h-[64px] ${optionStyle}`}
                              >
                                <div className={`w-8 h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center border transition-all ${
                                  isAnswered && isCorrectAnswer 
                                    ? 'bg-emerald-500 text-white border-transparent' 
                                    : isAnswered && isSelected 
                                      ? 'bg-red-500 text-white border-transparent' 
                                      : 'bg-bg-secondary dark:bg-zinc-850 text-text-tertiary border-border dark:border-zinc-700'
                                }`}>
                                  {letter}
                                </div>
                                <span className="flex-1 font-sans font-semibold text-[14px] leading-tight select-none">
                                  {option}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* FLASHCARD TRANS ROTATIVE CARDS DECK LAYOUT */
                      <div className="space-y-8">
                        <div className="perspective-1000 relative w-full h-[360px] md:h-[300px]">
                          <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                            exit={{ opacity: 0, rotateY: 10, scale: 0.95 }}
                            className="w-full h-full cursor-pointer absolute inset-0"
                            onClick={() => !isShowingFeedback && setIsFlipped(!isFlipped)}
                          >
                            <motion.div 
                              animate={{ rotateY: isFlipped ? 180 : 0 }}
                              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                              className="w-full h-full relative preserve-3d"
                            >
                              {/* Primary Card Front view */}
                              <div className="absolute inset-0 backface-hidden bg-white dark:bg-zinc-900 border-2 border-border dark:border-zinc-800 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-lg">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                                      {currentCard?.category} Recall
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono text-text-tertiary">
                                    Case Study {currentIndex + 1} of {cards.length}
                                  </span>
                                </div>

                                <div className="my-auto py-4 text-left">
                                  <span className="block text-[10px] font-bold tracking-widest text-emerald-500 uppercase mb-2">Patient Presentation Case</span>
                                  <h3 className="text-xl md:text-2.5xl font-serif text-text-primary dark:text-zinc-100 tracking-tight leading-relaxed">
                                    {currentCard?.question}
                                  </h3>
                                </div>

                                <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500/85">
                                  Click here to Flip & reveal the key remedy
                                </p>
                              </div>

                              {/* Reversed Card Back view */}
                              <div className="absolute inset-0 backface-hidden bg-primary-dark dark:bg-emerald-950 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl rotate-y-180 border-4 border-emerald-500/20">
                                <div className="flex justify-between items-center text-white/50">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Clinical Solution</span>
                                  <Crown className="w-6 h-6 text-emerald-400" />
                                </div>

                                <div className="my-auto text-center space-y-4">
                                  <h3 className="text-3xl md:text-4.5xl font-display font-medium text-emerald-400 uppercase tracking-tight italic">
                                    {currentCard?.answer}
                                  </h3>
                                  <p className="text-white/60 font-serif italic text-base leading-relaxed">
                                    Identified profile matches: {currentCard?.remedy}
                                  </p>
                                </div>

                                <div className="flex justify-center">
                                  <button 
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (currentCard?.remedyId) {
                                        navigate(`/remedy/${currentCard.remedyId}`);
                                      }
                                    }}
                                    className="text-white/60 font-black uppercase tracking-widest text-[9px] flex items-center gap-2 hover:text-white transition-colors cursor-pointer bg-white/5 py-2.5 px-5 rounded-full border border-white/10"
                                  >
                                    View Encyclopedic Notes
                                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Interactive Self Evaluation grading panels */}
                        <div className="flex flex-col items-center justify-center gap-4 bg-bg-secondary/40 dark:bg-zinc-900 border border-border dark:border-zinc-800 p-6 rounded-3xl max-w-lg mx-auto">
                          <p className="text-[10px] font-black uppercase tracking-wider text-text-tertiary">
                            Grade Your Clinical Assessment:
                          </p>
                          <div className="flex items-center gap-4">
                            <button 
                              type="button"
                              onClick={() => handleNext(false)}
                              disabled={isShowingFeedback}
                              className="px-5 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-505 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest gap-2 disabled:opacity-50"
                            >
                              <XCircle className="w-4 h-4" /> Incorrect
                            </button>
                            
                            <button 
                              type="button"
                              onClick={() => {
                                setIsFlipped(!isFlipped);
                              }}
                              className="p-3.5 rounded-xl bg-white dark:bg-zinc-800 border border-border dark:border-zinc-700 text-text-tertiary hover:text-primary transition-all flex items-center justify-center"
                              title="Flip Card"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>

                            <button 
                              type="button"
                              onClick={() => handleNext(true)}
                              disabled={isShowingFeedback}
                              className="px-5 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-555 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest gap-2 disabled:opacity-50"
                            >
                              <CheckCircle className="w-4 h-4" /> Correct Match
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* HIGH FIDELITY CLINICAL RESULTS PAGE */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-zinc-900 p-8 md:p-14 rounded-[3rem] border-2 border-emerald-500/10 text-center shadow-2xl relative overflow-hidden max-w-4xl mx-auto"
                >
                  <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12 pointer-events-none">
                     <GraduationCap className="w-56 h-56 text-emerald-500" />
                  </div>

                  <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                      <Star className="w-8 h-8 text-emerald-500 fill-emerald-500" />
                    </div>
                    
                    <div className="space-y-3">
                      <h2 className="text-3xl md:text-4.5xl font-display font-bold text-text-primary dark:text-zinc-100 tracking-tight uppercase leading-none">
                        Arena Session <span className="text-emerald-400 italic font-serif">Complete!</span>
                      </h2>
                      <p className="text-base text-text-secondary dark:text-zinc-400 max-w-xl mx-auto font-serif italic">
                        Excellent research practice. You accurately mapped <span className="text-emerald-500 font-bold font-mono text-lg">{score}</span> out of <span className="font-bold font-mono text-lg">{cards.length}</span> diagnostic entities correctly.
                      </p>
                    </div>

                    {/* Suggestions list wrapper */}
                    {suggestions.length > 0 && (
                      <div className="space-y-4 pt-6 border-t border-border dark:border-zinc-800">
                        <div className="flex items-center justify-center gap-2 text-text-primary dark:text-zinc-200">
                          <Target className="w-4 h-4 text-emerald-500" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest mb-0.5">Recommended Path Forward</h4>
                        </div>
                        <div className="grid gap-3 max-w-lg mx-auto text-left">
                          {suggestions.map((suggestion, i) => (
                            <div
                              key={i}
                              className="bg-bg-secondary dark:bg-zinc-800/30 p-4 rounded-xl border border-border dark:border-zinc-800/60 flex items-center gap-4"
                            >
                               <div className="w-6 h-6 shrink-0 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">
                                 {i + 1}
                               </div>
                               <p className="text-xs font-sans font-medium text-text-secondary dark:text-zinc-300 flex-1 leading-normal">
                                 {suggestion}
                               </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-6">
                      <button 
                        type="button"
                        onClick={() => setIsConfiguring(true)}
                        className="px-7 py-3.5 bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Practice Another Zone
                      </button>
                      <button 
                        type="button"
                        onClick={() => navigate('/materia-medica')}
                        className="px-7 py-3.5 bg-white dark:bg-zinc-800 text-text-primary dark:text-zinc-200 border border-border dark:border-zinc-700 rounded-xl font-black uppercase tracking-widest text-[9px] hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        <Layers className="w-3.5 h-3.5 text-text-tertiary" /> View Materia Medica
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StudyTool;
