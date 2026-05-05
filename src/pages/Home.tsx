import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Activity, BookOpen, GraduationCap, HelpCircle, Users, ShoppingBag } from 'lucide-react';
import Hero from '../components/Hero';
import FeaturedArticles from '../components/FeaturedArticles';
import { InstagramFeed } from '../components/InstagramFeed';
import AboutSection from '../components/AboutSection';
import SEO from '../components/SEO';
import Newsletter from '../components/Newsletter';
import { BlogPost } from '../types';

const entryPoints = [
  {
    title: 'Explore Symptoms',
    description: 'Understand the "fingerprints" of health conditions through our pattern-based clinical guides.',
    icon: Activity,
    link: '/explore-symptoms',
    color: 'text-primary'
  },
  {
    title: 'Resource Vault',
    description: 'Get exclusive access to high-yield clinical guides, research papers, and curated study notes.',
    icon: ShoppingBag,
    link: '/marketplace',
    color: 'text-emerald-500',
    isNew: true
  },
  {
    title: 'Organon of Medicine',
    description: 'The foundation of Homoeopathic logic, principles, and the Law of Similars.',
    icon: GraduationCap,
    link: '/organon-philosophy',
    color: 'text-primary'
  },
  {
    title: 'Our Story',
    description: 'From humble beginnings to a global mission of Tiny Doses and True Shifts.',
    icon: Users,
    link: '/about-us',
    color: 'text-amber-500'
  }
];

export default function Home() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/read/${post.slug}`);
  };

  useEffect(() => {
    if (hash === '#about') {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <SEO 
        title="Curiva Homoeopathy | Evidence-Based Holistic Healing & Research Insights"
        description="Explore the world of homoeopathy through pattern-based research guides, Materia Medica deep-dives, and peer-curated educational resources."
        keywords="homoeopathy, research insights, materia medica, natural healing, academic study, holistic health, curiva"
      />
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-primary transition-colors duration-300"
    >
        <Hero />
        
        <div className="relative overflow-hidden">
          <FeaturedArticles onSelectPost={handleSelectPost} />
        </div>
        
        <AboutSection />

        {/* Global Entry Grid Section */}
        <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary mb-6 tracking-tight">
              Master the <span className="text-primary italic">Science</span>
            </h2>
            <p className="text-xl text-text-secondary font-medium">
              Comprehensive tools designed for practitioners, students, and curious minds.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {entryPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-10 bg-bg-secondary rounded-[3rem] border border-border hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(45,108,223,0.1)] transition-all duration-500 flex flex-col"
              >
                {point.isNew && (
                  <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full shadow-lg shadow-primary/20 animate-pulse">
                    NEW Addition
                  </div>
                )}
                <Link to={point.link} className="block h-full flex flex-col">
                  <div className={`w-20 h-20 bg-bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-10 ${point.color} group-hover:scale-110 transition-transform duration-500`}>
                    <point.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-black text-text-primary mb-5 group-hover:text-primary transition-colors leading-tight">
                    {point.title}
                  </h3>
                  <p className="text-lg text-text-secondary mb-10 leading-relaxed font-medium opacity-80 flex-grow">
                    {point.description}
                  </p>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] group-hover:gap-5 transition-all mt-auto pb-2">
                    Enter <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <Newsletter />

        <InstagramFeed />
        
        {/* Support Entry Section */}
        <section className="py-32 bg-text-primary text-bg-primary transition-colors duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 text-center relative z-10"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-bg-primary/10 rounded-3xl backdrop-blur-xl border border-white/10">
                <HelpCircle className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-8 tracking-tight">
              Shape the <span className="text-primary italic">Future</span> of Curiva
            </h2>
            <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto font-medium">
              We're building this for the homoeopathic community. Your feedback helps us curate the most relevant clinical data.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/feedback"
                className="px-12 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Submit Feedback
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/faq"
                className="px-12 py-5 bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center"
              >
                Help Center
              </Link>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}
