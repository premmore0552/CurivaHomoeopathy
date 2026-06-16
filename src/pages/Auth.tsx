import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  LogIn, 
  KeyRound, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  ChevronLeft,
  Loader2,
  Phone,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  auth, 
  googleProvider,
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from '../lib/firebase';
import { userService } from '../services/userService';
import SEO from '../components/SEO';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Access mode selector: 'email' or 'phone'
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Email mode Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('user');
  
  // Phone mode Fields
  const [phoneNumber, setPhoneNumber] = useState('+91 ');
  const [otpCode, setOtpCode] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect path
  const redirectPath = location.state?.from || '/profile';

  const handleAuthError = (err: any, actionName: string = 'Authentication') => {
    console.error(err);
    const code = err.code || '';
    const message = err.message || '';

    if (
      code === 'auth/firebase-app-check-token-is-invalid' || 
      message.includes('firebase-app-check-token-is-invalid') || 
      code === 'auth/app-check-invalid-token' ||
      message.includes('app-check-token-is-invalid')
    ) {
      setError(
        <div className="space-y-3 text-left bg-red-500/5 p-4 rounded-xl border border-red-500/10">
          <p className="font-extrabold text-red-600 uppercase tracking-wide text-[10px]">Firebase App Check Blocked Access</p>
          <p className="text-[11px] leading-relaxed text-red-500">
            Your Firebase project has <b>App Check Enforcement</b> active for Authentication & APIs. Since this development session runs inside a secure local sandbox, this request failed token validation:
          </p>
          <ul className="list-disc pl-4 text-[10px] space-y-1.5 text-red-600/90 font-bold leading-normal">
            <li>
              <b>Quick Sandbox Bypass:</b> Go to your <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-700">Firebase Console</a> &gt; <b>App Check</b> &gt; <b>APIs</b>. Under <b>Identity Toolkit API (Auth)</b>, change settings to "Monitor" or temporarily "Unenforce" App Check.
            </li>
            <li>
              <b>Developer Solution:</b> If you need active App Check protection, please register a reCAPTCHA Enterprise/v3 site key on Firebase and initialize it using <code>initializeAppCheck()</code> in your client code.
            </li>
          </ul>
        </div>
      );
      return;
    }

    if (
      code === 'auth/internal-error' || 
      code === 'auth/unauthorized-domain' || 
      message.includes('internal-error') || 
      message.includes('unauthorized-domain')
    ) {
      setError(
        <div className="space-y-3 text-left bg-red-500/5 p-4 rounded-xl border border-red-500/10">
          <p className="font-extrabold text-red-600 uppercase tracking-wide text-[10px]">Firebase Project Scope Config Error</p>
          <p className="text-[11px] leading-relaxed text-red-500">
            We encountered a Firebase configuration / connection error (<b>{code || 'auth/internal-error'}</b>). Please ensure your Firebase Console has the following active:
          </p>
          <ol className="list-decimal pl-4 text-[10px] space-y-1.5 text-red-600/90 font-bold leading-normal">
            <li>Go to <b>Firebase Console</b> &gt; Authentication &gt; <b>Sign-in method</b>, edit and enable the providers (<b>Google</b> and <b>Phone</b>).</li>
            <li>Go to Authentication &gt; <b>Settings</b> &gt; <b>Authorized domains</b>, and add <code>{window.location.hostname}</code>.</li>
            <li>Make sure <b>Identity Toolkit API</b> is enabled on GCP Console (Project ID: <code>gen-lang-client-0830179867</code>).</li>
            <li><b>Iframe Sandbox note:</b> If using Google/Phone authentication inside the embedded AI Studio iframe, third-party cookies or popups might be blocked by your browser. Open the application in a <b>new tab</b> (using the icon in the top right corner) or log in using <b>Email & Password</b>, which works perfectly inside the iframe.</li>
          </ol>
        </div>
      );
      return;
    }

    // Default friendly overrides
    let friendlyMessage = message || `${actionName} failed.`;
    if (code === 'auth/email-already-in-use') {
      friendlyMessage = 'Email address already registered to another account.';
    } else if (code === 'auth/weak-password') {
      friendlyMessage = 'Choice of password is too weak. Ensure it is at least 6 characters.';
    } else if (code === 'auth/invalid-email') {
      friendlyMessage = 'Please enter a valid email address.';
    } else if (code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
      friendlyMessage = 'Incorrect credentials. Verify your email and password combination.';
    } else if (code === 'auth/invalid-phone-number') {
      friendlyMessage = 'Format not recognized. Use the +[CountryCode][Number] format (e.g., +919012345678).';
    } else if (code === 'auth/too-many-requests') {
      friendlyMessage = 'Too many requests. This phone number is temporarily locked for security. Please try again later.';
    } else if (code === 'auth/invalid-verification-code') {
      friendlyMessage = 'The verification code entered is incorrect. Double check and try again.';
    } else if (code === 'auth/code-expired') {
      friendlyMessage = 'Security code has expired. Request a new verification code.';
    }

    setError(friendlyMessage);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(redirectPath);
      }
    });
    return () => unsubscribe();
  }, [navigate, redirectPath]);

  // Clean verifier and session artifacts on unmount
  useEffect(() => {
    return () => {
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch (_) {}
        (window as any).recaptchaVerifier = null;
      }
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
      await userService.syncAuthUser(profession);
      navigate(redirectPath);
    } catch (err: any) {
      handleAuthError(err, 'Google Sign-In');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'register' && !name)) {
      setError('Please populate all required fields.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name
        });
        await userService.syncAuthUser(profession);
      }
      navigate(redirectPath);
    } catch (err: any) {
      handleAuthError(err, 'Email submission');
    } finally {
      setLoading(false);
    }
  };

  // Recaptcha initializer for Phone OTP Auth
  const initRecaptchaVerifier = () => {
    try {
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch (_) {}
      }
      
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          setError('reCAPTCHA security context expired. Please re-try.');
        }
      });
      (window as any).recaptchaVerifier = verifier;
      return verifier;
    } catch (err: any) {
      handleAuthError(err, 'reCAPTCHA initialization');
      return null;
    }
  };

  const handlePhoneSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = phoneNumber.trim();
    if (!cleanNumber || cleanNumber.length < 8) {
      setError('Include valid phone number with country code (e.g. +91 98765 43210).');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const verifier = initRecaptchaVerifier();
      if (!verifier) {
        setLoading(false);
        return;
      }
      // Strip spaces for format
      const formattedNum = cleanNumber.replace(/\s+/g, '');
      const result = await signInWithPhoneNumber(auth, formattedNum, verifier);
      (window as any).confirmationResult = result;
      setVerificationId(result.verificationId);
      setSuccessMessage('A 6-digit confirmation code has been sent via SMS.');
    } catch (err: any) {
      handleAuthError(err, 'Phone SMS dispatch');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length !== 6) {
      setError('Please provide the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const confirmationResult = (window as any).confirmationResult;
      if (!confirmationResult) {
        throw new Error('Verification session expired. Please start over.');
      }
      await confirmationResult.confirm(otpCode.trim());
      await userService.syncAuthUser(profession);
      navigate(redirectPath);
    } catch (err: any) {
      handleAuthError(err, 'Phone verification');
    } finally {
      setLoading(false);
    }
  };

  const resetPhoneFlow = () => {
    setVerificationId(null);
    setOtpCode('');
    setError(null);
    setSuccessMessage(null);
    if ((window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier.clear();
      } catch (_) {}
      (window as any).recaptchaVerifier = null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20 relative flex flex-col justify-center overflow-hidden">
      <SEO 
        title="Scholars Portal | Curiva Homoeopathy"
        description="Access your personal Homoeopathic portal, reading history, saved articles, and study statistics securely."
      />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* reCAPTCHA anchor */}
      <div id="recaptcha-container" className="fixed bottom-4 right-4 z-50"></div>

      <main className="max-w-md w-full mx-auto px-6 relative z-10 pt-32">
        
        {/* Header Back Link */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-xs font-black uppercase tracking-widest mb-10 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Materia Medica Homeward
        </Link>

        {/* Brand Icon & Heading */}
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-[2rem] flex items-center justify-center text-primary mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-black text-text-primary tracking-tighter uppercase italic">
            Scholars <span className="text-primary">Portal</span>
          </h1>
          <p className="text-text-secondary font-serif italic text-base">
            Access study logs, clinical bookmarks, and personalized insights.
          </p>
        </div>

        {/* Auth Type Selector: Email or Phone */}
        <div className="bg-bg-secondary p-1.5 rounded-[2rem] border border-border flex gap-2 mb-8">
          <button
            onClick={() => { setAuthType('email'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-[1.5rem] transition-all flex items-center justify-center gap-2 ${
              authType === 'email' 
              ? 'bg-white text-text-primary border-border shadow-sm ring-1 ring-black/5' 
              : 'text-text-secondary hover:bg-bg-primary/50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </button>
          <button
            onClick={() => { setAuthType('phone'); setError(null); setSuccessMessage(null); }}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-[1.5rem] transition-all flex items-center justify-center gap-2 ${
              authType === 'phone' 
              ? 'bg-white text-text-primary border-border shadow-sm ring-1 ring-black/5' 
              : 'text-text-secondary hover:bg-bg-primary/50'
            }`}
          >
            <Phone className="w-3.5 h-3.5" /> Mobile OTP
          </button>
        </div>

        {/* Main interactive Panel */}
        <div className="bg-white rounded-[3rem] border border-border shadow-soft p-8 md:p-10 space-y-6">
          
          {/* Success or Error Message Overlay */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="err"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-red-500/5 border border-red-500/20 text-red-600 rounded-2xl flex items-start gap-3 text-xs leading-relaxed"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="font-bold flex-grow">{error}</div>
              </motion.div>
            )}

            {successMessage && !error && (
              <motion.div
                key="succ"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 rounded-2xl flex items-start gap-3 text-xs leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="font-bold">{successMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conditional Rendering based on selected auth style */}
          {authType === 'email' ? (
            <div className="space-y-6">
              {/* Register/Login Mode Selector */}
              <div className="flex justify-center gap-6 border-b border-border pb-4">
                <button 
                  type="button"
                  onClick={() => { setMode('login'); }} 
                  className={`text-xs font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${mode === 'login' ? 'text-primary border-primary' : 'text-text-tertiary border-transparent'}`}
                >
                  Sign In
                </button>
                <button 
                  type="button"
                  onClick={() => { setMode('register'); }} 
                  className={`text-xs font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${mode === 'register' ? 'text-primary border-primary' : 'text-text-tertiary border-transparent'}`}
                >
                  Create Account
                </button>
              </div>

              {/* Classic Password Flow */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <AnimatePresence mode="popLayout" initial={false}>
                    {mode === 'register' && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2"
                        >
                          <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                            <input
                              type="text"
                              placeholder="Dr. Samuel Hahnemann"
                              required={mode === 'register'}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-12 pr-6 py-4 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-text-primary placeholder:text-text-tertiary transition-all"
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.2, delay: 0.05 }}
                          className="space-y-2"
                        >
                          <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block ml-1">My Role / Profession</label>
                          <div className="relative">
                            <select
                              value={profession}
                              onChange={(e) => setProfession(e.target.value)}
                              className="w-full px-5 py-4 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-text-primary placeholder:text-text-tertiary transition-all appearance-none cursor-pointer"
                            >
                              <option value="doctor">🩺 Homoeopathy Doctor (BHMS, MD-Hom)</option>
                              <option value="practitioner">🌿 Clinical Practitioner</option>
                              <option value="student">🎓 Academic Student / Scholar</option>
                              <option value="user">📖 General Reader & Enthusiast</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-tertiary">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                          </div>
                          <p className="text-[10px] text-text-tertiary block ml-1 leading-relaxed">
                            We will customize your clinical workspace with information designed for your practice or reading scope.
                          </p>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      <input
                        type="email"
                        placeholder="scholar@curiva.org"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-text-primary placeholder:text-text-tertiary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-text-primary placeholder:text-text-tertiary transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer mt-4"
                  >
                    {loading ? (
                      <> <Loader2 className="w-4 h-4 animate-spin" /> Verifying Scholar... </>
                    ) : mode === 'login' ? (
                      <> Sign In <LogIn className="w-4 h-4" /> </>
                    ) : (
                      <> Create Account <ArrowRight className="w-4 h-4" /> </>
                    )}
                  </button>
                </form>
              </div>
          ) : (
            // Phone Authentication Flow
            <div className="space-y-6">
              {!verificationId ? (
                // Step 1: Request code
                <form onSubmit={handlePhoneSendCode} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block ml-1">Phone Number (With Country Code)</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm text-text-primary placeholder:text-text-tertiary transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-text-tertiary block ml-1">
                      Always include country prefix (e.g. <b>+91</b> for India).
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <> <Loader2 className="w-4 h-4 animate-spin" /> Initializing Container... </>
                    ) : (
                      <> Send Verification Code <ArrowRight className="w-4 h-4" /> </>
                    )}
                  </button>
                </form>
              ) : (
                // Step 2: Input confirmation code (SMS OTP)
                <form onSubmit={handlePhoneVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary block ml-1">Enter 6-Digit SMS Code</label>
                    <div className="relative">
                      <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold text-center text-lg tracking-[0.2em] text-text-primary placeholder:text-text-tertiary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-2">
                    <button
                      type="button"
                      onClick={resetPhoneFlow}
                      className="text-text-secondary hover:text-text-primary font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-enter Phone Number
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer mt-4"
                  >
                    {loading ? (
                      <> <Loader2 className="w-4 h-4 animate-spin" /> Verifying Code... </>
                    ) : (
                      <> Verify & Confirm Login <ShieldCheck className="w-4 h-4" /> </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Social credentials separator */}
          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-x-0 h-px bg-border" />
            <span className="relative px-4 bg-white text-[10px] font-black uppercase tracking-widest text-text-tertiary">Or portal in with</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-4 bg-bg-secondary border border-border hover:border-primary/40 rounded-xl font-bold text-sm text-text-primary transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.7 0 3.2.6 4.4 1.7L20 3C17.6 1.1 14.8 0 12 0 7.3 0 3.3 2.7 1.3 6.6l3.9 3C6.1 6.8 8.8 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.7-2.4 3.6l3.7 2.9c2.1-2 3.7-4.9 3.7-8.6z"
              />
              <path
                fill="#FBBC05"
                d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4l-3.9-3C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.4l3.9-3z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.9-1.8-6.8-4.6l-3.9 3C3.3 21.3 7.3 24 12 24z"
              />
            </svg>
            Google Credentials
          </button>
        </div>

        {/* Informative Footer */}
        <div className="mt-12 text-center text-text-tertiary">
          <p className="text-[10px] font-black uppercase tracking-wider">Secure Access Protocol • Enabled with SSL</p>
        </div>
      </main>
    </div>
  );
}
