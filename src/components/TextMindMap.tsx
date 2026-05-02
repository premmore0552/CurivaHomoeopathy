import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, BrainCircuit, Activity, Heart, Shield, Zap } from 'lucide-react';

interface TextMindMapProps {
  title: string;
  category: string;
  symptoms?: string[];
  remedies?: string[];
  lifestyle?: string[];
  research?: { title: string; source: string }[];
}

export default function TextMindMap({ 
  title, 
  category, 
  symptoms = [], 
  remedies = [], 
  lifestyle = [], 
  research = [] 
}: TextMindMapProps) {
  const [activeBranch, setActiveBranch] = React.useState<string | null>(null);

  const branches = [
    { 
      id: 'symptoms', 
      label: 'Clinical Patterns', 
      icon: Activity, 
      color: 'emerald', 
      data: symptoms,
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      dot: 'bg-emerald-500'
    },
    { 
      id: 'remedies', 
      label: 'Related Nodes', 
      icon: Zap, 
      color: 'amber', 
      data: remedies,
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-500'
    },
    { 
      id: 'lifestyle', 
      label: 'Lifestyle Tips', 
      icon: Heart, 
      color: 'rose', 
      data: lifestyle,
      bg: 'bg-rose-500/5',
      border: 'border-rose-500/20',
      text: 'text-rose-600 dark:text-rose-400',
      dot: 'bg-rose-500'
    },
    { 
      id: 'research', 
      label: 'Research Basis', 
      icon: Shield, 
      color: 'blue', 
      data: research.map(r => `${r.title} (${r.source})`),
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500'
    }
  ];

  return (
    <div className="my-16 p-6 md:p-10 bg-bg-secondary rounded-[3rem] border border-border shadow-sm overflow-hidden relative group transition-all duration-500">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <BrainCircuit className="w-48 h-48" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-primary rounded-2xl shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-widest">Article Insight Map</h3>
            <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] font-mono">{category} Correlation</div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {/* Main Central Node */}
          <div className="flex justify-center mb-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-sm p-8 bg-primary text-white rounded-[2.5rem] text-center shadow-2xl shadow-primary/30 relative border-4 border-white/10"
            >
              <div className="text-[10px] font-black uppercase opacity-60 mb-2 tracking-widest">Primary Remedy Entity</div>
              <div className="font-display font-bold text-2xl md:text-3xl leading-tight">{title}</div>
              
              {/* Connector lines (decorative) */}
              <div className="hidden lg:block absolute -left-12 top-1/2 w-12 h-0.5 bg-gradient-to-l from-primary/50 to-transparent" />
              <div className="hidden lg:block absolute -right-12 top-1/2 w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.div>
          </div>

          {/* 4 Quadrant Branches */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {branches.map((branch) => (
              <motion.div
                key={branch.id}
                onHoverStart={() => setActiveBranch(branch.id)}
                onHoverEnd={() => setActiveBranch(null)}
                className={`p-6 ${branch.bg} rounded-[2rem] border ${branch.border} transition-all duration-300 hover:shadow-lg ${activeBranch === branch.id ? 'scale-[1.02]' : ''}`}
              >
                <div className={`flex items-center gap-3 mb-6 ${branch.text}`}>
                  <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
                    <branch.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{branch.label}</span>
                </div>
                
                <ul className="space-y-3">
                  {branch.data && branch.data.length > 0 ? (
                    branch.data.slice(0, 3).map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-[13px] font-bold text-text-secondary leading-tight"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${branch.dot} mt-1.5 shrink-0 shadow-sm`} />
                        <span className="group-hover:text-text-primary transition-colors">{item}</span>
                      </motion.li>
                    ))
                  ) : (
                    <li className="text-[11px] font-bold text-text-secondary italic opacity-40 py-2">
                       Data integration pending...
                    </li>
                  )}
                </ul>
                
                {branch.data.length > 3 && (
                   <div className="mt-4 text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">
                     + {branch.data.length - 3} more connections
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-bg-primary border-2 border-border flex items-center justify-center text-[10px] font-black shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                     {i}
                   </div>
                 ))}
              </div>
              <div>
                <span className="block text-[10px] font-black text-text-primary uppercase tracking-widest leading-none">Relational Network</span>
                <span className="text-[9px] font-medium text-text-secondary uppercase tracking-widest opacity-60">Interactive clinical model</span>
              </div>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none">Evidence-Based Repository</span>
           </div>
        </div>
      </div>
    </div>
  );
}
