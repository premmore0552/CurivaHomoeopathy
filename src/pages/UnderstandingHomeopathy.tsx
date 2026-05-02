import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Brain, User, Target, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import PotencyChart from '../components/PotencyChart';
import AssessmentQuiz from '../components/AssessmentQuiz';

const UnderstandingHomeopathy: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <SEO 
        title="Understanding Homeopathy | Curiva" 
        description="Learn the basics of homeopathy, including modalities and the principle of individualization."
      />
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-text-primary mb-6"
          >
            The Art of <span className="text-primary italic">Individualization</span>
          </motion.h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Homeopathy is more than just natural remedies; it's a precise science of matching patterns to the person, not just the disease.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <section id="basics" className="bg-bg-secondary p-10 rounded-[3rem] border border-border space-y-6">
            <div className="p-4 bg-primary text-white rounded-2xl w-fit shadow-lg shadow-primary/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary italic">Basics</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              Homeopathy is based on the principle of "Like Cures Like". A substance that can cause symptoms in a healthy person can, in minute doses, stimulate the body to heal similar symptoms.
            </p>
          </section>

          <section id="modalities" className="bg-bg-secondary p-10 rounded-[3rem] border border-border space-y-6">
            <div className="p-4 bg-accent text-white rounded-2xl w-fit shadow-lg shadow-accent/20">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary italic">Modalities</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              What makes your symptom unique? Better from warmth? Worse from movement? These "Modalities" are the fingerprints that lead us to the correct remedy match.
            </p>
          </section>

          <section id="individualization" className="bg-bg-secondary p-10 rounded-[3rem] border border-border space-y-6">
            <div className="p-4 bg-primary-light text-white rounded-2xl w-fit shadow-lg shadow-primary-light/20">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary italic">Individualization</h2>
            <p className="text-text-secondary leading-relaxed text-sm">
              Two people with the same headache might need different remedies because their emotional state and physical reactions differ. We treat the person, not the label.
            </p>
          </section>
        </div>

        {/* Deep Dive */}
        <div className="mb-32">
          <div className="bg-white rounded-[4rem] border border-border p-12 md:p-20 mb-12 relative overflow-hidden group shadow-soft">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl transition-all group-hover:bg-primary/10" />
             
             <div className="max-w-3xl space-y-12 relative z-10">
                <div>
                  <h3 className="text-3xl font-black text-text-primary mb-6 italic underline decoration-accent decoration-4 underline-offset-8">Wait, how does it work?</h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    Homeopathy stimulates the body's own "Vital Force". By introducing a highly diluted substance that mirrors the symptom pattern, we provide the body with the necessary information to trigger its own self-recovery mechanism.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="font-bold text-primary">Gentle Action</h4>
                    <p className="text-sm text-text-secondary">Non-toxic and without common side effects when used correctly.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-primary">Holistic View</h4>
                    <p className="text-sm text-text-secondary">Considers physical, emotional, and mental symptoms together.</p>
                  </div>
                </div>
             </div>
          </div>
          <AssessmentQuiz />
        </div>

        <div className="mb-32">
          <PotencyChart />
        </div>

        {/* Soft Recommendation Footer */}
        <div className="bg-bg-secondary p-12 rounded-[3.5rem] border border-border text-center space-y-6">
          <p className="text-xl font-bold text-text-primary max-w-2xl mx-auto italic">
            "We believe in empowering users through academic research and symptom pattern awareness."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/topics"
              className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Explore Research Database
            </Link>
            <Link 
              to="/guidance"
              className="px-8 py-4 bg-white border border-border text-text-primary font-bold rounded-2xl hover:border-primary transition-all"
            >
              Submit Research Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingHomeopathy;
