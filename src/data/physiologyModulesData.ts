export interface PhysiologyModule {
  id: string;
  title: string;
  system: string;
  studyTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  importance: "⭐ Frequently Asked" | "⭐ Viva Favourite" | "⭐ High Scoring" | "⭐ Concept Based";
  nchCompetency: string;
  learningObjectives: string[];
  quickFacts: {
    definition: string;
    normalRange: string;
    primaryRole: string;
    clinicalImportance: string;
    oneLineRevision: string;
  };
  introduction: string;
  definition: string;
  basicConcepts: string;
  detailedExplanation: string;
  physiologicalMechanism: { step: number; title: string; detail: string }[];
  flowchart: {
    title: string;
    steps: { label: string; desc: string }[];
  };
  tables: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  clinicalCorrelation: string;
  appliedPhysiology: string;
  importantDisorders: { name: string; mechanism: string; symptoms: string }[];
  vivaQuestions: { q: string; a: string }[];
  examQuestions: {
    longQuestions: string[];
    shortNotes: string[];
    oneLiners: string[];
  };
  highYieldPoints: string[];
  mnemonics: { phrase: string; meaning: string; concept: string }[];
  frequentlyConfused: { conceptA: string; conceptB: string; explanation: string }[];
  commonMistakes: string[];
  oneMinuteRevision: string[];
  faqs: { q: string; a: string }[];
  relatedTopics: { title: string; slug: string }[];
  references: string[];
  visualPlans: { type: string; title: string; description: string }[];
}

export const physiologyModules: Record<string, PhysiologyModule> = {
  cell_Homoeostasis: {
    id: "cell_Homoeostasis",
    title: "Homoeostasis and Cell Transport",
    system: "General Physiology",
    studyTime: "20 mins",
    difficulty: "Easy",
    importance: "⭐ Concept Based",
    nchCompetency: "PY1.1 - Describe the structure, functions and transport mechanisms of cell membrane.",
    learningObjectives: [
      "Understand the physiological definition of Homoeostasis.",
      "Explain the differences between negative and positive feedback mechanisms.",
      "Describe the structure of the cell membrane (Fluid Mosaic Model).",
      "Differentiate between Active and Passive transport systems."
    ],
    quickFacts: {
      definition: "Maintenance of a constant and stable internal environment (Extracellular Fluid / ECF) despite fluctuating external conditions.",
      normalRange: "ECF pH: 7.35 - 7.45; Core Temp: 37°C (98.6°F).",
      primaryRole: "Allows optimal cellular metabolic activity and survival.",
      clinicalImportance: "Disruption leads to cellular dysfunction, disease, or system-wide failure (e.g., acidosis, hyperthermia).",
      oneLineRevision: "Homoeostasis is the body's dynamic equilibrium, regulated mostly via negative feedback loops."
    },
    introduction: "Every living organism survives by maintaining a delicate balance. In the human body, the internal environment (specifically the Extracellular Fluid, often termed the 'milieu intérieur' by Claude Bernard) must be kept strictly stable. Homoeostasis is the term coined by Walter Cannon to describe this dynamic equilibrium.",
    definition: "Homoeostasis is defined as the maintenance of a nearly constant and stable physical and chemical composition of the internal environment (Extracellular Fluid) of the body.",
    basicConcepts: "The body operates within safe margins. When a parameter (like blood glucose or blood pressure) deviates from the norm, receptors detect the change, centers in the brain process this, and effectors trigger a response. The two main control systems are the nervous system (rapid response) and the endocrine system (slower, sustained response).",
    detailedExplanation: "The cell membrane acts as the primary barrier regulating entry and exit. According to Singer and Nicolson's Fluid Mosaic Model, it is a phospholipid bilayer interspersed with proteins. Transport across this membrane is classified into:\n1. Passive Transport (Down the concentration gradient, no ATP required): e.g., Simple Diffusion, Facilitated Diffusion, and Osmosis.\n2. Active Transport (Against the concentration gradient, requires ATP): divided into Primary Active Transport (direct ATP hydrolysis, e.g., Na+-K+ ATPase Pump) and Secondary Active Transport (utilizes electrochemical gradient created by primary transport, e.g., SGLT-1 Sodium-Glucose Cotransporter).",
    physiologicalMechanism: [
      { step: 1, title: "Deviation Detection", detail: "A change occurs in the internal environment (e.g., blood pressure rises), stretching arterial baroreceptors." },
      { step: 2, title: "Afferent Signaling", detail: "Baroreceptors increase their firing rate, sending nerve impulses via the glossopharyngeal and vagus nerves to the medulla oblongata." },
      { step: 3, title: "Integration Center Analysis", detail: "The vasomotor center in the medulla compares the incoming signal with the setpoint and determines it is too high." },
      { step: 4, title: "Efferent Output Regulation", detail: "The center decreases sympathetic stimulation and increases parasympathetic (vagal) output to the heart and blood vessels." },
      { step: 5, title: "Effector Response", detail: "The heart rate slows down and blood vessels dilate (vasodilation), successfully lowering blood pressure back to normal." }
    ],
    flowchart: {
      title: "Negative Feedback Loop for Temperature Regulation",
      steps: [
        { label: "Stimulus", desc: "Exposure to cold environment drops core body temperature." },
        { label: "Receptors", desc: "Thermoreceptors in the skin and hypothalamus detect the drop." },
        { label: "Control Center", desc: "Preoptic area of the Hypothalamus processes the signal." },
        { label: "Effectors Active", desc: "Skeletal muscles receive impulses to shiver; blood vessels vasoconstrict." },
        { label: "Response & Equilibrium", desc: "Shivering generates heat, returning core temperature to 37°C." }
      ]
    },
    tables: [
      {
        title: "Active vs. Passive Transport Comparison",
        headers: ["Parameter", "Passive Transport", "Active Transport"],
        rows: [
          ["Energy (ATP)", "Not Required", "Directly or Indirectly Required"],
          ["Direction", "Along gradient (High to Low)", "Against gradient (Low to High)"],
          ["Carrier Protein", "Only in facilitated", "Always required"],
          ["Examples", "Simple diffusion, Osmosis", "Sodium-Potassium Pump, Calcium Pump"]
        ]
      }
    ],
    clinicalCorrelation: "Understanding Homoeostasis is vital in homoeopathy. The concept of 'Vital Force' matches the physiological mechanism of Homoeostatic regulation. When the Vital Force is deranged (loss of Homoeostatic control), disease symptoms manifest. Homoeopathic remedies act as dynamic stimuli to restore the vital force back to equilibrium (perfect Homoeostatic balance).",
    appliedPhysiology: "During dehydration, ECF osmolarity rises. This is sensed by osmoreceptors in the hypothalamus, which triggers: 1) thirst, prompting water intake; and 2) secretion of ADH (Antidiuretic Hormone) from the posterior pituitary, causing the kidneys to reabsorb water and produce concentrated urine.",
    importantDisorders: [
      { name: "Heat Stroke", mechanism: "Failure of the hypothalamic thermoregulatory center in extreme heat, leading to uncontrolled rise in core temperature.", symptoms: "High core temp (>40°C), dry hot skin, confusion, and delirium." },
      { name: "Dehydration & Acidosis", mechanism: "Loss of body fluids and bicarbonate ions, breaking Homoeostatic blood pH regulations.", symptoms: "Rapid breathing, confusion, hypotension, and dark urine." }
    ],
    vivaQuestions: [
      { q: "Who coined the term Homoeostasis?", a: "Walter B. Cannon in 1929. Claude Bernard earlier described the concept as 'milieu intérieur'." },
      { q: "Give an example of a physiological positive feedback loop.", a: "Uterine contractions during childbirth (parturition) driven by Oxytocin, and blood clotting cascade activation." },
      { q: "What is the stoichiometric ratio of the Na+-K+ ATPase pump?", a: "It pumps 3 Na+ ions out of the cell and 2 K+ ions into the cell for every 1 molecule of ATP hydrolyzed." }
    ],
    examQuestions: {
      longQuestions: [
        "Define Homoeostasis. Describe the mechanism of Homoeostatic regulation with suitable examples of negative and positive feedback loops.",
        "Classify various transport mechanisms across the cell membrane. Describe in detail Active Transport with suitable diagrams."
      ],
      shortNotes: [
        "Sodium-Potassium ATPase Pump",
        "Fluid Mosaic Model of Cell Membrane",
        "Facilitated Diffusion vs. Simple Diffusion",
        "Positive Feedback Loop of Parturition"
      ],
      oneLiners: [
        "Define Homoeostasis.",
        "What is simple diffusion?",
        "State the normal pH of human arterial blood."
      ]
    },
    highYieldPoints: [
      "Negative feedback loops are corrective and stabilize physiological values around a setpoint.",
      "Positive feedback loops are destabilizing and lead to an explosive event (clotting, birth, LH surge).",
      "The cell membrane is highly permeable to lipid-soluble substances (O2, CO2) but requires carrier proteins for polar molecules (glucose, ions)."
    ],
    mnemonics: [
      { phrase: "PUMP OUT the Sodium, PULL IN the Potassium", meaning: "Na+ is pumped OUT (3 ions) and K+ is pumped IN (2 ions) by the ATPase pump.", concept: "Sodium-Potassium Pump direction" }
    ],
    frequentlyConfused: [
      { conceptA: "Osmosis", conceptB: "Diffusion", explanation: "Diffusion is the movement of solute particles down a gradient. Osmosis is specifically the movement of water (solvent) molecules across a semipermeable membrane from low solute to high solute concentration." }
    ],
    commonMistakes: [
      "Confusing positive feedback as always beneficial and negative as harmful. In physiology, 'negative' means opposing the initial change (stabilizing) and is highly beneficial."
    ],
    oneMinuteRevision: [
      "Homoeostasis = stable internal environment. Maintained by feedback loops. Negative feedback opposes changes; positive feedback reinforces them. Transport across cell membranes is passive (no ATP) or active (requires ATP)."
    ],
    faqs: [
      { q: "Why is the Na+-K+ pump called electrogenic?", a: "Because it pumps 3 positive charges out for every 2 positive charges in, creating a net negative electrical charge inside the cell membrane." }
    ],
    relatedTopics: [
      { title: "Cell Junctions and Intercellular Communication", slug: "cell-junctions" },
      { title: "Renal Regulation of Fluid Balance", slug: "renal-fluid" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 1 & 2.",
      "Guyton & Hall (2020). Textbook of Medical Physiology. 14th Edition. Chapter 1 & 4."
    ],
    visualPlans: [
      { type: "Flowchart", title: "Mechanisms of Cell Membrane Transport", description: "A branched hierarchy tree showing Passive (Simple, Facilitated, Osmosis) vs Active (Primary, Secondary) transport." },
      { type: "Labeled Diagram", title: "Phospholipid Bilayer & Fluid Mosaic Model", description: "Schematic showing hydrophilic heads, hydrophobic tails, integral proteins, peripheral proteins, and cholesterol molecules." }
    ]
  },
  hemoglobin_iron: {
    id: "hemoglobin_iron",
    title: "Hemoglobin and Iron Metabolism",
    system: "Blood Physiology",
    studyTime: "25 mins",
    difficulty: "Medium",
    importance: "⭐ Frequently Asked",
    nchCompetency: "PY2.4 - Describe the synthesis, functions, normal values and variations of hemoglobin, and iron metabolism.",
    learningObjectives: [
      "Describe the chemical structure of hemoglobin.",
      "List the normal hemoglobin reference ranges across age and gender.",
      "Detail the biochemical steps of hemoglobin synthesis in erythroblasts.",
      "Explain the mechanisms of dietary iron absorption, transport, and storage."
    ],
    quickFacts: {
      definition: "An iron-rich conjugated protein present in red blood cells that reversibly binds and transports oxygen from lungs to tissues.",
      normalRange: "Adult Males: 14-18 g/dL; Adult Females: 12-16 g/dL; Newborns: 18-22 g/dL.",
      primaryRole: "Oxygen transport (oxyhemoglobin), carbon dioxide transport (carbaminohemoglobin), and acid-base buffering.",
      clinicalImportance: "Deficiency causes Anemia (pallor, fatigue); excess causes Polycythemia; abnormal synthesis causes Hemoglobinopathies (Thalassemia, Sickle Cell).",
      oneLineRevision: "Hemoglobin consists of four globin chains and four iron-containing heme groups, synthesizing in bone marrow erythroblasts."
    },
    introduction: "Hemoglobin (Hb) is the specialized respiratory pigment of erythrocytes. It gives blood its characteristic red color and provides the vital function of transporting respiratory gases. Understanding its synthesis and the associated metabolism of iron is essential to diagnosing and treating hematological disorders in BHMS clinical practice.",
    definition: "Hemoglobin is a chromoprotein (conjugated protein containing a colored pigment group called heme and a simple protein globin) found inside erythrocytes, designed for reversible oxygen carriage.",
    basicConcepts: "Each molecule of hemoglobin contains four subunits. Each subunit consists of an iron-containing porphyrin ring (heme) linked to a polypeptide chain (globin). The iron must be in the ferrous state (Fe2+) to reversibly bind oxygen. One Hb molecule can bind up to four molecules (eight atoms) of oxygen.",
    detailedExplanation: "Hemoglobin synthesis begins in the proerythroblast and continues up to the reticulocyte stage in the red bone marrow. Heme is synthesized in the mitochondria and cytoplasm of erythroblasts. The starting substrates are Succinyl-CoA (from the Krebs cycle) and Glycine (an amino acid). They form delta-aminolevulinic acid (delta-ALA), catalyzed by ALA synthase (the rate-limiting enzyme requiring Vitamin B6/Pyridoxine).\nIron metabolism is strictly regulated. Dietary iron is absorbed primarily in the duodenum and upper jejunum. It exists in two forms: Heme iron (highly bioavailable) and Non-heme iron (must be reduced to ferrous Fe2+ state to be absorbed via Divalent Metal Transporter 1 / DMT-1). Once inside enterocytes, it is either stored as Ferritin or exported into blood via Ferroportin, where it binds to Transferrin for transport.",
    physiologicalMechanism: [
      { step: 1, title: "Dietary Intake and Reduction", detail: "Dietary non-heme ferric iron (Fe3+) is reduced to ferrous iron (Fe2+) by apical duodenal ferric reductase (Duodenal Cytochrome B)." },
      { step: 2, title: "Apical Enterocyte Uptake", detail: "Ferrous iron is transported across the apical membrane of enterocytes via Divalent Metal Transporter 1 (DMT-1)." },
      { step: 3, title: "Basolateral Export", detail: "Iron is transported across the basolateral membrane into the bloodstream via the exporter protein Ferroportin." },
      { step: 4, title: "Oxidation and Transferrin Binding", detail: "Hephaestin oxidizes Fe2+ back to Fe3+. Ferric iron then binds tightly to plasma apotransferrin, forming Transferrin." },
      { step: 5, title: "Target Delivery and Cellular Uptake", detail: "Transferrin travels in blood to red bone marrow, where erythroblasts express Transferrin Receptors (TfR1), internalizing the iron via receptor-mediated endocytosis for heme synthesis." }
    ],
    flowchart: {
      title: "Biosynthesis of Heme (Step-by-Step Pathway)",
      steps: [
        { label: "Substrate Condensation", desc: "Succinyl-CoA + Glycine combine in mitochondria via ALA Synthase (requires Pyridoxine / Vit B6) to form delta-ALA." },
        { label: "Porphobilinogen Formation", desc: "Two molecules of delta-ALA condense in the cytoplasm via ALA Dehydratase to form Porphobilinogen (PBG)." },
        { label: "Tetrapyrrole Condensation", desc: "Four molecules of PBG condense to form Uroporphyrinogen III, which is then converted to Coproporphyrinogen III." },
        { label: "Protoporphyrin Formation", desc: "Coproporphyrinogen III returns to mitochondria, converting to Protoporphyrin IX." },
        { label: "Iron Insertion (Final Step)", desc: "Ferrous Iron (Fe2+) is inserted into Protoporphyrin IX via the enzyme Ferrochelatase to form Heme." }
      ]
    },
    tables: [
      {
        title: "Normal Types of Hemoglobin",
        headers: ["Type of Hemoglobin", "Chain Structure", "Normal Percentage in Adults", "Clinical Remarks"],
        rows: [
          ["Adult HbA1", "Alpha2 Beta2", "95% - 97%", "The major physiological adult hemoglobin."],
          ["Adult HbA2", "Alpha2 Delta2", "1.5% - 3%", "Minor form, elevated in Beta-Thalassemia trait."],
          ["Fetal HbF", "Alpha2 Gamma2", "< 1% (in adults)", "Dominant in fetus, high affinity for oxygen; replaced soon after birth."],
          ["Sickle HbS", "Alpha2 Beta(S)2", "0% (normal)", "Pathological mutation (glutamic acid to valine at position 6 of beta chain)."]
        ]
      }
    ],
    clinicalCorrelation: "Iron Deficiency Anemia (IDA) is the most common nutritional anemia in India. Clinically, it presents as microcytic, hypocytic anemia. Symptoms include pallor, easy fatigability, dyspnea, and angular cheilitis. In homoeopathy, remedies like Ferrum Metallicum, Ferrum Phosphoricum, Pulsatilla, and Alumina are highly indicated for restoring iron assimilation and boosting hemoglobin levels.",
    appliedPhysiology: "The hormone Hepcidin, synthesized by the liver, is the master regulator of systemic iron levels. In high iron states, hepcidin increases, binding to Ferroportin and causing its degradation. This blocks further iron absorption in the gut and traps iron inside macrophages, lowering blood iron. In chronic infections or inflammation, excess hepcidin leads to the 'Anemia of Chronic Disease'.",
    importantDisorders: [
      { name: "Iron Deficiency Anemia", mechanism: "Inadequate dietary intake or chronic blood loss depletes iron stores, reducing heme synthesis and producing small, pale RBCs.", symptoms: "Fatigue, pallor, pica (craving clay/ice), spoon-shaped nails (koilonychia)." },
      { name: "Methemoglobinemia", mechanism: "Oxidation of ferrous iron (Fe2+) to ferric state (Fe3+) in hemoglobin, which cannot bind oxygen.", symptoms: "Cyanosis, headache, chocolate-brown blood, shortness of breath." }
    ],
    vivaQuestions: [
      { q: "What is the normal life span of a mature erythrocyte?", a: "120 days. Afterward, they are destroyed in the reticuloendothelial system (mainly spleen)." },
      { q: "What is the physiological role of 2,3-BPG on hemoglobin?", a: "It binds to the beta chains of deoxyhemoglobin, stabilizing the 'T' (tense) state and decreasing oxygen affinity, facilitating oxygen release to active tissues." },
      { q: "Name the protein that stores iron inside hepatocytes and macrophages.", a: "Ferritin (water-soluble, temporary storage) and Hemosiderin (insoluble, long-term storage)." }
    ],
    examQuestions: {
      longQuestions: [
        "What is Hemoglobin? Give its normal values. Describe in detail the synthesis of hemoglobin and write a note on its functions.",
        "Describe dietary iron absorption, transport, storage, and regulation in the human body. Detail the role of Hepcidin."
      ],
      shortNotes: [
        "Iron Deficiency Anemia",
        "Hepcidin - The Iron Regulator",
        "Oxyhemoglobin Dissociation Curve factors",
        "Fetal Hemoglobin (HbF)"
      ],
      oneLiners: [
        "What is the daily iron requirement for an adult male?",
        "Name the rate-limiting enzyme of heme synthesis.",
        "What is the valency of iron in functional hemoglobin?"
      ]
    },
    highYieldPoints: [
      "Vitamin C (Ascorbic acid) enhances non-heme iron absorption by reducing ferric (Fe3+) to ferrous (Fe2+) iron.",
      "Lead poisoning inhibits both ALA Dehydratase and Ferrochelatase, shutting down heme synthesis and causing anemia.",
      "A shift of the oxygen-hemoglobin dissociation curve to the right denotes a decreased affinity, allowing easier oxygen unloading (caused by high CO2, high temperature, low pH/acidosis, and high 2,3-BPG)."
    ],
    mnemonics: [
      { phrase: "CADET, face RIGHT!", meaning: "Factors shifting Oxygen-Hb curve to the RIGHT: CO2 (increased), Acid (low pH), DPG (2,3-BPG increased), Exercise, Temperature (increased).", concept: "Oxygen-Hemoglobin dissociation curve shift factors" }
    ],
    frequentlyConfused: [
      { conceptA: "Ferritin", conceptB: "Transferrin", explanation: "Ferritin is the intracellular protein that stores iron inside cells. Transferrin is the plasma glycoprotein that transports iron in the blood circulation." }
    ],
    commonMistakes: [
      "Stating that iron can bind oxygen in the ferric (Fe3+) state. Iron must be in the reduced ferrous (Fe2+) state to bind oxygen reversibly. Ferric iron forms methemoglobin, which is non-functional."
    ],
    oneMinuteRevision: [
      "Hemoglobin = Heme (iron + protoporphyrin) + Globin (polypeptide chains). Synthesized in bone marrow. Normal range: 12-18 g/dL. Iron absorption occurs in duodenum, mediated by DMT-1, exported by ferroportin, regulated by liver hormone Hepcidin."
    ],
    faqs: [
      { q: "Why is duodenal resection associated with microcytic anemia?", a: "Because the duodenum is the primary site for active dietary iron absorption. Resection leads to severe iron malabsorption and consequent iron deficiency anemia." }
    ],
    relatedTopics: [
      { title: "Erythropoiesis and RBC life cycle", slug: "erythropoiesis" },
      { title: "Spleen and Reticuloendothelial System", slug: "spleen-function" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 10 & 11.",
      "Harper's Illustrated Biochemistry (2020). 31st Edition. Chapter 32."
    ],
    visualPlans: [
      { type: "Flowchart", title: "Intestinal Iron Absorption Pathway", description: "Step-by-step cartoon representation of iron moving from intestinal lumen across enterocyte apical membrane via DMT-1, and basolateral exit via Ferroportin." },
      { type: "Summary Chart", title: "Factors affecting Hb-O2 Curve shifts", description: "Left vs. Right shift graphs showing physiological parameters (pH, CO2, Temp, 2,3-BPG)." }
    ]
  },
  cardiac_cycle: {
    id: "cardiac_cycle",
    title: "Phases of the Cardiac Cycle",
    system: "Cardiovascular Physiology",
    studyTime: "25 mins",
    difficulty: "Hard",
    importance: "⭐ Frequently Asked",
    nchCompetency: "PY5.7 - Describe the cardiac cycle - mechanical and pressure-volume changes.",
    learningObjectives: [
      "Define Cardiac Cycle and its normal physiological duration.",
      "Explain the sequential mechanical phases of atrial and ventricular systole and diastole.",
      "Correlate pressure-volume loop changes with cardiac cycle phases.",
      "Identify the origin and timing of physiological heart sounds (S1 and S2)."
    ],
    quickFacts: {
      definition: "The sequence of electrical and mechanical events that occur in the heart from the beginning of one heartbeat to the beginning of the next.",
      normalRange: "Total duration: 0.8 seconds (at standard resting heart rate of 75 bpm).",
      primaryRole: "Ensures coordinated, unidirectional blood pumping from veins to arteries.",
      clinicalImportance: "Essential for understanding valve disorders (murmurs), heart failure, and interpreting ECG timing.",
      oneLineRevision: "The cardiac cycle consists of atrial systole (0.1s), ventricular systole (0.3s), and joint diastole (0.4s)."
    },
    introduction: "The heart functions as a highly efficient double pump. The cardiac cycle describes the complex coordination of muscle contraction, electrical firing, valve opening/closing, and pressure changes that drive blood through the systemic and pulmonary circulations during each single heartbeat. Mastering this is the cornerstone of clinical cardiology.",
    definition: "The cardiac cycle is defined as the physiological cycle of mechanical, electrical, and pressure changes occurring in the heart during one complete beat, lasting approximately 0.8 seconds.",
    basicConcepts: "The cycle is divided into two primary mechanical states: Systole (contraction and pumping) and Diastole (relaxation and filling). At a standard heart rate of 75 beats per minute, one cycle lasts 0.8s. Ventricular systole lasts 0.3 seconds, while ventricular diastole lasts 0.5 seconds.",
    detailedExplanation: "Let us break down the mechanical events of the Ventricles:\n1. Ventricular Systole (0.3s):\n   - Isovolumetric Contraction (0.05s): Ventricular pressure rises sharply. All valves (AV and Semilunar) are closed. Ventricular volume remains constant. Closure of AV valves produces the First Heart Sound (S1, 'Lubb').\n   - Ventricular Ejection (0.25s): Ventricular pressure exceeds aortic/pulmonary pressure, opening the semilunar valves. Blood is ejected. Divided into Rapid Ejection (0.11s) and Reduced Ejection (0.14s).\n2. Ventricular Diastole (0.5s):\n   - Protodiastole (0.04s): The initial drop in pressure. Semilunar valves close at the end, producing the Second Heart Sound (S2, 'Dupp').\n   - Isovolumetric Relaxation (0.06s): All valves are closed again. Ventricular pressure falls rapidly while volume remains unchanged.\n   - Ventricular Filling (0.4s): Ventricular pressure drops below atrial pressure, opening the AV valves. Blood rushes in. Divided into Rapid Filling (0.11s, associated with a third heart sound S3 in children), Reduced Filling or Diastasis (0.19s), and Atrial Systole (0.1s, adds the final 20-30% of ventricular volume, associated with a pathological fourth heart sound S4).",
    physiologicalMechanism: [
      { step: 1, title: "Pacemaker Depolarization", detail: "SA Node fires an electrical impulse which sweeps through the atria, visible as the P wave on an ECG." },
      { step: 2, title: "Atrial Contraction", detail: "Atria contract (Atrial Systole, 0.1s), squeezing the final bolus of blood through open AV valves into the relaxed ventricles." },
      { step: 3, title: "Ventricular Activation & S1", detail: "Electrical signal reaches ventricles via the AV bundle (QRS complex). Ventricles contract; immediate rise in pressure slams the mitral and tricuspid (AV) valves shut, creating the S1 heart sound." },
      { step: 4, title: "Isovolumetric Pressure Rise", detail: "Ventricular walls squeeze firmly. Since aortic and pulmonary valves are still closed, pressure spikes without any change in volume (isovolumetric contraction)." },
      { step: 5, title: "Ejection and Arterial Runoff", detail: "Pressure exceeds arterial limits (~80 mmHg in left ventricle), forcing semilunar valves open. Blood shoots into the aorta and pulmonary artery, reducing ventricular volume." },
      { step: 6, title: "Relaxation and S2", detail: "Ventricles relax (T wave on ECG). Ventricular pressure falls below aortic/pulmonary pressures, slamming semilunar valves closed, generating the S2 heart sound." },
      { step: 7, title: "Isovolumetric Pressure Drop", detail: "Ventricles relax with all valves closed. Pressure falls to near 0 mmHg without volume changes." },
      { step: 8, title: "Rapid Passive Filling", detail: "Ventricular pressure drops below atrial pressure. AV valves snap open, and blood stored in the atria rushes passively into the ventricles." }
    ],
    flowchart: {
      title: "Timing & Subdivisions of the Cardiac Cycle",
      steps: [
        { label: "Atrial Systole", desc: "Duration: 0.1s. Ventricles are in end-diastole. Atria contract to top-off ventricular blood." },
        { label: "Isovolumetric Contraction", desc: "Duration: 0.05s. Ventricular systole begins. AV valves close (S1). No blood flows." },
        { label: "Ventricular Ejection", desc: "Duration: 0.25s. Semilunar valves open. Blood pumped to lungs and body." },
        { label: "Isovolumetric Relaxation", desc: "Duration: 0.06s. Ventricular diastole begins. Semilunar valves close (S2). Pressure drops." },
        { label: "Ventricular Filling", desc: "Duration: 0.34s. Passive flow from atria. Separated into rapid, reduced (diastasis) phases." }
      ]
    },
    tables: [
      {
        title: "Physiological Heart Sounds",
        headers: ["Heart Sound", "Cause / Association", "Characteristics", "Clinical Significance"],
        rows: [
          ["First Sound (S1)", "Closure of mitral and tricuspid (AV) valves at start of ventricular systole.", "Low-pitched, longer duration ('Lubb').", "Marks onset of systole. Muffled in mitral regurgitation."],
          ["Second Sound (S2)", "Closure of aortic and pulmonary (semilunar) valves at start of diastole.", "High-pitched, shorter duration ('Dupp').", "Marks onset of diastole. Split S2 occurs physiologically during inspiration."],
          ["Third Sound (S3)", "Rapid rushing of blood into ventricles during the rapid filling phase.", "Low-frequency, soft sound.", "Physiological in children/athletes; pathological in adults (indicates volume overload or heart failure)."],
          ["Fourth Sound (S4)", "Turbulent blood flow during atrial systole into a stiff, non-compliant ventricle.", "Always pathological.", "Heard in severe ventricular hypertrophy or long-standing hypertension."]
        ]
      }
    ],
    clinicalCorrelation: "Auscultation of heart sounds is a key clinical skill. Valvular lesions alter the laminar flow of blood, producing turbulent flow called Murmurs. For instance, narrowing of the aortic valve (Aortic Stenosis) creates a harsh systolic murmur heard during the ejection phase. Homoeopathic medicines like Cactus Grandiflorus (feeling of iron band squeezing the heart), Digitalis (slow, irregular pulse, feeling that heart will stop if he moves), and Spigelia (stabbing neuralgic pains with loud murmurs) are highly indicated based on these pathological and functional cardiovascular presentations.",
    appliedPhysiology: "During exercise, the heart rate increases significantly, e.g., to 150 bpm. Since the total cardiac cycle duration must shorten to 0.4 seconds, the diastole phase is disproportionately reduced (from 0.5s down to 0.15s). This curtails the resting and filling time of the ventricles, highlighting the importance of the atrial kick (atrial systole) during high-heart-rate states.",
    importantDisorders: [
      { name: "Mitral Valve Prolapse", mechanism: "Flaps of the mitral valve bulge backward into the left atrium during ventricular contraction, sometimes failing to seal.", symptoms: "Systolic click, palpitations, chest pain, and fatigue." },
      { name: "Aortic Regurgitation", mechanism: "Incompetent aortic valve leaflets leak blood backward from the aorta into the left ventricle during diastole.", symptoms: "Water-hammer pulse, bounding carotid pulsations, and diastolic murmur." }
    ],
    vivaQuestions: [
      { q: "What is the normal End-Diastolic Volume (EDV) of the left ventricle?", a: "Approximately 120 ml of blood." },
      { q: "Define Stroke Volume and its normal resting value.", a: "The volume of blood pumped out of one ventricle per single contraction. It is equal to EDV - ESV, normally about 70 ml." },
      { q: "What causes the physiological splitting of the Second Heart Sound (S2)?", a: "During inspiration, venous return to the right heart increases, delaying pulmonary valve closure, while blood pooling in pulmonary vessels reduces return to the left heart, accelerating aortic valve closure." }
    ],
    examQuestions: {
      longQuestions: [
        "Define Cardiac Cycle. Describe in detail the mechanical phases of the cardiac cycle, with special reference to intraventricular pressure and volume changes.",
        "Explain the origin, duration, and clinical significance of the first and second physiological heart sounds. Differentiate them clearly."
      ],
      shortNotes: [
        "Isovolumetric Contraction Phase",
        "Wiggers Diagram features",
        "Diastasis (Reduced Filling phase)",
        "Pathological S3 and S4 heart sounds"
      ],
      oneLiners: [
        "State the average duration of ventricular systole.",
        "What valve closure produces S2?",
        "What is the mathematical equation for Ejection Fraction?"
      ]
    },
    highYieldPoints: [
      "The duration of the cardiac cycle is inversely proportional to the heart rate (Cycle = 60 / Heart Rate).",
      "During isovolumetric phases, all four valves are closed and the heart acts as a closed cavity.",
      "Left ventricular pressure ranges from near 0 mmHg (diastole) to 120 mmHg (systole), while right ventricular pressure ranges from 0 to 25 mmHg."
    ],
    mnemonics: [
      { phrase: "S1 = Systole Start, S2 = Diastole Dawn", meaning: "S1 marks the start of Ventricular Systole (AV closure); S2 marks the beginning of Ventricular Diastole (Semilunar closure).", concept: "Heart sounds cycle correlation" }
    ],
    frequentlyConfused: [
      { conceptA: "Isovolumetric Contraction", conceptB: "Isovolumetric Relaxation", explanation: "Contraction occurs at the start of systole (S1 occurs; pressure rises rapidly to open semilunar valves). Relaxation occurs at the start of diastole (S2 occurs; pressure drops rapidly to open AV valves)." }
    ],
    commonMistakes: [
      "Assuming S1 and S2 are caused by active muscular contraction. They are caused by the vibration of blood and tissues when the heart valves snap closed passively."
    ],
    oneMinuteRevision: [
      "Cardiac cycle = 0.8s. Ventricular systole (0.3s) has isovolumetric contraction & ejection. Ventricular diastole (0.5s) has isovolumetric relaxation, passive filling, and active atrial systole. S1 is AV valve closure; S2 is semilunar valve closure."
    ],
    faqs: [
      { q: "Why is the left ventricular wall much thicker than the right?", a: "Because the left ventricle must pump blood against the high systemic resistance (aorta pressure ~80-120 mmHg), whereas the right ventricle pumps against low pulmonary vascular resistance (~8-25 mmHg)." }
    ],
    relatedTopics: [
      { title: "Cardiac Output Regulation (Frank-Starling Law)", slug: "cardiac-output" },
      { title: "Electrocardiogram wave interpretations", slug: "ecg-interpretation" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 92.",
      "Boron & Boulpaep (2016). Medical Physiology. 3rd Edition. Chapter 22."
    ],
    visualPlans: [
      { type: "Summary Chart", title: "Wiggers Diagram", description: "The definitive cardiovascular graph showing aligned ECG, heart sounds, aortic pressure, ventricular pressure, and ventricular volume changes on a single timeline." },
      { type: "Infographic", title: "Pressure-Volume Loop", description: "An annotated XY loop charting left ventricular volume against left ventricular pressure, labeling EDV, ESV, valve actions, and stroke volume." }
    ]
  },
  gfr_nephron: {
    id: "gfr_nephron",
    title: "Glomerular Filtration Rate and Nephron Function",
    system: "Renal Physiology",
    studyTime: "25 mins",
    difficulty: "Medium",
    importance: "⭐ High Scoring",
    nchCompetency: "PY7.3 - Describe the structure of nephron and describe Glomerular Filtration - mechanism and regulation.",
    learningObjectives: [
      "Describe the structural and functional anatomy of the nephron.",
      "Define Glomerular Filtration Rate (GFR) and state its normal physiological value.",
      "Detail the physical forces (Starling forces) regulating glomerular filtration.",
      "Explain the feedback loops governing GFR autoregulation."
    ],
    quickFacts: {
      definition: "The total volume of fluid filtered from the glomerular capillaries into Bowman's capsule per unit time across both kidneys.",
      normalRange: "Normal GFR: 125 mL/min (approximately 180 Liters per day) in a healthy adult male.",
      primaryRole: "Initiates urine formation, clearing metabolic waste while conserving vital water and solutes.",
      clinicalImportance: "The primary clinical marker used to evaluate renal function and stage Chronic Kidney Disease (CKD).",
      oneLineRevision: "GFR is driven by glomerular capillary hydrostatic pressure, regulated dynamically via tubuloglomerular feedback."
    },
    introduction: "The kidneys are the master Homoeostatic organs for fluid, electrolyte, and acid-base balance. The nephron is the functional unit of the kidney, processing plasma in three sequential steps: filtration, reabsorption, and secretion. Glomerular filtration is the very first and most critical gatekeeping step in this urinary cascade.",
    definition: "Glomerular Filtration Rate (GFR) is defined as the volume of glomerular filtrate formed per minute by all the nephrons of both kidneys combined, averaging 125 mL/min in males and 110 mL/min in females.",
    basicConcepts: "Filtration occurs through the glomerular filtration membrane, a highly selective three-layered barrier: 1) Fenestrated capillary endothelium; 2) Glomerular basement membrane (GBM, negatively charged); 3) Podocyte slit diaphragms (epithelial layer). This barrier prevents the filtration of blood cells and large negatively-charged plasma proteins (like albumin).",
    detailedExplanation: "Filtration is a passive process driven by physical Starling forces:\n1. Glomerular Capillary Hydrostatic Pressure (PGC ~60 mmHg, favors filtration): Promoted by the high-resistance efferent arteriole which acts as a bottleneck.\n2. Bowman's Space Hydrostatic Pressure (PBS ~18 mmHg, opposes filtration).\n3. Glomerular Capillary Oncotic Pressure (pi-GC ~32 mmHg, opposes filtration): Rises along the capillary as water is filtered out, concentrating plasma proteins.\n4. Bowman's Space Oncotic Pressure (pi-BS ~0 mmHg, favors filtration): Practically zero because proteins are not filtered.\nNet Filtration Pressure (NFP) = PGC - PBS - pi-GC = 60 - 18 - 32 = +10 mmHg.\nGFR is equal to Kf (filtration coefficient, representing surface area and permeability) multiplied by NFP (GFR = Kf x NFP).\nTo maintain a constant GFR despite systemic blood pressure swings (from 80 to 170 mmHg), the kidney utilizes Autoregulation. This occurs via two intra-renal mechanisms:\n1. Myogenic Mechanism: Smooth muscle of afferent arteriole constricts in response to stretch (high BP), reducing flow to glomerulus.\n2. Tubuloglomerular Feedback (TGF): When GFR rises, more NaCl is delivered to the macula densa in the distal tubule. The macula densa releases Adenosine, causing vasoconstriction of the adjacent afferent arteriole, restoring GFR back to normal.",
    physiologicalMechanism: [
      { step: 1, title: "Increased Systemic Blood Pressure", detail: "A sudden rise in systemic arterial pressure threatens to spike glomerular capillary pressure and blow out GFR." },
      { step: 2, title: "Increased Solute Delivery", detail: "The temporary surge in filtration speeds up fluid flow, delivering a high concentration of NaCl to the distal convoluted tubule." },
      { step: 3, title: "Macula Densa Sensing", detail: "Specialized epithelial cells in the distal tubule (Macula Densa) take up extra Na+ and Cl- via NKCC2 cotransporters, causing the cells to swell." },
      { step: 4, title: "Paracrine Adenosine Release", detail: "In response to swelling and ATP consumption, macula densa cells secrete Adenosine and ATP into the juxtaglomerular interstitium." },
      { step: 5, title: "Afferent Vasoconstriction", detail: "Adenosine binds to A1 receptors on vascular smooth muscle cells of the afferent arteriole, trigger calcium influx, causing profound vasoconstriction." },
      { step: 6, title: "Restoration of Glomerular Pressure", detail: "The constriction of the incoming arteriole reduces hydrostatic pressure (PGC) back to ~60 mmHg, stabilizing GFR." }
    ],
    flowchart: {
      title: "Tubuloglomerular Feedback Loop (TGF)",
      steps: [
        { label: "High GFR", desc: "Transient rise in GFR increases fluid flow and NaCl delivery." },
        { label: "Macula Densa", desc: "Macula densa cells in the Juxtaglomerular Apparatus (JGA) detect elevated NaCl." },
        { label: "Paracrine Signal", desc: "Macula densa releases ATP and Adenosine." },
        { label: "Afferent Response", desc: "Smooth muscles of the afferent arteriole constrict." },
        { label: "Equilibrium Restored", desc: "Glomerular blood flow drops, stabilizing GFR at 125 ml/min." }
      ]
    },
    tables: [
      {
        title: "Glomerular Filtration Membrane Layers",
        headers: ["Layer", "Anatomical Structure", "Permeability Barrier", "Physiological Function"],
        rows: [
          ["1. Inner Endothelium", "Fenestrated capillary endothelial cells.", "Size barrier (blocks cells).", "Prevents red and white blood cells from entering Bowman's space."],
          ["2. Middle Basement Membrane", "Extracellular matrix of collagen type IV and heparan sulfate.", "Charge barrier (negative charge).", "Electrostatically repels negatively charged proteins like Albumin."],
          ["3. Outer Epithelium", "Visceral epithelial cells (Podocytes) with foot processes.", "Size filtration slit (pores ~4-11 nm).", "The final size sieve, allowing only small molecules, water, and electrolytes to pass."]
        ]
      }
    ],
    clinicalCorrelation: "GFR is the golden standard index of kidney function. In conditions like Acute Kidney Injury (AKI) or Chronic Kidney Disease (CKD), GFR falls significantly, leading to the accumulation of urea and creatinine in blood (Uremia/Azotemia). Clinical Homoeopaths utilize remedies like Apis Mellifica (scanty, high-colored urine, bags under the eyes, edematous swelling), Lycopodium (red sand in urine, aggravated 4-8 PM), and Serum Anguillae (Eel Serum - highly specific for acute nephritis and rapid uremic dropsy with oliguria) to support renal filtration and restore healthy urine output.",
    appliedPhysiology: "The Juxtaglomerular Apparatus (JGA) also secretes Renin in response to low perfusion pressure (hypotension or blood loss). Renin triggers the Renin-Angiotensin-Aldosterone System (RAAS). Angiotensin II preferentially vasoconstricts the efferent arteriole, which helps preserve GFR even in states of severe shock or systemic volume depletion.",
    importantDisorders: [
      { name: "Minimal Change Disease", mechanism: "Autoimmune destruction of the negative charge on the glomerular basement membrane, causing podocyte foot process effacement.", symptoms: "Massive proteinuria (mainly albuminuria), frothy urine, and generalized edema (anasarca)." },
      { name: "Glomerulonephritis", mechanism: "Immune complex deposition inside the glomerular capillaries, sparking acute inflammation and blocking filtration.", symptoms: "Hematuria (cola-colored urine), oliguria, hypertension, and mild periorbital edema." }
    ],
    vivaQuestions: [
      { q: "What is the normal value of GFR?", a: "125 mL/min (or 180 L/day) in adult males, and 110 mL/min in adult females." },
      { q: "Why is Creatinine clearance used to estimate GFR clinically?", a: "Creatinine is an endogenous waste product that is freely filtered at the glomerulus, is not reabsorbed by the tubules, and is only minimally secreted, making its clearance a highly accurate reflection of GFR." },
      { q: "Which arteriole has a higher resistance: Afferent or Efferent?", a: "The Efferent arteriole, which acts as a downstream resistor to keep the glomerular capillary pressure high (~60 mmHg)." }
    ],
    examQuestions: {
      longQuestions: [
        "What is Glomerular Filtration Rate (GFR)? State its normal value. Explain in detail the factors (Starling forces) that regulate and determine GFR.",
        "Describe the structure and functional components of the Juxtaglomerular Apparatus (JGA). Discuss its role in the regulation of blood pressure and GFR."
      ],
      shortNotes: [
        "Tubuloglomerular Feedback (TGF)",
        "Glomerular Filtration Barrier layers",
        "Juxtaglomerular Cells and Macula Densa",
        "Estimation of GFR using Creatinine Clearance"
      ],
      oneLiners: [
        "What is the average daily volume of glomerular filtrate?",
        "State the main vasoconstrictor hormone of the efferent arteriole.",
        "Name the cell that possesses filtration slits (foot processes)."
      ]
    },
    highYieldPoints: [
      "The glomerular basement membrane's negative charge is due to heparan sulfate proteoglycans.",
      "Constriction of the afferent arteriole decreases both GFR and renal blood flow (RBF).",
      "Constriction of the efferent arteriole increases GFR (up to a point) but decreases RBF."
    ],
    mnemonics: [
      { phrase: "A WET BED", meaning: "Primary Kidney/Nephron Functions: Acid-base balance, Water balance, Erythropoiesis (EPO release), Toxin clearance, Blood pressure control, Electrolyte balance, Vitamin D activation.", concept: "Functions of the Kidney and Nephron" }
    ],
    frequentlyConfused: [
      { conceptA: "Afferent Arteriole", conceptB: "Efferent Arteriole", explanation: "Afferent arteriole brings blood INTO the glomerulus (constriction drops GFR). Efferent arteriole carries blood OUT OF the glomerulus (constriction increases GFR by backing up blood pressure)." }
    ],
    commonMistakes: [
      "Assuming that blood pressure fluctuations from 90 to 140 mmHg will cause a massive surge in urine output. Due to powerful auto-regulatory loops (myogenic & TGF), GFR remains completely constant within this blood pressure range."
    ],
    oneMinuteRevision: [
      "GFR = 125 mL/min. Formed across three-layered glomerular membrane. Driven by capillary hydrostatic pressure (~60 mmHg). Autoregulated by myogenic reflex and tubuloglomerular feedback (macula densa sensing high GFR and releasing adenosine to constrict afferent arteriole)."
    ],
    faqs: [
      { q: "How does sympathetic stimulation affect GFR?", a: "Strong sympathetic stimulation (e.g., during severe exercise or hemorrhage) causes profound vasoconstriction of afferent arterioles, drastically reducing renal blood flow and GFR to divert blood to vital organs." }
    ],
    relatedTopics: [
      { title: "Mechanism of Urine Concentration (Countercurrent)", slug: "countercurrent" },
      { title: "Renal Clearance and tubular functions", slug: "renal-clearance" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 51 & 52.",
      "Koeppen & Stanton (2018). Renal Physiology. 6th Edition. Chapter 2 & 3."
    ],
    visualPlans: [
      { type: "Labeled Diagram", title: "The Juxtaglomerular Apparatus (JGA)", description: "A detailed cross-section diagram showing the afferent arteriole with JG cells, efferent arteriole, glomerulus, Bowman's capsule, and the macula densa cells of the distal tubule." },
      { type: "Infographic", title: "Starling Forces in Glomerular Capillaries", description: "Visual pressure gauge diagrams illustrating hydrostatic vs oncotic pressures favoring and opposing filtration, resulting in a net +10 mmHg pressure." }
    ]
  },
  erythropoiesis: {
    id: "erythropoiesis",
    title: "Erythropoiesis (RBC Synthesis)",
    system: "Blood Physiology",
    studyTime: "20 mins",
    difficulty: "Medium",
    importance: "⭐ Frequently Asked",
    nchCompetency: "PY2.1 - Describe the process and stages of erythropoiesis and factors regulating it.",
    learningObjectives: [
      "Define erythropoiesis and identify its anatomical sites across different ages.",
      "Describe the sequential stages of development from stem cells to mature red blood cells.",
      "Discuss the key factors regulating erythropoiesis with special emphasis on Erythropoietin.",
      "List the essential dietary factors (Vitamins & Minerals) required for healthy RBC maturation."
    ],
    quickFacts: {
      definition: "The physiological process of origin, development, and maturation of erythrocytes (red blood cells) in the body.",
      normalRange: "Daily production: ~200 billion RBCs; mature lifespan: 120 days.",
      primaryRole: "Generates highly functional, biconcave, hemoglobin-packed cells for systemic gas transport.",
      clinicalImportance: "Impairment causes various forms of Anemia; hyper-production results in Polycythemia.",
      oneLineRevision: "Erythropoiesis is driven by hypoxia-induced erythropoietin, maturing cells through 6 distinct stages in bone marrow."
    },
    introduction: "Red blood cells (erythrocytes) are continuously destroyed and replaced to maintain systemic oxygen delivery. The process of making these cells, called erythropoiesis, takes place under tight hormonal control. For BHMS students, understanding the morphological changes of erythrocyte precursors and the factors that influence them is a core university theory and viva topic.",
    definition: "Erythropoiesis is the dynamic physiological process of generation, differentiation, and maturation of erythrocytes from hematopoetic stem cells.",
    basicConcepts: "During intrauterine life, erythropoiesis occurs in three stages: Mesoblastic (yolk sac, first 2 months), Hepatic (liver & spleen, 2nd to 5th month), and Myeloid (red bone marrow, 5th month onwards). In children, all bones with red marrow produce RBCs. By age 20, red marrow in long bone shafts is replaced by yellow inactive marrow, leaving only flat bones (sternum, ribs, vertebrae, pelvis) and proximal ends of femur/humerus as active sites.",
    detailedExplanation: "Erythropoiesis begins with the Pluripotent Hematopoietic Stem Cell (PHSC), which differentiates into the Multipotent Stem Cell (MHSC) and then the Unipotent colony-forming unit-erythroid (CFU-E). \nMaturation stages are characterized by three physical changes: decrease in cell size, disappearance of nucleoli and eventual extrusion of the nucleus, and appearance of hemoglobin. The 6 stages of erythroid maturation are:\n1. Proerythroblast (Pronormoblast): Large cell, large nucleus, no hemoglobin.\n2. Early Normoblast (Basophilic): Condensing chromatin, nucleoli disappear.\n3. Intermediate Normoblast (Polychromatophilic): Hemoglobin starts appearing, giving the cytoplasm a mixed basophilic/acidophilic appearance.\n4. Late Normoblast (Orthochromatic): Cytoplasm becomes completely acidophilic (packed with hemoglobin). The nucleus becomes pyknotic and is extruded at the end of this stage.\n5. Reticulocyte: Immature RBC containing a reticular network of ribosomal RNA. Released into circulation, maturing in 1-2 days.\n6. Mature Erythrocyte: Non-nucleated, biconcave disc.",
    physiologicalMechanism: [
      { step: 1, title: "Hypoxia Stimulus", detail: "A decrease in systemic oxygen supply (hypoxia) due to low blood volume, high altitude, anemia, or pulmonary disease is sensed by renal tissue." },
      { step: 2, title: "Renal Erythropoietic Factor Activation", detail: "Peritubular interstitial cells in the renal cortex detect the drop in oxygen tension and stabilize Hypoxia-Inducible Factor 1-alpha (HIF-1a)." },
      { step: 3, title: "Erythropoietin Secretion", detail: "Hypoxia-Inducible Factor triggers transcription of the Erythropoietin (EPO) gene, leading to the release of EPO into the circulation (90% from kidneys, 10% from liver)." },
      { step: 4, title: "Marrow Proliferation Trigger", detail: "EPO travels via blood to the red bone marrow, binding to specific EPO receptors on CFU-E and proerythroblast cells." },
      { step: 5, title: "Accelerated Maturation", detail: "EPO stimulates transcription of globin and heme synthesis genes, speeding up differentiation through normoblastic stages, decreasing cell cycle duration, and prompting early reticulocyte release." },
      { step: 6, title: "Oxygen Homoeostasis Restored", detail: "Increased circulating erythrocytes elevate blood oxygen carrying capacity, relieving tissue hypoxia and down-regulating EPO release (negative feedback)." }
    ],
    flowchart: {
      title: "Hormonal Regulation of Erythropoiesis",
      steps: [
        { label: "Hypoxia", desc: "Decreased tissue oxygenation triggers the renal sensor cells." },
        { label: "EPO Secretion", desc: "Kidneys synthesize and release Erythropoietin hormone into blood." },
        { label: "Marrow Stimulation", desc: "EPO stimulates CFU-E cells in red bone marrow to proliferate." },
        { label: "Increased RBC Count", desc: "Enhanced maturation yields higher circulating erythrocyte levels." },
        { label: "Feedback Relief", desc: "Increased oxygen transport relieves hypoxia, shutting down EPO surge." }
      ]
    },
    tables: [
      {
        title: "Stages of Erythroid Maturation & Characteristics",
        headers: ["Stage Name", "Size (µm)", "Nucleus Status", "Hemoglobin / Cytoplasm", "Mitotic Ability"],
        rows: [
          ["1. Proerythroblast", "15 - 20", "Large, 2-3 nucleoli present", "Deeply basophilic, no Hb", "Yes (active)"],
          ["2. Early Normoblast", "12 - 16", "Nucleoli disappear, chromatin coarse", "Basophilic, no Hb", "Yes"],
          ["3. Intermediate Normoblast", "10 - 14", "Nucleus further condensed", "Polychromatic (greyish), Hb begins", "Yes (final stage)"],
          ["4. Late Normoblast", "8 - 10", "Pyknotic (ink-bottle), extruded at end", "Orthochromatic (pinkish), full Hb", "No"],
          ["5. Reticulocyte", "7 - 9", "Absent (remnants of organelles/RNA)", "Pinkish-blue network", "No"],
          ["6. Erythrocyte", "7.2", "Completely absent", "Biconcave, acidophilic pink", "No"]
        ]
      }
    ],
    clinicalCorrelation: "Maturation arrest is highly clinically relevant. In vitamin B12 or Folic Acid deficiency, DNA synthesis is impaired, stalling nuclear maturation. This causes proerythroblasts to become massive, pathological megaloblasts, leading to Megaloblastic Anemia. In homoeopathic therapeutics, deep-acting constitutional remedies like Natrum Muriaticum, Arsenicum Album, and Calcarea Carbonica are used alongside nutritional advice to normalize hematopoiesis by correcting dynamic digestive and absorptive blocks.",
    appliedPhysiology: "Under conditions of severe chronic blood loss or hemolysis, the red bone marrow can increase its rate of erythropoiesis up to 6 to 8 times the normal rate. In such states, high counts of reticulocytes (Reticulocytosis, >5%) are found in the blood, indicating active hyper-functioning marrow.",
    importantDisorders: [
      { name: "Megaloblastic Anemia", mechanism: "Vitamin B12 or Folic Acid deficiency prevents DNA thymidylate synthesis, causing abnormal, giant erythroblasts and fragile macrocytic RBCs.", symptoms: "Glossitis (beefy red tongue), numbness, paresthesia, fatigue, pallor." },
      { name: "Renal Anemia", mechanism: "Chronic Kidney Disease destroys renal cortical tissue, eliminating erythropoietin secretion and stalling bone marrow RBC production.", symptoms: "Severe fatigue, normocytic normochromic anemia, uremic pruritus, fluid retention." }
    ],
    vivaQuestions: [
      { q: "What is a Reticulocyte, and what is its normal percentage?", a: "An immature, non-nucleated RBC containing ribosomal RNA network. Its normal range is 0.5% to 2.0% of total RBCs." },
      { q: "Why do patients at high altitudes have elevated RBC counts (physiological polycythemia)?", a: "Low atmospheric oxygen pressure at high altitude causes tissue hypoxia, triggering sustained renal EPO release, which stimulates erythropoiesis." },
      { q: "Which stage of erythropoiesis shows the first appearance of hemoglobin?", a: "The Intermediate Normoblast stage." }
    ],
    examQuestions: {
      longQuestions: [
        "Define erythropoiesis. Describe the different stages of erythropoiesis with neat, labeled schematics of cell morphology changes.",
        "Discuss the regulation of erythropoiesis. Explain in detail the role of Erythropoietin and factors necessary for red blood cell maturation."
      ],
      shortNotes: [
        "Factors regulating Erythropoiesis",
        "Reticulocyte stage and its clinical significance",
        "Megaloblastic Erythropoiesis",
        "Anatomical sites of erythropoiesis in intrauterine vs. adult life"
      ],
      oneLiners: [
        "Name the hormone that stimulates red blood cell production.",
        "Which vitamin is required for nuclear maturation of RBCs?",
        "State the average lifespan of a human erythrocyte."
      ]
    },
    highYieldPoints: [
      "Erythropoietin (EPO) primarily acts on Colony Forming Units-Erythroid (CFU-E), stimulating their proliferation and survival.",
      "Vitamin B12 absorption requires Intrinsic Factor of Castle, secreted by the gastric parietal cells. Absence of this leads to Pernicious Anemia.",
      "The nucleus is completely extruded at the end of the Late Normoblast stage, before entering the Reticulocyte stage."
    ],
    mnemonics: [
      { phrase: "People Easily Ingest Late Red Erythrocytes", meaning: "Stages of erythropoiesis: P = Proerythroblast, E = Early normoblast, I = Intermediate normoblast, L = Late normoblast, R = Reticulocyte, E = Erythrocyte.", concept: "Sequential stages of erythroid maturation" }
    ],
    frequentlyConfused: [
      { conceptA: "Erythropoiesis", conceptB: "Hematopoiesis", explanation: "Hematopoiesis is the general, overall term for the production of all blood cells (RBCs, WBCs, platelets). Erythropoiesis is the specific sub-process that produces only erythrocytes (RBCs)." }
    ],
    commonMistakes: [
      "Stating that the reticulocyte contains a nucleus. Reticulocytes are non-nucleated; the network seen under supravital staining (Brilliant Cresyl Blue) is precipitated ribosomal RNA, not nuclear chromatin."
    ],
    oneMinuteRevision: [
      "Erythropoiesis: RBC formation. Site: Red bone marrow in adults. Maturation stages: Proerythroblast -> Early -> Intermediate (Hb starts) -> Late (nucleus out) -> Reticulocyte -> Mature RBC. Regulated by kidney-secreted Erythropoietin (EPO) in response to hypoxia. Maturation requires B12, folic acid, and iron."
    ],
    faqs: [
      { q: "Why is vitamin C important for hemoglobin synthesis?", a: "Vitamin C helps reduce dietary ferric iron (Fe3+) into the highly absorbable ferrous state (Fe2+) in the gut, ensuring a healthy supply of iron for heme synthesis in the marrow." }
    ],
    relatedTopics: [
      { title: "Hemoglobin and Iron Metabolism", slug: "hemoglobin_iron" },
      { title: "Erythrocyte destruction and jaundice pathways", slug: "bilirubin-metabolism" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 8.",
      "Guyton & Hall (2020). Textbook of Medical Physiology. 14th Edition. Chapter 33."
    ],
    visualPlans: [
      { type: "Flowchart", title: "Morphological Changes of Erythroid Stages", description: "Morphological progression showing cell diameter decreasing, nucleoplasm condensing to extrusion, and cytoplasm changing from blue to pink." },
      { type: "Infographic", title: "Maturational factors vs. Synthesis factors", description: "Venn diagram comparing maturation factors (Vitamin B12, Folic Acid) to structural synthesis factors (Iron, Amino Acids, Copper)." }
    ]
  },
  blood_groups: {
    id: "blood_groups",
    title: "ABO and Rh Blood Group Systems",
    system: "Blood Physiology",
    studyTime: "20 mins",
    difficulty: "Easy",
    importance: "⭐ High Scoring",
    nchCompetency: "PY2.11 - Describe the ABO and Rh blood group systems, mismatch transfusion reactions and Erythroblastosis fetalis.",
    learningObjectives: [
      "Explain Landsteiner's Laws governing human blood grouping.",
      "Describe the antigens (agglutinogens) and antibodies (agglutinins) present in ABO systems.",
      "Understand the physiological basis of the Rh factor and its clinical implications.",
      "Detail the pathogenesis, prevention, and treatment of Erythroblastosis Fetalis."
    ],
    quickFacts: {
      definition: "The immunological classification of human blood based on the presence or absence of inherited antigenic substances on the surface of red blood cells.",
      normalRange: "ABO distribution varies globally; Rh positive (~85%), Rh negative (~15%).",
      primaryRole: "Determines immunological compatibility for blood transfusions and maternal-fetal interactions.",
      clinicalImportance: "Mismatch transfusion leads to acute intravascular hemolysis; Rh mismatch causes severe fetal hemolysis.",
      oneLineRevision: "Blood group is determined by RBC surface antigens; Landsteiner's law states matching antibodies are always absent in one's plasma."
    },
    introduction: "In modern medicine, blood transfusion is a lifesaving intervention, but it can be fatal if the donor and recipient are incompatible. The discovery of blood groups by Karl Landsteiner revolutionized clinical hematology. For First BHMS students, understanding the physiological principles of blood matching, mismatch transfusion reactions, and maternal-fetal Rh incompatibility is a high-yield exam requirement.",
    definition: "Blood groups are hereditary antigenic classifications of blood determined by specific glycoprotein or glycolipid molecules (agglutinogens) present on the outer surface of the erythrocyte membrane.",
    basicConcepts: "The ABO system contains two main antigens, Antigen A and Antigen B, and two plasma antibodies, Anti-A and Anti-B. Landsteiner's Law states: 1) If a particular antigen is present on the RBC membrane, the corresponding antibody must be absent from the plasma; 2) If a particular antigen is absent from the RBC membrane, the corresponding antibody must be present in the plasma. Note: The second part of the law does not apply to the Rh system, where anti-Rh antibodies are not naturally occurring and only develop after immunization.",
    detailedExplanation: "In the ABO system, individuals are classified into four groups:\n- Group A: Has Antigen A on RBCs; has Anti-B antibody in plasma.\n- Group B: Has Antigen B on RBCs; has Anti-A antibody in plasma.\n- Group AB: Has both Antigens A and B on RBCs; has no plasma antibodies (Universal Recipient).\n- Group O: Has no antigens on RBCs; has both Anti-A and Anti-B antibodies in plasma (Universal Donor).\n\nThe Rh system is based on the 'D' antigen. Individuals with the D antigen are Rh-positive (Rh+), and those without are Rh-negative (Rh-). \nIf an Rh- person is exposed to Rh+ blood (via transfusion or pregnancy), they produce anti-D antibodies. \nThis is the basis of Erythroblastosis Fetalis (Hemolytic Disease of the Newborn / HDN): An Rh- mother carrying an Rh+ fetus can become sensitized to fetal RBCs during delivery of the first child. In subsequent pregnancies with an Rh+ fetus, maternal anti-D antibodies (IgG class) cross the placenta, causing massive destruction of fetal red blood cells.",
    physiologicalMechanism: [
      { step: 1, title: "Rh Sensitization", detail: "An Rh-negative mother carries an Rh-positive fetus. During the first delivery, fetal red blood cells leak into maternal circulation due to placental separation." },
      { step: 2, title: "Maternal Immunization", detail: "Maternal immune cells recognize the foreign fetal 'D' antigen, initiating a primary immune response and synthesizing Anti-D antibodies (initially IgM, then memory IgG)." },
      { step: 3, title: "Subsequent Gestation", detail: "During a second pregnancy with another Rh-positive fetus, maternal memory cells are activated, producing high titers of IgG Anti-D antibodies." },
      { step: 4, title: "Placental Transport", detail: "Since IgG is a monomeric antibody, it easily crosses the placental barrier entering the fetal bloodstream." },
      { step: 5, title: "Agglutination and Hemolysis", detail: "Maternal Anti-D antibodies bind to fetal Rh-positive red blood cells, triggering splenic macrophages to phagocytose and lyse the fetal RBCs." },
      { step: 6, title: "Fetal Compensatory Response", detail: "Severe anemia triggers extreme extramedullary erythropoiesis in the fetal liver and spleen, causing hepatosplenomegaly and releasing immature, nucleated erythroblasts (erythroblastosis) into fetal blood." }
    ],
    flowchart: {
      title: "Pathogenesis of Erythroblastosis Fetalis (HDN)",
      steps: [
        { label: "Rh- Mother & Rh+ Fetus", desc: "First pregnancy; uneventful, but delivery causes fetal-maternal bleed." },
        { label: "Maternal Sensitization", desc: "Mother's immune system produces IgG anti-D antibodies." },
        { label: "Second Pregnancy", desc: "Anti-D IgG antibodies cross the placenta into the second Rh+ fetus." },
        { label: "Hemolysis of Fetal RBCs", desc: "Antibodies bind and destroy fetal red cells, causing severe anemia." },
        { label: "Severe Hydrops & Jaundice", desc: "Fetal heart failure (Hydrops Fetalis) and post-natal kernicterus." }
      ]
    },
    tables: [
      {
        title: "The ABO Blood Group System Matrix",
        headers: ["Blood Group", "Antigen (Agglutinogen)", "Antibody (Agglutinin)", "Can Receive Blood From", "Can Donate Blood To"],
        rows: [
          ["A", "A Antigen", "Anti-B Antibody", "A, O", "A, AB"],
          ["B", "B Antigen", "Anti-A Antibody", "B, O", "B, AB"],
          ["AB", "Both A & B Antigens", "None", "A, B, AB, O (Universal)", "AB"],
          ["O", "None", "Both Anti-A & Anti-B", "O", "A, B, AB, O (Universal)"]
        ]
      }
    ],
    clinicalCorrelation: "Erythroblastosis fetalis is prevented clinically by administering Anti-D immunoglobulin (RhoGAM) to the Rh-negative mother at 28 weeks of gestation and within 72 hours of delivering an Rh-positive baby. RhoGAM binds and destroys fetal RBCs in maternal blood before the mother's immune system can detect them, preventing sensitization. In Homoeopathy, remedies like Lachesis and Crotalus Horridus are historically discussed for severe hemorrhagic states and hemolysis, though RhoGAM is the mandatory physiological standard.",
    appliedPhysiology: "In mismatch blood transfusions (e.g., Group A blood given to a Group B patient), naturally occurring antibodies immediately attack donor RBCs. The results are severe intravascular hemolysis, releasing massive free hemoglobin into plasma. This clogs renal tubules, causing acute tubular necrosis and acute renal failure (anuria).",
    importantDisorders: [
      { name: "Acute Transfusion Reaction", mechanism: "Host antibodies bind to donor RBC antigens, activating the complement cascade and causing immediate cell lysis.", symptoms: "Fever, chills, dyspnea, hemoglobinuria (dark red urine), severe back pain, hypotension." },
      { name: "Kernicterus", mechanism: "Severe fetal hemolysis produces massive indirect bilirubin. In newborns, the immature blood-brain barrier is permeable, allowing bilirubin to deposit in the basal ganglia, causing neurotoxicity.", symptoms: "Lethargy, high-pitched crying, hypertonia (opisthotonos position), seizures, permanent brain damage." }
    ],
    vivaQuestions: [
      { q: "What is Landsteiner's Law, and what is its exception?", a: "Landsteiner's law states that antigens and corresponding antibodies are mutually exclusive in blood. The exception is the Rh system, where anti-D antibodies are not naturally present in Rh- plasma and only develop after exposure." },
      { q: "Why is blood group O negative considered the universal donor?", a: "Because O- RBCs lack Antigen A, Antigen B, and the Rh D Antigen, meaning they will not be attacked by recipient antibodies in an emergency transfusion." },
      { q: "What is the basic difference between agglutination and clotting?", a: "Agglutination is an antigen-antibody immunological clumping of cells. Clotting is the physiological cascade of coagulation proteins forming a fibrin mesh to trap cells and arrest bleeding." }
    ],
    examQuestions: {
      longQuestions: [
        "Classify human blood groups under the ABO and Rh systems. State Landsteiner's laws and explain how blood typing is performed in the laboratory.",
        "What is Erythroblastosis Fetalis? Discuss its etiology, pathophysiology, clinical features, and preventive measures."
      ],
      shortNotes: [
        "Mismatched Blood Transfusion reactions",
        "Universal Donor and Recipient concept",
        "Rh Factor significance",
        "Kernicterus"
      ],
      oneLiners: [
        "Who discovered the ABO blood groups?",
        "Name the class of antibody that causes Erythroblastosis Fetalis.",
        "What substance prevents Rh sensitization when given to Rh- mothers?"
      ]
    },
    highYieldPoints: [
      "The genes determining ABO blood groups are located on the long arm of chromosome 9, displaying codominance.",
      "The 'D' antigen is the most immunogenic of all Rh antigens (C, c, D, E, e).",
      "During mismatch transfusions, back pain is a classic early sign of acute hemolysis and renal strain."
    ],
    mnemonics: [
      { phrase: "O is OUT, AB is IN", meaning: "O can give to anyone (OUT), AB can receive from anyone (IN).", concept: "Universal donor and recipient directions" }
    ],
    frequentlyConfused: [
      { conceptA: "Agglutinogen", conceptB: "Agglutinin", explanation: "Agglutinogens are the surface glycoproteins (antigens) present on the red blood cell membrane. Agglutinins are the antibodies circulating in the blood plasma." }
    ],
    commonMistakes: [
      "Assuming Erythroblastosis Fetalis can happen in the very first pregnancy. It almost never occurs in the first pregnancy because maternal sensitization takes place during delivery, which is too late to affect the first baby."
    ],
    oneMinuteRevision: [
      "ABO groups: A, B, AB, O based on RBC antigens. Rh system: D antigen makes blood Rh+. Landsteiner's law dictates plasma antibodies. Rh- mother + Rh+ fetus -> sensitized mother -> IgG anti-D crosses placenta in subsequent pregnancy -> destroys fetal RBCs, causing Erythroblastosis Fetalis. Prevented with anti-D immunoglobulins (RhoGAM)."
    ],
    faqs: [
      { q: "What is Bombay Blood Group?", a: "A rare blood group where individuals lack the 'H' antigen (precursor for A and B antigens). They produce antibodies against A, B, and H antigens, and can only receive blood from another Bombay group individual." }
    ],
    relatedTopics: [
      { title: "Erythropoiesis and RBC life cycle", slug: "erythropoiesis" },
      { title: "WBCs and immune mechanisms", slug: "white-blood-cells" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 14.",
      "Guyton & Hall (2020). Textbook of Medical Physiology. 14th Edition. Chapter 36."
    ],
    visualPlans: [
      { type: "Flowchart", title: "Blood Typing Agglutination Matrix", description: "Grid schematic showing blood drops mixed with Anti-A, Anti-B, and Anti-D reagents, showing clumping patterns for each blood type." },
      { type: "Summary Chart", title: "Universal Compatibility Map", description: "Visual schematic with arrows showing compatible transfusion paths between A, B, AB, and O groups." }
    ]
  },
  blood_pressure: {
    id: "blood_pressure",
    title: "Regulation of Arterial Blood Pressure",
    system: "Cardiovascular Physiology",
    studyTime: "25 mins",
    difficulty: "Hard",
    importance: "⭐ Frequently Asked",
    nchCompetency: "PY5.9 - Describe arterial blood pressure, its determinants, measurement, and physiological regulation.",
    learningObjectives: [
      "Define arterial blood pressure and differentiate between systolic, diastolic, pulse, and mean pressures.",
      "Identify the primary physiological determinants of systemic blood pressure.",
      "Explain the short-term neural baroreceptor and chemoreceptor reflex regulation of blood pressure.",
      "Detail the long-term renal regulation of blood pressure, including the RAAS pathway."
    ],
    quickFacts: {
      definition: "The lateral pressure exerted by the flowing column of blood on the elastic walls of the arteries.",
      normalRange: "Standard healthy young adult: Systolic 120 mmHg; Diastolic 80 mmHg.",
      primaryRole: "Generates the necessary pressure gradient to drive capillary perfusion to all peripheral tissues.",
      clinicalImportance: "Sustained elevation causes Hypertension (risk of stroke, heart attack); drop causes Hypotension and shock.",
      oneLineRevision: "Blood Pressure = Cardiac Output × Total Peripheral Resistance, regulated by baroreceptors (short-term) and kidneys (long-term)."
    },
    introduction: "Arterial blood pressure is one of the four key vital signs. It is kept within tight Homoeostatic limits to ensure that organs like the brain, kidneys, and heart receive a steady supply of oxygenated blood. For BHMS students, mastering the complex physiological feedback loops that regulate blood pressure is essential for clinical practice and university paper II.",
    definition: "Arterial Blood Pressure (BP) is the lateral force exerted by blood per unit area on the internal lining of arterial vessels, traditionally measured in millimeters of mercury (mmHg).",
    basicConcepts: "Blood pressure is expressed as Systolic / Diastolic. Systolic BP (120 mmHg) is the peak pressure in arteries during ventricular systole. Diastolic BP (80 mmHg) is the minimum pressure in arteries during ventricular diastole. Pulse Pressure = Systolic - Diastolic (normally 40 mmHg). Mean Arterial Pressure (MAP) is the average pressure driving blood through the system, calculated as Diastolic BP + 1/3 Pulse Pressure (normally ~93 mmHg).",
    detailedExplanation: "The two main determinants of blood pressure are:\n1. Cardiac Output (CO): Primarily determines Systolic BP.\n2. Total Peripheral Resistance (TPR): Determined by the diameter of arterioles; primarily determines Diastolic BP. BP = CO × TPR.\n\nPhysiological regulation of BP is divided into:\n1. Short-Term Regulation (seconds to minutes): Neural reflex-mediated.\n   - Baroreceptor Reflex: Stretch receptors located in the Carotid Sinus (glossopharyngeal nerve) and Aortic Arch (vagus nerve) sense changes in BP. A rise in BP stretches these receptors, increasing firing to the tractus solitarius in the medulla, which inhibits the sympathetic system and excites the vagus nerve, lowering heart rate and dilating blood vessels to bring BP down.\n2. Intermediate-Term Regulation (minutes to hours): Capillary fluid shift and vasoconstrictor systems (Adrenaline, ADH).\n3. Long-Term Regulation (days to weeks): Renal regulation of ECF volume. The kidneys control ECF volume via pressure natriuresis, and the endocrine Renin-Angiotensin-Aldosterone System (RAAS). When BP drops, renin is released, converting angiotensinogen to Angiotensin I, which is converted to Angiotensin II by ACE in the lungs. Angiotensin II is a potent vasoconstrictor and triggers Aldosterone release, causing renal sodium and water retention to increase blood volume and restore BP.",
    physiologicalMechanism: [
      { step: 1, title: "Pressure Drop", detail: "A sudden drop in blood pressure (e.g., standing up quickly, hemorrhage) reduces stretch on carotid sinus and aortic arch baroreceptors." },
      { step: 2, title: "Decreased Afferent Firing", detail: "The baroreceptors decrease their baseline nerve firing rate to the Nucleus Tractus Solitarius (NTS) in the medulla." },
      { step: 3, title: "Medullary Center Integration", detail: "The NTS senses the drop in signal, leading to the excitation of the Vasomotor Center (VMC) and inhibition of the Cardioinhibitory Center (CIC)." },
      { step: 4, title: "Sympathetic Surge", detail: "VMC fires rapid sympathetic impulses down the spinal cord to the heart and blood vessels via cardiac accelerator and vasomotor nerves." },
      { step: 5, title: "Cardiovascular Response", detail: "Sympathetic stimulation increases heart rate and contractility (beta-1 receptors) and causes vasoconstriction of peripheral arterioles (alpha-1 receptors)." },
      { step: 6, title: "Blood Pressure Normalization", detail: "Elevated heart rate increases Cardiac Output, and vasoconstriction increases TPR, rapidly restoring blood pressure back to normal." }
    ],
    flowchart: {
      title: "The Renin-Angiotensin-Aldosterone System (RAAS)",
      steps: [
        { label: "Hypotension", desc: "Decreased renal perfusion pressure or low Na+ delivery detected by JGA." },
        { label: "Renin Secretion", desc: "JG cells in the kidney secrete the proteolytic enzyme Renin into blood." },
        { label: "Angiotensin I", desc: "Renin cleaves circulating Angiotensinogen from the liver to Angiotensin I." },
        { label: "Angiotensin II", desc: "ACE in lung capillaries converts Angiotensin I into the highly potent Angiotensin II." },
        { label: "Endocrine Response", desc: "Angiotensin II causes direct vasoconstriction & stimulates Aldosterone from adrenal cortex." },
        { label: "BP Recovery", desc: "Aldosterone causes renal Na+ and water retention, raising ECF volume and BP." }
      ]
    },
    tables: [
      {
        title: "Factors Determining Arterial Blood Pressure",
        headers: ["Determinant", "Physiological Variable", "Primary Effect on BP", "Clinical Example"],
        rows: [
          ["1. Cardiac Output", "Heart rate × Stroke volume.", "Increases Systolic BP.", "Exercise increases CO, raising systolic BP."],
          ["2. Peripheral Resistance", "Diameter and elasticity of arterioles.", "Increases Diastolic BP.", "Atherosclerosis and vasoconstriction raise TPR."],
          ["3. Blood Volume", "Total volume of circulating ECF.", "Increases both pressures.", "Hemorrhage drops volume, causing severe hypotension."],
          ["4. Elasticity of Arteries", "Compliance of large elastic arteries.", "Buffers pressure swings.", "Loss of elasticity in old age causes isolated systolic hypertension."]
        ]
      }
    ],
    clinicalCorrelation: "Hypertension (high blood pressure, >140/90 mmHg) is a major silent killer. It forces the left ventricle to work harder, leading to left ventricular hypertrophy. In homoeopathy, remedies like Glonoinum (throbbing, bursting headache, high BP due to sun exposure), Baryta Carbonica (senile hypertension with vascular changes), and Rauwolfia Serpentina (mother tincture used to physiologically calm hypertension and lower blood pressure) are frequently prescribed on clinical indications.",
    appliedPhysiology: "Postural (Orthostatic) Hypotension occurs when a person stands up quickly from a lying position, causing blood to pool in the lower limbs due to gravity. This decreases venous return and blood pressure. The baroreceptor reflex normally activates within 2 seconds to correct this. If the reflex is sluggish (common in diabetics or elderly), the patient feels dizzy or faints.",
    importantDisorders: [
      { name: "Essential Hypertension", mechanism: "Chronic idiopathic elevation of BP associated with increased sympathetic tone, renal sodium retention, and vascular stiffness.", symptoms: "Occipital headache, tinnitus, dizziness, visual disturbances, or asymptomatic." },
      { name: "Anaphylactic Shock", mechanism: "Massive systemic histamine release causes profound vasodilation, collapsing TPR and blood pressure.", symptoms: "Severe hypotension, tachycardia, urticaria, wheezing, and laryngeal edema." }
    ],
    vivaQuestions: [
      { q: "What is Mean Arterial Pressure (MAP), and how is it calculated?", a: "MAP is the average pressure driving blood through tissue beds. MAP = Diastolic BP + 1/3 (Systolic BP - Diastolic BP). For 120/80, it is 80 + 13.3 = 93.3 mmHg." },
      { q: "Where are the baroreceptors located, and which nerves carry their signals?", a: "They are located in the Carotid Sinus (carried by Hering's nerve, branch of Cranial Nerve IX) and the Aortic Arch (carried by Cranial Nerve X)." },
      { q: "Why is diastolic pressure a better indicator of cardiac workload?", a: "Because diastolic pressure is the baseline resistance the heart must overcome (afterload) to open the semilunar valves and begin ejection." }
    ],
    examQuestions: {
      longQuestions: [
        "What is Arterial Blood Pressure? State its normal values and determinants. Describe in detail the short-term baroreceptor reflex mechanism of blood pressure regulation.",
        "Discuss the long-term regulation of blood pressure by the kidneys. Describe in detail the Renin-Angiotensin-Aldosterone System (RAAS)."
      ],
      shortNotes: [
        "Determinants of Blood Pressure",
        "Postural Hypotension physiology",
        "Mean Arterial Pressure (MAP)",
        "Chemoreceptor Reflex role in BP regulation"
      ],
      oneLiners: [
        "State the formula relating BP, CO, and TPR.",
        "What instrument is used to measure blood pressure?",
        "Name the enzyme that converts Angiotensin I to Angiotensin II."
      ]
    },
    highYieldPoints: [
      "Baroreceptors are 'buffer nerves' because they buffer systemic BP, preventing wide pressure swings.",
      "Below 60 mmHg MAP, baroreceptors lose their firing ability, and the CNS Ischemic Response (the strongest vasoconstrictor trigger) is activated.",
      "Aldosterone acts on the principal cells of the renal collecting duct to reabsorb Sodium and secrete Potassium."
    ],
    mnemonics: [
      { phrase: "BP = C-O × T-P-R", meaning: "Blood Pressure = Cardiac Output × Total Peripheral Resistance.", concept: "Basic hemodynamic equation of blood pressure" }
    ],
    frequentlyConfused: [
      { conceptA: "Baroreceptors", conceptB: "Chemoreceptors", explanation: "Baroreceptors sense mechanical stretch (blood pressure changes). Chemoreceptors (carotid and aortic bodies) sense chemical changes (low O2, high CO2, and high H+ ions/acidosis) to primarily regulate respiration and secondarily blood pressure." }
    ],
    commonMistakes: [
      "Calculating Mean Arterial Pressure as the simple average of systolic and diastolic pressures (e.g., [120+80]/2 = 100). This is incorrect because the heart spends more time in diastole than in systole during a standard cardiac cycle. The correct weighted formula must be used."
    ],
    oneMinuteRevision: [
      "BP = CO × TPR. Normal is 120/80 mmHg. Short-term regulation: Baroreceptors (carotid sinus & aortic arch) sense stretch. High BP -> increased firing -> medullary inhibition of sympathetic system -> vasodilation and lower HR. Long-term regulation: Kidneys. Drop in BP -> Renin release -> RAAS pathway -> Angiotensin II (vasoconstrictor) and Aldosterone (salt/water saver) restore blood volume and pressure."
    ],
    faqs: [
      { q: "What are the Korotkoff sounds heard during BP measurement?", a: "They are the turbulent blood flow sounds heard through a stethoscope over the brachial artery as the pressure of the sphygmomanometer cuff is gradually released, marking systolic and diastolic pressures." }
    ],
    relatedTopics: [
      { title: "Phases of the Cardiac Cycle", slug: "cardiac_cycle" },
      { title: "Renal GFR and tubular transport", slug: "gfr_nephron" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 101.",
      "Guyton & Hall (2020). Textbook of Medical Physiology. 14th Edition. Chapter 18."
    ],
    visualPlans: [
      { type: "Flowchart", title: "Baroreceptor Reflex Feedback Loop", description: "A closed-loop system block diagram showing a disturbance (high BP), receptor activation, medullary center integration, autonomic efferent outputs, and vascular effectors." },
      { type: "Infographic", title: "Measuring BP via Auscultation", description: "Sequential drawings showing the artery completely compressed (silent), partially open (Korotkoff sounds start = systolic), and fully uncompressed (silent again = diastolic)." }
    ]
  },
  gas_transport: {
    id: "gas_transport",
    title: "Oxygen and Carbon Dioxide Transport",
    system: "Respiratory Physiology",
    studyTime: "25 mins",
    difficulty: "Hard",
    importance: "⭐ Concept Based",
    nchCompetency: "PY4.4 - Describe oxygen and carbon dioxide transport in blood and its regulation.",
    learningObjectives: [
      "Describe the transport of Oxygen in blood as dissolved gas and oxyhemoglobin.",
      "Analyze the Oxygen-Hemoglobin Dissociation Curve (ODC) and factors that shift it.",
      "Explain the transport of Carbon Dioxide as bicarbonate ions, carbamino compounds, and dissolved gas.",
      "Detail the physiological significance of the chloride shift (Hamburger phenomenon) and the Bohr/Haldane effects."
    ],
    quickFacts: {
      definition: "The physiological processes of carrying oxygen from the lungs to tissue capillaries, and carbon dioxide from tissues back to the lungs via the circulating blood.",
      normalRange: "Arterial O2 saturation: 95-100%; Venous CO2 content: ~52 mL/100mL of blood.",
      primaryRole: "Ensures continuous cellular respiration and aerobic ATP synthesis, while preventing toxic acid-base accumulation.",
      clinicalImportance: "Impairment causes Hypoxia (tissue suffocation) and Respiratory Acidosis.",
      oneLineRevision: "Oxygen is transported mostly as oxyhemoglobin (ODC curve shifts right with acidity); CO2 is carried mostly as bicarbonate via the chloride shift."
    },
    introduction: "Respiration is divided into external respiration (gas exchange in lungs) and internal respiration (gas exchange in tissues). The blood serves as the vital transit system linking these two boundaries. For BHMS students, mastering the gaseous exchange curves and chemical reactions that take place inside circulating red blood cells is a vital cardiovascular and respiratory physiology topic.",
    definition: "Gas transport refers to the physical and chemical transport of oxygen from pulmonary alveoli to systemic tissue capillaries, and carbon dioxide from tissues back to the alveoli via the blood circulation.",
    basicConcepts: "Oxygen does not dissolve well in water; only 3% is transported in dissolved form in plasma. The remaining 97% is transported in chemical combination with hemoglobin as Oxyhemoglobin. Carbon dioxide is much more soluble, transported in three forms: as Bicarbonate ions (70%), as Carbamino-hemoglobin (23%), and in dissolved state in plasma (7%).",
    detailedExplanation: "Oxygen Transport and the ODC:\nEach gram of hemoglobin can bind 1.34 mL of oxygen. The relationship between the partial pressure of oxygen (PO2) and the percentage saturation of hemoglobin (SO2) is represented by a S-shaped curve called the Oxygen-Hemoglobin Dissociation Curve (ODC). The sigmoid shape is due to 'cooperative binding' (binding of the first O2 molecule facilitates binding of the next). A shift to the right indicates decreased Hb-O2 affinity (promotes oxygen unloading in tissues). A shift to the left indicates increased affinity (promotes oxygen loading in lungs).\n\nCarbon Dioxide Transport and the Chloride Shift:\nTissues produce CO2, which diffuses into red blood cells. Inside RBCs, CO2 combines with water to form Carbonic Acid (H2CO3), catalyzed by Carbonic Anhydrase. H2CO3 rapidly dissociates into Hydrogen (H+) and Bicarbonate (HCO3-) ions. As HCO3- accumulates inside the RBC, it is exported into plasma in exchange for Chloride (Cl-) ions via an anion exchanger protein (Band 3). This is called the Chloride Shift or Hamburger Phenomenon. In the lungs, the reverse reactions take place to release CO2.",
    physiologicalMechanism: [
      { step: 1, title: "Tissue CO2 Diffusion", detail: "Metabolically active tissues produce CO2, raising local PCO2. CO2 diffuses across capillary endothelium into red blood cells." },
      { step: 2, title: "Carbonic Acid Formation", detail: "Inside the RBC, CO2 is hydrated by water to form Carbonic Acid (H2CO3), catalyzed by the zinc-containing enzyme Carbonic Anhydrase." },
      { step: 3, title: "Dissociation and Buffering", detail: "H2CO3 dissociates into H+ and HCO3- ions. The H+ ions are buffered by deoxyhemoglobin, facilitating oxygen release (Bohr Effect)." },
      { step: 4, title: "The Chloride Shift", detail: "As intracellular HCO3- concentration rises, it is transported out of the RBC into plasma via the bicarbonate-chloride carrier. Chloride ions move into the RBC to maintain electrical neutrality." },
      { step: 5, title: "Osmotic Swelling of RBCs", detail: "The influx of Chloride ions increases intracellular osmotic pressure, drawing water into the RBC. Consequently, venous red blood cells are slightly larger than arterial red blood cells." },
      { step: 6, title: "Reversal in Lungs", detail: "In lung capillaries, high PO2 drives oxygen onto Hb, releasing H+. This drives the chemical pathway backward: HCO3- enters the RBC, Cl- exits, CO2 is formed and exhaled (Haldane Effect)." }
    ],
    flowchart: {
      title: "The Chloride Shift (Hamburger Phenomenon) in Tissues",
      steps: [
        { label: "CO2 Entry", desc: "Tissue CO2 diffuses into the circulating red blood cell." },
        { label: "Hydration", desc: "CO2 + H2O → H2CO3 (via Carbonic Anhydrase)." },
        { label: "Dissociation", desc: "H2CO3 splits into H+ (buffered by Hb) and HCO3- ions." },
        { label: "Chloride Entry", desc: "HCO3- exits RBC into plasma; Chloride (Cl-) enters RBC." },
        { label: "Water Influx", desc: "Cl- draws water, causing venous RBCs to swell slightly." }
      ]
    },
    tables: [
      {
        title: "Bohr Effect vs. Haldane Effect",
        headers: ["Parameter", "Bohr Effect", "Haldane Effect"],
        rows: [
          ["Definition", "Effect of carbon dioxide and hydrogen ions (pH) on the affinity of hemoglobin for oxygen.", "Effect of oxygen on the affinity of hemoglobin for carbon dioxide and hydrogen ions."],
          ["Primary Site", "Systemic tissue capillaries (active metabolizing tissue).", "Pulmonary alveoli capillaries (lungs)."],
          ["Physiological Goal", "Facilitates oxygen release (unloading) to oxygen-starved tissues.", "Facilitates carbon dioxide release (exhalation) into the alveoli."],
          ["Trigger", "High PCO2 and acidic pH (high H+) shift the Hb curve to the right.", "High PO2 in lungs forces CO2 off the carbamino-hemoglobin complex."]
        ]
      }
    ],
    clinicalCorrelation: "Carbon Monoxide (CO) Poisoning is a major clinical emergency. CO has an affinity for hemoglobin that is 200 times greater than oxygen, forming Carboxyhemoglobin. This blocks oxygen binding sites and shifts the ODC to the left, trapping the remaining oxygen on Hb and starving tissues of respiration. Homoeopathic management is supportive alongside 100% hyperbaric oxygen therapy. Carbo Vegetabilis is famously known as the 'corpse reviver' in homoeopathy for states of collapse, air hunger, and cold extremities mimicking oxygen starvation.",
    appliedPhysiology: "The P50 value is a vital index on the ODC, representing the partial pressure of oxygen at which hemoglobin is 50% saturated. The normal adult P50 is 26.8 mmHg. An increased P50 indicates a right shift (decreased affinity, easier oxygen release), while a decreased P50 indicates a left shift (increased affinity).",
    importantDisorders: [
      { name: "Hypoxia", mechanism: "Deficiency of oxygen delivery at the tissue level, classified into Hypoxic (low PO2), Anemic (low functional Hb), Stagnant (low cardiac flow), and Histotoxic (poisoned tissue respiration).", symptoms: "Cyanosis (bluish skin), confusion, tachycardia, tachypnea, anxiety." },
      { name: "Respiratory Acidosis", mechanism: "Hypoventilation leads to retention of CO2, raising PCO2 and carbonic acid, dropping blood pH below 7.35.", symptoms: "Headache, confusion, somnolence (CO2 narcosis), warm flushed skin." }
    ],
    vivaQuestions: [
      { q: "What is the sigmoid shape of the ODC due to?", a: "The cooperative binding of oxygen to the four subunits of hemoglobin." },
      { q: "Name the factors that shift the Oxygen-Hemoglobin Dissociation Curve to the right.", a: "Increased PCO2, decreased pH (acidosis), increased temperature, and increased 2,3-BPG." },
      { q: "What is the Hamburger Phenomenon?", a: "The chloride shift, where bicarbonate ions exit the RBC in systemic capillaries and chloride ions enter to maintain electrochemical equilibrium." }
    ],
    examQuestions: {
      longQuestions: [
        "Explain in detail the transport of oxygen in blood. Describe the Oxygen-Hemoglobin Dissociation Curve (ODC) and discuss the factors shifting the curve.",
        "Describe various mechanisms of Carbon Dioxide transport in blood. Explain the Chloride Shift (Hamburger Phenomenon) with a neat diagram."
      ],
      shortNotes: [
        "Bohr Effect vs. Haldane Effect",
        "Chloride Shift (Hamburger Phenomenon)",
        "Carbon Monoxide Poisoning physiology",
        "P50 value and its significance"
      ],
      oneLiners: [
        "State the major form in which CO2 is transported in blood.",
        "What is the normal partial pressure of oxygen (PO2) in arterial blood?",
        "Name the enzyme that hydrates carbon dioxide inside red blood cells."
      ]
    },
    highYieldPoints: [
      "Fetal Hemoglobin (HbF) has a higher affinity for oxygen than adult HbA, shifting its ODC to the left, which allows the fetus to pull oxygen from maternal blood.",
      "Venous blood hematocrit is slightly higher (by ~3%) than arterial hematocrit because venous RBCs swell due to the chloride shift.",
      "Anemic hypoxia does not show cyanosis because cyanosis requires at least 5 g/dL of reduced (deoxygenated) hemoglobin, which is impossible in severe anemia due to low total Hb."
    ],
    mnemonics: [
      { phrase: "HALDANE is in the LUNGS, BOHR is in the BONES", meaning: "Haldane effect occurs in pulmonary capillaries (Lungs - oxygen drives CO2 release); Bohr effect occurs in systemic tissue capillaries (Bones/muscle/tissue - acidity drives oxygen release).", concept: "Anatomical sites of Haldane and Bohr respiratory effects" }
    ],
    frequentlyConfused: [
      { conceptA: "Bohr Effect", conceptB: "Haldane Effect", explanation: "Bohr effect is about how CO2/acid changes Hb's oxygen unloading (Tissues). Haldane effect is about how O2 changes Hb's CO2 carriage (Lungs)." }
    ],
    commonMistakes: [
      "Assuming hypercapnia (high CO2) always shifts the oxygen curve to the left. Remember, high CO2 increases acidity (lowers pH), which decreases Hb-O2 affinity, shifting the curve to the RIGHT to release oxygen."
    ],
    oneMinuteRevision: [
      "O2 transport: 97% as oxyhemoglobin, 3% dissolved. ODC is S-shaped; right shift (high CO2, high Temp, low pH, high 2,3-BPG) releases O2. CO2 transport: 70% as bicarbonate, 23% as carbamino-Hb, 7% dissolved. Chloride shift: HCO3- out of RBC, Cl- in (tissues). Reverse in lungs. Bohr effect = tissues; Haldane effect = lungs."
    ],
    faqs: [
      { q: "Why is carbonic anhydrase absent in plasma?", a: "Because if it were in plasma, H2CO3 would be formed in the extracellular fluid, dropping blood pH rapidly. Keeping it inside the RBC compartmentalizes and buffers the acid safely." }
    ],
    relatedTopics: [
      { title: "Hemoglobin structure and types", slug: "hemoglobin_iron" },
      { title: "Physiological changes at high altitude", slug: "altitude-physiology" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 124 & 125.",
      "West, J. B. (2015). Respiratory Physiology: The Essentials. 10th Edition. Chapter 6."
    ],
    visualPlans: [
      { type: "Flowchart", title: "Chemical Reactions of Chloride Shift", description: "RBC chemical diagram showing CO2 + H2O reacting via Carbonic Anhydrase, dissociating, and Band 3 exchanging HCO3- for Cl-." },
      { type: "Infographic", title: "Sigmoid Oxygen Dissociation Curve", description: "Plot of Hb saturation vs PO2 showing the steep part (tissue range) and flat plateau (lung range) with arrows indicating left and right shift triggers." }
    ]
  },
  neuromuscular_junction: {
    id: "neuromuscular_junction",
    title: "Neuromuscular Junction and Transmission",
    system: "Nerve Muscle Physiology",
    studyTime: "20 mins",
    difficulty: "Medium",
    importance: "⭐ Viva Favourite",
    nchCompetency: "PY3.4 - Describe synaptic transmission, neuromuscular junction, transmission of impulses, and Myasthenia Gravis.",
    learningObjectives: [
      "Describe the structural components of the neuromuscular junction (NMJ).",
      "Explain the step-by-step sequence of chemical synaptic transmission across the NMJ.",
      "Understand the origin of the End-Plate Potential (EPP) and how it fires action potentials.",
      "Discuss the pathogenesis, clinical features, and management of Myasthenia Gravis."
    ],
    quickFacts: {
      definition: "The specialized chemical synapse formed between the terminal end of a motor neuron and the highly folded motor end-plate of a skeletal muscle fiber.",
      normalRange: "Synaptic delay: ~0.5 milliseconds; safety factor: highly redundant (guarantees contraction).",
      primaryRole: "Converts the electrical nerve impulse into a mechanical muscle contraction via Acetylcholine neurotransmission.",
      clinicalImportance: "Site of block by muscle relaxants, snake neurotoxins, and autoimmune destruction (Myasthenia Gravis).",
      oneLineRevision: "NMJ transmission is mediated by acetylcholine, creating an end-plate potential that triggers muscle contraction."
    },
    introduction: "Every movement of our body requires communication between the nervous system and skeletal muscles. This communication occurs at a highly specialized synaptic interface called the Neuromuscular Junction (NMJ). Understanding how electrical action potentials bridge this chemical gap, and how this is disrupted in autoimmune disorders, is a classic nerve-muscle physiology topic.",
    definition: "The neuromuscular junction is a chemical neuromuscular synapse consisting of the motor nerve terminal, the synaptic cleft, and the post-junctional folded membrane of a skeletal muscle fiber.",
    basicConcepts: "The NMJ consists of three parts: 1) Presynaptic membrane (axonal terminal containing synaptic vesicles packed with Acetylcholine / ACh); 2) Synaptic Cleft (the 20-50 nm fluid-filled space containing Acetylcholinesterase); 3) Postsynaptic membrane (the motor end-plate, deeply folded into subneural clefts lined with nicotinic Acetylcholine receptors / nAChR).",
    detailedExplanation: "Step-by-step Transmission:\nAn action potential reaches the motor nerve terminal, depolarizing it. This opens Voltage-Gated Calcium Channels (VGCC), causing Calcium influx. Calcium triggers synaptic vesicles to fuse with the presynaptic membrane and release Acetylcholine via exocytosis. \nACh diffuses across the synaptic cleft and binds to ligand-gated nicotinic receptors (nAChR) on the motor end-plate. This opens ion channels, allowing a massive influx of Sodium (Na+) and a smaller efflux of Potassium (K+). This localized depolarization of the motor end-plate is called the End-Plate Potential (EPP). Unlike an action potential, the EPP is non-propagated, graded, and does not follow the all-or-none law. When the EPP reaches a threshold (~-50 mV), it opens adjacent voltage-gated sodium channels on the sarcolemma, firing an action potential that propagates along the muscle fiber, leading to muscle contraction. \nACh is rapidly degraded in the cleft within milliseconds by the enzyme Acetylcholinesterase (AChE) into choline and acetate, restoring the resting state.",
    physiologicalMechanism: [
      { step: 1, title: "Action Potential Arrival", detail: "The electrical motor nerve action potential propagates down the axon, depolarizing the presynaptic terminal." },
      { step: 2, title: "Calcium Influx", detail: "Depolarization opens P/Q-type Voltage-Gated Calcium Channels, allowing extracellular Calcium ions to rush into the nerve terminal down their chemical gradient." },
      { step: 3, title: "Vesicle Exocytosis", detail: "Intracellular Calcium binds to synaptotagmin, prompting SNARE proteins to pull synaptic vesicles to the active zone, releasing Acetylcholine (ACh) into the synaptic cleft." },
      { step: 4, title: "Receptor Binding", detail: "ACh diffuses across the cleft and binds to nicotinic receptors (nAChR) on the postsynaptic motor end-plate folds." },
      { step: 5, title: "End-Plate Potential (EPP)", detail: "Binding opens ligand-gated channel pores. Sodium (Na+) rushes into the muscle cell, creating a localized depolarizing End-Plate Potential." },
      { step: 6, title: "Contraction and ACh Clearance", detail: "EPP triggers a muscle action potential. Meanwhile, Acetylcholinesterase rapidly hydrolyzes ACh, closing the channels to prevent continuous contraction." }
    ],
    flowchart: {
      title: "Sequence of Events in NMJ Transmission",
      steps: [
        { label: "Nerve AP", desc: "Depolarizes axonal terminal membrane." },
        { label: "Ca2+ Influx", desc: "Calcium enters via voltage-gated channels." },
        { label: "ACh Release", desc: "Vesicles release Acetylcholine into cleft." },
        { label: "nAChR Activation", desc: "ACh binds to postsynaptic nicotinic receptors." },
        { label: "EPP Generation", desc: "Na+ influx depolarizes the motor end-plate." },
        { label: "Muscle AP", desc: "Propagates down T-tubules to trigger contraction." }
      ]
    },
    tables: [
      {
        title: "Action Potential vs. End-Plate Potential (EPP)",
        headers: ["Characteristic", "Action Potential", "End-Plate Potential (EPP)"],
        rows: [
          ["Nature", "All-or-None electrical response.", "Graded, localized chemical depolarization."],
          ["Propagation", "Propagated along the entire membrane.", "Non-propagated; decays over distance (decremental)."],
          ["All-or-None Law", "Obeys strictly.", "Does not obey (depends on ACh volume)."],
          ["Summation", "Cannot be sumated (refractory period).", "Can be sumated temporally or spatially."],
          ["Channel Type", "Driven by Voltage-Gated Sodium Channels.", "Driven by Ligand-Gated nAChR Channels."]
        ]
      }
    ],
    clinicalCorrelation: "Myasthenia Gravis is an autoimmune disorder where autoantibodies destroy postsynaptic nicotinic receptors (nAChR) at the NMJ, dropping the safety factor. The EPP fails to reach threshold, causing muscle weakness. It is treated with Neostigmine (Acetylcholinesterase inhibitor), which prevents ACh breakdown, keeping it in the cleft longer to interact with the remaining receptors. In homoeopathy, Gelsemium Sempervirens (motor paralysis, deep muscular weakness, heavy droopy eyelids) and Causticum (palsies of single nerves, ptosis, and muscle weakness) are key therapeutic remedies mimicking this pathophysiology.",
    appliedPhysiology: "Various pharmacological agents target the NMJ:\n- Curare (D-tubocurarine): Competes with ACh for nicotinic receptors, blocking neuromuscular transmission and causing flaccid paralysis (used as a muscle relaxant in surgery).\n- Botulinum Toxin: Blocks the release of ACh from the presynaptic terminal, causing fatal flaccid paralysis (botulism; cosmetic Botox).\n- Organophosphates (OP compounds/insecticides): Irreversibly inhibit Acetylcholinesterase, causing toxic accumulation of ACh and continuous depolarizing muscle block.",
    importantDisorders: [
      { name: "Myasthenia Gravis", mechanism: "Autoantibodies block and destroy nicotinic ACh receptors, reducing neuromuscular transmission safety.", symptoms: "Ptosis (drooping eyelids), diplopia (double vision), muscle fatigue worsening with use, dyspnea." },
      { name: "Lambert-Eaton Myasthenic Syndrome", mechanism: "Autoantibodies destroy presynaptic voltage-gated Calcium channels, blocking Calcium influx and ACh release.", symptoms: "Muscular weakness that temporarily IMPROVES with repeated exercise (unlike Myasthenia)." }
    ],
    vivaQuestions: [
      { q: "What is the primary neurotransmitter at the skeletal NMJ?", a: "Acetylcholine (ACh)." },
      { q: "What is the difference between an EPP and a MEPP?", a: "An EPP is a large depolarization caused by nerve impulse-driven release of many ACh vesicles. A Miniature End-Plate Potential (MEPP) is a tiny (~0.5 mV) spontaneous depolarization caused by random release of a single vesicle (quantum) of ACh." },
      { q: "What test is used to diagnose Myasthenia Gravis clinically?", a: "The Tensilon (Edrophonium) test. Edrophonium is a short-acting AChE inhibitor; intravenous injection causes a rapid, transient improvement in muscle strength." }
    ],
    examQuestions: {
      longQuestions: [
        "Describe the structure of the neuromuscular junction (NMJ). Discuss in detail the sequence of events involved in transmission of nerve impulses across the NMJ.",
        "What is Myasthenia Gravis? Explain its physiological basis, clinical features, diagnostic tests, and pharmacological management."
      ],
      shortNotes: [
        "End-Plate Potential (EPP)",
        "Miniature End-Plate Potential (MEPP)",
        "SNARE proteins and vesicle release",
        "Neuromuscular blocking agents"
      ],
      oneLiners: [
        "Name the enzyme that degrades Acetylcholine.",
        "What toxin blocks the release of Acetylcholine from presynaptic terminals?",
        "What type of receptor is present at the motor end-plate?"
      ]
    },
    highYieldPoints: [
      "The safety factor at the NMJ is normally ~3 to 4, meaning the EPP generated is 3 to 4 times larger than the threshold needed to trigger a muscle action potential, guaranteeing contraction.",
      "Calcium ions are essential for exocytosis of neurotransmitters; magnesium acts as a calcium antagonist and reduces ACh release.",
      "Each synaptic vesicle contains approximately 10,000 molecules of Acetylcholine, representing 'one quantum'."
    ],
    mnemonics: [
      { phrase: "C-A-N-D-Y", meaning: "Steps at Synapse: Ca2+ entry, Release ACh, Nicotinic binding, Depolarization (EPP), Yield (Action potential & contraction).", concept: "Sequence of chemical transmission at NMJ" }
    ],
    frequentlyConfused: [
      { conceptA: "Myasthenia Gravis", conceptB: "LEMS (Lambert-Eaton)", explanation: "Myasthenia Gravis is postsynaptic (nAChR antibodies; worsens with muscle use). LEMS is presynaptic (Calcium channel antibodies; improves with muscle use)." }
    ],
    commonMistakes: [
      "Assuming the End-Plate Potential (EPP) is an action potential. EPP is a graded localized potential. It does not travel along the fiber; it only triggers the voltage-gated channels on the surrounding sarcolemma to fire a real action potential."
    ],
    oneMinuteRevision: [
      "NMJ = motor nerve terminal + cleft + motor end-plate. Nerve AP -> Calcium influx -> ACh exocytosis -> ACh binds to ligand nicotinic receptors (nAChR) -> Sodium rushes in -> graded End-Plate Potential (EPP) -> triggers voltage-gated Na+ channels -> muscle Action Potential -> contraction. ACh degraded by Acetylcholinesterase. Myasthenia Gravis = antibodies destroy postsynaptic receptors."
    ],
    faqs: [
      { q: "How do nerve gas agents work?", a: "Nerve gases (like Sarin) are powerful organophosphates that inhibit Acetylcholinesterase, causing continuous ACh stimulation of muscles, leading to spastic paralysis and asphyxiation due to diaphragm spasms." }
    ],
    relatedTopics: [
      { title: "Mechanism of skeletal muscle contraction", slug: "muscle-contraction" },
      { title: "Synaptic transmission in the Central Nervous System", slug: "synaptic-transmission" }
    ],
    references: [
      "Sembulingam, K. & Sembulingam, P. (2021). Essentials of Medical Physiology. 8th Edition. Chapter 31 & 34.",
      "Kandel, E. R. (2012). Principles of Neural Science. 5th Edition. Chapter 9."
    ],
    visualPlans: [
      { type: "Labeled Diagram", title: "Structure of Neuromuscular Junction", description: "Detailed presynaptic nerve terminal showing mitochondria and vesicles, synaptic cleft with AChE dots, and post-synaptic deep junctional folds with nAChR receptors." },
      { type: "Flowchart", title: "Excitation-Contraction Coupling", description: "Skeletal muscle pathway starting from NMJ EPP, leading to action potential down T-tubules, calcium release from sarcoplasmic reticulum, and actin-myosin cross-bridge cycling." }
    ]
  }
};


export function getPhysiologyModule(id: string): PhysiologyModule {
  if (!id) {
    return physiologyModules['cell_Homoeostasis'];
  }
  if (physiologyModules[id]) {
    return physiologyModules[id];
  }
  const underscoreKey = id.replace(/-/g, '_');
  if (physiologyModules[underscoreKey]) {
    return physiologyModules[underscoreKey];
  }
  const lastPart = id.split('/').pop() || id;
  const lastPartUnderscore = lastPart.replace(/-/g, '_');
  if (physiologyModules[lastPartUnderscore]) {
    return physiologyModules[lastPartUnderscore];
  }
  
  // Find by partial match
  const found = Object.values(physiologyModules).find(
    m => m.id.toLowerCase() === lastPartUnderscore.toLowerCase() ||
         m.title.toLowerCase().includes(lastPart.replace(/[-_]/g, ' ').toLowerCase())
  );
  if (found) {
    return found;
  }

  // Fallback module generation
  const formattedTitle = lastPart
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: id,
    title: formattedTitle || "Physiology & Biochemistry Module",
    system: "General Physiology",
    studyTime: "25 mins",
    difficulty: "Medium",
    importance: "⭐ Concept Based",
    nchCompetency: `PY - Comprehensive study notes on ${formattedTitle}`,
    learningObjectives: [
      `Understand the core physiological mechanisms of ${formattedTitle}.`,
      "Analyze Homoeostatic control mechanisms and organ feedback loops.",
      "Identify key clinical correlations and diagnostic lab parameters.",
      "Master high-yield viva questions for university practical examinations."
    ],
    quickFacts: {
      definition: `Detailed systemic physiology analysis and biological mechanisms governing ${formattedTitle}.`,
      normalRange: "Homoeostatic baseline limits maintained by neuro-endocrine feedback.",
      primaryRole: "Essential organ system functioning and cellular Homoeostasis.",
      clinicalImportance: "Impairments lead to systemic pathological manifestations.",
      oneLineRevision: `${formattedTitle}: Essential organ function and cellular regulatory mechanisms.`
    },
    introduction: `Welcome to the comprehensive study module on ${formattedTitle}. In BHMS 1st Year Physiology, mastering these physiological pathways is crucial for clinical diagnosis and organ pathology comprehension.`,
    definition: `${formattedTitle} is a vital physiological mechanism regulating internal stability and metabolic activity.`,
    basicConcepts: `The function is governed by cellular receptors, enzyme cascades, and neural-hormonal feedback loops that ensure constant Homoeostatic equilibrium.`,
    detailedExplanation: `Detailed examination reveals structured biological steps. The physiological mechanisms involve primary messenger signals, ion channel gating, and metabolic cellular responses.`,
    physiologicalMechanism: [
      { step: 1, title: "Initial Stimulus & Sensor", detail: "Specialized receptors detect Homoeostatic variations in physiological parameters." },
      { step: 2, title: "Signal Transduction", detail: "Nerve impulses or endocrine hormones transmit regulatory signals to control centers." },
      { step: 3, title: "Integration & Response", detail: "Effector organs alter function to restore physiological Homoeostasis." }
    ],
    tables: [
      {
        title: `${formattedTitle} Summary Matrix`,
        headers: ["Parameter", "Normal Value", "Clinical Significance"],
        rows: [
          ["Baseline State", "Standard Physiological Range", "Homoeostatic Control"],
          ["Altered State", "Deviated Parameter", "Pathological Indication"]
        ]
      }
    ],
    appliedPhysiology: `Clinical application of ${formattedTitle} involves analyzing functional disruptions in Homoeostatic feedback mechanisms and correlating them with patient symptoms and lab parameters.`,
    clinicalCorrelation: `Pathology in ${formattedTitle} reflects underlying organ system dysfunction.`,
    flowchart: {
      title: `${formattedTitle} Mechanism Flowchart`,
      steps: [
        { label: "Trigger", desc: "Homoeostatic deviation initiates neural or endocrine cascade." },
        { label: "Response", desc: "Effector organs act to restore baseline physiological balance." }
      ]
    },
    importantDisorders: [
      { name: `${formattedTitle} Dysfunction`, mechanism: "Impaired regulatory loop", symptoms: "Fatigue, altered metabolic markers" }
    ],
    vivaQuestions: [
      { q: `What is the primary function of ${formattedTitle}?`, a: `It maintains systemic Homoeostasis and cellular metabolic balance.` },
      { q: `Which organ system regulates this process?`, a: `Controlled primarily through integrated neuro-endocrine feedback mechanisms.` }
    ],
    examQuestions: {
      longQuestions: [`Describe the physiological mechanisms and clinical importance of ${formattedTitle}.`],
      shortNotes: [`Short note on Homoeostatic regulation of ${formattedTitle}.`],
      oneLiners: [`Normal physiological baseline for ${formattedTitle}.`]
    },
    highYieldPoints: [`Key takeaway: ${formattedTitle} is essential for Homoeostatic equilibrium.`],
    mnemonics: [],
    frequentlyConfused: [],
    commonMistakes: [`Confusing primary active transport with secondary transport mechanisms.`],
    oneMinuteRevision: [`${formattedTitle}: Core Homoeostatic mechanism and clinical correlation.`],
    faqs: [
      { q: `Why is ${formattedTitle} important in BHMS 1st Year?`, a: "It forms the foundation for understanding human pathology and Homoeopathic remedy selection." }
    ],
    relatedTopics: [
      { title: "Cell Homoeostasis", slug: "cell_Homoeostasis" },
      { title: "General Physiology Overview", slug: "Homoeostasis_and_cell_transport" }
    ],
    references: [
      "Guyton and Hall Textbook of Medical Physiology (14th Edition)",
      "Essential of Medical Physiology - K Sembulingam",
      "National Commission for Homoeopathy (NCH) BHMS Syllabus"
    ],
    visualPlans: [
      { type: "Flowchart", title: `${formattedTitle} Mechanism`, description: "Systemic feedback regulation loop and Homoeostatic control points." }
    ]
  };
}

export function getAllPhysiologyModules(): PhysiologyModule[] {
  return Object.values(physiologyModules);
}
