import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  History, 
  HelpCircle, 
  ShieldCheck, 
  User, 
  Clock, 
  CheckCircle, 
  ChevronRight,
  Filter,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { questionService, Question, QuestionStatus } from '../services/questionService';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const AskHomeopath: React.FC = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'ask' | 'my-questions' | 'featured' | 'admin'>('ask');
  
  // Form State
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Data State
  const [myQuestions, setMyQuestions] = useState<Question[]>([]);
  const [featuredQuestions, setFeaturedQuestions] = useState<Question[]>([]);
  const [adminQuestions, setAdminQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is admin
        const adminRef = doc(db, 'admins', currentUser.uid);
        const adminDoc = await getDoc(adminRef);
        
        // Hardcoded admin for dev (as per rules)
        const isHardcodedAdmin = currentUser.email === 'premmore0552@gmail.com';
        
        setIsAdmin(adminDoc.exists() || isHardcodedAdmin);
        fetchMyQuestions();
      }
      setLoading(false);
    });

    fetchFeatured();

    return () => unsubscribe();
  }, []);

  const fetchMyQuestions = async () => {
    const questions = await questionService.getMyQuestions();
    if (questions) setMyQuestions(questions);
  };

  const fetchFeatured = async () => {
    const questions = await questionService.getFeaturedQuestions();
    if (questions) setFeaturedQuestions(questions);
  };

  const fetchAdminQuestions = async () => {
    if (!isAdmin) return;
    const questions = await questionService.getAllQuestionsForAdmin();
    if (questions) setAdminQuestions(questions);
  };

  useEffect(() => {
    if (activeTab === 'admin' && isAdmin) {
      fetchAdminQuestions();
    }
  }, [activeTab, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage('Please sign in to ask a question.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    
    try {
      await questionService.submitQuestion(subject, content, isAnonymous);
      setSuccessMessage('Your question has been submitted successfully! Our experts will review it soon.');
      setSubject('');
      setContent('');
      setIsAnonymous(false);
      fetchMyQuestions();
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      setErrorMessage('Failed to submit question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAnswerSubmit = async (questionId: string, answer: string, feature: boolean) => {
    try {
      await questionService.answerQuestion(
        questionId, 
        answer, 
        feature ? QuestionStatus.FEATURED : QuestionStatus.ANSWERED
      );
      fetchAdminQuestions();
    } catch (error) {
      alert('Failed to submit answer');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Ask a Homeopath | Expert Clinical Guidance | Curiva"
        description="Submit your questions to qualified homeopathic professionals and explore our featured clinical case studies."
      />

      {/* Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <MessageSquare className="w-96 h-96 text-accent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-10"
           >
             <ShieldCheck className="w-4 h-4 text-accent-light" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light">Expert Consultations</span>
           </motion.div>
           <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col">
             <span>Consult</span>
             <span className="text-accent italic lg:ml-24">Experts</span>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-serif italic leading-tight mt-12">
             Bridge the gap between theory and practice. Get direct insights from seasoned clinical practitioners.
           </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="flex flex-wrap gap-2 p-2 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-2xl w-fit mb-12">
          {[
            { id: 'ask', name: 'Ask a Question', icon: HelpCircle },
            { id: 'featured', name: 'Clinical Q&A', icon: Sparkles },
            { id: 'my-questions', name: 'My History', icon: History, auth: true },
            { id: 'admin', name: 'Admin Panel', icon: ShieldCheck, admin: true },
          ].filter(tab => (!tab.auth || user) && (!tab.admin || isAdmin)).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'ask' && (
            <motion.div
              key="ask-tab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              <div className="bg-white p-12 rounded-[3.5rem] border border-border shadow-soft">
                <h2 className="text-4xl font-display font-medium text-text-primary italic mb-8">Submit Your <span className="text-primary italic">Inquiry</span></h2>
                
                {!user ? (
                  <div className="p-12 text-center bg-bg-secondary rounded-[2.5rem] border border-dashed border-border group">
                    <Lock className="w-16 h-16 text-primary/30 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-display font-medium text-text-primary italic mb-4">Authentication Required</h3>
                    <p className="text-text-secondary font-serif italic mb-8">You must be logged into your Curiva account to submit clinical inquiries for professional review.</p>
                    <button className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                      Sign In to Continue
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-3 block">Subject</label>
                      <input 
                        type="text" 
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Differential between Lycopodium and Chelidonium in Liver Case"
                        className="w-full px-8 py-5 bg-bg-secondary border border-border rounded-3xl font-serif italic text-lg focus:border-primary focus:ring-0 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-3 block">Question Details</label>
                      <textarea 
                        required
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Please provide clinical context, keynotes observed, and your specific dilemma..."
                        className="w-full px-8 py-5 bg-bg-secondary border border-border rounded-3xl font-serif italic text-lg focus:border-primary focus:ring-0 transition-all outline-none resize-none"
                      />
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-bg-secondary rounded-[2rem] border border-border">
                      <button
                        type="button"
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className={`w-12 h-6 rounded-full relative transition-colors ${isAnonymous ? 'bg-primary' : 'bg-border'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAnonymous ? 'left-7' : 'left-1'}`} />
                      </button>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-primary block">Ask Anonymously</span>
                        <span className="text-[10px] text-text-secondary opacity-60">Your identity will be hidden if selected for the public blog.</span>
                      </div>
                    </div>

                    {successMessage && (
                      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center gap-4 text-emerald-700">
                        <CheckCircle className="w-6 h-6 shrink-0" />
                        <p className="text-sm font-serif italic">{successMessage}</p>
                      </div>
                    )}

                    {errorMessage && (
                      <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center gap-4 text-rose-700">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <p className="text-sm font-serif italic">{errorMessage}</p>
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-6 bg-primary text-white rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Dispatch Clinical Inquiry
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div className="p-10 bg-primary-dark rounded-[3.5rem] text-white shadow-soft relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1)_0%,transparent_50%)]" />
                  <ShieldCheck className="w-12 h-12 mb-8 text-accent opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-display font-medium text-accent italic mb-4">Professional Ethics</h3>
                  <p className="text-lg text-white/70 font-serif italic leading-relaxed">
                    Our panel consists of registered homeopathic practitioners. While we provide clinical insights, these consultations do not replace formal medical advice or emergency care.
                  </p>
                </div>

                <div className="p-10 bg-white rounded-[3.5rem] border border-border shadow-soft relative overflow-hidden group">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 border-b border-border pb-4">Consultation Workflow</h4>
                  <div className="space-y-8">
                    {[
                      { step: '01', title: 'Submission', desc: 'Detail your inquiry with as much clinical data as possible.' },
                      { step: '02', title: 'Review', desc: 'Case distributed to relevant clinical expert for analysis.' },
                      { step: '03', title: 'Resolution', desc: 'Expert reply added to your clinical history within 48-72h.' }
                    ].map(item => (
                      <div key={item.step} className="flex gap-6">
                        <span className="text-3xl font-display font-medium text-primary italic opacity-20">{item.step}</span>
                        <div>
                          <h5 className="text-[11px] font-black uppercase tracking-widest text-text-primary mb-1">{item.title}</h5>
                          <p className="text-sm text-text-secondary font-serif italic opacity-70">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'featured' && (
            <motion.div
              key="featured-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-8"
            >
              {featuredQuestions.map((q) => (
                <div key={q.id} className="bg-white rounded-[3.5rem] border border-border shadow-soft p-12 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                    <Sparkles className="w-64 h-64 text-primary" />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Case Study</span>
                    <span className="text-text-secondary/60 text-[10px] font-bold uppercase tracking-widest italic">{new Date(q.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-display font-medium text-text-primary italic tracking-tight mb-8 leading-tight">
                    {q.subject}
                  </h3>

                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-50">Observation</span>
                        <p className="text-lg text-text-primary font-serif italic leading-relaxed bg-bg-primary p-8 rounded-[2.5rem] border border-border">"{q.content}"</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <User className="w-4 h-4 text-primary/40" />
                         <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Inquiry by {q.isAnonymous ? 'Anonymous Practitioner' : q.userName}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Professional Synthesis</span>
                        <div className="text-lg text-text-primary font-serif italic leading-relaxed bg-accent/5 p-8 rounded-[2.5rem] border border-accent/20 border-dashed">
                          {q.answer ? q.answer : 'Expert synthesis pending review...'}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <ShieldCheck className="w-4 h-4 text-accent" />
                         <span className="text-[10px] font-bold text-accent uppercase tracking-widest italic">Clinical Reply by {q.answeredBy || 'Curiva Panel'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {featuredQuestions.length === 0 && (
                <div className="p-20 text-center bg-white rounded-[3.5rem] border border-border">
                   <HelpCircle className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                   <p className="text-xl font-serif italic text-text-secondary">No featured clinical Q&As available at this moment.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'my-questions' && (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {myQuestions.map((q) => (
                <div key={q.id} className="bg-white p-10 rounded-[3rem] border border-border shadow-soft flex flex-col md:flex-row gap-8 items-start">
                  <div className={`w-20 h-20 rounded-[1.5rem] shrink-0 flex items-center justify-center border ${
                    q.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                    q.status === 'answered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' :
                    'bg-primary/10 border-primary/20 text-primary'
                  }`}>
                    {q.status === 'pending' ? <Clock className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        q.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                        q.status === 'answered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' :
                        'bg-primary/10 border-primary/20 text-primary'
                      }`}>
                        {q.status}
                      </span>
                      <span className="text-[10px] text-text-secondary font-bold uppercase tracking-tighter opacity-40">
                         Ref: {q.id.substring(0, 8)} • {new Date(q.createdAt?.seconds * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-2xl font-display font-medium text-text-primary italic mb-4">{q.subject}</h4>
                    <p className="text-text-secondary font-serif italic mb-6 line-clamp-2">"{q.content}"</p>
                    {q.answer && (
                      <div className="mt-6 p-8 bg-bg-secondary rounded-[2rem] border border-border">
                        <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest mb-4">
                          <Check className="w-3 h-3" /> Professional Reply
                        </div>
                        <p className="text-lg text-text-primary font-serif italic leading-relaxed">{q.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {myQuestions.length === 0 && (
                <div className="p-20 text-center bg-white rounded-[3.5rem] border border-border">
                   <History className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                   <p className="text-xl font-serif italic text-text-secondary">Your clinical consultation history is empty.</p>
                   <button 
                     onClick={() => setActiveTab('ask')}
                     className="mt-8 px-10 py-4 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px]"
                   >
                     Submit Your First Inquiry
                   </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <motion.div
              key="admin-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Expert <span className="text-primary">Control Desk</span></h2>
                <div className="p-3 bg-bg-secondary rounded-2xl border border-border font-bold text-xs">
                   Logged in as: <span className="text-primary">{user?.email}</span>
                </div>
              </div>
              
              <div className="grid gap-6">
                {adminQuestions.map((q) => (
                  <AdminQuestionItem key={q.id} question={q} onAnswer={handleAnswerSubmit} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AdminQuestionItem: React.FC<{ 
  question: Question, 
  onAnswer: (id: string, answer: string, feature: boolean) => Promise<void> 
}> = ({ question: q, onAnswer }) => {
  const [answer, setAnswer] = useState(q.answer || '');
  const [isFeatured, setIsFeatured] = useState(q.status === QuestionStatus.FEATURED);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(q.status === QuestionStatus.PENDING);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onAnswer(q.id, answer, isFeatured);
      setIsExpanded(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-[3rem] border transition-all duration-500 overflow-hidden ${isExpanded ? 'border-primary ring-4 ring-primary/5 shadow-2xl' : 'border-border'}`}>
      <div 
        className="p-8 flex flex-col md:flex-row gap-6 items-start md:items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center ${
          q.status === QuestionStatus.PENDING ? 'bg-amber-500/10 text-amber-600' : 
          q.status === QuestionStatus.ANSWERED ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'
        }`}>
          {q.status === QuestionStatus.PENDING ? <Clock className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[9px] font-black uppercase text-text-tertiary">Patient ID: {q.userId.substring(0, 8)}</span>
            <span className="text-[9px] font-black uppercase text-primary">Status: {q.status}</span>
          </div>
          <h4 className="text-xl font-display font-medium text-text-primary italic truncate">{q.subject}</h4>
        </div>
        <button className={`p-4 rounded-full transition-transform ${isExpanded ? 'rotate-90 text-primary' : 'text-text-tertiary opacity-30'}`}>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="p-10 space-y-10">
              <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <User className="w-5 h-5 text-primary" />
                     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-primary">Clinical Context</h5>
                  </div>
                  <div className="p-8 bg-bg-secondary rounded-[2.5rem] border border-border font-serif italic text-lg leading-relaxed shadow-inner">
                    "{q.content}"
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold flex items-center gap-2">
                       <span className="opacity-40">User:</span> {q.userName}
                    </div>
                    <div className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold flex items-center gap-2">
                       <span className="opacity-40">Email:</span> {q.userEmail}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="w-5 h-5 text-accent" />
                     <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Formal Response</h5>
                  </div>
                  <textarea 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter professional clinical synthesis..."
                    className="w-full p-8 bg-accent/5 border border-accent/20 rounded-[2.5rem] font-serif italic text-lg focus:border-accent focus:ring-0 transition-all outline-none resize-none min-h-[250px]"
                  />
                  <div className="flex items-center gap-4 p-6 bg-accent/5 rounded-[2rem] border border-accent/10 border-dashed">
                      <button
                        type="button"
                        onClick={() => setIsFeatured(!isFeatured)}
                        className={`w-12 h-6 rounded-full relative transition-colors ${isFeatured ? 'bg-accent' : 'bg-border'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isFeatured ? 'left-7' : 'left-1'}`} />
                      </button>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent block">Feature on Blog</span>
                        <span className="text-[10px] text-text-secondary opacity-60 italic">Marks this Q&A as publicly visible (Anonymized).</span>
                      </div>
                    </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="px-10 py-5 bg-bg-secondary text-text-secondary rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-border transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !answer}
                  className="px-12 py-5 bg-accent text-primary-dark rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? <Lock className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Finalize Response
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskHomeopath;
