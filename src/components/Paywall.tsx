import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Sparkles, CheckCircle2, ArrowRight, Mail, User } from 'lucide-react';
import { setPremiumStatus } from '../services/UsageService';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface PaywallProps {
  onUnlock?: () => void;
}

export default function Paywall({ onUnlock }: PaywallProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    try {
      const leadsPath = 'leads';
      try {
        await addDoc(collection(db, leadsPath), {
          userId: auth.currentUser?.uid || 'guest',
          userName: name,
          userEmail: email,
          type: 'UNLOCK_TOOLS',
          createdAt: serverTimestamp()
        });
      } catch (firestoreError) {
        handleFirestoreError(firestoreError, OperationType.WRITE, leadsPath);
      }

      await setPremiumStatus(true);
      if (onUnlock) onUnlock();
      // Refresh page to apply premium status across app
      window.location.reload();
    } catch (error) {
      console.error('Lead submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-12 bg-bg-secondary rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Sparkles className="w-64 h-64 text-primary" />
      </div>
      
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 shadow-inner ring-4 ring-bg-primary">
          <Lock className="w-10 h-10" />
        </div>
        
        <h2 className="text-4xl font-display font-black text-text-primary uppercase tracking-tight mb-4 italic">
          Unlock Unlimited <span className="text-primary italic">Clinical Tools</span>
        </h2>
        
        <p className="text-lg text-text-secondary font-medium mb-12 leading-relaxed">
          You've reached the free limit. <span className="text-primary font-bold">Join our professional community</span> to get unlimited access to all tools and premium differential analysis.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            "Unlimited Remedy Comparisons",
            "Compare up to 10 Remedies",
            "Pro Verdict Differential Analysis",
            "Free Educational Resources"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-bg-primary rounded-2xl border border-border shadow-soft group hover:border-primary/30 transition-all">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-bold text-text-primary text-left">{feature}</span>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleLeadSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-16 pr-8 py-5 bg-bg-primary border border-border rounded-2.5xl focus:outline-none focus:border-primary/50 transition-all font-bold"
              />
            </div>
            
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
              <input 
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-16 pr-8 py-5 bg-bg-primary border border-border rounded-2.5xl focus:outline-none focus:border-primary/50 transition-all font-bold"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-primary text-white rounded-2.5xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? 'Unlocking...' : 'Join & Unlock Now'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <p className="mt-8 text-[11px] font-bold text-text-tertiary uppercase tracking-[0.2em] opacity-60">
          By joining, you agree to receive clinical updates and news.
        </p>
      </div>
    </div>
  );
}
