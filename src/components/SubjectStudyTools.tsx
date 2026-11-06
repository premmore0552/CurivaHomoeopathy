import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Brain, CheckCircle2, ListTodo, NotebookPen, Plus, Shuffle, Sparkles } from 'lucide-react';
import { useStudyToolkit } from '../context/StudyToolkitContext';

export default function SubjectStudyTools({ subject, chapters }: { subject: string; chapters: string[] }) {
  const { state, addTask, toggleTask, saveNote, addCard, addReadingLog } = useStudyToolkit();
  const [chapter, setChapter] = useState(chapters[0] || '');
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('open');
  const [note, setNote] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [pages, setPages] = useState('');
  const [readingNote, setReadingNote] = useState('');
  const [randomTopic, setRandomTopic] = useState('');
  const [viva, setViva] = useState('');

  const tasks = useMemo(() => state.tasks.filter(task => task.subject === subject), [state.tasks, subject]);
  const visibleTasks = tasks.filter(task => filter === 'all' || (filter === 'done' ? task.done : !task.done));
  const notes = state.notes.filter(item => item.subject === subject);
  const cards = state.cards.filter(item => item.subject === subject);
  const readings = state.readingLogs.filter(item => item.subject === subject);
  const addChapterTask = () => {
    if (!chapter) return;
    if (tasks.some(task => task.chapter === chapter && !task.done)) return;
    addTask(`Revise: ${chapter}`, subject, chapter);
  };
  const saveSubjectNote = () => {
    if (!note.trim()) return;
    saveNote({ title: noteTitle.trim() || chapter || `${subject} note`, content: note, subject, chapter });
    setNote('');
    setNoteTitle('');
  };
  const saveSubjectCard = () => {
    if (!front.trim() || !back.trim()) return;
    addCard(front, back, subject, chapter);
    setFront('');
    setBack('');
  };
  const saveReading = () => {
    if (!chapter) return;
    addReadingLog({ subject, chapter, pages, notes: readingNote });
    setPages('');
    setReadingNote('');
  };

  return (
    <section className="space-y-4 rounded-2xl border border-primary/20 bg-primary/[0.03] p-4 sm:p-5" aria-label={`${subject} study toolkit`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary"><Sparkles size={15}/> Curiva Study Toolkit</div>
          <h4 className="mt-1 text-base font-black text-text-primary">Study this subject actively</h4>
          <p className="text-[11px] text-text-secondary">Tasks, notes, reading logs and flashcards are linked to {subject}.</p>
        </div>
        <Link to="/study-toolkit" className="text-xs font-bold text-primary underline">All 20 tools</Link>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-secondary p-3 space-y-3">
          <h5 className="flex items-center gap-2 text-xs font-black"><ListTodo size={15}/> Chapter checklist &amp; revision filters</h5>
          <div className="flex gap-2">
            {chapters.length > 0 ? (
              <select value={chapter} onChange={e => setChapter(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-border bg-bg-primary p-2 text-xs">
                {chapters.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            ) : (
              <input value={chapter} onChange={e => setChapter(e.target.value)} placeholder="Enter a chapter or topic" className="min-w-0 flex-1 rounded-lg border border-border bg-bg-primary p-2 text-xs"/>
            )}
            <button type="button" onClick={addChapterTask} disabled={!chapter || tasks.some(task => task.chapter === chapter && !task.done)} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white disabled:opacity-40"><Plus size={14}/> Add</button>
          </div>
          <div className="flex gap-1.5">{(['all','open','done'] as const).map(value => <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-md px-2.5 py-1 text-[10px] font-bold capitalize ${filter === value ? 'bg-primary text-white' : 'bg-bg-primary text-text-secondary'}`}>{value}</button>)}</div>
          {visibleTasks.length ? <ul className="max-h-36 space-y-1.5 overflow-y-auto">{visibleTasks.map(task => <li key={task.id} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} aria-label={`Mark ${task.title} complete`}/><span className={task.done ? 'line-through text-text-tertiary' : ''}>{task.title}</span></li>)}</ul> : <p className="text-[11px] text-text-tertiary">No tasks in this filter.</p>}
          <p className="text-[10px] text-text-tertiary">{tasks.filter(task => task.done).length}/{tasks.length} {subject} tasks completed.</p>
        </div>

        <div className="rounded-xl border border-border bg-bg-secondary p-3 space-y-3">
          <h5 className="flex items-center gap-2 text-xs font-black"><Shuffle size={15}/> Random topic &amp; viva practice</h5>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setRandomTopic(chapters[Math.floor(Math.random() * Math.max(1, chapters.length))] || subject)} className="rounded-lg border border-border px-3 py-2 text-xs font-bold">Pick a chapter</button>
            <button type="button" onClick={() => setViva(`Explain “${chapter || subject}” clearly in two minutes. Define the key terms, outline its classification or mechanism, and add one relevant example.`)} className="rounded-lg border border-border px-3 py-2 text-xs font-bold">Generate viva prompt</button>
          </div>
          {randomTopic && <p className="rounded-lg bg-bg-primary p-2.5 text-xs font-bold">{randomTopic}</p>}
          {viva && <p className="rounded-lg bg-bg-primary p-2.5 text-xs">{viva}</p>}
          <p className="text-[10px] text-text-tertiary">Practice prompts only; use the applicable syllabus and textbooks to verify your answers.</p>
        </div>

        <div className="rounded-xl border border-border bg-bg-secondary p-3 space-y-2">
          <h5 className="flex items-center gap-2 text-xs font-black"><NotebookPen size={15}/> Chapter quick notes</h5>
          <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)} placeholder="Note heading" maxLength={160} className="w-full rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} maxLength={12000} placeholder={`Write your ${subject} revision note…`} className="w-full rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>
          <div className="flex items-center justify-between"><span className="text-[10px] text-text-tertiary">{note.trim() ? note.trim().split(/\\s+/).length : 0} words</span><button type="button" onClick={saveSubjectNote} disabled={!note.trim()} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Save note</button></div>
          {notes.slice(0,3).map(item => <div key={item.id} className="rounded-lg bg-bg-primary p-2 text-[11px]"><strong>{item.title}</strong><p className="mt-0.5 line-clamp-2 text-text-secondary">{item.content}</p></div>)}
        </div>

        <div className="rounded-xl border border-border bg-bg-secondary p-3 space-y-2">
          <h5 className="flex items-center gap-2 text-xs font-black"><Brain size={15}/> Subject flashcard maker</h5>
          <input value={front} onChange={e => setFront(e.target.value)} placeholder="Question / front" maxLength={500} className="w-full rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>
          <textarea value={back} onChange={e => setBack(e.target.value)} rows={2} maxLength={2000} placeholder="Answer / back" className="w-full rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>
          <button type="button" onClick={saveSubjectCard} disabled={!front.trim() || !back.trim()} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Save flashcard</button>
          <p className="text-[10px] text-text-tertiary">{cards.length} custom cards for this subject. <Link to="/flashcards" className="font-bold text-primary underline">Review your deck</Link></p>
        </div>

        <div className="rounded-xl border border-border bg-bg-secondary p-3 space-y-2 lg:col-span-2">
          <h5 className="flex items-center gap-2 text-xs font-black"><BookMarked size={15}/> Reading log</h5>
          <div className="grid gap-2 sm:grid-cols-[1fr_10rem]">
            {chapters.length > 0
              ? <select value={chapter} onChange={e => setChapter(e.target.value)} className="rounded-lg border border-border bg-bg-primary p-2.5 text-xs">{chapters.map(item => <option key={item}>{item}</option>)}</select>
              : <input value={chapter} onChange={e => setChapter(e.target.value)} placeholder="Chapter / topic read" className="rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>}
            <input value={pages} onChange={e => setPages(e.target.value)} placeholder="Pages / section" maxLength={80} className="rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>
          </div>
          <textarea value={readingNote} onChange={e => setReadingNote(e.target.value)} rows={2} placeholder="Reading notes (optional)" maxLength={1000} className="w-full rounded-lg border border-border bg-bg-primary p-2.5 text-xs"/>
          <button type="button" onClick={saveReading} disabled={!chapter.trim()} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Log reading</button>
          {readings.slice(0,4).map(log => <div key={log.id} className="text-[10px] text-text-tertiary">{log.date} • {log.chapter} {log.pages && `• ${log.pages}`}</div>)}
        </div>
      </div>
    </section>
  );
}
