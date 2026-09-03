import React from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  GraduationCap, 
  Stethoscope, 
  AlertCircle, 
  Leaf, 
  Clock 
} from 'lucide-react';

const links = [
  { label: 'Must Know Diseases', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { label: 'BHMS Exam Priority', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Clinical Priority', icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Emergency Conditions', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  { label: 'Homoeopathic Study', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Recently Added', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export const QuickAccess: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {links.map((link, idx) => (
        <motion.button
          key={link.label}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          className="p-4 bg-bg-secondary border border-border rounded-2xl flex flex-col items-center gap-3 hover:border-primary hover:bg-white transition-all group"
        >
          <div className={`w-10 h-10 ${link.bg} ${link.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <link.icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tight text-text-primary text-center leading-tight">
            {link.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
