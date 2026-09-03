import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Star, Activity, AlertTriangle, ChevronRight } from 'lucide-react';
import { Disease, DISEASE_SYSTEMS } from '../../data/diseaseHubData';

interface DiseaseHeroProps {
  disease: Disease;
}

export const DiseaseHero: React.FC<DiseaseHeroProps> = ({ disease }) => {
  const systemName = DISEASE_SYSTEMS.find(s => s.id === disease.system)?.name || disease.system;

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Low': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getEmergencyStyles = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-white bg-rose-600 animate-pulse shadow-lg shadow-rose-600/20';
      case 'Alert': return 'text-white bg-amber-500 shadow-lg shadow-amber-500/20';
      default: return 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800';
    }
  };

  return (
    <div className="relative pt-8 pb-12">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
          {systemName}
        </span>
        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-border rounded-full text-[10px] font-black uppercase tracking-widest">
          {disease.category}
        </span>
      </div>

      <h1 className="text-4xl md:text-7xl font-display font-black text-text-primary uppercase tracking-tight leading-none mb-8">
        {disease.name}
      </h1>

      <div className="flex flex-wrap gap-4">
        <div className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold uppercase tracking-widest ${getPriorityColor(disease.examPriority)}`}>
          <Star className="w-4 h-4" />
          Exam: {disease.examPriority}
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold uppercase tracking-widest ${getPriorityColor(disease.clinicalPriority)}`}>
          <Activity className="w-4 h-4" />
          Clinical: {disease.clinicalPriority}
        </div>
        {disease.emergencyLevel !== 'None' && (
          <div className={`flex items-center gap-2 px-4 py-2 border border-transparent rounded-xl text-xs font-bold uppercase tracking-widest ${getEmergencyStyles(disease.emergencyLevel)}`}>
            <AlertTriangle className="w-4 h-4" />
            Emergency: {disease.emergencyLevel}
          </div>
        )}
      </div>
    </div>
  );
};
