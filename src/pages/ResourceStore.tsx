import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  FileText, 
  Download, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen,
  Crown,
  Smartphone,
  Mail,
  QrCode,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { resources, Resource } from '../data/resources';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ResourceStore = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(resources[0] || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [profession, setProfession] = useState('Student');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource || !email || !name) return;
    
    setIsProcessing(true);
    try {
      const leadsPath = 'leads';
      try {
        await addDoc(collection(db, leadsPath), {
          userId: auth.currentUser?.uid || 'guest',
          userName: name,
          userEmail: email,
          userProfession: profession,
          resourceId: selectedResource.id,
          resourceTitle: selectedResource.title,
          status: 'pending',
          createdAt: serverTimestamp()
        });
      } catch (firestoreError) {
        handleFirestoreError(firestoreError, OperationType.WRITE, leadsPath);
      }

      setIsSubmitted(true);
      setPaymentStep('success');
    } catch (error) {
      console.error('Lead submission failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen pb-20">
      <Helmet>
        <title>Cheat Sheet Store | Curiva Homoeopathy</title>
        <meta name="description" content="Get the ultimate Homeopathy Modalities Cheat Sheet for BHMS & Clinical Practice." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden bg-text-primary text-white text-center">
        <div className="absolute inset-0 bg-[url('https://ais-dev-46ug6iwx2xitoihxp5k4ma-349546359089.asia-southeast1.run.app/assets/cheat_sheet_cover.png')] bg-cover bg-center opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-text-primary/90 via-text-primary to-bg-primary pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mx-auto backdrop-blur-sm"
           >
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-light">Featured Offer</span>
           </motion.div>
           
           <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-[0.85] uppercase italic">
             Homeopathy <br /><span className="text-primary not-italic">Modalities</span> <br /> Cheat Sheet
           </h1>
           
           <div className="flex flex-col items-center gap-6">
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-tight">
                Master Thermal, Motion, Time, and Food & Drink modalities of 50+ key remedies in one high-yield visual guide.
              </p>
              
              <div className="flex items-center gap-4 py-2 px-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-3xl font-black text-white italic">FREE</span>
                <div className="w-px h-8 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-light">Limited Time Offer • Digital Access</span>
              </div>
           </div>

           <div className="flex flex-wrap justify-center gap-12 pt-8">
              {[
                { icon: Smartphone, label: 'Access Anywhere' },
                { icon: Mail, label: 'Email Delivery' },
                { icon: CheckCircle2, label: 'Expert Verified' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/40">
                  <feature.icon className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{feature.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Visual Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative bg-bg-secondary border border-border p-4 rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-primary/5">
              <img 
                src="https://ais-dev-46ug6iwx2xitoihxp5k4ma-349546359089.asia-southeast1.run.app/assets/cheat_sheet_cover.png" 
                alt="Cheat Sheet Cover"
                className="w-full h-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary rounded-full text-white text-[10px] font-black uppercase tracking-widest">High Resolution PDF</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest italic">Print Friendly</span>
                  </div>
                  <h3 className="text-3xl font-black text-white italic leading-none">Clinically Important Modalities</h3>
                  <p className="text-white/60 font-medium">Quick recall guide for exams and clinic.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checkout Area */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-bg-secondary border border-border rounded-[3rem] p-10 shadow-xl"
            >
              <AnimatePresence mode="wait">
                {paymentStep === 'details' && (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-text-primary uppercase italic tracking-tight">Order Details</h3>
                      <p className="text-text-secondary font-medium">Enter your email to receive the PDF instantly.</p>
                    </div>

                    <form onSubmit={handleSubmitRequest} className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-text-primary uppercase italic tracking-tight">Request Access</h3>
                        <p className="text-text-secondary font-medium">Join our exclusive list to receive this and future high-yield resources for free.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="relative group">
                          <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                          <input 
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-16 pr-8 py-5 bg-bg-primary border border-border rounded-2.5xl focus:outline-none focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all font-bold"
                          />
                        </div>

                        <div className="relative group">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                          <input 
                            type="email"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-16 pr-8 py-5 bg-bg-primary border border-border rounded-2.5xl focus:outline-none focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all font-bold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {['Student', 'Doctor'].map((prof) => (
                            <button
                              key={prof}
                              type="button"
                              onClick={() => setProfession(prof)}
                              className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                profession === prof 
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                : 'bg-bg-primary text-text-secondary border-border hover:border-primary/30'
                              }`}
                            >
                              {prof}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isProcessing || !email || !name}
                        className="w-full py-6 bg-primary text-white rounded-2.5xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3"
                      >
                        {isProcessing ? 'Processing...' : 'Get Access Now'} <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {paymentStep === 'success' && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-8"
                  >
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/30">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-text-primary italic leading-none">Request Received!</h3>
                      <p className="text-text-secondary font-medium px-8">Thank you, <span className="text-text-primary font-bold">{name}</span>. We've received your request for the <span className="text-text-primary font-bold">{selectedResource?.title}</span>. Our team will process this and email you within 24 hours.</p>
                      <p className="inline-block px-4 py-2 bg-primary/5 rounded-xl text-primary font-black tracking-tight">{email}</p>
                    </div>

                    <div className="pt-6 flex justify-center">
                       <button 
                         onClick={() => navigate('/community')}
                         className="flex items-center gap-3 px-10 py-5 bg-text-primary text-bg-primary rounded-2xl hover:scale-105 transition-all shadow-xl font-black uppercase tracking-widest text-[10px]"
                       >
                         Join Community Group <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Testimonials/Info */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-bg-secondary border border-border rounded-[2rem]">
                 <span className="text-primary font-black italic block mb-2">5,000+</span>
                 <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Students Trust Our Resources</p>
               </div>
               <div className="p-6 bg-bg-secondary border border-border rounded-[2rem]">
                 <span className="text-primary font-black italic block mb-2">Instant</span>
                 <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Email Delivery Guaranteed</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestion Section */}
      <section className="max-w-4xl mx-auto px-4 mt-32">
        <div className="p-10 bg-bg-secondary rounded-[3rem] border border-border text-center">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-6" />
          <h3 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic mb-4">
            Need customized <span className="text-primary italic">Materials?</span>
          </h3>
          <p className="text-text-secondary mb-8 font-medium">
            We are constantly improving our vault. Let us know if you need specific remedy charts or subject notes.
          </p>
          <button 
            onClick={() => navigate('/feedback')}
            className="px-10 py-5 bg-text-primary text-bg-primary font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl"
          >
            Request Resources
          </button>
        </div>
      </section>
    </div>
  );
};

export default ResourceStore;

