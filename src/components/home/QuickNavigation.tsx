import React from 'react';
import { motion } from 'motion/react';
import { Activity, BookOpen, Brain, GraduationCap, Library, Search, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quickNavigationItems } from '../../navigation/navigationConfig';

const icons = [Library, Search, Activity, GraduationCap, Brain, Timer];
const iconStyles = [
  'bg-emerald-500/10 text-emerald-600',
  'bg-blue-500/10 text-blue-600',
  'bg-rose-500/10 text-rose-600',
  'bg-amber-500/10 text-amber-600',
  'bg-violet-500/10 text-violet-600',
  'bg-sky-500/10 text-sky-600'
];

const QuickNavigation: React.FC = () => (
  <section className="py-6 sm:py-8" aria-label="Quick access to learning areas">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {quickNavigationItems.map((item, index) => {
        const Icon = icons[index] ?? BookOpen;
        return (
          <motion.div key={item.to} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035, duration: 0.2 }}>
            <Link to={item.to} className="group flex min-h-24 items-center gap-3 rounded-2xl border border-border bg-bg-secondary p-3 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-4">
              <span className={'shrink-0 rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-105 ' + (iconStyles[index] ?? iconStyles[0])}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold leading-snug text-text-primary transition-colors group-hover:text-primary sm:text-sm">{item.label}</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-text-tertiary sm:text-xs">{item.description}</span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default QuickNavigation;