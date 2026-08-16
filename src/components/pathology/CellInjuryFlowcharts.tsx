import React, { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Activity, Layers } from 'lucide-react';

export interface FlowchartDefinition {
  id: string;
  title: string;
  category: 'Cell Injury & Mechanisms' | 'Cell Death & Necrosis' | 'Apoptosis' | 'Adaptations' | 'Calcification';
  description: string;
  steps: {
    label: string;
    description: string;
    type: 'trigger' | 'process' | 'decision' | 'danger' | 'outcome' | 'defense';
    badge?: string;
  }[];
  clinicalTakeaway: string;
}

export const masterFlowchartsList: FlowchartDefinition[] = [
  {
    id: 'fc-cellular-response-to-stress',
    title: '1. Cellular Response to Stress (The Central Paradigm)',
    category: 'Cell Injury & Mechanisms',
    description: 'Decision cascade from normal homeostasis through cellular adaptation, reversible injury, to irreversible death.',
    steps: [
      { label: 'Normal Cell Homeostasis', description: 'Dynamic equilibrium under baseline physiological conditions', type: 'process' },
      { label: 'Physiological / Pathological Stress', description: 'Altered demand or noxious environmental stimulus introduced', type: 'trigger' },
      { label: 'Can the cell adapt?', description: 'Evaluates cell type, reserve capacity, and severity of stress', type: 'decision' },
      { label: 'YES → Cellular Adaptation', description: 'Hypertrophy, Hyperplasia, Atrophy, or Metaplasia restores steady state', type: 'outcome', badge: 'Reversible' },
      { label: 'NO / Severe Stress → Cell Injury', description: 'Stress overwhelms homeostatic mechanisms', type: 'danger' },
      { label: 'Is injury reversible?', description: 'Sublethal vs lethal threshold (Point of No Return)', type: 'decision' },
      { label: 'YES → Reversible Injury', description: 'Cellular swelling (hydropic change) & steatosis → Restitution to normal', type: 'process', badge: 'Recovery' },
      { label: 'NO → Irreversible Cell Death', description: 'Mitochondrial MPTP opening & membrane rupture → Necrosis or Apoptosis', type: 'outcome', badge: 'Lethal' }
    ],
    clinicalTakeaway: 'Determines whether clinical intervention can achieve full structural recovery (reversible stage) or merely salvage remaining viable tissue.'
  },
  {
    id: 'fc-atp-depletion',
    title: '2. ATP Depletion & Ischemic Metabolic Collapse',
    category: 'Cell Injury & Mechanisms',
    description: 'The biochemical domino cascade triggered by oxygen deprivation halting oxidative phosphorylation.',
    steps: [
      { label: 'Ischemia / Hypoxia', description: 'Interruption of arterial blood supply halting oxygen delivery', type: 'trigger' },
      { label: 'Oxidative Phosphorylation Halts', description: 'Mitochondrial electron transport chain ceases synthesis of ATP', type: 'process' },
      { label: 'Severe ATP Depletion (<5-10% of normal)', description: 'Critical energy crisis across all cellular organelles', type: 'danger' },
      { label: 'Plasma Membrane Na+/K+ ATPase Fails', description: 'Loss of active transport: Na+ & H2O enter cell; K+ exits → Cellular Swelling', type: 'process', badge: 'Hydropic' },
      { label: 'Anaerobic Glycolysis Compensates', description: 'Rapid consumption of glycogen reserves → Lactic acid accumulation', type: 'process' },
      { label: 'Intracellular Acidosis (pH drops)', description: 'Acidic pH causes clumping of nuclear chromatin', type: 'process' },
      { label: 'Detachment of Ribosomes from Rough ER', description: 'Endoplasmic reticulum distends; protein synthesis declines markedly', type: 'outcome' }
    ],
    clinicalTakeaway: 'Explains why early reperfusion (PCI/Thrombolysis) restores ATP before irreversible membrane and nuclear collapse occurs.'
  },
  {
    id: 'fc-cellular-swelling',
    title: '3. Mechanism of Cellular Swelling (Hydropic Change)',
    category: 'Cell Injury & Mechanisms',
    description: 'Detailed electrolyte and fluid shift mechanics of the earliest sign of reversible cell injury.',
    steps: [
      { label: 'Mitochondrial Injury / Hypoxia', description: 'Drop in intracellular ATP synthesis', type: 'trigger' },
      { label: 'Inhibition of Ouabain-Sensitive Na+/K+ Pump', description: 'Inability to pump 3 Na+ out and 2 K+ in against gradient', type: 'process' },
      { label: 'Intracellular Sodium (Na+) Accumulation', description: 'Osmotic gradient pulls water into the cytoplasm', type: 'process' },
      { label: 'Efflux of Potassium (K+)', description: 'Loss of essential intracellular cations', type: 'process' },
      { label: 'Distension of Endoplasmic Reticulum', description: 'Microvacuolation of ER cisternae (Hydropic Degeneration)', type: 'danger', badge: 'Cloudy Swelling' },
      { label: 'Reversal upon Oxygenation', description: 'Pump reactivates, expelling water back into interstitial space', type: 'outcome', badge: 'Reversible' }
    ],
    clinicalTakeaway: 'Reversible cloudy swelling explains organ pallor, turgidity, and transient organ dysfunction in shock.'
  },
  {
    id: 'fc-calcium-mediated-injury',
    title: '4. Intracellular Calcium Overload & Enzyme Activation',
    category: 'Cell Injury & Mechanisms',
    description: 'How loss of calcium homeostasis unleashes destructive intracellular enzymes.',
    steps: [
      { label: 'Ischemia / Toxins Influx', description: 'Plasma membrane damage and ATP pump failure', type: 'trigger' },
      { label: 'Massive Cytosolic Ca2+ Influx', description: 'Calcium floods cytosol from extracellular space and ER/mitochondrial stores', type: 'danger' },
      { label: 'Activation of Phospholipases', description: 'Degrades membrane phospholipids → Severe membrane breakdown & free fatty acid release', type: 'process' },
      { label: 'Activation of Proteases', description: 'Breaks down cytoskeletal actin, tubulin, and membrane anchor proteins', type: 'process' },
      { label: 'Activation of Endonucleases', description: 'Fragments nuclear chromatin and genomic DNA (Pyknosis/Karyorrhexis)', type: 'process' },
      { label: 'Activation of ATPases', description: 'Accelerates rate of ATP destruction, deepening energy exhaustion', type: 'process' },
      { label: 'Opening of MPTP (Mitochondrial Pore)', description: 'Permanent collapse of membrane potential → Irreversible Cell Death', type: 'outcome', badge: 'Point of No Return' }
    ],
    clinicalTakeaway: 'Calcium channel blockers and intracellular calcium stabilizers provide cytoprotection in ischemic tissue.'
  },
  {
    id: 'fc-ros-mediated-injury',
    title: '5. Reactive Oxygen Species (ROS) & Oxidative Stress',
    category: 'Cell Injury & Mechanisms',
    description: 'Free radical generation, cellular target damage, and the tripartite antioxidant defense wall.',
    steps: [
      { label: 'ROS Generation Sources', description: 'Mitochondrial respiration, inflammation (neutrophils), radiation, chemicals (CCl4), reperfusion', type: 'trigger' },
      { label: 'Primary ROS Formed', description: 'Superoxide (O2•-), Hydrogen Peroxide (H2O2), Hydroxyl Radical (•OH)', type: 'danger' },
      { label: 'Antioxidant Defense Line', description: 'SOD (O2•- → H2O2), Catalase (H2O2 → H2O + O2), Glutathione Peroxidase (GSH)', type: 'defense', badge: 'Scavengers' },
      { label: 'Oxidative Stress Threshold Crossed', description: 'ROS production exceeds antioxidant scavenging capacity', type: 'danger' },
      { label: '1. Lipid Peroxidation of Membranes', description: 'Peroxy radicals attack double bonds of polyunsaturated fatty acids → Membrane lysis', type: 'process' },
      { label: '2. Protein Cross-Linking & Fragmentation', description: 'Oxidation of sulfhydryl groups and enzyme active sites → Misfolded proteins', type: 'process' },
      { label: '3. DNA Strand Breaks & Mutations', description: 'Hydroxyl radical reacts with thymine → Single/double strand breaks → p53 activation', type: 'outcome' }
    ],
    clinicalTakeaway: 'Oxidative stress underlies aging, atherosclerosis, radiation injury, neurodegeneration, and ischemia-reperfusion damage.'
  },
  {
    id: 'fc-ischemia-reperfusion-injury',
    title: '6. Ischemia-Reperfusion Injury Cascade',
    category: 'Cell Injury & Mechanisms',
    description: 'The paradoxical exacerbation of cell death following the restoration of blood flow.',
    steps: [
      { label: 'Prolonged Ischemia Phase', description: 'Tissue suffers ATP depletion, membrane injury, and accumulation of hypoxanthine', type: 'trigger' },
      { label: 'Sudden Restoration of Blood Flow (Reperfusion)', description: 'Abrupt delivery of oxygen and circulating leukocytes to damaged tissue', type: 'process' },
      { label: 'Xanthine Oxidase Activation', description: 'Enzyme converts hypoxanthine + fresh O2 into massive burst of Superoxide (O2•-)', type: 'danger' },
      { label: 'Calcium Overload Wave', description: 'High extracellular calcium enters cells with non-functional membrane pumps', type: 'danger' },
      { label: 'Neutrophil Adhesion & Lysis', description: 'Infiltrating neutrophils release myeloperoxidase and elastase into tissue', type: 'process' },
      { label: 'Accelerated Necrosis & Contraction Bands', description: 'Explosive MPTP opening, hypercontraction of myofibers, and extended infarct area', type: 'outcome', badge: 'Reperfusion Damage' }
    ],
    clinicalTakeaway: 'Emphasizes why post-infarction care uses controlled reperfusion and anti-oxidative strategies to limit myocardial damage.'
  },
  {
    id: 'fc-reversible-to-irreversible',
    title: '7. Reversible → Irreversible Transition (Point of No Return)',
    category: 'Cell Injury & Mechanisms',
    description: 'The critical biochemical bifurcation separating recoverable cells from committed cell death.',
    steps: [
      { label: 'Initial Reversible Stage', description: 'Cellular swelling, ER dilation, blebbing, mild chromatin clumping (Intact membrane)', type: 'process', badge: 'Recoverable' },
      { label: 'Continued Severe Stress / Persistent Ischemia', description: 'Hypoxia continues past organ ischemic tolerance (20-30 min in heart)', type: 'trigger' },
      { label: 'Critical Milestone 1: Massive Mitochondrial MPTP Opening', description: 'High-conductance permeability transition pore permanently opens → Cytochrome c released', type: 'danger' },
      { label: 'Critical Milestone 2: Profound Plasma Membrane Disruption', description: 'Phospholipases & ROS lyse membrane bilayer → Intracellular enzymes leak into blood', type: 'danger' },
      { label: 'Nuclear Irreversible Collapse', description: 'Pyknosis → Karyorrhexis → Karyolysis (Enzymatic digestion of DNA)', type: 'process' },
      { label: 'Commitment to Cell Death', description: 'Irreversible Necrosis with surrounding acute inflammatory host response', type: 'outcome', badge: 'Point of No Return' }
    ],
    clinicalTakeaway: 'Defines the therapeutic window of opportunity in acute myocardial infarction, ischemic stroke, and organ transplantation.'
  },
  {
    id: 'fc-necrosis-pathways',
    title: '8. Morphological Necrosis Pathways',
    category: 'Cell Death & Necrosis',
    description: 'Structural evolution of all 6 morphological forms of necrosis.',
    steps: [
      { label: 'Irreversible Cell Injury in Living Tissue', description: 'Lethal damage with membrane rupture and release of DAMPs', type: 'trigger' },
      { label: 'Denaturation Dominates (Coagulative)', description: 'Acidosis denatures proteases → Ghost cell architecture preserved (Heart, Kidney, Spleen)', type: 'process', badge: 'Coagulative' },
      { label: 'Enzymatic Digestion Dominates (Liquefactive)', description: 'Hydrolytic enzymes completely digest tissue into liquid cavity (Brain stroke, Abscess)', type: 'process', badge: 'Liquefactive' },
      { label: 'Hypersensitivity Immune Complex (Caseous)', description: 'TB granuloma: lipid-rich mycobacteria produce friable cheesy debris + Langhans giant cells', type: 'process', badge: 'Caseous' },
      { label: 'Pancreatic Lipase Activation (Fat Necrosis)', description: 'Lipases hydrolyze triglycerides → Free fatty acids bind Ca2+ → Saponification soaps', type: 'process', badge: 'Fat Necrosis' },
      { label: 'Immune Vasculitis (Fibrinoid)', description: 'Antigen-antibody complexes + fibrin deposit in vessel walls (Polyarteritis nodosa)', type: 'process', badge: 'Fibrinoid' },
      { label: 'Ischemia + Bacterial Infection (Gangrene)', description: 'Dry (mummification) vs Wet (putrefaction) vs Gas (Clostridial crepitation)', type: 'outcome', badge: 'Gangrene' }
    ],
    clinicalTakeaway: 'Allows precise clinical-pathological correlation between gross specimens, biopsies, and underlying etiologies.'
  },
  {
    id: 'fc-apoptosis-pathways',
    title: '9. Dual-Pathway Apoptosis Cascade (Intrinsic vs Extrinsic)',
    category: 'Apoptosis',
    description: 'Molecular roadmap of programmed cell suicide showing convergence on executioner Caspase-3.',
    steps: [
      { label: 'Intrinsic Trigger: DNA Damage / ER Stress', description: 'BH3-only sensors (Bim, Bid, Puma) activate pro-apoptotic Bax/Bak', type: 'trigger' },
      { label: 'Extrinsic Trigger: Death Ligands (FasL / TNF)', description: 'Bind Fas (CD95) or TNFR1 on cell surface recruiting FADD adaptor', type: 'trigger' },
      { label: 'Intrinsic Execution: Cytochrome c Release', description: 'Mitochondrial outer membrane permeabilized → Cytochrome c binds APAF-1 → Apoptosome', type: 'process' },
      { label: 'Extrinsic Execution: DISC Complex Formation', description: 'FADD recruits and cleaves Pro-Caspase-8 into active Initiator Caspase-8', type: 'process' },
      { label: 'Initiator Caspase Activation', description: 'Intrinsic activates Caspase-9; Extrinsic activates Caspase-8 & 10', type: 'process' },
      { label: 'Convergence on Executioner Caspase-3 & 6', description: 'Cleaves cytoskeletal actin/lamin and activates Caspase-Activated DNase (CAD)', type: 'danger', badge: 'Execution' },
      { label: 'DNA Laddering & Apoptotic Bodies', description: 'Internucleosomal 180-200 bp cleavage + cell fragmentation into intact membrane-bound bodies', type: 'process' },
      { label: 'Phosphatidylserine Flip & Silent Phagocytosis', description: 'Outer membrane signal triggers rapid engulfment by macrophages without inflammation', type: 'outcome', badge: 'No Inflammation' }
    ],
    clinicalTakeaway: 'Explains why cancer therapies aim to activate apoptosis, while neuroprotective drugs aim to inhibit caspase cascades.'
  },
  {
    id: 'fc-hypertrophy',
    title: '10. Hypertrophy Signaling Cascade',
    category: 'Adaptations',
    description: 'Molecular pathway driving increased cell size in permanent and dividing cells.',
    steps: [
      { label: 'Increased Mechanical Workload / Agonists', description: 'Hypertension (pressure overload), weightlifting, Endothelin-1, Angiotensin II', type: 'trigger' },
      { label: 'Mechanical Sensors & Receptor Activation', description: 'Integrin stretch sensors and G-protein coupled receptors activated', type: 'process' },
      { label: 'Signal Transduction Pathways', description: 'MAP kinase, PI3K/Akt, and Calcineurin signaling cascades', type: 'process' },
      { label: 'Transcription Factor Upregulation', description: 'GATA4, NFAT, and MEF2 translocate to nucleus', type: 'process' },
      { label: 'Enhanced Protein Synthesis & Gene Switching', description: 'Upregulation of contractile proteins (alpha-actin, myosin) + re-expression of fetal ANP', type: 'process' },
      { label: 'Increased Organelle & Cell Size (Hypertrophy)', description: 'Cardiomyocytes enlarge, left ventricular wall thickens (>15 mm) without cell division', type: 'outcome', badge: 'Hypertrophy' }
    ],
    clinicalTakeaway: 'Hypertrophy initially normalizes wall stress, but long-term uncompensated hypertrophy progresses to ischemic heart failure.'
  },
  {
    id: 'fc-hyperplasia',
    title: '11. Hyperplasia Proliferation Pathway',
    category: 'Adaptations',
    description: 'Cell cycle re-entry driving increased cell count in tissues with dividing capacity.',
    steps: [
      { label: 'Hormonal Stimulation / Tissue Loss', description: 'Estrogen surge, DHT stimulation, or partial hepatectomy', type: 'trigger' },
      { label: 'Growth Factor Secretion', description: 'EGF, TGF-alpha, HGF, and FGF released by stromal and parenchymal cells', type: 'process' },
      { label: 'Receptor Tyrosine Kinase Activation', description: 'Growth factors bind membrane receptors, triggering RAS-RAF-MAPK signaling', type: 'process' },
      { label: 'Cell Cycle Progression (G0 → G1 → S phase)', description: 'Cyclin D-CDK4 complexes phosphorylate Rb protein, releasing E2F transcription factors', type: 'process' },
      { label: 'Stem Cell & Mature Cell Division', description: 'Rapid mitotic proliferation increasing the total cell count', type: 'process' },
      { label: 'Increased Organ Mass (Hyperplasia)', description: 'Endometrial proliferation, BPH, or restored liver mass after resection', type: 'outcome', badge: 'Hyperplasia' }
    ],
    clinicalTakeaway: 'Pathological hyperplasia (endometrial hyperplasia) provides a proliferative base that can undergo malignant transformation if stimulus persists.'
  },
  {
    id: 'fc-atrophy',
    title: '12. Pathological Atrophy & Protein Degradation',
    category: 'Adaptations',
    description: 'Dual-mechanism of tissue shrinkage via the Ubiquitin-Proteasome system and Autophagy.',
    steps: [
      { label: 'Decreased Workload / Denervation / Ischemia / Starvation', description: 'Immobilized cast limb, motor neuron injury, reduced blood supply, or cachexia', type: 'trigger' },
      { label: 'Decreased Cellular Protein Synthesis', description: 'Reduced metabolic activity and down-regulated transcription', type: 'process' },
      { label: 'Activation of Ubiquitin-Proteasome Pathway', description: 'Ubiquitin ligases attach ubiquitin tags to cytosolic and structural proteins', type: 'danger' },
      { label: 'Proteasomal Digestion (26S Proteasome)', description: 'Tagged proteins are rapidly degraded into small peptides by proteasome complexes', type: 'process' },
      { label: 'Activation of Autophagy', description: 'Starved cells sequester obsolete organelles in autophagosomes fused with lysosomes', type: 'process' },
      { label: 'Residual Lipofuscin Granules & Reduced Cell Size', description: 'Shrunken cell volume, reduced organ mass, and Brown Atrophy appearance', type: 'outcome', badge: 'Atrophy' }
    ],
    clinicalTakeaway: 'Disuse atrophy is fully reversible with rehabilitation; denervation atrophy requires timely nerve re-innervation before permanent fibrosis.'
  },
  {
    id: 'fc-metaplasia',
    title: '13. Metaplasia Stem Cell Reprogramming',
    category: 'Adaptations',
    description: 'Adaptive lineage redirection of tissue stem cells under chronic irritation.',
    steps: [
      { label: 'Chronic Noxious Irritation / Environmental Stress', description: 'Cigarette smoke in bronchus or acid/bile reflux in esophagus (GERD)', type: 'trigger' },
      { label: 'Cytokine & Growth Factor Release', description: 'Damaged differentiated cells release TGF-beta, BMPs, and inflammatory mediators', type: 'process' },
      { label: 'Reprogramming of Local Tissue Stem Cells', description: 'Undifferentiated reserve stem cells or mesenchymal cells alter gene expression', type: 'process' },
      { label: 'Lineage-Specific Transcription Switching', description: 'Upregulation of transcription factors favoring a more resilient cell phenotype', type: 'process' },
      { label: 'Differentiated Adult Phenotype Replaced', description: 'Columnar → Squamous (Smoker bronchus) OR Squamous → Columnar (Barrett Esophagus)', type: 'outcome', badge: 'Metaplasia' },
      { label: 'Risk of Malignant Progression', description: 'Persistent irritation may cause Dysplasia (CIN / Barrett dysplasia) → Invasive Carcinoma', type: 'danger', badge: 'Premalignant' }
    ],
    clinicalTakeaway: 'Metaplasia itself is benign and reversible, but warrants clinical surveillance because of the potential for dysplastic progression.'
  },
  {
    id: 'fc-dystrophic-calcification',
    title: '14. Dystrophic Calcification Mechanism',
    category: 'Calcification',
    description: 'Local calcium phosphate crystallization in necrotic tissue with normal serum calcium.',
    steps: [
      { label: 'Dead, Dying or Degenerated Tissue', description: 'Atherosclerotic plaque, Ghon tuberculous focus, calcific aortic valve, or fat necrosis', type: 'trigger' },
      { label: 'Normal Serum Calcium & Phosphate Levels', description: 'Systemic calcium metabolism and parathyroid hormone levels are completely normal', type: 'process', badge: 'Normal Ca2+' },
      { label: 'Membrane Phospholipid Nucleation', description: 'Damaged cell membranes expose acidic phospholipids that attract and bind calcium ions', type: 'process' },
      { label: 'Alkaline Phosphatase Activity', description: 'Membrane-associated phosphatases generate high local concentrations of inorganic phosphate', type: 'process' },
      { label: 'Calcium Phosphate Salt Deposition', description: 'Calcium and phosphate combine to form insoluble microcrystals of Hydroxyapatite', type: 'danger' },
      { label: 'Propagation & Hard Rock-Like Calcinosis', description: 'Crystal lattice grows, producing dense basophilic calcified plaques (Psammoma bodies)', type: 'outcome', badge: 'Dystrophic' }
    ],
    clinicalTakeaway: 'Causes severe localized mechanical obstruction such as calcific aortic stenosis and rigid atherosclerotic arteries.'
  },
  {
    id: 'fc-metastatic-calcification',
    title: '15. Metastatic Calcification Mechanism',
    category: 'Calcification',
    description: 'Systemic calcium deposition in normal viable tissues caused by hypercalcemia.',
    steps: [
      { label: 'Systemic Hypercalcemia Trigger', description: 'Primary hyperparathyroidism, osteolytic bone metastases, Vitamin D toxicity, or renal failure', type: 'trigger' },
      { label: 'Elevated Serum Calcium Level (>11.0 mg/dL)', description: 'Serum Calcium × Phosphate ion product exceeds critical solubility threshold', type: 'danger', badge: 'Hypercalcemia' },
      { label: 'Normal, Viable Living Tissues', description: 'Target tissues were previously completely healthy and structurally normal', type: 'process' },
      { label: 'Predilection for Acid-Excreting Organs', description: 'Lungs (excrete CO2), Stomach (excretes HCl), Kidneys (excrete acid) create internal alkaline pH', type: 'process', badge: 'Alkaline Milieu' },
      { label: 'Precipitation of Calcium Hydroxyapatite', description: 'Alkaline environment reduces calcium solubility, causing diffuse crystal precipitation', type: 'process' },
      { label: 'Widespread Tissue Deposition (Nephrocalcinosis)', description: 'Basement membranes of alveolar septa, gastric glands, and renal tubules calcify', type: 'outcome', badge: 'Metastatic' }
    ],
    clinicalTakeaway: 'Can lead to progressive renal failure (nephrocalcinosis) and restrictive lung disease if hypercalcemia is not rapidly corrected.'
  }
];

export const CellInjuryFlowchartsView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(masterFlowchartsList[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Cell Injury & Mechanisms', 'Cell Death & Necrosis', 'Apoptosis', 'Adaptations', 'Calcification'];

  const filteredFlowcharts = categoryFilter === 'All'
    ? masterFlowchartsList
    : masterFlowchartsList.filter(f => f.category === categoryFilter);

  const currentFlowchart = masterFlowchartsList.find(f => f.id === selectedId) || masterFlowchartsList[0];

  const getTypeStyle = (type: string, isCurrent: boolean) => {
    let base = 'transition-all duration-200 border ';
    if (isCurrent) {
      base += 'ring-2 ring-emerald-500 shadow-md ';
    }
    switch (type) {
      case 'trigger':
        return base + 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200';
      case 'decision':
        return base + 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200';
      case 'danger':
        return base + 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-200';
      case 'defense':
        return base + 'bg-cyan-50 border-cyan-200 text-cyan-900 dark:bg-cyan-950/30 dark:border-cyan-800 dark:text-cyan-200';
      case 'outcome':
        return base + 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 font-semibold';
      default:
        return base + 'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Flowchart list column */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredFlowcharts.map((fc, index) => (
            <button
              key={fc.id}
              onClick={() => {
                setSelectedId(fc.id);
                setActiveStepIndex(0);
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedId === fc.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                  {fc.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">#{index + 1}</span>
              </div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                {fc.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {fc.description}
              </p>
            </button>
          ))}
        </div>

        {/* Active Flowchart Interactive Canvas */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                  {currentFlowchart.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {currentFlowchart.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {currentFlowchart.steps.length} Steps
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 mb-6">
              {currentFlowchart.description}
            </p>

            {/* Interactive Step-by-Step Pathway */}
            <div className="space-y-3 relative before:absolute before:inset-y-4 before:left-5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {currentFlowchart.steps.map((step, idx) => {
                const isSelected = activeStepIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`relative flex items-start gap-4 p-3.5 rounded-xl cursor-pointer ${getTypeStyle(step.type, isSelected)}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs z-10 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {step.label}
                        </span>
                        {step.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-white/70 dark:bg-slate-800/80 border border-current">
                            {step.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {idx < currentFlowchart.steps.length - 1 && (
                      <ArrowDown className="w-4 h-4 text-slate-400 self-center hidden sm:block shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Takeaway Box */}
          <div className="mt-6 p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Clinical & Exam Key Takeaway
            </div>
            <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
              {currentFlowchart.clinicalTakeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
