import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  number: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({ 
  title, 
  number, 
  children, 
  defaultOpen = false,
  id 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={id} className="scroll-mt-32 border-b border-border last:border-0 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 px-4 -mx-4 rounded-xl"
      >
        <div className="flex items-center gap-6">
          <span className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors">
            {number}
          </span>
          <h2 className="text-2xl font-display font-black uppercase italic tracking-tight text-text-primary group-hover:translate-x-2 transition-transform">
            {title}
          </h2>
        </div>
        <div className={`p-2 rounded-full border border-border group-hover:border-primary transition-all ${isOpen ? 'rotate-180 bg-primary border-primary' : ''}`}>
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-white' : 'text-text-secondary group-hover:text-primary'}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="pb-12 pt-4 px-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
