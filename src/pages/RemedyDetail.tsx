
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowUp,
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Settings,
  Clock,
  BookOpen,
  Share2,
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  ArrowRight,
  List,
  Type,
  Sun,
  Moon,
  Coffee,
  Maximize2,
  Minimize2,
  Hash,
  Download,
  Info,
  ShieldCheck,
  Activity,
  GraduationCap,
  Star,
  Trash2,
  ExternalLink,
  X
} from 'lucide-react';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import MateriaMedicaSearch from '../components/MateriaMedicaSearch';
import { useReading } from '../context/ReadingContext';
import { RemedyContent, RemedyMetadata, RemedyRegistry } from '../types/materia-medica';
import { materiaMedicaData } from '../data/materiaMedica';
import { ContentNavigator } from '../components/ContentNavigator';
import { 
  isRemedyBookmarked, 
  toggleBookmarkRemedy, 
  getBookmarkedRemedies, 
  removeBookmarkRemedy, 
  BookmarkedRemedy 
} from '../utils/bookmarkUtils';

// Utility to find and link remedy names in text
const crossLinkText = (text: string, remedies: { slug: string, title: string }[]) => {
  if (!text) return text;
  
  // Sort remedies by title length descending to avoid partial matches
  const sortedRemedies = [...remedies].sort((a, b) => b.title.length - a.title.length);
  
  // Create regex pattern for exact word matches
  // Matches either the full title or common abbreviations if we had them
  const pattern = sortedRemedies.map(r => `\\b${r.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).join('|');
  if (!pattern) return text;
  
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => {
    const matchedRemedy = sortedRemedies.find(r => r.title.toLowerCase() === part.toLowerCase());
    if (matchedRemedy) {
      return (
        <span key={i} className="group relative inline-block">
          <Link 
            to={`/remedy/${matchedRemedy.slug}`}
            className="text-primary hover:text-primary-dark font-semibold border-b border-primary/20 hover:border-primary transition-all px-0.5"
          >
            {part}
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-900 text-[10px] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl border border-white/10 font-sans not-italic">
            View Reference Profile
          </span>
        </span>
      );
    }
    return part;
  });
};

export default function RemedyDetail() {
  const { remedyId } = useParams<{ remedyId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    fontSize, setFontSize, 
    readerTheme, setReaderTheme,
    readingWidth, setReadingWidth,
    lineSpacing, setLineSpacing
  } = useReading();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<RemedyContent | null>(null);
  const [metadata, setMetadata] = useState<RemedyMetadata | null>(null);
  const [registry, setRegistry] = useState<RemedyRegistry | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showTOC, setShowTOC] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [savedRemediesList, setSavedRemediesList] = useState<BookmarkedRemedy[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [relatedRemedies, setRelatedRemedies] = useState<{slug: string, title: string}[]>([]);
  const [progress, setProgress] = useState(0);

  // Sync bookmark state on remedyId change and localStorage events
  useEffect(() => {
    if (remedyId) {
      setIsBookmarked(isRemedyBookmarked(remedyId));
    }
    setSavedRemediesList(getBookmarkedRemedies());

    const handleBookmarksUpdated = () => {
      if (remedyId) {
        setIsBookmarked(isRemedyBookmarked(remedyId));
      }
      setSavedRemediesList(getBookmarkedRemedies());
    };

    window.addEventListener('curiva_bookmarks_updated', handleBookmarksUpdated);
    return () => window.removeEventListener('curiva_bookmarks_updated', handleBookmarksUpdated);
  }, [remedyId]);

  const handleToggleBookmark = () => {
    if (!content || !remedyId) return;
    const isSavedNow = toggleBookmarkRemedy({
      id: remedyId,
      name: content.title,
      commonName: metadata?.commonName || '',
      family: metadata?.family || '',
      thermal: 'Classical',
      keynotes: content.sections?.Keynotes ? [content.sections.Keynotes.slice(0, 100)] : []
    });
    setIsBookmarked(isSavedNow);
    setToastMsg(isSavedNow ? `Added "${content.title}" to My Saved Remedies!` : `Removed "${content.title}" from My Saved Remedies`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const id = remedyId?.toLowerCase();
        
        // 1. Try fetching remote JSON first
        const [contentRes, metaRes, regRes] = await Promise.all([
          fetch(`/data/materia-medica/remedies/${id}/content.json`).catch(() => ({ ok: false, headers: new Headers() })),
          fetch(`/data/materia-medica/remedies/${id}/metadata.json`).catch(() => ({ ok: false, headers: new Headers() })),
          fetch(`/data/materia-medica/registry.json`).catch(() => ({ ok: false, headers: new Headers() }))
        ]);

        const isJson = (res: any) => res.ok && res.headers.get('content-type')?.includes('application/json');

        if (isJson(contentRes) && isJson(metaRes)) {
          const contentData = await (contentRes as Response).json();
          const metaData = await (metaRes as Response).json();
          const regData = isJson(regRes) ? await (regRes as Response).json() : { remedies: [] };

          // Try to extract common name and family from Intro if possible
          const introText = contentData.sections.Intro || '';
          let commonName = '';
          let family = '';
          
          if (introText) {
            const parts = introText.split('.');
            if (parts[0]) {
              const subParts = parts[0].split('(');
              if (subParts.length > 1) {
                commonName = subParts[0].trim();
                family = subParts[1].replace(')', '').trim();
              }
            }
          }

          setContent(contentData);
          setMetadata({
            ...metaData,
            commonName: commonName || metaData.commonName,
            family: family || metaData.family
          });
          setRegistry(regData);

          // Try to get related remedies from "Relationship" section
          if (contentData.sections.Relationship) {
            const relText = contentData.sections.Relationship;
            const found = regData.remedies.filter((r: any) => 
              relText.toLowerCase().includes(r.title.toLowerCase()) && r.slug !== id
            ).slice(0, 4);
            setRelatedRemedies(found);
          }
        } else {
          // 2. Fallback to local materiaMedicaData
          const localRemedy = materiaMedicaData.find(r => 
            r.id.toLowerCase() === id || 
            r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(id || '') ||
            id?.includes(r.id.toLowerCase())
          );

          if (localRemedy) {
            setContent({
              title: localRemedy.name,
              sections: {
                "Intro": `${localRemedy.commonName} (${localRemedy.family}).`,
                "Keynotes": localRemedy.keynotes.join('. '),
                "Mind": localRemedy.mind.join('. '),
                "Physical": localRemedy.physical.join('. '),
                "Modalities": `Better: ${localRemedy.modalities.better.join(', ')}. Worse: ${localRemedy.modalities.worse.join(', ')}.`
              }
            });
            setMetadata({
              slug: id || localRemedy.id.toLowerCase(),
              title: localRemedy.name,
              alphabet: localRemedy.name.charAt(0).toUpperCase(),
              detected_headings: ["Intro", "Keynotes", "Mind", "Physical", "Modalities"],
              word_count: 500,
              estimated_reading_time: "2 mins"
            });
            // Try to at least get the registry for navigation
            if (isJson(regRes)) {
              const regData = await (regRes as Response).json();
              setRegistry(regData);
            }
          } else {
            throw new Error(`Remedy not found: ${remedyId}`);
          }
        }
      } catch (err: any) {
        console.error('Error fetching remedy data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (remedyId) {
      fetchData();
      window.scrollTo(0, 0);
    }
  }, [remedyId]);

  // Scroll spy for TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [content]);

  const handleCopyCitation = () => {
    if (!content) return;
    const citation = `${content.title}. Curiva Homoeopathic Materia Medica. Retrieved from ${window.location.href}`;
    navigator.clipboard.writeText(citation);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const getNextPrev = () => {
    if (!registry || !remedyId) return { prev: null, next: null };
    const index = registry.remedies.findIndex(r => r.slug === remedyId);
    if (index === -1) return { prev: null, next: null };
    
    return {
      prev: index > 0 ? registry.remedies[index - 1] : null,
      next: index < registry.remedies.length - 1 ? registry.remedies[index + 1] : null
    };
  };

  const { prev, next } = getNextPrev();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="mt-4 text-text-secondary font-medium animate-pulse">Loading Reference...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
            <Info className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Remedy Not Found</h1>
          <p className="text-text-secondary leading-relaxed">
            The remedy profile for <code className="bg-bg-secondary px-2 py-0.5 rounded">{remedyId}</code> is currently being updated or is not yet available in our academic index.
          </p>
          <Link to="/homoeopathy/materia-medica" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Index
          </Link>
        </div>
      </div>
    );
  }

  const sections = Object.entries(content.sections);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      readerTheme === 'sepia' ? 'bg-[#f4f1ea]' : 
      readerTheme === 'dark-contrast' ? 'bg-[#121212]' : 
      'bg-bg-primary'
    }`}>
      <SEO 
        title={`${content.title} | Materia Medica | Curiva`}
        description={content.sections.Intro?.substring(0, 160)}
      />

      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Sticky Header / Mobile Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        readerTheme === 'sepia' ? 'bg-[#f4f1ea]/90' : 
        readerTheme === 'dark-contrast' ? 'bg-[#121212]/90' : 
        'bg-white/90'
      } backdrop-blur-md border-b border-border py-4 px-4 sm:px-8`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/homoeopathy/materia-medica" 
              className="p-2 hover:bg-primary/10 rounded-full transition-colors text-text-secondary hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-display font-bold text-text-primary tracking-tight">
                {content.title}
              </h1>
              <p className="text-[10px] text-primary uppercase font-black tracking-widest leading-none">
                Materia Medica Reference
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSavedDrawer(true)}
              className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold transition-all relative cursor-pointer"
              title="View My Saved Remedies"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Saved Remedies</span>
              {savedRemediesList.length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-black bg-primary text-white rounded-full">
                  {savedRemediesList.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowTOC(!showTOC)}
              className="p-2.5 bg-bg-secondary hover:bg-primary/10 rounded-xl transition-all text-text-secondary hover:text-primary lg:hidden"
            >
              <List className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-border mx-1" />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 bg-bg-secondary hover:bg-primary/10 rounded-xl transition-all text-text-secondary hover:text-primary"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
        <div className="grid lg:grid-cols-[250px_1fr] gap-16 items-start">
          
          {/* Desktop Sticky Table of Contents */}
          <aside className="hidden lg:block sticky top-32">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-text-tertiary">
                    Navigator
                  </h4>
                  <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                    {progress}%
                  </span>
                </div>
                <nav className="space-y-1">
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-bold text-text-tertiary hover:text-primary hover:bg-primary/5 transition-all mb-4 border border-dashed border-border"
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>Back to Top</span>
                  </button>
                  {sections.map(([id, _]) => (
                    <a 
                      key={id}
                      href={`#${id.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all group relative overflow-hidden ${
                        activeSection === id.toLowerCase()
                        ? 'text-primary bg-primary/5 font-bold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                      }`}
                    >
                      {activeSection === id.toLowerCase() && (
                        <motion.div 
                          layoutId="active-toc"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                        />
                      )}
                      <span className="relative z-10">{id}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {metadata && (
                <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Reference Meta</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-tertiary">Reading Time</span>
                      <span className="text-text-primary font-bold">{metadata.estimated_reading_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-tertiary">Word Count</span>
                      <span className="text-text-primary font-bold">{metadata.word_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-tertiary">Alphabet</span>
                      <span className="text-text-primary font-bold uppercase">{metadata.alphabet}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Reading Content */}
          <div className={`mx-auto lg:mx-0 w-full transition-all duration-500 ${
            readingWidth === 'narrow' ? 'max-w-xl' :
            readingWidth === 'medium' ? 'max-w-3xl' :
            'max-w-5xl'
          }`}>
            
            {/* Remedy Hero / Header */}
            <header className="mb-12 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-8 border border-primary/20"
              >
                <BookOpen className="w-3.5 h-3.5" /> Curiva Materia Medica
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-4 ${
                  readerTheme === 'dark-contrast' ? 'text-zinc-100' : 'text-text-primary'
                }`}
              >
                {content.title}
              </motion.h1>

              {metadata?.commonName && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-xl md:text-2xl font-serif italic text-text-secondary mb-8"
                >
                  {metadata.commonName} {metadata.family && <span className="text-text-tertiary not-italic text-lg ml-2">— {metadata.family}</span>}
                </motion.p>
              )}

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
              >
                <button 
                  onClick={handleToggleBookmark}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                    isBookmarked 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark' 
                    : 'bg-bg-secondary text-text-secondary hover:text-primary hover:bg-primary/5 border border-border'
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-accent-light" /> : <Bookmark className="w-4 h-4" />}
                  {isBookmarked ? 'Saved in My Remedies' : 'Save Reference'}
                </button>
                <button 
                  onClick={handleCopyCitation}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    copyFeedback 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : 'bg-bg-secondary text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {copyFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copyFeedback ? 'Citation Copied' : 'Copy Citation'}
                </button>
                <ShareButton 
                  title={content.title}
                  text={`Read the Materia Medica for ${content.title} on Curiva.`}
                  variant="outline"
                  label="Share"
                />
              </motion.div>

              {/* Quick Facts Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[2.5rem] border text-left ${
                  readerTheme === 'sepia' ? 'bg-[#fdfbf6] border-[#e9e3d3]' :
                  readerTheme === 'dark-contrast' ? 'bg-[#1e1e1e] border-zinc-800' :
                  'bg-white border-border shadow-soft'
                }`}
              >
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-2">Biological Source</p>
                  <p className="font-bold text-text-primary truncate" title={metadata?.family || 'Natural'}>
                    {metadata?.family || 'Classical'}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-2">Reading Time</p>
                  <p className="font-bold text-text-primary">{metadata?.estimated_reading_time}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-2">Vocabulary</p>
                  <p className="font-bold text-text-primary">{metadata?.word_count} Words</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-2">Academic Index</p>
                  <p className="font-bold text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Boericke
                  </p>
                </div>
              </motion.div>
            </header>

            {/* Key Highlights / Clinical Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mb-16 p-8 rounded-[2.5rem] border ${
                readerTheme === 'sepia' ? 'bg-[#fdfbf6] border-[#e9e3d3]' :
                readerTheme === 'dark-contrast' ? 'bg-[#1e1e1e] border-zinc-800' :
                'bg-bg-secondary border-border'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <h2 className="text-xl font-display font-bold text-text-primary">Clinical Pearls & Key Indications</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Core Essentials</h3>
                  <ul className="space-y-3">
                    {content.sections.Intro?.split('.').slice(0, 3).map((point, i) => (
                      point.trim() && (
                        <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                          <span className="text-primary font-bold mt-1.5">•</span>
                          <span>{point.trim()}.</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Mental Syndrome</h3>
                  <ul className="space-y-3">
                    {content.sections.Mind?.split('.').slice(0, 3).map((point, i) => (
                      point.trim() && (
                        <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                          <span className="text-primary font-bold mt-1.5">•</span>
                          <span>{point.trim()}.</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            <article className={`space-y-16 ${
              fontSize === 'sm' ? 'text-sm' :
              fontSize === 'md' ? 'text-base' :
              fontSize === 'lg' ? 'text-lg' :
              'text-xl'
            } ${
              lineSpacing === 'compact' ? 'leading-relaxed' :
              lineSpacing === 'normal' ? 'leading-loose' :
              'leading-[2.5]'
            }`}>
              
              {sections.map(([id, text], index) => (
                <motion.section 
                  key={id}
                  id={id.toLowerCase()}
                  ref={(el) => { sectionRefs.current[id.toLowerCase()] = el; }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05 }}
                  className="scroll-mt-32"
                >
                  <div className={`p-8 md:p-12 rounded-[2.5rem] border transition-all ${
                    readerTheme === 'sepia' ? 'bg-[#fdfbf6] border-[#e9e3d3] shadow-sm' :
                    readerTheme === 'dark-contrast' ? 'bg-[#1e1e1e] border-zinc-800 shadow-none' :
                    'bg-white border-border shadow-soft'
                  }`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        readerTheme === 'dark-contrast' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                      }`}>
                        <Hash className="w-5 h-5 opacity-40" />
                      </div>
                      <h2 className={`text-2xl md:text-3xl font-display font-medium italic transition-colors ${
                        readerTheme === 'dark-contrast' ? 'text-primary' : 'text-primary'
                      }`}>
                        {id}
                      </h2>
                    </div>

                    <div className={`font-serif italic leading-relaxed text-balance transition-colors ${
                      readerTheme === 'sepia' ? 'text-[#433422]' : 
                      readerTheme === 'dark-contrast' ? 'text-zinc-300' : 
                      'text-text-secondary'
                    }`}>
                      {registry ? crossLinkText(text, registry.remedies) : text}
                    </div>
                  </div>
                </motion.section>
              ))}
            </article>

            {/* Academic Citations Section */}
            <section className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-bg-secondary border border-border">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-display font-bold text-text-primary">Academic Citations</h3>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">AMA Style</p>
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-border text-xs font-mono text-text-secondary leading-relaxed select-all">
                    Boericke W. {content.title}. In: Pocket Manual of Homoeopathic Materia Medica. 9th ed. San Francisco, CA: Boericke & Runyon; 1927.
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Digital Reference</p>
                  <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-border text-xs font-mono text-text-secondary leading-relaxed select-all">
                    Curiva Homoeopathy. {content.title} Reference Profile. Accessed {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. {window.location.href}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border flex items-center gap-4 text-[10px] text-text-tertiary font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Text content is immutable and derived from verified classical 1927 edition records.</span>
              </div>
            </section>

            {/* Related Remedies */}
            {relatedRemedies.length > 0 && (
              <section className="mt-24">
                <h3 className="text-xl font-display font-bold text-text-primary mb-8 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" /> Related Remedies
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedRemedies.map(rel => (
                    <Link 
                      key={rel.slug}
                      to={`/remedy/${rel.slug}`}
                      className="p-6 bg-bg-secondary border border-border rounded-2xl hover:border-primary/30 transition-all flex items-center justify-between group"
                    >
                      <span className="font-medium text-text-primary group-hover:text-primary transition-colors">{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Previous / Next Navigation */}
            <ContentNavigator 
              prev={prev ? { to: `/remedy/${prev.slug}`, title: prev.title, label: 'Previous Remedy' } : null}
              next={next ? { to: `/remedy/${next.slug}`, title: next.title, label: 'Next Remedy' } : null}
            />
          </div>
        </div>
      </main>

      {/* Reading Settings Drawer */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 z-[111] shadow-2xl rounded-t-[3rem] p-8 md:p-12"
            >
              <div className="max-w-2xl mx-auto space-y-12">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-display font-bold text-text-primary">Reading Experience</h3>
                  <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-bg-secondary rounded-full">
                    <ChevronDown className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Reader Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'default', label: 'Classic', icon: Sun, class: 'bg-white border-zinc-200' },
                        { id: 'sepia', label: 'Paper', icon: Coffee, class: 'bg-[#f4f1ea] border-[#e9e3d3]' },
                        { id: 'dark-contrast', label: 'Midnight', icon: Moon, class: 'bg-[#121212] border-zinc-800' }
                      ].map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => setReaderTheme(theme.id as any)}
                          className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                            readerTheme === theme.id ? 'ring-2 ring-primary border-primary' : 'hover:bg-bg-secondary'
                          } ${theme.class}`}
                        >
                          <theme.icon className={`w-5 h-5 ${readerTheme === theme.id ? 'text-primary' : 'text-text-secondary'}`} />
                          <span className={`text-[10px] font-bold ${readerTheme === theme.id ? 'text-primary' : 'text-text-secondary'}`}>
                            {theme.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Font Size</label>
                    <div className="flex items-center justify-between bg-bg-secondary p-1.5 rounded-2xl border border-border">
                      {[
                        { id: 'sm', label: 'Small' },
                        { id: 'md', label: 'Standard' },
                        { id: 'lg', label: 'Large' },
                        { id: 'xl', label: 'Extra' }
                      ].map(sz => (
                        <button
                          key={sz.id}
                          onClick={() => setFontSize(sz.id as any)}
                          className={`flex-grow py-3 text-xs font-black uppercase rounded-xl transition-all ${
                            fontSize === sz.id ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
                          }`}
                        >
                          {sz.id}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 pt-6">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Line Spacing</label>
                    <div className="flex items-center justify-between bg-bg-secondary p-1.5 rounded-2xl border border-border">
                      {[
                        { id: 'compact', icon: Maximize2 },
                        { id: 'normal', icon: Minimize2 },
                        { id: 'relaxed', icon: ArrowRight }
                      ].map(sp => (
                        <button
                          key={sp.id}
                          onClick={() => setLineSpacing(sp.id as any)}
                          className={`flex-grow flex items-center justify-center py-3 rounded-xl transition-all ${
                            lineSpacing === sp.id ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
                          }`}
                        >
                          <sp.icon className="w-4 h-4 rotate-90" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Max Width</label>
                    <div className="flex items-center justify-between bg-bg-secondary p-1.5 rounded-2xl border border-border">
                      {[
                        { id: 'narrow', label: 'Focus' },
                        { id: 'medium', label: 'Optimum' },
                        { id: 'wide', label: 'Full' }
                      ].map(wd => (
                        <button
                          key={wd.id}
                          onClick={() => setReadingWidth(wd.id as any)}
                          className={`flex-grow py-3 text-xs font-black uppercase rounded-xl transition-all ${
                            readingWidth === wd.id ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
                          }`}
                        >
                          {wd.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Table of Contents Overlay */}
      <AnimatePresence>
        {showTOC && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTOC(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-zinc-900 z-[101] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-display font-black uppercase tracking-widest text-primary">Contents</h3>
                <button onClick={() => setShowTOC(false)} className="p-2 hover:bg-bg-secondary rounded-full">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-1">
                {sections.map(([id, _]) => (
                  <a 
                    key={id}
                    href={`#${id.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                      setShowTOC(false);
                    }}
                    className={`block py-4 border-b border-border text-sm font-medium transition-all ${
                      activeSection === id.toLowerCase() ? 'text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {id}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Theme Toggle (optional but nice) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
         {/* Could add more floating actions here */}
      </div>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] px-6 py-3.5 bg-zinc-900 text-white font-sans text-xs font-bold rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Drawer for My Saved Remedies */}
      <AnimatePresence>
        {showSavedDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSavedDrawer(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white dark:bg-zinc-900 z-[111] shadow-2xl flex flex-col justify-between border-l border-border"
            >
              <div>
                <div className="p-6 border-b border-border flex items-center justify-between bg-bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-display font-black text-text-primary uppercase tracking-tight">
                      My Saved Remedies ({savedRemediesList.length})
                    </h3>
                  </div>
                  <button 
                    onClick={() => setShowSavedDrawer(false)}
                    className="p-2 hover:bg-bg-secondary rounded-xl transition-all text-text-secondary"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(100vh-160px)] space-y-4 no-scrollbar">
                  {savedRemediesList.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                        <Bookmark className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-text-primary">No Saved Remedies Yet</h4>
                      <p className="text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
                        Click the "Save Reference" button on any remedy profile to keep it saved for quick review.
                      </p>
                    </div>
                  ) : (
                    savedRemediesList.map(item => (
                      <div 
                        key={item.id}
                        className="p-4 bg-bg-secondary/60 hover:bg-bg-secondary border border-border rounded-2xl transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex-grow min-w-0">
                          <Link 
                            to={`/homoeopathy/materia-medica/${item.slug || item.id.toLowerCase()}`}
                            onClick={() => setShowSavedDrawer(false)}
                            className="block"
                          >
                            <h4 className="text-sm font-black text-text-primary group-hover:text-primary transition-colors truncate">
                              {item.name}
                            </h4>
                            {item.commonName && (
                              <p className="text-[11px] text-text-secondary italic truncate">
                                {item.commonName}
                              </p>
                            )}
                          </Link>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link 
                            to={`/homoeopathy/materia-medica/${item.slug || item.id.toLowerCase()}`}
                            onClick={() => setShowSavedDrawer(false)}
                            className="p-2 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-xl transition-all"
                            title="View Remedy"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              removeBookmarkRemedy(item.id);
                            }}
                            className="p-2 hover:bg-rose-500/10 text-text-tertiary hover:text-rose-500 rounded-xl transition-all"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {savedRemediesList.length > 0 && (
                <div className="p-4 border-t border-border bg-bg-secondary/40">
                  <p className="text-[10px] text-text-tertiary text-center font-medium">
                    Saved locally on your browser. Accessible anytime without logins.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MateriaMedicaSearch />
    </div>
  );
}
