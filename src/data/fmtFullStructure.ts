import { FMTChapterDetail } from './fmtDetailedChapters';
import { DEATH_MODULE_CHAPTERS } from './fmtDeathModule';

const COMING_SOON_TEMPLATE = (id: string, num: number, title: string, section: string): FMTChapterDetail => ({
  id,
  chapterNumber: num,
  title,
  section,
  readTime: 'Coming Soon',
  difficulty: 'Beginner',
  learningObjectives: ['Topic under development'],
  introduction: 'This module is currently being drafted by our editorial board. It will include detailed notes, flowcharts, and interactive MCQs.',
  whyThisMatters: 'Essential part of the NCH CBDC syllabus.',
  simpleExplanation: 'Content for this chapter is coming soon.',
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
  isComingSoon: true
});

export const FMT_FULL_STRUCTURE: FMTChapterDetail[] = [
  // SECTION A: FORENSIC MEDICINE
  {
    ...COMING_SOON_TEMPLATE('legal-procedure', 1, 'Legal Procedure', 'Section A: Forensic Medicine'),
    introduction: 'Complete guide to legal procedures in forensic medicine. Includes: Introduction, Medical Jurisprudence, Inquest (Police, Magistrate, Coroner), Courts (Criminal, Civil), Summons/Subpoena, Medical Evidence, Witnesses, and Conduct of Doctor in Court.',
    learningObjectives: ['Understand the hierarchy of courts', 'Differentiate between types of inquests', 'Master the procedure of giving medical evidence'],
    isComingSoon: false // We have partial data
  },
  {
    ...COMING_SOON_TEMPLATE('medical-jurisprudence', 2, 'Medical Jurisprudence', 'Section A: Forensic Medicine'),
    introduction: 'In-depth study of medical law and ethics. Includes: Medical Council, Ethics, Doctor-Patient Relationship, Professional Misconduct, Medical Records, Consent (Types, Minors, Emergencies), Medical Negligence, Consumer Protection, and Biomedical Waste.',
    learningObjectives: ['Define professional misconduct', 'Understand the legalities of consent', 'Explain medical negligence and consumer protection'],
    isComingSoon: false // We have partial data
  },
  {
    ...COMING_SOON_TEMPLATE('identification', 3, 'Identification', 'Section A: Forensic Medicine'),
    introduction: 'The science of establishing identity. Includes: Race, Sex, Age, Stature, Scars, Tattoos, Fingerprints (Dactylography), Footprints, and Superimposition. Priority focus on Age estimation and Sex determination.',
    learningObjectives: ['Master sex determination from skeletal remains', 'Estimate age from dental and skeletal markers', 'Understand fingerprint classification'],
    isComingSoon: false // We have partial data
  },
  {
    ...COMING_SOON_TEMPLATE('forensic-osteology', 4, 'Forensic Osteology', 'Section A: Forensic Medicine'),
    introduction: 'Practical identification points for individual bones. Covers Skull, Mandible, Pelvis, Femur, Humerus, Tibia, Fibula, Radius, Ulna, Clavicle, Scapula, Sternum, and Sacrum. Includes Side, Sex, Age, and Stature determination for each.',
    learningObjectives: ['Identify side and sex of major bones', 'Determine age from ossification centers', 'Estimate stature using long bones']
  },
  {
    ...COMING_SOON_TEMPLATE('dna-profiling', 5, 'DNA Profiling', 'Section A: Forensic Medicine'),
    introduction: 'Molecular identification techniques. Includes DNA basics, typing, profiling, evidence collection, and medicolegal importance in paternity and criminal cases.',
    learningObjectives: ['Explain DNA fingerprinting applications', 'Understand the chain of custody for DNA evidence']
  },
  {
    ...COMING_SOON_TEMPLATE('medicolegal-autopsy', 6, 'Medicolegal Autopsy', 'Section A: Forensic Medicine'),
    introduction: 'Postmortem examination procedures. Covers types of autopsy, external and internal examination, preservation of viscera, fetal autopsy, exhumation, and postmortem artefacts.',
    learningObjectives: ['Describe the steps of a medicolegal autopsy', 'Learn viscera preservation techniques', 'Understand exhumation legalities'],
    isComingSoon: false // We have partial data
  },
  {
    ...COMING_SOON_TEMPLATE('death-postmortem-changes', 7, 'Death and Postmortem Changes', 'Section A: Forensic Medicine'),
    priority: 'Highest',
    difficulty: 'Intermediate',
    tags: ['Death', 'Postmortem', 'Algor Mortis', 'Rigor Mortis', 'Livor Mortis', 'Putrefaction'],
    learningObjectives: [
      'Define death and differentiate between Somatic and Molecular death.',
      'Identify the early, intermediate, and late signs of death.',
      'Explain the medicolegal importance of Algor Mortis, Rigor Mortis, and Livor Mortis.',
      'Describe the stages of Putrefaction and factors influencing it.',
      'Compare Adipocere and Mummification.',
      'Estimate the Time Since Death (Postmortem Interval) using various criteria.'
    ],
    introduction: 'Death is not an instantaneous event but a process where various organs and tissues die at different rates. Understanding the stages of death—from the cessation of vital functions to total decomposition—is fundamental to forensic medicine for estimating the time since death and the cause of death.',
    simpleExplanation: "Think of death like a city's power grid failing. First, the main power station (the heart and brain) stops working—this is 'Somatic Death'. However, individual streetlights (cells and tissues) might keep flickering for a few hours until their local batteries run out—this is 'Molecular Death'. Once all the power is gone, the body begins to cool down (Algor Mortis), settle (Livor Mortis), and stiffen (Rigor Mortis) before eventually returning to nature (Putrefaction).",
    keyTerms: [
      { term: 'Somatic Death', definition: 'The complete and irreversible cessation of the functions of the brain, heart, and lungs (the "Tripod of Life").' },
      { term: 'Molecular Death', definition: 'The death of individual cells and tissues, occurring 2-3 hours after somatic death.' },
      { term: 'Suspended Animation', definition: 'A state where vital functions are at such a low level that they cannot be detected by clinical examination (e.g., drowning, electrocution).' },
      { term: 'Algor Mortis', definition: 'The postmortem cooling of the body until it reaches environmental temperature.' },
      { term: 'Rigor Mortis', definition: 'Postmortem stiffening of muscles due to depletion of ATP.' },
      { term: 'Livor Mortis', definition: 'The dark-red or purplish discoloration of the skin in the dependent parts of the body due to gravity settling of blood.' }
    ],
    importantConcepts: [
      {
        title: 'The Tripod of Life (Bichat’s Tripod)',
        content: 'Life is sustained by the synchronized functioning of three systems: the Brain (Coma), the Heart (Syncope), and the Lungs (Asphyxia). Failure of any one leads to somatic death.'
      },
      {
        title: 'Postmortem Caloricity',
        content: 'In certain conditions like sunstroke, tetanus, or septicaemia, the body temperature may actually rise for a short period after death instead of falling.'
      }
    ],
    stepByStep: [
      {
        title: 'Early Signs of Death',
        steps: [
          'Cessation of Respiration and Circulation.',
          'Loss of Muscle Tone (Primary Flaccidity).',
          'Changes in the Eye (Clouding of cornea, Taches Noires).',
          'Cooling of the body (Algor Mortis).'
        ]
      },
      {
        title: 'Intermediate Signs of Death',
        steps: [
          'Postmortem Lividity (Livor Mortis).',
          'Rigor Mortis (Muscle stiffening).',
          'Cadaveric Spasm (Instantaneous stiffening).'
        ]
      }
    ],
    vivaQuestions: [
      { question: 'What is the "Rule of 12" in Rigor Mortis?', answer: 'It is a rough guide: Rigor takes 12 hours to develop, lasts for 12 hours, and takes 12 hours to disappear.', difficulty: 'Easy' },
      { question: 'What is "Taches Noires"?', answer: 'A brown, triangular patch on the sclera of the eye that appears when the eyelids remain open after death, causing desiccation.', difficulty: 'Medium' },
      { question: 'What is the difference between Rigor Mortis and Cadaveric Spasm?', answer: 'Rigor Mortis is a gradual postmortem change involving all muscles, while Cadaveric Spasm is an instantaneous stiffening of a specific muscle group at the moment of death, usually seen in violent deaths.', difficulty: 'Hard' }
    ],
    mcqs: [
      {
        question: 'The first internal organ to show signs of putrefaction is:',
        options: ['Lungs', 'Heart', 'Stomach', 'Brain'],
        correctAnswer: 2,
        explanation: 'The stomach and intestines putrefy early due to the high bacterial load and presence of digestive enzymes.'
      },
      {
        question: 'Adipocere is also known as:',
        options: ['Mummification', 'Saponification', 'Desiccation', 'Maceration'],
        correctAnswer: 1,
        explanation: 'Adipocere formation is the process of saponification, where body fats are converted into a waxy substance.'
      }
    ],
    flashcards: [
      { front: 'Postmortem Lividity starts appearing within...', back: '30 minutes to 2 hours after death.' },
      { front: 'The cooling rate of the body is roughly...', back: '0.5 to 0.7°C per hour under normal conditions.' }
    ],
    quickRevision: {
      definition: 'Thanatology is the scientific study of death, including its signs, changes, and medicolegal aspects.',
      keyPoints: [
        'Somatic vs Molecular Death',
        'Algor Mortis (Cooling)',
        'Livor Mortis (Staining)',
        'Rigor Mortis (Stiffening)',
        'Putrefaction (Decomposition)'
      ]
    },
    shortNotes: [
      { title: 'Suspended Animation', answer: 'Also known as Apparent Death, it is a state where the vital signs (breathing, pulse) are so weak they are undetectable by normal clinical methods. It can occur in drowning, neonatal asphyxia, hypothermia, or certain drug overdoses. Medicolegal importance: Prevention of premature burial/autopsy.' },
      { title: 'Cadaveric Spasm', answer: 'Instantaneous stiffening of a muscle group at the exact moment of death. Unlike Rigor Mortis, there is no primary flaccidity. It is seen in deaths involving intense emotion or physical exertion, such as a drowning victim clutching grass or a suicide victim holding a weapon.' }
    ],
    longQuestions: [
      { title: 'Describe the postmortem changes in the body and discuss their medicolegal importance.', outline: ['Introduction & Definition of Death', 'Immediate signs', 'Early signs (Algor Mortis)', 'Intermediate signs (Rigor & Livor Mortis)', 'Late signs (Putrefaction)', 'Special types of decomposition (Adipocere, Mummification)', 'Estimation of Time Since Death', 'Conclusion'] }
    ],
    revisionSheet: [
      'Algor Mortis: 0.5-0.7°C/hr drop.',
      'Livor Mortis: Fixed after 8-12 hours.',
      'Rigor Mortis: Fully developed at 12 hours.',
      'Putrefaction: Greenish discoloration starts at RIF.'
    ],
    ...DEATH_MODULE_CHAPTERS.find(c => c.id === 'death-postmortem-changes'),
    subtopics: [
      'What is Death?', 'Brain Death', 'Apparent Death', 'Algor Mortis', 
      'Postmortem Lividity', 'Rigor Mortis', 'Cadaveric Spasm', 'Putrefaction', 
      'Adipocere', 'Mummification', 'Estimation of Time Since Death'
    ],
    comparisonTopics: [
      'Algor Mortis vs Rigor Mortis', 'Rigor Mortis vs Cadaveric Spasm',
      'Antemortem vs Postmortem Lividity', 'Adipocere vs Mummification'
    ],
    relatedTopics: ['Medicolegal Autopsy', 'Sudden Death', 'Drowning'],
    isComingSoon: false
  },
  ...DEATH_MODULE_CHAPTERS.filter(c => c.id !== 'death-postmortem-changes'),
  COMING_SOON_TEMPLATE('postmortem-changes', 8, 'Postmortem Changes Archive', 'Section A: Forensic Medicine'),
  {
    ...COMING_SOON_TEMPLATE('injury-general-considerations', 9, 'General Considerations of Injury', 'Section A: Forensic Medicine'),
    introduction: 'Biophysics and mechanics of trauma. Includes definition of injury, types of force, energy transfer, and tissue response to trauma.',
    learningObjectives: ['Explain the biophysics of wounding', 'Classify injuries based on force type']
  },
  {
    ...COMING_SOON_TEMPLATE('mechanical-injuries', 10, 'Mechanical Injuries', 'Section A: Forensic Medicine'),
    priority: 'Highest',
    difficulty: 'Intermediate',
    tags: ['Abrasion', 'Contusion', 'Laceration', 'Incised Wound', 'Stab Wound', 'Chop Wound'],
    subtopics: [
      'Abrasion', 'Contusion', 'Laceration', 'Incised Wound', 'Stab Wound', 'Chop Wound', 'Fractures'
    ],
    comparisonTopics: [
      'Abrasion vs Contusion', 'Laceration vs Incised Wound',
      'Stab Wound vs Incised Wound', 'Antemortem vs Postmortem Injuries'
    ],
    relatedTopics: ['Regional Injuries', 'Firearm Injuries', 'Medicolegal Considerations of Injury'],
    isComingSoon: false
  },
  {
    ...COMING_SOON_TEMPLATE('firearm-injuries', 11, 'Firearm Injuries', 'Section A: Forensic Medicine'),
    introduction: 'Ballistics and wound interpretation. Covers smooth bore vs rifled firearms, cartridge and bullet types, entry/exit wounds, and range of fire.',
    learningObjectives: ['Determine range of fire from wound features', 'Differentiate shotgun vs rifled firearm injuries']
  },
  {
    ...COMING_SOON_TEMPLATE('regional-injuries', 12, 'Regional Injuries', 'Section A: Forensic Medicine'),
    introduction: 'Anatomical approach to trauma. Covers injuries to the Head (Scalp, Skull, Brain), Spine, Chest, and Abdomen.',
    learningObjectives: ['Evaluate intracranial hemorrhages', 'Understand the mechanics of spinal cord injury']
  },
  {
    ...COMING_SOON_TEMPLATE('road-traffic-accidents', 13, 'Road Traffic Accidents', 'Section A: Forensic Medicine'),
    introduction: 'Medicolegal aspects of RTA. Covers pedestrian injuries, motorcyclist injuries, occupant patterns, and secondary impacts.',
    learningObjectives: ['Identify injury patterns in primary and secondary impacts']
  },
  {
    ...COMING_SOON_TEMPLATE('injury-medicolegal-considerations', 14, 'Injury: Medicolegal Considerations', 'Section A: Forensic Medicine'),
    introduction: 'Legal classification and weapons. Covers simple, grievous, and dangerous injuries, homicide, murder, and culpable homicide.',
    learningObjectives: ['Classify injuries under IPC/BNS', 'Distinguish murder from culpable homicide']
  },
  {
    ...COMING_SOON_TEMPLATE('thermal-injuries', 15, 'Thermal Injuries', 'Section A: Forensic Medicine'),
    priority: 'Highest',
    difficulty: 'Intermediate',
    tags: ['Burn', 'Scald', 'Heat', 'Cold', 'Electricity', 'Lightning'],
    subtopics: [
      'Burns', 'Scalds', 'Heat Injuries', 'Cold Injuries', 'Electrical Injuries', 'Lightning Injuries'
    ],
    comparisonTopics: [
      'Burn vs Scald', 'Antemortem vs Postmortem Burns', 'Electrical Burn vs Thermal Burn'
    ],
    relatedTopics: ['Mechanical Injuries', 'Death', 'Medicolegal Autopsy'],
    isComingSoon: false
  },
  {
    ...COMING_SOON_TEMPLATE('violent-asphyxia', 16, 'Violent Asphyxia', 'Section A: Forensic Medicine'),
    priority: 'Highest',
    difficulty: 'Intermediate',
    tags: ['Hanging', 'Strangulation', 'Suffocation', 'Drowning'],
    subtopics: [
      'Anoxia', 'Asphyxia', 'Hanging', 'Ligature Strangulation', 'Throttling',
      'Suffocation', 'Smothering', 'Choking', 'Traumatic Asphyxia', 'Drowning'
    ],
    comparisonTopics: [
      'Hanging vs Ligature Strangulation', 'Complete vs Partial Hanging',
      'Typical vs Atypical Hanging', 'Drowning vs Postmortem Immersion'
    ],
    relatedTopics: ['Death', 'Medicolegal Autopsy', 'Mechanical Injuries'],
    isComingSoon: false
  },
  {
    ...COMING_SOON_TEMPLATE('sexual-offences', 17, 'Sexual Offences', 'Section A: Forensic Medicine'),
    introduction: 'Jurisprudence of sexual crimes. Covers virginity, rape (POCSO/BNS), incest, unnatural offences, and paraphilias.',
    learningObjectives: ['Conduct medicolegal examination in rape cases', 'Understand legal definitions of sexual consent']
  },
  {
    ...COMING_SOON_TEMPLATE('impotence-sterility-sterilization', 18, 'Impotence, Sterility & Sterilization', 'Section A: Forensic Medicine'),
    introduction: 'Medicolegal aspects of reproductive capacity. Covers impotence, sterility, sterilization procedures, and legal importance.',
    learningObjectives: ['Differentiate impotence from sterility']
  },
  {
    ...COMING_SOON_TEMPLATE('pregnancy-delivery', 19, 'Pregnancy & Delivery', 'Section A: Forensic Medicine'),
    introduction: 'Diagnosis and medicolegal aspects. Covers signs of pregnancy, gestation period, signs of recent delivery in living and dead.',
    learningObjectives: ['Determine period of gestation from fetal markers']
  },
  {
    ...COMING_SOON_TEMPLATE('abortion', 20, 'Abortion', 'Section A: Forensic Medicine'),
    introduction: 'Legal and illegal termination. Covers definitions, types, criminal abortion, and MTP Act provisions.',
    learningObjectives: ['Explain the provisions of the MTP Act']
  },
  {
    ...COMING_SOON_TEMPLATE('infant-deaths-female-feticide', 21, 'Infant Deaths & Female Feticide', 'Section A: Forensic Medicine'),
    introduction: 'Crimes against children. Covers infanticide, female feticide (PCPNDT Act), SIDS, Battered Baby, and Munchausen by proxy.',
    learningObjectives: ['Understand the PCPNDT Act regulations', 'Identify signs of child abuse']
  },
  COMING_SOON_TEMPLATE('legitimacy-paternity', 22, 'Legitimacy & Paternity', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('assisted-reproduction', 23, 'Assisted Reproduction', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('starvation', 24, 'Starvation', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('euthanasia', 25, 'Euthanasia', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('human-rights-ethics', 26, 'Human Rights, Torture & Medical Ethics', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('aids-medicolegal', 27, 'Medicolegal Aspects of AIDS', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('anaesthetic-deaths', 28, 'Anaesthetic & Operative Deaths', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('embalming-medicolegal', 29, 'Medicolegal Aspects of Embalming', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('forensic-psychiatry', 30, 'Forensic Psychiatry', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('trace-evidence', 31, 'Trace Evidence', 'Section A: Forensic Medicine'),
  COMING_SOON_TEMPLATE('forensic-lab', 32, 'Forensic Science Laboratory', 'Section A: Forensic Medicine'),

  // SECTION B: TOXICOLOGY
  {
    ...COMING_SOON_TEMPLATE('general-toxicology', 33, 'General Toxicology', 'Section B: Toxicology'),
    priority: 'Highest',
    difficulty: 'Beginner',
    tags: ['Poison', 'Poisoning', 'Antidote', 'Decontamination', 'Viscera Preservation'],
    subtopics: [
      'Definition of Poison', 'Classification of Poisons', 'Diagnosis of Poisoning',
      'Management of Poisoning', 'Decontamination', 'Antidotes', 'Diagnosis in Dead',
      'Autopsy', 'Preservation of Viscera'
    ],
    comparisonTopics: [
      'Poison vs Drug', 'Local vs Systemic Poison', 'Universal vs Specific Antidote'
    ],
    relatedTopics: ['Corrosive Poisons', 'Metallic Poisons', 'Pesticides'],
    isComingSoon: false
  },
  COMING_SOON_TEMPLATE('toxicology-medicolegal', 34, 'Medicolegal Aspects of Toxicology', 'Section B: Toxicology'),
  {
    ...COMING_SOON_TEMPLATE('corrosive-poisons', 35, 'Corrosive Poisons', 'Section B: Toxicology'),
    introduction: 'Strong acids and alkalis. Covers Sulphuric, Nitric, Carbolic acids, and Vitriolage.',
    learningObjectives: ['Identify characteristic stomach findings in acid poisoning']
  },
  COMING_SOON_TEMPLATE('non-metallic-irritants', 36, 'Non-metallic Irritants', 'Section B: Toxicology'),
  {
    ...COMING_SOON_TEMPLATE('metallic-poisons', 37, 'Metallic Poisons', 'Section B: Toxicology'),
    introduction: 'Heavy metal toxicity. Covers Arsenic, Mercury, Lead, Copper, Iron, and Thallium.',
    learningObjectives: ['Describe symptoms of chronic lead poisoning (Plumbism)']
  },
  {
    ...COMING_SOON_TEMPLATE('plant-poisons', 38, 'Plant Poisons', 'Section B: Toxicology'),
    introduction: 'Toxic flora. Covers Abrus, Castor, Calotropis, Marking nut, and Ergot.',
    learningObjectives: ['Identify toxic principles of common poisonous plants']
  },
  {
    ...COMING_SOON_TEMPLATE('animal-poisons', 39, 'Animal Poisons', 'Section B: Toxicology'),
    introduction: 'Venoms and stings. Covers Snakebite (Vipers, Cobras), Scorpion, and Bee stings.',
    learningObjectives: ['Distinguish between neurotoxic and vasculotoxic snake venom']
  },
  COMING_SOON_TEMPLATE('mechanical-irritants-tox', 40, 'Mechanical Irritants', 'Section B: Toxicology'),
  {
    ...COMING_SOON_TEMPLATE('pesticide-poisoning', 41, 'Pesticide Poisoning', 'Section B: Toxicology'),
    priority: 'Highest',
    difficulty: 'Advanced',
    tags: ['Organophosphorus', 'Carbamate', 'Organochlorine', 'Paraquat', 'Aluminium Phosphide'],
    subtopics: [
      'Organophosphorus Compounds', 'Organochlorines', 'Carbamates', 'Pyrethrum',
      'Pyrethrins', 'Pyrethroids', 'Paraquat', 'Aluminium Phosphide'
    ],
    comparisonTopics: [
      'Organophosphorus vs Carbamate Poisoning', 'Paraquat vs Aluminium Phosphide Poisoning'
    ],
    relatedTopics: ['General Toxicology', 'Antidotes', 'Medicolegal Toxicology'],
    isComingSoon: false
  },
  COMING_SOON_TEMPLATE('cardiac-poisons', 42, 'Cardiac Poisons', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('somniferous-poisons', 43, 'Somniferous Poisons', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('inebriant-poisons', 44, 'Inebriant Poisons', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('deliriant-poisons', 45, 'Deliriant Poisons', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('spinal-poisons', 46, 'Spinal Poisons', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('peripheral-nerve-poisons', 47, 'Peripheral Nerve Poisons', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('asphyxiants-tox', 48, 'Asphyxiants', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('food-poisoning', 49, 'Food Poisoning', 'Section B: Toxicology'),
  COMING_SOON_TEMPLATE('drug-dependence', 50, 'Drug Dependence & Abuse', 'Section B: Toxicology'),
];
