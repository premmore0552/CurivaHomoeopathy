export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ImportantRemedy {
  name: string;
  id?: string; // Link to full materia medica
  keyIndications: string;
  modalities?: string;
  constitution?: string;
  potencyTips?: string;
}

export interface DifferentialDiagnosis {
  condition: string;
  distinguishingFeatures: string;
  slug?: string; // Link to canonical page
}

export interface InvestigationItem {
  name: string;
  findings: string;
  importance: string;
}

export interface Disease {
  id: string;
  name: string;
  slug: string;
  system: string;
  category: string;
  definition: string;
  simpleExplanation: string;
  examKeywords?: string[];
  
  epidemiology: {
    ageDistribution: string;
    sexDistribution: string;
    riskGroups: string[];
    publicHealthRelevance?: string;
  };

  etiology: {
    predisposingFactors: string[];
    precipitatingFactors: string[];
    riskFactors: string[];
  };

  pathophysiology: {
    steps: {
      title: string;
      description: string;
    }[];
  };

  classification?: {
    type: string;
    details: string | string[];
    table?: { headers: string[], rows: string[][] };
  };

  clinicalFeatures: {
    generalSymptoms: string[];
    localSymptoms: string[];
    constitutionalFeatures: string[];
    importantSigns?: string[];
    diseaseProgression?: string;
  };

  redFlags: string[];

  investigations: {
    screening?: InvestigationItem[];
    diagnostic?: InvestigationItem[];
    confirmatory?: InvestigationItem[];
    goldStandard?: InvestigationItem;
    laboratoryFindings?: InvestigationItem[];
  };

  diagnosticCriteria: {
    title: string;
    criteria: string[];
    interpretationPoints?: string[];
    pitfalls?: string[];
  };

  differentialDiagnosis: DifferentialDiagnosis[];

  complications: {
    common: string[];
    serious: string[];
    lifeThreatening: string[];
  };

  conventionalManagement: {
    general: string[];
    medical: string[];
    emergency?: string[];
    surgical?: string[];
    prevention: string[];
  };

  homoeopathicApproach: string;
  relatedRemedies: ImportantRemedy[];
  remedyDifferentials?: {
    remedy: string;
    differentiation: string;
  }[];
  
  clinicalCase?: {
    presentation: string;
    analysis: string;
    management: string;
  };

  relatedDiseases: string[]; // slugs
  relatedInvestigations?: string[];
  relatedConcepts?: string[];

  examPriority: 'High' | 'Medium' | 'Low';
  clinicalPriority: 'High' | 'Medium' | 'Low';
  emergencyLevel: 'None' | 'Alert' | 'Critical';

  quickRevisionBox: {
    keyNotes: string[];
    miasmaticDominance: string;
    thermalState: string;
    organAffinity: string;
    memoryMnemonic: string;
  };
  
  homoeopathicModule?: {
    medicalAssessment: {
      importanceOfDiagnosis: string;
      severityAssessment: string;
      referralCriteria: string[];
    };
    individualization: {
      mentalGenerals: string[];
      physicalGenerals: {
        thermalState: string;
        thirst: string;
        appetite: string;
        desires: string[];
        aversions: string[];
        sleep: string;
        perspiration: string;
      };
      modalities: string[];
      concomitants: string[];
      characteristicParticulars: string[];
    };
    characteristicFeatures: {
      peculiarSymptoms: string[];
      individualExpression: string;
    };
    repertorialStudy: {
      importantRubrics: { rubric: string; chapter: string }[];
      symptomAnalysis: string;
    };
  };

  mcqs?: MCQ[];
}

export const DISEASE_SYSTEMS = [
  { id: 'cardiovascular', name: 'Cardiovascular Diseases', icon: 'Heart', color: 'rose' },
  { id: 'respiratory', name: 'Respiratory Diseases', icon: 'Wind', color: 'sky' },
  { id: 'neurology', name: 'Neurological Diseases', icon: 'BrainCircuit', color: 'purple' },
  { id: 'gastrointestinal', name: 'Gastrointestinal Diseases', icon: 'UtensilsCrossed', color: 'emerald' },
  { id: 'hepatobiliary', name: 'Hepatobiliary Diseases', icon: 'Droplets', color: 'amber' },
  { id: 'renal-urinary', name: 'Renal & Urinary Diseases', icon: 'Layers', color: 'blue' },
  { id: 'hematology', name: 'Hematological Diseases', icon: 'Activity', color: 'red' },
  { id: 'endocrine-metabolic', name: 'Endocrine & Metabolic', icon: 'Sun', color: 'yellow' },
  { id: 'musculoskeletal-rheumatology', name: 'Musculoskeletal & Rheumatological', icon: 'Activity', color: 'orange' },
  { id: 'infectious', name: 'Infectious Diseases', icon: 'Syringe', color: 'green' },
  { id: 'dermatology', name: 'Dermatological Diseases', icon: 'Shield', color: 'pink' },
  { id: 'psychiatry', name: 'Psychiatric Conditions', icon: 'Ghost', color: 'indigo' },
  { id: 'ophthalmology', name: 'Ophthalmological Diseases', icon: 'Eye', color: 'cyan' },
  { id: 'ent', name: 'ENT Diseases', icon: 'Ear', color: 'teal' },
  { id: 'obstetrics', name: 'Obstetric Conditions', icon: 'Users', color: 'fuchsia' },
  { id: 'gynecology', name: 'Gynecological Diseases', icon: 'Users', color: 'purple' },
  { id: 'pediatrics', name: 'Pediatric Diseases', icon: 'Baby', color: 'blue' },
  { id: 'male-reproductive-urology', name: 'Male Reproductive & Urological', icon: 'Zap', color: 'slate' },
  { id: 'oncology', name: 'Oncology', icon: 'Dna', color: 'violet' },
  { id: 'emergencies', name: 'Medical Emergencies', icon: 'AlertTriangle', color: 'red' },
  { id: 'toxicology', name: 'Toxicology', icon: 'Skull', color: 'zinc' },
];

export const diseaseHubData: Disease[] = [
  {
    id: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    slug: "hypertension",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A chronic medical condition in which the blood pressure in the arteries is persistently elevated, typically defined as systolic BP ≥140 mmHg and/or diastolic BP ≥90 mmHg.",
    simpleExplanation: "Hypertension is when the force of your blood against your artery walls is too high. Often called the 'silent killer' because it usually has no symptoms but can lead to heart disease and stroke.",
    examKeywords: ["Silent Killer", "End-organ damage", "Primary vs Secondary", "ACE inhibitors"],
    epidemiology: {
      ageDistribution: "Prevalence increases with age; >60% in those over 60 years.",
      sexDistribution: "More common in men under 55, more common in women after menopause.",
      riskGroups: ["Obese individuals", "High salt consumers", "Sedentary lifestyles", "Family history"],
      publicHealthRelevance: "The single most important risk factor for cardiovascular mortality worldwide."
    },
    etiology: {
      predisposingFactors: ["Family history (Genetics)", "Ageing", "Race (higher in African populations)"],
      precipitatingFactors: ["High salt intake", "Alcohol consumption", "Chronic stress"],
      riskFactors: ["Diabetes mellitus", "Hyperlipidemia", "Obesity", "Smoking"]
    },
    pathophysiology: {
      steps: [
        { title: "Cardiac Output Increase", description: "Increased sympathetic activity or fluid retention increases the volume of blood pumped." },
        { title: "Peripheral Resistance", description: "Vasoconstriction of small arteries increases the resistance to blood flow." },
        { title: "RAAS Activation", description: "Renin-Angiotensin-Aldosterone System activation leads to sodium retention and further vasoconstriction." },
        { title: "Vascular Remodeling", description: "Chronic pressure leads to thickening of artery walls, further increasing resistance." }
      ]
    },
    classification: {
      type: "JNC 8 Classification",
      details: ["Normal: <120/80", "Pre-hypertension: 120-139 / 80-89", "Stage 1: 140-159 / 90-99", "Stage 2: ≥160 / ≥100"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Asymptomatic (Commonly)", "Occipital headache (Early morning)", "Dizziness"],
      localSymptoms: ["Palpitations", "Epistaxis (Nosebleeds)"],
      constitutionalFeatures: ["Fatigue", "Visual disturbances (blurred vision)"],
      importantSigns: ["Elevated BP readings", "Forceful apex beat", "Retinal changes (Arteriolar narrowing)"],
      diseaseProgression: "Often silent for years → End organ damage (Heart, Brain, Kidney, Eyes)."
    },
    redFlags: [
      "Systolic BP >180 or Diastolic >120 (Hypertensive Crisis)",
      "Sudden severe headache",
      "Chest pain or dyspnea",
      "Neurological deficits (Confusion, Weakness)"
    ],
    investigations: {
      screening: [{ name: "BP Measurement", findings: "Repeated high readings", importance: "Primary Screen" }],
      laboratoryFindings: [
        { name: "Urinalysis", findings: "Proteinuria", importance: "Detects renal damage" },
        { name: "Serum Creatinine", findings: "Elevated", importance: "Assesses kidney function" },
        { name: "ECG", findings: "Left Ventricular Hypertrophy (LVH)", importance: "Detects heart damage" }
      ]
    },
    diagnosticCriteria: {
      title: "Diagnostic Standard",
      criteria: ["Average of ≥2 properly measured BP readings on ≥2 office visits", "Home BP monitoring (HBPM) or Ambulatory BP monitoring (ABPM)"]
    },
    differentialDiagnosis: [
      { condition: "White Coat Hypertension", distinguishingFeatures: "High BP in clinic, normal at home." },
      { condition: "Secondary Hypertension", distinguishingFeatures: "Renal artery stenosis, Phaeochromocytoma, Cushing's." }
    ],
    complications: {
      common: ["Left Ventricular Hypertrophy", "Atherosclerosis"],
      serious: ["Ischemic Stroke", "Chronic Kidney Disease"],
      lifeThreatening: ["Aortic Dissection", "Myocardial Infarction"]
    },
    conventionalManagement: {
      general: ["DASH Diet (High fruit/veg, low salt)", "Weight reduction", "Regular aerobic exercise"],
      medical: ["Diuretics (Thiazides)", "ACE Inhibitors/ARBs", "Calcium Channel Blockers", "Beta-blockers"],
      prevention: ["Salt restriction (<6g/day)", "Limiting alcohol", "Smoking cessation"]
    },
    homoeopathicApproach: "Treats the individual with hypertension as a whole, focusing on the miasmatic background (Psora-Sycosis) and the 'personality' that predisposes to vascular tension.",
    relatedRemedies: [
      {
        name: "Glonoinum",
        keyIndications: "Sudden surges of blood to head, pulsating headache, cannot bear anything on head.",
        modalities: "Agg: Sun, heat. Amel: Uncovering head.",
        constitution: "Full-blooded, plethoric individuals.",
        potencyTips: "3X or 6C in acute surges."
      },
      {
        name: "Baryta Muriatica",
        keyIndications: "Hypertension in elderly with arteriosclerosis; high systolic pressure with low diastolic.",
        modalities: "Agg: Cold. Amel: Warmth.",
        constitution: "Elderly, dwarfish mentally or physically.",
        potencyTips: "3X."
      },
      {
        name: "Natrum Mur",
        keyIndications: "Hypertension related to high salt intake and emotional suppression.",
        modalities: "Agg: Sun, 10-11 AM. Amel: Open air.",
        constitution: "Reserved, sensitive, salt-craving.",
        potencyTips: "200C to 1M."
      }
    ],
    relatedDiseases: ["ischemic-heart-disease", "chronic-kidney-disease"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Silent Killer", "Occipital morning headache", "JNC 8 Guidelines"],
      miasmaticDominance: "Psora-Sycosis",
      thermalState: "Variable",
      organAffinity: "Heart, Arteries, Kidneys",
      memoryMnemonic: "S-I-L-E-N-T: Salt, Intake, Lifestyle, Exercise, Nutrition, Tension."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Crucial for identifying Stage 1 vs Stage 2 and detecting asymptomatic target organ damage.",
        severityAssessment: "Determined by BP levels and Presence/Absence of Complications (e.g., Fundal changes, Proteinuria).",
        referralCriteria: ["Accelerated or Malignant Hypertension", "Signs of encephalopathy", "Sudden vision loss"]
      },
      individualization: {
        mentalGenerals: ["Suppressed anger (Staphysagria)", "Anticipatory anxiety (Arg-n)", "Hurry and impatience (Nux-v)"],
        physicalGenerals: {
          thermalState: "Variable",
          thirst: "Craving for cold water (Phosphorus)",
          appetite: "Desire for salt (Nat-m), fats (Nit-ac)",
          desires: ["Salt", "Fresh air", "Cold drinks"],
          aversions: ["Enclosed spaces", "Consolation"],
          sleep: "Disturbed by palpitations",
          perspiration: "Profuse, especially on head (Calc-c)"
        },
        modalities: ["Agg: Stress, Sun, Noise", "Amel: Rest, Dark room, Cold application (head)"],
        concomitants: ["Vertigo", "Epistaxis", "Albuminuria"],
        characteristicParticulars: ["Full, bounding, hard pulse", "Visible pulsations of carotids"]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Headache relieved by a nosebleed (Melilotus)"],
        individualExpression: "One patient feels a sense of bursting in the head, while another feels a heavy band around the forehead."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Generalities - HYPERTENSION", chapter: "Generalities" },
          { rubric: "Head - PAIN - pulsating", chapter: "Head" }
        ],
        symptomAnalysis: "Totality based on Temperament, Thermal reactions, and Miasmatic tendencies."
      }
    }
  },
  {
    id: "hypertensive-emergency",
    name: "Hypertensive Emergency",
    slug: "hypertensive-emergency",
    system: "cardiovascular",
    category: "Emergency",
    definition: "A severe elevation in blood pressure (usually >180/120 mmHg) associated with evidence of new or progressive end-organ damage (e.g., encephalopathy, MI, pulmonary edema).",
    simpleExplanation: "This is a medical emergency where very high blood pressure is actively damaging organs like the brain, heart, or kidneys. It requires immediate hospital treatment.",
    examKeywords: ["Target organ damage", "Encephalopathy", "IV antihypertensives", "BP reduction rate"],
    epidemiology: {
      ageDistribution: "More common in elderly patients with chronic hypertension.",
      sexDistribution: "Slightly higher prevalence in men.",
      riskGroups: ["Non-compliant hypertensive patients", "Patients with secondary causes", "Cocaine users"],
      publicHealthRelevance: "Critical condition with high short-term mortality if untreated."
    },
    etiology: {
      predisposingFactors: ["Chronic uncontrolled hypertension", "Renovascular disease"],
      precipitatingFactors: ["Abrupt cessation of meds", "Sympathomimetic drugs", "Preeclampsia/Eclampsia"],
      riskFactors: ["Lack of primary care", "Substance abuse", "Renal failure"]
    },
    pathophysiology: {
      steps: [
        { title: "Abrupt BP Rise", description: "A sudden increase in systemic vascular resistance." },
        { title: "Endothelial Injury", description: "Mechanical stress leads to damage of the vessel lining." },
        { title: "Fibrinoid Necrosis", description: "Deposition of fibrin in the vessel walls leading to ischemia." },
        { title: "Organ Dysfunction", description: "Ischemia leads to acute failure of the heart, brain, or kidneys." }
      ]
    },
    classification: {
      type: "Clinical Classification",
      details: ["Hypertensive Emergency: End-organ damage present", "Hypertensive Urgency: No end-organ damage yet"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Severe headache", "Confusion", "Chest pain"],
      localSymptoms: ["Blurred vision (Retinopathy)", "Dyspnea (Heart failure)"],
      constitutionalFeatures: ["Nausea", "Vomiting", "Altered mental status"],
      importantSigns: ["BP >180/120", "Papilledema", "Crackles in lungs", "Neurological deficits"],
      diseaseProgression: "Rapidly leads to stroke, heart attack, or renal failure if not controlled."
    },
    redFlags: [
      "Altered mental status / Seizures",
      "Chest pain / Back pain",
      "New onset oliguria (low urine)",
      "Vision loss"
    ],
    investigations: {
      diagnostic: [
        { name: "Fundoscopy", findings: "Papilledema, hemorrhages", importance: "Detects encephalopathy" },
        { name: "CT Brain", findings: "Hemorrhage or edema", importance: "Rules out stroke" }
      ],
      goldStandard: { name: "Clinical BP + Organ Assessment", findings: "BP >180/120 + organ damage", importance: "Definitive diagnosis" },
      laboratoryFindings: [
        { name: "Serum Creatinine", findings: "Acute rise", importance: "Detects acute kidney injury" },
        { name: "Troponin", findings: "Elevated", importance: "Detects cardiac injury" }
      ]
    },
    diagnosticCriteria: {
      title: "Diagnostic Standard",
      criteria: ["BP >180/120 mmHg", "Presence of acute target organ damage"]
    },
    differentialDiagnosis: [
      { condition: "Ischemic Stroke", distinguishingFeatures: "Focal deficits without necessarily high BP." },
      { condition: "Aortic Dissection", distinguishingFeatures: "Severe tearing back pain." },
      { condition: "Pheochromocytoma", distinguishingFeatures: "Paroxysmal HTN, sweating, palpitations." }
    ],
    complications: {
      common: ["Acute Kidney Injury"],
      serious: ["Intracerebral Hemorrhage", "Acute Pulmonary Edema"],
      lifeThreatening: ["Aortic Dissection", "Encephalopathy", "Myocardial Infarction"]
    },
    conventionalManagement: {
      general: ["Admission to ICU", "Continuous BP monitoring"],
      medical: ["IV Nitroprusside", "IV Labetalol", "IV Nicardipine"],
      emergency: ["Gradual BP reduction (20-25% in first hour) to avoid cerebral ischemia."],
      prevention: ["Strict adherence to chronic BP meds"]
    },
    homoeopathicApproach: "Homoeopathy in hypertensive emergency is strictly an adjuvant to emergency medical care. Remedies like Aconite and Glonoinum can be used to manage extreme anxiety and cerebral congestion respectively while the patient is under intensive monitoring.",
    relatedRemedies: [
      {
        name: "Aconitum Napellus",
        id: "aconite",
        keyIndications: "Sudden onset after cold exposure/fright, intense fear of death, bounding pulse.",
        modalities: "Agg: Night, cold wind.",
        potencyTips: "200C repeated frequently."
      },
      {
        name: "Glonoinum",
        id: "glonoinum",
        keyIndications: "Extreme congestion to head, visible carotid pulsations, head feels too large.",
        modalities: "Agg: Sun, heat.",
        potencyTips: "3C or 30C."
      }
    ],
    relatedDiseases: ["hypertension", "myocardial-infarction"],
    examPriority: "Medium",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["BP >180/120 + TOD", "Lower BP gradually", "Fundoscopy is key"],
      miasmaticDominance: "Syphilitic",
      thermalState: "Hot and congested",
      organAffinity: "Brain, Heart, Retina",
      memoryMnemonic: "H-E-L-P: High BP, End-organ damage, Lower BP slowly, Papilledema."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to differentiate from hypertensive urgency to decide on the level of care (ICU vs Ward) and route of medication (IV vs Oral).",
        severityAssessment: "Based on the specific organ failing (e.g., neurological vs cardiac vs renal).",
        referralCriteria: ["ANY Hypertensive Emergency requires immediate referral to a Tertiary Care Hospital with ICU."]
      },
      individualization: {
        mentalGenerals: ["Panic and extreme anxiety (Aconite)", "Confusion and delirium (Belladonna)"],
        physicalGenerals: {
          thermalState: "Hot, burning sensation.",
          thirst: "Burning thirst (Aconite).",
          appetite: "N/A (Emergency state).",
          desires: ["Fresh air"],
          aversions: ["Light", "Heat"],
          sleep: "Drowsy (encephalopathy) or extremely restless.",
          perspiration: "Hot, steaming sweat."
        },
        modalities: ["Agg: Heat, Motion, Light", "Amel: Quiet, Semi-fowler's position"],
        concomitants: ["Seizures", "Vomiting", "Severe chest pain"],
        characteristicParticulars: ["Throbbing carotids", "Red, flushed face."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Fear of death, predicts the time of death (Aconite)"],
        individualExpression: "The state of the patient is one of 'vascular explosion', where the vital force is struggling against intense internal pressure."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Generalities - HYPERTENSION - crisis", chapter: "Generalities" },
          { rubric: "Head - CONGESTION - accompanied by - hypertension", chapter: "Head" }
        ],
        symptomAnalysis: "Focus on 'Acute totality' and 'Emergency presentation' for supportive remedies."
      }
    }
  },
  {
    id: "hypotension",
    name: "Hypotension",
    slug: "hypotension",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A state of low blood pressure, generally defined as systolic BP <90 mmHg and/or diastolic BP <60 mmHg.",
    simpleExplanation: "Low blood pressure is when the pressure of blood flowing through your arteries is lower than normal. It can cause dizziness or fainting if the brain doesn't get enough blood.",
    examKeywords: ["Shock", "Vasovagal", "Syncope", "Fluid resuscitation"],
    epidemiology: {
      ageDistribution: "Common in young women (constitutional) and elderly (orthostatic).",
      sexDistribution: "More frequent in young, lean females.",
      riskGroups: ["Dehydrated patients", "Patients on BP meds", "Pregnant women"],
      publicHealthRelevance: "Often benign unless symptomatic or associated with shock."
    },
    etiology: {
      predisposingFactors: ["Constitutional thinness", "Pregnancy", "Endocrine disorders (Addison's)"],
      precipitatingFactors: ["Dehydration", "Acute blood loss", "Severe infection (Sepsis)"],
      riskFactors: ["Bed rest", "Medications (Diuretics, Nitrates)", "Autonomic neuropathy"]
    },
    pathophysiology: {
      steps: [
        { title: "Reduced Volume/Output", description: "Loss of blood or fluid reduces the volume the heart can pump." },
        { title: "Vasodilation", description: "Arteries relax too much, lowering the pressure." },
        { title: "Compensatory Failure", description: "The heart and vessels fail to tighten enough to maintain pressure." }
      ]
    },
    classification: {
      type: "Clinical Forms",
      details: ["Constitutional (Normal for individual)", "Orthostatic (On standing)", "Postprandial (After meals)", "Acute/Shock-related"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Dizziness", "Lightheadedness", "Fainting (Syncope)"],
      localSymptoms: ["Cold extremities", "Pale skin"],
      constitutionalFeatures: ["Fatigue", "Lack of concentration", "Blurred vision"],
      importantSigns: ["SBP <90 mmHg", "Weak, thready pulse", "Delayed capillary refill"],
      diseaseProgression: "Benign in most → Syncope/Falls → Shock (if etiology is severe)."
    },
    redFlags: [
      "Confusion or altered consciousness",
      "Cold, clammy skin",
      "Rapid, shallow breathing",
      "Chest pain"
    ],
    investigations: {
      diagnostic: [
        { name: "Orthostatic BP", findings: "Drop on standing", importance: "Detects orthostatic form" },
        { name: "ECG", findings: "Arrhythmias or MI", importance: "Rules out cardiac cause" }
      ],
      goldStandard: { name: "Manual BP Measurement", findings: "<90/60 mmHg", importance: "Confirms low pressure" },
      laboratoryFindings: [
        { name: "CBC", findings: "Low hemoglobin", importance: "Detects anemia/hemorrhage" },
        { name: "Electrolytes", findings: "Abnormal sodium/potassium", importance: "Detects dehydration/Addison's" }
      ]
    },
    diagnosticCriteria: {
      title: "Diagnostic Standard",
      criteria: ["SBP <90 mmHg and/or DBP <60 mmHg consistently or symptomatically"]
    },
    differentialDiagnosis: [
      { condition: "Anemia", distinguishingFeatures: "Paleness but BP may be normal." },
      { condition: "Hypoglycemia", distinguishingFeatures: "Sweating, hunger, low blood sugar." },
      { condition: "Vasovagal Syncope", distinguishingFeatures: "Brief episode triggered by pain/fright." }
    ],
    complications: {
      common: ["Falls and injuries"],
      serious: ["Syncope", "Kidney damage (from low perfusion)"],
      lifeThreatening: ["Organ failure (Shock)"]
    },
    conventionalManagement: {
      general: ["Increased salt and water intake", "Compression stockings", "Rising slowly"],
      medical: ["Midodrine", "Fludrocortisone"],
      emergency: ["IV fluids", "Vasopressors (in shock)"],
      prevention: ["Avoiding dehydration", "Reviewing BP meds"]
    },
    homoeopathicApproach: "Hypotension is often addressed through constitutional remedies that improve 'vital tone'. In acute syncopal attacks, remedies like Carbo Veg (the 'corpse reviver') are legendary.",
    relatedRemedies: [
      {
        name: "Carbo Vegetabilis",
        id: "carbo-veg",
        keyIndications: "Collapsed state, cold skin, wants to be fanned, blue skin (cyanosis).",
        modalities: "Amel: Fanning, eructations.",
        potencyTips: "200C or 1M."
      },
      {
        name: "China (Cinchona)",
        id: "china",
        keyIndications: "Hypotension after loss of vital fluids (blood, sweat, diarrhea).",
        modalities: "Agg: Touch, draft of air. Amel: Hard pressure.",
        potencyTips: "30C."
      },
      {
        name: "Gelsemium",
        id: "gelsemium",
        keyIndications: "Dullness, dizziness, drowsiness; pulse slow and weak.",
        modalities: "Agg: Bad news, emotion.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["shock", "orthostatic-hypotension", "anemia"],
    examPriority: "Medium",
    clinicalPriority: "Medium",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["SBP <90", "Dizziness", "Fluid intake is key"],
      miasmaticDominance: "Psora-Syphilis",
      thermalState: "Cold, chilly",
      organAffinity: "Vasomotor system",
      memoryMnemonic: "L-O-W: Lack of volume, Outflow obstruction, Weak heart."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Essential to determine if the low BP is a normal variant or a sign of an underlying serious condition like Addison's or heart failure.",
        severityAssessment: "Based on symptoms of poor perfusion (confusion, low urine, cold skin).",
        referralCriteria: ["Hypotension with tachycardia (Shock)", "Syncope with chest pain", "Persistent low BP with confusion"]
      },
      individualization: {
        mentalGenerals: ["Apathy and indifference (Carbo-v)", "Anxiety about health", "Dullness (Gelsemium)"],
        physicalGenerals: {
          thermalState: "Chilly, cold extremities.",
          thirst: "Thirst for cold water (China) or thirstless.",
          appetite: "Poor; desires salt.",
          desires: ["Salt", "Warmth", "Fanning (Carbo-v)"],
          aversions: ["Food", "Movement"],
          sleep: "Drowsy, unrefreshing.",
          perspiration: "Cold, clammy sweat."
        },
        modalities: ["Agg: Standing, Heat, Loss of fluids", "Amel: Lying down, Elevation of legs"],
        concomitants: ["Tinnitus", "Blurred vision", "Pale face"],
        characteristicParticulars: ["Pulse is weak, thready, or slow."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Patient feels better when fanned from a distance (Carbo-v)"],
        individualExpression: "The 'laxity' of the vascular system is often mirrored in the patient's general lack of stamina or 'flabby' constitution."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Generalities - HYPOTENSION", chapter: "Generalities" },
          { rubric: "Generalities - COLLAPSE", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on 'Etiology' (loss of fluids, emotion) and 'Concomitants' (coldness, cyanosis) for selection."
      }
    }
  },
  {
    id: "orthostatic-hypotension",
    name: "Orthostatic Hypotension",
    slug: "orthostatic-hypotension",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A drop in blood pressure that occurs upon standing, specifically a decrease in systolic BP ≥20 mmHg or diastolic BP ≥10 mmHg within 3 minutes of standing.",
    simpleExplanation: "This is a sudden fall in blood pressure that happens when you stand up. It can make you feel dizzy or even cause you to faint because the brain isn't getting enough blood for a moment.",
    examKeywords: ["Postural drop", "Tilt-table test", "Autonomic failure", "Fluid depletion"],
    epidemiology: {
      ageDistribution: "Much more common in the elderly (up to 20%).",
      sexDistribution: "Equal distribution.",
      riskGroups: ["Elderly", "Diabetics", "Parkinson's patients"],
      publicHealthRelevance: "A major cause of falls and fractures in the geriatric population."
    },
    etiology: {
      predisposingFactors: ["Autonomic dysfunction", "Aging (reduced baroreflex sensitivity)"],
      precipitatingFactors: ["Standing up quickly", "Large meals", "Hot baths"],
      riskFactors: ["Dehydration", "Diuretics", "Antidepressants", "Diabetes"]
    },
    pathophysiology: {
      steps: [
        { title: "Gravity Shift", description: "500-1000 mL of blood pools in the lower extremities upon standing." },
        { title: "Venous Return Drop", description: "Decreased blood returns to the heart, lowering stroke volume." },
        { title: "Baroreflex Failure", description: "The body fails to constrict vessels or increase heart rate quickly enough." },
        { title: "Cerebral Hypoperfusion", description: "The brain receives less blood, causing symptoms." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["Lightheadedness upon standing", "Blurred vision", "Weakness"],
      localSymptoms: ["None specific"],
      constitutionalFeatures: ["Syncope (Fainting)", "Neck/shoulder pain ('Coat-hanger' headache)"],
      importantSigns: ["SBP drop ≥20 mmHg on standing", "DBP drop ≥10 mmHg on standing"],
      diseaseProgression: "Episodic → Chronic disability → Falls/Trauma."
    },
    redFlags: [
      "Frequent falls",
      "Syncope without warning",
      "Chest pain on standing"
    ],
    investigations: {
      diagnostic: [
        { name: "Orthostatic BP Measurement", findings: "≥20/10 mmHg drop", importance: "Primary diagnostic test" },
        { name: "Tilt Table Test", findings: "Symptomatic BP drop", importance: "Used if office test is unclear" }
      ],
      goldStandard: { name: "Manual BP (Supine vs Standing)", findings: "Positive drop", importance: "Clinical Gold Standard" },
      laboratoryFindings: [
        { name: "HbA1c", findings: "Elevated", importance: "Checks for diabetic neuropathy" },
        { name: "BUN/Creatinine", findings: "Elevated ratio", importance: "Checks for dehydration" }
      ]
    },
    diagnosticCriteria: {
      title: "Diagnostic Standard",
      criteria: ["SBP decrease of ≥20 mmHg or DBP decrease of ≥10 mmHg within 3 minutes of standing from a supine position."]
    },
    differentialDiagnosis: [
      { condition: "Vasovagal Syncope", distinguishingFeatures: "Prodrome of sweating/nausea, triggered by pain." },
      { condition: "Carotid Sinus Hypersensitivity", distinguishingFeatures: "Triggered by neck movement/tight collars." },
      { condition: "Cardiac Arrhythmia", distinguishingFeatures: "Palpitations, occur regardless of posture." }
    ],
    complications: {
      common: ["Falls", "Fractures (Hip, wrist)"],
      serious: ["Syncope", "TBI from falls"],
      lifeThreatening: ["Rare unless associated with severe underlying disease."]
    },
    conventionalManagement: {
      general: ["Rising in stages", "Increased salt/water intake", "Waist-high compression stockings"],
      medical: ["Midodrine", "Fludrocortisone", "Pyridostigmine"],
      emergency: ["Immediate supine position with legs elevated"],
      prevention: ["Small frequent meals", "Avoiding hot environments"]
    },
    homoeopathicApproach: "Focuses on the 'constitutional weakness' and the autonomic instability. Remedies that address vertigo and vascular tone are prioritized.",
    relatedRemedies: [
      {
        name: "Conium Maculatum",
        id: "conium",
        keyIndications: "Vertigo when turning in bed or rising; feels as if the room is turning.",
        modalities: "Agg: Turning head, rising.",
        potencyTips: "30C or 200C."
      },
      {
        name: "Pulsatilla",
        id: "pulsatilla",
        keyIndications: "Vertigo on rising, feels better in open air; chilly but wants fresh air.",
        modalities: "Amel: Open air.",
        potencyTips: "30C."
      },
      {
        name: "Lycopodium",
        id: "lycopodium",
        keyIndications: "Faintness in the evening or after eating; related to digestive weakness.",
        modalities: "Agg: 4-8 PM.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["hypotension", "diabetes"],
    examPriority: "Medium",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["20/10 mmHg drop", "Common in elderly", "Dehydration risk"],
      miasmaticDominance: "Psora",
      thermalState: "Variable",
      organAffinity: "Autonomic Nervous System",
      memoryMnemonic: "S-T-A-N-D: Standing triggers it, Tilt-table test, Autonomic failure, Nutrition (salt), Dehydration."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Crucial in the elderly to prevent falls, which are a major cause of morbidity and loss of independence.",
        severityAssessment: "Based on the frequency of syncope and the degree of BP drop.",
        referralCriteria: ["Recurrent syncope leading to injury", "Suspected underlying neurological disorder (e.g., MSA)"]
      },
      individualization: {
        mentalGenerals: ["Fear of falling", "Mental confusion on rising"],
        physicalGenerals: {
          thermalState: "Variable.",
          thirst: "Varies; often dehydrated.",
          appetite: "Postprandial aggravation.",
          desires: ["Salt", "Open air"],
          aversions: ["Hot rooms"],
          sleep: "Drowsiness after meals.",
          perspiration: "Cold sweat during dizzy spells."
        },
        modalities: ["Agg: Rising from bed, Standing still, Hot baths", "Amel: Lying down, Motion (walking)"],
        concomitants: ["Vertigo", "Blurred vision", "Nausea"],
        characteristicParticulars: ["Weakness in legs on standing."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Vertigo when turning the head, especially to the left (Conium)"],
        individualExpression: "The patient feels 'disconnected' or 'unstable' in their relationship with gravity."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Vertigo - RISING, from - bed, from", chapter: "Vertigo" },
          { rubric: "Generalities - HYPOTENSION - orthostatic", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on the 'Modality of rising' and 'Concomitant vertigo' symptoms."
      }
    }
  },
  {
    id: "ischemic-heart-disease",
    name: "Ischemic Heart Disease (IHD)",
    slug: "ischemic-heart-disease",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A condition characterized by reduced blood supply to the heart muscle, usually due to coronary artery disease (atherosclerosis). It encompasses stable angina, unstable angina, and MI.",
    simpleExplanation: "IHD is when the heart muscle doesn't get enough oxygen-rich blood because the arteries that supply the heart are narrowed or blocked by fatty deposits (plaque).",
    examKeywords: ["Atherosclerosis", "Angina", "Myocardial Ischemia", "Coronary arteries"],
    epidemiology: {
      ageDistribution: "Increases with age; very common after 45 (men) and 55 (women).",
      sexDistribution: "Higher in men; women's risk equals men after menopause.",
      riskGroups: ["Smokers", "Diabetics", "Hypertensive patients", "Sedentary individuals"],
      publicHealthRelevance: "Leading cause of death globally."
    },
    etiology: {
      predisposingFactors: ["Family history of premature CAD", "Age", "Male gender"],
      precipitatingFactors: ["Exertion", "Emotion", "Heavy meals", "Cold weather (for angina)"],
      riskFactors: ["Smoking", "Hyperlipidemia (High LDL)", "Hypertension", "Diabetes", "Obesity"]
    },
    pathophysiology: {
      steps: [
        { title: "Endothelial Injury", description: "Chronic stress (smoking, high BP) damages the vessel lining." },
        { title: "Plaque Formation", description: "Cholesterol and inflammatory cells build up (Atherosclerosis)." },
        { title: "Lumen Narrowing", description: "The artery becomes too narrow to provide enough blood during exertion." },
        { title: "Ischemia", description: "Demand for oxygen exceeds supply, causing pain or dysfunction." }
      ]
    },
    classification: {
      type: "Clinical Spectrum",
      details: ["Chronic Stable Angina", "Acute Coronary Syndrome (Unstable Angina, NSTEMI, STEMI)", "Silent Ischemia", "Heart Failure (Ischemic Cardiomyopathy)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Chest pain (Angina)", "Shortness of breath (Dyspnea)"],
      localSymptoms: ["Retrosternal pressure/heaviness", "Radiation to jaw, neck, left arm"],
      constitutionalFeatures: ["Fatigue", "Sweating during episodes"],
      importantSigns: ["Fourth heart sound (S4)", "Evidence of peripheral vascular disease", "Xanthelasma (eye yellow spots)"],
      diseaseProgression: "Stable → Unstable → Myocardial Infarction → Heart Failure."
    },
    redFlags: [
      "Chest pain at rest",
      "Increasing frequency of angina",
      "Pain associated with vomiting or sweating",
      "Syncope"
    ],
    investigations: {
      diagnostic: [
        { name: "Resting ECG", findings: "ST depression or T inversion", importance: "Baseline check" },
        { name: "Stress Test (TMT)", findings: "Ischemic changes on exertion", importance: "Confirms inducible ischemia" }
      ],
      goldStandard: { name: "Coronary Angiography", findings: "Arterial stenosis/blockage", importance: "Definitive visualization" },
      laboratoryFindings: [
        { name: "Lipid Profile", findings: "High LDL, Low HDL", importance: "Risk assessment" },
        { name: "HbA1c", findings: "Elevated", importance: "Detects diabetes risk" }
      ]
    },
    diagnosticCriteria: {
      title: "Diagnostic Standard",
      criteria: ["History of typical angina", "ECG evidence of ischemia (ST changes)", "Positive Stress Test or Angiography"]
    },
    differentialDiagnosis: [
      { condition: "GERD", distinguishingFeatures: "Related to food, burning sensation, better with antacids." },
      { condition: "Musculoskeletal Pain", distinguishingFeatures: "Tenderness on chest wall, better with position change." },
      { condition: "Anxiety", distinguishingFeatures: "Palpitations, hyperventilation, clear ECG." }
    ],
    complications: {
      common: ["Stable Angina"],
      serious: ["Heart Failure", "Arrhythmias"],
      lifeThreatening: ["Myocardial Infarction", "Sudden Cardiac Death"]
    },
    conventionalManagement: {
      general: ["Lifestyle modification (smoking, diet, exercise)", "Stress management"],
      medical: ["Antiplatelets (Aspirin)", "Statins", "Beta-blockers", "Nitrates"],
      surgical: ["Angioplasty (PCI)", "Bypass Surgery (CABG)"],
      prevention: ["Controlling risk factors (BP, Diabetes)"]
    },
    homoeopathicApproach: "Homoeopathy works on the 'vascular personality' and miasmatic susceptibility. It aims to reduce the frequency of anginal attacks and slow the progression of atherosclerosis.",
    relatedRemedies: [
      {
        name: "Cactus Grandiflorus",
        id: "cactus",
        keyIndications: "Sensation of an iron band constricting the heart; palpitations worse lying on left side.",
        potencyTips: "Q or 30C."
      },
      {
        name: "Arnica Montana",
        id: "arnica",
        keyIndications: "Heart feels bruised and sore; pain after physical strain or trauma.",
        potencyTips: "200C."
      },
      {
        name: "Aurum Metallicum",
        id: "aurum",
        keyIndications: "Ischemic heart disease with depression and high blood pressure; 'heart-heavy' sensation.",
        potencyTips: "200C or 1M."
      }
    ],
    relatedDiseases: ["stable-angina", "myocardial-infarction", "hypertension"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Atherosclerosis is cause", "Supply-demand mismatch", "Risk factors are key"],
      miasmaticDominance: "Syphilitic (Atherosclerosis)",
      thermalState: "Variable",
      organAffinity: "Coronary Arteries",
      memoryMnemonic: "A-B-C-D-E: Aspirin/Anti-anginals, Beta-blockers/BP, Cigarettes/Cholesterol, Diet/Diabetes, Education/Exercise."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Essential to differentiate stable from unstable patterns to prevent imminent MI.",
        severityAssessment: "Based on NYHA or CCS functional classification of angina.",
        referralCriteria: ["Unstable pattern (pain at rest)", "Pain not relieved by rest or nitrates", "New onset severe dyspnea"]
      },
      individualization: {
        mentalGenerals: ["Anxiety about the heart", "Depression (Aurum)", "Irritability from pain"],
        physicalGenerals: {
          thermalState: "Often chilly.",
          thirst: "Varies.",
          appetite: "Desire for rich foods (predisposing).",
          desires: ["Fresh air", "Silence"],
          aversions: ["Tight clothing", "Exertion"],
          sleep: "Inability to lie on left side.",
          perspiration: "Cold sweat during episodes."
        },
        modalities: ["Agg: Exertion, Emotion, Cold air, Heavy meals", "Amel: Rest, Nitroglycerin, Fresh air"],
        concomitants: ["Numbness of left arm", "Dyspnea", "Gastrointestinal symptoms"],
        characteristicParticulars: ["Sensation of constriction or heaviness."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Pain in the heart, as if it were squeezed by an iron hand (Cactus)"],
        individualExpression: "The patient's 'angina' is often an expression of their inability to cope with life's 'pressures', both physical and emotional."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - PAIN - Heart - angina pectoris", chapter: "Chest" },
          { rubric: "Generalities - ARTERIOSCLEROSIS", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on the 'Character of pain' and the 'Modalities of exertion' for remedy selection."
      }
    }
  },
  {
    id: "stable-angina",
    name: "Stable Angina",
    slug: "stable-angina",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A predictable pattern of chest pain or discomfort that occurs with physical exertion or emotional stress and is relieved by rest or sublingual nitroglycerin.",
    simpleExplanation: "Stable angina is heart-related chest pain that happens when your heart works harder (like when you're exercising) but goes away when you rest. It's a sign that your heart isn't getting quite enough blood through narrowed arteries.",
    examKeywords: ["Predictable", "Exertion-related", "Relieved by rest", "ST depression"],
    epidemiology: {
      ageDistribution: "Common in older adults (>50 years).",
      sexDistribution: "Higher prevalence in men.",
      riskGroups: ["Long-term smokers", "Patients with metabolic syndrome"],
      publicHealthRelevance: "A major indicator of underlying coronary artery disease."
    },
    etiology: {
      predisposingFactors: ["Atherosclerosis (Stable plaque)"],
      precipitatingFactors: ["Physical activity", "Emotional stress", "Cold weather", "Large meals"],
      riskFactors: ["Hypertension", "Hyperlipidemia", "Diabetes", "Smoking"]
    },
    pathophysiology: {
      steps: [
        { title: "Fixed Stenosis", description: "A stable atherosclerotic plaque narrows the coronary artery." },
        { title: "Increased Demand", description: "Exercise or stress increases the heart's need for oxygen." },
        { title: "Ischemia", description: "The narrowed artery cannot meet the demand, leading to anaerobic metabolism." },
        { title: "Pain (Angina)", description: "Metabolic byproducts (lactic acid) stimulate pain receptors." }
      ]
    },
    classification: {
      type: "Canadian Cardiovascular Society (CCS)",
      details: ["Class I: Only with strenuous activity", "Class II: Slight limitation (walking uphill)", "Class III: Marked limitation (walking on flat ground)", "Class IV: At rest or with minimal activity"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Chest pressure, heaviness, or squeezing"],
      localSymptoms: ["Retrosternal location", "Radiation to neck, jaw, shoulders, or arms"],
      constitutionalFeatures: ["Dyspnea", "Nausea (rare)"],
      importantSigns: ["Often normal at rest", "Transient S4 during episode"],
      diseaseProgression: "Can remain stable for years or transition to Unstable Angina/MI."
    },
    redFlags: [
      "Pain occurring at rest",
      "Pain lasting >10 minutes",
      "Increasing severity or frequency"
    ],
    investigations: {
      diagnostic: [
        { name: "Stress ECG (TMT)", findings: "ST-segment depression >1mm", importance: "Confirms inducible ischemia" },
        { name: "Stress Echocardiogram", findings: "Wall motion abnormalities", importance: "More specific than TMT" }
      ],
      goldStandard: { name: "Coronary Angiography", findings: "Significant stenosis (>70%)", importance: "Defines anatomy" },
      laboratoryFindings: [
        { name: "Troponin", findings: "Normal", importance: "Differentiates from MI" }
      ]
    },
    diagnosticCriteria: {
      title: "Clinical Diagnosis",
      criteria: ["Typical clinical history", "Relief with Nitroglycerin", "Objective evidence of ischemia on stress testing"]
    },
    differentialDiagnosis: [
      { condition: "Esophageal Spasm", distinguishingFeatures: "Better with Nitroglycerin (confusing), but often related to swallowing." },
      { condition: "Cervical Spondylosis", distinguishingFeatures: "Pain related to neck movement, localized tenderness." },
      { condition: "Biliary Colic", distinguishingFeatures: "Pain in right upper quadrant, radiates to right shoulder." }
    ],
    complications: {
      common: ["Reduced exercise tolerance"],
      serious: ["Myocardial Infarction"],
      lifeThreatening: ["Sudden Cardiac Death"]
    },
    conventionalManagement: {
      general: ["Rest when pain occurs", "Weight loss", "Smoking cessation"],
      medical: ["Nitroglycerin (for acute attacks)", "Beta-blockers", "Aspirin", "Statins"],
      surgical: ["PCI/Stents if symptoms are refractory"],
      prevention: ["Exercise training", "DASH diet"]
    },
    homoeopathicApproach: "Aims to improve the coronary reserve and reduce the sensitivity to triggers. Remedies are chosen based on the character of pain and the emotional state of the patient.",
    relatedRemedies: [
      {
        name: "Bryonia Alba",
        id: "bryonia",
        keyIndications: "Stitching pain in heart; every movement aggravates; better with absolute rest.",
        modalities: "Agg: Any motion. Amel: Absolute rest, lying on painful side.",
        potencyTips: "30C."
      },
      {
        name: "Latrodectus Mactans",
        id: "latrodectus",
        keyIndications: "Violent pain in the precordial region; pain radiates to both arms; extreme apnea.",
        modalities: "Agg: Even slight motion.",
        potencyTips: "30C."
      },
      {
        name: "Spigelia",
        id: "spigelia",
        keyIndications: "Neuralgic pains; stitching pain in heart synchronous with pulse; visible palpitations.",
        modalities: "Agg: Lying on left side, motion.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["ischemic-heart-disease", "unstable-angina"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Predictable", "Relieved by rest", "CCS Classification"],
      miasmaticDominance: "Psora-Sycosis",
      thermalState: "Variable",
      organAffinity: "Coronary Vessels",
      memoryMnemonic: "S-T-A-B-L-E: Stress/Strain induced, Typical location, Atherosclerosis, Better with rest, Long-term management, ECG (Stress)."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Identifying stable angina is the first step in long-term risk reduction and preventing heart failure or MI.",
        severityAssessment: "Using the CCS functional classification (I to IV).",
        referralCriteria: ["Transition to Class III or IV", "Failure of medical therapy to control symptoms"]
      },
      individualization: {
        mentalGenerals: ["Desire for quiet and rest (Bryonia)", "Extreme fear of the slightest movement (Latrodectus)"],
        physicalGenerals: {
          thermalState: "Variable.",
          thirst: "Great thirst for large quantities (Bryonia).",
          appetite: "Varies.",
          desires: ["Quiet", "Fresh air"],
          aversions: ["Movement", "Being disturbed"],
          sleep: "Worse from lying on left side.",
          perspiration: "Cold sweat if pain is severe."
        },
        modalities: ["Agg: Motion, Stooping, Cold air, Emotional upset", "Amel: Absolute rest, Pressure, Warmth (sometimes)"],
        concomitants: ["Dyspnea", "Numbness of left arm"],
        characteristicParticulars: ["Stitching, squeezing, or crushing pain."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Pain as if needles were piercing the heart (Spigelia)"],
        individualExpression: "The patient's whole life becomes 'restricted' by the boundary of their physical exertion."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - PAIN - Heart - motion, on", chapter: "Chest" },
          { rubric: "Chest - PAIN - Heart - rest, amel.", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on the 'Modalities of rest vs motion' and the 'Direction of radiation'."
      }
    }
  },
  {
    id: "unstable-angina",
    name: "Unstable Angina",
    slug: "unstable-angina",
    system: "cardiovascular",
    category: "Emergency",
    definition: "A type of acute coronary syndrome characterized by chest pain that occurs at rest, is new in onset, or is increasing in frequency, duration, or intensity.",
    simpleExplanation: "Unstable angina is a dangerous form of chest pain that doesn't follow a pattern and can happen even when you're resting. It's a warning sign that a heart attack might happen soon.",
    examKeywords: ["Acute Coronary Syndrome", "Pain at rest", "No troponin rise", "Imminent MI"],
    epidemiology: {
      ageDistribution: "Similar to MI; incidence peaks in 50s-70s.",
      sexDistribution: "More common in men.",
      riskGroups: ["Patients with pre-existing stable angina", "Smokers", "Diabetics"],
      publicHealthRelevance: "High-risk condition requiring immediate hospitalization."
    },
    etiology: {
      predisposingFactors: ["Atherosclerosis (Unstable plaque)"],
      precipitatingFactors: ["Plaque rupture", "Partial thrombus formation", "Coronary vasospasm"],
      riskFactors: ["Smoking", "Hypertension", "Diabetes", "Family history"]
    },
    pathophysiology: {
      steps: [
        { title: "Plaque Rupture", description: "A thin-capped atherosclerotic plaque ruptures." },
        { title: "Partial Occlusion", description: "A blood clot forms but does not completely block the artery." },
        { title: "Critical Ischemia", description: "Blood flow is severely reduced even without exertion." },
        { title: "Myocardial Threat", description: "The heart muscle is at high risk of necrosis (MI) if flow is not restored." }
      ]
    },
    classification: {
      type: "Braunwald Classification",
      details: ["Class I: New onset severe/accelerated", "Class II: Subacute at rest (within month)", "Class III: Acute at rest (within 48 hours)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Chest pain at rest or with minimal exertion"],
      localSymptoms: ["Retrosternal heaviness", "Radiation to jaw, neck, back, or arms"],
      constitutionalFeatures: ["Dyspnea", "Diaphoresis (Sweating)", "Nausea"],
      importantSigns: ["Transient S3 or S4", "Hypotension during pain", "Mitral regurgitation murmur"],
      diseaseProgression: "Rapidly progresses to Myocardial Infarction if untreated."
    },
    redFlags: [
      "Any new chest pain at rest",
      "Pain lasting >20 minutes",
      "Pain associated with hypotension or sweating"
    ],
    investigations: {
      diagnostic: [
        { name: "Serial ECG", findings: "ST depression or transient elevation", importance: "Detects dynamic ischemia" },
        { name: "Cardiac Troponin", findings: "Negative", importance: "Differentiates from NSTEMI/STEMI" }
      ],
      goldStandard: { name: "Coronary Angiography", findings: "Unstable plaque or thrombus", importance: "Determines need for intervention" }
    },
    diagnosticCriteria: {
      title: "Clinical Definition",
      criteria: ["Ischemic symptoms at rest >20 min", "New onset severe angina (CCS III)", "Increasing angina pattern", "NO elevation in cardiac biomarkers"]
    },
    differentialDiagnosis: [
      { condition: "Myocardial Infarction", distinguishingFeatures: "Positive cardiac biomarkers (Troponin).", slug: "myocardial-infarction" },
      { condition: "Aortic Dissection", distinguishingFeatures: "Sudden tearing pain, unequal BPs.", slug: "aortic-aneurysm" }
    ],
    complications: {
      common: ["Recurrent ischemia"],
      serious: ["Acute Heart Failure", "Arrhythmias"],
      lifeThreatening: ["Myocardial Infarction", "Sudden Cardiac Death"]
    },
    conventionalManagement: {
      general: ["Immediate hospitalization", "Bed rest", "Cardiac monitoring"],
      medical: ["Aspirin + Clopidogrel (Dual antiplatelet)", "Heparin (Anticoagulation)", "Nitrates", "Beta-blockers"],
      surgical: ["PCI/Stents within 24-48 hours (Early invasive strategy)"],
      prevention: ["Strict risk factor management post-discharge"]
    },
    homoeopathicApproach: "In unstable angina, Homoeopathy provides critical supportive care alongside conventional emergency management. Remedies like Aconite and Arsenic address the extreme anxiety, while others focus on the character of the pain.",
    relatedRemedies: [
      {
        name: "Arsenicum Album",
        id: "arsenic",
        keyIndications: "Extreme restlessness, fear of death, better by warmth; pain worse at midnight.",
        modalities: "Agg: 12-2 AM. Amel: Warmth, hot drinks.",
        potencyTips: "200C."
      },
      {
        name: "Oxalicum Acidum",
        id: "oxalic-acid",
        keyIndications: "Sharp, lancinating pain; worse thinking about it; pain radiates down the left arm.",
        modalities: "Agg: Thinking of symptoms.",
        potencyTips: "30C."
      },
      {
        name: "Spigelia",
        id: "spigelia",
        keyIndications: "Violent palpitations, stitching pain; can only lie on the right side with head high.",
        modalities: "Agg: Lying on left side.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["stable-angina", "myocardial-infarction"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Pain at rest", "Negative Troponins", "Pre-infarction angina"],
      miasmaticDominance: "Syphilitic",
      thermalState: "Cold sweat, chilly",
      organAffinity: "Coronary Arteries",
      memoryMnemonic: "U-N-S-T-A-B-L-E: Unexpected, New onset, Squeezing pain, Troponin negative, Admission required, Better with rest (NO), Low threshold for PCI, ECG changes."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical 'Yellow Alert'; differentiating this from stable angina determines the need for urgent hospitalization.",
        severityAssessment: "Based on the TIMI or GRACE risk scores.",
        referralCriteria: ["ANY patient with suspected unstable angina requires immediate referral to an Emergency Department."]
      },
      individualization: {
        mentalGenerals: ["Intense restlessness and anguish (Arsenic)", "Fear of impending death (Aconite)"],
        physicalGenerals: {
          thermalState: "Chilly; desires warmth (Arsenic).",
          thirst: "Small frequent sips (Arsenic).",
          appetite: "N/A.",
          desires: ["Warmth", "Fresh air (Aconite)"],
          aversions: ["Food", "Motion"],
          sleep: "Inability to lie down.",
          perspiration: "Cold, clammy, exhaustion."
        },
        modalities: ["Agg: Rest (paradoxically for pain), Midnight, Emotion", "Amel: Warmth (Arsenic), Sitting up"],
        concomitants: ["Severe dyspnea", "Extreme weakness"],
        characteristicParticulars: ["Pain is 'unstable' in its presentation."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Pain is worse when thinking about it (Oxalic acid)"],
        individualExpression: "The patient is in a state of 'acute threat', where the vital force is signaling an imminent crisis."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - PAIN - Heart - rest, at", chapter: "Chest" },
          { rubric: "Mind - FEAR - death, of", chapter: "Mind" }
        ],
        symptomAnalysis: "Focus on the 'Time of aggravation' and the 'Mental state' during the attack."
      }
    }
  },
  {
    id: "heart-failure",
    name: "Heart Failure (Congestive Heart Failure)",
    slug: "heart-failure",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A complex clinical syndrome that results from any structural or functional impairment of ventricular filling or ejection of blood, leading to the inability of the heart to meet the metabolic demands of the body.",
    simpleExplanation: "Heart failure doesn't mean the heart has stopped working. It means the heart is unable to pump blood as well as it should. This leads to blood backing up and fluid building up in the lungs and other parts of the body.",
    examKeywords: ["Ejection Fraction", "Dyspnea", "Edema", "BNP", "RAAS"],
    epidemiology: {
      ageDistribution: "Incidence increases sharply after age 65.",
      sexDistribution: "Slightly more common in men (especially HFrEF).",
      riskGroups: ["Hypertensive patients", "Post-MI patients", "Valvular disease patients"],
      publicHealthRelevance: "A leading cause of hospitalization in the elderly."
    },
    etiology: {
      predisposingFactors: ["Hypertension", "Ischemic heart disease", "Valvular disease"],
      precipitatingFactors: ["Arrhythmias (e.g., AF)", "Infection", "High salt intake", "Non-compliance with meds"],
      riskFactors: ["Diabetes", "Obesity", "Smoking", "Alcohol abuse"]
    },
    pathophysiology: {
      steps: [
        { title: "Initial Insult", description: "Damage to the myocardium (e.g., MI or chronic HTN)." },
        { title: "Neurohormonal Activation", description: "SNS and RAAS are activated to maintain cardiac output." },
        { title: "Remodeling", description: "The heart undergoes structural changes (dilation or hypertrophy)." },
        { title: "Decompensation", description: "The compensatory mechanisms eventually fail, leading to fluid overload and low output." }
      ]
    },
    classification: {
      type: "Ejection Fraction Basis",
      details: ["HFrEF (Reduced): EF ≤40%", "HFpEF (Preserved): EF ≥50%", "HFmrEF (Mildly Reduced): EF 41-49%"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Dyspnea (Shortness of breath)", "Fatigue", "Exercise intolerance"],
      localSymptoms: ["Orthopnea (Breathless when lying)", "Paroxysmal Nocturnal Dyspnea (PND)"],
      constitutionalFeatures: ["Ankle swelling (Edema)", "Abdominal bloating"],
      importantSigns: ["Elevated JVP", "S3 Gallop", "Displaced apex beat", "Crackles in lungs"],
      diseaseProgression: "Gradual decline in function with intermittent acute decompensations."
    },
    redFlags: [
      "Breathlessness at rest",
      "Pink frothy sputum (Pulmonary edema)",
      "Sudden weight gain (>2kg in 2 days)",
      "Syncope"
    ],
    investigations: {
      diagnostic: [
        { name: "NT-proBNP", findings: "Significantly elevated", importance: "Rules out non-cardiac dyspnea" },
        { name: "Chest X-ray", findings: "Cardiomegaly, Kerley B lines", importance: "Detects pulmonary congestion" }
      ],
      goldStandard: { name: "Echocardiography", findings: "Reduced EF or structural changes", importance: "Key for classification" },
      laboratoryFindings: [
        { name: "Serum Electrolytes", findings: "Hyponatremia", importance: "Prognostic indicator" }
      ]
    },
    diagnosticCriteria: {
      title: "Framingham Criteria",
      criteria: ["Major: PND, JVP elevation, Crackles, S3", "Minor: Extremity edema, Night cough, Dyspnea on exertion", "Requirement: 2 major or 1 major + 2 minor"]
    },
    differentialDiagnosis: [
      { condition: "COPD/Asthma", distinguishingFeatures: "Wheezing, history of smoking/allergies, normal BNP.", slug: "bronchial-asthma" },
      { condition: "Anemia", distinguishingFeatures: "High output state, pale conjunctiva.", slug: "anemia" },
      { condition: "Renal Failure", distinguishingFeatures: "Fluid overload primarily from salt/water retention, high creatinine." }
    ],
    complications: {
      common: ["Atrial fibrillation", "Functional Mitral Regurgitation"],
      serious: ["Chronic Kidney Disease", "Liver congestion (Cardiac cirrhosis)"],
      lifeThreatening: ["Acute Pulmonary Edema", "Ventricular Tachycardia"]
    },
    conventionalManagement: {
      general: ["Salt restriction (<2g/day)", "Fluid restriction", "Daily weights"],
      medical: ["ACE Inhibitors/ARBs", "Beta-blockers", "Diuretics (Furosemide)", "SGLT2 Inhibitors"],
      surgical: ["ICD/CRT", "Ventricular Assist Devices (VAD)", "Heart Transplant"],
      prevention: ["Treating HTN and IHD early"]
    },
    homoeopathicApproach: "In heart failure, Homoeopathy aims to improve myocardial efficiency and manage fluid balance. Remedies are chosen based on the 'dropsical' presentation and the character of the breathlessness.",
    relatedRemedies: [
      {
        name: "Digitalis Purpurea",
        id: "digitalis",
        keyIndications: "Extremely slow, irregular pulse; feeling as if heart will stop if he moves; cyanosis.",
        modalities: "Agg: Motion. Amel: Sitting up.",
        potencyTips: "30C."
      },
      {
        name: "Crataegus Oxyacantha",
        id: "crataegus",
        keyIndications: "The 'Heart Tonic'; used for failing heart with extreme dyspnea on least exertion.",
        potencyTips: "Mother Tincture (Q) 10 drops."
      },
      {
        name: "Arsenicum Album",
        id: "arsenic",
        keyIndications: "Orthopnea; can only breathe sitting bent forward; extreme restlessness and fear.",
        modalities: "Agg: 1-2 AM.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["hypertension", "valvular-heart-disease", "atrial-fibrillation"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["HFrEF vs HFpEF", "BNP is diagnostic", "Salt restriction"],
      miasmaticDominance: "Syphilitic (Destructive remodeling)",
      thermalState: "Cold extremities",
      organAffinity: "Myocardium",
      memoryMnemonic: "F-A-C-E-S: Fatigue, Activity limitation, Congestion, Edema, Shortness of breath."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to identify the underlying cause (e.g., ischemia) and the EF category to guide the choice of conventional 'disease-modifying' drugs.",
        severityAssessment: "Using NYHA Class (I-IV) and ACC/AHA Stages (A-D).",
        referralCriteria: ["New onset heart failure", "Acute pulmonary edema", "Refractory symptoms despite triple therapy"]
      },
      individualization: {
        mentalGenerals: ["Anxiety and fear of death (Arsenic)", "Desire to be fanned (Carbo-v)", "Mental sluggishness"],
        physicalGenerals: {
          thermalState: "Chilly; coldness of skin.",
          thirst: "Small quantities frequently (Arsenic).",
          appetite: "Poor; abdominal distension.",
          desires: ["Fresh air", "Company"],
          aversions: ["Tight clothing", "Food odors"],
          sleep: "Must sit up in bed to breathe (Orthopnea).",
          perspiration: "Cold, clammy, on forehead."
        },
        modalities: ["Agg: Lying down, Exertion, 1-2 AM", "Amel: Sitting up, Propped up by pillows, Fresh air"],
        concomitants: ["Anasarca (general swelling)", "Liver tenderness", "Albuminuria"],
        characteristicParticulars: ["Pulse is very slow or extremely fast and irregular."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Heart feels as if it would stop beating if the patient moves (Digitalis)"],
        individualExpression: "The patient feels as if the 'pump of life' is failing, leading to a state of internal drowning and profound exhaustion."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - HEART - failure, congestive", chapter: "Chest" },
          { rubric: "Respiration - DIFFICULT - lying, while - amel.", chapter: "Respiration" },
          { rubric: "Generalities - DROPSY", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on 'Dropsical symptoms', 'Character of pulse', and 'Modalities of position'."
      }
    }
  },
  {
    id: "rheumatic-fever",
    name: "Rheumatic Fever",
    slug: "rheumatic-fever",
    system: "cardiovascular",
    category: "Inflammatory",
    definition: "An acute, immunologically mediated, multisystem inflammatory disease that follows a Group A streptococcal pharyngeal infection.",
    simpleExplanation: "Rheumatic fever is an inflammatory disease that can develop when a throat infection (strep throat) isn't properly treated. It can affect the heart, joints, brain, and skin.",
    examKeywords: ["Jones Criteria", "Aschoff bodies", "Strep throat", "Migratory polyarthritis"],
    epidemiology: {
      ageDistribution: "Most common in children (5-15 years).",
      sexDistribution: "Equal distribution.",
      riskGroups: ["Overcrowded living conditions", "Poor socioeconomic status"],
      publicHealthRelevance: "Major cause of acquired heart disease in developing countries."
    },
    etiology: {
      predisposingFactors: ["Genetic susceptibility", "Poverty"],
      precipitatingFactors: ["Group A Beta-hemolytic Streptococcal pharyngitis"],
      riskFactors: ["Recurrent throat infections", "Lack of access to antibiotics"]
    },
    pathophysiology: {
      steps: [
        { title: "Strep Infection", description: "Initial infection of the throat by Streptococcus." },
        { title: "Molecular Mimicry", description: "Antibodies against strep cross-react with human tissues (heart, joints)." },
        { title: "Inflammation", description: "Widespread inflammatory damage in affected organs." },
        { title: "Chronic Damage", description: "Repeated attacks lead to permanent scarring of heart valves." }
      ]
    },
    classification: {
      type: "Clinical Stages",
      details: ["Acute Phase: Fever, joint pain, carditis", "Chronic Phase: Valvular scarring (RHD)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["High fever", "Joint pain and swelling"],
      localSymptoms: ["Migratory Polyarthritis (Large joints)", "Carditis (Chest pain, dyspnea)"],
      constitutionalFeatures: ["Sydenham's Chorea (Involuntary movements)", "Erythema Marginatum (Skin rash)", "Subcutaneous nodules"],
      importantSigns: ["New heart murmur", "Tachycardia out of proportion to fever"],
      diseaseProgression: "Self-limiting acute phase → Risk of permanent valvular damage."
    },
    redFlags: [
      "Severe dyspnea",
      "Heart failure in a child",
      "Violent involuntary movements"
    ],
    investigations: {
      diagnostic: [
        { name: "ASO Titer", findings: "Elevated levels", importance: "Evidence of recent strep infection" },
        { name: "ECG", findings: "Prolonged PR interval", importance: "Evidence of carditis" }
      ],
      goldStandard: { name: "Jones Criteria", findings: "Fulfills Major/Minor criteria", importance: "Clinical diagnosis" },
      laboratoryFindings: [
        { name: "ESR/CRP", findings: "Markedly elevated", importance: "Indicates acute inflammation" },
        { name: "Throat Culture", findings: "Positive for Strep A", importance: "Direct evidence" }
      ]
    },
    diagnosticCriteria: {
      title: "Revised Jones Criteria",
      criteria: ["Major: Carditis, Arthritis, Chorea, Erythema marginatum, Nodules", "Minor: Fever, Polyarthralgia, High ESR/CRP, Prolonged PR interval", "Requirement: 2 major OR 1 major + 2 minor"]
    },
    differentialDiagnosis: [
      { condition: "Juvenile Rheumatoid Arthritis", distinguishingFeatures: "Small joints involved, persistent pain (not migratory)." },
      { condition: "Infective Endocarditis", distinguishingFeatures: "Splenomegaly, positive blood cultures.", slug: "infective-endocarditis" },
      { condition: "Septic Arthritis", distinguishingFeatures: "Single joint, extremely painful, high WBC in joint fluid." }
    ],
    complications: {
      common: ["Chronic Rheumatic Heart Disease"],
      serious: ["Heart Failure", "Pericarditis"],
      lifeThreatening: ["Pancarditis"]
    },
    conventionalManagement: {
      general: ["Bed rest (until ESR is normal)", "Salicylates for joint pain"],
      medical: ["Penicillin G (to eradicate strep)", "Corticosteroids for severe carditis"],
      emergency: ["Treatment of heart failure if present"],
      prevention: ["Long-term antibiotic prophylaxis (Monthly Penicillin)"]
    },
    homoeopathicApproach: "Homoeopathy targets the 'miasmatic explosion' during the acute phase and focuses on preventing the 'syphilitic' destruction of valves in the chronic phase.",
    relatedRemedies: [
      {
        name: "Abrotanum",
        id: "abrotanum",
        keyIndications: "Rheumatism following suppressed diarrhea; metastasis of rheumatism to heart.",
        potencyTips: "30C."
      },
      {
        name: "Rhus Toxicodendron",
        id: "rhus-tox",
        keyIndications: "Restless joints; migratory pain; better with continued motion.",
        modalities: "Agg: First motion, damp weather. Amel: Continued motion.",
        potencyTips: "200C."
      },
      {
        name: "Colchicum",
        id: "colchicum",
        keyIndications: "Rheumatic carditis; heart feels as if it would burst; extreme sensitivity to smell of food.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["rheumatic-heart-disease", "valvular-heart-disease"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Jones Criteria", "Strep A throat infection", "Penicillin is key"],
      miasmaticDominance: "Psora-Syphilis",
      thermalState: "High fever",
      organAffinity: "Heart valves, Joints, Basal ganglia",
      memoryMnemonic: "J-O-N-E-S: Joints (Migratory), Carditis (O-shaped heart), Nodules, Erythema marginatum, Sydenham chorea."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Vital to start primary prophylaxis (antibiotics) to prevent the first attack and secondary prophylaxis to prevent recurrent attacks and worsening RHD.",
        severityAssessment: "Based on the degree of cardiac involvement (ECG changes, murmur, failure).",
        referralCriteria: ["Any child with a new heart murmur and joint pain", "Acute heart failure symptoms"]
      },
      individualization: {
        mentalGenerals: ["Irritability (Abrotanum)", "Restlessness (Rhus-t)", "Emotional sensitivity"],
        physicalGenerals: {
          thermalState: "High fever with chills.",
          thirst: "Great thirst or thirstless.",
          appetite: "Aversion to smell of food (Colchicum).",
          desires: ["Warmth (Rhus-tox)"],
          aversions: ["Food odors"],
          sleep: "Restless; unable to find a comfortable position.",
          perspiration: "Sour-smelling sweat."
        },
        modalities: ["Agg: Cold damp weather, Rest, Night", "Amel: Continued motion, Warmth"],
        concomitants: ["Migratory joint swelling", "Involuntary movements"],
        characteristicParticulars: ["Pain moves rapidly from one joint to another."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Metastasis of rheumatism from joints to heart (Abrotanum, Kalmia)"],
        individualExpression: "The child's body is in a state of 'hyper-reactivity' following a simple throat infection, leading to widespread internal inflammation."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Generalities - RHEUMATISM - metastasis - heart, to", chapter: "Generalities" },
          { rubric: "Chest - INFLAMMATION - Heart - endocardium", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on the 'Migratory character' and 'Metastatic tendencies'."
      }
    }
  },
  {
    id: "rheumatic-heart-disease",
    name: "Rheumatic Heart Disease (RHD)",
    slug: "rheumatic-heart-disease",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "Chronic valvular damage resulting from one or more attacks of acute rheumatic fever, most commonly affecting the mitral valve.",
    simpleExplanation: "RHD is the permanent damage done to the heart's valves by rheumatic fever. The valves become scarred and stiff, meaning they can't open or close properly.",
    examKeywords: ["Mitral stenosis", "Fish-mouth opening", "Penicillin prophylaxis", "Valvular scarring"],
    epidemiology: {
      ageDistribution: "Peaks in young adults (20s-30s) who had RF in childhood.",
      sexDistribution: "More common in females (especially Mitral Stenosis).",
      riskGroups: ["Individuals with history of Rheumatic Fever"],
      publicHealthRelevance: "A major cause of cardiovascular death in young adults in poor regions."
    },
    etiology: {
      predisposingFactors: ["Prior Acute Rheumatic Fever"],
      precipitatingFactors: ["Recurrent streptococcal infections"],
      riskFactors: ["Poverty", "Poor access to medical care", "Overcrowding"]
    },
    pathophysiology: {
      steps: [
        { title: "Valvulitis", description: "Initial inflammation of the valves during acute RF." },
        { title: "Organization", description: "Inflammatory exudate is replaced by fibrous tissue." },
        { title: "Scarring", description: "Valves thicken, chordae tendineae shorten, and commissures fuse." },
        { title: "Hemodynamic Change", description: "Valves become either stenotic (narrowed) or regurgitant (leaking)." }
      ]
    },
    classification: {
      type: "Valvular Involvement",
      details: ["Mitral Valve (Commonest - 70%)", "Aortic Valve (Common)", "Tricuspid Valve (Rarely)", "Pulmonary Valve (Very rare)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Dyspnea on exertion", "Palpitations"],
      localSymptoms: ["Cough (sometimes with blood - Hemoptysis)", "Orthopnea"],
      constitutionalFeatures: ["Fatigue", "Ankle swelling (if right heart fails)"],
      importantSigns: ["Heart murmurs (e.g., Mid-diastolic rumble of MS)", "Atrial fibrillation (irregular pulse)", "Malar flush"],
      diseaseProgression: "Slowly progressive → Heart Failure → Arrhythmias."
    },
    redFlags: [
      "Sudden severe breathlessness",
      "Hemoptysis (Coughing blood)",
      "Systemic embolism (Stroke signs)"
    ],
    investigations: {
      diagnostic: [
        { name: "Chest X-ray", findings: "Left atrial enlargement, mitral-shaped heart", importance: "Detects chamber changes" },
        { name: "ECG", findings: "P-mitrale, Atrial fibrillation", importance: "Detects atrial strain" }
      ],
      goldStandard: { name: "Echocardiography (Doppler)", findings: "Thickened valves, restricted opening, regurgitation", importance: "Confirms and grades severity" }
    },
    diagnosticCriteria: {
      title: "Diagnostic Standard",
      criteria: ["History of Rheumatic Fever", "Characteristic clinical murmurs", "Echocardiographic confirmation of rheumatic valvular morphology"]
    },
    differentialDiagnosis: [
      { condition: "Mitral Valve Prolapse", distinguishingFeatures: "Mid-systolic click, non-rheumatic history." },
      { condition: "Congenital Valvular Disease", distinguishingFeatures: "Present from birth, specific ultrasound features." },
      { condition: "Degenerative Calcific Aortic Stenosis", distinguishingFeatures: "Common in very elderly, no rheumatic history." }
    ],
    complications: {
      common: ["Atrial Fibrillation"],
      serious: ["Systemic Embolism (Stroke)", "Infective Endocarditis"],
      lifeThreatening: ["Congestive Heart Failure", "Pulmonary Edema"]
    },
    conventionalManagement: {
      general: ["Salt restriction", "Activity modification"],
      medical: ["Diuretics", "Digoxin/Beta-blockers (for AF)", "Anticoagulants (Warfarin)"],
      surgical: ["Balloon Valvuloplasty", "Valve Repair", "Valve Replacement"],
      prevention: ["Secondary prophylaxis (Penicillin) until age 21 or 40 depending on severity."]
    },
    homoeopathicApproach: "Homoeopathy focuses on the miasmatic correction (Syphilis) to halt the progressive scarring and constitutional management to support the heart muscle.",
    relatedRemedies: [
      {
        name: "Naja Tripudians",
        id: "naja",
        keyIndications: "Valvular diseases with dry, teasing cough; inability to lie on left side; sense of weight on heart.",
        potencyTips: "30C or 200C."
      },
      {
        name: "Iodium",
        id: "iodium",
        keyIndications: "Hypertrophic heart with valvular lesions; feels as if the heart is squeezed by an iron hand.",
        potencyTips: "30C."
      },
      {
        name: "Spigelia",
        id: "spigelia",
        keyIndications: "Visible pulsations; stitching pains; useful in acute exacerbations of valvulitis.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["rheumatic-fever", "valvular-heart-disease", "atrial-fibrillation"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Mitral Stenosis is hallmark", "Atrial fibrillation risk", "Fish-mouth valve"],
      miasmaticDominance: "Syphilitic (Scarring)",
      thermalState: "Variable",
      organAffinity: "Heart Valves (Mitral commonest)",
      memoryMnemonic: "M-A-T-P: Mitral (Commonest), Aortic, Tricuspid, Pulmonary (Order of frequency)."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to identify the degree of valve stenosis or regurgitation to decide the timing of surgical intervention before irreversible heart failure occurs.",
        severityAssessment: "Based on valve area (Echocardiography) and symptomatic status (NYHA Class).",
        referralCriteria: ["Developing atrial fibrillation", "Symptoms of systemic embolism (Stroke)", "NYHA Class III or IV symptoms"]
      },
      individualization: {
        mentalGenerals: ["Anxiety about heart disease", "Sadness and depression (Aurum, Naja)"],
        physicalGenerals: {
          thermalState: "Variable.",
          thirst: "Varies.",
          appetite: "Good but loses weight (Iodium).",
          desires: ["Fresh air (Naja)"],
          aversions: ["Tight collars (Naja)"],
          sleep: "Orthopnea; waking with choking sensation.",
          perspiration: "Varies."
        },
        modalities: ["Agg: Lying on left side, Exertion, Emotion", "Amel: Sitting up, Fresh air"],
        concomitants: ["Dry cough", "Palpitations", "Edema"],
        characteristicParticulars: ["Pulse is irregular (AF) or small and weak."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Sense of weight or an iron band around the heart (Naja, Cactus)"],
        individualExpression: "The patient's life is framed by 'narrowed' possibilities due to the mechanical restriction of blood flow."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - HEART - valvular disease", chapter: "Chest" },
          { rubric: "Chest - HEART - Mitral - stenosis", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on the 'Organic changes' (Syphilitic miasm) and 'Supportive totality'."
      }
    }
  },
  {
    id: "infective-endocarditis",
    name: "Infective Endocarditis",
    slug: "infective-endocarditis",
    system: "cardiovascular",
    category: "Inflammatory",
    definition: "An infection of the endocardial surface of the heart, usually involving one or more heart valves or an intracardiac device.",
    simpleExplanation: "Infective endocarditis is a serious infection of the heart's inner lining or valves. It happens when bacteria or other germs enter the bloodstream and settle on damaged areas of the heart.",
    examKeywords: ["Duke Criteria", "Vegetations", "Splinter hemorrhages", "Roth spots"],
    epidemiology: {
      ageDistribution: "More common in older adults and those with prosthetic valves.",
      sexDistribution: "More common in men.",
      riskGroups: ["IV drug users", "Patients with prosthetic valves", "Patients with RHD"],
      publicHealthRelevance: "High mortality (up to 25%) even with treatment."
    },
    etiology: {
      predisposingFactors: ["Damaged heart valves (RHD, Congenital)", "Prosthetic valves"],
      precipitatingFactors: ["Dental procedures", "IV drug use", "Skin infections", "Indwelling catheters"],
      riskFactors: ["Staphylococcus aureus (common in acute)", "Viridans Streptococci (common in subacute)"]
    },
    pathophysiology: {
      steps: [
        { title: "Endocardial Injury", description: "Turbulent blood flow damages the endocardium." },
        { title: "Bacteremia", description: "Microorganisms enter the bloodstream." },
        { title: "Adhesion", description: "Germs stick to the damaged area (often on a fibrin-platelet clot)." },
        { title: "Vegetation Formation", description: "Germs multiply, creating a 'vegetation' that can break off (embolize)." }
      ]
    },
    classification: {
      type: "Clinical Presentation",
      details: ["Acute: Rapid onset, high fever, S. aureus", "Subacute: Indolent course, low fever, S. viridans"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Fever", "Chills", "Night sweats", "Fatigue"],
      localSymptoms: ["New or changing heart murmur"],
      constitutionalFeatures: ["Splinter hemorrhages (nails)", "Osler nodes (painful pads)", "Janeway lesions (painless palms)", "Roth spots (retina)"],
      importantSigns: ["Splenomegaly", "Clubbing (in chronic cases)"],
      diseaseProgression: "Rapid destruction of valves in acute → Embolization to brain/spleen/kidney."
    },
    redFlags: [
      "Fever with a new heart murmur",
      "Sudden neurological deficit (Stroke)",
      "Hematuria (blood in urine)"
    ],
    investigations: {
      diagnostic: [
        { name: "Blood Cultures", findings: "Persistent growth of organisms", importance: "Crucial for identifying the germ" },
        { name: "Echocardiogram (TEE)", findings: "Mobile vegetations on valves", importance: "Visual proof of infection" }
      ],
      goldStandard: { name: "Duke Criteria", findings: "Fulfills Major/Minor points", importance: "Standard diagnostic framework" }
    },
    diagnosticCriteria: {
      title: "Modified Duke Criteria",
      criteria: ["Major: Positive blood cultures, Vegetations on Echo", "Minor: Predisposition, Fever, Vascular phenomena (Janeway), Immunologic phenomena (Osler)", "Requirement: 2 major OR 1 major + 3 minor"]
    },
    differentialDiagnosis: [
      { condition: "Acute Rheumatic Fever", distinguishingFeatures: "Migratory arthritis, sterile blood cultures.", slug: "rheumatic-fever" },
      { condition: "Systemic Lupus Erythematosus (SLE)", distinguishingFeatures: "Butterfly rash, Libman-Sacks endocarditis (sterile)." },
      { condition: "Atrial Myxoma", distinguishingFeatures: "Murmur changes with position, weight loss, negative cultures." }
    ],
    complications: {
      common: ["Valvular destruction (Heart failure)"],
      serious: ["Septic Embolism (Stroke)", "Splenic Abscess"],
      lifeThreatening: ["Septic Shock", "Cerebral Mycotic Aneurysm"]
    },
    conventionalManagement: {
      general: ["Long-term IV antibiotics (4-6 weeks)"],
      medical: ["Vancomycin", "Ceftriaxone", "Gentamicin"],
      surgical: ["Valve replacement if failure is severe or vegetations are large"],
      prevention: ["Antibiotic prophylaxis before dental work in high-risk patients"]
    },
    homoeopathicApproach: "Endocarditis is a deeply septic state (Syphilitic-Psora). Homoeopathy is used as a powerful supportive therapy to address the sepsis and prevent valvular destruction.",
    relatedRemedies: [
      {
        name: "Arnica Montana",
        id: "arnica",
        keyIndications: "Septic state; patient feels very sore and bruised; bed feels too hard.",
        potencyTips: "200C."
      },
      {
        name: "Lachesis",
        id: "lachesis",
        keyIndications: "Septic endocarditis with extreme sensitivity to touch; purple discoloration of lesions.",
        potencyTips: "200C."
      },
      {
        name: "Pyrogenium",
        id: "pyrogen",
        keyIndications: "The 'Homoeopathic Antiseptic'; pulse and temperature are out of proportion (e.g., high pulse, low fever).",
        potencyTips: "200C or 1M."
      }
    ],
    relatedDiseases: ["rheumatic-heart-disease", "valvular-heart-disease"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Duke Criteria", "Blood cultures are key", "Vegetations"],
      miasmaticDominance: "Syphilitic (Septic)",
      thermalState: "High fever with chills",
      organAffinity: "Heart Endocardium",
      memoryMnemonic: "F-R-O-M-J-A-N-E: Fever, Roth spots, Osler nodes, Murmur, Janeway lesions, Anemia, Nail hemorrhages, Emboli."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical; untreated infective endocarditis is almost universally fatal. Early diagnosis saves lives and valves.",
        severityAssessment: "Based on the virulence of the organism and the degree of hemodynamic instability.",
        referralCriteria: ["ANY patient with unexplained fever and a heart murmur", "Signs of systemic embolization"]
      },
      individualization: {
        mentalGenerals: ["Prostration and indifference (Pyrogen)", "Extreme loquacity (Lachesis)", "Anxiety about death"],
        physicalGenerals: {
          thermalState: "High fever with shaking chills.",
          thirst: "Small quantities frequently.",
          appetite: "Complete loss of appetite.",
          desires: ["Cold water", "Open air"],
          aversions: ["Tight clothing"],
          sleep: "Comatose or extremely restless.",
          perspiration: "Offensive, cold sweat."
        },
        modalities: ["Agg: Sleep (Lachesis), Pressure, Touch", "Amel: Fanning, Open air"],
        concomitants: ["Petechiae", "Splenomegaly", "Joint pains"],
        characteristicParticulars: ["Pulse is abnormally rapid out of proportion to temperature (Pyrogen)."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["The bed feels too hard, can't find a soft spot (Arnica, Pyrogen)"],
        individualExpression: "The body is in a state of 'internal rot' or deep sepsis where the vital force is overwhelmed by microbial invasion."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - INFLAMMATION - Heart - endocardium", chapter: "Chest" },
          { rubric: "Generalities - SEPTICEMIA", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on 'Septic totality' and 'Peculiarities of fever and pulse'."
      }
    }
  },
  {
    id: "myocarditis",
    name: "Myocarditis",
    slug: "myocarditis",
    system: "cardiovascular",
    category: "Inflammatory",
    definition: "Inflammation of the heart muscle (myocardium), most commonly due to a viral infection.",
    simpleExplanation: "Myocarditis is inflammation of the heart muscle. When the heart is inflamed, it can't pump as well, which can lead to rapid heartbeats, chest pain, and shortness of breath.",
    examKeywords: ["Viral prodrome", "Troponin rise", "Sudden cardiac death", "MRI Heart"],
    epidemiology: {
      ageDistribution: "Common in young adults.",
      sexDistribution: "More common in men.",
      riskGroups: ["Athletes", "Immunocompromised individuals"],
      publicHealthRelevance: "A significant cause of sudden cardiac death in young people."
    },
    etiology: {
      predisposingFactors: ["Recent viral infection", "Autoimmune disorders"],
      precipitatingFactors: ["Coxsackie B Virus (Commonest)", "COVID-19", "Drugs/Toxins (Cocaine)"],
      riskFactors: ["Strenuous exercise during viral infection"]
    },
    pathophysiology: {
      steps: [
        { title: "Viral Entry", description: "Virus enters the myocardial cells." },
        { title: "Direct Damage", description: "Viral replication causes cell death." },
        { title: "Immune Response", description: "The body's immune cells attack the infected heart muscle." },
        { title: "Dilated Cardiomyopathy", description: "If inflammation persists, the heart becomes weak and dilated." }
      ]
    },
    classification: {
      type: "Clinical Severity",
      details: ["Fulminant: Acute heart failure", "Subacute: Gradual dilation", "Chronic: Persistent inflammation"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Chest pain", "Fatigue", "Fever"],
      localSymptoms: ["Palpitations", "Shortness of breath"],
      constitutionalFeatures: ["Viral prodrome (fever, body ache, sore throat)"],
      importantSigns: ["Tachycardia", "S3/S4 Gallop", "Signs of heart failure"],
      diseaseProgression: "Varies from complete recovery to fatal heart failure or chronic dilated cardiomyopathy."
    },
    redFlags: [
      "Chest pain in a young person with recent flu",
      "Syncope during exercise",
      "Acute heart failure in a previously healthy person"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "ST-T changes, arrhythmias", importance: "Initial screen" },
        { name: "Cardiac MRI", findings: "Edema and late gadolinium enhancement", importance: "Non-invasive gold standard" }
      ],
      goldStandard: { name: "Endomyocardial Biopsy", findings: "Inflammatory infiltrate with necrosis", importance: "Definitive but invasive" },
      laboratoryFindings: [
        { name: "Troponin", findings: "Elevated", importance: "Indicates muscle damage" },
        { name: "ESR/CRP", findings: "Elevated", importance: "Indicates inflammation" }
      ]
    },
    diagnosticCriteria: {
      title: "Clinical Criteria",
      criteria: ["Recent viral prodrome", "New onset cardiac symptoms", "Elevated biomarkers", "Imaging evidence of inflammation"]
    },
    differentialDiagnosis: [
      { condition: "Myocardial Infarction", distinguishingFeatures: "Obstructed coronary arteries on angiography (Myocarditis has clear coronaries).", slug: "myocardial-infarction" },
      { condition: "Pericarditis", distinguishingFeatures: "Positional pain, friction rub, widespread ST elevation.", slug: "pericarditis" }
    ],
    complications: {
      common: ["Arrhythmias"],
      serious: ["Dilated Cardiomyopathy", "Heart Failure"],
      lifeThreatening: ["Sudden Cardiac Death", "Cardiogenic Shock"]
    },
    conventionalManagement: {
      general: ["Strict bed rest (avoid exercise for 3-6 months)", "Supportive care"],
      medical: ["Treatment of heart failure (ACEi, Beta-blockers)", "Anti-arrhythmics"],
      emergency: ["ECMO or VAD in fulminant cases"],
      prevention: ["Rest during viral illnesses"]
    },
    homoeopathicApproach: "Homoeopathy focuses on the post-viral miasmatic state and the weakness of the heart muscle. Remedies are chosen to resolve the inflammation and restore myocardial tone.",
    relatedRemedies: [
      {
        name: "Arsenicum Album",
        id: "arsenic",
        keyIndications: "Restlessness, prostration, anxiety; myocarditis after viral infections.",
        potencyTips: "200C."
      },
      {
        name: "Phosphorus",
        id: "phosphorus",
        keyIndications: "Dilated heart; palpitations; weight on chest; worse lying on left side.",
        potencyTips: "200C."
      },
      {
        name: "Convallaria Majalis",
        id: "convallaria",
        keyIndications: "Extremely rapid and irregular heart; heart feels too full; dyspnea on least exertion.",
        potencyTips: "Q or 3X."
      }
    ],
    relatedDiseases: ["pericarditis", "cardiomyopathy", "heart-failure"],
    examPriority: "Medium",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Viral cause (Coxsackie)", "MRI for diagnosis", "Rest is crucial"],
      miasmaticDominance: "Psora-Syphilis",
      thermalState: "Variable",
      organAffinity: "Myocardium",
      memoryMnemonic: "V-I-R-U-S: Viral prodrome, Inflammation of muscle, Resting is key, Ultrasound (Echo) changes, Sudden death risk."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Crucial to prevent sudden cardiac death, especially in athletes who must be restricted from activity until inflammation resolves.",
        severityAssessment: "Based on hemodynamic stability and Ejection Fraction.",
        referralCriteria: ["Any suspected myocarditis requires hospitalization for monitoring of arrhythmias."]
      },
      individualization: {
        mentalGenerals: ["Great prostration (Arsenic)", "Anxiety and restlessness"],
        physicalGenerals: {
          thermalState: "Varies; often feels chilly.",
          thirst: "Varies.",
          appetite: "Poor.",
          desires: ["Fresh air", "Cold drinks (Phosphorus)"],
          aversions: ["Tight clothing"],
          sleep: "Restless; unable to lie on left side.",
          perspiration: "Cold, sticky sweat."
        },
        modalities: ["Agg: Exertion, Lying on left side, 1-2 AM (Arsenic)", "Amel: Absolute rest, Sitting up"],
        concomitants: ["Extreme weakness", "Irregular pulse"],
        characteristicParticulars: ["Sensation as if the heart has stopped and then started with a jump."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["A sensation as if the heart were beating in water (Spigelia)"],
        individualExpression: "The patient feels 'hollow' or 'broken' in their core strength following a flu-like illness."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - INFLAMMATION - Heart - myocardium", chapter: "Chest" },
          { rubric: "Generalities - WEAKNESS - heart, from", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on 'Post-viral history' and 'Myocardial weakness' totality."
      }
    }
  },
  {
    id: "pericarditis",
    name: "Pericarditis",
    slug: "pericarditis",
    system: "cardiovascular",
    category: "Inflammatory",
    definition: "Inflammation of the pericardium, the thin sac surrounding the heart.",
    simpleExplanation: "Pericarditis is an irritation or infection of the protective sac that surrounds your heart. It typically causes sharp chest pain that feels better when you lean forward.",
    examKeywords: ["Positional chest pain", "Friction rub", "ST elevation (diffuse)", "Colchicine"],
    epidemiology: {
      ageDistribution: "More common in young and middle-aged adults.",
      sexDistribution: "More common in men.",
      riskGroups: ["Patients with recent viral infection", "Uremic patients", "Autoimmune disease patients"],
      publicHealthRelevance: "Common cause of emergency department visits for chest pain."
    },
    etiology: {
      predisposingFactors: ["Viral infection", "Uremia", "Post-MI (Dressler syndrome)"],
      precipitatingFactors: ["Coxsackie virus", "Tuberculosis (common in India)", "Autoimmune (SLE, RA)"],
      riskFactors: ["Cancer", "Radiation therapy", "Cardiac surgery"]
    },
    pathophysiology: {
      steps: [
        { title: "Inflammation", description: "The layers of the pericardium become inflamed and rub against each other." },
        { title: "Exudation", description: "Fluid or fibrin accumulates in the pericardial sac." },
        { title: "Restriction", description: "If fluid builds up too fast, it restricts heart filling (Tamponade)." },
        { title: "Resolution/Fibrosis", description: "The inflammation either heals or leads to a thickened, scarred sac (Constrictive Pericarditis)." }
      ]
    },
    classification: {
      type: "Etiological",
      details: ["Infectious (Viral, TB, Bacterial)", "Non-infectious (Uremic, Post-MI, Neoplastic, Connective tissue disease)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Sharp, stabbing chest pain"],
      localSymptoms: ["Pain radiates to the left trapezius ridge (shoulder)"],
      constitutionalFeatures: ["Low-grade fever", "Dry cough"],
      importantSigns: ["Pericardial Friction Rub (leathery sound heard on auscultation)", "Pain better leaning forward"],
      diseaseProgression: "Most resolve in weeks → Risk of recurrence (30%) → Risk of Effusion/Tamponade."
    },
    redFlags: [
      "Hypotension and distant heart sounds (Tamponade)",
      "High fever (Bacterial/Septic origin)",
      "Severe dyspnea"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "Diffuse concave ST-segment elevation", importance: "Differentiates from MI (convex ST)" },
        { name: "Echocardiogram", findings: "Pericardial effusion", importance: "Detects fluid accumulation" }
      ],
      goldStandard: { name: "Clinical + ECG", findings: "Rub + positional pain + ST changes", importance: "Diagnostic triad" },
      laboratoryFindings: [
        { name: "ESR/CRP", findings: "Elevated", importance: "Confirms systemic inflammation" },
        { name: "BUN/Creatinine", findings: "High (if uremic)", importance: "Etiology check" }
      ]
    },
    diagnosticCriteria: {
      title: "ESC Guidelines",
      criteria: ["Pericarditic chest pain", "Pericardial friction rub", "New widespread ST-elevation or PR-depression", "Pericardial effusion", "Requirement: At least 2 out of 4"]
    },
    differentialDiagnosis: [
      { condition: "Myocardial Infarction", distinguishingFeatures: "Pain not positional, convex ST elevation, Troponin positive.", slug: "myocardial-infarction" },
      { condition: "Pleurisy", distinguishingFeatures: "Pain related to breathing, pleural rub on auscultation." },
      { condition: "Pneumothorax", distinguishingFeatures: "Sudden onset, absent breath sounds on one side." }
    ],
    complications: {
      common: ["Recurrent Pericarditis"],
      serious: ["Pericardial Effusion"],
      lifeThreatening: ["Cardiac Tamponade", "Constrictive Pericarditis"]
    },
    conventionalManagement: {
      general: ["Rest during acute phase"],
      medical: ["NSAIDs (High-dose Aspirin or Ibuprofen)", "Colchicine (prevents recurrence)"],
      surgical: ["Pericardiocentesis (if tamponade)", "Pericardiectomy (for constrictive form)"],
      prevention: ["Treating underlying TB or uremia"]
    },
    homoeopathicApproach: "Homoeopathy targets the serous inflammation and the underlying miasmatic cause (often Tubercular). Remedies are selected based on the character of the pain and its modalities.",
    relatedRemedies: [
      {
        name: "Bryonia Alba",
        id: "bryonia",
        keyIndications: "Sharp stitching pain; worse from least movement; better lying on the painful side.",
        modalities: "Agg: Motion. Amel: Absolute rest.",
        potencyTips: "30C."
      },
      {
        name: "Colchicum Autumnale",
        id: "colchicum",
        keyIndications: "Pericarditis after rheumatism; heart feels as if squeezed by an iron band.",
        potencyTips: "30C."
      },
      {
        name: "Spigelia Anthelmia",
        id: "spigelia",
        keyIndications: "Violent stitching pain synchronous with pulse; visible palpitations; worse lying on left side.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["pericardial-effusion", "myocarditis", "rheumatic-fever"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Positional pain", "Friction rub", "Diffuse ST elevation"],
      miasmaticDominance: "Tubercular/Syphilitic",
      thermalState: "Chilly",
      organAffinity: "Pericardium (Serous sac)",
      memoryMnemonic: "P-A-I-N: Positional, Augmenting ST segments, Inflammatory rub, Not MI."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to differentiate from MI to avoid unnecessary thrombolysis (which could cause hemorrhage into the pericardium).",
        severityAssessment: "Based on the presence of pericardial fluid and markers of inflammation.",
        referralCriteria: ["Suspicion of Cardiac Tamponade", "High fever or septic appearance", "No response to NSAIDs"]
      },
      individualization: {
        mentalGenerals: ["Irritability; wants to be left alone (Bryonia)", "Anxiety and restlessness"],
        physicalGenerals: {
          thermalState: "Chilly; desires warmth.",
          thirst: "Great thirst for large quantities (Bryonia).",
          appetite: "Aversion to food odors (Colchicum).",
          desires: ["Warmth", "Quiet"],
          aversions: ["Movement", "Being touched"],
          sleep: "Unable to lie down; must sit up.",
          perspiration: "Varies."
        },
        modalities: ["Agg: Motion, Deep breath, Lying on left side", "Amel: Leaning forward, Absolute rest, Pressure"],
        concomitants: ["Dry cough", "Joint pains (Rheumatic history)"],
        characteristicParticulars: ["Stitching, stabbing pains."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Pain relieved by leaning forward and sitting perfectly still (Bryonia)"],
        individualExpression: "The patient feels as if the heart is 'trapped' or 'rubbing' against a rough surface, causing sharp distress."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - INFLAMMATION - Heart - pericardium", chapter: "Chest" },
          { rubric: "Chest - PAIN - Heart - motion, on", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on the 'Modalities of position' and 'History of rheumatism or TB'."
      }
    }
  },
  {
    id: "pericardial-effusion",
    name: "Pericardial Effusion",
    slug: "pericardial-effusion",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "Accumulation of excess fluid in the pericardial sac surrounding the heart.",
    simpleExplanation: "Pericardial effusion is when too much fluid builds up in the space around the heart. This can put pressure on the heart and stop it from pumping normally if it happens too fast.",
    examKeywords: ["Distant heart sounds", "Water-bottle heart", "Electrical alternans", "Echo-free space"],
    epidemiology: {
      ageDistribution: "Occurs at any age depending on cause.",
      sexDistribution: "Equal distribution.",
      riskGroups: ["Cancer patients", "TB patients", "Patients with renal failure"],
      publicHealthRelevance: "Often the next step after acute pericarditis."
    },
    etiology: {
      predisposingFactors: ["Acute pericarditis", "Heart surgery"],
      precipitatingFactors: ["Tuberculosis (common in India)", "Malignancy (Lung, Breast)", "Hypothyroidism (Myxedema)"],
      riskFactors: ["Uremia", "Autoimmune diseases", "Radiation"]
    },
    pathophysiology: {
      steps: [
        { title: "Fluid Accumulation", description: "Inflammation or obstruction to lymphatic drainage causes fluid buildup." },
        { title: "Volume vs. Pressure", description: "If fluid builds slowly, the pericardium stretches; if fast, pressure rises quickly." },
        { title: "Chamber Compression", description: "High pressure in the sac compresses the heart chambers, especially the right side." }
      ]
    },
    classification: {
      type: "Fluid Character",
      details: ["Serous (CHF)", "Serosanguinous (Cancer, TB)", "Hemorrhagic (Trauma, Aortic rupture)", "Purulent (Bacterial infection)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Muffled or distant chest sensations", "Shortness of breath"],
      localSymptoms: ["Hoarseness (Reccurent laryngeal nerve pressure)", "Hiccups (Phrenic nerve pressure)"],
      constitutionalFeatures: ["Fatigue", "Dull chest ache"],
      importantSigns: ["Distant (muffled) heart sounds", "Ewart sign (dullness over left lung base)"],
      diseaseProgression: "Silent/Asymptomatic → Dyspnea → Cardiac Tamponade."
    },
    redFlags: [
      "Hypotension",
      "Engorged neck veins (JVP)",
      "Paradoxical pulse"
    ],
    investigations: {
      diagnostic: [
        { name: "Chest X-ray", findings: "Water-bottle shaped heart", importance: "Detects large effusions (>250ml)" },
        { name: "ECG", findings: "Low voltage QRS, Electrical alternans", importance: "Suggests large effusion" }
      ],
      goldStandard: { name: "Echocardiogram", findings: "Echo-free space around the heart", importance: "Confirm and quantifies fluid" },
      laboratoryFindings: [
        { name: "Pericardial Fluid Analysis", findings: "Cytology, Cultures, ADA", importance: "Determines the cause (TB, Cancer)" }
      ]
    },
    diagnosticCriteria: {
      title: "Imaging Diagnosis",
      criteria: ["Echocardiographic identification of fluid", "Quantification: Small (<10mm), Medium (10-20mm), Large (>20mm)"]
    },
    differentialDiagnosis: [
      { condition: "Cardiomegaly", distinguishingFeatures: "Double apex beat, specific X-ray findings.", slug: "heart-failure" },
      { condition: "Pleural Effusion", distinguishingFeatures: "Fluid in lung space, not heart sac, visible on X-ray/Echo." }
    ],
    complications: {
      common: ["Muffled heart sounds"],
      serious: ["Cardiac Tamponade"],
      lifeThreatening: ["Circulatory collapse"]
    },
    conventionalManagement: {
      general: ["Treating the underlying cause"],
      medical: ["NSAIDs", "Corticosteroids (for inflammatory causes)"],
      surgical: ["Pericardiocentesis (Needle drainage)", "Pericardial window (for recurrent fluid)"],
      prevention: ["Early treatment of pericarditis"]
    },
    homoeopathicApproach: "Focuses on 'Apis' and 'Kali' groups for absorption of serous fluid and addresses the tubercular or sycotic miasm.",
    relatedRemedies: [
      {
        name: "Apis Mellifica",
        id: "apis",
        keyIndications: "Dropsy without thirst; stinging pains; heart symptoms with edema of face.",
        modalities: "Agg: Heat. Amel: Cold application.",
        potencyTips: "30C."
      },
      {
        name: "Kali Carbonicum",
        id: "kali-carb",
        keyIndications: "Hydropericardium; sharp stitching pains; puffiness of upper eyelids; worse 3 AM.",
        potencyTips: "200C."
      },
      {
        name: "Digitalis",
        id: "digitalis",
        keyIndications: "Effusion with extremely slow pulse and failing heart.",
        potencyTips: "3X or 30C."
      }
    ],
    relatedDiseases: ["pericarditis", "cardiac-tamponade", "hypothyroidism"],
    examPriority: "Medium",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Water-bottle heart", "Muffled heart sounds", "Electrical alternans"],
      miasmaticDominance: "Sycotic (Accumulation)",
      thermalState: "Variable",
      organAffinity: "Pericardium",
      memoryMnemonic: "W-A-T-E-R: Water-bottle shape, Alternans (electrical), Tamponade risk, Echo is best, Reduced heart sounds."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Vital to monitor fluid volume to prevent the transition to life-threatening cardiac tamponade.",
        severityAssessment: "Based on echo measurement of fluid thickness and the presence of right ventricular collapse.",
        referralCriteria: ["Rapidly increasing fluid", "Signs of Tamponade (Low BP, High JVP)"]
      },
      individualization: {
        mentalGenerals: ["Apathy (Digitalis)", "Irritability (Kali-carb)"],
        physicalGenerals: {
          thermalState: "Variable; Apis is hot, Kali-carb is chilly.",
          thirst: "Thirstless (Apis).",
          appetite: "Poor.",
          desires: ["Fresh air", "Cold things (Apis)"],
          aversions: ["Heat"],
          sleep: "Waking at 3 AM with breathlessness (Kali-c).",
          perspiration: "Varies."
        },
        modalities: ["Agg: Heat (Apis), 3 AM (Kali-c), Lying down", "Amel: Sitting up, Cold air"],
        concomitants: ["Edema of eyelids/face", "Albuminuria"],
        characteristicParticulars: ["Pulse is slow and intermittent (Digitalis)."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Puffiness like a little bag between eyebrow and upper lid (Kali-carb)"],
        individualExpression: "The patient feels 'damp' or 'waterlogged', with the heart struggling to beat against an external fluid weight."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - DROPSY - Heart - pericardium", chapter: "Chest" },
          { rubric: "Face - EDEMA", chapter: "Face" }
        ],
        symptomAnalysis: "Focus on 'Fluid absorption' remedies and 'Thirst' patterns."
      }
    }
  },
  {
    id: "cardiac-tamponade",
    name: "Cardiac Tamponade",
    slug: "cardiac-tamponade",
    system: "cardiovascular",
    category: "Emergency",
    definition: "An emergency condition characterized by accumulation of fluid in the pericardium, creating enough pressure to compress the heart and severely impair its ability to pump blood.",
    simpleExplanation: "Cardiac tamponade is a life-threatening emergency where fluid builds up so much pressure around the heart that the heart can't fill with blood. This leads to a sudden and dangerous drop in blood pressure.",
    examKeywords: ["Beck's Triad", "Pulsus paradoxus", "Pericardiocentesis", "Low BP + High JVP"],
    epidemiology: {
      ageDistribution: "Any age.",
      sexDistribution: "Equal.",
      riskGroups: ["Trauma patients", "Patients with large effusions", "Aortic dissection patients"],
      publicHealthRelevance: "A fatal emergency if not treated within minutes/hours."
    },
    etiology: {
      predisposingFactors: ["Pericardial effusion", "Chest trauma"],
      precipitatingFactors: ["Aortic rupture", "Cardiac surgery", "Post-MI heart rupture", "Malignancy"],
      riskFactors: ["Anticoagulation use in pericarditis"]
    },
    pathophysiology: {
      steps: [
        { title: "Critical Fluid Level", description: "Pericardial fluid reaches a volume where the sac cannot stretch further." },
        { title: "Intrapericardial Pressure", description: "Pressure exceeds the pressure in the heart chambers (especially during diastole)." },
        { title: "Diastolic Collapse", description: "The heart cannot fill with blood because the external pressure is too high." },
        { title: "Low Cardiac Output", description: "Less blood is pumped out, leading to shock and death." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["Severe shortness of breath", "Panic and anxiety"],
      localSymptoms: ["Chest pressure"],
      constitutionalFeatures: ["Confusion", "Extreme weakness"],
      importantSigns: ["Beck's Triad: Hypotension, JVP elevation, Muffled heart sounds", "Pulsus Paradoxus (SBP drops >10mmHg on inspiration)"],
      diseaseProgression: "Rapid progression to cardiac arrest."
    },
    redFlags: [
      "Beck's Triad is the ultimate red flag",
      "Patient is gasping for air",
      "Very low BP"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "Electrical alternans (QRS size varies every other beat)", importance: "Suggests the heart is swinging in fluid" }
      ],
      goldStandard: { name: "Echocardiogram", findings: "Right ventricular diastolic collapse", importance: "Confirms Tamponade" }
    },
    diagnosticCriteria: {
      title: "Clinical Diagnosis",
      criteria: ["Hypotension", "Distended neck veins", "Pulsus paradoxus", "Echo evidence of chamber collapse"]
    },
    differentialDiagnosis: [
      { condition: "Tension Pneumothorax", distinguishingFeatures: "Absent breath sounds, tracheal deviation.", slug: "respiratory" },
      { condition: "Constrictive Pericarditis", distinguishingFeatures: "Chronic course, Kussmaul sign present." },
      { condition: "Hypovolemic Shock", distinguishingFeatures: "Low JVP (flat neck veins).", slug: "shock" }
    ],
    complications: {
      common: ["Low output state"],
      serious: ["Acute Renal Failure"],
      lifeThreatening: ["Cardiac Arrest", "Death"]
    },
    conventionalManagement: {
      general: ["Emergency hospitalization", "IV fluid bolus (to maintain filling pressure)"],
      medical: ["Oxygen"],
      emergency: ["Emergency Pericardiocentesis (Needle drainage of fluid)"],
      prevention: ["Early drainage of pericardial effusions"]
    },
    homoeopathicApproach: "Cardiac Tamponade is a mechanical emergency. Homoeopathic remedies like Aconite can address the extreme panic while the patient is being prepared for emergency surgical drainage. It is NOT a substitute for drainage.",
    relatedRemedies: [
      {
        name: "Aconitum Napellus",
        id: "aconite",
        keyIndications: "Extreme anxiety, fear of death, gasping for breath.",
        potencyTips: "200C."
      },
      {
        name: "Digitalis Purpurea",
        id: "digitalis",
        keyIndications: "Failing heart, pulse weak and intermittent.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["pericardial-effusion", "pericarditis", "aortic-aneurysm"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Beck's Triad", "Pulsus paradoxus", "Pericardiocentesis is life-saving"],
      miasmaticDominance: "Syphilitic (Crisis)",
      thermalState: "Cold, clammy",
      organAffinity: "Heart (Mechanical compression)",
      memoryMnemonic: "B-E-C-K: BP low, Effusion (muffled sounds), Central venous pressure high (JVP), Kussmaul (rarely) / Key is Echo."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "The difference between life and death; clinical suspicion must be immediate as the patient can die within minutes.",
        severityAssessment: "Based on the degree of hypotension and respiratory distress.",
        referralCriteria: ["ANY suspected Cardiac Tamponade is a code-blue emergency."]
      },
      individualization: {
        mentalGenerals: ["Intense panic (Aconite)", "Sense of impending doom"],
        physicalGenerals: {
          thermalState: "Cold, clammy skin.",
          thirst: "N/A (Emergency).",
          appetite: "N/A.",
          desires: ["Air"],
          aversions: ["N/A"],
          sleep: "Inability to lie down.",
          perspiration: "Cold sweat of shock."
        },
        modalities: ["Agg: Lying down, Inspiration (for BP drop)", "Amel: Sitting up and leaning forward"],
        concomitants: ["Engorged carotids", "Cyanosis"],
        characteristicParticulars: ["Muffled, distant heart sounds."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Intense fear of death, predicts the very hour of death (Aconite)"],
        individualExpression: "The patient's heart is 'strangled' from the outside, leading to a desperate struggle for circulation."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - DROPSY - Heart - pericardium - accompanied by - compression", chapter: "Chest" },
          { rubric: "Mind - FEAR - death, of", chapter: "Mind" }
        ],
        symptomAnalysis: "Supportive remedies during the emergency procedure."
      }
    }
  },
  {
    id: "cardiomyopathy",
    name: "Cardiomyopathy",
    slug: "cardiomyopathy",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A heterogeneous group of diseases of the myocardium associated with mechanical and/or electrical dysfunction that usually exhibit inappropriate ventricular hypertrophy or dilatation.",
    simpleExplanation: "Cardiomyopathy is a disease of the heart muscle that makes it harder for the heart to pump blood to the rest of the body. The heart muscle can become thick, stiff, or thin and weak.",
    examKeywords: ["HOCM", "Dilated", "Restrictive", "Sudden cardiac death", "S4 gallop"],
    epidemiology: {
      ageDistribution: "Depends on type; HOCM often presents in young athletes.",
      sexDistribution: "Varies by type.",
      riskGroups: ["Individuals with family history of sudden death", "Post-viral patients"],
      publicHealthRelevance: "Major cause of heart failure and sudden death."
    },
    etiology: {
      predisposingFactors: ["Genetic mutations (especially in HOCM)", "Alcohol/Toxins"],
      precipitatingFactors: ["Viral myocarditis", "Pregnancy (Peripartum)"],
      riskFactors: ["Hypertension", "Diabetes", "Iron overload (Hemochromatosis)"]
    },
    pathophysiology: {
      steps: [
        { title: "Genetic/Environmental Trigger", description: "Myocytes are either damaged or genetically programmed to grow abnormally." },
        { title: "Structural Change", description: "The heart either dilates (Dilated), thickens (Hypertrophic), or becomes stiff (Restrictive)." },
        { title: "Functional Impairment", description: "The heart fails to fill (diastolic) or pump (systolic) effectively." }
      ]
    },
    classification: {
      type: "Morphological Basis",
      details: ["Dilated (DCM) - Commonest", "Hypertrophic (HCM/HOCM)", "Restrictive (RCM)", "Arrhythmogenic Right Ventricular (ARVC)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Dyspnea", "Fatigue", "Chest pain"],
      localSymptoms: ["Palpitations", "Syncope (especially during exercise in HOCM)"],
      constitutionalFeatures: ["Edema", "Weight gain from fluid"],
      importantSigns: ["S3/S4 gallop", "Murmurs (Systolic murmur in HOCM that increases with Valsalva)"],
      diseaseProgression: "Gradual progression to chronic heart failure."
    },
    redFlags: [
      "Syncope during exertion",
      "Family history of sudden cardiac death at <40 years",
      "Severe arrhythmias"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "LVH, T-wave inversion, pathological Q waves", importance: "Initial screening" },
        { name: "Cardiac MRI", findings: "Late gadolinium enhancement", importance: "Helps differentiate types" }
      ],
      goldStandard: { name: "Echocardiography", findings: "Measurement of wall thickness and chamber size", importance: "Primary diagnostic tool" },
      laboratoryFindings: [
        { name: "BNP", findings: "Elevated", importance: "Reflects heart strain" },
        { name: "Genetic testing", findings: "Specific mutations", importance: "Crucial for family screening" }
      ]
    },
    diagnosticCriteria: {
      title: "Imaging Standards",
      criteria: ["LV wall thickness ≥15mm in HCM", "Reduced EF with chamber dilation in DCM", "Normal chamber size but severe diastolic dysfunction in RCM"]
    },
    differentialDiagnosis: [
      { condition: "Athlete's Heart", distinguishingFeatures: "Normal diastolic function, reverses with detraining." },
      { condition: "Hypertensive Heart Disease", distinguishingFeatures: "Symmetrical hypertrophy, history of long-term HTN.", slug: "hypertension" },
      { condition: "Ischemic Cardiomyopathy", distinguishingFeatures: "History of MI, CAD visible on angiography.", slug: "myocardial-infarction" }
    ],
    complications: {
      common: ["Atrial Fibrillation"],
      serious: ["Heart Failure", "Systemic Embolism"],
      lifeThreatening: ["Sudden Cardiac Death", "Ventricular Arrhythmias"]
    },
    conventionalManagement: {
      general: ["Activity restriction in HOCM", "Avoidance of dehydration"],
      medical: ["Beta-blockers", "Calcium Channel Blockers", "Diuretics", "Anticoagulation"],
      surgical: ["Septal Myectomy (for HOCM)", "Heart Transplant", "ICD placement"],
      prevention: ["Genetic counseling for relatives"]
    },
    homoeopathicApproach: "Homoeopathy targets the constitutional and miasmatic background (often Syphilitic/Tubercular) to improve myocardial function and quality of life.",
    relatedRemedies: [
      {
        name: "Baryta Carbonica",
        id: "baryta-carb",
        keyIndications: "Hypertrophied heart with mental and physical sluggishness; especially in older patients or delayed development.",
        potencyTips: "200C."
      },
      {
        name: "Spigelia",
        id: "spigelia",
        keyIndications: "Violent palpitations; stitching pain; worse lying on left side.",
        potencyTips: "200C."
      },
      {
        name: "Lycopodium",
        id: "lycopodium",
        keyIndications: "Dilated heart with digestive issues; worse 4-8 PM; desire for warm things.",
        potencyTips: "200C or 1M."
      }
    ],
    relatedDiseases: ["heart-failure", "atrial-fibrillation", "hypertension"],
    examPriority: "Medium",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["HOCM risk in athletes", "DCM is commonest", "Genetic link"],
      miasmaticDominance: "Syphilitic (Structural change)",
      thermalState: "Variable",
      organAffinity: "Myocardium",
      memoryMnemonic: "H-D-R: Hypertrophic (Thick), Dilated (Thin/Weak), Restrictive (Stiff)."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical for risk stratification and determining if the patient needs an ICD to prevent sudden death.",
        severityAssessment: "Based on symptoms (NYHA Class) and Ejection Fraction.",
        referralCriteria: ["Family history of sudden death", "Syncope", "Severely reduced EF (<35%)"]
      },
      individualization: {
        mentalGenerals: ["Apprehension about the future", "Mental exhaustion", "Irritability"],
        physicalGenerals: {
          thermalState: "Varies.",
          thirst: "Varies.",
          appetite: "Poor; abdominal bloating.",
          desires: ["Fresh air", "Warm food"],
          aversions: ["Tight clothing"],
          sleep: "Orthopnea.",
          perspiration: "Cold, on forehead."
        },
        modalities: ["Agg: Exertion, Lying on left side, Emotion", "Amel: Rest, Sitting up"],
        concomitants: ["Chronic digestive weakness", "Peripheral edema"],
        characteristicParticulars: ["Sensation as if the heart were too large for its space."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Heart feels as if it were jumping about like a bird in a cage (Cactus)"],
        individualExpression: "The patient feels as if the 'rhythm of life' is mechanically hindered or unstable."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - HYPERTROPHY - Heart", chapter: "Chest" },
          { rubric: "Generalities - WEAKNESS - heart, from", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on the 'Constitutional totality' and 'Organic changes'."
      }
    }
  },
  {
    id: "atrial-fibrillation",
    name: "Atrial Fibrillation (AF)",
    slug: "atrial-fibrillation",
    system: "cardiovascular",
    category: "Arrhythmia",
    definition: "A supraventricular tachyarrhythmia characterized by uncoordinated atrial activation with consequent deterioration of atrial mechanical function.",
    simpleExplanation: "Atrial fibrillation is an irregular and often very rapid heart rhythm. The heart's upper chambers (atria) beat out of sync with the lower chambers (ventricles), which can lead to blood clots and stroke.",
    examKeywords: ["Irregularly irregular", "No P waves", "Stroke risk", "CHA2DS2-VASc"],
    epidemiology: {
      ageDistribution: "Incidence increases with age (>10% in those >80 years).",
      sexDistribution: "More common in men.",
      riskGroups: ["Elderly", "Hypertensive patients", "Patients with valvular disease"],
      publicHealthRelevance: "A major cause of ischemic stroke."
    },
    etiology: {
      predisposingFactors: ["Hypertension", "Mitral Valve Disease", "Ischemic Heart Disease"],
      precipitatingFactors: ["Hyperthyroidism", "Alcohol (Holiday Heart)", "Caffeine", "Pneumonia/Sepsis"],
      riskFactors: ["Obesity", "Sleep Apnea", "Diabetes"]
    },
    pathophysiology: {
      steps: [
        { title: "Trigger", description: "Rapid firing usually from the pulmonary veins." },
        { title: "Re-entry", description: "Multiple small waves of electrical activity circle around the atria." },
        { title: "Structural Remodeling", description: "Persistent AF causes the atria to dilate and scar, making AF harder to stop." },
        { title: "Thromboembolism", description: "Blood pools in the left atrial appendage, forming clots." }
      ]
    },
    classification: {
      type: "Duration Basis",
      details: ["Paroxysmal: Ends within 7 days", "Persistent: Lasts >7 days", "Permanent: Long-term AF where rhythm control is abandoned"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Palpitations (fluttering)", "Fatigue", "Lightheadedness"],
      localSymptoms: ["Chest discomfort", "Shortness of breath"],
      constitutionalFeatures: ["Exercise intolerance"],
      importantSigns: ["Irregularly irregular pulse", "Deficit between apical and radial pulse rate"],
      diseaseProgression: "Often starts as short episodes and becomes permanent over time."
    },
    redFlags: [
      "Sudden neurological deficit (Stroke)",
      "Syncopal attack",
      "Severe chest pain",
      "Hypotension"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "Absent P waves, irregular R-R intervals, f-waves", importance: "Definitive diagnosis" },
        { name: "Holter Monitor", findings: "Intermittent AF episodes", importance: "For paroxysmal cases" }
      ],
      goldStandard: { name: "ECG (12-Lead)", findings: "Irregularly irregular rhythm", importance: "Gold Standard" },
      laboratoryFindings: [
        { name: "TFT (TSH/T4)", findings: "Suppressed TSH (if hyperthyroid)", importance: "Rules out thyrotoxicosis" },
        { name: "Electrolytes", findings: "Hypokalemia/Hypomagnesemia", importance: "Can trigger AF" }
      ]
    },
    diagnosticCriteria: {
      title: "ECG Criteria",
      criteria: ["Absolutely irregular R-R intervals", "No distinct P waves", "Atrial cycle length <200ms"]
    },
    differentialDiagnosis: [
      { condition: "Atrial Flutter", distinguishingFeatures: "Regular pulse, 'saw-tooth' waves on ECG." },
      { condition: "Frequent Ectopics", distinguishingFeatures: "Rhythm is mostly regular with occasional 'skipped' beats." },
      { condition: "SVT", distinguishingFeatures: "Regular rapid pulse, usually sudden onset/offset.", slug: "supraventricular-tachycardia" }
    ],
    complications: {
      common: ["Tachy-brady syndrome"],
      serious: ["Congestive Heart Failure", "Dementia (vascular)"],
      lifeThreatening: ["Ischemic Stroke", "Systemic Embolism"]
    },
    conventionalManagement: {
      general: ["Rate control vs Rhythm control", "Stroke prevention"],
      medical: ["Beta-blockers", "Digoxin", "Warfarin/DOACs (for stroke prevention)", "Amiodarone"],
      surgical: ["DC Cardioversion", "Catheter Ablation", "Left Atrial Appendage Closure"],
      prevention: ["Treating HTN and Obesity"]
    },
    homoeopathicApproach: "Homoeopathy focuses on the 'tremulous' state of the heart and the patient's reaction to the irregular rhythm. Remedies are selected for the 'Atrial' irritation and constitutional stability.",
    relatedRemedies: [
      {
        name: "Digitalis",
        id: "digitalis",
        keyIndications: "Irregular pulse with slow or rapid rate; heart feels as if it will stop; extreme anxiety.",
        potencyTips: "30C."
      },
      {
        name: "Lachesis",
        id: "lachesis",
        keyIndications: "Palpitations worse from sleep; cannot bear anything tight; left-sided symptoms.",
        potencyTips: "200C."
      },
      {
        name: "Lycopus Virginicus",
        id: "lycopus",
        keyIndications: "Aneurysmal heart; irregular pulse with cough and hemoptysis; very useful in hyperthyroid-induced AF.",
        potencyTips: "Q or 3X."
      }
    ],
    relatedDiseases: ["rheumatic-heart-disease", "hypertension", "heart-failure"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Irregularly irregular", "No P waves", "Stroke prevention (Anticoagulation) is vital"],
      miasmaticDominance: "Sycotic (Irregularity/Coordination failure)",
      thermalState: "Varies",
      organAffinity: "Atria",
      memoryMnemonic: "P-I-R-A-T-E-S: Pulmonary, Ischemic, Rheumatic, Anemia, Thyrotoxicosis, Ethanol, Sepsis (Causes)."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to assess stroke risk using CHA2DS2-VASc score and decide on anticoagulation.",
        severityAssessment: "Based on heart rate and symptoms (EHRA Score).",
        referralCriteria: ["AF with rapid ventricular response (>150 bpm)", "Suspected stroke", "Hemodynamic instability"]
      },
      individualization: {
        mentalGenerals: ["Anxiety about the irregular beat", "Fear of death during palpitations", "Restlessness"],
        physicalGenerals: {
          thermalState: "Variable.",
          thirst: "Varies.",
          appetite: "Normal or poor.",
          desires: ["Cold water", "Open air"],
          aversions: ["Tight clothing (Lachesis)", "Warm rooms"],
          sleep: "Waking with heart 'thumping' or skipping.",
          perspiration: "Anxious sweat."
        },
        modalities: ["Agg: Sleep (Lachesis), Emotion, Caffeine, Lying on left side", "Amel: Slow motion, Sitting up"],
        concomitants: ["Trembling of limbs", "Shortness of breath"],
        characteristicParticulars: ["Sensation of a bird fluttering in the chest."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Heart feels as if it were suspended by a thread and would break (Lachesis)"],
        individualExpression: "The patient feels a sense of 'internal chaos' or lack of control over their life's rhythm."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - PALPITATIONS - heart - irregular", chapter: "Chest" },
          { rubric: "Chest - HEART - Fibrillation", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on 'Irregularity' and 'Anxiety' totality."
      }
    }
  },
  {
    id: "supraventricular-tachycardia",
    name: "Supraventricular Tachycardia (SVT)",
    slug: "supraventricular-tachycardia",
    system: "cardiovascular",
    category: "Arrhythmia",
    definition: "A rapid heart rhythm originating above the ventricles, typically characterized by a sudden onset and offset of regular tachycardia.",
    simpleExplanation: "SVT is a condition where the heart suddenly starts beating very fast. It's caused by 'short-circuits' in the heart's electrical system, usually in the upper chambers.",
    examKeywords: ["Narrow QRS", "Regular rhythm", "Vagal maneuvers", "Adenosine"],
    epidemiology: {
      ageDistribution: "Common in young adults and those with healthy hearts.",
      sexDistribution: "More common in women.",
      riskGroups: ["WPW Syndrome patients", "Caffeine/Stress prone individuals"],
      publicHealthRelevance: "Common cause of sudden palpitations in the ER."
    },
    etiology: {
      predisposingFactors: ["Accessory pathways (WPW)", "Dual AV nodal pathways"],
      precipitatingFactors: ["Stress", "Caffeine", "Nicotine", "Alcohol", "Physical exertion"],
      riskFactors: ["Hyperthyroidism", "Electrolyte imbalance"]
    },
    pathophysiology: {
      steps: [
        { title: "Trigger", description: "A premature atrial beat triggers the circuit." },
        { title: "Re-entry", description: "The electrical signal travels down one pathway and back up another, creating a loop." },
        { title: "Rapid Rate", description: "The loop allows the heart to beat at 150-250 bpm." }
      ]
    },
    classification: {
      type: "Mechanism Basis",
      details: ["AVNRT: Loop within the AV node (Commonest)", "AVRT: Loop using an accessory pathway (e.g., WPW)", "Atrial Tachycardia: Focus in the atrium"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Sudden racing heart", "Anxiety"],
      localSymptoms: ["Chest pressure", "Neck pulsations (Frog sign)"],
      constitutionalFeatures: ["Lightheadedness", "Polyuria (after episode ends)"],
      importantSigns: ["Rapid regular pulse (150-250 bpm)", "Hypotension if prolonged"],
      diseaseProgression: "Episodes vary from seconds to hours; usually self-limiting but distressing."
    },
    redFlags: [
      "Syncope",
      "Chest pain",
      "Heart failure signs",
      "Heart rate >250 bpm"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "Regular narrow QRS tachycardia, P waves often hidden", importance: "Confirms SVT" },
        { name: "Holter Monitor", findings: "Captures the sudden onset/offset", importance: "For infrequent episodes" }
      ],
      goldStandard: { name: "EPS (Electrophysiology Study)", findings: "Induction of re-entry", importance: "Definitive and curative via ablation" }
    },
    diagnosticCriteria: {
      title: "ECG Criteria",
      criteria: ["Rate 150-250 bpm", "Regular rhythm", "Narrow QRS complexes (<120ms)"]
    },
    differentialDiagnosis: [
      { condition: "Sinus Tachycardia", distinguishingFeatures: "Gradual onset, P waves present, related to fever/exercise.", slug: "cardiovascular" },
      { condition: "Atrial Flutter", distinguishingFeatures: "Saw-tooth waves, often 2:1 block.", slug: "atrial-fibrillation" },
      { condition: "Ventricular Tachycardia", distinguishingFeatures: "Wide QRS, hemodynamically unstable.", slug: "ventricular-tachycardia" }
    ],
    complications: {
      common: ["Panic attacks"],
      serious: ["Heart failure (if prolonged)", "Tachycardia-induced cardiomyopathy"],
      lifeThreatening: ["Sudden cardiac arrest (rare, mostly in WPW)"]
    },
    conventionalManagement: {
      general: ["Vagal maneuvers (Valsalva, Carotid massage)"],
      medical: ["Adenosine (IV)", "Beta-blockers", "Calcium Channel Blockers"],
      surgical: ["Catheter Ablation (Permanent cure)", "DC Cardioversion (if unstable)"],
      prevention: ["Avoid triggers like caffeine and stress"]
    },
    homoeopathicApproach: "Homoeopathy targets the 'suddenness' and the triggering 'vulnerability' of the nervous system. Remedies are selected for the acute panic and the underlying miasm.",
    relatedRemedies: [
      {
        name: "Aconitum Napellus",
        id: "aconite",
        keyIndications: "Sudden onset; great fear of death; palpitations with anxiety.",
        potencyTips: "200C."
      },
      {
        name: "Coffea Cruda",
        id: "coffea",
        keyIndications: "Tachycardia from sudden joy or excitement; over-sensitive nervous system.",
        potencyTips: "200C."
      },
      {
        name: "Spigelia",
        id: "spigelia",
        keyIndications: "Violent pulsations that can be seen through clothes; stitching pains.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["atrial-fibrillation", "hyperthyroidism"],
    examPriority: "Medium",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Narrow QRS", "Regular rhythm", "Vagal maneuvers first"],
      miasmaticDominance: "Psora (Irritability)",
      thermalState: "Variable",
      organAffinity: "Conductive system of the heart",
      memoryMnemonic: "S-V-T: Sudden, Very fast, Treated with vagal/adenosine."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to differentiate SVT from life-threatening VT and to identify WPW syndrome which carries a risk of sudden death.",
        severityAssessment: "Based on frequency of episodes and hemodynamic response.",
        referralCriteria: ["SVT with syncope or chest pain", "Incessant SVT", "Evidence of pre-excitation (WPW) on baseline ECG"]
      },
      individualization: {
        mentalGenerals: ["Intense panic (Aconite)", "Nervous excitement (Coffea)", "Fear of future attacks"],
        physicalGenerals: {
          thermalState: "Varies.",
          thirst: "Increased during attack.",
          appetite: "Normal.",
          desires: ["Fresh air", "Cold water"],
          aversions: ["Noise", "Light"],
          sleep: "Inability to sleep from 'vibration' in chest.",
          perspiration: "Cold sweat of anxiety."
        },
        modalities: ["Agg: Sudden emotion, Caffeine, Stooping", "Amel: Cold water, Rest, Lying on back"],
        concomitants: ["Polyuria (passing large amounts of urine)", "Throbbing carotids"],
        characteristicParticulars: ["Sudden 'click' or 'snap' felt when rhythm starts or stops."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Sensation as if the heart were jumping into the throat (Naja)"],
        individualExpression: "The patient feels as if their heart is 'racing out of control' without any physical effort."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - PALPITATIONS - heart - sudden", chapter: "Chest" },
          { rubric: "Chest - HEART - Tachycardia", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on 'Suddenness' and 'Mental concomitants'."
      }
    }
  },
  {
    id: "ventricular-tachycardia",
    name: "Ventricular Tachycardia (VT)",
    slug: "ventricular-tachycardia",
    system: "cardiovascular",
    category: "Emergency",
    definition: "A rapid heart rhythm originating from the ventricles, typically defined as three or more consecutive ventricular beats at a rate greater than 100 bpm.",
    simpleExplanation: "VT is a very fast and dangerous heart rhythm starting in the heart's lower chambers. It often prevents the heart from pumping enough blood, leading to fainting or cardiac arrest.",
    examKeywords: ["Wide QRS", "AV dissociation", "Capture/Fusion beats", "Amiodarone/Shock"],
    epidemiology: {
      ageDistribution: "Most common in middle-aged and older adults with heart disease.",
      sexDistribution: "More common in men.",
      riskGroups: ["Post-MI patients", "Patients with low EF", "Patients with electrolyte issues"],
      publicHealthRelevance: "A leading cause of sudden cardiac death."
    },
    etiology: {
      predisposingFactors: ["Prior Myocardial Infarction (Scar tissue)", "Cardiomyopathy"],
      precipitatingFactors: ["Hypokalemia", "Hypomagnesemia", "Ischemia", "Drugs (QT prolonging)"],
      riskFactors: ["Heart failure", "Severe valvular disease"]
    },
    pathophysiology: {
      steps: [
        { title: "Trigger", description: "Ischemia or scar tissue creates an area of abnormal electrical activity." },
        { title: "Re-entry", description: "The signal circles around a scar, firing rapidly." },
        { title: "Hemodynamic Collapse", description: "The rapid rate doesn't allow the heart to fill, causing BP to drop." }
      ]
    },
    classification: {
      type: "Clinical Form",
      details: ["Monomorphic: All complexes look same (Scar-related)", "Polymorphic: Complexes vary (Ischemia/Torsades)", "Non-sustained: Lasts <30 seconds"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Severe palpitations", "Extreme dizziness"],
      localSymptoms: ["Chest pain", "Shortness of breath"],
      constitutionalFeatures: ["Sudden collapse"],
      importantSigns: ["Rapid regular pulse", "Hypotension", "Signs of shock"],
      diseaseProgression: "Often degenerates into Ventricular Fibrillation (Cardiac arrest)."
    },
    redFlags: [
      "Syncope",
      "Low blood pressure",
      "History of MI with new palpitations"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "Wide QRS (>120ms), Regular, Rate 140-250", importance: "Primary diagnosis" },
        { name: "Electrolytes", findings: "Low Potassium or Magnesium", importance: "Reversible causes" }
      ],
      goldStandard: { name: "ECG during the event", findings: "Wide complex tachycardia", importance: "Diagnosis" }
    },
    diagnosticCriteria: {
      title: "Brugada Algorithm",
      criteria: ["Absence of RS complex in precordial leads", "R to S interval >100ms", "AV dissociation"]
    },
    differentialDiagnosis: [
      { condition: "SVT with Aberrancy", distinguishingFeatures: "Specific ECG criteria (e.g., typical RBBB/LBBB pattern).", slug: "supraventricular-tachycardia" }
    ],
    complications: {
      common: ["Hypotension"],
      serious: ["Heart Failure"],
      lifeThreatening: ["Ventricular Fibrillation", "Sudden Cardiac Death"]
    },
    conventionalManagement: {
      general: ["Emergency ACLS protocol"],
      medical: ["Amiodarone", "Lidocaine", "Magnesium (for Torsades)"],
      emergency: ["DC Cardioversion (if has pulse but unstable)", "Defibrillation (if pulseless)"],
      prevention: ["ICD (Implantable Cardioverter Defibrillator)", "Beta-blockers"]
    },
    homoeopathicApproach: "VT is a life-threatening emergency. Homoeopathic remedies like Lachesis or Arsenic can be used for the post-arrest or post-shocks state to stabilize the vital force and address the underlying ischemic/scarred state.",
    relatedRemedies: [
      {
        name: "Lachesis",
        id: "lachesis",
        keyIndications: "Intense thumping; worse lying on left side; cannot bear touch; sense of suffocation.",
        potencyTips: "200C."
      },
      {
        name: "Arsenicum Album",
        id: "arsenic",
        keyIndications: "Extreme prostration; cold sweat; fear of death; restlessness.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["myocardial-infarction", "heart-failure", "cardiomyopathy"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Wide QRS", "AV dissociation", "Emergency shock/Amiodarone"],
      miasmaticDominance: "Syphilitic (Destructive/Scar)",
      thermalState: "Cold, clammy",
      organAffinity: "Ventricles",
      memoryMnemonic: "W-I-D-E: Wide QRS, Ischemic cause, Dangerous, Emergency shock."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical; failure to recognize VT leads to delay in life-saving defibrillation.",
        severityAssessment: "Based on hemodynamic stability (Pulse present vs Pulseless).",
        referralCriteria: ["ANY wide complex tachycardia is a life-threatening emergency."]
      },
      individualization: {
        mentalGenerals: ["Sudden terror", "Fear of death"],
        physicalGenerals: {
          thermalState: "Cold, clammy skin.",
          thirst: "Burning thirst.",
          appetite: "N/A.",
          desires: ["Air"],
          aversions: ["Tightness"],
          sleep: "Inability to lie flat.",
          perspiration: "Cold sweat of shock."
        },
        modalities: ["Agg: Lying on left side, Emotion", "Amel: Absolute quiet"],
        concomitants: ["Cyanosis", "Pulmonary edema"],
        characteristicParticulars: ["Cannon 'a' waves in the neck."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Sensation as if the heart were being squeezed by an iron hand (Cactus)"],
        individualExpression: "The patient is in the 'last struggle' of the heart muscle before total failure."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - PALPITATIONS - heart - rapid", chapter: "Chest" },
          { rubric: "Mind - FEAR - death, of", chapter: "Mind" }
        ],
        symptomAnalysis: "Focus on 'Shock state' and 'Post-procedure stabilization'."
      }
    }
  },
  {
    id: "heart-block",
    name: "Heart Block (AV Block)",
    slug: "heart-block",
    system: "cardiovascular",
    category: "Arrhythmia",
    definition: "An interruption or delay of electrical conduction from the atria to the ventricles.",
    simpleExplanation: "Heart block is a problem with the electrical signal that tells the heart to beat. The signal is either slowed down or completely blocked, which can cause a very slow heart rate.",
    examKeywords: ["PR interval", "Dropped beats", "Stokes-Adams attacks", "Pacemaker"],
    epidemiology: {
      ageDistribution: "More common in elderly (degenerative changes).",
      sexDistribution: "Equal.",
      riskGroups: ["Post-MI patients", "Patients on Digoxin/Beta-blockers"],
      publicHealthRelevance: "Common cause of fainting and pacemaker insertion in the elderly."
    },
    etiology: {
      predisposingFactors: ["Degeneration of conduction system (Lenegre disease)", "Myocardial Infarction"],
      precipitatingFactors: ["Drugs (Digoxin, Beta-blockers, CCBs)", "Infection (Lyme disease, Myocarditis)"],
      riskFactors: ["Hyperkalemia", "Cardiac surgery"]
    },
    pathophysiology: {
      steps: [
        { title: "Damage", description: "Fibrosis or ischemia damages the AV node or Bundle of His." },
        { title: "Delay/Interruption", description: "Electrical signals are slowed or stopped." },
        { title: "Escape Rhythm", description: "If the block is complete, the ventricles start their own slow 'escape' beat." }
      ]
    },
    classification: {
      type: "Degree Basis",
      details: ["1st Degree: PR interval >0.2s (All signals pass)", "2nd Degree Mobitz I: PR gets longer then drops", "2nd Degree Mobitz II: Sudden dropped beats (Dangerous)", "3rd Degree: Complete block (Atria and ventricles beat independently)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Dizziness", "Fatigue"],
      localSymptoms: ["Lightheadedness", "Shortness of breath"],
      constitutionalFeatures: ["Stokes-Adams attacks (Sudden fainting with rapid recovery)"],
      importantSigns: ["Slow, regular pulse (Bradycardia)", "Cannon 'a' waves in 3rd degree"],
      diseaseProgression: "Mobitz II and 3rd degree often progress to cardiac arrest."
    },
    redFlags: [
      "Syncope (Stokes-Adams)",
      "Heart rate <40 bpm",
      "Heart failure signs"
    ],
    investigations: {
      diagnostic: [
        { name: "ECG", findings: "Prolonged PR, dropped beats, or no relation between P and QRS", importance: "Primary diagnosis" }
      ],
      goldStandard: { name: "ECG/Holter", findings: "Characteristic AV delay or block", importance: "Diagnosis" }
    },
    diagnosticCriteria: {
      title: "ECG Degrees",
      criteria: ["1st: PR >0.2s", "2nd: Intermittent failure of QRS", "3rd: P and QRS totally unrelated"]
    },
    differentialDiagnosis: [
      { condition: "Sinus Bradycardia", distinguishingFeatures: "Normal relation between P and QRS, often in athletes or during sleep." },
      { condition: "Vasovagal Syncope", distinguishingFeatures: "Related to standing/emotion, rapid recovery, normal baseline ECG." }
    ],
    complications: {
      common: ["Reduced exercise tolerance"],
      serious: ["Heart Failure"],
      lifeThreatening: ["Cardiac Arrest", "Sudden Cardiac Death"]
    },
    conventionalManagement: {
      general: ["Review medications (Stop Beta-blockers/Digoxin)"],
      medical: ["Atropine (Acute emergency)", "Isoprenaline"],
      surgical: ["Permanent Pacemaker (Essential for Mobitz II and 3rd Degree)"],
      prevention: ["Treating underlying ischemia"]
    },
    homoeopathicApproach: "Homoeopathy focuses on the 'slowness' of the vital force and myocardial weakness. Remedies like Digitalis are chosen for the characteristic slow pulse and accompanying anxiety.",
    relatedRemedies: [
      {
        name: "Digitalis Purpurea",
        id: "digitalis",
        keyIndications: "Extremely slow, irregular pulse; feeling as if heart will stop if he moves.",
        potencyTips: "30C."
      },
      {
        name: "Abrotanum",
        id: "abrotanum",
        keyIndications: "Slow pulse with wasting; rheumatic history.",
        potencyTips: "30C."
      },
      {
        name: "Kalmia Latifolia",
        id: "kalmia",
        keyIndications: "Remarkably slow pulse with sharp pains; wandering rheumatism.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["myocardial-infarction", "rheumatic-fever"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["3rd degree is emergency", "Stokes-Adams attacks", "Pacemaker is standard"],
      miasmaticDominance: "Syphilitic (Conductive failure)",
      thermalState: "Cold",
      organAffinity: "AV node / Conductive tissue",
      memoryMnemonic: "P-R-S: PR interval (1st), Regular drops (2nd I), Sudden drops (2nd II), Separate beats (3rd)."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical to identify 3rd degree block as it requires an immediate external or internal pacemaker to prevent death.",
        severityAssessment: "Based on the level of block (Atria vs Ventricle) and presence of syncope.",
        referralCriteria: ["ANY 3rd degree block", "Mobitz II block", "Symptomatic bradycardia (<40 bpm)"]
      },
      individualization: {
        mentalGenerals: ["Sluggishness", "Fear that the heart will stop"],
        physicalGenerals: {
          thermalState: "Chilly.",
          thirst: "Varies.",
          appetite: "Poor.",
          desires: ["Fresh air"],
          aversions: ["Tight clothing"],
          sleep: "Drowsiness.",
          perspiration: "Cold, sticky."
        },
        modalities: ["Agg: Motion (Digitalis), Sleep", "Amel: Absolute quiet"],
        concomitants: ["Sudden fainting", "Weakness"],
        characteristicParticulars: ["Pulse is very slow, sometimes skipping every 3rd or 5th beat."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Heart feels as if it would stop beating if the patient moves (Digitalis)"],
        individualExpression: "The patient feels as if their 'internal clock' is slowing down or missing beats."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - HEART - blockage", chapter: "Chest" },
          { rubric: "Generalities - PULSE - slow", chapter: "Generalities" }
        ],
        symptomAnalysis: "Focus on the 'Slow pulse' and 'Rheumatic background'."
      }
    }
  },
  {
    id: "valvular-heart-diseases",
    name: "Valvular Heart Diseases",
    slug: "valvular-heart-diseases",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "A group of conditions where one or more of the heart valves (mitral, aortic, tricuspid, or pulmonary) are damaged or diseased, leading to either stenosis (narrowing) or regurgitation (leakage).",
    simpleExplanation: "Valvular heart disease happens when one of your heart's valves doesn't work right. It might not open fully (stenosis) or not close properly (leakage), making your heart work much harder to pump blood.",
    examKeywords: ["Mitral Stenosis", "Aortic Stenosis", "Murmurs", "Mid-diastolic rumble", "Water-hammer pulse"],
    epidemiology: {
      ageDistribution: "Rheumatic cause common in young; Degenerative cause common in elderly.",
      sexDistribution: "MS common in women; AS common in men.",
      riskGroups: ["Post-rheumatic fever patients", "Elderly", "Endocarditis survivors"],
      publicHealthRelevance: "Major cause of morbidity in developing countries (Rheumatic Heart Disease)."
    },
    etiology: {
      predisposingFactors: ["Rheumatic Fever (commonest in India)", "Congenital (Bicuspid aortic valve)"],
      precipitatingFactors: ["Infective Endocarditis", "Acute MI (causing chordae rupture)"],
      riskFactors: ["Aging", "Hypertension", "IV drug use"]
    },
    pathophysiology: {
      steps: [
        { title: "Valve Damage", description: "Inflammation or calcification damages the valve leaflets." },
        { title: "Pressure/Volume Overload", description: "Stenosis causes pressure overload; Regurgitation causes volume overload." },
        { title: "Chamber Dilation/Hypertrophy", description: "The heart chamber behind the valve enlarges to compensate." },
        { title: "Heart Failure", description: "Eventually, the muscle tires out, leading to failure and pulmonary congestion." }
      ]
    },
    classification: {
      type: "Anatomical Site",
      details: ["Mitral Stenosis (MS)", "Mitral Regurgitation (MR)", "Aortic Stenosis (AS)", "Aortic Regurgitation (AR)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Dyspnea on exertion", "Fatigue"],
      localSymptoms: ["Palpitations", "Hemoptysis (in MS)", "Chest pain (in AS)"],
      constitutionalFeatures: ["Malar flush (in MS)"],
      importantSigns: ["Murmurs (Mid-diastolic in MS, Ejection systolic in AS, Pan-systolic in MR)", "Displaced apex beat"],
      diseaseProgression: "Gradual progression from asymptomatic to congestive heart failure."
    },
    redFlags: [
      "Syncope (especially in AS)",
      "Acute pulmonary edema",
      "New onset Atrial Fibrillation"
    ],
    investigations: {
      diagnostic: [
        { name: "Chest X-ray", findings: "Straightening of left heart border (MS), Globular heart (AR)", importance: "Initial assessment" },
        { name: "ECG", findings: "P-mitrale (MS), LVH (AS/AR)", importance: "Shows chamber strain" }
      ],
      goldStandard: { name: "Echocardiography (2D/Doppler)", findings: "Valve area and pressure gradients", importance: "Confirms diagnosis and severity" }
    },
    diagnosticCriteria: {
      title: "Severity Grading (Echo)",
      criteria: ["Mitral Valve Area <1.0cm² (Severe MS)", "Aortic Mean Gradient >40mmHg (Severe AS)"]
    },
    differentialDiagnosis: [
      { condition: "Heart Failure (other causes)", distinguishingFeatures: "Murmurs are absent or functional.", slug: "heart-failure" },
      { condition: "Anemia", distinguishingFeatures: "Flow murmurs, low Hb levels." }
    ],
    complications: {
      common: ["Atrial Fibrillation"],
      serious: ["Systemic Embolism", "Pulmonary Hypertension"],
      lifeThreatening: ["Congestive Heart Failure", "Infective Endocarditis"]
    },
    conventionalManagement: {
      general: ["Salt restriction", "Activity modification"],
      medical: ["Diuretics", "Anticoagulation (if AF present)", "Penicillin prophylaxis (if Rheumatic)"],
      surgical: ["Balloon Valvotomy", "Valve Replacement (TAVR/SAVR)", "Valve Repair"],
      prevention: ["Prompt treatment of strep throat"]
    },
    homoeopathicApproach: "Homoeopathy targets the chronic miasmatic layer (often Sycotic/Syphilitic) and manages the symptoms of congestion. Remedies are selected for the 'character' of the heart's action.",
    relatedRemedies: [
      {
        name: "Aurum Metallicum",
        id: "aurum",
        keyIndications: "Valvular diseases with high BP; sense of weight in heart; profound depression.",
        potencyTips: "200C."
      },
      {
        name: "Naja Tripudians",
        id: "naja",
        keyIndications: "Valvular lesions after endocarditis; weight on heart; pulse slow and weak.",
        potencyTips: "30C."
      },
      {
        name: "Digitalis",
        id: "digitalis",
        keyIndications: "Irregular pulse with mitral disease; cyanosis and edema.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["rheumatic-heart-disease", "infective-endocarditis", "atrial-fibrillation"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["MS = Rheumatic", "AS = Degenerative/Bicuspid", "Echo is best"],
      miasmaticDominance: "Sycotic/Syphilitic",
      thermalState: "Variable",
      organAffinity: "Endocardium (Valves)",
      memoryMnemonic: "M-S-D: Mitral Stenosis Diastolic. A-S-S: Aortic Stenosis Systolic."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical for determining the timing of surgical intervention before irreversible ventricular damage occurs.",
        severityAssessment: "Based on valve area, pressure gradients, and symptoms.",
        referralCriteria: ["Severe symptomatic stenosis", "New onset heart failure", "Suspected Endocarditis"]
      },
      individualization: {
        mentalGenerals: ["Anxiety", "Fear of the future", "Mental depression (Aurum)"],
        physicalGenerals: {
          thermalState: "Variable.",
          thirst: "Varies.",
          appetite: "Poor.",
          desires: ["Fresh air"],
          aversions: ["Tightness"],
          sleep: "Orthopnea.",
          perspiration: "Anxious sweat."
        },
        modalities: ["Agg: Exertion, Lying on left side", "Amel: Slow motion, Sitting up"],
        concomitants: ["Hemoptysis (MS)", "Chest pain (AS)"],
        characteristicParticulars: ["Sensation of the heart being squeezed."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Malar flush on cheeks (MS) - 'Mitral Facies'"],
        individualExpression: "The patient feels as if their heart is 'struggling' against a blockage or 'leaking' its strength."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - HEART - Valvular diseases", chapter: "Chest" },
          { rubric: "Chest - PALPITATIONS - heart - valvular", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on 'Heart symptoms after rheumatism' and 'Modalities'."
      }
    }
  },
  {
    id: "deep-vein-thrombosis",
    name: "Deep Vein Thrombosis (DVT)",
    slug: "deep-vein-thrombosis",
    system: "cardiovascular",
    category: "Vascular",
    definition: "The formation of a blood clot (thrombus) within a deep vein, most commonly in the legs.",
    simpleExplanation: "DVT is when a blood clot forms in a deep vein, usually in your leg. The big danger is that the clot can break loose and travel to your lungs, which can be fatal.",
    examKeywords: ["Virchow's Triad", "Homan's sign", "Pulmonary Embolism", "D-dimer"],
    epidemiology: {
      ageDistribution: "Incidence increases with age.",
      sexDistribution: "Equal.",
      riskGroups: ["Post-operative patients", "Long-haul travelers", "Cancer patients", "Pregnant women"],
      publicHealthRelevance: "Common cause of preventable hospital death."
    },
    etiology: {
      predisposingFactors: ["Virchow's Triad: Stasis, Endothelial injury, Hypercoagulability"],
      precipitatingFactors: ["Surgery (Hip/Knee)", "Immobilization (Plaster cast)", "Trauma"],
      riskFactors: ["Oral contraceptives", "Smoking", "Obesity", "Factor V Leiden"]
    },
    pathophysiology: {
      steps: [
        { title: "Clot Initiation", description: "Blood flow slows or the vein wall is damaged, triggering clot formation." },
        { title: "Clot Propagation", description: "The thrombus grows along the vein, obstructing blood flow." },
        { title: "Inflammation", description: "The vein wall becomes inflamed (Phlebitis)." },
        { title: "Embolization", description: "A piece of the clot breaks off and travels to the heart and lungs." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["Unilateral leg pain", "Swelling"],
      localSymptoms: ["Tenderness in the calf", "Warmth"],
      constitutionalFeatures: ["Low grade fever"],
      importantSigns: ["Pitting edema", "Prominent superficial veins", "Homan's sign (Pain on dorsiflexion - unreliable but exam favorite)"],
      diseaseProgression: "Resolution → Chronic Venous Insufficiency OR Acute Pulmonary Embolism."
    },
    redFlags: [
      "Sudden shortness of breath (Pulmonary Embolism)",
      "Chest pain",
      "Hemoptysis"
    ],
    investigations: {
      diagnostic: [
        { name: "D-dimer", findings: "Elevated", importance: "High negative predictive value (rules out DVT if negative)" },
        { name: "Venography", findings: "Filling defect", importance: "Old Gold Standard, rarely used now" }
      ],
      goldStandard: { name: "Venous Duplex Ultrasound", findings: "Non-compressible vein, absence of flow", importance: "Primary diagnostic tool" }
    },
    diagnosticCriteria: {
      title: "Wells Score",
      criteria: ["Active cancer", "Recent immobilization", "Calf swelling >3cm", "Pitting edema"]
    },
    differentialDiagnosis: [
      { condition: "Cellulitis", distinguishingFeatures: "Redness, high fever, no clot on ultrasound." },
      { condition: "Baker's Cyst Rupture", distinguishingFeatures: "History of knee issues, fluid on ultrasound." },
      { condition: "Muscle Tear", distinguishingFeatures: "Sudden onset during activity, bruising." }
    ],
    complications: {
      common: ["Post-thrombotic syndrome (Chronic swelling)"],
      serious: ["Venous ulceration"],
      lifeThreatening: ["Pulmonary Embolism (PE)"]
    },
    conventionalManagement: {
      general: ["Early mobilization", "Compression stockings"],
      medical: ["Anticoagulation (Heparin, Warfarin, DOACs)"],
      surgical: ["IVC Filter (if anticoagulation contraindicated)", "Thrombectomy (rare)"],
      prevention: ["LMWH after surgery", "Leg exercises during travel"]
    },
    homoeopathicApproach: "Homoeopathy focuses on the 'vein-wall' weakness and the inflammatory state. Remedies are chosen for the character of the pain and the underlying Sycotic/Syphilitic miasm.",
    relatedRemedies: [
      {
        name: "Hamamelis Virginiana",
        id: "hamamelis",
        keyIndications: "Veins sore, painful, and dilated; sense of bruised soreness; 'Aconite of the veins'.",
        potencyTips: "Q or 200C."
      },
      {
        name: "Vipera Berus",
        id: "vipera",
        keyIndications: "Veins feel as if they would burst; better by elevating the limb; worse by letting the limb hang down.",
        potencyTips: "30C."
      },
      {
        name: "Bothrops Lanciolatus",
        id: "bothrops",
        keyIndications: "Septic states with clotting; thrombosis with hemiplegia risk.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["pulmonary-embolism", "varicose-veins"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Virchow's Triad", "Ultrasound is best", "Risk of PE is the main concern"],
      miasmaticDominance: "Sycotic (Obstruction)",
      thermalState: "Local warmth",
      organAffinity: "Deep Veins",
      memoryMnemonic: "S-H-H: Stasis, Hypercoagulability, Hemodynamics (Endothelial injury)."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical; unrecognized DVT can lead to fatal pulmonary embolism within minutes.",
        severityAssessment: "Based on the extent of the clot (proximal vs distal).",
        referralCriteria: ["Any suspected DVT requires urgent ultrasound and anticoagulation."]
      },
      individualization: {
        mentalGenerals: ["Anxiety", "Fear of movement"],
        physicalGenerals: {
          thermalState: "Warmth of the affected limb.",
          thirst: "Varies.",
          appetite: "Normal.",
          desires: ["N/A"],
          aversions: ["N/A"],
          sleep: "Restless from leg pain.",
          perspiration: "Local sweat on limb (occasionally)."
        },
        modalities: ["Agg: Letting limb hang down (Vipera), Touch, Movement", "Amel: Elevation (Vipera), Cold applications (Hamamelis)"],
        concomitants: ["Edema", "Blue discoloration"],
        characteristicParticulars: ["Sensation as if the skin would burst."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Patient must keep the limb elevated to prevent unbearable bursting pain (Vipera)"],
        individualExpression: "The patient feels as if the leg is 'heavy with lead' or 'clogged' internally."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Generalities - INFLAMMATION - Veins", chapter: "Generalities" },
          { rubric: "Extremities - PAIN - hanging down the limb, on", chapter: "Extremities" }
        ],
        symptomAnalysis: "Focus on 'Venous' remedies and 'Relieving postures'."
      }
    }
  },
  {
    id: "peripheral-arterial-disease",
    name: "Peripheral Arterial Disease (PAD)",
    slug: "peripheral-arterial-disease",
    system: "cardiovascular",
    category: "Vascular",
    definition: "A common circulatory problem in which narrowed arteries reduce blood flow to the limbs, usually the legs.",
    simpleExplanation: "PAD is when the arteries in your legs get narrowed by fatty deposits. This means your muscles don't get enough blood, especially when you walk, causing pain that goes away with rest.",
    examKeywords: ["Intermittent claudication", "ABI", "Rest pain", "Gangrene"],
    epidemiology: {
      ageDistribution: "More common in those >60 years.",
      sexDistribution: "More common in men.",
      riskGroups: ["Smokers", "Diabetics", "Hypertensive patients"],
      publicHealthRelevance: "A strong indicator of systemic atherosclerosis (risk of stroke/MI)."
    },
    etiology: {
      predisposingFactors: ["Atherosclerosis"],
      precipitatingFactors: ["Acute thrombosis on a plaque", "Embolism"],
      riskFactors: ["Smoking (Strongest)", "Diabetes", "Dyslipidemia", "Age"]
    },
    pathophysiology: {
      steps: [
        { title: "Plaque Formation", description: "Cholesterol and calcium build up in the artery walls." },
        { title: "Narrowing", description: "The lumen of the artery gets smaller, restricting flow." },
        { title: "Ischemia", description: "During exercise, blood flow cannot meet metabolic demand." },
        { title: "Critical Ischemia", description: "Blood flow is insufficient even at rest, leading to tissue death." }
      ]
    },
    classification: {
      type: "Fontaine Classification",
      details: ["Stage I: Asymptomatic", "Stage II: Intermittent Claudication", "Stage III: Rest Pain", "Stage IV: Ulceration/Gangrene"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Cramping pain in calf, thigh, or buttock when walking"],
      localSymptoms: ["Rest pain (worse at night, better hanging leg out of bed)", "Cold feet"],
      constitutionalFeatures: ["Erectile dysfunction (Leriche syndrome)"],
      importantSigns: ["Absent or weak peripheral pulses", "Hair loss on legs", "Shiny skin", "Thickened nails", "Buerger's test (Pallor on elevation, rubor on dependency)"],
      diseaseProgression: "Claudication → Rest pain → Gangrene."
    },
    redFlags: [
      "Pain at rest",
      "Non-healing ulcers",
      "Blackening of toes (Gangrene)",
      "Cold, pulseless, pale limb (Acute Ischemia)"
    ],
    investigations: {
      diagnostic: [
        { name: "ABI (Ankle-Brachial Index)", findings: "<0.9 is diagnostic of PAD; <0.4 is severe", importance: "First-line screening" },
        { name: "Duplex Ultrasound", findings: "Stenosis or occlusion", importance: "Locates the site" }
      ],
      goldStandard: { name: "CT Angiography or MR Angiography", findings: "Detailed map of vessel narrowing", importance: "Pre-surgical planning" }
    },
    diagnosticCriteria: {
      title: "ABI Interpretation",
      criteria: ["0.91-1.3: Normal", "0.7-0.9: Mild", "0.4-0.7: Moderate", "<0.4: Severe"]
    },
    differentialDiagnosis: [
      { condition: "Spinal Stenosis (Pseudoclaudication)", distinguishingFeatures: "Pain worse standing, better sitting/stooping, not related to walking distance." },
      { condition: "Venous Claudication", distinguishingFeatures: "Leg feels tight/heavy, relieved by elevation, history of DVT.", slug: "deep-vein-thrombosis" }
    ],
    complications: {
      common: ["Reduced mobility"],
      serious: ["Non-healing ulcers"],
      lifeThreatening: ["Gangrene", "Amputation", "High risk of MI/Stroke"]
    },
    conventionalManagement: {
      general: ["Exercise therapy (Walking to build collaterals)", "Foot care"],
      medical: ["Antiplatelets (Aspirin/Clopidogrel)", "Statins", "Cilostazol (for claudication)"],
      surgical: ["Angioplasty and Stenting", "Bypass surgery", "Amputation (as last resort)"],
      prevention: ["STRICT smoking cessation", "Diabetes control"]
    },
    homoeopathicApproach: "Homoeopathy targets the 'atherosclerotic' tendency and the 'ischemic' pain. Remedies are selected for the coldness and the character of the cramps.",
    relatedRemedies: [
      {
        name: "Secale Cornutum",
        id: "secale",
        keyIndications: "Icy coldness of limbs but cannot bear heat; burning pains; gangrene of toes.",
        potencyTips: "30C."
      },
      {
        name: "Arsenicum Album",
        id: "arsenic",
        keyIndications: "Limbs cold as ice; burning pains better by heat; ulcers with offensive discharge.",
        potencyTips: "200C."
      },
      {
        name: "Cuprum Metallicum",
        id: "cuprum",
        keyIndications: "Intense cramps in calves; better by cold water (sometimes) or massage.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["diabetes-mellitus", "myocardial-infarction"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Intermittent claudication", "ABI <0.9", "Smoking is #1 risk"],
      miasmaticDominance: "Syphilitic (Destruction/Necrosis)",
      thermalState: "Cold limbs",
      organAffinity: "Arteries",
      memoryMnemonic: "P-A-D: Pain on walking, ABI low, Dead tissue (Gangrene) risk."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Vital to prevent amputation and to recognize the high risk of cardiovascular events elsewhere.",
        severityAssessment: "Based on ABI and the presence of rest pain or ulcers.",
        referralCriteria: ["Critical Limb Ischemia (Rest pain, ulcers, gangrene)", "Sudden onset cold/painful limb"]
      },
      individualization: {
        mentalGenerals: ["Anxiety", "Despair from long-term suffering"],
        physicalGenerals: {
          thermalState: "Icy cold limbs.",
          thirst: "Great thirst for warm water (Ars).",
          appetite: "Poor.",
          desires: ["Warmth (Ars)", "Open air"],
          aversions: ["Covering (Secale)"],
          sleep: "Restless; pain worse at night.",
          perspiration: "Cold sweat."
        },
        modalities: ["Agg: Walking (Claudication), Night, Cold", "Amel: Rest, Heat (Ars), Letting leg hang out of bed"],
        concomitants: ["Thin, shiny skin", "Weak pulses"],
        characteristicParticulars: ["Cramping pain that comes on exactly at the same distance."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Skin feels icy cold to touch but the patient feels a burning heat inside and wants to be uncovered (Secale)"],
        individualExpression: "The patient feels as if the 'life force' or 'warmth' is retreating from the extremities."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Extremities - PAIN - walking, while", chapter: "Extremities" },
          { rubric: "Extremities - GANGRENE - senile", chapter: "Extremities" }
        ],
        symptomAnalysis: "Focus on 'Claudication distance' and 'Thermal paradox' (Secale vs Ars)."
      }
    }
  },
  {
    id: "aortic-aneurysm",
    name: "Aortic Aneurysm",
    slug: "aortic-aneurysm",
    system: "cardiovascular",
    category: "Vascular",
    definition: "A permanent localized dilation of the aorta, having at least a 50% increase in diameter compared with the expected normal diameter.",
    simpleExplanation: "An aortic aneurysm is a bulge in the body's main artery (the aorta). If the bulge gets too big, it can burst, which is a massive internal emergency.",
    examKeywords: ["AAA", "Pulsatile mass", "Rupture", "Smokers", "Screening"],
    epidemiology: {
      ageDistribution: "Primarily affects individuals >65 years.",
      sexDistribution: "More common in men (4:1).",
      riskGroups: ["Elderly smokers", "Patients with Marfan Syndrome", "Hypertensive patients"],
      publicHealthRelevance: "Silent killer; often asymptomatic until rupture."
    },
    etiology: {
      predisposingFactors: ["Atherosclerosis (Degenerative)", "Cystic medial necrosis"],
      precipitatingFactors: ["Hypertension", "Infection (Syphilitic - rare now)"],
      riskFactors: ["Smoking (Strongest)", "Family history", "Connective tissue disorders"]
    },
    pathophysiology: {
      steps: [
        { title: "Wall Weakening", description: "Enzymatic breakdown of elastin and collagen in the aortic wall." },
        { title: "Pressure Stress", description: "Blood pressure stretches the weakened wall over time." },
        { title: "Dilation", description: "The aorta bulges outward (Fusiform or Saccular)." },
        { title: "Rupture", description: "Wall tension exceeds strength, leading to catastrophic bleeding." }
      ]
    },
    classification: {
      type: "Anatomical Site",
      details: ["Abdominal Aortic Aneurysm (AAA) - Commonest", "Thoracic Aortic Aneurysm (TAA)"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Often asymptomatic (found on screening)"],
      localSymptoms: ["Back or abdominal pain (indicates expansion)", "Chest/Back pain (in TAA)"],
      constitutionalFeatures: ["N/A unless ruptured"],
      importantSigns: ["Pulsatile abdominal mass", "Abdominal bruit"],
      diseaseProgression: "Slow expansion (0.3-0.5 cm/year) → Rupture."
    },
    redFlags: [
      "Sudden, severe back or abdominal pain",
      "Hypotension and shock",
      "Pulsatile mass that becomes tender"
    ],
    investigations: {
      diagnostic: [
        { name: "Abdominal Ultrasound", findings: "Measurement of aortic diameter", importance: "Primary screening and monitoring tool" },
        { name: "Chest X-ray", findings: "Widened mediastinum (TAA)", importance: "Incidental finding" }
      ],
      goldStandard: { name: "CT Angiography", findings: "Precise size and anatomical relationship", importance: "Definitive for surgical planning" }
    },
    diagnosticCriteria: {
      title: "Size Thresholds",
      criteria: [">3cm: Aneurysm present", "5.0cm (Women) / 5.5cm (Men): Threshold for elective surgery"]
    },
    differentialDiagnosis: [
      { condition: "Renal Colic", distinguishingFeatures: "Colicky pain, hematuria, no pulsatile mass." },
      { condition: "Aortic Dissection", distinguishingFeatures: "Sudden tearing pain, unequal pulses, false lumen on CT.", slug: "cardiovascular" }
    ],
    complications: {
      common: ["Thrombosis"],
      serious: ["Embolization (Blue toe syndrome)"],
      lifeThreatening: ["Rupture", "Death"]
    },
    conventionalManagement: {
      general: ["Smoking cessation", "BP control"],
      medical: ["Statins", "Antiplatelets"],
      surgical: ["EVAR (Endovascular Aneurysm Repair)", "Open Surgical Repair"],
      prevention: ["One-time ultrasound screening for men >65 who have ever smoked"]
    },
    homoeopathicApproach: "Homoeopathy targets the 'fragility' of the vascular wall and the underlying Syphilitic miasm. It is used as a supportive measure to control BP and prevent expansion, but surgery is the only cure for large aneurysms.",
    relatedRemedies: [
      {
        name: "Baryta Carbonica",
        id: "baryta-carb",
        keyIndications: "Aneurysms in old people; hypertension with vascular degeneration.",
        potencyTips: "200C."
      },
      {
        name: "Lycopodium",
        id: "lycopodium",
        keyIndications: "Aneurysms with abdominal bloating and flatulence; useful in early stages.",
        potencyTips: "200C."
      },
      {
        name: "Phosphorus",
        id: "phosphorus",
        keyIndications: "Degeneration of arteries; tendency to bleeding and fatty changes.",
        potencyTips: "30C."
      }
    ],
    relatedDiseases: ["hypertension", "syphilis", "marfan-syndrome"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Pulsatile mass", "Smoking is main risk", ">5.5cm needs surgery"],
      miasmaticDominance: "Syphilitic (Structural weakness/Destruction)",
      thermalState: "Variable",
      organAffinity: "Aorta",
      memoryMnemonic: "S-A-F-E: Smoking cessation, Aspirin, Follow-up (Ultrasound), Endovascular repair."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical; an aneurysm is a 'time bomb' that must be monitored or repaired before it bursts.",
        severityAssessment: "Based purely on the diameter (size) of the aneurysm.",
        referralCriteria: ["AAA >5.0 cm", "Rapid expansion (>0.5 cm in 6 months)", "Any symptomatic aneurysm"]
      },
      individualization: {
        mentalGenerals: ["Anxiety about health", "Mental exhaustion"],
        physicalGenerals: {
          thermalState: "Variable.",
          thirst: "Varies.",
          appetite: "Normal.",
          desires: ["N/A"],
          aversions: ["N/A"],
          sleep: "N/A.",
          perspiration: "N/A."
        },
        modalities: ["Agg: Physical strain, High BP", "Amel: Rest, Controlled lifestyle"],
        concomitants: ["General atherosclerosis", "High blood pressure"],
        characteristicParticulars: ["Visible pulsation in the abdomen."]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["The patient feels the heart beating in every part of the body (Lachesis)"],
        individualExpression: "The patient feels an 'unstable pressure' within their core, as if something is ready to give way."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - ANEURYSM - heart/aorta", chapter: "Chest" },
          { rubric: "Abdomen - PULSATION", chapter: "Abdomen" }
        ],
        symptomAnalysis: "Focus on 'Arterial degeneration' and 'Sycotic/Syphilitic background'."
      }
    }
  },
  {
    id: "bronchial-asthma",
    name: "Bronchial Asthma",
    slug: "bronchial-asthma",
    system: "respiratory",
    category: "Respiratory",
    definition: "A chronic inflammatory disorder of the airways characterized by hyper-responsiveness, reversible airway obstruction, and bronchospasm.",
    simpleExplanation: "Asthma is a long-term condition that makes breathing difficult because the airways become narrow, swollen, and produce extra mucus.",
    
    epidemiology: {
      ageDistribution: "Common in childhood, can develop at any age.",
      sexDistribution: "More common in boys (childhood), more common in women (adults).",
      riskGroups: ["Children with eczema", "Family history of atopy", "Smokers"]
    },

    etiology: {
      predisposingFactors: ["Atopy (Genetic)", "Airway hyper-reactivity"],
      precipitatingFactors: ["Dust mites", "Pollens", "Cold air", "Exercise", "Emotional stress"],
      riskFactors: ["Air pollution", "Occupational exposures", "Obesity"]
    },

    pathophysiology: {
      steps: [
        { title: "Allergen Exposure", description: "Exposure to an environmental trigger." },
        { title: "Inflammatory Cascade", description: "IgE-mediated mast cell degranulation." },
        { title: "Bronchospasm", description: "Smooth muscle contraction narrows the airway." },
        { title: "Mucus Hypersecretion", description: "Glandular hypertrophy produces thick plugs." },
        { title: "Airway Remodeling", description: "Chronic inflammation leads to permanent changes." }
      ]
    },

    clinicalFeatures: {
      generalSymptoms: ["Dyspnea (shortness of breath)", "Cough"],
      localSymptoms: ["Wheezing (typically expiratory)", "Chest tightness"],
      constitutionalFeatures: ["Anxiety during attacks", "Fatigue"],
      importantSigns: ["Prolonged expiration", "Use of accessory muscles", "Hyper-resonant percussion note"]
    },

    redFlags: [
      "Silent chest (no breath sounds)",
      "Cyanosis (bluish tint)",
      "Inability to speak in full sentences",
      "Confusion or exhaustion"
    ],

    investigations: {
      diagnostic: [
        { name: "Spirometry", findings: "FEV1/FVC < 0.7, reversible > 12%", importance: "Gold Standard" }
      ],
      goldStandard: { name: "Spirometry with Bronchodilator Reversibility", findings: "Reversible obstruction", importance: "Confirms diagnosis" }
    },

    diagnosticCriteria: {
      title: "GINA Guidelines",
      criteria: ["History of variable respiratory symptoms", "Evidence of variable expiratory airflow limitation"]
    },

    differentialDiagnosis: [
      { condition: "COPD", distinguishingFeatures: "Smoking history, irreversible, older age.", slug: "copd" },
      { condition: "Heart Failure", distinguishingFeatures: "Crackles, edema, cardiac history." }
    ],

    complications: {
      common: ["Sleep disturbance", "Exercise limitation"],
      serious: ["Pneumothorax"],
      lifeThreatening: ["Status Asthmaticus"]
    },

    conventionalManagement: {
      general: ["Avoiding triggers", "Patient education on inhaler technique"],
      medical: ["Relievers: Salbutamol", "Controllers: Inhaled Corticosteroids"],
      emergency: ["Oxygen", "Nebulization", "IV Corticosteroids"],
      prevention: ["Flu vaccination", "Smoking cessation"]
    },

    homoeopathicApproach: "Focuses on the 'characteristic' symptoms of the cough and breathlessness, as well as the 'Hydrogenoid' or 'Tubercular' miasmatic background.",
    relatedRemedies: [
      {
        name: "Arsenicum Album",
        id: "arsenicum-album",
        keyIndications: "Attacks at 1-2 AM, must sit up, burning pain.",
        modalities: "Agg: Cold, midnight. Amel: Hot drinks, sitting up.",
        constitution: "Chilly, anxious, restless.",
        potencyTips: "30C to 200C."
      }
    ],

    relatedDiseases: ["eczema", "allergic-rhinitis"],

    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",

    quickRevisionBox: {
      keyNotes: ["Reversible obstruction", "Eosinophilic inflammation", "Wheeze-Cough-Dyspnea"],
      miasmaticDominance: "Psora-Tubercular",
      thermalState: "Often Chilly",
      organAffinity: "Bronchial tree",
      memoryMnemonic: "A-S-T-H-M-A: Allergies, Smokes, Temperature, Humidity, Medications, Activities."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Essential to distinguish asthma from COPD or cardiac failure. Diagnosis guides the management of acute exacerbations and identifies the need for conventional relievers.",
        severityAssessment: "Based on frequency of symptoms, nighttime awakenings, and FEV1 measurements. Severity determines whether the case is amenable to purely homoeopathic management or requires integrated care.",
        referralCriteria: [
          "Silent chest during an attack",
          "Oxygen saturation below 92%",
          "No response to indicated remedies and standard bronchodilators",
          "Signs of respiratory failure (cyanosis, confusion)"
        ]
      },
      individualization: {
        mentalGenerals: [
          "Anxiety with fear of death (Arsenicum)",
          "Irritability and desire for fresh air (Pulsatilla)",
          "Restlessness during attacks"
        ],
        physicalGenerals: {
          thermalState: "Generally Chilly, though some (like Medorrhinum) are intensely hot.",
          thirst: "Small quantities at frequent intervals (Ars), or Thirstless (Puls).",
          appetite: "Loss of appetite during dyspnea.",
          desires: ["Warm drinks (Ars)", "Cold air (Puls)", "Salt (Nat-m)"],
          aversions: ["Fatty foods", "Enclosed spaces"],
          sleep: "Aggravated after sleep or awakened by dyspnea at 2-3 AM (Kali-c).",
          perspiration: "Cold sweat during intense struggle for breath."
        },
        modalities: [
          "Agg: 1-3 AM, Cold air, damp weather, lying down flat.",
          "Amel: Sitting up, leaning forward, warm drinks, expectoration."
        ],
        concomitants: [
          "Eczema or skin eruptions (alternation of symptoms)",
          "Gastric disturbances before an attack",
          "Allergic rhinitis"
        ],
        characteristicParticulars: [
          "Dry, wheezing cough as if from dust in throat.",
          "Thick, ropy, stringy expectoration (Kali-bi).",
          "Sense of weight on the chest."
        ]
      },
      characteristicFeatures: {
        peculiarSymptoms: [
          "Asthma relieved by lying on the face (Medorrhinum).",
          "Dyspnea relieved by damp weather (Causticum - rare)."
        ],
        individualExpression: "Every patient experiences the constriction differently. One may feel as if the chest is strapped with iron bands, while another feels as if the throat is filled with smoke."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Respiration - ASTHMATIC", chapter: "Respiration" },
          { rubric: "Respiration - DIFFICULT - night - 2 am, after", chapter: "Respiration" },
          { rubric: "Chest - CONSTRICTION - tension, as from", chapter: "Chest" }
        ],
        symptomAnalysis: "The totality should focus on the 'Mode of Onset', 'Character of Dyspnea', and 'Relieving Postures', along with the deep-seated Miasmatic background."
      }
    }
  },
  {
    id: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis (RA)",
    slug: "rheumatoid-arthritis",
    system: "musculoskeletal-rheumatology",
    category: "Musculoskeletal",
    definition: "A chronic, systemic autoimmune inflammatory disorder that primarily affects the synovial joints, leading to joint destruction, deformity, and functional disability.",
    simpleExplanation: "Rheumatoid Arthritis is an autoimmune disease where the body's immune system mistakenly attacks the joints, causing pain, swelling, and stiffness.",
    examKeywords: ["Morning stiffness", "Symmetrical", "Anti-CCP", "DMARDs"],
    epidemiology: {
      ageDistribution: "30-50 years",
      sexDistribution: "Female > Male (3:1)",
      riskGroups: ["Genetic predisposition (HLA-DR4)", "Smokers"]
    },
    etiology: {
      predisposingFactors: ["HLA-DR4"],
      precipitatingFactors: ["Environmental triggers"],
      riskFactors: ["Smoking"]
    },
    pathophysiology: {
      steps: [
        { title: "Synovitis", description: "Inflammation of the synovial membrane." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["Morning stiffness >1 hour"],
      localSymptoms: ["Symmetrical joint pain and swelling (Small joints)"],
      constitutionalFeatures: ["Fatigue", "Low grade fever"],
      importantSigns: ["Swan neck deformity", "Z-deformity of thumb", "Ulnar deviation"]
    },
    redFlags: ["Atlantoaxial subluxation", "Systemic vasculitis"],
    investigations: {
      diagnostic: [{ name: "Anti-CCP", findings: "Positive", importance: "Highly specific" }],
      goldStandard: { name: "Clinical + Serology", findings: "ACR Criteria", importance: "Diagnosis" }
    },
    diagnosticCriteria: {
      title: "ACR/EULAR 2010 Criteria",
      criteria: ["Joint involvement", "Serology", "Acute phase reactants", "Duration of symptoms"]
    },
    differentialDiagnosis: [
      { condition: "Osteoarthritis", distinguishingFeatures: "Bouchard's/Heberden's nodes, worse with use." }
    ],
    complications: { common: ["Joint deformity"], serious: ["Vasculitis"], lifeThreatening: ["Interstitial lung disease"] },
    conventionalManagement: { general: ["Rest during flares"], medical: ["NSAIDs", "Corticosteroids", "DMARDs (Methotrexate)"], prevention: ["Smoking cessation"] },
    homoeopathicApproach: "Constitutional treatment focusing on modalities and thermal reactions.",
    relatedRemedies: [
      {
        name: "Rhus Tox",
        keyIndications: "Restlessness, pain worse on first motion, better by continued motion.",
        modalities: "Agg: Rest, damp weather. Amel: Warmth, continued motion.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["osteoarthritis"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "None",
    quickRevisionBox: {
      keyNotes: ["Morning stiffness > 1 hour", "Small joints", "Symmetrical"],
      miasmaticDominance: "Syco-Syphilitic",
      thermalState: "Chilly",
      organAffinity: "Joints",
      memoryMnemonic: "S-Y-M-M-E-T-R-Y"
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Crucial for early initiation of therapy to prevent irreversible joint destruction. Distinguishes RA from other polyarthritides.",
        severityAssessment: "Measured by the number of swollen/tender joints and inflammatory markers (ESR/CRP).",
        referralCriteria: ["Extra-articular manifestations (vasculitis, lung disease)", "Severe joint instability", "Rapidly progressive deformity"]
      },
      individualization: {
        mentalGenerals: ["Irritability from constant pain", "Despair of recovery (Psorinum)", "Sensitive to cold and damp (Rhus-t)"],
        physicalGenerals: {
          thermalState: "Chilly, worse from cold and damp.",
          thirst: "Increased in acute flares (Bryonia) or thirstless (Apis).",
          appetite: "Poor during inflammatory peaks.",
          desires: ["Warmth", "Cold applications (seldom - Ledum, Apis)"],
          aversions: ["Cold weather", "Movement (Bry)"],
          sleep: "Restless due to joint pain.",
          perspiration: "Sour smelling (Rheum, Calc)."
        },
        modalities: ["Agg: Cold damp weather, Rest (Rhus-t), First motion, Night", "Amel: Warmth, Continued motion (Rhus-t), Cold applications (Apis, Ledum)"],
        concomitants: ["Morning stiffness", "Feverishness during flares", "Weakness"],
        characteristicParticulars: ["Symmetrical involvement", "Small joints of hands and feet"]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Pain relieved by cold water but patient is chilly (Ledum)"],
        individualExpression: "Patient feels as if the joints are being twisted or are too short for the limbs."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Extremities - ARTHRITIC nodosities", chapter: "Extremities" },
          { rubric: "Extremities - PAIN - joints - small", chapter: "Extremities" }
        ],
        symptomAnalysis: "Totality must include the 'Character of pain', 'Modalities of motion/weather', and 'Constitutional state'."
      }
    }
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    slug: "pneumonia",
    system: "respiratory",
    category: "Respiratory",
    definition: "An acute infection of the lung parenchyma, involving the alveoli and surrounding interstitial tissue, leading to consolidation and impaired gas exchange.",
    simpleExplanation: "Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.",
    examKeywords: ["Consolidation", "Rusty Sputum", "Air Bronchogram", "CURB-65"],
    epidemiology: {
      ageDistribution: "Extremes of age (very young and very old) are at highest risk.",
      sexDistribution: "Slightly more common in males.",
      riskGroups: ["Immunocompromised", "Chronic lung disease patients", "Post-viral infection"],
      publicHealthRelevance: "A major cause of death from infection worldwide."
    },
    etiology: {
      predisposingFactors: ["Recent viral URTI (Flu)", "Smoking", "Alcoholism"],
      precipitatingFactors: ["Aspiration", "Exposure to infectious droplets"],
      riskFactors: ["Diabetes", "Heart failure", "COPD"]
    },
    pathophysiology: {
      steps: [
        { title: "Congestion", description: "Initial phase with vascular engorgement and serous exudate in alveoli." },
        { title: "Red Hepatization", description: "Alveoli fill with RBCs, neutrophils, and fibrin; lung becomes liver-like." },
        { title: "Grey Hepatization", description: "RBCs disintegrate; fibrin and neutrophils remain; lung is grey and firm." },
        { title: "Resolution", description: "Exudate is digested by enzymes and removed by macrophages or coughed up." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["High fever with rigors", "Productive cough", "Pleuritic chest pain"],
      localSymptoms: ["Rusty or purulent sputum", "Dyspnea"],
      constitutionalFeatures: ["Malaise", "Confusion (especially in elderly)"],
      importantSigns: ["Increased vocal fremitus", "Dull percussion note", "Bronchial breathing", "Fine crackles"]
    },
    redFlags: [
      "Respiratory rate >30/min",
      "Systolic BP <90 mmHg",
      "Confusion or new onset disorientation",
      "Cyanosis"
    ],
    investigations: {
      diagnostic: [{ name: "Chest X-ray", findings: "Lobar or patchy consolidation", importance: "Gold Standard for confirmation" }],
      laboratoryFindings: [
        { name: "Sputum Culture", findings: "Pathogen identification (e.g. S. pneumoniae)", importance: "Guides antibiotic therapy" },
        { name: "CBC", findings: "Leukocytosis with neutrophilia", importance: "Indicates bacterial infection" }
      ]
    },
    diagnosticCriteria: {
      title: "Clinical + Radiological",
      criteria: ["Fever/Cough/Dyspnea", "New infiltrate on Chest X-ray"]
    },
    differentialDiagnosis: [
      { condition: "Pulmonary Infarction", distinguishingFeatures: "Sudden onset, leg swelling (DVT), wedge-shaped opacity." },
      { condition: "Pulmonary Edema", distinguishingFeatures: "Bibasilar crackles, cardiac history, bat-wing appearance." }
    ],
    complications: {
      common: ["Pleural effusion"],
      serious: ["Empyema (Pus in pleural space)", "Lung abscess"],
      lifeThreatening: ["Sepsis", "Respiratory Failure", "Septic Shock"]
    },
    conventionalManagement: {
      general: ["Hydration", "Oxygen if hypoxic", "Analgesia for pleuritic pain"],
      medical: ["Antibiotics (Empiric then culture-guided)", "Antipyretics"],
      prevention: ["Pneumococcal vaccine", "Influenza vaccine", "Smoking cessation"]
    },
    homoeopathicApproach: "Targets the phase of hepatization and the specific character of the fever and cough. Remedies change as the disease moves from initial congestion to resolution.",
    relatedRemedies: [
      {
        name: "Phosphorus",
        keyIndications: "Tightness across chest; rust-colored sputum; patient desires cold drinks despite being chilly.",
        modalities: "Agg: Lying on left side, twilight. Amel: Cold drinks, sleep.",
        potencyTips: "30C to 200C."
      },
      {
        name: "Bryonia Alba",
        keyIndications: "Pleuritic stitching pain, worse by least motion; holds chest while coughing.",
        modalities: "Agg: Motion, deep breathing. Amel: Lying on painful side, absolute rest.",
        potencyTips: "200C."
      },
      {
        name: "Chelidonium",
        keyIndications: "Right-sided pneumonia with liver involvement (jaundice); pain under right scapula.",
        potencyTips: "6C or 30C."
      }
    ],
    relatedDiseases: ["bronchitis", "pleurisy"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Consolidation", "Bronchial breathing", "Rusty Sputum"],
      miasmaticDominance: "Psora-Syphilitic",
      thermalState: "Chilly (usually)",
      organAffinity: "Lung Parenchyma",
      memoryMnemonic: "C-U-R-B-65: Confusion, Urea, Respiration, Blood Pressure, Age > 65."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical for determining the need for hospitalization and assessing the risk of mortality using CURB-65 score.",
        severityAssessment: "Based on oxygen saturation, respiratory rate, and systemic stability.",
        referralCriteria: ["Respiratory distress", "Confusion", "Low blood pressure", "Multi-lobar involvement"]
      },
      individualization: {
        mentalGenerals: ["Anxiety during dyspnea", "Desire to be quiet and still (Bryonia)", "Restlessness (Arsenicum, Phosphorus)"],
        physicalGenerals: {
          thermalState: "Generally chilly with high fever.",
          thirst: "Intense for large quantities (Bry) or small frequent sips (Ars).",
          appetite: "Total loss of appetite during acute phase.",
          desires: ["Ice-cold drinks (Phos)", "Quietude"],
          aversions: ["Movement", "Heavy odors"],
          sleep: "Drowsiness (Ant-t) or sleepless from cough.",
          perspiration: "Profuse, sometimes sour or cold."
        },
        modalities: ["Agg: Motion (Bry), Lying on left side (Phos), Change of weather", "Amel: Absolute rest, Lying on painful side (Bry), Warm drinks (Ars)"],
        concomitants: ["Pain in chest while coughing", "High fever with rigors", "Cyanosis"],
        characteristicParticulars: ["Rusty-colored expectoration (Phos, Bry, Sang)", "Nasal fanning (Lycopodium, Ant-t)"]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Desires ice-cold drinks but vomits as soon as they become warm in stomach (Phos)"],
        individualExpression: "Patient feels as if a heavy stone is lying on the chest, making every breath an effort."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - INFLAMMATION - Lungs", chapter: "Chest" },
          { rubric: "Chest - HEPATIZATION - Lungs", chapter: "Chest" }
        ],
        symptomAnalysis: "Focus on the 'Stage of disease', 'Side affected', 'Type of sputum', and 'Thirst/ModalitiesTotality'."
      }
    }
  },
  {
    id: "myocardial-infarction",
    name: "Myocardial Infarction (Heart Attack)",
    slug: "myocardial-infarction",
    system: "cardiovascular",
    category: "Cardiovascular",
    definition: "Irreversible necrosis of heart muscle secondary to prolonged ischemia, usually resulting from the sudden occlusion of a coronary artery by thrombus formation at the site of a ruptured atherosclerotic plaque.",
    simpleExplanation: "A heart attack occurs when the flow of blood to the heart is severely reduced or blocked, usually by a buildup of fat, cholesterol and other substances in the heart (coronary) arteries.",
    examKeywords: ["ST elevation", "Troponin", "Crushing pain", "Reperfusion"],
    epidemiology: {
      ageDistribution: "Incidence increases with age; peak in 50s and 60s.",
      sexDistribution: "More common in men; risk in women increases significantly post-menopause.",
      riskGroups: ["Smokers", "Diabetics", "Hypertensive patients"]
    },
    etiology: {
      predisposingFactors: ["Atherosclerosis"],
      precipitatingFactors: ["Plaque rupture", "Coronary artery spasm (rare)"],
      riskFactors: ["Smoking", "Hyperlipidemia", "Obesity", "Stress"]
    },
    pathophysiology: {
      steps: [
        { title: "Plaque Rupture", description: "An unstable atherosclerotic plaque ruptures." },
        { title: "Thrombosis", description: "Platelets aggregate at the site, forming a clot." },
        { title: "Ischemia", description: "Blood flow to the downstream myocardium is cut off." },
        { title: "Necrosis", description: "If blood flow isn't restored within 20-30 mins, muscle cells begin to die." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["Severe, crushing retrosternal chest pain", "Pain radiates to left arm, jaw, or back"],
      localSymptoms: ["Dyspnea", "Nausea/Vomiting"],
      constitutionalFeatures: ["Profuse cold sweating (Diaphoresis)", "Sense of impending doom (Angor animi)"]
    },
    redFlags: [
      "Any chest pain lasting >20 mins",
      "Hypotension and tachycardia",
      "New onset pulmonary edema",
      "Ventricular arrhythmias"
    ],
    investigations: {
      diagnostic: [{ name: "ECG", findings: "ST-segment elevation or T-wave inversion", importance: "Initial diagnostic test" }],
      goldStandard: { name: "Cardiac Troponins (I or T)", findings: "Elevated levels", importance: "Confirms myocardial necrosis" }
    },
    diagnosticCriteria: {
      title: "Universal Definition of MI",
      criteria: ["Detection of rise and/or fall of cardiac biomarkers", "Symptoms of ischemia", "New ECG changes", "Imaging evidence of loss of viable myocardium"]
    },
    differentialDiagnosis: [
      { condition: "Aortic Dissection", distinguishingFeatures: "Tearing pain, radiates to back, unequal pulses." },
      { condition: "Pericarditis", distinguishingFeatures: "Sharp pain, better leaning forward, friction rub." }
    ],
    complications: {
      common: ["Arrhythmias"],
      serious: ["Heart Failure", "Ventricular septal rupture"],
      lifeThreatening: ["Cardiogenic Shock", "Cardiac Rupture"]
    },
    conventionalManagement: {
      general: ["Immediate hospitalization", "Bed rest", "Oxygen"],
      medical: ["Aspirin", "Nitroglycerin", "Beta-blockers", "Thrombolytics or PCI"],
      emergency: ["Defibrillation for VT/VF"],
      prevention: ["Statins", "Antiplatelet therapy", "Lifestyle modification"]
    },
    homoeopathicApproach: "Homoeopathy serves as a vital supportive therapy in post-MI recovery and management of chronic ischemic heart disease. In acute emergencies, it is used as an adjuvant to life-saving conventional interventions.",
    relatedRemedies: [
      {
        name: "Cactus Grandiflorus",
        keyIndications: "Constriction as if an iron band is around the heart; endocardial murmurs.",
        modalities: "Agg: Lying on left side. Amel: Open air.",
        potencyTips: "Q or 3X."
      },
      {
        name: "Lachesis",
        keyIndications: "Pain radiates to left arm; cannot bear anything tight around neck or waist.",
        modalities: "Agg: After sleep, hot drinks. Amel: Open air.",
        potencyTips: "200C."
      },
      {
        name: "Crataegus",
        keyIndications: "The 'heart tonic'; useful in post-infarct heart failure and irregular pulse.",
        potencyTips: "Mother Tincture (Q) 10-15 drops."
      }
    ],
    relatedDiseases: ["angina-pectoris", "heart-failure"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Critical",
    quickRevisionBox: {
      keyNotes: ["Time is muscle", "ST-elevation", "Troponin rise"],
      miasmaticDominance: "Syphilitic",
      thermalState: "Cold and clammy during attack",
      organAffinity: "Myocardium",
      memoryMnemonic: "M-O-N-A: Morphine, Oxygen, Nitroglycerin, Aspirin."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Life-saving; determines the need for emergency reperfusion (PCI/Thrombolysis).",
        severityAssessment: "Based on ECG changes, biomarker levels, and hemodynamic stability.",
        referralCriteria: ["ANY suspected MI requires immediate emergency medical transport to a cardiac center."]
      },
      individualization: {
        mentalGenerals: ["Intense fear of death (Aconite, Arsenicum)", "Sense of impending doom (Angor animi)", "Extreme anxiety"],
        physicalGenerals: {
          thermalState: "Cold and clammy during the acute event.",
          thirst: "Great thirst for cold water (Aconite).",
          appetite: "Nausea and vomiting common.",
          desires: ["Fresh air", "Silence"],
          aversions: ["Tight clothing (Lachesis)", "Movement"],
          sleep: "Inability to lie down (Orthopnea).",
          perspiration: "Cold, profuse, clammy sweat."
        },
        modalities: ["Agg: Lying on left side, Movement, Emotion", "Amel: Absolute rest, Open air"],
        concomitants: ["Radiation of pain to left arm/jaw", "Dyspnea", "Faintness"],
        characteristicParticulars: ["Constriction of chest as if in a vise (Cactus)"]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Pain in heart with a sense as if it were squeezed by an iron hand (Cactus)"],
        individualExpression: "The patient feels as if the heart has stopped beating or is being crushed by a weight."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - INFARCTION - Myocardial", chapter: "Chest" },
          { rubric: "Chest - PAIN - Heart - radiating to left arm", chapter: "Chest" }
        ],
        symptomAnalysis: "In chronic management, focus on 'Miasmatic background' and 'Constitution'; in acute, focus on 'Character of pain' and 'Anxiety level'."
      }
    }
  },
  {
    id: "copd",
    name: "Chronic Obstructive Pulmonary Disease (COPD)",
    slug: "copd",
    system: "respiratory",
    category: "Respiratory",
    definition: "A common, preventable, and treatable disease characterized by persistent respiratory symptoms and airflow limitation due to airway and/or alveolar abnormalities, usually caused by significant exposure to noxious particles or gases.",
    simpleExplanation: "COPD is a group of lung diseases (like chronic bronchitis and emphysema) that block airflow and make it difficult to breathe. It's usually caused by long-term smoking.",
    examKeywords: ["Blue Bloater", "Pink Puffer", "Alpha-1 Antitrypsin", "Irreversible obstruction"],
    epidemiology: {
      ageDistribution: "Usually presents in individuals over 40 years of age.",
      sexDistribution: "Historically more common in men, but prevalence in women is rising due to smoking patterns.",
      riskGroups: ["Chronic smokers", "Biomass fuel users", "Occupational dust exposure"],
      publicHealthRelevance: "A leading cause of morbidity and mortality worldwide; significant economic burden."
    },
    etiology: {
      predisposingFactors: ["Alpha-1 antitrypsin deficiency (Genetic)", "Hyper-responsive airways"],
      precipitatingFactors: ["Respiratory infections", "Air pollution"],
      riskFactors: ["Cigarette smoking (Primary)", "Indoor air pollution", "Occupational chemicals"]
    },
    pathophysiology: {
      steps: [
        { title: "Chronic Inflammation", description: "Exposure to irritants causes chronic inflammation of the airways." },
        { title: "Mucus Gland Hyperplasia", description: "Leads to excessive mucus production (Chronic Bronchitis)." },
        { title: "Alveolar Destruction", description: "Loss of elastic recoil and destruction of alveolar walls (Emphysema)." },
        { title: "Air Trapping", description: "Small airways collapse during expiration, trapping air and leading to hyperinflation." }
      ]
    },
    classification: {
      type: "GOLD Criteria",
      details: ["GOLD 1 (Mild): FEV1 ≥ 80% predicted", "GOLD 2 (Moderate): 50% ≤ FEV1 < 80%", "GOLD 3 (Severe): 30% ≤ FEV1 < 50%", "GOLD 4 (Very Severe): FEV1 < 30%"]
    },
    clinicalFeatures: {
      generalSymptoms: ["Chronic cough", "Expectoration (usually morning)", "Progressive dyspnea"],
      localSymptoms: ["Wheezing", "Chest tightness"],
      constitutionalFeatures: ["Weight loss (in severe emphysema)", "Peripheral edema (if Cor Pulmonale)"],
      importantSigns: ["Barrel chest", "Use of accessory muscles", "Pursed-lip breathing", "Central cyanosis"],
      diseaseProgression: "Gradual decline in lung function with intermittent 'acute exacerbations'."
    },
    redFlags: [
      "Severe resting dyspnea",
      "Acute confusion or altered consciousness",
      "Cyanosis (peripheral or central)",
      "New onset peripheral edema"
    ],
    investigations: {
      diagnostic: [{ name: "Spirometry", findings: "Post-bronchodilator FEV1/FVC < 0.7", importance: "Gold Standard - confirms airflow limitation" }],
      laboratoryFindings: [
        { name: "Chest X-ray", findings: "Hyperinflation, flattened diaphragm", importance: "Rules out other pathologies" },
        { name: "ABG (Arterial Blood Gas)", findings: "Hypoxemia, Hypercapnia", importance: "Assesses respiratory failure" }
      ]
    },
    diagnosticCriteria: {
      title: "Clinical & Functional",
      criteria: ["History of exposure to risk factors", "Presence of cough/dyspnea", "Spirometry showing non-reversible obstruction"]
    },
    differentialDiagnosis: [
      { condition: "Bronchial Asthma", distinguishingFeatures: "Onset in childhood, reversible, variable symptoms.", slug: "bronchial-asthma" },
      { condition: "Congestive Heart Failure", distinguishingFeatures: "Fine crackles, orthopnea, enlarged heart on X-ray." },
      { condition: "Bronchiectasis", distinguishingFeatures: "Large volumes of purulent sputum, CT shows dilated bronchi." }
    ],
    complications: {
      common: ["Respiratory infections", "Secondary Polycythemia"],
      serious: ["Pulmonary Hypertension", "Cor Pulmonale (Right Heart Failure)"],
      lifeThreatening: ["Acute Respiratory Failure", "Pneumothorax"]
    },
    conventionalManagement: {
      general: ["Smoking cessation (The only intervention that slows FEV1 decline)", "Pulmonary rehabilitation", "Oxygen therapy"],
      medical: ["Bronchodilators (LAMA, LABA)", "Inhaled Corticosteroids (for frequent exacerbators)", "Antibiotics for infections"],
      prevention: ["Vaccination (Flu, Pneumococcal)"]
    },
    homoeopathicApproach: "Management focuses on palliating the distressing cough and dyspnea while slowing down the pathological progression through deep-acting anti-miasmatic remedies.",
    relatedRemedies: [
      {
        name: "Antimonium Tart",
        keyIndications: "Great rattling of mucus but little expectoration; patient is cyanotic and drowsy.",
        modalities: "Agg: Lying down, warm room. Amel: Sitting erect, expectoration.",
        potencyTips: "6C or 30C."
      },
      {
        name: "Senega",
        keyIndications: "Great accumulation of mucus which is difficult to expel; chest feels sore.",
        modalities: "Agg: Pressure, lying on right side.",
        potencyTips: "Q (Mother Tincture) or 3X."
      },
      {
        name: "Aspidosperma",
        keyIndications: "The 'digitalis of lungs'; helps in removing temporary obstruction to oxidation of blood.",
        modalities: "Used as a palliative for dyspnea.",
        potencyTips: "Mother Tincture (Q) 10-15 drops."
      }
    ],
    relatedDiseases: ["pneumonia", "bronchiectasis"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "Alert",
    quickRevisionBox: {
      keyNotes: ["Irreversible airflow limitation", "Smoking is #1 cause", "Barrel Chest"],
      miasmaticDominance: "Syco-Syphilitic",
      thermalState: "Chilly",
      organAffinity: "Alveoli and Bronchioles",
      memoryMnemonic: "B-L-U-E: Bronchitis, Low Oxygen, Unusual Mucus, Edema."
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Critical for differentiating from Asthma; impacts the decision for long-term oxygen therapy.",
        severityAssessment: "Based on GOLD stages and symptom burden (CAT/mMRC scores).",
        referralCriteria: ["Signs of Cor Pulmonale", "Frequent exacerbations", "Severe hypoxemia"]
      },
      individualization: {
        mentalGenerals: ["Fear of suffocation", "Irritability from physical weakness"],
        physicalGenerals: {
          thermalState: "Chilly (usually)",
          thirst: "Varies",
          appetite: "Poor",
          desires: ["Fresh air", "Cold things (sometimes)"],
          aversions: ["Heavy foods", "Warm rooms"],
          sleep: "Must sit up in bed to breathe (Orthopnea)",
          perspiration: "Cold, clammy sweat during dyspnea"
        },
        modalities: ["Agg: Cold air, Lying down, Early morning", "Amel: Expectoration, Fresh air, Sitting up"],
        concomitants: ["Cyanosis", "Clubbing of fingers (rare in COPD, think Bronchiectasis/Cancer)", "Ankle edema"],
        characteristicParticulars: ["Cough worse in winter", "Sputum thick, yellow or greenish"]
      },
      characteristicFeatures: {
        peculiarSymptoms: ["Cough relieved by drinking cold water (Cuprum - sometimes useful in COPD spasms)"],
        individualExpression: "Patient feels as if there is a heavy load on the chest preventing full expansion."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Chest - HEPATIZATION of lungs", chapter: "Chest" },
          { rubric: "Respiration - DIFFICULT - old people", chapter: "Respiration" }
        ],
        symptomAnalysis: "Focus on the 'Character of Sputum', 'Aggravating weather', and 'Concomitant heart symptoms'."
      }
    }
  },
  {
    id: "migraine",
    name: "Migraine & Vascular Headaches",
    slug: "migraine",
    system: "neurology",
    category: "Neurological",
    definition: "A primary headache disorder characterized by recurrent, moderate-to-severe, unilateral, throbbing headache attacks lasting 4–72 hours, typically associated with autonomic symptoms like nausea, vomiting, photophobia, and phonophobia.",
    simpleExplanation: "Migraine is a severe, recurring headache that usually affects one side of the head and is often accompanied by nausea and sensitivity to light or sound. It is not just a 'bad headache' but a complex neurological condition.",
    examKeywords: ["Unilateral", "Pulsating", "Photophobia", "Trigeminal activation", "CGRP"],
    epidemiology: {
      ageDistribution: "Typically onset in puberty, peak prevalence between ages 35-45.",
      sexDistribution: "Prevalence is 3:1 (Female:Male) after puberty.",
      riskGroups: ["Women of childbearing age", "Individuals with a family history", "High-stress occupations"],
      publicHealthRelevance: "A leading cause of disability worldwide according to the WHO."
    },
    etiology: {
      predisposingFactors: ["Genetic predisposition (familial hemiplegic migraine)", "Female sex", "Anxious personality traits"],
      precipitatingFactors: ["Stress and let-down", "Hormonal changes (menstrual cycle)", "Dietary triggers (chocolate, cheese, alcohol)", "Sleep disturbances"],
      riskFactors: ["Obesity", "Excessive caffeine intake", "Frequent use of acute headache medications"]
    },
    pathophysiology: {
      steps: [
        { title: "Trigger Activation", description: "Internal or external triggers activate the cerebral cortex." },
        { title: "Cortical Spreading Depression", description: "A wave of neuronal depolarization spreads across the cortex, potentially causing an aura." },
        { title: "Trigeminal Activation", description: "Depolarization triggers the trigeminal nerve, the main pain pathway of the head." },
        { title: "Neuropeptide Release", description: "Release of CGRP and Substance P causes neurogenic inflammation." },
        { title: "Vascular Changes", description: "Meningeal blood vessels dilate, increasing the sensitivity to pulsating blood flow." },
        { title: "Pain Transmission", description: "Pain signals travel back to the brainstem and then to the cortex, perceived as throbbing pain." }
      ]
    },
    clinicalFeatures: {
      generalSymptoms: ["Moderate to severe headache", "Physical activity aggravates pain"],
      localSymptoms: ["Unilateral location (typically)", "Pulsating/throbbing quality"],
      constitutionalFeatures: ["Nausea", "Vomiting", "Photophobia (light sensitivity)", "Phonophobia (sound sensitivity)"],
      importantSigns: ["Scalp tenderness", "Autonomic features (rarely: conjunctival injection)"],
      diseaseProgression: "Prodrome (hours to days) → Aura (if present, <60 min) → Headache phase (4-72 hours) → Postdrome ('migraine hangover')."
    },
    redFlags: [
      "Sudden onset 'Thunderclap' headache",
      "Headache with fever and neck stiffness",
      "New onset headache after age 50",
      "Progressive worsening over weeks",
      "Headache following head trauma"
    ],
    investigations: {
      screening: [
        { name: "Clinical History", findings: "Pattern identification", importance: "Primary diagnostic tool" }
      ],
      goldStandard: { name: "ICHD-3 Clinical Criteria", findings: "Meets specific criteria", importance: "No specific lab test exists" },
      laboratoryFindings: [
        { name: "MRI Brain", findings: "Normal", importance: "Used only to rule out secondary causes" }
      ]
    },
    diagnosticCriteria: {
      title: "ICHD-3 Criteria for Migraine without Aura",
      criteria: [
        "At least 5 attacks fulfilling criteria",
        "Headache attacks lasting 4-72 hours",
        "At least two of: Unilateral, Pulsating, Moderate-Severe intensity, Aggravation by motion",
        "At least one of: Nausea/Vomiting, Photophobia/Phonophobia"
      ]
    },
    differentialDiagnosis: [
      { condition: "Tension-Type Headache", distinguishingFeatures: "Bilateral, 'band-like' pressure, no nausea.", slug: "tension-headache" },
      { condition: "Cluster Headache", distinguishingFeatures: "Unilateral periorbital, excruciating, short duration, autonomic signs.", slug: "cluster-headache" },
      { condition: "Secondary Headache", distinguishingFeatures: "Systemic symptoms, sudden onset, neurological deficits." }
    ],
    complications: {
      common: ["Chronic migraine (>15 days/month)", "Medication overuse headache"],
      serious: ["Status migrainosus (>72 hours)"],
      lifeThreatening: ["Migrainous infarction (Ischemic stroke)"]
    },
    conventionalManagement: {
      general: ["Trigger identification and avoidance", "Maintaining regular sleep and meal patterns"],
      medical: ["Abortive: Triptans, NSAIDs", "Preventive: Beta-blockers, Amitriptyline, Topiramate"],
      emergency: ["Parenteral fluids", "IV metoclopramide", "Ketorolac"],
      prevention: ["Yoga and biofeedback", "Magnesium and Riboflavin supplementation"]
    },
    homoeopathicApproach: "Migraine is treated as a constitutional dyscrasia. Acute remedies target the 'fit' of headache based on laterality, character of pain, and modalities, while chronic remedies address the underlying miasmatic susceptibility.",
    relatedRemedies: [
      {
        name: "Belladonna",
        id: "belladonna",
        keyIndications: "Sudden onset, violent throbbing, red face, dilated pupils.",
        modalities: "Agg: Light, noise, jar, lying down. Amel: Semi-erect, pressure.",
        constitution: "Plethoric, sensitive individuals.",
        potencyTips: "30C or 200C in frequent doses during acute pain."
      },
      {
        name: "Sanguinaria",
        id: "sanguinaria",
        keyIndications: "Right-sided, starts in occiput settles over right eye. Pain follows the sun.",
        modalities: "Agg: Motion, light, sun. Amel: Sleep, dark room, quiet.",
        constitution: "Sanguineous, vasomotor instability.",
        potencyTips: "200C."
      }
    ],
    relatedDiseases: ["hypertension", "trigeminal-neuralgia"],
    examPriority: "High",
    clinicalPriority: "High",
    emergencyLevel: "None",
    quickRevisionBox: {
      keyNotes: ["Sanguinaria: Right-sided, sun headache", "Spigelia: Left-sided, neuralgic", "Gelsemium: Dull, drowsy, dizzy", "Nat-Mur: Hammering headache"],
      miasmaticDominance: "Psora-Sycosis",
      thermalState: "Variable",
      organAffinity: "Cranial Nerves, Cerebral Vessels",
      memoryMnemonic: "P-O-U-N-D (Pulsating, One-day, Unilateral, Nausea, Disabling)"
    },
    homoeopathicModule: {
      medicalAssessment: {
        importanceOfDiagnosis: "Vital to rule out secondary causes of headache like brain tumors, meningitis, or subarachnoid hemorrhage. Diagnosis confirms the primary nature of the condition.",
        severityAssessment: "Evaluated using the MIDAS (Migraine Disability Assessment) score. It helps determine the level of impairment in daily activities.",
        referralCriteria: [
          "Sudden 'Thunderclap' headache",
          "Headache with neurological deficits (hemiparesis, vision loss)",
          "Atypical aura lasting more than 60 minutes",
          "New onset headache after 50 years of age"
        ]
      },
      individualization: {
        mentalGenerals: [
          "Aversion to light and noise during pain",
          "Irritability and desire to be left alone (Silicea, Nat-m)",
          "Anxiety about the next attack"
        ],
        physicalGenerals: {
          thermalState: "Varies; Silicea is chilly, while Glonoinum feels intense heat.",
          thirst: "Nat-m has intense thirst for large quantities of cold water.",
          appetite: "Loss of appetite; nausea and vomiting often accompany the peak of pain.",
          desires: ["Salt (Nat-m)", "Icy cold water"],
          aversions: ["Strong odors", "Light", "Noise"],
          sleep: "Pain often relieved after a deep sleep (Sanguinaria).",
          perspiration: "Cold sweat on forehead during severe nausea."
        },
        modalities: [
          "Agg: Sun, noise, light, motion, mental strain, jar.",
          "Amel: Sleep, dark room, quiet, cold applications, pressure."
        ],
        concomitants: [
          "Visual disturbances (Aura)",
          "Numbness or tingling in extremities",
          "Polyuria after the headache (Ignatia, Gelsemium)"
        ],
        characteristicParticulars: [
          "Hammering pain as if a thousand little hammers were knocking (Nat-m).",
          "Headache starts in occiput, spreads over the head and settles in right eye (Sang).",
          "Pain as if the head would burst (Belladonna)."
        ]
      },
      characteristicFeatures: {
        peculiarSymptoms: [
          "Headache relieved by uncover the head (Glonoinum).",
          "Pain follows the course of the sun (Sang, Spigelia, Nat-m)."
        ],
        individualExpression: "One patient may feel as if a nail is being driven into the skull (Ignatia), while another feels as if the brain is loose and knocking against the skull."
      },
      repertorialStudy: {
        importantRubrics: [
          { rubric: "Head - PAIN - periodical", chapter: "Head" },
          { rubric: "Head - PAIN - sun, from exposure to", chapter: "Head" },
          { rubric: "Head - PAIN - pulsating", chapter: "Head" }
        ],
        symptomAnalysis: "Focus on the 'Location', 'Direction of spread', 'Periodicity', and 'Character of pain' to find the most similar remedy."
      }
    }
  }
];
