import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  Loader2, 
  User, 
  HelpCircle, 
  AlertCircle, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export default function AskHomeopath() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Suggested starting dialogue variables
  const suggestedPrompts = [
    { label: "What is constitutional prescribing?", query: "Can you explain what constitutional prescribing means in homeopathy, and how a remedy is selected?" },
    { label: "How do dilutions and potencies work?", query: "How do homeopathic dilutions (like 30C or 200C) work if they are so diluted?" },
    { label: "Are remedies safe with allopathy?", query: "Is it safe to take homeopathic remedies of high dilutions alongside my prescribed allopathic medications?" },
    { label: "What is the Law of Similars?", query: "What is the core baseline philosophy behind the 'Law of Similars' in classical homeopathy?" }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Populate initial friendly greeting
    setMessages([
      {
        id: 'initial_greet',
        role: 'model',
        text: `Hello! I am your ✨ **Curiva Homeopathic Consultation Companion**. 

I am here to guide you through classical homeopathic principles, help you understand constitutional remedy selecting, clarify potency questions, and explain how natural therapeutic triggers can restore balance to your vital force.

Feel free to click one of the quick prompts below or ask me about any holistic health philosophies directly! How can I support your healing journey today?`,
        timestamp: new Date()
      }
    ]);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (userQuery: string) => {
    if (!userQuery.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text: userQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setErrorText('');

    try {
      // Map stateful message arrays for API consistency
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        text: msg.text
      }));

      const res = await fetch('/api/gemini/curiva-care', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: userQuery,
          conversationHistory
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setMessages(prev => [...prev, {
          id: `ai_${Date.now()}`,
          role: 'model',
          text: data.text,
          timestamp: new Date()
        }]);
      } else {
        throw new Error(data.error || "Failed back-end retrieval.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorText("Our clinical server is currently syncing connection layers. Please retry your message.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-8 pb-24 font-sans text-text-primary">
      <SEO 
        title="Interactive Homeopathy AI Assistant | Curiva Homoeopathy"
        description="Connect with Curiva's AI Consultation Companion to explore constitutional remedies, potentization, and holistic healing philosophy safely."
      />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-border pb-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary animate-pulse">
              <Heart className="w-5.5 h-5.5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-medium text-primary">Homeopathy AI Assistant</h1>
              <p className="text-xs text-text-tertiary">Real-time classical therapeutics &amp; organon guidelines</p>
            </div>
          </div>
          <Link to="/" className="text-xs text-primary hover:text-accent font-bold transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chat Window Frame (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-border rounded-[2.5rem] shadow-soft overflow-hidden flex flex-col h-[650px] relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.04)_0%,transparent_70%)] pointer-events-none" />

            {/* Chat Room Status Header */}
            <div className="px-6 py-4.5 border-b border-border bg-bg-primary/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-primary">Companion Consultation Online</span>
              </div>
              <span className="text-[10px] font-mono text-text-tertiary">Secured SSL Session</span>
            </div>

            {/* Message Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3.5 max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8.5 h-8.5 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.role === 'user' ? 'bg-accent text-white' : 'bg-primary text-white'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-accent" />}
                  </div>

                  <div className="space-y-1">
                    <div className={`p-4.5 rounded-2xl text-xs md:text-sm leading-relaxed prose prose-slate max-w-none ${
                       msg.role === 'user' 
                        ? 'bg-accent/10 border border-accent/20 text-primary rounded-tr-none font-medium' 
                        : 'bg-bg-primary border border-border text-text-secondary rounded-tl-none'
                    }`}>
                      {msg.role === 'user' ? (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      ) : (
                        <div className="markdown-body">
                          <ReactMarkdown
                            components={{
                              a: ({node, ...props}) => {
                                const isInternal = props.href?.startsWith('/');
                                if (isInternal) {
                                  return (
                                    <Link 
                                      to={props.href || '/'} 
                                      className="text-accent hover:text-primary font-bold underline transition-colors"
                                    >
                                      {props.children}
                                    </Link>
                                  );
                                }
                                return (
                                  <a 
                                    {...props} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-accent hover:text-primary font-bold underline transition-colors"
                                  />
                                );
                              }
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] text-text-tertiary block font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3.5 max-w-[85%] animate-pulse">
                  <div className="w-8.5 h-8.5 rounded-full bg-primary text-white shrink-0 flex items-center justify-center">
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  </div>
                  <div className="bg-bg-primary border border-border p-4 rounded-2xl rounded-tl-none text-xs text-text-tertiary">
                    Reviewing classical pharmacopoeia guidelines...
                  </div>
                </div>
              )}

              {errorText && (
                <div className="p-4 bg-red-100 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4.5 h-4.5" />
                  {errorText}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggested Prompt Rails */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-6 py-3 border-t border-border bg-bg-primary/20 flex flex-wrap gap-2.5">
                {suggestedPrompts.map((p, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(p.query)}
                    className="text-[10px] font-bold text-primary hover:text-white bg-white border border-border hover:bg-primary hover:border-primary px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Box */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} 
              className="p-4.5 border-t border-border bg-white flex gap-3 items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about constitutional remedies, Organon guidelines, or chronic miasms..."
                disabled={isTyping}
                className="flex-grow px-5 py-3 rounded-xl border border-border bg-bg-primary focus:outline-none focus:border-primary text-xs md:text-sm font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className={`p-3.5 rounded-xl transition-all ${
                  inputText.trim() && !isTyping 
                    ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer' 
                    : 'bg-border text-text-tertiary cursor-not-allowed'
                }`}
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>

          {/* Clinical Context Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-border rounded-[2rem] p-6.5 shadow-soft space-y-4">
              <h4 className="text-sm font-display text-[#c5a059] uppercase font-black tracking-widest flex items-center gap-1.5 leading-none">
                <ShieldCheck className="w-4 h-4" /> Science &amp; Safety
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Homeopathy is a gentle complementary therapeutic art. Registered remedies are prepared in accordance with official Homeopathic Pharmacopoeias. They stimulate wellness and do not substitute standard emergency medical settings.
              </p>
            </div>

            <div className="bg-white border border-border rounded-[2rem] p-6.5 shadow-soft space-y-4">
              <h4 className="text-sm font-display text-primary uppercase font-bold tracking-tight">Core Healing Principles</h4>
              
              <div className="space-y-3">
                {[
                  { name: 'Similia Similibus Curentur', desc: 'Like cures like: substances causing physical symptoms in healthy provers can cure similar symptoms in patients.' },
                  { name: 'The Single Remedy Rule', desc: 'Classical homeopathy mandates prescribing one unified remedy at any time to preserve clean symptom pictures.' },
                  { name: 'The Minimum Dose Law', desc: 'Remedies are repetitively succussed and diluted, capturing energetic signatures while neutralizing toxicity.' },
                  { name: 'Miasmatic Foundation', desc: 'Evaluating chronic illness layers of Psoric, Sycotic, and Syphilitic inherited disease tendencies.' }
                ].map((bio, bioIdx) => (
                  <div key={bioIdx} className="border-l-2 border-primary/20 pl-3 space-y-0.5">
                    <span className="text-[11px] font-bold text-primary block">{bio.name}</span>
                    <span className="text-[9px] text-text-tertiary block leading-tight">{bio.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-primary text-white border border-primary/20 rounded-[2rem] p-6 shadow-soft text-center space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-300">STUDENT ASSISTANCE</span>
              <h4 className="text-base font-display font-light">Explore symptoms on our interactive study maps</h4>
              <Link 
                to="/symptom-checker" 
                className="w-full inline-flex items-center justify-center gap-1 bg-white text-primary text-[10px] font-bold uppercase tracking-wider p-3 rounded-xl hover:bg-accent hover:text-white transition-all cursor-pointer"
              >
                Launch Symptom Checker <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
