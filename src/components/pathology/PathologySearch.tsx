import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, HelpCircle, FileText, Sparkles, Filter, ChevronRight, Tag } from 'lucide-react';
import { PathologyChapter, PathologyDefinition, PathologyComparison, PathologyQuestion } from '../../types/pathology';

interface PathologySearchProps {
  generalChapters: PathologyChapter[];
  systemicChapters: PathologyChapter[];
  definitions: PathologyDefinition[];
  comparisons: PathologyComparison[];
  questions: PathologyQuestion[];
  onSelectItem: (type: string, item: any) => void;
}

export const PathologySearch: React.FC<PathologySearchProps> = ({
  generalChapters,
  systemicChapters,
  definitions,
  comparisons,
  questions,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'topics' | 'questions' | 'definitions' | 'comparisons'>('all');

  // Unified searchable dataset
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const results: {
      id: string;
      title: string;
      category: string;
      type: 'topic' | 'laq' | 'saq' | 'mcq' | 'viva' | 'ospe' | 'definition' | 'comparison' | 'chapter';
      subtitle?: string;
      preview?: string;
      rawItem: any;
    }[] = [];

    // Search Chapters & Topics
    const allChapters = [...generalChapters, ...systemicChapters];
    allChapters.forEach(chap => {
      if (chap.title.toLowerCase().includes(q) || chap.description.toLowerCase().includes(q)) {
        if (activeFilter === 'all' || activeFilter === 'topics') {
          results.push({
            id: chap.id,
            title: chap.title,
            category: chap.category === 'general' ? 'General Pathology' : 'Systemic Pathology',
            type: 'chapter',
            subtitle: `${chap.topics.length} Topics | Competencies: ${chap.competencies.join(', ')}`,
            preview: chap.description,
            rawItem: chap
          });
        }
      }

      chap.topics.forEach(top => {
        if (
          top.title.toLowerCase().includes(q) ||
          top.description.toLowerCase().includes(q) ||
          (top.clinicalCorrelation && top.clinicalCorrelation.toLowerCase().includes(q))
        ) {
          if (activeFilter === 'all' || activeFilter === 'topics') {
            results.push({
              id: top.id,
              title: top.title,
              category: chap.title,
              type: 'topic',
              subtitle: top.competencyCode || 'Topic Note',
              preview: top.description,
              rawItem: top
            });
          }
        }
      });
    });

    // Search Questions
    questions.forEach(ques => {
      if (
        ques.title.toLowerCase().includes(q) ||
        ques.preview.toLowerCase().includes(q) ||
        ques.type.toLowerCase().includes(q)
      ) {
        if (activeFilter === 'all' || activeFilter === 'questions') {
          results.push({
            id: ques.id,
            title: ques.title,
            category: ques.category.toUpperCase(),
            type: ques.type,
            subtitle: ques.frequency || `${ques.marks ? ques.marks + ' Marks' : 'Oral Examination'}`,
            preview: ques.preview,
            rawItem: ques
          });
        }
      }
    });

    // Search Definitions
    definitions.forEach(def => {
      if (
        def.term.toLowerCase().includes(q) ||
        def.definition.toLowerCase().includes(q) ||
        def.significance.toLowerCase().includes(q)
      ) {
        if (activeFilter === 'all' || activeFilter === 'definitions') {
          results.push({
            id: def.id,
            title: def.term,
            category: 'Definitions',
            type: 'definition',
            subtitle: def.highYield ? 'High-Yield Viva Term' : 'Core Definition',
            preview: def.definition,
            rawItem: def
          });
        }
      }
    });

    // Search Comparisons
    comparisons.forEach(comp => {
      if (
        comp.title.toLowerCase().includes(q) ||
        comp.itemA.toLowerCase().includes(q) ||
        comp.itemB.toLowerCase().includes(q)
      ) {
        if (activeFilter === 'all' || activeFilter === 'comparisons') {
          results.push({
            id: comp.id,
            title: comp.title,
            category: 'Comparisons',
            type: 'comparison',
            subtitle: `${comp.points.length} Distinguishing Points`,
            preview: `Key differentiating features between ${comp.itemA} and ${comp.itemB}.`,
            rawItem: comp
          });
        }
      }
    });

    return results.slice(0, 12);
  }, [query, activeFilter, generalChapters, systemicChapters, definitions, comparisons, questions]);

  return (
    <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary">
          <Search className="w-5 h-5 text-red-700 dark:text-red-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pathology topics, questions, definitions, comparisons..."
          className="w-full pl-12 pr-10 py-3.5 bg-bg-primary text-text-primary placeholder:text-text-tertiary rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 text-sm font-medium transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-tertiary hover:text-text-primary"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
        <span className="text-text-tertiary flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: 'all', label: 'All Resources' },
          { id: 'topics', label: 'Topics & Chapters' },
          { id: 'questions', label: 'LAQs / SAQs / MCQs / Viva' },
          { id: 'definitions', label: 'Definitions' },
          { id: 'comparisons', label: 'Comparisons' },
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === chip.id
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-bg-primary text-text-secondary hover:text-text-primary border border-border/70 hover:bg-bg-secondary'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Results Box */}
      {query.trim() && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs text-text-tertiary">
            <span>{searchResults.length} results matching "{query}"</span>
            <span>Click any item for details</span>
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-bg-primary rounded-2xl p-6 text-center border border-dashed border-border text-xs text-text-secondary">
              No matching pathology topics or questions found for "{query}". Try searching for terms like <em>necrosis</em>, <em>inflammation</em>, <em>infarction</em>, or <em>pneumonia</em>.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {searchResults.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => onSelectItem(item.type, item.rawItem)}
                  className="bg-bg-primary p-4 rounded-2xl border border-border/80 hover:border-red-500/40 hover:shadow-md transition-all cursor-pointer group text-left flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300">
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-text-tertiary truncate">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    {item.preview && (
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {item.preview}
                      </p>
                    )}
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-text-tertiary border-t border-border/40 mt-2">
                    <span>{item.subtitle}</span>
                    <span className="text-red-600 dark:text-red-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
