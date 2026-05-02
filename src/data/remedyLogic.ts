import { Activity, HeartPulse, Droplets, Thermometer, Wind, Zap, HelpCircle } from 'lucide-react';

export type ModalityAnswer = 'better' | 'worse' | 'ailment' | 'neutral';

export interface RemedyOption {
  id: string;
  label: string;
  scores: Record<string, number>; // remedy id -> score
  healthSuggestion?: string; // DYNAMIC Health Suggestion
  redFlag?: boolean;
}

export interface RemedyQuestion {
  id: string;
  question: string;
  options: RemedyOption[];
}

export interface RemedyCondition {
  id: string;
  label: string;
  icon: any;
  questions: RemedyQuestion[];
  bodyPart?: string;
}

export const remedyConditions: RemedyCondition[] = [
  {
    id: 'headache',
    label: 'Headache',
    icon: Zap,
    bodyPart: 'head',
    questions: [
      {
        id: 'type',
        question: 'How would you describe the pain?',
        options: [
          { id: 'throbbing', label: 'Throbbing, pulsating, intense', scores: { belladonna: 3, glonoinum: 2 } },
          { id: 'bursting', label: 'Bursting, splitting, heavy', scores: { bryonia: 3, natrum_mur: 2 } },
          { id: 'dull', label: 'Dull, heavy, band-like', scores: { gelsemium: 3 } },
          { id: 'stitching', label: 'Sharp, stitching pain', scores: { bryonia: 2, ignatia: 2 } },
        ]
      },
      {
        id: 'worse',
        question: 'What makes the headache worse?',
        options: [
          { id: 'movement', label: 'Worse from any movement', scores: { bryonia: 3, belladonna: 1 }, healthSuggestion: 'Rest completely in a quiet and dim environment.' },
          { id: 'light', label: 'Worse from light and noise', scores: { belladonna: 3, natrum_mur: 2 }, healthSuggestion: 'Rest in a dim, quiet room. Avoid screens.' },
          { id: 'sun', label: 'Worse from sun exposure', scores: { glonoinum: 3, natrum_mur: 3 }, healthSuggestion: 'Cool your head and rest in the shade. Drink plenty of water.' },
        ]
      },
      {
        id: 'better',
        question: 'What makes the headache better?',
        options: [
          { id: 'pressure', label: 'Better with firm pressure', scores: { bryonia: 2, belladonna: 1 }, healthSuggestion: 'Apply gentle, firm pressure or tie a tight band around the head.' },
          { id: 'lying', label: 'Better lying in dark room', scores: { belladonna: 2, natrum_mur: 2 }, healthSuggestion: 'Find a comfortable spot to lie down undisturbed.' },
          { id: 'cold', label: 'Better from cold application', scores: { belladonna: 2 }, healthSuggestion: 'Try applying a cold compress to the forehead.' },
        ]
      }
    ]
  },
  {
    id: 'eye_strain',
    label: 'Eye Strain / Redness',
    icon: HelpCircle,
    bodyPart: 'eyes',
    questions: [
      {
        id: 'type',
        question: 'What is the primary sensation in your eyes?',
        options: [
          { id: 'burning', label: 'Burning, itchy, watery', scores: { euphrasia: 3, arsenicum: 1 } },
          { id: 'heavy', label: 'Heavy, tired, hard to keep open', scores: { gelsemium: 3, ruta: 2 } },
          { id: 'painful', label: 'Painful, feels like sand in eyes', scores: { allium_cepa: 2, euphrasia: 2 } },
        ]
      }
    ]
  },
  {
    id: 'cold_cough',
    label: 'Cold & Cough',
    icon: Wind,
    bodyPart: 'throat',
    questions: [
      {
        id: 'cough_type',
        question: 'What type of cough or cold is it?',
        options: [
          { id: 'dry', label: 'Dry, tickling, hard cough', scores: { bryonia: 3, spongia: 3 } },
          { id: 'loose', label: 'Loose, rattling, productive', scores: { hepar_sulph: 3, pulsatilla: 2 } },
          { id: 'runny', label: 'Runny nose, sneezing', scores: { allium_cepa: 3, natrum_mur: 2 } },
        ]
      }
    ]
  },
  {
    id: 'acidity_stomach',
    label: 'Acidity & Bloating',
    icon: Droplets,
    bodyPart: 'stomach',
    questions: [
      {
        id: 'type',
        question: 'How does your stomach feel?',
        options: [
          { id: 'burning', label: 'Burning, sour belching', scores: { arsenicum: 3, robinia: 3 } },
          { id: 'bloating', label: 'Heavy bloating, lots of gas', scores: { lycopodium: 3, carbo_veg: 3 } },
          { id: 'nausea', label: 'Nausea, feeling of sickness', scores: { nux_vomica: 3, ipecac: 3 } },
        ]
      }
    ]
  },
  {
    id: 'skin_allergy',
    label: 'Skin Itch / Allergy',
    icon: Activity,
    bodyPart: 'skin',
    questions: [
      {
        id: 'itch_type',
        question: 'Describe the skin issue:',
        options: [
          { id: 'burning_itch', label: 'Intense burning itch, better by heat', scores: { arsenicum: 3 } },
          { id: 'voluptuous', label: 'Voluptuous itching, better by cold/scratching', scores: { sulphur: 3 } },
          { id: 'dry', label: 'Dry, scaly, cracked skin', scores: { petroleum: 3, sulphur: 1 } },
        ]
      }
    ]
  },
  {
    id: 'ear_pain',
    label: 'Earache / Pressure',
    icon: HelpCircle,
    bodyPart: 'ears',
    questions: [
      {
        id: 'pain',
        question: 'What type of ear pain are you experiencing?',
        options: [
          { id: 'throbbing', label: 'Throbbing, sharp, red ear', scores: { belladonna: 3, chamomilla: 2 } },
          { id: 'blocked', label: 'Feels blocked, hearing muffled', scores: { pulsatilla: 3, kali_mur: 2 } },
          { id: 'sensitive', label: 'Extremely sensitive to cold touch', scores: { hepar_sulph: 3 } },
        ]
      }
    ]
  },
  {
    id: 'back_pain',
    label: 'Back & Spine Pain',
    icon: Activity,
    bodyPart: 'spine',
    questions: [
      {
        id: 'sensation',
        question: 'How does the back pain feel?',
        options: [
          { id: 'stiffness', label: 'Stiffness, better by movement', scores: { rhus_tox: 3 } },
          { id: 'sharp', label: 'Sharp pain, worse by movement', scores: { bryonia: 3 } },
          { id: 'aching', label: 'Aching heavily, feels bruised', scores: { arnica: 3 } },
        ]
      }
    ]
  }
];

export const remedyProfiles: Record<string, { name: string; reason: string; slug: string }> = {
  belladonna: { name: 'Belladonna', reason: 'Matches sudden intensity, heat, throbbing pain, and sensitivity to light.', slug: 'belladonna' },
  bryonia: { name: 'Byronia Alba', reason: 'Matches symptoms that are significantly worse from any movement and better with absolute rest.', slug: 'bryonia' },
  gelsemium: { name: 'Gelsemium', reason: 'Matches feelings of dullness, heaviness, weakness, and lack of thirst.', slug: 'gelsemium' },
  glonoinum: { name: 'Glonoinum', reason: 'Matches throbbing headaches, especially those caused by sun exposure or heat.', slug: 'glonoinum' },
  natrum_mur: { name: 'Natrum Mur', reason: 'Matches headaches from grief/stress, or those worse in the sun.', slug: 'natrum-muriaticum' },
  aconitum: { name: 'Aconitum Napellus', reason: 'Matches sudden onset of symptoms, especially after exposure to cold, dry wind.', slug: 'aconite' },
  nux_vomica: { name: 'Nux Vomica', reason: 'Matches symptoms triggered by overindulgence (spicy food, alcohol), stress, and distinct chilliness.', slug: 'nux-vomica' },
  rhus_tox: { name: 'Rhus Tox', reason: 'Matches aches/chills that improve with continued motion and warmth.', slug: 'rhus' },
  arsenicum: { name: 'Arsenicum Album', reason: 'Matches burning pains, anxiety, restlessness, and desiring frequent small sips of water.', slug: 'arsenicum-album' },
  pulsatilla: { name: 'Pulsatilla', reason: 'Matches symptoms worse from rich foods, better in open air, and a general lack of thirst.', slug: 'pulsatilla' },
  spongia: { name: 'Spongia', reason: 'Matches dry, barking coughs, especially those improving with warm drinks.', slug: 'spongia' },
  hepar_sulph: { name: 'Hepar Sulph', reason: 'Matches rattling coughs and extreme sensitivity to cold drafts.', slug: 'hepar-sulph' },
  allium_cepa: { name: 'Allium Cepa', reason: 'Matches runny nose with watery eyes, typical of acute colds.', slug: 'allium-cepa' },
  drosera: { name: 'Drosera', reason: 'Matches deep, barking coughs that are significantly worse when lying down at night.', slug: 'drosera' },
  robinia: { name: 'Robinia', reason: 'Matches intensely sour belching and acidity.', slug: 'robinia' },
  lycopodium: { name: 'Lycopodium', reason: 'Matches heavy bloating and gas, especially worse in late afternoon or from eating a few bites.', slug: 'lycopodium' },
  carbo_veg: { name: 'Carbo Veg', reason: 'Matches severe bloating that relies on burping/passing gas for relief.', slug: 'carbo-veg' },
  ignatia: { name: 'Ignatia', reason: 'Matches physical symptoms triggered by sudden emotional stress, grief, or worry.', slug: 'ignatia' },
  ipecac: { name: 'Ipecac', reason: 'Matches constant nausea that is not relieved by vomiting.', slug: 'ipecac' },
  euphrasia: { name: 'Euphrasia', reason: 'Specific for eye symptoms like burning, watering, and irritation.', slug: 'euphrasia' },
  ruta: { name: 'Ruta Graveolens', reason: 'Excellent for eye strain from over-exertion (reading, screens) or bruised sensations.', slug: 'ruta' },
  sulphur: { name: 'Sulphur', reason: 'Deep-acting remedy for intense itching, skin redness, and burning sensations.', slug: 'sulphur' },
  petroleum: { name: 'Petroleum', reason: 'Indicated for dry, cracked skin, often worse in winter.', slug: 'petroleum' },
  arnica: { name: 'Arnica Montana', reason: 'The go-to remedy for bruised, sore sensations and injuries.', slug: 'arnica' },
  chamomilla: { name: 'Chamomilla', reason: 'Matches extreme sensitivity to pain, often accompanied by irritability.', slug: 'chamomilla' },
};
