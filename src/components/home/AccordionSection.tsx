import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border-b border-border last:border-b-0 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group transition-all"
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
            {title}
          </h2>
        </div>
        <div className={`p-2 rounded-full border border-border group-hover:border-primary/30 transition-all duration-300 ${isOpen ? 'rotate-180 bg-primary/5 text-primary' : 'text-text-tertiary'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pb-10 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionSection;
