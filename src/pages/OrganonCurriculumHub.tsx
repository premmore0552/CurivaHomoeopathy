import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Search, X } from 'lucide-react';
import {
  getOrganonProgressStorageKey,
  getOrganonReaderPath,
  parseOrganonCompletedTerms,
  searchOrganonCurriculum,
  ORGANON_CURRICULUM_YEARS
} from '../data/organonCurriculum';

function readTabProgress(): Record<string, string[]> {
  if (typeof window === 'undefined') return {};
  return Object.fromEntries(ORGANON_CURRICULUM_YEARS.map((year) => {
    try {
      const raw = window.sessionStorage.getItem(getOrganonProgressStorageKey(year.slug));
      return [year.slug, parseOrganonCompletedTerms(year.slug, JSON.parse(raw || '[]'))];
    } catch {
      return [year.slug, []];
    }
  }));
}

function countRangeAphorisms(ranges: Array<{ start: number; end: number }>): number {
  return ranges.reduce((total, range) => total + Math.max(0, range.end - range.start + 1), 0);
}

export default function OrganonCurriculumHub() {
  const [query, setQuery] = useState('');
  const [tabProgress] = useState<Record<string, string[]>>(readTabProgress);
  const searchResults = useMemo(() => searchOrganonCurriculum(query), [query]);
  const resultsByYear = useMemo(
    () => new Map(searchResults.map((result) => [result.yearSlug, result])),
    [searchResults]
  );
  const normalizedQuery = query.trim();
  const visibleYears = normalizedQuery
    ? ORGANON_CURRICULUM_YEARS.filter((year) => resultsByYear.has(year.slug))
    : ORGANON_CURRICULUM_YEARS;

  const totalTerms = ORGANON_CURRICULUM_YEARS.reduce((total, year) => total + year.terms.length, 0);
  const completedTerms = ORGANON_CURRICULUM_YEARS.reduce(
    (total, year) => total + (tabProgress[year.slug]?.length ?? 0),
    0
  );
  const overallProgress = totalTerms ? Math.round((completedTerms / totalTerms) * 100) : 0;
  const mappedAphorisms = new Set<number>();
  for (const year of ORGANON_CURRICULUM_YEARS) {
    for (const range of year.coreAphorismRanges) {
      for (let aphorism = range.start; aphorism <= range.end; aphorism += 1) {
        mappedAphorisms.add(aphorism);
      }
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white shadow-xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">BHMS · NCH competency-based curriculum</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold sm:text-4xl">Organon of Medicine &amp; Homoeopathic Philosophy</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
          Explore the four professional-year pathways, find syllabus topics across years, and move directly from a curriculum block to its reading or revision tool.
        </p>
        <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <GraduationCap className="h-5 w-5 text-indigo-200" aria-hidden="true" />
            <p className="mt-3 text-2xl font-bold tabular-nums">{ORGANON_CURRICULUM_YEARS.length}</p>
            <p className="mt-1 text-xs text-slate-200">BHMS years</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <BookOpen className="h-5 w-5 text-indigo-200" aria-hidden="true" />
            <p className="mt-3 text-2xl font-bold tabular-nums">{mappedAphorisms.size}</p>
            <p className="mt-1 text-xs text-slate-200">Core aphorisms mapped</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-2xl font-bold tabular-nums">{totalTerms}</p>
            <p className="mt-1 text-xs text-slate-200">Curriculum terms</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-2xl font-bold tabular-nums">{completedTerms}/{totalTerms}</p>
            <p className="mt-1 text-xs text-slate-200">Terms checked in this tab</p>
          </div>
        </div>
      </header>

      <section aria-labelledby="organon-search-title" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="organon-search-title" className="font-serif text-xl font-bold text-slate-900 dark:text-white">Find a syllabus topic</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">Search course codes, term names, topics, learning outcomes, or an aphorism number from §§1–294.</p>
          </div>
          {normalizedQuery && (
            <button type="button" onClick={() => setQuery('')} className="inline-flex min-h-10 items-center gap-2 self-start rounded-full px-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-50 dark:text-indigo-200 dark:hover:bg-indigo-950 sm:self-auto">
              <X className="h-4 w-4" aria-hidden="true" /> Clear search
            </button>
          )}
        </div>
        <label htmlFor="organon-curriculum-search" className="sr-only">Search Organon curriculum</label>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-950">
          <Search className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
          <input
            id="organon-curriculum-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “case taking”, “Psychology”, “HomUG-OM-III” or “§230”"
            className="min-h-8 w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-white"
            autoComplete="off"
          />
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400" role="status" aria-live="polite">
          {normalizedQuery
            ? `Found ${searchResults.reduce((total, result) => total + result.matches.length, 0)} matching curriculum entries across ${visibleYears.length} year(s).`
            : 'Search results stay within the published syllabus and aphorism-range metadata.'}
        </p>
        {normalizedQuery && visibleYears.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            No syllabus matches found. Try a different topic, course code, or aphorism number.
          </div>
        )}
      </section>

      <section aria-labelledby="organon-years-title" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="organon-years-title" className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Choose your professional year</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Each pathway keeps its core reading separate from the revision blocks.</p>
          </div>
          {!normalizedQuery && (
            <div className="min-w-48">
              <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span>Term progress in this tab</span><span className="tabular-nums">{overallProgress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label="Overall Organon term completion in this tab" aria-valuemin={0} aria-valuemax={100} aria-valuenow={overallProgress}>
                <div className="h-full rounded-full bg-indigo-700 transition-all dark:bg-indigo-400" style={{ width: `${overallProgress}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visibleYears.map((year) => {
            const progress = tabProgress[year.slug] ?? [];
            const yearProgress = year.terms.length ? Math.round((progress.length / year.terms.length) * 100) : 0;
            const result = resultsByYear.get(year.slug);
            const coreCount = countRangeAphorisms(year.coreAphorismRanges);
            return (
              <article key={year.slug} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">{year.courseCode}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{year.teachingHours.lectures} lecture · {year.teachingHours.nonLectures} non-lecture hours</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-slate-900 dark:text-white">{year.yearLabel}</h3>
                <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{year.subjectTitle}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                    <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">{coreCount}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Core aphorisms</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                    <p className="text-xl font-bold tabular-nums text-slate-900 dark:text-white">{year.terms.length}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Syllabus terms</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Core reading blocks</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {year.coreAphorismRanges.map((range) => (
                      <span key={range.label} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-100">{range.label}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span>Terms completed in this tab</span><span className="tabular-nums">{progress.length}/{year.terms.length}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label={`${year.yearLabel} term completion`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={yearProgress}>
                    <div className="h-full rounded-full bg-indigo-700 transition-all dark:bg-indigo-400" style={{ width: `${yearProgress}%` }} />
                  </div>
                </div>
                {result && normalizedQuery && (
                  <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200">Matching curriculum entries</p>
                    <ul className="mt-2 space-y-2">
                      {result.matches.slice(0, 4).map((match, index) => (
                        <li key={`${match.section}-${index}`} className="text-xs leading-5 text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-indigo-900 dark:text-indigo-200">{match.section}:</span> {match.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to={`/organon/${year.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-indigo-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-600">
                    Open year pathway <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link to={getOrganonReaderPath(year.slug, { tab: 'matrix' })} className="inline-flex min-h-11 items-center justify-center rounded-full border border-indigo-200 px-4 py-2.5 text-xs font-bold text-indigo-900 transition hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-950">
                    Read aphorisms
                  </Link>
                  <Link to={getOrganonReaderPath(year.slug, { tab: 'study', mode: 'flashcards' })} className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                    Flashcards
                  </Link>
                  <Link to={getOrganonReaderPath(year.slug, { tab: 'study', mode: 'quiz' })} className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                    Practice quiz
                  </Link>
                </div>
                <a href={year.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 text-xs font-semibold text-slate-500 underline underline-offset-4 hover:text-indigo-800 dark:text-slate-400 dark:hover:text-indigo-200">Open official NCH curriculum PDF ↗</a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-800 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 sm:p-6">
        <h2 className="font-bold">Source, progress and explanation policy</h2>
        <p className="mt-2 text-sm leading-6">
          The year pathways organise the published NCH syllabus and point to its official source PDFs. Term completion is stored in this browser tab only; it is not synced to an account. Original aphorism wording remains in the separate reference reader. Simple explanations will appear only after the project owner supplies their wording.
        </p>
        <Link to="/organon-library" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-900 underline underline-offset-4 dark:text-indigo-200">Open the separate original-text reader <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
