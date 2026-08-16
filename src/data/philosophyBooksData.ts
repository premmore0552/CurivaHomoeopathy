export interface PhilosophyBook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  year: string;
  overview: string;
  bhmsYear: 'I BHMS' | 'II BHMS' | 'III BHMS' | 'IV BHMS';
  keyChapters: {
    chapterNumber: string;
    chapterTitle: string;
    summary: string;
    organonCorrelation: string;
  }[];
  clinicalPearls: string[];
  examPointers: string[];
}

export const PHILOSOPHY_BOOKS: PhilosophyBook[] = [
  {
    id: "kent-philosophy",
    slug: "kent-lectures-on-homoeopathic-philosophy",
    title: "Lectures on Homoeopathic Philosophy",
    subtitle: "A Systematic Exposition of Hahnemannian Principles",
    author: "Dr. James Tyler Kent",
    year: "1900",
    bhmsYear: "I BHMS",
    overview: "Kent's 37 lectures represent one of the most widely studied treatises on Homoeopathic philosophy in BHMS curricula worldwide. Kent systematically elucidates the concepts of the Sick, Simple Substance, Vital Force, Susceptibility, and Constitutional Prescribing.",
    keyChapters: [
      {
        chapterNumber: "Lecture I",
        chapterTitle: "The Sick",
        summary: "Analyzes Aphorism §1. Emphasizes that it is the MAN who is sick, not his tissues or organs. Organ pathology is merely the ultimate result of disease, not the cause.",
        organonCorrelation: "Aphorisms §1 – §2"
      },
      {
        chapterNumber: "Lecture II",
        chapterTitle: "The Highest Ideal of Cure",
        summary: "Elucidates Aphorism §2: rapid, gentle, and permanent restoration of health. Cure must be based on easily comprehensible principles.",
        organonCorrelation: "Aphorism §2"
      },
      {
        chapterNumber: "Lecture IV",
        chapterTitle: "The Unprejudiced Observer",
        summary: "Explains Aphorism §6. The true physician perceives only the changes in health (symptoms) through senses guided by reason.",
        organonCorrelation: "Aphorisms §6, §83–§90"
      },
      {
        chapterNumber: "Lecture XI",
        chapterTitle: "Simple Substance",
        summary: "Presents Kent's Swedenborgian view of the Vital Force as a 'Simple Substance' possessing formative intelligence, pervading the physical organism.",
        organonCorrelation: "Aphorisms §9 – §11"
      },
      {
        chapterNumber: "Lecture XVIII",
        chapterTitle: "Miasms: Psora, Sycosis, Syphilis",
        summary: "Comprehensive exposition of Hahnemann's chronic miasms, tracing Psora as the fundamental mother of all chronic disease states.",
        organonCorrelation: "Aphorisms §72 – §82"
      }
    ],
    clinicalPearls: [
      "Treat the patient, not the disease name.",
      "Mental and emotional symptoms occupy the highest rank in constitutional evaluation.",
      "The direction of cure must proceed from within outward, from above downward, and in reverse order of appearance."
    ],
    examPointers: [
      "Frequent 10-mark question: 'Explain Kent's concept of The Sick based on Lecture I.'",
      "Short note: 'Kent's 12 Reactions following remedy administration.'"
    ]
  },
  {
    id: "stuart-close-genius",
    slug: "stuart-close-genius-of-homoeopathy",
    title: "The Genius of Homoeopathy",
    subtitle: "Lectures and Essays on Homoeopathic Philosophy",
    author: "Dr. Stuart Close",
    year: "1924",
    bhmsYear: "IV BHMS",
    overview: "A masterwork that connects Hahnemannian principles with modern scientific logic, epistemology, and biology. Stuart Close clarifies complex concepts like Susceptibility, Reaction, Posology, and the Psychological Point of View.",
    keyChapters: [
      {
        chapterNumber: "Chapter I",
        chapterTitle: "Psychological Point of View",
        summary: "Demonstrates that medicine must view life and disease dynamically rather than materialistically. Health is a state of kinetic balance.",
        organonCorrelation: "Aphorisms §9 – §12"
      },
      {
        chapterNumber: "Chapter III",
        chapterTitle: "Schools of Philosophy in Medicine",
        summary: "Traces the historical evolution of medical thinking from Dogmatists and Empirics to Baconian Inductive Philosophy in Homoeopathy.",
        organonCorrelation: "Introduction to Organon"
      },
      {
        chapterNumber: "Chapter V",
        chapterTitle: "Substantiality of the Vital Force",
        summary: "Explores the nature of life energy, comparing Hahnemann's vital energy with kinetic energy, electricity, and radio-activity.",
        organonCorrelation: "Aphorisms §9 – §15"
      },
      {
        chapterNumber: "Chapter VIII",
        chapterTitle: "Susceptibility, Reaction and Immunity",
        summary: "Defines susceptibility as the capability of living organisms to receive impressions and react to stimuli, forming the basis of remedy action.",
        organonCorrelation: "Aphorisms §30 – §33"
      },
      {
        chapterNumber: "Chapter XII",
        chapterTitle: "Posology (Dose and Potency)",
        summary: "Scientific analysis of the minimum dose and the mathematical principles governing infinitesimal drug action.",
        organonCorrelation: "Aphorisms §272 – §283"
      }
    ],
    clinicalPearls: [
      "Susceptibility determines both disease contraction and therapeutic cure.",
      "The degree of potency must match the degree of vital susceptibility.",
      "Inductive logic is the only safe foundation for therapeutic science."
    ],
    examPointers: [
      "frequent 5-mark question: 'Define Susceptibility according to Stuart Close and explain its clinical significance.'",
      "Short note: 'Difference between Inductive and Deductive logic in Homoeopathy.'"
    ]
  },
  {
    id: "ha-roberts-principles",
    slug: "ha-roberts-principles-and-art-of-cure",
    title: "The Principles and Art of Cure by Homoeopathy",
    subtitle: "Modern Physics & Miasmatic Analysis",
    author: "Dr. Herbert A. Roberts",
    year: "1942",
    bhmsYear: "IV BHMS",
    overview: "Dr. H.A. Roberts bridges 20th-century atomic physics, genetics, and cell physiology with Hahnemann's Organon, offering profound insights into the dynamic nature of drugs and miasms.",
    keyChapters: [
      {
        chapterNumber: "Chapter I",
        chapterTitle: "What Homoeopathy Has to Offer",
        summary: "Contrasts the law-governed certainty of Homoeopathy with the changing theories of palliative allopathy.",
        organonCorrelation: "Aphorisms §1 – §3"
      },
      {
        chapterNumber: "Chapter III",
        chapterTitle: "The Vital Force in Health and Disease",
        summary: "Explains how atomic physics confirms that matter and energy are interchangeable, supporting Hahnemann's dynamic potentization.",
        organonCorrelation: "Aphorisms §9 – §12"
      },
      {
        chapterNumber: "Chapter X",
        chapterTitle: "Taking the Case",
        summary: "Detailed practical guidelines for taking a complete, unbiased case history according to Organon directives.",
        organonCorrelation: "Aphorisms §83 – §104"
      },
      {
        chapterNumber: "Chapter XVI",
        chapterTitle: "The Three Miasms: Psora, Sycosis, Syphilis",
        summary: "A masterly breakdown: Psora = Deficiency/Irritation; Sycosis = Excess/Incoordination/Infiltration; Syphilis = Destruction/Degeneration.",
        organonCorrelation: "Aphorisms §72 – §82"
      },
      {
        chapterNumber: "Chapter XXII",
        chapterTitle: "Defiance of Law",
        summary: "Analyzes the disastrous consequences of suppression, polypharmacy, and ignoring Hering's law.",
        organonCorrelation: "Aphorisms §20, §77"
      }
    ],
    clinicalPearls: [
      "Psora is functional irritation; Sycosis is overgrowth; Syphilis is structural destruction.",
      "Potentization liberates the dynamic energy stored within atomic bonds.",
      "Never mix remedies; polypharmacy creates incurable artificial complex diseases."
    ],
    examPointers: [
      "Frequent 10-mark question: 'Discuss H.A. Roberts' classification and clinical features of the Three Miasms.'",
      "Short note: 'Dynamic action of remedies according to Roberts.'"
    ]
  },
  {
    id: "dunham-science",
    slug: "carroll-dunham-science-of-therapeutics",
    title: "Homoeopathy: The Science of Therapeutics",
    subtitle: "Scientific Essays on Pathology & Therapeutics",
    author: "Dr. Carroll Dunham",
    year: "1877",
    bhmsYear: "IV BHMS",
    overview: "Carroll Dunham's collection of scholarly essays clearly defines Homoeopathy as a true science of observation, explaining the exact boundary between Diagnostic Pathology and Therapeutic Prescribing.",
    keyChapters: [
      {
        chapterNumber: "Essay I",
        chapterTitle: "Homoeopathy a Science of Observation",
        summary: "Establishes that therapeutics must be built on observable facts and natural laws rather than speculative hypotheses.",
        organonCorrelation: "Aphorisms §6, §18"
      },
      {
        chapterNumber: "Essay III",
        chapterTitle: "Relation of Pathology to Therapeutics",
        summary: "Clarifies that while pathology tells us WHAT organ is diseased, only symptomatology tells us WHICH remedy will cure.",
        organonCorrelation: "Aphorisms §3, §18"
      },
      {
        chapterNumber: "Essay VI",
        chapterTitle: "Primary and Secondary Action of Drugs",
        summary: "Analyzes the physiological primary action of drugs vs the vital reaction (secondary action) of the organism.",
        organonCorrelation: "Aphorisms §63 – §66"
      }
    ],
    clinicalPearls: [
      "Pathology diagnoses the disease; symptomatology diagnoses the remedy.",
      "Primary action belongs to the drug; secondary counter-action belongs to the vital force.",
      "The single remedy is a logical imperative of the Law of Similars."
    ],
    examPointers: [
      "Frequent 5-mark question: 'Explain Dunham's view on the relation between Pathology and Therapeutics.'",
      "Short note: 'Primary vs Secondary Action according to Carroll Dunham.'"
    ]
  },
  {
    id: "dudgeon-lectures",
    slug: "re-dudgeon-lectures-on-homoeopathy",
    title: "Lectures on the Theory and Practice of Homoeopathy",
    subtitle: "Historical Evolution & Translation Analysis",
    author: "Dr. Robert Ellis Dudgeon",
    year: "1853",
    bhmsYear: "IV BHMS",
    overview: "A classic historical and critical analysis of Hahnemann's discoveries by his primary English translator. Dudgeon provides invaluable context on the evolution of the Organon editions, drug provings, and posology.",
    keyChapters: [
      {
        chapterNumber: "Lecture I",
        chapterTitle: "Hahnemann's Medical Discoveries",
        summary: "Detailed historical chronicle of Hahnemann's Cinchona experiment in 1790 and the development of the Law of Similars.",
        organonCorrelation: "Introduction & Preface"
      },
      {
        chapterNumber: "Lecture VII",
        chapterTitle: "The Organon of Medicine and Its Editions",
        summary: "Critical textual comparison of the changes across the 1st through 5th editions of the Organon.",
        organonCorrelation: "Chronology of Editions"
      },
      {
        chapterNumber: "Lecture XII",
        chapterTitle: "The Homoeopathic Posology and Dilutions",
        summary: "Traces Hahnemann's transition from material doses to the centesimal scale and potentization.",
        organonCorrelation: "Aphorisms §269 – §271"
      }
    ],
    clinicalPearls: [
      "Understanding the historical evolution of Hahnemann's thoughts prevents dogmatic misinterpretations.",
      "The Law of Similars is an empirical law derived from systematic experimentation.",
      "Translational fidelity is essential to preserving the true spirit of the Organon."
    ],
    examPointers: [
      "Frequent 5-mark question: 'Outline the historical development of Organon editions as described by Dudgeon.'",
      "Viva question: 'Which edition of the Organon did Dudgeon translate?' (Answer: 5th Edition)."
    ]
  }
];
