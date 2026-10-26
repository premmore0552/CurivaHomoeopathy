// Bundled MCQ data extracted from Curiva's own practice bank for local, offline study.
export interface ImportedMCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  subject: string;
  credits?: string;
}

const subjectMCQs: Record<string, ImportedMCQ[]> = {
  "Materia Medica": [
    {
      id: 'mm_1',
      question: "Which remedy is known as the 'Homoeopathic Surgeon'?",
      options: ["Arnica Montana", "Hepar Sulphuris", "Silicea", "Calendula Officinalis"],
      correctAnswer: 2,
      explanation: "Silicea is often called the 'Homoeopathic Surgeon' due to its clinical ability to promote the expulsion of foreign bodies/splinters from tissues.",
      category: "Keynotes",
      subject: "Materia Medica"
    },
    {
      id: 'mm_2',
      question: "A patient presents with warm blood/intolerance to heat, thirstless state, changeable symptoms, and craves cool open air. Which remedy fits?",
      options: ["Natrum Muriaticum", "Pulsatilla Pratensis", "Apis Mellifica", "Sulphur"],
      correctAnswer: 1,
      explanation: "Pulsatilla is classic for warm blood, absolute thirstlessness with dry mouth, changeable symptoms ('no two stools alike'), and relief in cool open air.",
      category: "Constitutions",
      subject: "Materia Medica"
    },
    {
      id: 'mm_3',
      question: "Which remedy is characterized by a deep left-sided action, where symptoms sleep into aggravation, and the patient cannot tolerate any snug neck collars?",
      options: ["Lachesis Muta", "Lycopodium Clavatum", "Phosphorus", "Spigelia"],
      correctAnswer: 0,
      explanation: "Lachesis muta affects left-sided organs, experiences severe aggravation during or after sleep ('sleeps into an aggravation'), and is highly sensitive to tight bands or clothing around the neck/waist.",
      category: "Characteristics",
      subject: "Materia Medica"
    }
  ],
  "Organon of Medicine": [
    {
      id: 'om_1',
      question: "Who is the founder and father of Homoeopathy?",
      options: ["Dr. J.T. Kent", "Dr. Samuel Hahnemann", "Dr. Constantine Hering", "Dr. Boenninghausen"],
      correctAnswer: 1,
      explanation: "Dr. Samuel Hahnemann (1755-1843) discovered and formulated the therapeutic system of Homoeopathy.",
      category: "General",
      subject: "Organon of Medicine",
      credits: "Samuel Hahnemann's Historical Biographies"
    },
    {
      id: 'om_2',
      question: "The first edition of the groundbreaking work 'The Chronic Diseases' by Samuel Hahnemann was published in which year?",
      options: ["1828", "1833", "1810", "1843"],
      correctAnswer: 0,
      explanation: "The first edition of 'The Chronic Diseases, their Peculiar Nature and their Homoeopathic Cure' was published in 1828.",
      category: "History",
      subject: "Organon of Medicine",
      credits: "National Institute of Homoeopathy (NIH) Entrance Archives"
    },
    {
      id: 'om_3',
      question: "In which aphorism of the Organon of Medicine (6th Edition) does Hahnemann define the concept of 'Vital Principle' (previously Vital Force) as animating the material organism in health?",
      options: ["Aphorism 1", "Aphorism 9", "Aphorism 26", "Aphorism 70"],
      correctAnswer: 1,
      explanation: "Aphorism 9 establishes that in the healthy condition, the spiritual vital force animates the material organism, keeping all parts in harmonious play.",
      category: "Philosophy",
      subject: "Organon of Medicine",
      credits: "Samuel Hahnemann, Organon of Medicine (6th Edition)"
    },
    {
      id: 'om_4',
      question: "According to Samuel Hahnemann in Aphorism 26, the 'therapeutic law of nature' states that a weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter is:",
      options: ["Of an identical substance", "Of a higher decimal scale", "Of a similar kind, though different in nature", "Of an opposite clinical action"],
      correctAnswer: 2,
      explanation: "Hahnemann's therapeutic law of nature (Aphorism 26) states: 'A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (deviating in kind) is very similar in its manifestations.'",
      category: "Therapeutic Laws",
      subject: "Organon of Medicine",
      credits: "Sourced from AIAPGET (All India Ayush Post Graduate Entrance Test) Homoeopathic Archives"
    },
    {
      id: 'om_5',
      question: "Which edition of Organon of Medicine introduced the doctrine of Vital Force for the first time?",
      options: ["First Edition", "Third Edition", "Fifth Edition", "Sixth Edition"],
      correctAnswer: 2,
      explanation: "The Fifth Edition (published in 1833) introduced the concept of the 'Vital Force' (Lebenskraft) as a spiritual, dynamic principle.",
      category: "History",
      subject: "Organon of Medicine",
      credits: "All India Ayush Post Graduate Entrance Test (AIAPGET) Preparation Guide"
    },
    {
      id: 'om_6',
      question: "According to Organon Aphorism 210-230, which of the following is true regarding the Homoeopathic perspective on mental diseases?",
      options: ["They are completely distinct from bodily physical states", "They are almost all modified corporeal or physical diseases, where physical symptoms decline as mental symptoms grow", "They should be treated solely with low decimal scale mineral compounds", "They require high dosage crude narcotic palliation exclusively"],
      correctAnswer: 1,
      explanation: "Hahnemann states in Aphorisms 210-216 that mental diseases are actually modified physical diseases where somatic symptoms have diminished while the mental symptoms have become exceptionally one-sidedly prominent.",
      category: "Mental Diseases",
      subject: "Organon of Medicine",
      credits: "Stuart Close, Lectures on Homoeopathic Philosophy"
    },
    {
      id: 'om_7',
      question: "In the 6th edition of Organon of Medicine, which potency scale was introduced by Hahnemann to secure gentle, continuous curative cycles without severe aggravation?",
      options: ["Centesimal Potencies (C)", "Decimal Potencies (X)", "LM Potencies (50-millesimal scale)", "Korsakovian Single-Vial Potencies"],
      correctAnswer: 2,
      explanation: "LM potencies (dilution factor of 50,000) are introduced in the 6th edition of the Organon (specifically Aphorism 270) to allow safer, frequent repetition of Homoeopathic remedies.",
      category: "Posology",
      subject: "Organon of Medicine",
      credits: "Joint Ayurvedic and Homoeopathic Academic Council of India Prep Syllabus"
    }
  ],
  "Homoeopathic Pharmacy": [
    {
      id: 'hp_1',
      question: "What is the standard weight ratio of dry drug substance to vehicle in Class I of Hahnemann's classical tincture preparation?",
      options: ["1:2", "1:10", "1:1", "1:9"],
      correctAnswer: 0,
      explanation: "Under the older Hahnemannian classification, Class I tinctures have a standard drug-substance to vehicle ratio of 1:2.",
      category: "Tinctures",
      subject: "Homoeopathic Pharmacy"
    },
    {
      id: 'hp_2',
      question: "Which stalwart introduced the decimal scale of potentisation (denoted as 'X' or 'D') based on a 1:9 drug-to-vehicle dilution ratio?",
      options: ["Dr. Samuel Hahnemann", "Dr. J.T. Kent", "Dr. Constantine Hering", "Dr. C. von Boenninghausen"],
      correctAnswer: 2,
      explanation: "Dr. Constantine Hering introduced the decimal scale to Homoeopathic pharmacy, which is now popular worldwide.",
      category: "Scales",
      subject: "Homoeopathic Pharmacy"
    },
    {
      id: 'hp_3',
      question: "What is the primary animal source from which the Homoeopathic remedy Apis Mellifica is prepared?",
      options: ["Cuttlefish Ink", "Spanish Fly", "Honeybee", "Honeybee Venom only"],
      correctAnswer: 2,
      explanation: "Apis Mellifica is prepared from the whole living honeybee, capturing both the systemic substances and the active stinger venom.",
      category: "Sources",
      subject: "Homoeopathic Pharmacy"
    }
  ],
  "Repertory": [
    {
      id: 'rep_1',
      question: "In Kent's Repertory of the Homoeopathic Materia Medica, which section contains the rubric 'Fear of death'?",
      options: ["Mind", "Generalities", "Head", "Chest"],
      correctAnswer: 0,
      explanation: "All psychological, cognitive, and mental symptoms, including specific fears like 'Fear of death', are indexed under the 'Mind' section of Kent's Repertory.",
      category: "Layout",
      subject: "Repertory"
    },
    {
      id: 'rep_2',
      question: "Boenninghausen's 'Therapeutic Pocket Book' (TPB) is heavily based on which core philosophical doctrine regarding parts of the body?",
      options: ["Doctrine of Keynotes", "Doctrine of Grand Generalisation (Analogy)", "Doctrine of Card Indexing", "Doctrine of Single-symptom prescription"],
      correctAnswer: 1,
      explanation: "The TPB is based on the Doctrine of Analogy, which generalizes localized modalities or symptoms to the entire patient's constitution when suitable.",
      category: "Philosophy",
      subject: "Repertory"
    },
    {
      id: 'rep_3',
      question: "Which of the following is considered the standard sequence of sections in a classical repertory schema like Kent's?",
      options: ["Mind - Head - Face - Throat - Chest - Extremities - Generalities", "Generalities - Mind - Head - Extremities - Sleep", "Mind - Generalities - Head - Vertigo - Sleep", "Head - Vertigo - Mind - Chest - Extremities"],
      correctAnswer: 0,
      explanation: "Kent's Repertory follows a regional 'top-to-bottom' anatomical layout: beginning with Mind, down through Head, Face, Throat, internal organs, Chest, Extremities, and culminating in global 'Generalities'.",
      category: "Structure",
      subject: "Repertory"
    }
  ],
  "Anatomy & Physiology": [
    {
      id: 'ap_1',
      question: "Which cranial nerve provides the primary inputs responsible for the special sense of smell (olfaction)?",
      options: ["Cranial Nerve I", "Cranial Nerve II", "Cranial Nerve VII", "Cranial Nerve X"],
      correctAnswer: 0,
      explanation: "Cranial Nerve I (Olfactory Nerve) transmits olfactory sensory impulses from the nasal cavity directly to the brain.",
      category: "Neuroanatomy",
      subject: "Anatomy & Physiology"
    },
    {
      id: 'ap_2',
      question: "Where is the Sinoatrial (SA) Node, which acts as the heart's natural pacemaker, anatomically located?",
      options: ["Left Ventricle", "Right Ventricle", "Left Atrium", "Right Atrium"],
      correctAnswer: 3,
      explanation: "The SA Node is positioned in the upper wall of the Right Atrium near the entrance of the superior vena cava, rhythmically depolarizing to initiate heartbeat.",
      category: "Cardiovascular",
      subject: "Anatomy & Physiology"
    },
    {
      id: 'ap_3',
      question: "Which hormone is secreted to increase blood plasma calcium levels when calcium levels drop?",
      options: ["Calcitonin", "Parathyroid Hormone (PTH)", "Thyroxine", "Aldosterone"],
      correctAnswer: 1,
      explanation: "Parathyroid Hormone (PTH), secreted by the parathyroid glands, stimulates osteoclasts, increases renal calcium reabsorption, and raises blood calcium levels.",
      category: "Endocrinology",
      subject: "Anatomy & Physiology"
    }
  ],
  "Pathology": [
    {
      id: 'path_1',
      question: "The diagnostic presence of 'Reed-Sternberg cells' (owl-eye appearance histological cells) is a key diagnostic pathognomonic finding for which condition?",
      options: ["Hodgkin's Lymphoma", "Non-Hodgkin's Lymphoma", "Multiple Myeloma", "Acute Myeloid Leukemia"],
      correctAnswer: 0,
      explanation: "Reed-Sternberg cells are large, abnormal lymphocytes with multiple nuclei discovered on biopsy that confirm Hodgkin's Lymphoma.",
      category: "Oncology",
      subject: "Pathology"
    },
    {
      id: 'path_2',
      question: "Which class of antibody/immunoglobulin mediates immediate Type I hypersensitivity (allergic) reactions in human pathology?",
      options: ["IgG", "IgM", "IgE", "IgA"],
      correctAnswer: 2,
      explanation: "IgE antibodies bind to allergens and trigger mast cells/basophils, initiating immediate anaphylactic and allergic responses.",
      category: "Immunology",
      subject: "Pathology"
    },
    {
      id: 'path_3',
      question: "What is the causative spiral-shaped bacterium (spirochete) responsible for Syphilis infection?",
      options: ["Treponema pallidum", "Borrelia burgdorferi", "Leptospira interrogans", "Neisseria gonorrhoeae"],
      correctAnswer: 0,
      explanation: "Treponema pallidum is the spirochete bacterium that penetrates mucosal membranes or skin, causing Syphilis.",
      category: "Microbiology",
      subject: "Pathology"
    }
  ],
  "FMTD": [
    {
      id: 'fm_1',
      question: "In forensic pathology, cherry-red staining of post-mortem skin discoloration (lividity) indicates death caused by which agent?",
      options: ["Carbon Monoxide (CO) poisoning", "Hydrogen Cyanide (HCN) poisoning", "Arsenic poisoning", "Drowning alone"],
      correctAnswer: 0,
      explanation: "Carbon Monoxide binds to hemoglobin forming carboxyhemoglobin, giving a distinct cherry-red color to hypostasis/lividity.",
      category: "Toxicology",
      subject: "FMTD"
    },
    {
      id: 'fm_2',
      question: "In forensic science, the formal study of fingerprints as a foolproof method of human identification is referred to as:",
      options: ["Dactylography (Dactyloscopy)", "Anthroponomy", "Trichology", "Graphology"],
      correctAnswer: 0,
      explanation: "Dactylography or Dactyloscopy is the scientific study of skin ridges on fingertips as reliable biological identifiers.",
      category: "Identification",
      subject: "FMTD"
    },
    {
      id: 'fm_3',
      question: "Which of the following organic-metal chemical chelating agents is historically preferred as the active antidote for acute Arsenic poisoning?",
      options: ["Deferoxamine", "British Anti-Lewisite (Dimercaprol)", "Penicillamine", "EDTA"],
      correctAnswer: 1,
      explanation: "British Anti-Lewisite (Dimercaprol or BAL) coordinates with heavy metals like Arsenic, permitting urinary excretion and reducing cellular toxicity.",
      category: "Antidotes",
      subject: "FMTD"
    }
  ],
  "Practice of Medicine": [
    {
      id: 'pm_1',
      question: "Faget's Sign (relative bradycardia - where fever rises while heart rate abnormally lags) is clinically seen in which diagnostic condition?",
      options: ["Typhoid Fever", "Malaria", "Rheumatic Fever", "Pneumococcal Pneumonia"],
      correctAnswer: 0,
      explanation: "Typhoid/Enteric fever presents with relative bradycardia (temperature-pulse dissociation or Faget's sign).",
      category: "Infectious",
      subject: "Practice of Medicine"
    },
    {
      id: 'pm_2',
      question: "Which diagnostic blood serological agglutination test is classically used in sub-acute clinical phases to support diagnosis of Enteric Fever?",
      options: ["Widal Test", "Wassermann Test", "Paul-Bunnell Test", "Western Blot"],
      correctAnswer: 0,
      explanation: "The Widal test detects agglutination antibodies (TO and TH) against Salmonella enterica serotype Typhi in client sera.",
      category: "Diagnostics",
      subject: "Practice of Medicine"
    },
    {
      id: 'pm_3',
      question: "Which pathognomonic intraoral lesions, appearing as tiny salt-grain spots on an erythematous buccal mucosa, are diagnostic keys for Measles?",
      options: ["Koplik's Spots", "Forchheimer's Spots", "Aphthous Ulcers", "Leukoplakia"],
      correctAnswer: 0,
      explanation: "Koplik's spots appear in the prodromal phase of Measles opposite the lower molars and are definitive markers.",
      category: "Pediatrics",
      subject: "Practice of Medicine"
    }
  ]
};

export const importedMedicalMCQs: ImportedMCQ[] = Object.values(subjectMCQs).flat();
export const importedMedicalMCQSubjects = Object.keys(subjectMCQs);
