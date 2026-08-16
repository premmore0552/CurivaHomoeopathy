import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCw, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  BrainCircuit,
  Filter,
  BarChart3,
  Play,
  Check,
  AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import { getAIAPGETQuestionBank, AIAPGETQuestion } from '../data/aiapget_questions';

export default function AiapgetMcqSimulator() {
  const [mcqMode, setMcqMode] = useState<'sandbox' | 'exam10' | 'exam50'>('sandbox');
  
  // Filter States for Sandbox
  const [quizFilterSubject, setQuizFilterSubject] = useState<string>('All');
  const [quizFilterDifficulty, setQuizFilterDifficulty] = useState<string>('All');
  const [quizSearchQuery, setQuizSearchQuery] = useState('');
  const [sandboxPage, setSandboxPage] = useState(0);
  const sandboxPageSize = 10;

  // Cached question bank
  const fullQuestionBank = useMemo(() => {
    return getAIAPGETQuestionBank(5000);
  }, []);

  // Sandbox user answers
  const [userSelectedSandboxAnswers, setUserSelectedSandboxAnswers] = useState<Record<string, number>>({});
  const [submittedSandboxAnswers, setSubmittedSandboxAnswers] = useState<Record<string, boolean>>({});

  // Filtered sandbox list
  const filteredSandboxQuestions = useMemo(() => {
    if (mcqMode !== 'sandbox') return [];
    return fullQuestionBank.filter(q => {
      const query = quizSearchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        q.question.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query);

      const matchesSubject = quizFilterSubject === 'All' || q.subject === quizFilterSubject;
      const matchesDifficulty = quizFilterDifficulty === 'All' || q.difficulty === quizFilterDifficulty;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [mcqMode, fullQuestionBank, quizSearchQuery, quizFilterSubject, quizFilterDifficulty]);

  useEffect(() => {
    setSandboxPage(0);
  }, [quizFilterSubject, quizFilterDifficulty, quizSearchQuery]);

  const pagedSandboxQuestions = useMemo(() => {
    const start = sandboxPage * sandboxPageSize;
    return filteredSandboxQuestions.slice(start, start + sandboxPageSize);
  }, [filteredSandboxQuestions, sandboxPage]);

  const totalPages = Math.ceil(filteredSandboxQuestions.length / sandboxPageSize);

  const handleSandboxOptionSelect = (qId: string, optIdx: number) => {
    if (submittedSandboxAnswers[qId]) return;
    setUserSelectedSandboxAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSandboxSubmit = (qId: string) => {
    setSubmittedSandboxAnswers(prev => ({ ...prev, [qId]: true }));
  };

  // --- MOCK EXAM STATES (10 or 50 Qs) ---
  const [examQuestions, setExamQuestions] = useState<AIAPGETQuestion[]>([]);
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [selectedExamAnswers, setSelectedExamAnswers] = useState<Record<number, number>>({});
  const [examScore, setExamScore] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 min for 10Q, 50 min for 50Q

  const startNewExam = (mode: 'exam10' | 'exam50') => {
    setMcqMode(mode);
    const count = mode === 'exam10' ? 10 : 50;
    const time = mode === 'exam10' ? 600 : 3000;
    
    const shuffled = [...fullQuestionBank].sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled.slice(0, count));
    setCurrentExamIdx(0);
    setSelectedExamAnswers({});
    setExamScore(0);
    setExamFinished(false);
    setTimerSeconds(time);
  };

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if ((mcqMode === 'exam10' || mcqMode === 'exam50') && !examFinished && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => {
          if (sec <= 1) {
            handleFinishExam();
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mcqMode, examFinished, timerSeconds]);

  const handleExamOptionSelect = (optIdx: number) => {
    if (examFinished) return;
    setSelectedExamAnswers(prev => ({ ...prev, [currentExamIdx]: optIdx }));
  };

  const handleFinishExam = () => {
    let score = 0;
    examQuestions.forEach((q, idx) => {
      const selected = selectedExamAnswers[idx];
      if (selected !== undefined && q.options[selected] === q.correctAnswer) {
        score++;
      }
    });
    setExamScore(score);
    setExamFinished(true);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const uniqueSubjects = useMemo(() => {
    return [
      "Materia Medica",
      "Organon of Medicine",
      "Homoeopathic Pharmacy",
      "Repertory",
      "Anatomy",
      "Physiology & Biochemistry",
      "Pathology & Microbiology",
      "Forensic Medicine & Toxicology",
      "Surgery & Therapeutics",
      "Obstetrics & Gynecology",
      "Practice of Medicine"
    ];
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <SEO 
        title="5,000+ AIAPGET & University MCQ Simulator | Curiva Homoeopathy"
        description="Full-scale AIAPGET and State PSC MCQ simulator. Practice 5,000+ questions in Sandbox mode or take timed 10-Q & 50-Q mock entrance examinations."
      />

      {/* Breadcrumb & Hero */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/student-resources" className="hover:text-primary transition-colors">Study Resources</Link>
          <span>/</span>
          <span className="text-primary font-bold">5000+ AIAPGET MCQ Simulator</span>
        </div>

        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Award className="w-4 h-4 text-purple-400" />
              National Level Entrance Exam Engine
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              5,000+ AIAPGET MCQ Simulator
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Test your knowledge across all 11 BHMS subjects. Solve questions topic-wise with detailed clinical explanations or challenge yourself with realistic timed mock exams.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Navigation Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setMcqMode('sandbox')}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            mcqMode === 'sandbox'
              ? 'bg-primary text-white shadow-md'
              : 'bg-bg-secondary text-text-secondary hover:text-primary border border-border'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Interactive Sandbox Pool (5,000+ Qs)</span>
        </button>

        <button
          onClick={() => startNewExam('exam10')}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            mcqMode === 'exam10'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-bg-secondary text-text-secondary hover:text-primary border border-border'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Quick 10-Q Drill (10 Mins)</span>
        </button>

        <button
          onClick={() => startNewExam('exam50')}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            mcqMode === 'exam50'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-bg-secondary text-text-secondary hover:text-primary border border-border'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Full 50-Q AIAPGET Mock Exam</span>
        </button>
      </div>

      {/* --- MODE 1: SANDBOX POOL --- */}
      {mcqMode === 'sandbox' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters */}
          <div className="bg-bg-secondary border border-border rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={quizSearchQuery}
                onChange={(e) => setQuizSearchQuery(e.target.value)}
                placeholder="Search MCQs by question keywords, remedy, aphorism, or pathology..."
                className="w-full pl-11 pr-4 py-3 bg-bg-primary rounded-2xl border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-text-primary"
              />
              {quizSearchQuery && (
                <button
                  onClick={() => setQuizSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary hover:text-text-primary px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                  Filter by Subject:
                </label>
                <select
                  value={quizFilterSubject}
                  onChange={(e) => setQuizFilterSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none"
                >
                  <option value="All">All Subjects ({fullQuestionBank.length} Questions)</option>
                  {uniqueSubjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                  Difficulty Level:
                </label>
                <select
                  value={quizFilterDifficulty}
                  onChange={(e) => setQuizFilterDifficulty(e.target.value)}
                  className="w-full px-3 py-2.5 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none"
                >
                  <option value="All">All Difficulty Levels</option>
                  <option value="Easy">Easy (Direct Recall)</option>
                  <option value="Medium">Medium (Conceptual)</option>
                  <option value="Hard">Hard (Clinical Vignette &amp; High-Yield)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sandbox Questions List */}
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs text-text-tertiary px-1">
              <span>Showing {pagedSandboxQuestions.length} of {filteredSandboxQuestions.length} Questions (Page {sandboxPage + 1} of {Math.max(1, totalPages)})</span>
              <span>Instant feedback mode</span>
            </div>

            {pagedSandboxQuestions.map((q, qIndex) => {
              const selectedIdx = userSelectedSandboxAnswers[q.id];
              const isSubmitted = submittedSandboxAnswers[q.id];
              const correctOptionIdx = q.options.indexOf(q.correctAnswer);
              const isCorrect = selectedIdx !== undefined && q.options[selectedIdx] === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="bg-bg-secondary border border-border rounded-3xl p-5 sm:p-7 space-y-4 hover:border-primary/30 transition-all shadow-sm"
                >
                  {/* Header metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-bg-primary border border-border text-text-secondary">
                        {q.subject}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-base sm:text-lg font-serif font-bold text-text-primary leading-snug">
                    <span className="text-text-tertiary mr-2">Q{sandboxPage * sandboxPageSize + qIndex + 1}.</span>
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let optionClasses = "bg-bg-primary text-text-secondary border-border hover:border-primary/40";

                      if (isSubmitted) {
                        if (optIdx === correctOptionIdx) {
                          optionClasses = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500 font-bold";
                        } else if (isOptionSelected && optIdx !== correctOptionIdx) {
                          optionClasses = "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500 font-bold";
                        }
                      } else if (isOptionSelected) {
                        optionClasses = "bg-primary/10 text-primary border-primary font-bold";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSandboxOptionSelect(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionClasses}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-bg-secondary border border-border flex items-center justify-center font-mono font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSubmitted && optIdx === correctOptionIdx && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && isOptionSelected && optIdx !== correctOptionIdx && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Reveal Explanation Button */}
                  {!isSubmitted ? (
                    <div className="pt-2">
                      <button
                        disabled={selectedIdx === undefined}
                        onClick={() => handleSandboxSubmit(q.id)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          selectedIdx !== undefined
                            ? 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                            : 'bg-bg-primary text-text-tertiary border border-border cursor-not-allowed'
                        }`}
                      >
                        Submit &amp; Check Answer
                      </button>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-border space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect. Correct option is {String.fromCharCode(65 + correctOptionIdx)} ({q.correctAnswer})
                          </span>
                        )}
                      </div>
                      <div className="bg-bg-primary p-4 rounded-2xl border border-border/80 text-xs sm:text-sm text-text-secondary leading-relaxed">
                        <strong className="text-text-primary block mb-1">AIAPGET High-Yield Explanation:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 bg-bg-secondary border border-border rounded-2xl">
                <button
                  disabled={sandboxPage === 0}
                  onClick={() => setSandboxPage(p => Math.max(0, p - 1))}
                  className="px-4 py-2 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-xs font-mono font-bold text-text-tertiary">
                  Page {sandboxPage + 1} of {totalPages}
                </span>
                <button
                  disabled={sandboxPage >= totalPages - 1}
                  onClick={() => setSandboxPage(p => Math.min(totalPages - 1, p + 1))}
                  className="px-4 py-2 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODE 2 & 3: TIMED MOCK EXAM MODE --- */}
      {(mcqMode === 'exam10' || mcqMode === 'exam50') && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          {/* Exam Header with Timer & Progress */}
          <div className="bg-bg-secondary border border-border rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {mcqMode === 'exam10' ? '10-Question Quick Drill' : '50-Question AIAPGET Mock Exam'}
              </span>
              <div className="text-sm font-bold text-text-primary">
                Question {currentExamIdx + 1} of {examQuestions.length}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono font-bold text-sm border border-purple-300">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
              {!examFinished && (
                <button
                  onClick={handleFinishExam}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  Submit Exam
                </button>
              )}
            </div>
          </div>

          {!examFinished ? (
            <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              {/* Question metadata */}
              {examQuestions[currentExamIdx] && (
                <>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-bg-primary text-text-secondary border border-border">
                      {examQuestions[currentExamIdx].subject}
                    </span>
                    <span className="text-xs font-mono text-text-tertiary">
                      {examQuestions[currentExamIdx].id}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-text-primary leading-snug">
                    <span className="text-primary mr-2">Q{currentExamIdx + 1}.</span>
                    {examQuestions[currentExamIdx].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {examQuestions[currentExamIdx].options.map((opt, optIdx) => {
                      const isSelected = selectedExamAnswers[currentExamIdx] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleExamOptionSelect(optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'bg-primary/10 text-primary border-primary font-bold shadow-sm'
                              : 'bg-bg-primary text-text-secondary border-border hover:border-primary/40'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-primary text-white border-primary' : 'bg-bg-secondary border-border'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <button
                      disabled={currentExamIdx === 0}
                      onClick={() => setCurrentExamIdx(c => Math.max(0, c - 1))}
                      className="px-4 py-2.5 rounded-xl border border-border bg-bg-primary text-xs font-bold disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {currentExamIdx < examQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentExamIdx(c => Math.min(examQuestions.length - 1, c + 1))}
                        className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 shadow-sm"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishExam}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md"
                      >
                        Finish &amp; Score
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Exam Results Report */
            <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-6 shadow-xl text-center animate-fadeIn">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 w-fit rounded-full mx-auto">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                  Exam Completed!
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary">
                  Here is your final score breakdown and performance summary.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 bg-bg-primary rounded-2xl border border-border">
                <div>
                  <span className="text-[10px] uppercase font-bold text-text-tertiary block">Score</span>
                  <span className="text-xl font-mono font-bold text-primary">{examScore} / {examQuestions.length}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-text-tertiary block">Accuracy</span>
                  <span className="text-xl font-mono font-bold text-emerald-600">
                    {Math.round((examScore / examQuestions.length) * 100)}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-text-tertiary block">Attempted</span>
                  <span className="text-xl font-mono font-bold text-text-primary">
                    {Object.keys(selectedExamAnswers).length} / {examQuestions.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => startNewExam(mcqMode)}
                  className="px-5 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-primary/90 transition-all flex items-center gap-1.5"
                >
                  <RotateCw className="w-4 h-4" /> Retake Another Mock
                </button>
                <button
                  onClick={() => setMcqMode('sandbox')}
                  className="px-5 py-3 bg-bg-primary text-text-primary border border-border rounded-xl text-xs font-bold hover:bg-bg-secondary transition-all"
                >
                  Return to Sandbox Mode
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
