import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, ShieldCheck, Info } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Holistic Approach",
      description: "We focus on treating the whole person, not just the symptoms, using gentle homoeopathic principles."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Focus",
      description: "Our mission is to provide in-depth, evidence-based knowledge for students and practitioners."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Safe & Natural",
      description: "Promoting remedies that are non-toxic, safe for all ages, and support the body's natural healing."
    }
  ];

  return (
    <section id="about" className="py-24 bg-bg-primary dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 mb-8">
              <div className="mednix-section-subtitle">
                <Info className="w-3.5 h-3.5 text-primary" /> BHMS Student Resource
              </div>
              <h2 className="mednix-section-title">
                About <span className="text-primary italic">Curiva</span>
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed font-medium">
              Curiva is an educational project dedicated to spreading awareness about the profound healing patterns of homoeopathy. 
              We bridge traditional research with modern wellness literacy, offering a student-curated repository for holistic study.
            </p>
            
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex gap-4 group"
                >
                  <div className="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{feature.title}</h3>
                    <p className="text-text-secondary text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              Learn more about our mission
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 lg:mt-0 relative"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
              
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-border">
                <img
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Curiva Homoeopathy Philosophy"
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-bg-primary p-6 rounded-2xl shadow-xl hidden md:block border border-border max-w-[240px]">
                <p className="text-primary font-serif italic text-xl mb-3">"Tiny Doses. True Shifts."</p>
                <p className="text-sm text-text-secondary">Our core philosophy for discovering lasting, natural health.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
