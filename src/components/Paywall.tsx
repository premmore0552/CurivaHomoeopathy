import React from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, Check, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaywallProps {
  onClose?: () => void;
  reason?: string;
}

const Paywall: React.FC<PaywallProps> = ({ onClose, reason = "Unlock Professional Clinical Intelligence" }) => {
  const navigate = useNavigate();

  const features = [
    "Full A-Z Materia Medica Access",
    "Advanced Clinical Protocols",
    "Differential Analysis Tool",
    "Historical Case Studies",
    "Exclusive Research Library"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-lg bg-bg-primary rounded-[3rem] overflow-hidden border-2 border-accent shadow-2xl"
      >
        <div className="absolute top-6 right-6 z-10">
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
            <X className="w-6 h-6 text-text-tertiary" />
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-text-primary uppercase italic tracking-tight leading-none mb-4">
              Trial Limit <span className="text-accent">Reached</span>
            </h2>
            <p className="text-text-secondary font-serif italic text-lg leading-relaxed">
              {reason}
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-accent/10">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-bold text-text-primary uppercase tracking-tight italic">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => navigate('/subscription')}
              className="w-full py-5 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              Upgrade for ₹99/month <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> Secure Google Payments
            </div>
          </div>
        </div>

        <div className="bg-bg-primary p-6 border-t border-border flex items-center justify-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-secondary bg-text-tertiary flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Joined by 2,000+ Professionals</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Paywall;
