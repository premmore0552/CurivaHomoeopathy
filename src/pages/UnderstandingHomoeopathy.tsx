import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Brain, User, Target, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import PotencyChart from '../components/PotencyChart';
import AssessmentQuiz from '../components/AssessmentQuiz';

const UnderstandingHomoeopathy: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-16 transition-colors duration-300">
      <SEO 
        title="Understanding Homoeopathy | Academic & Clinical Study Center" 
        description="Learn the three core laws of Homoeopathy, explore disease patterns like Allergic Rhinitis, and understand individualization."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-12 border-b border-border pb-8">
          <span className="font-mono text-xs tracking-widest uppercase text-text-secondary block mb-3">[01] Curiva Homoeopathy</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal text-text-primary leading-[0.95] tracking-tight">
            Understanding<br />Homoeopathy
          </h1>
        </header>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Workspace Column */}
          <main className="lg:col-span-8 space-y-16">
            
            {/* Introductory Statement */}
            <section className="border-l-2 border-accent pl-6 md:pl-8 py-2">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-display italic">
                Homoeopathy is more than just natural remedies; it's a precise science of matching complex symptom patterns to the individual, rather than prescribing solely for a general disease label.
              </p>
            </section>

            {/* Three Core Laws */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary">Three Core Laws</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border p-6 md:p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-accent">
                  <span className="font-mono text-[10px] text-accent tracking-widest block mb-4">[Law 01]</span>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-3">Law of Similars</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    "Like Cures Like". A substance that causes symptoms in healthy individuals can cure those same symptoms in the sick.
                  </p>
                </div>

                <div className="border border-border p-6 md:p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-accent">
                  <span className="font-mono text-[10px] text-accent tracking-widest block mb-4">[Law 02]</span>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-3">Individualization</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    We treat the patient, not just the disease. Each remedy is selected based on the total unique symptom profile.
                  </p>
                </div>

                <div className="border border-border p-6 md:p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:border-accent">
                  <span className="font-mono text-[10px] text-accent tracking-widest block mb-4">[Law 03]</span>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-3">Minimum Dose</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Dilution and potentization unlock the medicinal properties while removing physical toxicity.
                  </p>
                </div>
              </div>
            </section>

            {/* Featured Case Analysis / Disease Pattern */}
            <section className="border border-border bg-white dark:bg-zinc-900/80 p-8 md:p-10 shadow-soft relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-accent/10" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-3">[Featured Case Analysis]</span>
              <h3 className="font-display text-3xl font-medium text-text-primary mb-4">Allergic Rhinitis</h3>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                Allergic rhinitis is an inflammation of the nasal passages caused by an overreaction of the immune system to environmental allergens. In homoeopathy, we evaluate specific modalities—such as whether symptoms improve in open air or warm rooms—to select the exact pattern match.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs tracking-wider uppercase bg-bg-primary border border-border px-4 py-2 text-text-primary hover:border-accent transition-colors">Allium Cepa</span>
                <span className="font-mono text-xs tracking-wider uppercase bg-bg-primary border border-border px-4 py-2 text-text-primary hover:border-accent transition-colors">Arsenicum Album</span>
              </div>
            </section>

            {/* Assessment Pattern Matcher Quiz */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary">Interactive Pattern Matcher</h2>
              </div>
              <AssessmentQuiz />
            </section>

            {/* Potency & Scale Selection Charts */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary">Potency & Scale Selection</h2>
              </div>
              <PotencyChart />
            </section>

            {/* Soft Recommendation Block */}
            <section className="border border-border p-10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm text-center space-y-6">
              <p className="text-lg md:text-xl font-display italic text-text-primary max-w-2xl mx-auto">
                "We believe in empowering homeopathic students, practitioners, and patients through rigorous clinical analysis and pattern awareness."
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link 
                  to="/topics"
                  className="px-6 py-3 bg-secondary text-white font-mono text-xs tracking-wider uppercase transition-all hover:bg-secondary/90 hover:scale-[1.02]"
                >
                  Explore Research Database
                </Link>
                <Link 
                  to="/guidance"
                  className="px-6 py-3 bg-bg-primary border border-border text-text-primary font-mono text-xs tracking-wider uppercase transition-all hover:border-accent"
                >
                  Submit Feedback
                </Link>
              </div>
            </section>

          </main>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Clinical Guides Block */}
            <div className="border border-border bg-accent text-white p-8 space-y-6 relative overflow-hidden">
              <span className="font-mono text-xs tracking-widest uppercase text-white/80 block">[Publications]</span>
              <h3 className="font-display text-3xl font-medium text-white leading-tight">Clinical Guides</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Read our latest evidence-based publications on common health patterns, homeopathic pharmacy, and standard therapeutics.
              </p>
              <Link 
                to="/topics" 
                className="inline-block w-full text-center bg-[#1D1818] text-white font-mono text-xs tracking-widest uppercase py-4 transition-colors hover:bg-[#2D2525]"
              >
                View Library
              </Link>
            </div>

            {/* Scientific Foundations Info Card */}
            <div className="border border-border p-8 space-y-4 bg-white/20 dark:bg-zinc-900/20">
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary block">[Study Methods]</span>
              <h4 className="font-display text-xl font-semibold text-text-primary">Vital Force Dynamics</h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                Homoeopathy stimulates the body's internal self-regulation. By introducing dynamic remedies, we trigger the intrinsic physiological recovery pathways.
              </p>
            </div>

            {/* Academic Disclaimer */}
            <div className="border border-border/80 p-8 space-y-3 bg-white/5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-secondary block">[Disclaimer]</span>
              <p className="text-text-secondary text-xs leading-relaxed">
                Curiva Homoeopathy is built strictly for academic purposes, student instruction, and clinical study. Always consult a certified homeopathic practitioner or professional physician for any clinical health concerns.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingHomoeopathy;
