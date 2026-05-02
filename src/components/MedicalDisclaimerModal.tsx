import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Check, ShieldAlert, GraduationCap } from 'lucide-react';

const MedicalDisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('curiva_disclaimer_accepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('curiva_disclaimer_accepted', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-bg-primary w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-border"
          >
            <div className="p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <ShieldAlert size={32} />
                </div>
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 rounded-lg mb-2">
                    <GraduationCap className="w-3 h-3" />
                    BHMS Student Project
                  </div>
                  <h2 className="text-3xl font-display font-black text-text-primary italic">Important Notice</h2>
                </div>
              </div>

              <div className="space-y-4 text-text-secondary">
                <p className="font-bold text-text-primary leading-relaxed">
                  Curiva Homoeopathy is an educational research platform. By entering, you acknowledge the following:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>This site is strictly for <strong>educational and informational purposes</strong>.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Content is curated by a <strong>BHMS student</strong> and is not reviewed by medical practitioners for diagnostic use.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>We <strong>do not provide medical advice</strong>, professional diagnosis, or clinical prescriptions.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>In case of a medical emergency, please contact your local <strong>emergency services</strong> immediately.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleAccept}
                className="w-full py-6 bg-primary text-white font-black rounded-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                I Understand & Agree
                <Check className="w-6 h-6" />
              </button>
              
              <p className="text-[10px] text-text-secondary text-center opacity-60 uppercase font-bold tracking-widest leading-relaxed">
                By clicking agree, you confirm that you will use this site as a research resource and not for medical self-treatment.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MedicalDisclaimerModal;
