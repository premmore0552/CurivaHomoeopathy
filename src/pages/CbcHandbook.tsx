import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Sliders, RotateCcw, AlertTriangle, AlertCircle, 
  HelpCircle, Sparkles, Check, Info, ArrowRight, BookOpen, 
  Search, GraduationCap, FileText, ChevronLeft, ChevronRight,
  TrendingUp, TrendingDown, ShieldAlert, Award
} from 'lucide-react';
import SEO from '../components/SEO';

interface ParameterDetail {
  id: string;
  name: string;
  shortName: string;
  range: string;
  desc: string;
  highCauses: string;
  lowCauses: string;
  examTip: string;
  miasmTip: string;
}

const PARAMETERS_DATA: Record<'rbc' | 'wbc' | 'plt', ParameterDetail[]> = {
  rbc: [
    {
      id: 'rbc_count',
      name: 'Erythrocyte Mass',
      shortName: 'RBC Count',
      range: '4.1 - 5.9 M/μL',
      desc: 'Quantifies total red blood cells in the circulating volume. Essential for structural oxygen distribution throughout systemic tissue beds.',
      highCauses: 'Dehydration, chronic hypoxia, sleep apnea, Polycythemia Vera.',
      lowCauses: 'Anemias, nutritional deficits, hemolysis, acute/chronic blood loss.',
      examTip: 'Know differences between relative dehydration-based polycythemia and bone marrow driven vera.',
      miasmTip: 'Psora (Relative high H2O loss) vs Sycosis (proliferative vera).'
    },
    {
      id: 'hb',
      name: 'Hemoglobin',
      shortName: 'Hb',
      range: '12.0 - 17.5 g/dL',
      desc: 'Oxygen-carrying metalloprotein within red cells. The gold-standard diagnostic marker for classifying grade of anemia.',
      highCauses: 'COPD, smoking, high altitudes, tumor EPO.',
      lowCauses: 'Nutritional anemias, hemodilution, kidney disorders, chronic disease.',
      examTip: 'Remember the physiological difference: Estrogen inhibits vs. Testosterone stimulates erythropoiesis.',
      miasmTip: 'Syphilitic miasm leads to destructive severe low hemoglobin values.'
    },
    {
      id: 'hct',
      name: 'Hematocrit',
      shortName: 'Hct / PCV',
      range: '36% - 50%',
      desc: 'Percentage of blood volume made of red blood cells. Drives absolute blood thickness/viscosity and is key for evaluating shock states.',
      highCauses: 'Dehydration, burns, dengue shock plasma leakage.',
      lowCauses: 'Hemorrhages, hemodilution, aplastic states.',
      examTip: 'Formula: PCV (%) ≈ Hb (g/dL) x 3. Vital indicator in hemorrhagic fevers.',
      miasmTip: 'Functional fluctuation relates to Psora; sudden shock-based hemoconcentration is Psoro-Syphilitic.'
    },
    {
      id: 'mcv',
      name: 'Mean Corpuscular Volume',
      shortName: 'MCV',
      range: '80 - 100 fL',
      desc: 'Average volume/size of red cells. Used to clinically segment anemia into microcytic, normocytic, or macrocytic.',
      highCauses: 'Vitamin B12 or Folate deficiency, thyroid disease, alcoholism.',
      lowCauses: 'Iron deficiency, thalassemia trait, lead poisoning.',
      examTip: 'Mnemonic: TAILS for microcytic anemias (Thalassemia, ACD, IDA, Lead, Sideroblastic).',
      miasmTip: 'Structural expansion suggests macrocytosis (Psora-Syphilis); microcytic reduction mimics Sycosis/Syphilis.'
    },
    {
      id: 'rdw',
      name: 'Red Cell Distribution Width',
      shortName: 'RDW',
      range: '11.5% - 14.5%',
      desc: 'Measures cell size variation (anisocytosis). Crucial tool to distinguish IDA (High RDW) from Thalassemia (Normal RDW).',
      highCauses: 'Nutritional deficits (IDA, mixed B12/Iron), post-transfusion.',
      lowCauses: 'Thalassemia minor, uncomplicated chronic anemia.',
      examTip: 'Understand why RDW goes high *first* during early iron deficiency before the MCV drops below 80.',
      miasmTip: 'Unordered size irregularity (anisocytosis) reflects Psora-Syphilis disharmony.'
    },
    {
      id: 'retics',
      name: 'Reticulocyte Count',
      shortName: 'Retics',
      range: '0.5% - 2.5%',
      desc: 'Percentage of immature RBCs in systemic circulation. A direct measure of bone marrow erythropoiesis activity and compensation status.',
      highCauses: 'Hemolysis, acute bleeding, response to iron therapy.',
      lowCauses: 'Aplastic anemia, nutritional anemia, kidney disease.',
      examTip: 'Anemia with high retic indicates hemolytic source or active blood loss (regenerative).',
      miasmTip: 'Hyperactive marrow replenishment corresponds to active Psora.'
    }
  ],
  wbc: [
    {
      id: 'tlc',
      name: 'Total Leukocyte Count',
      shortName: 'TLC',
      range: '4,000 - 11,000 /μL',
      desc: 'Measures overall WBC volume. Reflects current inflammatory and systemic immune reactions against pathogens.',
      highCauses: 'Acute bacterial infection, severe tissue death, myeloproliferative.',
      lowCauses: 'Viral infections (Typhoid, Dengue), bone marrow failure.',
      examTip: 'Dynamic leukocyte response can fluctuate heavily within hours. Follow up with differential count.',
      miasmTip: 'Acute defensive surge is Psora; proliferative expansion is Sycosis.'
    },
    {
      id: 'neutrophils',
      name: 'Polymorphs',
      shortName: 'Neutrophils',
      range: '40% - 70%',
      desc: 'First responders of the innate immune system. They engulf and destroy extracellular pathogens via oxidative bursts.',
      highCauses: 'Pyogenic bacterial infections, acute physical trauma.',
      lowCauses: 'Sepsis exhaustion, viral agents, drug-induced.',
      examTip: 'Associated with acute Psora flare-ups. Key remedies: Pyrogen, Belladonna, Merc sol.',
      miasmTip: 'Acute purulent inflammatory states are mostly Psoric-Sycosic.'
    },
    {
      id: 'lymphocytes',
      name: 'Lymphoid Lineage',
      shortName: 'Lymphocytes',
      range: '20% - 40%',
      desc: 'Directs the adaptive immune response. Includes T-cells (cell-mediated) and B-cells (humoral antibody production).',
      highCauses: 'Viral infections (mumps, rubella), pertussis, chronic lymphocytic leukemia.',
      lowCauses: 'HIV/AIDS, immunosuppressants, prolonged severe stress.',
      examTip: 'Atypical lymphocytes suggest infectious mononucleosis (Epstein-Barr Virus).',
      miasmTip: 'Lymphoid chronicity and gland involvement map to the Tubercular Miasm.'
    },
    {
      id: 'eosinophils',
      name: 'Granulocytes',
      shortName: 'Eosinophils',
      range: '1% - 6%',
      desc: 'Primary protectors against multicellular helminth parasites and crucial modulators of allergic hypersensitivity responses.',
      highCauses: 'Asthma, eczema, parasitic infections, drug reactions.',
      lowCauses: 'Corticosteroids, high-stress states, Cushing syndrome.',
      examTip: 'Mnemonic: NAACP for eosinophilia (Neoplasm, Asthma, Allergy, Collagen vascular, Parasites).',
      miasmTip: 'Strongly linked with active Tubercular miasms. Important remedies: Cina, Sabadilla.'
    }
  ],
  plt: [
    {
      id: 'thrombocytes',
      name: 'Thrombocyte Count',
      shortName: 'Platelets',
      range: '150,000 - 450,000 /μL',
      desc: 'Discoid cell fragments that initiate blood coagulation and maintain physical vascular integrity.',
      highCauses: 'Inflammation, iron deficiency, splenectomy, essential thrombocythemia.',
      lowCauses: 'Dengue fever, ITP, chemotherapy, severe blood infections, bone marrow failure.',
      examTip: 'Platelet destruction points to the destructive Syphilitic miasm. Key bleeding remedies: Crotalus, Lachesis.',
      miasmTip: 'Disorganized clotting relates to Sycosis; hemorrhage and cell death reflect Syphilis.'
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
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="CBC Laboratory Handbook & Homoeopathic Analyzer"
        description="Decode Complete Blood Count values in clinical homoeopathy, map indices with miasmatic triggers, view blood smear guides, and practice clinical viva questions."
      />

      {/* HEADER SECTION */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-bg-secondary text-text-primary border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide uppercase"
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
            className="text-base md:text-lg text-text-secondary max-w-xl font-normal leading-relaxed"
          >
            Decipher absolute hematology parameters, map lab findings with Psoric, Sycosic, and Syphilitic miasms, and master high-yield viva secrets in an interactive layout.
          </motion.p>
        </div>
      </header>

      {/* CORE INTERACTIVE ENGINE: LAB ANALYZER */}
      <main className="max-w-5xl mx-auto px-4 -mt-24 relative z-20 space-y-16">
        <section id="analyzer-tool" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* INPUT PANEL */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" /> Sliders
                  </h2>
                  <button 
                    onClick={() => handleLoadPreset('normal')}
                    className="text-xs text-primary hover:text-primary-dark font-semibold flex items-center gap-1 transition-colors"
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
                    <button onClick={() => handleLoadPreset('ida')} className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-[10px] font-bold border border-red-200/50">Iron Def (IDA)</button>
                    <button onClick={() => handleLoadPreset('thal')} className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold border border-amber-200/50">Thalassemia</button>
                    <button onClick={() => handleLoadPreset('megalo')} className="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-md text-[10px] font-bold border border-orange-200/50">Megaloblastic</button>
                    <button onClick={() => handleLoadPreset('sepsis')} className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold border border-blue-200/50">Infection</button>
                    <button onClick={() => handleLoadPreset('allergy')} className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold border border-emerald-200/50">Eosinophilia</button>
                    <button onClick={() => handleLoadPreset('thrombo')} className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md text-[10px] font-bold border border-purple-200/50">Low Platelet</button>
                  </div>
                </div>

                {/* Demographic Selectors */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-text-secondary uppercase mb-1.5">Patient Sex</label>
                    <select 
                      value={sex} 
                      onChange={(e) => setSex(e.target.value as 'male' | 'female')}
                      className="w-full bg-bg-secondary border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary"
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
                      className="w-full bg-bg-secondary border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary"
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
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-secondary"
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
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-secondary"
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
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-secondary"
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
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-secondary"
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
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-secondary"
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
                      className="w-full accent-primary cursor-pointer h-1.5 rounded-lg bg-bg-secondary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS OUTPUT PANEL */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h2 className="text-lg font-bold text-text-primary tracking-tight">
                    Lab Evaluation Summary
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    analysis.isEmergency 
                      ? 'bg-red-500 text-white animate-pulse'
                      : analysis.interpretations.length > 0 
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {analysis.isEmergency ? 'Critical Warning' : analysis.interpretations.length > 0 ? 'Pathology Detected' : 'Normal Hemogram'}
                  </span>
                </div>

                {/* Sub status badges grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className={`p-3 rounded-2xl border ${analysis.hbStatus.includes('Anemic') || analysis.hbStatus.includes('Poly') ? 'bg-primary-light/35 border-primary/20 text-primary-dark' : 'bg-bg-secondary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Hb Level</span>
                    <span className="text-sm font-bold block mt-1">{hb} g/dL</span>
                    <span className="text-[10px] font-semibold block">{analysis.hbStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${analysis.mcvStatus !== 'Normocytic' ? 'bg-amber-500/10 border-amber-500/20 text-amber-800' : 'bg-bg-secondary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Cell Size (MCV)</span>
                    <span className="text-sm font-bold block mt-1">{mcv} fL</span>
                    <span className="text-[10px] font-semibold block">{analysis.mcvStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${analysis.wbcStatus !== 'Normal' ? 'bg-primary-light/35 border-primary/20 text-primary-dark' : 'bg-bg-secondary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">WBC Count</span>
                    <span className="text-sm font-bold block mt-1">{wbc.toLocaleString()}</span>
                    <span className="text-[10px] font-semibold block">{analysis.wbcStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${analysis.rdwStatus !== 'Normal Variation' ? 'bg-primary-light/35 border-primary/20 text-primary-dark' : 'bg-bg-secondary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">RDW (Anisocytosis)</span>
                    <span className="text-sm font-bold block mt-1">{rdw} %</span>
                    <span className="text-[10px] font-semibold block">{analysis.rdwStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${analysis.eosStatus !== 'Normal' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800' : 'bg-bg-secondary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Eosinophils</span>
                    <span className="text-sm font-bold block mt-1">{eos} %</span>
                    <span className="text-[10px] font-semibold block">{analysis.eosStatus}</span>
                  </div>

                  <div className={`p-3 rounded-2xl border ${analysis.pltStatus !== 'Normal' ? 'bg-purple-500/10 border-purple-500/20 text-purple-800' : 'bg-bg-secondary/40 border-border text-text-secondary'}`}>
                    <span className="text-[10px] uppercase font-bold text-text-tertiary block">Platelets</span>
                    <span className="text-sm font-bold block mt-1">{plt.toLocaleString()}</span>
                    <span className="text-[10px] font-semibold block">{analysis.pltStatus}</span>
                  </div>
                </div>

                {/* Pathological Interpretations */}
                <div className="p-5 bg-bg-secondary/40 border border-border rounded-2xl space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-text-tertiary">
                    Pathological Interpretations
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
                <div className="p-5 bg-primary-light/35 border border-primary/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌿</span>
                    <h4 className="text-sm font-bold text-primary-dark">Homoeopathic Correlation &amp; Miasms</h4>
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

                  <div className="pt-3 border-t border-primary/10">
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
                        Severe hemography detected (ITP risk, extreme anemia, or leukocytosis/sepsis criteria). Prompt institutional medical evaluation should complement homeopathic palliative safety.
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
            <div className="flex bg-bg-secondary p-1 rounded-xl shrink-0 border border-border">
              {(['rbc', 'wbc', 'plt'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSearchTerm(''); }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-text-primary shadow-sm border border-border/50' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab === 'rbc' ? 'RBC Lineage' : tab === 'wbc' ? 'WBC Lineage' : 'Platelets'}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside handbook */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab === 'rbc' ? 'Red Blood Cell' : activeTab === 'wbc' ? 'White Blood Cell' : 'Platelet'} indices...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bg-secondary border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-text-primary"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParams.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-bg-secondary/40 border border-dashed border-border rounded-2xl">
                <Info className="w-8 h-8 text-text-tertiary mx-auto mb-2" />
                <p className="text-xs text-text-secondary">No matching parameters found in this category.</p>
              </div>
            ) : (
              filteredParams.map(param => (
                <div 
                  key={param.id} 
                  className="bg-white p-6 rounded-3xl border border-border hover:border-primary/25 hover:shadow-soft transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 bg-primary-light/50 text-primary font-bold text-[9px] rounded-md uppercase tracking-wider">
                          {param.shortName}
                        </span>
                        <h3 className="text-base font-bold text-text-primary mt-1">{param.name}</h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-bg-secondary border border-border px-2.5 py-0.5 rounded-lg text-text-secondary">
                        {param.range}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {param.desc}
                    </p>

                    <div className="pt-3 border-t border-border grid grid-cols-2 gap-3.5 text-[11px]">
                      <div>
                        <strong className="text-red-700 block mb-0.5 font-bold flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-red-500" /> Increased
                        </strong>
                        <span className="text-text-secondary leading-tight block">{param.highCauses}</span>
                      </div>
                      <div>
                        <strong className="text-blue-700 block mb-0.5 font-bold flex items-center gap-1">
                          <TrendingDown className="w-3.5 h-3.5 text-blue-500" /> Decreased
                        </strong>
                        <span className="text-text-secondary leading-tight block">{param.lowCauses}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-border bg-bg-secondary/40 p-3 rounded-2xl">
                    <p className="text-[10px] text-text-secondary leading-normal">
                      <strong className="text-text-primary uppercase tracking-wider text-[8px] font-black block">Exam Prep Secrets:</strong>
                      {param.examTip}
                    </p>
                    <p className="text-[10px] text-primary-dark leading-normal italic">
                      <strong className="text-primary font-bold uppercase tracking-wider text-[8px] block mt-1">Miasmatic Mapping:</strong>
                      {param.miasmTip}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* PERIPHERAL BLOOD SMEAR (PBS) DIRECTORY */}
        <section id="pbs-directory" className="pt-10 border-t border-border space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-primary">Part 5: Microscopy</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
              Peripheral Blood Smear (PBS) Directory
            </h2>
            <p className="text-xs text-text-secondary">
              Visualizing cell structural details tells us what automation alone cannot. Spot pathological cellular architecture instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Spherocytes */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-soft transition-all duration-300">
              <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Spherocytes</h3>
                <span className="text-lg">🔴</span>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  Spherical, dense RBCs lacking their signature biconcave central pallor. Driven by membrane surface tension collapse.
                </p>
                <div className="pt-2.5 border-t border-border">
                  <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Indicative Conditions:</span>
                  <span className="text-text-secondary mt-0.5 block">Hereditary Spherocytosis, Autoimmune Hemolytic Anemia (AIHA).</span>
                </div>
              </div>
            </div>

            {/* Target Cells */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-soft transition-all duration-300">
              <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Target Cells (Codocytes)</h3>
                <span className="text-lg">🎯</span>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  RBCs exhibiting a "bullseye" central condensation of hemoglobin. Created by a disproportionate excess of membrane relative to volume.
                </p>
                <div className="pt-2.5 border-t border-border">
                  <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Indicative Conditions:</span>
                  <span className="text-text-secondary mt-0.5 block">Thalassemia major/minor, Hemoglobinopathies, chronic liver disease.</span>
                </div>
              </div>
            </div>

            {/* Sickle Cells */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-soft transition-all duration-300">
              <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Sickle Cells (Drepanocytes)</h3>
                <span className="text-lg">🌙</span>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  Elongated crescent or sickle-shaped cells with sharp pointed tips, caused by polymerizing HbS chains during hypoxia.
                </p>
                <div className="pt-2.5 border-t border-border">
                  <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Indicative Conditions:</span>
                  <span className="text-text-secondary mt-0.5 block">Sickle Cell Disease / Crisis. (Vaso-occlusive risk).</span>
                </div>
              </div>
            </div>

            {/* Schistocytes */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-soft transition-all duration-300">
              <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Schistocytes (Helmet Cells)</h3>
                <span className="text-lg">⚠️</span>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  Jagged, helmet-shaped, sliced cell fragments indicating physical intravascular shearing through fibrin networks.
                </p>
                <div className="pt-2.5 border-t border-border">
                  <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Indicative Conditions:</span>
                  <span className="text-red-600 font-semibold mt-0.5 block">Emergency: DIC, Microangiopathic Hemolytic Anemias (TTP, HUS).</span>
                </div>
              </div>
            </div>

            {/* Hypersegmented Neutrophils */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-soft transition-all duration-300">
              <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Hypersegmented PMNs</h3>
                <span className="text-lg">🧪</span>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  Neutrophils with six or more nuclear lobes. Reflects defective or delayed nuclear maturation during replication.
                </p>
                <div className="pt-2.5 border-t border-border">
                  <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Indicative Conditions:</span>
                  <span className="text-text-secondary mt-0.5 block">Vitamin B12 or Folate Deficiency (Megaloblastic anemia).</span>
                </div>
              </div>
            </div>

            {/* Rouleaux Formation */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-soft transition-all duration-300">
              <div className="p-4 bg-bg-secondary border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-text-primary">Rouleaux Formation</h3>
                <span className="text-lg">🪙</span>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <p className="text-text-secondary leading-relaxed">
                  RBCs grouped like stacks of coins. High plasma immunoglobulins neutralize cell surface repulsion, promoting adhesive aggregation.
                </p>
                <div className="pt-2.5 border-t border-border">
                  <span className="font-bold text-text-primary uppercase tracking-wider text-[9px] block">Indicative Conditions:</span>
                  <span className="text-text-secondary mt-0.5 block">Multiple Myeloma, severe acute phase inflammation.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLINICAL VIVA FLASHCARDS */}
        <section id="viva-trainer" className="pt-10 border-t border-border space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-primary">BHMS Exam Prep</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
              Clinical Viva Trainer
            </h2>
            <p className="text-xs text-text-secondary">
              Test your clinical diagnostic reflexes. Tap each flashcard below to reveal pathognomonic calculations and examiner priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div 
              className="h-64 cursor-pointer [perspective:1000px] select-none"
              onClick={() => toggleCardFlip(0)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCards[0] ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-bg-secondary border border-border text-text-primary p-6 rounded-2xl flex flex-col justify-between shadow-soft">
                  <span className="text-[10px] uppercase font-black text-primary tracking-widest">Question 1</span>
                  <h3 className="text-sm font-semibold leading-relaxed text-text-primary">
                    What is the Mentzer Index and how do you use it clinically?
                  </h3>
                  <span className="text-[10px] text-text-tertiary">Tap card to flip ↺</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary-light border border-primary/20 text-text-primary p-6 rounded-2xl flex flex-col justify-between shadow-soft">
                  <span className="text-[10px] uppercase font-black text-primary-dark tracking-widest">Clinical Answer</span>
                  <div className="text-xs space-y-2 text-text-secondary">
                    <p><strong className="text-text-primary">Formula:</strong> MCV / RBC count (in millions).</p>
                    <p><strong className="text-text-primary">Evaluation:</strong> Index <strong className="text-text-primary">&lt; 13</strong> strongly points to Thalassemia Minor trait; <strong className="text-text-primary">&gt; 13</strong> suggests Iron Deficiency.</p>
                    <p>Crucial to avoid accidental toxic iron overloading in carrier states.</p>
                  </div>
                  <span className="text-[10px] text-primary-dark/60">Tap card to reset ↺</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className="h-64 cursor-pointer [perspective:1000px] select-none"
              onClick={() => toggleCardFlip(1)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCards[1] ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-bg-secondary border border-border text-text-primary p-6 rounded-2xl flex flex-col justify-between shadow-soft">
                  <span className="text-[10px] uppercase font-black text-primary tracking-widest">Question 2</span>
                  <h3 className="text-sm font-semibold leading-relaxed text-text-primary">
                    Explain the clinical significance of a "Left Shift" in Neutrophils.
                  </h3>
                  <span className="text-[10px] text-text-tertiary">Tap card to flip ↺</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary-light border border-primary/20 text-text-primary p-6 rounded-2xl flex flex-col justify-between shadow-soft">
                  <span className="text-[10px] uppercase font-black text-primary-dark tracking-widest">Clinical Answer</span>
                  <div className="text-xs space-y-2 text-text-secondary">
                    <p>An elevation in <strong className="text-text-primary">immature bands and metamyelocytes</strong> (early-stage neutrophils) circulating in peripheral blood.</p>
                    <p>This means the bone marrow is ridding its reserves rapidly to wage defense against acute pyogenic bacterial infection.</p>
                  </div>
                  <span className="text-[10px] text-primary-dark/60">Tap card to reset ↺</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              className="h-64 cursor-pointer [perspective:1000px] select-none"
              onClick={() => toggleCardFlip(2)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flippedCards[2] ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-bg-secondary border border-border text-text-primary p-6 rounded-2xl flex flex-col justify-between shadow-soft">
                  <span className="text-[10px] uppercase font-black text-primary tracking-widest">Question 3</span>
                  <h3 className="text-sm font-semibold leading-relaxed text-text-primary">
                    What is the "NAACP" mnemonic for eosinophilia?
                  </h3>
                  <span className="text-[10px] text-text-tertiary">Tap card to flip ↺</span>
                </div>
                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary-light border border-primary/20 text-text-primary p-6 rounded-2xl flex flex-col justify-between shadow-soft">
                  <span className="text-[10px] uppercase font-black text-primary-dark tracking-widest">Clinical Answer</span>
                  <div className="text-xs space-y-1 text-text-secondary">
                    <p className="font-semibold mb-1 text-text-primary">Decodes high-yield sources for eosinophilia:</p>
                    <p><strong className="text-text-primary">N</strong> - Neoplasm (lymphoma/leukemia)</p>
                    <p><strong className="text-text-primary">A</strong> - Asthma (bronchial spasm)</p>
                    <p><strong className="text-text-primary">A</strong> - Allergic triggers (atopic dermatitis)</p>
                    <p><strong className="text-text-primary">C</strong> - Collagen vascular (autoimmune connective)</p>
                    <p><strong className="text-text-primary">P</strong> - Parasitic infections (helminthes)</p>
                  </div>
                  <span className="text-[10px] text-primary-dark/60">Tap card to reset ↺</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INSTAGRAM CAROUSEL SLIDES */}
        <section id="social-slides" className="pt-10 border-t border-border space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-primary">Slide Deck Planner</span>
            <h2 className="text-2xl md:text-3xl font-display font-light text-text-primary">
              Instagram Carousel Slides
            </h2>
            <p className="text-xs text-text-secondary">
              Review a structured slide-by-slide publication roadmap for medical social media or student tutorials. Ideal for clinical content creation.
            </p>
          </div>

          <div className="relative bg-bg-secondary text-text-primary rounded-3xl p-6 sm:p-10 shadow-soft overflow-hidden min-h-[360px] flex flex-col justify-between border border-border">
            {/* Glowing orb details */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center relative z-10 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest text-primary">CBC DECODED</span>
                <span className="text-text-tertiary">|</span>
                <span className="text-[10px] text-text-secondary">Curiva Clinical Kit</span>
              </div>
              <span className="text-xs font-mono font-semibold bg-white border border-border px-3 py-1 rounded-full text-text-secondary shadow-sm">
                Slide {currentSlide + 1} / {INSTAGRAM_SLIDES.length}
              </span>
            </div>

            {/* Slide Content with animated crossfades */}
            <div className="py-8 relative z-10 max-w-xl mx-auto text-center space-y-4">
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-text-primary leading-snug">
                {INSTAGRAM_SLIDES[currentSlide].title}
              </h3>
              <p className="text-xs text-primary-dark italic leading-relaxed max-w-md mx-auto">
                {INSTAGRAM_SLIDES[currentSlide].subtitle}
              </p>
              
              <ul className="text-left max-w-md mx-auto space-y-2 pt-3 list-none">
                {INSTAGRAM_SLIDES[currentSlide].bullets.map((bullet, index) => (
                  <li key={index} className="text-xs sm:text-sm text-text-secondary leading-normal flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Slide Navigation */}
            <div className="flex justify-between items-center relative z-10 pt-4 border-t border-border">
              <button 
                onClick={prevSlide}
                className="px-4 py-2 bg-white hover:bg-bg-secondary border border-border rounded-xl text-[10px] font-bold text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5 shadow-sm"
              >
                <ChevronLeft className="w-4.5 h-4.5" /> Previous
              </button>
              
              {/* Dots indicator list */}
              <div className="hidden sm:flex gap-1.5">
                {INSTAGRAM_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'bg-primary w-4' : 'bg-border w-1.5 hover:bg-text-tertiary'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextSlide}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                Next <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
