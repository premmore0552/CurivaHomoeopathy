import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  Brain, 
  Activity, 
  Shield, 
  Wind, 
  Droplets, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  Table, 
  ListFilter, 
  Users, 
  Layers, 
  AlertCircle, 
  RefreshCw, 
  Calendar, 
  GitFork, 
  Compass, 
  FileText, 
  ChevronDown, 
  Check,
  Search,
  Book,
  FileQuestion,
  Tag,
  Flame,
  Coffee,
  Heart,
  CornerDownRight,
  Info
} from 'lucide-react';
import SEO from '../components/SEO';
import { diseaseHubData, Disease, ImportantRemedy } from '../data/diseaseHubData';
import { comparisonRemedies, ComparisonData } from '../data/comparisonData';

// --- Static Repertorial & Academic Datasets ---

const miasmsData = [
  {
    name: "Psora (The Sensitizing Miasm)",
    origin: " Samuel Hahnemann (derived from 'itch' or internal suppression)",
    deficit: "Functional disturbance, hypersensitivity, physiological irritation.",
    temperament: "Anxious, restless, speculative, easily excited, pessimistic.",
    skin: "Dry, rough, dirty-looking, intense itching worse by warmth of bed, better by scratching until sore.",
    pain: "Neuralgic, functional, stitching, coming and going.",
    secretions: "Scanty, watery, irritating.",
    remedies: ["Sulphur", "Psorinum", "Lycopodium", "Calcarea Carb", "Natrum Mur"]
  },
  {
    name: "Sycosis (The Proliferative Miasm)",
    origin: "Condylomatous or gonorrheal suppression",
    deficit: "Overproduction, hypertrophy, tumor formation, infiltration, chronic thick discharges.",
    temperament: "Secretive, suspicious, obsessive, forgetful, hurried.",
    skin: "Warts, condylomata, dark spots, moles, thick nails, greasy skin.",
    pain: "Dull, heavy, aching, joint stiffness, worse in damp weather, better in dry warm weather.",
    secretions: "Thick, greenish-yellow, offensive, pungent.",
    remedies: ["Thuja Occidentalis", "Medorrhinum", "Natrum Sulph", "Silicea", "Sarsaparilla"]
  },
  {
    name: "Syphilis (The Destructive Miasm)",
    origin: "Chancre or venereal destruction suppression",
    deficit: "Necrosis, ulceration, degeneration, congenital deformities, decay of bones.",
    temperament: "Melancholic, suicidal, dull, slow of comprehension, fixed ideas.",
    skin: "Copper-colored spots, deep ulcers with clean-cut edges, hair loss in patches.",
    pain: "Bone pains, tearing, worse at night (from sunset to sunrise), better in cold.",
    secretions: "Fetid, watery, putrid, blood-stained.",
    remedies: ["Mercurius Solubilis", "Aurum Metallicum", "Syphilinum", "Nitric Acid", "Phytolacca"]
  }
];

const constitutionGuide = [
  {
    type: "Carbonic (Calcarea Carbonica Type)",
    physique: "Symmetrical, stocky, square teeth, straight joints. Prone to obesity and water retention.",
    pathology: "Slow metabolism, glandular swellings, eczema, stone formation, sluggish digestion.",
    psychology: "Methodical, practical, hard-working, stubborn, anxious about security and health.",
    remedy: "Calcarea Carbonica"
  },
  {
    type: "Phosphoric (Phosphorus / Acid Phos Type)",
    physique: "Tall, slender, long bones, graceful, narrow chest, fine teeth. Rapid growth in height.",
    pathology: "Nervous exhaustion, bleeding tendencies, pulmonary vulnerabilities, rapid dehydration.",
    psychology: "Sympathetic, artistic, highly expressive, fears loneliness, easily fatigued mentally.",
    remedy: "Phosphorus"
  },
  {
    type: "Fluoric (Fluoric Acid / Calc Fluor Type)",
    physique: "Asymmetrical, hypermobile joints, irregular teeth, early aging of tissues.",
    pathology: "Elastic tissue degeneration, varicose veins, exostosis, bone decays, premature wrinkles.",
    psychology: "Materialistic, highly energetic, sexually active, unstable, lack of deep emotional bonds.",
    remedy: "Fluoricum Acidum"
  },
  {
    type: "Sulfuric (Sulphur Type)",
    physique: "Stoop-shouldered ('philosophic ragbag'), red orifices, dry dirty skin.",
    pathology: "Heat congestion, localized burnings, chronic skin suppressions, hemorrhoids.",
    psychology: "Egotistical, intellectual, inventive, dirty but happy, philosophic speculater.",
    remedy: "Sulphur"
  }
];

const organRemedyIndex = [
  { organ: "Brain & Nervous System", remedies: ["Belladonna", "Gelsemium", "Zincum Met", "Nux Vomica", "Aconite"] },
  { organ: "Lungs & Respiratory", remedies: ["Antimonium Tart", "Ipecac", "Blatta Orientalis", "Bryonia", "Spongia Tosta"] },
  { organ: "Liver & Digestive", remedies: ["Lycopodium", "Chelidonium", "Carduus Marianus", "Nux Vomica", "Carbo Veg"] },
  { organ: "Heart & Vasculature", remedies: ["Cactus Grandiflorus", "Digitalis", "Spigelia", "Crataegus", "Glonoinum"] },
  { organ: "Joints & Musculoskeletal", remedies: ["Rhus Toxicodendron", "Bryonia", "Colchicum", "Ruta Graveolens", "Ledum Palustre"] },
  { organ: "Skin & Integumentary", remedies: ["Sulphur", "Graphites", "Mezereum", "Petroleum", "Arsenicum Alb"] }
];

const causationRemedies = [
  { cause: "Getting wet / Damp exposure", remedies: ["Rhus Tox", "Dulcamara", "Natrum Sulph", "Calcarea Carb"] },
  { cause: "Fright / Sudden shock", remedies: ["Aconite", "Opium", "Gelsemium", "Ignatia"] },
  { cause: "Grief / Disappointed love", remedies: ["Ignatia", "Natrum Mur", "Acid Phos", "Staphysagria"] },
  { cause: "Anger / Indignation", remedies: ["Chamomilla", "Nux Vomica", "Staphysagria", "Colocynthis"] },
  { cause: "Mechanical injuries / Falls", remedies: ["Arnica", "Hypericum", "Ruta Graveolens", "Symphytum"] },
  { cause: "Cold dry winds", remedies: ["Aconite", "Hepar Sulph", "Bryonia", "Nux Vomica"] }
];

const mentalSymptoms = [
  { symptom: "Anxiety & Restlessness", remedies: ["Arsenicum Album", "Aconitum Napellus", "Argentum Nitricum"] },
  { symptom: "Silent Grief & Melancholy", remedies: ["Natrum Muriaticum", "Ignatia Amara", "Aurum Metallicum"] },
  { symptom: "Extreme Anger & Irritability", remedies: ["Chamomilla", "Nux Vomica", "Anacardium"] },
  { symptom: "Anticipatory Stage Fright", remedies: ["Gelsemium", "Argentum Nitricum", "Lycopodium"] },
  { symptom: "Hysterical, changeable moods", remedies: ["Ignatia", "Pulsatilla", "Crocus Sativus"] }
];

const pathologicalDiagnoses = [
  { diagnosis: "Tonsillitis & Quinsy", remedies: ["Baryta Carbonica", "Belladonna", "Hepar Sulphur", "Phytolacca"] },
  { diagnosis: "Gouty Arthritis", remedies: ["Colchicum", "Urtica Urens", "Ledum Palustre", "Benzoic Acid"] },
  { diagnosis: "Eczema (weeping, honey-like)", remedies: ["Graphites", "Mezereum", "Sulphur", "Petroleum"] },
  { diagnosis: "Vascular Hypertension", remedies: ["Glonoinum", "Baryta Muriatica", "Rauwolfia Serpentina", "Aurum Met"] }
];

const remedyMemoryTricks = [
  { remedy: "Aconitum", trick: "A-C-O-N-I-T-E: A=Acute onset, C=Chilly, O=One-hour (sudden), N=No rest, I=Intense fear of death, T=Thirst burning, E=Exposed to cold dry winds." },
  { remedy: "Gelsemium", trick: "The 4 Ds: Dullness, Drowsiness, Dizziness, and Dread of movement. (Plus, relieved by copious pale urination!)" },
  { remedy: "Rhus Tox", trick: "R-H-U-S: R=Restlessness constant, H=Hot water relieves, U=Unusual pain on first movement, S=Stiffness relieved by continued motion." },
  { remedy: "Pulsatilla", trick: "P-U-L-S-E: P=Peevish but gentle, U=Unstable symptoms, L=Like open air, S=Sadness weeping, E=Excludes water (thirstless)." }
];

const allensKeynotes = [
  {
    remedy: "Lycopodium Clavatum",
    keynotes: [
      "Aggravation characteristically from 4 PM to 8 PM.",
      "Right-sided symptoms, or moving from right to left (e.g. throat, ovaries).",
      "Early satiety: Hunger, but eating a few bites creates full, bloated feeling.",
      "Deep intellect with physical weakness; apprehensive but performs well once started.",
      "Desires warm food, warm drinks, and sweets."
    ]
  },
  {
    remedy: "Belladonna",
    keynotes: [
      "Sudden, violent onset of all complaints; hot, red, pulsating states.",
      "Right-sided, settling especially in right eye or temple.",
      "Great sensitivity to light, noise, draft of air, or jarring of bed.",
      "Red, hot, glowing face with cold hands and feet.",
      "Sleepy but cannot sleep; starts in fright on closing eyes."
    ]
  },
  {
    remedy: "Arsenicum Album",
    keynotes: [
      "Intense burning pains, paradoxically relieved by warm applications.",
      "Midnight to 2 AM aggravation of all symptoms.",
      "Extreme physical restlessness with profound exhaustion (prostration).",
      "Unquenchable thirst for small sips of cold water at frequent intervals.",
      "Great fear of death, disease, and being left alone; fastidious cleanliness."
    ]
  },
  {
    remedy: "Pulsatilla",
    keynotes: [
      "Changeable, moving, nomadic symptoms; pain constantly shifts joints.",
      "Thirstlessness associated with almost all complaints (dry mouth, no thirst).",
      "Worse in a warm, close room; craves open, cool, fresh air.",
      "Gentle, mild, yielding disposition; weeps easily while narrating symptoms.",
      "Digestive disturbances from rich, fatty foods, pastries, or pork."
    ]
  }
];

const kentPhilosophy = [
  {
    topic: "The 12 Kentian Clinical Observations",
    description: "Observations made after administering a remedy to assess prognosis.",
    details: [
      "Observation 1: A prolonged aggravation followed by final decline. (Prognosis: Incurable, dose was too deep/too strong).",
      "Observation 2: Strong aggravation followed by rapid, permanent recovery. (Prognosis: Excellent cure, perfect remedy and potency).",
      "Observation 3: Quick aggravation followed by short recovery, then returns to baseline. (Prognosis: Supericial action or structural interference).",
      "Observation 4: No aggravation, only recovery. (Prognosis: Pathological state was light, dose was perfect).",
      "Observation 5: Amelioration comes first, then aggravation. (Prognosis: Palliation only, wrong remedy or incurable organic state)."
    ]
  },
  {
    topic: "Kent's Hierarchy of Symptoms",
    description: "How symptoms should be prioritized for repertorization.",
    details: [
      "1. Mentals Generals: Will & Emotions (e.g. loves, hates, fears) > Intellectual (e.g. memory, confusion) > Memory.",
      "2. Physical Generals: Thermal reactions (Chilly/Hot) > Appetite, Cravings & Aversions > Sleep, Sweat, Side affinities.",
      "3. Particulars: Localized complaints, sensation, character of pain, and localized modalities."
    ]
  }
];

const boerickePages = [
  {
    remedy: "Baptisia Tinctoria (Wild Indigo)",
    affinity: "Blood, Gastrointestinal, Mucous membranes.",
    clinicalIndications: "Low typhoid states, extreme fetor of all discharges (sweat, breath, stool), heavy drowsy face, feels as if body parts are scattered in bed.",
    keynotePearl: "Great muscular soreness; bedside feels too hard. All secretions smell like rot."
  },
  {
    remedy: "Crataegus Oxyacantha (Hawthorn Berries)",
    affinity: "Heart muscle, Coronary circulation.",
    clinicalIndications: "Myocardial weakness, cardiac hypertrophy, angina, dyspnea on least exertion. Acts as a natural cardiac tonic.",
    keynotePearl: "Sensation of cardiac oppression; cold hands and feet, feeble pulse."
  },
  {
    remedy: "Sabal Serrulata (Saw Palmetto)",
    affinity: "Prostate, Genito-urinary tract.",
    clinicalIndications: "Prostatic hypertrophy, difficult painful urination, nocturnal frequency. In females, underdeveloped breasts.",
    keynotePearl: "Constant desire to urinate at night with discharge of prostatic fluid."
  }
];

const remedyFamilyTrees = [
  {
    family: "Solanaceae (Nightshade Family)",
    attribute: "Congestive, violent, spasmodic, delirium, dilated pupils, dry burning membranes.",
    remedies: ["Belladonna", "Stramonium", "Hyoscyamus Niger", "Dulcamara", "Capsicum"]
  },
  {
    family: "Compositae (Aster Family)",
    attribute: "Traumatism, bruising, soreness, capillary bleeding, sensitive to touch.",
    remedies: ["Arnica Montana", "Calendula", "Chamomilla", "Bellis Perennis", "Artemisia Vulgaris"]
  },
  {
    family: "Halogen Group (Mineral Kingdom)",
    attribute: "Highly corrosive, glandular hardness, respiratory croup, hot and active.",
    remedies: ["Iodum", "Bromium", "Chlorum", "Fluor Acid"]
  }
];

const studyCalendar = [
  { day: "Monday", focus: "Materia Medica: Chilly Remedies (Silicea, Arsenicum, Hepar)" },
  { day: "Tuesday", focus: "Organon & Philosophy: Kent's Lectures 1 to 5 on Homeopathic Law" },
  { day: "Wednesday", focus: "Repertorial Analysis: Understanding Modalities of Rheumatic pain" },
  { day: "Thursday", focus: "Materia Medica: Hot Remedies (Sulphur, Pulsatilla, Apis Mellifica)" },
  { day: "Friday", focus: "Clinical Case Studies: Migraine right-sided vs. left-sided differential" },
  { day: "Saturday", focus: "Mock MCQ Prep: Practice BHMS & AIAPGET past questions" },
  { day: "Sunday", focus: "Revision of Keynote Mnemonics & Remedy Relationships" }
];

const diseaseWiseRemedyCollections = [
  {
    system: "Cardiovascular System Remedies",
    remedies: [
      { name: "Cactus Grandiflorus", indication: "Sensation of constriction as if heart is bound by an iron band." },
      { name: "Digitalis Purpurea", indication: "Extremely slow, weak pulse; sensation as if heart would stop if he moves." },
      { name: "Laurocerasus", indication: "Cyanosis and gasping, relieved by lying flat." },
      { name: "Spigelia", indication: "Violent palpitation, stitching pains, worse bending forward." }
    ]
  },
  {
    system: "Rheumatic & Joint Remedies",
    remedies: [
      { name: "Rhus Toxicodendron", indication: "Painful stiffness, worse at rest, better by continued motion and heat." },
      { name: "Bryonia Alba", indication: "Stitching joints, worse for the least motion, better by pressure." },
      { name: "Colchicum Autumnale", indication: "Extreme intolerance to smell of cooking food; joints swollen, hot." },
      { name: "Ledum Palustre", indication: "Rheumatic pain begins in feet and travels upward; better for cold water application." }
    ]
  },
  {
    system: "Dermatological Remedies",
    remedies: [
      { name: "Sulphur", indication: "Intense burning and itching; worse from warmth of bed and washing." },
      { name: "Graphites", indication: "Dry, rough skin with sticky, honey-like oozing from cracks." },
      { name: "Petroleum", indication: "Deep cracks on hands, bleeding; worse in winter." },
      { name: "Mezereum", indication: "Thick crusts with oozing pus underneath; itching worse warm room." }
    ]
  }
];

// --- MAIN COMPONENT ---

export default function DiseaseHub() {
  const [activeTab, setActiveTab] = useState<'clinical' | 'academic'>('clinical');
  
  // --- Clinical Tab State ---
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(diseaseHubData[0].id);
  const currentDisease = diseaseHubData.find(d => d.id === selectedDiseaseId) || diseaseHubData[0];
  
  // MCQ grading state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showGrading, setShowGrading] = useState<Record<string, boolean>>({});
  
  // --- Academic Tab State ---
  const [academicSearch, setAcademicSearch] = useState('');
  const [selectedRelationshipRemedy, setSelectedRelationshipRemedy] = useState('belladonna');
  const [compareRemedyA, setCompareRemedyA] = useState('aconite');
  const [compareRemedyB, setCompareRemedyB] = useState('bryonia');
  const [activeAcademicSection, setActiveAcademicSection] = useState<string>('relationships');
  
  // Allen's Keynotes Flip State
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // Modalities search filter
  const [modalityFilter, setModalityFilter] = useState<'better' | 'worse' | 'all'>('all');
  const [modalityQuery, setModalityQuery] = useState('');

  // Handle MCQ Answer click
  const handleMCQAnswer = (mcqId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [mcqId]: optionIndex
    }));
    setShowGrading(prev => ({
      ...prev,
      [mcqId]: true
    }));
  };

  const resetMCQs = (diseaseId: string) => {
    const updatedAnswers = { ...userAnswers };
    const updatedGrading = { ...showGrading };
    currentDisease.mcqs.forEach(q => {
      delete updatedAnswers[q.id];
      delete updatedGrading[q.id];
    });
    setUserAnswers(updatedAnswers);
    setShowGrading(updatedGrading);
  };

  // Get Remedy Relationship data dynamically
  const getRemedyRelationships = (remedyId: string) => {
    switch (remedyId.toLowerCase()) {
      case 'belladonna':
        return {
          complementary: "Calcarea Carbonica (chronic of Belladonna)",
          inimical: "Dulcamara, Acetic Acid",
          antidote: "Hyoscyamus, Coffea Cruda, Camphora",
          concordant: "Aconite, Lachesis, Sanguinaria"
        };
      case 'aconite':
        return {
          complementary: "Sulfur (acute of Sulfur), Coffea Cruda",
          inimical: "None major",
          antidote: "Nux Vomica, Belladonna, Camphora",
          concordant: "Spongia, Bryonia, Sulfur"
        };
      case 'pulsatilla':
        return {
          complementary: "Lycopodium, Silicea, Kali Sulphuricum",
          inimical: "None major",
          antidote: "Chamomilla, Coffea, Ignatia, Nux Vomica",
          concordant: "Silicea, Sulfur, Calcarea Carb"
        };
      case 'nux-vomica':
        return {
          complementary: "Sulfur (chronic of Nux Vomica)",
          inimical: "Zincum Metallicum (do not use after Nux)",
          antidote: "Coffea, Chamomilla, Camphora, Wine",
          concordant: "Lycopodium, Arsenicum, Pulsatilla"
        };
      case 'arsenicum-album':
        return {
          complementary: "Psorinum, Thuja, Allium Cepa",
          inimical: "Secale Cornutum",
          antidote: "Nux Vomica, Camphora, Ipecac",
          concordant: "Carbo Veg, Phosphorus, Lachesis"
        };
      default:
        return {
          complementary: "Sulfur",
          inimical: "None listed",
          antidote: "Nux Vomica",
          concordant: "Lycopodium"
        };
    }
  };

  const relationships = getRemedyRelationships(selectedRelationshipRemedy);

  // Filter comparison lists
  const remedyAData = comparisonRemedies.find(r => r.id === compareRemedyA) || comparisonRemedies[0];
  const remedyBData = comparisonRemedies.find(r => r.id === compareRemedyB) || comparisonRemedies[1];

  return (
    <div className="min-h-screen bg-bg-primary pb-24 text-text-primary">
      <SEO 
        title="Disease Hub & Academic Study Suite | Curiva Homoeopathy"
        description="Comprehensive diagnostic, therapeutic, and homoeopathic study dashboard containing interactive disease analyses, MCQs, miasmatic charts, and remedy guides."
      />

      {/* Modern High-Yield Banner */}
      <header className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-[#13222e] to-[#0b1720] dark:from-[#090f13] dark:to-[#04080a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Academic & Clinical Portal
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight uppercase leading-[0.9] mb-4">
            Clinical <span className="text-emerald-400 italic">Disease Hub</span> <br /> & Study Suite
          </h1>
          <p className="text-zinc-400 font-serif italic text-base md:text-lg max-w-3xl leading-relaxed">
            A state-of-the-art interactive companion for BHMS practitioners and postgraduate scholars. Seamlessly transition between structural pathology indexes and classical homoeopathic repertorial analysis.
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-bg-primary/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('clinical')}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
                  activeTab === 'clinical' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-text-secondary hover:text-primary'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Disease Hub</span>
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
                  activeTab === 'academic' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-text-secondary hover:text-primary'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Repertorial & Academic Suite</span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10 shadow-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Live Syllabus Tracker
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* VIEW 1: CLINICAL DISEASE HUB */}
        <AnimatePresence mode="wait">
          {activeTab === 'clinical' && (
            <motion.div
              key="clinical-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-4 gap-8"
            >
              {/* Sidebar list of diseases */}
              <aside className="lg:col-span-1 space-y-4">
                <div className="p-6 bg-bg-secondary rounded-3xl border border-border">
                  <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-primary" /> Select Condition
                  </h3>
                  <div className="space-y-1.5">
                    {diseaseHubData.map(d => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setSelectedDiseaseId(d.id);
                          resetMCQs(d.id);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center justify-between ${
                          selectedDiseaseId === d.id
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-bg-primary text-text-primary border-border hover:border-primary/30 hover:bg-bg-secondary'
                        }`}
                      >
                        <span className="truncate">{d.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-65 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top 10 remedies shortcut box */}
                <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 text-center space-y-4 shadow-sm">
                  <div className="w-10 h-10 bg-emerald-500/15 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">High Yield Resource</h4>
                    <p className="text-xs text-text-secondary font-medium leading-relaxed">
                      Every condition includes an optimized <strong>Top 10 Remedies list</strong> curated from standard classical textbooks.
                    </p>
                  </div>
                </div>
              </aside>

              {/* Central Clinical Workspace */}
              <section className="lg:col-span-3 space-y-10">
                
                {/* 1. Header with title & category */}
                <div className="p-8 bg-bg-secondary border border-border rounded-[2.5rem] relative overflow-hidden shadow-soft">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">{currentDisease.category}</span>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-text-primary mt-4 mb-3 uppercase tracking-tight">{currentDisease.title}</h2>
                  <p className="text-sm font-bold text-text-secondary leading-relaxed max-w-3xl">
                    Follow the standard classical framework of pathology, diagnostics, and therapeutics.
                  </p>
                </div>

                {/* 2. Disease Definition, Causes & Risk Factors */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <Book className="w-4 h-4 text-primary" /> Definition
                    </h3>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed font-serif italic text-justify">
                      &ldquo;{currentDisease.definition}&rdquo;
                    </p>
                  </div>
                  
                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <AlertCircle className="w-4 h-4 text-orange-500" /> Risk Factors
                    </h3>
                    <ul className="space-y-2">
                      {currentDisease.riskFactors.map((r, i) => (
                        <li key={i} className="text-xs font-bold text-text-secondary flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3. Causes & Pathogenesis */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <ListFilter className="w-4 h-4 text-primary" /> Etiology & Causes
                    </h3>
                    <ul className="space-y-3">
                      {currentDisease.causes.map((c, i) => (
                        <li key={i} className="text-xs font-bold text-text-secondary flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <Activity className="w-4 h-4 text-emerald-500" /> Pathogenesis
                    </h3>
                    <p className="text-xs font-bold text-text-secondary leading-relaxed text-justify">
                      {currentDisease.pathogenesis}
                    </p>
                  </div>
                </div>

                {/* 4. Clinical Features & Diagnostics */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <Layers className="w-4 h-4 text-primary" /> Clinical Features
                    </h3>
                    <ul className="space-y-3">
                      {currentDisease.clinicalFeatures.map((f, i) => (
                        <li key={i} className="text-xs font-bold text-text-secondary flex items-start gap-2.5">
                          <span className="w-4.5 h-4.5 rounded-md bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</span>
                          <span className="mt-0.5">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <Search className="w-4 h-4 text-primary" /> Investigations
                    </h3>
                    <ul className="space-y-3">
                      {currentDisease.investigations.map((inv, i) => (
                        <li key={i} className="text-xs font-bold text-text-secondary flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{inv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 5. Differential Diagnosis & Conventional Treatment */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <Users className="w-4 h-4 text-purple-500" /> Differential Diagnosis
                    </h3>
                    <ul className="space-y-3">
                      {currentDisease.differentialDiagnosis.map((dd, i) => (
                        <li key={i} className="text-xs font-bold text-text-secondary flex flex-col gap-1">
                          <span className="text-primary uppercase tracking-wider text-[9px] font-black">{dd.split(':')[0]}</span>
                          <span className="pl-2 border-l border-primary/20 leading-relaxed">{dd.split(':').slice(1).join(':')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4 md:col-span-2">
                    <h3 className="text-lg font-black uppercase tracking-wide text-text-primary flex items-center gap-2 border-b border-border pb-3">
                      <FileText className="w-4 h-4 text-primary" /> Conventional Treatment Overview
                    </h3>
                    <p className="text-xs font-bold text-text-secondary leading-relaxed text-justify">
                      {currentDisease.treatmentOverview}
                    </p>
                    <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 text-[11px] font-bold text-orange-600 flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Note for Practitioners: Modern integrative care advises maintaining close communication regarding taper protocols of conventional therapeutics to avoid withdrawal flareups.</span>
                    </div>
                  </div>
                </div>

                {/* 6. Classical Homoeopathic Approach */}
                <div className="p-8 bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-zinc-900/40 dark:via-zinc-900 dark:to-zinc-900 border border-primary/10 rounded-[2.5rem] shadow-soft space-y-4">
                  <h3 className="text-xl font-display font-black uppercase tracking-wide text-primary flex items-center gap-2 border-b border-border pb-3">
                    <Sparkles className="w-5 h-5 text-accent animate-pulse" /> The Homoeopathic Approach
                  </h3>
                  <p className="text-sm font-bold text-text-secondary leading-relaxed text-justify">
                    {currentDisease.homoeopathicApproach}
                  </p>
                </div>

                {/* 7. Top 10 remedies list for this disease */}
                <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary flex items-center gap-2">
                      <Table className="w-5 h-5 text-primary" /> Top 10 Classical Remedies Collection
                    </h3>
                    <p className="text-xs font-bold text-text-secondary mt-1">
                      Detailed diagnostic profiles of primary homeopathic therapeutic agents for {currentDisease.title}.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {currentDisease.topTenRemedies.map((rem, idx) => (
                      <div key={idx} className="p-6 bg-bg-secondary rounded-3xl border border-border hover:border-primary/20 transition-all space-y-3 shadow-soft relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 rounded-bl-3xl flex items-center justify-center text-[10px] font-black text-primary">
                          #{idx+1}
                        </div>
                        <h4 className="text-sm font-black uppercase text-primary leading-none">{rem.name}</h4>
                        <div className="space-y-1.5 text-xs font-bold text-text-secondary">
                          <p><strong className="text-text-primary">Key Indications:</strong> {rem.keyIndications}</p>
                          <p><strong className="text-text-primary">Modalities:</strong> {rem.modalities}</p>
                          <p><strong className="text-text-primary">Constitution:</strong> {rem.constitution}</p>
                          <p><strong className="text-text-primary">Clinical Pearls & Potency:</strong> {rem.potencyTips}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Quick Revision Box */}
                <div className="p-8 bg-zinc-900 text-white rounded-[3rem] space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-lg font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> High-Yield Revision Box
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">BHMS Rapid Prep</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Key Comparison Pearls</h4>
                      <ul className="space-y-2">
                        {currentDisease.quickRevisionBox.keyNotes.map((note, idx) => (
                          <li key={idx} className="text-xs font-bold text-zinc-200 flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">{idx+1}</span>
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4 text-xs font-bold text-zinc-300">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                        <p><strong className="text-emerald-400 uppercase tracking-wider text-[10px]">Miasmatic Dominance:</strong> {currentDisease.quickRevisionBox.miasmaticDominance}</p>
                        <p><strong className="text-emerald-400 uppercase tracking-wider text-[10px]">Thermal Response:</strong> {currentDisease.quickRevisionBox.thermalState}</p>
                        <p><strong className="text-emerald-400 uppercase tracking-wider text-[10px]">Primary Organ Affinity:</strong> {currentDisease.quickRevisionBox.organAffinity}</p>
                      </div>

                      <div className="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-500/10">
                        <strong className="text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">Study Mnemonic Device</strong>
                        <p className="font-mono text-[11px] text-zinc-200">{currentDisease.quickRevisionBox.memoryMnemonic}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 9. Interactive MCQs */}
                <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-6">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <div>
                      <h3 className="text-xl font-display font-black uppercase tracking-tight text-text-primary flex items-center gap-2">
                        <FileQuestion className="w-5 h-5 text-primary" /> Self-Assessment Examination
                      </h3>
                      <p className="text-xs font-bold text-text-secondary mt-1">High-yield comparative study questions with immediate feedback.</p>
                    </div>
                    <button
                      onClick={() => resetMCQs(currentDisease.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-secondary text-text-secondary hover:text-primary rounded-xl border border-border text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset MCQs
                    </button>
                  </div>

                  <div className="space-y-8">
                    {currentDisease.mcqs.map((q, idx) => {
                      const isGraded = showGrading[q.id];
                      const selectedAns = userAnswers[q.id];
                      return (
                        <div key={q.id} className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black shrink-0">Q{idx+1}</span>
                            <p className="text-sm font-black text-text-primary">{q.question}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 pl-9">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedAns === oIdx;
                              const isCorrect = q.correctAnswer === oIdx;
                              let buttonClass = 'bg-bg-primary border-border text-text-primary hover:border-primary/50';
                              
                              if (isGraded) {
                                if (isCorrect) {
                                  buttonClass = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400';
                                } else if (isSelected) {
                                  buttonClass = 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400';
                                } else {
                                  buttonClass = 'bg-bg-primary border-border text-text-secondary opacity-60';
                                }
                              } else if (isSelected) {
                                buttonClass = 'bg-primary/5 border-primary text-primary';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={isGraded}
                                  onClick={() => handleMCQAnswer(q.id, oIdx)}
                                  className={`p-3.5 rounded-xl text-left text-xs font-bold uppercase tracking-wide border transition-all flex items-center justify-between ${buttonClass}`}
                                >
                                  <span>{opt}</span>
                                  {isGraded && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                                  {isGraded && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                                </button>
                              );
                            })}
                          </div>

                          {isGraded && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="pl-9 text-xs font-bold text-text-secondary border-t border-border pt-3 mt-2 flex gap-2"
                            >
                              <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <p>
                                <strong className="text-text-primary">Clinical Rationale:</strong> {q.explanation}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIEW 2: REPERTORIAL & ACADEMIC STUDY SUITE */}
        <AnimatePresence mode="wait">
          {activeTab === 'academic' && (
            <motion.div
              key="academic-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-4 gap-8"
            >
              {/* Sidebar directory of the 19 optimized features */}
              <aside className="lg:col-span-1 space-y-4">
                <div className="p-6 bg-bg-secondary rounded-3xl border border-border">
                  <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-primary" /> Reference Guides
                  </h3>
                  <div className="space-y-1.5 text-xs font-bold">
                    <button
                      onClick={() => setActiveAcademicSection('relationships')}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-2 ${
                        activeAcademicSection === 'relationships'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-primary text-text-primary border-border hover:border-primary/20'
                      }`}
                    >
                      <GitFork className="w-3.5 h-3.5" />
                      <span>Remedy Relationships</span>
                    </button>

                    <button
                      onClick={() => setActiveAcademicSection('compare')}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-2 ${
                        activeAcademicSection === 'compare'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-primary text-text-primary border-border hover:border-primary/20'
                      }`}
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>Remedy Comparison</span>
                    </button>

                    <button
                      onClick={() => setActiveAcademicSection('repertorial')}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-2 ${
                        activeAcademicSection === 'repertorial'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-primary text-text-primary border-border hover:border-primary/20'
                      }`}
                    >
                      <ListFilter className="w-3.5 h-3.5" />
                      <span>Repertorial Indexes</span>
                    </button>

                    <button
                      onClick={() => setActiveAcademicSection('philosophy')}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-2 ${
                        activeAcademicSection === 'philosophy'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-primary text-text-primary border-border hover:border-primary/20'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Miasms & Philosophies</span>
                    </button>

                    <button
                      onClick={() => setActiveAcademicSection('recall')}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-2 ${
                        activeAcademicSection === 'recall'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-primary text-text-primary border-border hover:border-primary/20'
                      }`}
                    >
                      <Brain className="w-3.5 h-3.5" />
                      <span>Mnemonics & Keynotes</span>
                    </button>

                    <button
                      onClick={() => setActiveAcademicSection('planner')}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center gap-2 ${
                        activeAcademicSection === 'planner'
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-primary text-text-primary border-border hover:border-primary/20'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Study Planner & Collections</span>
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content Pane */}
              <section className="lg:col-span-3 space-y-8">
                
                {/* SUBSECTION: REMEDY RELATIONSHIPS */}
                {activeAcademicSection === 'relationships' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div>
                        <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                          <GitFork className="w-5 h-5 text-primary" /> Remedy Relationship Concordance Network
                        </h3>
                        <p className="text-xs font-bold text-text-secondary mt-1">
                          Map interactions between homeopathic remedies: Complementaries, Inimicals, and Antidotes.
                        </p>
                      </div>
                      
                      <select
                        value={selectedRelationshipRemedy}
                        onChange={(e) => setSelectedRelationshipRemedy(e.target.value)}
                        className="bg-bg-secondary border border-border rounded-xl p-2 text-xs font-bold"
                      >
                        <option value="belladonna">Belladonna</option>
                        <option value="aconite">Aconite</option>
                        <option value="pulsatilla">Pulsatilla</option>
                        <option value="nux-vomica">Nux Vomica</option>
                        <option value="arsenicum-album">Arsenicum Album</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 text-center">
                      <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/15">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block mb-2">Complementary</strong>
                        <p className="text-xs font-black text-text-primary">{relationships.complementary}</p>
                        <span className="text-[9px] text-text-secondary font-medium mt-2 block">Completes the clinical action</span>
                      </div>
                      <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/15">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-rose-600 block mb-2">Inimical (Incompatible)</strong>
                        <p className="text-xs font-black text-text-primary">{relationships.inimical}</p>
                        <span className="text-[9px] text-text-secondary font-medium mt-2 block">Adversely affects patient if paired</span>
                      </div>
                      <div className="p-5 bg-orange-500/5 rounded-2xl border border-orange-500/15">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-orange-600 block mb-2">Antidote</strong>
                        <p className="text-xs font-black text-text-primary">{relationships.antidote}</p>
                        <span className="text-[9px] text-text-secondary font-medium mt-2 block">Neutralizes overdose or bad effects</span>
                      </div>
                      <div className="p-5 bg-primary/5 rounded-2xl border border-primary/15">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-primary block mb-2">Concordant (Compatible)</strong>
                        <p className="text-xs font-black text-text-primary">{relationships.concordant}</p>
                        <span className="text-[9px] text-text-secondary font-medium mt-2 block">Closely allied clinical actions</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUBSECTION: COMPARISON WORKSPACE */}
                {activeAcademicSection === 'compare' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                        <Table className="w-5 h-5 text-primary" /> Side-by-Side Remedy comparison Desk
                      </h3>
                      <p className="text-xs font-bold text-text-secondary mt-1">
                        Select any two major remedies to evaluate differential diagnostic metrics instantly.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-bg-secondary p-4 rounded-2xl border border-border justify-around">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs uppercase text-text-secondary tracking-wider">Remedy A:</strong>
                        <select
                          value={compareRemedyA}
                          onChange={(e) => setCompareRemedyA(e.target.value)}
                          className="bg-bg-primary border border-border rounded-xl p-2 text-xs font-bold"
                        >
                          {comparisonRemedies.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <strong className="text-xs uppercase text-text-secondary tracking-wider">Remedy B:</strong>
                        <select
                          value={compareRemedyB}
                          onChange={(e) => setCompareRemedyB(e.target.value)}
                          className="bg-bg-primary border border-border rounded-xl p-2 text-xs font-bold"
                        >
                          {comparisonRemedies.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-border rounded-3xl">
                      <table className="w-full text-xs font-bold text-text-secondary text-left border-collapse">
                        <thead>
                          <tr className="bg-bg-secondary text-text-primary uppercase tracking-widest text-[9px] border-b border-border">
                            <th className="p-4">Attributes</th>
                            <th className="p-4 border-l border-border text-primary">{remedyAData.name}</th>
                            <th className="p-4 border-l border-border text-primary">{remedyBData.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Source / Origin</td>
                            <td className="p-4 border-l border-border">{remedyAData.origin}</td>
                            <td className="p-4 border-l border-border">{remedyBData.origin}</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Therapeutic Class</td>
                            <td className="p-4 border-l border-border">{remedyAData.category}</td>
                            <td className="p-4 border-l border-border">{remedyBData.category}</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Thermal Response</td>
                            <td className="p-4 border-l border-border">
                              <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/5 text-red-600 px-2 py-0.5 rounded border border-red-500/10">
                                <Flame className="w-3 h-3" /> {remedyAData.thermal}
                              </span>
                            </td>
                            <td className="p-4 border-l border-border">
                              <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/5 text-red-600 px-2 py-0.5 rounded border border-red-500/10">
                                <Flame className="w-3 h-3" /> {remedyBData.thermal}
                              </span>
                            </td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Thirst Sensation</td>
                            <td className="p-4 border-l border-border">{remedyAData.thirst}</td>
                            <td className="p-4 border-l border-border">{remedyBData.thirst}</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Ameliorating Modalities</td>
                            <td className="p-4 border-l border-border">
                              <ul className="list-disc pl-4 space-y-1">
                                {remedyAData.betterWith.map((b, i) => <li key={i}>{b}</li>)}
                              </ul>
                            </td>
                            <td className="p-4 border-l border-border">
                              <ul className="list-disc pl-4 space-y-1">
                                {remedyBData.betterWith.map((b, i) => <li key={i}>{b}</li>)}
                              </ul>
                            </td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Aggravating Modalities</td>
                            <td className="p-4 border-l border-border">
                              <ul className="list-disc pl-4 space-y-1">
                                {remedyAData.worseWith.map((w, i) => <li key={i}>{w}</li>)}
                              </ul>
                            </td>
                            <td className="p-4 border-l border-border">
                              <ul className="list-disc pl-4 space-y-1">
                                {remedyBData.worseWith.map((w, i) => <li key={i}>{w}</li>)}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 bg-bg-secondary/30 text-text-primary">Key Diagnostic Difference</td>
                            <td className="p-4 border-l border-border italic text-text-primary">{remedyAData.keyDifference}</td>
                            <td className="p-4 border-l border-border italic text-text-primary">{remedyBData.keyDifference}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* SUBSECTION: REPERTORIAL INDEXES */}
                {activeAcademicSection === 'repertorial' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Organ-wise & Causation grids */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                        <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2 border-b border-border pb-3">
                          <Activity className="w-4 h-4 text-primary" /> Organ-wise Remedy Index
                        </h3>
                        <div className="space-y-3 text-xs font-bold">
                          {organRemedyIndex.map((ori, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-bg-secondary rounded-2xl border border-border">
                              <span className="text-text-primary">{ori.organ}</span>
                              <div className="flex flex-wrap gap-1">
                                {ori.remedies.map((rem, ri) => (
                                  <span key={ri} className="bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded text-[10px]">{rem}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                        <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2 border-b border-border pb-3">
                          <Compass className="w-4 h-4 text-orange-500" /> Remedy by Causation (Triggers)
                        </h3>
                        <div className="space-y-3 text-xs font-bold">
                          {causationRemedies.map((cr, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-bg-secondary rounded-2xl border border-border">
                              <span className="text-text-primary">{cr.cause}</span>
                              <div className="flex flex-wrap gap-1">
                                {cr.remedies.map((rem, ri) => (
                                  <span key={ri} className="bg-orange-500/5 text-orange-600 border border-orange-500/10 px-2 py-0.5 rounded text-[10px]">{rem}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mentals & Pathological diagnostics grids */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                        <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2 border-b border-border pb-3">
                          <Brain className="w-4 h-4 text-purple-500" /> Remedy by Mental Symptoms
                        </h3>
                        <div className="space-y-3 text-xs font-bold">
                          {mentalSymptoms.map((ms, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-bg-secondary rounded-2xl border border-border">
                              <span className="text-text-primary">{ms.symptom}</span>
                              <div className="flex flex-wrap gap-1">
                                {ms.remedies.map((rem, ri) => (
                                  <span key={ri} className="bg-purple-500/5 text-purple-600 border border-purple-500/10 px-2 py-0.5 rounded text-[10px]">{rem}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                        <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2 border-b border-border pb-3">
                          <Shield className="w-4 h-4 text-emerald-500" /> Remedy by Pathological Diagnosis
                        </h3>
                        <div className="space-y-3 text-xs font-bold">
                          {pathologicalDiagnoses.map((pd, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-bg-secondary rounded-2xl border border-border">
                              <span className="text-text-primary">{pd.diagnosis}</span>
                              <div className="flex flex-wrap gap-1">
                                {pd.remedies.map((rem, ri) => (
                                  <span key={ri} className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 px-2 py-0.5 rounded text-[10px]">{rem}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Modalities Library */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2">
                            <ListFilter className="w-4 h-4 text-primary" /> Modalities Library (A-Z)
                          </h3>
                          <p className="text-xs font-bold text-text-secondary mt-1">Search or filter remedies by aggravating and ameliorating conditions.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setModalityFilter('all')}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              modalityFilter === 'all' ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border'
                            }`}
                          >
                            All Modalities
                          </button>
                          <button
                            onClick={() => setModalityFilter('better')}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              modalityFilter === 'better' ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border'
                            }`}
                          >
                            Better With
                          </button>
                          <button
                            onClick={() => setModalityFilter('worse')}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              modalityFilter === 'worse' ? 'bg-primary text-white border-primary' : 'bg-bg-secondary text-text-secondary border-border'
                            }`}
                          >
                            Worse With
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {comparisonRemedies.map((r) => {
                          const betterList = modalityFilter !== 'worse' ? r.betterWith : [];
                          const worseList = modalityFilter !== 'better' ? r.worseWith : [];
                          
                          if (betterList.length === 0 && worseList.length === 0) return null;

                          return (
                            <div key={r.id} className="p-5 bg-bg-secondary rounded-2xl border border-border space-y-3">
                              <h4 className="text-xs font-black uppercase text-primary border-b border-border pb-1.5">{r.name}</h4>
                              {betterList.length > 0 && (
                                <div className="text-[10px] font-bold text-text-secondary space-y-1">
                                  <span className="text-emerald-600 block font-black uppercase tracking-widest text-[8px]">&bull; Better With (Amelioration):</span>
                                  <p className="pl-2 border-l border-emerald-500/20">{betterList.join(', ')}</p>
                                </div>
                              )}
                              {worseList.length > 0 && (
                                <div className="text-[10px] font-bold text-text-secondary space-y-1">
                                  <span className="text-rose-600 block font-black uppercase tracking-widest text-[8px]">&bull; Worse With (Aggravation):</span>
                                  <p className="pl-2 border-l border-rose-500/20">{worseList.join(', ')}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filter thermal, cravings, and side affinities */}
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Thermal Filter block */}
                      <div className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-3 shadow-soft">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-red-500" /> Remedy by Thermal State
                        </strong>
                        <div className="space-y-2 text-xs font-bold text-text-secondary">
                          <div className="p-3 bg-bg-primary rounded-xl border border-border">
                            <span className="text-rose-600 uppercase tracking-wider text-[9px] font-black block">Chilly Remedies</span>
                            <p className="mt-1">Aconite, Arnica, Arsenicum, Calcarea Carb, Hepar Sulph, Silicea, Nux Vomica</p>
                          </div>
                          <div className="p-3 bg-bg-primary rounded-xl border border-border">
                            <span className="text-orange-600 uppercase tracking-wider text-[9px] font-black block">Hot Remedies</span>
                            <p className="mt-1">Apis, Pulsatilla, Sulphur, Lachesis, Bryonia, Lycopodium</p>
                          </div>
                        </div>
                      </div>

                      {/* Cravings & Aversions Filter block */}
                      <div className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-3 shadow-soft">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                          <Coffee className="w-3.5 h-3.5 text-orange-500" /> Cravings & Aversions
                        </strong>
                        <div className="space-y-2 text-xs font-bold text-text-secondary">
                          <div className="p-3 bg-bg-primary rounded-xl border border-border">
                            <span className="text-orange-600 uppercase tracking-wider text-[9px] font-black block">Craves Sweets</span>
                            <p className="mt-1">Lycopodium, Sulphur, Argentum Nit, Calcarea Carb</p>
                          </div>
                          <div className="p-3 bg-bg-primary rounded-xl border border-border">
                            <span className="text-orange-600 uppercase tracking-wider text-[9px] font-black block">Craves Salt</span>
                            <p className="mt-1">Natrum Muriaticum, Phosphorus, Medorrhinum</p>
                          </div>
                        </div>
                      </div>

                      {/* Side Affinity Filter block */}
                      <div className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-3 shadow-soft">
                        <strong className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-purple-500" /> Side Affinity (Left vs. Right)
                        </strong>
                        <div className="space-y-2 text-xs font-bold text-text-secondary">
                          <div className="p-3 bg-bg-primary rounded-xl border border-border">
                            <span className="text-purple-600 uppercase tracking-wider text-[9px] font-black block">Left-Sided Remedies</span>
                            <p className="mt-1">Lachesis, Spigelia, Thuja, Phosphoric Acid, Sepia</p>
                          </div>
                          <div className="p-3 bg-bg-primary rounded-xl border border-border">
                            <span className="text-purple-600 uppercase tracking-wider text-[9px] font-black block">Right-Sided Remedies</span>
                            <p className="mt-1">Sanguinaria, Lycopodium, Belladonna, Apis Mellifica</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUBSECTION: MIASMS & CLASSICAL THEORIES */}
                {activeAcademicSection === 'philosophy' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Constitution Guide */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" /> Constitution Guide (Grauvogl & Hahnemannian classification)
                      </h3>
                      <p className="text-xs font-bold text-text-secondary">Detailed physical and psychological phenotypes mapping specific disease susceptibilities.</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {constitutionGuide.map((cg, i) => (
                          <div key={i} className="p-5 bg-bg-secondary rounded-3xl border border-border space-y-2">
                            <h4 className="text-sm font-black uppercase text-primary">{cg.type}</h4>
                            <div className="text-xs font-bold text-text-secondary space-y-1">
                              <p><strong className="text-text-primary">Physique:</strong> {cg.physique}</p>
                              <p><strong className="text-text-primary">Clinical Pathology:</strong> {cg.pathology}</p>
                              <p><strong className="text-text-primary">Core Psychology:</strong> {cg.psychology}</p>
                              <p><strong className="text-primary uppercase text-[9px] tracking-wider">Prototype Remedy:</strong> {cg.remedy}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Miasm Comparative Chart */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" /> Miasm Reference Charts (The Three Chronic Miasms)
                      </h3>
                      <p className="text-xs font-bold text-text-secondary">Understanding fundamental chronic vulnerabilities as outlined by Dr. Samuel Hahnemann.</p>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        {miasmsData.map((miasm, i) => (
                          <div key={i} className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-3 relative overflow-hidden">
                            <span className="text-[8px] bg-primary/10 border border-primary/20 px-2 py-0.5 rounded font-black uppercase tracking-widest absolute top-4 right-4">Miasm</span>
                            <h4 className="text-sm font-black uppercase text-primary leading-none pr-10">{miasm.name}</h4>
                            <div className="space-y-1.5 text-xs font-bold text-text-secondary">
                              <p><strong className="text-text-primary">Hahnemannian Deficit:</strong> {miasm.deficit}</p>
                              <p><strong className="text-text-primary">Mental Temperament:</strong> {miasm.temperament}</p>
                              <p><strong className="text-text-primary">Skin Manifestations:</strong> {miasm.skin}</p>
                              <p><strong className="text-text-primary">Sensation of Pain:</strong> {miasm.pain}</p>
                              <p><strong className="text-text-primary">Secretions:</strong> {miasm.secretions}</p>
                              <div className="pt-2">
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest block mb-1">Key Antimiasmatic Remedies:</span>
                                <div className="flex flex-wrap gap-1">
                                  {miasm.remedies.map((rem, ri) => (
                                    <span key={ri} className="bg-primary/5 text-primary border border-primary/10 px-1.5 py-0.2 rounded text-[10px]">{rem}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kent Philosophy & Boericke Quick Reference Pages */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                        <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2 border-b border-border pb-3">
                          <Book className="w-4 h-4 text-primary" /> Kent Philosophy Summaries
                        </h3>
                        <div className="space-y-4 text-xs font-bold text-text-secondary">
                          {kentPhilosophy.map((kp, i) => (
                            <div key={i} className="space-y-1">
                              <h4 className="text-xs font-black text-text-primary uppercase tracking-wide">{kp.topic}</h4>
                              <p className="italic font-medium">{kp.description}</p>
                              <ul className="list-disc pl-4 space-y-1.5 pt-1.5">
                                {kp.details.map((det, di) => <li key={di}>{det}</li>)}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                        <h3 className="text-lg font-black uppercase text-text-primary flex items-center gap-2 border-b border-border pb-3">
                          <FileText className="w-4 h-4 text-primary" /> Boericke Quick-Reference Pages
                        </h3>
                        <div className="space-y-4">
                          {boerickePages.map((bp, i) => (
                            <div key={i} className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-1.5">
                              <h4 className="text-xs font-black uppercase text-primary">{bp.remedy}</h4>
                              <div className="text-[11px] font-bold text-text-secondary space-y-1">
                                <p><strong className="text-text-primary">System Affinity:</strong> {bp.affinity}</p>
                                <p><strong className="text-text-primary">Clinical Indications:</strong> {bp.clinicalIndications}</p>
                                <p className="italic text-primary"><strong className="text-text-primary">Materia Medica Pearl:</strong> {bp.keynotePearl}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUBSECTION: RECALL & MEMORIZATION */}
                {activeAcademicSection === 'recall' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Allen's Keynotes Revision Cards */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <div>
                        <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                          <Brain className="w-5 h-5 text-primary" /> Allen's Keynotes Revision Cards (Active Recall)
                        </h3>
                        <p className="text-xs font-bold text-text-secondary mt-1">Click on any card to flip and test your memorization of classical keynotes.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 pt-4">
                        {allensKeynotes.map((card) => {
                          const isFlipped = flippedCard === card.remedy;
                          return (
                            <div
                              key={card.remedy}
                              onClick={() => setFlippedCard(isFlipped ? null : card.remedy)}
                              className="h-64 cursor-pointer relative perspective-1000"
                            >
                              <div className={`w-full h-full duration-500 transform-style-preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
                                {/* Front Face */}
                                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1c3244] to-[#122330] dark:from-[#0a1218] dark:to-[#04080b] p-8 rounded-[2.5rem] border border-border text-center flex flex-col justify-center items-center space-y-3 shadow-lg">
                                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Allen's Keynotes</span>
                                  <h4 className="text-xl font-display font-black text-white uppercase">{card.remedy}</h4>
                                  <div className="inline-flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-300">
                                    Click to Flip <RefreshCw className="w-3 h-3 animate-spin-slow" />
                                  </div>
                                </div>

                                {/* Back Face */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-bg-secondary p-8 rounded-[2.5rem] border border-primary/20 flex flex-col justify-center space-y-3 shadow-lg">
                                  <strong className="text-[10px] font-black uppercase tracking-widest text-primary">High-Yield Keynotes:</strong>
                                  <ul className="space-y-1.5 text-xs font-bold text-text-secondary">
                                    {card.keynotes.map((note, ni) => (
                                      <li key={ni} className="flex items-start gap-1.5">
                                        <CornerDownRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                        <span>{note}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Remedy Memory Tricks & Mnemonics */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" /> Remedy Memory Tricks & Mnemonics
                      </h3>
                      <p className="text-xs font-bold text-text-secondary">Mnemonic devices mapped to standard clinical symptoms for easy memory retention.</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {remedyMemoryTricks.map((trick, i) => (
                          <div key={i} className="p-5 bg-bg-secondary rounded-3xl border border-border space-y-2">
                            <h4 className="text-xs font-black uppercase text-primary">{trick.remedy} Mnemonics</h4>
                            <p className="font-mono text-xs text-text-primary bg-bg-primary p-4 rounded-xl border border-border leading-relaxed text-justify">
                              {trick.trick}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Remedy Family Trees */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                        <GitFork className="w-5 h-5 text-primary" /> Remedy Family Trees & Taxonomic Groups
                      </h3>
                      <p className="text-xs font-bold text-text-secondary">Understand remedy groups by their biological and chemical origins (Solanaceae, Compositae, Halogens, etc.).</p>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        {remedyFamilyTrees.map((tree, i) => (
                          <div key={i} className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-2">
                            <h4 className="text-sm font-black uppercase text-primary">{tree.family}</h4>
                            <p className="text-xs font-medium text-text-secondary leading-relaxed italic">{tree.attribute}</p>
                            <div className="pt-2 border-t border-border mt-2 space-y-1">
                              <span className="text-[9px] font-black text-text-primary uppercase tracking-widest block">Group Remedies:</span>
                              <div className="flex flex-wrap gap-1">
                                {tree.remedies.map((rem, ri) => (
                                  <span key={ri} className="bg-primary/5 text-primary border border-primary/10 px-1.5 py-0.2 rounded text-[10px]">{rem}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUBSECTION: STUDY PLANNER & COLLECTIONS */}
                {activeAcademicSection === 'planner' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Materia Medica Revision Calendar */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <div>
                        <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" /> Materia Medica Study Revision Calendar
                        </h3>
                        <p className="text-xs font-bold text-text-secondary mt-1">A weekly structured curriculum for standard BHMS exam preparation.</p>
                      </div>

                      <div className="grid sm:grid-cols-4 md:grid-cols-7 gap-4 pt-4">
                        {studyCalendar.map((sc, i) => (
                          <div key={i} className="p-4 bg-bg-secondary rounded-2xl border border-border text-center space-y-2 flex flex-col justify-between hover:border-primary/20 transition-all shadow-soft">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-border pb-1 block">{sc.day}</span>
                            <p className="text-[10px] font-bold text-text-secondary leading-snug">{sc.focus}</p>
                            <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded px-1.5 py-0.5 mt-2 inline-block font-black uppercase">Active</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Disease-wise Remedy Collections */}
                    <div className="p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft space-y-4">
                      <div>
                        <h3 className="text-xl font-display font-black uppercase text-text-primary flex items-center gap-2">
                          <Layers className="w-5 h-5 text-primary" /> Disease-wise Remedy Collections
                        </h3>
                        <p className="text-xs font-bold text-text-secondary mt-1">Grouped clinical indexes mapping target physiological organ systems to key therapeutics.</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 pt-4">
                        {diseaseWiseRemedyCollections.map((col, i) => (
                          <div key={i} className="p-6 bg-bg-secondary rounded-3xl border border-border space-y-3 shadow-soft">
                            <h4 className="text-sm font-black uppercase text-primary border-b border-border pb-2 flex items-center gap-2">
                              <Activity className="w-4 h-4" /> {col.system}
                            </h4>
                            <div className="space-y-2">
                              {col.remedies.map((rem, ri) => (
                                <div key={ri} className="text-xs font-bold text-text-secondary">
                                  <strong className="text-text-primary">{rem.name}:</strong>
                                  <p className="pl-2 border-l border-primary/20 text-[11px] leading-snug mt-0.5">{rem.indication}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

              </section>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
