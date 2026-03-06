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
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                About <span className="text-primary">Curiva Homoeopathy</span>
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Curiva Homoeopathy is dedicated to spreading awareness about the profound healing power of homoeopathy. 
              We bridge the gap between traditional wisdom and modern health education, providing resources that empower 
              individuals to take control of their wellness naturally.
            </p>
            
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
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
              
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-8 border-soft-beige">
                <img
                  src="https://picsum.photos/seed/curiva-about/600/800"
                  alt="Curiva Homoeopathy Philosophy"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-gray-100 max-w-[200px]">
                <p className="text-primary font-serif italic text-lg mb-2">"Tiny Doses. True Shifts."</p>
                <p className="text-xs text-gray-500">Our core philosophy for lasting health.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
