import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Send, CheckCircle2, MessageCircle, HelpCircle, ShieldCheck, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = `Hi, I'm reaching out from Curiva Homoeopathy for guidance on a health concern.`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-24 pb-24 bg-bg-primary transition-colors duration-300">
      <SEO 
        title="Feedback & Research | Curiva Homoeopathy" 
        description="Share your feedback, report content errors, or suggest topics for our educational Homoeopathic resource."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-xs tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" />
              Educational Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary leading-tight">
              Community <span className="text-primary italic">Feedback.</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
              Curiva is a living educational repository. We rely on community feedback and student research to keep our clinical insights accurate and useful.
            </p>

            <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-text-primary italic">How to contribute:</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-text-secondary">Report errors in Materia Medica or clinical patterns.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-text-secondary">Suggest new conditions or research topics to cover.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-text-secondary">Share feedback on our interactive symptom tools.</p>
                </li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="https://www.instagram.com/curivahomoeopathy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-bg-secondary rounded-2xl border border-border hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-lg flex items-center justify-center shadow-md">
                  <Instagram size={20} />
                </div>
                <div className="text-sm font-bold text-text-primary">Instagram</div>
              </a>

              <a 
                href="https://www.facebook.com/curivahomoeopathy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-bg-secondary rounded-2xl border border-border hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 bg-[#1877F2] text-white rounded-lg flex items-center justify-center shadow-md">
                  <Facebook size={20} />
                </div>
                <div className="text-sm font-bold text-text-primary">Facebook</div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-bg-secondary p-8 md:p-12 rounded-[2.5rem] border border-border shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <HelpCircle className="w-24 h-24 text-primary" />
               </div>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Feedback Received</h2>
                  <p className="text-text-secondary mb-8">
                    Thank you for helping us improve this educational resource. We review all submissions for accuracy.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Submit Feedback</h3>
                  <div>
                    <label htmlFor="name" className="block text-xs font-black text-text-secondary mb-2 uppercase tracking-widest">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full px-5 py-4 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-black text-text-secondary mb-2 uppercase tracking-widest">Email (Optional)</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-5 py-4 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                      placeholder="name@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-black text-text-secondary mb-2 uppercase tracking-widest">Feedback / Suggestion</label>
                    <textarea 
                      id="message"
                      required
                      rows={4}
                      className="w-full px-5 py-4 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                      placeholder="Please describe the correction or suggestion..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg cursor-pointer"
                  >
                    Send Feedback
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>

            <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-sm">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary italic">Student Resource</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    This platform is maintained by a BHMS student. All feedback helps refine the accuracy of this clinical repository.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
