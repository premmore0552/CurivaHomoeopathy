export interface PYQ {
  id: string;
  marks: number;
  university: string;
  years: string[];
  question: string;
  modelAnswerOutline: string[];
}

export interface VivaQuestion {
  id: string;
  question: string;
  category: string;
  answer: string;
  examinerTip?: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  highYieldTag?: string;
}

export interface RemedyDetails {
  identity: {
    commonName: string;
    family: string;
    prover: string;
    source: string;
  };
  keynotes: string[];
  modalities: {
    aggravation: string[];
    amelioration: string[];
  };
}

export interface ConceptSection {
  title: string;
  content: string;
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ConceptBuilder {
  introduction: string;
  sections: ConceptSection[];
}

export interface Flowchart {
  title: string;
  steps: string[];
}

export interface DiagramGuide {
  title: string;
  description: string;
  keyLabels: string[];
  examTip: string;
}

export interface MemoryTrick {
  concept: string;
  mnemonic: string;
  explanation: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RecommendedNextTopic {
  moduleId: string;
  topicId: string;
  title: string;
}

export interface TopicLessonContent {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  highYieldPoints: string[];
  onePageSummary: string[];
  recommendedNextTopic?: RecommendedNextTopic;
  readingTimeMinutes: number;
  learningObjectives: string[];
  remedyDetails?: RemedyDetails;
  conceptBuilder: ConceptBuilder;
  flowcharts: Flowchart[];
  diagramGuides?: DiagramGuide[];
  memoryTricks: MemoryTrick[];
  commonMistakes: string[];
  clinicalCorrelation: string;
  faqs: FAQ[];
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  estimatedHours: number;
  lessonContent: TopicLessonContent;
  pyqs: PYQ[];
  vivaQuestions: VivaQuestion[];
  mcqs: MCQ[];
}

export interface Module {
  id: string;
  title: string;
  code: string;
  badgeColor: string;
  icon?: string;
  topics: Topic[];
}

export const CRASH_COURSE_MODULES: Module[] = [
  {
    id: 'anatomy',
    title: 'Anatomy',
    code: 'ANA',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    topics: [
      {
        id: 'general-anatomy',
        title: 'General Anatomy Foundations',
        subtitle: 'Structural organization of tissues, bones, joints, and muscular systems',
        estimatedHours: 4,
        lessonContent: {
          difficulty: 'Easy',
          readingTimeMinutes: 20,
          learningObjectives: [
            "Classify bones based on structural and regional features.",
            "Understand synovial joint components and mechanics.",
            "Describe skeletal muscle vascular and somatic innervation rules.",
            "Correlate Hilton's law with general joint disorders."
          ],
          highYieldPoints: [
            "Bones are dynamic, living tissues classification based on region, shape, and development is critical.",
            "Synovial joints permit high mobility and are defined by articular cartilage, synovial membrane, and joint cavity.",
            "Skeletal muscles are somatic, voluntary effectors with specific origins, insertions, and vascular pedicles.",
            "Lymphatic drainage follows directional pathways returning tissue fluids back to major thoracic ducts."
          ],
          onePageSummary: [
            "Bones (osteology): Classified into Long, Short, Flat, Irregular, Pneumatic, Sesamoid, and Accessory.",
            "Joints (arthrology): Categorized into Fibrous (synarthroses), Cartilaginous (amphiarthroses), and Synovial (diarthroses).",
            "Anatomical Position: Standing erect, eyes looking forward, upper limbs by sides, palms facing forward, feet together.",
            "Nerve Supply: Hilton's Law states that a nerve supplying a joint also supplies the muscles acting on that joint and the overlying skin."
          ],
          conceptBuilder: {
            introduction: "General Anatomy sets the fundamental nomenclature for navigating regional medicine. It covers structural units that compile the musculoskeletal systems of the human body.",
            sections: [
              {
                title: "Bone Classification & Ossification",
                content: "Bones are divided regionally into axial and appendicular, and structurally into compact and spongy. Developmentally, they undergo either intramembranous or intracartilaginous ossification.",
                bullets: [
                  "Long bones (e.g., Femur, Humerus) act as mechanical levers.",
                  "Pneumatic bones (e.g., Maxilla) contain air spaces to lighten the skull.",
                  "Sesamoid bones (e.g., Patella) develop inside muscle tendons."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Bone Classification Pathway",
              steps: [
                "Axial / Appendicular",
                "Regional (Long / Flat / Short)",
                "Developmental (Membranous / Cartilaginous)",
                "Structural (Spongy / Compact)"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Structure of a Typical Synovial Joint",
              description: "A diagram detailing the articular surface, capsule, and fluid-filled joint cavity.",
              keyLabels: ["Articular Cartilage", "Synovial Membrane", "Joint Capsule", "Synovial Fluid Cavity"],
              examTip: "Always draw a double-layered articular capsule and shade the cartilage in blue."
            }
          ],
          memoryTricks: [
            {
              concept: "Joint Types",
              mnemonic: "SAD Joint Functions",
              explanation: "S = Synarthrosis (Immovable), A = Amphiarthrosis (Slightly movable), D = Diarthrosis (Freely movable)."
            }
          ],
          commonMistakes: [
            "Confusing synchondrosis with symphysis cartilaginous joints.",
            "Forgetting that Hilton's Law applies primarily to synovial joints."
          ],
          clinicalCorrelation: "Understanding joint anatomy is crucial to managing clinical arthritic cases, gouty accumulations, and dynamic range of motion limitations.",
          faqs: [
            {
              question: "What is a sesamoid bone?",
              answer: "It is a bone that develops within a muscle tendon (like the patella in the quadriceps tendon) to protect it from excessive friction and wear."
            }
          ],
          recommendedNextTopic: {
            moduleId: 'anatomy',
            topicId: 'upper-limb',
            title: 'Anatomy of Upper Limb'
          }
        },
        pyqs: [
          {
            id: 'ana-pyq-1',
            marks: 10,
            university: 'MUHS',
            years: ['2021', '2023'],
            question: "Classify joints with suitable examples. Describe structural features of a typical synovial joint.",
            modelAnswerOutline: [
              "Definition of a joint (articulation).",
              "Structural classification: Fibrous, Cartilaginous, Synovial.",
              "Functional classification: Synarthrosis, Amphiarthrosis, Diarthrosis.",
              "Synovial joint components: Articular cartilage, Joint capsule, Synovial membrane, Synovial fluid, Ligaments.",
              "Types of synovial joints (Pivot, Hinge, Ball and Socket, etc.) with clinical examples."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'ana-viva-1',
            question: "What is Hilton's Law in General Anatomy?",
            category: "Osteology & Arthrology",
            answer: "Hilton's Law states that the nerve supplying a joint also supplies the muscles that move the joint, and the skin covering the insertion of those muscles.",
            examinerTip: "Always mention this law when discussing joint innervation in university viva-voce examinations."
          }
        ],
        mcqs: [
          {
            id: 'ana-mcq-1',
            question: "Which of the following bones is classified as a pneumatic bone containing air cells?",
            options: [
              "Femur",
              "Maxilla",
              "Parietal bone",
              "Scapula"
            ],
            correctAnswer: 1,
            explanation: "The Maxilla is a pneumatic bone containing the maxillary air sinus, which serves to lighten the skull and resonate voice.",
            highYieldTag: "High Yield Osteology"
          }
        ]
      },
      {
        id: 'upper-limb',
        title: 'Anatomy of Upper Limb',
        subtitle: 'Shoulder, axilla, arm, cubital fossa, forearm, and hand mechanics',
        estimatedHours: 6,
        lessonContent: {
          difficulty: 'Medium',
          readingTimeMinutes: 30,
          learningObjectives: [
            "Map the roots, trunks, cords, and divisions of the brachial plexus.",
            "Analyze shoulder joint ligaments and muscles of the rotator cuff.",
            "Understand forearm compartment layout and terminal nerve paths.",
            "Explain Erb's and Klumpke's clinical presentation formats."
          ],
          highYieldPoints: [
            "The Axillary Artery is divided into three parts by the Pectoralis Minor muscle.",
            "The Brachial Plexus (C5-T1) is responsible for motor and sensory innervation of the upper limb.",
            "The Cubital Fossa is a triangular space containing the Median Nerve, Brachial Artery, Biceps tendon, and Radial Nerve.",
            "Injury to the Radial Nerve in the radial groove results in Wrist Drop due to paralysis of extensors."
          ],
          onePageSummary: [
            "Brachial Plexus: Roots (C5-C6, C7, C8-T1), Trunks (Upper, Middle, Lower), Divisions (Anterior, Posterior), Cords (Lateral, Medial, Posterior), and Branches.",
            "Shoulder Joint: Multiaxial ball-and-socket synovial joint. Supported by the rotator cuff muscles (SITS: Supraspinatus, Infraspinatus, Teres Minor, Subscapularis).",
            "Median Nerve (Laborer's Nerve): Supplies most flexors of the forearm and thenar muscles.",
            "Ulnar Nerve (Musician's Nerve): Innervates intrinsic hand muscles, passing posterior to the medial epicondyle."
          ],
          conceptBuilder: {
            introduction: "The upper limb is highly specialized for tactile manipulation, motor strength, and dynamic rotation. Understanding its intricate nerve grids and musculoskeletal paths is vital to general clinical practice.",
            sections: [
              {
                title: "The Brachial Plexus Layout",
                content: "Formed by ventral rami of C5 to T1 spinal nerves. Roots combine into three trunks, which bifurcate into divisions, consolidate into lateral, medial, and posterior cords, and branch into terminal nerves.",
                bullets: [
                  "Upper Trunk lesions lead to Erb's Palsy.",
                  "Lower Trunk lesions lead to Klumpke's Paralysis.",
                  "Musculocutaneous, Axillary, Median, Radial, and Ulnar nerves are the main branches."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Brachial Plexus Schematic",
              steps: [
                "Roots (C5-T1)",
                "Trunks (Upper, Middle, Lower)",
                "Divisions (Anterior / Posterior)",
                "Cords (Medial, Lateral, Posterior)",
                "Terminal Branches"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Schematic Brachial Plexus Diagram",
              description: "A complete wireframe of roots, trunks, divisions, cords, and terminal nerves.",
              keyLabels: ["C5-T1 Roots", "Erb's Point (Upper Trunk)", "Cords relative to Axillary Artery", "Ulnar / Radial branches"],
              examTip: "Always draw Erb's point clearly showing the meeting of 6 nerves."
            }
          ],
          memoryTricks: [
            {
              concept: "Brachial Plexus Divisions",
              mnemonic: "Read The Damn Cadaver Book",
              explanation: "R = Roots, T = Trunks, D = Divisions, C = Cords, B = Branches."
            }
          ],
          commonMistakes: [
            "Serratus anterior is innervated by the long thoracic nerve, not lateral cord branches.",
            "Assuming Erb's palsy affects the intrinsic muscles of the hand (which is Klumpke's)."
          ],
          clinicalCorrelation: "Humeral fractures are key high-yield sites: Surgical neck injures Axillary nerve; Shaft injures Radial nerve; Medial Epicondyle injures Ulnar nerve.",
          faqs: [
            {
              question: "What is Erb's Point?",
              answer: "A point on the upper trunk of the brachial plexus where six nerves meet: C5 root, C6 root, suprascapular nerve, nerve to subclavius, anterior division, and posterior division of the upper trunk."
            }
          ],
          recommendedNextTopic: {
            moduleId: 'physiology',
            topicId: 'cardiovascular',
            title: 'Cardiovascular Physiology'
          }
        },
        pyqs: [
          {
            id: 'ana-pyq-2',
            marks: 15,
            university: 'WBUHS',
            years: ['2019', '2022'],
            question: "Describe the Brachial Plexus under headings: formation, relations, branches, and clinical anatomy (Erb's Palsy).",
            modelAnswerOutline: [
              "Introduction: Origin from ventral rami of C5-T1.",
              "Detailed schematic diagram of Roots, Trunks, Divisions, Cords, and Branches.",
              "Relations to the Axillary artery.",
              "Branches from each Cord (Lateral, Medial, Posterior).",
              "Clinical Anatomy: Erb's Palsy (upper trunk lesion, C5-C6, Policeman's tip hand) and Klumpke's Paralysis (lower trunk, C8-T1, claw hand)."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'ana-viva-2',
            question: "Which muscles form the Rotator Cuff (SITS)?",
            category: "Myology & Joints",
            answer: "The muscles are Supraspinatus, Infraspinatus, Teres Minor, and Subscapularis.",
            examinerTip: "Highlight that Teres Major is NOT a part of the rotator cuff. This is a very common trap!"
          }
        ],
        mcqs: [
          {
            id: 'ana-mcq-2',
            question: "Paralysis of the Serratus Anterior muscle causes which clinical condition?",
            options: [
              "Wrist Drop",
              "Ape Thumb deformity",
              "Claw Hand",
              "Winging of Scapula"
            ],
            correctAnswer: 3,
            explanation: "Serratus Anterior is supplied by the Long Thoracic Nerve of Bell (C5-C7). Injury to this nerve leads to winging of the scapula, where the medial border becomes abnormally prominent.",
            highYieldTag: "Clinical Anatomy"
          }
        ]
      }
    ]
  },
  {
    id: 'physiology',
    title: 'Physiology',
    code: 'PHY',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    topics: [
      {
        id: 'cardiovascular',
        title: 'Cardiovascular Physiology',
        subtitle: 'Cardiac cycle, blood pressure regulation, ECG, and hemodynamics',
        estimatedHours: 5,
        lessonContent: {
          difficulty: 'Hard',
          readingTimeMinutes: 25,
          learningObjectives: [
            "Analyze the mechanical and electrical sequences of the cardiac cycle.",
            "Understand the physiological basis of ECG waveforms and segments.",
            "Explain long-term and short-term mechanisms of arterial blood pressure.",
            "Apply Frank-Starling's law to venous return adjustments."
          ],
          highYieldPoints: [
            "The Cardiac Cycle lasts 0.8 seconds (Atrial Systole 0.1s, Diastole 0.7s; Ventricular Systole 0.3s, Diastole 0.5s).",
            "Sinoatrial (SA) node is the natural pacemaker of the heart, with an intrinsic firing rate of 70-80 bpm.",
            "Electrocardiogram (ECG): P wave (atrial depolarization), QRS complex (ventricular depolarization), T wave (ventricular repolarization).",
            "Baroreceptors in the carotid sinus and aortic arch provide rapid reflex regulation of arterial blood pressure."
          ],
          onePageSummary: [
            "Cardiac Output (CO): Stroke Volume (SV) x Heart Rate (HR). Average rest value is ~5 Liters/min.",
            "Frank-Starling Law: Force of contraction is directly proportional to the initial fiber length (end-diastolic volume) within physiological limits.",
            "Heart Sounds: S1 (Lubb) due to closure of AV valves, S2 (Dupp) due to closure of Semilunar valves.",
            "Action Potential: Pacemaker potential lacks a stable resting potential, relying on hyperpolarization-activated funny currents (If) and calcium channels."
          ],
          conceptBuilder: {
            introduction: "Cardiovascular physiology governs the mechanical pumping of blood, establishing arterial perfusion and cellular oxygenation parameters. It utilizes complex neural, hormonal, and intrinsic reflex loops.",
            sections: [
              {
                title: "Phases of the Cardiac Cycle",
                content: "Representing mechanical steps occurring over 0.8s at 75bpm. Divided into ventricular systole (isometric contraction, ejection) and ventricular diastole (isometric relaxation, filling phases).",
                bullets: [
                  "Isometric contraction: All valves are closed; ventricular pressure spikes.",
                  "Protodiastole: Brief phase preceding semilunar valve closure.",
                  "Diastasis: Period of slow ventricular filling."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Electrical Conduction Pathway",
              steps: [
                "SA Node",
                "Internodal Tracts",
                "AV Node",
                "Bundle of His",
                "Purkinje Fibers"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Normal ECG Trace",
              description: "A diagram showing the P, QRS, and T waves on standard grid divisions.",
              keyLabels: ["P wave (Atrial)", "QRS Complex (Ventricular depolarization)", "T wave (Ventricular repolarization)"],
              examTip: "Ensure the PR interval is exactly 0.12 to 0.20 seconds wide."
            }
          ],
          memoryTricks: [
            {
              concept: "Heart Sounds",
              mnemonic: "S1-Systole, S2-Diastole",
              explanation: "S1 occurs at the start of systole (AV closed), S2 occurs at the start of diastole (Semilunars closed)."
            }
          ],
          commonMistakes: [
            "Thinking atrial repolarization is a separate wave (it is masked by the large QRS complex).",
            "Confusing SA node action potentials with ventricular myocardial plateau action potentials."
          ],
          clinicalCorrelation: "Clinical blood pressure measurements rely on hearing Korotkoff sounds, caused by turbulent flow as the arterial cuff pressure matches pulse phases.",
          faqs: [
            {
              question: "What is the physiological PR interval?",
              answer: "It is the duration between the start of the P wave and the start of the QRS complex, normally 0.12–0.20s, representing AV nodal delay."
            }
          ],
          recommendedNextTopic: {
            moduleId: 'biochemistry',
            topicId: 'carbohydrate-metabolism',
            title: 'Carbohydrate Metabolism'
          }
        },
        pyqs: [
          {
            id: 'phy-pyq-1',
            marks: 15,
            university: 'KUHS',
            years: ['2020', '2023'],
            question: "Define Cardiac Cycle. Explain the various mechanical and pressure events occurring in the left ventricle during one cycle.",
            modelAnswerOutline: [
              "Definition of Cardiac Cycle (0.8 seconds sequence).",
              "Phases: Isometric contraction, Rapid ejection, Reduced ejection, Isometric relaxation, Rapid filling, Reduced filling, Atrial systole.",
              "Ventrilo-atrial pressure changes described via Wiggers diagram.",
              "Correlation with heart sounds (S1 and S2).",
              "Correlation with ECG waves."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'phy-viva-1',
            question: "What causes the first heart sound (S1)?",
            category: "Cardiovascular System",
            answer: "S1 is caused by the closure of the Atrioventricular (Mitral and Tricuspid) valves at the beginning of ventricular systole.",
            examinerTip: "Specify that the closure marks the start of Ventricular Systole, and S2 marks the start of Diastole."
          }
        ],
        mcqs: [
          {
            id: 'phy-mcq-1',
            question: "In a normal Electrocardiogram (ECG), ventricular repolarization is represented by which wave?",
            options: [
              "P wave",
              "QRS complex",
              "T wave",
              "U wave"
            ],
            correctAnswer: 2,
            explanation: "The T wave represents ventricular repolarization, while the P wave represents atrial depolarization and the QRS complex represents ventricular depolarization.",
            highYieldTag: "Cardiology"
          }
        ]
      }
    ]
  },
  {
    id: 'biochemistry',
    title: 'Biochemistry',
    code: 'BIO',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    topics: [
      {
        id: 'carbohydrate-metabolism',
        title: 'Carbohydrate Metabolism & Enzymes',
        subtitle: 'Glycolysis, Krebs cycle, electron transport, and enzyme kinetics',
        estimatedHours: 4,
        lessonContent: {
          difficulty: 'Hard',
          readingTimeMinutes: 20,
          learningObjectives: [
            "Trace Glycolysis reactions, intermediate products, and ATP gains.",
            "Understand regulatory checkpoints of the Citric Acid (Krebs) cycle.",
            "Explain oxidoreductase complex paths in the electron transport chain.",
            "Differentiate competitive and non-competitive enzyme inhibition parameters."
          ],
          highYieldPoints: [
            "Glycolysis is a cytoplasmic pathway converting Glucose to Pyruvate (aerobic) or Lactate (anaerobic).",
            "The Citric Acid Cycle (TCA/Krebs) occurs in the mitochondrial matrix, producing NADH, FADH2, and GTP.",
            "Key regulatory enzymes of glycolysis are Hexokinase, Phosphofructokinase-1 (PFK-1), and Pyruvate Kinase.",
            "Oxidative Phosphorylation couples the electron transport chain (ETC) with ATP synthesis via proton gradient."
          ],
          onePageSummary: [
            "Glycolysis Net Yield: 2 ATP and 2 NADH per molecule of Glucose.",
            "TCA Cycle Net Yield: 3 NADH, 1 FADH2, 1 GTP (per Pyruvate, double for Glucose). Yields 10 ATP equivalents total.",
            "Enzymes: Biological catalysts that speed up reactions by lowering activation energy. Michaelis constant (Km) represents substrate affinity.",
            "Gluconeogenesis: Synthesis of glucose from non-carbohydrate precursors (lactate, glycerol, amino acids)."
          ],
          conceptBuilder: {
            introduction: "Carbohydrate metabolism serves as the biological fuel center. Carbohydrates are converted into glucose, entering respiratory loops to generate metabolic currency (ATP).",
            sections: [
              {
                title: "Enzyme Inhibition Dynamics",
                content: "Inhibitors decrease enzyme rate. Competitive inhibitors compete for the active site, increasing Km without changing Vmax. Non-competitive inhibitors bind to allosteric sites, decreasing Vmax without changing Km.",
                bullets: [
                  "Competitive inhibition: Reversibility secured by adding excess substrate.",
                  "Non-competitive inhibition: Allosteric structural shifts prevent substrate reaction."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Aerobic Respiration Pathway",
              steps: [
                "Glucose",
                "Pyruvate (Glycolysis)",
                "Acetyl-CoA (Link Reaction)",
                "Krebs Cycle (TCA)",
                "Electron Transport (ETC)"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Michaelis-Menten Plot vs Lineweaver-Burk Plot",
              description: "Comparison showing Vmax, half Vmax, and Km shifts under inhibition states.",
              keyLabels: ["Vmax", "Km", "-1/Km on double-reciprocal", "Inhibition curves"],
              examTip: "Double-reciprocal lines crossing on the Y-axis indicate competitive inhibition."
            }
          ],
          memoryTricks: [
            {
              concept: "Krebs Cycle Intermediates",
              mnemonic: "Officer Can I Keep Selling Sex For Money",
              explanation: "O = Oxaloacetate, C = Citrate, I = Isocitrate, K = Ketoglutarate, S = Succinyl-CoA, S = Succinate, F = Fumarate, M = Malate."
            }
          ],
          commonMistakes: [
            "Thinking glycolysis produces 38 ATP (38 ATP was the old total respiratory limit; current estimates yield 30-32 ATP).",
            "Misinformed assumption that competitive inhibitors lower Vmax."
          ],
          clinicalCorrelation: "Methanol poisoning treatment utilizes competitive enzyme inhibition; ethanol is administered because it competes for the active site of alcohol dehydrogenase.",
          faqs: [
            {
              question: "What is the Warburg effect?",
              answer: "The observation that cancer cells preferentially undergo anaerobic glycolysis even in the presence of abundant oxygen, securing fast biosynthetic intermediates."
            }
          ],
          recommendedNextTopic: {
            moduleId: 'organon',
            topicId: 'aphorisms-foundations',
            title: 'Hahnemannian Foundations'
          }
        },
        pyqs: [
          {
            id: 'biochem-pyq-1',
            marks: 10,
            university: 'RGUHS',
            years: ['2021', '2022'],
            question: "Describe Glycolysis (Embden-Meyerhof pathway) with energetics, rate-limiting steps, and regulatory aspects.",
            modelAnswerOutline: [
              "Definition and cellular site (cytosol).",
              "Sequence of reactions (Preparatory and Payoff phases).",
              "Rate-limiting enzymes and their regulatory controllers (PFK-1 is the primary pace-maker).",
              "Net ATP energetics under aerobic (7 or 8 ATPs) vs anaerobic (2 ATPs) conditions.",
              "Clinical significance (Lactic acidosis, cancer cells glycolysis/Warburg effect)."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'biochem-viva-1',
            question: "What is the Michaelis Constant (Km)?",
            category: "Enzymology",
            answer: "Km is the substrate concentration at which the reaction velocity is half of its maximum velocity (Vmax). It is inversely proportional to enzyme-substrate affinity.",
            examinerTip: "A low Km value indicates high substrate affinity, whereas a high Km indicates low affinity."
          }
        ],
        mcqs: [
          {
            id: 'biochem-mcq-1',
            question: "Which enzyme is the primary rate-limiting step of Glycolysis?",
            options: [
              "Hexokinase",
              "Phosphofructokinase-1 (PFK-1)",
              "Pyruvate Kinase",
              "Aldolase"
            ],
            correctAnswer: 1,
            explanation: "PFK-1 catalyzes the conversion of Fructose-6-phosphate to Fructose-1,6-bisphosphate, which is the committed and rate-limiting step of glycolysis.",
            highYieldTag: "Metabolism"
          }
        ]
      }
    ]
  },
  {
    id: 'organon',
    title: 'Organon of Medicine',
    code: 'ORG',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    topics: [
      {
        id: 'aphorisms-foundations',
        title: 'Hahnemannian Foundations (§1–28)',
        subtitle: 'The physician\'s mission, ideal of cure, vital force, and disease mechanics',
        estimatedHours: 5,
        lessonContent: {
          difficulty: 'Medium',
          readingTimeMinutes: 20,
          learningObjectives: [
            "Recite and explain Aphorism 1 regarding the physician's only mission.",
            "Understand the four pillars of the highest ideal of cure under Aphorism 2.",
            "Detail the therapeutic clinical parameters of Aphorism 3.",
            "Differentiate dynamic health animation from disease derangement."
          ],
          highYieldPoints: [
            "Aphorism §1 establishes the high and only mission of the physician: to restore the sick to health (to cure).",
            "Aphorism §2 defines the highest ideal of cure: rapid, gentle, and permanent restoration of health based on easily comprehensible principles.",
            "Aphorism §3 outlines the core dynamic knowledge components necessary for absolute therapeutics.",
            "Aphorism §9 introduces the concept of the spiritual, dynamic, self-acting Vital Force that animates the healthy organism."
          ],
          onePageSummary: [
            "§1: The Physician's Mission. Focuses on clinical action, rejecting theoretical speculations.",
            "§2: Highest Ideal of Cure. Attributes: Rapid, Gentle, Permanent, and Harmfree on natural logical laws.",
            "§3: Clinical Requirements: Understand the disease indications, remedy dynamics, dosage, and obstacle removal.",
            "§9: The Spiritual Vital Force. Directs all functions and sensations of the material body in harmonious play."
          ],
          conceptBuilder: {
            introduction: "The Organon of Medicine defines the scientific guidelines, axioms, and clinical codes of Homoeopathy. It outlines the natural laws of similar-based curing.",
            sections: [
              {
                title: "The Dynamic Concept of Vital Force",
                content: "In health, the spirit-like vital force animates the body. Disease starts as a dynamic derangement of this force, leading to perceptible physical symptoms.",
                bullets: [
                  "Dynamis: Invisible, immaterial, and autonomous.",
                  "Health: Absolute harmony of sensations and functions.",
                  "Disease: Discord in the vital tune, mapped via symptoms."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Health and Cure Flow",
              steps: [
                "Balanced Vital Force (Health)",
                "Dynamic Derangement (Disease)",
                "Symptom Total Representation",
                "Similar Remedy Action",
                "Eradication & Cure"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Dynamic Plane Interaction Schematic",
              description: "A diagram showing how medicinal force neutralizes disease forces on the dynamic plane.",
              keyLabels: ["Material Plane (Organs)", "Dynamic Plane (Vital Force)", "Natural Disease Force", "Homoeopathic Remedy Action"],
              examTip: "Ensure arrows show action directly on the Vital plane, leaving tissues clean."
            }
          ],
          memoryTricks: [
            {
              concept: "Aphorisms 1-4 Core",
              mnemonic: "MC He Preserves",
              explanation: "1 = Mission to Cure, 2 = Ideal Cure, 3 = Clear Knowledge, 4 = Preserver of Health."
            }
          ],
          commonMistakes: [
            "Confusing the vital force with physical energy levels.",
            "Proposing treatment strategies aimed solely at cellular pathology rather than vital dynamis."
          ],
          clinicalCorrelation: "Understanding §3 stops practitioners from trying to treat patients inside toxic environments, prioritizing obstacle removal first.",
          faqs: [
            {
              question: "Why did Hahnemann write the Organon?",
              answer: "To provide a systematic, reproducible, and rational medical framework based on empirical laws, replacing the hazardous speculations of his era."
            }
          ],
          recommendedNextTopic: {
            moduleId: 'pharmacy',
            topicId: 'sources-and-preparation',
            title: 'Homoeopathic Pharmacy'
          }
        },
        pyqs: [
          {
            id: 'org-pyq-1',
            marks: 10,
            university: 'NTRUHS',
            years: ['2020', '2023'],
            question: "Discuss the 'Highest Ideal of Cure' as enunciated in Aphorism §2 of Organon of Medicine.",
            modelAnswerOutline: [
              "Hahnemann's exact wording in §2.",
              "Detailed explanation of: 'Rapid', 'Gentle', 'Permanent', 'Harmfree', and 'Easily Comprehensible Principles'.",
              "Contrast with temporary palliative suppression.",
              "Philosophy of curing from within outwards (Hering's Law context)."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'org-viva-1',
            question: "Why does Hahnemann use the word 'Mission' instead of 'Profession' or 'Goal' in Aphorism §1?",
            category: "Hahnemannian Philosophy",
            answer: "The word 'Mission' implies a solemn, sacred duty. Hahnemann wanted to elevate medical practice to a patient-centered ethical calling, rejecting commercial or speculative pursuits.",
            examinerTip: "Highlight the phrase 'high and only mission' to impress the external examiner."
          }
        ],
        mcqs: [
          {
            id: 'org-mcq-1',
            question: "Which aphorism of Organon introduces the concept of the Vital Force?",
            options: [
              "Aphorism §1",
              "Aphorism §3",
              "Aphorism §9",
              "Aphorism §15"
            ],
            correctAnswer: 2,
            explanation: "Aphorism §9 introduces the spiritual, dynamic, self-acting Vital Force (dynamis) which animates the healthy material organism.",
            highYieldTag: "Organon Basics"
          }
        ]
      }
    ]
  },
  {
    id: 'pharmacy',
    title: 'Homoeopathic Pharmacy',
    code: 'PHM',
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    topics: [
      {
        id: 'sources-and-preparation',
        title: 'Drug Sources, Vehicles, & Potentisation',
        subtitle: 'Sourcing kingdoms, vehicles, trituration, and dynamisation scales',
        estimatedHours: 5,
        lessonContent: {
          difficulty: 'Medium',
          readingTimeMinutes: 20,
          learningObjectives: [
            "Identify the seven drug sourcing kingdoms of Homoeopathy.",
            "Examine physical and chemical requirements of vehicles.",
            "Understand dry trituration cycles using milk sugar.",
            "Compare Decimal, Centesimal, and LM diluting scales."
          ],
          highYieldPoints: [
            "Homoeopathic remedies are prepared from seven primary sources (Vegetable, Animal, Mineral, Nosodes, Sarcodes, Imponderabilia, Synthetic).",
            "Vehicles are chemically inert substances used as carrying agents for active remedies (e.g., lactose, alcohol, globule matrices).",
            "Dynamisation/Potentisation is a mathematical physical process reducing raw toxicity while releasing dynamic curative power.",
            "The decimal (1:10), centesimal (1:100), and LM potencies (1:50,000) represent the standard diluting scales."
          ],
          onePageSummary: [
            "Sources: Vegetable (Pulsatilla), Animal (Lachesis), Mineral (Sulphur), Nosodes (diseased tissue, Medorrhinum), Sarcodes (healthy secretion, Thyroidinum), Imponderabilia (Magnet, X-Ray).",
            "Trituration: The physical dry grinding of insoluble substances using a mortar and pestle with Milk of Sugar (Lactose) for 1 hour.",
            "Succussion: The mechanical shaking of soluble liquid dilutions with a standard vehicle (Alcohol).",
            "LM Scale: Dilution ratio of 1:50,000. Introduced in the 6th edition of Organon to avoid severe homoeopathic aggravations."
          ],
          conceptBuilder: {
            introduction: "Homoeopathic Pharmacy establishes scientific standards for drug sourcing, harvesting, vehicle processing, trituration, succussion, and active dosing preparation.",
            sections: [
              {
                title: "Vehicles & Milk of Sugar",
                content: "Vehicles must be inert, non-medicinal, and preservation-friendly. Sugar of Milk (Saccharum Lactis) is highly valued due to its hardness, crystalline structure, and solubility, ideal for trituration.",
                bullets: [
                  "Solid Vehicles: Sugar of Milk, cane sugar globules, tablet bases.",
                  "Liquid Vehicles: Distilled water, ethyl alcohol, glycerine grids."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Trituration Stage Timings",
              steps: [
                "1st Stage (6 mins grind, 4 mins scrape x2)",
                "2nd Stage (6 mins grind, 4 mins scrape x2)",
                "3rd Stage (6 mins grind, 4 mins scrape x2)",
                "Complete 1C Potency (60 minutes total)"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Mortar and Pestle Dry Trituration Setup",
              description: "A sketch showing spatial grinding angles inside a clean porcelain mortar.",
              keyLabels: ["Porcelain Mortar", "Pestle with flat tip", "Bone spatula scraper", "Lactose crystals"],
              examTip: "Grinding must always follow a counter-clockwise circular motion."
            }
          ],
          memoryTricks: [
            {
              concept: "Remedy Kingdoms",
              mnemonic: "Vampires Always Make Nasty Scared Inventions Daily",
              explanation: "V = Vegetable, A = Animal, M = Mineral, N = Nosodes, S = Sarcodes, I = Imponderabilia, D = Synthetic Drugs."
            }
          ],
          commonMistakes: [
            "Using metal scrapers instead of standard bone spatulas during trituration.",
            "Assuming LM potency uses decimal succussion mechanics."
          ],
          clinicalCorrelation: "Understanding solubility prevents pharmacists from attempting to liquid-dilute insoluble metals directly before dry trituration.",
          faqs: [
            {
              question: "What is an imponderabilia?",
              answer: "Remedies prepared from immaterial physical energy sources like X-ray, magnetism, solar rays, or electricity."
            }
          ],
          recommendedNextTopic: {
            moduleId: 'materia-medica',
            topicId: 'polychrest-remedies',
            title: 'Polychrest Remedies'
          }
        },
        pyqs: [
          {
            id: 'phm-pyq-1',
            marks: 10,
            university: 'MUHS',
            years: ['2018', '2021'],
            question: "What is Drug Dynamisation? Detail the step-by-step method of Trituration of an insoluble substance.",
            modelAnswerOutline: [
              "Definition of Drug Dynamisation/Potentisation.",
              "History: Introduced to reduce material toxic side-effects while unlocking curative dynamic power.",
              "Trituration procedure: 1 hour, divided into three stages of 20 minutes each (grinding, scraping, mixing).",
              "Proportions used (e.g., 1 grain of drug to 99 grains of Milk of Sugar for 1C potency).",
              "Standard equipment used (porcelain mortar and pestle, bone spatula)."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'phm-viva-1',
            question: "What is the dilution ratio of the LM Potency (50-millesimal Scale)?",
            category: "Posology & Potentisation",
            answer: "The dilution ratio is 1:50,000 at each successive stage of dynamisation.",
            examinerTip: "Mention that it was introduced in the 6th edition of the Organon as §270 to ensure rapid, gentle cures."
          }
        ],
        mcqs: [
          {
            id: 'phm-mcq-1',
            question: "Which of the following is prepared from healthy endocrine or physiological secretions?",
            options: [
              "Nosode",
              "Sarcode",
              "Imponderabilia",
              "Synthetic drug"
            ],
            correctAnswer: 1,
            explanation: "Sarcodes are prepared from healthy biological tissues or secretions (e.g., Thyroidinum, Adrenalinum), whereas Nosodes are prepared from diseased substances.",
            highYieldTag: "Remedy Sourcing"
          }
        ]
      }
    ]
  },
  {
    id: 'materia-medica',
    title: 'Homoeopathic Materia Medica',
    code: 'HMM',
    badgeColor: 'bg-stone-500/10 text-stone-600 border-stone-500/20',
    topics: [
      {
        id: 'polychrest-remedies',
        title: 'Polychrest Remedies: Sulphur & Calcarea Carb',
        subtitle: 'Constitutional types, keynotes, mental states, and modalities',
        estimatedHours: 5,
        lessonContent: {
          difficulty: 'Medium',
          readingTimeMinutes: 20,
          learningObjectives: [
            "Contrast Sulphur's philosophical egotism with Calcarea Carb's slow anxiety.",
            "Explain physical constitutions, sweating profiles, and temperature differences.",
            "Map key food cravings, thermal states, and modalities.",
            "Differentiate dynamic skin pathology indications."
          ],
          highYieldPoints: [
            "Sulphur represents the 'Ragged Philosopher' - hot, thirsty, dirty skin, worse from warmth and standing.",
            "Calcarea Carbonica represents the fair, fat, flabby, cold-sweating patient who is easily fatigued and craves eggs.",
            "Keynote symptoms are crucial for prescribing; matching individual peculiar symptoms yields clinical success.",
            "Modalities (worse/better triggers) serve to differentiate similar remedies in the same clinical family."
          ],
          onePageSummary: [
            "Sulphur: King of anti-psorics. Mentally philosophical but physically untidy. Burning sensations in palms, soles, and vertex. Craves sweets, hates water.",
            "Calcarea Carbonica: King of calcium remedies. Sweats profusely, especially on back of neck during sleep. Cold damp feet feel like they have wet socks on.",
            "Prescribing guidelines: Prescribe on the totality of symptoms - mental state, general modalities, and local characteristic symptoms.",
            "Hering's Law of Cure: Cure progresses from above downwards, within outwards, from more important to less important organs."
          ],
          remedyDetails: {
            identity: {
              commonName: "Sublimed Sulphur / Brimstone",
              family: "Mineral Element",
              prover: "Dr. Samuel Hahnemann",
              source: "Brimstone Sublimation"
            },
            keynotes: [
              "Burning sensations in vertex, palms, and soles. Drives the patient to search for cold spots in bed.",
              "Egotistic philosopher: Imagines old rags are beautiful silk clothes.",
              "Morning diarrhoea at 5 AM forcing the patient out of bed, painless but urgent.",
              "Skin is dry, scaling, dirty, and severely itchy; scratch relieves but leads to burning."
            ],
            modalities: {
              aggravation: [
                "Warmth of bed",
                "Washing / Bathing",
                "Standing up",
                "Periodically at 11 AM"
              ],
              amelioration: [
                "Dry, warm weather",
                "Lying on the right side",
                "Cold applications"
              ]
            }
          },
          conceptBuilder: {
            introduction: "Materia Medica details the comprehensive dynamic profiles of remedies as established via proving records on healthy human volunteers.",
            sections: [
              {
                title: "Differentiating Sulphur and Calcarea Carb",
                content: "Sulphur is structurally lean, stooped, thermally hot, and intensely thirsty. Calcarea Carb is fair, fat, flabby, thermally cold, lacks thirst, and sweats abundantly.",
                bullets: [
                  "Sulphur: Egotistic, untidy, seeks mental pursuits.",
                  "Calcarea Carb: Slow, fearful of insanity, seeks safety."
                ]
              }
            ]
          },
          flowcharts: [
            {
              title: "Thermal Mapping Pathway",
              steps: [
                "Evaluate patient thermal reaction",
                "Hot Patient (Think Sulphur, Pulsatilla)",
                "Cold Patient (Think Calcarea Carb, Silicea)",
                "Verify specific keynote cravings"
              ]
            }
          ],
          diagramGuides: [
            {
              title: "Sulphur Physical Portrait",
              description: "A sketch showing typical stoop-shouldered standing posture and untidy look.",
              keyLabels: ["Stooped shoulders", "Red lips and nostrils", "Dirty dry skin patches", "Scratching palms"],
              examTip: "Always label the 'Redness of orifices' clearly on your sketch."
            }
          ],
          memoryTricks: [
            {
              concept: "Calcarea Carb",
              mnemonic: "The 3 Fs of Calcarea",
              explanation: "Fair, Fat, Flabby constitution. Combined with cold damp sweating."
            }
          ],
          commonMistakes: [
            "Forgetting that Sulphur is thermally hot, whereas Calcarea Carb is thermally cold.",
            "Prescribing Sulphur directly during acute asthma flare-ups without testing safety margins."
          ],
          clinicalCorrelation: "Useful for resolving chronic skin flareups when correct remedies fail to act due to hidden psoric blocks.",
          faqs: [
            {
              question: "What does 'Ragged Philosopher' mean?",
              answer: "An intellectual patient who is completely indifferent to physical neatness or social appearance."
            }
          ]
        },
        pyqs: [
          {
            id: 'mm-pyq-1',
            marks: 15,
            university: 'WBUHS',
            years: ['2020', '2022'],
            question: "Describe the drug picture of Sulphur under headings: constitution, mind, keynotes, modalities, and skin complaints.",
            modelAnswerOutline: [
              "Introduction: Mineral source, prepared by trituration, King of anti-psorics.",
              "Physical Constitution: Stoop-shouldered, dirty-looking, ragged philosopher.",
              "Mental Symptoms: Speculative philosophy, egotistic, forgets names, active imagination.",
              "Keynotes: Hot patient, burning in palms, soles, and vertex, early morning painless diarrhoea (5 AM).",
              "Skin: Extremely itchy, scratching feels good but is followed by burning; worse from bathing and warmth.",
              "Modalities: Aggravated by warmth of bed, standing, washing; ameliorated by dry weather."
            ]
          }
        ],
        vivaQuestions: [
          {
            id: 'mm-viva-1',
            question: "What is the characteristic food craving of a Calcarea Carbonica patient?",
            category: "Keynote Modalities",
            answer: "A Calcarea Carb patient typically craves boiled eggs, along with indigestible things like chalk, coal, or dirt (pica).",
            examinerTip: "Mention that Calcarea Carb also has a strong aversion to milk and warm food."
          }
        ],
        mcqs: [
          {
            id: 'mm-mcq-1',
            question: "Which remedy is characterized by early morning painless diarrhoea driving the patient out of bed at 5 AM?",
            options: [
              "Calcarea Carb",
              "Arsenicum Album",
              "Sulphur",
              "Lycopodium"
            ],
            correctAnswer: 2,
            explanation: "Sulphur has a well-known keynote of painless morning diarrhoea that drives the patient out of bed at 5 AM, accompanied by sudden urgency.",
            highYieldTag: "Polychrest Keynotes"
          }
        ]
      }
    ]
  }
];

export const EXAMINATION_HUB_DATA = {
  expectedLAQs: [
    {
      subject: "Anatomy",
      predictedProbability: "95% (Highly Expected)",
      question: "Describe the anatomy of the Shoulder Joint under headings: type, bones, ligaments, relations, muscles, and clinical anatomy.",
      highYieldTips: "Draw the schematic coronal section showing the synovial cavity and label the rotator cuff muscles (SITS) clearly for maximum marks."
    },
    {
      subject: "Organon of Medicine",
      predictedProbability: "90% (Expected)",
      question: "What is Vital Force? Describe its role in health, disease, and cure as explained in Aphorisms §9 to §15.",
      highYieldTips: "Always cite the exact adjectives Hahnemann uses for the Vital Force: 'spiritual', 'dynamic', 'self-acting', 'automatic' (dynamis)."
    },
    {
      subject: "Physiology",
      predictedProbability: "88% (Expected)",
      question: "Describe the transport of Oxygen in blood. Draw the Oxygen-Haemoglobin dissociation curve and list factors shifting it to the right.",
      highYieldTips: "Include Bohr effect equations and make sure your graph has correctly labeled axes (pO2 vs % Saturation)."
    },
    {
      subject: "Pharmacy",
      predictedProbability: "85% (Expected)",
      question: "Define vehicles. Classify them with examples. Describe the preparation and purification of Sugar of Milk (Lactose).",
      highYieldTips: "Highlight why Sugar of Milk is the ideal vehicle due to its physical hardness, chemical inertness, and lack of medicinal power."
    }
  ],
  importantDiagrams: [
    {
      subject: "Anatomy",
      frequency: "Frequently Asked",
      title: "Coronal Section of the Shoulder Joint showing Synovial Membrane and Bursa relations"
    },
    {
      subject: "Physiology",
      frequency: "Highly Recurrent",
      title: "Wiggers Diagram of Cardiac Cycle (Left Ventricular Pressure, Volume, and ECG correlation)"
    },
    {
      subject: "Anatomy",
      frequency: "Every Alternative Year",
      title: "Schematic representation of the Brachial Plexus (Roots, Trunks, Divisions, Cords, Branches)"
    }
  ],
  spotters: [
    {
      category: "Osteology Spotter",
      title: "Typical Rib vs Atypical Rib",
      description: "Be prepared to identify a typical rib by its head with two facets, tubercle, angle, and costal groove. Atypical ribs (1st, 2nd, 10th, 11th, 12th) lack one or more of these features."
    },
    {
      category: "Pharmacy Spotter",
      title: "Hydrometer & Pyknometer",
      description: "Hydrometers are used to determine the specific gravity of liquids (like alcohol). Pyknometers are glass flasks used to determine absolute density."
    },
    {
      category: "Histology Spotter",
      title: "Hyaline Cartilage Slide",
      description: "Identify under the microscope: chondrocytes in lacunae grouped in nests (isogenous groups), surrounded by a homogenous basophilic matrix without visible fibers."
    }
  ]
};

export const REVISION_SCHEDULE = {
  daily: [
    "Review high-yield points of the previous day's topic for 15 minutes before starting new lessons.",
    "Solve at least 5 MCQs for the daily topic to reinforce diagnostic and recall skills."
  ],
  weekly: [
    "Review all 1st BHMS bookmarks and hand-written notes on Sunday mornings.",
    "Practice drawing 2 hand-labeled anatomical diagrams from the examination hub list."
  ],
  subjectWise: [
    "Dedicate alternate days to Anatomy and Physiology, ensuring clinical correlation (e.g., studying shoulder anatomy alongside muscular motor physiology).",
    "Integrate Organon foundations with Materia Medica drug pictures (e.g., study §9 Vital Force alongside Sulphur's dynamic skin symptoms)."
  ],
  last24Hours: [
    "Go through the 1-Page High-Yield Cheat Sheets for all 6 active modules.",
    "Re-verify spotter checklists and diagnostic formulas. Avoid studying heavy new textbooks; trust your revision logs!"
  ]
};
