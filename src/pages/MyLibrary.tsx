import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Library, 
  Eye, 
  Download, 
  ChevronLeft, 
  Maximize2, 
  ShieldCheck, 
  FileText, 
  ArrowLeft,
  X,
  CreditCard,
  Lock,
  Search,
  BookOpen,
  ArrowRight,
  Bookmark,
  History,
  Clock,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { auth, db, collection, query, where, getDocs, orderBy } from '../lib/firebase';
import { resources, Resource } from '../data/resources';
import { userService } from '../services/userService';
import { allBlogPosts as blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import { getBookmarkedRemedies, removeBookmarkRemedy, BookmarkedRemedy } from '../utils/bookmarkUtils';

interface Order {
  id: string;
  resourceId: string;
  createdAt: any;
}

const FullscreenReader = ({ resource, onClose }: { resource: Resource; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex flex-col"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-secondary/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div>
            <h2 className="text-sm font-black text-text-primary tracking-tight uppercase truncate max-w-[200px] sm:max-w-md">
              {resource.title}
            </h2>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">Secure Viewer</span>
               <span className="text-[10px] text-text-tertiary">•</span>
               <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Page 1 of {resource.pageCount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Stream</span>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
            <Maximize2 className="w-4 h-4" />
            Full Screen
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reader Body (Simulated) */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-12 bg-gray-100 dark:bg-bg-primary/50">
        <div className="max-w-4xl mx-auto space-y-12">
           {/* Page 1 */}
           <div className="aspect-[1/1.4] bg-white dark:bg-gray-950 shadow-2xl rounded-sm p-12 md:p-10 relative border border-border">
              <div className="absolute top-12 left-12 w-20 h-20 opacity-5">
                 <img src="/logo.svg" alt="Curiva" className="w-full" />
              </div>
              <div className="text-center space-y-8 mt-10">
                 <div className="w-24 h-1 bg-primary mx-auto" />
                 <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary tracking-tighter leading-none uppercase italic">
                   {resource.title.split(':').map((p, i) => (
                     <span key={i} className={i === 1 ? 'block text-primary italic' : ''}>{p}</span>
                   ))}
                 </h1>
                 <p className="text-lg text-text-secondary font-medium tracking-wide">
                   Clinical Study Guide & Reference Materials
                 </p>
                 <div className="pt-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-tertiary">
                      © 2026 Curiva Homoeopathy • Digital Publication
                    </p>
                 </div>
              </div>
           </div>

           {/* Page 2 (Skeleton) */}
           <div className="aspect-[1/1.4] bg-white dark:bg-gray-950 shadow-2xl rounded-sm p-12 md:p-10 border border-border">
              <div className="space-y-6">
                 <div className="h-8 bg-gray-100 dark:bg-gray-800 w-1/3 rounded-lg" />
                 <div className="space-y-3">
                    <div className="h-4 bg-gray-50 dark:bg-gray-900 w-full rounded-md" />
                    <div className="h-4 bg-gray-50 dark:bg-gray-900 w-full rounded-md" />
                    <div className="h-4 bg-gray-50 dark:bg-gray-900 w-3/4 rounded-md" />
                 </div>
                 <div className="h-px bg-gray-100 dark:bg-gray-800 my-8" />
                 <div className="grid grid-cols-2 gap-8">
                    <div className="h-40 bg-gray-50 dark:bg-gray-900 rounded-2xl" />
                    <div className="h-40 bg-gray-50 dark:bg-gray-900 rounded-2xl" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const MyLibrary = () => {
  const [purchasedResources, setPurchasedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForView, setSelectedForView] = useState<Resource | null>(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'remedies' | 'bookmarks' | 'history' | 'books'>('remedies');
  const [savedRemedies, setSavedRemedies] = useState<BookmarkedRemedy[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const syncSavedRemedies = () => {
      setSavedRemedies(getBookmarkedRemedies());
    };
    syncSavedRemedies();
    window.addEventListener('curiva_bookmarks_updated', syncSavedRemedies);
    return () => window.removeEventListener('curiva_bookmarks_updated', syncSavedRemedies);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Fetch Orders
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const orderData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        
        const uniqueResourceIds = [...new Set(orderData.map(o => o.resourceId))];
        const owned = resources.filter(r => uniqueResourceIds.includes(r.id));
        setPurchasedResources(owned);

        // Fetch User Profile (Bookmarks/History)
        const userProfile = await userService.getProfile(auth.currentUser.uid);
        setProfile(userProfile);

        // Auto-open logic
        const state = location.state as { purchasedResourceId?: string; success?: boolean };
        if (state?.purchasedResourceId && state?.success) {
          const newlyPurchased = owned.find(r => r.id === state.purchasedResourceId);
          if (newlyPurchased) {
            setSelectedForView(newlyPurchased);
            setActiveTab('books');
          }
          navigate(location.pathname, { replace: true, state: {} });
        }
      } catch (error) {
        console.error('Error fetching library:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state, navigate]);

  const bookmarkedPosts = blogPosts.filter(post => profile?.bookmarks?.includes(post.id || ''));
  const historyPosts = (profile?.readingHistory || [])
    .map((h: any) => ({
      ...blogPosts.find(p => p.id === h.postId),
      viewedAt: h.timestamp
    }))
    .filter((p: any) => p.id)
    .sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime());

  const filteredSavedRemedies = savedRemedies.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.commonName && r.commonName.toLowerCase().includes(search.toLowerCase())) ||
    (r.family && r.family.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredBookmarks = bookmarkedPosts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHistory = historyPosts.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredResources = purchasedResources.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
    (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="text-center space-y-4">
            <Library className="w-12 h-12 text-primary animate-bounce mx-auto" />
            <h2 className="text-xl font-black uppercase tracking-tight">Syncing Library...</h2>
         </div>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
         <div className="max-w-md w-full p-12 bg-bg-secondary rounded-[3rem] border border-border text-center space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto">
               <Lock className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">
              Private <span className="text-primary italic">Library</span>
            </h2>
            <p className="text-text-secondary font-medium">Please log in to access your bookmarks, reading history, and digital resources.</p>
            <Link 
              to="/auth"
              className="block w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              Access Now
            </Link>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen pb-20">
      <SEO 
        title="My Library | Curiva Homoeopathy"
        description="Your personal archive of Homoeopathic wisdom, books, and studies."
      />

      {/* Header Space */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-bg-secondary border-b border-border text-text-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12 text-center lg:text-left">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 rounded-full border border-primary/20 mb-2 mx-auto lg:mx-0">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Personal Archive</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] font-display font-black text-text-primary tracking-tighter leading-[0.8] uppercase flex flex-col">
              My <span className="text-primary italic lg:ml-12">Library</span>
            </h1>
          </div>

          <div className="relative w-full lg:w-[450px] group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder={`Search in ${activeTab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-20 pr-8 py-7 bg-white border border-border rounded-[2.5rem] focus:outline-none focus:border-primary/50 transition-all text-lg font-bold text-text-primary placeholder:text-text-tertiary shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-30">
        <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap bg-white p-3 rounded-[2.5rem] border border-border shadow-2xl">
          <button 
            onClick={() => setActiveTab('remedies')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'remedies' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-bg-secondary text-text-secondary'
            }`}
          >
            <Bookmark className="w-4 h-4 text-accent" /> Saved Remedies ({savedRemedies.length})
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookmarks' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-bg-secondary text-text-secondary'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Articles {bookmarkedPosts.length > 0 && `(${bookmarkedPosts.length})`}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'history' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-bg-secondary text-text-secondary'
            }`}
          >
            <History className="w-4 h-4" /> Reading History
          </button>
          <button 
            onClick={() => setActiveTab('books')}
            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'books' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-bg-secondary text-text-secondary'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Digital Books {purchasedResources.length > 0 && `(${purchasedResources.length})`}
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <AnimatePresence mode="wait">
          {activeTab === 'remedies' && (
            <motion.div
              key="remedies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {filteredSavedRemedies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSavedRemedies.map(remedy => (
                    <div 
                      key={remedy.id}
                      className="group bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-xl">
                            {remedy.family || 'Classical Remedy'}
                          </span>
                          <button
                            onClick={() => removeBookmarkRemedy(remedy.id)}
                            className="p-2 text-text-tertiary hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                            title="Remove from saved remedies"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <h3 className="text-2xl font-display font-black text-text-primary group-hover:text-primary transition-colors">
                            {remedy.name}
                          </h3>
                          {remedy.commonName && (
                            <p className="text-xs text-text-secondary italic font-serif mt-0.5">
                              {remedy.commonName}
                            </p>
                          )}
                        </div>

                        {remedy.keynotes && remedy.keynotes.length > 0 && (
                          <p className="text-xs text-text-secondary font-medium line-clamp-2 leading-relaxed">
                            {remedy.keynotes[0]}
                          </p>
                        )}
                      </div>

                      <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
                        <span className="text-[10px] text-text-tertiary font-bold">
                          Saved {new Date(remedy.savedAt).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/homoeopathy/materia-medica/${remedy.slug || remedy.id.toLowerCase()}`}
                          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
                        >
                          <span>Open Remedy</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyLibrary 
                  icon={Bookmark} 
                  title="No saved remedies yet" 
                  desc="Save remedies from the Materia Medica directory or remedy detail pages for quick reference." 
                  cta="Browse Materia Medica" 
                  link="/homoeopathy/materia-medica" 
                />
              )}
            </motion.div>
          )}
          {activeTab === 'books' && (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.map((resource) => (
                    <div key={resource.id} className="group bg-bg-secondary border border-border p-8 rounded-[3rem] hover:shadow-2xl transition-all relative overflow-hidden">
                       <div className="mb-6 relative h-48 rounded-[2rem] overflow-hidden bg-primary/5">
                        <img 
                          src={resource.thumbnail} 
                          alt={resource.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <span className="text-white text-[10px] font-black uppercase tracking-widest">{resource.category}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-text-primary mb-4 leading-tight">{resource.title}</h3>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSelectedForView(resource)}
                          className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
                        >
                          Read Now
                        </button>
                        <button className="p-4 bg-white border border-border rounded-2xl text-text-secondary">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyLibrary 
                  icon={BookOpen} 
                  title="No books owned" 
                  desc="Purchased professional guides and study materials will appear here." 
                  cta="Browse Store" 
                  link="/marketplace" 
                />
              )}
            </motion.div>
          )}

          {activeTab === 'bookmarks' && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {filteredBookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBookmarks.map(post => (
                    <PostCard key={post.id} post={post} type="bookmark" onRemove={() => userService.toggleBookmark(post.id)} />
                  ))}
                </div>
              ) : (
                <EmptyLibrary 
                  icon={Bookmark} 
                  title="No bookmarks yet" 
                  desc="Save remedies and articles for quick access during your studies." 
                  cta="Explore Materia Medica" 
                  link="/articles" 
                />
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {filteredHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredHistory.map(post => (
                    <PostCard key={post.id} post={post} type="history" />
                  ))}
                </div>
              ) : (
                <EmptyLibrary 
                  icon={History} 
                  title="History is empty" 
                  desc="Articles you read will be tracked here automatically." 
                  cta="Start Learning" 
                  link="/articles" 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Reader Overlay */}
      <AnimatePresence>
        {selectedForView && (
          <FullscreenReader 
            resource={selectedForView} 
            onClose={() => setSelectedForView(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const PostCard = ({ post, type, onRemove }: any) => (
  <div className="group bg-white p-6 rounded-[2.5rem] border border-border shadow-sm hover:shadow-soft transition-all flex gap-6 items-center">
    <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 bg-bg-secondary">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-md">{post.category}</span>
        {type === 'history' && post.viewedAt && (
           <span className="text-[8px] font-bold text-text-tertiary flex items-center gap-1">
             <Clock className="w-2 h-2" /> {new Date(post.viewedAt).toLocaleDateString()}
           </span>
        )}
      </div>
      <h4 className="text-lg font-bold text-text-primary leading-tight mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
      <div className="flex items-center gap-4">
        <Link to={`/read/${post.slug}`} className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
          Read <ChevronRight className="w-3 h-3" />
        </Link>
        {type === 'bookmark' && (
          <button onClick={onRemove} className="text-[10px] font-black uppercase tracking-widest text-text-tertiary hover:text-red-500 transition-colors">
            Remove
          </button>
        )}
      </div>
    </div>
  </div>
);

const EmptyLibrary = ({ icon: Icon, title, desc, cta, link }: any) => (
  <div className="text-center py-16 bg-bg-secondary rounded-[4rem] border-2 border-dashed border-border p-12">
    <div className="w-20 h-20 bg-bg-primary rounded-[2rem] flex items-center justify-center text-primary/20 mx-auto mb-6">
      <Icon className="w-10 h-10" />
    </div>
    <h3 className="text-2xl font-black text-text-primary uppercase tracking-tighter italic">{title}</h3>
    <p className="text-text-secondary max-w-xs mx-auto mt-2 font-medium opacity-70 italic">{desc}</p>
    <Link 
      to={link}
      className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-xl mt-8 hover:scale-105 transition-all shadow-xl shadow-primary/30"
    >
      {cta} <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

export default MyLibrary;
