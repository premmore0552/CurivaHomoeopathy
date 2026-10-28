import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, BookOpen, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Home, Menu, Search, Settings2, SlidersHorizontal, Users, X } from 'lucide-react';
import SEO from '../components/SEO';

type ChartKey = 'traffic' | 'engagement' | 'resources';
const chartNames: Record<ChartKey, string> = {
  traffic: 'Visits over time',
  engagement: 'Engagement by channel',
  resources: 'Top resource categories'
};
const chartData: Record<ChartKey, { label: string; value: number }[]> = {
  traffic: [{ label: 'Mon', value: 42 }, { label: 'Tue', value: 58 }, { label: 'Wed', value: 49 }, { label: 'Thu', value: 72 }, { label: 'Fri', value: 63 }, { label: 'Sat', value: 84 }, { label: 'Sun', value: 76 }],
  engagement: [{ label: 'Direct', value: 72 }, { label: 'Search', value: 58 }, { label: 'Social', value: 39 }, { label: 'Referral', value: 27 }],
  resources: [{ label: 'Study notes', value: 88 }, { label: 'Materia Medica', value: 74 }, { label: 'Clinical', value: 61 }, { label: 'Research', value: 43 }]
};

function ChartCard({ chart, active }: { chart: ChartKey; active?: boolean }) {
  const data = chartData[chart];
  const max = Math.max(...data.map(d => d.value));
  return <section className={`rounded-2xl border border-border bg-bg-secondary p-4 sm:p-5 min-w-0 ${active ? 'ring-2 ring-primary/30' : ''}`}>
    <div className="flex items-start justify-between gap-3 mb-5">
      <div><p className="text-xs font-bold uppercase tracking-widest text-text-tertiary">Analytics</p><h2 className="mt-1 text-lg font-bold">{chartNames[chart]}</h2></div>
      <button type="button" aria-label={`More options for ${chartNames[chart]}`} className="rounded-xl p-2 hover:bg-bg-tertiary"><Settings2 size={17}/></button>
    </div>
    {chart === 'traffic' ? <div className="h-44 flex items-end gap-2 sm:gap-3 border-b border-border pb-2">
      {data.map((d, i) => <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
        <div className="w-full max-w-8 rounded-t-md bg-primary/20 relative overflow-hidden" style={{ height: `${d.value / max * 100}%` }}><div className="absolute inset-x-0 bottom-0 rounded-t-md bg-primary" style={{ height: `${Math.max(22, d.value / max * 100)}%` }}/></div>
        <span className="text-[10px] sm:text-xs text-text-tertiary">{d.label}</span>
      </div>)}
    </div> : <div className="space-y-4">
      {data.map(d => <div key={d.label}>
        <div className="mb-1.5 flex justify-between gap-2 text-xs"><span className="text-text-secondary">{d.label}</span><strong>{d.value}%</strong></div>
        <div className="h-2.5 rounded-full bg-bg-tertiary overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${d.value / max * 100}%` }}/></div>
      </div>)}
    </div>}
    <p className="mt-4 text-xs text-text-tertiary">Illustrative dashboard data · connect analytics for live metrics</p>
  </section>;
}

export default function AdminAnalyticsDashboard() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [period, setPeriod] = useState('Last 7 days');
  const [category, setCategory] = useState('All categories');
  const [query, setQuery] = useState('');
  const [activeChart, setActiveChart] = useState(0);
  const [applied, setApplied] = useState(false);
  const charts: ChartKey[] = ['traffic', 'engagement', 'resources'];
  const filteredHint = useMemo(() => [period, category].filter(Boolean).join(' · '), [period, category]);
  const applyFilters = () => { setApplied(true); setFiltersOpen(false); };
  return <div className="min-h-screen bg-bg-primary text-text-primary pb-24 lg:pb-8">
    <SEO title="Admin Analytics Dashboard | Curiva Homoeopathy" description="Responsive analytics dashboard for Curiva Homoeopathy website administration."/>
    <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs text-text-tertiary mb-5"><Link to="/" className="hover:text-primary">Website</Link><ChevronRight size={14}/><span>Administration</span><ChevronRight size={14}/><span className="text-text-primary font-semibold">Analytics overview</span></nav>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-primary mb-2">Curiva · Operations</p><h1 className="text-3xl sm:text-4xl font-bold">Analytics overview</h1><p className="mt-2 text-sm text-text-secondary max-w-2xl">Monitor resource discovery, engagement, and site activity from one responsive workspace.</p></div>
        <div className="hidden sm:flex gap-2"><button onClick={() => setFiltersOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-bg-tertiary"><Filter size={16}/> Filters</button><button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white"><Download size={16}/> Export / Print</button></div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: 'Total visits', value: '24.8k', change: '+12.4%', icon: Activity },
          { label: 'Active readers', value: '8,642', change: '+8.2%', icon: Users },
          { label: 'Resource opens', value: '16.3k', change: '+15.7%', icon: BookOpen },
          { label: 'Engagement rate', value: '64.8%', change: '+3.1%', icon: BarChart3 }
        ].map(k => <article key={k.label} className="rounded-2xl border border-border bg-bg-secondary p-4 sm:p-5 min-w-0"><div className="flex items-center justify-between gap-2"><span className="text-xs sm:text-sm text-text-secondary">{k.label}</span><k.icon className="hidden sm:block text-primary" size={18}/></div><div className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">{k.value}</div><div className="mt-2 flex items-center gap-1 text-xs font-bold text-primary"><ArrowUpRight size={14}/>{k.change}<span className="font-normal text-text-tertiary">vs prior period</span></div></article>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6">
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-border bg-bg-secondary p-5">
            <div className="flex items-center gap-2 mb-5"><SlidersHorizontal size={17}/><h2 className="font-bold">Advanced filters</h2></div>
            <label className="block text-xs font-bold text-text-secondary mb-2" htmlFor="desktop-period">Date range</label><select id="desktop-period" value={period} onChange={e=>setPeriod(e.target.value)} className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm mb-5"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select>
            <label className="block text-xs font-bold text-text-secondary mb-2" htmlFor="desktop-category">Resource category</label><select id="desktop-category" value={category} onChange={e=>setCategory(e.target.value)} className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm mb-5"><option>All categories</option><option>Study notes</option><option>Materia Medica</option><option>Clinical resources</option><option>Research</option></select>
            <label className="block text-xs font-bold text-text-secondary mb-2" htmlFor="desktop-search">Search resources</label><div className="relative mb-5"><Search size={16} className="absolute left-3 top-3.5 text-text-tertiary"/><input id="desktop-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Title or keyword" className="w-full rounded-xl border border-border bg-bg-primary py-3 pl-9 pr-3 text-sm"/></div>
            <button onClick={applyFilters} className="w-full rounded-xl bg-primary py-3 font-bold text-white">Apply filters</button><button onClick={()=>{setPeriod('Last 7 days');setCategory('All categories');setQuery('');setApplied(false)}} className="w-full mt-2 rounded-xl py-3 text-sm font-semibold text-text-secondary hover:bg-bg-tertiary">Reset</button>
          </div>
        </aside>
        <main className="min-w-0 lg:col-span-9 xl:col-span-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4"><div><h2 className="text-xl font-bold">Performance charts</h2><p className="text-xs text-text-tertiary mt-1">{applied ? 'Filters applied · ' : ''}{filteredHint}{query ? ` · Search: “${query}”` : ''}</p></div><button onClick={()=>setFiltersOpen(true)} className="lg:hidden inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-bold"><Filter size={16}/> Filters <ChevronDown size={14}/></button></div>
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 xl:gap-5">{charts.map(c=><ChartCard key={c} chart={c}/>)}</div>
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3" aria-label="Chart selector">{charts.map((c,i)=><button key={c} onClick={()=>{setActiveChart(i);document.getElementById(`dashboard-chart-${c}`)?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});}} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold border ${activeChart===i?'bg-primary text-white border-primary':'border-border bg-bg-secondary'}`}>{i+1}. {chartNames[c]}</button>)}</div>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth" onScroll={e=>{const el=e.currentTarget;const next=Math.round(el.scrollLeft / Math.max(1,el.clientWidth));setActiveChart(Math.max(0,Math.min(charts.length-1,next)));}}>
              {charts.map((c,i)=><div id={`dashboard-chart-${c}`} key={c} className="w-full min-w-full shrink-0 snap-start"><ChartCard chart={c} active={activeChart===i}/></div>)}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">{charts.map((c,i)=><button key={c} aria-label={`Show chart ${i+1}: ${chartNames[c]}`} onClick={()=>{setActiveChart(i);document.getElementById(`dashboard-chart-${c}`)?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});}} className={`h-2 rounded-full transition-all ${i===activeChart?'w-6 bg-primary':'w-2 bg-border'}`}/>)}</div>
          </div>
          <section className="mt-6 rounded-2xl border border-border bg-bg-secondary p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 mb-4"><div><h2 className="font-bold text-lg">Recent activity</h2><p className="text-xs text-text-tertiary mt-1">Sample activity feed · not connected to live analytics</p></div><button onClick={()=>setFiltersOpen(true)} className="text-sm font-bold text-primary">Refine</button></div>
            <div className="divide-y divide-border">
              {[['Resource published','Student Resources · BHMS study notes','Today, 10:42'],['Research page updated','Research Repository','Yesterday, 16:20'],['Clinical guide opened','Public Education','Yesterday, 11:08']].map((a,i)=><div key={a[0]} className="flex items-start gap-3 py-3"><span className="mt-1 rounded-xl bg-primary/10 p-2 text-primary">{i===0?<BookOpen size={16}/>:i===1?<Activity size={16}/>:<Users size={16}/>}</span><div className="flex-1 min-w-0"><p className="font-semibold text-sm">{a[0]}</p><p className="text-xs text-text-secondary mt-1">{a[1]}</p></div><time className="text-[10px] sm:text-xs text-text-tertiary whitespace-nowrap">{a[2]}</time></div>)}
            </div>
          </section>
        </main>
      </div>
    </div>
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-primary/95 backdrop-blur-xl px-3 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2"><Link to="/" className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold text-text-secondary"><Home size={19}/><span>Website</span></Link><button onClick={()=>setFiltersOpen(true)} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl bg-primary/10 text-[10px] font-bold text-primary"><Filter size={19}/><span>Filters</span></button><button onClick={()=>window.print()} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold text-text-secondary"><Download size={19}/><span>Export</span></button></div>
    </div>
    {filtersOpen && <div className="fixed inset-0 z-50 lg:flex lg:items-center lg:justify-center" role="presentation">
      <button aria-label="Close filters" className="absolute inset-0 bg-black/50" onClick={()=>setFiltersOpen(false)}/>
      <section role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border border-border bg-bg-primary p-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] lg:relative lg:inset-auto lg:w-full lg:max-w-lg lg:rounded-3xl lg:p-6">
        <div className="flex items-center justify-between mb-5"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Refine data</p><h2 id="mobile-filter-title" className="text-xl font-bold mt-1">Advanced filters</h2></div><button onClick={()=>setFiltersOpen(false)} aria-label="Close filter panel" className="rounded-xl p-2 hover:bg-bg-tertiary"><X size={20}/></button></div>
        <label htmlFor="sheet-period" className="block text-sm font-bold mb-2">Date range</label><select id="sheet-period" value={period} onChange={e=>setPeriod(e.target.value)} className="w-full rounded-xl border border-border bg-bg-secondary p-3.5 text-base mb-4"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select>
        <label htmlFor="sheet-category" className="block text-sm font-bold mb-2">Resource category</label><select id="sheet-category" value={category} onChange={e=>setCategory(e.target.value)} className="w-full rounded-xl border border-border bg-bg-secondary p-3.5 text-base mb-4"><option>All categories</option><option>Study notes</option><option>Materia Medica</option><option>Clinical resources</option><option>Research</option></select>
        <label htmlFor="sheet-search" className="block text-sm font-bold mb-2">Search resources</label><input id="sheet-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Title or keyword" className="w-full rounded-xl border border-border bg-bg-secondary p-3.5 text-base mb-5"/>
        <div className="grid grid-cols-2 gap-3"><button onClick={()=>{setPeriod('Last 7 days');setCategory('All categories');setQuery('');setApplied(false)}} className="rounded-xl border border-border py-3.5 font-bold">Reset</button><button onClick={applyFilters} className="rounded-xl bg-primary py-3.5 font-bold text-white inline-flex items-center justify-center gap-2"><Check size={17}/> Apply filters</button></div>
      </section>
    </div>}
  </div>;
}
