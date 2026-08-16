import { FMTChapterDetail } from './fmtDetailedChapters';

export const FMT_SECTION_B_CHAPTERS_PART2: FMTChapterDetail[] = [
  {
    id: 'cardiac-poisons',
    chapterNumber: 31,
    title: 'Cardiac Poisons - Digitalis, Oleander (Nerium & Cerbera), Aconite, Hydrocyanic Acid (Cyanide)',
    section: 'Section B: Forensic Toxicology',
    readTime: '26 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Master Digitalis purpurea (Foxglove) toxicity and Digibind antidote.',
      'Master Oleander Toxicity: Pink Oleander (Nerium odorum) vs Yellow Oleander (Cerbera thevetia / Thevetia peruviana - Cardiac glycosides: Thevetin, Cerberin).',
      'Master Aconite (Aconitum napellus / Sweet Poison / Mitha Zahar / Indian Aconite / Bish - Tingling and numbness, Hippocratic facies).',
      'Master Hydrocyanic Acid (HCN / Cyanide): Cytochrome oxidase inhibition, Bitter almond odor, Cherry-red blood, Hydroxocobalamin / Nitrite-Thiosulfate antidote kit.'
    ],
    introduction: `Cardiac poisons exert direct destructive action on heart muscle, cardiac conduction pathways, or cellular oxygen respiration. In India, Yellow Oleander (Cerbera thevetia) seeds are frequently ingested for suicide in rural areas, while Aconite (Mitha Zahar) is used as an arrow or homicidal poison. Hydrocyanic acid (Cyanide) causes near-instantaneous cellular asphyxiation.`,
    whyThisMatters: `Yellow Oleander contains digitalis-like cardiac glycosides (Thevetin A & B, Cerberin) causing AV block and hyperkalemia. Cyanide inhibits Cytochrome Oxidase aa3, halting cellular respiration and turning blood cherry red; Hydroxocobalamin is the modern antidote.`,
    simpleExplanation: `Yellow Oleander seeds cause severe heart block and vomiting (treated with Digibind / Atropine / Insulin-dextrose). Aconite causes characteristic intense tingling and numbness in mouth and tongue, followed by cardiac arrhythmias. Hydrocyanic Acid (Cyanide) smells like Bitter Almonds; it blocks oxygen usage inside cells, so venous blood remains filled with oxygen, turning the blood and organs bright CHERRY RED!`,
    keyTerms: [
      { term: 'Cyanide Cytochrome Oxidase Inhibition', definition: 'Cyanide binds ferric (Fe3+) ion of Cytochrome Oxidase aa3 in mitochondria, halting electron transport chain and oxidative phosphorylation, causing histotoxic hypoxia.', simpleExplanation: 'Cyanide blocks cells from using oxygen, causing instant cellular asphyxiation.' },
      { term: 'Hippocratic Facies', definition: 'Sunken eyes, pinched nose, cold clammy skin, and anxious expression seen in acute Aconite poisoning prior to death.', simpleExplanation: 'Anxious, pinched, cold face seen before death in Aconite poisoning.' },
      { term: 'Hydroxocobalamin (Cyanokit)', definition: 'First-line antidote for cyanide toxicity that binds cyanide to form non-toxic Cyanocobalamin (Vitamin B12) excreted in urine.', simpleExplanation: 'Modern safe antidote for cyanide poisoning converting it to Vitamin B12.' },
      { term: 'Mitha Zahar (Indian Aconite)', definition: 'Aconitum napellus root containing aconitine, causing characteristic intense oral tingling, numbness, and fatal ventricular arrhythmias.', simpleExplanation: 'Sweet poison root causing tongue numbness and fatal heart rhythms.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Cyanide Poisoning Emergency Antidote Protocol', description: 'Administer 100% oxygen + Hydroxocobalamin (5g IV over 15 mins) OR Cyanide Antidote Kit (Amyl nitrite inhalation -> Sodium nitrite 300mg IV -> Sodium thiosulfate 12.5g IV).', keyTakeaway: 'Hydroxocobalamin is the safest modern cyanide antidote.' }
    ],
    importantConcepts: [{ title: 'Yellow Oleander (Cerbera thevetia) Toxicity Features', content: 'All parts are poisonous, especially seeds. Contains Thevetin A, Thevetin B, Peruvoside. Causes vomiting, bradycardia, AV block, hyperkalemia. Treated with Digibind (Fab fragments) and cardiac pacing.', type: 'info' }],
    flowcharts: [{ title: 'Cyanide Cellular Histotoxic Hypoxia Mechanism', description: 'Pathophysiology.', steps: [{ label: '1. Cyanide Ingestion/Inhalation', description: 'Rapid systemic absorption into blood.' }, { label: '2. Cytochrome Oxidase Inhibition', description: 'Binds Fe3+ in enzyme, blocking electron transport.' }, { label: '3. Cherry-Red Venous Blood', description: 'Unused oxygen accumulates in veins -> Bright cherry-red blood.' }] }],
    tables: [{ title: 'Cardiac Poisons Summary Comparison', headers: ['Poison', 'Active Principle', 'Classic Clinical Hallmark', 'Antidote / Treatment'], rows: [['Digitalis', 'Digoxin, Digitoxin', 'Xanthopsia (yellow vision), AV block, VPBs', 'Digibind (Digoxin-Fab) + Atropine'], ['Yellow Oleander', 'Thevetin A & B, Cerberin, Peruvoside', 'Rural suicidal seed ingestion, severe bradycardia', 'Digibind / Atropine / Anti-hyperkalemic therapy'], ['Aconite (Mitha Zahar)', 'Aconitine alkaloid', 'Tingling & numbness of mouth/tongue, Hippocratic face', 'Atropine + Anti-arrhythmics (Amiodarone)'], ['Cyanide (HCN)', 'Hydrocyanic acid / Cyanide salts', 'Bitter almond odor, CHERRY-RED blood, rapid collapse', 'Hydroxocobalamin / Sodium Nitrite + Thiosulfate']] }],
    clinicalExamples: [{ title: 'Rural Suicidal Yellow Oleander Ingestion', scenario: 'A young female ingests crushed Yellow Oleander (Kaner) seeds in a village and presents with vomiting, heart rate of 34 bpm, and complete heart block on ECG.', analysis: 'Diagnosis is acute Yellow Oleander cardiac glycoside toxicity. Treated with IV Atropine, Insulin-Dextrose for hyperkalemia, and temporary cardiac pacing.', takeaway: 'Yellow Oleander causes severe bradycardia and AV block.' }],
    medicolegalImportance: ['Explains sudden cardiac collapse in rural suicides.', 'Identifies homicidal aconite arrow poisoning.', 'Detects occupational cyanide gas exposures. Check post-mortem blood color.'],
    mnemonics: [{ title: 'Cyanide Signs - "C-H-E-R-R-Y"', phrase: 'Cherry-red blood, Histotoxic hypoxia, Electron transport block, Rapid death, Respiratory arrest, Yellow almond odor', breakdown: [{ letter: 'C', word: 'Cherry-red', meaning: 'Bright red venous blood' }] }],
    commonMistakes: [{ mistake: 'Assuming blood in cyanide poisoning will be dark blue/cyanotic.', whyWrong: 'Cyanide prevents tissue cells from extracting oxygen from blood; venous blood remains fully oxygenated and bright CHERRY-RED.', correctConcept: 'Cyanide causes cherry-red blood, not cyanosis.' }],
    highYieldPoints: ['Cyanide = Bitter almond odor + CHERRY-RED blood + Cytochrome oxidase block.', 'Hydroxocobalamin = Modern cyanide antidote (forms Vitamin B12).', 'Aconite = Intense oral tingling and numbness + Hippocratic facies.', 'Yellow Oleander (Kaner) = Thevetin cardiac glycosides causing AV block.', 'Digitalis = Xanthopsia (yellow-green vision).'],
    previousExamQuestions: [{ question: 'Discuss Hydrocyanic Acid (Cyanide) poisoning, toxicity mechanism, autopsy signs, and antidotes. Detail Oleander poisoning.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'Why is blood cherry-red in cyanide poisoning?', answer: 'Cyanide blocks cellular oxygen utilization; oxygen remains unused in venous blood, imparting a bright cherry-red color.', clinicalPearl: 'Classic autopsy hallmark.' }],
    shortNotes: [{ title: 'Hydroxocobalamin in Cyanide Poisoning', answer: 'Combines with cyanide to form non-toxic Cyanocobalamin (Vitamin B12), excreted harmlessly in urine.' }],
    longQuestions: [{ title: 'Discuss Cardiac Poisons.', outline: ['Hydrocyanic acid mechanisms and cherry red blood', 'Cyanide antidote kit vs Hydroxocobalamin', 'Aconite poisoning', 'Yellow Oleander toxicity'] }],
    mcqs: [{ id: 1, question: 'Which poison produces a characteristic bitter almond odor and bright cherry-red blood at autopsy?', options: ['Carbon monoxide', 'Hydrocyanic acid (Cyanide)', 'Arsenic', 'Phosphorus'], correctIndex: 1, explanation: 'Hydrocyanic acid smells of bitter almonds and leaves blood bright cherry-red due to histotoxic hypoxia.' }],
    caseBasedQuestions: [{ id: 1, title: 'Bitter Almond Autopsy', scenario: 'Corpse with bitter almond odor and cherry-red blood.', questions: ['Poison? Antidote?'], solution: 'Cyanide; Hydroxocobalamin.', legalSections: ['Cardiac Poisons'] }],
    summary: 'Chapter 31 covers digitalis, yellow oleander, aconite (mitha zahar), cyanide, cherry-red blood, and hydroxocobalamin.',
    revisionSheet: ['Cyanide = Bitter almond + Cherry red blood.', 'Aconite = Tongue tingling.', 'Oleander = Kaner seeds = AV block.'],
    flashcards: [{ id: 1, front: 'What odor is characteristic of Hydrocyanic acid (Cyanide)?', back: 'Bitter Almond odor.', category: 'Cardiac Poisons' }]
  },
  {
    id: 'asphyxiants-gaseous-poisons',
    chapterNumber: 32,
    title: 'Asphyxiants & Gaseous Poisons - Carbon Monoxide, Carbon Dioxide, Hydrogen Sulfide, Tear Gases',
    section: 'Section B: Forensic Toxicology',
    readTime: '24 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Master Carbon Monoxide (CO): Carboxyhemoglobin (COHb), Cherry-pink postmortem lividity, Bilateral globus pallidus necrosis, 100% Normobaric / Hyperbaric Oxygen therapy.',
      'Differentiate CO Cherry-Pink Lividity vs Cyanide Cherry-Red Blood vs Cold Stiffening Lividity.',
      'Master Hydrogen Sulfide (H2S / Sewer Gas): Rotten egg odor, Rapid knock-down effect, Greenish postmortem discoloration.',
      'Understand Carbon Dioxide (CO2) & Simple Asphyxiants.',
      'Understand Tear Gases (CS, CN, CR gas) and Riot Control Agents.'
    ],
    introduction: `Toxic and asphyxiant gases cause environmental, industrial, and domestic fatalities. Carbon Monoxide ("the silent killer") produced by incomplete combustion of organic fuels (coal heaters, house fires) binds hemoglobin with 200-250 times higher affinity than oxygen. Hydrogen Sulfide ("sewer gas") causes instant "knock-down" death in sanitation workers cleaning septic tanks.`,
    whyThisMatters: `Accidental CO poisoning occurs in closed rooms with burning angithi/coal heaters in Indian winters. Hydrogen sulfide deaths in septic tanks trigger mandatory safety inquiry under Manual Scavengers Act.`,
    simpleExplanation: `Carbon Monoxide (CO) is odorless and colorless; it binds hemoglobin to form Carboxyhemoglobin (COHb), preventing oxygen delivery to tissues. At autopsy, CO poisoning produces bright CHERRY-PINK postmortem lividity and bilateral necrosis of globus pallidus in the brain! Hydrogen Sulfide (H2S) smells like rotten eggs, causing instant collapse in sewers. Treatment for CO poisoning is 100% Oxygen (or Hyperbaric Oxygen).`,
    keyTerms: [
      { term: 'Carboxyhemoglobin (COHb)', definition: 'Stable cherry-pink compound formed when Carbon Monoxide binds hemoglobin; CO affinity for hemoglobin is 200-250 times greater than oxygen.', simpleExplanation: 'Compound formed when carbon monoxide binds red blood cells.' },
      { term: 'Globus Pallidus Necrosis', definition: 'Bilateral symmetrical necrosis and softening of the globus pallidus in cerebral basal ganglia pathognomonic of carbon monoxide hypoxic damage.', simpleExplanation: 'Brain tissue softening caused by carbon monoxide oxygen starvation.' },
      { term: 'Sewer Gas (Hydrogen Sulfide / H2S)', definition: 'Colorless, toxic gas with rotten-egg odor produced by anaerobic decomposition of organic waste in sewers and septic tanks, causing rapid respiratory paralysis.', simpleExplanation: 'Rotten-egg smelling sewer gas causing instant collapse.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Carbon Monoxide Emergency Treatment Protocol', description: 'Remove victim from gas source immediately into fresh air. Administer 100% High-Flow Oxygen via non-rebreather mask (reduces COHb half-life from 5 hrs to 80 mins). Use Hyperbaric Oxygen (HBO) for severe cases.', keyTakeaway: '100% Oxygen is the specific physiological antidote.' }
    ],
    importantConcepts: [{ title: 'Differentiating Postmortem Lividity Colors', content: '1. Cherry-PINK: Carbon Monoxide (Carboxyhemoglobin), 2. Cherry-RED: Cyanide (Histotoxic hypoxia), 3. Bright RED: Exposure to extreme cold (Re-oxygenation of hypothermic blood), 4. Chocolate-BROWN: Methhemoglobinemia (Nitrates/Aniline).', type: 'info' }],
    flowcharts: [{ title: 'Carbon Monoxide Hypoxia & Brain Necrosis Flow', description: 'Pathophysiology.', steps: [{ label: '1. CO Inhalation', description: 'Binds hemoglobin 200-250x faster than O2 -> COHb.' }, { label: '2. Left Shift of O2 Curve', description: 'Haldane effect: Inhibits oxygen release to tissues.' }, { label: '3. Brain Basal Ganglia Injury', description: 'Bilateral Globus Pallidus necrosis + Cherry-pink lividity.' }] }],
    tables: [{ title: 'Toxic Asphyxiant Gases Comparison', headers: ['Gas', 'Odor / Physical Property', 'Key Postmortem Autopsy Sign', 'Treatment / Antidote'], rows: [['Carbon Monoxide (CO)', 'Odorless, Colorless, Non-irritating', 'CHERRY-PINK postmortem lividity, Globus pallidus necrosis', '100% Normobaric Oxygen / Hyperbaric Oxygen'], ['Hydrogen Sulfide (H2S)', 'ROTTEN EGG odor, toxic sewer gas', 'Greenish discoloration of viscera/brain, rapid asphyxia', 'Fresh air, 100% Oxygen, Sodium Nitrite'], ['Carbon Dioxide (CO2)', 'Odorless, heavy gas accumulating in deep wells', 'Cyanosis, engorged dark blood, asphyxia', 'Ventilation, 100% Oxygen'], ['CS / CN Tear Gas', 'Pungent lacrimatory riot control agents', 'Severe lacrimation, blepharospasm, skin irritation', 'Fresh air, water irrigation, diphoterine']] }],
    clinicalExamples: [{ title: 'Winter Coal Heater (Angithi) Fatality', scenario: 'A family sleeping in a sealed room with a burning coal angithi heater is found dead. Bodies show bright cherry-pink skin discoloration.', analysis: 'Accidental Carbon Monoxide poisoning due to incomplete coal combustion. COHb level at autopsy >60%.', takeaway: 'Angithi heaters in closed rooms cause fatal CO poisoning.' }],
    medicolegalImportance: ['Differentiates accidental CO angithi deaths from foul play.', 'Investigates septic tank sewer gas deaths under safety regulations.', 'Explains fire deaths where COHb proves live exposure during fire.'],
    mnemonics: [{ title: 'CO Poisoning Signs - "C-H-E-R-R-Y"', phrase: 'Carboxyhemoglobin, High affinity 200x, Extra-bright pink skin, Reduced O2 release, Real globus pallidus damage', breakdown: [{ letter: 'C', word: 'Carboxyhemoglobin', meaning: 'COHb complex' }] }],
    commonMistakes: [{ mistake: 'Confusing Carbon Monoxide cherry-pink lividity with Cyanide cherry-red blood.', whyWrong: 'CO causes cherry-PINK lividity due to COHb; Cyanide causes bright cherry-RED blood due to unextracted arterialized venous oxygen.', correctConcept: 'CO = Cherry-pink; Cyanide = Cherry-red.' }],
    highYieldPoints: ['CO binds hemoglobin with 200-250x higher affinity than O2.', 'CO autopsy sign = CHERRY-PINK postmortem lividity + Globus pallidus necrosis.', 'CO treatment = 100% Oxygen or Hyperbaric Oxygen.', 'H2S (Sewer gas) = Rotten egg odor.', 'Cold exposure = Bright red lividity.'],
    previousExamQuestions: [{ question: 'Discuss Carbon Monoxide poisoning, mechanism of COHb formation, autopsy findings, and management. Differentiate H2S toxicity.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is the characteristic brain lesion in fatal Carbon Monoxide poisoning?', answer: 'Bilateral symmetrical necrosis of the Globus Pallidus.', clinicalPearl: 'Classic neuropathology question.' }],
    shortNotes: [{ title: 'Cherry-Pink Lividity', answer: 'Bright cherry-pink skin discoloration in CO poisoning caused by high blood Carboxyhemoglobin (COHb >30%).' }],
    longQuestions: [{ title: 'Discuss Asphyxiant Gases.', outline: ['Carbon monoxide sources and COHb kinetics', 'Autopsy signs and globus pallidus necrosis', '100% Oxygen and HBO therapy', 'Hydrogen sulfide sewer gas deaths'] }],
    mcqs: [{ id: 1, question: 'Bilateral symmetrical necrosis of Globus Pallidus is pathognomonic of poisoning by:', options: ['Arsenic', 'Carbon Monoxide', 'Lead', 'Cyanide'], correctIndex: 1, explanation: 'Globus pallidus is uniquely sensitive to CO hypoxic brain injury.' }],
    caseBasedQuestions: [{ id: 1, title: 'Closed Room Angithi Death', scenario: 'Family found dead with cherry-pink lividity after using coal heater.', questions: ['Gas? Treatment if alive?'], solution: 'Carbon Monoxide; 100% Oxygen / Hyperbaric Oxygen.', legalSections: ['Gaseous Poisons'] }],
    summary: 'Chapter 32 covers carbon monoxide, COHb, cherry-pink lividity, globus pallidus necrosis, 100% oxygen, and hydrogen sulfide sewer gas.',
    revisionSheet: ['CO = Cherry-pink lividity + Globus pallidus necrosis.', '100% O2 treatment.', 'H2S = Rotten egg odor.'],
    flashcards: [{ id: 1, front: 'What is the treatment of choice for Carbon Monoxide poisoning?', back: '100% High-Flow Oxygen (or Hyperbaric Oxygen).', category: 'Gaseous Poisons' }]
  },
  {
    id: 'agricultural-pesticides',
    chapterNumber: 33,
    title: 'Agricultural & Domestic Pesticides - Organophosphates (OPP), Carbamates, Organochlorines, Aluminum Phosphide (Celphos)',
    section: 'Section B: Forensic Toxicology',
    readTime: '30 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Master Organophosphate Poisoning (OPP): Acetylcholinesterase inhibition, DUMBELS / SLUDGE toxidrome (Muscarinic & Nicotinic signs), Atropine titration, PAM (Pralidoxime) oxime reactivity.',
      'Differentiate OPP vs Carbamate Poisoning (Reversible AChE inhibition; PAM contraindication in carbaryl).',
      'Master Aluminum Phosphide (Celphos / Rice Tablet): Phosphine gas release (Garlic odor, Silver nitrate test), Severe refractory shock, Silver nitrate paper test, Gastric lavage with Coconut oil / KMnO4.',
      'Understand Organochlorines (DDT, Endosulfan - GABA antagonism, Convulsions).'
    ],
    introduction: `Agricultural pesticides represent the single most common cause of suicidal poisoning fatalities in rural India. Organophosphates (e.g. Parathion, Malathion, Chlorpyrifos) cause cholinesterase inhibition with massive cholinergic flooding. Aluminum Phosphide (Celphos / Rice Tablet) releases lethal Phosphine gas on contact with stomach moisture, causing high mortality refractory shock.`,
    whyThisMatters: `Atropine titration (atropinization) and Pralidoxime (PAM) oxime therapy save lives in OPP poisoning. Celphos (Aluminum Phosphide) poisoning has no specific chemical antidote; gastric lavage with Coconut Oil inhibits phosphine gas release.`,
    simpleExplanation: `Organophosphates block Acetylcholinesterase, causing acetylcholine buildup -> Cholinergic storm! Symptoms follow DUMBELS: Defecation, Urination, Miosis (pinpoint pupils), Bronchospasm/Bradycardia, Emesis, Lacrimation, Salivation! Treatment is Atropine (until lungs are dry and pupils dilated) + Pralidoxime (PAM). Celphos (Aluminum phosphide / Rice tablet) releases toxic Phosphine gas with a Garlic/decaying fish odor; treated with Coconut Oil lavage to coat the tablet.`,
    keyTerms: [
      { term: 'DUMBELS Toxidrome', definition: 'Mnemonic for muscarinic cholinergic overstimulation in OPP poisoning: Defecation, Urination, Miosis, Bronchospasm/Bradycardia, Emesis, Lacrimation, Salivation.', simpleExplanation: 'Mnemonic for cholinergic symptoms in organophosphate poisoning.' },
      { term: 'Atropinization', definition: 'Therapeutic endpoint in OPP treatment achieved by escalating IV Atropine doses until chest is clear on auscultation (no rales), pupils dilated, heart rate >100 bpm, and skin dry.', simpleExplanation: 'Giving enough atropine until lung secretions dry up and pupils dilate.' },
      { term: 'Phosphine Gas (PH3)', definition: 'Highly toxic, colorless gas released when Aluminum Phosphide reacts with hydrochloric acid and moisture in stomach, causing cardiogenic shock and cellular hypoxia.', simpleExplanation: 'Deadly gas released by Celphos (rice tablets) in stomach.' },
      { term: 'Pralidoxime (PAM)', definition: 'Cholinesterase reactivator oxime that breaks organophosphate-AChE bond before "aging" occurs, restoring functional enzyme activity.', simpleExplanation: 'Oxime drug that reactivates blocked cholinesterase enzyme.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Organophosphate Atropinization Protocol', description: 'Give 2-5 mg Atropine IV every 5-10 mins, doubling dose until atropinization criteria met (clear lung sounds, HR >100, dry skin). Add Pralidoxime (PAM) 1-2g IV slow infusion.', keyTakeaway: 'Atropine dries secretions; PAM reactivates cholinesterase.' },
      { stepNumber: 2, title: 'Aluminum Phosphide (Celphos) Emergency Lavage', description: 'Perform gastric lavage with Coconut Oil or Liquid Paraffin (inhibits phosphine breakdown) + Potassium Permanganate (KMnO4) to oxidize phosphine. Positive Silver Nitrate paper test turns black.', keyTakeaway: 'Coconut oil inhibits phosphine gas release in stomach.' }
    ],
    importantConcepts: [{ title: 'Silver Nitrate Test for Phosphine Gas (Celphos)', content: 'Expose filter paper moistened with 0.1M Silver Nitrate solution to patient\'s gastric aspirate or exhaled breath; turning BLACK confirms Phosphine gas (form Silver Phosphide).', type: 'info' }],
    flowcharts: [{ title: 'Organophosphate vs Celphos Poisoning Management Algorithm', description: 'Emergency pathways.', steps: [{ label: '1. Suspected Pesticide Ingestion', description: 'Check pupils, lung secretions, breath odor.' }, { label: '2. OPP (Miosis, Rales, Garlic Odor)', description: 'Atropinization (IV Atropine) + PAM oxime infusion.' }, { label: '3. Celphos (Garlic odor, Shock, Silver Nitrate +)', description: 'Coconut oil lavage + KMnO4 + Vasopressors + ICU support.' }] }],
    tables: [{ title: 'Organophosphates (OPP) vs Aluminum Phosphide (Celphos) Comparison', headers: ['Parameter', 'Organophosphates (OPP)', 'Aluminum Phosphide (Celphos / Rice Tablet)'], rows: [['Primary Mechanism', 'Irreversible Acetylcholinesterase inhibition', 'Phosphine gas releases -> Cytochrome C oxidase block'], ['Key Symptoms', 'Pinpoint pupils, excessive sweating, bronchospasm (DUMBELS)', 'Garlic breath, severe refractory shock, acute pulmonary edema'], ['Diagnostic Test', 'Low serum pseudocholinesterase levels', 'Silver Nitrate paper test turns BLACK'], ['Specific Antidote', 'Atropine + Pralidoxime (PAM)', 'NO SPECIFIC ANTIDOTE (Coconut oil lavage + Supportive)']] }],
    clinicalExamples: [{ title: 'Farmer Ingests Rice Tablet (Celphos)', scenario: 'A rural farmer ingests a Celphos (Aluminum Phosphide) tablet and presents with severe abdominal pain, garlic breath, and profound hypotension (BP 60/40 mmHg).', analysis: 'Silver nitrate test on gastric aspirate turns black. Treated with coconut oil gastric lavage, IV fluids, noradrenaline, and magnesium sulfate in ICU.', takeaway: 'Celphos causes severe refractory shock; coconut oil lavage is key.' }],
    medicolegalImportance: ['Pesticides represent #1 suicidal poison category in Indian agriculture.', 'Silver nitrate test provides immediate point-of-care confirmation.', 'Differentiates accidental occupational spraying from suicidal ingestion.'],
    mnemonics: [{ title: 'OPP Muscarinic Signs - "D-U-M-B-E-L-S"', phrase: 'Defecation, Urination, Miosis, Bronchospasm, Emesis, Lacrimation, Salivation', breakdown: [{ letter: 'D', word: 'Defecation', meaning: 'Diarrhea and abdominal cramps' }] }],
    commonMistakes: [{ mistake: 'Giving Pralidoxime (PAM) in Carbamate poisoning (e.g. Carbaryl).', whyWrong: 'Carbamate-AChE bond is spontaneously reversible; PAM can form a toxic complex with carbaryl exacerbating toxicity.', correctConcept: 'Use Atropine alone for carbamate poisoning.' }],
    highYieldPoints: ['OPP treatment = Atropine (dries secretions) + Pralidoxime (PAM oxime).', 'Atropinization endpoint = Clear chest sounds + Pupils dilated + HR >100.', 'Celphos (Aluminum phosphide) = Garlic odor + Refractory shock + Black Silver Nitrate test.', 'Celphos lavage = Coconut Oil / KMnO4.', 'Carbamates = Spontaneously reversible AChE block (no PAM in carbaryl).'],
    previousExamQuestions: [{ question: 'Discuss Organophosphate poisoning, DUMBELS toxidrome, Atropinization, and PAM. Detail Aluminum Phosphide (Celphos) toxicity.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is the primary endpoint of Atropinization in OPP poisoning?', answer: 'Drying of pulmonary secretions (clear chest sounds on auscultation) with HR > 100 bpm and dilated pupils.', clinicalPearl: 'Drying secretions is life-saving.' }],
    shortNotes: [{ title: 'Celphos (Aluminum Phosphide) Poisoning', answer: 'Rice tablet releasing phosphine gas, causing garlic breath, black silver nitrate test, refractory shock; treated with coconut oil lavage.' }],
    longQuestions: [{ title: 'Discuss Pesticide Toxicology.', outline: ['Organophosphates toxicity and DUMBELS', 'Atropinization protocol and PAM', 'Aluminum phosphide (Celphos) mechanism and silver nitrate test', 'Management of pesticide poisoning'] }],
    mcqs: [{ id: 1, question: 'Silver nitrate paper test turning black in gastric aspirate confirms poisoning by:', options: ['Organophosphates', 'Aluminum Phosphide (Celphos)', 'Arsenic', 'Lead'], correctIndex: 1, explanation: 'Phosphine gas released by Aluminum Phosphide reacts with Silver Nitrate to form black Silver Phosphide.' }],
    caseBasedQuestions: [{ id: 1, title: 'Pinpoint Pupils and Wheezing', scenario: 'Farmer with garlic breath, miosis, and lung rales after spraying crop.', questions: ['Diagnosis? Treatment?'], solution: 'Organophosphate Poisoning; Atropinization + PAM.', legalSections: ['Pesticides'] }],
    summary: 'Chapter 33 covers organophosphates, DUMBELS, atropinization, PAM, aluminum phosphide (celphos), silver nitrate test, and coconut oil lavage.',
    revisionSheet: ['OPP = Atropine + PAM.', 'Atropinization = Dry lungs + Dilated pupils.', 'Celphos = Garlic odor + Black silver nitrate test + Coconut oil.'],
    flashcards: [{ id: 1, front: 'What reagent turns black when exposed to Phosphine gas in Celphos poisoning?', back: 'Silver Nitrate paper.', category: 'Pesticides' }]
  },
  {
    id: 'food-poisoning',
    chapterNumber: 34,
    title: 'Food Poisoning & Bacterial Toxins - Botulism, Staphylococcal, Mushroom (Amanita phalloides)',
    section: 'Section B: Forensic Toxicology',
    readTime: '22 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Define Food Poisoning and classify Bacterial vs Non-Bacterial types.',
      'Master Clostridium botulinum (Botulism): Neurotoxin mechanism (Acetylcholine presynaptic block), Descending flaccid paralysis, Diplopia, Dysphagia, Trivalent Antitoxin.',
      'Master Staphylococcal Food Poisoning (Enterotoxin B, Short incubation 1-6 hrs).',
      'Master Mushroom Poisoning (Mycetism): Amanita phalloides (Death Cap mushroom - Amatoxin / Phalloidin, Bimodal phase, Acute liver failure).',
      'Understand Lathyrism (Lathyrus sativus / Kesari dal - Beta-ODAP, Spastic paraplegia).'
    ],
    introduction: `Food poisoning results from ingestion of food contaminated with live pathogenic bacteria, pre-formed bacterial enterotoxins, or natural biological toxins (toxic mushrooms, Lathyrus seeds). Botulism and Amanita phalloides (Death Cap mushroom) represent severe lethal medical emergencies, while Lathyrism causes irreversible spastic paraplegia in socioeconomically disadvantaged communities.`,
    whyThisMatters: `Botulism causes fatal descending motor paralysis requiring mechanical ventilation and trivalent antitoxin. Amanita phalloides (amatoxin) destroys hepatocytes, causing fulminant liver failure. Lathyrus sativus adulteration causes neurolathyrism.`,
    simpleExplanation: `Botulism is caused by Clostridium botulinum toxin in canned food; it blocks Acetylcholine release, causing Descending Flaccid Paralysis (starts in eyes/face with diplopia, spreads down to cause respiratory failure). Staphylococcal food poisoning has a very fast incubation (1-6 hrs) after eating contaminated dairy/pastries. Amanita phalloides (Death Cap mushroom) contains Amatoxin, causing severe delayed diarrhea followed by total Liver Failure. Lathyrism (Kesari dal) causes leg stiffness and spastic paraplegia.`,
    keyTerms: [
      { term: 'Botulinum Neurotoxin', definition: 'Exotoxin produced by Clostridium botulinum that cleaves SNARE proteins, blocking acetylcholine release at neuromuscular junctions, causing descending flaccid paralysis.', simpleExplanation: 'Deadly bacterial toxin blocking muscle nerve signals.' },
      { term: 'Amatoxin (Amanita phalloides)', definition: 'Bicyclic octapeptide toxin in Death Cap mushrooms that inhibits RNA Polymerase II, halting protein synthesis and causing acute hepatic and renal necrosis.', simpleExplanation: 'Mushroom toxin destroying liver and kidney cells.' },
      { term: 'Neurolathyrism', definition: 'Neurotoxic disorder caused by excessive consumption of Lathyrus sativus (Kesari dal) containing Beta-ODAP, causing irreversible spastic paraplegia of lower limbs.', simpleExplanation: 'Paralysis of legs caused by eating toxic Kesari dal.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Botulism Emergency Management Protocol', description: 'Secure airway and mechanical ventilation. Administer Equine Botulinum Trivalent Antitoxin (ABE) immediately.', keyTakeaway: 'Mechanical ventilation is primary lifesaving support.' }
    ],
    importantConcepts: [{ title: 'Amanita phalloides Bimodal Clinical Phases', content: 'Phase 1 (6-24 hrs post ingestion): Severe gastroenteritis (vomiting, watery diarrhea, abdominal cramps). Phase 2 (24-48 hrs): Apparent recovery. Phase 3 (3-5 days): Acute liver failure, jaundice, coagulopathy, coma, and death.', type: 'info' }],
    flowcharts: [{ title: 'Bacterial & Toxin Food Poisoning Differential Decision Tree', description: 'Diagnostic clues.', steps: [{ label: '1. Short Incubation (1-6 hrs)', description: 'Staphylococcal enterotoxin (vomiting after dairy/cream).' }, { label: '2. Descending Paralysis + Canned Food', description: 'Botulism (Clostridium botulinum toxin).' }, { label: '3. Delayed Diarrhea -> Liver Failure', description: 'Amanita phalloides mushroom poisoning.' }] }],
    tables: [{ title: 'Common Food Poisoning Syndromes Comparison', headers: ['Agent / Source', 'Incubation Period', 'Key Clinical Features', 'Primary Mechanism / Toxin'], rows: [['Staphylococcus aureus', '1 to 6 hours (Short)', 'Sudden violent vomiting, cramps, diarrhea', 'Pre-formed heat-stable Enterotoxin B'], ['Clostridium botulinum', '12 to 36 hours', 'Diplopia, dysphagia, descending flaccid paralysis', 'Botulinum neurotoxin (SNARE cleavage)'], ['Amanita phalloides', '6 to 24 hours (Delayed)', 'Gastroenteritis -> Latent phase -> Acute LIVER FAILURE', 'Amatoxin (RNA Polymerase II inhibitor)'], ['Lathyrus sativus', 'Months of high consumption', 'Scissor gait, spastic paraplegia of legs', 'Beta-ODAP (Excitotoxic amino acid)']] }],
    clinicalExamples: [{ title: 'Home-Canned Food Ingestion Botulism', scenario: 'Three family members eat home-canned vegetables and present 24 hours later with double vision (diplopia), droopy eyelids, difficulty swallowing, and progressive leg weakness.', analysis: 'Diagnosis is acute Botulism. Treated with Equine Trivalent Botulinum Antitoxin and mechanical ventilation in ICU.', takeaway: 'Botulism causes descending flaccid paralysis following canned food.' }],
    medicolegalImportance: ['Investigates commercial food contamination and public health outbreaks.', 'Identifies illegal food adulteration (Kesari dal in pulses).', 'Explains sudden toxic deaths from wild mushroom consumption.'],
    mnemonics: [{ title: 'Botulism 4 Ds - "D-D-D-D"', phrase: 'Diplopia, Dysphagia, Dysarthria, Descending paralysis', breakdown: [{ letter: 'D', word: 'Diplopia', meaning: 'Double vision' }] }],
    commonMistakes: [{ mistake: 'Dismissing Amanita phalloides poisoning during Phase 2 when gastroenteritis improves.', whyWrong: 'Phase 2 is a false latent period before catastrophic fulminant liver failure develops on Day 3-5.', correctConcept: 'Monitor liver enzymes continuously despite temporary symptom resolution.' }],
    highYieldPoints: ['Botulism = Canned food + Descending flaccid paralysis + Trivalent antitoxin.', 'Staph aureus = Short incubation (1-6 hrs) after pastries/milk.', 'Amanita phalloides (Death Cap) = Amatoxin = Bimodal phase -> Liver Failure.', 'Lathyrism (Kesari dal) = Beta-ODAP = Spastic paraplegia.'],
    previousExamQuestions: [{ question: 'Discuss Botulism toxicity, mechanism, and management. Describe Amanita phalloides mushroom poisoning.', year: '2022', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is the characteristic paralysis pattern in Botulism vs Guillain-Barré Syndrome?', answer: 'Botulism causes DESCENDING flaccid paralysis (starts in cranial nerves/eyes, moves down); GBS causes ASCENDING paralysis (starts in feet, moves up).', clinicalPearl: 'Classic neurology viva comparison.' }],
    shortNotes: [{ title: 'Botulism', answer: 'Food poisoning from Clostridium botulinum toxin in canned food, causing 4 Ds (Diplopia, Dysphagia, Dysarthria, Descending paralysis); treated with Trivalent Antitoxin.' }],
    longQuestions: [{ title: 'Discuss Food Poisoning and Biological Toxins.', outline: ['Classification', 'Botulism pathophysiology and treatment', 'Amanita phalloides amatoxin phases', 'Lathyrism neurotoxicity'] }],
    mcqs: [{ id: 1, question: 'Botulinum neurotoxin causes muscle weakness by:', options: ['Blocking post-synaptic ACh receptors', 'Inhibiting presynaptic release of Acetylcholine', 'Inhibiting Acetylcholinesterase', 'Blocking Glycine receptors'], correctIndex: 1, explanation: 'Botulinum toxin cleaves SNARE proteins preventing presynaptic ACh release.' }],
    caseBasedQuestions: [{ id: 1, title: 'Canned Food Paralysis', scenario: 'Patient with double vision and leg weakness after eating home-canned food.', questions: ['Diagnosis? Antidote?'], solution: 'Botulism; Trivalent Botulinum Antitoxin.', legalSections: ['Food Poisoning'] }],
    summary: 'Chapter 34 covers botulism, descending paralysis, staph food poisoning, amanita phalloides amatoxin, and neurolathyrism.',
    revisionSheet: ['Botulism = Descending paralysis.', 'GBS = Ascending paralysis.', 'Staph = 1-6 hr incubation.', 'Amanita = Liver failure.'],
    flashcards: [{ id: 1, front: 'What type of muscle paralysis occurs in Botulism?', back: 'Descending flaccid paralysis.', category: 'Food Poisoning' }]
  },
  {
    id: 'drug-abuse-dependence',
    chapterNumber: 35,
    title: 'Drug Abuse, Dependence & Medicinal Overdose - Paracetamol, Salicylates, Amphetamines, Cocaine',
    section: 'Section B: Forensic Toxicology',
    readTime: '26 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Master Paracetamol (Acetaminophen) Overdose: NAPQI toxic metabolite, Rumack-Matthew nomogram, Acute hepatic necrosis, N-Acetylcysteine (NAC) antidote.',
      'Master Salicylate (Aspirin) Overdose: Tinnitus, Mixed Respiratory Alkalosis & Metabolic Acidosis, Forced Alkaline Diuresis.',
      'Master Cocaine & Amphetamines: Sympathomimetic toxidrome, Cocaine bugs (Magnan\'s symptom), Agitation, Hyperthermia, Myocardial infarction.'
    ],
    introduction: `Medicinal overdoses and illicit drug abuse represent major clinical toxicology and forensic psychiatry challenges. Paracetamol (Acetaminophen) is among the most common suicidal medicinal overdoses worldwide. Cocaine and Amphetamine psychostimulant abuse cause acute cardiovascular emergencies and tactile hallucinations.`,
    whyThisMatters: `Paracetamol overdose causes fatal liver necrosis via NAPQI accumulation; N-Acetylcysteine (NAC) administered within 8-10 hours is 100% protective. Aspirin causes mixed respiratory alkalosis and metabolic acidosis. Cocaine causes "cocaine bugs" (Magnan symptom).`,
    simpleExplanation: `Paracetamol overdose produces a toxic chemical called NAPQI which destroys liver cells. Treatment is N-Acetylcysteine (NAC), which replenishes liver glutathione. Aspirin overdose causes ringing in ears (tinnitus) and metabolic acidosis. Cocaine causes cocaine bugs (feeling like insects crawling under skin - Magnan symptom) and heart attacks due to coronary spasm.`,
    keyTerms: [
      { term: 'NAPQI (N-acetyl-p-benzoquinone imine)', definition: 'Toxic reactive metabolite of paracetamol formed by cytochrome P450 that depletes hepatic glutathione, causing hepatocellular necrosis.', simpleExplanation: 'Toxic chemical produced in paracetamol overdose that destroys liver cells.' },
      { term: 'N-Acetylcysteine (NAC)', definition: 'Specific antidote for paracetamol toxicity that acts as a precursor for glutathione synthesis and directly detoxifies NAPQI.', simpleExplanation: 'Specific antidote replenishing glutathione to protect liver in paracetamol overdose.' },
      { term: 'Magnan\'s Symptom (Cocaine Bugs)', definition: 'Tactile hallucination occurring in chronic cocaine abuse where the patient feels as if tiny insects or bugs are crawling under their skin.', simpleExplanation: 'Feeling like insects are crawling under skin in cocaine abuse.' },
      { term: 'Rumack-Matthew Nomogram', definition: 'Semi-logarithmic plot correlating serum paracetamol concentration and hours post-ingestion to predict hepatotoxicity and guide NAC antidote therapy.', simpleExplanation: 'Chart determining if paracetamol blood level requires NAC antidote.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Paracetamol Overdose Protocol', description: 'Measure serum paracetamol level at 4 hours post-ingestion. Plot on Rumack-Matthew nomogram. If above treatment line, initiate IV N-Acetylcysteine (NAC) loading dose 150 mg/kg.', keyTakeaway: 'NAC given within 8 hours prevents hepatic failure completely.' }
    ],
    importantConcepts: [{ title: 'Salicylate (Aspirin) Acid-Base Disturbances', content: 'Early phase: Direct stimulation of respiratory center causes hyperventilation -> Respiratory Alkalosis. Late phase: Uncoupling of oxidative phosphorylation causes organic acid accumulation -> Metabolic Acidosis.', type: 'info' }],
    flowcharts: [{ title: 'Paracetamol Hepatotoxicity & NAC Antidote Mechanism Flow', description: 'Metabolic pathway.', steps: [{ label: '1. Paracetamol Overdose', description: 'CYP2E1 metabolizes paracetamol into toxic NAPQI.' }, { label: '2. Glutathione Depletion', description: 'Hepatic glutathione stores exhausted (>70% depleted).' }, { label: '3. NAC Antidote Infusion', description: 'NAC replenishes glutathione -> Detoxifies NAPQI -> Prevents liver necrosis.' }] }],
    tables: [{ title: 'Common Medicinal Overdoses & Specific Antidotes', headers: ['Drug / Substance', 'Toxic Mechanism / Target', 'Classic Clinical Hallmark', 'Specific Antidote / Treatment'], rows: [['Paracetamol', 'NAPQI glutathione depletion -> Liver necrosis', 'Right upper quadrant pain, Jaundice on Day 3', 'N-Acetylcysteine (NAC)'], ['Salicylates (Aspirin)', 'Uncouples oxidative phosphorylation', 'Tinnitus, Hyperventilation, Mixed Acid-Base disorder', 'Forced Alkaline Diuresis (NaHCO3) / Hemodialysis'], ['Cocaine', 'Blocks dopamine/norepinephrine reuptake', 'Mydriasis, MI, Magnan symptom (cocaine bugs)', 'Benzodiazepines (Diazepam) + Cooling'], ['Amphetamines / MDMA', 'Monoamine release storm', 'Hyperthermia, Bruxism, Hyponatremia (Ecstasy)', 'Benzodiazepines + Active cooling']] }],
    clinicalExamples: [{ title: 'Suicidal Paracetamol Ingestion', scenario: 'A 19-year-old student ingests 30 tablets of 500mg Paracetamol (15g). Serum level at 4 hrs is 220 mcg/ml (above treatment line on Rumack-Matthew nomogram).', analysis: 'Diagnosis is acute Paracetamol overdose. Initiated on 20-hour IV N-Acetylcysteine (NAC) protocol. Liver function tests remain normal.', takeaway: 'NAC administered early prevents paracetamol liver failure.' }],
    medicolegalImportance: ['Guides management of suicidal paracetamol and aspirin overdoses.', 'Identifies drug abuse in psychostimulant deaths (cocaine/MDMA).', 'Uses Rumack-Matthew nomogram for clinical decision-making.'],
    mnemonics: [{ title: 'Paracetamol Care - "N-A-C"', phrase: 'N-Acetylcysteine, Administer early <8 hrs, Check Rumack nomogram', breakdown: [{ letter: 'N', word: 'N-Acetylcysteine', meaning: 'Specific glutathione precursor antidote' }] }],
    commonMistakes: [{ mistake: 'Delaying NAC antidote while waiting for paracetamol lab results beyond 8 hours.', whyWrong: 'NAC efficacy drops significantly after 8 hours; if ingestion >7.5g is suspected, start NAC immediately while awaiting lab levels.', correctConcept: 'Start NAC immediately if timeline approaches 8 hours.' }],
    highYieldPoints: ['Paracetamol toxic metabolite = NAPQI.', 'Paracetamol antidote = N-Acetylcysteine (NAC).', 'Rumack-Matthew nomogram guides paracetamol treatment at 4 hrs.', 'Aspirin = Tinnitus + Mixed Respiratory Alkalosis & Metabolic Acidosis.', 'Cocaine = Magnan symptom (cocaine bugs under skin).'],
    previousExamQuestions: [{ question: 'Discuss Paracetamol overdose, NAPQI metabolism, Rumack-Matthew nomogram, and NAC antidote. Detail Salicylate toxicity.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is Magnan\'s symptom in Cocaine abuse?', answer: 'Tactile hallucination where the patient feels tiny insects crawling under the skin (cocaine bugs).', clinicalPearl: 'Classic cocaine hallmark.' }],
    shortNotes: [{ title: 'N-Acetylcysteine (NAC)', answer: 'Antidote for paracetamol overdose; restores hepatic glutathione stores to neutralize toxic NAPQI metabolite.' }],
    longQuestions: [{ title: 'Discuss Medicinal Overdoses.', outline: ['Paracetamol toxicity pathway and NAPQI', 'Rumack-Matthew nomogram use', 'NAC antidote protocol', 'Salicylate toxicity acid-base disorders'] }],
    mcqs: [{ id: 1, question: 'The specific antidote for Paracetamol overdose is:', options: ['Naloxone', 'N-Acetylcysteine (NAC)', 'Flumazenil', 'Atropine'], correctIndex: 1, explanation: 'N-Acetylcysteine (NAC) replenishes hepatic glutathione to detoxify NAPQI.' }],
    caseBasedQuestions: [{ id: 1, title: 'Paracetamol Overdose', scenario: 'Student ingests 15g paracetamol 5 hours ago.', questions: ['Antidote? Nomogram used?'], solution: 'N-Acetylcysteine (NAC); Rumack-Matthew Nomogram.', legalSections: ['Medicinal Overdose'] }],
    summary: 'Chapter 35 covers paracetamol, NAPQI, NAC antidote, Rumack-Matthew nomogram, aspirin, and cocaine bugs (Magnan symptom).',
    revisionSheet: ['Paracetamol = NAPQI = NAC antidote.', 'Rumack nomogram at 4 hrs.', 'Aspirin = Tinnitus.', 'Cocaine = Magnan symptom.'],
    flashcards: [{ id: 1, front: 'What toxic metabolite causes hepatic necrosis in paracetamol overdose?', back: 'NAPQI (N-acetyl-p-benzoquinone imine).', category: 'Medicinal Overdose' }]
  },
  {
    id: 'chemical-weaponry-biological-agents',
    chapterNumber: 36,
    title: 'Chemical Weaponry & Biological Warfare Agents',
    section: 'Section B: Forensic Toxicology',
    readTime: '22 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Classify Chemical Warfare Agents: Nerve Agents (Sarin, VX, Tabun, Soman), Vesicants / Blister Agents (Mustard gas, Lewisite), Blood Agents (Cyanide), Choking Agents (Phosgene, Chlorine).',
      'Understand Nerve Agents mechanism (Irreversible organophosphate AChE block) and Atropine + Pralidoxime + Autoinjector treatment.',
      'Understand Biological Warfare Agents: Anthrax (Bacillus anthracis / Medusa head colonies), Smallpox (Variola), Plague (Yersinia pestis), Botulinum toxin, Tularemia.',
      'Understand Decontamination Protocols and Personal Protective Equipment (PPE Level A-D).'
    ],
    introduction: `Chemical and biological warfare agents represent weapons of mass destruction (WMD) designed to cause widespread mortality, panic, and societal disruption. Nerve agents like Sarin and VX are ultra-potent organophosphates, while biological agents like Anthrax spores present extreme bioterrorism hazards requiring international health vigilance.`,
    whyThisMatters: `Nerve agents (Sarin, VX) act like super-concentrated organophosphates requiring immediate Atropine and Oxime autoinjectors. Anthrax (Bacillus anthracis) spores cause cutaneous black eschar and fatal inhalational "Woolsorter\'s disease".`,
    simpleExplanation: `Nerve Agents (Sarin, VX) are extreme organophosphates that cause fatal cholinergic storm within minutes; treated with military Atropine/Oxime autoinjectors. Mustard gas causes severe skin blisters (vesicant). Anthrax is a biological spore weapon causing coal-black skin ulcers (malignant pustule) and severe chest infection (Woolsorter\'s disease).`,
    keyTerms: [
      { term: 'Sarin (GB)', definition: 'Volatile organophosphate nerve agent that irreversibly inhibits acetylcholinesterase, causing rapid asphyxial death within minutes.', simpleExplanation: 'Deadly nerve gas acting as a super-potent organophosphate.' },
      { term: 'Sulfur Mustard (Mustard Gas)', definition: 'Vesicant (blistering) chemical agent that alkylates DNA, causing delayed severe skin blistering, eye damage, and pulmonary edema.', simpleExplanation: 'Chemical weapon causing painful skin blisters and lung damage.' },
      { term: 'Woolsorter\'s Disease', definition: 'Inhalational form of Anthrax (Bacillus anthracis) characterized by hemorrhagic mediastinitis, widened mediastinum on X-ray, and high mortality.', simpleExplanation: 'Inhalational anthrax causing severe lung infection and widened mediastinum.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Nerve Agent Exposure Field Protocol', description: 'Don Level A PPE suit. Administer Mark I / NAAK autoinjector (Atropine 2mg + Pralidoxime 600mg IM). Decontaminate skin with 0.5% hypochlorite solution.', keyTakeaway: 'Self-protection with PPE is mandatory before casualty handling.' }
    ],
    importantConcepts: [{ title: 'Anthrax (Bacillus anthracis) Diagnostic Features', content: 'Gram-positive spore-forming rod. "Medusa head" colonies on blood agar. Cutaneous form shows painless coal-black necrotic eschar surrounded by edema (Malignant pustule). Treated with Ciprofloxacin / Doxycycline.', type: 'info' }],
    flowcharts: [{ title: 'Chemical Warfare Agent Triage Decision Tree', description: 'Classification and response.', steps: [{ label: '1. Pinpoint Pupils + Drooling', description: 'Nerve Agent (Sarin/VX) -> Administer Atropine/PAM autoinjector.' }, { label: '2. Skin Blisters + Eye Pain', description: 'Vesicant Agent (Mustard Gas/Lewisite) -> Decontaminate + BAL.' }, { label: '3. Choking + Pulmonary Edema', description: 'Choking Agent (Phosgene/Chlorine) -> Oxygen + Respiratory support.' }] }],
    tables: [{ title: 'Chemical Warfare Agents Summary', headers: ['Agent Category', 'Representative Chemical Examples', 'Primary Toxidrome', 'Antidote / Decontamination'], rows: [['Nerve Agents', 'Sarin (GB), VX, Tabun (GA), Soman (GD)', 'Extreme cholinergic crisis (Miosis, Seizures, Apnea)', 'Atropine + Pralidoxime autoinjector + Diazepam'], ['Blister / Vesicants', 'Sulfur Mustard, Lewisite', 'Skin bullae/blisters, corneal burns, airway damage', 'Decontamination + BAL (for Lewisite)'], ['Blood Agents', 'Hydrogen Cyanide (AC), Cyanogen Chloride', 'Histotoxic hypoxia, cherry-red blood', 'Hydroxocobalamin / Cyanide antidote kit'], ['Choking Agents', 'Phosgene (CG), Chlorine gas', 'Dry throat, delayed acute pulmonary edema', 'Oxygen + Positive pressure ventilation']] }],
    clinicalExamples: [{ title: 'Subway Chemical Attack Casualty', scenario: 'Multiple casualties collapse in a subway station with pinpoint pupils, frothing at mouth, muscle twitching, and respiratory distress.', analysis: 'Classic Nerve Agent (Sarin) attack. First responders don Level A PPE and administer Atropine/PAM autoinjectors.', takeaway: 'Nerve agents present as hyper-acute organophosphate crisis.' }],
    medicolegalImportance: ['Guides disaster management in CBRN (Chemical, Biological, Radiological, Nuclear) events.', 'Identifies anthrax bioterrorism powder threats.', 'Ensures responder safety via proper PPE.'],
    mnemonics: [{ title: 'Biological Warfare Category A Agents - "A-B-C-P-S-T"', phrase: 'Anthrax, Botulism, Cholera, Plague, Smallpox, Tularemia', breakdown: [{ letter: 'A', word: 'Anthrax', meaning: 'Bacillus anthracis' }] }],
    commonMistakes: [{ mistake: 'Entering a nerve agent contaminated zone without Level A Personal Protective Equipment.', whyWrong: 'Nerve agents like VX penetrate intact skin rapidly, killing unprotected first responders.', correctConcept: 'Never enter contaminated zones without appropriate PPE.' }],
    highYieldPoints: ['Nerve agents (Sarin, VX) = Super organophosphates treated with Atropine + PAM.', 'Mustard gas = Vesicant causing skin blisters.', 'Anthrax = Cutaneous black eschar (Malignant pustule) & Woolsorter\'s disease.', 'Anthrax colony = "Medusa head" appearance on agar.'],
    previousExamQuestions: [{ question: 'Classify Chemical Warfare Agents. Discuss Sarin nerve agent toxicity and Anthrax bioterrorism.', year: '2022', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is Woolsorter\'s disease?', answer: 'Inhalational Anthrax occurring in workers handling spore-contaminated animal wool/hides, causing fatal hemorrhagic mediastinitis.', clinicalPearl: 'Classic microbiology and forensic question.' }],
    shortNotes: [{ title: 'Nerve Agents', answer: 'Ultra-potent organophosphates (Sarin, VX) causing rapid fatal cholinergic crisis, treated with Atropine and PAM autoinjectors.' }],
    longQuestions: [{ title: 'Discuss Chemical and Biological Warfare.', outline: ['Classification of chemical agents', 'Sarin and VX toxicity management', 'Biological agents (Anthrax, Botulism, Plague)', 'CBRN disaster protocol'] }],
    mcqs: [{ id: 1, question: 'Painless coal-black necrotic skin eschar (Malignant pustule) is characteristic of:', options: ['Cutaneous Anthrax', 'Plague', 'Tularemia', 'Smallpox'], correctIndex: 0, explanation: 'Bacillus anthracis cutaneous infection produces a characteristic black necrotic eschar.' }],
    caseBasedQuestions: [{ id: 1, title: 'Black Skin Eschar', scenario: 'Worker handling hides develops painless black skin ulcer with edema.', questions: ['Organism? Treatment?'], solution: 'Bacillus anthracis (Anthrax); Ciprofloxacin / Doxycycline.', legalSections: ['Biological Warfare'] }],
    summary: 'Chapter 36 covers chemical warfare (sarin, VX, mustard gas), biological agents (anthrax, botulism), medusa head colonies, and PPE.',
    revisionSheet: ['Nerve agents = Sarin/VX = Atropine+PAM.', 'Mustard gas = Blisters.', 'Anthrax = Black eschar + Medusa head.'],
    flashcards: [{ id: 1, front: 'What is the characteristic skin lesion in Cutaneous Anthrax?', back: 'Painless coal-black necrotic eschar (Malignant pustule).', category: 'Chemical/Biological' }]
  },
  {
    id: 'warfare-bioterrorism',
    chapterNumber: 37,
    title: 'Bioterrorism & Medical Disaster Management',
    section: 'Section B: Forensic Toxicology',
    readTime: '20 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Understand Bioterrorism definitions and CDC Category A, B, C Agents.',
      'Master Mass Casualty Triage Systems: START Triage (Simple Triage and Rapid Treatment - Red, Yellow, Green, Black tags).',
      'Understand Disaster Medical Management: Field triage, Incident Command System (ICS), Mortuary management, Victim identification.',
      'Understand Disaster Victim Identification (DVI) protocols (Interpol DVI guidelines).'
    ],
    introduction: `Medical Disaster Management and Bioterrorism response involve organized emergency healthcare frameworks mobilized to handle mass casualty incidents (MCIs). Whether triggered by natural disasters (earthquakes, floods) or intentional bioterrorist attacks, rapid field triage and systematic Disaster Victim Identification (DVI) preserve life and establish legal identity.`,
    whyThisMatters: `Mastering the START Triage system (Color coding: Red = Immediate, Yellow = Delayed, Green = Minor, Black = Deceased) is essential for every hospital casualty doctor managing mass casualties.`,
    simpleExplanation: `Bioterrorism is using biological germs (anthrax, smallpox, plague) as weapons. In mass disaster triage (START Triage), casualties are tagged by color: RED = Immediate lifesaving care needed (breathing/bleeding), YELLOW = Delayed care (can wait 1-2 hrs), GREEN = Walking wounded (minor injuries), BLACK = Dead or moribund. Interpol DVI guidelines use primary identifiers (DNA, Fingerprints, Dental records) to identify disaster victims.`,
    keyTerms: [
      { term: 'START Triage System', definition: 'Simple Triage and Rapid Treatment algorithm assessing Respiration, Perfusion, and Mental status (RPM) to categorize mass casualty victims in < 60 seconds.', simpleExplanation: 'Fast 60-second method to sort disaster victims into color categories.' },
      { term: 'Disaster Victim Identification (DVI)', definition: 'Interpol-standardized forensic procedure utilizing primary (DNA, Fingerprints, Dental) and secondary identifiers to establish victim identity in mass disasters.', simpleExplanation: 'Forensic process identifying disaster victims using DNA, teeth, and fingerprints.' },
      { term: 'Primary Identifiers (DVI)', definition: 'The three definitive scientific methods for human identification in disasters: 1. DNA profiling, 2. Friction ridge fingerprints, 3. Forensic odontology (dental comparison).', simpleExplanation: '3 scientific proof methods for victim identity: DNA, Fingerprints, Teeth.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'START Triage Execution Algorithm', description: '1. Can victim walk? Yes -> GREEN (Minor). 2. Check Respiration: Rate >30/min -> RED (Immediate); No breathing -> Open airway -> Still no -> BLACK (Deceased). 3. Check Perfusion (Capillary refill >2s) -> RED. 4. Mental Status (Fails commands) -> RED.', keyTakeaway: 'Classify each victim in under 60 seconds.' }
    ],
    importantConcepts: [{ title: 'CDC Category A Bioterrorism Agents', content: 'Highest priority pathogens carrying severe public health impact and high mortality: 1. Anthrax, 2. Botulism, 3. Plague, 4. Smallpox, 5. Tularemia, 6. Viral Hemorrhagic Fevers (Ebola, Marburg).', type: 'info' }],
    flowcharts: [{ title: 'START Mass Casualty Field Triage Algorithm', description: 'Sorting algorithm.', steps: [{ label: '1. Walking Wounded?', description: 'Yes -> GREEN TAG (Minor).' }, { label: '2. Breathing Check', description: 'Absent after airway opening -> BLACK TAG (Deceased). Rate >30/min -> RED TAG.' }, { label: '3. Perfusion / Pulse', description: 'Capillary refill >2 sec / Radial pulse absent -> RED TAG (Immediate).' }, { label: '4. Mental Status', description: 'Cannot follow simple commands -> RED TAG; Follows commands -> YELLOW TAG.' }] }],
    tables: [{ title: 'START Triage Color Code Categories', headers: ['Triage Tag Color', 'Priority Category', 'Clinical Status', 'Action Required'], rows: [['RED', 'Priority 1 (Immediate)', 'Critical life threat (Airway compromise, RR >30, Shock)', 'Immediate field resuscitation and rapid transport'], ['YELLOW', 'Priority 2 (Delayed)', 'Serious injuries but stable vitals (Fractions, controlled bleeds)', 'Medical care delayed up to 2 to 4 hours'], ['GREEN', 'Priority 3 (Minor)', 'Walking wounded with minor abrasions/sprains', 'Re-evaluate; delayed care'], ['BLACK', 'Priority 0 (Deceased)', 'Dead or non-breathing despite airway opening', 'Palliative comfort or transfer to temporary mortuary']] }],
    clinicalExamples: [{ title: 'Train Derailment Mass Casualty Triage', scenario: 'Doctor arrives at a major train crash site with 100 injured passengers.', analysis: 'Executes START Triage: Passengers who walk tagged GREEN; patient with RR 36 tagged RED; patient not breathing after airway opening tagged BLACK.', takeaway: 'START triage prioritizes lifesaving transport.' }],
    medicolegalImportance: ['Ensures efficient resource allocation in mass disasters.', 'Applies Interpol DVI guidelines for victim identification.', 'Protects health workers in bioterrorism emergencies.'],
    mnemonics: [{ title: 'START Triage RPM Check - "R-P-M"', phrase: 'Respiration (>30 = Red), Perfusion (Capillary refill >2s = Red), Mental status (Fails command = Red)', breakdown: [{ letter: 'R', word: 'Respiration', meaning: 'Breathing rate check' }] }],
    commonMistakes: [{ mistake: 'Spending extensive time performing CPR on non-breathing victims in a mass casualty triage scene.', whyWrong: 'In mass casualty scenarios with limited resources, prolonged CPR wastes vital time needed to save multiple salvageable RED tag victims.', correctConcept: 'If no breathing after opening airway, tag BLACK and move on.' }],
    highYieldPoints: ['START Triage checks RPM: Respiration, Perfusion, Mental Status.', 'RED tag = Immediate life threat.', 'BLACK tag = Deceased / No breathing after airway opening.', 'Primary DVI identifiers = DNA, Fingerprints, Forensic Odontology.', 'CDC Category A Bioterrorism = Anthrax, Botulism, Plague, Smallpox, Tularemia, Filoviruses.'],
    previousExamQuestions: [{ question: 'Discuss START Mass Casualty Triage system and color codes. Detail Disaster Victim Identification (DVI) principles.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What are the three primary identifiers in Interpol Disaster Victim Identification (DVI)?', answer: '1. DNA profiling, 2. Fingerprints (Friction ridge analysis), 3. Forensic Odontology (Dental comparisons).', clinicalPearl: 'Primary DVI scientific standards.' }],
    shortNotes: [{ title: 'START Triage System', answer: 'Simple Triage and Rapid Treatment algorithm evaluating RPM (Respiration, Perfusion, Mental Status) to tag victims RED, YELLOW, GREEN, or BLACK.' }],
    longQuestions: [{ title: 'Discuss Medical Disaster Management.', outline: ['Bioterrorism agents classification', 'START Triage algorithm and color codes', 'Disaster Victim Identification (DVI) guidelines', 'Mortuary management'] }],
    mcqs: [{ id: 1, question: 'In START Triage, a victim with a respiratory rate of 34 breaths/minute is tagged:', options: ['GREEN', 'YELLOW', 'RED', 'BLACK'], correctIndex: 2, explanation: 'Respiratory rate > 30/min automatically categorizes the victim as RED (Immediate).' }],
    caseBasedQuestions: [{ id: 1, title: 'Disaster Field Triage', scenario: 'Unconscious victim with capillary refill 4 seconds.', questions: ['Triage color?'], solution: 'RED Tag (Immediate priority due to impaired perfusion).', legalSections: ['Disaster Management'] }],
    summary: 'Chapter 37 covers bioterrorism CDC categories, START triage color codes (Red, Yellow, Green, Black), RPM checks, and Interpol DVI rules.',
    revisionSheet: ['START = RPM check.', 'Red = Immediate.', 'Black = Dead.', 'Primary DVI = DNA, Fingerprints, Teeth.'],
    flashcards: [{ id: 1, front: 'What color tag is assigned to walking wounded victims in START triage?', back: 'GREEN Tag.', category: 'Disaster Management' }]
  },
  {
    id: 'environmental-forensic-toxicology',
    chapterNumber: 38,
    title: 'Environmental & Industrial Forensic Toxicology',
    section: 'Section B: Forensic Toxicology',
    readTime: '22 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Understand Environmental & Industrial Hazards: Asbestos (Asbestosis, Mesothelioma), Benzene (Leukemia), Cadmium (Itai-Itai disease), Beryllium (Berylliosis).',
      'Understand Bhopal Gas Tragedy (Methyl Isocyanate / MIC gas leakage 1984) and disaster toxicology lessons.',
      'Understand Occupational Health Acts (Factories Act 1948, Water & Air Pollution Acts).',
      'Understand Forensic Ecotoxicology and Water/Soil heavy metal contamination.'
    ],
    introduction: `Environmental and Industrial Forensic Toxicology examines the legal, public health, and forensic aspects of human exposure to industrial chemicals, heavy metals, toxic effluents, and airborne occupational pollutants. India's industrial history—highlighted by the tragic 1984 Bhopal Gas Leak—underscores the critical necessity of occupational health legislation and environmental jurisprudence.`,
    whyThisMatters: `Industrial toxins cause specific occupational cancers (Asbestos causing Mesothelioma; Benzene causing Acute Myeloid Leukemia). The Bhopal Gas Leak (Methyl Isocyanate) remains history's worst industrial disaster.`,
    simpleExplanation: `Occupational exposures cause specific fatal diseases: Asbestos causes Asbestosis and Mesothelioma (pleural cancer). Benzene causes Acute Myeloid Leukemia (blood cancer). Cadmium causes Itai-Itai disease (painful soft bones and renal failure). The Bhopal Gas Tragedy (1984) was caused by leak of Methyl Isocyanate (MIC) gas, killing thousands from acute pulmonary edema and eye burn.`,
    keyTerms: [
      { term: 'Mesothelioma', definition: 'Malignant tumor of pleural or peritoneal mesothelium strongly associated with occupational exposure to asbestos fibers.', simpleExplanation: 'Pleural lung lining cancer caused by asbestos exposure.' },
      { term: 'Itai-Itai Disease', definition: 'Severe osteomalacia, multiple bone fractures, and renal tubular dysfunction caused by chronic industrial Cadmium poisoning.', simpleExplanation: 'Painful bone softening disease caused by cadmium pollution.' },
      { term: 'Methyl Isocyanate (MIC)', definition: 'Highly volatile, toxic chemical gas leaked during the 1984 Bhopal Gas Tragedy, causing acute pulmonary edema, corneal ulceration, and mass asphyxiation.', simpleExplanation: 'Lethal gas leaked during the 1984 Bhopal gas tragedy.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Occupational Environmental Exposure Assessment', description: '1. Industrial history & air sampling, 2. Biological monitoring (blood/urine lead, cadmium, benzene metabolites), 3. High-resolution CT chest & lung biopsy.', keyTakeaway: 'Biological monitoring establishes industrial causation.' }
    ],
    importantConcepts: [{ title: 'Bhopal Gas Tragedy (1984) Toxicological Features', content: 'Occurred on Dec 2-3, 1984 at Union Carbide plant, Bhopal. Over 40 tons of Methyl Isocyanate (MIC) gas leaked. MIC reacted with lung water forming toxic compounds, causing mass necrotizing tracheobronchitis, pulmonary edema, and immediate blindness.', type: 'info' }],
    flowcharts: [{ title: 'Industrial Toxins & Specific Diseases', description: 'Occupational linkages.', steps: [{ label: '1. Asbestos Exposure', description: 'Asbestosis -> Ferruginous bodies -> Pleural Mesothelioma.' }, { label: '2. Benzene Exposure', description: 'Aplastic Anemia -> Acute Myeloid Leukemia (AML).' }, { label: '3. Cadmium Exposure', description: 'Renal tubular dysfunction -> Itai-Itai painful bone disease.' }] }],
    tables: [{ title: 'Industrial & Environmental Toxins Summary', headers: ['Industrial Toxin', 'Primary Exposure Source', 'Characteristic Disease / Cancer', 'Diagnostic Biomarker'], rows: [['Asbestos', 'Insulation, roofing sheets, shipyards', 'Pleural Mesothelioma, Asbestosis', 'Ferruginous (Asbestos) bodies in sputum/lung'], ['Benzene', 'Petrochemicals, solvents, paints', 'Acute Myeloid Leukemia (AML), Aplastic anemia', 'Urinary S-phenylmercapturic acid'], ['Cadmium', 'Batteries, electroplating, polluted water', 'Itai-Itai disease (Osteomalacia + Renal damage)', 'Urinary Cadmium & Beta-2 microglobulin'], ['Methyl Isocyanate (MIC)', 'Industrial pesticide manufacturing (Bhopal)', 'Acute pulmonary edema, corneal burns, mass asphyxia', 'Clinical history of MIC leak exposure']] }],
    clinicalExamples: [{ title: 'Shipyard Worker with Pleural Effusion', scenario: 'A 62-year-old retired shipyard worker presents with progressive breathlessness, chest wall pain, and pleural thickening on CT scan.', analysis: 'Biopsy reveals malignant Pleural Mesothelioma. Sputum reveals Ferruginous (Asbestos) bodies confirming occupational asbestos exposure.', takeaway: 'Asbestos exposure is strongly linked to mesothelioma.' }],
    medicolegalImportance: ['Establishes industrial compensation claims under Factories Act 1948.', 'Informs environmental pollution litigation under EPA Act 1986.', 'Identifies occupational hazards in occupational medicine.'],
    mnemonics: [{ title: 'Industrial Hazards - "A-B-C-M"', phrase: 'Asbestos-Mesothelioma, Benzene-Leukemia, Cadmium-Itai Itai, MIC-Bhopal', breakdown: [{ letter: 'A', word: 'Asbestos', meaning: 'Pleural Mesothelioma' }] }],
    commonMistakes: [{ mistake: 'Confusing Asbestosis with silicosis radiologically.', whyWrong: 'Asbestosis predominantly affects lower lung zones with pleural plaques; Silicosis affects upper lung zones with eggshell calcification.', correctConcept: 'Asbestos = Lower zones; Silica = Upper zones.' }],
    highYieldPoints: ['Asbestos = Pleural Mesothelioma + Ferruginous bodies.', 'Benzene = Acute Myeloid Leukemia (AML).', 'Cadmium = Itai-Itai disease (painful bones + renal damage).', 'Bhopal Gas Tragedy (1984) = Methyl Isocyanate (MIC) gas.', 'Factories Act 1948 = Governs occupational safety in India.'],
    previousExamQuestions: [{ question: 'Discuss Environmental & Industrial Toxicology. Detail Bhopal Gas Tragedy (MIC) and Asbestos toxicity.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What gas was responsible for the 1984 Bhopal Gas Tragedy?', answer: 'Methyl Isocyanate (MIC) gas.', clinicalPearl: 'Historical industrial toxicity hallmark.' }],
    shortNotes: [{ title: 'Itai-Itai Disease', answer: 'Chronic industrial Cadmium poisoning causing osteomalacia, multiple bone fractures, and renal tubular failure.' }],
    longQuestions: [{ title: 'Discuss Environmental Toxicology.', outline: ['Asbestos and Mesothelioma', 'Benzene and Leukemia', 'Bhopal gas tragedy details', 'Factories Act and occupational health'] }],
    mcqs: [{ id: 1, question: 'Occupational exposure to Asbestos is characteristically linked to which malignant tumor?', options: ['Hepatic angiosarcoma', 'Pleural Mesothelioma', 'Renal cell carcinoma', 'Bladder carcinoma'], correctIndex: 1, explanation: 'Asbestos is the primary etiologic agent for Malignant Pleural Mesothelioma.' }],
    caseBasedQuestions: [{ id: 1, title: 'Shipyard Mesothelioma', scenario: 'Worker with chest pain and pleural thickening showing asbestos bodies.', questions: ['Diagnosis? Toxin?'], solution: 'Malignant Mesothelioma; Asbestos exposure.', legalSections: ['Environmental Toxicology'] }],
    summary: 'Chapter 38 covers industrial toxins, asbestos, mesothelioma, benzene leukemia, cadmium itai-itai, Bhopal gas tragedy (MIC), and Factories Act 1948.',
    revisionSheet: ['Asbestos = Mesothelioma.', 'Benzene = Leukemia.', 'Cadmium = Itai-Itai.', 'Bhopal = Methyl Isocyanate (MIC).'],
    flashcards: [{ id: 1, front: 'What gas caused the 1984 Bhopal Gas Tragedy?', back: 'Methyl Isocyanate (MIC).', category: 'Environmental Toxicology' }]
  }
];
