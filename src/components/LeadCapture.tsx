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
    <div className="bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Send size={120} className="text-primary rotate-12" />
      </div>

      <div className="relative z-10 max-w-lg">
        <h3 className="text-2xl md:text-3xl font-display font-black text-text-primary mb-4 italic">
          Stay Informed with <span className="text-primary underline">Curiva Insights.</span>
        </h3>
        <p className="text-text-secondary font-medium mb-8 leading-relaxed">
          Join 2,000+ others receiving weekly homeopathy research, clinical patterns, and holistic wellness guides directly in their inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-6 pr-32 py-5 bg-white border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-text-primary"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join Now'}
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
