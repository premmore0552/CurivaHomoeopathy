import { Link } from 'react-router-dom';
import { getOrganonYear, ORGANON_CURRICULUM_YEARS, type OrganonYearSlug } from '../data/organonCurriculum';

interface OrganonYearPageProps { yearSlug: OrganonYearSlug }

export default function OrganonYearPage({ yearSlug }: OrganonYearPageProps) {
  const year = getOrganonYear(yearSlug);
  if (!year) return <main className="mx-auto max-w-4xl px-4 py-12"><h1 className="text-2xl font-bold">Organon syllabus page not found</h1><Link className="mt-4 inline-block underline" to="/organon-philosophy">Back to year selection</Link></main>;
  const index = ORGANON_CURRICULUM_YEARS.findIndex((item) => item.slug === year.slug);
  const previousYear = ORGANON_CURRICULUM_YEARS[index - 1];
  const nextYear = ORGANON_CURRICULUM_YEARS[index + 1];
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
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Core aphorism coverage</h2>
          <div className="mt-4 space-y-3">{year.coreAphorismRanges.map((range) => <div key={range.label} className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/50"><p className="font-bold text-indigo-950 dark:text-indigo-100">{range.label}</p>{range.detail && <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{range.detail}</p>}</div>)}</div>
          {year.revisionAphorismRanges.length > 0 && <><h3 className="mt-6 font-bold text-slate-900 dark:text-white">Revision blocks</h3><div className="mt-3 flex flex-wrap gap-2">{year.revisionAphorismRanges.map((range) => <span key={range.label} className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200">{range.label}</span>)}</div></>}
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Term-wise syllabus map</h2>
          <div className="mt-4 space-y-5">{year.terms.map((term) => <section key={term.term}><h3 className="font-bold text-indigo-900 dark:text-indigo-200">{term.term}</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">{term.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></section>)}</div>
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
