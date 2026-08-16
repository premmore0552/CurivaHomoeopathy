import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Search, Filter, Award, Clock, ArrowRight, CheckCircle, 
  Layers, CheckCircle2, BookOpenCheck, HelpCircle, Sparkles, Network,
  GraduationCap, AlertCircle, Bookmark, CheckSquare, ListTodo, FileText, Heart, Activity
} from 'lucide-react';
import SEO from '../components/SEO';
import { getAllPhysiologyModules } from '../data/physiologyModulesData';

interface GraphNode {
  id: string;
  label: string;
  x: number; // Percent
  y: number; // Percent
  category: string;
  description: string;
  relatedModuleId?: string;
}

interface GraphLink {
  source: string;
  target: string;
  relation: string;
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'homeostasis', label: 'Homeostasis System', x: 50, y: 12, category: 'General', description: 'The central system of physiological balance, regulating pH, temperature, and electrolyte concentrations.', relatedModuleId: 'cell_homeostasis' },
  { id: 'cell', label: 'Cell & Transport', x: 30, y: 24, category: 'General', description: 'Transports nutrients, water, and ions across the phospholipid bilayer to maintain cellular volume and balance.', relatedModuleId: 'cell_homeostasis' },
  { id: 'iron', label: 'Iron Pool', x: 15, y: 45, category: 'Blood', description: 'Dietary iron processed in the duodenum and transported in blood, essential for heme production.', relatedModuleId: 'hemoglobin_iron' },
  { id: 'hemoglobin', label: 'Hemoglobin', x: 30, y: 56, category: 'Blood', description: 'Oxygen-carrying conjugated chromoprotein packed in erythrocytes, requiring iron for synthesis.', relatedModuleId: 'hemoglobin_iron' },
  { id: 'blood', label: 'Blood & RBCs', x: 50, y: 56, category: 'Blood', description: 'Erythrocytes carrying hemoglobin through systemic circulation, transporting gases.', relatedModuleId: 'hemoglobin_iron' },
  { id: 'heart', label: 'Cardiac Pacemaker', x: 70, y: 38, category: 'CVS', description: 'The sinoatrial node generating electrical impulses that coordinate muscle contraction and cardiac rhythm.', relatedModuleId: 'cardiac_cycle' },
  { id: 'cardiac_cycle', label: 'Cardiac Cycle', x: 85, y: 56, category: 'CVS', description: 'The systematic contraction (systole) and relaxation (diastole) phases governing cardiovascular output.', relatedModuleId: 'cardiac_cycle' },
  { id: 'lungs', label: 'Pulmonary Lungs', x: 68, y: 72, category: 'Respiratory', description: 'Breathes in oxygen to saturate deoxygenated hemoglobin in circulating RBCs.', relatedModuleId: 'hemoglobin_iron' },
  { id: 'vessels', label: 'Systemic Vessels', x: 48, y: 88, category: 'CVS', description: 'Arteries and capillaries carrying blood pressure that drives glomerular filtration in kidneys.', relatedModuleId: 'gfr_nephron' },
  { id: 'nephron', label: 'Nephron Filter', x: 25, y: 88, category: 'Renal', description: 'The functional renal unit regulating blood pressure and waste excretion to preserve ECF homeostasis.', relatedModuleId: 'gfr_nephron' },
  { id: 'gfr', label: 'GFR Regulation', x: 12, y: 72, category: 'Renal', description: 'Rate of fluid filtration, tightly controlled via Tubuloglomerular Feedback (TGF) loops.', relatedModuleId: 'gfr_nephron' }
];

const GRAPH_LINKS: GraphLink[] = [
  { source: 'cell', target: 'homeostasis', relation: 'Cell transport channels maintain ECF volume and electrolyte balance.' },
  { source: 'iron', target: 'hemoglobin', relation: 'Ferrous iron (Fe2+) is the central atom in heme groups forming hemoglobin.' },
  { source: 'hemoglobin', target: 'blood', relation: 'Hemoglobin makes up 34% of mature red blood cells.' },
  { source: 'blood', target: 'heart', relation: 'Cardiac pumps distribute RBCs to systemic and pulmonary networks.' },
  { source: 'heart', target: 'cardiac_cycle', relation: 'The SA node pacemaking coordinates the systole and diastole phases.' },
  { source: 'lungs', target: 'blood', relation: 'Alveoli transfer oxygen to deoxygenated hemoglobin in circulating RBCs.' },
  { source: 'vessels', target: 'nephron', relation: 'Systemic arterial pressure drives the filtration pressure inside the glomerulus.' },
  { source: 'gfr', target: 'nephron', relation: 'Glomerular filtration rate is the crucial first step of nephron waste clearing.' },
  { source: 'nephron', target: 'homeostasis', relation: 'Renal waste excretion and water reabsorption are the final guards of ECF homeostasis.' }
];

export default function PhysiologyLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGraphNodeId, setActiveGraphNodeId] = useState<string>('homeostasis');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  
  // Progress tracker state
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('curiva_physiology_progress');
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleTopicMastered = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCompletedTopics(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id];
      localStorage.setItem('curiva_physiology_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const allModules = useMemo(() => getAllPhysiologyModules(), []);

  const filteredModules = useMemo(() => {
    return allModules.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.nchCompetency.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || topic.system === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
      const matchesImportance = selectedImportance === 'All' || topic.importance.includes(selectedImportance);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesImportance;
    });
  }, [allModules, searchQuery, selectedCategory, selectedDifficulty, selectedImportance]);

  const progressPercentage = useMemo(() => {
    if (allModules.length === 0) return 0;
    return Math.round((completedTopics.length / allModules.length) * 100);
  }, [allModules, completedTopics]);

  const activeNodeInfo = useMemo(() => {
    return GRAPH_NODES.find(n => n.id === activeGraphNodeId) || GRAPH_NODES[0];
  }, [activeGraphNodeId]);

  return (
    <div className="min-h-screen bg-bg-primary py-8 md:py-12 space-y-12">
      <SEO 
        title="First BHMS Physiology Library - Curiva Homoeopathy"
        description="Master Human Physiology and Biochemistry for your BHMS University Examinations. Access interactive modules structured around the latest NCH CBDC syllabus."
      />

      {/* Header section with floating circles */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-[3rem] p-8 md:p-14 border border-border flex flex-col md:flex-row items-center gap-8 shadow-soft-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="space-y-4 max-w-3xl text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              NCH CBDC Syllabus Aligned
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-700 border border-green-500/20">
              Paper I & II Core
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-text-primary leading-tight">
            Human Physiology <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Knowledge Library
            </span>
          </h1>

          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-normal">
            Step-by-step physiological pathways, clinical pearls, detailed diagrams, high-yield university questions, and exam-oriented summaries. Created specifically for BHMS students.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-border px-4 py-2.5 rounded-2xl shadow-soft-sm">
              <BookOpenCheck className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs font-black text-text-primary">{allModules.length} Modules</p>
                <p className="text-[10px] text-text-tertiary">Sembulingam Reference</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-border px-4 py-2.5 rounded-2xl shadow-soft-sm">
              <Award className="w-5 h-5 text-accent" />
              <div className="text-left">
                <p className="text-xs font-black text-text-primary">100% Free</p>
                <p className="text-[10px] text-text-tertiary">Comprehensive Study Notes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mastered Progress Tracker Widget */}
        <div className="w-full md:w-80 bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-border shadow-soft flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase tracking-widest text-text-primary">
                Your Progress
              </h4>
              <span className="text-xs font-black text-primary">
                {completedTopics.length}/{allModules.length} Done
              </span>
            </div>
            
            <div className="w-full h-3 bg-bg-secondary rounded-full overflow-hidden border border-border">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>

            <div className="flex justify-between text-[10px] text-text-tertiary font-bold">
              <span>Learning Path</span>
              <span>{progressPercentage}% Mastered</span>
            </div>
          </div>

          <div className="mt-5 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-text-secondary leading-relaxed text-left">
              Review and click <strong>"Mark Mastered"</strong> on each module to keep track of your first BHMS university prep!
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters and Modules */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between bg-white dark:bg-zinc-950 border border-border p-5 rounded-[2rem] shadow-soft-sm">
          {/* Search bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input 
              type="text"
              placeholder="Search by system, topic title, NCH competency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-text-tertiary text-text-primary"
            />
          </div>

          {/* Filtering pickers */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* System select */}
            <div className="flex items-center gap-1 bg-bg-secondary border border-border px-3 py-1.5 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-text-secondary" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border-none text-[11px] font-black uppercase text-text-secondary focus:outline-none cursor-pointer pr-1"
              >
                <option value="All">All Systems</option>
                <option value="General Physiology">General Physiology</option>
                <option value="Blood Physiology">Blood Physiology</option>
                <option value="Cardiovascular Physiology">Cardiovascular Physiology</option>
                <option value="Renal Physiology">Renal Physiology</option>
                <option value="Respiratory Physiology">Respiratory Physiology</option>
                <option value="Nerve Muscle Physiology">Nerve Muscle Physiology</option>
              </select>
            </div>

            {/* Difficulty select */}
            <div className="flex items-center gap-1 bg-bg-secondary border border-border px-3 py-1.5 rounded-xl">
              <Layers className="w-3.5 h-3.5 text-text-secondary" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-transparent border-none text-[11px] font-black uppercase text-text-secondary focus:outline-none cursor-pointer pr-1"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic micro-topics listing */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-text-tertiary flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-primary" />
              Physiology Syllabus Modules ({filteredModules.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredModules.map((topic, index) => {
                const isCompleted = completedTopics.includes(topic.id);
                return (
                  <motion.div
                    key={topic.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                    className={`group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft transition-all hover:shadow-soft-lg hover:border-primary/20 text-left overflow-hidden`}
                  >
                    {/* Status ribbon for Mastered */}
                    {isCompleted && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white font-mono text-[9px] font-black uppercase px-4 py-1 rounded-bl-2xl flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3" /> Mastered
                      </div>
                    )}

                    {/* Meta bar */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-lg">
                          {topic.system}
                        </span>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          topic.difficulty === 'Easy' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                            : topic.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                        }`}>
                          {topic.difficulty}
                        </span>
                        <span className="text-[10px] font-bold text-text-tertiary">
                          {topic.importance}
                        </span>
                      </div>

                      {/* Header block */}
                      <div className="space-y-1">
                        <h4 className="text-lg md:text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-[10px] font-mono font-black tracking-tight text-text-tertiary uppercase">
                          {topic.nchCompetency}
                        </p>
                      </div>

                      {/* Brief overview */}
                      <p className="text-xs text-text-secondary leading-relaxed font-normal pt-1 border-t border-border/40">
                        {topic.quickFacts.definition}
                      </p>

                      {/* Micro bullets inside list */}
                      <div className="pt-3 space-y-1.5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">
                          Learning Objectives
                        </p>
                        <div className="space-y-1 pl-1">
                          {topic.learningObjectives.slice(0, 3).map((obj, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                              <span className="truncate">{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center gap-4">
                      {/* Study duration */}
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Clock className="w-3.5 h-3.5 text-text-tertiary" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{topic.studyTime} Est.</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Toggle completed button */}
                        <button
                          onClick={(e) => toggleTopicMastered(topic.id, e)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                            isCompleted
                              ? "bg-green-600/10 text-green-700 border-green-600/20 hover:bg-green-600/20"
                              : "bg-bg-secondary text-text-secondary border-border hover:bg-bg-primary hover:text-primary"
                          }`}
                        >
                          <CheckSquare className={`w-3.5 h-3.5 ${isCompleted ? "fill-green-600 text-green-600" : ""}`} />
                          {isCompleted ? "Mastered" : "Mark Mastered"}
                        </button>

                        <Link
                          to={`/physiology/${topic.id}`}
                          className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent transition-all group/btn"
                        >
                          Start Learning
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredModules.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white dark:bg-zinc-950 border border-border border-dashed rounded-[2rem] space-y-3">
                <AlertCircle className="w-8 h-8 text-text-tertiary mx-auto" />
                <p className="text-xs text-text-secondary">No physiology modules match your selected filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setSelectedImportance('All');
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Knowledge Path Visualizer (Interactive Graph) */}
      <section className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft space-y-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
              <Network className="w-3.5 h-3.5" />
              Interactive Physiological Pathways Graph
            </span>
            <h3 className="text-xl font-bold text-text-primary">
              Core Physiological Systems Map
            </h3>
            <p className="text-xs text-text-secondary">
              Click any node in this interconnected map to visualize the deep causal relationships and physiological mechanisms that maintain human homeostasis.
            </p>
          </div>

          {activeNodeInfo.relatedModuleId && (
            <Link
              to={`/physiology/${activeNodeInfo.relatedModuleId}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors cursor-pointer self-start md:self-auto"
            >
              Open Active Module
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Graph Render Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SVG Canvas Board */}
          <div className="lg:col-span-2 relative h-[450px] bg-gradient-to-b from-zinc-50 to-zinc-100/50 dark:from-zinc-950 dark:to-zinc-900 border border-border rounded-[2rem] overflow-hidden">
            {/* SVG Link lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {GRAPH_LINKS.map((link, i) => {
                const srcNode = GRAPH_NODES.find(n => n.id === link.source);
                const tgtNode = GRAPH_NODES.find(n => n.id === link.target);
                if (!srcNode || !tgtNode) return null;
                const isHighlighted = activeGraphNodeId === link.source || activeGraphNodeId === link.target;
                
                return (
                  <g key={i}>
                    <line
                      x1={`${srcNode.x}%`}
                      y1={`${srcNode.y}%`}
                      x2={`${tgtNode.x}%`}
                      y2={`${tgtNode.y}%`}
                      className={`stroke-2 transition-all ${
                        isHighlighted 
                          ? "stroke-indigo-500/60 stroke-[3px]" 
                          : "stroke-border/40 dark:stroke-border/20"
                      }`}
                    />
                    {isHighlighted && (
                      <circle r="3" className="fill-indigo-500">
                        <animateMotion 
                          path={`M ${srcNode.x}% ${srcNode.y}% L ${tgtNode.x}% ${tgtNode.y}%`} 
                          dur="3s" 
                          repeatCount="indefinite" 
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes as absolutely positioned circles */}
            {GRAPH_NODES.map((node) => {
              const isActive = activeGraphNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveGraphNodeId(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10 p-2 cursor-pointer transition-all ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-soft transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-500 ring-4 ring-indigo-500/10"
                      : "bg-white dark:bg-zinc-900 text-text-primary border-border"
                  }`}>
                    {node.category === 'General' ? (
                      <Layers className="w-3.5 h-3.5" />
                    ) : node.category === 'Blood' ? (
                      <Activity className="w-3.5 h-3.5" />
                    ) : node.category === 'CVS' ? (
                      <Heart className="w-3.5 h-3.5" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border tracking-tight shadow-soft-sm ${
                    isActive
                      ? "bg-indigo-600/15 text-indigo-700 border-indigo-500/20"
                      : "bg-white/90 dark:bg-zinc-900/90 text-text-secondary border-border"
                  }`}>
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Node detailed analysis sidebar */}
          <div className="bg-bg-secondary border border-border p-6 rounded-[2rem] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-lg">
                System: {activeNodeInfo.category}
              </span>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-text-primary">
                  {activeNodeInfo.label}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {activeNodeInfo.description}
                </p>
              </div>

              {/* Dynamic Relationship Statements */}
              <div className="space-y-3 pt-3 border-t border-border/50">
                <p className="text-[10px] font-black uppercase tracking-wider text-text-tertiary">
                  Pathway Connections
                </p>
                <div className="space-y-2">
                  {GRAPH_LINKS.filter(l => l.source === activeGraphNodeId || l.target === activeGraphNodeId).map((link, i) => {
                    const otherNodeId = link.source === activeGraphNodeId ? link.target : link.source;
                    const otherNode = GRAPH_NODES.find(n => n.id === otherNodeId);
                    return (
                      <div key={i} className="text-left p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-soft-sm space-y-1 text-xs">
                        <p className="font-bold text-text-primary flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          To: {otherNode?.label}
                        </p>
                        <p className="text-text-secondary leading-tight italic font-serif">
                          "{link.relation}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {activeNodeInfo.relatedModuleId && (
              <div className="mt-6 pt-4 border-t border-border/40">
                <Link
                  to={`/physiology/${activeNodeInfo.relatedModuleId}`}
                  className="w-full text-center inline-block py-2.5 bg-indigo-600/10 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                >
                  Start Learning This Module
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer warning educational disclaimer */}
      <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] flex gap-3.5 items-start text-left max-w-7xl mx-auto">
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-black uppercase tracking-widest text-red-700">
            Educational Disclaimer
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            The content in the Curiva Homoeopathy Physiology Library is designed strictly for academic preparation of BHMS undergraduate students. It aligns with the NCH CBDC syllabus and standard reference textbooks (including Sembulingam & Guyton). This is an educational reference portal and does not constitute official clinical recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
