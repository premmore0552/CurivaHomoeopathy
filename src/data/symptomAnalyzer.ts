import { Zap, Activity, Thermometer, Wind, Droplets, Shield, BrainCircuit, Info } from 'lucide-react';

export type SymptomCategory = 'head' | 'chest' | 'abdomen' | 'limbs' | 'skin' | 'general';

export interface SymptomQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    label: string;
    patternTag?: string; // e.g. "intense", "rest-relief"
    guidance?: string;
    redFlag?: boolean;
  }[];
}

export interface PatternInsight {
  name: string;
  description: string;
}

export const patternDatabase: Record<string, PatternInsight> = {
  'acute-intense': {
    name: 'Acute Intense Pattern',
    description: 'Characterized by a rapid onset and high intensity of symptoms. The body is reacting strongly and needs immediate support and rest.'
  },
  'rest-relief': {
    name: 'Rest-Relief Pattern',
    description: 'Symptoms are noticeably linked to physical exertion and find significant relief in absolute quiet and stillness.'
  },
  'motion-relief': {
    name: 'Motion-Relief Pattern',
    description: 'The body feels stiff or stagnant, and symptoms tend to improve with gentle, continuous movement.'
  },
  'heat-sensitive': {
    name: 'Heat-Sensitive Pattern',
    description: 'The system is reactive to warmth or high temperatures, often feeling better in cool, fresh air.'
  },
  'cold-sensitive': {
    name: 'Cold-Sensitive Pattern',
    description: 'A tendency toward lack of heat, where external warmth or covering provides significant comfort.'
  },
  'stress-influenced': {
    name: 'Stress-Influenced Pattern',
    description: 'Physical expressions are closely tied to mental or emotional tension, reflecting a somatic response to stress.'
  },
  'low-vitality': {
    name: 'Low Vitality Pattern',
    description: 'Symptoms are accompanied by significant dullness, heaviness, or weakness, suggesting the system is overwhelmed.'
  }
};

export const adaptiveQuestions: Record<SymptomCategory, SymptomQuestion[]> = {
  head: [
    {
      id: 'sensation',
      question: 'What is the primary sensation in your head?',
      options: [
        { id: 'throbbing', label: 'Throbbing / Pulsating', patternTag: 'acute-intense' },
        { id: 'heavy', label: 'Dull / Heavy Band', patternTag: 'low-vitality' },
        { id: 'sharp', label: 'Sharp / Stabbing', patternTag: 'acute-intense' },
        { id: 'burning', label: 'Burning / Heat', patternTag: 'heat-sensitive' },
      ]
    },
    {
      id: 'onset',
      question: 'How did it start?',
      options: [
        { id: 'sudden', label: 'Sudden / Immediate', patternTag: 'acute-intense' },
        { id: 'gradual', label: 'Gradual / Over hours', patternTag: 'low-vitality' },
      ]
    },
    {
      id: 'modalities',
      question: 'What makes you feel better?',
      options: [
        { id: 'rest', label: 'Rest / Quiet Room', patternTag: 'rest-relief', guidance: 'Rest in a dim, quiet space.' },
        { id: 'cold', label: 'Cold Applications', patternTag: 'heat-sensitive', guidance: 'Try a cold compress.' },
        { id: 'pressure', label: 'Hard Pressure', patternTag: 'rest-relief' },
        { id: 'fresh_air', label: 'Fresh / Open Air', patternTag: 'heat-sensitive' },
      ]
    },
    {
      id: 'mental',
      question: 'Your current mental state?',
      options: [
        { id: 'irritable', label: 'Irritable / Restless', patternTag: 'acute-intense' },
        { id: 'anxious', label: 'Anxious / Overthinking', patternTag: 'stress-influenced' },
        { id: 'dull', label: 'Dull / Wants to sleep', patternTag: 'low-vitality' },
      ]
    }
  ],
  chest: [
    {
      id: 'sensation',
      question: 'Describe the chest sensation:',
      options: [
        { id: 'tight', label: 'Tightness / Constriction', patternTag: 'stress-influenced' },
        { id: 'burning', label: 'Burning / Heat', patternTag: 'heat-sensitive' },
        { id: 'heavy', label: 'Heavy / Burdened', patternTag: 'low-vitality' },
      ]
    },
    {
      id: 'modalities',
      question: 'What worsens the feeling?',
      options: [
        { id: 'movement', label: 'Movement / Activity', patternTag: 'rest-relief', guidance: 'Limit physical exertion.' },
        { id: 'lying_down', label: 'Lying Down', patternTag: 'motion-relief', guidance: 'Keep your upper body elevated.' },
        { id: 'cold_air', label: 'Cold Air', patternTag: 'cold-sensitive' },
      ]
    }
  ],
  abdomen: [
    {
      id: 'sensation',
      question: 'What is happening in your abdomen?',
      options: [
        { id: 'bloating', label: 'Heavy Bloating / Gas', patternTag: 'low-vitality' },
        { id: 'burning', label: 'Burning / Acidity', patternTag: 'heat-sensitive' },
        { id: 'cramping', label: 'Cramping / Spasms', patternTag: 'acute-intense' },
      ]
    },
    {
      id: 'modalities',
      question: 'What helps the discomfort?',
      options: [
        { id: 'warm', label: 'Warm Drinks / Heat', patternTag: 'cold-sensitive', guidance: 'Sip warm fluids.' },
        { id: 'movement', label: 'Walking / Motion', patternTag: 'motion-relief' },
        { id: 'pressure', label: 'Pressure / Doubling over', patternTag: 'rest-relief' },
      ]
    }
  ],
  limbs: [
    {
      id: 'sensation',
      question: 'How do your limbs/joints feel?',
      options: [
        { id: 'stiff', label: 'Stiff / Hard to move', patternTag: 'motion-relief' },
        { id: 'bruised', label: 'Sore / Bruised feeling', patternTag: 'low-vitality' },
        { id: 'throbbing', label: 'Throbbing / Sharp', patternTag: 'acute-intense' },
      ]
    },
    {
      id: 'modalities',
      question: 'When is it better?',
      options: [
        { id: 'motion', label: 'After walking a while', patternTag: 'motion-relief', guidance: 'Try gentle, steady movement.' },
        { id: 'rest_initial', label: 'First movement after rest', patternTag: 'rest-relief' },
        { id: 'warmth', label: 'Warmth / Applications', patternTag: 'cold-sensitive', guidance: 'Keep the area warm.' },
      ]
    }
  ],
  skin: [
    {
      id: 'sensation',
      question: 'How does the skin feel?',
      options: [
        { id: 'burning', label: 'Burning / Hot', patternTag: 'heat-sensitive' },
        { id: 'itching', label: 'Intense Itching', patternTag: 'acute-intense' },
        { id: 'dry', label: 'Dry / Cracked', patternTag: 'low-vitality' },
      ]
    },
    {
      id: 'modalities',
      question: 'What changes the itching?',
      options: [
        { id: 'cold', label: 'Better from Cold', patternTag: 'heat-sensitive', guidance: 'Apply cool, damp cloths.' },
        { id: 'heat', label: 'Better from Heat', patternTag: 'cold-sensitive' },
        { id: 'scratching', label: 'Worse after Scratching', patternTag: 'acute-intense', redFlag: true },
      ]
    }
  ],
  general: [
    {
      id: 'onset',
      question: 'How is your energy overall?',
      options: [
        { id: 'exhausted', label: 'Completely Exhausted', patternTag: 'low-vitality' },
        { id: 'restless', label: 'Restless / Can\'t sit still', patternTag: 'acute-intense' },
        { id: 'heavy', label: 'Heavy / Sleepy', patternTag: 'low-vitality' },
      ]
    },
    {
      id: 'thirst',
      question: 'What is your thirst level?',
      options: [
        { id: 'very_thirsty', label: 'Very Thirsty', patternTag: 'acute-intense' },
        { id: 'thirstless', label: 'Not Thirsty at all', patternTag: 'low-vitality' },
        { id: 'sips', label: 'Sips frequently', patternTag: 'stress-influenced' },
      ]
    }
  ]
};
