import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Baby, 
  AlertTriangle, 
  CheckCircle2,
  Bookmark,
  Layers
} from 'lucide-react';

interface ObgRemedy {
  remedy: string;
  commonName: string;
  category: 'Gynaecology' | 'Obstetrics' | 'Puerperium' | 'Neonatology';
  indications: string[];
  keynotes: string[];
  miasmaticDyscrasia: string;
  repertoryRubrics: string[];
  clinicalComparisons?: string;
}

const obgRemediesDatabase: ObgRemedy[] = [
  {
    remedy: "Caulophyllum Thalictroides",
    commonName: "Blue Cohosh",
    category: "Obstetrics",
    indications: [
      "Rigidity of os uteri with lack of progress in labor",
      "False, erratic, spasmodic labor pains flying across abdomen to bladder and groin",
      "Habitual abortion from uterine debility and lack of muscle tone",
      "Severe dysmenorrhea with needle-like pains radiating to distant parts"
    ],
    keynotes: [
      "Extraordinary rigidity of os uteri; pains are severe and spasmodic but accomplish nothing",
      "Pains fly in every direction; shivering during labor without actual fever",
      "Exhaustion of uterine contractions; patient is irritable and tremulous"
    ],
    miasmaticDyscrasia: "Psora / Sycosis",
    repertoryRubrics: [
      "LABOR - Pains - spasmodic: Caul., Cimic., Gels., Puls.",
      "LABOR - Os - rigid: Bell., Caul., Gels., Lob.",
      "FEMALE - Abortion - tendency - uterine debility, from: Aletr., Caul., Helon., Sabin."
    ],
    clinicalComparisons: "Compare with Cimicifuga (darting pains from hip to hip, heavy mental gloom) and Gelsemium (complete flabby motor inertia from fright/excitement)."
  },
  {
    remedy: "Actaea Racemosa (Cimicifuga)",
    commonName: "Black Cohosh",
    category: "Obstetrics",
    indications: [
      "Violent, unendurable labor pains darting across hypogastrium from hip to hip",
      "Puerperal mania and severe post-partum depression with fear of death/insanity",
      "Inframammary pain (left-sided) in reflex uterine disorders",
      "Severe spasmodic dysmenorrhea in nervous, hysterical women"
    ],
    keynotes: [
      "Pains dart from side to side; the more severe the pain, the more profound the mental gloom",
      "Feels as if a heavy dark cloud is settling over her mind; hysterical weeping",
      "Sharp neuralgic stitches in ovarian and uterine region"
    ],
    miasmaticDyscrasia: "Psora / Syphilis",
    repertoryRubrics: [
      "MIND - Delusions - cloud - dark cloud had settled over her: Cimic.",
      "LABOR - Pains - hip to hip, from: Cimic.",
      "FEMALE - Pain - Ovaries - across hypogastrium: Cimic."
    ],
    clinicalComparisons: "Compare with Caulophyllum (erratic needle-like pains to distant extremities) and Lilium Tig (bearing down with cardiac palpitation)."
  },
  {
    remedy: "Sabina",
    commonName: "Savin",
    category: "Obstetrics",
    indications: [
      "Threatened abortion around the 3rd month of pregnancy",
      "Active uterine hemorrhage (menorrhagia/metrorrhagia) with bright red blood mixed with dark clots",
      "Pain characteristically shoots from the sacrum directly through to the pubis",
      "Uterine fibroids and subinvolution with continuous protracted oozing"
    ],
    keynotes: [
      "Drawing, labor-like pain from sacrum to pubes is the cardinal keynote",
      "Discharge of bright red blood mixed with dark, gelatinous clots in gushes",
      "Aggravation from least motion, yet desires open cool air"
    ],
    miasmaticDyscrasia: "Sycosis",
    repertoryRubrics: [
      "FEMALE - Metrorrhagia - blood - clots, dark, with: Sabin., Sec., Cham.",
      "FEMALE - Pain - Uterus - sacrum to pubis, extending from: Sabin.",
      "FEMALE - Abortion - third month: Sabin., Sec., Thuj."
    ],
    clinicalComparisons: "Compare with Secale (passive, thin dark foul oozing in thin exhausted women, desires cold air) and Ipecac (constant nausea with bright red continuous flow)."
  },
  {
    remedy: "Secale Cornutum",
    commonName: "Ergot of Rye",
    category: "Obstetrics",
    indications: [
      "Atonic postpartum hemorrhage (PPH); uterus flabby and fails to contract",
      "Threatened or incomplete abortion at 3rd-4th month with thin, foul, blackish blood",
      "Retained placenta from uterine atony or hourglass contraction of uterus",
      "Puerperal fever with foul putrid lochia and coldness of skin"
    ],
    keynotes: [
      "Skin feels icy cold to touch, yet patient violently resists being covered and demands open windows",
      "Thin, scrawny, feeble, cachectic women with weak muscular tone",
      "Passive, continuous dark brown or blackish watery hemorrhage"
    ],
    miasmaticDyscrasia: "Syphilis / Destruction",
    repertoryRubrics: [
      "GENERALS - Heat - lack of vital heat - uncovering, with aversion to: Camph., Med., Sec.",
      "FEMALE - Metrorrhagia - passive: Bov., Ham., Sec., Ust.",
      "FEMALE - Retained placenta: Puls., Sabin., Sec."
    ],
    clinicalComparisons: "Compare with Sabina (active bright red with dark clots, worse motion) and China (profound weakness from acute massive blood loss)."
  },
  {
    remedy: "Sepia Officinalis",
    commonName: "Inky Juice of Cuttlefish",
    category: "Gynaecology",
    indications: [
      "Pelvic Organ Prolapse / Uterine prolapse with intense bearing-down sensation",
      "Polycystic Ovarian Syndrome (PCOS), chronic anovulation, and irregular menses",
      "Chloasma / yellowish saddle across bridge of nose and cheeks",
      "Climacteric hot flushes, vaginal dryness, and loss of sexual libido"
    ],
    keynotes: [
      "Bearing-down sensation in pelvis as if everything would protrude through vulva; must cross limbs firmly to prevent it",
      "Emotional indifference to loved ones (husband, children, household duties)",
      "Yellowish, excoriating or milky leucorrhea with painful pelvic heaviness"
    ],
    miasmaticDyscrasia: "Psora / Sycosis",
    repertoryRubrics: [
      "FEMALE - Prolapsus - Uteri: Bell., Lil-t., Murx., Nux-v., Sep.",
      "MIND - Indifference, apathy - loved ones, to: Fl-ac., Plat., Sep.",
      "FEMALE - Leucorrhoea - yellow: Hydr., Kreos., Puls., Sep."
    ],
    clinicalComparisons: "Compare with Lilium Tigrinum (must hold pelvis with hands; heart palpitations, hurried) and Murex (bearing down with intense sexual excitement)."
  },
  {
    remedy: "Pulsatilla Nigricans",
    commonName: "Wind Flower",
    category: "Gynaecology",
    indications: [
      "Delayed, scanty, suppressed menses (amenorrhea) especially after getting feet wet",
      "Malpositions of fetus (breech or transverse lie in late pregnancy)",
      "Bland, thick, creamy, milky leucorrhea with no excoriation",
      "Suppressed lochia or erratic milk secretion during puerperium"
    ],
    keynotes: [
      "Mild, gentle, weeping, yielding disposition; seeks consolation and open cool air",
      "Symptoms ever-changing and erratic; no two periods or stools alike",
      "Complete thirstlessness with almost all complaints"
    ],
    miasmaticDyscrasia: "Psora",
    repertoryRubrics: [
      "MIND - Weeping - tearful mood - consolation amel.: Puls.",
      "FEMALE - Menses - suppressed - feet, from getting wet: Puls.",
      "FEMALE - Leucorrhoea - thick, creamy, bland: Puls."
    ],
    clinicalComparisons: "Compare with Cyclamen (similar suppressed menses and chilliness, but patient is thirsty and suffers dizzy blind headaches)."
  },
  {
    remedy: "Ipecacuanha",
    commonName: "Ipecac Root",
    category: "Obstetrics",
    indications: [
      "Severe intractable nausea and hyperemesis gravidarum in early pregnancy",
      "Continuous active uterine hemorrhage of bright red blood with persistent nausea",
      "Threatened miscarriage with continuous nausea not relieved by vomiting",
      "Postpartum hemorrhage accompanied by sudden pallor, gasping, and nausea"
    ],
    keynotes: [
      "Constant and continual nausea not relieved by actual vomiting",
      "Clean, un-coated tongue with profuse salivation",
      "Bright red, gushing, uninterrupted hemorrhage"
    ],
    miasmaticDyscrasia: "Psora",
    repertoryRubrics: [
      "STOMACH - Nausea - pregnancy, in: Colch., Ipec., Nux-v., Symph-r., Tab.",
      "MOUTH - Tongue - clean: Cina, Dig., Ipec.",
      "FEMALE - Metrorrhagia - nausea, with: Ipec."
    ],
    clinicalComparisons: "Compare with Colchicum (nausea from smell of cooking foods) and Symphoricarpus (stubborn gastric aversion to all food)."
  },
  {
    remedy: "Phytolacca Decandra",
    commonName: "Poke Root",
    category: "Puerperium",
    indications: [
      "Acute puerperal mastitis with stony hard, hot, swollen, congested breasts",
      "Cracked, ulcerated, exquisitely sensitive nipples",
      "Pain radiates from nipple all over the whole body whenever infant nurses",
      "Fibroadenoma and chronic mammary gland indurations"
    ],
    keynotes: [
      "Stony hardness of mammary gland tissue with high fever and aching",
      "Pain starts at nipple and shoots across back and down spine during suckling",
      "Glands swollen, dark red, and indurated"
    ],
    miasmaticDyscrasia: "Syphilis",
    repertoryRubrics: [
      "CHEST - Inflammation - Mammae - hard, stony: Bry., Con., Phos., Phyt.",
      "CHEST - Pain - Mammae - nursing, when - radiating all over body: Phyt.",
      "CHEST - Cracked nipples: Cast-eq., Graph., Phyt., Rat."
    ],
    clinicalComparisons: "Compare with Bryonia (stony hard breasts, worse least motion, relieved by firm pressure) and Croton Tig (pain shoots from nipple straight through to scapula)."
  },
  {
    remedy: "Agnus Castus",
    commonName: "Chaste Tree",
    category: "Puerperium",
    indications: [
      "Total suppression or deficiency of breast milk (Agalactia) in nursing mothers",
      "Profound postpartum depression with intense melancholy and fear of impending death",
      "Secondary amenorrhea with complete loss of sexual desire and cold relaxed genitals",
      "Premature aging and sexual exhaustion"
    ],
    keynotes: [
      "Milk fails to appear or dries up completely without obvious physical obstruction",
      "Deep sadness, apathy, and fixed delusion that she will not live long",
      "Complete relaxation and flabbiness of reproductive organs"
    ],
    miasmaticDyscrasia: "Psora / Sycosis",
    repertoryRubrics: [
      "CHEST - Milk - suppressed: Agnus, Lac-c., Phyt., Puls., Ric., Urt-u.",
      "MIND - Sadness - puerperal: Agnus, Cimic., Plat., Puls., Verat.",
      "GENITALIA - Coldness - relaxed organs: Agnus"
    ],
    clinicalComparisons: "Compare with Ricinus Communis (galactagogue for scanty milk) and Urtica Urens (arrests or stimulates milk with swollen stinging breasts)."
  },
  {
    remedy: "Kreosotum",
    commonName: "Beechwood Creosote",
    category: "Gynaecology",
    indications: [
      "Severe corrosive, putrid, acrid leucorrhea causing excoriation of thighs and vulva",
      "Cervical erosions, polypi, and bleeding after coitus",
      "Post-menopausal bleeding from malignant ulceration of cervix",
      "Menses flow only when lying down, cease on sitting or walking about"
    ],
    keynotes: [
      "Exceedingly acrid and corrosive discharge smelling like green corn or decayed tissue",
      "Intense burning and itching of pudenda, worse during urination and at night",
      "Rapid tissue breakdown, ulceration, and malignant tendencies"
    ],
    miasmaticDyscrasia: "Syphilis / Destruction",
    repertoryRubrics: [
      "FEMALE - Leucorrhoea - acrid, excoriating: Alum., Ars., Kreos., Merc., Sep.",
      "FEMALE - Menses - lying down, only when: Bov., Kreos.",
      "FEMALE - Metrorrhagia - coition, after: Arg-n., Arn., Kreos., Sep."
    ],
    clinicalComparisons: "Compare with Nitric Acid (splinter-like pains, ragged bleeding ulcers) and Arsenicum Album (burning relieved by heat)."
  }
];

export function GynaeTherapeuticsGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Gynaecology' | 'Obstetrics' | 'Puerperium' | 'Neonatology'>('all');

  const filteredRemedies = obgRemediesDatabase.filter(rem => {
    if (selectedCategory !== 'all' && rem.category !== selectedCategory) return false;
    const q = searchQuery.toLowerCase();
    return (
      rem.remedy.toLowerCase().includes(q) ||
      rem.commonName.toLowerCase().includes(q) ||
      rem.indications.some(i => i.toLowerCase().includes(q)) ||
      rem.keynotes.some(k => k.toLowerCase().includes(q)) ||
      rem.miasmaticDyscrasia.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              <Activity className="w-4 h-4" />
              University Blueprint (Section B) Master Guide
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              Homoeopathic Therapeutics in Gynaecology & Obstetrics
            </h2>
            <p className="text-xs text-text-secondary">
              Essential keynote materia medica, repertorial rubrics, and miasmatic correlations for Paper I Section B and Paper II Section B.
            </p>
          </div>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 rounded-full text-xs font-bold">
            100 Marks Theory Weightage
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedy (e.g. Caulophyllum, Sabina, Sepia, Phytolacca)..."
              className="w-full pl-9 pr-4 py-2 bg-bg-primary border border-border rounded-xl text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {(['all', 'Obstetrics', 'Gynaecology', 'Puerperium'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-bg-primary text-text-secondary hover:bg-purple-500/10'
                }`}
              >
                {cat === 'all' ? 'All Remedies' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Remedies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRemedies.map((remedy) => (
          <div 
            key={remedy.remedy}
            className="bg-bg-secondary border border-border/80 rounded-2xl p-6 shadow-sm hover:border-purple-500/40 hover:shadow-md transition-all duration-200 space-y-4"
          >
            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <h3 className="text-lg font-bold text-text-primary font-serif">
                  {remedy.remedy}
                </h3>
                <span className="text-xs text-text-tertiary italic">
                  {remedy.commonName}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold text-[10px] rounded-full border border-purple-500/20">
                  {remedy.category}
                </span>
                <span className="text-[10px] text-text-tertiary">
                  Miasm: <strong>{remedy.miasmaticDyscrasia}</strong>
                </span>
              </div>
            </div>

            {/* Keynotes */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Guiding Keynote Symptoms
              </h4>
              <ul className="space-y-1 text-xs text-text-secondary">
                {remedy.keynotes.map((k, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Indications */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-primary" />
                Curriculum Clinical Indications
              </h4>
              <ul className="space-y-1 text-xs text-text-secondary">
                {remedy.indications.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kent Repertory Rubrics */}
            <div className="p-3 bg-bg-primary rounded-xl border border-border/60 space-y-1 text-xs">
              <div className="font-bold text-[11px] text-text-tertiary uppercase">Kent Repertorial Rubrics:</div>
              {remedy.repertoryRubrics.map((rub, i) => (
                <div key={i} className="font-mono text-[11px] text-purple-700 dark:text-purple-300">
                  • {rub}
                </div>
              ))}
            </div>

            {/* Comparisons */}
            {remedy.clinicalComparisons && (
              <div className="text-[11px] text-text-secondary bg-purple-500/5 p-2.5 rounded-xl border border-purple-500/20">
                <strong className="text-purple-700 dark:text-purple-300">Bedside Comparison: </strong>
                {remedy.clinicalComparisons}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
