import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  BookmarkPlus,
  Check,
  ChevronDown,
  ChevronRight,
  FileSearch,
  Layers,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { repertoryDatabase, type RepertoryChapter, type Rubric } from '../data/repertoryDatabase';
import {
  scoreRepertorization,
  type RepertorizationSelection,
  type SymptomPriority,
} from '../lib/kentRepertorizationEngine';

type KentSourcePage = {
  textPage: number;
  printedPage: number | null;
  text: string;
};

type KentSourceData = {
  schemaVersion: number;
  edition: string;
  title: string;
  author: string;
  pages: KentSourcePage[];
  editorialStatus?: string;
  gradePolicy?: string;
};

type KentChapter = {
  number: number;
  id: string;
  name: string;
  start: number;
  end: number;
  group: string;
  description: string;
  curatedId?: string;
};

type TabId = 'chapters' | 'engine' | 'source';

const sourceUrl = 'https://archive.org/details/b20416234_001';
const wellcomeUrl = 'https://wellcomecollection.org/works/aguw48nw/items';

/**
 * Chapter and printed-page directory for the full Kent repertory.
 * The currently imported OCR file is only the supplied Volume 1 scan.
 */
const kentChapters: KentChapter[] = [
  { number: 1, id: 'mind', name: 'Mind', start: 1, end: 95, group: 'Mind & sensorium', description: 'Mental, emotional, intellectual and behavioural symptoms.', curatedId: 'mind' },
  { number: 2, id: 'vertigo', name: 'Vertigo', start: 96, end: 106, group: 'Mind & sensorium', description: 'Dizziness, instability, and circumstances that bring on vertigo.', curatedId: 'vertigo_head_hair' },
  { number: 3, id: 'head', name: 'Head', start: 107, end: 234, group: 'Head & special senses', description: 'Head pains, sensations, external and internal conditions.', curatedId: 'headache' },
  { number: 4, id: 'eye', name: 'Eye', start: 235, end: 270, group: 'Head & special senses', description: 'Eye complaints and local conditions.', curatedId: 'eye_vision' },
  { number: 5, id: 'vision', name: 'Vision', start: 271, end: 285, group: 'Head & special senses', description: 'Visual disturbances and changes in sight.', curatedId: 'eye_vision' },
  { number: 6, id: 'ear', name: 'Ear', start: 285, end: 320, group: 'Head & special senses', description: 'Ear pains, discharges and local symptoms.', curatedId: 'ear_hearing' },
  { number: 7, id: 'hearing', name: 'Hearing', start: 321, end: 323, group: 'Head & special senses', description: 'Hearing sensitivity and auditory disturbances.', curatedId: 'ear_hearing' },
  { number: 8, id: 'nose', name: 'Nose', start: 324, end: 354, group: 'Head & special senses', description: 'Nasal symptoms, discharges and smell.', },
  { number: 9, id: 'face', name: 'Face', start: 355, end: 396, group: 'Head & special senses', description: 'Facial sensations, pains, colour and expression.', },
  { number: 10, id: 'mouth', name: 'Mouth', start: 397, end: 430, group: 'Mouth & throat', description: 'Mouth, tongue, saliva and oral sensations.', },
  { number: 11, id: 'teeth', name: 'Teeth', start: 430, end: 447, group: 'Mouth & throat', description: 'Tooth pains and dental conditions.', },
  { number: 12, id: 'throat', name: 'Throat', start: 448, end: 470, group: 'Mouth & throat', description: 'Throat symptoms, swallowing and constriction.', },
  { number: 13, id: 'external-throat', name: 'External Throat', start: 471, end: 475, group: 'Mouth & throat', description: 'External throat and neck-region symptoms.', },
  { number: 14, id: 'stomach', name: 'Stomach', start: 476, end: 540, group: 'Digestive system', description: 'Appetite, desires, aversions, nausea, vomiting and gastric pains.', },
  { number: 15, id: 'abdomen', name: 'Abdomen', start: 541, end: 605, group: 'Digestive system', description: 'Abdominal pains, distension, movement and modalities.', },
  { number: 16, id: 'rectum', name: 'Rectum', start: 606, end: 635, group: 'Digestive system', description: 'Rectal sensations, urging and associated complaints.', },
  { number: 17, id: 'stool', name: 'Stool', start: 635, end: 644, group: 'Digestive system', description: 'Stool character, frequency, colour and conditions.', },
  { number: 18, id: 'bladder', name: 'Bladder', start: 645, end: 662, group: 'Urinary & genital', description: 'Bladder sensations, retention, urgency and incontinence.', curatedId: 'urine_bladder' },
  { number: 19, id: 'kidneys', name: 'Kidneys', start: 662, end: 667, group: 'Urinary & genital', description: 'Renal-region symptoms and kidney-related sensations.', curatedId: 'urine_bladder' },
  { number: 20, id: 'prostate', name: 'Prostate Gland', start: 667, end: 668, group: 'Urinary & genital', description: 'Prostate-region symptoms.', },
  { number: 21, id: 'urethra', name: 'Urethra', start: 669, end: 680, group: 'Urinary & genital', description: 'Urethral sensations and discharge.', curatedId: 'urine_bladder' },
  { number: 22, id: 'urine', name: 'Urine', start: 681, end: 692, group: 'Urinary & genital', description: 'Urine appearance, sediment, odour and urination.', curatedId: 'urine_bladder' },
  { number: 23, id: 'male-genitalia', name: 'Genitalia — Male', start: 693, end: 714, group: 'Urinary & genital', description: 'Male genital symptoms and functions.', },
  { number: 24, id: 'female-genitalia', name: 'Genitalia — Female', start: 714, end: 745, group: 'Urinary & genital', description: 'Female genital symptoms, menstruation and related functions.', },
  { number: 25, id: 'larynx-trachea', name: 'Larynx & Trachea', start: 746, end: 762, group: 'Respiratory system', description: 'Laryngeal and tracheal sensations, voice and irritation.', },
  { number: 26, id: 'respiration', name: 'Respiration', start: 762, end: 777, group: 'Respiratory system', description: 'Breathing, dyspnoea and respiratory modalities.', },
  { number: 27, id: 'cough', name: 'Cough', start: 778, end: 811, group: 'Respiratory system', description: 'Cough character, timing, triggers and concomitants.', },
  { number: 28, id: 'expectoration', name: 'Expectoration', start: 812, end: 821, group: 'Respiratory system', description: 'Sputum character, colour, consistency and conditions.', },
  { number: 29, id: 'chest', name: 'Chest', start: 822, end: 883, group: 'Trunk & extremities', description: 'Chest pains, sensations, respiration-related chest symptoms.', },
  { number: 30, id: 'back', name: 'Back', start: 884, end: 951, group: 'Trunk & extremities', description: 'Spinal, dorsal, lumbar and sacral complaints.', },
  { number: 31, id: 'extremities', name: 'Extremities', start: 952, end: 1233, group: 'Trunk & extremities', description: 'Upper and lower limb symptoms, joints, pains and modalities.', },
  { number: 32, id: 'sleep', name: 'Sleep', start: 1234, end: 1258, group: 'Generals & modalities', description: 'Sleep quality, position, timing and disturbances.', },
  { number: 33, id: 'chill', name: 'Chill', start: 1259, end: 1277, group: 'Generals & modalities', description: 'Chill stages, sensations, periodicity and modalities.', curatedId: 'fever_chill_sweat' },
  { number: 34, id: 'fever', name: 'Fever', start: 1278, end: 1292, group: 'Generals & modalities', description: 'Heat, fever patterns, stages and accompanying symptoms.', curatedId: 'fever_chill_sweat' },
  { number: 35, id: 'perspiration', name: 'Perspiration', start: 1293, end: 1302, group: 'Generals & modalities', description: 'Sweating, absence of sweat and sweat modalities.', curatedId: 'fever_chill_sweat' },
  { number: 36, id: 'skin', name: 'Skin', start: 1303, end: 1340, group: 'Generals & modalities', description: 'Eruptions, itching, discoloration and skin sensations.', curatedId: 'skin' },
  { number: 37, id: 'generalities', name: 'Generalities', start: 1341, end: 1423, group: 'Generals & modalities', description: 'General modalities, constitution, time, temperature and whole-person symptoms.', },
];

const chapterGroups = [
  { name: 'Mind & sensorium', ids: ['mind', 'vertigo'] },
  { name: 'Head & special senses', ids: ['head', 'eye', 'vision', 'ear', 'hearing', 'nose', 'face'] },
  { name: 'Mouth & throat', ids: ['mouth', 'teeth', 'throat', 'external-throat'] },
  { name: 'Digestive system', ids: ['stomach', 'abdomen', 'rectum', 'stool'] },
  { name: 'Urinary & genital', ids: ['bladder', 'kidneys', 'prostate', 'urethra', 'urine', 'male-genitalia', 'female-genitalia'] },
  { name: 'Respiratory system', ids: ['larynx-trachea', 'respiration', 'cough', 'expectoration'] },
  { name: 'Trunk & extremities', ids: ['chest', 'back', 'extremities'] },
  { name: 'Generals & modalities', ids: ['sleep', 'chill', 'fever', 'perspiration', 'skin', 'generalities'] },
];

const curatedById = new Map<string, RepertoryChapter>(repertoryDatabase.map((chapter) => [chapter.id, chapter] as const));

function chapterForId(id: string): KentChapter {
  return kentChapters.find((chapter) => chapter.id === id) || kentChapters[0];
}

function makeSnippet(text: string, query: string): string {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();
  const firstIndex = terms.length ? lower.indexOf(terms[0]) : 0;
  const start = Math.max(0, firstIndex - 100);
  const end = Math.min(text.length, Math.max(firstIndex + 240, 340));
  return (start > 0 ? '…' : '') +
    text.slice(start, end).replace(/\s+/g, ' ').trim() +
    (end < text.length ? '…' : '');
}

function getChapterRubrics(chapter: KentChapter): RepertoryChapter | undefined {
  return chapter.curatedId ? curatedById.get(chapter.curatedId) : undefined;
}

function rubricSearchText(rubric: Rubric, chapterName: string): string {
  return [chapterName, rubric.subCategory || '', rubric.symptom, rubric.remedies.join(' ')].join(' ').toLowerCase();
}

export default function Kent1897Repertory() {
  const [activeTab, setActiveTab] = useState<TabId>('chapters');
  const [activeChapterId, setActiveChapterId] = useState('mind');
  const [pages, setPages] = useState<KentSourcePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceError, setSourceError] = useState('');
  const [sourceQuery, setSourceQuery] = useState('');
  const [sourceScope, setSourceScope] = useState<'chapter' | 'all'>('all');
  const [selectedTextPage, setSelectedTextPage] = useState<number | null>(null);
  const [rubricQuery, setRubricQuery] = useState('');
  const [rubricFilterChapter, setRubricFilterChapter] = useState('all');
  const [selections, setSelections] = useState<RepertorizationSelection[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSource() {
      try {
        setLoading(true);
        setSourceError('');
        const response = await fetch(
          import.meta.env.BASE_URL + 'data/kent-1897/pages.json',
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(response.status === 404
            ? 'The imported OCR data is not included in this website build yet.'
            : 'The Kent source data could not be loaded (HTTP ' + response.status + ').');
        }

        const data = (await response.json()) as KentSourceData;
        if (data.schemaVersion !== 1 || !Array.isArray(data.pages)) {
          throw new Error('The Kent source data has an unsupported or invalid structure.');
        }
        setPages(data.pages);
      } catch (cause) {
        if (cause instanceof Error && cause.name === 'AbortError') return;
        setSourceError(cause instanceof Error ? cause.message : 'Unable to load the source transcription.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadSource();
    return () => controller.abort();
  }, []);

  const activeChapter = chapterForId(activeChapterId);
  const activeCuratedChapter = getChapterRubrics(activeChapter);

  const chapterPages = useMemo(() => pages.filter((page) =>
    page.printedPage !== null &&
    page.printedPage >= activeChapter.start &&
    page.printedPage <= activeChapter.end
  ), [pages, activeChapter]);

  const sourceResults = useMemo(() => {
    const terms = sourceQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];

    const scopePages = sourceScope === 'chapter'
      ? chapterPages
      : pages;

    return scopePages
      .filter((page) => page.text && terms.every((term) => page.text.toLowerCase().includes(term)))
      .map((page) => ({
        ...page,
        snippet: makeSnippet(page.text, sourceQuery),
      }))
      .slice(0, 100);
  }, [pages, chapterPages, sourceQuery, sourceScope]);

  const rubricRecords = useMemo(() => {
    const records = repertoryDatabase.flatMap((chapter) =>
      chapter.rubrics.map((rubric) => ({
        rubric,
        chapterName: chapter.name,
        chapterId: chapter.id,
      }))
    );
    const query = rubricQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

    return records.filter((record) => {
      const inChapter = rubricFilterChapter === 'all' || record.chapterId === rubricFilterChapter;
      const text = rubricSearchText(record.rubric, record.chapterName);
      return inChapter && query.every((term) => text.includes(term));
    });
  }, [rubricQuery, rubricFilterChapter]);

  const results = useMemo(() => scoreRepertorization(selections), [selections]);
  const selectedPage = pages.find((page) => page.textPage === selectedTextPage) || null;

  function selectChapter(chapterId: string) {
    setActiveChapterId(chapterId);
    setSelectedTextPage(null);
    setSourceQuery('');
    setSourceScope('chapter');
    setActiveTab('chapters');
  }

  function addRubric(rubric: Rubric, chapterName: string) {
    setSelections((current) => current.some((item) => item.rubric.id === rubric.id)
      ? current
      : [...current, { rubric, chapterName, priority: 2 }]);
  }

  function removeRubric(rubricId: string) {
    setSelections((current) => current.filter((item) => item.rubric.id !== rubricId));
  }

  function changePriority(rubricId: string, value: string) {
    const priority = Number(value) as SymptomPriority;
    setSelections((current) => current.map((item) =>
      item.rubric.id === rubricId ? { ...item, priority } : item
    ));
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-24">
      <SEO
        title="Kent's 1897 Repertory — Chapter Index & Repertorization | Curiva"
        description="Explore the 37-chapter Kent repertory directory, search the supplied Volume 1 OCR transcription, and cross-reference curated rubrics with a transparent weighted repertorization engine."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/subject/repertory" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Repertory Study Center
          </Link>
          <Link to="/repertory" className="text-sm font-semibold text-primary hover:underline">
            Open legacy curated repertory
          </Link>
        </div>

        <header className="overflow-hidden rounded-3xl border border-border bg-bg-secondary">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.5fr_0.8fr] lg:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                <BookOpen className="h-4 w-4" />
                Historical repertory workspace · 1897
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl">
                Kent's Repertory
                <span className="mt-1 block text-primary">Complete chapter directory</span>
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Navigate the chapter structure, inspect available curated rubrics, run a weighted cross-reference,
                or search the OCR transcription of the supplied Volume 1 scan. The table of contents covers the
                full work; the imported source text currently covers Volume 1 only.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">J. T. Kent, M.D.</span>
                <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">Examiner Printing House · 1897</span>
                <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">37 chapter headings</span>
                <span className="rounded-lg border border-border bg-bg-primary px-3 py-2">
                  {pages.length ? pages.length.toLocaleString() + ' OCR pages loaded' : 'Volume 1 OCR'}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-bg-primary p-5">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Source integrity</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-bg-secondary p-3">
                  <div className="text-2xl font-bold tabular-nums">{kentChapters.length}</div>
                  <div className="text-[10px] text-text-tertiary">Chapter headings</div>
                </div>
                <div className="rounded-xl bg-bg-secondary p-3">
                  <div className="text-2xl font-bold tabular-nums">{repertoryDatabase.length}</div>
                  <div className="text-[10px] text-text-tertiary">Curated rubric sections</div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                The OCR is a searchable transcription, not a proofread rubric database. It does not create
                remedy grades or replace checking the original scan.
              </p>
            </div>
          </div>
        </header>

        <nav className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-bg-secondary p-2">
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={'flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition-colors sm:text-sm ' +
              (activeTab === 'chapters' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-bg-primary')}
          >
            <Layers className="h-4 w-4" /> <span>Chapter browser</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('engine')}
            className={'flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition-colors sm:text-sm ' +
              (activeTab === 'engine' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-bg-primary')}
          >
            <Sparkles className="h-4 w-4" /> <span>Repertorization engine</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('source')}
            className={'flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-bold transition-colors sm:text-sm ' +
              (activeTab === 'source' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-bg-primary')}
          >
            <FileSearch className="h-4 w-4" /> <span>1897 source text</span>
          </button>
        </nav>

        {activeTab === 'chapters' && (
          <div className="grid gap-6 lg:grid-cols-[310px_minmax(0,1fr)]">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold">Table of contents</h2>
                  <span className="text-[10px] text-text-tertiary">{kentChapters.length} chapters</span>
                </div>
                <div className="max-h-[68vh] space-y-4 overflow-y-auto pr-1">
                  {chapterGroups.map((group) => (
                    <div key={group.name}>
                      <h3 className="mb-2 px-2 text-[10px] font-black uppercase tracking-[0.16em] text-text-tertiary">
                        {group.name}
                      </h3>
                      <div className="space-y-1">
                        {group.ids.map((id) => {
                          const chapter = chapterForId(id);
                          const active = chapter.id === activeChapter.id;
                          const hasStructuredRubrics = Boolean(getChapterRubrics(chapter));
                          return (
                            <button
                              type="button"
                              key={chapter.id}
                              onClick={() => selectChapter(chapter.id)}
                              className={'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ' +
                                (active ? 'bg-primary text-white' : 'hover:bg-bg-secondary')}
                            >
                              <span className={'w-6 shrink-0 text-[10px] font-bold tabular-nums ' +
                                (active ? 'text-white/70' : 'text-text-tertiary')}>
                                {String(chapter.number).padStart(2, '0')}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className={'block truncate text-xs font-semibold ' +
                                  (active ? 'text-white' : 'text-text-primary')}>
                                  {chapter.name}
                                </span>
                                <span className={'block text-[10px] ' +
                                  (active ? 'text-white/65' : 'text-text-tertiary')}>
                                  pp. {chapter.start}–{chapter.end}
                                </span>
                              </span>
                              {hasStructuredRubrics
                                ? <Check className={'h-3.5 w-3.5 shrink-0 ' + (active ? 'text-white' : 'text-emerald-600')} />
                                : <ChevronRight className={'h-3.5 w-3.5 shrink-0 ' + (active ? 'text-white/70' : 'text-text-tertiary')} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-bg-secondary p-4 text-xs leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Index status</strong>
                <p className="mt-1">
                  Green check marks indicate that Curiva has a related structured rubric section. They do not
                  mean that every rubric in that Kent chapter has been digitized or verified.
                </p>
              </div>
            </aside>

            <section className="space-y-5">
              <div className="rounded-2xl border border-border bg-white p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                      Chapter {activeChapter.number} · printed pages {activeChapter.start}–{activeChapter.end}
                    </div>
                    <h2 className="mt-2 font-serif text-3xl font-bold">{activeChapter.name}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">{activeChapter.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSourceScope('chapter');
                      setSourceQuery('');
                      setSelectedTextPage(null);
                      setActiveTab('source');
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/5"
                  >
                    <FileSearch className="h-4 w-4" /> Search this chapter
                  </button>
                </div>
              </div>

              {activeCuratedChapter ? (
                <div className="rounded-2xl border border-border bg-white p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
                        Curiva structured rubric collection
                      </div>
                      <h3 className="mt-1 font-serif text-xl font-bold">{activeCuratedChapter.name}: indexed rubrics</h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        {activeCuratedChapter.rubrics.length} curated records · grouped by subheading
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRubricFilterChapter(activeCuratedChapter.id);
                        setRubricQuery('');
                        setActiveTab('engine');
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:opacity-90"
                    >
                      <Sparkles className="h-4 w-4" /> Use in engine
                    </button>
                  </div>

                  <div className="mt-6 space-y-6">
                    {Object.entries(activeCuratedChapter.rubrics.reduce<Record<string, Rubric[]>>((groups, rubric) => {
                      const heading = rubric.subCategory || 'General rubrics';
                      if (!groups[heading]) groups[heading] = [];
                      groups[heading].push(rubric);
                      return groups;
                    }, {})).map(([heading, rubrics]) => (
                      <div key={heading} className="border-t border-border pt-4">
                        <h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-text-secondary">
                          <span className="h-4 w-1 rounded-full bg-primary" /> {heading}
                        </h4>
                        <div className="divide-y divide-border">
                          {rubrics.map((rubric) => {
                            const alreadySelected = selections.some((item) => item.rubric.id === rubric.id);
                            return (
                              <div key={rubric.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium leading-relaxed">{rubric.symptom}</p>
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    {rubric.remedies.map((remedy) => (
                                      <span key={remedy} className="rounded-md border border-border bg-bg-secondary px-2 py-1 text-[10px] font-semibold text-text-secondary">
                                        {remedy}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  disabled={alreadySelected}
                                  onClick={() => addRubric(rubric, activeCuratedChapter.name)}
                                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/25 px-3 py-2 text-xs font-bold text-primary disabled:cursor-default disabled:opacity-60"
                                >
                                  {alreadySelected ? <Check className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
                                  {alreadySelected ? 'Added' : 'Add to case'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-bg-secondary p-6">
                  <h3 className="font-serif text-xl font-bold">Structured rubrics not yet indexed here</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    This chapter is present in the full table of contents, but Curiva's current structured
                    rubric dataset does not yet contain a verified searchable collection for it. Use the
                    source-text tab to search the imported OCR pages. Do not treat OCR lines as verified
                    rubric/remedy/grade records.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSourceScope('chapter');
                      setSourceQuery('');
                      setSelectedTextPage(null);
                      setActiveTab('source');
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white"
                  >
                    <Search className="h-4 w-4" /> Search chapter OCR
                  </button>
                </div>
              )}

              <div className="rounded-2xl border border-border bg-bg-secondary p-5">
                <h3 className="font-serif text-lg font-bold">Printed-page lookup</h3>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                  The page range above refers to the full edition's printed pagination. The supplied file is
                  a Volume 1 scan and printed-page extraction is best-effort OCR metadata.
                </p>
                <div className="mt-3 text-sm font-semibold">
                  {loading
                    ? 'Reading source index…'
                    : chapterPages.length + ' extracted pages tagged to this chapter range'}
                </div>
                {sourceError && <p className="mt-2 text-xs text-amber-700">{sourceError}</p>}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'engine' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
            <section className="space-y-5">
              <div className="rounded-2xl border border-border bg-white p-5 sm:p-7">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em]">Curiva weighted analysis</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl font-bold">Repertorization engine</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Select rubrics from Curiva's existing structured collection. Assign each symptom a case
                  priority, then calculate transparent remedy overlap and weighted coverage. All calculations
                  run locally in your browser; no paid AI service or API key is required.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  <h3 className="font-serif text-lg font-bold">Find a rubric</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
                  <input
                    type="search"
                    value={rubricQuery}
                    onChange={(event) => setRubricQuery(event.target.value)}
                    placeholder="Search symptom, subheading or remedy…"
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                  <select
                    value={rubricFilterChapter}
                    onChange={(event) => setRubricFilterChapter(event.target.value)}
                    className="w-full rounded-xl border border-border bg-bg-primary px-3 py-3 text-sm outline-none focus:border-primary"
                    aria-label="Filter rubric section"
                  >
                    <option value="all">All curated sections</option>
                    {repertoryDatabase.map((chapter) => (
                      <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                  <span>{rubricRecords.length} matching rubric records</span>
                  <button
                    type="button"
                    onClick={() => { setRubricQuery(''); setRubricFilterChapter('all'); }}
                    className="text-primary hover:underline"
                  >
                    Reset search
                  </button>
                </div>

                <div className="mt-3 max-h-[580px] divide-y divide-border overflow-y-auto">
                  {rubricRecords.slice(0, 100).map((record) => {
                    const added = selections.some((item) => item.rubric.id === record.rubric.id);
                    return (
                      <div key={record.rubric.id} className="py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-bg-secondary px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-text-tertiary">
                            {record.chapterName}
                          </span>
                          {record.rubric.subCategory && (
                            <span className="text-[10px] font-semibold text-primary">{record.rubric.subCategory}</span>
                          )}
                        </div>
                        <p className="mt-2 text-sm font-medium leading-relaxed">{record.rubric.symptom}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {record.rubric.remedies.map((remedy) => (
                            <span key={remedy} className="rounded border border-border bg-bg-secondary px-2 py-1 text-[10px] text-text-secondary">
                              {remedy}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            type="button"
                            disabled={added}
                            onClick={() => addRubric(record.rubric, record.chapterName)}
                            className="inline-flex items-center gap-2 rounded-lg border border-primary/25 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-primary disabled:opacity-50"
                          >
                            {added ? <Check className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
                            {added ? 'In case' : 'Add rubric'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {rubricRecords.length === 0 && (
                    <div className="py-10 text-center text-sm text-text-secondary">
                      No curated rubric records match this search. Try another term or choose all sections.
                    </div>
                  )}
                  {rubricRecords.length > 100 && (
                    <p className="py-3 text-center text-xs text-text-tertiary">
                      Showing the first 100 results. Narrow the search to see more.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold">Case symptom set</h3>
                    <p className="mt-1 text-xs text-text-secondary">{selections.length} selected rubrics</p>
                  </div>
                  {selections.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelections([])}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-rose-700 hover:bg-rose-50"
                    >
                      <X className="h-3.5 w-3.5" /> Clear
                    </button>
                  )}
                </div>

                {selections.length === 0 ? (
                  <div className="mt-4 rounded-xl border border-dashed border-border bg-bg-secondary p-6 text-center">
                    <BookmarkPlus className="mx-auto h-7 w-7 text-text-tertiary" />
                    <p className="mt-2 text-sm font-semibold">No rubrics selected</p>
                    <p className="mt-1 text-xs text-text-secondary">Search and add rubrics to build a case for analysis.</p>
                  </div>
                ) : (
                  <div className="mt-4 max-h-[440px] space-y-3 overflow-y-auto pr-1">
                    {selections.map((item) => (
                      <div key={item.rubric.id} className="rounded-xl border border-border bg-bg-secondary p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-primary">{item.chapterName}</div>
                            <p className="mt-1 text-xs font-semibold leading-relaxed">{item.rubric.symptom}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeRubric(item.rubric.id)}
                            className="rounded-md p-1 text-text-tertiary hover:bg-white hover:text-rose-700"
                            aria-label="Remove rubric"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <label htmlFor={'priority-' + item.rubric.id} className="text-[10px] font-semibold text-text-secondary">
                            Symptom priority
                          </label>
                          <select
                            id={'priority-' + item.rubric.id}
                            value={item.priority}
                            onChange={(event) => changePriority(item.rubric.id, event.target.value)}
                            className="rounded-lg border border-border bg-white px-2 py-1.5 text-xs"
                          >
                            <option value={1}>1 · Supporting</option>
                            <option value={2}>2 · Characteristic</option>
                            <option value={3}>3 · Keynote</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold">Scoring method</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  Each selected rubric contributes its chosen priority (1, 2 or 3) to every remedy listed
                  in that rubric. Weighted coverage is the remedy's points divided by the total priority
                  points in the case. This is a transparent overlap score—not a Kent remedy grade, probability,
                  diagnosis or treatment recommendation.
                </p>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'engine' && (
          <section className="mt-6 rounded-2xl border border-border bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">Calculated from selected rubric records</div>
                <h2 className="mt-1 font-serif text-2xl font-bold">Ranked cross-reference</h2>
              </div>
              <span className="rounded-lg bg-bg-secondary px-3 py-2 text-xs font-semibold text-text-secondary">
                {results.length} remedies matched
              </span>
            </div>

            {results.length === 0 ? (
              <p className="mt-4 rounded-xl bg-bg-secondary p-5 text-sm text-text-secondary">
                Add at least one rubric to calculate remedy overlap. The engine will show the matched rubrics
                and the weight each one contributes.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {results.map((result, index) => (
                  <details key={result.key} className="rounded-xl border border-border p-4" open={index === 0}>
                    <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{result.name}</span>
                        <span className="block text-[10px] text-text-tertiary">
                          {result.abbreviation} · {result.family}
                        </span>
                      </span>
                      <span className="text-right">
                        <span className="block text-lg font-bold tabular-nums text-primary">{result.coveragePercent}%</span>
                        <span className="block text-[9px] uppercase tracking-wider text-text-tertiary">Weighted coverage</span>
                      </span>
                      <ChevronDown className="h-4 w-4 text-text-tertiary" />
                    </summary>
                    <div className="mt-4 pl-11">
                      <div className="mb-3 h-2 overflow-hidden rounded-full bg-bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: result.coveragePercent + '%' }} />
                      </div>
                      <p className="text-xs text-text-secondary">
                        Matched {result.matchedRubrics} of {selections.length} selected rubrics ·
                        weighted points {result.weightedPoints}
                      </p>
                      <div className="mt-3 space-y-2">
                        {result.evidence.map((evidence) => (
                          <div key={evidence.rubricId} className="rounded-lg bg-bg-secondary p-3">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-primary">
                              {evidence.chapter} · Priority {evidence.priority}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed">{evidence.rubric}</p>
                          </div>
                        ))}
                      </div>
                      {result.remedyId && (
                        <Link to={'/remedy/' + result.remedyId} className="mt-3 inline-flex text-xs font-bold text-primary underline">
                          Open linked Materia Medica entry
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'source' && (
          <section className="space-y-5">
            <div className="rounded-2xl border border-border bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">Wellcome / Internet Archive source</div>
                  <h2 className="mt-1 font-serif text-2xl font-bold">Search the 1897 OCR transcription</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">
                    Search extracted text, then open the page transcription and compare it with the original scan.
                    Search is performed over page text; it does not parse a verified rubric tree or remedy grades.
                  </p>
                </div>
                <a href={sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary underline">
                  Open original scan
                </a>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_230px]">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                  <input
                    type="search"
                    value={sourceQuery}
                    onChange={(event) => setSourceQuery(event.target.value)}
                    placeholder="Search rubric phrase, symptom or remedy abbreviation…"
                    className="w-full rounded-xl border border-border bg-bg-primary py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
                  />
                </div>
                <select
                  value={sourceScope}
                  onChange={(event) => { setSourceScope(event.target.value as 'chapter' | 'all'); setSelectedTextPage(null); }}
                  className="w-full rounded-xl border border-border bg-bg-primary px-3 py-3 text-sm outline-none focus:border-primary"
                  aria-label="OCR search scope"
                >
                  <option value="all">Entire supplied Volume 1</option>
                  <option value="chapter">Selected chapter only</option>
                </select>
              </div>

              {loading && (
                <div className="mt-5 flex items-center gap-2 text-sm text-text-secondary">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                  Loading source pages…
                </div>
              )}

              {!loading && sourceError && (
                <div className="mt-5 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <div>
                    <strong>Source transcription is not in this build.</strong>
                    <p className="mt-1">{sourceError}</p>
                    <p className="mt-2 text-xs">
                      Generate public/data/kent-1897/pages.json with npm run import:kent:1897, then rebuild the app.
                    </p>
                  </div>
                </div>
              )}

              {!loading && !sourceError && !sourceQuery.trim() && (
                <div className="mt-5 rounded-xl bg-bg-secondary p-5 text-sm text-text-secondary">
                  {sourceScope === 'chapter'
                    ? 'Search chapter ' + activeChapter.number + ': ' + activeChapter.name + ' (printed pages ' + activeChapter.start + '–' + activeChapter.end + ').'
                    : 'Enter one or more terms to search the supplied Volume 1 OCR transcription.'}
                  <span className="mt-1 block text-xs text-text-tertiary">
                    {sourceScope === 'chapter'
                      ? chapterPages.length + ' pages are tagged to this printed-page range.'
                      : pages.length + ' extracted PDF pages are loaded.'}
                  </span>
                </div>
              )}

              {!loading && !sourceError && sourceQuery.trim() && (
                <div className="mt-5">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                    {sourceResults.length} matching pages shown (maximum 100)
                  </div>
                  {sourceResults.length === 0 ? (
                    <p className="rounded-xl bg-bg-secondary p-5 text-sm text-text-secondary">
                      No page matched all search terms in this scope. Try fewer words or search the entire supplied volume.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {sourceResults.map((result) => (
                        <button
                          type="button"
                          key={result.textPage}
                          onClick={() => setSelectedTextPage(result.textPage)}
                          className={'block w-full rounded-xl border p-4 text-left transition-colors ' +
                            (selectedTextPage === result.textPage
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-bg-primary hover:border-primary/40')}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            PDF text page {result.textPage}
                            {result.printedPage ? ' · printed page ' + result.printedPage : ''}
                          </span>
                          <span className="mt-2 block text-xs leading-relaxed text-text-secondary">{makeSnippet(result.text, sourceQuery)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedPage && (
              <div className="rounded-2xl border border-border bg-white p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">OCR page transcription</div>
                    <h3 className="font-serif text-xl font-bold">
                      PDF text page {selectedPage.textPage}
                      {selectedPage.printedPage ? ' · printed page ' + selectedPage.printedPage : ''}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTextPage(null)}
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-bold"
                  >
                    <X className="h-3.5 w-3.5" /> Close
                  </button>
                </div>
                <pre className="mt-4 max-h-[65vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-border bg-[#fbfaf6] p-4 text-xs leading-relaxed text-[#302e29]">
                  {selectedPage.text}
                </pre>
                <a href={sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold text-primary underline">
                  Verify wording against the scan
                </a>
              </div>
            )}
          </section>
        )}

        <section className="rounded-2xl border border-amber-300/60 bg-amber-50 p-5 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="space-y-1">
              <strong>Academic and clinical-use boundary</strong>
              <p className="text-xs leading-relaxed">
                The imported text is OCR and may contain transcription errors. The repertorization engine scores
                only remedies listed in the selected Curiva curated rubric records. Priority weights are user
                choices, not Kent's original remedy grades. This educational tool does not diagnose, prescribe,
                or establish treatment effectiveness; urgent or serious symptoms need qualified medical care.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-border pt-5 text-xs leading-relaxed text-text-tertiary">
          <p>
            Source attribution: J. T. Kent, <em>Repertory of the Homoeopathic Materia Medica</em>,
            Examiner Printing House, Lancaster, 1897[-1899]. Digitized by Wellcome Collection and
            catalogued as a two-volume work. The supplied import is Volume 1 only. Credit:
            Repertory of the homoeopathic materia medica / by J.T. Kent. Public Domain Mark.
            Source: Wellcome Collection.
          </p>
          <a className="mt-2 inline-flex text-primary underline" href={wellcomeUrl} target="_blank" rel="noreferrer">
            Wellcome source record and reuse information
          </a>
        </footer>
      </div>
    </div>
  );
}
