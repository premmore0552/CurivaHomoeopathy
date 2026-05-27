import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Activity, BookOpen, GraduationCap, HelpCircle, Users, ShoppingBag, Sparkles, ShieldCheck, History, Award, Network, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import FeaturedArticles from '../components/FeaturedArticles';
import FeaturedQuestions from '../components/FeaturedQuestions';
import SEO from '../components/SEO';
import { BlogPost } from '../types';

const funnelSteps = [
  {
    id: 'organon',
    title: 'The Foundation',
    subtitle: 'Organon of Medicine',
    description: 'Master the logic and philosophy of homoeopathy. Explore 291 aphorisms with historical context and clinical insights.',
    icon: GraduationCap,
    link: '/glossary/philosophy',
    color: 'bg-primary'
  },
  {
    id: 'materia-medica',
    title: 'The Database',
    subtitle: 'Clinical Materia Medica',
    description: 'A comprehensive alphabetical index of remedies. Precise indications, keynotes, and clinical modalities.',
    icon: BookOpen,
    link: '/glossary/all',
    color: 'bg-accent'
  },
  {
    id: 'repertory',
    title: 'The Analysis',
    subtitle: 'Interactive Repertory',
    description: 'Dynamic symptom-to-remedy mapping. Filter thousands of clinical indications to find the most accurate medicinal match.',
    icon: Activity,
    link: '/repertory',
    color: 'bg-emerald-600'
  },
  {
    id: 'relationships',
    title: 'The Mapping',
    subtitle: 'Remedy Relationships',
    description: "Visualize 'Complementary', 'Inimical', and 'Antidotal' networks. Refine your long-term clinical strategy.",
    icon: Network,
    link: '/relationships',
    color: 'bg-indigo-600'
  },
  {
    id: 'mcq-practice',
    title: 'The Evaluation',
    subtitle: 'Competitive MCQs',
    description: 'Prepare for AIAPGET and competitive exams with 10,000+ targeted MCQs. Simulate exam conditions with timed sessions.',
    icon: Zap,
    link: '/mcq-practice',
    color: 'bg-orange-600'
  }
];

export default function Home() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/read/${post.slug}`);
  };

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <SEO 
        title="Curiva Homoeopathy | Precision Learning & Clinical Excellence"
        description="The ultimate funnel for homoeopathic mastery. From Organon principles to Materia Medica depth and historical stalwarts."
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-bg-primary"
      >
        <Hero />

        {/* Funnel Section */}
        <section className="py-24 md:py-32 relative overflow-hidden bg-bg-secondary/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent hidden md:block" />
          
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-3 h-3" /> Professional Standards
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-display font-medium text-text-primary tracking-tight leading-[0.9]">
                Evidence-Based <br/> <span className="text-primary italic">Intelligence</span>
              </h2>
            </div>

            <div className="space-y-32 md:space-y-64">
              {funnelSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative group cursor-pointer">
                      <div className={`absolute -inset-4 ${step.color} opacity-0 group-hover:opacity-5 rounded-[4rem] transition-opacity duration-500`} />
                      <div className="p-12 bg-bg-primary rounded-[3rem] border border-border shadow-soft relative">
                         <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-xl`}>
                           <step.icon className="w-10 h-10 text-white" />
                         </div>
                         <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">{step.title}</div>
                         <h3 className="text-4xl md:text-5xl font-display font-medium text-text-primary mb-6 italic tracking-tight leading-none">
                           {step.subtitle}
                         </h3>
                         <p className="text-xl text-text-secondary leading-relaxed mb-10 font-serif italic">
                           {step.description}
                         </p>
                         <Link 
                          to={step.link}
                          className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
                         >
                           Enter Domain <ArrowRight className="w-4 h-4" />
                         </Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-full md:w-1/2 relative lg:px-20 text-center">
                    <div className="text-[12rem] font-display italic font-light text-primary/5 select-none">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        <section className="py-24">
          <FeaturedQuestions />
        </section>

        <section className="py-24">
          <FeaturedArticles onSelectPost={handleSelectPost} />
        </section>
      </motion.div>
    </>
  );
}
