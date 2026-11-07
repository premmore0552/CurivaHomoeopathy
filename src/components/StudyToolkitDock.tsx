import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Check, Clock3, FileText, Pause, Play, RotateCcw, Target, X, Zap } from 'lucide-react';
import { useStudyToolkit } from '../context/StudyToolkitContext';

function formatTime(seconds: number) {
  const value = Math.max(0, seconds);
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}

export default function StudyToolkitDock() {
  const { state, signedIn, syncStatus, startTimer, pauseTimer, resetTimer, saveNote, setFocusMode } = useStudyToolkit();
  const [open, setOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [topic, setTopic] = useState(state.timer.topic);
  const timer = state.timer;
  const syncLabel = 'Private to this browser tab · not uploaded';
  const remaining = timer.running && timer.deadlineAt
    ? Math.max(0, Math.ceil((timer.deadlineAt - Date.now()) / 1000))
    : timer.remainingSeconds;

  const saveQuickNote = () => {
    if (!noteContent.trim()) return;
    saveNote({ title: noteTitle.trim() || 'Quick note', content: noteContent });
    setNoteTitle('');
    setNoteContent('');
    setNoteOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-24 right-3 sm:bottom-6 sm:right-6 z-[80] print:hidden">
        {open && (
          <div className="mb-3 w-[min(19rem,calc(100vw-1.5rem))] rounded-2xl border border-border bg-bg-secondary p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Curiva Study Controls</p>
                <p className="text-xs text-text-secondary">Quick notes and study logs stay in this browser tab and clear when it closes.</p>
                <p className="mt-1 text-[10px] font-semibold text-text-tertiary" role="status" aria-live="polite">{syncLabel}</p>
                <p className="text-[10px] leading-relaxed text-amber-700 dark:text-amber-300">Academic material only. Never enter patient names, identifiable case notes, reports, or health records.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-bg-primary" aria-label="Close study controls"><X size={16}/></button>
            </div>

            <div className="rounded-xl bg-bg-primary border border-border p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">{timer.mode === 'focus' ? 'Focus session' : 'Short break'}</span>
                <span className="font-mono text-2xl font-black tabular-nums" aria-live="off">{formatTime(remaining)}</span>
              </div>
              <label className="mt-2 block text-[11px] font-semibold text-text-secondary">
                Study topic
                <input value={topic} onChange={event => setTopic(event.target.value)} maxLength={180} className="mt-1 w-full rounded-lg border border-border bg-bg-secondary px-2.5 py-2 text-xs text-text-primary"/>
              </label>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => timer.running ? pauseTimer() : startTimer(topic)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white">
                  {timer.running ? <Pause size={14}/> : <Play size={14}/>} {timer.running ? 'Pause' : 'Start'}
                </button>
                <button type="button" onClick={() => resetTimer('focus')} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-text-secondary" aria-label="Reset focus timer"><RotateCcw size={14}/></button>
                <button type="button" onClick={() => resetTimer('break', 5)} className="rounded-lg border border-border px-3 py-2 text-xs font-bold text-text-secondary">Break</button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-text-tertiary">Duration</span>
                {[15, 25, 45, 60].map(minutes => <button key={minutes} type="button" onClick={() => resetTimer('focus', minutes)} className={`rounded-md px-2 py-1 text-[10px] font-bold ${timer.durationMinutes === minutes && timer.mode === 'focus' ? 'bg-primary/10 text-primary' : 'bg-bg-secondary text-text-tertiary'}`}>{minutes}m</button>)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setNoteOpen(true); setOpen(false); }} className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary/40"><FileText size={15} className="text-primary"/> Quick notes</button>
              <button type="button" onClick={() => { setFocusMode(true); setOpen(false); }} className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary/40"><Zap size={15} className="text-primary"/> Focus mode</button>
              <Link to="/subjects" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary/40"><BookOpen size={15} className="text-primary"/> Subjects</Link>
              <Link to="/flashcards" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary/40"><Brain size={15} className="text-primary"/> Flashcards</Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="col-span-2 flex items-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary/40"><Target size={15} className="text-primary"/> Dashboard &amp; study planner</Link>
            </div>
          </div>
        )}
        <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label="Open Curiva study controls" className="ml-auto flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-black text-white shadow-xl shadow-primary/20 hover:brightness-110">
          <Clock3 size={17}/> {formatTime(remaining)} <span className="text-[10px] uppercase tracking-wide">{timer.running ? 'Live' : 'Study'}</span>
        </button>
      </div>

      {noteOpen && (
        <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center bg-black/50 p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="study-quick-note-title">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-bg-secondary p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 id="study-quick-note-title" className="text-lg font-black text-text-primary">Quick study note</h2>
              <button type="button" onClick={() => setNoteOpen(false)} aria-label="Close quick note" className="rounded-lg p-2 hover:bg-bg-primary"><X size={17}/></button>
            </div>
            <input value={noteTitle} onChange={event => setNoteTitle(event.target.value)} placeholder="Note title" maxLength={160} className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
            <textarea value={noteContent} onChange={event => setNoteContent(event.target.value)} placeholder="Capture a concept, definition, or reminder…" rows={7} maxLength={4000} className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <span>{noteContent.trim() ? noteContent.trim().split(/\\s+/).length : 0} words</span>
              <span>{noteContent.length}/4000</span>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setNoteOpen(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-bold">Cancel</button>
              <button type="button" disabled={!noteContent.trim()} onClick={saveQuickNote} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-40"><Check size={15}/> Save note</button>
            </div>
          </div>
        </div>
      )}

      {state.focusMode && (
        <div className="fixed inset-0 z-[110] flex min-h-[100dvh] flex-col items-center justify-center bg-slate-950 px-5 py-10 text-white">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[.25em] text-teal-300">Curiva • Focus mode</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black">One task at a time.</h2>
            <p className="mt-3 text-sm text-slate-300">Stay with your current topic. Your timer keeps running while you navigate.</p>
          </div>
          <div className="font-mono text-6xl sm:text-8xl font-black tabular-nums" aria-live="off">{formatTime(remaining)}</div>
          <p className="mt-4 max-w-lg text-center text-sm text-slate-300">{timer.topic}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => timer.running ? pauseTimer() : startTimer()} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950">{timer.running ? <Pause size={17}/> : <Play size={17}/>} {timer.running ? 'Pause timer' : 'Resume timer'}</button>
            <button type="button" onClick={() => setFocusMode(false)} className="rounded-xl border border-white/30 px-5 py-3 font-bold text-white">Exit focus mode</button>
          </div>
          <p className="mt-10 text-xs text-slate-400">This study workspace is held only in this browser tab. Never enter identifiable patient information.</p>
        </div>
      )}
    </>
  );
}
