import React from 'react';
import { CheckCircle2, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

const EducationalHighlight: React.FC = () => {
  const points = [
    {
      title: "Holistic Approach",
      description: "Homoeopathy treats the person as a whole, considering physical, mental, and emotional states."
    },
    {
      title: "Highly Diluted Remedies",
      description: "Remedies are prepared through potentization, making them safe and free from toxic side effects."
    },
    {
      title: "Individualized Treatment",
      description: "No two patients are treated the same. Every prescription is tailored to the individual's unique symptoms."
    },
    {
      title: "Natural Healing Power",
      description: "It aims to stimulate the body's own healing response rather than just suppressing symptoms."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                What is Homoeopathy and <span className="text-primary">How Does it Work?</span>
              </h2>
            </div>
            <div className="prose prose-lg text-gray-600 mb-10">
              <p>
                Homoeopathy is a system of natural medicine that has been used worldwide for over 200 years. 
                It is based on the principle of "Like Cures Like"—the idea that a substance that causes symptoms 
                in a healthy person can, in minute doses, treat similar symptoms in someone who is unwell.
              </p>
              <p>
                In holistic medicine, homoeopathy is valued for its gentle yet deep-acting nature, 
                addressing the root cause of illness rather than just the superficial manifestations.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {points.map((point, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{point.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://picsum.photos/seed/herbs/800/800"
                alt="Natural Medicine"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-light/30 rounded-full blur-2xl -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-beige/50 rounded-full blur-3xl -z-0"></div>
            
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20 hidden md:block">
              <p className="text-primary font-bold text-2xl mb-1">200+</p>
              <p className="text-gray-600 text-sm font-medium">Years of Clinical History</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationalHighlight;
