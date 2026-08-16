import React, { useState } from 'react';
import { 
  BookOpen, 
  Baby, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  AlertCircle, 
  Search,
  Activity,
  FileQuestion,
  GraduationCap
} from 'lucide-react';
import { 
  gynaeUnit1Chapters, 
  gynaeUnit2Chapters, 
  GynaeUnitChapter 
} from '../../data/nchGynecologyCurriculum';

export function GynaeSyllabusViewer() {
  const [selectedUnit, setSelectedUnit] = useState<'unit1' | 'unit2'>('unit1');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('gyn-1');

  const currentChapters = selectedUnit === 'unit1' ? gynaeUnit1Chapters : gynaeUnit2Chapters;

  const filteredChapters = currentChapters.filter(ch => {
    const query = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(query) ||
      ch.summary.toLowerCase().includes(query) ||
      ch.coreTopics.some(t => t.toLowerCase().includes(query)) ||
      ch.clinicalPearls.some(p => p.toLowerCase().includes(query)) ||
      (ch.therapeuticsHighlight && ch.therapeuticsHighlight.some(th => th.remedy.toLowerCase().includes(query) || th.indication.toLowerCase().includes(query)))
    );
  });

  const toggleChapter = (id: string) => {
    setExpandedChapterId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Unit Selector & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-secondary p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => {
              setSelectedUnit('unit1');
              setExpandedChapterId('gyn-1');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              selectedUnit === 'unit1'
                ? 'bg-rose-700 text-white shadow-md'
                : 'bg-bg-primary text-text-secondary hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Unit 1: Gynaecology ({gynaeUnit1Chapters.length} Chapters)
          </button>

          <button
            onClick={() => {
              setSelectedUnit('unit2');
              setExpandedChapterId('obs-1');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              selectedUnit === 'unit2'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-bg-primary text-text-secondary hover:bg-purple-500/10 hover:text-purple-700 dark:hover:text-purple-300'
            }`}
          >
            <Baby className="w-4 h-4" />
            Unit 2: Obstetrics & Neonatology ({gynaeUnit2Chapters.length} Chapters)
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px] sm:min-w-[300px]">
          <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedUnit === 'unit1' ? 'Gynaecology' : 'Obstetrics'} topics...`}
            className="w-full pl-9 pr-4 py-2 bg-bg-primary border border-border rounded-xl text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Chapters Accordion List */}
      <div className="space-y-4">
        {filteredChapters.length === 0 ? (
          <div className="p-12 text-center bg-bg-secondary rounded-2xl border border-border space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm font-bold text-text-primary">No matching topics found</p>
            <p className="text-xs text-text-secondary">Try searching for other terms like 'PCOS', 'Labor', 'Eclampsia', 'Fibroid', or 'PPH'.</p>
          </div>
        ) : (
          filteredChapters.map((chapter) => {
            const isExpanded = expandedChapterId === chapter.id;

            return (
              <div 
                key={chapter.id}
                className="bg-bg-secondary border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:border-primary/40 transition-all duration-200"
              >
                {/* Chapter Header Banner */}
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 bg-bg-secondary hover:bg-primary/5 transition-colors"
                >
                  <div className="space-y-2 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold text-xs rounded-md border border-rose-500/20">
                        Topic {chapter.number}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-text-tertiary">
                        <Clock className="w-3.5 h-3.5" />
                        {chapter.theoryHours}h Theory + {chapter.clinicalHours}h Clinical
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-text-primary font-serif">
                      {chapter.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {chapter.summary}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-bg-primary border border-border/60 text-text-secondary shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-border/80 bg-bg-primary/50 space-y-6 animate-fadeIn">
                    {/* Full Summary */}
                    <div className="p-4 bg-bg-primary rounded-xl border border-border/60 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      <strong className="text-text-primary block mb-1">Module Summary:</strong>
                      {chapter.summary}
                    </div>

                    {/* Core Curriculum Topics */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Official NCH Prescribed Core Syllabus
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {chapter.coreTopics.map((topic, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-bg-primary border border-border/60 text-xs text-text-secondary"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Pearls & High-Yield Exam Alerts */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Clinical Pearls & Bedside High-Yield Points
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {chapter.clinicalPearls.map((pearl, idx) => (
                          <div 
                            key={idx}
                            className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2"
                          >
                            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span>{pearl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exam Questions Bank */}
                    {chapter.examQuestions && chapter.examQuestions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                          <FileQuestion className="w-3.5 h-3.5" />
                          University Blueprint Questions (LAQ / SAQ / Viva)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {chapter.examQuestions.map((q, idx) => (
                            <div 
                              key={idx}
                              className="p-3 rounded-xl bg-bg-primary border border-border/60 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                  q.type === 'LAQ' ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300' :
                                  q.type === 'SAQ' ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300' :
                                  'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                                }`}>
                                  {q.type} {q.marks ? `(${q.marks} Marks)` : ''}
                                </span>
                              </div>
                              <p className="text-text-primary font-medium">{q.question}</p>
                              {q.keyPoints && (
                                <p className="text-text-tertiary text-[11px]">Key: {q.keyPoints.join(', ')}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Homoeopathic Therapeutics Highlights */}
                    {chapter.therapeuticsHighlight && chapter.therapeuticsHighlight.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" />
                          Homoeopathic Therapeutics Keynotes
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {chapter.therapeuticsHighlight.map((th, idx) => (
                            <div 
                              key={idx}
                              className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <strong className="text-purple-700 dark:text-purple-300 text-sm font-bold font-serif">
                                  {th.remedy}
                                </strong>
                                {th.miasm && (
                                  <span className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-semibold">
                                    {th.miasm}
                                  </span>
                                )}
                              </div>
                              <p className="text-text-secondary leading-relaxed">
                                {th.indication}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
