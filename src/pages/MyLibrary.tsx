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
  ArrowRight
} from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { resources, Resource } from '../data/resources';

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
          <button className="hidden sm:flex items-center gap-2 px-6 py-2 bg-text-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
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
           <div className="aspect-[1/1.4] bg-white dark:bg-gray-950 shadow-2xl rounded-sm p-12 md:p-20 relative border border-border">
              <div className="absolute top-12 left-12 w-20 h-20 opacity-5">
                 <img src="/logo.svg" alt="Curiva" className="w-full" />
              </div>
              <div className="text-center space-y-8 mt-20">
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
           <div className="aspect-[1/1.4] bg-white dark:bg-gray-950 shadow-2xl rounded-sm p-12 md:p-20 border border-border">
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', auth.currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const orderData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        
        // Match orders with resource static data
        const uniqueResourceIds = [...new Set(orderData.map(o => o.resourceId))];
        const owned = resources.filter(r => uniqueResourceIds.includes(r.id));
        setPurchasedResources(owned);

        // Auto-open logic
        const state = location.state as { purchasedResourceId?: string; success?: boolean };
        if (state?.purchasedResourceId && state?.success) {
          const newlyPurchased = owned.find(r => r.id === state.purchasedResourceId);
          if (newlyPurchased) {
            setSelectedForView(newlyPurchased);
          }
          // Clear state to prevent re-opening on refresh
          navigate(location.pathname, { replace: true, state: {} });
        }
      } catch (error) {
        console.error('Error fetching library:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [location.state, navigate]);

  const filteredResources = purchasedResources.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
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
            <p className="text-text-secondary font-medium">Please log in to access your purchased digital resources and research materials.</p>
            <button 
              onClick={() => navigate('/feedback')}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              Access Now
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen pb-20">
      <Helmet>
        <title>My Digital Library | Curiva</title>
      </Helmet>

      {/* Header Space */}
      <section className="relative pt-48 pb-24 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12 text-center lg:text-left">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mb-2 mx-auto lg:mx-0"
            >
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-light">Secure Access</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8] uppercase flex flex-col"
            >
              My <span className="text-primary italic lg:ml-12">Collections</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-full lg:w-[450px] group"
          >
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search your library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-20 pr-8 py-7 bg-white/5 border border-white/10 rounded-[2.5rem] focus:outline-none focus:border-primary/50 transition-all text-lg font-bold text-white placeholder:text-white/10 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((resource) => (
                <motion.div
                  layout
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-bg-secondary border border-border p-8 rounded-[3rem] hover:shadow-2xl transition-all relative overflow-hidden"
                >
                  <div className="mb-6 relative h-40 rounded-[2rem] overflow-hidden bg-primary/5">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">{resource.category}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-text-primary group-hover:text-primary transition-colors leading-tight">
                      {resource.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                       <span className="flex items-center gap-2"><FileText className="w-3 h-3 text-primary" /> {resource.pageCount} Pages</span>
                       <span className="w-1 h-1 bg-border rounded-full" />
                       <span>Purchased</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button 
                      onClick={() => setSelectedForView(resource)}
                      className="flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg shadow-primary/20"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-bg-primary text-text-primary border border-border rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-bg-secondary transition-all">
                      <Download className="w-4 h-4" /> Save
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-32 bg-bg-secondary rounded-[4rem] border-2 border-dashed border-border p-12">
            <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mx-auto mb-8">
               <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-text-primary uppercase tracking-tighter italic">Your shelf is empty</h3>
            <p className="text-text-secondary max-w-sm mx-auto mt-4 font-medium leading-relaxed">
              Explore our marketplace to discover professional clinical guides and research materials.
            </p>
            <Link 
              to="/marketplace"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl mt-10 hover:scale-105 transition-all shadow-xl shadow-primary/30"
            >
              Browse Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
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

export default MyLibrary;
