import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  HeartPulse, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Activity,
  Filter,
  Pill,
  AlertTriangle,
  Flame,
  Wind,
  Droplet,
  Baby,
  Brain,
  Zap
} from 'lucide-react';
import SEO from '../components/SEO';

interface ClinicalCondition {
  id: string;
  category: string;
  condition: string;
  icdCode?: string;
  overview: string;
  topRemedies: {
    name: string;
    keynotes: string;
    modalities: string;
    potency: string;
  }[];
  generalManagement: string[];
  redFlags: string[];
  clinicalPearl: string;
}

const comprehensiveTherapeuticsData: ClinicalCondition[] = [
  {
    id: "resp-asthma",
    category: "Respiratory",
    condition: "Acute Bronchial Asthma Exacerbation",
    icdCode: "J45.901",
    overview: "Acute bronchospasm causing dyspnea, wheezing, chest constriction, and cough, aggravated by cold air, allergens, or emotional stress.",
    topRemedies: [
      {
        name: "Arsenicum Album",
        keynotes: "Severe suffocation and anxiety, midnight aggravation (12 AM - 2 AM), unable to lie down, must sit bent forward. Extreme restlessness and thirst for small sips.",
        modalities: "< Midnight, cold air, lying down; > Warm drinks, heat applied to chest.",
        potency: "30C to 200C in repeated water doses during acute paroxysm."
      },
      {
        name: "Ipecacuanha",
        keynotes: "Persistent nausea with completely clean tongue. Suffocative wheezing with rattling mucus that cannot be expectorated. Child becomes stiff and blue during paroxysm.",
        modalities: "< Warm moist wind, movement; > Open air.",
        potency: "30C every 15-30 minutes."
      },
      {
        name: "Antimonium Tartaricum",
        keynotes: "Loud, coarse bubbling rales in chest; chest seems full of phlegm but patient lacks strength to cough it up. Cyanosed lips, drowsiness, craving for cool fresh air.",
        modalities: "< Lying down, warm room; > Sitting upright, expectoration.",
        potency: "30C or 6X in lukewarm water."
      },
      {
        name: "Blatta Orientalis",
        keynotes: "Specific clinical bronchodilator in acute spasmodic asthma, especially with history of dampness, dust, or mould exposure. Copious yellow purulent sputum.",
        modalities: "< Damp weather, rainy season.",
        potency: "Mother tincture (Q) 5-10 drops in warm water or 3X/6C."
      }
    ],
    generalManagement: [
      "Keep patient seated upright with arms propped on table (tripod position).",
      "Ensure warm, dry, well-ventilated room free from smoke, incense, and perfumes.",
      "Monitor pulse oximetry (SpO2); administer supplemental oxygen if SpO2 < 92%."
    ],
    redFlags: [
      "Silent chest (absence of wheezing due to severe air entry reduction).",
      "Accessory muscle usage with suprasternal retractions and cyanosis.",
      "Inability to speak in complete sentences or altered sensorium (immediate ICU transfer)."
    ],
    clinicalPearl: "In acute asthma, never give cold water; Arsenicum Alb given in hot water acts rapidly to relax bronchial spasms and quiet mental terror."
  },
  {
    id: "git-dyspepsia",
    category: "Gastrointestinal",
    condition: "Acute Acid Peptic Disease & Dyspepsia",
    icdCode: "K30",
    overview: "Epigastric burning, acid regurgitation, bloating, post-prandial fullness, and gastroesophageal reflux associated with dietary indiscretions, alcohol, or stress.",
    topRemedies: [
      {
        name: "Nux Vomica",
        keynotes: "Heartburn and sour eructations 2-3 hours after eating. Heavy stone sensation in stomach. Irritable, sedentary executive with frequent ineffectual urging for stool.",
        modalities: "< Morning, coffee, spices, alcohol, overeating; > Short nap, warm drinks.",
        potency: "30C to 200C at bedtime."
      },
      {
        name: "Pulsatilla Pratensis",
        keynotes: "Dyspepsia from rich, fatty food, pork, pastries, or ice cream. Complete thirstlessness with dry mouth. Mild, weeping disposition, seeking open air.",
        modalities: "< Warm room, evening, rich fatty foods; > Open cool air, gentle walking.",
        potency: "30C or 200C."
      },
      {
        name: "Robinia Pseudacacia",
        keynotes: "Pronounced, intensely acid vomiting and sour eructations that set teeth on edge. Burning frontal headache accompanying sour stomach.",
        modalities: "< Night, lying down.",
        potency: "3X or 30C before meals."
      },
      {
        name: "Carbo Vegetabilis",
        keynotes: "Immense flatulence and bloating localized to upper abdomen. Simplest food causes distress. Patient wants to be fanned continuously.",
        modalities: "< Lying flat, evening, butter, milk; > Eructations, fanning.",
        potency: "30C or 200C."
      }
    ],
    generalManagement: [
      "Eat small, frequent meals; avoid eating within 3 hours of sleeping.",
      "Eliminate caffeinated beverages, deep-fried items, and NSAIDs.",
      "Elevate head of bed by 15 cm for nocturnal reflux."
    ],
    redFlags: [
      "Hematemesis (coffee-ground vomiting) or melena (black tarry stools).",
      "Progressive dysphagia (difficulty swallowing) or unexplained significant weight loss."
    ],
    clinicalPearl: "Robinia is the acid neutralizer of Homoeopathy; when all secretions and eructations are intensely sour, it provides rapid symptomatic relief."
  },
  {
    id: "cvs-hypertension",
    category: "Cardiovascular",
    condition: "Essential Hypertension & Cardiac Palpitations",
    icdCode: "I10",
    overview: "Elevated systemic blood pressure (>140/90 mmHg) with throbbing occipital headaches, dizziness, palpitations, and vascular congestion.",
    topRemedies: [
      {
        name: "Rauvolfia Serpentina",
        keynotes: "Safe physiological hypotensive agent with calm sedative effect. Reduces systolic and diastolic pressure, relieves congestive headaches and insomnia.",
        modalities: "< Stress, mental exertion.",
        potency: "Mother tincture (Q) 10-15 drops twice daily in half cup water."
      },
      {
        name: "Crataegus Oxyacantha",
        keynotes: "Preeminent cardiac tonic; sustains heart muscle, dissolves atheromatous plaques, reduces blood pressure without drug accumulation.",
        modalities: "< Warm room, exertion; > Rest, fresh air.",
        potency: "Mother tincture (Q) 10-20 drops 3 times daily."
      },
      {
        name: "Glonoinum (Nitroglycerinum)",
        keynotes: "Violent throbbing congestive headache in occiput and temples; pulsations felt in whole body and every vessel. Sunstroke or heat exposure.",
        modalities: "< Sun, heat, motion, stooping; > Uncovering head, cold applications.",
        potency: "6C to 30C."
      },
      {
        name: "Baryta Muriatica",
        keynotes: "Arteriosclerosis with high systolic and relatively low diastolic pressure in elderly patients with vascular degeneration and vertigo.",
        modalities: "< Cold damp weather, exertion.",
        potency: "3X to 30C."
      }
    ],
    generalManagement: [
      "Strict dietary sodium restriction (<2g sodium/day - DASH diet).",
      "Regular moderate aerobic exercise (30 mins daily walking).",
      "Stress reduction through meditation, deep breathing, and adequate sleep."
    ],
    redFlags: [
      "Hypertensive crisis (BP > 180/120 mmHg) with chest pain, shortness of breath, or neurological deficits (emergency ER referral).",
      "Blurring of vision, papilledema, or severe sudden thunderclap headache."
    ],
    clinicalPearl: "Crataegus Q combined with Rauvolfia Q serves as a safe supportive cardiovascular regimen while constitutional remedy is being selected."
  },
  {
    id: "msk-osteoarthritis",
    category: "Musculoskeletal",
    condition: "Osteoarthritis & Musculoskeletal Sprains",
    icdCode: "M17.9",
    overview: "Degenerative joint disease or acute soft tissue strain characterized by joint stiffness, crepitus, pain on weight-bearing, and reduced range of motion.",
    topRemedies: [
      {
        name: "Rhus Toxicodendron",
        keynotes: "Stiffness and pain on first beginning to move, which gradually improves with continued motion. Lameness and stiffness after exposure to cold wet weather or straining.",
        modalities: "< First motion, rest, cold damp weather, before storms; > Continued motion, warm dry wraps, hot bath.",
        potency: "30C to 200C."
      },
      {
        name: "Bryonia Alba",
        keynotes: "Sharp stitching pains in joints severely aggravated by the slightest movement. Joint is swollen, hot, and tense. Patient wants absolute quiet and rest.",
        modalities: "< Any movement, touch, warm room; > Absolute rest, lying on painful side, firm pressure.",
        potency: "30C to 200C."
      },
      {
        name: "Arnica Montana",
        keynotes: "Traumatic joint injury, sprain, or strain with bruised, sore feeling. The bed feels too hard. Fear of being touched or approached.",
        modalities: "< Touch, motion, damp cold; > Lying with head low, rest.",
        potency: "30C to 1M."
      },
      {
        name: "Ruta Graveolens",
        keynotes: "Specific affinity for periosteum, tendons, flexor muscles, and wrist/ankle joints. Bruised pain in bones with deep aching soreness.",
        modalities: "< Cold wet weather, lying on affected limb; > Motion.",
        potency: "30C."
      }
    ],
    generalManagement: [
      "Low-impact joint exercises (swimming, cycling, quadriceps strengthening).",
      "Maintain optimal body weight to reduce joint load.",
      "Apply warm compress for stiffness and cold packs for acute traumatic swelling."
    ],
    redFlags: [
      "Hot, red, acutely swollen joint with high fever (suspect Septic Arthritis).",
      "Inability to bear weight immediately following high-velocity trauma (rule out fracture via X-ray)."
    ],
    clinicalPearl: "Rhus Tox and Bryonia are exact polar opposites: Rhus Tox is worse from rest and better from motion; Bryonia is worse from the slightest motion and better from absolute rest."
  },
  {
    id: "gyn-dysmenorrhea",
    category: "Gynecology",
    condition: "Spasmodic Dysmenorrhea & Pelvic Pain",
    icdCode: "N94.6",
    overview: "Painful menstrual cramping originating in lower abdomen, radiating to lower back and thighs, often with nausea, headache, and mood changes.",
    topRemedies: [
      {
        name: "Magnesia Phosphorica",
        keynotes: "Severe lightning-like, neuralgic, cramping pains relieved by local heat, warm applications, and bending double. Better by pressure.",
        modalities: "< Cold air, touch, right side; > Warmth, hot bath, firm pressure, bending double.",
        potency: "6X or 12X dissolved in hot sips of water."
      },
      {
        name: "Colocynthis",
        keynotes: "Violent agonizing cramping pain causing patient to bend double or press hard against abdomen. Associated with indignation, mortification, or anger.",
        modalities: "< Anger, cold; > Bending double, hard pressure, heat.",
        potency: "30C to 200C."
      },
      {
        name: "Chamomilla",
        keynotes: "Unbearable labor-like pains with extreme irritability, snappishness, and restlessness. Cannot bear the pain, demands instant relief.",
        modalities: "< Heat, anger, night; > Warm sweat.",
        potency: "30C to 200C."
      },
      {
        name: "Caulophyllum Thalictroides",
        keynotes: "Spasmodic, intermittent pains flying in all directions across lower abdomen and groin. Uterine atony with weak, irregular contractions.",
        modalities: "< Open air, cold.",
        potency: "30C or Q."
      }
    ],
    generalManagement: [
      "Apply heating pad or hot water bottle to lower abdomen.",
      "Stay hydrated; avoid excess salt and caffeine during luteal phase.",
      "Practice gentle pelvic stretching and yoga."
    ],
    redFlags: [
      "Severe sudden unilateral lower abdominal pain with fainting (rule out Ruptured Ectopic Pregnancy).",
      "Fever with foul-smelling vaginal discharge (suspect Acute Pelvic Inflammatory Disease)."
    ],
    clinicalPearl: "Mag Phos 6X in hot water acts within minutes like a natural antispasmodic without any gastrointestinal side effects."
  },
  {
    id: "ped-fever",
    category: "Pediatrics",
    condition: "Acute Pediatric High Fever & Teething",
    icdCode: "R50.9",
    overview: "Sudden onset febrile episode in infants and children accompanied by flushed face, agitation, delirium, or teething distress.",
    topRemedies: [
      {
        name: "Belladonna",
        keynotes: "Sudden high fever with throbbing carotids, bright red flushed face, dilated pupils, and burning skin. Head is hot while hands and feet are cold. Delirium.",
        modalities: "< Touch, jar, noise, light, afternoon (3 PM); > Semi-erect posture, quiet room.",
        potency: "30C to 200C."
      },
      {
        name: "Aconitum Napellus",
        keynotes: "Rapid onset high fever after exposure to dry cold wind. Extreme anxiety, restlessness, fear of dying. Thirst for large quantities of cold water.",
        modalities: "< Evening, night, warm room; > Open air.",
        potency: "30C to 200C."
      },
      {
        name: "Ferrum Phosphoricum",
        keynotes: "Gradual onset fever in initial inflammatory stage before exudation. Flushed cheeks, soft rapid pulse, epistaxis. Child is calm without the violence of Belladonna.",
        modalities: "< Night, 4-6 AM; > Cold applications.",
        potency: "6X or 30C."
      },
      {
        name: "Chamomilla",
        keynotes: "Teething fever with one cheek red and hot, the other pale and cold. Child is whining, extremely irritable, quiet ONLY when carried constantly.",
        modalities: "< Night, anger, being touched; > Being carried.",
        potency: "30C."
      }
    ],
    generalManagement: [
      "Tepid sponging (lukewarm water) over forehead and limbs; never use cold ice water.",
      "Keep child lightly dressed and well hydrated with ORS, coconut water, or mother's milk.",
      "Ensure ambient room temperature is comfortable."
    ],
    redFlags: [
      "Febrile seizures lasting >5 minutes or recurrent seizures.",
      "Neck stiffness, petechial purpuric rash, lethargy, or refusal to feed (rule out Meningitis)."
    ],
    clinicalPearl: "Belladonna has high fever with hot head and cold feet; Chamomilla has one red cheek and one pale cheek with incessant demand to be carried."
  },
  {
    id: "derm-urticaria",
    category: "Dermatology",
    condition: "Acute Urticaria & Allergic Pruritus",
    icdCode: "L50.0",
    overview: "Erythematous wheals with intense pruritus, burning, and stinging sensations triggered by food allergies, insect bites, or drugs.",
    topRemedies: [
      {
        name: "Apis Mellifica",
        keynotes: "Puffy, edematous, rose-red swelling with stinging, burning pains like bee stings. Relieved by ice-cold water. Complete thirstlessness.",
        modalities: "< Heat in any form, warm room, touch; > Cold applications, ice water baths, open air.",
        potency: "30C to 200C."
      },
      {
        name: "Urtica Urens",
        keynotes: "Urticaria with intolerable burning heat and stinging pruritus like touching nettles. Aggravated by eating shellfish or after bee stings.",
        modalities: "< Cold water baths, touch; > Lying down.",
        potency: "Q (Mother tincture) or 30C."
      },
      {
        name: "Rhus Toxicodendron",
        keynotes: "Urticaria with burning itching wheals associated with rheumatism, wetting in rain, or fever. Better by scalding hot water.",
        modalities: "< Cold air, uncovering; > Hot bath, warm applications.",
        potency: "30C."
      }
    ],
    generalManagement: [
      "Identify and eliminate suspected dietary allergen (shellfish, nuts, eggs) or drug.",
      "Wear loose, breathable cotton clothing.",
      "Apply calamine lotion or cool compress for symptomatic itch relief."
    ],
    redFlags: [
      "Angioedema involving lips, tongue, uvula, or stridor/dyspnea (Anaphylaxis - immediate IM Epinephrine required)."
    ],
    clinicalPearl: "Apis urticaria is relieved by ice-cold water, whereas Rhus Tox urticaria is relieved by scalding hot water."
  },
  {
    id: "emerg-injuries",
    category: "Emergency",
    condition: "First Aid: Trauma, Nerve Injuries & Burns",
    icdCode: "T14.90",
    overview: "Immediate emergency homoeopathic support for blunt trauma, puncture wounds, crushed nerve endings, and thermal burns.",
    topRemedies: [
      {
        name: "Arnica Montana",
        keynotes: "First remedy for all blunt traumatic injuries, hematomas, contusions, and post-surgical shock. Prevents suppuration and septicemia.",
        modalities: "< Touch, jarring; > Rest, lying flat.",
        potency: "200C or 1M immediately."
      },
      {
        name: "Hypericum Perforatum",
        keynotes: "The 'Arnica of nerves'. Indicated in injuries to parts rich in sentient nerves (fingertips, toes, coccyx, spine, teeth). Darting, shooting pains along nerve path.",
        modalities: "< Cold damp air, touch, jarring; > Bending head backward.",
        potency: "200C to 1M."
      },
      {
        name: "Ledum Palustre",
        keynotes: "Puncture wounds (nails, pins, needles, animal/insect bites). Affected part feels cold to touch yet is relieved by ice-cold applications. Prevents tetanus.",
        modalities: "< Heat of bed, warm room; > Ice-cold water immersion.",
        potency: "200C."
      },
      {
        name: "Cantharis Vesicatoria",
        keynotes: "Severe thermal burns and scalds with vesicle formation and intense burning pain. Relieves pain instantly and prevents blistering.",
        modalities: "< Touch, coffee; > Cold applications.",
        potency: "30C to 200C internally & diluted tincture externally on unbroken skin."
      }
    ],
    generalManagement: [
      "Assess ABCs (Airway, Breathing, Circulation) first in severe trauma.",
      "Irrigate puncture wounds and burns with copious clean isotonic saline.",
      "Administer Tetanus Toxoid booster where indicated."
    ],
    redFlags: [
      "Major third-degree burns >10% TBSA, cranial vault depression, or arterial spurting hemorrhage."
    ],
    clinicalPearl: "Hypericum is specific for smashed fingertips in doors or coccyx injury from falling on tailbone, relieving excruciating shooting pains rapidly."
  }
];

export default function ClinicalTherapeuticsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return [
      "All",
      "Respiratory",
      "Gastrointestinal",
      "Cardiovascular",
      "Musculoskeletal",
      "Gynecology",
      "Pediatrics",
      "Dermatology",
      "Emergency"
    ];
  }, []);

  const filteredConditions = useMemo(() => {
    return comprehensiveTherapeuticsData.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.condition.toLowerCase().includes(q) ||
        item.overview.toLowerCase().includes(q) ||
        item.clinicalPearl.toLowerCase().includes(q) ||
        item.topRemedies.some(r => r.name.toLowerCase().includes(q) || r.keynotes.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <SEO 
        title="Clinical Therapeutics & Bedside Prescribing Center | Curiva Homoeopathy"
        description="Evidence-informed bedside homoeopathic therapeutics protocols, disease keynote remedy differentials, modalities, dosages, and emergency red flags."
      />

      {/* Breadcrumb & Hero */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/student-resources" className="hover:text-primary transition-colors">Study Resources</Link>
          <span>/</span>
          <span className="text-primary font-bold">Clinical Therapeutics Center</span>
        </div>

        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              Bedside Prescribing &amp; Therapeutics
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              Clinical Therapeutics Center
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Rapid clinical references linking acute and chronic conditions to precise remedy differentials, keynotes, modalities, general medical management, and emergency red flags.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-5 space-y-4 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conditions, remedies, symptoms, or clinical pearls (e.g. 'Asthma', 'Arsenic', 'Burns', 'Fever')..."
            className="w-full pl-11 pr-4 py-3 bg-bg-primary rounded-2xl border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-text-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary hover:text-text-primary px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider mr-1">System:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-text-tertiary font-mono">
            {filteredConditions.length} Clinical Protocols
          </span>
        </div>
      </div>

      {/* Condition Cards List */}
      <div className="space-y-6">
        {filteredConditions.map((item) => {
          const isExpanded = expandedCardId === item.id;

          return (
            <div
              key={item.id}
              className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm hover:border-primary/40 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {item.category}
                    </span>
                    {item.icdCode && (
                      <span className="text-[10px] font-mono text-text-tertiary">
                        ICD-10: {item.icdCode}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary">
                    {item.condition}
                  </h2>
                </div>

                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isExpanded
                      ? 'bg-primary text-white'
                      : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
                  }`}
                >
                  <span>{isExpanded ? 'Collapse Details' : 'Full Clinical Protocol'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Overview & Quick Remedy Pills */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {item.overview}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">
                    Core Remedies:
                  </span>
                  {item.topRemedies.map((r, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-primary/10 text-primary font-bold text-xs rounded-lg border border-primary/20"
                    >
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remedy Details (Always show key remedies) */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-primary" />
                  Key Differential Remedy Profiles &amp; Modalities:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.topRemedies.map((rem, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-bg-primary border border-border/80 rounded-2xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold text-primary">{rem.name}</strong>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bg-secondary text-text-tertiary border border-border">
                          {rem.potency}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {rem.keynotes}
                      </p>
                      <div className="pt-1 text-[11px] text-text-tertiary">
                        <strong className="text-text-secondary">Modalities: </strong>
                        {rem.modalities}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Clinical Sections (General Management, Red Flags, Pearl) */}
              {isExpanded && (
                <div className="pt-4 border-t border-border space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* General Management */}
                    <div className="bg-bg-primary p-4 rounded-2xl border border-border/80 space-y-2">
                      <strong className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Clinical &amp; Dietary Management:
                      </strong>
                      <ul className="space-y-1.5 text-xs text-text-secondary">
                        {item.generalManagement.map((gm, gIdx) => (
                          <li key={gIdx} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{gm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Red Flags & Emergency Referral */}
                    <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/20 space-y-2">
                      <strong className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        Critical Red Flags (Immediate Referral):
                      </strong>
                      <ul className="space-y-1.5 text-xs text-text-secondary">
                        {item.redFlags.map((rf, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">•</span>
                            <span>{rf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bedside Clinical Pearl */}
                  <div className="bg-gradient-to-r from-emerald-950/20 via-teal-950/20 to-primary/10 p-4 rounded-2xl border border-primary/20 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold uppercase tracking-wider text-primary block mb-0.5">
                        Bedside Prescribing Pearl:
                      </strong>
                      <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                        "{item.clinicalPearl}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredConditions.length === 0 && (
          <div className="p-12 text-center bg-bg-secondary rounded-3xl border border-border space-y-3">
            <Stethoscope className="w-8 h-8 text-text-tertiary mx-auto opacity-50" />
            <h3 className="text-base font-bold text-text-primary">No clinical protocols found</h3>
            <p className="text-xs text-text-secondary">Try adjusting your search query or selecting another system category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
