import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Disease } from '../../data/diseaseHubData';

interface DiseaseListProps {
  system: string;
  diseases: Disease[];
  onSelectDisease: (id: string) => void;
  onBack: () => void;
}

export const DiseaseList: React.FC<DiseaseListProps> = ({ system, diseases, onSelectDisease, onBack }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-bg-secondary rounded-xl transition-colors border border-border"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <div>
          <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">{system}</h2>
          <p className="text-xs font-bold text-text-secondary">Clinical & Academic Resource Index</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease, idx) => (
          <motion.button
            key={disease.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelectDisease(disease.id)}
            className="group p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] text-left hover:border-primary hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-3 py-1 rounded-full mb-4 inline-block">
                {disease.category}
              </span>
              <h3 className="text-xl font-display font-black text-text-primary mb-3 group-hover:text-primary transition-colors">
                {disease.name}
              </h3>
              <p className="text-xs font-bold text-text-secondary leading-relaxed line-clamp-3 mb-6">
                {disease.definition}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                  Study Topic <ChevronRight className="w-3 h-3" />
                </span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-border" />
                  <div className="w-1.5 h-1.5 rounded-full bg-border" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {diseases.length === 0 && (
        <div className="text-center py-20 bg-bg-secondary rounded-[3rem] border border-dashed border-border">
          <p className="text-text-secondary font-bold italic">Our clinical researchers are currently preparing detailed modules for this system.</p>
        </div>
      )}
    </div>
  );
};
