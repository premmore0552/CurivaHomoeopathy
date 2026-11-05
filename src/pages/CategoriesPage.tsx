import React from 'react';
import ResearchMindMap from '../components/ResearchMindMap';
import SEO from '../components/SEO';
import {
  Activity,
  ArrowDown,
  BookOpen,
  Compass,
  GraduationCap,
  Search,
  ShieldCheck,
} from 'lucide-react';

const focusAreas = [
  {
    icon: BookOpen,
    eyebrow: 'Materia Medica',
    title: 'Remedy reference',
    description: 'Explore remedy entries and traditional materia medica groupings in the interactive map.',
    color: 'text-emerald-600',
    surface: 'bg-emerald-500/10',
  },
  {
    icon: Activity,
    eyebrow: 'Clinical topics',
    title: 'Topic pathways',
    description: 'Browse the clinical-topic branches and open the linked educational pages where available.',
    color: 'text-sky-600',
    surface: 'bg-sky-500/10',
  },
  {
    icon: GraduationCap,
    eyebrow: 'Foundations',
    title: 'Principles & history',
    description: 'Find the philosophy and historical topics represented in the repository map.',
    color: 'text-amber-600',
    surface: 'bg-amber-500/10',
  },
];

export default function CategoriesPage() {
  return (
    <>
      <SEO
        title="Research Repository | Curiva Homoeopathy"
        description="Explore Curiva's educational research map, including materia medica, clinical topics, and homoeopathic principles."
      />
      <main className="min-h-screen overflow-hidden bg-bg-primary pb-20 pt-20 transition-colors duration-300">
        <section className="relative border-b border-border/70 bg-bg-secondary">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Curiva · Learning & research
              </div>
              <h1 className="max-w-3xl text-4xl font-display font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-7xl">
                Research, made
                <span className="mt-1 block font-serif italic text-primary">easier to explore.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                Navigate a connected map of materia medica, clinical topics, and foundational concepts. Search the map, filter its branches, and open linked learning resources.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#repository-explorer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl">
                  <Compass className="h-4 w-4" />
                  Explore repository
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a href="#how-to-use" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-bg-primary/80 px-6 py-3 text-sm font-bold text-text-primary transition hover:border-primary/40">
                  <Search className="h-4 w-4" />
                  How to navigate
                </a>
              </div>
              <p className="mt-5 max-w-xl text-xs leading-5 text-text-secondary/80">
                Educational reference only. Repository entries reflect the topics currently represented on this site and are not a substitute for evidence-based medical advice.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-border bg-bg-primary p-5 shadow-2xl shadow-black/5 sm:p-7">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Repository overview</p>
                    <p className="mt-1 text-lg font-bold text-text-primary">Explore by pathway</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-3 pt-5">
                  {[
                    { icon: BookOpen, title: 'Materia Medica A–Z', note: 'Remedy reference branches', color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
                    { icon: Activity, title: 'Clinical therapeutics', note: 'Topic-based learning paths', color: 'text-sky-600', bg: 'bg-sky-500/10' },
                    { icon: GraduationCap, title: 'Organon & principles', note: 'Foundational concepts', color: 'text-amber-600', bg: 'bg-amber-500/10' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-border/70 p-4 transition hover:border-primary/30 hover:bg-primary/[0.03]">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-text-primary">{item.title}</p>
                        <p className="mt-1 text-xs text-text-secondary">{item.note}</p>
                      </div>
                      <ArrowDown className="ml-auto h-4 w-4 -rotate-90 text-text-secondary/60" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-bg-secondary p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-xs leading-5 text-text-secondary">Use the map as a learning index. Follow a node's linked page for more context when a destination is available.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="how-to-use">
          <div className="mb-6 max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">A simple starting point</p>
            <h2 className="mt-2 text-2xl font-display font-semibold tracking-tight text-text-primary sm:text-3xl">Choose a path into the library</h2>
            <p className="mt-3 leading-7 text-text-secondary">Start with a broad subject, narrow your view with search or filters, then select a node to inspect its summary and available link.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <article key={area.title} className="group rounded-3xl border border-border bg-bg-primary p-6 transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5">
                <div className="mb-5 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${area.surface} ${area.color}`}>
                    <area.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black tracking-widest text-text-secondary/50">0{index + 1}</span>
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${area.color}`}>{area.eyebrow}</p>
                <h3 className="mt-2 text-xl font-bold text-text-primary">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="repository-explorer" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Interactive index</p>
                <h2 className="mt-2 text-2xl font-display font-semibold tracking-tight text-text-primary sm:text-3xl">Explore the research map</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">Use the controls inside the explorer to search, filter, zoom, and switch map layouts. On smaller screens, browse the expandable topic tree.</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg-secondary px-3 py-2 text-xs font-semibold text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Interactive explorer
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-bg-primary shadow-xl shadow-black/5">
              <ResearchMindMap />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-bg-secondary p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">A note on research and care</h2>
              <p className="mt-1 text-sm leading-6 text-text-secondary">This is an educational index, not a clinical decision tool. Homoeopathy has limited reliable evidence for treating health conditions; do not delay or replace proven care with information found in this repository.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
