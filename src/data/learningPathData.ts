export interface LearningArticle {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export interface LearningStep {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  badge: string;
  description: string;
  articles: LearningArticle[];
}

export interface StudyGuideSheet {
  id: string;
  title: string;
  description: string;
  content: {
    label: string;
    details: string;
  }[];
}

export interface CaseQuiz {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  scenario: string;
  symptoms: string[];
  questions: {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
}

export const learningPathSteps: LearningStep[] = [
  {
    id: "fundamental-principles",
    title: "Fundamental Principles",
    subtitle: "The Philosophical Foundations of Similia",
    duration: "Week 1-2",
    badge: "Level 1",
    description: "Master the fundamental natural laws governing homeopathy, from the Core Law of Similars to the concepts of Dynamization and the Dynamic Vital Force.",
    articles: [
      {
        id: "law-of-similars",
        title: "The Law of Similars: Foundation of Homeopathic Science",
        readTime: "8 min read",
        summary: "Trace the origin of 'Similia Similibus Curentur' from Hippocrates and Paracelsus to Samuel Hahnemann's breakthrough cinchona bark experiments.",
        content: [
          "The Principle of Simila (Like cures like) states that any pharmacological agent capable of producing a specific set of clinical manifestations in a healthy, sensitive human individual can resolve a similar pattern of suffering in a diseased patient.",
          "In 1790, while translating William Cullen's Materia Medica, Dr. Samuel Hahnemann questioned the explanation that Spanish Bark (Cinchona) cured malaria solely because of its bitterness. He ingested Cinchona bark twice daily and observed symptoms similar to malaria (fever, chills, joint soreness).",
          "This historic self-proving led Hahnemann to recognize that a drug's healing power resides in its ability to generate an artificial disease state, which overrides and extinguishes the natural disease process via the biological counter-action of the organism.",
          "Unlike modern active suppressive therapies (contraria contrariis curantur), homeopathy aims to stimulate host-defense homeostasis, prompting a secondary restorative recoil of the Vital Force to eliminate susceptibility, rather than merely masking the primary symptoms."
        ],
        keyTakeaways: [
          "A drug's symptom-producing power correlates directly with its symptom-curing power.",
          "Primary actions describe the immediate drug effects; secondary actions describe the vital rebound.",
          "The simillimum is the single remedy matching the totality of natural symptoms closest."
        ]
      },
      {
        id: "vital-force",
        title: "The Dynamic Vital Principle: Animating Force in Health & Disease",
        readTime: "6 min read",
        summary: "Explore Organon Aphorisms 9-17, detailing how the immaterial spiritual force (Dynamis) coordinates physiology and reacts during disease.",
        content: [
          "In Aphorism 9, Hahnemann states: 'In the healthy condition of man, the spiritual vital force, the dynamis that animates the material body, rules with unbounded sway, and retains all the parts of the organism in harmonious play.'",
          "Without this dynamic organizing principle, the physical body is incapable of feeling, action, or self-preservation. It is the Vital Force that maintains the harmonious thermal, enzymatic, and physiological processes we call homeostatic health.",
          "Disease does not begin as a physical lesion or pathological cell structural change. It begins as a dynamic, non-material disturbance of the Vital Principle by inimical external forces. True healing must therefore act on this dynamic level.",
          "Homeopathic diluted potencies, prepared through succussion, act as dynamic vibrational triggers that align directly with the energetic state of the Vital Principal, removing the energetic barrier of the illness."
        ],
        keyTakeaways: [
          "Health is dynamic biological harmony maintained by the Vital Force (Aphorism 9).",
          "Disease is a dynamic derangement of this force, preceding all structural lesions (Aphorism 11).",
          "Healing must be dynamic, non-material, and resonant with the vital principal."
        ]
      },
      {
        id: "minimum-dose",
        title: "The Law of the Minimum Dose and Potentization",
        readTime: "7 min read",
        summary: "Understand the scientific and clinical reasoning behind infinitesimal dilutions, trituration, and serial succussions.",
        content: [
          "When Hahnemann first applied the Law of Similars using crude plants, a temporary aggravation of symptoms was frequent due to direct physiological toxicity. To prevent this, he started diluting the remedies systematically.",
          "Remarkably, as he diluted the substance and subjected it to hard succussion (shaking with impact) or trituration (grinding with lactose), he discovered that the remedies became clinically more powerful, durable, and free of toxicity.",
          "Potentization is not merely dilution. Dilution alone weakens a medicine. Serial dilution coupled with mechanical energetic succussion transfers information to the solvent structure, retaining the dynamic memory of the starting substance.",
          "The Minimum Dose ensures that we do not overload or shock the sensitive vital force. It administers only the exact, molecular-vibrational message needed to provoke a healing reflex, minimizing toxic overload entirely."
        ],
        keyTakeaways: [
          "Minimum dose prevents physiological toxicity and unnecessary therapeutic exacerbation.",
          "Successive dilution plus impact (succussion) is mandatory to release dynamic medicinal patterns.",
          "Nano-pharmacological theories suggest high-dilution remedies form stable water-silica nanoparticles."
        ]
      }
    ]
  },
  {
    id: "materia-medica-study",
    title: "Materia Medica",
    subtitle: "Systematic Drug Study and Remedy Comparison",
    duration: "Week 3-4",
    badge: "Level 2",
    description: "Learn how to systematically study homeopathic drug profiles, catalog keynotes, utilize thermal relations, and classify remedies.",
    articles: [
      {
        id: "remedy-study-methodology",
        title: "How to Study a Homeopathic Remedy: A Professional Guide",
        readTime: "8 min read",
        summary: "Stop memorizing checklists. Learn the structural approach to dissecting Materia Medica based on proving records, origins, and clinical keynotes.",
        content: [
          "A common error among students is attempting to memorize hundreds of symptoms per remedy mechanically. A professional homeopathic student studies the 'genius' or core theme of the remedy first.",
          "The systematic study of a remedy should always follow this structural schema: 1) Botanical/mineral/animal origin; 2) Proving history and primary provers; 3) Sphere of Action (tissue affinity, e.g., venous system vs. nervous system); 4) Core Mental Theme; 5) Prominent Modalities (thermal, temporal, physical); 6) Keynotes and PQRS symptoms.",
          "For instance, studying Lycopodium Clavatum becomes intuitive when you understand its core theme: physical weakness, digestive flatulence, and mental compensation for lack of self-confidence.",
          "By linking physiological actions (sluggish portal circulation, gas from right-to-left) to the psychological compensating theme, the complete drug picture forms a memorable, living human prototype."
        ],
        keyTakeaways: [
          "Focus on the 'genius' or core energetic essence of the remedy rather than isolated symptom lists.",
          "Always identify the primary tissue and nervous system affinities (Sphere of Action).",
          "Cross-reference structural symptoms with core thermal modalities to accurately differentiate polycrests."
        ]
      },
      {
        id: "miasmatic-classification",
        title: "The Three Chronic Miasms: Psora, Sycosis, and Syphilis",
        readTime: "9 min read",
        summary: "Understand Hahnemann's monumental theory of chronic diseases and differentiate the miasmatic pathological paths.",
        content: [
          "In 1828, after observing that chronic diseases frequently returned despite well-indicated acute counter-measures, Hahnemann published his Theory of Chronic Diseases, identifying Miasms as hereditary pathological susceptibilities.",
          "PSORA (The Functional Miasm): Characterized by itchy sensations, hypersensitivity, skin changes, functional deficiency, and mild inflammation. It is thin, dry, restless, anxious, and struggles under functional deficits. Remedies: Sulphur, Psorinum, Lycopodium.",
          "SYCOSIS (The Hyperplastic Miasm): Characterized by over-accumulation, coordination delays, hyper-reactions, warty growths, retention, and structural excesses. The attitude is suspicious, secretive, and manipulative. Remedies: Thuja Occidentalis, Medorrhinum, Natrum Sulphuricum.",
          "SYPHILIS (The Destructive Miasm): Characterized by irregular structural decay, ulceration, deep tissue destruction, sclerosis, and congenital malformations. The mental state is suicidal, melancholic, or violent. Remedies: Syphilinum, Mercurius Solubilis, Aurum Metallicum."
        ],
        keyTakeaways: [
          "Psora represents irritation, Sycosis represents proliferation, Syphilis represents destruction.",
          "A successful prescription in chronic disease must address the active miasmatic profile of the case.",
          "Miasms govern physical pathological styles and mental/behavioral archetypes simultaneously."
        ]
      }
    ]
  },
  {
    id: "case-taking-repertory",
    title: "Case-Taking & Repertorization",
    subtitle: "The Science of Patient Intake and Symphytum Synthesis",
    duration: "Week 5-6",
    badge: "Level 3",
    description: "Master patient intake protocols outlined in Aphorisms 83-104. Learn to extract PQRS symptoms and structurally utilize Kentian or Boenninghausen repertories.",
    articles: [
      {
        id: "art-of-case-taking",
        title: "The Clinical Practice of Classical Case-Taking",
        readTime: "10 min read",
        summary: "Dissect the guidelines in Aphorisms 83 to 104: keeping unprejudiced observation, letting the patient speak uninterrupted, and structured querying.",
        content: [
          "Hahnemann's case-taking instructions are timeless. The first command is to be 'unprejudiced, with sound senses, attentive observation, and fidelity in tracing the picture of the disease.'",
          "Let the patient express their suffering in their own words. Avoid leading questions. Do not ask 'Is your headache raw and burning?' Instead, ask 'Can you describe the precise sensation of your headache?'",
          "Keep the patient uninterrupted. Note their expressions, gestures, and body language. These non-verbal cues often correspond to underlying mental generals that determine the simillimum.",
          "Once the spontaneous narrative ends, systematically explore modalities: what time of day, what side, what temperature, what triggers affect each symptom. This maps variables to find the PQRS anomalies."
        ],
        keyTakeaways: [
          "Avoid leading questions that suggest the answer; let the natural disease voice speak.",
          "Write down the patient's exact verbal descriptions; clinical translation can distort key notes.",
          "Observe physical generals: look, breathing pattern, thermal cues, posture during intake."
        ]
      },
      {
        id: "pqrs-symptoms",
        title: "Extracting the PQRS: Peculiar, Queer, Rare, and Strange Symptoms",
        readTime: "7 min read",
        summary: "Aphorisms 153 emphasizes the value of characteristic symptoms. Learn to differentiate common clinical diagnostic signs from homeopathic prescription keys.",
        content: [
          "In Aphorism 153, Hahnemann establishes: 'We ought to be almost solely attentive to the more striking, singular, uncommon and peculiar (characteristic) signs and symptoms.'",
          "Common symptoms are diagnostic: for example, joint pain and inflammation in a case of Rheumatoid Arthritis. These are of low value for choosing a remedy because all arthritis patients have them.",
          "A Peculiar (PQRS) symptom is highly individual: for example, joint pain that is relieved by holding the feet in ice-cold water, despite the patient feeling extremely chilly overall (Ledum Palustre).",
          "These PQRS exceptions violate typical physiological rules, providing a direct, unsuppressed energetic fingerprint of the patient's unique constitutional disturbance."
        ],
        keyTakeaways: [
          "Common symptoms diagnose the disease; peculiar symptoms prescribe the remedy.",
          "Always look for clinical contradictions (e.g., thirstless with dry mouth, hot head with cold feet).",
          "PQRS symptoms significantly narrow down the potential remedies inside the repertory index."
        ]
      }
    ]
  },
  {
    id: "practical-application",
    title: "Practical Application",
    subtitle: "Posology, Potency Selection, and Second Prescription Rules",
    duration: "Week 7-8",
    badge: "Level 4",
    description: "Transition from theory to clinical reality. Study posology scale selection, evaluate follow-ups, and recognize the critical rules of the second prescription.",
    articles: [
      {
        id: "posology-potency-selection",
        title: "Demystifying Posology: Potency Scales & Dilution Choices",
        readTime: "9 min read",
        summary: "How to choose between Decimal (X), Centesimal (C), and LM scales. Match the potency to the patient's vigor and disease depth.",
        content: [
          "The choice of potency is as vital as the selection of the correct remedy. A perfect remedy given in the wrong potency can fail to act or cause an unnecessarily long, painful aggravation.",
          "As a general rule, match the potency to the patient's Vitality and the Disease Nature: 1) Sensitive, highly reactive infants or severe diseased elderly patients with advanced organic changes usually require gentle, low potencies (6C, 30C) or LM scales; 2) Energetic, robust patients with acute neuro-functional ailments respond brilliantly to high potencies (200C, 1M, 10M).",
          "LM Potencies (fifty-millesimal scale) are unique: they are prepared using a 1:50,000 dilution ratio, allowing for daily or frequent administration with very minimal healing aggravations.",
          "Always administer remedies dissolved in water (the split-dose method). Succussing the water bottle slightly before each dose changes the dynamic potency slightly, preventing biological tolerance."
        ],
        keyTakeaways: [
          "High potencies (200C+) are indicated for psychological and functional conditions with robust vitality.",
          "Low potencies (6C - 30C) are indicated for physical, structural changes and low vital reserve.",
          "The water-solution split-dose method reduces aggravations and dynamic habituation."
        ]
      },
      {
        id: "second-prescription-rules",
        title: "The Art of the Second Prescription: Follow-up Evaluation Rules",
        readTime: "8 min read",
        summary: "Dr. James Tyler Kent's 12 observations on patient response. Learn to wait, repeat, change the remedy, or antidote.",
        content: [
          "Selecting the first remedy is only half the battle. The true genius of a homeopath lies in the management of the follow-up, famously structured by J.T. Kent's 12 Clinical Observations.",
          "Rule 1: If symptoms improve on all levels (mind, energy, physical), change absolutely nothing! Do not repeat the dose; let the dynamic reaction unfold naturally (sacred waiting).",
          "Rule 2: If a sharp healing aggravation occurs shortly after the dose, followed by sustained, long-term improvement, it is a very positive prognosis indicating robust Vital Force clearing.",
          "Rule 3: If symptoms disappear in the reverse order of their chronological appearance (Hering's Law), the cure is proceeding beautifully. Let it act. Never interfere with a dynamic process in progress."
        ],
        keyTakeaways: [
          "Never repeat a remedy or change to a new one while the patient is showing steady progress.",
          "A slight, transient homeopathic aggravation is generally a sign of a perfect prescription.",
          "If the remedy selection is wrong, first antidote if suffering is severe, then re-evaluate the case."
        ]
      }
    ]
  }
];

export const studyGuideSheets: StudyGuideSheet[] = [
  {
    id: "miasmatic-differential",
    title: "Miasmatic Differential Matrix",
    description: "Rapid reference guide to isolate symptoms and match them to the correct classical chronic miasm.",
    content: [
      { label: "Physical State", details: "Psora: Functional, dry, itchy skin, lack of nutrient processing. Sycosis: Proliferative warts, thick discharges, water retention. Syphilis: Destructive ulcers, bone decay, vascular necrosis." },
      { label: "Mental Aspect", details: "Psora: Anxious, hyperactive, fearful, struggles under deficits. Sycosis: Suspicious, secretive, manipulative, forgets recent memories. Syphilis: Suicidal, dull/obtuse, highly violent, forgets everything." },
      { label: "Skin Patterns", details: "Psora: Dry, scaly, intense pruritus, worse from heat of bed. Sycosis: Thick warts, fleshy yellow benign growths, ringworm-like. Syphilis: Painless clean-cut ulcers, coppery brown spots, non-itching sores." },
      { label: "Pathology Speed", details: "Psora: Slow, repeating functional failures, sluggishness. Sycosis: Gradual, hyperplastic expansion, chronic solidifications. Syphilis: Rapidly destructive, irreversible tissue necrosis, congenital abnormalities." }
    ]
  },
  {
    id: "aphorisms-guide",
    title: "Essential Clinical Aphorisms Guide",
    description: "Summary translations of the most crucial paragraphs in Hahnemann's Organon (6th Edition).",
    content: [
      { label: "Aphorism 1: The Mission", details: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed." },
      { label: "Aphorism 2: Ideal Cure", details: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, in the shortest, most reliable, and most harmless way." },
      { label: "Aphorism 9: Dynamic Health", details: "In healthy state, the spiritual vital force animates the physical organism and maintains all parts in harmonious play." },
      { label: "Aphorism 26: Cosmic Law", details: "A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (while differing in kind) is very similar in its manifestations." },
      { label: "Aphorism 83: Case-Taking", details: "Demands from the physician nothing but an unprejudiced mind, sound senses, attentive observation, and fidelity in tracing the disease picture." },
      { label: "Aphorism 153: PQRS Key", details: "In looking for the homeopathic specific, focus almost solely on the striking, singular, uncommon and peculiar (characteristic) symptoms." }
    ]
  }
];

export const learningQuizzes: CaseQuiz[] = [
  {
    id: "case-1",
    title: "Case Analysis: The Changing Symptom Complex",
    difficulty: "Intermediate",
    scenario: "A 24-year-old female medical student presents with chronic nervous exhaustion and warm blood. She states she is absolute 'thirstless despite having a dry mouth'. Her symptoms shift continuously—she complains of right earache one day, shifting to the left joint the next day. She craves cool open breeze, feels suffocated inside a warm lecture hall, and cries easily when describing her family stress, though she is highly affectionate.",
    symptoms: [
      "Absolute thirstless state with dry tongue",
      "Changeable, moving symptoms (dry earache shifting to left ankle)",
      "Suffocates in a warm room; craves cool open air",
      "Weeps easily during case-taking, gentle constitutional behavior"
    ],
    questions: [
      {
        questionText: "Which remedy represents the most fitting simillimum for this totality of symptoms?",
        options: [
          "Natrum Muriaticum",
          "Pulsatilla Pratensis",
          "Apis Mellifica",
          "Sulphur"
        ],
        correctAnswerIndex: 1,
        explanation: "Pulsatilla is classic for warm blood, absolute thirstlessness with dry mouth, changeable symptoms, relief in cool open air, and gentle weeping disposition."
      },
      {
        questionText: "What is the primary thermal relation and modality of this remedy?",
        options: [
          "Chilly patient, aggravated by cold water",
          "Hot patient, relieved by wrapping up warmly",
          "Hot patient, aggravated by warmth of room, relieved by slow open-air walking",
          "Ambi-thermal, relieved by absolute rest"
        ],
        correctAnswerIndex: 2,
        explanation: "Pulsatilla is exceptionally warm-blooded, experiences severe aggravation in closed warm spaces, and is ameliorated by walking slowly in the cool open air."
      }
    ]
  },
  {
    id: "case-2",
    title: "Case Analysis: Left-sided Constriction",
    difficulty: "Advanced",
    scenario: "A 45-year-old male executive presents with intense throat soreness and choking sensations. He states the pain is located on the left side of his throat, spreading to the right, and is extremely aggravated by hot fluids. He has an intense, violent, talkative (loquacious) disposition. Additionally, he cannot bear any snug collars, scarves, or tight clothing around his neck, indicating it causes instant suffocation.",
    symptoms: [
      "Left-sided sore throat, spreading left to right",
      "Hyper-sensitiveness of neck to any touch or collar",
      "Soreness aggravated by hot drinks, better swallowing solids",
      "Extreme rapid loquacity during consultation"
    ],
    questions: [
      {
        questionText: "Which homeopathic remedy fits this symptom profile perfectly?",
        options: [
          "Lycopodium Clavatum",
          "Lachesis Muta",
          "Belladonna",
          "Phytolacca Decandra"
        ],
        correctAnswerIndex: 1,
        explanation: "Lachesis muta fits left-sided throat conditions, high sensitivity to any constriction/collar around the neck, aggravation by warm liquids, and intense rapid loquacity."
      },
      {
        questionText: "According to Hering's and Kent's principles, if this patient awakens with an improved throat but a temporary mild skin eruption, how should you manage this reaction?",
        options: [
          "Immediately prescribe Sulphur to clear the skin eruption",
          "Apply hydrocortisone cream on the skin",
          "Wait and watch, as this represents cure moving from within (throat) outwards (skin)",
          "Antidote Lachesis with a lower potency"
        ],
        correctAnswerIndex: 2,
        explanation: "Hering's Law of Cure dictates that healing occurs from within outwards (internal organs to skin). A transient skin eruption following the clearing of an internal ailment indicates correct direction. You should change nothing and wait."
      }
    ]
  }
];
