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
    id: 'pcos',
    title: 'PCOS & Hormonal Balance',
    excerpt: 'Mapping hormonal cycles and metabolic health markers.',
    description: 'Hormonal imbalances like PCOS reflect a constitutional shift. Homeopathic treatment focuses on reviving the innate hormonal rhythm and addressing metabolic sluggishness.',
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
  },
  {
    id: 'eczema',
    title: 'Eczema & Skin Rash',
    excerpt: 'Identifying internal triggers for physical skin manifestations.',
    description: 'Skin is the body\'s largest organ of elimination. Homeopathy treats eczema not as a skin problem, but as an internal system trying to vent. Suppressing the rash can lead to deeper issues like asthma.',
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
    id: 'anxiety',
    title: 'Stress & Anxiety',
    excerpt: 'Emotional patterns and their physical impact on health.',
    description: 'Anxiety is a state of heightened sensitivity. Homeopathy helps stabilize the nervous threshold, making one more resilient to mental and emotional stressors.',
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
    id: 'asthma',
    title: 'Asthma & Allergies',
    excerpt: 'Respiratory patterns and environmental sensitivity.',
    description: 'Asthmatic patterns often correlate with deeper inflammatory states. Homeopathy seeks to desensitize the respiratory tract and improve the overall constitution.',
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
  }
];
