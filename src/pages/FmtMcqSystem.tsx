import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, CheckCircle2, XCircle, ArrowLeft, 
  RotateCcw, Trophy, ChevronRight, Info, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FMT_MCQS, MCQ } from '../data/fmtMcqs';
import SEO from '../components/SEO';

export default function FmtMcqSystem() {
  const [gameState, setGameState] = useState<'selection' | 'quiz' | 'result'>('selection');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<MCQ[]>([]);

  const categories = ['All', ...new Set(FMT_MCQS.map(q => q.category))];

  const startQuiz = () => {
    const filtered = selectedCategory === 'All' 
      ? [...FMT_MCQS] 
      : FMT_MCQS.filter(q => q.category === selectedCategory);
    
    // Shuffle and pick 10 (or all if less than 10)
    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizQuestions(shuffled);
    setAnswers(new Array(shuffled.length).fill(null));
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIdx;
    setAnswers(newAnswers);
    setIsAnswered(true);

    if (optionIdx === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setIsAnswered(false);
    } else {
      setGameState('result');
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="MCQ Practice | FMTMedEasy | Curiva Homoeopathy"
        description="Test your knowledge of Forensic Medicine & Toxicology with our category-wise MCQs."
      />

      <div className="max-w-3xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-center justify-between">
          <Link 
            to="/fmt" 
            className="inline-flex items-center gap-2 text-xs font-black text-text-tertiary hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </Link>
          {gameState === 'quiz' && (
            <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-center">
                <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
                  MCQ Practice
                </h1>
                <p className="text-text-secondary font-medium">
                  Challenge yourself with standard FMT questions for university and competitive exams.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[2.5rem] p-8 shadow-soft space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-tertiary px-2">
                    Choose Category
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                          selectedCategory === cat
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-transparent bg-bg-secondary text-text-secondary hover:border-border/60'
                        }`}
                      >
                        <span className="font-bold text-sm">{cat}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedCategory === cat ? 'border-primary bg-primary' : 'border-text-tertiary'
                        }`}>
                          {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={startQuiz}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Start Challenge
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Progress Bar */}
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  className="h-full bg-primary"
                />
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                  <HelpCircle className="w-3 h-3" />
                  {currentQuestion.category}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-snug">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid gap-3">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const isSelected = answers[currentQuestionIndex] === idx;
                  
                  let style = 'bg-white dark:bg-zinc-900 border-border/60 text-text-primary';
                  if (isAnswered) {
                    if (isCorrect) style = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400';
                    else if (isSelected) style = 'bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-400';
                    else style = 'bg-white dark:bg-zinc-900 border-border/60 text-text-tertiary opacity-50';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx)}
                      className={`p-5 rounded-[1.5rem] border-2 text-left font-bold text-sm transition-all flex items-center gap-4 ${style} ${!isAnswered && 'hover:border-primary hover:bg-primary/5 active:scale-[0.98]'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs ${
                        isAnswered && isCorrect ? 'bg-emerald-500 text-white' : 
                        isAnswered && isSelected && !isCorrect ? 'bg-rose-500 text-white' : 
                        'bg-bg-secondary text-text-tertiary'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Info className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Explanation</h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <button
                    onClick={nextQuestion}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8 text-center"
            >
              <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[3rem] p-12 shadow-soft space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                <div className="space-y-4 relative z-10">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Trophy className="w-12 h-12" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-display font-black text-text-primary tracking-tight">Challenge Complete!</h2>
                    <p className="text-text-secondary font-medium">Great effort on the {selectedCategory} module.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-bg-secondary rounded-3xl space-y-1">
                    <div className="text-3xl font-black text-primary">{score} / {quizQuestions.length}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Correct Answers</div>
                  </div>
                  <div className="p-6 bg-bg-secondary rounded-3xl space-y-1">
                    <div className="text-3xl font-black text-primary">{Math.round((score / quizQuestions.length) * 100)}%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Accuracy Score</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setGameState('selection')}
                    className="flex-1 py-4 bg-bg-secondary hover:bg-primary/5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Another Module
                  </button>
                  <Link
                    to="/fmt/learn"
                    className="flex-1 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Continue Learning
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
