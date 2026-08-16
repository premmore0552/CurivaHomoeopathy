export interface DetailedTopicNote {
  id: string;
  topicId: string;
  slug: string;
  title: string;
  chapterId: string;
  chapterTitle: string;
  competencyCode: string;
  overview: string;
  learningObjectives: string[];
  keyDefinitions: { term: string; definition: string; authorOrSource?: string }[];
  etiologyAndCauses: { category: string; causes: string[] }[];
  pathogenesis: {
    title: string;
    description: string;
    flowSteps: string[];
    molecularMediators?: string[];
  };
  morphology: {
    gross: string[];
    microscopic: string[];
    specialStains?: { stain: string; target: string; appearance: string }[];
  };
  comparisonTables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  clinicalPearls: string[];
  homoeopathicCorrelation: {
    miasmaticDominance: 'Psora' | 'Sycosis' | 'Syphilis' | 'Tubercular (Mixed)' | 'Sycotic' | 'Psoric' | 'Syphilitic';
    miasmaticAnalysis: string;
    remedyAffinities: {
      remedy: string;
      stageOrIndication: string;
      pathologicalRationale: string;
    }[];
    practicalHomoeopathicApplication: string;
  };
  examPreparation: {
    laqs: {
      question: string;
      marks: number;
      blueprint: string[];
    }[];
    saqs: {
      question: string;
      marks: number;
      answerKey: string[];
    }[];
    mcqs: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }[];
    vivaVoce: {
      question: string;
      answer: string;
      examinerTip: string;
    }[];
  };
}

export const generalPathologyDetailedNotes: Record<string, DetailedTopicNote> = {
  // 1. ETIOLOGY & MECHANISMS OF CELL INJURY
  'etiology-mechanisms-cell-injury': {
    id: 'note-gen-1',
    topicId: 'top-etiology-cell-injury',
    slug: 'etiology-mechanisms-cell-injury',
    title: 'Etiology & Mechanisms of Cell Injury',
    chapterId: 'gen-cell-injury',
    chapterTitle: 'Cell Injury, Cellular Adaptations & Cell Death',
    competencyCode: 'HomUG-PM I.2',
    overview: 'Cell injury results when the environmental stress exceeds the adaptive capacity of a cell, or when the cell is exposed to inherently damaging agents. It progresses through a reversible stage (cellular swelling, fatty change) to an irreversible stage marked by mitochondrial dysfunction and membrane damage, culminating in cell death (necrosis or apoptosis).',
    learningObjectives: [
      'Enumerate the diverse etiologic agents of cell injury.',
      'Explain the fundamental biochemical mechanisms: ATP depletion, mitochondrial damage, intracellular calcium influx, and reactive oxygen species (ROS).',
      'Distinguish the point of no return between reversible and irreversible cellular injury.',
      'Correlate cellular susceptibility with Hahnemannian vital force disturbance and miasmatic diathesis.'
    ],
    keyDefinitions: [
      {
        term: 'Cell Injury',
        definition: 'A state of altered cellular structure and function occurring when exogenous or endogenous stresses exceed the homeostatic and adaptive capability of the cell.'
      },
      {
        term: 'Hypoxia vs Ischemia',
        definition: 'Hypoxia is a deficiency of oxygen in tissues despite adequate blood flow; Ischemia is an interruption or reduction of arterial blood supply (or venous drainage), resulting in both oxygen and nutrient deprivation as well as toxic metabolite accumulation.'
      },
      {
        term: 'Free Radicals / ROS',
        definition: 'Chemical species with a single unpaired electron in an outer orbital (e.g., superoxide anion O2•-, hydroxyl radical •OH, hydrogen peroxide H2O2) that induce lipid peroxidation of membranes, oxidative modification of proteins, and DNA strand breaks.'
      }
    ],
    etiologyAndCauses: [
      {
        category: 'Oxygen Deprivation (Hypoxia & Ischemia)',
        causes: ['Arterial thrombosis/embolism (Myocardial infarction)', 'Cardiorespiratory failure (COPD, severe shock)', 'Anemia and carbon monoxide poisoning (reduced oxygen carrying capacity)']
      },
      {
        category: 'Physical & Chemical Agents',
        causes: ['Mechanical trauma, extremes of temperature (burns, frostbite)', 'Atmospheric pressure changes, ionizing radiation, electric shock', 'Poisons (Cyanide, arsenic, mercuric chloride), strong acids/alkalis, therapeutic drugs']
      },
      {
        category: 'Infectious & Immunologic Agents',
        causes: ['Viruses, bacteria, fungi, protozoa, helminths', 'Anaphylactic reactions, autoimmune diseases (SLE, Rheumatoid arthritis)']
      },
      {
        category: 'Genetic & Nutritional Derangements',
        causes: ['Chromosomal defects (Down syndrome), single gene mutations (Sickle cell anemia)', 'Protein-calorie malnutrition (Kwashiorkor, Marasmus), vitamin deficiencies, obesity, atherosclerosis']
      }
    ],
    pathogenesis: {
      title: 'Biochemical Cascade of Ischemic Cell Injury',
      description: 'Hypoxia halts oxidative phosphorylation in mitochondria, triggering rapid ATP depletion, anaerobic glycolysis, intracellular acidosis, and failure of ATP-dependent membrane pumps.',
      flowSteps: [
        'Ischemia / Hypoxia occurs -> Oxygen delivery to mitochondria ceases.',
        'Oxidative phosphorylation declines -> Intracellular ATP levels fall rapidly (<5-10% of normal).',
        'Failure of Na+/K+ ATPase pump -> Influx of Na+ and water into cell + efflux of K+ -> Cellular swelling (Hydropic degeneration).',
        'Switch to anaerobic glycolysis -> Glycogen stores depleted -> Lactic acid accumulation -> Intracellular pH falls -> Clumping of nuclear chromatin.',
        'Failure of Ca2+ ATPase pump -> Calcium influx into cytosol from extracellular fluid and endoplasmic reticulum.',
        'High cytosolic Ca2+ activates destructive intracellular enzymes: Phospholipases (membrane damage), Proteases (cytoskeletal breakdown), Endonucleases (DNA fragmentation), and ATPases (further ATP exhaustion).',
        'Irreversible Mitochondrial Damage: Opening of Mitochondrial Permeability Transition Pore (MPTP) + Cytochrome c release into cytosol -> Point of no return -> Necrosis.'
      ],
      molecularMediators: ['ATP', 'Intracellular Ca2+', 'Superoxide Dismutase (SOD)', 'Catalase', 'Glutathione Peroxidase (GSH)', 'Cytochrome c']
    },
    morphology: {
      gross: [
        'Reversible injury: Organ is enlarged, pale, and turgid due to cloudy swelling (hydropic change) and increased water content.',
        'Irreversible injury / Necrosis: Organ displays localized discoloration, softening, loss of structural demarcations, and surrounding hyperemic zone.'
      ],
      microscopic: [
        'Hydropic change (Cloudy swelling): Small clear cytoplasmic vacuoles representing distended endoplasmic reticulum and swollen mitochondria.',
        'Fatty change (Steatosis): Appearance of lipid vacuoles in hepatocytes and myocardial cells.',
        'Plasma membrane blebs, blunting or distortion of microvilli, and loosening of intercellular attachments.',
        'Myelin figures: Phospholipid masses derived from damaged organelle membranes.',
        'Nuclear alterations in irreversible injury: Pyknosis (shrinkage & dense condensation), Karyorrhexis (fragmentation), and Karyolysis (dissolution by DNase).'
      ],
      specialStains: [
        { stain: 'Oil Red O / Sudan Black B', target: 'Neutral lipids (Triglycerides)', appearance: 'Bright red or black droplets on frozen sections' },
        { stain: 'Periodic Acid-Schiff (PAS)', target: 'Intracellular Glycogen', appearance: 'Magenta / deep pink staining' }
      ]
    },
    comparisonTables: [
      {
        title: 'Reversible vs Irreversible Cell Injury (Point of No Return)',
        headers: ['Feature', 'Reversible Injury', 'Irreversible Injury (Necrosis)'],
        rows: [
          ['Mitochondria', 'Mild swelling, small amorphous densities', 'Severe swelling, large flocculent densities, MPTP opening'],
          ['Plasma Membrane', 'Blebbing, preserved integrity', 'Loss of integrity, membrane rupture, enzyme leakage'],
          ['Nucleus', 'Chromatin clumping (reversible)', 'Pyknosis, Karyorrhexis, or Karyolysis'],
          ['Calcium Influx', 'Mild transient increase', 'Massive influx activating proteases, endonucleases'],
          ['Enzyme Leakage', 'No serum leakage', 'Marked leakage (Troponin, CK-MB, AST, ALT, LDH)'],
          ['Recovery Potential', 'Complete recovery on removal of stress', 'Inevitably progresses to cell death']
        ]
      }
    ],
    clinicalPearls: [
      'Serum cardiac biomarkers (Cardiac Troponin I/T and CK-MB) rise in blood ONLY after irreversible plasma membrane rupture of cardiomyocytes occurs.',
      'Reperfusion of ischemic tissue can paradoxically accelerate damage via "Reperfusion Injury", driven by bursts of Reactive Oxygen Species (ROS) and calcium overload from newly restored blood.',
      'Antioxidants (Vitamin E, Vitamin C, Glutathione, Superoxide Dismutase) act as natural scavengers to neutralize free radicals.'
    ],
    homoeopathicCorrelation: {
      miasmaticDominance: 'Psora',
      miasmaticAnalysis: 'Reversible cell injury (functional alteration, hydropic swelling, physiological stress) is the pure manifestation of the Psoric miasm. When cellular defense fails, structural degradation and destructive necrosis emerge, signaling the transition into the Syphilitic miasm (ulceration, mortification, tissue death). Intracellular accumulations and hyperplasias reflect the Sycotic miasm.',
      remedyAffinities: [
        {
          remedy: 'Arsenicum Album',
          stageOrIndication: 'Rapid cellular breakdown, severe oxidative stress, burning pains relieved by heat, extreme prostration.',
          pathologicalRationale: 'Arsenic is a classical cellular toxin that inhibits mitochondrial pyruvate dehydrogenase and uncouples oxidative phosphorylation, mimicking acute hypoxic cell death.'
        },
        {
          remedy: 'Carbo Vegetabilis',
          stageOrIndication: 'Imminent cellular collapse, venous stasis, coldness, air hunger (the "corpse reviver").',
          pathologicalRationale: 'Deep tissue hypoxia, terminal ischemic cellular stasis with failure of peripheral microcirculation and ATP crisis.'
        },
        {
          remedy: 'Phosphorus',
          stageOrIndication: 'Fatty degeneration of parenchymatous organs (liver, heart, kidneys), tendency to hemorrhages.',
          pathologicalRationale: 'Selectively induces mitochondrial steatosis and toxic parenchymatous degenerations.'
        }
      ],
      practicalHomoeopathicApplication: 'Understanding whether a pathological state is reversible (psoric-functional) or irreversible (syphilitic-destructive) determines whether our homoeopathic prescription can achieve complete anatomical restitution or only palliative mitigation.'
    },
    examPreparation: {
      laqs: [
        {
          question: 'Define cell injury. Describe the etiology, biochemical mechanisms, and morphology of ischemic cell injury. Differentiate reversible from irreversible cell injury.',
          marks: 10,
          blueprint: [
            'Definition and classification of causes of cell injury (2 Marks)',
            'Pathogenesis of ischemic cell injury: ATP depletion, Ca2+ influx, ROS generation, membrane damage (4 Marks)',
            'Morphology: Light and electron microscopic features (2 Marks)',
            'Systematic comparison table of Reversible vs Irreversible injury (2 Marks)'
          ]
        }
      ],
      saqs: [
        {
          question: 'Describe the role of Free Radicals and Reactive Oxygen Species (ROS) in cell injury.',
          marks: 5,
          answerKey: [
            'Definition of free radicals with examples (O2•-, •OH, H2O2)',
            'Three major cell-damaging mechanisms: Lipid peroxidation of membranes, protein cross-linking, and DNA strand breaks',
            'Endogenous antioxidant defense mechanisms (Superoxide dismutase, Catalase, Glutathione peroxidase)',
            'Clinical conditions linked to ROS: Ischemia-reperfusion injury, radiation, iron overload, aging'
          ]
        },
        {
          question: 'Enumerate the nuclear changes seen in cell death.',
          marks: 5,
          answerKey: [
            'Pyknosis: Nuclear shrinkage and increased basophilia/dark dense condensation',
            'Karyorrhexis: Fragmentation of pyknotic nucleus into chromatin fragments',
            'Karyolysis: Dissolution of chromatin by DNase and lysosomal enzymes with complete disappearance of nucleus',
            'Timeframe and clinical significance in histopathology'
          ]
        }
      ],
      mcqs: [
        {
          question: 'The earliest morphological indicator of reversible cell injury under light microscopy is:',
          options: ['Karyorrhexis', 'Hydropic swelling (cellular swelling)', 'Karyolysis', 'Pyknosis'],
          correctIndex: 1,
          explanation: 'Hydropic swelling (cloudy swelling) caused by failure of energy-dependent Na+/K+ membrane pumps is the earliest microscopic sign of reversible cell injury.'
        },
        {
          question: 'Which of the following enzymes is responsible for detoxifying superoxide radicals into hydrogen peroxide?',
          options: ['Catalase', 'Glutathione peroxidase', 'Superoxide dismutase (SOD)', 'Myeloperoxidase'],
          correctIndex: 2,
          explanation: 'Superoxide dismutase (SOD) converts superoxide (O2•-) into hydrogen peroxide (H2O2) and oxygen.'
        },
        {
          question: 'The point of no return in irreversible cell injury is primarily determined by:',
          options: ['Loss of ribosome attachment to ER', 'Massive mitochondrial damage with opening of MPTP and membrane rupture', 'Lactic acid accumulation in cytoplasm', 'Cellular swelling with clear vacuoles'],
          correctIndex: 1,
          explanation: 'Severe irreversible mitochondrial damage with opening of the mitochondrial permeability transition pore (MPTP) and widespread plasma membrane rupture dictate the point of no return.'
        }
      ],
      vivaVoce: [
        {
          question: 'What are the three cardinal nuclear changes seen in necrotic cell death?',
          answer: 'Pyknosis (condensation), Karyorrhexis (fragmentation), and Karyolysis (dissolution).',
          examinerTip: 'State all three terms in exact sequence to demonstrate complete understanding of nuclear breakdown.'
        },
        {
          question: 'Why does severe hypoxia cause intracellular lactic acidosis?',
          answer: 'In the absence of oxygen, oxidative phosphorylation halts, forcing the cell into anaerobic glycolysis. This rapidly consumes glycogen and produces excess lactic acid, dropping intracellular pH.',
          examinerTip: 'Mention that the drop in pH causes condensation of nuclear chromatin.'
        }
      ]
    }
  },

  // 2. NECROSIS VS APOPTOSIS & GANGRENE
  'necrosis-vs-apoptosis': {
    id: 'note-gen-2',
    topicId: 'top-necrosis-apoptosis',
    slug: 'necrosis-vs-apoptosis',
    title: 'Types of Necrosis, Apoptosis & Gangrene',
    chapterId: 'gen-cell-injury',
    chapterTitle: 'Cell Injury, Cellular Adaptations & Cell Death',
    competencyCode: 'HomUG-PM I.4',
    overview: 'Cell death occurs primarily via two distinct pathways: Necrosis (accidental, unprogrammed cell death characterized by cellular swelling, membrane rupture, enzymatic digestion, and surrounding inflammation) and Apoptosis (programmed, gene-directed single-cell suicide without plasma membrane disruption or inflammation). Gangrene is necrosis with superadded putrefaction.',
    learningObjectives: [
      'Classify the morphological patterns of necrosis (Coagulative, Liquefactive, Caseous, Fat, Fibrinoid) with organ examples.',
      'Explain the biochemical mechanisms of Apoptosis (Intrinsic mitochondrial vs Extrinsic death-receptor pathways).',
      'Compare Necrosis systematically with Apoptosis in a comprehensive table.',
      'Differentiate Dry, Wet, and Gas gangrene regarding etiology, pathogenesis, and clinical outcomes.'
    ],
    keyDefinitions: [
      {
        term: 'Necrosis',
        definition: 'A spectrum of morphological changes that follow cell death in living tissue, largely resulting from the progressive enzymatic degradation of lethally injured cells accompanied by an inflammatory response.'
      },
      {
        term: 'Apoptosis',
        definition: 'A pathway of cell death in which cells activate intracellular enzymes (caspases) that degrade the cells own nuclear DNA and cytoplasmic proteins, followed by phagocytosis without eliciting an inflammatory host reaction.'
      },
      {
        term: 'Gangrene',
        definition: 'A form of massive tissue necrosis usually combined with superadded putrefactive bacterial infection and ischemia.'
      }
    ],
    etiologyAndCauses: [
      {
        category: 'Types of Necrosis & Classic Sites',
        causes: [
          'Coagulative Necrosis: Ischemia/Infarction in solid organs (Heart, Kidney, Spleen) EXCEPT the brain',
          'Liquefactive / Colliquative Necrosis: Ischemic stroke / Infarction of the Brain (CNS) and focal bacterial/fungal abscesses',
          'Caseous Necrosis: Mycobacterium tuberculosis infection and fungal infections (Histoplasmosis)',
          'Fat Necrosis: Acute pancreatitis (Enzymatic - saponification) and trauma to breast/adipose tissue (Traumatic)',
          'Fibrinoid Necrosis: Immune-complex vasculitis (Polyarteritis Nodosa, Malignant Hypertension, Aschoff nodule)'
        ]
      },
      {
        category: 'Triggers of Apoptosis',
        causes: [
          'Physiological: Embryogenesis, hormone-dependent involution (endometrium during menses, lactating breast weaning), elimination of self-reactive lymphocytes',
          'Pathological: DNA damage (radiation, chemotherapy), accumulation of misfolded proteins (ER stress), viral infections (viral hepatitis - Councilman bodies)'
        ]
      }
    ],
    pathogenesis: {
      title: 'Intrinsic (Mitochondrial) vs Extrinsic (Death Receptor) Pathways of Apoptosis',
      description: 'Both pathways converge on the activation of executioner caspases (Caspase-3 and Caspase-6), culminating in organized cellular disassembly.',
      flowSteps: [
        'Intrinsic Pathway Trigger: DNA damage / Growth factor deprivation / Oxidative stress -> Sensor proteins (BH3-only: BIM, BID, PUMA) activated.',
        'Pro-apoptotic factors (BAX, BAK) oligomerize on mitochondrial outer membrane -> Increase membrane permeability.',
        'Mitochondria release Cytochrome c into cytosol -> Binds APAF-1 -> Forms Apoptosome -> Activates Initiator Caspase-9.',
        'Extrinsic Pathway Trigger: FasL binds Fas (CD95) receptor OR TNF-alpha binds TNFR1 -> Trimerization of death domain (FADD).',
        'Recruitment and activation of Initiator Caspase-8 and Caspase-10.',
        'Convergence: Initiator caspases cleave and activate Executioner Caspases (Caspase-3, Caspase-6, Caspase-7).',
        'Executioner caspases activate endonucleases (cleave DNA into 180-200 bp fragments - DNA laddering) and degrade cytoskeletal proteins.',
        'Cell fragments into membrane-bound Apoptotic Bodies expressing Phosphatidylserine on outer leaflet -> Rapid phagocytosis by macrophages without inflammation.'
      ],
      molecularMediators: ['Bcl-2 (Anti-apoptotic)', 'Bax/Bak (Pro-apoptotic)', 'Cytochrome c', 'Caspase-9', 'Caspase-8', 'Caspase-3', 'Phosphatidylserine']
    },
    morphology: {
      gross: [
        'Coagulative Necrosis: Pale, firm, wedge-shaped infarct with preserved organ outline.',
        'Liquefactive Necrosis: Soft, liquid, viscous mass with cavity formation (cerebral encephalomalacia).',
        'Caseous Necrosis: Friable, yellowish-white, cheesy, structureless material resembling dry cream cheese.',
        'Fat Necrosis: Chalky-white, opaque, gritty deposits ("calcium soaps" resulting from saponification).',
        'Dry Gangrene: Shriveled, dry, mummified, black limb with a sharp line of demarcation.',
        'Wet Gangrene: Swollen, edematous, foul-smelling, putrid, dark red-to-black tissue with no clear line of demarcation.'
      ],
      microscopic: [
        'Coagulative: "Tombstone" / "Ghost cell" appearance—cell outlines and tissue architecture are preserved for days, but nuclei are absent (pyknotic/karyolytic).',
        'Liquefactive: Total loss of architecture; cystic space filled with cellular debris, liquefied material, and foamy lipid-laden macrophages.',
        'Caseous: Amorphous, granular, eosinophilic structureless debris surrounded by epithelioid granuloma and Langhans giant cells.',
        'Fat Necrosis: Shadowy outlines of dead adipocytes with basophilic calcium soap deposits and foamy histiocytes.',
        'Fibrinoid: Bright pink (eosinophilic), smudgy, homogeneous fibrin-like deposits in the walls of blood vessels.'
      ]
    },
    comparisonTables: [
      {
        title: 'Necrosis vs Apoptosis',
        headers: ['Feature', 'Necrosis', 'Apoptosis'],
        rows: [
          ['Cell Size', 'Enlarged (Cell swelling / oncosis)', 'Reduced (Cell shrinkage)'],
          ['Nucleus', 'Pyknosis -> Karyorrhexis -> Karyolysis', 'Fragmentation into nucleosome-size fragments (laddering)'],
          ['Plasma Membrane', 'Disrupted / lysed (Loss of integrity)', 'Intact; altered structure (blebbing, phosphatidylserine inversion)'],
          ['Cellular Contents', 'Enzymatic digestion; leaks out into ECM', 'Intact inside apoptotic bodies'],
          ['Adjacent Inflammation', 'Frequent and prominent', 'Absent (Silent phagocytosis)'],
          ['Physiologic / Pathologic', 'Invariably pathologic', 'Often physiologic (embryogenesis); also pathologic'],
          ['Mechanism', 'ATP depletion, membrane lysis', 'Energy-dependent gene-directed caspase activation']
        ]
      },
      {
        title: 'Dry Gangrene vs Wet Gangrene',
        headers: ['Feature', 'Dry Gangrene', 'Wet Gangrene'],
        rows: [
          ['Primary Cause', 'Gradual arterial occlusion (Atherosclerosis, Buerger disease)', 'Sudden arterial + venous obstruction (Thrombosis, strangulated hernia, diabetic foot)'],
          ['Site Predilection', 'Distal extremities (Toes, feet)', 'Moist organs (Bowel, lung, vulva, cervix) and diabetic extremities'],
          ['Bacterial Infection', 'Minimal / absent', 'Extensive bacterial putrefaction (Saprophytic bacteria)'],
          ['Moisture & Odor', 'Dry, shriveled, mummified, no foul odor', 'Moist, edematous, soft, extremely foul-smelling'],
          ['Line of Demarcation', 'Clear, sharp line of demarcation present', 'No clear line of demarcation; spreads rapidly'],
          ['Systemic Toxemia', 'Mild or absent', 'Severe, life-threatening septicemia and toxemia'],
          ['Prognosis', 'Better localized prognosis', 'Poor; emergency amputation required']
        ]
      }
    ],
    clinicalPearls: [
      'The brain undergoes Liquefactive necrosis upon infarction (not coagulative) because of its high lipid content and abundance of hydrolytic lysosomal enzymes.',
      'Councilman bodies seen in acute viral hepatitis and Civatte bodies in lichen planus are classical histological examples of apoptotic hepatocytes/keratinocytes.',
      'Saponification in acute pancreatitis occurs when pancreatic lipases hydrolyze triglycerides into free fatty acids, which combine with calcium (Ca2+) to form chalky-white soaps, causing hypocalcemia.'
    ],
    homoeopathicCorrelation: {
      miasmaticDominance: 'Syphilis',
      miasmaticAnalysis: 'Necrosis, gangrene, and destructive tissue lysis are the ultimate expressions of the Syphilitic miasm (destruction, ulceration, mortification, fetid discharges). Wet gangrene with septic putrefaction represents a combined Syphilitic-Psoric/Sycotic crisis. Apoptosis in physiological remodeling represents health; dysregulated apoptosis (excessive in neurodegeneration = Syphilis; defective in tumors = Sycosis).',
      remedyAffinities: [
        {
          remedy: 'Secale Cornutum',
          stageOrIndication: 'Dry gangrene of extremities in elderly, Raynaud disease, cold skin but patient cannot bear to be covered.',
          pathologicalRationale: 'Ergot alkaloids induce prolonged peripheral arteriolar spasm, causing ischemic coagulative necrosis and dry mummification.'
        },
        {
          remedy: 'Lachesis Mutus',
          stageOrIndication: 'Wet gangrene, purplish-black discoloration, extreme sepsis, cellulitis, blood decomposition, intolerance of touch.',
          pathologicalRationale: 'Crotaline venom contains phospholipases and hemolysins causing endothelial lysis, microvascular thrombosis, and rapidly spreading putrefactive necrosis.'
        },
        {
          remedy: 'Anthracinum',
          stageOrIndication: 'Malignant pustule, black gangrenous sloughs, severe burning pains with extreme prostration.',
          pathologicalRationale: 'Specific nosode for severe necrotizing cutaneous infections and carbuncles.'
        }
      ],
      practicalHomoeopathicApplication: 'When gangrenous changes emerge, immediate recognition of the syphilitic destruction guides both urgent surgical consultation and constitutional/deep-acting nosode therapy.'
    },
    examPreparation: {
      laqs: [
        {
          question: 'Classify the types of Necrosis with examples. Describe the gross and microscopic features of Caseous and Liquefactive necrosis. Differentiate Dry Gangrene from Wet Gangrene.',
          marks: 10,
          blueprint: [
            'Classification of 5 types of necrosis with organ sites (3 Marks)',
            'Detailed morphology of Caseous (Tuberculosis) and Liquefactive (Brain infarct) necrosis (3 Marks)',
            'Systematic comparison of Dry vs Wet gangrene (4 Marks)'
          ]
        }
      ],
      saqs: [
        {
          question: 'Describe the morphological features and mechanism of Fat Necrosis.',
          marks: 5,
          answerKey: [
            'Enzymatic (acute pancreatitis) vs Traumatic (breast trauma) fat necrosis',
            'Enzyme release (lipases) hydrolyzing neutral fats into fatty acids',
            'Saponification: Fatty acids combine with calcium ions to form chalky-white soaps',
            'Microscopy: Shadowy outlines of dead adipocytes with basophilic calcium deposits'
          ]
        },
        {
          question: 'Explain the intrinsic (mitochondrial) pathway of Apoptosis.',
          marks: 5,
          answerKey: [
            'Triggers: DNA damage, withdrawal of growth factors, oxidative stress',
            'Role of pro-apoptotic Bcl-2 family members (Bax, Bak) increasing mitochondrial permeability',
            'Release of Cytochrome c and formation of apoptosome with APAF-1',
            'Activation of Caspase-9 followed by executioner Caspase-3'
          ]
        }
      ],
      mcqs: [
        {
          question: 'Cerebral infarction in the brain leads to which type of necrosis?',
          options: ['Coagulative necrosis', 'Liquefactive necrosis', 'Caseous necrosis', 'Fat necrosis'],
          correctIndex: 1,
          explanation: 'Hypoxic death of cells within the central nervous system (CNS) characteristically results in liquefactive necrosis due to rich enzymatic content and lack of fibrous stroma.'
        },
        {
          question: 'The classical "tombstone" or ghost-like outline of dead cells with preserved architecture is seen in:',
          options: ['Coagulative necrosis', 'Liquefactive necrosis', 'Fibrinoid necrosis', 'Caseous necrosis'],
          correctIndex: 0,
          explanation: 'Coagulative necrosis preserves the cellular architecture for days because denaturation of proteins also denatures proteolytic enzymes, preventing immediate lysis.'
        },
        {
          question: 'Which of the following caspases is an initiator caspase in the extrinsic apoptotic pathway?',
          options: ['Caspase-3', 'Caspase-8', 'Caspase-9', 'Caspase-6'],
          correctIndex: 1,
          explanation: 'Caspase-8 (and Caspase-10) is the initiator caspase recruited by death domain adaptors in the extrinsic (death receptor) pathway.'
        }
      ],
      vivaVoce: [
        {
          question: 'Where is Fibrinoid necrosis commonly encountered?',
          answer: 'In immune-mediated vascular reactions such as Polyarteritis Nodosa, Systemic Lupus Erythematosus, malignant hypertension, and the Aschoff nodules of Rheumatic Heart Disease.',
          examinerTip: 'Emphasize that it is characterized by bright pink, smudgy deposits of antigen-antibody complexes and extravasated fibrin in arterial walls.'
        },
        {
          question: 'What is the hallmark difference between Dry and Wet gangrene regarding the line of demarcation?',
          answer: 'Dry gangrene has a clear, well-defined line of demarcation between viable and dead tissue, whereas Wet gangrene lacks a clear demarcation line and spreads rapidly.',
          examinerTip: 'Mention that dry gangrene is purely arterial with mummification, whereas wet gangrene involves bacterial putrefaction.'
        }
      ]
    }
  },

  // 3. CELLULAR ADAPTATIONS
  'cellular-adaptations': {
    id: 'note-gen-3',
    topicId: 'top-cellular-adaptations',
    slug: 'cellular-adaptations',
    title: 'Cellular Adaptations of Growth & Differentiation',
    chapterId: 'gen-cell-injury',
    chapterTitle: 'Cell Injury, Cellular Adaptations & Cell Death',
    competencyCode: 'HomUG-PM I.3',
    overview: 'Cellular adaptations are reversible functional and structural responses to severe physiological stresses and pathological stimuli, during which new steady states are achieved, allowing the cell to survive and continue to function. The principal adaptive responses are Hypertrophy, Hyperplasia, Atrophy, and Metaplasia.',
    learningObjectives: [
      'Define Hypertrophy, Hyperplasia, Atrophy, Metaplasia, and Dysplasia.',
      'Classify physiological and pathological examples for each adaptive mechanism.',
      'Explain the molecular and cellular triggers governing cellular adaptations.',
      'Differentiate Metaplasia from Dysplasia and understand their premalignant potentials.'
    ],
    keyDefinitions: [
      {
        term: 'Hypertrophy',
        definition: 'An increase in the size of cells, resulting in an overall increase in the size of the organ, without an increase in cell number (occurs in non-dividing permanent cells).'
      },
      {
        term: 'Hyperplasia',
        definition: 'An increase in the number of cells in an organ or tissue, resulting in increased mass of the organ (occurs in labile and stable cells capable of division).'
      },
      {
        term: 'Atrophy',
        definition: 'A reduction in the size and mass of an organ or tissue resulting from a decrease in cell size and/or cell number.'
      },
      {
        term: 'Metaplasia',
        definition: 'A reversible change in which one adult/mature differentiated cell type (epithelial or mesenchymal) is replaced by another adult cell type better able to withstand the adverse environmental stress.'
      },
      {
        term: 'Dysplasia',
        definition: 'Disordered cellular growth and differentiation characterized by loss of architectural orientation, cellular pleomorphism, nuclear hyperchromasia, and increased mitotic figures without breach of basement membrane (atypical hyperplasia / pre-invasive stage).'
      }
    ],
    etiologyAndCauses: [
      {
        category: 'Hypertrophy Examples',
        causes: [
          'Physiological: Skeletal muscle enlargement in bodybuilders (mechanical demand); Gravid uterus during pregnancy (estrogen-stimulated smooth muscle hypertrophy + hyperplasia)',
          'Pathological: Left ventricular hypertrophy (LVH) in systemic hypertension and aortic stenosis (pressure overload); Right ventricular hypertrophy (cor pulmonale)'
        ]
      },
      {
        category: 'Hyperplasia Examples',
        causes: [
          'Physiological Hormonal: Female breast proliferation at puberty and pregnancy; Proliferative endometrium',
          'Physiological Compensatory: Liver regeneration after partial hepatectomy (driven by HGF, IL-6); Bone marrow erythroid hyperplasia in chronic hypoxia',
          'Pathological: Endometrial hyperplasia (excess estrogen -> abnormal uterine bleeding); Benign Prostatic Hyperplasia (BPH - dihydrotestosterone driven); Skin warts (HPV infection)'
        ]
      },
      {
        category: 'Atrophy Causes',
        causes: [
          'Physiological: Involution of embryonic structures (notochord, thyroglossal duct); Postmenopausal atrophy of uterus and ovaries; Thymus involution with age',
          'Pathological: Disuse atrophy (immobilized fractured limb); Denervation atrophy (Poliomyelitis, motor neuron disease); Ischemic atrophy (atherosclerotic renal atrophy); Malnutrition (Cachexia); Endocrine loss (Hypopituitarism)'
        ]
      },
      {
        category: 'Metaplasia Types',
        causes: [
          'Columnar to Squamous Metaplasia: Respiratory tract of chronic cigarette smokers (ciliated pseudostratified columnar replaced by stratified squamous); Endocervical transformation zone',
          'Squamous to Columnar Metaplasia: Barrett Esophagus in chronic GERD (squamous epithelium replaced by intestinal-type goblet-cell columnar epithelium -> adenocarcinoma risk)',
          'Connective Tissue Metaplasia: Myositis ossificans (bone formation in skeletal muscle after intramuscular trauma)'
        ]
      }
    ],
    pathogenesis: {
      title: 'Molecular Mechanisms of Hypertrophy & Metaplasia',
      description: 'Cellular adaptations involve reprogramming of stem cells and signal transduction pathways in response to growth factors and mechanical stretch.',
      flowSteps: [
        'Hypertrophy: Mechanical sensors (integrins) + Vasoactive agonists (Endothelin-1, Angiotensin II) + Growth factors (IGF-1, TGF-beta) activated.',
        'Signal cascades (GATA4, NFAT, MEF2 transcription factors) upregulate synthesis of contractile proteins (myosin light chains, alpha-actin).',
        'Induction of embryonic/fetal genes (ANP - Atrial Natriuretic Peptide) to handle hemodynamics.',
        'Metaplasia: Chronic irritation/stress -> Cytokines and growth factors reprogram local tissue stem cells (or undifferentiated mesenchymal cells).',
        'Transcription factors redirect differentiation pathway towards a more resilient cell type (e.g., squamous epithelium resistant to smoke).'
      ],
      molecularMediators: ['IGF-1', 'TGF-beta', 'Endothelin-1', 'ANP', 'Ubiquitin-Proteasome system (Atrophy)']
    },
    morphology: {
      gross: [
        'Left Ventricular Hypertrophy: Concentric thickening of left ventricular wall (>15 mm) without ventricular dilation (concentric) or with dilation (eccentric).',
        'Senile Atrophy of Brain: Narrowing of gyri, widening of sulci, enlarged ventricles (hydrocephalus ex vacuo).',
        'Barrett Esophagus: Salmon-pink, velvety mucosa extending upward from the gastroesophageal junction into the pale squamous esophagus.'
      ],
      microscopic: [
        'Hypertrophy: Enlarged cells with abundant cytoplasm and prominent, enlarged, hyperchromatic nuclei ("boxcar" nuclei in cardiomyocytes).',
        'Atrophy: Small cells with reduced organelles, increased autophagic vacuoles, and accumulation of golden-brown perinuclear Lipofuscin pigment ("brown atrophy of heart").',
        'Metaplasia: Fully differentiated mature epithelium of a different lineage (e.g., intestinal-type goblet cells in esophageal biopsy).',
        'Dysplasia: Architectural disarray, marked pleomorphism, high N:C ratio, hyperchromatic nuclei, loss of polarity, and mitoses in upper layers of epithelium.'
      ]
    },
    comparisonTables: [
      {
        title: 'Hypertrophy vs Hyperplasia',
        headers: ['Feature', 'Hypertrophy', 'Hyperplasia'],
        rows: [
          ['Definition', 'Increase in cell volume/size', 'Increase in cell number/multiplication'],
          ['Tissue Type', 'Permanent/non-dividing cells (Cardiomyocytes, skeletal muscle)', 'Labile and stable dividing cells (Epithelia, bone marrow, glands)'],
          ['Mechanism', 'Increased protein and organelle synthesis', 'Stem cell proliferation driven by growth factors'],
          ['Co-occurrence', 'Can occur alone or with hyperplasia', 'Frequently occurs alongside hypertrophy (e.g., pregnant uterus)'],
          ['Reversibility', 'Reversible upon removal of stress', 'Reversible when growth stimulus ceases']
        ]
      },
      {
        title: 'Metaplasia vs Dysplasia',
        headers: ['Feature', 'Metaplasia', 'Dysplasia'],
        rows: [
          ['Nature', 'Reversible change of one mature cell type to another', 'Disordered, atypical growth with loss of maturation'],
          ['Atypia & Pleomorphism', 'Absent; cells are mature and well-differentiated', 'Present; pleomorphism, hyperchromasia, high N:C ratio'],
          ['Malignant Potential', 'Low directly, but prolonged stress predisposes to dysplasia', 'High; considered a definitive premalignant lesion (CIN, pre-invasive carcinoma)'],
          ['Reversibility', 'Completely reversible if stimulus removed', 'Mild-moderate can reverse; severe dysplasias often progress to carcinoma in situ']
        ]
      }
    ],
    clinicalPearls: [
      'In pure non-dividing tissues (such as heart muscle), increased mechanical workload induces pure Hypertrophy. In dividing tissues (such as endometrium or prostate), it induces Hyperplasia.',
      'Brown atrophy of the heart in elderly and cachectic patients is caused by the accumulation of Lipofuscin, a wear-and-tear pigment composed of peroxidized lipids.',
      'Barrett esophagus requires endoscopic surveillance biopsies because the columnar metaplasia carries a 30- to 40-fold increased risk of developing Esophageal Adenocarcinoma.'
    ],
    homoeopathicCorrelation: {
      miasmaticDominance: 'Sycotic',
      miasmaticAnalysis: 'Hypertrophy and Hyperplasia (excessive growth, cell multiplication, tissue proliferation, overproduction, warts, polyps, BPH) are quintessential manifestations of the Sycotic miasm. Atrophy and degeneration reflect the Syphilitic/Psoric-atrophic spectrum. Dysplasia represents the perilous borderland where Sycosis (proliferation) meets Syphilis (atypia, destruction, cancerous dyscrasia).',
      remedyAffinities: [
        {
          remedy: 'Thuja Occidentalis',
          stageOrIndication: 'King of sycotic remedies: warts, condylomata, benign epithelial hyperplasias, prostatic enlargement, cystic ovaries.',
          pathologicalRationale: 'Deep affinity for epithelial and glandular hyperplasia driven by chronic sycotic dyscrasia.'
        },
        {
          remedy: 'Baryta Carbonica',
          stageOrIndication: 'Atrophy of brain in elderly, senile dementia, delayed development in children, glandular hypertrophy with tissue induration.',
          pathologicalRationale: 'Tissue involution, vascular sclerosis, and senile ischemic atrophy.'
        },
        {
          remedy: 'Sabal Serrulata',
          stageOrIndication: 'Benign Prostatic Hyperplasia (BPH) with urinary hesitancy, dysuria, and dribbling in elderly men.',
          pathologicalRationale: 'Exerts anti-androgenic effect on dihydrotestosterone-stimulated prostatic stromal and epithelial hyperplasia.'
        }
      ],
      practicalHomoeopathicApplication: 'Recognizing whether a pathological process is hyperplastic (sycotic), atrophic (syphilitic/psoric), or dysplastic (mixed miasmatic) enables the physician to choose deep-acting anti-miasmatic medicines (Thuja, Medorrhinum, Syphilinum, Baryta Carb) to arrest structural progression.'
    },
    examPreparation: {
      laqs: [
        {
          question: 'Define Cellular Adaptations. Classify and describe Hypertrophy, Hyperplasia, Atrophy, and Metaplasia with physiological and pathological examples. Differentiate Metaplasia from Dysplasia.',
          marks: 10,
          blueprint: [
            'Definition and scope of cellular adaptations (2 Marks)',
            'Hypertrophy and Hyperplasia: mechanisms and examples (3 Marks)',
            'Atrophy and Metaplasia: types, mechanisms, and examples (3 Marks)',
            'Metaplasia vs Dysplasia comparative table and clinical significance (2 Marks)'
          ]
        }
      ],
      saqs: [
        {
          question: 'Define Metaplasia. Describe the types of metaplasia with clinical examples and mention its premalignant significance.',
          marks: 5,
          answerKey: [
            'Definition of metaplasia as a reversible mature cell substitution',
            'Squamous metaplasia in respiratory tract (smokers) and endocervix',
            'Columnar metaplasia (Barrett esophagus in GERD)',
            'Connective tissue metaplasia (Myositis ossificans)',
            'Premalignant potential in Barrett esophagus progressing to adenocarcinoma'
          ]
        },
        {
          question: 'Explain the mechanisms and causes of Pathological Atrophy.',
          marks: 5,
          answerKey: [
            'Definition of atrophy (reduction in cell size and mass)',
            'Biochemical mechanism: Ubiquitin-proteasome pathway protein degradation and autophagy',
            'Enumerate causes: Disuse, denervation, ischemia, malnutrition, loss of endocrine stimulation, pressure atrophy',
            'Morphology: Lipofuscin accumulation and brown atrophy'
          ]
        }
      ],
      mcqs: [
        {
          question: 'Barrett esophagus is a classic histological example of:',
          options: ['Squamous metaplasia', 'Columnar (intestinal) metaplasia', 'Endometrial hyperplasia', 'Dysplasia of bladder'],
          correctIndex: 1,
          explanation: 'In Barrett esophagus, the normal stratified squamous epithelium of the lower esophagus is replaced by intestinal-type columnar epithelium containing goblet cells in response to chronic acid reflux.'
        },
        {
          question: 'The wear-and-tear pigment associated with brown atrophy of the aging heart is:',
          options: ['Hemosiderin', 'Bilirubin', 'Lipofuscin', 'Melanin'],
          correctIndex: 2,
          explanation: 'Lipofuscin is an insoluble golden-brown endogenous pigment resulting from lipid peroxidation of autophagocytosed organelle membranes in aging or atrophic cells.'
        },
        {
          question: 'Which of the following cellular changes is considered a definitive pre-invasive premalignant lesion?',
          options: ['Hypertrophy', 'Atrophy', 'Dysplasia', 'Squamous metaplasia'],
          correctIndex: 2,
          explanation: 'Dysplasia is characterized by disordered architecture, nuclear pleomorphism, hyperchromasia, and loss of maturation, representing a true premalignant lesion.'
        }
      ],
      vivaVoce: [
        {
          question: 'Can the heart muscle undergo hyperplasia in response to systemic hypertension? Why or why not?',
          answer: 'No, adult cardiomyocytes are permanent, non-dividing cells and cannot undergo hyperplasia. They adapt to increased pressure overload solely through Hypertrophy (increase in individual cell size and myofibrillar proteins).',
          examinerTip: 'Clearly distinguish permanent cells from labile and stable cells.'
        },
        {
          question: 'What is the ubiquitin-proteasome pathway in atrophy?',
          answer: 'It is the primary cellular mechanism for degrading cytosolic and nuclear proteins in atrophying cells, where proteins are tagged with ubiquitin and digested by the 26S proteasome complex.',
          examinerTip: 'Mention that autophagy of cellular organelles accompanies this process.'
        }
      ]
    }
  }
};
