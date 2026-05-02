import React, { useEffect } from 'react';
import { User, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
        className="flex items-center gap-2 px-4 py-2 bg-text-primary text-bg-primary rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-text-primary/10"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-1 bg-primary/10 border border-primary/20 rounded-full hover:bg-primary/20 transition-all"
      >
        <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border-2 border-primary" />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-64 bg-bg-primary border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="p-4 bg-bg-secondary/50 border-b border-border">
              <div className="flex items-center gap-3 mb-2">
                <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-10 h-10 rounded-full" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-text-primary truncate">{user.displayName}</div>
                  <div className="text-[10px] text-text-secondary truncate">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full w-fit">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">Verified Academic</span>
              </div>
            </div>
            
            <div className="p-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                <User className="w-4 h-4" />
                My Profile
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
