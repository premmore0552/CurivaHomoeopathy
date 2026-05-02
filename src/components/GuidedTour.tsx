import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Map, BookOpen, Compass, ArrowRight } from 'lucide-react';

export default function GuidedTour() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('curiva_tour_seen');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps = [
    {
      title: "Welcome to Curiva Research",
      desc: "Our database is now built as an interactive Research Database. Discover deep connections between remedies and clinical patterns.",
      icon: Sparkles,
      color: "bg-primary"
    },
    {
      title: "Interactive Mind Maps",
      desc: "Explore clinical categories visually. Zoom, pan, and click nodes to see summaries and detailed academic research.",
      icon: Map,
      color: "bg-blue-500"
    },
    {
      title: "Expert Curation",
      desc: "Each node is backed by academic homeopathic research, curated for academic awareness and peer-level education.",
      icon: BookOpen,
      color: "bg-emerald-500"
    },
    {
      title: "Google Integration",
      desc: "Sign in to save your favorite research nodes and create personalized learning paths (Coming soon).",
      icon: Compass,
      color: "bg-amber-500"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      closeTour();
    }
  };

  const closeTour = () => {
    setIsVisible(false);
    localStorage.setItem('curiva_tour_seen', 'true');
  };

  if (!isVisible) return null;

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-bg-primary border border-border rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        <button 
          onClick={closeTour}
          className="absolute top-6 right-6 p-2 text-text-secondary hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pb-4">
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-4 ${currentStep.color} text-white rounded-3xl shadow-lg ring-8 ring-white dark:ring-bg-secondary`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">Step {step + 1} of {steps.length}</div>
              <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tighter italic">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <p className="text-lg text-text-secondary font-medium leading-relaxed mb-8">
            {currentStep.desc}
          </p>

          <div className="flex items-center gap-2 mb-10">
            {steps.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === step ? 'w-8 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8 bg-bg-secondary flex gap-4">
          <button 
            onClick={closeTour}
            className="flex-1 py-4 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Skip Tour
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {step === steps.length - 1 ? 'Get Started' : 'Next Step'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
