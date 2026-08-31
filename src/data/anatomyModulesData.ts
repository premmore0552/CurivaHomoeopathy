export interface AnatomyModule {
  id: string;
  title: string;
  bodyRegion: string;
  subject: string;
  studyTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  importance: "⭐ Frequently Asked" | "⭐ Viva Favourite" | "⭐ High Scoring" | "⭐ Easy Marks" | "⭐ Concept Based";
  nchCompetency: string;
  
  // Learning Objectives
  learningObjectives: string[];
  
  // Quick Facts
  quickFacts: {
    definition: string;
    location: string;
    function: string;
    clinicalImportance: string;
    oneLineRevision: string;
  };
  
  // Content Sections
  introduction: string;
  definitionText: string;
  classification?: string; // Optional e.g. for joints or bones
  grossAnatomy: {
    parts: string[];
    relations: string[];
    anatomicalFeatures: string[];
  };
  
  // Neurovascular
  bloodSupply: string;
  nerveSupply: string;
  lymphaticDrainage?: string;
  
  // Development / Embryology
  development?: string;
  
  // Applied Anatomy
  appliedAnatomy: string;
  clinicalCorrelation: string;
  surfaceAnatomy?: string;
  
  // Interactive / Visual Aids
  tables: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  flowchartSteps: {
    title: string;
    steps: { label: string; desc: string }[];
  };
  mnemonics: {
    phrase: string;
    meaning: string;
    concept: string;
  }[];
  
  // Misconceptions
  frequentlyConfused: {
    conceptA: string;
    conceptB: string;
    explanation: string;
  }[];
  
  // Q&A
  vivaQuestions: { q: string; a: string; tip?: string }[];
  universityQuestions: {
    shortNotes: string[];
    longQuestions: string[];
    veryShortQuestions: string[];
  };
  
  highYieldPoints: string[];
  oneMinuteRevision: string[];
  relatedTopics: { title: string; slug: string }[];
  references: string[];
  
  // Visual suggestions
  visualPlans: {
    type: string;
    title: string;
    description: string;
  }[];
}

export const anatomyModules: Record<string, AnatomyModule> = {
  clavicle: {
    id: "clavicle",
    title: "Clavicle (Collar Bone)",
    bodyRegion: "Pectoral Girdle / Upper Extremity",
    subject: "Anatomy (Paper I)",
    studyTime: "25 mins",
    difficulty: "Easy",
    importance: "⭐ Easy Marks",
    nchCompetency: "AN1.1 - Describe the anatomical features and attachments of clavicle",
    learningObjectives: [
      "Identify the side of a given clavicle bone.",
      "Describe the parts, curves, and processes of the clavicle.",
      "Explain the muscular and ligamentous attachments of the clavicle.",
      "Detail the clinical significance of clavicular fractures and Cleidocranial Dysostosis."
    ],
    quickFacts: {
      definition: "The clavicle is a long bone that lies horizontally at the root of the neck, connecting the upper limb to the trunk.",
      location: "Located subcutaneously at the junction of the neck and anterior thorax.",
      function: "Acts as a strut (support rod) to keep the upper limb away from the chest wall, allowing free movement of the arm.",
      clinicalImportance: "The most commonly fractured bone in the human body, typically at the junction of its medial two-thirds and lateral one-third.",
      oneLineRevision: "Clavicle is the only horizontal long bone without a medullary cavity that ossifies in membrane."
    },
    introduction: "Welcome to your first bone of the upper limb! The clavicle is commonly known as the collar bone. It is an extremely interesting bone because it breaks many standard rules of long bones. Let's explore its anatomy step-by-step so you can ace your spotting exams and viva voce easily.",
    definitionText: "The clavicle is a doubly curved, horizontal long bone. It connects the acromion of the scapula laterally to the manubrium sterni medially, forming the only bony bridge between the upper limb and the axial skeleton.",
    grossAnatomy: {
      parts: [
        "Shaft: Divided into a medial two-thirds (cylindrical and curved forward) and a lateral one-third (flattened and curved backward).",
        "Lateral (Acromial) End: Flattened from above downwards, articulates with the acromion process of the scapula.",
        "Medial (Sternal) End: Quadrangular, articulates with the clavicular notch of the manubrium sterni."
      ],
      relations: [
        "Superiorly: Covered by skin, superficial fascia, platysma muscle, and supraclavicular nerves.",
        "Inferiorly: Relates to the subclavius muscle, subclavian vessels, and the cords of the brachial plexus.",
        "Posteriorly: Lies anterior to the apex of the lung (cervical pleura) and subclavian artery."
      ],
      anatomicalFeatures: [
        "Conoid Tubercle: A small bony projection on the inferior surface of the lateral third, giving attachment to the conoid ligament.",
        "Trapezoid Line: A rough ridge extending forward and laterally from the conoid tubercle, giving attachment to the trapezoid ligament.",
        "Subclavian Groove: A longitudinal groove on the middle third of the inferior surface, accommodating the subclavius muscle."
      ]
    },
    bloodSupply: "Supplied primarily by the suprascapular artery, nutrient branches from the suprascapular artery, and some periosteal branches from the thoracoacromial artery.",
    nerveSupply: "Innervated by branches of the supraclavicular nerve (C3-C4) and the nerve to the subclavius (C5-C6).",
    development: "Clavicle is the first bone in the body to start ossifying (between the 5th and 6th weeks of intrauterine life). It ossifies in membrane from two primary centres, and one secondary center at the sternal end (which fuses by age 25). It has no medullary cavity.",
    appliedAnatomy: "In standard clinical practice, clavicular fractures are extremely common. They are usually caused by a fall on an outstretched hand (FOOSH) or direct shoulder trauma. The bone typically breaks at the junction of its lateral one-third and medial two-thirds, which is its weakest point (where the curves change direction). When fractured, the medial fragment is pulled upwards by the sternocleidomastoid muscle, and the lateral fragment drops down under the weight of the upper limb.",
    clinicalCorrelation: "Cleidocranial Dysostosis is a rare congenital condition where the clavicles are partially or completely absent. Patients can bring their shoulders forward until they touch in the midline of the chest. This occurs due to defective membranous ossification.",
    surfaceAnatomy: "The clavicle is subcutaneous throughout its entire length. You can easily palpate it on yourself from the sternum to the shoulder tip. The sternoclavicular joint is palpable as a distinct elevation just lateral to the suprasternal notch.",
    tables: [
      {
        title: "Table 1.1: Differences Between Lateral and Medial Ends of Clavicle",
        headers: ["Feature", "Lateral (Acromial) End", "Medial (Sternal) End"],
        rows: [
          ["Shape", "Flattened from above downwards", "Quadrangular and bulbous"],
          ["Articulation", "Acromion process of Scapula", "Manubrium Sterni & 1st Costal Cartilage"],
          ["Joint Formed", "Acromioclavicular Joint (Plane synovial)", "Sternoclavicular Joint (Saddle synovial)"],
          ["Associated Ligaments", "Coracoclavicular & Acromioclavicular", "Costoclavicular & Interclavicular"]
        ]
      }
    ],
    flowchartSteps: {
      title: "Clavicular Fracture Pathomechanics",
      steps: [
        { label: "Fall on Outstretched Hand (FOOSH)", desc: "Mechanical forces are transmitted upwards from the hand to the radius, ulna, humerus, and scapula." },
        { label: "Transmission to Clavicle", desc: "The force passes through the coracoclavicular ligament and enters the clavicle bone." },
        { label: "Failure at Weakest Point", desc: "The bone breaks at the junction of the lateral 1/3 and medial 2/3 (where the curves bend opposite ways)." },
        { label: "Deformity & Displacement", desc: "Sternocleidomastoid pulls the medial piece up; gravity pulls the lateral piece down." }
      ]
    },
    mnemonics: [
      {
        phrase: "Only Horizontal Long Bone",
        meaning: "O-H-L-B: Only Horizontal Long Bone without a medullary cavity.",
        concept: "Atypical characteristics of the clavicle."
      }
    ],
    frequentlyConfused: [
      {
        conceptA: "Conoid Ligament",
        conceptB: "Trapezoid Ligament",
        explanation: "Both form parts of the Coracoclavicular ligament. However, the conoid ligament attaches to the conoid tubercle on the posterior-inferior margin, whereas the trapezoid ligament attaches to the trapezoid line located more anteriorly and laterally."
      }
    ],
    vivaQuestions: [
      { q: "Why is the clavicle considered an atypical long bone?", a: "It lies horizontally, ossifies in membrane (not cartilage), has no medullary cavity, and is subcutaneous throughout." },
      { q: "Where is the weakest point of the clavicle?", a: "At the junction of the medial two-thirds and lateral one-third, where the bone curves change direction." },
      { q: "Which muscle pulls the medial fragment upwards during a fracture?", a: "The Sternocleidomastoid muscle." },
      { q: "Which ligament prevents the medial displacement of the shoulder?", a: "The coracoclavicular ligament, which transmits forces from the clavicle to the scapula." },
      { q: "What structure passes below the middle third of the clavicle?", a: "The subclavian vessels and the cords of the brachial plexus." },
      { q: "Which nerve can be damaged in clavicular fractures?", a: "The suprascapular nerve or supraclavicular nerves." },
      { q: "What is Cleidocranial Dysostosis?", a: "A genetic disorder characterized by hypoplasia or complete absence of clavicles, allowing shoulders to touch in front." },
      { q: "From which embryological layer does the clavicle develop?", a: "Mesoderm, through intramembranous ossification." },
      { q: "Which muscle is attached to the upper surface of the medial third of the clavicle?", a: "The sternocleidomastoid muscle (clavicular head)." },
      { q: "What is the function of the subclavius muscle?", a: "It steadies the clavicle during movements of the shoulder girdle and acts as a cushion for the underlying subclavian vessels." }
    ],
    universityQuestions: {
      shortNotes: ["Peculiarities of Clavicle Bone", "Anatomical Features of Lateral 1/3 of Clavicle", "Cleidocranial Dysostosis"],
      longQuestions: ["Describe the clavicle bone under headings of: Side Determination, Peculiarities, Muscular attachments, and Applied Anatomy."],
      veryShortQuestions: ["Name the only horizontal long bone.", "Mention the weakest point of the clavicle.", "Name the ligament attaching to the conoid tubercle."]
    },
    highYieldPoints: [
      "First bone to begin ossifying in membrane.",
      "The only long bone that lies horizontally.",
      "Lacks a true medullary (marrow) cavity.",
      "Occasionally pierced by branches of the supraclavicular nerve.",
      "Transmits forces from the upper limb to the axial skeleton."
    ],
    oneMinuteRevision: [
      "Clavicle = Collar bone. S-shaped doubly curved bone.",
      "Medial 2/3 is convex forward, lateral 1/3 is concave forward.",
      "Medial end is quadrangular (sternal joint), lateral end is flat (acromion joint).",
      "Weakest point = junction of medial 2/3 and lateral 1/3. Commonest site of fractures.",
      "Atypical: No medullary cavity, ossifies in membrane, horizontal layout."
    ],
    relatedTopics: [
      { title: "Scapula Bone", slug: "scapula" },
      { title: "Shoulder Joint", slug: "shoulder-joint" },
      { title: "Subclavian Artery", slug: "subclavian-artery" }
    ],
    references: [
      "BD Chaurasia's Human Anatomy, Volume 1: Upper Limb & Thorax, 9th Edition.",
      "Gray's Anatomy for Students, 4th Edition.",
      "NCH CBDC Syllabus for First BHMS - Anatomy Competency AN1.1."
    ],
    visualPlans: [
      { type: "Hero Illustration", title: "Superior and Inferior Views of Clavicle", description: "Color-coded schematic highlighting bony markings (conoid tubercle, trapezoid line) and muscular origins/insertions." },
      { type: "Clinical Illustration", title: "Clavicle Fracture & Muscle Pulls", description: "Line diagram showing the typical fracture site and arrows depicting the upward pull of sternocleidomastoid and downward pull of gravity/pectoralis major." }
    ]
  },
  humerus: {
    id: "humerus",
    title: "Humerus (Arm Bone)",
    bodyRegion: "Upper Arm / Upper Extremity",
    subject: "Anatomy (Paper I)",
    studyTime: "30 mins",
    difficulty: "Medium",
    importance: "⭐ Frequently Asked",
    nchCompetency: "AN1.2 - Describe features, attachments, and clinical correlations of humerus",
    learningObjectives: [
      "Determine the side of a given humerus bone.",
      "Explain the parts and landmarks of the humerus (head, anatomical neck, surgical neck, tubercles, condyles, epicondyles).",
      "Describe the muscles attaching to the intertubercular sulcus.",
      "Correlate the relation of Axillary, Radial, and Ulnar nerves with the humerus."
    ],
    quickFacts: {
      definition: "The humerus is the longest and largest bone of the upper limb, forming the skeleton of the arm.",
      location: "Extends from the shoulder joint to the elbow joint.",
      function: "Provides structural support for the arm and serves as an attachment site for muscles controlling the shoulder and elbow.",
      clinicalImportance: "The surgical neck is related to the axillary nerve, the radial groove to the radial nerve, and the medial epicondyle to the ulnar nerve. Damage to these sites leads to specific palsies.",
      oneLineRevision: "The humerus articulates with the scapula glenoid cavity proximally, and the radius and ulna distally."
    },
    introduction: "Let's study the humerus, the major bone of your upper arm! This bone is highly favoured by examiners for both osteology viva and theory exams. It has three highly critical nerve relations that you must memorize for your clinical years. Let's make it super simple.",
    definitionText: "The humerus is a typical long bone consisting of an upper end, a shaft, and a lower end. It articulates with the glenoid cavity of the scapula to form the shoulder joint, and with the head of the radius and trochlear notch of the ulna to form the elbow joint.",
    grossAnatomy: {
      parts: [
        "Upper End: Features a rounded Head (forming 1/3 of a sphere), Anatomical Neck, Greater and Lesser Tubercles, and the Surgical Neck.",
        "Shaft: Rounded proximally and triangular distally. Features a deltoid tuberosity laterally and a radial (spiral) groove posteriorly.",
        "Lower End: Flattened from before backwards. Features non-articular parts (medial and lateral epicondyles, supracondylar ridges, olecranon fossa, coronoid fossa, radial fossa) and articular parts (capitulum and trochlea)."
      ],
      relations: [
        "Surgical Neck: Related closely to the Axillary Nerve and Posterior Circumflex Humeral vessels.",
        "Radial Groove (Spiral Groove): Contains the Radial Nerve and Profunda Brachii vessels.",
        "Medial Epicondyle (Posteriorly): Relates to the Ulnar Nerve (often called the 'funny bone' nerve because bumping it causes tingling)."
      ],
      anatomicalFeatures: [
        "Intertubercular Sulcus (Bicipital Groove): A deep groove separating the greater and lesser tubercles. It lodges the long head of the biceps brachii tendon.",
        "Capitulum: A rounded, marble-like lateral articular projection that articulates with the head of the radius.",
        "Trochlea: A pulley-shaped medial articular projection that articulates with the trochlear notch of the ulna."
      ]
    },
    bloodSupply: "The upper end is supplied by branches of the anterior and posterior circumflex humeral arteries. The shaft is supplied by the nutrient artery of the humerus (arising from the brachial artery). The lower end is supplied by anastomoses around the elbow joint.",
    nerveSupply: "Innervated by branches from the axillary, radial, and musculocutaneous nerves, depending on muscle attachments and periosteal zones.",
    development: "Ossifies from one primary center for the shaft (appearing in the 8th week of intrauterine life) and several secondary centers for the head, tubercles, and epicondyles.",
    appliedAnatomy: "Fractures of the humerus are clinically categorized based on nerve injuries: \n1. Fracture at the Surgical Neck injures the Axillary Nerve, leading to paralysis of the deltoid muscle (inability to abduct arm from 15 to 90 degrees) and sensory loss over the lateral arm (Regimental Badge sign).\n2. Fracture of the Shaft (middle 1/3) injures the Radial Nerve in the spiral groove, leading to Wrist Drop due to paralysis of all extensor muscles of the wrist and fingers.\n3. Fracture at or posterior to the Medial Epicondyle injures the Ulnar Nerve, causing 'Claw Hand' (Main en griffe) due to paralysis of most intrinsic hand muscles.",
    clinicalCorrelation: "Supracondylar fracture of the humerus is very common in children. It typically results from a fall on an outstretched hand with the elbow hyperextended. The distal fragment is pushed backwards. This can compress the brachial artery, leading to Volkmann's Ischemic Contracture (claw-like flexion of fingers due to ischemic necrosis of forearm flexor muscles).",
    surfaceAnatomy: "The head can be felt deep in the axilla when the arm is abducted. The medial and lateral epicondyles are subcutaneous and easily palpable at the sides of the elbow. In an extended elbow, the medial epicondyle, lateral epicondyle, and the tip of the olecranon process lie in a straight horizontal line.",
    tables: [
      {
        title: "Table 1.2: Humerus Nerve Relations & Clinical Deficits",
        headers: ["Bone Region", "Closely Related Nerve", "Common Fracture Type", "Primary Clinical Deficit"],
        rows: [
          ["Surgical Neck", "Axillary Nerve", "Surgical Neck Fracture", "Deltoid paralysis (Inability to abduct arm 15°-90°), Regimental Badge sensory loss"],
          ["Radial Groove", "Radial Nerve", "Shaft (Mid-shaft) Fracture", "Wrist Drop (loss of hand/finger extension), sensory loss on dorsum of hand"],
          ["Medial Epicondyle", "Ulnar Nerve", "Medial Epicondyle / Supracondylar", "Claw Hand (hyperextension of MCP and flexion of IP joints in fingers 4-5)"]
        ]
      }
    ],
    flowchartSteps: {
      title: "Pathogenesis of Volkmann's Ischemic Contracture",
      steps: [
        { label: "Supracondylar Fracture of Humerus", desc: "Common childhood injury from elbow hyperextension." },
        { label: "Displacement of Distal Fragment", desc: "The broken lower fragment shifts posteriorly." },
        { label: "Compression of Brachial Artery", desc: "The main blood supply to the forearm is pinched or spasmed." },
        { label: "Ischemic Necrosis of Forearm Flexors", desc: "Muscle tissues starve of oxygen and die within 4-6 hours." },
        { label: "Fibrosis & Shortening of Flexor Digitorum", desc: "Healthy muscle is replaced by stiff scar tissue, pulling fingers into permanent claw flexion." }
      ]
    },
    mnemonics: [
      {
        phrase: "Lady Between Two Majors",
        meaning: "L-B-T-M: 'Lady' = Latissimus dorsi (attached to the floor of bicipital groove). 'Two Majors' = Pectoralis major (lateral lip) and Teres major (medial lip).",
        concept: "Muscles attached to the intertubercular (bicipital) groove."
      }
    ],
    frequentlyConfused: [
      {
        conceptA: "Anatomical Neck",
        conceptB: "Surgical Neck",
        explanation: "The anatomical neck is an oblique groove separating the head from the tubercles, representing the epiphyseal plate line. The surgical neck is a short, narrow constriction below the tubercles that is a frequent site of fracture and is related to the axillary nerve."
      }
    ],
    vivaQuestions: [
      { q: "Which nerve is endangered in a fracture of the mid-shaft of the humerus?", a: "The Radial Nerve." },
      { q: "What is the 'Lady between two majors' mnemonic?", a: "It describes the insertions in the bicipital groove: Latissimus dorsi in the floor, Pectoralis major on the lateral lip, and Teres major on the medial lip." },
      { q: "What is the clinical sign of axillary nerve injury?", a: "Paralysis of the deltoid (cannot abduct arm) and sensory loss over the lower half of the deltoid (Regimental Badge sign)." },
      { q: "What is the straight line relationship at the elbow?", a: "In an extended elbow, the medial epicondyle, lateral epicondyle, and olecranon tip lie in a straight horizontal line. In a flexed elbow, they form an equilateral triangle." },
      { q: "Why is a supracondylar fracture of the humerus a surgical emergency?", a: "It can injure the brachial artery or median nerve, leading to Volkmann's ischemic contracture." },
      { q: "What is Capitulum?", a: "A rounded articular lateral projection on the distal humerus that articulates with the head of the radius." },
      { q: "Where does the ulnar nerve lie in relation to the humerus?", a: "In a groove on the posterior aspect of the medial epicondyle." },
      { q: "What is the direction of the nutrient foramen of the humerus?", a: "Directed downwards (away from the growing end; 'To the elbow I go, from the knee I flee')." },
      { q: "Which muscle is attached to the deltoid tuberosity?", a: "The Deltoid muscle." },
      { q: "Name the fossae present on the anterior lower end of the humerus.", a: "Coronoid fossa (medial) and Radial fossa (lateral)." }
    ],
    universityQuestions: {
      shortNotes: ["Bicipital Groove of Humerus", "Nerve Relations of Humerus", "Supracondylar Fracture of Humerus"],
      longQuestions: ["Describe the humerus bone under: Side determination, Features of Upper End, Features of Lower End, and Nerve injuries associated with it."],
      veryShortQuestions: ["What nerve is injured in mid-shaft humerus fractures?", "Where is the surgical neck located?", "What articulates with the trochlea?"]
    },
    highYieldPoints: [
      "The surgical neck is a major site of fracture, especially in elderly patients.",
      "Median nerve and brachial artery are vulnerable in supracondylar fractures.",
      "The deltoid muscle inserts on the lateral V-shaped deltoid tuberosity.",
      "The nutrient artery enters the shaft through the anteromedial surface.",
      "Radial nerve injury in the spiral groove causes paralysis of wrist extensors, leading to Wrist Drop."
    ],
    oneMinuteRevision: [
      "Humerus = Arm bone. Head fits into scapula glenoid cavity.",
      "Upper end has Greater/Lesser tubercles and Bicipital groove (Pect. major, Lat. dorsi, Teres major attach).",
      "Surgical neck related to Axillary nerve; Mid-shaft related to Radial nerve; Medial epicondyle related to Ulnar nerve.",
      "Lower end has capitulum (articulates with radius) and trochlea (articulates with ulna).",
      "Supracondylar fracture in kids can cause Volkmann's Ischemic Contracture."
    ],
    relatedTopics: [
      { title: "Radius Bone", slug: "radius" },
      { title: "Ulna Bone", slug: "ulna" },
      { title: "Elbow Joint", slug: "elbow-joint" }
    ],
    references: [
      "BD Chaurasia's Human Anatomy, Volume 1: Upper Limb & Thorax, 9th Edition.",
      "Gray's Anatomy for Students, 4th Edition.",
      "NCH CBDC Syllabus for First BHMS - Anatomy Competency AN1.2."
    ],
    visualPlans: [
      { type: "Hero Illustration", title: "Anatomy of the Humerus (Anterior & Posterior)", description: "Color-coded views highlighting the head, surgical neck, tubercles, bicipital groove, epicondyles, capitulum, and trochlea." },
      { type: "Flowchart", title: "Nerve Injuries of the Humerus", description: "Visual map showing how fractures at three different levels of the humerus map to Axillary, Radial, and Ulnar nerve damage." }
    ]
  },
  "mammary-gland": {
    id: "mammary-gland",
    title: "Mammary Gland (Breast)",
    bodyRegion: "Pectoral Region / Upper Extremity",
    subject: "Anatomy (Paper I)",
    studyTime: "35 mins",
    difficulty: "Hard",
    importance: "⭐ Frequently Asked",
    nchCompetency: "AN2.1 - Describe the location, relations, structure, blood supply, lymphatic drainage and clinical anatomy of mammary gland",
    learningObjectives: [
      "Describe the precise location and quadrant division of the breast.",
      "Explain the relations (deep and superficial) of the mammary gland.",
      "Detail the internal structure of the breast (stroma, parenchyma).",
      "Master the lymphatic drainage of the breast (essential for breast cancer metastasis).",
      "Apply anatomical knowledge to understand Peau d'orange, Cooper's ligaments, and mammography."
    ],
    quickFacts: {
      definition: "The mammary gland is a modified sweat gland located in the superficial fascia of the pectoral region.",
      location: "Extends vertically from the 2nd to the 6th rib, and horizontally from the lateral border of the sternum to the mid-axillary line.",
      function: "Synthesizes, secretes, and ejects milk for lactation.",
      clinicalImportance: "Highly prone to carcinomas (breast cancer). Cancer cells easily spread through lymphatic pathways, primarily to axillary lymph nodes.",
      oneLineRevision: "Mammary gland is a modified apocrine sweat gland whose lymphatics drain 75% into the axillary lymph nodes."
    },
    introduction: "Now we arrive at one of the most high-yielding essays (Long Answer Questions) in the First BHMS Anatomy exam! The mammary gland (breast) is a clinical masterpiece. You can be 100% sure that either its lymphatic drainage or a full question on the breast will appear in your university theory paper. Let's make sure you get 10/10 marks on this.",
    definitionText: "The mammary gland is an accessory organ of the female reproductive system. It is a modified apocrine sweat gland situated in the superficial fascia of the anterior chest wall. It is present in both sexes, but is rudimentary in males and well-developed in females after puberty.",
    grossAnatomy: {
      parts: [
        "Parenchyma (Glandular Tissue): Consists of 15 to 20 lobes arranged radially. Each lobe is divided into lobules containing alveoli, draining into a lactiferous duct.",
        "Stroma (Supporting Frame): Divided into Fatty stroma (forms most of the bulk) and Fibrous stroma (forms Suspensory Ligaments of Cooper, which anchor the gland to the skin and pectoral fascia).",
        "Nipple & Areola: The nipple is a conical projection in the 4th intercostal space. The areola is a circular patch of pigmented skin surrounding the nipple, containing Montgomery's tubercles (modified sebaceous glands)."
      ],
      relations: [
        "Superficial: Covered by skin, subcutaneous fat.",
        "Deep: Lies on the deep pectoral fascia covering the Pectoralis Major, Serratus Anterior, and External Oblique muscles.",
        "Retromammary Space: A loose areolar tissue space between the breast and pectoral fascia. It allows free movement of the breast over the chest wall."
      ],
      anatomicalFeatures: [
        "Axillary Tail of Spence: A small portion of the breast's upper outer quadrant that pierces the deep fascia of the axilla through the opening of Langer.",
        "Lactiferous Sinus: A dilated spindle-shaped reservoir in each lactiferous duct just deep to the areola.",
        "Suspensory Ligaments of Cooper: Fibrous bands running from the skin to the deep pectoral fascia, maintaining the breast's erect posture."
      ]
    },
    bloodSupply: "Highly vascular. Supplied by: \n1. Internal Thoracic Artery (perforating branches).\n2. Lateral Thoracic Artery and Superior Thoracic Artery (from the axillary artery).\n3. Posterior Intercostal Arteries (lateral branches).",
    nerveSupply: "Innervated by the anterior and lateral cutaneous branches of the 4th to 6th intercostal nerves. They carry both sensory fibers and sympathetic vasomotor fibers.",
    lymphaticDrainage: "CRITICAL SECTION! Lymph drainage is divided into: \n1. Lymph Nodes: Axillary Nodes (75% of drainage, divided into Anterior, Posterior, Lateral, Central, and Apical groups), Internal Mammary Nodes (20% of drainage, located along the sternum), and Posterior Intercostal Nodes (5%).\n2. Lymph Vessels: Superficial lymphatics drain the skin (except nipple and areola). Deep lymphatics drain the parenchyma, nipple, and areola. The subareolar plexus of Sappey is a key network beneath the nipple.",
    appliedAnatomy: "In breast cancer (Carcinoma of the breast): \n1. Invasion of Suspensory Ligaments of Cooper causes them to contract, leading to dimpling of the skin over the tumor.\n2. Obstruction of superficial lymph drainage by cancer cells leads to localized lymphedema. The skin becomes puffy, thick, and dimpled around hair follicles, resembling an orange peel. This is clinically called Peau d'orange.\n3. Retromammary space invasion binds the tumor to the pectoralis major, making the breast fixed and immobile.",
    clinicalCorrelation: "Mammary abscesses are common during early lactation due to bacterial entry through cracked nipples. They are treated with radial incisions to avoid cutting across the radially arranged lactiferous ducts, preventing milk fistulas.",
    surfaceAnatomy: "The breast extends from the 2nd to the 6th ribs in the midclavicular line. The nipple is situated in the 4th intercostal space, roughly 10 cm from the midline.",
    tables: [
      {
        title: "Table 1.3: Lymphatic Groups Draining the Breast",
        headers: ["Lymph Node Group", "Approx. Contribution", "Location", "Clinical Significance"],
        rows: [
          ["Axillary Nodes (Anterior/Pectoral, etc.)", "75%", "Along the lower border of pectoralis minor, axillary vessels", "First-line filter for breast cancer; anterior group is most commonly involved first."],
          ["Internal Mammary (Parasternal) Nodes", "20%", "Along the internal thoracic artery beside the sternum", "Drains the medial quadrants; cancer here can spread to the opposite breast."],
          ["Posterior Intercostal Nodes", "5%", "Along the heads of ribs posteriorly", "Can guide cancer cells directly into the vertebral venous plexus, causing bone metastasis."]
        ]
      }
    ],
    flowchartSteps: {
      title: "Lymphatic Drainage Pathway of Breast Parenchyma",
      steps: [
        { label: "Alveoli & Lobules of Mammary Gland", desc: "Lymph originates in the glandular parenchyma." },
        { label: "Subareolar Plexus of Sappey", desc: "Main collecting network located deep to the nipple and areola." },
        { label: "Anterior (Pectoral) Axillary Nodes", desc: "The primary node group receiving 75% of breast lymph." },
        { label: "Central & Apical Axillary Lymph Nodes", desc: "Lymph ascends through the axilla." },
        { label: "Subclavian Lymph Trunk", desc: "The final common pathway draining into the thoracic duct (left) or right lymphatic duct." }
      ]
    },
    mnemonics: [
      {
        phrase: "Breast Lymph Nodes Are Awesome",
        meaning: "B-L-N-A: Breast Lymphatics mainly go to Axillary nodes (Anterior, Posterior, Lateral, Central, Apical).",
        concept: "The principal lymph node groups draining the breast."
      }
    ],
    frequentlyConfused: [
      {
        conceptA: "Superficial Lymphatics",
        conceptB: "Deep Lymphatics",
        explanation: "Superficial lymphatics drain the skin of the breast (excluding the nipple and areola) and do not pass through axillary nodes directly. Deep lymphatics drain the glandular parenchyma, nipple, and areola, and empty primarily into the subareolar plexus of Sappey and then into the axillary nodes."
      }
    ],
    vivaQuestions: [
      { q: "What is the embryological origin of the mammary gland?", a: "It is a modified apocrine sweat gland of ectodermal origin, developing from the milk ridge (mammary line)." },
      { q: "What causes 'Peau d'orange' in breast cancer?", a: "Infiltration and obstruction of superficial lymphatics by cancer cells, causing edema of the skin while hair follicles remain tied down." },
      { q: "Why are incisions on the breast made radially?", a: "To prevent transecting the lactiferous ducts, which run radially from the lobes to the nipple." },
      { q: "What are Montgomery's tubercles?", a: "Modified sebaceous glands in the areola that enlarge during pregnancy and secrete an oily fluid to lubricate the nipple." },
      { q: "What is the Axillary Tail of Spence?", a: "The extension of the upper outer quadrant of the breast that pierces the deep fascia of the axilla." },
      { q: "Which ligament holds the breast upright?", a: "The suspensory ligaments of Cooper." },
      { q: "What percentage of breast lymph drains into the axillary lymph nodes?", a: "Approximately 75%." },
      { q: "Where does the medial part of the breast drain?", a: "Into the internal mammary (parasternal) lymph nodes." },
      { q: "What is the Retromammary Space?", a: "A layer of loose areolar tissue behind the breast that allows it to glide smoothly over the pectoralis major." },
      { q: "How does breast cancer spread to the brain or spine?", a: "Through the posterior intercostal lymphatics, which communicate with the vertebral venous plexus (Batson's plexus)." }
    ],
    universityQuestions: {
      shortNotes: ["Lymphatic Drainage of Mammary Gland", "Applied Anatomy of Breast Cancer", "Ligaments of Cooper", "Axillary Tail of Spence"],
      longQuestions: ["Describe the Mammary Gland under the following headings: Location and Relations, Internal Structure, Lymphatic Drainage (with a neat labelled diagram), and Clinical Anatomy."],
      veryShortQuestions: ["What gland type is the breast?", "Which quadrant is most prone to cancer?", "Name the space behind the breast."]
    },
    highYieldPoints: [
      "Carcinoma is most common in the upper outer quadrant (45% of cases).",
      "Cooper's ligaments invasion causes dimpling of the skin (retraction).",
      "Batson's vertebral venous plexus is valveless, explaining bone metastasis from the breast.",
      "The milk line of Pallis extends from the axilla to the groin.",
      "Internal mammary nodes can cross-drain, causing bilateral breast cancer spread."
    ],
    oneMinuteRevision: [
      "Mammary gland: Modified sweat gland in superficial fascia.",
      "Extends 2nd to 6th ribs vertically, sternal border to mid-axillary line horizontally.",
      "Lobes (15-20) -> Lactiferous ducts -> Lactiferous sinuses -> Nipple.",
      "Lymph: 75% to Axillary nodes, 20% to Internal Mammary nodes, 5% to Posterior Intercostal.",
      "Cancer signs: Peau d'orange (lymph block), skin dimpling (Cooper's ligament pull), fixation (retromammary space invasion)."
    ],
    relatedTopics: [
      { title: "Axilla and its Contents", slug: "axilla" },
      { title: "Pectoralis Major Muscle", slug: "pectoralis-major" },
      { title: "Intercostal Nerves", slug: "intercostal-nerves" }
    ],
    references: [
      "BD Chaurasia's Human Anatomy, Volume 1: Upper Limb & Thorax, 9th Edition.",
      "Gray's Anatomy, 42nd Edition.",
      "NCH CBDC Syllabus for First BHMS - Anatomy Competency AN2.1."
    ],
    visualPlans: [
      { type: "Labelled Diagram", title: "Lymphatic Drainage of the Breast", description: "Schematic showing the breast quadrants, the subareolar plexus, and pathways leading to the pectoral, central, apical, parasternal, and intercurrent nodes." },
      { type: "Cross Section", title: "Sagittal Section of the Mammary Gland", description: "Shows the retromammary space, lobes, lactiferous ducts, fatty stroma, and the suspensory ligaments of Cooper." }
    ]
  },
  "brachial-plexus": {
    id: "brachial-plexus",
    title: "Brachial Plexus",
    bodyRegion: "Axilla / Neck / Upper Extremity",
    subject: "Anatomy (Paper I)",
    studyTime: "35 mins",
    difficulty: "Hard",
    importance: "⭐ Frequently Asked",
    nchCompetency: "AN3.1 - Describe the formation, branches, and clinical anatomy of brachial plexus",
    learningObjectives: [
      "Explain the formation of the brachial plexus (Roots, Trunks, Divisions, Cords, Branches).",
      "List the branches arising from roots, trunks, and cords.",
      "Describe Erb's Point, its paralysis, and the resulting 'Policeman's tip' hand deformity.",
      "Explain Klumpke's Paralysis, its causes, and 'Claw Hand' presentation."
    ],
    quickFacts: {
      definition: "The brachial plexus is a network of nerves formed by the anterior rami of lower four cervical (C5-C8) and first thoracic (T1) spinal nerves, supplying the upper limb.",
      location: "Extends from the posterior triangle of the neck down into the axilla.",
      function: "Provides motor and sensory innervation to the shoulder, arm, forearm, and hand.",
      clinicalImportance: "Highly vulnerable to birth injuries, motor vehicle accidents, and compression, leading to Erb's Palsy or Klumpke's Palsy.",
      oneLineRevision: "Brachial Plexus is structured as: Roots (5) -> Trunks (3) -> Divisions (6) -> Cords (3) -> Branches."
    },
    introduction: "Welcome to one of the most fundamental topics in neuroanatomy! The brachial plexus can seem incredibly complicated with all its criss-crossing nerve fibers, but once you learn its structured layout (Roots, Trunks, Divisions, Cords, Branches), it becomes as easy as drawing a train map. Let's master it together.",
    definitionText: "The brachial plexus is a somatic nerve plexus that provides sensory and motor innervation to the upper extremity. It is formed by the union of ventral rami of spinal nerves C5, C6, C7, C8, and T1.",
    grossAnatomy: {
      parts: [
        "Roots: Ventral rami of C5 to T1. May receive contributions from C4 (pre-fixed) or T2 (post-fixed).",
        "Trunks: Roots C5-C6 join to form the Upper Trunk. Root C7 continues as the Middle Trunk. Roots C8-T1 join to form the Lower Trunk.",
        "Divisions: Each trunk splits into Anterior (flexor) and Posterior (extensor) divisions, making 6 divisions in total.",
        "Cords: Anterior divisions of Upper and Middle trunks form the Lateral Cord. Anterior division of Lower trunk forms the Medial Cord. Posterior divisions of all three trunks join to form the Posterior Cord.",
        "Branches: Terminates in major peripheral nerves (Musculocutaneous, Axillary, Radial, Median, Ulnar nerves)."
      ],
      relations: [
        "Roots: Lie between the scalenus anterior and scalenus medius muscles in the neck.",
        "Trunks: Cross the posterior triangle of the neck.",
        "Cords: Lie in the axilla, arranged around the second part of the axillary artery according to their names (Lateral, Medial, and Posterior)."
      ],
      anatomicalFeatures: [
        "Erb's Point: A point on the upper trunk where 6 nerves meet: C5 root, C6 root, anterior division of upper trunk, posterior division of upper trunk, suprascapular nerve, and nerve to subclavius.",
        "Prefixed Plexus: When the C4 root makes a significant contribution, and T1 is reduced.",
        "Postfixed Plexus: When the T2 root makes a significant contribution, and C5 is reduced."
      ]
    },
    bloodSupply: "Supplied by branches of the subclavian, suprascapular, transverse cervical, and axillary arteries.",
    nerveSupply: "This is a nerve plexus itself, carrying fibers from spinal cord segments C5 to T1.",
    appliedAnatomy: "There are two major clinical syndromes associated with brachial plexus injury: \n1. Erb's Paralysis (Upper Trunk Injury): Caused by excessive increase in the angle between the head and shoulder (e.g., during a difficult birth, or falling on the shoulder). Damage occurs at Erb's Point (C5-C6). Muscles paralyzed include the biceps, brachialis, deltoid, supraspinatus, infraspinatus, and supinator. The limb hangs by the side, medially rotated and pronated (called 'Policeman's tip hand' or 'Porter's tip hand').\n2. Klumpke's Paralysis (Lower Trunk Injury): Caused by hyperabduction of the arm (e.g., clutching a tree branch while falling, or birth injury during breech delivery). Damage occurs at root T1. Muscles paralyzed include all intrinsic hand muscles (interossei, lumbricals), leading to a complete 'Claw Hand' deformity accompanied by sensory loss along the medial border of the forearm and hand.",
    clinicalCorrelation: "Horner's Syndrome can accompany Klumpke's paralysis. Because the T1 root carries sympathetic fibers to the head and neck, its injury can cause Ptosis (drooping eyelid), Miosis (constricted pupil), Anhidrosis (loss of sweating on one side of face), and Enophthalmos (sunken eyeball).",
    surfaceAnatomy: "The trunks of the brachial plexus can be rolled under your fingers in the supraclavicular fossa (posterior triangle of the neck) just posterior to the lateral border of the sternocleidomastoid muscle.",
    tables: [
      {
        title: "Table 1.4: Cords and Major Branches of the Brachial Plexus",
        headers: ["Cord", "Spinal Segments", "Branches", "Primary Target Area"],
        rows: [
          ["Lateral Cord", "C5, C6, C7", "Lateral pectoral, Musculocutaneous, Lateral root of Median", "Pectoral muscles, anterior arm compartment, lateral forearm skin."],
          ["Medial Cord", "C8, T1", "Medial pectoral, Medial cutaneous of arm/forearm, Medial root of Median, Ulnar nerve", "Pectoral muscles, medial arm/forearm skin, hand intrinsic muscles, flexor carpi ulnaris."],
          ["Posterior Cord", "C5, C6, C7, C8, T1", "Radial nerve, Axillary nerve, Upper/Lower subscapular, Thoracodorsal", "Deltoid, teres minor, latissimus dorsi, posterior arm and forearm extensor muscles."]
        ]
      }
    ],
    flowchartSteps: {
      title: "Structural Layout of the Brachial Plexus",
      steps: [
        { label: "Roots (5)", desc: "Ventral rami of C5, C6, C7, C8, T1." },
        { label: "Trunks (3)", desc: "Upper (C5-C6), Middle (C7), Lower (C8-T1) trunks." },
        { label: "Divisions (6)", desc: "Each trunk splits into an Anterior and a Posterior division." },
        { label: "Cords (3)", desc: "Lateral, Medial, and Posterior cords, named by relation to axillary artery." },
        { label: "Branches", desc: "Terminal peripheral nerves supplying the entire upper limb." }
      ]
    },
    mnemonics: [
      {
        phrase: "Remember To Drink Cold Beer",
        meaning: "R-T-D-C-B: Roots, Trunks, Divisions, Cords, Branches.",
        concept: "The structural subdivisions of the brachial plexus from medial to lateral."
      }
    ],
    frequentlyConfused: [
      {
        conceptA: "Erb's Palsy",
        conceptB: "Klumpke's Palsy",
        explanation: "Erb's palsy affects the upper trunk (C5-C6) and causes a 'porter's tip' position (adducted, medially rotated arm). Klumpke's palsy affects the lower trunk (C8-T1) and causes a 'claw hand' deformity with zero shoulder involvement."
      }
    ],
    vivaQuestions: [
      { q: "What roots form the brachial plexus?", a: "Anterior primary rami of C5, C6, C7, C8, and T1." },
      { q: "Where does the posterior cord get its name?", a: "It lies posterior to the second part of the axillary artery." },
      { q: "Name the six nerves that meet at Erb's Point.", a: "C5 root, C6 root, Suprascapular nerve, Nerve to subclavius, Anterior division of upper trunk, and Posterior division of upper trunk." },
      { q: "What is the clinical deformity in Erb's Palsy?", a: "Policeman's tip hand (or porter's tip hand): arm hangs by the side, adducted, medially rotated, and pronated." },
      { q: "Which nerve root is injured in Klumpke's Paralysis?", a: "T1 nerve root." },
      { q: "What is the claw hand deformity?", a: "Hyperextension at the metacarpophalangeal (MCP) joints and flexion at the interphalangeal (IP) joints, caused by paralysis of lumbrical muscles." },
      { q: "Why does Horner's syndrome occur in Klumpke's paralysis?", a: "The T1 root contains sympathetic fibers that ascend to the superior cervical ganglion supplying the eye and face." },
      { q: "Name two branches that arise directly from the roots.", a: "Dorsal scapular nerve (C5) and Long thoracic nerve of Bell (C5, C6, C7)." },
      { q: "What muscle does the long thoracic nerve supply?", a: "Serratus Anterior ('boxer's muscle'). Injury causes 'winging of scapula'." },
      { q: "Which cord gives rise to the ulnar nerve?", a: "The Medial Cord." }
    ],
    universityQuestions: {
      shortNotes: ["Erb's Point & Erb's Paralysis", "Klumpke's Paralysis", "Cords of Brachial Plexus", "Winging of Scapula"],
      longQuestions: ["Describe the Brachial Plexus under the following headings: Formation, Cords and branches (with a neat schematic diagram), and Clinical Anatomy of upper trunk and lower trunk injuries."],
      veryShortQuestions: ["What spinal nerves form the brachial plexus?", "Which nerve supplies the serratus anterior?", "What is Porter's tip hand?"]
    },
    highYieldPoints: [
      "Long thoracic nerve (Nerve of Bell) injury causes winging of the scapula.",
      "The medial cord of the plexus is related medially to the 2nd part of the axillary artery.",
      "Suprascapular nerve arises directly from the upper trunk, not a cord.",
      "Musculocutaneous nerve arises from the lateral cord (C5-C7).",
      "Erb's palsy leads to loss of forearm supination and arm abduction."
    ],
    oneMinuteRevision: [
      "Brachial Plexus: C5-T1. Five parts: Roots, Trunks, Divisions, Cords, Branches.",
      "Upper trunk (C5-C6), Middle (C7), Lower (C8-T1).",
      "Three cords named by relation to axillary artery: Lateral, Medial, Posterior.",
      "Erb's Palsy = Upper trunk injury. SCM pulls up, arm adducts, pronates, medially rotates ('porter's tip').",
      "Klumpke's Palsy = Lower trunk (T1) injury. Intrinsic hand muscles paralyzed -> Claw Hand. Associated with Horner's syndrome."
    ],
    relatedTopics: [
      { title: "Axilla & Axillary Artery", slug: "axilla" },
      { title: "Radial Nerve Course", slug: "radial-nerve" },
      { title: "Median Nerve Course", slug: "median-nerve" }
    ],
    references: [
      "BD Chaurasia's Human Anatomy, Volume 1: Upper Limb & Thorax, 9th Edition.",
      "Gray's Anatomy for Students, 4th Edition.",
      "NCH CBDC Syllabus for First BHMS - Anatomy Competency AN3.1."
    ],
    visualPlans: [
      { type: "Labelled Diagram", title: "Complete Schematic of the Brachial Plexus", description: "Color-coded hand-drawn style block diagram detailing roots, trunks, divisions, cords, and terminal nerves with spinal levels." },
      { type: "Clinical Illustration", title: "Erb's Palsy vs. Klumpke's Deformities", description: "Comparative line art illustrating 'Policeman's tip hand' position and 'Claw Hand' fingers." }
    ]
  }
};

export function getAnatomyModule(id: string): AnatomyModule {
  if (anatomyModules[id]) {
    return anatomyModules[id];
  }
  return generateDynamicModule(id);
}

function generateDynamicModule(id: string): AnatomyModule {
  // Database of fallback high-yield anatomy modules
  const fallbacks: Record<string, Partial<AnatomyModule>> = {
    "abdomen-overview": {
      title: "Introduction & Overview of Abdomen",
      bodyRegion: "Abdomen",
      studyTime: "20 mins",
      difficulty: "Easy",
      importance: "⭐ Concept Based",
      nchCompetency: "AN44.1 - Describe boundaries and 9 regions of abdomen",
      learningObjectives: ["Identify the boundaries of the abdominal cavity", "Describe the 9 regions and 4 quadrants of the abdomen"],
      quickFacts: {
        definition: "The abdomen is the region of the trunk between the diaphragm and the pelvis.",
        location: "Below the thorax, above the pelvis.",
        function: "Houses major digestive and urinary organs.",
        clinicalImportance: "Site of various abdominal surgeries and clinical examinations.",
        oneLineRevision: "Abdomen is divided into 9 regions by two vertical and two horizontal planes."
      },
      introduction: "Welcome to the study of the Abdomen! This region contains the majority of the digestive system and is divided into specific regions for clinical precision.",
      definitionText: "The abdomen is a large body cavity containing most of the viscera. It is bounded superiorly by the diaphragm and inferiorly by the pelvic inlet.",
      grossAnatomy: {
        parts: ["9 Regions: Right/Left Hypochondrium, Epigastrium, Right/Left Lumbar, Umbilical, Right/Left Iliac, Hypogastrium.", "4 Quadrants: Upper Right, Upper Left, Lower Right, Lower Left."],
        relations: ["Superior: Thorax", "Inferior: Pelvis", "Anterior: Anterior Abdominal Wall", "Posterior: Posterior Abdominal Wall"],
        anatomicalFeatures: ["Transpyloric plane", "Subcostal plane", "Intertubercular plane"]
      },
      bloodSupply: "Abdominal Aorta and its branches.",
      nerveSupply: "Lower thoracic and lumbar spinal nerves; autonomic plexuses.",
      appliedAnatomy: "Abdominal palpation, percussion, and auscultation.",
      clinicalCorrelation: "Pain in specific regions relates to specific organ pathologies (e.g., epigastric pain in gastritis).",
      tables: [],
      flowchartSteps: { title: "Abdominal Regions", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["Vishram Singh Textbook of Anatomy Vol II"],
      visualPlans: []
    },
    "abdominal-wall": {
      title: "Anterior Abdominal Wall",
      bodyRegion: "Abdomen",
      studyTime: "45 mins",
      difficulty: "Medium",
      importance: "⭐ High Scoring",
      nchCompetency: "AN44.2 - Describe layers, muscles, and rectus sheath",
      learningObjectives: ["List the layers of the anterior abdominal wall", "Describe the attachments and actions of abdominal muscles", "Explain the formation and contents of the rectus sheath"],
      quickFacts: {
        definition: "The muscular and fascial layers forming the front of the abdominal cavity.",
        location: "Anterior aspect of the abdomen.",
        function: "Protects viscera, increases intra-abdominal pressure, and moves the trunk.",
        clinicalImportance: "Site for surgical incisions (e.g., Laparotomy).",
        oneLineRevision: "Layers: Skin, Fascia (Camper/Scarpa), Muscles (External/Internal Oblique, Transversus), Transversalis Fascia."
      },
      introduction: "The anterior abdominal wall is a multilayered structure that provides protection and mobility to the abdominal contents.",
      definitionText: "The anterior abdominal wall is composed of skin, superficial fascia, muscles, and deep fascia. It is bounded by the rib cage above and the pelvic bones below.",
      grossAnatomy: {
        parts: ["Skin", "Superficial Fascia: Fatty layer (Camper's) and Membranous layer (Scarpa's).", "Muscles: External Oblique, Internal Oblique, Transversus Abdominis, Rectus Abdominis.", "Fascia Transversalis", "Extraperitoneal fat", "Parietal Peritoneum"],
        relations: ["The muscles interlace to provide strength and prevent herniation."],
        anatomicalFeatures: ["Linea Alba", "Linea Semilunaris", "Umbilicus"]
      },
      bloodSupply: "Superior and inferior epigastric arteries; intercostal arteries.",
      nerveSupply: "Lower 6 thoracic nerves (T7-T12) and L1 (iliohypogastric and ilioinguinal nerves).",
      appliedAnatomy: "Incisional hernia, Caput Medusae (in portal hypertension).",
      clinicalCorrelation: "Weakness in the wall leads to various types of hernias.",
      tables: [],
      flowchartSteps: { title: "Layers from Superficial to Deep", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["Vishram Singh Textbook of Anatomy Vol II"],
      visualPlans: []
    },
    "lower-limb-intro": {
      title: "Lower Limb Introduction",
      bodyRegion: "Lower Limb",
      studyTime: "15 mins",
      difficulty: "Easy",
      importance: "⭐ Concept Based",
      nchCompetency: "AN10.1 - Overview of lower limb",
      learningObjectives: ["Understand the functional organization of the lower limb", "Identify major body regions of the lower extremity"],
      quickFacts: {
        definition: "The appendage specialized for locomotion and weight-bearing.",
        location: "Inferior part of the body.",
        function: "Locomotion, stability, and supporting body weight.",
        clinicalImportance: "Essential for understanding gait and orthopedic pathologies.",
        oneLineRevision: "Lower limb consists of hip, thigh, leg, and foot regions."
      },
      introduction: "The lower limb is built for stability and locomotion, contrasting with the upper limb's specialization for mobility and precision.",
      definitionText: "The lower limb is the part of the body extending from the hip to the toes. It is divided into the gluteal region, thigh, leg, and foot.",
      grossAnatomy: {
        parts: ["Gluteal region", "Thigh (femoral region)", "Leg (crural region)", "Foot (pedal region)"],
        relations: ["Connected to the trunk via the pelvic girdle."],
        anatomicalFeatures: ["Great Saphenous Vein", "Sciatic Nerve"]
      },
      bloodSupply: "Femoral artery and its continuations.",
      nerveSupply: "Lumbar and Sacral plexuses.",
      appliedAnatomy: "Gait analysis, varicose veins.",
      clinicalCorrelation: "Weight-bearing joints are prone to osteoarthritis.",
      tables: [],
      flowchartSteps: { title: "Divisions", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["BD Chaurasia Vol II"],
      visualPlans: []
    },
    "femur": {
      title: "Femur (Thigh Bone)",
      bodyRegion: "Lower Limb",
      studyTime: "40 mins",
      difficulty: "Medium",
      importance: "⭐ High Scoring",
      nchCompetency: "AN10.2 - Describe the features of the femur",
      learningObjectives: ["Identify the parts of the femur", "Describe the attachments on the femur", "Explain the clinical importance of the femoral neck"],
      quickFacts: {
        definition: "The longest, heaviest, and strongest bone in the human body.",
        location: "Found within the thigh.",
        function: "Transmits weight from the hip bone to the tibia.",
        clinicalImportance: "Fractures of the neck of the femur are common in the elderly.",
        oneLineRevision: "Femur features a head, neck, two trochanters, a shaft with linea aspera, and two condyles."
      },
      introduction: "The femur is the pillar of the lower limb. Understanding its anatomy is crucial for orthopedics and traumatology.",
      definitionText: "The femur is a typical long bone with an upper end, a shaft, and a lower end. It articulates with the acetabulum of the hip bone and the tibia and patella.",
      grossAnatomy: {
        parts: ["Upper End: Head, Neck, Greater Trochanter, Lesser Trochanter.", "Shaft: Linea aspera on the posterior surface.", "Lower End: Medial Condyle, Lateral Condyle, Intercondylar Fossa."],
        relations: ["Neck of femur is intracapsular of the hip joint."],
        anatomicalFeatures: ["Fovea capitis", "Intertrochanteric line and crest", "Adductor tubercle"]
      },
      bloodSupply: "Nutrient artery from the second perforating artery; retinacular vessels from circumflex femoral arteries.",
      nerveSupply: "Nerve to vastus intermedius (Hilton's rule for knee joint).",
      appliedAnatomy: "Fracture neck of femur (Avascular Necrosis), Trochanteric fracture.",
      clinicalCorrelation: "The angle of inclination (Neck-Shaft angle) is approximately 125 degrees; changes cause Coxa Vara or Coxa Valga.",
      tables: [],
      flowchartSteps: { title: "Parts of Femur", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["BD Chaurasia Vol II"],
      visualPlans: []
    },
    "inguinal-canal": {
      title: "Inguinal Canal & Groin",
      bodyRegion: "Abdomen",
      studyTime: "50 mins",
      difficulty: "Hard",
      importance: "⭐ High Scoring",
      nchCompetency: "AN44.3 - Describe the inguinal canal and hernias",
      learningObjectives: ["Define the boundaries of the inguinal canal", "Describe the contents of the inguinal canal", "Distinguish between direct and indirect inguinal hernias"],
      quickFacts: {
        definition: "An oblique intermuscular passage in the lower part of the anterior abdominal wall.",
        location: "Just above the medial half of the inguinal ligament.",
        function: "Allows passage of the spermatic cord in males and round ligament in females.",
        clinicalImportance: "Site of the most common abdominal wall hernias.",
        oneLineRevision: "Boundaries: Anterior (External Oblique), Posterior (Fascia Transversalis), Roof (Arching fibers), Floor (Inguinal Ligament)."
      },
      introduction: "The inguinal canal is a critical region for understanding abdominal hernias. It represents a potential weakness in the abdominal wall.",
      definitionText: "The inguinal canal is a 4cm long oblique passage directed downwards, forwards, and medially. It extends from the deep inguinal ring to the superficial inguinal ring.",
      grossAnatomy: {
        parts: ["Anterior wall: Skin, superficial fascia, and external oblique aponeurosis.", "Posterior wall: Fascia transversalis and conjoint tendon (medially).", "Roof: Arching fibers of internal oblique and transversus abdominis.", "Floor: Inguinal ligament and lacunar ligament (medially)."],
        relations: ["Deep ring is an opening in fascia transversalis; Superficial ring is an opening in external oblique aponeurosis."],
        anatomicalFeatures: ["Spermatic cord contents", "Ilioinguinal nerve (partial passage)"]
      },
      bloodSupply: "Inferior epigastric artery; Cremasteric artery.",
      nerveSupply: "Ilioinguinal nerve; Genital branch of genitofemoral nerve.",
      appliedAnatomy: "Indirect Inguinal Hernia (through deep ring), Direct Inguinal Hernia (through Hesselbach's triangle).",
      clinicalCorrelation: "Hesselbach's Triangle: bounded by inferior epigastric artery, lateral border of rectus abdominis, and inguinal ligament.",
      tables: [],
      flowchartSteps: { title: "Hernia Mechanisms", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["Vishram Singh Textbook of Anatomy Vol II"],
      visualPlans: []
    },
    "hip-joint": {
      title: "Hip Joint",
      bodyRegion: "Lower Limb",
      studyTime: "45 mins",
      difficulty: "Medium",
      importance: "⭐ High Scoring",
      nchCompetency: "AN12.1 - Describe the hip joint",
      learningObjectives: ["Identify the articular surfaces of the hip joint", "List the ligaments of the hip joint", "Explain the blood supply and stability mechanisms"],
      quickFacts: {
        definition: "A multiaxial ball-and-socket synovial joint.",
        location: "Connecting the pelvic girdle and the lower limb.",
        function: "Supports weight and allows a wide range of motion for locomotion.",
        clinicalImportance: "Common site of osteoarthritis and femoral neck fractures.",
        oneLineRevision: "Articulates head of femur with acetabulum; stabilized by Iliofemoral, Ischiofemoral, and Pubofemoral ligaments."
      },
      introduction: "The hip joint is designed for stability and weight-bearing. It is one of the most important joints for understanding human locomotion.",
      definitionText: "The hip joint is the articulation between the hemispherical head of the femur and the cup-shaped acetabulum of the hip bone.",
      grossAnatomy: {
        parts: ["Articular surfaces: Head of femur (covered with hyaline cartilage except at fovea) and Acetabulum (lunate surface).", "Capsule: Strong and dense, attached to the acetabular labrum and intertrochanteric line."],
        relations: ["Ligaments: Iliofemoral (Bigelow's - strongest), Pubofemoral, Ischiofemoral, Ligamentum teres."],
        anatomicalFeatures: ["Acetabular labrum", "Transverse acetabular ligament"]
      },
      bloodSupply: "Medial and lateral circumflex femoral arteries; Obturator artery (via ligamentum teres).",
      nerveSupply: "Femoral nerve, Obturator nerve, and Nerve to quadratus femoris.",
      appliedAnatomy: "Dislocation of hip (congenital or traumatic), Perthes' disease, Slipped Capital Femoral Epiphysis (SCFE).",
      clinicalCorrelation: "Shenton's Line: A smooth curve formed by the inferior border of the superior pubic ramus and the medial border of the femoral neck.",
      tables: [],
      flowchartSteps: { title: "Hip Stability", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["BD Chaurasia Vol II"],
      visualPlans: []
    },
    "knee-joint": {
      title: "Knee Joint",
      bodyRegion: "Lower Limb",
      studyTime: "60 mins",
      difficulty: "Hard",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN14.1 - Describe the knee joint",
      learningObjectives: ["Describe the complex hinge mechanism of the knee", "Explain the role of menisci and cruciate ligaments", "Identify the locking and unlocking mechanisms"],
      quickFacts: {
        definition: "A modified hinge joint (condylar) between the femur, tibia, and patella.",
        location: "Connecting the thigh and the leg.",
        function: "Supports body weight and allows flexion/extension with some rotation.",
        clinicalImportance: "Highly prone to sports injuries (ACL/MCL/Meniscal tears).",
        oneLineRevision: "Involves Femoro-tibial and Femoro-patellar articulations; contains ACL, PCL, MCL, LCL, and Menisci."
      },
      introduction: "The knee joint is the largest and most complex joint in the body. Its stability depends largely on ligaments and surrounding muscles.",
      definitionText: "The knee joint is a compound synovial joint. It acts primarily as a hinge but allows some degree of rotation during final stages of extension.",
      grossAnatomy: {
        parts: ["Articular surfaces: Condyles of femur, Condyles of tibia, Posterior surface of patella.", "Intracapsular structures: Anterior and Posterior Cruciate Ligaments (ACL, PCL); Medial and Lateral Menisci."],
        relations: ["Ligaments: Ligamentum patellae, MCL (Tibial), LCL (Fibular), Oblique popliteal ligament."],
        anatomicalFeatures: ["Locking: Medial rotation of femur on tibia during full extension.", "Unlocking: Popliteus muscle rotates femur laterally on tibia."]
      },
      bloodSupply: "Genicular anastomosis (from popliteal, femoral, and anterior tibial arteries).",
      nerveSupply: "Femoral, Tibial, Common Peroneal, and Obturator nerves.",
      appliedAnatomy: "Unhappy Triad (ACL, MCL, and Medial Meniscus injury), Genu Valgum (knock-knee), Genu Varum (bow-legs).",
      clinicalCorrelation: "Draw test (Anterior/Posterior) for cruciate ligament integrity.",
      tables: [],
      flowchartSteps: { title: "Locking Mechanism", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: [],
      relatedTopics: [],
      references: ["BD Chaurasia Vol II"],
      visualPlans: []
    },
    "pectoral-region": {
      title: "Pectoral Region",
      bodyRegion: "Anterior Chest Wall",
      studyTime: "20 mins",
      difficulty: "Easy",
      importance: "⭐ Easy Marks",
      nchCompetency: "AN2.1 - Describe the muscles, fascia, and boundaries of the pectoral region",
      learningObjectives: [
        "Describe the muscles of the pectoral region (Pectoralis Major, Minor, Subclavius).",
        "Explain the attachments, nerve supply, and actions of these muscles.",
        "Detail the structures piercing the clavipectoral fascia."
      ],
      quickFacts: {
        definition: "The pectoral region lies on the anterior chest wall and contains muscles connecting the upper limb to the thoracic skeleton.",
        location: "Front of the thoracic cage.",
        function: "Enables powerful adduction, medial rotation, and flexion of the humerus.",
        clinicalImportance: "The pectoral muscles are key surgical landmarks during radical mastectomy.",
        oneLineRevision: "Pectoral region features Pectoralis Major, Pectoralis Minor, and Clavipectoral Fascia."
      },
      introduction: "Let's review the Pectoral Region! This region covers the anterior thoracic wall and is highly relevant to both shoulder movements and breast clinical examinations.",
      definitionText: "The pectoral region is the area on the anterior thoracic chest wall. It is dominated by Pectoralis Major, Pectoralis Minor, and the clavipectoral fascia, providing support and leverage for upper limb movements.",
      grossAnatomy: {
        parts: [
          "Pectoralis Major: Large, fan-shaped muscle. Originates from clavicle, sternum, and upper costal cartilages; inserts into the lateral lip of the bicipital groove.",
          "Pectoralis Minor: Flat triangular muscle lying deep to pectoralis major. Originates from ribs 3, 4, 5; inserts into the coracoid process.",
          "Subclavius: Small cylindrical muscle under the clavicle, lying in the subclavian groove."
        ],
        relations: [
          "Superficially: Skin, superficial fascia, and mammary gland.",
          "Deeply: Ribs, intercostal muscles, clavipectoral fascia, and axilla."
        ],
        anatomicalFeatures: [
          "Clavipectoral Fascia: A strong fascial sheet deep to pectoralis major, protecting the axillary contents.",
          "Deltopectoral Triangle: A groove between pectoralis major and deltoid containing the cephalic vein and deltoid branch of thoracoacromial artery."
        ]
      },
      bloodSupply: "Pectoral branches of the thoracoacromial artery and lateral thoracic artery.",
      nerveSupply: "Medial and Lateral pectoral nerves (C5 to T1).",
      appliedAnatomy: "Clavipectoral fascia is pierced by four key structures: 1. Lateral pectoral nerve, 2. Cephalic vein, 3. Thoracoacromial artery, 4. Lymphatics from the breast to apical axillary nodes.",
      clinicalCorrelation: "Poland Syndrome is a congenital condition characterized by the unilateral absence of the pectoralis major muscle, often associated with syndactyly (webbed fingers) on the same side.",
      tables: [
        {
          title: "Table: Pectoral Region Muscles Summary",
          headers: ["Muscle", "Origin", "Insertion", "Nerve Supply", "Action"],
          rows: [
            ["Pectoralis Major", "Clavicular head (medial 1/2 clavicle), Sternocostal head (sternum & ribs 1-6)", "Lateral lip of bicipital groove of humerus", "Medial & Lateral Pectoral Nerves", "Adduction, medial rotation, and flexion of arm"],
            ["Pectoralis Minor", "3rd, 4th, 5th ribs near cartilages", "Medial border & upper surface of coracoid process", "Medial Pectoral Nerve", "Depresses shoulder and draws scapula forward"],
            ["Subclavius", "1st rib and its cartilage", "Subclavian groove on under surface of clavicle", "Nerve to Subclavius", "Steadies clavicle during shoulder actions"]
          ]
        }
      ],
      flowchartSteps: {
        title: "Cephalic Vein Drainage Pathway",
        steps: [
          { label: "Origin on Dorsal Venous Arch of Hand", desc: "Ascends along the lateral side of the forearm and arm." },
          { label: "Deltopectoral Groove", desc: "Passes between the deltoid and pectoralis major muscles." },
          { label: "Piercing Clavipectoral Fascia", desc: "Enters the deep fascia of the pectoral region." },
          { label: "Drainage into Axillary Vein", desc: "Empties directly into the first part of the axillary vein." }
        ]
      },
      mnemonics: [
        {
          phrase: "Structures piercing Clavipectoral Fascia: CALL",
          meaning: "C = Cephalic vein, A = Acromiothoracic (thoracoacromial) artery, L = Lateral pectoral nerve, L = Lymphatics.",
          concept: "Four structures piercing the clavipectoral fascia."
        }
      ],
      frequentlyConfused: [
        {
          conceptA: "Medial Pectoral Nerve",
          conceptB: "Lateral Pectoral Nerve",
          explanation: "The medial pectoral nerve is named because it arises from the medial cord of the brachial plexus. The lateral pectoral nerve arises from the lateral cord. Clinically, the lateral nerve actually lies medial to the medial nerve on the chest wall!"
        }
      ],
      vivaQuestions: [
        { q: "Name the structures piercing the clavipectoral fascia.", a: "Cephalic vein, Thoracoacromial artery, Lateral pectoral nerve, and Lymphatics." },
        { q: "What is the action of Pectoralis Major?", a: "Adduction, medial rotation, and flexion of the arm." },
        { q: "Where does the Pectoralis Major insert?", a: "Lateral lip of the bicipital groove of the humerus." },
        { q: "Which muscle is known as the key to the axilla?", a: "Pectoralis Minor, because it crosses the axillary artery and divides it into three parts." },
        { q: "What is the deltopectoral triangle?", a: "A small depression containing the cephalic vein, lateral to pectoralis major." },
        { q: "What nerve supplies the Pectoralis Minor?", a: "Medial pectoral nerve." },
        { q: "What is Poland Syndrome?", a: "Unilateral absence of the pectoralis major, usually congenital." },
        { q: "Which rib levels give origin to Pectoralis Minor?", a: "Ribs 3, 4, and 5." },
        { q: "What is the role of the Subclavius muscle?", a: "It steadies and depresses the clavicle during movements." },
        { q: "Which artery runs in the deltopectoral groove?", a: "Deltoid branch of the thoracoacromial artery." }
      ],
      universityQuestions: {
        shortNotes: ["Clavipectoral Fascia and structures piercing it", "Pectoralis Minor", "Deltopectoral Groove"],
        longQuestions: ["Describe the Pectoral Region under: Muscles, Fasciae, Cephalic vein pathway, and Applied Anatomy."],
        veryShortQuestions: ["What nerve supplies subclavius?", "Where does pectoralis minor insert?", "Name the vein in the deltopectoral groove."]
      },
      highYieldPoints: [
        "Pectoralis minor is the key landmark of the axilla.",
        "The clavipectoral fascia stretches between the clavicle and axillary fascia.",
        "A radical mastectomy involves removing pectoral muscles and axillary lymph nodes."
      ],
      oneMinuteRevision: [
        "Pectoral region has 3 muscles: Pectoralis major (adducts/rotates arm), Pectoralis minor (depresses scapula), and Subclavius.",
        "Clavipectoral fascia is pierced by CALL: Cephalic vein, Artery (thoracoacromial), Lateral pectoral nerve, Lymphatics.",
        "Cephalic vein runs in deltopectoral groove to join the axillary vein."
      ],
      relatedTopics: [
        { title: "Mammary Gland", slug: "mammary-gland" },
        { title: "Axilla", slug: "axilla" }
      ],
      references: [
        "BD Chaurasia's Human Anatomy, Vol 1, 9th Edition.",
        "NCH CBDC Syllabus for First BHMS."
      ],
      visualPlans: [
        { type: "Labelled Diagram", title: "Structures piercing Clavipectoral Fascia", description: "Clear anatomical sketch showing clavipectoral fascia, subclavius, pectoralis minor, and the four piercing structures." }
      ]
    },
    "axilla": {
      title: "Axilla (Armpit)",
      bodyRegion: "Axilla / Upper Extremity",
      studyTime: "25 mins",
      difficulty: "Hard",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN3.1 - Describe boundaries, walls, and contents of axilla",
      learningObjectives: [
        "Define the boundaries and walls of the axilla.",
        "List the contents of the axilla.",
        "Describe the axillary lymph node groups and their clinical significance."
      ],
      quickFacts: {
        definition: "The axilla is a pyramidal space situated between the upper part of the lateral thoracic wall and the arm.",
        location: "Under the shoulder joint.",
        function: "Provides a protected passageway for neurovascular bundles (brachial plexus, axillary artery/vein) passing to the upper limb.",
        clinicalImportance: "Axillary lymph nodes are the primary filters for breast cancer metastasis.",
        oneLineRevision: "Axilla has an apex, base, four walls, and contains the axillary sheath and lymph nodes."
      },
      introduction: "The axilla (armpit) is a major vascular gateway. It is shaped like a pyramid with truncated corners. Let's master its walls and contents perfectly for your practical spotting exam.",
      definitionText: "The axilla is a truncated four-sided pyramidal space. It conducts the major nerves of the brachial plexus and the axillary blood vessels from the root of the neck down into the arm.",
      grossAnatomy: {
        parts: [
          "Apex (Cervicoaxillary canal): Bounded by clavicle, upper border of scapula, and outer border of 1st rib.",
          "Base (Floor): Formed by skin and dense axillary fascia, curved upwards.",
          "Anterior Wall: Formed by Pectoralis Major, Pectoralis Minor, and clavipectoral fascia.",
          "Posterior Wall: Formed by Subscapularis, Latissimus Dorsi, and Teres Major.",
          "Medial Wall: Formed by upper 4 ribs and serratus anterior muscle.",
          "Lateral Wall: Very narrow, formed by the bicipital groove of the humerus, coracobrachialis, and short head of biceps."
        ],
        relations: [
          "Anteriorly: Pectoral region and breast.",
          "Posteriorly: Scapular region.",
          "Medially: Thoracic cage."
        ],
        anatomicalFeatures: [
          "Axillary Sheath: A fascial sleeve derived from prevertebral cervical fascia enclosing the axillary artery and brachial plexus cords (vein lies outside)."
        ]
      },
      bloodSupply: "Axillary artery and its branches, axillary vein.",
      nerveSupply: "Cords of the brachial plexus (Lateral, Medial, Posterior) and their branches.",
      appliedAnatomy: "Axillary abscesses are common and must be drained through incisions in the center of the base, pointing antero-posteriorly, to avoid injuring the highly sensitive lateral thoracic wall (long thoracic nerve) or lateral wall vessels.",
      clinicalCorrelation: "Winging of the scapula: Injury to the long thoracic nerve of Bell (supplying serratus anterior) causes the medial border of the scapula to project backward like a wing when the patient pushes against a wall.",
      tables: [
        {
          title: "Table: Boundaries of the Axilla",
          headers: ["Boundary", "Anatomical Components"],
          rows: [
            ["Apex", "Clavicle, upper border of scapula, 1st rib"],
            ["Base", "Skin, subcutaneous tissue, axillary fascia"],
            ["Anterior Wall", "Pectoralis major, Pectoralis minor, Clavipectoral fascia"],
            ["Posterior Wall", "Subscapularis, Latissimus dorsi, Teres major"],
            ["Medial Wall", "Ribs 1-4, Intercostal muscles, Serratus anterior"],
            ["Lateral Wall", "Bicipital groove of Humerus, Coracobrachialis, Biceps tendon"]
          ]
        }
      ],
      flowchartSteps: {
        title: "Axillary Artery Branches by Part",
        steps: [
          { label: "First Part (1 branch)", desc: "Superior Thoracic Artery." },
          { label: "Second Part (2 branches)", desc: "Thoracoacromial (acromiothoracic) and Lateral Thoracic Arteries." },
          { label: "Third Part (3 branches)", desc: "Subscapular, Anterior Circumflex Humeral, and Posterior Circumflex Humeral Arteries." }
        ]
      },
      mnemonics: [
        {
          phrase: "Save The Lions And Protect Sheep",
          meaning: "S = Superior thoracic, T = Thoracoacromial, L = Lateral thoracic, A = Anterior circumflex, P = Posterior circumflex, S = Subscapular.",
          concept: "Six branches of the axillary artery."
        }
      ],
      frequentlyConfused: [
        {
          conceptA: "Axillary Sheath Contents",
          conceptB: "Axillary Vein Location",
          explanation: "The axillary sheath contains the axillary artery and brachial plexus. The axillary vein lies entirely OUTSIDE the axillary sheath, allowing it to dilate freely during exercise and increased venous return."
        }
      ],
      vivaQuestions: [
        { q: "What is the shape of the axilla?", a: "Truncated four-sided pyramidal shape." },
        { q: "What forms the floor of the axilla?", a: "Skin, superficial fascia, and axillary fascia." },
        { q: "Why is the axillary vein outside the axillary sheath?", a: "To allow for physiological expansion during periods of high venous return." },
        { q: "What nerve is injured in winging of the scapula?", a: "Long thoracic nerve of Bell (C5, C6, C7)." },
        { q: "Which muscle is supplied by the long thoracic nerve?", a: "Serratus anterior muscle." },
        { q: "Name the five groups of axillary lymph nodes.", a: "Anterior, Posterior, Lateral, Central, and Apical." },
        { q: "How do you drain an axillary abscess?", a: "Through a transverse incision in the floor, directed towards the medial wall to avoid major vessels on the lateral/posterior walls." },
        { q: "What is the cervicoaxillary canal?", a: "The apex of the axilla, communicating with the posterior triangle of the neck." },
        { q: "Which artery is a continuation of the axillary artery?", a: "Brachial artery (at the lower border of teres major)." },
        { q: "What forms the medial boundary of the axilla?", a: "Upper four ribs, intercostal muscles, and upper part of serratus anterior." }
      ],
      universityQuestions: {
        shortNotes: ["Contents of Axilla", "Winging of Scapula", "Axillary Lymph Nodes"],
        longQuestions: ["Describe the Axilla under: Boundaries, Walls, Contents, and Clinical Significance of Lymph Nodes."],
        veryShortQuestions: ["Where does axillary artery start?", "What nerve is on the medial wall of axilla?", "What is the base of the axilla?"]
      },
      highYieldPoints: [
        "The axillary artery is divided into 3 parts by the Pectoralis Minor muscle.",
        "The lateral wall is the narrowest boundary.",
        "Intercostobrachial nerve (T2) crosses the axilla, causing referred cardiac pain to the medial arm."
      ],
      oneMinuteRevision: [
        "Axilla = Pyramidal armpit space.",
        "Conducts brachial plexus and axillary vessels.",
        "Apex = Cervicoaxillary canal; Base = skin/fascia.",
        "Axillary lymph nodes drain 75% of breast lymph."
      ],
      relatedTopics: [
        { title: "Axillary Artery", slug: "axillary-artery" },
        { title: "Brachial Plexus", slug: "brachial-plexus" }
      ],
      references: [
        "BD Chaurasia's Human Anatomy, Vol 1.",
        "NCH CBDC Syllabus First BHMS."
      ],
      visualPlans: [
        { type: "Cross Section", title: "Horizontal Section of the Axilla", description: "Shows the four walls, central neurovascular bundle in sheath, and lymph nodes." }
      ]
    },
    "scapula": {
      title: "Scapula (Shoulder Blade)",
      bodyRegion: "Shoulder / Upper Extremity",
      studyTime: "25 mins",
      difficulty: "Medium",
      importance: "⭐ Concept Based",
      nchCompetency: "AN1.1 - Describe anatomical features, angles, processes and attachments of Scapula",
      learningObjectives: [
        "Identify the side of a given scapula.",
        "Describe the borders, surfaces, angles, and processes of the scapula.",
        "Explain the muscle attachments of the scapula (Serratus Anterior, Rotator Cuff)."
      ],
      quickFacts: {
        definition: "The scapula is a flat, triangular bone forming the posterior part of the pectoral girdle.",
        location: "Posterolateral aspect of the chest wall, extending from 2nd to 7th ribs.",
        function: "Articulates with the humerus to form the shoulder joint, providing attachment for multiple stabilizing muscles.",
        clinicalImportance: "Site of shoulder blade winging and rotator cuff attachments.",
        oneLineRevision: "Scapula is a flat bone with 2 surfaces, 3 borders, 3 angles, and 3 processes."
      },
      introduction: "Let's study the Scapula! This flat bone is a mechanical masterpiece, facilitating a vast range of arm movements. It is highly valued in viva exams.",
      definitionText: "The scapula is a large, flat triangular bone on the posterolateral thoracic wall, articulating with the humerus at the glenoid joint and clavicle at the acromion process.",
      grossAnatomy: {
        parts: [
          "Surfaces: Costal surface (subscapular fossa, concave) and Dorsal surface (divided by spine into supraspinous and infraspinous fossae).",
          "Borders: Superior (has suprascapular notch), Lateral (thickest, has infraglenoid tubercle), and Medial (thin).",
          "Processes: Spinous process (extends laterally), Acromion process (articulates with clavicle), and Coracoid process (crow-beak like hook)."
        ],
        relations: [
          "Superficial: Trapezius, Latissimus Dorsi, and skin.",
          "Deep: Ribs 2-7, serratus anterior, and intercostal spaces."
        ],
        anatomicalFeatures: [
          "Glenoid Cavity: Piriform lateral articular surface forming the shoulder joint.",
          "Suprascapular Notch: Converted into a foramen by superior transverse scapular ligament, transmitting the suprascapular nerve."
        ]
      },
      bloodSupply: "Suprascapular artery, subscapular artery, and deep branch of transverse cervical artery.",
      nerveSupply: "Suprascapular nerve, subscapular nerves, and axillary nerve.",
      appliedAnatomy: "Winging of scapula is caused by damage to the long thoracic nerve. When pushing, the medial border of the scapula is lifted off the chest wall. Abduction of the arm above the horizontal (180 degrees) becomes impossible.",
      clinicalCorrelation: "Sprengel's Deformity is a rare congenital condition where the scapula is abnormally high and hypoplastic, limiting shoulder mobility.",
      tables: [
        {
          title: "Table: Scapula Processes Comparison",
          headers: ["Process", "Anatomy", "Primary Muscle Attachments"],
          rows: [
            ["Spinous Process", "Shelf-like projection on dorsal surface", "Trapezius, Deltoid"],
            ["Acromion Process", "Flattened expansion of spine", "Deltoid, Trapezius, Coracoacromial ligament"],
            ["Coracoid Process", "Bent hook-like projection anteriorly", "Pectoralis minor, Coracobrachialis, Biceps (short head)"]
          ]
        }
      ],
      flowchartSteps: {
        title: "Serratus Anterior Muscle Pull",
        steps: [
          { label: "Origin on Ribs 1-8", desc: "Arises from the anterolateral thoracic cage." },
          { label: "Course Posterolaterally", desc: "Wraps around the chest wall beneath the scapula." },
          { label: "Insertion on Medial Border", desc: "Attaches to the costal aspect of the scapula's medial margin." },
          { label: "Action: Protrusion & Stability", desc: "Pulls the scapula forward (punching action) and holds it flush against the ribs." }
        ]
      },
      mnemonics: [
        {
          phrase: "SITS Muscles (Rotator Cuff)",
          meaning: "S = Supraspinatus, I = Infraspinatus, T = Teres minor, S = Subscapularis.",
          concept: "Four stabilizing muscles of the shoulder joint originating from the scapula."
        }
      ],
      frequentlyConfused: [
        {
          conceptA: "Suprascapular Nerve Route",
          conceptB: "Suprascapular Artery Route",
          explanation: "At the suprascapular notch, the nerve passes UNDER the superior transverse scapular ligament (through the foramen), while the artery passes ABOVE the ligament ('Army flies over, Navy crawls under')."
        }
      ],
      vivaQuestions: [
        { q: "How do you determine the side of the Scapula?", a: "The glenoid cavity must face laterally, the spine must face posteriorly, and the flat costal surface must face anteriorly." },
        { q: "Which nerve is endangered at the suprascapular notch?", a: "Suprascapular nerve." },
        { q: "Name the SITS muscles.", a: "Supraspinatus, Infraspinatus, Teres minor, and Subscapularis." },
        { q: "What is winging of the scapula?", a: "Protrusion of the medial border due to serratus anterior paralysis." },
        { q: "What causes winging of the scapula?", a: "Injury to the long thoracic nerve (C5, C6, C7)." },
        { q: "Name the three processes of the scapula.", a: "Spinous, Acromion, and Coracoid processes." },
        { q: "Where does the subscapularis muscle insert?", a: "Lesser tubercle of the humerus." },
        { q: "What structure attaches to the infraglenoid tubercle?", a: "Long head of triceps brachii." },
        { q: "What is Sprengel's deformity?", a: "Congenital undescended high scapula." },
        { q: "Which muscle initiates arm abduction (0-15 degrees)?", a: "Supraspinatus muscle." }
      ],
      universityQuestions: {
        shortNotes: ["Rotator Cuff Muscles", "Winging of Scapula", "Attachments of Coracoid Process"],
        longQuestions: ["Describe Scapula bone: Side determination, Features of dorsal surface, muscular attachments, and clinical correlations."],
        veryShortQuestions: ["What attaches to supraglenoid tubercle?", "Name the joint between clavicle and scapula.", "How many surfaces does scapula have?"]
      },
      highYieldPoints: [
        "Serratus anterior inserts into the entire medial border of the costal surface.",
        "Suprascapular nerve passes under the transverse scapular ligament.",
        "Rotator cuff (SITS) muscles fuse with the capsule of the shoulder joint to stabilize it."
      ],
      oneMinuteRevision: [
        "Scapula = Flat triangular shoulder blade.",
        "Spine divides dorsal side into supra- and infraspinous fossae.",
        "Rotator cuff (SITS) keeps the shoulder head in the glenoid socket."
      ],
      relatedTopics: [
        { title: "Clavicle", slug: "clavicle" },
        { title: "Shoulder Joint", slug: "shoulder-joint" }
      ],
      references: [
        "BD Chaurasia's Human Anatomy, Vol 1.",
        "NCH First BHMS Syllabus."
      ],
      visualPlans: [
        { type: "Labelled Diagram", title: "Dorsal Surface of Scapula Muscle Attachments", description: "Color-coded diagram of muscle origins/insertions on dorsal scapular aspects." }
      ]
    },
    "shoulder-joint": {
      title: "Shoulder Joint",
      bodyRegion: "Shoulder / Upper Extremity",
      studyTime: "30 mins",
      difficulty: "Hard",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN3.3 - Describe the shoulder joint under type, articular surfaces, ligaments, relations, movements, muscles producing movements and clinical anatomy",
      learningObjectives: [
        "Identify the joint type and articulating bones.",
        "Describe all major ligaments and the glenoid labrum.",
        "Detail the relations and the rotator cuff stabilization.",
        "Analyze movements and the muscles producing them."
      ],
      quickFacts: {
        definition: "The shoulder joint (glenohumeral joint) is a multi-axial ball-and-socket synovial joint between the scapula and humerus.",
        location: "Shoulder region.",
        function: "Allows a highly mobile range of upper limb movements (flexion, extension, abduction, adduction, circumduction).",
        clinicalImportance: "Highly unstable. It is the most commonly dislocated joint in the body, typically in an antero-inferior direction.",
        oneLineRevision: "Shoulder joint has a large head of humerus in a shallow glenoid cavity, stabilized by the SITS rotator cuff."
      },
      introduction: "Welcome to the shoulder joint! It is the most mobile joint in your body, but this mobility comes at the cost of stability. It is a classic 10-mark essay question in your university papers. Let's make it easy to write.",
      definitionText: "The shoulder joint is a synovial joint of the ball-and-socket variety, formed by the articulation of the glenoid cavity of the scapula with the head of the humerus.",
      grossAnatomy: {
        parts: [
          "Articular Surfaces: Large head of humerus and shallow glenoid cavity, which is slightly deepened by the fibrocartilaginous Glenoid Labrum.",
          "Joint Capsule: Loose fibrous capsule, especially inferiorly, allowing extreme range of movement. It is reinforced by surrounding muscles.",
          "Ligaments: Glenohumeral ligaments (superior, middle, inferior), Coracohumeral ligament, Transverse humeral ligament, and Coracoacromial ligament (forming the accessory protective arch)."
        ],
        relations: [
          "Superiorly: Coracoacromial arch, supraspinatus, subacromial bursa.",
          "Inferiorly: Axillary nerve and posterior circumflex humeral vessels.",
          "Anteriorly: Subscapularis muscle.",
          "Posteriorly: Infraspinatus and teres minor muscles."
        ],
        anatomicalFeatures: [
          "Rotator Cuff (SITS): A muscular sleeve surrounding the anterior, superior, and posterior aspects of the joint. It keeps the humeral head snug inside the glenoid cavity."
        ]
      },
      bloodSupply: "Anterior and posterior circumflex humeral arteries, and suprascapular artery.",
      nerveSupply: "Axillary nerve, suprascapular nerve, and lateral pectoral nerve (Hilton's Law: nerves supplying a joint also supply the muscles acting on it).",
      appliedAnatomy: "Dislocation is very common because the humeral head is 4 times larger than the glenoid cavity. Dislocation is usually antero-inferior, where the capsule is weakest and lacks muscle support. This can injure the axillary nerve, leading to deltoid paralysis.",
      clinicalCorrelation: "Frozen Shoulder (Adhesive Capsulitis) is a condition characterized by stiffness, pain, and restricted motion of the shoulder. It is common in diabetics and is caused by thickening and inflammation of the joint capsule.",
      tables: [
        {
          title: "Table: Movements and Muscles of the Shoulder Joint",
          headers: ["Movement", "Primary Muscle (Prime Mover)", "Secondary / Synergist Muscles"],
          rows: [
            ["Abduction (0-15°)", "Supraspinatus", "Deltoid"],
            ["Abduction (15-90°)", "Deltoid (multipennate middle fibers)", "Supraspinatus"],
            ["Abduction (90-180°)", "Serratus Anterior & Trapezius (rotate scapula)", "None"],
            ["Flexion", "Pectoralis major (clavicular), Deltoid (anterior)", "Coracobrachialis, Biceps"],
            ["Extension", "Latissimus dorsi, Teres major, Deltoid (posterior)", "Triceps (long head)"],
            ["Medial Rotation", "Subscapularis, Latissimus dorsi, Teres major", "Pectoralis major, Deltoid (ant)"],
            ["Lateral Rotation", "Infraspinatus, Teres minor", "Deltoid (posterior)"]
          ]
        }
      ],
      flowchartSteps: {
        title: "Pathogenesis of Inferior Dislocation of Shoulder",
        steps: [
          { label: "Arm Abducted and Forcefully Impacted", desc: "E.g., fall or blow while arm is raised." },
          { label: "Humeral Head Levered Downwards", desc: "Forces head against the lower part of the joint capsule." },
          { label: "Capsule Failure at Inferior Aspect", desc: "The capsule is weakest here and lacks rotator cuff support." },
          { label: "Head Enters Axillary Space", desc: "Pops below the glenoid cavity, risking compression of the axillary nerve." }
        ]
      },
      mnemonics: [
        {
          phrase: "SITS stabilizes Shoulder",
          meaning: "S = Supraspinatus (superior), I = Infraspinatus (posterior), T = Teres minor (posterior), S = Subscapularis (anterior). Note: No SITS muscle inferiorly!",
          concept: "Rotator cuff muscles and their relation to the joint capsule."
        }
      ],
      frequentlyConfused: [
        {
          conceptA: "Glenoid Labrum",
          conceptB: "Rotator Cuff",
          explanation: "The glenoid labrum is a static fibrocartilaginous lip that deepens the glenoid socket. The rotator cuff is a dynamic muscular stabilizer formed by four active muscles."
        }
      ],
      vivaQuestions: [
        { q: "What type of joint is the shoulder joint?", a: "Ball-and-socket synovial joint." },
        { q: "Which nerve is closely related inferiorly?", a: "Axillary nerve." },
        { q: "What is the glenoid labrum?", a: "A fibrocartilaginous ring that deepens the shallow glenoid cavity." },
        { q: "Why is shoulder dislocation most common inferiorly?", a: "Because the inferior capsule is loose and completely unsupported by the rotator cuff muscles." },
        { q: "Which muscles produce abduction from 15 to 90 degrees?", a: "Middle fibers of the deltoid." },
        { q: "How is overhead abduction (above 90 degrees) achieved?", a: "By rotating the scapula, performed by the serratus anterior and trapezius." },
        { q: "What is Hilton's Law?", a: "The nerve supplying a joint also supplies the muscles that move it and the skin covering it." },
        { q: "What is a frozen shoulder?", a: "Adhesive capsulitis, causing extreme stiffness and pain." },
        { q: "Name the ligaments of the shoulder joint.", a: "Glenohumeral, Coracohumeral, Transverse humeral, and Coracoacromial." },
        { q: "Where does the long head of biceps tendon run?", a: "Intracapsularly, passing over the humeral head." }
      ],
      universityQuestions: {
        shortNotes: ["Rotator Cuff of Shoulder", "Abduction of Shoulder Joint (0-180°)", "Adhesive Capsulitis (Frozen Shoulder)"],
        longQuestions: ["Describe the Shoulder Joint: Articular surfaces, Ligaments, Relations, Muscles producing movements, and Clinical Anatomy of dislocation."],
        veryShortQuestions: ["What nerve is damaged in inferior shoulder dislocation?", "What joint type is glenohumeral?", "Name one lateral rotator muscle."]
      },
      highYieldPoints: [
        "The shoulder joint has the widest range of motion of any joint in the body.",
        "The long head of biceps tendon is intracapsular but extrasynovial.",
        "Dislocation risks stretching the axillary nerve, causing deltoid atrophy."
      ],
      oneMinuteRevision: [
        "Shoulder joint: Ball-and-socket synovial. Head of humerus + glenoid cavity.",
        "Stabilized by the SITS rotator cuff sleeve (no inferior support).",
        "Dislocation is usually antero-inferior; threatens axillary nerve."
      ],
      relatedTopics: [
        { title: "Humerus", slug: "humerus" },
        { title: "Scapula", slug: "scapula" }
      ],
      references: [
        "BD Chaurasia's Human Anatomy, Vol 1.",
        "NCH First BHMS Anatomy Syllabus."
      ],
      visualPlans: [
        { type: "Labelled Diagram", title: "Coronal Section of Shoulder Joint", description: "Shows the humeral head, glenoid cavity, labrum, capsule, biceps tendon, and subacromial bursa." }
      ]
    },
    "cubital-fossa": {
      title: "Cubital Fossa",
      bodyRegion: "Elbow Region / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN4.1 - Describe boundaries, contents, and clinical significance of cubital fossa",
      learningObjectives: [
        "Describe the boundaries of the cubital fossa.",
        "List the contents in order from medial to lateral.",
        "Explain the clinical value of the median cubital vein and brachial artery pulse."
      ],
      quickFacts: {
        definition: "The cubital fossa is a triangular depression located on the anterior aspect of the elbow joint.",
        location: "Front of the elbow.",
        function: "Serves as a transition zone for major nerves and blood vessels passing between the arm and forearm.",
        clinicalImportance: "The primary site for venepuncture (intravenous access) and blood pressure measurement.",
        oneLineRevision: "Cubital Fossa is a triangle at the elbow containing Median nerve, Brachial artery, Biceps tendon, and Radial nerve."
      },
      introduction: "Welcome to the Cubital Fossa! This triangular space is a massive favorite of practical examiners. You must learn the exact order of contents from medial to lateral.",
      definitionText: "The cubital fossa is an anatomical triangular space in front of the elbow joint, acting as a gateway for neurovascular structures passing to the forearm and hand.",
      grossAnatomy: {
        parts: [
          "Boundaries:",
          "Lateral Boundary: Medial border of the Brachioradialis muscle.",
          "Medial Boundary: Lateral border of the Pronator Teres muscle.",
          "Base: An imaginary horizontal line joining the two epicondyles of the humerus.",
          "Apex: Formed by the meeting of the lateral and medial boundaries, where brachioradialis overlaps pronator teres.",
          "Roof: Skin, superficial fascia (containing median cubital vein), deep fascia, and bicipital aponeurosis."
        ],
        relations: [
          "Floor: Formed by Brachialis (upper/medial) and Supinator (lower/lateral) muscles."
        ],
        anatomicalFeatures: [
          "Bicipital Aponeurosis: A flat, fibrous band extending from the biceps tendon across the fossa, protecting the underlying brachial artery and median nerve."
        ]
      },
      bloodSupply: "Terminal branches of the brachial artery (radial and ulnar arteries), and elbow anastomoses.",
      nerveSupply: "Median and Radial nerves pass through the fossa.",
      appliedAnatomy: "The Median Cubital Vein lies in the roof of the fossa, connecting the cephalic and basilic veins. It is the most preferred vein for intravenous injections and blood withdrawal because it is braced by the bicipital aponeurosis and does not roll.",
      clinicalCorrelation: "During blood pressure measurement, the stethoscope diaphragm is placed over the brachial artery in the cubital fossa (medial to the biceps tendon) to listen for Korotkoff sounds.",
      tables: [
        {
          title: "Table: Contents of the Cubital Fossa (Medial to Lateral)",
          headers: ["Structure (Medial to Lateral)", "Anatomical Notes"],
          rows: [
            ["1. Median Nerve", "Exits the fossa by passing between the two heads of pronator teres."],
            ["2. Brachial Artery", "Divides at the neck of the radius into Radial and Ulnar arteries."],
            ["3. Biceps Brachii Tendon", "Passes backward to insert into the radial tuberosity of the radius."],
            ["4. Radial Nerve", "Lies deep under the brachioradialis, dividing into superficial and deep branches."]
          ]
        }
      ],
      flowchartSteps: {
        title: "Venepuncture Setup in Cubital Roof",
        steps: [
          { label: "Apply Tourniquet on Upper Arm", desc: "Engorges the superficial veins of the upper limb." },
          { label: "Locate Median Cubital Vein", desc: "Crosses obliquely in the roof of the fossa." },
          { label: "Insert Needle into Vein", desc: "The underlying bicipital aponeurosis acts as a protective shield for the brachial artery." },
          { label: "Draw Blood or Inject Fluids", desc: "Safe, stable venous access point." }
        ]
      },
      mnemonics: [
        {
          phrase: "My Brother Built Ruins (Medial to Lateral)",
          meaning: "M = Median nerve, B = Brachial artery, B = Biceps tendon, R = Radial nerve.",
          concept: "The exact arrangement of cubital fossa contents from medial to lateral."
        }
      ],
      frequentlyConfused: [
        {
          conceptA: "Median Cubital Vein",
          conceptB: "Brachial Artery",
          explanation: "The median cubital vein lies superficially in the roof of the fossa. The brachial artery lies deep inside the fossa, separated from the vein by the protective bicipital aponeurosis."
        }
      ],
      vivaQuestions: [
        { q: "What are the boundaries of the cubital fossa?", a: "Lateral: Brachioradialis; Medial: Pronator teres; Base: Line between epicondyles; Apex: where the muscles meet." },
        { q: "State the mnemonic for contents from medial to lateral.", a: "My Brother Built Ruins: Median nerve, Brachial artery, Biceps tendon, Radial nerve." },
        { q: "What is the clinical value of the median cubital vein?", a: "Preferred site for intravenous injections and blood draws." },
        { q: "What protects deep structures in the cubital fossa?", a: "The bicipital aponeurosis." },
        { q: "Where does the brachial artery bifurcate?", a: "At the level of the neck of the radius." },
        { q: "What muscles form the floor of the cubital fossa?", a: "Brachialis and Supinator." },
        { q: "Where do you place the stethoscope to measure blood pressure?", a: "Over the brachial artery on the medial side of the cubital fossa." },
        { q: "Which nerve is at risk in the lateral aspect of the fossa?", a: "Radial nerve." },
        { q: "What veins are connected by the median cubital vein?", a: "Cephalic and Basilic veins." },
        { q: "Does the ulnar nerve pass through the cubital fossa?", a: "No, the ulnar nerve passes behind the medial epicondyle." }
      ],
      universityQuestions: {
        shortNotes: ["Boundaries and contents of Cubital Fossa", "Median Cubital Vein", "Bicipital Aponeurosis"],
        longQuestions: ["Describe the Cubital Fossa under: Boundaries, Floor, Contents in order (with a diagram), and Clinical Significance."],
        veryShortQuestions: ["What divides at the neck of the radius?", "Which nerve exits between two heads of pronator teres?", "Name the lateral border muscle of the fossa."]
      },
      highYieldPoints: [
        "The cubital fossa is analogous to the popliteal fossa of the lower limb.",
        "Supracondylar fractures of the humerus can directly impinge on the brachial artery in this fossa.",
        "Radial nerve splits into its superficial sensory and deep motor (PIN) branches here."
      ],
      oneMinuteRevision: [
        "Cubital Fossa: Triangle at front of elbow.",
        "Lateral = Brachioradialis, Medial = Pronator teres.",
        "Contents (M to L): Median nerve, Brachial artery, Biceps tendon, Radial nerve.",
        "Roof contains the median cubital vein used for venepuncture."
      ],
      relatedTopics: [
        { title: "Humerus", slug: "humerus" },
        { title: "Radial Nerve", slug: "radial-nerve" }
      ],
      references: [
        "BD Chaurasia's Human Anatomy, Vol 1.",
        "NCH First BHMS Anatomy."
      ],
      visualPlans: [
        { type: "Labelled Diagram", title: "Triangular Boundaries and Contents of Cubital Fossa", description: "Color sketch demonstrating the muscle boundaries and the four main contents in order." }
      ]
    },
    // Placeholders or quick guides for other remaining micro-topics to guarantee all 19 can be loaded!
    "radius": {
      title: "Radius Bone",
      bodyRegion: "Forearm / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ High Scoring",
      nchCompetency: "AN1.2 - Describe features, attachments, and clinical correlations of radius",
      learningObjectives: ["Identify the side of a given radius bone.", "Explain parts (head, neck, tuberosity, styloid process).", "Describe Colles' fracture."],
      quickFacts: {
        definition: "The radius is the lateral bone of the forearm, running parallel to the ulna.",
        location: "Lateral side of the forearm.",
        function: "Acts as the key pivot bone for pronation and supination of the forearm.",
        clinicalImportance: "Subject to Colles' fracture at its distal end.",
        oneLineRevision: "Radius is the lateral bone of the forearm, featuring a disc-like head proximally and a styloid process distally."
      },
      introduction: "The radius is the lateral bone of the forearm. Let's study its anatomy and attachments.",
      definitionText: "The radius is a typical long bone of the forearm, articulating with the humerus capitulum, the ulna, and the carpal bones (scaphoid and lunate).",
      grossAnatomy: {
        parts: ["Upper End: Disc-shaped head, neck, and radial tuberosity.", "Shaft: Has three borders (interosseous is sharpest) and three surfaces.", "Lower End: Widened, has a styloid process laterally and ulnar notch medially."],
        relations: ["Proximally: Articulates with capitulum.", "Distally: Articulates with scaphoid and lunate."],
        anatomicalFeatures: ["Radial Tuberosity: Receives insertion of biceps brachii.", "Styloid Process: Projecting downwards laterally, easily felt."]
      },
      bloodSupply: "Nutrient artery from the anterior interosseous artery.",
      nerveSupply: "Deep branch of radial nerve.",
      appliedAnatomy: "Colles' Fracture: Fracture of the distal end of the radius (within 2.5 cm of the wrist) caused by a fall on an outstretched hand. The distal fragment is displaced backward and upward, giving a 'Dinner Fork Deformity'.",
      clinicalCorrelation: "Smith's Fracture: Reverse Colles' fracture, caused by falling on a flexed wrist. The distal fragment is displaced anteriorly.",
      tables: [],
      flowchartSteps: { title: "Supination Mechanism", steps: [{ label: "Biceps contraction", desc: "Pulls on the radial tuberosity." }, { label: "Pivot rotation", desc: "Radius rolls laterally over the ulna." }] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [
        { q: "Which bone is lateral in the forearm?", a: "The Radius." },
        { q: "Where does the biceps muscle insert?", a: "On the radial tuberosity." },
        { q: "What is a Colles' fracture?", a: "Distal radius fracture with posterior displacement (dinner fork deformity)." }
      ],
      universityQuestions: { shortNotes: ["Colles' Fracture", "Biceps Insertion"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["Radius rotates around the stationary ulna during pronation/supination."],
      oneMinuteRevision: ["Radius: Lateral forearm bone. Proximal disc head, distal styloid. Colles' fracture = Dinner fork deformity."],
      relatedTopics: [{ title: "Ulna", slug: "ulna" }],
      references: ["BD Chaurasia's Human Anatomy, Vol 1."],
      visualPlans: []
    },
    "ulna": {
      title: "Ulna Bone",
      bodyRegion: "Forearm / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ High Scoring",
      nchCompetency: "AN1.2 - Describe features, attachments, and clinical correlations of ulna",
      learningObjectives: ["Identify the side of a given ulna.", "Explain olecranon and coronoid processes."],
      quickFacts: {
        definition: "The ulna is the medial stabilizing bone of the forearm.",
        location: "Medial side of the forearm.",
        function: "Forms the primary hinge joint of the elbow with the humerus.",
        clinicalImportance: "Fractures of olecranon process; Madelung's deformity.",
        oneLineRevision: "Ulna is the medial stabilizing bone of the forearm with a hook-like proximal end."
      },
      introduction: "The ulna is the medial long bone of the forearm, acting as the stabilizer. Let's look at its unique anatomy.",
      definitionText: "The ulna is a typical long bone lying medial to the radius, featuring a hook-like proximal end that articulates with the trochlea of the humerus.",
      grossAnatomy: {
        parts: ["Upper End: Olecranon process (forms elbow tip), coronoid process, and trochlear notch.", "Shaft: Has three borders and three surfaces.", "Lower End: Has a small head and a styloid process."],
        relations: ["Proximally: Trochlear notch articulates with humerus trochlea.", "Distally: Separated from carpus by an articular disc."],
        anatomicalFeatures: ["Radial Notch: Articulates with the head of the radius."]
      },
      bloodSupply: "Nutrient branches from the ulnar artery.",
      nerveSupply: "Anterior interosseous and ulnar nerves.",
      appliedAnatomy: "Triceps brachii inserts into the olecranon process. Fracture of olecranon is caused by direct trauma, disabling elbow extension.",
      clinicalCorrelation: "Madelung's Deformity is a congenital subluxation of the distal end of the ulna due to premature fusion of the radial epiphysis.",
      tables: [],
      flowchartSteps: { title: "Elbow Hinge Motion", steps: [{ label: "Extension", desc: "Olecranon fits into olecranon fossa." }] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [{ q: "What forms the tip of the elbow?", a: "Olecranon process of the ulna." }],
      universityQuestions: { shortNotes: ["Olecranon process", "Ulnar Styloid"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["Ulna remains stable while radius rotates around it."],
      oneMinuteRevision: ["Ulna = Medial forearm bone. Proximal olecranon, distal head with styloid."],
      relatedTopics: [{ title: "Radius", slug: "radius" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "carpal-bones": {
      title: "Carpal Bones",
      bodyRegion: "Hand / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ Easy Marks",
      nchCompetency: "AN1.2 - Describe carpal bones, layout and clinical anatomy",
      learningObjectives: ["Identify the 8 carpal bones.", "Describe the carpal tunnel."],
      quickFacts: {
        definition: "A group of eight small bones forming the skeleton of the wrist.",
        location: "Wrist region.",
        function: "Provide structural flexibility and form the floor of the carpal tunnel.",
        clinicalImportance: "Scaphoid fracture (risk of avascular necrosis) and Carpal Tunnel Syndrome.",
        oneLineRevision: "Eight carpal bones arranged in proximal and distal rows of four."
      },
      introduction: "Let's learn the carpal bones of the wrist! They are laid out in two rows of four. Let's memorize them with a standard clinical mnemonic.",
      definitionText: "The carpal bones are 8 short bones arranged in a proximal row (lateral to medial) and a distal row (lateral to medial), forming the carpal skeleton.",
      grossAnatomy: {
        parts: ["Proximal Row: Scaphoid, Lunate, Triquetrum, Pisiform.", "Distal Row: Trapezium, Trapezoid, Capitate, Hamate."],
        relations: ["Floor: Formed by carpal bones, curved anteriorly.", "Roof: Flexor retinaculum, forming the Carpal Tunnel."],
        anatomicalFeatures: ["Scaphoid: Boat-shaped, has a tubercle.", "Pisiform: Sesamoid bone in the tendon of flexor carpi ulnaris.", "Hamate: Has a distinct hook-like process."]
      },
      bloodSupply: "Radial, ulnar, and anterior interosseous arteries.",
      nerveSupply: "Deep branches of median, ulnar, and radial nerves.",
      appliedAnatomy: "Carpal Tunnel Syndrome: Compression of the median nerve as it passes under the flexor retinaculum, causing numbness and paresthesia in the lateral 3.5 digits and ape thumb deformity.",
      clinicalCorrelation: "Scaphoid Fracture: The most commonly fractured carpal bone, usually from a FOOSH. Tenderness is felt in the 'Anatomical Snuffbox'. It has retrograde blood supply, meaning a fracture can lead to Avascular Necrosis of the proximal fragment.",
      tables: [],
      flowchartSteps: { title: "Carpal Tunnel Contents", steps: [{ label: "Median Nerve", desc: "Passes superficially under retinaculum." }, { label: "Tendons", desc: "9 tendons: 4 FDS, 4 FDP, 1 FPL." }] },
      mnemonics: [{ phrase: "She Looks Too Pretty, Try To Catch Her", meaning: "S = Scaphoid, L = Lunate, T = Triquetrum, P = Pisiform (Proximal); T = Trapezium, T = Trapezoid, C = Capitate, H = Hamate (Distal).", concept: "Carpal bones lateral to medial." }],
      frequentlyConfused: [{ conceptA: "Trapezium", conceptB: "Trapezoid", explanation: "Trapezium is associated with the thumb (joint with 1st metacarpal: 'TrapeziUM is for the thUMB'). Trapezoid is medial to it." }],
      vivaQuestions: [{ q: "What is the most commonly fractured carpal bone?", a: "The Scaphoid bone." }, { q: "Where is tenderness felt in a scaphoid fracture?", a: "In the anatomical snuffbox." }],
      universityQuestions: { shortNotes: ["Carpal Tunnel Syndrome", "Scaphoid Fracture"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["Pisiform is a sesamoid bone."],
      oneMinuteRevision: ["8 carpal bones: She Looks Too Pretty, Try To Catch Her. Carpal tunnel holds median nerve."],
      relatedTopics: [{ title: "Median Nerve", slug: "median-nerve" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "elbow-joint": {
      title: "Elbow Joint",
      bodyRegion: "Elbow / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ Concept Based",
      nchCompetency: "AN3.3 - Describe elbow joint, type, bones, movements, ligaments and clinical anatomy",
      learningObjectives: ["Explain elbow joint type and bones.", "Describe carrying angle."],
      quickFacts: {
        definition: "The elbow joint is a hinge synovial joint allowing flexion and extension.",
        location: "Elbow region.",
        function: "Connects upper arm to forearm.",
        clinicalImportance: "Pulled elbow (subluxation of radial head), carrying angle.",
        oneLineRevision: "Hinge synovial joint between humerus trochlea/capitulum and ulna/radius."
      },
      introduction: "Let's study the Elbow Joint, the hinge of your forearm! It allows smooth flexion and extension.",
      definitionText: "The elbow joint is a uniaxial hinge synovial joint connecting the distal humerus to the proximal ends of the radius and ulna.",
      grossAnatomy: {
        parts: ["Bones: Humerus, Radius, Ulna.", "Ligaments: Radial collateral, Ulnar collateral, and Anular ligament (which keeps radial head in place)."],
        relations: ["Anteriorly: Brachialis, biceps tendon, brachial artery, median nerve.", "Posteriorly: Triceps muscle."],
        anatomicalFeatures: ["Carrying Angle: The outward angle formed by the axis of the arm and forearm in anatomical position (approx 13 degrees, greater in females)."]
      },
      bloodSupply: "Anastomosis around the elbow joint.",
      nerveSupply: "Radial, musculocutaneous, median, and ulnar nerves.",
      appliedAnatomy: "Pulled Elbow (Nursemaid's Elbow): Subluxation of the head of the radius from the anular ligament, common in toddlers when pulled suddenly by the hand.",
      clinicalCorrelation: "Student's Elbow (Olecranon Bursitis): Inflammation of the bursa over the olecranon tip due to chronic friction.",
      tables: [],
      flowchartSteps: { title: "Carrying Angle Disappearance", steps: [{ label: "Flex the elbow", desc: "Pronation and flexion aligns the bones." }, { label: "Angle disappears", desc: "Forearm aligns perfectly with upper arm." }] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [{ q: "What type of joint is the elbow?", a: "Hinge synovial joint." }, { q: "What is pulled elbow?", a: "Subluxation of the radial head out of the anular ligament." }],
      universityQuestions: { shortNotes: ["Carrying Angle", "Pulled Elbow"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["The carrying angle allows the arm to swing clear of the pelvis during walking."],
      oneMinuteRevision: ["Elbow joint = Hinge joint. Trochlea & trochlear notch. Carrying angle is ~13 degrees."],
      relatedTopics: [{ title: "Humerus", slug: "humerus" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "wrist-joint": {
      title: "Wrist Joint",
      bodyRegion: "Wrist / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ Concept Based",
      nchCompetency: "AN3.3 - Describe wrist joint, type, movements and anatomy",
      learningObjectives: ["Describe wrist joint type and movements."],
      quickFacts: {
        definition: "The wrist joint (radiocarpal joint) is an ellipsoid synovial joint.",
        location: "Wrist.",
        function: "Facilitates movements of the hand.",
        clinicalImportance: "Wrist sprains, wrist drop.",
        oneLineRevision: "Ellipsoid synovial joint between radius/articular disc and scaphoid/lunate/triquetrum."
      },
      introduction: "Let's study the Wrist Joint! It is the key to hand orientation and dexterity.",
      definitionText: "The wrist joint is an ellipsoid synovial joint connecting the distal forearm to the proximal carpal row.",
      grossAnatomy: {
        parts: ["Articular Surfaces: Lower end of radius and articular disc of inferior radioulnar joint proximally; scaphoid, lunate, and triquetrum distally.", "Ligaments: Palmar and dorsal radiocarpal, ulnar and radial collateral ligaments."],
        relations: ["Anteriorly: Flexor tendons, median nerve, ulnar nerve.", "Posteriorly: Extensor tendons."],
        anatomicalFeatures: ["Articular Disc: Keeps the ulna from directly articulating with the carpal bones."]
      },
      bloodSupply: "Anterior and posterior carpal arches.",
      nerveSupply: "Anterior and posterior interosseous nerves.",
      appliedAnatomy: "Sprains are very common. Wrist drop is caused by radial nerve palsy, which disables hand extension.",
      clinicalCorrelation: "Ganglion of the wrist is a cystic swelling containing thick fluid, most commonly arising on the dorsal aspect of the wrist joint.",
      tables: [],
      flowchartSteps: { title: "Wrist Adduction vs Abduction", steps: [{ label: "Adduction (Ulnar deviation)", desc: "Greater range because styloid of ulna is shorter." }, { label: "Abduction (Radial deviation)", desc: "Limited range because radial styloid process is longer." }] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [{ q: "Does the ulna articulate with the wrist joint?", a: "No, it is excluded by the articular disc." }],
      universityQuestions: { shortNotes: ["Wrist Joint Articular Surfaces"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["Adduction range is greater than abduction range at the wrist."],
      oneMinuteRevision: ["Wrist = Ellipsoid synovial joint. Radius + Scaphoid, Lunate, Triquetrum. Ulna is excluded by a disc."],
      relatedTopics: [{ title: "Carpal Bones", slug: "carpal-bones" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "axillary-artery": {
      title: "Axillary Artery",
      bodyRegion: "Axilla / Upper Extremity",
      studyTime: "25 mins",
      difficulty: "Medium",
      importance: "⭐ High Scoring",
      nchCompetency: "AN3.2 - Describe origin, course, parts, branches and clinical anatomy of axillary artery",
      learningObjectives: ["Explain course of axillary artery.", "List its 6 branches."],
      quickFacts: {
        definition: "The main arterial supply of the axilla and upper limb.",
        location: "Axilla space.",
        function: "Conducts oxygenated blood from subclavian artery to the upper limb.",
        clinicalImportance: "Collateral circulation, aneurysm.",
        oneLineRevision: "Continuation of subclavian artery at outer border of 1st rib, ending at lower border of teres major."
      },
      introduction: "Let's study the Axillary Artery! This artery is divided into three parts by the pectoralis minor muscle.",
      definitionText: "The axillary artery is the continuation of the subclavian artery, beginning at the outer border of the first rib and ending at the lower border of teres major, where it becomes the brachial artery.",
      grossAnatomy: {
        parts: ["First Part: Proximal to pectoralis minor. Has 1 branch.", "Second Part: Deep to pectoralis minor. Has 2 branches.", "Third Part: Distal to pectoralis minor. Has 3 branches."],
        relations: ["Enclosed in the axillary sheath along with the cords of the brachial plexus."],
        anatomicalFeatures: ["Anastomosis around Scapula: Important collateral network between subclavian and axillary artery branches."]
      },
      bloodSupply: "Forms branches supplying the pectoral, lateral thoracic, shoulder, and scapular regions.",
      nerveSupply: "Surrounded closely by the cords of the brachial plexus.",
      appliedAnatomy: "In case of axillary artery ligation, collateral circulation develops through the scapular anastomosis, bypassing the blockage.",
      clinicalCorrelation: "Axillary Artery Compression: Can be compressed against the shaft of the humerus in the lower part of the axilla to arrest distal bleeding.",
      tables: [],
      flowchartSteps: { title: "Artery Segments", steps: [{ label: "1st Part", desc: "1 branch: Superior Thoracic Artery." }, { label: "2nd Part", desc: "2 branches: Thoracoacromial & Lateral Thoracic." }, { label: "3rd Part", desc: "3 branches: Subscapular, Ant/Post Circumflex Humeral." }] },
      mnemonics: [{ phrase: "Save The Lions And Protect Sheep", meaning: "S = Superior thoracic, T = Thoracoacromial, L = Lateral thoracic, A = Anterior circumflex, P = Posterior circumflex, S = Subscapular.", concept: "Branches of the axillary artery." }],
      frequentlyConfused: [],
      vivaQuestions: [{ q: "What divides the axillary artery into three parts?", a: "Pectoralis minor muscle." }, { q: "Where does the axillary artery end?", a: "At the lower border of the Teres Major muscle." }],
      universityQuestions: { shortNotes: ["Scapular Anastomosis", "Branches of 3rd Part of Axillary Artery"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["The posterior circumflex humeral artery passes through the quadrangular space with the axillary nerve."],
      oneMinuteRevision: ["Axillary artery: Subclavian continuation. Divided into 3 parts by Pect. minor. Has 6 branches."],
      relatedTopics: [{ title: "Axilla", slug: "axilla" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "median-nerve": {
      title: "Median Nerve",
      bodyRegion: "Arm & Forearm / Upper Extremity",
      studyTime: "25 mins",
      difficulty: "Hard",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN4.2 - Describe origin, course, branches, and clinical anatomy of Median Nerve",
      learningObjectives: ["Trace median nerve course.", "Describe Carpal Tunnel syndrome."],
      quickFacts: {
        definition: "The major nerve of the anterior compartment of the forearm.",
        location: "Arises in axilla, travels down arm, forearm, and wrist.",
        function: "Controls fine motor tasks of the thumb and most flexor muscles of the forearm.",
        clinicalImportance: "The nerve of precision, vulnerable to Carpal Tunnel Syndrome.",
        oneLineRevision: "Formed by medial and lateral roots of brachial plexus, runs down center of forearm."
      },
      introduction: "Let's study the Median Nerve, known as the 'Labourer's Nerve' or 'Nerve of Precision'.",
      definitionText: "The median nerve is a major mixed nerve formed by the union of the lateral root (from lateral cord) and medial root (from medial cord) of the brachial plexus.",
      grossAnatomy: {
        parts: ["Arm Course: Travels lateral to brachial artery, then crosses anteriorly to lie medially in the cubital fossa.", "Forearm Course: Passes between two heads of pronator teres, travels down between FDS and FDP.", "Hand Course: Enters hand through carpal tunnel, supplying the thenar muscles and lateral 2.5 lumbricals."],
        relations: ["In Cubital Fossa: Medial content.", "In Wrist: Deep to palmaris longus tendon, under flexor retinaculum."],
        anatomicalFeatures: ["Recurrent Motor Branch: Supplies thenar muscles (OAF: Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis)."]
      },
      bloodSupply: "Companion artery of the median nerve (branch of anterior interosseous artery).",
      nerveSupply: "Roots C5, C6, C7, C8, T1.",
      appliedAnatomy: "Injury at wrist (Carpal Tunnel) causes Ape Thumb deformity (thenar atrophy, thumb in same plane as fingers) and loss of opposition.",
      clinicalCorrelation: "Pointing Index (or Hand of Benediction): When attempting to make a fist, digits 2 and 3 remain straight due to loss of flexors, showing median nerve lesion at the elbow.",
      tables: [],
      flowchartSteps: { title: "Nerve Course Summary", steps: [{ label: "Formation in Axilla", desc: "Lateral and Medial roots join." }, { label: "Forearm Entry", desc: "Passes pronator teres." }, { label: "Hand Entry", desc: "Passes carpal tunnel." }] },
      mnemonics: [],
      frequentlyConfused: [{ conceptA: "Ape Thumb Deformity", conceptB: "Claw Hand", explanation: "Ape thumb is caused by median nerve injury (thenar loss). Claw hand is caused by ulnar nerve injury (hyperextension of MCP and flexion of IP in 4th/5th digits)." }],
      vivaQuestions: [{ q: "Which nerve is called the labourer's nerve?", a: "Median nerve." }, { q: "What is the Ape Thumb deformity?", a: "Loss of thenar eminence and opposition, caused by median nerve lesion." }],
      universityQuestions: { shortNotes: ["Median Nerve in Hand", "Ape Thumb Deformity"], longQuestions: ["Describe the Median Nerve: Origin, course, relations in forearm and hand, branches and clinical anatomy."], veryShortQuestions: [] },
      highYieldPoints: ["Median nerve supplies 6.5 muscles in the forearm (except flexor carpi ulnaris and medial half of FDP)."],
      oneMinuteRevision: ["Median nerve: C5-T1. Labourer's nerve. Supplies thenars and forearm flexors. Carpal tunnel = Ape thumb."],
      relatedTopics: [{ title: "Carpal Bones", slug: "carpal-bones" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "ulnar-nerve": {
      title: "Ulnar Nerve",
      bodyRegion: "Forearm & Hand / Upper Extremity",
      studyTime: "25 mins",
      difficulty: "Hard",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN4.2 - Describe origin, course, branches and clinical anatomy of Ulnar Nerve",
      learningObjectives: ["Explain ulnar nerve course.", "Describe Claw Hand deformity."],
      quickFacts: {
        definition: "The major motor nerve of the hand, also called the 'Musician's Nerve'.",
        location: "Medial side of arm, forearm, and hand.",
        function: "Controls fine finger movements and most intrinsic hand muscles.",
        clinicalImportance: "Vulnerable behind medial epicondyle; causes claw hand.",
        oneLineRevision: "Arises from medial cord of brachial plexus, passes behind medial epicondyle to hand."
      },
      introduction: "Let's study the Ulnar Nerve! It is the key to musical instrument mastery because it controls fine finger movements.",
      definitionText: "The ulnar nerve is a major mixed nerve arising from the medial cord of the brachial plexus (C8-T1, with a frequent contribution from C7).",
      grossAnatomy: {
        parts: ["Arm Course: Descends medially, pierces medial intermuscular septum, and passes behind the medial epicondyle.", "Forearm Course: Enters forearm between two heads of FCU, runs down medial side.", "Hand Course: Enters hand superficial to flexor retinaculum via Guyon's canal."],
        relations: ["At Elbow: Lies in a groove behind the medial epicondyle.", "At Wrist: Lateral to pisiform bone, superficial to retinaculum."],
        anatomicalFeatures: ["Guyon's Canal: A fibro-osseous canal between the pisiform and hook of hamate, a site for ulnar tunnel syndrome."]
      },
      bloodSupply: "Ulnar collateral arteries.",
      nerveSupply: "Roots C8, T1 (and C7).",
      appliedAnatomy: "Ulnar Nerve Injury at elbow causes 'Claw Hand' (Main en griffe) due to paralysis of lumbricals 3 and 4 and interossei. The MCP joints are hyperextended, and IP joints are flexed.",
      clinicalCorrelation: "Froment's Sign: A clinical test for ulnar nerve palsy. The patient pinches a piece of paper; if the thumb flexes at the IP joint (using FPL supplied by median nerve) rather than adducting, the test is positive (adductor pollicis is paralyzed).",
      tables: [],
      flowchartSteps: { title: "Ulnar Paradox", steps: [{ label: "High Lesion (Elbow)", desc: "FCU & FDP also paralyzed; clawing is LESS severe." }, { label: "Low Lesion (Wrist)", desc: "FDP is intact, pulling fingers into deep flexion; clawing is MORE severe." }] },
      mnemonics: [],
      frequentlyConfused: [{ conceptA: "High Lesion", conceptB: "Low Lesion", explanation: "The 'Ulnar Paradox' states that a lower lesion of the ulnar nerve (at the wrist) causes a more severe claw hand than a higher lesion (at the elbow) because the flexor digitorum profundus remains active in lower lesions, pulling fingers into deeper flexion." }],
      vivaQuestions: [{ q: "Which nerve is known as the Musician's nerve?", a: "Ulnar nerve." }, { q: "What is Froment's Sign?", a: "A test for ulnar nerve palsy where the patient flexes the thumb IP joint to hold paper." }],
      universityQuestions: { shortNotes: ["Ulnar Paradox", "Guyon's Canal", "Claw Hand"], longQuestions: ["Describe the Ulnar Nerve under: Origin, course, relations, branches, and clinical anatomy of Claw Hand."], veryShortQuestions: [] },
      highYieldPoints: ["Supplies 15 out of 20 intrinsic hand muscles."],
      oneMinuteRevision: ["Ulnar nerve: C8-T1. Musician's nerve. Passes behind medial epicondyle. Claw hand = hyperextended MCP, flexed IP."],
      relatedTopics: [{ title: "Brachial Plexus", slug: "brachial-plexus" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "radial-nerve": {
      title: "Radial Nerve",
      bodyRegion: "Arm & Forearm / Upper Extremity",
      studyTime: "25 mins",
      difficulty: "Hard",
      importance: "⭐ Frequently Asked",
      nchCompetency: "AN4.2 - Describe origin, course, branches and clinical anatomy of Radial Nerve",
      learningObjectives: ["Trace radial nerve course.", "Describe Wrist Drop deformity."],
      quickFacts: {
        definition: "The major nerve of the posterior compartment of the arm and forearm.",
        location: "Arises in axilla, travels through spiral groove to lateral forearm.",
        function: "Innervates all extensor muscles of the elbow, wrist, and fingers.",
        clinicalImportance: "Vulnerable in spiral groove; causes Wrist Drop.",
        oneLineRevision: "Continuation of posterior cord of brachial plexus, runs in spiral groove."
      },
      introduction: "Let's study the Radial Nerve, the key to extending your arm, wrist, and fingers!",
      definitionText: "The radial nerve is the largest branch of the brachial plexus, arising as the continuation of the posterior cord (C5 to T1).",
      grossAnatomy: {
        parts: ["Arm Course: Passes posteriorly through the triangular space, then spirals down the spiral groove of the humerus.", "Forearm Course: Pierces the lateral intermuscular septum, enters cubital fossa, and divides into superficial (sensory) and deep (motor - posterior interosseous) branches."],
        relations: ["In Spiral Groove: Related closely to profunda brachii vessels on the posterior humerus.", "In Forearm: Deep branch (PIN) pierces supinator muscle to enter posterior compartment."],
        anatomicalFeatures: ["Posterior Interosseous Nerve (PIN): The deep motor branch of the radial nerve supplying extensor muscles of the forearm."]
      },
      bloodSupply: "Profunda brachii artery.",
      nerveSupply: "Roots C5, C6, C7, C8, T1.",
      appliedAnatomy: "Radial nerve injury in the spiral groove (e.g. humerus shaft fracture or 'Saturday night palsy' compression) causes Wrist Drop. The patient cannot extend the wrist or fingers, disabling hand grip.",
      clinicalCorrelation: "Saturday Night Palsy: Temporary radial nerve compression against the humerus due to falling asleep with the arm draped over a chair, usually after alcohol consumption.",
      tables: [],
      flowchartSteps: { title: "Radial Nerve Divisions", steps: [{ label: "Radial Nerve in Axilla", desc: "Supplies triceps (elbow extension)." }, { label: "Spiral Groove", desc: "Supplies brachioradialis & extensor carpi radialis longus." }, { label: "PIN", desc: "Supplies all other posterior forearm extensors." }] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [{ q: "What nerve is injured in Wrist Drop?", a: "Radial nerve." }, { q: "What is Saturday night palsy?", a: "Compressive radial nerve injury against humerus shaft, causing wrist drop." }],
      universityQuestions: { shortNotes: ["Wrist Drop", "Posterior Interosseous Nerve"], longQuestions: ["Describe Radial Nerve: Origin, course in spiral groove, branches, and clinical anatomy of wrist drop."], veryShortQuestions: [] },
      highYieldPoints: ["Radial nerve supplies all heads of the triceps brachii muscle."],
      oneMinuteRevision: ["Radial nerve: Posterior cord (C5-T1). Spirals around humerus. Extends arm/wrist. Damage = Wrist Drop."],
      relatedTopics: [{ title: "Humerus", slug: "humerus" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    },
    "cubital-fossa-summary": {
      title: "Cubital Fossa Summary",
      bodyRegion: "Elbow Region",
      studyTime: "15 mins",
      difficulty: "Easy",
      importance: "⭐ Easy Marks",
      nchCompetency: "AN4.1 - Summarize cubital fossa",
      learningObjectives: ["Quick review of elbow pit."],
      quickFacts: {
        definition: "A triangular space at the front of the elbow joint.",
        location: "Elbow joint.",
        function: "Conducts brachial artery and median nerve.",
        clinicalImportance: "Site of venepuncture.",
        oneLineRevision: "Triangular space in front of elbow containing median nerve, brachial artery, biceps tendon, and radial nerve."
      },
      introduction: "A quick summary of the cubital fossa.",
      definitionText: "Triangular depression in front of the elbow joint.",
      grossAnatomy: {
        parts: ["Boundaries: Brachioradialis laterally, pronator teres medially.", "Contents: Median nerve, brachial artery, biceps tendon, radial nerve."],
        relations: ["Floor: Brachialis, Supinator."],
        anatomicalFeatures: ["Bicipital aponeurosis protects deep structures."]
      },
      bloodSupply: "Brachial artery terminal branches.",
      nerveSupply: "Median and radial nerves.",
      appliedAnatomy: "Venepuncture using median cubital vein.",
      clinicalCorrelation: "B-P measurement stethoscope placement.",
      tables: [],
      flowchartSteps: { title: "Contents", steps: [] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [],
      universityQuestions: { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: [],
      oneMinuteRevision: ["Triangular pit. Venepuncture. Median cubital vein."],
      relatedTopics: [],
      references: [],
      visualPlans: []
    },
    "palmar-aponeurosis": {
      title: "Palmar Aponeurosis",
      bodyRegion: "Hand / Upper Extremity",
      studyTime: "20 mins",
      difficulty: "Medium",
      importance: "⭐ Concept Based",
      nchCompetency: "AN4.4 - Describe palmar aponeurosis and Dupuytren's contracture",
      learningObjectives: ["Explain palmar aponeurosis structures.", "Describe Dupuytren's contracture."],
      quickFacts: {
        definition: "The palmar aponeurosis is a triangular, thickened portion of deep fascia in the center of the palm.",
        location: "Palm of the hand.",
        function: "Protects underlying nerves and blood vessels, and anchors the skin for improved grip.",
        clinicalImportance: " Dupuytren's contracture.",
        oneLineRevision: "Triangular thickened deep fascia of palm, continuous with palmaris longus."
      },
      introduction: "Let's study the Palmar Aponeurosis, the protective shield of your palm!",
      definitionText: "The palmar aponeurosis is a triangular-shaped thickening of the deep fascia of the hand, covering the long flexor tendons and neurovascular digital branches.",
      grossAnatomy: {
        parts: ["Apex: Bounded proximally, continuous with the flexor retinaculum and palmaris longus tendon.", "Base: Splits into four digital slips near the heads of metacarpals.", "Medial/Lateral margins: Continuous with thin fascia covering thenar and hypothenar eminences."],
        relations: ["Superficially: Skin and palmaris brevis muscle.", "Deeply: Superficial palmar arch, median nerve, flexor tendons."],
        anatomicalFeatures: ["Palmaris Longus: Insertion pulls directly on this aponeurosis."]
      },
      bloodSupply: "Superficial palmar arch.",
      nerveSupply: "Ulnar nerve (palmaris brevis muscle attached to it).",
      appliedAnatomy: "Dupuytren's Contracture: A progressive, localized fibrotic thickening and shortening of the palmar aponeurosis, pulling the ring and little fingers into permanent flexion at the MCP and proximal IP joints. It is common in older males and associated with alcohol use or diabetes.",
      clinicalCorrelation: "Palmar space infections (e.g., collar button abscesses) are extremely painful due to the tight space under the tough aponeurosis, requiring surgical incision to relieve pressure.",
      tables: [],
      flowchartSteps: { title: "Dupuytren's Progression", steps: [{ label: "Microtrauma / Fibrogenesis", desc: "Nodules of collagen form in the aponeurosis." }, { label: "Cord Formation", desc: "The longitudinal slips thicken into tight cords." }, { label: "Contracture", desc: "Pulls fingers into permanent flexion." }] },
      mnemonics: [],
      frequentlyConfused: [],
      vivaQuestions: [{ q: "What is the palmar aponeurosis?", a: "Triangular thickening of deep fascia in the center of the palm." }, { q: "What is Dupuytren's contracture?", a: "Fibrotic shortening of palmar aponeurosis flexing the ring and little fingers." }],
      universityQuestions: { shortNotes: ["Dupuytren's Contracture", "Palmar Spaces"], longQuestions: [], veryShortQuestions: [] },
      highYieldPoints: ["It anchors the skin to prevent slipping during grasping."],
      oneMinuteRevision: ["Palmar aponeurosis = thick palm shield. Continuous with palmaris longus. Shortening = Dupuytren's contracture."],
      relatedTopics: [{ title: "Carpal Bones", slug: "carpal-bones" }],
      references: ["BD Chaurasia Vol 1."],
      visualPlans: []
    }
  };

  const data = fallbacks[id] || fallbacks["pectoral-region"];
  return {
    id,
    title: data.title || "Anatomy Module",
    bodyRegion: data.bodyRegion || "Upper Extremity",
    subject: data.subject || "Anatomy",
    studyTime: data.studyTime || "20 mins",
    difficulty: data.difficulty || "Medium",
    importance: data.importance || "⭐ Concept Based",
    nchCompetency: data.nchCompetency || "AN1.1",
    learningObjectives: data.learningObjectives || ["Understand anatomy concepts."],
    quickFacts: data.quickFacts || {
      definition: "Anatomical structure of the upper extremity.",
      location: "Upper limb.",
      function: "Performs movement and support.",
      clinicalImportance: "Vulnerable to clinical injury.",
      oneLineRevision: "Study of human body landmarks."
    },
    introduction: data.introduction || "Let's review this micro-topic.",
    definitionText: data.definitionText || "Detailed anatomical definition.",
    grossAnatomy: data.grossAnatomy || {
      parts: ["Structure parts"],
      relations: ["Surrounding structures"],
      anatomicalFeatures: ["Key bony or muscular markings"]
    },
    bloodSupply: data.bloodSupply || "Anatomical blood supply vessels.",
    nerveSupply: data.nerveSupply || "Anatomical nerve innervation.",
    appliedAnatomy: data.appliedAnatomy || "Applied clinical surgical conditions.",
    clinicalCorrelation: data.clinicalCorrelation || "Real-life medical examples.",
    tables: data.tables || [],
    flowchartSteps: data.flowchartSteps || { title: "Anatomical Pathway", steps: [] },
    mnemonics: data.mnemonics || [],
    frequentlyConfused: data.frequentlyConfused || [],
    vivaQuestions: data.vivaQuestions || [],
    universityQuestions: data.universityQuestions || { shortNotes: [], longQuestions: [], veryShortQuestions: [] },
    highYieldPoints: data.highYieldPoints || [],
    oneMinuteRevision: data.oneMinuteRevision || [],
    relatedTopics: data.relatedTopics || [],
    references: data.references || [],
    visualPlans: data.visualPlans || []
  };
}

