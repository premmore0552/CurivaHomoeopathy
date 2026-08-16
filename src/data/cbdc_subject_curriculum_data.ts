import { Unit } from '../pages/CbdcSyllabus';

export interface SubjectRouteConfig {
  code: string;
  name: string;
  year: string;
  mainRoute: string;
  portalRoute: string;
  blueprintRoute: string;
  mcqRoute: string;
  flashcardRoute: string;
  badge: string;
}

export const SUBJECT_ROUTE_MAPPINGS: Record<string, SubjectRouteConfig> = {
  // 1st BHMS
  anatomy: {
    code: 'HomUG-Anat',
    name: 'Human Anatomy (Paper I & II)',
    year: '1st BHMS',
    mainRoute: '/subject/anatomy',
    portalRoute: '/portal/1st-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Pre-Clinical Foundation'
  },
  physiology: {
    code: 'HomUG-Phys',
    name: 'Physiology & Biochemistry',
    year: '1st BHMS',
    mainRoute: '/subject/physiology',
    portalRoute: '/portal/1st-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Pre-Clinical Foundation'
  },
  pharmacy: {
    code: 'HomUG-Pharm',
    name: 'Homoeopathic Pharmacy',
    year: '1st BHMS',
    mainRoute: '/subject/pharmacy',
    portalRoute: '/portal/1st-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Homoeopathic Core'
  },
  organon1: {
    code: 'HomUG-OM-I',
    name: 'Organon of Medicine - I',
    year: '1st BHMS',
    mainRoute: '/subject/organon',
    portalRoute: '/portal/1st-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Homoeopathic Philosophy'
  },
  materia1: {
    code: 'HomUG-HMM-I',
    name: 'Homoeopathic Materia Medica - I',
    year: '1st BHMS',
    mainRoute: '/subject/materia-medica',
    portalRoute: '/portal/1st-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Materia Medica (50 Remedies + 12 Tissue Salts)'
  },

  // 2nd BHMS
  pathology: {
    code: 'HomUG-Path-M',
    name: 'Pathology & Microbiology (Paper I & II)',
    year: '2nd BHMS',
    mainRoute: '/subject/pathology',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Para-Clinical Master Subject'
  },
  fmt: {
    code: 'HomUG-FMT',
    name: 'Forensic Medicine & Toxicology (FMT)',
    year: '2nd BHMS',
    mainRoute: '/subject/forensic-medicine',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Para-Clinical Legal Medicine'
  },
  materia2: {
    code: 'HomUG-HMM-II',
    name: 'Homoeopathic Materia Medica - II',
    year: '2nd BHMS',
    mainRoute: '/subject/materia-medica',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: '48 Polychrest Remedies'
  },
  organon2: {
    code: 'HomUG-OM-II',
    name: 'Organon of Medicine - II',
    year: '2nd BHMS',
    mainRoute: '/subject/organon',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Miasms & Case Taking (§28–104)'
  },
  repertory2: {
    code: 'HomUG-R-II',
    name: 'Homoeopathic Repertory - II',
    year: '2nd BHMS',
    mainRoute: '/subject/repertory',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Boericke Repertory & Rubrics'
  },
  practice1: {
    code: 'HomUG PM-I',
    name: 'Practice of Medicine - I',
    year: '2nd BHMS',
    mainRoute: '/subject/practice-of-medicine',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Infectious & Tropical Medicine'
  },
  surgery1: {
    code: 'HomUG-Sur-I',
    name: 'Surgery - I',
    year: '2nd BHMS',
    mainRoute: '/subject/surgery',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'General Surgical Principles & Trauma'
  },
  obgyn1: {
    code: 'HomUG-ObGy-I',
    name: 'Gynaecology & Obstetrics - I',
    year: '2nd BHMS',
    mainRoute: '/subject/gynecology-obstetrics',
    portalRoute: '/portal/2nd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Applied Anatomy & Normal Pregnancy'
  },

  // 3rd BHMS
  surgery: {
    code: 'HomUG-Sur',
    name: 'Surgery & Homoeopathic Therapeutics (Paper I & II)',
    year: '3rd BHMS',
    mainRoute: '/subject/surgery',
    portalRoute: '/portal/3rd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Clinical Surgery & Orthopaedics'
  },
  obgyn: {
    code: 'HomUG-ObGy',
    name: 'Obstetrics & Gynaecology (Paper I & II)',
    year: '3rd BHMS',
    mainRoute: '/subject/gynecology-obstetrics',
    portalRoute: '/portal/3rd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Clinical Obstetrics & Gynaecology'
  },
  materia3: {
    code: 'HomUG-HMM-III',
    name: 'Homoeopathic Materia Medica - III',
    year: '3rd BHMS',
    mainRoute: '/subject/materia-medica',
    portalRoute: '/portal/3rd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Group Studies & 65 Remedies'
  },
  organon3: {
    code: 'HomUG-OM-III',
    name: 'Organon of Medicine - III',
    year: '3rd BHMS',
    mainRoute: '/subject/organon',
    portalRoute: '/portal/3rd-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Drug Proving & Posology (§105–294)'
  },

  // 4th BHMS
  practice: {
    code: 'HomUG-PM',
    name: 'Practice of Medicine (Paper I & II)',
    year: '4th BHMS',
    mainRoute: '/subject/practice-of-medicine',
    portalRoute: '/portal/4th-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Systemic Internal Medicine'
  },
  repertory: {
    code: 'HomUG-Rep',
    name: 'Repertory & Repertorisation',
    year: '4th BHMS',
    mainRoute: '/subject/repertory',
    portalRoute: '/portal/4th-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Kent, TPB, BBCR & Software'
  },
  materia4: {
    code: 'HomUG-HMM-IV',
    name: 'Homoeopathic Materia Medica - IV (Paper I & II)',
    year: '4th BHMS',
    mainRoute: '/subject/materia-medica',
    portalRoute: '/portal/4th-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: '76+ Remedies & Clinical Nosodes'
  },
  organon4: {
    code: 'HomUG-OM-IV',
    name: 'Organon of Medicine - IV (Philosophies)',
    year: '4th BHMS',
    mainRoute: '/subject/organon',
    portalRoute: '/portal/4th-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Kent, Stuart Close & Roberts'
  },
  community: {
    code: 'HomUG-PSM',
    name: 'Community Medicine (Preventive & Social)',
    year: '4th BHMS',
    mainRoute: '/public-education',
    portalRoute: '/portal/4th-bhms',
    blueprintRoute: '/university-blueprints',
    mcqRoute: '/aiapget-mcq-simulator',
    flashcardRoute: '/flashcards',
    badge: 'Epidemiology & National Health'
  }
};

export const COMPLETE_SUBJECT_CURRICULUM_DATA: Record<string, Unit[]> = {
  // ----------------------------------------------------
  // 1ST BHMS: ANATOMY
  // ----------------------------------------------------
  anatomy: [
    {
      id: "an_u1",
      number: 1,
      name: "General Anatomy, Osteology, Arthrology & Embryology",
      chapters: [
        {
          id: "an_c1",
          number: 1,
          name: "Anatomical Terminology, Planes & Connective Tissues",
          examPriority: "High",
          studyTime: "12 Hours",
          topics: [
            {
              id: "an_t1",
              name: "Anatomical positions, planes, axes, and directional terms",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Sagittal, Coronal & Transverse planes", "Medial vs Lateral, Proximal vs Distal", "Supine vs Prone clinical significance"]
            },
            {
              id: "an_t2",
              name: "Classification of Bones, Vascular Supply & Ossification",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Long, short, flat, irregular & sesamoid bones", "Nutrient artery and epiphyseal blood supply", "Intramembranous vs Endochondral ossification"]
            },
            {
              id: "an_t3",
              name: "Classification of Joints & Applied Biomechanics",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Fibrous, Cartilaginous & Synovial joints", "Hilton's Law of joint nerve supply", "Dislocation mechanics and stability factors"]
            }
          ]
        },
        {
          id: "an_c2",
          number: 2,
          name: "General Histology & General Embryology",
          examPriority: "Medium",
          studyTime: "14 Hours",
          topics: [
            {
              id: "an_t4",
              name: "Epithelial, Muscular & Nervous Tissues Histology",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Simple vs Stratified epithelia", "Skeletal vs Cardiac vs Smooth muscle histology", "Neuron & Neuroglia morphology"]
            },
            {
              id: "an_t5",
              name: "Gametogenesis, Fertilization & Bilaminar/Trilaminar Germ Disc",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Spermatogenesis & Oogenesis", "Fertilization and Morula/Blastocyst formation", "Primitive streak and Gastrulation"]
            }
          ]
        }
      ]
    },
    {
      id: "an_u2",
      number: 2,
      name: "Upper Limb & Axilla (Paper I)",
      chapters: [
        {
          id: "an_c3",
          number: 3,
          name: "Pectoral Region, Axilla & Brachial Plexus",
          examPriority: "Very High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "an_t6",
              name: "Brachial Plexus: Formation, Branches & Clinical Injuries",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Roots, Trunks, Divisions, Cords & Branches", "Erb-Duchenne Palsy (Waiter's Tip position)", "Klumpke's Paralysis (Claw Hand deformity)"]
            },
            {
              id: "an_t7",
              name: "Mammary Gland (Breast): Anatomy, Lymphatic Drainage & Carcinoma",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Structure, Suspensory ligaments of Cooper", "Axillary and Internal mammary lymph nodes", "Peau d'orange appearance & retraction"]
            },
            {
              id: "an_t8",
              name: "Cubital Fossa & Spaces of Hand (Thenar, Midpalmar Spaces)",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Boundaries & contents of Cubital fossa", "Median nerve vs Radial nerve in forearm", "Carpal Tunnel Syndrome anatomy"]
            }
          ]
        }
      ]
    },
    {
      id: "an_u3",
      number: 3,
      name: "Thorax & Cardiovascular System (Paper I)",
      chapters: [
        {
          id: "an_c4",
          number: 4,
          name: "Thoracic Wall, Lungs, Pleura & Mediastinum",
          examPriority: "Very High",
          studyTime: "16 Hours",
          topics: [
            {
              id: "an_t9",
              name: "Heart: External Features, Right Atrium Interior & Coronary Circulation",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Crista terminalis, Fossa ovalis, SA node", "Right vs Left Coronary artery branches & Dominance", "Coronary thrombosis & Angina pectoris anatomy"]
            },
            {
              id: "an_t10",
              name: "Lungs & Bronchopulmonary Segments",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Right lung (3 lobes) vs Left lung (2 lobes + Lingula)", "10 Bronchopulmonary segments and drainage", "Pleural recesses (Costodiaphragmatic recess)"]
            }
          ]
        }
      ]
    },
    {
      id: "an_u4",
      number: 4,
      name: "Head, Neck & Neuroanatomy (Paper II)",
      chapters: [
        {
          id: "an_c5",
          number: 5,
          name: "Triangles of Neck, Cranial Nerves & Brain",
          examPriority: "Very High",
          studyTime: "24 Hours",
          topics: [
            {
              id: "an_t11",
              name: "Triangles of Neck (Carotid, Submandibular, Posterior Triangles)",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Carotid Sheath contents and relations", "Cervical sympathetic chain and Horner's Syndrome", "Ansa Cervicalis nerve supply to strap muscles"]
            },
            {
              id: "an_t12",
              name: "Cerebrum, Sulci, Gyri, Functional Areas & Circle of Willis",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Motor area (4), Broca's speech area (44/45), Sensory area (3,1,2)", "Internal Capsule blood supply and Charcot's artery", "Circle of Willis anastomotic components & Aneurysms"]
            },
            {
              id: "an_t13",
              name: "Facial Nerve (VII) & Trigeminal Nerve (V) Pathways & Lesions",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Bell's Palsy vs UMN facial palsy", "Branches: Temporal, Zygomatic, Buccal, Mandibular, Cervical", "Trigeminal Neuralgia clinical correlations"]
            }
          ]
        }
      ]
    },
    {
      id: "an_u5",
      number: 5,
      name: "Abdomen, Pelvis & Lower Limb (Paper II)",
      chapters: [
        {
          id: "an_c6",
          number: 6,
          name: "Stomach, Liver, Kidney, Inguinal Canal & Perineum",
          examPriority: "Very High",
          studyTime: "22 Hours",
          topics: [
            {
              id: "an_t14",
              name: "Stomach: Bed, Blood Supply, Lymphatic Drainage & Gastric Ulcer",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Celiac trunk branches to stomach", "Stomach bed anatomical structures", "Virchow's node & Troiser's sign in gastric malignancy"]
            },
            {
              id: "an_t15",
              name: "Inguinal Canal: Boundaries, Contents & Inguinal Hernia",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Deep vs Superficial inguinal ring", "Direct vs Indirect inguinal hernia (Hesselbach's triangle)", "Spermatic cord coverings and contents"]
            },
            {
              id: "an_t16",
              name: "Femoral Triangle, Popliteal Fossa & Sciatic Nerve",
              status: "Available",
              link: "/subject/anatomy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Femoral canal, sheath & ring (Femoral hernia)", "Popliteal artery, vein & tibial/common peroneal nerves", "Sciatica course and intramuscular injection safety zone"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 1ST BHMS: PHYSIOLOGY & BIOCHEMISTRY
  // ----------------------------------------------------
  physiology: [
    {
      id: "phys_u1",
      number: 1,
      name: "General Physiology, Biophysics & Blood (Hematology)",
      chapters: [
        {
          id: "phys_c1",
          number: 1,
          name: "Cell Membrane, Transport, Blood Composition & Hemostasis",
          examPriority: "Very High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "phys_t1",
              name: "Resting Membrane Potential (RMP) & Action Potential Dynamics",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Nernst and Goldman-Hodgkin-Katz equations", "Voltage-gated Na+ and K+ channel gating", "Refractory periods (Absolute vs Relative)"]
            },
            {
              id: "phys_t2",
              name: "Erythropoiesis, Hemoglobin Synthesis & Anemias",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Stages: Proerythroblast to Reticulocyte", "Factors: Erythropoietin, Vitamin B12, Folic Acid, Iron", "Microcytic vs Macrocytic vs Normocytic anemia"]
            },
            {
              id: "phys_t3",
              name: "Hemostasis, Blood Coagulation Cascade & Blood Groups",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Intrinsic vs Extrinsic coagulation pathway", "Clotting factors, Prothrombin time, APTT", "ABO & Rh system, Erythroblastosis Fetalis"]
            }
          ]
        }
      ]
    },
    {
      id: "phys_u2",
      number: 2,
      name: "Cardiovascular & Respiratory Systems",
      chapters: [
        {
          id: "phys_c2",
          number: 2,
          name: "Cardiac Cycle, Blood Pressure Regulation & Pulmonary Mechanics",
          examPriority: "Very High",
          studyTime: "22 Hours",
          topics: [
            {
              id: "phys_t4",
              name: "Cardiac Cycle: Phases, Wiggers Diagram & Heart Sounds",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Isometric contraction, Rapid ejection, Isovolumetric relaxation", "First (S1) and Second (S2) heart sounds mechanism", "Jugular Venous Pulse (JVP) waves (a, c, v, x, y)"]
            },
            {
              id: "phys_t5",
              name: "Arterial Blood Pressure Regulation (Short & Long Term)",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Baroreceptor and Chemoreceptor reflex mechanisms", "Renin-Angiotensin-Aldosterone System (RAAS)", "Determinants: Cardiac Output and Peripheral Resistance"]
            },
            {
              id: "phys_t6",
              name: "Mechanics of Respiration, Lung Volumes & Oxygen-Hb Dissociation",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Surfactant, Compliance, Airway resistance", "Spirometry: TV, IRV, ERV, RV, VC, FEV1", "Bohr effect, Haldane effect, Right vs Left shift"]
            }
          ]
        }
      ]
    },
    {
      id: "phys_u3",
      number: 3,
      name: "Renal, Endocrine & Medical Biochemistry",
      chapters: [
        {
          id: "phys_c3",
          number: 3,
          name: "Renal Function, Endocrine Axis & Metabolic Pathways",
          examPriority: "Very High",
          studyTime: "24 Hours",
          topics: [
            {
              id: "phys_t7",
              name: "Glomerular Filtration Rate (GFR) & Countercurrent Mechanism",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Starling forces determining GFR (125 ml/min)", "Loop of Henle multiplier & Vasa recta exchanger", "Tubuloglomerular feedback & Juxtaglomerular Apparatus"]
            },
            {
              id: "phys_t8",
              name: "Thyroid, Adrenal Cortex & Pancreatic Hormones",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Thyroid hormone synthesis, T3/T4 actions, Goiter", "Cortisol, Aldosterone, Cushing's vs Addison's", "Insulin vs Glucagon, Diabetes Mellitus pathophysiology"]
            },
            {
              id: "phys_t9",
              name: "Medical Biochemistry: Glycolysis, TCA (Krebs) Cycle & Lipid Metabolism",
              status: "Available",
              link: "/subject/physiology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Aerobic vs Anaerobic Glycolysis ATP yield", "Krebs Cycle regulation and Amphibolic nature", "Beta-oxidation of fatty acids and Ketone bodies"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 1ST BHMS: HOMOEOPATHIC PHARMACY
  // ----------------------------------------------------
  pharmacy: [
    {
      id: "pharm_u1",
      number: 1,
      name: "General Pharmacy, History, Pharmacopoeias & Sources of Drugs",
      chapters: [
        {
          id: "pharm_c1",
          number: 1,
          name: "Pharmacopoeias, Official Standards & Drug Sources",
          examPriority: "High",
          studyTime: "14 Hours",
          topics: [
            {
              id: "pharm_t1",
              name: "Homoeopathic Pharmacopoeia of India (HPI), HPUS & GHP",
              status: "Available",
              link: "/subject/pharmacy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["HPI history, volumes, monographs & committee rules", "HPUS vs British Homoeopathic Pharmacopoeia", "Good Manufacturing Practices (GMP) in pharmacy"]
            },
            {
              id: "pharm_t2",
              name: "Sources of Homoeopathic Drugs (Kingdoms & Specialized Groups)",
              status: "Available",
              link: "/subject/pharmacy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Vegetable, Animal, Mineral kingdoms", "Nosodes (Diseased products) & Sarcodes (Healthy secretions)", "Imponderabilia (X-ray, Magnetis, Solar) & Synthetic drugs"]
            }
          ]
        }
      ]
    },
    {
      id: "pharm_u2",
      number: 2,
      name: "Vehicles, Potentisation & Hahnemannian Preparation",
      chapters: [
        {
          id: "pharm_c2",
          number: 2,
          name: "Vehicles, Scales of Potentisation & Drug Proving",
          examPriority: "Very High",
          studyTime: "20 Hours",
          topics: [
            {
              id: "pharm_t3",
              name: "Vehicles: Sugar of Milk (Saccharum Lactis), Alcohol & Globules",
              status: "Available",
              link: "/subject/pharmacy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Preparation and purification of Saccharum Lactis", "Proof Spirit, Absolute Alcohol, Dispensing Alcohol", "Sizes and standardization of Globules and Cones"]
            },
            {
              id: "pharm_t4",
              name: "Potentisation Scales: Decimal (X), Centesimal (C) & 50-Millesimal (LM)",
              status: "Available",
              link: "/subject/pharmacy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Hering's Decimal scale (1:9 ratio)", "Hahnemann's Centesimal scale (1:99 ratio) with succussions", "50-Millesimal (LM/0) scale (§270 Organon 6th Edition)"]
            },
            {
              id: "pharm_t5",
              name: "Old Hahnemannian Classes (Class I to IX) vs Modern Maceration/Percolation",
              status: "Available",
              link: "/subject/pharmacy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Classes I-IV (Mother Tinctures from fresh plants)", "Classes V-VI (Aqueous & Alcoholic solutions)", "Classes VII-IX (Insoluble substances by Trituration)"]
            },
            {
              id: "pharm_t6",
              name: "Homoeopathic Drug Proving Protocol (§105–145) & Legal Acts",
              status: "Available",
              link: "/subject/pharmacy",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Healthy human volunteer selection criteria", "Control, Placebo, Double-blind proving protocols", "Drugs and Cosmetics Act 1940 & Rules 1945 applicable to Homoeopathy"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 2ND BHMS: PATHOLOGY & MICROBIOLOGY
  // ----------------------------------------------------
  pathology: [
    {
      id: "path_u1",
      number: 1,
      name: "General Pathology: Cell Injury, Hemodynamics & Neoplasia (Paper I)",
      chapters: [
        {
          id: "path_c1",
          number: 1,
          name: "Cell Injury, Adaptations & Cell Death",
          examPriority: "Very High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "path_t1",
              name: "Cellular Adaptations (Hypertrophy, Hyperplasia, Atrophy, Metaplasia, Dysplasia)",
              status: "Available",
              link: "/subject/pathology/cell-injury",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Physiological vs Pathological mechanisms", "Squamous metaplasia in smokers vs Barrett's esophagus", "Dysplasia as pre-neoplastic hallmark"]
            },
            {
              id: "path_t2",
              name: "Reversible vs Irreversible Cell Injury & Mechanisms",
              status: "Available",
              link: "/subject/pathology/cell-injury",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["ATP depletion, Mitochondrial damage & Calcium influx", "Reactive Oxygen Species (ROS) and free radical injury", "Membrane permeability defect transition"]
            },
            {
              id: "path_t3",
              name: "Necrosis vs Apoptosis: Morphology, Types & Molecular Pathways",
              status: "Available",
              link: "/subject/pathology/cell-injury",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Coagulative, Liquefactive, Caseous, Fat & Fibrinoid necrosis", "Intrinsic (Mitochondrial) vs Extrinsic (Death Receptor) Apoptosis", "Caspase cascade and morphological distinctions"]
            }
          ]
        },
        {
          id: "path_c2",
          number: 2,
          name: "Inflammation, Repair & Hemodynamic Disorders",
          examPriority: "Very High",
          studyTime: "20 Hours",
          topics: [
            {
              id: "path_t4",
              name: "Acute Inflammation: Vascular & Cellular Events, Chemical Mediators",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Vasodilation, Stasis & Increased Vascular Permeability", "Leukocyte Margination, Rolling, Adhesion & Transmigration", "Histamine, Prostaglandins, Leukotrienes, Cytokines"]
            },
            {
              id: "path_t5",
              name: "Chronic Granulomatous Inflammation & Tissue Healing",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Epithelioid cells, Langhans giant cells, Caseation", "Tuberculosis, Leprosy, Sarcoidosis, Syphilis granulomas", "Granulation tissue, Fibrogenesis, Primary vs Secondary healing"]
            },
            {
              id: "path_t6",
              name: "Shock, Edema, Thrombosis, Embolism & Infarction",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Virchow's Triad in Thrombosis", "Stages of Shock (Hypovolemic, Cardiogenic, Septic)", "Pulmonary embolism vs Systemic thromboembolism"]
            }
          ]
        },
        {
          id: "path_c3",
          number: 3,
          name: "Neoplasia (Oncology) & Carcinogenesis",
          examPriority: "Very High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "path_t7",
              name: "Benign vs Malignant Tumors: Characteristics & Nomenclature",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Differentiation, Anaplasia, Pleomorphism, Hyperchromatism", "Rate of growth, Local invasion & Metastasis pathways", "TNM clinical staging vs Histological grading"]
            },
            {
              id: "path_t8",
              name: "Molecular Basis of Cancer: Oncogenes, Tumor Suppressors & Carcinogens",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Proto-oncogenes to Oncogenes (RAS, MYC, HER2)", "Tumor Suppressor Genes (p53 'Guardian of Genome', RB)", "Chemical, Radiation & Viral Carcinogens (HPV, EBV, Hepatitis B/C)"]
            }
          ]
        }
      ]
    },
    {
      id: "path_u2",
      number: 2,
      name: "Microbiology, Parasitology, Virology & Lab Hematology (Paper II)",
      chapters: [
        {
          id: "path_c4",
          number: 4,
          name: "Bacteriology, Staining & Culture Media",
          examPriority: "High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "path_t9",
              name: "Bacterial Morphology, Gram Staining & Acid-Fast Staining (ZN Stain)",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Gram Positive vs Gram Negative cell wall architecture", "Ziehl-Neelsen staining protocol for Mycobacterium tuberculosis", "Spore, Capsule, Flagella staining & identification"]
            },
            {
              id: "path_t10",
              name: "Sterilisation, Disinfection & Culture Media",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Autoclave principles (121°C, 15 psi, 15 min)", "Hot air oven, Radiation, Chemical disinfectants", "Nutrient Agar, Blood Agar, MacConkey Agar differential media"]
            }
          ]
        },
        {
          id: "path_c5",
          number: 5,
          name: "Medical Parasitology & Clinical Hematology",
          examPriority: "High",
          studyTime: "20 Hours",
          topics: [
            {
              id: "path_t11",
              name: "Parasitology: Plasmodium (Malaria), Entamoeba & Helminths",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Life cycle of P. vivax vs P. falciparum in human and mosquito", "Entamoeba histolytica amoebic dysentery & Liver abscess", "Ascaris lumbricoides, Ancylostoma, Taenia solium cycles"]
            },
            {
              id: "path_t12",
              name: "Clinical Hematology: CBC Hemogram, ESR, Peripheral Smear & Urine Analysis",
              status: "Available",
              link: "/subject/pathology",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Hemoglobin, TLC, DLC differential counts & clinical shifts", "Microcytic Hypochromic vs Megaloblastic anemia blood picture", "Leukemoid Reaction vs Chronic Myeloid Leukemia (CML)"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 2ND BHMS: FORENSIC MEDICINE & TOXICOLOGY
  // ----------------------------------------------------
  fmt: [
    {
      id: "fmt_u1",
      number: 1,
      name: "Medical Jurisprudence, Thanatology & Forensic Traumatology",
      chapters: [
        {
          id: "fmt_c1",
          number: 1,
          name: "Legal Procedures, Medical Ethics & Post-Mortem Changes",
          examPriority: "Very High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "fmt_t1",
              name: "Legal Procedures & Courts: Bhartiya Nyaya Sanhita 2023, Inquest & Subpoena",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Police Inquest (Section 194 BNSS) vs Magistrate Inquest", "Witness examination: Oath, Chief, Cross & Re-examination", "Doctor's criminal vs civil liability and privileged communication"]
            },
            {
              id: "fmt_t2",
              name: "Medical Negligence: Bolam Test, Res Ipsa Loquitur & Professional Misconduct",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Civil vs Criminal Negligence criteria", "Doctrine of Res Ipsa Loquitur (Thing speaks for itself)", "Infamous conduct in professional respect (6 As)"]
            },
            {
              id: "fmt_t3",
              name: "Thanatology: Signs of Death, Rigor Mortis, Algor Mortis, Lividity & Decomposition",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Rigor Mortis timeline (Nysten's Law) vs Cadaveric Spasm", "Post-mortem lividity vs Bruise (Ecchymosis) differentiation", "Decomposition: Putrefaction, Adipocere, Mummification"]
            }
          ]
        },
        {
          id: "fmt_c2",
          number: 2,
          name: "Mechanical Injuries, Firearm Ballistics & Asphyxial Deaths",
          examPriority: "Very High",
          studyTime: "20 Hours",
          topics: [
            {
              id: "fmt_t4",
              name: "Mechanical Wounds: Abrasions, Contusions, Lacerations & Incised Wounds",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Antemortem vs Postmortem wound features", "Lacerated vs Incised wound comparative points", "Grievous Hurt (Section 116 BNS 2023) 8 clauses"]
            },
            {
              id: "fmt_t5",
              name: "Violent Asphyxial Deaths: Hanging, Strangulation, Drowning & Suffocation",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Hanging vs Ligature Strangulation autopsy differentiation", "Drowning: Paltauf's hemorrhages, Froth, Diatom test", "Traumatic asphyxia and Crush syndrome findings"]
            }
          ]
        }
      ]
    },
    {
      id: "fmt_u2",
      number: 2,
      name: "Toxicology & Homoeopathic Antidotes",
      chapters: [
        {
          id: "fmt_c3",
          number: 3,
          name: "General Toxicology, Metallic & Plant Poisons, Snakebite",
          examPriority: "Very High",
          studyTime: "20 Hours",
          topics: [
            {
              id: "fmt_t6",
              name: "Arsenic, Lead & Mercury Poisoning: Features & Post-Mortem",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Acute Arsenic poisoning mimicking Cholera", "Chronic Arsenicosis: Raindrop pigmentation, Hyperkeratosis", "Lead poisoning: Burtonian line, Plumbism, Wrist drop"]
            },
            {
              id: "fmt_t7",
              name: "Plant Poisons (Dhatura, Strychnos, Opium, Calotropis) & Snakebite Envenomation",
              status: "Available",
              link: "/subject/forensic-medicine",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Dhatura delirium, 9 Ds of Dhatura poisoning", "Snake venom: Elapidae (Neurotoxic) vs Viperidae (Vasotoxic)", "Homoeopathic Antidotes: Lachesis, Naja, Arsenicum, Camphora, Nux Vomica"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 2ND BHMS: GYNAECOLOGY & OBSTETRICS - I
  // ----------------------------------------------------
  obgyn1: [
    {
      id: "ob1_u1",
      number: 1,
      name: "Applied Anatomy, Physiology & Menstrual Disorders",
      chapters: [
        {
          id: "ob1_c1",
          number: 1,
          name: "Anatomy of Female Pelvis, HPO Axis & Menstrual Cycle",
          examPriority: "Very High",
          studyTime: "16 Hours",
          topics: [
            {
              id: "ob1_t1",
              name: "Female Pelvic Anatomy: Diameters, Pelvic Floor & Blood Supply",
              status: "Available",
              link: "/subject/gynecology-obstetrics",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Gynecoid, Android, Anthropoid, Platypelloid pelves", "Obstetric conjugate vs Diagonal conjugate", "Perineal body and support of uterus"]
            },
            {
              id: "ob1_t2",
              name: "Hypothalamic-Pituitary-Ovarian (HPO) Axis & Endometrial Cycles",
              status: "Available",
              link: "/subject/gynecology-obstetrics",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["GnRH pulsatility, FSH, LH surge mechanism", "Follicular vs Luteal ovarian phase", "Proliferative, Secretory, Menstrual endometrial phases"]
            },
            {
              id: "ob1_t3",
              name: "Abnormal Uterine Bleeding (AUB) - PALM-COEIN Classification",
              status: "Available",
              link: "/subject/gynecology-obstetrics",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Structural causes: Polyp, Adenomyosis, Leiomyoma, Malignancy", "Non-structural causes: Coagulopathy, Ovulatory, Endometrial, Iatrogenic", "Homoeopathic remedies: Sabina, Millefolium, Trillium, Hamamelis"]
            }
          ]
        }
      ]
    },
    {
      id: "ob1_u2",
      number: 2,
      name: "Normal Pregnancy, Antenatal Care & Normal Labour",
      chapters: [
        {
          id: "ob1_c2",
          number: 2,
          name: "Diagnosis of Pregnancy, ANC Protocols & Labour Stages",
          examPriority: "Very High",
          studyTime: "18 Hours",
          topics: [
            {
              id: "ob1_t4",
              name: "Diagnosis of Pregnancy: 1st, 2nd, 3rd Trimester Signs & Symptoms",
              status: "Available",
              link: "/subject/gynecology-obstetrics",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Hegar's sign, Chadwick's sign, Osiander's sign", "Quickening, Fetal Heart Sounds (FHS), Braxton Hicks contractions", "Ultrasound gestational sac and CRL measurements"]
            },
            {
              id: "ob1_t5",
              name: "Normal Labour: Stages (I to IV), Mechanisms & Partograph Monitoring",
              status: "Available",
              link: "/subject/gynecology-obstetrics",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Descent, Flexion, Internal rotation, Extension, Restitution", "Cervical dilatation and effacement curves", "Active phase alert and action lines on Partograph"]
            },
            {
              id: "ob1_t6",
              name: "Minor Ailments of Pregnancy & Homoeopathic Management",
              status: "Available",
              link: "/subject/gynecology-obstetrics",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Morning sickness / Hyperemesis: Ipecac, Symphoricarpus, Tabacum", "Heartburn, Constipation, Hemorrhoids in pregnancy", "Threatened abortion remedies: Caulophyllum, Secale, Viburnum"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 3RD BHMS: SURGERY
  // ----------------------------------------------------
  surgery: [
    {
      id: "sur_u1",
      number: 1,
      name: "General Surgery, Trauma, Shock, Burns & Infections (Paper I)",
      chapters: [
        {
          id: "sur_c1",
          number: 1,
          name: "Wound Management, Shock, Fluid Resuscitation & Burns",
          examPriority: "Very High",
          studyTime: "22 Hours",
          topics: [
            {
              id: "sur_t1",
              name: "Surgical Shock: Types, Pathophysiology, Monitoring & Fluid Therapy",
              status: "Available",
              link: "/subject/surgery",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Hypovolemic, Cardiogenic, Septic, Neurogenic shock", "Crystalloids (Ringer Lactate) vs Colloids in resuscitation", "CVP line monitoring and urine output thresholds"]
            },
            {
              id: "sur_t2",
              name: "Burns: Assessment (Wallace Rule of Nines), Parkland Formula & Management",
              status: "Available",
              link: "/subject/surgery",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Superficial vs Partial vs Full-thickness burns depth", "Parkland fluid calculation (4ml x kg x %TBSA)", "Homoeopathic Burn Therapeutics: Cantharis, Urtica Urens, Arsenicum"]
            },
            {
              id: "sur_t3",
              name: "Ulcers, Gangrene & Surgical Infections (Abscess, Carbuncle, Tetanus, Gas Gangrene)",
              status: "Available",
              link: "/subject/surgery",
              resources: { notes: true, diagrams: true, viva: true, blueprints: true },
              subtopics: ["Classification of ulcers (Trophic, Venous, Arterial, Malignant)", "Dry vs Wet vs Gas gangrene clinical features", "Silicea, Hepar Sulph, Myristica Sebifera in suppuration"]
            }
          ]
        }
      ]
    },
    {
      id: "sur_u2",
      number: 2,
      name: "Systemic Surgery, Gastrointestinal, Orthopaedics & Therapeutics (Paper II)",
      chapters: [
        {
          id: "sur_c2",
          number: 2,
          name: "Acute Abdomen, Appendicitis, Hernias, Gallbladder & Orthopaedics",
          examPriority: "High",
          studyTime: "24 Hours",
          topics: [
            {
              id: "sur_t4",
              name: "Acute Appendicitis: Pathogenesis, Alvarado Score & Surgical Decision",
              status: "Available",
              link: "/subject/surgery",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["McBurney's point tenderness, Rovsing's, Psoas, Obturator signs", "Alvarado scoring system for acute appendicitis", "Pre-operative remedies: Belladonna, Bryonia, Iris Tenax"]
            },
            {
              id: "sur_t5",
              name: "Abdominal Hernias: Inguinal, Femoral, Umbilical, Incisional",
              status: "Available",
              link: "/subject/surgery",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Reducible, Irreducible, Obstructed & Strangulated hernias", "Taxis vs Herniorrhaphy vs Lichtenstein mesh hernioplasty", "Post-operative flatulence and pain remedies"]
            },
            {
              id: "sur_t6",
              name: "Fractures, Dislocations & Post-Operative Homoeopathy",
              status: "Available",
              link: "/subject/surgery",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Principles of fracture reduction, immobilization (Plaster of Paris)", "Colles' fracture, Smith's fracture, Supracondylar fracture", "Symphytum, Calcarea Phos, Ruta, Arnica, Hypericum, Staphysagria"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 4TH BHMS: PRACTICE OF MEDICINE
  // ----------------------------------------------------
  practice: [
    {
      id: "pm_u1",
      number: 1,
      name: "Systemic Medicine: CVS, Respiratory, GIT & Endocrine (Paper I)",
      chapters: [
        {
          id: "pm_c1",
          number: 1,
          name: "Cardiovascular, Pulmonology, Gastrointestinal & Metabolic Diseases",
          examPriority: "High",
          studyTime: "26 Hours",
          topics: [
            {
              id: "pm_t1",
              name: "Hypertension, Ischemic Heart Disease (Angina & MI) & Heart Failure",
              status: "Available",
              link: "/subject/practice-of-medicine",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["JNC criteria, Essential vs Secondary hypertension", "ECG changes: ST elevation, T wave inversion, Pathological Q wave", "Crataegus, Digitalis, Cactus Grandiflorus, Latrodectus Mactans"]
            },
            {
              id: "pm_t2",
              name: "Bronchial Asthma, COPD, Pneumonia & Tuberculosis",
              status: "Available",
              link: "/subject/practice-of-medicine",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Reversible bronchospasm vs Irreversible alveolar destruction", "CURB-65 criteria for community-acquired pneumonia", "Blatta Orientalis, Arsenicum Album, Ipecac, Antim Tart, Tuberculinum"]
            },
            {
              id: "pm_t3",
              name: "Diabetes Mellitus, Thyroid Disorders & Liver Cirrhosis",
              status: "Available",
              link: "/subject/practice-of-medicine",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Type 1 vs Type 2 DM, Diabetic Ketoacidosis, Microvascular complications", "Hypothyroidism (Myxedema) vs Hyperthyroidism (Graves' Disease)", "Chelidonium, Carduus Marianus, Lycopodium, Syzygium Jambolanum"]
            }
          ]
        }
      ]
    },
    {
      id: "pm_u2",
      number: 2,
      name: "Neurology, Nephrology, Rheumatology & Psychiatry (Paper II)",
      chapters: [
        {
          id: "pm_c2",
          number: 2,
          name: "Stroke, Renal Failure, Autoimmune Rheumatology & Psychiatry",
          examPriority: "High",
          studyTime: "24 Hours",
          topics: [
            {
              id: "pm_t4",
              name: "Cerebrovascular Accident (Stroke), Parkinsonism & Epilepsy",
              status: "Available",
              link: "/subject/practice-of-medicine",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Ischemic vs Hemorrhagic stroke, NIHSS scale, FAST protocol", "Substantia nigra dopamine loss, Resting tremors, Rigidity, Festinating gait", "Cuprum Met, Zincum Met, Causticum, Gelsemium, Conium"]
            },
            {
              id: "pm_t5",
              name: "Nephrotic Syndrome, Acute & Chronic Kidney Disease (CKD)",
              status: "Available",
              link: "/subject/practice-of-medicine",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Proteinuria (>3.5g/day), Hypoalbuminemia, Generalized edema", "KDIGO stages based on eGFR and Albuminuria", "Apis Mellifica, Arsenicum, Terebinthina, Eel Serum (Serum Anguillae)"]
            },
            {
              id: "pm_t6",
              name: "Rheumatoid Arthritis, Gout, SLE & Psychiatric Disorders",
              status: "Available",
              link: "/subject/practice-of-medicine",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["ACR-EULAR criteria for RA vs Osteoarthritis distinctions", "Hyperuricemia, Podagra, Monosodium urate needle crystals", "Rhus Tox, Bryonia, Colchicum, Ledum Palustre, Benzoic Acid"]
            }
          ]
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // 4TH BHMS: REPERTORY & REPERTORISATION
  // ----------------------------------------------------
  repertory: [
    {
      id: "rep_u1",
      number: 1,
      name: "Principles, Evolution, Stalwart Repertories & Computerized Systems",
      chapters: [
        {
          id: "rep_c1",
          number: 1,
          name: "Kent's Repertory, Boenninghausen (TPB), Boger (BBCR) & Software",
          examPriority: "High",
          studyTime: "24 Hours",
          topics: [
            {
              id: "rep_t1",
              name: "Kent's Repertory: Plan, 37 Chapters, Grading & Deductive Method",
              status: "Available",
              link: "/subject/repertory",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["General to Particular deduction doctrine", "3 Typographical gradings: Bold (3), Italics (2), Roman (1)", "Cross-references and Rubric arrangement logic"]
            },
            {
              id: "rep_t2",
              name: "Boenninghausen's Therapeutic Pocket Book (TPB) & Doctrine of Analogy",
              status: "Available",
              link: "/subject/repertory",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Complete Symptom concept: Location, Sensation, Modality, Concomitant", "Doctrine of Analogy / Grand Generalisation", "5 Gradings in TPB and Concordance section"]
            },
            {
              id: "rep_t3",
              name: "Boger Boenninghausen's Characteristics and Repertory (BBCR)",
              status: "Available",
              link: "/subject/repertory",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Pathological Generals and Tissue affinities emphasis", "5 typographic gradings and Diagnostic keynotes", "Clinical rubrics and cross-referencing structure"]
            },
            {
              id: "rep_t4",
              name: "Computer Software Repertorisation (RADAR, Synthesis, Complete, Hompath)",
              status: "Available",
              link: "/subject/repertory",
              resources: { notes: true, diagrams: true, viva: true },
              subtopics: ["Expert system algorithms and statistical repertorisation", "Eliminative rubric strategy vs Total addition methods", "Modern synthetic additions and clinical validation"]
            }
          ]
        }
      ]
    }
  ]
};
