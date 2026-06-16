export interface Symptom {
  id: string;
  name: string;
  category: 'head' | 'chest' | 'abdomen' | 'limbs' | 'skin' | 'general';
  description?: string;
  matchingRemedies: {
    remedyId: string;
    weight: number; // 1 to 5 (importance score)
    reason: string; // Brief clinical explanation
  }[];
}

export interface MatchResult {
  remedyId: string;
  score: number;       // raw accumulated score
  matchPercentage: number; // calculated percentage
  matchedSymptoms: {
    symptomId: string;
    symptomName: string;
    weight: number;
    reason: string;
  }[];
}

export const symptomList: Symptom[] = [
  //=== Head & Mind ===
  {
    id: 'throbbing-headache',
    name: 'Throbbing & Congestive Headache',
    category: 'head',
    description: 'Pulsating or hammering head pain, often with a feeling of blood rushing to the head and hot flushed skin.',
    matchingRemedies: [
      { remedyId: 'belladonna', weight: 5, reason: 'Violent throbbing head pain, extreme heat, and bounding pulse.' },
      { remedyId: 'glonoinum', weight: 5, reason: 'Congestive sun headache, head feels bursting, aggravated by heat or sun exposure.' },
      { remedyId: 'aconite', weight: 3, reason: 'Sudden onset headache with hot forehead and severe anxiety.' },
      { remedyId: 'nat-mur', weight: 3, reason: 'Headache like hammering, worse from sunrise to sunset.' }
    ]
  },
  {
    id: 'sharp-stabbing-headache',
    name: 'Sharp, Stabbing or Splitting Headache',
    category: 'head',
    description: 'Sharp, cutting or stitching head pain that feels as if the head is splitting or opening.',
    matchingRemedies: [
      { remedyId: 'bryonia', weight: 5, reason: 'Splitting head pain, worse from the slightest movement of eyes or head.' },
      { remedyId: 'spigelia', weight: 4, reason: 'Sharp neuralgic pain, often settling over or behind the left eye.' },
      { remedyId: 'silicea', weight: 3, reason: 'Stabbing pain extending from the nape of neck to the forehead, better by warm wraps.' }
    ]
  },
  {
    id: 'heavy-band-headache',
    name: 'Dull & Heavy Band-Like Headache',
    category: 'head',
    description: 'A dull, heavy ache characterized by a feeling of a tight band wrapped around the forehead, or droopiness.',
    matchingRemedies: [
      { remedyId: 'gelsemium', weight: 5, reason: 'Dull, heavy headache starting in the neck, with heavy droopy eyelids and muscle weakness.' },
      { remedyId: 'nat-mur', weight: 3, reason: 'Chronic dull headache, feels like a tight vise.' },
      { remedyId: 'carbo-veg', weight: 3, reason: 'Dull heavy head with sleepiness and flatulent bloating.' }
    ]
  },
  {
    id: 'sudden-fever-onset',
    name: 'Sudden & Violent Fever Onset',
    category: 'head',
    description: 'Rapid elevation of body temperature that appears abruptly, often after physical exposure, fear, or a cold draft.',
    matchingRemedies: [
      { remedyId: 'aconite', weight: 5, reason: 'Chills and sudden fiery fever, especially after exposure to dry cold wind.' },
      { remedyId: 'belladonna', weight: 5, reason: 'High fever with burning hot skin, dilated pupils, flushed face, but cold extremities.' },
      { remedyId: 'gelsemium', weight: 3, reason: 'Slower onset fever with dullness, shaking chills upward, and no thirst.' }
    ]
  },
  {
    id: 'panic-anxiety-fear',
    name: 'Sudden Panic, Restlessness & Fear of Death',
    category: 'head',
    description: 'Intense mental panic, racing heart, and extreme physical tossing about, with a foreboding distress.',
    matchingRemedies: [
      { remedyId: 'aconite', weight: 5, reason: 'Supreme remedy for sudden panic attacks, palpitations, and fear of death.' },
      { remedyId: 'arsenicum-album', weight: 4, reason: 'Terrifying anxiety with midnight restlessness, fear of disease, and desire to sip water.' },
      { remedyId: 'gelsemium', weight: 3, reason: 'Anticipatory anxiety, stage fright, or nervous dread before an ordeal.' }
    ]
  },
  {
    id: 'grief-sadness',
    name: 'Grief, Suppressed Sadness & Silent Sorrow',
    category: 'head',
    description: 'Emotional shock, deep-seated sorrow, brooding on problems privately, or frequent involuntary sighing.',
    matchingRemedies: [
      { remedyId: 'ignatia', weight: 5, reason: 'Acute grief with rapid mood swings, globus hystericus (lump in throat), and frequent sighing.' },
      { remedyId: 'nat-mur', weight: 5, reason: 'Chronic silent grief, refuses consolation which aggravates them, desires salt.' },
      { remedyId: 'pulsatilla', weight: 3, reason: 'Weeps easily, seeks sympathy and comfort, better in fresh open air.' }
    ]
  },
  {
    id: 'irritability-impatience',
    name: 'Extreme Irritability, Impatience & Anger',
    category: 'head',
    description: 'Over-sensitive to noise, light, or criticism; easily offended, short-tempered, and driven by high stress.',
    matchingRemedies: [
      { remedyId: 'nux-vomica', weight: 5, reason: 'Irritable, fiery-tempered, cannot tolerate noise or light, driven "type-A" personality.' },
      { remedyId: 'chamomilla', weight: 5, reason: 'Exquisite anger, children scream and want to be carried, completely unappeased.' },
      { remedyId: 'lycopodium', weight: 4, reason: 'Arrogant or domineering behavior, morning bad temper, lacks self-confidence deep down.' }
    ]
  },

  //=== Chest & Respiratory ===
  {
    id: 'dry-barking-cough',
    name: 'Dry, Barking, Rasping Cough (Croupy)',
    category: 'chest',
    description: 'A dry, hollow, barking cough that sounds like sawing wood or a dog bark, usually worse in cold drafts.',
    matchingRemedies: [
      { remedyId: 'spongia', weight: 5, reason: 'Dry, rasping, croupy cough sounding like a saw going through pine wood.' },
      { remedyId: 'aconite', weight: 4, reason: 'First stage of croupy cough with restlessness, fear, and dry fever.' },
      { remedyId: 'drosera', weight: 3, reason: 'Spasmodic paroxysmal cough, tickling in larynx like a feather.' }
    ]
  },
  {
    id: 'spasmodic-violent-cough',
    name: 'Convulsive & Fit-Like Cough (Paroxysmal)',
    category: 'chest',
    description: 'Fits of coughing coming on in rapid succession, making it difficult to breathe, sometimes causing retching.',
    matchingRemedies: [
      { remedyId: 'drosera', weight: 5, reason: 'Severe tickling cough in paroxysms, so rapid they can barely catch their breath.' },
      { remedyId: 'ipecac', weight: 4, reason: 'Continuous suffocating cough with persistent nausea and stiffening of the body.' },
      { remedyId: 'spongia', weight: 3, reason: 'Dry, suffocating cough relieved by swallowing warm food/drinks.' }
    ]
  },
  {
    id: 'asthma-rattling',
    name: 'Asthma with Rattling Phlegm or Wheezing',
    category: 'chest',
    description: 'Shortness of breath with noisy wheezing and mucus rattling inside the chest, aggravated by dampness or exertion.',
    matchingRemedies: [
      { remedyId: 'blatta-orientalis', weight: 5, reason: 'Specific acute remedy for asthma with severe cough and dyspnea.' },
      { remedyId: 'ipecac', weight: 4, reason: 'Wheezy rattled breathing with deep chest congestion and nausea.' },
      { remedyId: 'natrum-sulph', weight: 4, reason: 'Asthma triggered or severely aggravated by damp weather or humid basements.' }
    ]
  },
  {
    id: 'chest-constriction',
    name: 'Chest Oppression & "Iron Band" Sensation',
    category: 'chest',
    description: 'Sensation as if the lungs are restricted or the chest is locked tightly, or clamped by an iron band.',
    matchingRemedies: [
      { remedyId: 'cactus-g', weight: 5, reason: 'Sensation as if the chest/heart is squeezed by an iron band.' },
      { remedyId: 'gelsemium', weight: 3, reason: 'Inability to take a deep breath owing to nervous constriction.' },
      { remedyId: 'aconite', weight: 3, reason: 'Sudden chest tightening with anxiety, tingling down the left arm.' }
    ]
  },
  {
    id: 'irritant-sneezing',
    name: 'Sneezing, Running Nose & Burning Tears',
    category: 'chest',
    description: 'Watery, profuse nasal discharge that burns the nostrils, with streaming eyes, sneezing, and raw throat.',
    matchingRemedies: [
      { remedyId: 'allium-cepa', weight: 5, reason: 'Acrid burning nasal discharge (excoriating the skin) with bland watery tears.' },
      { remedyId: 'euphrasia', weight: 5, reason: 'Acrid burning tears (scalding cheeks) with a bland running nose.' },
      { remedyId: 'kali-mur', weight: 3, reason: 'White, round, thick nasal discharge with stuffy nose.' }
    ]
  },

  //=== Abdomen & Digestive ===
  {
    id: 'acidity-heartburn',
    name: 'Severe Acidity, Heartburn & Sourness',
    category: 'abdomen',
    description: 'Hot burning in stomach radiating up, sour/acid belching that sets teeth on edge, or heavy nausea.',
    matchingRemedies: [
      { remedyId: 'robinia', weight: 5, reason: 'Intensely sour regurgitations, acid vomiting, worse at night or after eating.' },
      { remedyId: 'nux-vomica', weight: 4, reason: 'Acidity, heartburn and nausea from overeating, alcohol, coffee, or spices.' },
      { remedyId: 'arsenicum-album', weight: 4, reason: 'Stomach burns like fire, temporarily relieved by sipping hot fluids.' },
      { remedyId: 'lycopodium', weight: 3, reason: 'Sour taste, acid reflux, bloated feeling even after eating very little.' }
    ]
  },
  {
    id: 'bloating-upper-stomach',
    name: 'Bloating & Gas in Upper Abdomen',
    category: 'abdomen',
    description: 'Stomach feels stretched and full of gas immediately after eating, relieved temporarily by passing wind/belching.',
    matchingRemedies: [
      { remedyId: 'carbo-veg', weight: 5, reason: 'Great flatulence in upper abdomen; the stomach is full, heavy; relieved by belching.' },
      { remedyId: 'nux-vomica', weight: 3, reason: 'Upper stomach feels loaded, tight, and painful several hours after eating.' }
    ]
  },
  {
    id: 'bloating-lower-stomach',
    name: 'Bloating & Gas in Lower Abdomen',
    category: 'abdomen',
    description: 'Rumbling gas inside lower abdomen, abdomen feels extremely swollen, appetite is full but satified by first few bites.',
    matchingRemedies: [
      { remedyId: 'lycopodium', weight: 5, reason: 'Flatulence in lower abdomen, feels bloated and full after a few bites, desires warm sweets.' },
      { remedyId: 'carbo-veg', weight: 3, reason: 'Rumbling and heaviness throughout abdomen, desires to be fanned.' }
    ]
  },
  {
    id: 'persistent-nausea',
    name: 'Persistent Nausea (Clean Tongue)',
    category: 'abdomen',
    description: 'Inextinguishable nausea, unaffected and unrelieved by actual vomiting; tongue is clean and pink.',
    matchingRemedies: [
      { remedyId: 'ipecac', weight: 5, reason: 'Constant nausea and retching with clean, uncoated tongue; saliva is increased.' },
      { remedyId: 'nux-vomica', weight: 3, reason: 'Nausea, wishes they could vomit to feel better ("expects to vomit, but cannot").' }
    ]
  },
  {
    id: 'cramps-colic',
    name: 'Spasmodic Cramps & Doubling Over Colic',
    category: 'abdomen',
    description: 'Severe, twisting belly pain or digestive cramps, relieved by hard pressure or doubling body forward.',
    matchingRemedies: [
      { remedyId: 'colocynthis', weight: 5, reason: 'Agonizing cutting pain, relieved by bending double or pressing hard against abdomen.' },
      { remedyId: 'mag-phos', weight: 5, reason: 'Cramping spasmodic pain relieved by hot applications and pressure.' },
      { remedyId: 'chamomilla', weight: 3, reason: 'Extremely painful flatulent colic with fierce anger/screaming.' }
    ]
  },
  {
    id: 'constipation-ineffectual-urging',
    name: 'Constipation with Ineffectual Urging',
    category: 'abdomen',
    description: 'Constant feeling of needing to evacuate, but passing only small amounts or failing altogether.',
    matchingRemedies: [
      { remedyId: 'nux-vomica', weight: 5, reason: 'Ineffectual, frequent urging; feels like part of the stool remains behind.' },
      { remedyId: 'lycopodium', weight: 4, reason: 'Dry, hard stool, difficult to pass; feels full and heavy afterwards.' },
      { remedyId: 'sulphur', weight: 3, reason: 'Constipation with itching and burning in anus, worse raw heat.' }
    ]
  },

  //=== Musculoskeletal (Limbs & Joints) ===
  {
    id: 'bruised-soreness-trauma',
    name: 'Soreness, Physical Bruising & Muscle Fatigue',
    category: 'limbs',
    description: 'Bruised, sore feeling all over, as if beaten; muscles are overstrained, heavy, or injured; bed feels too hard.',
    matchingRemedies: [
      { remedyId: 'arnica', weight: 5, reason: 'Premier trauma remedy. Sore, lame, bruised feeling all over. Bed feels hard.' },
      { remedyId: 'ruta', weight: 4, reason: 'Bruised periosteum, tendons, and ligament strain (wrists, ankles), bone-soreness.' },
      { remedyId: 'bryonia', weight: 3, reason: 'Sore muscles, but feels much worse from the slightest movement.' }
    ]
  },
  {
    id: 'stiffness-motion-relief',
    name: 'Joint Stiffness (Better Continuing Motion)',
    category: 'limbs',
    description: 'Joints are stiff and painful on starting to walk, but the pain decreases or disappears with continued gentle walking.',
    matchingRemedies: [
      { remedyId: 'rhus-tox', weight: 5, reason: 'Stiffness from sprains/overexertion; worse on first moving, better by continuous motion.' },
      { remedyId: 'pulsatilla', weight: 3, reason: 'Wandering joint pains, relieved by slow, gentle walking and cold air.' }
    ]
  },
  {
    id: 'motion-aggravation',
    name: 'Joint Pain (Worse from Slightest Motion)',
    category: 'limbs',
    description: 'Inflamed or aching joints and muscles that feel excruciatingly worse from any movement; relieved only by absolute rest.',
    matchingRemedies: [
      { remedyId: 'bryonia', weight: 5, reason: 'Stitching, tearing joint pain, aggravated by the slightest movement, relieved by rest.' },
      { remedyId: 'arnica', weight: 3, reason: 'Bruised joints, hates to be approached or touched.' }
    ]
  },
  {
    id: 'tendon-periosteal-injury',
    name: 'Tendon Strain & Ligament Injuries',
    category: 'limbs',
    description: 'Injuries, sprains, or strains specifically targeting the ligaments, wrists, ankles, or cartilage over the bone.',
    matchingRemedies: [
      { remedyId: 'ruta', weight: 5, reason: 'Specifically suited for periosteal and tendon injuries, sprains, overworked eyes, wrists.' },
      { remedyId: 'arnica', weight: 3, reason: 'Primary soft-tissue trauma and swelling, muscle soreness.' }
    ]
  },

  //=== Skin & External ===
  {
    id: 'purulent-skin-eruptions',
    name: 'Hot Skin Eruptions, Abscesses & Boils',
    category: 'skin',
    description: 'Skin lesions, painful pimples, boils, or abscesses that are highly sensitive to touch, full of pus, or hot.',
    matchingRemedies: [
      { remedyId: 'hepar-sulph', weight: 5, reason: 'Extremely sensitive boils or abscesses with splinter-like sticking pains, highly chilled.' },
      { remedyId: 'silicea', weight: 4, reason: 'Accelerates suppuration (pus drainage) of boils, splinters, or healing of slow skin sores.' },
      { remedyId: 'sulphur', weight: 3, reason: 'Dry, scaly eruptions, severe itching, burning when scratched.' }
    ]
  },
  {
    id: 'dry-cracked-skin',
    name: 'Dry, Deeply Cracked Skin (Winter-Worse)',
    category: 'skin',
    description: 'Thick, leathery skin with deep raw fissures or cracks that bleed, especially in the winter or cold weather.',
    matchingRemedies: [
      { remedyId: 'petroleum', weight: 5, reason: 'Deep cracks on hands, fingertips, or toes, bleeding and painful, noticeably worse in winter.' },
      { remedyId: 'graphites', weight: 4, reason: 'Thick skin cracks with sticky, honey-like fluid oozing out.' },
      { remedyId: 'sulphur', weight: 3, reason: 'Dry, irritable, unhealthy skin; scratching turns burning.' }
    ]
  },
  {
    id: 'stinging-burning-swellings',
    name: 'Stinging, Burning, Hot Red Swellings',
    category: 'skin',
    description: 'Eruptions or puffiness that burn and sting like a bee sting, feeling hot and better from cold applications.',
    matchingRemedies: [
      { remedyId: 'apis', weight: 5, reason: 'Edematous hot puffiness with sharp stinging, biting pains, relieved by cold compresses.' },
      { remedyId: 'arsenicum-album', weight: 4, reason: 'Burning skin rashes, dry, but uniquely relieved by warm applications.' },
      { remedyId: 'sulphur', weight: 4, reason: 'Intense itching and burning all over, worse from heat of bed or bathing.' }
    ]
  },
  {
    id: 'burning-soles-palms-night',
    name: 'Burning Soles & Palms in Bed',
    category: 'skin',
    description: 'Intolerable heat in the soles of the feet and palms of the hands at night, forcing the person to stick them out of the blankets.',
    matchingRemedies: [
      { remedyId: 'sulphur', weight: 5, reason: 'Egoistic, messy, hot-blooded; burning soles of feet at night, must expose them to stay cool.' },
      { remedyId: 'chamomilla', weight: 3, reason: 'Intolerable burning heat with restlessness and rage.' }
    ]
  },

  //=== General Modalities (Sensitivities) ===
  {
    id: 'general-chilly-desires-heat',
    name: 'Intensely Chilly (Feels better from Heat & Warmth)',
    category: 'general',
    description: 'Lacks native body heat; highly sensitive to cold drafts, cold rooms; feels comforted by thick covers and warm drinks.',
    matchingRemedies: [
      { remedyId: 'arsenicum-album', weight: 4, reason: 'Extremely chilly; craves warm wrapping and hot water sips.' },
      { remedyId: 'nux-vomica', weight: 4, reason: 'Chilly, wants to be covered warmly, even a breath of fresh air causes shivering.' },
      { remedyId: 'hepar-sulph', weight: 4, reason: 'Hypersensitive to cold drafts, touch; requires wrapping for comfort.' },
      { remedyId: 'silicea', weight: 3, reason: 'Wants head covered up warm, highly chilly.' }
    ]
  },
  {
    id: 'general-hot-desires-cold',
    name: 'Hot & Suffocated (Feels better from Cold & Open Air)',
    category: 'general',
    description: 'Has excessive body heat; feels suffocated inside closed warm rooms; finds immediate comfort in fresh open air or cold applications.',
    matchingRemedies: [
      { remedyId: 'sulphur', weight: 4, reason: 'Highly hot-blooded; hates warmth, throws off bedclothes.' },
      { remedyId: 'pulsatilla', weight: 4, reason: 'Suffocates in a warm closed room; highly relieved by gentle open fresh air.' },
      { remedyId: 'apis', weight: 4, reason: 'Intolerable local heat; cannot bear hot rooms, relieved by ice-cold applications.' }
    ]
  },
  {
    id: 'general-thirsty-large',
    name: 'Thirsty for Large Quantities of Water',
    category: 'general',
    description: 'Drinking massive amounts of cold water at long intervals; mouth feels dry and hot.',
    matchingRemedies: [
      { remedyId: 'bryonia', weight: 4, reason: 'Dry mucous membranes, craves large drinks of cold water at long intervals.' },
      { remedyId: 'aconite', weight: 3, reason: 'Burning, unquenchable thirst for large quantities of cold water during acute fever.' }
    ]
  },
  {
    id: 'general-thirstless',
    name: 'Completely Thirstless (Even with fever)',
    category: 'general',
    description: 'Has zero interest in drinking liquids, even during high body temperatures or fever; mouth is dry but water tastes bad or is rejected.',
    matchingRemedies: [
      { remedyId: 'pulsatilla', weight: 4, reason: 'Thirstless in almost all complaints; mouth dry but no desire to drink.' },
      { remedyId: 'gelsemium', weight: 4, reason: 'Complete thirstlessness during dull heavy fevers.' },
      { remedyId: 'apis', weight: 3, reason: 'Thirstless during inflammatory puffy swellings/dropsy.' }
    ]
  },
  {
    id: 'general-thirsty-frequent-sips',
    name: 'Thirsty for Instant Tiny Sips of Cold Water',
    category: 'general',
    description: 'Wants to drink small mouthfuls of cold water very frequently, which seems to comfort the stomach temporarily but then burns.',
    matchingRemedies: [
      { remedyId: 'arsenicum-album', weight: 5, reason: 'Distinctive symptom: thirst for cold water, drinking little and often (sips frequently).' }
    ]
  }
];

export function performSymptomMatching(selectedSymptomIds: string[]): MatchResult[] {
  if (selectedSymptomIds.length === 0) return [];

  // Track scores per remedy
  const scores: Record<string, {
    rawScore: number;
    matchedSymptoms: {
      symptomId: string;
      symptomName: string;
      weight: number;
      reason: string;
    }[];
  }> = {};

  // Track max potential score per remedy across selected symptoms
  // to give a proportionate percentage match
  const maxPossibleRemedyScore: Record<string, number> = {};

  // For each symptom selected, add its matched remedy contributions
  selectedSymptomIds.forEach((sid) => {
    const sObj = symptomList.find(s => s.id === sid);
    if (!sObj) return;

    sObj.matchingRemedies.forEach((match) => {
      const rId = match.remedyId;
      if (!scores[rId]) {
        scores[rId] = { rawScore: 0, matchedSymptoms: [] };
      }
      
      scores[rId].rawScore += match.weight;
      scores[rId].matchedSymptoms.push({
        symptomId: sObj.id,
        symptomName: sObj.name,
        weight: match.weight,
        reason: match.reason
      });
    });
  });

  // Calculate sum of weights for the selected symptoms to act as normalization factor
  // To make it scientifically calibrated, standard score normalization:
  const results: MatchResult[] = Object.entries(scores).map(([remedyId, record]) => {
    // Collect the total weight of selected symptoms that COULD map to this remedy
    // Sort matched symptoms descendly by weight
    const sortedMatches = [...record.matchedSymptoms].sort((a, b) => b.weight - a.weight);

    // Sum weights of selected symptoms
    let userSelectedSymptomWeightSum = 0;
    selectedSymptomIds.forEach((sid) => {
      const sObj = symptomList.find(s => s.id === sid);
      if (!sObj) return;
      // find remedy mapping or general significance
      const matchedMap = sObj.matchingRemedies.find(m => m.remedyId === remedyId);
      if (matchedMap) {
        userSelectedSymptomWeightSum += matchedMap.weight;
      }
    });

    // Calibrate percent match
    // E.g., if we matched 8 score out of maximum possible selected weight sum of 15, that is 53%
    const scaleFactor = Math.min(100, Math.round((record.rawScore / userSelectedSymptomWeightSum) * 100));

    return {
      remedyId,
      score: record.rawScore,
      matchPercentage: isNaN(scaleFactor) ? 0 : scaleFactor,
      matchedSymptoms: sortedMatches
    };
  });

  // Sort by match percentagedescending, then raw score descending
  return results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return b.score - a.score;
  });
}
