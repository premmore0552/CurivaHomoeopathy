import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ArrowLeft, BookOpen, Layers, Zap, GraduationCap, HelpCircle, ChevronRight } from 'lucide-react';
import { searchFMTTopics } from '../utils/fmtSearch';
import { FMT_COMPARISONS, FMTComparison } from '../data/fmtComparisons';
import SEO from '../components/SEO';
import { FMTChapterDetail } from '../data/fmtDetailedChapters';

import FmtBottomNav from '../components/FmtBottomNav';

interface SearchResults {
  topics: { topic: FMTChapterDetail; score: number }[];
  comparisons: FMTComparison[];
  revision: { topic: FMTChapterDetail; score: number }[];
  viva: { topic: FMTChapterDetail; score: number }[];
  mcqs: { topic: FMTChapterDetail; score: number }[];
}

export default function FmtSearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResults>({
    topics: [],
    comparisons: [],
    revision: [],
    viva: [],
    mcqs: []
  });

  useEffect(() => {
    if (query) {
      // Search Topics
      const topicResults = searchFMTTopics(query);
      
      // Search Comparisons
      const compResults = FMT_COMPARISONS.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.summary.toLowerCase().includes(query.toLowerCase())
      );

      // Search Revision (for now, reuse topic search but filter by revision availability)
      const revisionResults = topicResults.filter(r => r.topic.revisionContent || (r.topic.revisionSheet?.length ?? 0) > 0);

      // Search Viva
      const vivaResults = topicResults.filter(r => (r.topic.vivaQuestions?.length ?? 0) > 0);

      setResults({
        topics: topicResults as any,
        comparisons: compResults,
        revision: revisionResults as any,
        viva: vivaResults as any,
        mcqs: topicResults as any // Simplified for now
      });
    }
  }, [query]);

  const hasResults = Object.values(results).some((arr) => (arr as any[]).length > 0);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title={`Search results for "${query}" | FMTMedEasy`}
        description={`Found results for "${query}" in FMT topics, comparisons, revision notes, and MCQs.`}
      />

      <div className="max-w-4xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-6">
          <Link 
            to="/fmt" 
            className="inline-flex items-center gap-2 text-xs font-black text-text-tertiary hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-display font-black text-text-primary tracking-tight">
              Search: "{query}"
            </h1>
            <p className="text-sm text-text-secondary font-medium">
              Found {Object.values(results).reduce((acc: number, val: any) => acc + (val as any[]).length, 0)} results across all learning modules.
            </p>
          </div>
        </div>

        {!hasResults ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-text-tertiary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-text-primary">No results found</h2>
              <p className="text-sm text-text-secondary max-w-sm mx-auto">
                We couldn't find anything matching "{query}". Try searching for broader terms like "Death", "In injuries", or "Poisons".
              </p>
            </div>
            <Link 
              to="/fmt/learn"
              className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
            >
              Browse All Topics
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Topics */}
            {results.topics.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="text-sm font-black uppercase tracking-widest">Study Topics</h2>
                </div>
                <div className="grid gap-3">
                  {results.topics.map((res: any) => (
                    <Link 
                      key={res.topic.id}
                      to={`/fmt/${res.topic.id}`}
                      className="group p-5 bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl shadow-soft hover:border-primary/30 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">
                          {res.topic.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-1">
                          {res.topic.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Comparisons */}
            {results.comparisons.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-500">
                  <Layers className="w-5 h-5" />
                  <h2 className="text-sm font-black uppercase tracking-widest">Comparisons</h2>
                </div>
                <div className="grid gap-3">
                  {results.comparisons.map((comp: any) => (
                    <Link 
                      key={comp.slug}
                      to={`/fmt/compare/${comp.slug}`}
                      className="group p-5 bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl shadow-soft hover:border-indigo-500/30 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-text-primary group-hover:text-indigo-500 transition-colors">
                          {comp.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-1">
                          {comp.summary}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-indigo-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Revision */}
            {results.revision.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <Zap className="w-5 h-5" />
                  <h2 className="text-sm font-black uppercase tracking-widest">Quick Revision</h2>
                </div>
                <div className="grid gap-3">
                  {results.revision.map((res: any) => (
                    <Link 
                      key={res.topic.id}
                      to={`/fmt/quick-revision?id=${res.topic.id}`}
                      className="group p-5 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-800/20 rounded-3xl hover:border-amber-500/50 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-amber-900 dark:text-amber-200">
                          {res.topic.title}
                        </h3>
                        <p className="text-xs text-amber-800/70 dark:text-amber-400/70">
                          ⚡ 1-Minute Revision
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-amber-400 group-hover:text-amber-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Viva */}
            {results.viva.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-500">
                  <GraduationCap className="w-5 h-5" />
                  <h2 className="text-sm font-black uppercase tracking-widest">Viva Bank</h2>
                </div>
                <div className="grid gap-3">
                  {results.viva.map((res: any) => (
                    <Link 
                      key={res.topic.id}
                      to={`/fmt/viva?id=${res.topic.id}`}
                      className="group p-5 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/50 dark:border-emerald-800/20 rounded-3xl hover:border-emerald-500/50 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-emerald-900 dark:text-emerald-200">
                          {res.topic.title}
                        </h3>
                        <p className="text-xs text-emerald-800/70 dark:text-emerald-400/70">
                          🎤 {res.topic.vivaQuestions.length} Practice Questions
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
      <FmtBottomNav />
    </div>
  );
}
