export interface ComparisonData {
  id: string;
  name: string;
  origin: string;
  tendency: string;
  keyCharacteristic: string;
  betterWith: string[];
  worseWith: string[];
  thermal: 'Chilly' | 'Hot' | 'Ambi-thermal';
  thirst: string;
}

export const comparisonRemedies: ComparisonData[] = [
  {
    id: 'aconite',
    name: 'Aconitum Napellus',
    origin: 'Plant (Monkshood)',
    tendency: 'Sudden, acute onset',
    keyCharacteristic: 'Fear of death, intense restlessness',
    betterWith: ['Open air', 'Rest'],
    worseWith: ['Cold dry wind', 'Midnight', 'Crowds'],
    thermal: 'Chilly',
    thirst: 'Burning thirst for cold water'
  },
  {
    id: 'arnica',
    name: 'Arnica Montana',
    origin: 'Plant (Leopard\'s Bane)',
    tendency: 'Trauma, bruising, soreness',
    keyCharacteristic: 'Sore, lame, bruised feeling',
    betterWith: ['Lying down', 'Head low'],
    worseWith: ['Touch', 'Damp cold', 'Motion'],
    thermal: 'Chilly',
    thirst: 'None special'
  },
  {
    id: 'arsenicum-album',
    name: 'Arsenicum Album',
    origin: 'Mineral (Arsenic)',
    tendency: 'Exhaustion, anxiety, chilliness',
    keyCharacteristic: 'Burning pains better by heat',
    betterWith: ['Heat', 'Hot drinks', 'Company'],
    worseWith: ['Midnight', 'Cold drinks', 'Solitude'],
    thermal: 'Chilly',
    thirst: 'Unquenchable thirst for small sips'
  },
  {
    id: 'belladonna',
    name: 'Belladonna',
    origin: 'Plant (Deadly Nightshade)',
    tendency: 'Redness, heat, throbbing',
    keyCharacteristic: 'Sudden explosions of symptoms',
    betterWith: ['Semi-erect position', 'Warmth'],
    worseWith: ['Light', 'Noise', 'Drafts', '3 PM'],
    thermal: 'Hot',
    thirst: 'Thirstless (but dry mouth)'
  },
  {
    id: 'bryonia',
    name: 'Bryonia Alba',
    origin: 'Plant (Wild Hops)',
    tendency: 'Dryness of mucous membranes',
    keyCharacteristic: 'Worse for the least motion',
    betterWith: ['Absolute rest', 'Pressure on painful part'],
    worseWith: ['Motion', 'Heat', 'Exertion'],
    thermal: 'Hot',
    thirst: 'Great thirst for large amounts of cold water'
  },
  {
    id: 'pulsatilla',
    name: 'Pulsatilla',
    origin: 'Plant (Wind Flower)',
    tendency: 'Changeable symptoms, emotional',
    keyCharacteristic: 'Thirstless with all complaints',
    betterWith: ['Open air', 'Cold food/drink', 'Consolation'],
    worseWith: ['Warm room', 'Evening', 'Rich food'],
    thermal: 'Hot',
    thirst: 'Thirstless'
  },
];
