import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Stethoscope, 
  ClipboardCheck, 
  Target, 
  History,
  Play,
  RotateCcw,
  Star,
  Trophy,
  BrainCircuit,
  MessageSquare,
  Search,
  Lock
} from 'lucide-react';
import { runCaseSimulationTurn, getSimulationFeedback } from '../services/gemini';
import { allBlogPosts as blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import { auth } from '../lib/firebase';
import { Link } from 'react-router-dom';

const SIMULATION_LEVELS = [
  { id: 'easy', label: 'Polychrest Basics', description: 'Clear-cut cases for remedies like Arsenic, Pulsatilla, or Sulfur.', icon: Star },
  { id: 'medium', label: 'Chronic Complexity', description: 'Nuanced cases requiring deeper constitutional understanding.', icon: Trophy },
  { id: 'hard', label: 'Rare & Lesser Remedies', description: 'Challenging cases with atypical presentations.', icon: BrainCircuit }
];

const REMEDIES_FOR_SIM = [
  'Arsenicum Album', 'Pulsatilla', 'Nux Vomica', 'Sulfur', 'Lycopodium', 
  'Lachesis', 'Calcarea Carbonica', 'Sepia', 'Natrum Muriaticum', 'Ignatia'
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CaseSimulation() {
  const [step, setStep] = useState<'setup' | 'sim' | 'diagnosis' | 'result'>('setup');
  const [level, setLevel] = useState('easy');
  const [targetRemedy, setTargetRemedy] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startSimulation = () => {
    const randomRemedy = REMEDIES_FOR_SIM[Math.floor(Math.random() * REMEDIES_FOR_SIM.length)];
    setTargetRemedy(randomRemedy);
    setMessages([
      { role: 'assistant', content: "Hello doctor. I've been feeling quite unwell lately and I'm not sure what to do..." }
    ]);
    setStep('sim');
    setPrescription('');
    setFeedback(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await runCaseSimulationTurn([...messages, { role: 'user', content: userMessage }], targetRemedy);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const submitDiagnosis = async () => {
    setIsLoading(true);
    const summary = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    const result = await getSimulationFeedback(targetRemedy, prescription, summary);
    setFeedback(result);
    setStep('result');
    setIsLoading(false);
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <div className="max-w-md w-full p-12 bg-white rounded-[3rem] border border-border shadow-soft text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
               <Lock className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-display font-medium text-text-primary italic mb-4">Training simulator</h2>
            <p className="text-text-secondary font-serif italic mb-10 leading-relaxed">
              Login to practice clinical case-taking with our AI-powered patients. Unlock deep clinical feedback and track your competency progress.
            </p>
            <Link 
              to="/auth"
              className="block w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              Sign In to Practice
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-32">
      <SEO 
        title="Case Simulation | Medical Training Tool"
        description="Practice your homeopathic case-taking skills with AI-simulated patient profiles."
      />

      {/* Header */}
      <header className="pt-32 pb-20 bg-bg-secondary border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none rotate-12">
           <Stethoscope className="w-96 h-96 text-primary" />
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Simulation Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-tight italic">
            Clinical <span className="text-primary italic">Lab</span>
          </h1>
          <p className="text-text-secondary font-serif italic text-xl mt-6 max-w-2xl px-4">
            Practice your clinical repertoire by interacting with AI-simulated patients. Reveal symptoms, differentiate remedies, and receive expert feedback.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === 'setup' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white p-12 rounded-[4rem] border border-border shadow-soft text-center">
                <h3 className="text-2xl font-display font-medium text-text-primary italic mb-12">Choose Your Clinical Level</h3>
                
                <div className="grid gap-6 mb-12">
                  {SIMULATION_LEVELS.map(l => (
                    <button
                      key={l.id}
                      onClick={() => setLevel(l.id)}
                      className={`p-8 rounded-[2.5rem] border text-left transition-all flex items-center gap-8 ${
                        level === l.id 
                        ? 'bg-primary border-primary shadow-xl shadow-primary/20 -translate-y-1' 
                        : 'bg-bg-secondary border-border hover:border-primary/30'
                      }`}
                    >
                      <div className={`p-5 rounded-3xl ${level === l.id ? 'bg-white text-primary' : 'bg-white text-text-tertiary shadow-sm'}`}>
                         <l.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xl font-display font-bold italic mb-1 ${level === l.id ? 'text-white' : 'text-text-primary'}`}>{l.label}</h4>
                        <p className={`text-sm font-serif italic ${level === l.id ? 'text-white/80' : 'text-text-secondary'}`}>{l.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={startSimulation}
                  className="px-12 py-5 bg-text-primary text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-4 mx-auto"
                >
                  Enter Clinic <Play className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 'sim' && (
            <motion.div 
              key="sim"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto grid lg:grid-cols-[1fr,320px] gap-8 h-[700px]"
            >
              <div className="flex flex-col bg-white rounded-[3rem] border border-border shadow-soft overflow-hidden">
                {/* Chat Header */}
                <div className="p-6 bg-bg-secondary border-b border-border flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-border shadow-sm">
                         <User className="w-6 h-6 text-text-tertiary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-primary">Patient Profile</h4>
                        <p className="text-[10px] text-text-tertiary font-bold uppercase">Clinical Session Alive</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setStep('diagnosis')}
                     className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
                   >
                     Make Prescription <ClipboardCheck className="w-4 h-4" />
                   </button>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-primary/10"
                >
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-6 rounded-[2rem] text-sm font-serif italic leading-relaxed ${
                        m.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-bg-secondary text-text-primary rounded-tl-none border border-border'
                      }`}>
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                       <div className="bg-bg-secondary p-6 rounded-[2rem] animate-pulse">
                          <div className="flex gap-2">
                             <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" />
                             <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:0.2s]" />
                             <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-bg-secondary border-t border-border">
                  <div className="relative group">
                    <input 
                      type="text"
                      placeholder="Ask the patient about their symptoms..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      disabled={isLoading}
                      className="w-full bg-white pl-8 pr-16 py-5 rounded-2xl border border-border focus:border-primary/50 focus:ring-0 transition-all text-sm font-medium shadow-sm"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 disabled:opacity-0 transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="hidden lg:flex flex-col gap-6">
                 <div className="p-8 bg-white rounded-[2.5rem] border border-border shadow-soft">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-6">Patient Observations</h5>
                    <div className="space-y-4">
                       <div className="flex gap-4 p-4 bg-bg-secondary rounded-2xl border border-border border-dashed">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          <p className="text-[11px] font-bold text-text-primary italic">Note the modalities (Better/Worse) and the mental disposition of the patient.</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex-1 p-8 bg-primary-dark rounded-[2.5rem] text-white flex flex-col justify-between">
                    <div>
                      <Target className="w-10 h-10 text-accent mb-6" />
                      <h5 className="text-xl font-display font-medium italic mb-4">Clinical Objective</h5>
                      <p className="text-white/60 text-xs font-serif italic leading-relaxed">
                        Navigate the conversation to uncover at least 3 characteristic symptoms (Totalities) of the remedy.
                      </p>
                    </div>
                    
                    <div className="pt-8 mt-8 border-t border-white/10">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Confidence Level</span>
                          <span className="text-accent text-xs font-black">70%</span>
                       </div>
                       <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[70%]" />
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'diagnosis' && (
            <motion.div 
              key="diagnosis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-12 rounded-[4rem] border border-border shadow-soft">
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                      <ClipboardCheck className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-display font-medium text-text-primary italic">Final Prescription</h3>
                      <p className="text-xs font-black text-text-tertiary uppercase tracking-widest">Select the matching remedy</p>
                   </div>
                </div>

                <div className="relative mb-12 group">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                   <input 
                     type="text"
                     placeholder="Search remedy name..."
                     value={prescription}
                     onChange={(e) => setPrescription(e.target.value)}
                     className="w-full bg-bg-secondary pl-16 pr-6 py-6 rounded-[2rem] border border-transparent focus:border-primary/20 focus:bg-white transition-all text-sm font-medium"
                   />
                   
                   {prescription && !REMEDIES_FOR_SIM.includes(prescription) && (
                     <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-2xl shadow-xl z-50 p-2 max-h-48 overflow-y-auto">
                        {REMEDIES_FOR_SIM.filter(r => r.toLowerCase().includes(prescription.toLowerCase())).map(r => (
                          <button 
                            key={r}
                            onClick={() => setPrescription(r)}
                            className="w-full p-4 text-left text-sm font-bold text-text-primary hover:bg-bg-secondary rounded-xl transition-colors"
                          >
                            {r}
                          </button>
                        ))}
                     </div>
                   )}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('sim')}
                    className="flex-1 py-5 border-2 border-border text-text-secondary rounded-3xl text-sm font-black uppercase tracking-widest hover:bg-bg-secondary transition-all"
                  >
                    Back to Patient
                  </button>
                  <button 
                    onClick={submitDiagnosis}
                    disabled={!prescription || isLoading}
                    className="flex-1 py-5 bg-primary text-white rounded-3xl text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 disabled:opacity-50 transition-all"
                  >
                    {isLoading ? 'Analysing Case...' : 'Submit Verdict'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'result' && feedback && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-[4rem] border border-border shadow-soft overflow-hidden">
                <div className={`p-12 text-white flex flex-col items-center text-center relative ${feedback.score >= 80 ? 'bg-emerald-600' : 'bg-primary-dark'}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mb-8 border border-white/20">
                     <span className="text-4xl font-display font-black italic">{feedback.score}</span>
                  </div>
                  <h3 className="text-4xl font-display font-medium italic mb-2">
                    {feedback.score >= 80 ? 'Excellent Match!' : 'Learning Opportunity'}
                  </h3>
                  <p className="text-white/60 font-serif italic">
                    The secret remedy was <span className="text-white font-bold">{targetRemedy}</span>
                  </p>
                </div>

                <div className="p-12 grid md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div>
                         <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-6">
                           <ClipboardCheck className="w-4 h-4" /> Clinical Strengths
                         </h4>
                         <ul className="space-y-3">
                           {feedback.strengths.map((s: string, i: number) => (
                             <li key={i} className="flex gap-3 text-sm font-serif italic text-text-secondary leading-relaxed">
                               <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                               {s}
                             </li>
                           ))}
                         </ul>
                      </div>
                      
                      <div>
                         <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-6">
                           <Target className="w-4 h-4" /> Areas for Improvement
                         </h4>
                         <ul className="space-y-3">
                           {feedback.weaknesses.map((w: string, i: number) => (
                             <li key={i} className="flex gap-3 text-sm font-serif italic text-text-secondary leading-relaxed">
                               <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                               {w}
                             </li>
                           ))}
                         </ul>
                      </div>
                   </div>

                   <div className="bg-bg-secondary p-10 rounded-[3rem] border border-border flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-display font-bold italic text-text-primary mb-4">The Clinical Key</h4>
                        <p className="text-sm font-serif italic text-text-secondary leading-relaxed">
                          {feedback.lesson}
                        </p>
                      </div>
                      
                      <div className="pt-8 mt-8 border-t border-border flex gap-4">
                        <button 
                          onClick={() => setStep('setup')}
                          className="flex-1 py-4 bg-white border border-border text-text-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/50 transition-all"
                        >
                          New Case
                        </button>
                        <button 
                          onClick={startSimulation}
                          className="flex-1 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        >
                          Retry Session
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
