import { Zap, Droplets, Wind, Sparkles, Shield, Sun, Activity, Brain } from 'lucide-react';

export interface ConditionPattern {
  name: string;
  tendency: string;
  modalities: string[];
  remedySuggestion?: string;
}

export interface Condition {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  icon: any;
  color: string;
  category: string;
  imageUrl?: string;
  patterns: ConditionPattern[];
  relatedRemedies: { id: string; name: string }[];
  relatedBlogPosts?: string[];
}

export const conditionsData: Condition[] = [
  {
    id: 'migraine',
    title: 'Migraine & Headaches',
    excerpt: 'Understanding vascular and nervous system patterns in chronic headaches.',
    description: 'Migraines are not just headaches; they are complex neurological events. In homeopathy, we look for the specific nature of the pain—is it throbbing, blinding, or associated with nausea? The modalities (what makes it better or worse) are key to finding the right remedy.',
    imageUrl: 'https://images.unsplash.com/photo-1517817748493-49ec54a32465?auto=format&fit=crop&q=80&w=1000',
    icon: Zap,
    color: 'bg-primary',
    category: 'Nervous System',
    patterns: [
      {
        name: 'Sudden & Throbbing',
        tendency: 'Sharp, violent pains that come and go suddenly.',
        modalities: ['Worse from: Noise, Light, Movement', 'Better from: Dark Room, Pressure, Rest']
      },
      {
        name: 'Heavy & Burdened',
        tendency: 'Dull ache that feels like a heavy band around the head.',
        modalities: ['Worse from: Damp weather, Mental exertion', 'Better from: Fresh air, Cold applications']
      }
    ],
    relatedRemedies: [
      { id: 'belladonna', name: 'Belladonna' },
      { id: 'bryonia', name: 'Bryonia' },
      { id: 'aconite', name: 'Aconite' }
    ],
    relatedBlogPosts: ['migraine-remedies']
  },
  {
    id: 'acidity',
    title: 'Acidity & GERD',
    excerpt: 'Decoding digestive heat and metabolic patterns.',
    description: 'Digestive acidity arises when the "fire" of digestion is misdirected. Homeopathy addresses the underlying sensitivity to foods and the nervous system components of digestion.',
    imageUrl: 'https://images.unsplash.com/photo-1515598391980-70a20293a387?auto=format&fit=crop&q=80&w=1000',
    icon: Droplets,
    color: 'bg-emerald-600',
    category: 'Digestive',
    patterns: [
      {
        name: 'Burning & Sour',
        tendency: 'Heartburn with sour eructations and burning in chest.',
        modalities: ['Worse from: Late nights, Spicy food', 'Better from: Cold drinks, Small meals']
      },
      {
        name: 'Bloated & Sluggish',
        tendency: 'Feeling full after just a few bites, slow digestion.',
        modalities: ['Worse from: Tight clothing, Starchy food', 'Better from: Warm drinks, Passing gas']
      }
    ],
    relatedRemedies: [
      { id: 'arsenicum-album', name: 'Arsenicum Album' },
      { id: 'pulsatilla', name: 'Pulsatilla' },
      { id: 'nux-vomica', name: 'Nux Vomica' }
    ]
  },
  {
    id: 'skin-health',
    title: 'Skin Conditions (Eczema, Psoriasis)',
    excerpt: 'Identifying internal triggers for physical skin manifestations.',
    description: 'Skin is the body\'s largest organ of elimination. Homeopathy treats eczema not as a skin problem, but as an internal system trying to vent. Suppressing the rash can lead to deeper issues like asthma.',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000',
    icon: Sparkles,
    color: 'bg-rose-500',
    category: 'Dermatology',
    patterns: [
      {
        name: 'Dry & Itchy',
        tendency: 'Intense itching, worse at night with dry, scaly skin.',
        modalities: ['Worse from: Bed warmth, Contact with wool', 'Better from: Cool air, Scratching until it bleeds']
      },
      {
        name: 'Moist & Burning',
        tendency: 'Sticky discharge, skin feels raw and hot.',
        modalities: ['Worse from: Humid weather, Washing', 'Better from: Exposure to air']
      }
    ],
    relatedRemedies: [
      { id: 'arsenicum-album', name: 'Arsenicum Album' },
      { id: 'sulphur', name: 'Sulphur' },
      { id: 'graphites', name: 'Graphites' }
    ]
  },
  {
    id: 'stress-anxiety',
    title: 'Stress & Anxiety',
    excerpt: 'Emotional patterns and their physical impact on health.',
    description: 'Anxiety is a state of heightened sensitivity. Homeopathy helps stabilize the nervous threshold, making one more resilient to mental and emotional stressors.',
    imageUrl: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&q=80&w=1000',
    icon: Shield,
    color: 'bg-blue-600',
    category: 'Mental Health',
    patterns: [
      {
        name: 'Anticipatory Anxiety',
        tendency: 'Nervousness before events, trembling, frequent urination.',
        modalities: ['Worse from: Crowds, Thinking about the future', 'Better from: Movement, Constant activity']
      }
    ],
    relatedRemedies: [
      { id: 'aconite', name: 'Aconite' },
      { id: 'arsenicum-album', name: 'Arsenicum Album' },
      { id: 'gelsemium', name: 'Gelsemium' }
    ]
  },
  {
    id: 'respiratory-health',
    title: 'Respiratory (Asthma, Allergies)',
    excerpt: 'Respiratory patterns and environmental sensitivity.',
    description: 'Asthmatic patterns often correlate with deeper inflammatory states. Homeopathy seeks to desensitize the respiratory tract and improve the overall constitution.',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000',
    icon: Wind,
    color: 'bg-sky-500',
    category: 'Respiratory',
    patterns: [
      {
        name: 'Nightly Tightness',
        tendency: 'Difficulty breathing mostly at night, feels like chest is constricted.',
        modalities: ['Worse from: Lying down, Cold air', 'Better from: Sitting up, Warm drinks']
      }
    ],
    relatedRemedies: [
      { id: 'arsenicum-album', name: 'Arsenicum Album' },
      { id: 'bryonia', name: 'Bryonia' },
      { id: 'spongia', name: 'Spongia' }
    ]
  },
  {
    id: 'chronic-pain',
    title: 'Chronic Pain (Arthritis)',
    excerpt: 'Structural and inflammatory patterns in joints and muscles.',
    description: 'Chronic pain reflects a systemic inflammatory state. Homeopathy focuses on the modalities—how the pain changes with weather, movement, and time of day—to find the matching remedy.',
    imageUrl: 'https://images.unsplash.com/photo-1559757117-574196d2d3c5?auto=format&fit=crop&q=80&w=1000',
    icon: Activity,
    color: 'bg-orange-600',
    category: 'Musculoskeletal',
    patterns: [
      {
        name: 'Stiffness & Weather Sensitivity',
        tendency: 'Pain that is worse in damp weather and initial movement.',
        modalities: ['Worse from: Cold damp, Rest, First motion', 'Better from: Continued motion, Warmth']
      }
    ],
    relatedRemedies: [
      { id: 'rhus-tox', name: 'Rhus Tox' },
      { id: 'bryonia', name: 'Bryonia' }
    ]
  },
  {
    id: 'digestive-issues',
    title: 'Digestive Issues (IBS & Acidity)',
    excerpt: 'Decoding digestive heat and metabolic patterns.',
    description: 'Digestive issues arise when the metabolic fire is disrupted. Homeopathy addresses the underlying sensitivity to specific foods and the nervous system components of digestion.',
    imageUrl: 'https://images.unsplash.com/photo-1515598391980-70a20293a387?auto=format&fit=crop&q=80&w=1000',
    icon: Droplets,
    color: 'bg-emerald-600',
    category: 'Gastrointestinal',
    patterns: [
      {
        name: 'Burning & Sensitivity',
        tendency: 'Heartburn with sour eructations and intolerance to certain foods.',
        modalities: ['Worse from: Spicy food, Late meals', 'Better from: Small frequent meals, Gentle walking']
      }
    ],
    relatedRemedies: [
      { id: 'nux-vomica', name: 'Nux Vomica' },
      { id: 'pulsatilla', name: 'Pulsatilla' },
      { id: 'lycopodium', name: 'Lycopodium' }
    ]
  },
  {
    id: 'immunity-wellness',
    title: 'Immunity & Vitality',
    excerpt: 'Mapping cyclical vitality and constitutional strength.',
    description: 'Immunity is not just about fighting germs; it\'s about the body\'s ability to maintain equilibrium. Constitutional homeopathy aims to strengthen this global vitality.',
    imageUrl: 'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&q=80&w=1000',
    icon: Shield,
    color: 'bg-teal-500',
    category: 'Constitutional',
    patterns: [
      {
        name: 'Cyclical Exhaustion',
        tendency: 'Frequent infections when stressed or during season changes.',
        modalities: ['Worse from: Over-exertion, Lack of sleep', 'Better from: Deep rest, Balanced diet']
      }
    ],
    relatedRemedies: [
      { id: 'silicea', name: 'Silicea' },
      { id: 'calc-carb', name: 'Calcarea Carb' }
    ]
  },
  {
    id: 'pcos',
    title: 'PCOS & Hormonal Balance',
    excerpt: 'Mapping hormonal cycles and metabolic health markers.',
    description: 'Hormonal imbalances like PCOS reflect a constitutional shift. Homeopathic treatment focuses on reviving the innate hormonal rhythm and addressing metabolic sluggishness.',
    imageUrl: 'https://images.unsplash.com/photo-1594820878347-f584c582531a?auto=format&fit=crop&q=80&w=1000',
    icon: Activity,
    color: 'bg-indigo-600',
    category: 'Endocrine',
    patterns: [
      {
        name: 'Irregular & Sluggish',
        tendency: 'Delayed cycles, weight gain especially around abdomen.',
        modalities: ['Worse from: Sweet foods, Cold weather', 'Better from: Exercise, Heat']
      }
    ],
    relatedRemedies: [
      { id: 'pulsatilla', name: 'Pulsatilla' },
      { id: 'sepia', name: 'Sepia' }
    ]
  }
];
