import { FMT_SECTION_A_CHAPTERS_PART1 } from './fmtChaptersSectionA';
import { FMT_SECTION_A_CHAPTERS_PART2 } from './fmtChaptersSectionA_Part2';
import { FMT_SECTION_A_CHAPTERS_PART3 } from './fmtChaptersSectionA_Part3';
import { FMT_SECTION_B_CHAPTERS_PART1 } from './fmtChaptersSectionB_Part1';
import { FMT_SECTION_B_CHAPTERS_PART2 } from './fmtChaptersSectionB_Part2';

export interface KeyTerm {
  term: string;
  definition: string;
  simpleExplanation?: string;
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
  phrase?: string;
  breakdown?: { letter: string; word: string; meaning: string }[];
  name?: string;
  pattern?: string;
  explanation?: string;
}

export interface CommonMistake {
  mistake: string;
  whyWrong: string;
  correctConcept: string;
}

export interface VivaQuestion {
  id?: number;
  question: string;
  answer: string;
  clinicalPearl?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
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

export type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'bulletList'; items: string[]; title?: string }
  | { type: 'flowchart'; steps: string[]; title: string }
  | { type: 'table'; title: string; headers: string[]; rows: string[][] }
  | { type: 'mnemonic'; title: string; phrase: string; explanation?: string }
  | { type: 'examTip'; text: string; priority: 'Low' | 'Medium' | 'High' }
  | { type: 'heading'; text: string; level: 2 | 3 | 4 };

export interface FMTChapterDetail {
  id: string;
  chapterNumber: number;
  title: string;
  slug?: string;
  section: string;
  module?: string;
  description?: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  bhmsYear?: string;
  examImportance?: 'Very High' | 'High' | 'Moderate' | 'Basic';
  contentStatus?: 'Draft' | 'Published';
  lastUpdated?: string;
  
  learningObjectives: string[];
  introduction: string;
  whyThisMatters: string;
  simpleExplanation: string;
  
  contentBlocks?: ContentBlock[];
  detailedNotes?: string;
  
  keyTerms: KeyTerm[];
  stepByStep: StepExplanation[];
  importantConcepts: ImportantConcept[];
  flowcharts: FlowchartData[];
  tables: TableData[];
  comparisonTables?: TableData[];
  clinicalExamples: ClinicalExample[];
  medicolegalImportance: string[];
  mnemonics: Mnemonic[];
  commonMistakes: CommonMistake[];
  importantPoints?: string[];
  highYieldPoints: string[];
  previousExamQuestions: { question: string; year: string; marks: number }[];
  importantExamQuestions?: { question: string; type: 'short' | 'long' }[];
  vivaQuestions: VivaQuestion[];
  shortNotes: { title: string; answer: string }[];
  longQuestions: { title: string; outline: string[] }[];
  mcqs: MCQ[];
  caseBasedQuestions: CaseQuestion[];
  summary: string;
  quickRevision?: {
    definition: string;
    keyPoints: string[];
  };
  priority?: 'Low' | 'Medium' | 'High' | 'Highest';
  tags?: string[];
  subtopics?: string[];
  comparisonTopics?: string[];
  relatedTopics?: string[];
  revisionSheet: string[];
  flashcards: Flashcard[];
  isComingSoon?: boolean;
}

import { FMT_FULL_STRUCTURE } from './fmtFullStructure';

export const FMT_DETAILED_CHAPTERS: FMTChapterDetail[] = FMT_FULL_STRUCTURE.map(topic => {
  // Try to find if we have detailed content for this topic in existing parts
  const existingDetailed = [
    ...FMT_SECTION_A_CHAPTERS_PART1,
    ...FMT_SECTION_A_CHAPTERS_PART2,
    ...FMT_SECTION_A_CHAPTERS_PART3,
    ...FMT_SECTION_B_CHAPTERS_PART1,
    ...FMT_SECTION_B_CHAPTERS_PART2,
  ].find(ch => ch.id === topic.id || ch.title.toLowerCase().includes(topic.title.toLowerCase()));

  if (existingDetailed) {
    return {
      ...existingDetailed,
      chapterNumber: topic.chapterNumber, // Use new numbering
      title: topic.title, // Use new title
      section: topic.section, // Use new section categorization
      isComingSoon: false // Ensure it's not marked as coming soon if we have data
    };
  }
  return topic;
});


export function getFMTChapterDetail(id: string): FMTChapterDetail | undefined {
  return FMT_DETAILED_CHAPTERS.find(ch => ch.id === id);
}
