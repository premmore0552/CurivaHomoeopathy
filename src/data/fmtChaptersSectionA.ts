import { FMTChapterDetail } from './fmtDetailedChapters';

export const FMT_SECTION_A_CHAPTERS_PART1: FMTChapterDetail[] = [
  {
    id: 'introduction',
    chapterNumber: 1,
    title: 'Introduction to Forensic Medicine & Medical Jurisprudence',
    section: 'Section A: Forensic Medicine',
    readTime: '12 min study',
    difficulty: 'Beginner',
    learningObjectives: [
      'Define Forensic Medicine, Medical Jurisprudence, Forensic Pathology, and Medical Ethics.',
      'Differentiate between Medical Ethics and Medical Etiquette.',
      'Understand the historical evolution of legal medicine in India from Charaka Samhita to modern legislation.',
      'Understand the role of a medical practitioner as an expert witness vs an ordinary witness.',
      'Recognize the paramount duty of emergency life-saving over medicolegal formalities.'
    ],
    introduction: `Forensic Medicine and Medical Jurisprudence form the bridge between medical science and the legal administration of justice. While Forensic Medicine applies medical knowledge to assist courts in solving legal problems (such as determining cause of death, injury interpretation, or sexual offences), Medical Jurisprudence deals with the legal rights, duties, and obligations of a registered medical practitioner.`,
    whyThisMatters: `Every medical graduate, including BHMS doctors, inevitably encounters medicolegal situations in clinical practice. Understanding the boundaries between ethics, etiquette, and legal duty safeguards doctors from professional misconduct charges while ensuring justice for victims of crime.`,
    simpleExplanation: `Think of Forensic Medicine as 'Medical science helping the court find truth in crime and accidents'. Medical Jurisprudence, on the other hand, is 'The law telling doctors how to practice ethically and legally'. As a doctor, saving a patient's life always comes first—medicolegal paperwork can wait until the emergency is stabilized!`,
    keyTerms: [
      {
        term: 'Forensic Medicine (Legal Medicine)',
        definition: 'The branch of medicine that applies medical and paramedical knowledge to the administration of law and justice.',
        simpleExplanation: 'Using medical science to help courts solve crimes, injuries, and deaths.'
      },
      {
        term: 'Medical Jurisprudence',
        definition: 'The subject dealing with the legal responsibilities, rights, and duties of physicians arising from the doctor-patient relationship.',
        simpleExplanation: 'The law governing medical practice, medical negligence, consent, and ethics.'
      },
      {
        term: 'Medical Ethics',
        definition: 'Moral principles and self-imposed codes of conduct that guide medical practitioners in dealings with patients, society, and colleagues.',
        simpleExplanation: 'Moral rules of honesty, confidentiality, and compassion in medicine.'
      },
      {
        term: 'Medical Etiquette',
        definition: 'Conventional laws of courtesy and professional behavior observed between members of the medical profession.',
        simpleExplanation: 'Professional politeness and respect between fellow doctors.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Immediate Patient Assessment & Life-Saving Resuscitation',
        description: 'Prioritize emergency treatment immediately. Medicolegal documentation must never delay life-saving measures.',
        keyTakeaway: 'Life preservation takes absolute priority over legal formalities.'
      },
      {
        stepNumber: 2,
        title: 'Identification & Written Informed Consent',
        description: 'Record two prominent, permanent identification marks and obtain written consent before medicolegal examination.',
        keyTakeaway: 'Consent and proper identification prevent legal disputes later.'
      },
      {
        stepNumber: 3,
        title: 'Detailed Objective Clinical Examination & Recording',
        description: 'Meticulously record all findings, injuries, negative points, and exact dimensions without using loose or exaggerated language.',
        keyTakeaway: 'Inaccurate documentation leads to miscarriage of justice.'
      },
      {
        stepNumber: 4,
        title: 'Preservation & Chain of Custody of Evidence',
        description: 'Collect, seal, label, and hand over physical exhibits (swabs, blood, clothes, weapons) with proper receipts.',
        keyTakeaway: 'An intact chain of custody is mandatory for courtroom admissibility.'
      }
    ],
    importantConcepts: [
      {
        title: 'Primary Directive: Resuscitation Before Paperwork',
        content: 'The Supreme Court of India in landmark rulings (e.g. Parmanand Katara vs Union of India) mandated that every doctor, government or private, must render immediate medical aid in emergency cases without waiting for police clearance.',
        type: 'legal'
      },
      {
        title: 'Expert Witness vs Common Witness',
        content: 'An ordinary witness deposes only to facts directly perceived by senses. An expert witness (doctor) gives corroborative scientific opinions based on observed facts and scientific principles.',
        type: 'info'
      }
    ],
    flowcharts: [
      {
        title: 'Doctor\'s Dual Duty in Medicolegal Cases',
        description: 'Sequential priority workflow when handling medicolegal emergencies in hospital settings.',
        steps: [
          { label: 'Step 1: Emergency Care', description: 'Stabilize ABC (Airway, Breathing, Circulation) and perform life-saving surgery or interventions.' },
          { label: 'Step 2: Identification & Consent', description: 'Obtain informed consent, record 2 identification marks, and register as MLC in Accident Register.' },
          { label: 'Step 3: Police Intimation', description: 'Notify local police station house officer (SHO) regarding the medicolegal case.' },
          { label: 'Step 4: Evidence Chain', description: 'Preserve viscera, clothes, and trace evidence in sealed containers with proper chain of custody receipts.' }
        ]
      }
    ],
    tables: [
      {
        title: 'Difference Between Forensic Medicine and Medical Jurisprudence',
        headers: ['Feature', 'Forensic Medicine', 'Medical Jurisprudence'],
        rows: [
          ['Core Focus', 'Medical knowledge applied to legal problems', 'Legal aspects regulating medical practice'],
          ['Primary Beneficiary', 'Law enforcement agencies & Courts of law', 'Medical profession & Patient rights'],
          ['Key Topics', 'Autopsy, injuries, toxicology, sexual offences', 'Medical negligence, consent, medical ethics, registration'],
          ['Role of Doctor', 'Acts as medical expert/investigator', 'Acts as a licensed practitioner bound by law']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Emergency Admission of Road Traffic Accident Victim',
        scenario: 'A severely injured patient with head trauma is brought to a private hospital. The casualty officer refuses treatment demanding police registration first.',
        analysis: 'Refusing immediate treatment violates Article 21 of the Indian Constitution and Supreme Court directives. The doctor must resuscitate immediately.',
        takeaway: 'Emergency medical assistance is a non-negotiable duty irrespective of medicolegal status.'
      }
    ],
    medicolegalImportance: [
      'Provides foundation for understanding court procedures, expert testimony, and medical evidence.',
      'Defines doctor\'s legal obligations under central and state medical council regulations.',
      'Ensures compliance with Supreme Court mandates regarding emergency treatment.'
    ],
    mnemonics: [
      {
        title: 'Core Duties of Medical Witness - 3 C\'s',
        phrase: 'CARE, CAUTION, CLEAR',
        breakdown: [
          { letter: 'C', word: 'Care', meaning: 'Meticulous examination and documentation' },
          { letter: 'C', word: 'Caution', meaning: 'Avoid dogmatic or biased opinions' },
          { letter: 'C', word: 'Clear', meaning: 'Present facts in simple, non-jargon language' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Refusing to treat a medicolegal case in a private clinic without police requisition.',
        whyWrong: 'Law requires mandatory immediate emergency first-aid by all doctors.',
        correctConcept: 'Treat first, inform police immediately after stabilization.'
      }
    ],
    highYieldPoints: [
      'Forensic = Forums or Courts of Law.',
      'Medical Jurisprudence = Legal aspects of medical practice.',
      'Medical Ethics = Self-imposed moral code.',
      'Parmanand Katara Case = Mandatory emergency medical treatment.',
      'Expert opinion under Section 45 IEA / Section 39 BSA is corroborative evidence.'
    ],
    previousExamQuestions: [
      { question: 'Define Forensic Medicine and Medical Jurisprudence. Discuss the scope of FMT in undergraduate BHMS curriculum.', year: '2023', marks: 10 },
      { question: 'Differentiate between Medical Ethics and Medical Etiquette.', year: '2021', marks: 5 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is the primary difference between medical ethics and medical etiquette?',
        answer: 'Medical ethics deals with moral principles guiding doctor-patient-state relationships. Medical etiquette deals with professional courtesy and behavior between fellow medical colleagues.',
        clinicalPearl: 'A doctor must never denigrate a colleague\'s skill in front of a patient.'
      },
      {
        id: 2,
        question: 'Is medical evidence substantive or corroborative in Indian Courts?',
        answer: 'Medical evidence is corroborative evidence. It assists the court in evaluating the credibility of eyewitnesses and physical facts.',
        clinicalPearl: 'Conclusions must always be backed by objective scientific observations.'
      }
    ],
    shortNotes: [
      {
        title: 'Scope of Forensic Medicine in Medical Practice',
        answer: 'Forensic Medicine aids judicial investigation in civil and criminal cases (injuries, deaths, sexual offences, poisoning). It equips medical graduates to issue legally valid certificates, perform autopsies, testify in court, and protect human rights.'
      }
    ],
    longQuestions: [
      {
        title: 'Describe the historical development and scope of Forensic Medicine in India.',
        outline: [
          'Historical background: Charaka Samhita, Manusmriti, Arthashastra of Kautilya, Sushruta Samhita',
          'Colonial and Post-Independence developments: Codes of Hammurabi to modern Indian legislation',
          'Scope in civil vs criminal administration of justice',
          'Role of Registered Medical Practitioner in medicolegal work'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Medical evidence in an Indian court of law is generally classified as:',
        options: ['Substantive evidence', 'Corroborative evidence', 'Conclusive proof', 'Primary evidence'],
        correctIndex: 1,
        explanation: 'Medical testimony provides expert opinion to corroborate or contradict eyewitness and physical evidence.',
        highYieldTag: 'Must Know'
      },
      {
        id: 2,
        question: 'Under which famous Supreme Court judgment is emergency medical treatment made mandatory for all doctors?',
        options: ['McNaughten Case', 'Parmanand Katara Case', 'Bhowal Sanyasi Case', 'Ruxton Case'],
        correctIndex: 1,
        explanation: 'Parmanand Katara vs Union of India established that saving human life takes precedence over legal procedure.',
        highYieldTag: 'Repeated PYQ'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Refusal of Emergency Casualty Care',
        scenario: 'A doctor in a peripheral health center refuses to examine an unconscious assault victim brought by relatives, insisting on a formal police inquest report first.',
        questions: [
          'Is the doctor legally justified in withholding treatment?',
          'What is the legal consequence of this refusal?'
        ],
        solution: '1. No. Medical treatment takes absolute priority over medicolegal formalities. 2. The doctor is liable under medical negligence and violation of Supreme Court directives.',
        legalSections: ['Section 357C BNSS / CrPC', 'Medical Ethics']
      }
    ],
    summary: 'Chapter 1 introduces Forensic Medicine and Medical Jurisprudence, establishing the legal obligations of doctors, ethical boundaries, and the paramount duty of emergency life-saving.',
    revisionSheet: [
      'Forensic Medicine = Medical science for law.',
      'Medical Jurisprudence = Legal rules for medicine.',
      'Medical Ethics = Moral rules.',
      'Medical Etiquette = Courtesy among doctors.',
      'Emergency Treatment = Always takes priority over police paperwork.'
    ],
    flashcards: [
      { id: 1, front: 'What is Forensic Medicine?', back: 'Application of medical knowledge to aid the administration of justice.', category: 'Definitions' },
      { id: 2, front: 'What takes priority in an emergency medicolegal case?', back: 'Life-saving treatment always takes priority over legal formalities.', category: 'Legal Duty' }
    ]
  },
  {
    id: 'legal-procedure',
    chapterNumber: 2,
    title: 'Legal Procedure, Courts, Inquest, Summons & Evidence',
    section: 'Section A: Forensic Medicine',
    readTime: '18 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Understand substantive law (IPC / BNS) vs procedural law (CrPC / BNSS) vs evidence law (IEA / BSA).',
      'Compare Police Inquest (Sec 174 CrPC / Sec 194 BNSS) and Magistrate Inquest (Sec 176 CrPC / Sec 196 BNSS).',
      'Differentiate between Subpoena / Summons, Subpoena Duces Tecum, and Conduct Money.',
      'Differentiate Dying Declaration (Sec 32 IEA / BSA) vs Dying Deposition.',
      'Master the 4 stages of Court examination: Examination-in-chief, Cross-examination, Re-examination, and Judge Questions.'
    ],
    introduction: `The Indian legal procedure governs how criminal and civil offences are investigated, tried, and adjudicated. Medical evidence plays a pivotal role in criminal trials involving violence, poisoning, or unnatural deaths. This chapter details the hierarchy of criminal courts, inquest procedures, summons, types of medical evidence, recording dying declarations, and the proper conduct of a medical witness in court.`,
    whyThisMatters: `Receiving a court summons is a common occurrence for medical practitioners. Knowing the distinction between police and magistrate inquests, handling dying declarations correctly, and performing well under cross-examination protects the doctor\'s credibility and prevents perjury charges.`,
    simpleExplanation: `When an unnatural death occurs, an investigation called an 'Inquest' is held. In India, most inquests are done by the police, but custodial or dowry deaths require a Magistrate's inquest. If a dying patient gives a statement about their cause of death, it is called a 'Dying Declaration'. When called to court by a 'Summons', a doctor deposes under oath in 4 structured stages.`,
    keyTerms: [
      {
        term: 'Inquest',
        definition: 'An official inquiry or investigation into the cause and circumstances of an unnatural, sudden, or suspicious death.',
        simpleExplanation: 'Legal investigation into how and why someone died.'
      },
      {
        term: 'Police Inquest (Sec 174 CrPC / Sec 194 BNSS)',
        definition: 'Inquest conducted by an investigating police officer (not below rank of Sub-Inspector) in cases of suicide, murder, animal attacks, machinery, or road accidents.',
        simpleExplanation: 'Routine death investigation done by police officers.'
      },
      {
        term: 'Magistrate Inquest (Sec 176 CrPC / Sec 196 BNSS)',
        definition: 'Inquest conducted by an Executive or Judicial Magistrate in mandatory scenarios: custodial death/rape, police firing, prison death, dowry death, psychiatric hospital death, or exhumation.',
        simpleExplanation: 'Special death investigation conducted directly by a judge/magistrate.'
      },
      {
        term: 'Dying Declaration (Sec 32 IEA / BSA)',
        definition: 'A written or oral statement made by a dying person relating to the material facts or circumstances leading to their death.',
        simpleExplanation: 'The last statement of a dying victim explaining who or what caused their death.'
      },
      {
        term: 'Conduct Money',
        definition: 'Fee offered or paid to a witness in civil cases at the time of serving summons to cover travel and attendance expenses.',
        simpleExplanation: 'Travel allowance given to a witness in civil cases.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Receipt of Subpoena / Summons',
        description: 'Check crime number, court seal, date, and time. Sign the duplicate copy receipt. Criminal court summons takes priority over civil court.',
        keyTakeaway: 'Summons is a legally compelling document under penalty of fine or arrest.'
      },
      {
        stepNumber: 2,
        title: 'Pre-Trial Preparation & Case Record Review',
        description: 'Review original medical notes, injury registers, autopsy reports, and standard literature before entering the witness box.',
        keyTakeaway: 'Refreshing memory from original contemporaneously made notes is legally permitted.'
      },
      {
        stepNumber: 3,
        title: 'Administration of Oath or Solemn Affirmation',
        description: 'Take solemn oath in the witness box to tell the truth, whole truth, and nothing but truth.',
        keyTakeaway: 'Giving false evidence under oath constitutes perjury (punishable up to 7 years).'
      },
      {
        stepNumber: 4,
        title: 'Sequential Examination Stages',
        description: 'Undergo Examination-in-Chief (by prosecution), Cross-Examination (by defence), Re-Examination (for clarification), and answer Judge\'s questions.',
        keyTakeaway: 'Maintain scientific objectivity and composure against hostile questioning.'
      }
    ],
    importantConcepts: [
      {
        title: 'Courts Hierarchy in India',
        content: 'Supreme Court (New Delhi) -> High Court (State) -> Sessions Court (District) -> Judicial Magistrates (CJM, 1st Class, 2nd Class). Sessions court can pass death sentence (must be confirmed by High Court).',
        type: 'info'
      },
      {
        title: 'Dying Declaration vs Dying Deposition',
        content: 'In India, Dying Declaration is recorded without oath and without defence cross-examination. In UK/USA, Dying Deposition is on oath in presence of accused/lawyer who cross-examines. Deposition has higher evidential value.',
        type: 'legal'
      }
    ],
    flowcharts: [
      {
        title: 'Courtroom Examination Sequence for Medical Witness',
        description: 'The 4 sequential stages of oral evidence in criminal trials.',
        steps: [
          { label: 'Stage 1: Oath / Affirmation', description: 'Witness takes oath in witness box to state the truth.' },
          { label: 'Stage 2: Examination-in-Chief', description: 'Prosecution lawyer asks short, non-leading questions to elicit medical facts.' },
          { label: 'Stage 3: Cross-Examination', description: 'Defence lawyer tests credibility, consistency, qualifications, and alternative possibilities.' },
          { label: 'Stage 4: Re-Examination & Judge Questions', description: 'Prosecution clarifies points raised in cross-examination; Judge asks clearing questions.' }
        ]
      }
    ],
    tables: [
      {
        title: 'Police Inquest vs Magistrate Inquest',
        headers: ['Feature', 'Police Inquest (Sec 174 CrPC / 194 BNSS)', 'Magistrate Inquest (Sec 176 CrPC / 196 BNSS)'],
        rows: [
          ['Conducting Officer', 'Investigating Officer (Sub-Inspector or above)', 'Executive or Judicial Magistrate'],
          ['Scope / Cases', 'Suicides, homicides, accidents, animal attacks', 'Custodial death/rape, police firing, dowry death, exhumation, prison death'],
          ['Panches', '2 or more respectable local residents (Panchanama)', 'Magistrate conducts inquiry directly'],
          ['Legal Authority', 'Lower investigative level', 'Higher judicial authority overriding police']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Recording Dying Declaration of a Burn Victim',
        scenario: 'A woman with 80% burns is admitted. Doctor certifies her compos mentis (sound mind) and calls Executive Magistrate. Condition worsens rapidly before Magistrate arrives.',
        analysis: 'If Magistrate cannot reach in time, doctor must record the dying declaration in presence of two witnesses, in patient\'s own words, without leading questions.',
        takeaway: 'Doctor\'s mental fitness certificate is mandatory before recording a dying declaration.'
      }
    ],
    medicolegalImportance: [
      'Establishes procedural compliance for handling unnatural death investigations.',
      'Defines the doctor\'s duties and rights regarding summons, fees, and testimony.',
      'Prevents legal pitfalls like perjury, contempt of court, and hostilisation of witness.'
    ],
    mnemonics: [
      {
        title: 'Magistrate Inquest Mandatory Cases - "C-D-P-E-S"',
        phrase: 'Custody, Dowry, Police, Exhumation, Psychiatric',
        breakdown: [
          { letter: 'C', word: 'Custody', meaning: 'Death or rape in police/court custody' },
          { letter: 'D', word: 'Dowry', meaning: 'Dowry death within 7 years of marriage' },
          { letter: 'P', word: 'Police Firing', meaning: 'Death due to police firing or encounter' },
          { letter: 'E', word: 'Exhumation', meaning: 'Disinterment of buried body for autopsy' },
          { letter: 'S', word: 'Special Facility', meaning: 'Death in prison, reformatory, or mental hospital' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Asking leading questions while recording a dying declaration.',
        whyWrong: 'Leading questions suggest answers and invalidate the declaration in court.',
        correctConcept: 'Record in the patient\'s exact words without prompting.'
      }
    ],
    highYieldPoints: [
      'Police Inquest = Sec 174 CrPC / 194 BNSS.',
      'Magistrate Inquest = Sec 176 CrPC / 196 BNSS.',
      'Dying Declaration = Sec 32 IEA / BSA (No oath, no cross-examination).',
      'Leading questions = Allowed ONLY in Cross-examination (Sec 143 IEA).',
      'Perjury = Giving false evidence under oath (Sec 191/193 IPC, Sec 227/229 BNS).'
    ],
    previousExamQuestions: [
      { question: 'Define Inquest. Differentiate between Police Inquest and Magistrate Inquest with examples.', year: '2022', marks: 10 },
      { question: 'Write a short note on Dying Declaration: Procedure, precautions, and evidential value.', year: '2020', marks: 5 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is a leading question? In which stage of court examination is it permitted?',
        answer: 'A leading question is one which suggests the desired answer (yes or no). It is permitted ONLY during Cross-Examination.',
        clinicalPearl: 'Leading questions are forbidden in Examination-in-Chief unless declared hostile.'
      },
      {
        id: 2,
        question: 'What is Conduct Money?',
        answer: 'Tender of expenses paid to a witness in civil cases when summons is served. In criminal cases, no money is given at summons service (state pays TA/DA).',
        clinicalPearl: 'Failure to attend court in criminal cases warrants bailable/non-bailable warrants.'
      }
    ],
    shortNotes: [
      {
        title: 'Hostile Witness (Sec 191 IPC / Sec 227 BNS)',
        answer: 'A witness who shows interest or motive to conceal truth or gives false evidence contrary to earlier statements. On declaration as hostile by court, the party calling the witness can cross-examine them.'
      }
    ],
    longQuestions: [
      {
        title: 'Discuss Medical Evidence under Indian Law and detail the procedure of recording evidence in a Criminal Court.',
        outline: [
          'Definition and types of evidence: Documentary vs Oral',
          'Exceptions to hearsay rule (Dying declaration, expert treatises)',
          'Subpoena / Summons and penalties for non-attendance',
          'Detailed 4-stage examination of medical witness in court'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Magistrate Inquest is compulsory in which of the following cases?',
        options: ['Road traffic accident', 'Death in police custody', 'Snakebite in a village', 'Drowning in a lake'],
        correctIndex: 1,
        explanation: 'Sec 176 CrPC / 196 BNSS mandates Magistrate Inquest for deaths in custody, police firing, dowry deaths, and exhumations.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Conflicting Court Summons on Same Day',
        scenario: 'A doctor receives two court summons for the exact same date and time: one from a District Civil Court and one from a High Criminal Sessions Court.',
        questions: [
          'Which court must the doctor attend first?',
          'What is the legal obligation regarding the second court?'
        ],
        solution: '1. The doctor must attend the Criminal Sessions Court. 2. The doctor must inform the Civil Court in writing attaching a copy of the criminal summons.',
        legalSections: ['Section 61 CrPC / BNSS', 'Court Hierarchy']
      }
    ],
    summary: 'Chapter 2 covers criminal court hierarchy, police and magistrate inquests, summons, dying declarations, and the 4 stages of court testimony for medical witnesses.',
    revisionSheet: [
      'Police Inquest = Sec 174 CrPC / 194 BNSS.',
      'Magistrate Inquest = Sec 176 CrPC / 196 BNSS.',
      'Dying Declaration = Sec 32 IEA / BSA.',
      'Leading Questions = Allowed ONLY in Cross-Examination.'
    ],
    flashcards: [
      { id: 1, front: 'Under which section is Police Inquest conducted?', back: 'Section 174 CrPC / Section 194 BNSS.', category: 'Inquest' }
    ]
  },
  {
    id: 'medical-law-ethics',
    chapterNumber: 3,
    title: 'Medical Law, Ethics, Misconduct & Consumer Protection',
    section: 'Section A: Forensic Medicine',
    readTime: '20 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Understand setup of NMC and NCH.',
      'Define Serious Professional Misconduct (Infamous Conduct) and the 6 A\'s.',
      'Differentiate Civil vs Criminal Negligence (Sec 304A IPC / 106 BNS).',
      'Understand Res Ipsa Loquitur, Vicarious Liability, Volenti Non Fit Injuria.',
      'Learn Consumer Protection Act (CPA 2019) application to medical care.'
    ],
    introduction: `Medical practice is regulated by professional councils, statutory acts, and ethical codes. In India, NMC and NCH maintain professional standards, registration, and disciplinary control. Medical negligence and professional misconduct are critical areas that every practicing doctor must understand.`,
    whyThisMatters: `Understanding medical law and ethics protects doctors from frivolous litigation while ensuring patient welfare under the Consumer Protection Act and Supreme Court mandates.`,
    simpleExplanation: `As a registered doctor, you have a contract with patients to provide standard care. Failing to exercise reasonable care is Negligence. Doing disgraceful acts (like false certificates or advertising fake cures) is Professional Misconduct.`,
    keyTerms: [
      {
        term: 'Serious Professional Misconduct',
        definition: 'Disgraceful or dishonourable conduct of a medical practitioner in the pursuit of their profession.',
        simpleExplanation: 'Doing unethical or disgraceful acts that abuse professional standing.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Duty of Care Establishment',
        description: 'Duty arises as soon as a doctor accepts a patient for care.',
        keyTakeaway: 'The 4 D\'s of Negligence: Duty, Dereliction, Direct Causation, Damage.'
      }
    ],
    importantConcepts: [
      {
        title: 'Supreme Court Guidelines (Jacob Mathew Case)',
        content: 'Gross negligence required for criminal charges under Sec 304A IPC / 106 BNS.',
        type: 'legal'
      }
    ],
    flowcharts: [
      {
        title: 'Elements of Negligence',
        description: 'The 4 D\'s required to establish civil liability.',
        steps: [
          { label: 'Duty', description: 'Doctor-patient relationship established.' },
          { label: 'Dereliction', description: 'Breach of standard care.' },
          { label: 'Direct Cause', description: 'Breach directly caused injury.' },
          { label: 'Damage', description: 'Measurable damage suffered.' }
        ]
      }
    ],
    tables: [
      {
        title: 'Civil vs Criminal Negligence',
        headers: ['Feature', 'Civil Negligence', 'Criminal Negligence'],
        rows: [
          ['Proof', 'Preponderance of probability', 'Proof beyond reasonable doubt'],
          ['Penalty', 'Monetary compensation', 'Imprisonment and/or fine']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Retained Surgical Swab',
        scenario: 'A swab left inside abdomen causes peritonitis.',
        analysis: 'Res Ipsa Loquitur applies directly.',
        takeaway: 'Obvious negligence requires no expert testimony.'
      }
    ],
    medicolegalImportance: [
      'Establishes ethical guidelines and regulatory powers of medical councils.'
    ],
    mnemonics: [
      {
        title: '6 A\'s of Infamous Conduct',
        phrase: 'Adultery, Advertising, Abortion, Association, Addiction, Alcohol',
        breakdown: [
          { letter: 'A', word: 'Adultery', meaning: 'Improper sexual relationship with patient' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming bad outcome equals negligence.',
        whyWrong: 'Unfavorable outcome without breach of standard care is not negligence.',
        correctConcept: 'Negligence requires breach of standard care.'
      }
    ],
    highYieldPoints: [
      '4 D\'s = Duty, Dereliction, Direct Cause, Damage.',
      'Res Ipsa Loquitur = Self-evident negligence.'
    ],
    previousExamQuestions: [
      { question: 'Define Medical Negligence. Explain Res Ipsa Loquitur.', year: '2023', marks: 10 }
    ],
    vivaQuestions: [
      { id: 1, question: 'What is Res Ipsa Loquitur?', answer: 'The thing speaks for itself.' }
    ],
    shortNotes: [
      { title: 'CPA 2019 in Healthcare', answer: 'Covers paid medical services for deficiency of service complaints.' }
    ],
    longQuestions: [
      { title: 'Discuss Medical Negligence in detail.', outline: ['Elements', 'Types', 'Doctrines', 'Defences'] }
    ],
    mcqs: [
      { id: 1, question: 'Res Ipsa Loquitur means:', options: ['Thing speaks for itself', 'Burden of proof on plaintiff', 'Master is responsible', 'Consent given'], correctIndex: 0, explanation: 'Translates to the thing speaks for itself.' }
    ],
    caseBasedQuestions: [
      { id: 1, title: 'Retained Instrument', scenario: 'Surgical scissors left in patient abdomen.', questions: ['Which doctrine applies?'], solution: 'Res Ipsa Loquitur applies.', legalSections: ['Res Ipsa Loquitur'] }
    ],
    summary: 'Chapter 3 details medical ethics, misconduct, negligence, legal doctrines, and CPA.',
    revisionSheet: ['Res Ipsa Loquitur = Self-evident negligence.', '4 D\'s of Negligence.'],
    flashcards: [{ id: 1, front: 'What is Res Ipsa Loquitur?', back: 'The thing speaks for itself.', category: 'Doctrines' }]
  },
  {
    id: 'identification',
    chapterNumber: 4,
    title: 'Identification, Dermatoglyphics, Osteology & Dactylography',
    section: 'Section A: Forensic Medicine',
    readTime: '25 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Define Corpus Delicti and primary identification data.',
      'Master Dactylography, Poroscopy, and ridge characteristics.',
      'Understand skeletal age, sex, and height determination from bones.',
      'Learn Gustafson\'s method for dental age estimation.'
    ],
    introduction: `Identification determines individual identity in living or dead bodies. Dactylography and osteology provide scientific proof of identity.`,
    whyThisMatters: `Establishes Corpus Delicti in murder trials and resolves identity in disaster victim identification.`,
    simpleExplanation: `Identification answers 'Who is this person?'. Fingerprints are 100% unique, while pelvis and skull reveal sex and age from bones.`,
    keyTerms: [{ term: 'Dactylography', definition: 'Study of fingerprint patterns for identification.', simpleExplanation: 'Unique fingerprints for identification.' }],
    stepByStep: [{ stepNumber: 1, title: 'Primary Data Collection', description: 'Determine Sex, Age, Stature, Race.', keyTakeaway: 'Narrows search parameters.' }],
    importantConcepts: [{ title: 'Skeletal Sex Accuracy', content: 'Pelvis = 95% accuracy.', type: 'info' }],
    flowcharts: [{ title: 'Fingerprint Patterns', description: 'Loops, Whorls, Arches, Composites.', steps: [{ label: 'Loops', description: '60-70% frequency.' }] }],
    tables: [{ title: 'Male vs Female Pelvis', headers: ['Feature', 'Male', 'Female'], rows: [['Subpubic Angle', 'V-shaped (<75°)', 'U-shaped (>90°)']] }],
    clinicalExamples: [{ title: 'Mass Disaster Identification', scenario: 'Burnt plane crash victims.', analysis: 'Identified by dental charts and pelvis.', takeaway: 'Teeth and bones resist heat.' }],
    medicolegalImportance: ['Establishes Corpus Delicti in criminal trials.'],
    mnemonics: [{ title: 'Gustafson 6 Parameters', phrase: 'A-P-S-C-R-T', breakdown: [{ letter: 'A', word: 'Attrition', meaning: 'Tooth wear' }] }],
    commonMistakes: [{ mistake: 'Confusing temporary vs permanent tooth size.', whyWrong: 'Deciduous molars are larger than premolars.', correctConcept: 'X-ray for permanent tooth germs.' }],
    highYieldPoints: ['Pelvis = 95% accuracy for sex determination.'],
    previousExamQuestions: [{ question: 'Describe sex determination from pelvis.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'How many matching points needed for fingerprint proof?', answer: '10 to 12 ridge characteristic points.' }],
    shortNotes: [{ title: 'Gustafson Method', answer: 'Scores 6 dental parameters to estimate adult age.' }],
    longQuestions: [{ title: 'Discuss forensic identification from skeleton.', outline: ['Sex', 'Age', 'Stature', 'Odontology'] }],
    mcqs: [{ id: 1, question: 'Best bone for sex determination:', options: ['Pelvis', 'Skull', 'Femur', 'Radius'], correctIndex: 0, explanation: 'Pelvis gives 95% accuracy.' }],
    caseBasedQuestions: [{ id: 1, title: 'Skeleton in Forest', scenario: 'Wide subpubic angle >90° found.', questions: ['What sex?'], solution: 'Female.', legalSections: ['Osteology'] }],
    summary: 'Chapter 4 covers dactylography, osteology, odontology, and superimposition.',
    revisionSheet: ['Pelvis = 95% accuracy for sex.', '10-12 fingerprint matching points.'],
    flashcards: [{ id: 1, front: 'Sex accuracy of pelvis?', back: '95%.', category: 'Osteology' }]
  },
  {
    id: 'medicolegal-autopsy',
    chapterNumber: 5,
    title: 'Medicolegal Autopsy, Exhumation & Virtopsy',
    section: 'Section A: Forensic Medicine',
    readTime: '22 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Compare Clinical / Pathological Autopsy vs Medicolegal Autopsy.',
      'Understand police requisition, inquest paper, and rules of postmortem examination.',
      'Master primary autopsy techniques (Virchow, Rokitansky, Letulle, Ghon).',
      'Learn procedure and legal safeguards for Exhumation in India.',
      'Understand modern Virtopsy (Virtual Autopsy - CT / MRI postmortem imaging).'
    ],
    introduction: `Medicolegal Autopsy (postmortem examination) is the scientific dissection of a dead body under legal authority to determine cause of death, time since death, manner of death, and identify weapons or trace evidence. Unlike clinical autopsies, medicolegal autopsies do not require consent from relatives—they are mandated by legal requisition from police or magistrate.`,
    whyThisMatters: `Performing or observing autopsies is an integral part of forensic training. A well-conducted autopsy clarifies homicidal, suicidal, or accidental deaths and ensures proper preservation of viscera for toxicological chemical analysis.`,
    simpleExplanation: `A medicolegal autopsy is a legal medical investigation of a dead body. No consent from family is needed because it is ordered by law. The doctor opens all three main body cavities (Head, Chest, and Abdomen), examines every organ, collects blood/viscera for testing, and writes an Autopsy Report. Exhumation means digging up a buried body under Magistrate's orders.`,
    keyTerms: [
      {
        term: 'Medicolegal Autopsy',
        definition: 'Postmortem examination performed under legal authorization in unnatural, sudden, or suspicious deaths to establish cause and manner of death.',
        simpleExplanation: 'Legal autopsy performed to solve suspicious or unnatural deaths.'
      },
      {
        term: 'Exhumation',
        definition: 'The lawful disinterment or digging out of a buried human body from the earth for medicolegal investigation or identification.',
        simpleExplanation: 'Digging up a buried corpse under Magistrate orders for autopsy.'
      },
      {
        term: 'Virtopsy (Virtual Autopsy)',
        definition: 'Non-invasive postmortem examination utilizing multi-slice computed tomography (MSCT) and magnetic resonance imaging (MSMRI) to visualize internal injuries without incision.',
        simpleExplanation: '3D scanning (CT/MRI) of a corpse to find fractures or bullets without cutting.'
      },
      {
        term: 'Rokitansky Technique',
        definition: 'Autopsy technique characterized by in situ dissection and examination of viscera organ by organ without removing the organ block.',
        simpleExplanation: 'Examining organs directly inside the body cavities.'
      },
      {
        term: 'Letulle Technique',
        definition: 'Autopsy technique where thoracic, abdominal, and pelvic organs are removed en masse (as a single large block) for dissection.',
        simpleExplanation: 'Removing all organs out together in one single big block.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Verification of Legal Requisition & Identity',
        description: 'Verify police requisition form (Challan), dead body identification by police/relatives, and inquest papers before starting.',
        keyTakeaway: 'Never begin an autopsy without formal written requisition from police or magistrate.'
      },
      {
        stepNumber: 2,
        title: 'External Examination',
        description: 'Examine clothes, height, rigor mortis, postmortem lividity, injuries, trace evidence, defense wounds, and natural orifices.',
        keyTakeaway: 'Meticulous external examination often reveals key clues before any incision.'
      },
      {
        stepNumber: 3,
        title: 'Internal Dissection (3 Main Cavities)',
        description: 'Dissect and examine Cranial, Thoracic, and Abdominal/Pelvic cavities. Examine neck structures in situ in hanging/strangulation cases.',
        keyTakeaway: 'All three body cavities MUST be opened in every medicolegal autopsy.'
      },
      {
        stepNumber: 4,
        title: 'Viscera Preservation & Final Report Writing',
        description: 'Preserve viscera in saturated salt solution or rectified spirit (except alcohol poisoning), seal containers, and issue Postmortem Report.',
        keyTakeaway: 'Viscera preservation preserves toxicological evidence for chemical analysis.'
      }
    ],
    importantConcepts: [
      {
        title: 'Viscera Preservation Rule in Poisoning Cases',
        content: 'Standard preservative = Saturated solution of Common Salt (NaCl). In Carbolic acid poisoning, NaCl is contraindicated (use rectified spirit). In Alcohol/Phosphorus poisoning, Rectified Spirit is contraindicated (use NaCl).',
        type: 'warning'
      },
      {
        title: 'Exhumation Authority in India',
        content: 'Exhumation can be ordered ONLY by an Executive Magistrate (Sec 176 CrPC / 196 BNSS). There is no time limit for exhumation in India.',
        type: 'legal'
      }
    ],
    flowcharts: [
      {
        title: 'Medicolegal Autopsy Sequential Workflow',
        description: 'Step-by-step process from corpse arrival to final report.',
        steps: [
          { label: 'Requisition & ID', description: 'Receive police requisition, verify body identification and inquest papers.' },
          { label: 'External Exam', description: 'Document clothing, height, lividity, rigor, injuries, and trace evidence.' },
          { label: 'Internal Exam', description: 'Open Head, Thorax, and Abdomen cavities; inspect all organs.' },
          { label: 'Sample Collection', description: 'Collect viscera, blood, stomach wash, or bone marrow in sealed jars.' },
          { label: 'Report & Handover', description: 'Issue PM Report and hand body over to police with sealed exhibits.' }
        ]
      }
    ],
    tables: [
      {
        title: 'Clinical Autopsy vs Medicolegal Autopsy',
        headers: ['Feature', 'Clinical / Pathological Autopsy', 'Medicolegal Autopsy'],
        rows: [
          ['Primary Objective', 'Study disease pathology and cause of natural death', 'Establish cause/manner of death for administration of justice'],
          ['Authorization', 'Consent of deceased\'s nearest relatives required', 'Legal requisition by police or magistrate (no consent needed)'],
          ['Scope', 'Specific organs or disease site may be examined', 'All three body cavities MUST be opened and examined'],
          ['Evidence Handling', 'Routine histopathology samples', 'Legal chain of custody, viscera preservation, trace evidence'],
          ['Body Handover', 'Handed to family members', 'Handed back to investigating police officer']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Exhumation in Suspected Poisoning Case',
        scenario: 'A body buried 6 months ago is suspected to have been poisoned with Arsenic. The Magistrate orders exhumation.',
        analysis: 'The medical officer collects soil samples from above, below, and adjacent to the coffin as control samples alongside preserved bones and hair.',
        takeaway: 'Control soil samples exclude environmental soil contamination in heavy metal analysis.'
      }
    ],
    medicolegalImportance: [
      'Determines exact cause, time, and mechanism of unnatural deaths.',
      'Preserves toxicological and DNA evidence for court trials.',
      'Resolves disputed cases of homicide vs suicide vs accident.'
    ],
    mnemonics: [
      {
        title: 'Autopsy Organ Removal Techniques - "V-R-L-G"',
        phrase: 'Virchow, Rokitansky, Letulle, Ghon',
        breakdown: [
          { letter: 'V', word: 'Virchow', meaning: 'Organ-by-organ removal and individual dissection' },
          { letter: 'R', word: 'Rokitansky', meaning: 'In situ dissection without organ removal' },
          { letter: 'L', word: 'Letulle', meaning: 'En masse removal of all thoracic & abdominal organs together' },
          { letter: 'G', word: 'Ghon', meaning: 'En bloc removal of anatomically/functionally related organ groups' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Opening only the abdomen in suspected abdominal trauma cases.',
        whyWrong: 'Law requires opening all three cavities (Head, Chest, Abdomen) in every medicolegal autopsy.',
        correctConcept: 'Failure to open head cavity invalidates autopsy completeness in court.'
      }
    ],
    highYieldPoints: [
      'Medicolegal autopsy requires NO consent from relatives.',
      'All 3 cavities (Head, Chest, Abdomen) MUST be opened.',
      'Exhumation ordered ONLY by Executive Magistrate (Sec 176 CrPC / 196 BNSS).',
      'No time limit for exhumation in India.',
      'Saturated NaCl = Standard viscera preservative.'
    ],
    previousExamQuestions: [
      { question: 'Differentiate between Clinical and Medicolegal Autopsy. Discuss viscera preservation in poisoning.', year: '2023', marks: 10 },
      { question: 'Write a short note on Exhumation procedure and precautions.', year: '2021', marks: 5 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is the time limit for exhumation in India?',
        answer: 'There is NO time limit for exhumation in India (unlike UK/France where limits exist). It can be performed as long as bones or grave remnants persist.',
        clinicalPearl: 'Arsenic, lead, and antimony persist in bones for decades.'
      },
      {
        id: 2,
        question: 'Which preservative is used for viscera in alcohol poisoning?',
        answer: 'Saturated Solution of Common Salt (NaCl). Rectified spirit is strictly avoided because it contains ethanol.',
        clinicalPearl: 'Always preserve control sample of the preservative in a separate bottle.'
      }
    ],
    shortNotes: [
      {
        title: 'Virtopsy (Virtual Autopsy)',
        answer: 'Non-invasive postmortem procedure using CT/MRI imaging and 3D surface scanning. It visualizes bullet tracks, fractures, gas emboli, and deep vascular injuries without disfiguring the corpse. Highly acceptable in religious communities opposed to physical dissection.'
      }
    ],
    longQuestions: [
      {
        title: 'Describe the procedure of a Medicolegal Autopsy and detail the rules of Viscera Preservation for Chemical Analysis.',
        outline: [
          'Objectives and legal authorization (Police requisition vs Magistrate order)',
          'External examination steps and injury documentation',
          'Internal dissection techniques (Virchow, Rokitansky, Letulle, Ghon)',
          'Viscera preservation: organs collected, preservatives used, control samples, and chain of custody'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Who is authorized to order an Exhumation in India?',
        options: ['Police Sub-Inspector', 'Executive Magistrate', 'High Court Advocate', 'Medical Officer'],
        correctIndex: 1,
        explanation: 'Under Sec 176 CrPC / 196 BNSS, only an Executive Magistrate can issue an order for exhumation.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Suspected Homicidal Poisoning in Buried Remains',
        scenario: 'A body buried 3 months ago is suspected to have been poisoned. Police request an autopsy. Relatives object.',
        questions: ['Is consent of relatives required for exhumation?', 'What control samples must be collected?'],
        solution: '1. No, consent is not required when ordered by Executive Magistrate. 2. Control soil samples from above, below, and surrounding the grave.',
        legalSections: ['Section 176 CrPC / 196 BNSS', 'Exhumation']
      }
    ],
    summary: 'Chapter 5 covers autopsy protocols, organ dissection techniques, viscera preservation rules, exhumation laws, and modern virtopsy.',
    revisionSheet: [
      'Medicolegal Autopsy = Legal requisition, no consent, all 3 cavities opened.',
      'Exhumation = Executive Magistrate order, no time limit in India.',
      'Standard Viscera Preservative = Saturated NaCl solution.',
      'Virtopsy = Postmortem CT/MRI scanning.'
    ],
    flashcards: [
      { id: 1, front: 'Who orders exhumation in India?', back: 'Executive Magistrate.', category: 'Exhumation' },
      { id: 2, front: 'What preservative is used for viscera in alcohol poisoning?', back: 'Saturated solution of Common Salt (NaCl).', category: 'Viscera Preservation' }
    ]
  },
  {
    id: 'death-and-its-cause',
    chapterNumber: 6,
    title: 'Death, Brain Death, Modes & Causes of Death',
    section: 'Section A: Forensic Medicine',
    readTime: '18 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Define Somatic Death (Somatic / Clinical) vs Molecular Death (Cellular).',
      'Understand the Tripod of Life (Bichat\'s Tripod: CNS, CVS, Respiratory Systems).',
      'Master Brain Stem Death criteria under Transplantation of Human Organs Act (THOA 1994).',
      'Differentiate Cause of Death, Manner of Death, and Mechanism of Death.',
      'Learn clinical tests for death confirmation (Magnus, Winslow, Diaphanous, Icard).'
    ],
    introduction: `Death is not an instantaneous event but a continuous process transitioning from Somatic Death (cessation of vital organ functions) to Molecular Death (death of individual tissues and cells). In modern medicine, the concept of Brain Stem Death is legally recognized to enable organ transplantation while ensuring ethical safeguards.`,
    whyThisMatters: `Accurately certifying cause and manner of death is a primary responsibility of medical practitioners. Understanding Brain Stem Death testing parameters ensures compliance with THOA 1994 during organ harvest procedures.`,
    simpleExplanation: `Somatic death happens when the heart, lungs, and brain stop working permanently. Cellular (molecular) death happens 1 to 2 hours later when individual cells run out of oxygen and die. 'Brain Stem Death' means irreversible loss of brain stem reflexes, allowing organs to be harvested for transplant while artificial ventilation keeps heart pumping temporarily.`,
    keyTerms: [
      {
        term: 'Somatic Death (Clinical Death)',
        definition: 'Irreversible cessation of the functions of the brain, heart, and lungs (Bichat\'s Tripod of Life), leading to loss of consciousness and reflex activity.',
        simpleExplanation: 'Systemic death when brain, heart, and lungs stop functioning.'
      },
      {
        term: 'Molecular Death (Cellular Death)',
        definition: 'The gradual, progressive death of individual tissues and cells of the body, occurring 1 to 2 hours after somatic death.',
        simpleExplanation: 'Cellular death occurring 1 to 2 hours after clinical death.'
      },
      {
        term: 'Brain Stem Death',
        definition: 'Irreversible cessation of all functions of the brainstem, rendering the individual incapable of independent respiration and consciousness.',
        simpleExplanation: 'Permanent loss of brainstem reflexes; legally recognized as death for organ donation.'
      },
      {
        term: 'Cause of Death',
        definition: 'The specific disease, injury, or toxic agent responsible for initiating the lethal physiological sequence.',
        simpleExplanation: 'The underlying injury or illness that directly led to death (e.g. Gunshot wound to head).'
      },
      {
        term: 'Manner of Death',
        definition: 'The legal classification of how the cause of death came about: Homicidal, Suicidal, Accidental, Natural, or Undetermined.',
        simpleExplanation: 'The legal category of death: Natural, Homicide, Suicide, or Accident.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Clinical Assessment of Vital Cessation',
        description: 'Verify permanent absence of spontaneous respiration, heart sounds (auscultate 5 mins), and carotid pulse.',
        keyTakeaway: 'Confirmation of somatic death requires total absence of vital signs.'
      },
      {
        stepNumber: 2,
        title: 'Brain Stem Reflex Testing (THOA Guidelines)',
        description: 'Perform pupillary light reflex, corneal reflex, vestibulo-ocular (caloric) reflex, gag reflex, and apnea test twice, 6 hours apart.',
        keyTakeaway: 'Testing must be performed by a panel of 4 doctors (including neurologist/neurosurgeon).'
      },
      {
        stepNumber: 3,
        title: 'Apnea Test Execution',
        description: 'Pre-oxygenate with 100% O2, disconnect ventilator for 10 minutes while supplying 100% O2 via tracheal catheter, monitor PaCO2 (>60 mmHg without respiratory effort confirms brainstem death).',
        keyTakeaway: 'Apnea test confirms absolute loss of respiratory center drive.'
      },
      {
        stepNumber: 4,
        title: 'Death Certification & Cause Documentation',
        description: 'Fill WHO Medical Certification of Cause of Death (Form 4/4A) separating Immediate Cause, Antecedent Cause, and Underlying Cause.',
        keyTakeaway: 'Never write vague terms like "Cardiac Arrest" as cause of death.'
      }
    ],
    importantConcepts: [
      {
        title: 'Medical Board Requirement for Brain Stem Death (THOA 1994)',
        content: 'Requires 4 certified doctors: 1. Doctor in-charge of hospital, 2. Independent specialist doctor, 3. Neurologist or Neurosurgeon, 4. Treating physician. Tests repeated after 6 hours.',
        type: 'legal'
      }
    ],
    flowcharts: [
      {
        title: 'Bichat\'s Tripod of Life & Modes of Death',
        description: 'The three vital organ systems whose failure leads to somatic death.',
        steps: [
          { label: 'Central Nervous System', description: 'Failure causes Coma (e.g. Head injury, opioids, stroke).' },
          { label: 'Cardiovascular System', description: 'Failure causes Syncope (e.g. Massive hemorrhage, heart attack).' },
          { label: 'Respiratory System', description: 'Failure causes Asphyxia (e.g. Hanging, drowning, CO poisoning).' }
        ]
      }
    ],
    tables: [
      {
        title: 'Cause vs Manner vs Mechanism of Death',
        headers: ['Category', 'Definition', 'Clinical Example'],
        rows: [
          ['Cause of Death', 'The underlying disease or injury initiating lethal process', 'Stab wound of the heart'],
          ['Mechanism of Death', 'The physiological / biochemical disturbance produced', 'Hemorrhagic hypovolemic shock'],
          ['Manner of Death', 'The legal category of circumstance', 'Homicide']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Organ Transplantation from Brain Stem Dead Donor',
        scenario: 'A head injury victim on mechanical ventilator shows fixed dilated pupils, absent corneal/gag reflexes, and positive apnea test.',
        analysis: 'Brain stem death certified by 4-doctor panel twice at 6-hour interval allows legal organ retrieval under THOA 1994.',
        takeaway: 'THOA 1994 legally equates Brain Stem Death with actual death.'
      }
    ],
    medicolegalImportance: [
      'Establishes legal time and cause of death for insurance, inheritance, and criminal trial.',
      'Enables legal cadaveric organ harvesting under THOA 1994.',
      'Prevents premature burial or organ retrieval in suspended animation cases.'
    ],
    mnemonics: [
      {
        title: 'Modes of Somatic Death - "C-A-S"',
        phrase: 'Coma, Asphyxia, Syncope',
        breakdown: [
          { letter: 'C', word: 'Coma', meaning: 'Death originating from failure of brain/CNS' },
          { letter: 'A', word: 'Asphyxia', meaning: 'Death originating from failure of respiration/lungs' },
          { letter: 'S', word: 'Syncope', meaning: 'Death originating from failure of circulation/heart' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing "Cardiopulmonary Arrest" as underlying cause of death on certificate.',
        whyWrong: 'Cardiopulmonary arrest is the mechanism of dying in everyone, not a specific cause of death.',
        correctConcept: 'Record the specific underlying disease/injury (e.g., Acute Myocardial Infarction).'
      }
    ],
    highYieldPoints: [
      'Bichat Tripod = CNS (Coma), CVS (Syncope), Respiration (Asphyxia).',
      'THOA 1994 = Panel of 4 doctors, 2 tests performed 6 hours apart.',
      'Apnea test = PaCO2 > 60 mmHg confirms respiratory center failure.',
      'Suspended Animation = Apparent death with vital functions at lowest threshold.',
      'Molecular death occurs 1-2 hours after somatic death.'
    ],
    previousExamQuestions: [
      { question: 'Define Death. Describe Brain Stem Death testing and THOA 1994 requirements in detail.', year: '2023', marks: 10 },
      { question: 'Differentiate Cause, Manner, and Mechanism of Death with examples.', year: '2021', marks: 5 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is Suspended Animation? Name two conditions where it occurs.',
        answer: 'State where vital functions (respiration, circulation) are reduced to a minimum, simulating death. Occurs in: Drowning, Hypothermia, Newborn asphyxia, Opioid overdose, Voluntary trance (Yogic samadhi).',
        clinicalPearl: 'Always double-check vital signs before issuing death certificate.'
      },
      {
        id: 2,
        question: 'How long apart must Brain Stem Death tests be performed in adults under THOA 1994?',
        answer: 'The tests must be performed TWICE, at an interval of at least 6 hours.',
        clinicalPearl: 'In infants <1 year, interval is 24 hours.'
      }
    ],
    shortNotes: [
      {
        title: 'Apnea Test Procedure for Brain Stem Death',
        answer: 'Confirms total absence of brainstem respiratory drive. Patient pre-oxygenated with 100% O2 for 10 mins. Ventilator disconnected while 100% O2 delivered at 6 L/min via tracheal cannula. Absence of breathing effort while PaCO2 reaches >= 60 mmHg confirms brainstem death.'
      }
    ],
    longQuestions: [
      {
        title: 'Discuss Somatic and Molecular Death. Detail Brain Stem Death certification under THOA 1994.',
        outline: [
          'Definitions: Somatic Death, Molecular Death, Suspended Animation',
          'Bichat\'s Tripod of Life (Coma, Asphyxia, Syncope)',
          'Brain Stem Death criteria and reflexes tested',
          'Legal provisions of Transplantation of Human Organs Act (THOA 1994)'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Under THOA 1994, Brain Stem Death testing in adults must be repeated after an interval of at least:',
        options: ['1 hour', '3 hours', '6 hours', '12 hours'],
        correctIndex: 2,
        explanation: 'THOA mandates 2 sets of brainstem reflex tests conducted at least 6 hours apart by the 4-doctor panel.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Organ Retrieval Requisition',
        scenario: 'A ventilated head trauma patient is certified brain dead by a single treating physician, and organ retrieval is initiated immediately.',
        questions: ['Is this organ retrieval legally valid?', 'What is the legal requirement under THOA 1994?'],
        solution: '1. No, legally invalid. 2. THOA requires a panel of 4 doctors and 2 tests 6 hours apart.',
        legalSections: ['THOA 1994', 'Brain Stem Death']
      }
    ],
    summary: 'Chapter 6 details somatic death, molecular death, brain stem death under THOA 1994, and death certification.',
    revisionSheet: [
      'Tripod = Brain (Coma), Heart (Syncope), Lungs (Asphyxia).',
      'Brain Stem Death Panel = 4 doctors, 2 tests 6 hours apart.',
      'Apnea test PaCO2 >= 60 mmHg confirms death.'
    ],
    flashcards: [
      { id: 1, front: 'What PaCO2 level confirms positive Apnea test?', back: 'PaCO2 >= 60 mmHg without spontaneous respiratory effort.', category: 'Brain Death' }
    ]
  },
  {
    id: 'postmortem-changes',
    chapterNumber: 7,
    title: 'Postmortem Changes, Rigor Mortis, Lividity & Putrefaction',
    section: 'Section A: Forensic Medicine',
    readTime: '28 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Understand sequence of postmortem changes: Immediate, Early, and Late.',
      'Master Postmortem Lividity (Livor Mortis / Hypostasis) and its medicolegal value.',
      'Master Rigor Mortis, Cadaveric Spasm, Cold Stiffening, and Heat Stiffening.',
      'Understand Putrefaction, Autolysis, Casper\'s Dictum, and Marbling.',
      'Learn Saponification (Adipocere) and Mummification.'
    ],
    introduction: `Postmortem changes represent the physical, chemical, and biological alterations that occur in a body after death. Meticulous study of these changes allows the forensic pathologist to estimate Time Since Death (Postmortem Interval - PMI), determine body position at death, identify postmortem interference, and infer cause of death in decomposed bodies.`,
    whyThisMatters: `Estimating Time Since Death is one of the most frequent and challenging questions asked by investigating officers in murder trials. Differentiating Postmortem Lividity from Contusions and Rigor Mortis from Cadaveric Spasm are classical high-yield examination topics.`,
    simpleExplanation: `After death, the body cools (Algor Mortis), gravity pools blood in lower areas causing purple spots (Postmortem Lividity / Livor Mortis), and muscles stiffen (Rigor Mortis). Later, bacteria break down tissues causing green discoloration in the right iliac fossa, foul gases, and bloating (Putrefaction). In wet warm environments, fat turns into soap (Adipocere); in hot dry air, the body dries up like leather (Mummification).`,
    keyTerms: [
      {
        term: 'Algor Mortis (Postmortem Cooling)',
        definition: 'The progressive cooling of the dead body until it reaches thermal equilibrium with the ambient environmental temperature.',
        simpleExplanation: 'Postmortem cooling of the body to room temperature.'
      },
      {
        term: 'Livor Mortis (Postmortem Lividity / Hypostasis)',
        definition: 'Purplish-red discoloration of the dependent skin areas caused by gravitational settling of blood in capillaries after cardiac arrest.',
        simpleExplanation: 'Purple skin staining where blood settles by gravity after death.'
      },
      {
        term: 'Rigor Mortis (Postmortem Stiffening)',
        definition: 'State of muscle stiffening and shortening occurring after death due to irreversible ATP depletion and cross-linking of actin and myosin.',
        simpleExplanation: 'Postmortem muscle stiffening caused by loss of cellular energy (ATP).'
      },
      {
        term: 'Cadaveric Spasm (Instantaneous Rigor)',
        definition: 'Immediate, intense muscle contraction occurring at the exact moment of death, skipping primary flaccidity, crystallizing the last voluntary act.',
        simpleExplanation: 'Instant muscle spasm at the moment of violent death (e.g. gripping weapon or weeds).'
      },
      {
        term: 'Adipocere (Saponification)',
        definition: 'Postmortem alteration where soft tissue subcutaneous fat is hydrolyzed and hydrogenated into a yellowish-white, waxy, rancid fatty substance.',
        simpleExplanation: 'Fat turning into waxy soap in warm, moist, anaerobic environments.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Immediate Postmortem Changes (0 to 1 Hour)',
        description: 'Complete muscle flaccidity (Primary Flaccidity), loss of reflexes, ocular changes (Kevorkian sign / segmenting blood columns in retina, corneal clouding).',
        keyTakeaway: 'Primary flaccidity precedes rigor mortis.'
      },
      {
        stepNumber: 2,
        title: 'Early Postmortem Changes (1 to 24 Hours)',
        description: 'Algor mortis (cools ~0.5-1°C/hr), Livor mortis appears (1-2 hrs, fixes at 6-12 hrs), Rigor mortis starts (1-2 hrs, fully formed at 12 hrs, lasts 12 hrs, passes off in 12 hrs).',
        keyTakeaway: 'Rigor mortis follow Nysten\'s Law (appears first in small involuntary muscles, then face, trunk, limbs).'
      },
      {
        stepNumber: 3,
        title: 'Late Postmortem Changes - Putrefaction (24 to 72 Hours)',
        description: 'Greenish discoloration in Right Iliac Fossa (24 hrs), Marbling of cutaneous veins (36-48 hrs), Foul gas bloating, skin blisters, purging (48-72 hrs).',
        keyTakeaway: 'H2S gas combining with hemoglobin forms green Sulfhemoglobin in cecum/RIF.'
      },
      {
        stepNumber: 4,
        title: 'Special Modified Forms (Weeks to Months)',
        description: 'Adipocere formation (requires moisture, anaerobic soil; takes weeks/months) or Mummification (requires hot, dry, ventilated air).',
        keyTakeaway: 'Both Adipocere and Mummification preserve body features for identification.'
      }
    ],
    importantConcepts: [
      {
        title: 'Casper\'s Dictum (Rate of Decomposition)',
        content: 'A body decomposes at equal rates in: 1 week in Air = 2 weeks in Water = 8 weeks in Earth (Ratio 1 : 2 : 8).',
        type: 'info'
      },
      {
        title: 'Cherry-Red vs Dark Lividity Colors',
        content: 'Normal lividity = Bluish-purple. Carbon Monoxide poisoning = Cherry-red. Cyanide poisoning = Bright red/pink. Phosphorus = Dark brown. Nitrates/Aniline = Chocolate brown.',
        type: 'warning'
      }
    ],
    flowcharts: [
      {
        title: 'Chronological Timeline of Postmortem Changes in Tropical India',
        description: 'Sequential postmortem changes over time.',
        steps: [
          { label: '0 - 2 Hours', description: 'Primary flaccidity, Kevorkian sign in eye, Livor mortis onset.' },
          { label: '2 - 12 Hours', description: 'Rigor mortis develops, Livor mortis becomes fixed (6-12 hrs).' },
          { label: '12 - 24 Hours', description: 'Rigor mortis fully established, begins passing off in same order.' },
          { label: '24 - 48 Hours', description: 'Green RIF discoloration, Marbling of skin veins, foul putrefactive gases.' },
          { label: '3 - 7 Days', description: 'Bloating, skin slippage, maggot infestation, organ liquefaction.' }
        ]
      }
    ],
    tables: [
      {
        title: 'Postmortem Lividity vs Bruise (Contusion)',
        headers: ['Feature', 'Postmortem Lividity', 'Bruise (Contusion)'],
        rows: [
          ['Mechanism', 'Gravitational blood pooling inside intact capillaries', 'Extravasation of blood into tissues from torn vessels'],
          ['Location', 'Dependent uncompressed body regions', 'Any site of blunt force impact'],
          ['Elevation', 'Level with surrounding skin', 'Elevated/swollen due to edema/hematoma'],
          ['Incision Test', 'Blood washes away easily with water jet', 'Clotted blood firmly adherent to tissue spaces'],
          ['Microscopy', 'Intact RBCs inside capillary lumen', 'Extravasated lysed RBCs in tissue matrix']
        ]
      },
      {
        title: 'Rigor Mortis vs Cadaveric Spasm',
        headers: ['Feature', 'Rigor Mortis', 'Cadaveric Spasm'],
        rows: [
          ['Onset', 'Delayed (1 to 2 hours after death)', 'Instantaneous at the moment of death'],
          ['Primary Flaccidity', 'Present (muscle is relaxed before stiffening)', 'Absent (direct transition from contraction to spasm)'],
          ['Mechanism', 'Depletion of ATP in dead muscle', 'Unknown neuro-genic/emotional state at violent death'],
          ['Muscles Involved', 'All voluntary & involuntary muscles', 'Selected voluntary muscle groups (e.g. hand)'],
          ['Medicolegal Value', 'Estimates time since death (PMI)', 'Proves suicide, drowning, or last voluntary act']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Drowning Victim Gripping River Weeds (Cadaveric Spasm)',
        scenario: 'A body recovered from a river firmly grips riverbed weeds and mud in the right hand. Relatives suspect murder.',
        analysis: 'Presence of weeds in a tight cadaveric spasm proves the victim was alive when entering water and gripped weeds in a final struggle (proves ante-mortem drowning).',
        takeaway: 'Cadaveric spasm cannot be simulated postmortem.'
      }
    ],
    medicolegalImportance: [
      'Estimates Time Since Death (Postmortem Interval - PMI).',
      'Determines whether body position was shifted after death (Fixed Lividity).',
      'Distinguishes suicide from homicide (Cadaveric Spasm).'
    ],
    mnemonics: [
      {
        title: 'Rigor Mortis 12-Hour Rule in India - "12-12-12"',
        phrase: 'Takes 12, Stays 12, Passes 12',
        breakdown: [
          { letter: '12', word: 'Takes 12 hrs', meaning: 'Takes ~12 hours to fully form' },
          { letter: '12', word: 'Stays 12 hrs', meaning: 'Persists fully formed for ~12 hours' },
          { letter: '12', word: 'Passes 12 hrs', meaning: 'Takes ~12 hours to completely pass off' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mistaking Postmortem Lividity for ante-mortem bruising in dependent areas.',
        whyWrong: 'Lividity is intravascular blood pooling; a bruise is extravasated blood.',
        correctConcept: 'Perform incision test: blood washes away in lividity, but stays clotted in tissues in a bruise.'
      }
    ],
    highYieldPoints: [
      'Nysten\'s Law = Sequence of Rigor Mortis onset.',
      'Livor Mortis Fixation = 6 to 12 hours.',
      'Casper\'s Dictum = Air : Water : Earth = 1 : 2 : 8.',
      'Green RIF Discoloration = 24 hours in RIF (Sulfhemoglobin).',
      'Cherry Red Lividity = CO Poisoning; Bright Pink = Cyanide.'
    ],
    previousExamQuestions: [
      { question: 'Describe Postmortem Lividity. Differentiate Lividity from Contusion with a neat table.', year: '2023', marks: 10 },
      { question: 'Write short notes on: Cadaveric Spasm and Adipocere.', year: '2021', marks: 10 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is Casper\'s Dictum?',
        answer: 'A body decomposes at the same rate in 1 week in Air = 2 weeks in Water = 8 weeks in Soil (Ratio 1:2:8).',
        clinicalPearl: 'Water retards decomposition relative to air due to lower temperature.'
      },
      {
        id: 2,
        question: 'What is Marbling of skin?',
        answer: 'Arborescent green-purple pattern on skin (at 36-48 hrs) caused by putrefactive bacteria spreading along subcutaneous veins producing iron sulfide.',
        clinicalPearl: 'Outlines the superficial venous network.'
      }
    ],
    shortNotes: [
      {
        title: 'Adipocere (Saponification)',
        answer: 'Hydrolysis and hydrogenation of body fat into fatty acids (palmitic, oleic, stearic) by Clostridium perfringens lecithinase. Requires warm, moist, anaerobic environment. Body becomes waxy, yellowish-white, with rancid cheese odor. Preserves body contours for identification.'
      }
    ],
    longQuestions: [
      {
        title: 'Discuss Postmortem Stiffening. Differentiate Rigor Mortis from Cadaveric Spasm, Heat Stiffening, and Cold Stiffening.',
        outline: [
          'Mechanism of Rigor Mortis (ATP depletion, cross-linking)',
          'Timeline and Nysten\'s Law of muscle involvement',
          'Detailed comparison table: Rigor Mortis vs Cadaveric Spasm',
          'Heat Stiffening (protein coagulation) vs Cold Stiffening (frozen fluids)'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Which sign is the earliest external sign of putrefaction in tropical climates?',
        options: ['Marbling of veins', 'Greenish discoloration in Right Iliac Fossa', 'Skin slippage', 'Purging of fluid'],
        correctIndex: 1,
        explanation: 'Greenish discoloration in the right iliac fossa appears around 24 hours due to cecal gas forming sulfhemoglobin.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Weapon Gripped in Hand at Crime Scene',
        scenario: 'A deceased man is found with a revolver tightly clenched in his right hand. The weapon cannot be removed without using force.',
        questions: ['What is this condition called?', 'What is its medicolegal significance?'],
        solution: '1. Cadaveric Spasm. 2. Proves that the deceased was holding the gun at the exact moment of death (strong evidence of suicide).',
        legalSections: ['Cadaveric Spasm', 'Time Since Death']
      }
    ],
    summary: 'Chapter 7 covers postmortem changes including algor, livor, rigor mortis, cadaveric spasm, putrefaction, adipocere, and mummification.',
    revisionSheet: [
      'Lividity Fixation = 6-12 hrs.',
      'Rigor Mortis = 12-12-12 rule.',
      'Cadaveric Spasm = Instantaneous, proves suicide/drowning.',
      'Casper Dictum = 1:2:8.'
    ],
    flashcards: [
      { id: 1, front: 'What is Casper\'s Dictum ratio?', back: '1 week in Air = 2 weeks in Water = 8 weeks in Soil (1 : 2 : 8).', category: 'Putrefaction' }
    ]
  },
  {
    id: 'mechanical-injuries',
    chapterNumber: 8,
    title: 'Mechanical Injuries - Abrasions, Contusions, Lacerations & Ballistics',
    section: 'Section A: Forensic Medicine',
    readTime: '30 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Define Injury, Hurt (Sec 319 IPC / 114 BNS), and Grievous Hurt (Sec 320 IPC / 116 BNS).',
      'Master classification and age determination of Abrasions, Contusions (Bruises), and Lacerations.',
      'Understand Incised Wounds, Chop Wounds, and Stab Wounds.',
      'Master Forensic Ballistics: Firearm injury characteristics (Entry vs Exit wound, Abrasion collar, Tattooing, Blacking).',
      'Differentiate Ante-mortem vs Post-mortem injuries.'
    ],
    introduction: `Mechanical injuries result from physical force applied to the body by blunt or sharp weapons or firearms. Under Indian criminal law, injuries are classified legally as Simple Hurt or Grievous Hurt, which determines the penal severity. Medicolegal interpretation of wound age, weapon type, entry/exit wounds in shooting cases, and ante-mortem vs post-mortem origin is fundamental to criminal justice.`,
    whyThisMatters: `Injury reports prepared by doctors form core evidence in criminal courts under Sections 319-326 IPC / Sections 114-118 BNS. Misinterpreting a laceration as an incised wound or an entry wound as an exit wound can completely derail murder investigations.`,
    simpleExplanation: `An Abrasion is a superficial scratch removing outer skin (epidermis). A Contusion (Bruise) is bleeding under intact skin. A Laceration is a torn, jagged wound caused by blunt force crushing tissue. An Incised wound is a clean cut caused by a sharp edge. Firearm entry wounds show blacking (smoke), tattooing (unburnt powder), and an abrasion collar, while exit wounds are larger, torn, and everted.`,
    keyTerms: [
      {
        term: 'Grievous Hurt (Sec 320 IPC / Sec 116 BNS)',
        definition: 'Eight specific severe classes of injuries designated by law, including emasculation, permanent loss of sight/hearing, bone fractures, disfiguration, or injuries endangering life for 20 days.',
        simpleExplanation: 'Eight legally defined severe injuries (e.g., fractures, loss of eye/ear, 20 days severe pain).'
      },
      {
        term: 'Abrasion Collar (Contusion Collar)',
        definition: 'A narrow, reddish-brown ring of abraded and bruised skin surrounding the firearm entry wound caused by friction of the spinning bullet.',
        simpleExplanation: 'Abraded ring around bullet entry wound caused by bullet friction.'
      },
      {
        term: 'Tattooing (Stippling)',
        definition: 'Multiple tiny reddish-brown punctate abrasions/hemorrhages around a firearm entry wound caused by impact of unburnt/partially burnt gunpowder grains at close range.',
        simpleExplanation: 'Speckled skin marks around bullet entry from unburnt gunpowder particles.'
      },
      {
        term: 'Defense Wounds',
        definition: 'Injuries suffered by a victim while attempting to ward off a weapon or protect vital body parts (typically on palms, ulnar forearms, or soles).',
        simpleExplanation: 'Injuries on hands/forearms received while trying to block a weapon.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Meticulous Documentation of Injury',
        description: 'Document exact anatomical location, size (length x width x depth in cm), shape, margins, color, direction, and presence of foreign matter.',
        keyTakeaway: 'Always measure dimensions in centimeters using a standardized ruler.'
      },
      {
        stepNumber: 2,
        title: 'Weapon Classification & Injury Type Matching',
        description: 'Differentiate blunt impact (abrasion, contusion, laceration) from sharp impact (incised, chop, stab) and missile impact (firearm/blast).',
        keyTakeaway: 'Margin characteristics reveal weapon class (jagged = blunt; clean = sharp).'
      },
      {
        stepNumber: 3,
        title: 'Age Determination of Bruises (Color Sequence)',
        description: 'Red/Blue-black (Fresh) -> Greenish (4-5 days) -> Yellowish (7-10 days) -> Normal skin (14 days).',
        keyTakeaway: 'Hemosiderin, Biliverdin, and Bilirubin breakdown causes color changes.'
      },
      {
        stepNumber: 4,
        title: 'Firearm Range Estimation',
        description: 'Contact range (star-shaped wound, carbon inside track) -> Close range (<30cm: blacking + tattooing) -> Intermediate range (30-90cm: tattooing only) -> Distant (>90cm: entry wound with collar only).',
        keyTakeaway: 'Presence of blacking and tattooing dictates firing distance.'
      }
    ],
    importantConcepts: [
      {
        title: 'The 8 Clauses of Grievous Hurt (Sec 320 IPC / Sec 116 BNS)',
        content: '1. Emasculation, 2. Permanent privation of sight of either eye, 3. Permanent privation of hearing of either ear, 4. Privation of any member/joint, 5. Destruction/impairment of power of any member/joint, 6. Permanent disfiguration of head/face, 7. Fracture/dislocation of bone/tooth, 8. Any hurt endangering life or causing 20 days severe bodily pain/incapacity.',
        type: 'legal'
      }
    ],
    flowcharts: [
      {
        title: 'Firearm Range Determination Workflow',
        description: 'Features around firearm entry wound dictating firing range.',
        steps: [
          { label: 'Contact Range (0 cm)', description: 'Muzzle imprint, star-shaped lacerated entry, cherry-red CO tissue staining.' },
          { label: 'Close Range (< 30 cm)', description: 'Entry wound + Abrasion collar + Flame burn + Blacking (soot) + Tattooing.' },
          { label: 'Intermediate Range (30 - 90 cm)', description: 'Entry wound + Abrasion collar + Tattooing (unburnt powder particles).' },
          { label: 'Distant Range (> 90 cm)', description: 'Clean circular entry wound + Abrasion collar ONLY (no soot or powder).' }
        ]
      }
    ],
    tables: [
      {
        title: 'Incised Wound vs Lacerated Wound',
        headers: ['Feature', 'Incised Wound (Cut)', 'Lacerated Wound'],
        rows: [
          ['Weapon Type', 'Sharp-edged weapon (Knife, razor, sword)', 'Blunt weapon (Lathi, stone, iron rod, accident)'],
          ['Margins', 'Clean-cut, linear, well-defined', 'Jagged, irregular, bruised, crushed'],
          ['Hair & Tissues', 'Hair clean-cut; tissue bridges absent', 'Hair crushed/intact; Tissue bridges present across floor'],
          ['Hemorrhage', 'Profuse external bleeding (cut vessels)', 'Moderate/less bleeding (crushed thrombosed vessels)'],
          ['Foreign Matter', 'Usually clean', 'Grit, dirt, grease, clothes buried in wound']
        ]
      },
      {
        title: 'Firearm Entry Wound vs Exit Wound',
        headers: ['Feature', 'Firearm Entry Wound', 'Firearm Exit Wound'],
        rows: [
          ['Size', 'Smaller than bullet caliber (usually)', 'Larger than bullet caliber'],
          ['Margins', 'Inverted (turned inwards)', 'Everted (turned outwards)'],
          ['Shape', 'Circular / Oval', 'Irregular, star-shaped, slit-like'],
          ['Abrasion Collar', 'Present around margins', 'ABSENT'],
          ['Blacking / Tattooing', 'Present in close / intermediate range', 'ABSENT']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Differentiating Head Laceration over Scalp from Incised Cut',
        scenario: 'A patient presents with a linear scalp wound after being hit with an iron rod. Relatives claim it was a sword cut.',
        analysis: 'Examination under magnification reveals crushed hair bulbs, tissue bridging across the floor, and irregular bruised margins, proving it is a laceration from a blunt rod.',
        takeaway: 'Scalp wounds over underlying bone can mimic incised cuts ("incised-like lacerations"). Look for tissue bridges!'
      }
    ],
    medicolegalImportance: [
      'Classifies legal severity of assault under Penal Code (Simple vs Grievous Hurt).',
      'Determines weapon class, direction of force, and range of shooting.',
      'Identifies homicide vs suicide vs self-inflicted / fabricated wounds.'
    ],
    mnemonics: [
      {
        title: 'The 8 Clauses of Grievous Hurt - "E-E-E-J-J-F-F-20"',
        phrase: 'Emasculation, Eyes, Ears, Joints, Joints-power, Face, Fractures, 20-days',
        breakdown: [
          { letter: 'E', word: 'Emasculation', meaning: 'Depriving a male of virility' },
          { letter: 'E', word: 'Eyes', meaning: 'Permanent loss of sight of either eye' },
          { letter: 'E', word: 'Ears', meaning: 'Permanent loss of hearing of either ear' },
          { letter: 'J', word: 'Joints / Member', meaning: 'Privation of any member or joint' },
          { letter: 'J', word: 'Joint Power', meaning: 'Destruction / impairment of joint power' },
          { letter: 'F', word: 'Face / Head', meaning: 'Permanent disfiguration of head or face' },
          { letter: 'F', word: 'Fracture', meaning: 'Fracture or dislocation of bone or tooth' },
          { letter: '20', word: '20 Days Pain', meaning: 'Hurt endangering life or causing 20 days severe pain' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Misdiagnosing a scalp laceration over bone as an incised knife wound.',
        whyWrong: 'Blunt force over scalp splits skin along aponeurosis, creating clean-looking edges.',
        correctConcept: 'Check floor of wound for tissue bridging (present in laceration, absent in incised cut).'
      }
    ],
    highYieldPoints: [
      'Grievous Hurt = Sec 320 IPC / Sec 116 BNS (8 clauses).',
      'Tissue Bridging = Pathognomonic feature of Lacerations.',
      'Blacking = Soot deposits (< 30 cm range).',
      'Tattooing = Unburnt powder impact (< 90 cm range).',
      'Entry wound inverted with abrasion collar; Exit wound everted without collar.'
    ],
    previousExamQuestions: [
      { question: 'Define Grievous Hurt under Sec 320 IPC. Differentiate Incised Wound from Lacerated Wound.', year: '2023', marks: 10 },
      { question: 'Describe firearm entry vs exit wound features in detail.', year: '2021', marks: 10 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is Tissue Bridging and where is it seen?',
        answer: 'Nerves, blood vessels, and fibrous bands stretching across the floor of a wound between torn margins. It is pathognomonic of Lacerations caused by blunt force.',
        clinicalPearl: 'Absent in clean incised wounds.'
      },
      {
        id: 2,
        question: 'What causes Blacking and Tattooing in firearm injuries?',
        answer: 'Blacking is caused by smoke/soot wiping onto skin (< 30 cm). Tattooing is caused by unburnt gunpowder grains embedding into dermis (< 90 cm).',
        clinicalPearl: 'Blacking can be washed off with water; tattooing cannot.'
      }
    ],
    shortNotes: [
      {
        title: 'Grievous Hurt (Sec 320 IPC / Sec 116 BNS)',
        answer: 'Law designates 8 severe injury classes: Emasculation, permanent loss of eye/ear, loss of member/joint, loss of joint power, head/face disfiguration, bone/tooth fracture, or injury endangering life / 20 days severe pain/incapacity.'
      }
    ],
    longQuestions: [
      {
        title: 'Discuss Mechanical Injuries. Detail Firearm Injury characteristics based on firing range.',
        outline: [
          'Classification of mechanical injuries (Blunt, Sharp, Firearm)',
          'Grievous hurt clauses under Indian Penal Code',
          'Firearm entry wound features at Contact, Close, Intermediate, and Distant ranges',
          'Comparison table: Firearm Entry vs Exit wounds'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Tissue bridging across the floor of a wound is characteristic of:',
        options: ['Incised wound', 'Lacerated wound', 'Stab wound', 'Firearm wound'],
        correctIndex: 1,
        explanation: 'Tissue bridging (spared vessels/nerves across floor) is a hallmark of blunt force lacerations.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Shooting Victim Entry & Exit Wound Analysis',
        scenario: 'A bullet wound on chest shows inverted margins with blacking and tattooing. An exit wound on the back is everted and star-shaped.',
        questions: ['What was the probable firing range?', 'Which wound is the entry wound?'],
        solution: '1. Close range (<30 cm due to presence of blacking and tattooing). 2. Chest wound is entry (inverted, blacking, tattooing).',
        legalSections: ['Forensic Ballistics', 'Firearm Injuries']
      }
    ],
    summary: 'Chapter 8 covers mechanical injuries, legal classification of hurt, sharp vs blunt wounds, and firearm ballistics.',
    revisionSheet: [
      'Grievous Hurt = 8 clauses.',
      'Tissue Bridging = Laceration.',
      'Blacking < 30 cm, Tattooing < 90 cm.',
      'Entry = Inverted + Collar; Exit = Everted, no collar.'
    ],
    flashcards: [
      { id: 1, front: 'What wound shows tissue bridging?', back: 'Lacerated wound.', category: 'Injuries' }
    ]
  },
  {
    id: 'regional-injuries',
    chapterNumber: 9,
    title: 'Regional Injuries - Head, Neck, Chest, Abdomen & Traffic Accidents',
    section: 'Section A: Forensic Medicine',
    readTime: '26 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Understand Skull Fractures: Fissured, Comminuted, Depressed, Pond, Ring, and Motorcyclist fractures.',
      'Master Intracranial Hemorrhages: Extradural (EDH), Subdural (SDH), Subarachnoid (SAH), Intracerebral.',
      'Differentiate Concussion, Contusion, Laceration, Coup injury, and Contrecoup injury.',
      'Understand Regional Injuries of Chest, Abdomen, Spinal Cord, and Pelvis.',
      'Understand Traffic Accident Injury Patterns: Pedestrian (Primary, Secondary, Run-over impact) vs Driver vs Passenger.'
    ],
    introduction: `Regional injuries involve blunt or sharp trauma to specific anatomical regions—Head, Neck, Thorax, Abdomen, Spine, and Extremities. Head injuries account for over 60% of trauma deaths in forensic practice. Understanding the biomechanics of skull fractures, intracranial hematomas, coup-contrecoup brain lesions, and pedestrian crash patterns is essential for autopsy diagnosis and traffic accident reconstruction.`,
    whyThisMatters: `In road traffic accidents (RTAs) and homicidal assaults, head and visceral injuries are the leading causes of death. Medical reports must accurately delineate Coup vs Contrecoup lesions and Extradural vs Subdural hemorrhages to reconstruct the direction and force of impact.`,
    simpleExplanation: `A 'Coup' injury occurs directly under the site of head impact, while a 'Contrecoup' injury occurs on the opposite side of the brain due to brain recoil! Extradural Hemorrhage (EDH) involves middle meningeal artery rupture causing a 'Lucid Interval' before rapid coma. In pedestrian car accidents, Primary impact hits the legs, Secondary impact throws the victim onto the hood/windshield, and Run-over injuries cause crushing.`,
    keyTerms: [
      {
        term: 'Lucid Interval',
        definition: 'A period of temporary mental clarity and consciousness occurring between initial unconsciousness at impact and subsequent coma due to expanding extradural hematoma.',
        simpleExplanation: 'Temporary regain of consciousness before collapsing into coma from arterial brain bleeding.'
      },
      {
        term: 'Coup Injury',
        definition: 'Brain contusion or laceration occurring directly at the site of head impact.',
        simpleExplanation: 'Brain injury right beneath the point of impact.'
      },
      {
        term: 'Contrecoup Injury',
        definition: 'Brain contusion or laceration occurring on the side opposite to the site of head impact due to brain movement inside the skull.',
        simpleExplanation: 'Brain injury on the opposite side of impact from brain rebound.'
      },
      {
        term: 'Ring Fracture of Skull Base',
        definition: 'A circular fracture encircling the foramen magnum of the skull base, caused by vertical compression (falling on feet/buttocks) or heavy blow to top of head.',
        simpleExplanation: 'Circular fracture line around skull base foramen magnum from vertical impact.'
      },
      {
        term: 'Whiplash Injury',
        definition: 'Hyperextension-hyperflexion injury of the cervical spine occurring in rear-end automobile collisions.',
        simpleExplanation: 'Neck sprain/injury from sudden backward-forward whipping motion in car crash.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Scalp & Skull Vault Dissection',
        description: 'Reflect scalp anteriorly and posteriorly. Inspect subgaleal hematomas. Identify fracture lines (fissured, depressed, comminuted).',
        keyTakeaway: 'Always reflect scalp completely before sawing the cranial vault.'
      },
      {
        stepNumber: 2,
        title: 'Dural & Intracranial Space Examination',
        description: 'Inspect extradural space (EDH), open dura mater, inspect subdural space (SDH), subarachnoid space (SAH), and brain surface contusions.',
        keyTakeaway: 'EDH is arterial (middle meningeal); SDH is venous (bridging veins).'
      },
      {
        stepNumber: 3,
        title: 'Coup vs Contrecoup Brain Mapping',
        description: 'Correlate external scalp impact site with internal brain contusions. Stationary head hit by moving object = Coup. Moving head hitting stationary object = Contrecoup.',
        keyTakeaway: 'Contrecoup contusions are dominant in falls onto back of head.'
      },
      {
        stepNumber: 4,
        title: 'Thoraco-Abdominal Organ Inspection',
        description: 'Examine rib fractures (flail chest, pneumothorax) and visceral tears (liver subcapsular hematoma, splenic rupture, mesenteric tears).',
        keyTakeaway: 'Two-stage splenic rupture can cause delayed fatal collapse days after minor trauma.'
      }
    ],
    importantConcepts: [
      {
        title: 'Middle Meningeal Artery & Extradural Hemorrhage (EDH)',
        content: 'Fracture of pterion / temporal bone ruptures anterior branch of Middle Meningeal Artery. Biconvex / lens-shaped hematoma on CT. Classically associated with Lucid Interval.',
        type: 'warning'
      }
    ],
    flowcharts: [
      {
        title: 'Pedestrian Road Traffic Accident Impact Sequence',
        description: 'Three classic stages of pedestrian collision by a motor vehicle.',
        steps: [
          { label: '1. Primary Impact', description: 'Vehicle bumper strikes pedestrian legs (bumper fractures of tibia/fibula).' },
          { label: '2. Secondary Impact', description: 'Pedestrian is scooped onto hood/windshield (head, chest, glass lacerations).' },
          { label: '3. Secondary Fall / Run-over', description: 'Pedestrian falls onto road surface or wheels roll over body (crushing, tire marks).' }
        ]
      }
    ],
    tables: [
      {
        title: 'Extradural Hemorrhage (EDH) vs Subdural Hemorrhage (SDH)',
        headers: ['Feature', 'Extradural Hemorrhage (EDH)', 'Subdural Hemorrhage (SDH)'],
        rows: [
          ['Vessel Source', 'Middle Meningeal Artery (Arterial)', 'Bridging Cortical Veins (Venous)'],
          ['Location', 'Between skull bone and Dura Mater', 'Between Dura Mater and Arachnoid Mater'],
          ['CT Shape', 'Biconvex / Lens-shaped', 'Crescent-shaped / Concavo-convex'],
          ['Lucid Interval', 'Classic & Prominent (20-50% cases)', 'Rare / Absent (gradual venous oozing)'],
          ['Skull Fracture', 'Present in > 90% cases', 'Present in 30-50% cases']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Lucid Interval in Extradural Hematoma',
        scenario: 'A cricket player is hit on the temple by a ball. He is knocked out briefly, recovers, walks home feeling fine, but collapses into coma 4 hours later.',
        analysis: 'Temporal bone fracture tore the middle meningeal artery. The 4-hour conscious window was the classic Lucid Interval before expanding EDH caused brain herniation.',
        takeaway: 'Any head trauma victim with transient loss of consciousness requires CT scanning.'
      }
    ],
    medicolegalImportance: [
      'Determines mechanism and direction of force in fatal head trauma.',
      'Differentiates homicidal assault from accidental falls (Coup vs Contrecoup).',
      'Reconstructs road traffic accident vehicle impact speed and collision sequence.'
    ],
    mnemonics: [
      {
        title: 'Pedestrian Impact Phases - "P-S-R"',
        phrase: 'Primary, Secondary, Run-over',
        breakdown: [
          { letter: 'P', word: 'Primary Impact', meaning: 'Bumper striking lower limbs' },
          { letter: 'S', word: 'Secondary Impact', meaning: 'Body striking hood/windshield' },
          { letter: 'R', word: 'Run-over', meaning: 'Body falling onto road and crushed under wheels' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming absence of skull fracture rules out fatal brain injury.',
        whyWrong: 'Severe acceleration-deceleration forces cause fatal Diffuse Axonal Injury (DAI) or SDH without skull fracture.',
        correctConcept: 'Internal brain injury can occur independently of skull fractures.'
      }
    ],
    highYieldPoints: [
      'EDH = Middle Meningeal Artery rupture, Biconvex CT, Lucid Interval.',
      'SDH = Bridging cortical veins, Crescent CT.',
      'Coup = Injury at impact site; Contrecoup = Injury opposite impact site.',
      'Ring Fracture = Around foramen magnum (fall on feet/buttocks).',
      'Whiplash Injury = Hyperflexion/hyperextension of cervical spine in rear-end crash.'
    ],
    previousExamQuestions: [
      { question: 'Discuss Intracranial Hemorrhages. Differentiate Extradural from Subdural Hemorrhage.', year: '2023', marks: 10 },
      { question: 'Describe injuries in Road Traffic Accidents (Pedestrian vs Driver).', year: '2021', marks: 10 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What is a Lucid Interval and in which intracranial hemorrhage is it classically seen?',
        answer: 'Period of mental clarity between initial trauma unconsciousness and secondary coma due to mass effect. Classically seen in Extradural Hemorrhage (EDH).',
        clinicalPearl: 'Surgical evacuation of EDH during lucid interval is life-saving.'
      },
      {
        id: 2,
        question: 'What is a Bumper Fracture?',
        answer: 'Fracture of tibia/fibula caused by direct primary impact of vehicle front bumper against pedestrian legs.',
        clinicalPearl: 'Height of bumper fracture from heel estimates vehicle front height.'
      }
    ],
    shortNotes: [
      {
        title: 'Coup vs Contrecoup Brain Injuries',
        answer: 'Coup injury occurs at impact site (stationary head hit by moving object). Contrecoup injury occurs opposite impact site (moving head hitting stationary surface due to brain lag). Contrecoup contusions typically affect frontal and temporal poles.'
      }
    ],
    longQuestions: [
      {
        title: 'Discuss Head Injuries in detail. Cover Skull Fractures, Intracranial Hemorrhages, and Coup-Contrecoup mechanisms.',
        outline: [
          'Types of skull fractures (Vault and Base)',
          'Intracranial hemorrhages (EDH, SDH, SAH, ICH) with clinical features',
          'Biomechanics of Coup and Contrecoup injuries',
          'Medicolegal importance in trauma reconstruction'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Extradural Hemorrhage is most commonly caused by rupture of:',
        options: ['Middle Meningeal Artery', 'Bridging Cortical Veins', 'Basilar Artery', 'Circle of Willis'],
        correctIndex: 0,
        explanation: 'Fracture of the temporal bone/pterion tears the Middle Meningeal Artery causing EDH.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Fall from Height with Ring Fracture',
        scenario: 'A construction worker falls 30 feet landing upright on his feet. Autopsy reveals a circular fracture encircling the foramen magnum.',
        questions: ['What is this fracture called?', 'What was the mechanism of fracture?'],
        solution: '1. Ring Fracture of skull base. 2. Vertical transmission of force from spine pushing condyles upward into skull base.',
        legalSections: ['Skull Base Fractures', 'Regional Injuries']
      }
    ],
    summary: 'Chapter 9 covers head injuries, skull fractures, intracranial hemorrhages (EDH vs SDH), coup-contrecoup mechanism, and traffic accident patterns.',
    revisionSheet: [
      'EDH = Middle meningeal artery, Lucid interval, Biconvex.',
      'SDH = Bridging veins, Crescent.',
      'Coup = Same side impact; Contrecoup = Opposite side.',
      'Bumper fracture = Primary pedestrian impact.'
    ],
    flashcards: [
      { id: 1, front: 'Which vessel tears in Extradural Hemorrhage?', back: 'Middle Meningeal Artery.', category: 'Head Injuries' }
    ]
  },
  {
    id: 'medicolegal-aspects-wounds',
    chapterNumber: 10,
    title: 'Medicolegal Aspects of Wounds, Homicide & Torture',
    section: 'Section A: Forensic Medicine',
    readTime: '24 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Differentiate Suicidal, Homicidal, and Accidental wounds.',
      'Recognize Hesitation Wounds, Defense Wounds, and Fabricated / Self-Inflicted Wounds.',
      'Understand Medicolegal differentiation of Ante-mortem vs Post-mortem wounds.',
      'Understand Torture, Custodial Violence, and Istanbul Protocol guidelines.',
      'Learn medicolegal documentation of battered child and domestic violence injuries.'
    ],
    introduction: `The medicolegal evaluation of wounds goes beyond describing physical anatomical damage—it requires reconstructing the circumstances under which the injury occurred. Distinguishing homicidal violence from suicidal acts or self-inflicted fabricated injuries is a critical legal challenge. This chapter also covers human rights, custodial torture documentation, and the Istanbul Protocol.`,
    whyThisMatters: `A forensic doctor\'s opinion on whether a wound is suicidal, homicidal, or fabricated directly influences criminal indictments. Identifying custodial torture injuries and reporting them under UN Istanbul Protocol standards protects human rights and ensures judicial accountability.`,
    simpleExplanation: `Hesitation marks (multiple trial cuts) around a main neck incision strongly indicate Suicide. Defense wounds on palms or forearms indicate Homicide. Fabricated wounds are superficial, uniform, easily accessible cuts made by a person on themselves to falsely accuse an enemy! Custodial violence injuries must be meticulously documented and reported to the Magistrate.`,
    keyTerms: [
      {
        term: 'Hesitation Marks (Trial Wounds)',
        definition: 'Multiple, small, superficial, parallel incised wounds seen around the origin of a main fatal cut (e.g. wrist or neck) made by a suicide victim testing weapon sharpness or pain threshold.',
        simpleExplanation: 'Superficial trial cuts next to a suicidal wound made before the final deep cut.'
      },
      {
        term: 'Fabricated Wounds (Self-Inflicted / Fictitious Wounds)',
        definition: 'Superficial injuries produced by a person on their own body (or with consent of an accomplice) to bring a false criminal charge against an opponent.',
        simpleExplanation: 'Fake superficial self-cut wounds made to frame an enemy in a false police case.'
      },
      {
        term: 'Defense Wounds',
        definition: 'Injuries sustained by a victim while trying to ward off an attack or grab the attacker\'s weapon (Active on palms/fingers; Passive on ulnar forearms/extensorial aspects).',
        simpleExplanation: 'Injuries on hands/arms from blocking or grabbing a knife during assault.'
      },
      {
        term: 'Istanbul Protocol',
        definition: 'United Nations Manual on the Effective Investigation and Documentation of Torture and Other Cruel, Inhuman or Degrading Treatment or Punishment.',
        simpleExplanation: 'UN guidelines for medical examination and reporting of custodial torture.'
      }
    ],
    stepByStep: [
      {
        stepNumber: 1,
        title: 'Pattern & Accessibility Analysis',
        description: 'Examine wound distribution relative to dominant hand accessibility. Suicidal wounds affect accessible sites (wrist, throat, chest).',
        keyTakeaway: 'Self-inflicted wounds are located in easily accessible body regions.'
      },
      {
        stepNumber: 2,
        title: 'Hesitation vs Defense Mark Identification',
        description: 'Inspect margins for superficial trial cuts (Hesitation = Suicide) or palm/forearm cuts (Defense = Homicide).',
        keyTakeaway: 'Hesitation marks equal suicide; Defense wounds equal homicide.'
      },
      {
        stepNumber: 3,
        title: 'Fabricated Wound Characteristics Assessment',
        description: 'Check if cuts are superficial, multiple, parallel, avoiding sensitive areas (eyes, nipples), with intact clothes.',
        keyTakeaway: 'Fabricators cut their skin, but avoid damaging their expensive clothes!'
      },
      {
        stepNumber: 4,
        title: 'Ante-mortem Vital Reaction Verification',
        description: 'Check for vital reaction: hemorrhage, blood clots adherent to tissues, tissue margin retraction, inflammatory exudate, or microscopic fibrin.',
        keyTakeaway: 'Vital reaction proves the wound occurred while the victim was alive.'
      }
    ],
    importantConcepts: [
      {
        title: 'Ante-mortem vs Post-mortem Wound Differentiation',
        content: 'Ante-mortem wounds show vital reaction (active bleeding, adherent clots, arterial spurting, edge retraction, cellular inflammation). Post-mortem wounds show no arterial spurting, non-adherent loose clots, and no cellular response.',
        type: 'info'
      }
    ],
    flowcharts: [
      {
        title: 'Medicolegal Differentiation of Cut Throat Wounds',
        description: 'Key anatomical and physical features distinguishing suicide from homicide.',
        steps: [
          { label: 'Suicidal Cut Throat', description: 'High above hyoid, slanting down left-to-right (right-handed), Hesitation marks present, no defense wounds, clothing cut.' },
          { label: 'Homicidal Cut Throat', description: 'Low below thyroid cartilage, transverse, deep, no hesitation marks, Defense wounds on hands, clothing torn/cut.' }
        ]
      }
    ],
    tables: [
      {
        title: 'Suicidal Wounds vs Homicidal Wounds vs Fabricated Wounds',
        headers: ['Feature', 'Suicidal Wounds', 'Homicidal Wounds', 'Fabricated Wounds'],
        rows: [
          ['Nature / Type', 'Incised, stab, or gunshot', 'Laceration, stab, chop, firearm', 'Superficial incised or abrasions'],
          ['Target Site', 'Accessible vital regions (wrist, throat)', 'Any body area (back, chest, head)', 'Easily accessible non-vital sites'],
          ['Hesitation Marks', 'PRESENT (Trial cuts)', 'ABSENT', 'ABSENT'],
          ['Defense Wounds', 'ABSENT', 'PRESENT (Palms, forearms)', 'ABSENT'],
          ['Clothing Damage', 'Clothing often turned aside', 'Clothing cut/torn matching wound', 'Clothing UNINJURED or cut separately']
        ]
      }
    ],
    clinicalExamples: [
      {
        title: 'Fabricated Assault Report with Uninjured Clothes',
        scenario: 'A man claims he was attacked by rivals with razors leaving 10 parallel cuts across his chest. His shirt has no cut marks.',
        analysis: 'Superficial parallel cuts avoiding nipples with completely intact shirt prove fabricated self-inflicted wounds.',
        takeaway: 'Intact clothing over multiple razor cuts is pathognomonic of fabricated wounds.'
      }
    ],
    medicolegalImportance: [
      'Distinguishes homicide from suicide and accidental trauma in court.',
      'Exposes false criminal complaints involving fabricated injuries.',
      'Mandates reporting of custodial violence under Istanbul Protocol guidelines.'
    ],
    mnemonics: [
      {
        title: 'Fabricated Wound Clues - "S-P-A-R-E"',
        phrase: 'Superficial, Parallel, Accessible, Retained clothes, Equal depth',
        breakdown: [
          { letter: 'S', word: 'Superficial', meaning: 'Involves only epidermis and upper dermis' },
          { letter: 'P', word: 'Parallel', meaning: 'Multiple uniform parallel incised lines' },
          { letter: 'A', word: 'Accessible', meaning: 'Located on easily reached body regions' },
          { letter: 'R', word: 'Retained Clothes', meaning: 'Clothes undamaged or cut out of alignment' },
          { letter: 'E', word: 'Equal Depth', meaning: 'Uniform shallow depth throughout' }
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a deep cut throat wound must be homicidal.',
        whyWrong: 'A determined suicidal individual can inflict deep fatal neck cuts accompanied by hesitation marks.',
        correctConcept: 'Look for hesitation marks, direction of cut, and defense wounds together.'
      }
    ],
    highYieldPoints: [
      'Hesitation marks = Pathognomonic of Suicide.',
      'Defense wounds = Pathognomonic of Homicide.',
      'Fabricated wounds = Superficial, parallel, accessible, clothes intact.',
      'Ante-mortem wound = Vital reaction (adherent clot, edge gaping, inflammation).',
      'Istanbul Protocol = UN manual for investigating custodial torture.'
    ],
    previousExamQuestions: [
      { question: 'Differentiate Suicidal, Homicidal, and Fabricated Wounds in detail with a comparison table.', year: '2023', marks: 10 },
      { question: 'Write a short note on Ante-mortem vs Post-mortem wound differentiation.', year: '2021', marks: 5 }
    ],
    vivaQuestions: [
      {
        id: 1,
        question: 'What are Hesitation Marks and what do they indicate?',
        answer: 'Superficial, short, parallel trial cuts seen near the start of a main fatal incision. They indicate Suicide.',
        clinicalPearl: 'Reflects hesitation and testing of pain before inflicting final cut.'
      },
      {
        id: 2,
        question: 'What is Vital Reaction?',
        answer: 'Physiological and histopathological tissue response occurring in living tissue upon injury (hemorrhage, adherent blood clot, cellular inflammation, fibrin deposition).',
        clinicalPearl: 'Absence of vital reaction indicates post-mortem infliction.'
      }
    ],
    shortNotes: [
      {
        title: 'Fabricated (Self-Inflicted) Wounds',
        answer: 'Superficial wounds produced by a person on their own body (or via accomplice) to bring false charges or evade duty. Features: Superficial, multiple, parallel, accessible sites, non-vital areas, avoiding face/eyes, undamaged clothing.'
      }
    ],
    longQuestions: [
      {
        title: 'Discuss Medicolegal Aspects of Wounds. Detail differences between Suicidal, Homicidal, and Fabricated Wounds.',
        outline: [
          'Classification and objectives of wound examination',
          'Ante-mortem vs Post-mortem wound features (Vital reaction)',
          'Suicidal vs Homicidal features (Hesitation marks, Defense wounds)',
          'Fabricated wounds: motives, features, and legal consequences'
        ]
      }
    ],
    mcqs: [
      {
        id: 1,
        question: 'Hesitation marks around a main incised neck wound are pathognomonic of:',
        options: ['Homicide', 'Suicide', 'Accident', 'Fabricated injury'],
        correctIndex: 1,
        explanation: 'Hesitation marks are trial cuts produced by a suicidal individual prior to the fatal cut.',
        highYieldTag: 'Must Know'
      }
    ],
    caseBasedQuestions: [
      {
        id: 1,
        title: 'Cut Throat Autopsy Examination',
        scenario: 'A dead body has a transverse cut throat wound below thyroid cartilage with defense cuts on palms and no hesitation marks.',
        questions: ['What is the manner of death?', 'What evidence supports your conclusion?'],
        solution: '1. Homicide. 2. Low transverse location, presence of defense wounds on palms, and total absence of hesitation marks.',
        legalSections: ['Medicolegal Wound Analysis', 'Homicide']
      }
    ],
    summary: 'Chapter 10 covers suicidal vs homicidal vs fabricated wounds, defense and hesitation marks, vital reaction, and Istanbul Protocol.',
    revisionSheet: [
      'Hesitation Marks = Suicide.',
      'Defense Wounds = Homicide.',
      'Fabricated Wounds = Clothes intact, superficial.',
      'Ante-mortem = Vital reaction present.'
    ],
    flashcards: [
      { id: 1, front: 'What do Hesitation Marks indicate?', back: 'Suicide.', category: 'Wound Analysis' }
    ]
  }
];
