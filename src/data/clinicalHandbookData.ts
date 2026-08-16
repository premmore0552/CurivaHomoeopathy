export interface ClinicalCondition {
  id: string;
  title: string;
  system: 'Metabolic & Endocrine' | 'Cardiovascular' | 'Respiratory' | 'Infectious Diseases' | 'Renal' | 'Musculoskeletal' | 'Neurological';
  overview: string;
  symptoms: string[];
  criteria: { label: string; values: string[] }[];
  investigations: string[];
  pathophysiology: string;
  miasmaticAnalysis: {
    psora: string;
    sycosis: string;
    syphilis: string;
    tubercular?: string;
  };
  remedies: {
    name: string;
    keynotes: string[];
  }[];
  lifestyle: string[];
  complications: string[];
  pearl: string;
}

export const clinicalConditions: ClinicalCondition[] = [
  {
    id: "diabetes",
    title: "Diabetes Mellitus",
    system: "Metabolic & Endocrine",
    overview: "A chronic metabolic disorder characterized by persistent hyperglycemia resulting from defects in insulin secretion, insulin action, or both. Leads to long-term microvascular and macrovascular complications.",
    symptoms: [
      "Polyuria (excessive urination due to osmotic diuresis)",
      "Polydipsia (excessive thirst in response to dehydration)",
      "Polyphagia (excessive hunger due to cellular starvation)",
      "Unexplained weight loss (catabolism of muscle and fat)",
      "Blurred vision (osmotic changes in the lens of the eye)",
      "Recurrent infections (e.g., vaginal candidiasis, poor wound healing)"
    ],
    criteria: [
      {
        label: "ADA Diagnostic Thresholds",
        values: [
          "Fasting Plasma Glucose (FPG) ≥ 126 mg/dL (7.0 mmol/L)",
          "2-Hour Post-Prandial Glucose (PPG) ≥ 200 mg/dL (11.1 mmol/L) during OGTT",
          "Glycated Hemoglobin (HbA1c) ≥ 6.5% (48 mmol/mol)",
          "Random Plasma Glucose ≥ 200 mg/dL (11.1 mmol/L) in a patient with classic symptoms"
        ]
      },
      {
        label: "Pre-Diabetes Thresholds",
        values: [
          "Fasting Plasma Glucose: 100 to 125 mg/dL (5.6 to 6.9 mmol/L)",
          "2-Hour PPG during OGTT: 140 to 199 mg/dL (7.8 to 11.0 mmol/L)",
          "HbA1c: 5.7% to 6.4%"
        ]
      }
    ],
    investigations: [
      "Fasting & Post-Prandial Blood Sugar (FBG / PPBG)",
      "Glycated Hemoglobin (HbA1c) every 3 months",
      "Oral Glucose Tolerance Test (OGTT) (75g anhydrous glucose)",
      "Urine Analysis for Microalbuminuria (early diabetic nephropathy marker) & Ketone bodies",
      "Lipid Profile (TC, LDL, HDL, Triglycerides) - increased cardiovascular risk assessment",
      "Serum Insulin and C-peptide levels (to differentiate Type 1 from Type 2)"
    ],
    pathophysiology: "Type 1 is characterized by autoimmune destruction of pancreatic beta-cells, leading to absolute insulin deficiency. Type 2 involves progressive insulin resistance in peripheral tissues (muscle, adipose tissue, liver) combined with a relative insulin secretory defect. The resulting intracellular glucose deprivation triggers gluconeogenesis and glycogenolysis, exacerbating systemic hyperglycemia.",
    miasmaticAnalysis: {
      psora: "Initial stage of functional imbalance, transient hyperglycemia, simple increased thirst, increased hunger, and nervous irritability. Functional dysfunction without organic structural alterations.",
      sycosis: "Insulin resistance, obesity, sluggish metabolic activity, accumulation of fatty deposits, metabolic syndrome, and slow, progressive onset of type 2 diabetes with lipid accumulation.",
      syphilis: "End-stage destructive changes: neuropathic ulcers, diabetic gangrene, proliferative retinopathy leading to blindness, renal parenchymal necrosis, and cardiovascular thrombosis.",
      tubercular: "Type 1 diabetes with rapid emargination, intense hunger with rapid weight loss, severe susceptibility to tuberculosis, fluctuating blood sugars, and unstable endocrine patterns."
    },
    remedies: [
      {
        name: "Syzygium Jambolanum",
        keynotes: [
          "A major anti-diabetic remedy; has immediate power of decreasing the amount of sugar in urine.",
          "Intense, unquenchable thirst with polyuria; weakness and severe emaciation.",
          "Diabetic ulcerations and skin infections that refuse to heal."
        ]
      },
      {
        name: "Phosphoricum Acidum",
        keynotes: [
          "Indicated for diabetes of nervous origin or from grief, sorrow, and mental anxiety.",
          "Urine is copious, milky-white, or loaded with phosphates and glucose; passed frequently at night.",
          "Severe mental apathy, physical debility, and profound indifference to all things."
        ]
      },
      {
        name: "Uranium Nitricum",
        keynotes: [
          "Covers diabetes originating from gastric or assimilative derangements.",
          "Polyuria, polydipsia, dry skin, and rapid emaciation accompanied by flatulent dyspepsia.",
          "Often associated with hypertension, nephritis, and gastric ulceration."
        ]
      },
      {
        name: "Gymnema Sylvestre",
        keynotes: [
          "Acts as a therapeutic 'sugar buster', modifying taste sensations for sweets.",
          "Marked weakness, exhaustion, polyuria, and burning sensation in hands and feet.",
          "Indicated in early stages of Type 2 diabetes with carbuncular tendencies."
        ]
      }
    ],
    lifestyle: [
      "Medical Nutrition Therapy (MNT): Low glycemic index, high fiber, complex carbohydrates.",
      "Aerobic physical activity: Minimum 150 minutes/week of moderate-intensity exercise.",
      "Weight management: Target 5-7% weight loss in overweight patients.",
      "Strict foot care: Daily inspections, avoid barefoot walking, professional nail trimming."
    ],
    complications: [
      "Diabetic Ketoacidosis (DKA) & Hyperosmolar Hyperglycemic State (HHS)",
      "Diabetic Retinopathy (blindness risk)",
      "Diabetic Nephropathy (End-Stage Renal Disease)",
      "Diabetic Neuropathy (Sensory-motor, autonomic, neuropathic ulcers)",
      "Coronary Artery Disease (CAD), Stroke, Peripheral Artery Disease (PAD)"
    ],
    pearl: "C-peptide is co-secreted with insulin in a 1:1 ratio. Because it has a longer half-life, checking C-peptide is the most authentic way to verify endogenous pancreatic beta-cell function, helping differentiate autoimmune Type 1 from insulin-resistant Type 2 diabetes."
  },
  {
    id: "hypertension",
    title: "Hypertension",
    system: "Cardiovascular",
    overview: "A chronic cardiovascular condition characterized by persistently elevated systemic arterial blood pressure. Often termed the 'silent killer' due to its asymptomatic progression until catastrophic end-organ damage occurs.",
    symptoms: [
      "Asymptomatic in most cases (90% identified through routine screening)",
      "Occipital headache (typically throbbing, occurring early in the morning)",
      "Dizziness, vertigo, and lightheadedness",
      "Epistaxis (nosebleeds due to fragile nasal capillary rupture)",
      "Palpitations, chest discomfort, or dyspnea on exertion",
      "Tinnitus or visual disturbances (blurring, scotomas in hypertensive crises)"
    ],
    criteria: [
      {
        label: "2017 ACC/AHA Classification",
        values: [
          "Normal: Systolic < 120 mmHg AND Diastolic < 80 mmHg",
          "Elevated: Systolic 120-129 mmHg AND Diastolic < 80 mmHg",
          "Stage 1 Hypertension: Systolic 130-139 mmHg OR Diastolic 80-89 mmHg",
          "Stage 2 Hypertension: Systolic ≥ 140 mmHg OR Diastolic ≥ 90 mmHg",
          "Hypertensive Crisis: Systolic > 180 mmHg and/or Diastolic > 120 mmHg"
        ]
      },
      {
        label: "JNC-8 Treatment Thresholds",
        values: [
          "General Population ≥ 60 years: Initiate therapy at BP ≥ 150/90 mmHg",
          "General Population < 60 years / Diabetics / Chronic Kidney Disease: Initiate at BP ≥ 140/90 mmHg"
        ]
      }
    ],
    investigations: [
      "Ambulatory Blood Pressure Monitoring (ABPM) - Gold standard for diagnosing white-coat or masked hypertension",
      "Electrocardiogram (ECG) to assess Left Ventricular Hypertrophy (LVH) (Sokolow-Lyon index)",
      "Echocardiogram to evaluate diastolic/systolic function and myocardial strain",
      "Renal Function Tests (Serum Creatinine, Blood Urea Nitrogen) and Urinalysis",
      "Fundoscopy (Hypertensive Retinopathy classification: Keith-Wagener-Barker grades I-IV)",
      "Serum Electrolytes (Sodium, Potassium - crucial in primary aldosteronism screening)"
    ],
    pathophysiology: "Arterial blood pressure is determined by cardiac output multiplied by total peripheral resistance. Primary (essential) hypertension (95%) involves a complex interplay of sympathetic nervous system overactivity, chronic activation of the Renin-Angiotensin-Aldosterone System (RAAS), genetic mutations, and endothelial dysfunction leading to vascular remodeling and luminal narrowing.",
    miasmaticAnalysis: {
      psora: "Spasmodic, functional arterial tension, vascular spasm due to emotional excitement, stress, or nervous irritability. Labile blood pressure with rapid spikes and return to normal.",
      sycosis: "Sclerotic vascular changes, progressive hypertrophy of arterial walls, chronic endothelial plaque deposits, sodium and water retention, and permanent consolidation of Stage 1/2 HTN.",
      syphilis: "Aneurysmal dilatations, arterial rupture, severe coronary artery stenosis, atheromatous plaque ulceration, malignant hypertension, and retinal hemorrhages or sudden apoplexy.",
      tubercular: "Erratic, rapidly shifting blood pressure in thin, tubercular individuals, chest oppressions, and hereditary hemorrhagic tendencies."
    },
    remedies: [
      {
        name: "Rauwolfia Serpentina",
        keynotes: [
          "A classic Homoeopathic hypotensive agent; acts directly on vasomotor centers.",
          "High blood pressure with symptoms of congestion in head, throbbing of arteries, and restlessness.",
          "Indicated for hyper-irritable, anxious patients with insomnia and high arterial tension."
        ]
      },
      {
        name: "Glonoinum",
        keynotes: [
          "Highly effective for sudden, violent hypertensive crises with severe congestion to the head.",
          "Throbbing, bursting headache; feels as if the skull would split open.",
          "Cannot bear the slightest heat or weight on the head; face is red, hot, and bloated."
        ]
      },
      {
        name: "Crataegus Oxyacantha",
        keynotes: [
          "Acts as a cardiac tonic; dissolves calcareous deposits in arteries and strengthens the myocardium.",
          "Hypertension with signs of cardiac failure, dyspnea on slight exertion, and cold extremities.",
          "Sustains the heart in chronic high vascular tension and prevents coronary sclerosis."
        ]
      },
      {
        name: "Aurum Metallicum",
        keynotes: [
          "Hypertension associated with arteriosclerosis and severe hyper-trophied heart.",
          "Severe nocturnal bone pain, profound suicidal depression, and hopelessness.",
          "High arterial pressure with a feeling of heavy pressure in the precordium."
        ]
      }
    ],
    lifestyle: [
      "DASH Diet (Dietary Approaches to Stop Hypertension): Rich in fruits, vegetables, low-fat dairy.",
      "Sodium restriction: Maintain dietary sodium intake < 2,000 mg (or < 1,500 mg in severe cases) per day.",
      "Aerobic physical training and smoking cessation.",
      "Limit alcohol consumption to ≤ 2 drinks/day for men and ≤ 1 drink/day for women."
    ],
    complications: [
      "Left Ventricular Hypertrophy (LVH) and Congestive Heart Failure (CHF)",
      "Ischemic or Hemorrhagic Stroke (Transient Ischemic Attack - TIA)",
      "Coronary Artery Disease & Myocardial Infarction",
      "Hypertensive Nephrosclerosis (CKD / ESRD)",
      "Aortic Aneurysm & Aortic Dissection (surgical emergency)"
    ],
    pearl: "To diagnose hypertension authentically, blood pressure must be measured on at least two separate occasions, with at least two readings taken 1-2 minutes apart with the patient sitting comfortably, back supported, arm at heart level, after resting silently for 5 minutes."
  },
  {
    id: "asthma",
    title: "Bronchial Asthma",
    system: "Respiratory",
    overview: "A heterogeneous, chronic inflammatory airway disease characterized by bronchial hyper-responsiveness, variable expiratory airflow limitation, and reversible airway remodeling.",
    symptoms: [
      "Wheezing (high-pitched whistling sound on expiration)",
      "Dyspnea (shortness of breath, worse at night or in cold air)",
      "Dry, hacking cough (often nocturnal, waking the patient)",
      "Chest tightness or feeling of suffocation",
      "Tachypnea and accessory muscle recruitment (sternocleidomastoid during severe attacks)",
      "Prolonged expiratory phase during lung auscultation"
    ],
    criteria: [
      {
        label: "GINA Diagnostic Guidelines",
        values: [
          "History of variable respiratory symptoms (wheeze, shortness of breath, cough, chest tightness) that worsen at night or with triggers",
          "Documented excessive expiratory airflow limitation: FEV1/FVC ratio is reduced (< 0.75-0.80 in adults, < 0.90 in children)"
        ]
      },
      {
        label: "Reversibility Testing (Diagnostic)",
        values: [
          "Increase in FEV1 by > 12% AND > 200 mL from baseline, 10-15 minutes after inhaling a rapid-acting beta-2 agonist (e.g., 200-400 mcg Albuterol)"
        ]
      }
    ],
    investigations: [
      "Spirometry with Pre- and Post-bronchodilator reversibility testing",
      "Peak Expiratory Flow (PEF) monitoring - assesses diurnal variability (> 10% indicates asthma)",
      "Bronchial Provocation Testing (Methacholine challenge) - used when spirometry is normal but asthma is suspected",
      "Fractional Exhaled Nitric Oxide (FeNO) - biomarker of eosinophilic airway inflammation",
      "Allergy Skin Prick Testing & Total Serum IgE (to identify atopic/allergic triggers)",
      "Chest X-ray (typically normal or shows hyperinflation during acute exacerbation)"
    ],
    pathophysiology: "A type I hypersensitivity reaction mediated by Th2 helper cells, IgE secretion, and eosinophil recruitment. Allergen cross-linking of IgE on mast cells triggers immediate degranulation of histamine, leukotrienes, and prostaglandins, causing bronchospasm. Late-phase inflammation leads to mucus hypersecretion, mucosal edema, and smooth muscle hyperplasia (airway remodeling).",
    miasmaticAnalysis: {
      psora: "Primary spasmodic bronchial constriction. Hyper-reactivity to dust, cold wind, pollen, or emotional stress. Paroxysmal attacks that resolve completely, leaving the lungs structurally intact.",
      sycosis: "Chronic mucous hypersecretion, thick, green-yellow expectoration, nasal polyposis, hypertrophic bronchial mucosa, wet catarrh, and asthma triggered by damp, rainy weather or seaside exposure.",
      syphilis: "Ulcerative destruction of bronchial epithelium, bronchiectasis, severe destructive emphysema, organic structural changes with permanent non-reversible airway obstruction.",
      tubercular: "Asthma in thin, narrow-chested individuals with a family history of phthisis. Marked susceptibility to taking cold, hectic flushes, and rapid physical emaciation."
    },
    remedies: [
      {
        name: "Arsenicum Album",
        keynotes: [
          "Greatest remedy for acute asthma, especially worse after midnight (1:00 AM to 2:00 AM).",
          "Profound dyspnea; patient cannot lie down, must sit up and lean forward for breath.",
          "Intense anxiety, restlessness, fear of death, and cold sweat; craves warm drinks in sips."
        ]
      },
      {
        name: "Ipecacuanha",
        keynotes: [
          "Indicated for spasmodic asthma with persistent, severe nausea and vomiting.",
          "Chest feels full of phlegm, with coarse rattling, but expectoration is difficult or absent.",
          "Suffocative cough; child becomes stiff, blue in the face, with gagging."
        ]
      },
      {
        name: "Blatta Orientalis",
        keynotes: [
          "An outstanding remedy for acute bronchial asthma, especially associated with bronchitis.",
          "Worse from damp weather, dust, physical exertion, and lying down.",
          "Acts as a powerful palliative and curative agent when there is a large accumulation of pus-like mucus."
        ]
      },
      {
        name: "Antimonium Tartaricum",
        keynotes: [
          "For severe catarrhal asthma with immense accumulation of mucus in the bronchi.",
          "Coarse, wet, rattling rales; chest feels full of phlegm, yet patient is unable to raise any.",
          "Profound weakness, drowsiness, cyanosis (blue lips), and cold sweat; worse from warm rooms."
        ]
      }
    ],
    lifestyle: [
      "Avoidance of known environmental triggers: dust mites, pet dander, mold, tobacco smoke.",
      "Monitor Peak Flow readings daily to detect early signs of clinical deterioration.",
      "Breathing exercises: Buteyko or pranayama to help control hyperventilation.",
      "Annual influenza and pneumococcal vaccination to prevent respiratory infections."
    ],
    complications: [
      "Status Asthmaticus (refractory acute asthma; life-threatening emergency)",
      "Pneumothorax (due to alveolar rupture)",
      "Atelectasis (mucus plugging blocking bronchioles)",
      "Respiratory Failure and Hypercapnic Coma",
      "Chronic Cor Pulmonale (right-sided heart failure due to long-term pulmonary hypertension)"
    ],
    pearl: "A common clinical trap is misdiagnosing 'cardiac asthma' as bronchial asthma. Cardiac asthma is bronchospasm caused by pulmonary congestion in congestive heart failure. Look for crackles, jugular venous distention, history of CAD, and elevated BNP (Brain Natriuretic Peptide) to distinguish them."
  },
  {
    id: "tuberculosis",
    title: "Tuberculosis",
    system: "Infectious Diseases",
    overview: "A highly communicable, chronic granulomatous infectious disease caused by Mycobacterium tuberculosis. Primarily attacks the pulmonary parenchyma but can disseminate to any organ system.",
    symptoms: [
      "Chronic cough lasting > 3 weeks (initially dry, later productive with purulent sputum)",
      "Hemoptysis (blood-streaked sputum due to caseous necrosis eroding blood vessels)",
      "Low-grade fever (characteristically showing evening rise with night sweats)",
      "Unexplained weight loss and cachexia (known historically as 'consumption')",
      "Anorexia, profound fatigue, and generalized malaise",
      "Pleuritic chest pain and dyspnea (especially with pleural effusion)"
    ],
    criteria: [
      {
        label: "WHO Diagnostic Criteria",
        values: [
          "Presumptive TB: Cough > 2 weeks, evening fever, weight loss, hemoptysis, or contact history",
          "Bacteriologically Confirmed: Positive sputum smear microscopy (acid-fast bacilli), positive GeneXpert MTB/RIF test, or positive M. tuberculosis culture"
        ]
      },
      {
        label: "Mantoux Tuberculin Skin Test (TST)",
        values: [
          "≥ 5 mm induration: Positive in HIV-infected, recent contacts, or immunosuppressed",
          "≥ 10 mm induration: Positive in immigrants from high-prevalence areas, healthcare workers, injection drug users",
          "≥ 15 mm induration: Positive in persons with no known risk factors"
        ]
      }
    ],
    investigations: [
      "Sputum Acid-Fast Bacilli (AFB) smear microscopy (Ziehl-Neelsen staining) - 3 morning samples",
      "GeneXpert MTB/RIF assay - PCR test that detects MTB DNA and Rifampicin resistance within 2 hours",
      "Mycobacterial Culture on Lowenstein-Jensen (LJ) medium (takes 4-8 weeks) or liquid culture (MGIT)",
      "Chest X-ray (Pulmonary TB: apical/upper lobe infiltrates, cavitation, fibronodular lesions)",
      "Interferon-Gamma Release Assay (IGRA) - QuantiFERON-TB Gold blood test",
      "Histopathology of biopsy specimens: reveals caseating granulomas with Langhans giant cells"
    ],
    pathophysiology: "M. tuberculosis bacilli are inhaled via aerosol droplets and phagocytosed by alveolar macrophages. If the macrophages fail to destroy the bacilli, the bacteria replicate intracellularly, triggering a cell-mediated immune response (Type IV hypersensitivity). T-lymphocytes release cytokines to wall off the infection, forming a Ghon focus. Caseous necrosis occurs at the center, which can liquefy and cavitate, leading to clinical disease or hematogenous dissemination.",
    miasmaticAnalysis: {
      psora: "Initial stage of localized lymphatic irritation, mild dry cough, tickling in larynx, susceptibility to colds, and hypersensitivity to changes in temperature.",
      sycosis: "Chronic induration of lymph nodes, persistent fibrotic lesions in lung parenchyma, pleural thickening, and chronic, stagnant bronchial catarrh.",
      syphilis: "Destructive phase: caseous tissue liquefaction, cavitary lesions, extensive tissue destruction, hemoptysis, and bone/organ parenchymal destruction.",
      tubercular: "The classic 'Tubercular Miasm' itself, representing a combination of Psora and Syphilis. Marked by rapid emaciation, night sweats, hectic fever, longing for travel/open air, chest narrowness, and high vulnerability to destructive chest pathology."
    },
    remedies: [
      {
        name: "Bacillinum Burnett",
        keynotes: [
          "An outstanding nosode prepared from tuberculous sputum; indicated for pulmonary tuberculosis.",
          "Severe, chronic cough with easy expectoration of thick, purulent, green-yellow sputum.",
          "Patient is thin, take colds easily, has a history of respiratory illness, and suffers from nocturnal dyspnea."
        ]
      },
      {
        name: "Tuberculinum Koch",
        keynotes: [
          "Indicated when remedies fail to act or when symptoms are constantly changing.",
          "Rapid emaciation despite a good appetite; constant desire for open air, cold wind, and travel.",
          "Prone to dry, hard, shaking cough with evening rise of fever and profuse night sweats."
        ]
      },
      {
        name: "Phosphorus",
        keynotes: [
          "Constitutional remedy for tall, slender, narrow-chested, high-grade phthisical individuals.",
          "Tightness across the chest; dry, tickling cough worse from talking, laughing, and cold air.",
          "Frequent hemoptysis (bright red, free-flowing blood); hoarseness with pain in the larynx."
        ]
      },
      {
        name: "Arsenicum Iodatum",
        keynotes: [
          "Excellent for pulmonary tuberculosis with rapid emaciation, profound debility, and hectic fever.",
          "Sputum is copious, thick, yellow, purulent, and offensive.",
          "Drenching night sweats; aphthous ulcers in mouth, and persistent diarrhea."
        ]
      }
    ],
    lifestyle: [
      "Strict compliance with Directly Observed Therapy Short-Course (DOTS).",
      "Nutritional rehabilitation: High calorie, high protein diet to counteract tuberculous wasting.",
      "Infection control: Well-ventilated rooms, cover mouth when coughing, use sputum disposal bags.",
      "Abstain from smoking, alcohol, and excessive physical exertion during active therapy."
    ],
    complications: [
      "Hemoptysis (due to Rasmussen's aneurysm rupture in TB cavities - fatal)",
      "Pneumothorax and Pleural Effusion / Empyema",
      "Miliary Tuberculosis (disseminated systemic infection affecting spleen, liver, bone marrow)",
      "Tuberculous Meningitis (high mortality and neurological morbidity)",
      "Pott's Disease (tuberculosis of the spine; vertebral collapse and paraplegia)"
    ],
    pearl: "GeneXpert MTB/RIF is a game-changer because it not only confirms M. tuberculosis within 2 hours, but also detects mutations in the rpoB gene, which determines Rifampicin resistance, providing immediate guidance on whether a patient has Multi-Drug Resistant TB (MDR-TB)."
  },
  {
    id: "copd",
    title: "COPD",
    system: "Respiratory",
    overview: "Chronic Obstructive Pulmonary Disease is a common, preventable, and treatable lung disease characterized by persistent respiratory symptoms and airflow limitation due to airway and/or alveolar abnormalities, typically caused by tobacco smoke exposure.",
    symptoms: [
      "Progressive, chronic dyspnea (worse with exercise, persistent over time)",
      "Chronic cough (often productive of thick, tenacious sputum, worse in morning)",
      "Wheezing and chest tightness",
      "Barrel chest (increased anteroposterior chest diameter due to air trapping)",
      "Use of accessory breathing muscles and pursed-lip breathing",
      "Cyanosis and peripheral edema (in advanced disease with cor pulmonale)"
    ],
    criteria: [
      {
        label: "GOLD spirometric Criteria",
        values: [
          "Post-bronchodilator spirometry showing FEV1/FVC < 0.70 confirms persistent airflow limitation",
          "GOLD 1 (Mild): FEV1 ≥ 80% predicted",
          "GOLD 2 (Moderate): 50% ≤ FEV1 < 80% predicted",
          "GOLD 3 (Severe): 30% ≤ FEV1 < 50% predicted",
          "GOLD 4 (Very Severe): FEV1 < 30% predicted"
        ]
      },
      {
        label: "Clinical Phenotypes",
        values: [
          "Chronic Bronchitis ('Blue Bloater'): Productive cough for ≥ 3 months in 2 consecutive years; cyanotic, overweight, peripheral edema",
          "Emphysema ('Pink Puffer'): Permanent alveolar enlargement distal to terminal bronchioles; thin, hyperventilating, pink skin, uses accessory muscles"
        ]
      }
    ],
    investigations: [
      "Spirometry (pre- and post-bronchodilator) - Mandatory for diagnosis",
      "Chest X-ray: shows hyperinflation, flattened diaphragms, increased retrosternal airspace, bullae",
      "Arterial Blood Gas (ABG): assesses hypoxemia (low PaO2) and hypercapnia (high PaCO2)",
      "High-Resolution CT (HRCT) of the chest: visualizes extent of centrilobular or panacinar emphysema",
      "Alpha-1 Antitrypsin (AAT) level screening (recommended for patients diagnosed under age 45)",
      "Echocardiogram: evaluates pulmonary artery pressure and right ventricular function"
    ],
    pathophysiology: "Chronic inhalation of noxious particles (primarily cigarette smoke) triggers persistent inflammatory responses in the airways. Inflammatory cells (macrophages, neutrophils, CD8+ T-cells) release proteases (elastase) that outpace antiproteases (alpha-1 antitrypsin), resulting in the enzymatic destruction of alveolar walls (emphysema). Concurrently, small airway fibrosis and goblet cell hyperplasia lead to chronic airflow obstruction.",
    miasmaticAnalysis: {
      psora: "Mild dyspnea on exertion, transient bronchial irritation, dry cough from dust or smoke, and initial functional fatigue. No structural damage.",
      sycosis: "Chronic bronchitis phase: excessive mucus hypersecretion, hypertrophied bronchial glands, persistent productive cough, thick greenish sputum, and fluid retention (anasarca) in cor pulmonale.",
      syphilis: "Emphysematous tissue destruction, loss of alveolar septa, bullae formation, parenchymal necrosis, non-reversible tissue destruction, severe senile chest deformities.",
      tubercular: "Rapid emaciation, dry hacking cough, chest weakness, chest wall retractions, and high susceptibility to secondary mycobacterial infections."
    },
    remedies: [
      {
        name: "Antimonium Tartaricum",
        keynotes: [
          "Indicated for advanced stage of chronic bronchitis with rattling, wet chest.",
          "Lungs feel full of mucus, but patient has no power to expectorate.",
          "Severe dyspnea, cyanosis, orthopnea; patient is cold, drowsy, and wants to be fanned."
        ]
      },
      {
        name: "Ammonium Carbonicum",
        keynotes: [
          "Indicated for elderly, emphysematous patients with chronic winter cough.",
          "Great accumulation of mucus with constant rattling, but coughing causes exhaustion.",
          "Severe dyspnea; worse from cold, damp air, and ascending stairs; cyanotic lips."
        ]
      },
      {
        name: "Aspidosperma",
        keynotes: [
          "Considered the 'digitalis of the lungs'; acts as a respiratory stimulant.",
          "Specifically indicated for severe dyspnea, air hunger, and cyanosis during exertion.",
          "Promotes oxygenation of blood and removes temporary obstruction to oxidation."
        ]
      },
      {
        name: "Lobelia Inflata",
        keynotes: [
          "Indicated for extreme dyspnea with a sensation of a lump in the throat.",
          "Sensation of empty weakness, or weight and oppression in the chest.",
          "Asthmatic and emphysematous chest symptoms accompanied by severe nausea and cold sweat."
        ]
      }
    ],
    lifestyle: [
      "Smoking cessation is the most critical intervention to halt FEV1 decline.",
      "Pulmonary Rehabilitation: Exercise training, breathing retraining (pursed-lip breathing).",
      "Oxygen therapy: Prescribed if resting PaO2 ≤ 55 mmHg or SaO2 ≤ 88% (long-term use > 15 hrs/day improves survival).",
      "Nutritional therapy: High-fat, low-carbohydrate meals (carbohydrate metabolism produces more CO2)."
    ],
    complications: [
      "Acute COPD Exacerbation (frequently triggered by viral/bacterial infections)",
      "Spontaneous Pneumothorax (rupture of emphysematous bullae)",
      "Cor Pulmonale (right ventricular hypertrophy and failure due to chronic pulmonary vasoconstriction)",
      "Secondary Polycythemia (erythrocytosis driven by chronic tissue hypoxia)",
      "Respiratory Failure (Type II hypercapnic respiratory failure)"
    ],
    pearl: "In COPD patients with chronic hypercapnia, the respiratory center in the medulla becomes desensitized to CO2. Their respiratory drive is driven entirely by hypoxia. Administering oxygen at high flow rates can eliminate their hypoxic drive, leading to acute respiratory hypoventilation, hypercapnic coma, and death. Always titrate oxygen to target saturations of 88-92%."
  },
  {
    id: "pneumonia",
    title: "Pneumonia",
    system: "Respiratory",
    overview: "An acute infection of the lung parenchyma (alveoli and respiratory bronchioles) caused by bacteria, viruses, or fungi, leading to alveolar filling with inflammatory exudate and consolidation.",
    symptoms: [
      "High-grade fever accompanied by shaking chills or rigors (especially pneumococcal)",
      "Productive cough with purulent or rusty sputum (Streptococcus pneumoniae)",
      "Pleuritic chest pain (sharp, stabbing pain that worsens on deep breathing or coughing)",
      "Dyspnea, tachypnea, and accessory muscle use",
      "Dullness to percussion, increased tactile fremitus, and bronchial breath sounds on auscultation",
      "Late inspiratory crackles (crepitations) and vocal resonance (bronchophony, egophony)"
    ],
    criteria: [
      {
        label: "CURB-65 Severity Score",
        values: [
          "Confusion (new onset): 1 point",
          "Urea (BUN) > 19 mg/dL (> 7 mmol/L): 1 point",
          "Respiratory rate ≥ 30 breaths/minute: 1 point",
          "Blood pressure (Systolic < 90 or Diastolic ≤ 60 mmHg): 1 point",
          "Age ≥ 65 years: 1 point",
          "Score 0-1: Low risk, outpatient management; Score 2: Moderate risk, consider short hospital stay; Score ≥ 3: High risk, urgent inpatient admission (consider ICU for 4-5)"
        ]
      },
      {
        label: "Clinical Classifications",
        values: [
          "Community-Acquired Pneumonia (CAP): Acquired outside healthcare settings",
          "Hospital-Acquired Pneumonia (HAP): Occurring ≥ 48 hours after hospital admission",
          "Aspiration Pneumonia: Inhalation of gastric contents or oropharyngeal secretions"
        ]
      }
    ],
    investigations: [
      "Chest X-ray (PA and Lateral views) - Gold standard (reveals lobar consolidation, interstitial infiltrates, or air bronchograms)",
      "Sputum smear microscopy (Gram stain) and Sputum Culture with drug susceptibility testing",
      "Blood Cultures (minimum two sets, taken before antibiotic administration)",
      "Complete Blood Count (CBC) showing leukocytosis (WBC > 15,000/mcL) with left shift (increased bands)",
      "Inflammatory markers: C-Reactive Protein (CRP) and Procalcitonin (highly specific for bacterial infection)",
      "Pulse Oximetry and ABG analysis (to assess hypoxemia and respiratory distress)"
    ],
    pathophysiology: "Pathogens escape upper respiratory defenses, reaching the alveoli. The inflammatory response triggers an influx of neutrophils and plasma, leading to alveolar congestion (Red Hepatization: alveoli filled with erythrocytes, neutrophils, and fibrin). This progresses to Gray Hepatization (erythrocytes disintegrate, leaving fibrin and neutrophils), and finally, Resolution (macrophages clear debris, restoring alveolar architecture).",
    miasmaticAnalysis: {
      psora: "Congestion stage: sudden fever, chilliness, rapid pulse, dry irritative cough, and functional dyspnea. Intense thermal and sensory reactions without structural consolidation.",
      sycosis: "Exudation and catarrhal stage: heavy, thick, green-yellow mucous filling the alveoli, chronic interstitial infiltration, and pleural effusion with fibrous adhesions.",
      syphilis: "Gangrene of lungs, pulmonary abscess formation, extensive tissue necrosis, fetid breath, and collapse of pulmonary vasculature.",
      tubercular: "Slow, unresolved pneumonia that threatens to terminate in phthisis/tuberculosis, rapid wasting, hectic evening fever, and profound susceptibility to recurrent chest infections."
    },
    remedies: [
      {
        name: "Bryonia Alba",
        keynotes: [
          "Classic remedy for stage of consolidation; worse from the slightest motion, better from rest.",
          "Dry, painful cough; patient holds chest with hands because movement is agonizing.",
          "Sharp, pleuritic stitching pains; wants to lie on the affected side to limit movement.",
          "Intense thirst for large quantities of cold water; dry mouth, and white-coated tongue."
        ]
      },
      {
        name: "Phosphorus",
        keynotes: [
          "Indicated for stage of hepatization, especially in tall, slender, weak patients.",
          "Tightness, weight, and heavy oppression in chest; hard, dry, racking cough.",
          "Sputum is rusty-colored, blood-streaked, or salty; worse from lying on left side.",
          "Craves ice-cold drinks, which are vomited as soon as they become warm in the stomach."
        ]
      },
      {
        name: "Chelidonium Majus",
        keynotes: [
          "Excellent for right-sided lobar pneumonia accompanied by hepatic or bilious symptoms.",
          "Pain under the lower angle of the right scapula; yellow-coated tongue and jaundice.",
          "Great relief of gastric symptoms and cough from drinking hot milk."
        ]
      },
      {
        name: "Sanguinaria Canadensis",
        keynotes: [
          "Highly useful for right-sided pneumonia with severe vasomotor disturbances.",
          "Burning pain in chest, rust-colored sputum, and red, burning cheeks (hectic flush).",
          "Cough is dry, hacking, accompanied by offensive breath and pain in the right shoulder."
        ]
      }
    ],
    lifestyle: [
      "Adequate hydration to thin and mobilize tenacious pulmonary secretions.",
      "Bed rest, deep breathing exercises, and chest physiotherapy to facilitate lung expansion.",
      "Abstain from cough suppressants in productive coughs (retards clearing of infection).",
      "Pneumococcal and annual influenza vaccines to reduce risk of future pneumonias."
    ],
    complications: [
      "Parapneumonic Pleural Effusion and Empyema (pus in the pleural space)",
      "Lung Abscess (cavitary necrosis of lung tissue, especially with aspiration)",
      "Sepsis and Septic Shock (pathogens entry into the bloodstream)",
      "Acute Respiratory Distress Syndrome (ARDS) (diffuse alveolar damage)",
      "Meningitis or Endocarditis (hematogenous seeding of Streptococcus pneumoniae)"
    ],
    pearl: "Rusty sputum is highly characteristic of Streptococcus pneumoniae. The rusty color is not fresh bleeding, but represents altered hemoglobin from degenerated red blood cells and neutrophils within the consolidated alveoli during the transition from red to gray hepatization."
  },
  {
    id: "dengue",
    title: "Dengue Fever",
    system: "Infectious Diseases",
    overview: "A mosquito-borne, acute febrile viral disease caused by the Dengue Virus (DENV 1-4) and transmitted by the Aedes aegypti vector. Can progress to severe plasma leakage and hemorrhage.",
    symptoms: [
      "Sudden onset of high-grade fever (up to 104°F/40°C), typically biphasic ('saddleback')",
      "Retro-orbital pain (exquisite pain behind the eyes, worse on eye movement)",
      "Severe headache, myalgia, and arthralgia (classically called 'Breakbone Fever')",
      "Maculopapular rash (starts on trunk, spreads to limbs; 'white islands in a sea of red')",
      "Minor hemorrhagic manifestations (petechiae, gum bleeding, epistaxis)",
      "Nausea, vomiting, abdominal pain, and profound prostration"
    ],
    criteria: [
      {
        label: "WHO Dengue Classifications",
        values: [
          "Dengue without Warning Signs: Fever with 2 of: nausea/vomiting, rash, aches, leukopenia, positive tourniquet test",
          "Dengue with Warning Signs: Abdominal pain, persistent vomiting, mucosal bleed, lethargy, hepatomegaly, rapid drop in platelets with hematocrit rise",
          "Severe Dengue: Severe plasma leakage (leading to shock/fluid accumulation), severe bleeding, or severe organ impairment (AST/ALT ≥ 1,000 U/L, impaired consciousness)"
        ]
      },
      {
        label: "Tourniquet Test (Diagnostic Aid)",
        values: [
          "Inflate BP cuff midway between systolic and diastolic pressure for 5 minutes. Positive test if ≥ 10 petechiae per square inch are observed, indicating capillary fragility."
        ]
      }
    ],
    investigations: [
      "Dengue NS1 Antigen (non-structural protein 1) - Highly positive during days 1-5 of fever",
      "Dengue IgM & IgG antibodies (ELISA) - Positive from day 5 onwards",
      "Complete Blood Count (CBC) monitored daily: looking for Leukopenia (WBC < 4,000/mcL) and Thrombocytopenia (Platelet count < 100,000/mcL)",
      "Hematocrit (Hct) monitoring: > 20% rise from baseline indicates hemoconcentration due to plasma leakage",
      "Liver Function Tests (LFT): elevated AST and ALT (AST is typically higher than ALT in Dengue)",
      "Coagulation Profile (PT, APTT, Fibrinogen) - performed if severe bleeding is suspected"
    ],
    pathophysiology: "The virus infects dendritic cells, macrophages, and hepatocytes. Severity is driven by Antibody-Dependent Enhancement (ADE) - previous infection with one serotype produces non-neutralizing antibodies that facilitate viral entry during secondary infection with a different serotype. This triggers an explosive release of cytokines ('cytokine storm'), causing transient endothelial junctional disruption and severe plasma leakage.",
    miasmaticAnalysis: {
      psora: "Typical breakbone fever phase: sudden chill, high fever, intense headache, photophobia, severe body aches, and skin hypersensitivity. Intensely reactive functional state.",
      sycosis: "Stagnant, sluggish phase: fluid retention in pleura/peritoneum (ascites) due to capillary leakage, lingering hepatosplenomegaly, and slow convalescence with persistent fatigue.",
      syphilis: "Severe hemorrhagic phase: epistaxis, hematemesis, melena, disseminated intravascular coagulation (DIC), sudden circulatory collapse (shock), and internal organ necrosis.",
      tubercular: "Rapidly fluctuating fever, severe physical wasting, lung congestion, and severe hemorrhagic tendencies in delicate constitutions."
    },
    remedies: [
      {
        name: "Eupatorium Perfoliatum",
        keynotes: [
          "Specific Homoeopathic remedy for dengue; known as the 'bone-set'.",
          "Sensation as if all bones were broken; intense, aching pain in back, limbs, and head.",
          "Severe retro-orbital pain; soreness of eyeballs; high fever with severe chills.",
          "Nausea and vomiting of bile; thirst for cold water during chill."
        ]
      },
      {
        name: "Gelsemium Sempervirens",
        keynotes: [
          "Indicated for the '3 Ds': Dullness, Drowsiness, and Dizziness.",
          "Fever with complete absence of thirst; patient is heavy, lethargic, and wants to lie quiet.",
          "Muscular soreness, motor weakness, trembling of limbs, and heavy eyelids.",
          "Severe band-like headache starting in the occiput and radiating to forehead."
        ]
      },
      {
        name: "Crotalus Horridus",
        keynotes: [
          "Indicated for severe hemorrhagic dengue (Dengue Hemorrhagic Fever).",
          "Sudden, passive, dark, non-coagulable hemorrhages from every orifice of the body.",
          "Severe thrombocytopenia with ecchymoses, petechiae, and septic state.",
          "Profound prostration, coldness of skin, and yellow coloration of skin (jaundice)."
        ]
      },
      {
        name: "Rhus Toxicodendron",
        keynotes: [
          "High fever with intense joint pains, making the patient extremely restless.",
          "Great relief of pains and stiffness from continuous motion; worse during initial movement and rest.",
          "Dry, red, triangular-coated tip of the tongue; intense thirst for cold milk/water."
        ]
      }
    ],
    lifestyle: [
      "Aggressive oral rehydration therapy (ORT) with electrolytes, juices, or ORS to combat plasma leakage.",
      "Strict bed rest; avoid physical exertion during the critical phase (days 3-7).",
      "Avoid NSAIDs (e.g., Aspirin, Ibuprofen, Diclofenac) because they impair platelet function and worsen bleeding risk.",
      "Use mosquito nets and repellents to prevent transmission of virus to others."
    ],
    complications: [
      "Severe Plasma Leakage leading to Dengue Shock Syndrome (DSS)",
      "Severe Hemorrhage (gastrointestinal bleeding, intracranial hemorrhage)",
      "Myocarditis and cardiac arrhythmias",
      "Encephalitis and Acute Liver Failure (Severe Hepatitis)",
      "Hemophagocytic Lymphohistiocytosis (HLH) (rare hyper-inflammatory condition)"
    ],
    pearl: "The 'Critical Phase' of dengue begins not at the height of fever, but precisely as the fever subsides (defervescence, typically between days 3 to 7). This is when capillary permeability peaks, and patients are at the highest risk of plasma leakage, shock, and sudden clinical deterioration."
  },
  {
    id: "typhoid",
    title: "Typhoid Fever",
    system: "Infectious Diseases",
    overview: "A systemic, life-threatening acute febrile illness caused by Salmonella enterica serovar Typhi. Transmitted via the fecal-oral route, causing severe intestinal and lymphatic infection.",
    symptoms: [
      "Step-ladder pattern fever (fever rises incrementally daily, peaking in the second week)",
      "Relative bradycardia (Faget's Sign: pulse rate is inappropriately slow for the level of fever)",
      "Rose Spots (faint, blanching, rose-colored macules on chest and abdomen, days 7-10)",
      "Abdominal discomfort, flatulence, and 'pea-soup' diarrhea (or stubborn constipation)",
      "Dry, coated tongue with red margins and tip (typhoid tongue)",
      "Profound stupor, delirium, and apathy (historically termed the 'typhoid state')"
    ],
    criteria: [
      {
        label: "WHO Diagnostic Criteria",
        values: [
          "Suspected Case: Persistent fever ≥ 38°C for ≥ 3 days with abdominal symptoms, bradycardia, or splenomegaly",
          "Confirmed Case: Isolation of S. typhi from blood, bone marrow, stool, or urine culture"
        ]
      },
      {
        label: "Widal Test Interpretation",
        values: [
          "Detects antibodies to S. typhi O (somatic) and H (flagellar) antigens",
          "Titers of O antigen ≥ 1:160 indicate active acute infection; H antigen ≥ 1:160 indicate past infection or immunization. Diagnostic value is highest when a four-fold rise in titers is demonstrated 7-10 days apart."
        ]
      }
    ],
    investigations: [
      "Blood Culture (positive in 90% during week 1; gold standard early in disease)",
      "Widal Test (performed from second week onwards)",
      "Typhidot ELISA test (detects IgM and IgG antibodies, positive as early as day 3-4)",
      "Bone Marrow Culture (most sensitive, remains positive even after antibiotic therapy)",
      "Stool and Urine Cultures (positive in third and fourth weeks; identifies chronic carriers)",
      "Complete Blood Count (CBC) typically revealing Leukopenia with relative lymphocytosis"
    ],
    pathophysiology: "S. typhi bacteria survive gastric acid, invade M cells of Peyer's patches in the terminal ileum, and are phagocytosed by macrophages. They replicate intracellularly in lymph nodes, enter the bloodstream (primary bacteremia), and disseminate to the liver, spleen, and gallbladder. After secondary bacteremia, they reinvade Peyer's patches, triggering severe inflammatory necrosis and ulceration.",
    miasmaticAnalysis: {
      psora: "Sudden onset of high fever, chills, mild gastric disturbance, dry throat, headaches, and functional restlessness. Dynamic constitutional battle.",
      sycosis: "Stagnant stage: chronic splenomegaly, abdominal bloating, water-logged tissues, sluggish mental state, and chronic biliary carrier states (bacteria residing in gallbladder).",
      syphilis: "Severe necrotic phase: sloughing and ulceration of Peyer's patches, intestinal hemorrhage (melena), intestinal perforation, septic shock, and wild, raving delirium.",
      tubercular: "Intermittent, hectic fevers, rapid physical wasting, hectic flushes, chronic diarrhea, and high susceptibility to septic, typhoid states."
    },
    remedies: [
      {
        name: "Baptisia Tinctoria",
        keynotes: [
          "The premier remedy for typhoid fever in the septic state.",
          "Profound stupor; patient falls asleep mid-sentence; feels as if his body is scattered in pieces.",
          "All secretions are highly offensive: breath, sweat, stool, and urine are intensely putrid.",
          "Face is dark, dusky, bloated, looking besotted (like a drunkard); dull, heavy expression."
        ]
      },
      {
        name: "Pyrogenium",
        keynotes: [
          "An outstanding remedy for septic fevers, septicemia, and severe typhoid states.",
          "Marked dissociation between pulse and temperature (temperature high with rapid pulse, or vice versa).",
          "Profound restlessness; must move constantly because the bed feels extremely hard.",
          "Tongue is clean, smooth, looking like raw beef; all discharges have a horrible, carrion-like odor."
        ]
      },
      {
        name: "Arsenicum Album",
        keynotes: [
          "Indicated in late stages of typhoid with extreme prostration, anxiety, and restlessness.",
          "High fever with evening rise; craves cold water in small sips; intense burning pains.",
          "Stool is dark, watery, extremely offensive, accompanied by rapid exhaustion."
        ]
      },
      {
        name: "Bryonia Alba",
        keynotes: [
          "First stage of typhoid with slow onset, severe bursting headache, and intense dry mouth.",
          "Patient is extremely irritable, wants to be left completely quiet; talks of his business during delirium.",
          "Stubborn constipation; dry, burnt-looking stool; white-coated tongue."
        ]
      }
    ],
    lifestyle: [
      "Strict diet during acute phase: Liquid or semi-solid, easily digestible, low-residue foods (to prevent irritation of ulcerated Peyer's patches).",
      "Ensure complete purification of drinking water (boiling, filtration, chlorination).",
      "Bed rest; gradual return to physical activity to allow intestinal ulcers to heal safely.",
      "Strict hand hygiene, especially for food handlers, to prevent fecal-oral transmission."
    ],
    complications: [
      "Intestinal Hemorrhage (typically in third week; caused by erosion of blood vessels in Peyer's patches)",
      "Intestinal Perforation (life-threatening surgical emergency; sudden abdominal pain, rigidity, guarding)",
      "Typhoid Myocarditis and Toxic Encephalopathy",
      "Cholecystitis and chronic carrier state (shedding bacteria in feces for > 1 year)",
      "Osteomyelitis (Salmonella osteomyelitis is highly classic, especially in sickle-cell patients)"
    ],
    pearl: "Faget's sign is the clinical finding of relative bradycardia in typhoid fever. Normally, for every 1°F rise in body temperature, the heart rate increases by 10 beats per minute. In typhoid, the pulse remains slow despite high fever, a vital diagnostic clue."
  },
  {
    id: "stroke",
    title: "Stroke",
    system: "Neurological",
    overview: "A cerebrovascular accident (CVA) characterized by sudden, focal neurological deficit lasting > 24 hours (or leading to death) caused by disruption of cerebral blood flow due to ischemia or hemorrhage.",
    symptoms: [
      "Sudden numbness or weakness of the face, arm, or leg (especially unilateral)",
      "Sudden confusion, difficulty speaking (aphasia), or understanding speech",
      "Sudden trouble seeing in one or both eyes (hemianopia)",
      "Sudden trouble walking, dizziness, loss of balance or coordination",
      "Sudden, severe headache with no known cause ('thunderclap' headache in hemorrhagic)",
      "Facial asymmetry (mouth drooping on the affected side)"
    ],
    criteria: [
      {
        label: "FAST Clinical Screen",
        values: [
          "Face Drooping: Ask the person to smile. Is one side drooping?",
          "Arm Weakness: Ask the person to raise both arms. Does one drift downward?",
          "Speech Difficulty: Ask the person to repeat a simple phrase. Is speech slurred or strange?",
          "Time to call Emergency: If any signs are present, time is brain!"
        ]
      },
      {
        label: "Pathological Classification",
        values: [
          "Ischemic Stroke (85%): Caused by thrombotic or embolic occlusion of a cerebral artery",
          "Hemorrhagic Stroke (15%): Caused by rupture of a cerebral vessel (intracerebral or subarachnoid)"
        ]
      }
    ],
    investigations: [
      "Non-Contrast CT Scan of the brain - Mandatory first-line test (instantly rules out hemorrhage before thrombolysis)",
      "Brain MRI (Diffusion-Weighted Imaging - DWI) - Highly sensitive for hyperacute ischemic stroke (reveals ischemia within minutes)",
      "Carotid Doppler Ultrasound - Evaluates stenosis of internal carotid arteries",
      "Echocardiogram (TTE/TEE) - Identifies cardioembolic sources (e.g., atrial fibrillation clots, mural thrombi)",
      "Coagulation Screen (PT, APTT, INR, Platelets)",
      "ECG - Screens for atrial fibrillation (major risk factor for embolic stroke)"
    ],
    pathophysiology: "Ischemic stroke leads to a central core of irreversible necrosis surrounded by an ischemic penumbra (hypoperfused, salvageable tissue). Lack of oxygen/glucose impairs ATP-dependent sodium-potassium pumps, leading to intracellular sodium accumulation, cellular swelling (cytotoxic edema), calcium influx, glutamate excitotoxicity, and cell death. Hemorrhagic stroke causes direct tissue destruction and compressive mass effect.",
    miasmaticAnalysis: {
      psora: "Transient cerebral congestion, spasming vessels, temporary lightheadedness, and transient focal numbness that resolves within minutes (Transient Ischemic Attack).",
      sycosis: "Atherosclerotic luminal narrowing of carotid or cerebral vessels, slowly progressive chronic ischemic cerebral changes, and lacunar infarcts.",
      syphilis: "Arterial wall degeneration, aneurysmal rupture, major hemorrhagic stroke, severe vascular necrosis, cerebral softeness, and permanent hemiplegia or aphonia.",
      tubercular: "Sudden hemorrhagic apoplexy in tubercular diathesis with fragile capillary walls and rapid physical and mental decline."
    },
    remedies: [
      {
        name: "Bothrops Lanceolatus",
        keynotes: [
          "Premier remedy for stroke from cerebral thrombosis and embolism.",
          "Hemiplegia, especially right-sided; accompanied by aphasia (inability to speak).",
          "Congestion of lungs with hemorrhage; severe arterial thrombosis elsewhere."
        ]
      },
      {
        name: "Lachesis Mutus",
        keynotes: [
          "Outstanding for stroke, especially left-sided; patient cannot bear anything tight around neck.",
          "Awakens from sleep with suffocative feelings; face is dark red or purple.",
          "Aphasia; tongue catches on teeth when protruded, or trembles.",
          "Indicated for apoplexy in plethoric individuals during or after menopause."
        ]
      },
      {
        name: "Gelsemium Sempervirens",
        keynotes: [
          "Indicated for post-stroke paralysis with profound muscular weakness and trembling.",
          "Loss of muscular control; motor paralysis with heavy, drooping eyelids.",
          "Mental dullness, lack of coordination, and dizziness."
        ]
      },
      {
        name: "Arnica Montana",
        keynotes: [
          "Indicated in acute stage of hemorrhagic stroke; promotes absorption of extravasated blood.",
          "Head is hot, while body is cold; stertorous breathing with involuntary stool and urine.",
          "Sensation as if the bed is too hard; head feels bruised and sore."
        ]
      }
    ],
    lifestyle: [
      "Strictest blood pressure control (target BP < 130/80 mmHg in post-stroke prevention).",
      "Anticoagulation / Antiplatelet therapy: Aspirin/Clopidogrel for ischemic; manage AF with Warfarin/DOACs.",
      "Early physical, occupational, and speech therapy (rehabilitation maximizes neuroplasticity).",
      "Low fat, low sodium diet; cessation of smoking, alcohol, and stress."
    ],
    complications: [
      "Permanent Hemiplegia, Hemiparesis, or Quadriplegia",
      "Aphasia (speech loss), Dysphagia (swallowing difficulty - high aspiration risk)",
      "Cerebral Edema and Brain Herniation (life-threatening space-occupying effect)",
      "Vascular Dementia and Post-Stroke Depression",
      "Deep Vein Thrombosis (DVT) and Pulmonary Embolism (due to immobility)"
    ],
    pearl: "Thrombolysis with intravenous tissue plasminogen activator (tPA) is highly effective for acute ischemic stroke, but it must be administered within a strict 4.5-hour window of symptom onset, and ONLY after a non-contrast head CT has absolutely ruled out any intracranial hemorrhage."
  },
  {
    id: "aki",
    title: "Acute Kidney Injury",
    system: "Renal",
    overview: "A rapid decline in glomerular filtration rate (GFR) occurring over hours to days, leading to the accumulation of nitrogenous waste products (uremia) and disruption of fluid, electrolyte, and acid-base Homoeostasis.",
    symptoms: [
      "Oliguria (urine output < 0.5 mL/kg/hour for > 6 hours) or Anuria",
      "Generalized edema (anasarca, puffiness of face, swollen ankles)",
      "Dyspnea (secondary to volume overload and pulmonary edema)",
      "Nausea, vomiting, loss of appetite, and metallic taste in mouth (uremic symptoms)",
      "Confusion, lethargy, asterixis (flapping tremor), or seizures in severe uremia",
      "Orthostatic hypotension (in prerenal volume depletion) or hypertension (in volume overload)"
    ],
    criteria: [
      {
        label: "KDIGO Staging Criteria",
        values: [
          "Stage 1: Serum Creatinine increase ≥ 0.3 mg/dL within 48 hours, or 1.5 to 1.9 times baseline, or Urine Output < 0.5 mL/kg/h for 6-12 hours",
          "Stage 2: Serum Creatinine increase 2.0 to 2.9 times baseline, or Urine Output < 0.5 mL/kg/h for ≥ 12 hours",
          "Stage 3: Serum Creatinine increase ≥ 3.0 times baseline, or increase to ≥ 4.0 mg/dL, or initiation of renal replacement therapy, or Urine Output < 0.3 mL/kg/h for ≥ 24 hours, or Anuria for ≥ 12 hours"
        ]
      },
      {
        label: "Etiological Classifications",
        values: [
          "Prerenal (60%): Renal hypoperfusion (e.g., dehydration, shock, hemorrhage, heart failure)",
          "Intrinsic (35%): Direct damage to renal parenchyma (e.g., Acute Tubular Necrosis - ATN, glomerulonephritis, nephrotoxins like NSAIDs/aminoglycosides)",
          "Postrenal (5%): Urinary tract obstruction (e.g., BPH, nephrolithiasis, bilateral tumors)"
        ]
      }
    ],
    investigations: [
      "Serial Serum Creatinine and BUN (Blood Urea Nitrogen) - monitored daily",
      "Urinalysis: checking for protein, blood, casts (muddy brown granular casts are pathognomonic for ATN; RBC casts indicate glomerulonephritis)",
      "Fractional Excretion of Sodium (FeNa): < 1% indicates Prerenal; > 2% indicates Intrinsic AKI",
      "Renal Ultrasound: instantly evaluates for hydronephrosis (rules out postrenal obstruction)",
      "Serum Electrolytes (Potassium, Sodium, Calcium, Phosphate) - screens for life-threatening hyperkalemia",
      "Arterial Blood Gas (ABG): evaluates for metabolic acidosis (bicarbonate deficit)"
    ],
    pathophysiology: "Prerenal AKI involves functional hypoperfusion without cellular injury. Intrinsic AKI, such as ischemic or toxic Acute Tubular Necrosis (ATN), involves sublethal or lethal injury to tubular epithelial cells. This causes loss of cell polarity, detachment from the basement membrane, luminal obstruction by cellular debris, backleak of glomerular filtrate, and a profound drop in GFR.",
    miasmaticAnalysis: {
      psora: "Functional renal spasm, transient oliguria from severe dehydration or sweat, mild backache, and transient albuminuria. Fully reversible.",
      sycosis: "Hypertrophic changes, acute interstitial nephritis with inflammatory cell infiltration, swelling of pelvic mucosa, and fluid accumulation (edema).",
      syphilis: "Severe parenchymal destruction: acute cortical necrosis, absolute anuria, uremic ulcerations of mucosal tracts, toxic destruction of glomeruli, and fatal uremic coma.",
      tubercular: "Rapidly progressing renal failure in tubercular patients with profound constitutional debility and rapid wasting."
    },
    remedies: [
      {
        name: "Apis Mellifica",
        keynotes: [
          "Highly useful for AKI with acute dropsy, swelling, and puffiness under eyes.",
          "Absolute thirstlessness; cannot bear heat or warm room.",
          "Urine is extremely scanty, dark, high-colored, and burns intensely.",
          "Sensation of stinging, soreness, and pain in the renal region."
        ]
      },
      {
        name: "Cantharis Vesicatoria",
        keynotes: [
          "Premier remedy for acute renal inflammation with intolerable, agonizing burning.",
          "Constant, painful urge to urinate; passes urine drop by drop, often mixed with blood.",
          "Severe cutting, burning pain in urethra and bladder before, during, and after urination."
        ]
      },
      {
        name: "Terebinthina",
        keynotes: [
          "Indicated for acute congestion of kidneys with severe hematuria.",
          "Urine is dark, smoky, turbid, looking like coffee-grounds, with a characteristic odor of violets.",
          "Severe burning, drawing pain in kidneys and bladder; abdomen is highly distended and flatulent."
        ]
      },
      {
        name: "Serum Anguillae (Eel Serum)",
        keynotes: [
          "Remarkable efficacy in acute renal failure, rapidly restoring glomerular filtration.",
          "Oliguria, anuria, severe albuminuria, and generalized edema without heart disease.",
          "Indicated when uremia threatens, and kidneys fail to secrete urine."
        ]
      }
    ],
    lifestyle: [
      "Strict fluid management: Match fluid intake with output (urine output plus 500 mL insensible losses).",
      "Dietary modifications: Restrict dietary potassium, phosphorus, and sodium intake.",
      "Avoid all nephrotoxic drugs (NSAIDs, aminoglycosides, contrast media) immediately.",
      "Strictly monitor daily weight and input/output charts."
    ],
    complications: [
      "Life-threatening Hyperkalemia (serum K+ > 6.0 mEq/L; triggers ventricular fibrillation/cardiac arrest)",
      "Severe Metabolic Acidosis (pH < 7.1 due to retention of hydrogen ions)",
      "Acute Pulmonary Edema and Congestive Heart Failure (due to fluid overload)",
      "Uremic Pericarditis (cardiac tamponade risk) & Uremic Encephalopathy",
      "Progression to Chronic Kidney Disease (CKD) or End-Stage Renal Disease (ESRD)"
    ],
    pearl: "The acronym 'AEIOU' lists the absolute, life-saving indications for emergent hemodialysis in AKI: A - Acidosis (refractory metabolic acidosis); E - Electrolytes (severe hyperkalemia > 6.5 mEq/L); I - Intoxications (poisoning with dialyzable drugs); O - Overload (severe pulmonary edema resistant to diuretics); U - Uremia (uremic pericarditis, neuropathy, or encephalopathy)."
  },
  {
    id: "ckd",
    title: "Chronic Kidney Disease",
    system: "Renal",
    overview: "A progressive, irreversible decline in renal function characterized by structural or functional kidney damage lasting > 3 months, eventually culminating in End-Stage Renal Disease (ESRD).",
    symptoms: [
      "Asymptomatic in early stages (Stages 1-3; high compensatory capacity of remaining nephrons)",
      "Uremic frost (deposition of urea crystals on skin in terminal stages)",
      "Severe fatigue, anemia, pallor, and sallow, yellow-brown skin complexion",
      "Pruritus (stubborn itching due to calcium-phosphate crystal deposition in skin)",
      "Nocturia, oliguria, and generalized fluid retention (peripheral and facial edema)",
      "Uremic breath (ammoniacal odor) and metallic taste in mouth"
    ],
    criteria: [
      {
        label: "KDIGO Staging by eGFR",
        values: [
          "G1: Normal or high GFR (≥ 90 mL/min/1.73m² with kidney damage)",
          "G2: Mildly decreased GFR (60 to 89 mL/min/1.73m²)",
          "G3a: Mildly to moderately decreased GFR (45 to 59 mL/min/1.73m²)",
          "G3b: Moderately to severely decreased GFR (30 to 44 mL/min/1.73m²)",
          "G4: Severely decreased GFR (15 to 29 mL/min/1.73m²; prepare for renal replacement)",
          "G5: Kidney Failure (< 15 mL/min/1.73m² or on dialysis; End-Stage Renal Disease)"
        ]
      },
      {
        label: "Albuminuria Staging (KDIGO)",
        values: [
          "A1: Normal to mildly increased (AER < 30 mg/24h or ACR < 30 mg/g)",
          "A2: Moderately increased (AER 30-300 mg/24h or ACR 30-300 mg/g; microalbuminuria)",
          "A3: Severely increased (AER > 300 mg/24h or ACR > 300 mg/g; macroalbuminuria)"
        ]
      }
    ],
    investigations: [
      "Estimated Glomerular Filtration Rate (eGFR) calculated using CKD-EPI formula",
      "Urine Albumin-to-Creatinine Ratio (ACR) - key marker for progression",
      "Renal Ultrasound: reveals small, shrunken kidneys with loss of corticomedullary differentiation (except in diabetic nephropathy or polycystic kidney disease)",
      "Serum Electrolytes (Potassium, Sodium, Calcium, Phosphate) - monitors uremic mineral bone disease",
      "Serum Parathyroid Hormone (PTH) and Vitamin D levels (secondary hyperparathyroidism screening)",
      "Complete Blood Count (CBC): evaluates normocytic, normochromic anemia (erythropoietin deficiency)"
    ],
    pathophysiology: "Regardless of etiology (Diabetes and Hypertension are top 2), nephron loss triggers compensatory hyperfiltration and hypertrophy of remaining functional nephrons. This chronic hyperfiltration induces endothelial damage, glomerular capillary hypertension, and podocyte injury, leading to glomerulosclerosis, tubulointerstitial fibrosis, and progressive nephron loss in a vicious cycle.",
    miasmaticAnalysis: {
      psora: "Transient renal irritation, slight albuminuria during acute illness, and mild functional fatigue of filtration.",
      sycosis: "Chronic interstitial nephritis, sodium retention, hypertension, renal cyst formation (polycystic disease), and hypertrophic glomerular changes.",
      syphilis: "Progressive parenchymal degeneration, shrunken fibrous kidneys, complete loss of glomeruli, intractable anuria, severe uremic toxicity, and uremic pericarditis.",
      tubercular: "Renal tuberculosis, chronic wasting, severe bone demineralization (osteodystrophy), and rapid decline of vital force."
    },
    remedies: [
      {
        name: "Serum Anguillae (Eel Serum)",
        keynotes: [
          "Outstanding Homoeopathic remedy for slowing progression of CKD and lowering creatinine.",
          "Chronic interstitial nephritis with oliguria, severe albuminuria, and hypertension.",
          "Helps re-establish urinary secretion, halts nephrosclerosis, and postpones dialysis."
        ]
      },
      {
        name: "Lycopodium Clavatum",
        keynotes: [
          "Indicated for CKD with marked digestive disturbances and uric acid diathesis.",
          "Red sand in urine; urine is scanty, dark, or loaded with deposits.",
          "Severe backache before urinating, relieved by passing urine.",
          "Right-sided symptoms; flatulent dyspepsia; symptoms worse 4:00 PM to 8:00 PM."
        ]
      },
      {
        name: "Plumbum Metallicum",
        keynotes: [
          "Indicated for granular, contracted kidneys with severe hypertension and sclerosis.",
          "Urine is scanty, albuminous, with low specific gravity.",
          "Severe obstinate constipation, muscular atrophy, and neuropathic pains.",
          "Profound uremic symptoms: mental sluggishness, convulsions, and tremors."
        ]
      },
      {
        name: "Apis Mellifica",
        keynotes: [
          "For advanced stages of CKD with widespread dropsy and severe general edema.",
          "Puffiness of face, swollen limbs, complete absence of thirst.",
          "Tension in head, dullness, and severe mental stupor; urine contains albumin and casts."
        ]
      }
    ],
    lifestyle: [
      "Protein restriction: 0.6 to 0.8 g/kg/day in non-dialysis CKD to slow progression.",
      "Strict control of glycemic levels (HbA1c < 7.0%) and Blood Pressure (target < 130/80 mmHg).",
      "Sodium restriction (< 2g/day) and potassium/phosphate restriction in advanced stages.",
      "Avoid NSAIDs, herbal supplements, and phosphate-containing laxatives."
    ],
    complications: [
      "End-Stage Renal Disease (ESRD) requiring lifelong dialysis or renal transplant",
      "Cardiovascular disease (leading cause of death in CKD due to accelerated atherosclerosis)",
      "Anemia of Chronic Disease (secondary to impaired erythropoietin production by renal peritubular cells)",
      "CKD-Mineral and Bone Disorder (Renal Osteodystrophy: secondary hyperparathyroidism, osteomalacia)",
      "Uremic Encephalopathy and Platelet Dysfunction (uremic bleeding tendency)"
    ],
    pearl: "Anemia in CKD is primarily normocytic and normochromic, caused by the failure of specialized peritubular interstitial cells in the renal cortex to produce Erythropoietin (EPO). Treatment involves synthetic EPO stimulating agents combined with intravenous iron therapy."
  },
  {
    id: "rheumatoid",
    title: "Rheumatoid Arthritis",
    system: "Musculoskeletal",
    overview: "A chronic, systemic, autoimmune inflammatory disease characterized by symmetrical polyarthritis, principally affecting the small joints of the hands and feet, leading to joint destruction and deformity.",
    symptoms: [
      "Symmetrical polyarthritis (affects PIP, MCP, MTP, and wrist joints; typically spares DIP joints)",
      "Morning stiffness lasting > 1 hour, which improves with physical activity",
      "Joint swelling, warmth, tenderness, and painful limitation of motion",
      "Rheumatoid deformities: Ulnar drift, Swan-neck deformity, Boutonniere deformity",
      "Subcutaneous rheumatoid nodules over extensor surfaces (elbows, achilles tendon)",
      "Systemic features: fatigue, low-grade fever, weight loss, and dry eyes/mouth (Sjogren's)"
    ],
    criteria: [
      {
        label: "2010 ACR/EULAR Classification",
        values: [
          "Score ≥ 6 out of 10 is required for definite RA diagnosis, based on:",
          "Joint involvement (number and size of affected joints: up to 5 points)",
          "Serology (RF or anti-CCP: up to 3 points)",
          "Acute-phase reactants (CRP or ESR: 1 point)",
          "Duration of symptoms (≥ 6 weeks: 1 point)"
        ]
      },
      {
        label: "Key Serological Markers",
        values: [
          "Rheumatoid Factor (RF): Autoantibody against Fc portion of IgG; 70-80% sensitive, less specific",
          "Anti-Cyclic Citrullinated Peptide (anti-CCP): Highly specific (> 95%) and prognostic for joint erosions"
        ]
      }
    ],
    investigations: [
      "Serum Rheumatoid Factor (RF) and Anti-CCP (ACPA) antibodies",
      "Erythrocyte Sedimentation Rate (ESR) and C-Reactive Protein (CRP) - markers of disease activity",
      "X-ray of hands and feet: reveals periarticular osteopenia, joint space narrowing, and marginal bony erosions",
      "Joint Fluid Analysis: inflammatory fluid with high neutrophils, negative for crystals and bacteria",
      "Complete Blood Count (CBC): often reveals anemia of chronic disease and thrombocytosis",
      "Musculoskeletal Ultrasound/MRI: detects early synovitis and bone erosions before they appear on plain films"
    ],
    pathophysiology: "Auto-reactive CD4+ T-cells trigger macrophage and fibroblast activation, leading to massive cytokine release (TNF-alpha, IL-1, IL-6). This stimulates synovial hyper-proliferation (Pannus formation). The invasive pannus releases proteases and collagenases that digest articular cartilage, while activating osteoclasts to erode marginal subchondral bone.",
    miasmaticAnalysis: {
      psora: "Initial neuralgic, wandering joint pains, subjective stiffness, hyper-sensitivity to cold and wind, and mild transient joint congestion without deformities.",
      sycosis: "Chronic hypertrophic synovitis, synovial thickening, pannus consolidation, joint effusion, swelling, stiffness worse during rest and damp weather.",
      syphilis: "Destructive phase: bone erosions, cartilage loss, joint subluxation, fibrous or bony ankylosis, swan-neck/boutonniere deformities, and rheumatoid nodules.",
      tubercular: "Rapidly progressing joint destruction in delicate, emaciated constitutions with a family history of phthisis."
    },
    remedies: [
      {
        name: "Rhus Toxicodendron",
        keynotes: [
          "Premier remedy for arthritis; pain and stiffness worse during initial motion and rest.",
          "Great relief of pains and stiffness from continuous, gentle motion and warm applications.",
          "Worse in damp, rainy weather, cold air, and from getting wet.",
          "Anxious restlessness; cannot lie quiet in bed, must constantly change position to find relief."
        ]
      },
      {
        name: "Bryonia Alba",
        keynotes: [
          "Direct opposite of Rhus Tox: joints are hot, swollen, red, and extremely painful.",
          "Agonizing pain from the slightest motion; patient wants to lie completely still.",
          "Great relief of joint pains from firm pressure, lying on the painful side, and cold applications.",
          "Very irritable; intense dry mouth; thirst for large quantities of cold water."
        ]
      },
      {
        name: "Caulophyllum",
        keynotes: [
          "Indicated for rheumatoid arthritis of small joints, especially in women.",
          "Affects fingers, toes, and wrists; severe spasmodic, drawing joint pains.",
          "Stiffness and pain in fingers; changing location rapidly from one joint to another."
        ]
      },
      {
        name: "Actaea Spicata",
        keynotes: [
          "Acts specifically on the small joints of hands and feet.",
          "Fingers are swollen, red, and extremely painful on movement.",
          "Joints ache and swell after slight exertion; worse from touch, motion, and cold air."
        ]
      }
    ],
    lifestyle: [
      "Balance rest and exercise: Gentle range-of-motion exercises (swimming, yoga) to prevent stiffness.",
      "Anti-inflammatory diet: Rich in Omega-3 fatty acids (fish oil, flaxseeds), fruits, and vegetables.",
      "Joint protection techniques: Use assistive devices, avoid static grip posture for long periods.",
      "Apply moist heat to relieve morning stiffness; apply cold packs to acute, swollen joints."
    ],
    complications: [
      "Joint Subluxation and permanent deformities leading to severe disability",
      "Atlantoaxial Subluxation (cervical spine instability; high risk of spinal cord compression)",
      "Extra-articular manifestations: Rheumatoid Vasculitis, interstitial lung disease (Caplan's syndrome)",
      "Felty's Syndrome (triad of Rheumatoid Arthritis, Splenomegaly, and Neutropenia)",
      "Accelerated cardiovascular disease and secondary amyloidosis"
    ],
    pearl: "Morning stiffness is a key discriminator between inflammatory and non-inflammatory arthritis. In Rheumatoid Arthritis (inflammatory), morning stiffness lasts > 1 hour and improves with movement. In Osteoarthritis (non-inflammatory), morning stiffness lasts < 30 minutes and worsens with movement."
  },
  {
    id: "osteoarthritis",
    title: "Osteoarthritis",
    system: "Musculoskeletal",
    overview: "A progressive, degenerative, non-inflammatory joint disease characterized by the mechanical breakdown of articular cartilage, subchondral bone remodeling, and osteophyte formation, principally in weight-bearing joints.",
    symptoms: [
      "Use-related joint pain (pain worsens with physical activity, improves with rest)",
      "Brief morning stiffness lasting < 30 minutes",
      "Crepitus (grating/crackling sensation during joint movement due to cartilage loss)",
      "Bony enlargement of joints (especially DIP and PIP joints of fingers)",
      "Heberden's nodes (bony overgrowths at DIP joints) and Bouchard's nodes (PIP joints)",
      "Loss of joint range of motion and joint instability (e.g., knee 'giving way')"
    ],
    criteria: [
      {
        label: "Kellgren-Lawrence X-Ray Grading",
        values: [
          "Grade 0: None",
          "Grade 1 (Doubtful): Doubtful joint space narrowing, possible osteophytic lipping",
          "Grade 2 (Minimal): Definite osteophytes, possible joint space narrowing",
          "Grade 3 (Moderate): Moderate joint space narrowing, multiple osteophytes, sclerosis",
          "Grade 4 (Severe): Marked joint space narrowing, large osteophytes, severe sclerosis, bone deformity"
        ]
      },
      {
        label: "Clinical Classifications",
        values: [
          "Primary OA: Idiopathic, wear-and-tear associated with aging and genetics",
          "Secondary OA: Caused by pre-existing joint injury, obesity, congenital dysplasia, or metabolic disease"
        ]
      }
    ],
    investigations: [
      "Weight-bearing plain X-rays of affected joints - Primary diagnostic test",
      "X-ray findings (Classic 'LOSS'): L - Loss of joint space (asymmetric); O - Osteophytes (bony spurs); S - Subchondral sclerosis (thickening of bone under cartilage); S - Subchondral cysts",
      "Magnetic Resonance Imaging (MRI): visualizes early cartilage damage, bone marrow lesions, and meniscal tears",
      "Joint Fluid Analysis: non-inflammatory, clear, viscous, WBC < 2,000/mcL, negative for crystals/bacteria",
      "Inflammatory markers (ESR, CRP) and Rheumatoid factor - checked to rule out inflammatory arthritis (typically normal in OA)"
    ],
    pathophysiology: "Aging, mechanical stress, and obesity trigger chondrocyte dysfunction. Chondrocytes fail to maintain the extracellular matrix, releasing inflammatory cytokines (IL-1, TNF-alpha) and matrix metalloproteinases (MMPs) that degrade type II collagen and proteoglycans. Cartilage progressively thins and cracks, exposing subchondral bone to mechanical stress, resulting in microfractures, sclerosis, cyst formation, and marginal osteophyte growth.",
    miasmaticAnalysis: {
      psora: "Initial muscle fatigue, mild transient joint stiffness, worse from cold damp air, with dynamic nervous discomfort but no bony structural alterations.",
      sycosis: "The core miasm of OA. Characterized by hypertrophic bony changes, osteophytes (bony spurs), joint enlargement, Heberden's and Bouchard's nodes, chronic stiffening, and worse in rainy, damp weather.",
      syphilis: "Advanced degenerative changes: bone deformity, severe destruction of articular cartilage, bony ankylosis, joint subluxation, and severe nocturnal bone pain.",
      tubercular: "Joint disease with rapid cartilage loss and physical emaciation in young patients with tubercular heredity."
    },
    remedies: [
      {
        name: "Calcium Fluoratum",
        keynotes: [
          "Major remedy for hard, bony enlargements, osteophytes, and chronic degenerative joint disease.",
          "Indicated for Heberden's and Bouchard's nodes; chronic stiffness of joints.",
          "Pains are worse during rest and initial movement, better from continuous motion and warmth."
        ]
      },
      {
        name: "Ruta Graveolens",
        keynotes: [
          "Acts specifically on periosteum, tendons, ligaments, and cartilage.",
          "Severe bruising, aching pain in joints; feels as if the bone was broken or scraped.",
          "Worse from cold, damp weather, and lying on the painful side; better from local warmth.",
          "Great weakness and weariness in weight-bearing joints (knees, spine)."
        ]
      },
      {
        name: "Bryonia Alba",
        keynotes: [
          "OA of knee or hip with sharp, stitching pains, highly aggravated by the slightest motion.",
          "Joints are stiff, painful, and may feel hot; better from lying on the painful joint and complete rest.",
          "Worse from warm weather and warmth of bed; better from cold applications."
        ]
      },
      {
        name: "Benzoicum Acidum",
        keynotes: [
          "Specifically indicated for osteoarthritis with gouty deposits (urates) in joints.",
          "Joint pains accompanied by highly offensive, dark brown, strong ammoniacal urine (smells like horse's urine).",
          "Cracking in joints on movement; swelling of big toe and knees."
        ]
      }
    ],
    lifestyle: [
      "Weight loss: Every 1 lb of weight lost reduces mechanical load on the knee joint by 4 lbs.",
      "Low-impact physical exercise: Walking, cycling, water aerobics to strengthen surrounding musculature.",
      "Physical therapy for quad-strengthening (reduces knee OA progression and pain).",
      "Use of supportive footwear, knee braces, or walking aids (canes) held in the contralateral hand."
    ],
    complications: [
      "Progressive loss of mobility, chronic pain, and functional dependency",
      "Severe joint instability and varus/valgus knee deformities",
      "Osteonecrosis (Avascular necrosis of bone, especially in femoral head)",
      "Baker's Cyst (popliteal cyst rupture causing acute calf pain mimicking DVT)",
      "Depression and sleep disturbances secondary to intractable chronic pain"
    ],
    pearl: "OA characteristically causes asymmetric joint space narrowing because the wear-and-tear occurs on the areas of highest mechanical stress (e.g., medial compartment of the knee). This contrast with Rheumatoid Arthritis, which causes symmetric joint space narrowing due to diffuse autoimmune synovitis."
  },
  {
    id: "hypothyroidism",
    title: "Hypothyroidism",
    system: "Metabolic & Endocrine",
    overview: "A common endocrine disorder characterized by thyroid hormone deficiency, causing a generalized slowing of metabolic processes. Most commonly caused by autoimmune thyroiditis (Hashimoto's) in iodine-sufficient areas.",
    symptoms: [
      "Generalized fatigue, lethargy, sluggishness, and somnolence",
      "Unexplained weight gain despite poor appetite (due to decreased metabolic rate)",
      "Cold intolerance (constantly feels cold, requires extra blankets)",
      "Stubborn constipation (slowed gastrointestinal motility)",
      "Dry, coarse, rough skin and brittle hair / hair loss (outer third of eyebrows - sign of Hertoghe)",
      "Bradycardia, hoarse voice, and delayed relaxation of deep tendon reflexes"
    ],
    criteria: [
      {
        label: "TSH / Free T4 Diagnostic Algorithm",
        values: [
          "Primary Hypothyroidism: Elevated Serum TSH (> 4.5-5.0 mIU/L) AND Decreased Free T4 (< 0.8 ng/dL / < 10 pmol/L)",
          "Subclinical Hypothyroidism: Elevated Serum TSH (typically 4.5 to 10.0 mIU/L) with Normal Free T4",
          "Secondary (Central) Hypothyroidism: Low or Normal TSH AND Decreased Free T4 (pituitary/hypothalamic dysfunction)"
        ]
      },
      {
        label: "Hashimoto's Markers",
        values: [
          "Anti-Thyroid Peroxidase (anti-TPO) antibodies: positive in > 90% of Hashimoto's autoimmune thyroiditis",
          "Anti-Thyroglobulin (anti-Tg) antibodies: supporting marker"
        ]
      }
    ],
    investigations: [
      "Third-Generation Serum TSH (Thyroid Stimulating Hormone) - Single best screening test",
      "Free Thyroxine (FT4) and Free Triiodothyronine (FT3)",
      "Anti-TPO and Anti-Tg antibody titers",
      "Lipid Profile: reveals elevated Total Cholesterol and LDL (thyroid hormone downregulates LDL receptors)",
      "Complete Blood Count (CBC): often reveals normocytic or macrocytic anemia",
      "Thyroid Ultrasound: shows diffuse heterogeneity, hypoechogenicity, and fibrotic bands in Hashimoto's"
    ],
    pathophysiology: "Primary hypothyroidism involves autoimmune or physical destruction of the thyroid gland, resulting in impaired synthesis of T4 and T3. The lack of negative feedback on the pituitary triggers hypersecretion of TSH. Decreased thyroid hormones lead to systemic slowing of mitochondrial respiration, ATP production, and glycosaminoglycan accumulation in interstitial tissues, causing non-pitting edema (myxedema).",
    miasmaticAnalysis: {
      psora: "Initial stage of functional metabolic slowing, mild cold sensitivity, transient fatigue, dry skin, and mild functional constipation. Readily curable.",
      sycosis: "Core miasm of primary hypothyroidism. Characterized by sluggishness, weight gain, fluid retention, myxedema (mucopolysaccharide deposits), bradycardia, and chronic metabolic slowing.",
      syphilis: "End-stage destructive changes: thyroid atrophy, complete fibrous replacement of gland, severe depressive dementia (myxedema madness), and fatal myxedema coma.",
      tubercular: "Rapidly fluctuating thyroid states, alternating between hyperactivity and hypoactivity, accompanied by rapid physical emaciation."
    },
    remedies: [
      {
        name: "Thyroidinum",
        keynotes: [
          "A powerful organotherapeutic remedy prepared from healthy thyroid gland.",
          "Acts specifically in hypothyroidism with coldness, dry skin, fatigue, and rapid weight gain.",
          "Excellent for infantile wasting, goiter, and stubborn metabolic slowing.",
          "Helps stimulate metabolic activity, improves hair growth, and reduces edema."
        ]
      },
      {
        name: "Calcarea Carbonica",
        keynotes: [
          "The classic constitutional remedy matching the hypothyroid profile: 'Fat, Fair, Flabby, and Forty'.",
          "Great chilliness, cold damp feet (feels as if wearing cold damp socks), and profuse sweating on head, especially during sleep.",
          "Unexplained weight gain; craves boiled eggs and indigestible things like chalk or dirt.",
          "Stubborn constipation; feels better physically when constipated."
        ]
      },
      {
        name: "Graphites",
        keynotes: [
          "Indicated for sluggish, overweight, chilly patients with a tendency to obstinate constipation.",
          "Skin is dry, rough, irritable, with thick, sticky, honey-like oozing from eczematous cracks.",
          "Chilly, extremely sensitive to cold air; delays of menstrual cycles with scanty flow."
        ]
      },
      {
        name: "Sepia Officinalis",
        keynotes: [
          "Indicated for tired, worn-out, hypothyroid women, especially around menopause.",
          "Chilly, irritable, with a feeling of profound indifference to loved ones.",
          "Bearing-down sensation in pelvic organs (as if everything would protrude).",
          "Yellowish, saddle-shaped discoloration across the nose and cheeks (chloasma)."
        ]
      }
    ],
    lifestyle: [
      "Ensure adequate dietary iodine intake (use iodized salt), unless Hashimoto's is triggered (where excessive iodine can worsen it).",
      "Include foods rich in Selenium and Zinc (necessary for conversion of T4 to active T3).",
      "Incorporate regular physical activity to stimulate metabolic rate and combat constipation.",
      "Limit goitrogenic foods in raw form (e.g., cabbage, broccoli, kale, soy) as they interfere with iodine uptake."
    ],
    complications: [
      "Myxedema Coma (medical emergency; severe hypothermia, bradycardia, hypoventilation, obtundation)",
      "Hashimoto's Encephalopathy (neuropsychiatric disorder with seizure risk)",
      "Severe Hypercholesterolemia and Coronary Artery Disease",
      "Infertility, menstrual disorders (menorrhagia), and pregnancy complications (miscarriage)",
      "Goiter (compensatory thyroid enlargement causing compressive tracheal/esophageal symptoms)"
    ],
    pearl: "Subclinical hypothyroidism is diagnosed strictly when TSH is elevated but Free T4 is completely normal. Routine treatment with Levothyroxine is controversial for subclinical HTN unless TSH is > 10 mIU/L, the patient is pregnant, has positive anti-TPO antibodies, or exhibits highly bothersome symptoms."
  },
  {
    id: "hyperthyroidism",
    title: "Hyperthyroidism",
    system: "Metabolic & Endocrine",
    overview: "A hyper-metabolic state characterized by elevated circulating levels of free thyroid hormones (T4 and T3). Most commonly caused by Graves' Disease, an autoimmune disorder involving TSH-receptor stimulating antibodies.",
    symptoms: [
      "Nervousness, anxiety, hyper-irritability, and fine hand tremors",
      "Unexplained weight loss despite ravenous appetite (increased basal metabolic rate)",
      "Heat intolerance and profuse diaphoresis (excessive sweating)",
      "Palpitations, sinus tachycardia, or atrial fibrillation",
      "Frequent bowel movements or diarrhea (hyper-motility)",
      "Exophthalmos (proptosing/bulging eyes) and pretibial myxedema (Graves' dermopathy)"
    ],
    criteria: [
      {
        label: "TSH / Free T4 Diagnostic Algorithm",
        values: [
          "Primary Hyperthyroidism: Suppressed Serum TSH (< 0.1 mIU/L) AND Elevated Free T4 (and/or Free T3)",
          "Subclinical Hyperthyroidism: Suppressed Serum TSH with Normal Free T4 and Free T3",
          "T3 Toxicosis: Suppressed TSH with Normal Free T4 but Elevated Free T3 (approx 5% of cases)"
        ]
      },
      {
        label: "Graves' Specific markers",
        values: [
          "Thyroid-Stimulating Immunoglobulin (TSI) or TSH Receptor Antibodies (TRAb): highly positive in Graves' Disease (autoimmune stimulation of thyroid gland)"
        ]
      }
    ],
    investigations: [
      "Third-Generation Serum TSH - suppressed to near-undetectable levels",
      "Free T4 and Free T3 levels",
      "TSH Receptor Antibody (TRAb) and TSI titers",
      "Radioactive Iodine Uptake (RAIU) and scan: High, diffuse uptake indicates Graves'; patchy uptake indicates Toxic Multinodular Goiter; low uptake indicates Thyroiditis",
      "ECG: evaluates for tachycardia and atrial fibrillation",
      "Thyroid Ultrasound: shows increased vascularity ('thyroid inferno' on Doppler) and enlargement"
    ],
    pathophysiology: "In Graves' Disease, IgG autoantibodies bind to and stimulate the TSH receptor on thyroid follicular cells, bypassing normal pituitary feedback and causing unregulated overproduction of T4 and T3. In Graves' Ophthalmopathy, autoantibodies cross-react with TSH receptors on orbital fibroblasts, triggering glycosaminoglycan accumulation, inflammatory edema, and expansion of retro-orbital tissues.",
    miasmaticAnalysis: {
      psora: "Core miasm of early hyperthyroidism. High functional reactivity, hyper-excitability, rapid pulse, trembling, thermal heat, nervous anxiety, and sweating without structural changes.",
      sycosis: "Multinodular hypertrophic goiter, progressive thyroid adenomas, localized fibrous tissue deposits, and cardiac hypertrophic complications.",
      syphilis: "Destructive phase: thyroiditis with parenchymal destruction, malignant thyroid neoplasms, atrial fibrillation causing cardioembolic stroke, and thyroid storm.",
      tubercular: "Rapid emaciation despite immense hunger, hectic fever, dry cough, extreme susceptibility to heat and close rooms, rapid nervous exhaustion."
    },
    remedies: [
      {
        name: "Iodum",
        keynotes: [
          "Classic Homoeopathic specific for hyperthyroidism with rapid emaciation.",
          "Rapid wasting of tissues despite a ravenous, constant hunger; must eat constantly to avoid feeling anxious.",
          "Intense heat intolerance; feels hot all over, must have cool air and cold surroundings.",
          "Goiter with hardness; rapid tachycardia, pulsations felt all over the body, and fine trembling."
        ]
      },
      {
        name: "Natrum Muriaticum",
        keynotes: [
          "Constitutional remedy matching hyperthyroidism with high emotional tension.",
          "Emaciation, especially marked around the neck; great weakness and weariness.",
          "Tachycardia, palpitations shaking the chest; worse from lying on the left side.",
          "Intense craving for salt; worse from exposure to sun and heat; dry, mapped tongue."
        ]
      },
      {
        name: "Thyroidinum",
        keynotes: [
          "Acts as a therapeutic balancer, indicated in hyper-functioning thyroid states.",
          "Exophthalmic goiter; rapid, dancing pulse, tachycardia, and palpitations.",
          "Extreme nervous irritability, sweating, hand tremors, and rapid wasting."
        ]
      },
      {
        name: "Lachesis Mutus",
        keynotes: [
          "Indicated for hyperthyroidism with extreme heat, congestion, and hot flushes.",
          "Goiter worse on the left side; cannot bear any clothing touching the neck or throat.",
          "Great loquacity (talks constantly, shifting from one subject to another).",
          "Worse from warmth, sleep (awakens suffocating), and menstrual suppression."
        ]
      }
    ],
    lifestyle: [
      "Incorporate high-calorie, nutrient-dense foods to counteract hyper-metabolic weight loss.",
      "Strictly avoid dietary iodine supplements (iodized salt, kelp, seaweed) in Graves' disease as they stimulate more hormone synthesis.",
      "Ensure physical and mental rest; practice meditation to reduce sympathetic over-activity.",
      "Wear sunglasses and use artificial tears for exophthalmos; elevate head of bed to reduce orbital edema."
    ],
    complications: [
      "Thyroid Storm (life-threatening emergency: hyperthermia up to 105°F, severe tachycardia, delirium, heart failure)",
      "Atrial Fibrillation and thromboembolic stroke (especially in elderly)",
      "High-Output Heart Failure (due to chronic hyper-dynamic circulation)",
      "Thyroid Dermopathy (Pretibial Myxedema) and progressive optic nerve compression in ophthalmopathy",
      "Osteoporosis and hypercalciuria (thyroid hormone stimulates osteoclasts, accelerating bone loss)"
    ],
    pearl: "Thyroid Storm is a clinical diagnosis, not a laboratory one, based on severe hyper-metabolic symptoms (delirium, high fever, heart failure) triggered by stressors like surgery, infection, or trauma in a poorly controlled hyperthyroid patient. Do not wait for lab values to initiate aggressive supportive care."
  }
];
