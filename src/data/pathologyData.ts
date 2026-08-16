import { 
  PathologyChapter, 
  PathologyDefinition, 
  PathologyComparison, 
  PathologyQuestion, 
  PathologyStudyTool 
} from '../types/pathology';

export const generalPathologyChapters: PathologyChapter[] = [
  {
    id: 'gen-cell-injury',
    title: 'Cell Injury, Cellular Adaptations & Cell Death',
    slug: 'cell-injury-adaptations',
    description: 'Mechanisms of reversible & irreversible cell injury, free radical injury, necrosis types, apoptosis, and cellular adaptations (hypertrophy, hyperplasia, atrophy, metaplasia).',
    category: 'general',
    order: 1,
    priority: 'high',
    competencies: ['HomUG-Path-M-1.1', 'HomUG-Path-M-1.2', 'HomUG-Path-M-1.3'],
    topics: [
      {
        id: 'top-etiology-cell-injury',
        chapterId: 'gen-cell-injury',
        title: 'Etiology & Mechanisms of Cell Injury',
        slug: 'etiology-mechanisms-cell-injury',
        description: 'Hypoxia, ischemia, free radical injury, ATP depletion, and calcium influx cascades.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-1.1',
        contentPlaceholder: 'Detailed structured notes, flowcharts of ATP depletion, and clinical correlations will be added in Part 3.',
        clinicalCorrelation: 'Ischemia-reperfusion injury in myocardial infarction and acute tubular necrosis.',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 5,
        vivaCount: 4
      },
      {
        id: 'top-necrosis-apoptosis',
        chapterId: 'gen-cell-injury',
        title: 'Types of Necrosis vs Apoptosis',
        slug: 'necrosis-vs-apoptosis',
        description: 'Coagulative, liquefactive, caseous, fat, fibrinoid necrosis, and intrinsic/extrinsic apoptotic pathways.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-1.2',
        contentPlaceholder: 'Morphological features, gross & microscopic pathology notes will be added in Part 3.',
        clinicalCorrelation: 'Caseous necrosis in Tuberculosis and coagulative necrosis in Myocardial Infarction.',
        definitionsCount: 4,
        comparisonsCount: 2,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 5
      },
      {
        id: 'top-cellular-adaptations',
        chapterId: 'gen-cell-injury',
        title: 'Cellular Adaptations of Growth & Differentiation',
        slug: 'cellular-adaptations',
        description: 'Hypertrophy, Hyperplasia, Atrophy, Metaplasia (Squamous & Columnar/Barretts) and Dysplasia.',
        category: 'general',
        priority: 'core',
        competencyCode: 'HomUG-Path-M-1.3',
        contentPlaceholder: 'Physiological and pathological examples, histological hallmarks to be added in Part 3.',
        clinicalCorrelation: 'Left ventricular hypertrophy in hypertension; Barrett esophagus in chronic GERD.',
        definitionsCount: 4,
        comparisonsCount: 2,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 4,
        vivaCount: 3
      }
    ]
  },
  {
    id: 'gen-inflammation',
    title: 'Acute & Chronic Inflammation',
    slug: 'inflammation-acute-chronic',
    description: 'Vascular and cellular events, leukocyte extravasation, phagocytosis, chemical mediators of inflammation, and granulomatous inflammation.',
    category: 'general',
    order: 2,
    priority: 'high',
    competencies: ['HomUG-Path-M-2.1', 'HomUG-Path-M-2.2', 'HomUG-Path-M-2.3'],
    topics: [
      {
        id: 'top-acute-inflammation-events',
        chapterId: 'gen-inflammation',
        title: 'Vascular & Cellular Events in Acute Inflammation',
        slug: 'vascular-cellular-events-inflammation',
        description: 'Hemodynamic changes, altered vascular permeability, rolling, adhesion, transmigration, and chemotaxis.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-2.1',
        contentPlaceholder: 'Triple response of Lewis, Starling forces, and leukocyte adhesion molecule cascades to be added in Part 3.',
        clinicalCorrelation: 'Acute appendicitis, lobar pneumonia, and homoeopathic inflammatory phase remedy affinities (Aconite, Belladonna, Ferrum Phos).',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 4
      },
      {
        id: 'top-chemical-mediators',
        chapterId: 'gen-inflammation',
        title: 'Chemical Mediators of Inflammation',
        slug: 'chemical-mediators-inflammation',
        description: 'Histamine, Serotonin, Arachidonic acid metabolites (Prostaglandins, Leukotrienes), Cytokines (TNF, IL-1), and Complement system.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-2.2',
        contentPlaceholder: 'Cell-derived and plasma-derived mediators summary tables to be added in Part 3.',
        clinicalCorrelation: 'Action of anti-inflammatory agents and histaminergic allergic responses.',
        definitionsCount: 4,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 1,
        saqCount: 3,
        mcqCount: 5,
        vivaCount: 4
      },
      {
        id: 'top-chronic-granuloma',
        chapterId: 'gen-inflammation',
        title: 'Chronic Inflammation & Granulomatous Diseases',
        slug: 'chronic-inflammation-granuloma',
        description: 'Epithelioid cells, Langhans & foreign body giant cells, caseating vs non-caseating granulomas (TB, Sarcoidosis, Leprosy, Syphilis).',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-2.3',
        contentPlaceholder: 'Detailed histology of Ghon focus, hard tubercle, and giant cell varieties to be added in Part 3.',
        clinicalCorrelation: 'Pathogenesis of Mycobacterium tuberculosis and miasmatic syphilis/tubercular diathesis.',
        definitionsCount: 3,
        comparisonsCount: 2,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 5,
        vivaCount: 5
      }
    ]
  },
  {
    id: 'gen-repair',
    title: 'Tissue Repair & Wound Healing',
    slug: 'tissue-repair-wound-healing',
    description: 'Regeneration vs repair, granulation tissue formation, angiogenesis, extracellular matrix, primary vs secondary intention, and factors modifying healing.',
    category: 'general',
    order: 3,
    priority: 'core',
    competencies: ['HomUG-Path-M-3.1', 'HomUG-Path-M-3.2'],
    topics: [
      {
        id: 'top-wound-healing',
        chapterId: 'gen-repair',
        title: 'Wound Healing by First & Second Intention',
        slug: 'healing-first-second-intention',
        description: 'Phases of wound healing: hemostasis, inflammatory, proliferative, remodeling/maturation phases and tensile strength recovery.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-3.1',
        contentPlaceholder: 'Comparative table of primary vs secondary intention and systemic/local modifying factors to be added in Part 3.',
        clinicalCorrelation: 'Surgical incisions, chronic non-healing diabetic ulcers, and homoeopathic healing promoters (Calendula, Hypericum, Silicea).',
        definitionsCount: 2,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 4,
        vivaCount: 3
      },
      {
        id: 'top-abnormal-repair',
        chapterId: 'gen-repair',
        title: 'Complications of Wound Healing (Keloid vs Hypertrophic Scar)',
        slug: 'keloid-vs-hypertrophic-scar',
        description: 'Keloid formation, proud flesh, exuberant granulation, contractures, and dehiscence.',
        category: 'general',
        priority: 'core',
        competencyCode: 'HomUG-Path-M-3.2',
        contentPlaceholder: 'Etiology, collagen differences, and miasmatic sycotic/syphilitic overgrowth patterns to be added in Part 3.',
        clinicalCorrelation: 'Miasmatic sycotic dyscrasia (Thuja, Graphites, Silicea, Fluoric Acid).',
        definitionsCount: 2,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 0,
        saqCount: 2,
        mcqCount: 3,
        vivaCount: 3
      }
    ]
  },
  {
    id: 'gen-hemodynamic',
    title: 'Hemodynamic Disorders, Thromboembolism & Shock',
    slug: 'hemodynamic-disorders-shock',
    description: 'Pathogenesis of edema, hyperemia, congestion (CPG liver/lung/spleen), thrombosis (Virchow triad), embolism types, infarction, and shock stages.',
    category: 'general',
    order: 4,
    priority: 'high',
    competencies: ['HomUG-Path-M-4.1', 'HomUG-Path-M-4.2', 'HomUG-Path-M-4.3'],
    topics: [
      {
        id: 'top-edema-congestion',
        chapterId: 'gen-hemodynamic',
        title: 'Pathogenesis of Edema & Chronic Venous Congestion',
        slug: 'edema-pathogenesis-cpc',
        description: 'Starling equilibrium disturbances, renal sodium retention, lymphatic obstruction, and gross/microscopy of Nutmeg Liver and Brown Induration of Lung.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-4.1',
        contentPlaceholder: 'Detailed hemodynamic mechanisms, transudate vs exudate tables, and CPG organ pathology to be added in Part 3.',
        clinicalCorrelation: 'Congestive cardiac failure, nephrotic syndrome, and cirrhosis with ascites.',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 1,
        saqCount: 3,
        mcqCount: 5,
        vivaCount: 4
      },
      {
        id: 'top-thrombosis-embolism',
        chapterId: 'gen-hemodynamic',
        title: 'Thrombosis (Virchow Triad) & Embolism',
        slug: 'thrombosis-virchow-triad-embolism',
        description: 'Endothelial injury, stasis/turbulent blood flow, hypercoagulability, lines of Zahn, fate of thrombus, pulmonary & systemic embolism.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-4.2',
        contentPlaceholder: 'Virchow triad schematic, arterial vs venous thrombi, and paradoxical embolism notes to be added in Part 3.',
        clinicalCorrelation: 'Deep vein thrombosis (DVT), pulmonary thromboembolism, and acute ischemic stroke.',
        definitionsCount: 4,
        comparisonsCount: 2,
        flowchartsCount: 2,
        laqCount: 1,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 4
      },
      {
        id: 'top-shock-infarction',
        chapterId: 'gen-hemodynamic',
        title: 'Shock (Hypovolemic, Cardiogenic, Septic) & Infarction',
        slug: 'shock-types-stages-infarction',
        description: 'Stages of shock (non-progressive, progressive, irreversible), SIRS, septic shock mediator cascade, red vs white infarcts.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-4.3',
        contentPlaceholder: 'Cellular hypoperfusion mechanisms and multi-organ dysfunction syndrome (MODS) to be added in Part 3.',
        clinicalCorrelation: 'Anaphylaxis, severe hemorrhage, septicemia, and emergency homoeopathic stabilization (Carbo Veg, Veratrum Alb, Arsenic).',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 2,
        mcqCount: 5,
        vivaCount: 5
      }
    ]
  },
  {
    id: 'gen-neoplasia',
    title: 'Neoplasia & Carcinogenesis',
    slug: 'neoplasia-carcinogenesis',
    description: 'Nomenclature, benign vs malignant neoplasms, hallmarks of cancer, oncogenes, tumor suppressor genes, chemical/physical/viral carcinogenesis, TNM staging & tumor markers.',
    category: 'general',
    order: 5,
    priority: 'high',
    competencies: ['HomUG-Path-M-5.1', 'HomUG-Path-M-5.2', 'HomUG-Path-M-5.3', 'HomUG-Path-M-5.4'],
    topics: [
      {
        id: 'top-benign-vs-malignant',
        chapterId: 'gen-neoplasia',
        title: 'Characteristics of Benign vs Malignant Neoplasms',
        slug: 'benign-vs-malignant-tumors',
        description: 'Differentiation, anaplasia, rate of growth, local invasion, metastasis pathways (lymphatic, hematogenous, seeding), and nomenclature.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-5.1',
        contentPlaceholder: 'Comprehensive comparative tables, microscopy criteria of malignancy (nuclear-cytoplasmic ratio, pleomorphism, abnormal mitoses) to be added in Part 3.',
        clinicalCorrelation: 'Miasmatic sycotic (benign) vs syphilitic/cancerous dyscrasia (malignancy).',
        definitionsCount: 5,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 6
      },
      {
        id: 'top-carcinogenesis-hallmarks',
        chapterId: 'gen-neoplasia',
        title: 'Molecular Basis & Chemical, Physical, Viral Carcinogenesis',
        slug: 'molecular-carcinogenesis-etiology',
        description: 'Hanahan & Weinberg Hallmarks of Cancer, proto-oncogenes (ras, myc), tumor suppressor genes (p53, RB), HPV, EBV, Hepatitis B/C, chemical initiators & promoters.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-5.2',
        contentPlaceholder: 'Multi-step genetic mutation model, p53 guardian of the genome pathways to be added in Part 3.',
        clinicalCorrelation: 'Cervical carcinoma (HPV), Burkitt lymphoma (EBV), hepatocellular carcinoma (HBV/HCV).',
        definitionsCount: 4,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 1,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 4
      },
      {
        id: 'top-staging-grading-markers',
        chapterId: 'gen-neoplasia',
        title: 'Grading, TNM Staging, Paraneoplastic Syndromes & Tumor Markers',
        slug: 'grading-staging-tumor-markers',
        description: 'Broders histological grading, UICC/AJCC TNM staging system, paraneoplastic endocrine/neurological syndromes, PSA, CEA, AFP, CA-125, CA 19-9.',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-5.3',
        contentPlaceholder: 'Staging vs Grading distinctions and laboratory tumor marker diagnostic panel to be added in Part 3.',
        clinicalCorrelation: 'Prostate cancer (PSA), Colorectal cancer (CEA), Ovarian cancer (CA-125).',
        definitionsCount: 4,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 3,
        mcqCount: 5,
        vivaCount: 5
      }
    ]
  },
  {
    id: 'gen-immunopathology',
    title: 'Immunopathology & Hypersensitivity Reactions',
    slug: 'immunopathology-hypersensitivity',
    description: 'Immune response components, Hypersensitivity Reactions (Types I, II, III, IV - Gell and Coombs), Autoimmunity mechanisms, and Primary/Secondary Immunodeficiencies (HIV/AIDS).',
    category: 'general',
    order: 6,
    priority: 'core',
    competencies: ['HomUG-Path-M-6.1', 'HomUG-Path-M-6.2'],
    topics: [
      {
        id: 'top-hypersensitivity-reactions',
        chapterId: 'gen-immunopathology',
        title: 'Hypersensitivity Reactions (Types I–IV Gell & Coombs)',
        slug: 'hypersensitivity-types-1-4',
        description: 'Type I (Anaphylactic/IgE), Type II (Antibody-mediated cytotoxic), Type III (Immune complex), Type IV (T-cell mediated delayed hypersensitivity).',
        category: 'general',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-6.1',
        contentPlaceholder: 'Detailed mechanism flowcharts, clinical examples, and comparison matrices to be added in Part 3.',
        clinicalCorrelation: 'Bronchial asthma, hemolytic transfusion reactions, SLE, and tuberculin skin test (Mantoux).',
        definitionsCount: 4,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 5
      },
      {
        id: 'top-autoimmunity-sle',
        chapterId: 'gen-immunopathology',
        title: 'Autoimmunity & Systemic Lupus Erythematosus (SLE)',
        slug: 'autoimmunity-sle-pathology',
        description: 'Failure of self-tolerance (central & peripheral), molecular mimicry, ANA profiles, lupus nephritis classifications.',
        category: 'general',
        priority: 'core',
        competencyCode: 'HomUG-Path-M-6.2',
        contentPlaceholder: 'Pathogenesis flowchart, butterfly rash histology, and LE cell phenomenon to be added in Part 3.',
        clinicalCorrelation: 'Rheumatoid arthritis, SLE, Hashimoto thyroiditis, and constitutional homoeopathy in autoimmune diathesis.',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 4,
        vivaCount: 3
      }
    ]
  }
];

export const systemicPathologyChapters: PathologyChapter[] = [
  {
    id: 'sys-cardiovascular',
    title: 'Cardiovascular System Pathology',
    slug: 'cardiovascular-system-pathology',
    description: 'Atherosclerosis (fatty streak to complicated plaque), Ischemic Heart Disease, Myocardial Infarction timelines, Rheumatic Heart Disease (Aschoff bodies), and Infective Endocarditis.',
    category: 'systemic',
    order: 1,
    priority: 'high',
    competencies: ['HomUG-Path-M-7.1', 'HomUG-Path-M-7.2', 'HomUG-Path-M-7.3'],
    topics: [
      {
        id: 'top-atherosclerosis',
        chapterId: 'sys-cardiovascular',
        title: 'Atherosclerosis: Pathogenesis & Complications',
        slug: 'atherosclerosis-pathogenesis-plaque',
        description: 'Response-to-injury hypothesis, foam cells, fibrous cap, vulnerable plaque rupture, and calcification.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-7.1',
        contentPlaceholder: 'Gross & microscopic pathology notes, risk factor stratification to be added in subsequent parts.',
        clinicalCorrelation: 'Coronary artery disease, peripheral arterial disease, and abdominal aortic aneurysms.',
        definitionsCount: 2,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 4,
        vivaCount: 4
      },
      {
        id: 'top-myocardial-infarction',
        chapterId: 'sys-cardiovascular',
        title: 'Myocardial Infarction: Sequence of Changes & Cardiac Enzymes',
        slug: 'myocardial-infarction-morphology-enzymes',
        description: 'Time-dependent gross & microscopic changes (0-24 hrs, 1-3 days, 1-2 weeks, >2 months), Troponin I/T, CK-MB, and post-MI complications.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-7.2',
        contentPlaceholder: 'High-yield timeline table, histological stained micrographs, and enzyme kinetics to be added in subsequent parts.',
        clinicalCorrelation: 'Acute coronary syndrome, ECG ST-elevation correlations, and homoeopathic cardiac therapeutics (Crataegus, Digitalis, Cactus, Latrodectus).',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 5
      },
      {
        id: 'top-rheumatic-heart-disease',
        chapterId: 'sys-cardiovascular',
        title: 'Rheumatic Heart Disease & Infective Endocarditis',
        slug: 'rheumatic-fever-endocarditis-valves',
        description: 'Jones criteria, Aschoff nodules, Anitschkow cells, MacCallum patch, vegetations comparison (RHD vs Subacute Bacterial Endocarditis vs Libman-Sacks).',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-7.3',
        contentPlaceholder: 'Vegetation comparative table and pancarditis histology to be added in subsequent parts.',
        clinicalCorrelation: 'Mitral stenosis, post-streptococcal sequelae, and chorea.',
        definitionsCount: 3,
        comparisonsCount: 2,
        flowchartsCount: 1,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 5,
        vivaCount: 5
      }
    ]
  },
  {
    id: 'sys-respiratory',
    title: 'Respiratory System Pathology',
    slug: 'respiratory-system-pathology',
    description: 'Pneumonias (Lobar 4 stages vs Bronchopneumonia), Pulmonary Tuberculosis (Primary Ghon complex vs Secondary apical fibrocaseous cavitary), COPD (Emphysema, Chronic Bronchitis, Asthma, Bronchiectasis), and Bronchogenic Carcinoma.',
    category: 'systemic',
    order: 2,
    priority: 'high',
    competencies: ['HomUG-Path-M-8.1', 'HomUG-Path-M-8.2', 'HomUG-Path-M-8.3'],
    topics: [
      {
        id: 'top-pneumonia-stages',
        chapterId: 'sys-respiratory',
        title: 'Lobar Pneumonia (4 Stages of Laennec) vs Bronchopneumonia',
        slug: 'lobar-vs-bronchopneumonia-stages',
        description: 'Stages of Congestion, Red Hepatization, Grey Hepatization, and Resolution. Pathogens, sputum cytology, and complications.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-8.1',
        contentPlaceholder: 'Stage-wise clinical and histological comparisons to be added in subsequent parts.',
        clinicalCorrelation: 'Rusty sputum, pleuritic chest pain, and homoeopathic staging remedies (Bryonia, Phosphorus, Chelidonium, Antim Tart).',
        definitionsCount: 2,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 2,
        saqCount: 2,
        mcqCount: 5,
        vivaCount: 4
      },
      {
        id: 'top-pulmonary-tb',
        chapterId: 'sys-respiratory',
        title: 'Pulmonary Tuberculosis: Primary Ghon Complex vs Secondary/Post-Primary TB',
        slug: 'pulmonary-tuberculosis-pathogenesis',
        description: 'Ghon focus + lymphatics + lymph node, Simon focus, Assmann focus, caseation necrosis, cavitation, fibrocalcific healing, and miliary dissemination.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-8.2',
        contentPlaceholder: 'Acid-fast Ziehl-Neelsen staining, immune-cell cascade, and TB histopathology to be added in subsequent parts.',
        clinicalCorrelation: 'Mantoux skin test, hemoptysis, night sweats, and Homoeopathic Tubercular nosodes (Bacillinum, Tuberculinum).',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 5
      },
      {
        id: 'top-copd-asthma',
        chapterId: 'sys-respiratory',
        title: 'COPD (Emphysema, Chronic Bronchitis) & Bronchial Asthma',
        slug: 'copd-emphysema-bronchitis-asthma',
        description: 'Centriacinar vs panacinar emphysema, alpha-1 antitrypsin deficiency, Reid index in chronic bronchitis, Curschmann spirals & Charcot-Leyden crystals in asthma.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-8.3',
        contentPlaceholder: 'Obstructive vs restrictive pulmonary function changes and airway remodeling pathology to be added in subsequent parts.',
        clinicalCorrelation: 'Pink puffers vs blue bloaters, allergic asthma triggers, and remedies (Arsenic, Ipecac, Blatta Orientalis, Natrum Sulph).',
        definitionsCount: 4,
        comparisonsCount: 2,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 3,
        mcqCount: 5,
        vivaCount: 4
      }
    ]
  },
  {
    id: 'sys-git-liver',
    title: 'Gastrointestinal & Hepatobiliary Pathology',
    slug: 'git-hepatobiliary-pathology',
    description: 'Peptic Ulcer Disease (Gastric vs Duodenal), Inflammatory Bowel Disease (Crohn vs Ulcerative Colitis), Viral Hepatitis profiles, Cirrhosis of Liver (Portal hypertension), and Appendicitis.',
    category: 'systemic',
    order: 3,
    priority: 'high',
    competencies: ['HomUG-Path-M-9.1', 'HomUG-Path-M-9.2', 'HomUG-Path-M-9.3'],
    topics: [
      {
        id: 'top-peptic-ulcer',
        chapterId: 'sys-git-liver',
        title: 'Peptic Ulcer Disease (Gastric vs Duodenal Ulcer) & H. Pylori',
        slug: 'peptic-ulcer-disease-gastric-duodenal',
        description: 'Mucosal defense breakdown, Helicobacter pylori urease/CagA virulence, 4 histological zones of Askanazy in chronic ulcers.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-9.1',
        contentPlaceholder: 'Gross morphology (punched-out margins), Askanazy layers, and perforation/bleeding sequelae to be added in subsequent parts.',
        clinicalCorrelation: 'Epigastric burning pain, timing with meals, and remedies (Nux Vomica, Argentum Nitricum, Hydrastis, Anacardium).',
        definitionsCount: 2,
        comparisonsCount: 1,
        flowchartsCount: 1,
        laqCount: 1,
        saqCount: 2,
        mcqCount: 4,
        vivaCount: 4
      },
      {
        id: 'top-cirrhosis-liver',
        chapterId: 'sys-git-liver',
        title: 'Cirrhosis of Liver: Pathogenesis, Micronodular/Macronodular & Portal Hypertension',
        slug: 'cirrhosis-liver-portal-hypertension',
        description: 'Stellate (Ito) cell activation, bridging fibrous septa, regenerative parenchymal nodules, esophageal varices, ascites, caput medusae, and hepatic encephalopathy.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-9.2',
        contentPlaceholder: 'Alcoholic vs post-necrotic cirrhosis comparison, Child-Pugh score, and LFT alterations to be added in subsequent parts.',
        clinicalCorrelation: 'Spider angiomas, jaundice, palmar erythema, and hepatic remedies (Carduus Mar, Chelidonium, Lycopodium, Phosphorus).',
        definitionsCount: 3,
        comparisonsCount: 1,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 5
      }
    ]
  },
  {
    id: 'sys-renal',
    title: 'Renal & Urinary Tract Pathology',
    slug: 'renal-urinary-pathology',
    description: 'Glomerulonephritis (PSGN, RPGN), Nephrotic Syndrome (Minimal change, FSGS, Membranous) vs Nephritic Syndrome, Pyelonephritis, and Renal Calculi.',
    category: 'systemic',
    order: 4,
    priority: 'high',
    competencies: ['HomUG-Path-M-10.1', 'HomUG-Path-M-10.2'],
    topics: [
      {
        id: 'top-nephrotic-vs-nephritic',
        chapterId: 'sys-renal',
        title: 'Nephrotic Syndrome vs Nephritic Syndrome & Acute Post-Streptococcal Glomerulonephritis (PSGN)',
        slug: 'nephrotic-vs-nephritic-psgn',
        description: 'Heavy proteinuria (>3.5g/day), hypoalbuminemia, generalized edema, hyperlipidemia, subepithelial humps on electron microscopy in PSGN.',
        category: 'systemic',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-10.1',
        contentPlaceholder: 'Detailed clinical comparison matrix, immunofluorescence granular patterns, and urinary cast pathology to be added in subsequent parts.',
        clinicalCorrelation: 'Facial/periorbital puffiness, smoky/cola-colored urine, and remedies (Apis Mel, Cantharis, Berberis Vulg, Terebinthina).',
        definitionsCount: 3,
        comparisonsCount: 2,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 5,
        vivaCount: 5
      }
    ]
  },
  {
    id: 'sys-hematology',
    title: 'Hematology & Bone Marrow Pathology',
    slug: 'hematology-anemias-leukemias',
    description: 'Anemias (Iron deficiency, Megaloblastic, Hemolytic - Sickle cell, Thalassemia, G6PD deficiency), Leukemias (Acute: AML, ALL vs Chronic: CML, CLL), and Coagulation disorders.',
    category: 'hematology',
    order: 5,
    priority: 'high',
    competencies: ['HomUG-Path-M-11.1', 'HomUG-Path-M-11.2', 'HomUG-Path-M-11.3'],
    topics: [
      {
        id: 'top-anemias-classification',
        chapterId: 'sys-hematology',
        title: 'Classification of Anemias & Iron Deficiency vs Megaloblastic Anemia',
        slug: 'classification-anemias-ida-megaloblastic',
        description: 'Morphological (Microcytic hypochromic, Macrocytic, Normocytic) and Etiological classifications. Peripheral blood smear findings, bone marrow changes, and red cell indices (MCV, MCH, MCHC).',
        category: 'hematology',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-11.1',
        contentPlaceholder: 'Comparative table of IDA vs Megaloblastic, pencil cells, hypersegmented neutrophils, and iron profile interpretations to be added in subsequent parts.',
        clinicalCorrelation: 'Koilonychia, pica, subacute combined degeneration, and remedies (Ferrum Met, China, Natrum Mur, Arsenic).',
        definitionsCount: 4,
        comparisonsCount: 2,
        flowchartsCount: 2,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 6
      },
      {
        id: 'top-leukemias-cml',
        chapterId: 'sys-hematology',
        title: 'Leukemias: Acute (AML/ALL) vs Chronic (CML/CLL) & Philadelphia Chromosome',
        slug: 'leukemias-classification-cml-philadelphia',
        description: 'FAB classification, blast cells, Auer rods in AML, smudge cells in CLL, Philadelphia chromosome t(9;22) BCR-ABL translocation in CML, and massive splenomegaly.',
        category: 'hematology',
        priority: 'high',
        competencyCode: 'HomUG-Path-M-11.2',
        contentPlaceholder: 'Peripheral blood film criteria, bone marrow cellularity, cytochemistry (MPO, PAS, Sudan Black) to be added in subsequent parts.',
        clinicalCorrelation: 'Bleeding tendencies, recurrent infections, severe anemia, and hepatosplenomegaly.',
        definitionsCount: 4,
        comparisonsCount: 2,
        flowchartsCount: 1,
        laqCount: 2,
        saqCount: 3,
        mcqCount: 6,
        vivaCount: 5
      }
    ]
  }
];

export const pathologyStudyTools: PathologyStudyTool[] = [
  {
    id: 'tool-definitions',
    title: 'Important Definitions',
    description: 'Precision medical definitions for necrosis, apoptosis, metaplasia, anaplasia, embolism, infarction, and neoplasia terms.',
    iconName: 'BookMarked',
    badge: 'High-Yield Viva',
    targetFilter: 'definitions'
  },
  {
    id: 'tool-comparisons',
    title: 'Differentiate Between',
    description: 'High-yield exam comparison matrices: Coagulative vs Liquefactive, Acute vs Chronic Inflammation, Transudate vs Exudate, Benign vs Malignant.',
    iconName: 'Layers',
    badge: 'SAQ Core',
    targetFilter: 'comparisons'
  },
  {
    id: 'tool-classifications',
    title: 'Classifications',
    description: 'Standard WHO, Broders, TNM, Gell & Coombs, and Robertson pathological classifications.',
    iconName: 'ListTree',
    badge: 'Curriculum Standard',
    targetFilter: 'classifications'
  },
  {
    id: 'tool-flowcharts',
    title: 'Flowcharts & Mechanisms',
    description: 'Step-by-step schematic cascades of ischemic cell injury, inflammation mediator cascades, and thrombosis formation.',
    iconName: 'GitBranch',
    badge: 'Visual Revision',
    targetFilter: 'flowcharts'
  },
  {
    id: 'tool-clinical-correlations',
    title: 'Clinical Correlations',
    description: 'Clinico-pathological bridges connecting tissue changes with signs, symptoms, lab reports, and homoeopathic remedy affinities.',
    iconName: 'Stethoscope',
    badge: 'Integrated Learning',
    targetFilter: 'clinical'
  },
  {
    id: 'tool-high-yield',
    title: 'High-Yield Topics',
    description: 'Curated list of frequently repeated university examination topics from the last 10 years of BHMS exams.',
    iconName: 'Sparkles',
    badge: 'Exam Focused',
    targetFilter: 'high-yield'
  },
  {
    id: 'tool-rapid-revision',
    title: 'Rapid Revision',
    description: 'One-liner revision points, memory mnemonics, and quick keynotes for last-day university exam review.',
    iconName: 'Zap',
    badge: 'Last-Day Prep',
    targetFilter: 'rapid-revision'
  }
];

export const sampleDefinitions: PathologyDefinition[] = [
  {
    id: 'def-1',
    term: 'Necrosis',
    category: 'general',
    definition: 'A spectrum of morphological changes that follow cell death in living tissue, largely resulting from the progressive degradative action of enzymes on lethally injured cells, accompanied by inflammation.',
    significance: 'Pathological cell death with loss of membrane integrity and inflammatory reaction in host tissue.',
    highYield: true
  },
  {
    id: 'def-2',
    term: 'Apoptosis',
    category: 'general',
    definition: 'A pathway of programmed, energy-dependent cell death in which cells activate enzymes that degrade the cells own nuclear DNA and cytoplasmic proteins, maintaining cell membrane integrity without inducing inflammation.',
    significance: 'Can be physiological (embryogenesis, hormone withdrawal) or pathological (DNA damage).',
    highYield: true
  },
  {
    id: 'def-3',
    term: 'Metaplasia',
    category: 'general',
    definition: 'A reversible change in which one adult cell type (epithelial or mesenchymal) is replaced by another adult cell type of a different lineage that is better suited to withstand the hostile environment.',
    significance: 'Adaptive cellular change; predisposes to malignant transformation (e.g., Squamous metaplasia of respiratory tract in smokers).',
    highYield: true
  },
  {
    id: 'def-4',
    term: 'Anaplasia',
    category: 'general',
    definition: 'The lack of cellular differentiation and organization, characterized by pleomorphism, abnormal nuclear morphology, hyperchromatism, high nuclear-to-cytoplasmic ratio (1:1), and atypical mitoses.',
    significance: 'The hallmark of malignant transformation.',
    highYield: true
  },
  {
    id: 'def-5',
    term: 'Embolism',
    category: 'general',
    definition: 'An intravascular solid, liquid, or gaseous mass that is carried by the blood to a site distant from its point of origin, where it lodges and causes tissue dysfunction or infarction.',
    significance: '99% of emboli arise from dislodged thrombi (thromboembolism); high mortality in massive pulmonary embolism.',
    highYield: true
  }
];

export const sampleComparisons: PathologyComparison[] = [
  {
    id: 'comp-1',
    title: 'Necrosis vs Apoptosis',
    itemA: 'Necrosis',
    itemB: 'Apoptosis',
    category: 'general',
    points: [
      { feature: 'Cell Size', a: 'Enlarged (swelling)', b: 'Reduced (shrinkage)' },
      { feature: 'Nucleus', a: 'Pyknosis → Karyorrhexis → Karyolysis', b: 'Fragmentation into nucleosome-size fragments' },
      { feature: 'Plasma Membrane', a: 'Disrupted (loss of integrity)', b: 'Intact, altered structure with blebbing' },
      { feature: 'Cellular Contents', a: 'Enzymatic digestion, leak out of cell', b: 'Intact, packaged into apoptotic bodies' },
      { feature: 'Adjacent Inflammation', a: 'Frequent and pronounced', b: 'Absent (no inflammation)' },
      { feature: 'Physiologic / Pathologic', a: 'Invariably pathologic', b: 'Often physiologic (homeostasis, embryogenesis); may be pathologic' }
    ]
  },
  {
    id: 'comp-2',
    title: 'Transudate vs Exudate',
    itemA: 'Transudate',
    itemB: 'Exudate',
    category: 'general',
    points: [
      { feature: 'Definition', a: 'Fluid with low protein and low specific gravity', b: 'Inflammatory extravascular fluid with high protein and cellular debris' },
      { feature: 'Pathogenesis', a: 'Hydrostatic pressure ↑ or Colloid osmotic pressure ↓', b: 'Increased vascular permeability due to inflammation' },
      { feature: 'Protein Content', a: '< 3.0 g/dL', b: '> 3.0 g/dL' },
      { feature: 'Specific Gravity', a: '< 1.012', b: '> 1.020' },
      { feature: 'Fibrinogen / Clotting', a: 'Does not clot spontaneously', b: 'Readily clots (rich in fibrinogen)' },
      { feature: 'Cellular Elements', a: 'Few mesothelial or mononuclear cells', b: 'Numerous inflammatory leukocytes (Neutrophils / Macrophages)' }
    ]
  },
  {
    id: 'comp-3',
    title: 'Benign vs Malignant Neoplasms',
    itemA: 'Benign Tumor',
    itemB: 'Malignant Tumor',
    category: 'general',
    points: [
      { feature: 'Differentiation', a: 'Well differentiated; closely resembles tissue of origin', b: 'Variable (well, moderately, poorly differentiated or anaplastic)' },
      { feature: 'Rate of Growth', a: 'Slow and progressive', b: 'Rapid, erratic, may show areas of necrosis' },
      { feature: 'Local Invasion', a: 'Cohesive, expansile, encapsulated; does not infiltrate', b: 'Infiltrative, locally invasive, destroys adjacent tissue' },
      { feature: 'Metastasis', a: 'Absent (never metastasizes)', b: 'Present (hallmark of malignancy)' },
      { feature: 'Mitotic Figures', a: 'Rare, normal in configuration', b: 'Frequent, atypical, bizarre tripolar/quadripolar mitoses' },
      { feature: 'Prognosis', a: 'Generally favorable unless located in vital anatomical site', b: 'Guarded to poor without early intervention' }
    ]
  }
];

export const examQuestionsBank: PathologyQuestion[] = [
  {
    id: 'laq-1',
    type: 'laq',
    title: 'Define Inflammation. Describe in detail the Vascular and Cellular events of Acute Inflammation with suitable diagrams.',
    category: 'general',
    marks: 10,
    frequency: 'Repeated 7+ times in University Exams',
    preview: 'Structured framework: Definition → Cardinal signs (Celsus & Virchow) → Vascular events (Vasoconstriction, Vasodilation, Increased Permeability mechanisms) → Cellular events (Margination, Rolling, Adhesion, Diapedesis, Chemotaxis, Phagocytosis) → Homoeopathic correlation.'
  },
  {
    id: 'laq-2',
    type: 'laq',
    title: 'Define Neoplasia. Tabulate the differences between Benign and Malignant tumors. Explain the routes of Metastasis.',
    category: 'general',
    marks: 10,
    frequency: 'Repeated 8+ times in University Exams',
    preview: 'Structured framework: Willis definition → 8-point comparison table → Microscopic criteria of anaplasia → Routes of metastasis (Lymphatic, Hematogenous, Transcoelomic, Canalicular) → Common target organ examples.'
  },
  {
    id: 'laq-3',
    type: 'laq',
    title: 'Describe the etiology, pathogenesis, gross and microscopic features of Myocardial Infarction. Add a note on serum cardiac markers.',
    category: 'systemic',
    marks: 10,
    frequency: 'Repeated 6+ times in University Exams',
    preview: 'Structured framework: Definition & Risk factors → Plaque rupture & thrombotic occlusion mechanism → Chronological morphology table (0h to 2 months) → Cardiac Troponin I/T & CK-MB kinetics → Complications.'
  },
  {
    id: 'saq-1',
    type: 'saq',
    title: 'Describe the pathogenesis of Thrombosis. State Virchow’s Triad.',
    category: 'general',
    marks: 5,
    frequency: 'High Frequency SAQ',
    preview: 'Virchow Triad: 1. Endothelial injury, 2. Alteration in normal blood flow (stasis/turbulence), 3. Hypercoagulability. Lines of Zahn and fate of thrombus.'
  },
  {
    id: 'saq-2',
    type: 'saq',
    title: 'Differences between Primary and Secondary Pulmonary Tuberculosis.',
    category: 'systemic',
    marks: 5,
    frequency: 'High Frequency SAQ',
    preview: 'Comparison of Ghon focus/complex in unexposed host vs apical cavitary reactivation in sensitized host, lymph node involvement, and Mantoux status.'
  },
  {
    id: 'saq-3',
    type: 'saq',
    title: 'Describe the stages of Lobar Pneumonia.',
    category: 'systemic',
    marks: 5,
    frequency: 'High Frequency SAQ',
    preview: 'Laennec 4 stages: Stage of Congestion (1-2 days), Red Hepatization (2-4 days), Grey Hepatization (4-8 days), Resolution (8-10 days) with sputum and microscopic characteristics.'
  },
  {
    id: 'viva-1',
    type: 'viva',
    title: 'What are the 5 cardinal signs of inflammation and who described them?',
    category: 'general',
    preview: 'Rubor (redness), Tumor (swelling), Calor (heat), Dolor (pain) described by Celsus (1st century AD); Functio laesa (loss of function) added by Rudolf Virchow.'
  },
  {
    id: 'viva-2',
    type: 'viva',
    title: 'What are Aschoff bodies and Anitschkow cells?',
    category: 'systemic',
    preview: 'Pathognomonic histopathological lesions of Rheumatic Carditis. Anitschkow cells are activated macrophages with caterpillar-like chromatin; multinucleated giant form called Aschoff cells.'
  },
  {
    id: 'viva-3',
    type: 'viva',
    title: 'What is the Philadelphia chromosome and in which condition is it found?',
    category: 'hematology',
    preview: 'Reciprocal translocation between chromosome 9 and 22, designated as t(9;22)(q34;q11), creating the BCR-ABL fusion oncogene with constitutive tyrosine kinase activity. Characteristic of Chronic Myeloid Leukemia (CML >95%).'
  }
];
