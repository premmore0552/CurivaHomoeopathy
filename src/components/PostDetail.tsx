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
  Send,
  GitCommit,
  Flame,
  FileText,
  BookmarkCheck,
  Volume2,
  Play,
  Pause,
  Sun,
  Moon,
  Type,
  Star
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from './SEO';
import { fetchPosts } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import ModalityPill from './ModalityPill';
import { MarkdownComponents } from './MarkdownRenderers';
import { useTheme } from '../context/ThemeContext';
import { injectGlossaryLinks } from '../utils/glossaryLinker';
import { useUser } from '../hooks/useUser';
import RelatedArticles from './RelatedArticles';
import RelatedContent from './RelatedContent';
import ShareButton from './ShareButton';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onTagClick?: (tag: string) => void;
  onSelectPost: (post: BlogPost) => void;
}

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

// 4-Level Information Architecture Resolver
const getFourNavigationLevels = (post: BlogPost) => {
  let subject = "Medical Library";
  let topic = "General Wellness";
  let subtopic = post.title.split(':')[0].trim();

  if (post.category === "Materia Medica") {
    subject = "Learn";
    topic = "Materia Medica";
  } else if (post.category === "Diseases and Conditions") {
    subject = "Disease Library";
    topic = "Clinical Therapeutics";
  } else if (post.category === "BHMS Course") {
    subject = "Student Academy";
    topic = "Course Curriculum";
  } else if (post.category === "Research and Evidence") {
    subject = "Research Library";
    topic = "Clinical Research";
  } else if (post.category === "Lifestyle and Natural Healing") {
    subject = "Medical Library";
    topic = "Lifestyle Guides";
  }

  return { subject, topic, subtopic };
};

// Get connected nodes for Knowledge Graph based on Post ID or category
const getConnectedNodes = (post: BlogPost) => {
  if (post.category === "Materia Medica") {
    return [
      { id: "stramonium", label: "Stramonium", desc: "Symptom comparison concordance remedy", type: "remedy" },
      { id: "hyoscyamus", label: "Hyoscyamus", desc: "Delirium differential remedy", type: "remedy" },
      { id: "fever", label: "Acute Fever", desc: "Common clinical indication", type: "disease" },
      { id: "congestion", label: "Congestion", desc: "Pathological mechanism", type: "concept" },
      { id: "psora", label: "Psora Miasm", desc: "Underlying chronic root", type: "miasm" },
      { id: "kent-rubrics", label: "Kent Rubrics", desc: "Repertorization index keys", type: "concept" },
      { id: "flashcards", label: "MM Flashcards", desc: "Exam preparation module", type: "study" },
      { id: "pyqs", label: "Board PYQs", desc: "BHMS syllabus questions", type: "study" }
    ];
  } else if (post.category === "Diseases and Conditions") {
    return [
      { id: "miasm", label: "Chronic Miasms", desc: "Deeper constitutional root matching", type: "miasm" },
      { id: "remedy-finder", label: "Remedy Finder", desc: "Match patient modalities", type: "concept" },
      { id: "anatomy", label: "Anatomy links", desc: "Physiological tissues affected", type: "concept" },
      { id: "clinical-cases", label: "Clinical Cases", desc: "Verified practitioner cure logs", type: "study" },
      { id: "references", label: "Textbook Citations", desc: "Classical BHMS authorities", type: "reference" },
      { id: "diagnostic-chart", label: "Diagnostic Chart", desc: "Clinical flow sheets", type: "concept" }
    ];
  } else {
    return [
      { id: "anatomy-atlas", label: "Anatomy Atlas", desc: "Visual spatial structures", type: "concept" },
      { id: "viva-prep", label: "Viva Board Prep", desc: "High frequency examiner questions", type: "study" },
      { id: "physiology", label: "Physiology Link", desc: "Patho-physiological triggers", type: "concept" },
      { id: "materia-medica", label: "Materia Medica", desc: "Corresponding remedy systems", type: "remedy" },
      { id: "cheat-sheet", label: "MM Cheat Sheet", desc: "Syllabus revision notes", type: "study" }
    ];
  }
};

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, onTagClick, onSelectPost }) => {
  const { profile, toggleBookmark, addToHistory } = useUser();
  const { theme } = useTheme();

  // Reading settings
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [readerTheme, setReaderTheme] = useState<'default' | 'sepia' | 'dark-contrast'>('default');
  const [readerSpacing, setReaderSpacing] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Dynamic template active tab
  const getInitialTab = () => {
    if (post.category === "Materia Medica") return "overview";
    if (post.category === "Diseases and Conditions") return "overview";
    if (post.category === "BHMS Course") return "overview";
    return "overview";
  };
  const [activeSubTab, setActiveSubTab] = useState<string>(getInitialTab());

  // Interactive states
  const [calcType, setCalcType] = useState<'bmi' | 'posology' | 'gfr'>('posology');
  const [calcInputs, setCalcInputs] = useState({ weight: '70', height: '175', age: '28', gender: 'male', creatinine: '1.0', onset: 'acute', severity: 'moderate' });
  const [calcResult, setCalcResult] = useState<string>('');

  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizExpl, setShowQuizExpl] = useState<Record<number, boolean>>({});
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchMatches, setSearchMatches] = useState<number>(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [comments, setComments] = useState([
    { id: 1, author: "Dr. Sandeep Mehta, MD (Hom)", role: "Clinician • 15 Yrs Exp", text: "Excellent clinical breakdown. In my practice, the modalities listed here have proven key in differentiating this pattern from standard viral presentations.", date: "2 hours ago", likes: 14, verified: true },
    { id: 2, author: "Aanya Sharma", role: "Final Year BHMS Student", text: "The differential diagnosis comparison table is extremely high-yield! Exactly what we need for university theory papers and university viva.", date: "5 hours ago", likes: 8, verified: false }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);

  const [copied, setCopied] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<any>(null);

  // Nav metadata
  const navLevels = getFourNavigationLevels(post);
  const connectedNodes = getConnectedNodes(post);

  // Dynamic template subtopics based on Category
  const getSubtopicTabs = () => {
    if (post.category === "Materia Medica") {
      return [
        { id: "overview", label: "Overview" },
        { id: "keynotes", label: "Keynotes" },
        { id: "mind", label: "Mind & Generals" },
        { id: "particulars", label: "Particulars" },
        { id: "modalities", label: "Modalities" },
        { id: "relationships", label: "Relationships" },
        { id: "pearls", label: "Clinical Pearls" },
        { id: "revision", label: "Revision & Board PYQs" }
      ];
    }
    if (post.category === "Diseases and Conditions") {
      return [
        { id: "overview", label: "Overview" },
        { id: "symptoms", label: "Symptoms" },
        { id: "causes", label: "Causes & Miasms" },
        { id: "diagnosis", label: "Diagnosis & Investigations" },
        { id: "complications", label: "Complications" },
        { id: "lifestyle", label: "Lifestyle & Self-Care" },
        { id: "Homoeopathy", label: "Homoeopathic Perspective" },
        { id: "references", label: "References" }
      ];
    }
    if (post.category === "BHMS Course") {
      return [
        { id: "overview", label: "Overview" },
        { id: "anatomy_core", label: "Gross Anatomy" },
        { id: "blood_nerve", label: "Blood & Nerve Supply" },
        { id: "embryology", label: "Embryology & Histology" },
        { id: "clinical_anatomy", label: "Clinical Correlations" },
        { id: "viva", label: "Viva Questions" },
        { id: "revision", label: "Revision Prep" }
      ];
    }
    return [
      { id: "overview", label: "Overview" },
      { id: "keynotes", label: "High Yield Summary" },
      { id: "pearls", label: "Practical Applications" },
      { id: "revision", label: "Interactive Review" }
    ];
  };

  const tabs = getSubtopicTabs();

  // Simulated quiz questions
  const quizQuestions = [
    {
      q: `Which of the following Homoeopathic principles is best illustrated by ${post.title.split(':')[0]}?`,
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
        post.modalities?.worse?.[0] || "Exposure to dry cold winds",
        "Warm applications and hot drinks",
        "Rest and absolute stillness",
        "Consolation and mental exertion"
      ],
      correct: 0,
      explanation: "Aggravation or worsening factors (such as the first modality) are classical indicators that guide the selection of the correct matching Homoeopathic potency."
    },
    {
      q: "In case of a severe medical emergency displaying red-flag symptoms, what is the recommended protocol?",
      options: [
        "Increase dosage of the Homoeopathic remedy",
        "Immediately seek secondary emergency healthcare support",
        "Switch to a higher mother tincture solution",
        "Wait 24 hours to assess dynamic response"
      ],
      correct: 1,
      explanation: "Homoeopathy is an exceptional holistic medical therapy, but acute emergencies (like severe respiratory distress or continuous high fevers) require rapid dual or secondary emergency medical support."
    }
  ];

  // Flashcards
  const flashcards = [
    { front: "What does 'Amelioration' represent?", back: "The environmental, mental, or physical factors that temporarily relieve or improve the patient's symptoms (e.g. warmth, motion)." },
    { front: "How is reading time calculated for clinical studies?", back: "An average of 200 words per minute, adjusted upwards for dense medical terminology and chemical structures." },
    { front: `${post.title.split(':')[0]} Mnemonic Keyword`, back: "A-C-U-T-E: Active onset, Clear modalities, Unique sensations, Targeted organs, Emotional alignment." }
  ];

  // Text-To-Speech Setup
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

  // Calculators logic
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

  // Load Related Articles
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

  // Scroll Progress
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

  const handleInPageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchMatches(0);
      return;
    }
    const regex = new RegExp(searchQuery, 'gi');
    const textContent = articleRef.current?.textContent || '';
    const matches = textContent.match(regex);
    setSearchMatches(matches ? matches.length : 0);
  };

  const getFontSizeClass = (sz: typeof readerFontSize) => {
    switch (sz) {
      case 'sm': return 'text-sm leading-normal [&_p]:text-sm [&_li]:text-sm [&_h2]:text-xl [&_h3]:text-lg';
      case 'lg': return 'text-xl leading-relaxed [&_p]:text-xl [&_li]:text-xl [&_h2]:text-3xl [&_h3]:text-2xl';
      case 'xl': return 'text-2xl leading-loose [&_p]:text-2xl [&_li]:text-2xl [&_h2]:text-4xl [&_h3]:text-3xl';
      default: return 'text-base md:text-lg leading-relaxed [&_p]:text-base [&_p]:md:text-lg [&_li]:text-base [&_li]:md:text-lg';
    }
  };

  const getSpacingClass = (sp: typeof readerSpacing) => {
    switch (sp) {
      case 'normal': return '[&_p]:mb-4 [&_h2]:mt-6 [&_h2]:mb-3 [&_li]:mb-1';
      case 'loose': return '[&_p]:mb-10 [&_h2]:mt-12 [&_h2]:mb-6 [&_li]:mb-4';
      default: return '[&_p]:mb-6 [&_h2]:mt-8 [&_h2]:mb-4 [&_li]:mb-2';
    }
  };

  const getThemeClass = (themeName: typeof readerTheme) => {
    switch (themeName) {
      case 'sepia': return 'bg-[#FAF6EE] text-[#433422] [&_h2]:text-[#433422] [&_h3]:text-[#433422] p-6 md:p-10 rounded-2xl border border-[#E9DFCB]';
      case 'dark-contrast': return 'bg-zinc-950 text-zinc-100 [&_h2]:text-white [&_h3]:text-white p-6 md:p-10 rounded-2xl border border-zinc-800';
      default: return 'bg-white text-text-primary p-6 md:p-10 rounded-2xl border border-border';
    }
  };

  const affectedOrgans = [
    { name: "Mind & Emotions", symptoms: "Anxiety, restlessness, hypersensitivity, or cold indifference depending on the chronic constitution.", x: "50%", y: "8%" },
    { name: "Head & Scalp", symptoms: "Splitting localized congestive headache, dry burning scalp, neuralgias aggravated by cold wind.", x: "50%", y: "15%" },
    { name: "Respiratory Tract", symptoms: "Spasmodic cough, tickling in larynx, dry hoarseness, worse in cold dry environments.", x: "50%", y: "28%" },
    { name: "Gastric System", symptoms: "Flatulent distension, sour eructations, craving for warm fluids, worse after heavy meals.", x: "50%", y: "52%" },
    { name: "Extremities & Joints", symptoms: "Stiffness, rheumatic aches aggravated by first movement, relieved by continuous motion.", x: "32%", y: "75%" }
  ];

  const handleQuizAnswer = (questionIdx: number, optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIdx]: optionIdx });
    setShowQuizExpl({ ...showQuizExpl, [questionIdx]: true });
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    const item = {
      id: Date.now(),
      author: newCommentName,
      role: "Medical Student / Practitioner",
      text: newCommentText,
      date: "Just now",
      likes: 0,
      verified: false
    };
    setComments([item, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
    setCommentAdded(true);
    setTimeout(() => setCommentAdded(false), 3000);
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
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

  return (
    <div id="medical-portal" className={`min-h-screen bg-bg-primary transition-colors duration-300 relative pb-24 ${isFullScreen ? 'fixed inset-0 z-[100] overflow-y-auto bg-white p-4 md:p-8' : ''}`}>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-[80] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      <SEO 
        title={`${post.title} | Curiva Medical Publisher`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.image}
        type="article"
      />

      {/* Publisher Banner */}
      <div className="bg-[#115E59] text-[#CCFBF1] py-3 px-4 text-center text-xs font-bold tracking-wider flex items-center justify-center gap-2.5 shadow-sm border-b border-teal-800">
        <span className="inline-flex w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
        <span className="font-sans uppercase tracking-[0.08em]">CURIVA MEDICAL REFERENCE LIBRARY • ACADEMIC SYLLABUS DIRECTORY</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Dynamic 4-Level Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-text-tertiary mb-6 bg-bg-secondary p-3.5 rounded-2xl border border-border/80 font-medium shadow-sm">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1 font-bold">
            Home
          </Link>
          <span className="text-border">/</span>
          <span className="text-text-secondary font-semibold">{navLevels.subject}</span>
          <span className="text-border">/</span>
          <span className="text-text-secondary font-semibold">{navLevels.topic}</span>
          <span className="text-border">/</span>
          <span className="text-primary font-black tracking-tight">{navLevels.subtopic}</span>
          <span className="text-border">/</span>
          <span className="text-text-primary font-black uppercase tracking-widest text-[9px] bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md">
            {tabs.find(t => t.id === activeSubTab)?.label || "Overview"}
          </span>
        </nav>

        {/* Back and Distraction Controls */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-black text-text-secondary hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-primary" />
            Return to Medical Library
          </button>

          <div className="flex items-center gap-3">
            <ShareButton 
              title={post.title} 
              text={post.excerpt} 
              variant="outline" 
              label="Share" 
            />

            <button
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                isDistractionFree 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
              }`}
              title="Toggle Distraction-Free Mode"
            >
              <BookOpenText className="w-4 h-4" />
              <span>{isDistractionFree ? 'Distraction-Free ON' : 'Distraction-Free Mode'}</span>
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-xl bg-bg-secondary text-text-secondary hover:text-text-primary border border-border transition-colors"
              title="Toggle Fullscreen Reading View"
            >
              {isFullScreen ? <Minimize2 className="w-4.5 h-4.5" /> : <Maximize2 className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Hero Area */}
        {!isDistractionFree && (
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-teal-950 via-[#0D534D] to-teal-900 text-white p-6 sm:p-10 lg:p-14 mb-10 shadow-lg border border-teal-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 bg-teal-850 text-teal-200 text-[10px] font-black uppercase tracking-wider rounded-lg border border-teal-700/50">
                  {post.category}
                </span>
                <span className="px-3.5 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 border border-white/5">
                  <Award className="w-3.5 h-3.5 text-teal-300" /> PEER-REVIEWED MEDICAL RECORD
                </span>
                <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider rounded-lg">
                  Curiva Certified Academic Reference
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs text-teal-100 font-medium pb-4 border-b border-teal-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-800 flex items-center justify-center text-xs font-black text-teal-200 border border-teal-700">
                    {post.author.charAt(0)}
                  </div>
                  <span>Academic Editor: {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-300" />
                  <span>Published: {post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-300" />
                  <span>Estimated Study Unit: {post.readingTime || "7 mins"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-300" />
                  <span>Evidence level: BHMS High-Yield Core</span>
                </div>
              </div>

              {/* TTS Audio Player */}
              <div className="flex flex-wrap items-center gap-4 bg-teal-950/40 p-4 rounded-2xl border border-teal-800/40 max-w-xl">
                <button 
                  onClick={toggleAudio}
                  className="w-11 h-11 rounded-xl bg-teal-400 text-teal-950 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5 font-bold" /> : <Play className="w-5 h-5 ml-0.5 font-bold" />}
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

        {/* Dynamic Textbook Tabs Sub-Navigation */}
        <div className="mb-8 bg-bg-secondary p-1.5 rounded-2xl border border-border/80 flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x shadow-sm">
          {tabs.map((tab) => {
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id);
                  if (articleRef.current) {
                    articleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 shrink-0 snap-start border-none ${
                  isSelected 
                    ? 'bg-primary text-white shadow-md shadow-primary/10' 
                    : 'text-text-secondary hover:text-primary hover:bg-white'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article column (8 Cols) */}
          <div className="lg:col-span-8 space-y-10" ref={articleRef}>

            {/* "What You'll Learn" Mini-Course Card at Top */}
            {activeSubTab === "overview" && (
              <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/20 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-wider text-xs">
                  <BookOpen className="w-4.5 h-4.5 text-accent" />
                  <span>📚 What you'll learn in this knowledge unit</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="flex items-center gap-2.5 text-xs text-text-secondary font-bold">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">✔</span>
                    <span>Anatomical / Systemic Core Affinities</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-secondary font-bold">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">✔</span>
                    <span>Primary Susceptibilities & Keynotes</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-secondary font-bold">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">✔</span>
                    <span>Ameliorating and Aggravating Modalities</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-secondary font-bold">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">✔</span>
                    <span>Concordant Drug Relationships</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-secondary font-bold">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">✔</span>
                    <span>Clinical Prescribing Pearl Indicators</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-secondary font-bold">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">✔</span>
                    <span>University Board PYQs & Examiner Viva questions</span>
                  </div>
                </div>
              </div>
            )}

            {/* In-page active text Search */}
            <form onSubmit={handleInPageSearch} className="bg-bg-secondary p-4 rounded-2xl border border-border/80 flex items-center gap-3">
              <Search className="w-4.5 h-4.5 text-text-tertiary" />
              <input 
                type="text" 
                placeholder="Search medical terms or modalities in this unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xs text-text-primary"
              />
              {searchMatches > 0 && (
                <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2.5 py-1 rounded-lg">
                  {searchMatches} Matches
                </span>
              )}
              <button type="submit" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all border-none">
                Find
              </button>
            </form>

            {/* Typography control */}
            {!isDistractionFree && (
              <div id="reader-customizer" className="p-4 bg-bg-secondary rounded-2xl border border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Type className="w-4.5 h-4.5 text-text-secondary" />
                  <span className="text-xs font-black uppercase text-text-primary tracking-wide">Configure Reader Display</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center bg-white rounded-xl border border-border p-1 gap-1">
                    {(['sm', 'md', 'lg', 'xl'] as const).map(sz => (
                      <button 
                        key={sz}
                        onClick={() => setReaderFontSize(sz)}
                        className={`px-2.5 py-1.5 text-[10px] rounded-lg font-black uppercase transition-all border-none cursor-pointer ${readerFontSize === sz ? 'bg-primary text-white' : 'text-text-secondary bg-transparent'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center bg-white rounded-xl border border-border p-1 gap-1">
                    {(['normal', 'relaxed', 'loose'] as const).map(sp => (
                      <button 
                        key={sp}
                        onClick={() => setReaderSpacing(sp)}
                        className={`px-2.5 py-1.5 text-[10px] rounded-lg font-black uppercase transition-all border-none cursor-pointer ${readerSpacing === sp ? 'bg-primary text-white' : 'text-text-secondary bg-transparent'}`}
                      >
                        {sp}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center bg-white rounded-xl border border-border p-1 gap-1">
                    {(['default', 'sepia', 'dark-contrast'] as const).map(themeName => (
                      <button 
                        key={themeName}
                        onClick={() => setReaderTheme(themeName)}
                        className={`px-2.5 py-1.5 text-[10px] rounded-lg font-black capitalize transition-all border-none cursor-pointer ${readerTheme === themeName ? 'bg-teal-700 text-white' : 'text-text-secondary bg-transparent'}`}
                      >
                        {themeName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content Container based on Active Sub-Tab */}
            <div className="space-y-8">

              {/* OVERVIEW SUB-TAB */}
              {activeSubTab === "overview" && (
                <div className="space-y-8">
                  {/* Knowledge Block: Quick Summary */}
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-3xl border border-emerald-500/20 shadow-sm space-y-3">
                    <h3 className="text-sm font-black uppercase tracking-widest text-emerald-800 flex items-center gap-2">
                      <span className="text-xl">📌</span> Quick Summary & Diagnostic Outline
                    </h3>
                    <ul className="space-y-2">
                      {post.quickSummary?.map((item, idx) => (
                        <li key={idx} className="text-xs text-text-secondary flex items-start gap-2.5 font-bold">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      )) || (
                        <li className="text-xs text-text-secondary flex items-start gap-2.5">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Indicated primary triggers: sudden environmental thermal shifts, stress, or dry winds.</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Core Markdown Content Block */}
                  <div className={getThemeClass(readerTheme)}>
                    <div className={`${getFontSizeClass(readerFontSize)} ${getSpacingClass(readerSpacing)} transition-all duration-300`}>
                      <ReactMarkdown components={MarkdownComponents}>
                        {injectGlossaryLinks(post.content)}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Organ Affinity Map */}
                  <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border/80 space-y-6">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="text-sm font-black text-text-primary uppercase tracking-wider">Anatomical Target Affinity Mapper</h4>
                        <p className="text-xs text-text-secondary">Click on any target organ system to display clinical symptoms.</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-5 relative h-80 bg-white rounded-2xl border border-border flex items-center justify-center p-4">
                        <div className="w-36 h-64 border-2 border-primary/20 rounded-[2rem] relative bg-primary/5 flex flex-col items-center py-6">
                          <div className="w-12 h-12 rounded-xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
                            Head
                          </div>
                          <div className="w-1 h-14 bg-primary/30" />
                          <div className="w-20 h-24 rounded-[1.5rem] bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                            Chest
                          </div>
                          <div className="w-1 h-10 bg-primary/30" />
                          <div className="w-16 h-10 rounded-xl bg-primary/5 border border-primary/25 flex items-center justify-center font-bold text-xs text-primary">
                            Joints
                          </div>

                          {affectedOrgans.map((organ, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedOrgan(organ.name)}
                              className={`absolute w-4.5 h-4.5 rounded-full border-2 border-white shadow-md animate-pulse cursor-pointer border-none ${
                                selectedOrgan === organ.name ? 'bg-primary scale-125' : 'bg-emerald-500'
                              }`}
                              style={{ left: organ.x, top: organ.y }}
                              title={organ.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="sm:col-span-7 space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Selected Target Profile</h5>
                        {selectedOrgan ? (
                          <div className="p-4 bg-white rounded-xl border border-primary/30 shadow-sm">
                            <h6 className="font-black text-xs text-primary uppercase mb-1">{selectedOrgan}</h6>
                            <p className="text-xs text-text-secondary font-medium leading-relaxed">
                              {affectedOrgans.find(o => o.name === selectedOrgan)?.symptoms}
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-white/40 rounded-xl border border-dashed border-border text-center">
                            <p className="text-xs text-text-tertiary">Click an active green beacon on the diagram to inspect target affinities.</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          {affectedOrgans.map((o, i) => (
                            <button 
                              key={i} 
                              onClick={() => setSelectedOrgan(o.name)}
                              className={`px-3 py-2.5 text-xs font-bold rounded-xl text-left border transition-all cursor-pointer ${selectedOrgan === o.name ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-border hover:bg-bg-secondary'}`}
                            >
                              {o.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* KEYNOTES SUB-TAB (Materia Medica) */}
              {activeSubTab === "keynotes" && (
                <div className="space-y-6">
                  {/* Knowledge Block: High Yield */}
                  <div className="p-6 bg-indigo-50/40 rounded-[2rem] border border-indigo-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 text-indigo-800 font-black uppercase tracking-widest text-xs">
                      <Star className="w-5 h-5 text-accent animate-pulse" />
                      <span>⭐ High-Yield Core Keynotes (Allen's / Boericke)</span>
                    </div>
                    <div className="space-y-3">
                      {post.quickSummary?.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-indigo-100 shadow-xs">
                          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0">{idx+1}</span>
                          <p className="text-xs text-text-secondary leading-relaxed font-bold">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Student Mnemonic Card */}
                  <div className="p-6 bg-teal-500/5 rounded-3xl border border-teal-500/20 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-teal-800 flex items-center gap-2">
                      <BrainCircuit className="w-4.5 h-4.5" />
                      Academic Student Mnemonic
                    </h4>
                    <div className="flex gap-4 items-center">
                      <div className="text-3xl font-display font-black text-teal-700 shrink-0 p-4 bg-white rounded-xl border border-teal-500/20">
                        {post.title.substring(0, 4).toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">
                          <strong>{post.title.charAt(0)}</strong> — Active prompt physiological response<br />
                          <strong>{post.title.charAt(1)}</strong> — Clear aggravate/ameliorate parameters<br />
                          <strong>{post.title.charAt(2)}</strong> — Unique constitutional susceptibility<br />
                          <strong>{post.title.charAt(3)}</strong> — Thermal triggers (Dry Cold winds)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MIND & GENERALS (Materia Medica) */}
              {activeSubTab === "mind" && (
                <div className="space-y-6">
                  {/* Knowledge Block: Definition */}
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-border space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">📖 Constitution Profile & Definition</span>
                    <h3 className="text-lg font-bold text-text-primary">Mental State & Personality Affinities</h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-semibold bg-white p-4 rounded-xl border border-border">
                      {post.whoItSuits || "Commonly indicated for individuals of highly excitable, nervous, and sensitive temperaments, easily triggered by environmental stressors, thunderstorms, or cold drafts."}
                    </p>
                  </div>

                  <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Generals & Systemic Symptoms</h4>
                    <div className="grid gap-3">
                      {post.keyPatterns?.map((item, idx) => (
                        <div key={idx} className="flex gap-2.5 items-center p-3.5 bg-white rounded-xl border border-border">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-xs text-text-secondary font-bold">{item}</span>
                        </div>
                      )) || (
                        <p className="text-xs text-text-tertiary">No additional systemic patterns compiled for this record.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* PARTICULARS (Materia Medica) */}
              {activeSubTab === "particulars" && (
                <div className="space-y-6">
                  <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Clinical Particulars (Regional Symptomatology)</h4>
                    <div className="space-y-3">
                      {post.whenToConsider?.map((item, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-xl border border-border space-y-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 border border-primary/20 px-2.5 py-0.5 rounded-md">Condition Indicator {idx+1}</span>
                          <p className="text-xs text-text-primary font-bold">{item}</p>
                        </div>
                      )) || (
                        <p className="text-xs text-text-tertiary">No regional indicators configured.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* MODALITIES SUB-TAB (Materia Medica) */}
              {activeSubTab === "modalities" && (
                <div className="space-y-6">
                  {/* Knowledge Block: Important */}
                  <div className="p-6 bg-amber-50/40 border border-amber-300 rounded-[2rem] space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-600 animate-pulse" />
                      ⚠ Red-Line Aggravations & Modalities
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-bold">
                      Modalities are the core of Homoeopathic differential diagnosis. A remedy is only indicated when the patient's aggravating (worse) and ameliorating (better) factors precisely align.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Aggravation (Worse) */}
                    <div className="p-6 bg-red-500/5 rounded-3xl border border-red-200 space-y-4">
                      <span className="px-3 py-1 bg-red-500/10 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-red-500/20">Worse Factors (Aggravation)</span>
                      <ul className="space-y-2.5">
                        {post.modalities?.worse.map((item, idx) => (
                          <li key={idx} className="text-xs text-text-secondary flex items-start gap-2.5 font-bold">
                            <span className="text-red-500 mt-0.5">✖</span>
                            <span>{item}</span>
                          </li>
                        )) || (
                          <li className="text-xs text-text-tertiary">No aggravation factors recorded.</li>
                        )}
                      </ul>
                    </div>

                    {/* Amelioration (Better) */}
                    <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-200 space-y-4">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20">Better Factors (Amelioration)</span>
                      <ul className="space-y-2.5">
                        {post.modalities?.better.map((item, idx) => (
                          <li key={idx} className="text-xs text-text-secondary flex items-start gap-2.5 font-bold">
                            <span className="text-emerald-500 mt-0.5">✔</span>
                            <span>{item}</span>
                          </li>
                        )) || (
                          <li className="text-xs text-text-tertiary">No amelioration factors recorded.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* RELATIONSHIPS SUB-TAB (Materia Medica) */}
              {activeSubTab === "relationships" && (
                <div className="space-y-6">
                  <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Remedy Relationship & Discordances</h4>
                    <div className="space-y-4">
                      {post.comparisons?.map((comp, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-xl border border-border space-y-2">
                          <h5 className="text-xs font-black text-primary uppercase">Compare with {comp.remedyName}</h5>
                          <p className="text-xs text-text-secondary leading-relaxed font-medium">{comp.differences}</p>
                        </div>
                      )) || (
                        <p className="text-xs text-text-tertiary">No drug relationships established for this remedy.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* CLINICAL PEARLS */}
              {activeSubTab === "pearls" && (
                <div className="space-y-6">
                  {/* Knowledge Block: Clinical Pearl */}
                  <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-[2rem] border border-amber-200 shadow-sm space-y-3">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-800 text-[10px] font-black uppercase tracking-wider rounded-lg border border-amber-500/20">💡 Clinical Pearl & Prescribing Secret</span>
                    <p className="text-xs text-text-secondary leading-relaxed font-bold">
                      "In severe congestive headaches with intense throbbing of carotid arteries, Belladonna is highly indicated. Look for hot head but icy-cold hands and feet. This heat differential is the key note signature."
                    </p>
                  </div>

                  {/* Clinician Version cards */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-teal-500/5 rounded-3xl border border-teal-500/20">
                      <h4 className="text-xs font-black uppercase tracking-widest text-teal-800 flex items-center gap-2 mb-2">
                        <Award className="w-4.5 h-4.5 text-teal-700" />
                        CLINICAL INSIGHT
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        Always assess physical restlessness. Restless pacing is the signature of Aconite or Arsenic, whereas absolute quietude is Bryonia. These small modalities separate success from failure.
                      </p>
                    </div>

                    <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/20">
                      <h4 className="text-xs font-black uppercase tracking-widest text-red-800 flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
                        CONTRAINDICATIONS
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        Do not prescribe high potencies repetitively in organic pathology or structural decay. Dynamic reactions may deplete vital force unnecessarily.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* REVISION & BOARD PYQs */}
              {activeSubTab === "revision" && (
                <div className="space-y-8">
                  {/* Knowledge Block: Exam Tip */}
                  <div className="p-6 bg-violet-500/5 rounded-[2rem] border border-violet-500/20 space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-violet-800 flex items-center gap-2">
                      <span className="text-xl">🎓</span> University Board Exam Tip
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-bold">
                      This topic frequently appears in first-year BHMS Materia Medica papers and final-year Clinical Therapeutics. Focus heavily on the comparative modalities with sister remedies.
                    </p>
                  </div>

                  {/* Interactive Board Quiz */}
                  <div className="p-6 bg-white rounded-[2rem] border border-border shadow-sm space-y-6">
                    <div className="flex items-center gap-2 pb-3 border-b border-border">
                      <BrainCircuit className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="text-sm font-black text-text-primary uppercase tracking-wide">Interactive Board Practice Quiz</h4>
                        <p className="text-xs text-text-secondary">Answer these syllabus-aligned multiple choice questions for rapid recall.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {quizQuestions.map((q, qIdx) => (
                        <div key={qIdx} className="space-y-3">
                          <p className="text-xs font-bold text-text-primary">{qIdx+1}. {q.q}</p>
                          <div className="grid gap-2">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedAnswers[qIdx] === oIdx;
                              const isCorrect = q.correct === oIdx;
                              const showExpl = showQuizExpl[qIdx];
                              
                              let btnClass = "bg-bg-secondary hover:bg-border text-text-secondary";
                              if (showExpl) {
                                if (isCorrect) btnClass = "bg-emerald-500/10 border-emerald-500 text-emerald-700";
                                else if (isSelected) btnClass = "bg-red-500/10 border-red-500 text-red-700";
                              } else if (isSelected) {
                                btnClass = "bg-primary text-white";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                  disabled={showExpl}
                                  className={`px-4 py-3 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {showQuizExpl[qIdx] && (
                            <p className="text-[11px] text-text-secondary bg-primary-light/30 p-3 rounded-xl leading-relaxed font-semibold">
                              💡 {q.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive flashcard deck inside main body */}
                  <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Flippable Flashcard Deck</h4>
                    <div className="flex flex-col items-center gap-4">
                      <div 
                        onClick={() => setFlippedCard(flippedCard === activeFlashcardIndex ? null : activeFlashcardIndex)}
                        className={`w-full max-w-md h-44 cursor-pointer relative preserve-3d transition-all duration-500 ${flippedCard === activeFlashcardIndex ? 'rotate-y-180' : ''}`}
                      >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border border-border p-6 flex flex-col justify-between shadow-sm">
                          <span className="text-[9px] font-black uppercase text-primary tracking-widest">Question card {activeFlashcardIndex+1}/3</span>
                          <p className="text-center text-xs font-bold text-text-primary">{flashcards[activeFlashcardIndex].front}</p>
                          <span className="text-[9px] text-center text-text-tertiary">Click card to reveal answer</span>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary/5 rounded-2xl border border-primary p-6 flex flex-col justify-between shadow-sm">
                          <span className="text-[9px] font-black uppercase text-primary tracking-widest">Verified Answer Key</span>
                          <p className="text-xs text-text-secondary font-semibold leading-relaxed">{flashcards[activeFlashcardIndex].back}</p>
                          <span className="text-[9px] text-center text-primary font-black">Click card to flip back</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {flashcards.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveFlashcardIndex(idx);
                              setFlippedCard(null);
                            }}
                            className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer ${activeFlashcardIndex === idx ? 'bg-primary' : 'bg-border'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DISEASE LIBRARY / OTHER DYNAMIC SUB-TABS */}
              {post.category === "Diseases and Conditions" && activeSubTab !== "overview" && (
                <div className="space-y-6">
                  {activeSubTab === "symptoms" && (
                    <div className="p-6 bg-white rounded-[2rem] border border-border space-y-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">Clinical Presentation</span>
                      <p className="text-xs text-text-secondary leading-relaxed font-bold">
                        Primary physical indicators and subjective feelings reported by patients suffering from this condition.
                      </p>
                      <ul className="space-y-2.5">
                        {post.quickSummary?.map((item, idx) => (
                          <li key={idx} className="text-xs text-text-secondary flex items-start gap-2.5 font-semibold">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeSubTab === "causes" && (
                    <div className="p-6 bg-white rounded-[2rem] border border-border space-y-4">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Biological Triggers & Miasmatic Base</span>
                      <p className="text-xs text-text-secondary leading-relaxed font-bold">
                        Pathological vectors combined with the constitutional predisposition (chronic miasm) that triggers the acute phase.
                      </p>
                      <div className="grid gap-3">
                        <div className="p-4 bg-bg-secondary rounded-xl border border-border space-y-1">
                          <span className="font-mono text-[10px] font-black text-primary">Psora Affinity</span>
                          <p className="text-[11px] text-text-secondary leading-relaxed">Functional spasming, hypersensitivity responses, and nerve signaling irritation.</p>
                        </div>
                        <div className="p-4 bg-bg-secondary rounded-xl border border-border space-y-1">
                          <span className="font-mono text-[10px] font-black text-primary">Trigger Patterns</span>
                          <p className="text-[11px] text-text-secondary leading-relaxed">Weather draft changes, dietary excesses, emotional over-exertion, lack of sleep.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSubTab === "diagnosis" && (
                    <div className="p-6 bg-white rounded-[2rem] border border-border space-y-4">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Diagnostic Protocol</span>
                      <div className="relative pl-6 space-y-5 border-l border-primary/25">
                        <div className="relative">
                          <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-white font-bold">1</span>
                          <p className="text-xs font-bold text-text-primary">Clinical Exam</p>
                          <p className="text-[10px] text-text-secondary">Inspection of vitals, local organ signs, and subjective pain triggers.</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold">2</span>
                          <p className="text-xs font-bold text-text-primary">Laboratory Investigations</p>
                          <p className="text-[10px] text-text-secondary">Complete Blood Count (CBC) analysis, imaging when indicated (X-ray, MRI, ultrasound).</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSubTab === "complications" && (
                    <div className="p-6 bg-red-500/5 rounded-[2rem] border border-red-200 space-y-4">
                      <span className="px-3 py-1 bg-red-500/10 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Potential Complications</span>
                      <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                        Untreated or poorly managed cases can deteriorate, causing tissue degeneration or organ failure.
                      </p>
                    </div>
                  )}

                  {activeSubTab === "lifestyle" && (
                    <div className="p-6 bg-white rounded-[2rem] border border-border space-y-4">
                      <span className="px-3 py-1 bg-teal-500/10 text-teal-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Self-Care & Regimen Guidelines</span>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-bg-secondary rounded-xl border border-border space-y-1">
                          <p className="text-xs font-bold text-text-primary">Hydration & Nutrition</p>
                          <p className="text-[10px] text-text-secondary leading-relaxed">Warm fluids, easily digestible food, avoidance of processed triggers.</p>
                        </div>
                        <div className="p-4 bg-bg-secondary rounded-xl border border-border space-y-1">
                          <p className="text-xs font-bold text-text-primary">Rest Cycle</p>
                          <p className="text-[10px] text-text-secondary leading-relaxed">Quiet darkened room, optimal spine alignment, minimal sensory stimulation.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSubTab === "Homoeopathy" && (
                    <div className="p-6 bg-white rounded-[2rem] border border-border space-y-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">Homoeopathic Perspective</span>
                      <div className="space-y-3">
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">
                          We do not treat the disease; we treat the patient. The therapeutic guidelines focus heavily on constitutional and modality matching.
                        </p>
                        <div className="p-4 bg-primary-light/30 rounded-xl border border-primary/20">
                          <p className="text-xs font-bold text-text-primary">Differential Concordant Remedies</p>
                          <p className="text-[10px] text-text-secondary mt-1">Aconitum (sudden fright onset), Belladonna (throbbing heat), Gelsemium (sluggish dullness).</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSubTab === "references" && (
                    <div className="p-6 bg-white rounded-[2rem] border border-border space-y-4">
                      <span className="px-3 py-1 bg-violet-500/10 text-violet-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Authoritative Literature References</span>
                      <ul className="space-y-3 text-xs text-text-secondary font-medium italic">
                        <li>1. Hahnemann, S. (1833). Organon of Medicine (5th Edition).</li>
                        <li>2. Boericke, W. (1927). Pocket Manual of Homoeopathic Materia Medica.</li>
                        <li>3. Harrison's Principles of Internal Medicine (21st Edition).</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Knowledge Graph visual representation */}
            {!isDistractionFree && (
              <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border/85 space-y-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-wide">Connected Knowledge Graph</h4>
                    <p className="text-xs text-text-secondary">Explore semantic relations between this unit and adjacent study nodes.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.03)_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />
                  
                  {/* Central Node representing the post */}
                  <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-primary text-white border-4 border-white shadow-md flex items-center justify-center text-center p-2">
                    <span className="text-xs font-black uppercase tracking-tight leading-tight">{navLevels.subtopic}</span>
                  </div>

                  {/* Connectors & Surrounding nodes */}
                  <div className="relative z-10 w-full mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {connectedNodes.map((node) => {
                      const isSelected = selectedGraphNode?.id === node.id;
                      return (
                        <div 
                          key={node.id}
                          onClick={() => setSelectedGraphNode(isSelected ? null : node)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                            isSelected 
                              ? 'bg-primary/10 border-primary shadow-soft scale-102' 
                              : 'bg-bg-secondary border-border hover:border-primary/50'
                          }`}
                        >
                          <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${
                            node.type === 'remedy' ? 'text-primary' : node.type === 'disease' ? 'text-red-500' : 'text-text-tertiary'
                          }`}>
                            {node.type}
                          </span>
                          <span className="text-xs font-bold text-text-primary block">{node.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Node explanation drawer */}
                  <AnimatePresence>
                    {selectedGraphNode && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="w-full mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl relative z-10"
                      >
                        <h5 className="text-xs font-black text-primary uppercase tracking-wide mb-1">Graph Link: {selectedGraphNode.label}</h5>
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">{selectedGraphNode.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Continue Learning Course block at bottom */}
            <div className="p-8 bg-gradient-to-br from-teal-900 to-teal-950 text-white rounded-[2rem] shadow-lg border border-teal-850 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest">CONTINUE YOUR LEARNING JOURNEY</span>
                <h4 className="text-2xl font-display font-black tracking-tight">Expand Your Clinical Reasoning</h4>
                <p className="text-xs text-teal-100 font-medium leading-relaxed max-w-xl">
                  Do not stop here. Compare modalities, test your clinical knowledge on the practice board, or review related drug cases.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button 
                  onClick={onBack}
                  className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all active:scale-98 cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-[9px] font-black text-teal-300 uppercase tracking-wider block mb-1">Next Curriculum Unit</span>
                  <p className="text-xs font-bold text-white mb-2">Compare with sister remedy Stramonium</p>
                  <span className="text-[10px] text-teal-300 font-black flex items-center gap-1.5 uppercase tracking-wider">
                    Study Concordance <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <button 
                  onClick={onBack}
                  className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all active:scale-98 cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-[9px] font-black text-teal-300 uppercase tracking-wider block mb-1">Differential study</span>
                  <p className="text-xs font-bold text-white mb-2">Read Hyoscyamus Albus Delirium state</p>
                  <span className="text-[10px] text-teal-300 font-black flex items-center gap-1.5 uppercase tracking-wider">
                    Study Differential <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-teal-800/60">
                <div className="flex gap-4">
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-transparent border-none cursor-pointer">
                    Back to top of page
                  </button>
                  <button onClick={() => window.print()} className="text-[10px] font-black text-teal-300 uppercase tracking-widest bg-transparent border-none cursor-pointer flex items-center gap-1">
                    <Printer className="w-3.5 h-3.5" /> Download PDF study guide
                  </button>
                </div>
              </div>
            </div>

            {/* Comments & Discussion Portal */}
            {!isDistractionFree && (
              <div className="p-6 bg-white rounded-[2rem] border border-border shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-wide">Academic Discussion Board</h4>
                    <p className="text-xs text-text-secondary">Post questions, clarify clinical patterns, or discuss questions with peers.</p>
                  </div>
                </div>

                {/* Comment box */}
                <form onSubmit={handlePostComment} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Your Name / Credential (e.g., Dr. Ajay, BHMS)" 
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-xs outline-none"
                    />
                  </div>
                  <textarea 
                    rows={3}
                    placeholder="Ask an academic question or share practitioner observations on modalities..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full bg-bg-secondary border border-border rounded-xl px-4 py-2.5 text-xs outline-none resize-none"
                  />
                  <div className="flex justify-between items-center">
                    {commentAdded && (
                      <span className="text-[10px] font-bold text-emerald-600">Observation posted successfully! Pending moderator audit.</span>
                    )}
                    <button type="submit" className="px-5 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-primary-dark cursor-pointer border-none flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" /> Post Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comm) => (
                    <div key={comm.id} className="p-4 bg-bg-secondary rounded-xl border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-text-primary">{comm.author}</span>
                          {comm.verified && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[8px] text-emerald-600 border border-emerald-500/20 font-black">VERIFIED DR</span>
                          )}
                        </div>
                        <span className="text-[10px] text-text-tertiary">{comm.date}</span>
                      </div>
                      <span className="text-[9px] text-text-tertiary block leading-none">{comm.role}</span>
                      <p className="text-xs text-text-secondary leading-relaxed font-semibold">{comm.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Was This Helpful Form */}
            <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border text-center space-y-4">
              <h4 className="text-xs font-black text-text-primary uppercase tracking-wide">Was this study unit helpful?</h4>
              {!feedbackSubmitted ? (
                <div className="space-y-3">
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => setFeedbackGiven('yes')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${feedbackGiven === 'yes' ? 'bg-primary text-white' : 'bg-white text-text-primary'}`}
                    >
                      👍 Yes, extremely high yield
                    </button>
                    <button 
                      onClick={() => setFeedbackGiven('no')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${feedbackGiven === 'no' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-text-primary'}`}
                    >
                      👎 Needs more illustrations
                    </button>
                  </div>
                  {feedbackGiven && (
                    <div className="max-w-md mx-auto space-y-2">
                      <input 
                        type="text" 
                        placeholder="Any advice for our editorial board? (optional)"
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="w-full bg-white border border-border rounded-xl px-3 py-2 text-xs outline-none"
                      />
                      <button 
                        onClick={() => setFeedbackSubmitted(true)}
                        className="px-4 py-2 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-lg cursor-pointer border-none"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs font-bold text-emerald-600">Thank you! Your feedback has been logged to our publisher board.</p>
              )}
            </div>

            {/* Dynamically generated Related Content list to prevent orphan pages */}
            <RelatedContent 
              currentId={post.id}
              currentTags={post.tags}
              currentRemedies={post.relatedRemedies}
              currentCategory={post.category}
            />

          </div>

          {/* Right hand Sticky Academic Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              {/* Study Library Utility */}
              <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border/80 space-y-4 shadow-sm">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">Academic Study Desk</h4>
                
                {profile ? (
                  <button 
                    onClick={() => toggleBookmark(post.slug || post.id)}
                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none ${
                      profile.bookmarks?.includes(post.slug || post.id)
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border border-border text-text-primary hover:border-primary shadow-xs'
                    }`}
                  >
                    {profile.bookmarks?.includes(post.slug || post.id) ? (
                      <> <Check className="w-4 h-4 font-bold" /> Saved in My Library </>
                    ) : (
                      <> <BookmarkIcon className="w-4 h-4 text-primary" /> Save study notes </>
                    )}
                  </button>
                ) : (
                  <Link 
                    to="/subscription"
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-border text-text-secondary rounded-xl font-bold text-xs uppercase tracking-wider hover:border-primary transition-all shadow-xs"
                  >
                    <BookmarkIcon className="w-4 h-4 text-primary" /> Sign in to save notes
                  </Link>
                )}

                <button 
                  onClick={() => {
                    const citation = `${post.author || 'Curiva Academic Board'}. (2026). ${post.title}. Curiva Homoeopathic Medical Reference Publisher.`;
                    navigator.clipboard.writeText(citation);
                    setCopiedCitation(true);
                    setTimeout(() => setCopiedCitation(false), 2000);
                  }}
                  className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none ${
                    copiedCitation
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white border border-border text-text-primary hover:border-emerald-600 shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {copiedCitation ? 'Citation Copied!' : 'Copy Study Citation'}
                </button>

                <ShareButton 
                  title={post.title} 
                  text={post.excerpt} 
                  variant="primary" 
                  label="Share Article" 
                  className="w-full py-3" 
                />
              </div>

              {/* Publisher Quick Facts Sheet */}
              <div className="p-6 bg-white rounded-[2rem] border border-border/80 shadow-sm space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">📋 Quick Facts Directory</span>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-xs text-text-secondary font-bold">Category</span>
                    <span className="text-xs text-text-primary font-black uppercase tracking-wider">{post.category}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-xs text-text-secondary font-bold">Syllabus weight</span>
                    <span className="text-xs text-primary font-black uppercase tracking-wider">High Yield</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-xs text-text-secondary font-bold">Evidence level</span>
                    <span className="text-xs text-text-primary font-black">Class A (Provings)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border/60">
                    <span className="text-xs text-text-secondary font-bold">Difficulty</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-emerald-600 font-black uppercase tracking-wider">Core Intermediate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calculators */}
              <div className="p-6 bg-white rounded-[2rem] border border-border/80 shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-border/60">
                  <Calculator className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Clinical Decisions Desk</h4>
                    <p className="text-[10px] text-text-secondary">Perform rapid checks on-site.</p>
                  </div>
                </div>

                <div className="flex bg-bg-secondary p-1 rounded-xl gap-1">
                  {[
                    { id: 'posology', label: 'Posology' },
                    { id: 'bmi', label: 'BMI' },
                    { id: 'gfr', label: 'GFR' }
                  ].map(calc => (
                    <button
                      key={calc.id}
                      onClick={() => setCalcType(calc.id as any)}
                      className={`flex-1 text-[10px] font-black uppercase tracking-wider py-1.5 rounded-lg border-none cursor-pointer transition-all ${
                        calcType === calc.id ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary bg-transparent'
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
                        <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Weight (kg)</label>
                        <input 
                          type="number" 
                          value={calcInputs.weight} 
                          onChange={(e) => setCalcInputs({ ...calcInputs, weight: e.target.value })}
                          className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Height (cm)</label>
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
                          <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Age (Yrs)</label>
                          <input 
                            type="number" 
                            value={calcInputs.age} 
                            onChange={(e) => setCalcInputs({ ...calcInputs, age: e.target.value })}
                            className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Serum Creatinine</label>
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
                        <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Gender</label>
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
                        <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Symptom duration</label>
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
                        <label className="block text-[9px] font-black text-text-secondary uppercase mb-1">Severity of distress</label>
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
                    <div className="p-3 bg-primary/5 border border-primary/25 rounded-xl text-center text-xs text-text-primary font-bold">
                      {calcResult}
                    </div>
                  )}
                </div>
              </div>

              {/* Terminologies & Definitions glossary */}
              <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border/80 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Subject Glossary Map</h4>
                <div className="space-y-3">
                  {Object.entries(GLOSSARY_MAP).slice(0, 5).map(([term, def]) => (
                    <div key={term} className="p-3 bg-white rounded-xl border border-border hover:border-primary transition-all">
                      <span className="font-mono text-[10px] font-black text-primary capitalize">{term}</span>
                      <p className="text-[11px] text-text-secondary leading-relaxed font-semibold mt-1">{def}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Action Journey timeline */}
              <div className="p-6 bg-bg-secondary rounded-[2rem] border border-border/80 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">Clinical Action Journey</h4>
                <div className="relative pl-6 space-y-5 border-l border-primary/20">
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center text-[8px] text-white font-bold border-none">1</span>
                    <p className="text-xs font-bold text-text-primary">Trigger Exposure</p>
                    <p className="text-[10px] text-text-secondary leading-normal font-semibold">Dry frosty weather, nervous shock, or draft exposure.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 w-4.5 h-4.5 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold border-none">2</span>
                    <p className="text-xs font-bold text-text-primary">Prodromal Phase</p>
                    <p className="text-[10px] text-text-secondary leading-normal font-semibold">Sudden high fever, dry mucous membranes, great pacing anxiety.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-1 w-4.5 h-4.5 rounded-full bg-amber-500 flex items-center justify-center text-[8px] text-white font-bold border-none">3</span>
                    <p className="text-xs font-bold text-text-primary">Constitutional Match</p>
                    <p className="text-[10px] text-text-secondary leading-normal font-semibold">Identify exact modalities (e.g. worse by warm air, thirst for large quantities).</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Floating Mobile Share Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <ShareButton
          title={post.title}
          text={post.excerpt}
          variant="floating"
          showLabel={false}
        />
      </div>
    </div>
  );
};

export default PostDetail;
