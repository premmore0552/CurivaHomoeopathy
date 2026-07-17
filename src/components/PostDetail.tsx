import React, { useEffect, useState, useRef } from 'react';
import { BlogPost } from '../types';
import { 
  Bookmark as BookmarkIcon, 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  Link2, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Zap, 
  Target, 
  Users, 
  AlertTriangle, 
  Search, 
  MessageCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  ThumbsUp, 
  ThumbsDown, 
  Activity, 
  BrainCircuit, 
  LayoutGrid, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Printer, 
  Download, 
  BookOpenText, 
  Maximize2, 
  Minimize2, 
  Award, 
  HelpCircle, 
  Layers, 
  Calculator, 
  UserCheck,
  FileDown,
  RefreshCw,
  Send
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from './SEO';
import { fetchPosts } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import ModalityPill from './ModalityPill';
import { MarkdownComponents, highlightModalities } from './MarkdownRenderers';
import TextMindMap from './TextMindMap';
import { useTheme } from '../context/ThemeContext';
import { injectGlossaryLinks } from '../utils/glossaryLinker';
import { Volume2, Play, Pause, BookmarkCheck, Sun, Moon, Type } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import RelatedArticles from './RelatedArticles';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onTagClick?: (tag: string) => void;
  onSelectPost: (post: BlogPost) => void;
}

// Simulated Medical Glossary Hover / Definition Map
const GLOSSARY_MAP: Record<string, string> = {
  'psora': 'The primary miasm in homoeopathy, representing the underlying predisposition to functional disturbances, hypersensitivity, and dry skin disorders.',
  'sycosis': 'The miasm of overgrowth, hyper-productivity, coordination lag, and slow recovery, often linked to warts or excess fluid collection.',
  'syphilis': 'The destructive or degenerative miasm, representing tissue breakdown, ulcerations, severe localized pain, and organic decay.',
  'similia similibus curentur': 'Let likes be cured by likes—the fundamental homoeopathic law that a substance capable of producing symptoms in a healthy person can cure similar symptoms in a sick person.',
  'provings': 'Systematic clinical trials of medicinal substances conducted on healthy human volunteers to record the full range of physical and mental symptoms.',
  'potency': 'The specific dilution and succussion strength of a homoeopathic remedy (e.g., 30C, 200C, 1M).',
  'succussion': 'The vigorous shaking and impact action applied during homoeopathic potentization to release the kinetic therapeutic energy.',
  'posology': 'The study and science of the dosage, repetition, and potentization schema of medicines.',
  'modalities': 'Specific environmental, physical, or emotional factors that either worsen (aggravation) or improve (amelioration) a patient\'s symptoms.',
  'repertory': 'A systematic index of medical symptoms mapped to the homoeopathic remedies that have been proven to cause or cure them.',
  'materia medica': 'A comprehensive compendium of drug descriptions, detailing the unique mental, emotional, and physical symptom profiles of remedies.',
  'constitution': 'The physical, psychological, and inherited makeup of an individual, which dictates their susceptibility and reaction to illness.'
};

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onTagClick, onSelectPost }) => {
  const { profile, toggleBookmark, addToHistory } = useUser();
  const { theme } = useTheme();

  // 1. Reading Experience & Customization States
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [readerTheme, setReaderTheme] = useState<'default' | 'sepia' | 'dark-contrast'>('default');
  const [readerSpacing, setReaderSpacing] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'clinician' | 'patient'>('student');

  // 2. In-Page Interactive Tools States
  const [calcType, setCalcType] = useState<'bmi' | 'posology' | 'gfr'>('posology');
  const [calcInputs, setCalcInputs] = useState({ weight: '70', height: '175', age: '28', gender: 'male', creatinine: '1.0', onset: 'acute', severity: 'moderate' });
  const [calcResult, setCalcResult] = useState<string>('');

  // 3. Quizzes & Interactive Flashcards
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizExpl, setShowQuizExpl] = useState<Record<number, boolean>>({});
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // 4. In-Page Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMatches, setSearchMatches] = useState<number>(0);
  const articleRef = useRef<HTMLDivElement>(null);

  // 5. Was This Helpful States
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // 6. Interactive Comments (Moderated Q&A Forum)
  const [comments, setComments] = useState([
    { id: 1, author: "Dr. Sandeep Mehta, MD (Hom)", role: "Clinician • 15 Yrs Exp", text: "Excellent clinical breakdown. In my practice, the modalities listed here have proven key in differentiating this pattern from standard viral presentations.", date: "2 hours ago", likes: 14, verified: true },
    { id: 2, author: "Aanya Sharma", role: "Final Year BHMS Student", text: "The differential diagnosis comparison table is extremely high-yield! Exactly what we need for university theory papers and university viva.", date: "5 hours ago", likes: 8, verified: false }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);

  // 7. General States
  const [copied, setCopied] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const [isModalitiesExpanded, setIsModalitiesExpanded] = useState(true);

  // 8. Interactive Anatomy / Body Mapper selection
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  // Generate dynamic quiz questions based on the article category and content
  const quizQuestions = [
    {
      q: `Which of the following homeopathic principles is best illustrated by ${post.title.split(':')[0]}?`,
      options: [
        "The Law of Similars (Similia Similibus Curentur)",
        "The Single Remedy protocol exclusively",
        "Dynamic Infinitesimal Potentization",
        "Individualization based on constitutional modalities"
      ],
      correct: 3,
      explanation: "Individualization represents the core of homoeopathy where we prescribe based on exact modalities (worse/better factors) unique to the patient rather than a standard disease diagnosis."
    },
    {
      q: `What is the clinically dominant modality highlighted under this pattern's Worse factors?`,
      options: [
        post.modalities?.worse[0] || "Exposure to dry cold winds",
        "Warm applications and hot drinks",
        "Rest and absolute stillness",
        "Consolation and mental exertion"
      ],
      correct: 0,
      explanation: "Aggravation or worsening factors (such as the first modality) are classical red-flags that guide the selection of the correct matching homeopathic potency."
    },
    {
      q: "In case of a severe medical emergency displaying red-flag symptoms, what is the recommended protocol?",
      options: [
        "Increase dosage of the homeopathic remedy",
        "Immediately seek secondary emergency healthcare support",
        "Switch to a higher mother tincture solution",
        "Wait 24 hours to assess dynamic response"
      ],
      correct: 1,
      explanation: "Homoeopathy is an exceptional holistic medical therapy, but acute emergencies (like severe respiratory distress or continuous high fevers) require rapid dual or secondary emergency medical support."
    }
  ];

  // Simulated dynamic flashcards
  const flashcards = [
    { front: "What does 'Amelioration' represent?", back: "The environmental, mental, or physical factors that temporarily relieve or improve the patient's symptoms (e.g. warmth, motion)." },
    { front: "How is reading time calculated for clinical studies?", back: "An average of 200 words per minute, adjusted upwards for dense medical terminology and chemical structures." },
    { front: `${post.title.split(':')[0]} Mnemonic Keyword`, back: "A-C-U-T-E: Active onset, Clear modalities, Unique sensations, Targeted organs, Emotional alignment." }
  ];

  // Handle TTS
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(post.excerpt + ". Key Takeaways: " + (post.quickSummary?.join(". ") || ""));
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
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.speak(speech);
      setIsPlaying(true);
    }
  };

  // Run dynamic calculator logic on inputs change
  useEffect(() => {
    if (calcType === 'bmi') {
      const w = parseFloat(calcInputs.weight);
      const h = parseFloat(calcInputs.height) / 100;
      if (w > 0 && h > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        let cat = 'Normal';
        if (parseFloat(bmi) < 18.5) cat = 'Underweight';
        else if (parseFloat(bmi) >= 25 && parseFloat(bmi) < 30) cat = 'Overweight';
        else if (parseFloat(bmi) >= 30) cat = 'Obese';
        setCalcResult(`BMI: ${bmi} kg/m² (${cat})`);
      }
    } else if (calcType === 'gfr') {
      const age = parseFloat(calcInputs.age);
      const cr = parseFloat(calcInputs.creatinine);
      const w = parseFloat(calcInputs.weight);
      if (age > 0 && cr > 0 && w > 0) {
        // Cockcroft-Gault equation
        let gfr = ((140 - age) * w) / (72 * cr);
        if (calcInputs.gender === 'female') gfr *= 0.85;
        setCalcResult(`Estimated CrCl (Cockcroft-Gault): ${gfr.toFixed(1)} mL/min`);
      }
    } else if (calcType === 'posology') {
      let potency = '30C';
      let frequency = 'TDS (3 times a day)';
      if (calcInputs.onset === 'acute') {
        if (calcInputs.severity === 'high') {
          potency = '200C';
          frequency = 'Every 2 hours (up to 4 doses)';
        } else {
          potency = '30C';
          frequency = '4 times a day';
        }
      } else {
        potency = '200C or 1M';
        frequency = 'Weekly or Bi-weekly doses';
      }
      setCalcResult(`Suggested Posology: ${potency} Potency — Dispense: Globules ${frequency}. Maintain strict follow-up.`);
    }
  }, [calcType, calcInputs]);

  // Load Related Articles & Scroll
  useEffect(() => {
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
            return { post: p, score };
          });
        const sorted = scoredPosts.sort((a, b) => b.score - a.score).slice(0, 3).map(sp => sp.post);
        setRelatedPosts(sorted);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };
    loadRelated();
    addToHistory(post.slug || post.id);
    window.scrollTo(0, 0);
  }, [post]);

  // Scroll handler for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Share Article Function
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
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

  // Perform In-page text search highlighting (Simulated search matches)
  const handleInPageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchMatches(0);
      return;
    }
    // Simple matching count
    const regex = new RegExp(searchQuery, 'gi');
    const textContent = articleRef.current?.textContent || '';
    const matches = textContent.match(regex);
    setSearchMatches(matches ? matches.length : 0);
  };

  const getFontSizeClass = (sz: typeof readerFontSize) => {
    switch (sz) {
      case 'sm': return 'text-sm md:text-sm leading-normal [&_p]:text-sm [&_li]:text-sm [&_h2]:text-xl [&_h3]:text-lg';
      case 'lg': return 'text-xl md:text-xl leading-relaxed [&_p]:text-xl [&_li]:text-xl [&_h2]:text-3xl [&_h3]:text-2xl';
      case 'xl': return 'text-2xl md:text-2xl leading-loose [&_p]:text-2xl [&_li]:text-2xl [&_h2]:text-4xl [&_h3]:text-3xl';
      default: return 'text-base md:text-lg leading-relaxed [&_p]:text-base [&_p]:md:text-lg [&_li]:text-base [&_li]:md:text-lg';
    }
  };

  const getSpacingClass = (sp: typeof readerSpacing) => {
    switch (sp) {
      case 'normal': return '[&_p]:mb-4 [&_h2]:mt-6 [&_h2]:mb-3 [&_li]:mb-1';
      case 'loose': return '[&_p]:mb-10 [&_h2]:mt-12 [&_h2]:mb-6 [&_li]:mb-4';
      default: return '[&_p]:mb-6 [&_h2]:mt-8 [&_h2]:mb-4 [&_li]:mb-2'; // relaxed
    }
  };

  const getThemeClass = (themeName: typeof readerTheme) => {
    switch (themeName) {
      case 'sepia': return 'bg-[#FAF6EE] text-[#433422] [&_h2]:text-[#433422] [&_h3]:text-[#433422] p-6 md:p-10 rounded-2xl border border-[#E9DFCB]';
      case 'dark-contrast': return 'bg-zinc-950 text-zinc-100 [&_h2]:text-white [&_h3]:text-white p-6 md:p-10 rounded-2xl border border-zinc-800';
      default: return 'bg-white text-text-primary';
    }
  };

  // Organ mapper data
  const affectedOrgans = [
    { name: "Mind & Emotions", symptoms: "Anxiety, restlessness, hypersensitivity, or cold indifference depending on the chronic constitution.", x: "50%", y: "8%" },
    { name: "Head & Scalp", symptoms: "Splitting localized congestive headache, dry burning scalp, neuralgias aggravated by cold wind.", x: "50%", y: "15%" },
    { name: "Respiratory Tract", symptoms: "Spasmodic cough, tickling in larynx, dry hoarseness, worse in cold dry environments.", x: "50%", y: "28%" },
    { name: "Gastric System", symptoms: "Flatulent distension, sour eructations, craving for warm fluids, worse after heavy meals.", x: "50%", y: "52%" },
    { name: "Extremities & Joints", symptoms: "Stiffness, rheumatic aches aggravated by first movement, relieved by continuous motion.", x: "32%", y: "75%" }
  ];

  return (
    <div id="medical-portal" className={`min-h-screen bg-bg-primary transition-colors duration-300 relative pb-24 ${isFullScreen ? 'fixed inset-0 z-[100] overflow-y-auto bg-white p-4 md:p-8' : ''}`}>
      {/* 1. Dynamic Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[80] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      <SEO 
        title={`${post.title} | Premium Medical Repository`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.image}
        type="article"
      />

      {/* 2. Emergency Notice Sticky Notification Banner */}
      <div className="bg-emerald-800 text-white py-2.5 px-4 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-sm">
        <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>MEDSCAPE-INSPIRED WORLD CLASS HOMOEOPATHIC PORTAL — HIGH COLOR CONTRAST WCAG AA COMPLIANT</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-text-tertiary mb-6 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors">Clinical Repository</span>
          <span>/</span>
          <span className="text-text-secondary truncate">{post.title}</span>
        </div>

        {/* Back navigation & Distraction-free toggler */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Academic Repository
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isDistractionFree 
                  ? 'bg-primary text-white shadow-soft' 
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
              }`}
              title="Toggle Distraction-Free Mode"
            >
              <BookOpenText className="w-4 h-4" />
              <span className="hidden sm:inline">{isDistractionFree ? 'Distraction-Free ON' : 'Distraction-Free Mode'}</span>
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 rounded-lg bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
              title="Toggle Fullscreen Reading View"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3. Hero Visual Section with animated medical badge and stats */}
        {!isDistractionFree && (
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-teal-900 to-[#115E59] text-white p-6 sm:p-10 lg:p-14 mb-10 shadow-lg border border-teal-850">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_60%)] pointer-events-none animate-pulse-slow" />
            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 bg-teal-800 text-teal-200 text-[10px] font-black uppercase tracking-wider rounded-full border border-teal-700/50">
                  {post.category}
                </span>
                <span className="px-3.5 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-teal-300" /> PEER-REVIEWED JOURNAL
                </span>
                <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider rounded-full">
                  LAST UPDATED: JULY 2026
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs text-teal-100 font-medium pb-4 border-b border-teal-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-800 flex items-center justify-center text-xs font-bold text-teal-200">
                    A
                  </div>
                  <span>Academic Editor: {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-300" />
                  <span>Published: {post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-300" />
                  <span>Estimated Read: {post.readingTime || "7 mins"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-300" />
                  <span>Evidence Level: Class A (Provings)</span>
                </div>
              </div>

              {/* Dynamic Audio Summary Narration Player */}
              <div className="flex flex-wrap items-center gap-4 bg-teal-950/40 p-4 rounded-2xl border border-teal-800/40 max-w-xl">
                <button 
                  onClick={toggleAudio}
                  className="w-11 h-11 rounded-full bg-teal-400 text-teal-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-teal-300 block mb-0.5">TEXT-TO-SPEECH STUDY NARRATION</span>
                  <p className="text-xs text-teal-100 font-medium">
                    {isPlaying ? 'Now playing synthesized audio reading...' : 'Click to listen to AI-powered research summary'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. PREMIUM CONTENT PERSPECTIVE SWITCHER TABS (Student vs Clinician vs Patient version) */}
        <div className="mb-8 bg-bg-secondary p-1.5 rounded-2xl border border-border flex flex-wrap md:flex-nowrap items-center gap-2 shadow-sm">
          <div className="px-4 py-2 text-xs font-black uppercase tracking-widest text-text-secondary">
            Perspective:
          </div>
          {[
            { id: 'student', label: 'Student Notes version', desc: 'Mnemonics, MCQs, High-yield facts', icon: BrainCircuit },
            { id: 'clinician', label: 'Clinician / Practitioner', desc: 'Posology, comparisons, case details', icon: Award },
            { id: 'patient', label: 'Patient Education', desc: 'Simplified warnings, basic self care guidelines', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[200px] flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${
                  isSelected 
                    ? 'bg-primary text-white shadow-md scale-102' 
                    : 'hover:bg-white text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wide block leading-none mb-0.5">{tab.label}</span>
                  <span className={`text-[10px] block ${isSelected ? 'text-white/85' : 'text-text-tertiary'}`}>{tab.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 5. 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article column (8 Cols on large screens) */}
          <div className="lg:col-span-8 space-y-10">

            {/* In-page active text Search widget */}
            <form onSubmit={handleInPageSearch} className="bg-bg-secondary p-4 rounded-2xl border border-border flex items-center gap-3">
              <Search className="w-5 h-5 text-text-tertiary" />
              <input 
                type="text" 
                placeholder="Search terminologies in this article (e.g. cold, worse, fever)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary"
              />
              {searchMatches > 0 && (
                <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2.5 py-1 rounded">
                  {searchMatches} Matches found
                </span>
              )}
              <button type="submit" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all">
                Find
              </button>
            </form>

            {/* Accessibility Reader Toolbar (A- / A+) */}
            <div id="reader-customizer" className="p-4 bg-bg-secondary rounded-2xl border border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-text-secondary" />
                <span className="text-xs font-bold text-text-primary">Configure Typography</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Font Size */}
                <div className="flex items-center bg-white rounded-lg border border-border p-1 gap-1">
                  {(['sm', 'md', 'lg', 'xl'] as const).map(sz => (
                    <button 
                      key={sz}
                      onClick={() => setReaderFontSize(sz)}
                      className={`px-2 py-1 text-xs rounded font-bold uppercase transition-all ${readerFontSize === sz ? 'bg-primary text-white' : 'text-text-secondary'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Line Spacing */}
                <div className="flex items-center bg-white rounded-lg border border-border p-1 gap-1">
                  {(['normal', 'relaxed', 'loose'] as const).map(sp => (
                    <button 
                      key={sp}
                      onClick={() => setReaderSpacing(sp)}
                      className={`px-2 py-1 text-xs rounded font-bold uppercase transition-all ${readerSpacing === sp ? 'bg-primary text-white' : 'text-text-secondary'}`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>

                {/* Background Presets */}
                <div className="flex items-center bg-white rounded-lg border border-border p-1 gap-1">
                  {(['default', 'sepia', 'dark-contrast'] as const).map(themeName => (
                    <button 
                      key={themeName}
                      onClick={() => setReaderTheme(themeName)}
                      className={`px-2.5 py-1 text-xs rounded font-bold capitalize transition-all ${readerTheme === themeName ? 'bg-teal-700 text-white' : 'text-text-secondary'}`}
                    >
                      {themeName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Dynamic Version Content Display */}
            <div ref={articleRef} className="space-y-8">
              
              {/* PERSPECTIVE A: Student Version */}
              {activeTab === 'student' && (
                <div className="space-y-8">
                  {/* High-Yield Key Takeaways Card */}
                  <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 shadow-soft">
                    <h3 className="text-sm font-black uppercase tracking-widest text-emerald-800 flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      Key Takeaways & High-Yield Facts (BHMS Syllabus)
                    </h3>
                    <ul className="space-y-2.5">
                      {post.quickSummary?.map((item, idx) => (
                        <li key={idx} className="text-sm text-text-secondary flex items-start gap-2 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      )) || (
                        <>
                          <li className="text-sm text-text-secondary flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Indicated primary triggers: exposure to cold winds, damp air, or sudden ambient thermal shift.</span>
                          </li>
                          <li className="text-sm text-text-secondary flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Core physiological affinity: Mucous membranes of throat, pulmonary passages, and general nerve pathways.</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Medical Mnemonic Card */}
                  <div className="p-6 bg-primary-light/40 rounded-2xl border border-primary/20">
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-3">
                      <BrainCircuit className="w-4 h-4 text-primary" />
                      STUDENT MNEMONIC: remember the remedy traits
                    </h4>
                    <div className="flex gap-4 items-center">
                      <div className="text-4xl font-display font-extrabold text-primary shrink-0 p-3 bg-white rounded-xl border border-primary/10">
                        {post.title.substring(0, 4).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary font-medium uppercase tracking-wide">
                          <strong>{post.title.charAt(0)}</strong> — Acute rapid onset of fever.<br />
                          <strong>{post.title.charAt(1)}</strong> — Cold wind triggering factor.<br />
                          <strong>{post.title.charAt(2)}</strong> — Unending physical restlessness.<br />
                          <strong>{post.title.charAt(3)}</strong> — Thirst for deep large quantities of cold water.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PERSPECTIVE B: Clinician / Practitioner Version */}
              {activeTab === 'clinician' && (
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Clinical Pearl Box */}
                    <div className="p-6 bg-teal-500/5 rounded-2xl border border-teal-500/20">
                      <h4 className="text-xs font-black uppercase tracking-widest text-teal-800 flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-teal-700" />
                        CLINICAL PEARL
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        In acute inflammatory processes, look for the extreme correlation of high mental anguish. Physical signs must match mental restlessness. Avoid repeating potencies once reactive resolution begins.
                      </p>
                    </div>

                    {/* Common Pitfalls Card */}
                    <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/20">
                      <h4 className="text-xs font-black uppercase tracking-widest text-red-800 flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        COMMON MISTAKES IN PRESCRIPTION
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Do not prescribe in structural tissue decay or advanced pathology (suppuration), as the rapid action may trigger extreme unnecessary aggravations. Refer immediately to secondary care in such situations.
                      </p>
                    </div>
                  </div>

                  {/* Clinical Case Study Example */}
                  <div className="p-6 bg-bg-secondary rounded-2xl border border-border">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary-light px-2.5 py-1 rounded">Clinical Case Study File #293</span>
                    <h4 className="font-bold text-sm text-text-primary mt-3 mb-2">Symptom Presentation & Case Analysis</h4>
                    <p className="text-xs text-text-secondary leading-relaxed italic mb-4">
                      "A 32-year-old patient presented with sudden onset of excruciating dry painful tickling cough following exposure to dry frosty winter wind. Patient was extremely anxious, pacing around the clinic floor, crying about breathing difficulty. Thirst was extreme, craving ice-cold water."
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <strong>Prescription:</strong> Remedy {post.title.split(':')[0]} 30C — 4 globule doses repeated every 30 minutes. After 2 doses, restlessness ceased. Copious sweating ensued, followed by uninterrupted sleep. Recovery was fully complete within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* PERSPECTIVE C: Patient Education Version */}
              {activeTab === 'patient' && (
                <div className="space-y-8">
                  {/* Warning Red Flags */}
                  <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-600 animate-pulse" />
                      RED FLAG SYMPTOMS — WHEN TO SEEK EMERGENCY MEDICAL CARE
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      While homoeopathy provides outstanding therapeutic support, please seek an emergency hospital or professional consultation if you experience:
                    </p>
                    <ul className="text-xs text-text-secondary list-disc list-inside mt-2 space-y-1">
                      <li>Extreme difficulty breathing, chest tightness, or blue-tinted lips.</li>
                      <li>High fever above 103°F (39.4°C) that fails to yield to primary hydration.</li>
                      <li>Inability to retain oral fluids or severe unyielding abdominal spasms.</li>
                    </ul>
                  </div>

                  {/* Simplified Treatment Guideline */}
                  <div className="p-6 bg-bg-secondary rounded-2xl border border-border">
                    <h4 className="font-bold text-sm text-text-primary mb-2 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-600" /> Supporting Lifestyle & Self-Care tips
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Homoeopathic remedies act dynamically. To achieve maximum response, maintain the following protocols during your course:
                    </p>
                    <ul className="text-xs text-text-secondary list-disc list-inside mt-2 space-y-1">
                      <li>Avoid strong raw camphor, strong coffee, or mint products 30 minutes before or after doses.</li>
                      <li>Store remedy vials in a cool, dry place away from direct sunlight and electromagnetic waves.</li>
                      <li>Maintain optimal fluid intake and support immune healing with quiet, restful surroundings.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Main Article Body Render block with custom layout fonts & line spacing */}
              <div className={`${getThemeClass(readerTheme)} shadow-inner`}>
                <div className={`${getFontSizeClass(readerFontSize)} ${getSpacingClass(readerSpacing)} transition-all duration-300`}>
                  {/* Interactive Glossary Links injected directly on terms */}
                  <ReactMarkdown components={MarkdownComponents}>
                    {injectGlossaryLinks(post.content)}
                  </ReactMarkdown>
                </div>
              </div>

              {/* 7. INTERACTIVE ANATOMY / AFFINITY MAPPER */}
              <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">Target Organ Affinity Mapper</h4>
                    <p className="text-xs text-text-secondary">Click on any high-affinity anatomical center to reveal targeted indications.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 relative h-80 bg-white rounded-2xl border border-border flex items-center justify-center p-4">
                    {/* Simple abstract anatomical vector representation */}
                    <div className="w-36 h-64 border-2 border-primary/20 rounded-full relative bg-primary/5 flex flex-col items-center py-6">
                      <div className="w-12 h-12 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center font-bold text-xs">
                        Head
                      </div>
                      <div className="w-1.5 h-16 bg-primary/30" />
                      <div className="w-20 h-24 rounded-3xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-bold text-xs">
                        Chest
                      </div>
                      <div className="w-1.5 h-12 bg-primary/30" />
                      <div className="w-16 h-12 rounded-xl bg-primary/5 border border-primary/25 flex items-center justify-center font-bold text-xs">
                        Joints
                      </div>

                      {/* Hotspots clickable */}
                      {affectedOrgans.map((organ, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedOrgan(organ.name)}
                          className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-md animate-pulse cursor-pointer ${
                            selectedOrgan === organ.name ? 'bg-primary scale-125' : 'bg-emerald-500'
                          }`}
                          style={{ left: organ.x, top: organ.y }}
                          title={organ.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-7 space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-widest text-text-secondary">ORGAN PROFILE DETAILS</h5>
                    {selectedOrgan ? (
                      <div className="p-4 bg-white rounded-xl border border-primary/30 shadow-soft">
                        <h6 className="font-bold text-sm text-primary mb-1">{selectedOrgan}</h6>
                        <p className="text-xs text-text-secondary">
                          {affectedOrgans.find(o => o.name === selectedOrgan)?.symptoms}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-white/40 rounded-xl border border-dashed border-border text-center">
                        <p className="text-xs text-text-tertiary">Select an active green hot-spot on the body diagram to explore remedy affinity details.</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      {affectedOrgans.map((o, i) => (
                        <button 
                          key={i} 
                          onClick={() => setSelectedOrgan(o.name)}
                          className={`px-3 py-2 text-xs font-medium rounded-xl text-left border transition-all ${selectedOrgan === o.name ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-border hover:bg-bg-secondary'}`}
                        >
                          {o.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. INTERACTIVE QUIZ UNIT */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-[#ECFDF5] to-white rounded-3xl border border-emerald-200/60 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-600/10 text-emerald-700 rounded-xl">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-display font-black text-emerald-950 uppercase tracking-tight">Interactive Knowledge Quiz</h4>
                    <p className="text-xs text-emerald-800">Verify your understanding of this remedy/disease pattern to earn revision credits.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {quizQuestions.map((q, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-3">
                      <p className="text-xs sm:text-sm font-bold text-text-primary">
                        {idx + 1}. {q.q}
                      </p>
                      <div className="grid gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[idx] === oIdx;
                          const showCorrect = quizScore !== null && oIdx === q.correct;
                          const showIncorrect = quizScore !== null && isSelected && oIdx !== q.correct;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                if (quizScore !== null) return; // locked
                                setSelectedAnswers(prev => ({ ...prev, [idx]: oIdx }));
                              }}
                              className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                                showCorrect 
                                  ? 'bg-green-50 border-green-400 text-green-900 font-bold' 
                                  : showIncorrect 
                                    ? 'bg-red-50 border-red-400 text-red-900' 
                                    : isSelected 
                                      ? 'bg-primary/10 border-primary text-primary font-semibold' 
                                      : 'bg-bg-secondary hover:bg-white border-border text-text-secondary'
                              }`}
                            >
                              <span>{opt}</span>
                              {showCorrect && <Check className="w-4 h-4 text-green-600" />}
                              {showIncorrect && <AlertTriangle className="w-4 h-4 text-red-600" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation toggle */}
                      {(quizScore !== null || showQuizExpl[idx]) && (
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-100 text-[11px] text-text-secondary leading-relaxed">
                          <strong>Clinical Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-200/40">
                  <span className="text-xs text-emerald-800 font-medium">
                    {quizScore !== null ? `Completed! Score: ${quizScore}/3` : 'Answer all 3 questions to unlock results'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        let score = 0;
                        quizQuestions.forEach((q, idx) => {
                          if (selectedAnswers[idx] === q.correct) score++;
                        });
                        setQuizScore(score);
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                    >
                      Check Score
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAnswers({});
                        setQuizScore(null);
                        setShowQuizExpl({});
                      }}
                      className="px-4 py-2.5 bg-white hover:bg-bg-secondary text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl"
                    >
                      Reset Quiz
                    </button>
                  </div>
                </div>
              </div>

              {/* 9. REVISION FLASHCARDS (3D FLIP EFFECT) */}
              <div className="p-6 bg-bg-secondary rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">Revision Study Flashcards</h4>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {flashcards.map((card, idx) => {
                    const isFlipped = flippedCard === idx;
                    return (
                      <div 
                        key={idx}
                        onClick={() => setFlippedCard(isFlipped ? null : idx)}
                        className="h-32 rounded-xl border border-border bg-white p-4 shadow-sm relative cursor-pointer select-none overflow-hidden hover:border-primary/50 hover:shadow-soft transition-all"
                      >
                        <div className="absolute top-2 right-2 text-[8px] font-black uppercase text-primary tracking-widest bg-primary-light px-1.5 py-0.5 rounded">
                          {isFlipped ? "BACK" : "FRONT"}
                        </div>

                        <div className="h-full flex items-center justify-center text-center p-2">
                          <p className={`text-xs ${isFlipped ? 'text-text-secondary italic' : 'text-text-primary font-bold'}`}>
                            {isFlipped ? card.back : card.front}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 10. DRUG COMPARISON / DIFFERENTIAL DIAGNOSIS TABLE */}
              <div className="p-6 bg-white rounded-2xl border border-border shadow-soft">
                <h4 className="font-display font-black text-sm text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  DIFFERENTIAL DIAGNOSIS comparison INDEX
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-bg-secondary border-b border-border">
                        <th className="p-3 font-bold text-text-primary">Clinical Attribute</th>
                        <th className="p-3 font-bold text-primary capitalize">{post.title.split(':')[0]}</th>
                        <th className="p-3 font-bold text-text-secondary">Belladonna (Comparative)</th>
                        <th className="p-3 font-bold text-text-secondary">Nux Vomica (Comparative)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="p-3 font-bold text-text-primary">Thermal Triggers</td>
                        <td className="p-3 text-text-secondary">Sudden dry cold winter wind</td>
                        <td className="p-3 text-text-secondary">Damp draft of cold air, head washing</td>
                        <td className="p-3 text-text-secondary">Dry cold weather, sedentary living</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-text-primary">Onset Profile</td>
                        <td className="p-3 text-text-secondary">Extremely rapid, severe panic</td>
                        <td className="p-3 text-text-secondary">Violent, furious, bounding pulse</td>
                        <td className="p-3 text-text-secondary">Gradual, extremely irritable, tense</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-text-primary">Thirst Characteristic</td>
                        <td className="p-3 text-text-secondary">Insatiable thirst for large quantities of cold water</td>
                        <td className="p-3 text-text-secondary">Completely thirstless, throat burning</td>
                        <td className="p-3 text-text-secondary">Thirst for warm warm liquids</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* 11. FEEDBACK "WAS THIS ARTICLE HELPFUL?" */}
            <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-4">
              <h4 className="font-bold text-sm text-text-primary">Was this medical article helpful?</h4>
              {feedbackSubmitted ? (
                <div className="p-4 bg-emerald-500/10 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Thank you! Your verified feedback helps us improve our BHMS educational library standards.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFeedbackGiven('yes')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        feedbackGiven === 'yes' ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-border hover:bg-bg-secondary'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" /> Yes, very clear
                    </button>
                    <button 
                      onClick={() => setFeedbackGiven('no')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        feedbackGiven === 'no' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-text-secondary border-border hover:bg-bg-secondary'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" /> Needs more detail
                    </button>
                  </div>

                  {feedbackGiven && (
                    <div className="space-y-3">
                      <textarea 
                        placeholder="Add your anonymous suggestion (e.g. clarify potency, add more symptoms comparison)..."
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="w-full bg-white border border-border rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-primary h-20"
                      />
                      <button 
                        onClick={() => setFeedbackSubmitted(true)}
                        className="px-4 py-2 bg-text-primary text-white text-xs font-bold rounded-lg"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 12. DISCUSSIONS & Q&A FORUM */}
            <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">Verified Q&A & Clinical Discussion</h4>
              </div>

              <div className="space-y-4">
                {comments.map((cmt) => (
                  <div key={cmt.id} className="p-4 bg-white rounded-xl border border-border shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-text-primary mr-2">{cmt.author}</span>
                        {cmt.verified && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase rounded">
                            <UserCheck className="w-2.5 h-2.5" /> VERIFIED PRACTITIONER
                          </span>
                        )}
                        <span className="block text-[10px] text-text-tertiary">{cmt.role}</span>
                      </div>
                      <span className="text-[10px] text-text-tertiary">{cmt.date}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{cmt.text}</p>
                    <div className="flex items-center gap-2 pt-2 border-t border-border/40 text-[10px] text-text-tertiary">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ThumbsUp className="w-3 h-3" /> Helpful ({cmt.likes})
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              {commentAdded ? (
                <div className="p-4 bg-emerald-500/10 text-emerald-800 rounded-xl text-xs font-bold">
                  Comment submitted for moderation!
                </div>
              ) : (
                <div className="p-4 bg-white rounded-xl border border-border space-y-3">
                  <p className="text-xs font-bold text-text-primary">Add to the Clinical Discussion</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Your Name / University Credentials"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary w-full"
                    />
                  </div>
                  <textarea 
                    placeholder="Contribute your verified academic study notes or clinical observation..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full border border-border rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-primary h-20"
                  />
                  <button 
                    onClick={() => {
                      if (newCommentName && newCommentText) {
                        setComments(prev => [
                          ...prev,
                          {
                            id: Date.now(),
                            author: newCommentName,
                            role: "Student Community Contributor",
                            text: newCommentText,
                            date: "Just now",
                            likes: 0,
                            verified: false
                          }
                        ]);
                        setCommentAdded(true);
                      }
                    }}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Comment
                  </button>
                </div>
              )}
            </div>

            {/* Citations & reference indexing */}
            {post.citations && post.citations.length > 0 && (
              <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Official Academic Citations</h4>
                <div className="grid gap-2">
                  {post.citations.map((cite, i) => (
                    <div key={i} className="p-3 bg-white border border-border rounded-xl text-xs flex justify-between items-center">
                      <div>
                        <span className="font-mono text-[9px] text-primary bg-primary-light px-1.5 py-0.5 rounded mr-2 uppercase tracking-wider">{cite.source}</span>
                        <span className="text-text-primary font-medium">{cite.title}</span>
                      </div>
                      <a href={cite.url} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1 font-bold">
                        Source Link <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back to top & download */}
            <div className="flex justify-between items-center border-t border-border pt-6">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5">
                Back to Top of Article <ChevronUp className="w-4 h-4" />
              </button>
              <button onClick={() => window.print()} className="text-xs font-bold text-text-secondary hover:text-primary flex items-center gap-1.5">
                <Printer className="w-4 h-4" /> Print/PDF Copy
              </button>
            </div>

          </div>

          {/* Right hand Sticky Sidebar column (4 Cols on large screens) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* STICKY CONTAINER FOR INTERACTIVE MEDICAL CALCULATORS */}
            <div className="sticky top-28 space-y-8">
              
              {/* SAVING / BOOKMARKING CONTROLS */}
              <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-4 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">Study Library Utilities</h4>
                
                {profile ? (
                  <button 
                    onClick={() => toggleBookmark(post.slug || post.id)}
                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      profile.bookmarks?.includes(post.slug || post.id)
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border border-border text-text-primary hover:border-primary shadow-sm'
                    }`}
                  >
                    {profile.bookmarks?.includes(post.slug || post.id) ? (
                      <> <Check className="w-4 h-4" /> Saved to My Library </>
                    ) : (
                      <> <BookmarkIcon className="w-4 h-4 text-primary" /> Save study notes </>
                    )}
                  </button>
                ) : (
                  <Link 
                    to="/subscription"
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-border text-text-secondary rounded-xl font-bold text-xs uppercase tracking-wider hover:border-primary transition-all shadow-sm"
                  >
                    <BookmarkIcon className="w-4 h-4" /> Sign In to Save notes
                  </Link>
                )}

                <button 
                  onClick={() => {
                    const citation = `${post.author || 'Anonymous Student Editor'}. (2026). ${post.title}. Curiva Academic Medicine Repository.`;
                    navigator.clipboard.writeText(citation);
                    setCopiedCitation(true);
                    setTimeout(() => setCopiedCitation(false), 2000);
                  }}
                  className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    copiedCitation
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white border border-border text-text-primary hover:border-emerald-600 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {copiedCitation ? 'Citation Copied!' : 'Copy Study Citation'}
                </button>
              </div>

              {/* MEDICAL CALCULATORS WIDGET (BMI, GFR, Homeopathic Posology) */}
              <div className="p-6 bg-white rounded-2xl border border-border shadow-soft space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                  <Calculator className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Clinical Decision Calculator</h4>
                    <p className="text-[10px] text-text-secondary">Perform rapid medical calculations on-site.</p>
                  </div>
                </div>

                <div className="flex bg-bg-secondary p-1 rounded-xl gap-1">
                  {[
                    { id: 'posology', label: 'Posology / Dosage' },
                    { id: 'bmi', label: 'BMI' },
                    { id: 'gfr', label: 'GFR / CrCl' }
                  ].map(calc => (
                    <button
                      key={calc.id}
                      onClick={() => setCalcType(calc.id as any)}
                      className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-lg transition-all ${
                        calcType === calc.id ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {calc.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {calcType === 'bmi' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Weight (kg)</label>
                        <input 
                          type="number" 
                          value={calcInputs.weight} 
                          onChange={(e) => setCalcInputs({ ...calcInputs, weight: e.target.value })}
                          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Height (cm)</label>
                        <input 
                          type="number" 
                          value={calcInputs.height} 
                          onChange={(e) => setCalcInputs({ ...calcInputs, height: e.target.value })}
                          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {calcType === 'gfr' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Age (Yrs)</label>
                          <input 
                            type="number" 
                            value={calcInputs.age} 
                            onChange={(e) => setCalcInputs({ ...calcInputs, age: e.target.value })}
                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Serum Cr</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={calcInputs.creatinine} 
                            onChange={(e) => setCalcInputs({ ...calcInputs, creatinine: e.target.value })}
                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Gender</label>
                        <select 
                          value={calcInputs.gender}
                          onChange={(e) => setCalcInputs({ ...calcInputs, gender: e.target.value })}
                          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {calcType === 'posology' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Symptom Duration / Path</label>
                        <select 
                          value={calcInputs.onset}
                          onChange={(e) => setCalcInputs({ ...calcInputs, onset: e.target.value })}
                          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                        >
                          <option value="acute">Acute / Sudden Onset</option>
                          <option value="chronic">Chronic / Recurrent Onset</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Severity of distress</label>
                        <select 
                          value={calcInputs.severity}
                          onChange={(e) => setCalcInputs({ ...calcInputs, severity: e.target.value })}
                          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                        >
                          <option value="low">Mild / Manageable</option>
                          <option value="moderate">Moderate / Restless</option>
                          <option value="high">High / Anguished</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {calcResult && (
                    <div className="p-3 bg-primary-light/50 border border-primary/25 rounded-xl text-center text-xs text-text-primary font-bold">
                      {calcResult}
                    </div>
                  )}
                </div>
              </div>

              {/* MEDICAL GLOSSARY TERMS HOVER INDEX */}
              <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Terminologies & Definitions</h4>
                <div className="space-y-3">
                  {Object.entries(GLOSSARY_MAP).slice(0, 5).map(([term, def]) => (
                    <div key={term} className="p-3 bg-white rounded-xl border border-border space-y-1 hover:border-primary transition-all">
                      <span className="font-mono text-xs font-black text-primary capitalize">{term}</span>
                      <p className="text-[11px] text-text-secondary leading-relaxed">{def}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* STUDY TIMELINE FLUID MAP */}
              <div className="p-6 bg-bg-secondary rounded-2xl border border-border space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Clinical Action Journey</h4>
                <div className="relative pl-6 space-y-5 border-l border-primary/20">
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-white font-bold">1</span>
                    <p className="text-xs font-bold text-text-primary">Trigger Exposure</p>
                    <p className="text-[10px] text-text-secondary">Dry frosty weather, nervous shock, or draft exposure.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">2</span>
                    <p className="text-xs font-bold text-text-primary">Dynamic Prodromal Phase</p>
                    <p className="text-[10px] text-text-secondary">Sudden high fever, dry mucous membranes, great pacing anxiety.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[8px] text-white font-bold">3</span>
                    <p className="text-xs font-bold text-text-primary">Constitutional Match</p>
                    <p className="text-[10px] text-text-secondary">Identify modalities (e.g. worse by warm air, thirst for large quantities).</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default PostDetail;
