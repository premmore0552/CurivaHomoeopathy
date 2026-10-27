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
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { resources, Resource } from '../data/resources';
import { auth } from '../lib/firebase';

const ResourceStore = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(resources[0] || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'verification-error' | 'success'>('details');
  const [email, setEmail] = useState('');
  const [verifiedDownloadUrl, setVerifiedDownloadUrl] = useState('');
  const [emailDelivery, setEmailDelivery] = useState<'sent' | 'not-configured' | 'failed' | 'expired' | null>(null);
  const [verificationPayload, setVerificationPayload] = useState<any | null>(null);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationCanRetry, setVerificationCanRetry] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [profession, setProfession] = useState('Student');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const verifyPayment = async (response: any) => {
    setVerificationPayload(response);
    setPaymentStep('payment');
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const verifyRes = await fetch('/api/verify-razorpay-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify(response)
      });
      const result = await verifyRes.json();

      if (!verifyRes.ok || !result.success) {
        if (result.paymentVerified) {
          setVerificationMessage(result.error || 'Payment was verified but its secure record is not ready.');
          setVerificationCanRetry(Boolean(result.retryable));
          setPaymentStep('verification-error');
          return;
        }
        setVerificationPayload(null);
        setPaymentStep('details');
        alert(result.error || result.message || 'We could not verify this payment. If your bank shows a debit, contact support before trying again.');
        return;
      }

      setVerifiedDownloadUrl(typeof result.downloadUrl === 'string' && result.downloadUrl.startsWith('https://') ? result.downloadUrl : '');
      setEmailDelivery(['sent', 'not-configured', 'failed', 'expired'].includes(result.emailDelivery) ? result.emailDelivery : 'not-configured');
      setVerificationPayload(null);
      setVerificationMessage('');
      setVerificationCanRetry(false);
      setPaymentStep('success');
    } catch (verifyError) {
      console.error('Payment verification request failed:', verifyError);
      setVerificationMessage('The verification response was interrupted. You can retry verification with this same payment; this will not charge you again.');
      setVerificationCanRetry(true);
      setPaymentStep('verification-error');
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource || !email) return;
    
    setIsProcessing(true);
    try {
      // 1. Create order on server
      const createOrderToken = await auth.currentUser?.getIdToken();
      const orderRes = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(createOrderToken ? { Authorization: `Bearer ${createOrderToken}` } : {}),
        },
        body: JSON.stringify({
          resourceId: selectedResource.id,
          email: email.trim()
        })
      });

      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.details || order.error || 'Failed to create order');

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Curiva Homoeopathy",
        description: `Get ${selectedResource.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          await verifyPayment(response);
        },
        prefill: {
          email: email
        },
        notes: {
          resource_id: selectedResource.id
        },
        theme: {
          color: "#df392e"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        setPaymentStep('details');
        const message = response?.error?.description || 'Payment did not complete.';
        alert(`${message} If your bank shows a debit, confirm the status before retrying.`);
      });
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Failed to initiate payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-bg-primary min-h-screen pb-20">
      <Helmet>
        <title>Cheat Sheet Store | Curiva Homoeopathy</title>
        <meta name="description" content="Get the ultimate Homoeopathy Modalities Cheat Sheet for BHMS & Clinical Practice." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 px-4 overflow-hidden bg-[#0F3D75] dark:bg-[#0B0F19] text-white text-center">
        <div className="absolute inset-0 bg-[url('https://curivahomoeopathy.netlify.app/assets/cheat_sheet_cover.png')] bg-cover bg-center opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-text-primary/90 via-text-primary to-bg-primary pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mx-auto backdrop-blur-sm"
           >
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-light">Educational Series</span>
           </motion.div>
           
           <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-display font-black text-white tracking-tighter leading-[0.95] uppercase italic">
             Homoeopathy <br /><span className="text-primary not-italic">Modalities</span> <br /> Cheat Sheet
           </h1>
           
           <div className="flex flex-col items-center gap-6">
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-tight">
                Master Thermal, Motion, Time, and Food & Drink modalities of 50+ key remedies in one high-yield visual guide.
              </p>
              
              <div className="flex items-center gap-4 py-2 px-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-3xl font-black text-white italic">₹{(selectedResource?.price ?? 0).toLocaleString('en-IN')}</span>
                <div className="w-px h-8 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-light">One-time payment • Download after verification</span>
              </div>
           </div>

           <div className="flex flex-wrap justify-center gap-12 pt-8">
              {[
                { icon: Smartphone, label: 'Access Anywhere' },
                { icon: Mail, label: 'Direct Download' },
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
      <section className="max-w-7xl mx-auto min-w-0 px-4 -mt-8 sm:-mt-10 relative z-20">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Visual Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative min-w-0 bg-bg-secondary border border-border p-3 sm:p-4 rounded-3xl sm:rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-primary/5">
              <img 
                src="https://curivahomoeopathy.netlify.app/assets/cheat_sheet_cover.png" 
                alt="Cheat Sheet Cover"
                className="w-full h-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-8 lg:p-12">
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
              className="bg-bg-secondary border border-border rounded-3xl sm:rounded-[3rem] p-5 sm:p-8 lg:p-10 shadow-xl"
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
                      <h3 className="text-2xl font-black text-text-primary uppercase italic tracking-tight">Access Resource</h3>
                      <p className="text-text-secondary font-medium">After payment is verified, the download link appears here. Automated email delivery is not enabled yet.</p>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-8">
                      <div className="space-y-4">
                        <div className="relative group">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
                          <input 
                            type="email"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-16 pr-8 py-5 bg-bg-primary border border-border rounded-2.5xl focus:outline-none focus:border-primary/50 transition-all font-bold"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isProcessing || !email}
                        className="w-full py-6 bg-primary text-white rounded-2.5xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {isProcessing ? 'Preparing Checkout...' : `Pay ₹${(selectedResource?.price ?? 0).toLocaleString('en-IN')} & Get PDF`} <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {paymentStep === 'payment' && (
                  <motion.div key="verification" className="py-16 text-center space-y-4" role="status" aria-live="polite">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                    <h3 className="text-xl font-black text-text-primary">Verifying payment</h3>
                    <p className="mx-auto max-w-sm text-sm text-text-secondary">We are checking the payment directly with Razorpay. Please keep this page open and do not retry while verification is in progress.</p>
                  </motion.div>
                )}

                {paymentStep === 'verification-error' && (
                  <motion.div key="verification-error" className="py-10 text-center space-y-4" role="alert">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600"><X className="h-6 w-6" /></div>
                    <h3 className="text-xl font-black text-text-primary">Payment received — access is not ready yet</h3>
                    <p className="mx-auto max-w-md text-sm text-text-secondary">{verificationMessage || 'Your payment was verified. Do not pay again while we resolve order recording.'}</p>
                    {verificationCanRetry && verificationPayload && (
                      <button type="button" onClick={() => void verifyPayment(verificationPayload)} className="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:opacity-90">
                        Retry verification (no new payment)
                      </button>
                    )}
                    <p className="text-xs text-text-tertiary">Keep your Razorpay payment ID for support. This screen will never ask you to pay again to retry verification.</p>
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
                      <h3 className="text-3xl font-black text-text-primary italic leading-none">Payment Verified</h3>
                      <p className="text-text-secondary font-medium px-4">Razorpay has confirmed your payment for <span className="text-text-primary font-bold">{selectedResource?.title}</span>. Use the private download link below.</p>
                      {emailDelivery === 'sent' && <p className="mx-auto max-w-md rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-text-secondary">A download email was accepted by the configured email provider. Check your inbox and spam folder.</p>}
                      {emailDelivery === 'failed' && <p className="mx-auto max-w-md rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-text-secondary">The email provider could not send the download email. Download directly below; do not purchase again.</p>}
                      {emailDelivery === 'expired' && <p className="mx-auto max-w-md rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-text-secondary">The email link could not be issued because the original order is too old. Your fresh download link is available below.</p>}
                      {emailDelivery === 'not-configured' && <p className="mx-auto max-w-md rounded-xl border border-slate-500/20 p-3 text-sm text-text-secondary">Email delivery is not configured; your download is available below.</p>}
                      <p className="inline-block px-4 py-2 bg-primary/5 rounded-xl text-primary font-black tracking-tight">{email}</p>
                    </div>

                    {verifiedDownloadUrl && (
                      <div className="pt-2">
                        <a 
                          href={verifiedDownloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all shadow-lg font-black uppercase tracking-widest text-[11px]"
                        >
                          <Download className="w-4 h-4" /> Download PDF Instantly
                        </a>
                      </div>
                    )}
                    {!verifiedDownloadUrl && (
                      <p className="mx-auto max-w-md rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-text-secondary">
                        Payment was verified, but no download link was returned. Please contact Curiva support with your Razorpay payment ID. Do not purchase again.
                      </p>
                    )}

                    <div className="pt-6 flex justify-center">
                       <button 
                         onClick={() => navigate('/student-resources')}
                         className="flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl hover:scale-105 hover:bg-primary-dark transition-all shadow-xl font-black uppercase tracking-widest text-[10px]"
                       >
                         Join Community Group <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Testimonials/Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-6 bg-bg-secondary border border-border rounded-[2rem]">
                 <span className="text-primary font-black italic block mb-2">5,000+</span>
                 <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Students Trust Our Resources</p>
               </div>
               <div className="p-6 bg-bg-secondary border border-border rounded-[2rem]">
                 <span className="text-primary font-black italic block mb-2">Direct</span>
                 <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Download after verification</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestion Section */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
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
            className="px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 hover:bg-primary-dark transition-all shadow-xl"
          >
            Request Resources
          </button>
        </div>
      </section>
    </div>
  );
};

export default ResourceStore;

