import { Link } from 'react-router-dom';
import { ORGANON_CURRICULUM_YEARS, ORGANON_LEGACY_LIBRARY_PATH } from '../data/organonCurriculum';

export default function OrganonCurriculumHub() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white shadow-xl sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-200">BHMS · NCH competency-based dynamic curriculum</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold sm:text-4xl">Organon of Medicine & Homoeopathic Philosophy</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">Choose your professional year to open its own syllabus page, with the NCH course code, teaching-hour information, aphorism blocks, term-wise topics, learning outcomes and official source PDF.</p>
      </header>
      <section className="grid gap-5 md:grid-cols-2">
        {ORGANON_CURRICULUM_YEARS.map((year) => (
          <article key={year.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">{year.courseCode}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{year.teachingHours.lectures} lecture · {year.teachingHours.nonLectures} non-lecture hours</span>
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-slate-900 dark:text-white">{year.yearLabel}</h2>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{year.subjectTitle}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{year.terms[0]?.topics.slice(0, 2).join(' ')}</p>
            <Link to={'/organon/' + year.slug} className="mt-5 inline-flex items-center rounded-full bg-indigo-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-800">Open {year.yearLabel} syllabus <span aria-hidden="true" className="ml-2">→</span></Link>
          </article>
        ))}
      </section>
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
        <h2 className="font-bold">Use the NCH source as the curriculum authority</h2>
        <p className="mt-2 text-sm leading-6">This study map organises the published syllabus. It is not a substitute for the full prescribed textbook, college teaching plan, university notices or faculty instructions. Historical Homoeopathic doctrines are presented as syllabus content, not as proof of established biomedical efficacy.</p>
        <Link to={ORGANON_LEGACY_LIBRARY_PATH} className="mt-3 inline-flex text-sm font-semibold underline underline-offset-4">Open the separate legacy reference reader</Link>
      </section>
    </main>
  );
}
