import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowDownToLine, BookOpen, Brain, CalendarDays, Check, ClipboardList,
  Clock3, Flame, Lightbulb, ListTodo, NotebookPen, Plus, Shuffle, Target, Trash2
} from 'lucide-react';
import { useStudyToolkit } from '../context/StudyToolkitContext';

const subjectOptions = [
  'Anatomy', 'Physiology', 'Organon of Medicine', 'Materia Medica', 'Repertory',
  'Homoeopathic Pharmacy', 'Pathology', 'Forensic Medicine', 'Surgery',
  'Practice of Medicine', 'Gynaecology & Obstetrics'
];
const vivaPrompts = [
  'Explain the topic in two minutes, then give one example from the syllabus.',
  'Define the central concept, outline its classification, and state its academic significance.',
  'Compare two related concepts and identify the most important distinguishing features.',
  'Describe the underlying mechanism step by step, then summarize it without looking at notes.',
  'What are the key examination points, common misconceptions, and areas that need further reading?'
];
const topics = [
  'Brachial plexus and its clinical correlations', 'Cardiac cycle and regulation of blood pressure',
  'Renal counter-current mechanism', 'Aphorisms and the physician’s mission',
  'Materia Medica keynote comparison', 'Repertory structure and rubric hierarchy',
  'Preparation of homoeopathic dilutions', 'Inflammation, repair and cell injury',
  'Forensic identification and medico-legal documentation', 'Principles of clinical examination'
];
const todayKey = (now = new Date()) => {
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
};
const Panel = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-border bg-bg-secondary p-4 sm:p-5 space-y-4">
    <h3 className="flex items-center gap-2 text-sm font-black text-text-primary">{icon}{title}</h3>
    {children}
  </section>
);

export default function StudyToolkitDashboard() {
  const {
    state, ready, todayMinutes, weeklyMinutes, streak, addTask, toggleTask, deleteTask,
    saveNote, deleteNote, addCard, addReadingLog, saveReflection, setGoals, setExamDate,
    addSession, clearSessions
  } = useStudyToolkit();
  const [taskText, setTaskText] = useState('');
  const [taskSubject, setTaskSubject] = useState(subjectOptions[0]);
  const [taskFilter, setTaskFilter] = useState<'all' | 'open' | 'done'>('open');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [activeCard, setActiveCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [readingSubject, setReadingSubject] = useState(subjectOptions[0]);
  const [readingChapter, setReadingChapter] = useState('');
  const [readingPages, setReadingPages] = useState('');
  const [readingNotes, setReadingNotes] = useState('');
  const [learned, setLearned] = useState('');
  const [improve, setImprove] = useState('');
  const [randomTopic, setRandomTopic] = useState('');
  const [vivaPrompt, setVivaPrompt] = useState('');
  const [sessionFilter, setSessionFilter] = useState('all');

  const today = todayKey();
  const currentReflection = state.reflections.find(item => item.date === today);
  const visibleTasks = useMemo(() => state.tasks.filter(task =>
    taskFilter === 'all' || (taskFilter === 'done' ? task.done : !task.done)
  ), [state.tasks, taskFilter]);
  const filteredSessions = useMemo(() => sessionFilter === 'all'
    ? state.sessions.slice(0, 12)
    : state.sessions.filter(session => session.subject === sessionFilter || session.topic === sessionFilter).slice(0, 12),
  [state.sessions, sessionFilter]);
  const weekActivity = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = todayKey(date);
    return {
      date: key,
      label: date.toLocaleDateString(undefined, { weekday: 'short' }),
      minutes: state.sessions.filter(session => session.date === key).reduce((sum, session) => sum + session.minutes, 0)
    };
  }), [state.sessions]);
  const maxWeekMinutes = Math.max(1, ...weekActivity.map(day => day.minutes));
  const sessionSubjects = [...new Set(state.sessions.map(session => session.subject || session.topic))].filter(Boolean);
  const completedTasks = state.tasks.filter(task => task.done).length;
  const examDays = state.examDate
    ? Math.ceil((new Date(`${state.examDate}T23:59:59`).getTime() - Date.now()) / 86400000)
    : null;
  const card = state.cards.length ? state.cards[activeCard % state.cards.length] : null;
  const wordCount = noteContent.trim() ? noteContent.trim().split(/\\s+/).length : 0;

  const exportNotes = () => {
    const text = [
      'CURIVA STUDY NOTES',
      ...state.notes.map(note => `\n## ${note.title}\n${note.subject ? `Subject: ${note.subject}\n` : ''}${note.chapter ? `Chapter: ${note.chapter}\n` : ''}${note.content}`),
      '\nREADING LOG',
      ...state.readingLogs.map(log => `\n${log.date} • ${log.subject} • ${log.chapter} • Pages: ${log.pages || '-'}\n${log.notes || ''}`),
      '\nDAILY REFLECTIONS',
      ...state.reflections.map(item => `\n${item.date}\nLearned: ${item.learned}\nRevisit: ${item.improve}`)
    ].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'curiva-study-workspace.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const saveDailyNote = () => {
    if (!noteContent.trim()) return;
    saveNote({ title: noteTitle || 'Quick note', content: noteContent });
    setNoteTitle('');
    setNoteContent('');
  };
  const saveCustomCard = () => {
    if (!cardFront.trim() || !cardBack.trim()) return;
    addCard(cardFront, cardBack);
    setCardFront('');
    setCardBack('');
    setActiveCard(0);
  };
  const saveReading = () => {
    if (!readingChapter.trim()) return;
    addReadingLog({ subject: readingSubject, chapter: readingChapter, pages: readingPages, notes: readingNotes });
    setReadingChapter('');
    setReadingPages('');
    setReadingNotes('');
  };
  const saveTodayReflection = () => {
    saveReflection(learned, improve);
    setLearned('');
    setImprove('');
  };

  if (!ready) return <div className="rounded-2xl border border-border bg-bg-secondary p-8 text-center text-sm text-text-secondary">Loading your study workspace…</div>;

  return (
    <div className="space-y-6 text-text-primary">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 p-5 sm:p-7 text-white shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-emerald-200">Curiva • Learning workspace</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">Your study dashboard</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100">One checklist, note space, revision log, and focus record across the study areas of Curiva.</p>
          </div>
          <Link to="/study-toolkit" className="rounded-xl border border-white/25 px-4 py-2 text-xs font-bold hover:bg-white/10">Explore all 20 tools</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-white/10 p-3"><Clock3 size={16}/><p className="mt-2 text-xs text-emerald-100">Today</p><p className="text-2xl font-black">{todayMinutes}<span className="ml-1 text-xs font-semibold">min</span></p></div>
          <div className="rounded-xl bg-white/10 p-3"><Target size={16}/><p className="mt-2 text-xs text-emerald-100">Daily target</p><p className="text-2xl font-black">{Math.min(100, Math.round(todayMinutes / Math.max(1, state.dailyGoal) * 100))}%</p></div>
          <div className="rounded-xl bg-white/10 p-3"><Flame size={16}/><p className="mt-2 text-xs text-emerald-100">Study streak</p><p className="text-2xl font-black">{streak}<span className="ml-1 text-xs font-semibold">days</span></p></div>
          <div className="rounded-xl bg-white/10 p-3"><ListTodo size={16}/><p className="mt-2 text-xs text-emerald-100">Tasks complete</p><p className="text-2xl font-black">{completedTasks}<span className="text-sm font-semibold">/{state.tasks.length}</span></p></div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Daily and weekly targets" icon={<Target size={18} className="text-emerald-600"/>}>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold">Daily minutes<input type="number" min="5" max="720" value={state.dailyGoal} onChange={e => setGoals(Number(e.target.value) || 5, state.weeklyGoal)} className="mt-1 w-full rounded-xl border border-border bg-bg-primary p-2.5 text-sm"/></label>
            <label className="text-xs font-bold">Weekly minutes<input type="number" min="30" max="5000" value={state.weeklyGoal} onChange={e => setGoals(state.dailyGoal, Number(e.target.value) || 30)} className="mt-1 w-full rounded-xl border border-border bg-bg-primary p-2.5 text-sm"/></label>
          </div>
          <div><div className="flex justify-between text-xs"><span>Today</span><strong>{todayMinutes}/{state.dailyGoal} min</strong></div><div className="mt-2 h-2.5 rounded-full bg-bg-primary overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(100, todayMinutes / state.dailyGoal * 100)}%` }}/></div></div>
          <div><div className="flex justify-between text-xs"><span>Last seven days</span><strong>{weeklyMinutes}/{state.weeklyGoal} min</strong></div><div className="mt-2 h-2.5 rounded-full bg-bg-primary overflow-hidden"><div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(100, weeklyMinutes / state.weeklyGoal * 100)}%` }}/></div></div>
        </Panel>

        <Panel title="Exam countdown" icon={<CalendarDays size={18} className="text-amber-600"/>}>
          <label className="block text-xs font-bold">Next exam date<input type="date" value={state.examDate} onChange={e => setExamDate(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/></label>
          <div className="rounded-xl bg-bg-primary p-4">
            {!state.examDate ? <p className="text-sm text-text-secondary">Set a date to start your countdown.</p>
              : examDays! < 0 ? <p className="text-sm font-semibold">That exam date has passed. Update the date for your next examination.</p>
              : <><p className="text-3xl font-black text-amber-700">{examDays}</p><p className="text-xs font-bold text-text-secondary">{examDays === 0 ? 'Exam day is today' : 'days until your exam'}</p></>}
          </div>
          <p className="text-[11px] text-text-tertiary">The countdown is a planning aid; check your official university timetable.</p>
        </Panel>

        <Panel title="Study checklist and revision filters" icon={<ClipboardList size={18} className="text-blue-600"/>}>
          <form onSubmit={e => { e.preventDefault(); addTask(taskText, taskSubject); setTaskText(''); }} className="grid gap-2 sm:grid-cols-[1fr_9rem_auto]">
            <input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Add a chapter or revision task…" maxLength={180} className="min-w-0 rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
            <select value={taskSubject} onChange={e => setTaskSubject(e.target.value)} className="rounded-xl border border-border bg-bg-primary p-3 text-xs">{subjectOptions.map(s => <option key={s}>{s}</option>)}</select>
            <button className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white"><Plus size={15}/></button>
          </form>
          <div className="flex flex-wrap gap-2">{(['all','open','done'] as const).map(filter => <button key={filter} onClick={() => setTaskFilter(filter)} className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize ${taskFilter === filter ? 'bg-primary text-white' : 'bg-bg-primary text-text-secondary'}`}>{filter}</button>)}</div>
          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {visibleTasks.length ? visibleTasks.map(task => <li key={task.id} className="flex items-center gap-2 rounded-xl bg-bg-primary p-2.5">
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} aria-label={`Mark ${task.title} complete`}/>
              <span className={`min-w-0 flex-1 text-xs ${task.done ? 'line-through text-text-tertiary' : ''}`}>{task.title}<small className="ml-1 block text-[10px] text-text-tertiary">{task.subject || 'General'} • {task.date}</small></span>
              <button type="button" onClick={() => deleteTask(task.id)} aria-label="Delete task" className="rounded-lg p-1 text-text-tertiary hover:text-red-600"><Trash2 size={15}/></button>
            </li>) : <li className="text-xs text-text-tertiary">No tasks match this filter.</li>}
          </ul>
        </Panel>

        <Panel title="Random topic and viva practice" icon={<Lightbulb size={18} className="text-amber-600"/>}>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setRandomTopic(topics[Math.floor(Math.random() * topics.length)])} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary"><Shuffle size={15}/> Random topic</button>
            <button type="button" onClick={() => setVivaPrompt(vivaPrompts[Math.floor(Math.random() * vivaPrompts.length)])} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border p-3 text-xs font-bold hover:border-primary"><Brain size={15}/> Viva prompt</button>
          </div>
          {randomTopic && <p className="rounded-xl bg-bg-primary p-3 text-sm font-bold">{randomTopic}</p>}
          {vivaPrompt && <p className="rounded-xl bg-bg-primary p-3 text-sm">{vivaPrompt}</p>}
          <p className="text-[11px] text-text-tertiary">Prompts support oral-exam practice. Verify content against your syllabus and standard textbooks.</p>
          <div className="flex flex-wrap gap-2"><Link to="/quizzes" className="text-xs font-bold text-primary underline">Practice quizzes</Link><Link to="/subjects" className="text-xs font-bold text-primary underline">Subject centres</Link></div>
        </Panel>

        <Panel title="Quick notes and word counter" icon={<NotebookPen size={18} className="text-violet-600"/>}>
          <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)} placeholder="Note title" maxLength={160} className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)} rows={4} maxLength={4000} placeholder="Write a concise summary or concept to revisit…" className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <div className="flex items-center justify-between text-[11px] text-text-tertiary"><span>{wordCount} words</span><span>{noteContent.length}/4000 characters</span></div>
          <button type="button" onClick={saveDailyNote} disabled={!noteContent.trim()} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Save note</button>
          <div className="max-h-40 space-y-2 overflow-y-auto">
            {state.notes.slice(0, 5).map(note => <div key={note.id} className="flex items-start gap-2 rounded-xl bg-bg-primary p-2.5"><div className="min-w-0 flex-1"><strong className="block text-xs">{note.title}</strong><p className="line-clamp-2 text-[11px] text-text-secondary">{note.content}</p></div><button type="button" onClick={() => deleteNote(note.id)} aria-label={`Delete ${note.title}`} className="text-text-tertiary hover:text-red-600"><Trash2 size={14}/></button></div>)}
          </div>
        </Panel>

        <Panel title="Custom flashcard maker and review" icon={<Brain size={18} className="text-pink-600"/>}>
          <input value={cardFront} onChange={e => setCardFront(e.target.value)} maxLength={500} placeholder="Question / front" className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <textarea value={cardBack} onChange={e => setCardBack(e.target.value)} maxLength={2000} rows={2} placeholder="Answer / back" className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <button type="button" onClick={saveCustomCard} disabled={!cardFront.trim() || !cardBack.trim()} className="rounded-xl bg-pink-700 px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Add custom card</button>
          {card && <div className="rounded-xl border border-border bg-bg-primary p-3">
            <p className="text-[10px] text-text-tertiary">Custom card {activeCard + 1} of {state.cards.length}</p>
            <button type="button" onClick={() => setShowAnswer(value => !value)} className="mt-2 min-h-20 w-full text-left text-sm font-semibold">{showAnswer ? card.back : card.front}<small className="mt-2 block text-[10px] font-normal text-text-tertiary">Tap to {showAnswer ? 'see question' : 'reveal answer'}</small></button>
            <div className="mt-2 flex gap-2"><button type="button" onClick={() => { setActiveCard(value => (value - 1 + state.cards.length) % state.cards.length); setShowAnswer(false); }} className="rounded-lg border border-border px-3 py-1.5 text-xs">Previous</button><button type="button" onClick={() => { setActiveCard(value => (value + 1) % state.cards.length); setShowAnswer(false); }} className="rounded-lg border border-border px-3 py-1.5 text-xs">Next</button></div>
          </div>}
          <Link to="/flashcards" className="text-xs font-bold text-primary underline">Open full flashcard library</Link>
        </Panel>

        <Panel title="Reading log" icon={<BookOpen size={18} className="text-teal-600"/>}>
          <div className="grid grid-cols-2 gap-2">
            <select value={readingSubject} onChange={e => setReadingSubject(e.target.value)} className="rounded-xl border border-border bg-bg-primary p-2.5 text-xs">{subjectOptions.map(s => <option key={s}>{s}</option>)}</select>
            <input value={readingPages} onChange={e => setReadingPages(e.target.value)} placeholder="Pages / section" maxLength={80} className="rounded-xl border border-border bg-bg-primary p-2.5 text-xs"/>
          </div>
          <input value={readingChapter} onChange={e => setReadingChapter(e.target.value)} placeholder="Chapter / topic read" maxLength={180} className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <textarea value={readingNotes} onChange={e => setReadingNotes(e.target.value)} rows={2} maxLength={1000} placeholder="Reading notes (optional)" className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <button type="button" onClick={saveReading} disabled={!readingChapter.trim()} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Add to reading log</button>
          <div className="max-h-36 space-y-2 overflow-y-auto">
            {state.readingLogs.slice(0, 6).map(log => <div key={log.id} className="rounded-xl bg-bg-primary p-2.5 text-xs"><strong>{log.chapter}</strong><p className="text-[10px] text-text-tertiary">{log.subject} • {log.date} {log.pages && `• ${log.pages}`}</p></div>)}
          </div>
        </Panel>

        <Panel title="Daily reflection" icon={<Activity size={18} className="text-indigo-600"/>}>
          {currentReflection && <div className="rounded-xl bg-bg-primary p-3 text-xs"><strong>Saved today</strong><p className="mt-1">Learned: {currentReflection.learned || '—'}</p><p className="mt-1">Revisit: {currentReflection.improve || '—'}</p></div>}
          <textarea value={learned} onChange={e => setLearned(e.target.value)} rows={2} maxLength={2000} placeholder="What did you understand today?" className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <textarea value={improve} onChange={e => setImprove(e.target.value)} rows={2} maxLength={2000} placeholder="What needs another revision?" className="w-full rounded-xl border border-border bg-bg-primary p-3 text-sm"/>
          <button type="button" onClick={saveTodayReflection} disabled={!learned.trim() && !improve.trim()} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Save reflection</button>
        </Panel>

        <Panel title="Session history and progress" icon={<Activity size={18} className="text-emerald-600"/>}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-text-secondary">{state.sessions.length} recorded sessions • {weeklyMinutes} min this week</span>
            <button type="button" onClick={clearSessions} className="text-[10px] font-bold text-red-600">Clear history</button>
          </div>
          <div className="grid grid-cols-7 gap-2 rounded-xl bg-bg-primary p-3">
            {weekActivity.map(day => <div key={day.date} className="flex min-w-0 flex-col items-center gap-1.5">
              <div className="flex h-16 w-full items-end justify-center rounded-md bg-bg-secondary"><div className="w-3/4 rounded-t-md bg-emerald-500" style={{ height: `${day.minutes ? Math.max(8, day.minutes / maxWeekMinutes * 100) : 2}%` }} title={`${day.minutes} minutes`}/></div>
              <span className="text-[9px] text-text-tertiary">{day.label}</span>
            </div>)}
          </div>
          <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} className="w-full rounded-xl border border-border bg-bg-primary p-2 text-xs"><option value="all">All study sessions</option>{sessionSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}</select>
          {filteredSessions.length ? <ul className="space-y-2">{filteredSessions.map(session => <li key={session.id} className="flex items-center justify-between rounded-xl bg-bg-primary p-3 text-xs"><span>{session.topic}<small className="ml-2 text-text-tertiary">{session.date}</small></span><strong>{session.minutes} min</strong></li>)}</ul> : <p className="text-xs text-text-tertiary">Finish a focus timer or log a study session to see it here.</p>}
          <button type="button" onClick={() => addSession(25, 'Manual study entry')} className="rounded-xl border border-border px-3 py-2 text-xs font-bold">Log 25-minute study block</button>
        </Panel>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-bg-secondary p-4">
        <p className="text-xs text-text-secondary">Your study workspace is private to your account when signed in, and separately stored on this device for guests. Do not save patient-identifiable information here.</p>
        <button type="button" onClick={exportNotes} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-bold"><ArrowDownToLine size={15}/> Export notes</button>
      </div>
    </div>
  );
}
