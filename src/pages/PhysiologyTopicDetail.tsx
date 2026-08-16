import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, BookOpen, Clock, Award, HelpCircle, ShieldAlert, CheckCircle, 
  ChevronRight, Sparkles, AlertCircle, FileText, Compass, List, HeartPulse, 
  MapPin, HelpCircle as QuestionIcon, RefreshCw, PenTool, Layout, Layers, CheckSquare, X, Activity, BookOpenCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import { getPhysiologyModule, physiologyModules } from '../data/physiologyModulesData';
import KnowledgeDNA from '../components/KnowledgeDNA';
import { ContentNavigator } from '../components/ContentNavigator';

export default function PhysiologyTopicDetail() {
  const params = useParams<{ topicId?: string; '*': string }>();
  const activeTopicId = params.topicId || params['*'] || '';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'core' | 'applied' | 'prep' | 'drawings'>('core');
  const [revealedVivas, setRevealedVivas] = useState<Record<number, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Progress tracker state
  const [isCompleted, setIsCompleted] = useState(false);

  const detailContainerRef = useRef<HTMLDivElement>(null);

  const currentModule = activeTopicId ? getPhysiologyModule(activeTopicId) : undefined;

  useEffect(() => {
    if (!currentModule) return;
    
    // Load completion state
    const saved = localStorage.getItem('curiva_physiology_progress');
    if (saved) {
      try {
        const completed: string[] = JSON.parse(saved);
        setIsCompleted(completed.includes(currentModule.id));
      } catch (e) {
        console.error(e);
      }
    }

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRevealedVivas({});
    setActiveTab('core');
  }, [currentModule]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentModule) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 animate-bounce" />
        <h3 className="text-xl font-bold text-text-primary">Module Not Found</h3>
        <p className="text-xs text-text-secondary max-w-sm text-center">
          The requested Physiology module does not exist or is still being compiled.
        </p>
        <Link to="/physiology" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-soft">
          Back to Physiology Library
        </Link>
      </div>
    );
  }

  const toggleMastered = () => {
    const saved = localStorage.getItem('curiva_physiology_progress');
    let completedList: string[] = [];
    if (saved) {
      try {
        completedList = JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    let updated: string[];
    if (completedList.includes(currentModule.id)) {
      updated = completedList.filter(id => id !== currentModule.id);
      setIsCompleted(false);
    } else {
      updated = [...completedList, currentModule.id];
      setIsCompleted(true);
    }

    localStorage.setItem('curiva_physiology_progress', JSON.stringify(updated));
  };

  // Find adjacent topics for navigation
  const moduleIds = Object.keys(physiologyModules);
  const currentIndex = moduleIds.indexOf(currentModule.id);
  const prevModuleId = currentIndex > 0 ? moduleIds[currentIndex - 1] : undefined;
  const nextModuleId = currentIndex < moduleIds.length - 1 ? moduleIds[currentIndex + 1] : undefined;

  const prevModule = prevModuleId ? getPhysiologyModule(prevModuleId) : undefined;
  const nextModule = nextModuleId ? getPhysiologyModule(nextModuleId) : undefined;

  return (
    <div className="min-h-screen bg-bg-primary py-6 md:py-10 space-y-8 text-left" ref={detailContainerRef}>
      <SEO 
        title={`${currentModule.title} - First BHMS Physiology Library`}
        description={`Study ${currentModule.title} for BHMS University exams. Review NCH Competency ${currentModule.nchCompetency}, physiological mechanisms, clinical pearls, and viva keys.`}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-bg-secondary z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary via-accent to-indigo-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Breadcrumbs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/student-resources" className="hover:text-primary transition-colors">Student Resources</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/physiology" className="hover:text-primary transition-colors">Physiology Library</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-primary font-bold truncate max-w-[200px]">{currentModule.title}</span>
        </div>

        <Link
          to="/physiology"
          className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Index
        </Link>
      </div>

      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-[2.5rem] p-6 md:p-10 border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3.5 text-left max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              <Activity className="w-3.5 h-3.5" />
              {currentModule.system}
            </span>
            <span className="text-[10px] font-bold text-text-tertiary">
              {currentModule.importance}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-display font-black text-text-primary leading-tight">
            {currentModule.title}
          </h1>

          <p className="text-[11px] md:text-xs font-mono font-black text-primary uppercase tracking-tight">
            NCH Competency: {currentModule.nchCompetency}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary pt-1.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-text-tertiary" />
              {currentModule.studyTime} Estimated
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-text-tertiary" />
              Difficulty: <strong className="text-primary">{currentModule.difficulty}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShareButton 
            title={currentModule.title} 
            text={`1st BHMS Physiology Module: ${currentModule.title}`} 
            variant="outline" 
            label="Share" 
          />

          <button
            onClick={toggleMastered}
            className={`px-5 py-3 rounded-2xl border text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              isCompleted
                ? "bg-green-600 text-white border-green-700 shadow-soft-sm"
                : "bg-white dark:bg-zinc-900 text-text-primary border-border hover:border-primary/20 hover:bg-primary/5"
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${isCompleted ? "text-white" : "text-text-tertiary"}`} />
            {isCompleted ? "Mastered & Saved" : "Mark Mastered"}
          </button>
        </div>
      </div>

      {/* Main Layout Grid (Content + Table of Contents Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile quick-nav list / Desktop left side navigation anchors */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-10 bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-border shadow-soft space-y-4 text-left">
            <h4 className="text-xs font-black uppercase tracking-widest text-text-primary flex items-center gap-2 border-b border-border/60 pb-3">
              <List className="w-4 h-4 text-primary" />
              Study Syllabus Map
            </h4>

            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: 'core', label: '1. Core Physiology', count: 'Conceptual foundation' },
                { id: 'applied', label: '2. Applied & Clinical', count: 'Diseases & actions' },
                { id: 'prep', label: '3. University Prep', count: 'Viva & questions' },
                { id: 'drawings', label: '4. Visuals & Diagrams', count: 'Drafting guidelines' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer shrink-0 ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary border-l-4 border-l-primary"
                      : "text-text-secondary hover:text-primary hover:bg-bg-secondary"
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-black uppercase tracking-tight">{tab.label}</p>
                    <p className="text-[9px] text-text-tertiary font-medium">{tab.count}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Fact Sidebar Box */}
            <div className="pt-4 border-t border-border/40 space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                Quick Fact
              </span>
              <p className="text-[11px] text-text-secondary leading-relaxed font-serif italic bg-bg-secondary p-3.5 rounded-2xl border border-border/60">
                "{currentModule.quickFacts.oneLineRevision}"
              </p>
            </div>
          </div>
        </div>

        {/* Core Detailed content area */}
        <div className="lg:col-span-3 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              
              {/* Tab 1: Core Learning */}
              {activeTab === 'core' && (
                <div className="space-y-8">
                  {/* Curiva Block: Quick Facts Hero */}
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 rounded-[2.5rem] space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Curiva Quick Facts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <p className="text-[9px] font-black text-text-tertiary uppercase">Core Concept Definition</p>
                        <p className="text-xs text-text-primary leading-relaxed font-medium">{currentModule.quickFacts.definition}</p>
                      </div>
                      <div className="space-y-1 text-left">
                        <p className="text-[9px] font-black text-text-tertiary uppercase">Normal Range / Values</p>
                        <p className="text-xs font-mono font-bold text-primary">{currentModule.quickFacts.normalRange}</p>
                      </div>
                      <div className="space-y-1 text-left">
                        <p className="text-[9px] font-black text-text-tertiary uppercase">Primary Physiological Role</p>
                        <p className="text-xs text-text-secondary leading-relaxed">{currentModule.quickFacts.primaryRole}</p>
                      </div>
                      <div className="space-y-1 text-left">
                        <p className="text-[9px] font-black text-text-tertiary uppercase">Clinical Significance</p>
                        <p className="text-xs text-text-secondary leading-relaxed">{currentModule.quickFacts.clinicalImportance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Introduction Section */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-text-primary">Introduction</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {currentModule.introduction}
                    </p>
                  </div>

                  {/* Definition Block */}
                  <div className="p-5 bg-bg-secondary border border-border rounded-2xl border-l-4 border-l-indigo-600">
                    <h4 className="text-xs font-black uppercase tracking-widest text-indigo-700 mb-1.5">
                      Physiological Definition
                    </h4>
                    <p className="text-xs md:text-sm font-medium text-text-primary leading-relaxed">
                      {currentModule.definition}
                    </p>
                  </div>

                  {/* Curiva Block: Concept Builder */}
                  <div className="p-6 bg-amber-500/5 border border-amber-500/15 rounded-[2.5rem] space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-700 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-amber-600" />
                      Curiva Concept Builder
                    </h4>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                      {currentModule.basicConcepts}
                    </p>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-text-primary">Detailed Explanation</h3>
                    <div className="text-xs md:text-sm text-text-secondary leading-relaxed space-y-4 whitespace-pre-line">
                      {currentModule.detailedExplanation}
                    </div>
                  </div>

                  {/* Step-by-Step Physiological Mechanism */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-text-primary">Physiological Mechanism (Step-by-Step)</h3>
                    
                    <div className="relative border-l border-border/80 ml-4 pl-6 space-y-6">
                      {currentModule.physiologicalMechanism.map((mech) => (
                        <div key={mech.step} className="relative group text-left">
                          {/* Number bubble on line */}
                          <div className="absolute -left-[35px] top-0.5 w-[18px] h-[18px] rounded-full bg-white dark:bg-zinc-950 border-2 border-primary text-[9px] font-black flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            {mech.step}
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="text-xs font-black uppercase text-text-primary tracking-wide">
                              {mech.title}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {mech.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curiva Block: Flowchart */}
                  <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-[2.5rem] space-y-4 text-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-text-primary flex items-center justify-center gap-1.5 border-b border-border/40 pb-3">
                      <RefreshCw className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '6s' }} />
                      Curiva Flowchart: {currentModule.flowchart.title}
                    </h4>

                    {/* Step pills with connecting arrows */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-2">
                      {currentModule.flowchart.steps.map((step, i) => (
                        <React.Fragment key={i}>
                          <div className="flex-1 max-w-[200px] p-4 bg-white dark:bg-zinc-950 border border-border rounded-2xl shadow-soft-sm text-center relative group hover:border-primary/20 transition-all">
                            <span className="absolute -top-2 left-4 px-2 py-0.5 rounded bg-bg-secondary text-[8px] font-black font-mono border border-border text-text-tertiary">
                              STEP 0{i + 1}
                            </span>
                            <p className="text-[11px] font-black uppercase tracking-tight text-text-primary mb-1 mt-1">
                              {step.label}
                            </p>
                            <p className="text-[10px] text-text-secondary leading-snug">
                              {step.desc}
                            </p>
                          </div>
                          
                          {/* Chevron Separator (not on last step) */}
                          {i < currentModule.flowchart.steps.length - 1 && (
                            <ChevronRight className="w-5 h-5 text-text-tertiary rotate-90 md:rotate-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Curiva Block: Summary Tables */}
                  {currentModule.tables.map((table, tIdx) => (
                    <div key={tIdx} className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-[2.5rem] space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-primary border-b border-border/40 pb-3">
                        Curiva Summary Table: {table.title}
                      </h4>
                      <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-bg-secondary border-b border-border">
                              {table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3 text-[10px] font-black uppercase tracking-wider text-text-primary">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-border/60 hover:bg-bg-secondary/40 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3 text-xs text-text-secondary leading-normal">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {/* Academic Knowledge DNA Profile */}
                  <KnowledgeDNA
                    difficulty="Year 1"
                    examYieldScore={currentModule.importance.includes('Frequently') || currentModule.importance.includes('High') ? 95 : 85}
                    clinicalAffinityTags={[currentModule.system, "Functional Axis", "Clinical Reflex"]}
                    miasmaWeights={{ psora: 55, sycosis: 30, syphilis: 15 }}
                    learningObjectives={currentModule.learningObjectives}
                    clinicalPearls={[currentModule.quickFacts.clinicalImportance]}
                    category="Physiology"
                  />

                </div>
              )}

              {/* Tab 2: Applied & Clinical */}
              {activeTab === 'applied' && (
                <div className="space-y-8">
                  {/* Curiva Block: Clinical Correlation */}
                  <div className="p-6 bg-blue-500/5 border border-blue-500/15 rounded-[2.5rem] space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-700 flex items-center gap-1.5 border-b border-blue-500/10 pb-3">
                      <HeartPulse className="w-4 h-4 text-blue-600" />
                      Curiva Clinical Correlation & Homoeopathic Integration
                    </h3>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                      {currentModule.clinicalCorrelation}
                    </p>
                  </div>

                  {/* Applied Physiology */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-text-primary">Applied Physiology & Body Regulation</h3>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                      {currentModule.appliedPhysiology}
                    </p>
                  </div>

                  {/* Important Disorders Grid */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-text-primary">Important Pathophysiological Disorders</h3>
                    <p className="text-xs text-text-secondary">
                      Core disorders that arise directly due to failure of this physiological mechanism (focus is on explaining physiological failure, not treatment).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentModule.importantDisorders.map((dis, dIdx) => (
                        <div key={dIdx} className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-soft-sm space-y-3">
                          <h4 className="text-sm font-black uppercase text-red-600 tracking-wide flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-red-600" />
                            {dis.name}
                          </h4>
                          
                          <div className="space-y-2 text-xs">
                            <div className="space-y-0.5">
                              <p className="text-[9px] font-black uppercase text-text-tertiary">Failure Mechanism</p>
                              <p className="text-text-secondary leading-relaxed">{dis.mechanism}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[9px] font-black uppercase text-text-tertiary">Clinical Symptoms</p>
                              <p className="text-text-secondary leading-relaxed font-serif italic">"{dis.symptoms}"</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Prep */}
              {activeTab === 'prep' && (
                <div className="space-y-8">
                  
                  {/* Curiva Block: Viva Booster */}
                  <div className="p-6 bg-violet-500/5 border border-violet-500/15 rounded-[2.5rem] space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-violet-700 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-violet-600" />
                      Curiva Viva Booster
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Key definitions, numerical standard levels, and fast-response questions frequently asked during First BHMS external oral examinations.
                    </p>

                    <div className="space-y-3 pt-3">
                      {currentModule.vivaQuestions.map((v, i) => {
                        const isRevealed = !!revealedVivas[i];
                        return (
                          <div key={i} className="bg-white dark:bg-zinc-950 border border-border rounded-2xl overflow-hidden shadow-soft-sm">
                            <button
                              onClick={() => setRevealedVivas(prev => ({ ...prev, [i]: !prev[i] }))}
                              className="w-full text-left p-4 flex justify-between items-center gap-4 cursor-pointer hover:bg-bg-secondary"
                            >
                              <div className="space-y-1">
                                <span className="text-[8px] font-black uppercase tracking-wider text-text-tertiary">Viva Question 0{i + 1}</span>
                                <p className="text-xs font-black text-text-primary leading-snug">{v.q}</p>
                              </div>
                              <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border shrink-0 ${
                                isRevealed ? "bg-violet-100 text-violet-700 border-violet-200" : "bg-bg-secondary text-text-secondary border-border"
                              }`}>
                                {isRevealed ? "Hide Answer" : "Reveal Answer"}
                              </span>
                            </button>
                            
                            {isRevealed && (
                              <div className="p-4 bg-gradient-to-r from-violet-500/5 to-transparent border-t border-border/60">
                                <p className="text-xs text-text-secondary leading-relaxed italic font-serif">
                                  {v.a}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* University Exam Questions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-text-primary">University Examination Questions</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Long Questions */}
                      <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-3">
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-black uppercase tracking-wider">
                          10 / 15 Marks (LAQ)
                        </span>
                        <div className="space-y-2">
                          {currentModule.examQuestions.longQuestions.map((q, i) => (
                            <p key={i} className="text-xs font-bold text-text-primary leading-relaxed pl-3 border-l-2 border-red-500/20">
                              {q}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Short Notes */}
                      <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-3">
                        <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-mono text-[9px] font-black uppercase tracking-wider">
                          5 Marks (SAQ)
                        </span>
                        <div className="space-y-2">
                          {currentModule.examQuestions.shortNotes.map((q, i) => (
                            <p key={i} className="text-xs font-bold text-text-primary leading-relaxed pl-3 border-l-2 border-amber-500/20">
                              {q}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* One Liners */}
                      <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-2xl space-y-3">
                        <span className="px-2 py-0.5 rounded bg-zinc-600 text-white font-mono text-[9px] font-black uppercase tracking-wider">
                          2 Marks (VSAQ)
                        </span>
                        <div className="space-y-2">
                          {currentModule.examQuestions.oneLiners.map((q, i) => (
                            <p key={i} className="text-xs font-bold text-text-primary leading-relaxed pl-3 border-l-2 border-border">
                              {q}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curiva Block: High Yield Points */}
                  <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-[2.5rem] space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-green-700 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Curiva High-Yield Points
                    </h4>
                    <ul className="space-y-2">
                      {currentModule.highYieldPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0 mt-1.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curiva Block: Mnemonic Vault */}
                  {currentModule.mnemonics.length > 0 && (
                    <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-700 flex items-center gap-1.5 border-b border-indigo-500/10 pb-3">
                        <Award className="w-4 h-4 text-indigo-600" />
                        Curiva Mnemonic Vault
                      </h4>
                      {currentModule.mnemonics.map((m, i) => (
                        <div key={i} className="space-y-1 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-border">
                          <p className="text-[9px] font-black uppercase text-indigo-600">Memory Trigger phrase</p>
                          <p className="text-sm font-black text-text-primary tracking-wide">"{m.phrase}"</p>
                          <p className="text-xs text-text-secondary pt-1 leading-normal">
                            <strong>Meaning:</strong> {m.meaning} <br />
                            <span className="text-[10px] text-text-tertiary">Used for remembering: {m.concept}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Frequently Confused Concepts */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-text-primary">Frequently Confused Concepts</h3>
                    
                    <div className="space-y-3">
                      {currentModule.frequentlyConfused.map((fc, idx) => (
                        <div key={idx} className="p-5 bg-white dark:bg-zinc-900 border border-border rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1 border-r border-border/40 pr-2">
                            <span className="text-[9px] font-black uppercase text-primary">Concept A: {fc.conceptA}</span>
                            <span className="mx-2 text-xs font-bold text-text-tertiary">vs</span>
                            <span className="text-[9px] font-black uppercase text-accent">Concept B: {fc.conceptB}</span>
                          </div>
                          <div className="text-xs text-text-secondary leading-relaxed">
                            <p className="font-semibold text-text-primary mb-1">How to distinguish them:</p>
                            {fc.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curiva Block: Common Mistakes */}
                  <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-700 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      Curiva Common Mistakes to Avoid
                    </h4>
                    <ul className="space-y-2">
                      {currentModule.commonMistakes.map((mis, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                          <span>{mis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curiva Block: One-Minute Revision */}
                  <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2.5rem] space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Curiva One-Minute Revision
                    </h4>
                    <ul className="space-y-2">
                      {currentModule.oneMinuteRevision.map((rev, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                          <span>{rev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

              {/* Tab 4: Visuals & Drawings */}
              {activeTab === 'drawings' && (
                <div className="space-y-6">
                  <div className="border-b border-border/60 pb-3 text-left">
                    <h3 className="text-lg font-bold text-text-primary">Recommended Exam Drawing Plans</h3>
                    <p className="text-xs text-text-secondary">
                      In anatomy and physiology university examinations, sketches and flowcharts carry over 40% of the scoring weight. Use these structural plans to draft drawings in your answer books.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentModule.visualPlans.map((plan, i) => (
                      <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-soft-sm space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-lg">
                            Sketch type: {plan.type}
                          </span>
                          <PenTool className="w-4 h-4 text-primary" />
                        </div>
                        
                        <h4 className="text-sm font-black uppercase text-text-primary tracking-wide">
                          {plan.title}
                        </h4>
                        
                        <p className="text-xs text-text-secondary leading-relaxed border-t border-border/40 pt-2 font-normal">
                          {plan.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Bottom Syllabus Continuing Navigation */}
          <ContentNavigator 
            prev={prevModule ? { to: `/physiology/${prevModule.id}`, title: prevModule.title, label: 'Previous Module' } : null}
            next={nextModule ? { to: `/physiology/${nextModule.id}`, title: nextModule.title, label: 'Next Module' } : null}
          />

          {/* References & Footnotes */}
          <div className="p-6 bg-bg-secondary border border-border/60 rounded-[2rem] space-y-2 text-xs">
            <h4 className="font-bold text-text-primary">Medical References & Textbook Sources</h4>
            <ul className="space-y-1 pl-1 list-disc list-inside text-text-secondary font-mono text-[10px]">
              {currentModule.references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
            <p className="text-[9px] text-text-tertiary pt-2 border-t border-border/40 leading-normal">
              <strong>Last Updated:</strong> July 2026. Reviewed by Curiva Academic Board of Anatomy & Physiology.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
