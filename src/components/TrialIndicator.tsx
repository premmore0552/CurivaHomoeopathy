import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

const TrialIndicator: React.FC = () => {
  const { subscription, loading } = useSubscription();

  if (loading || !subscription || subscription.isPro) return null;

  const remaining = Math.max(0, 10 - subscription.trialUsageCount);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-[40]"
    >
      <div className="bg-bg-secondary border-2 border-primary/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="text-[10px] font-black text-text-tertiary uppercase tracking-widest leading-none mb-1">Trial Usage</div>
          <div className="text-sm font-black text-text-primary uppercase tracking-tighter">
            {subscription.trialUsageCount} / 10 <span className="text-text-tertiary">Accesses</span>
          </div>
        </div>
        {remaining <= 3 && (
          <div className="px-2 py-1 bg-primary text-white text-[8px] font-black rounded uppercase animate-pulse">
            Low
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TrialIndicator;
