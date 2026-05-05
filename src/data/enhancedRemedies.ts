
import { Zap, Droplets, Wind, Sparkles, Shield, Activity, Brain } from 'lucide-react';

export interface RemedyComparison {
  id: string;
  name: string;
  keyDifference: string;
}

export interface RemedyDetailData {
  id: string;
  name: string;
  latinName?: string;
  family: 'Plant' | 'Mineral' | 'Animal' | 'Sarcode' | 'Nosode' | 'Imponderabilia';
  origin: string;
  description: string;
  keyCharacteristics: string[];
  modalities: {
    better: string[];
    worse: string[];
  };
  thermal: 'Chilly' | 'Hot' | 'Ambi-thermal';
  thirst: string;
  clinicalApplications: string[];
  comparisons: RemedyComparison[];
  relatedAilments: { id: string; name: string }[];
  relatedBlogPosts?: string[];
}

export const enhancedRemedies: RemedyDetailData[] = [
  {
    id: 'aconite',
    name: 'Aconitum Napellus',
    latinName: 'Aconitum napellus',
    family: 'Plant',
    origin: 'Monkshood (Ranunculaceae)',
    description: 'Aconite is known as the "Homeopathic Lancet." It is primarily indicated for sudden, violent onset of symptoms, especially after exposure to dry, cold winds. It is the first remedy to think of in acute inflammatory stages.',
    keyCharacteristics: [
      'Great fear and anxiety of mind, with great nervous excitability',
      'Restlessness, tossing about',
      'Sudden and great sinking of strength',
      'Fear of death; predicts the day or even the hour of death',
      'Pains are intolerable, they drive him crazy'
    ],
    modalities: {
      better: ['Open air', 'Rest', 'Warm perspiration'],
      worse: ['Dry, cold winds', 'Midnight', 'Crowded places', 'Music', 'Lying on affected side']
    },
    thermal: 'Chilly',
    thirst: 'Burning thirst for large quantities of cold water. Everything tastes bitter, except water.',
    clinicalApplications: [
      'Acute fevers',
      'Influenza (early stage)',
      'Angina Pectoris',
      'Panic attacks',
      'Croup',
      'Neuralgia'
    ],
    comparisons: [
      { id: 'belladonna', name: 'Belladonna', keyDifference: 'Belladonna has more redness and throbbing, while Aconite has more anxiety and restlessness.' },
      { id: 'arnica', name: 'Arnica', keyDifference: 'Both are used for shock, but Arnica is more for physical trauma, Aconite for emotional/nervous shock.' }
    ],
    relatedAilments: [
      { id: 'fever', name: 'Acute Fever' },
      { id: 'anxiety', name: 'Anxiety & Panic' },
      { id: 'migraine', name: 'Neuralgic Headache' }
    ],
    relatedBlogPosts: ['aconite']
  },
  {
    id: 'arnica',
    name: 'Arnica Montana',
    latinName: 'Arnica montana',
    family: 'Plant',
    origin: 'Leopard\'s Bane (Compositae)',
    description: 'Arnica is the premier remedy for trauma, bruising, and overexertion. It acts on the blood vessels, particularly the capillaries.',
    keyCharacteristics: [
      'Sore, lame, bruised feeling all over the body, as if beaten',
      'The bed feels too hard; keeps moving to find a soft spot',
      'Says "I am well" when seriously ill or injured',
      'Fear of being touched or even approached'
    ],
    modalities: {
      better: ['Lying down', 'Head low', 'Motion (gentle)'],
      worse: ['Touch', 'Motion', 'Damp cold', 'Overexertion']
    },
    thermal: 'Chilly',
    thirst: 'Thirst during chill; thirstless during heat.',
    clinicalApplications: [
      'Mechanical injuries',
      'Concussions',
      'Post-surgery recovery',
      'Muscle strain',
      'Bruising and hematomas'
    ],
    comparisons: [
      { id: 'bryonia', name: 'Bryonia', keyDifference: 'Bryonia is worse from any motion, Arnica has a bruised soreness that makes them restless.' }
    ],
    relatedAilments: [
      { id: 'chronic-pain', name: 'Muscle & Joint Pain' },
      { id: 'skin-health', name: 'Bruises' }
    ]
  },
  {
    id: 'arsenicum-album',
    name: 'Arsenicum Album',
    latinName: 'Arsenic Trioxide',
    family: 'Mineral',
    origin: 'Arsenic',
    description: 'A deeply acting remedy affecting every organ and tissue. It is characterized by three great essentials: Fear, Restlessness, and Burning.',
    keyCharacteristics: [
      'Great anguish and restlessness, changes place continually',
      'Fear of death, of being alone',
      'Burning pains, better by heat',
      'Great prostration, out of proportion to the disease'
    ],
    modalities: {
      better: ['Heat', 'Hot drinks', 'Hot applications', 'Company'],
      worse: ['Midnight (1-2 AM)', 'Cold air', 'Cold food/drink', 'Right side']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for small quantities of water at short intervals.',
    clinicalApplications: [
      'Food poisoning',
      'Asthma (worse at midnight)',
      'Eczema with burning',
      'Gastritis',
      'Anxiety disorders'
    ],
    comparisons: [
      { id: 'aconite', name: 'Aconite', keyDifference: 'Both are restless, but Aconite is more an acute panicked state, Arsenic is more chronic exhaustion and coldness.' }
    ],
    relatedAilments: [
      { id: 'acidity', name: 'Gastritis' },
      { id: 'asthma', name: 'Asthma' },
      { id: 'anxiety', name: 'Anxiety' }
    ]
  },
  {
    id: 'belladonna',
    name: 'Belladonna',
    latinName: 'Atropa belladonna',
    family: 'Plant',
    origin: 'Deadly Nightshade (Solanaceae)',
    description: 'Belladonna corresponds to states of suddenness and intensity. It is the remedy for congestion and inflammation with redness, heat, and throbbing.',
    keyCharacteristics: [
      'Sudden onset, sudden disappearance',
      'Redness, heat, and burning are prominent',
      'Throbbing carotids and pulsating pains',
      'Dilated pupils, staring eyes',
      'Great sensitivity to light, noise, and jar'
    ],
    modalities: {
      better: ['Semi-erect position', 'Warmth', 'Light pressure'],
      worse: ['Touch', 'Drafts', 'Noise', 'Light', '3 PM', 'Lying down']
    },
    thermal: 'Hot',
    thirst: 'Thirstless, though mouth and throat are very dry.',
    clinicalApplications: [
      'High fevers with delirium',
      'Throbbing headaches',
      'Acute tonsillitis',
      'Sunstroke',
      'Boils (early stage)'
    ],
    comparisons: [
      { id: 'aconite', name: 'Aconite', keyDifference: 'Aconite has dry skin; Belladonna has moist/sweaty skin and more congestion.' }
    ],
    relatedAilments: [
      { id: 'migraine', name: 'Throbbing Headache' },
      { id: 'fever', name: 'High Fever' }
    ]
  },
  {
    id: 'bryonia',
    name: 'Bryonia Alba',
    latinName: 'Bryonia alba',
    family: 'Plant',
    origin: 'Wild Hops (Cucurbitaceae)',
    description: 'The "Remedy of Rest." Every symptom is worse for the least motion. It acts especially on serous membranes and their secretions.',
    keyCharacteristics: [
      'Extreme dryness of mucous membranes',
      'All complaints aggravated by the least motion',
      'Business-like delirium; talks about his business',
      'Pressure relieves the pain'
    ],
    modalities: {
      better: ['Absolute rest', 'Pressure', 'Lying on painful side', 'Cold drinks'],
      worse: ['Motion', 'Heat', 'Eating', 'Morning (on first moving)']
    },
    thermal: 'Hot',
    thirst: 'Great thirst for large quantities of cold water at long intervals.',
    clinicalApplications: [
      'Dry cough / Pleurisy',
      'Arthritis (pain worse for motion)',
      'Constipation (dry stools)',
      'Rheumatism'
    ],
    comparisons: [
      { id: 'rhus-tox', name: 'Rhus Tox', keyDifference: 'Bryonia is worse for motion; Rhus Tox is better for continued motion.' }
    ],
    relatedAilments: [
      { id: 'chronic-pain', name: 'Joint Pain' },
      { id: 'respiratory-health', name: 'Dry Cough' }
    ]
  },
  {
    id: 'pulsatilla',
    name: 'Pulsatilla',
    latinName: 'Pulsatilla pratensis',
    family: 'Plant',
    origin: 'Wind Flower (Ranunculaceae)',
    description: 'The "Weathercock" remedy—highly changeable symptoms. It is suited to emotional, timid, and yielding temperaments.',
    keyCharacteristics: [
      'Changeability: no two symptoms, no two stools, no two chills are alike',
      'Thirstless with all complaints',
      'Desires open air; feels smothered in a warm room',
      'Weeps easily; better from consolation'
    ],
    modalities: {
      better: ['Open air', 'Cold applications', 'Slow motion', 'Consolation'],
      worse: ['Warm room', 'Evening', 'Rich / Fatty food', 'Puberty']
    },
    thermal: 'Hot',
    thirst: 'Complete absence of thirst.',
    clinicalApplications: [
      'Menstrual regularities',
      'Sinusitis (thick yellow discharge)',
      'Digestive issues from rich food',
      'Ear infections in children'
    ],
    comparisons: [
      { id: 'sepia', name: 'Sepia', keyDifference: 'Pulsatilla desires consolation; Sepia is irritable and desires to be alone.' }
    ],
    relatedAilments: [
      { id: 'digestive-issues', name: 'Indigestion' },
      { id: 'skin-health', name: 'Hormonal Acne' }
    ]
  },
  {
    id: 'lycopodium',
    name: 'Lycopodium Clavatum',
    latinName: 'Lycopodium clavatum',
    family: 'Plant',
    origin: 'Club Moss (Lycopodiaceae)',
    description: 'A deeply acting, semi-polychrest remedy. It primarily affects the digestive system, urinary tract, and liver. Suited to individuals with high intellectual capacity but weak muscular power.',
    keyCharacteristics: [
      'Anticipatory anxiety but performs well once started',
      'Right-sided complaints, or moving from right to left',
      'Great bloating and flatulence (better by passing gas)',
      'Aggravated between 4 PM and 8 PM'
    ],
    modalities: {
      better: ['Warm food/drinks', 'Motion (after starting)', 'Uncovering the head', 'Passing gas'],
      worse: ['4 PM - 8 PM', 'Cold food/drinks', 'Right side', 'Pressure of clothes']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for small quantities of warm drinks.',
    clinicalApplications: [
      'Gastro-intestinal disorders',
      'Liver dysfunction',
      'Kidney stones',
      'Impotence',
      'Premature greying of hair'
    ],
    comparisons: [
      { id: 'nux-vomica', name: 'Nux Vomica', keyDifference: 'Nux is irritable and chilly; Lyco is anxious and bloated but better for warm drinks.' }
    ],
    relatedAilments: [
      { id: 'digestive-issues', name: 'Bloating & Gas' },
      { id: 'acidity', name: 'Acid Reflux' }
    ]
  },
  {
    id: 'nux-vomica',
    name: 'Nux Vomica',
    latinName: 'Strychnos nux-vomica',
    family: 'Plant',
    origin: 'Poison Nut (Loganiaceae)',
    description: 'The "Business Man\'s Remedy." Indicated for sedentary individuals who lead high-stress, high-living lives. Extremely irritable and nervous.',
    keyCharacteristics: [
      'Oversensitive to all impressions (light, noise, odors)',
      'Frequent ineffectual urging for stool',
      'Extremely chilly; wants to be covered even in fever',
      'Irritable, impatient, and easily offended'
    ],
    modalities: {
      better: ['Damp weather', 'Strong pressure', 'Short sleep (nap)', 'Warmth'],
      worse: ['Morning (waking)', 'Cold air', 'After eating', 'Mental exertion']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for cold water during chill (though it makes them shake).',
    clinicalApplications: [
      'Constipation',
      'Hemorrhoids',
      'Hangover / Overindulgence',
      'Insomnia from overactive mind',
      'Gastric derangements'
    ],
    comparisons: [
      { id: 'pulsatilla', name: 'Pulsatilla', keyDifference: 'Pulsatilla is mild and desires sympathy; Nux is aggressive and desires solitude.' }
    ],
    relatedAilments: [
      { id: 'digestive-issues', name: 'Constipation' },
      { id: 'anxiety', name: 'Work Stress' }
    ]
  },
  {
    id: 'nat-mur',
    name: 'Natrum Muriaticum',
    latinName: 'Sodium Chloride',
    family: 'Mineral',
    origin: 'Common Salt',
    description: 'A major polychrest remedy for chronic conditions. Deeply connected to the emotional sphere, especially suppressed grief and disappointment.',
    keyCharacteristics: [
      'Consolation aggravates the state',
      'Craves salt and bitter things',
      'Mapped tongue / Hammering headache',
      'Oily skin and greasy hair'
    ],
    modalities: {
      better: ['Open air', 'Cold bathing', 'Going without regular meals', 'Lying on right side'],
      worse: ['Sun (10 AM - 11 AM)', 'Consolation', 'Seashore', 'Mental exertion']
    },
    thermal: 'Hot',
    thirst: 'Great thirst for large quantities of cold water.',
    clinicalApplications: [
      'Chronic headaches (Sun stroke)',
      'Anemia',
      'Delayed recovery from grief',
      'Cold sores (Herpes)',
      'Eczema in hair margins'
    ],
    comparisons: [
      { id: 'ignatia', name: 'Ignatia', keyDifference: 'Ignatia is for acute grief (sobbing); Nat-Mur is for chronic, deep-seated grief (hidden).' }
    ],
    relatedAilments: [
      { id: 'migraine', name: 'Sun Headache' },
      { id: 'anxiety', name: 'Suppressed Grief' }
    ]
  },
  {
    id: 'sepia',
    name: 'Sepia Officinalis',
    latinName: 'Cuttlefish Ink',
    family: 'Animal',
    origin: 'Cuttlefish',
    description: 'The premier remedy for hormonal imbalances and women\'s health. Characterized by a sense of stasis and indifference to loved ones.',
    keyCharacteristics: [
      'Bearing down sensation as if everything would escape from vagina',
      'Indifference to those loved best',
      'Yellowish saddle across the nose',
      'Better from violent physical exercise'
    ],
    modalities: {
      better: ['Violent exercise', 'Warmth of bed', 'Cold application', 'Pressure'],
      worse: ['Before noon', 'Cold air', 'After eating', 'Sexual excess']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless, often has a putrid taste in mouth.',
    clinicalApplications: [
      'Menopausal symptoms',
      'Uterine prolapse',
      'Morning sickness',
      'Leucorrhea',
      'Post-partum depression'
    ],
    comparisons: [
      { id: 'pulsatilla', name: 'Pulsatilla', keyDifference: 'Pulsatilla is better for slow, gentle motion; Sepia is better for fast, violent exercise.' }
    ],
    relatedAilments: [
      { id: 'skin-health', name: 'Melasma' },
      { id: 'anxiety', name: 'Emotional Apathy' }
    ]
  },
  {
    id: 'chamomilla',
    name: 'Chamomilla',
    latinName: 'Matricaria chamomilla',
    family: 'Plant',
    origin: 'German Chamomile (Asteraceae)',
    description: 'The "Opium of Homeopathy." Primarily a remedy for children and hypersensitive individuals with unbearable pain.',
    keyCharacteristics: [
      'Extraordinary irritability and peevishness',
      'One cheek red, the other pale',
      'Unbearable pain with numbness',
      'Wants to be carried and petted'
    ],
    modalities: {
      better: ['Being carried', 'Fast motion', 'Warm, wet weather'],
      worse: ['Anger', 'Nights', 'Open air', 'Cold']
    },
    thermal: 'Hot',
    thirst: 'Thirsty for cold drinks.',
    clinicalApplications: ['Dentition', 'Colic', 'Otitis media', 'Dysmenorrhea'],
    comparisons: [
      { id: 'pulsatilla', name: 'Pulsatilla', keyDifference: 'Chamomilla is angry when carried; Pulsatilla is comforted/appeased.' }
    ],
    relatedAilments: []
  },
  {
    id: 'gelsemium',
    name: 'Gelsemium Sempervirens',
    latinName: 'Gelsemium sempervirens',
    family: 'Plant',
    origin: 'Yellow Jasmine (Loganiaceae)',
    description: 'The remedy of the three "Ds": Drowsiness, Dullness, and Dizziness.',
    keyCharacteristics: [
      'Complete muscular relaxation and prostration',
      'Eyelids heavy, cannot keep them open',
      'Ailments from bad news or stage fright',
      'Thirstlessness is key'
    ],
    modalities: {
      better: ['Profuse urination', 'Open air', 'Continued motion'],
      worse: ['Damp weather', 'Emotions', 'Thinking of symptoms']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    clinicalApplications: ['Influenza', 'Stage fright', 'Paralysis', 'Dull headaches'],
    comparisons: [
      { id: 'bryonia', name: 'Bryonia', keyDifference: 'Bryonia is worse for motion; Gelsem is often better for continued motion.' }
    ],
    relatedAilments: []
  },
  {
    id: 'ignatia',
    name: 'Ignatia Amara',
    latinName: 'Strychnos ignatii',
    family: 'Plant',
    origin: 'St. Ignatius Bean (Loganiaceae)',
    description: 'The "Homeopathic Prozac." A remedy of contradictions and hysterical manifestations, especially from grief.',
    keyCharacteristics: [
      'Rapid change of mental and physical states',
      'Frequent sighing and sobbing',
      'Lump in throat (Globus hystericus)',
      'Sore throat better by swallowing solids'
    ],
    modalities: {
      better: ['Change of position', 'Pressure', 'Swallowing solids'],
      worse: ['Tobacco smoke', 'Coffee', 'Consolation']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless during chill.',
    clinicalApplications: ['Acute grief', 'Hysteria', 'Insomnia', 'Emotional shocks'],
    comparisons: [
      { id: 'nat-mur', name: 'Natrum Mur', keyDifference: 'Ignatia is acute/rapid; Nat-Mur is chronic/deep-seated grief.' }
    ],
    relatedAilments: []
  },
  {
    id: 'merc-sol',
    name: 'Mercurius Solubilis',
    latinName: 'Quicksilver',
    family: 'Mineral',
    origin: 'Hydrargyrum',
    description: 'A "human thermometer." Extremely sensitive to temperature changes. Indicated for suppurative and destructive processes.',
    keyCharacteristics: [
      'Profuse, offensive, oily sweat that does not relieve',
      'Imprint of teeth on a flabby, moist tongue',
      'Intense thirst with a moist mouth',
      'Worse at night and from the warmth of bed'
    ],
    modalities: {
      better: ['Moderate temperature'],
      worse: ['At night', 'Warmth of bed', 'Damp weather', 'Sweating']
    },
    thermal: 'Ambi-thermal',
    thirst: 'Intense thirst for cold water.',
    clinicalApplications: ['Ulcers', 'Glandular swellings', 'Syphilitic miasm', 'Dysentery'],
    comparisons: [
      { id: 'hepar-sulph', name: 'Hepar Sulph', keyDifference: 'Hepar is intensely chilly; Merc is sensitive to both extremes.' }
    ],
    relatedAilments: []
  },
  {
    id: 'phosphorus',
    name: 'Phosphorus',
    latinName: 'Phosphorus',
    family: 'Mineral',
    origin: 'The Element',
    description: 'The remedy of "diffusion." Suited to tall, slender persons with fair skin and sanguine temperament. Deep-seated hemorrhagic tendency.',
    keyCharacteristics: [
      'Desires cold drinks, but vomits them when they become warm in stomach',
      'Fear of being alone and of thunderstorms',
      'Hemorrhagic diathesis (bleeding from any orifice)',
      'Over-sensitive to all external impressions'
    ],
    modalities: {
      better: ['Eating', 'Sleep', 'Cold food', 'Rubbing'],
      worse: ['Evening', 'Lying on left side', 'Thunderstorms']
    },
    thermal: 'Chilly',
    thirst: 'Great thirst for icy cold water.',
    clinicalApplications: ['Hepatitis', 'Pneumonia', 'Fear/Anxiety', 'Bleeding gums'],
    comparisons: [
      { id: 'arsenicum', name: 'Arsenicum', keyDifference: 'Arsenicum wants warmth; Phosphorus wants cold drinks.' }
    ],
    relatedAilments: []
  },
  {
    id: 'sulphur',
    name: 'Sulphur',
    latinName: 'Sulphur',
    family: 'Mineral',
    origin: 'Brimstone',
    description: 'The "King of Remedies." The chief anti-psoric remedy. Suited to the "ragged philosopher"—dirty, unkempt, but highly intellectual.',
    keyCharacteristics: [
      'Burning sensations (soles, palms, vertex)',
      'Aversion to bathing (it aggravates)',
      'Hungry at 11 AM (cannot wait for lunch)',
      'Voluptuous itching (feels good to scratch until it bleeds)'
    ],
    modalities: {
      better: ['Dry, warm weather', 'Lying on right side'],
      worse: ['Standing', 'Warmth of bed', '11 AM', 'Bathing']
    },
    thermal: 'Hot',
    thirst: 'Drinks much, eats little.',
    clinicalApplications: ['Eczema', 'Psoric miasm', 'Diarrhea (driving out of bed)', 'Chronic relapses'],
    comparisons: [
      { id: 'psorinum', name: 'Psorinum', keyDifference: 'Sulphur is hot; Psorinum is intensely chilly.' }
    ],
    relatedAilments: []
  },
  {
    id: 'silicea',
    name: 'Silicea Terra',
    latinName: 'Silica',
    family: 'Mineral',
    origin: 'Pure Flint',
    description: 'The "Homeopathic Surgeon." Known for its ability to expel foreign bodies and promote suppuration. The remedy of "grit" or lack of it.',
    keyCharacteristics: [
      'Offensive, sour-smelling foot sweat',
      'Sensitive to cold air; wraps head up warmly',
      'Yielding disposition with an underlying lack of self-confidence',
      'Every hurt suppurates'
    ],
    modalities: {
      better: ['Warmth', 'Wrapping head up', 'Summer'],
      worse: ['New moon', 'Cold', 'Uncovering', 'Draft of air']
    },
    thermal: 'Chilly',
    thirst: 'Thirsty, but cold drinks cause shaking.',
    clinicalApplications: ['Abscesses', 'Weak nails', 'Scars', 'Enlarged glands'],
    comparisons: [
      { id: 'pulsatilla', name: 'Pulsatilla', keyDifference: 'Pulsatilla is better for uncovering; Silicea must be covered.' }
    ],
    relatedAilments: []
  },
  {
    id: 'thuja',
    name: 'Thuja Occidentalis',
    latinName: 'Thuja occidentalis',
    family: 'Plant',
    origin: 'Arbor Vitae (Cupressaceae)',
    description: 'The king of anti-sycotic remedies. Suited to conditions arising from suppressions and "overgrowths."',
    keyCharacteristics: [
      'Fixed ideas (as if a living being is in abdomen)',
      'Warts, polyps, and condylomata',
      'Sweat only on uncovered parts',
      'Splitting nails and brittle hair'
    ],
    modalities: {
      better: ['Warmth', 'Rubbing', 'Sneezing'],
      worse: ['3 AM and 3 PM', 'Cold/Damp', 'After breakfast']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    clinicalApplications: ['Warts', 'Vaccination effects', 'Prostate issues', 'Chronic skin eruptions'],
    comparisons: [
      { id: 'nit-acid', name: 'Nitric Acid', keyDifference: 'Nitric acid has sticking pains (like splinters); Thuja has more fleshy overgrowths.' }
    ],
    relatedAilments: []
  },
  {
    id: 'hepar-sulph',
    name: 'Hepar Sulphuris Calcareum',
    latinName: 'Calcium Sulphide',
    family: 'Mineral',
    origin: 'Hahnemann\'s Calcium Sulphide',
    description: 'The "Homeopathic Knife." A remedy that promotes suppuration when needed or stops it. Characterized by extreme sensitivity to cold, touch, and pain.',
    keyCharacteristics: [
      'Extremely chilly; sensitive to the slightest draft of air',
      'Pains are sticking, like a splinter or a fishbone in the throat',
      'Intense sensitivity to touch and pain; faints from pain',
      'Sour-smelling discharges and sweat'
    ],
    modalities: {
      better: ['Warmth', 'Wrapping up warmly', 'Damp weather'],
      worse: ['Cold, dry weather', 'Draft of air', 'Touch', 'Night']
    },
    thermal: 'Chilly',
    thirst: 'Thirsty for warm drinks.',
    clinicalApplications: ['Tonsillitis with splinter-like pain', 'Abscesses', 'Boils', 'Croupy cough'],
    comparisons: [
      { id: 'silicea', name: 'Silicea', keyDifference: 'Both are chilly and productive, but Hepar is more sensitive to touch and has sticking pains.' }
    ],
    relatedAilments: []
  },
  {
    id: 'calcarea-phos',
    name: 'Calcarea Phosphorica',
    latinName: 'Calcium Phosphate',
    family: 'Mineral',
    origin: 'Phosphate of Lime',
    description: 'A major constitutional and tissue remedy. Primarily acts on the bones, teeth, and glands. Suited to "growing" children and adolescents.',
    keyCharacteristics: [
      'Slow development of teeth and bones',
      'Desire for smoked meats and salt',
      'School-girl headaches; worse from mental exertion',
      'Dissatisfied, wants to go from place to place'
    ],
    modalities: {
      better: ['Summer', 'Warm, dry weather'],
      worse: ['Damp, cold weather', 'Melting snow', 'Changes of weather']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for large quantities of water.',
    clinicalApplications: ['Rickets', 'Delayed dentition', 'Anemia', 'Fractures (slow union)'],
    comparisons: [
      { id: 'calc-carb', name: 'Calcarea Carb', keyDifference: 'Calc-Carb is fleshy/chubby; Calc-Phos is thin/emaciated.' }
    ],
    relatedAilments: []
  }
];
