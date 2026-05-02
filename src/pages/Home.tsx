import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Activity, BookOpen, GraduationCap, HelpCircle, Users } from 'lucide-react';
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
    title: 'Health Articles',
    description: 'Deep dives into Materia Medica, patient case studies, and holistic health research.',
    icon: BookOpen,
    link: '/learn',
    color: 'text-emerald-500'
  },
  {
    title: 'Organon of Medicine',
    description: 'The foundation of Homoeopathic logic, principles, and the Law of Similars.',
    icon: GraduationCap,
    link: '/organon',
    color: 'text-primary'
  },
  {
    title: 'Our Story',
    description: 'From humble beginnings to a global mission of Tiny Doses and True Shifts.',
    icon: Users,
    link: '/our-story',
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
        
        <FeaturedArticles onSelectPost={handleSelectPost} />
        
        <AboutSection />

        <Newsletter />

        <InstagramFeed />
        
        {/* Simple Entry Grid Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {entryPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -5, rotateX: 5, rotateY: 5, scale: 1.05 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="group p-10 bg-bg-secondary rounded-[2.5rem] border border-border hover:border-primary/20 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <Link to={point.link} className="block transition-transform duration-500 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className={`w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm mb-8 ${point.color}`}>
                    <point.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {point.title}
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed flex-grow">
                    {point.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all mt-auto">
                    Enter Section <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Support Entry Section */}
        <section className="py-24 bg-bg-secondary border-y border-border transition-colors duration-300">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="p-3 bg-primary/10 rounded-full"
              >
                <HelpCircle className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
              Have Feedback or Content Suggestions?
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Browse our <Link to="/faq" className="text-primary font-bold hover:underline">Knowledge Base</Link> for common questions, or help us improve this resource by providing content corrections.
            </p>
            <Link 
              to="/guidance"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group"
            >
              Submit Feedback
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}
