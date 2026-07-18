import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  BookOpen, 
  Brain, 
  HelpCircle, 
  Compass, 
  ArrowRight, 
  Layers, 
  Heart, 
  Skull,
  Flame,
  Droplets
} from 'lucide-react';
import SEO from '../components/SEO';

interface MiasmDetail {
  id: string;
  name: string;
  pronunciation: string;
  subtitle: string;
  themeColor: string;
  bgGrad: string;
  characteristics: string[];
  mentalFeatures: string[];
  physicalFeatures: string[];
  remedies: { name: string; id: string; role: string }[];
  clinicalApps: string[];
  summary: string;
}

const MIASMS_DATA: MiasmDetail[] = [
  {
    id: "psora",
    name: "Psora",
    pronunciation: "Sore-ah",
    subtitle: "The Miasm of Deficiency and Functional Defect",
    themeColor: "text-amber-600 border-amber-200 bg-amber-500/10",
    bgGrad: "from-amber-500/5 via-transparent to-transparent",
    summary: "Psora is the primary, fundamental miasm of all chronic diseases, characterized by functional physiological disturbances, hypersensitivity, deficiency, itch, and skin eruptions. It represents irritation without structural destruction.",
    characteristics: [
      "Represents hypersensitivity, irritation, and functional deficiency.",
      "Primary symptom is itching, burning, and dry skin eruptions.",
      "Ameliorated by heat and warm wraps; aggravated by cold air.",
      "Symptoms are highly changeable, alternating, and episodic.",
      "The mother of all miasms - without Psora, other miasms cannot develop."
    ],
    mentalFeatures: [
      "Highly anxious, fearful of health, death, and financial insecurity.",
      "Melancholy, timid, and lacks self-confidence.",
      "Intellectually active but tires easily (brain fag).",
      "Restless, irritable, and constantly worrying about the future."
    ],
    physicalFeatures: [
      "Dry, dirty-looking, unhealthy skin prone to eruptions and intense itching.",
      "Itching is worse in a warm bed and from washing.",
      "Constant hunger or craving for sweets and warm foods.",
      "Sensation of internal burning in individual organs.",
      "Discharges are generally scanty, watery, and offensive."
    ],
    remedies: [
      { name: "Psorinum", id: "psorinum", role: "Nosode" },
      { name: "Sulphur", id: "sulphur", role: "Primary Antipsoric" },
      { name: "Calcarea Carbonica", id: "calc-carb", role: "Constitutional" },
      { name: "Lycopodium", id: "lycopodium", role: "Deep Acting" }
    ],
    clinicalApps: [
      "Chronic dermatitis, eczema, and psoriasis with dry, itching scales.",
      "Functional gastrointestinal disorders, chronic acidity, and constipation.",
      "Allergic rhinitis and asthma triggered by minor temperature changes.",
      "Chronic anxiety neurosis with somatic hyper-responsiveness."
    ]
  },
  {
    id: "sycosis",
    name: "Sycosis",
    pronunciation: "Sigh-co-sis",
    subtitle: "The Miasm of Excess and Proliferation",
    themeColor: "text-emerald-600 border-emerald-200 bg-emerald-500/10",
    bgGrad: "from-emerald-500/5 via-transparent to-transparent",
    summary: "Sycosis is the miasm of overproduction, hyper-growth, infiltration, and accumulation. It is characterized by tissue proliferation (warts, condylomata, fibroids), slow healing, and deep-seated joint inflammation.",
    characteristics: [
      "Represents over-construction, duplication, and metabolic excess.",
      "Characterized by fleshy growths, warts, cysts, and benign tumors.",
      "Aggravated by damp weather, cold water, and rest.",
      "Ameliorated by motion and dry weather.",
      "Slow, sluggish pathology with deep infiltration of tissues."
    ],
    mentalFeatures: [
      "Highly suspicious, secretive, and manipulative.",
      "Fixed ideas, obsessive-compulsive traits, and memory loss for recent events.",
      "Jealous, passionate, and prone to sudden outbursts of anger.",
      "Tends to hide weaknesses or cover up mistakes meticulously."
    ],
    physicalFeatures: [
      "Fleshy, cauliflower-like warts, moles, and epitheliomas.",
      "Thick, green, acrid, or sticky mucus discharges with fishy odor.",
      "Gouty and rheumatic pains worse in morning, during damp seasons, or before storms.",
      "Anemia and tendency to dropsy or water retention.",
      "Slow digestion with painful bloating and flatulence."
    ],
    remedies: [
      { name: "Medorrhinum", id: "medorrhinum", role: "Nosode" },
      { name: "Thuja Occidentalis", id: "thuja", role: "Primary Antisycotic" },
      { name: "Natrum Sulphuricum", id: "nat-sulph", role: "Constitutional" },
      { name: "Silicea", id: "silicea", role: "Deep Acting" }
    ],
    clinicalApps: [
      "Uterine fibroids, ovarian cysts, and benign prostatic hypertrophy (BPH).",
      "Osteoarthritis and chronic gouty arthritis aggravated by dampness.",
      "Asthma and bronchitis triggered or worsened by rainy weather.",
      "Warts, keloids, and benign epithelial skin proliferation."
    ]
  },
  {
    id: "syphilis",
    name: "Syphilis",
    pronunciation: "Sif-i-lis",
    subtitle: "The Miasm of Destruction and Degeneration",
    themeColor: "text-rose-600 border-rose-200 bg-rose-500/10",
    bgGrad: "from-rose-500/5 via-transparent to-transparent",
    summary: "The Syphilitic miasm is characterized by anatomical changes, structural destruction, ulceration, necrosis, decay, and malignant degeneration. It involves physical and mental deformities with night-time aggravations.",
    characteristics: [
      "Represents destruction, decomposition, and organic decay.",
      "Characterized by deep, painless ulcers, tissue necrosis, and bone decay.",
      "Aggravated strictly at night (sunset to sunrise).",
      "Ameliorated during day and in cold, open air.",
      "Structural deformities, congenital defects, and tissue erosion."
    ],
    mentalFeatures: [
      "Dullness, apathy, and severe depression with suicidal tendencies.",
      "Highly destructive, violent, and self-sabotaging behavior.",
      "Fixed, stubborn mindset with lack of moral responsibility.",
      "Idiocy, absolute memory loss, and mental paralysis."
    ],
    physicalFeatures: [
      "Ulceration of skin and mucous membranes that tends to spread deep into tissue.",
      "Deep bone pains (osteocopic), particularly in flat bones, worse at night.",
      "Alopecia with patchy hair loss, thick crusts on scalp.",
      "Deformities of teeth, nails, and bones (saddle nose).",
      "Discharges are thin, watery, bloody, putrid, and highly corrosive."
    ],
    remedies: [
      { name: "Syphilinum", id: "syphilinum", role: "Nosode" },
      { name: "Mercurius Solubilis", id: "mercurius", role: "Primary Antisyphilitic" },
      { name: "Aurum Metallicum", id: "aurum", role: "Constitutional" },
      { name: "Nitricum Acidum", id: "nit-acid", role: "Deep Ulceration" }
    ],
    clinicalApps: [
      "Deep varicose ulcers, gangrene, and osteomyelitis with nocturnal bone pain.",
      "Severe destructive depression, bipolar disorders, and suicidal ideation.",
      "Deformities, degenerative joint diseases, and severe chronic ulcerations.",
      "Progressive nervous system degeneration (tabes dorsalis, advanced dementia)."
    ]
  },
  {
    id: "tubercular",
    name: "Tubercular",
    pronunciation: "Too-ber-cue-lar",
    subtitle: "The Miasm of Changeability and Rapid Consumption",
    themeColor: "text-cyan-600 border-cyan-200 bg-cyan-500/10",
    bgGrad: "from-cyan-500/5 via-transparent to-transparent",
    summary: "The Tubercular miasm is a combination of Psora and Syphilis. It represents rapid metabolic wasting, continuous changeability, allergy, travel mania, and a high susceptibility to respiratory weaknesses.",
    characteristics: [
      "Represents fluctuation, rapid destruction, and emaciation.",
      "High tendency to catching cold, chest congestion, and weight loss.",
      "Aggravated by damp cold, night air, and physical exertion.",
      "Ameliorated by dry warm climates and continuous gentle motion.",
      "Symptom picture shifts rapidly - 'never well since' a major infection."
    ],
    mentalFeatures: [
      "Intense travel mania - constantly craves change, new scenery, and travel.",
      "Intellectually brilliant, creative, and highly romantic.",
      "Dissatisfied, restless, and hyper-reactive to surroundings.",
      "Prone to intense night terrors or creative daydreams."
    ],
    physicalFeatures: [
      "Rapid emaciation despite a voracious appetite.",
      "Frequent, severe colds, dry spasmodic coughs, and night sweats.",
      "Ringworm-like circular skin eruptions with burning itch.",
      "Long, slender bones, narrow chest, and weak physical stamina.",
      "Discharges are sweetish, purulent, or blood-streaked."
    ],
    remedies: [
      { name: "Tuberculinum", id: "tuberculinum", role: "Nosode" },
      { name: "Phosphorus", id: "phosphorus", role: "Constitutional" },
      { name: "Calcarea Phosphorica", id: "calc-phos", role: "Developmental" },
      { name: "Bacillinum", id: "bacillinum", role: "Intercurrent" }
    ],
    clinicalApps: [
      "Chronic respiratory disorders, allergies, and recurring bronchitis/asthma.",
      "Delayed growth and developmental disorders in children (growing pains).",
      "Wasting diseases, chronic fatigue syndrome with continuous emaciation.",
      "Circular scaling eczemas and ringworm infections resistant to local care."
    ]
  },
  {
    id: "cancer",
    name: "Cancer",
    pronunciation: "Can-cer",
    subtitle: "The Miasm of Chaos, Suppression, and Cellular Malignancy",
    themeColor: "text-purple-600 border-purple-200 bg-purple-500/10",
    bgGrad: "from-purple-500/5 via-transparent to-transparent",
    summary: "The Cancer miasm represents a triad of Psora, Sycosis, and Syphilis. It involves deep physical and emotional suppression, extreme perfectionism, over-responsibility, and cellular chaos leading to uncontrolled tumor growth.",
    characteristics: [
      "Represents cellular anarchy, chaos, and continuous suppression.",
      "Preceded by years of emotional or mental suppression.",
      "Aggravated by sea air, cold damp wind, and continuous stress.",
      "Ameliorated by short sleep, dancing, and gentle music.",
      "Complete systemic breakdown with loss of individual immune boundaries."
    ],
    mentalFeatures: [
      "Extreme perfectionism, highly responsible, and over-conscientious.",
      "Suppressed grief, anger, and desires - lives for others while neglecting self.",
      "Fears of failure, cancer, and public embarrassment.",
      "Deep love for nature, music, and art; highly sensitive."
    ],
    physicalFeatures: [
      "Numerous pigmented nevi, moles, and cafe-au-lait spots on skin.",
      "History of early severe childhood illnesses or suppressed fevers.",
      "Glandular swellings, rock-like hardness of lymph nodes or breast tissues.",
      "Chronic intractable insomnia dating back many years.",
      "Tendency to early malignant transformations and fast spreading tumors."
    ],
    remedies: [
      { name: "Carcinosin", id: "carcinosin", role: "Nosode" },
      { name: "Conium Maculatum", id: "conium", role: "Indurated Glands" },
      { name: "Phytolacca Decandra", id: "phytolacca", role: "Glandular" },
      { name: "Arsenicum Album", id: "arsenicum", role: "Deep Constitutional" }
    ],
    clinicalApps: [
      "Prophylaxis in patients with a heavy family history of neoplastic disorders.",
      "Intractable chronic insomnia, severe anxiety, and obsessive compulsive behavior.",
      "Stony-hard glandular indurations and cysts following mild trauma.",
      "Severe chronic fatigue syndrome with absolute physical exhaustion."
    ]
  }
];

export default function Miasms() {
  const [activeMiasmId, setActiveMiasmId] = useState<string>("psora");

  const activeMiasm = MIASMS_DATA.find(m => m.id === activeMiasmId) || MIASMS_DATA[0];

  return (
    <div className="min-h-screen bg-bg-primary pt-28 pb-20">
      <SEO 
        title="Durable Chronic Miasms Study Center | Curiva Homoeopathy"
        description="Comprehensive guide to the chronic miasms of Samuel Hahnemann: Psora, Sycosis, Syphilis, Tubercular, and Cancer miasms."
      />

      <header className="relative pb-16 text-center max-w-4xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/25 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-primary">
          <Layers className="w-3.5 h-3.5" /> Constitutional Chronicles
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-medium text-primary">
          The Chronic <span className="text-accent italic">Miasms</span>
        </h1>
        <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Unlock Samuel Hahnemann’s vital philosophy on the deep-seated infectious and inherited predispositions (miasms) that govern all chronic diseases.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {MIASMS_DATA.map((miasm) => {
            const isActive = miasm.id === activeMiasmId;
            return (
              <button
                key={miasm.id}
                onClick={() => setActiveMiasmId(miasm.id)}
                className={`px-6 py-3.5 rounded-3xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  isActive 
                    ? 'bg-primary text-white border-primary shadow-xl shadow-primary/10' 
                    : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/30 hover:text-primary'
                }`}
              >
                {miasm.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMiasmId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Column 1 & 2: Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Core summary card */}
              <div className={`p-8 md:p-12 bg-white border border-border rounded-[3rem] shadow-soft relative overflow-hidden bg-gradient-to-br ${activeMiasm.bgGrad}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                      Miasmatic Profile • {activeMiasm.pronunciation}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-1">
                      {activeMiasm.name} Miasm
                    </h2>
                  </div>
                  <div className={`px-4 py-2 border rounded-2xl text-[10px] font-black uppercase tracking-wider ${activeMiasm.themeColor}`}>
                    {activeMiasm.id === 'psora' ? 'Deficiency' : activeMiasm.id === 'sycosis' ? 'Excess' : 'Destruction'}
                  </div>
                </div>

                <p className="text-base md:text-lg text-text-secondary leading-relaxed font-serif italic mb-8 border-l-4 border-primary pl-6">
                  {activeMiasm.summary}
                </p>

                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" /> Key Characteristics &amp; Laws
                </h3>
                <ul className="space-y-3">
                  {activeMiasm.characteristics.map((char, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-text-secondary leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mental & Physical features tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mental */}
                <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-soft">
                  <h3 className="text-sm font-black text-primary uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-accent" /> Mental Characteristics
                  </h3>
                  <ul className="space-y-3">
                    {activeMiasm.mentalFeatures.map((m, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Physical */}
                <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-soft">
                  <h3 className="text-sm font-black text-primary uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" /> Physical Generals
                  </h3>
                  <ul className="space-y-3">
                    {activeMiasm.physicalFeatures.map((p, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 3: Remedy Associations and Clinical Apps */}
            <div className="space-y-8">
              {/* Remedies association */}
              <div className="p-8 bg-bg-secondary border border-border rounded-[2.5rem] shadow-soft space-y-6">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-accent" /> Key Remedy Associations
                </h3>
                <div className="space-y-3">
                  {activeMiasm.remedies.map((r) => (
                    <div 
                      key={r.id} 
                      className="p-4 bg-white border border-border/60 rounded-2xl flex items-center justify-between shadow-sm hover:border-primary/20 transition-all group"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-black text-text-primary group-hover:text-primary transition-colors">
                          {r.name}
                        </div>
                        <div className="text-[9px] font-bold text-text-tertiary uppercase tracking-widest">
                          {r.role}
                        </div>
                      </div>
                      <Link 
                        to={`/remedy/${r.id}`}
                        className="p-1.5 rounded-lg bg-bg-secondary text-text-tertiary hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        title={`View Materia Medica for ${r.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Apps */}
              <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-soft space-y-6">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" /> Clinical Applications
                </h3>
                <div className="space-y-4">
                  {activeMiasm.clinicalApps.map((app, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      <p className="text-xs text-text-secondary leading-relaxed font-serif italic">
                        {app}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
