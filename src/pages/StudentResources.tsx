import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  ExternalLink, 
  Bookmark, 
  Info, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  Library, 
  Brain, 
  Zap,
  Compass,
  CheckCircle,
  Award,
  FileText,
  ChevronDown,
  BookMarked,
  CheckSquare,
  Square,
  RefreshCw,
  ClipboardList,
  Heart,
  Thermometer
} from 'lucide-react';
import SEO from '../components/SEO';
import ModalitiesCheatSheet from '../components/ModalitiesCheatSheet';
import { glossary, materiaMedicaConcepts, academicLinks, GlossaryTerm } from '../data/studentResourcesData';
import { learningPathSteps, studyGuideSheets, learningQuizzes, LearningStep, LearningArticle, StudyGuideSheet, CaseQuiz } from '../data/learningPathData';

function ConceptCard({ concept }: { concept: typeof materiaMedicaConcepts[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      key={concept.title}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: isExpanded ? 0 : -5 }}
      className={`bg-[#1a2b23] dark:bg-[#11010a] text-white p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group shadow-2xl cursor-pointer transition-all duration-300 ${isExpanded ? 'md:col-span-2' : ''}`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
        <Sparkles size={100} className="text-white" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4 tracking-tight leading-none italic">
          <span className="text-primary not-italic uppercase tracking-widest text-[10px] block mb-2">Materia Medica Core</span>
          {concept.title}
        </h3>
        <p className="text-base text-white/75 mb-6 leading-relaxed font-serif italic">
          {concept.summary}
        </p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4 text-primary">Key Learning Points</h4>
                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {concept.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-white/80 font-medium tracking-wide">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[9px]">
                  Click to collapse <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>
            </motion.div>
          )}
          {!isExpanded && (
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[9px] animate-pulse">
              Read more <ChevronRight className="w-3.5 h-3.5" />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function GlossaryItem({ item }: { item: GlossaryTerm }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, scale: 1 }}
      whileHover={{ y: isExpanded ? 0 : -4 }}
      className={`bg-white dark:bg-bg-secondary p-8 rounded-[2.5rem] border border-border hover:border-primary/30 shadow-soft transition-all group cursor-pointer ${isExpanded ? 'md:col-span-2' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full">
          {item.category}
        </span>
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-display font-bold text-text-primary mb-3 italic group-hover:text-primary transition-colors">
        {item.term}
      </h3>
      <p className={`text-text-secondary leading-relaxed font-serif italic transition-all duration-300 ${isExpanded ? 'text-lg text-text-primary' : 'line-clamp-2 text-sm'}`}>
        {item.definition}
      </p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px]">
                Detailed concept info <Sparkles size={11} />
              </div>
              <p className="mt-3 text-xs text-text-tertiary">
                This term is essential for understanding the {item.category.toLowerCase()} of classical homeopathy. Keep this concept handy during clinical exercises to improve treatment design and prescription fidelity.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StudentResources() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'path' | 'glossary' | 'concepts' | 'guides' | 'quiz' | 'links' | 'modalities'>('path');
  const [searchTerm, setSearchTerm] = useState('');
  const [glossaryFilter, setGlossaryFilter] = useState<GlossaryTerm['category'] | 'All'>('All');

  // Learning Path state
  const [selectedStepId, setSelectedStepId] = useState<string>("fundamental-principles");
  const [viewedArticle, setViewedArticle] = useState<LearningArticle | null>(null);
  
  // Custom reading checks state (strictly local for satisfying study checklists)
  const [readArticles, setReadArticles] = useState<Record<string, boolean>>({});

  // Study guides interactive sheet selection
  const [selectedGuideId, setSelectedGuideId] = useState<string>("miasmatic-differential");

  // Study guide custom Case Totality Board inputs state
  const [totalityInput, setTotalityInput] = useState({
    chiefComplaint: '',
    modalitiesAgg: '',
    modalitiesAmel: '',
    mentalState: '',
    physicalGenerals: '',
    pqrsSymptom: '',
    remedyCandidates: ''
  });
  const [savedCases, setSavedCases] = useState<{ id: string; date: string; data: typeof totalityInput }[]>([]);
  const [isCaseCompleted, setIsCaseCompleted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCase = (savedCase: any) => {
    const d = savedCase.data;
    const text = `CURIVA CLINICAL CASE PROFILE #${savedCase.id}
Compiled: ${savedCase.date}

[CHIEF COMPLAINT & SENSATIONS]
${d.chiefComplaint}

[MODALITIES]
Aggravations (<): ${d.modalitiesAgg || 'N/A'}
Ameliorations (>): ${d.modalitiesAmel || 'N/A'}

[MENTAL & EMOTIONAL SYMPTOMS]
${d.mentalState || 'N/A'}

[PHYSICAL GENERALS & THERMAL PATH]
${d.physicalGenerals || 'N/A'}

[PQRS / CHARACTERISTIC SYMPTOMS]
${d.pqrsSymptom || 'N/A'}

[DIFFERENTIAL DIAGNOSIS / TREATMENT PLANS]
${d.remedyCandidates || 'N/A'}

Generated via Curiva PWA Companion Core.`;

    navigator.clipboard.writeText(text);
    setCopiedId(savedCase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Case Quiz interactive state
  const [selectedQuizId, setSelectedQuizId] = useState<string>("case-1");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Reset quiz state
  const handleQuizReset = (quizId: string) => {
    setSelectedQuizId(quizId);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const currentQuiz = learningQuizzes.find(q => q.id === selectedQuizId) || learningQuizzes[0];
  const currentQuestion = currentQuiz.questions[currentQuestionIdx];

  const handleQuizOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedOptionIdx === null || quizSubmitted) return;
    
    // Check answer correctness
    if (selectedOptionIdx === currentQuestion.correctAnswerIndex) {
      setQuizScore(prev => prev + 1);
    }
    setQuizSubmitted(true);
  };

  const handleQuizNext = () => {
    if (currentQuestionIdx + 1 < currentQuiz.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReadArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Case Totality Generator
  const handleSaveTotalityCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!totalityInput.chiefComplaint.trim()) return;
    
    const newCase = {
      id: Math.random().toString(36).substring(4),
      date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      data: { ...totalityInput }
    };
    
    setSavedCases(prev => [newCase, ...prev]);
    setIsCaseCompleted(true);
    setTimeout(() => setIsCaseCompleted(false), 3000);
    
    // Reset form
    setTotalityInput({
      chiefComplaint: '',
      modalitiesAgg: '',
      modalitiesAmel: '',
      mentalState: '',
      physicalGenerals: '',
      pqrsSymptom: '',
      remedyCandidates: ''
    });
  };

  // Delete case from totality board
  const handleDeleteCase = (id: string) => {
    setSavedCases(prev => prev.filter(c => c.id !== id));
  };

  const filteredGlossary = glossary.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = glossaryFilter === 'All' || item.category === glossaryFilter;
    return matchesSearch && matchesFilter;
  });

  const glossaryCategories: (GlossaryTerm['category'] | 'All')[] = ['All', 'Philosophy', 'Pharmacy', 'Clinical', 'Historical'];
  const activeStep = learningPathSteps.find(step => step.id === selectedStepId) || learningPathSteps[0];
  const selectedGuide = studyGuideSheets.find(g => g.id === selectedGuideId) || studyGuideSheets[0];

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <SEO 
        title="Student Clinical Portal | Curiva Homoeopathy"
        description="Comprehensive learning path, study guides, interactive diagnostic case quizzes, clinical aphorisms database, other scholarly research integration for homeopathy students."
      />

      {/* Hero Header */}
      <header className="relative pt-32 pb-44 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-8"
          >
            <GraduationCap className="w-4 h-4 text-accent-light" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light text-center">Academic & Research Repository</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-display font-medium text-white tracking-tighter leading-[0.85] uppercase flex flex-col items-center">
            <span>Homeopathy</span>
            <span className="text-accent italic lg:ml-24 -mt-2">for Students</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-serif italic leading-relaxed mt-10">
            Learn organic diagnostic case-taking, analyze historic miasmatic pathways, test your simillimum accuracy on interactive quizzes, and explore academic research integrations.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        
        {/* Navigation Tabs */}
        <div className="bg-white p-2.5 rounded-[3rem] border border-border shadow-soft flex flex-wrap justify-center gap-2 mb-16 max-w-fit mx-auto">
          {[
            { id: 'path', label: 'Learning Path', icon: Compass },
            { id: 'guides', label: 'Study Guides', icon: BookMarked },
            { id: 'quiz', label: 'Clinical Quizzes', icon: Zap },
            { id: 'concepts', label: 'Keynotes Matrix', icon: Bookmark },
            { id: 'modalities', label: 'Symptom Modalities', icon: Thermometer },
            { id: 'glossary', label: 'Glossary Index', icon: BookOpen },
            { id: 'links', label: 'Core Literature', icon: Library },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setViewedArticle(null);
              }}
              className={`flex items-center gap-2.5 px-6 py-4 rounded-[2.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-md scale-105' 
                : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Frame */}
        <section className="space-y-12">
          
          {/* TAB 1: STRUCTURED LEARNING PATH */}
          {activeTab === 'path' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="px-3.5 py-1.5 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                  Step-by-Step Curriculum
                </span>
                <h2 className="text-4xl font-display font-black text-text-primary uppercase tracking-tight italic mt-3 mb-2">
                  Academic <span className="text-primary italic">Learning Journey</span>
                </h2>
                <p className="text-text-secondary text-sm">
                  A structured learning path compiled from classical Organon tenets, covering fundamental philosophy, systematic materia medica, detailed patient intake models, and clinical application stages.
                </p>
              </div>

              {/* Steps bento navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {learningPathSteps.map((step) => {
                  const isActive = step.id === selectedStepId;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setSelectedStepId(step.id);
                        setViewedArticle(null);
                      }}
                      className={`text-left p-6 rounded-[2rem] border transition-all ${
                        isActive 
                        ? 'bg-primary border-primary text-white shadow-soft relative' 
                        : 'bg-white border-border hover:border-primary/20 text-text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isActive ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary'}`}>
                          {step.badge}
                        </span>
                        <span className={`text-[9px] font-medium ${isActive ? 'text-white/85' : 'text-text-tertiary'}`}>
                          {step.duration}
                        </span>
                      </div>
                      <h4 className="text-lg font-display font-black tracking-tight leading-tight uppercase italic mb-2">
                        {step.title}
                      </h4>
                      <p className={`text-xs line-clamp-2 ${isActive ? 'text-white/70' : 'text-text-secondary'}`}>
                        {step.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Main reading console */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* List of articles in active step */}
                <div className="lg:col-span-5 bg-white border border-border rounded-[2.5rem] p-8 space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest">
                      Currently Selected Module Articles
                    </span>
                    <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight mt-1 mb-3 italic">
                      {activeStep.title} <span className="text-primary italic">Lessons</span>
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {activeStep.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    {activeStep.articles.map((art) => {
                      const isRead = readArticles[art.id];
                      const isViewing = viewedArticle?.id === art.id;
                      
                      return (
                        <div
                          key={art.id}
                          onClick={() => setViewedArticle(art)}
                          className={`w-full flex items-start justify-between gap-4 p-4 rounded-xl text-left transition-all border cursor-pointer ${
                            isViewing 
                            ? 'bg-bg-secondary border-primary/40 shadow-sm' 
                            : 'bg-transparent border-transparent hover:bg-bg-primary hover:border-border'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-black uppercase text-accent tracking-wider block mb-0.5">
                              {art.readTime}
                            </span>
                            <h5 className="text-xs font-black uppercase text-text-primary group-hover:text-primary leading-snug">
                              {art.title}
                            </h5>
                            <p className="text-[10px] text-text-tertiary line-clamp-1 mt-1 font-serif italic">
                              {art.summary}
                            </p>
                          </div>

                          <button
                            onClick={(e) => handleToggleRead(art.id, e)}
                            className="p-1 text-text-tertiary hover:text-primary transition-colors"
                            title={isRead ? "Mark lesson as unread" : "Mark lesson as complete"}
                          >
                            {isRead ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50 bg-white rounded-full" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-border hover:border-primary/50 rounded-full bg-white" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Article reader slot */}
                <div className="lg:col-span-7">
                  {viewedArticle ? (
                    <motion.div
                      key={viewedArticle.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white border border-border rounded-[2.5rem] p-8 md:p-12 space-y-6 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-accent/15 text-accent rounded text-[9px] font-black uppercase tracking-widest border border-accent/10">
                            {viewedArticle.readTime}
                          </span>
                          <span className="text-[10px] text-text-tertiary font-bold tracking-wider">
                            {readArticles[viewedArticle.id] ? "Completed" : "Reading Session"}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => handleToggleRead(viewedArticle.id, e)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                            readArticles[viewedArticle.id]
                            ? 'bg-emerald-550/10 text-emerald-600 border-emerald-500/20'
                            : 'bg-white text-text-secondary border-border hover:border-primary/25'
                          }`}
                        >
                          {readArticles[viewedArticle.id] ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Completed
                            </>
                          ) : (
                            <>
                              <div className="w-3 h-3 hover:border-primary/50 rounded-full border border-border bg-white" /> Mark Complete
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="text-2xl md:text-3.5xl font-display font-medium text-text-primary tracking-tight leading-tight uppercase italic">
                        {viewedArticle.title}
                      </h3>

                      <p className="border-l-4 border-accent pl-4 text-text-secondary font-serif italic text-base leading-relaxed bg-accent/5 py-3 pr-2 rounded-r-xl">
                        {viewedArticle.summary}
                      </p>

                      <div className="space-y-4 pt-2">
                        {viewedArticle.content.map((paragraph, index) => (
                          <p key={index} className="text-text-primary text-sm font-medium leading-relaxed font-sans">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <div className="bg-bg-secondary p-6 rounded-2xl border border-border mt-8">
                        <div className="flex items-center gap-2 text-primary uppercase font-black tracking-widest text-[9px] mb-3">
                          <Award className="w-4 h-4 text-primary" /> Key Academic Takeaways
                        </div>
                        <ul className="space-y-2">
                          {viewedArticle.keyTakeaways.map((key, kIdx) => (
                            <li key={kIdx} className="flex items-start gap-2.5 text-xs text-text-primary font-bold">
                              <span className="text-xs text-accent text-center mt-0.5">•</span>
                              <span>{key}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </motion.div>
                  ) : (
                    <div className="bg-bg-secondary border border-border rounded-[2.5rem] p-12 text-center py-24">
                      <BookOpen className="w-12 h-12 text-text-tertiary mx-auto mb-4 opacity-30" />
                      <p className="font-serif italic text-text-secondary text-base">Select a curriculum lesson to compile of the curated clinical readings.</p>
                      <p className="text-xs text-text-tertiary mt-2">Choose any chapter in the left column list to explore deep textbook principles compiled for students.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE STUDY GUIDES & TOTABILITY MATRIX BOARD */}
          {activeTab === 'guides' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="px-3.5 py-1.5 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                  Interactive Study Assistance
                </span>
                <h2 className="text-4xl font-display font-black text-text-primary uppercase tracking-tight italic mt-3 mb-2">
                  Study Guides & <span className="text-primary italic">Totality Board</span>
                </h2>
                <p className="text-text-secondary text-sm">
                  Quick-reference matrices for classical Hahnemann principles, and an interactive workspace to draft dynamic Patient Symptom Totality Cards.
                </p>
              </div>

              {/* Study Guides Selector & View Section */}
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left side selector */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white border border-border rounded-3xl p-6 shadow-sm">
                    <h4 className="text-[10px] font-black uppercase text-text-tertiary tracking-wider mb-4">
                      Active Reference Matrix
                    </h4>
                    <div className="space-y-2">
                      {studyGuideSheets.map(sheet => (
                        <button
                          key={sheet.id}
                          onClick={() => setSelectedGuideId(sheet.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                            sheet.id === selectedGuideId 
                            ? 'bg-primary border-primary text-white shadow-sm' 
                            : 'bg-bg-secondary border-transparent hover:border-primary/10 text-text-primary'
                          }`}
                        >
                          <div>
                            <p className={`text-xs font-black uppercase tracking-wider ${sheet.id === selectedGuideId ? 'text-white' : 'text-text-primary'}`}>
                              {sheet.title}
                            </p>
                            <p className={`text-[9px] line-clamp-1 mt-0.5 ${sheet.id === selectedGuideId ? 'text-white/70' : 'text-text-tertiary'}`}>
                              {sheet.description}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6">
                    <h5 className="text-[10px] font-black uppercase text-text-secondary text-primary tracking-widest mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-primary" /> Studying Tip
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Always differential Psora and Sycosis clearly in physical skin manifestations. Psoric skin conditions itch intensely but have minimal dry scale changes. Sycotic skin conditions proliferate with fleshy warty growths, retention, and damp infiltration.
                    </p>
                  </div>
                </div>

                {/* Right side study guide sheet renderer */}
                <div className="lg:col-span-8 bg-white border border-border rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                  <div className="pb-4 border-b border-border mb-6">
                    <span className="text-[8px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
                      Reference Card
                    </span>
                    <h4 className="text-2.5xl font-display font-bold text-text-primary uppercase tracking-tight italic mt-2">
                      {selectedGuide.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      {selectedGuide.description}
                    </p>
                  </div>

                  <div className="divide-y divide-border">
                    {selectedGuide.content.map((item, idx) => (
                      <div key={idx} className="py-4 grid md:grid-cols-4 gap-4 items-start">
                        <div className="md:col-span-1">
                          <span className="text-xs font-black uppercase tracking-wider text-primary">
                            {item.label}
                          </span>
                        </div>
                        <div className="md:col-span-3">
                          <p className="text-xs text-text-secondary leading-relaxed font-serif italic text-text-primary">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* INTERACTIVE CLINICAL CASE TOTALITY BOARD ENGINE */}
              <div className="bg-white border border-border rounded-[3rem] p-8 md:p-12 shadow-soft mt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border mb-8">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                      Practical Workshop Tool
                    </span>
                    <h3 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic mt-1 font-serif">
                      Student Case <span className="text-primary italic">Totality Board</span>
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      Practice taking and organizing diagnostic homeopathic symptoms. Enter case details below to format and record a classical patient totality sheet.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 bg-bg-secondary rounded-xl text-[10px] font-black uppercase text-text-secondary border border-border">
                      {savedCases.length} Cases Compiled
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                  
                  {/* Totality Builder Form */}
                  <form onSubmit={handleSaveTotalityCase} className="lg:col-span-5 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-text-tertiary opacity-70 mb-2">Input Clinical Data:</h4>
                    
                    <div>
                      <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">
                        Chief Complaint & Pain Sensations
                      </label>
                      <textarea
                        required
                        placeholder="e.g. Sharp raw burning sensation in throat, left spreading to right side, worse around 4PM..."
                        value={totalityInput.chiefComplaint}
                        onChange={(e) => setTotalityInput({...totalityInput, chiefComplaint: e.target.value})}
                        className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium h-20 placeholder:opacity-60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1 text-red-500">
                          Aggravations (&lt;)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Cold drafts, wet damp"
                          value={totalityInput.modalitiesAgg}
                          onChange={(e) => setTotalityInput({...totalityInput, modalitiesAgg: e.target.value})}
                          className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1 text-emerald-600">
                          Ameliorations (&gt;)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Holding ice cold water"
                          value={totalityInput.modalitiesAmel}
                          onChange={(e) => setTotalityInput({...totalityInput, modalitiesAmel: e.target.value})}
                          className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">
                        Mental & Emotional Cues
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Highly anxious, weeps easily, craves constant consolidation..."
                        value={totalityInput.mentalState}
                        onChange={(e) => setTotalityInput({...totalityInput, mentalState: e.target.value})}
                        className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:opacity-60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">
                          Physical & Thermals
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Chilly patient, desires warm soup"
                          value={totalityInput.physicalGenerals}
                          onChange={(e) => setTotalityInput({...totalityInput, physicalGenerals: e.target.value})}
                          className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1">
                          PQRS Symptoms
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Thirstless with dry tongue"
                          value={totalityInput.pqrsSymptom}
                          onChange={(e) => setTotalityInput({...totalityInput, pqrsSymptom: e.target.value})}
                          className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-text-secondary tracking-widest mb-1 text-primary">
                        Remedy Candidates Differentiated
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pulsatilla 30C vs. Apis 30C"
                        value={totalityInput.remedyCandidates}
                        onChange={(e) => setTotalityInput({...totalityInput, remedyCandidates: e.target.value})}
                        className="w-full p-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <ClipboardList className="w-4 h-4" /> Save Totality Card
                    </button>

                    {isCaseCompleted && (
                      <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-center rounded-xl text-xs font-bold animate-pulse">
                        Case Saved Successfully in Totality History!
                      </div>
                    )}
                  </form>

                  {/* Saved Totality Cases Board */}
                  <div className="lg:col-span-7 bg-bg-secondary rounded-[2rem] p-6 border border-border flex flex-col h-[520px]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-tertiary opacity-70 mb-4 flex items-center justify-between">
                      <span>Saved Totality Cards:</span>
                      <span className="text-[9px] font-medium text-primary">Click trash icon to delete</span>
                    </h4>

                    {savedCases.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-2xl bg-white text-center">
                        <FileText className="w-12 h-12 text-text-tertiary opacity-25 mb-3" />
                        <p className="font-serif italic text-text-secondary text-base">Your Case Board is empty.</p>
                        <p className="text-[10px] text-text-tertiary mt-2 max-w-xs">Introduce mock clinical findings using the left input form to draft structured student evaluation cards.</p>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
                        {savedCases.map((savedCase) => (
                          <div 
                            key={savedCase.id}
                            className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:border-primary/25 transition-all text-xs"
                          >
                            <div className="flex items-start justify-between border-b pb-3 mb-3">
                              <div>
                                <span className="font-black text-[9px] text-text-tertiary uppercase tracking-wider block">Compiled {savedCase.date}</span>
                                <span className="text-xs font-black uppercase tracking-wide text-primary">Case Profile #{savedCase.id}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => handleCopyCase(savedCase)}
                                  className="text-primary font-black text-[10px] uppercase tracking-wider hover:underline"
                                >
                                  {copiedId === savedCase.id ? 'Copied! ✓' : 'Copy Narrative'}
                                </button>
                                <span className="text-text-tertiary">|</span>
                                <button 
                                  onClick={() => handleDeleteCase(savedCase.id)}
                                  className="text-red-500 font-bold hover:underline font-black text-[10px] uppercase tracking-wider"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <p className="mb-2 text-text-primary">
                              <span className="font-bold text-text-secondary font-black block uppercase text-[8px] tracking-wider mb-0.5">CHIEF COMPLAINT:</span>
                              <span className="font-serif italic text-text-primary text-sm font-medium">{savedCase.data.chiefComplaint}</span>
                            </p>

                            <div className="grid grid-cols-2 gap-4 my-2">
                              {savedCase.data.modalitiesAgg && (
                                <p className="text-[11px] text-red-750">
                                  <span className="font-bold text-[8px] font-black text-text-tertiary uppercase block">AGG (&lt;):</span>
                                  <span>{savedCase.data.modalitiesAgg}</span>
                                </p>
                              )}
                              {savedCase.data.modalitiesAmel && (
                                <p className="text-[11px] text-emerald-800">
                                  <span className="font-bold text-[8px] font-black text-text-tertiary uppercase block">AMEL (&gt;):</span>
                                  <span>{savedCase.data.modalitiesAmel}</span>
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 my-2">
                              {savedCase.data.mentalState && (
                                <p className="text-[11px] text-text-primary">
                                  <span className="font-bold text-[8px] font-black text-text-tertiary uppercase block">MENTAL STATUS:</span>
                                  <span>{savedCase.data.mentalState}</span>
                                </p>
                              )}
                              {savedCase.data.physicalGenerals && (
                                <p className="text-[11px] text-text-primary">
                                  <span className="font-bold text-[8px] font-black text-text-tertiary uppercase block">THERMALS & PHYS:</span>
                                  <span>{savedCase.data.physicalGenerals}</span>
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t pt-2 mt-2">
                              {savedCase.data.pqrsSymptom && (
                                <p className="text-[11px] text-primary">
                                  <span className="font-bold text-[8px] font-black text-accent uppercase block">PQRS EXCEP:</span>
                                  <span className="font-bold">{savedCase.data.pqrsSymptom}</span>
                                </p>
                              )}
                              {savedCase.data.remedyCandidates && (
                                <p className="text-[11px] text-text-primary">
                                  <span className="font-bold text-[8px] font-black text-text-tertiary uppercase block">DIFFERENTIAL RECS:</span>
                                  <span className="font-bold text-primary italic">{savedCase.data.remedyCandidates}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CASE QUIZZES & ASSESSMENTS */}
          {activeTab === 'quiz' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="px-3.5 py-1.5 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                  Interactive Knowledge Assessment
                </span>
                <h2 className="text-4xl font-display font-black text-text-primary uppercase tracking-tight italic mt-3 mb-2">
                  Clinical Case <span className="text-primary italic">Quizzes</span>
                </h2>
                <p className="text-text-secondary text-sm">
                  Deduce the simillimum and verify your interpretation of Hering's and Kent's observations using detailed clinical scenarios.
                </p>
              </div>

              {/* Quiz Selection bento strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningQuizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className={`p-6 rounded-3xl border transition-all ${
                      selectedQuizId === quiz.id
                      ? 'bg-white border-primary/65 shadow-md ring-2 ring-primary/5'
                      : 'bg-white border-border hover:border-primary/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[8px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-accent/15 text-accent border border-accent/10`}>
                        {quiz.difficulty} Case
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        {quiz.questions.length} Multi-Choice Questions
                      </span>
                    </div>
                    <h4 className="text-xl font-display font-bold text-text-primary uppercase tracking-tight italic mb-2">
                      {quiz.title}
                    </h4>
                    <p className="text-xs text-text-secondary line-clamp-2 font-serif italic mb-4">
                      {quiz.scenario}
                    </p>
                    <button
                      onClick={() => handleQuizReset(quiz.id)}
                      className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      {selectedQuizId === quiz.id ? "Restart Assessment" : "Start Case Quiz"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Active Quiz Workstation */}
              <div className="bg-white border border-border rounded-[2.5rem] p-8 md:p-12 shadow-soft grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Case Scenario Details */}
                <div className="lg:col-span-5 bg-bg-secondary p-6 rounded-[2rem] border border-border space-y-4">
                  <div>
                    <span className="text-[8px] font-black uppercase text-accent tracking-widest">
                      Diagnostic Scenario Target
                    </span>
                    <h3 className="text-xl font-display font-bold text-text-primary uppercase tracking-tight mr-2 italic mt-1 pb-2 border-b">
                      Patient Physical Narrative
                    </h3>
                  </div>
                  <p className="text-xs text-text-primary leading-relaxed font-serif italic">
                    "{currentQuiz.scenario}"
                  </p>
                  
                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">
                      Target Symptoms Compiled:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQuiz.symptoms.map((sym, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 bg-white border rounded text-[9px] font-medium text-text-secondary italic">
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question & Evaluation Zone */}
                <div className="lg:col-span-7 space-y-6">
                  {quizFinished ? (
                    <div className="text-center py-12 space-y-4">
                      <Award className="w-16 h-16 text-accent mx-auto animate-bounce mb-2" />
                      <h4 className="text-3xl font-display font-black text-text-primary uppercase italic">
                        Case Assessment Complete!
                      </h4>
                      <p className="text-base text-text-secondary max-w-sm mx-auto">
                        You scored <span className="font-bold text-primary font-display text-xl">{quizScore}</span> correct out of <span className="font-bold">{currentQuiz.questions.length}</span> question panels in this classical differentiation test.
                      </p>
                      <button
                        onClick={() => handleQuizReset(selectedQuizId)}
                        className="px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md hover:scale-105 transition-all mt-4"
                      >
                        Try Assessment Again
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-3 border-b">
                        <span className="text-[10px] font-black uppercase text-primary tracking-widest">
                          Question {currentQuestionIdx + 1} of {currentQuiz.questions.length}
                        </span>
                        <span className="text-[10px] font-bold text-text-tertiary">
                          Cumulative Score: {quizScore}
                        </span>
                      </div>

                      <h4 className="text-lg md:text-xl font-bold text-text-primary leading-snug">
                        {currentQuestion.questionText}
                      </h4>

                      <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                          const isSelected = selectedOptionIdx === idx;
                          const isCorrect = idx === currentQuestion.correctAnswerIndex;
                          let btnClass = "bg-bg-secondary border-transparent text-text-secondary hover:border-primary/20";
                          
                          if (isSelected) {
                            btnClass = "bg-primary/5 border-primary text-primary font-bold";
                          }
                          if (quizSubmitted) {
                            if (isCorrect) {
                              btnClass = "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold";
                            } else if (isSelected) {
                              btnClass = "bg-red-50 border-red-400 text-red-700";
                            } else {
                              btnClass = "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                            }
                          }
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => handleQuizOptionSelect(idx)}
                              disabled={quizSubmitted}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-xs transition-all font-medium ${btnClass}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && isCorrect && (
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-4">
                        {!quizSubmitted ? (
                          <button
                            onClick={handleQuizSubmit}
                            disabled={selectedOptionIdx === null}
                            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                              selectedOptionIdx !== null 
                              ? 'bg-primary text-white shadow-sm hover:scale-102' 
                              : 'bg-border text-text-tertiary cursor-not-allowed'
                            }`}
                          >
                            Submit Answer
                          </button>
                        ) : (
                          <button
                            onClick={handleQuizNext}
                            className="px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-colors flex items-center gap-1.5 ml-auto"
                          >
                            {currentQuestionIdx + 1 < currentQuiz.questions.length ? "Next Question" : "Complete Quiz"} <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {quizSubmitted && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 bg-amber-500/5 border border-amber-500/15 rounded-xl text-xs space-y-2 mt-4"
                        >
                          <span className="font-bold text-[9px] font-black uppercase text-amber-600 tracking-wider flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" /> Clinical Explanation:
                          </span>
                          <p className="text-text-secondary leading-relaxed font-serif italic text-text-primary">
                            {currentQuestion.explanation}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: GLOSSARY INDEX */}
          {activeTab === 'glossary' && (
            <motion.div
              layout
              key="glossary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10 animate-fade-in"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div>
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                    Standard Terminology database
                  </span>
                  <p className="text-text-secondary text-sm mt-2">
                    Examine essential, historical, philosophical definitions compiled for academic proficiency.
                  </p>
                </div>
                
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input 
                    type="text"
                    placeholder="Search for terms (e.g. Miasm, Succussion)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white border border-border rounded-3xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {glossaryCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setGlossaryFilter(cat)}
                    className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                      glossaryFilter === cat 
                      ? 'bg-primary text-white border-primary shadow-sm' 
                      : 'bg-white text-text-tertiary border-border hover:border-primary/20 hover:text-primary shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGlossary.map((item) => (
                  <GlossaryItem key={item.term} item={item} />
                ))}
                {filteredGlossary.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed">
                    <p className="text-text-tertiary text-lg font-medium italic">No terms found matching your search string criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: CORE CONCEPTS / KEYNOTES MATRIX */}
          {activeTab === 'concepts' && (
            <motion.div
              layout
              key="concepts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {materiaMedicaConcepts.map((concept, idx) => (
                <ConceptCard key={concept.title} concept={concept} />
              ))}
            </motion.div>
          )}

          {/* TAB 6: CORE LITERATURE & SCHOLARLY JOURNAL LINKS */}
          {activeTab === 'links' && (
            <motion.div
              layout
              key="links"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div className="space-y-8 animate-fade-in">
                <div className="bg-primary/5 p-12 rounded-[4rem] border border-primary/10 h-full flex flex-col justify-between">
                  <div>
                    <span className="px-3.5 py-1.5 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                      Research Papers Integration
                    </span>
                    <h3 className="text-3xl font-display font-black text-text-primary mt-4 mb-6 italic font-serif">
                      Scholarly <span className="text-primary">Journals</span>
                    </h3>
                    <p className="text-text-secondary text-base font-medium leading-relaxed mb-8">
                      Stay updated with the latest clinical research studies, double-blind trials, and nano-pharmacogenomic findings from peer-reviewed homeopathy researchers globally.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {academicLinks.filter(l => l.type === 'Journal').map(link => (
                      <a 
                        key={link.title}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-6 bg-white rounded-[2.5rem] border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
                      >
                        <div className="flex-1 pr-4">
                          <h4 className="text-sm font-black text-text-primary group-hover:text-primary transition-colors uppercase tracking-tight">{link.title}</h4>
                          <p className="text-xs text-text-tertiary mt-1 opacity-80">{link.description}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8 animate-fade-in">
                <div className="bg-bg-secondary p-12 rounded-[4rem] border border-border h-full flex flex-col justify-between">
                  <div>
                    <span className="px-3.5 py-1.5 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                      Clinical Textbooks Databases
                    </span>
                    <h3 className="text-3xl font-display font-black text-text-primary mt-4 mb-6 italic font-serif">
                      Study <span className="text-primary">Material</span>
                    </h3>
                    <p className="text-text-secondary text-base font-medium leading-relaxed mb-8">
                      Access classic digital textbook platforms, proving database models, and historical reference materials for classical Hahnemann training.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {academicLinks.filter(l => l.type !== 'Journal').map(link => (
                      <a 
                        key={link.title}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-6 bg-white rounded-[2.5rem] border border-border hover:border-primary/50 hover:shadow-xl transition-all group"
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-primary text-white px-2 py-0.5 rounded-full">
                              {link.type}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-text-primary group-hover:text-primary transition-colors uppercase tracking-tight">{link.title}</h4>
                          <p className="text-xs text-text-tertiary mt-1 opacity-80">{link.description}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: SYMPTOM MODALITIES MATRIX */}
          {activeTab === 'modalities' && (
            <motion.div
              layout
              key="modalities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ModalitiesCheatSheet />
            </motion.div>
          )}

        </section>

      </main>

      {/* FOOTER CLINICAL STATEMENT */}
      <footer className="max-w-7xl mx-auto px-4 mt-20">
         <div className="bg-bg-secondary p-12 rounded-[3.5rem] border border-border relative overflow-hidden">
            <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none">
              <Bookmark className="w-48 h-48 text-primary" />
            </div>
            
            <div className="max-w-3xl">
              <h4 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic mb-4">
                Clinical Student Oath
              </h4>
              <p className="text-text-secondary font-serif italic text-lg leading-relaxed mb-6">
                Success in homeopathic prescribing is a combination of accurate clinical observation, unprejudiced symptom recording, and differential study of our proven Remedies. Leverage these digital guides to study, quiz yourself often, and always verify case totallies against proven Repertories.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handleQuizReset("case-1")}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:scale-105 transition-all text-center inline-block"
                >
                  Start Case Quiz 1
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('guides');
                    document.getElementById('totality-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-white text-text-primary border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-bg-primary transition-all text-center inline-block"
                >
                  Build Case Totality
                </button>
              </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
