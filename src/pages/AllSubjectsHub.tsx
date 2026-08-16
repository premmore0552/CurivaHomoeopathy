import React, { useState, useMemo, useEffect } from 'react';
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
import SEO from '../components/SEO';

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
  theoryHours: number;
  practicalHours: number;
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
    badge: 'Foundations Subject',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/subject/organon',
    theoryHours: 80,
    practicalHours: 40,
    totalMarks: 100,
    examPattern: 'Foundational Aphorisms §1–70, Pioneer History, and Basic Principles',
    summary: 'The scientific and philosophical basis of homoeopathic medicine, Vital Principle, Similia principle, and disease dynamics.',
    chapters: [
      { title: 'Life of Dr. Samuel Hahnemann & Discovery of Homoeopathy', tag: 'Historical', link: '/subject/organon' },
      { title: 'Cinchona Bark Experiment (1790)', tag: 'Discovery', link: '/subject/organon' },
      { title: 'Aphorisms §1–§4: Physician\'s Mission, Highest Ideal of Cure', tag: 'Core §1-4', link: '/subject/organon' },
      { title: 'Aphorisms §9–§17: Vital Principle in Health, Disease & Cure', tag: 'Vital Force', link: '/subject/organon' },
      { title: 'Aphorisms §26–§34: Therapeutic Law of Nature', tag: 'Law of Similars', link: '/subject/organon' },
      { title: 'Aphorisms §52–§70: Systems of Medicine (Allopathy, Enantiopathy, Homoeopathy)', tag: 'Systems', link: '/subject/organon' }
    ],
    highYieldTopics: [
      'Aphorism 1: The physician\'s mission and meaning of \'To Cure\'',
      'Aphorism 9: Dynamic Vital Force operating in health',
      'Aphorism 26: Therapeutic Law of Nature and its scientific explanation',
      'Primary vs. Secondary Action of medicines on Vital Force (§59–63)',
      'Difference between Homoeopathy, Antipathy, and Isopathy'
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
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/subject/organon',
    theoryHours: 120,
    practicalHours: 60,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical/Viva (Aphorisms §71–145 & Chronic Miasms)',
    summary: 'Classification of diseases, theory of chronic miasms (Psora, Sycosis, Syphilis), and systematic Hahnemannian case-taking (§83–104).',
    chapters: [
      { title: 'Aphorisms §71–§82: Classification of Acute & Chronic Diseases', tag: 'Classification', link: '/subject/organon' },
      { title: 'Theory of Chronic Miasms: Psora, Sycosis, and Syphilis', tag: 'Miasms', link: '/subject/organon' },
      { title: 'Aphorisms §83–§104: Hahnemannian Case Taking Principles', tag: 'Case Taking', link: '/subject/organon' },
      { title: 'Aphorisms §105–§145: Drug Proving on Healthy Provers', tag: 'Drug Proving', link: '/subject/organon' },
      { title: 'Symptomatology, Analysis, Evaluation & Totality Construction', tag: 'Methodology', link: '/subject/organon' }
    ],
    highYieldTopics: [
      'Hahnemannian Classification of Diseases (Acute: Individual, Sporadic, Epidemic; Chronic: Pseudo-chronic, Artificial, True Chronic)',
      'The Fundamental Nature and manifestations of Psora according to Chronic Diseases',
      'Case Taking requirements for an unprejudiced observer (§83–104)',
      'Qualifications, diet, and method of proving drugs on healthy human beings (§105–145)',
      'Evaluation of symptoms according to Kent, Boenninghausen, and Hahnemann'
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
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/subject/organon',
    theoryHours: 100,
    practicalHours: 50,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical/Viva (Aphorisms §146–294 & Advanced Philosophy)',
    summary: 'Advanced case management, posology, repetition of doses, intermittent and one-sided diseases, and Hahnemannian second prescription rules.',
    chapters: [
      { title: 'Aphorisms §146–§184: Indisposition, Acute Diseases & One-Sided Affections', tag: 'One-Sided', link: '/subject/organon' },
      { title: 'Aphorisms §185–§209: Local Maladies & Mental Diseases', tag: 'Mental Diseases', link: '/subject/organon' },
      { title: 'Aphorisms §210–§244: Intermittent & Alternating Fevers', tag: 'Fevers', link: '/subject/organon' },
      { title: 'Aphorisms §245–§285: Posology, Repetition of Doses & LM Potencies', tag: 'Posology', link: '/subject/organon' },
      { title: 'Aphorisms §286–§294: Mesmerism, Magnetism, Baths & Ancillary Measures', tag: 'Ancillary', link: '/subject/organon' }
    ],
    highYieldTopics: [
      'Treatment of Mental Diseases according to Hahnemann (§210–230)',
      'Management of Local Maladies and danger of external topical suppression (§185–203)',
      'Posology and repetition of doses in acute vs. chronic diseases (§245–248)',
      'Intermittent Fevers prescription timing (during apyrexia vs. paroxysm §235–244)',
      'Preparation, administration, and advantages of 50-Millesimal LM Potencies (§270–272)'
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
    badge: 'University Exam Subject (1 Paper)',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
    icon: BookOpen,
    iconBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400',
    mainRoute: '/subject/organon',
    theoryHours: 100,
    practicalHours: 60,
    totalMarks: 200,
    examPattern: '100 Marks Theory + 100 Marks Practical/Viva (Kent\'s, Close\'s, Roberts\' Philosophy)',
    summary: 'Critical analysis of homoeopathic stalwarts: Kent\'s 12 Observations, Stuart Close\'s Genius of Homoeopathy, and H.A. Roberts\' Principles of Art of Cure.',
    chapters: [
      { title: 'Dr. J.T. Kent\'s Lectures on Homoeopathic Philosophy & 12 Observations', tag: 'Kent\'s 12', link: '/subject/organon' },
      { title: 'Stuart Close\'s The Genius of Homoeopathy (General Pathology, Drug Potential)', tag: 'Stuart Close', link: '/subject/organon' },
      { title: 'H.A. Roberts\' Principles and Art of Cure by Homoeopathy', tag: 'Roberts', link: '/subject/organon' },
      { title: 'Miasmatic Cleavage in Complex Multi-Miasmatic Pathology', tag: 'Miasms', link: '/subject/organon' },
      { title: 'Second Prescription Rules & Prognosis Evaluation', tag: 'Prognosis', link: '/subject/organon' }
    ],
    highYieldTopics: [
      'Kent\'s 12 Observations on remedy action (Aggr. followed by quick recovery, Prolonged aggr. then decline, etc.)',
      'Stuart Close: Susceptibility, Reaction, and Immunity dynamics in Homoeopathy',
      'H.A. Roberts: Deficient reaction and constitutional remedy selection in incurable states',
      'The Second Prescription: Repetition of same remedy, change of remedy, antidote, or complementary',
      'Hering\'s Law of Cure: From above downwards, inside outwards, more vital to less vital organ, and reverse order of appearance'
    ]
  }
];

export default function AllSubjectsHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearParam = searchParams.get('year');

  const [selectedYear, setSelectedYear] = useState<'All' | '1st BHMS' | '2nd BHMS' | '3rd BHMS' | '4th BHMS'>(() => {
    if (yearParam && ['1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'].includes(yearParam)) {
      return yearParam as any;
    }
    return 'All';
  });

  useEffect(() => {
    if (yearParam && ['1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'].includes(yearParam)) {
      setSelectedYear(yearParam as any);
    } else if (!yearParam && selectedYear !== 'All') {
      // Keep selectedYear or reset if empty
    }
  }, [yearParam]);

  const handleYearChange = (year: 'All' | '1st BHMS' | '2nd BHMS' | '3rd BHMS' | '4th BHMS') => {
    setSelectedYear(year);
    if (year === 'All') {
      searchParams.delete('year');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), year });
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Pre-Clinical' | 'Para-Clinical' | 'Clinical' | 'Homoeopathic Core'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  const filteredSubjects = useMemo(() => {
    return allBhmsSubjects.filter(sub => {
      const matchesYear = selectedYear === 'All' || sub.year === selectedYear;
      const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        sub.title.toLowerCase().includes(q) ||
        sub.code.toLowerCase().includes(q) ||
        sub.summary.toLowerCase().includes(q) ||
        sub.chapters.some(ch => ch.title.toLowerCase().includes(q)) ||
        sub.highYieldTopics.some(t => t.toLowerCase().includes(q));

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [selectedYear, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEO 
        title="BHMS Subject Directory & Study Center (1st, 2nd, 3rd, 4th Year) | Curiva Homoeopathy"
        description="Master index of all 1st, 2nd, 3rd, and 4th BHMS subjects, chapters, NCH CBDC syllabus maps, high-yield exam notes, flashcards, MCQs, and clinical correlations."
      />

      {/* Top Breadcrumb & Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">BHMS Subject Directory &amp; Study Center</span>
        </div>

        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              NCH Competency-Based Curriculum (CBDC)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              All BHMS Subjects &amp; Study Center
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Explore the complete 4.5-year BHMS academic curriculum organized strictly by Professional Year (1st, 2nd, 3rd, and 4th BHMS). Access full subject textbooks, core chapters, university blueprints, active recall flashcards, and 5,000+ AIAPGET practice questions in one unified place.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards to Dedicated Study Suites */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Link
          to="/university-blueprints"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-xl">
              <FileText className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              University Blueprints
            </h3>
            <p className="text-[11px] text-text-tertiary">Solved PYQs &amp; Model LAQ/SAQs</p>
          </div>
        </Link>

        <Link
          to="/flashcards"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-xl">
              <Layers className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              100+ Flashcards
            </h3>
            <p className="text-[11px] text-text-tertiary">Active Recall &amp; 3D Flip System</p>
          </div>
        </Link>

        <Link
          to="/aiapget-mcq-simulator"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              5000+ AIAPGET MCQs
            </h3>
            <p className="text-[11px] text-text-tertiary">Sandbox &amp; Timed Exam Modes</p>
          </div>
        </Link>

        <Link
          to="/clinical-therapeutics"
          className="p-4 rounded-2xl bg-bg-secondary border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-xl">
              <Stethoscope className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              Clinical Therapeutics
            </h3>
            <p className="text-[11px] text-text-tertiary">Bedside Remedy Protocols</p>
          </div>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-5 space-y-4 shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, chapters, topics (e.g., 'Cell Injury', 'Brachial Plexus', 'Aphorism 153', 'Inguinal Hernia')..."
            className="w-full pl-11 pr-4 py-3 bg-bg-primary rounded-2xl border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-text-primary placeholder:text-text-tertiary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary hover:text-text-primary px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Year Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">Year:</span>
          {(['All', '1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'] as const).map((yr) => (
            <button
              key={yr}
              onClick={() => handleYearChange(yr)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedYear === yr
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/60">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">Category:</span>
          {(['All', 'Pre-Clinical', 'Para-Clinical', 'Clinical', 'Homoeopathic Core'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-text-primary text-bg-primary shadow-sm'
                  : 'bg-bg-primary text-text-tertiary hover:text-text-primary border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary flex items-center gap-2">
          <span>Curriculum Subject Matrix</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'Subject' : 'Subjects'} Found
          </span>
        </h2>
        <div className="text-xs text-text-tertiary hidden sm:block">
          Showing {selectedYear} • {selectedCategory}
        </div>
      </div>

      {/* Subjects Grid & Detailed Cards */}
      <div className="space-y-6">
        {filteredSubjects.map((sub) => {
          const SubIcon = sub.icon;
          const isExpanded = expandedSubjectId === sub.id;

          return (
            <div
              key={sub.id}
              className="bg-bg-secondary border border-border rounded-3xl p-5 sm:p-7 space-y-5 hover:border-primary/30 transition-all shadow-sm"
            >
              {/* Top Header of the Subject Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl ${sub.iconBg} shrink-0`}>
                    <SubIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                        {sub.code}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${sub.badgeColor}`}>
                        {sub.year}
                      </span>
                      <span className="text-[11px] font-bold text-text-tertiary px-2 py-0.5 bg-bg-primary rounded-md border border-border">
                        {sub.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-text-primary">
                      {sub.title}
                    </h3>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={sub.mainRoute}
                    className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Open Subject Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                    className="px-3 py-2.5 rounded-xl bg-bg-primary text-text-secondary hover:text-text-primary border border-border text-xs font-bold transition-all"
                  >
                    {isExpanded ? 'Hide Chapters' : 'View Chapters & Topics'}
                  </button>
                </div>
              </div>

              {/* Subject Info & Summary */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {sub.summary}
              </p>

              {/* Exam & Hours Metadata Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3.5 bg-bg-primary rounded-2xl border border-border text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Total Marks</span>
                  <span className="font-bold text-text-primary">{sub.totalMarks} Marks</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Theory Hours</span>
                  <span className="font-bold text-text-primary">{sub.theoryHours} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Practical Hours</span>
                  <span className="font-bold text-text-primary">{sub.practicalHours} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">Exam Pattern</span>
                  <span className="font-bold text-text-primary truncate block" title={sub.examPattern}>{sub.examPattern}</span>
                </div>
              </div>

              {/* Spotlight: Cell Injury if Pathology */}
              {sub.id === 'pathology' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-slate-900 text-white border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Flagship Digital Chapter Active</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Cell Injury, Cellular Adaptations &amp; Cell Death Master Suite
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      8-part textbook, 15 flowcharts, 10 comparison tables, 10 clinical vignettes, and spotter keys.
                    </p>
                  </div>
                  <Link
                    to="/subject/pathology/cell-injury"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shrink-0 transition-all flex items-center gap-1"
                  >
                    Open Master Chapter <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Expandable Chapters & High-Yield Topics */}
              {isExpanded && (
                <div className="pt-2 space-y-4 border-t border-border animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">
                      Core Syllabus Chapters &amp; Units
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {sub.chapters.map((ch, chIdx) => (
                        <div
                          key={chIdx}
                          className="p-3 bg-bg-primary rounded-xl border border-border flex items-center justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs font-medium text-text-primary leading-tight">
                              {ch.title}
                            </span>
                          </div>
                          {ch.tag && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-bg-secondary text-text-tertiary border border-border shrink-0">
                              {ch.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
                      High-Yield University Topics (LAQ &amp; SAQ Focus)
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                      {sub.highYieldTopics.map((top, topIdx) => (
                        <li key={topIdx} className="flex items-start gap-2 bg-bg-primary p-2.5 rounded-xl border border-border/60">
                          <span className="text-primary font-bold">•</span>
                          <span className="leading-relaxed">{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSubjects.length === 0 && (
          <div className="p-12 text-center bg-bg-secondary rounded-3xl border border-border space-y-3">
            <Search className="w-8 h-8 text-text-tertiary mx-auto opacity-50" />
            <h3 className="text-base font-bold text-text-primary">No subjects found</h3>
            <p className="text-xs text-text-secondary">
              Try adjusting your year, category, or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedYear('All');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Curriculum Standards Notice */}
      <div className="p-6 rounded-3xl bg-bg-secondary border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <BookMarked className="w-4 h-4" />
          <span>Curiva Curriculum Alignment Standard</span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Every subject on Curiva is structured according to the latest Competency-Based Dynamic Curriculum (CBDC) framed by the National Commission for Homoeopathy (NCH). High-yield exam notes, 10-mark essay blueprints, spotter slides, and viva questions are continuously updated and verified against standard medical textbooks (Gray\'s, Guyton, Robbins, Parikh) and homoeopathic authorities (Hahnemann, Kent, Boericke, Allen, Boger).
        </p>
      </div>
    </div>
  );
}
