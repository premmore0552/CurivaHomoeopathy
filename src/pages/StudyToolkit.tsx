import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowDownToLine, Brain, CalendarDays, ClipboardList, Clock3,
  Lightbulb, ListTodo, NotebookPen, Plus, Save, Shuffle, Sparkles, Target, Trash2
} from 'lucide-react';
import SEO from '../components/SEO';

type Task = { id: string; title: string; done: boolean; date: string };
type Card = { id: string; front: string; back: string };
type Session = { date: string; minutes: number; topic: string };

const read = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
};
const todayKey = () => new Date().toISOString().slice(0, 10);
const subjects = ['Anatomy', 'Physiology', 'Organon of Medicine', 'Materia Medica', 'Repertory', 'Homoeopathic Pharmacy', 'Pathology', 'Forensic Medicine', 'Surgery', 'Practice of Medicine', 'Gynaecology & Obstetrics'];
const vivaPrompts = [
  'Explain the key principles of case taking and why a complete history matters.',
  'Compare two remedies using their distinguishing modalities and keynote symptoms.',
  'Outline the major anatomical relations of a structure you studied today.',
  'Explain a physiological feedback loop with one clear example.',
  'Describe the purpose and limitations of repertorisation in study cases.',
  'Summarise the important safety red flags and referral decisions for a clinical scenario.',
  'Explain one Organon aphorism in your own words and give a study example.',
  'Create a differential comparison between two conditions from your syllabus.'
];
const quickTopics = ['Anatomical planes', 'Cardiac cycle', 'Hahnemann and the Organon', 'Thermal modalities', 'Repertory rubrics', 'Drug proving', 'Inflammation and repair', 'Forensic identification', 'Pharmacognosy basics', 'Clinical examination'];

function CardPanel({ title, icon, children, className = '' }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 md:p-6 shadow-sm ${className}`}>
    <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">{icon}{title}</h2>{children}
  </section>;
}

export default function StudyToolkit() {
  const [tasks, setTasks] = useState<Task[]>(() => read('curiva-toolkit-tasks', []));
  const [notes, setNotes] = useState(() => read('curiva-toolkit-notes', ''));
  const [cards, setCards] = useState<Card[]>(() => read('curiva-toolkit-cards', []));
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [taskText, setTaskText] = useState('');
  const [topic, setTopic] = useState(subjects[0]);
  const [examDate, setExamDate] = useState(() => read('curiva-toolkit-exam-date', ''));
  const [dailyGoal, setDailyGoal] = useState(() => read('curiva-toolkit-goal', 60));
  const [minutesToday, setMinutesToday] = useState(() => read('curiva-toolkit-minutes', { date: todayKey(), minutes: 0 }).date === todayKey() ? read<{date:string;minutes:number}>('curiva-toolkit-minutes', {date:todayKey(),minutes:0}).minutes : 0);
  const [sessions, setSessions] = useState<Session[]>(() => read('curiva-toolkit-sessions', []));
  const [timerLength, setTimerLength] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [activeCard, setActiveCard] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [randomTopic, setRandomTopic] = useState('');
  const [vivaPrompt, setVivaPrompt] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all');
  const [focusMode, setFocusMode] = useState(false);
  const [weeklyTarget, setWeeklyTarget] = useState(() => read('curiva-toolkit-weekly-target', 300));
  const [readingLog, setReadingLog] = useState(() => read('curiva-toolkit-reading-log', ''));
  const [reflection, setReflection] = useState(() => read('curiva-toolkit-reflection', ''));
  const [streak, setStreak] = useState(() => read('curiva-toolkit-streak', { date: '', count: 0 }));

  useEffect(() => { localStorage.setItem('curiva-toolkit-tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-notes', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-cards', JSON.stringify(cards)); }, [cards]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-exam-date', JSON.stringify(examDate)); }, [examDate]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-goal', JSON.stringify(dailyGoal)); }, [dailyGoal]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-minutes', JSON.stringify({ date: todayKey(), minutes: minutesToday })); }, [minutesToday]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-sessions', JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-weekly-target', JSON.stringify(weeklyTarget)); }, [weeklyTarget]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-reading-log', JSON.stringify(readingLog)); }, [readingLog]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-reflection', JSON.stringify(reflection)); }, [reflection]);
  useEffect(() => { localStorage.setItem('curiva-toolkit-streak', JSON.stringify(streak)); }, [streak]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => setSecondsLeft(value => {
      if (value <= 1) {
        setTimerRunning(false);
        if (timerMode === 'focus') {
          setMinutesToday(m => m + timerLength);
          setSessions(old => [{ date: todayKey(), minutes: timerLength, topic }, ...old].slice(0, 50));
          setStreak(old => {
            const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
            return { date: todayKey(), count: old.date === todayKey() ? old.count : old.date === yesterday ? old.count + 1 : 1 };
          });
        }
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, timerMode, timerLength, topic]);

  const completed = tasks.filter(t => t.done).length;
  const visibleTasks = tasks.filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done));
  const examDays = examDate ? Math.ceil((new Date(examDate + 'T23:59:59').getTime() - Date.now()) / 86400000) : null;
  const weeklyMinutes = sessions.filter(s => Date.now() - new Date(s.date + 'T00:00:00').getTime() < 7 * 86400000).reduce((sum, s) => sum + s.minutes, 0);
  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks(old => [{ id: `${Date.now()}`, title: taskText.trim(), done: false, date: todayKey() }, ...old]);
    setTaskText('');
  };
  const addCard = () => {
    if (!front.trim() || !back.trim()) return;
    setCards(old => [...old, { id: `${Date.now()}`, front: front.trim(), back: back.trim() }]);
    setFront(''); setBack('');
  };
  const saveNotesFile = () => {
    const content = `CURIVA STUDY NOTES\n\n${notes}\n\nReading log\n${readingLog}\n\nReflection\n${reflection}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'curiva-study-notes.txt'; anchor.click();
    URL.revokeObjectURL(url);
  };
  const resetTimer = (mode: 'focus' | 'break' = 'focus') => {
    setTimerRunning(false); setTimerMode(mode);
    const seconds = mode === 'focus' ? timerLength * 60 : 5 * 60;
    setSecondsLeft(seconds);
  };

  const features = [
    ['1', 'Focus timer', 'Timed study blocks with automatic session logging.'],
    ['2', 'Daily target', 'Track minutes studied against a personal goal.'],
    ['3', 'Weekly target', 'Measure focus time across recent study sessions.'],
    ['4', 'Study checklist', 'Add tasks, mark them done, and filter your list.'],
    ['5', 'Exam countdown', 'Set an exam date and see days remaining.'],
    ['6', 'Quick notes', 'Keep notes locally in this browser.'],
    ['7', 'Flashcard maker', 'Create your own front/back recall cards.'],
    ['8', 'Flashcard review', 'Flip cards and move through your deck.'],
    ['9', 'Random topic', 'Generate a syllabus-inspired topic for revision.'],
    ['10', 'Viva practice', 'Get an oral-exam prompt to answer aloud.'],
    ['11', 'Study streak', 'Track consecutive days with completed focus sessions.'],
    ['12', 'Session history', 'Review recent timed sessions and their topics.'],
    ['13', 'Reading log', 'Record chapters, pages, or references covered.'],
    ['14', 'Daily reflection', 'Capture what went well and what needs work.'],
    ['15', 'Revision filters', 'Separate open tasks from completed tasks.'],
    ['16', 'Progress dashboard', 'View tasks, minutes, and goal completion together.'],
    ['17', 'Focus mode', 'Hide nonessential panels while you study.'],
    ['18', 'Word counter', 'See the word count for your notes.'],
    ['19', 'Notes export', 'Download your notes as a plain text file.'],
    ['20', 'Study shortcuts', 'Jump directly to BHMS subjects, MCQs, and flashcards.']
  ];

  return <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20">
    <SEO title="Study Toolkit | Curiva Homoeopathy" description="Twenty practical study tools for BHMS planning, revision, focus sessions, notes and active recall." />
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <header className="mb-8 rounded-[2rem] bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 p-7 md:p-10 text-white shadow-xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-blue-200"><Sparkles size={16}/> Curiva Academy • Upgrade 20</div>
        <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight">Your Study Command Centre</h1>
        <p className="mt-3 max-w-3xl text-blue-100">Twenty practical tools to plan, focus, revise, and reflect. Your notes and study data stay in this browser on this device; they are not synced to your account.</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-blue-100">Focus today</p><p className="text-2xl font-black">{minutesToday} min</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-blue-100">Daily goal</p><p className="text-2xl font-black">{Math.min(100, Math.round(minutesToday / Math.max(1, dailyGoal) * 100))}%</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-blue-100">Tasks complete</p><p className="text-2xl font-black">{completed}/{tasks.length}</p></div>
          <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-blue-100">Study streak</p><p className="text-2xl font-black">{streak.count} days</p></div>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        <button onClick={() => setFocusMode(v => !v)} className="rounded-xl bg-indigo-700 px-4 py-2 font-bold text-white hover:bg-indigo-600">{focusMode ? 'Exit focus mode' : 'Enter focus mode'}</button>
        <button onClick={saveNotesFile} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-bold hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10"><ArrowDownToLine size={17}/> Export notes</button>
        <Link to="/quizzes" className="rounded-xl border border-slate-300 px-4 py-2 font-bold hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10">Practice quizzes</Link>
        <Link to="/flashcards" className="rounded-xl border border-slate-300 px-4 py-2 font-bold hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10">Flashcard library</Link>
      </div>

      <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([n, title, description]) => <div key={n} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900"><div className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-300">Feature {n.padStart(2, '0')}</div><div className="mt-1 font-extrabold">{title}</div><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p></div>)}
      </div>

      {!focusMode && <div className="grid gap-5 lg:grid-cols-2">
        <CardPanel title="Focus timer" icon={<Clock3 className="text-indigo-600"/>}>
          <div className="text-center">
            <div className="font-mono text-5xl font-black tracking-tight" aria-live="polite">{formattedTime}</div>
            <p className="mt-2 text-sm text-slate-500">{timerMode === 'focus' ? `Focus session • ${topic}` : 'Short break • recharge before the next block'}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button onClick={() => setTimerRunning(v => !v)} className="rounded-xl bg-indigo-700 px-4 py-2 font-bold text-white">{timerRunning ? 'Pause' : 'Start'}</button>
              <button onClick={() => resetTimer('focus')} className="rounded-xl border px-4 py-2 font-bold dark:border-white/20">Reset focus</button>
              <button onClick={() => resetTimer('break')} className="rounded-xl border px-4 py-2 font-bold dark:border-white/20">5-min break</button>
            </div>
            <label className="mt-4 flex items-center justify-center gap-2 text-sm">Focus length
              <select value={timerLength} onChange={e => { const n = Number(e.target.value); setTimerLength(n); setSecondsLeft(n * 60); setTimerRunning(false); setTimerMode('focus'); }} className="rounded-lg border bg-transparent p-2 dark:border-white/20">{[15,25,30,45,50].map(n => <option key={n} value={n}>{n} min</option>)}</select>
            </label>
          </div>
        </CardPanel>

        <CardPanel title="Daily and weekly targets" icon={<Target className="text-emerald-600"/>}>
          <label className="block text-sm font-bold">Daily focus goal (minutes)<input type="number" min="5" max="720" value={dailyGoal} onChange={e => setDailyGoal(Math.min(720, Math.max(5, Number(e.target.value) || 5)))} className="mt-1 w-full rounded-xl border bg-transparent p-3 dark:border-white/20"/></label>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-emerald-500" style={{width:`${Math.min(100, minutesToday / Math.max(1,dailyGoal) * 100)}%`}}/></div>
          <p className="mt-2 text-sm">{minutesToday} of {dailyGoal} minutes today</p>
          <label className="mt-4 block text-sm font-bold">Weekly focus goal (minutes)<input type="number" min="30" max="5000" value={weeklyTarget} onChange={e => setWeeklyTarget(Math.min(5000, Math.max(30, Number(e.target.value) || 30)))} className="mt-1 w-full rounded-xl border bg-transparent p-3 dark:border-white/20"/></label>
          <p className="mt-2 text-sm text-slate-500">This week: {weeklyMinutes} / {weeklyTarget} minutes</p>
        </CardPanel>

        <CardPanel title="Study checklist" icon={<ListTodo className="text-blue-600"/>}>
          <form onSubmit={e => {e.preventDefault(); addTask();}} className="flex gap-2"><input value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Add a revision task…" className="min-w-0 flex-1 rounded-xl border bg-transparent p-3 dark:border-white/20" maxLength={140}/><button aria-label="Add task" className="rounded-xl bg-blue-700 px-3 text-white"><Plus/></button></form>
          <div className="mt-3 flex gap-2 text-sm">{(['all','open','done'] as const).map(f => <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 capitalize ${filter===f?'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100':'bg-slate-100 dark:bg-slate-800'}`}>{f}</button>)}</div>
          <ul className="mt-3 space-y-2">{visibleTasks.length ? visibleTasks.map(t => <li key={t.id} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><input type="checkbox" checked={t.done} onChange={() => setTasks(old => old.map(item => item.id===t.id?{...item,done:!item.done}:item))}/><span className={`flex-1 text-sm ${t.done?'line-through text-slate-400':''}`}>{t.title}</span><button aria-label="Delete task" onClick={() => setTasks(old => old.filter(item => item.id!==t.id))}><Trash2 size={16}/></button></li>) : <li className="text-sm text-slate-500">No tasks in this filter yet.</li>}</ul>
        </CardPanel>

        <CardPanel title="Exam countdown and topic picker" icon={<CalendarDays className="text-amber-600"/>}>
          <label className="block text-sm font-bold">Next exam date<input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="mt-1 w-full rounded-xl border bg-transparent p-3 dark:border-white/20"/></label>
          <p className="mt-2 font-bold">{examDays === null ? 'Choose a date to start your countdown.' : examDays < 0 ? 'That date has passed — update it for your next exam.' : examDays === 0 ? 'Your exam date is today. Good luck!' : `${examDays} days until your exam`}</p>
          <label className="mt-4 block text-sm font-bold">Current subject<select value={topic} onChange={e => setTopic(e.target.value)} className="mt-1 w-full rounded-xl border bg-transparent p-3 dark:border-white/20">{subjects.map(s => <option key={s}>{s}</option>)}</select></label>
          <button onClick={() => setRandomTopic(quickTopics[Math.floor(Math.random()*quickTopics.length)])} className="mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 font-bold dark:border-white/20"><Shuffle size={16}/> Pick a revision topic</button>
          {randomTopic && <p className="mt-2 rounded-xl bg-amber-50 p-3 font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-100">{randomTopic}</p>}
        </CardPanel>

        <CardPanel title="Quick notes and word counter" icon={<NotebookPen className="text-violet-600"/>}>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={7} maxLength={30000} placeholder="Write a concise summary, tricky concept, or revision note…" className="w-full rounded-xl border bg-transparent p-3 dark:border-white/20"/>
          <div className="mt-2 flex items-center justify-between text-sm text-slate-500"><span>{wordCount} words</span><span>{notes.length}/30000 characters</span></div>
          <button onClick={saveNotesFile} className="mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 font-bold dark:border-white/20"><Save size={16}/> Export notes</button>
        </CardPanel>

        <CardPanel title="Build your own flashcards" icon={<Brain className="text-pink-600"/>}>
          <div className="grid gap-2"><input value={front} onChange={e=>setFront(e.target.value)} maxLength={240} placeholder="Question / front" className="rounded-xl border bg-transparent p-3 dark:border-white/20"/><textarea value={back} onChange={e=>setBack(e.target.value)} maxLength={1000} placeholder="Answer / back" rows={2} className="rounded-xl border bg-transparent p-3 dark:border-white/20"/><button onClick={addCard} className="rounded-xl bg-pink-700 px-4 py-2 font-bold text-white">Add flashcard</button></div>
          {cards.length>0 && <div className="mt-4 rounded-2xl border p-4 dark:border-white/20"><div className="text-xs text-slate-500">Card {activeCard+1} of {cards.length}</div><button onClick={()=>setRevealed(v=>!v)} className="my-3 min-h-24 w-full rounded-xl bg-slate-50 p-4 text-left font-bold dark:bg-slate-800">{revealed?cards[activeCard%cards.length].back:cards[activeCard%cards.length].front}<span className="mt-2 block text-xs font-normal text-slate-500">{revealed?'Tap to see question':'Tap to reveal answer'}</span></button><div className="flex gap-2"><button onClick={()=>{setActiveCard(i=>(i+cards.length-1)%cards.length);setRevealed(false)}} className="rounded-lg border px-3 py-2 dark:border-white/20">Previous</button><button onClick={()=>{setActiveCard(i=>(i+1)%cards.length);setRevealed(false)}} className="rounded-lg border px-3 py-2 dark:border-white/20">Next</button><button onClick={()=>setCards(old=>old.filter(c=>c.id!==cards[activeCard%cards.length].id))} className="ml-auto rounded-lg border px-3 py-2 dark:border-white/20"><Trash2 size={16}/></button></div></div>}
        </CardPanel>

        <CardPanel title="Viva prompt generator" icon={<Lightbulb className="text-yellow-600"/>}>
          <p className="text-sm text-slate-500">Practise a spoken answer, then check your syllabus or textbook for accuracy.</p>
          <button onClick={() => setVivaPrompt(vivaPrompts[Math.floor(Math.random()*vivaPrompts.length)])} className="mt-3 rounded-xl bg-amber-500 px-4 py-2 font-bold text-slate-950">Generate viva question</button>
          {vivaPrompt && <p className="mt-3 rounded-xl bg-amber-50 p-4 font-semibold text-amber-950 dark:bg-amber-950 dark:text-amber-100">{vivaPrompt}</p>}
        </CardPanel>

        <CardPanel title="Reading log and reflection" icon={<ClipboardList className="text-teal-600"/>}>
          <label className="block text-sm font-bold">What did you read today?<textarea value={readingLog} onChange={e=>setReadingLog(e.target.value)} maxLength={5000} rows={3} className="mt-1 w-full rounded-xl border bg-transparent p-3 dark:border-white/20" placeholder="Chapter, pages, paper, or textbook reference"/></label>
          <label className="mt-3 block text-sm font-bold">One thing learned / one thing to revisit<textarea value={reflection} onChange={e=>setReflection(e.target.value)} maxLength={3000} rows={3} className="mt-1 w-full rounded-xl border bg-transparent p-3 dark:border-white/20" placeholder="Capture your reflection…"/></label>
        </CardPanel>

        <CardPanel title="Recent focus sessions" icon={<Activity className="text-emerald-600"/>}>
          {sessions.length ? <ul className="space-y-2">{sessions.slice(0,8).map((s,i)=><li key={s.date+'-'+i} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800"><span>{s.topic}<span className="ml-2 text-slate-500">{s.date}</span></span><strong>{s.minutes} min</strong></li>)}</ul> : <p className="text-sm text-slate-500">Completed focus blocks will appear here.</p>}
          {sessions.length>0 && <button onClick={()=>setSessions([])} className="mt-3 text-sm font-bold text-red-600">Clear session history</button>}
        </CardPanel>
      </div>}

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <h2 className="text-xl font-black">Continue learning</h2>
        <p className="mt-1 text-sm text-slate-500">Open an existing Curiva module — these links keep the current study content intact.</p>
        <div className="mt-4 flex flex-wrap gap-3">{[
          ['/subjects','All BHMS subjects'], ['/portal/1st-bhms','1st BHMS portal'], ['/portal/2nd-bhms','2nd BHMS portal'], ['/portal/3rd-bhms','3rd BHMS portal'], ['/portal/4th-bhms','4th BHMS portal'], ['/aiapget-mcq-simulator','AIAPGET simulator'], ['/quizzes','Quizzes'], ['/flashcards','Flashcard library'], ['/materia-medica','Materia Medica'], ['/appointments','Appointment requests']
        ].map(([to,label])=><Link key={to} to={to} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:border-indigo-400 hover:bg-indigo-50 dark:border-white/10 dark:hover:bg-white/10">{label}</Link>)}</div>
        <p className="mt-5 text-xs text-slate-500">Study support only. This toolkit is not a clinical decision system. Verify clinical facts using current authoritative textbooks and guidelines.</p>
      </section>
    </div>
  </main>;
}
