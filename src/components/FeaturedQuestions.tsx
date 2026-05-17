import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { questionService, Question } from '../services/questionService';

const FeaturedQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = await questionService.getFeaturedQuestions();
      if (q) setQuestions(q.slice(0, 3)); // Only show top 3
    };
    fetchQuestions();
  }, []);

  if (questions.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden bg-bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3" /> Clinical Spotlight
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-text-primary tracking-tight leading-tight italic">
              Professional <br/> <span className="text-primary italic">Inquiries</span>
            </h2>
          </div>
          <Link 
            to="/ask-homeopath"
            className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-text-primary hover:text-primary transition-all"
          >
            Consult Expert <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {questions.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-border shadow-soft relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare className="w-24 h-24 text-primary" />
              </div>

              <div className="flex items-center justify-between mb-8">
                 <div className="px-4 py-1 bg-bg-primary border border-border rounded-full text-[9px] font-black uppercase text-text-tertiary">
                    {new Date(q.createdAt?.seconds * 1000).toLocaleDateString()}
                 </div>
                 <div className="p-2.5 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                    <ShieldCheck className="w-4 h-4" />
                 </div>
              </div>

              <h3 className="text-2xl font-display font-medium text-text-primary italic leading-tight mb-6 line-clamp-3 group-hover:text-primary transition-colors">
                 {q.subject}
              </h3>

              <p className="text-text-secondary font-serif italic text-sm leading-relaxed line-clamp-4 mb-8">
                "{q.content}"
              </p>

              <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Synthesized by</span>
                  <span className="text-[10px] font-bold text-text-primary uppercase tracking-tighter italic">{q.answeredBy || 'Curiva Panel'}</span>
                </div>
                <Link 
                  to="/ask-homeopath"
                  className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-tertiary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedQuestions;
