import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Stethoscope, 
  Sparkles, 
  Clock, 
  Target, 
  Layers, 
  HelpCircle, 
  FileText, 
  AlertTriangle, 
  Lightbulb, 
  Network, 
  Book, 
  ChevronRight, 
  Search,
  Check,
  RotateCw,
  Quote,
  Activity,
  UserCheck,
  Brain
} from 'lucide-react';
import { CBDC_COMPETENCIES, CbdcCompetency } from '../data/cbdc_organon_syllabus';

interface CbdcLearningEcosystemProps {
  onSelectAphorism?: (id: number) => void;
}

export const CbdcLearningEcosystem: React.FC<CbdcLearningEcosystemProps> = ({ onSelectAphorism }) => {
  const [selectedYear, setSelectedYear] = useState<"1st BHMS" | "2nd BHMS" | "3rd BHMS" | "4th BHMS">("1st BHMS");
  const [searchTerm, setSearchTerm] = useState('');
  const yearCompetencies = CBDC_COMPETENCIES[selectedYear] || [];
  const [selectedCompetencyId, setSelectedCompetencyId] = useState<string>(yearCompetencies[0]?.id || "OG1.1");
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'clinical' | 'visuals' | 'cbdc' | 'exams' | 'mcqs' | 'revision'>('overview');

  // Mcq Interactive States
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showMcqExplanations, setShowMcqExplanations] = useState<Record<number, boolean>>({});

  // Active Competency
  const activeCompetency = yearCompetencies.find(c => c.id === selectedCompetencyId) || yearCompetencies[0] || CBDC_COMPETENCIES["1st BHMS"][0];

  // Filter competencies based on search
  const filteredCompetencies = yearCompetencies.filter(c => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      c.topicTitle.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.quickOverview.toLowerCase().includes(q)
    );
  });

  const handleYearChange = (year: "1st BHMS" | "2nd BHMS" | "3rd BHMS" | "4th BHMS") => {
    setSelectedYear(year);
    const comps = CBDC_COMPETENCIES[year] || [];
    if (comps.length > 0) {
      setSelectedCompetencyId(comps[0].id);
    }
    setUserAnswers({});
    setShowMcqExplanations({});
  };

  const handleOptionSelect = (mcqIndex: number, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [mcqIndex]: optionIndex }));
    setShowMcqExplanations(prev => ({ ...prev, [mcqIndex]: true }));
  };

  return (
    <div className="space-y-10">
      {/* Year-Wise Syllabus Pathway Selector Header */}
      <section className="bg-white rounded-3xl border border-[#ebdcb9] p-6 shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#f3ebda]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/10 text-amber-900 border border-amber-800/20 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4 text-amber-800" /> NCH CBDC 2022+ Curriculum Standard
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2c241a]">
              Organon of Medicine <span className="text-amber-700 italic font-normal">Competency Pathway</span>
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-1">
              Select your BHMS Academic Year to explore NCH Competencies, Specific Learning Outcomes (SLOs), and Question Banks.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Official NCH Competency Aligned</span>
          </div>
        </div>

        {/* Year Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["1st BHMS", "2nd BHMS", "3rd BHMS", "4th BHMS"] as const).map(year => {
            const isSelected = selectedYear === year;
            const count = (CBDC_COMPETENCIES[year] || []).length;
            return (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-[#fdfbf2] border-amber-800 ring-2 ring-amber-800/10 shadow-md scale-[1.02]'
                    : 'bg-white border-stone-200 hover:border-amber-600/40 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {year}
                  </span>
                  <span className="text-[10px] font-bold text-stone-400">{count} Modules</span>
                </div>
                <h3 className={`text-sm font-bold mt-1 ${isSelected ? 'text-amber-950' : 'text-[#2c241a]'}`}>
                  {year === "1st BHMS" ? "Foundations & Vital Force" :
                   year === "2nd BHMS" ? "Disease Mechanics & Laws" :
                   year === "3rd BHMS" ? "Posology & LM Scale" : "Mental Diseases & Philosophy"}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Grid: Competency Sidebar + Detailed Competency Ecosystem Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: Topic & Competency Index */}
        <aside className="lg:col-span-4 bg-white rounded-3xl border border-[#ebdcb9] p-5 shadow-sm space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-xs font-bold text-[#2c241a] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-800" />
                {selectedYear} Syllabus Modules
              </h3>
              <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                {filteredCompetencies.length} Topics
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search competency or topic..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>
          </div>

          {/* Competency List Cards */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredCompetencies.map(comp => {
              const isSelected = selectedCompetencyId === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompetencyId(comp.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs space-y-2 ${
                    isSelected
                      ? 'bg-[#fdfbf2] border-amber-800 ring-2 ring-amber-800/10 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:bg-white hover:border-amber-600/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest ${
                      isSelected ? 'bg-amber-800 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {comp.id}
                    </span>
                    <span className="text-[9px] text-stone-400 font-bold">{comp.readingTime}</span>
                  </div>

                  <h4 className={`font-bold leading-tight ${isSelected ? 'text-amber-950 font-extrabold' : 'text-[#2c241a]'}`}>
                    {comp.topicTitle}
                  </h4>

                  <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">
                    {comp.subtitle}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1 text-[9px] font-semibold text-stone-400 border-t border-stone-200/50">
                    <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">{comp.bloomLevel}</span>
                    <span className="bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">{comp.millerLevel}</span>
                    <span className="ml-auto text-amber-800 font-bold flex items-center gap-0.5">
                      Open <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT MAIN DESK: Comprehensive Competency View */}
        <section className="lg:col-span-8 bg-white rounded-3xl border border-[#ebdcb9] overflow-hidden shadow-sm space-y-0">
          
          {/* Header Banner for Selected Competency */}
          <div className="bg-[#FAF8F2] p-6 border-b border-[#ebdcb9] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-800 text-white rounded-lg text-xs font-black tracking-widest">
                  {activeCompetency.id}
                </span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold">
                  {activeCompetency.year}
                </span>
                <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-bold">
                  {activeCompetency.difficulty} Level
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-700" /> {activeCompetency.readingTime}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-amber-700" /> {activeCompetency.teachingHours} Hours</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-[#2c241a] leading-tight">
                {activeCompetency.topicTitle}
              </h1>
              <p className="text-xs md:text-sm text-stone-600 mt-1 italic font-sans">
                {activeCompetency.subtitle}
              </p>
            </div>

            {/* Badges for Bloom's Taxonomy, Miller's Pyramid, TL & Assessment Methods */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ebdcb9]/50 text-[10px] font-bold">
              <span className="bg-amber-800/10 text-amber-900 border border-amber-800/20 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Brain className="w-3 h-3 text-amber-800" /> Bloom: {activeCompetency.bloomLevel}
              </span>
              <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Target className="w-3 h-3 text-emerald-700" /> Miller: {activeCompetency.millerLevel}
              </span>
              <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md">
                TL: {activeCompetency.tlMethods.join(", ")}
              </span>
              <span className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md">
                Assessment: {activeCompetency.assessmentMethods.join(", ")}
              </span>
            </div>
          </div>

          {/* Sub-Navigation Tabs inside the Competency View */}
          <div className="bg-[#fcfaf5] border-b border-[#ebdcb9] px-6 pt-3 flex flex-wrap gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: '1. Overview & Concepts', icon: <Book className="w-3.5 h-3.5" /> },
              { id: 'clinical', label: '2. Clinical Application', icon: <Stethoscope className="w-3.5 h-3.5" /> },
              { id: 'visuals', label: '3. Visual Aids & Flowcharts', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'cbdc', label: '4. NCH CBDC Mapping', icon: <Network className="w-3.5 h-3.5" /> },
              { id: 'exams', label: '5. University Q-Bank', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'mcqs', label: '6. AIAPGET MCQs', icon: <Award className="w-3.5 h-3.5" /> },
              { id: 'revision', label: '7. Quick Revision & Pearls', icon: <Sparkles className="w-3.5 h-3.5" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 border-t border-x ${
                  activeSubTab === tab.id
                    ? 'bg-white text-amber-900 border-[#ebdcb9] border-b-white -mb-px shadow-sm font-extrabold'
                    : 'bg-transparent text-stone-600 border-transparent hover:text-amber-800 hover:bg-stone-100/60'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* SUB-TAB 1: OVERVIEW & STEP-BY-STEP CONCEPTS */}
          {activeSubTab === 'overview' && (
            <div className="p-6 space-y-8">
              
              {/* Quick Overview Callout */}
              <div className="bg-[#FAF8F2] border-l-4 border-amber-800 p-5 rounded-r-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  Quick Executive Summary (2-Minute Read)
                </div>
                <p className="text-sm text-stone-800 leading-relaxed font-sans">
                  {activeCompetency.quickOverview}
                </p>
              </div>

              {/* Why This Topic Matters (4 Quadrants) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-800" />
                  Why This Topic Matters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest block">Clinical OPD Value</span>
                    <p className="text-xs text-stone-700 leading-relaxed">{activeCompetency.whyThisMatters.clinical}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block">University Exam Weightage</span>
                    <p className="text-xs text-stone-700 leading-relaxed">{activeCompetency.whyThisMatters.university}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-extrabold text-blue-800 uppercase tracking-widest block">AIAPGET Entrance Importance</span>
                    <p className="text-xs text-stone-700 leading-relaxed">{activeCompetency.whyThisMatters.aiapget}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-extrabold text-purple-800 uppercase tracking-widest block">Practical Bedside Skill</span>
                    <p className="text-xs text-stone-700 leading-relaxed">{activeCompetency.whyThisMatters.practical}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Concept Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  Detailed Concept Explanation
                </h3>
                <div className="space-y-2.5">
                  {activeCompetency.conceptExplanation.map((paragraph, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
                      <p className="text-xs md:text-sm text-stone-800 leading-relaxed font-sans">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Logic Flow */}
              {activeCompetency.stepByStep && activeCompetency.stepByStep.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    Step-by-Step Clinical Procedure
                  </h3>
                  <div className="bg-[#fcfaf3] p-5 rounded-2xl border border-[#ebdcb9] space-y-2">
                    {activeCompetency.stepByStep.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-stone-800">
                        <span className="w-5 h-5 rounded-full bg-amber-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed font-sans">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Essential Exam Definitions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-800" />
                  Essential University Definitions & Memory Tips
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {activeCompetency.definitions.map((def, idx) => (
                    <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">{def.term}</h4>
                        <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          Memory Tip: {def.memoryTip}
                        </span>
                      </div>
                      <p className="text-xs text-stone-800 italic">"{def.definition}"</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div>
                          <strong className="text-stone-600 block text-[10px] uppercase">Simple Meaning:</strong>
                          <span className="text-stone-700">{def.simpleMeaning}</span>
                        </div>
                        <div>
                          <strong className="text-stone-600 block text-[10px] uppercase">Exam Answer Wording:</strong>
                          <span className="text-stone-700">{def.examDefinition}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 2: CLINICAL APPLICATION */}
          {activeSubTab === 'clinical' && (
            <div className="p-6 space-y-8">
              
              {/* Real Indian OPD Clinical Example */}
              <div className="bg-[#FAF8F2] border border-[#ebdcb9] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-[#ebdcb9] pb-3">
                  <Stethoscope className="w-5 h-5 text-amber-800" />
                  <div>
                    <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-wide">Real OPD Clinical Case Study</h3>
                    <p className="text-[10px] text-stone-500">{activeCompetency.clinicalApplication.opdExample.setting}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Patient Profile</span>
                    <p className="text-stone-800 font-semibold">{activeCompetency.clinicalApplication.opdExample.patientProfile}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 uppercase">Homoeopathic Action</span>
                    <p className="text-stone-800 font-semibold">{activeCompetency.clinicalApplication.opdExample.HomoeopathicAction}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Clinical Presentation & Scenario</span>
                  <p className="text-xs text-stone-800 leading-relaxed font-sans">{activeCompetency.clinicalApplication.opdExample.scenario}</p>
                </div>

                <div className="bg-amber-800/10 text-amber-950 p-4 rounded-xl border border-amber-800/20 text-xs font-bold space-y-1">
                  <span className="text-[10px] uppercase text-amber-800 tracking-wider block">Key Clinical Lesson</span>
                  <p>{activeCompetency.clinicalApplication.opdExample.clinicalLesson}</p>
                </div>
              </div>

              {/* Everyday Life Analogy */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <h3 className="text-sm font-bold text-[#2c241a] uppercase">Everyday Life Analogy</h3>
                  <span className="text-[10px] font-bold text-stone-500 ml-auto">Concept: {activeCompetency.clinicalApplication.everydayAnalogy.concept}</span>
                </div>
                <h4 className="text-xs font-bold text-amber-900">{activeCompetency.clinicalApplication.everydayAnalogy.analogyTitle}</h4>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {activeCompetency.clinicalApplication.everydayAnalogy.analogyText}
                </p>
              </div>

              {/* Clinical Pearls */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  Senior Professor's Clinical Pearls
                </h3>
                <div className="space-y-2">
                  {activeCompetency.clinicalPearls.map((pearl, idx) => (
                    <div key={idx} className="p-3.5 bg-[#fdfbf2] rounded-xl border border-[#ebdcb9] flex items-start gap-3 text-xs text-stone-800">
                      <span className="text-amber-800 font-bold">✦</span>
                      <p className="leading-relaxed">{pearl}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 3: VISUAL AIDS & FLOWCHARTS */}
          {activeSubTab === 'visuals' && (
            <div className="p-6 space-y-8">
              
              {/* Flowchart Visualizer */}
              <div className="bg-white border border-[#ebdcb9] rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-3">
                  <Layers className="w-4 h-4 text-amber-800" />
                  {activeCompetency.visualAids.flowchart.title}
                </h3>

                <div className="space-y-3 pt-2">
                  {activeCompetency.visualAids.flowchart.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-800">
                        {step}
                      </div>
                      {idx < activeCompetency.visualAids.flowchart.steps.length - 1 && (
                        <div className="hidden md:block text-stone-300">↓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Table */}
              {activeCompetency.visualAids.comparisonTable && (
                <div className="bg-white border border-[#ebdcb9] rounded-2xl p-6 space-y-4 overflow-x-auto">
                  <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-wider">
                    {activeCompetency.visualAids.comparisonTable.title}
                  </h3>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF8F2] border-b border-[#ebdcb9]">
                        {activeCompetency.visualAids.comparisonTable.headers.map((h, idx) => (
                          <th key={idx} className="p-3 font-bold text-amber-950 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {activeCompetency.visualAids.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-stone-50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-3 text-stone-800 ${cIdx === 0 ? 'font-bold text-stone-900 bg-stone-50/50' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mind Map Hierarchy */}
              <div className="bg-[#FAF8F2] border border-[#ebdcb9] rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-[#2c241a] uppercase tracking-wider flex items-center gap-2">
                  <Network className="w-4 h-4 text-amber-800" />
                  Mind Map: {activeCompetency.visualAids.mindMapNodes.central}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {activeCompetency.visualAids.mindMapNodes.branches.map((b, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                      <h4 className="text-xs font-bold text-amber-900 uppercase border-b border-stone-100 pb-1">
                        {b.title}
                      </h4>
                      <ul className="space-y-1">
                        {b.subitems.map((sub, sIdx) => (
                          <li key={sIdx} className="text-[11px] text-stone-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-amber-700 rounded-full" />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 4: NCH CBDC MAPPING */}
          {activeSubTab === 'cbdc' && (
            <div className="p-6 space-y-8">
              
              {/* Domain & Competencies */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-800" />
                  Five Competency Domains
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-extrabold text-amber-800 uppercase">Domain 1: Knowledge</span>
                    <p className="text-stone-800 font-medium">{activeCompetency.domain.knowledge}</p>
                  </div>
                  {activeCompetency.domain.skill && (
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-extrabold text-emerald-800 uppercase">Domain 2: Skill</span>
                      <p className="text-stone-800 font-medium">{activeCompetency.domain.skill}</p>
                    </div>
                  )}
                  {activeCompetency.domain.communication && (
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-extrabold text-blue-800 uppercase">Domain 3: Communication</span>
                      <p className="text-stone-800 font-medium">{activeCompetency.domain.communication}</p>
                    </div>
                  )}
                  {activeCompetency.domain.professionalism && (
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-extrabold text-purple-800 uppercase">Domain 4: Professionalism</span>
                      <p className="text-stone-800 font-medium">{activeCompetency.domain.professionalism}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Specific Learning Outcomes (SLOs) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-800" />
                  Specific Learning Outcomes (SLOs)
                </h3>
                <div className="bg-[#fcfaf3] p-4 rounded-2xl border border-[#ebdcb9] space-y-2">
                  {activeCompetency.sloList.map((slo, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{slo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horizontal & Vertical Integration */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Network className="w-4 h-4 text-amber-800" />
                  Horizontal & Vertical Subject Integration
                </h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-amber-800 uppercase">Horizontal Integration (Same Year Subjects)</span>
                    <div className="space-y-1.5">
                      {activeCompetency.integration.horizontal.map((h, idx) => (
                        <div key={idx} className="text-xs text-stone-800 flex items-start gap-2">
                          <span className="font-bold text-amber-950 min-w-[120px]">{h.subject}:</span>
                          <span className="text-stone-600">{h.correlation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">Vertical Progression (I to IV BHMS)</span>
                    <p className="text-xs text-stone-700 font-medium">{activeCompetency.integration.vertical.progression}</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 5: UNIVERSITY QUESTION BANK & VIVA VOCE */}
          {activeSubTab === 'exams' && (
            <div className="p-6 space-y-8">
              
              {/* Viva Voce Questions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-800" />
                  University Viva Voce Question Bank
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Easy Viva Questions</span>
                    <ul className="space-y-1.5 text-stone-800">
                      {activeCompetency.vivaQuestions.easy.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
                    <span className="text-[10px] font-bold text-amber-900 uppercase block">Moderate Viva Questions</span>
                    <ul className="space-y-1.5 text-stone-800">
                      {activeCompetency.vivaQuestions.moderate.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-800 font-bold">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 space-y-2">
                    <span className="text-[10px] font-bold text-purple-900 uppercase block">Difficult Viva Questions</span>
                    <ul className="space-y-1.5 text-stone-800">
                      {activeCompetency.vivaQuestions.difficult.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-700 font-bold">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Written Exam Questions (2m, 5m, 10m) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-800" />
                  Written Examination Question Bank
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">2 Marks Questions (SAQ)</span>
                    <ul className="space-y-1 text-stone-800">
                      {activeCompetency.universityQuestionBank.twoMarks.map((q, idx) => (
                        <li key={idx}><strong>Q{idx + 1}:</strong> {q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-amber-800 uppercase">5 Marks Questions (Short Notes)</span>
                    <ul className="space-y-1 text-stone-800">
                      {activeCompetency.universityQuestionBank.fiveMarks.map((q, idx) => (
                        <li key={idx}><strong>Q{idx + 1}:</strong> {q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">10 Marks / Long Essay Questions</span>
                    <ul className="space-y-1 text-stone-800">
                      {activeCompetency.universityQuestionBank.tenMarks.map((q, idx) => (
                        <li key={idx}><strong>Q{idx + 1}:</strong> {q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Assertion & Reason Questions */}
              {activeCompetency.universityQuestionBank.assertionReason && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                    <Brain className="w-4 h-4 text-amber-800" />
                    Assertion & Reasoning Questions
                  </h3>
                  <div className="space-y-2 text-xs">
                    {activeCompetency.universityQuestionBank.assertionReason.map((ar, idx) => (
                      <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                        <p className="font-bold text-stone-900">{ar.statement}</p>
                        <p className="text-stone-700">{ar.reason}</p>
                        <div className="pt-2 border-t border-stone-200 flex flex-col gap-0.5">
                          <span className="text-emerald-800 font-bold">Answer: {ar.answer}</span>
                          <span className="text-stone-600 text-[11px]">{ar.explanation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* SUB-TAB 6: AIAPGET ENTRANCE MCQS */}
          {activeSubTab === 'mcqs' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-800" />
                  AIAPGET Entrance Examination MCQs
                </h3>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  {activeCompetency.aiapgetMcqs.length} High-Yield MCQs
                </span>
              </div>

              <div className="space-y-6">
                {activeCompetency.aiapgetMcqs.map((mcq, mIdx) => {
                  const selectedOpt = userAnswers[mIdx];
                  const showExp = showMcqExplanations[mIdx];
                  return (
                    <div key={mIdx} className="p-5 bg-[#FAF8F2] rounded-2xl border border-[#ebdcb9] space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {mIdx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-[#2c241a] leading-relaxed">
                          {mcq.question}
                        </h4>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-9">
                        {mcq.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === mcq.correctIndex;
                          const isSelected = selectedOpt === oIdx;
                          let btnClass = "bg-white border-stone-200 text-stone-800 hover:bg-stone-50";

                          if (showExp) {
                            if (isCorrect) {
                              btnClass = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                            } else if (isSelected) {
                              btnClass = "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleOptionSelect(mIdx, oIdx)}
                              className={`p-3 rounded-xl border text-xs text-left transition-all ${btnClass}`}
                            >
                              <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation & High Yield Fact */}
                      {showExp && (
                        <div className="pl-9 space-y-2 pt-2 border-t border-[#ebdcb9]">
                          <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                            <span className="text-[10px] font-bold text-amber-800 uppercase block">Rationale</span>
                            <p className="text-stone-700">{mcq.explanation}</p>
                          </div>
                          {mcq.highYieldFact && (
                            <div className="p-2.5 bg-amber-800 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                              <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
                              <span>AIAPGET High-Yield Fact: {mcq.highYieldFact}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 7: QUICK REVISION & PEARLS */}
          {activeSubTab === 'revision' && (
            <div className="p-6 space-y-8">
              
              {/* One-Minute Executive Summary */}
              <div className="bg-[#FAF8F2] border-2 border-amber-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-amber-900 tracking-widest block">
                  ⚡ 1-Minute Master Summary
                </span>
                <p className="text-sm font-serif font-bold text-[#2c241a] leading-relaxed">
                  "{activeCompetency.oneMinuteSummary}"
                </p>
              </div>

              {/* Quick Revision Bullet Notes */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  One-Page Revision Checklist
                </h3>
                <div className="bg-[#fcfaf3] p-5 rounded-2xl border border-[#ebdcb9] space-y-2">
                  {activeCompetency.quickRevisionNotes.map((note, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 font-medium">
                      <span className="text-amber-800 font-bold">✓</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Common Exam Mistakes to Avoid
                </h3>
                <div className="space-y-2">
                  {activeCompetency.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 font-medium flex items-start gap-2">
                      <span className="font-bold text-rose-700">✕</span>
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mnemonics */}
              {activeCompetency.mnemonics && activeCompetency.mnemonics.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c241a] flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-800" />
                    High-Yield Mnemonics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCompetency.mnemonics.map((m, idx) => (
                      <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                          <h4 className="text-xs font-bold text-amber-950">{m.title}</h4>
                          <span className="px-2.5 py-1 bg-amber-800 text-white rounded font-mono text-xs font-black">
                            {m.code}
                          </span>
                        </div>
                        <ul className="space-y-1 text-xs text-stone-700">
                          {m.breakdown.map((b, bIdx) => (
                            <li key={bIdx} className="font-mono">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </section>
      </div>
    </div>
  );
};
