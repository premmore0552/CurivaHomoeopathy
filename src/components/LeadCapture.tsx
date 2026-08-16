import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LeadCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you! You\'re now subscribed to Curiva Insights.');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="bg-[#0F3D75] dark:bg-[#0B0F19] p-8 md:p-12 rounded-3xl relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000 grayscale">
        <Send size={180} className="text-white rotate-6" />
      </div>

      <div className="relative z-10 max-w-2xl text-left">
        <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-6 italic tracking-tighter leading-[0.9]">
          Stay Ahead with <br/> <span className="text-primary not-italic uppercase tracking-widest text-2xl md:text-3xl">Curiva Insights.</span>
        </h3>
        <p className="text-xl text-white/60 font-medium mb-12 leading-relaxed">
          The cutting edge of clinical patterns and evidence-based holistic research, delivered weekly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group/input">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full pl-8 pr-40 py-6 bg-white/5 border border-white/10 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all font-bold text-white text-lg placeholder:text-white/20"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="absolute right-3 top-3 bottom-3 px-8 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-2xl shadow-primary/40 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
              {status === 'idle' && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm font-bold text-green-600"
              >
                <CheckCircle2 className="w-4 h-4" />
                {message}
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm font-bold text-red-600"
              >
                <AlertCircle className="w-4 h-4" />
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
        
        <p className="mt-6 text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-60">
          No spam. Only evidence-based homoeopathy awareness. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;
