import type { ChauhanQuestion } from './chauhanQuestionBank';

const questionPartLoaders: Array<() => Promise<ChauhanQuestion[]>> = [
  () => import('./chauhan-question-bank/part-01.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-02.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-03.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-04.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-05.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-06.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-07.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-08.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-09.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-10.json').then((module) => module.default as unknown as ChauhanQuestion[]),
  () => import('./chauhan-question-bank/part-11.json').then((module) => module.default as unknown as ChauhanQuestion[]),
];

export const chauhanQuestionBankStats = {
  total: 3196,
  scorable: 3100,
  sourceReview: 96,
  sourcePages: 1367,
  chapters: 18,
} as const;

export const chauhanQuestionChapters = [
  'Anatomy',
  'Case Taking and Repertory',
  'Community Medicine',
  'Forensic Medicine and Toxicology',
  'Homeopathic Pharmacy',
  'Materia Medica',
  'Obstetrics and Gynecology',
  'Organon of Medicine & Homeopathic Philosophy',
  'Pathology including Microbiology and Parasitology',
  'Physiology and Biochemistry',
  'Practice of Medicine, Pediatrics and Radiology',
  'Question Paper NHMC 2008',
  'Question Paper RPSC 2008',
  'Question Paper UPSC 2008',
  'Screening Test – UPSC 2001 Solved Questions',
  'Surgery, Orthopedic, Eye, ENT and Dental',
  'Unclassified',
  'Various Institutes and Organizations of Homeopathy in India',
] as const;

export const chauhanSourceAttribution = {
  title: 'Solved Multiple Choice Questions: UPSC & MD Entrance Examination (Homoeopathy)',
  author: 'Dr. V. K. Chauhan',
  edition: 'Second edition, 2011',
  publisher: 'B. Jain Publishers (P) Ltd.',
  isbn: '978-81-319-1166-2',
  permission: 'Public redistribution permission confirmed by the Curiva content owner.',
} as const;

export async function loadChauhanQuestionBank(
  onPartLoaded?: (loadedParts: number, totalParts: number) => void,
): Promise<ChauhanQuestion[]> {
  let loadedParts = 0;
  const loaded = await Promise.all(
    questionPartLoaders.map(async (loadPart) => {
      const questions = await loadPart();
      loadedParts += 1;
      onPartLoaded?.(loadedParts, questionPartLoaders.length);
      return questions;
    }),
  );
  return loaded.flat();
}
