import { NchCompetency } from '../types/pathology';

export const nchSystemicPathologyCompetencies: NchCompetency[] = [
  {
    id: 'comp-sys-1',
    code: 'HomUG-PM II.1',
    section: 'systemic',
    domainId: 'domain-sys-cvs',
    domainName: 'Pathology of Cardiovascular System',
    competencyStatement: 'Describe the etiopathogenesis, morphologic features (gross and microscopic), complications and clinical manifestations of major cardiovascular diseases.',
    content: 'Atherosclerosis (risk factors, response-to-injury hypothesis, morphology of fatty streak and fibrofatty atheroma, complications); Ischemic Heart Disease (Angina pectoris, Myocardial Infarction: sequence of morphologic changes at 0-24h, 1-3d, 3-7d, 7-14d, >2 months, serum biomarkers Troponins & CK-MB, complications); Rheumatic Heart Disease / Rheumatic Fever (Jones criteria, Aschoff nodules, Anitschkow cells, valvular lesions, MacCallum patch, vegetations); Infective Endocarditis (acute vs subacute, Duke criteria, vegetations comparison); Hypertension (essential vs secondary, benign vs malignant, hyaline vs hyperplastic arteriolosclerosis); Heart Failure (left vs right-sided, systemic venous congestion); Pericarditis and Cardiomyopathies (dilated, hypertrophic, restrictive).',
    sloList: [
      'Explain the etiopathogenesis and stages in the development of Atherosclerosis.',
      'Describe the temporal sequence of gross and microscopic changes in Myocardial Infarction.',
      'Enumerate serum cardiac biomarkers (cTnI, cTnT, CK-MB, LDH) and their diagnostic time windows.',
      'Describe the pathology of Rheumatic Fever, Aschoff nodules, and compare vegetations of RHD, Subacute Bacterial Endocarditis, Libman-Sacks endocarditis, and Non-bacterial thrombotic endocarditis.',
      'Explain the pathogenesis and vascular pathology in benign vs malignant hypertension.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Case-based learning', 'Demonstration'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Anatomy', 'Biochemistry'],
      vertical: ['Practice of Medicine', 'Surgery']
    },
    practicalRelevance: 'Gross specimen identification of Atherosclerosis of aorta, Myocardial infarction, Mitral stenosis with Aschoff nodules; Interpretation of Cardiac Biomarkers & Lipid Profile.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'cvs-atherosclerosis-ihd'
  },
  {
    id: 'comp-sys-2',
    code: 'HomUG-PM II.2',
    section: 'systemic',
    domainId: 'domain-sys-respiratory',
    domainName: 'Pathology of Respiratory System',
    competencyStatement: 'Explain the etiology, pathogenesis, morphology and complications of obstructive and restrictive lung diseases, pulmonary infections, and pulmonary tumors.',
    content: 'Obstructive lung diseases (Chronic Bronchitis: Reid index; Emphysema: Centriacinar vs Panacinar, alpha-1 antitrypsin deficiency; Bronchial Asthma: extrinsic vs intrinsic, Curschmann spirals, Charcot-Leyden crystals; Bronchiectasis: etiopathogenesis, morphology); Pneumonia (Lobar pneumonia: stages of congestion, red hepatization, grey hepatization, resolution; Bronchopneumonia; Viral/Atypical pneumonia); Pulmonary Tuberculosis (Primary TB: Ghon focus, Ghon complex, Ranke complex; Secondary/Post-primary TB: apical cavitation, fibrocaseous lesions; Miliary TB); Pneumoconiosis (Silicosis, Asbestosis, Anthracosis); Tumors of Lung (Bronchogenic carcinoma: Squamous cell, Small cell/Oat cell, Adenocarcinoma, Large cell - smoking association, paraneoplastic syndromes).',
    sloList: [
      'Differentiate Chronic Bronchitis and Emphysema clinically and pathologically (Pink puffers vs Blue bloaters).',
      'Describe the pathogenesis and histological features of Bronchial Asthma.',
      'Describe the four classical stages of Lobar Pneumonia in detail.',
      'Compare Primary Pulmonary Tuberculosis with Secondary Pulmonary Tuberculosis regarding site, immune status, morphology, and cavitation.',
      'Classify Bronchogenic Carcinoma and mention common paraneoplastic syndromes.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Microbiology', 'Anatomy'],
      vertical: ['Practice of Medicine', 'Surgery', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Gross and slide identification of Lobar pneumonia, Ghon complex, Bronchogenic carcinoma, and Tuberculous cavitary lesion.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'respiratory-copd-pneumonia-tb'
  },
  {
    id: 'comp-sys-3',
    code: 'HomUG-PM II.3',
    section: 'systemic',
    domainId: 'domain-sys-git-hepatobiliary',
    domainName: 'Pathology of Gastrointestinal & Hepatobiliary System',
    competencyStatement: 'Describe the pathology, etiopathogenesis, morphology, clinical manifestations and complications of diseases of the esophagus, stomach, intestines, liver, gallbladder and pancreas.',
    content: 'Esophagus: Barrett esophagus, Reflux esophagitis, Squamous cell carcinoma; Stomach: Acute and Chronic gastritis (H. pylori vs Autoimmune), Peptic Ulcer Disease (gastric vs duodenal, etiopathogenesis, gross and microscopic features, complications), Gastric Carcinoma (intestinal vs diffuse/linitis plastica, Krukenberg tumor, Virchow node); Intestines: Inflammatory Bowel Disease (Crohn disease vs Ulcerative colitis), Intestinal Tuberculosis (ulcerative vs hyperplastic), Appendicitis, Colorectal carcinoma (adenoma-carcinoma sequence, Duke staging); Hepatobiliary: Jaundice (pre-hepatic/hemolytic, hepatic/hepatocellular, post-hepatic/obstructive - laboratory differentiation), Viral Hepatitis (HAV, HBV, HCV, HDV, HEV - serological markers, pathology), Alcoholic Liver Disease (steatosis, alcoholic hepatitis with Mallory-Denk bodies, cirrhosis), Cirrhosis of Liver (micronodular, macronodular, mixed; pathogenesis, portal hypertension, ascites, esophageal varices, hepatic encephalopathy), Gallbladder diseases (Cholelithiasis: cholesterol vs pigment stones, Cholecystitis), Pancreatitis (acute hemorrhagic vs chronic pancreatitis), Hepatocellular Carcinoma.',
    sloList: [
      'Describe the etiopathogenesis, gross and microscopic appearance of Peptic Ulcer Disease and enumerate its complications.',
      'Compare and contrast Crohn Disease and Ulcerative Colitis in a comprehensive table (distribution, depth, skip lesions, granulomas, cobblestone appearance, pseudopolyps, cancer risk).',
      'Tabulate the differential diagnosis of Jaundice based on clinical and laboratory parameters (LFT: Total/Direct Bilirubin, ALT/AST, ALP, urine bilirubin/urobilinogen).',
      'Describe the etiology, morphologic classification, pathogenesis and systemic complications of Cirrhosis of Liver.',
      'Explain the serological diagnosis and transmission modes of Hepatitis B and Hepatitis C virus infections.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Biochemistry', 'Microbiology'],
      vertical: ['Practice of Medicine', 'Surgery', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Gross specimen identification of Cirrhosis of liver, Peptic ulcer, Gallstones, Carcinoma stomach, Acute appendicitis; LFT interpretation.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'git-peptic-ulcer-ibd-cirrhosis'
  },
  {
    id: 'comp-sys-4',
    code: 'HomUG-PM II.4',
    section: 'systemic',
    domainId: 'domain-sys-renal',
    domainName: 'Pathology of Renal & Urinary System',
    competencyStatement: 'Explain the classification, etiopathogenesis, clinical syndromes, morphology and diagnostic features of glomerular diseases, tubulointerstitial diseases, renal calculi and urinary tract tumors.',
    content: 'Clinical syndromes: Nephritic syndrome vs Nephrotic syndrome; Glomerulonephritis: Acute Post-Streptococcal Glomerulonephritis (PSGN: subepithelial humps, immune complex pathogenesis), Rapidly Progressive Glomerulonephritis (RPGN / Crescentic GN), Minimal Change Disease (effacement of podocyte foot processes), Membranous Nephropathy, Membranoproliferative GN, Diabetic Nephropathy (Kimmelstiel-Wilson nodules); Tubulointerstitial diseases: Acute Tubular Necrosis (ischemic vs toxic), Acute and Chronic Pyelonephritis (ascending infection, vesicoureteral reflux, U-shaped cortical scars); Renal Calculi (Nephrolithiasis: Calcium oxalate, Triple phosphate/Struvite/Staghorn, Uric acid, Cystine; pathogenesis, hydronephrosis); Tumors of Kidney and Bladder: Renal Cell Carcinoma (Clear cell RCC - triad of painless hematuria, palpable flank mass, flank pain), Wilms tumor (Nephroblastoma), Urothelial/Transitional cell carcinoma of bladder.',
    sloList: [
      'Differentiate Nephrotic Syndrome from Nephritic Syndrome regarding clinical presentation, laboratory findings, and representative pathologies.',
      'Describe the etiopathogenesis, gross and microscopic features of Acute Post-Streptococcal Glomerulonephritis (PSGN).',
      'Explain the etiopathogenesis and distinguishing features of Acute vs Chronic Pyelonephritis.',
      'Classify Renal Calculi, describe the types of stones with predisposing factors, and explain the development of Hydronephrosis.',
      'Describe the morphology and clinical features of Renal Cell Carcinoma (RCC).'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Demonstration', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Anatomy', 'Biochemistry'],
      vertical: ['Practice of Medicine', 'Surgery', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Interpretation of Urine Routine & Microscopic examination, Renal Function Tests (RFT), gross specimen of Granular contracted kidney, Chronic pyelonephritis, Staghorn stone.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'renal-glomerulonephritis-nephrotic'
  },
  {
    id: 'comp-sys-5',
    code: 'HomUG-PM II.5',
    section: 'systemic',
    domainId: 'domain-sys-hematology',
    domainName: 'Hematology, Lymphoid Pathology & Coagulation Disorders',
    competencyStatement: 'Describe the classification, etiology, peripheral blood and bone marrow findings of anemias, leukemias, lymphomas, plasma cell dyscrasias, and bleeding disorders.',
    content: 'Anemias: Morphological (microcytic hypochromic, macrocytic, normocytic normochromic) and Etiological classification; Iron Deficiency Anemia (etiology, stages, blood picture, iron profile: serum iron, ferritin, TIBC); Megaloblastic Anemia (Vitamin B12 and Folate deficiency, Pernicious anemia, hypersegmented neutrophils, megaloblasts, Schilling test); Hemolytic Anemias (Hereditary Spherocytosis, Sickle Cell Anemia, Thalassemia major and minor, G6PD deficiency, Autoimmune hemolytic anemias - direct/indirect Coombs test); Aplastic Anemia; Leukemias: Acute Myeloid Leukemia (AML - Auer rods, myeloperoxidase), Acute Lymphoblastic Leukemia (ALL), Chronic Myeloid Leukemia (CML - Philadelphia chromosome t(9;22), BCR-ABL tyrosine kinase, LAP score), Chronic Lymphocytic Leukemia (CLL - smudge cells); Lymphomas: Hodgkin Lymphoma (Reed-Sternberg cell variants, Ann Arbor staging, classification) vs Non-Hodgkin Lymphoma (Burkitt lymphoma, DLBCL, Follicular lymphoma); Multiple Myeloma (Bence-Jones proteins, M-spike on electrophoresis, punched-out lytic lesions, plasmacytosis); Bleeding disorders: Idiopathic Thrombocytopenic Purpura (ITP), Hemophilia A and B, von Willebrand Disease, DIC; Coagulation tests (BT, CT, PT/INR, aPTT).',
    sloList: [
      'Classify Anemias and describe the peripheral blood smear findings in Iron Deficiency Anemia vs Megaloblastic Anemia.',
      'Explain the pathogenesis and laboratory diagnosis of Thalassemia and Sickle Cell Disease.',
      'Compare Acute Leukemia with Chronic Leukemia and differentiate CML from Leukemoid reaction.',
      'Describe the histological features of Hodgkin Lymphoma, its subtypes, and morphology of the Reed-Sternberg cell.',
      'Explain the laboratory workup for a bleeding disorder including Bleeding Time, Clotting Time, PT/INR, and aPTT.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Demonstration', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Biochemistry'],
      vertical: ['Practice of Medicine', 'Pediatrics', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Practical performance of Hb estimation, TLC, DLC, ESR, Blood grouping, and peripheral blood smear examination.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'hematology-anemia-leukemia'
  },
  {
    id: 'comp-sys-6',
    code: 'HomUG-PM II.6',
    section: 'systemic',
    domainId: 'domain-sys-endocrine-genital-bone',
    domainName: 'Endocrine, Genital, Breast & Musculoskeletal Pathology',
    competencyStatement: 'Describe the pathology, morphology, and clinical features of common thyroid disorders, diabetes mellitus, male/female genital lesions, breast tumors, and bone/joint diseases.',
    content: 'Endocrine: Thyroid (Goitre: multinodular, colloid; Hyperthyroidism / Graves disease: LATS/TSI, thyroid storm; Hypothyroidism: Hashimoto thyroiditis - Hurthle cells, Cretinism, Myxedema; Neoplasms: Papillary carcinoma - Orphan Annie eye nuclei, Psammoma bodies, Follicular, Medullary - amyloid stroma, Anaplastic); Diabetes Mellitus (Type 1 vs Type 2 pathogenesis, advanced glycation end products, microvascular & macrovascular complications, Kimmelstiel-Wilson lesions); Adrenal (Cushing syndrome, Addison disease, Pheochromocytoma); Male Genital: Testicular neoplasms (Seminoma vs Non-seminomatous), Benign Prostatic Hyperplasia (transition zone), Carcinoma Prostate (peripheral zone, Gleason score, PSA); Female Genital: Cervical intraepithelial neoplasia (CIN) & Carcinoma cervix (HPV etiology, Pap smear), Uterine Leiomyoma (fibroid), Endometriosis, Endometrial carcinoma, Ovarian tumors (teratoma/dermoid cyst, cystadenomas); Breast: Fibroadenoma, Fibrocystic disease, Carcinoma Breast (invasive ductal carcinoma - IDC, risk factors, Nottingham grading, molecular subtypes: ER, PR, HER2); Bone and Joints: Osteomyelitis (pyogenic, tuberculous - Pott spine), Osteoporosis, Bone tumors (Osteosarcoma - sunburst appearance, Codman triangle; Giant cell tumor / Osteoclastoma - soap bubble appearance; Ewing sarcoma - onion skin appearance), Arthritis (Rheumatoid arthritis - pannus vs Osteoarthritis - osteophytes vs Gouty arthritis - urate tophi).',
    sloList: [
      'Compare Graves disease and Hashimoto thyroiditis in terms of etiology, pathology, and laboratory findings.',
      'Explain the pathogenesis of chronic vascular complications in Diabetes Mellitus.',
      'Differentiate Benign Prostatic Hyperplasia (BPH) from Carcinoma of Prostate regarding anatomical zone, morphology, and diagnosis.',
      'Describe the morphology and risk factors for Carcinoma of the Breast and Carcinoma Cervix.',
      'Compare Osteosarcoma, Giant Cell Tumor of Bone, and Ewing Sarcoma with radiological and histopathological distinguishing features.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Demonstration'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Anatomy', 'Physiology', 'Biochemistry'],
      vertical: ['Surgery', 'Obstetrics & Gynaecology', 'Practice of Medicine', 'Orthopaedics']
    },
    practicalRelevance: 'Slide identification of Fibroadenoma breast, Leiomyoma uterus, Colloid goitre, Squamous cell carcinoma cervix; Gross specimen of Hydronephrosis, Fibroid, Thyroid enlargement; TFT and Diabetic Profile interpretation.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'endocrine-genital-bone-pathology'
  }
];
