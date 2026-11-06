import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, BookOpen, Brain, CalendarDays, CheckSquare, Clock3, FileText, Flame, Focus, Layers, Lightbulb, ListChecks, NotebookPen, Target, Timer, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import { useStudyToolkit } from '../context/StudyToolkitContext';

const featureGroups = [
  { group: 'Focus and planning', features: [
    { n: 1, title: 'Focus Timer', description: 'A persistent focus and break timer available across the website.', place: 'Global study controls', to: '/profile?tab=planner' },
    { n: 2, title: 'Daily Target', description: 'Set a daily study-minute goal and track its completion.', place: 'Profile dashboard', to: '/profile?tab=planner' },
    { n: 3, title: 'Weekly Target', description: 'Measure study time across the last seven days.', place: 'Profile dashboard', to: '/profile?tab=planner' },
    { n: 4, title: 'Study Checklist', description: 'Add, complete and filter tasks by subject or chapter.', place: 'Dashboard and subject hubs', to: '/subjects' },
    { n: 5, title: 'Exam Countdown', description: 'Set your next exam date and see days remaining.', place: 'Profile dashboard', to: '/profile?tab=planner' }
  ]},
  { group: 'Notes and active recall', features: [
    { n: 6, title: 'Quick Notes', description: 'Capture concepts from the global dock, dashboard or subject workspace.', place: 'Global dock, dashboard and subjects', to: '/profile?tab=planner' },
    { n: 7, title: 'Flashcard Maker', description: 'Create question-and-answer cards from your own lessons.', place: 'Flashcard centre and subject hubs', to: '/flashcards' },
    { n: 8, title: 'Flashcard Review', description: 'Flip, search and revise your custom active-recall deck.', place: 'Flashcard centre', to: '/flashcards' },
    { n: 9, title: 'Random Topic', description: 'Pick a syllabus chapter for spontaneous revision.', place: 'Dashboard and subject hubs', to: '/subjects' },
    { n: 10, title: 'Viva Practice', description: 'Generate oral-exam prompts and practise structured answers.', place: 'Dashboard, subjects and quizzes', to: '/quizzes' }
  ]},
  { group: 'Progress and reflection', features: [
    { n: 11, title: 'Study Streak', description: 'Track consecutive days with completed focus sessions.', place: 'Profile dashboard', to: '/profile?tab=planner' },
    { n: 12, title: 'Session History', description: 'Review completed study blocks and topics.', place: 'Profile dashboard', to: '/profile?tab=planner' },
    { n: 13, title: 'Reading Log', description: 'Record chapters, pages and reading notes by BHMS subject.', place: 'Dashboard and subject hubs', to: '/profile?tab=planner' },
    { n: 14, title: 'Daily Reflection', description: 'Capture what you learned and what needs another revision.', place: 'Profile dashboard', to: '/profile?tab=planner' },
    { n: 15, title: 'Revision Filters', description: 'Separate open, completed and subject-linked tasks.', place: 'Dashboard and subject hubs', to: '/profile?tab=planner' },
    { n: 16, title: 'Progress Dashboard', description: 'See goals, completed tasks, study time and streaks together.', place: 'Profile dashboard', to: '/profile?tab=planner' }
  ]},
  { group: 'Study workspace utilities', features: [
    { n: 17, title: 'Focus Mode', description: 'Hide distractions with a full-screen study view.', place: 'Global study controls', to: '/profile?tab=planner' },
    { n: 18, title: 'Word Counter', description: 'Count words while drafting quick or subject notes.', place: 'Dashboard and note panels', to: '/profile?tab=planner' },
    { n: 19, title: 'Notes Export', description: 'Export your study notes, reading log and reflections as text.', place: 'Profile dashboard', to: '/profile?tab=planner' },
    { n: 20, title: 'Study Shortcuts', description: 'Jump to subjects, flashcards, quizzes and your learning dashboard.', place: 'Global study controls', to: '/subjects' }
  ]}
];

export default function StudyToolkit() {
  const { state, ready, todayMinutes, weeklyMinutes, streak, startTimer, pauseTimer, setFocusMode } = useStudyToolkit();
  const completed = state.tasks.filter(task => task.done).length;
  const remaining = state.timer.running && state.timer.deadlineAt
    ? Math.max(0, Math.ceil((state.timer.deadlineAt - Date.now()) / 1000))
    : state.timer.remainingSeconds;
  const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-4 py-8 sm:px-6 lg:px-8">
      <SEO title="Curiva Study Toolkit | BHMS Learning Workspace" description="A connected suite of 20 study tools distributed across Curiva's profile dashboard, BHMS subject centres, flashcards, quizzes and global study controls."/>
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 p-6 text-white shadow-xl sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-blue-200"><Brain size={16}/> Curiva Academy • Connected Study Toolkit</div>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Twenty tools. One study workspace.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100 sm:text-base">The Study Toolkit is no longer confined to one page. Use the tools where you study: in your dashboard, inside each BHMS subject, in the flashcard and quiz centres, and from the persistent study controls.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white/10 p-3"><Clock3 size={16}/><p className="mt-2 text-xs text-blue-100">Today</p><p className="text-2xl font-black">{ready ? todayMinutes : '—'} min</p></div>
            <div className="rounded-xl bg-white/10 p-3"><Target size={16}/><p className="mt-2 text-xs text-blue-100">Daily goal</p><p className="text-2xl font-black">{ready ? state.dailyGoal : '—'} min</p></div>
            <div className="rounded-xl bg-white/10 p-3"><Flame size={16}/><p className="mt-2 text-xs text-blue-100">Streak</p><p className="text-2xl font-black">{ready ? streak : '—'} days</p></div>
            <div className="rounded-xl bg-white/10 p-3"><ListChecks size={16}/><p className="mt-2 text-xs text-blue-100">Checklist</p><p className="text-2xl font-black">{ready ? `${completed}/${state.tasks.length}` : '—'}</p></div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/profile?tab=planner" className="group rounded-2xl border border-border bg-bg-secondary p-4 hover:border-primary/50"><Target className="text-primary"/><h2 className="mt-3 text-sm font-black">My dashboard</h2><p className="mt-1 text-xs text-text-secondary">Goals, streak, exam countdown, notes, sessions and reflections.</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">Open dashboard <ArrowRight size={13}/></span></Link>
          <Link to="/subjects" className="group rounded-2xl border border-border bg-bg-secondary p-4 hover:border-primary/50"><BookOpen className="text-primary"/><h2 className="mt-3 text-sm font-black">BHMS subject centres</h2><p className="mt-1 text-xs text-text-secondary">Chapter checklists, subject notes, reading logs, topic picker and viva prompts.</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">Browse subjects <ArrowRight size={13}/></span></Link>
          <Link to="/flashcards" className="group rounded-2xl border border-border bg-bg-secondary p-4 hover:border-primary/50"><Layers className="text-primary"/><h2 className="mt-3 text-sm font-black">Flashcard centre</h2><p className="mt-1 text-xs text-text-secondary">Create and review your own cards alongside Curiva's existing flashcard library.</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">Open flashcards <ArrowRight size={13}/></span></Link>
          <Link to="/quizzes" className="group rounded-2xl border border-border bg-bg-secondary p-4 hover:border-primary/50"><Lightbulb className="text-primary"/><h2 className="mt-3 text-sm font-black">Practice and viva</h2><p className="mt-1 text-xs text-text-secondary">Use interactive quizzes and oral-exam prompts for recall practice.</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">Practice now <ArrowRight size={13}/></span></Link>
        </section>

        <section className="rounded-2xl border border-border bg-bg-secondary p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="text-sm font-black">Global study controls</h2><p className="mt-1 text-xs text-text-secondary">The compact study timer is available at the bottom-right of every page.</p></div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => state.timer.running ? pauseTimer() : startTimer()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white"><Timer size={14}/>{state.timer.running ? 'Pause timer' : 'Start timer'} · {ready ? formatTime(remaining) : '--:--'}</button>
              <button type="button" onClick={() => setFocusMode(!state.focusMode)} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-bold"><Zap size={14}/>{state.focusMode ? 'Exit focus mode' : 'Enter focus mode'}</button>
            </div>
          </div>
          <p className="mt-3 text-xs text-text-tertiary">This week: {ready ? weeklyMinutes : '—'} / {ready ? state.weeklyGoal : '—'} minutes. Use the global dock for quick notes, timer duration and shortcuts.</p>
        </section>

        {featureGroups.map(group => (
          <section key={group.group} className="space-y-3">
            <h2 className="text-lg font-black">{group.group}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.features.map(feature => (
                <Link key={feature.n} to={feature.to} className="rounded-2xl border border-border bg-bg-secondary p-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.03]">
                  <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest text-primary">Tool {String(feature.n).padStart(2,'0')}</span><ArrowRight size={15} className="text-text-tertiary"/></div>
                  <h3 className="mt-2 text-sm font-black">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">{feature.description}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-text-tertiary">Available in: {feature.place}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-2xl border border-border bg-bg-secondary p-4 text-xs leading-relaxed text-text-secondary">
          {ready && <span className="mr-1 inline-flex align-middle text-primary">{state.cards.length} custom cards · {state.notes.length} notes · {state.sessions.length} sessions · {state.readingLogs.length} reading entries.</span>}
          {ready && (state.examDate ? ` Next exam date: ${state.examDate}.` : ' Add your next exam date in the dashboard.')}
          <p className="mt-2">Signed-in workspaces sync to the matching Curiva account when Firestore is available. Guest workspaces are stored locally and remain separate. Do not enter patient-identifiable or confidential clinical information in study tools.</p>
        </div>
      </div>
    </main>
  );
}
