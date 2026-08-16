export interface TopicStudyDetail {
  id?: string;
  topicId?: string;
  name?: string;
  topicTitle?: string;
  subjectId?: string;
  subjectCode?: string;
  subjectName?: string;
  year?: '1st BHMS' | '2nd BHMS' | '3rd BHMS' | '4th BHMS' | string;
  competencyLevel?: 'Must Know' | 'Desirable to Know' | 'Nice to Know' | string;
  competencyDomain?: string;
  domain?: 'Cognitive' | 'Psychomotor' | 'Affective' | string;
  teachingHours?: string;
  overview?: string;
  whyImportant?: string;
  whyItMatters?: string;
  coreConcepts?: string[];
  clinicalPearls?: string[];
  miasmaticBasis?: string;
  examLAQs?: string[];
  examSAQs?: string[];
  vivaQuestions?: string[];
  examBlueprint?: {
    longAnswerQuestions?: string[];
    shortAnswerQuestions?: string[];
    vivaVoceQuestions?: string[];
  };
  recommendedBooks?: string[];
  referenceTextbooks?: string[];
  studyHubLink?: string;
  relatedRemedies?: string[];
}

export const CBDC_TOPIC_STUDY_DATABASE: Record<string, TopicStudyDetail> = {
  // --- ANATOMY (1ST BHMS) ---
  "an_t1": {
    id: "an_t1",
    name: "Anatomical positions, planes, and directional terms",
    subjectId: "anatomy",
    subjectName: "Human Anatomy (HomUG-Anat)",
    year: "1st BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "The standard anatomical position is the universal reference framework in human medicine: standing erect, facing the observer, upper limbs by sides with palms facing forward, and feet together. Cardinal planes (Median/Sagittal, Coronal/Frontal, and Horizontal/Transverse) divide the body into sections for spatial orientation and imaging interpretation.",
    whyImportant: "Essential for clinical examination, surgical localization, radiologic interpretation (CT/MRI), and precise symptom location mapping in Homoeopathy.",
    coreConcepts: [
      "Median Plane: Vertical plane dividing body into equal right and left halves.",
      "Sagittal Plane: Any plane parallel to the median plane.",
      "Coronal / Frontal Plane: Vertical plane perpendicular to median, dividing body into anterior (ventral) and posterior (dorsal) sections.",
      "Transverse / Horizontal / Axial Plane: Right angles to sagittal & coronal planes, dividing into superior (cranial) and inferior (caudal).",
      "Directional terms: Medial vs. Lateral, Proximal vs. Distal, Superficial vs. Deep, Ipsilateral vs. Contralateral."
    ],
    clinicalPearls: [
      "In Homoeopathic case taking, noting laterality (e.g. right-sided Lycopodium vs. left-sided Lachesis) and diagonal symptom directions (e.g. upper right to lower left) relies on correct anatomical orientation.",
      "Radiologic scans are viewed from the foot end: the patient's right side is on the viewer's left side."
    ],
    examLAQs: [
      "Describe the standard anatomical position, cardinal planes of the human body, and their practical significance in clinical examination."
    ],
    examSAQs: [
      "Define Coronal and Sagittal planes with diagrams (5 Marks)",
      "Explain the terms Proximal, Distal, Medial, and Lateral with examples (5 Marks)"
    ],
    vivaQuestions: [
      "What is the anatomical position of the thumb and forearm?",
      "Which plane is used in standard CT axial slices?",
      "Differentiate between Prone and Supine positions."
    ],
    recommendedBooks: ["BD Chaurasia Human Anatomy (Vol 1)", "Gray's Anatomy for Students", "Vishram Singh Clinical Anatomy"],
    studyHubLink: "/subject/anatomy"
  },
  "an_brachial_plexus": {
    id: "an_brachial_plexus",
    name: "Brachial Plexus: Formation, Branches & Clinical Palsies",
    subjectId: "anatomy",
    subjectName: "Human Anatomy (HomUG-Anat)",
    year: "1st BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "The Brachial Plexus is a somatic nerve plexus formed by the ventral rami of spinal nerves C5, C6, C7, C8, and T1. It is structurally organized into 5 Roots, 3 Trunks (Upper, Middle, Lower), 6 Divisions (3 Anterior, 3 Posterior), 3 Cords (Lateral, Posterior, Medial), and terminal branches supplying the upper extremity.",
    whyImportant: "High-yield 10-mark essay topic in 1st BHMS university exams; critical for diagnosing peripheral nerve injuries like Erb's palsy, Klumpke's paralysis, and wrist drop.",
    coreConcepts: [
      "Roots: Anterior primary rami of C5 to T1 spinal nerves in the posterior triangle of neck.",
      "Trunks: C5+C6 form Upper trunk (Erb's point); C7 forms Middle trunk; C8+T1 form Lower trunk.",
      "Cords: Named relative to the second part of the Axillary Artery (Lateral, Medial, Posterior).",
      "Major terminal nerves: Musculocutaneous, Axillary, Radial, Median, and Ulnar nerves.",
      "Erb's Point: Junction of 6 nerve fibers where injury produces 'Policeman's tip' or 'Waiter's tip' deformity."
    ],
    clinicalPearls: [
      "Erb-Duchenne Palsy (C5-C6 upper trunk traction during difficult birth): Arm hangs by side, adducted, medially rotated, forearm extended and pronated.",
      "Klumpke's Palsy (C8-T1 lower trunk injury from clutching during a fall): Claw hand deformity and associated Horner's syndrome due to sympathetic T1 involvement.",
      "Homoeopathic remedies for nerve trauma and laceration: Hypericum perforatum (nerve pain, shooting upwards), Arnica (ecchymosis/bruising), Ledum palustre, Causticum (post-paralysis contractures)."
    ],
    examLAQs: [
      "Describe the formation, relations, cords, and terminal branches of the Brachial Plexus with a neat labeled schematic diagram. Discuss Erb's palsy in detail. (10 Marks)"
    ],
    examSAQs: [
      "Write short notes on Erb's point and Erb-Duchenne paralysis (5 Marks)",
      "Klumpke's paralysis and Claw hand deformity (5 Marks)",
      "Branches arising from the Posterior Cord of Brachial Plexus (5 Marks)"
    ],
    vivaQuestions: [
      "Which spinal nerves contribute to the Phrenic and Long Thoracic nerve of Bell?",
      "Why is Klumpke's palsy accompanied by Horner's syndrome?",
      "What nerve is damaged in Saturday Night Palsy (Radial nerve)?"
    ],
    recommendedBooks: ["BD Chaurasia Human Anatomy (Vol 1 - Upper Limb)", "Gray's Anatomy for Students"],
    studyHubLink: "/subject/anatomy",
    relatedRemedies: ["Hypericum", "Arnica", "Causticum", "Plumbum metallicum"]
  },

  // --- PHYSIOLOGY (1ST BHMS) ---
  "phys_cardiac_cycle": {
    id: "phys_cardiac_cycle",
    name: "Cardiac Cycle: Mechanical & Electrical Events",
    subjectId: "physiology",
    subjectName: "Physiology & Biochemistry (HomUG-Physio)",
    year: "1st BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "The cardiac cycle encompasses all physiological events from the beginning of one heartbeat to the beginning of the next, lasting approximately 0.8 seconds at a normal heart rate of 75 bpm. It comprises Ventricular Systole (Isovolumetric contraction 0.05s, Rapid ejection 0.10s, Reduced ejection 0.15s) and Ventricular Diastole (Protodiastole 0.04s, Isovolumetric relaxation 0.08s, Rapid filling 0.11s, Reduced filling 0.19s, Atrial systole 0.10s).",
    whyImportant: "Fundamental to cardiovascular hemodynamics, blood pressure maintenance, murmur auscultation, and ECG correlation.",
    coreConcepts: [
      "Wiggers Diagram: Integration of aortic pressure, left ventricular pressure, left atrial pressure, ventricular volume, ECG, and phonocardiogram.",
      "First Heart Sound (S1 'LUBB'): Caused by closure of AV valves (Mitral and Tricuspid) at onset of ventricular systole.",
      "Second Heart Sound (S2 'DUBP'): Caused by closure of semilunar valves (Aortic and Pulmonary) at onset of ventricular diastole.",
      "Stroke Volume (SV = EDV - ESV ~ 70 mL) and Ejection Fraction (EF = SV/EDV ~ 60-65%)."
    ],
    clinicalPearls: [
      "Valvular stenosis generates ejection murmurs during systole/diastole; incompetence generates regurgitant murmurs.",
      "Homoeopathic heart remedies: Crataegus Oxyacantha (heart tonic, weak myocardial tone), Digitalis (slow pulse, failing heart), Cactus Grandiflorus (sensation of constriction as if an iron band gripped the heart), Spigelia (violent visible palpitations with neuralgic shooting pains)."
    ],
    examLAQs: [
      "Describe the mechanical and pressure changes in the left ventricle during the cardiac cycle with the help of a Wiggers diagram. (10 Marks)"
    ],
    examSAQs: [
      "Explain the origin and clinical significance of 1st and 2nd heart sounds (5 Marks)",
      "Define Stroke Volume, End-Diastolic Volume, and Ejection Fraction (5 Marks)",
      "Isovolumetric contraction phase of the cardiac cycle (5 Marks)"
    ],
    vivaQuestions: [
      "What is the total duration of the cardiac cycle when heart rate is 75/min?",
      "Why is isovolumetric contraction called isometric?",
      "Which phase corresponds to the T wave on an ECG?"
    ],
    recommendedBooks: ["Guyton & Hall Textbook of Medical Physiology", "AK Jain Physiology"],
    studyHubLink: "/subject/physiology",
    relatedRemedies: ["Crataegus", "Digitalis", "Cactus", "Spigelia", "Lachesis"]
  },

  // --- PHARMACY (1ST BHMS) ---
  "pharm_trituration": {
    id: "pharm_trituration",
    name: "Trituration: Hahnemannian 3-Stage Method for Insoluble Substances",
    subjectId: "pharmacy",
    subjectName: "Homoeopathic Pharmacy (HomUG-Pharm)",
    year: "1st BHMS",
    competencyLevel: "Must Know",
    domain: "Psychomotor",
    overview: "Trituration is the mechanical process of attenuating insoluble raw medicinal substances (minerals, metals, insoluble plant resins) with pure Sugar of Milk (Saccharum Lactis) in a porcelain mortar and pestle to release their latent dynamic therapeutic curative powers (§270, Organon 6th Edition). It follows a strict 1-hour protocol per potency step.",
    whyImportant: "Core practical and theory examination topic in 1st BHMS Pharmacy; underpins the conversion of insoluble minerals into soluble 6X / 3C liquid potencies.",
    coreConcepts: [
      "Vehicle: Pure Saccharum Lactis (Milk Sugar), non-hygroscopic, chemically inert, hard crystalline grains.",
      "The 1-Hour Hahnemannian Rule (3 Stages of 20 minutes each):",
      "Stage 1 (20 mins): 1/3rd vehicle + 1 part crude drug -> 6 mins grinding, 4 mins scraping, 6 mins grinding, 4 mins scraping.",
      "Stage 2 (20 mins): Add 2nd 1/3rd vehicle -> 6 mins grinding, 4 mins scraping, 6 mins grinding, 4 mins scraping.",
      "Stage 3 (20 mins): Add 3rd 1/3rd vehicle -> 6 mins grinding, 4 mins scraping, 6 mins grinding, 4 mins scraping.",
      "Conversion to Liquid Potencies: 6X (or 3C) powder is converted to liquid 8X (or 4C) using dilute alcohol/purified water."
    ],
    clinicalPearls: [
      "Substances chemically inert in crude form (like Lycopodium spore dust, Silicea quartz, Carbo vegetabilis charcoal, Aurum metallicum gold) become deeply penetrating constitutional polychrests only after fine trituration breaks the cellular wall / atomic lattice.",
      "Hahnemann noted that potentisation through trituration is not mere dilution, but genuine dynamic liberation of spirit-like curative force."
    ],
    examLAQs: [
      "Describe the process of Trituration of an insoluble substance according to the Hahnemannian method. Explain the 1-hour rule with timing chart and its conversion to liquid potency. (10 Marks)"
    ],
    examSAQs: [
      "Write short notes on Saccharum Lactis as a vehicle for trituration (5 Marks)",
      "Differences between Decimal and Centesimal scale triturations (5 Marks)",
      "Conversion of 3C / 6X trituration into liquid potency (5 Marks)"
    ],
    vivaQuestions: [
      "Why is porcelain mortar preferred over glass or iron for trituration?",
      "Why is the drug substance divided into 3 equal portions during the hour?",
      "At what potency does an insoluble substance become soluble in alcohol/water (6X or 3C)?"
    ],
    recommendedBooks: ["M. Bhattacharyya Homoeopathic Pharmacy", "Dr. D.D. Banerjee Textbook of Homoeopathic Pharmacy", "HPIS (Pharmacopoeia of India)"],
    studyHubLink: "/subject/pharmacy",
    relatedRemedies: ["Silicea", "Aurum metallicum", "Carbo veg", "Lycopodium", "Calcarea carb"]
  },

  // --- PATHOLOGY (2ND BHMS) ---
  "path_cell_injury": {
    id: "path_cell_injury",
    name: "Cell Injury, Cellular Adaptations, Necrosis & Apoptosis",
    subjectId: "pathology",
    subjectName: "Pathology & Microbiology (HomUG-Path-M)",
    year: "2nd BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "Cellular injury occurs when environmental stress exceeds a cell's adaptive capability. Reversible injury is characterized by cellular swelling (hydropic change) and fatty change (steatosis). Irreversible injury leads to cell death via Necrosis (pathologic, cell swelling, membrane rupture, enzymatic digestion, inflammatory response) or Apoptosis (programmed cell death, cell shrinkage, intact membrane, apoptotic bodies, no inflammation).",
    whyImportant: "Fundamental chapter of General Pathology; high-yield essay question in 2nd BHMS Paper I; maps directly to Hahnemannian miasmatic disease development.",
    coreConcepts: [
      "Cellular Adaptations: Hypertrophy (increase in size), Hyperplasia (increase in cell number), Atrophy (decrease in size/mass), Metaplasia (reversible transformation of one adult cell type into another).",
      "Morphological Types of Necrosis: Coagulative (ischemic infarcts in solid organs except brain), Liquefactive (brain infarcts, abscesses), Caseous (tuberculosis, 'cheesy' appearance), Fat (pancreatitis, breast trauma), Fibrinoid (immune-mediated vasculitis), Gangrenous (dry vs. wet vs. gas).",
      "Apoptosis Pathways: Intrinsic (Mitochondrial / Cytochrome C / Caspase-9) and Extrinsic (Death Receptor / Fas-FasL / Caspase-8).",
      "Pathologic Calcification: Dystrophic (in dying/necrotic tissue with normal serum calcium) vs. Metastatic (in normal tissue with hypercalcemia)."
    ],
    clinicalPearls: [
      "Miasmatic Pathological Correlation: Cellular Adaptations & Hypertrophy/Hyperplasia = Sycotic overgrowth; Cellular Swelling & Functional Derangement = Psoric dynamic dyscrasia; Necrosis, Ulceration & Tissue Destruction = Syphilitic destructive miasm.",
      "Homoeopathic therapeutics for gangrenous and necrotic tissue: Secale cornutum (dry gangrene, feels hot but cold to touch, better by uncovering), Arsenicum album (burning pains better by heat, rapid prostration), Lachesis (purplish-black, septic decomposition), Anthracinum (severe carbuncles, burning, septic fever)."
    ],
    examLAQs: [
      "Define Cell Injury. Discuss the etiology, pathogenesis, biochemical mechanisms, and morphological types of Necrosis. Compare Necrosis with Apoptosis. (10 Marks)"
    ],
    examSAQs: [
      "Differentiate between Hypertrophy and Hyperplasia with clinical examples (5 Marks)",
      "Metaplasia: Definition, types, and significance in squamous cell carcinoma (5 Marks)",
      "Caseous necrosis and its histology in Tuberculosis (5 Marks)",
      "Dystrophic vs. Metastatic calcification (5 Marks)"
    ],
    vivaQuestions: [
      "Which organ exhibits liquefactive necrosis upon ischemic infarction? (Brain)",
      "What are Councilman bodies in viral hepatitis? (Apoptotic hepatocytes)",
      "What is the hallmark of irreversible cell injury? (Severe mitochondrial damage and cell membrane rupture)"
    ],
    recommendedBooks: ["Robbins & Cotran Pathologic Basis of Disease (10th Ed)", "Harsh Mohan Textbook of Pathology"],
    studyHubLink: "/subject/pathology/cell-injury",
    relatedRemedies: ["Secale cornutum", "Arsenicum album", "Lachesis", "Anthracinum", "Silicea"]
  },

  // --- FORENSIC MEDICINE (2ND BHMS) ---
  "fmt_thanatology": {
    id: "fmt_thanatology",
    name: "Thanatology: Post-Mortem Changes, Rigor Mortis & Lividity",
    subjectId: "fmt",
    subjectName: "Forensic Medicine & Toxicology (HomUG-FMT)",
    year: "2nd BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "Thanatology is the scientific study of death, somatic vs. molecular death, and the sequential physical, chemical, and biological post-mortem changes that occur in the human body. These include Algor Mortis (cooling of body), Rigor Mortis (muscular stiffening due to ATP depletion), Post-Mortem Lividity (Hypostasis / Suggillation due to RBC settling), and Putrefaction (decomposition by bacteria).",
    whyImportant: "Essential for estimating the Time Since Death (PMI), distinguishing cause/manner of death, and certifying legal death.",
    coreConcepts: [
      "Rigor Mortis: Begins 1-2 hours after death, fully established in 12 hours, persists for 12 hours, passes off in 12 hours (Nysten's Law: face -> neck -> trunk -> upper limbs -> lower limbs).",
      "Cadaveric Spasm (Instantaneous Rigor): Immediate stiffening of muscles at the exact moment of death due to severe emotional/physical stress (e.g. grasping a weapon in suicide, weeds in drowning); infallible proof of death circumstances.",
      "Post-Mortem Hypostasis (Lividity): Appears in dependent parts in 1-2 hours, fixates in 6-8 hours. Cherry red in Carbon Monoxide, Bright red in Cyanide, Chocolate brown in Nitrites.",
      "Casper's Dictum: Rate of putrefaction is 1 week in air = 2 weeks in water = 8 weeks in earth (1:2:8)."
    ],
    clinicalPearls: [
      "Cadaveric spasm cannot be simulated after death, making it the most definitive medico-legal differentiator between suicide and homicide.",
      "Homoeopathic Toxicological Antidotes: Camphora (universal antidote for plant poisons), Nux Vomica (antidote for drug overdoses/stimulants), Arsenicum Album (for ptomaine/spoiled meat poisoning), Ledum palustre (for animal and insect stings)."
    ],
    examLAQs: [
      "Define death. Discuss in detail the post-mortem changes after death. Explain the development, course, and medico-legal importance of Rigor Mortis and compare it with Cadaveric Spasm. (10 Marks)"
    ],
    examSAQs: [
      "Differentiate between Rigor Mortis and Cadaveric Spasm (5 Marks)",
      "Post-mortem hypostasis: Formation, fixation, and color variations in poisons (5 Marks)",
      "Casper's Dictum and stages of putrefaction (5 Marks)"
    ],
    vivaQuestions: [
      "What is the biochemical cause of Rigor Mortis? (ATP depletion preventing detachment of actin-myosin bridges)",
      "What color is lividity in Cyanide poisoning? (Bright brick-red / pink)",
      "What is adipocere / saponification?"
    ],
    recommendedBooks: ["KS Narayan Reddy The Essentials of Forensic Medicine & Toxicology", "Modi Medical Jurisprudence"],
    studyHubLink: "/subject/forensic-medicine",
    relatedRemedies: ["Camphora", "Nux vomica", "Arsenicum album", "Ledum"]
  },

  // --- MATERIA MEDICA - II (2ND BHMS) ---
  "mm2_polychrests": {
    id: "mm2_polychrests",
    name: "Polychrest Remedy Study & Comparative Therapeutics (48 Medicines)",
    subjectId: "materia2",
    subjectName: "Homoeopathic Materia Medica - II (HomUG-HMM-II)",
    year: "2nd BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "2nd BHMS Materia Medica covers 48 core medicines ranging from Acetic Acid to Veratrum Album. Polychrest remedies act deeply on multiple organ systems, tissues, and mental planes with marked miasmatic coverage (Psora, Sycosis, Syphilis). The syllabus focuses on constitution, keynotes, thermal affinity (Hot vs. Chilly), modalities, and comparative triads.",
    whyImportant: "Core university exam subject in 2nd BHMS (100 Marks); essential for clinical bedside prescribing in OPD/IPD.",
    coreConcepts: [
      "Thermal Classification: Chilly remedies (Arsenicum, Hepar sulph, Nux vomica, Silicea, Psorinum) vs. Hot remedies (Sulphur, Pulsatilla, Apis mellifica, Natrum mur, Secale cornutum).",
      "Restlessness Triad: Aconite (mental & physical fear of death), Arsenicum (prostration, anxious, midnight agg), Rhus Tox (body aches, physically driven to move).",
      "Pain Modality Comparatives: Bryonia Alba (aggravated by slightest motion, relieved by absolute rest & pressure) vs. Rhus Toxicodendron (aggravated on initial movement, relieved by continued motion and warm applications).",
      "Gastric Triad: Nux Vomica (over-indulgence, sedentary, ineffectual urging), Pulsatilla (rich fatty food, thirstless, chilly but wants open air), Carbo Veg (upper abdomen bloating, air hunger, fanning)."
    ],
    clinicalPearls: [
      "Always evaluate totality: Mental state + Thermal state + Generals + Modalities (> / <) + Characteristic particular symptoms (Aphorism 153 PQRS).",
      "Comparative prescribing prevents routine polypharmacy and ensures precise Simillimum selection."
    ],
    examLAQs: [
      "Give the complete drug picture of Bryonia Alba under the headings: Introduction, Constitution, Guiding Keynotes, Mental Symptoms, Respiratory Affections, and Modalities. Compare it with Rhus Tox in joint disorders. (10 Marks)"
    ],
    examSAQs: [
      "Compare the gastric symptoms of Nux Vomica and Pulsatilla (5 Marks)",
      "Compare the restlessness of Aconite, Arsenicum, and Rhus Tox (5 Marks)",
      "Write guiding indications of Hepar Sulph in suppurative conditions (5 Marks)"
    ],
    vivaQuestions: [
      "Which remedy is known as the 'Homeopathic Antiseptic'? (Pyrogenium / Echinacea)",
      "What is the characteristic thirst of Apis Mellifica? (Thirstless in dropsy and fevers)",
      "Mention 3 remedies with right-to-left symptom progression (Lycopodium, Belladonna, Apis)."
    ],
    recommendedBooks: ["Boericke New Manual of HMM", "Phatak Materia Medica", "Nash Leaders in Homoeopathic Therapeutics", "Allen's Keynotes"],
    studyHubLink: "/subject/materia-medica",
    relatedRemedies: ["Bryonia", "Rhus tox", "Nux vomica", "Pulsatilla", "Arsenicum", "Hepar sulph"]
  },

  // --- ORGANON - II (2ND BHMS) ---
  "om2_case_taking": {
    id: "om2_case_taking",
    name: "Homoeopathic Case Taking Principles & Unprejudiced Observer (§83–§104)",
    subjectId: "organon2",
    subjectName: "Organon of Medicine - II (HomUG-OM-II)",
    year: "2nd BHMS",
    competencyLevel: "Must Know",
    domain: "Affective",
    overview: "Aphorisms 83 to 104 in Samuel Hahnemann's Organon of Medicine establish the scientific and philosophical foundations of Homoeopathic Case Taking. The physician must possess: Freedom from prejudice, Sound senses, Attentiveness in observing, and Fidelity in tracing the picture of the disease. It details individualization in acute vs. chronic diseases, recording exact expressions, and avoiding leading questions.",
    whyImportant: "The cornerstone of homoeopathic clinical practice; 10-mark mandatory question in 2nd BHMS Organon Paper.",
    coreConcepts: [
      "§83: Requirements of Physician: Unprejudiced mind, sound senses, attentiveness, and fidelity in noting down symptoms.",
      "§84: Patient narrates, attendants describe, physician listens without interrupting until they finish.",
      "§85: Physician begins writing each symptom on a fresh line, leaving wide margins for additions.",
      "§86–87: Interrogation rules: Never ask leading or direct questions answerable by 'Yes' or 'No'. Ask open-ended questions (e.g. 'What is the character of pain?').",
      "§88–90: Inquiring into generalities, modalities, discharges, mental dispositions, and objective observations.",
      "§91–93: Case taking in Chronic Diseases: Inquiring into previous treatments, suppressions, habits, diet, and miasmatic background.",
      "§99–104: Acute Epidemic Diseases: Recording totality of symptoms across multiple provers/patients to find the Genus Epidemicus."
    ],
    clinicalPearls: [
      "Leading questions contaminate the case record with the physician's subjective bias rather than the patient's pure natural disease language.",
      "Objective observations by the physician (§90): Facial expression, pupil size, tongue coating, sweat odor, posture, and emotional reactions are often the most reliable PQRS symptoms."
    ],
    examLAQs: [
      "Discuss the rules and guidelines of Homoeopathic Case Taking according to Aphorisms 83 to 104 of the Organon of Medicine. Explain why leading questions are strictly forbidden. (10 Marks)"
    ],
    examSAQs: [
      "What is meant by an 'Unprejudiced Observer' in §83? (5 Marks)",
      "Explain the procedure of finding the 'Genus Epidemicus' in epidemic diseases (§100-102) (5 Marks)",
      "Rules for questioning a patient during case taking (§86-88) (5 Marks)"
    ],
    vivaQuestions: [
      "Why should the physician not interrupt the patient while they are narrating (§84)?",
      "What is a leading question and why is it forbidden in homoeopathy?",
      "In which aphorisms does Hahnemann discuss the investigation of Chronic Diseases?"
    ],
    recommendedBooks: ["Hahnemann Organon of Medicine (6th Ed)", "BK Sarkar Commentary on Organon", "Stuart Close Genius of Homoeopathy"],
    studyHubLink: "/subject/organon"
  },

  // --- SURGERY (3RD BHMS) ---
  "surg_wound_healing": {
    id: "surg_wound_healing",
    name: "Wound Healing, Shock, Burns & Surgical Homoeopathy",
    subjectId: "surgery",
    subjectName: "Surgery & Therapeutics (HomUG-Surg)",
    year: "3rd BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "Wound healing is a complex biological cascade comprising 4 overlapping phases: Hemostasis (minutes), Inflammation (1-4 days), Proliferation / Granulation (4-21 days), and Remodeling / Maturation (21 days to 1 year). The syllabus covers primary vs. secondary intention, shock (hypovolemic, cardiogenic, septic, neurogenic), burns assessment (Wallace Rule of Nines), and clinical surgical homoeopathic management.",
    whyImportant: "Core university surgical question in 3rd BHMS Paper I; integrates emergency orthodox triage with non-operative homoeopathic remedies.",
    coreConcepts: [
      "Phases of Wound Healing: Hemostatic plug -> Neutrophils & Macrophages -> Fibroblasts, Angiogenesis, Type III collagen -> Type I collagen remodeling.",
      "Primary Intention (clean, approximated edges, minimal scar) vs. Secondary Intention (large gap, abundant granulation tissue, wound contraction by myofibroblasts, prominent scar).",
      "Complications of Healing: Keloid (overgrowth extending beyond wound borders, thick hyalinized collagen), Hypertrophic scar (confined to wound boundary, improves over time), Dehiscence, Chronic ulcer.",
      "Burns: Wallace Rule of Nines (Head 9%, Each Arm 9%, Anterior Trunk 18%, Posterior Trunk 18%, Each Leg 18%, Perineum 1%), Parkland Formula for IV Ringer Lactate resuscitation."
    ],
    clinicalPearls: [
      "Surgical Homoeopathic Prescribing:",
      "Arnica Montana: Blunt trauma, prevention of surgical shock, ecchymosis, hematoma.",
      "Staphysagria: Clean incised surgical wounds, severe pain post-laparotomy / catheterization / episiotomy.",
      "Hypericum Perforatum: Crushed fingertips, lacerated nerve-rich areas, prevention of tetanus.",
      "Calendula Officinalis: Antiseptic wound dressing, promotes healthy granulation, prevents suppurative keloids.",
      "Symphytum Officinale: Speeds osteogenesis in non-displaced fractures; contraindicated before reduction."
    ],
    examLAQs: [
      "Describe the phases of wound healing in detail. Differentiate between healing by primary and secondary intention. Discuss the complications of wound healing and outline the homoeopathic management of surgical wounds. (10 Marks)"
    ],
    examSAQs: [
      "Wallace Rule of Nines for assessment of burns (5 Marks)",
      "Differentiate between Keloid and Hypertrophic Scar (5 Marks)",
      "Role of Calendula, Arnica, and Staphysagria in post-operative care (5 Marks)"
    ],
    vivaQuestions: [
      "What cell type is responsible for wound contraction in secondary intention? (Myofibroblast)",
      "Why must Symphytum NOT be given before a fractured bone is properly set?",
      "Which crystalloid fluid is the choice in Parkland burns resuscitation? (Ringer's Lactate)"
    ],
    recommendedBooks: ["Bailey & Love Short Practice of Surgery", "SRB Manual of Surgery", "S. Das Clinical Surgery"],
    studyHubLink: "/subject/surgery",
    relatedRemedies: ["Arnica", "Staphysagria", "Hypericum", "Calendula", "Symphytum", "Cantharis"]
  },

  // --- OBSTETRICS & GYNAECOLOGY (2ND & 3RD BHMS) ---
  "obg_normal_labor": {
    id: "obg_normal_labor",
    name: "Mechanism of Normal Labor & Obstetric Therapeutics",
    subjectId: "obgyn",
    subjectName: "Gynaecology & Obstetrics (HomUG-OBG)",
    year: "3rd BHMS",
    competencyLevel: "Must Know",
    domain: "Psychomotor",
    overview: "Normal Labor (Eutocia) is the physiological process by which a viable fetus (≥37 weeks), in vertex presentation, is delivered spontaneously through the birth canal without maternal or fetal complications. It is categorized into 4 stages: Stage I (onset of true labor to full cervical dilation 10cm), Stage II (full dilation to delivery of fetus), Stage III (delivery of placenta & membranes), and Stage IV (1 hour observation for postpartum hemorrhage).",
    whyImportant: "Central topic in NCH Obstetrics curriculum; high-yield 10-mark LAQ; essential for clinical maternity postings.",
    coreConcepts: [
      "Mechanism of Labor in Occipito-Anterior Position (8 cardinal steps):",
      "1. Engagement (biparietal diameter 9.5cm crosses pelvic brim)",
      "2. Descent (continuous throughout labor)",
      "3. Flexion (Chin to chest, smaller suboccipitobregmatic 9.5cm diameter presents)",
      "4. Internal Rotation of Head (occiput rotates 1/8th of a circle anteriorly towards pubic symphysis)",
      "5. Extension (crowning, head is born by extension: occiput, face, chin)",
      "6. Restitution (head untwists 1/8th circle to realign with shoulders)",
      "7. External Rotation (shoulders rotate internally, head rotates another 1/8th circle)",
      "8. Expulsion (anterior shoulder born under pubis, posterior shoulder sweeps perineum, body follows)."
    ],
    clinicalPearls: [
      "Partogram monitoring (Alert line & Action line with 4-hour gap) detects labor dystocia early.",
      "Homoeopathic Labor Therapeutics:",
      "Caulophyllum: Inefficient, spasmodic, fly-about labor pains with rigid os; coordinates uterine contractions.",
      "Cimicifuga (Actaea Racemosa): Shivers in 1st stage, hysterical dread, pains shoot across pelvis from hip to hip.",
      "Gelsemium: Rigid, thick os, complete lack of labor progress, muscular trembling and drowsiness.",
      "Secale Cornutum: Uterine atony, thin scrawny women, continuous burning pains, better by uncovering.",
      "Sabina & Millefolium & Trillium Pendulum: Threatened abortion and bright red postpartum bleeding."
    ],
    examLAQs: [
      "Define normal labor. Describe the mechanism of labor in Left Occipito-Anterior (LOA) position with neat diagrams. Discuss the management of the third stage of labor and homoeopathic indications for uterine inertia. (10 Marks)"
    ],
    examSAQs: [
      "Stages of labor and their average duration in primigravida vs. multigravida (5 Marks)",
      "Active management of third stage of labor (AMTSL) and PPH prevention (5 Marks)",
      "Indications of Caulophyllum and Cimicifuga in labor dystocia (5 Marks)"
    ],
    vivaQuestions: [
      "What is crowning of the fetal head?",
      "What diameter engages in well-flexed vertex presentation? (Suboccipito-bregmatic, 9.5 cm)",
      "What are the 4 Ts of Postpartum Hemorrhage? (Tone, Trauma, Tissue, Thrombin)"
    ],
    recommendedBooks: ["DC Dutta Textbook of Obstetrics", "Shaw's Textbook of Gynaecology"],
    studyHubLink: "/subject/gynecology-obstetrics",
    relatedRemedies: ["Caulophyllum", "Cimicifuga", "Gelsemium", "Secale", "Sabina", "Pulsatilla"]
  },

  // --- PRACTICE OF MEDICINE (4TH BHMS) ---
  "pm_respiratory_asthma": {
    id: "pm_respiratory_asthma",
    name: "Bronchial Asthma, COPD & Respiratory Therapeutics",
    subjectId: "practice",
    subjectName: "Practice of Medicine & Therapeutics (HomUG-PM)",
    year: "4th BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "Bronchial Asthma is a chronic inflammatory disorder of the airways characterized by recurrent episodes of wheezing, breathlessness, chest tightness, and coughing, associated with widespread, variable airflow obstruction that is often reversible either spontaneously or with treatment. The pathogenesis involves Th2-mediated inflammation, eosinophils, mast cell degranulation, bronchial hyperresponsiveness, and airway remodeling.",
    whyImportant: "One of the most common chronic diseases encountered in OPD; high-yield clinical long question in 4th BHMS Paper I.",
    coreConcepts: [
      "Pathophysiology: Allergen crosslinks IgE on mast cells -> release of histamine, leukotrienes (LTC4, LTD4), and cytokines -> bronchoconstriction, mucosal edema, hypersecretion -> late phase eosinophil infiltration.",
      "Diagnosis: Spirometry demonstrating FEV1/FVC < 0.70 with ≥12% and ≥200 mL increase in FEV1 post-bronchodilator; Peak Expiratory Flow (PEF) diurnal variability > 10%.",
      "Asthma vs. COPD Differentiation: Asthma (early onset, episodic, reversible obstruction, non-smokers, eosinophilic) vs. COPD (onset >40 yrs, progressive, irreversible, smoking history, neutrophilic).",
      "Status Asthmaticus: Severe acute refractory asthma unresponsive to standard bronchodilators, presenting with tachypnea, pulsus paradoxus, silent chest, and arterial blood gas hypoxemia."
    ],
    clinicalPearls: [
      "Homoeopathic Respiratory Therapeutics:",
      "Arsenicum Album: Asthma worse midnight (12–2 AM), cannot lie down, fear of suffocation, burning in chest better by warm sips, extreme restlessness and prostration.",
      "Natrum Sulphuricum: Hydrogenoid constitution, asthma worse in damp cold weather, early morning (4–5 AM), loose cough with rattling of mucus, must hold chest while coughing.",
      "Ipecacuanha: Continuous violent cough with nausea, chest rattling with loose mucus but no expectoration, clean uncoated tongue, dyspnea with constriction.",
      "Antimonium Tartaricum: Overwhelming accumulation of rattling mucus in bronchi, patient too weak to expectorate, drowsiness, cyanotic lips, better sitting erect.",
      "Blatta Orientalis: Specific clinical remedy for acute bronchospastic attacks, especially triggered by dust, dampness, and mold."
    ],
    examLAQs: [
      "Define Bronchial Asthma. Discuss its etiology, pathogenesis, clinical features, spirometric diagnosis, and differential diagnosis from COPD. Give the detailed homoeopathic management with indications of 4 core remedies. (10 Marks)"
    ],
    examSAQs: [
      "Differentiate between Bronchial Asthma and COPD (5 Marks)",
      "Clinical features and emergency triage in Status Asthmaticus (5 Marks)",
      "Compare the respiratory symptoms of Ipecac and Antimonium Tartaricum (5 Marks)"
    ],
    vivaQuestions: [
      "What is 'Silent Chest' in acute asthma and why is it a medical emergency?",
      "Which miasm is predominantly responsible for chronic recurring bronchial asthma? (Tubercular miasm = Psora + Syphilis)",
      "What are Curschmann spirals and Charcot-Leyden crystals in asthmatic sputum?"
    ],
    recommendedBooks: ["Davidson's Principles and Practice of Medicine", "Harrison's Internal Medicine", "Alok Sen Practice of Medicine"],
    studyHubLink: "/subject/practice-of-medicine",
    relatedRemedies: ["Arsenicum album", "Natrum sulph", "Ipecac", "Antimonium tart", "Blatta orientalis", "Medorrhinum"]
  },

  // --- REPERTORY (4TH BHMS) ---
  "rep_kent_structure": {
    id: "rep_kent_structure",
    name: "Kent's Repertory: Plan, Construction, 37 Chapters & Typographic Grading",
    subjectId: "repertory",
    subjectName: "Repertory & Repertorisation (HomUG-Rep)",
    year: "4th BHMS",
    competencyLevel: "Must Know",
    domain: "Cognitive",
    overview: "Dr. James Tyler Kent published his Repertory of the Homoeopathic Materia Medica in 1897, based on Hahnemann's deductive logic (General to Particular) and Swedenborg's philosophical hierarchy. It is structured into 37 anatomical and functional chapters arranged anatomico-physiologically from Head to Extremities (Mind -> Vertigo -> Head -> Eye ... -> Skin -> Generalities).",
    whyImportant: "The global benchmark repertory in homoeopathic practice; standard 10-mark essay in 4th BHMS Repertory examination.",
    coreConcepts: [
      "Deductive Method of Repertorisation: Reasoning from Generals (Mental Generals -> Physical Generals) down to Particulars.",
      "Layout of Rubric Indexing: General rubric -> Sub-rubric (Sides: Right, Left) -> Time modalities -> Environmental/Physical modalities -> Extending to.",
      "Typographical Gradation of Remedies:",
      "• Grade 3 (BOLD / 3 Marks): Verified by provers and repeatedly confirmed in clinical cures (e.g. ACONITE).",
      "• Grade 2 (ITALICS / 2 Marks): Confirmed by provers and verified in occasional cures (e.g. Aconite).",
      "• Grade 1 (ROMAN / 1 Mark): Proved on few provers, unconfirmed clinically (e.g. Aconite).",
      "The 37 Chapters: Begins with MIND (highest hierarchy) and ends with GENERALITIES (systemic modalities, foods, weather, sensations)."
    ],
    clinicalPearls: [
      "In repertorisation, symptoms must be valued according to Kent's Hierarchy: Mental Generals (Will, Emotions, Intellect) > Physical Generals (Thermals, Thirst, Cravings/Aversions, Menstrual) > Characteristics Particulars (Aphorism 153 PQRS).",
      "Never prescribe on a rubric count alone; verify the resulting repertorial synthesis against the Materia Medica drug picture."
    ],
    examLAQs: [
      "Discuss the plan, construction, philosophical background, and 37 chapters of Kent's Repertory. Explain the method of evaluation of symptoms and typographical grading of remedies. (10 Marks)"
    ],
    examSAQs: [
      "Explain the typographical gradation in Kent's Repertory with examples (5 Marks)",
      "Kent's concept of symptom hierarchy (General to Particular) (5 Marks)",
      "Mention the cross-references and arrangement of rubrics in Kent's 'Mind' chapter (5 Marks)"
    ],
    vivaQuestions: [
      "Which is the first and which is the last chapter in Kent's Repertory? (Mind is 1st, Generalities is 37th)",
      "What mathematical weight is given to Bold, Italic, and Roman types in Kent's rubric analysis? (3, 2, and 1)",
      "How are rubrics arranged under each chapter in Kent? (Alphabetical order with standardized sub-rubrics)"
    ],
    recommendedBooks: ["Kent's Repertory of Homoeopathic Materia Medica", "Tiwari's Essentials of Repertorization", "Munir Ahmed Repertory"],
    studyHubLink: "/subject/repertory",
    relatedRemedies: ["Sulphur", "Lycopodium", "Calcarea carb", "Nux vomica", "Pulsatilla"]
  }
};
