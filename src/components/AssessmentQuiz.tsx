import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, RefreshCcw, HelpCircle, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_DATA: Question[] = [
  {
    id: 1,
    question: "What is the primary principle of Homeopathy as defined by Samuel Hahnemann?",
    options: [
      "The law of opposites",
      "Similia Similibus Curentur (Like cures like)",
      "High dose chemical stimulation",
      "Symptom suppression"
    ],
    correct: 1,
    explanation: "Samuel Hahnemann established that a substance which can produce symptoms in a healthy person can cure those same symptoms in a sick person."
  },
  {
    id: 2,
    question: "What are 'Modalities' in homeopathic case-taking?",
    options: [
      "The price of the remedy",
      "Factors that make a symptom better or worse",
      "The color of the pills",
      "The duration of the treatment"
    ],
    correct: 1,
    explanation: "Modalities (Better from cold, worse from movement, etc.) are crucial individualizing features used to select the correct remedy."
  },
  {
    id: 3,
    question: "Which potency scale uses a 1:50,000 dilution ratio?",
    options: [
      "Centesimal (C)",
      "Decimal (X)",
      "LM Potency",
      "Q Potency"
    ],
    correct: 2,
    explanation: "LM (Quinquagintamillesimal) potencies use a 1:50,000 ratio and are known for their gentle and deep-acting effects."
  }
];

export default function AssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === QUIZ_DATA[currentStep].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep < QUIZ_DATA.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="bg-bg-secondary p-8 md:p-12 rounded-[3.5rem] border border-border shadow-soft relative overflow-hidden">
      <div className="relative z-10">
        {!showResults ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-text-primary uppercase tracking-tight">Clinical <span className="text-primary">Self-Assessment</span></h3>
                  <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Knowledge Verification Module</p>
                </div>
              </div>
              <div className="text-sm font-black text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                {currentStep + 1} / {QUIZ_DATA.length}
              </div>
            </div>

            <div className="min-h-[100px]">
              <h4 className="text-2xl md:text-3xl font-display font-bold text-text-primary leading-tight lowercase first-letter:uppercase">
                {QUIZ_DATA[currentStep].question}
              </h4>
            </div>

            <div className="grid gap-3">
              {QUIZ_DATA[currentStep].options.map((option, idx) => {
                let statusClass = 'border-border bg-bg-primary hover:border-primary/50';
                if (isAnswered) {
                  if (idx === QUIZ_DATA[currentStep].correct) {
                    statusClass = 'border-green-500 bg-green-500/10 text-green-700';
                  } else if (idx === selectedOption) {
                    statusClass = 'border-red-500 bg-red-500/10 text-red-700';
                  } else {
                    statusClass = 'border-border bg-bg-primary opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-5 rounded-2xl border text-left font-bold transition-all flex items-center justify-between group ${statusClass}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === QUIZ_DATA[currentStep].correct && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-6 bg-primary/5 rounded-3xl border border-primary/10"
                >
                  <p className="text-sm text-text-secondary leading-relaxed first-letter:font-black first-letter:text-primary">
                    <span className="font-bold text-primary italic mr-2">Explanation:</span>
                    {QUIZ_DATA[currentStep].explanation}
                  </p>
                  <button
                    onClick={nextQuestion}
                    className="mt-6 flex items-center gap-2 px-8 py-3 bg-primary text-white font-black rounded-xl hover:scale-105 transition-transform uppercase tracking-widest text-xs ml-auto"
                  >
                    {currentStep < QUIZ_DATA.length - 1 ? 'Next Question' : 'View Results'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-10 space-y-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <Trophy className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-4xl font-display font-black text-text-primary uppercase tracking-tight italic">
                {score === QUIZ_DATA.length ? 'Perfect Score!' : 'Well Done!'}
              </h3>
              <p className="text-text-secondary font-medium mt-2">
                You scored <span className="text-primary font-black text-2xl">{score}</span> out of {QUIZ_DATA.length} correctly.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-transform uppercase tracking-[0.15em] text-sm shadow-xl shadow-primary/20"
              >
                <RefreshCcw className="w-5 h-5" /> Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
