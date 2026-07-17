export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ImportantRemedy {
  name: string;
  keyIndications: string;
  modalities: string;
  constitution: string;
  potencyTips: string;
}

export interface Disease {
  id: string;
  title: string;
  category: string;
  definition: string;
  causes: string[];
  riskFactors: string[];
  pathogenesis: string;
  clinicalFeatures: string[];
  investigations: string[];
  differentialDiagnosis: string[];
  treatmentOverview: string;
  homoeopathicApproach: string;
  topTenRemedies: ImportantRemedy[];
  quickRevisionBox: {
    keyNotes: string[];
    miasmaticDominance: string;
    thermalState: string;
    organAffinity: string;
    memoryMnemonic: string;
  };
  mcqs: MCQ[];
}

export const diseaseHubData: Disease[] = [
  {
    id: "migraine",
    title: "Migraine & Vascular Headaches",
    category: "Nervous System",
    definition: "A primary headache disorder characterized by recurrent, moderate-to-severe, unilateral, throbbing headache attacks lasting 4–72 hours, typically associated with autonomic symptoms like nausea, vomiting, photophobia, and phonophobia.",
    causes: [
      "Cortical Spreading Depression (CSD) triggering trigeminal nerve activation.",
      "Release of vasoactive neuropeptides such as Calcitonin Gene-Related Peptide (CGRP) and Substance P.",
      "Meningeal vasodilation and neurogenic inflammation.",
      "Fluctuations in estrogen levels (menstrual migraine).",
      "Genetic predisposition (e.g., CACNA1A, SCN1A genes in familial hemiplegic migraine)."
    ],
    riskFactors: [
      "Female gender (3:1 ratio post-puberty).",
      "Family history of primary headaches.",
      "High psychological stress, sleep deprivation, or irregular meal schedules.",
      "Dietary triggers: Tyramine-rich foods (cheese, wine), monosodium glutamate (MSG), chocolate, artificial sweeteners.",
      "Sensory overload: Bright lights, flickering screens, loud noises, strong odors."
    ],
    pathogenesis: "Initiated by Cortical Spreading Depression (CSD), a self-propagating wave of neuronal depolarization across the cerebral cortex. This wave depolarizes trigeminal sensory afferents, causing the release of calcitonin gene-related peptide (CGRP). CGRP acts on meningeal blood vessels to induce vasodilation, plasma extravasation, and mast cell degranulation, establishing neurogenic inflammation. Signals are transmitted back through the trigeminal ganglion to the trigeminocervical complex (TCC), projecting to the thalamus and cortex, presenting as severe pulsating pain.",
    clinicalFeatures: [
      "Unilateral, pulsating, throbbing headache.",
      "Aura phase (in 25-30%): Visual scotomas, scintillating flashes, or paresthesias appearing 10-60 minutes before pain.",
      "Nausea, vomiting, and loss of appetite.",
      "Severe photophobia (sensitivity to light) and phonophobia (sensitivity to sound).",
      "Osmophobia (sensitivity to smells).",
      "Physical activity aggravates pain, leading patients to seek rest in a dark, quiet room."
    ],
    investigations: [
      "Clinical Diagnosis: Primarily based on International Classification of Headache Disorders (ICHD-3) criteria.",
      "Brain MRI/CT: Done only to rule out secondary causes (e.g., brain tumor, aneurysm, arterio-venous malformation) if red flags like sudden 'thunderclap' onset, papilledema, or focal neurological deficits are present.",
      "Lumbar Puncture: To rule out meningitis or idiopathic intracranial hypertension if clinically indicated."
    ],
    differentialDiagnosis: [
      "Tension-Type Headache: Bilateral, non-pulsating, squeezing 'band-like' pain; no photophobia/vomiting.",
      "Cluster Headache: Unilateral, excruciating periorbital pain lasting 15-180 mins; accompanied by lacrimation, rhinorrhea, and restlessness.",
      "Temporomandibular Joint (TMJ) Dysfunction: Pain localized to chewing muscles, clicking jaw joints.",
      "Subarachnoid Hemorrhage: 'Worst headache of life', sudden thunderclap onset, neck stiffness."
    ],
    treatmentOverview: "Conventional treatment involves acute abortive therapy (triptans like Sumatriptan, NSAIDs, CGRP receptor antagonists) and preventive therapy (beta-blockers like Propranolol, anticonvulsants like Topiramate, tricyclic antidepressants, and CGRP monoclonal antibodies). Lifestyle modifications, sleep hygiene, trigger avoidance, and biofeedback play vital supportive roles.",
    homoeopathicApproach: "Classical Homoeopathy views migraine as a chronic constitutional disease with acute exacerbations. The homoeopath analyzes the pain's character (throbbing, splitting, stitching), localization (right vs. left-sided, forehead vs. occiput), accompanying symptoms (visual disturbance, gastric irritability, emotional distress), and specific environmental modalities (better for pressure, cold application, quiet dark room). Preventive prescribing focuses on deep-acting constitutional remedies to correct the underlying miasmatic dyscrasia (typically Psora-Sycosis).",
    topTenRemedies: [
      {
        name: "Belladonna (Atropa Belladonna)",
        keyIndications: "Sudden onset of violent, throbbing, pulsating pain. Red, hot face, dilated pupils. Pain starts in occiput and settles in right temple/eye. Sensation as if brain rises and falls with each step.",
        modalities: "Worse from: Motion, light, noise, jar, lying down. Better from: Semi-erect posture, firm pressure, dark quiet room.",
        constitution: "Plethoric, robust individuals, highly sensitive to sensory impressions.",
        potencyTips: "30C to 200C in repeated water doses during acute paroxysms."
      },
      {
        name: "Sanguinaria Canadensis (Bloodroot)",
        keyIndications: "Classic right-sided migraine. Pain starts in the morning in the occiput, spreads upward and settles over the right eye. Pain increases and decreases with the sun's course. Bilious vomiting at the peak of headache, which brings relief.",
        modalities: "Worse from: Motion, noise, light, sun. Better from: Quiet dark room, sleep, lying down, passing flatus or bilious vomiting.",
        constitution: "Sanguineous temperaments; patients prone to vasomotor flushes of heat.",
        potencyTips: "30C twice daily or 200C on onset."
      },
      {
        name: "Spigelia Anthelmia (Pinkroot)",
        keyIndications: "Classic left-sided migraine. Neuralgic, stitching, tearing pain. Pain starts in the occiput/neck, radiates forward and settles over and deep in the left eye. Sensation as if the eye is too large.",
        modalities: "Worse from: Least motion, noise, looking down, cold damp air. Better from: Lying on right side with head elevated, warmth.",
        constitution: "Irritable, nervous, rheumatic individuals.",
        potencyTips: "30C or 200C. Highly useful in ophthalmic neuralgias."
      },
      {
        name: "Gelsemium Sempervirens (Yellow Jasmine)",
        keyIndications: "Headache preceded by blindness or visual aura. Pain starts in the neck/occiput and spreads over the entire head. Sensation of a heavy band around forehead. Extreme dullness, drowsiness, dizziness, and muscle weakness. Headache is relieved by copious urination.",
        modalities: "Worse from: Damp weather, emotional excitement, warmth. Better from: Copious pale urination, lying with head high, open air.",
        constitution: "Nervous, quiet, easily terrified temperaments.",
        potencyTips: "30C or 200C. Excellent in anticipatory migraines."
      },
      {
        name: "Glonoinum (Nitro-glycerine)",
        keyIndications: "Congestive, bursting headache. Sensation as if the skull is too small for the brain. Pulsations felt in every artery of the body. Induced by sun exposure or working under gas lights.",
        modalities: "Worse from: Sun exposure, heat, motion, lying down flat. Better from: Cold applications, uncovered head, open air.",
        constitution: "Plethoric individuals prone to sudden cerebral congestions.",
        potencyTips: "6C to 30C repeated frequently during sunstroke/acute rush of blood."
      },
      {
        name: "Natrum Muriaticum (Common Salt)",
        keyIndications: "Migraine of schoolgirls or chronic sufferers. 'Hammering' headache, as if tiny hammers are beating inside the brain. Preceded or accompanied by numbness/tingling of lips, tongue, and fingers. Chronic grief, introverted nature.",
        modalities: "Worse from: 10 AM to 3 PM, sunrise to sunset, mental exertion, consolation, salt. Better from: Cold bath, lying in dark room, sweating.",
        constitution: "Anemic, reserved, weeping tendency when alone, holds onto old grudges.",
        potencyTips: "200C to 1M. Deep-acting constitutional remedy; do not repeat frequently."
      },
      {
        name: "Iris Versicolor (Blue Flag)",
        keyIndications: "Frontal headache associated with intense acid dyspepsia and bilious, burning vomiting that excoriates the throat. Headache begins with a visual blur or spotty aura.",
        modalities: "Worse from: Mental exhaustion, rest, cold air. Better from: Continued motion, vomiting of sour fluid.",
        constitution: "Gastric-bilious diathesis, students and mental workers.",
        potencyTips: "30C or 200C."
      },
      {
        name: "Silicea (Pure Silica)",
        keyIndications: "Chronic headache of nervous origin, starting in the neck and rising to the vertex and settling over the right eye. Chronic exhaustion, coldness of the body.",
        modalities: "Worse from: Mental exertion, drafts of cold air, uncovering the head. Better from: Wrapping the head up warmly, hot applications, pressure.",
        constitution: "Delicate, chilly, highly intellectual but physically fragile, lack of grit.",
        potencyTips: "30C to 200C. Avoid repeating too frequently."
      },
      {
        name: "Lachesis Muta (Bushmaster)",
        keyIndications: "Left-sided headache. Throbbing, bursting pain, worse after sleeping (the patient sleeps into a headache). Associated with hormonal transitions (menopause, premenstrual phase). Congestive purple face, hyper-loquacious.",
        modalities: "Worse from: Sleep, hot baths, pressure or touch on neck, tight clothing. Better from: Onset of discharges (menstrual flow).",
        constitution: "Sanguine-choleric, highly expressive, jealous, hot-blooded individuals.",
        potencyTips: "200C to 1M."
      },
      {
        name: "Epiphegus Virginiana (Beechdrop)",
        keyIndications: "Nervous, tired headache brought on by unusual mental or physical exertion, shopping, or excitement ('tired headache' or neurasthenia). Constant spitting of saliva during pain.",
        modalities: "Worse from: Working hard, excitement, shopping. Better from: Rest, sleep.",
        constitution: "Physically weak, easily fatigued individuals.",
        potencyTips: "Q (Mother tincture) or 3X to 30C."
      }
    ],
    quickRevisionBox: {
      keyNotes: [
        "Sanguinaria: Right-sided, increases/decreases with the sun.",
        "Spigelia: Left-sided, neuralgic pain settles in left eye.",
        "Gelsemium: Relieved by copious urination, dull/drowsy/dizzy.",
        "Glonoine: Bursting, sun-induced congestive headache.",
        "Silicea: Headache better by wrapping up head warmly."
      ],
      miasmaticDominance: "Psora (sensory irritability, neuralgias) and Sycosis (chronic vascular congestions, localizing pain).",
      thermalState: "Chilly (Silicea, Nat-mur, Sanguinaria) vs. Hot (Belladonna, Glonoine, Lachesis).",
      organAffinity: "Trigeminal nerve, Cerebral Vasculature, Meninges, Ophthalmic nerves.",
      memoryMnemonic: "S-P-I-G-E-L-I-A: S=Sore left eye, P=Periodical, I=In occiput starting, G=Great stabbing pain, E=Elevated head relieves, L=Least motion worsens, I=Irritation of nerves, A=Anxiety."
    },
    mcqs: [
      {
        id: "mig-q1",
        question: "Which of the following remedies is characterized by a right-sided headache that starts in the occiput, rises to the vertex, settles over the right eye, and is relieved by lying in a dark room and sleeping?",
        options: [
          "Spigelia Anthelmia",
          "Sanguinaria Canadensis",
          "Silicea",
          "Natrum Muriaticum"
        ],
        correctAnswer: 1,
        explanation: "Sanguinaria is the classic right-sided headache remedy. The pain rises from the occiput to the right eye, increases/decreases with the sun, and is relieved by sleep and dark."
      },
      {
        id: "mig-q2",
        question: "A patient presents with a severe bursting headache, feeling as if the skull is too small. He was working under the hot sun all day. What is the most appropriate acute remedy?",
        options: [
          "Gelsemium",
          "Belladonna",
          "Glonoinum",
          "Natrum Mur"
        ],
        correctAnswer: 2,
        explanation: "Glonoinum is indicated for congestive, bursting headaches brought on by exposure to the sun or heat, where the patient feels pulsating in every artery."
      },
      {
        id: "mig-q3",
        question: "What unique modalities differentiate a Gelsemium headache from other congestive headaches?",
        options: [
          "Relieved by copious pale urination",
          "Worse from hot applications",
          "Better by walking fast",
          "Worse after eating a heavy meal"
        ],
        correctAnswer: 0,
        explanation: "A Gelsemium headache is characteristically preceded by blindness and accompanied by extreme dullness and heavy eyelids, and is remarkably relieved by copious pale urination."
      }
    ]
  },
  {
    id: "gerd-acidity",
    title: "Acid Peptic Disease & GERD",
    category: "Digestive System",
    definition: "A chronic gastrointestinal disorder where stomach acid or bile frequently flows back into the esophagus, irritating the esophageal lining, manifesting as heartburn, regurgitation, and dyspepsia.",
    causes: [
      "Transient lower esophageal sphincter (LES) relaxations.",
      "Impaired esophageal acid clearance or delayed gastric emptying.",
      "Hiatal hernia compromising the diaphragmatic sphincter.",
      "Increased intra-abdominal pressure (pregnancy, obesity).",
      "Hypersecretion of hydrochloric acid in the stomach gastric mucosa."
    ],
    riskFactors: [
      "Obesity and sedentary lifestyle.",
      "Pregnancy.",
      "Smoking, alcohol, and caffeine consumption.",
      "Dietary habits: Late-night dining, eating fatty, spicy, or fried foods, citrus fruits, and mint.",
      "Medications: NSAIDs, calcium channel blockers, antihistamines, and sedatives."
    ],
    pathogenesis: "Acid Peptic Disease (APD) and Gastroesophageal Reflux Disease (GERD) result from an imbalance between aggressive factors (gastric acid, pepsin, bile) and defensive mucosal factors (bicarbonate barrier, mucosal blood flow, tight junctions). In GERD, the primary mechanism is dysfunction of the Lower Esophageal Sphincter (LES). Normal LES pressure is 10-30 mmHg; in GERD, transient LES relaxations (TLESRs) occur independent of swallowing, allowing reflux of gastric contents. Prolonged contact of acidic gastric juice (pH < 4.0) with esophageal squamous epithelium leads to chemical esophagitis, erosions, and potentially Barrett's esophagus (intestinal metaplasia).",
    clinicalFeatures: [
      "Heartburn (pyrosis): Burning chest pain located retrosternally, worse after meals and when lying flat.",
      "Acid regurgitation: Sour or bitter fluid backing up into the throat or mouth.",
      "Water brash: Sudden filling of mouth with saliva triggered by acid reflux.",
      "Dysphagia or odynophagia (in advanced cases due to strictures).",
      "Extra-esophageal symptoms: Chronic dry cough, hoarseness (reflux laryngitis), asthma-like wheezing, dental erosions."
    ],
    investigations: [
      "Upper Gastrointestinal Endoscopy (Esophagogastroduodenoscopy - EGD): The gold standard to visualize esophageal mucosal damage, hiatal hernia, and rule out Barrett's esophagus or malignancy.",
      "24-Hour Ambulatory pH Monitoring: Measures the frequency and duration of acid reflux into the esophagus.",
      "Esophageal Manometry: Evaluates esophageal motility and lower esophageal sphincter function.",
      "H. pylori Testing: Serology, Urea Breath Test, or stool antigen to rule out active peptic ulcer-associated infection."
    ],
    differentialDiagnosis: [
      "Angina Pectoris or Myocardial Infarction: Must rule out cardiac causes first; cardiac pain is typically exertional, radiates to jaw/arm, and is accompanied by dyspnea.",
      "Esophageal Spasm: Retrosternal pain with severe swallowing difficulties, relieved by nitrates.",
      "Peptic Ulcer Disease (PUD): Epigastric burning pain, specifically timed with food intake (duodenal ulcer is relieved by food; gastric ulcer is worsened)."
    ],
    treatmentOverview: "Conventional treatment focuses on acid suppression using Proton Pump Inhibitors (PPIs like Omeprazole, Pantoprazole), H2 Receptor Antagonists (Famotidine), and antacids. Lifestyle changes include elevating the head of the bed (6 inches), eating smaller meals, avoiding lying down for 3 hours post-meals, and weight loss.",
    homoeopathicApproach: "Homeopathy addresses acid peptic disease by evaluating individual digestive patterns, constitutional susceptibility, and psychosomatic triggers (e.g., stress, anger, workaholism). Prescription parameters include the taste of eructations (sour, bitter, rancid), the timing of flatulence, stomach pain characteristics (burning, cramping, weight-like), and dietary cravings/aversions. Constitutional remedies address dysmotility, emotional stress, and chronic mucosal inflammation without inducing long-term hypochlorhydria.",
    topTenRemedies: [
      {
        name: "Nux Vomica (Poison Nut)",
        keyIndications: "The premier remedy for modern high-stress lifestyles. Acidity, heartburn, and gas after overeating, alcohol, coffee, spices, or late-night study. Epigastric weight, like a stone in the stomach, hours after eating. Ineffectual urging for stool; must strain but passes little.",
        modalities: "Worse from: Eating, cold, morning, mental exertion, stimulants. Better from: Warm drinks, resting, short naps, passing flatus.",
        constitution: "Thin, irritable, workaholic, impatient, sedentary, highly intellectual males.",
        potencyTips: "30C or 200C at bedtime. Highly responsive."
      },
      {
        name: "Carbo Vegetabilis (Vegetable Charcoal)",
        keyIndications: "The 'corpse reviver' of homeopathy. Extreme, bloated distension of the upper abdomen. Simplest food turns into gas. Constant, loud belching which provides temporary relief. Sensation of burning heat in the stomach. Desires to be fanned rapidly from a close distance.",
        modalities: "Worse from: Rich fat foods, milk, lying flat. Better from: Belching, cold air, being fanned.",
        constitution: "Apathetic, elderly, sluggish individuals with poor venous circulation.",
        potencyTips: "30C to 200C in repeated dry doses."
      },
      {
        name: "Arsenicum Album (Arsenic Trioxide)",
        keyIndications: "Epigastric pain characterized by intense burning, like hot coals. Vomiting of bile, mucus, or blood. Sensation of fear, anxiety, and extreme restlessness. Thirst for small quantities of warm water at frequent intervals.",
        modalities: "Worse from: Midnight to 2 AM, cold drinks, sight/smell of food. Better from: Heat in general, warm drinks, company.",
        constitution: "Fastidious, neat, anxious, chilly individuals.",
        potencyTips: "30C or 200C."
      },
      {
        name: "Robinia Pseudoacacia (Yellow Locust)",
        keyIndications: "Remarkably intense, hyper-acidic state. All eructations, stools, perspiration, and vomit are extremely sour. Sour vomiting that 'sets the teeth on edge.' Heartburn is accompanied by a dull, throbbing frontal headache.",
        modalities: "Worse from: Night, lying down, starchy foods. Better from: Eating, warm food.",
        constitution: "Irritable, nervous dyspeptics.",
        potencyTips: "Q (Mother Tincture) 5 drops in water, or 3X to 6C."
      },
      {
        name: "Lycopodium Clavatum (Club Moss)",
        keyIndications: "Lower abdominal bloating. Epigastric fullness felt after taking just 'a few bites' of food (early satiety). Hunger but full as soon as he starts eating. Acidity with sour taste in mouth, sour belching. Great desire for warm food and sweets.",
        modalities: "Worse from: 4 PM to 8 PM, cold food/drinks, pressure. Better from: Warm drinks, warm food, passing gas.",
        constitution: "Intellectual, lacking physical self-confidence, apprehensive, looks older than age.",
        potencyTips: "200C or higher. Deep-acting; do not repeat frequently."
      },
      {
        name: "Pulsatilla Pratensis (Wind Flower)",
        keyIndications: "Heartburn and dyspepsia from eating heavy, rich, fatty foods, pork, pastries, or ice cream. Water brash, greasy eructations, tongue coated thick white. Complete absence of thirst. Changeable symptoms.",
        modalities: "Worse from: Fat foods, warm close room, evening. Better from: Open fresh air, gentle slow walking, cold drinks.",
        constitution: "Gentle, mild, weeping, blonde females, craves sympathy and consolation.",
        potencyTips: "30C to 200C."
      },
      {
        name: "Phosphorus (Yellow Phosphorus)",
        keyIndications: "Burning in stomach, extending to throat and back, relieved temporarily by cold water. As soon as the cold water becomes warm in the stomach, it is thrown up as vomit. Craves cold drinks, ice cream, salt.",
        modalities: "Worse from: Warm food/drinks, lying on left side, twilight. Better from: Cold food, ice, massage, sleeping.",
        constitution: "Tall, slender, fair, expressive, sensitive to external impressions, hemorrhagic tendency.",
        potencyTips: "30C to 200C."
      },
      {
        name: "Argemone Mexicana (Prickly Poppy)",
        keyIndications: "Acid dyspepsia with painful, crampy stomach contractions, water brash, and flatulence. Vomiting of sour, bitter fluids. Relieves acidity with constant urge to pass stool.",
        modalities: "Worse from: Eating. Better from: Belching, warm food.",
        constitution: "Weak, cachectic individuals.",
        potencyTips: "Q (Mother Tincture) or 3X."
      },
      {
        name: "Anacardium Orientale (Marking Nut)",
        keyIndications: "Nervous dyspepsia where stomach pain is completely relieved by eating. As soon as the stomach is empty, pain, burning, and empty sinking feeling return. Associated with extreme irritability and double-mind.",
        modalities: "Worse from: Empty stomach. Better from: Eating.",
        constitution: "Nervous, hypochondriacal individuals with loss of memory.",
        potencyTips: "30C."
      },
      {
        name: "Bismuthum Subnitricum (Precipitated Bismuth)",
        keyIndications: "Severe gastritis with immediate vomiting of water as soon as it reaches the stomach. Pain is burning, cramping, or cardialgic, forcing the patient to bend backward. Associated with intense loneliness and desire for company.",
        modalities: "Worse from: Eating, drinking, being alone. Better from: Cold drinks (temporarily), bending backward.",
        constitution: "Debilitated, anxious, nervous individuals.",
        potencyTips: "3C to 30C."
      }
    ],
    quickRevisionBox: {
      keyNotes: [
        "Nux Vomica: Epigastric stone, ineffectual urging, caused by stimulants/stress.",
        "Carbo Veg: UPPER abdominal bloating, constant belching, wants rapid fanning.",
        "Robinia: Extreme sourness; eructations set teeth on edge.",
        "Lycopodium: LOWER bloating, 4-8 PM aggravation, early satiety, desires warm foods.",
        "Anacardium: Stomach pain completely relieved by eating."
      ],
      miasmaticDominance: "Psora (acid reflux, functional dyspepsia) and Sycosis (hiatal hernia, structural sphincter changes).",
      thermalState: "Chilly (Nux-v, Arsenicum, Lycopodium) vs. Hot (Pulsatilla, Phosphorus).",
      organAffinity: "Lower Esophageal Sphincter, Gastric Mucosa, Vagus Nerve, Duodenum.",
      memoryMnemonic: "A-C-I-D: A=Anacardium (eating relieves), C=Carbo Veg (bloating & belching), I=Iris Versicolor (burning esophagus), D=Disorder from fats (Pulsatilla)."
    },
    mcqs: [
      {
        id: "gerd-q1",
        question: "Which homeopathic remedy has the characteristic symptom: 'Pain in the stomach is temporarily relieved by eating, but returns as soon as the stomach becomes empty again'?",
        options: [
          "Nux Vomica",
          "Anacardium Orientale",
          "Carbo Veg",
          "Arsenicum Album"
        ],
        correctAnswer: 1,
        explanation: "Anacardium is famous for nervous dyspepsia where the pain is completely relieved by eating, returning when the stomach is empty."
      },
      {
        id: "gerd-q2",
        question: "A patient presents with severe upper abdominal bloating. He states that the simplest food turns into gas, and he is constantly belching, which brings minor relief. He feels extremely cold and begs for the windows to be opened and to be fanned. What is the remedy?",
        options: [
          "Lycopodium",
          "Pulsatilla",
          "Carbo Vegetabilis",
          "China Officinalis"
        ],
        correctAnswer: 2,
        explanation: "Carbo veg is characterized by upper abdominal gas, massive bloating, relief from belching, coldness, and an intense desire to be fanned."
      },
      {
        id: "gerd-q3",
        question: "Which of the following remedies is best indicated for acidity in a busy, impatient, workaholic business executive who drinks excess coffee, eats spicy food, and suffers from constipation with ineffectual urging?",
        options: [
          "Lycopodium",
          "Pulsatilla",
          "Sulfur",
          "Nux Vomica"
        ],
        correctAnswer: 3,
        explanation: "Nux Vomica is the archetypal remedy for sedentary, highly stressed, stimulant-using individuals who experience ineffectual purging and heartburn."
      }
    ]
  },
  {
    id: "bronchial-asthma",
    title: "Bronchial Asthma & Allergies",
    category: "Respiratory",
    definition: "A chronic inflammatory disorder of the airways characterized by hyper-responsiveness, reversible airway obstruction, bronchospasm, mucus plugging, and remodeling, presenting as wheezing, dyspnea, and coughing.",
    causes: [
      "Type I Hypersensitivity reaction triggered by allergens (dust mites, pollen, pet dander).",
      "Genetic predisposition (atopy, chromosome 5q mapping).",
      "Airway hyper-reactivity to cold air, physical exercise, or viral infections.",
      "Occupational chemical exposure (isocyanates, wood dust).",
      "Inhibition of cyclooxygenase pathways (aspirin-induced asthma)."
    ],
    riskFactors: [
      "Personal or family history of atopic diseases (eczema, allergic rhinitis).",
      "Exposure to environmental tobacco smoke.",
      "Air pollution and particulate matter.",
      "Obesity.",
      "Recurrent viral respiratory infections during early childhood."
    ],
    pathogenesis: "Asthma is characterized by airway inflammation, hyper-responsiveness, and bronchoconstriction. In allergic asthma, exposure to an allergen activates CD4+ T-helper 2 (Th2) cells. These Th2 cells secrete cytokines (IL-4, IL-5, IL-13) that stimulate B-cells to produce IgE antibodies. IgE binds to high-affinity receptors on mast cells. Subsequent allergen exposure cross-links IgE, triggering mast cell degranulation and the release of histamine, leukotrienes, and prostaglandins. This induces immediate bronchoconstriction. The late-phase reaction (hours later) recruits eosinophils, causing epithelial desquamation, mucus plug formation, and eventually subepithelial collagen deposition (airway remodeling).",
    clinicalFeatures: [
      "Recurrent episodes of expiratory wheezing.",
      "Dyspnea (shortness of breath) with prolonged expiratory phase.",
      "Dry, hacking, or spasmodic cough, often worse at night.",
      "Chest tightness or constriction.",
      "Use of accessory respiratory muscles, tachypnea, and nasal flaring during acute attacks."
    ],
    investigations: [
      "Spirometry (Pulmonary Function Test): Demonstrates obstructive pattern (reduced FEV1/FVC ratio < 70%) with significant bronchodilator reversibility (FEV1 increases by > 12% and 200ml after inhaling Albuterol).",
      "Peak Expiratory Flow (PEF) Metering: Measures diurnal variation to monitor control.",
      "Methacholine Challenge Test: Performed if spirometry is normal but asthma is suspected; measures airway hyper-responsiveness.",
      "Sputum Eosinophil Count & Serum IgE Levels: Confirm allergic/atopic phenotype."
    ],
    differentialDiagnosis: [
      "COPD (Chronic Obstructive Pulmonary Disease): Typically in older smokers; chronic productive cough, progressive dyspnea, irreversible obstruction on spirometry.",
      "Congestive Heart Failure ('Cardiac Asthma'): Presents with wheezing, but accompanied by orthopnea, paroxysmal nocturnal dyspnea, cardiomegaly, and bilateral basal crackles.",
      "Vocal Cord Dysfunction: Sensation of throat tightness, inspiratory stridor, unresponsive to bronchodilators."
    ],
    treatmentOverview: "Conventional management consists of relievers (Short-Acting Beta-Agonists like Albuterol) and controllers (Inhaled Corticosteroids like Fluticasone, Long-Acting Beta-Agonists, Leukotriene Receptor Antagonists like Montelukast, and monoclonal antibodies like Omalizumab targeting IgE). Trigger identification and desensitization are key long-term therapies.",
    homoeopathicApproach: "In homoeopathy, asthma is categorized as a deep-seated constitutional disease with a strong miasmatic foundation (often Tubercular or Syco-syphilitic). Prescribing involves distinguishing acute emergency remedies (e.g., Mother tinctures of Blatta, Aspidosperma, or Lobelia to relieve active bronchospasms) from deep-acting constitutional remedies (e.g., Natrum Sulph, Arsenicum Alb, Phosphorus) that modify the underlying hyper-responsiveness. The homoeopath carefully maps modalities, thermal reactions, sweat patterns, and physical triggers.",
    topTenRemedies: [
      {
        name: "Arsenicum Album (Arsenic Trioxide)",
        keyIndications: "The most frequently indicated remedy for acute asthma. Attacks occur midnight to 2 AM. Extreme dyspnea, cannot lie down for fear of suffocation; must sit bent forward. Dry cough with scanty frothy sputum. Intense fear of death, restlessness, and anxiety. Thirst for small sips of cold water.",
        modalities: "Worse from: Midnight, cold air, lying flat, physical exertion. Better from: Hot drinks, warm applications, sitting erect, company.",
        constitution: "Chilly, anxious, fastidious, physically exhausted patients.",
        potencyTips: "30C or 200C repeated every 15 minutes during acute distress."
      },
      {
        name: "Natrum Sulphuricum (Sodium Sulfate)",
        keyIndications: "The classic remedy for hereditary, constitutional asthma. Attacks are triggered or aggravated by cold, damp weather, damp basements, or living near water. Loud rattling of mucus in chest; green, thick, salty sputum. Soreness of chest; must hold chest during cough.",
        modalities: "Worse from: Damp weather, morning (4 AM to 5 AM), humid air. Better from: Dry warm weather, pressure, expectorating.",
        constitution: "Hydrogenoid constitution (sensitive to water and humidity), serious, practical individuals.",
        potencyTips: "200C to 1M. Highly effective as a long-term preventive."
      },
      {
        name: "Ipecacuanha (Cephaelis Ipecacuanha)",
        keyIndications: "Spasmodic, asthmatic cough with persistent, unrelenting nausea. Sensation of constriction in chest. Massive accumulation of mucus with loud rattling, but no expectoration (tight chest). Dyspnea, gagging, and vomiting of mucus.",
        modalities: "Worse from: Warm humid air, motion, cold winds. Better from: Resting, cold drinks.",
        constitution: "Children, irritable, pale-faced individuals.",
        potencyTips: "30C frequently to clear mucus rattling and soothe bronchospasms."
      },
      {
        name: "Blatta Orientalis (Indian Cockroach)",
        keyIndications: "A highly effective specific remedy for acute asthma attacks, especially when associated with bronchitis or dampness. Acts as a natural bronchodilator. Rapid, heavy breathing, yellow pus-like sputum.",
        modalities: "Worse from: Damp cold air, night, lying flat. Better from: Sitting up, coughing up sputum.",
        constitution: "Dyspneic, corpulent individuals, allergic to household dust.",
        potencyTips: "Q (Mother Tincture) 5-10 drops in warm water repeated every 15 minutes, or 3X."
      },
      {
        name: "Spongia Tosta (Roasted Sponge)",
        keyIndications: "Dry, barking, croupy, 'sawing-wood' cough. Sensation of extreme dryness in larynx and trachea. Suffocative attacks, wakes up gasping for air, usually before midnight.",
        modalities: "Worse from: Dry cold winds, lying flat, sleeping into it. Better from: Eating, drinking warm liquids.",
        constitution: "Scrofulous, fair-skinned children with glandular swellings.",
        potencyTips: "30C."
      },
      {
        name: "Antimonium Tartaricum (Tartar Emetic)",
        keyIndications: "Extreme rattling of mucus in the chest, yet chest is too weak to expel it. Sensation of drowning in secretions. Great drowsiness, exhaustion, pale bluish face, cold sweat. Desires to be left alone.",
        modalities: "Worse from: Warm room, lying down, damp weather. Better from: Sitting erect, expectoration.",
        constitution: "Elderly, infants, deeply debilitated individuals.",
        potencyTips: "30C to 200C in warm water."
      },
      {
        name: "Sambucus Nigra (Elder)",
        keyIndications: "Spasmodic asthma in children. Child wakes up suddenly at night, gasping, blue in face, unable to breathe out. Profuse, drenching sweat on waking up. Nose is completely blocked, dry.",
        modalities: "Worse from: Dry cold air, lying down, midnight. Better from: Sitting up in bed, motion.",
        constitution: "Infants and children prone to sudden suffocative catarrhs.",
        potencyTips: "30C."
      },
      {
        name: "Lobelia Inflata (Indian Tobacco)",
        keyIndications: "Asthma accompanied by extreme gastric weakness, a sensation of 'empty sinking' or weight in stomach. Feeling of constriction in the chest, as if the air tubes are tightly bound.",
        modalities: "Worse from: Cold, exertion, tobacco smoke. Better from: Rapid walking, warmth.",
        constitution: "Nervous, hypochondriacal individuals.",
        potencyTips: "Q (Mother Tincture) or 3X."
      },
      {
        name: "Medorrhinum (Gonorrheal Virus)",
        keyIndications: "Severe, chronic, inherited asthmatic states. Child can only breathe while lying flat on the stomach, or in the knee-chest position. Intense desire for cold drinks, ice, and salt. Deep-seated syco-tubercular miasm.",
        modalities: "Worse from: Sunrise to sunset, damp heat, thinking of symptoms. Better from: Lying on stomach, knee-chest position, seaside.",
        constitution: "Self-centered, hurried, passionate, sycotic individuals.",
        potencyTips: "200C to 1M (constitutional, use caution)."
      },
      {
        name: "Psorinum (Scabies Vesicle)",
        keyIndications: "Asthma of tubercular sufferers, accompanied by dry, itchy eczema in joint folds. Patient is extremely sensitive to drafts of cold air. Sensation of dyspnea, relieved only by lying flat on the back with arms stretched wide apart.",
        modalities: "Worse from: Cold air, winter, change of weather. Better from: Lying flat on back with arms wide apart, warm clothing.",
        constitution: "Chilly, offensive, pessimistic, skin-eruption prone individuals.",
        potencyTips: "200C to 1M."
      }
    ],
    quickRevisionBox: {
      keyNotes: [
        "Arsenicum: Midnight-2 AM, must sit bent forward, anxious, sipping water.",
        "Nat-Sulph: Asthma from damp cold, rattles at 4-5 AM, green salty sputum.",
        "Ipecac: Constant nausea with clear chest rattling and gagging.",
        "Blatta: Emergency mother tincture, acts as a rapid bronchodilator.",
        "Medorrhinum: Asthma relieved ONLY by lying on the stomach or in knee-chest."
      ],
      miasmaticDominance: "Tubercular (recurrent respiratory infections, allergic diathesis) and Sycosis (thick discharges, dyspnea from damp).",
      thermalState: "Very Chilly (Arsenicum, Psorinum) vs. Hot (Medorrhinum, Pulsatilla).",
      organAffinity: "Bronchioles, Vagus Nerve, Respiratory Center, Lungs.",
      memoryMnemonic: "B-R-O-N-C-H-I-A-L: B=Blatta (acute), R=Rattling mucus (Ant-t), O=Occurs in damp (Nat-s), N=Nausea (Ipecac), C=Chilly (Arsenicum), H=Hot drinks relieve (Ars), I=IgE mediated, A=Attacks at midnight, L=Lying on stomach relieves (Med)."
    },
    mcqs: [
      {
        id: "ast-q1",
        question: "A child suffers from severe asthma that is triggered every time the weather changes to cold and damp. The chest rattles loudly with green, thick mucus, and the child's father also had asthma. What is the most indicated constitutional remedy?",
        options: [
          "Arsenicum Album",
          "Natrum Sulphuricum",
          "Spongia Tosta",
          "Sambucus Nigra"
        ],
        correctAnswer: 1,
        explanation: "Natrum Sulphuricum is the premier sycotic, hydrogenoid remedy for asthma triggered by damp cold weather and hereditary asthma."
      },
      {
        id: "ast-q2",
        question: "A child wakes up gasping for air at 1 AM. He is intensely restless, pacing the room, terrified of dying, and wants hot water in small sips. He is extremely cold. Which remedy fits this clinical picture?",
        options: [
          "Ipecac",
          "Natrum Sulph",
          "Arsenicum Album",
          "Medorrhinum"
        ],
        correctAnswer: 2,
        explanation: "Arsenicum Album is characterized by midnight-2 AM aggravation, burning pain, restlessness, fear of death, extreme chilliness, and desire for warm drinks in small sips."
      },
      {
        id: "ast-q3",
        question: "Which of the following remedies is uniquely characterized by a severe asthmatic condition that is relieved only when the patient lies flat on their stomach or in a knee-chest position?",
        options: [
          "Medorrhinum",
          "Psorinum",
          "Ipecac",
          "Antimonium Tart"
        ],
        correctAnswer: 0,
        explanation: "Medorrhinum has a unique modality where the patient can only breathe or sleep comfortably by lying flat on the stomach or in the knee-chest posture."
      }
    ]
  }
];
