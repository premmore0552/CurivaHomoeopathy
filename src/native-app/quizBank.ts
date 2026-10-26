export type NativeQuestion = {
  id: string;
  subject: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: 'Foundational' | 'Intermediate';
};

export const nativeQuestionBank: NativeQuestion[] = [
  {
    id: 'anat-brachial-plexus',
    subject: 'Anatomy',
    prompt: 'Which nerve is most commonly injured in a mid-shaft fracture of the humerus?',
    options: ['Axillary nerve', 'Radial nerve', 'Musculocutaneous nerve', 'Ulnar nerve'],
    answer: 1,
    explanation: 'The radial nerve travels in the radial groove of the humerus and is vulnerable in mid-shaft fractures. Assess wrist and finger extension and sensory changes over the dorsal first web space.',
    difficulty: 'Foundational'
  },
  {
    id: 'phys-cardiac-output',
    subject: 'Physiology',
    prompt: 'Cardiac output is calculated as:',
    options: ['Heart rate × stroke volume', 'Stroke volume ÷ heart rate', 'Blood pressure × respiratory rate', 'Heart rate × total peripheral resistance'],
    answer: 0,
    explanation: 'Cardiac output is the volume ejected by one ventricle per minute: heart rate multiplied by stroke volume. In a resting adult, it is commonly around 5 L/min, with variation by body size and activity.',
    difficulty: 'Foundational'
  },
  {
    id: 'path-inflammation',
    subject: 'Pathology',
    prompt: 'Which leukocyte is typically the predominant early responder in acute bacterial inflammation?',
    options: ['Eosinophil', 'Neutrophil', 'Plasma cell', 'Small lymphocyte'],
    answer: 1,
    explanation: 'Neutrophils are usually the predominant early inflammatory cells in acute bacterial infection. The cellular pattern varies with the cause, tissue, timing, and host factors.',
    difficulty: 'Foundational'
  },
  {
    id: 'renal-filtration',
    subject: 'Physiology',
    prompt: 'Which structure forms the filtration barrier together with the glomerular basement membrane and podocyte slit diaphragms?',
    options: ['Collecting duct epithelium', 'Fenestrated glomerular endothelium', 'Loop of Henle thin limb', 'Macula densa only'],
    answer: 1,
    explanation: 'The glomerular filtration barrier includes fenestrated endothelium, the glomerular basement membrane, and podocyte slit diaphragms. Its properties support filtration while restricting most cells and large proteins.',
    difficulty: 'Intermediate'
  },
  {
    id: 'heme-anemia',
    subject: 'Pathology',
    prompt: 'A low mean corpuscular volume (MCV) describes red blood cells that are:',
    options: ['Larger than usual', 'Smaller than usual', 'Normal in size but fewer in number', 'Unable to bind oxygen at all'],
    answer: 1,
    explanation: 'A low MCV indicates microcytosis. Iron deficiency and thalassemia are common causes; interpretation should include haemoglobin, red-cell distribution width, history, and appropriate investigations.',
    difficulty: 'Foundational'
  },
  {
    id: 'respiratory-gas',
    subject: 'Physiology',
    prompt: 'In a healthy adult at rest, the main stimulus for minute-to-minute ventilation is usually a rise in:',
    options: ['Arterial carbon dioxide', 'Plasma albumin', 'Serum calcium', 'Haemoglobin concentration'],
    answer: 0,
    explanation: 'Ventilation is highly responsive to carbon dioxide through central and peripheral chemoreceptor pathways. Oxygen becomes a major ventilatory stimulus in significant hypoxaemia.',
    difficulty: 'Intermediate'
  },
  {
    id: 'microbiology-gram',
    subject: 'Microbiology',
    prompt: 'Gram-positive bacteria retain the primary crystal violet stain mainly because of their:',
    options: ['Outer membrane rich in lipopolysaccharide', 'Thick peptidoglycan cell wall', 'Absence of a cell wall', 'Nuclear membrane'],
    answer: 1,
    explanation: 'The thick peptidoglycan layer of Gram-positive bacteria retains the crystal violet–iodine complex during decolourisation. Gram-negative bacteria have a thinner peptidoglycan layer and an outer membrane.',
    difficulty: 'Foundational'
  },
  {
    id: 'pharmacology-first-pass',
    subject: 'Pharmacology',
    prompt: 'The first-pass effect most directly reduces the bioavailability of a drug given by which route?',
    options: ['Intravenous', 'Oral', 'Sublingual', 'Transdermal'],
    answer: 1,
    explanation: 'After oral absorption, some drug may be metabolised in the intestinal wall and liver before reaching systemic circulation. Intravenous administration bypasses this initial presystemic metabolism.',
    difficulty: 'Foundational'
  },
  {
    id: 'fmt-chain-custody',
    subject: 'Forensic Medicine',
    prompt: 'In forensic specimen handling, a well-documented chain of custody primarily establishes:',
    options: ['The diagnosis without testing', 'The identity and handling history of the specimen', 'The patient’s prognosis', 'The exact time a crime occurred'],
    answer: 1,
    explanation: 'Chain-of-custody documentation records collection, sealing, transfers, storage, and receipt so specimen integrity and accountability can be evaluated.',
    difficulty: 'Foundational'
  },
  {
    id: 'phys-insulin',
    subject: 'Physiology',
    prompt: 'Which pancreatic cell type secretes insulin?',
    options: ['Alpha cell', 'Beta cell', 'Delta cell', 'Acinar cell'],
    answer: 1,
    explanation: 'Beta cells in the pancreatic islets secrete insulin. Alpha cells secrete glucagon, while delta cells secrete somatostatin.',
    difficulty: 'Foundational'
  },
  {
    id: 'anatomy-csf',
    subject: 'Anatomy',
    prompt: 'Cerebrospinal fluid is produced predominantly by the:',
    options: ['Arachnoid granulations', 'Choroid plexuses', 'Dural venous sinuses', 'Pia mater of the spinal cord only'],
    answer: 1,
    explanation: 'The choroid plexuses produce most cerebrospinal fluid. CSF circulates through the ventricles and subarachnoid space and is returned to the venous system through several drainage pathways.',
    difficulty: 'Foundational'
  },
  {
    id: 'path-metaplasia',
    subject: 'Pathology',
    prompt: 'Metaplasia is best described as:',
    options: ['An irreversible increase in cell number', 'Replacement of one differentiated cell type by another', 'Uncontrolled spread of malignant cells', 'Programmed cell death'],
    answer: 1,
    explanation: 'Metaplasia is an adaptive, potentially reversible change in which one differentiated cell type is replaced by another better able to tolerate a chronic stress. The underlying stimulus may still cause harm.',
    difficulty: 'Intermediate'
  }
];

export const nativeQuestionSubjects = ['All subjects', ...Array.from(new Set(nativeQuestionBank.map((question) => question.subject)))];
