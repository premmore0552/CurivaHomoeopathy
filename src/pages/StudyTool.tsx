
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Star, GraduationCap, Crown, Target, Layers, ExternalLink } from 'lucide-react';
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
  category: 'Keynote' | 'Thermal' | 'Origin' | 'Modality';
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
}

interface PerformanceData {
  correct: number;
  total: number;
  lastDifficulty: string;
}

const StudyTool: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Advanced' | 'Expert'>('Beginner');
  const [performance, setPerformance] = useState<Record<string, PerformanceData>>({});
  const [sessionResults, setSessionResults] = useState<{ remedyId: string, correct: boolean }[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);
  const [lastChoice, setLastChoice] = useState<'correct' | 'incorrect' | null>(null);

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

  useEffect(() => {
    generateCards();
  }, [difficulty]);

  const generateCards = () => {
    const newCards: Flashcard[] = [];
    // Shuffle pool to get random remedies each time
    const pool = [...comparisonRemedies].sort(() => Math.random() - 0.5);

    // Prioritization: Focus on remedies with low accuracy if any stats exist
    const sortedPool = pool.sort((a, b) => {
      const perfA = performance[a.id]?.correct / performance[a.id]?.total || 1;
      const perfB = performance[b.id]?.correct / performance[b.id]?.total || 1;
      return perfA - perfB;
    });

    sortedPool.forEach((remedy, idx) => {
      // Keynote Questions (Always included for better variety)
      newCards.push({
        id: `${remedy.id}-key-${Date.now()}-${idx}`,
        question: `Which remedy is known for: "${remedy.keyCharacteristic}"?`,
        answer: remedy.name,
        remedy: remedy.name,
        remedyId: remedy.id,
        category: 'Keynote',
        difficulty: 'Beginner'
      });

      // Difficulty based questions
      if (difficulty !== 'Beginner') {
        // Better with
        if (remedy.betterWith.length > 0) {
          newCards.push({
            id: `${remedy.id}-better-${Date.now()}-${idx}`,
            question: `Indicate the remedy that is significantly BETTER with: ${remedy.betterWith.join(', ')}.`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Modality',
            difficulty: 'Advanced'
          });
        }

        // Worse with
        if (remedy.worseWith.length > 0) {
          newCards.push({
            id: `${remedy.id}-worse-${Date.now()}-${idx}`,
            question: `Which remedy matches this aggravation pattern: Worse for ${remedy.worseWith.join(', ')}?`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Modality',
            difficulty: 'Advanced'
          });
        }
        
        // Origin
        if (difficulty === 'Expert') {
          newCards.push({
            id: `${remedy.id}-origin-${Date.now()}-${idx}`,
            question: `What is the source/origin of the remedy ${remedy.name}?`,
            answer: remedy.origin,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Origin',
            difficulty: 'Expert'
          });
        }

        // Thermal and Thirst
        newCards.push({
          id: `${remedy.id}-thermal-${Date.now()}-${idx}`,
          question: `State the Thermal Relation and Thirst state for ${remedy.name}.`,
          answer: `Thermal: ${remedy.thermal} | Thirst: ${remedy.thirst}`,
          remedy: remedy.name,
          remedyId: remedy.id,
          category: 'Thermal',
          difficulty: 'Advanced'
        });

        // Clinical Applications (Expert)
        if (difficulty === 'Expert' && remedy.clinicalApplications.length > 0) {
          newCards.push({
            id: `${remedy.id}-clinical-${Date.now()}-${idx}`,
            question: `Which remedy is clinically indicated for: ${remedy.clinicalApplications.slice(0, 2).join(', ')}?`,
            answer: remedy.name,
            remedy: remedy.name,
            remedyId: remedy.id,
            category: 'Keynote',
            difficulty: 'Expert'
          });
        }
      }
    });

    // Shuffle all generated cards and take a substantial chunk
    setCards(newCards.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setCompleted(false);
  };

  const handleNext = (correct: boolean) => {
    if (isShowingFeedback) return;
    
    setIsShowingFeedback(true);
    setLastChoice(correct ? 'correct' : 'incorrect');

    const currentCard = cards[currentIndex];
    if (correct) setScore(prev => prev + 1);
    
    // Update session results
    if (currentCard?.remedyId) {
      const rid = currentCard.remedyId;
      setSessionResults(prev => [...prev, { remedyId: rid, correct }]);
      
      // Persist to Firebase
      userService.updateStudyStats(rid, correct, difficulty);
      
      // Update local performance stats
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
    }, 800);
  };

  const generateLearningPath = () => {
    const pathSuggestions: string[] = [];
    
    // 1. Accuracy Check
    const accuracy = (score / cards.length) * 100;
    
    if (accuracy < 60) {
      pathSuggestions.push(`Deep Dive: Re-study ${difficulty} basics focusing on keynotes.`);
      pathSuggestions.push("Try switching to 'Beginner' level to reinforce fundamental patterns.");
    } else if (accuracy >= 90) {
      if (difficulty === 'Beginner') pathSuggestions.push("Mastery Detected: Ready to advance to 'Advanced' level modalities.");
      else if (difficulty === 'Advanced') pathSuggestions.push("Expert Insight: Level up to 'Expert' to learn rare clinical origins.");
      else pathSuggestions.push("Materia Medica Legend: Explore the Relationship Map to see how these remedies interact.");
    }

    // 2. Remedy Specific Suggestions
    const mistakes = sessionResults.filter(r => !r.correct).map(r => r.remedyId);
    const uniqueMistakes = [...new Set(mistakes)];
    
    if (uniqueMistakes.length > 0) {
      const topMistake = uniqueMistakes[0];
      const remedyName = comparisonRemedies.find(r => r.id === topMistake)?.name;
      pathSuggestions.push(`Remedy Focus: Review ${remedyName} in the Encyclopedia to master its nuances.`);
    }

    // 3. Category Suggestions
    const modalMistakes = cards.filter((c, i) => !sessionResults[i]?.correct && c.category === 'Modality').length;
    if (modalMistakes > 2) {
      pathSuggestions.push("Modality Workshop: Use the Comparison Tool specifically for Thermal and Thirst states.");
    }

    setSuggestions(pathSuggestions.slice(0, 3));
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Clinical Recall Tool | Curiva Homoeopathy"
        description="Master Materia Medica with our dynamic flashcard study system. Test your knowledge on keynotes and modalities."
      />

      {/* Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mb-8"
          >
            <Brain className="w-4 h-4 text-accent-light" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light">Cognitive Training</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col mb-8"
          >
            Clinical <span className="text-accent italic lg:ml-24">Recall</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl font-serif italic leading-tight"
          >
            A high-speed Materia Medica study tool designed for students and practitioners. Master differential analysis through repetition.
          </motion.p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 -mt-24 relative z-20">
        {!completed ? (
          <div className="space-y-12">
            {/* Difficulty Selector */}
            <div className="flex justify-center gap-4">
              {(['Beginner', 'Advanced', 'Expert'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border-2 ${
                    difficulty === level 
                    ? 'bg-primary text-white border-primary shadow-soft scale-105' 
                    : 'bg-white text-text-secondary border-border hover:border-primary/30'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Flashcard Component */}
            <div className="perspective-1000 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, rotateY: -10, scale: 0.9 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 10, scale: 0.9 }}
                  className="w-full aspect-[4/3] md:aspect-[2.5/1] cursor-pointer"
                  onClick={() => !isShowingFeedback && setIsFlipped(!isFlipped)}
                >
                  <motion.div 
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                  >
                    {/* Feedback Overlay */}
                    <AnimatePresence>
                      {isShowingFeedback && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          className={`absolute inset-0 z-50 flex items-center justify-center rounded-[3rem] backdrop-blur-md ${
                            lastChoice === 'correct' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                          }`}
                        >
                          <motion.div 
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            className={`p-10 rounded-[2.5rem] bg-white shadow-2xl flex flex-col items-center gap-6 border-2 ${
                              lastChoice === 'correct' ? 'border-emerald-500/30' : 'border-red-500/30'
                            }`}
                          >
                            <div className={`p-6 rounded-full ${lastChoice === 'correct' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'}`}>
                              {lastChoice === 'correct' ? (
                                <CheckCircle2 className="w-16 h-16" />
                              ) : (
                                <XCircle className="w-16 h-16" />
                              )}
                            </div>
                            <div className="text-center">
                              <h4 className={`text-2xl font-display font-black uppercase italic tracking-widest ${
                                lastChoice === 'correct' ? 'text-emerald-600' : 'text-red-600'
                              }`}>
                                {lastChoice === 'correct' ? 'Exceptional!' : 'Keep Going!'}
                              </h4>
                              <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mt-1">
                                {lastChoice === 'correct' ? 'Symptom Match Confirmed' : 'Pattern Needs Review'}
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-border rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-soft">
                      <div className="absolute top-10 left-10 flex items-center gap-3">
                        <Target className="w-5 h-5 text-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                          {currentCard?.category} • {currentIndex + 1} / {cards.length}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-display font-medium text-text-primary italic tracking-tight leading-tight">
                        {currentCard?.question}
                      </h2>
                      <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-accent opacity-60 animate-pulse">
                        Click to Reveal Answer
                      </p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-primary-dark rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-soft rotate-y-180 border-4 border-accent/20">
                      <div className="absolute top-10 right-10">
                        <Crown className="w-8 h-8 text-accent/20" />
                      </div>
                      <h3 className="text-4xl md:text-7xl font-display font-medium text-accent italic tracking-tight uppercase mb-4">
                        {currentCard?.answer}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentCard?.remedyId) {
                            navigate(`/remedy/${currentCard.remedyId}`);
                          }
                        }}
                        className="text-white/60 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-white transition-colors cursor-pointer italic"
                      >
                        {currentCard?.remedy}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-8 max-w-sm mx-auto">
              <button 
                onClick={() => handleNext(false)}
                disabled={isShowingFeedback}
                className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                onClick={() => generateCards()}
                disabled={isShowingFeedback}
                className="p-6 rounded-[2rem] bg-bg-secondary border-2 border-border text-text-tertiary hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center disabled:opacity-50"
              >
                <RefreshCw className="w-6 h-6" />
              </button>

              <button 
                onClick={() => handleNext(true)}
                disabled={isShowingFeedback}
                className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:shadow-emerald-500/20 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-secondary p-12 md:p-20 rounded-[4rem] border-2 border-primary/20 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-20 opacity-5 rotate-12">
               <GraduationCap className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                <Star className="w-12 h-12 text-primary fill-primary" />
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-text-primary mb-6 tracking-tighter uppercase italic">
                Session <span className="text-primary italic">Complete!</span>
              </h2>
              <p className="text-2xl text-text-secondary font-medium mb-12">
                You correctly identified <span className="text-primary font-black">{score}</span> out of <span className="font-black">{cards.length}</span> remedy patterns.
              </p>

              {/* Learning Path */}
              {suggestions.length > 0 && (
                <div className="mb-12 space-y-6">
                  <div className="flex items-center justify-center gap-3 text-text-primary">
                    <Target className="w-5 h-5 text-primary" />
                    <h4 className="text-xs font-black uppercase tracking-widest">Recommended Learning Path</h4>
                  </div>
                  <div className="grid gap-4 max-w-2xl mx-auto">
                    {suggestions.map((suggestion, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-border flex items-center gap-6 text-left group hover:border-primary/30 transition-all"
                      >
                         <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <span className="text-[10px] font-black">{i + 1}</span>
                         </div>
                         <p className="text-sm font-serif italic text-text-secondary flex-1 leading-tight group-hover:text-text-primary transition-colors">
                           {suggestion}
                         </p>
                         <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => generateCards()}
                  className="px-10 py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
                >
                  <RefreshCw className="w-4 h-4" /> Start New Session
                </button>
                <button 
                  onClick={() => navigate('/materia-medica')}
                  className="px-10 py-5 bg-white dark:bg-bg-primary text-text-primary border-2 border-border rounded-3xl font-black uppercase tracking-widest text-xs hover:border-primary/40 transition-all flex items-center justify-center gap-3"
                >
                  <Layers className="w-4 h-4" /> Browse Materia Medica
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>


    </div>
  );
};

export default StudyTool;
