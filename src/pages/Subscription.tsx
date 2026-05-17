import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Zap, Crown, ArrowRight, ShieldCheck, Sparkles, Award, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { auth, db, googleProvider } from '../lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import { useSubscription } from '../hooks/useSubscription';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const proPlan = {
  id: 'clinical-pro',
  name: 'Full Access',
  price: 'FREE',
  amount: 0,
  period: 'Limited Time',
  description: 'Experience clinical-grade datasets and differential analysis. We want our community to experience the platform fully during this period.',
  features: [
    'Complete A-Z Materia Medica Access',
    'Advanced Clinical Protocols & Verification',
    'Historical Case Studies of Stalwarts',
    'Differential Analysis Support Tool',
    'Exclusive Research Paper Library',
    'Early Access to New Repositories'
  ],
  cta: 'Enjoy Full Access'
};

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const { subscription, loading: subLoading } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!auth.currentUser) {
      try {
        await signInWithPopup(auth, googleProvider);
        // After successful login, the hook will update 'subscription'
        return;
      } catch (error) {
        console.error("Login failed:", error);
        return;
      }
    }

    if (subscription?.isPro) {
      return;
    }

    setIsProcessing(true);

    try {
      // Since it's FREE for limited time, we directly update Firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        isPro: true,
        proExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
        updatedAt: serverTimestamp()
      });
      
      alert("Welcome to Curiva Pro! You now have full access.");
      navigate('/');
    } catch (error: any) {
      console.error('Enrollment Error:', error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Curiva Pro | Clinical Intelligence for Homoeopaths"
        description="Upgrade to Curiva Professional for advanced clinical protocols and deep research insights."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-10 border border-white/10 text-accent-light"
          >
            <Crown className="w-4 h-4" /> {subscription?.isPro ? 'Welcome, Professional' : 'The Clinical Standard'}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col items-center mb-12"
          >
            <span>Professional</span>
            <span className="text-accent italic lg:ml-24 -mt-4">{subscription?.isPro ? 'Active' : 'Access'}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-serif italic leading-tight mb-8"
          >
            Empowering modern clinicians with historical wisdom and evidence-based data.
          </motion.p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative bg-white rounded-[3.5rem] p-8 md:p-16 border-2 overflow-hidden shadow-soft ${subscription?.isPro ? 'border-accent' : 'border-border'}`}
        >
          <div className="absolute top-12 -right-16 px-20 py-2 text-[10px] font-bold uppercase tracking-widest rotate-45 shadow-lg text-white bg-primary">
            Curiva Community
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-xl ${subscription?.isPro ? 'bg-accent shadow-accent/20' : 'bg-primary shadow-primary/20'}`}>
                 <Sparkles className="w-10 h-10 text-white" />
               </div>
               <h3 className="text-3xl md:text-5xl font-display font-medium text-text-primary mb-6 italic tracking-tight uppercase leading-none">
                 Curiva <span className={subscription?.isPro ? 'text-accent' : 'text-primary'}>Pro</span>
               </h3>
               <p className="text-text-secondary text-lg font-serif italic leading-relaxed mb-10 opacity-90">
                 {proPlan.description}
               </p>
               {!subscription?.isPro && (
                 <div className="flex items-baseline gap-2 mb-10">
                   <span className="text-5xl font-display font-medium text-text-primary">
                     {proPlan.price}
                   </span>
                   <span className="text-text-secondary font-bold uppercase tracking-widest text-xs">
                     /{proPlan.period}
                   </span>
                 </div>
               )}
               <button 
                 onClick={handlePayment}
                 disabled={isProcessing || subscription?.isPro}
                 className={`w-full py-6 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center justify-center gap-4 group ${
                   subscription?.isPro 
                   ? 'bg-accent/10 text-accent border-2 border-accent/20 cursor-default' 
                   : 'bg-primary text-white hover:scale-[1.02] active:scale-95 disabled:opacity-50'
                 }`}
               >
                 {isProcessing ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                 ) : subscription?.isPro ? (
                    'Membership Active'
                 ) : (
                    <> {proPlan.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /> </>
                 )}
               </button>
             </div>

             <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-4">Included Features</h4>
                {proPlan.features.map((feature, fIdx) => (
                   <div key={fIdx} className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${subscription?.isPro ? 'bg-accent/10' : 'bg-primary/10'}`}>
                      <Check className={`w-3.5 h-3.5 ${subscription?.isPro ? 'text-accent' : 'text-primary'}`} />
                    </div>
                    <span className="text-lg font-serif italic text-text-secondary tracking-tight">
                      {feature}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-24">
          <div className="text-center">
             <ShieldCheck className="w-10 h-10 text-accent mx-auto mb-6" />
             <h5 className="font-display font-medium text-text-primary uppercase tracking-tight mb-2">Google Sync</h5>
             <p className="text-sm text-text-secondary font-serif italic">One-tap authentication and library synchronization across devices.</p>
          </div>
          <div className="text-center">
             <Award className="w-10 h-10 text-accent mx-auto mb-6" />
             <h5 className="font-display font-medium text-text-primary uppercase tracking-tight mb-2">Verified Data</h5>
             <p className="text-sm text-text-secondary font-serif italic">Sourced from classic materia medicas and contemporary clinical journals.</p>
          </div>
          <div className="text-center">
             <Zap className="w-10 h-10 text-accent mx-auto mb-6" />
             <h5 className="font-display font-medium text-text-primary uppercase tracking-tight mb-2">Priority Support</h5>
             <p className="text-sm text-text-secondary font-serif italic">Dedicated expert assistance for complex clinical case reflections.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
