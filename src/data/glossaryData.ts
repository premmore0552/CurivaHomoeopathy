export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: 'Term' | 'Concept' | 'Remedy';
  explanation: string;
  source?: string;
  relatedTerms?: string[];
}

export const glossaryData: GlossaryItem[] = [
  {
    id: 'vital-force',
    term: 'Vital Force',
    category: 'Concept',
    definition: 'The spiritual, automatic, self-moving life-energy (dynamis) that animates the physical human organism in health, directs its functions, and preserves its harmonious integrity.',
    explanation: 'In Homoeopathic philosophy, the Vital Force (Lebenskraft) constitutes the healing energy of the body. When in health, this force keeps all parts of the organism in perfect, harmonious activity. When disturbed by pathogenetic influences, it manifests disharmony as symptoms of disease. Homoeopathic remedies act dynamically on this level to restore equilibrium.',
    source: 'Samuel Hahnemann, Organon of Medicine (Aphorisms 9-16)',
    relatedTerms: ['Dynamization', 'Miasm', 'Homoeopathy']
  },
  {
    id: 'similia-similibus-curentur',
    term: 'Similia Similibus Curentur',
    category: 'Concept',
    definition: 'Wait! The foundational law of Homoeopathy, meaning "Let Likes Be Cured by Likes ."',
    explanation: 'This law states that a pharmacodynamically active substance that produces a specific set of symptoms in a healthy prover can cure a patient exhibiting a similar symptom picture. For example, red onion (Allium Cepa) causes watery eyes and a runny nose; thus, it is a primary remedy for hay fever.',
    source: 'Samuel Hahnemann',
    relatedTerms: ['Proving', 'Remedy', 'Materia Medica']
  },
  {
    id: 'potentization',
    term: 'Potentization',
    category: 'Term',
    definition: 'The unique pharmaceutical process of serial dilution accompanied by succussion (vigorous shaking) or trituration (grinding), which unlocks the latent dynamic therapeutic properties of a substance.',
    explanation: 'Hahnemann discovered that serial dilution alone decreases medicinal power, but when combined with serial mechanical agitation (succussion or trituration), the remedy becomes dynamically active and free of chemical toxicity. This is also called dynamicization.',
    source: 'Organon of Medicine (Aphorisms 269-271)',
    relatedTerms: ['Succussion', 'Trituration', 'Infinitesimal Dose']
  },
  {
    id: 'succussion',
    term: 'Succussion',
    category: 'Term',
    definition: 'The process of vigorously shaking a liquid Homoeopathic dilution against a firm but semi-elastic surface (traditionally a leather-bound book) to activate and release its dynamic curative potential.',
    explanation: 'In the preparation of Homoeopathic dilutions, succussion is performed at each stage of serial dilution. This physical impact is believed to transfer the systemic pattern of the solute into the molecular architecture of the solvent (water/alcohol).',
    source: 'Homoeopathic Pharmacopoeia',
    relatedTerms: ['Potentization', 'Trituration']
  },
  {
    id: 'trituration',
    term: 'Trituration',
    category: 'Term',
    definition: 'The process of grinding an insoluble, dry crude substance in a mortar with sugar of milk (lactose) for a sustained period to reduce particle size to the point of solubility, initializing its potentization.',
    explanation: 'This method is used primarily for solid minerals (e.g. Silicea, Sulphur, Calcarea Carbonica) or insoluble plant matter. Hahnemann established that grinding a substance with milk sugar for three hours (in decimal or centesimal ratios) renders it soluble in alcohol and water, making subsequent liquid dilution possible.',
    relatedTerms: ['Potentization', 'Succussion']
  },
  {
    id: 'miasm',
    term: 'Miasm',
    category: 'Concept',
    definition: 'An underlying chronic infectious state or constitutional predisposition (such as Psora, Sycosis, or Syphilis) that produces chronic disease.',
    explanation: 'Hahnemann noticed that acute treatments failed to permanently cure chronic diseases. He concluded that chronic diseases are rooted in inherited or acquired dynamic blockages called miasms. The three primary classical miasms are Psora (the itching miasm), Sycosis (the condylomatous/warty miasm), and Syphilis (the destructive/ulcerative miasm).',
    source: 'Hahnemann, Chronic Diseases',
    relatedTerms: ['Psora', 'Sycosis', 'Syphilis']
  },
  {
    id: 'psora',
    term: 'Psora',
    category: 'Concept',
    definition: 'The fundamental, oldest, and most universal chronic miasm, characterized by itching, skin eruptions, hypersensitivity, and functional disturbances.',
    explanation: 'According to Hahnemann, Psora is the mother of all true chronic diseases. It represents a state of deficiency, irritation, and internal struggle, often manifesting outward skin eruptions which, if suppressed, lead to deeper internal pathologies.',
    source: 'Hahnemann, Chronic Diseases',
    relatedTerms: ['Miasm', 'Sycosis', 'Syphilis']
  },
  {
    id: 'sycosis',
    term: 'Sycosis',
    category: 'Concept',
    definition: 'The sycotic chronic miasm, characterized by overgrowth, proliferation (warts, condylomata), water retention, and over-accumulation.',
    explanation: 'Rooted historically in the suppression of gonorrheal infections, Sycosis represents a state of excess, hyper-coordination, and coordination blockages. It is clinically recognized by slow, stubborn pathologies, benign growths, and symptoms that worsen in cold, damp weather.',
    relatedTerms: ['Miasm', 'Psora', 'Syphilis']
  },
  {
    id: 'syphilis-miasm',
    term: 'Syphilis Miasm',
    category: 'Concept',
    definition: 'The destructive chronic miasm, characterized by ulceration, organic tissue destruction, deformities, and suicidal or violent mental tendencies.',
    explanation: 'Rooted in the suppression of syphilitic infections, this miasm represents a state of decay, structural changes, and necrosis. Clinically, it shows symptoms that worsen at night, bone pains, ulcerations, and deep-seated degenerative diseases.',
    relatedTerms: ['Miasm', 'Psora', 'Sycosis']
  },
  {
    id: 'proving',
    term: 'Proving',
    category: 'Term',
    definition: 'The scientific method of drug testing where healthy human volunteers ingest potentized substances to systematically observe, verify, and record the physical and mental symptoms produced.',
    explanation: 'A proving (Hahnemannian "Prüfung") forms the genuine basis of the Homoeopathic Materia Medica. Symptoms generated during provings are cataloged extensively. Since likes are cured by likes, these recorded symptoms outline the exact therapeutic profile of the tested substance.',
    source: 'Organon of Medicine (Aphorisms 105-145)',
    relatedTerms: ['Materia Medica', 'Similia Similibus Curentur']
  },
  {
    id: 'repertory',
    term: 'Repertory',
    category: 'Term',
    definition: 'A systematic index of clinical symptoms (rubrics) with lists of Homoeopathic remedies associated with each, graded by their clinical efficacy.',
    explanation: 'While the Materia Medica lists remedies and their respective symptoms, a Repertory is structured the opposite way: it indices symptoms (e.g., "headache in cold wind") and lists the corresponding remedies. Prominent repertories include those of Kent, Boenninghausen, and Boger.',
    relatedTerms: ['Materia Medica', 'Proving']
  },
  {
    id: 'materia-medica',
    term: 'Materia Medica',
    category: 'Term',
    definition: 'A compilation of comprehensive remedy profiles, detailing the mental state, physical symptoms, modalities, and keynotes observed during provings and clinical practice.',
    explanation: 'Materia Medica ("materials of medicine") serves as the Homoeopathic encyclopedia of drug properties. Famous classical works include Allen\'s Keynotes, Boericke\'s Pocket Manual, and Kent\'s Lectures on Homoeopathic Materia Medica.',
    relatedTerms: ['Proving', 'Repertory']
  },
  {
    id: 'allopathy',
    term: 'Allopathy',
    category: 'Term',
    definition: 'A term coined by Samuel Hahnemann to describe the orthodox, conventional system of medicine that treats symptoms using drugs that produce opposite or unrelated effects.',
    explanation: 'Allopathic treatments (e.g., anti-inflammatories for inflammation, laxatives for constipation) represent the law of contraries. Hahnemann argued that this suppressive action often drives disease deeper into vital organs, rather than stimulating a dynamic self-healing response of the Vital Force.',
    relatedTerms: ['Homoeopathy', 'Vital Force']
  },
  {
    id: 'infinitesimal-dose',
    term: 'Infinitesimal Dose',
    category: 'Term',
    definition: 'A dose of a Homoeopathic remedy that has been diluted beyond Avogadro\'s number, containing virtually no molecules of the original crude substance but retaining its dynamic curative imprint.',
    explanation: 'Because Homoeopathic remedies are potentized through serial dilution and succussion, they act on a non-molecular, dynamic level, bypassing chemical side-effects and toxicities, allowing the Vital Force to receive clean, energetic cues for healing.',
    relatedTerms: ['Potentization', 'Vital Force']
  },
  {
    id: 'arnica-montana',
    term: 'Arnica Montana',
    category: 'Remedy',
    definition: 'The premier remedy for physical trauma, mechanical injuries, bruising, sprains, shock, and muscle soreness from overuse.',
    explanation: 'Prepared from Leopard\'s Bane, Arnica is the first-line remedy for fall, blow, contusion, or physical shock. Mentally, the patient is in a state of shock, declaring "I am fine" while severely injured. Physically, everything feels bruised and sore. It is also an excellent remedy for post-surgical recovery.',
    relatedTerms: ['Remedy', 'Materia Medica']
  },
  {
    id: 'belladonna',
    term: 'Belladonna',
    category: 'Remedy',
    definition: 'A major Homoeopathic remedy for sudden, violent onset of acute inflammation, high fever, intense throbbing congestions, flushed face, and hot skin.',
    explanation: 'Prepared from Deadly Nightshade, Belladonna symptoms are characterized by "heat, redness, throbbing, and burning." Fevers are high with dilated pupils, hot head with cold extremities, and severe localized throbbing. Symptoms come and go like a flash of lightning.',
    relatedTerms: ['Remedy', 'Materia Medica']
  },
  {
    id: 'nux-vomica',
    term: 'Nux Vomica',
    category: 'Remedy',
    definition: 'The premier remedy for sedentary, over-worked, modern individuals suffering from digestive issues, irritability, and toxic overindulgence.',
    explanation: 'Prepared from Poison Nut, Nux Vomica is the "polychrest" remedy for the consequences of modern stress, excess coffee, alcohol, spices, and overwork. Mentally, the patient is highly ambitious, irritable, and impatient. Physically, they suffer from ineffectual urging for stool, heartburn, and are extremely chilly.',
    relatedTerms: ['Remedy', 'Materia Medica']
  },
  {
    id: 'aconitum-napellus',
    term: 'Aconitum Napellus',
    category: 'Remedy',
    definition: 'A vital remedy for sudden, acute inflammatory conditions brought on by exposure to cold, dry wind, characterized by panic, intense fear of death, and restlessness.',
    explanation: 'Prepared from Monkshood, Aconite is indicated in the first 24 hours of sudden illness (e.g. croup, fever, colds) brought on by a cold draft. The patient exhibits extreme mental anxiety, restless tossing, and a distinct prediction of the hour of death.',
    relatedTerms: ['Remedy', 'Materia Medica']
  },
  {
    id: 'sulphur',
    term: 'Sulphur',
    category: 'Remedy',
    definition: 'A powerful antipsoric polychrest remedy for burning sensations, skin diseases with intense itching, redness of orifices, and untidy, philosophical temperaments.',
    explanation: 'Prepared from sublimated Sulphur, this is Hahnemann\'s primary antipsoric remedy. The Sulphur patient is a "ragged philosopher"—brilliant but untidy. They suffer from burning pains (especially on the soles of feet at night), red lips, red eyelids, and skin diseases that itch intolerably, worse from warmth of bed and washing.',
    relatedTerms: ['Psora', 'Miasm']
  }
];
