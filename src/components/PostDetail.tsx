import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { Bookmark as BookmarkIcon, ArrowLeft, Calendar, User, Tag, Share2, Link2, Check, ArrowRight, BookOpen, Clock, Zap, Target, Users, AlertTriangle, Search, MessageCircle, ArrowUpRight, CheckCircle2, ThumbsUp, ThumbsDown, Activity, BrainCircuit, LayoutGrid, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from './SEO';
import { fetchPosts } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import ModalityPill from './ModalityPill';
import { MarkdownComponents, highlightModalities } from './MarkdownRenderers';
import TextMindMap from './TextMindMap';
import { useTheme } from '../context/ThemeContext';
import { Volume2, VolumeX, Play, Pause, BookmarkCheck } from 'lucide-react';
import { useUser } from '../hooks/useUser';

import RelatedArticles from './RelatedArticles';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onTagClick?: (tag: string) => void;
  onSelectPost: (post: BlogPost) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onTagClick, onSelectPost }) => {
  const { profile, toggleBookmark, addToHistory } = useUser();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(post.excerpt + ". " + (post.quickSummary?.join(". ") || ""));
      utterance.onend = () => setIsPlaying(false);
      setSpeech(utterance);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [post]);

  const toggleAudio = () => {
    if (!speech) return;
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.speak(speech);
      }
      setIsPlaying(true);
    }
  };
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCapture, setEmailCapture] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [toc, setToc] = useState<{ id: string, text: string, level: number }[]>([]);

  useEffect(() => {
    // Basic markdown heading extraction for TOC with ID deduplication to prevent React key collision
    const headingLines = post.content.split('\n').filter(line => line.startsWith('## ') || line.startsWith('### '));
    const seenIds = new Set<string>();
    const extractedToc: { id: string, text: string, level: number }[] = [];
    
    headingLines.forEach(line => {
      const level = line.startsWith('### ') ? 3 : 2;
      const text = line.replace(/^#+\s+/, '').trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        extractedToc.push({ id, text, level });
      }
    });
    setToc(extractedToc);

    const loadRelated = async () => {
      try {
        const allPosts = await fetchPosts();
        
        const scoredPosts = allPosts
          .filter(p => p.id !== post.id)
          .map(p => {
            let score = 0;
            if (p.category === post.category) score += 10;
            const sharedTags = p.tags.filter(t => post.tags.includes(t));
            score += sharedTags.length * 5;
            const pDate = new Date(p.date).getTime();
            const postDate = new Date(post.date).getTime();
            const daysDiff = Math.abs(pDate - postDate) / (1000 * 60 * 60 * 24);
            if (daysDiff < 30) score += 3;
            else if (daysDiff < 90) score += 1;
            return { post: p, score };
          });
          
        const sorted = scoredPosts
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(sp => sp.post);
          
        setRelatedPosts(sorted);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };
    loadRelated();
    if (profile) {
      addToHistory(post.slug);
    }
    window.scrollTo(0, 0);
  }, [post, profile?.uid]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?post=${post.id}`
    : '';
  const shareTitle = post.title;

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const readingTime = post.readingTime || `${Math.ceil(post.content.split(/\s+/).length / 200)} min read`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 relative pb-20">
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[70] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <AnimatePresence>
        {scrollProgress > 10 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 z-50 hover:scale-110 transition-transform hidden md:flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowLeft className="w-6 h-6 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
      <SEO 
        title={post.seoTitle || post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.image}
        type="article"
      />

      {/* Mobile Social Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-border z-[60] flex items-center justify-around p-3 md:hidden">
        {['facebook', 'twitter', 'linkedin'].map((platform) => (
          <button 
            key={platform}
            onClick={() => handleShare(platform as any)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase text-text-secondary tracking-tighter">{platform}</span>
          </button>
        ))}
        <button 
          onClick={() => handleShare('copy')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${copied ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          </div>
          <span className="text-[10px] font-black uppercase text-text-secondary tracking-tighter">Copy</span>
        </button>
      </div>
      
      <header className="relative h-[50vh] min-h-[450px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
            <span className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-light" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-light" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-light" />
                {readingTime}
              </div>
            </div>

            {/* AI Audio Summary Player */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 group hover:bg-white/20 transition-all cursor-pointer"
              onClick={toggleAudio}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Listen to Audio Summary</span>
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  {isPlaying ? 'Now Playing AI Overview' : 'AI-Powered Research Summary'}
                  {isPlaying && <Volume2 className="w-3 h-3 animate-pulse text-primary-light" />}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 lg:py-16 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1">
            
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="mb-12 p-6 md:p-8 bg-bg-secondary rounded-3xl border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <LayoutGrid className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-black text-xl text-text-primary uppercase tracking-tight italic">Content <span className="text-primary italic">Guide</span></h3>
                </div>
                <nav className="space-y-4">
                  {toc.map((item, idx) => (
                    <a 
                      key={`${post.id}-toc-${item.id}-${idx}`} 
                      href={`#${item.id}`}
                      className={`block text-text-secondary hover:text-primary font-bold transition-all flex items-center gap-3 group ${item.level === 3 ? 'ml-6' : ''}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors shrink-0" />
                      <span className={`${item.level === 3 ? 'text-sm' : 'text-base'}`}>{item.text}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Summary Block */}
            {post.quickSummary && post.quickSummary.length > 0 && (
              <div className="mb-10 p-6 md:p-8 bg-primary/5 rounded-3xl border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-xl">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-text-primary">Quick Summary</h3>
                </div>
                <ul className="space-y-3">
                  {post.quickSummary.map((item, idx) => (
                    <li key={`${post.id}-summary-${idx}`} className="flex items-start gap-3 text-text-secondary font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Modalites Overview (New) */}
            {post.modalities && (
              <div className="mb-10 grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#991B1B]/5 border border-[#991B1B]/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-[#991B1B] dark:text-red-400">
                    <ThumbsDown size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Aggravation</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.modalities.worse.slice(0, 3).map((w, i) => (
                      <span key={i} className="text-xs font-bold text-text-primary bg-white/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded-md border border-black/5">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-[#166534]/5 border border-[#166534]/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-[#166534] dark:text-green-400">
                    <ThumbsUp size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Amelioration</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.modalities.better.slice(0, 3).map((b, i) => (
                      <span key={i} className="text-xs font-bold text-text-primary bg-white/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded-md border border-black/5">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <TextMindMap 
              title={post.title.split(':')[0]} 
              category={post.category} 
              symptoms={post.keyPatterns} 
              remedies={post.comparisons?.map(c => c.remedyName)}
              lifestyle={post.relatedCarePlans?.map(p => p.name)}
              research={post.citations}
            />

            <div className="markdown-body prose prose-lg md:prose-xl max-w-none dark:prose-invert">
              <p className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed mb-10">
                {highlightModalities(post.excerpt)}
              </p>
              
              <ReactMarkdown components={MarkdownComponents}>{post.content}</ReactMarkdown>
            </div>

            {/* Key Symptoms / Patterns */}
            {post.keyPatterns && post.keyPatterns.length > 0 && (
              <div className="my-12">
                <h3 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" /> Key Symptom Patterns
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.keyPatterns.map((pattern, idx) => {
                    const lower = pattern.toLowerCase();
                    let borderClass = 'border-border';
                    let pill: React.ReactNode = null;

                    if (lower.includes('worse') || lower.includes('aggravation')) {
                      borderClass = 'border-[#991B1B] dark:border-[#7F1D1D]';
                      pill = <ModalityPill type="worse" className="mb-2">Worse / Aggravation</ModalityPill>;
                    } else if (lower.includes('better') || lower.includes('amelioration')) {
                      borderClass = 'border-[#166534] dark:border-[#14532D]';
                      pill = <ModalityPill type="better" className="mb-2">Better / Amelioration</ModalityPill>;
                    } else if (lower.includes('ailments from') || lower.includes('trigger')) {
                      borderClass = 'border-[#854D0E] dark:border-[#713F12]';
                      pill = <ModalityPill type="ailment" className="mb-2">Ailments From</ModalityPill>;
                    }

                    return (
                      <div key={`${post.id}-pattern-${idx}`} className={`p-5 bg-bg-secondary rounded-2xl border-l-[6px] border border-y-border border-r-border flex flex-col items-start gap-1 transition-all ${borderClass}`}>
                        {pill}
                        <p className="text-text-secondary m-0 font-medium">
                          {highlightModalities(pattern)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Who It Suits & When To Consider */}
            {(post.whoItSuits || post.whenToConsider) && (
              <div className="my-12 p-8 bg-bg-secondary rounded-3xl border border-border">
                {post.whoItSuits && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" /> Who it may suit
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{post.whoItSuits}</p>
                  </div>
                )}
                {post.whenToConsider && post.whenToConsider.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" /> Commonly considered for
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.whenToConsider.map((condition, idx) => (
                        <span key={`${post.id}-consider-${idx}`} className="px-4 py-2 bg-bg-primary text-text-primary text-sm font-bold rounded-xl border border-border">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Modalities: Better / Worse */}
            {post.modalities && (
              <div className="my-12 grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-bg-secondary rounded-3xl border border-border">
                  <h4 className="flex items-center gap-2 text-[#991B1B] dark:text-[#FEE2E2] font-bold mb-4">
                    <ThumbsDown className="w-5 h-5" /> What makes it worse
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.modalities.worse.map((item, idx) => (
                      <ModalityPill key={`${post.id}-mworse-${idx}`} type="worse">
                        Worse from {item.toLowerCase()}
                      </ModalityPill>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-bg-secondary rounded-3xl border border-border">
                  <h4 className="flex items-center gap-2 text-[#166534] dark:text-[#DCFCE7] font-bold mb-4">
                    <ThumbsUp className="w-5 h-5" /> What makes it better
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.modalities.better.map((item, idx) => (
                      <ModalityPill key={`${post.id}-mbetter-${idx}`} type="better">
                        Better by {item.toLowerCase()}
                      </ModalityPill>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tool Integration (Middle of Post) */}
            <div className="my-12 p-8 bg-primary/10 rounded-[2rem] text-center border-2 border-primary/20">
              <div className="w-16 h-16 bg-bg-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                Deepen Your Knowledge
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Explore our full Research Database to understand how these clinical patterns are categorized in classical literature.
              </p>
              <Link to="/topics" className="inline-flex flex-wrap items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all w-full sm:w-auto">
                Explore Research Database
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Comparisons */}
            {post.comparisons && post.comparisons.length > 0 && (
              <div className="my-12">
                <h3 className="text-2xl font-display font-bold text-text-primary mb-6">Compare Remedies</h3>
                <div className="space-y-4">
                  {post.comparisons.map((comp, idx) => (
                    <div key={`${post.id}-comp-${idx}`} className="p-6 bg-bg-secondary rounded-2xl border border-border relative overflow-hidden group">
                      <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                        {post.title.split(':')[0]} vs {comp.remedyName}
                      </h4>
                      <p className="text-text-secondary relative z-10 leading-relaxed mb-4">
                        {comp.differences}
                      </p>
                      {comp.linkId && (
                        <Link 
                          to={comp.linkId} 
                          className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                        >
                          Read about {comp.remedyName} <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Health Guides */}
            {post.relatedCarePlans && post.relatedCarePlans.length > 0 && (
              <div className="my-12 p-8 bg-primary/5 rounded-3xl border border-primary/20">
                <h3 className="text-xl font-display font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-primary" /> Related Research Guides
                </h3>
                <p className="text-text-secondary mb-6">
                  Explore peer student research and traditional literature on managing these patterns.
                </p>
                <div className="flex flex-wrap gap-4">
                  {post.relatedCarePlans.map((plan, idx) => (
                    <Link 
                      key={`${post.id}-guide-${idx}`}
                      to={plan.linkId}
                      className="px-6 py-3 bg-white dark:bg-zinc-800 border-2 border-border hover:border-primary text-text-primary font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                      {plan.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer & Warnings */}
            <div className="my-12 space-y-4">
              <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1 italic text-base">Medical Emergency Notice</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    If you experience high fever, severe unyielding pain, difficulty breathing, or symptoms that rapidly worsen, please seek immediate medical attention at an emergency facility. Homoeopathy is not a substitute for emergency medicine.
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary font-bold text-center italic py-4">
                "Curiva is an educational repository curators by a BHMS student. This information is for academic awareness and must not be used for self-treatment."
              </p>
              <p className="text-xs text-text-secondary/60 text-center uppercase tracking-wider font-bold">
                Educational Disclaimer: Not a substitute for professional clinical advice.
              </p>
            </div>

            {/* Lead Capture */}
            <div className="my-16 p-8 md:p-10 bg-bg-secondary rounded-[2.5rem] border border-border text-center">
              <h3 className="text-2xl font-display font-bold text-text-primary mb-2">Want a simple guide to common remedies?</h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">Get our free cheat sheet for acute healing directly to your email.</p>
              {emailSubmitted ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-600 dark:text-green-400 font-bold rounded-xl">
                  <CheckCircle2 className="w-5 h-5" /> Sent! Check your inbox.
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input 
                    type="email" 
                    placeholder="Your best email" 
                    required 
                    value={emailCapture}
                    onChange={(e) => setEmailCapture(e.target.value)}
                    className="flex-1 px-5 py-4 bg-bg-primary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-full"
                  />
                  <button type="submit" className="px-6 py-4 bg-text-primary text-bg-primary font-bold rounded-xl hover:scale-105 transition-transform w-full sm:w-auto">
                    Get Guide
                  </button>
                </form>
              )}
            </div>

            {/* Citations Section */}
            {post.citations && post.citations.length > 0 && (
              <div className="my-12 p-8 bg-bg-secondary rounded-[2.5rem] border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h4 className="text-lg font-display font-black text-text-primary uppercase tracking-tighter">Academic Citations</h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.citations.map((cite, idx) => (
                    <a 
                      key={`${post.id}-cite-${idx}`}
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-bg-primary border border-border rounded-2xl hover:border-primary transition-all group"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">{cite.source}</span>
                        <span className="text-sm font-bold text-text-primary">{cite.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Related Research Connections (Bidirectional) */}
            {(post.relatedRemedies?.length || post.relatedConditions?.length) && (
              <div className="my-12 p-8 bg-bg-secondary rounded-[2.5rem] border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-white rounded-2xl text-primary shadow-soft">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-black text-xl text-text-primary uppercase tracking-tight italic">Research <span className="text-primary italic">Connections</span></h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {post.relatedRemedies && post.relatedRemedies.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Materia Medica Links</h4>
                      <div className="grid gap-2">
                        {post.relatedRemedies.map(remId => (
                          <Link 
                            key={remId} 
                            to={`/remedy/${remId}`}
                            className="p-4 bg-white dark:bg-zinc-800 border border-border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all flex items-center justify-between group"
                          >
                            <span className="font-bold text-text-primary group-hover:text-primary transition-colors capitalize">{remId.replace(/-/g, ' ')}</span>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.relatedConditions && post.relatedConditions.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60 ml-1">Clinical Pattern Links</h4>
                      <div className="grid gap-2">
                        {post.relatedConditions.map(condId => (
                          <Link 
                            key={condId} 
                            to={`/conditions/${condId}`}
                            className="p-4 bg-white dark:bg-zinc-800 border border-border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all flex items-center justify-between group"
                          >
                            <span className="font-bold text-text-primary group-hover:text-primary transition-colors capitalize">{condId.replace(/-/g, ' ')}</span>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-16 pt-12 border-t border-border">
              <RelatedArticles posts={relatedPosts} />
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-4 h-4 text-text-secondary opacity-50" />
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    onClick={() => onTagClick?.(tag)}
                    className="px-3 py-1 bg-bg-secondary text-text-secondary text-xs font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Final CTA */}
            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <Link
                to="/guidance"
                className="flex-1 p-6 bg-bg-secondary hover:bg-border transition-colors rounded-2xl flex items-center justify-between group text-left"
              >
                <div>
                  <h4 className="font-bold text-text-primary mb-1 italic">Suggest a correction</h4>
                  <p className="text-sm text-text-secondary">Help us improve this resource</p>
                </div>
                <MessageCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </Link>
              <Link to="/topics" className="flex-1 p-6 bg-primary text-white hover:bg-primary-light transition-colors rounded-2xl flex items-center justify-between group">
                <div>
                  <h4 className="font-bold mb-1 italic">Research Database</h4>
                  <p className="text-sm text-white/80">Browse and explore</p>
                </div>
                <Search className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

          </div>

          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="p-6 bg-bg-secondary rounded-3xl border border-border">
                {profile ? (
                  <button 
                    onClick={() => toggleBookmark(post.slug)}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      profile.bookmarks?.includes(post.slug)
                      ? 'bg-primary text-white shadow-xl shadow-primary/20'
                      : 'bg-bg-primary border border-border text-text-primary hover:border-primary hover:text-primary shadow-sm'
                    }`}
                  >
                    {profile.bookmarks?.includes(post.slug) ? (
                      <> <BookmarkCheck className="w-4 h-4" /> Saved to Library </>
                    ) : (
                      <> <BookmarkIcon className="w-4 h-4" /> Save to Library </>
                    )}
                  </button>
                ) : (
                  <Link 
                    to="/subscription"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-bg-primary border border-border text-text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm"
                  >
                    <BookmarkIcon className="w-4 h-4" /> Sign In to Save
                  </Link>
                )}
              </div>

              <div className="p-6 bg-bg-secondary rounded-3xl border border-border">
                <h4 className="font-display font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" /> Share
                </h4>
                <div className="flex gap-3">
                  {['facebook', 'twitter', 'linkedin'].map((platform) => (
                    <button 
                      key={platform}
                      onClick={() => handleShare(platform as any)}
                      className="w-10 h-10 rounded-xl bg-bg-primary border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm group cursor-pointer"
                    >
                      <span className="sr-only">{platform}</span>
                      <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </button>
                  ))}
                  <button 
                    onClick={() => handleShare('copy')}
                    className="w-10 h-10 rounded-xl bg-bg-primary border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all shadow-sm group relative cursor-pointer"
                  >
                    <span className="sr-only">Copy Link</span>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4 transition-transform group-hover:scale-110" />}
                  </button>
                </div>
              </div>

              {/* Sidebar can have other widgets here if needed in future */}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
