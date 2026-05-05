
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Star, GraduationCap, Crown, Target, Layers, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { comparisonRemedies } from '../data/comparisonData';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  remedy: string;
  remedyId?: string;
  category: 'Keynote' | 'Thermal' | 'Origin' | 'Modality';
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
}

const StudyTool: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Advanced' | 'Expert'>('Beginner');

  useEffect(() => {
    generateCards();
  }, [difficulty]);

  const generateCards = () => {
    const newCards: Flashcard[] = [];
    // Shuffle pool to get random remedies each time
    const pool = [...comparisonRemedies].sort(() => Math.random() - 0.5);

    pool.forEach((remedy, idx) => {
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
    if (correct) setScore(prev => prev + 1);
    
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Loop cards for infinite experience
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Clinical Recall Tool | Curiva Homoeopathy"
        description="Master Materia Medica with our dynamic flashcard study system. Test your knowledge on keynotes and modalities."
      />

      {/* Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mb-8"
          >
            <Brain className="w-4 h-4 text-primary-light" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-light">Cognitive Training</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-[0.8] uppercase flex flex-col mb-8"
          >
            Clinical <span className="text-primary italic lg:ml-24">Recall</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-tight"
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
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                    difficulty === level 
                    ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' 
                    : 'bg-white dark:bg-bg-secondary text-text-tertiary border-border hover:border-primary/30'
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
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div 
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-bg-secondary border-2 border-border rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl">
                      <div className="absolute top-10 left-10 flex items-center gap-3">
                        <Target className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                          {currentCard?.category} • {currentIndex + 1} / {cards.length}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight leading-tight">
                        {currentCard?.question}
                      </h2>
                      <p className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-50 animate-pulse">
                        Click to Reveal Answer
                      </p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-primary rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl rotate-y-180">
                      <div className="absolute top-10 right-10">
                        <Crown className="w-8 h-8 text-white/20" />
                      </div>
                      <h3 className="text-4xl md:text-7xl font-display font-black text-white italic tracking-tighter uppercase mb-4">
                        {currentCard?.answer}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentCard?.remedyId) {
                            navigate(`/remedy/${currentCard.remedyId}`);
                          }
                        }}
                        className="text-white/60 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
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
                className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20 group"
              >
                <XCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                onClick={() => generateCards()}
                className="p-6 rounded-[2rem] bg-bg-secondary border-2 border-border text-text-tertiary hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center"
              >
                <RefreshCw className="w-6 h-6" />
              </button>

              <button 
                onClick={() => handleNext(true)}
                className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:shadow-emerald-500/20 group"
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
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => generateCards()}
                  className="px-10 py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
                >
                  <RefreshCw className="w-4 h-4" /> Start New Session
                </button>
                <button 
                  onClick={() => navigate('/encyclopedia')}
                  className="px-10 py-5 bg-white dark:bg-bg-primary text-text-primary border-2 border-border rounded-3xl font-black uppercase tracking-widest text-xs hover:border-primary/40 transition-all flex items-center justify-center gap-3"
                >
                  <Layers className="w-4 h-4" /> Browse Materia Medica
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Pro Hint Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-text-primary p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
               <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary-light mb-2">
                 <Crown className="w-3 h-3 text-primary" /> Pro feature
               </div>
               <h3 className="text-3xl font-display font-black text-white italic leading-tight">
                 Unlock <span className="text-primary">Miasmatic Mastery</span> Decks
               </h3>
               <p className="text-white/60 font-medium max-w-md">
                 Pro subscribers get access to advanced miasmatic classification quizzes and differential clinical scenarios.
               </p>
            </div>
            <button 
              onClick={() => navigate('/pro-plans')}
              className="px-8 py-4 bg-white text-text-primary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shrink-0"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTool;
