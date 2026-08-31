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
  mind?: string[];
  physical?: string[];
  clinicalApplications: string[];
  comparisons: RemedyComparison[];
  relatedAilments: { id: string; name: string }[];
  relatedBlogPosts?: string[];
  complementary?: string[];
  inimical?: string[];
  followsWell?: string[];
  imageUrl?: string;
  dosage?: string;
}

export const enhancedRemedies: RemedyDetailData[] = [
  {
    id: 'aconite',
    name: 'Aconitum Napellus',
    latinName: 'Aconitum napellus',
    family: 'Plant',
    origin: 'Monkshood (Ranunculaceae) | Prover: Hahnemann',
    description: 'Aconite is one of the most rapidly acting remedies. It is an acute, short-acting remedy where complaints appear suddenly and violently. It acts primarily on the circulation and is characterized by "Tension, Fear and Suddenness".',
    dosage: 'Acute panic/fever: 30C or 200C every 30-60 mins until relief. Shock: 200C single dose.',
    keyCharacteristics: [
      'Sudden and violent onset of symptoms',
      'Great fear and anxiety, especially fear of death',
      'Physical and mental restlessness; cannot remain still',
      'Intense thirst for large quantities of cold water',
      'Dry, hot skin with little or no sweat',
      'Pains are intolerable and driving the patient crazy'
    ],
    modalities: {
      better: ['Open air', 'Sweating'],
      worse: ['Evening and night', 'Warm room', 'Rising from bed', 'Lying on affected side', 'Dry, cold winds']
    },
    thermal: 'Hot',
    thirst: 'Intense thirst for large quantities of cold water.',
    mind: [
      "Extreme anxiety and constant fear; predicts the exact date and time of death",
      "Great restlessness; changes position frequently",
      "Oversensitivity to light, noise, and touch",
      "Music is unbearable",
      "Contra-indicated in a calm mental state"
    ],
    physical: [
      "Sudden high fever with dry, hot, red skin and severe chill",
      "Alternate red and pale face; red when sitting, pale when rising",
      "Congestive states of inflammation with intense pain",
      "Tingling, coldness and numbness in various parts",
      "Complaints from exposure to dry cold air, draft, fear, or shock"
    ],
    clinicalApplications: [
      'Acute fevers',
      'Influenza (early stage)',
      'Angina Pectoris',
      'Panic attacks and Shock',
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
    relatedBlogPosts: ['aconite'],
    complementary: ['Sulphur', 'Coffea', 'Arnica'],
    inimical: ['Merc Sol'],
    followsWell: ['Belladonna', 'Bryonia', 'Sulphur'],
    imageUrl: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'arnica',
    name: 'Arnica Montana',
    latinName: 'Arnica montana',
    family: 'Plant',
    origin: 'Leopard\'s Bane (Compositae) | Prover: Hahnemann',
    description: 'Arnica is the premier "Trauma Remedy" for falls, blunt injuries, and bruises. It acts on the blood vessels, particularly the capillaries, and is characterized by a "Sore, Lame and Bruised" feeling throughout the body, as if the patient has been beaten all over.',
    dosage: 'Trauma: 200C or 1M immediately. Muscle soreness: 30C three times daily.',
    keyCharacteristics: [
      'Sore, lame, bruised feeling all over the body, as if beaten',
      'Fear of being touched or even approached due to soreness',
      'Head hot, body and extremities cool',
      'Results of mechanical trauma, even old injuries years later',
      'Answers questions correctly while unconscious and then drifts back into stupor',
      'Ecchymosis (blue-black discoloration) from blood accumulation under tissues'
    ],
    modalities: {
      better: ['Rest', 'Lying down with head low', 'Motion (gentle)'],
      worse: ['Least touch', 'Motion', 'Pressure', 'Handling', 'Damp cold']
    },
    thermal: 'Chilly',
    thirst: 'Thirst during chill; thirstless during heat.',
    mind: [
      "Unconscious yet answers correctly when questioned, then drifts back into stupor",
      "Fear of being touched or approached; says 'I am well' when seriously ill",
      "Low muttering delirium in severe illnesses",
      "Depression, indifference, and sudden fear of death"
    ],
    physical: [
      "Ecchymosis and hemorrhages; blue-black spots from bruising or trauma",
      "Soreness and lameness of parts after overexertion, falls, or blows",
      "Recurrent small painful boils appearing one after another",
      "Involuntary stool and urine in stuporous states",
      "Upper body hot, lower body cold"
    ],
    clinicalApplications: [
      'Mechanical injuries',
      'Concussions',
      'Post-surgery recovery',
      'Muscle strain',
      'Bruising and hematomas',
      'Old injury sequelae'
    ],
    comparisons: [
      { id: 'bryonia', name: 'Bryonia', keyDifference: 'Bryonia is worse from any motion; Arnica has a bruised soreness that makes them restless.' },
      { id: 'ruta', name: 'Ruta', keyDifference: 'Arnica is for soft tissue bruises; Ruta for injury to periosteum and tendons.' }
    ],
    relatedAilments: [
      { id: 'chronic-pain', name: 'Muscle & Joint Pain' },
      { id: 'skin-health', name: 'Bruises' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'arsenicum-album',
    name: 'Arsenicum Album',
    latinName: 'Arsenic Trioxide',
    family: 'Mineral',
    origin: 'White Oxide of Arsenic (As2O3) | Prover: Hahnemann',
    description: 'Arsenicum is characterized by three great essentials: Anxiety, Restlessness, and Prostration. It is a deeply acting mineral remedy affecting every organ and tissue, with burning pains that are paradoxically relieved by heat.',
    dosage: 'Food poisoning: 30C every hour. Chronic anxiety: 200C weekly.',
    keyCharacteristics: [
      'Great restlessness; changes place continually despite extreme weakness',
      'Burning pains relieved by heat and warm applications',
      'Extreme prostration out of proportion to the disease',
      'Fear of death and anxiety about health; believes recovery is impossible',
      'Thirst for small quantities of water frequently ("sip frequently")',
      'Fastidious; wants everything in its place and organized'
    ],
    modalities: {
      better: ['Heat', 'Hot drinks', 'Hot applications', 'Warm room', 'Company'],
      worse: ['After midnight (1-3 AM)', 'Cold air', 'Cold food and drinks', 'Wet weather', 'Being alone']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for small quantities of water at short intervals.',
    mind: [
      "Extreme anxiety, especially after midnight and when alone",
      "Fear of death, disease, poverty, and being alone",
      "Despair of recovery; believes recovery is impossible and medicine is useless",
      "Fastidious; extremely tidy and wants everything in its place"
    ],
    physical: [
      "Thin, acrid, excoriating discharges from all mucous membranes",
      "Food poisoning from spoiled food or bad meat; violent vomiting and burning diarrhoea",
      "Marked aggravation after midnight, especially between 1-3 AM",
      "Ulcers with burning, offensive, and gangrenous tendency",
      "Periodicity of symptoms (every 14 days, every year)"
    ],
    clinicalApplications: [
      'Food poisoning',
      'Asthma (worse at midnight)',
      'Eczema with burning',
      'Gastritis and Cholera',
      'Anxiety and Health anxiety'
    ],
    comparisons: [
      { id: 'aconite', name: 'Aconite', keyDifference: 'Both are restless, but Aconite is more an acute panicked state, Arsenic is more chronic exhaustion and coldness.' }
    ],
    relatedAilments: [
      { id: 'acidity', name: 'Gastritis' },
      { id: 'asthma', name: 'Asthma' },
      { id: 'anxiety', name: 'Anxiety' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'belladonna',
    name: 'Belladonna',
    latinName: 'Atropa belladonna',
    family: 'Plant',
    origin: 'Deadly Nightshade (Solanaceae) | Prover: Hahnemann',
    description: 'Belladonna is the remedy of "Sudden Congestion" and violent inflammatory states. Its entire picture revolves around the four "Rs": Redness, Rapid onset, Restless delirium, and Radiating heat.',
    dosage: 'High fever: 200C every 2 hours. Throbbing headache: 30C.',
    keyCharacteristics: [
      'Sudden and violent onset of symptoms',
      'Intense congestion with red face, hot head, and throbbing carotids',
      'Burning heat that radiates and can be felt by the examiner',
      'Violent throbbing in the head, carotids, and inflamed parts',
      'Widely dilated pupils and bright red, staring eyes',
      'Marked dryness of mouth, tongue, and throat'
    ],
    modalities: {
      better: ['Warmth', 'Wrapping the head', 'Rest', 'Semi-erect position'],
      worse: ['Light', 'Noise', 'Motion', 'Jar', 'Touch', 'Cold', 'Draft of air']
    },
    thermal: 'Hot',
    thirst: 'Thirstless, though mouth and throat are very dry.',
    mind: [
      "Furious delirium: bites, strikes, tears clothes, and tries to escape",
      "Hallucinations: sees monsters, black dogs, and frightful images",
      "Hyperaesthesia: extreme sensitivity to light, noise, touch, and motion"
    ],
    physical: [
      "Violent, throbbing, bursting headache; worse from jar and motion",
      "Bright red, burning, dry throat with painful swallowing",
      "Sudden high fever with dry hot skin and hot head; throbbing carotids",
      "Febrile convulsions and cerebral congestion in children",
      "Predominantly right-sided symptoms"
    ],
    clinicalApplications: [
      'High fevers with delirium',
      'Throbbing headaches',
      'Acute tonsillitis',
      'Sunstroke and Cerebral congestion',
      'Boils (early stage)',
      'Febrile convulsions'
    ],
    comparisons: [
      { id: 'aconite', name: 'Aconite', keyDifference: 'Aconite has dry skin; Belladonna has moist/sweaty skin and more congestion.' }
    ],
    relatedAilments: [
      { id: 'migraine', name: 'Throbbing Headache' },
      { id: 'fever', name: 'High Fever' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bryonia',
    name: 'Bryonia Alba',
    latinName: 'Bryonia alba',
    family: 'Plant',
    origin: 'White Bryony (Cucurbitaceae) | Prover: Hahnemann',
    description: 'Known as the "Remedy of Rest," Bryonia is characterized by extreme dryness of all mucous membranes, sharp stitching pains, and marked aggravation from the slightest movement. It acts especially on serous and synovial membranes.',
    keyCharacteristics: [
      'Extreme dryness of mucous membranes (lips, mouth, throat, stool)',
      'Sharp stitching pains, especially in the chest and joints',
      'Aggravation from the slightest motion; wants to lie perfectly still',
      'Better from absolute rest and pressure (lying on the painful side)',
      'Great thirst for large quantities of cold water at long intervals'
    ],
    modalities: {
      better: ['Absolute rest', 'Pressure', 'Lying on painful side', 'Cool air'],
      worse: ['Motion', 'Touch', 'Deep breathing', 'Morning', 'Heat']
    },
    thermal: 'Hot',
    thirst: 'Great thirst for large quantities of cold water at long intervals.',
    mind: [
      "Very irritable; dislikes questions and wants to be left alone",
      "Business delirium: talks about office, business, and responsibilities during fever",
      "Anxiety about finances and home affairs; desires to go home when at home"
    ],
    physical: [
      "Bursting, splitting frontal headache, worse from motion and stooping",
      "Dry, painful cough; must hold the chest while coughing to prevent stitching pain",
      "Hard, dry stool as if burnt; very difficult to pass due to lack of moisture",
      "Sharp stitching pains in joints and liver, worse from any movement",
      "Stitching pains in serous membranes (pleurisy, peritonitis)"
    ],
    clinicalApplications: [
      'Dry cough / Pleurisy',
      'Arthritis and Rheumatism',
      'Constipation (dry stools)',
      'Hepatitis and Hepatic pain',
      'Typhoid fever'
    ],
    comparisons: [
      { id: 'rhus-tox', name: 'Rhus Tox', keyDifference: 'Bryonia is worse for motion; Rhus Tox is better for continued motion.' }
    ],
    relatedAilments: [
      { id: 'chronic-pain', name: 'Joint Pain' },
      { id: 'respiratory-health', name: 'Dry Cough' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596708051759-994df558d94e?auto=format&fit=crop&q=80&w=800'
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
    mind: [
      "Wants company and consolation; better from being comforted",
      "Easily discouraged and weeps easily",
      "Mood shifts quickly; highly changeable temperament"
    ],
    physical: [
      "Thick, yellowish-green, bland (non-irritating) discharges",
      "Feels chilly but symptoms are much better in fresh, open air",
      "Menses are often delayed, scanty, and irregular"
    ],
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
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558231038-724804106579?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'lycopodium',
    name: 'Lycopodium Clavatum',
    latinName: 'Lycopodium clavatum',
    family: 'Plant',
    origin: 'Club Moss (Lycopodiaceae)',
    description: 'A deeply acting, semi-polychrest remedy. It primarily affects the digestive system, urinary tract, and liver.',
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
    mind: [
      "Lack of self-confidence; fear of or aversion to new things",
      "Very irritable in the morning on waking",
      "Anticipatory anxiety; apprehension before a task but performs well once started"
    ],
    physical: [
      "Deep-seated bloating and flatulence; abdomen feels full",
      "Symptoms move from right to left side of the body",
      "Hungry but feels full after just a few bites (early satiety)"
    ],
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
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nux-vomica',
    name: 'Nux Vomica',
    latinName: 'Strychnos nux-vomica',
    family: 'Plant',
    origin: 'Poison Nut (Loganiaceae)',
    description: 'The "Business Man\'s Remedy." Indicated for sedentary individuals who lead high-stress, high-living lives.',
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
    mind: [
      "Very irritable, impatient, vindictive, and easily angered",
      "Extremely oversensitive to external impressions (light, noise, odors)",
      "Zealous, competitive, and addicted to work or stimulants"
    ],
    physical: [
      "Frequent but ineffectual urging for stool; feels incomplete",
      "Very chilly; symptoms are worse from cold and after eating",
      "Sleepy in the early evening, but wakes around 3-4 AM with worries"
    ],
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
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563201515-adbe43ec34aa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nat-mur',
    name: 'Natrum Muriaticum',
    latinName: 'Sodium Chloride',
    family: 'Mineral',
    origin: 'Common Salt',
    description: 'A major polychrest remedy for chronic conditions. Deeply connected to the emotional sphere, especially suppressed grief.',
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
    mind: [
      "Sentimental; dwells on past unpleasant events and grief",
      "Hates consolation; prefers to be alone to weep or process",
      "Easily offended; prone to deep-seated, long-standing grief"
    ],
    physical: [
      "Great thirst for large quantities of cold water",
      "Strong and marked craving for salt or salty foods",
      "Hammering, pulsating headache, especially on waking in the morning"
    ],
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
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518113171953-209914344e3c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sepia',
    name: 'Sepia Officinalis',
    latinName: 'Cuttlefish Ink',
    family: 'Animal',
    origin: 'Cuttlefish',
    description: 'The premier remedy for hormonal imbalances and women\'s health. Characterized by a sense of stasis and indifference.',
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
    mind: [
      "Apathy and indifference to those loved best (family, children)",
      "Easily offended; very irritable and snappy with relatives",
      "Desires to be alone; avoids company or social interaction"
    ],
    physical: [
      "Marked bearing-down sensation in pelvic region; cross legs to prevent escape",
      "Worse for cold air, before noon, and laundry work",
      "Better for vigorous physical exercise and warm pressure"
    ],
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
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'chamomilla',
    name: 'Chamomilla',
    latinName: 'Matricaria chamomilla',
    family: 'Plant',
    origin: 'German Chamomile (Asteraceae)',
    description: 'The "Opium of Homoeopathy." Primarily a remedy for children and hypersensitive individuals with unbearable pain.',
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1546850830-98440049206b?auto=format&fit=crop&q=80&w=800'
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
      { id: 'bryonia', name: 'Bryonia', keyDifference: 'Bryonia is worse for motion; Gelsemium is often better for continued motion.' }
    ],
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1533220556209-6a3f55462cf8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ignatia',
    name: 'Ignatia Amara',
    latinName: 'Strychnos ignatii',
    family: 'Plant',
    origin: 'St. Ignatius Bean (Loganiaceae)',
    description: 'The "Homoeopathic Prozac." A remedy of contradictions and hysterical manifestations, especially from grief.',
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1621460241617-695393586cd1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'merc-sol',
    name: 'Mercurius Solubilis',
    latinName: 'Quicksilver',
    family: 'Mineral',
    origin: 'Hydrargyrum',
    description: 'A "human thermometer." Extremely sensitive to temperature changes.',
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'phosphorus',
    name: 'Phosphorus',
    latinName: 'Phosphorus',
    family: 'Mineral',
    origin: 'The Element',
    description: 'The remedy of "diffusion." Suited to tall, slender persons with fair skin. Deep-seated hemorrhagic tendency.',
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sulphur',
    name: 'Sulphur',
    latinName: 'Sulphur',
    family: 'Mineral',
    origin: 'Brimstone',
    description: 'The "King of Remedies." The chief anti-psoric remedy.',
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1618235427181-705b63013ba0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'silicea',
    name: 'Silicea Terra',
    latinName: 'Silica',
    family: 'Mineral',
    origin: 'Pure Flint',
    description: 'The "Homoeopathic Surgeon." Known for its ability to expel foreign bodies and promote suppuration.',
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
    relatedAilments: [],
    imageUrl: 'photo-1549419139-44ba58444458?auto=format&fit=crop&q=80&w=800'
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1596708051493-99d91f24e930?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hepar-sulph',
    name: 'Hepar Sulphuris Calcareum',
    latinName: 'Calcium Sulphide',
    family: 'Mineral',
    origin: 'Hahnemann\'s Calcium Sulphide',
    description: 'The "Homoeopathic Knife." A remedy that promotes suppuration when needed or stops it.',
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
    relatedAilments: [],
    imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'calcarea-phos',
    name: 'Calcarea Phosphorica',
    latinName: 'Calcium Phosphate',
    family: 'Mineral',
    origin: 'Phosphate of Lime',
    description: 'A major constitutional and tissue remedy. Primarily acts on the bones, teeth, and glands.',
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
    relatedAilments: [],
    relatedBlogPosts: ['calc-phos'],
    imageUrl: 'https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'kali-bich',
    name: 'Kali Bichromicum',
    latinName: 'Potassium Bichromate',
    family: 'Mineral',
    origin: 'Chemical',
    description: 'The remedy of "stringy, ropy" discharges. It acts primarily on the mucous membranes.',
    keyCharacteristics: [
      'Discharges are tough, stringy, and can be drawn out in long threads',
      'Pains in small spots that can be covered with the tip of a finger',
      'Symptoms alternate between respiratory and gastric issues',
      'Loss of smell and taste'
    ],
    modalities: {
      better: ['Heat', 'Wrapped up'],
      worse: ['Morning (2-3 AM)', 'Cold air', 'Damp weather', 'After eating']
    },
    thermal: 'Chilly',
    thirst: 'Thirsty for cold drinks.',
    clinicalApplications: ['Sinusitis', 'Stomach ulcers', 'Sciatica (in small spots)', 'Croup'],
    comparisons: [
      { id: 'pulsatilla', name: 'Pulsatilla', keyDifference: 'Pulsatilla has thick yellow discharge but is not stringy; Kali Bich is distinctly ropey.' }
    ],
    relatedAilments: [],
    relatedBlogPosts: ['kali-bich'],
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf2ad294cc8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'rhus-tox',
    name: 'Rhus Toxicodendron',
    latinName: 'Toxicodendron radicans',
    family: 'Plant',
    origin: 'Poison Ivy (Anacardiaceae)',
    description: 'The "Rusty Hinge" remedy. It acts especially on fibrous tissue, joints, and skin. Characterized by great restlessness.',
    keyCharacteristics: [
      'Restlessness: must change position constantly to obtain relief',
      'Worse for first motion, better for continued motion',
      'Great sensitivity to cold and damp',
      'Triangular red tip on the tongue'
    ],
    modalities: {
      better: ['Continued motion', 'Warm applications', 'Dry weather', 'Stretching'],
      worse: ['First motion', 'Cold damp weather', 'Night', 'Rest']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for cold milk or cold water.',
    clinicalApplications: ['Rheumatism', 'Arthritis', 'Sprains/Strains', 'Chickenpox', 'Shingles'],
    comparisons: [
      { id: 'bryonia', name: 'Bryonia', keyDifference: 'Bryonia is worse for any motion; Rhus Tox is better for continued motion.' }
    ],
    relatedAilments: [],
    relatedBlogPosts: ['rhus-tox']
  },
  {
    id: 'causticum',
    name: 'Causticum',
    latinName: 'Potassium Hydroxide',
    family: 'Mineral',
    origin: 'Chemical (Hahnemann\'s preparation)',
    description: 'A remedy for paralysis and deep-seated chronic conditions. Suited to individuals with a strong sense of justice and empathy for others\' suffering.',
    keyCharacteristics: [
      'Sensation of raw, sore, or burned feeling',
      'Paralysis of single parts (e.g., eyelids, bladder, larynx)',
      'Intense empathy: cannot bear the sight of injustice',
      'Involuntary urination when coughing or sneezing'
    ],
    modalities: {
      better: ['Damp, wet weather', 'Warmth of bed'],
      worse: ['Dry, cold weather', 'Clear fine weather', 'Evening']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for cold drinks.',
    clinicalApplications: ['Bell\'s Palsy', 'Paralysis', 'Chronic hoarseness', 'Warts on fingertips'],
    comparisons: [
      { id: 'gelsemium', name: 'Gelsemium', keyDifference: 'Both have paralysis, but Causticum is more connected to chronic raw soreness and "justice".' }
    ],
    relatedAilments: [],
    relatedBlogPosts: ['causticum']
  },
  {
    id: 'graphites',
    name: 'Graphites',
    latinName: 'Black Lead',
    family: 'Mineral',
    origin: 'Plumbago',
    description: 'The remedy for "honey-like" discharges and skin conditions. Suited to fair, overweight individuals who are prone to skin eruptions and constipation.',
    keyCharacteristics: [
      'Discharges are thick, sticky, and yellow like honey',
      'Skin is dry, cracked, and bleeds easily',
      'Constant tendency to obesity and constipation',
      'Music makes them weep'
    ],
    modalities: {
      better: ['Open air', 'Belching', 'Eating (gastric pains)'],
      worse: ['Night', 'Warmth of bed', 'During menstruation', 'Suppressed eruptions']
    },
    thermal: 'Chilly',
    thirst: 'Little thirst.',
    clinicalApplications: ['Eczema', 'Psoriasis', 'Chronic constipation', 'Keloids/Scars'],
    comparisons: [
      { id: 'pulsatilla', name: 'Pulsatilla', keyDifference: 'Both are mild and weep easily, but Graphites has skin eruptions and is more chilly.' }
    ],
    relatedAilments: [],
    relatedBlogPosts: ['graphites']
  },
  {
    id: 'lachesis',
    name: 'Lachesis Mutus',
    latinName: 'Surukuku Snake Venom',
    family: 'Animal',
    origin: 'Bushmaster Snake (Viperidae)',
    description: 'A deeply acting remedy for conditions characterized by congestion, left-sidedness, and suspicion. Indicated for hot-blooded individuals with intense emotions.',
    keyCharacteristics: [
      'Left-sided complaints, or moving from left to right',
      'Sleeps into an aggravation; worse after sleep',
      'Great sensitivity to touch or pressure, especially around the neck',
      'Loquacity: talks rapidly and shifts between topics'
    ],
    modalities: {
      better: ['Open air', 'Appearance of discharges (e.g., menses)', 'Cold drinks'],
      worse: ['Sleep', 'Heat', 'Pressure of clothes', 'Spring weather']
    },
    thermal: 'Hot',
    thirst: 'Thirsty for cold water, but has difficulty swallowing liquids.',
    clinicalApplications: ['Menopause', 'Throat infections', 'Cardiovascular issues', 'Severe alcoholism'],
    comparisons: [
      { id: 'lycopodium', name: 'Lycopodium', keyDifference: 'Lachesis is left-sided and hot; Lycopodium is right-sided and chilly.' }
    ],
    relatedAilments: [],
    relatedBlogPosts: ['lachesis']
  },
  {
    id: 'apis',
    name: 'Apis Mellifica',
    latinName: 'Honey Bee',
    family: 'Animal',
    origin: 'Poison of the Honey Bee (Apidae) | Prover: Dr. Bunsen',
    description: 'The remedy for edema, stinging pains, and sudden puffiness. It acts on the cellular tissue, producing inflammation with dropsy. Its symptoms resemble the effects of a bee sting: burning, stinging, redness, and swelling.',
    keyCharacteristics: [
      'Stinging and burning pains (like a bee sting)',
      'Edematous swelling; puffy, waxy appearance with bag-like swelling under lower eyelids',
      'Thirstlessness is a key indicator, especially during fevers and dropsy',
      'Intolerance of heat and close, warm rooms',
      'Extreme sensitivity to touch; cannot tolerate pressure'
    ],
    modalities: {
      better: ['Cold applications', 'Open air', 'Uncovering', 'Cold drinks'],
      worse: ['Warm room', 'Heat', 'Touch', 'Pressure', 'Afternoon (3 PM)', 'Sleep']
    },
    thermal: 'Hot',
    thirst: 'Generally thirstless, even during fever.',
    mind: [
      "Irritable, nervous, and hard to please; frequently weeping",
      "Awkward behavior; drops things while handling them",
      "Mental confusion; cannot think clearly",
      "Ailments from jealousy, fear, anger, or bad news"
    ],
    physical: [
      "Bag-like puffy swelling under lower eyelids; pale waxy face",
      "Oedema or Anasarca; generalized fluid accumulation in tissues",
      "Sudden screaming and stupor in meningitis; rolls head from side to side",
      "Urination frequent, painful, and scanty; burning during urination",
      "Urticaria with burning, stinging, and pricking sensations"
    ],
    clinicalApplications: [
      'Hives / Urticaria',
      'Dropsy and Oedematous conditions',
      'Arthritis with swelling',
      'Ovarian cysts (right side)',
      'Acute tonsillitis and Meningitis',
      'Urinary complaints (scanty/painful)'
    ],
    comparisons: [
      { id: 'arsenicum', name: 'Arsenicum', keyDifference: 'Both have burning pains, but Apis is hot and better for cold; Arsenicum is chilly and better for heat.' },
      { id: 'rhus-tox', name: 'Rhus Tox', keyDifference: 'Apis is right-sided and thirstless; Rhus Tox is left-sided and thirsty.' }
    ],
    relatedAilments: [
      { id: 'skin-health', name: 'Urticaria' },
      { id: 'joint-pain', name: 'Arthritis with Swelling' }
    ],
    relatedBlogPosts: ['apis'],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'chelidonium',
    name: 'Chelidonium Majus',
    latinName: 'Celandine',
    family: 'Plant',
    origin: 'Greater Celandine (Papaveraceae)',
    description: 'A premier liver remedy. Its symptoms are prominently right-sided and reflect hepatic dysfunction.',
    keyCharacteristics: [
      'Fixed pain under the inner lower angle of the right scapula',
      'Jaundice with yellow-coated tongue and bitter taste',
      'Desire for very hot drinks, which relieve the stomach',
      'Right-sided complaints'
    ],
    modalities: {
      better: ['Hot food/drinks', 'Eating', 'Pressure'],
      worse: ['Motion', 'Change of weather', '4 AM and 4 PM']
    },
    thermal: 'Chilly',
    thirst: 'Thirst for hot drinks.',
    clinicalApplications: ['Hepatitis', 'Gallstones', 'Jaundice', 'Liver congestion'],
    comparisons: [
      { id: 'lycopodium', name: 'Lycopodium', keyDifference: 'Both are right-sided liver remedies, but Chelidonium has the specific scapular pain and desire for hot drinks.' }
    ],
    relatedAilments: [],
    relatedBlogPosts: ['chelidonium']
  },
  {
    id: 'allium-cepa',
    name: 'Allium Cepa',
    latinName: 'Allium cepa',
    family: 'Plant',
    origin: 'Red Onion (Liliaceae) | Prover: Hering',
    description: 'A premier remedy for acute coryza and hay fever, characterized by acrid nasal discharge and bland lacrimation. The classic picture is: "Nose burns but tears remain bland."',
    keyCharacteristics: [
      'Acrid, watery nasal discharge that excoriates the nose and upper lip',
      'Bland lacrimation (tears flow freely but do not burn)',
      'Violent sneezing, especially on entering a warm room',
      'Neuralgic pains like a long thread, running in a straight line',
      'Strong craving for raw onions'
    ],
    modalities: {
      better: ['Open air', 'Cold room'],
      worse: ['Warm room', 'Evening', 'Wet feet', 'North-west wind']
    },
    thermal: 'Hot',
    thirst: 'Thirsty for cold water.',
    mind: [
      'Very sleepy; fear that the pain will become unbearable',
      'Symptoms often travel from left to right'
    ],
    physical: [
      'Nasal discharge burns the upper lip; violent sneezing',
      'Eyes red and watering; burning, biting, or smarting sensation',
      'Violent laryngitis: cough as if it would tear the larynx; grabs throat while coughing',
      'Thread-like neuralgic pains, often after trauma or amputation'
    ],
    clinicalApplications: [
      'Hay fever and Coryza',
      'Common cold and Influenza',
      'Laryngitis (tearing cough)',
      'Neuralgia',
      'Nasal polyps'
    ],
    comparisons: [
      { id: 'euphrasia', name: 'Euphrasia', keyDifference: 'Euphrasia has acrid tears and bland nasal discharge; Allium Cepa has acrid nasal discharge and bland tears.' }
    ],
    relatedAilments: [
      { id: 'cold-flu', name: 'Common Cold' },
      { id: 'respiratory-health', name: 'Hay Fever' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518977822534-7049a6feec58?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'euphrasia',
    name: 'Euphrasia Officinalis',
    latinName: 'Euphrasia officinalis',
    family: 'Plant',
    origin: 'Eyebright (Scrophulariaceae)',
    description: 'Specific for eye conditions, especially where there is acrid lacrimation and bland nasal discharge.',
    keyCharacteristics: [
      'Acrid, burning tears that excoriate the cheeks',
      'Bland nasal discharge',
      'Photophobia (sensitivity to light)',
      'Frequent winking to clear the eyes'
    ],
    modalities: {
      better: ['Darkness', 'Coffee'],
      worse: ['Light', 'Evening', 'Wind', 'Warmth']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    mind: [
      'Dullness of intellect',
      'Disinclination to business'
    ],
    physical: [
      'Eyes feel as if sand were in them',
      'Cough only during the day',
      'Profuse, fluent coryza'
    ],
    clinicalApplications: ['Conjunctivitis', 'Hay fever', 'Eye strain', 'Blepharitis'],
    comparisons: [
      { id: 'allium-cepa', name: 'Allium Cepa', keyDifference: 'Euphrasia has acrid tears; Allium Cepa has acrid nasal discharge.' }
    ],
    relatedAilments: [
      { id: 'eye-health', name: 'Eye Irritation' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549419139-44ba58444458?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'glonoinum',
    name: 'Glonoinum',
    latinName: 'Nitroglycerinum',
    family: 'Imponderabilia',
    origin: 'Nitro-glycerine',
    description: 'A powerful remedy for sudden and violent congestion to the head, often caused by exposure to sun or heat.',
    keyCharacteristics: [
      'Tremendous throbbing in the head and heart',
      'Sunstroke or ailments from sun heat',
      'Cannot bear any heat around the head',
      'Rush of blood to the head; bursting sensation'
    ],
    modalities: {
      better: ['Open air', 'Uncovering the head', 'Elevation of head'],
      worse: ['Sun', 'Heat', 'Gas light', 'Motion', 'Stooping']
    },
    thermal: 'Hot',
    thirst: 'Thirstless.',
    mind: [
      'Confusion of place; loses his way on familiar streets',
      'Irritability from least opposition'
    ],
    physical: [
      'Face deep red or purplish',
      'Pulsation felt in every part of body',
      'Sensation of skull being too small'
    ],
    clinicalApplications: ['Sunstroke', 'Congestive headache', 'Hypertension', 'Menopausal hot flashes'],
    comparisons: [
      { id: 'belladonna', name: 'Belladonna', keyDifference: 'Both have throbbing, but Glonoinum is more aggravated by the sun and has no relief from heat.' }
    ],
    relatedAilments: [
      { id: 'migraine', name: 'Heat Headache' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'carbo-veg',
    name: 'Carbo Vegetabilis',
    latinName: 'Carbo vegetabilis',
    family: 'Plant',
    origin: 'Vegetable Charcoal',
    description: 'The "Corpse Reviver." Indicated for states of collapse, air hunger, and severe digestive bloating.',
    keyCharacteristics: [
      'Air hunger: wants to be fanned constantly',
      'Great accumulation of gas in upper abdomen',
      'Coldness of the knees and breath',
      'Flatulence relieved by frequent belching'
    ],
    modalities: {
      better: ['Belching', 'Being fanned', 'Cold air'],
      worse: ['Evening', 'Fatty food', 'Warm damp weather', 'After eating']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    mind: [
      'Sluggish and confused; dullness of mind',
      'Indifferent to everything'
    ],
    physical: [
      'Blueish, cold skin; state of collapse',
      'Hemorrhages from any mucous surface',
      'Abdomen feels very full and tense after a small amount of food'
    ],
    clinicalApplications: ['Dyspepsia', 'Flatulence', 'Asthma', 'Collapse', 'Indigestion'],
    comparisons: [
      { id: 'lycopodium', name: 'Lycopodium', keyDifference: 'Carbo Veg has gas in upper abdomen; Lycopodium in lower abdomen.' }
    ],
    relatedAilments: [
      { id: 'digestive-issues', name: 'Bloating' },
      { id: 'respiratory-health', name: 'Air Hunger' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582213700030-9b4a92c3093b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ipecac',
    name: 'Ipecacuanha',
    latinName: 'Cephaelis ipecacuanha',
    family: 'Plant',
    origin: 'Ipecac Root',
    description: 'The remedy of persistent nausea. It is characterized by nausea that is not relieved by vomiting and a clean tongue.',
    keyCharacteristics: [
      'Persistent nausea not relieved by vomiting',
      'Clean tongue despite severe gastric symptoms',
      'Hemorrhages of bright red blood',
      'Spasmodic cough with rattling in chest'
    ],
    modalities: {
      better: ['Rest', 'Open air'],
      worse: ['Warm, moist wind', 'Veal', 'Pork', 'Overeating']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    mind: [
      'Irritable; desires things but rejects them when offered',
      'Full of desires'
    ],
    physical: [
      'Uterine hemorrhage with nausea',
      'Nosebleed (Epistaxis)',
      'Sudden, prostrating diarrhea with much nausea'
    ],
    clinicalApplications: ['Nausea and vomiting', 'Morning sickness', 'Whooping cough', 'Hemorrhage'],
    comparisons: [
      { id: 'ant-tart', name: 'Antimonium Tart', keyDifference: 'Ant-Tart has a heavily coated tongue; Ipecac has a clean tongue.' }
    ],
    relatedAilments: [
      { id: 'digestive-issues', name: 'Nausea' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546850830-98440049206b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'spongia',
    name: 'Spongia Tosta',
    latinName: 'Spongia tosta',
    family: 'Animal',
    origin: 'Roasted Sponge',
    description: 'A major respiratory remedy, especially for croup where the cough sounds like a saw driven through a fir board.',
    keyCharacteristics: [
      'Dry, barking, croupy cough',
      'Cough sounds like a saw driven through a board',
      'Hoarseness with great dryness of larynx',
      'Worse after sleep, better from eating or drinking warm things'
    ],
    modalities: {
      better: ['Eating', 'Warm drinks', 'Descending'],
      worse: ['After sleep', 'Lying with head low', 'Cold dry winds', 'Before midnight']
    },
    thermal: 'Chilly',
    thirst: 'Thirsty.',
    mind: [
      'Fear of death',
      'Irritable'
    ],
    physical: [
      'Goitre; swelling of thyroid',
      'Croup better after eating',
      'Palpitations of heart'
    ],
    clinicalApplications: ['Croup', 'Cough', 'Thyroid issues', 'Palpitations'],
    comparisons: [
      { id: 'aconite', name: 'Aconite', keyDifference: 'Aconite is for the initial stage; Spongia for the established croupy cough.' }
    ],
    relatedAilments: [
      { id: 'respiratory-health', name: 'Cough' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ruta',
    name: 'Ruta Graveolens',
    latinName: 'Ruta graveolens',
    family: 'Plant',
    origin: 'Garden Rue',
    description: 'Specifically acts on periosteum, tendons, and eyes. It is characterized by a bruised, sore feeling as if after a fall.',
    keyCharacteristics: [
      'Eye strain from fine work',
      'Bruised feeling in periosteum and tendons',
      'Sensation as if parts are smashed or broken',
      'Nodes or deposits in tendons or periosteum'
    ],
    modalities: {
      better: ['Motion', 'Warmth'],
      worse: ['Cold', 'Damp weather', 'Rest', 'Overexertion of eyes']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    mind: [
      'Irritable and inclined to contradict',
      'Dissatisfied with self and others'
    ],
    physical: [
      'Aching in eyes after reading fine print',
      'Sprains where the parts feel bruised',
      'Prolapsus ani on stooping'
    ],
    clinicalApplications: ['Eye strain', 'Tendinitis', 'Sprains', 'Bruises'],
    comparisons: [
      { id: 'arnica', name: 'Arnica', keyDifference: 'Arnica is for soft tissue bruises; Ruta for injury to periosteum and tendons.' }
    ],
    relatedAilments: [
      { id: 'eye-health', name: 'Eye Strain' },
      { id: 'injury-recovery', name: 'Tendon Injury' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'petroleum',
    name: 'Petroleum',
    latinName: 'Oleum petrae',
    family: 'Mineral',
    origin: 'Rock Oil',
    description: 'A great skin remedy, especially for cracks and fissures that are worse in winter.',
    keyCharacteristics: [
      'Skin cracks and fissures, worse in winter',
      'Motion sickness (seasickness, carsickness)',
      'Hunger after stool',
      'Diarrhea only during the day'
    ],
    modalities: {
      better: ['Warm air', 'Lying with head high'],
      worse: ['Winter', 'Motion of vehicle', 'Dampness', 'During a storm']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    mind: [
      'Irritable and quarrelsome',
      'Feels as if someone is lying beside him'
    ],
    physical: [
      'Cracks on fingertips and hands in winter',
      'Nausea and vomiting from motion',
      'Eczema that is very dry and itchy'
    ],
    clinicalApplications: ['Eczema', 'Motion sickness', 'Fissures', 'Psoriasis'],
    comparisons: [
      { id: 'graphites', name: 'Graphites', keyDifference: 'Petroleum cracks are worse in winter; Graphites has honey-like discharge.' }
    ],
    relatedAilments: [
      { id: 'skin-health', name: 'Cracked Skin' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'robinia',
    name: 'Robinia Pseudacacia',
    latinName: 'Robinia pseudacacia',
    family: 'Plant',
    origin: 'Yellow Locust',
    description: 'Specifically for gastric symptoms characterized by intense acidity and sourness.',
    keyCharacteristics: [
      'Intense acidity of the stomach',
      'Sour vomiting; vomitus so sour it edges the teeth',
      'Eructations are sour and acrid',
      'Sour-smelling body and stools'
    ],
    modalities: {
      better: ['Eating (briefly)', 'Warmth'],
      worse: ['Night', 'Fatty food']
    },
    thermal: 'Chilly',
    thirst: 'Thirsty.',
    mind: [
      'Irritable',
      'Low spirited'
    ],
    physical: [
      'Heartburn with acidity',
      'Sour stomach in infants',
      'Neuralgia from gastric irritation'
    ],
    clinicalApplications: ['Acid reflux', 'GERD', 'Heartburn', 'Sour stomach'],
    comparisons: [
      { id: 'nux-vomica', name: 'Nux Vomica', keyDifference: 'Robinia is more focused on the extreme acidity/sourness than the ineffectual urging of Nux.' }
    ],
    relatedAilments: [
      { id: 'digestive-issues', name: 'Acid Reflux' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512429234300-1c00bed204c3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'kali-mur',
    name: 'Kali Muriaticum',
    latinName: 'Kalium muriaticum',
    family: 'Mineral',
    origin: 'Chloride of Potassium',
    description: 'A tissue salt specifically for catarrhal conditions with white or gray discharges and a thick white coating on the tongue.',
    keyCharacteristics: [
      'Thick, white coating on the tongue',
      'White or gray, thick fibrinous discharges',
      'Eustachian tube blockage; muffled hearing',
      'Glandular swellings'
    ],
    modalities: {
      better: ['Rubbing', 'Cold applications'],
      worse: ['Motion', 'Rich/fatty food', 'Warmth']
    },
    thermal: 'Chilly',
    thirst: 'Thirstless.',
    mind: [
      'Irritable',
      'Sadness'
    ],
    physical: [
      'Chronic catarrh of the middle ear',
      'Tonsillitis with white patches',
      'Eruptions with white scales'
    ],
    clinicalApplications: ['Ear infections', 'Tonsillitis', 'Common cold', 'Eczema'],
    comparisons: [
      { id: 'kali-bich', name: 'Kali Bich', keyDifference: 'Kali Bich has ropy, stringy discharges; Kali Mur has white, thick discharges.' }
    ],
    relatedAilments: [
      { id: 'ear-health', name: 'Ear Blockage' },
      { id: 'cold-flu', name: 'Congestion' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'drosera',
    name: 'Drosera Rotundifolia',
    latinName: 'Drosera rotundifolia',
    family: 'Plant',
    origin: 'Round-leafed Sundew',
    description: 'A major cough remedy. It is indicated for spasmodic, paroxysmal coughs that are worse from lying down.',
    keyCharacteristics: [
      'Spasmodic, paroxysmal cough like whooping cough',
      'Cough so violent that it causes sweating or vomiting',
      'Sensation of a feather in the larynx',
      'Worse as soon as the head touches the pillow'
    ],
    modalities: {
      better: ['Pressure', 'Walking'],
      worse: ['After midnight', 'Lying down', 'Warmth', 'Laughing', 'Singing']
    },
    thermal: 'Chilly',
    thirst: 'Thirsty.',
    mind: [
      'Restless and stubborn',
      'Anxious and depressed'
    ],
    physical: [
      'Hoarseness; deep and bass-like voice',
      'Nosebleed during cough',
      'Pains in joints as if dislocated'
    ],
    clinicalApplications: ['Whooping cough', 'Laryngitis', 'Spasmodic cough'],
    comparisons: [
      { id: 'spongia', name: 'Spongia', keyDifference: 'Spongia has a dry, barking cough; Drosera has a paroxysmal, spasmodic cough.' }
    ],
    relatedAilments: [
      { id: 'respiratory-health', name: 'Violent Cough' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596708051759-994df558d94e?auto=format&fit=crop&q=80&w=800'
  },
  {
    "id": "aethusa",
    "name": "Aethusa Cynapium",
    "latinName": "Aethusa cynapium",
    "family": "Plant",
    "origin": "Fool's Parsley (Umbelliferae) | Prover: Dr. Nanni",
    "description": "Best remedy for vomiting in children, especially during dentition and hot weather. It is characterized by a complete intolerance of milk and profound weakness with an inability to hold the head up.",
    "keyCharacteristics": [
      "Milk cannot be digested; vomited immediately in large curds",
      "Profound weakness, drowsiness, and prostration after vomiting",
      "Complete absence of thirst",
      "Sunken face with well-marked linea nasalis (white line from nose to mouth)",
      "Inability to think or fix attention; idiotic appearance during illness"
    ],
    "modalities": {
      "better": [
        "Open air",
        "Rest",
        "Covering",
        "Company"
      ],
      "worse": [
        "Milk",
        "Hot summer weather",
        "Dentition",
        "Dietary errors",
        "Evenings"
      ]
    },
    "thermal": "Chilly",
    "thirst": "Complete absence of thirst",
    "mind": [
      "Idiotic appearance; confused and unable to think",
      "Hallucinations: sees rats, cats, or mice running around",
      "Expression of great anxiety and pain; restless and crying"
    ],
    "physical": [
      "Violent vomiting of curdled milk, white or yellow, followed by great exhaustion",
      "Sunken face with linea nasalis; herpetic eruptions around the nose",
      "Epileptic features: clenched thumbs, red face, dilated pupils, eyes turned downward",
      "Child cannot hold head up or stand due to extreme weakness"
    ],
    "clinicalApplications": [
      "Vomiting in infants",
      "Dentition troubles",
      "Cholera infantum",
      "Epilepsy in children",
      "Brain-fag and examination fear"
    ],
    "comparisons": [
      { "id": "gelsemium", "name": "Gelsemium", "keyDifference": "Both have examination fear, but Aethusa has more focus on inability to think and milk intolerance." }
    ],
    "relatedAilments": [
      {
        "id": "indigestion",
        "name": "Indigestion"
      },
      {
        "id": "convulsions",
        "name": "Convulsions"
      }
    ],
    "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
  },
  {
  "id": "ammonium-mur",
  "name": "Ammonium Muriaticum",
  "latinName": "Ammonium muriaticum",
  "family": "Mineral",
  "origin": "Ammonium Chloride (Mineral)",
  "description": "Ammonium Muriaticum produces a state of prostration bordering on a typhoid state. It is especially adapted to fat, sluggish individuals with thin limbs. All mucous secretions are increased and retained, and there is a characteristic icy coldness between the shoulders, accompanied by obstinate, crumbling constipation.",
  "keyCharacteristics": [
    "Suited to fat and sluggish patients who have respiratory/liver troubles",
    "Icy coldness between shoulders, not relieved by warm covering",
    "Obstinate constipation, hard crumbling stools, or stools covered with glairy mucus",
    "Free acrid, hot watery discharge from nose corroding the lip"
  ],
  "modalities": {
    "better": [
      "Open air",
      "Lying down",
      "Lying on the abdomen",
      "Walking"
    ],
    "worse": [
      "Head and chest in the morning",
      "Abdominal in afternoon",
      "Limbs, skin, febrile in evening"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Thirsty for small quantities frequently",
  "mind": [
    "Melancholy, apprehensive; like from internal grief",
    "Desire to cry, but cannot",
    "Peevish, irritable disposition with consequence of grief"
  ],
  "physical": [
    "Dry, hacking, scraping cough; worse lying on back or right side",
    "Menses are too early, too free, flowing more at night, with abdominal pain",
    "Sciatica worse while sitting, somewhat better by walking, better lying down"
  ],
  "clinicalApplications": [
    "Constipation",
    "Sciatica",
    "Bronchitis",
    "Coryza"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "constipation",
      "name": "Constipation"
    },
    {
      "id": "sciatica",
      "name": "Sciatica"
    },
    {
      "id": "bronchitis",
      "name": "Bronchitis"
    },
    {
      "id": "coryza",
      "name": "Coryza"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "cinchona",
  "name": "Cinchona Officinalis",
  "latinName": "Cinchona officinalis",
  "family": "Plant",
  "origin": "Peruvian Bark (Rubiaceae)",
  "description": "China/Cinchona is indicated for debility arising from the loss of vital fluids (hemorrhage, semen, sweat, or diarrhea). It is characterized by marked periodicity, excessive flatulence with abdominal bloating unrelieved by belching, and extreme hyperesthesia where the slightest touch, draft, or jar is painful but hard pressure relieves.",
  "keyCharacteristics": [
    "Debility from exhausting discharges, from loss of vital fluids, with nervous erethism",
    "Excessive flatulent distention of the entire abdomen, where belching gives no relief",
    "Extreme sensitiveness to the slightest touch, draft of air, or jar, while hard pressure relieves",
    "Marked periodicity of complaints, with symptoms recurring every other day or at regular intervals"
  ],
  "modalities": {
    "better": [
      "Hard pressure",
      "Bending double",
      "Warm room",
      "Warmth"
    ],
    "worse": [
      "Slightest touch",
      "Draft of air",
      "Every other day",
      "Loss of vital fluids",
      "At night",
      "After eating"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Great thirst for cold water during chill and sweat, but thirstless during heat",
  "mind": [
    "Apathetic, indifferent, disobedient, taciturn, despondent",
    "Crowding of ideas in the mind, especially in the evening, preventing sleep",
    "Disposition to hurt other people's feelings; crying and tossing about"
  ],
  "physical": [
    "Painless, undigested, frothy, yellow diarrhea, worse at night and after meals",
    "Intense throbbing headache with a sensation as if the skull would burst",
    "Swelling of the liver and spleen, which feel sore and sensitive to touch; gall-stone colic"
  ],
  "clinicalApplications": [
    "Debility",
    "Diarrhea",
    "Malaria",
    "Flatulence"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "debility",
      "name": "Debility"
    },
    {
      "id": "diarrhea",
      "name": "Diarrhea"
    },
    {
      "id": "malaria",
      "name": "Malaria"
    },
    {
      "id": "flatulence",
      "name": "Flatulence"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "cocculus",
  "name": "Cocculus Indicus",
  "latinName": "Anamirta cocculus",
  "family": "Plant",
  "origin": "Indian Cockle (Menispermaceae)",
  "description": "Cocculus Indicus acts profoundly on the cerebro-spinal system and is pre-eminently indicated for spasmodic and paretic affections, particularly those affecting one-half of the body, as well as motion/sea sickness. It is highly effective for the debilitating consequences of loss of sleep, night watching, or mental overexertion.",
  "keyCharacteristics": [
    "Ailments from loss of sleep, night watching, or mental exertion",
    "Extreme aversion to food, where even the smell of food disgusts of it",
    "Sensation of emptiness, hollowness, or weakness in internal organs",
    "All symptoms worse riding in a carriage or on shipboard; seasickness"
  ],
  "modalities": {
    "better": [
      "Sitting quietly",
      "Lying down",
      "Warm room"
    ],
    "worse": [
      "Riding in a carriage, boat, or train",
      "Loss of sleep",
      "Smell of food",
      "Cold air"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Thirstless or sometimes intense thirst with aversion to drink",
  "mind": [
    "Profound sadness, constant brooding, and silent grief",
    "Slow of comprehension; mind benumbed; absorbed in reveries",
    "Cannot bear contradiction; very anxious about the health of others"
  ],
  "physical": [
    "Vertigo, nausea, especially when riding, sitting up, or looking at moving objects",
    "Spasmodic dysmenorrhea with too early, clotted menses, and flatulent colic",
    "Paralytic pain in small of back, and weakness of cervical muscles making head heavy"
  ],
  "clinicalApplications": [
    "Motion Sickness",
    "Vertigo",
    "Dysmenorrhea",
    "Insomnia"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "motion-sickness",
      "name": "Motion Sickness"
    },
    {
      "id": "vertigo",
      "name": "Vertigo"
    },
    {
      "id": "dysmenorrhea",
      "name": "Dysmenorrhea"
    },
    {
      "id": "insomnia",
      "name": "Insomnia"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "colchicum",
  "name": "Colchicum Autumnale",
  "latinName": "Colchicum autumnale",
  "family": "Plant",
  "origin": "Meadow Saffron (Liliaceae)",
  "description": "Colchicum Autumnale has a powerful affinity for muscular, periosteal, and synovial structures, notably yielding excellent results in acute or chronic gouty paroxysms. It is characterized by extreme hyperesthesia, particularly an unbearable aversion to the smell of cooking food, with tearing pains in red, swollen joints.",
  "keyCharacteristics": [
    "The smell of food causes nausea even to fainting, especially fish",
    "Tearing pains in joints, shifting rapidly, worse in evening and night",
    "Affected parts swollen, red, hot, exquisitely sensitive to touch or movement",
    "Great flatulent distention of the abdomen with a cold feeling in the stomach"
  ],
  "modalities": {
    "better": [
      "Stooping",
      "Rest and lying quiet",
      "Bending double"
    ],
    "worse": [
      "Sundown to sunrise",
      "Motion and touch",
      "Smell of food",
      "Mental exertion"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Burning thirst for cold water",
  "mind": [
    "Very irritable with the pains; cheeks red, hot, sweaty",
    "Dullness of sense; cannot bear light, noise, or strong odors",
    "Headache chiefly frontal and temporal, but also occipital and in nape of neck"
  ],
  "physical": [
    "Autumnal dysentery with painful, scanty, transparent, jelly-like mucus, and tenesmus",
    "Pericarditis, with severe pain, oppression, and dyspnoea; pulse threadlike",
    "Burning or icy coldness in stomach and abdomen with flatulence"
  ],
  "clinicalApplications": [
    "Gout",
    "Dysentery",
    "Rheumatism",
    "Dropsy"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "gout",
      "name": "Gout"
    },
    {
      "id": "dysentery",
      "name": "Dysentery"
    },
    {
      "id": "rheumatism",
      "name": "Rheumatism"
    },
    {
      "id": "dropsy",
      "name": "Dropsy"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1550931508-6cca79e4316a?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "natrum-carb",
  "name": "Natrum Carbonicum",
  "latinName": "Natrum carbonicum",
  "family": "Mineral",
  "origin": "Sodium Carbonate (Mineral)",
  "description": "Natrum Carbonicum is a chilly remedy characterized by extreme debility and sensitivity to summer heat, sunstroke, and weather changes. It experiences marked and profound sensitivity to music, causing weeping, alongside highly weak digestive power with a complete aversion to milk.",
  "keyCharacteristics": [
    "Great debility caused by summer heat, sunstroke, or hot weather",
    "Extreme sensitivity to music, causing sadness, anxiety and weeping",
    "Very weak digestion; slightest error of diet - especially milk - causes diarrhea",
    "Easy dislocation and spraining of ankles; foot bends under"
  ],
  "modalities": {
    "better": [
      "Moving",
      "Boring in ears and nose",
      "Eating",
      "Spiced food"
    ],
    "worse": [
      "Sitting",
      "Music",
      "Summer heat",
      "Mental exertion",
      "Thunderstorm",
      "Least draught",
      "Sun"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Great thirst for cold water, particularly with stomach complaints",
  "mind": [
    "Unable to think; difficult, slow comprehension",
    "Mental weakness and depression; worries; sensitive to noise and colds",
    "Anxious and restless during thunderstorm; worse from music"
  ],
  "physical": [
    "Acid dyspepsia with sour eructations, heaviness, and water-brash",
    "Posterior nasal catarrh; hawking much thick, yellow-green mucus from throat",
    "Coldness between shoulders; icy cold up to knees"
  ],
  "clinicalApplications": [
    "Sunstroke",
    "Acid dyspepsia",
    "Ankle weakness",
    "Chronic nasal catarrh"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "sunstroke",
      "name": "Sunstroke"
    },
    {
      "id": "acid-dyspepsia",
      "name": "Acid dyspepsia"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "podophyllum",
  "name": "Podophyllum Peltatum",
  "latinName": "Podophyllum peltatum",
  "family": "Plant",
  "origin": "Mayapple (Berberidaceae)",
  "description": "Podophyllum Peltatum acts principally on the duodenum, small intestines, liver, and rectum, producing classic cases of bilious vomiting and painless, profuse, gushing, highly offensive watery diarrhea. It has a notable torpid lever configuration and unique prolapsus ani signs.",
  "keyCharacteristics": [
    "Painless, profuse, offensive, gushing, yellowish-green watery diarrhea",
    "Prolapsus ani, before or during stool, or after least motion",
    "Torpidity of the liver; portal engorgement with jaundice, pain, and fullness",
    "Alternation of headache with diarrhea (when diarrhea stops, headache comes)"
  ],
  "modalities": {
    "better": [
      "Lying on abdomen",
      "Rubbing liver region",
      "Warmth"
    ],
    "worse": [
      "Early morning",
      "Hot weather",
      "During dentition",
      "After eating acid fruits"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Thirst for large quantities of cold water during diarrhea or fever",
  "mind": [
    "Loquacity and delirium from eating acid fruits",
    "Depression of spirits; feels very weak and languid",
    "Restless, particularly during dentition in children"
  ],
  "physical": [
    "Green, watery, fetid, profuse, gushing stools running right through",
    "Grinding of teeth during sleep and difficult dentition",
    "Sensation of empty weakness or sinking in abdomen, can lie comfortably only on stomach"
  ],
  "clinicalApplications": [
    "Painless diarrhea",
    "Cholera infantum",
    "Prolapsus ani",
    "Hepatic congestion"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "painless-diarrhea",
      "name": "Painless diarrhea"
    },
    {
      "id": "prolapsus-ani",
      "name": "Prolapsus ani"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "kali-phos",
  "name": "Kali Phosphoricum",
  "latinName": "Potassium phosphate",
  "family": "Mineral",
  "origin": "Biochemic Tissue Salt (Mineral)",
  "description": "Kali Phosphoricum is one of our greatest biochemic tissue salts, indicated primarily for loss of nerve power, severe mental and physical depression, neurasthenia, and offensive, putrid secretions. It is highly beneficial for the effects of overwork, worry, and excitement.",
  "keyCharacteristics": [
    "Conditions arising from want of nerve power, neurasthenia, mental and physical depression",
    "All secretions and excretions are exceptionally foul-smelling, putrid, and dark",
    "Irritable state, with nervous dread and extreme anxiety about health or business",
    "Tension headache of students and those worn out by fatigue, better by gentle motion"
  ],
  "modalities": {
    "better": [
      "Warmth",
      "Rest",
      "Nourishment",
      "Gentle motion"
    ],
    "worse": [
      "Excitement",
      "Worry",
      "Mental and physical overexertion",
      "Cold air",
      "Early morning"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Moderate thirst with dry mouth",
  "mind": [
    "Brain-fag, loss of memory, and inability to concentrate from overwork or worry",
    "Morbid dread of crowds, shadows, and darkness; shyness",
    "Hysterical states, night terrors, and severe depression"
  ],
  "physical": [
    "Paralytic lameness in back and extremities, worse from exertion",
    "Nervous 'gone' sensation at pit of stomach; feels seasick without nausea",
    "Putrid, offensive breath, and brownish coating on tongue resembling mustard"
  ],
  "clinicalApplications": [
    "Neurasthenia",
    "Insomnia",
    "Brain fag",
    "Mental depression"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "neurasthenia",
      "name": "Neurasthenia"
    },
    {
      "id": "insomnia",
      "name": "Insomnia"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "kali-sulph",
  "name": "Kali Sulphuricum",
  "latinName": "Potassium sulphate",
  "family": "Mineral",
  "origin": "Biochemic Tissue Salt (Mineral)",
  "description": "Kali Sulphuricum is a key oxygenating tissue salt, highly applicable to later stages of inflammation with yellow, slimy, and mucous discharges. It bears a close resemblance to Pulsatilla with its strong dread of warm rooms and marked relief in cool open air.",
  "keyCharacteristics": [
    "Yellow, mucous and serous discharges, profuse and intermittent, from any membrane",
    "Ailments accompanied by profuse desquamation and yellow scaly skin eruptions",
    "Pains or joint soreness of a shifting, wandering character; worse in warm room",
    "Dread of warm room; symptoms are strongly relieved in open cool air"
  ],
  "modalities": {
    "better": [
      "Cool open air",
      "Cold breeze",
      "Walking slowly"
    ],
    "worse": [
      "Warm room",
      "In the evening",
      "Heated room",
      "Resting quiet"
    ]
  },
  "thermal": "Hot",
  "thirst": "Thirstless",
  "mind": [
    "Irritable, anxious, and easily frightened",
    "Lacks resolution; forgets names and words",
    "Melancholy and low-spirited, especially in the evening"
  ],
  "physical": [
    "Rattling of mucus in chest; bronchial asthma with yellow, slimy expectoration",
    "Nasal catarrh with thick, yellow, slimy expectoration, and nose obstructed",
    "Itching dry skin with yellow scales, resembling eczema, worse in warmth of bed"
  ],
  "clinicalApplications": [
    "Eczema with yellow scales",
    "Bronchitis",
    "Chronic nasal catarrh",
    "Shifting rheumatalgia"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "eczema-with-yellow-scales",
      "name": "Eczema with yellow scales"
    },
    {
      "id": "bronchitis",
      "name": "Bronchitis"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "natrum-phos",
  "name": "Natrum Phosphoricum",
  "latinName": "Sodium phosphate",
  "family": "Mineral",
  "origin": "Biochemic Tissue Salt (Mineral)",
  "description": "Natrum Phosphoricum is the biochemic acid neutralizer for conditions arising from an excess of lactic acid, often due to sugar overindulgence. It is characterized by a thick, golden-yellow, moist coating on the tongue, sour eructations, and extreme gassiness.",
  "keyCharacteristics": [
    "Thick, moist, golden-yellow or honey-colored coating on the tongue and palate",
    "Excess of acidity, leading to sour eructations, sour vomiting, and sour, greenish diarrhea",
    "Acid-dyspepsia, with burning in stomach and intense heartburn, worse after sugar or milk",
    "Yellow, creamy discharge of matter from the eyes, sealing lids in the morning"
  ],
  "modalities": {
    "better": [
      "Cool air",
      "Cold water",
      "Pressure"
    ],
    "worse": [
      "Sugar",
      "Milk",
      "Thunderstorms",
      "Mental or physical exertion"
    ]
  },
  "thermal": "Ambi-thermal",
  "thirst": "Craving for cold water or sour drinks",
  "mind": [
    "Anxious, irritable, and full of imaginary fears, especially at night",
    "Imagines, on waking at night, that pieces of furniture are persons",
    "Startled easily by noises; loss of memory with dullness"
  ],
  "physical": [
    "Acid gassiness with flatulence, sour risings, and spitting up mouthful of food",
    "Sore throat with feeling of a lump in throat, and thick, yellow, offensive mucus",
    "Stinging hives or hives-like eruptions, worse in warmth; gouty joints"
  ],
  "clinicalApplications": [
    "Hyperacidity",
    "Sour indigestion",
    "Intestinal parasites",
    "Gouty diathesis"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "hyperacidity",
      "name": "Hyperacidity"
    },
    {
      "id": "sour-indigestion",
      "name": "Sour indigestion"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
},
  {
  "id": "natrum-sulph",
  "name": "Natrum Sulphuricum",
  "latinName": "Sodium sulphate",
  "family": "Mineral",
  "origin": "Biochemic Tissue Salt (Mineral)",
  "description": "Natrum Sulphuricum is the hydrogenoid remedy, highly sensitive to water in any form, damp weather, and living in damp basements or cellars. It has a powerful action on the liver, as well as a celebrated morning diarrhea driving the patient out of bed shortly after rising.",
  "keyCharacteristics": [
    "Extreme sensitivity and aggravation from dampness, wet weather, water in any form, or living in damp rooms",
    "Morning diarrhea, driving patient out of bed shortly after rising, with much flatulence",
    "Chronic effects of head injuries, with vertigo, mental troubles, and epilepsy therefrom",
    "Asthma worse with every damp, rainy spell, with rattling of mucus in chest"
  ],
  "modalities": {
    "better": [
      "Dry weather",
      "Warm, dry air",
      "Pressure",
      "Changing position"
    ],
    "worse": [
      "Dampness",
      "Rainy weather",
      "Water in any form",
      "Living in basements or cells",
      "Music",
      "Sunset to sunrise"
    ]
  },
  "thermal": "Chilly",
  "thirst": "Thirst for ice cold water during fever",
  "mind": [
    "Lively music saddens; weeping and deep sadness, must exercise restraint from suicidal impulses",
    "Irritation and mental dullness, particularly after head trauma",
    "Inability to think; dislikes to speak, or to be spoken to"
  ],
  "physical": [
    "Piercing pain in right hypochondrium; liver is swollen and sore to touch, cannot bear tight clothing",
    "Thick, yellow-green, or greenish-yellow sputum, with painful soreness of chest on coughing",
    "Bitter taste in mouth, with dirty greenish-yellow coating on tongue"
  ],
  "clinicalApplications": [
    "Asthma in wet weather",
    "Morning diarrhea",
    "Head injury sequelae",
    "Liver disorders"
  ],
  "comparisons": [],
  "relatedAilments": [
    {
      "id": "asthma-in-wet-weather",
      "name": "Asthma in wet weather"
    },
    {
      "id": "morning-diarrhea",
      "name": "Morning diarrhea"
    }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800"
},
{
  "id": "aloe",
  "name": "Aloe Socotrina",
  "latinName": "Aloe socotrina",
  "family": "Plant",
  "origin": "Socotrine Aloe (Liliaceae) | Prover: Helbig",
  "description": "The hallmark of Aloe is the 'Insecurity of Rectum'—the patient feels they may lose stool at any moment. It is also a premier remedy for blue, grape-like hemorrhoids and gastrointestinal disorders alternating with skin complaints.",
  "keyCharacteristics": [
    "Insecurity of rectum: weak sphincter and loss of control",
    "Jelly-like mucus from all mucous membranes",
    "Blue grape-like hemorrhoids, swollen, bleeding, and sore",
    "Diarrhoea early in the morning on getting out of bed",
    "Diarrhoea alternating with constipation"
  ],
  "modalities": {
    "better": ["Cold applications", "Cold weather", "Open air"],
    "worse": ["Heat", "Warm weather", "After eating", "Standing"]
  },
  "thermal": "Hot",
  "thirst": "Thirsty.",
  "mind": [
    "Dissatisfied and irritable, especially during constipation",
    "Angry with self and because of complaints",
    "Indolent and sedentary individuals"
  ],
  "physical": [
    "Involuntary solid stool may escape; lack of rectal sensation",
    "Abdominal rumbling and gas before stool",
    "Cutting and griping pains during stool followed by prostration",
    "Hemorrhoids tender and burning; bearing-down pain in rectum"
  ],
  "clinicalApplications": [
    "Diarrhoea and Dysentery",
    "Hemorrhoids (Piles)",
    "Constipation",
    "Portal congestion",
    "After-effects of excessive medication"
  ],
  "comparisons": [
    { "id": "sulphur", "name": "Sulphur", "keyDifference": "Both have early morning diarrhoea, but Aloe is more focused on rectal insecurity and jelly-like mucus." }
  ],
  "relatedAilments": [
    { "id": "digestive-issues", "name": "Diarrhoea" },
    { "id": "haemorrhoids", "name": "Piles" }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1596708051493-99d91f24e930?auto=format&fit=crop&q=80&w=800"
},
{
  "id": "calc-carb",
  "name": "Calcarea Carbonica",
  "latinName": "Calcium Carbonate",
  "family": "Animal",
  "origin": "Middle layer of the Oyster Shell | Prover: Hahnemann",
  "description": "One of the greatest constitutional anti-psoric remedies. It is suited to individuals who are 'Fat, Fair, Flabby, Fearful, and Perspiring.' It acts deeply on nutrition, bone formation, and the glandular system.",
  "keyCharacteristics": [
    "Profuse head perspiration, especially during sleep (soaks the pillow)",
    "Fat, fair, and flabby constitution with soft muscles",
    "Delayed milestones in children (walking, teething, closure of fontanelles)",
    "Extreme chilliness; sensitive to cold and damp weather",
    "Strong craving for eggs and indigestible things like chalk or pencils",
    "Easy fatigue from slight exertion like climbing stairs"
  ],
  "modalities": {
    "better": ["Dry weather", "Warm clothing", "Rest"],
    "worse": ["Cold and damp", "Exertion", "Climbing stairs", "Mental work"]
  },
  "thermal": "Chilly",
  "thirst": "Thirst for cold drinks.",
  "mind": [
    "Anxiety about health, future, and financial matters",
    "Fear of heights, insanity, and misfortune",
    "Slow comprehension; forgetful and easily discouraged"
  ],
  "physical": [
    "Large head with fontanelles remaining open too long; pot-bellied abdomen",
    "Enlarged glands (tonsils, adenoids, cervical glands)",
    "Bones are weak; rickets and curvature of bones",
    "Ravenous hunger but weak digestion; excessive gas",
    "Early and profuse menstruation; chronic leucorrhoea"
  ],
  "clinicalApplications": [
    "Delayed development",
    "Rickets and Bone diseases",
    "Obesity",
    "Glandular swellings",
    "Hypothyroidism",
    "Menstrual disorders"
  ],
  "comparisons": [
    { "id": "sulphur", "name": "Sulphur", "keyDifference": "Calc-Carb is chilly and fat; Sulphur is hot and lean." },
    { "id": "baryta-carb", "name": "Baryta Carb", "keyDifference": "Calc-Carb is fat; Baryta Carb is underdeveloped and dwarf-like." }
  ],
  "relatedAilments": [
    { "id": "obesity", "name": "Obesity" },
    { "id": "bone-health", "name": "Delayed Growth" }
  ],
  "imageUrl": "https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800"
}
];
