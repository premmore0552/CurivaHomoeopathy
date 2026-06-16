import React, { useEffect } from 'react';
import { User, LogIn, LogOut, ShieldCheck, ChevronDown, Crown, ArrowRight, Sparkles, Library } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  auth, 
  googleProvider,
  db, 
  handleFirestoreError, 
  OperationType,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from '../lib/firebase';
import { userService } from '../services/userService';

type FirebaseUser = any;

interface AuthButtonProps {
  isMobile?: boolean;
  onCloseMenu?: () => void;
}

export default function AuthButton({ isMobile, onCloseMenu }: AuthButtonProps) {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        userService.syncAuthUser().catch(console.error);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

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
      if (onCloseMenu) onCloseMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-border animate-pulse" />;
  }

  if (!user) {
    return (
      <Link 
        to="/auth"
        onClick={() => {
          if (onCloseMenu) onCloseMenu();
        }}
        className={`group relative flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-zinc-800 dark:border-zinc-200 ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <LogIn className="w-4 h-4 transition-transform group-hover:rotate-12" />
        <span>Portal Access</span>
      </Link>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full bg-bg-secondary dark:bg-zinc-900 border border-border rounded-[2rem] p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img 
            src={user.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'} 
            alt={user.displayName || ''} 
            className="w-12 h-12 rounded-xl object-cover border border-border shadow-sm shrink-0" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-black text-text-primary uppercase tracking-tight truncate">{user.displayName || 'Scholar'}</h4>
            <p className="text-[10px] text-text-secondary font-bold truncate opacity-60 leading-none mt-1">{user.email || ''}</p>
          </div>
        </div>
        
        <div className="grid gap-2 pt-1 border-t border-border/50">
          <Link 
            to="/profile"
            className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/10"
            onClick={() => {
              if (onCloseMenu) onCloseMenu();
            }}
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-primary" strokeWidth={3} />
              <span>Study Profile</span>
            </div>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>

          <Link 
            to="/my-library"
            className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-transparent hover:border-primary/10"
            onClick={() => {
              if (onCloseMenu) onCloseMenu();
            }}
          >
            <div className="flex items-center gap-3">
              <Library className="w-4 h-4 text-primary" strokeWidth={3} />
              <span>My Study Library</span>
            </div>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>

          <button 
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 rounded-xl transition-all text-left"
          >
            <LogOut className="w-4 h-4 text-red-500" strokeWidth={3} />
            <span>Secure Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-[2rem] transition-all duration-500 border group shrink-0 ${
          showDropdown 
          ? 'bg-primary text-white border-primary shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] -translate-y-1' 
          : 'bg-white dark:bg-zinc-900 border-border hover:border-primary/50 text-text-primary shadow-sm'
        }`}
      >
        <div className="relative shrink-0">
          <img 
            src={user.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'} 
            alt={user.displayName || ''} 
            className="w-10 h-10 rounded-2xl border border-bg-primary shadow-md object-cover" 
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-bg-primary flex items-center justify-center transition-colors shadow-sm ${showDropdown ? 'bg-white' : 'bg-primary'}`}>
             <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-500 ${showDropdown ? 'rotate-180 text-primary' : 'text-white'}`} />
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-start leading-none gap-1">
           <span className="text-[11px] font-black uppercase tracking-widest truncate max-w-[100px]">{user.displayName}</span>
           <div className={`flex items-center gap-1 text-[8px] font-black uppercase tracking-tighter ${showDropdown ? 'text-white/80' : 'text-primary'}`}>
              <Sparkles className="w-2 h-2" />
              Member
           </div>
        </div>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
             initial={{ opacity: 0, y: 15, scale: 0.9, rotateX: -15 }}
             animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
             exit={{ opacity: 0, y: 15, scale: 0.9, rotateX: -15 }}
             className="absolute top-full mt-4 right-0 w-[calc(100vw-2rem)] sm:w-80 max-w-[340px] bg-bg-primary border border-border rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.2)] z-[100] overflow-hidden origin-top-right backdrop-blur-2xl"
          >
            <div className="p-8 bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary border-b border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-5 mb-6 relative z-10">
                <div className="relative group/avatar">
                  <img 
                    src={user.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'} 
                    alt={user.displayName || ''} 
                    className="w-16 h-16 rounded-[1.5rem] border-2 border-primary shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white rounded-xl flex items-center justify-center ring-4 ring-bg-secondary shadow-xl">
                    <Crown className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-black text-text-primary truncate uppercase tracking-tight leading-none mb-1">{user.displayName}</div>
                  <div className="text-[11px] text-text-secondary truncate font-bold opacity-60 tracking-tight">{user.email}</div>
                  <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg w-fit border border-emerald-500/5">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">Verified Scholar</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-bg-primary grid gap-2">
              <Link 
                to="/profile"
                className="w-full flex items-center justify-between px-5 py-4 text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-primary hover:bg-primary/5 rounded-2xl transition-all group/item border border-transparent hover:border-primary/10 shadow-sm hover:shadow-md"
                onClick={() => setShowDropdown(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-bg-secondary group-hover/item:bg-primary group-hover/item:text-white transition-all">
                    <User className="w-4 h-4" />
                  </div>
                  Study Profile
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 -translate-x-3 group-hover/item:translate-x-0 transition-all text-primary" />
              </Link>

              <Link 
                to="/library"
                className="w-full flex items-center justify-between px-5 py-4 text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-primary hover:bg-primary/5 rounded-2xl transition-all group/item border border-transparent hover:border-primary/10 shadow-sm hover:shadow-md"
                onClick={() => setShowDropdown(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-bg-secondary group-hover/item:bg-primary group-hover/item:text-white transition-all">
                    <Library className="w-4 h-4" />
                  </div>
                  My Study Library
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 -translate-x-3 group-hover/item:translate-x-0 transition-all text-primary" />
              </Link>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 rounded-2xl transition-all group/logout border border-transparent hover:border-red-500/10"
              >
                <div className="p-2.5 rounded-xl bg-red-500/5 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <LogOut className="w-4 h-4" />
                </div>
                Secure Sign Out
              </button>
            </div>

            <div className="p-5 bg-bg-secondary/50 border-t border-border flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-tertiary">Session ID: {user.uid.substring(0, 8)}</p>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

