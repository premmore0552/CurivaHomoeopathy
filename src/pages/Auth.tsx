import React, { useState, useEffect, useRef } from 'react';
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
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from '../lib/firebase';
import { userService } from '../services/userService';
import SEO from '../components/SEO';
import { getGoogleAuthErrorMessage, shouldUseGoogleRedirectFallback } from '../lib/authErrorMessage';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  // Prevent the auth-state observer from navigating before the explicit sign-in
  // action has finished synchronizing the user's Curiva profile.
  const authFlowStarted = useRef(false);

  // Redirect path
  const redirectPath = location.state?.from || '/profile';

  const handleAuthError = (err: unknown) => {
    setError(getGoogleAuthErrorMessage(err));
  };

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      let redirectUserHandled = false;

      try {
        const redirectResult = await getRedirectResult(auth);
        if (redirectResult?.user) {
          redirectUserHandled = true;
          try {
            await userService.syncAuthUser();
            if (active) navigate(redirectPath);
          } catch {
            if (active) {
              setError('Google sign-in succeeded, but your Curiva profile could not be synchronized. Refresh the page or contact support; your account is still signed in.');
            }
          }
        }
      } catch (err: unknown) {
        if (active) handleAuthError(err);
      }

      // Wait for the redirect result before subscribing. This prevents the
      // initial auth-state event from navigating away before profile sync.
      if (!active || redirectUserHandled) return;

      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && !authFlowStarted.current) navigate(redirectPath);
      });
    };

    void initializeAuth();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [navigate, redirectPath]);

  const handleGoogleSignIn = async () => {
    authFlowStarted.current = true;
    setLoading(true);
    setError(null);

    try {
      // Keep provider authentication separate from the Firestore profile write.
      // A profile-sync failure must not be reported as a Google OAuth failure.
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (authError: unknown) {
        if (shouldUseGoogleRedirectFallback(authError)) {
          try {
            await signInWithRedirect(auth, googleProvider);
          } catch (redirectError: unknown) {
            handleAuthError(redirectError);
          }
        } else {
          handleAuthError(authError);
        }
        return;
      }

      try {
        await userService.syncAuthUser();
        navigate(redirectPath);
      } catch {
        setError(
          'Google sign-in succeeded, but Curiva could not synchronize your scholar profile. Your Google account is authenticated. Check your connection and refresh; if the problem continues, contact support.'
        );
      }
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
