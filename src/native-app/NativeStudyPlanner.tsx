import React, { useEffect, useState } from 'react';
import { CalendarDays, Check, Clock3, Target } from 'lucide-react';

const tasks = [
  { id: 'topic', title: 'Learn one curriculum topic', detail: 'Work through a chapter or focused concept.' },
  { id: 'mcq', title: 'Attempt a 10-question quiz', detail: 'Use MCQs to check active recall.' },
  { id: 'cards', title: 'Review 10 flashcards', detail: 'Strengthen recall with spaced revision.' },
  { id: 'materia', title: 'Revise one Materia Medica profile', detail: 'Compare keynotes as an academic exercise.' }
];

function localDateKey() {
  const date = new Date();
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function readPlan(dateKey: string) {
  try {
    const saved = JSON.parse(localStorage.getItem('curiva-native-study-plan') || 'null') as { date?: string; goal?: number; completed?: string[] } | null;
    if (saved && saved.date === dateKey) {
      return { goal: [15, 30, 45, 60].includes(saved.goal || 0) ? saved.goal as number : 30, completed: Array.isArray(saved.completed) ? saved.completed.filter(id => tasks.some(task => task.id === id)) : [] };
    }
  } catch { /* A fresh plan is safer than blocking study. */ }
  return { goal: 30, completed: [] as string[] };
}

export default function NativeStudyPlanner() {
  const dateKey = localDateKey();
  const [plan, setPlan] = useState(() => readPlan(dateKey));
  const doneCount = plan.completed.length;
  const progress = Math.round(doneCount / tasks.length * 100);

  useEffect(() => {
    try {
      localStorage.setItem('curiva-native-study-plan', JSON.stringify({ date: dateKey, goal: plan.goal, completed: plan.completed }));
      window.dispatchEvent(new Event('curiva-native-progress-updated'));
    } catch { /* The planner remains usable for this session. */ }
  }, [dateKey, plan]);

  useEffect(() => {
    const restore = () => setPlan(current => {
      const next = readPlan(dateKey);
      return JSON.stringify(current) === JSON.stringify(next) ? current : next;
    });
    window.addEventListener('curiva-native-progress-restored', restore);
    return () => window.removeEventListener('curiva-native-progress-restored', restore);
  }, [dateKey]);

  const toggleTask = (id: string) => {
    setPlan(current => ({
      ...current,
      completed: current.completed.includes(id) ? current.completed.filter(item => item !== id) : [...current.completed, id]
    }));
  };

  return (
    <section className="native-plan-card" aria-labelledby="native-plan-heading">
      <div className="native-plan-heading">
        <div>
          <span className="native-eyebrow"><CalendarDays size={12} /> TODAY'S STUDY PLAN</span>
          <h2 id="native-plan-heading">A little progress, daily.</h2>
          <p>Choose a realistic target and tick off your study sessions.</p>
        </div>
        <div className="native-plan-count"><strong>{doneCount}/{tasks.length}</strong><span>done</span></div>
      </div>
      <div className="native-plan-goals" role="group" aria-label="Daily study time target">
        <span><Target size={14} /> Daily goal</span>
        {[15, 30, 45, 60].map(minutes => <button key={minutes} type="button" aria-pressed={plan.goal === minutes} className={plan.goal === minutes ? 'is-selected' : ''} onClick={() => setPlan(current => ({ ...current, goal: minutes }))}>{minutes} min</button>)}
      </div>
      <div className="native-plan-progress"><span style={{ width: progress + '%' }} /></div>
      <div className="native-plan-tasks">
        {tasks.map(task => {
          const isDone = plan.completed.includes(task.id);
          return <button key={task.id} type="button" className={'native-plan-task' + (isDone ? ' is-done' : '')} aria-pressed={isDone} onClick={() => toggleTask(task.id)}>
            <span className="native-plan-check">{isDone && <Check size={15} />}</span>
            <span className="native-plan-task-copy"><strong>{task.title}</strong><small>{task.detail}</small></span>
          </button>;
        })}
      </div>
      <div className="native-plan-foot"><Clock3 size={13} /><span>{plan.goal} minutes is your chosen daily target. Your checklist is saved on this device and synced to your Curiva account when you are signed in.</span></div>
    </section>
  );
}
