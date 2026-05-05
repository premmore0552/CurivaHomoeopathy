import React, { useEffect } from 'react';
import { User, LogIn, LogOut, ShieldCheck, ChevronDown, Crown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AuthButton() {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // Sync user profile to Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              favorites: [],
              comparisonCount: 0,
              isPremium: false,
              lastResetDate: new Date().toISOString().split('T')[0],
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.error("Error syncing user profile:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-border animate-pulse" />;
  }

  if (!user) {
    return (
      <button 
        onClick={handleLogin}
        className="group relative flex items-center gap-3 px-6 py-2.5 bg-text-primary text-bg-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-text-primary/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <LogIn className="w-4 h-4 transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline">Connect Account</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 p-1 rounded-2xl transition-all duration-300 border-2 group ${
          showDropdown 
          ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
          : 'bg-bg-secondary border-transparent hover:border-primary/30'
        }`}
      >
        <div className="relative">
          <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-9 h-9 rounded-xl border-2 border-bg-primary shadow-sm" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-lg border-2 border-bg-primary flex items-center justify-center">
             <ChevronDown className={`w-3 h-3 text-white transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.9, rotateX: -15 }}
            className="absolute top-full mt-3 right-0 w-72 bg-bg-primary border border-border rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] overflow-hidden origin-top-right"
          >
            <div className="p-6 bg-gradient-to-br from-bg-secondary to-bg-primary border-b border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-14 h-14 rounded-[1.25rem] border-2 border-primary shadow-md shadow-primary/10" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center ring-4 ring-bg-secondary shadow-sm">
                    <Crown className="w-2.5 h-2.5" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-base font-black text-text-primary truncate uppercase tracking-tight">{user.displayName}</div>
                  <div className="text-[10px] text-text-secondary truncate font-bold opacity-60">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-xl w-fit border border-emerald-500/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Scholar</span>
              </div>
            </div>
            
            <div className="p-3 bg-bg-primary">
              <Link 
                to="/profile"
                className="w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest text-text-secondary hover:text-primary hover:bg-primary/5 rounded-2xl transition-all group/item"
                onClick={() => setShowDropdown(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-bg-secondary group-hover/item:bg-primary/10 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  Study Profile
                </div>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
              </Link>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 rounded-2xl transition-all group/logout mt-1"
              >
                <div className="p-2 rounded-xl bg-red-500/5 group-hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                Secure Sign Out
              </button>
            </div>

            <div className="p-4 bg-bg-secondary/50 border-t border-border mt-1">
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-center text-text-tertiary">Session Active: {new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

