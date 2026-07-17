import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  Award, 
  HelpCircle, 
  RotateCcw,
  ChevronLeft,
  BookMarked,
  Layers,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  Pause,
  AlertCircle,
  BookOpenCheck,
  ThumbsUp,
  Info
} from 'lucide-react';
import SEO from '../components/SEO';
import { homeopathicFlashcards, Flashcard } from '../data/flashcards_data';
import { universityPYQs, UniversityPYQ } from '../data/pyqs_data';
import { getAIAPGETQuestionBank, AIAPGETQuestion } from '../data/aiapget_questions';

export default function StudentResources() {
  const [activeTab, setActiveTab] = useState<'pyqs' | 'flashcards' | 'quiz' | 'therapeutics' | 'subjects'>('subjects');
  const [activeSubjectId, setActiveSubjectId] = useState<string>('organon');
  const [activeSubjectSubTab, setActiveSubjectSubTab] = useState<'notes' | 'important' | 'viva' | 'revision'>('notes');

  // --- UNIVERSITY PYQS & ANSWERS MODULE ---
  const [pyqSearch, setPyqSearch] = useState('');
  const [selectedPyqSubject, setSelectedPyqSubject] = useState<string>('All');
  const [expandedPyqId, setExpandedPyqId] = useState<string | null>(null);

  const filteredPyqs = useMemo(() => {
    return universityPYQs.filter(pyq => {
      const matchesSearch = pyq.question.toLowerCase().includes(pyqSearch.toLowerCase()) || 
                            pyq.answer.toLowerCase().includes(pyqSearch.toLowerCase()) ||
                            pyq.university.toLowerCase().includes(pyqSearch.toLowerCase());
      const matchesSubject = selectedPyqSubject === 'All' || pyq.subject === selectedPyqSubject;
      return matchesSearch && matchesSubject;
    });
  }, [pyqSearch, selectedPyqSubject]);


  // --- HOMEOPATHIC FLASHCARDS (100+ CARDS) MODULE ---
  const [flashcardSearch, setFlashcardSearch] = useState('');
  const [selectedFlashcardCategory, setSelectedFlashcardCategory] = useState<string>('All');
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredFlashcards = useMemo(() => {
    return homeopathicFlashcards.filter(card => {
      const matchesSearch = card.term.toLowerCase().includes(flashcardSearch.toLowerCase()) ||
                            card.definition.toLowerCase().includes(flashcardSearch.toLowerCase()) ||
                            card.clinicalSignificance.toLowerCase().includes(flashcardSearch.toLowerCase());
      const matchesCategory = selectedFlashcardCategory === 'All' || card.subType === selectedFlashcardCategory;
      return matchesSearch && matchesCategory;
    });
  }, [flashcardSearch, selectedFlashcardCategory]);

  // Adjust cardIdx when filtered list changes
  useEffect(() => {
    setCardIdx(0);
    setIsFlipped(false);
  }, [selectedFlashcardCategory, flashcardSearch]);

  // Autoplay flashcards timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && filteredFlashcards.length > 0) {
      interval = setInterval(() => {
        setIsFlipped(prev => {
          if (!prev) {
            // If currently on term, flip to definition
            return true;
          } else {
            // If currently flipped, move to next card and flip back
            setCardIdx(idx => (idx + 1) % filteredFlashcards.length);
            return false;
          }
        });
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, filteredFlashcards.length]);


  // --- AIAPGET 5000+ MCQ PRACTICE SYSTEM ---
  const [mcqMode, setMcqMode] = useState<'sandbox' | 'exam10' | 'exam50'>('sandbox');
  const [quizFilterSubject, setQuizFilterSubject] = useState<string>('All');
  const [quizFilterDifficulty, setQuizFilterDifficulty] = useState<string>('All');
  const [quizSearchQuery, setQuizSearchQuery] = useState('');
  const [sandboxPage, setSandboxPage] = useState(0);
  const sandboxPageSize = 10;

  // Cache full 5,000 question bank locally on mount
  const fullQuestionBank = useMemo(() => {
    return getAIAPGETQuestionBank(5000);
  }, []);

  // Filtered sandbox question pool
  const filteredSandboxQuestions = useMemo(() => {
    if (mcqMode !== 'sandbox') return [];
    return fullQuestionBank.filter(q => {
      const matchesSearch = q.question.toLowerCase().includes(quizSearchQuery.toLowerCase()) ||
                            q.explanation.toLowerCase().includes(quizSearchQuery.toLowerCase());
      const matchesSubject = quizFilterSubject === 'All' || q.subject === quizFilterSubject;
      const matchesDifficulty = quizFilterDifficulty === 'All' || q.difficulty === quizFilterDifficulty;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [mcqMode, fullQuestionBank, quizSearchQuery, quizFilterSubject, quizFilterDifficulty]);

  // Reset sandbox page when filters shift
  useEffect(() => {
    setSandboxPage(0);
  }, [quizFilterSubject, quizFilterDifficulty, quizSearchQuery]);

  const pagedSandboxQuestions = useMemo(() => {
    const start = sandboxPage * sandboxPageSize;
    return filteredSandboxQuestions.slice(start, start + sandboxPageSize);
  }, [filteredSandboxQuestions, sandboxPage]);

  // Interactive sandbox user states
  const [userSelectedSandboxAnswers, setUserSelectedSandboxAnswers] = useState<Record<string, number>>({});
  const [submittedSandboxAnswers, setSubmittedSandboxAnswers] = useState<Record<string, boolean>>({});

  const handleSandboxOptionSelect = (qId: string, optIdx: number) => {
    if (submittedSandboxAnswers[qId]) return; // already submitted
    setUserSelectedSandboxAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSandboxSubmit = (qId: string) => {
    setSubmittedSandboxAnswers(prev => ({ ...prev, [qId]: true }));
  };


  // Exam States (For 10 or 50 dynamic questions)
  const [examQuestions, setExamQuestions] = useState<AIAPGETQuestion[]>([]);
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [selectedExamOptionIdx, setSelectedExamOptionIdx] = useState<number | null>(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [examFinished, setExamFinished] = useState(false);

  const startNewExam = (mode: 'exam10' | 'exam50') => {
    setMcqMode(mode);
    const count = mode === 'exam10' ? 10 : 50;
    
    // Shuffling to pick unique random questions from the 5,000 pool
    const shuffled = [...fullQuestionBank].sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled.slice(0, count));
    setCurrentExamIdx(0);
    setSelectedExamOptionIdx(null);
    setExamSubmitted(false);
    setExamScore(0);
    setExamFinished(false);
  };

  const handleExamOptionSelect = (optIdx: number) => {
    if (examSubmitted) return;
    setSelectedExamOptionIdx(optIdx);
  };

  const submitExamAnswer = () => {
    if (selectedExamOptionIdx === null) return;
    setExamSubmitted(true);
    const activeQ = examQuestions[currentExamIdx];
    const isCorrect = activeQ.options[selectedExamOptionIdx] === activeQ.correctAnswer;
    if (isCorrect) {
      setExamScore(prev => prev + 1);
    }
  };

  const nextExamQuestion = () => {
    if (currentExamIdx < examQuestions.length - 1) {
      setCurrentExamIdx(prev => prev + 1);
      setSelectedExamOptionIdx(null);
      setExamSubmitted(false);
    } else {
      setExamFinished(true);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-12 pb-24 font-sans text-text-primary selection:bg-primary/20 selection:text-primary">
      <SEO 
        title="BHMS Student Zone & Study Hub"
        description="Premium study portal for BHMS students. Access 100+ active recall flashcards, verified university answer key sheets, and practice with 5,000+ AIAPGET MCQs."
      />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Top Branding Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary animate-pulse">
              <GraduationCap className="w-6.5 h-6.5" />
            </div>
            <div>
              <h1 id="bhms-hub-title" className="text-xl md:text-2xl font-display font-medium text-primary">BHMS Academic Study Hub</h1>
              <p className="text-xs text-text-tertiary">Classic lecture boards, past university papers, flashcards, &amp; AIAPGET practice</p>
            </div>
          </div>
          <Link to="/profile" className="text-xs text-primary hover:text-accent font-bold transition-colors flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" /> View My Study Planner Portfolio
          </Link>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-10 bg-white dark:bg-gray-950 border border-border p-1.5 rounded-2xl max-w-4xl mx-auto justify-center shadow-sm">
          {[
            { id: 'subjects', label: 'Subject-wise Study Center', icon: BookOpen },
            { id: 'pyqs', label: 'University Blueprints & Answers', icon: FileText },
            { id: 'flashcards', label: '100+ Homeopathic Flashcards', icon: Layers },
            { id: 'quiz', label: '5000+ AIAPGET MCQ Simulator', icon: Award },
            { id: 'therapeutics', label: 'Clinical Therapeutics', icon: BookOpenCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                id={`tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsFlipped(false);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel Area */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: UNIVERSITY PYQS & VERIFIED ANSWERS */}
          {activeTab === 'pyqs' && (
            <motion.div
              key="pyqs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
                <span className="text-[10px] font-black uppercase tracking-wider text-accent">BHMS Syllabus Solved Keys</span>
                <h2 className="text-2xl md:text-3xl font-display font-light text-primary">University Solved Question Sheets</h2>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Read high-scoring university answers prepared from standard internet sources, Hahnemann's Organon, and classical Materia Medica guidelines.
                </p>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input 
                      type="text" 
                      placeholder="Search questions or keywords..."
                      value={pyqSearch}
                      onChange={(e) => setPyqSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <select
                    value={selectedPyqSubject}
                    onChange={(e) => setSelectedPyqSubject(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-border bg-white text-xs focus:outline-none focus:border-primary font-bold text-text-secondary"
                  >
                    <option value="All">All Subjects</option>
                    <option value="Organon & Philosophy">Organon & Philosophy</option>
                    <option value="Materia Medica">Materia Medica</option>
                    <option value="Repertory">Repertory</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
              </div>

              {/* Solved Question Cards */}
              <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                {filteredPyqs.length === 0 ? (
                  <div className="bg-white border border-border rounded-2xl p-10 text-center text-text-tertiary">
                    No solved university questions matched your filter query.
                  </div>
                ) : (
                  filteredPyqs.map((pyq) => {
                    const isExpanded = expandedPyqId === pyq.id;
                    return (
                      <div 
                        key={pyq.id}
                        className="bg-white border border-border rounded-2xl overflow-hidden transition-all hover:shadow-soft"
                      >
                        {/* Header Trigger */}
                        <button
                          onClick={() => setExpandedPyqId(isExpanded ? null : pyq.id)}
                          className="w-full p-6 text-left flex justify-between items-start gap-4 hover:bg-bg-primary transition-all cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-mono font-black uppercase">
                                {pyq.subject}
                              </span>
                              <span className="px-2 py-0.5 bg-accent/15 text-accent rounded text-[9px] font-bold">
                                {pyq.marks} Marks Weightage
                              </span>
                              <span className="text-[10px] text-text-tertiary font-medium">
                                {pyq.university} • Year {pyq.year}
                              </span>
                            </div>
                            <h3 className="text-base font-display font-bold text-primary leading-snug mt-1.5">
                              {pyq.question}
                            </h3>
                          </div>
                          <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-border transition-all whitespace-nowrap shrink-0 ${isExpanded ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary'}`}>
                            {isExpanded ? 'Hide Answer' : 'Read Answer'}
                          </span>
                        </button>

                        {/* Expandable Answer Pane */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-border bg-bg-secondary overflow-hidden"
                            >
                              <div className="p-6 space-y-5">
                                
                                {/* Key point pills */}
                                <div className="space-y-2">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary block">
                                    High-scoring Core Highlights
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {pyq.keyPoints.map((point, pIdx) => (
                                      <span key={pIdx} className="inline-flex items-center gap-1 bg-white border border-border px-3 py-1 rounded-full text-[10px] font-medium text-text-secondary">
                                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                                        {point}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Main Text Answer */}
                                <div className="space-y-2">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary block">
                                    Verified Correct Model Answer
                                  </span>
                                  <div className="bg-white p-5 rounded-xl border border-border/60 text-xs text-text-secondary leading-relaxed whitespace-pre-line font-medium shadow-inner">
                                    {pyq.answer}
                                  </div>
                                </div>

                                {/* University Compliance Disclaimer */}
                                <div className="flex items-center gap-2 text-[10px] text-text-tertiary italic">
                                  <Info className="w-3.5 h-3.5 text-accent shrink-0" />
                                  Matches Central Council of Homoeopathy (CCH) standards. Always structure with clear headings as shown above.
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: 100+ HOMEOPATHIC FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-accent">Memory Palaces & Active Recall</span>
                <h2 className="text-2xl font-display font-medium text-primary">Homeopathic Active Flashcards Deck</h2>
                <p className="text-xs text-text-secondary max-w-lg mx-auto">
                  Test your classical medicine recall! Use search or subject filters to master 100+ core definitions, keynotes, and clinical applications.
                </p>
              </div>

              {/* Filters and search */}
              <div className="flex flex-col sm:flex-row gap-3 bg-white border border-border rounded-2xl p-4 shadow-sm items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input 
                    type="text" 
                    placeholder="Search 100+ flashcards..."
                    value={flashcardSearch}
                    onChange={(e) => setFlashcardSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none"
                  />
                </div>

                <div className="flex gap-1.5 flex-wrap justify-center">
                  {["All", "Materia Medica", "Philosophy & Organon", "Repertory", "Pharmacy"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFlashcardCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedFlashcardCategory === cat
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-border text-text-secondary hover:border-primary/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredFlashcards.length === 0 ? (
                <div className="bg-white border border-border rounded-3xl p-12 text-center text-text-tertiary shadow-soft">
                  No flashcards matched your query. Try resetting your search or category filter.
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Card Flip Component */}
                  <div className="perspective-1000 w-full min-h-[300px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="relative w-full h-full min-h-[300px] preserve-3d"
                    >
                      {/* Front Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-border rounded-3xl p-8 flex flex-col justify-between shadow-soft">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-wide">
                            {filteredFlashcards[cardIdx].subType}
                          </span>
                          <span className="text-xs font-mono font-bold text-text-tertiary">
                            Card {cardIdx + 1} of {filteredFlashcards.length}
                          </span>
                        </div>
                        
                        <div className="text-center my-6">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block mb-2">HOMEOPATHIC TERM / REMEDY</span>
                          <h3 className="text-2xl md:text-3xl font-display font-black text-primary tracking-tight leading-tight">
                            {filteredFlashcards[cardIdx].term}
                          </h3>
                          <p className="text-xs text-accent mt-4 italic font-serif flex items-center justify-center gap-1">
                            <span>Tap card to reveal definition</span> <ChevronRight className="w-3.5 h-3.5" />
                          </p>
                        </div>

                        <div className="text-center text-[9px] uppercase font-black tracking-widest text-primary/30">
                          Curiva Scholar active recall system
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className="absolute inset-0 w-full h-full backface-hidden bg-primary-dark text-white border border-primary-dark rounded-3xl p-8 flex flex-col justify-between shadow-lg [transform:rotateY(180deg)]">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono bg-white/20 text-white px-3 py-1 rounded-full font-black uppercase tracking-wide">
                            Pathogenesis &amp; Practice
                          </span>
                          <span className="text-xs font-mono font-bold text-white/50">
                            Card {cardIdx + 1} of {filteredFlashcards.length}
                          </span>
                        </div>

                        <div className="space-y-5 my-2">
                          <div>
                            <h5 className="text-[10px] font-mono font-black uppercase tracking-wider text-white/60 mb-1">Materia Medica &amp; Philosophical Meaning:</h5>
                            <p className="text-sm font-medium leading-relaxed">
                              {filteredFlashcards[cardIdx].definition}
                            </p>
                          </div>
                          <div className="border-t border-white/10 pt-3">
                            <h5 className="text-[10px] font-mono font-black uppercase tracking-wider text-accent-light text-amber-300 mb-1">Practical Clinical Application:</h5>
                            <p className="text-xs leading-relaxed text-white/80">
                              {filteredFlashcards[cardIdx].clinicalSignificance}
                            </p>
                          </div>
                        </div>

                        <div className="text-center text-[9px] uppercase font-black tracking-widest text-white/30">
                          Tap card to view terms
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Manual / Auto play controls */}
                  <div className="flex justify-between items-center max-w-sm mx-auto bg-white border border-border p-3.5 rounded-2xl shadow-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                        setCardIdx(prev => (prev > 0 ? prev - 1 : filteredFlashcards.length - 1));
                      }}
                      className="p-2.5 bg-bg-primary border border-border rounded-xl hover:border-primary text-text-secondary hover:text-primary transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all ${
                        isPlaying ? 'bg-amber-500 text-white' : 'bg-primary text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {isPlaying ? 'PAUSE AUTO' : 'AUTO CYCLE'}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                        setCardIdx(prev => (prev < filteredFlashcards.length - 1 ? prev + 1 : 0));
                      }}
                      className="p-2.5 bg-bg-primary border border-border rounded-xl hover:border-primary text-text-secondary hover:text-primary transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: AIAPGET 5,000+ MCQS PRACTICE MODULE */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-accent">Interactive Post-Graduate Question Bank</span>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-primary">AIAPGET Homeopathic Question Bank</h2>
                <p className="text-xs text-text-secondary max-w-xl mx-auto">
                  Prepare with over 5,000 high-yield, classical homeopathic multiple choice questions designed to simulate the standard Indian AIAPGET post-graduate entrance syllabus.
                </p>
              </div>

              {/* Mode Selection Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-border p-5 rounded-[2rem] shadow-soft">
                <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${mcqMode === 'sandbox' ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/30'}`}>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-primary">5,000+ Question Sandbox</h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                      Browse and practice with all 5,000+ dynamic questions step-by-step. Filter by subject, difficulty, or search keywords freely.
                    </p>
                  </div>
                  <button 
                    onClick={() => setMcqMode('sandbox')}
                    className="w-full mt-4 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all cursor-pointer"
                  >
                    Open Study Sandbox
                  </button>
                </div>

                <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${mcqMode === 'exam10' ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/30'}`}>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-primary">Standard Mock (10 Questions)</h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                      Test your readiness! Runs a random, dynamic 10-question quiz with score tracking and detailed rationales.
                    </p>
                  </div>
                  <button 
                    onClick={() => startNewExam('exam10')}
                    className="w-full mt-4 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all cursor-pointer"
                  >
                    Start 10Q Mock Exam
                  </button>
                </div>

                <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${mcqMode === 'exam50' ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/30'}`}>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-primary">Deep assessment (50 Questions)</h4>
                    <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                      A comprehensive exam simulating deep clinical stamina. Handpicks 50 unique questions from our massive 5,000 databank.
                    </p>
                  </div>
                  <button 
                    onClick={() => startNewExam('exam50')}
                    className="w-full mt-4 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all cursor-pointer"
                  >
                    Start 50Q Deep Exam
                  </button>
                </div>
              </div>

              {/* MODE 1: STUDY SANDBOX */}
              {mcqMode === 'sandbox' && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="bg-white border border-border p-5 rounded-3xl space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input 
                          type="text" 
                          placeholder="Search questions or clinical symptoms..."
                          value={quizSearchQuery}
                          onChange={(e) => setQuizSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none"
                        />
                      </div>

                      <select
                        value={quizFilterSubject}
                        onChange={(e) => setQuizFilterSubject(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-border bg-white text-xs font-bold text-text-secondary focus:outline-none"
                      >
                        <option value="All">All Subjects</option>
                        <option value="Materia Medica">Materia Medica</option>
                        <option value="Organon & Philosophy">Organon & Philosophy</option>
                        <option value="Repertory">Repertory</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Allied Health Sciences">Allied Health Sciences</option>
                      </select>

                      <select
                        value={quizFilterDifficulty}
                        onChange={(e) => setQuizFilterDifficulty(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-border bg-white text-xs font-bold text-text-secondary focus:outline-none"
                      >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-text-tertiary font-mono">
                      <span>Matched {filteredSandboxQuestions.length} Questions</span>
                      <span>Showing page {sandboxPage + 1} of {Math.ceil(filteredSandboxQuestions.length / sandboxPageSize)}</span>
                    </div>
                  </div>

                  {/* Sandbox list */}
                  <div className="space-y-6">
                    {pagedSandboxQuestions.length === 0 ? (
                      <div className="bg-white border border-border rounded-2xl p-12 text-center text-text-tertiary">
                        No questions matched your search criteria. Try modifying your filters.
                      </div>
                    ) : (
                      pagedSandboxQuestions.map((q) => {
                        const selectedAns = userSelectedSandboxAnswers[q.id];
                        const isSubmitted = submittedSandboxAnswers[q.id];
                        
                        return (
                          <div key={q.id} className="bg-white border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft hover:shadow-medium transition-all">
                            <div className="flex justify-between items-center border-b border-border/60 pb-3">
                              <div className="flex gap-2 items-center">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-mono font-black uppercase">
                                  {q.subject}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                  {q.difficulty}
                                </span>
                              </div>
                              <span className="text-xs font-mono text-text-tertiary uppercase">Q-{q.id}</span>
                            </div>

                            <h3 className="text-sm sm:text-base font-display font-bold text-primary leading-snug">
                              {q.question}
                            </h3>

                            {/* Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = selectedAns === oIdx;
                                const isCorrect = opt === q.correctAnswer;
                                
                                let optStyle = "border-border hover:border-primary/40 bg-bg-primary text-text-primary";
                                if (isSubmitted) {
                                  if (isCorrect) {
                                    optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 font-bold";
                                  } else if (isSelected) {
                                    optStyle = "border-red-500 bg-red-500/10 text-red-800 font-bold";
                                  } else {
                                    optStyle = "border-border/40 opacity-60 text-text-tertiary";
                                  }
                                } else if (isSelected) {
                                  optStyle = "border-primary bg-primary/5 text-primary font-bold";
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    disabled={isSubmitted}
                                    onClick={() => handleSandboxOptionSelect(q.id, oIdx)}
                                    className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                                  >
                                    <span className="leading-relaxed">{opt}</span>
                                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Actions & Explanations */}
                            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-2 border-t border-border/60">
                              <div>
                                {!isSubmitted && selectedAns !== undefined && (
                                  <button
                                    onClick={() => handleSandboxSubmit(q.id)}
                                    className="px-6 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all cursor-pointer"
                                  >
                                    Verify Answer
                                  </button>
                                )}
                              </div>

                              {isSubmitted && (
                                <div className="bg-bg-secondary p-4 rounded-xl border border-border/60 text-xs text-text-secondary leading-relaxed w-full">
                                  <strong className="text-primary block font-bold mb-1">Answer Key Rationale:</strong>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Sandbox Pagination Controls */}
                  {filteredSandboxQuestions.length > sandboxPageSize && (
                    <div className="flex justify-between items-center max-w-xs mx-auto pt-6">
                      <button
                        disabled={sandboxPage === 0}
                        onClick={() => setSandboxPage(prev => prev - 1)}
                        className={`p-2.5 rounded-xl border border-border bg-white text-text-secondary transition-all ${sandboxPage === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:border-primary cursor-pointer'}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <span className="text-xs font-mono font-bold text-text-secondary">
                        PAGE {sandboxPage + 1} OF {Math.ceil(filteredSandboxQuestions.length / sandboxPageSize)}
                      </span>

                      <button
                        disabled={(sandboxPage + 1) * sandboxPageSize >= filteredSandboxQuestions.length}
                        onClick={() => setSandboxPage(prev => prev + 1)}
                        className={`p-2.5 rounded-xl border border-border bg-white text-text-secondary transition-all ${(sandboxPage + 1) * sandboxPageSize >= filteredSandboxQuestions.length ? 'opacity-40 cursor-not-allowed' : 'hover:border-primary cursor-pointer'}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2 & 3: EXAM RUNTIME (10 or 50 Qs) */}
              {(mcqMode === 'exam10' || mcqMode === 'exam50') && (
                <div className="space-y-6">
                  {!examFinished ? (
                    <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
                      <div className="flex justify-between items-center border-b border-border/60 pb-3">
                        <span className="text-xs font-mono font-black text-text-tertiary">
                          EXAM ACTIVE • QUESTION {currentExamIdx + 1} OF {examQuestions.length}
                        </span>
                        <span className="text-xs font-mono font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded">
                          CURRENT SCORE: {examScore}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-300" 
                          style={{ width: `${((currentExamIdx + 1) / examQuestions.length) * 100}%` }}
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-mono font-bold uppercase">
                          {examQuestions[currentExamIdx]?.subject}
                        </span>
                        <h3 className="text-base sm:text-lg font-display font-bold text-primary leading-snug">
                          {examQuestions[currentExamIdx]?.question}
                        </h3>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {examQuestions[currentExamIdx]?.options.map((opt, oIdx) => {
                          const isSelected = selectedExamOptionIdx === oIdx;
                          const isCorrect = opt === examQuestions[currentExamIdx]?.correctAnswer;
                          
                          let optStyle = "border-border hover:border-primary/40 bg-bg-primary text-text-primary";
                          if (examSubmitted) {
                            if (isCorrect) {
                              optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 font-bold";
                            } else if (isSelected) {
                              optStyle = "border-red-500 bg-red-500/10 text-red-800 font-bold";
                            } else {
                              optStyle = "border-border/40 opacity-60 text-text-tertiary";
                            }
                          } else if (isSelected) {
                            optStyle = "border-primary bg-primary/5 text-primary font-bold";
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={examSubmitted}
                              onClick={() => handleExamOptionSelect(oIdx)}
                              className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                            >
                              <span className="leading-relaxed">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Rationale Panel */}
                      {examSubmitted && (
                        <div className="bg-bg-secondary p-5 rounded-2xl border border-border/60 space-y-1.5 text-xs">
                          <h5 className="font-black uppercase text-primary tracking-wide">Answer Explanation:</h5>
                          <p className="leading-relaxed text-text-secondary">
                            {examQuestions[currentExamIdx]?.explanation}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-3 border-t border-border/60">
                        <button
                          onClick={() => setMcqMode('sandbox')}
                          className="text-xs text-text-tertiary hover:text-primary font-bold uppercase transition-colors"
                        >
                          Quit Exam
                        </button>

                        <div className="flex gap-2">
                          {!examSubmitted ? (
                            <button
                              disabled={selectedExamOptionIdx === null}
                              onClick={submitExamAnswer}
                              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all ${
                                selectedExamOptionIdx === null ? 'bg-primary/40 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark cursor-pointer'
                              }`}
                            >
                              Submit Answer
                            </button>
                          ) : (
                            <button
                              onClick={nextExamQuestion}
                              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                            >
                              {currentExamIdx < examQuestions.length - 1 ? "Next Question" : "Finish & View Results"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Exam Finished / Results Card */
                    <div className="bg-white border border-border rounded-[2.5rem] p-8 text-center space-y-6 shadow-soft max-w-xl mx-auto">
                      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto animate-bounce">
                        <Award className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xl font-display font-black text-primary">Mock Exam Completed!</h3>
                        <p className="text-xs text-text-secondary">You have completed the dynamic AIAPGET mock test panel.</p>
                      </div>

                      <div className="max-w-xs mx-auto border border-border p-5 rounded-2xl bg-bg-primary flex justify-around">
                        <div>
                          <span className="block text-2xl font-black text-primary">{examScore}</span>
                          <span className="text-[10px] uppercase font-bold text-text-tertiary">Correct</span>
                        </div>
                        <div className="w-px bg-border h-10" />
                        <div>
                          <span className="block text-2xl font-black text-primary">
                            {Math.round((examScore / examQuestions.length) * 100)}%
                          </span>
                          <span className="text-[10px] uppercase font-bold text-text-tertiary">Accuracy</span>
                        </div>
                      </div>

                      {/* Academic Performance feedback */}
                      <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
                        {examScore / examQuestions.length >= 0.8 
                          ? "Outstanding performance! You are showing excellent command over Materia Medica, Organon of Medicine and Repertorial rubrics. Highly competitive score!"
                          : "Good effort! Practice more by reviewing the 100+ active flashcards and reading model university solved keys."
                        }
                      </p>

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => startNewExam(mcqMode)}
                          className="px-6 py-2.5 border border-border hover:border-primary text-text-secondary hover:text-primary rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Retry Exam
                        </button>
                        <button
                          onClick={() => setMcqMode('sandbox')}
                          className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Back to Sandbox
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: CLINICAL THERAPEUTICS */}
          {activeTab === 'therapeutics' && (
            <motion.div
              key="therapeutics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="max-w-3xl mx-auto text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-accent">Pathology-Therapeutics Mapping</span>
                <h2 className="text-2xl font-display font-medium text-primary">Clinical Homeopathic Boards</h2>
                <p className="text-xs text-text-secondary">
                  High-yield matching sheets connecting key physiological pathologies with deep-acting remedies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-950 border border-border rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <BookMarked className="w-5 h-5 text-accent" />
                    <h3 className="text-base font-display font-bold">Gastric &amp; Peptic Therapeutics</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Compare keynotes of polychrest remedies in acute and chronic gastrointestinal lesions:
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="border-l-2 border-primary pl-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-primary">Nux Vomica</h4>
                      <p className="text-xs text-text-secondary">Sour eructations, intense spasmodic pain, constant ineffectual urge for stool. Aggravated by mental strain, stimulants.</p>
                    </div>
                    <div className="border-l-2 border-primary/50 pl-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-primary">Pulsatilla</h4>
                      <p className="text-xs text-text-secondary">Flatulence, dry mouth with total thirstlessness, stomach feels heavy like a stone. Relieved by cold food/drinks and open air.</p>
                    </div>
                    <div className="border-l-2 border-primary/35 pl-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-primary">Arsenicum Album</h4>
                      <p className="text-xs text-text-secondary">Burning gastralgia relieved by warm drinks, intense nausea, anxiety and restlessness, thirst for sips of cold water.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-950 border border-border rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <BookMarked className="w-5 h-5 text-accent" />
                    <h3 className="text-base font-display font-bold">Rheumatologic &amp; Musculoskeletal</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Evaluate indications for acute locomotor flares and inflammatory joint pains:
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="border-l-2 border-accent pl-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-primary">Rhus Toxicodendron</h4>
                      <p className="text-xs text-text-secondary">Fibrous tissue inflammation, tearing articular pain. Aggravated by initial motion, cold damp weather; relieved by continuous motion.</p>
                    </div>
                    <div className="border-l-2 border-accent/70 pl-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-primary">Bryonia Alba</h4>
                      <p className="text-xs text-text-secondary">Serous membranes, joints swollen hot and shining. Aggravated by even the absolute minimal movement; relieved by absolute rest and hard pressure.</p>
                    </div>
                    <div className="border-l-2 border-accent/40 pl-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-primary">Ledum Palustre</h4>
                      <p className="text-xs text-text-secondary">Gouty nodosities, ascending rheumatism beginning in the lower extremities. Coldness of affected parts yet pain relieved by cold applications.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CBC HANDBOOK CALLOUT BANNER */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Interactive Lab Tool
                  </div>
                  <h3 className="text-lg font-display font-bold text-text-primary">Complete Blood Count (CBC) Diagnostic Handbook</h3>
                  <p className="text-xs text-text-secondary max-w-xl">
                    Our dynamic laboratory analyzer lets you drag sliders to see real-time pathological evaluations, miasmatic trends, and homeopathic remedy matching alongside peripheral blood smear guides and BHMS viva trainers.
                  </p>
                </div>
                <Link 
                  to="/cbc-handbook" 
                  className="px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md shadow-primary/15 transition-all cursor-pointer"
                >
                  Launch CBC Analyzer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* CLINICAL CONDITIONS HANDBOOK CALLOUT BANNER */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Comprehensive Diagnostic Guide
                  </div>
                  <h3 className="text-lg font-display font-bold text-text-primary">Clinical Conditions Handbook</h3>
                  <p className="text-xs text-text-secondary max-w-xl">
                    Explore detailed pathophysiology, clinical presentation, chronic miasmatic mapping, and keynote homeopathic therapeutics for 15 major conditions including Diabetes, Stroke, AKI, and more.
                  </p>
                </div>
                <Link 
                  to="/clinical-handbook" 
                  className="px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md shadow-primary/15 transition-all cursor-pointer"
                >
                  Open Clinical Handbook <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SUBJECT-WISE STUDY CENTER */}
          {activeTab === 'subjects' && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="max-w-3xl mx-auto text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-accent">BHMS Curriculum Navigator</span>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-primary">Subject-Wise Academic Portals</h2>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Select any B.H.M.S. academic subject to review high-yield syllabus notes, critical examination questions, clinical viva-voce keynotes, and rapid revision guides.
                </p>
              </div>

              {/* Subject Navigation Grid */}
              <div className="flex flex-wrap gap-2.5 justify-center max-w-5xl mx-auto">
                {[
                  { id: "organon", label: "Organon of Medicine" },
                  { id: "materia", label: "Materia Medica" },
                  { id: "repertory", label: "Repertory" },
                  { id: "pharmacy", label: "Homoeopathic Pharmacy" },
                  { id: "anatomy", label: "Anatomy" },
                  { id: "physiology", label: "Physiology" },
                  { id: "pathology", label: "Pathology" },
                  { id: "surgery", label: "Surgery" },
                  { id: "gynecology", label: "Gynecology & Obst." },
                  { id: "practice", label: "Practice of Medicine" }
                ].map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => {
                      setActiveSubjectId(subj.id);
                      setActiveSubjectSubTab('notes');
                    }}
                    className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider border cursor-pointer transition-all ${
                      activeSubjectId === subj.id
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/15"
                        : "bg-white border-border text-text-secondary hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {subj.label}
                  </button>
                ))}
              </div>

              {/* Subject Data Container */}
              {(() => {
                const subjectsDB: Record<string, {
                  name: string;
                  notes: { title: string; desc: string }[];
                  questions: string[];
                  viva: { q: string; a: string }[];
                  revision: string[];
                }> = {
                  organon: {
                    name: "Organon of Medicine & Philosophy",
                    notes: [
                      { title: "The Mission of a Physician", desc: "Aphorism 1 establishes that the physician's high and only mission is to restore the sick to health, to cure, as it is termed. It forbids theoretical speculations on the inner mechanism of diseases." },
                      { title: "Understanding the Vital Force", desc: "Aphorisms 9-11 define Vital Force (Dynamis) as the spirit-like force that animates the material body in health, maintaining a harmonious state. Disease is initiated solely by dynamic derangements of this vital principle." },
                      { title: "Primary vs. Secondary Action", desc: "Aphorisms 59-65 explain that every medicine produces a primary action (the drug effect on the vital force) followed by a secondary counter-action (the reaction of the vital force, either counteractive or curative)." }
                    ],
                    questions: [
                      "What is the therapeutic law of nature? Elaborate on how Hahnemann discovered it.",
                      "Discuss the classification of chronic diseases as described in the Organon.",
                      "Contrast classical Centesimal, Decimal, and LM scales of potentization."
                    ],
                    viva: [
                      { q: "What is Aphorism 1?", a: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed." },
                      { q: "What is the difference between Aphorism 26 and Aphorism 5?", a: "Aphorism 26 details the therapeutic law of nature (a weaker dynamic affection is permanently extinguished by a stronger, similar one), while Aphorism 5 focuses on the exciting and fundamental causes of chronic diseases." },
                      { q: "What is a Nosode?", a: "A homeopathic remedy prepared from diseased tissues, secretions, or discharges, e.g., Psorinum, Tuberculinum." }
                    ],
                    revision: [
                      "Focus on Aphorisms 1-18 for the foundational laws of Vital Force.",
                      "Review Aphorisms 72-82 for the complete classification of Acute and Chronic miasms.",
                      "Memorize the rules of drug proving in human volunteers (Aphorisms 105-145)."
                    ]
                  },
                  materia: {
                    name: "Homoeopathic Materia Medica",
                    notes: [
                      { title: "The Concept of Polycrest Remedies", desc: "Polychrests are deep, broad-acting remedies that have affinity for multiple physiological systems (e.g., Sulphur, Lycopodium, Calc-carb). They cover a wide spectrum of physical, mental, and constitutional symptoms." },
                      { title: "Vegetable vs. Mineral Kingdoms", desc: "Vegetable remedies often show high sensitivity and rapid, active symptom shifts (e.g., Pulsatilla, Aconite). Mineral remedies tend to show slower, deeper, structural, or metabolic patterns (e.g., Silicea, Natrum Mur)." }
                    ],
                    questions: [
                      "Discuss the physical generals, mental keynotes, and modalities of Lycopodium Clavatum.",
                      "Differentiate between Apis Mellifica and Lachesis Mutus in acute inflammatory conditions.",
                      "Elaborate on the 'triad of burning remedies' in Homoeopathic Materia Medica."
                    ],
                    viva: [
                      { q: "What is the key difference between Arsenicum and Phosphorus in thirst?", a: "Arsenicum craves warm sips of water frequently, whereas Phosphorus craves large quantities of ice-cold water, which is vomited as soon as it becomes warm in the stomach." },
                      { q: "Name three remedies with a prominent 'left-to-right' direction of symptoms.", a: "Lachesis, Sabadilla, and Sepia." },
                      { q: "What is the typical thermal relationship of Pulsatilla?", a: "Pulsatilla is a highly warm/hot remedy; the patient is aggravated by a warm room and relieved by open, cool air." }
                    ],
                    revision: [
                      "Study the 'Triad of Restlessness' remedies: Aconite, Arsenicum, and Rhus Tox.",
                      "Understand the core constitutional features of the 'Calc-carb, Lycopodium, Sulphur' trio.",
                      "Review Allen's Keynotes and Boericke's Materia Medica for quick comparative study."
                    ]
                  },
                  repertory: {
                    name: "Homoeopathic Repertory & Case Taking",
                    notes: [
                      { title: "The Art of Case Taking", desc: "Guided by Aphorisms 83-104. The practitioner must listen without interrupting, write down symptoms exactly as expressed, and observe objective signs without leading the patient." },
                      { title: "Symptom Hierarchy", desc: "Mental generals are ranked highest, followed by physical generals (sleep, thirst, appetite, thermals), and lastly, particular localized symptoms." }
                    ],
                    questions: [
                      "Detail the philosophical background and layout of Kent's Repertory.",
                      "What is Boenninghausen's Therapeutic Pocket Book concept of complete symptoms?",
                      "Differentiate between the structural arrangement of Kent's, Boger's, and Synthesis repertories."
                    ],
                    viva: [
                      { q: "What is a rubric?", a: "A rubric is a standardized symptom listed in a repertory, followed by the group of homeopathic remedies associated with it." },
                      { q: "What does a complete symptom contain?", a: "According to Boenninghausen, a complete symptom must include Location, Sensation, Modality, and Concomitant." },
                      { q: "Define Concomitant Symptom.", a: "A symptom that occurs alongside the main complaint but has no direct pathological or anatomical connection to it." }
                    ],
                    revision: [
                      "Memorize the 37 chapters of Kent's Repertory in alphabetical/structural order.",
                      "Review the grading of remedies: 3 points (Bold), 2 points (Italics), 1 point (Roman).",
                      "Practice repertorizing cases with multiple mental generals and modalities."
                    ]
                  },
                  pharmacy: {
                    name: "Homoeopathic Pharmacy & Pharmacopoeia",
                    notes: [
                      { title: "Preparation of Mother Tinctures", desc: "Mother tinctures (Q) are prepared by maceration or percolation of raw botanical materials in strong purified alcohol, following strict pharmacopoeia regulations." },
                      { title: "Trituration Process", desc: "Used for preparing insoluble dry substances like metals (e.g., Aurum, Silicea) by rubbing them in a porcelain mortar with lactose for a specific duration to reduce molecular size." }
                    ],
                    questions: [
                      "Describe the complete process of preparation of Decimal scale potencies.",
                      "Discuss the difference between German (GHP), United States (HPUS), and Indian (HPI) pharmacopoeias.",
                      "Define and explain drug proving, drug standardization, and drug dynamic action."
                    ],
                    viva: [
                      { q: "What is Succussion?", a: "The vigorous downward strokes against a resilient leather pad used during serial dilution to potentize soluble remedies." },
                      { q: "What vehicle is used for trituration?", a: "Saccharum Lactis (Milk Sugar or Lactose)." },
                      { q: "Define Placebo in Homoeopathic clinical dispensing.", a: "Non-medicinal sugar globules or lactose pills dispensed to maintain patient compliance while the previous remedy's action continues." }
                    ],
                    revision: [
                      "Learn the rules of prescription writing (Inscription, Subscription, Signatura).",
                      "Understand the sources of homeopathic drugs: Plant, Animal, Mineral, Nosodes, Sarcodes, Imponderabilia.",
                      "Memorize the legal drug licenses and legislative protocols for dispensing pharmacies."
                    ]
                  },
                  anatomy: {
                    name: "Human Anatomy",
                    notes: [
                      { title: "Coronary Blood Supply", desc: "The heart is supplied by the Left and Right Coronary Arteries, which arise from the ascending aorta. Obstruction leads to myocardial ischemia or infarction." },
                      { title: "The Portal Venous System", desc: "Formed by the union of the Superior Mesenteric and Splenic veins behind the neck of the pancreas. It carries nutrient-rich blood to the liver before reaching systemic circulation." }
                    ],
                    questions: [
                      "Describe the origin, course, relations, and branches of the Sciatic Nerve.",
                      "Detail the anatomical structures passing through the inguinal canal in males.",
                      "Discuss the boundaries, contents, and clinical significance of the Femoral Triangle."
                    ],
                    viva: [
                      { q: "Which nerve is known as the musician's nerve?", a: "The Ulnar Nerve, because it controls fine movements of the fingers." },
                      { q: "What is the weight of a normal adult liver?", a: "Approximately 1.2 to 1.5 kilograms." },
                      { q: "Name the muscles forming the Rotator Cuff.", a: "Supraspinatus, Infraspinatus, Teres Minor, and Subscapularis (SITS)." }
                    ],
                    revision: [
                      "Review cranial nerves (III, VII, IX, X) and their corresponding clinical palsies.",
                      "Study the pleural boundaries of lungs and structures of the mediastinum.",
                      "Sketch the arterial supply of the brain (Circle of Willis)."
                    ]
                  },
                  physiology: {
                    name: "Human Physiology & Biochemistry",
                    notes: [
                      { title: "Glomerular Filtration Rate (GFR)", desc: "The volume of fluid filtered from the renal glomerular capillaries into the Bowman's capsule per unit time. Normal GFR is approximately 125 ml/min." },
                      { title: "The Cardiac Cycle Phases", desc: "Divided into Systole (isovolumetric contraction, ventricular ejection) and Diastole (isovolumetric relaxation, rapid filling, atrial systole), taking roughly 0.8 seconds." }
                    ],
                    questions: [
                      "Discuss the oxygen-hemoglobin dissociation curve and factors shifting it to the right.",
                      "Detail the mechanism of neuromuscular transmission at the skeletal neuromuscular junction.",
                      "Elaborate on the hormonal regulation of blood calcium levels by PTH and Calcitonin."
                    ],
                    viva: [
                      { q: "What is the normal pH of human blood?", a: "Strictly regulated between 7.35 and 7.45." },
                      { q: "Which hormone is responsible for the ejection of milk?", a: "Oxytocin, secreted by the posterior pituitary." },
                      { q: "What is the primary pacemaker of the human heart?", a: "The Sinoatrial (SA) Node, located in the right atrium." }
                    ],
                    revision: [
                      "Study the cardiac conduction pathway and normal ECG wave relationships.",
                      "Review digestion and absorption mechanisms of lipids in the small intestine.",
                      "Review the blood coagulation cascade (Intrinsic, Extrinsic, and Common pathways)."
                    ]
                  },
                  pathology: {
                    name: "Pathology & Microbiology",
                    notes: [
                      { title: "Infarction and Coagulative Necrosis", desc: "A type of accidental cell death caused by ischemia or infarction. The structural outline of the tissue is preserved for several days while protein denaturation occurs." },
                      { title: "Pathogenesis of Lobar Pneumonia", desc: "Characterized by four distinct stages: Congestion (Day 1-2), Red Hepatization (Day 3-4), Gray Hepatization (Day 5-7), and Resolution (Day 8-21)." }
                    ],
                    questions: [
                      "Describe the steps of acute inflammation, including vascular changes and cellular events.",
                      "Discuss the etiology, laboratory diagnosis, and complications of Typhoid Fever.",
                      "Detail the differences between benign and malignant neoplasms."
                    ],
                    viva: [
                      { q: "What are the hallmarks of chronic inflammation?", a: "Infiltration with mononuclear cells (macrophages, lymphocytes, plasma cells), tissue destruction, and attempts at healing (angiogenesis, fibrosis)." },
                      { q: "Which immunoglobulins are involved in Type I Hypersensitivity?", a: "IgE antibodies, which bind to mast cells and trigger histamine release." },
                      { q: "What is the causative agent of Tuberculosis?", a: "Mycobacterium tuberculosis, an acid-fast bacillus." }
                    ],
                    revision: [
                      "Review the microscopic difference between apoptosis and necrosis.",
                      "Understand cellular adaptation patterns: Hypertrophy, Hyperplasia, Atrophy, Metaplasia, Dysplasia.",
                      "Review serological tests for enteric fever (Widal test) and rheumatoid factor."
                    ]
                  },
                  surgery: {
                    name: "Surgery & Systemic Therapeutics",
                    notes: [
                      { title: "Classification of Appendicitis", desc: "Begins as acute focal appendicitis, progressing to gangrenous, suppurative, and perforated appendicitis if surgical intervention is delayed." },
                      { title: "The Glasgow Coma Scale (GCS)", desc: "A clinical scale used to assess a patient's level of consciousness after head injury. It scores Eye (1-4), Verbal (1-5), and Motor (1-6) responses (GCS 3 to 15)." }
                    ],
                    questions: [
                      "Discuss the clinical features, etiology, diagnosis, and surgical management of acute Cholecystitis.",
                      "Describe the pathophysiology, staging, and diagnostic approach of breast carcinomas.",
                      "Detail the fluid resuscitation protocol (Parkland Formula) in major burn patients."
                    ],
                    viva: [
                      { q: "What is McBurney's Point?", a: "A point located one-third of the distance from the anterior superior iliac spine (ASIS) to the umbilicus; site of maximum tenderness in acute appendicitis." },
                      { q: "What is the classic triad of intestinal obstruction?", a: "Abdominal pain, distension, vomiting, and absolute constipation." },
                      { q: "Define direct vs. indirect inguinal hernia.", a: "Direct hernias protrude through Hesselbach's triangle medial to inferior epigastric vessels; indirect hernias pass through the deep inguinal ring lateral to those vessels." }
                    ],
                    revision: [
                      "Review postoperative wound healing stages and classification of shock (hypovolemic, septic, cardiogenic).",
                      "Understand surgical asepsis, sterilization techniques, and basic anesthetic agents.",
                      "Study clinical signs of acute pancreatitis (Cullen's sign, Grey Turner's sign)."
                    ]
                  },
                  gynecology: {
                    name: "Gynecology & Obstetrics",
                    notes: [
                      { title: "Phases of the Menstrual Cycle", desc: "Consists of the Follicular (proliferative) phase, ovulation triggered by LH surge, and the Luteal (secretory) phase driven by progesterone." },
                      { title: "Preeclampsia Diagnostic Criteria", desc: "New-onset hypertension (BP >= 140/90) after 20 weeks of gestation accompanied by proteinuria, platelet deficiency, or renal/hepatic impairment." }
                    ],
                    questions: [
                      "Describe the stages of normal labor and active management of the third stage.",
                      "Discuss the clinical features, diagnostic workup, and complications of Polycystic Ovarian Syndrome (PCOS).",
                      "Detail the etiology, symptoms, and emergency management of Ectopic Pregnancy rupture."
                    ],
                    viva: [
                      { q: "What is the duration of a normal pregnancy?", a: "Approximately 280 days or 40 weeks from the first day of the last menstrual period (LMP)." },
                      { q: "What is Placenta Previa?", a: "A condition where the placenta implants in the lower uterine segment, partially or completely covering the internal cervical os, causing painless bleeding." },
                      { q: "Name three major symptoms of Endometriosis.", a: "Dysmenorrhea, dyspareunia, and chronic pelvic pain." }
                    ],
                    revision: [
                      "Review physiological maternal changes during normal pregnancy.",
                      "Memorize the APGAR score system for evaluating newborn infants at 1 and 5 minutes.",
                      "Study common homeopathic therapeutics for labor arrest and severe postpartum hemorrhage."
                    ]
                  },
                  practice: {
                    name: "Practice of Medicine & Therapeutics",
                    notes: [
                      { title: "Type 2 Diabetes Mellitus Patophysiology", desc: "Characterized by insulin resistance in skeletal muscles and adipose tissue combined with relative beta-cell secretory defect, leading to chronic hyperglycemia." },
                      { title: "Management of Essential Hypertension", desc: "Sustained elevation of systemic arterial pressure (>= 130/80) requiring lifestyle modifications and systemic screening for target organ damage (retina, kidneys, brain)." }
                    ],
                    questions: [
                      "Discuss the clinical features, diagnosis, classification, and homeopathic management of Bronchial Asthma.",
                      "Describe the pathophysiology, diagnostic criteria, and management of Rheumatic Heart Disease.",
                      "Detail the clinical approach, staging, and lab findings in Chronic Kidney Disease (CKD)."
                    ],
                    viva: [
                      { q: "What is the clinical presentation of Myocardial Infarction?", a: "Severe, crushing retrosternal chest pain radiating to left arm/jaw, unrelieved by rest or nitrites, accompanied by diaphoresis and dyspnea." },
                      { q: "What are the key diagnostic features of Pulmonary Tuberculosis?", a: "Chronic cough for over 2 weeks, hemoptysis, night sweats, low-grade evening fever, weight loss, and acid-fast bacilli on sputum smear." },
                      { q: "Define Asthma-COPD Overlap Syndrome.", a: "A clinical syndrome characterized by persistent airflow limitation with several features associated with both asthma and COPD." }
                    ],
                    revision: [
                      "Understand the clinical interpretation of liver function tests and renal clearance tests.",
                      "Review the stages of heart failure (NYHA classification) and acute pulmonary edema signs.",
                      "Practice matching clinical symptoms with deep antipsoric and antisycotic polychrest remedies."
                    ]
                  }
                };

                const currentSubject = subjectsDB[activeSubjectId] || subjectsDB.organon;

                return (
                  <div className="bg-white dark:bg-gray-950 border border-border rounded-[2.5rem] p-8 md:p-12 shadow-soft space-y-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="border-b border-border/60 pb-6">
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">
                        Active Syllabus Module
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-primary mt-1">
                        {currentSubject.name}
                      </h3>
                    </div>

                    {/* Sub Tab Buttons */}
                    <div className="flex gap-2.5 border-b border-border/40 pb-4 max-w-lg">
                      {[
                        { id: 'notes', label: 'High-Yield Notes' },
                        { id: 'important', label: 'Exam Questions' },
                        { id: 'viva', label: 'Viva-Voce Keys' },
                        { id: 'revision', label: 'Revision Guide' }
                      ].map((subTab) => (
                        <button
                          key={subTab.id}
                          onClick={() => setActiveSubjectSubTab(subTab.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
                            activeSubjectSubTab === subTab.id
                              ? "bg-primary/10 text-primary"
                              : "text-text-secondary hover:text-primary hover:bg-bg-secondary"
                          }`}
                        >
                          {subTab.label}
                        </button>
                      ))}
                    </div>

                    {/* Sub Tab Viewport */}
                    <div className="min-h-[250px] pt-4">
                      {/* Sub-tab 1: Notes */}
                      {activeSubjectSubTab === 'notes' && (
                        <div className="space-y-6">
                          {currentSubject.notes.map((note, i) => (
                            <div key={i} className="p-6 bg-bg-secondary border border-border/50 rounded-2xl space-y-2">
                              <h4 className="text-sm font-black text-primary uppercase tracking-tight flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                                  {i + 1}
                                </span>
                                {note.title}
                              </h4>
                              <p className="text-xs md:text-sm text-text-secondary leading-relaxed pl-7">
                                {note.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub-tab 2: Important Questions */}
                      {activeSubjectSubTab === 'important' && (
                        <div className="space-y-4">
                          <p className="text-xs text-text-tertiary italic font-medium mb-2">
                            Highly repeating questions in major BHMS University examination papers:
                          </p>
                          {currentSubject.questions.map((q, i) => (
                            <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-border rounded-xl flex items-start gap-4">
                              <div className="p-2 bg-red-500/10 text-red-600 rounded-lg text-xs font-black uppercase tracking-wider">
                                Essay Q
                              </div>
                              <p className="text-xs md:text-sm font-bold text-text-primary mt-1">
                                {q}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub-tab 3: Viva Voce */}
                      {activeSubjectSubTab === 'viva' && (
                        <div className="space-y-6">
                          {currentSubject.viva.map((v, i) => (
                            <div key={i} className="space-y-2 border-l-2 border-accent pl-5">
                              <span className="text-[10px] font-black text-accent uppercase tracking-widest block">
                                Examiner Question {i + 1}
                              </span>
                              <h5 className="text-xs md:text-sm font-bold text-text-primary">
                                "{v.q}"
                              </h5>
                              <p className="text-xs text-text-secondary italic font-serif leading-relaxed">
                                <strong className="text-primary not-italic font-sans font-bold block mb-1">Model Student Answer:</strong>
                                {v.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sub-tab 4: Revision Guide */}
                      {activeSubjectSubTab === 'revision' && (
                        <div className="p-6 bg-[#10B981]/5 border border-[#10B981]/15 rounded-2xl space-y-4">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#10B981] animate-pulse" />
                            <h4 className="text-sm font-black text-[#10B981] uppercase tracking-wider">
                              Topic-wise High Yield Revision Checklist
                            </h4>
                          </div>
                          <ul className="space-y-3 pl-1">
                            {currentSubject.revision.map((rev, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-text-secondary leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                                <span>{rev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
