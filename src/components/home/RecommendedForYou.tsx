import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, ArrowRight, History } from 'lucide-react';
import { Link } from 'react-router-dom';

import { getRecommendations } from '../../lib/history';

interface Recommendation {
  id: string;
  title: string;
  category: string;
  to: string;
}

const RecommendedForYou: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const history = getRecommendations();
    if (history.length > 0) {
      setRecommendations(history.slice(0, 4));
    } else {
      // Fallback defaults
      setRecommendations([
        { id: '1', title: 'Remedy Relationship Map', category: 'Materia Medica', to: '/visualization' },
        { id: '2', title: '1st BHMS Exam Guide', category: 'Academy', to: '/first-bhms-crash-course' },
        { id: '3', title: 'Clinical Case Repository', category: 'Practice', to: '/clinical-guides' },
        { id: '4', title: 'Miasmatic Analysis', category: 'Organon', to: '/miasms' }
      ]);
    }
  }, []);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Recommended for You</h2>
            <p className="text-sm text-text-secondary">Hand-picked guides based on your learning path</p>
          </div>
        </div>
        <Link 
          to="/articles" 
          className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
        >
          <span>View All Library</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              to={item.to}
              className="group block p-6 rounded-3xl bg-bg-secondary border border-border hover:border-primary/30 hover:shadow-hover-card transition-all h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <History className="w-16 h-16" />
              </div>
              
              <div className="flex flex-col h-full space-y-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary px-2 py-0.5 rounded-md bg-bg-tertiary w-fit border border-border">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <div className="pt-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">
                    <span>Quick Access</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedForYou;
