
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
  }
];
