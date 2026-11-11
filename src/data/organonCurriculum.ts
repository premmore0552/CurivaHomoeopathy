export type OrganonYearSlug = '1st-bhms' | '2nd-bhms' | '3rd-bhms' | '4th-bhms';

export interface AphorismRange { start: number; end: number; label: string; detail?: string }
export interface CurriculumTerm { term: string; topics: string[] }
export interface OrganonYearCurriculum {
  slug: OrganonYearSlug;
  yearLabel: string;
  courseCode: string;
  pageTitle: string;
  subjectTitle: string;
  teachingHours: { lectures: number; nonLectures: number; note?: string };
  curriculumVersion: string;
  sourceUrl: string;
  sourceTitle: string;
  sourceNote: string;
  coreAphorismRanges: AphorismRange[];
  revisionAphorismRanges: AphorismRange[];
  terms: CurriculumTerm[];
  learningOutcomes: string[];
  assessment: string[];
}

export const ORGANON_CURRICULUM_YEARS: OrganonYearCurriculum[] = [
  {
    slug: '1st-bhms', yearLabel: '1st BHMS', courseCode: 'HomUG-OM-I',
    pageTitle: '1st BHMS — Organon of Medicine',
    subjectTitle: 'Organon of Medicine, Homoeopathic Philosophy and Fundamentals of Psychology',
    teachingHours: { lectures: 180, nonLectures: 100, note: 'Combined course overview: Organon 130/78 and Fundamentals of Psychology 50/22 (lecture/non-lecture hours).' },
    curriculumVersion: 'NCH First BHMS CBDC — 2 February 2024',
    sourceUrl: 'https://nch.org.in/upload/7-Organon-and-psychology-02-02-2024.pdf',
    sourceTitle: 'NCH First BHMS — Organon and Psychology',
    sourceNote: 'The combined HomUG-OM-I overview lists 180 lecture/100 non-lecture hours. Detailed tables allocate 130/78 to Organon and 50/22 to Fundamentals of Psychology. Organon aphorisms are two separate blocks: §§1–27 and §§105–145.',
    coreAphorismRanges: [
      { start: 1, end: 27, label: 'Aphorisms §§1–27', detail: 'Foundations, physician’s mission, ideal of cure and early therapeutic principles.' },
      { start: 105, end: 145, label: 'Aphorisms §§105–145', detail: 'Drug proving and the study of medicinal powers.' }
    ],
    revisionAphorismRanges: [],
    terms: [
      { term: 'Term I — History and logic', topics: ['History of medicine and development of Homoeopathy in India, the United States and Europe.', 'Life, work and contributions of Samuel Hahnemann.', 'Contributions of Boenninghausen, Hering, Kent, R. L. Dutt, M. L. Sircar and B. K. Sarkar.', 'Inductive and deductive reasoning; science and art in Homoeopathy; editions and construction of the Organon.'] },
      { term: 'Term II / III — Organon foundations', topics: ['Fundamental principles; individualistic, holistic and dynamic concepts.', 'Life, health, disease and cure; vital force and the law of cure.', 'Aphorisms §§1–27 and §§105–145 as distinct syllabus blocks.', 'Physician: purpose, qualities, duties and knowledge; drug proving.'] },
      { term: 'Fundamentals of Psychology', topics: ['Introduction to psychology, schools of psychology and Hahnemann’s concept of mind.', 'Cognition, affect and conation; conscious and unconscious processes; thought, feeling, behaviour, instincts and reflexes.', 'Attention, perception, memory, thinking, intelligence, motivation, learning and adaptation.', 'Growth and development, personality, traits, temperament and applied psychology.'] }
    ],
    learningOutcomes: ['Explain major milestones in the history of medicine and Homoeopathy.', 'Describe Hahnemann’s contributions and the work of important Homoeopathic stalwarts.', 'Explain fundamental principles and historical-philosophical concepts of health, disease and cure.', 'Use introductory inductive and deductive logic when studying Organon concepts.', 'Explain the physician’s mission and the purpose and ethics of drug proving.', 'Describe the prescribed fundamentals of psychology and relate them to clinical learning.'],
    assessment: ['Use NCH-mapped MCQ, short-answer, long-answer, quiz and viva formats where prescribed.', 'Use assignments, seminars, group work and supervised learning activities as mapped in the CBDC.']
  },
  {
    slug: '2nd-bhms', yearLabel: '2nd BHMS', courseCode: 'HomUG-OM-II',
    pageTitle: '2nd BHMS — Organon of Medicine', subjectTitle: 'Organon of Medicine and Homoeopathic Philosophy',
    teachingHours: { lectures: 150, nonLectures: 100 },
    curriculumVersion: 'NCH Second BHMS CBDC — 18 May 2024',
    sourceUrl: 'https://nch.org.in/upload/3-Organon-BHMS-II-CBDC-final-18-05-24.pdf',
    sourceTitle: 'NCH Second BHMS — Organon of Medicine and Homoeopathic Philosophy',
    sourceNote: 'Second BHMS covers §§28–104. The curriculum separates topics by term, including §§28–51 and §§71–103 in Term I, followed by §104 and §§52–70 in Term II.',
    coreAphorismRanges: [{ start: 28, end: 104, label: 'Aphorisms §§28–104', detail: 'Natural/artificial disease, therapeutic law, disease classification, case taking, record keeping and systems of medicine.' }],
    revisionAphorismRanges: [],
    terms: [
      { term: 'Term I — Disease and case taking', topics: ['Natural disease versus artificial disease — §§28–33.', 'Correctness of the Homoeopathic therapeutic law of nature — §§34–51.', 'Hahnemannian classification of disease and introduction to miasms — §§71–82.', 'Case taking — §§83–103.'] },
      { term: 'Term II — Systems and record keeping', topics: ['Various systems of medicine — §§52–70.', 'Record keeping — §104.', 'Symptomatology, analysis, evaluation, totality and susceptibility.', 'Causation, individuality, anamnesis, disease progress and introduction to suppression.'] }
    ],
    learningOutcomes: ['Differentiate natural disease and artificial disease in the Organon framework.', 'Explain the therapeutic law and compare systems of medicine described in the syllabus.', 'Describe Hahnemannian disease classification and the introduction to miasms.', 'Demonstrate structured case taking and record keeping.', 'Analyse symptoms and explain totality, susceptibility, causation and suppression.'],
    assessment: ['Use NCH-mapped theory and non-lecture learning activities.', 'Integrate case-based learning, tutorials, assignments, group discussion and supervised clinical exposure as prescribed.']
  },
  {
    slug: '3rd-bhms', yearLabel: '3rd BHMS', courseCode: 'HomUG-OM-III',
    pageTitle: '3rd BHMS — Organon of Medicine', subjectTitle: 'Organon of Medicine and Homoeopathic Philosophy',
    teachingHours: { lectures: 150, nonLectures: 50 },
    curriculumVersion: 'NCH Third BHMS CBDC — Organon of Medicine and Homoeopathic Philosophy',
    sourceUrl: 'https://nch.org.in/upload/Organon%20of%20Medicine%20and%20Homeopathic%20Philosophy.pdf',
    sourceTitle: 'NCH Third BHMS — Organon of Medicine and Homoeopathic Philosophy',
    sourceNote: 'Third year adds §§146–209 and §§231–294, including footnotes, and requires revision of aphorisms studied in first and second BHMS.',
    coreAphorismRanges: [
      { start: 146, end: 209, label: 'Aphorisms §§146–209', detail: 'Actions of medicines and management of acute, chronic, surgical, one-sided and epidemic diseases.' },
      { start: 231, end: 294, label: 'Aphorisms §§231–294', detail: 'Intermittent diseases, repetition, follow-up, pharmacy, administration, diet, regimen and auxiliary measures.' }
    ],
    revisionAphorismRanges: [{ start: 1, end: 70, label: 'Revision §§1–70' }, { start: 71, end: 145, label: 'Revision §§71–145' }],
    terms: [
      { term: 'Term I — Medicine action and disease management', topics: ['Hahnemann’s Preface and Introduction to the Organon.', 'Actions of medicines and points necessary for cure — §§146–149.', 'Management of acute, chronic, surgical, one-sided, epidemic and other diseases — §§150–209.', 'Revision of aphorisms §§1–70.', 'Hahnemann’s Theory of Chronic Diseases.'] },
      { term: 'Term II — Follow-up, pharmacy and regimen', topics: ['Management of diseases — §§231–244.', 'Repetition, follow-up and prejudice in prescription — §§245–258.', 'Diet, regimen and auxiliary measures — §§259–263 and §§285–291.', 'Pharmacy, routes of administration and fundamental laws — §§264–285.', 'Susceptibility, idiosyncrasy, palliation, suppression, remedy reaction, second prescription and posology.', 'J. H. Allen’s chronic miasms; revision of §§71–145.'] }
    ],
    learningOutcomes: ['Correlate prescribed Organon concepts with supervised clinical learning.', 'Explain syllabus sections on action of medicines, disease management and administration.', 'Discuss follow-up, palliation, suppression, auxiliary management, diet and regimen.', 'Explain susceptibility, posology and remedy-reaction concepts in their historical context.', 'Describe Hahnemann’s theory of chronic diseases and the prescribed work of J. H. Allen.'],
    assessment: ['Use NCH-mapped MCQ, short-answer, long-answer and viva formats.', 'Use case-based learning, seminars, tutorials, assignments and supervised clinical integration.']
  },
  {
    slug: '4th-bhms', yearLabel: '4th BHMS', courseCode: 'HomUG-OM-IV',
    pageTitle: '4th BHMS — Organon of Medicine', subjectTitle: 'Organon of Medicine and Homoeopathic Philosophy',
    teachingHours: { lectures: 100, nonLectures: 75 },
    curriculumVersion: 'NCH Fourth BHMS CBDC — 7 May 2026',
    sourceUrl: 'https://nch.org.in/upload/Organon%20CBDC-4BHMS-7.05.2026.pdf',
    sourceTitle: 'NCH Fourth BHMS — Organon of Medicine and Homoeopathic Philosophy',
    sourceNote: 'The NCH PDF has a boundary discrepancy between tables. The term summary lists §§71–103, §§104–145 and §§145–209; the detailed teaching-hours table lists §§71–104, §§105–145 and §§146–209. This page follows the detailed teaching-hours table and flags the discrepancy for faculty confirmation.',
    coreAphorismRanges: [{ start: 210, end: 230, label: 'Aphorisms §§210–230', detail: 'The explicitly listed new fourth-year aphorism block, including footnotes.' }],
    revisionAphorismRanges: [
      { start: 1, end: 70, label: 'Revision §§1–70' },
      { start: 71, end: 104, label: 'Revision §§71–104 (detailed table)' },
      { start: 105, end: 145, label: 'Revision §§105–145 (detailed table)' },
      { start: 146, end: 209, label: 'Revision §§146–209 (detailed table)' },
      { start: 231, end: 294, label: 'Revision §§231–294' }
    ],
    terms: [
      { term: 'Term I — Mental diseases and clinical integration', topics: ['Aphorisms §§210–230, including footnotes.', 'Revision of aphorisms §§1–70, §§71–104 and §§105–145.', 'Case taking, symptomatology and value of symptoms.', 'Formation of the portrait of disease.', 'Susceptibility and miasm; posology and remedy reaction.'] },
      { term: 'Term II — Prescribed philosophy texts', topics: ['Revision of aphorisms §§146–209 and §§231–294, including footnotes.', 'Revision of prescribed chapters of Kent’s philosophy.', 'Revision of prescribed chapters of Stuart Close’s philosophy.', 'Revision of prescribed chapters of H. A. Roberts’ philosophy.'] }
    ],
    learningOutcomes: ['Define and classify mental diseases as described in §§210–230 with footnotes.', 'Integrate the historical Organon concept of disease with a biopsychosocial perspective.', 'Demonstrate structured case taking, symptom classification and formation of a disease portrait.', 'Explain susceptibility, miasm, posology and remedy reaction in the syllabus context.', 'Revise designated aphorism blocks and prescribed chapters of Kent, Stuart Close and H. A. Roberts.'],
    assessment: ['NCH content-mapping tables include MCQ, short-answer, long-answer and viva formats.', 'The curriculum includes clinical integration, demonstrations, seminars/tutorials and problem- or case-based learning.']
  }
];

export const ORGANON_CURRICULUM_HUB_PATH = '/organon-philosophy';
export const ORGANON_LEGACY_LIBRARY_PATH = '/organon-library';

export function getOrganonYear(slug: string | undefined): OrganonYearCurriculum | undefined {
  return ORGANON_CURRICULUM_YEARS.find((year) => year.slug === slug);
}
