import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Stethoscope, Lightbulb, ChevronLeft, ArrowRight, Brain } from 'lucide-react';
import SEO from '../components/SEO';
import AssessmentQuiz from '../components/AssessmentQuiz';

const QUIZ_CATEGORIES = [
  {
    id: 'principles',
    title: 'Homoeopathic Principles',
    description: 'Master the core laws and philosophy of classical homoeopathy.',
    icon: Lightbulb,
    color: 'emerald',
    questions: [
      {
        id: 1,
        question: "What does 'Similia Similibus Curentur' translate to?",
        options: ["Like cures like", "The law of opposites", "Nature's way of healing", "Healing through prayer"],
        correct: 0,
        explanation: "This is the cornerstone of Homoeopathy, meaning a substance that causes symptoms in a healthy person can cure a sick person with those same symptoms."
      },
      {
        id: 2,
        question: "Which of these is NOT one of the 'Three Pillars' of Homoeopathy?",
        options: ["Law of Similars", "Single Remedy", "Minimum Dose", "Maximum Suppression"],
        correct: 3,
        explanation: "Homoeopathy avoids suppression, focusing instead on stimulation of the vital force using the smallest necessary dose of a single remedy."
      },
      {
        id: 3,
        question: "What is the 'Vital Force' in homoeopathic philosophy?",
        options: ["A muscular strength indicator", "The spiritual energy that animates the material body", "A type of physical exercise", "The chemical reaction of digestion"],
        correct: 1,
        explanation: "Hahnemann defined the Vital Force as the dynamic, spiritual power that maintains harmony and health in the living organism."
      }
    ]
  },
  {
    id: 'remedies',
    title: 'Materia Medica Basics',
    description: 'Test your knowledge on common remedies and their key signatures.',
    icon: BookOpen,
    color: 'amber',
    questions: [
      {
        id: 1,
        question: "Which remedy is commonly used for injuries with bruising and soreness, often called 'the first-aid remedy'?",
        options: ["Aconite", "Arnica Montana", "Belladonna", "Sulphur"],
        correct: 1,
        explanation: "Arnica is the primary remedy for trauma, bruising, and that 'sore, lame, bruised' feeling after an injury."
      },
      {
        id: 2,
        question: "A patient feels 'worse from movement' and 'better from firm pressure and lying on the painful side'. Which remedy is likely?",
        options: ["Rhus Tox", "Pulsatilla", "Bryonia Alba", "Arsenicum"],
        correct: 2,
        explanation: "Bryonia is characterized by extreme aggravation from even the slightest movement and relief from absolute rest and pressure."
      },
      {
        id: 3,
        question: "Which remedy is known for symptoms that come on suddenly, with high fever, redness, and heat, often after exposure to cold wind?",
        options: ["Aconitum Napellus", "Silicea", "Calcarea Carb", "Lycopodium"],
        correct: 0,
        explanation: "Aconite is the remedy for 'sudden storms'—acute illnesses that appear rapidly with great intensity and anxiety."
      }
    ]
  },
  {
    id: 'symptoms',
    title: 'Symptom Identification',
    description: 'Learn to recognize characteristic symptoms for accurate remedy selection.',
    icon: Stethoscope,
    color: 'blue',
    questions: [
      {
        id: 1,
        question: "In homoeopathic terms, what is a 'Concomitant' symptom?",
        options: ["The most painful symptom", "A symptom that occurs alongside the main complaint but is unrelated", "A symptom that happens only at night", "A symptom that everyone else in the family has"],
        correct: 1,
        explanation: "Concomitants are 'attendant' symptoms that occur simultaneously with the chief complaint but have no physiological link, making them highly individualizing."
      },
      {
        id: 2,
        question: "If a patient's symptoms are 'Better in open air' and 'Worse in a warm room', this is an example of a:",
        options: ["Mental symptom", "Causation", "Modality", "Objective sign"],
        correct: 2,
        explanation: "Modalities describe the circumstances (time, position, temperature, etc.) that modify the intensity of a symptom."
      },
      {
        id: 3,
        question: "A 'Keynote' symptom is defined as:",
        options: ["A very loud symptom", "A common symptom of a disease", "A unique, characteristic feature of a remedy", "The first symptom the patient mentions"],
        correct: 2,
        explanation: "Keynotes are the hallmark features of a remedy that immediately point the practitioner toward its selection."
      }
    ]
  }
];

export default function Quizzes() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const currentQuiz = QUIZ_CATEGORIES.find(q => q.id === activeQuiz);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Interactive Quizzes - Curiva Homoeopathy"
        description="Test your homoeopathic knowledge with our interactive quizzes on principles, remedies, and symptoms."
      />

      <div className="max-w-4xl mx-auto px-4 pt-12">
        <AnimatePresence mode="wait">
          {!activeQuiz ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-display font-black text-text-primary uppercase tracking-tight italic">
                  Interactive <span className="text-primary underline decoration-primary/30 underline-offset-8">Knowledge</span> Hub
                </h1>
                <p className="text-xl text-text-secondary font-serif italic max-w-2xl mx-auto leading-relaxed">
                  Refine your understanding of the healing arts through our curated assessment modules.
                </p>
              </div>

              <div className="grid gap-6">
                {QUIZ_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveQuiz(category.id)}
                    className="group bg-bg-secondary p-8 rounded-[2.5rem] border border-border hover:border-primary transition-all text-left flex items-center justify-between shadow-soft hover:shadow-xl"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`p-5 bg-primary/10 rounded-3xl text-primary group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">{category.title}</h3>
                        <p className="text-text-secondary text-sm font-medium mt-1">{category.description}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-bg-primary border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Brain className="w-10 h-10" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-xl font-display font-bold text-text-primary">Ready for a deeper challenge?</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Our AI-powered assessment engine can generate custom mock exams for BHMS students and AIAPGET aspirants.
                  </p>
                </div>
                <button className="whitespace-nowrap px-8 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-transform uppercase tracking-widest text-xs ml-auto shadow-xl shadow-primary/20">
                  Advanced MCQ Arena
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <button
                onClick={() => setActiveQuiz(null)}
                className="flex items-center gap-2 text-text-secondary hover:text-primary font-black uppercase tracking-[0.2em] text-[10px] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Categories
              </button>
              
              {currentQuiz && (
                <AssessmentQuiz 
                  questions={currentQuiz.questions}
                  title={currentQuiz.title}
                  subtitle="Self-Guided Assessment"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
