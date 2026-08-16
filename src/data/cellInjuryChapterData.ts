import { PathologyChapter } from '../types/pathology';

export interface FlowchartNode {
  id: string;
  title: string;
  subtitle?: string;
  details?: string;
  type?: 'trigger' | 'process' | 'decision' | 'outcome' | 'danger';
}

export interface InteractiveFlowchart {
  id: string;
  title: string;
  description: string;
  nodes: FlowchartNode[];
}

export interface DetailedSectionContent {
  id: string;
  sectionNumber: string;
  title: string;
  nchCompetencyCode: string;
  quickSummary: string;
  coreConcept: string;
  detailedNotes: string[];
  deeperConcept?: string;
  morphology?: {
    gross?: string[];
    microscopic?: string[];
    keySpotterPoint?: string;
  };
  specialStains?: {
    stain: string;
    target: string;
    appearance: string;
    clinicalUse: string;
  }[];
  clinicalCorrelation?: string;
  homoeopathicCorrelation?: {
    miasm: 'Psora' | 'Sycosis' | 'Syphilis' | 'Tubercular (Mixed)';
    analysis: string;
    remedies: { name: string; indication: string; rationale: string }[];
  };
  examPearl: string;
  diagramFlowchartId?: string;
}

export interface ClinicalCaseStudy {
  id: string;
  caseNumber: number;
  title: string;
  scenario: string;
  question: string;
  diagnosis: string;
  pathologicalReasoning: string;
  histopathologyFindings: string;
  examTakeaway: string;
  homoeopathicRelevance?: string;
}

export interface ExamDefinitionItem {
  term: string;
  oneLineDefinition: string;
  expandedExplanation: string;
  keyExample: string;
  examKeyword: string;
}

export interface LaqItem {
  id: string;
  question: string;
  marks: number;
  nchCode: string;
  structure: {
    introduction: string;
    headings: string[];
    mainContentPoints: string[];
    diagramRecommendation: string;
    conclusion: string;
    examinerKeywords: string[];
    commonMistakes: string[];
  };
}

export interface SaqItem {
  id: string;
  question: string;
  marks: number;
  nchCode: string;
  type: 'Define' | 'Enumerate' | 'Explain mechanism' | 'Differentiate' | 'Clinical application';
  answerPoints: string[];
  examTip: string;
}

export interface McqQuestionItem {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Moderate' | 'High-Yield Clinical';
  topic: string;
  nchCode: string;
}

export interface VivaQuestionItem {
  id: string;
  question: string;
  oneLineAnswer: string;
  followUpQuestion: string;
  followUpAnswer: string;
  examinerTip: string;
  category: string;
}

export interface ComparisonTableData {
  id: string;
  title: string;
  description: string;
  headers: string[];
  rows: string[][];
  examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE' | 'HIGH YIELD' | 'CORE CONCEPT';
}

export interface RapidRevisionData {
  tenMinuteSummary: {
    title: string;
    points: string[];
  }[];
  oneMinuteEssentials: string[];
}

export interface MnemonicItem {
  topic: string;
  mnemonic: string;
  expansion: string[];
  explanation: string;
}

export interface ExamTrapItem {
  trap: string;
  correction: string;
  whyStudentsGetConfused: string;
}

// -------------------------------------------------------------
// COMPLETE MASTER DATA STRUCTURE FOR CELL INJURY & ADAPTATIONS
// -------------------------------------------------------------

export const cellInjuryComparisonTables: ComparisonTableData[] = [
  {
    id: 'tbl-hypoxia-vs-ischemia',
    title: '1. Hypoxia vs Ischaemia',
    description: 'Crucial distinction regarding oxygen supply, nutrient delivery, toxic metabolite washout, and injury velocity.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Parameter', 'Hypoxia', 'Ischaemia'],
    rows: [
      ['Definition', 'Deficiency of oxygen delivery to tissues despite preserved or normal blood flow perfusion', 'Interrupted or reduced arterial blood supply (or venous obstruction) to a tissue'],
      ['Nutrient Delivery', 'Glucose, amino acids and other nutrient delivery remains maintained via circulation', 'Both oxygen AND essential glycolytic substrates (glucose) are cut off'],
      ['Metabolite Removal', 'Metabolites (lactic acid, CO2) are continuously washed out by circulating blood', 'Metabolites accumulate locally, accelerating intracellular acidosis'],
      ['Glycolysis Duration', 'Anaerobic glycolysis can continue as long as blood-borne glucose is supplied', 'Anaerobic glycolysis ceases rapidly once local glycogen reserves are exhausted'],
      ['Rapidity of Injury', 'Causes slower, less catastrophic cell injury than ischaemia', 'Causes rapid, more severe and catastrophic cellular necrosis'],
      ['Typical Causes', 'High altitude, severe anemia, CO poisoning, respiratory failure, methemoglobinemia', 'Atherosclerotic thrombosis, arterial embolism, tourniquet, torsion of organ']
    ]
  },
  {
    id: 'tbl-reversible-vs-irreversible',
    title: '2. Reversible vs Irreversible Cell Injury (Point of No Return)',
    description: 'Hallmark biochemical and morphological transitions demarcating salvageable cells from committed cell death.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Feature', 'Reversible Injury', 'Irreversible Injury (Necrosis)'],
    rows: [
      ['Definition', 'Cellular changes that revert to normal homeostatic baseline if injurious stress is removed', 'Cellular damage beyond recovery, inevitably proceeding to cell death and degradation'],
      ['Mitochondrial Changes', 'Mild swelling, rarefaction of matrix, small amorphous densities', 'Severe swelling, disruption of cristae, large flocculent matrix densities, MPTP opening'],
      ['Plasma Membrane', 'Surface blebbing, blunting of microvilli, loosening of intercellular junctions', 'Severe membrane fragmentation, loss of phospholipid bilayer integrity, large defects'],
      ['Nuclear Changes', 'Clumping of chromatin (reversible on pH restoration); nucleolus preserved', 'Pyknosis (dense shrinkage) → Karyorrhexis (fragmentation) → Karyolysis (dissolution)'],
      ['Endoplasmic Reticulum', 'Dilation with detachment of polyribosomes; decreased protein synthesis', 'Lysis of ER membranes, extensive ribosomal shedding, protein denaturation'],
      ['Cytosolic Ca2+', 'Slight transient influx', 'Massive uncontrolled cytosolic influx activating phospholipases, proteases, endonucleases'],
      ['Enzyme Leakage into Blood', 'Absent (plasma membrane remains intact)', 'Present (e.g., Troponins, CK-MB, AST, ALT, LDH leak into bloodstream)'],
      ['Clinical Outcome', 'Restoration of normal organ function upon reperfusion / removal of toxin', 'Permanent loss of functioning parenchymal cells, repair by fibrous scar / cicatrix']
    ]
  },
  {
    id: 'tbl-necrosis-vs-apoptosis',
    title: '3. Necrosis vs Apoptosis',
    description: 'Extensive comparative table between accidental pathological cell lysis and gene-directed programmed suicide.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Feature', 'Necrosis', 'Apoptosis'],
    rows: [
      ['Definition', 'Pathological cell death caused by severe acute exogenous injury, leading to membrane lysis and enzymatic degradation', 'Programmed, energy-dependent cell death where cell activates internal enzymes to dismantle itself without inflammation'],
      ['Nature / Setting', 'Always pathological; response to extreme hypoxia, ischemia, toxins, physical trauma', 'Physiological (embryogenesis, involution) or pathological (DNA damage, viral infections)'],
      ['Number of Cells', 'Involves contiguous groups of neighboring cells / tissue sheets', 'Involves isolated, single, scattered individual cells'],
      ['Cell Size & Volume', 'Cellular swelling (oncosis) and organelle distension', 'Cellular shrinkage and cytoplasmic condensation'],
      ['Plasma Membrane', 'Disrupted and lysed; early loss of barrier integrity', 'Intact with molecular alterations (phosphatidylserine flip to outer leaflet), surface blebs'],
      ['Nuclear Morphology', 'Pyknosis → Karyorrhexis → Karyolysis (random enzymatic degradation)', 'Fragmentation into nucleosome-sized chunks (180–200 bp intervals, DNA laddering)'],
      ['Cellular Contents', 'Enzymatic digestion; contents leak freely into extracellular space', 'Packaged neatly into intact, membrane-bound "Apoptotic Bodies"'],
      ['Inflammatory Response', 'Prominent acute inflammatory infiltration (neutrophils, macrophages)', 'Completely ABSENT; silent phagocytosis prevents tissue inflammation'],
      ['Energy (ATP) Dependency', 'ATP depletion is the primary cause of necrosis', 'Energy-dependent process requiring active ATP for caspase activation cascades'],
      ['End Fate', 'Heterolysis / autolysis with scar formation or dystrophic calcification', 'Phagocytosis by adjacent resident macrophages; no scarring']
    ]
  },
  {
    id: 'tbl-types-of-necrosis',
    title: '4. Morphological Types of Necrosis',
    description: 'Comprehensive taxonomy of all 6 necrosis variants with pathognomonic gross and microscopic hallmarks.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Type of Necrosis', 'Primary Mechanism', 'Characteristic Gross Appearance', 'Key Microscopic Feature', 'Classic Clinical Examples'],
    rows: [
      ['Coagulative Necrosis', 'Protein denaturation dominates over enzymatic digestion; acidophilic ghost preservation', 'Firm, pale, wedge-shaped dry area with preserved organ contour', '"Tombstone" / "Ghost cells" with preserved cellular architecture but loss of nuclei', 'Myocardial infarction, renal infarct, splenic infarct (All solid organs EXCEPT brain)'],
      ['Liquefactive (Colliquative)', 'Enzymatic lysis & hydrolytic digestion dominates; rapid cellular liquefaction', 'Soft, viscous, fluid-filled cystic cavity or semi-liquid debris (abscess)', 'Total loss of tissue architecture; cystic cavity with necrotic debris, foamy lipid-laden macrophages', 'Brain ischemic stroke (cerebral infarct), pyogenic bacterial abscesses, amebic liver abscess'],
      ['Caseous Necrosis', 'Combination of coagulative and liquefactive necrosis in delayed-type hypersensitivity', 'Friable, yellowish-white, soft "cottage-cheese" like appearance', 'Central amorphous eosinophilic structureless debris surrounded by epithelioid cells & Langhans giant cells', 'Mycobacterium tuberculosis infection (pulmonary & scrofulous lymphadenitis), Histoplasmosis'],
      ['Fat Necrosis (Enzymatic)', 'Pancreatic lipases hydrolyze neutral fats into free fatty acids which bind Ca2+ (Saponification)', 'Opaque, chalky-white, gritty deposits on peritoneal fat or omentum', 'Shadowy outlines of dead adipocytes with basophilic calcium soap deposits and foamy histiocytes', 'Acute pancreatitis; Traumatic fat necrosis of breast'],
      ['Fibrinoid Necrosis', 'Immune-complex (Ag-Ab) and fibrin deposition in arterial walls with vascular injury', 'Arterial walls appear thickened, rubbery, with surrounding purpura or petechiae', 'Circumferential, homogeneous, brightly eosinophilic (smudgy pink) fibrin-like material in vessel media', 'Polyarteritis nodosa, Malignant hypertension, Aschoff nodule in RHD, Arthus reaction'],
      ['Gangrenous Necrosis', 'Ischemic coagulative necrosis modified by superadded bacterial putrefaction or liquefaction', 'Black, mummified limb (Dry) OR swollen, dark, foul-smelling, putrid tissue (Wet)', 'Coagulative ghost cells (Dry) OR massive bacterial liquefactive necrosis with gas bubbles (Gas)', 'Diabetic foot gangrene, senile gangrene (atherosclerosis), strangulated bowel hernia, gas gangrene']
    ]
  },
  {
    id: 'tbl-dry-vs-wet-vs-gas-gangrene',
    title: '5. Dry vs Wet vs Gas Gangrene',
    description: 'Essential surgical pathology comparison across etiology, moisture, line of demarcation, and toxemia.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Feature', 'Dry Gangrene', 'Wet Gangrene', 'Gas Gangrene'],
    rows: [
      ['Primary Site', 'Distal extremities (toes, feet, fingers)', 'Moist internal organs (bowel, lung, cervix, vulva) or diabetic foot', 'Deep contaminated muscle wounds (thigh, buttocks, war wounds)'],
      ['Vascular Etiology', 'Gradual arterial occlusion with patent venous return (Atherosclerosis, Buerger)', 'Sudden arterial AND venous blockage, or infected diabetic tissue', 'Deep trauma / lacerations with arterial compromise and clostridial spores'],
      ['Bacterial Putrefaction', 'Minimal or absent (tissues dry out before bacteria can multiply)', 'Severe, active, aggressive putrefaction by saprophytic bacteria', 'Clostridium perfringens releasing alpha-lecithinase toxin & producing gas'],
      ['Tissue Consistency', 'Dry, shriveled, mummified, hard, black', 'Soft, swollen, edematous, boggy, dark purplish-black', 'Tense, swollen, crepitant (crepitus on palpation), brownish exudate'],
      ['Line of Demarcation', 'Sharp, clear line of demarcation between living and dead tissue', 'No clear line of demarcation; spreads rapidly into adjacent tissue', 'No demarcation; spreads along muscle fascial planes explosively'],
      ['Odor', 'No foul smell (dry mummification)', 'Extremely foul, putrid, offensive stench', 'Sweetish, sickeningly foul odor with gas bubbling on pressure'],
      ['Systemic Toxemia', 'Mild or absent; patient remains stable', 'Severe, profound toxemia, fever, septic shock', 'Fatal systemic toxemia, intravascular hemolysis, renal failure, death'],
      ['Prognosis & Rx', 'Better; localized auto-amputation or elective surgery', 'Poor; emergency surgical debridement / amputation required', 'Extremely grave; emergency fasciotomy, high-dose penicillin, hyperbaric O2']
    ]
  },
  {
    id: 'tbl-dystrophic-vs-metastatic-calcification',
    title: '6. Dystrophic vs Metastatic Pathological Calcification',
    description: 'Comparative differentiation based on serum calcium levels, target tissue viability, pathogenesis, and locations.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Parameter', 'Dystrophic Calcification', 'Metastatic Calcification'],
    rows: [
      ['Serum Calcium Level', 'Normal serum calcium levels (e.g., 8.5–10.5 mg/dL); normal phosphate', 'Elevated serum calcium (Hypercalcaemia, >11.0 mg/dL) or hyperphosphatemia'],
      ['Target Tissue State', 'Occurs in non-viable, degenerating, dead, or necrotic tissues', 'Occurs in normal, previously healthy, viable living tissues throughout the body'],
      ['Calcium Metabolism', 'Normal systemic calcium/phosphate metabolism and normal parathyroid function', 'Abnormal systemic calcium homeostasis (hyperparathyroidism, bone destruction, vit D excess)'],
      ['Primary Mechanism', 'Local cell death releases membrane phosphatases + acidic phospholipids that nucleate Ca2+', 'High circulating serum Ca2+ × PO4 product exceeds solubility limit, precipitating in tissues'],
      ['Predilection Sites', 'Atherosclerotic plaques, calcific aortic stenosis, Ghon focus (TB), fat necrosis, lithopedion', 'Internal organs with alkaline environment: Gastric mucosa, alveolar lung septa, renal tubules, arteries'],
      ['Clinical Significance', 'Local mechanical dysfunction (e.g., calcified stenotic heart valve causing heart failure)', 'Systemic nephrocalcinosis causing chronic renal failure, pulmonary calcification, peptic ulceration'],
      ['Reversibility', 'Irreversible permanent crystalline deposit', 'Can regress if underlying hypercalcemia is corrected medically']
    ]
  },
  {
    id: 'tbl-cellular-adaptations-master',
    title: '7. Master Comparison of Cellular Adaptations',
    description: 'Systematic comparison across Hypertrophy, Hyperplasia, Atrophy, Metaplasia, and Dysplasia.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Adaptation Type', 'Fundamental Cellular Change', 'Typical Triggering Stimulus', 'Cell Division Capability', 'Classic Clinical Examples', 'Malignancy Risk'],
    rows: [
      ['Hypertrophy', 'Increase in individual cell size and functional protein mass without change in cell number', 'Increased mechanical workload or specific endocrine stimulation', 'Permanent non-dividing cells (Cardiomyocytes, skeletal muscle) or smooth muscle', 'Left ventricular hypertrophy in hypertension; bodybuilder biceps; pregnant uterus', 'No malignant potential'],
      ['Hyperplasia', 'Increase in total cell number resulting from active mitotic division of stem/progenitor cells', 'Hormonal stimulation or compensatory demand after tissue loss', 'Labile and stable dividing cells (Epithelia, glands, bone marrow, hepatocytes)', 'Endometrial hyperplasia; BPH; liver regeneration after partial hepatectomy; lactating breast', 'Pathological hyperplasias provide fertile soil for dysplastic/malignant transformation'],
      ['Atrophy', 'Decrease in cell size and mass due to reduced protein synthesis and increased ubiquitin proteasome lysis', 'Disuse, denervation, ischemia, malnutrition, endocrine withdrawal, pressure', 'All cell types (permanent, stable, and labile)', 'Immobilized cast limb; senile brain atrophy; postmenopausal endometrial atrophy; cachexia', 'No malignant potential'],
      ['Metaplasia', 'Reversible substitution of one mature differentiated cell type by another adult cell lineage', 'Chronic physical, chemical, or infective irritation/stress', 'Stem cells of epithelial or mesenchymal tissues', 'Squamous metaplasia of respiratory tract in smokers; Barrett esophagus in chronic GERD', 'Metaplasia itself is benign, but persistent stimulus can evolve into dysplasia and adenocarcinoma'],
      ['Dysplasia', 'Disordered cellular development with architectural disarray, cellular pleomorphism, atypia', 'Persistent severe irritation, viral oncoproteins (HPV), chronic inflammation', 'Epithelial surfaces (cervix, bronchus, stomach)', 'Cervical intraepithelial neoplasia (CIN) on Pap smear; bronchial dysplasia in heavy smokers', 'High premalignant risk; considered a direct morphological precursor to carcinoma in situ']
    ]
  },
  {
    id: 'tbl-hypertrophy-vs-hyperplasia',
    title: '8. Hypertrophy vs Hyperplasia',
    description: 'Specific focus table comparing cellular size vs numerical multiplication.',
    examImportance: 'HIGH YIELD',
    headers: ['Feature', 'Hypertrophy', 'Hyperplasia'],
    rows: [
      ['Primary Mechanism', 'Increased synthesis of structural proteins, myofilaments and organelles per cell', 'Growth-factor driven proliferation of mature cells and increased output from tissue stem cells'],
      ['Cell Capability', 'Occurs in cells with NO mitotic capacity (permanent cells) as well as dividing cells', 'Occurs ONLY in cells capable of mitosis (labile and stable cells)'],
      ['Organ Size', 'Increased total organ size and weight due to enlarged cells', 'Increased total organ size and weight due to increased cell count'],
      ['Co-occurrence', 'Frequently occurs concurrently with hyperplasia in smooth muscle (e.g. gravid uterus)', 'Frequently occurs concurrently with hypertrophy in hormone-responsive organs'],
      ['Signal Pathways', 'Mechanical stretch sensors (integrins) → GATA4, NFAT, MEF2 transcription factors', 'Growth factors (EGF, TGF-alpha, HGF) binding receptor tyrosine kinases → MAP kinase pathway']
    ]
  },
  {
    id: 'tbl-metaplasia-vs-dysplasia-vs-carcinoma',
    title: '9. Metaplasia vs Dysplasia vs Invasive Carcinoma',
    description: 'Pathological spectrum from benign adaptive differentiation to malignant stromal invasion.',
    examImportance: 'VERY HIGH-YIELD / EXAM FAVOURITE',
    headers: ['Feature', 'Metaplasia', 'Dysplasia (Atypical Hyperplasia)', 'Invasive Carcinoma'],
    rows: [
      ['Nature of Lesion', 'Benign, fully mature, orderly cellular substitution', 'Disordered, atypical, premalignant epithelial proliferation', 'Malignant epithelial neoplasm with uncontrolled autonomous growth'],
      ['Cellular Differentiation', 'Completely mature and normal in appearance for the replaced cell type', 'Immature, pleomorphic cells with loss of architectural orientation', 'Anaplastic or poorly differentiated cells with high atypical mitoses'],
      ['Nuclear Characteristics', 'Normal nuclear-to-cytoplasmic (N:C) ratio; uniform round/oval nuclei', 'Increased N:C ratio, hyperchromasia, clumped chromatin, prominent nucleoli', 'Markedly elevated N:C ratio (1:1), marked hyperchromasia, bizarre giant nuclei'],
      ['Mitotic Figures', 'Normal basal mitoses only', 'Increased mitoses present in middle and upper layers of epithelium', 'Abundant, bizarre, multipolar, atypical tri-polar/quadri-polar mitotic figures'],
      ['Basement Membrane', 'Strictly INTACT; no breach whatsoever', 'Strictly INTACT; entire process is confined above basement membrane', 'BREACHED and destroyed; tumor cells invade into stroma, lymphatics, and blood vessels'],
      ['Reversibility', 'Completely reversible upon cessation of injurious stimulus', 'Reversible in mild-to-moderate grades (CIN I/II); severe often irreversible', 'Completely IRREVERSIBLE; requires surgical excision, chemotherapy, radiotherapy']
    ]
  },
  {
    id: 'tbl-adaptation-vs-reversible-vs-irreversible',
    title: '10. Cellular Adaptation vs Reversible Injury vs Irreversible Injury',
    description: 'The complete biological continuum connecting normal homeostasis to cellular death.',
    examImportance: 'CORE CONCEPT',
    headers: ['Parameter', 'Cellular Adaptation', 'Reversible Cell Injury', 'Irreversible Cell Injury (Cell Death)'],
    rows: [
      ['Magnitude of Stress', 'Moderate, chronic, persistent non-lethal physiological or pathological stress', 'Mild-to-moderate acute or transient injurious stimulus', 'Severe, persistent, overwhelming, acute or lethal injurious insult'],
      ['Cell Viability', 'Fully viable; operates under a newly adjusted steady-state equilibrium', 'Viable, but functions at a subnormal, compromised efficiency level', 'Non-viable; cell is dead or irreversibly committed to death (necrosis/apoptosis)'],
      ['Key Morphological Feature', 'Altered cell size (hypertrophy/atrophy), number (hyperplasia), or phenotype (metaplasia)', 'Cellular swelling (hydropic change) and fatty change (steatosis); plasma membrane blebs', 'Severe mitochondrial disruption, amorphous densities, membrane rupture, pyknosis/karyolysis'],
      ['Membrane Permeability', 'Intact normal selective permeability', 'Slightly altered; electrolyte pumps impaired, but membrane remains structurally intact', 'Massive loss of membrane integrity with rupture and leakage of intracellular enzymes into serum'],
      ['Outcome on Stress Removal', 'Reverts smoothly back to original histological baseline structure and size', 'Complete anatomical and biochemical restitution to normal state', 'Permanent tissue destruction, inflammatory clearance, repair by fibrosis/scarring']
    ]
  }
];

export const cellInjuryClinicalCases: ClinicalCaseStudy[] = [
  {
    id: 'case-1-lvh',
    caseNumber: 1,
    title: 'Longstanding Hypertension & Cardiac Enlargement',
    scenario: 'A 58-year-old male with a 15-year history of poorly controlled essential hypertension (BP 170/105 mmHg) presents with exertional dyspnea. Echocardiography demonstrates a thickened left ventricular wall of 18 mm (normal: 8–11 mm) with preserved ejection fraction and non-dilated ventricular cavity.',
    question: 'What cellular process has occurred in the myocardium, what is the underlying stimulus, and why did the heart not undergo hyperplasia?',
    diagnosis: 'Pathological Concentric Left Ventricular Hypertrophy (LVH).',
    pathologicalReasoning: 'Chronic elevated systemic vascular resistance imposes a sustained pressure overload on the left ventricle. In response, cardiomyocytes upregulate protein synthesis and assemble additional sarcomeres in parallel to normalize wall stress (Laplace Law). Because adult cardiomyocytes are permanent, post-mitotic cells incapable of cell division, the myocardium adapts exclusively through Hypertrophy (increase in cell size) rather than Hyperplasia.',
    histopathologyFindings: 'Enlarged cardiomyocytes with thickened transverse diameter, abundant eosinophilic sarcoplasm, and prominent, enlarged, hyperchromatic "boxcar-shaped" rectangular nuclei.',
    examTakeaway: 'Permanent cells (cardiac myocytes, skeletal muscle, neurons) adapt solely via Hypertrophy when subjected to increased functional demand.',
    homoeopathicRelevance: 'Corresponds to Sycotic induration and overgrowth under chronic strain; remedies such as Baryta Muriatica, Aurum Metallicum, and Crataegus Oxyacantha possess deep affinity for hypertensive cardiomegaly.'
  },
  {
    id: 'case-2-disuse-atrophy',
    caseNumber: 2,
    title: 'Limb Immobilization Following Fracture',
    scenario: 'A 24-year-old athlete sustains a fractured right tibia and fibula, which is immobilized in a plaster cast for 8 weeks. Upon cast removal, the circumference of the right calf is 4.5 cm smaller than the uninjured left calf. Power is reduced, but sensation and reflexes remain intact.',
    question: 'Identify the cellular adaptive process, explain the biochemical mechanism of muscle mass reduction, and state whether this change is reversible.',
    diagnosis: 'Disuse Atrophy of Skeletal Muscle.',
    pathologicalReasoning: 'Immobilization leads to marked reduction in functional metabolic workload. This triggers a decrease in protein synthesis combined with an accelerated degradation of structural myofibrillar proteins via the Ubiquitin-Proteasome Pathway. Autophagic vacuoles also degrade obsolete organelles.',
    histopathologyFindings: 'Shrunken skeletal muscle fibers with reduced cross-sectional diameter, preserved striations, increased density of sarcolemmal nuclei, and mild lipofuscin accumulation.',
    examTakeaway: 'Disuse atrophy is completely reversible upon restoration of physical activity and progressive resistance exercise.',
    homoeopathicRelevance: 'Psoric functional retreat transitioning into atrophy; remedies like Plumbum Metallicum, Causticum, and Arnica aid muscular recovery after trauma and immobilization.'
  },
  {
    id: 'case-3-squamous-metaplasia',
    caseNumber: 3,
    title: 'Chronic Cigarette Smoking & Respiratory Epithelium',
    scenario: 'A 52-year-old heavy smoker (30 pack-years) complains of chronic morning cough with mucoid sputum. Bronchoscopic biopsy from the main bronchus reveals replacement of the normal ciliated pseudostratified columnar epithelium by a multi-layered stratified squamous epithelium with intact basement membrane and no cellular atypia.',
    question: 'Name the adaptive change, explain its teleological purpose, its immediate physiological disadvantage, and its potential long-term hazard.',
    diagnosis: 'Squamous Metaplasia of the Respiratory Tract.',
    pathologicalReasoning: 'Chronic exposure to toxic cigarette smoke components irritates the delicate ciliated columnar lining. In response, local undifferentiated reserve/stem cells are reprogrammed to differentiate into stratified squamous epithelium, which is rugged and better equipped to withstand physical and chemical irritation.',
    histopathologyFindings: 'Sheets of mature, differentiated squamous epithelial cells with intercellular bridges overlying an intact basement membrane; absence of cilia and mucus-secreting goblet cells.',
    examTakeaway: 'Metaplasia is a double-edged sword: while tough, the loss of mucociliary clearance impairs defense against infections; continued smoking may induce Dysplasia and ultimately Squamous Cell Bronchogenic Carcinoma.',
    homoeopathicRelevance: 'Sycotic-psoric transformation under persistent irritation; remedies include Drosera, Lobelia Inflata, and Tabacum.'
  },
  {
    id: 'case-4-mi-coagulative-necrosis',
    caseNumber: 4,
    title: 'Acute Coronary Occlusion & Myocardial Necrosis',
    scenario: 'A 64-year-old diabetic male experiences sudden crushing retrosternal chest pain radiating to the left arm for 4 hours. ECG reveals ST-elevation in leads V1–V4. Serum Cardiac Troponin I is markedly elevated at 14.8 ng/mL (normal <0.04 ng/mL). Coronary angiography reveals acute thrombotic occlusion of the Left Anterior Descending (LAD) artery.',
    question: 'What type of necrosis occurs in the myocardium, what is the earliest light microscopic finding, and why did troponin leak into the bloodstream?',
    diagnosis: 'Acute Myocardial Infarction with Coagulative Necrosis.',
    pathologicalReasoning: 'Sudden complete coronary occlusion causes profound ischemia, halting oxidative phosphorylation. ATP depletion leads to intracellular acidosis, which denatures both structural and catalytic/lysosomal enzymes. This prevents immediate autolysis, preserving the structural "ghost" outlines of the cardiomyocytes.',
    histopathologyFindings: 'Wavy myofibers, cytoplasmic hypereosinophilia (loss of RNA basophilia), loss of cross-striations, contraction bands, progressive nuclear pyknosis/karyolysis, and dense neutrophilic infiltration at the border zone.',
    examTakeaway: 'Serum biomarkers (Troponin I/T, CK-MB) rise in blood ONLY after irreversible rupture of the cardiomyocyte plasma membrane allows intracellular proteins to escape.',
    homoeopathicRelevance: 'Acute Syphilitic tissue destruction on a Sycotic atherosclerotic base; urgent emergency medical resuscitation alongside indicated remedies like Lachesis, Crotalus Horridus, Cactus Grandiflorus, and Digitalis.'
  },
  {
    id: 'case-5-cerebral-liquefactive-necrosis',
    caseNumber: 5,
    title: 'Sudden Hemiplegia & Cerebral Infarction',
    scenario: 'A 71-year-old woman with atrial fibrillation presents with sudden onset of right-sided hemiplegia and expressive aphasia. Brain MRI at 72 hours shows a well-demarcated area of low density in the left middle cerebral artery territory. Autopsy weeks later reveals a fluid-filled cystic cavity lined by glial tissue.',
    question: 'Why does brain infarction result in Liquefactive necrosis rather than Coagulative necrosis?',
    diagnosis: 'Cerebral Infarction with Liquefactive (Colliquative) Necrosis.',
    pathologicalReasoning: 'The central nervous system (CNS) has a very high lipid and water content and virtually no collagenous fibrous framework. Following ischemic death, brain cells release abundant hydrolytic lysosomal enzymes, which completely digest and liquefy the dead neural tissue, transforming it into a viscous fluid mass that is cleared by microglial foam cells to leave a cystic cavity (encephalomalacia).',
    histopathologyFindings: 'Disintegrated brain parenchyma replaced by foamy lipid-laden macrophages (Gitter cells), abundant necrotic debris, proliferating gemistocytic astrocytes (Gliosis), and neo-capillaries.',
    examTakeaway: 'Brain is the ONLY solid organ in the body where ischemic infarction produces Liquefactive necrosis (not coagulative necrosis).',
    homoeopathicRelevance: 'Syphilitic destruction with rapid liquefactive softening of nerve tissue; remedies include Bothrops Lanceolatus, Opium, Arnica, and Kali Phosphoricum.'
  },
  {
    id: 'case-6-tuberculosis-caseous-necrosis',
    caseNumber: 6,
    title: 'Chronic Cough, Hemoptysis & Apical Cavitation',
    scenario: 'A 28-year-old man presents with low-grade evening fever, night sweats, weight loss, and cough with blood-streaked sputum for 2 months. Chest X-ray reveals a cavitary lesion in the right lung apex. Sputum Ziehl-Neelsen stain is positive for Acid-Fast Bacilli (AFB).',
    question: 'Name the type of necrosis, explain the pathogenesis of its "cheese-like" appearance, and describe the microscopic architecture of the granuloma.',
    diagnosis: 'Pulmonary Tuberculosis with Caseous Necrosis.',
    pathologicalReasoning: 'Mycobacterium tuberculosis triggers a cell-mediated (Type IV / Delayed-type) hypersensitivity immune response. Activated CD4+ Th1 lymphocytes secrete IFN-gamma, activating macrophages into epithelioid cells. The combination of macrophage-derived TNF-alpha, reactive nitrogen intermediates, and mycobacterial lipid-rich cell walls (mycolic acids, cord factor) results in incomplete coagulative and liquefactive necrosis, producing yellowish-white, cheesy material.',
    histopathologyFindings: 'Central amorphous, granular, structureless, pink eosinophilic caseous debris bordered by a pallisade of epithelioid cells, Langhans multinucleated giant cells with horseshoe nuclei, and an outer rim of CD4+ T lymphocytes and fibroblasts.',
    examTakeaway: 'Caseous necrosis is pathognomonic of Tuberculosis and certain deep fungal infections; special ZN stain confirms Acid-Fast Bacilli (AFB).',
    homoeopathicRelevance: 'Classic Tubercular miasm (Psora + Syphilis); primary constitutional remedies include Tuberculinum Bovinum, Bacillinum, Phosphorus, Arsenicum Iodatum, and Drosera.'
  },
  {
    id: 'case-7-pancreatitis-fat-necrosis',
    caseNumber: 7,
    title: 'Severe Epigastric Pain & Chalky White Deposits',
    scenario: 'A 44-year-old chronic alcoholic presents with agonizing epigastric pain radiating directly to the back, vomiting, and tachycardia after a binge. Serum amylase (2,400 U/L) and lipase (3,100 U/L) are markedly elevated. During exploratory laparotomy, the surgeon notes multiple opaque, chalky-white, gritty flecks scattered across the greater omentum and mesentery.',
    question: 'Explain the biochemical sequence that produced the chalky-white spots (saponification) and why the patient is at risk of hypocalcemia.',
    diagnosis: 'Acute Pancreatitis with Enzymatic Fat Necrosis.',
    pathologicalReasoning: 'Acinar cell injury leads to premature intra-pancreatic activation of trypsinogen to trypsin, which in turn activates pancreatic lipases and phospholipases. These enzymes leak into the peripancreatic peritoneal cavity, hydrolyzing neutral triglycerides within adipocytes into free fatty acids. The released free fatty acids combine with ionized serum calcium (Ca2+) to form insoluble calcium soaps (Saponification).',
    histopathologyFindings: 'Shadowy, necrotic outlines of adipocytes filled with basophilic, hazy calcium soaps, surrounded by intense acute neutrophilic inflammation and interstitial hemorrhage.',
    examTakeaway: 'Massive saponification binds and sequesters large amounts of systemic calcium, causing severe Hypocalcemia (a major poor prognostic indicator in Ranson criteria).',
    homoeopathicRelevance: 'Severe destructive syphilitic enzymatic crisis; indicated remedies include Iris Versicolor, Belladonna, Phosphorus, and Mercurius Corrosivus.'
  },
  {
    id: 'case-8-radiation-apoptosis',
    caseNumber: 8,
    title: 'Radiation-Induced DNA Damage & Cell Suicide',
    scenario: 'A 35-year-old female receiving pelvic radiotherapy for cervical carcinoma undergoes serial mucosal biopsies. Histology demonstrates scattered, solitary, shrunken epithelial cells with condensed pyknotic chromatin, cytoplasmic eosinophilia, and small membrane-bound apoptotic bodies without any surrounding neutrophilic infiltration.',
    question: 'Identify the form of cell death, explain the sensor protein and caspase cascade involved, and explain why there is no inflammation.',
    diagnosis: 'Radiation-Induced Apoptosis (Programmed Cell Death).',
    pathologicalReasoning: 'Ionizing radiation induces double-stranded DNA breaks, which activates the p53 tumor suppressor gene. p53 halts the cell cycle and upregulates pro-apoptotic BH3-only proteins (PUMA, NOXA, BAX), which permeabilize the mitochondrial membrane, releasing Cytochrome c. Cytochrome c binds APAF-1, activating Caspase-9, which activates executioner Caspase-3, neatly dismantling the cell into apoptotic bodies.',
    histopathologyFindings: 'Individual, isolated, shrunken cells with dense chromatin fragments, halo around apoptotic bodies, and intact plasma membranes expressing phosphatidylserine, rapidly engulfed by adjacent macrophages.',
    examTakeaway: 'Apoptosis does not trigger inflammation because intact cell membranes prevent the leakage of intracellular damage-associated molecular patterns (DAMPs).',
    homoeopathicRelevance: 'Regulated biological elimination; remedies for radiation injury include Radium Bromatum, X-Ray, Cadmium Sulphuricum, and Sol.'
  },
  {
    id: 'case-9-atherosclerosis-dystrophic-calcification',
    caseNumber: 9,
    title: 'Calcified Abdominal Aorta & Normal Serum Calcium',
    scenario: 'A 73-year-old male undergoing routine abdominal CT scan for kidney stones is found to have extensive, rock-hard, brittle, circumferential calcification throughout the wall of his abdominal aorta. Laboratory evaluation reveals Serum Calcium of 9.2 mg/dL (normal: 8.5–10.5 mg/dL) and Serum Phosphate of 3.4 mg/dL (normal: 2.5–4.5 mg/dL).',
    question: 'What type of pathological calcification is present, what is its pathogenesis, and why are serum calcium levels normal?',
    diagnosis: 'Dystrophic Calcification in Atherosclerotic Aortic Plaques.',
    pathologicalReasoning: 'Dystrophic calcification occurs specifically in necrotic, degenerating, or dying tissues in the presence of completely normal serum calcium levels. In advanced atheromatous plaques, dying foam cells and necrotic core debris release membrane-derived acidic phospholipids and alkaline phosphatase, which serve as nucleation sites for the progressive deposition of calcium phosphate crystals (hydroxyapatite).',
    histopathologyFindings: 'Basophilic, deeply purple, amorphous or crystalline calcium deposits embedded within dense fibromuscular stroma and necrotic lipid-rich atheromatous core.',
    examTakeaway: 'Dystrophic calcification requires dead/dying tissue and occurs with NORMAL serum calcium; Metastatic calcification occurs in normal viable tissues with HIGH serum calcium.',
    homoeopathicRelevance: 'Sycotic atheroma culminating in Syphilitic calcific induration; remedies include Calcarea Fluorica, Baryta Carbonica, and Plumbum Iodatum.'
  },
  {
    id: 'case-10-hyperparathyroidism-metastatic-calcification',
    caseNumber: 10,
    title: 'Parathyroid Adenoma & Metastatic Calcification',
    scenario: 'A 49-year-old woman presents with recurrent renal calculi, peptic ulcer disease, and bone aches ("stones, bones, groans, and psychic moans"). Blood tests reveal Serum Calcium 13.8 mg/dL (markedly high), Serum Phosphate 1.8 mg/dL (low), and Serum Parathyroid Hormone (PTH) 380 pg/mL (elevated). Chest CT reveals diffuse microcalcifications throughout the alveolar septa of both lungs and the gastric mucosa.',
    question: 'Name the type of calcification, explain why it preferentially targets the lungs, stomach, and kidneys, and state its clinical consequences.',
    diagnosis: 'Metastatic Calcification secondary to Primary Hyperparathyroidism.',
    pathologicalReasoning: 'Parathyroid adenoma secretes excessive PTH, driving osteoclastic bone resorption and renal calcium retention, causing severe Hypercalcemia. When the serum Ca2+ × PO4 product exceeds solubility limits, calcium precipitates in normal viable tissues. It has a high predilection for the lungs, gastric mucosa, and renal tubules because these organs excrete acid (CO2 in lungs, HCl in stomach, acid in renal tubules), creating an alkaline internal milieu that favors calcium salt precipitation.',
    histopathologyFindings: 'Fine, granular, basophilic calcium deposits outlining the basement membranes of pulmonary alveolar capillaries, gastric glandular epithelium, and renal tubular basolateral membranes.',
    examTakeaway: 'Metastatic calcification affects normal living tissues due to systemic hypercalcemia, preferentially targeting acid-secreting organs with high internal pH.',
    homoeopathicRelevance: 'Systemic metabolic dyscrasia; primary remedies include Parathyroidinum, Calcarea Carbonica, Phosphorus, and Symphytum.'
  }
];

export const cellInjuryGlossaryDefinitions: ExamDefinitionItem[] = [
  {
    term: 'Cell Injury',
    oneLineDefinition: 'A state of altered cellular structure and function occurring when exogenous or endogenous stresses exceed the homeostatic and adaptive capability of the cell.',
    expandedExplanation: 'Cell injury results when stress exceeds cellular defenses. It ranges from reversible sub-lethal changes (hydropic swelling, fatty change) to irreversible lethal injury (necrosis, apoptosis).',
    keyExample: 'Ischemic injury to cardiomyocytes following coronary artery occlusion.',
    examKeyword: 'Homeostatic disruption, Reversible vs Irreversible'
  },
  {
    term: 'Cellular Adaptation',
    oneLineDefinition: 'A reversible state of adjusted structural and functional equilibrium achieved by a cell in response to physiological or pathological stresses.',
    expandedExplanation: 'Enables the cell to survive and function under altered conditions. Includes hypertrophy, hyperplasia, atrophy, and metaplasia.',
    keyExample: 'Left ventricular hypertrophy in chronic systemic hypertension.',
    examKeyword: 'New steady state, Reversible'
  },
  {
    term: 'Hypertrophy',
    oneLineDefinition: 'An increase in the size of cells, resulting in an overall increase in the size of the organ, without an increase in cell number.',
    expandedExplanation: 'Occurs in permanent, non-dividing cells (e.g., cardiomyocytes, skeletal muscle) through increased synthesis of structural proteins and myofilaments.',
    keyExample: 'Skeletal muscle hypertrophy in weightlifters; pregnant myometrium.',
    examKeyword: 'Increased cell size, Non-dividing cells'
  },
  {
    term: 'Hyperplasia',
    oneLineDefinition: 'An increase in the number of cells in an organ or tissue, resulting in increased organ mass.',
    expandedExplanation: 'Occurs only in tissues containing labile or stable cells capable of mitotic division in response to growth factors and hormones.',
    keyExample: 'Endometrial hyperplasia due to excess estrogen; Benign Prostatic Hyperplasia (BPH).',
    examKeyword: 'Increased cell number, Mitotic division'
  },
  {
    term: 'Atrophy',
    oneLineDefinition: 'A reduction in the size and mass of an organ or tissue resulting from a decrease in cell size and/or cell number.',
    expandedExplanation: 'Caused by reduced protein synthesis and accelerated protein degradation via the ubiquitin-proteasome pathway, along with increased autophagy.',
    keyExample: 'Disuse atrophy of a limb in a plaster cast; senile cerebral atrophy.',
    examKeyword: 'Reduced cell size/mass, Ubiquitin-proteasome'
  },
  {
    term: 'Metaplasia',
    oneLineDefinition: 'A reversible change in which one adult differentiated cell type (epithelial or mesenchymal) is replaced by another adult cell type better able to withstand stress.',
    expandedExplanation: 'Results from stem cell reprogramming in response to chronic irritation. While adaptive, it is associated with loss of specialized function and potential dysplastic progression.',
    keyExample: 'Columnar to squamous metaplasia in the bronchus of chronic smokers; Barrett esophagus.',
    examKeyword: 'Reversible adult cell substitution, Stem cell reprogramming'
  },
  {
    term: 'Dysplasia',
    oneLineDefinition: 'Disordered cellular development characterized by loss of architectural orientation, cellular pleomorphism, nuclear hyperchromasia, and increased mitoses without breach of basement membrane.',
    expandedExplanation: 'Considered a true premalignant lesion (atypical hyperplasia). It does not breach the basement membrane (unlike invasive carcinoma).',
    keyExample: 'Cervical Intraepithelial Neoplasia (CIN) on Pap smear.',
    examKeyword: 'Disordered growth, Intact basement membrane, Premalignant'
  },
  {
    term: 'Reversible Cell Injury',
    oneLineDefinition: 'Mild or moderate cellular injury in which removal of the injurious stimulus allows complete restoration of normal cellular structure and function.',
    expandedExplanation: 'Characterized by cellular swelling (hydropic change) due to Na+/K+ pump failure, fatty change (steatosis), plasma membrane blebbing, and ER dilation.',
    keyExample: 'Transient myocardial ischemia (angina) resolving with rest/nitroglycerin.',
    examKeyword: 'Hydropic swelling, Reversible on reperfusion'
  },
  {
    term: 'Irreversible Cell Injury',
    oneLineDefinition: 'Severe, lethal cellular damage from which the cell cannot recover, inevitably culminating in cell death.',
    expandedExplanation: 'Marked by two cardinal hallmarks: inability to reverse mitochondrial dysfunction (MPTP opening) and profound loss of plasma membrane integrity.',
    keyExample: 'Myocardial infarction with persistent coronary thrombosis.',
    examKeyword: 'Point of no return, Mitochondrial & Membrane collapse'
  },
  {
    term: 'Necrosis',
    oneLineDefinition: 'Pathological cell and tissue death characterized by severe membrane lysis and enzymatic degradation of dead cells, accompanied by an inflammatory response.',
    expandedExplanation: 'Always pathological, involving groups of cells, swelling (oncosis), leakage of intracellular enzymes, and acute inflammatory recruitment.',
    keyExample: 'Coagulative necrosis in acute myocardial infarction.',
    examKeyword: 'Enzymatic lysis, Membrane rupture, Inflammation'
  },
  {
    term: 'Apoptosis',
    oneLineDefinition: 'A pathway of programmed, energy-dependent single-cell death mediated by caspases, where the cell dismantles itself into apoptotic bodies without triggering inflammation.',
    expandedExplanation: 'Can be physiological (embryogenesis) or pathological (DNA damage). Operates via intrinsic (mitochondrial) and extrinsic (death receptor) caspase cascades.',
    keyExample: 'Endometrial shedding during menstruation; viral hepatitis Councilman bodies.',
    examKeyword: 'Programmed suicide, Caspases, No inflammation'
  },
  {
    term: 'Autolysis',
    oneLineDefinition: 'The self-digestion of cells and tissues by their own intracellular lysosomal enzymes following somatic death or tissue removal from the body.',
    expandedExplanation: 'Unlike necrosis in living tissue, postmortem autolysis occurs without any vital cellular or inflammatory host reaction.',
    keyExample: 'Postmortem softening and liquefaction of tissues in a cadaver.',
    examKeyword: 'Self-digestion, Postmortem, No inflammation'
  },
  {
    term: 'Steatosis (Fatty Change)',
    oneLineDefinition: 'The abnormal intracellular accumulation of neutral triglycerides within the cytoplasm of parenchymal cells.',
    expandedExplanation: 'Most common in the liver, followed by heart, skeletal muscle, and kidneys. Microscopic appearance shows clear lipid vacuoles that stain with Oil Red O.',
    keyExample: 'Alcoholic and non-alcoholic fatty liver disease (NAFLD).',
    examKeyword: 'Triglyceride accumulation, Oil Red O'
  },
  {
    term: 'Hydropic Change (Cloudy Swelling)',
    oneLineDefinition: 'The earliest light-microscopic manifestation of reversible cell injury, characterized by intracellular accumulation of water and cellular swelling.',
    expandedExplanation: 'Caused by failure of the energy-dependent Na+/K+ ATPase pump, leading to intracellular sodium and water retention and distended ER cisternae.',
    keyExample: 'Cloudy swelling of renal proximal convoluted tubular cells in shock.',
    examKeyword: 'Na+/K+ pump failure, Clear cytoplasmic vacuoles'
  },
  {
    term: 'Pyknosis',
    oneLineDefinition: 'Nuclear shrinkage and increased basophilia, where the nucleus transforms into a small, dense, dark, condensed chromatic mass.',
    expandedExplanation: 'One of the three cardinal sequential nuclear changes of necrotic cell death.',
    keyExample: 'Pyknotic nuclei in necrotic tubular epithelial cells.',
    examKeyword: 'Nuclear shrinkage, Dense condensation'
  },
  {
    term: 'Karyorrhexis',
    oneLineDefinition: 'The fragmentation and rupture of a pyknotic nucleus into multiple small, dense chromatin fragments scattered in the cytoplasm.',
    expandedExplanation: 'Second stage of necrotic nuclear degeneration following pyknosis.',
    keyExample: 'Fragmented nuclei in acute neutrophilic exudates (leukocytoclasia).',
    examKeyword: 'Nuclear fragmentation'
  },
  {
    term: 'Karyolysis',
    oneLineDefinition: 'The dissolution and fading of the necrotic nucleus caused by the enzymatic action of deoxyribonucleases (DNase).',
    expandedExplanation: 'Final stage of nuclear breakdown in necrosis, resulting in complete disappearance of the nucleus within 1–2 days.',
    keyExample: 'Ghost cells with absent nuclei in coagulative infarct.',
    examKeyword: 'Nuclear dissolution, Enzymatic fading'
  },
  {
    term: 'Dystrophic Calcification',
    oneLineDefinition: 'The pathological deposition of calcium phosphate salts in dead, dying, or degenerated tissues in the presence of completely normal serum calcium levels.',
    expandedExplanation: 'Initiated by membrane phospholipid nucleation in necrotic debris; systemic calcium and parathyroid hormones are normal.',
    keyExample: 'Calcification in atherosclerotic plaques, Ghon tuberculous foci, and calcific aortic stenosis.',
    examKeyword: 'Dead tissue, Normal serum calcium'
  },
  {
    term: 'Metastatic Calcification',
    oneLineDefinition: 'The deposition of calcium salts in normal, viable living tissues throughout the body, secondary to persistent systemic Hypercalcemia.',
    expandedExplanation: 'Results from hyperparathyroidism, bone metastases, or vitamin D toxicity. Preferentially affects lungs, stomach, and kidneys due to their internal alkaline pH.',
    keyExample: 'Alveolar and renal tubular calcification in primary hyperparathyroidism.',
    examKeyword: 'Viable tissue, Hypercalcemia'
  },
  {
    term: 'Free Radical',
    oneLineDefinition: 'An extremely reactive chemical species possessing a single unpaired electron in an outer orbital shell.',
    expandedExplanation: 'Includes Superoxide (O2•-), Hydroxyl radical (•OH), and Hydrogen peroxide (H2O2). Induces lipid peroxidation, protein cross-linking, and DNA fragmentation.',
    keyExample: 'Reactive Oxygen Species (ROS) in ischemia-reperfusion injury and radiation.',
    examKeyword: 'Unpaired electron, Lipid peroxidation, Oxidative stress'
  },
  {
    term: 'Lipofuscin',
    oneLineDefinition: 'An insoluble golden-brown "wear-and-tear" or aging pigment composed of polymers of peroxidized lipids and proteins resulting from organelle autophagy.',
    expandedExplanation: 'Accumulates in post-mitotic aging cells (myocardium, liver, neurons). Imparts a brown color to atrophic organs (Brown atrophy).',
    keyExample: 'Perinuclear golden-brown pigment granules in elderly myocardium.',
    examKeyword: 'Wear-and-tear, Aging pigment, Brown atrophy'
  },
  {
    term: 'Haemosiderin',
    oneLineDefinition: 'An endogenous, iron-containing, golden-yellow to brown granular pigment derived from the breakdown of hemoglobin in erythrocytes.',
    expandedExplanation: 'Represents aggregates of ferritin micropolymers. Confirmed specifically with Perls\' Prussian Blue special stain (bright blue).',
    keyExample: 'Heart failure cells (hemosiderin-laden alveolar macrophages) in chronic pulmonary congestion.',
    examKeyword: 'Iron pigment, Perls\' Prussian blue'
  }
];

export const cellInjuryLaqBank: LaqItem[] = [
  {
    id: 'laq-1-etiology-mechanisms',
    question: 'Define Cell Injury. Classify the causes of cell injury with examples. Describe in detail the biochemical pathogenesis of ischemic cell injury and differentiate reversible from irreversible injury.',
    marks: 10,
    nchCode: 'HomUG-PM I.2',
    structure: {
      introduction: 'Define cell injury as a state of altered homeostasis occurring when stress exceeds cellular adaptive limits. State that ischemia is the most common cause.',
      headings: [
        '1. Definition & Overview of Cell Injury',
        '2. Classification of Etiological Agents (Hypoxia, Physical, Chemical, Infectious, Immunologic, Genetic, Nutritional)',
        '3. Biochemical Pathogenesis of Ischemic Cell Injury (ATP depletion, Na+/K+ pump failure, Ca2+ influx, ROS, membrane breakdown)',
        '4. Ultrastructural & Light Microscopic Changes',
        '5. Systematic Comparison Table: Reversible vs Irreversible Cell Injury',
        '6. Conclusion & Clinical Significance'
      ],
      mainContentPoints: [
        'Define cell injury and distinguish hypoxia (reduced O2) from ischemia (reduced blood supply).',
        'Explain ATP depletion halting Na+/K+ pump -> cellular swelling.',
        'Explain switch to anaerobic glycolysis -> lactic acidosis -> chromatin clumping.',
        'Explain failure of Ca2+ pump -> cytosolic Ca2+ overload activating phospholipases and proteases.',
        'Explain mitochondrial permeability transition pore (MPTP) opening as point of no return.',
        'Detail morphological changes: cloudy swelling, fatty change, pyknosis, karyolysis.'
      ],
      diagramRecommendation: 'Flowchart of Ischemic Cell Injury Cascade (Oxygen deprivation -> ATP drop -> Ca2+ influx -> Membrane rupture).',
      conclusion: 'Reversible injury can recover upon timely reperfusion, whereas irreversible injury results in permanent parenchymal loss and release of cardiac/hepatic biomarkers.',
      examinerKeywords: ['ATP depletion', 'Na+/K+ ATPase failure', 'Intracellular Ca2+ influx', 'Mitochondrial Permeability Transition Pore (MPTP)', 'Pyknosis, Karyorrhexis, Karyolysis'],
      commonMistakes: [
        'Confusing hypoxia with ischemia (remember ischemia also deprives cells of glucose and prevents metabolite clearance).',
        'Omitting the specific enzymes activated by intracellular calcium overload (Phospholipases, Proteases, Endonucleases, ATPases).'
      ]
    }
  },
  {
    id: 'laq-2-necrosis-types',
    question: 'Define Necrosis. Describe the cytoplasmic and nuclear changes seen in necrotic cells. Classify the types of necrosis with pathognomonic macroscopic, microscopic features, and clinical examples.',
    marks: 10,
    nchCode: 'HomUG-PM I.4',
    structure: {
      introduction: 'Define necrosis as the morphological spectrum of pathological cell death in living tissue resulting from enzymatic degradation accompanied by inflammation.',
      headings: [
        '1. Definition of Necrosis & Distinction from Autolysis',
        '2. Morphological Hallmark Changes (Cytoplasmic Eosinophilia & Loss of RNA basophilia)',
        '3. Nuclear Degeneration Sequence (Pyknosis, Karyorrhexis, Karyolysis)',
        '4. Classification of Necrosis (Coagulative, Liquefactive, Caseous, Fat, Fibrinoid, Gangrenous)',
        '5. Detailed Gross & Microscopic Hallmarks of Each Type',
        '6. Special Emphasis: Why Brain Infarction Undergoes Liquefactive Necrosis',
        '7. Clinical Summary & Homoeopathic Correlation'
      ],
      mainContentPoints: [
        'Define necrosis and explain why adjacent inflammation is always triggered (DAMPs leakage).',
        'Detail nuclear sequence: Pyknosis (shrinkage) -> Karyorrhexis (fragmentation) -> Karyolysis (DNase dissolution).',
        'Coagulative: Denaturation dominates -> "tombstone" ghost cells in solid organs (Heart, Kidney, Spleen).',
        'Liquefactive: Enzymatic lysis dominates -> fluid cavity in brain stroke and bacterial abscesses.',
        'Caseous: Cheese-like friable debris in TB with epithelioid granuloma and Langhans giant cells.',
        'Fat necrosis: Saponification producing chalky-white calcium soaps in acute pancreatitis.',
        'Fibrinoid: Smudgy bright pink immune-complex deposition in vasculitis.'
      ],
      diagramRecommendation: 'Diagram of Nuclear Changes (Normal -> Pyknosis -> Karyorrhexis -> Karyolysis) AND Tubercular Caseating Granuloma.',
      conclusion: 'Accurate histological recognition of necrosis types guides definitive diagnosis of infarction, tuberculosis, pancreatitis, or immune vasculitis.',
      examinerKeywords: ['Tombstone ghost cells', 'Acidophilic cytoplasm', 'Pyknosis, Karyorrhexis, Karyolysis', 'Caseation', 'Saponification', 'Fibrinoid'],
      commonMistakes: [
        'Writing that brain infarction undergoes coagulative necrosis (it undergoes liquefactive necrosis!).',
        'Forgetting that fat necrosis in pancreatitis is enzymatic saponification binding calcium.'
      ]
    }
  },
  {
    id: 'laq-3-apoptosis-vs-necrosis',
    question: 'Define Apoptosis. Explain in detail the molecular mechanisms of the Intrinsic (Mitochondrial) and Extrinsic (Death Receptor) pathways of apoptosis. Compare and contrast Apoptosis and Necrosis.',
    marks: 10,
    nchCode: 'HomUG-PM I.4',
    structure: {
      introduction: 'Define apoptosis as gene-directed, energy-dependent programmed cell death where cells activate caspases to dismantle themselves into apoptotic bodies without inflammation.',
      headings: [
        '1. Definition & Biological Concept of Apoptosis',
        '2. Physiological vs Pathological Roles of Apoptosis',
        '3. Intrinsic (Mitochondrial) Pathway: Role of Bcl-2 family, Cytochrome c, Apoptosome, Caspase-9',
        '4. Extrinsic (Death Receptor) Pathway: FasL-Fas / TNF-TNFR, FADD, Caspase-8',
        '5. Execution Phase: Caspase-3/6, DNA Laddering (180-200 bp), Phosphatidylserine flip',
        '6. Comprehensive Master Comparison Table: Necrosis vs Apoptosis',
        '7. Clinical Relevance in Cancer & Neurodegeneration'
      ],
      mainContentPoints: [
        'Differentiate physiological (embryology, menses) from pathological (radiation, cytotoxic T cells) apoptosis.',
        'Explain pro-apoptotic (Bax, Bak, Puma) vs anti-apoptotic (Bcl-2, Bcl-xL) balance.',
        'Detail cytochrome c binding APAF-1 forming the apoptosome to activate initiator Caspase-9.',
        'Detail FasL/TNF binding death receptors with death domains activating initiator Caspase-8.',
        'Explain executioner caspases (Caspase-3) cleaving cytoskeletal proteins and activating CAD endonuclease.',
        'Construct complete 10-point comparison table between Necrosis and Apoptosis.'
      ],
      diagramRecommendation: 'Dual-Pathway Flowchart showing Intrinsic & Extrinsic pathways converging on Executioner Caspase-3.',
      conclusion: 'Dysregulated apoptosis underlies major pathologies: defective apoptosis causes cancer and autoimmunity, whereas excessive apoptosis causes neurodegenerative diseases.',
      examinerKeywords: ['Programmed cell death', 'Bcl-2 vs Bax/Bak', 'Cytochrome c & Apoptosome', 'Caspase-8 & Caspase-9', 'Executioner Caspase-3', 'Phosphatidylserine', 'No inflammation'],
      commonMistakes: [
        'Listing Caspase-3 as an initiator caspase (it is an executioner caspase; Caspase-8 and 9 are initiators).',
        'Saying apoptosis causes inflammation (it is characteristically non-inflammatory).'
      ]
    }
  },
  {
    id: 'laq-4-cellular-adaptations',
    question: 'Define Cellular Adaptation. Classify and describe Hypertrophy, Hyperplasia, Atrophy, Metaplasia, and Dysplasia. Discuss the mechanisms, physiological and pathological examples, and differentiate Metaplasia from Dysplasia.',
    marks: 10,
    nchCode: 'HomUG-PM I.3',
    structure: {
      introduction: 'Define cellular adaptations as reversible structural and functional alterations in size, number, phenotype, or metabolic activity in response to environmental changes.',
      headings: [
        '1. Definition & Biological Significance of Adaptations',
        '2. Hypertrophy: Mechanisms (mechanical stretch, growth factors) & Examples (LVH, gravid uterus)',
        '3. Hyperplasia: Mechanisms (stem cell proliferation) & Examples (endometrial, BPH, liver regeneration)',
        '4. Atrophy: Mechanisms (ubiquitin-proteasome pathway, autophagy) & Causes (disuse, ischemia, denervation)',
        '5. Metaplasia: Types (squamous, columnar/Barrett), Mechanisms (stem cell reprogramming) & Clinical significance',
        '6. Dysplasia: Definition, Cytological/Architectural features, Grades & Premalignant risk',
        '7. Master Comparison Table: Metaplasia vs Dysplasia vs Carcinoma',
        '8. Homoeopathic Miasmatic Correlation'
      ],
      mainContentPoints: [
        'Distinguish Hypertrophy (cell size in permanent cells) from Hyperplasia (cell number in dividing cells).',
        'Detail Atrophy: decreased protein synthesis + accelerated ubiquitin-proteasome degradation + autophagy.',
        'Explain Metaplasia as reversible mature cell substitution (e.g. smoker bronchus, Barrett esophagus).',
        'Explain Dysplasia: atypical disordered growth with intact basement membrane (pre-invasive carcinoma).',
        'Highlight why persistent metaplasia predisposes to dysplasia and malignancy.'
      ],
      diagramRecommendation: 'Diagram of Cellular Adaptations (Normal Cell -> Hypertrophy / Hyperplasia / Atrophy / Metaplasia / Dysplasia).',
      conclusion: 'Adaptations allow cells to maintain viability; if stress is removed, tissue reverts to normal, but persistent stress may progress to irreversible injury or malignant transformation.',
      examinerKeywords: ['Reversible steady state', 'Permanent vs dividing cells', 'Ubiquitin-proteasome', 'Barrett esophagus', 'Disordered maturation', 'Intact basement membrane'],
      commonMistakes: [
        'Claiming that adult cardiomyocytes can undergo hyperplasia (they only undergo hypertrophy).',
        'Confusing metaplasia with cancer (metaplasia is a benign adaptive substitution, not cancer).'
      ]
    }
  },
  {
    id: 'laq-5-calcification-pathological',
    question: 'Define Pathological Calcification. Differentiate Dystrophic Calcification from Metastatic Calcification in detail regarding etiology, pathogenesis, serum calcium levels, target tissues, and clinical examples.',
    marks: 10,
    nchCode: 'HomUG-PM I.5',
    structure: {
      introduction: 'Define pathological calcification as the abnormal tissue deposition of calcium salts along with iron, magnesium, and other mineral salts.',
      headings: [
        '1. Definition & Classification of Pathological Calcification',
        '2. Dystrophic Calcification: Definition, Pathogenesis (Membrane nucleation, alkaline phosphatase), Target tissues & Examples',
        '3. Metastatic Calcification: Definition, Causes of Hypercalcemia (Hyperparathyroidism, bone metastases, Vit D excess), Target tissues & Predilection for acid-secreting organs',
        '4. Morphology: Gross appearance & Light microscopy (H&E basophilic granules, von Kossa stain)',
        '5. Comprehensive Comparison Table: Dystrophic vs Metastatic Calcification',
        '6. Clinical Consequences (Aortic stenosis, Nephrocalcinosis, Lithopedion)',
        '7. Homoeopathic Therapeutics'
      ],
      mainContentPoints: [
        'Dystrophic occurs in dead/degenerated tissues with NORMAL serum calcium levels.',
        'Metastatic occurs in normal viable tissues with ELEVATED serum calcium levels (Hypercalcemia).',
        'Explain why metastatic calcification favors lungs, stomach, and kidneys (acid excretion leaves alkaline internal milieu).',
        'Enumerate classic dystrophic sites: Atheroma, calcific aortic stenosis, Ghon TB focus, fat necrosis soaps.',
        'Enumerate metastatic causes: Primary hyperparathyroidism, osteolytic bone metastases, multiple myeloma, sarcoidosis, vitamin D toxicity.'
      ],
      diagramRecommendation: 'Comparison Flowchart: Normal Calcium + Dead Tissue -> Dystrophic vs High Calcium + Living Tissue -> Metastatic.',
      conclusion: 'Dystrophic calcification produces localized mechanical dysfunction, while metastatic calcification causes systemic organ damage, especially nephrocalcinosis.',
      examinerKeywords: ['Normal serum calcium vs Hypercalcemia', 'Dead/dying tissue vs Viable tissue', 'Atherosclerotic plaque', 'Hyperparathyroidism', 'Alkaline internal pH', 'Von Kossa stain'],
      commonMistakes: [
        'Stating that dystrophic calcification is caused by hypercalcemia (serum calcium is strictly NORMAL in dystrophic calcification).',
        'Forgetting why lungs, stomach, and kidneys are the primary targets of metastatic calcification.'
      ]
    }
  }
];

export const cellInjurySaqBank: SaqItem[] = [
  {
    id: 'saq-1-free-radicals',
    question: 'Describe the mechanisms of Free Radical (ROS) mediated cell injury and endogenous antioxidant defense systems.',
    marks: 5,
    nchCode: 'HomUG-PM I.2',
    type: 'Explain mechanism',
    answerPoints: [
      'Definition: Free radicals possess an unpaired electron in outer shell (Superoxide O2•-, Hydroxyl •OH, Hydrogen peroxide H2O2).',
      'Three damaging mechanisms: 1. Lipid peroxidation of membrane polyunsaturated fatty acids; 2. Oxidative modification and cross-linking of proteins; 3. DNA single/double strand breaks.',
      'Antioxidant enzymes: Superoxide Dismutase (SOD: converts O2•- to H2O2), Catalase (in peroxisomes: decomposes H2O2 to H2O + O2), Glutathione Peroxidase (GSH: reduces H2O2 to water).',
      'Antioxidant molecules: Vitamin E (alpha-tocopherol), Vitamin C (ascorbate), Glutathione, Beta-carotene.'
    ],
    examTip: 'Mention all 3 cell-damaging mechanisms and all 3 antioxidant enzymes for full marks.'
  },
  {
    id: 'saq-2-calcium-overload',
    question: 'Explain the role of intracellular Calcium influx in irreversible cell injury.',
    marks: 5,
    nchCode: 'HomUG-PM I.2',
    type: 'Explain mechanism',
    answerPoints: [
      'Normal cytosolic free Ca2+ is kept very low (<0.1 micromol/L) compared to extracellular levels (1.3 mmol/L) by ATP-dependent pumps.',
      'Ischemia and toxins cause failure of Ca2+ ATPase pumps, leading to massive influx of Ca2+ from extracellular space and release from mitochondria/ER.',
      'High cytosolic Ca2+ activates 4 destructive intracellular enzymes: 1. Phospholipases (cause membrane phospholipid breakdown); 2. Proteases (break down cytoskeletal and membrane proteins); 3. Endonucleases (fragment DNA chromatin); 4. ATPases (accelerate total ATP exhaustion).',
      'Directly triggers opening of the Mitochondrial Permeability Transition Pore (MPTP), marking the irreversible point of no return.'
    ],
    examTip: 'Enumerate the 4 specific Ca2+-activated enzymes: Phospholipases, Proteases, Endonucleases, and ATPases.'
  },
  {
    id: 'saq-3-steatosis-mechanisms',
    question: 'Define Fatty Change (Steatosis) of the liver. Enumerate its causes and describe the pathogenesis of triglyceride accumulation.',
    marks: 5,
    nchCode: 'HomUG-PM I.5',
    type: 'Explain mechanism',
    answerPoints: [
      'Definition: Abnormal accumulation of neutral triglycerides within parenchymal cells (hepatocytes).',
      'Causes: Chronic alcoholism, obesity, type 2 diabetes mellitus, protein-calorie malnutrition (Kwashiorkor), CCl4 toxicity, starvation.',
      'Pathogenesis mechanisms: 1. Increased free fatty acid entry from adipose tissue; 2. Increased de novo hepatic fatty acid synthesis (alcoholism); 3. Decreased mitochondrial beta-oxidation of fatty acids; 4. Impaired apoprotein synthesis (protein malnutrition, CCl4); 5. Impaired assembly and secretion of Very Low Density Lipoproteins (VLDL).',
      'Special Stains: Oil Red O and Sudan Black B on fresh frozen cryostat sections (stain lipid bright red/black).'
    ],
    examTip: 'State that fat is dissolved by routine alcohols/xylene during routine H&E processing, appearing as clear empty vacuoles.'
  },
  {
    id: 'saq-4-gangrene-types',
    question: 'Differentiate Dry Gangrene from Wet Gangrene in a tabular format.',
    marks: 5,
    nchCode: 'HomUG-PM I.4',
    type: 'Differentiate',
    answerPoints: [
      'Site: Dry in distal extremities (toes/feet); Wet in moist internal organs (bowel, lung) or infected diabetic foot.',
      'Vascular cause: Dry = pure arterial occlusion; Wet = arterial + venous obstruction with infection.',
      'Bacterial putrefaction: Dry = minimal/absent; Wet = severe, extensive putrefactive bacterial infection.',
      'Appearance: Dry = shriveled, dry, mummified, black; Wet = swollen, edematous, foul-smelling, purplish-black.',
      'Line of demarcation: Dry = sharp clear demarcation line; Wet = no clear demarcation line, spreads rapidly.',
      'Toxemia & Prognosis: Dry = mild/none, better prognosis; Wet = severe life-threatening toxemia, poor prognosis.'
    ],
    examTip: 'Present as a 6-row comparison table with clear headings.'
  },
  {
    id: 'saq-5-barrett-esophagus',
    question: 'Explain Barrett Esophagus as an example of Metaplasia and its clinical significance.',
    marks: 5,
    nchCode: 'HomUG-PM I.3',
    type: 'Clinical application',
    answerPoints: [
      'Definition: A condition in which the normal stratified squamous epithelium of the lower esophagus is replaced by intestinal-type columnar epithelium containing goblet cells.',
      'Etiology: Chronic Gastroesophageal Reflux Disease (GERD) with long-standing acid and bile regurgitation.',
      'Pathogenesis: Chronic acid injury reprograms local esophageal stem cells to differentiate into columnar mucus-secreting epithelium that resists acid.',
      'Gross & Histology: Salmon-pink velvety mucosal tongues extending above GE junction; histology reveals columnar cells with alcian-blue positive goblet cells.',
      'Clinical significance: 30- to 40-fold increased risk of developing Esophageal Adenocarcinoma; requires regular endoscopic surveillance biopsies.'
    ],
    examTip: 'Emphasize the presence of Goblet cells as the diagnostic histological sine qua non of Barrett metaplasia.'
  },
  {
    id: 'saq-6-nuclear-changes-necrosis',
    question: 'Describe with labeled diagrams the sequential nuclear changes occurring in necrotic cells.',
    marks: 5,
    nchCode: 'HomUG-PM I.4',
    type: 'Enumerate',
    answerPoints: [
      'Pyknosis: Nuclear shrinkage with progressive condensation and intense basophilia; nucleus appears as a small, dark, dense shrunken sphere.',
      'Karyorrhexis: Fragmentation of the pyknotic nucleus into multiple small basophilic chromatin pieces scattered in the cytoplasm.',
      'Karyolysis: Dissolution and enzymatic digestion of nuclear chromatin by DNase and lysosomal hydrolases, leading to fading of basophilia and complete loss of nucleus within 1–2 days.',
      'Clinical Significance: Nuclear changes confirm irreversible cell death on histopathology biopsies.'
    ],
    examTip: 'Draw 3 progressive circles showing condensed dot (pyknosis) -> scattered fragments (karyorrhexis) -> empty ghost outline (karyolysis).'
  },
  {
    id: 'saq-7-pigments-classification',
    question: 'Classify Pathological Pigments with examples and mention special stains used for their demonstration.',
    marks: 5,
    nchCode: 'HomUG-PM I.5',
    type: 'Enumerate',
    answerPoints: [
      'Endogenous Pigments: 1. Lipofuscin (wear-and-tear lipid peroxidation pigment in aging heart/liver); 2. Melanin (brown-black pigment in melanocytes; Fontana-Masson stain); 3. Hemosiderin (iron-storage pigment from lysed RBCs; Perls\' Prussian Blue stain); 4. Bilirubin (bile pigment in jaundice; Fouchet stain); 5. Hemozoin (malarial pigment).',
      'Exogenous Pigments: 1. Carbon / Coal dust (Anthracosis in lungs and hilar lymph nodes); 2. Tattoo pigments (inert metal salts taken up by dermal macrophages); 3. Silver (Argyria); 4. Lead (plumbism / blue Burton line on gums).',
      'Diagnostic Value: Identifies occupational lung diseases, iron overload (hemochromatosis), and melanoma.'
    ],
    examTip: 'Give at least 2 endogenous and 2 exogenous pigments along with their specific special stains.'
  },
  {
    id: 'saq-8-ischemia-reperfusion',
    question: 'Explain the mechanism of Ischaemia-Reperfusion Injury with clinical examples.',
    marks: 5,
    nchCode: 'HomUG-PM I.2',
    type: 'Explain mechanism',
    answerPoints: [
      'Concept: Restoration of blood flow to ischemic but viable tissue paradoxically exacerbates cellular injury and accelerates cell death.',
      'Mechanism 1 - Oxygen Free Radical Burst: Sudden oxygen influx reacts with xanthine oxidase and damaged mitochondria, generating massive bursts of ROS (superoxide, hydroxyl radicals).',
      'Mechanism 2 - Calcium Overload: Influx of calcium-rich blood into cells with damaged membrane pumps triggers explosive opening of mitochondrial MPTP.',
      'Mechanism 3 - Neutrophil Infiltration: Restored flow delivers circulating neutrophils that adhere to activated endothelium and release proteolytic enzymes.',
      'Clinical Examples: Reperfusion injury after thrombolysis or PCI in myocardial infarction; ischemic stroke reperfusion; organ transplantation.'
    ],
    examTip: 'Highlight the 3 core pillars: ROS burst, Calcium overload, and Inflammatory neutrophil recruitment.'
  }
];

export const cellInjuryMcqBank: McqQuestionItem[] = [
  {
    id: 'mcq-1',
    question: 'Which of the following cellular changes is considered the earliest morphological indicator of reversible cell injury under light microscopy?',
    options: ['Karyorrhexis', 'Hydropic swelling (cellular swelling)', 'Karyolysis', 'Pyknosis'],
    correctIndex: 1,
    explanation: 'Failure of energy-dependent Na+/K+ ATPase membrane pumps leads to intracellular sodium and water retention, producing cellular swelling (hydropic change), which is the earliest light-microscopic sign of reversible injury.',
    difficulty: 'Easy',
    topic: 'Reversible Cell Injury',
    nchCode: 'HomUG-PM I.2'
  },
  {
    id: 'mcq-2',
    question: 'A 60-year-old male dies of acute myocardial infarction. Microscopic examination of the myocardium at autopsy reveals "tombstone" ghost-like cell outlines with loss of nuclei. This represents:',
    options: ['Liquefactive necrosis', 'Coagulative necrosis', 'Caseous necrosis', 'Fibrinoid necrosis'],
    correctIndex: 1,
    explanation: 'Coagulative necrosis is the characteristic pattern of ischemic infarction in all solid organs (except brain), where protein denaturation preserves the structural outlines (ghost cells) for several days.',
    difficulty: 'Easy',
    topic: 'Necrosis',
    nchCode: 'HomUG-PM I.4'
  },
  {
    id: 'mcq-3',
    question: 'Ischemic necrosis in the Central Nervous System (brain) characteristically results in which type of necrosis?',
    options: ['Coagulative necrosis', 'Liquefactive necrosis', 'Caseous necrosis', 'Fat necrosis'],
    correctIndex: 1,
    explanation: 'Brain tissue is rich in lipids and hydrolytic lysosomal enzymes, and lacks a collagenous framework. Ischemia in the brain characteristically leads to liquefactive (colliquative) necrosis resulting in a cystic cavity.',
    difficulty: 'Moderate',
    topic: 'Necrosis',
    nchCode: 'HomUG-PM I.4'
  },
  {
    id: 'mcq-4',
    question: 'Which of the following special stains is specific for demonstrating Hemosiderin (iron) pigment in tissue sections?',
    options: ['Periodic Acid-Schiff (PAS)', 'Congo Red', 'Perls\' Prussian Blue', 'Oil Red O'],
    correctIndex: 2,
    explanation: 'Perls\' Prussian Blue reaction uses potassium ferrocyanide and hydrochloric acid to react with ferric ions in hemosiderin, producing an insoluble bright blue pigment (Prussian blue).',
    difficulty: 'Easy',
    topic: 'Pigments',
    nchCode: 'HomUG-PM I.5'
  },
  {
    id: 'mcq-5',
    question: 'The wear-and-tear golden-brown pigment associated with aging and brown atrophy of the heart is:',
    options: ['Hemosiderin', 'Bilirubin', 'Lipofuscin', 'Melanin'],
    correctIndex: 2,
    explanation: 'Lipofuscin is an insoluble, golden-brown endogenous pigment composed of peroxidized lipid polymers derived from lysosomal breakdown of cellular organelles during aging or chronic wasting.',
    difficulty: 'Easy',
    topic: 'Pigments',
    nchCode: 'HomUG-PM I.5'
  },
  {
    id: 'mcq-6',
    question: 'In the intrinsic (mitochondrial) pathway of apoptosis, which molecule is released into the cytosol to activate the apoptosome?',
    options: ['Fas Ligand', 'Cytochrome c', 'Perforin', 'TNF-alpha'],
    correctIndex: 1,
    explanation: 'Permeabilization of the mitochondrial outer membrane by Bax/Bak releases Cytochrome c into the cytosol, where it binds APAF-1 to form the apoptosome and activate initiator Caspase-9.',
    difficulty: 'Moderate',
    topic: 'Apoptosis',
    nchCode: 'HomUG-PM I.4'
  },
  {
    id: 'mcq-7',
    question: 'A 50-year-old female with longstanding gastroesophageal reflux disease (GERD) undergoes esophageal biopsy, which reveals intestinal-type columnar epithelium with goblet cells replacing stratified squamous epithelium. This is an example of:',
    options: ['Hyperplasia', 'Dysplasia', 'Metaplasia', 'Anaplasia'],
    correctIndex: 2,
    explanation: 'Barrett esophagus is a classic example of columnar metaplasia, where stratified squamous epithelium is replaced by acid-resistant intestinal-type columnar epithelium.',
    difficulty: 'Moderate',
    topic: 'Cellular Adaptation',
    nchCode: 'HomUG-PM I.3'
  },
  {
    id: 'mcq-8',
    question: 'Dystrophic calcification is characteristically associated with:',
    options: ['Marked Hypercalcemia', 'Dead, necrotic, or degenerating tissue with normal serum calcium', 'Hyperparathyroidism', 'Calcification of pulmonary alveolar septa in viable tissue'],
    correctIndex: 1,
    explanation: 'Dystrophic calcification occurs locally in dead, dying, or degenerated tissues (e.g., atheromas, caseous TB) in patients with completely normal serum calcium levels.',
    difficulty: 'Moderate',
    topic: 'Calcification',
    nchCode: 'HomUG-PM I.5'
  },
  {
    id: 'mcq-9',
    question: 'Which of the following executioner caspases is directly responsible for cleaving cytoskeletal proteins during apoptotic cell dismantling?',
    options: ['Caspase-8', 'Caspase-9', 'Caspase-3', 'Caspase-1'],
    correctIndex: 2,
    explanation: 'Caspase-3 (along with Caspase-6 and 7) is the primary executioner caspase that cleaves structural cellular substrates and activates endonucleases.',
    difficulty: 'Moderate',
    topic: 'Apoptosis',
    nchCode: 'HomUG-PM I.4'
  },
  {
    id: 'mcq-10',
    question: 'A 45-year-old male with acute pancreatitis develops chalky-white, opaque peritoneal deposits. This saponification is due to the binding of free fatty acids with:',
    options: ['Potassium (K+)', 'Sodium (Na+)', 'Calcium (Ca2+)', 'Magnesium (Mg2+)'],
    correctIndex: 2,
    explanation: 'Pancreatic lipases hydrolyze triglycerides in adipose tissue into free fatty acids, which combine with ionized Calcium (Ca2+) to form insoluble chalky-white calcium soaps (Saponification).',
    difficulty: 'Easy',
    topic: 'Necrosis',
    nchCode: 'HomUG-PM I.4'
  },
  {
    id: 'mcq-11',
    question: 'Which of the following organs adapts to sustained increased workload SOLELY via Hypertrophy without any Hyperplasia?',
    options: ['Endometrium', 'Adult myocardium', 'Liver', 'Thyroid gland'],
    correctIndex: 1,
    explanation: 'Adult cardiomyocytes are permanent cells that have exited the cell cycle; they adapt to pressure overload exclusively through hypertrophy (increase in cell size) and cannot undergo hyperplasia.',
    difficulty: 'High-Yield Clinical',
    topic: 'Cellular Adaptation',
    nchCode: 'HomUG-PM I.3'
  },
  {
    id: 'mcq-12',
    question: 'The irreversible transition ("point of no return") in ischemic cell injury is best signaled by:',
    options: ['Detachment of ribosomes from rough ER', 'Massive cytosolic calcium influx and opening of Mitochondrial Permeability Transition Pore (MPTP)', 'Cellular swelling with microvilli blunting', 'Accumulation of lactic acid in the cytosol'],
    correctIndex: 1,
    explanation: 'Severe irreversible mitochondrial damage with opening of the high-conductance MPTP and profound loss of plasma membrane integrity mark the definitive point of no return.',
    difficulty: 'High-Yield Clinical',
    topic: 'Pathogenesis of Cell Injury',
    nchCode: 'HomUG-PM I.2'
  }
];

export const cellInjuryVivaBank: VivaQuestionItem[] = [
  {
    id: 'viva-1',
    question: 'What are the three cardinal nuclear changes seen in necrotic cell death?',
    oneLineAnswer: 'Pyknosis (nuclear shrinkage and condensation), Karyorrhexis (nuclear fragmentation), and Karyolysis (nuclear dissolution).',
    followUpQuestion: 'Which of these three changes occurs last and why?',
    followUpAnswer: 'Karyolysis occurs last; it is caused by the progressive enzymatic digestion of DNA by lysosomal deoxyribonucleases (DNase), causing the nucleus to completely disappear within 24 to 48 hours.',
    examinerTip: 'State all three terms in exact chronological order.',
    category: 'Necrosis & Nuclear Changes'
  },
  {
    id: 'viva-2',
    question: 'Why does ischemic brain infarction undergo liquefactive necrosis rather than coagulative necrosis?',
    oneLineAnswer: 'Because brain tissue is rich in lipids and hydrolytic lysosomal enzymes, and lacks an extensive collagenous fibrous stroma.',
    followUpQuestion: 'What are the characteristic lipid-laden phagocytic cells called in brain infarcts?',
    followUpAnswer: 'They are called Gitter cells (or foamy microglial macrophages) that engulf lipid-rich myelin debris.',
    examinerTip: 'Emphasize that the brain is the sole exception among solid organs.',
    category: 'Types of Necrosis'
  },
  {
    id: 'viva-3',
    question: 'What is Saponification and in which condition is it classically seen?',
    oneLineAnswer: 'Saponification is the chemical combination of liberated free fatty acids with calcium ions to form insoluble chalky-white calcium soaps, classically seen in enzymatic Fat Necrosis of Acute Pancreatitis.',
    followUpQuestion: 'Why can massive saponification cause a life-threatening clinical sign?',
    followUpAnswer: 'It consumes and sequesters large amounts of circulating ionized calcium, leading to severe Hypocalcemia (causing tetany and cardiac arrhythmias).',
    examinerTip: 'Mention that hypocalcemia is a recognized indicator of poor prognosis in acute pancreatitis.',
    category: 'Necrosis & Calcium'
  },
  {
    id: 'viva-4',
    question: 'Differentiate Hypertrophy from Hyperplasia in one sentence.',
    oneLineAnswer: 'Hypertrophy is an increase in the size of cells resulting in organ enlargement, whereas Hyperplasia is an increase in the total number of cells due to mitotic division.',
    followUpQuestion: 'Can an adult skeletal muscle undergo hyperplasia? Why or why not?',
    followUpAnswer: 'No, skeletal muscle fibers are permanent post-mitotic cells; they enlarge purely by hypertrophy through the synthesis of new myofibrils and sarcoplasm.',
    examinerTip: 'Distinguish permanent cells from labile and stable dividing cells.',
    category: 'Cellular Adaptations'
  },
  {
    id: 'viva-5',
    question: 'What is the hallmark difference between Dystrophic and Metastatic calcification?',
    oneLineAnswer: 'Dystrophic calcification occurs in dead or degenerated tissue with NORMAL serum calcium, while Metastatic calcification occurs in viable living tissue secondary to HYPERCALCEMIA.',
    followUpQuestion: 'Why does metastatic calcification preferentially deposit in the lungs, stomach, and kidneys?',
    followUpAnswer: 'Because these organs excrete acid (CO2 from lungs, HCl from stomach, acid in renal tubules), creating an internal alkaline pH that favors calcium salt precipitation.',
    examinerTip: 'Always mention serum calcium levels first when answering this question.',
    category: 'Pathological Calcification'
  },
  {
    id: 'viva-6',
    question: 'Why does Apoptosis NOT trigger an inflammatory response like necrosis does?',
    oneLineAnswer: 'Because the apoptotic cell breaks into intact, membrane-bound apoptotic bodies that are rapidly phagocytosed before intracellular contents can leak into extracellular space.',
    followUpQuestion: 'Which molecule "flips" to the outer leaflet of the apoptotic plasma membrane to signal phagocytosis?',
    followUpAnswer: 'Phosphatidylserine flips from the inner to the outer membrane leaflet, acting as an "eat-me" signal recognized by macrophage receptors.',
    examinerTip: 'Contrast this with membrane lysis in necrosis releasing DAMPs that recruit neutrophils.',
    category: 'Apoptosis'
  }
];

export const cellInjuryRapidRevision: RapidRevisionData = {
  tenMinuteSummary: [
    {
      title: '1. Cell Injury Foundations',
      points: [
        'Stress -> Adaptation (if capable); excessive/persistent stress -> Cell Injury.',
        'Hypoxia = reduced O2 with blood flow; Ischaemia = loss of blood supply (more rapid & destructive).',
        'Reversible injury features: Cellular swelling (hydropic change, Na+/K+ pump failure) and Fatty change (steatosis).',
        'Irreversible injury hallmarks: Severe mitochondrial MPTP opening + loss of plasma membrane integrity.'
      ]
    },
    {
      title: '2. Core Biochemical Mechanisms',
      points: [
        'ATP depletion -> Na+/K+ pump failure, increased anaerobic glycolysis, lactic acidosis, ribosomal detachment.',
        'Mitochondrial damage -> Loss of ATP generation, Cytochrome c release, ROS generation.',
        'Calcium overload -> Influx activates Phospholipases, Proteases, Endonucleases, and ATPases.',
        'Oxidative stress (ROS: O2•-, •OH, H2O2) -> Lipid peroxidation, protein cross-linking, DNA strand breaks.',
        'Antioxidants: Superoxide dismutase (SOD), Catalase, Glutathione peroxidase (GSH), Vitamin E and C.'
      ]
    },
    {
      title: '3. Necrosis & Morphology',
      points: [
        'Necrosis: Pathological cell death with membrane lysis, enzyme leakage, and acute inflammation.',
        'Nuclear changes sequence: Pyknosis (shrinkage) -> Karyorrhexis (fragmentation) -> Karyolysis (dissolution).',
        'Coagulative: Denaturation dominates -> "tombstone" ghost cells (Heart, Kidney, Spleen infarcts).',
        'Liquefactive: Enzymatic lysis dominates -> fluid cavity (Brain ischemic infarct, bacterial abscess).',
        'Caseous: Cheese-like friable debris in TB; epithelioid granuloma with Langhans giant cells.',
        'Fat necrosis: Lipase releases fatty acids which bind Ca2+ forming chalky-white soaps (Saponification in pancreatitis).',
        'Fibrinoid: Smudgy bright pink immune-complex deposits in blood vessel walls (Polyarteritis nodosa).',
        'Gangrene: Ischemic coagulative necrosis + putrefaction. Dry (distal mummified) vs Wet (moist, foul, septic).'
      ]
    },
    {
      title: '4. Apoptosis & Calcification',
      points: [
        'Apoptosis: Programmed single-cell suicide without membrane rupture or inflammation.',
        'Intrinsic pathway: Bax/Bak permeabilize mitochondria -> Cytochrome c + APAF-1 -> Apoptosome -> Caspase-9 -> Caspase-3.',
        'Extrinsic pathway: FasL/TNF bind death receptors -> FADD -> Caspase-8 -> Caspase-3.',
        'Dystrophic calcification: Dead/dying tissue + NORMAL serum calcium (Atheroma, Ghon focus, aortic stenosis).',
        'Metastatic calcification: Normal viable tissue + HYPERCALCEMIA (favors lungs, stomach, kidneys due to alkaline internal pH).'
      ]
    },
    {
      title: '5. Cellular Adaptations',
      points: [
        'Hypertrophy: Increased cell size (permanent cells: cardiomyocytes in LVH, skeletal muscle).',
        'Hyperplasia: Increased cell number (dividing cells: endometrial hyperplasia, BPH, liver regeneration).',
        'Atrophy: Decreased cell size/mass (ubiquitin-proteasome + autophagy; disuse, denervation, ischemia, cachexia).',
        'Metaplasia: Reversible mature cell substitution (Squamous in smoker bronchus; Columnar in Barrett esophagus).',
        'Dysplasia: Disordered atypical growth with intact basement membrane (pre-invasive premalignant lesion).'
      ]
    }
  ],
  oneMinuteEssentials: [
    'HYPOXIA = Reduced O2 delivery | ISCHAEMIA = Interrupted blood flow (O2 cut + nutrient cut + metabolite build-up).',
    'REVERSIBLE = Cellular swelling (Hydropic change) & Steatosis | IRREVERSIBLE = Mitochondrial collapse + Membrane lysis.',
    'NUCLEAR CHANGES = Pyknosis (shrink) -> Karyorrhexis (fragment) -> Karyolysis (dissolve).',
    'COAGULATIVE = Solid organ infarcts (Ghost cells) | LIQUEFACTIVE = Brain infarct & Abscess.',
    'CASEOUS = Tuberculosis (Cottage cheese) | FAT NECROSIS = Pancreatitis (Calcium saponification).',
    'APOPTOSIS = Single cell, Caspases, Cytochrome c, Phosphatidylserine flip, NO inflammation.',
    'DYSTROPHIC = Dead tissue + Normal Ca2+ | METASTATIC = Living tissue + Hypercalcemia (Lungs/Stomach/Kidney).',
    'HYPERTROPHY = Bigger cells (LVH) | HYPERPLASIA = More cells (BPH) | ATROPHY = Shrunken cells (Cast limb).',
    'METAPLASIA = Reversible mature cell swap (Barrett) | DYSPLASIA = Disordered atypical premalignant growth.'
  ]
};

export const cellInjuryMnemonics: MnemonicItem[] = [
  {
    topic: 'Nuclear Changes in Necrosis (Chronological Order)',
    mnemonic: 'P -> K -> K (Please Keep Knowing)',
    expansion: [
      'P - Pyknosis (Nuclear shrinkage and dark condensation)',
      'K - Karyorrhexis (Fragmentation of nucleus into pieces)',
      'K - Karyolysis (Dissolution and fading by DNase)'
    ],
    explanation: 'Helps students recall the exact chronological sequence of nuclear breakdown in necrosis.'
  },
  {
    topic: 'Causes of Pathological Atrophy',
    mnemonic: 'D - D - I - N - E - P (Doctor Does Inspect New Elderly Patients)',
    expansion: [
      'D - Disuse (Immobilization in cast)',
      'D - Denervation (Polio / nerve transection)',
      'I - Ischemia (Atherosclerotic renal atrophy)',
      'N - Nutritional deficiency (Cachexia / starvation)',
      'E - Endocrine loss (Postmenopausal ovary / pituitary failure)',
      'P - Pressure (Aneurysm compressing bone or tumor on parenchyma)'
    ],
    explanation: 'Quickly covers all major etiologic categories of tissue atrophy.'
  },
  {
    topic: 'Free Radical Scavengers / Antioxidant Enzymes',
    mnemonic: 'S - C - G (Super Cellular Guardians)',
    expansion: [
      'S - Superoxide Dismutase (SOD: converts superoxide to H2O2)',
      'C - Catalase (decomposes H2O2 in peroxisomes)',
      'G - Glutathione Peroxidase (GSH: reduces H2O2 to water)'
    ],
    explanation: 'Recalls the three primary endogenous antioxidant enzymes.'
  }
];

export const cellInjuryExamTraps: ExamTrapItem[] = [
  {
    trap: 'Assuming brain infarction produces coagulative necrosis like other solid organs.',
    correction: 'Brain infarction ALWAYS produces Liquefactive (colliquative) necrosis resulting in a cystic cavity, because brain tissue is rich in lipids and hydrolytic enzymes with minimal fibrous stroma.',
    whyStudentsGetConfused: 'Textbooks state that ischemic infarction produces coagulative necrosis in solid organs, forgetting that the brain is the critical exception.'
  },
  {
    trap: 'Believing that Dystrophic calcification is caused by elevated blood calcium levels.',
    correction: 'Serum calcium and phosphate levels are completely NORMAL in Dystrophic calcification; calcium precipitates because of local membrane breakdown in dead/dying tissue. In contrast, Metastatic calcification is caused by Hypercalcemia in viable tissue.',
    whyStudentsGetConfused: 'Students associate the word "calcification" with high calcium levels in the blood.'
  },
  {
    trap: 'Confusing Metaplasia with Cancer.',
    correction: 'Metaplasia is a benign, fully mature, reversible adaptive substitution of one adult cell type by another. It is NOT cancer, although persistent chronic irritation may trigger dysplasia and secondary malignancy.',
    whyStudentsGetConfused: 'Because Barrett esophagus and smoker metaplasia are frequently discussed in the context of cancer risk.'
  },
  {
    trap: 'Thinking adult cardiomyocytes can undergo hyperplasia in hypertension.',
    correction: 'Adult cardiomyocytes are permanent post-mitotic cells incapable of cell division. In response to hypertension, the heart adapts solely via Hypertrophy (increase in individual cardiomyocyte size and protein mass).',
    whyStudentsGetConfused: 'Students see the heart become huge and assume cell multiplication occurred.'
  },
  {
    trap: 'Assuming Apoptosis produces marked neutrophilic infiltration like necrosis.',
    correction: 'Apoptosis produces NO significant inflammatory response because cell contents remain neatly packaged inside membrane-bound apoptotic bodies that are quietly phagocytosed.',
    whyStudentsGetConfused: 'Students equate cell death with inflammation; only necrosis releases DAMPs that trigger acute inflammation.'
  }
];
