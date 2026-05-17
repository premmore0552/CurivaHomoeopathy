import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Timer, 
  Trophy, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import SEO from '../components/SEO';

interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  subject: string;
}

const subjects = [
  "Materia Medica",
  "Organon of Medicine",
  "Homoeopathic Pharmacy",
  "Repertory",
  "Anatomy & Physiology",
  "Pathology",
  "FMTD",
  "Practice of Medicine"
];

// Sample questions to initialize the interface
const sampleMCQs: MCQ[] = [
  {
    id: '1',
    question: "Who is the father of Homeopathy?",
    options: ["Dr. J.T. Kent", "Dr. Samuel Hahnemann", "Dr. Constantine Hering", "Dr. Boenninghausen"],
    correctAnswer: 1,
    explanation: "Dr. Samuel Hahnemann (1755-1843) is the founder of Homoeopathy.",
    category: "General",
    subject: "Organon of Medicine"
  },
  {
    id: '2',
    question: "The 'Theory of Chronic Diseases' was first published in which year?",
    options: ["1828", "1833", "1810", "1843"],
    correctAnswer: 0,
    explanation: "The first edition of 'The Chronic Diseases' was published in 1828.",
    category: "History",
    subject: "Organon of Medicine"
  },
  {
    id: '3',
    question: "Which remedy is known as the 'Homeopathic Surgeon'?",
    options: ["Arnica", "Hepar Sulph", "Silicea", "Calendula"],
    correctAnswer: 2,
    explanation: "Silicea is often called the 'Homeopathic Surgeon' due to its ability to promote the expulsion of foreign bodies.",
    category: "Keynotes",
    subject: "Materia Medica"
  }
];

export default function MCQPractice() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<'lobby' | 'playing' | 'result'>('lobby');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizState === 'playing' && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (subject: string) => {
    setSelectedSubject(subject);
    setQuizState('playing');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimer(0);
    setShowExplanation(false);
  };

  const currentMCQs = sampleMCQs; // In production, filter by selectedSubject or load from 10k set

  const handleAnswer = (optionIndex: number) => {
    if (userAnswers[currentQuestionIndex] !== undefined) return;
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentMCQs.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setQuizState('result');
    }
  };

  const calculateScore = () => {
    let score = 0;
    currentMCQs.forEach((mcq, idx) => {
      if (userAnswers[idx] === mcq.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
      <SEO 
        title="MCQ Practice - AIAPGET Preparation"
        description="Practice 10,000+ Homoeopathic MCQs with detailed explanations for AIAPGET and competitive exams."
      />

      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-display font-medium text-text-primary">Exam <span className="text-accent italic">Arena</span></h1>
              <p className="text-xs text-text-secondary font-serif italic">AIAPGET Mastery Suite</p>
            </div>
          </div>
          
          {quizState === 'playing' && (
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent/5 rounded-full border border-accent/20">
                <Timer className="w-4 h-4 text-accent" />
                <span className="font-mono font-bold text-accent">{formatTime(timer)}</span>
              </div>
              <button 
                onClick={() => setQuizState('lobby')}
                className="text-sm font-black uppercase tracking-widest text-text-secondary hover:text-red-500 transition-colors"
              >
                Quit
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        <AnimatePresence mode="wait">
          {quizState === 'lobby' && (
            <motion.div 
              key="lobby"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-display font-medium text-text-primary italic">Select <span className="text-accent">Subject</span></h2>
                <p className="text-xl text-text-secondary font-serif italic max-w-2xl mx-auto">
                  Test your knowledge across 10,000 carefully curated questions designed for Homoeopathic post-graduate entrance exams.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {subjects.map((subject, idx) => (
                  <button
                    key={idx}
                    onClick={() => startQuiz(subject)}
                    className="flex items-center justify-between p-6 bg-white border border-border rounded-3xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 group transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-bg-secondary rounded-2xl flex items-center justify-center text-text-primary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="font-display font-medium text-lg text-text-primary">{subject}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {quizState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-8"
            >
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-secondary">
                  <span>Question {currentQuestionIndex + 1} of {currentMCQs.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / currentMCQs.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / currentMCQs.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-[3rem] border border-border shadow-soft p-8 md:p-12 space-y-10">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-text-primary leading-tight">
                  {currentMCQs[currentQuestionIndex].question}
                </h3>

                <div className="grid gap-4">
                  {currentMCQs[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = userAnswers[currentQuestionIndex] === idx;
                    const isCorrect = idx === currentMCQs[currentQuestionIndex].correctAnswer;
                    const hasAnswered = userAnswers[currentQuestionIndex] !== undefined;

                    let statusClasses = "border-border hover:border-primary/40";
                    if (hasAnswered) {
                      if (isCorrect) statusClasses = "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-100";
                      else if (isSelected) statusClasses = "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100";
                      else statusClasses = "border-border opacity-50";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full flex items-center justify-between p-6 rounded-2xl border text-left transition-all relative ${statusClasses}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isSelected ? 'bg-primary text-white' : 'bg-bg-secondary text-text-secondary'}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="font-serif italic text-lg">{option}</span>
                        </div>
                        {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-8 border-t border-border overflow-hidden"
                    >
                      <div className="bg-primary/5 rounded-3xl p-6 space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <HelpCircle className="w-4 h-4" />
                          <span className="text-xs font-black uppercase tracking-widest">Logic & Insight</span>
                        </div>
                        <p className="text-text-primary font-serif italic leading-relaxed">
                          {currentMCQs[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-end gap-4">
                {userAnswers[currentQuestionIndex] !== undefined && (
                  <button
                    onClick={nextQuestion}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                  >
                    {currentQuestionIndex === currentMCQs.length - 1 ? 'See Results' : 'Next Question'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {quizState === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-center py-12"
            >
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-8">
                <Award className="w-12 h-12" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Session <span className="text-accent underline decoration-accent/30 underline-offset-8">Complete</span></h2>
                <p className="text-text-secondary font-serif italic text-xl">Review your performance stats below.</p>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="p-6 bg-white rounded-3xl border border-border shadow-soft">
                  <div className="text-3xl font-display text-primary mb-1">{calculateScore()}/{currentMCQs.length}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-text-secondary">Score</div>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-border shadow-soft">
                  <div className="text-3xl font-display text-primary mb-1">{Math.round((calculateScore() / currentMCQs.length) * 100)}%</div>
                  <div className="text-xs font-black uppercase tracking-widest text-text-secondary">Accuracy</div>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-border shadow-soft">
                  <div className="text-3xl font-display text-primary mb-1">{formatTime(timer)}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-text-secondary">Time taken</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => startQuiz(selectedSubject || 'Materia Medica')}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                >
                  Retake Subject <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setQuizState('lobby')}
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-primary text-primary rounded-2xl font-black uppercase tracking-widest hover:bg-primary/5 transition-all"
                >
                  Change Subject
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
