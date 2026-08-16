import { NchCompetency } from '../types/pathology';

export const nchGeneralPathologyCompetencies: NchCompetency[] = [
  {
    id: 'comp-gen-1',
    code: 'HomUG-PM I.1',
    section: 'general',
    domainId: 'domain-gen-intro',
    domainName: 'Introduction to Pathology & Concepts of Health and Disease',
    competencyStatement: 'Define health, disease, pathogenesis, etiology and describe the historical evolution of modern pathology and its relationship to homoeopathic principles.',
    content: 'Definitions of pathology, etiology, pathogenesis, morphologic changes, clinical significance; cellular basis of disease.',
    sloList: [
      'Define pathology, etiology, pathogenesis, and pathophysiology.',
      'Explain the cellular basis of health and disease.',
      'Correlate the concept of dynamic disease progression with homoeopathic vital force and susceptible state.'
    ],
    millerLevel: 'K',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Small Group Discussion'],
    assessmentMethods: ['SAQ', 'MCQ', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Organon of Medicine'],
      vertical: ['Practice of Medicine']
    },
    practicalRelevance: 'Foundation for understanding all disease mechanisms and case taking.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'etiology-mechanisms-cell-injury'
  },
  {
    id: 'comp-gen-2',
    code: 'HomUG-PM I.2',
    section: 'general',
    domainId: 'domain-gen-cell-injury',
    domainName: 'Cell Injury & Pathogenesis of Cellular Response',
    competencyStatement: 'Describe the etiology, mechanisms, biochemical cascades and morphology of reversible and irreversible cell injury.',
    content: 'Causes of cell injury (hypoxia, ischemia, physical, chemical, microbiological, immunological, genetic, nutritional); mechanisms including ATP depletion, mitochondrial damage, intracellular calcium influx, reactive oxygen species (ROS/free radicals), membrane permeability defects.',
    sloList: [
      'Enumerate the causes of cell injury.',
      'Explain the pathogenesis of ischemic and hypoxic cell injury.',
      'Describe the role of free radicals and reactive oxygen species in cellular damage and antioxidant defense.',
      'Differentiate reversible cell injury (hydropic swelling, fatty change) from irreversible cell injury.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Case-based learning', 'Tutorial'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Biochemistry'],
      vertical: ['Practice of Medicine', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Recognition of cellular changes in ischemic heart disease, shock, and organ toxicities.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'etiology-mechanisms-cell-injury'
  },
  {
    id: 'comp-gen-3',
    code: 'HomUG-PM I.3',
    section: 'general',
    domainId: 'domain-gen-adaptations',
    domainName: 'Cellular Adaptations of Growth and Differentiation',
    competencyStatement: 'Explain the mechanisms, types, morphological characteristics and clinical significance of cellular adaptations.',
    content: 'Atrophy, Hypertrophy, Hyperplasia, Metaplasia (squamous, columnar/Barrett esophagus), Dysplasia; physiological and pathological examples with molecular triggers.',
    sloList: [
      'Define and differentiate Hypertrophy and Hyperplasia with physiological and pathological examples.',
      'Define Atrophy and explain causes of pathological atrophy (disuse, denervation, ischemia, malnutrition, endocrine).',
      'Explain Metaplasia, its reversible nature, and its premalignant potential in Barrett esophagus and respiratory tract.',
      'Define Dysplasia and distinguish it from metaplasia and anaplasia.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Demonstration', 'Small Group Discussion'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Anatomy'],
      vertical: ['Surgery', 'Obstetrics & Gynaecology', 'Practice of Medicine']
    },
    practicalRelevance: 'Identification of endometrial hyperplasia, cardiac hypertrophy, and Barrett metaplasia.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'cellular-adaptations'
  },
  {
    id: 'comp-gen-4',
    code: 'HomUG-PM I.4',
    section: 'general',
    domainId: 'domain-gen-cell-death',
    domainName: 'Cell Death: Necrosis, Apoptosis & Gangrene',
    competencyStatement: 'Describe the classification, etiology, morphologic features, biochemical pathways of necrosis and apoptosis, and types of gangrene.',
    content: 'Necrosis: Coagulative, Liquefactive (colliquative), Caseous, Fat (enzymatic & traumatic), Fibrinoid necrosis. Apoptosis: Intrinsic (mitochondrial) and Extrinsic (death receptor) pathways, physiological and pathological roles. Gangrene: Dry, Wet, and Gas gangrene.',
    sloList: [
      'Define Necrosis and classify its types with typical clinical/organ examples.',
      'Describe the gross and microscopic features of Coagulative, Liquefactive, and Caseous necrosis.',
      'Define Apoptosis and compare it systematically with Necrosis.',
      'Differentiate Dry Gangrene and Wet Gangrene regarding etiology, site, putrefaction, line of demarcation, and clinical prognosis.',
      'Explain the pathogenesis of Gas gangrene caused by Clostridium perfringens.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Demonstration', 'Tutorial'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Microbiology'],
      vertical: ['Surgery', 'Practice of Medicine']
    },
    practicalRelevance: 'Gross and slide identification of caseous necrosis in lymph nodes, infarct in kidney/spleen, and gangrenous appendicitis.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'necrosis-vs-apoptosis'
  },
  {
    id: 'comp-gen-5',
    code: 'HomUG-PM I.5',
    section: 'general',
    domainId: 'domain-gen-accumulations',
    domainName: 'Intracellular Accumulations & Pathological Calcifications',
    competencyStatement: 'Explain the mechanisms and morphological features of intracellular accumulations (lipids, proteins, glycogen, pigments) and pathological calcifications.',
    content: 'Steatosis (Fatty change of liver: etiopathogenesis, gross and microscopic features, special stains like Oil Red O/Sudan); Hyaline change; Pigments (Endogenous: Hemosiderin, Bilirubin, Melanin, Lipofuscin; Exogenous: Carbon/Anthracosis, Tattoo); Pathologic calcification (Dystrophic vs Metastatic calcification); Amyloidosis (classification, chemical nature, staining with Congo Red, birefringence under polarized light).',
    sloList: [
      'Explain the pathogenesis, gross and microscopic appearance of Fatty Liver (Steatosis).',
      'Distinguish Dystrophic calcification from Metastatic calcification based on serum calcium levels, pathogenesis, and sites.',
      'Describe the chemical types and diagnostic tinctorial properties of Amyloidosis.',
      'Enumerate endogenous pigments and explain Hemosiderosis and Hemochromatosis.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Demonstration'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Biochemistry', 'Histology'],
      vertical: ['Practice of Medicine']
    },
    practicalRelevance: 'Histopathology slide identification of Fatty liver, Amyloid spleen (Sago/Lardaceous), and Anthracosis.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'intracellular-accumulations'
  },
  {
    id: 'comp-gen-6',
    code: 'HomUG-PM I.6',
    section: 'general',
    domainId: 'domain-gen-acute-inflammation',
    domainName: 'Acute Inflammation & Chemical Mediators',
    competencyStatement: 'Describe the vascular and cellular events of acute inflammation, leukocyte recruitment, phagocytosis, chemical mediators and morphological patterns.',
    content: 'Vascular events (hemodynamic changes, altered vascular permeability, Starling forces); Cellular events (margination, rolling, adhesion via selectins and integrins, transmigration/diapedesis, chemotaxis, leukocyte activation, phagocytosis, oxygen-dependent and independent killing); Chemical mediators (Histamine, Serotonin, Prostaglandins, Leukotrienes, Platelet-Activating Factor, Cytokines TNF-alpha & IL-1, Chemokines, Nitric oxide, Complement system, Kinin system, Coagulation cascade); Morphological types (serous, fibrinous, suppurative/purulent, ulcerative).',
    sloList: [
      'Describe the vascular phenomena and mechanisms of increased vascular permeability in acute inflammation.',
      'Explain the steps of leukocyte extravasation (rolling, adhesion, transmigration) and phagocytosis.',
      'Enumerate cell-derived and plasma-derived chemical mediators of inflammation and their cardinal vascular actions.',
      'List the cardinal signs of inflammation (Celsus-Virchow: Rubor, Tumor, Calor, Dolor, Functio Laesa) and explain their physiological basis.',
      'Describe the possible fates/outcomes of acute inflammation.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Small Group Discussion', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Microbiology'],
      vertical: ['Surgery', 'Practice of Medicine', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Laboratory assessment of TLC, DLC neutrophilia, ESR, CRP and identification of acute appendicitis slides/specimens.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'vascular-cellular-events-inflammation'
  },
  {
    id: 'comp-gen-7',
    code: 'HomUG-PM I.7',
    section: 'general',
    domainId: 'domain-gen-chronic-inflammation',
    domainName: 'Chronic Inflammation & Granulomatous Diseases',
    competencyStatement: 'Explain the causes, cells, mechanisms of chronic inflammation and detailed morphology of granulomatous diseases.',
    content: 'Chronic inflammation: causes, mononuclear cell infiltration (macrophages, lymphocytes, plasma cells), tissue destruction, repair by fibrosis; Granulomatous inflammation: definition, composition of a granuloma, epithelioid cells, giant cells (Langhans, Foreign body, Touton), classification of granulomatous diseases (Tuberculosis, Leprosy, Sarcoidosis, Syphilis, Actinomycosis, Cat-scratch disease, Fungal infections).',
    sloList: [
      'Define Granuloma and describe its microscopic constituents.',
      'Differentiate Langhans giant cell, Foreign body giant cell, and Touton giant cell.',
      'Describe the structure of a classic Tubercular granuloma (Hard tubercle and Caseating tubercle).',
      'Classify granulomatous diseases with etiology and distinguishing histopathological features.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Demonstration'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Microbiology', 'Histology'],
      vertical: ['Practice of Medicine', 'Homoeopathic Philosophy / Miasms']
    },
    practicalRelevance: 'Histopathology slide identification of Tuberculous lymphadenitis, Leprosy, and Actinomycosis.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'chronic-inflammation-granuloma'
  },
  {
    id: 'comp-gen-8',
    code: 'HomUG-PM I.8',
    section: 'general',
    domainId: 'domain-gen-healing-repair',
    domainName: 'Tissue Healing, Regeneration & Repair',
    competencyStatement: 'Describe the processes of regeneration, repair, granulation tissue formation, wound healing by primary and secondary intention, and factors affecting healing.',
    content: 'Cell cycle and proliferative capacity of tissues (labile, stable, permanent cells); Extracellular matrix (ECM) and growth factors (VEGF, FGF, TGF-beta); Steps of wound healing: Hemostasis, Inflammation, Granulation tissue formation, Remodeling/Cicatrix; Primary vs Secondary intention healing; Local and systemic factors modifying wound healing; Complications (Keloid, Hypertrophic scar, Proud flesh, Wound dehiscence, Contracture).',
    sloList: [
      'Classify human tissues based on proliferative capacity (Labile, Stable, Permanent).',
      'Describe the components and histological features of Granulation tissue.',
      'Compare wound healing by Primary intention with Secondary intention.',
      'Enumerate systemic (nutrition, vitamin C, diabetes, glucocorticoids) and local factors influencing wound healing.',
      'Differentiate Keloid from Hypertrophic scar.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Demonstration', 'Practical'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Anatomy'],
      vertical: ['Surgery', 'Homoeopathic Materia Medica']
    },
    practicalRelevance: 'Identification of granulation tissue slide and management of surgical wounds.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'tissue-repair-wound-healing'
  },
  {
    id: 'comp-gen-9',
    code: 'HomUG-PM I.9',
    section: 'general',
    domainId: 'domain-gen-hemodynamics',
    domainName: 'Hemodynamic Disorders, Thromboembolism & Shock',
    competencyStatement: 'Explain the pathophysiology, morphology, clinical manifestations of edema, hyperemia, congestion, thrombosis, embolism, infarction, and shock.',
    content: 'Edema (Starling forces, hydrostatic vs oncotic pressure, transudate vs exudate, renal vs cardiac edema); Hyperemia and Congestion (Chronic Venous Congestion of Liver - Nutmeg liver, CVC Spleen, CVC Lung - Heart failure cells/Brown induration); Hemostasis and Thrombosis (Virchow triad: endothelial injury, stasis/turbulence, hypercoagulability; lines of Zahn; fate of thrombus); Embolism (Thromboembolism, Fat, Air, Amniotic fluid embolism); Infarction (Red/Hemorrhagic vs White/Anemic infarcts); Shock (classification: Cardiogenic, Hypovolemic, Septic, Anaphylactic, Neurogenic; stages of shock; pathogenesis of septic shock).',
    sloList: [
      'Explain the pathogenesis of Edema and differentiate Transudate from Exudate.',
      'Describe the gross and microscopic features of Chronic Venous Congestion of the Liver and Lung.',
      'State Virchow triad and explain the fate of a thrombus (propagation, embolization, dissolution, organization & recanalization).',
      'Distinguish between Antemortem thrombus and Postmortem clot.',
      'Classify Shock, explain the stages of shock, and describe the cellular mechanisms of multi-organ dysfunction syndrome (MODS).'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Case-based learning', 'Demonstration'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Physiology', 'Biochemistry'],
      vertical: ['Practice of Medicine', 'Surgery']
    },
    practicalRelevance: 'Histopathology and gross specimen identification of CVC Liver (Nutmeg liver), CVC Spleen, and Infarcts of Kidney/Spleen.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'hemodynamic-disorders'
  },
  {
    id: 'comp-gen-10',
    code: 'HomUG-PM I.10',
    section: 'general',
    domainId: 'domain-gen-neoplasia',
    domainName: 'Neoplasia: Biology, Carcinogenesis & Diagnosis',
    competencyStatement: 'Describe the definitions, nomenclature, differences between benign and malignant tumors, molecular basis of cancer, carcinogenesis, tumor spread, and laboratory diagnosis.',
    content: 'Definition of neoplasia (Willis); Nomenclature and classification of tumors; Benign vs Malignant tumors (differentiation, anaplasia, rate of growth, local invasion, metastasis routes: lymphatic, hematogenous, transcoelomic); Molecular biology of cancer: proto-oncogenes, oncogenes (RAS, MYC, HER2), tumor suppressor genes (p53, RB, BRCA1/2), evasion of apoptosis, limitless replicative potential (telomerase), angiogenesis, invasion & metastasis; Carcinogenesis: Chemical, Radiation, Microbial (HPV, EBV, HBV, HCV, H. pylori, HHV-8); Clinical aspects: Cachexia, Paraneoplastic syndromes; TNM staging vs Histological grading; Diagnostic methods: Biopsy, FNAC, Exfoliative cytology/Pap smear, Frozen section, Immunohistochemistry (IHC), Tumor markers (PSA, AFP, CEA, CA-125, CA 19-9).',
    sloList: [
      'Define neoplasia and tabulate the differences between Benign and Malignant neoplasms.',
      'Describe the routes of metastasis with representative tumor examples.',
      'Explain the "hallmarks of cancer" and the role of p53 and RB genes in carcinogenesis.',
      'Describe chemical and viral carcinogenesis.',
      'Explain the principles and clinical applications of FNAC, Biopsy, Exfoliative cytology (Pap smear), and Tumor markers.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Practical', 'Small Group Discussion', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce', 'OSPE'],
    integration: {
      horizontal: ['Histology', 'Biochemistry', 'Microbiology'],
      vertical: ['Surgery', 'Obstetrics & Gynaecology', 'Practice of Medicine']
    },
    practicalRelevance: 'Slide identification of Squamous cell carcinoma, Adenocarcinoma, Lipoma, Fibroadenoma, and Leiomyoma; Gross specimen identification of tumors.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'neoplasia-oncogenesis'
  },
  {
    id: 'comp-gen-11',
    code: 'HomUG-PM I.11',
    section: 'general',
    domainId: 'domain-gen-immunopathology',
    domainName: 'Immunopathology: Hypersensitivity, Autoimmunity & Immunodeficiency',
    competencyStatement: 'Explain the mechanisms of Hypersensitivity reactions (Types I-IV), pathogenesis of Autoimmune diseases, and Primary/Secondary Immunodeficiency states including HIV/AIDS.',
    content: 'Innate vs Adaptive immunity; Hypersensitivity reactions: Type I (Anaphylactic/Atopic - IgE mediated), Type II (Antibody-mediated cytotoxic), Type III (Immune-complex mediated - Arthus reaction, Serum sickness), Type IV (Cell-mediated / Delayed type hypersensitivity - Mantoux test, contact dermatitis); Autoimmunity: breakdown of self-tolerance, mechanisms, Systemic Lupus Erythematosus (SLE: etiology, LE cell, ANA, lupus nephritis), Rheumatoid Arthritis; Immunodeficiency: Primary (SCID, X-linked agammaglobulinemia, DiGeorge syndrome), Secondary (HIV/AIDS: transmission, viral lifecycle, CD4+ T cell depletion, clinical stages, opportunistic infections, Kaposi sarcoma); Amyloidosis review.',
    sloList: [
      'Classify Hypersensitivity reactions (Gell and Coombs Classification Types I-IV) with mechanisms and clinical examples.',
      'Explain the pathogenesis, diagnostic criteria, and organ manifestations of Systemic Lupus Erythematosus (SLE).',
      'Describe the pathogenesis, natural history, opportunistic infections, and laboratory diagnosis of HIV/AIDS.',
      'Explain the mechanisms of immunological tolerance and theories of autoimmunity.'
    ],
    millerLevel: 'KH',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Analyze',
    priority: 'Must Know',
    teachingMethods: ['Lecture', 'Tutorial', 'Case-based learning'],
    assessmentMethods: ['LAQ', 'SAQ', 'MCQ', 'Viva voce'],
    integration: {
      horizontal: ['Physiology', 'Microbiology'],
      vertical: ['Practice of Medicine', 'Dermatology']
    },
    practicalRelevance: 'Interpretation of ANA, RA factor, ASO titer, Mantoux test, and HIV screening tests.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'immunopathology-hypersensitivity'
  },
  {
    id: 'comp-gen-12',
    code: 'HomUG-PM I.12',
    section: 'general',
    domainId: 'domain-gen-genetics-environment',
    domainName: 'Genetic & Environmental Pathology and Nutritional Disorders',
    competencyStatement: 'Explain the principles of chromosomal abnormalities, single-gene disorders, environmental pollutant pathology, and nutritional deficiencies.',
    content: 'Chromosomal abnormalities: Trisomy 21 (Down syndrome - features, cytogenetics, maternal age correlation), Klinefelter syndrome (47, XXY), Turner syndrome (45, X0); Patterns of inheritance (Autosomal dominant, Autosomal recessive, X-linked); Protein-Energy Malnutrition (PEM: Kwashiorkor vs Marasmus); Vitamin deficiencies (Vitamin A, D, C, B-complex); Environmental pathology (Tobacco smoking risks, Alcohol toxicity, Lead and carbon monoxide poisoning, Radiation injury).',
    sloList: [
      'Describe the cytogenetic basis and clinical features of Down syndrome, Klinefelter syndrome, and Turner syndrome.',
      'Differentiate Kwashiorkor from Marasmus in terms of etiology, clinical features, and biochemical findings.',
      'Enumerate pathological changes associated with Vitamin A, D, and C deficiencies (Scurvy, Rickets/Osteomalacia).',
      'Explain the pathological consequences of chronic tobacco smoking on the respiratory and cardiovascular systems.'
    ],
    millerLevel: 'K',
    bloomDomain: 'Cognitive',
    bloomLevel: 'Understand',
    priority: 'Knowledge',
    teachingMethods: ['Lecture', 'Assignment', 'Small Group Discussion'],
    assessmentMethods: ['SAQ', 'MCQ', 'Viva voce'],
    integration: {
      horizontal: ['Biochemistry', 'Physiology'],
      vertical: ['Pediatrics', 'Community Medicine', 'Practice of Medicine']
    },
    practicalRelevance: 'Recognition of nutritional deficiency signs and counseling on lifestyle risk factors.',
    source: {
      sourceDocument: 'CBDC-2nd-BHMS-Professional-Course',
      sourceType: 'Official NCH Curriculum',
      paper: 'Paper I'
    },
    official: true,
    contentStatus: 'MAPPED',
    relatedTopicSlug: 'genetic-environmental-pathology'
  }
];
