import React from 'react';
import { motion } from 'motion/react';
import { Heart, Target, Lightbulb, Sparkles, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

const values = [
  {
    title: 'Authenticity',
    description: 'We present homoeopathy as it was meant to be—deep, constitutional, and individualized.',
    icon: Shield,
    color: 'bg-blue-500'
  },
  {
    title: 'Education',
    description: 'Empowering individuals with knowledge to take charge of their own health journey.',
    icon: Lightbulb,
    color: 'bg-amber-500'
  },
  {
    title: 'Compassion',
    description: 'Every shift in health, no matter how small, is a victory for the human spirit.',
    icon: Heart,
    color: 'bg-rose-500'
  }
];

export default function About() {
  return (
    <div className="bg-bg-primary transition-colors duration-300">
      <SEO 
        title="Our Story | Curiva Homoeopathy" 
        description="The story behind Curiva: Bridging traditional homoeopathic wisdom with modern wellness for a healthier world."
      />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-12 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none -skew-x-12 transform origin-top" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <Logo size="lg" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-7xl font-display font-extrabold text-text-primary mb-8 tracking-tight"
          >
            Tiny Doses. <span className="text-primary italic">True Shifts.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-medium"
          >
            Born from a passion for holistic healing, Curiva is a mission-driven platform dedicated to the art and science of classical Homoeopathy.
          </motion.p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-lg md:prose-xl max-w-none text-text-secondary space-y-12 dark:prose-invert"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Where We Began</h2>
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 rounded-lg">
              BHMS Student Project
            </div>
            <p className="leading-relaxed">
              Curiva Homoeopathy started as a simple research project: in a world filled with suppressive treatments and "quick fixes," the gentle, deep-reaching wisdom of classical homoeopathy was often misunderstood. We saw a need for an educational space that honored the foundations laid by Dr. Samuel Hahnemann while speaking to the academic wellness seekers of today.
            </p>
            <p className="leading-relaxed">
              Our journey is about more than just managing symptoms. It's about witnessing the profound transformation that occurs when the body's vital force is gently aligned. We call these <strong>True Shifts</strong>—the moment when a "tiny dose" triggers a permanent return to balance.
            </p>
          </div>

          <div className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10 relative group">
            <div className="absolute top-0 right-0 p-8 text-primary opacity-20 group-hover:scale-110 transition-transform">
              <Target size={120} strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Our Mission</h2>
            <p className="text-xl text-text-primary font-medium leading-relaxed mb-0 relative z-10">
              "To bridge traditional homoeopathic wisdom with modern health literacy, making authentic healing accessible through storytelling, education, and research-backed insights."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 my-20">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-bg-secondary rounded-3xl border border-border hover:shadow-xl transition-all text-center"
              >
                <div className={`w-14 h-14 ${v.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/10`}>
                  <v.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-text-primary mb-2 text-xl">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">Looking Forward</h2>
            <p className="leading-relaxed">
              We envision a future where homoeopathy is a recognized as a primary pillar of holistic health. Through Curiva, we are building a global community where curiosity leads to understanding, and understanding leads to life-changing health shifts. 
            </p>
            <p className="leading-relaxed">
              Whether you are a medical student searching for clarity in the Materia Medica, or a parent seeking a natural alternative for your family, Curiva is your home for authentic homoeopathy.
            </p>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-12 bg-bg-secondary rounded-[2.5rem] text-center relative overflow-hidden border border-border"
        >
          <div className="absolute inset-0 bg-primary/10 blur-[100px] opacity-50" />
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-8 opacity-50" />
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 italic">Join the movement for gentle healing.</h3>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Follow us on our journey to redefine holistic health through the lens of homoeopathy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.instagram.com/curivahomoeopathy/" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                Follow on Instagram
              </a>
              <a 
                href="https://www.facebook.com/curivahomoeopathy/" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20"
              >
                Find us on Facebook
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
