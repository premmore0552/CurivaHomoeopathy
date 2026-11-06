import part01 from './chauhan-question-bank/part-01.json';
import part02 from './chauhan-question-bank/part-02.json';
import part03 from './chauhan-question-bank/part-03.json';
import part04 from './chauhan-question-bank/part-04.json';
import part05 from './chauhan-question-bank/part-05.json';
import part06 from './chauhan-question-bank/part-06.json';
import part07 from './chauhan-question-bank/part-07.json';
import part08 from './chauhan-question-bank/part-08.json';
import part09 from './chauhan-question-bank/part-09.json';
import part10 from './chauhan-question-bank/part-10.json';
import part11 from './chauhan-question-bank/part-11.json';

export type ChauhanQuestionType =
  | 'single_best'
  | 'multiple_statement'
  | 'matching'
  | 'sequencing'
  | 'assertion_reason'
  | 'short_answer';

export interface ChauhanQuestion {
  id: string;
  questionNumber: number;
  chapter: string;
  subject: string;
  questionType: ChauhanQuestionType;
  prompt: string;
  options: string[];
  optionsSource: 'question' | 'shared_book_answer_code';
  answerLabel: string | null;
  correctIndex: number | null;
  answerStatus: 'keyed' | 'written_answer' | 'source_review';
  sourceAnswerText: string | null;
  explanation: string;
  examSource: string | null;
  sourcePage: number | null;
  bookPage: number | null;
  reviewFlags: string[];
  scoringEnabled: boolean;
}

const sourceParts = [
  part01, part02, part03, part04, part05, part06,
  part07, part08, part09, part10, part11
] as unknown as ChauhanQuestion[][];

export const chauhanQuestionBank: ChauhanQuestion[] = sourceParts.flat();

export const scorableChauhanQuestions = chauhanQuestionBank.filter(
  (question) => question.scoringEnabled && question.correctIndex !== null
);

export const unscoredChauhanQuestions = chauhanQuestionBank.filter(
  (question) => !question.scoringEnabled
);

export const chauhanQuestionChapters = Array.from(
  new Set(chauhanQuestionBank.map((question) => question.chapter))
).sort((a, b) => a.localeCompare(b));

export const chauhanQuestionBankStats = {
  total: chauhanQuestionBank.length,
  scorable: scorableChauhanQuestions.length,
  sourceReview: unscoredChauhanQuestions.length,
  sourcePages: 1367,
  chapters: chauhanQuestionChapters.length
};

export const chauhanSourceAttribution = {
  title: 'Solved Multiple Choice Questions: UPSC & MD Entrance Examination (Homoeopathy)',
  author: 'Dr. V. K. Chauhan',
  edition: 'Second edition, 2011',
  publisher: 'B. Jain Publishers (P) Ltd.',
  isbn: '978-81-319-1166-2',
  permission: 'Public redistribution permission confirmed by the Curiva content owner.'
} as const;
