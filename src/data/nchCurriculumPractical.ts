import { NchCompetency, HistopathologySlide, GrossSpecimen, LabInterpretationReport } from '../types/pathology';

export const nchPracticalCompetencies: NchCompetency[] = [
  {
    id: 'comp-prac-1',
    code: 'HomUG-PM P.1',
    section: 'practical',
    domainId: 'domain-prac-histopath',
    domainName: 'Histopathology Slide Identification & Microscopic Pathology',
    competencyStatement: 'Identify pathological changes under the microscope, distinguish benign from malignant tissues, specific infections and write three key identification points.',
    content: 'Identification of 20 mandatory histopathological slides with distinguishing microscopic features, drawing labeled sketches, and correlating with clinical diagnosis.',
    sloList: [
      'Focus and examine histopathology slides under low power and high power objectives.',
      'Identify the organ/tissue and state the pathological diagnosis.',
      'Enumerate at least three characteristic microscopic distinguishing features for each slide.',
      'Correlate the histopathological findings with etiology and clinical presentation.'
    ],
    millerLevel: 'SH',
    bloomDomain: 'Psychomotor',
    bloomLevel: 'Apply',
    priority: 'Must Know',
    teachingMethods: ['Practical', 'Demonstration', 'DOAP'],
    assessmentMethods: ['Practical', 'OSPE', 'Viva voce'],
    integration: {
      horizontal: ['Histology', 'Anatomy'],
      vertical: ['Surgery', 'Practice of Medicine']
    },
    practicalRelevance: 'Essential diagnostic skill for evaluating biopsies, surgical resection margins, and inflammatory patterns.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Practical'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'histopathology-slides'
  },
  {
    id: 'comp-prac-2',
    code: 'HomUG-PM P.2',
    section: 'practical',
    domainId: 'domain-prac-gross',
    domainName: 'Gross Pathology Specimens & Morbid Anatomy',
    competencyStatement: 'Identify gross pathological specimens and models, list characteristic external/cut-surface features, and state the pathological diagnosis.',
    content: 'Systematic examination of gross specimens (organ identification, size, shape, color, consistency, cut section, lesions) and listing three pathognomonic diagnostic features.',
    sloList: [
      'Identify the organ of origin in the pathological specimen.',
      'Describe the morbid anatomy (gross lesions, capsular surface, cut surface).',
      'List three cardinal gross identification features.',
      'State the definitive pathological diagnosis and discuss clinical complications during viva.'
    ],
    millerLevel: 'SH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Demonstration', 'Practical', 'Small Group Discussion'],
    assessmentMethods: ['OSPE', 'Viva voce', 'Practical'],
    integration: {
      horizontal: ['Anatomy'],
      vertical: ['Surgery', 'Practice of Medicine']
    },
    practicalRelevance: 'Core spotter examination skill and clinical comprehension of macroscopic disease processes.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Practical'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'gross-specimens'
  },
  {
    id: 'comp-prac-3',
    code: 'HomUG-PM P.3',
    section: 'practical',
    domainId: 'domain-prac-hematology',
    domainName: 'Clinical Haematology & Basic Blood Investigations',
    competencyStatement: 'Perform estimation of hemoglobin, Total Leukocyte Count (TLC), Differential Leukocyte Count (DLC), ESR determination, and ABO/Rh blood grouping.',
    content: 'Sahli acid hematin method for Hb; Neubauer hemocytometer chamber counting for TLC; Leishman staining and peripheral smear examination for DLC; Westergren and Wintrobe methods for ESR; Slide agglutination method for ABO and Rh blood grouping.',
    sloList: [
      'Estimate Hemoglobin accurately using Sahli hemoglobinometer.',
      'Calculate Total Leukocyte Count using Neubauer hemocytometer chamber and Turk fluid.',
      'Prepare, stain, and perform 100-cell Differential Leukocyte Count on a peripheral blood smear.',
      'Set up and read Erythrocyte Sedimentation Rate (ESR) by Westergren method.',
      'Determine ABO and Rh blood groups with forward slide agglutination technique.'
    ],
    millerLevel: 'P',
    bloomDomain: 'Psychomotor',
    bloomLevel: 'Apply',
    priority: 'Must Know',
    teachingMethods: ['DOAP', 'Practical', 'Demonstration'],
    assessmentMethods: ['Practical', 'OSPE', 'Logbook', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Biochemistry'],
      vertical: ['Practice of Medicine', 'Obstetrics & Gynaecology']
    },
    practicalRelevance: 'Primary bedside and OPD investigations used in daily homoeopathic and clinical medical practice.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Practical'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'clinical-hematology-practical'
  },
  {
    id: 'comp-prac-4',
    code: 'HomUG-PM P.4',
    section: 'practical',
    domainId: 'domain-prac-urine',
    domainName: 'Urine Examination: Physical, Chemical & Microscopic',
    competencyStatement: 'Perform complete routine and microscopic examination of urine (Physical properties, Protein, Sugar, Ketones, Bile salts, Bile pigments, Blood, and Microscopic deposits).',
    content: 'Physical analysis (volume, color, transparency, pH, specific gravity by urinometer); Chemical testing: Protein (Heat and Acetic acid test, Sulphosalicylic acid test), Sugar (Benedict qualitative test), Ketone bodies (Rothera test), Bile salts (Hay sulfur test), Bile pigments (Fouchet test), Blood (Benzidine / Dipstick); Microscopic examination of centrifuged urinary sediment (RBCs, pus cells, epithelial cells, casts, crystals).',
    sloList: [
      'Perform and record physical characteristics of urine specimen.',
      'Perform qualitative chemical tests for Albumin (Heat coagulation test) and Reducing Sugar (Benedict test).',
      'Detect Ketone bodies, Bile pigments (Fouchet test), and Bile salts in urine.',
      'Prepare urinary sediment, examine under high power microscopy, and identify casts and crystals (Calcium oxalate, Triple phosphate, Uric acid).'
    ],
    millerLevel: 'P',
    bloomDomain: 'Psychomotor',
    bloomLevel: 'Apply',
    priority: 'Must Know',
    teachingMethods: ['DOAP', 'Practical'],
    assessmentMethods: ['Practical', 'OSPE', 'Logbook', 'Viva voce'],
    integration: {
      horizontal: ['Biochemistry', 'Physiology'],
      vertical: ['Practice of Medicine', 'Surgery']
    },
    practicalRelevance: 'Diagnostic cornerstone for urinary tract infections, glomerulonephritis, nephrotic syndrome, and diabetes.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Practical'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'urine-analysis-practical'
  },
  {
    id: 'comp-prac-5',
    code: 'HomUG-PM P.5',
    section: 'practical',
    domainId: 'domain-prac-reports',
    domainName: 'Laboratory Report Interpretation & Diagnostic Profiling',
    competencyStatement: 'Interpret laboratory investigation charts and reports including Complete Haemogram, LFT, RFT, Thyroid Profile, Lipid Profile, Diabetic Profile, Cardiac Biomarkers, and Serology.',
    content: 'Diagnostic analysis of clinical laboratory reports: Complete blood count indices, Liver function tests (jaundice differentiation), Renal function tests (creatinine, urea, electrolytes), Thyroid profile (TSH, T3, T4), Lipid profile, Diabetic monitoring (HbA1c, FBG, PPBG), Cardiac enzymes (Troponin I, CK-MB), Necrosis enzymes (Amylase, Lipase, LDH), and Serological tests (Widal, VDRL, RA factor, ASO, Mantoux).',
    sloList: [
      'Analyze CBC indices (MCV, MCH, MCHC, TLC, DLC) and formulate a differential diagnosis for anemia or leukocytosis.',
      'Differentiate Hemolytic, Hepatocellular, and Obstructive Jaundice based on LFT values.',
      'Interpret RFT (Serum Creatinine, BUN) in Acute Kidney Injury vs Chronic Kidney Disease.',
      'Interpret Thyroid function tests in primary hypothyroidism vs Graves disease.',
      'Analyze Cardiac biomarker reports (cTnI, CK-MB) in acute coronary syndromes.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Case-based learning', 'Small Group Discussion', 'Tutorial'],
    assessmentMethods: ['OSPE', 'Viva voce', 'Case-based assessment'],
    integration: {
      horizontal: ['Biochemistry', 'Physiology'],
      vertical: ['Practice of Medicine', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Crucial clinical skill for homoeopathic case management, monitoring disease progress, and timely hospital referrals.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Practical'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'lab-report-interpretation'
  },
  {
    id: 'comp-prac-6',
    code: 'HomUG-PM P.6',
    section: 'practical',
    domainId: 'domain-prac-instruments',
    domainName: 'Laboratory Instruments, Equipment & Quality Control',
    competencyStatement: 'Identify laboratory instruments and equipment, state their working principles, clinical uses, maintenance, and basic safety precautions.',
    content: 'Microscopes (Compound binocular light microscope, parts and maintenance); Neubauer counting chamber; Sahli hemoglobinometer; Westergren ESR tube and stand; Wintrobe tube; Urinometer; Clinical centrifuge; Colorimeter/Spectrophotometer; Semi-automated biochemistry analyzer; Glucometer; Autoclave and Hot air oven (laboratory sterilization basics).',
    sloList: [
      'Identify standard clinical pathology and hematology laboratory equipment.',
      'Explain the working principle and grid dimensions of the Improved Neubauer counting chamber.',
      'Describe the correct technique for using and cleaning a compound binocular microscope.',
      'State the calibration and safety procedures for laboratory centrifuges and colorimeters.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Demonstration', 'Practical'],
    assessmentMethods: ['OSPE', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Microbiology'],
      vertical: ['Practice of Medicine']
    },
    practicalRelevance: 'Practical spotter questions and laboratory management competence.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Practical'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'lab-instruments'
  }
];

export const officialHistopathologySlides: HistopathologySlide[] = [
  {
    id: 'slide-fatty-liver',
    name: 'Fatty Liver (Steatosis)',
    code: 'HP-01',
    organ: 'Liver',
    diseaseCategory: 'Intracellular Accumulations',
    identificationPoints: [
      'Hepatocytes distended with clear, optically empty lipid vacuoles.',
      'Nucleus of hepatocytes displaced and compressed to the periphery (signet-ring appearance).',
      'Normal lobular architecture preserved in early stages, with microvesicular and macrovesicular steatosis.'
    ],
    distinguishingFeatures: [
      'Lipid washes out during routine H&E processing, leaving clear spherical spaces.',
      'Frozen sections stained with Oil Red O or Sudan Black confirm neutral fat droplets.',
      'Predominantly begins around the central vein (Centrilobular / Zone 3).'
    ],
    histopathologicalChanges: [
      'Microvesicular fatty change (small fat droplets around nucleus).',
      'Macrovesicular fatty change (single large droplet pushing nucleus aside).',
      'Fatty cysts formed by rupture of adjacent distended hepatocytes.'
    ],
    clinicalCorrelation: 'Common in chronic alcoholism, obesity, type 2 diabetes mellitus, protein malnutrition, and toxic exposures.',
    vivaQuestions: [
      'Why does fat appear empty or clear in routine H&E stain?',
      'Which special stain is used to demonstrate fat in tissue sections?',
      'In which zone of the liver lobule does nutritional/alcoholic fatty change first manifest?'
    ],
    ospePoints: [
      'Spotter identification: Fatty liver.',
      'Key slide feature: Peripheral crescent-shaped displaced nuclei.',
      'Special stain: Oil Red O on frozen section.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-caseous-necrosis-tb',
    name: 'Tuberculosis of Lymph Node (Caseous Necrosis)',
    code: 'HP-02',
    organ: 'Lymph Node',
    diseaseCategory: 'Granulomatous Inflammation & Necrosis',
    identificationPoints: [
      'Central structureless, eosinophilic, amorphous, granular debris (Caseous Necrosis).',
      'Surrounding collar of transformed macrophages known as Epithelioid Cells.',
      'Presence of Langhans Giant Cells with nuclei arranged in a horseshoe or peripheral wreath pattern.',
      'Outer cuff of lymphocytes, plasma cells, and proliferating fibroblasts.'
    ],
    distinguishingFeatures: [
      'Epithelioid cells have pale, elongated, slipper/shoe-sole-shaped vesicular nuclei with indistinct cell borders.',
      'Langhans giant cells contain 15 to 50 nuclei arranged along the periphery in a semicircle.',
      'Acid-Fast Bacilli (AFB) demonstrated with Ziehl-Neelsen (ZN) stain.'
    ],
    histopathologicalChanges: [
      'Loss of normal lymphoid follicle architecture.',
      'Hard tubercle (early non-caseating granuloma) progressing to soft/caseating tubercle.',
      'Peripheral fibroblastic rim with varying degree of dystrophic calcification in healing.'
    ],
    clinicalCorrelation: 'Mycobacterium tuberculosis infection; typical presentation in scrofulous lymphadenopathy and pulmonary lesions.',
    vivaQuestions: [
      'What are the constituents of a classic tuberculous granuloma?',
      'How do you differentiate a Langhans giant cell from a foreign body giant cell?',
      'Why is caseous necrosis called "cheese-like"?'
    ],
    ospePoints: [
      'Spotter identification: Tuberculous Lymphadenitis.',
      'Two key cells to point out: Epithelioid cell and Langhans giant cell.',
      'Special stain: Ziehl-Neelsen (ZN) stain.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-granulation-tissue',
    name: 'Granulation Tissue (Healing & Repair)',
    code: 'HP-03',
    organ: 'Wound / Dermis',
    diseaseCategory: 'Tissue Repair',
    identificationPoints: [
      'Abundant newly formed, thin-walled, leaky capillary blood vessels (Angiogenesis/Neovascularization).',
      'Active plump, spindle-shaped fibroblasts synthesizing extracellular matrix and collagen.',
      'Infiltration by mixed inflammatory cells (macrophages, neutrophils, lymphocytes, plasma cells) within an edematous stroma.'
    ],
    distinguishingFeatures: [
      'Capillaries run perpendicular to the surface, lined by prominent endothelial cells.',
      'Loose, pink-staining extracellular matrix rich in proteoglycans and hyaluronic acid.',
      'Absence of mature dense collagen bundles in early granulation tissue.'
    ],
    histopathologicalChanges: [
      'Phase of inflammation transitioning to proliferative phase.',
      'Sprouting endothelial buds under the influence of VEGF and bFGF.',
      'Myofibroblasts responsible for wound contraction.'
    ],
    clinicalCorrelation: 'Found in base of healing wounds, chronic peptic ulcers, abscess walls, and organizing hematomas.',
    vivaQuestions: [
      'What is granulation tissue and why is it called so?',
      'Which growth factors stimulate neovascularization in granulation tissue?',
      'What is the role of myofibroblasts in wound healing?'
    ],
    ospePoints: [
      'Spotter identification: Granulation Tissue.',
      'Key microscopic components: Neovessels, plump fibroblasts, and inflammatory infiltrate.',
      'Clinical significance: Substrate for wound healing by secondary intention.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-acute-appendicitis',
    name: 'Acute Appendicitis',
    code: 'HP-04',
    organ: 'Appendix',
    diseaseCategory: 'Acute Suppurative Inflammation',
    identificationPoints: [
      'Dense transmural infiltration of Neutrophils through the muscularis propria into the serosa.',
      'Ulceration, erosion, and mucosal necrosis with purulent exudate in the lumen.',
      'Marked congestion of serosal blood vessels and subserosal fibrin deposition.'
    ],
    distinguishingFeatures: [
      'Neutrophils infiltrating the muscularis propria is the definitive diagnostic histological criterion.',
      'Loss of normal columnar surface epithelium with crypt microabscesses.',
      'Extensive neutrophilic debris and fecalith often identifiable in lumen.'
    ],
    histopathologicalChanges: [
      'Early mucosal acute inflammation progressing to acute suppurative/phlegmonous appendicitis.',
      'Vascular thrombosis leading to acute gangrenous appendicitis with wall rupture.',
      'Periappendiceal serositis / localized peritonitis.'
    ],
    clinicalCorrelation: 'Common surgical emergency presenting with periumbilical pain radiating to right iliac fossa (McBurney point), fever, and leukocytosis.',
    vivaQuestions: [
      'What is the gold-standard microscopic criterion for the diagnosis of acute appendicitis?',
      'What are the common causes of luminal obstruction in the appendix?',
      'What are the complications of acute appendicitis?'
    ],
    ospePoints: [
      'Spotter identification: Acute Appendicitis.',
      'Key diagnostic feature: Neutrophils invading the muscular layer (Muscularis propria).',
      'Clinical correlate: Risk of perforation and peritonitis.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-lobar-pneumonia',
    name: 'Lobar Pneumonia (Grey Hepatization)',
    code: 'HP-05',
    organ: 'Lung',
    diseaseCategory: 'Pulmonary Infection',
    identificationPoints: [
      'Alveolar spaces densely packed with a dense network of fibrin threads, disintegrated neutrophils, and macrophages.',
      'Alveolar septal capillaries are compressed, avascular, and pale.',
      'Uniform consolidation involving the entire lobe of the lung.'
    ],
    distinguishingFeatures: [
      'RBCs are lysed and disintegrated compared to the earlier Red Hepatization stage.',
      'Fibrin meshwork spans continuously from one alveolus to another through the pores of Kohn.',
      'Preserved alveolar architecture despite dense intra-alveolar exudation.'
    ],
    histopathologicalChanges: [
      'Stage 1: Congestion (hyperemia + serous fluid).',
      'Stage 2: Red hepatization (massive extravasation of RBCs, neutrophils, fibrin).',
      'Stage 3: Grey hepatization (fibrinous exudate, macrophage phagocytosis, compressed capillaries).',
      'Stage 4: Resolution (enzymatic liquefaction and clearing).'
    ],
    clinicalCorrelation: 'Classic infection caused by Streptococcus pneumoniae (Pneumococcus); sudden high fever, rusty sputum, pleuritic chest pain.',
    vivaQuestions: [
      'Name the four sequential stages of Lobar Pneumonia.',
      'Why is the lung in grey hepatization described as having a dry, greyish-brown appearance like preserved liver?',
      'What is the mechanism of resolution in pneumonia?'
    ],
    ospePoints: [
      'Spotter identification: Lobar Pneumonia (Grey Hepatization).',
      'Key slide feature: Fibrin-rich exudate filling alveoli with lysed RBCs.',
      'Causative organism: Streptococcus pneumoniae.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-squamous-cell-carcinoma',
    name: 'Squamous Cell Carcinoma',
    code: 'HP-06',
    organ: 'Skin / Cervix / Oral Cavity / Bronchus',
    diseaseCategory: 'Neoplasia (Malignant Epithelial)',
    identificationPoints: [
      'Invasive nests, cords, and sheets of malignant squamous epithelial cells infiltrating the underlying stroma/dermis.',
      'Concentric laminated whorls of eosinophilic keratin called "Keratin Pearls" or "Epithelial Pearls" in well-differentiated tumors.',
      'Presence of intercellular bridges (desmosomal spines) between adjacent tumor cells.',
      'Marked cellular pleomorphism, nuclear hyperchromasia, high N:C ratio, and atypical mitotic figures.'
    ],
    distinguishingFeatures: [
      'Keratin pearls with central lamellar keratinization indicate squamous differentiation.',
      'Infiltration across the basement membrane into the subepithelial connective tissue with desmoplastic stroma.',
      'Individual cell dyskeratosis (cells with intense pink keratinized cytoplasm).'
    ],
    histopathologicalChanges: [
      'Grading: Well-differentiated (>75% keratin pearls), Moderately differentiated (25-75%), Poorly differentiated (<25%).',
      'Stroma displays chronic inflammatory cell response and neovascularization.',
      'Perineural and lymphovascular invasion.'
    ],
    clinicalCorrelation: 'Associated with chronic tobacco use, smoking, HPV infection, UV light exposure, and betel quid chewing.',
    vivaQuestions: [
      'What are the two pathognomonic diagnostic microscopic features of Squamous Cell Carcinoma?',
      'How do you grade Squamous Cell Carcinoma (Broder grading)?',
      'What are the routes of metastasis for squamous cell carcinoma?'
    ],
    ospePoints: [
      'Spotter identification: Squamous Cell Carcinoma.',
      'Key diagnostic feature to point out: Keratin / Epithelial Pearl.',
      'Pathological category: Malignant epithelial neoplasm.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-fibroadenoma-breast',
    name: 'Fibroadenoma of Breast',
    code: 'HP-07',
    organ: 'Breast',
    diseaseCategory: 'Neoplasia (Benign Biphasic)',
    identificationPoints: [
      'Biphasic benign tumor showing proliferation of both glandular epithelial elements and loose myxoid stroma.',
      'Intracanalicular pattern: Proliferating fibrous stroma invaginates and compresses glandular lumens into narrow branching slit-like clefts.',
      'Pericanalicular pattern: Fibrous stroma proliferates circumferentially around patent, round-to-oval glandular ducts.',
      'Well-demarcated fibrous pseudo-capsule separating the lesion from normal breast parenchyma.'
    ],
    distinguishingFeatures: [
      'Two-cell layered epithelial lining intact (inner luminal epithelial cells and outer continuous myoepithelial layer - confirms benign nature).',
      'Stroma is delicate, loose, cellular, and rich in acidic mucopolysaccharides.',
      'Absence of nuclear pleomorphism, anaplasia, or atypical mitoses.'
    ],
    histopathologicalChanges: [
      'Stromal hyperplasia stimulated by estrogen.',
      'Compression and stretching of ducts by loose fibrous connective tissue.',
      'Occasional secondary changes: Hyalinization, calcification, or myxoid change in older women.'
    ],
    clinicalCorrelation: 'Most common benign breast tumor in young women (15-35 years); presents as a painless, firm, mobile "breast mouse".',
    vivaQuestions: [
      'Why is Fibroadenoma called a biphasic tumor?',
      'Differentiate intracanalicular and pericanalicular growth patterns.',
      'Why does Fibroadenoma slip freely under the examining fingers (breast mouse)?'
    ],
    ospePoints: [
      'Spotter identification: Fibroadenoma of Breast.',
      'Pattern displayed: Intracanalicular (compressed clefts) / Pericanalicular (round ducts).',
      'Key benign feature: Intact dual layer of epithelial and myoepithelial cells.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'slide-leiomyoma-uterus',
    name: 'Leiomyoma of Uterus (Fibroid)',
    code: 'HP-08',
    organ: 'Uterus',
    diseaseCategory: 'Neoplasia (Benign Mesenchymal)',
    identificationPoints: [
      'Interlacing, whorled bundles and fascicles of uniform, elongated spindle-shaped smooth muscle cells.',
      'Spindle cells possess elongated, blunt-ended "cigar-shaped" or rod-shaped nuclei with rounded ends.',
      'Abundant eosinophilic fibrillar cytoplasm without atypia or necrosis.',
      'Intervening variable amount of hyalinized collagenous connective tissue stroma.'
    ],
    distinguishingFeatures: [
      'Cigar-shaped nuclei cut in longitudinal section and round centrally located nuclei cut in cross-section.',
      'Absence of atypical mitotic figures (<5 mitoses per 10 HPFs), nuclear pleomorphism, or coagulative tumor necrosis (differentiates from Leiomyosarcoma).',
      'Circumscribed border with compressed myometrium creating a false capsule.'
    ],
    histopathologicalChanges: [
      'Hyaline degeneration (most common secondary change: glassy homogenous pink matrix).',
      'Cystic, myxoid, red degeneration (infarction during pregnancy), and dystrophic calcification in older fibroids.'
    ],
    clinicalCorrelation: 'Commonest pelvic tumor in women of reproductive age; presents with menorrhagia, dysmenorrhea, pelvic heaviness, or infertility.',
    vivaQuestions: [
      'Describe the nuclear morphology of smooth muscle cells in Leiomyoma.',
      'Enumerate the secondary degenerative changes occurring in a uterine leiomyoma.',
      'How do you differentiate a benign Leiomyoma from a malignant Leiomyosarcoma on histology?'
    ],
    ospePoints: [
      'Spotter identification: Leiomyoma of Uterus.',
      'Key microscopic feature: Interlacing bundles of smooth muscle cells with cigar-shaped nuclei.',
      'Secondary change often seen: Hyaline degeneration.'
    ],
    status: 'MAPPED',
    official: true
  }
];

export const officialGrossSpecimens: GrossSpecimen[] = [
  {
    id: 'spec-nutmeg-liver',
    name: 'Chronic Venous Congestion of Liver (Nutmeg Liver)',
    code: 'GS-01',
    organ: 'Liver',
    identification: 'Specimen of liver showing Chronic Venous Congestion (Nutmeg liver appearance).',
    characteristicFeatures: [
      'Cut surface presents a mottled appearance with alternating dark red congested central areas and pale yellowish-brown fatty peripheral zones, resembling the cross-section of a nutmeg.',
      'Liver is moderately enlarged with rounded, tense anterior borders and a smooth capsule.',
      'Terminal hepatic venules and central veins are dilated and congested.'
    ],
    grossAppearance: 'Mottled red and yellow reticular mosaic pattern across the entire cut section.',
    pathologicalDiagnosis: 'Chronic Venous Congestion (CVC) of Liver / Nutmeg Liver.',
    relevantDisease: 'Right-sided Congestive Cardiac Failure (CCF) and Constrictive Pericarditis.',
    keyPathology: 'Centrilobular hemorrhagic necrosis due to backward venous stasis combined with peripheral periportal steatosis.',
    vivaQuestions: [
      'Why is it called "Nutmeg liver"?',
      'Explain the pathophysiology of centrilobular congestion versus periportal fatty change.',
      'What is cardiac cirrhosis?'
    ],
    ospePoints: [
      'Spotter diagnosis: CVC Liver / Nutmeg Liver.',
      'Key visual feature: Alternating dark red and light yellow mottled cut surface.',
      'Underlying cause: Right heart failure.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'spec-cirrhosis-liver',
    name: 'Cirrhosis of Liver (Micronodular / Macronodular)',
    code: 'GS-02',
    organ: 'Liver',
    identification: 'Specimen of liver showing Cirrhosis with nodular regenerative pattern.',
    characteristicFeatures: [
      'Diffuse nodularity of external and cut surfaces with regenerating parenchymal nodules separated by dense fibrous septa.',
      'In micronodular cirrhosis, nodules are uniform and small (<3 mm diameter); in macronodular, nodules vary widely (>3 mm up to several centimeters).',
      'Liver is typically shrunken, firm/hard in consistency with a sharp, irregular, bosselated anterior border.'
    ],
    grossAppearance: 'Tawny yellow to greenish-brown firm organ covered with diffuse rounded nodules.',
    pathologicalDiagnosis: 'Cirrhosis of Liver (Micronodular / Macronodular).',
    relevantDisease: 'Chronic Alcoholic Liver Disease, Chronic Hepatitis B/C, NAFLD/NASH.',
    keyPathology: 'Diffuse bridging fibrosis, regenerative nodules of hepatocytes, and vascular architectural remodeling.',
    vivaQuestions: [
      'Define Cirrhosis of the liver.',
      'Differentiate Micronodular cirrhosis from Macronodular cirrhosis on gross appearance and etiology.',
      'Enumerate three major clinical consequences of portal hypertension in liver cirrhosis.'
    ],
    ospePoints: [
      'Spotter diagnosis: Cirrhosis of Liver.',
      'Cardinal gross triad: Fibrous septa, regenerative nodules, and architectural disruption.',
      'Major complication: Esophageal varices, Ascites, Hepatorenal syndrome.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'spec-peptic-ulcer',
    name: 'Chronic Peptic Ulcer of Stomach',
    code: 'GS-03',
    organ: 'Stomach',
    identification: 'Specimen of stomach showing a chronic benign peptic ulcer along the lesser curvature.',
    characteristicFeatures: [
      'Single, round to oval, "punched-out" mucosal defect with sharply defined, straight vertical margins (not overhanging or rolled).',
      'Base of the ulcer is clean, firm, indurated and smooth, showing destruction of the muscularis propria replaced by dense white scar tissue.',
      'Mucosal rugal folds radiate spoke-like in a wheel-like fashion toward the crater margin.'
    ],
    grossAppearance: 'Punched-out deep crater along the lesser curvature/antrum with radiating mucosal folds.',
    pathologicalDiagnosis: 'Chronic Benign Gastric Peptic Ulcer.',
    relevantDisease: 'Peptic Ulcer Disease (Helicobacter pylori infection, chronic NSAID use).',
    keyPathology: 'Imbalance between aggressive factors (acid, pepsin, H. pylori) and mucosal defense factors (mucus, bicarbonate, prostaglandins).',
    vivaQuestions: [
      'How do you differentiate a benign chronic peptic ulcer from an ulcerated gastric carcinoma on gross appearance?',
      'Why are mucosal folds radiating in chronic peptic ulcer?',
      'What are the four classical histological zones of an active peptic ulcer base (Askanazy zones)?'
    ],
    ospePoints: [
      'Spotter diagnosis: Chronic Gastric Peptic Ulcer.',
      'Gross differentiation from cancer: Punched-out straight margins and clean base vs heaped-up everted rolled margins and necrotic base.',
      'Most common site: Lesser curvature near incisura angularis.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'spec-myocardial-infarction',
    name: 'Myocardial Infarction of Left Ventricle',
    code: 'GS-04',
    organ: 'Heart',
    identification: 'Cross-section of heart ventricles showing an area of Acute / Evolving Myocardial Infarction.',
    characteristicFeatures: [
      'Circumscribed pale, yellowish-tan or greyish area in the anterior/lateral wall of the left ventricle and interventricular septum.',
      'Infarct is surrounded by a prominent hyperemic, dark red border of vascular congestion and early granulation tissue.',
      'Thinning of the ventricular wall in healed infarct with translucent white fibrous scar replacing myocardium.'
    ],
    grossAppearance: 'Well-defined geographic pale ischemic zone with a congested hemorrhagic boundary in left ventricular myocardium.',
    pathologicalDiagnosis: 'Myocardial Infarction (Anterior/Lateral Wall).',
    relevantDisease: 'Coronary Atherosclerosis with acute plaque rupture and occlusive thrombosis (Left Anterior Descending artery).',
    keyPathology: 'Ischemic coagulative necrosis of cardiomyocytes followed by acute neutrophilic inflammation, granulation tissue, and fibrous scar.',
    vivaQuestions: [
      'What is the earliest gross change visible in myocardial infarction and at what time does it appear?',
      'Which coronary artery occlusion is most commonly responsible for anterior wall MI?',
      'Enumerate three mechanical complications of myocardial infarction.'
    ],
    ospePoints: [
      'Spotter diagnosis: Myocardial Infarction.',
      'Key visual feature: Pale ischemic necrotic zone with congested hyperemic zone.',
      'Most common site: Left anterior descending (LAD) coronary territory.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'spec-gallstones',
    name: 'Cholelithiasis (Gallstones - Cholesterol / Mixed / Pigment)',
    code: 'GS-05',
    organ: 'Gallbladder',
    identification: 'Specimen of gallbladder containing multiple gallstones (Cholelithiasis).',
    characteristicFeatures: [
      'Cholesterol stones: Usually solitary, large, oval, light yellow to white, translucent, with a radiating crystalline cut surface.',
      'Mixed stones: Multiple, faceted, variable sized, yellowish-brown with alternating concentric pigmented and pale laminated layers on cut section.',
      'Pigment stones: Multiple, small, irregular, jet-black (calcium bilirubinate), hard and friable.'
    ],
    grossAppearance: 'Opened thickened gallbladder containing faceted yellowish-brown stones.',
    pathologicalDiagnosis: 'Cholelithiasis with Chronic Cholecystitis.',
    relevantDisease: 'Gallstone disease (Biliary colic, Cholecystitis, Choledocholithiasis, Biliary pancreatitis).',
    keyPathology: 'Supersaturation of bile with cholesterol, hypomotility of gallbladder, accelerated cholesterol nucleation, and mucin hypersecretion.',
    vivaQuestions: [
      'Classify gallstones based on chemical composition.',
      'Why are mixed gallstones faceted in shape?',
      'What are the risk factors for cholesterol gallstones (the 4 Fs)?'
    ],
    ospePoints: [
      'Spotter diagnosis: Cholelithiasis (Gallstones).',
      'Stone varieties: Cholesterol (solitary, crystalline), Mixed (multiple, faceted, laminated), Pigment (black/brown, irregular).',
      'Complication: Gallstone pancreatitis and empyema gallbladder.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'spec-staghorn-calculus',
    name: 'Hydronephrosis with Staghorn Renal Calculus',
    code: 'GS-06',
    organ: 'Kidney',
    identification: 'Specimen of kidney showing marked pelvicalyceal dilatation and a large branching Staghorn Calculus.',
    characteristicFeatures: [
      'Large, greyish-white branching calculus filling the renal pelvis and extending into major and minor calyces, mimicking the horns of a stag.',
      'Extreme dilatation of the renal pelvis and calyces (Hydronephrosis).',
      'Severe progressive atrophy and thinning of the renal cortical parenchyma to a narrow rim.'
    ],
    grossAppearance: 'Enlarged hydronephrotic kidney with dilated calyces containing a cast-like branching calculus.',
    pathologicalDiagnosis: 'Hydronephrosis with Staghorn (Struvite / Triple Phosphate) Calculus.',
    relevantDisease: 'Chronic Urinary Tract Infection caused by urease-producing bacteria (Proteus mirabilis, Klebsiella).',
    keyPathology: 'Magnesium ammonium phosphate (Struvite) precipitation in alkaline urine caused by bacterial urease splitting urea into ammonia.',
    vivaQuestions: [
      'What is the chemical composition of a Staghorn calculus?',
      'Which micro-organisms predispose to the formation of triple phosphate stones and why?',
      'Define Hydronephrosis and explain its consequences on renal parenchyma.'
    ],
    ospePoints: [
      'Spotter diagnosis: Hydronephrosis with Staghorn Calculus.',
      'Key gross feature: Branching calculus forming a cast of the renal pelvicalyceal system with marked cortical thinning.',
      'Organism associated: Proteus mirabilis.'
    ],
    status: 'MAPPED',
    official: true
  }
];

export const officialLabReports: LabInterpretationReport[] = [
  {
    id: 'lab-haemogram-ida',
    title: 'Complete Haemogram / CBC: Microcytic Hypochromic Anemia',
    code: 'LAB-01',
    category: 'haemogram',
    parameters: [
      { name: 'Hemoglobin (Hb)', normalRange: '13.0 - 17.0 (M), 12.0 - 15.0 (F)', unit: 'g/dL', description: 'Oxygen carrying chromoprotein' },
      { name: 'Total RBC Count', normalRange: '4.5 - 5.5 (M), 3.8 - 4.8 (F)', unit: 'million/mcL', description: 'Red blood corpuscles per unit volume' },
      { name: 'Packed Cell Volume (PCV / Hematocrit)', normalRange: '40 - 50 (M), 36 - 46 (F)', unit: '%', description: 'Percentage volume of packed RBCs' },
      { name: 'Mean Corpuscular Volume (MCV)', normalRange: '80 - 100', unit: 'fL', description: 'Average volume of single erythrocyte' },
      { name: 'Mean Corpuscular Hemoglobin (MCH)', normalRange: '27 - 32', unit: 'pg', description: 'Average weight of Hb per erythrocyte' },
      { name: 'Mean Corpuscular Hemoglobin Concentration (MCHC)', normalRange: '32 - 36', unit: 'g/dL', description: 'Concentration of Hb in packed RBC volume' },
      { name: 'Red Cell Distribution Width (RDW)', normalRange: '11.5 - 14.5', unit: '%', description: 'Coefficient of variation of RBC volume (Anisocytosis)' },
      { name: 'Total Leukocyte Count (TLC)', normalRange: '4,000 - 11,000', unit: '/mcL', description: 'White blood cells count' },
      { name: 'Platelet Count', normalRange: '150,000 - 450,000', unit: '/mcL', description: 'Thrombocyte count' }
    ],
    abnormalFindings: [
      { condition: 'Iron Deficiency Anemia (IDA)', parameterChange: 'Hb: 7.2 g/dL (Low), MCV: 64 fL (Low), MCH: 20 pg (Low), MCHC: 28 g/dL (Low), RDW: 18.5% (High)', interpretation: 'Severe microcytic hypochromic anemia with high RDW (anisopoikilocytosis). Pencil/cigar cells seen on blood smear.' },
      { condition: 'Thalassemia Minor (Trait)', parameterChange: 'Hb: 10.5 g/dL (Mild drop), RBC Count: 5.8 million (High/Disproportionate), MCV: 62 fL (Very low), RDW: Normal (12.8%), Mentzer Index: <13', interpretation: 'Microcytic hypochromic indices with elevated RBC count and normal RDW. Target cells prominent on blood smear.' }
    ],
    possibleCauses: [
      'Chronic blood loss (Menorrhagia, bleeding hemorrhoids, peptic ulcer, hookworm infestation).',
      'Inadequate dietary intake or poor absorption (Celiac disease, post-gastrectomy).',
      'Increased physiological demand (Pregnancy, lactation, rapid growth spurts in children).'
    ],
    clinicalSignificance: 'Differentiation of microcytic hypochromic anemias dictates appropriate therapy (Iron replenishment vs Hemoglobin electrophoresis and genetic counseling for thalassemia).',
    pathologicalCorrelation: 'Depletion of body iron stores -> Deficient heme synthesis -> Diminished hemoglobinization of normoblasts -> Microcytic and hypochromic erythrocyte formation with exaggerated central pallor (>1/3 diameter).',
    vivaQuestions: [
      'Define MCV, MCH, MCHC and state their normal ranges.',
      'How does RDW help in differentiating Iron Deficiency Anemia from Thalassemia Minor?',
      'Calculate Mentzer Index (MCV / RBC count) and explain its clinical utility.'
    ],
    caseBasedQuestions: [
      'A 32-year-old female presents with fatigue, pallor, koilonychia, and pica. Haemogram reveals Hb 6.8 g/dL, MCV 61 fL, MCH 19 pg, MCHC 27 g/dL, RDW 19.2%. Interpret the report and suggest confirmatory biochemical tests.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'lab-lft-jaundice',
    title: 'Liver Function Tests (LFT): Differential Diagnosis of Jaundice',
    code: 'LAB-02',
    category: 'lft',
    parameters: [
      { name: 'Total Serum Bilirubin', normalRange: '0.2 - 1.2', unit: 'mg/dL', description: 'Combined conjugated and unconjugated bile pigment' },
      { name: 'Direct (Conjugated) Bilirubin', normalRange: '0.0 - 0.3', unit: 'mg/dL', description: 'Water-soluble glucuronide conjugated bilirubin' },
      { name: 'Indirect (Unconjugated) Bilirubin', normalRange: '0.2 - 0.8', unit: 'mg/dL', description: 'Lipid-soluble albumin-bound bilirubin' },
      { name: 'Serum Glutamic-Oxaloacetic Transaminase (SGOT / AST)', normalRange: '10 - 40', unit: 'IU/L', description: 'Mitochondrial and cytosolic liver enzyme' },
      { name: 'Serum Glutamic-Pyruvic Transaminase (SGPT / ALT)', normalRange: '7 - 56', unit: 'IU/L', description: 'Specific cytosolic hepatocellular necrosis marker' },
      { name: 'Alkaline Phosphatase (ALP)', normalRange: '44 - 147', unit: 'IU/L', description: 'Biliary canalicular and bone enzyme' },
      { name: 'Gamma-Glutamyl Transferase (GGT)', normalRange: '9 - 48', unit: 'IU/L', description: 'Biliary epithelial enzyme, highly sensitive to alcohol' },
      { name: 'Serum Albumin', normalRange: '3.5 - 5.0', unit: 'g/dL', description: 'Hepatic synthetic function parameter' },
      { name: 'Serum Globulin', normalRange: '2.0 - 3.5', unit: 'g/dL', description: 'Circulating immunoglobulins' },
      { name: 'A:G Ratio', normalRange: '1.2:1 - 2.0:1', unit: 'ratio', description: 'Albumin to Globulin ratio (inverted in chronic liver disease)' },
      { name: 'Prothrombin Time (PT / INR)', normalRange: '11 - 13.5 sec / INR 0.8 - 1.2', unit: 'sec', description: 'Vitamin K dependent clotting factors synthesis' }
    ],
    abnormalFindings: [
      { condition: 'Pre-Hepatic / Hemolytic Jaundice', parameterChange: 'Total Bilirubin: 4.5 mg/dL, Direct: 0.4 mg/dL, Indirect: 4.1 mg/dL (Marked elevation), ALT/AST: Normal, ALP: Normal, Urine Bilirubin: Negative, Urine Urobilinogen: High', interpretation: 'Pure unconjugated hyperbilirubinemia with normal transaminases and increased urobilinogen synthesis.' },
      { condition: 'Hepatocellular Jaundice (Acute Viral Hepatitis)', parameterChange: 'Total Bilirubin: 9.8 mg/dL (Biphasic), Direct: 5.6 mg/dL, Indirect: 4.2 mg/dL, ALT: 1,850 IU/L (Extreme >20-fold rise), AST: 1,420 IU/L, ALP: 180 IU/L (Mild rise)', interpretation: 'Severe acute hepatocellular injury with predominant transaminitis and mixed hyperbilirubinemia.' },
      { condition: 'Post-Hepatic / Obstructive Jaundice (Choledocholithiasis / Periampullary Ca)', parameterChange: 'Total Bilirubin: 14.2 mg/dL, Direct: 12.0 mg/dL (Predominant), ALT/AST: 85 IU/L (Mild rise), ALP: 680 IU/L (Marked >3-5 fold rise), GGT: 340 IU/L, Urine Bilirubin: Strongly positive, Urine Urobilinogen: Absent (Clay-colored stools)', interpretation: 'Extrahepatic cholestatic pattern with profound alkaline phosphatase elevation and direct hyperbilirubinemia.' }
    ],
    possibleCauses: [
      'Hemolytic: Sickle cell crisis, Thalassemia, incompatible blood transfusion, malaria.',
      'Hepatocellular: Viral hepatitis (HAV, HBV, HCV, HEV), alcoholic hepatitis, paracetamol toxicity.',
      'Obstructive: Gallstones in common bile duct, Carcinoma head of pancreas, cholangiocarcinoma, biliary stricture.'
    ],
    clinicalSignificance: 'Rapidly determines whether the patient requires medical therapy, homoeopathic hepatic prescription, or emergency surgical decompression.',
    pathologicalCorrelation: 'Biliary ductal obstruction leads to regurgitation of conjugated bilirubin into blood and excretion in urine (Bilirubinuria), while absence of bile in gut prevents stercobilin formation resulting in pale clay stools.',
    vivaQuestions: [
      'Tabulate the differences between Hemolytic, Hepatocellular, and Obstructive Jaundice.',
      'Why is urine urobilinogen absent in complete biliary tract obstruction?',
      'Why is ALT a more specific marker for liver injury than AST?'
    ],
    caseBasedQuestions: [
      'A 55-year-old male presents with deep yellow discoloration of sclera, dark tea-colored urine, clay-colored stools, and severe generalized pruritus. Total Bilirubin is 16.5 mg/dL (Direct 13.8 mg/dL), ALP is 740 IU/L, ALT is 68 IU/L. Identify the type of jaundice and suggest probable underlying pathology.'
    ],
    status: 'MAPPED',
    official: true
  },
  {
    id: 'lab-rft-kidney',
    title: 'Renal Function Tests (RFT / KFT) & Serum Electrolytes',
    code: 'LAB-03',
    category: 'rft',
    parameters: [
      { name: 'Serum Creatinine', normalRange: '0.7 - 1.3 (M), 0.6 - 1.1 (F)', unit: 'mg/dL', description: 'Endogenous muscle breakdown metabolite filtered exclusively by glomeruli' },
      { name: 'Blood Urea Nitrogen (BUN)', normalRange: '7 - 20', unit: 'mg/dL', description: 'Urea nitrogen derived from protein catabolism' },
      { name: 'Blood Urea', normalRange: '15 - 40', unit: 'mg/dL', description: 'Total serum urea concentration' },
      { name: 'Serum Uric Acid', normalRange: '3.5 - 7.2 (M), 2.6 - 6.0 (F)', unit: 'mg/dL', description: 'Purine metabolism end-product' },
      { name: 'Estimated GFR (eGFR)', normalRange: '>90', unit: 'mL/min/1.73m²', description: 'Glomerular filtration rate calculation (CKD-EPI)' },
      { name: 'Serum Sodium (Na+)', normalRange: '135 - 145', unit: 'mEq/L', description: 'Major extracellular cation' },
      { name: 'Serum Potassium (K+)', normalRange: '3.5 - 5.0', unit: 'mEq/L', description: 'Major intracellular cation' },
      { name: 'Serum Chloride (Cl-)', normalRange: '96 - 106', unit: 'mEq/L', description: 'Major extracellular anion' },
      { name: 'Serum Bicarbonate (HCO3-)', normalRange: '22 - 29', unit: 'mEq/L', description: 'Acid-base buffer capacity' }
    ],
    abnormalFindings: [
      { condition: 'Acute Kidney Injury (AKI) - Prerenal Azotemia', parameterChange: 'Creatinine: 2.8 mg/dL, Blood Urea: 140 mg/dL, BUN/Creatinine ratio: >20:1, Urine Na+: <20 mEq/L, Fractional Excretion of Na (FeNa): <1%', interpretation: 'Prerenal azotemia secondary to hypovolemia or renal hypoperfusion. Tubules actively reabsorbing sodium and urea.' },
      { condition: 'Chronic Kidney Disease (CKD Stage 5 / End-stage Renal Disease)', parameterChange: 'Creatinine: 7.4 mg/dL, Blood Urea: 190 mg/dL, eGFR: 8 mL/min, Serum K+: 6.2 mEq/L (Hyperkalemia), Serum HCO3-: 14 mEq/L (Metabolic acidosis), Serum Calcium: 7.1 mg/dL (Low), Phosphate: 6.8 mg/dL (High)', interpretation: 'Severe chronic uremic syndrome with hyperkalemia, high anion gap metabolic acidosis, and renal osteodystrophy profile.' }
    ],
    possibleCauses: [
      'Prerenal: Dehydration, septic shock, massive hemorrhage, congestive heart failure.',
      'Intrinsic: Acute tubular necrosis (ATN), acute glomerulonephritis, nephrotoxic drugs (NSAIDs, aminoglycosides).',
      'Postrenal: Bilateral ureteric calculus, prostatic hyperplasia, urethral stricture, pelvic malignancy.'
    ],
    clinicalSignificance: 'Essential for evaluating renal clearance, staging CKD, managing fluid-electrolyte balance, and adjusting drug dosages.',
    pathologicalCorrelation: 'Progressive loss of functioning nephrons reduces GFR -> Retention of nitrogenous waste products (Azotemia) -> Inability to excrete potassium and hydrogen ions -> Life-threatening hyperkalemia and metabolic acidosis.',
    vivaQuestions: [
      'Why is serum creatinine a more reliable indicator of GFR than blood urea?',
      'How does the BUN:Creatinine ratio distinguish prerenal azotemia from intrinsic renal failure?',
      'What are the dangers of hyperkalemia in renal failure on the electrocardiogram (ECG)?'
    ],
    caseBasedQuestions: [
      'A 62-year-old diabetic and hypertensive patient presents with generalized puffiness of face, oliguria, and breathlessness. Laboratory investigations show Serum Creatinine 5.1 mg/dL, Urea 160 mg/dL, K+ 5.9 mEq/L, Hemoglobin 8.4 g/dL. What is the stage of kidney disease and what are the immediate management priorities?'
    ],
    status: 'MAPPED',
    official: true
  }
];
