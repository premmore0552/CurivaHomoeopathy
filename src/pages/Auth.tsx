import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertCircle, 
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  auth, 
  googleProvider,
  signInWithPopup, 
  onAuthStateChanged
} from '../lib/firebase';
import { userService } from '../services/userService';
import SEO from '../components/SEO';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);

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
            <li>Go to <b>Firebase Console</b> &gt; Authentication &gt; <b>Sign-in method</b>, edit and enable the providers (<b>Google</b>).</li>
            <li>Go to Authentication &gt; <b>Settings</b> &gt; <b>Authorized domains</b>, and add <code>{window.location.hostname}</code>.</li>
            <li>Make sure <b>Identity Toolkit API</b> is enabled on GCP Console.</li>
            <li><b>Iframe Sandbox note:</b> If using Google authentication inside the embedded AI Studio iframe, third-party cookies or popups might be blocked by your browser. Open the application in a <b>new tab</b> (using the icon in the top right corner).</li>
          </ol>
        </div>
      );
      return;
    }

    // Default friendly overrides
    let friendlyMessage = message || `${actionName} failed.`;
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      await userService.syncAuthUser('Scholar');
      navigate(redirectPath);
    } catch (err: any) {
      handleAuthError(err, 'Google Sign-In');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20 relative flex flex-col justify-center overflow-hidden">
      <SEO 
        title="Scholars Portal | Curiva Homoeopathy"
        description="Access your personal Homoeopathic portal, reading history, saved articles, and study statistics securely."
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.04)_0%,transparent_60%)] pointer-events-none" />

      <main className="max-w-md w-full mx-auto px-6 relative z-10 pt-32">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-xs font-black uppercase tracking-widest mb-10 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Materia Medica Homeward
        </Link>

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

        <div className="bg-white rounded-[3rem] border border-border shadow-soft p-8 md:p-12 space-y-8">
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
          </AnimatePresence>

          <div className="space-y-6 text-center">
            <p className="text-xs text-text-tertiary font-bold uppercase tracking-widest px-4">
              Authenticated access via secure institutional login
            </p>
            
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 py-5 bg-bg-secondary border border-border hover:border-primary/40 rounded-2xl font-black text-sm uppercase tracking-wider text-text-primary transition-all shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer group"
            >
              <div className="bg-white p-2 rounded-lg shadow-sm border border-border group-hover:border-primary/20 transition-colors">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.7 0 3.2.6 4.4 1.7L20 3C17.6 1.1 14.8 0 12 0 7.3 0 3.3 2.7 1.3 6.6l3.9 3C6.1 6.8 8.8 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.7-2.4 3.6l3.7 2.9c2.1-2 3.7-4.9 3.7-8.6z" />
                  <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4l-3.9-3C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.4l3.9-3z" />
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.9-1.8-6.8-4.6l-3.9 3C3.3 21.3 7.3 24 12 24z" />
                </svg>
              </div>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  Verifying Identity...
                </span>
              ) : (
                "Log in with Google"
              )}
            </button>

            <div className="pt-4 border-t border-border/60">
              <p className="text-[10px] text-text-tertiary leading-relaxed px-4">
                Access is restricted to authorized scholars and clinical intern profiles. By entering, you agree to our <b>Terms of Service</b> and <b>Data Ethics Policy</b>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-text-tertiary">
          <p className="text-[10px] font-black uppercase tracking-wider">Secure Access Protocol • Enabled with SSL</p>
        </div>
      </main>
    </div>
  );
}
