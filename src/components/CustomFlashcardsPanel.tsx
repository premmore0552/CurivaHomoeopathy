import React, { useMemo, useState } from 'react';
import { Brain, ChevronLeft, ChevronRight, Plus, RotateCw, Search, Shuffle } from 'lucide-react';
import { useStudyToolkit } from '../context/StudyToolkitContext';

const subjects = ['Anatomy', 'Physiology', 'Organon of Medicine', 'Materia Medica', 'Repertory', 'Homoeopathic Pharmacy', 'Pathology', 'Forensic Medicine', 'Surgery', 'Practice of Medicine', 'Gynaecology & Obstetrics'];

export default function CustomFlashcardsPanel() {
  const { state, addCard } = useStudyToolkit();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [subject, setSubject] = useState('All');
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showMaker, setShowMaker] = useState(true);

  const cards = useMemo(() => state.cards.filter(card => {
    const matchesSubject = subject === 'All' || card.subject === subject;
    const term = query.trim().toLocaleLowerCase();
    const matchesQuery = !term || card.front.toLocaleLowerCase().includes(term) || card.back.toLocaleLowerCase().includes(term);
    return matchesSubject && matchesQuery;
  }), [state.cards, subject, query]);
  const active = cards[index % Math.max(1, cards.length)];

  const save = () => {
    if (!front.trim() || !back.trim()) return;
    addCard(front, back, subject === 'All' ? undefined : subject);
    setFront('');
    setBack('');
    setIndex(0);
  };
  const shuffle = () => {
    const next = Math.floor(Math.random() * Math.max(1, cards.length));
    setIndex(next);
    setFlipped(false);
  };

  return (
    <section className="rounded-3xl border border-border bg-bg-secondary p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary"><Brain size={15}/> My active recall deck</div><h2 className="mt-1 text-lg font-black text-text-primary">Create and revise your own flashcards</h2></div>
        <button type="button" onClick={() => setShowMaker(value => !value)} className="rounded-lg border border-border px-3 py-2 text-xs font-bold">{showMaker ? 'Hide maker' : 'Create cards'}</button>
      </div>
      {showMaker && <div className="grid gap-2 md:grid-cols-[1fr_1fr_12rem_auto]">
        <input value={front} onChange={e => setFront(e.target.value)} placeholder="Question / front" maxLength={500} className="min-w-0 rounded-xl border border-border bg-bg-primary p-3 text-xs"/>
        <input value={back} onChange={e => setBack(e.target.value)} placeholder="Answer / back" maxLength={2000} className="min-w-0 rounded-xl border border-border bg-bg-primary p-3 text-xs"/>
        <select value={subject} onChange={e => setSubject(e.target.value)} className="rounded-xl border border-border bg-bg-primary p-3 text-xs"><option>All</option>{subjects.map(item => <option key={item}>{item}</option>)}</select>
        <button type="button" onClick={save} disabled={!front.trim() || !back.trim()} className="inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-40"><Plus size={14}/> Add card</button>
      </div>}
      <div className="grid gap-3 sm:grid-cols-[1fr_13rem]">
        <label className="relative block"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"/><input value={query} onChange={e => { setQuery(e.target.value); setIndex(0); setFlipped(false); }} placeholder="Search your custom deck…" className="w-full rounded-xl border border-border bg-bg-primary py-2.5 pl-9 pr-3 text-xs"/></label>
        <select value={subject} onChange={e => { setSubject(e.target.value); setIndex(0); setFlipped(false); }} className="rounded-xl border border-border bg-bg-primary p-2.5 text-xs"><option>All</option>{subjects.map(item => <option key={item}>{item}</option>)}</select>
      </div>
      {active ? <div className="rounded-2xl border border-border bg-bg-primary p-4 sm:p-6">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-tertiary"><span>{active.subject || 'General study'} {active.chapter ? `• ${active.chapter}` : ''}</span><span>{index + 1} / {cards.length}</span></div>
        <button type="button" onClick={() => setFlipped(value => !value)} className="mt-3 flex min-h-36 w-full flex-col items-center justify-center rounded-xl bg-bg-secondary p-5 text-center" aria-label="Flip custom flashcard">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{flipped ? 'Answer' : 'Question'}</span>
          <span className="mt-3 whitespace-pre-wrap text-base font-semibold text-text-primary">{flipped ? active.back : active.front}</span>
          <span className="mt-4 inline-flex items-center gap-1 text-[10px] text-text-tertiary"><RotateCw size={12}/> Tap to flip</span>
        </button>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button type="button" onClick={() => { setIndex(value => (value - 1 + cards.length) % cards.length); setFlipped(false); }} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-bold"><ChevronLeft size={14}/> Previous</button>
          <button type="button" onClick={shuffle} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-bold"><Shuffle size={14}/> Shuffle</button>
          <button type="button" onClick={() => { setIndex(value => (value + 1) % cards.length); setFlipped(false); }} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-bold">Next <ChevronRight size={14}/></button>
        </div>
      </div> : <p className="rounded-xl bg-bg-primary p-5 text-center text-xs text-text-tertiary">No custom flashcards match this filter. Add one above or clear the search.</p>}
      <p className="text-[10px] text-text-tertiary">{state.cards.length} custom cards saved in your current study workspace. Guest and account decks remain separate.</p>
    </section>
  );
}
