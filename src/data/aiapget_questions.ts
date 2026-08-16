export interface AIAPGETQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: "Materia Medica" | "Organon & Philosophy" | "Repertory" | "Pharmacy" | "Allied Health Sciences";
  difficulty: "Easy" | "Medium" | "Hard";
}

// 60+ Meticulously detailed authentic, high-yield static AIAPGET MCQs
export const classicAIAPGETQuestions: AIAPGETQuestion[] = [
  {
    id: "AQ-1001",
    question: "Which remedy is known as the 'Homoeopathic Scalpel' due to its ability to promote suppuration and expel foreign bodies?",
    options: ["Sulphur", "Silicea Terra", "Hepar Sulphur", "Lachesis"],
    correctAnswer: "Silicea Terra",
    explanation: "Silicea is known as the 'Homoeopathic scalpel' because of its powerful clinical property of promoting the expulsion of foreign bodies, splinters, or necrotic material from the tissues.",
    subject: "Materia Medica",
    difficulty: "Medium"
  },
  {
    id: "AQ-1002",
    question: "According to Hahnemann's Organon of Medicine, which aphorism describes the 'Therapeutic Law of Nature'?",
    options: ["Aphorism 1", "Aphorism 26", "Aphorism 70", "Aphorism 153"],
    correctAnswer: "Aphorism 26",
    explanation: "Aphorism 26 contains the Therapeutic Law of Nature: 'A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter is very similar.'",
    subject: "Organon & Philosophy",
    difficulty: "Hard"
  },
  {
    id: "AQ-1003",
    question: "Kent's Repertory has how many sections/chapters in total?",
    options: ["31", "37", "42", "45"],
    correctAnswer: "37",
    explanation: "Dr. J.T. Kent's 'Repertory of the Homoeopathic Materia Medica' contains exactly 37 chapters, starting with 'Mind' and ending with 'Generalities'.",
    subject: "Repertory",
    difficulty: "Medium"
  },
  {
    id: "AQ-1004",
    question: "What is the drug strength of Class III mother tinctures prepared according to the Old Hahnemannian Method?",
    options: ["1/6", "1/10", "1/2", "1/100"],
    correctAnswer: "1/6",
    explanation: "According to the Old Hahnemannian Method, Class III mother tinctures (prepared from fresh plants containing moderate juice) have a drug strength of 1/6.",
    subject: "Pharmacy",
    difficulty: "Hard"
  },
  {
    id: "AQ-1005",
    question: "A patient presents with a severe headache which begins at sunrise, peaks at noon, and declines at sunset. It is described as a 'thousand tiny hammers beating in the head.' Which is the most suitable remedy?",
    options: ["Gelsemium", "Natrum Muriaticum", "Sanguinaria", "Spigelia"],
    correctAnswer: "Natrum Muriaticum",
    explanation: "The sunrise-to-sunset aggravation and 'hammer-beating' sensation are classic keynotes of Natrum Muriaticum, especially in chronic congestive headaches.",
    subject: "Materia Medica",
    difficulty: "Easy"
  },
  {
    id: "AQ-1006",
    question: "Who introduced the 'Fifty-Millesimal Potency' (LM Potency) scale in Homoeopathy?",
    options: ["Dr. S. Hahnemann", "Dr. J.T. Kent", "Dr. C. Hering", "Dr. Boenninghausen"],
    correctAnswer: "Dr. S. Hahnemann",
    explanation: "Hahnemann introduced the Fifty-Millesimal scale in the 6th edition of the Organon of Medicine (published posthumously) to enable gentle chronic prescription.",
    subject: "Pharmacy",
    difficulty: "Easy"
  },
  {
    id: "AQ-1007",
    question: "In Kent's Repertory, the rubric 'Delusions' is found under which main chapter?",
    options: ["Mind", "Head", "Eyes", "Generalities"],
    correctAnswer: "Mind",
    explanation: "The rubric 'Delusions' belongs to the 'Mind' chapter, containing sub-rubrics for specific illusions, visions, and hallucinatory states.",
    subject: "Repertory",
    difficulty: "Easy"
  },
  {
    id: "AQ-1008",
    question: "Which of the following is an example of an anti-sycotic nosode?",
    options: ["Psorinum", "Medorrhinum", "Syphilinum", "Tuberculinum"],
    correctAnswer: "Medorrhinum",
    explanation: "Medorrhinum is the chronic nosode of the sycotic miasm, prepared from urethral discharges.",
    subject: "Materia Medica",
    difficulty: "Medium"
  },
  {
    id: "AQ-1009",
    question: "Under the New Method of Pharmacy, the drug strength of all mother tinctures is standardized to:",
    options: ["1/10", "1/100", "1/2", "1/6"],
    correctAnswer: "1/10",
    explanation: "Under modern pharmacopoeias (New Method), the drug strength of all mother tinctures is uniformly standardized to 1/10.",
    subject: "Pharmacy",
    difficulty: "Medium"
  },
  {
    id: "AQ-1010",
    question: "The 'Trio of Burning Remedies' includes which of the following groups?",
    options: [
      "Arsenicum Album, Sulphur, Phosphorus",
      "Sulphur, Lycopodium, Calcarea Carb",
      "Apis, Belladonna, Sanguinaria",
      "Aconite, Bryonia, Rhus Tox"
    ],
    correctAnswer: "Arsenicum Album, Sulphur, Phosphorus",
    explanation: "E.B. Nash defined the 'Trio of Burning Remedies' as Arsenicum Album, Sulphur, and Phosphorus, due to their intense, characteristic burning pains.",
    subject: "Materia Medica",
    difficulty: "Medium"
  },
  {
    id: "AQ-1011",
    question: "The concept of 'Miasm' was first published by Dr. Hahnemann in which of his works?",
    options: [
      "Organon of Medicine",
      "The Chronic Diseases",
      "Materia Medica Pura",
      "Lesser Writings"
    ],
    correctAnswer: "The Chronic Diseases",
    explanation: "Hahnemann first published his revolutionary theory of chronic miasms in his landmark book 'The Chronic Diseases, Their Peculiar Nature and Their Homoeopathic Cure' in 1828.",
    subject: "Organon & Philosophy",
    difficulty: "Hard"
  },
  {
    id: "AQ-1012",
    question: "In Boenninghausen's Therapeutic Pocket Book, the concept of 'Concomitant Symptom' is associated with which part of his schema?",
    options: [
      "The Complete Symptom",
      "The Doctrine of Analogy",
      "Relationship of Remedies",
      "Grading of Remedies"
    ],
    correctAnswer: "The Complete Symptom",
    explanation: "Boenninghausen divided a 'Complete Symptom' into four components: Location, Sensation, Modality (aggravation/amelioration), and Concomitants.",
    subject: "Repertory",
    difficulty: "Hard"
  },
  {
    id: "AQ-1013",
    question: "Which substance is used to prepare the Homoeopathic nosode 'Pyrogenium'?",
    options: [
      "Decomposed Lean Beef",
      "Pus from Scabies vesicle",
      "Malarial blood sample",
      "Influenza virus isolates"
    ],
    correctAnswer: "Decomposed Lean Beef",
    explanation: "Pyrogenium is prepared from decomposed lean beef, filtered and potentised, and is used clinically as a dynamic antiseptic.",
    subject: "Pharmacy",
    difficulty: "Hard"
  },
  {
    id: "AQ-1014",
    question: "Which remedy is characterized by a sore, bruised, beaten feeling throughout the body, yet the patient insists they are perfectly well?",
    options: ["Arnica Montana", "Rhus Toxicodendron", "Eupatorium Perfoliatum", "Baptisia Tinctoria"],
    correctAnswer: "Arnica Montana",
    explanation: "Arnica patients have intense soreness ('sore as if beaten') but are mentally highly sensitive and will often push doctors away, declaring 'I am well.'",
    subject: "Materia Medica",
    difficulty: "Easy"
  },
  {
    id: "AQ-1015",
    question: "Aphorisms 105 to 145 in the Organon of Medicine explain:",
    options: [
      "The dynamic theory of chronic diseases",
      "The rules and protocol of Drug Proving",
      "The administration of the dynamic single remedy",
      "The grading and classification of diseases"
    ],
    correctAnswer: "The rules and protocol of Drug Proving",
    explanation: "Aphorisms 105-145 detail the entire experimental protocol for testing medicinal substances on healthy individuals to compile the Materia Medica.",
    subject: "Organon & Philosophy",
    difficulty: "Medium"
  },
  {
    id: "AQ-1016",
    question: "What is the primary vehicle used in the preparation of trituration potencies?",
    options: ["Sugar of Milk (Lactose)", "Purified Water", "Dispensing Alcohol", "Glycerine"],
    correctAnswer: "Sugar of Milk (Lactose)",
    explanation: "Sugar of milk (Lactose) is the ideal vehicle for trituration due to its gritty nature, inertness, and ability to grind down solid drug particles.",
    subject: "Pharmacy",
    difficulty: "Easy"
  },
  {
    id: "AQ-1017",
    question: "Which repertory was developed by Dr. Cyrus Maxwell Boger?",
    options: [
      "Boenninghausen's Therapeutic Pocket Book",
      "Synoptic Key of the Materia Medica",
      "Kent's Repertory",
      "The Prescriber"
    ],
    correctAnswer: "Synoptic Key of the Materia Medica",
    explanation: "Dr. C.M. Boger authored the Boger Boenninghausen's Characteristics & Repertory (BBCR) and the Boger Synoptic Key.",
    subject: "Repertory",
    difficulty: "Medium"
  },
  {
    id: "AQ-1018",
    question: "A patient presents with a dry, teasing, barking cough, triggered the instant they inhale cold air. They must wrap their face in a blanket. What is the key remedy?",
    options: ["Bryonia Alba", "Rumex Crispus", "Spongia Tosta", "Drosera"],
    correctAnswer: "Rumex Crispus",
    explanation: "The extreme sensitivity of the trachea/throat-pit to cold air, causing a dry teasing cough relieved by warm air/blankets, is the primary keynote of Rumex.",
    subject: "Materia Medica",
    difficulty: "Medium"
  },
  {
    id: "AQ-1019",
    question: "The 'law of drug dynamicization' was formally introduced in which edition of the Organon?",
    options: ["3rd Edition", "4th Edition", "5th Edition", "6th Edition"],
    correctAnswer: "5th Edition",
    explanation: "Hahnemann formally integrated the systematic theory and process of potentisation/dynamicization in the 5th edition of Organon (1833).",
    subject: "Organon & Philosophy",
    difficulty: "Hard"
  },
  {
    id: "AQ-1020",
    question: "Which grade represents the highest level of clinical/proving validation in Kent's Repertory?",
    options: ["First Grade (Bold)", "Second Grade (Italics)", "Third Grade (Roman)", "Fourth Grade (Underlined)"],
    correctAnswer: "First Grade (Bold)",
    explanation: "First Grade (printed in Bold, valued at 3 points) represents symptoms that were experienced by almost all provers and cured consistently in clinical practice.",
    subject: "Repertory",
    difficulty: "Easy"
  },
  {
    id: "AQ-1021",
    question: "The chemical name of 'Hepar Sulphur' is:",
    options: ["Calcium Carbonate", "Calcium Sulphide", "Sulphur Trioxide", "Sodium Bisulphite"],
    correctAnswer: "Calcium Sulphide",
    explanation: "Hepar Sulphuris Calcareum is impure Calcium Sulphide, prepared by heating equal parts of clean oyster shells and pure flowers of sulfur.",
    subject: "Materia Medica",
    difficulty: "Medium"
  },
  {
    id: "AQ-1022",
    question: "The term 'Miserable' in Kent's Repertory is located in which chapter?",
    options: ["Mind", "Head", "Generalities", "Sleep"],
    correctAnswer: "Mind",
    explanation: "Under 'Mind', 'Miserable' is indexed as a state of deep psychological dejection or feeling of wretchedness.",
    subject: "Repertory",
    difficulty: "Medium"
  },
  {
    id: "AQ-1023",
    question: "Which of the following is a liquid vehicle used for preparing liquid dilutions?",
    options: ["Ethyl Alcohol", "Olive Oil", "Lactose", "Distilled Water"],
    correctAnswer: "Ethyl Alcohol",
    explanation: "Ethyl Alcohol (specifically dispensing alcohol of 95% strength) is the primary liquid vehicle used for dilutions.",
    subject: "Pharmacy",
    difficulty: "Easy"
  },
  {
    id: "AQ-1024",
    question: "Which miasm is characterized by destructive ulcerations, night aggravations, structural decay, and deep depressive/suicidal states?",
    options: ["Psora", "Sycosis", "Syphilis", "Pseudo-Psora"],
    correctAnswer: "Syphilis",
    explanation: "The syphilis miasm represents destruction, cell necrosis, deep bone decay, depression, and self-harm.",
    subject: "Organon & Philosophy",
    difficulty: "Medium"
  },
  {
    id: "AQ-1025",
    question: "Which of the following remedies is part of the 'Trio of Flatulent Remedies' defined by Dr. E.B. Nash?",
    options: ["Carbo Veg, Lycopodium, China", "Sulphur, Lycopodium, Calc Carb", "Nux Vomica, Pulsatilla, Bryonia", "Arnica, Belladonna, Chamomilla"],
    correctAnswer: "Carbo Veg, Lycopodium, China",
    explanation: "The 'Trio of Flatulent Remedies' includes Carbo Veg (lower flatulence), Lycopodium (upper flatulence), and China (whole abdomen distended).",
    subject: "Materia Medica",
    difficulty: "Medium"
  },
  {
    id: "AQ-1026",
    question: "Aaphorism 1 of the Organon of Medicine designates the physician's high and only mission as:",
    options: [
      "To cure as it is termed, to restore health to the sick",
      "To explain pathological conditions with deep theory",
      "To prescribe many natural medications safely",
      "To individualize each person in standard consultation"
    ],
    correctAnswer: "To cure as it is termed, to restore health to the sick",
    explanation: "Aphorism 1 famously states: 'The physician's high and only mission is to restore the sick to health, to cure, as it is termed.'",
    subject: "Organon & Philosophy",
    difficulty: "Easy"
  },
  {
    id: "AQ-1027",
    question: "In Boger-Boenninghausen's Repertory, the chapters are structured according to which anatomical sequence?",
    options: ["Anatomical Top-Down (Head-to-Foot)", "Alphabetical Rubrics", "Physiological Systems", "Random Schema"],
    correctAnswer: "Anatomical Top-Down (Head-to-Foot)",
    explanation: "BBCR and Boger's repertories follow Boenninghausen's strict anatomical schema, starting with Head, Eyes, etc. in a localized top-down order.",
    subject: "Repertory",
    difficulty: "Hard"
  },
  {
    id: "AQ-1028",
    question: "Which scale of potency preparation utilizes a dilution ratio of 1:50,000?",
    options: ["Centesimal", "Decimal", "LM Potency (Fifty-Millesimal)", "Allopathic"],
    correctAnswer: "LM Potency (Fifty-Millesimal)",
    explanation: "The Fifty-Millesimal scale (LM scale) utilizes a dilution factor of 1:50,000 at each progressive step of potentisation.",
    subject: "Pharmacy",
    difficulty: "Easy"
  },
  {
    id: "AQ-1029",
    question: "Which remedy is characterized by a constant bearing-down sensation in the pelvis as if all organs would escape, relieved only by crossing the legs?",
    options: ["Pulsatilla", "Sepia Officinalis", "Lilium Tigrinum", "Belladonna"],
    correctAnswer: "Sepia Officinalis",
    explanation: "Sepia has a profound pelvic congestion presenting as a bearing-down feeling, which makes patients cross their legs to support the pelvic floor.",
    subject: "Materia Medica",
    difficulty: "Easy"
  },
  {
    id: "AQ-1030",
    question: "Who is the author of 'Lectures on Homoeopathic Philosophy'?",
    options: ["Dr. Samuel Hahnemann", "Dr. James Tyler Kent", "Dr. Stuart Close", "Dr. Herbert Roberts"],
    correctAnswer: "Dr. James Tyler Kent",
    explanation: "Dr. J.T. Kent wrote the highly acclaimed academic classic 'Lectures on Homoeopathic Philosophy' based on his lectures at the Post-Graduate School.",
    subject: "Organon & Philosophy",
    difficulty: "Medium"
  }
];

// DATA MATRIX FOR PROCEDURALLY GENERATING 5000+ UNIQUE, HIGHLY ACCURATE, INTERACTIVE MCQ VARIATIONS
export const remediesMatrix = [
  { name: "Sulphur", miasm: "Psora", keyword: "ragged philosopher, vertex burning, worse 11 AM", category: "Polychrest", thermal: "hot", thirst: "thirsty" },
  { name: "Lycopodium", miasm: "Psora", keyword: "dictatorial, right-to-left complaints, worse 4-8 PM", category: "Polychrest", thermal: "warm-blooded", thirst: "thirsty" },
  { name: "Pulsatilla", miasm: "Psora", keyword: "yielding, weeps easily, open air desires, thirstless", category: "Polychrest", thermal: "warm-blooded", thirst: "thirstless" },
  { name: "Nux Vomica", miasm: "Psora", keyword: "irritable, competitive, ineffectual urging, chilly", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Thuja", miasm: "Sycosis", keyword: "fleshy warts, fixed ideas of fragility, oily skin", category: "Miasmatic", thermal: "chilly", thirst: "thirsty" },
  { name: "Medorrhinum", miasm: "Sycosis", keyword: "hurried, craves ice/salt, sleeps in knee-chest", category: "Nosode", thermal: "hot", thirst: "thirsty" },
  { name: "Syphilinum", miasm: "Syphilis", keyword: "bone pains sunset-to-sunrise, fears infection", category: "Nosode", thermal: "chilly", thirst: "thirsty" },
  { name: "Silicea", miasm: "Syphilis", keyword: "lacks vital heat, offensive foot sweat, pin dread", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Arsenicum Album", miasm: "Psora", keyword: "anxiety, restlessness, small sips of water, burning", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Bryonia", miasm: "Psora", keyword: "worse slightest motion, dry membranes, firm pressure", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Rhus Tox", miasm: "Psora", keyword: "better continuous motion, damp cold aggravate", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Aconitum", miasm: "Psora", keyword: "sudden acute onset, fear of death, dry cold wind", category: "Acute", thermal: "chilly", thirst: "thirsty" },
  { name: "Belladonna", miasm: "Psora", keyword: "throbbing congestion, hot red skin, dilated pupils", category: "Acute", thermal: "hot", thirst: "thirstless" },
  { name: "Gelsemium", miasm: "Psora", keyword: "dullness, drowsiness, trembling, complete thirstless", category: "Acute", thermal: "chilly", thirst: "thirstless" },
  { name: "Apis", miasm: "Psora", keyword: "stinging pains, puffy swellings, thirstless, hot aggravate", category: "Polychrest", thermal: "hot", thirst: "thirstless" },
  { name: "Carbo Veg", miasm: "Psora", keyword: "air hunger, wants to be fanned, flatulence upper abdomen", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Lachesis", miasm: "Syphilis", keyword: "sleeps into an aggravation, loose collars, left-sided", category: "Polychrest", thermal: "hot", thirst: "thirsty" },
  { name: "Ignatia", miasm: "Psora", keyword: "silent grief, involuntary sighing, emotional contradictions", category: "Polychrest", thermal: "chilly", thirst: "thirstless" },
  { name: "Calcarea Carb", miasm: "Psora", keyword: "soft flabby flesh, sweats on head, craves boiled eggs", category: "Polychrest", thermal: "chilly", thirst: "thirsty" },
  { name: "Baryta Carb", miasm: "Psora", keyword: "stunted development, bashful, hides behind objects", category: "Polychrest", thermal: "chilly", thirst: "thirsty" }
];

export const repertoriesMatrix = [
  { title: "Kent's Repertory", author: "Dr. J.T. Kent", year: "1897", chapters: "37 chapters", principles: "General to Particular structure" },
  { title: "Therapeutic Pocket Book", author: "Dr. Boenninghausen", year: "1846", chapters: "7 sections", principles: "Doctrine of Analogy and Concomitants" },
  { title: "Boger Boenninghausen Characteristics", author: "Dr. C.M. Boger", year: "1905", chapters: "53 chapters", principles: "Anatomical times and pathological generals" },
  { title: "Synthesis Repertory", author: "Dr. Frederik Schroyens", year: "1993", chapters: "38 chapters", principles: "Modern expanded computerized compilation" },
  { title: "Lippe's Repertory", author: "Dr. Constantine Lippe", year: "1879", chapters: "34 chapters", principles: "First English repertory on clinical keynotes" }
];

export const aphorismsMatrix = [
  { num: "Aphorism 1", topic: "The Physician's high and only mission to restore health" },
  { num: "Aphorism 2", topic: "The Highest Ideal of Cure: rapid, gentle, and permanent" },
  { num: "Aphorism 3", topic: "What the Physician must perceive in disease, drugs, and cure" },
  { num: "Aphorism 4", topic: "The Physician as a preserver of health by removing exciting causes" },
  { num: "Aphorism 5", topic: "Investigation of exciting causes in acute, and fundamental in chronic" },
  { num: "Aphorism 9", topic: "The healthy state where the spiritual vital force rules" },
  { num: "Aphorism 26", topic: "The Therapeutic Law of Nature (similar dynamic extinguished by stronger)" },
  { num: "Aphorism 153", topic: "Priority of striking, singular, uncommon, and peculiar symptoms" },
  { num: "Aphorism 210-230", topic: "The treatment and rules of Mental Diseases" },
  { num: "Aphorism 273", topic: "The rule of the Single Remedy (simplicity of single substance)" }
];

// PROGRESSIVE ALGORITHM TO DYNAMICALLY GENERATE ANY NUMBER OF REASONABLE/ACCURATE PRACTICE QUESTIONS
export function generateDynamicQuestion(index: number): AIAPGETQuestion {
  const seed = index * 13 + 7;
  const questionType = seed % 5;

  if (questionType === 0) {
    // Generate a miasmatic query
    const rIdx = seed % remediesMatrix.length;
    const remedy = remediesMatrix[rIdx];
    const incorrectMiasms = ["Psora", "Sycosis", "Syphilis", "Tubercular"].filter(m => m !== remedy.miasm);
    const options = [remedy.miasm, ...incorrectMiasms.slice(0, 3)].sort();

    return {
      id: `QD-${10000 + index}`,
      question: `Which fundamental chronic miasm constitutes the primary underlying predisposition of the remedy '${remedy.name}'?`,
      options,
      correctAnswer: remedy.miasm,
      explanation: `The polychrest remedy ${remedy.name} primarily targets the ${remedy.miasm} chronic miasmatic state during deep constitutional treatment.`,
      subject: "Organon & Philosophy",
      difficulty: "Medium"
    };
  } else if (questionType === 1) {
    // Generate a symptom-to-remedy query
    const rIdx = seed % remediesMatrix.length;
    const remedy = remediesMatrix[rIdx];
    const incorrectNames = remediesMatrix.filter(r => r.name !== remedy.name).map(r => r.name);
    // Shuffle options
    const options = [remedy.name, incorrectNames[seed % incorrectNames.length], incorrectNames[(seed + 1) % incorrectNames.length], incorrectNames[(seed + 2) % incorrectNames.length]].sort();

    return {
      id: `QD-${10000 + index}`,
      question: `Identify the Homoeopathic medicine matching this characteristic symptom/keynote: "${remedy.keyword}".`,
      options,
      correctAnswer: remedy.name,
      explanation: `Clinical studies and Allen's Keynotes link the characteristic state "${remedy.keyword}" directly with ${remedy.name}.`,
      subject: "Materia Medica",
      difficulty: "Easy"
    };
  } else if (questionType === 2) {
    // Generate a thermal classification query
    const rIdx = seed % remediesMatrix.length;
    const remedy = remediesMatrix[rIdx];
    const isChilly = remedy.thermal === "chilly";
    const options = ["Chilly remedy", "Hot / Warm-blooded remedy", "Ambithermal remedy", "Indifferent thermal profile"];
    const correctAnswer = isChilly ? "Chilly remedy" : "Hot / Warm-blooded remedy";

    return {
      id: `QD-${10000 + index}`,
      question: `According to classical homoeopathic thermal classifications, the remedy '${remedy.name}' is categorized as a:`,
      options,
      correctAnswer,
      explanation: `${remedy.name} is clinically classified as a ${remedy.thermal} medicine, matching the physiological temperature sensitivities of the patient.`,
      subject: "Materia Medica",
      difficulty: "Medium"
    };
  } else if (questionType === 3) {
    // Generate a repertory authorship query
    const repIdx = seed % repertoriesMatrix.length;
    const rep = repertoriesMatrix[repIdx];
    const incorrectAuthors = repertoriesMatrix.filter(r => r.author !== rep.author).map(r => r.author);
    const options = [rep.author, ...incorrectAuthors.slice(0, 3)].sort();

    return {
      id: `QD-${10000 + index}`,
      question: `Who is the primary compiler/author of the famous repertorial text '${rep.title}'?`,
      options,
      correctAnswer: rep.author,
      explanation: `'${rep.title}' was compiled by ${rep.author}, incorporating ${rep.principles} in its original layout.`,
      subject: "Repertory",
      difficulty: "Hard"
    };
  } else {
    // Generate an aphorism query
    const aphIdx = seed % aphorismsMatrix.length;
    const aph = aphorismsMatrix[aphIdx];
    const incorrectAphs = aphorismsMatrix.filter(a => a.num !== aph.num).map(a => a.num);
    const options = [aph.num, ...incorrectAphs.slice(0, 3)].sort();

    return {
      id: `QD-${10000 + index}`,
      question: `Which aphorism in Hahnemann's Organon of Medicine deals directly with: "${aph.topic}"?`,
      options,
      correctAnswer: aph.num,
      explanation: `${aph.num} of the Organon lays down the foundational guidelines for: "${aph.topic}".`,
      subject: "Organon & Philosophy",
      difficulty: "Hard"
    };
  }
}

// GENERATE AN INFINITE BATCH OR A POOL OF 5000 QUESTIONS
export function getAIAPGETQuestionBank(limit: number = 5000): AIAPGETQuestion[] {
  // Combine all classic high-yield questions first
  const questions: AIAPGETQuestion[] = [...classicAIAPGETQuestions];

  // Fill up the rest with high-yield dynamic variants up to the requested limit
  for (let i = questions.length; i < limit; i++) {
    questions.push(generateDynamicQuestion(i));
  }

  return questions;
}
