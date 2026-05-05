
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Star, Zap, GraduationCap, Building2, Crown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const plans = [
  {
    name: 'Curiva Student',
    price: 'Free',
    period: 'Access',
    description: 'Perfect for students looking for structured study materials and Materia Medica summaries.',
    icon: GraduationCap,
    color: 'bg-blue-500',
    features: [
      'Unlimited A-Z Encyclopedia Access',
      'High-Yield Study Notes (Preview)',
      'Aphorism Breakdown Guides',
      'Student Forum Access',
      'Digital Learning Portal'
    ],
    cta: 'Get Free Access',
    popular: false
  },
  {
    name: 'Clinical Intelligence',
    price: 'Open',
    period: 'Beta',
    description: 'Designed for practitioners needing advanced clinical protocols and research insights.',
    icon: Sparkles,
    color: 'bg-primary',
    features: [
      'Everything in Student',
      'Advanced Clinical Protocols',
      'Multi-Remedy Comparison (10+)',
      'Differential Analysis Verdicts',
      'Clinical Decision Support Tools',
      'Priority Research Updates'
    ],
    cta: 'Request Invitation',
    popular: true
  },
  {
    name: 'Institutional',
    price: 'Custom',
    period: 'Access',
    description: 'For colleges and research groups needing bulk licenses and collaborative tools.',
    icon: Building2,
    color: 'bg-text-primary',
    features: [
      'Everything in Clinical',
      'Unlimited User Licenses',
      'Custom Content Integration',
      'API Access for Research',
      'Dedicated Support Manager',
      'White-label Study Portals'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Upgrade to Pro | Curiva Homoeopathy"
        description="Unlock advanced clinical protocols, research papers, and professional study tools with Curiva Pro."
      />

      {/* Hero Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-white/10 text-primary-light"
          >
            <Crown className="w-4 h-4" /> Professional Intelligence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8] uppercase flex flex-col items-center mb-12"
          >
            <span>Level</span>
            <span className="text-primary italic lg:ml-24 -mt-4">Up</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-tight"
          >
            Bridge the gap between theory and practice with Curiva's advanced clinical intelligence layer.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-bg-secondary rounded-[3rem] p-10 border-2 overflow-hidden flex flex-col h-full shadow-2xl transition-all duration-500 hover:border-primary/50 ${
                plan.popular ? 'border-primary' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-8 -right-12 bg-primary text-white px-12 py-1 text-[10px] font-black uppercase tracking-widest rotate-45 shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-16 h-16 ${plan.color} rounded-2xl flex items-center justify-center mb-8 shadow-xl`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-black text-text-primary mb-4 italic tracking-tighter uppercase">
                  {plan.name}
                </h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed opacity-80 mb-8">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-text-primary">
                    {plan.price}
                  </span>
                  <span className="text-text-tertiary font-bold uppercase tracking-widest text-[10px]">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-5 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-black text-text-secondary tracking-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/contact')}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 group ${
                plan.popular 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20' 
                : 'bg-bg-primary text-text-primary border-2 border-border hover:border-primary/30'
              }`}>
                {plan.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section or Trust Badges */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-10 h-10 text-emerald-500" />
            </div>
            <h4 className="text-xl font-display font-black text-text-primary mb-4 italic">Verified Content</h4>
            <p className="text-text-secondary text-sm font-medium leading-relaxed opacity-80">
              All therapeutic protocols and remedy data are verified by clinical experts and academic researchers.
            </p>
          </div>
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Zap className="w-10 h-10 text-blue-500" />
            </div>
            <h4 className="text-xl font-display font-black text-text-primary mb-4 italic">Instant Access</h4>
            <p className="text-text-secondary text-sm font-medium leading-relaxed opacity-80">
              Upgrade and unlock all Pro features and downloadable resources instantly.
            </p>
          </div>
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Star className="w-10 h-10 text-primary" />
            </div>
            <h4 className="text-xl font-display font-black text-text-primary mb-4 italic">Academic Support</h4>
            <p className="text-text-secondary text-sm font-medium leading-relaxed opacity-80">
              Part of your subscription goes back into funding primary research for the homeopathic community.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
