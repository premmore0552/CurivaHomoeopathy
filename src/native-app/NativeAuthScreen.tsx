import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  ArrowRight, BookOpen, Eye, EyeOff, GraduationCap, KeyRound, Leaf,
  LockKeyhole, Mail, ShieldCheck, Stethoscope, UserRound
} from 'lucide-react';
import {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile
} from '../lib/firebase';
import { userService } from '../services/userService';
import type { NativeAudience } from './NativeLearningApp';

interface NativeAuthScreenProps {
  onAuthenticated: (audience: NativeAudience) => void;
  onContinueOffline: () => void;
}

export default function NativeAuthScreen({ onAuthenticated, onContinueOffline }: NativeAuthScreenProps) {
  const [audience, setAudience] = useState<NativeAudience>(() => {
    try {
      return localStorage.getItem('curiva-native-audience') === 'practitioner' ? 'practitioner' : 'student';
    } catch {
      return 'student';
    }
  });
  const [audienceTouched, setAudienceTouched] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const friendlyError = (value: unknown) => {
    const code = (value as { code?: string })?.code || '';
    if (code === 'auth/invalid-email') return 'Enter a valid email address.';
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') return 'The email or password is incorrect.';
    if (code === 'auth/email-already-in-use') return 'An account already exists for this email. Choose Sign in instead.';
    if (code === 'auth/weak-password') return 'Choose a stronger password with at least 6 characters.';
    if (code === 'auth/too-many-requests') return 'Too many attempts. Please wait a little before trying again.';
    if (code === 'auth/network-request-failed') return 'A network connection is required to sign in. You can continue offline.';
    return 'We could not complete that request. Check your connection and try again.';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Enter the name you want displayed in Curiva.');
      return;
    }
    if (password.length < 6) {
      setError('Your password must contain at least 6 characters.');
      return;
    }

    setBusy(true);
    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
        await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      }

      // Existing accounts keep their saved workspace unless the user explicitly
      // chooses a different one. New accounts save the currently selected category.
      let resolvedAudience = audience;
      try {
        const savedProfession = await userService.syncAuthUser(
          mode === 'signup' || audienceTouched ? audience : undefined
        );
        if (mode === 'signin' && !audienceTouched && savedProfession) {
          resolvedAudience = savedProfession === 'practitioner' || savedProfession === 'doctor'
            ? 'practitioner'
            : 'student';
        }
      } catch (profileError) {
        console.warn('Curiva profile setup will need a connected retry.', profileError);
        setNotice('Signed in. Your account profile can finish syncing when you are online.');
      }
      onAuthenticated(resolvedAudience);
    } catch (authError) {
      setError(friendlyError(authError));
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setNotice('');
    if (!email.trim()) {
      setError('Enter your email address first, then choose Forgot password.');
      return;
    }
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setNotice('Password-reset instructions have been sent if this email is registered.');
    } catch (resetError) {
      setError(friendlyError(resetError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="native-auth-gate">
      <div className="native-auth-shell">
        <div className="native-auth-brand">
          <img src="/curiva-native-mark.svg" alt="Curiva" />
          <div><strong>CURIVA</strong><span>HOMOEOPATHY LEARNING</span></div>
        </div>

        <section className="native-auth-card">
          <div className="native-auth-heading">
            <span className="native-auth-kicker"><Leaf size={14} /> YOUR STUDY SPACE, YOUR WAY</span>
            <h1>{mode === 'signin' ? 'Welcome back.' : 'Create your Curiva account.'}</h1>
            <p>{mode === 'signin' ? 'Choose your learning path and continue your journey.' : 'Set up an account for a more personal learning experience.'}</p>
          </div>

          <div className="native-auth-audience" role="group" aria-label="Choose account category">
            <button type="button" className={audience === 'student' ? 'is-selected' : ''} onClick={() => { setAudience('student'); setAudienceTouched(true); setError(''); }}>
              <span><GraduationCap size={20} /></span>
              <strong>BHMS student</strong>
              <small>Curriculum, revision and exam practice</small>
            </button>
            <button type="button" className={audience === 'practitioner' ? 'is-selected' : ''} onClick={() => { setAudience('practitioner'); setAudienceTouched(true); setError(''); }}>
              <span><Stethoscope size={20} /></span>
              <strong>Practitioner</strong>
              <small>Professional reference and continuing study</small>
            </button>
          </div>

          <div className="native-auth-mode">
            <button type="button" className={mode === 'signin' ? 'is-active' : ''} onClick={() => { setMode('signin'); setError(''); setNotice(''); }}>Sign in</button>
            <button type="button" className={mode === 'signup' ? 'is-active' : ''} onClick={() => { setMode('signup'); setError(''); setNotice(''); }}>Create account</button>
          </div>

          <form className="native-auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label>
                <span>Your name</span>
                <div className="native-auth-input"><UserRound size={17} /><input autoComplete="name" value={name} onChange={event => setName(event.target.value)} placeholder="Name shown in Curiva" required /></div>
              </label>
            )}
            <label>
              <span>Email address</span>
              <div className="native-auth-input"><Mail size={17} /><input type="email" autoComplete="email" inputMode="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" required /></div>
            </label>
            <label>
              <span>Password</span>
              <div className="native-auth-input"><LockKeyhole size={17} /><input type={passwordVisible ? 'text' : 'password'} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 6 characters" minLength={6} required /><button type="button" aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible(value => !value)}>{passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
            </label>

            {mode === 'signin' && <button className="native-auth-forgot" type="button" disabled={busy} onClick={() => void handleResetPassword()}><KeyRound size={13} /> Forgot password?</button>}
            {error && <div className="native-auth-message is-error" role="alert">{error}</div>}
            {notice && <div className="native-auth-message is-notice" role="status">{notice}</div>}

            <button className="native-auth-submit" type="submit" disabled={busy}>
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in securely' : 'Create account'}
              {!busy && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="native-auth-assurance"><ShieldCheck size={15} /><span>Authentication is handled by Firebase. Your password is never stored in Curiva.</span></div>
          <div className="native-auth-divider"><span>OR</span></div>
          <button type="button" className="native-auth-offline" onClick={onContinueOffline}><BookOpen size={16} /> Continue without an account</button>
          <p className="native-auth-footnote">Offline mode keeps learning tools available on this device. Account category is self-selected and does not verify professional registration or qualifications.</p>
        </section>
        <p className="native-auth-footer">Curiva is an educational reference. It does not diagnose or replace professional medical judgement.</p>
      </div>
    </main>
  );
}
