import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Flag, ListChecks, RotateCcw, Send, ShieldCheck, Trophy, X } from 'lucide-react';
import type { NativeQuestion } from './quizBank';

export interface NativeExamHistoryResult {
  date: string;
  subject: string;
  score: number;
  total: number;
  percent: number;
}

interface NativeExamModeProps {
  questions: NativeQuestion[];
  initialSubject: string;
  onExit: () => void;
  onComplete: (result: NativeExamHistoryResult) => void;
}

type ExamPhase = 'setup' | 'running' | 'result' | 'review';
type ExamSummary = {
  correct: number;
  attempted: number;
  unanswered: number;
  percent: number;
  elapsedSeconds: number;
  total: number;
};

function localDateKey() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}

function formatClock(seconds: number) {
  const safe = Math.max(0, seconds);
  return String(Math.floor(safe / 60)).padStart(2, '0') + ':' + String(safe % 60).padStart(2, '0');
}

function shuffleQuestions(items: NativeQuestion[]) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export default function NativeExamMode({ questions, initialSubject, onExit, onComplete }: NativeExamModeProps) {
  const subjects = useMemo(() => ['All subjects', ...Array.from(new Set(questions.map(q => q.subject))).sort()], [questions]);
  const [subject, setSubject] = useState(initialSubject || 'All subjects');
  const [questionCount, setQuestionCount] = useState('20');
  const [durationMinutes, setDurationMinutes] = useState('30');
  const [phase, setPhase] = useState<ExamPhase>('setup');
  const [session, setSession] = useState<NativeQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [deadlineMs, setDeadlineMs] = useState<number | null>(null);
  const [summary, setSummary] = useState<ExamSummary | null>(null);
  const finishRef = useRef<() => void>(() => undefined);
  const availableQuestions = useMemo(
    () => subject === 'All subjects' ? questions : questions.filter(q => q.subject === subject),
    [questions, subject]
  );
  const currentQuestion = session[questionIndex];
  const answeredCount = Object.keys(answers).length;
  const timeLimit = Math.max(1, Number(durationMinutes) || 30) * 60;
  const elapsedSeconds = Math.max(0, timeLimit - secondsRemaining);

  const startExam = () => {
    const shuffled = shuffleQuestions(availableQuestions);
    const requested = questionCount === 'all' ? shuffled.length : Math.max(1, Number(questionCount) || 20);
    const selected = shuffled.slice(0, Math.min(requested, shuffled.length));
    if (!selected.length) return;
    setSession(selected);
    setAnswers({});
    setFlagged([]);
    setQuestionIndex(0);
    setSecondsRemaining(timeLimit);
    setDeadlineMs(Date.now() + timeLimit * 1000);
    setSummary(null);
    setPhase('running');
  };

  const finishExam = () => {
    if (phase !== 'running' || !session.length) return;
    const remainingAtSubmit = deadlineMs === null
      ? secondsRemaining
      : Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
    const elapsedAtSubmit = Math.max(0, timeLimit - remainingAtSubmit);
    const correct = session.filter(q => answers[q.id] === q.answer).length;
    const attempted = Object.keys(answers).filter(id => session.some(q => q.id === id)).length;
    const total = session.length;
    const percent = Math.round(correct / total * 100);
    setSecondsRemaining(remainingAtSubmit);
    setSummary({
      correct,
      attempted,
      unanswered: Math.max(0, total - attempted),
      percent,
      elapsedSeconds: elapsedAtSubmit,
      total
    });
    setPhase('result');
    onComplete({ date: localDateKey(), subject, score: correct, total, percent });
  };
  finishRef.current = finishExam;

  useEffect(() => {
    if (phase !== 'running' || deadlineMs === null) return;

    const refreshRemaining = () => {
      const remaining = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));
      setSecondsRemaining(remaining);
    };

    // Calculate against an absolute deadline so background timer throttling
    // cannot extend an exam after the app is resumed.
    refreshRemaining();
    const timer = window.setInterval(refreshRemaining, 1000);
    window.addEventListener('focus', refreshRemaining);
    window.addEventListener('pageshow', refreshRemaining);
    document.addEventListener('visibilitychange', refreshRemaining);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', refreshRemaining);
      window.removeEventListener('pageshow', refreshRemaining);
      document.removeEventListener('visibilitychange', refreshRemaining);
    };
  }, [phase, deadlineMs]);

  useEffect(() => {
    if (phase === 'running' && secondsRemaining === 0) finishRef.current();
  }, [phase, secondsRemaining]);

  const selectAnswer = (optionIndex: number) => {
    if (!currentQuestion || phase !== 'running') return;
    setAnswers(current => ({ ...current, [currentQuestion.id]: optionIndex }));
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlagged(items => items.includes(currentQuestion.id)
      ? items.filter(id => id !== currentQuestion.id)
      : [...items, currentQuestion.id]);
  };

  const returnToSetup = () => {
    setPhase('setup');
    setSummary(null);
    setSession([]);
    setAnswers({});
    setFlagged([]);
    setQuestionIndex(0);
  };

  if (phase === 'setup') {
    return (
      <main className="native-detail-content native-exam-screen">
        <div className="native-exam-kicker"><span className="native-eyebrow">EXAM PREPARATION</span><span className="native-exam-mode-tag"><Clock3 size={13} /> TIMED MODE</span></div>
        <h1>Mock examination</h1>
        <p className="native-exam-intro">Build a focused paper from Curiva's bundled question bank. Answers and explanations stay hidden until submission.</p>
        <div className="native-exam-setup-card">
          <label className="native-field-label" htmlFor="native-exam-subject">Subject</label>
          <select id="native-exam-subject" className="native-select" value={subject} onChange={event => setSubject(event.target.value)}>
            {subjects.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
          <label className="native-field-label" htmlFor="native-exam-count">Number of questions</label>
          <select id="native-exam-count" className="native-select" value={questionCount} onChange={event => setQuestionCount(event.target.value)}>
            <option value="20">20 questions</option>
            <option value="40">40 questions</option>
            <option value="60">60 questions</option>
            <option value="all">Full selected question bank ({availableQuestions.length})</option>
          </select>
          <label className="native-field-label" htmlFor="native-exam-duration">Time limit</label>
          <select id="native-exam-duration" className="native-select" value={durationMinutes} onChange={event => setDurationMinutes(event.target.value)}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
          </select>
          <div className="native-exam-setup-stats">
            <div><strong>{availableQuestions.length}</strong><span>available</span></div>
            <div><strong>{durationMinutes} min</strong><span>time limit</span></div>
            <div><strong>Offline</strong><span>question bank</span></div>
          </div>
          <button type="button" className="native-primary-button native-exam-start" disabled={!availableQuestions.length} onClick={startExam}>Start timed exam <ArrowRight size={17} /></button>
        </div>
        <div className="native-disclaimer"><ShieldCheck size={16} /><span>This is a revision simulator, not an official university examination or a substitute for prescribed assessment.</span></div>
        <button type="button" className="native-secondary-button native-exam-exit" onClick={onExit}><ArrowLeft size={16} /> Back to practice</button>
      </main>
    );
  }

  if (phase === 'result' && summary) {
    return (
      <main className="native-detail-content native-exam-screen native-exam-result">
        <div className="native-result-illustration"><Trophy size={35} /></div>
        <span className="native-eyebrow">MOCK EXAM SUBMITTED</span>
        <h1>Review your performance.</h1>
        <div className="native-exam-score">
          <strong>{summary.correct}/{summary.total}</strong>
          <span>{summary.percent}% accuracy</span>
          <div className="native-progress-track"><span style={{ width: summary.percent + '%' }} /></div>
        </div>
        <div className="native-exam-result-grid">
          <div><strong>{summary.attempted}</strong><span>Attempted</span></div>
          <div><strong>{summary.unanswered}</strong><span>Unanswered</span></div>
          <div><strong>{formatClock(summary.elapsedSeconds)}</strong><span>Time used</span></div>
        </div>
        <div className="native-exam-result-actions">
          <button type="button" className="native-primary-button" onClick={() => setPhase('review')}>Review answers <ArrowRight size={17} /></button>
          <button type="button" className="native-secondary-button" onClick={returnToSetup}><RotateCcw size={16} /> New exam</button>
          <button type="button" className="native-secondary-button" onClick={onExit}>Back to practice</button>
        </div>
      </main>
    );
  }

  if (phase === 'review') {
    return (
      <main className="native-detail-content native-exam-screen">
        <div className="native-exam-review-heading"><div><span className="native-eyebrow">ANSWER REVIEW</span><h1>Learn from every question.</h1></div><button type="button" className="native-icon-button" aria-label="Back to exam result" onClick={() => setPhase('result')}><X size={18} /></button></div>
        <div className="native-exam-review-list">
          {session.map((question, index) => {
            const selected = answers[question.id];
            const correct = selected === question.answer;
            return (
              <article className="native-exam-review-item" key={question.id}>
                <div className="native-exam-review-meta"><span>Q{index + 1} · {question.subject}</span><b className={correct ? 'is-correct' : 'is-incorrect'}>{correct ? 'Correct' : selected === undefined ? 'Not attempted' : 'Incorrect'}</b></div>
                <h3>{question.prompt}</h3>
                <div className="native-exam-review-answer"><strong>Your answer</strong><span>{selected === undefined ? 'Not attempted' : question.options[selected]}</span></div>
                <div className="native-exam-review-answer is-key"><strong>Correct answer</strong><span>{question.options[question.answer]}</span></div>
                <p>{question.explanation}</p>
              </article>
            );
          })}
        </div>
        <button type="button" className="native-secondary-button native-exam-exit" onClick={() => setPhase('result')}><ArrowLeft size={16} /> Back to result</button>
      </main>
    );
  }

  if (!currentQuestion) return null;
  const isFlagged = flagged.includes(currentQuestion.id);
  return (
    <main className="native-detail-content native-exam-screen native-exam-running">
      <div className="native-exam-running-head">
        <div><span className="native-eyebrow">TIMED MOCK EXAM</span><strong>{subject}</strong></div>
        <div className={'native-exam-clock' + (secondsRemaining <= 300 ? ' is-warning' : '')}><Clock3 size={15} /> {formatClock(secondsRemaining)}</div>
      </div>
      <div className="native-exam-progress-meta"><span>Question {questionIndex + 1} of {session.length}</span><span>{answeredCount} answered · {flagged.length} marked</span></div>
      <div className="native-progress-track native-exam-track"><span style={{ width: String((questionIndex + 1) / session.length * 100) + '%' }} /></div>
      <div className="native-question-label"><span>Q{String(questionIndex + 1).padStart(2, '0')}</span><span>{currentQuestion.difficulty}</span></div>
      <h1>{currentQuestion.prompt}</h1>
      <div className="native-exam-options">
        {currentQuestion.options.map((option, index) => {
          const selected = answers[currentQuestion.id] === index;
          return <button type="button" key={option} className={'native-exam-option' + (selected ? ' is-selected' : '')} aria-pressed={selected} onClick={() => selectAnswer(index)}>
            <span>{String.fromCharCode(65 + index)}</span><strong>{option}</strong>{selected && <CheckCircle2 size={17} />}
          </button>;
        })}
      </div>
      <div className="native-exam-question-actions">
        <button type="button" className={isFlagged ? 'is-flagged' : ''} onClick={toggleFlag}><Flag size={15} /> {isFlagged ? 'Marked for review' : 'Mark for review'}</button>
        <span>{answeredCount}/{session.length} answered</span>
      </div>
      <div className="native-exam-navigator" aria-label="Question navigator">
        {session.map((question, index) => <button type="button" key={question.id} className={(index === questionIndex ? 'is-current ' : '') + (answers[question.id] !== undefined ? 'is-answered ' : '') + (flagged.includes(question.id) ? 'is-flagged' : '')} aria-label={'Go to question ' + (index + 1)} aria-current={index === questionIndex ? 'step' : undefined} onClick={() => setQuestionIndex(index)}>{index + 1}</button>)}
      </div>
      <div className="native-exam-navigation">
        <button type="button" className="native-secondary-button" disabled={questionIndex === 0} onClick={() => setQuestionIndex(index => index - 1)}><ArrowLeft size={15} /> Previous</button>
        {questionIndex < session.length - 1
          ? <button type="button" className="native-primary-button" onClick={() => setQuestionIndex(index => index + 1)}>Next <ArrowRight size={16} /></button>
          : <button type="button" className="native-primary-button" onClick={() => setQuestionIndex(0)}><ListChecks size={16} /> Review paper</button>}
      </div>
      <button type="button" className="native-exam-submit" onClick={finishExam}><Send size={15} /> Submit examination</button>
      <p className="native-exam-hint">The exam submits automatically when the timer reaches zero. You can change answers until you submit.</p>
    </main>
  );
}
