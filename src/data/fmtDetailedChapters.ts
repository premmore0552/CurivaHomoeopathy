import { FMT_SECTION_A_CHAPTERS_PART1 } from './fmtChaptersSectionA';
import { FMT_SECTION_A_CHAPTERS_PART2 } from './fmtChaptersSectionA_Part2';
import { FMT_SECTION_A_CHAPTERS_PART3 } from './fmtChaptersSectionA_Part3';
import { FMT_SECTION_B_CHAPTERS_PART1 } from './fmtChaptersSectionB_Part1';
import { FMT_SECTION_B_CHAPTERS_PART2 } from './fmtChaptersSectionB_Part2';

export interface KeyTerm {
  term: string;
  definition: string;
  simpleExplanation: string;
}

export interface ImportantConcept {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'tip' | 'legal';
}

export interface StepExplanation {
  stepNumber: number;
  title: string;
  description: string;
  keyTakeaway: string;
}

export interface FlowchartStep {
  label: string;
  description: string;
}

export interface FlowchartData {
  title: string;
  description: string;
  steps: FlowchartStep[];
}

export interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ClinicalExample {
  title: string;
  scenario: string;
  analysis: string;
  takeaway: string;
}

export interface Mnemonic {
  title: string;
  phrase: string;
  breakdown: { letter: string; word: string; meaning: string }[];
}

export interface CommonMistake {
  mistake: string;
  whyWrong: string;
  correctConcept: string;
}

export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  clinicalPearl?: string;
}

export interface MCQ {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  highYieldTag?: string;
}

export interface CaseQuestion {
  id: number;
  title: string;
  scenario: string;
  questions: string[];
  solution: string;
  legalSections?: string[];
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

export interface FMTChapterDetail {
  id: string;
  chapterNumber: number;
  title: string;
  section: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  learningObjectives: string[];
  introduction: string;
  whyThisMatters: string;
  simpleExplanation: string;
  keyTerms: KeyTerm[];
  stepByStep: StepExplanation[];
  importantConcepts: ImportantConcept[];
  flowcharts: FlowchartData[];
  tables: TableData[];
  clinicalExamples: ClinicalExample[];
  medicolegalImportance: string[];
  mnemonics: Mnemonic[];
  commonMistakes: CommonMistake[];
  highYieldPoints: string[];
  previousExamQuestions: { question: string; year: string; marks: number }[];
  vivaQuestions: VivaQuestion[];
  shortNotes: { title: string; answer: string }[];
  longQuestions: { title: string; outline: string[] }[];
  mcqs: MCQ[];
  caseBasedQuestions: CaseQuestion[];
  summary: string;
  revisionSheet: string[];
  flashcards: Flashcard[];
}

export const FMT_DETAILED_CHAPTERS: FMTChapterDetail[] = [
  ...FMT_SECTION_A_CHAPTERS_PART1,
  ...FMT_SECTION_A_CHAPTERS_PART2,
  ...FMT_SECTION_A_CHAPTERS_PART3,
  ...FMT_SECTION_B_CHAPTERS_PART1,
  ...FMT_SECTION_B_CHAPTERS_PART2,
];

export function getFMTChapterDetail(id: string): FMTChapterDetail | undefined {
  return FMT_DETAILED_CHAPTERS.find(ch => ch.id === id);
}
