export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
  category: string;
}

export const FMT_MCQS: MCQ[] = [
  {
    id: 'mcq-1',
    category: 'Death & Postmortem Changes',
    question: 'The most reliable sign of death among the following is:',
    options: [
      'Cessation of breathing',
      'Cessation of heart beat',
      'Rigor mortis',
      'Dilatation of pupils'
    ],
    correctAnswer: 2,
    explanation: 'Rigor mortis is a definitive (positive) sign of death, whereas cessation of breathing/heartbeat are somatic signs which can occur in suspended animation.'
  },
  {
    id: 'mcq-2',
    category: 'Death & Postmortem Changes',
    question: 'Rigor mortis first appears in:',
    options: [
      'Lower limbs',
      'Upper limbs',
      'Eyelids',
      'Abdomen'
    ],
    correctAnswer: 2,
    explanation: 'According to Nysten\'s law, rigor mortis typically follows a downward progression, starting from the small muscles of the eyelids and face, then neck, chest, upper limbs, and finally lower limbs.'
  },
  {
    id: 'mcq-3',
    category: 'Mechanical Injuries',
    question: 'A laceration with "tissue bridging" is characteristic of:',
    options: [
      'Incised wound',
      'Lacerated wound',
      'Stab wound',
      'Contusion'
    ],
    correctAnswer: 1,
    explanation: 'Tissue bridging (nerves, vessels, and fibers crossing the wound floor) is a diagnostic feature of lacerated wounds, distinguishing them from incised wounds.'
  },
  {
    id: 'mcq-4',
    category: 'Toxicology',
    question: 'The "Garlicky odor" in breath is a feature of poisoning by:',
    options: [
      'Cyanide',
      'Organophosphorus',
      'Lead',
      'Mercury'
    ],
    correctAnswer: 1,
    explanation: 'Organophosphorus compounds and Arsenic typically produce a characteristic garlicky odor in the breath and gastric contents.'
  }
];
