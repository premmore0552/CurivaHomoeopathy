export interface RemedySuggestion {
  remedy: string;
  indication: string;
  potency?: string;
  frequency?: string;
}

export interface ConditionData {
  id: string;
  name: string;
  description: string;
  suggestions: RemedySuggestion[];
}

export const remedyDatabase: ConditionData[] = [
  {
    id: 'abdomen',
    name: 'Abdomen',
    description: 'General abdominal discomfort and distention.',
    suggestions: [
      { remedy: 'Abies nig.', indication: 'Sensation of a lump at the cardiac end of the stomach.', potency: '30', frequency: 'bd' },
      { remedy: 'Aceticum acidum', indication: 'Feel relieved by lying on the abdomen.' },
      { remedy: 'Ambra grisea', indication: 'Sensation of weakness in the abdomen in old people after passing a stool.', frequency: 'bd' },
      { remedy: 'Apocynum can.', indication: 'Bloated due to dropsy; may reduce weight if caused by fluid.', potency: '3x', frequency: 'tds' },
      { remedy: 'Bacillinum', indication: 'When abdomen is distended in thin, delicate children.', potency: '200', frequency: 'once every 15 days' },
      { remedy: 'Calcarea carb.', indication: 'Abdominal distention in fair, fleshy individuals who cannot bear tight clothing around the waist.', frequency: 'bd' },
      { remedy: 'Carbo veg.', indication: 'Bloating with contracting pain extending to the chest; better by passing wind.', frequency: 'tds' },
      { remedy: 'Colchicum autum.', indication: 'Abdomen bloated with gas; inability to stretch legs.', frequency: 'tds' }
    ]
  },
  {
    id: 'acidity',
    name: 'Acidity & Heartburn',
    description: 'Substernal pain and burning associated with reflux of gastric juices.',
    suggestions: [
      { remedy: 'Acidum phos.', indication: 'Heartburn with flatulence, diarrhea, and debility; craving for juicy things.', frequency: 'tds' },
      { remedy: 'Acidum sulph.', indication: 'Chronic acidity with burning in the esophagus; sour vomiting.', frequency: 'tds' },
      { remedy: 'Ammonium carb.', indication: 'Heartburn with pain in the pit of the stomach; nausea.', frequency: 'tds' },
      { remedy: 'Argentum nit.', indication: 'Acidity in nervous individuals due to anticipation of events; desire for sweets.', frequency: 'tds' },
      { remedy: 'Natrium phos.', indication: 'Occasional acidity with flatulence and sour risings; suited to children.', potency: '6x', frequency: 'tds' },
      { remedy: 'Robinia', indication: 'Acidity worse at night; irritating eructations and frontal headache.', frequency: 'tds' }
    ]
  },
  {
    id: 'acne',
    name: 'Acne (Pimples)',
    description: 'Inflammatory disease of sebaceous (oil) glands common during puberty.',
    suggestions: [
      { remedy: 'Antimonium crud.', indication: 'Pimples on face and shoulders in individuals with dry skin and indigestion.', frequency: 'tds' },
      { remedy: 'Arsenicum brom.', indication: 'Violet papules on the nose, often worse in spring; common in young girls.', frequency: 'bd' },
      { remedy: 'Berberis aq.', indication: 'Clears complexion and helps remove marks left after cure of acne.', frequency: 'bd' },
      { remedy: 'Kalium brom.', indication: 'Itchy pimples on face, chest, and shoulders; may be associated with hormonal changes.', frequency: 'tds' },
      { remedy: 'Pulsatilla nig.', indication: 'Pimples worse at puberty, especially in girls with delayed menses.', frequency: 'tds' }
    ]
  },
  {
    id: 'allergy',
    name: 'Allergy',
    description: 'Susceptibility to substances that are typically harmless to others.',
    suggestions: [
      { remedy: 'Acidum sulph.', indication: 'Allergy to air pollen.', frequency: 'tds' },
      { remedy: 'Ailanthus g.', indication: 'Asthma-like symptoms triggered by the smell of flowers.', frequency: 'tds' },
      { remedy: 'Allium cepa', indication: 'Allergic coryza with violent sneezing, worse in August (pollen season).', frequency: 'tds' },
      { remedy: 'Apis mel.', indication: 'Skin allergy worse by heat; puffiness with redness and burning.', potency: '200', frequency: 'tds' },
      { remedy: 'Aralia r.', indication: 'Respiratory troubles and asthma caused by dust.', frequency: 'tds' }
    ]
  },
  {
    id: 'asthma',
    name: 'Asthma',
    description: 'Narrowing of the windpipe causing obstruction of breathing, cough, and expectoration.',
    suggestions: [
      { remedy: 'Aconitum ferox', indication: 'Asthmatic attacks worse after midnight and on motion.', potency: '3C', frequency: '2 hourly during attacks' },
      { remedy: 'Antimonium tart.', indication: 'Great rattling of mucus but very little is expectorated; difficult breathing.', frequency: 'tds' },
      { remedy: 'Arsenicum alb.', indication: 'Asthma worse at midnight; unable to lie down due to fear of suffocation.', frequency: 'tds' },
      { remedy: 'Aspidosperma', indication: 'A tonic for the lungs; useful in cardiac asthma.', potency: 'Q', frequency: 'every 2 hours if needed' },
      { remedy: 'Blatta orient.', indication: 'Excellent for acute cases; patient gets worse in rainy weather.', potency: 'Q to 3x', frequency: 'tds' },
      { remedy: 'Carbo veg.', indication: 'Asthma in old people; cough with gagging and bluish face.', frequency: 'tds' }
    ]
  },
  {
    id: 'backache',
    name: 'Backache & Lumbago',
    description: 'Pain in the mid and lower back.',
    suggestions: [
      { remedy: 'Aconitum nap.', indication: 'Sudden backache after exposure to cold, dry winds.', frequency: 'tds' },
      { remedy: 'Aesculus hip.', indication: 'Backache in the lower region; patient feels better by standing.', frequency: 'tds' },
      { remedy: 'Agaricus mus.', indication: 'Stiffness of the spine with shooting and burning pains.', frequency: 'tds' },
      { remedy: 'Arnica mont.', indication: 'Backache due to over-exertion or an accident.', frequency: 'tds' },
      { remedy: 'Bryonia alba', indication: 'Backache worse from motion and better by rest and pressure.', frequency: 'tds' },
      { remedy: 'Calcarea carb.', indication: 'Backache on rising from a seat or due to an old injury.', frequency: 'tds' }
    ]
  },
  {
    id: 'bones',
    name: 'Bones',
    description: 'Affections including inflammation, decay (necrosis), and curvature.',
    suggestions: [
      { remedy: 'Aurum met.', indication: 'Pain in bones worse at night; useful for enlarged bones.', frequency: 'tds' },
      { remedy: 'Calcarea carb.', indication: 'Soft bones or curvature of the spine and long bones.', frequency: 'tds' },
      { remedy: 'Calcarea phos.', indication: 'Weak bones that are easily breakable; helpful in creating new marrow.', potency: '6x', frequency: 'qid' },
      { remedy: 'Hekla lava', indication: 'Marked action on jaw bone diseases and abnormal growths.', potency: '3x', frequency: 'tds' },
      { remedy: 'Symphytum off.', indication: 'Great remedy for fractures; acts as a "glue" for joining bones.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'heart',
    name: 'Heart & Angina',
    description: 'Diseases including angina pectoris and myocardial health.',
    suggestions: [
      { remedy: 'Aconitum nap.', indication: 'Sudden attack of angina with acute pain radiating to the left shoulder.', frequency: 'qid' },
      { remedy: 'Cactus', indication: 'Heart conditions with a feeling of constriction as if an iron band is around the heart.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Crataegus oxy.', indication: 'Cardiac tonic used for senile heart and hypertension.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Digitalis', indication: 'Angina with a feeling as if the heart would cease working; worse by movement.', frequency: 'qid' },
      { remedy: 'Glonoinum', indication: 'Violent beating of the heart as if it will burst open.', potency: '30', frequency: 'qid' }
    ]
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    description: 'Difficulty in falling or staying asleep.',
    suggestions: [
      { remedy: 'Aconitum nap.', indication: 'Sleeplessness caused by fear, shock, or over-excitement.', potency: '200', frequency: 'every 15 mins till sleep' },
      { remedy: 'Alfalfa', indication: 'Induces quiet, peaceful, and refreshing sleep.', potency: 'Q', frequency: 'bd' },
      { remedy: 'Coffea cruda', indication: 'Sleeplessness due to a rush of ideas or pleasant surprises.', frequency: 'tds' },
      { remedy: 'Passiflora', indication: 'Useful for insomnia due to worry and mental activity.', potency: 'Q', frequency: 'near bedtime' },
      { remedy: 'Pulsatilla nig.', indication: 'Sleepy in the afternoon, wide awake in the evening.', frequency: 'tds' }
    ]
  },
  {
    id: 'albuminuria',
    name: 'Albuminuria',
    description: 'Presence of protein in urine, indicating possible renal dysfunction.',
    suggestions: [
      { remedy: 'Acidum phos.', indication: 'Albumin present during fever; urine is frequent and milky.', frequency: 'tds' },
      { remedy: 'Apis mel.', indication: 'Scanty urine with swelling of the body.', frequency: 'tds' },
      { remedy: 'Cantharis', indication: 'Burning urine voided in drops; useful if kidney infection is present.', potency: 'Q', frequency: '10 drops in water' },
      { remedy: 'Helonias', indication: 'Albuminous and alkaline urine; helpful during pregnancy.', potency: 'Q', frequency: '10 drops in water' }
    ]
  },
  {
    id: 'alcoholism',
    name: 'Alcoholism',
    description: 'Chronic dependence on alcohol and its resulting ill-effects.',
    suggestions: [
      { remedy: 'Acidum sulph.', indication: 'Removes craving for wines and brandy.', potency: 'Q', frequency: '5 drops when craving starts' },
      { remedy: 'Angelica', indication: 'Produces a natural dislike for alcohol products.', potency: 'Q', frequency: '5 drops tds' },
      { remedy: 'China off.', indication: 'Assists those wishing to reform by reducing cravings.', potency: 'Q', frequency: '10 drops bd' },
      { remedy: 'Quercus', indication: 'Diminishes the long-term desire for alcohol.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'alopecia',
    name: 'Alopecia (Baldness)',
    description: 'Partial or complete loss of hair due to aging, illness, or heredity.',
    suggestions: [
      { remedy: 'Acidum fluor.', indication: 'Hair falling in patches; often suited to older individuals.', frequency: 'tds' },
      { remedy: 'Calcarea phos.', indication: 'Hair falling out in bunches.', frequency: 'tds' },
      { remedy: 'Selenium met.', indication: 'Useful for general thinning of hair on the head.', frequency: 'tds' },
      { remedy: 'Vinca minor', indication: 'Cures matting of hair and promotes healthy regrowth.', frequency: 'tds' },
      { remedy: 'Wiesbaden', indication: 'Hair grows rapidly and tends to become darker.', frequency: 'tds' }
    ]
  },
  {
    id: 'alzheimers',
    name: "Alzheimer's Disease",
    description: 'Progressive mental deterioration common in older age groups.',
    suggestions: [
      { remedy: 'Lycopodium', indication: 'Helps maintain memory by slowing chemical breakdown in the brain.', frequency: 'tds' },
      { remedy: 'Rosmarinus', indication: 'Supports cognitive function and memory retention.', frequency: 'tds' },
      { remedy: 'Gingko', indication: 'Improves cerebral circulation and mental clarity.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Vitamin E', indication: 'Acts as an antioxidant to protect brain cells from damage.', potency: '200c' }
    ]
  }
];
