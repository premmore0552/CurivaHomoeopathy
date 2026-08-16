import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Heart,
  Activity,
  Cpu,
  GraduationCap,
  CheckCircle,
  Clock,
  Flame,
  Target,
  Award,
  Search,
  Printer,
  Bookmark,
  Sparkles,
  Zap,
  Brain,
  ChevronRight,
  ChevronLeft,
  Play,
  RefreshCw,
  FileText,
  Layers,
  Calendar,
  HelpCircle,
  Check,
  X,
  Share2,
  FileCheck,
  Lightbulb,
  AlertTriangle,
  Stethoscope,
  List,
  Edit3,
  BarChart2,
  Lock,
  Download,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CRASH_COURSE_MODULES,
  EXAMINATION_HUB_DATA,
  REVISION_SCHEDULE,
  Module,
  Topic,
  PYQ,
  VivaQuestion,
  MCQ
} from '../data/firstBhmsCrashCourseData';

type StudyMode = 'learn' | 'revision' | 'exam' | 'viva' | 'mcq';
type MainTab = 'curriculum' | 'exam-hub' | 'revision-system' | 'planner' | 'bookmarks';

export default function FirstBhmsCrashCourse() {
  // Main view state
  const [activeTab, setActiveTab] = useState<MainTab>('curriculum');
  const [studyMode, setStudyMode] = useState<StudyMode>('learn');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('anatomy');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('general-anatomy');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persistence state
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('curiva_first_bhms_completed_topics');
      return saved ? JSON.parse(saved) : ['general-anatomy'];
    } catch {
      return ['general-anatomy'];
    }
  });

  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('curiva_first_bhms_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userNotes, setUserNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('curiva_first_bhms_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('curiva_first_bhms_daily_goal');
      return saved ? parseInt(saved, 10) : 2;
    } catch {
      return 2;
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('curiva_first_bhms_streak');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  // Certificate Modal
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [studentName, setStudentName] = useState('BHMS Scholar');

  // Interactive Quiz State
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<Record<string, boolean>>({});

  // Active Lesson sub-tab
  const [lessonSubTab, setLessonSubTab] = useState<'content' | 'pyq' | 'viva' | 'mcq' | 'summary' | 'notes'>('content');

  // Save progress changes
  useEffect(() => {
    localStorage.setItem('curiva_first_bhms_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  useEffect(() => {
    localStorage.setItem('curiva_first_bhms_bookmarks', JSON.stringify(bookmarkedTopicIds));
  }, [bookmarkedTopicIds]);

  useEffect(() => {
    localStorage.setItem('curiva_first_bhms_notes', JSON.stringify(userNotes));
  }, [userNotes]);

  useEffect(() => {
    localStorage.setItem('curiva_first_bhms_daily_goal', String(dailyGoal));
  }, [dailyGoal]);

  // Derived Statistics
  const allTopics = useMemo(() => {
    const list: { module: Module; topic: Topic }[] = [];
    CRASH_COURSE_MODULES.forEach((mod) => {
      mod.topics.forEach((top) => {
        list.push({ module: mod, topic: top });
      });
    });
    return list;
  }, []);

  const totalTopicsCount = allTopics.length;
  const completedCount = completedTopicIds.length;
  const overallProgressPercentage = Math.round((completedCount / totalTopicsCount) * 100);

  const completedModulesCount = useMemo(() => {
    return CRASH_COURSE_MODULES.filter((mod) =>
      mod.topics.every((t) => completedTopicIds.includes(t.id))
    ).length;
  }, [completedTopicIds]);

  const totalCourseHours = useMemo(() => {
    return allTopics.reduce((acc, curr) => acc + curr.topic.estimatedHours, 0);
  }, [allTopics]);

  const hoursRemaining = useMemo(() => {
    const remaining = allTopics.filter((item) => !completedTopicIds.includes(item.topic.id));
    return remaining.reduce((acc, curr) => acc + curr.topic.estimatedHours, 0);
  }, [allTopics, completedTopicIds]);

  // Currently selected module and topic
  const currentModule = useMemo(() => {
    return CRASH_COURSE_MODULES.find((m) => m.id === selectedModuleId) || CRASH_COURSE_MODULES[0];
  }, [selectedModuleId]);

  const currentTopic = useMemo(() => {
    return (
      currentModule.topics.find((t) => t.id === selectedTopicId) || currentModule.topics[0]
    );
  }, [currentModule, selectedTopicId]);

  // Handle toggling topic completion
  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  // Handle toggling bookmark
  const toggleBookmark = (topicId: string) => {
    setBookmarkedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  // Handle Note Save
  const handleNoteChange = (topicId: string, text: string) => {
    setUserNotes((prev) => ({ ...prev, [topicId]: text }));
  };

  // Filter topics for search
  const filteredSearchTopics = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allTopics.filter(
      ({ topic, module }) =>
        topic.title.toLowerCase().includes(query) ||
        topic.subtitle.toLowerCase().includes(query) ||
        module.title.toLowerCase().includes(query) ||
        topic.lessonContent.highYieldPoints.some((p) => p.toLowerCase().includes(query))
    );
  }, [allTopics, searchQuery]);

  // Handle Navigate to Next Topic
  const navigateToNextTopic = () => {
    const nextRec = currentTopic.lessonContent.recommendedNextTopic;
    if (nextRec) {
      setSelectedModuleId(nextRec.moduleId);
      setSelectedTopicId(nextRec.topicId);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-20">
      <Helmet>
        <title>First BHMS Crash Course | Curiva Homoeopathy</title>
        <meta
          name="description"
          content="Complete First BHMS syllabus through concise, high-yield, exam-focused lessons with integrated revision, viva practice, PYQs, MCQs, and self-assessment."
        />
      </Helmet>

      {/* Hero Banner Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-bg-secondary to-accent/5 border-b border-primary/10 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curiva Flagship Program</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-text-primary tracking-tight leading-tight">
                First BHMS <span className="text-primary">Crash Course</span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
                🎯 <strong className="text-text-primary">Objective:</strong> Complete the entire First BHMS syllabus through concise, high-yield, exam-focused lessons with integrated revision and self-assessment.
              </p>

              {/* Guided Journey Pill */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-text-secondary">
                <span className="text-primary font-bold">Guided Journey:</span>
                <span className="px-2.5 py-1 rounded-lg bg-bg-secondary border border-border/50">1. Learn</span>
                <ChevronRight className="w-3 h-3 text-text-tertiary" />
                <span className="px-2.5 py-1 rounded-lg bg-bg-secondary border border-border/50">2. Visualize</span>
                <ChevronRight className="w-3 h-3 text-text-tertiary" />
                <span className="px-2.5 py-1 rounded-lg bg-bg-secondary border border-border/50">3. Revise</span>
                <ChevronRight className="w-3 h-3 text-text-tertiary" />
                <span className="px-2.5 py-1 rounded-lg bg-bg-secondary border border-border/50">4. Test</span>
                <ChevronRight className="w-3 h-3 text-text-tertiary" />
                <span className="px-2.5 py-1 rounded-lg bg-bg-secondary border border-border/50">5. Apply</span>
              </div>
            </div>

            {/* Quick Actions / Certificate Launch */}
            <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Award className="w-4 h-4" />
                <span>Completion Certificate</span>
                {overallProgressPercentage === 100 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white text-accent uppercase font-black">
                    Unlocked
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('exam-hub')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-bg-secondary hover:bg-primary/10 border border-border text-xs font-bold text-text-primary transition-all"
                >
                  <Target className="w-4 h-4 text-primary" />
                  <span>Exam Hub</span>
                </button>
                <button
                  onClick={() => setActiveTab('planner')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-bg-secondary hover:bg-primary/10 border border-border text-xs font-bold text-text-primary transition-all"
                >
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Planner</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-text-tertiary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, keynotes, aphorisms, or remedies across all 6 modules..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-bg-secondary border border-border/80 focus:border-primary text-sm focus:outline-none shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-text-tertiary hover:text-text-primary p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Dropdown Results */}
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-border rounded-2xl shadow-xl z-30 max-h-80 overflow-y-auto p-3 space-y-2">
                <p className="text-xs font-bold text-text-tertiary uppercase px-3 py-1">
                  Search Results ({filteredSearchTopics.length})
                </p>
                {filteredSearchTopics.length === 0 ? (
                  <p className="text-xs text-text-secondary px-3 py-2">No matching topics found.</p>
                ) : (
                  filteredSearchTopics.map(({ module, topic }) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedModuleId(module.id);
                        setSelectedTopicId(topic.id);
                        setActiveTab('curriculum');
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary">{module.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                            {topic.lessonContent.difficulty}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-text-secondary line-clamp-1">{topic.subtitle}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Dashboard Stat Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {/* Progress Ring Card */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2 bg-bg-secondary border border-border/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-border"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary"
                  strokeDasharray={`${overallProgressPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-text-primary">
                {overallProgressPercentage}%
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Overall Progress</p>
              <h3 className="text-lg font-black text-text-primary">
                {completedCount} / {totalTopicsCount} <span className="text-xs font-normal text-text-secondary">Topics</span>
              </h3>
              <p className="text-[11px] text-primary font-semibold mt-0.5">
                {overallProgressPercentage === 100 ? '🎉 Course Completed!' : `${totalTopicsCount - completedCount} topics remaining`}
              </p>
            </div>
          </div>

          {/* Subjects Completed */}
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-tertiary uppercase">Subjects</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-2">
              <h4 className="text-2xl font-black text-text-primary">{completedModulesCount} / 6</h4>
              <p className="text-[11px] text-text-secondary font-medium">Subjects Mastered</p>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-tertiary uppercase">Daily Goal</span>
              <Target className="w-4 h-4 text-accent" />
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-black text-text-primary">{dailyGoal}</h4>
                <span className="text-xs text-text-secondary font-medium">topics/day</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <button
                  onClick={() => setDailyGoal((g) => Math.max(1, g - 1))}
                  className="w-5 h-5 rounded bg-bg-primary text-text-primary text-xs font-bold flex items-center justify-center border hover:border-primary"
                >
                  -
                </button>
                <button
                  onClick={() => setDailyGoal((g) => g + 1)}
                  className="w-5 h-5 rounded bg-bg-primary text-text-primary text-xs font-bold flex items-center justify-center border hover:border-primary"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Modules */}
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-tertiary uppercase">Modules</span>
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <h4 className="text-2xl font-black text-text-primary">6</h4>
              <p className="text-[11px] text-text-secondary font-medium">Syllabus Modules</p>
            </div>
          </div>

          {/* Hours Remaining */}
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-tertiary uppercase">Est. Time</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2">
              <h4 className="text-2xl font-black text-text-primary">{hoursRemaining} hrs</h4>
              <p className="text-[11px] text-text-secondary font-medium">Remaining</p>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-tertiary uppercase">Streak</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="mt-2">
              <h4 className="text-2xl font-black text-orange-500">{streakDays} Days</h4>
              <p className="text-[11px] text-text-secondary font-medium">Active Study</p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border pb-4">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === 'curriculum'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Syllabus & Lessons</span>
            </button>

            <button
              onClick={() => setActiveTab('exam-hub')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === 'exam-hub'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Examination Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('revision-system')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === 'revision-system'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Revision System</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === 'planner'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Study Planner</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === 'bookmarks'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks ({bookmarkedTopicIds.length})</span>
            </button>
          </div>

          {/* Study Modes Switcher */}
          {activeTab === 'curriculum' && (
            <div className="flex items-center gap-1 bg-bg-secondary p-1 rounded-xl border border-border shrink-0 self-start sm:self-auto overflow-x-auto">
              <span className="text-[10px] font-bold text-text-tertiary uppercase px-2 hidden lg:inline">Mode:</span>
              <button
                onClick={() => setStudyMode('learn')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'learn' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📖 Learn</span>
              </button>

              <button
                onClick={() => setStudyMode('revision')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'revision' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>⚡ Revision</span>
              </button>

              <button
                onClick={() => setStudyMode('exam')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'exam' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>🎯 Exam</span>
              </button>

              <button
                onClick={() => setStudyMode('viva')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'viva' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>🗣 Viva</span>
              </button>

              <button
                onClick={() => setStudyMode('mcq')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  studyMode === 'mcq' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>📝 MCQ</span>
              </button>
            </div>
          )}
        </div>

        {/* MAIN TAB CONTENT AREA */}

        {/* 1. SYLLABUS & LESSONS (CURRICULUM) TAB */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Module & Topic Directory (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-bg-secondary border border-border/80 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    <span>Syllabus Modules</span>
                  </h3>
                  <span className="text-xs font-bold text-text-tertiary">
                    {completedCount} / {totalTopicsCount} Done
                  </span>
                </div>

                {/* Module Selector Accordion */}
                <div className="space-y-3">
                  {CRASH_COURSE_MODULES.map((module) => {
                    const isSelectedMod = module.id === selectedModuleId;
                    const modCompletedCount = module.topics.filter((t) =>
                      completedTopicIds.includes(t.id)
                    ).length;
                    const modTotalCount = module.topics.length;
                    const modProgress = Math.round((modCompletedCount / modTotalCount) * 100);

                    return (
                      <div
                        key={module.id}
                        className={`rounded-xl border transition-all overflow-hidden ${
                          isSelectedMod
                            ? 'bg-bg-primary border-primary/40 shadow-sm'
                            : 'bg-bg-secondary border-border/60 hover:border-border'
                        }`}
                      >
                        {/* Module Header Button */}
                        <button
                          onClick={() => {
                            setSelectedModuleId(module.id);
                            if (module.topics.length > 0) {
                              setSelectedTopicId(module.topics[0].id);
                            }
                          }}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black border ${module.badgeColor}`}>
                              {module.code}
                            </span>
                            <div>
                              <h4 className="text-sm font-extrabold text-text-primary group-hover:text-primary transition-colors">
                                {module.title}
                              </h4>
                              <p className="text-[11px] text-text-tertiary">
                                {modCompletedCount} of {modTotalCount} topics completed
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-secondary">{modProgress}%</span>
                            <ChevronRight
                              className={`w-4 h-4 text-text-tertiary transition-transform ${
                                isSelectedMod ? 'rotate-90 text-primary' : ''
                              }`}
                            />
                          </div>
                        </button>

                        {/* Module Progress Bar */}
                        <div className="w-full bg-border/40 h-1">
                          <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${modProgress}%` }}
                          />
                        </div>

                        {/* Topics List when Module is Selected */}
                        {isSelectedMod && (
                          <div className="p-2 bg-bg-secondary/50 space-y-1.5 border-t border-border/40">
                            {module.topics.map((topic) => {
                              const isSelectedTopic = topic.id === selectedTopicId;
                              const isCompleted = completedTopicIds.includes(topic.id);
                              const isBookmarked = bookmarkedTopicIds.includes(topic.id);

                              return (
                                <div
                                  key={topic.id}
                                  onClick={() => setSelectedTopicId(topic.id)}
                                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between gap-2 border cursor-pointer ${
                                    isSelectedTopic
                                      ? 'bg-primary text-white font-bold border-primary shadow-sm'
                                      : 'bg-bg-secondary text-text-primary border-transparent hover:bg-bg-primary'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTopicCompletion(topic.id);
                                      }}
                                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                                        isCompleted
                                          ? isSelectedTopic
                                            ? 'bg-white text-primary border-white'
                                            : 'bg-primary text-white border-primary'
                                          : isSelectedTopic
                                          ? 'border-white/60'
                                          : 'border-border hover:border-primary'
                                      }`}
                                    >
                                      {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                                    </button>
                                    <span className="truncate">{topic.title}</span>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {isBookmarked && (
                                      <Bookmark className={`w-3 h-3 ${isSelectedTopic ? 'text-white' : 'text-accent'}`} />
                                    )}
                                    <span
                                      className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                                        isSelectedTopic
                                          ? 'bg-white/20 text-white'
                                          : 'bg-bg-primary text-text-tertiary border border-border'
                                      }`}
                                    >
                                      {topic.lessonContent.difficulty}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Lesson Display Area (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Lesson Title Header Card */}
              <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${currentModule.badgeColor}`}>
                      {currentModule.code}
                    </span>
                    <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
                      {currentModule.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => toggleBookmark(currentTopic.id)}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                        bookmarkedTopicIds.includes(currentTopic.id)
                          ? 'bg-accent/10 border-accent/30 text-accent'
                          : 'bg-bg-primary border-border text-text-secondary hover:text-text-primary'
                      }`}
                      title="Bookmark this topic"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {bookmarkedTopicIds.includes(currentTopic.id) ? 'Bookmarked' : 'Bookmark'}
                      </span>
                    </button>

                    {/* Completion Checkbox */}
                    <button
                      onClick={() => toggleTopicCompletion(currentTopic.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        completedTopicIds.includes(currentTopic.id)
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                          : 'bg-bg-primary border-border text-text-secondary hover:border-primary'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{completedTopicIds.includes(currentTopic.id) ? 'Completed' : 'Mark as Done'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-text-primary">
                    {currentTopic.title}
                  </h2>
                  <p className="text-sm text-text-secondary mt-1 font-sans">{currentTopic.subtitle}</p>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-text-tertiary pt-2 border-t border-border/40">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{currentTopic.lessonContent.readingTimeMinutes} min read</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Difficulty: <strong className="text-text-primary">{currentTopic.lessonContent.difficulty}</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Est. Hours: <strong className="text-text-primary">{currentTopic.estimatedHours} hrs</strong></span>
                  </div>
                </div>
              </div>

              {/* Study Mode View Switching */}

              {/* STUDY MODE 1: 📖 LEARN MODE */}
              {studyMode === 'learn' && (
                <div className="space-y-6">
                  
                  {/* Lesson Sub-Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-2">
                    <button
                      onClick={() => setLessonSubTab('content')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        lessonSubTab === 'content'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      📖 Main Content
                    </button>
                    <button
                      onClick={() => setLessonSubTab('pyq')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        lessonSubTab === 'pyq'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      📝 PYQs ({currentTopic.pyqs.length})
                    </button>
                    <button
                      onClick={() => setLessonSubTab('viva')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        lessonSubTab === 'viva'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      🗣 Viva ({currentTopic.vivaQuestions.length})
                    </button>
                    <button
                      onClick={() => setLessonSubTab('mcq')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        lessonSubTab === 'mcq'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      🎯 Quiz ({currentTopic.mcqs.length})
                    </button>
                    <button
                      onClick={() => setLessonSubTab('summary')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        lessonSubTab === 'summary'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      ⚡ 1-Page Summary
                    </button>
                    <button
                      onClick={() => setLessonSubTab('notes')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        lessonSubTab === 'notes'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      ✍️ My Notes
                    </button>
                  </div>

                  {/* Sub-Tab 1: Main Content */}
                  {lessonSubTab === 'content' && (
                    <div className="space-y-6">
                      
                      {/* Learning Objectives */}
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>Learning Objectives</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-text-primary">
                          {currentTopic.lessonContent.learningObjectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* High-Yield Points */}
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          <span>High-Yield Exam Points</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-2.5">
                          {currentTopic.lessonContent.highYieldPoints.map((point, i) => (
                            <div key={i} className="bg-bg-secondary p-3 rounded-xl border border-amber-500/20 text-xs sm:text-sm font-medium text-text-primary flex items-start gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-[10px] shrink-0 mt-0.5">HY #{i+1}</span>
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Materia Medica Special Details Card if remedy */}
                      {currentTopic.lessonContent.remedyDetails && (
                        <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-6">
                          <div className="border-b border-border pb-4">
                            <span className="text-xs font-bold text-accent uppercase tracking-wider">Materia Medica Keynote Profile</span>
                            <h3 className="text-xl font-bold text-text-primary mt-1">
                              {currentTopic.title} ({currentTopic.lessonContent.remedyDetails.identity.commonName})
                            </h3>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                            <div className="bg-bg-primary p-3 rounded-xl border border-border">
                              <span className="text-text-tertiary block">Family</span>
                              <strong className="text-text-primary">{currentTopic.lessonContent.remedyDetails.identity.family}</strong>
                            </div>
                            <div className="bg-bg-primary p-3 rounded-xl border border-border">
                              <span className="text-text-tertiary block">Prover</span>
                              <strong className="text-text-primary">{currentTopic.lessonContent.remedyDetails.identity.prover}</strong>
                            </div>
                            <div className="bg-bg-primary p-3 rounded-xl border border-border">
                              <span className="text-text-tertiary block">Source</span>
                              <strong className="text-text-primary">{currentTopic.lessonContent.remedyDetails.identity.source}</strong>
                            </div>
                          </div>

                          {/* Guiding Keynotes */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-text-tertiary uppercase">Guiding Keynotes</h4>
                            <div className="space-y-1.5">
                              {currentTopic.lessonContent.remedyDetails.keynotes.map((kn, idx) => (
                                <div key={idx} className="p-2.5 rounded-lg bg-bg-primary border border-border text-xs text-text-primary font-medium flex items-start gap-2">
                                  <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                                  <span>{kn}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Modalities Table */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-2">
                              <h5 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">Aggravation (&lt;)</h5>
                              <ul className="text-xs space-y-1 text-text-primary">
                                {currentTopic.lessonContent.remedyDetails.modalities.aggravation.map((agg, idx) => (
                                  <li key={idx}>• {agg}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                              <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Amelioration (&gt;)</h5>
                              <ul className="text-xs space-y-1 text-text-primary">
                                {currentTopic.lessonContent.remedyDetails.modalities.amelioration.map((amel, idx) => (
                                  <li key={idx}>• {amel}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Concept Builder / Detailed Explanation */}
                      <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-6">
                        <div className="border-b border-border/60 pb-3">
                          <h3 className="text-base font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span>Concept Builder &amp; Detailed Explanation</span>
                          </h3>
                        </div>

                        <p className="text-sm text-text-primary leading-relaxed font-sans">
                          {currentTopic.lessonContent.conceptBuilder.introduction}
                        </p>

                        {currentTopic.lessonContent.conceptBuilder.sections.map((sec, i) => (
                          <div key={i} className="space-y-3 pt-2">
                            <h4 className="text-base font-bold text-text-primary">{sec.title}</h4>
                            <p className="text-sm text-text-secondary leading-relaxed font-sans">{sec.content}</p>

                            {sec.bullets && (
                              <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-text-primary list-disc">
                                {sec.bullets.map((b, idx) => (
                                  <li key={idx}>{b}</li>
                                ))}
                              </ul>
                            )}

                            {sec.table && (
                              <div className="overflow-x-auto mt-3 border border-border rounded-xl">
                                <table className="w-full text-left text-xs">
                                  <thead className="bg-bg-primary text-text-primary font-bold border-b border-border">
                                    <tr>
                                      {sec.table.headers.map((h, hIdx) => (
                                        <th key={hIdx} className="p-3">{h}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    {sec.table.rows.map((r, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-bg-primary/50">
                                        {r.map((c, cIdx) => (
                                          <td key={cIdx} className="p-3 text-text-secondary">{c}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Flowcharts & Diagram Guides */}
                      {currentTopic.lessonContent.flowcharts.length > 0 && (
                        <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-4">
                          <h3 className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            <span>Visual Flowchart &amp; Pathway</span>
                          </h3>

                          {currentTopic.lessonContent.flowcharts.map((fc, i) => (
                            <div key={i} className="bg-bg-primary border border-border rounded-xl p-4 space-y-3">
                              <h4 className="text-sm font-bold text-text-primary">{fc.title}</h4>
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 overflow-x-auto pb-2">
                                {fc.steps.map((step, idx) => (
                                  <React.Fragment key={idx}>
                                    <div className="bg-bg-secondary border border-primary/20 p-3 rounded-lg text-xs font-semibold text-text-primary shadow-xs shrink-0 max-w-[200px]">
                                      <span className="text-[10px] text-primary font-bold block mb-0.5">Step {idx + 1}</span>
                                      {step}
                                    </div>
                                    {idx < fc.steps.length - 1 && (
                                      <ChevronRight className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Diagram Drawing Guide */}
                      {currentTopic.lessonContent.diagramGuides && (
                        <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-4">
                          <h3 className="text-xs font-extrabold text-accent uppercase tracking-wider flex items-center gap-2">
                            <Edit3 className="w-4 h-4" />
                            <span>Important Exam Diagram Guide</span>
                          </h3>

                          {currentTopic.lessonContent.diagramGuides.map((dg, i) => (
                            <div key={i} className="bg-accent/5 border border-accent/20 rounded-xl p-5 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-text-primary">{dg.title}</h4>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-accent/20 text-accent">
                                  Exam Diagram
                                </span>
                              </div>
                              <p className="text-xs text-text-secondary">{dg.description}</p>

                              <div className="space-y-1">
                                <span className="text-xs font-bold text-text-tertiary">Key Labels to Include:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {dg.keyLabels.map((kl, idx) => (
                                    <span key={idx} className="px-2 py-1 rounded bg-bg-secondary border border-border text-[11px] font-bold text-text-primary">
                                      ✓ {kl}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-bg-secondary p-3 rounded-lg border border-border text-xs text-text-primary">
                                <strong className="text-accent">Exam Tip:</strong> {dg.examTip}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Memory Tricks / Mnemonics */}
                      {currentTopic.lessonContent.memoryTricks.length > 0 && (
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 space-y-3">
                          <h4 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            <span>Memory Tricks &amp; Mnemonics</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentTopic.lessonContent.memoryTricks.map((mt, i) => (
                              <div key={i} className="bg-bg-secondary border border-purple-500/20 p-4 rounded-xl space-y-2">
                                <span className="text-[10px] font-extrabold text-purple-500 uppercase">{mt.concept}</span>
                                <h5 className="text-sm font-black text-purple-600 dark:text-purple-300">
                                  &quot;{mt.mnemonic}&quot;
                                </h5>
                                <p className="text-xs text-text-secondary">{mt.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Common Mistakes & Pitfalls */}
                      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 space-y-3">
                        <h4 className="text-xs font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Common Mistakes &amp; Viva Pitfalls</span>
                        </h4>

                        <ul className="space-y-2 text-xs sm:text-sm text-text-primary">
                          {currentTopic.lessonContent.commonMistakes.map((cm, i) => (
                            <li key={i} className="flex items-start gap-2 bg-bg-secondary p-2.5 rounded-lg border border-red-500/20">
                              <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              <span>{cm}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Clinical Correlation */}
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 space-y-2">
                        <h4 className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                          <Stethoscope className="w-4 h-4" />
                          <span>Clinical Correlation</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-sans">
                          {currentTopic.lessonContent.clinicalCorrelation}
                        </p>
                      </div>

                      {/* FAQs */}
                      <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-4">
                        <h3 className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-primary" />
                          <span>Frequently Asked Student Doubts</span>
                        </h3>

                        <div className="space-y-3">
                          {currentTopic.lessonContent.faqs.map((faq, i) => (
                            <div key={i} className="bg-bg-primary p-4 rounded-xl border border-border space-y-1.5">
                              <h5 className="text-xs sm:text-sm font-bold text-text-primary">Q: {faq.question}</h5>
                              <p className="text-xs text-text-secondary leading-relaxed">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next Topic Recommendation Banner */}
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Recommended Next Lesson</span>
                          <h4 className="text-lg font-bold text-text-primary">
                            {currentTopic.lessonContent.recommendedNextTopic.title}
                          </h4>
                          <p className="text-xs text-text-secondary">
                            Seamlessly advance through the guided learning journey: Learn → Visualize → Revise → Test
                          </p>
                        </div>
                        <button
                          onClick={navigateToNextTopic}
                          className="px-5 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
                        >
                          <span>Next Lesson</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  )}

                  {/* Sub-Tab 2: Previous Year Questions (PYQs) */}
                  {lessonSubTab === 'pyq' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                          University PYQs ({currentTopic.pyqs.length})
                        </h3>
                        <span className="text-xs text-text-tertiary">Tagged with Marks &amp; Model Outlines</span>
                      </div>

                      {currentTopic.pyqs.length === 0 ? (
                        <p className="text-xs text-text-secondary">No specific PYQs indexed for this topic yet.</p>
                      ) : (
                        currentTopic.pyqs.map((pyq) => (
                          <div key={pyq.id} className="bg-bg-secondary border border-border rounded-2xl p-5 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-black text-xs">
                                  {pyq.marks} Marks
                                </span>
                                <span className="text-xs font-bold text-text-secondary">{pyq.university}</span>
                              </div>
                              <div className="flex gap-1">
                                {pyq.years.map((yr, idx) => (
                                  <span key={idx} className="px-2 py-0.5 rounded bg-bg-primary border border-border text-[10px] font-bold text-text-tertiary">
                                    {yr}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <h4 className="text-base font-bold text-text-primary">{pyq.question}</h4>

                            <div className="bg-bg-primary p-4 rounded-xl border border-border space-y-2">
                              <span className="text-xs font-bold text-primary uppercase">Model Answer Outline:</span>
                              <ul className="text-xs space-y-1.5 text-text-primary list-disc pl-4">
                                {pyq.modelAnswerOutline.map((step, idx) => (
                                  <li key={idx}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Sub-Tab 3: Viva Oral Questions */}
                  {lessonSubTab === 'viva' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                          Viva Voce Oral Exam Simulator
                        </h3>
                        <span className="text-xs text-text-tertiary">Click to reveal model answers</span>
                      </div>

                      <div className="space-y-3">
                        {currentTopic.vivaQuestions.map((viva) => (
                          <VivaCard key={viva.id} viva={viva} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 4: Interactive MCQ Quiz */}
                  {lessonSubTab === 'mcq' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                          Self-Assessment MCQ Quiz
                        </h3>
                        <span className="text-xs text-text-tertiary">Instant rationale &amp; score tracking</span>
                      </div>

                      <div className="space-y-4">
                        {currentTopic.mcqs.map((mcq, idx) => (
                          <McqCard
                            key={mcq.id}
                            index={idx + 1}
                            mcq={mcq}
                            selectedOption={mcqAnswers[mcq.id]}
                            isSubmitted={mcqSubmitted[mcq.id]}
                            onSelectOption={(optIndex) => {
                              setMcqAnswers((prev) => ({ ...prev, [mcq.id]: optIndex }));
                            }}
                            onSubmit={() => {
                              setMcqSubmitted((prev) => ({ ...prev, [mcq.id]: true }));
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 5: 1-Page Summary / Flashcard */}
                  {lessonSubTab === 'summary' && (
                    <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-border/60 pb-3">
                        <h3 className="text-sm font-extrabold text-primary uppercase tracking-wider flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>1-Page High-Yield Cheat Sheet</span>
                        </h3>
                        <span className="text-xs font-bold text-text-tertiary">Last 5-Minute Refresher</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {currentTopic.lessonContent.onePageSummary.map((sumItem, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-bg-primary border border-primary/20 text-xs sm:text-sm text-text-primary font-bold flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-black text-xs flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="mt-0.5">{sumItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 6: My Personal Notes */}
                  {lessonSubTab === 'notes' && (
                    <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-border/60 pb-3">
                        <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-accent" />
                          <span>My Personal Study Notes</span>
                        </h3>
                        <span className="text-xs font-bold text-text-tertiary">Auto-saved to local browser</span>
                      </div>

                      <textarea
                        value={userNotes[currentTopic.id] || ''}
                        onChange={(e) => handleNoteChange(currentTopic.id, e.target.value)}
                        placeholder="Type keynotes, mnemonics, or personal doubts for this topic here..."
                        className="w-full h-48 p-4 rounded-xl bg-bg-primary border border-border focus:border-primary text-xs sm:text-sm font-sans focus:outline-none leading-relaxed"
                      />

                      <p className="text-[11px] text-text-tertiary">
                        ✍️ Notes saved for <strong className="text-text-primary">{currentTopic.title}</strong>.
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* STUDY MODE 2: ⚡ CRASH REVISION */}
              {studyMode === 'revision' && (
                <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-6">
                  <div className="border-b border-border pb-4">
                    <span className="text-xs font-black uppercase text-amber-500">⚡ Crash Revision Mode</span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      Rapid High-Yield Review — {currentTopic.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-text-tertiary uppercase">Must-Remember Keynotes</h4>
                    <div className="space-y-2">
                      {currentTopic.lessonContent.highYieldPoints.map((hyp, i) => (
                        <div key={i} className="p-3 rounded-xl bg-bg-primary border border-amber-500/20 text-xs text-text-primary font-bold flex items-start gap-2">
                          <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{hyp}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-text-tertiary uppercase mt-4">One-Page Flashcard Summary</h4>
                    <div className="space-y-2">
                      {currentTopic.lessonContent.onePageSummary.map((ops, i) => (
                        <div key={i} className="p-3 rounded-xl bg-bg-primary border border-border text-xs text-text-secondary">
                          • {ops}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STUDY MODE 3: 🎯 EXAM MODE */}
              {studyMode === 'exam' && (
                <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-6">
                  <div className="border-b border-border pb-4">
                    <span className="text-xs font-black uppercase text-primary">🎯 Exam Mode</span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      High-Yield Exam Questions &amp; Answer Structures — {currentTopic.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {currentTopic.pyqs.map((q) => (
                      <div key={q.id} className="p-4 rounded-xl bg-bg-primary border border-border space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">{q.marks} Marks</span>
                          <span className="text-text-tertiary">{q.university}</span>
                        </div>
                        <h4 className="text-sm font-bold text-text-primary">{q.question}</h4>
                        <div className="pt-2 border-t border-border/60">
                          <span className="text-[11px] font-bold text-text-tertiary block">Outline:</span>
                          <ul className="text-xs text-text-secondary list-disc pl-4 space-y-1 mt-1">
                            {q.modelAnswerOutline.map((out, idx) => (
                              <li key={idx}>{out}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STUDY MODE 4: 🗣 VIVA MODE */}
              {studyMode === 'viva' && (
                <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-6">
                  <div className="border-b border-border pb-4">
                    <span className="text-xs font-black uppercase text-purple-500">🗣 Viva Mode</span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      Oral Examination Practice — {currentTopic.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {currentTopic.vivaQuestions.map((v) => (
                      <VivaCard key={v.id} viva={v} />
                    ))}
                  </div>
                </div>
              )}

              {/* STUDY MODE 5: 📝 MCQ PRACTICE */}
              {studyMode === 'mcq' && (
                <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-6">
                  <div className="border-b border-border pb-4">
                    <span className="text-xs font-black uppercase text-emerald-500">📝 MCQ Practice</span>
                    <h3 className="text-xl font-bold text-text-primary mt-1">
                      Module Quiz — {currentTopic.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {currentTopic.mcqs.map((mcq, idx) => (
                      <McqCard
                        key={mcq.id}
                        index={idx + 1}
                        mcq={mcq}
                        selectedOption={mcqAnswers[mcq.id]}
                        isSubmitted={mcqSubmitted[mcq.id]}
                        onSelectOption={(optIndex) => {
                          setMcqAnswers((prev) => ({ ...prev, [mcq.id]: optIndex }));
                        }}
                        onSubmit={() => {
                          setMcqSubmitted((prev) => ({ ...prev, [mcq.id]: true }));
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* 2. EXAMINATION HUB TAB */}
        {activeTab === 'exam-hub' && (
          <div className="space-y-8">
            <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="border-b border-border pb-3">
                <span className="text-xs font-extrabold text-primary uppercase tracking-wider">Flagship Portal</span>
                <h2 className="text-2xl font-display font-black text-text-primary">
                  1st BHMS Examination Hub
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Expected Long Questions, Short Notes, Spotters, and Diagram Guides for NCH Board Exams.
                </p>
              </div>

              {/* Expected Long Questions (LAQ) */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Expected Long Answer Questions (10/15 Marks)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EXAMINATION_HUB_DATA.expectedLAQs.map((laq, idx) => (
                    <div key={idx} className="bg-bg-primary border border-border rounded-xl p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-black">
                          {laq.subject}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          Probability: {laq.predictedProbability}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary">{laq.question}</h4>
                      <p className="text-xs text-text-secondary bg-bg-secondary p-2.5 rounded-lg border border-border">
                        💡 <strong>Exam Strategy:</strong> {laq.highYieldTips}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Diagram Guides */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-accent" />
                  <span>Must-Practice Exam Diagrams</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {EXAMINATION_HUB_DATA.importantDiagrams.map((diag, idx) => (
                    <div key={idx} className="bg-bg-primary border border-border p-3.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-accent">{diag.subject}</span>
                        <span className="text-text-tertiary">{diag.frequency}</span>
                      </div>
                      <h5 className="text-xs font-bold text-text-primary">{diag.title}</h5>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spotters Hub */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-500" />
                  <span>Practical &amp; Spotters Hub</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXAMINATION_HUB_DATA.spotters.map((spot, idx) => (
                    <div key={idx} className="bg-bg-primary border border-border p-4 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-amber-500 uppercase">{spot.category}</span>
                      <h5 className="text-xs font-bold text-text-primary">{spot.title}</h5>
                      <p className="text-xs text-text-secondary">{spot.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. REVISION SYSTEM TAB */}
        {activeTab === 'revision-system' && (
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="border-b border-border pb-3">
              <span className="text-xs font-extrabold text-accent uppercase tracking-wider">Scheduled Revision</span>
              <h2 className="text-2xl font-display font-black text-text-primary">
                Integrated Revision Matrix
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Structured revision loops to retain high-yield concepts until exam day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Revision */}
              <div className="bg-bg-primary border border-border p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Daily Revision Routine</span>
                </h3>
                <ul className="text-xs text-text-secondary space-y-2">
                  {REVISION_SCHEDULE.daily.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weekly Revision */}
              <div className="bg-bg-primary border border-border p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Weekly Revision Targets</span>
                </h3>
                <ul className="text-xs text-text-secondary space-y-2">
                  {REVISION_SCHEDULE.weekly.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subject-Wise Revision */}
              <div className="bg-bg-primary border border-border p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span>Subject-Wise Revision Loop</span>
                </h3>
                <ul className="text-xs text-text-secondary space-y-2">
                  {REVISION_SCHEDULE.subjectWise.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Last 24-Hour Revision */}
              <div className="bg-bg-primary border border-border p-5 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Last 24-Hour Pre-Exam Sheet</span>
                </h3>
                <ul className="text-xs text-text-secondary space-y-2">
                  {REVISION_SCHEDULE.last24Hours.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 4. STUDY PLANNER TAB */}
        {activeTab === 'planner' && (
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="border-b border-border pb-3">
              <span className="text-xs font-extrabold text-primary uppercase tracking-wider">Time-Bound Preparation</span>
              <h2 className="text-2xl font-display font-black text-text-primary">
                Personalized Study Planner
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Set your daily target pace and track your countdown to board exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-bg-primary border border-border p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-text-tertiary uppercase">Daily Target Pace</h4>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-primary">{dailyGoal} Topics/Day</span>
                  <div className="flex gap-1">
                    <button onClick={() => setDailyGoal(g => Math.max(1, g - 1))} className="w-8 h-8 rounded bg-bg-secondary border text-xs font-bold">-</button>
                    <button onClick={() => setDailyGoal(g => g + 1)} className="w-8 h-8 rounded bg-bg-secondary border text-xs font-bold">+</button>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">
                  At this pace, you will finish all remaining topics in approximately{' '}
                  <strong className="text-text-primary">
                    {Math.ceil((totalTopicsCount - completedCount) / Math.max(1, dailyGoal))} days
                  </strong>.
                </p>
              </div>

              <div className="bg-bg-primary border border-border p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-text-tertiary uppercase">Active Streak</h4>
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-2xl font-black text-text-primary">{streakDays} Days</span>
                </div>
                <p className="text-xs text-text-secondary">Keep studying daily to maintain your momentum badge!</p>
              </div>

              <div className="bg-bg-primary border border-border p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-text-tertiary uppercase">Completed Pace</h4>
                <div className="text-2xl font-black text-emerald-500">{completedCount} Topics</div>
                <p className="text-xs text-text-secondary">Total lessons finished in your profile log.</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. BOOKMARKS TAB */}
        {activeTab === 'bookmarks' && (
          <div className="bg-bg-secondary border border-border/80 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="border-b border-border pb-3">
              <span className="text-xs font-extrabold text-accent uppercase tracking-wider">Saved Content</span>
              <h2 className="text-2xl font-display font-black text-text-primary">
                Bookmarked Topics ({bookmarkedTopicIds.length})
              </h2>
            </div>

            {bookmarkedTopicIds.length === 0 ? (
              <p className="text-xs text-text-secondary py-4">No bookmarked topics yet. Click the bookmark icon on any lesson to save it here for quick access!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allTopics
                  .filter(({ topic }) => bookmarkedTopicIds.includes(topic.id))
                  .map(({ module, topic }) => (
                    <div key={topic.id} className="bg-bg-primary border border-border p-4 rounded-xl flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase">{module.title}</span>
                        <h4 className="text-sm font-bold text-text-primary">{topic.title}</h4>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedModuleId(module.id);
                          setSelectedTopicId(topic.id);
                          setActiveTab('curriculum');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold"
                      >
                        Open
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* COMPLETION CERTIFICATE MODAL */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary p-2"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase">
                  Official Completion Credential
                </span>
                <h3 className="text-2xl font-display font-black text-text-primary">
                  First BHMS Master Credential
                </h3>
              </div>

              {/* Printable Certificate Box */}
              <div className="border-4 border-double border-primary/40 rounded-2xl p-6 bg-gradient-to-br from-bg-primary via-bg-secondary to-primary/5 text-center space-y-4 relative">
                <div className="flex justify-between items-center border-b border-border pb-3 text-xs text-text-tertiary font-bold uppercase">
                  <span>Curiva Homoeopathy Academic Board</span>
                  <span>NCH CBDC Syllabus Verified</span>
                </div>

                <div className="py-4 space-y-2">
                  <p className="text-xs text-text-secondary uppercase tracking-widest">This Certificate is Proudly Awarded to</p>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="text-2xl sm:text-3xl font-serif font-bold text-primary text-center bg-transparent border-b border-dashed border-primary/40 focus:outline-none focus:border-primary px-2 py-1"
                    placeholder="Enter Student Name"
                  />
                  <p className="text-xs text-text-secondary leading-relaxed max-w-md mx-auto pt-2">
                    for successfully mastering all six core modules of the <strong>Curiva First BHMS Crash Course</strong>, including Anatomy, Physiology, Biochemistry, Organon of Medicine, Homoeopathic Pharmacy, and Materia Medica.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-b border-border py-3 text-xs">
                  <div>
                    <span className="text-text-tertiary block">Topics Finished</span>
                    <strong className="text-text-primary">{completedCount} / {totalTopicsCount}</strong>
                  </div>
                  <div>
                    <span className="text-text-tertiary block">Total Hours</span>
                    <strong className="text-text-primary">{totalCourseHours} hrs</strong>
                  </div>
                  <div>
                    <span className="text-text-tertiary block">Curiva Verification</span>
                    <strong className="text-emerald-500">CURIVA-1BHMS-VALID</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-left text-[10px] text-text-tertiary">
                    <span>Issue Date: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-accent/40 bg-accent/10 flex items-center justify-center font-black text-[10px] text-accent uppercase rotate-12">
                    Verified
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:shadow transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Helper Components for Viva and MCQ Cards
function VivaCard({ viva }: { viva: VivaQuestion }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bg-primary border border-border rounded-xl p-4 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <h5 className="text-xs sm:text-sm font-bold text-text-primary">
          Q: {viva.question}
        </h5>
        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300 font-bold text-[10px] shrink-0 uppercase">
          {viva.category}
        </span>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-1"
      >
        <span>{isOpen ? 'Hide Answer' : 'Show Answer'}</span>
        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className="pt-2 border-t border-border space-y-2 text-xs">
          <p className="text-text-primary font-medium">{viva.answer}</p>
          {viva.examinerTip && (
            <p className="text-purple-600 dark:text-purple-300 bg-purple-500/10 p-2 rounded border border-purple-500/20 font-sans">
              💡 <strong>Examiner Tip:</strong> {viva.examinerTip}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function McqCard({
  index,
  mcq,
  selectedOption,
  isSubmitted,
  onSelectOption,
  onSubmit
}: {
  index: number;
  mcq: MCQ;
  selectedOption?: number;
  isSubmitted?: boolean;
  onSelectOption: (i: number) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="bg-bg-primary border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-extrabold text-primary">Question #{index}</span>
        {mcq.highYieldTag && (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">
            {mcq.highYieldTag}
          </span>
        )}
      </div>

      <h4 className="text-xs sm:text-sm font-bold text-text-primary">{mcq.question}</h4>

      <div className="space-y-2">
        {mcq.options.map((opt, optIdx) => {
          const isSelected = selectedOption === optIdx;
          const isCorrect = optIdx === mcq.correctAnswer;

          let btnStyle = 'bg-bg-secondary border-border text-text-primary hover:border-primary';
          if (isSubmitted) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-red-500/20 border-red-500 text-red-700 dark:text-red-300';
            }
          } else if (isSelected) {
            btnStyle = 'bg-primary/20 border-primary text-primary font-bold';
          }

          return (
            <button
              key={optIdx}
              disabled={isSubmitted}
              onClick={() => onSelectOption(optIdx)}
              className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{opt}</span>
              {isSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
          );
        })}
      </div>

      {!isSubmitted && selectedOption !== undefined && (
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-lg bg-primary text-white font-bold text-xs shadow-xs hover:shadow transition-all"
        >
          Check Answer
        </button>
      )}

      {isSubmitted && (
        <div className="p-3 rounded-lg bg-bg-secondary border border-border text-xs text-text-primary space-y-1">
          <strong className="text-primary block">Rationale:</strong>
          <p className="text-text-secondary">{mcq.explanation}</p>
        </div>
      )}
    </div>
  );
}

function Eye(props: any) {
  return <Search {...props} />;
}
