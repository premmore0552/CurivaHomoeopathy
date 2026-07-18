import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Brain, 
  Heart, 
  Wind, 
  Stethoscope, 
  RotateCcw, 
  Dna, 
  ShieldAlert, 
  Flame, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  Award,
  HelpCircle,
  X,
  Layers,
  GraduationCap
} from 'lucide-react';
import SEO from '../components/SEO';
import { clinicalConditions, ClinicalCondition } from '../data/clinicalHandbookData';

// System Category Metadata
const systemMeta = {
  "Metabolic & Endocrine": { icon: Flame, color: "text-amber-500", bg: "bg-amber-50" },
  "Cardiovascular": { icon: Heart, color: "text-red-500", bg: "bg-red-50" },
  "Respiratory": { icon: Wind, color: "text-sky-500", bg: "bg-sky-50" },
  "Infectious Diseases": { icon: Dna, color: "text-emerald-500", bg: "bg-emerald-50" },
  "Renal": { icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
  "Musculoskeletal": { icon: Stethoscope, color: "text-indigo-500", bg: "bg-indigo-50" },
  "Neurological": { icon: Brain, color: "text-pink-500", bg: "bg-pink-50" }
};

// Simple Layperson Explanation Dictionary for Abbreviations
const ABBREVIATIONS_DICT: Record<string, string> = {
  // metabolic
  "HbA1c": "A blood test showing your average blood sugar levels over the past 3 months.",
  "DKA": "Diabetic Ketoacidosis - a serious, life-threatening complication of very high blood sugar where the body produces dangerous acids called ketones.",
  "HHS": "Hyperosmolar Hyperglycemic State - extremely high blood sugar levels causing severe, life-threatening dehydration.",
  "ADA": "American Diabetes Association - the international authority that establishes diabetes diagnostic guidelines.",
  "FPG": "Fasting Plasma Glucose - blood sugar levels measured after not eating for at least 8 hours.",
  "PPG": "Post-Prandial Glucose - blood sugar levels measured exactly 2 hours after a meal.",
  "OGTT": "Oral Glucose Tolerance Test - a diagnostic test where blood sugar is checked before and after drinking a highly sweet glucose liquid.",
  "FBG": "Fasting Blood Glucose - a key check of blood sugar after not eating overnight.",
  "PPBG": "Post-Prandial Blood Glucose - blood sugar levels measured exactly 2 hours after eating.",
  "TC": "Total Cholesterol - the combined amount of all types of cholesterol in your bloodstream.",
  "LDL": "Low-Density Lipoprotein - often called 'bad' cholesterol; it can build up inside your blood vessels and cause blockages.",
  "HDL": "High-Density Lipoprotein - known as 'good' cholesterol; it helps clear unhealthy fats from your blood vessels.",
  "MNT": "Medical Nutrition Therapy - a personalized, evidence-based meal and diet plan prescribed by a dietitian.",
  "ORS": "Oral Rehydration Salts - a specialized powder mixture of salts and sugars dissolved in water to treat dehydration.",
  "ORT": "Oral Rehydration Therapy - the highly effective process of drinking balanced fluids to recover from severe fluid loss.",
  
  // cardiac / circulatory
  "CAD": "Coronary Artery Disease - the narrowing or blockage of the main blood vessels that supply the heart muscle.",
  "PAD": "Peripheral Artery Disease - narrowed blood vessels in the limbs (usually legs) that significantly reduce healthy blood flow.",
  "ACC/AHA": "American College of Cardiology / American Heart Association - the top medical panels that establish heart health guidelines.",
  "BP": "Blood Pressure - the measurement of the force of blood pushing against the walls of your arteries.",
  "JNC-8": "Joint National Committee 8 - the official standard guidelines for treating and managing high blood pressure.",
  "ABPM": "Ambulatory Blood Pressure Monitoring - a lightweight, wearable device that automatically tracks blood pressure throughout a 24-hour day.",
  "ECG": "Electrocardiogram - a quick, painless test that records the electrical signals and rhythm of your heart.",
  "LVH": "Left Ventricular Hypertrophy - enlargement and thickening of the heart's main pumping chamber, usually caused by working too hard against high blood pressure.",
  "HTN": "Hypertension - the medical term for persistent, chronic high blood pressure.",
  "CHF": "Congestive Heart Failure - a chronic condition where the heart muscle loses its strength and cannot pump blood as well as it should.",
  "TIA": "Transient Ischemic Attack - a temporary 'mini-stroke' caused by a brief blockage of blood flow to the brain; a major warning sign.",
  
  // respiratory
  "GINA": "Global Initiative for Asthma - the leading international network that defines global asthma diagnosis and treatment standards.",
  "FEV1": "Forced Expiratory Volume in 1 second - a breath test measuring the maximum amount of air you can forcefully blow out of your lungs in one single second.",
  "FVC": "Forced Vital Capacity - the maximum volume of air you can completely exhale after taking the deepest breath possible.",
  "PEF": "Peak Expiratory Flow - a measurement of the maximum speed at which you can blow air out of your lungs.",
  "FeNO": "Fractional Exhaled Nitric Oxide - a specialized breath test that measures airway inflammation, useful in tracking asthma control.",
  "IgE": "Immunoglobulin E - a type of antibody produced by your immune system that reacts strongly to allergic triggers.",
  "BNP": "Brain Natriuretic Peptide - a blood test marker that rises significantly when the heart muscle is stretched or struggling with failure.",
  "TB": "Tuberculosis - a highly contagious bacterial infection that primarily attacks the lungs but can spread to other organs.",
  "MTB": "Mycobacterium tuberculosis - the specific, slow-growing family of bacteria that is responsible for causing Tuberculosis.",
  "RIF": "Rifampicin - one of the most powerful primary antibiotics used in combination therapy to cure Tuberculosis.",
  "TST": "Tuberculin Skin Test - a small skin injection test (Mantoux) used to determine if a person has ever been exposed to Tuberculosis.",
  "MDR-TB": "Multi-Drug Resistant Tuberculosis - a dangerous strain of Tuberculosis bacteria that has mutated to resist standard first-line antibiotic treatments.",
  "DOTS": "Directly Observed Therapy Short-course - a successful public health program where a healthcare worker directly watches the patient swallow every dose of medication.",
  "GOLD": "Global Initiative for Chronic Obstructive Lung Disease - the international body that sets medical standards for diagnosing and managing COPD.",
  "COPD": "Chronic Obstructive Pulmonary Disease - a chronic, progressive lung disease that damages airways and air sacs, usually caused by long-term smoking or smoke exposure.",
  "ABG": "Arterial Blood Gas - a highly precise blood test drawn from an artery to measure exact oxygen levels, carbon dioxide levels, and blood acidity.",
  "HRCT": "High-Resolution Computed Tomography - a highly detailed, sharp 3D lung scan that visualizes fine tissue structures better than standard chest x-rays.",
  "AAT": "Alpha-1 Antitrypsin - a protective protein made by the liver that shields lungs from damage; a lack of this protein causes early lung breakdown.",
  "CAP": "Community-Acquired Pneumonia - a bacterial or viral lung infection contracted during regular, daily life outside of a hospital setting.",
  "HAP": "Hospital-Acquired Pneumonia - a lung infection that develops at least 48 hours after being admitted to a hospital, often more resistant to treatments.",
  "ICU": "Intensive Care Unit - a highly specialized hospital ward designed for constant, 24-hour monitoring and treatment of critically ill patients.",
  
  // infectious / diagnostic
  "CBC": "Complete Blood Count - a fundamental blood test that measures your oxygen carriers (red cells), infection fighters (white cells), and clotting cells (platelets).",
  "WBC": "White Blood Cell - the key cells of your immune system that actively fight off infections and foreign invaders.",
  "CRP": "C-Reactive Protein - a blood marker that rises sharply in response to active, physical inflammation anywhere in your body.",
  "ARDS": "Acute Respiratory Distress Syndrome - a severe, life-threatening condition where extensive fluid leaks into the lungs' air sacs, preventing oxygen from entering the blood.",
  "NS1": "Non-Structural Protein 1 - a specific viral protein that can be detected in blood during the first 5 days of a Dengue infection to confirm the disease.",
  "DENV": "Dengue Virus - the mosquito-borne virus responsible for causing Dengue fever.",
  "AST": "Aspartate Aminotransferase - a key liver enzyme that spills into the blood when liver cells are irritated or damaged.",
  "ALT": "Alanine Aminotransferase - a highly specific liver enzyme measured in blood to assess liver cell damage or health.",
  "ELISA": "Enzyme-Linked Immunosorbent Assay - a highly sensitive laboratory test used to detect specific antibodies or proteins in a blood sample.",
  "APTT": "Activated Partial Thromboplastin Time - a laboratory blood test that measures the exact number of seconds it takes for your blood to form a clot.",
  "ADE": "Antibody-Dependent Enhancement - a phenomenon where antibodies from a previous virus infection actually help a new strain of the virus enter cells, making the second infection much more severe.",
  "DIC": "Disseminated Intravascular Coagulation - a dangerous condition where tiny blood clots form throughout the body, blocking blood flow and exhausting the body's clotting cells, leading to severe bleeding.",
  "DSS": "Dengue Shock Syndrome - a dangerous progression of Dengue where massive fluid leakage from blood vessels causes a fatal drop in blood pressure.",
  "NSAIDs": "Non-Steroidal Anti-Inflammatory Drugs - common pain relief medications (like Ibuprofen or Aspirin) that can thin blood and increase bleeding risks during viral fevers.",
  
  // neuro & renal
  "CVA": "Cerebrovascular Accident - the formal medical term for a stroke, which occurs when blood flow to a part of the brain is suddenly cut off.",
  "CT": "Computed Tomography - a advanced 3D scan compiled from multiple X-ray angles to show clear cross-sections of organs and tissues.",
  "MRI": "Magnetic Resonance Imaging - a highly detailed scan using powerful magnetic fields and radio waves to create sharp pictures of soft tissues like the brain.",
  "DWI": "Diffusion-Weighted Imaging - an ultra-fast, advanced MRI scanning technique that can detect the exact location of a brain stroke within minutes of starting.",
  "TTE/TEE": "Transthoracic / Transesophageal Echocardiogram - specialized ultrasound scans that create live videos of the heart's chambers and valves to check for blood clots.",
  "INR": "International Normalized Ratio - a standardized world measurement of how slowly or quickly your blood clots, used to safely monitor blood thinners.",
  "tPA": "Tissue Plasminogen Activator - an emergency clot-busting medicine injected into veins to dissolve the blood clots causing a stroke.",
  "AF": "Atrial Fibrillation - an irregular, rapid, and chaotic heartbeat that can cause blood to pool and form dangerous clots inside the heart.",
  "DVT": "Deep Vein Thrombosis - a serious condition where a blood clot forms in a deep vein, typically deep inside the leg muscle.",
  "AKI": "Acute Kidney Injury - a sudden, rapid drop in kidney function occurring over hours or days, causing toxic wastes to build up in the body.",
  "GFR": "Glomerular Filtration Rate - the absolute measurement of the speed at which your kidneys filter and clean wastes from your blood stream.",
  "eGFR": "Estimated Glomerular Filtration Rate - a standard calculated score indicating how well your kidneys are filtering and cleaning your blood.",
  "BPH": "Benign Prostatic Hyperplasia - a non-cancerous, age-related enlargement of the prostate gland that can compress the urinary tract and block urine flow.",
  "BUN": "Blood Urea Nitrogen - a waste product in the blood that is normally cleared by the kidneys; elevated levels point to underperforming kidneys.",
  "ATN": "Acute Tubular Necrosis - physical damage to the tiny filtering tubes of the kidneys, usually caused by lack of blood flow or toxic medications.",
  "RBC": "Red Blood Cell - the highly specialized blood cells that bind oxygen in the lungs and carry it to every tissue in your body.",
  
  // musculoskeletal
  "PIP": "Proximal Interphalangeal - the middle knuckle joints of your fingers.",
  "MCP": "Metacarpophalangeal - the large knuckles of your hand where your fingers attach.",
  "MTP": "Metatarsophalangeal - the joint knuckles at the base of your toes connecting them to your foot.",
  "DIP": "Distal Interphalangeal - the small joints of your fingers closest to your fingernails.",
  "RF": "Rheumatoid Factor - an autoantibody often found circulating in the blood of individuals suffering from Rheumatoid Arthritis.",
  "ACPA": "Anti-Citrullinated Protein Antibodies - highly specific immune particles measured in blood to accurately confirm Rheumatoid Arthritis.",
  "ESR": "Erythrocyte Sedimentation Rate - a simple blood test that measures general physical inflammation by tracking how fast red cells settle.",
  "RA": "Rheumatoid Arthritis - an autoimmune disease where the body's immune system accidentally attacks the lining of joints, causing severe swelling.",
  "OA": "Osteoarthritis - a common wear-and-tear joint condition where the protective cartilage cushioning the ends of bones slowly wears down over time.",
  "MMPs": "Matrix Metalloproteinases - powerful body enzymes that can accidentally eat away and degrade joint cartilage when overactive.",
  
  // endocrine
  "TSH": "Thyroid Stimulating Hormone - a chemical messenger sent from the brain that tells your thyroid gland to produce thyroid hormones.",
  "T3": "Triiodothyronine - the highly active, powerful form of thyroid hormone that directly controls body metabolism.",
  "T4": "Thyroxine - the primary, stable form of thyroid hormone produced by the thyroid gland and circulated through the body.",
  "TPO": "Thyroid Peroxidase - an important enzyme involved in creating thyroid hormones, often targeted by antibodies in autoimmune thyroid disease.",
  "Tg": "Thyroglobulin - a key protein produced and stored exclusively inside thyroid tissue.",
  "TSI": "Thyroid-Stimulating Immunoglobulin - abnormal antibodies that bind to and over-stimulate the thyroid gland, causing hyperthyroidism.",
  "TRAb": "TSH Receptor Antibody - autoimmune particles that target the control receptors on the thyroid gland, confirming Graves' disease.",
  "RAIU": "Radioactive Iodine Uptake - a medical scan tracking how much iodine your thyroid gland absorbs to determine if it is overactive.",
  "EPO": "Erythropoietin - a crucial hormone made by healthy kidneys that tells your bone marrow to manufacture fresh, oxygen-carrying red blood cells."
};

interface Flashcard {
  question: string;
  answer: string;
  category: string;
}

const CLINICAL_FLASHCARDS: Flashcard[] = [
  {
    question: "How do you distinguish Asthma from COPD in Spirometry reversibility testing?",
    answer: "In Asthma, inhalation of a short-acting beta-2 agonist (e.g., Albuterol) leads to a reversible airflow improvement of >12% and >200mL in FEV1. In COPD, airflow limitation remains persistent and non-reversible (post-bronchodilator FEV1/FVC remains < 0.70).",
    category: "Pulmonology"
  },
  {
    question: "What is the clinical significance of a Widal Test in Typhoid fever?",
    answer: "The Widal test measures agglutinating antibodies against somatic (O) and flagellar (H) antigens of S. typhi. High O titers (≥ 1:160) indicate active, acute infection, while high H titers (≥ 1:160) point to past infection, vaccination, or convalescent phase. Diagnostic accuracy is highest when demonstrating a 4-fold rise in paired serum samples 7 days apart.",
    category: "Infectious Disease"
  },
  {
    question: "Explain the 'Step-ladder' fever pattern of Typhoid.",
    answer: "During the first week of Typhoid fever, the temperature rises progressively, climbing higher each successive day, peaking in a high-grade plateau by the second week. This incremental escalation resembles a step-ladder.",
    category: "Infectious Disease"
  },
  {
    question: "What does the Sokolow-Lyon criteria on an ECG indicate?",
    answer: "The Sokolow-Lyon index (SV1 + RV5 or RV6 ≥ 35 mm) is a high-yield ECG criterion used to diagnose Left Ventricular Hypertrophy (LVH), which is a major complication of chronic uncontrolled Hypertension.",
    category: "Cardiology"
  },
  {
    question: "What is the difference between Heberden's and Bouchard's nodes?",
    answer: "Heberden's nodes are palpable, hard bony overgrowths located at the Distal Interphalangeal (DIP) joints of fingers. Bouchard's nodes are located at the Proximal Interphalangeal (PIP) joints. Both are pathognomonic physical signs of Osteoarthritis.",
    category: "Rheumatology"
  },
  {
    question: "Explain the concept of 'Myxedema' in hypothyroidism.",
    answer: "Myxedema refers to the accumulation of hydrophilic mucopolysaccharides (chondroitin sulfate and hyaluronic acid) in interstitial spaces, leading to the characteristic non-pitting, boggy edema of skin, especially around the face and eyes, with slow reflex relaxation.",
    category: "Endocrinology"
  },
  {
    question: "Why is a non-contrast CT head scan mandatory as the first investigation in acute stroke?",
    answer: "A non-contrast brain CT scan must be performed immediately to instantly differentiate between Ischemic and Hemorrhagic stroke. If it is Hemorrhagic, thrombolytic therapy (tPA) is strictly contraindicated and would be fatal.",
    category: "Neurology"
  },
  {
    question: "What is the 'AEIOU' mnemonic for emergency hemodialysis?",
    answer: "It highlights the life-saving indications for hemodialysis in AKI: Acidosis (severe metabolic pH < 7.1); Electrolytes (refractory hyperkalemia > 6.5 mEq/L); Intoxications (dialyzable toxins); Overload (pulmonary edema resistant to diuretics); and Uremia (pericarditis, neuropathy, or encephalopathy).",
    category: "Nephrology"
  }
];

const CASE_SLIDES = [
  {
    title: "The Silent Sufferers: Chronic Kidneys",
    subtitle: "End-Stage Renal (CKD) Diagnostics",
    bullets: [
      "Sialogue-breath & ammoniacal taste point to elevated serum blood urea.",
      "Anemia of CKD is strictly normocytic, normochromic due to diminished erythropoietin.",
      "Uric acid & calcium-phosphate crystal deposits cause relentless, generalized pruritus.",
      "KDIGO guidelines: Stage G5 is confirmed when eGFR drops below 15 mL/min/1.73m²."
    ]
  },
  {
    title: "Dengue Warning Flags",
    subtitle: "Differentiating Mild vs. Severe Plasma Leakage",
    bullets: [
      "The critical phase begins precisely as the fever subsides (Days 3-7).",
      "Look for sudden hematocrit rise (>20%) coinciding with a sharp decline in platelet counts.",
      "Tourniquet test: Inflate cuff for 5 mins; ≥10 petechiae per sq. inch is positive.",
      "Warning signs: Abdominal pain, persistent vomiting, mucosal bleed, lethargy, pleural effusion."
    ]
  },
  {
    title: "Symmetrical Polyarthritis: Is it Rheumatoid?",
    subtitle: "Autoimmune RA vs. Wear-and-Tear OA",
    bullets: [
      "RA morning stiffness lasts >1 hour and improves with physical movement.",
      "OA morning stiffness lasts <30 mins, worsens with joint load and wear-and-tear.",
      "RA classically affects PIP, MCP, wrists symmetrically, sparing DIP joints.",
      "Serology: Anti-CCP antibodies possess >95% specificity and predict aggressive joint erosions."
    ]
  },
  {
    title: "Endocrine Crisis: Thyroid Storm vs. Myxedema Coma",
    subtitle: "High-Yield Endocrinology Board Preps",
    bullets: [
      "Thyroid Storm: Severe hyper-metabolism, fever to 105°F, atrial fibrillation, and delirium.",
      "Myxedema Coma: Severe hypothermia, bradycardia, respiratory hypoventilation, and obtundation.",
      "Thyroid Storm is triggered by stressors (surgery, sepsis) in poorly controlled Graves' patients.",
      "Both are life-threatening endocrine emergencies requiring immediate critical care intervention."
    ]
  }
];

// Interactive Board Prep Quiz Questions
interface QuizQuestion {
  scenario: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  remedySymbol: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    scenario: "A 45-year-old patient presents with progressive, severe weight loss despite eating ravenously. They suffer from intense heat intolerance, rapid heart rates (tachycardia), and fine hand tremors. Their neck exhibits a hard, symmetrical goiter.",
    options: ["Iodum", "Calcarea Carbonica", "Rauwolfia Serpentina", "Bryonia Alba"],
    correctAnswer: "Iodum",
    explanation: "Iodum is the premier remedy for hyper-functioning thyroid states, matching rapid tissue emaciation despite intense hunger, absolute heat intolerance, and hard goiter.",
    remedySymbol: "🦋"
  },
  {
    scenario: "A 58-year-old female presents with severe, symmetric joint pain in her knuckles and wrists. Her morning joint stiffness lasts for over an hour and gets much better after gentle physical movement. Pains are heavily aggravated by cold, damp, rainy weather.",
    options: ["Rhus Toxicodendron", "Bryonia Alba", "Actaea Spicata", "Bothrops Lanceolatus"],
    correctAnswer: "Rhus Toxicodendron",
    explanation: "Rhus Toxicodendron is highly specific for inflammatory joint pain that improves with continuous movement, but worsens during initial motion, rest, and cold, damp weather.",
    remedySymbol: "🌿"
  },
  {
    scenario: "An 18-year-old student experiences sudden high-grade fever reaching 104°F, retro-orbital pain behind the eyes, and agonizing body aches that feel as if all their bones are breaking.",
    options: ["Eupatorium Perfoliatum", "Gelsemium Sempervirens", "Baptisia Tinctoria", "Arsenicum Album"],
    correctAnswer: "Eupatorium Perfoliatum",
    explanation: "Eupatorium Perfoliatum is famously known as 'bone-set' due to its dramatic ability to relieve retro-orbital soreness and intense 'breakbone' skeletal pains in Dengue.",
    remedySymbol: "🦴"
  },
  {
    scenario: "A patient experiencing a severe hypertensive crisis is brought in with severe blood congestion to the head, throbbing carotid arteries, and a violent splitting headache, feeling as if their skull would split open.",
    options: ["Glonoinum", "Rauwolfia Serpentina", "Crataegus Oxyacantha", "Plumbum Metallicum"],
    correctAnswer: "Glonoinum",
    explanation: "Glonoinum is extremely powerful for sudden, explosive blood pressure spikes with severe congestion to the head and violent, bursting headaches.",
    remedySymbol: "🧠"
  },
  {
    scenario: "An elderly patient with chronic kidney disease presents with severe, persistent, generalized body itching (pruritus) along with dark, coffee-ground-like urine and a severe accumulation of fluid causing swollen ankles.",
    options: ["Serum Anguillae (Eel Serum)", "Apis Mellifica", "Terebinthina", "Plumbum Metallicum"],
    correctAnswer: "Serum Anguillae (Eel Serum)",
    explanation: "Serum Anguillae (Eel Serum) possesses a remarkable therapeutic affinity for restoring kidney filtration in uremic states, severe albuminuria, and generalized dropsy.",
    remedySymbol: "🐍"
  }
];

export default function ClinicalHandbook() {
  const [selectedConditionId, setSelectedConditionId] = useState<string>("diabetes");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'clinical' | 'pathophysiology' | 'miasm' | 'therapeutics' | 'lifestyle'>('clinical');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  // Custom states for interactive elements
  const [explainingAbbr, setExplainingAbbr] = useState<{ term: string; definition: string } | null>(null);
  const [hoveredAbbr, setHoveredAbbr] = useState<{ term: string; definition: string; x: number; y: number } | null>(null);
  const [activeMiasmStage, setActiveMiasmStage] = useState<'psora' | 'sycosis' | 'syphilis' | 'tubercular'>('psora');
  
  // Quiz states
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState<boolean>(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizShowScore, setQuizShowScore] = useState<boolean>(false);

  // Scroll animation configurations
  const pAnimation = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.5, ease: "easeOut" as any }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, part: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredAbbr({
      term: part,
      definition: ABBREVIATIONS_DICT[part],
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredAbbr(null);
  };

  // Dynamic Humanized Text Parser wrapping abbreviations with interactive explainers
  const renderHumanizedText = (text: string) => {
    if (!text) return "";
    
    // Sort abbreviation keys descending to match longer keys first
    const sortedKeys = Object.keys(ABBREVIATIONS_DICT).sort((a, b) => b.length - a.length);
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedKeys = sortedKeys.map(escapeRegExp);
    
    // Construct safe word boundary pattern
    const pattern = new RegExp(`\\b(${escapedKeys.join('|')})\\b`, 'g');
    const parts = text.split(pattern);
    
    if (parts.length <= 1) return text;
    
    return parts.map((part, index) => {
      if (ABBREVIATIONS_DICT[part]) {
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setExplainingAbbr({
                term: part,
                definition: ABBREVIATIONS_DICT[part]
              });
            }}
            onMouseEnter={(e) => handleMouseEnter(e, part)}
            onMouseLeave={handleMouseLeave}
            className="inline-block px-1.5 py-0.5 mx-0.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md font-mono font-bold border-b-2 border-primary/30 hover:border-primary cursor-pointer transition-all hover:scale-105 active:scale-95 text-[11px] leading-none"
            title={`Click to show meaning of ${part}`}
          >
            {part}
          </button>
        );
      }
      return part;
    });
  };

  // Filter conditions based on search
  const filteredConditions = useMemo(() => {
    return clinicalConditions.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.system.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedCondition = useMemo(() => {
    return clinicalConditions.find(c => c.id === selectedConditionId) || clinicalConditions[0];
  }, [selectedConditionId]);

  // Sync miasm stage to psora upon condition change
  useEffect(() => {
    setActiveMiasmStage('psora');
  }, [selectedConditionId]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % CASE_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + CASE_SLIDES.length) % CASE_SLIDES.length);
  };

  const handleQuizAnswer = (option: string) => {
    if (quizIsAnswered) return;
    setQuizSelectedOption(option);
    setQuizIsAnswered(true);
    
    const isCorrect = option === QUIZ_QUESTIONS[quizIndex].correctAnswer;
    setQuizIsCorrect(isCorrect);
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSelectedOption(null);
    setQuizIsAnswered(false);
    setQuizIsCorrect(null);
    
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizSelectedOption(null);
    setQuizIsAnswered(false);
    setQuizIsCorrect(null);
    setQuizScore(0);
    setQuizShowScore(false);
  };

  const activeMeta = systemMeta[selectedCondition.system as keyof typeof systemMeta] || {
    icon: Stethoscope,
    color: "text-primary",
    bg: "bg-bg-secondary"
  };
  const ActiveIcon = activeMeta.icon;

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Clinical Conditions Handbook | Curiva Homoeopathy"
        description="Comprehensive diagnostic, pathophysiology, chronic miasmatic mapping, and therapeutic remedy profiles for 15 major clinical conditions."
      />

      {/* HEADER SECTION */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-bg-secondary text-text-primary border-b border-border">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" 
        />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-primary/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> High-Yield Clinical Reference
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-light leading-tight text-text-primary tracking-tight"
          >
            Clinical Conditions <br />
            <span className="text-primary italic font-serif font-semibold">Handbook &amp; Diagnostic Tool</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-normal leading-relaxed"
          >
            An interactive, peer-reviewed clinical guide covering 15 major disease processes. Map contemporary diagnostic guidelines with chronic homeopathic miasms and precise remedy keynotes.
          </motion.p>
          
          <div className="pt-2 text-xs text-text-tertiary flex items-center justify-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-primary/20 rounded-md border border-primary/50 text-[10px] text-primary font-bold text-center leading-tight">?</span>
            <span>Click any highlighted abbreviation (e.g. <strong>HbA1c</strong>, <strong>COPD</strong>, <strong>AKI</strong>) for instant simple definitions!</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR SEARCH & SELECTOR */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 bg-white p-5 rounded-3xl border border-border shadow-soft flex flex-col space-y-5"
          >
            <div>
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-primary" /> Conditions Index
              </h2>
              <motion.p {...pAnimation} className="text-[11px] text-text-secondary font-medium">Search and select from 15 high-yield clinical conditions</motion.p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input 
                type="text"
                placeholder="Search by condition or organ system..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-bg-secondary border border-border rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary placeholder:text-text-tertiary"
              />
            </div>

            {/* Scrollable list */}
            <div className="max-h-[500px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {filteredConditions.length > 0 ? (
                filteredConditions.map((condition) => {
                  const meta = systemMeta[condition.system as keyof typeof systemMeta] || {
                    icon: Stethoscope,
                    color: "text-primary",
                    bg: "bg-bg-secondary"
                  };
                  const Icon = meta.icon;
                  const isSelected = condition.id === selectedConditionId;

                  return (
                    <button
                      key={condition.id}
                      onClick={() => {
                        setSelectedConditionId(condition.id);
                        setActiveTab('clinical');
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                        isSelected 
                      ? 'bg-primary/5 border-primary/40 shadow-sm' 
                      : 'border-transparent hover:bg-bg-secondary hover:border-border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10' : 'bg-bg-secondary'} shrink-0`}>
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-primary animate-pulse' : meta.color}`} />
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold leading-snug ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                            {condition.title}
                          </h4>
                          <span className="text-[9px] text-text-tertiary uppercase tracking-wider font-semibold block">
                            {condition.system}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isSelected ? 'text-primary translate-x-1' : 'text-text-tertiary opacity-0'}`} />
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-text-tertiary font-medium">No clinical conditions found matching your search.</p>
                </div>
              )}
            </div>
            
            <div className="p-3.5 bg-bg-secondary rounded-2xl border border-border text-[11px] text-text-secondary space-y-1.5">
              <span className="font-bold text-[10px] uppercase tracking-wider text-text-primary block flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-primary" /> Dynamic Integration
              </span>
              <motion.p {...pAnimation} className="leading-relaxed">All clinical notes are humanized. You can click any medical abbreviation to display clear, friendly dictionary definitions immediately.</motion.p>
            </div>
          </motion.div>

          {/* MAIN CONDITIONS DIAGNOSTIC CANVAS */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col space-y-6"
          >
            
            {/* Condition Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${activeMeta.bg} ${activeMeta.color}`}>
                    {selectedCondition.system}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">
                  {selectedCondition.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <motion.div 
                  key={selectedConditionId}
                  initial={{ scale: 0.8, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className={`p-2.5 rounded-2xl ${activeMeta.bg}`}
                >
                  <ActiveIcon className={`w-6 h-6 ${activeMeta.color}`} />
                </motion.div>
              </div>
            </div>

            {/* NAVIGATION TABS */}
            <div className="flex flex-wrap gap-1.5 border-b border-border pb-1">
              {[
                { id: 'clinical', label: 'Clinical Info' },
                { id: 'pathophysiology', label: 'Pathology & Labs' },
                { id: 'miasm', label: 'Miasm Progression' },
                { id: 'therapeutics', label: 'Therapeutics' },
                { id: 'lifestyle', label: 'Management' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeHandbookTab"
                      className="absolute inset-0 bg-primary rounded-lg z-0 shadow-md shadow-primary/20"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* TAB CONTENT CANVASES */}
            <div className="flex-grow min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedConditionId}-${activeTab}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* TAB 1: CLINICAL INFORMATION */}
                  {activeTab === 'clinical' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">Clinical Description</h3>
                        <motion.p {...pAnimation} className="text-xs text-text-secondary leading-relaxed font-normal">
                          {renderHumanizedText(selectedCondition.overview)}
                        </motion.p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Cardinal Symptoms */}
                        <div className="space-y-3 p-4 bg-bg-secondary rounded-2xl border border-border">
                          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-1.5 text-primary">
                            <AlertTriangle className="w-4 h-4 text-primary" /> Cardinal Symptoms
                          </h4>
                          <ul className="space-y-2 text-xs text-text-secondary">
                            {selectedCondition.symptoms.map((symp, i) => (
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10px" }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                key={i} 
                                className="flex items-start gap-2"
                              >
                                <span className="text-primary mt-0.5">•</span>
                                <span>{renderHumanizedText(symp)}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Diagnostic Criteria & Standards */}
                        <div className="space-y-3 p-4 bg-bg-secondary rounded-2xl border border-border">
                          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-1.5 text-emerald-700">
                            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Reference Thresholds
                          </h4>
                          {selectedCondition.criteria.map((crit, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <span className="text-[10px] font-bold text-text-primary block border-b border-border pb-0.5 uppercase tracking-wide">
                                {crit.label}
                              </span>
                              <ul className="space-y-1 text-[11px] text-text-secondary">
                                {crit.values.map((v, key) => (
                                  <motion.li 
                                    key={key} 
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-10px" }}
                                    transition={{ delay: key * 0.05, duration: 0.4 }}
                                    className="flex items-start gap-1.5 leading-normal"
                                  >
                                    <span className="text-emerald-500 mt-0.5">✓</span>
                                    <span>{renderHumanizedText(v)}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Clinical Pearl Box */}
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 text-xs flex items-start gap-3 shadow-inner">
                        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5 animate-bounce" />
                        <div>
                          <strong className="text-primary font-bold block mb-0.5 uppercase tracking-wide text-[10px]">High-Yield Clinical Pearl:</strong>
                          <span className="text-text-secondary leading-relaxed font-medium">{renderHumanizedText(selectedCondition.pearl)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PATHOPHYSIOLOGY & DIAGNOSTIC LABS */}
                  {activeTab === 'pathophysiology' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">Pathophysiology &amp; Etiology</h3>
                        <motion.p {...pAnimation} className="text-xs text-text-secondary leading-relaxed font-normal">
                          {renderHumanizedText(selectedCondition.pathophysiology)}
                        </motion.p>
                      </div>

                      <div className="space-y-3 p-5 bg-bg-secondary rounded-2xl border border-border">
                        <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-1.5 text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommended Investigations &amp; Biomarkers
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          {selectedCondition.investigations.map((inv, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              key={idx} 
                              className="p-3 bg-white rounded-xl border border-border flex items-center gap-2.5 shadow-sm hover:border-primary/20 transition-all"
                            >
                              <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 shadow-inner">
                                {idx + 1}
                              </span>
                              <span className="text-xs text-text-primary leading-tight font-medium">
                                {renderHumanizedText(inv)}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MIASMATIC PROGRESSION SIMULATOR */}
                  {activeTab === 'miasm' && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-2">
                          <Dna className="w-4 h-4 text-primary animate-pulse" /> Interactive Miasm Progression Simulator
                        </h3>
                        <motion.p {...pAnimation} className="text-[11px] text-text-secondary leading-relaxed">
                          Follow the progression of this disease from dynamic nervous irritability up to complete physical tissue degeneration. Select a phase to simulate its pathology:
                        </motion.p>
                      </div>

                      {/* Simulator Stage Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'psora', label: '1. Psora', subtitle: 'Functional', color: 'border-amber-400 bg-amber-500 text-amber-700 hover:bg-amber-50' },
                          { id: 'sycosis', label: '2. Sycosis', subtitle: 'Proliferative', color: 'border-sky-400 bg-sky-500 text-sky-700 hover:bg-sky-50' },
                          { id: 'syphilis', label: '3. Syphilis', subtitle: 'Destructive', color: 'border-red-400 bg-red-500 text-red-700 hover:bg-red-50' },
                          ...(selectedCondition.miasmaticAnalysis.tubercular ? [{ id: 'tubercular', label: '4. Tubercular', subtitle: 'Fluctuating / Wasting', color: 'border-purple-400 bg-purple-500 text-purple-700 hover:bg-purple-50' }] : [])
                        ].map((stage) => {
                          const isActive = activeMiasmStage === stage.id;
                          return (
                            <button
                              key={stage.id}
                              onClick={() => setActiveMiasmStage(stage.id as any)}
                              className={`p-3.5 rounded-xl border-2 text-left transition-all relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                                isActive 
                                  ? 'border-primary/55 bg-bg-secondary shadow-md' 
                                  : 'border-border bg-white'
                              }`}
                            >
                              <div>
                                <span className={`text-[11px] font-black block ${
                                  stage.id === 'psora' ? 'text-amber-600' :
                                  stage.id === 'sycosis' ? 'text-sky-600' :
                                  stage.id === 'syphilis' ? 'text-red-600' : 'text-purple-600'
                                }`}>
                                  {stage.label}
                                </span>
                                <span className="text-[9px] text-text-tertiary block font-semibold uppercase tracking-wider mt-0.5">
                                  {stage.subtitle}
                                </span>
                              </div>
                              {isActive && (
                                <motion.div 
                                  layoutId="activeMiasmDot"
                                  className="absolute bottom-1 right-2 w-2 h-2 rounded-full bg-primary"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Simulated Board View */}
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={activeMiasmStage}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-2xl border bg-bg-secondary border-border"
                        >
                          {/* Left text column */}
                          <div className="md:col-span-8 space-y-3 flex flex-col justify-center">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md w-max shadow-sm border ${
                              activeMiasmStage === 'psora' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              activeMiasmStage === 'sycosis' ? 'bg-sky-100 text-sky-800 border-sky-200' :
                              activeMiasmStage === 'syphilis' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-purple-100 text-purple-800 border-purple-200'
                            }`}>
                              {activeMiasmStage === 'psora' ? 'Psoric Stage: Functional Deficit' :
                               activeMiasmStage === 'sycosis' ? 'Sycosic Stage: Sluggish Overgrowth' :
                               activeMiasmStage === 'syphilis' ? 'Syphilitic Stage: Structural Loss' : 'Tubercular Diathesis: Erratic Wasting'}
                            </span>
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                              Pathological Nature inside {selectedCondition.title}:
                            </h4>
                            <motion.p {...pAnimation} className="text-xs text-text-secondary leading-relaxed font-medium">
                              {renderHumanizedText(selectedCondition.miasmaticAnalysis[activeMiasmStage] || "")}
                            </motion.p>
                          </div>

                          {/* Right Interactive Animation column */}
                          <div className="md:col-span-4 bg-white border border-border rounded-xl p-4 flex flex-col items-center justify-center min-h-[140px] shadow-inner relative overflow-hidden">
                            <span className="text-[8px] font-black tracking-widest text-text-tertiary uppercase absolute top-2">Tissue Level Simulator</span>
                            
                            {/* PSORA ANIMATION */}
                            {activeMiasmStage === 'psora' && (
                              <div className="flex flex-col items-center space-y-2">
                                <motion.div 
                                  animate={{ 
                                    scale: [1, 1.15, 0.95, 1.1, 1],
                                    rotate: [0, 5, -5, 3, 0],
                                    boxShadow: [
                                      "0 0 0 0px rgba(245, 158, 11, 0.4)",
                                      "0 0 0 10px rgba(245, 158, 11, 0.1)",
                                      "0 0 0 20px rgba(245, 158, 11, 0)"
                                    ]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-amber-500/20"
                                >
                                  PULSE
                                </motion.div>
                                <span className="text-[10px] text-amber-700 font-bold">Dynamic Spasms</span>
                              </div>
                            )}

                            {/* SYCOSIS ANIMATION */}
                            {activeMiasmStage === 'sycosis' && (
                              <div className="flex flex-col items-center space-y-2">
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                  <motion.div 
                                    animate={{ 
                                      scale: [1, 1.2, 1],
                                      borderRadius: ["50%", "42% 58% 50% 50%", "50%"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute w-14 h-14 bg-sky-500/30 rounded-full flex items-center justify-center border border-sky-400"
                                  />
                                  <motion.div 
                                    animate={{ 
                                      x: [-4, 10, -4],
                                      y: [4, -6, 4],
                                      scale: [0.85, 1.05, 0.85]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute w-8 h-8 bg-sky-600/60 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-md"
                                  />
                                  <span className="relative z-10 text-sky-900 font-bold text-[10px] font-mono">GROW</span>
                                </div>
                                <span className="text-[10px] text-sky-700 font-bold">Plating &amp; Plaque</span>
                              </div>
                            )}

                            {/* SYPHILIS ANIMATION */}
                            {activeMiasmStage === 'syphilis' && (
                              <div className="flex flex-col items-center space-y-2">
                                <motion.div 
                                  animate={{ 
                                    scale: [1, 0.8, 1.05, 0.85, 1],
                                    opacity: [1, 0.6, 1, 0.5, 1],
                                    clipPath: [
                                      "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                                      "polygon(50% 15%, 85% 38%, 70% 85%, 30% 85%, 15% 38%)",
                                      "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
                                    ]
                                  }}
                                  transition={{ duration: 2.5, repeat: Infinity }}
                                  className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-red-600/35"
                                >
                                  DECAY
                                </motion.div>
                                <span className="text-[10px] text-red-700 font-bold">Tissue Destruction</span>
                              </div>
                            )}

                            {/* TUBERCULAR ANIMATION */}
                            {activeMiasmStage === 'tubercular' && (
                              <div className="flex flex-col items-center space-y-2">
                                <motion.div 
                                  animate={{ 
                                    scale: [1, 1.35, 0.65, 1.25, 1],
                                    opacity: [0.8, 1, 0.5, 1, 0.8]
                                  }}
                                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                                  className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-purple-500/30"
                                >
                                  WASTE
                                </motion.div>
                                <span className="text-[10px] text-purple-700 font-bold">Erratic Wasting</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* TAB 4: THERAPEUTICS (KEY REMEDIES) */}
                  {activeTab === 'therapeutics' && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-sm font-extrabold text-text-primary uppercase tracking-wider">Homoeopathic Clinical Therapeutics</h3>
                        <motion.p {...pAnimation} className="text-[11px] text-text-secondary leading-relaxed">Keynote clinical remedies mapped to {selectedCondition.title} clinical indications.</motion.p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCondition.remedies.map((remedy, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10px" }}
                            transition={{ delay: idx * 0.05 }}
                            key={idx} 
                            className="bg-bg-secondary p-4 rounded-2xl border border-border space-y-3 hover:border-primary/25 transition-all duration-200 shadow-sm"
                          >
                            <div className="flex items-center justify-between border-b border-border/80 pb-2">
                              <h4 className="text-xs font-black text-primary uppercase tracking-wider">
                                {remedy.name}
                              </h4>
                              <span className="text-[9px] font-mono font-bold bg-white border border-border px-2 py-0.5 rounded-lg text-text-secondary">
                                Indication {idx + 1}
                              </span>
                            </div>
                            <ul className="space-y-2 text-[11px] text-text-secondary leading-normal font-medium">
                              {remedy.keynotes.map((note, kIdx) => (
                                <motion.li 
                                  key={kIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, margin: "-10px" }}
                                  transition={{ delay: kIdx * 0.05, duration: 0.4 }}
                                  className="flex items-start gap-1.5"
                                >
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{renderHumanizedText(note)}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: LIFESTYLE & COMPLICATIONS */}
                  {activeTab === 'lifestyle' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Lifestyle Interventions */}
                        <div className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-4">
                          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2 text-emerald-700">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" /> Lifestyle &amp; Dietary Guidelines
                          </h4>
                          <ul className="space-y-2.5 text-xs text-text-secondary font-medium">
                            {selectedCondition.lifestyle.map((life, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10px" }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className="flex items-start gap-2 leading-relaxed"
                              >
                                <span className="text-emerald-500 mt-0.5">✓</span>
                                <span>{renderHumanizedText(life)}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Complications & Risks */}
                        <div className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-4">
                          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2 text-red-700">
                            <ShieldAlert className="w-4.5 h-4.5 text-red-500" /> Severe Complications &amp; Prognosis
                          </h4>
                          <ul className="space-y-2.5 text-xs text-text-secondary font-medium">
                            {selectedCondition.complications.map((comp, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-10px" }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className="flex items-start gap-2 leading-relaxed"
                              >
                                <span className="text-red-500 mt-0.5">⚠️</span>
                                <span>{renderHumanizedText(comp)}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

        </div>

        {/* SECTION 2: CLINICAL FLASHCARDS (TAPPING FLIP CARDS) */}
        <section className="mt-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <h2 className="text-lg font-black text-text-primary tracking-tight uppercase italic flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" /> Interactive <span className="text-primary">Clinical Flashcards</span>
              </h2>
              <motion.p {...pAnimation} className="text-xs text-text-secondary mt-1 font-medium">
                Tap any flashcard to flip and reveal high-yield clinical board &amp; viva examination secrets.
              </motion.p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-bg-secondary border border-border rounded-lg text-text-secondary">
              Total Cards: {CLINICAL_FLASHCARDS.length}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_FLASHCARDS.map((card, idx) => {
              const isFlipped = flippedCards[idx];
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                  onClick={() => toggleCard(idx)}
                  className="w-full h-56 cursor-pointer [perspective:1000px] group"
                >
                  <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    {/* Front */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white hover:bg-bg-secondary border border-border text-text-primary p-5 rounded-3xl flex flex-col justify-between shadow-soft transition-all group-hover:scale-[1.02]">
                      <span className="text-[9px] uppercase font-black text-primary tracking-widest">{card.category}</span>
                      <h3 className="text-xs font-bold leading-relaxed text-text-primary font-display">
                        {renderHumanizedText(card.question)}
                      </h3>
                      <span className="text-[9px] text-text-tertiary flex items-center gap-1 font-medium">
                        Tap card to flip <RotateCcw className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary/5 border border-primary/20 text-text-primary p-5 rounded-3xl flex flex-col justify-between shadow-soft">
                      <span className="text-[9px] uppercase font-black text-primary-dark tracking-widest">Clinical Answer</span>
                      <div className="text-[11px] space-y-2 text-text-secondary overflow-y-auto max-h-[120px] scrollbar-thin pr-1 leading-relaxed font-medium">
                        <motion.p {...pAnimation}>{renderHumanizedText(card.answer)}</motion.p>
                      </div>
                      <span className="text-[9px] text-primary-dark/60 flex items-center gap-1 font-mono">
                        Tap to reset ↺
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: SOCIAL CLINICAL KIT SLIDES (CAROUSEL) */}
        <section className="mt-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-black text-text-primary tracking-tight uppercase italic">
              Curiva Clinical Case <span className="text-primary">Toolkit</span>
            </h2>
            <motion.p {...pAnimation} className="text-xs text-text-secondary mt-1">
              High-yield slide deck summarized beautifully for rapid bedside revisions and viva preps.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative bg-bg-secondary text-text-primary rounded-3xl p-6 sm:p-10 shadow-soft overflow-hidden min-h-[360px] flex flex-col justify-between border border-border"
          >
            {/* Glowing orb details */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center relative z-10 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest text-primary">CURIVA BEDSIDE TOOLKIT</span>
                <span className="text-text-tertiary">|</span>
                <span className="text-[10px] text-text-secondary">Slide Companion</span>
              </div>
              <span className="text-xs font-mono font-semibold bg-white border border-border px-3 py-1 rounded-full text-text-secondary shadow-sm">
                Slide {currentSlide + 1} / {CASE_SLIDES.length}
              </span>
            </div>

            {/* Slide Content with crossfades */}
            <div className="py-8 relative z-10 max-w-xl mx-auto text-center space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-text-primary leading-snug">
                    {CASE_SLIDES[currentSlide].title}
                  </h3>
                  <motion.p {...pAnimation} className="text-xs text-primary-dark italic leading-relaxed max-w-md mx-auto">
                    {CASE_SLIDES[currentSlide].subtitle}
                  </motion.p>
                  
                  <ul className="text-left max-w-md mx-auto space-y-2.5">
                    {CASE_SLIDES[currentSlide].bullets.map((bullet, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="text-xs sm:text-sm text-text-secondary leading-normal flex items-start gap-2 font-medium"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{renderHumanizedText(bullet)}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation */}
            <div className="flex justify-between items-center relative z-10 pt-4 border-t border-border">
              <button 
                onClick={prevSlide}
                className="px-4 py-2 bg-white hover:bg-bg-secondary border border-border rounded-xl text-[10px] font-bold text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4.5 h-4.5" /> Previous
              </button>

              <div className="hidden sm:flex items-center gap-1.5">
                {CASE_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentSlide ? 'bg-primary w-4' : 'bg-border w-1.5 hover:bg-text-tertiary'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                Next <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: INTERACTIVE DIAGNOSTIC CHALLENGE (NEW HIGHLY ANIMATED QUIZ) */}
        <section className="mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/95 to-primary-dark text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-primary-dark/30 relative overflow-hidden"
          >
            {/* Background floating particles */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" />
              <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-white rounded-full animate-bounce" />
              <div className="absolute top-1/3 left-4/5 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>

            {!quizShowScore ? (
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-white/10 rounded-xl">
                      <GraduationCap className="w-5 h-5 text-white animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight uppercase">Diagnostic Challenge Board</h3>
                      <p className="text-[10px] text-white/70">Test your keynote therapeutics on raw clinical vignettes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black bg-white/10 px-3 py-1 rounded-full text-white/90">
                      VIGNETTE {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-[10px] font-mono font-black bg-emerald-500/30 border border-emerald-400/40 px-3 py-1 rounded-full text-emerald-200">
                      SCORE: {quizScore}
                    </span>
                  </div>
                </div>

                {/* Animated vignette */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={quizIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/10 p-5 rounded-2xl border border-white/15 shadow-inner">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-white/90 flex items-center gap-1.5 mb-2.5">
                        <HelpCircle className="w-4 h-4 text-white" /> Presentation &amp; Diagnostics:
                      </h4>
                      <motion.p {...pAnimation} className="text-xs sm:text-sm leading-relaxed text-white font-medium italic">
                        "{QUIZ_QUESTIONS[quizIndex].scenario}"
                      </motion.p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {QUIZ_QUESTIONS[quizIndex].options.map((option, oIdx) => {
                        const isSelected = quizSelectedOption === option;
                        const isCorrect = option === QUIZ_QUESTIONS[quizIndex].correctAnswer;
                        const showCorrectColor = quizIsAnswered && isCorrect;
                        const showWrongColor = quizIsAnswered && isSelected && !isCorrect;

                        return (
                          <motion.button
                            whileHover={{ scale: quizIsAnswered ? 1 : 1.015 }}
                            whileTap={{ scale: quizIsAnswered ? 1 : 0.985 }}
                            disabled={quizIsAnswered}
                            onClick={() => handleQuizAnswer(option)}
                            key={oIdx}
                            className={`p-4 rounded-xl text-xs font-extrabold text-left transition-all flex items-center justify-between border cursor-pointer ${
                              showCorrectColor 
                                ? 'bg-emerald-500 border-emerald-400 text-white shadow-md'
                                : showWrongColor
                                ? 'bg-red-500 border-red-400 text-white shadow-md'
                                : isSelected
                                ? 'bg-white text-primary border-white'
                                : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                            }`}
                          >
                            <span>{option}</span>
                            {quizIsAnswered && isCorrect && (
                              <span className="text-[10px] bg-white text-emerald-600 px-2 py-0.5 rounded-md font-black uppercase">Correct</span>
                            )}
                            {quizIsAnswered && isSelected && !isCorrect && (
                              <span className="text-[10px] bg-white text-red-600 px-2 py-0.5 rounded-md font-black uppercase font-mono">Incorrect</span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Feedback Explanation Panel */}
                <AnimatePresence>
                  {quizIsAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-white text-text-primary rounded-2xl border border-white/20 space-y-2.5 shadow-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{QUIZ_QUESTIONS[quizIndex].remedySymbol}</span>
                        <h4 className="text-xs font-black uppercase tracking-wide text-primary">
                          Therapeutic Solution: {QUIZ_QUESTIONS[quizIndex].correctAnswer}
                        </h4>
                      </div>
                      <motion.p {...pAnimation} className="text-xs text-text-secondary leading-relaxed font-semibold">
                        {QUIZ_QUESTIONS[quizIndex].explanation}
                      </motion.p>
                      <button
                        onClick={handleNextQuizQuestion}
                        className="mt-2 w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Go to Next Vignette' : 'Complete Challenge'} <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* RESULTS PANEL WITH REWARDS */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6 relative z-10 max-w-md mx-auto"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-white/25 animate-bounce">
                  🏆
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Challenge Competed!</h3>
                  <p className="text-xs text-white/80">You've successfully solved all 5 diagnostic vignettes.</p>
                </div>

                {/* Score badge & rank */}
                <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2.5 shadow-inner">
                  <span className="text-sm font-bold text-white/70 block uppercase tracking-widest text-[10px]">Your Performance Rank:</span>
                  <div className="text-3xl font-black tracking-tight text-white">
                    {quizScore} / {QUIZ_QUESTIONS.length}
                  </div>
                  <span className="inline-block px-3 py-1 bg-white text-primary rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                    {quizScore === 5 ? 'Master Clinician 👑' :
                     quizScore === 4 ? 'Senior Resident 👨‍⚕️' :
                     quizScore === 3 ? 'Medical Intern 🏥' : 'Aspiring Student 📚'}
                  </span>
                  <p className="text-[11px] text-white/70 italic mt-1 leading-normal font-medium">
                    {quizScore === 5 ? 'Exceptional! You possess flawless therapeutic keynote knowledge and diagnostic diagnostic skills.' :
                     quizScore === 4 ? 'Brilliant score! Almost flawless. Retake to lock in a perfect Clinician status.' :
                     quizScore === 3 ? 'Good job! A solid understanding of clinical keynotes, keep studying the index.' :
                     'Keep learning! Go through the 15 conditions handbook index to enrich your clinical knowledge.'}
                  </p>
                </div>

                <button
                  onClick={handleRestartQuiz}
                  className="w-full py-3 bg-white hover:bg-white/95 text-primary rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-primary animate-spin-slow" /> Reset Challenge board
                </button>
              </motion.div>
            )}
          </motion.div>
        </section>

      </main>

      {/* FOOTER DICTIONARY/ABBREVIATION EXPLANATION POPUP */}
      <AnimatePresence>
        {explainingAbbr && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setExplainingAbbr(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-primary/20 shadow-2xl relative text-center space-y-4 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setExplainingAbbr(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-bg-secondary text-text-tertiary hover:text-text-primary transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto text-xl font-black font-mono shadow-inner border border-primary/10">
                {explainingAbbr.term}
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest text-primary font-mono">Clinical Abbreviation</h4>
                <motion.p {...pAnimation} className="text-xs text-text-secondary leading-relaxed font-bold bg-bg-secondary p-4 rounded-xl border border-border">
                  {explainingAbbr.definition}
                </motion.p>
              </div>
              
              <motion.p {...pAnimation} className="text-[10px] text-text-tertiary">Tap anywhere outside or click below to close</motion.p>
              
              <button
                onClick={() => setExplainingAbbr(null)}
                className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-primary/20 hover:shadow-lg cursor-pointer"
              >
                Got it, thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING HOVER TOOLTIP SYSTEM FOR MEDICAL TERMINOLOGY */}
      <AnimatePresence>
        {hoveredAbbr && !explainingAbbr && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none px-4 py-3 bg-zinc-900/95 text-zinc-100 rounded-2xl shadow-xl border border-zinc-800/80 text-xs max-w-[280px] w-max font-normal leading-relaxed text-center backdrop-blur-md"
            style={{
              left: `${hoveredAbbr.x}px`,
              top: `${hoveredAbbr.y - 8}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-mono font-bold text-primary text-[10px] uppercase tracking-wider mb-1">
              {hoveredAbbr.term}
            </div>
            <div className="text-zinc-200 text-[11px] leading-snug">
              {hoveredAbbr.definition}
            </div>
            {/* Tooltip Arrow */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-900"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
