import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  Table as TableIcon,
  Stethoscope,
  Microscope,
  HelpCircle,
  Zap,
  Bookmark,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
  FileText,
  Clock,
  Award,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  ShieldCheck,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';
import { cellInjuryFullTextChapter, ChapterSectionFullText } from '../../data/cellInjuryFullTextNotes';
import {
  cellInjuryComparisonTables,
  cellInjuryClinicalCases,
  cellInjuryGlossaryDefinitions,
  cellInjuryLaqBank,
  cellInjurySaqBank,
  cellInjuryMcqBank,
  cellInjuryVivaBank,
  cellInjuryRapidRevision,
  cellInjuryMnemonics,
  cellInjuryExamTraps
} from '../../data/cellInjuryChapterData';
import { CellInjuryFlowchartsView } from './CellInjuryFlowcharts';

type ChapterTab = 'textbook' | 'flowcharts' | 'tables' | 'clinical-cases' | 'spotters' | 'questions' | 'rapid-revision' | 'glossary';

export const CellInjuryChapterView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChapterTab>('textbook');
  const [activeSectionId, setActiveSectionId] = useState<string>(cellInjuryFullTextChapter[0].id);
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({
    'quick-answer': true,
    'core-concept': true,
    'detailed-notes': true,
    'morphology': true,
    'clinical-correlation': true,
    'homoeopathy': true,
    'exam-pearls': true
  });

  // Clinical cases state
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [revealedCases, setRevealedCases] = useState<Record<string, boolean>>({});

  // Question bank state
  const [questionSubTab, setQuestionSubTab] = useState<'laq' | 'saq' | 'mcq' | 'viva'>('laq');
  const [selectedLaqId, setSelectedLaqId] = useState<string>(cellInjuryLaqBank[0].id);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [revealedViva, setRevealedViva] = useState<Record<string, boolean>>({});

  // Tables state
  const [tableSearch, setTableSearch] = useState<string>('');
  const [selectedTableId, setSelectedTableId] = useState<string>(cellInjuryComparisonTables[0].id);

  // Glossary search
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  const currentSection = cellInjuryFullTextChapter.find(s => s.id === activeSectionId) || cellInjuryFullTextChapter[0];

  const toggleLayer = (layerKey: string) => {
    setExpandedLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const toggleCaseReveal = (caseId: string) => {
    setRevealedCases(prev => ({ ...prev, [caseId]: !prev[caseId] }));
  };

  const toggleVivaReveal = (vivaId: string) => {
    setRevealedViva(prev => ({ ...prev, [vivaId]: !prev[vivaId] }));
  };

  const handleMcqSelect = (mcqId: string, optionIdx: number) => {
    setMcqAnswers(prev => ({ ...prev, [mcqId]: optionIdx }));
  };

  const filteredGlossary = cellInjuryGlossaryDefinitions.filter(d =>
    d.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    d.oneLineDefinition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    d.expandedExplanation.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const filteredTables = cellInjuryComparisonTables.filter(t =>
    t.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
    t.description.toLowerCase().includes(tableSearch.toLowerCase())
  );

  const currentTable = cellInjuryComparisonTables.find(t => t.id === selectedTableId) || cellInjuryComparisonTables[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Chapter Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-b-3xl shadow-lg border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  2nd BHMS Pathology • General Pathology
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
                  NCH Competency: HomUG-PM I.2, I.3, I.4, I.5
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Cell Injury, Cellular Adaptations & Cell Death
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                A comprehensive digital textbook, revision guide, and clinical homoeopathic pathology master chapter aligned with the NCH 2nd BHMS syllabus and standard textbooks.
              </p>
            </div>

            {/* Quick stats badges */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/15 text-center">
                <div className="text-xl font-bold text-emerald-300">8 Parts</div>
                <div className="text-[11px] text-slate-300">Full Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/15 text-center">
                <div className="text-xl font-bold text-teal-300">15 Diagrams</div>
                <div className="text-[11px] text-slate-300">Flowcharts</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/15">
            {[
              { id: 'textbook', label: 'Digital Textbook', icon: BookOpen },
              { id: 'flowcharts', label: 'Interactive Flowcharts (15)', icon: Layers },
              { id: 'tables', label: 'Comparison Tables (10)', icon: TableIcon },
              { id: 'clinical-cases', label: 'Clinical Cases (10)', icon: Stethoscope },
              { id: 'spotters', label: 'Spotters & Stains', icon: Microscope },
              { id: 'questions', label: 'Exam Question Bank', icon: HelpCircle },
              { id: 'rapid-revision', label: 'Rapid Revision & Traps', icon: Zap },
              { id: 'glossary', label: 'Exam Glossary', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ChapterTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-emerald-950 shadow-md scale-105'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* ========================================================================= */}
        {/* TAB 1: DIGITAL TEXTBOOK CHAPTER */}
        {/* ========================================================================= */}
        {activeTab === 'textbook' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Table of Contents */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-emerald-600" />
                    Chapter Contents (8 Parts)
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    NCH Aligned
                  </span>
                </div>

                <div className="space-y-1.5 mt-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {cellInjuryFullTextChapter.map((section, idx) => {
                    const isSelected = section.id === activeSectionId;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSectionId(section.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all border ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                            : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            {section.partNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {section.estimatedReadTime}
                          </span>
                        </div>
                        <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100 mt-1 line-clamp-2">
                          {section.partTitle}
                        </h4>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Reading Section with Multi-Layer Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Header of Active Part */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {currentSection.partNumber} • {currentSection.estimatedReadTime} read
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {currentSection.nchCompetency}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                  {currentSection.partTitle}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {currentSection.introduction}
                </p>
              </div>

              {/* Layer 1: Quick Answer (Collapsible) */}
              <div className="bg-amber-50/80 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/50 p-5">
                <div
                  onClick={() => toggleLayer('quick-answer')}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-sm uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Layer 1: Quick Answer & Exam Summary
                  </div>
                  {expandedLayers['quick-answer'] ? <ChevronUp className="w-4 h-4 text-amber-700" /> : <ChevronDown className="w-4 h-4 text-amber-700" />}
                </div>
                {expandedLayers['quick-answer'] && (
                  <p className="mt-3 text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                    {currentSection.quickAnswer}
                  </p>
                )}
              </div>

              {/* Layer 2: Key Definitions (if any) */}
              {currentSection.keyDefinitions && currentSection.keyDefinitions.length > 0 && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Key Exam Definitions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSection.keyDefinitions.map((def, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <div className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          {def.term}
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                          {def.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Layer 3: Detailed Notes & Subsections */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    Layer 2: Detailed Revision Notes & Mechanisms
                  </h3>
                </div>

                <div className="space-y-6">
                  {currentSection.subsections.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 text-emerald-900 dark:text-emerald-300">
                        {sub.title}
                      </h4>
                      {sub.content.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sub.bulletPoints && (
                        <ul className="space-y-2 mt-2 pl-4 list-disc text-sm text-slate-700 dark:text-slate-300 marker:text-emerald-500">
                          {sub.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx} className="leading-relaxed">{bp}</li>
                          ))}
                        </ul>
                      )}

                      {sub.table && (
                        <div className="overflow-x-auto my-4 rounded-xl border border-slate-200 dark:border-slate-800">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                                {sub.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sub.table.rows.map((r, rIdx) => (
                                <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                  {r.map((c, cIdx) => (
                                    <td key={cIdx} className="p-3 align-top text-slate-700 dark:text-slate-300">{c}</td>
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
              </div>

              {/* Layer 4: Morphology (Gross & Microscopic) */}
              {currentSection.morphology && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-emerald-600" />
                    Layer 3: Gross & Microscopic Morphology
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2">
                        Gross (Macroscopic) Features
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                        {currentSection.morphology.gross.map((g, gIdx) => (
                          <li key={gIdx}>{g}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
                        Microscopic (Histology) Features
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                        {currentSection.morphology.microscopy.map((m, mIdx) => (
                          <li key={mIdx}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {(currentSection.morphology.keySpotterPoint || currentSection.morphology.keyIdentificationPoint) && (
                    <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
                      <span className="font-bold text-xs text-teal-900 dark:text-teal-300 block mb-1">
                        🔬 Key Histopathology Spotter Identification:
                      </span>
                      <p className="text-xs text-teal-800 dark:text-teal-200">
                        {currentSection.morphology.keySpotterPoint || currentSection.morphology.keyIdentificationPoint}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Special Stains (if present) */}
              {currentSection.specialStains && currentSection.specialStains.length > 0 && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Special Stains & Diagnostic Histochemistry
                  </h3>
                  <div className="space-y-3">
                    {currentSection.specialStains.map((stain, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-3">
                        <div className="space-y-1">
                          <span className="font-bold text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                            {stain.stain}
                          </span>
                          <p className="text-xs text-slate-800 dark:text-slate-200">
                            <strong>Demonstrates:</strong> {stain.target}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            <strong>Appearance:</strong> {stain.appearance}
                          </p>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 sm:max-w-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 self-start">
                          <strong>Clinical Use:</strong> {stain.diagnosticSignificance || stain.clinicalUse}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Layer 5: Clinical Correlation */}
              <div className="bg-blue-50/80 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-900/50 p-6 space-y-3">
                <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-300 text-sm uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" />
                  Layer 4: Clinical & Bedside Correlations
                </div>
                <div className="space-y-2">
                  {currentSection.clinicalCorrelation.map((c, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed">
                      • {c}
                    </p>
                  ))}
                </div>
              </div>

              {/* Layer 6: Homoeopathic & Miasmatic Correlation */}
              <div className="bg-purple-50/80 dark:bg-purple-950/20 rounded-2xl border border-purple-200 dark:border-purple-900/50 p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300 text-sm uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Layer 5: Homoeopathic Miasmatic Analysis & Therapeutics
                  </div>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-200">
                    Dominant Miasm: {currentSection.homoeopathicCorrelation.miasm}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-purple-950 dark:text-purple-200 leading-relaxed font-medium">
                  {currentSection.homoeopathicCorrelation.miasmaticAnalysis || currentSection.homoeopathicCorrelation.analysis}
                </p>

                <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
                  <strong>Practical Prescribing Principle:</strong> {currentSection.homoeopathicCorrelation.clinicalApplication}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {currentSection.homoeopathicCorrelation.remedies.map((rem, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/80">
                      <div className="font-bold text-xs text-purple-700 dark:text-purple-400">
                        {rem.name}
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 leading-snug">
                        <strong>Indication:</strong> {rem.indication}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                        <strong>Rationale:</strong> {rem.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 7: Exam Pearls */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-3">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  Layer 6: University Exam High-Yield Pearls
                </div>
                <div className="space-y-1.5">
                  {currentSection.examPearls.map((pearl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pearl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INTERACTIVE FLOWCHARTS */}
        {/* ========================================================================= */}
        {activeTab === 'flowcharts' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Cell Injury & Adaptations: Interactive Flowchart Library (15 Pathways)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Visual responsive decision trees and molecular cascades detailing every stage of cellular stress, biochemical injury, cell death, and adaptive transformation.
              </p>
            </div>

            <CellInjuryFlowchartsView />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: HIGH-YIELD COMPARISON TABLES */}
        {/* ========================================================================= */}
        {activeTab === 'tables' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search comparison tables..."
                  value={tableSearch}
                  onChange={e => setTableSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
                {filteredTables.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTableId(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedTableId === t.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {t.title.split('.')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Table Display */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    {currentTable.examImportance}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {currentTable.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentTable.description}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                      {currentTable.headers.map((head, idx) => (
                        <th key={idx} className="p-3.5 whitespace-nowrap">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTable.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`border-b border-slate-100 dark:border-slate-800/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors ${
                          rIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-850/50'
                        }`}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3.5 align-top ${
                              cIdx === 0 ? 'font-bold text-slate-900 dark:text-slate-100 min-w-[140px]' : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CLINICAL CASES SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'clinical-cases' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-600" />
                Pathology Clinical Vignettes & Case-Based Learning (10 Cases)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Real-world clinical presentations linking patient signs, symptoms, lab findings, and histopathology to pathological principles and homoeopathic insights.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Case Selection list */}
              <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {cellInjuryClinicalCases.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      activeCaseIndex === idx
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Case {c.caseNumber}
                      </span>
                      {revealedCases[c.id] && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                          Solved
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                      {c.title}
                    </h4>
                  </button>
                ))}
              </div>

              {/* Case details and reveal simulator */}
              {(() => {
                const currentCase = cellInjuryClinicalCases[activeCaseIndex];
                const isRevealed = revealedCases[currentCase.id];
                return (
                  <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                    <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                          Clinical Case #{currentCase.caseNumber}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          {currentCase.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleCaseReveal(currentCase.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        {isRevealed ? 'Hide Diagnosis' : 'Reveal Solution'}
                      </button>
                    </div>

                    {/* Scenario Box */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Patient Clinical Presentation:
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                        {currentCase.scenario}
                      </p>
                    </div>

                    {/* Question */}
                    <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        Clinical Examination Question:
                      </h4>
                      <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-semibold leading-relaxed">
                        {currentCase.question}
                      </p>
                    </div>

                    {/* Solution Layers */}
                    {isRevealed ? (
                      <div className="space-y-4 pt-2 animate-fadeIn">
                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                            Definitive Pathological Diagnosis:
                          </span>
                          <p className="text-sm font-extrabold text-emerald-950 dark:text-emerald-100">
                            {currentCase.diagnosis}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            Pathological Reasoning & Mechanism:
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {currentCase.pathologicalReasoning}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
                          <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider block mb-1">
                            Microscopic & Histopathological Findings:
                          </span>
                          <p className="text-xs text-indigo-950 dark:text-indigo-200">
                            {currentCase.histopathologyFindings}
                          </p>
                        </div>

                        {currentCase.homoeopathicRelevance && (
                          <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50">
                            <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider block mb-1">
                              Homoeopathic Miasmatic Perspective:
                            </span>
                            <p className="text-xs text-purple-950 dark:text-purple-200">
                              {currentCase.homoeopathicRelevance}
                            </p>
                          </div>
                        )}

                        <div className="p-3 rounded-xl bg-emerald-100/60 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span>Exam Takeaway: {currentCase.examTakeaway}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Attempt to formulate your diagnosis and reason out the biochemical/morphological mechanisms before revealing the answer.
                        </p>
                        <button
                          onClick={() => toggleCaseReveal(currentCase.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all"
                        >
                          Reveal Pathological Diagnosis & Reasoning
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: HISTOPATHOLOGY SPOTTERS & STAINS */}
        {/* ========================================================================= */}
        {activeTab === 'spotters' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-emerald-600" />
                Histopathology Spotter & Special Stains Master Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                "What would you see under the microscope?" • Standard gross, light microscopic, and special histochemical staining criteria for practical and viva examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Cellular Swelling / Hydropic Change',
                  category: 'Reversible Injury',
                  gross: 'Organ enlarged, pale, turgid, bulging cut surface.',
                  micro: 'Enlarged cells with pale cytoplasm crowded with fine clear microvacuoles (distended ER). Nucleus is centrally placed and intact.',
                  spotterTip: 'Proximal renal tubules showing swollen pale cells narrowing the tubular lumen.'
                },
                {
                  title: 'Fatty Change (Steatosis of Liver)',
                  category: 'Intracellular Accumulation',
                  gross: 'Liver enlarged, yellow, soft, greasy with rounded borders.',
                  micro: 'Hepatocytes show clear round vacuoles displacing the nucleus to the periphery (signet-ring appearance).',
                  spotterTip: 'Fresh frozen cryostat section stained with Oil Red O shows bright red lipid droplets.'
                },
                {
                  title: 'Coagulative Necrosis (Infarct)',
                  category: 'Cell Death',
                  gross: 'Firm, pale, wedge-shaped dry infarct with base at capsule.',
                  micro: 'Preserved cellular architecture ("tombstone" / "ghost cells") with hypereosinophilia and absent nuclei.',
                  spotterTip: 'Myocardium or kidney showing preserved cell outlines without nuclei, bordered by neutrophils.'
                },
                {
                  title: 'Liquefactive Necrosis (Brain Infarct / Abscess)',
                  category: 'Cell Death',
                  gross: 'Soft, viscous, fluid-filled cystic cavity or semi-liquid debris.',
                  micro: 'Total loss of tissue architecture; cavity filled with foamy lipid-laden macrophages (Gitter cells) and cellular debris.',
                  spotterTip: 'Brain parenchyma replaced by foamy microglial macrophages and astrocytic gliosis.'
                },
                {
                  title: 'Caseous Necrosis (Tuberculosis)',
                  category: 'Cell Death / Granuloma',
                  gross: 'Yellowish-white, cheesy, friable, non-glistening material.',
                  micro: 'Central amorphous eosinophilic debris bordered by epithelioid cells, Langhans giant cells, and T lymphocytes.',
                  spotterTip: 'Langhans giant cell showing horseshoe arrangement of peripheral nuclei around central caseation.'
                },
                {
                  title: 'Fat Necrosis (Enzymatic Saponification)',
                  category: 'Cell Death',
                  gross: 'Opaque, chalky-white, gritty flecks on omental fat.',
                  micro: 'Shadowy outlines of dead adipocytes with basophilic calcium soap deposits and foamy histiocytes.',
                  spotterTip: 'Basophilic calcium soaps filling necrotic ghost adipocytes in acute pancreatitis.'
                },
                {
                  title: 'Fibrinoid Necrosis',
                  category: 'Vascular Injury',
                  gross: 'Arterial walls thickened with surrounding purpura.',
                  micro: 'Circumferential, smudgy, bright pink (eosinophilic) homogeneous deposits of antigen-antibody complexes and fibrin in vessel media.',
                  spotterTip: 'Polyarteritis nodosa medium-sized muscular artery showing bright pink smudgy wall necrosis.'
                },
                {
                  title: 'Apoptosis (Councilman Body)',
                  category: 'Programmed Cell Death',
                  gross: 'No gross suppuration or macroscopic tissue necrosis.',
                  micro: 'Isolated, single shrunken cells with dense pyknotic chromatin fragments and bright pink cytoplasm, surrounded by a halo.',
                  spotterTip: 'Viral hepatitis liver biopsy showing round intensely pink Councilman bodies extruded into sinusoids.'
                },
                {
                  title: 'Dystrophic Calcification (Atheroma)',
                  category: 'Pathological Calcification',
                  gross: 'Hard, rock-like, gritty calcified brittle arterial plaques.',
                  micro: 'Intensely basophilic (deep purple-blue) amorphous or crystalline deposits in necrotic atheromatous core.',
                  spotterTip: 'Von Kossa stain turns calcium phosphate deposits jet black.'
                }
              ].map((spot, sIdx) => (
                <div key={sIdx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        {spot.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-2">
                      {spot.title}
                    </h3>

                    <div className="space-y-2 mt-3 text-xs">
                      <div>
                        <strong className="text-indigo-700 dark:text-indigo-400">Gross:</strong>{' '}
                        <span className="text-slate-700 dark:text-slate-300">{spot.gross}</span>
                      </div>
                      <div>
                        <strong className="text-teal-700 dark:text-teal-400">Microscopy:</strong>{' '}
                        <span className="text-slate-700 dark:text-slate-300">{spot.micro}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                    🔬 <strong>Spotter Key:</strong> {spot.spotterTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: EXAM QUESTION BANK (LAQ, SAQ, MCQ, VIVA) */}
        {/* ========================================================================= */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {/* Sub-tabs for Question Types */}
            <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {[
                { id: 'laq', label: 'Long Answer Questions (LAQs • 10 Marks)' },
                { id: 'saq', label: 'Short Answer Questions (SAQs • 5 Marks)' },
                { id: 'mcq', label: 'Interactive MCQ Quiz' },
                { id: 'viva', label: 'Viva Voce Flashcards' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setQuestionSubTab(st.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    questionSubTab === st.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* LAQs Section */}
            {questionSubTab === 'laq' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {cellInjuryLaqBank.map((laq, idx) => (
                    <button
                      key={laq.id}
                      onClick={() => setSelectedLaqId(laq.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedLaqId === laq.id
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          LAQ #{idx + 1} • {laq.marks} Marks
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{laq.nchCode}</span>
                      </div>
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100 mt-1 line-clamp-2">
                        {laq.question}
                      </h4>
                    </button>
                  ))}
                </div>

                {/* LAQ Blueprint display */}
                {(() => {
                  const currentLaq = cellInjuryLaqBank.find(l => l.id === selectedLaqId) || cellInjuryLaqBank[0];
                  return (
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            University Exam Question Blueprint
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                            {currentLaq.marks} Marks Full Blueprint
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                          {currentLaq.question}
                        </h3>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                          1. Opening Introduction (2 Marks Blueprint):
                        </h4>
                        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                          {currentLaq.structure.introduction}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          2. Mandatory Answer Headings & Structure:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentLaq.structure.headings.map((h, hIdx) => (
                            <div key={hIdx} className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs font-medium text-emerald-950 dark:text-emerald-200">
                              {h}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          3. Core Points to Score Maximum Marks:
                        </h4>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                          {currentLaq.structure.mainContentPoints.map((pt, pIdx) => (
                            <li key={pIdx}>{pt}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-xs text-indigo-950 dark:text-indigo-200">
                        <strong>🎨 Recommended Exam Diagram:</strong> {currentLaq.structure.diagramRecommendation}
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-950 dark:text-amber-200">
                        <strong>⚠️ Common Mistakes to Avoid:</strong>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          {currentLaq.structure.commonMistakes.map((m, mIdx) => (
                            <li key={mIdx}>{m}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500 self-center mr-2">Keywords:</span>
                        {currentLaq.structure.examinerKeywords.map((kw, kIdx) => (
                          <span key={kIdx} className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* SAQs Section */}
            {questionSubTab === 'saq' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cellInjurySaqBank.map((saq, sIdx) => (
                  <div key={saq.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 uppercase">
                          {saq.type} • {saq.marks} Marks
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{saq.nchCode}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-2">
                        {saq.question}
                      </h3>

                      <div className="mt-3 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Structured Answer Key:
                        </h4>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                          {saq.answerPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="leading-relaxed">{pt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 font-medium">
                      💡 <strong>Examiner Tip:</strong> {saq.examTip}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MCQs Section */}
            {questionSubTab === 'mcq' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      Cell Injury & Adaptation Interactive MCQ Quiz
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {Object.keys(mcqAnswers).length} of {cellInjuryMcqBank.length} answered
                    </p>
                  </div>
                  <button
                    onClick={() => setMcqAnswers({})}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Quiz
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cellInjuryMcqBank.map((mcq, mIdx) => {
                    const selectedOption = mcqAnswers[mcq.id];
                    const isAnswered = selectedOption !== undefined;
                    const isCorrect = isAnswered && selectedOption === mcq.correctIndex;

                    return (
                      <div key={mcq.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            Q{mIdx + 1} • {mcq.topic}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            mcq.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                            mcq.difficulty === 'Moderate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          }`}>
                            {mcq.difficulty}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-snug">
                          {mcq.question}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2">
                          {mcq.options.map((opt, optIdx) => {
                            let optStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-300';
                            if (isAnswered) {
                              if (optIdx === mcq.correctIndex) {
                                optStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                              } else if (optIdx === selectedOption) {
                                optStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-200';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleMcqSelect(mcq.id, optIdx)}
                                disabled={isAnswered}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                              >
                                <span>{opt}</span>
                                {isAnswered && optIdx === mcq.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {isAnswered && optIdx === selectedOption && optIdx !== mcq.correctIndex && (
                                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {isAnswered && (
                          <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                              : 'bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                          }`}>
                            <strong>Explanation:</strong> {mcq.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Viva Voce Flashcards */}
            {questionSubTab === 'viva' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cellInjuryVivaBank.map((viva, vIdx) => {
                  const isRevealed = revealedViva[viva.id];
                  return (
                    <div key={viva.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                            {viva.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Viva Card #{vIdx + 1}</span>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-2">
                          Q: {viva.question}
                        </h4>

                        <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                          <strong>One-Line Answer:</strong> {viva.oneLineAnswer}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        {isRevealed ? (
                          <div className="space-y-3 animate-fadeIn">
                            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs">
                              <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">
                                🎯 Expected Follow-up Question from Examiner:
                              </span>
                              <p className="text-amber-950 dark:text-amber-200 font-semibold">
                                {viva.followUpQuestion}
                              </p>
                              <p className="mt-2 text-slate-700 dark:text-slate-300 pt-2 border-t border-amber-200 dark:border-amber-800">
                                <strong>Follow-up Answer:</strong> {viva.followUpAnswer}
                              </p>
                            </div>

                            <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                              💡 <strong>Examiner Tip:</strong> {viva.examinerTip}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleVivaReveal(viva.id)}
                            className="w-full py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Reveal Examiner Follow-up Question
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: RAPID REVISION & EXAM TRAPS */}
        {/* ========================================================================= */}
        {activeTab === 'rapid-revision' && (
          <div className="space-y-8">
            {/* 1-Minute Ultra Essentials */}
            <div className="bg-gradient-to-r from-amber-500 to-rose-600 text-white p-6 rounded-3xl shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-200" />
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider">
                  ⚡ 1-Minute Last-Minute Exam Essentials
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-medium">
                {cellInjuryRapidRevision.oneMinuteEssentials.map((ess, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    {ess}
                  </div>
                ))}
              </div>
            </div>

            {/* 10-Minute Comprehensive Revision */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  ⏱️ 10-Minute High-Yield Chapter Revision Summary
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cellInjuryRapidRevision.tenMinuteSummary.map((sec, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                      {sec.title}
                    </h4>
                    <ul className="space-y-2 pl-4 list-disc text-xs text-slate-700 dark:text-slate-300">
                      {sec.points.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Yield Mnemonics */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  🧠 High-Yield Memory Aids & Mnemonics
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cellInjuryMnemonics.map((mnem, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-2">
                    <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                      {mnem.topic}
                    </span>
                    <div className="font-black text-sm text-purple-950 dark:text-purple-200">
                      {mnem.mnemonic}
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pl-3 list-disc">
                      {mnem.expansion.map((ex, eIdx) => (
                        <li key={eIdx}>{ex}</li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                      {mnem.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Exam & MCQ Traps */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  ⚠️ Common Exam & MCQ Traps (Where Students Lose Marks)
                </h3>
              </div>

              <div className="space-y-3">
                {cellInjuryExamTraps.map((trap, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row gap-4 items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-xs">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Common Fallacy: "{trap.trap}"</span>
                      </div>
                      <p className="text-xs text-emerald-950 dark:text-emerald-200 font-medium pl-6">
                        <strong>Correct Medical Fact:</strong> {trap.correction}
                      </p>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 sm:max-w-xs pl-6 sm:pl-0 italic">
                      Why confusing: {trap.whyStudentsGetConfused}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: EXAM GLOSSARY DEFINITIONS */}
        {/* ========================================================================= */}
        {activeTab === 'glossary' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Exam-Ready Medical Glossary ({filteredGlossary.length} Terms)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Precise one-line definitions with key examples and examiner buzzwords.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search glossary terms..."
                  value={glossarySearch}
                  onChange={e => setGlossarySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGlossary.map((g, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                      {g.term}
                    </h4>
                    <p className="text-xs text-slate-800 dark:text-slate-200 mt-1 font-medium leading-relaxed">
                      "{g.oneLineDefinition}"
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {g.expandedExplanation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                    <div className="text-slate-500 dark:text-slate-400">
                      <strong>Classic Example:</strong> {g.keyExample}
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      <strong>Keywords:</strong> {g.examKeyword}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
