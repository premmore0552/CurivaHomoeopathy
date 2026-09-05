import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Library, GraduationCap, ArrowRight, Activity, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  {
    name: 'Materia Medica',
    to: '/materia-medica',
    icon: Library,
    color: 'bg-emerald-500/10 text-emerald-600',
    desc: '150+ Classical Remedies'
  },
  {
    name: 'Repertory',
    to: '/repertory',
    icon: Search,
    color: 'bg-blue-500/10 text-blue-600',
    desc: 'Symptom-Remedy Mapping'
  },
  {
    name: 'Clinical Guides',
    to: '/clinical-guides',
    icon: Activity,
    color: 'bg-rose-500/10 text-rose-600',
    desc: 'Therapeutic References'
  },
  {
    name: 'Syllabus',
    to: '/student-resources',
    icon: GraduationCap,
    color: 'bg-amber-500/10 text-amber-600',
    desc: 'BHMS Curriculum Hub'
  }
];

const QuickNavigation: React.FC = () => {
  return (
    <section className="py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {navItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              to={item.to}
              className="flex items-center gap-4 p-4 rounded-3xl bg-bg-secondary border border-border hover:border-primary/30 hover:shadow-soft transition-all group"
            >
              <div className={`p-3 rounded-2xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-text-primary group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] text-text-tertiary italic font-serif">
                  {item.desc}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickNavigation;
