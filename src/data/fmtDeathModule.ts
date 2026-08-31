import { FMTChapterDetail } from './fmtDetailedChapters';

const COMING_SOON_TEMPLATE = (id: string, num: number, title: string, section: string): FMTChapterDetail => ({
  id,
  chapterNumber: num,
  title,
  section,
  readTime: '10 min',
  difficulty: 'Intermediate',
  learningObjectives: ['Topic under development'],
  introduction: 'This module is currently being drafted.',
  whyThisMatters: 'Essential for BHMS exams.',
  simpleExplanation: 'Content coming soon.',
  keyTerms: [],
  stepByStep: [],
  importantConcepts: [],
  flowcharts: [],
  tables: [],
  clinicalExamples: [],
  medicolegalImportance: [],
  mnemonics: [],
  commonMistakes: [],
  highYieldPoints: [],
  previousExamQuestions: [],
  vivaQuestions: [],
  shortNotes: [],
  longQuestions: [],
  mcqs: [],
  caseBasedQuestions: [],
  summary: 'Coming soon.',
  revisionSheet: [],
  flashcards: [],
  isComingSoon: false
});

export const DEATH_MODULE_CHAPTERS: FMTChapterDetail[] = [
  {
    ...COMING_SOON_TEMPLATE('what-is-death', 7.0, 'What is Death?', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Death is the permanent cessation of all vital functions of the body.',
    detailedNotes: `
### Definition of Death
Death is not an instantaneous event but a process where various organs and tissues die at different rates.

### Somatic Death vs Molecular Death
*   **Somatic Death (Systemic Death)**: Complete and irreversible cessation of functions of the brain, heart, and lungs.
*   **Molecular Death (Cellular Death)**: Death of individual cells and tissues, occurring 2-3 hours after somatic death.

### The Tripod of Life
Bichat defined the tripod of life as the Heart, Brain, and Lungs. Failure of any one leads to death of the other two.
    `,
    medicolegalImportance: [
      'Establishing the fact of death.',
      'Issuing a death certificate.',
      'Organ transplantation legalities.'
    ],
    vivaQuestions: [
      { question: 'Define Death.', answer: 'Permanent cessation of all vital functions.', difficulty: 'Easy' },
      { question: 'What is the Tripod of Life?', answer: 'Heart, Brain, and Lungs.', difficulty: 'Easy' }
    ]
  },
  {
    ...COMING_SOON_TEMPLATE('brain-death', 7.1, 'Brain Death', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Brain death is the irreversible loss of all functions of the entire brain, including the brainstem.',
    detailedNotes: `
### Brain Death
Also known as Neurological Death. It is crucial in modern medicine due to organ transplantation.

### Criteria for Diagnosis
1.  **Deep Coma**: Unresponsiveness to painful stimuli.
2.  **Absence of Brainstem Reflexes**: Pupillary, corneal, oculocephalic, vestibular, and gag reflexes.
3.  **Apnea Test**: Absence of spontaneous respiration when CO2 levels rise.

### Legal Importance
A person is legally dead when brain death is declared, even if the heart is kept beating by machines.
    `,
    medicolegalImportance: [
      'Organ donation permission.',
      'Withdrawal of life support.',
      'Legal time of death declaration.'
    ]
  },
  {
    ...COMING_SOON_TEMPLATE('postmortem-lividity', 7.3, 'Postmortem Lividity (Livor Mortis)', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Postmortem lividity is a purplish discoloration of the skin in the dependent parts of the body due to gravitational settling of blood.',
    detailedNotes: `
### Postmortem Lividity
Also known as Livor Mortis, Postmortem Staining, or Hypostasis.

### Mechanism
When circulation stops, gravity causes blood to settle in the lowest parts of the body. Capillaries and venules become distended.

### Distribution
*   **Dependent Parts**: Back (if supine), Front (if prone).
*   **Contact Pallor**: Areas of the body in direct contact with a hard surface appear pale as blood is squeezed out.

### Fixation of Lividity
*   Starts in 1-2 hours.
*   Fully developed in 6-12 hours.
*   Once fixed, it does not shift even if the body position is changed.
    `,
    medicolegalImportance: [
      'Indicates the position of the body at the time of death.',
      'Helps estimate the time since death.',
      'Distinguishes between antemortem bruising and postmortem staining.',
      'Indicates if the body has been moved after death.'
    ],
    mnemonics: [
      { 
        title: 'Lividity Phases',
        name: 'Lividity Phases', 
        pattern: 'Settles → Stains → Fixes', 
        explanation: 'Blood settles first, then stains the skin, then fixes permanently.' 
      }
    ],
    comparisonTables: [
      {
        title: 'Postmortem Lividity vs Bruise (Contusion)',
        headers: ['Feature', 'Postmortem Lividity', 'Bruise (Contusion)'],
        rows: [
          ['Position', 'Dependent parts only', 'Anywhere on the body'],
          ['Edges', 'Clearly defined', 'Ill-defined/blurred'],
          ['Incision', 'Blood flows out easily', 'Clotted blood seen'],
          ['Washing', 'Can be washed away', 'Cannot be washed away']
        ]
      }
    ],
    vivaQuestions: [
      { question: 'What is Contact Pallor?', answer: 'Pale areas where body pressure prevented blood from settling.', difficulty: 'Medium' },
      { question: 'When does lividity become fixed?', answer: 'Usually after 8-12 hours.', difficulty: 'Medium' }
    ]
  },
  {
    ...COMING_SOON_TEMPLATE('rigor-mortis', 7.4, 'Rigor Mortis', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Rigor mortis is the postmortem stiffening of muscles due to a chemical change in the muscle fibers.',
    detailedNotes: `
### Rigor Mortis
Postmortem stiffening involves both voluntary and involuntary muscles.

### Mechanism (Chemical)
It occurs due to the depletion of **Adenosine Triphosphate (ATP)**. Without ATP, actin and myosin filaments bind together permanently, causing stiffness.

### Order of Appearance (Nysten's Law)
Usually follows a downward progression:
1.  Eyelids
2.  Lower jaw and neck
3.  Upper limbs
4.  Trunk
5.  Lower limbs

### Disappearance
It disappears in the same order it appeared, as putrefaction begins.
    `,
    comparisonTables: [
      {
        title: 'Rigor Mortis vs Cadaveric Spasm',
        headers: ['Feature', 'Rigor Mortis', 'Cadaveric Spasm'],
        rows: [
          ['Onset', 'Gradual (1-2 hours)', 'Instantaneous'],
          ['Cause', 'ATP depletion', 'Intense nervous tension'],
          ['Muscles involved', 'All muscles', 'Specific group (e.g., hand)'],
          ['Medicolegal use', 'Estimate time since death', 'Indicates mode of death (e.g., suicide)']
        ]
      }
    ],
    medicolegalImportance: [
      'Estimating the time since death.',
      'Determining the position of the body at death.',
      'Indicating that death was not instantaneous (unlike cadaveric spasm).'
    ],
    vivaQuestions: [
      { question: 'What is the chemical cause of Rigor Mortis?', answer: 'Depletion of ATP.', difficulty: 'Medium' },
      { question: 'What is Nysten\'s Law?', answer: 'The rule describing the downward order of rigor mortis development.', difficulty: 'Hard' }
    ]
  },
  {
    ...COMING_SOON_TEMPLATE('putrefaction', 7.5, 'Putrefaction', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Putrefaction is the decomposition of organic matter by bacterial and enzymatic action, resulting in the production of gases and foul odors.',
    detailedNotes: `
### Putrefaction
The final stage of decomposition.

### Signs of Putrefaction
1.  **Greenish Discoloration**: Usually starts in the Right Iliac Fossa (RIF) due to H2S reacting with hemoglobin to form Sulfhaemoglobin.
2.  **Marbling**: Linear branching patterns on the skin due to decomposition of blood in superficial veins.
3.  **Gaseous Distension**: Bloating of the face, abdomen, and scrotum.
4.  **Purging**: Fluid and gas escaping from the mouth and nose.

### Factors Affecting
*   **Temperature**: Fastest at 25-38°C.
*   **Moisture**: High moisture speeds up the process.
*   **Air**: Exposure to air speeds it up (Casper's Dictum).
    `,
    keyTerms: [
      { term: 'Casper\'s Dictum', definition: 'The ratio of decomposition in Air : Water : Earth is 1 : 2 : 8.' }
    ],
    medicolegalImportance: [
      'Confirms death.',
      'Estimates time since death (roughly).',
      'Can obscure injuries or cause of death.'
    ]
  },
  {
    ...COMING_SOON_TEMPLATE('adipocere', 7.6, 'Adipocere (Saponification)', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Adipocere is a waxy, soap-like substance formed by the chemical conversion of body fat in moist environments.',
    detailedNotes: `
### Adipocere
Also called Saponification.

### Conditions Required
*   Moisture (Damp soil or water).
*   Absence of air.
*   Presence of fat.

### Appearance
Yellowish-white, greasy, waxy substance with a rancid smell.

### Medicolegal Importance
*   **Preservation**: Preserves the body features for a long time, helping in identification.
*   **Environment**: Indicates the body was in a moist/wet environment.
    `,
    quickRevision: {
      definition: 'Adipocere is the transformation of body fat into a waxy substance in moist, anaerobic conditions.',
      keyPoints: ['Occurs in moist soil/water', 'Helps preserve features', 'Takes weeks to months']
    }
  },
  {
    ...COMING_SOON_TEMPLATE('mummification', 7.7, 'Mummification', 'Section A: Forensic Medicine'),
    simpleExplanation: 'Mummification is the desiccation (drying out) of the body, usually occurring in dry, hot, and airy environments.',
    detailedNotes: `
### Mummification
A state of natural preservation due to rapid drying.

### Conditions Required
*   Dry heat.
*   Continuous air movement.
*   Absence of moisture.

### Appearance
The skin becomes brown, hard, leathery, and parchment-like. It clings to the bones.

### Medicolegal Importance
*   **Identification**: Features are preserved for years.
*   **Injuries**: Wounds on the skin can still be recognized.
    `,
    comparisonTables: [
      {
        title: 'Adipocere vs Mummification',
        headers: ['Feature', 'Adipocere', 'Mummification'],
        rows: [
          ['Condition', 'Damp/Moist', 'Dry/Hot'],
          ['Mechanism', 'Saponification', 'Desiccation'],
          ['Appearance', 'Waxy/Greasy', 'Leathery/Dry'],
          ['Time taken', 'Weeks to Months', '3 Months to a Year']
        ]
      }
    ]
  }
];
