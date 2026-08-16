export interface ChapterSectionFullText {
  id: string;
  partNumber: string;
  partTitle: string;
  nchCompetency: string;
  estimatedReadTime: string;
  quickAnswer: string;
  introduction: string;
  keyDefinitions: { term: string; definition: string }[];
  subsections: {
    title: string;
    content: string[];
    bulletPoints?: string[];
    flowchartSteps?: string[];
    table?: {
      title: string;
      headers: string[];
      rows: string[][];
    };
  }[];
  morphology?: {
    gross: string[];
    microscopy: string[];
    keyIdentificationPoint?: string;
    keySpotterPoint?: string;
  };
  specialStains?: {
    stain: string;
    target: string;
    appearance: string;
    diagnosticSignificance?: string;
    clinicalUse?: string;
  }[];
  clinicalCorrelation: string[];
  homoeopathicCorrelation: {
    miasm: 'Psora' | 'Sycosis' | 'Syphilis' | 'Tubercular (Mixed)' | 'Sycotic' | 'Psoric' | 'Syphilitic';
    analysis?: string;
    miasmaticAnalysis?: string;
    clinicalApplication: string;
    remedies: { name: string; indication: string; rationale: string }[];
  };
  examPearls: string[];
}

export const cellInjuryFullTextChapter: ChapterSectionFullText[] = [
  // -------------------------------------------------------------------------------------------------
  // PART I — CELL INJURY (Introduction, Homeostasis, Etiology, Pathogenesis, Biochemical Mechanisms)
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-1-cell-injury',
    partNumber: 'PART I',
    partTitle: 'Cell Injury, Homeostasis & Core Biochemical Mechanisms',
    nchCompetency: 'HomUG-PM I.2 (Explain etiology, pathogenesis and morphology of cell injury)',
    estimatedReadTime: '12 min',
    quickAnswer: 'Cell injury is the state of altered cellular function and structure resulting when environmental, chemical, physical, or metabolic stresses exceed the homeostatic and adaptive capability of the cell. Progresses from reversible stage to irreversible cell death (necrosis or apoptosis).',
    introduction: 'The normal cell maintains a finely tuned, steady physiological state known as Homeostasis, handling normal physiological demands. When subjected to physiological stresses or pathological stimuli, the cell can undergo adaptation to achieve a new steady state. If the adaptive capability is exceeded, or if the external stress is inherently harmful, Cell Injury develops.',
    keyDefinitions: [
      {
        term: 'Homeostasis',
        definition: 'The dynamic physiological equilibrium maintained by cells, preserving internal biochemical and structural stability within narrow normal limits.'
      },
      {
        term: 'Cell Injury',
        definition: 'A sequence of biochemical and structural alterations that occur when exogenous or endogenous stresses exceed the capacity of cellular homeostatic mechanisms.'
      },
      {
        term: 'Hypoxia vs Ischaemia',
        definition: 'Hypoxia is a deficiency of oxygen in tissues with maintained perfusion; Ischaemia is a cessation or reduction of arterial blood supply, compromising oxygen, glucose, and metabolite washout.'
      }
    ],
    subsections: [
      {
        title: '1. Cellular Response to Stress: The Homeostatic Continuum',
        content: [
          'Every cell exists in a dynamic equilibrium. When challenged by stress, the cell follows a clear biological decision tree:',
          '1. NORMAL HOMEOSTASIS: Baseline physiological functioning and energy generation.',
          '2. ADAPTATION: If stress is non-lethal and persistent, cell alters size (hypertrophy/atrophy), number (hyperplasia), or phenotype (metaplasia).',
          '3. CELL INJURY: If stress exceeds adaptive threshold or is suddenly severe.',
          '4. REVERSIBLE CELL INJURY: Mild/transient injury; removal of stimulus restores baseline normalcy.',
          '5. IRREVERSIBLE INJURY & CELL DEATH: Severe, unrelenting injury crossing the "point of no return", leading to Necrosis (accidental lysis) or Apoptosis (programmed suicide).'
        ],
        flowchartSteps: [
          'Normal Cell Homeostasis',
          'Physiological / Pathological Stress',
          'Can cell adapt? -> YES: Cellular Adaptation (Hypertrophy, Hyperplasia, Atrophy, Metaplasia)',
          'Cannot adapt / Excessive Stress -> Cell Injury',
          'Is injury reversible? -> YES: Hydropic Swelling & Fatty Change -> Recovery on stress removal',
          'Is injury irreversible? -> NO: Point of No Return -> Irreversible Cell Death (Necrosis / Apoptosis)'
        ]
      },
      {
        title: '2. Complete Etiology of Cell Injury',
        content: [
          'The etiologic agents of cell injury are broad and classified into 10 major categories:'
        ],
        bulletPoints: [
          'Hypoxia & Ischemia: The most frequent cause. Hypoxia results from respiratory failure, severe anemia, CO poisoning; Ischemia results from arterial thrombosis (e.g. Myocardial Infarction) or embolism.',
          'Physical Agents: Mechanical trauma, thermal extremes (burns, deep frostbite), sudden atmospheric pressure shifts (caisson disease/decompression sickness), ionizing radiation, and high-voltage electric shock.',
          'Chemical Agents & Drugs: Poisons (cyanide, mercuric chloride, arsenic), environmental pollutants, carbon tetrachloride, therapeutic drugs (acetaminophen toxicity), and hypertonic glucose/salt solutions.',
          'Infectious Agents: Pathogenic viruses (HIV, hepatitis), bacteria (Staphylococcus, M. tuberculosis), fungi (Candida, Histoplasma), protozoa (Plasmodium), and helminths.',
          'Immunologic Reactions: Anaphylactic hypersensitivity, autoimmune destruction (Systemic Lupus Erythematosus, Rheumatoid arthritis), and immune-mediated graft rejection.',
          'Genetic Abnormalities: Chromosomal aberrations (Down syndrome), single-gene molecular defects (Sickle cell anemia), or inborn errors of metabolism (Gaucher disease).',
          'Nutritional Disturbances: Protein-calorie malnutrition (Kwashiorkor, Marasmus), specific vitamin deficiencies (Scurvy, Beriberi, Rickets), or nutritional excesses (Obesity, Atherosclerosis).',
          'Ageing: Cellular senescence with diminished proliferative and reparative capability, accumulated DNA mutations, and telomere shortening.',
          'Psychogenic & Psychosomatic Factors: Chronic neuropsychiatric stress inducing sympathetic overdrive and neurohormonal dysfunction.',
          'Iatrogenic Causes: Drug-induced toxicities, radiation complications, and invasive surgical trauma.'
        ]
      },
      {
        title: '3. Major Biochemical Mechanisms of Cell Injury',
        content: [
          'Regardless of the inciting cause, cell injury occurs through fundamental shared biochemical pathways operating at the subcellular level:',
          'A. ATP Depletion: Loss of oxygen halts oxidative phosphorylation in mitochondria. When ATP falls below 5–10% of normal, plasma membrane Na+/K+ ATPase fails, causing intracellular sodium and water accumulation (cellular swelling). Anaerobic glycolysis takes over, depleting glycogen stores and producing lactic acid, which drops intracellular pH and clumps nuclear chromatin.',
          'B. Mitochondrial Damage & Permeability Transition Pore (MPTP): Damaged by hypoxia, ROS, and high calcium. Opening of high-conductance MPTP dissipates the mitochondrial membrane potential, permanently halting ATP generation and releasing pro-apoptotic Cytochrome c into the cytosol.',
          'C. Intracellular Calcium Influx & Loss of Homeostasis: Extracellular Ca2+ is ~1.3 mmol/L, whereas cytosolic free Ca2+ is maintained <0.1 µmol/L. Membrane failure releases Ca2+ from ER and extracellular space, activating four destructive enzymes: Phospholipases (membrane lysis), Proteases (cytoskeletal degradation), Endonucleases (DNA chromatin cleavage), and ATPases (further ATP exhaustion).',
          'D. Reactive Oxygen Species (ROS) & Oxidative Stress: Accumulation of free radicals (Superoxide O2•-, Hydroxyl radical •OH, Hydrogen peroxide H2O2) causing: 1. Lipid peroxidation of membranes; 2. Oxidative protein modification; 3. DNA strand breaks. Neutralized by antioxidant enzymes: Superoxide Dismutase (SOD), Catalase, and Glutathione Peroxidase (GSH).',
          'E. Membrane Permeability Defects: Direct result of ATP depletion, calcium-activated phospholipases, and ROS-induced lipid peroxidation, affecting plasma membrane, mitochondrial membrane, and lysosomal membranes.',
          'F. Ischemia-Reperfusion Injury: Restoration of blood flow to ischemic tissue generates a massive sudden burst of ROS from newly introduced oxygen, accompanied by calcium overload and circulating inflammatory neutrophils, paradoxically exacerbating cellular destruction.'
        ]
      }
    ],
    clinicalCorrelation: [
      'Serum Cardiac Biomarkers: Cardiac Troponin I/T and CK-MB are normally confined inside myocardial cells. They leak into the peripheral bloodstream ONLY after irreversible plasma membrane lysis occurs in myocardial infarction.',
      'Reperfusion Therapy in MI: Primary percutaneous coronary intervention (PCI) must be performed within golden hours; reperfusion injury is mitigated with anti-inflammatory and free radical scavenging strategies.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Psora',
      miasmaticAnalysis: 'Reversible functional disturbances, cellular excitation, and initial hydropic swelling represent pure Psora (functional struggle of the Vital Force). When cellular defenses collapse and destructive structural lysis, necrosis, and mortification set in, the disease has entered the Syphilitic miasm. Chronic cellular accumulations and sluggish degenerations represent Sycosis.',
      clinicalApplication: 'Evaluating whether cellular pathology is at the reversible Psoric stage or irreversible Syphilitic stage determines whether homoeopathic prescribing aims for complete anatomical restitution or palliative relief.',
      remedies: [
        {
          name: 'Arsenicum Album',
          indication: 'Rapid cellular breakdown, profound prostration, intense burning pains relieved by warmth, midnight aggravation, anxiety.',
          rationale: 'Arsenic is a classical inhibitor of mitochondrial pyruvate dehydrogenase, perfectly reproducing the energetic collapse and oxidative crisis of severe cellular injury.'
        },
        {
          name: 'Carbo Vegetabilis',
          indication: 'Severe venous stasis, coldness of breath and extremities, air hunger (desires to be fanned), terminal collapse ("corpse reviver").',
          rationale: 'Addresses profound tissue hypoxia, microcirculatory stagnation, and severe cellular ATP depletion.'
        },
        {
          name: 'Phosphorus',
          indication: 'Fatty parenchymatous degenerations (liver, heart, kidneys), hemorrhagic diathesis, burning sensations.',
          rationale: 'Selective affinity for mitochondrial lipid metabolism and parenchymatous degeneration.'
        }
      ]
    },
    examPearls: [
      'The earliest morphological sign of reversible cell injury is Hydropic Swelling (cloudy swelling).',
      'The definitive point of no return in irreversible cell injury is marked by Opening of the Mitochondrial Permeability Transition Pore (MPTP) and loss of Plasma Membrane Integrity.',
      'Intracellular Calcium influx activates four key enzymes: Phospholipases, Proteases, Endonucleases, and ATPases.'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART II — REVERSIBLE CELL INJURY (Cellular Swelling, Hydropic Change, Fatty Change)
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-2-reversible-injury',
    partNumber: 'PART II',
    partTitle: 'Reversible Cell Injury, Cellular Swelling & Hydropic Degeneration',
    nchCompetency: 'HomUG-PM I.2 (Identify morphological features of reversible cell injury)',
    estimatedReadTime: '10 min',
    quickAnswer: 'Reversible cell injury represents mild or moderate cellular damage where structural and functional derangements can completely revert to normal baseline if the injurious stimulus is removed in a timely manner. The two cardinal light microscopic hallmarks are Cellular Swelling (Hydropic Change) and Fatty Change (Steatosis).',
    introduction: 'In reversible cell injury, the cell experiences sub-lethal stress. Although organelles swell and metabolic efficiency decreases, the plasma membrane remains structurally intact (no enzyme leakage), the nucleus remains viable (no pyknosis), and cellular energy production can recover upon re-oxygenation or removal of toxic agents.',
    keyDefinitions: [
      {
        term: 'Reversible Cell Injury',
        definition: 'Sub-lethal cellular damage characterized by functional derangements and morphological alterations that are fully reversible upon removal of the offending stimulus.'
      },
      {
        term: 'Hydropic Change (Cloudy Swelling)',
        definition: 'The earliest light-microscopic manifestation of cell injury, characterized by marked intracellular accumulation of water producing swollen, pale, vacuolated cells.'
      },
      {
        term: 'Myelin Figures',
        definition: 'Whorled, concentric phospholipid masses derived from damaged organelle and plasma membranes seen ultrastructurally in injured cells.'
      }
    ],
    subsections: [
      {
        title: '1. Mechanism of Cellular Swelling (Hydropic Change)',
        content: [
          'Cellular swelling is the nearly universal initial manifestation of almost all forms of cell injury:',
          '1. Injury halts ATP generation by mitochondria.',
          '2. The plasma membrane energy-dependent Na+/K+ ATPase pump ceases normal operation.',
          '3. Sodium (Na+) and water enter the cell, while potassium (K+) diffuses out.',
          '4. Water accumulates first in the cytoplasm and distends the cisternae of the Endoplasmic Reticulum (ER), causing hydropic vacuolation.',
          '5. Calcium and chloride also enter, compounding the osmotic gradient.'
        ]
      },
      {
        title: '2. Ultrastructural (Electron Microscopic) Changes in Reversible Injury',
        content: [
          'Under electron microscopy, reversible injury produces characteristic alterations:'
        ],
        bulletPoints: [
          'Plasma Membrane Alterations: Formation of surface cytoplasmic blebs, distortion, blunting or loss of specialized microvilli, and loosening of intercellular junctional complexes.',
          'Mitochondrial Alterations: Mild to moderate swelling, rarefaction of the inner mitochondrial matrix, and appearance of small amorphous calcium densities.',
          'Endoplasmic Reticulum Dilation: Widening of ER cisternae, detachment of polyribosomes from rough ER, and dispersion of ribosomes into the cytosol.',
          'Nuclear Alterations: Clumping of nuclear chromatin along the inner nuclear membrane due to intracellular lactic acidosis (reversible on restoration of neutral pH).'
        ]
      }
    ],
    morphology: {
      gross: [
        'Organ is enlarged, turgid, and heavy with increased water content.',
        'Capsule is tense and glistening.',
        'Cut surface is pale, opaque, and bulges outward beyond the cut edge (loss of normal glistening translucency, hence the historical term "cloudy swelling").'
      ],
      microscopy: [
        'Cells are distinctly enlarged, crowded, and compress adjacent capillary lumina.',
        'Cytoplasm is pale and filled with numerous fine, clear, micro-vacuoles representing distended ER cisternae.',
        'Nucleus is normal, centrally located, or slightly swollen, with intact nuclear membrane (no chromatin fragmentation).'
      ],
      keySpotterPoint: 'Proximal convoluted renal tubular epithelial cells showing pale, swollen cytoplasm with microvacuoles bulging into and narrowing the tubular lumen.'
    },
    clinicalCorrelation: [
      'Transient Ischemia / Angina Pectoris: Temporary coronary spasm or reduced perfusion causes hydropic swelling of cardiomyocytes, clinically presenting as chest tightness that promptly resolves with sublingual nitroglycerin (restoring blood supply before irreversible damage occurs).',
      'Acute Tubular Injury: Toxic or hypoxic swelling of renal tubular cells causes acute oliguria, but tubules regenerate completely once perfusion is restored.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Psora',
      miasmaticAnalysis: 'Pure expression of Psoric functional derangement. The vital dynamis is struggling against the noxious agent, producing reversible fluid shifts without structural tissue necrosis.',
      clinicalApplication: 'Psoric constitutional remedies administered at this stage reverse pathology rapidly without leaving chronic tissue scars.',
      remedies: [
        {
          name: 'Apis Mellifica',
          indication: 'Rapid cellular edema, stinging burning pains, thirstlessness, intolerance of heat.',
          rationale: 'Specific affinity for cellular swelling, serous effusion, and rapid capillary permeability shifts.'
        },
        {
          name: 'Bryonia Alba',
          indication: 'Effusion, severe stitching pains aggravated by slightest motion, relieved by absolute rest and pressure.',
          rationale: 'Deep affinity for serous membranes and acute inflammatory swelling.'
        }
      ]
    },
    examPearls: [
      'Hydropic change is reversible; if the stimulus ceases, the Na+/K+ pump reactivates and pumps water out.',
      'Nuclear integrity is the critical light microscopic feature distinguishing reversible injury (intact nucleus) from irreversible necrosis (pyknosis/karyolysis).'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART III — INTRACELLULAR ACCUMULATIONS & FATTY CHANGE (STEATOSIS)
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-3-intracellular-accumulations',
    partNumber: 'PART III',
    partTitle: 'Intracellular Accumulations & Fatty Change (Steatosis)',
    nchCompetency: 'HomUG-PM I.5 (Describe types of intracellular accumulations and fatty change)',
    estimatedReadTime: '14 min',
    quickAnswer: 'Intracellular accumulation refers to the abnormal build-up of substances within cells, categorized into lipids (triglycerides, cholesterol), proteins, glycogen, and pigments. Fatty change (Steatosis) is the abnormal accumulation of neutral triglycerides within parenchymal cells, most prominently in the liver.',
    introduction: 'Under various physiological stresses and pathological conditions, cells may accumulate abnormal amounts of substances. These substances may be normal cellular constituents accumulated in excess, abnormal endogenous substances resulting from mutated genes, or exogenous substances that the cell lacks the enzymatic machinery to degrade.',
    keyDefinitions: [
      {
        term: 'Steatosis (Fatty Change)',
        definition: 'The abnormal intracellular accumulation of neutral triglycerides within the cytoplasm of parenchymal cells (liver, heart, skeletal muscle, kidneys).'
      },
      {
        term: 'Russell Bodies',
        definition: 'Rounded, eosinophilic cytoplasmic inclusions within plasma cells representing massive accumulation of newly synthesized immunoglobulins in the rough ER.'
      },
      {
        term: 'Mallory-Denk Bodies (Alcoholic Hyaline)',
        definition: 'Eosinophilic, ropey, irregular cytoplasmic inclusions in hepatocytes of chronic alcoholics composed of tangled intermediate cytokeratin filaments.'
      },
      {
        term: 'Xanthoma',
        definition: 'Tumorous clusters of foamy, lipid-laden macrophages (histiocytes) accumulating in subepithelial connective tissues in hyperlipidemic states.'
      }
    ],
    subsections: [
      {
        title: '1. Four Fundamental Mechanisms of Intracellular Accumulation',
        content: [
          '1. Abnormal Metabolism / Inadequate Removal: Normal endogenous substance produced at normal rate, but metabolic rate is inadequate (e.g. Fatty liver due to defective triglyceride packaging).',
          '2. Defective Protein Folding / Transport: Abnormal endogenous substance accumulates due to genetic mutation preventing normal folding or transport (e.g. Alpha-1 Antitrypsin deficiency in hepatocytes).',
          '3. Lack of Degrading Enzyme: Inherited genetic deficiency of a lysosomal enzyme, leading to storage of undegraded substrate (e.g. Lysosomal Storage Diseases like Gaucher and Niemann-Pick).',
          '4. Ingestion of Indigestible Exogenous Material: Cell phagocytoses an insoluble exogenous pigment or mineral that it cannot metabolize (e.g. Carbon/coal dust in Anthracosis, Silica in Silicosis).'
        ]
      },
      {
        title: '2. Pathogenesis of Hepatic Steatosis (Fatty Liver)',
        content: [
          'The liver is the central organ in lipid metabolism. Triglyceride accumulation occurs through five key pathways:',
          '1. Increased entry of Free Fatty Acids (FFAs) from adipose tissue stores (seen in Starvation, Diabetes Mellitus, Corticosteroid therapy).',
          '2. Increased de novo synthesis of fatty acids from acetate in the liver (stimulated by Alcohol metabolism via high NADH/NAD+ ratio).',
          '3. Decreased mitochondrial beta-oxidation of fatty acids into acetyl-CoA (caused by mitochondrial toxins and alcohol).',
          '4. Impaired apoprotein synthesis required for lipoprotein packaging (seen in Protein-Calorie Malnutrition / Kwashiorkor and CCl4 toxicity).',
          '5. Impaired assembly and exocytosis of Very Low-Density Lipoproteins (VLDL) into circulation.'
        ]
      },
      {
        title: '3. Microvesicular vs Macrovesicular Steatosis',
        content: [
          'Steatosis manifests in two distinct histological patterns:'
        ],
        table: {
          title: 'Microvesicular vs Macrovesicular Fatty Liver',
          headers: ['Feature', 'Microvesicular Steatosis', 'Macrovesicular Steatosis'],
          rows: [
            ['Vacuole Size', 'Tiny, multiple, fine droplet vacuoles scattered in cytoplasm', 'Single large lipid globule occupying the entire cell'],
            ['Nuclear Position', 'Centrally located nucleus; NOT displaced to periphery', 'Pushes and flattens nucleus against the cell membrane ("Signet ring" appearance)'],
            ['Etiology', 'Reye syndrome, Acute Fatty Liver of Pregnancy (AFLP), Valproate toxicity, Tetracycline toxicity', 'Chronic Alcoholism, Obesity, Type 2 Diabetes Mellitus, Malnutrition (Kwashiorkor)'],
            ['Clinical Severity', 'Acute, severe, often fulminant hepatic failure', 'Chronic, insidious, slowly reversible on lifestyle correction']
          ]
        }
      },
      {
        title: '4. Other Intracellular Accumulations: Proteins, Glycogen & Cholesterol',
        content: [
          '• Protein Accumulations: 1. Protein reabsorption droplets in proximal renal tubules in nephrotic syndrome; 2. Russell bodies in plasma cells; 3. Mallory-Denk bodies in alcoholic hepatitis; 4. Neurofibrillary tangles in Alzheimer disease.',
          '• Glycogen Accumulation: Seen in Diabetes Mellitus (Armanni-Ebstein lesion in renal tubular epithelium and glycogenated hepatocyte nuclei) and in inborn Glycogen Storage Diseases (von Gierke, Pompe disease). Demonstrated by PAS stain.',
          '• Cholesterol & Cholesterol Esters: Accumulate in Atherosclerosis (foam cells in intima), Xanthomas (skin), and Cholesterolosis of gallbladder ("Strawberry gallbladder").'
        ]
      }
    ],
    morphology: {
      gross: [
        'Fatty Liver: Organ is markedly enlarged (can weigh 4–6 kg vs normal 1.5 kg), bright golden-yellow, soft, greasy to touch with rounded margins.',
        'Tigroid Heart ("Tabby-cat" heart): Alternating bands of yellow lipid-infiltrated myocardium and dark red unaffected muscle seen in chronic severe anemia.'
      ],
      microscopy: [
        'Routine H&E processing: Alcohols and xylene dissolve neutral fats during tissue preparation, leaving clear, empty, round vacuoles.',
        'Hepatocytes display clear cytoplasm displacing nuclei to the periphery (macrovesicular).',
        'Frozen cryostat sections stained with Oil Red O or Sudan Black B confirm bright red or black lipid droplets.'
      ],
      keySpotterPoint: 'Liver section showing clear empty vacuoles within hepatocytes displacing the nucleus to the cell periphery, confirmed red on Oil Red O frozen section.'
    },
    specialStains: [
      {
        stain: 'Oil Red O / Sudan Black B / Sudan IV',
        target: 'Neutral Lipids (Triglycerides)',
        appearance: 'Bright orange-red or jet black droplets (must use fresh frozen cryostat sections; paraffin processing dissolves lipids)',
        clinicalUse: 'Confirms Steatosis, Fat Embolism, and Sebaceous neoplasms.'
      },
      {
        stain: 'Periodic Acid-Schiff (PAS)',
        target: 'Intracellular Glycogen and Glycoproteins',
        appearance: 'Deep magenta / brilliant purple; confirmed by loss of staining after Diastase pre-digestion (PAS with Diastase labile)',
        clinicalUse: 'Demonstrates Glycogen storage diseases, diabetic renal glycogen, and fungal cell walls.'
      }
    ],
    clinicalCorrelation: [
      'Non-Alcoholic Fatty Liver Disease (NAFLD / MASLD): The hepatic manifestation of metabolic syndrome; can progress from simple steatosis to Non-Alcoholic Steatohepatitis (NASH), hepatic fibrosis, and Cirrhosis.',
      'Kwashiorkor in Children: Inadequate dietary protein causes failure of apoprotein synthesis, resulting in severe hepatomegaly with fatty liver despite generalized emaciation.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Sycosis',
      miasmaticAnalysis: 'Intracellular accumulation of lipids, cholesterol, and glycogen represents sluggish, over-accumulative Sycotic pathology (hyper-storage, metabolic stasis, infiltration). When steatosis progresses to necrosis and cirrhotic scarring, it combines with the Syphilitic miasm.',
      clinicalApplication: 'Targeted liver remedies and deep-acting sycotic anti-miasmatic remedies help clear metabolic congestion and hepatic sluggishness.',
      remedies: [
        {
          name: 'Chelidonium Majus',
          indication: 'Fatty liver, right hypochondriac pain radiating to inferior angle of right scapula, jaundice, sluggish digestion, yellow coated tongue.',
          rationale: 'Primary organ-affinity for hepatic parenchyma and biliary drainage.'
        },
        {
          name: 'Lycopodium Clavatum',
          indication: 'Fatty infiltration with severe bloating, 4 to 8 PM aggravation, craving for hot sweets, right-to-left progression, hepatic congestion.',
          rationale: 'Constitutional deep-acting sycotic remedy for metabolic and liver dysfunction.'
        },
        {
          name: 'Carduus Marianus',
          indication: 'Enlarged tender liver, engorged portal circulation, cirrhosis, pain in left lobe of liver.',
          rationale: 'Silymarin component stabilizes hepatocyte membranes and supports liver regeneration.'
        }
      ]
    },
    examPearls: [
      'Fat is dissolved by organic solvents during paraffin processing; therefore, special lipid stains (Oil Red O) MUST be performed on frozen sections.',
      'In Microvesicular steatosis, the nucleus remains central; in Macrovesicular steatosis, the nucleus is pushed to the periphery (signet-ring appearance).'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART IV — PIGMENTS (Endogenous: Lipofuscin, Melanin, Hemosiderin, Bilirubin; Exogenous: Carbon, Tattoo)
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-4-pigments',
    partNumber: 'PART IV',
    partTitle: 'Pathological Pigments: Endogenous & Exogenous Pigmentation',
    nchCompetency: 'HomUG-PM I.5 (Classify pigments with special stains and clinical significance)',
    estimatedReadTime: '12 min',
    quickAnswer: 'Pigments are colored substances that accumulate either inside cells or in the interstitial tissue, divided into Endogenous pigments (produced inside the body: Lipofuscin, Melanin, Hemosiderin, Bilirubin, Hemozoin) and Exogenous pigments (introduced from outside: Carbon/Anthracosis, Tattoo inks, Silica, Silver/Argyria).',
    introduction: 'Pigment accumulation provides critical diagnostic clues in autopsy pathology and histopathology, reflecting physiological aging, hemolysis, metabolic disorders, environmental exposures, or neoplastic melanogenesis.',
    keyDefinitions: [
      {
        term: 'Endogenous Pigments',
        definition: 'Pigments synthesized within the body from normal or altered metabolic precursors (Lipofuscin, Melanin, Hemosiderin, Bilirubin).'
      },
      {
        term: 'Exogenous Pigments',
        definition: 'Insoluble colored foreign particles introduced into the body through inhalation, ingestion, or cutaneous inoculation (Carbon, Silica, Tattoo inks).'
      },
      {
        term: 'Anthracosis',
        definition: 'The accumulation of inhaled carbon and coal dust particles within alveolar macrophages and tracheobronchial lymph nodes, imparting a black discoloration.'
      },
      {
        term: 'Hemosiderosis vs Hemochromatosis',
        definition: 'Hemosiderosis is the systemic deposition of hemosiderin in reticuloendothelial macrophages without tissue damage; Hemochromatosis is severe systemic iron overload with parenchymal accumulation leading to tissue fibrosis and organ failure (Bronze diabetes).'
      }
    ],
    subsections: [
      {
        title: '1. Major Endogenous Pigments',
        content: [
          '• 1. Lipofuscin ("Wear-and-Tear" / Aging Pigment): Golden-brown, insoluble, granular, perinuclear pigment composed of polymers of peroxidized lipids and proteins resulting from autophagocytosis of aging cell organelles. Seen in post-mitotic aging tissues (myocardium, hepatocytes, neurons). In severe cachexia/malnutrition, it imparts a dark brown color to the atrophic heart ("Brown Atrophy of the Heart").',
          '• 2. Melanin: Brown-black, non-iron pigment synthesized by melanocytes in the basal layer of epidermis from tyrosine via tyrosinase enzyme. Transferred to adjacent keratinocytes and dermal melanophages. Increased in Addison disease (high ACTH), melasma, pigmented nevi, and malignant melanoma. Stained black specifically with Fontana-Masson silver stain.',
          '• 3. Hemosiderin: Golden-yellow to brown, crystalline, iron-storage pigment formed by aggregates of ferritin micelles derived from hemoglobin breakdown. Local accumulation occurs in bruises (ecchymoses) and "heart failure cells" (alveolar macrophages in chronic pulmonary venous congestion). Systemic accumulation occurs in repeated blood transfusions (Thalassemia major) and Hemochromatosis. Stained bright blue with Perls\' Prussian Blue reaction.',
          '• 4. Bilirubin: The non-iron porphyrin derivative of heme breakdown. Accumulates in tissues when serum bilirubin >2.0 mg/dL, producing Jaundice (Icterus) in skin, sclera, and liver. Stained green with Fouchet special stain.',
          '• 5. Hemozoin (Malarial Pigment): Dark brown-black, iron-containing, birefringent pigment formed by Plasmodium parasites digesting hemoglobin within red blood cells, taken up by reticuloendothelial macrophages in liver, spleen, and bone marrow.'
        ]
      },
      {
        title: '2. Major Exogenous Pigments',
        content: [
          '• Carbon / Coal Dust (Anthracosis): Ubiquitous urban atmospheric pollutant; inhaled particles are engulfed by alveolar macrophages and transported to hilar lymph nodes, producing black discoloration of lung parenchyma (Coal Worker\'s Pneumoconiosis).',
          '• Tattoo Pigments: Insoluble mineral and vegetable dyes (carbon, cinnabar, cobalt) inoculated into the dermis, engulfed by dermal macrophages where they remain permanently inert.',
          '• Argyria: Deposition of silver salts in chronic silver exposure, producing a slate-gray / bluish discoloration of skin.',
          '• Lead Line (Burtonian Line): Bluish-black line along the gingival margin caused by precipitation of lead sulfide by hydrogen sulfide-producing oral bacteria in chronic lead poisoning.'
        ]
      }
    ],
    specialStains: [
      {
        stain: 'Perls\' Prussian Blue (Potassium Ferrocyanide + HCl)',
        target: 'Ferric iron (Fe3+) in Hemosiderin',
        appearance: 'Bright Prussian Blue granules on pink background',
        clinicalUse: 'Differentiates Hemosiderin from other brown pigments (lipofuscin, bile, melanin); diagnoses Hemochromatosis and pulmonary congestion.'
      },
      {
        stain: 'Fontana-Masson Silver Stain',
        target: 'Melanin (argentaffin property)',
        appearance: 'Jet black pigment granules',
        clinicalUse: 'Identifies amelanotic malignant melanoma.'
      },
      {
        stain: 'Fouchet Stain / Hall Stain',
        target: 'Bilirubin (oxidized to biliverdin)',
        appearance: 'Emerald green',
        clinicalUse: 'Demonstrates canalicular and hepatocellular bile plugs in cholestatic jaundice.'
      }
    ],
    clinicalCorrelation: [
      'Heart Failure Cells: In chronic left ventricular failure, pulmonary venous hypertension causes erythrocyte extravasation into alveoli; alveolar macrophages engulf degraded RBCs, filling with Hemosiderin (Perls\' blue positive), providing diagnostic proof of pulmonary congestion.',
      'Addison Disease: Adrenocortical insufficiency causes loss of cortisol feedback, leading to compensatory elevation of POMC / ACTH, which shares MSH-like activity, causing diffuse bronze hyperpigmentation of skin and buccal mucosa.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Syphilis',
      miasmaticAnalysis: 'Pigmentary dyscrasias indicate deep miasmatic disturbances: Melanin hyperpigmentation/chloasma (Sycotic), Vitiligo/leukoderma (Syphilitic destruction of melanocytes), Hemosiderosis/jaundice (Syphilitic blood decomposition).',
      clinicalApplication: 'Remedies are selected based on the specific pigmentary manifestation and constitutional background.',
      remedies: [
        {
          name: 'Sepia Officinalis',
          indication: 'Yellowish-brown saddle across the nose and cheeks (chloasma/melasma), uterine prolapse, indifferent to loved ones.',
          rationale: 'Regulates melanogenesis and neuroendocrine hormonal balance in women.'
        },
        {
          name: 'Plumbum Metallicum',
          indication: 'Lead colic, obstinate constipation, blue line on gums, sclerotic vascular degeneration.',
          rationale: 'Direct toxicological homoeopathic correlation with chronic heavy metal pigmentation.'
        },
        {
          name: 'Crotalus Horridus',
          indication: 'Profound septic jaundice, dark decomposed blood, hemolyzed hemosiderin accumulation.',
          rationale: 'Phospholipase venom causes rapid intravascular hemolysis and bile pigmentation.'
        }
      ]
    },
    examPearls: [
      'Perls\' Prussian Blue stains Hemosiderin bright blue (it does NOT stain lipofuscin, melanin, or bilirubin).',
      'Lipofuscin is known as the "wear-and-tear" or "aging" pigment and causes Brown Atrophy of the heart in cachexia.'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART V — IRREVERSIBLE CELL INJURY & TYPES OF NECROSIS
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-5-necrosis-types',
    partNumber: 'PART V',
    partTitle: 'Irreversible Cell Injury, Autolysis & Morphological Types of Necrosis',
    nchCompetency: 'HomUG-PM I.4 (Differentiate types of necrosis with morphology and examples)',
    estimatedReadTime: '15 min',
    quickAnswer: 'Irreversible cell injury marks the point of no return where a cell cannot recover and inevitably undergoes cell death. Necrosis is the spectrum of morphological changes that follow cell death in living tissue, resulting from enzymatic degradation and denaturation of cellular proteins, always accompanied by an inflammatory response.',
    introduction: 'When cellular stress is severe, persistent, or lethal, the cell crosses the point of no return. Irreversible injury is defined by two cardinal criteria: 1. Inability to restore mitochondrial function (unresolved MPTP opening); and 2. Severe loss of plasma membrane barrier integrity. Necrosis represents the morphological consequence of this catastrophic demise in living tissue.',
    keyDefinitions: [
      {
        term: 'Necrosis',
        definition: 'A pattern of pathological cell death in living tissue resulting from severe external injury, characterized by plasma membrane lysis, cellular enzymatic digestion, and acute inflammation.'
      },
      {
        term: 'Autolysis vs Heterolysis',
        definition: 'Autolysis is digestion of dead cells by their own intracellular lysosomal hydrolases; Heterolysis is digestion of dead cells by lysosomal enzymes released from immigrant inflammatory leukocytes (neutrophils, macrophages).'
      },
      {
        term: 'Ghost Cells / Tombstone Cells',
        definition: 'Preserved coagulated microscopic outlines of dead cells that have lost their nuclei and cytoplasmic details, characteristic of Coagulative Necrosis.'
      }
    ],
    subsections: [
      {
        title: '1. Nuclear Changes in Necrotic Cell Death',
        content: [
          'The nucleus undergoes three classic progressive morphological changes in necrotic cell death:'
        ],
        bulletPoints: [
          '1. Pyknosis: Characterized by nuclear shrinkage, increased basophilia (dark purple-black condensation), and dense chromatin compaction.',
          '2. Karyorrhexis: The pyknotic nucleus undergoes fragmentation, breaking into multiple small, dense, irregular chromatin fragments dispersed in the cytoplasm.',
          '3. Karyolysis: Progressive dissolution and fading of the chromatin caused by the enzymatic action of lysosomal deoxyribonucleases (DNase), resulting in total disappearance of the nucleus within 24 to 48 hours.'
        ]
      },
      {
        title: '2. Morphological Types of Necrosis (Comprehensive Breakdown)',
        content: [
          '• 1. Coagulative Necrosis: The most common type. Caused by sudden ischemic infarction of all solid organs (Heart, Kidney, Spleen) EXCEPT the brain. Acidosis denatures structural proteins and catalytic lysosomal enzymes, preventing immediate autolysis. Grossly appears as a pale, firm, wedge-shaped infarct. Microscopically shows "tombstone" ghost cell outlines with loss of nuclei.',
          '• 2. Liquefactive (Colliquative) Necrosis: Enzymatic digestion and hydrolytic lysis completely predominate over protein denaturation, rapidly transforming dead tissue into a viscous liquid mass. Seen in: 1. Ischemic stroke / cerebral infarction of the Brain (due to high lipid/water content and abundant lysosomal enzymes); 2. Focal bacterial and fungal abscesses where neutrophils release massive hydrolytic enzymes.',
          '• 3. Caseous Necrosis: Pathognomonic of Mycobacterium tuberculosis infection and certain deep fungal infections (Histoplasmosis). Represents a distinct combination of coagulative and liquefactive necrosis driven by delayed-type (Type IV) cell-mediated hypersensitivity. Grossly appears as friable, yellowish-white, cheesy material. Microscopically shows amorphous, granular, eosinophilic debris surrounded by a granulomatous collar of epithelioid histiocytes, Langhans multinucleated giant cells, and CD4+ T lymphocytes.',
          '• 4. Fat Necrosis: 1. Enzymatic Fat Necrosis: Classically seen in Acute Pancreatitis, where activated pancreatic lipases hydrolyze triglycerides into free fatty acids, which bind ionized calcium (Ca2+) to produce chalky-white, gritty deposits (Saponification); 2. Traumatic Fat Necrosis: Occurs following physical trauma to adipose-rich tissue (female breast, subcutaneous fat), showing lipid-laden foamy macrophages and foreign-body giant cells.',
          '• 5. Fibrinoid Necrosis: A specialized form of vascular damage where antigen-antibody immune complexes and extravasated plasma fibrin deposit circumferentially within the media of blood vessel walls. Grossly produces vascular purpura; microscopically reveals bright pink, homogeneous, smudgy eosinophilic deposits. Classic examples: Polyarteritis Nodosa, Malignant Hypertension, Aschoff nodules of Rheumatic Heart Disease.',
          '• 6. Gangrenous Necrosis: A clinical term applied to extensive tissue necrosis modified by ischemia and superadded putrefaction (Dry, Wet, and Gas gangrene).'
        ]
      }
    ],
    morphology: {
      gross: [
        'Coagulative Infarct: Pale, dry, firm, wedge-shaped area with base at organ capsule and apex at occluded artery.',
        'Caseous Necrosis: Yellowish-white, soft, friable, non-glistening "cottage cheese" consistency.',
        'Fat Necrosis: Opaque, chalky-white, gritty, firm flecks on omental and mesenteric fat.'
      ],
      microscopy: [
        'Coagulative: Acidophilic (bright pink) cytoplasm, preserved cell borders, absent nuclei (ghost cell appearance).',
        'Liquefactive: Cavity filled with cellular debris, foamy macrophages (Gitter cells in brain), and lysed neutrophils (pus).',
        'Caseous: Central structureless eosinophilic debris bordered by epithelioid cells and Langhans horseshoe giant cells.'
      ],
      keySpotterPoint: 'Myocardial infarct slide showing preserved myofiber outlines (ghost cells) with hypereosinophilia and absent nuclei.'
    },
    clinicalCorrelation: [
      'Cerebral Stroke vs Myocardial Infarct: Brain infarction forms a fluid-filled cystic cavity (liquefaction) that cannot be repaired by fibrous scar (repaired by astrocytic gliosis), whereas myocardial infarction forms a dense collagenous fibrous scar.',
      'Acute Pancreatitis Hypocalcemia: Massive saponification in fat necrosis consumes large amounts of circulating calcium, causing clinical hypocalcemic tetany (Chvostek and Trousseau signs).'
    ],
    homoeopathicCorrelation: {
      miasm: 'Syphilis',
      miasmaticAnalysis: 'Necrosis represents the absolute culmination of the Syphilitic miasm: tissue mortification, irreversible destruction, ulceration, and foul sloughing.',
      clinicalApplication: 'Recognizing syphilitic tissue death mandates deep-acting syphilitic remedies alongside urgent emergency surgical/medical management.',
      remedies: [
        {
          name: 'Secale Cornutum',
          indication: 'Dry gangrene of toes/feet, cold shriveled mummified skin, yet patient cannot tolerate heat and demands to be uncovered.',
          rationale: 'Ergot alkaloids cause severe peripheral vasospasm producing ischemic coagulative necrosis and dry gangrene.'
        },
        {
          name: 'Lachesis Mutus',
          indication: 'Wet septic gangrene, purplish-black discoloration, extreme hyperesthesia, cellulitis, blood decomposition.',
          rationale: 'Venom phospholipases and hemolysins cause extensive endothelial lysis and putrefactive necrosis.'
        },
        {
          name: 'Anthracinum',
          indication: 'Malignant carbuncles, black gangrenous sloughs with intense burning and rapid collapse.',
          rationale: 'Classical nosode for necrotizing gangrenous cutaneous infections.'
        }
      ]
    },
    examPearls: [
      'The brain is the ONLY solid organ in the body where ischemic infarction produces Liquefactive necrosis (not coagulative).',
      'Caseous necrosis is pathognomonic of Tuberculosis; the cheesy appearance is due to mycobacterial lipid-rich cell walls.',
      'Saponification in fat necrosis results from free fatty acids binding with ionized Calcium.'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART VI — APOPTOSIS (Programmed Cell Death, Intrinsic vs Extrinsic Pathways)
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-6-apoptosis',
    partNumber: 'PART VI',
    partTitle: 'Apoptosis: Programmed Cell Death & Molecular Caspase Pathways',
    nchCompetency: 'HomUG-PM I.4 (Explain mechanisms of apoptosis and compare with necrosis)',
    estimatedReadTime: '13 min',
    quickAnswer: 'Apoptosis is an energy-dependent, gene-directed pathway of programmed single-cell death mediated by caspases, where the cell activates internal enzymes to degrade its own nuclear DNA and cytoplasmic proteins, packaging them into intact apoptotic bodies that are quietly phagocytosed without eliciting inflammation.',
    introduction: 'Unlike necrosis, which is always an accidental, pathological, and inflammatory event involving sheets of cells, Apoptosis is a tightly orchestrated, regulated biological process that serves both physiological homeostatic functions and pathological elimination of damaged cells.',
    keyDefinitions: [
      {
        term: 'Apoptosis',
        definition: 'A pathway of cell death in which cells activate caspases that degrade their own nuclear DNA and proteins, followed by rapid phagocytosis of apoptotic bodies without an inflammatory reaction.'
      },
      {
        term: 'Caspases',
        definition: 'Cysteine-dependent Aspartate-directed proteases that exist as inactive pro-enzymes and function as the primary enzymatic effectors of apoptosis.'
      },
      {
        term: 'Apoptosome',
        definition: 'A wheel-like heptameric protein complex composed of Cytochrome c, APAF-1, and dATP that recruits and activates initiator Caspase-9.'
      },
      {
        term: 'Councilman Bodies',
        definition: 'Intensely eosinophilic, shrunken, round apoptotic hepatocytes extruded into the sinusoids in acute viral hepatitis and yellow fever.'
      }
    ],
    subsections: [
      {
        title: '1. Physiological vs Pathological Settings of Apoptosis',
        content: [
          '• Physiological Apoptosis (Normal Homeostatic Turnover):',
          '1. Embryogenesis: Programmed deletion of interdigital webbing between fingers and toes; involution of thyroglossal duct.',
          '2. Hormone-Dependent Tissue Involution: Endometrial shedding during normal menstruation; regression of lactating breast after weaning; prostatic atrophy following castration.',
          '3. Cell Turnover in Proliferating Tissues: Deletion of senescent enterocytes at the tips of intestinal villi.',
          '4. Elimination of Potentially Self-Reactive Lymphocytes: Clonal deletion in thymus to prevent autoimmune diseases.',
          '• Pathological Apoptosis (Elimination of Injured/Dangerous Cells):',
          '1. DNA Damage: Severe radiation, chemotherapeutic cytotoxic drugs, or oxidative stress triggers p53-mediated apoptosis.',
          '2. Accumulation of Misfolded Proteins: Severe Endoplasmic Reticulum (ER) stress leads to apoptotic death (seen in neurodegenerative diseases like Alzheimer and Parkinson).',
          '3. Viral Infections: Cytotoxic T Lymphocytes (CD8+) kill virus-infected hepatocytes (Councilman bodies in viral hepatitis).',
          '4. Pathological Organ Atrophy after Duct Obstruction: Pancreas, parotid gland, or kidney atrophy following duct ligation.'
        ]
      },
      {
        title: '2. Molecular Mechanisms: Intrinsic vs Extrinsic Pathways',
        content: [
          'Apoptosis proceeds through two converging molecular pathways:'
        ],
        table: {
          title: 'Intrinsic (Mitochondrial) vs Extrinsic (Death Receptor) Pathway of Apoptosis',
          headers: ['Parameter', 'Intrinsic (Mitochondrial) Pathway', 'Extrinsic (Death Receptor) Pathway'],
          rows: [
            ['Primary Trigger', 'Internal cell stress: DNA damage, withdrawal of survival growth factors, ER stress', 'External death ligands binding plasma membrane death receptors'],
            ['Key Sensors / Receptors', 'BH3-only proteins (BIM, BID, BAD, PUMA, NOXA)', 'Fas (CD95) receptor, TNF Receptor 1 (TNFR1)'],
            ['Mitochondrial Role', 'Crucial; Bax and Bak oligomerize to permeabilize mitochondrial outer membrane', 'Mitochondria are bypassed in many cells (or linked via Bid cleavage)'],
            ['Key Molecule Released', 'Cytochrome c released into cytosol; binds APAF-1 forming Apoptosome', 'FADD (Fas-Associated Death Domain) adaptor recruited directly to receptor'],
            ['Initiator Caspase', 'Initiator Caspase-9', 'Initiator Caspase-8 and Caspase-10'],
            ['Common Convergence', 'Both pathways cleave and activate Executioner Caspases (Caspase-3, Caspase-6, Caspase-7)', 'Same executioner caspases execute cell dismantling'],
            ['Anti-apoptotic Regulators', 'Bcl-2, Bcl-xL, Mcl-1 (maintain mitochondrial outer membrane integrity)', 'FLIP protein (blocks Caspase-8 activation)']
          ]
        }
      },
      {
        title: '3. Execution Phase & Phagocytosis (Why No Inflammation?)',
        content: [
          '1. Executioner Caspases (Caspase-3, 6, 7) cleave cytoskeletal alpha-fodrin, actin, and nuclear lamin.',
          '2. Caspase-3 activates Caspase-Activated DNase (CAD), which cuts internucleosomal DNA into uniform fragments of 180–200 base pairs (producing characteristic DNA Laddering on gel electrophoresis, unlike the random smear of necrosis).',
          '3. The shrunken cell buds into intact, membrane-enclosed Apoptotic Bodies.',
          '4. Phosphatidylserine, normally located on the inner leaflet of the plasma membrane, flips to the outer leaflet, serving as an "eat-me" signal recognized by macrophage receptors (Thrombospondin, Scavenger receptors).',
          '5. Macrophages phagocytose the apoptotic bodies immediately without releasing inflammatory mediators, ensuring zero tissue inflammation.'
        ]
      }
    ],
    morphology: {
      gross: [
        'Organ size may show subtle physiological involution, but there is no macroscopic discoloration, suppuration, or ulceration.'
      ],
      microscopy: [
        'Single, isolated, scattered shrunken round/oval cells with intensely eosinophilic cytoplasm.',
        'Chromatin is aggregated peripherally into dense crescentic masses beneath the nuclear membrane.',
        'Extrusion of small, round, membrane-bound apoptotic bodies with or without nuclear fragments.',
        'Complete absence of adjacent neutrophilic inflammatory infiltration.'
      ],
      keySpotterPoint: 'Liver biopsy in viral hepatitis showing isolated, shrunken, intensely pink Councilman bodies surrounded by a clear halo and normal hepatocytes.'
    },
    clinicalCorrelation: [
      'Cancer Pathogenesis: Overexpression of anti-apoptotic Bcl-2 (e.g., t(14;18) translocation in Follicular Lymphoma) prevents apoptosis of damaged lymphocytes, leading to uncontrolled neoplastic survival.',
      'Neurodegenerative Disorders: Excessive apoptotic death of neurons driven by misfolded protein accumulation underlies Alzheimer disease, Huntington chorea, and Amyotrophic Lateral Sclerosis.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Psora',
      miasmaticAnalysis: 'Physiological apoptosis represents the harmonious, orderly regulatory power of the Vital Dynamis (Psora). Dysregulated apoptosis manifests as Sycosis when defective (uncontrolled growth, tumors, polyps) and as Syphilis when excessively destructive (neurodegeneration, premature tissue death).',
      clinicalApplication: 'Anti-miasmatic prescribing aims to restore biological cell turnover equilibrium.',
      remedies: [
        {
          name: 'Conium Maculatum',
          indication: 'Glandular indurations, progressive ascending paralysis, breast tumors following contusion.',
          rationale: 'Affinity for defective cellular turnover, glandular induration, and senile involution.'
        },
        {
          name: 'Thuja Occidentalis',
          indication: 'Inhibition of physiological cell death leading to polyps, warts, condylomata, and sycotic overgrowths.',
          rationale: 'Primary anti-sycotic remedy targeting defective apoptotic elimination.'
        }
      ]
    },
    examPearls: [
      'Apoptosis is an active, energy-dependent (ATP-requiring) process; Necrosis is caused by ATP depletion.',
      'DNA laddering in 180–200 base pair intervals is the molecular hallmark of Apoptosis; Necrosis produces a non-specific smear.',
      'Phosphatidylserine flip to the outer membrane leaflet triggers silent phagocytosis without inflammation.'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART VII — POST-CELL-DEATH CHANGES & PATHOLOGICAL CALCIFICATION
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-7-calcification',
    partNumber: 'PART VII',
    partTitle: 'Pathological Calcification: Dystrophic vs Metastatic Calcification',
    nchCompetency: 'HomUG-PM I.5 (Differentiate dystrophic and metastatic calcification)',
    estimatedReadTime: '11 min',
    quickAnswer: 'Pathological calcification is the abnormal deposition of calcium salts along with iron, magnesium, and other mineral salts in tissues, classified into Dystrophic calcification (in dead/dying tissues with normal serum calcium) and Metastatic calcification (in normal living tissues secondary to Hypercalcemia).',
    introduction: 'Calcium deposition in tissues other than bone and teeth is always abnormal. Understanding the distinct pathogenesis, serum chemistry, and clinical targets of Dystrophic vs Metastatic calcification is an essential exam topic and clinical requirement.',
    keyDefinitions: [
      {
        term: 'Pathological Calcification',
        definition: 'The abnormal non-skeletal deposition of calcium phosphate salts, carbonates, and mineral complexes in soft tissues.'
      },
      {
        term: 'Dystrophic Calcification',
        definition: 'The deposition of calcium salts locally in necrotic, dying, or degenerating tissues in patients with completely normal serum calcium levels and normal calcium homeostasis.'
      },
      {
        term: 'Metastatic Calcification',
        definition: 'The systemic deposition of calcium salts in normal, previously healthy, viable tissues throughout the body, caused by persistent systemic Hypercalcemia.'
      },
      {
        term: 'Psammoma Bodies',
        definition: 'Concentric, laminated, microscopic calcific spherules seen in papillary carcinomas (thyroid, ovary) and meningiomas resulting from progressive dystrophic calcification of necrotic single cells.'
      }
    ],
    subsections: [
      {
        title: '1. Dystrophic Calcification: Pathogenesis & Classic Sites',
        content: [
          '• Pathogenesis: In dying and dead cells, membrane integrity is lost. Membrane-bound acidic phospholipids bind calcium ions. Membrane-associated Phosphatases (alkaline phosphatase) generate inorganic phosphate. Calcium and phosphate combine to form calcium phosphate crystals (hydroxyapatite), which propagate crystal growth in the necrotic core.',
          '• Classic Clinical Sites:',
          '1. Atherosclerotic Plaques: Advanced atheromas in aorta and coronary arteries undergo extensive calcification, making vessels rigid and brittle.',
          '2. Calcific Aortic Stenosis: Age-related dystrophic calcification of aortic valve cusps leading to severe left ventricular outflow obstruction.',
          '3. Tuberculous Granulomas: Ghon focus in primary pulmonary tuberculosis and scrofulous lymph nodes heal by dense calcification.',
          '4. Enzymatic Fat Necrosis: Calcium soaps formed in acute pancreatitis (Saponification).',
          '5. Lithopedion ("Stone Baby"): Calcified dead retained fetus in extrauterine abdominal pregnancy.'
        ]
      },
      {
        title: '2. Metastatic Calcification: Etiology & Predilection for Acid-Secreting Organs',
        content: [
          '• Four Major Causes of Hypercalcemia:',
          '1. Primary Hyperparathyroidism: Parathyroid adenoma or hyperplasia secreting excess Parathyroid Hormone (PTH).',
          '2. Malignancy: Osteolytic bone metastases (breast cancer, multiple myeloma) or tumor secretion of PTH-related protein (PTHrP) in squamous cell carcinoma.',
          '3. Vitamin D-Related Disorders: Vitamin D intoxication, Sarcoidosis (macrophages convert 25-OH-D to active 1,25-(OH)2-D3), and Idiopathic hypercalcemia of infancy.',
          '4. Renal Failure: Secondary hyperparathyroidism due to phosphate retention and hypocalcemia.',
          '• Predilection for Acid-Secreting Tissues: Calcium precipitates in tissues where acid is actively excreted, creating an alkaline internal environment that lowers calcium solubility:',
          '1. Gastric Mucosa (excretes HCl into stomach lumen -> internal alkaline milieu).',
          '2. Lungs / Alveolar Septa (excretes CO2 -> internal relative alkalinity).',
          '3. Kidneys / Renal Tubules (excretes titratable acid -> Nephrocalcinosis and renal stones).',
          '4. Systemic Arteries and Pulmonary Veins.'
        ]
      }
    ],
    morphology: {
      gross: [
        'Appears as gritty, hard, white or yellowish granular deposits or rock-like calcified plaques.',
        'Calcified heart valves are rigid, non-compliant, and stenotic.'
      ],
      microscopy: [
        'Routine H&E: Intensely basophilic (deep purple-blue), amorphous, granular, or crystalline deposits located intracellularly or extracellularly.',
        'Von Kossa Special Stain: Stains calcium phosphate deposits dense black.',
        'Alizarin Red S Stain: Stains calcium orange-red.'
      ],
      keySpotterPoint: 'Section of lung showing deeply basophilic, granular calcium deposits outlining the alveolar septal basement membranes on H&E.'
    },
    specialStains: [
      {
        stain: 'Von Kossa Stain (Silver Nitrate reduction)',
        target: 'Calcium phosphate and carbonates',
        appearance: 'Jet black deposits against a red counterstain',
        clinicalUse: 'Definitive confirmation of microscopic calcification in renal biopsies and atheromas.'
      },
      {
        stain: 'Alizarin Red S Stain',
        target: 'Calcium cations',
        appearance: 'Bright orange-red chelation product',
        clinicalUse: 'Histological identification of calcium salts.'
      }
    ],
    clinicalCorrelation: [
      'Calcific Aortic Stenosis: The most common indication for surgical valve replacement in elderly patients; severe dystrophic calcification limits systolic leaflet opening.',
      'Nephrocalcinosis: Metastatic calcification of renal tubular basement membranes leads to polyuria, renal tubular acidosis, and progressive chronic kidney disease.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Syphilis',
      miasmaticAnalysis: 'Abnormal induration, ossification, and petrifaction of soft tissues reflect the Sycotic-Syphilitic axis (tissue sclerosis, hardening, and calcific degeneration).',
      clinicalApplication: 'Homoeopathic tissue salts and deep-acting constitutional remedies help regulate tissue calcium metabolism and soften hardened plaques.',
      remedies: [
        {
          name: 'Calcarea Fluorica',
          indication: 'Hard, stony indurations, osteophytes, arteriosclerosis with calcified brittle vessels, cataract.',
          rationale: 'Primary tissue salt regulating elastic fibers and bone-calcium distribution.'
        },
        {
          name: 'Baryta Carbonica',
          indication: 'Arteriosclerosis with vascular calcification, hypertension, senile dementia, apoplexy tendency in elderly.',
          rationale: 'Specific affinity for vascular medial sclerosis and senile calcific degeneration.'
        },
        {
          name: 'Plumbum Iodatum',
          indication: 'Arteriosclerosis, nephrosclerosis with calcification, indurated glandular enlargements.',
          rationale: 'Syphilitic deep-acting sclerotic remedy.'
        }
      ]
    },
    examPearls: [
      'Dystrophic calcification occurs with NORMAL serum calcium in DEAD tissue.',
      'Metastatic calcification occurs with ELEVATED serum calcium (Hypercalcemia) in VIABLE tissue.',
      'Metastatic calcification preferentially targets Lungs, Stomach, and Kidneys because acid excretion leaves these tissues internally alkaline.'
    ]
  },

  // -------------------------------------------------------------------------------------------------
  // PART VIII — CELLULAR ADAPTATION (Hypertrophy, Hyperplasia, Atrophy, Metaplasia, Dysplasia)
  // -------------------------------------------------------------------------------------------------
  {
    id: 'part-8-cellular-adaptation',
    partNumber: 'PART VIII',
    partTitle: 'Cellular Adaptations of Growth & Differentiation',
    nchCompetency: 'HomUG-PM I.3 (Classify and describe cellular adaptations with physiological and pathological examples)',
    estimatedReadTime: '15 min',
    quickAnswer: 'Cellular adaptations are reversible structural and functional alterations in cell size (Hypertrophy), cell number (Hyperplasia), cell volume/mass (Atrophy), or differentiated phenotype (Metaplasia) in response to environmental stresses, achieving a new steady-state equilibrium.',
    introduction: 'When cells face persistent, sub-lethal physiological demands or pathological stresses, they modify their growth pattern and differentiation to survive without dying. If the stress is removed, the adapted tissue reverts to its baseline state. However, persistent pathological adaptation may progress to dysplasia or cellular injury.',
    keyDefinitions: [
      {
        term: 'Hypertrophy',
        definition: 'An increase in the size of cells resulting in an overall increase in organ size, without an increase in cell number, occurring in permanent non-dividing cells.'
      },
      {
        term: 'Hyperplasia',
        definition: 'An increase in the number of cells in an organ or tissue resulting in increased mass, occurring in labile and stable cells capable of mitotic division.'
      },
      {
        term: 'Atrophy',
        definition: 'A reduction in the size and mass of an organ or tissue resulting from a decrease in cell size and/or cell number, driven by ubiquitin-proteasome degradation and autophagy.'
      },
      {
        term: 'Metaplasia',
        definition: 'A reversible change in which one mature adult differentiated cell type (epithelial or mesenchymal) is replaced by another adult cell type better able to endure stress.'
      },
      {
        term: 'Dysplasia',
        definition: 'Disordered cellular growth and maturation characterized by loss of architectural orientation, cellular pleomorphism, nuclear hyperchromasia, and increased mitoses with an intact basement membrane.'
      }
    ],
    subsections: [
      {
        title: '1. Hypertrophy: Mechanisms & Examples',
        content: [
          '• Mechanism: Mechanical stretch sensors (integrins) and biochemical agonists (Endothelin-1, Angiotensin II, IGF-1) activate transcription factors (GATA4, NFAT, MEF2), upregulating synthesis of contractile proteins (myosin, actin) and organelle biogenesis.',
          '• Physiological Hypertrophy: Skeletal muscle enlargement in bodybuilders (mechanical workload); Gravid uterus during pregnancy (estrogen stimulates both massive smooth muscle hypertrophy and hyperplasia).',
          '• Pathological Hypertrophy: Left Ventricular Hypertrophy (LVH) in systemic hypertension and aortic stenosis; Detrusor muscle hypertrophy in urinary bladder outflow obstruction.'
        ]
      },
      {
        title: '2. Hyperplasia: Mechanisms & Examples',
        content: [
          '• Mechanism: Growth factor-driven proliferation of mature cells and increased output from tissue stem cells (requires dividing labile/stable cells).',
          '• Physiological Hormonal: Proliferation of female breast glandular epithelium at puberty and during lactation; proliferative endometrium in menstrual cycle.',
          '• Physiological Compensatory: Liver regeneration following partial hepatectomy (driven by HGF, IL-6, TNF); Bone marrow erythroid hyperplasia in chronic high-altitude hypoxia.',
          '• Pathological Hyperplasia: Endometrial hyperplasia driven by unopposed estrogen (abnormal uterine bleeding); Benign Prostatic Hyperplasia (BPH) driven by dihydrotestosterone; Cutaneous warts driven by Human Papillomavirus (HPV).'
        ]
      },
      {
        title: '3. Atrophy: Mechanisms & Etiology',
        content: [
          '• Cellular Mechanism: 1. Reduced protein synthesis; 2. Accelerated protein degradation via the Ubiquitin-Proteasome Pathway; 3. Increased Autophagy (intracellular organelle degradation inside autophagolysosomes, leaving residual Lipofuscin pigment granules).',
          '• Physiological Atrophy: Involution of embryonic notochord and thyroglossal duct; Postmenopausal atrophy of uterus and ovaries; Involution of thymus with advancing age.',
          '• Pathological Atrophy Categories:',
          '1. Disuse Atrophy: Immobilized fractured limb in plaster cast.',
          '2. Denervation Atrophy: Skeletal muscle wasting after motor neuron loss (Poliomyelitis, motor neuron disease).',
          '3. Ischemic / Vascular Atrophy: Atherosclerotic narrowing of renal artery causing senile renal atrophy.',
          '4. Malnutrition / Starvation Atrophy: Severe protein-calorie deficiency (Cachexia, Marasmus).',
          '5. Endocrine Atrophy: Loss of pituitary ACTH/TSH causing adrenal and thyroid cortical atrophy.',
          '6. Pressure Atrophy: Aortic aneurysm compressing vertebral bodies or benign tumor compressing surrounding parenchyma.'
        ]
      },
      {
        title: '4. Metaplasia & Dysplasia: Premalignant Horizons',
        content: [
          '• Metaplasia Types:',
          '1. Columnar to Squamous Metaplasia: Respiratory tract of chronic smokers (ciliated columnar replaced by stratified squamous); Endocervix at transformation zone.',
          '2. Squamous to Columnar Metaplasia: Barrett Esophagus in chronic GERD (esophageal squamous replaced by intestinal-type goblet-cell columnar epithelium).',
          '3. Mesenchymal / Connective Tissue Metaplasia: Myositis ossificans (bone formation within skeletal muscle after intramuscular hematoma).',
          '• Dysplasia (Atypical Hyperplasia): Disordered maturation characterized by cellular pleomorphism, nuclear hyperchromasia, increased N:C ratio, loss of architectural polarity, and mitoses in upper epithelial layers.',
          '• Spectrum: Normal Epithelium -> Metaplasia -> Mild Dysplasia (CIN I) -> Moderate Dysplasia (CIN II) -> Severe Dysplasia / Carcinoma In Situ (CIN III) -> Invasive Carcinoma (breach of basement membrane).'
        ]
      }
    ],
    morphology: {
      gross: [
        'Left Ventricular Hypertrophy: Thickened LV wall (>15 mm), heavy heart (>400–600 g vs normal 300 g).',
        'Senile Brain Atrophy: Narrowed gyri, widened sulci, enlarged ventricles (Hydrocephalus ex vacuo).',
        'Barrett Esophagus: Velvety salmon-pink mucosa extending upward above gastroesophageal junction.'
      ],
      microscopy: [
        'Hypertrophy: Enlarged cells with abundant cytoplasm and prominent hyperchromatic rectangular "boxcar" nuclei.',
        'Atrophy: Small cells with reduced organelles and perinuclear golden-brown Lipofuscin granules.',
        'Metaplasia: Mature, orderly epithelium of a different lineage overlying intact basement membrane.',
        'Dysplasia: Pleomorphic cells, high N:C ratio, loss of polarity, abnormal mitoses; basement membrane INTACT.'
      ],
      keySpotterPoint: 'Cervical smear / biopsy showing dysplastic squamous cells with marked nuclear hyperchromasia and high N:C ratio confined above intact basement membrane.'
    },
    clinicalCorrelation: [
      'Benign Prostatic Hyperplasia (BPH): DHT-driven stromal and epithelial hyperplasia in the periurethral transition zone compresses the urethra, causing hesitancy, weak stream, and nocturia.',
      'Cervical Cancer Screening (Pap Smear): Identifies dysplastic cells (CIN) early, allowing curative local excision before progression to invasive cervical cancer.'
    ],
    homoeopathicCorrelation: {
      miasm: 'Sycotic',
      miasmaticAnalysis: 'Hypertrophy, hyperplasia, warts, condylomata, and benign polyps represent pure Sycosis (overproduction, proliferation, excess growth). Atrophy represents the Psoric-Syphilitic spectrum. Dysplasia marks the critical borderland where Sycotic overgrowth transitions into Syphilitic malignant destruction.',
      clinicalApplication: 'Prescribing deep-acting anti-sycotic and anti-miasmatic medicines halts proliferative drive and reverses dysplastic progression.',
      remedies: [
        {
          name: 'Thuja Occidentalis',
          indication: 'The king of anti-sycotic remedies: warts, condylomata, polypoid hyperplasias, prostatic enlargement, cystic ovaries.',
          rationale: 'Deep affinity for epithelial hyperplasia and sycotic tissue proliferation.'
        },
        {
          name: 'Sabal Serrulata',
          indication: 'Benign Prostatic Hyperplasia with urinary dribbling, difficulty initiating urination in elderly men.',
          rationale: 'Anti-androgenic effect on DHT-stimulated prostatic stromal hyperplasia.'
        },
        {
          name: 'Baryta Carbonica',
          indication: 'Brain atrophy in elderly, senile dementia, arterial sclerosis, glandular hypertrophy with stony induration.',
          rationale: 'Specific remedy for senile tissue involution and cerebral atrophy.'
        }
      ]
    },
    examPearls: [
      'Hypertrophy = increased cell size in permanent non-dividing cells (Cardiomyocytes); Hyperplasia = increased cell number in dividing cells (BPH).',
      'Metaplasia is a benign, reversible mature cell substitution; Dysplasia is an atypical disordered premalignant growth with an intact basement membrane.',
      'The Ubiquitin-Proteasome pathway and Autophagy are the twin cellular degradation mechanisms responsible for Atrophy.'
    ]
  }
];
