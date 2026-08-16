import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Sliders, RotateCcw, AlertCircle, Search, 
  HelpCircle, ArrowRight, ChevronLeft, ChevronRight, Info, ShieldAlert, Award, FileText, Check
} from 'lucide-react';
import SEO from '../components/SEO';

interface ParameterDetail {
  name: string;
  shortName: string;
  range: string;
  desc: string;
  high: string;
  low: string;
  exam: string;
  miasm: string;
}

const PARAMETERS_DATA: Record<'rbc' | 'wbc' | 'plt', ParameterDetail[]> = {
  rbc: [
    {
      name: 'Erythrocyte Mass',
      shortName: 'RBC Count',
      range: '4.1 - 5.9 M/μL',
      desc: 'Quantifies total red blood cells in the circulating volume. Essential for structural oxygen distribution throughout systemic tissue beds.',
      high: 'Dehydration, chronic hypoxia, sleep apnea, Polycythemia Vera.',
      low: 'Anemias, nutritional deficits, hemolysis, acute/chronic blood loss.',
      exam: 'Know differences between relative dehydration-based polycythemia and bone marrow driven vera.',
      miasm: 'Psora (Relative high H2O loss) vs Sycosis (proliferative vera).'
    },
    {
      name: 'Hemoglobin',
      shortName: 'Hb',
      range: '12.0 - 17.5 g/dL',
      desc: 'Oxygen-carrying metalloprotein within red cells. The gold-standard diagnostic marker for classifying grade of anemia.',
      high: 'COPD, smoking, high altitudes, tumor EPO.',
      low: 'Nutritional anemias, hemodilution, kidney disorders, chronic disease.',
      exam: 'Remember the physiological difference: Estrogen inhibits vs. Testosterone stimulates erythropoiesis.',
      miasm: 'Syphilitic miasm leads to destructive severe low hemoglobin values.'
    },
    {
      name: 'Hematocrit',
      shortName: 'Hct / PCV',
      range: '36% - 50%',
      desc: 'Percentage of blood volume made of red blood cells. Drives absolute blood thickness/viscosity and is key for evaluating shock states.',
      high: 'Dehydration, burns, dengue shock plasma leakage.',
      low: 'Hemorrhages, hemodilution, aplastic states.',
      exam: 'Formula: PCV (%) ≈ Hb (g/dL) x 3. Vital indicator in hemorrhagic fevers.',
      miasm: 'Functional fluctuation relates to Psora; sudden shock-based hemoconcentration is Psoro-Syphilitic.'
    },
    {
      name: 'Mean Corpuscular Volume',
      shortName: 'MCV',
      range: '80 - 100 fL',
      desc: 'Average volume/size of red cells. Used to clinically segment anemia into microcytic, normocytic, or macrocytic.',
      high: 'Vitamin B12 or Folate deficiency, thyroid disease, alcoholism.',
      low: 'Iron deficiency, thalassemia trait, lead poisoning.',
      exam: 'Mnemonic: TAILS for microcytic anemias (Thalassemia, ACD, IDA, Lead, Sideroblastic).',
      miasm: 'Structural expansion suggests macrocytosis (Psora-Syphilis); microcytic reduction mimics Sycosis/Syphilis.'
    },
    {
      name: 'Red Cell Distribution Width',
      shortName: 'RDW',
      range: '11.5% - 14.5%',
      desc: 'Measures cell size variation (anisocytosis). Crucial tool to distinguish IDA (High RDW) from Thalassemia (Normal RDW).',
      high: 'Nutritional deficits (IDA, mixed B12/Iron), post-transfusion.',
      low: 'Thalassemia minor, uncomplicated chronic anemia.',
      exam: 'Understand why RDW goes high *first* during early iron deficiency before the MCV drops below 80.',
      miasm: 'Unordered size irregularity (anisocytosis) reflects Psora-Syphilis disharmony.'
    },
    {
      name: 'Reticulocyte Count',
      shortName: 'Retics',
      range: '0.5% - 2.5%',
      desc: 'Percentage of immature RBCs in systemic circulation. A direct measure of bone marrow erythropoiesis activity and compensation status.',
      high: 'Hemolysis, acute bleeding, response to iron therapy.',
      low: 'Aplastic anemia, nutritional anemia, kidney disease.',
      exam: 'Anemia with high retic indicates hemolytic source or active blood loss (regenerative).',
      miasm: 'Hyperactive marrow replenishment corresponds to active Psora.'
    }
  ],
  wbc: [
    {
      name: 'Total Leukocyte Count',
      shortName: 'TLC',
      range: '4,000 - 11,000 /μL',
      desc: 'Measures overall WBC volume. Reflects current inflammatory and systemic immune reactions against pathogens.',
      high: 'Acute bacterial infection, severe tissue death, myeloproliferative.',
      low: 'Viral infections (Typhoid, Dengue), bone marrow failure.',
      exam: 'Dynamic leukocyte response can fluctuate heavily within hours. Follow up with differential count.',
      miasm: 'Acute defensive surge is Psora; proliferative expansion is Sycosis.'
    },
    {
      name: 'Polymorphs',
      shortName: 'Neutrophils',
      range: '40% - 70%',
      desc: 'First responders of the innate immune system. They engulf and destroy extracellular pathogens via oxidative bursts.',
      high: 'Pyogenic bacterial infections, acute physical trauma.',
      low: 'Sepsis exhaustion, viral agents, drug-induced.',
      exam: 'Associated with acute Psora flare-ups. Key remedies: Pyrogen, Belladonna, Merc sol.',
      miasm: 'Acute purulent inflammatory states are mostly Psoric-Sycosic.'
    },
    {
      name: 'Lymphoid Lineage',
      shortName: 'Lymphocytes',
      range: '20% - 40%',
      desc: 'Directs the adaptive immune response. Includes T-cells (cell-mediated) and B-cells (humoral antibody production).',
      high: 'Viral infections (mumps, rubella), pertussis, chronic lymphocytic leukemia.',
      low: 'HIV/AIDS, immunosuppressants, prolonged severe stress.',
      exam: 'Atypical lymphocytes suggest infectious mononucleosis (Epstein-Barr Virus).',
      miasm: 'Lymphoid chronicity and gland involvement map to the Tubercular Miasm.'
    },
    {
      name: 'Granulocytes',
      shortName: 'Eosinophils',
      range: '1% - 6%',
      desc: 'Primary protectors against multicellular helminth parasites and crucial modulators of allergic hypersensitivity responses.',
      high: 'Asthma, eczema, parasitic infections, drug reactions.',
      low: 'Corticosteroids, high-stress states, Cushing syndrome.',
      exam: 'Mnemonic: NAACP for eosinophilia (Neoplasm, Asthma, Allergy, Collagen vascular, Parasites).',
      miasm: 'Strongly linked with active Tubercular miasms. Important remedies: Cina, Sabadilla.'
    }
  ],
  plt: [
    {
      name: 'Thrombocyte Count',
      shortName: 'Platelets',
      range: '150,000 - 450,000 /μL',
      desc: 'Discoid cell fragments that initiate blood coagulation and maintain physical vascular integrity.',
      high: 'Inflammation, iron deficiency, splenectomy, essential thrombocythemia.',
      low: 'Dengue fever, ITP, chemotherapy, severe blood infections, bone marrow failure.',
      exam: 'Platelet destruction points to the destructive Syphilitic miasm. Key bleeding remedies: Crotalus, Lachesis.',
      miasm: 'Disorganized clotting relates to Sycosis; hemorrhage and cell death reflect Syphilis.'
    }
  ]
};

const INSTAGRAM_SLIDES = [
  {
    title: "How to Read a CBC Report Like a Pro!",
    subtitle: "The Ultimate Step-by-Step Guide for BHMS Students & Practitioners.",
    bullets: [
      "🚀 Master absolute parameters & cellular morphology.",
      "🌿 Map laboratory results straight to homoeopathic miasms.",
      "📌 Save this post & study along!"
    ]
  },
  {
    title: "The Core Lineage Trio",
    subtitle: "The three central pillars suspended in circulating plasma:",
    bullets: [
      "🔴 Erythrocytes (RBCs): Oxygen delivery & respiration status.",
      "⚪ Leukocytes (WBCs): Core active defense against cellular invaders.",
      "💎 Thrombocytes (Platelets): Clotting and structural vascular maintenance."
    ]
  },
  {
    title: "Hemoglobin (Hb) & Packed Cell (PCV) Hematocrit",
    subtitle: "Your direct window to oxygen status & plasma viscosity:",
    bullets: [
      "📉 Low Hemoglobin: Confirms anemia (mild vs. moderate vs. severe).",
      "📈 Rising Hematocrit (>20% change): Critical warning sign of vascular fluid leakage in hemorrhagic fevers (e.g. Dengue)."
    ]
  },
  {
    title: "Decoding the Cellular Indices",
    subtitle: "Never check Hemoglobin without evaluating size and color metrics:",
    bullets: [
      "📏 MCV (Volume/Size): Tells you if cells are microcytic (<80 fL) or macrocytic (>100 fL).",
      "🎨 MCH & MCHC: Measures actual hemoglobin density, defining hypochromic vs normochromic states."
    ]
  },
  {
    title: "The Power of RDW (Red Cell Width)",
    subtitle: "A silent hero in distinguishing microcytic anemias:",
    bullets: [
      "📈 High RDW + Low MCV: Standard Iron Deficiency Anemia (IDA).",
      "⚖️ Normal RDW + Low MCV: Thalassemia Minor (carrier state).",
      "⚠️ Practice Pearl: Never load a thalassemia carrier with iron supplements!"
    ]
  },
  {
    title: "White Blood Cells (TLC)",
    subtitle: "A high-level view of active immune responses:",
    bullets: [
      "📈 Leukocytosis (>11,000 /μL): Active bacterial invaders, tissue necrosis, or stress response.",
      "📉 Leukopenia (<4,000 /μL): Seen in viral states (e.g., Dengue, Typhoid), immune disorders, or bone marrow exhaustion."
    ]
  },
  {
    title: "The Differential Count (DLC)",
    subtitle: "Pinpointing the exact division fighting the battle:",
    bullets: [
      "⚡ Neutrophils (40-70%): High in acute bacterial invasion.",
      "🦠 Lymphocytes (20-40%): High in viral triggers.",
      "🍓 Eosinophils (1-6%): High in allergies & parasites (Tubercular miasm)."
    ]
  },
  {
    title: "The Platelet Clue",
    subtitle: "Clotting status and severe miasmatic markers:",
    bullets: [
      "📉 Thrombocytopenia (<150k): Bleeding risks. Heavily associated with Syphilitic destruction.",
      "🔑 Top Therapeutics: Phosphorus, Lachesis mutus, Crotalus horridus, Hamamelis."
    ]
  },
  {
    title: "Microscope Smears (PBS)",
    subtitle: "What the automation can't show you, visual analysis reveals:",
    bullets: [
      "🎯 Target Cells: Thalassemia, liver disorders.",
      "🔴 Spherocytes: Hereditary spherocytosis, hemolytic anemia.",
      "🔬 Hypersegmented Neutrophils: Classic B12 / Folate deficiency."
    ]
  },
  {
    title: "Step-by-Step Interpretation",
    subtitle: "Build a reliable clinical habit sequence:",
    bullets: [
      "1️⃣ Evaluate Hb & Hematocrit first.",
      "2️⃣ Check MCV & RDW to define anemia patterns.",
      "3️⃣ Look at WBC & DLC to identify infectious/inflammatory states.",
      "4️⃣ Assess Platelet lines to evaluate bleeding risks."
    ]
  },
  {
    title: "Clinical Patterns to Remember",
    subtitle: "Classic diagnostic correlations in hematology:",
    bullets: [
      "📉 Low Hb + Low MCV + High RDW ➔ Iron Deficiency Anemia.",
      "📈 High WBC + Neutrophilia + Left Shift ➔ Acute Bacterial Infection.",
      "🐛 High Eosinophils ➔ Active allergy / Asthma / Parasites."
    ]
  },
  {
    title: "Rapid Revision Sheet",
    subtitle: "Quick-reference parameters for your pathology exam:",
    bullets: [
      "📌 Normal Hb: 12-17.5 g/dL | Normal WBC: 4k-11k | Normal Platelets: 150k-450k.",
      "🎓 Remember the relative WBC distribution: Never Let Monkeys Eat Bananas!",
      "📥 Save this post to study before your upcoming BHMS Vivas!"
    ]
  }
];

export default function CbcHandbook() {
  // Slider states
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<'adult' | 'child'>('adult');
  const [hb, setHb] = useState(14.5);
  const [mcv, setMcv] = useState(90);
  const [rdw, setRdw] = useState(13.0);
  const [wbc, setWbc] = useState(7500);
  const [eos, setEos] = useState(3);
  const [plt, setPlt] = useState(250000);

  // Search & tab states for Handbook section
  const [activeTab, setActiveTab] = useState<'rbc' | 'wbc' | 'plt'>('rbc');
  const [searchTerm, setSearchTerm] = useState('');

  // Flipped state for Flashcards
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Slide Deck state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Diagnostic Presets loader
  const handleLoadPreset = (key: 'normal' | 'ida' | 'thal' | 'megalo' | 'sepsis' | 'allergy' | 'thrombo') => {
    const presets = {
      normal: { hb: 14.5, mcv: 90, rdw: 13.0, wbc: 7500, plt: 250000, eos: 3 },
      ida: { hb: 9.2, mcv: 71, rdw: 17.5, wbc: 6200, plt: 410000, eos: 2 },
      thal: { hb: 10.1, mcv: 64, rdw: 13.2, wbc: 5800, plt: 220000, eos: 1 },
      megalo: { hb: 8.5, mcv: 115, rdw: 16.2, wbc: 3800, plt: 130000, eos: 2 },
      sepsis: { hb: 12.8, mcv: 88, rdw: 12.8, wbc: 18500, plt: 320000, eos: 1 },
      allergy: { hb: 13.5, mcv: 90, rdw: 13.0, wbc: 9200, plt: 260000, eos: 14 },
      thrombo: { hb: 11.2, mcv: 85, rdw: 13.5, wbc: 3100, plt: 18000, eos: 2 }
    };
    const config = presets[key];
    setHb(config.hb);
    setMcv(config.mcv);
    setRdw(config.rdw);
    setWbc(config.wbc);
    setPlt(config.plt);
    setEos(config.eos);
  };

  // Real-time calculations derived from states
  const refHbMin = useMemo(() => {
    if (age === 'child') return 11.0;
    return sex === 'male' ? 13.5 : 12.0;
  }, [sex, age]);

  const refHbMax = useMemo(() => {
    if (age === 'child') return 15.0;
    return sex === 'male' ? 17.5 : 15.5;
  }, [sex, age]);

  // Main evaluation logic derived reactively
  const analysis = useMemo(() => {
    const interpretations: string[] = [];
    let hbStatus = "Normal";
    let mcvStatus = "Normocytic";
    let rdwStatus = "Normal Variation";
    let wbcStatus = "Normal";
    let eosStatus = "Normal";
    let pltStatus = "Normal";

    let activeMiasm = "Psora (Functional Balance)";
    let recommendedRemedies = "Sulphur, Natrum muriaticum, Calcarea carbonica";
    let clinicalNote = "All baseline lineages reside within expected healthy physiological limits. Maintain general constitutional focus.";

    // hb evaluation
    if (hb < refHbMin) {
      hbStatus = "Anemic (Low)";
      interpretations.push(`Anemia confirmed (Hb: ${hb} g/dL).`);
    } else if (hb > refHbMax) {
      hbStatus = "Polycythemia (High)";
      interpretations.push(`Erythrocytosis indicated (Hb: ${hb} g/dL). Check hydration status.`);
    }

    // mcv evaluation
    if (mcv < 80) {
      mcvStatus = "Microcytic (Small Cells)";
      if (hb < refHbMin) {
        interpretations.push("Morphology suggests Microcytic Hypochromic cells.");
      }
    } else if (mcv > 100) {
      mcvStatus = "Macrocytic (Large Cells)";
      if (hb < refHbMin) {
        interpretations.push("Morphology suggests Macrocytic cells (suspect B12/Folate deficiency).");
      }
    }

    // rdw evaluation
    if (rdw > 14.5) {
      rdwStatus = "Anisocytosis (High)";
      interpretations.push(`High cell size variation (RDW: ${rdw}%).`);
    }

    // wbc evaluation
    if (wbc < 4000) {
      wbcStatus = "Leukopenia (Low)";
      interpretations.push(`Leukopenia (WBC: ${wbc.toLocaleString()}/μL). Suggests viral response, physical depletion, or acute bone marrow stress.`);
    } else if (wbc > 11000) {
      wbcStatus = "Leukocytosis (High)";
      interpretations.push(`Leukocytosis (WBC: ${wbc.toLocaleString()}/μL). Suggestive of acute bacterial infection or active inflammatory necrosis.`);
    }

    // eos evaluation
    if (eos > 6) {
      eosStatus = "Eosinophilia (High)";
      interpretations.push(`Eosinophilia (${eos}%). Strongly indicative of active allergic response or parasitic load.`);
    }

    // plt evaluation
    if (plt < 150000) {
      pltStatus = "Thrombocytopenia (Low)";
      interpretations.push(`Thrombocytopenia (Platelets: ${plt.toLocaleString()}/μL). Risk of bleeding diathesis.`);
    } else if (plt > 450000) {
      pltStatus = "Thrombocytosis (High)";
      interpretations.push(`Thrombocytosis (Platelets: ${plt.toLocaleString()}/μL). Suspect chronic inflammatory process or primary marrow response.`);
    }

    // Pattern Recognition
    if (hb < refHbMin && mcv < 80 && rdw > 14.5) {
      interpretations.push("<strong>Diagnostic Correlation:</strong> Pattern highly consistent with <strong>Iron Deficiency Anemia (IDA)</strong>.");
      activeMiasm = "Psora / Pseudo-psora (Defect in Absorption & Assimilation)";
      recommendedRemedies = "Ferrum phosphoricum, Calcarea phosphorica, Lecithinum, Alumina";
      clinicalNote = "Excellent response often seen with Ferrum phos 6x biochemics alongside deep-acting absorption regulators like Alumina or Calcarea carb.";
    } else if (hb < refHbMin && mcv < 80 && rdw <= 14.5) {
      interpretations.push("<strong>Diagnostic Correlation:</strong> Microcytic cells with normal RDW suggest <strong>Thalassemia Trait (Minor)</strong> carrier state.");
      activeMiasm = "Sycosis (Genetic structural modification)";
      recommendedRemedies = "Thuja occidentalis, Medorrhinum, Carduus marianus";
      clinicalNote = "Thalassemia minor is genetic. Do not give empirical iron. Focus on liver support and synergistic constitutional remedies.";
    } else if (hb < refHbMin && mcv > 100) {
      interpretations.push("<strong>Diagnostic Correlation:</strong> Macrocytic anemia pattern. Highly suggestive of <strong>Megaloblastic Anemia (Vitamin B12/Folate deficiency)</strong>.");
      activeMiasm = "Psora-Syphilitic (Impairment of nucleoprotein cell division)";
      recommendedRemedies = "Picricum acidum, Arsenicum album, Phosphorus, Zincum metallicum";
      clinicalNote = "Picric acid is high-yield for profound asthenia, heavy limbs, and myelopathic complications of B12 deficiency.";
    } else if (wbc > 12000 && plt >= 150000) {
      interpretations.push("<strong>Diagnostic Correlation:</strong> Acute systemic inflammatory or bacterial invasion signature.");
      activeMiasm = "Acute Psora (Reactive protective defense)";
      recommendedRemedies = "Pyrogenium, Hepar sulphuris, Belladonna, Mercurius solubilis";
      clinicalNote = "If high fever matches the clinical picture, Pyrogenium acts as an exceptional dynamic antiseptic. Use Hepar sulph to control suppurative pathways.";
    } else if (eos > 6) {
      interpretations.push("<strong>Diagnostic Correlation:</strong> Systemic hyper-allergic response, asthma, eczema, or helminthiasis.");
      activeMiasm = "Tubercular Miasm (Allergic sensitization and chest affinity)";
      recommendedRemedies = "Cina, Sabadilla, Allium cepa, Psorinum, Tuberculinum";
      clinicalNote = "Use Cina or Teucrium for worm-related eosinophilia; Sabadilla or Allium cepa are effective for paroxysmal hayfever patterns.";
    } else if (plt < 100000) {
      interpretations.push("<strong>Diagnostic Correlation:</strong> Thrombocytopenic state requiring close structural vigilance.");
      activeMiasm = "Syphilis (Destructive breakdown of blood vessels & cells)";
      recommendedRemedies = "Phosphorus, Lachesis mutus, Crotalus horridus, Hamamelis";
      clinicalNote = "Syphilitic bleeding calls for venom-based remedies. Phosphorus is indicated for bright red, non-coagulable hemorrhage; Lachesis for dark, fluid blood with extreme physical sensitivity.";
    }

    const isEmergency = plt < 30000 || hb < 7.0 || wbc < 1500 || wbc > 30000;

    return {
      hbStatus,
      mcvStatus,
      rdwStatus,
      wbcStatus,
      eosStatus,
      pltStatus,
      interpretations,
      activeMiasm,
      recommendedRemedies,
      clinicalNote,
      isEmergency
    };
  }, [hb, mcv, rdw, wbc, eos, plt, refHbMin, refHbMax]);

  // Handler for Flashcard Flip
  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Slides handlers
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % INSTAGRAM_SLIDES.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + INSTAGRAM_SLIDES.length) % INSTAGRAM_SLIDES.length);
  };

  // Filter parameters in Handbook
  const filteredParams = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    const list = PARAMETERS_DATA[activeTab];
    if (!query) return list;
    return list.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.shortName.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    );
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-bg-primary pb-20 transition-colors duration-300">
      <SEO 
        title="CBC Laboratory Handbook & Homoeopathic Analyzer"
        description="Decode Complete Blood Count values in clinical homoeopathy, map indices with miasmatic triggers, view blood smear guides, and practice clinical viva questions."
      />

      {/* HEADER SECTION */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-semibold tracking-wide uppercase"
          >
            <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
            BHMS &amp; CLINICAL LAB COMPANION
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-light leading-tight text-text-primary tracking-tight"
          >
            CBC Interpretation <br />
            <span className="text-primary italic font-serif font-semibold">Handbook &amp; Diagnostic Tool</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary max-w-xl font-normal leading-relaxed font-sans"
          >
            Decipher absolute hematology parameters, map lab findings with Psoric, Sycosic, and Syphilitic miasms, and master high-yield viva secrets in an interactive layout.
          </motion.p>
        </div>
      </header>

      {/* CORE INTERACTIVE ENGINE: LAB ANALYZER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 space-y-20">
        <section id="analyzer-tool" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* INPUT PANEL */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" /> Parameter Controls
                  </h2>
                  <button 
                    onClick={() => handleLoadPreset('normal')}
                    className="text-xs text-primary hover:text-primary-dark font-semibold flex items-center gap-1 transition-colors bg-transparent border-0"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Normal
                  </button>
                </div>

                {/* Preset buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-text-tertiary uppercase tracking-wider block">
                    Diagnostic Presets
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLoadPreset('ida')} className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/30 dark:hover:bg-red-900/40 dark:text-red-300 rounded-md text-[10px] font-bold border border-red-200/50 dark:border-red-900/30">Iron Def (IDA)</button>
                    <button onClick={() => handleLoadPreset('thal')} className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 dark:text-amber-300 rounded-md text-[10px] font-bold border border-amber-200/50 dark:border-amber-900/30">Thalassemia</button>
                    <button onClick={() => handleLoadPreset('megalo')} className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:hover:bg-orange-900/40 dark:text-orange-300 rounded-md text-[10px] font-bold border border-orange-200/50 dark:border-orange-900/30">Megaloblastic</button>
                    <button onClick={() => handleLoadPreset('sepsis')} className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 dark:text-blue-300 rounded-md text-[10px] font-bold border border-blue-200/50 dark:border-blue-900/30">Infection</button>
                    <button onClick={() => handleLoadPreset('allergy')} className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 dark:text-emerald-300 rounded-md text-[10px] font-bold border border-emerald-200/50 dark:border-emerald-900/30">Eosinophilia</button>
                    <button onClick={() => handleLoadPreset('thrombo')} className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:hover:bg-purple-900/40 dark:text-purple-300 rounded-md text-[10px] font-bold border border-purple-200/50 dark:border-purple-900/30">Low Platelet</button>
                  </div>
                </div>

                {/* Demographic Selectors */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Patient Sex</label>
                    <select 
                      value={sex} 
                      onChange={(e) => setSex(e.target.value as 'male' | 'female')}
                      className="w-full bg-bg-primary border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Age Bracket</label>
                    <select 
                      value={age} 
                      onChange={(e) => setAge(e.target.value as 'adult' | 'child')}
                      className="w-full bg-bg-primary border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary"
                    >
                      <option value="adult">Adult</option>
                      <option value="child">Child / Infant</option>
                    </select>
                  </div>
                </div>

                {/* Parameter Sliders */}
                <div className="space-y-4 pt-4 border-t border-border">
                  {/* Hb */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-primary">Hemoglobin (Hb)</span>
                      <span className="font-mono text-primary font-bold">{hb} g/dL</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="22" 
                      step="0.1" 
                      value={hb} 
                      onChange={(e) => setHb(parseFloat(e.target.value))}
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-primary"
                    />
                  </div>

                  {/* MCV */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-primary">MCV (Cell Size)</span>
                      <span className="font-mono text-primary font-bold">{mcv} fL</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="130" 
                      step="1" 
                      value={mcv} 
                      onChange={(e) => setMcv(parseInt(e.target.value))}
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-primary"
                    />
                  </div>

                  {/* RDW */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-primary">RDW (Variation)</span>
                      <span className="font-mono text-primary font-bold">{rdw} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="25" 
                      step="0.1" 
                      value={rdw} 
                      onChange={(e) => setRdw(parseFloat(e.target.value))}
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-primary"
                    />
                  </div>

                  {/* WBC */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-primary">Total WBC Count</span>
                      <span className="font-mono text-primary font-bold">{wbc.toLocaleString()} /μL</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="50000" 
                      step="100" 
                      value={wbc} 
                      onChange={(e) => setWbc(parseInt(e.target.value))}
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-primary"
                    />
                  </div>

                  {/* Eosinophils */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-primary">Specific Eosinophils</span>
                      <span className="font-mono text-primary font-bold">{eos} %</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="30" 
                      step="1" 
                      value={eos} 
                      onChange={(e) => setEos(parseInt(e.target.value))}
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-primary"
                    />
                  </div>

                  {/* Platelets */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-primary">Platelet Count</span>
                      <span className="font-mono text-primary font-bold">{plt.toLocaleString()} /μL</span>
                    </div>
                    <input 
                      type="range" 
                      min="10000" 
                      max="900000" 
                      step="5000" 
                      value={plt} 
                      onChange={(e) => setPlt(parseInt(e.target.value))}
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS OUTPUT PANEL */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h2 className="text-lg font-bold text-text-primary tracking-tight">
                    Lab Evaluation Summary
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${
                    analysis.isEmergency 
                      ? 'bg-red-500 animate-pulse'
                      : analysis.interpretations.length > 0 
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                  }`}>
                    {analysis.isEmergency ? 'Critical Warning' : analysis.interpretations.length > 0 ? 'Pathology Detected' : 'Normal Hemogram'}
                  </span>
                </div>

                {/* Sub status badges grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className={`p-3 rounded-2xl border transition-colors ${analysis.hbStatus.includes('Anemic') || analysis.hbStatus.includes('Poly') ? 'bg-red-500/10 border-red-200 text-red-900 dark:text-red-200' : 'bg-bg-primary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Hb Level</span>
                    <span className="text-sm font-bold block mt-1">{hb} g/dL</span>
                    <span className="text-[10px] font-semibold block">{analysis.hbStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-colors ${analysis.mcvStatus !== 'Normocytic' ? 'bg-amber-500/10 border-amber-200 text-amber-950 dark:text-amber-200' : 'bg-bg-primary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Cell Size (MCV)</span>
                    <span className="text-sm font-bold block mt-1">{mcv} fL</span>
                    <span className="text-[10px] font-semibold block">{analysis.mcvStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-colors ${analysis.wbcStatus !== 'Normal' ? 'bg-indigo-500/10 border-indigo-200 text-indigo-900 dark:text-indigo-200' : 'bg-bg-primary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">WBC Count</span>
                    <span className="text-sm font-bold block mt-1">{wbc.toLocaleString()}</span>
                    <span className="text-[10px] font-semibold block">{analysis.wbcStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-colors ${analysis.rdwStatus !== 'Normal Variation' ? 'bg-amber-500/10 border-amber-200 text-amber-950 dark:text-amber-200' : 'bg-bg-primary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">RDW (Anisocytosis)</span>
                    <span className="text-sm font-bold block mt-1">{rdw} %</span>
                    <span className="text-[10px] font-semibold block">{analysis.rdwStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-colors ${analysis.eosStatus !== 'Normal' ? 'bg-emerald-500/10 border-emerald-200 text-emerald-900 dark:text-emerald-200' : 'bg-bg-primary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Eosinophils</span>
                    <span className="text-sm font-bold block mt-1">{eos} %</span>
                    <span className="text-[10px] font-semibold block">{analysis.eosStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border transition-colors ${analysis.pltStatus !== 'Normal' ? 'bg-purple-500/10 border-purple-200 text-purple-900 dark:text-purple-200' : 'bg-bg-primary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Platelets</span>
                    <span className="text-sm font-bold block mt-1">{plt.toLocaleString()}</span>
                    <span className="text-[10px] font-semibold block">{analysis.pltStatus}</span>
                  </div>
                </div>

                {/* Pathological Interpretations */}
                <div className="p-5 bg-bg-primary/40 border border-border rounded-2xl space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-text-tertiary flex items-center gap-1">
                    <FileText className="w-3 h-3 text-text-tertiary" /> Pathological Interpretations
                  </h4>
                  {analysis.interpretations.length === 0 ? (
                    <p className="text-xs text-text-secondary italic">
                      All baseline values reside inside normal clinical parameters. Correlate with physical symptom profile.
                    </p>
                  ) : (
                    <ul className="list-disc pl-5 text-xs text-text-secondary space-y-2">
                      {analysis.interpretations.map((text, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: text }} />
                      ))}
                    </ul>
                  )}
                </div>

                {/* Homoeopathic Therapeutics and Miasms */}
                <div className="p-5 bg-primary/10 border border-primary/20 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌿</span>
                    <h4 className="text-sm font-bold text-primary">Homoeopathic Correlation &amp; Miasms</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-extrabold uppercase text-primary tracking-wider text-[10px]">Active Miasmatic Trend:</span>
                      <p className="text-text-primary font-semibold">{analysis.activeMiasm}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-extrabold uppercase text-primary tracking-wider text-[10px]">Candidate Therapeutics:</span>
                      <p className="text-text-primary font-semibold">{analysis.recommendedRemedies}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-primary/20">
                    <span className="block text-[10px] font-extrabold uppercase text-primary tracking-wider mb-1">Prescribing Pearl:</span>
                    <p className="text-xs text-text-secondary leading-relaxed italic">
                      "{analysis.clinicalNote}"
                    </p>
                  </div>
                </div>

                {/* Emergency Protocol Box */}
                <AnimatePresence>
                  {analysis.isEmergency && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-red-500/10 border border-red-300 text-red-800 rounded-2xl text-xs flex items-start gap-2.5"
                    >
                      <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">CRITICAL THRESHOLD ALERT:</strong>
                        Severe hemography detected (ITP risk, extreme anemia, or leukocytosis/sepsis criteria). Prompt institutional medical evaluation should complement Homoeopathic palliative safety.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </section>

        {/* TABBED PARAMETER HANDBOOK */}
        <section id="handbook-directory" className="pt-10 border-t border-border space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-primary">Pathological Index</span>
              <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
                Cellular Index &amp; Parameter Handbook
              </h2>
              <p className="text-xs text-text-secondary max-w-xl">
                Review definitions, physiological roles, clinical variances, exam tips, and miasmatic guides for Red Cells, White Cells, and Thrombocytes.
              </p>
            </div>

            {/* Tab triggers */}
            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-border">
              <button 
                onClick={() => { setActiveTab('rbc'); setSearchTerm(''); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer ${activeTab === 'rbc' ? 'bg-white dark:bg-zinc-700 text-text-primary shadow-sm' : 'text-text-secondary bg-transparent'}`}
              >
                RBC Lineage
              </button>
              <button 
                onClick={() => { setActiveTab('wbc'); setSearchTerm(''); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer ${activeTab === 'wbc' ? 'bg-white dark:bg-zinc-700 text-text-primary shadow-sm' : 'text-text-secondary bg-transparent'}`}
              >
                WBC Lineage
              </button>
              <button 
                onClick={() => { setActiveTab('plt'); setSearchTerm(''); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border-0 cursor-pointer ${activeTab === 'plt' ? 'bg-white dark:bg-zinc-700 text-text-primary shadow-sm' : 'text-text-secondary bg-transparent'}`}
              >
                Platelets
              </button>
            </div>
          </div>

          <div className="max-w-md relative">
            <Search className="w-4 h-4 text-text-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={`Search ${activeTab === 'rbc' ? 'RBC' : activeTab === 'wbc' ? 'WBC' : 'Platelet'} parameters...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-border rounded-xl text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParams.map((param, idx) => (
              <motion.article 
                key={idx}
                layout
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border hover:border-primary transition-all duration-300 space-y-4 shadow-soft flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-md font-bold">{param.shortName}</span>
                      <h3 className="font-display text-lg font-bold text-text-primary mt-1">{param.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono border border-border px-2 py-1 rounded bg-bg-primary/50 text-text-secondary">{param.range}</span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">{param.desc}</p>
                </div>

                <div className="pt-3 border-t border-border space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div>
                      <strong className="block text-red-600 dark:text-red-400 font-bold mb-0.5 uppercase">Clinical High:</strong>
                      <span className="text-text-secondary">{param.high}</span>
                    </div>
                    <div>
                      <strong className="block text-blue-600 dark:text-blue-400 font-bold mb-0.5 uppercase">Clinical Low:</strong>
                      <span className="text-text-secondary">{param.low}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-bg-primary/50 rounded-xl space-y-1">
                    <span className="font-mono text-[9px] font-bold text-text-primary uppercase flex items-center gap-1">
                      <Award className="w-3 h-3 text-primary" /> PATHOLOGY VIVA SECRETS
                    </span>
                    <p className="text-[10px] text-text-secondary leading-relaxed">{param.exam}</p>
                    
                    <span className="font-mono text-[9px] font-bold text-primary uppercase flex items-center gap-1 pt-1.5">
                      🍃 MIASMATIC INSIGHT
                    </span>
                    <p className="text-[10px] text-text-secondary leading-relaxed">{param.miasm}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* PBS SMEAR MICROSCOPY GUIDE */}
        <section id="pbs-directory" className="pt-10 border-t border-border space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-primary">Microscopy smear guide</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
              Peripheral Blood Smear (PBS) Directory
            </h2>
            <p className="text-xs text-text-secondary max-w-xl">
              Visualizing cell structural details tells us what automation alone cannot. Spot pathological cellular architecture instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-soft space-y-4 hover:border-primary transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-display text-lg font-bold text-text-primary">Spherocytes</h3>
                <span className="text-2xl">🔴</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Spherical, dense RBCs lacking their signature biconcave central pallor. Driven by membrane surface tension collapse.
              </p>
              <div className="p-3 bg-bg-primary/45 rounded-xl">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-text-primary block mb-1">INDICATIVE CONDITIONS:</span>
                <p className="text-[10px] text-text-secondary font-medium">Hereditary Spherocytosis, Autoimmune Hemolytic Anemia (AIHA).</p>
              </div>
            </article>

            <article className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-soft space-y-4 hover:border-primary transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-display text-lg font-bold text-text-primary">Target Cells (Codocytes)</h3>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                RBCs exhibiting a "bullseye" central condensation of hemoglobin. Created by a disproportionate excess of membrane relative to volume.
              </p>
              <div className="p-3 bg-bg-primary/45 rounded-xl">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-text-primary block mb-1">INDICATIVE CONDITIONS:</span>
                <p className="text-[10px] text-text-secondary font-medium">Thalassemia major/minor, Hemoglobinopathies, chronic liver disease.</p>
              </div>
            </article>

            <article className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-soft space-y-4 hover:border-primary transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-display text-lg font-bold text-text-primary">Sickle Cells (Drepanocytes)</h3>
                <span className="text-2xl">🌙</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Elongated crescent or sickle-shaped cells with sharp pointed tips, caused by polymerizing HbS chains during hypoxia.
              </p>
              <div className="p-3 bg-bg-primary/45 rounded-xl">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-text-primary block mb-1">INDICATIVE CONDITIONS:</span>
                <p className="text-[10px] text-text-secondary font-medium">Sickle Cell Disease / Crisis (Vaso-occlusive risk).</p>
              </div>
            </article>

            <article className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-soft space-y-4 hover:border-primary transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-display text-lg font-bold text-text-primary">Schistocytes (Helmet Cells)</h3>
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Jagged, helmet-shaped, sliced cell fragments indicating physical intravascular shearing through fibrin networks.
              </p>
              <div className="p-3 bg-bg-primary/45 rounded-xl">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-red-600 block mb-1">EMERGENCY CLUE:</span>
                <p className="text-[10px] text-text-secondary font-medium">DIC, Microangiopathic Hemolytic Anemias (TTP, HUS).</p>
              </div>
            </article>

            <article className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-soft space-y-4 hover:border-primary transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-display text-lg font-bold text-text-primary">Hypersegmented PMNs</h3>
                <span className="text-2xl">🧪</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Neutrophils with six or more nuclear lobes. Reflects defective or delayed nuclear maturation during replication.
              </p>
              <div className="p-3 bg-bg-primary/45 rounded-xl">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-text-primary block mb-1">INDICATIVE CONDITIONS:</span>
                <p className="text-[10px] text-text-secondary font-medium">Vitamin B12 or Folate Deficiency (Megaloblastic anemia).</p>
              </div>
            </article>

            <article className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-soft space-y-4 hover:border-primary transition-all duration-300">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="font-display text-lg font-bold text-text-primary">Rouleaux Formation</h3>
                <span className="text-2xl">🪙</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                RBCs grouped like stacks of coins. High plasma immunoglobulins neutralize cell surface repulsion, promoting adhesive aggregation.
              </p>
              <div className="p-3 bg-bg-primary/45 rounded-xl">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-text-primary block mb-1">INDICATIVE CONDITIONS:</span>
                <p className="text-[10px] text-text-secondary font-medium">Multiple Myeloma, severe acute phase inflammation.</p>
              </div>
            </article>
          </div>
        </section>

        {/* CLINICAL VIVA FLASHCARDS */}
        <section id="viva-trainer" className="pt-10 border-t border-border space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-primary">BHMS Exam prep</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
              Clinical Viva Trainer
            </h2>
            <p className="text-xs text-text-secondary max-w-xl">
              Test your clinical diagnostic reflexes. Tap each flashcard below to reveal pathognomonic calculations and examiner priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Flashcard 1 */}
            <div 
              onClick={() => toggleCardFlip(0)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-border rounded-2xl p-6 min-h-[220px] cursor-pointer hover:border-primary transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase font-black text-primary tracking-widest block">Question 1</span>
                {!flippedCards[0] ? (
                  <h4 className="font-display text-base font-bold text-text-primary leading-snug">
                    What is the Mentzer Index and how do you use it clinically?
                  </h4>
                ) : (
                  <div className="space-y-2 text-xs text-text-secondary">
                    <p><strong>Formula:</strong> MCV / RBC count (in millions).</p>
                    <p><strong>Evaluation:</strong> Index <strong>&lt; 13</strong> strongly points to Thalassemia Minor trait; <strong>&gt; 13</strong> suggests Iron Deficiency.</p>
                    <p className="text-[10px] italic">Crucial to avoid accidental toxic iron overloading in carrier states.</p>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase text-right block mt-4">
                {!flippedCards[0] ? 'Tap to Flip ↺' : 'Tap to reset ↺'}
              </span>
            </div>

            {/* Flashcard 2 */}
            <div 
              onClick={() => toggleCardFlip(1)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-border rounded-2xl p-6 min-h-[220px] cursor-pointer hover:border-primary transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase font-black text-primary tracking-widest block">Question 2</span>
                {!flippedCards[1] ? (
                  <h4 className="font-display text-base font-bold text-text-primary leading-snug">
                    Explain the clinical significance of a "Left Shift" in Neutrophils.
                  </h4>
                ) : (
                  <div className="space-y-2 text-xs text-text-secondary">
                    <p>An elevation in <strong>immature bands and metamyelocytes</strong> (early-stage neutrophils) circulating in peripheral blood.</p>
                    <p>This means the bone marrow is ridding its reserves rapidly to wage defense against acute pyogenic bacterial infection.</p>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase text-right block mt-4">
                {!flippedCards[1] ? 'Tap to Flip ↺' : 'Tap to reset ↺'}
              </span>
            </div>

            {/* Flashcard 3 */}
            <div 
              onClick={() => toggleCardFlip(2)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-border rounded-2xl p-6 min-h-[220px] cursor-pointer hover:border-primary transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase font-black text-primary tracking-widest block">Question 3</span>
                {!flippedCards[2] ? (
                  <h4 className="font-display text-base font-bold text-text-primary leading-snug">
                    What is the "NAACP" mnemonic for eosinophilia?
                  </h4>
                ) : (
                  <div className="space-y-2 text-xs text-text-secondary">
                    <p><strong>N</strong> - Neoplasm (lymphoma/leukemia)</p>
                    <p><strong>A</strong> - Asthma (bronchial spasm)</p>
                    <p><strong>A</strong> - Allergic triggers (atopic dermatitis)</p>
                    <p><strong>C</strong> - Collagen vascular (autoimmune connective)</p>
                    <p><strong>P</strong> - Parasitic infections (helminthes)</p>
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase text-right block mt-4">
                {!flippedCards[2] ? 'Tap to Flip ↺' : 'Tap to reset ↺'}
              </span>
            </div>
          </div>
        </section>

        {/* SOCIAL ROADMAP CAROUSEL */}
        <section id="social-slides" className="pt-10 border-t border-border space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-primary">Content roadmap</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
              Instagram Carousel Slides
            </h2>
            <p className="text-xs text-text-secondary max-w-xl">
              Review a structured slide-by-slide publication roadmap for medical social media or student tutorials. Ideal for clinical content creation.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 border border-border rounded-3xl p-6 sm:p-10 shadow-soft max-w-3xl mx-auto space-y-8 relative overflow-hidden">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-[10px] font-mono uppercase font-extrabold tracking-widest text-primary">CBC DECODED | Curiva Clinical Kit</span>
              <span className="text-xs font-bold text-text-secondary font-mono bg-bg-primary px-3 py-1 rounded-full border border-border">Slide {currentSlide + 1} / {INSTAGRAM_SLIDES.length}</span>
            </div>

            <div className="min-h-[220px] flex flex-col justify-center py-6 text-center space-y-4">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary max-w-lg mx-auto">
                {INSTAGRAM_SLIDES[currentSlide].title}
              </h3>
              <p className="text-xs md:text-sm text-primary italic max-w-md mx-auto">
                {INSTAGRAM_SLIDES[currentSlide].subtitle}
              </p>
              
              <ul className="text-left text-xs text-text-secondary space-y-2.5 max-w-md mx-auto pt-4 list-disc pl-5">
                {INSTAGRAM_SLIDES[currentSlide].bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <button 
                onClick={prevSlide}
                className="p-2.5 rounded-xl border border-border bg-white dark:bg-zinc-800 text-text-primary hover:border-primary transition-all flex items-center gap-1.5 text-xs font-bold font-mono cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex gap-1.5">
                {INSTAGRAM_SLIDES.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all border-0 p-0 cursor-pointer ${currentSlide === idx ? 'w-5 bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                className="p-2.5 rounded-xl border border-border bg-primary text-white hover:bg-primary-dark transition-all flex items-center gap-1.5 text-xs font-bold font-mono cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
