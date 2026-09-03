import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Dna, 
  Activity, 
  Search, 
  Stethoscope, 
  AlertCircle, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';

const steps = [
  { label: 'Disease', icon: Activity },
  { label: 'Etiology', icon: Dna },
  { label: 'Pathophysiology', icon: Search },
  { label: 'Clinical Features', icon: Stethoscope },
  { label: 'Investigations', icon: Search },
  { label: 'Diagnosis', icon: AlertCircle },
  { label: 'Differential Diagnosis', icon: BookOpen },
  { label: 'Complications', icon: AlertCircle },
  { label: 'Management', icon: Activity },
  { label: 'Homoeopathic Approach', icon: Sparkles },
  { label: 'Relevant Remedies', icon: BookOpen },
  { label: 'Full Drug Picture', icon: Sparkles },
];

export const LearningJourney: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
      <div className="flex items-center gap-4 min-w-max">
        {steps.map((step, idx) => (
          <React.Fragment key={step.label}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary text-center w-20 leading-tight">
                {step.label}
              </span>
            </motion.div>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-border shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
