import { Link, useSearchParams } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  Activity, 
  Heart, 
  Search, 
  Filter, 
  Layers, 
  Award, 
  ShieldAlert, 
  FileText, 
  Stethoscope, 
  Scissors, 
  Baby, 
  BookMarked, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Flame,
  Brain,
  FlaskConical,
  Compass,
  Cpu
} from 'lucide-react';

export interface SubjectChapter {
  title: string;
  code?: string;
  tag?: string;
  link?: string;
}

export interface SubjectItem {
  id: string;
  code: string;
  title: string;
  year: '1st BHMS' | '2nd BHMS' | '3rd BHMS' | '4th BHMS';
  yearNumber: 1 | 2 | 3 | 4;
  category: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical' | 'Homoeopathic Core';
  badge: string;
  badgeColor: string;
  icon: any;
  iconBg: string;
  mainRoute: string;
  theoryHours?: number;
  practicalHours?: number;
  nonLectureHours?: number;
  hoursNote?: string;
  totalMarks: number;
  examPattern: string;
  summary: string;
  chapters: SubjectChapter[];
  highYieldTopics: string[];
}

export const allBhmsSubjects: SubjectItem[] = [
  // --- 1ST BHMS ---
  {
    id: 'anatomy',
    code: 'HomUG-Anat',
    title: 'Human Anatomy (Paper I & II)',
    year: '1st BHMS',
    yearNumber: 1,
    category: 'Pre-Clinical',
    badge: 'University Exam Subject (2 Papers)',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    icon: Activity,
    iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    mainRoute: '/subject/anatomy',
    theoryHours: 325,
    practicalHours: 325,
    totalMarks: 400,
    examPattern: 'Paper I (Upper Limb, Thorax, Head & Neck, Brain) + Paper II (Lower Limb, Abdomen, Pelvis, Histology, Embryology)',
    summary: 'Comprehensive regional and systemic anatomy with clinical correlations, surface marking, osteology, embryology, and histology.',
    chapters: [
      { title: 'General Anatomy & Osteology', tag: 'Core', link: '/subject/anatomy' },
      { title: 'Upper Limb (Brachial Plexus, Axilla, Cubital Fossa)', tag: 'Paper I', link: '/subject/anatomy' },
      { title: 'Thorax (Heart, Coronary Circulation, Lungs)', tag: 'Paper I', link: '/subject/anatomy' },
      { title: 'Head, Neck & Face (Cranial Nerves, Thyroid, Cavernous Sinus)', tag: 'Paper I', link: '/subject/anatomy' },
      { title: 'Neuroanatomy (Cerebrum, Cerebellum, Brainstem, Circle of Willis)', tag: 'Paper I', link: '/subject/anatomy' },
      { title: 'Abdomen & Pelvis (Inguinal Canal, Stomach, Liver, Peritoneum)', tag: 'Paper II', link: '/subject/anatomy' },
      { title: 'Lower Limb (Femoral Triangle, Popliteal Fossa, Sciatic Nerve)', tag: 'Paper II', link: '/subject/anatomy' },
      { title: 'General & Systemic Histology Slides', tag: 'Practical', link: '/subject/anatomy' },
      { title: 'General & Systemic Embryology', tag: 'Paper II', link: '/subject/anatomy' }
    ],
    highYieldTopics: [
      'Brachial Plexus formation, branches, and clinical palsy (Erb\'s, Klumpke\'s)',
      'Coronary circulation and internal structures of the Heart',
      'Cavernous Sinus anatomy, relations, and thrombosis',
      'Inguinal canal anatomy, boundaries, and hernia mechanics',
      'Microscopic structure of Liver, Kidney, Spleen, and Thyroid'
    ]
  },
  {
    id: 'physiology',
    code: 'HomUG-Physio',
    title: 'Physiology & Biochemistry (Paper I & II)',
    year: '1st BHMS',
    yearNumber: 1,
    category: 'Pre-Clinical',
    badge: 'University Exam Subject (2 Papers)',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
    icon: Heart,
    iconBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
    mainRoute: '/subject/physiology',
    theoryHours: 325,
    practicalHours: 325,
    totalMarks: 400,
    examPattern: 'Paper I (General, Blood, CVS, Respiration, Muscle-Nerve, GIT) + Paper II (Renal, Endocrine, Repro, CNS, Special Senses, Biochemistry)',
    summary: 'Detailed physiology of living human systems, vital organ loops, metabolic biochemistry, and dynamic homeostasis.',
    chapters: [
      { title: 'General Physiology & Biophysics', tag: 'Core', link: '/subject/physiology' },
      { title: 'Blood & Body Fluids (Erythropoiesis, Hemostasis, Blood Groups)', tag: 'Paper I', link: '/subject/physiology' },
      { title: 'Cardiovascular System (Cardiac Cycle, BP Regulation, ECG)', tag: 'Paper I', link: '/subject/physiology' },
      { title: 'Respiratory System (Gas Exchange, Transport, Regulation)', tag: 'Paper I', link: '/subject/physiology' },
      { title: 'Renal Physiology & Counter-Current Mechanism', tag: 'Paper II', link: '/subject/physiology' },
      { title: 'Endocrinology (Pituitary, Thyroid, Adrenal, Pancreas)', tag: 'Paper II', link: '/subject/physiology' },
      { title: 'Central Nervous System & Reflex Arc', tag: 'Paper II', link: '/subject/physiology' },
      { title: 'Medical Biochemistry (Glycolysis, Krebs Cycle, Vitamins)', tag: 'Biochemistry', link: '/subject/physiology' }
    ],
    highYieldTopics: [
      'Cardiac Output regulation and long-term Blood Pressure control',
      'Counter-Current Multiplier & Exchanger mechanism in urine concentration',
      'Thyroid hormone synthesis, transport, and feedback regulation',
      'Hemostasis cascade and intrinsic/extrinsic clotting pathways',
      'Biochemical pathways: Citric Acid Cycle, Gluconeogenesis, Beta-oxidation'
    ]
  },
  {
    id: 'pharmacy',
    code: 'HomUG-Pharm',
    title: 'Homoeopathic Pharmacy',
    year: '1st BHMS',
    yearNumber: 1,
    category: 'Homoeopathic Core',
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
    icon: FlaskConical,
    iconBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
    mainRoute: '/subject/pharmacy',
    theoryHours: 100,
    practicalHours: 100,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical & Viva Voce',
    summary: 'Science of identifying, collecting, preparing, preserving, potentizing, and standardizing homoeopathic medicines.',
    chapters: [
      { title: 'Sources of Homoeopathic Drugs (Vegetable, Animal, Mineral, Nosodes)', tag: 'Core', link: '/subject/pharmacy' },
      { title: 'Vehicles & Standards (Sugar of Milk, Alcohol, Globules)', tag: 'Paper I', link: '/subject/pharmacy' },
      { title: 'Potentization Scales (Decimal, Centesimal, 50-Millesimal LM)', tag: 'Key High-Yield', link: '/subject/pharmacy' },
      { title: 'Old & New Methods of Mother Tincture Preparation', tag: 'Paper I', link: '/subject/pharmacy' },
      { title: 'Homoeopathic Pharmacopoeias (HPI, HPUS, GHP, HAB)', tag: 'Official Rules', link: '/subject/pharmacy' },
      { title: 'Posology & Prescription Writing', tag: 'Clinical', link: '/subject/pharmacy' },
      { title: 'Drugs and Cosmetics Act & Good Manufacturing Practices (GMP)', tag: 'Legislation', link: '/subject/pharmacy' }
    ],
    highYieldTopics: [
      'Preparation of 50-Millesimal (LM) potencies according to Organon §270',
      'Comparison of Hahnemannian Old Method Classes (I-IX) vs. Modern Maceration/Percolation',
      'Sugar of Milk preparation, purification, and vehicle tests',
      'Trituration method for insoluble substances (3-stage process)',
      'Drugs and Cosmetics Act Schedule M1 guidelines for homoeopathic pharmacies'
    ]
  },
  {
    id: 'organon-1',
    code: 'HomUG-OM-I',
    title: 'Organon of Medicine & Philosophy - I',
    year: '1st BHMS',
    yearNumber: 1,
    category: 'Homoeopathic Core',
    badge: 'NCH CBDC — Foundations',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/organon/1st-bhms',
    theoryHours: 180,
    nonLectureHours: 100,
    hoursNote: 'Combined HomUG-OM-I: Organon 130/78 and Fundamentals of Psychology 50/22 lecture/non-lecture hours.'
    totalMarks: 100,
    examPattern: 'NCH HomUG-OM-I assessment; see the official CBDC and university notices for current examination details.',
    summary: 'History, logic, fundamental principles, health–disease–cure, the physician, drug proving, aphorisms §§1–27 and §§105–145, and Fundamentals of Psychology.',
    chapters: [
      { title: 'History of medicine, Homoeopathy and Hahnemann', tag: 'History', link: '/organon/1st-bhms' },
      { title: 'Homoeopathic stalwarts in India, Europe and the USA', tag: 'Stalwarts', link: '/organon/1st-bhms' },
      { title: 'Inductive and deductive logic; science and art in Homoeopathy', tag: 'Logic', link: '/organon/1st-bhms' },
      { title: 'Fundamental principles; individualistic, holistic and dynamic concepts', tag: 'Foundations', link: '/organon/1st-bhms' },
      { title: 'Aphorisms §§1–27', tag: 'Core aphorisms', link: '/organon/1st-bhms' },
      { title: 'Aphorisms §§105–145 and drug proving', tag: 'Drug proving', link: '/organon/1st-bhms' },
      { title: 'Physician: purpose, qualities, duties and knowledge', tag: 'Physician', link: '/organon/1st-bhms' },
      { title: 'Fundamentals of Psychology', tag: 'Psychology', link: '/organon/1st-bhms' }
    ],
    highYieldTopics: [
      'History of medicine and the development of Homoeopathy; Hahnemann’s life and contributions.',
      'Inductive and deductive logic; editions and construction of the Organon.',
      'Individualistic, holistic and dynamic concepts; life, health, disease and cure.',
      'Aphorisms §§1–27 and §§105–145; physician’s mission and drug-proving procedure.',
      'Psychological organisation, cognition, affect, conation, development and applied psychology.'
    ]
  },
  {
    id: 'materia-medica-1',
    code: 'HomUG-HMM-I',
    title: 'Homoeopathic Materia Medica - I',
    year: '1st BHMS',
    yearNumber: 1,
    category: 'Homoeopathic Core',
    badge: 'Foundations Subject',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300',
    icon: Sparkles,
    iconBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400',
    mainRoute: '/subject/materia-medica',
    theoryHours: 80,
    practicalHours: 40,
    totalMarks: 100,
    examPattern: 'Basic concepts, sources, proving methods, and first-year key remedies',
    summary: 'Study of medicinal agents and their therapeutic actions on healthy human beings, including fundamental remedy keynotes.',
    chapters: [
      { title: 'Introduction to Materia Medica & Sources', tag: 'Foundations', link: '/subject/materia-medica' },
      { title: 'Types of Materia Medica (Pure, Physiological, Keynote, Clinical)', tag: 'Types', link: '/subject/materia-medica' },
      { title: 'Constitutions, Diathesis, and Temperaments', tag: 'Concepts', link: '/subject/materia-medica' },
      { title: 'First-Year Mineral Remedies (Aconite, Arnica, Belladonna, Bryonia)', tag: 'Polychrests', link: '/subject/materia-medica' },
      { title: 'Modalities, Concomitants & Generalities', tag: 'Prescribing Keys', link: '/subject/materia-medica' }
    ],
    highYieldTopics: [
      'Aconitum Napellus in acute inflammatory fevers and panic states',
      'Arnica Montana trauma, contusions, and bruised soreness',
      'Belladonna hyperemic congestions, throbbing carotids, and fever state',
      'Bryonia Alba motion aggravation and dry mucous membranes',
      'Differentiation between Aconite, Belladonna, and Ferrum Phos in acute fevers'
    ]
  },

  // --- 2ND BHMS ---
  {
    id: 'pathology',
    code: 'HomUG-Path-M',
    title: 'Pathology & Microbiology (Paper I & II)',
    year: '2nd BHMS',
    yearNumber: 2,
    category: 'Para-Clinical',
    badge: 'University Exam Subject (2 Papers)',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300',
    icon: Microscope,
    iconBg: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400',
    mainRoute: '/subject/pathology',
    theoryHours: 200,
    practicalHours: 80,
    totalMarks: 400,
    examPattern: 'Paper I (General & Systemic Pathology) + Paper II (Microbiology, Parasitology, Mycology & Clinical Lab Medicine)',
    summary: 'Mechanisms of disease, cellular adaptations, necrosis, inflammation, neoplasia, microbiology, parasitology, hematology, and miasmatic correlations.',
    chapters: [
      { title: 'Cell Injury, Adaptations & Cell Death (Part 3 Master Chapter)', tag: '⭐ Master Chapter', link: '/subject/pathology/cell-injury' },
      { title: 'Acute & Chronic Inflammation (Vascular & Cellular Events)', tag: 'Paper I', link: '/subject/pathology' },
      { title: 'Tissue Healing, Repair & Scarring', tag: 'Paper I', link: '/subject/pathology' },
      { title: 'Hemodynamic Disorders, Shock, Edema & Thrombosis', tag: 'Paper I', link: '/subject/pathology' },
      { title: 'Neoplasia (Carcinogenesis, Oncogenes, TNM Staging)', tag: 'Paper I', link: '/subject/pathology' },
      { title: 'Systemic Pathology (CVS, RS, GIT, Renal, Liver, Blood)', tag: 'Paper I', link: '/subject/pathology' },
      { title: 'General Bacteriology, Staining & Culture Media', tag: 'Paper II', link: '/subject/pathology' },
      { title: 'Medical Parasitology (Malaria, Amoebiasis, Helminths)', tag: 'Paper II', link: '/subject/pathology' },
      { title: 'Clinical Hematology (CBC Hemogram Analyzer, LFT, RFT, Urine/Stool)', tag: 'Practical', link: '/subject/pathology' }
    ],
    highYieldTopics: [
      'Reversible vs. Irreversible Cell Injury, Mechanisms of ATP Depletion and ROS',
      'Types of Necrosis (Coagulative, Liquefactive, Caseous, Fat, Fibrinoid) vs. Apoptosis',
      'Vascular & Cellular events of Acute Inflammation and Chemical Mediators',
      'Malignant vs. Benign Neoplasm differences and Carcinogenesis pathways',
      'CBC Hemogram differential diagnosis (Microcytic Hypochromic Anemia, Leukemoid Reaction vs. Leukemia)'
    ]
  },
  {
    id: 'fmt',
    code: 'HomUG-FMT',
    title: 'Forensic Medicine & Toxicology (FMT)',
    year: '2nd BHMS',
    yearNumber: 2,
    category: 'Para-Clinical',
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
    icon: ShieldAlert,
    iconBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
    mainRoute: '/subject/forensic-medicine',
    theoryHours: 120,
    practicalHours: 50,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical & Viva Voce (Bhartiya Nyaya Sanhita 2023 aligned)',
    summary: 'Legal medicine, medical jurisprudence, thanatology, post-mortem changes, mechanical and firearm injuries, clinical toxicology, and homoeopathic antidotes.',
    chapters: [
      { title: 'Legal Procedures & Courts (BNS 2023, Inquest, Subpoena)', tag: 'Jurisprudence', link: '/subject/forensic-medicine' },
      { title: 'Medical Ethics, Negligence & Professional Misconduct', tag: 'Ethics', link: '/subject/forensic-medicine' },
      { title: 'Thanatology (Rigor Mortis, Lividity, Decomposition timeline)', tag: 'Post-Mortem', link: '/subject/forensic-medicine' },
      { title: 'Mechanical, Thermal & Firearm Injuries', tag: 'Traumatology', link: '/subject/forensic-medicine' },
      { title: 'Violent Asphyxial Deaths (Hanging, Strangulation, Drowning)', tag: 'Asphyxia', link: '/subject/forensic-medicine' },
      { title: 'Sexual Jurisprudence & Virginity/Rape Laws', tag: 'Forensics', link: '/subject/forensic-medicine' },
      { title: 'General & Clinical Toxicology (Arsenic, Lead, Snakebite, Plant Poisons)', tag: 'Toxicology', link: '/subject/forensic-medicine' },
      { title: 'Homoeopathic Antidotes & Forensic Therapeutics', tag: 'Homoeopathic Antidotes', link: '/subject/forensic-medicine' }
    ],
    highYieldTopics: [
      'Rigor Mortis vs. Cadaveric Spasm and post-mortem interval estimation',
      'Hanging vs. Strangulation differentiating clinical and autopsy features',
      'Medical Negligence (Res Ipsa Loquitur, Bolam Test, Professional Misconduct)',
      'Arsenic Poisoning: Acute vs. Chronic features and post-mortem findings',
      'Snakebite envenomation management, Vasotoxic vs. Neurotoxic venoms, and remedies (Lachesis, Naja, Crotalus)'
    ]
  },
  {
    id: 'materia-medica-2',
    code: 'HomUG-HMM-II',
    title: 'Homoeopathic Materia Medica - II',
    year: '2nd BHMS',
    yearNumber: 2,
    category: 'Homoeopathic Core',
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    icon: Sparkles,
    iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    mainRoute: '/subject/materia-medica',
    theoryHours: 120,
    practicalHours: 60,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical & Viva (48 Polychrest & Clinical Remedies)',
    summary: 'In-depth study of 48 major homoeopathic remedies with comparative pharmacology, thermal states, and clinical prescribing indications.',
    chapters: [
      { title: '48 Prescribed Polychrest Remedies (Acetic Acid to Veratrum Album)', tag: 'Syllabus Core', link: '/subject/materia-medica' },
      { title: 'Comparative Materia Medica in Gastrointestinal Disorders', tag: 'Comparative', link: '/subject/materia-medica' },
      { title: 'Comparative Materia Medica in Respiratory & Cardiac Affections', tag: 'Comparative', link: '/subject/materia-medica' },
      { title: 'Thermal Affinities (Hot vs. Chilly Remedies)', tag: 'Constitutional', link: '/subject/materia-medica' }
    ],
    highYieldTopics: [
      'Arsenicum Album keynote prostration, burning, midnight aggravation, and anxiety',
      'Lycopodium Clavatum right-to-left progression, 4-8 PM aggravation, and digestive weakness',
      'Pulsatilla Nigricans mild disposition, thirstlessness, open air relief, and wandering pains',
      'Sulphur morning diarrhea driving out of bed, standing aggravation, and burning palms/soles',
      'Comparative study: Bryonia vs. Rhus Tox in joint disorders, Nux Vomica vs. Pulsatilla in dyspepsia'
    ]
  },
  {
    id: 'organon-2',
    code: 'HomUG-OM-II',
    title: 'Organon of Medicine & Philosophy - II',
    year: '2nd BHMS',
    yearNumber: 2,
    category: 'Homoeopathic Core',
    badge: 'NCH CBDC — Disease and Case Taking',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/organon/2nd-bhms',
    theoryHours: 150,
    nonLectureHours: 100,
    totalMarks: 200,
    examPattern: 'NCH HomUG-OM-II course; consult the official CBDC for assessment details.',
    summary: 'Natural and artificial disease, therapeutic law, disease classification and miasms, case taking, symptomatology, case processing and suppression.',
    chapters: [
      { title: 'Natural disease vs artificial disease — §§28–33', tag: 'Disease', link: '/organon/2nd-bhms' },
      { title: 'Therapeutic law of nature — §§34–51', tag: 'Therapeutic law', link: '/organon/2nd-bhms' },
      { title: 'Various systems of medicine — §§52–70', tag: 'Systems', link: '/organon/2nd-bhms' },
      { title: 'Disease classification and introduction to miasms — §§71–82', tag: 'Classification', link: '/organon/2nd-bhms' },
      { title: 'Case taking — §§83–103', tag: 'Case taking', link: '/organon/2nd-bhms' },
      { title: 'Record keeping — §104', tag: 'Records', link: '/organon/2nd-bhms' },
      { title: 'Symptomatology, analysis, evaluation, totality and susceptibility', tag: 'Case processing', link: '/organon/2nd-bhms' },
      { title: 'Causation, anamnesis, disease progress and suppression', tag: 'Philosophy', link: '/organon/2nd-bhms' }
    ],
    highYieldTopics: [
      'Natural disease vs artificial disease (§§28–33) and therapeutic law of nature (§§34–51).',
      'Various systems of medicine (§§52–70).',
      'Hahnemannian classification of disease and introduction to miasms (§§71–82).',
      'Case taking (§§83–103) and record keeping (§104).',
      'Symptomatology, analysis, evaluation, totality, susceptibility, causation, anamnesis and suppression.'
    ]
  },

  // --- 3RD BHMS ---
  {
    id: 'surgery',
    code: 'HomUG-Surg',
    title: 'Surgery & Homoeopathic Therapeutics (Paper I & II)',
    year: '3rd BHMS',
    yearNumber: 3,
    category: 'Clinical',
    badge: 'University Exam Subject (2 Papers)',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300',
    icon: Scissors,
    iconBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400',
    mainRoute: '/subject/surgery',
    theoryHours: 150,
    practicalHours: 100,
    totalMarks: 400,
    examPattern: 'Paper I (General Surgery, Wounds, Shock, Burns, Infections, Pre/Post Op) + Paper II (Systemic Surgery, ENT, Ophthalmology, Orthopaedics, Dentistry)',
    summary: 'Principles of surgical diagnosis, acute abdomen, trauma, wound management, surgical sub-specialties, and peri-operative homoeopathic therapeutics.',
    chapters: [
      { title: 'Wound Healing, Ulcers, Sinus & Fistula', tag: 'Paper I', link: '/subject/surgery' },
      { title: 'Shock (Hypovolemic, Septic, Cardiogenic) & Hemorrhage', tag: 'Paper I', link: '/subject/surgery' },
      { title: 'Burns Management (Rule of Nines, Parkland Formula)', tag: 'Paper I', link: '/subject/surgery' },
      { title: 'Acute Abdomen & Appendicitis Differential Diagnosis', tag: 'Paper II', link: '/subject/surgery' },
      { title: 'Hernias (Inguinal, Femoral, Umbilical) & Surgical Repair', tag: 'Paper II', link: '/subject/surgery' },
      { title: 'Diseases of Ear, Nose & Throat (CSOM, ASOM, Sinusitis, Tonsillitis)', tag: 'ENT', link: '/subject/surgery' },
      { title: 'Ophthalmology (Cataract, Glaucoma, Trachoma, Corneal Ulcer)', tag: 'Eye', link: '/subject/surgery' },
      { title: 'Orthopaedics & Fractures (Healing stages, Complications)', tag: 'Ortho', link: '/subject/surgery' },
      { title: 'Surgical Homoeopathic Therapeutics (Arnica, Staph, Hypericum, Calendula)', tag: 'Therapeutics', link: '/subject/surgery' }
    ],
    highYieldTopics: [
      'Acute Appendicitis: Clinical signs (McBurney\'s, Rovsing\'s), Alvarado score, and remedies',
      'Burns assessment, Rule of Nines, fluid resuscitation, and cantharis/calendula therapeutics',
      'Wound healing stages and comparison of Arnica, Hypericum, Staphysagria, Calendula',
      'CSOM (Safe vs. Unsafe) clinical features, complications, and Silicea/Pulsatilla role',
      'Fracture classification, callus formation phases, and Symphytum/Calc Phos acceleration'
    ]
  },
  {
    id: 'gynecology-obstetrics',
    code: 'HomUG-OBG',
    title: 'Obstetrics & Gynecology (OBG) (Paper I & II)',
    year: '3rd BHMS',
    yearNumber: 3,
    category: 'Clinical',
    badge: 'University Exam Subject (2 Papers)',
    badgeColor: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300 border-pink-300',
    icon: Baby,
    iconBg: 'bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-400',
    mainRoute: '/subject/gynecology-obstetrics',
    theoryHours: 150,
    practicalHours: 100,
    totalMarks: 400,
    examPattern: 'Paper I (Obstetrics, Antenatal Care, Normal/Abnormal Labor, Newborn) + Paper II (Gynecology, Menstrual Disorders, Infertility, Oncology, Therapeutics)',
    summary: 'Clinical obstetrics, maternal-fetal medicine, labor mechanics, gynecological pathophysiology, endocrinology, and homoeopathic management.',
    chapters: [
      { title: 'Physiological Changes in Pregnancy & Antenatal Care', tag: 'Obstetrics', link: '/subject/gynecology-obstetrics' },
      { title: 'Normal Labor Mechanism (Stages I–IV) & Partogram Monitoring', tag: 'Labor', link: '/subject/gynecology-obstetrics' },
      { title: 'Hypertensive Disorders of Pregnancy (Preeclampsia & Eclampsia)', tag: 'High-Yield', link: '/subject/gynecology-obstetrics' },
      { title: 'Antepartum (APH) & Postpartum Hemorrhage (PPH)', tag: 'Emergencies', link: '/subject/gynecology-obstetrics' },
      { title: 'Abnormal Uterine Bleeding (AUB) & HPO Axis Dysregulation', tag: 'Gynecology', link: '/subject/gynecology-obstetrics' },
      { title: 'Polycystic Ovarian Syndrome (PCOS) & Endometriosis', tag: 'Gynecology', link: '/subject/gynecology-obstetrics' },
      { title: 'Pelvic Inflammatory Disease (PID) & Genital Infections', tag: 'Infections', link: '/subject/gynecology-obstetrics' },
      { title: 'Female & Male Infertility Workup & Management', tag: 'Infertility', link: '/subject/gynecology-obstetrics' },
      { title: 'Homoeopathic Therapeutics in OBG (Sepia, Pulsatilla, Sabina, Caulophyllum)', tag: 'Therapeutics', link: '/subject/gynecology-obstetrics' }
    ],
    highYieldTopics: [
      'Mechanism of Normal Labor in vertex presentation (Engagement to Expulsion)',
      'Postpartum Hemorrhage (4 Ts: Tone, Tissue, Trauma, Thrombin) management and Secale/Millefolium',
      'Preeclampsia diagnostic criteria, warning signs, and magnesium sulphate regimen',
      'PCOS Rotterdam diagnostic criteria, insulin resistance, and Sepia/Thuja/Pulsatilla therapeutics',
      'Threatened vs. Inevitable Abortion differentials and Sabina, Secale, Trillium management'
    ]
  },
  {
    id: 'materia-medica-3',
    code: 'HomUG-HMM-III',
    title: 'Homoeopathic Materia Medica - III',
    year: '3rd BHMS',
    yearNumber: 3,
    category: 'Homoeopathic Core',
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    icon: Sparkles,
    iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    mainRoute: '/subject/materia-medica',
    theoryHours: 100,
    practicalHours: 50,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical & Viva (Clinical remedies, nosodes, sarcodes)',
    summary: 'Clinical remedies, major nosodes, sarcodes, toxicological comparisons, and specialized surgical/obstetric prescribing matrices.',
    chapters: [
      { title: 'Major Nosodes (Tuberculinum, Medorrhinum, Syphilinum, Psorinum, Carcinosin)', tag: 'Nosodes', link: '/subject/materia-medica' },
      { title: 'Surgical Homoeopathic Remedies (Hypericum, Ledum, Symphytum, Ruta)', tag: 'Surgical', link: '/subject/materia-medica' },
      { title: 'Gynecological & Obstetric Remedies (Sepia, Sabina, Caulophyllum, Cimicifuga)', tag: 'OBG', link: '/subject/materia-medica' },
      { title: 'Comparative Drug Study in Respiratory & Renal Conditions', tag: 'Comparative', link: '/subject/materia-medica' }
    ],
    highYieldTopics: [
      'Psorinum vs. Sulphur in chronic cutaneous and psoric suppression',
      'Medorrhinum psychotic sycotic manifestations, nocturnal restlessness, knee-chest sleep position',
      'Syphilinum nocturnal bone pains, linear ulcers, and syphilitic degeneration',
      'Tuberculinum dynamic respiratory susceptibility, rapid emaciation, and changeability of symptoms',
      'Sepia pelvic bearing down, washerwoman aggravation, apathy, and menstrual disorders'
    ]
  },
  {
    id: 'organon-3',
    code: 'HomUG-OM-III',
    title: 'Organon of Medicine & Philosophy - III',
    year: '3rd BHMS',
    yearNumber: 3,
    category: 'Homoeopathic Core',
    badge: 'NCH CBDC — Advanced Organon',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/organon/3rd-bhms',
    theoryHours: 150,
    nonLectureHours: 50,
    totalMarks: 200,
    examPattern: 'NCH HomUG-OM-III course; consult the official CBDC for assessment details.',
    summary: 'Preface and introduction; §§146–209 and §§231–294; medicine action, disease management, follow-up, pharmacy, routes of administration, diet, regimen and chronic disease theory.',
    chapters: [
      { title: 'Hahnemann’s Preface and Introduction', tag: 'Introduction', link: '/organon/3rd-bhms' },
      { title: 'Actions of medicines and points necessary for cure — §§146–149', tag: 'Medicine action', link: '/organon/3rd-bhms' },
      { title: 'Acute, chronic, surgical, one-sided and epidemic disease — §§150–209', tag: 'Disease management', link: '/organon/3rd-bhms' },
      { title: 'Intermittent diseases — §§231–244', tag: 'Intermittent disease', link: '/organon/3rd-bhms' },
      { title: 'Repetition, follow-up and prejudice in prescription — §§245–258', tag: 'Follow-up', link: '/organon/3rd-bhms' },
      { title: 'Diet, regimen and auxiliary measures — §§259–263 and §§285–291', tag: 'Regimen', link: '/organon/3rd-bhms' },
      { title: 'Pharmacy, routes of administration and fundamental laws — §§264–285', tag: 'Pharmacy', link: '/organon/3rd-bhms' },
      { title: 'Susceptibility, palliation, suppression, remedy reaction and posology', tag: 'Philosophy', link: '/organon/3rd-bhms' },
      { title: 'Hahnemann’s Theory of Chronic Diseases and J. H. Allen’s chronic miasms', tag: 'Chronic disease', link: '/organon/3rd-bhms' }
    ],
    highYieldTopics: [
      'Prescribed sixth-edition content in §§146–209 and §§231–294, including footnotes.',
      'Actions of medicines; acute, chronic, surgical, one-sided and epidemic disease management.',
      'Repetition, follow-up, pharmacy, routes of administration, diet, regimen and auxiliary measures.',
      'Susceptibility, idiosyncrasy, palliation, suppression, remedy reaction, second prescription and posology.',
      'Hahnemann’s Theory of Chronic Diseases and J. H. Allen’s chronic miasms; revise earlier sections.'
    ]
  },

  // --- 4TH / FINAL BHMS ---
  {
    id: 'practice-of-medicine',
    code: 'HomUG-PM',
    title: 'Practice of Medicine & Homoeopathic Therapeutics (Paper I & II)',
    year: '4th BHMS',
    yearNumber: 4,
    category: 'Clinical',
    badge: 'University Exam Subject (2 Papers)',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    icon: Stethoscope,
    iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    mainRoute: '/subject/practice-of-medicine',
    theoryHours: 300,
    practicalHours: 200,
    totalMarks: 400,
    examPattern: 'Paper I (CVS, Respiratory, GIT, Hepatic, Renal, Hematology, Endocrine) + Paper II (Neurology, Rheumatology, Dermatology, Infectious, Pediatrics, Psychiatry)',
    summary: 'Clinical internal medicine, diagnostic criteria, differential diagnosis, systemic pathophysiology, and comprehensive homoeopathic therapeutic management.',
    chapters: [
      { title: 'Cardiovascular Diseases (Hypertension, IHD, Heart Failure, Rheumatic Fever)', tag: 'CVS', link: '/subject/practice-of-medicine' },
      { title: 'Respiratory Diseases (Asthma, COPD, Pneumonia, Tuberculosis, Pleural Effusion)', tag: 'RS', link: '/subject/practice-of-medicine' },
      { title: 'Gastrointestinal & Hepatobiliary (Peptic Ulcer, IBD, Cirrhosis, Pancreatitis)', tag: 'GIT', link: '/subject/practice-of-medicine' },
      { title: 'Renal Disorders (Nephrotic Syndrome, Acute/Chronic Kidney Disease, Stones)', tag: 'Renal', link: '/subject/practice-of-medicine' },
      { title: 'Endocrine & Metabolic (Diabetes Mellitus, Thyroiditis, Cushing\'s)', tag: 'Endocrine', link: '/subject/practice-of-medicine' },
      { title: 'Neurological Disorders (Stroke, Parkinsonism, Epilepsy, Meningitis, Neuropathy)', tag: 'CNS', link: '/subject/practice-of-medicine' },
      { title: 'Rheumatology & Autoimmune (Rheumatoid Arthritis, SLE, Gout, Ankylosing Spondylitis)', tag: 'Autoimmune', link: '/subject/practice-of-medicine' },
      { title: 'Infectious & Tropical Diseases (Typhoid, Dengue, Malaria, Tuberculosis)', tag: 'Infectious', link: '/subject/practice-of-medicine' },
      { title: 'Dermatology & Skin Lesions (Eczema, Psoriasis, Lichen Planus, Vitiligo)', tag: 'Skin', link: '/subject/practice-of-medicine' }
    ],
    highYieldTopics: [
      'Bronchial Asthma: Etiopathogenesis, acute attack management, chronic constitutional prescription',
      'Diabetes Mellitus: Diagnostic criteria, micro/macrovascular complications, and Syzygium/Uranium Nitricum',
      'Rheumatoid Arthritis: ARA criteria, differential from Osteoarthritis, and Rhus Tox, Bryonia, Causticum, Ledum',
      'Myocardial Infarction: ECG changes, cardiac biomarkers (Troponin I/T), and Cactus, Digitalis, Latrodectus, Crataegus',
      'Cirrhosis of Liver: Complications (Portal HTN, Ascites, Encephalopathy) and Chelidonium, Carduus Mar, Lycopodium'
    ]
  },
  {
    id: 'repertory',
    code: 'HomUG-Rep',
    title: 'Repertory & Repertorisation',
    year: '4th BHMS',
    yearNumber: 4,
    category: 'Homoeopathic Core',
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300',
    icon: Compass,
    iconBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
    mainRoute: '/subject/repertory',
    theoryHours: 100,
    practicalHours: 100,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical & Case Repertorisation',
    summary: 'Principles, construction, philosophical backgrounds, and practical repertorisation techniques of classical and computerized repertories.',
    chapters: [
      { title: 'Introduction, History & Evolution of Repertories', tag: 'History', link: '/subject/repertory' },
      { title: 'Kent\'s Repertory (Plan, Construction, 37 Chapters, Grading)', tag: 'Kent', link: '/subject/repertory' },
      { title: 'Boenninghausen\'s Therapeutic Pocket Book (TPB) & Doctrine of Analogy', tag: 'TPB', link: '/subject/repertory' },
      { title: 'Boger Boenninghausen\'s Characteristics and Repertory (BBCR)', tag: 'BBCR', link: '/subject/repertory' },
      { title: 'Card Repertories, Clinical & Regional Repertories (Boric, Bell, Boericke)', tag: 'Regional', link: '/subject/repertory' },
      { title: 'Modern Synthetic & Computer Software Repertories (RADAR, Complete, Synthesis)', tag: 'Software', link: '/subject/repertory' },
      { title: 'Case Taking, Analysis, Symptom Evaluation & Rubric Hunting', tag: 'Practical', link: '/subject/repertory' }
    ],
    highYieldTopics: [
      'Kent\'s Repertory structure, philosophical background, 37 chapters, and typographic grading (1, 2, 3)',
      'Boenninghausen\'s TPB philosophy: Complete Symptom, Concomitants, and Generalisation doctrine',
      'Boger\'s BBCR philosophy: Pathological general, tissue affinities, and diagnostic keynotes',
      'Methods of Repertorisation: Kentian (Deductive), Boenninghausen (Inductive), and Boger methods',
      'Aphorism 153 PQRS symptom hierarchy during repertorization and elimination rubrics'
    ]
  },
  {
    id: 'materia-medica-4',
    code: 'HomUG-HMM-IV',
    title: 'Homoeopathic Materia Medica - IV',
    year: '4th BHMS',
    yearNumber: 4,
    category: 'Homoeopathic Core',
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
    icon: Sparkles,
    iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    mainRoute: '/subject/materia-medica',
    theoryHours: 120,
    practicalHours: 80,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical & Viva (Advanced comparative & rare remedies)',
    summary: 'Advanced comparative materia medica, rare remedies, mother tinctures, pediatric & geriatric prescribing, and deep miasmatic constitutional study.',
    chapters: [
      { title: 'Advanced Polychrest & Rare Clinical Remedies', tag: 'Polychrests', link: '/subject/materia-medica' },
      { title: 'Comparative Materia Medica in Cardiovascular & Renal Failure', tag: 'Comparative', link: '/subject/materia-medica' },
      { title: 'Mother Tinctures & Low Potency Organ Affinities', tag: 'Tinctures', link: '/subject/materia-medica' },
      { title: 'Pediatric & Geriatric Remedy Prescribing Protocols', tag: 'Clinical', link: '/subject/materia-medica' }
    ],
    highYieldTopics: [
      'Lachesis Mutus keynotes, throat left-to-right progression, sleep aggravation, and septic conditions',
      'Aurum Metallicum suicidal depression, nocturnal bone pains, hypertension, and syphilitic miasm',
      'Plumbum Metallicum abdominal colics, wrist drop, sclerosis, and obstinate constipation',
      'Stramonium delirium, terror in dark, hydrophobia, and stammering speech',
      'Comparative study of snake venoms: Lachesis vs. Crotalus Horridus vs. Naja Tripudians vs. Bothrops'
    ]
  },
  {
    id: 'organon-4',
    code: 'HomUG-OM-IV',
    title: 'Organon of Medicine & Philosophy - IV',
    year: '4th BHMS',
    yearNumber: 4,
    category: 'Homoeopathic Core',
    badge: 'NCH CBDC — Final Professional Year',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/organon/4th-bhms',
    theoryHours: 100,
    nonLectureHours: 75,
    totalMarks: 200,
    examPattern: 'NCH HomUG-OM-IV: §§210–230 and structured revision; confirm the detailed local examination plan with faculty.',
    summary: 'Mental diseases §§210–230, complete course revision, case taking, symptomatology, value of symptoms, disease portrait, susceptibility, miasm, posology and remedy reaction.',
    chapters: [
      { title: 'Aphorisms §§210–230, including footnotes', tag: 'Core aphorisms', link: '/organon/4th-bhms' },
      { title: 'Revision of §§1–70, §§71–104 and §§105–145', tag: 'Revision', link: '/organon/4th-bhms' },
      { title: 'Revision of §§146–209 and §§231–294', tag: 'Revision', link: '/organon/4th-bhms' },
      { title: 'Case taking, symptomatology and value of symptoms', tag: 'Case analysis', link: '/organon/4th-bhms' },
      { title: 'Formation of the portrait of disease', tag: 'Disease portrait', link: '/organon/4th-bhms' },
      { title: 'Susceptibility, miasm, posology and remedy reaction', tag: 'Clinical integration', link: '/organon/4th-bhms' },
      { title: 'Prescribed chapters of Kent, Stuart Close and H. A. Roberts', tag: 'Philosophy texts', link: '/organon/4th-bhms' }
    ],
    highYieldTopics: [
      'Aphorisms §§210–230 and their footnotes.',
      'Revision of designated aphorism sections: §§1–70, §§71–104, §§105–145, §§146–209 and §§231–294.',
      'Case taking, symptomatology, value of symptoms and formation of the disease portrait.',
      'Susceptibility, miasm, posology and remedy reaction.',
      'Prescribed revision of Kent, Stuart Close and H. A. Roberts.'
    ]
  }
];
