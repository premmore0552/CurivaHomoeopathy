import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  AlertCircle, 
  GraduationCap, 
  Stethoscope, 
  Leaf 
} from 'lucide-react';
import { Disease } from '../../data/diseaseHubData';

interface DiseaseCardProps {
  disease: Disease;
  onClick: (id: string) => void;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -5 }}
      onClick={() => onClick(disease.id)}
      className="group p-6 bg-white dark:bg-zinc-900 border border-border rounded-[2rem] text-left hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
          {disease.system}
        </span>
        {disease.emergencyLevel !== 'None' && (
          <span className="px-3 py-0.5 bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5" /> {disease.emergencyLevel}
          </span>
        )}
      </div>

      <h3 className="text-xl font-display font-black text-text-primary mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">
        {disease.name}
      </h3>
      
      <p className="text-xs font-bold text-text-secondary leading-relaxed line-clamp-2 mb-6 flex-1">
        {disease.simpleExplanation}
      </p>

      <div className="pt-6 border-t border-border flex items-center justify-between mt-auto">
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1">
            <GraduationCap className={`w-3.5 h-3.5 ${disease.examPriority === 'High' ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className="text-[8px] font-black text-blue-500 uppercase">{disease.examPriority}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Stethoscope className={`w-3.5 h-3.5 ${disease.clinicalPriority === 'High' ? 'text-emerald-600' : 'text-emerald-400'}`} />
            <span className="text-[8px] font-black text-emerald-500 uppercase">{disease.clinicalPriority}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[8px] font-black text-green-500 uppercase">{disease.relatedRemedies.length} Remedies</span>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  );
};
