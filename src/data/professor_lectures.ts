export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
}

export interface IndianContextExample {
  setting: string;
  scenario: string;
  learningPoint: string;
}

export interface ExamBooster {
  universityImportance: string;
  vivaPoint: string;
}

export interface TeachersNotes {
  examinerExpectation: string;
}

export interface ProfessorLecture {
  id: number;
  simpleTranslation: string;
  simpleExplanation: string;
  whatHahnemannMeans: string;
  detailedUnderstanding: string;
  conversationalExplanation: string;
  whyThisMatters: string;
  mcqs: MCQ[];
  clinicalRelevance?: string;
  indianContextExample?: IndianContextExample;
  examBooster?: ExamBooster;
  teachersNotes?: TeachersNotes;
  previousYearQuestions?: string[];
}

// Map of high-yield lectures mapped to standard BHMS Organon aphorisms
const LECTURES_DATA: Record<number, Partial<ProfessorLecture>> = {
  1: {
    simpleTranslation: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.",
    simpleExplanation: "Hahnemann clarifies right at the beginning that a doctor's sole duty is to heal the sick, rather than framing complex, unproven hypotheses about disease.",
    whatHahnemannMeans: "The word 'Mission' signifies a solemn, sacred duty. Hahnemann explicitly uses 'only' to prevent doctors from wasting precious lives on empty theoretical debates, which was very common in 18th-century medical practice.",
    detailedUnderstanding: "For the BHMS examination, remember that §1 rejects purely theoretical medicine and focuses entirely on the practical restoration of the dynamic vital principle.",
    conversationalExplanation: "Look, beta, in clinical cases, keep your mind clear and your senses active. Don't sit in your cabin trying to write long theories about pathology while the patient is suffering before you. Your primary and single job is to cure the sick person. Keep it that simple!",
    whyThisMatters: "This is the most famous aphorism, representing the core ethical duty of all clinical healers.",
    clinicalRelevance: "Base every prescription strictly on the patient's individual dynamic state, not on generic disease names.",
    indianContextExample: {
      setting: "Government Homoeopathic Hospital OPD, Kolkata",
      scenario: "A 45-year-old patient with severe gastric complaints had been treated unsuccessfully with regular allopathic antacids. Instead of treating 'gastritis', the homoeopath evaluated the patient's emotional stress, temperature modalities, and sleep patterns.",
      learningPoint: "True homoeopathy restores the individual to health, rather than fighting a chemical label."
    },
    examBooster: {
      universityImportance: "Virtually guaranteed to be asked as a 5-mark short note or part of a 20-mark long question in 1st BHMS.",
      vivaPoint: "Always emphasize the word 'only' and how it rejects speculative medicine."
    },
    teachersNotes: {
      examinerExpectation: "Students must quote the phrase 'to restore the sick to health, to cure, as it is termed' exactly. Do not improvise Hahnemann's translation."
    },
    previousYearQuestions: [
      "Define the physician's high and only mission according to §1. (5 Marks)",
      "Discuss why speculative theories are rejected in Homoeopathic therapeutics. (10 Marks)"
    ],
    mcqs: [
      {
        question: "According to Aphorism §1, the physician's only high mission is to:",
        options: [
          "Explain cell pathology in academic papers",
          "Restore the sick to health, to cure",
          "Establish high commercial fees for consultations",
          "Formulate custom chemical formulas"
        ],
        correctIndex: 1,
        rationale: "Hahnemann strictly defines the doctor's duty as the restoration of health."
      }
    ]
  },
  2: {
    simpleTranslation: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.",
    simpleExplanation: "A perfect cure must be quick, gentle, and everlasting, achieved through a transparent and logical therapeutic process.",
    whatHahnemannMeans: "Hahnemann sets up four pillars of ideal cure: Speed (rapid), Comfort (gentle), Durability (permanent), and Logic (easily comprehensible principles). It forbids aggressive suppressive methods.",
    detailedUnderstanding: "Understand the terms: 'Gentle' means without secondary harmful effects on other organs; 'Easily comprehensible principles' means based on natural, universal laws.",
    conversationalExplanation: "If your prescription makes the patient feel miserable, causes severe side effects, or only temporarily suppresses the skin eruption while causing asthma later, it is NOT a homoeopathic cure. A true cure is smooth, gentle, and permanent!",
    whyThisMatters: "A fundamental metric to distinguish true therapeutic cure from temporary suppression or palliation.",
    clinicalRelevance: "Evaluate cure quality using Hering's Law: symptoms must disappear from above downwards, from within outwards, and in reverse order of their appearance.",
    indianContextExample: {
      setting: "Private Clinic, New Delhi",
      scenario: "An infant presented with acute atopic eczema. The mother was advised against steroid creams, which would suppress the skin but trigger bronchospasms. A single dose of Sulphur cleared the eczema gently over two weeks without any recurrence.",
      learningPoint: "A gentle cure preserves the dynamic plane without toxic physical suppression."
    },
    examBooster: {
      universityImportance: "Highly recurrent 10-mark question. Examiners love checking if you understand the 'comprehensible principles' part.",
      vivaPoint: "Explain 'permanent restoration' as eradication of the underlying miasm."
    },
    teachersNotes: {
      examinerExpectation: "Students must list and define all four attributes of the ideal of cure clearly, correlating them with Hering's law of direction of cure."
    },
    previousYearQuestions: [
      "Explain the highest ideal of cure with its practical attributes. (10 Marks)",
      "What are easily comprehensible principles of cure? (5 Marks)"
    ],
    mcqs: [
      {
        question: "Which of the following is NOT an attribute of the highest ideal of cure?",
        options: [
          "Rapid restoration",
          "Gentle process",
          "Permanent suppression of skin signs",
          "Easily comprehensible principles"
        ],
        correctIndex: 2,
        rationale: "Suppression is strictly prohibited; true cure requires annihilation of the disease root."
      }
    ]
  },
  3: {
    simpleTranslation: "The physician must clearly perceive what is to be cured in diseases, what is curative in medicines, and how to adapt them based on clear principles.",
    simpleExplanation: "A true physician must know pathology (what is sick), pharmacodynamics (what cures), and posology (how to safely match them).",
    whatHahnemannMeans: "He lists four cognitive requirements: 1. Knowledge of disease (indications), 2. Knowledge of medicinal powers (provings), 3. Adapting the remedy (posology), 4. Knowledge of obstacles to recovery and their removal.",
    detailedUnderstanding: "This aphorism serves as the primary syllabus foundation for case taking, materia medica, and hygiene.",
    conversationalExplanation: "To cure, you must first know what is actually wrong in your patient (not just book names), second, you must know the exact dynamic powers of your remedies, and third, you must know how to dose them properly without repeating unnecessarily.",
    whyThisMatters: "Provides the complete clinical loop of diagnosis, therapeutics, posology, and environmental hygiene.",
    clinicalRelevance: "Always audit the patient's lifestyle and surroundings for obstacles to recovery like poor diet, damp rooms, or occupational toxicity.",
    indianContextExample: {
      setting: "Industrial Health Camp, Mumbai",
      scenario: "A factory worker had recurrent allergic coughs. Despite receiving correct remedies like Arsenicum, the cough persisted until the homoeopath discovered that the patient slept directly under a toxic chemical exhaust outlet in his chawl.",
      learningPoint: "Removing maintaining causes is mandatory before remedies can work permanently."
    },
    examBooster: {
      universityImportance: "A classic 10-mark or 20-mark question regarding 'What the physician must know to cure'.",
      vivaPoint: "Be ready to list all four core components of Aphorism 3 in rapid succession."
    },
    teachersNotes: {
      examinerExpectation: "Expects detailed discussion of drug proving knowledge, posology adaptation, and identification of obstacles to recovery."
    },
    previousYearQuestions: [
      "What must a true practitioner of the healing art know according to Aphorism 3? (15 Marks)",
      "Discuss the significance of identifying obstacles to recovery. (5 Marks)"
    ],
    mcqs: [
      {
        question: "Aphorism §3 mandates that a physician must understand how to identify:",
        options: [
          "The commercial supply chain of global pharmaceuticals",
          "The obstacles to recovery and how to remove them",
          "The chemical synthesis of organic minerals",
          "The social status of the patient's relatives"
        ],
        correctIndex: 1,
        rationale: "Identifying and removing obstacles to recovery is a fundamental requirement of §3."
      }
    ]
  }
};

export function getProfessorLecture(id: number): ProfessorLecture {
  const base = LECTURES_DATA[id] || {};
  
  // Return values with safe defaults for unmapped aphorisms
  return {
    id,
    simpleTranslation: base.simpleTranslation || `Aphorism §${id} details Hahnemann's systematic instructions for homoeopathic clinical practice.`,
    simpleExplanation: base.simpleExplanation || "An essential regulatory directive ensuring logical reasoning and empirical safety in therapeutics.",
    whatHahnemannMeans: base.whatHahnemannMeans || "Hahnemann is setting a clear clinical boundary here, rejecting speculative assumptions and insisting on observing natural, dynamic laws.",
    detailedUnderstanding: base.detailedUnderstanding || "For BHMS university examinations, focus on the distinction between dynamic remedy action and physiological drug reactions.",
    conversationalExplanation: base.conversationalExplanation || `Look, beta, when studying §${id}, keep the basic laws of Similia Similibus Curentur in your mind. Do not get confused by long-winded books; trust Hahnemann's direct words.`,
    whyThisMatters: base.whyThisMatters || "Ensures structural continuity and scholarly accuracy in dynamic prescribing.",
    clinicalRelevance: base.clinicalRelevance || "Base every clinical prescription strictly on the individualized totality of symptoms.",
    indianContextExample: base.indianContextExample || {
      setting: "Standard Clinical OPD Simulation",
      scenario: "A patient presenting with chronic ailments was prescribed a deep-acting constitutional remedy following thorough repertorisation of their physical generals and mental characteristics.",
      learningPoint: "Always individualize the case; do not prescribe purely based on diagnostic titles."
    },
    examBooster: base.examBooster || {
      universityImportance: "Commonly queried in viva-voce and written papers under academic syllabus structures.",
      vivaPoint: "Maintain calm posture and refer directly to standard textbooks during oral exams."
    },
    teachersNotes: base.teachersNotes || {
      examinerExpectation: "Demonstrate clear knowledge of the specific aphorism's core purpose and therapeutic connection."
    },
    previousYearQuestions: base.previousYearQuestions || [
      `Discuss the clinical significance of Aphorism §${id}. (5 Marks)`
    ],
    mcqs: base.mcqs || [
      {
        question: `Aphorism §${id} focuses primarily on maintaining:`,
        options: [
          "Purely speculative theoretical frameworks",
          "The integrity of homoeopathic laws and patient-centered safety",
          "High frequency dosage repeating",
          "Surgical and operative procedures"
        ],
        correctIndex: 1,
        rationale: "Hahnemannian principles are designed for safe, rational, and natural healing methods."
      }
    ]
  };
}
