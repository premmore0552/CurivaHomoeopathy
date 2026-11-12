import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getOrganonReaderPath,
  getOrganonProgressStorageKey,
  parseOrganonCompletedTerms,
  getOrganonYear,
  ORGANON_CURRICULUM_YEARS,
  type OrganonYearSlug
} from '../data/organonCurriculum';

interface OrganonYearPageProps { yearSlug: OrganonYearSlug }

export default function OrganonYearPage({ yearSlug }: OrganonYearPageProps) {
  const year = getOrganonYear(yearSlug);
  const progressStorageKey = getOrganonProgressStorageKey(yearSlug);

  const [completedTerms, setCompletedTerms] = useState<string[]>(() => {
    if (!year || typeof window === 'undefined') return [];
    try {
      const saved: unknown = JSON.parse(window.sessionStorage.getItem(progressStorageKey) || '[]');
      return parseOrganonCompletedTerms(yearSlug, saved);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(progressStorageKey, JSON.stringify(completedTerms));
    } catch {
      // Progress is a convenience only; the syllabus and study links work without storage.
    }
  }, [completedTerms, progressStorageKey]);

  if (!year) {
    return <main className="mx-auto max-w-4xl px-4 py-12"><h1 className="text-2xl font-bold">Organon syllabus page not found</h1><Link className="mt-4 inline-block underline" to="/organon-philosophy">Back to year selection</Link></main>;
  }

  const index = ORGANON_CURRICULUM_YEARS.findIndex((item) => item.slug === year.slug);
  const previousYear = ORGANON_CURRICULUM_YEARS[index - 1];
  const nextYear = ORGANON_CURRICULUM_YEARS[index + 1];
  const completedCount = year.terms.filter((term) => completedTerms.includes(term.term)).length;
  const progressPercent = year.terms.length > 0 ? Math.round((completedCount / year.terms.length) * 100) : 0;
  const firstCoreAphorism = year.coreAphorismRanges[0]?.start;

  const toggleTermCompletion = (termId: string) => {
    setCompletedTerms((current) => current.includes(termId)
      ? current.filter((item) => item !== termId)
      : [...current, termId]);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 dark:text-slate-400"><Link to="/organon-philosophy" className="underline underline-offset-4">Organon years</Link><span className="mx-2">/</span>{year.yearLabel}</nav>

      <header className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white shadow-xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">{year.courseCode} · {year.curriculumVersion}</p>
        <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">{year.pageTitle}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{year.subjectTitle}</p>
        <div className="mt-6 grid max-w-xl grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-indigo-200">Lecture hours</p><p className="mt-1 text-2xl font-bold">{year.teachingHours.lectures}</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-indigo-200">Non-lecture hours</p><p className="mt-1 text-2xl font-bold">{year.teachingHours.nonLectures}</p></div>
        </div>
        {year.teachingHours.note && <p className="mt-4 max-w-3xl text-xs leading-6 text-indigo-100">{year.teachingHours.note}</p>}
      </header>

      <section aria-labelledby="organon-study-workspace-title" className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900 dark:bg-indigo-950/30 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">Your connected study workspace</p>
            <h2 id="organon-study-workspace-title" className="mt-2 font-serif text-2xl font-bold text-slate-950 dark:text-white">Go from syllabus to active study</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">Open the matching year inside the aphorism reader, revise with flashcards or test your understanding with the available practice questions.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to={getOrganonReaderPath(year.slug, { tab: 'matrix', aphorism: firstCoreAphorism })} className="inline-flex items-center rounded-full bg-indigo-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-800">Read aphorisms <span aria-hidden="true" className="ml-2">→</span></Link>
            <Link to={getOrganonReaderPath(year.slug, { tab: 'study', mode: 'flashcards' })} className="inline-flex items-center rounded-full border border-indigo-300 bg-white px-4 py-3 text-sm font-bold text-indigo-950 transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-100">Flashcards</Link>
            <Link to={getOrganonReaderPath(year.slug, { tab: 'study', mode: 'quiz' })} className="inline-flex items-center rounded-full border border-indigo-300 bg-white px-4 py-3 text-sm font-bold text-indigo-950 transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-100">Practice quiz</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="organon-progress-title" className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="organon-progress-title" className="font-serif text-xl font-bold text-slate-900 dark:text-white">Term completion tracker</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Mark a term complete as you finish it. This checklist stays in this browser tab and is not synced to an account.</p>
          </div>
          <div className="text-right"><p className="text-2xl font-bold tabular-nums text-indigo-900 dark:text-indigo-200">{progressPercent}%</p><p className="text-xs text-slate-500 dark:text-slate-400">{completedCount} of {year.terms.length} terms</p></div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label="Organon term completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
          <div className="h-full rounded-full bg-indigo-700 transition-all duration-300 dark:bg-indigo-400" style={{ width: `${progressPercent}%` }} />
        </div>
        {completedCount > 0 && <button type="button" onClick={() => setCompletedTerms([])} className="mt-3 text-xs font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Reset this checklist</button>}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Core aphorism coverage</h2>
          <div className="mt-4 space-y-3">
            {year.coreAphorismRanges.map((range) => (
              <div key={range.label} className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-indigo-950 dark:text-indigo-100">{range.label}</p>
                  <Link to={getOrganonReaderPath(year.slug, { tab: 'matrix', aphorism: range.start })} className="text-xs font-bold text-indigo-800 underline underline-offset-4 dark:text-indigo-200">Open reading desk →</Link>
                </div>
                {range.detail && <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{range.detail}</p>}
              </div>
            ))}
          </div>
          {year.revisionAphorismRanges.length > 0 && (
            <>
              <h3 className="mt-6 font-bold text-slate-900 dark:text-white">Revision blocks</h3>
              <div className="mt-3 space-y-2">
                {year.revisionAphorismRanges.map((range) => (
                  <div key={range.label} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{range.label}</span>
                    <Link to={getOrganonReaderPath(year.slug, { tab: 'matrix', aphorism: range.start })} className="text-xs font-bold text-indigo-800 underline underline-offset-4 dark:text-indigo-200">Revise this block →</Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Term-wise syllabus map</h2>
          <div className="mt-4 space-y-5">
            {year.terms.map((term, termIndex) => {
              const isCompleted = completedTerms.includes(term.term);
              const checkboxId = `organon-term-${year.slug}-${termIndex}`;
              return (
                <section key={term.term} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0 dark:border-slate-800">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200">{term.term}</h3>
                    <label htmlFor={checkboxId} className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <input id={checkboxId} type="checkbox" checked={isCompleted} onChange={() => toggleTermCompletion(term.term)} className="h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-600" />
                      {isCompleted ? 'Completed' : 'Mark complete'}
                    </label>
                  </div>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">{term.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                </section>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"><h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Learning outcomes</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">{year.learningOutcomes.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"><h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Teaching and assessment guidance</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">{year.assessment.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/60">
        <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Official NCH syllabus source</h2>
        <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">{year.sourceTitle}</p>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{year.sourceNote}</p>
        <a href={year.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-900 dark:bg-indigo-700">Open official NCH PDF ↗</a>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
        {previousYear ? <Link to={'/organon/' + previousYear.slug} className="text-sm font-semibold text-indigo-800 underline dark:text-indigo-200">← {previousYear.yearLabel}</Link> : <span />}
        {nextYear ? <Link to={'/organon/' + nextYear.slug} className="text-sm font-semibold text-indigo-800 underline dark:text-indigo-200">{nextYear.yearLabel} →</Link> : <Link to="/organon-philosophy" className="text-sm font-semibold text-indigo-800 underline dark:text-indigo-200">Back to year selection</Link>}
      </footer>
    </main>
  );
}
