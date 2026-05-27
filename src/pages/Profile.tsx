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
  BookOpen
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { userService, UserProfile } from '../services/userService';
import { fetchPosts } from '../services/api';
import { BlogPost } from '../types';
import SEO from '../components/SEO';
import { Link, useNavigate } from 'react-router-dom';
import { getPersonalizedRecommendations } from '../services/recommendationService';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userProfile = await userService.getProfile(currentUser.uid);
        setProfile(userProfile);
        const allPosts = await fetchPosts();
        setPosts(allPosts);
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

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
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title={`${user.displayName || 'User'} | Study Profile | Curiva`}
        description="Manage your clinical bookmarks and track your historical case study progress."
      />

      {/* Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1)_0%,transparent_70%)] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative shrink-0"
            >
              <img 
                src={user.photoURL || ''} 
                alt={user.displayName || ''} 
                className="w-40 h-40 rounded-[3rem] border-4 border-white/10 shadow-2xl object-cover" 
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-primary-dark rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl border-4 border-primary-dark">
                Verified Scholar
              </div>
            </motion.div>
            
            <div className="text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter uppercase mb-4"
              >
                {user.displayName}
              </motion.h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-white/60 font-serif italic text-lg">
                <div className="flex items-center gap-2">
                   <Mail className="w-5 h-5 text-accent" />
                   {user.email}
                </div>
                <div className="flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-accent" />
                   Joined {new Date(profile.createdAt?.seconds * 1000).toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                   <span className="text-2xl font-display text-white block leading-none mb-1">{profile.bookmarks?.length || 0}</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-accent-light opacity-60">Bookmarks</span>
                </div>
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                   <span className="text-2xl font-display text-white block leading-none mb-1">{profile.readingHistory?.length || 0}</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-accent-light opacity-60">Case Studies Read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="flex bg-white/80 backdrop-blur-xl p-2 rounded-[2.5rem] border border-border shadow-2xl w-fit mb-12">
            {[
              { id: 'bookmarks', name: 'Saved Inquiries', icon: Bookmark },
              { id: 'history', name: 'Log History', icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                  : 'text-text-secondary hover:bg-bg-secondary'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
        </div>

        <AnimatePresence mode="wait">
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
                <div className="col-span-full p-20 text-center bg-white rounded-[3.5rem] border border-dashed border-border group">
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
                <div key={`${post.slug}-${idx}`} className="bg-white p-8 rounded-[2rem] border border-border shadow-soft flex items-center justify-between group hover:border-primary/20 transition-all">
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
                <div className="p-20 text-center bg-white rounded-[3.5rem] border border-dashed border-border">
                   <History className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                   <p className="text-xl font-serif italic text-text-secondary">Your reading journey has not yet begun.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personalized Recommendations Section */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/25">
                <Sparkles className="w-3 h-3" />
                Adaptive Recommendation Pattern
              </div>
              <h3 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">
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
