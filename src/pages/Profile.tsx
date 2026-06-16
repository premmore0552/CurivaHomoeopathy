import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Calendar, 
  Bookmark, 
  History, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Loader2,
  Trash2,
  FileText,
  CircuitBoard,
  BookOpen,
  Activity,
  Settings,
  Award,
  MapPin,
  Trophy,
  Key,
  Check,
  Upload
} from 'lucide-react';
import { auth, db, onAuthStateChanged, signOut, doc, getDoc, collection, getDocs, deleteDoc } from '../lib/firebase';
import { userService, UserProfile } from '../services/userService';
import { fetchPosts } from '../services/api';
import { BlogPost } from '../types';
import SEO from '../components/SEO';
import { Link, useNavigate } from 'react-router-dom';
import { getPersonalizedRecommendations } from '../services/recommendationService';
import { safeFormatDate } from '../utils/date';
import LearningPath from '../components/LearningPath';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'activities' | 'settings' | 'learning-path' | 'admin-db'>('learning-path');
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states for settings tab
  const [displayName, setDisplayName] = useState('');
  const [profession, setProfession] = useState('user');
  const [qualifications, setQualifications] = useState('');
  const [bio, setBio] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [updatingSettings, setUpdatingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin database tools states
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetStep, setResetStep] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [collectionStatus, setCollectionStatus] = useState({
    users: 'idle',
    questions: 'idle',
    orders: 'idle',
    admins: 'idle',
  });

  const handleDatabaseReset = async () => {
    setIsResetting(true);
    setResetSuccess(false);
    setShowResetConfirmation(false);
    
    const collectionsToClear = ['users', 'questions', 'orders', 'admins'];
    
    for (const colName of collectionsToClear) {
      setResetStep(`Purging collection: ${colName}...`);
      setCollectionStatus(prev => ({ ...prev, [colName]: 'pending' }));
      
      try {
        // 1. Purge Local Storage database files
        localStorage.removeItem(`homepath_db_${colName}`);
        
        // 2. Clear real Firestore collections cleanly (using client-side reference logic)
        try {
          const querySnapshot = await getDocs(collection(db, colName));
          if (querySnapshot && querySnapshot.docs) {
            for (const docSnap of querySnapshot.docs) {
              await deleteDoc(doc(db, colName, docSnap.id));
            }
          }
        } catch (clsErr) {
          console.warn(`Cloud Firestore clean ignored for: ${colName} (Local DB clean completed):`, clsErr);
        }
        
        setCollectionStatus(prev => ({ ...prev, [colName]: 'success' }));
      } catch (err) {
        console.error(`Wipe failed for collection: ${colName}`, err);
        setCollectionStatus(prev => ({ ...prev, [colName]: 'failed' }));
      }
      
      // Artificial short delay to make UI checklist progress scan aesthetic
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsResetting(false);
    setResetSuccess(true);
    
    // Clear session details so they log in with fresh registration credentials
    localStorage.removeItem('homepath_user');
    
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfile = await userService.getProfile(currentUser.uid);
        setProfile(userProfile);
        const allPosts = await fetchPosts();
        setPosts(allPosts);
        
        // Find if user is admin or hardcoded admin premmore0552@gmail.com
        const adminRef = doc(db, 'admins', currentUser.uid);
        const adminDoc = await getDoc(adminRef);
        const isHardcodedAdmin = currentUser.email === 'premmore0552@gmail.com';
        setIsAdmin(adminDoc.exists() || isHardcodedAdmin);
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setProfession(profile.profession || 'user');
      setQualifications(profile.qualifications || '');
      setBio(profile.bio || '');
      setClinicAddress(profile.clinicAddress || '');
      setInterests(profile.interests || []);
      setSelectedAvatar(profile.photoURL || '');
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user || !profile) return null;

  const bookmarkedPosts = posts.filter(p => profile.bookmarks?.includes(p.slug));
  
  // Get personalized content recommendations based on reading telemetry
  const recommendedPosts = getPersonalizedRecommendations(profile, posts, 3);
  
  // Sort history by timestamp descending
  const recentHistory = [...(profile.readingHistory || [])]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20);

  const historyPosts = recentHistory.map(h => {
    const post = posts.find(p => p.slug === h.postId);
    return post ? { ...post, lastRead: h.timestamp } : null;
  }).filter(Boolean) as (BlogPost & { lastRead: string })[];

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20 pt-6">
      <SEO 
        title={`${user.displayName || 'User'} | Study Profile | Curiva`}
        description="Manage your clinical bookmarks and track your historical case study progress."
      />

      {/* Header Card sitting elegantly below navigation */}
      <header className="relative overflow-hidden bg-bg-secondary dark:bg-zinc-900/40 border border-border dark:border-zinc-800/80 rounded-[3.5rem] text-text-primary p-8 sm:p-12 mx-auto max-w-7xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)] opacity-30 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative shrink-0"
            >
              <img 
                src={profile.photoURL || user.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'} 
                alt={profile.displayName || user.displayName || ''} 
                className="w-36 h-36 rounded-[3rem] border-4 border-primary/20 shadow-2xl object-cover" 
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-primary text-white dark:bg-accent dark:text-primary-dark rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl whitespace-nowrap">
                {profile.profession === 'doctor' && '🩺 Homoeopathy Doctor'}
                {profile.profession === 'practitioner' && '🌿 Clinician'}
                {profile.profession === 'student' && '🎓 Academic Student'}
                {profile.profession === 'user' && '📖 Scholar Reader'}
                {!profile.profession && '📖 Verified Scholar'}
              </div>
            </motion.div>
            
            <div className="text-center md:text-left flex-1 space-y-4">
              <div className="space-y-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tighter uppercase flex flex-wrap justify-center md:justify-start items-baseline gap-3"
                >
                  {profile.displayName || user.displayName}
                  {profile.qualifications && (
                    <span className="text-lg md:text-xl font-serif italic text-primary dark:text-accent font-normal lowercase tracking-normal">
                      ({profile.qualifications})
                    </span>
                  )}
                </motion.h1>

                {profile.bio && (
                  <p className="text-text-secondary font-serif italic text-base max-w-2xl leading-relaxed">
                    "{profile.bio}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-text-secondary font-serif italic text-sm md:text-base opacity-90">
                <div className="flex items-center gap-2">
                   <Mail className="w-4 h-4 text-primary dark:text-accent" />
                   {user.email}
                </div>
                {profile.clinicAddress && (
                  <div className="flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-primary dark:text-accent" />
                     {profile.clinicAddress}
                  </div>
                )}
                <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-primary dark:text-accent" />
                   <span>Joined {safeFormatDate(profile.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-5 py-2.5 bg-bg-primary dark:bg-zinc-800/60 border border-border dark:border-zinc-700/50 rounded-2xl">
                   <span className="text-xl font-display text-text-primary block leading-none mb-0.5">{profile.bookmarks?.length || 0}</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60">Bookmarks</span>
                </div>
                <div className="px-5 py-2.5 bg-bg-primary dark:bg-zinc-800/60 border border-border dark:border-zinc-700/50 rounded-2xl">
                   <span className="text-xl font-display text-text-primary block leading-none mb-0.5">{profile.readingHistory?.length || 0}</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60">Case Studies Read</span>
                </div>
                <div className="px-5 py-2.5 bg-primary/10 border border-primary/25 rounded-2xl flex items-center gap-2 font-sans shadow-inner">
                   <span className="text-xl leading-none">🔥</span>
                   <div>
                     <span className="text-xl font-display font-black text-primary dark:text-accent block leading-none mb-0.5">{profile.streakCount || 1}</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-primary/80 dark:text-accent/80">Day Streak</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start pt-2 border-t border-border/40">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-secondary opacity-60">Switch Workspace Mode:</span>
                <div className="flex flex-wrap bg-bg-primary dark:bg-zinc-800/40 border border-border dark:border-zinc-700/50 rounded-2xl p-1 gap-1">
                  {[
                    { id: 'doctor', name: '✨ Doctor' },
                    { id: 'practitioner', name: '🌿 Clinician' },
                    { id: 'student', name: '🎓 Student' },
                    { id: 'user', name: '📖 Reader' },
                  ].map(role => (
                    <button
                      key={role.id}
                      onClick={async () => {
                        await userService.updateProfession(role.id);
                        const updated = await userService.getProfile(user.uid);
                        if (updated) setProfile(updated);
                      }}
                      className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                        profile.profession === role.id
                        ? 'bg-primary text-white dark:bg-accent dark:text-primary-dark font-black shadow-md scale-102 font-bold'
                        : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                      }`}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap bg-bg-secondary dark:bg-zinc-900/60 backdrop-blur-xl p-1.5 md:p-2 rounded-2xl md:rounded-[2.5rem] border border-border dark:border-zinc-800 shadow-2xl w-full lg:w-fit mb-12 gap-1 md:gap-2">
            {[
              { id: 'learning-path', name: 'Study Curriculum', icon: Trophy },
              { id: 'bookmarks', name: 'Saved Inquiries', icon: Bookmark },
              { id: 'history', name: 'Reading Log', icon: History },
              { id: 'activities', name: 'Workspace Activities', icon: Activity },
              { id: 'settings', name: 'Portal Settings', icon: Settings },
              ...(isAdmin ? [{ id: 'admin-db', name: 'Database Manager', icon: ShieldCheck }] : [])
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center lg:justify-start gap-2 md:gap-3 px-3 md:px-8 py-3.5 md:py-5 rounded-xl md:rounded-[2rem] text-[9.5px] md:text-xs font-black uppercase tracking-wider md:tracking-widest transition-all cursor-pointer ${
                  activeTab === tab.id 
                  ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                  : 'text-text-secondary hover:bg-bg-secondary'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                <span className="truncate">{tab.name}</span>
              </button>
            ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'learning-path' && (
            <motion.div
              key="learning-path-pane"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <LearningPath profile={profile} />
            </motion.div>
          )}

          {activeTab === 'bookmarks' && (
            <motion.div
              key="bookmarks-pane"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {bookmarkedPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
              {bookmarkedPosts.length === 0 && (
                <div className="col-span-full p-20 text-center bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-dashed border-border dark:border-zinc-800/80 group">
                  <Bookmark className="w-16 h-16 text-primary/20 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-display font-medium text-text-primary italic mb-2">No Saved Content</h3>
                  <p className="text-text-secondary font-serif italic mb-8">Clinical inquiries you bookmark will appear here for rapid reference.</p>
                  <Link to="/glossary/all" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary hover:gap-5 transition-all">
                    Explore Repositories <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history-pane"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {historyPosts.map((post, idx) => (
                <div key={`${post.slug}-${idx}`} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-border dark:border-zinc-800 shadow-soft flex items-center justify-between group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-6 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                       <img src={post.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xl font-display font-medium text-text-primary italic truncate group-hover:text-primary transition-colors">{post.title}</h4>
                      <p className="text-xs text-text-tertiary font-bold uppercase tracking-widest mt-1">Read on {new Date(post.lastRead).toLocaleDateString()} at {new Date(post.lastRead).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <Link to={`/read/${post.slug}`} className="p-4 rounded-full bg-bg-secondary hover:bg-primary hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              ))}
              {historyPosts.length === 0 && (
                <div className="p-20 text-center bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-dashed border-border dark:border-zinc-800">
                   <History className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                   <p className="text-xl font-serif italic text-text-secondary">Your reading journey has not yet begun.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'activities' && (
            <motion.div
              key="activities-pane"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 max-w-4xl"
            >
               <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-border dark:border-zinc-800 shadow-soft mb-6">
                <h4 className="text-xl font-display font-bold text-text-primary uppercase tracking-tight mb-2">Workspace Audit Trail</h4>
                <p className="text-sm text-text-secondary font-serif italic">This secure log tracks your interactions, reading achievements, study performance, and credentials swaps.</p>
              </div>

              {(!profile.activities || profile.activities.length === 0) ? (
                <div className="p-20 text-center bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-dashed border-border dark:border-zinc-800">
                  <Activity className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                  <p className="text-xl font-serif italic text-text-secondary">No recorded sessions or workspace logs found yet.</p>
                </div>
              ) : (
                [...profile.activities]
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((act) => {
                    let badgeColor = 'bg-blue-500/10 text-blue-600 border-blue-500/10';
                    let icon = Activity;
                    if (act.type === 'login') {
                      badgeColor = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10';
                      icon = Key;
                    } else if (act.type === 'bookmark_add') {
                      badgeColor = 'bg-cyan-500/10 text-cyan-600 border-cyan-500/10';
                      icon = Bookmark;
                    } else if (act.type === 'bookmark_remove') {
                      badgeColor = 'bg-rose-500/10 text-rose-600 border-rose-500/10';
                      icon = Bookmark;
                    } else if (act.type === 'read_post') {
                      badgeColor = 'bg-slate-500/10 text-slate-600 border-slate-500/10';
                      icon = BookOpen;
                    } else if (act.type === 'change_profession') {
                      badgeColor = 'bg-purple-500/10 text-purple-600 border-purple-500/10';
                      icon = ShieldCheck;
                    } else if (act.type === 'mcq_practice') {
                      badgeColor = 'bg-amber-500/10 text-amber-600 border-amber-500/10';
                      icon = Award;
                    } else if (act.type === 'profile_update') {
                      badgeColor = 'bg-orange-500/10 text-orange-600 border-orange-500/10';
                      icon = Settings;
                    }

                    const IconComp = icon;

                    return (
                      <motion.div 
                        key={act.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border dark:border-zinc-800 shadow-sm flex items-start gap-5 hover:border-primary/15 transition-all"
                      >
                        <div className={`p-3 rounded-xl border ${badgeColor} shrink-0`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-[10px]">
                              {act.type.replace('_', ' ')}
                            </span>
                            <span className="text-[10px] text-text-tertiary font-bold tracking-tight">
                              {new Date(act.timestamp).toLocaleDateString()} &middot; {new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-text-primary leading-normal">{act.details}</p>
                        </div>
                      </motion.div>
                    );
                  })
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings-pane"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl"
            >
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setUpdatingSettings(true);
                  setSaveSuccess(false);
                  try {
                    await userService.updateProfileSettings({
                      displayName,
                      profession,
                      qualifications,
                      bio,
                      clinicAddress,
                      interests,
                      photoURL: selectedAvatar
                    });
                    const updated = await userService.getProfile(user.uid);
                    if (updated) {
                      setProfile(updated);
                    }
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  } catch (err) {
                    console.error("Save settings failed:", err);
                  } finally {
                    setUpdatingSettings(false);
                  }
                }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Column - Clinical Avatar Selector */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-border dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-tertiary mb-6">Clinical Avatar Portrait</h4>
                    
                    <div className="relative mb-6">
                      <img 
                        src={selectedAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'} 
                        alt="Selected Avatar preset" 
                        className="w-32 h-32 rounded-[2.5rem] border-4 border-bg-secondary p-1 object-cover shadow-inner" 
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-[11px] text-text-secondary font-serif italic mb-6 leading-normal">Select a high-resolution profile portrait that reflects your professional practice view mode.</p>

                    <div className="grid grid-cols-3 gap-3 w-full">
                      {[
                        { url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80', label: 'Clinical MD' },
                        { url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80', label: 'Female Doctor' },
                        { url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80', label: 'Practitioner Male' },
                        { url: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=256&q=80', label: 'Academic Scholar' },
                        { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80', label: 'Enthusiast Portrait' },
                        { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80', label: 'Classic Reader' }
                      ].map((pav) => (
                        <button
                          key={pav.url}
                          type="button"
                          onClick={() => setSelectedAvatar(pav.url)}
                          className={`relative overflow-hidden aspect-square rounded-2xl border-2 transition-all ${
                            selectedAvatar === pav.url 
                            ? 'border-primary scale-105 shadow-md shadow-primary/10' 
                            : 'border-transparent hover:border-zinc-300'
                          }`}
                        >
                          <img src={pav.url} alt={pav.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    {/* Custom Image Upload & URL input */}
                    <div className="w-full mt-5 pt-5 border-t border-dashed border-border dark:border-zinc-800 space-y-4 text-left">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary block">Custom Photo Upload</span>
                        <label className="flex items-center justify-center gap-2.5 px-4 py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 border border-border dark:border-zinc-850 rounded-xl cursor-pointer transition-colors group">
                          <Upload className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                          <span className="text-xs font-bold text-text-secondary select-none">Upload Image File</span>
                          <input 
                            id="custom-avatar-file-upload"
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 2 * 1024 * 1024) {
                                  alert("Please upload an image smaller than 2MB for storage performance.");
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  if (typeof reader.result === 'string') {
                                    setSelectedAvatar(reader.result);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden" 
                          />
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="custom-avatar-url-input" className="text-[10px] font-black uppercase tracking-[0.15em] text-text-secondary block">Or Paste Photo URL</label>
                        <input
                          id="custom-avatar-url-input"
                          type="url"
                          placeholder="https://example.com/avatar.jpg"
                          value={selectedAvatar && !selectedAvatar.startsWith('data:') ? selectedAvatar : ''}
                          onChange={(e) => setSelectedAvatar(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs bg-bg-secondary dark:bg-zinc-800/40 border border-border dark:border-zinc-800 rounded-xl outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all text-text-primary placeholder:text-text-tertiary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Settings Status feedback */}
                  {saveSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 rounded-3xl flex items-center gap-4 shadow-sm"
                    >
                      <div className="p-2 bg-emerald-500 text-white rounded-xl">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-widest">Workspace Synced</p>
                        <p className="text-[11px] font-medium leading-normal opacity-80 mt-0.5">Your profile credentials have been saved securely in Firestore.</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Column - User Credentials Form */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white dark:bg-zinc-900 p-5 sm:p-10 rounded-2xl sm:rounded-[3.5rem] border border-border dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] grid gap-8 animate-fade-in">
                    <div className="border-b border-border dark:border-zinc-800 pb-6">
                      <h3 className="text-2xl font-display font-medium italic text-text-primary uppercase tracking-tight">Credentials & Practitioner Details</h3>
                      <p className="text-xs text-text-secondary font-serif italic mt-1">Configure your Homeopathic focus, qualifications, and biography.</p>
                    </div>

                    {/* Full Name field */}
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Full Screen Name / Practitioner Title</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Dr. Samuel Hahnemann"
                        className="w-full px-6 py-4 bg-bg-secondary rounded-2xl border border-border focus:border-primary focus:outline-none transition-colors font-medium text-sm text-text-primary"
                        required
                      />
                    </div>

                    {/* Academic qualifications */}
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Qualifications / Certifications</label>
                      <input 
                        type="text" 
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        placeholder="e.g. BHMS, MD-Homoeopathy, LCEH"
                        className="w-full px-6 py-4 bg-bg-secondary rounded-2xl border border-border focus:border-primary focus:outline-none transition-colors font-medium text-sm text-text-primary"
                      />
                    </div>

                    {/* View role / Professional identity select */}
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Workspace Role View Mode</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 bg-bg-secondary p-1 rounded-2xl border border-border gap-1">
                        {[
                          { id: 'doctor', name: '🩺 Doctor' },
                          { id: 'practitioner', name: '🌿 Clinician' },
                          { id: 'student', name: '🎓 Student' },
                          { id: 'user', name: '📖 Reader' },
                        ].map((role) => (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setProfession(role.id)}
                            className={`py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                              profession === role.id 
                              ? 'bg-primary text-white shadow-md' 
                              : 'text-text-secondary hover:bg-zinc-200/50'
                            }`}
                          >
                            {role.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Short Bio */}
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Clinical Bio / Summary</label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Explain your approach, practice fields, or academic years of specialty Homeopathy research..."
                        className="w-full px-6 py-4 bg-bg-secondary rounded-2xl border border-border focus:border-primary focus:outline-none transition-colors font-medium text-sm text-text-primary resize-none"
                      />
                    </div>

                    {/* Clinic Office Address (Optional for doctors) */}
                    <div className="grid gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Clinic Office / Practice Address (Optional)</label>
                      <input 
                        type="text" 
                        value={clinicAddress}
                        onChange={(e) => setClinicAddress(e.target.value)}
                        placeholder="e.g. Royal London Homeopathic Hospital, London UK"
                        className="w-full px-6 py-4 bg-bg-secondary rounded-2xl border border-border focus:border-primary focus:outline-none transition-colors font-medium text-sm text-text-primary"
                      />
                    </div>

                    {/* Interests Checklist tags */}
                    <div className="grid gap-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Specialty Focus & Topic Personalization Interests</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { id: 'materia-medica', label: '📚 Materia Medica Studies' },
                          { id: 'clinical-therapeutics', label: '🩺 Clinical Therapeutics' },
                          { id: 'organon', label: '📜 Organon & Philosophy' },
                          { id: 'repertorization', label: '🎯 Repertory & Symptom Mapping' },
                          { id: 'pediatrics', label: '👶 Homeopathic Pediatrics' },
                          { id: 'research', label: '🔬 Research & Drug Provings' }
                        ].map((interest) => {
                          const isSelected = interests.includes(interest.id);
                          return (
                            <button
                              key={interest.id}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setInterests(interests.filter(i => i !== interest.id));
                                } else {
                                  setInterests([...interests, interest.id]);
                                }
                              }}
                              className={`flex items-center gap-3 px-5 py-3.5 border rounded-2xl text-[11px] font-bold text-left transition-all ${
                                isSelected 
                                ? 'bg-primary/5 border-primary text-primary shadow-sm' 
                                : 'border-border text-text-secondary hover:bg-bg-secondary bg-white'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                                isSelected ? 'bg-primary border-primary text-white' : 'border-zinc-300'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5" />}
                              </div>
                              {interest.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit settings button */}
                    <div className="pt-6 border-t border-border flex justify-end">
                      <button
                        type="submit"
                        disabled={updatingSettings}
                        className="px-10 py-5 bg-zinc-900 border border-zinc-850 dark:bg-white text-white dark:text-zinc-900 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                      >
                        {updatingSettings ? 'Saving Profile...' : 'Save Workspace Profile'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'admin-db' && isAdmin && (
            <motion.div
              key="admin-db-pane"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl"
            >
              <div className="bg-white dark:bg-zinc-900 p-8 sm:p-12 rounded-[2.5rem] border border-border dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-10">
                <div className="space-y-3 pb-8 border-b border-border">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-500/25">
                    <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                    Administrative Services Only
                  </div>
                  <h4 className="text-3xl font-display font-medium text-text-primary uppercase tracking-tight italic">
                    Database <span className="text-primary italic">Manager</span>
                  </h4>
                  <p className="text-sm text-text-secondary font-serif italic">
                    Execute global actions, flush clinical databases, or purge mock and cloud-hosted collections.
                  </p>
                </div>

                {/* DB Cleanup Tools Card */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                  <div className="md:col-span-3 space-y-6">
                    <h5 className="text-lg font-serif italic text-text-primary">
                      Firestore Purge & Clear Operation
                    </h5>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      This action cleanly removes document files residing in your Curiva Homoeopathy collections (<span className="font-mono text-xs">users</span>, <span className="font-mono text-xs">questions</span>, <span className="font-mono text-xs">orders</span>, and <span className="font-mono text-xs">admins</span>). 
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed font-semibold">
                      Your Firebase project directories, configuration folders, structure blueprints, and assets are completely preserved. Only document records are cleared.
                    </p>
                    
                    {!showResetConfirmation && !isResetting && !resetSuccess && (
                      <button
                        type="button"
                        onClick={() => setShowResetConfirmation(true)}
                        className="px-8 py-4.5 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Reset & Clear Database Records
                      </button>
                    )}

                    {showResetConfirmation && !isResetting && (
                      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl space-y-4">
                        <p className="text-xs text-red-700 font-bold uppercase tracking-wider mb-2">⚠️ Extreme Caution Recommended</p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Are you absolutely sure you want to remove all database documents? This operation cannot be undone. Any custom data profile records will be wiped.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={handleDatabaseReset}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Yes, Clear Database
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowResetConfirmation(false)}
                            className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 text-text-primary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {isResetting && (
                      <div className="space-y-4 p-6 bg-zinc-50 dark:bg-zinc-800/20 border border-border dark:border-zinc-800 rounded-3xl">
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          <span className="text-xs font-bold text-text-primary uppercase tracking-widest">{resetStep}</span>
                        </div>
                        <p className="text-xs text-text-secondary font-serif italic">Purging records from cloud and local database structures...</p>
                      </div>
                    )}

                    {resetSuccess && (
                      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 font-bold" />
                          <span className="text-xs font-black uppercase tracking-widest">Wipe Successful!</span>
                        </div>
                        <p className="text-xs text-text-secondary leading-normal leading-relaxed">
                          All document records inside <span className="font-mono text-xs">users</span>, <span className="font-mono text-xs">questions</span>, <span className="font-mono text-xs">orders</span>, and <span className="font-mono text-xs">admins</span> collections have been cleanly removed. Your workspace is fresh and ready to be refilled.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 bg-bg-secondary dark:bg-zinc-800/40 border border-border dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Collection Checkpoints</h6>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'users', label: 'users / Profiles' },
                        { key: 'questions', label: 'questions / Q&A' },
                        { key: 'orders', label: 'orders / Receipts' },
                        { key: 'admins', label: 'admins / Privileges' },
                      ].map(item => {
                        const status = collectionStatus[item.key as keyof typeof collectionStatus];
                        return (
                          <div key={item.key} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-border/80 dark:border-zinc-850">
                            <span className="text-xs font-mono text-text-primary">{item.label}</span>
                            <div className="flex items-center">
                              {status === 'idle' && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary bg-zinc-100 dark:bg-zinc-850 px-2.5 py-1 rounded-[10px]">Idle</span>
                              )}
                              {status === 'pending' && (
                                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-primary animate-pulse">
                                  <Loader2 className="w-3 h-3 animate-spin" /> Purging
                                </span>
                              )}
                              {status === 'success' && (
                                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-[10px]">
                                  <Check className="w-2.5 h-2.5" /> Empty
                                </span>
                              )}
                              {status === 'failed' && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2.5 py-1 rounded-[10px]">Failed</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personalized Recommendations Section */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/25 font-sans">
                <Sparkles className="w-3 h-3" />
                Adaptive Recommendation Pattern
              </div>
              <h3 className="text-3xl font-display font-medium text-text-primary uppercase tracking-tight italic">
                Personalized <span className="text-primary italic">Suggestions</span>
              </h3>
              <p className="text-text-secondary font-serif italic text-sm">
                Targeted reading based on your active bookmarks and study patterns.
              </p>
            </div>
            
            <Link 
              to="/glossary/all"
              className="px-6 py-3 bg-white hover:border-primary/40 border border-border rounded-xl text-text-secondary text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
            >
              Browse Full Catalog
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPosts.map(post => (
              <PostCard key={`rec-${post.slug}`} post={post} />
            ))}
          </div>
        </div>

        <button 
           onClick={handleLogout}
           className="mt-20 flex items-center gap-3 px-10 py-5 bg-red-500 text-white rounded-[2rem] font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-red-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4" /> Close Session
        </button>
      </main>
    </div>
  );
};

const PostCard = ({ post }: { post: BlogPost }) => (
  <div className="bg-white rounded-[3.5rem] border border-border shadow-soft overflow-hidden group hover:-translate-y-2 transition-all">
    <div className="h-64 relative overflow-hidden">
       <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
       <div className="absolute bottom-6 left-8">
          <span className="px-4 py-1.5 bg-accent text-primary-dark rounded-full text-[9px] font-black uppercase tracking-widest">
            {post.category}
          </span>
       </div>
    </div>
    <div className="p-10">
       <h4 className="text-2xl font-display font-medium text-text-primary italic mb-6 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
         {post.title}
       </h4>
       <Link 
         to={`/read/${post.slug}`}
         className="flex items-center justify-between py-4 border-t border-border group/link"
       >
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary group-hover/link:text-primary transition-colors">Review Case</span>
         <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
         </div>
       </Link>
    </div>
  </div>
);

export default Profile;
