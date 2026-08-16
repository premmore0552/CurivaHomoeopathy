import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is Curiva a direct medical clinic?",
    answer: "No. Curiva is a purely educational research platform. We do not provide clinical diagnosis, medical treatment, or professional consultations yet. Our content is designed for academic study and homoeopathic awareness."
  },
  {
    question: "How does the Research Database work?",
    answer: "Our research hub allows you to explore how anatomical areas and clinical patterns are traditionally studied in homoeopathic literature. It is an educational study tool and must not be used for self-diagnosis or prescription."
  },
  {
    question: "Are homoeopathic remedies safe for everyone?",
    answer: "While Homoeopathic literature describes remedies as gentle and non-toxic, Curiva recommends that anyone considering treatment seek the professional guidance of a qualified medical practitioner. Our site serves to explain the traditional theory behind these remedies."
  },
  {
    question: "How should I store educational remedy samples?",
    answer: "For academic purposes, remedies are traditionally stored in a cool, dry place away from direct sunlight and strong odors (like camphor or perfumes) to maintain their purity for study."
  },
  {
    question: "Can I use this information for self-treatment?",
    answer: "No. The information provided is strictly for education. Homoeopathic prescribing is a complex, individual process that requires specialized training and a complete medical history taken by a qualified professional."
  },
  {
    question: "What is the source of your content?",
    answer: "Our content is curated based on classical homoeopathic journals, Materia Medica textbooks, and standard repertories. It is reviewed and maintained by a BHMS student for academic integrity."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      item => item.question.toLowerCase().includes(query) || 
              item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-bg-secondary transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* FAQ Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary opacity-40" />
            <input 
              type="text" 
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-5 bg-bg-primary border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 bg-bg-secondary rounded-full hover:bg-bg-primary transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div 
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-primary rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-md w-fit">Q</span>
                    <span className="font-bold text-lg text-text-primary">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-4 border-t border-border bg-bg-secondary/50">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
                          <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase tracking-wider rounded-md mt-1 w-fit">A</span>
                          <div className="text-text-secondary text-lg leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-bg-primary rounded-2xl border border-border border-dashed">
              <p className="text-text-secondary">No matching questions found.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
