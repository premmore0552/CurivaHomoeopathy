import { FMTChapterDetail } from '../fmtDetailedChapters';

export const DEATH_MODULE: FMTChapterDetail[] = [
  {
    id: 'death-basics',
    chapterNumber: 1,
    title: 'Death',
    slug: 'death',
    section: 'Section A: Forensic Medicine',
    module: 'Death & Postmortem Changes',
    readTime: '8 min',
    studyTime: '10 min',
    difficulty: 'Beginner',
    examImportance: 'Very High',
    contentStatus: 'Published',
    lastUpdated: '2026-08-31',
    
    learningObjectives: [
      'Define death from a forensic perspective',
      'Understand the transition from somatic to molecular death',
      'Identify the medicolegal significance of diagnosing death'
    ],
    
    introduction: 'Death is not a momentary event but a gradual process of cellular extinction. In forensic medicine, understanding this process is critical for determining the time since death and the nature of the event.',
    whyThisMatters: 'Accurately diagnosing death is the first step in any forensic investigation and has profound legal, social, and medical consequences.',
    simpleExplanation: 'Death is the permanent stopping of all vital functions (breathing, heartbeat, and brain activity). It happens in stages, starting with the person as a whole and ending with individual cells.',
    
    contentBlocks: [
      { type: 'heading', text: 'Definition of Death', level: 2 },
      { type: 'paragraph', text: 'Death is defined as the permanent and irreversible cessation of the functions of the three vital systems of the body, often referred to as "Bichat\'s Tripod of Life":' },
      { type: 'bulletList', items: [
        'Circulatory System (Heart)',
        'Respiratory System (Lungs)',
        'Nervous System (Brain)'
      ]},
      { type: 'heading', text: 'The Two Stages of Death', level: 2 },
      { type: 'paragraph', text: 'Forensic medicine recognizes two distinct stages in the process of dying:' },
      { type: 'table', title: 'Somatic vs. Molecular Death', headers: ['Feature', 'Somatic Death (Systemic)', 'Molecular Death (Cellular)'], rows: [
        ['Definition', 'Cessation of vital functions as a whole.', 'Cessation of individual cell life.'],
        ['Timeframe', 'Occurs immediately.', 'Occurs 1-3 hours after somatic death.'],
        ['Reversibility', 'Irreversible once brain death occurs.', 'Absolutely irreversible.'],
        ['Significance', 'Legal death of the person.', 'Organs lose viability for transplant.']
      ]},
      { type: 'heading', text: 'Medicolegal Importance', level: 2 },
      { type: 'bulletList', items: [
        'Determination of the moment of death for inheritance and insurance.',
        'Prerequisite for conducting a medicolegal autopsy.',
        'Organ transplantation protocols.',
        'Criminal liability in cases of homicide or negligence.'
      ]},
      { type: 'examTip', text: 'Remember: Somatic death precedes molecular death. Tissues like muscles and nerves may still respond to stimuli (e.g., electrical) for a short period after systemic death.', priority: 'High' }
    ],
    
    keyTerms: [
      { term: 'Somatic Death', definition: 'The complete and irreversible cessation of the functions of the brain, heart, and lungs.' },
      { term: 'Molecular Death', definition: 'The death of individual cells and tissues, which happens gradually after somatic death.' }
    ],
    stepByStep: [],
    importantConcepts: [
      { title: 'Bichat\'s Tripod', content: 'The heart, lungs, and brain are interdependent. If one fails permanently, the others follow, leading to death.', type: 'info' }
    ],
    flowcharts: [
      {
        title: 'The Process of Death',
        description: 'From vital failure to cellular extinction',
        steps: [
          { label: 'Cessation of Vital Functions', description: 'Heart, Lungs, or Brain stops working.' },
          { label: 'Somatic Death', description: 'The person is legally dead.' },
          { label: 'Progressive Cellular Hypoxia', description: 'Cells run out of oxygen.' },
          { label: 'Molecular Death', description: 'All cells and tissues cease function.' }
        ]
      }
    ],
    tables: [],
    clinicalExamples: [],
    medicolegalImportance: [
      'Legal certification of death',
      'Inheritance and property rights',
      'Criminal investigation start point'
    ],
    mnemonics: [],
    commonMistakes: [
      { mistake: 'Thinking death is an instant event.', whyWrong: 'It is a process that takes time at the cellular level.', correctConcept: 'Death is a gradual transition from somatic to molecular stages.' }
    ],
    highYieldPoints: [
      'Bichat\'s Tripod: Heart, Lungs, Brain.',
      'Molecular death occurs 2-3 hours after somatic death.',
      'Transplantable organs must be harvested before molecular death.'
    ],
    previousExamQuestions: [
      { question: 'Define Death and explain its stages.', year: '2021', marks: 5 }
    ],
    vivaQuestions: [
      { question: 'What is Bichat\'s Tripod of life?', answer: 'It refers to the three vital systems: Nervous (Brain), Circulatory (Heart), and Respiratory (Lungs).' },
      { question: 'Can a person be somatic dead but have moving muscles?', answer: 'Yes, in the period between somatic and molecular death, muscles may show "supravital" reactions to electrical stimuli.' }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Which of the following constitutes Bichat\'s Tripod of Life?',
        options: ['Heart, Lungs, Brain', 'Heart, Lungs, Liver', 'Brain, Kidney, Heart', 'Lungs, Brain, Kidney'],
        correctIndex: 0,
        explanation: 'Bichat\'s Tripod consists of the circulatory, respiratory, and nervous systems.'
      }
    ],
    caseBasedQuestions: [],
    summary: 'Death is the irreversible cessation of brain, heart, and lung functions. It proceeds from a systemic level (somatic) to a cellular level (molecular).',
    revisionSheet: [
      'Death = Irreversible stop of Brain, Heart, Lungs.',
      'Somatic Death = Person dead.',
      'Molecular Death = Cells dead (1-3 hrs later).',
      'Supravital period = Time between Somatic and Molecular death.'
    ],
    flashcards: [
      { id: 1, front: 'What is Somatic Death?', back: 'Cessation of the tripod of life (Brain, Heart, Lungs).', category: 'Basics' }
    ]
  },
  {
    id: 'types-of-death',
    chapterNumber: 2,
    title: 'Types of Death',
    section: 'Section A: Forensic Medicine',
    module: 'Death & Postmortem Changes',
    readTime: '5 min',
    studyTime: '7 min',
    difficulty: 'Beginner',
    examImportance: 'Moderate',
    contentStatus: 'Published',
    
    learningObjectives: ['Classify different types of death'],
    introduction: 'In forensic practice, death is classified based on its nature and clinical presentation.',
    whyThisMatters: 'Classification helps determine if a case requires a medicolegal autopsy.',
    simpleExplanation: 'Death can be natural (old age/disease) or unnatural (accident/crime). It can also be divided into systemic and cellular stages.',
    
    contentBlocks: [
      { type: 'heading', text: 'Classification', level: 2 },
      { type: 'bulletList', title: 'By Etiology', items: ['Natural Death: Due to disease or natural aging.', 'Unnatural Death: Due to trauma, poisoning, drowning, etc.'] },
      { type: 'bulletList', title: 'By Clinical Stage', items: ['Somatic Death', 'Molecular Death'] }
    ],
    
    keyTerms: [],
    stepByStep: [],
    importantConcepts: [],
    flowcharts: [],
    tables: [],
    clinicalExamples: [],
    medicolegalImportance: ['Determining the need for police investigation.'],
    mnemonics: [],
    commonMistakes: [],
    highYieldPoints: ['Unnatural death ALWAYS requires a medicolegal autopsy.'],
    previousExamQuestions: [],
    vivaQuestions: [],
    mcqs: [],
    caseBasedQuestions: [],
    summary: 'Death is broadly classified into natural and unnatural, and progresses through somatic and molecular stages.',
    revisionSheet: [],
    flashcards: []
  },
  {
    id: 'apparent-death',
    chapterNumber: 3,
    title: 'Apparent Death',
    section: 'Section A: Forensic Medicine',
    module: 'Death & Postmortem Changes',
    readTime: '6 min',
    studyTime: '8 min',
    difficulty: 'Intermediate',
    examImportance: 'High',
    contentStatus: 'Published',
    
    learningObjectives: ['Define Apparent Death (Suspended Animation)', 'Identify conditions leading to it', 'Understand forensic significance'],
    introduction: 'Apparent death, also known as suspended animation, is a state where the vital functions are at such a low level that they are not detectable by ordinary clinical means.',
    whyThisMatters: 'It is a forensic nightmare as it can lead to premature burial or declaration of death.',
    simpleExplanation: 'A person looks dead because their breathing and heartbeat are so weak they can\'t be felt, but they are actually still alive.',
    
    contentBlocks: [
      { type: 'heading', text: 'Conditions Leading to Apparent Death', level: 2 },
      { type: 'bulletList', items: [
        'Drowning (especially in cold water)',
        'Hypothermia',
        'Electrocution',
        'Drug overdose (Barbiturates, Narcotics)',
        'Newborn babies (Asphyxia neonatorum)',
        'Deep Yoga/Meditation states',
        'Cholera (Extreme dehydration)'
      ]},
      { type: 'heading', text: 'Medicolegal Significance', level: 2 },
      { type: 'paragraph', text: 'The main significance is the risk of "Premature Burial". A person in this state must be resuscitated until definitive signs of death (like rigor mortis or decomposition) appear.' }
    ],
    
    keyTerms: [
      { term: 'Suspended Animation', definition: 'A state of apparent death where metabolic activity is extremely low but life persists.' }
    ],
    stepByStep: [],
    importantConcepts: [],
    flowcharts: [],
    tables: [],
    clinicalExamples: [],
    medicolegalImportance: ['Avoiding premature declaration of death.'],
    mnemonics: [],
    commonMistakes: [],
    highYieldPoints: ['Always wait for positive signs of death before signing a certificate in doubtful cases.'],
    previousExamQuestions: [{ question: 'What is Suspended Animation? Give its medicolegal importance.', year: '2019', marks: 3 }],
    vivaQuestions: [
      { question: 'Give two examples of suspended animation.', answer: 'Drowning in cold water and electrocution.' }
    ],
    mcqs: [],
    caseBasedQuestions: [],
    summary: 'Apparent death is a reversible state of low vital function that mimics death.',
    revisionSheet: [],
    flashcards: []
  },
  {
    id: 'brain-death',
    chapterNumber: 4,
    title: 'Brain Death',
    section: 'Section A: Forensic Medicine',
    module: 'Death & Postmortem Changes',
    readTime: '10 min',
    studyTime: '12 min',
    difficulty: 'Advanced',
    examImportance: 'Very High',
    contentStatus: 'Published',
    
    learningObjectives: ['Define Brain Death', 'Understand the Harvard Criteria', 'Distinguish Brain Death from PVS'],
    introduction: 'With modern life-support, the heart and lungs can be kept functioning even if the brain is dead. This necessitates a specific definition for Brain Death.',
    whyThisMatters: 'Critical for organ transplantation and withdrawing life support.',
    simpleExplanation: 'Brain death is when the brain and brainstem stop working forever, even if machines are keeping the heart beating.',
    
    contentBlocks: [
      { type: 'heading', text: 'Types of Brain Death', level: 2 },
      { type: 'bulletList', items: [
        'Cortical Death: Loss of higher functions (consciousness).',
        'Brainstem Death: Loss of vital reflexes (breathing, swallowing).',
        'Whole Brain Death: Irreversible loss of function of the entire intracranial contents.'
      ]},
      { type: 'heading', text: 'Criteria (Harvard)', level: 2 },
      { type: 'bulletList', items: [
        'Unreceptivity and Unresponsivity.',
        'No movements or breathing (Apnea test).',
        'No reflexes (fixed dilated pupils, no corneal reflex).',
        'Flat EEG (isoelectric) for 24 hours.'
      ]},
      { type: 'table', title: 'Brain Death vs. Persistent Vegetative State (PVS)', headers: ['Feature', 'Brain Death', 'PVS'], rows: [
        ['Brain Function', 'Total loss (Cortex + Stem)', 'Stem survives, Cortex dead'],
        ['Breathing', 'Requires Ventilator', 'Spontaneous'],
        ['Outcome', 'Irreversible / Death', 'May survive for years'],
        ['Legal Status', 'Legally Dead', 'Legally Alive']
      ]}
    ],
    
    keyTerms: [],
    stepByStep: [],
    importantConcepts: [],
    flowcharts: [],
    tables: [],
    clinicalExamples: [],
    medicolegalImportance: ['Organ donation (THOA Act in India).'],
    mnemonics: [],
    commonMistakes: [],
    highYieldPoints: ['In Brainstem death, spontaneous respiration is lost.'],
    previousExamQuestions: [{ question: 'Short note on Brain Death.', year: '2022', marks: 5 }],
    vivaQuestions: [],
    mcqs: [],
    caseBasedQuestions: [],
    summary: 'Brain death is the irreversible cessation of all brain functions, marking legal death in many jurisdictions.',
    revisionSheet: [],
    flashcards: []
  },
  {
    id: 'algor-mortis',
    chapterNumber: 5,
    title: 'Algor Mortis',
    section: 'Section A: Forensic Medicine',
    module: 'Death & Postmortem Changes',
    readTime: '12 min',
    studyTime: '15 min',
    difficulty: 'Intermediate',
    examImportance: 'Very High',
    contentStatus: 'Published',
    
    learningObjectives: ['Define Algor Mortis', 'Understand the mechanism of cooling', 'Estimate Time Since Death (TSD) using cooling'],
    introduction: 'Algor mortis is the cooling of the body after death. It is one of the most reliable methods for estimating the time since death in the early postmortem period.',
    whyThisMatters: 'It helps investigators narrow down the time of death, which is crucial for verifying alibis and reconstructing events.',
    simpleExplanation: 'After death, the body stops producing heat. Like any warm object in a cooler room, it gradually cools down until it reaches the temperature of its surroundings.',
    
    contentBlocks: [
      { type: 'heading', text: 'Mechanism of Cooling', level: 2 },
      { type: 'paragraph', text: 'Cooling occurs through radiation, conduction, and convection. The "Curve of Cooling" is initially slow, then rapid, and then slow again (Sigmoid or S-shaped curve).' },
      { type: 'heading', text: 'Methods of Measurement', level: 2 },
      { type: 'bulletList', items: [
        'Instrument: Chemical Thermometer (10-12 inches long, range 0-50°C).',
        'Site: Rectum (ideal), Deep under the Liver, or External Auditory Meatus.'
      ]},
      { type: 'heading', text: 'Postmortem Caloricity', level: 2 },
      { type: 'examTip', text: 'Postmortem Caloricity is a state where the body temperature actually RISES for a few hours after death instead of falling. Occurs in cases like Tetanus, Strychnine poisoning, Septicemia, and Heatstroke.', priority: 'High' },
      { type: 'table', title: 'Factors Affecting Cooling', headers: ['Factor', 'Effect on Cooling Rate'], rows: [
        ['Environment Temp', 'Higher temp = Slower cooling'],
        ['Build (Obesity)', 'Fat is an insulator = Slower cooling'],
        ['Clothing', 'Thick clothes = Slower cooling'],
        ['Medium (Air vs Water)', 'Cooling in water is 2x faster than air'],
        ['Age (Infants)', 'Large surface area = Faster cooling']
      ]}
    ],
    
    keyTerms: [
      { term: 'Algor Mortis', definition: 'The postmortem cooling of the body.' },
      { term: 'Postmortem Caloricity', definition: 'Initial rise in body temperature after death.' }
    ],
    stepByStep: [],
    importantConcepts: [],
    flowcharts: [
      {
        title: 'Estimating Time Since Death',
        description: 'Using the Rule of Thumb',
        steps: [
          { label: 'Normal Body Temp', description: '37°C' },
          { label: 'Rate of Cooling', description: 'Approx 0.5 - 0.7°C per hour (Indian conditions)' },
          { label: 'Calculation', description: '(Normal Temp - Rectal Temp) / Rate = Hours since death' }
        ]
      }
    ],
    tables: [],
    clinicalExamples: [],
    medicolegalImportance: ['Estimation of Time Since Death (TSD).'],
    mnemonics: [],
    commonMistakes: [
      { mistake: 'Assuming cooling starts immediately at a fast rate.', whyWrong: 'There is often a "temperature plateau" for 1-3 hours where the body temp doesn\'t drop much.', correctConcept: 'Sigmoid curve of cooling.' }
    ],
    highYieldPoints: [
      'Rectal temperature is the gold standard.',
      'Glaister\'s Formula: (98.4 - Rectal Temp) / 1.5 = Hours since death.',
      'Postmortem caloricity is seen in Tetanus and Pontine hemorrhage.'
    ],
    previousExamQuestions: [{ question: 'Discuss Algor Mortis and factors affecting it.', year: '2020', marks: 10 }],
    vivaQuestions: [
      { question: 'What is the "Rule of thumb" for cooling?', answer: 'In temperate climates, the body cools by approx 1.5°F (0.8°C) per hour.' }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Postmortem caloricity is seen in all of the following EXCEPT:',
        options: ['Tetanus', 'Heat Stroke', 'Pontine Hemorrhage', 'Cholera'],
        correctIndex: 3,
        explanation: 'Cholera causes extreme dehydration and cold clammy skin (apparent death), not caloricity.'
      }
    ],
    caseBasedQuestions: [],
    summary: 'Algor mortis is the cooling of the body after death, used to estimate the time since death. Rate is affected by clothing, build, and environment.',
    revisionSheet: [],
    flashcards: []
  }
];
