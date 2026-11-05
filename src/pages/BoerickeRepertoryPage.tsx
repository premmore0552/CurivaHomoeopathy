import React, { useMemo, useState } from 'react';
import { BookOpen, Search, ChevronDown, ChevronRight, ExternalLink, ListTree, Info } from 'lucide-react';
import SEO from '../components/SEO';
import taxonomy from '../data/boericke/repertory-taxonomy.json';

type Chapter = { id: string; name: string; kind: string; subheadings: string[]; contentStatus: string };
const chapters = taxonomy.chapters as Chapter[];

export default function BoerickeRepertoryPage() {
  const [query, setQuery] = useState('');
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id ?? 'mind');
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedRubric, setSelectedRubric] = useState<{ chapter: string; label: string } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return chapters;
    return chapters.filter(ch => ch.name.toLocaleLowerCase().includes(q) ||
      ch.subheadings.some(s => s.toLocaleLowerCase().includes(q)));
  }, [query]);
  const current = chapters.find(ch => ch.id === activeChapter) ?? chapters[0];

  const toggleExpanded = (id: string) => setExpanded(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  return <div className="min-h-screen bg-bg-primary text-text-primary">
    <SEO title="Boericke Repertory — Chapter Index | Curiva Homoeopathy"
      description="Browse the supplied Boericke repertory chapter and subheading index. Rubric details and remedy associations will be added only from verified source data."
      keywords="Boericke repertory, repertory index, homoeopathy study, repertory chapters, BHMS" />
    <header className="border-b border-border bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-200"><BookOpen size={18}/> Historical reference index</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Boericke Repertory</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">A structured chapter and subheading browser, following the supplied index order from Mind through Modalities, with the Materia Medica cross-reference retained.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">26 navigation entries</span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">{chapters.reduce((n,c)=>n+c.subheadings.length,0)} subheading labels</span>
          <span className="rounded-full border border-amber-200/30 bg-amber-300/10 px-3 py-1.5 text-amber-100">Index only — detail data pending</span>
        </div>
      </div>
    </header>
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="h-fit rounded-2xl border border-border bg-bg-secondary p-4 lg:sticky lg:top-24">
        <label htmlFor="repertory-index-search" className="mb-2 block text-sm font-semibold">Search chapters and subheadings</label>
        <div className="relative">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
          <input id="repertory-index-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. headache, retina, Modalities" className="w-full rounded-xl border border-border bg-bg-primary py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"/>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-text-secondary"><span>{filtered.length} matching chapters</span><span>Source order</span></div>
        <nav aria-label="Repertory chapters" className="mt-3 max-h-[65vh] space-y-1 overflow-y-auto">
          {filtered.map(ch => <button key={ch.id} onClick={()=>{setActiveChapter(ch.id);setSelectedRubric(null)}} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${activeChapter===ch.id?'bg-primary text-white':'hover:bg-bg-primary'}`}>
            <span>{ch.name}</span><span className={`text-xs ${activeChapter===ch.id?'text-white/75':'text-text-secondary'}`}>{ch.subheadings.length || '↗'}</span>
          </button>)}
          {filtered.length===0 && <p className="p-3 text-sm text-text-secondary">No chapter or subheading matches that search.</p>}
        </nav>
        <a href="http://www.homeoint.org/books4/boerirep/index.htm" target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary hover:underline">Original repertory index <ExternalLink size={14}/></a>
      </aside>
      <section className="min-w-0 space-y-5">
        {current && <>
          <div className="rounded-2xl border border-border bg-bg-secondary p-5 sm:p-7">
            <div className="flex items-start gap-3"><div className="rounded-xl bg-primary/10 p-3 text-primary"><ListTree size={22}/></div><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Chapter {current === chapters[25] ? 'cross-reference' : String(chapters.findIndex(c=>c.id===current.id)+1).padStart(2,'0')}</p><h2 className="mt-1 text-2xl font-bold sm:text-3xl">{current.name}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{current.kind==='cross-reference'?'A retained cross-reference to the Materia Medica section.':'Subheading index transcribed from the list supplied for this project. Detailed rubric text and remedy associations have not yet been imported.'}</p></div></div>
            <div className="mt-5 flex flex-wrap gap-2"><button onClick={()=>toggleExpanded(current.id)} className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-bg-primary">{expanded.includes(current.id)?'Collapse subheadings':'Expand subheadings'}</button><span className="rounded-lg bg-bg-primary px-3 py-2 text-sm text-text-secondary">{current.subheadings.length} labels</span></div>
          </div>
          {current.subheadings.length ? <div className="rounded-2xl border border-border bg-bg-secondary">
            <div className="border-b border-border px-5 py-4"><h3 className="font-bold">Subheadings</h3><p className="mt-1 text-sm text-text-secondary">Select a label to open its detail panel. Source content is intentionally not inferred.</p></div>
            <div className="grid gap-2 p-4 sm:grid-cols-2">
              {current.subheadings.map((label,index)=><button key={label+'-'+index} onClick={()=>setSelectedRubric({chapter:current.name,label})} className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${selectedRubric?.label===label?'border-primary bg-primary/10':'border-border hover:bg-bg-primary'}`}><span>{label}</span><ChevronRight size={15} className="shrink-0 text-text-secondary"/></button>)}
            </div>
          </div> : <div className="rounded-2xl border border-dashed border-border bg-bg-secondary p-6"><h3 className="font-bold">{current.name}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">This entry is preserved as a navigation cross-reference. No subheadings were supplied for it.</p><a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline" href="https://www.homeoint.org/books/boericmm/index.htm" target="_blank" rel="noreferrer">Open Materia Medica index <ExternalLink size={14}/></a></div>}
          {selectedRubric && selectedRubric.chapter===current.name && <div className="rounded-2xl border border-primary/30 bg-bg-secondary p-5 sm:p-6">
            <div className="flex items-start gap-3"><Info className="mt-1 shrink-0 text-primary" size={20}/><div><p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Selected index label</p><h3 className="mt-1 text-xl font-bold">{selectedRubric.label}</h3><p className="mt-1 text-sm text-text-secondary">{selectedRubric.chapter}</p></div></div>
            <div className="mt-4 rounded-xl border border-dashed border-border p-4"><h4 className="font-semibold">Detailed rubric content</h4><p className="mt-2 text-sm leading-6 text-text-secondary">Not loaded yet. The source text, nested rubric levels, remedy abbreviations, and remedy grades must be imported from a verified source page or supplied dataset. No content has been generated for this label.</p></div>
            <button onClick={()=>setSelectedRubric(null)} className="mt-4 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-bg-primary">Close detail</button>
          </div>}
        </>}
        <div className="rounded-2xl border border-amber-300/30 bg-amber-50 p-5 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
          <h3 className="font-bold">Content and safety note</h3><p className="mt-2 text-sm leading-6">This page is a historical homoeopathic reference index, not evidence-based diagnostic or treatment guidance. The current build contains chapter/subheading labels only; it does not assert remedies or clinical effectiveness.</p>
        </div>
      </section>
    </main>
  </div>;
}
