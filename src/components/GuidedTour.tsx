import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Map, BookOpen, Compass, ArrowRight, ArrowLeft } from 'lucide-react';

export default function GuidedTour() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

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
      desc: "Sign in to save your favorite research nodes and create personalized learning paths.",
      icon: Compass,
      color: "bg-amber-500"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setDirection(1);
      setStep(prev => prev + 1);
    } else {
      closeTour();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const handleJumpToSlide = (idx: number) => {
    setDirection(idx > step ? 1 : -1);
    setStep(idx);
  };

  const closeTour = () => {
    setIsVisible(false);
    localStorage.setItem('curiva_tour_seen', 'true');
  };

  if (!isVisible) return null;

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  // Slide transition variants for the carousel
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-bg-primary border border-border rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        <button 
          onClick={closeTour}
          className="absolute top-6 right-6 p-2 text-text-secondary hover:text-primary transition-colors z-20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 pb-6 overflow-hidden">
          {/* Animated Carousel Viewport */}
          <div className="relative min-h-[220px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 ${currentStep.color} text-white rounded-2xl shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[9px] font-extrabold text-primary uppercase tracking-[0.2em] opacity-80">
                      Feature {step + 1} of {steps.length}
                    </div>
                    {/* Smaller Title size for the guided tour */}
                    <h3 className="text-lg font-display font-bold text-text-primary uppercase tracking-tight italic">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                {/* Smaller description text size for easy scannability and compact visual design */}
                <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed leading-normal">
                  {currentStep.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Interactive Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {steps.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => handleJumpToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === step ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-primary/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Actions */}
        <div className="p-6 bg-bg-secondary flex gap-4 border-t border-border/40">
          <button 
            onClick={handlePrev}
            disabled={step === 0}
            className={`flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
              step === 0 
                ? 'opacity-40 cursor-not-allowed text-text-tertiary' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white border border-border'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Prev
          </button>
          
          <button 
            onClick={handleNext}
            className="flex-[1.5] py-3 bg-primary text-white text-xs font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {step === steps.length - 1 ? 'Explore Curiva' : 'Next'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
