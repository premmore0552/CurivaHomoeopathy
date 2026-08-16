export interface CbdcCompetency {
  id: string; // e.g., OG1.1
  year: "1st BHMS" | "2nd BHMS" | "3rd BHMS" | "4th BHMS";
  topicTitle: string;
  subtitle: string;
  readingTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  bloomLevel: "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
  millerLevel: "Knows (K)" | "Knows How (KH)" | "Shows How (SH)" | "Does (D)";
  teachingHours: number;
  tlMethods: string[]; // e.g. ["Interactive Lecture", "Small Group Discussion", "Bedside Clinic", "DOAP"]
  assessmentMethods: string[]; // e.g. ["LAQ", "SAQ", "Viva Voce", "OSCE", "MCQ"]
  domain: {
    knowledge: string;
    skill?: string;
    communication?: string;
    professionalism?: string;
    attitude?: string;
  };
  sloList: string[];
  prerequisites: string[];
  quickOverview: string;
  whyThisMatters: {
    clinical: string;
    university: string;
    aiapget: string;
    practical: string;
  };
  conceptExplanation: string[];
  stepByStep: string[];
  definitions: {
    term: string;
    definition: string;
    simpleMeaning: string;
    examDefinition: string;
    memoryTip: string;
  }[];
  glossary: {
    term: string;
    meaning: string;
    pronunciation: string;
    clinicalRelevance: string;
  }[];
  originalTextSnippet?: string;
  simpleTranslation?: string;
  lineByLineExplanation?: string[];
  clinicalApplication: {
    opdExample: {
      setting: string;
      patientProfile: string;
      scenario: string;
      HomoeopathicAction: string;
      clinicalLesson: string;
    };
    everydayAnalogy: {
      concept: string;
      analogyTitle: string;
      analogyText: string;
    };
  };
  visualAids: {
    flowchart: {
      title: string;
      steps: string[];
    };
    comparisonTable?: {
      title: string;
      headers: string[];
      rows: string[][];
    };
    mindMapNodes: {
      central: string;
      branches: { title: string; subitems: string[] }[];
    };
  };
  clinicalPearls: string[];
  commonMistakes: string[];
  frequentlyConfusedTopics: { topicA: string; topicB: string; difference: string }[];
  mnemonics: { code: string; title: string; breakdown: string[] }[];
  integration: {
    horizontal: { subject: string; correlation: string }[];
    vertical: { progression: string };
  };
  caseBasedLearning?: {
    caseTitle: string;
    history: string;
    questions: string[];
    discussion: string;
  };
  vivaQuestions: {
    easy: string[];
    moderate: string[];
    difficult: string[];
  };
  universityQuestionBank: {
    twoMarks: string[];
    fiveMarks: string[];
    tenMarks: string[];
    longEssay: string[];
    shortNotes: string[];
    assertionReason: { statement: string; reason: string; answer: string; explanation: string }[];
    trueFalse: { statement: string; answer: boolean; explanation: string }[];
  };
  aiapgetMcqs: {
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
    highYieldFact: string;
  }[];
  quickRevisionNotes: string[];
  oneMinuteSummary: string;
}

export const CBDC_COMPETENCIES: Record<string, CbdcCompetency[]> = {
  "1st BHMS": [
    {
      id: "OG1.1",
      year: "1st BHMS",
      topicTitle: "History of Medicine & Evolution of Homoeopathy",
      subtitle: "From Ancient Speculative Schools to Hahnemann's Scientific Inductive Discovery",
      readingTime: "12 mins",
      difficulty: "Beginner",
      bloomLevel: "Understand",
      millerLevel: "Knows How (KH)",
      teachingHours: 15,
      tlMethods: ["Interactive Lecture", "Seminar", "Group Discussion"],
      assessmentMethods: ["LAQ", "SAQ", "Viva Voce", "MCQ"],
      domain: {
        knowledge: "Traces medical history from Hippocrates, Galen, Paracelsus to Hahnemann's discovery of Homoeopathy in 1790.",
        skill: "Analyze how historical errors in bloodletting led to the birth of organon principles.",
        communication: "Articulate the historical foundation of Homoeopathy to patients and peers confidently.",
        professionalism: "Respect the evolution of medical science and acknowledge historical contributions.",
        attitude: "Appreciate the scientific courage of Hahnemann in standing against dogma."
      },
      sloList: [
        "Describe the historical background of medicine prior to Hahnemann.",
        "Explain the cinchona bark experiment (1790) and its significance.",
        "List the major milestones in the development of Homoeopathy.",
        "Differentiate between ancient Dogmatic, Empiric, and Methodist schools."
      ],
      prerequisites: ["Introduction to Health Sciences", "Basic Medical History"],
      quickOverview: "Homoeopathy was born in 1790 when Dr. Samuel Hahnemann translated William Cullen's Materia Medica. Dissatisfied with Cullen's explanation of Cinchona bark curing malaria through stomach astringency, Hahnemann tested Cinchona on himself while healthy, generating malaria-like ague symptoms. This led to the discovery of Similia Similibus Curantur.",
      whyThisMatters: {
        clinical: "Understanding how Homoeopathy evolved helps clinicians appreciate why we test remedies on healthy humans (Drug Proving) rather than sick animals.",
        university: "Essential 10-mark long essay question in 1st BHMS Paper I examination.",
        aiapget: "High-yield PG entrance topic: exact year of cinchona experiment (1790), publication dates of Essay on a New Principle (1796) and 1st Organon (1810).",
        practical: "Helps answer patient questions about how Homoeopathy was discovered scientifically."
      },
      conceptExplanation: [
        "Prior to the late 18th century, European medicine relied on the 'Humoral Theory' of Galen and crude heroic measures: excessive bloodletting, toxic mercury dosing, blistering, and massive multi-drug mixtures.",
        "Dr. Samuel Hahnemann, an accomplished physician and linguist fluent in 8 languages, resigned from active practice because he refused to inflict harm on suffering patients with speculative treatments.",
        "In 1790, while translating Cullen's treatise, Hahnemann questioned the astringency theory of Cinchona. He ingested 4 drachms of Cinchona juice twice daily. To his astonishment, his feet grew cold, heart palpitated, and he developed paroxysms of chills and fever—identical to malarial ague.",
        "He deduced: 'Substances which produce a form of fever in healthy individuals remove similar forms of fever in the sick.' This established the universal therapeutic law: Similia Similibus Curantur."
      ],
      stepByStep: [
        "1. Pre-Hahnemannian Era: Galenical Humoralism, polypharmacy, and heroic measures.",
        "2. Hahnemann's Crisis of Faith: Abandoning practice in 1789 due to ethical distress.",
        "3. The Cinchona Experiment (1790): Self-proving of cinchona bark juice.",
        "4. Formulation of Similia (1796): Essay on a New Principle for Ascertaining the Curative Powers of Drugs.",
        "5. The First Organon (1810): 'Organon der rationellen Heilkunde' published in Leipzig."
      ],
      definitions: [
        {
          term: "Similia Similibus Curantur",
          definition: "The fundamental therapeutic law of Homoeopathy stating that 'Likes are cured by likes'.",
          simpleMeaning: "A medicine that produces specific disease symptoms in a healthy person can cure those exact same symptoms in a sick person.",
          examDefinition: "The natural law of cure where a weaker dynamic affection is permanently extinguished in the living organism by a stronger similar affection.",
          memoryTip: "Like cures like — match symptom pattern to remedy pattern."
        },
        {
          term: "Drug Proving (Pathogenetic Testing)",
          definition: "The systematic investigation of drug action on healthy human individuals of both sexes and different ages.",
          simpleMeaning: "Testing medicines on healthy humans to record the pure symptoms they produce.",
          examDefinition: "A scientific procedure (§105–145) to record the altered state of health produced by a drug in healthy human provers.",
          memoryTip: "Proving = Pure symptom recording on healthy people."
        }
      ],
      glossary: [
        {
          term: "Cinchona Bark",
          meaning: "The bark of Cinchona officinalis (Peruvian bark), rich in quinine, used historically to treat intermittent malarial fevers.",
          pronunciation: "sin-KOH-nuh",
          clinicalRelevance: "Origin of China Officinalis remedy and the founding experiment of Homoeopathy."
        },
        {
          term: "Polypharmacy",
          meaning: "The practice of prescribing multiple complex drugs or mixtures simultaneously.",
          pronunciation: "pol-ee-FAR-muh-see",
          clinicalRelevance: "Strongly condemned by Hahnemann in favor of the Single Simple Remedy (§272)."
        }
      ],
      originalTextSnippet: "I took by way of experiment, twice a day, four drachms of good Cinchona bark. My feet, finger ends, etc., became cold; I grew languid and drowsy; then my heart began to palpitate... in short, all the usual symptoms of intermittent fever appeared one after another.",
      simpleTranslation: "Hahnemann took Cinchona bark while completely healthy and got all the exact symptoms of malarial fever. When he stopped taking it, he became healthy again.",
      lineByLineExplanation: [
        "Line 1: Hahnemann ingested cinchona bark while completely healthy.",
        "Line 2: Cold extremities, drowsiness, and heart palpitations began.",
        "Line 3: Classical malarial ague paroxysm developed.",
        "Line 4: Proved that drugs produce artificial diseases in healthy provers."
      ],
      clinicalApplication: {
        opdExample: {
          setting: "Government Homoeopathic Hospital OPD, Kolkata",
          patientProfile: "35-year-old male with recurrent intermittent fever and intense drenching sweat.",
          scenario: "A junior student suggests mixing China 30 with Arsenic 30. The professor explains Hahnemann's historical cinchona lesson and insists on giving a single dose of China 30 based on pure symptom similarity.",
          HomoeopathicAction: "Single remedy China 30 restored temperature to normal within 24 hours without relapse.",
          clinicalLesson: "Respect the law of similia and single simple remedy as established since 1790."
        },
        everydayAnalogy: {
          concept: "Similia Similibus Curantur",
          analogyTitle: "The Chopping Onion Analogy",
          analogyText: "When you chop a raw Allium Cepa (onion) in the kitchen, your eyes water, burn, and stream with acrid discharge, while your nose runs with watery catarrh. When a patient comes with a common cold with these exact symptoms, giving potentized Allium Cepa rapidly cures the cold."
        }
      },
      visualAids: {
        flowchart: {
          title: "Milestones of Homoeopathy Discovery",
          steps: [
            "1790: Cullen's Cinchona Experiment",
            "1796: Essay on a New Principle",
            "1805: Medicine of Experience",
            "1810: 1st Edition Organon Published",
            "1828: Theory of Chronic Diseases (Psora, Sycosis, Syphilis)",
            "1842: 6th Edition Organon Completed (LM Potencies)"
          ]
        },
        comparisonTable: {
          title: "Allopathy (Old School) vs Homoeopathy (New School)",
          headers: ["Feature", "Old School Medicine (Pre-1810)", "Homoeopathic Science"],
          rows: [
            ["Principle", "Contraria Contrariis / Antipathy", "Similia Similibus Curantur"],
            ["Drug Testing", "Tested on sick animals or patients", "Tested on healthy human provers (§105)"],
            ["Prescribing", "Complex multi-drug mixtures", "Single simple medicine (§272)"],
            ["Dose", "Massive material toxic doses", "Minimum dynamized potency (§275)"]
          ]
        },
        mindMapNodes: {
          central: "Birth of Homoeopathy (1790)",
          branches: [
            { title: "Key Discovery", subitems: ["Cinchona Bark Experiment", "Self-proving on healthy human", "Ague fever paroxysm"] },
            { title: "Core Laws", subitems: ["Similia Similibus Curantur", "Single Remedy", "Minimum Dose", "Drug Proving"] },
            { title: "Key Texts", subitems: ["Essay on New Principle (1796)", "Organon of Medicine (1810)", "Chronic Diseases (1828)"] }
          ]
        }
      },
      clinicalPearls: [
        "Never combine remedies. The law of Similia was discovered using a single substance (Cinchona bark).",
        "Every true remedy is discovered through human pathogenetic trials (provers), not animal models."
      ],
      commonMistakes: [
        "Writing that Hahnemann discovered Homoeopathy in 1810 (Correct: Cinchona experiment was 1790; Organon 1st edition was 1810).",
        "Confusing Cullen's explanation with Hahnemann's deduction."
      ],
      frequentlyConfusedTopics: [
        {
          topicA: "Cullen's View on Cinchona",
          topicB: "Hahnemann's View on Cinchona",
          difference: "Cullen believed Cinchona cures malaria due to its astringent and bitter tonic properties. Hahnemann proved Cinchona cures malaria because it produces malaria-like fever symptoms in healthy people."
        }
      ],
      mnemonics: [
        {
          code: "ORGANON",
          title: "7 Pillars of Homoeopathic Philosophy",
          breakdown: [
            "O - Observation unprejudiced (§6)",
            "R - Restoration of health (§1)",
            "G - Gentle, rapid cure (§2)",
            "A - Individualization (§83)",
            "N - Natural disease dynamics (§29)",
            "O - One simple remedy (§272)",
            "N - Nature's Law of Similia (§26)"
          ]
        }
      ],
      integration: {
        horizontal: [
          { subject: "Homoeopathic Pharmacy", correlation: "Origin of drug proving methodology and botanical origin of Cinchona Officinalis." },
          { subject: "Materia Medica", correlation: "China Officinalis symptom profile born directly from the 1790 experiment." }
        ],
        vertical: {
          progression: "1st BHMS introduces History & Discovery -> 2nd BHMS applies Case Taking -> 3rd BHMS covers Drug Proving (§105-145) -> 4th BHMS analyzes Philosophical Stalwarts (Kent, Close, Roberts)."
        }
      },
      vivaQuestions: {
        easy: [
          "In which year was the Cinchona experiment conducted?",
          "What is the full name of Samuel Hahnemann?",
          "What does 'Similia Similibus Curantur' mean?"
        ],
        moderate: [
          "Why did Hahnemann object to Cullen's explanation of Cinchona bark?",
          "Name the essay published by Hahnemann in 1796.",
          "What were the heroic measures of medicine in the 18th century?"
        ],
        difficult: [
          "Differentiate between the 1st edition title and 2nd edition title of Organon.",
          "How did B.K. Sarkar interpret the Cinchona experiment in terms of Baconian inductive logic?"
        ]
      },
      universityQuestionBank: {
        twoMarks: [
          "Define Similia Similibus Curantur.",
          "State the year and place of publication of 1st Edition Organon.",
          "What is the Cinchona bark experiment?"
        ],
        fiveMarks: [
          "Write a short note on the Cinchona Bark Experiment and its historical significance.",
          "Describe the circumstances that led Hahnemann to discover Homoeopathy."
        ],
        tenMarks: [
          "Trace the history and evolution of Homoeopathy from 1790 to 1843. Explain how Hahnemann established a scientific system of medicine.",
          "Compare and contrast the Old School (Allopathy) of the 18th century with Hahnemannian Homoeopathy."
        ],
        longEssay: [
          "Discuss in detail the life of Dr. Samuel Hahnemann, highlighting his discovery of Homoeopathy, major publications, and contribution to medical science."
        ],
        shortNotes: [
          "Essay on a New Principle (1796)",
          "Cullen's Materia Medica translation",
          "Heroic Medicine vs Homoeopathy"
        ],
        assertionReason: [
          {
            statement: "Assertion (A): Cinchona bark cures malarial ague because it produces similar ague symptoms in healthy provers.",
            reason: "Reason (R): Nature's law of cure dictates that a stronger similar dynamic affection permanently extinguishes a weaker one.",
            answer: "Both A and R are true, and R is the correct explanation of A.",
            explanation: "Hahnemann proved that symptom similarity is the fundamental reason for therapeutic cure."
          }
        ],
        trueFalse: [
          {
            statement: "Hahnemann published the first edition of Organon of Medicine in 1790.",
            answer: false,
            explanation: "The Cinchona experiment occurred in 1790; the 1st edition of Organon was published in 1810."
          }
        ]
      },
      aiapgetMcqs: [
        {
          question: "The famous Cinchona Bark Experiment was performed by Dr. Samuel Hahnemann in the year:",
          options: ["1789", "1790", "1796", "1810"],
          correctIndex: 1,
          explanation: "Hahnemann performed the Cinchona bark self-proving experiment in 1790 while translating William Cullen's Materia Medica.",
          highYieldFact: "1790 = Cinchona Experiment; 1796 = Essay on New Principle; 1810 = 1st Organon."
        },
        {
          question: "Which work of William Cullen was Hahnemann translating when he discovered the principle of Similia?",
          options: ["First Lines of the Practice of Physic", "A Treatise on the Materia Medica", "Synopsis Nosologiae Methodicae", "System of Medicine"],
          correctIndex: 1,
          explanation: "Hahnemann was translating William Cullen's 'A Treatise on the Materia Medica' from English into German.",
          highYieldFact: "Cullen attributed Cinchona's action to astringency; Hahnemann proved it was due to symptom similarity."
        }
      ],
      quickRevisionNotes: [
        "1790: Cinchona experiment — self-ingestion of 4 drachms Cinchona juice twice daily.",
        "1796: 'Essay on a New Principle for Ascertaining the Curative Powers of Drugs' published in Hufeland's Journal.",
        "1805: Published 'Medicine of Experience' and 'Fragmenta de viribus medicamentorum positivis' (first proving book in Latin).",
        "1810: 1st Edition Organon der rationellen Heilkunde (271 aphorisms) published in Leipzig."
      ],
      oneMinuteSummary: "Homoeopathy was born in 1790 when Hahnemann tested Cinchona bark on himself, discovering that drugs cure diseases whose symptoms they mimic in healthy provers (Similia Similibus Curantur)."
    },
    {
      id: "OG1.2",
      year: "1st BHMS",
      topicTitle: "Life & Contributions of Dr. Samuel Hahnemann & Stalwarts",
      subtitle: "The Visionary Founder of Homoeopathy and Key Pioneers (Boenninghausen, Hering, Kent)",
      readingTime: "15 mins",
      difficulty: "Beginner",
      bloomLevel: "Understand",
      millerLevel: "Knows (K)",
      teachingHours: 12,
      tlMethods: ["Lecture", "Biographical Video", "Student Seminar"],
      assessmentMethods: ["SAQ", "Viva Voce", "MCQ"],
      domain: {
        knowledge: "Comprehensive chronology of Christian Friedrich Samuel Hahnemann (1755–1843) and major stalwarts.",
        skill: "Identify contributions of Boenninghausen, Hering, Kent, Lippe, Allen, and Boericke.",
        communication: "Discuss biographical lessons in perseverance and scientific dedication.",
        professionalism: "Emulate ethical integrity and clinical devotion of pioneering Homoeopaths."
      },
      sloList: [
        "State birth, education, and milestone years of Dr. Samuel Hahnemann.",
        "List major books authored by Hahnemann.",
        "Describe contributions of Baron von Boenninghausen (Therapeutic Pocket Book).",
        "Explain Constantine Hering's Laws of Cure.",
        "Describe J.T. Kent's contributions (Repertory, Philosophy, Materia Medica)."
      ],
      prerequisites: ["OG1.1 History of Medicine"],
      quickOverview: "Born on April 10, 1755 in Meissen, Saxony (Germany), Christian Friedrich Samuel Hahnemann mastered 8 languages, graduated MD from Erlangen in 1779, discovered Homoeopathy in 1790, wrote the Organon in 1810, and passed away in Paris on July 2, 1843. Stalwarts like Boenninghausen, Hering, and Kent developed repertories and refined philosophy.",
      whyThisMatters: {
        clinical: "Knowing Hering's Law of Cure and Kent's Repertory structure is fundamental to everyday clinical prescribing and evaluation of progress.",
        university: "Guaranteed 5-mark and 10-mark questions on Hahnemann's life and Stalwarts in 1st BHMS Paper I.",
        aiapget: "High-yield dates, book titles, Latin phrases, and quotes by Hahnemann and stalwarts.",
        practical: "Inspires clinical perseverance and dedication to truth in medical practice."
      },
      conceptExplanation: [
        "Samuel Hahnemann was born to Christian Gottfried Hahnemann (a porcelain painter) and Johanna Christiana. His father taught him never to learn passively, but to 'think for himself' (Aude Sapere).",
        "Hahnemann studied medicine at Leipzig and Vienna, graduating MD from Erlangen University on August 10, 1779 with his thesis on cramp conditions.",
        "Major Hahnemannian Masterpieces: (1) Fragmenta de Viribus (1805), (2) Organon of Medicine (1810–1842, 6 editions), (3) Materia Medica Pura (1811–1821, 6 vols), (4) The Chronic Diseases (1828, 5 vols).",
        "Key Stalwarts: Baron von Boenninghausen (1st Repertory 1832), Constantine Hering ('Father of American Homoeopathy' & Hering's Law of Cure), James Tyler Kent (Repertory 1897 & 12 Observations)."
      ],
      stepByStep: [
        "1. Birth: 10th April 1755, Meissen, Germany.",
        "2. Medical Degree: 1779, Erlangen University.",
        "3. Cinchona Discovery: 1790, Konigslutter.",
        "4. Organon 1st Edition: 1810, Leipzig.",
        "5. Miasm Theory: 1828, Kothen.",
        "6. Death: 2nd July 1843, Paris (buried at Père Lachaise Cemetery)."
      ],
      definitions: [
        {
          term: "Aude Sapere",
          definition: "Hahnemann's motto on the title page of Organon meaning 'Dare to be Wise'.",
          simpleMeaning: "Have the courage to use your own understanding and think independently.",
          examDefinition: "The Latin phrase from Horace chosen by Hahnemann for the 2nd edition Organon, urging physicians to think critically and observe nature directly.",
          memoryTip: "Aude Sapere = Dare to be Wise."
        },
        {
          term: "Hering's Law of Cure",
          definition: "The direction of cure formulated by Dr. Constantine Hering.",
          simpleMeaning: "Healing moves from inside out, top to bottom, most important to least important organ, and in reverse order of appearance.",
          examDefinition: "Cure proceeds: (1) From above downwards, (2) From within outwards, (3) From a more important organ to a less important organ, (4) In reverse order of symptom appearance.",
          memoryTip: "Top-Down, Inside-Out, More-to-Less Important, Reverse Order."
        }
      ],
      glossary: [
        {
          term: "Materia Medica Pura",
          meaning: "Hahnemann's 6-volume collection of pure drug proving symptoms on healthy provers without clinical guesswork.",
          pronunciation: "muh-TEER-ee-uh MED-ih-kuh PYOO-ruh",
          clinicalRelevance: "The foundational reference for pure remedy pathogenetic effects."
        }
      ],
      clinicalApplication: {
        opdExample: {
          setting: "Homoeopathic OPD, New Delhi",
          patientProfile: "28-year-old female treated for eczema. Skin rash cleared, but severe asthma developed.",
          scenario: "The intern declares 'Eczema cured!'. The Professor applies Hering's Law of Cure, showing that disease moved from less important organ (skin) to more important organ (lungs)—indicating suppression, not cure.",
          HomoeopathicAction: "Antidoted suppression with Sulphur 200. Asthma cleared and mild eczema reappeared temporarily before disappearing permanently (Inside-Out cure).",
          clinicalLesson: "Always evaluate cure direction using Hering's Law."
        },
        everydayAnalogy: {
          concept: "Hering's Law of Cure",
          analogyTitle: "Cleaning a House from Inside Out",
          analogyText: "When cleaning a dusty house, you sweep dirt from the inner master bedroom (inside) out into the hallway, then down the front porch (outside). You don't push dirt back inside under the carpet!"
        }
      },
      visualAids: {
        flowchart: {
          title: "Hering's Law of Cure Direction",
          steps: [
            "1. From Above Downwards (Head to Feet)",
            "2. From Within Outwards (Internal Organs to Skin)",
            "3. From More Important to Less Important Organ (Heart/Brain to Joints/Skin)",
            "4. In Reverse Order of Symptom Appearance (Latest symptoms disappear first)"
          ]
        },
        comparisonTable: {
          title: "Major Stalwarts Comparison",
          headers: ["Stalwart", "Key Contribution", "Major Publication"],
          rows: [
            ["Boenninghausen", "Grand Generalization & Doctrine of Analogues", "Therapeutic Pocket Book (1846)"],
            ["Constantine Hering", "Hering's Law of Cure & Proving of Lachesis", "Guiding Symptoms of Materia Medica (10 vols)"],
            ["James Tyler Kent", "Repertory of Homoeopathic Materia Medica & 12 Observations", "Lectures on Homoeopathic Philosophy (1900)"],
            ["T.F. Allen", "Encyclopedia of Pure Materia Medica (10 vols)", "Encyclopedia of Pure Materia Medica"]
          ]
        },
        mindMapNodes: {
          central: "Dr. Samuel Hahnemann",
          branches: [
            { title: "Life Milestones", subitems: ["Born 1755 Meissen", "MD Erlangen 1779", "Died 1843 Paris"] },
            { title: "Major Works", subitems: ["Organon (1810-1842)", "Materia Medica Pura", "Chronic Diseases (1828)"] },
            { title: "Core Mnemonic", subitems: ["AUDE SAPERE (Dare to be wise)", "Gaudeamus igitur"] }
          ]
        }
      },
      clinicalPearls: [
        "Cure is never complete if symptoms disappear in reverse of Hering's law (e.g., skin clears while mental anxiety worsens = suppression).",
        "Boenninghausen's grand generalization helps complete incomplete symptoms using location, sensation, modality, and concomitant."
      ],
      commonMistakes: [
        "Stating Hering's law as 'Outside to Inside' (Correct: Within Outwards).",
        "Attributing the Therapeutic Pocket Book to Kent (Correct: Boenninghausen wrote TPB in 1846; Kent published Repertory in 1897)."
      ],
      frequentlyConfusedTopics: [
        {
          topicA: "Materia Medica Pura",
          topicB: "The Chronic Diseases",
          difference: "Materia Medica Pura (1811) contains pure drug provings of short-acting and acute remedies. The Chronic Diseases (1828) contains miasmatic theory (Psora, Sycosis, Syphilis) and anti-miasmatic remedy provings."
        }
      ],
      mnemonics: [
        {
          code: "HERING",
          title: "Hering's Law Directions",
          breakdown: [
            "H - Head to toe (Above downwards)",
            "E - Extreme interior to exterior (Within outwards)",
            "R - Reverse order of appearance",
            "I - Important to less important organ",
            "N - Natural progression of healing",
            "G - Genuine cure verification"
          ]
        }
      ],
      integration: {
        horizontal: [
          { subject: "Repertory", correlation: "Boenninghausen's TPB and Kent's Repertory structure directly depend on Organon case taking rules." },
          { subject: "Materia Medica", correlation: "Hering's Guiding Symptoms provides clinical evaluation of remedy provings." }
        ],
        vertical: {
          progression: "1st BHMS covers Hahnemann & Stalwart biographies -> 2nd BHMS studies Boenninghausen method -> 3rd BHMS studies Kent Repertory -> 4th BHMS deeply analyzes Kent's 37 Lectures & Stuart Close."
        }
      },
      vivaQuestions: {
        easy: [
          "When and where was Dr. Hahnemann born?",
          "What is the motto of Organon of Medicine?",
          "Who formulated Hering's Law of Cure?"
        ],
        moderate: [
          "Enumerate the four directions of Hering's Law of Cure.",
          "Name the major books written by Dr. Hahnemann with their publication years.",
          "What was Boenninghausen's contribution to repertory?"
        ],
        difficult: [
          "Explain Boenninghausen's Doctrine of Analogues.",
          "Where is Hahnemann buried and what inscription is carved on his tombstone?"
        ]
      },
      universityQuestionBank: {
        twoMarks: [
          "What does 'Aude Sapere' mean?",
          "Name two works published by Hahnemann prior to 1810.",
          "State Hering's Law of Cure."
        ],
        fiveMarks: [
          "Write a short note on Constantine Hering and his contributions to Homoeopathy.",
          "Describe Boenninghausen's contribution to Homoeopathic Repertory and Philosophy."
        ],
        tenMarks: [
          "Write a detailed essay on the life, literary works, and achievements of Dr. Samuel Hahnemann.",
          "Discuss J.T. Kent's contributions to Homoeopathic Philosophy, Repertory, and Materia Medica."
        ],
        longEssay: [
          "Detail the evolution of Homoeopathy through the contributions of Hahnemann, Boenninghausen, Hering, and Kent."
        ],
        shortNotes: [
          "Aude Sapere",
          "Hering's Law of Cure",
          "Boenninghausen's Therapeutic Pocket Book"
        ],
        assertionReason: [
          {
            statement: "Assertion (A): True cure always proceeds from within outwards and from above downwards.",
            reason: "Reason (R): This direction represents Hering's Law of Cure, indicating that the vital force is regaining harmony from deeper central organs to peripheral tissues.",
            answer: "Both A and R are true, and R is the correct explanation of A.",
            explanation: "Hering's Law verifies genuine dynamic cure versus superficial suppression."
          }
        ],
        trueFalse: [
          {
            statement: "Dr. Samuel Hahnemann passed away in Leipzig in 1843.",
            answer: false,
            explanation: "Hahnemann passed away in Paris on July 2, 1843."
          }
        ]
      },
      aiapgetMcqs: [
        {
          question: "The inscription on Hahnemann's tombstone at Père Lachaise Cemetery in Paris reads:",
          options: ["Aude Sapere", "Non Inutilis Vixi", "Similia Similibus Curantur", "In Via Veritas"],
          correctIndex: 1,
          explanation: "Hahnemann's tombstone bears his famous words: 'Non Inutilis Vixi' (I have not lived in vain).",
          highYieldFact: "Motto of Organon = Aude Sapere; Tombstone inscription = Non Inutilis Vixi."
        }
      ],
      quickRevisionNotes: [
        "Hahnemann: Born April 10, 1755 (Meissen), MD 1779 (Erlangen), Died July 2, 1843 (Paris).",
        "Motto: Aude Sapere (Dare to be Wise). Tombstone: Non Inutilis Vixi (I have not lived in vain).",
        "Hering's Law: Above-downwards, Within-outwards, More-to-less important, Reverse order of appearance."
      ],
      oneMinuteSummary: "Dr. Samuel Hahnemann dedicated his life to creating a scientific, gentle system of medicine; stalwarts like Boenninghausen, Hering, and Kent expanded his work with repertories and laws of cure."
    },
    {
      id: "OG1.3",
      year: "1st BHMS",
      topicTitle: "Logic & Inductive Reasoning in Medicine",
      subtitle: "Francis Bacon's Inductive Logic as the Philosophical Foundation of Homoeopathic Science",
      readingTime: "14 mins",
      difficulty: "Intermediate",
      bloomLevel: "Analyze",
      millerLevel: "Knows How (KH)",
      teachingHours: 10,
      tlMethods: ["Interactive Lecture", "Logic Exercise", "Seminar"],
      assessmentMethods: ["LAQ", "SAQ", "Viva Voce"],
      domain: {
        knowledge: "Differentiates Inductive Logic (Bacon) from Deductive Logic (Aristotle) and its application in Organon.",
        skill: "Apply inductive reasoning to assemble the totality of symptoms without speculative bias.",
        communication: "Explain the scientific logic of Homoeopathy to medical skeptics.",
        professionalism: "Maintain scientific rigor in recording clinical facts.",
        attitude: "Reject unverified medical hypotheses."
      },
      sloList: [
        "Define Logic, Inductive Logic, and Deductive Logic.",
        "Compare Aristotelian Syllogism with Baconian Novum Organum.",
        "Explain how Hahnemann applied Inductive Logic to discover Similia.",
        "Identify logical fallacies in pre-Hahnemannian medicine."
      ],
      prerequisites: ["OG1.1 History of Medicine"],
      quickOverview: "Homoeopathy is built on Lord Francis Bacon's Inductive Logic (Novum Organum). Deductive logic moves from general principles to particular instances (often leading to speculative theories), whereas Inductive logic collects individual sensory facts to arrive at universal natural laws. Hahnemann applied induction in proving remedies and constructing symptom totals.",
      whyThisMatters: {
        clinical: "Ensures clinicians observe real, individual patient symptoms instead of fitting patients into speculative disease labels.",
        university: "Important 5-mark and 10-mark question in 1st BHMS Organon & Philosophy paper.",
        aiapget: "Key questions on Novum Organum, Lord Bacon, B.K. Sarkar's commentary, and syllogism.",
        practical: "Teaches doctors how to think logically and systematically."
      },
      conceptExplanation: [
        "Deductive Logic (Aristotle's Organon): Starts with a general premise (which may be an unproven hypothesis) and deduces specific conclusions. Example: 'All fevers are caused by excess blood (Premise) -> This patient has fever -> Therefore, drain their blood.' This led to disastrous historical medical errors.",
        "Inductive Logic (Francis Bacon's Novum Organum): Starts with careful observation of individual, concrete facts without bias, collects them, analyzes patterns, and arrives at a universal law. Example: Observing thousands of drug provings and clinical cures -> concluding Similia Similibus Curantur.",
        "Hahnemann named his book 'Organon of Medicine' ('Organon' = instrument of correct thinking) to signal a complete shift to Bacon's inductive scientific method."
      ],
      stepByStep: [
        "1. Observation of Individual Facts: Recording provers' exact sensory changes.",
        "2. Experimentation: Testing Cinchona and dozens of drugs on provers.",
        "3. Tabulation & Comparison: Matching prover symptoms to patient symptoms.",
        "4. Generalization: Formulating the universal law of Similia Similibus Curantur."
      ],
      definitions: [
        {
          term: "Inductive Logic",
          definition: "Reasoning from specific observed instances to establish a general law or principle.",
          simpleMeaning: "Collecting individual facts first, then finding the truth.",
          examDefinition: "The scientific process of reasoning from particular facts observed through the senses to universal generalizations.",
          memoryTip: "Inductive = Individual facts to General law."
        },
        {
          term: "Deductive Logic",
          definition: "Reasoning from general premises to specific cases.",
          simpleMeaning: "Starting with a big theory and applying it to a specific case.",
          examDefinition: "The process of reasoning from a general rule or proposition to a necessary particular conclusion.",
          memoryTip: "Deductive = General theory down to Specific case."
        }
      ],
      glossary: [
        {
          term: "Novum Organum",
          meaning: "Francis Bacon's treatise (1620) introducing inductive scientific logic, from which Hahnemann derived the name 'Organon'.",
          pronunciation: "NO-vum or-GAN-um",
          clinicalRelevance: "The logical inspiration behind Hahnemann's Organon of Medicine."
        }
      ],
      clinicalApplication: {
        opdExample: {
          setting: "Clinical OPD, Pune",
          patientProfile: "42-year-old patient with severe joint pain and swelling.",
          scenario: "Deductive approach: 'It is rheumatoid arthritis, give anti-inflammatory steroid.' Inductive approach: 'Observe modalities — pain worse on initial movement, better with continued motion, worse in damp weather -> Rhus Tox 200.'",
          HomoeopathicAction: "Rhus Tox 200 cured joint pain and inflammation permanently.",
          clinicalLesson: "Inductive observation of individual modalities leads to the simillimum."
        },
        everydayAnalogy: {
          concept: "Inductive vs Deductive Logic",
          analogyTitle: "Detective Investigation Analogy",
          analogyText: "A bad detective assumes a suspect is guilty based on rumor and forces clues to fit (Deductive). Sherlock Holmes collects every footprint, fingerprint, and cigarette ash first, then identifies the real killer (Inductive)."
        }
      },
      visualAids: {
        flowchart: {
          title: "Baconian Inductive Method in Homoeopathy",
          steps: [
            "1. Unprejudiced Observation (§6)",
            "2. Pure Proving Experiments on Healthy Provers (§105)",
            "3. Tabulation of Totality of Symptoms (§84)",
            "4. Application of Universal Law of Similia (§26)",
            "5. Permanent Gentle Cure (§2)"
          ]
        },
        comparisonTable: {
          title: "Inductive Logic vs Deductive Logic",
          headers: ["Parameter", "Inductive Logic (Bacon/Hahnemann)", "Deductive Logic (Aristotle/Old School)"],
          rows: [
            ["Starting Point", "Specific observed sensory facts", "General theoretical premises"],
            ["Method", "Experimentation & Proving", "Speculation & Syllogism"],
            ["Risk", "Low — grounded in empirical facts", "High — premise may be false"],
            ["Homoeopathic Application", "Symptom Totality & Similia", "Historical Humoral Theory & Bloodletting"]
          ]
        },
        mindMapNodes: {
          central: "Logic in Organon",
          branches: [
            { title: "Inductive Logic", subitems: ["Francis Bacon", "Novum Organum", "Particular to General", "Foundation of Similia"] },
            { title: "Deductive Logic", subitems: ["Aristotle", "Syllogism", "General to Particular", "Risk of Speculation"] }
          ]
        }
      },
      clinicalPearls: [
        "Never prescribe on a diagnostic label alone; always induct the individual symptom pattern.",
        "An unprejudiced observer (§6) is simply an inductive scientist who records sensory facts without theoretical bias."
      ],
      commonMistakes: [
        "Confusing Bacon's Novum Organum with Aristotle's Organon.",
        "Thinking Homoeopathy uses no deduction (Deduction is used in applying the established law of similia to an individual case, but the law itself was established inductively)."
      ],
      frequentlyConfusedTopics: [
        {
          topicA: "Aristotle's Organon",
          topicB: "Bacon's Novum Organum",
          difference: "Aristotle's Organon focused on deductive syllogistic reasoning. Bacon's Novum Organum (New Instrument) introduced inductive empirical scientific observation."
        }
      ],
      mnemonics: [
        {
          code: "INDUCT",
          title: "Steps of Inductive Logic",
          breakdown: [
            "I - Individual sensory observations",
            "N - No pre-conceived bias",
            "D - Data collection & Proving",
            "U - Universal law formulation",
            "C - Clinical verification",
            "T - Truth established"
          ]
        }
      ],
      integration: {
        horizontal: [
          { subject: "Case Taking", correlation: "Case taking (§83-104) is the pure inductive gathering of patient facts." }
        ],
        vertical: {
          progression: "1st BHMS introduces Logic & Inductive Method -> 4th BHMS deeply studies Stuart Close's chapters on Logic and B.K. Sarkar's commentary."
        }
      },
      vivaQuestions: {
        easy: [
          "Who is the father of Inductive Logic?",
          "What does the word 'Organon' mean?",
          "Which logic proceeds from particular to general?"
        ],
        moderate: [
          "Explain how Hahnemann used inductive logic to discover Homoeopathy.",
          "Compare Aristotelian logic with Baconian logic.",
          "Why did Hahnemann title his work 'Organon'?"
        ],
        difficult: [
          "Explain B.K. Sarkar's view on the inductive character of Homoeopathic science."
        ]
      },
      universityQuestionBank: {
        twoMarks: [
          "Define Inductive Logic.",
          "What is Novum Organum?",
          "What is a syllogism?"
        ],
        fiveMarks: [
          "Explain the role of Inductive Logic in the foundation of Homoeopathy.",
          "Differentiate between Inductive Logic and Deductive Logic with medical examples."
        ],
        tenMarks: [
          "Write an essay on Logic and its application in Homoeopathy, highlighting the contributions of Francis Bacon and Samuel Hahnemann."
        ],
        longEssay: [
          "Critically evaluate Homoeopathy as an inductive science based on Baconian principles and its contrast with speculative medical systems."
        ],
        shortNotes: [
          "Novum Organum",
          "Inductive Reasoning in §6",
          "Syllogism"
        ],
        assertionReason: [
          {
            statement: "Assertion (A): Homoeopathy is an inductive science.",
            reason: "Reason (R): It establishes universal therapeutic laws through systematic observation of individual drug provings on healthy human beings.",
            answer: "Both A and R are true, and R is the correct explanation of A.",
            explanation: "Hahnemann built Homoeopathy on Baconian inductive principles."
          }
        ],
        trueFalse: [
          {
            statement: "Inductive logic proceeds from general premises to specific conclusions.",
            answer: false,
            explanation: "Inductive logic proceeds from specific observed facts to general laws."
          }
        ]
      },
      aiapgetMcqs: [
        {
          question: "The term 'Organon' literally means:",
          options: ["Philosophy", "Instrument of Knowledge", "Medical Science", "System of Cure"],
          correctIndex: 1,
          explanation: "Organon is a Greek word meaning 'an instrument or tool for acquiring true knowledge'.",
          highYieldFact: "Greek 'Organon' = Instrument/Tool; derived from Bacon's Novum Organum."
        }
      ],
      quickRevisionNotes: [
        "Word Organon = Greek for 'Instrument of Knowledge'.",
        "Francis Bacon (1620) = Novum Organum (Inductive Logic: Particular facts -> General Law).",
        "Aristotle = Organon (Deductive Logic: General premise -> Particular conclusion)."
      ],
      oneMinuteSummary: "Homoeopathy is an inductive science born from Francis Bacon's logic, building universal therapeutic laws from pure sensory observations of drug provings."
    }
  ],
  "2nd BHMS": [
    {
      id: "OG2.1",
      year: "2nd BHMS",
      topicTitle: "Natural vs Artificial Diseases & Therapeutic Laws",
      subtitle: "Mechanics of Dynamic Cure, Primary vs Secondary Action, and Antipathy (§28–70)",
      readingTime: "16 mins",
      difficulty: "Intermediate",
      bloomLevel: "Analyze",
      millerLevel: "Knows How (KH)",
      teachingHours: 18,
      tlMethods: ["Lecture", "Bedside OPD", "Case Seminar"],
      assessmentMethods: ["LAQ", "SAQ", "Viva Voce", "MCQ"],
      domain: {
        knowledge: "Explains how dynamic artificial disease generated by potentized medicine displaces natural disease (§29).",
        skill: "Differentiate Primary Action of drug from Secondary Counter-Action of vital force (§63-64).",
        communication: "Explain to patients why temporary Homoeopathic aggravation occurs (§157-160).",
        professionalism: "Avoid antipathic or palliative suppression of symptoms.",
        attitude: "Trust nature's law of similia over palliative shortcuts."
      },
      sloList: [
        "Differentiate between Natural Disease and Artificial Disease.",
        "Explain Nature's Law of Cure (§26).",
        "Explain the mechanism of Homoeopathic Cure (§29).",
        "Compare Homoeopathy, Allopathy, and Antipathy (§53–70).",
        "Define Primary Action and Secondary Action (§63–64)."
      ],
      prerequisites: ["1st BHMS Organon Foundations", "Physiology of Vital Dynamics"],
      quickOverview: "In Aphorisms §28–70, Hahnemann details how Homoeopathic cure occurs on the dynamic plane. A potentized remedy creates a slightly stronger, similar artificial disease in the vital force, which completely extinguishes the weaker natural disease (§26, §29). Primary action is the direct influence of the drug; Secondary action is the automatic counter-reaction of the vital force.",
      whyThisMatters: {
        clinical: "Explains why antipathic palliatives (e.g., sleeping pills for insomnia) cause rebound worsening, whereas Homoeopathic remedies trigger permanent self-healing.",
        university: "Core 10-mark essay question in 2nd BHMS Paper I & II.",
        aiapget: "High-yield MCQs on §26 (Nature's Law of Cure), §29 (Mechanics of Cure), and §63-64 (Primary vs Secondary Action).",
        practical: "Teaches Homoeopaths how to manage post-prescription remedy reactions."
      },
      conceptExplanation: [
        "Nature's Law of Cure (§26): 'A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (while differing in kind) is exceedingly similar to it in its manifestations.'",
        "Mechanics of Cure (§29): When a similar Homoeopathic remedy is administered, its dynamic power produces an artificial disease slightly stronger than the natural disease on the affected vital force. The original natural disease is immediately extinguished. Subsequently, due to the minimal dose, the artificial drug affection quickly wanes, leaving the vital force free and healthy.",
        "Primary Action (§63): The initial effect produced by the drug on the vital force (e.g., coffee causing initial wakefulness and mental clarity).",
        "Secondary Action (§64): The reaction of the vital force. It can be (a) Secondary Counter-Action (vital force produces opposite state, e.g., drowsiness after coffee), or (b) Secondary Curative Action (vital force harmonizes health when no exact opposite exists)."
      ],
      stepByStep: [
        "1. Natural Disease affects vital force dynamically.",
        "2. Similar Homoeopathic Remedy administered in minimum dose.",
        "3. Stronger Similar Artificial Disease occupies the vital force plane.",
        "4. Weaker Natural Disease is permanently extinguished (§26, §29).",
        "5. Artificial drug disease naturally dies out, leaving vital force pure and healthy."
      ],
      definitions: [
        {
          term: "Nature's Law of Cure (§26)",
          definition: "A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter is exceedingly similar to it.",
          simpleMeaning: "A stronger similar disease wipes out a weaker similar disease.",
          examDefinition: "The universal natural law where two similar dynamic affections cannot exist simultaneously in the living organism; the stronger extinguishes the weaker.",
          memoryTip: "Stronger Similar Wipes Out Weaker."
        },
        {
          term: "Primary Action (§63)",
          definition: "The direct impact produced by a drug power upon the vital force.",
          simpleMeaning: "What the medicine does to the body first.",
          examDefinition: "Every agent that acts upon the vitality, every medicine, deranges more or less the vital force, and causes a certain alteration in the health of the individual. This is termed primary action.",
          memoryTip: "Primary = Drug on Body."
        },
        {
          term: "Secondary Action (§64)",
          definition: "The automatic response or counter-action of the vital force.",
          simpleMeaning: "What the body's vital force does in response to the medicine.",
          examDefinition: "The state produced by the vital force in response to the primary action of a drug, either as a counter-action or curative action.",
          memoryTip: "Secondary = Vital Force Response."
        }
      ],
      glossary: [
        {
          term: "Antipathy (Enantiopathy)",
          meaning: "Palliative mode of treatment applying remedies producing opposite symptoms to the disease (§56-60).",
          pronunciation: "an-TIP-uh-thee",
          clinicalRelevance: "Produces temporary relief followed by severe secondary rebound aggravation."
        }
      ],
      clinicalApplication: {
        opdExample: {
          setting: "Clinical OPD, Bengaluru",
          patientProfile: "30-year-old chronic insomnia patient who took strong sleeping pills (Antipathy).",
          scenario: "Patient experienced initial sleep for 3 hours (Primary Action), followed by severe rebound insomnia lasting 3 nights (Secondary Counter-Action). Homoeopath prescribed Coffea Cruda 200 based on similia.",
          HomoeopathicAction: "Coffea Cruda stimulated the vital force's secondary curative action, restoring natural sleep without dependency.",
          clinicalLesson: "Antipathy causes rebound worsening; Homoeopathy stimulates curative secondary reaction."
        },
        everydayAnalogy: {
          concept: "Primary vs Secondary Action",
          analogyTitle: "The Pendulum Analogy",
          analogyText: "When you push a clock pendulum to the right with your hand (Primary Action), as soon as you let go, the pendulum swings back automatically to the left with equal force (Secondary Counter-Action)."
        }
      },
      visualAids: {
        flowchart: {
          title: "Mechanics of Homoeopathic Cure (§29)",
          steps: [
            "1. Living Organism with Natural Dynamic Disease",
            "2. Administer Simillimum (Stronger Similar Dynamic Power)",
            "3. Vital Force Occupied by Stronger Artificial Disease",
            "4. Natural Disease Extinguished (§26)",
            "5. Artificial Disease Fades Away (Minimum Dose)",
            "6. Vital Force Restored to Complete Harmony (§2)"
          ]
        },
        comparisonTable: {
          title: "Homoeopathy vs Allopathy vs Antipathy",
          headers: ["Feature", "Homoeopathy (§53)", "Allopathy (§55)", "Antipathy (§56)"],
          rows: [
            ["Law", "Similia Similibus Curantur (Likes)", "Heteropathy (Dissimilar)", "Contraria Contrariis (Opposites)"],
            ["Symptom Match", "Identical / Similar totality", "Unrelated / Heterogeneous", "Exact opposite single symptom"],
            ["Primary Action", "Gentle artificial impression", "Suppressive / Irritative", "Direct opposite suppression"],
            ["Secondary Result", "Curative restoration of health", "Complex disease creation", "Rebound aggravation / worsening"]
          ]
        },
        mindMapNodes: {
          central: "Therapeutic Mechanics (§28–70)",
          branches: [
            { title: "Laws of Cure", subitems: ["§26 Nature's Law", "§29 Mechanics of Cure", "§30-33 Drug vs Disease Power"] },
            { title: "Action Types", subitems: ["§63 Primary Action", "§64 Secondary Counter-Action", "Secondary Curative Action"] },
            { title: "Treatment Modes", subitems: ["Homoeopathy (Similia)", "Allopathy (Dissimilar)", "Antipathy (Opposite)"] }
          ]
        }
      },
      clinicalPearls: [
        "Homoeopathic aggravation (§157) is proof that the artificial disease is slightly stronger than the natural disease (§29).",
        "Never repeat doses during the active secondary curative response of the vital force."
      ],
      commonMistakes: [
        "Confusing Primary Action with Secondary Action.",
        "Thinking that artificial disease is toxic (Potentized remedies exert dynamic, non-toxic artificial power)."
      ],
      frequentlyConfusedTopics: [
        {
          topicA: "Secondary Counter-Action",
          topicB: "Secondary Curative Action",
          difference: "Secondary Counter-Action occurs when an exact opposite state exists in nature (e.g., chill after hot bath). Secondary Curative Action occurs when no exact opposite exists, leading to complete restoration of health."
        }
      ],
      mnemonics: [
        {
          code: "ACTION",
          title: "Drug Action Sequence",
          breakdown: [
            "A - Agent applied to body",
            "C - Causes primary impression",
            "T - Triggering vital force",
            "I - Inducing secondary response",
            "O - Opposite counter-action or",
            "N - Neutralizing cure"
          ]
        }
      ],
      integration: {
        horizontal: [
          { subject: "Pathology", correlation: "Natural disease dynamic alterations precede structural organic pathology." },
          { subject: "Pharmacology", correlation: "Differentiates toxicological side-effects from dynamic secondary reactions." }
        ],
        vertical: {
          progression: "2nd BHMS studies §28-70 dynamic mechanics -> 3rd BHMS applies remedy reactions (§150-160) -> 4th BHMS evaluates Kent's 12 Observations."
        }
      },
      vivaQuestions: {
        easy: [
          "State Nature's Law of Cure (§26).",
          "What is Primary Action?",
          "What is Antipathy?"
        ],
        moderate: [
          "Explain the mechanics of Homoeopathic cure according to Aphorism 29.",
          "Differentiate between Secondary Counter-Action and Secondary Curative Action.",
          "Why are medicinal powers superior to natural disease powers (§30–33)?"
        ],
        difficult: [
          "Critically evaluate why antipathic treatment always results in secondary rebound aggravation using §56–60."
        ]
      },
      universityQuestionBank: {
        twoMarks: [
          "State Aphorism 26.",
          "Define Primary Action.",
          "What is Enantiopathy?"
        ],
        fiveMarks: [
          "Explain Primary and Secondary action with suitable examples.",
          "Write a short note on Nature's Law of Cure."
        ],
        tenMarks: [
          "Explain in detail the mode of action of Homoeopathic remedies according to Aphorism 29. Compare Homoeopathy with Antipathy and Allopathy."
        ],
        longEssay: [
          "Discuss the dynamic action of medicines (§28–70), detailing Nature's Law of Cure, Primary/Secondary action, and why Homoeopathy is the only rational therapeutic system."
        ],
        shortNotes: [
          "Aphorism 26",
          "Primary Action vs Secondary Action",
          "Rebound Phenomenon in Antipathy"
        ],
        assertionReason: [
          {
            statement: "Assertion (A): Antipathic treatment provides immediate relief followed by severe relapse.",
            reason: "Reason (R): The vital force produces an automatic secondary counter-action opposite to the primary action of the antipathic drug.",
            answer: "Both A and R are true, and R is the correct explanation of A.",
            explanation: "Rebound insomnia or constipation after antipathic drugs is due to secondary counter-action (§64)."
          }
        ],
        trueFalse: [
          {
            statement: "Natural diseases possess stronger dynamic power over the human organism than potentized medicines.",
            answer: false,
            explanation: "Medicinal powers are superior to natural disease powers because they can be administered unconditionally at any time (§30–33)."
          }
        ]
      },
      aiapgetMcqs: [
        {
          question: "Nature's Law of Cure is enunciated in which aphorism of Organon of Medicine?",
          options: ["§24", "§26", "§29", "§63"],
          correctIndex: 1,
          explanation: "Nature's Law of Cure ('A weaker dynamic affection is permanently extinguished by a stronger similar one...') is stated in Aphorism §26.",
          highYieldFact: "§26 = Nature's Law of Cure; §29 = Mechanics of Homoeopathic Cure."
        }
      ],
      quickRevisionNotes: [
        "§26: Nature's Law of Cure (Stronger similar extinguishes weaker).",
        "§29: Mechanics of Cure (Artificial disease displaces natural disease).",
        "§63: Primary Action (Drug on Vital Force). §64: Secondary Action (Vital Force response)."
      ],
      oneMinuteSummary: "A Homoeopathic cure occurs when a potentized remedy creates a slightly stronger similar artificial disease, extinguishing the natural disease and allowing the vital force to return to complete health."
    }
  ],
  "3rd BHMS": [
    {
      id: "OG3.1",
      year: "3rd BHMS",
      topicTitle: "Posology, Potency Selection & LM Scale (§245–285)",
      subtitle: "The Law of Minimum Dose, Centesimal vs 50-Millesimal (LM) Scale, and Repetition Rules",
      readingTime: "18 mins",
      difficulty: "Advanced",
      bloomLevel: "Evaluate",
      millerLevel: "Shows How (SH)",
      teachingHours: 20,
      tlMethods: ["Lecture", "Bedside Clinic", "DOAP", "Small Group Discussion"],
      assessmentMethods: ["LAQ", "SAQ", "Viva Voce", "OSCE", "MCQ"],
      domain: {
        knowledge: "Comprehensive principles of Posology, dilution, potentisation, and repetition of doses.",
        skill: "Prepare and administer 50-millesimal (LM) potencies (§270) with succussion in water.",
        communication: "Instruct patients on liquid LM potency administration and succussion turns.",
        professionalism: "Adhere to the Law of Minimum Dose to avoid severe medicinal aggravations.",
        attitude: "Respect the delicate susceptibility of the patient."
      },
      sloList: [
        "Define Posology and the Law of Minimum Dose.",
        "Compare Centesimal scale (C) with 50-Millesimal scale (LM).",
        "Describe the preparation and administration of LM potencies (§270–272).",
        "Formulate rules for repeating doses in acute vs chronic diseases (§246–248)."
      ],
      prerequisites: ["1st & 2nd BHMS Organon", "Homoeopathic Pharmacy Potentisation"],
      quickOverview: "Aphorisms §245–285 govern Posology—the science of dosage and potency. Hahnemann established the Law of Minimum Dose (§275–283) to trigger healing without causing violent medicinal aggravations. In the 6th Edition Organon (§270), he introduced the 50-Millesimal (LM) scale (1:50,000 ratio), allowing gentle, rapid, continuous daily repetition in modified liquid doses.",
      whyThisMatters: {
        clinical: "Essential for avoiding severe aggravations in hypersensitive patients and managing long chronic cases smoothly with LM potencies.",
        university: "Compulsory 10-mark question on LM Potency and Posology rules in 3rd BHMS Paper II.",
        aiapget: "High-yield topic: dilution ratios (1:100 Centesimal vs 1:50,000 LM), poppy-seed poppy globule size, and 6th edition Aphorisms §270-272.",
        practical: "Directly applied in daily clinic prescription."
      },
      conceptExplanation: [
        "Law of Minimum Dose (§275–283): The dose of a Homoeopathic remedy must be small enough that the artificial disease it creates is only slightly stronger than the natural disease, avoiding unnecessary suffering.",
        "Centesimal Scale (C): Ratio 1:100. Dry globule or infrequent water doses. May produce sharp initial Homoeopathic aggravation.",
        "50-Millesimal Scale (LM / Q): Ratio 1:50,000. Introduced in 6th Edition §270. Prepared by dissolving 1 poppy-seed-sized globule of 3C triturated substance into 500 drops (400 drops water + 100 drops alcohol) and succussing 100 times.",
        "LM Administration (§246-248 6th Ed): Administered in liquid form. The bottle is succussed 8-10 times before each dose to alter the potency slightly, avoiding vital force resistance and producing gentle, rapid cures."
      ],
      stepByStep: [
        "1. Select indicated Simillimum (§3).",
        "2. Choose LM Potency (0/1 to start).",
        "3. Dissolve globule in 7-8 tablespoons of clean water with a few drops of alcohol.",
        "4. Succuss bottle 8-10 times before taking 1 teaspoonful diluted in half a glass of water.",
        "5. Observe patient response and repeat daily or every other day."
      ],
      definitions: [
        {
          term: "50-Millesimal (LM) Scale",
          definition: "The scale of potentiation introduced by Hahnemann in the 6th edition Organon (§270) with a dilution ratio of 1:50,000.",
          simpleMeaning: "A ultra-gentle liquid potency scale (LM 0/1, 0/2...) that can be repeated daily without violent aggravations.",
          examDefinition: "The potency scale prepared by triturating 1 grain of substance to 3C, dissolving in liquid, and succussing at a 1:50,000 ratio per stage.",
          memoryTip: "LM = 1:50,000 ratio (Gentle, Rapid, Daily)."
        },
        {
          term: "Law of Minimum Dose (§275)",
          definition: "The principle that the smallest possible dose of a correctly chosen remedy achieves cure without toxic side-effects or severe aggravation.",
          simpleMeaning: "Give the smallest amount that still works.",
          examDefinition: "The requirement that the curative dose of a Homoeopathic remedy must be reduced to the minimum necessary to excite the vital force.",
          memoryTip: "Minimum Dose = Maximum Safety."
        }
      ],
      glossary: [
        {
          term: "Succussion",
          meaning: "Vigorous downward striking of a liquid remedy bottle against a hard yet elastic surface (e.g. leather-bound book) to release dynamic power.",
          pronunciation: "suh-KUSH-un",
          clinicalRelevance: "Essential before every dose of LM potency to slightly alter its dynamic plane (§247)."
        }
      ],
      clinicalApplication: {
        opdExample: {
          setting: "Homoeopathic Clinical OPD, Chennai",
          patientProfile: "55-year-old chronic eczema and severe asthma patient with hypersensitive constitution.",
          scenario: "Giving Centesimal 200C caused severe skin eruption. The doctor switched to LM 0/1 in liquid, succussed 10 times daily.",
          HomoeopathicAction: "Gentle steady improvement occurred over 3 months without any skin flare-up or asthma attacks.",
          clinicalLesson: "LM potencies are ideal for hypersensitive chronic cases."
        },
        everydayAnalogy: {
          concept: "Succussing LM Potency Before Dose",
          analogyTitle: "Unlocking a Combination Lock",
          analogyText: "If you try to turn a key in a lock that hasn't changed at all, it can jam. Turning the combination dial slightly before each attempt (succussion) allows the key to slide smoothly into the vital force."
        }
      },
      visualAids: {
        flowchart: {
          title: "LM Potency Preparation & Administration (§270)",
          steps: [
            "1. Triturate 1 grain drug to 3C Centesimal",
            "2. Dissolve in 500 drops liquid (400 water + 100 alcohol)",
            "3. Mix 1 drop into 100 drops alcohol and succuss 100 times -> LM 0/1",
            "4. Impregnate poppy-seed size globules (500 per grain)",
            "5. Dissolve 1 globule in 7-8 tbsp water for patient",
            "6. Succuss 8-10 times before each daily dose"
          ]
        },
        comparisonTable: {
          title: "Centesimal Scale vs 50-Millesimal (LM) Scale",
          headers: ["Feature", "Centesimal Scale (C)", "50-Millesimal Scale (LM)"],
          rows: [
            ["Ratio", "1:100", "1:50,000"],
            ["Introduced", "5th Edition Organon (1833)", "6th Edition Organon (§270, 1842)"],
            ["Administration", "Dry globule or water", "Liquid solution succussed before dose"],
            ["Repetition", "Infrequent / Wait and Watch", "Daily / Alternate days safely"],
            ["Aggravation", "Sharp initial aggravation", "Slight end-of-cure aggravation"]
          ]
        },
        mindMapNodes: {
          central: "Posology & Potency (§245-285)",
          branches: [
            { title: "Scales", subitems: ["Centesimal (1:100)", "Decimal (1:10)", "50-Millesimal LM (1:50,000)"] },
            { title: "Rules of Repetition", subitems: ["§246 6th Ed Modified Doses", "Stop on Improvement", "Succuss Before Dose"] },
            { title: "Minimum Dose", subitems: ["§275 Smallest Dose", "Poppy Seed Globules", "Olfaction Method (§288)"] }
          ]
        }
      },
      clinicalPearls: [
        "In LM potencies, if aggravation occurs, stop the medicine immediately and give placebo until improvement ceases.",
        "Always succuss the LM liquid bottle 8-10 times before every dose; never give two identical un-succussed doses."
      ],
      commonMistakes: [
        "Giving dry LM globules directly on the tongue (Correct: LM must be dissolved in liquid and succussed before ingestion).",
        "Confusing LM scale ratio (1:50,000) with Centesimal ratio (1:100)."
      ],
      frequentlyConfusedTopics: [
        {
          topicA: "5th Edition Repetition Rule",
          topicB: "6th Edition LM Repetition Rule",
          difference: "5th edition mandated giving a single dose and waiting until all action ceased before repeating. 6th edition allowed repeating LM potencies daily or at short intervals provided the dose is modified by succussion in liquid."
        }
      ],
      mnemonics: [
        {
          code: "FIFTY",
          title: "50-Millesimal LM Scale Essentials",
          breakdown: [
            "F - Four hundred water + 100 alcohol (500 drops)",
            "I - Initial 3C trituration",
            "F - Fifty thousand (1:50,000 ratio)",
            "T - Ten succussions before taking",
            "Y - Yields rapid, gentle, safe cure"
          ]
        }
      ],
      integration: {
        horizontal: [
          { subject: "Homoeopathic Pharmacy", correlation: "Method of trituration and potentisation of 1C to 3C and preparation of LM globules." }
        ],
        vertical: {
          progression: "3rd BHMS masters LM scale §270 -> 4th BHMS applies LM potencies in complex mental diseases and miasmatic cases."
        }
      },
      vivaQuestions: {
        easy: [
          "What is the dilution ratio of the LM scale?",
          "In which edition of Organon did Hahnemann introduce the 50-millesimal scale?",
          "What is Posology?"
        ],
        moderate: [
          "Describe the preparation of LM 0/1 potency according to Aphorism 270.",
          "Why must the LM bottle be succussed before taking each dose?",
          "Compare Centesimal and LM scale aggravation patterns."
        ],
        difficult: [
          "Explain the changes in repetition rules between the 5th and 6th editions of Organon."
        ]
      },
      universityQuestionBank: {
        twoMarks: [
          "Define Posology.",
          "State the ratio of LM scale.",
          "What is succussion?"
        ],
        fiveMarks: [
          "Write a short note on the Law of Minimum Dose.",
          "Describe the method of administration of LM potencies (§246-248 6th Ed)."
        ],
        tenMarks: [
          "Describe in detail the 50-millesimal (LM) scale (§270). Explain its preparation, administration, advantages, and comparison with the Centesimal scale."
        ],
        longEssay: [
          "Discuss Posology in Homoeopathy (§245-285). Explain the Law of Minimum Dose, selection of potency, rules of repetition, and the evolution from Centesimal to LM scale."
        ],
        shortNotes: [
          "Aphorism 270",
          "Law of Minimum Dose",
          "Succussion in LM Potencies"
        ],
        assertionReason: [
          {
            statement: "Assertion (A): LM potencies can be repeated daily in chronic cases without causing severe Homoeopathic aggravation.",
            reason: "Reason (R): Succussing the liquid bottle before each dose alters the dynamic plane slightly, making the dose acceptable to the vital force.",
            answer: "Both A and R are true, and R is the correct explanation of A.",
            explanation: "Dynamic variation via succussion prevents vital force resistance (§247)."
          }
        ],
        trueFalse: [
          {
            statement: "The 50-millesimal scale was introduced by Hahnemann in the 5th Edition Organon.",
            answer: false,
            explanation: "The 50-millesimal (LM) scale was introduced in the posthumous 6th Edition Organon (§270)."
          }
        ]
      },
      aiapgetMcqs: [
        {
          question: "In the preparation of 50-millesimal (LM) potency, 1 drop of 3C liquid trituration is added to how many drops of alcohol?",
          options: ["99", "100", "500", "50000"],
          correctIndex: 1,
          explanation: "In §270, 1 drop of liquid solution from 3C is mixed with 100 drops of alcohol and succussed 100 times to give LM 0/1.",
          highYieldFact: "LM scale ratio = 1:50,000; Prepared from 3C triturated substance."
        }
      ],
      quickRevisionNotes: [
        "LM Scale = 1:50,000 ratio (6th Edition §270).",
        "Preparation: 3C trituration -> 1 globule in 500 drops -> 1 drop + 100 drops alcohol + 100 succussions = LM 0/1.",
        "Administration: Dissolve in water, succuss 8-10 times before each dose."
      ],
      oneMinuteSummary: "The 50-millesimal (LM) scale (§270) provides an ultra-gentle 1:50,000 dilution ratio that allows safe daily liquid administration when succussed prior to each dose."
    }
  ],
  "4th BHMS": [
    {
      id: "OG4.1",
      year: "4th BHMS",
      topicTitle: "Mental Diseases & One-Sided Maladies (§210–230)",
      subtitle: "Classification, Case Taking, Miasmatic Origin, and Management of Insanity & Psora",
      readingTime: "20 mins",
      difficulty: "Expert",
      bloomLevel: "Create",
      millerLevel: "Does (D)",
      teachingHours: 22,
      tlMethods: ["Lecture", "Psychiatric OPD Clinic", "Bedside Case Presentation", "DOAP"],
      assessmentMethods: ["LAQ", "SAQ", "Viva Voce", "OSCE", "MCQ"],
      domain: {
        knowledge: "Mastery of Mental Diseases (§210-230), one-sided diseases, and Kentian/Close philosophy.",
        skill: "Conduct mental state case taking, construct psychological symptom portrait, and differentiate somatic vs mental origin.",
        communication: "Counsel psychiatric patients and families with compassion and calm authority.",
        professionalism: "Maintain strict medical confidentiality and avoid harsh restraint or physical violence in mental wards.",
        attitude: "Treat mental illnesses as dynamic vital derangements with deep empathy."
      },
      sloList: [
        "Classify Mental Diseases according to Organon (§210–230).",
        "Explain why all physical diseases are accompanied by mental changes (§210-213).",
        "Describe four distinct categories of Mental Diseases (§215–227).",
        "Outline clinical management, diet, regimen, and psychotherapy rules in mental cases (§228–230)."
      ],
      prerequisites: ["1st-3rd BHMS Organon", "Psychiatry & Practice of Medicine"],
      quickOverview: "Aphorisms §210–230 form the cornerstone of Homoeopathic Psychiatry. Hahnemann reveals that mental diseases are not fundamentally different from physical diseases—all physical illnesses alter the mental disposition (§210). Mental diseases are one-sided diseases where physical symptoms decline while mental symptoms intensify. Hahnemann classified them into 4 distinct clinical types and advocated humane psychological treatment 100 years ahead of modern psychiatry.",
      whyThisMatters: {
        clinical: "Provides a brilliant, non-toxic dynamic therapeutic approach for anxiety, depression, bipolar disorders, and psychosis without heavy chemical sedation.",
        university: "Guaranteed 10-mark essay and 5-mark short notes in 4th BHMS Organon Paper I & II.",
        aiapget: "High-yield entrance topic: classification of mental diseases (§215-227), acute insanity (§221), and psychotherapeutic rules (§228).",
        practical: "Equips Homoeopaths to handle complex psychiatric OPD cases."
      },
      conceptExplanation: [
        "Core Law (§210–213): Mental disposition is the chief symptom in every case of sickness. The state of the patient's mind and disposition is always altered in disease.",
        "Classification of Mental Diseases (§215–227):",
        "1. Somato-Psychic Mental Diseases (§215–216): Arise from physical disease progressing to mental symptoms as physical signs fade (Psora-rooted).",
        "2. Acute Insanity / Mania (§221): Suddenly bursting forth from exciting causes (e.g. fright, anger, grief). Treat immediately with acute remedies (Aconite, Belladonna, Stramonium) followed by anti-psoric treatment.",
        "3. Mental Diseases of Doubtful Origin (§224–225): Arise from emotional causes (grief, disappointed love, jealousy). Can be relieved by psychotherapeutic counseling initially.",
        "4. Mental Diseases from Physical Corporeal Causes (§227): Secondary mental symptoms arising directly from structural organic pathology.",
        "Psychotherapy & Management (§228–230): Display calm, dignified authority without anger or violence; treat with utmost compassion, proper diet, and non-restraint."
      ],
      stepByStep: [
        "1. Complete mental case taking (§214) focusing on disposition, emotions, and mind.",
        "2. Classify the mental disease into one of the 4 Hahnemannian categories.",
        "3. Differentiate whether origin is emotional (§224) or corporeal/psoric (§215).",
        "4. Administer Simillimum (e.g. Ignatia for acute grief, Belladonna/Stramonium for mania, Sulphur/Calcarea for chronic psoric insanity).",
        "5. Apply non-violent psychological counseling and supportive environment (§228)."
      ],
      definitions: [
        {
          term: "One-Sided Disease (§172)",
          definition: "Diseases that display too few symptoms, rendering remedy selection difficult.",
          simpleMeaning: "Illnesses where only one or two prominent symptoms are visible while others remain hidden.",
          examDefinition: "Diseases that possess only one or two principal symptoms, obscuring the rest of the disease portrait.",
          memoryTip: "One-Sided = Masked / Few Symptoms."
        },
        {
          term: "Somato-Psychic Mental Disease (§215)",
          definition: "Mental illness resulting from the decline of a physical disease, where corporeal symptoms transfer to the mind plane.",
          simpleMeaning: "A physical disease that turns into a mental disease.",
          examDefinition: "Mental disease produced by the transfer of physical symptoms to the dynamic mental plane, rooted chiefly in Psora.",
          memoryTip: "Body illness transfers to Mind."
        }
      ],
      glossary: [
        {
          term: "Mental Disposition",
          meaning: "The patient's emotional character, temperament, mood, and psychological attitude (§211).",
          pronunciation: "MEN-tul dis-puh-ZISH-un",
          clinicalRelevance: "The single most decisive factor in choosing the Homoeopathic simillimum."
        }
      ],
      clinicalApplication: {
        opdExample: {
          setting: "Psychiatric Homoeopathic OPD, Kolkata",
          patientProfile: "24-year-old male who developed acute violent mania after a tragic romantic breakup.",
          scenario: "Patient screaming, biting, and terrified of darkness. Intern suggested physical restraints and heavy tranquilizers. The Professor identified acute mania from emotional cause (§221) and administered Stramonium 200 in liquid.",
          HomoeopathicAction: "Patient calmed down within 3 hours without any physical restraint, slept peacefully, and regained normal mental clarity.",
          clinicalLesson: "Homoeopathic simillimum cures acute mania rapidly and humanely."
        },
        everydayAnalogy: {
          concept: "Mental Disease as One-Sided Disease",
          analogyTitle: "The Iceberg Analogy",
          analogyText: "In mental diseases, the physical symptoms submerge under water like an iceberg, while the huge tip above water represents the intense mental symptoms. The disease is the same single iceberg."
        }
      },
      visualAids: {
        flowchart: {
          title: "Hahnemann's Classification of Mental Diseases (§215-227)",
          steps: [
            "1. Somato-Psychic (§215): Physical disease declines -> Mental symptoms appear (Anti-psoric remedy required)",
            "2. Acute Insanity (§221): Bursting forth suddenly from fright/grief (Acute remedy e.g. Stramonium, then anti-psoric)",
            "3. Emotional/Doubtful Origin (§224): From grief/jealousy/fear (Friendly counseling + Ignatia/Nat Mur)",
            "4. Corporeal Origin (§227): Secondary to organic brain or visceral disease"
          ]
        },
        comparisonTable: {
          title: "Mental Disease Types & Management Summary",
          headers: ["Category", "Origin & Cause", "Primary Treatment Line"],
          rows: [
            ["Somato-Psychic (§215)", "Decline of physical disease into Psora", "Anti-psoric constitutional remedy"],
            ["Acute Mania (§221)", "Sudden fright, rage, or excitation", "Acute remedy (Acon/Bell/Stram) followed by anti-psoric"],
            ["Emotional Insanity (§224)", "Sustained grief, disappointment, fear", "Psychotherapy & counseling + Ignatia/Nat Mur"],
            ["Corporeal Insanity (§227)", "Organic physical organ degeneration", "Somatic treatment + supportive care"]
          ]
        },
        mindMapNodes: {
          central: "Mental Diseases (§210-230)",
          branches: [
            { title: "Foundational Rule", subitems: ["§211 Mind Disposition Decisive", "§213 Physical-Mental Unity"] },
            { title: "Classification", subitems: ["Somato-Psychic (§215)", "Acute Mania (§221)", "Emotional (§224)", "Corporeal (§227)"] },
            { title: "Management Rules", subitems: ["§228 No Physical Violence", "Calm Compassionate Authority", "Anti-Psoric Cure"] }
          ]
        }
      },
      clinicalPearls: [
        "In mental cases, never argue with or mock the patient's delusions; display calm, compassionate authority (§228).",
        "Always take the physical symptoms prior to the onset of insanity to find the true anti-psoric simillimum (§218)."
      ],
      commonMistakes: [
        "Treating mental diseases as purely local brain diseases (Correct: Mental disease is a systemic dynamic derangement of the vital force).",
        "Using physical violence or harsh restraints in mania."
      ],
      frequentlyConfusedTopics: [
        {
          topicA: "Acute Mania (§221)",
          topicB: "Emotional Insanity (§224)",
          difference: "Acute mania (§221) bursts forth suddenly with violent delirium and requires acute remedies first (Belladonna, Stramonium). Emotional insanity (§224) arises from mild psychological causes and responds to friendly counseling first."
        }
      ],
      mnemonics: [
        {
          code: "MIND",
          title: "4 Types of Mental Diseases",
          breakdown: [
            "M - Mental from physical decline (Somato-Psychic §215)",
            "I - Instant acute mania (§221)",
            "N - Non-corporeal emotional origin (§224)",
            "D - Direct corporeal origin (§227)"
          ]
        }
      ],
      integration: {
        horizontal: [
          { subject: "Psychiatry", correlation: "Aligns Organon mental categories with modern psychiatric conditions (Bipolar, Schizophrenia, PTSD)." },
          { subject: "Practice of Medicine", correlation: "Differentiates organic brain lesions from dynamic psychiatric illness." }
        ],
        vertical: {
          progression: "4th BHMS integrates §210-230 with Kent's Philosophy (Lecture 22) and Stuart Close's Genius of Homoeopathy."
        }
      },
      vivaQuestions: {
        easy: [
          "In which aphorisms are Mental Diseases discussed?",
          "Why is mental disposition important in Homoeopathic prescribing?",
          "What is a one-sided disease?"
        ],
        moderate: [
          "Classify Mental Diseases according to Dr. Samuel Hahnemann.",
          "How should a Homoeopath manage a case of acute mania (§221)?",
          "Describe the rules for psychotherapeutic management of mental patients (§228–230)."
        ],
        difficult: [
          "Explain why Hahnemann considers Mental Diseases as a form of One-Sided Disease (§215)."
        ]
      },
      universityQuestionBank: {
        twoMarks: [
          "Define One-Sided Disease.",
          "Enumerate two aphorisms dealing with Mental Diseases.",
          "Name two remedies for acute mania."
        ],
        fiveMarks: [
          "Write a short note on the management of Mental Diseases according to Aphorism 228.",
          "Describe the treatment of Acute Insanity (§221)."
        ],
        tenMarks: [
          "Classify Mental Diseases according to Organon of Medicine (§210–230). Explain their etiology, case taking, and Homoeopathic management."
        ],
        longEssay: [
          "Discuss Mental Diseases (§210-230) in detail. Explain how physical illnesses transfer to the mental plane, Hahnemann's fourfold classification, remedy selection, and psychotherapeutic rules."
        ],
        shortNotes: [
          "Aphorism 211 (State of Mind)",
          "Acute Insanity (§221)",
          "Psychotherapy in §228"
        ],
        assertionReason: [
          {
            statement: "Assertion (A): In mental diseases, physical symptoms fade as mental symptoms worsen.",
            reason: "Reason (R): Mental disease is a one-sided condition where the disease localized on the mental plane obscures physical signs.",
            answer: "Both A and R are true, and R is the correct explanation of A.",
            explanation: "Hahnemann explains this transfer in §215–216."
          }
        ],
        trueFalse: [
          {
            statement: "Hahnemann advocated physical punishment and restraints for violent mental patients.",
            answer: false,
            explanation: "Hahnemann strictly condemned physical violence and restraints in §228, insisting on calm, compassionate treatment."
          }
        ]
      },
      aiapgetMcqs: [
        {
          question: "According to Hahnemann, acute insanity (§221) bursting forth suddenly should be treated first with:",
          options: ["Anti-psoric remedies immediately", "Acute remedies like Aconite, Belladonna, Stramonium", "Placebo for 14 days", "High potency Sulphur"],
          correctIndex: 1,
          explanation: "§221 dictates giving acute remedies (Aconite, Belladonna, Stramonium, Hyoscyamus) first to subdue acute mania before anti-psoric treatment.",
          highYieldFact: "§221 Acute Mania = Give acute remedy first, then anti-psoric."
        }
      ],
      quickRevisionNotes: [
        "§210–213: Mental disposition is altered in ALL diseases.",
        "§215–227: Four types of Mental Diseases (Somato-Psychic, Acute Mania, Emotional, Corporeal).",
        "§228–230: Management: Compassionate, non-violent, calm authority, no physical punishment."
      ],
      oneMinuteSummary: "Mental diseases are dynamic, one-sided illnesses (§210-230) best treated by matching the patient's emotional disposition with a simillimum alongside compassionate, non-violent psychological care."
    }
  ]
};

