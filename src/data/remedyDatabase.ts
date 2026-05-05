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
    id: 'acidity',
    name: 'Acidity & Heartburn',
    description: 'Burning sensation in the chest caused by stomach acid.',
    suggestions: [
      { remedy: 'Carbo veg.', indication: 'Aching in stomach; better by belching.', frequency: 'tds' },
      { remedy: 'Nux vomica', indication: 'Acidity after heavy meals or alcohol.', frequency: 'ts' },
      { remedy: 'Robinia', indication: 'Intense acidity; sour vomiting that sets teeth on edge.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'alopecia',
    name: 'Alopecia (Hair Loss)',
    description: 'Loss of hair from part of the head or body.',
    suggestions: [
      { remedy: 'Acid fluor.', indication: 'Hair falls out in patches; scalp is itchy.', frequency: 'bd' },
      { remedy: 'Selenium', indication: 'Hair falls out from head, eyebrows, and beard.', frequency: 'bd' },
      { remedy: 'Wiesbaden', indication: 'Promotes rapid hair growth and makes it darker.', potency: '30', frequency: 'bd' }
    ]
  },
  {
    id: 'asthma',
    name: 'Asthma',
    description: 'Respiratory condition marked by spasms in the bronchi of the lungs.',
    suggestions: [
      { remedy: 'Blatta orientalis', indication: 'Specific remedy for acute asthma attacks.', potency: 'Q', frequency: '10 drops in water' },
      { remedy: 'Ipecac', indication: 'Asthma with nausea; rattling in chest but no phlegm.', frequency: 'tds' },
      { remedy: 'Natrum sulph.', indication: 'Asthma worse in damp weather; "Hydrogenoid" constitution.', frequency: 'bd' }
    ]
  },
  {
    id: 'backache-acute',
    name: 'Backache (Acute)',
    description: 'Sudden pain in the back, often from strain.',
    suggestions: [
      { remedy: 'Berberis vul.', indication: 'Stitching pain in lumbar region; radiates to bladder.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Gnaphalium', indication: 'Backache with numbness; better by sitting.', frequency: 'tds' },
      { remedy: 'Rhus tox.', indication: 'Pain after lifting heavy weights; better by motion.', frequency: 'tds' }
    ]
  },
  {
    id: 'chest-pain',
    name: 'Chest Pain',
    description: 'Discomfort or pain in the chest area.',
    suggestions: [
      { remedy: 'Aconite', indication: 'Sudden chest pain with anxiety and cold sweat.', frequency: 'hourly' },
      { remedy: 'Cactus g.', indication: 'Sensation as if chest is squeezed by an iron band.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Spigelia', indication: 'Stabbing pains in heart region; radiating to left arm.', frequency: 'tds' }
    ]
  },
  {
    id: 'fainting',
    name: 'Fainting (Syncope)',
    description: 'Temporary loss of consciousness caused by a fall in blood pressure.',
    suggestions: [
      { remedy: 'Camphora', indication: 'Sudden collapse; body feels icy cold.', frequency: '15 mins' },
      { remedy: 'Moschus', indication: 'Fainting in nervous or hysterical individuals.', frequency: 'tds' },
      { remedy: 'Rescue Remedy', indication: 'Emergency mix for shock and emotional collapse.', frequency: 'as needed' }
    ]
  },
  {
    id: 'gastritis',
    name: 'Gastritis',
    description: 'Inflammation of the stomach lining.',
    suggestions: [
      { remedy: 'Argentum nit.', indication: 'Gastritis with flatulence; better by belching.', frequency: 'tds' },
      { remedy: 'Arsenicum alb.', indication: 'Burning pain in stomach; better by hot drinks.', frequency: 'bd' },
      { remedy: 'Nux vomica', indication: 'Gastritis after intake of spicy food and coffee.', frequency: 'tds' }
    ]
  },
  {
    id: 'hiccups',
    name: 'Hiccups',
    description: 'Involuntary contractions of the diaphragm.',
    suggestions: [
      { remedy: 'Cicuta vir.', indication: 'Loud, spasmodic hiccups; associated with spasms.', frequency: 'tds' },
      { remedy: 'Ginseng', indication: 'Chronic hiccups in elderly people.', potency: 'Q', frequency: 'bd' },
      { remedy: 'Mag phos.', indication: 'Hiccups relieved by warm water.', potency: '6x', frequency: 'in hot water' }
    ]
  },
  {
    id: 'hoarseness-acute',
    name: 'Hoarseness (Acute)',
    description: 'Abnormal voice changes due to laryngitis.',
    suggestions: [
      { remedy: 'Aconite', indication: 'Hoarseness after exposure to dry, cold wind.', frequency: 'hourly' },
      { remedy: 'Belladonna', indication: 'Dry cough with red, sore throat; sudden onset.', frequency: '2 hourly' },
      { remedy: 'Causticum', indication: 'Aphonia; better by cold water; worse by warm air.', frequency: 'tds' }
    ]
  },
  {
    id: 'insomnia',
    name: 'Insomnia (Sleeplessness)',
    description: 'Habitual sleeplessness; inability to sleep.',
    suggestions: [
      { remedy: 'Coffea cruda', indication: 'Sleeplessness due to rush of thoughts or joy.', frequency: 'hs' },
      { remedy: 'Passiflora inc.', indication: 'Natural sedative for quiet, restful sleep.', potency: 'Q', frequency: '30 drops hs' },
      { remedy: 'Sulphur', indication: 'Cannot sleep after midnight; mind very active.', frequency: 'hs' }
    ]
  },
  {
    id: 'knee-pain',
    name: 'Knee Pain',
    description: 'Pain in or around the knee joint.',
    suggestions: [
      { remedy: 'Apis mel.', indication: 'Swelling of knee; stinging pain; better by cold.', frequency: 'tds' },
      { remedy: 'Bryonia', indication: 'Pain worse from motion; feels better with rest.', frequency: 'tds' },
      { remedy: 'Ruta grav.', indication: 'Pain due to injury to tendons or cartilage around knee.', frequency: 'bd' }
    ]
  },
  {
    id: 'menstrual-cramps',
    name: 'Menstrual Cramps (Dysmenorrhea)',
    description: 'Painful cramps in the lower abdomen during menstruation.',
    suggestions: [
      { remedy: 'Mag phos.', indication: 'Cramping pain relieved by warmth and pressure.', potency: '6x', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Menses delayed, scanty; associated with emotional upset.', frequency: 'tds' },
      { remedy: 'Viburnum op.', indication: 'Severe, spasmodic pain radiating to thighs.', frequency: 'tds' }
    ]
  },
  {
    id: 'nausea-travel',
    name: 'Nausea (Travel Sickness)',
    description: 'Nausea caused by motion in cars, boats, or planes.',
    suggestions: [
      { remedy: 'Cocculus', indication: 'Vertigo with nausea; worse from motion.', frequency: 'every 30 mins' },
      { remedy: 'Tabacum', indication: 'Deathly nausea with cold sweat; better in open air.', frequency: 'tds' }
    ]
  },
  {
    id: 'piles-bleeding',
    name: 'Piles (Bleeding)',
    description: 'Hemorrhoids with presence of blood.',
    suggestions: [
      { remedy: 'Hamamelis', indication: 'Profuse bleeding piles; dark blood; sore.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Millefolium', indication: 'Bright red painless bleeding from rectum.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'sea-sickness',
    name: 'Sea Sickness',
    description: 'Motion sickness during travel by sea.',
    suggestions: [
      { remedy: 'Cocculus', indication: 'Nausea and vomiting from motion of the boat.', frequency: 'every 30 mins' },
      { remedy: 'Petroleum', indication: 'Sickness while traveling; worse from gas fumes.', frequency: 'bd' }
    ]
  },
  {
    id: 'stiff-neck',
    name: 'Stiff Neck (Torticollis)',
    description: 'Painful condition where the neck is twisted or stiff.',
    suggestions: [
      { remedy: 'Cimicifuga', indication: 'Aching in neck muscles; worse from motion.', frequency: 'tds' },
      { remedy: 'Lachnanthes', indication: 'Neck pulled to one side; painful to move.', frequency: 'tds' }
    ]
  },
  {
    id: 'sunstroke',
    name: 'Sunstroke',
    description: 'Heatstroke caused by exposure to the sun.',
    suggestions: [
      { remedy: 'Glonoine', indication: 'Intense headache with heat in head and cold feet.', frequency: 'hourly' },
      { remedy: 'Natrum carb.', indication: 'Chronic effects of sunstroke; cannot bear sun or heat.', frequency: 'bd' }
    ]
  },
  {
    id: 'ulcers-gastric',
    name: 'Ulcers (Gastric)',
    description: 'Sores on the lining of the stomach or duodenum.',
    suggestions: [
      { remedy: 'Argentum nit.', indication: 'Ulcers with flatulence and intense distress.', frequency: 'tds' },
      { remedy: 'Kali bich.', indication: 'Ulcers with "punched-out" appearance; stringy mucus.', frequency: 'bd' }
    ]
  },
  {
    id: 'vocal-strain',
    name: 'Vocal Strain',
    description: 'Hoarseness or loss of voice from over-singing or speaking.',
    suggestions: [
      { remedy: 'Arum tri.', indication: 'Voice cracks; throat is red and painful.', frequency: 'tds' },
      { remedy: 'Causticum', indication: 'Chronic hoarseness in speakers and singers.', frequency: 'bd' }
    ]
  },
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
  },
  {
    id: 'anemia',
    name: 'Anemia',
    description: 'Deficiency of red blood cells or hemoglobin in the blood.',
    suggestions: [
      { remedy: 'Calcarea phos.', indication: 'Anemia in growing children and girls at puberty.', potency: '6x', frequency: 'tds' },
      { remedy: 'Ferrum met.', indication: 'Pale, chlorotic individuals; red face from least emotion.', frequency: 'tds' },
      { remedy: 'Natrium mur.', indication: 'Anemia with weight loss despite good appetite; craving for salt.', frequency: 'bd' }
    ]
  },
  {
    id: 'aphthae',
    name: 'Aphthae (Mouth Ulcers)',
    description: 'Small, shallow lesions that develop on the soft tissues in your mouth.',
    suggestions: [
      { remedy: 'Borax', indication: 'Mouth hot and tender; ulcers bleed easily.', frequency: 'tds' },
      { remedy: 'Mercurius sol.', indication: 'Profuse salivation, offensive breath; ulcers with greyish base.', frequency: 'tds' },
      { remedy: 'Nitric acid', indication: 'Sticking pains like a splinter; ulcers at corners of mouth.', frequency: 'tds' }
    ]
  },
  {
    id: 'arthritis',
    name: 'Arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness.',
    suggestions: [
      { remedy: 'Bryonia', indication: 'Joint pain worse from least movement, better by absolute rest.', frequency: 'tds' },
      { remedy: 'Rhus tox.', indication: 'Pains worse on first movement but better by continued motion.', frequency: 'tds' },
      { remedy: 'Guaiacum', indication: 'Chronic arthritis with contraction of tendons and stiff joints.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'bedwetting',
    name: 'Bed-wetting (Enuresis)',
    description: 'Involuntary urination while asleep after the age when bladder control is expected.',
    suggestions: [
      { remedy: 'Causticum', indication: 'Involuntary urination during first sleep; worse in winter.', frequency: 'tds' },
      { remedy: 'Equisetum', indication: 'Frequent urging with severe pain at the end of urination.', potency: 'Q', frequency: 'bd' },
      { remedy: 'Kreosotum', indication: 'Wetting the bed during deep sleep; urine is very offensive.', frequency: 'hs' }
    ]
  },
  {
    id: 'bites',
    name: 'Bites & Stings',
    description: 'Injury caused by insects or animals.',
    suggestions: [
      { remedy: 'Apis mel.', indication: 'Stings with rapid swelling and stinging pain; better by cold.', frequency: 'hourly' },
      { remedy: 'Ledum pal.', indication: 'Puncture wounds and insect bites; affected part feels cold to touch.', frequency: '3 hourly' },
      { remedy: 'Hypericum', indication: 'Injuries to nerves with sharp, shooting pains.', frequency: '3 hourly' }
    ]
  },
  {
    id: 'boils',
    name: 'Boils (Abscess)',
    description: 'Painful, pus-filled bumps under the skin.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Early stage with swelling, throbbing, and redness.', frequency: '2 hourly' },
      { remedy: 'Hepar sulph.', indication: 'Promotes suppuration; boil is extremely sensitive to touch.', frequency: 'tds' },
      { remedy: 'Silicea', indication: 'Helps in ripening and discharging the boil; useful for recurring boils.', frequency: 'bd' }
    ]
  },
  {
    id: 'bronchitis',
    name: 'Bronchitis',
    description: 'Inflammation of the lining of bronchial tubes.',
    suggestions: [
      { remedy: 'Antimonium tart.', indication: 'Rattling of mucus in chest with inability to expectorate.', frequency: 'tds' },
      { remedy: 'Bryonia', indication: 'Dry, painful cough; patient wants to keep perfectly still.', frequency: 'tds' },
      { remedy: 'Ipecac', indication: 'Spasmodic cough with nausea and vomiting of mucus.', frequency: 'tds' }
    ]
  },
  {
    id: 'burns',
    name: 'Burns & Scalds',
    description: 'Skin damage resulting from exposure to heat.',
    suggestions: [
      { remedy: 'Cantharis', indication: 'Best remedy for preventing blisters and relieving burning pain.', potency: 'Q or 30', frequency: 'hourly' },
      { remedy: 'Urtica urens', indication: 'Burns with violent itching and burning.', potency: 'Q', frequency: 'external/internal' },
      { remedy: 'Causticum', indication: 'Old burns that do not heal well; chemical burns.', frequency: 'tds' }
    ]
  },
  {
    id: 'cataract',
    name: 'Cataract',
    description: 'Clouding of the normally clear lens of the eye.',
    suggestions: [
      { remedy: 'Calcarea fluor.', indication: 'Useful in the early stages of cataract.', potency: '12x', frequency: 'bd' },
      { remedy: 'Cineraria mar.', indication: 'Eye drops often used to help dissolve corneal opacities.', potency: 'Q (External)', frequency: 'bd' },
      { remedy: 'Silicea', indication: 'Where there is a tendency to lens clouding in old age.', frequency: 'bd' }
    ]
  },
  {
    id: 'chickenpox',
    name: 'Chicken Pox',
    description: 'Highly contagious viral infection causing an itchy, blister-like rash.',
    suggestions: [
      { remedy: 'Antimonium tart.', indication: 'Eruption large, filling with pus; rattling in chest.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Itching worse in a warm room; child is clingy and tearful.', frequency: 'tds' },
      { remedy: 'Rhus tox.', indication: 'Great restlessness; itching better by warmth.', frequency: 'tds' }
    ]
  },
  {
    id: 'cold',
    name: 'Cold & Coryza',
    description: 'Viral infection of the upper respiratory tract.',
    suggestions: [
      { remedy: 'Aconite', indication: 'First stage after exposure to dry cold; sudden onset.', frequency: 'hourly' },
      { remedy: 'Allium cepa', indication: 'Acrid nasal discharge that burns the skin; eyes water.', frequency: '2 hourly' },
      { remedy: 'Arsenicum alb.', indication: 'Thin, watery discharge; burning in nose and throat.', frequency: 'tds' }
    ]
  },
  {
    id: 'colic',
    name: 'Colic',
    description: 'Severe, fluctuating pain in the abdomen caused by gas or obstruction.',
    suggestions: [
      { remedy: 'Colocynth', indication: 'Agonizing pain causing patient to bend double or press hard.', frequency: '15 mins' },
      { remedy: 'Magnesia phos.', indication: 'Cramping pain better by warmth and hard pressure.', potency: '6x', frequency: 'in hot water' },
      { remedy: 'Dioscorea', indication: 'Pain better by bending backward or stretching out.', frequency: 'tds' }
    ]
  },
  {
    id: 'constipation',
    name: 'Constipation',
    description: 'Difficulty in emptying the bowels, usually associated with hardened feces.',
    suggestions: [
      { remedy: 'Alumina', indication: 'Inactive rectum; even soft stool requires great straining.', frequency: 'bd' },
      { remedy: 'Bryonia', indication: 'Stools large, hard, dark, and dry as if burnt.', frequency: 'bd' },
      { remedy: 'Nux vomica', indication: 'Frequent, ineffectual urge for stool; "never get done" feeling.', frequency: 'hs' }
    ]
  },
  {
    id: 'cough',
    name: 'Cough',
    description: 'A sudden, forceful hacking sound to release air and clear an irritation in the throat.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Short, dry, tickling cough; worse at night.', frequency: 'tds' },
      { remedy: 'Drosera', indication: 'Whooping cough; paroxysms follow each other rapidly.', frequency: 'tds' },
      { remedy: 'Rumex', indication: 'Dry cough triggered by inhaling cold air; worse by talking.', frequency: 'tds' }
    ]
  },
  {
    id: 'dandruff',
    name: 'Dandruff',
    description: 'Shedding of dead skin cells from the scalp.',
    suggestions: [
      { remedy: 'Arsenicum alb.', indication: 'Scalp itchy and dry; dandruff falls like flour.', frequency: 'bd' },
      { remedy: 'Graphites', indication: 'Scalp crusty; sticky discharge behind ears.', frequency: 'bd' },
      { remedy: 'Thuja', indication: 'White, scaly dandruff; hair grows slowly.', frequency: 'bd' }
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'High blood sugar levels over a prolonged period.',
    suggestions: [
      { remedy: 'Syzygium jam.', indication: 'Remarkable remedy for reducing sugar in urine.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Insulinum', indication: 'Maintains blood sugar levels in both types of diabetes.', potency: '30', frequency: 'bd' },
      { remedy: 'Uranium nit.', indication: 'Diabetes with polyuria and flatulent dyspepsia.', frequency: 'tds' }
    ]
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    description: 'Frequent and watery bowel movements.',
    suggestions: [
      { remedy: 'Aloe soc.', indication: 'Insecurity of rectum; urgent stool after eating or drinking.', frequency: 'tds' },
      { remedy: 'Croton tig.', indication: 'Gushing, watery stool; "shot out" of the rectum.', frequency: 'tds' },
      { remedy: 'Podophyllum', indication: 'Painless, profuse, offensive stools; worse in morning.', frequency: 'tds' }
    ]
  },
  {
    id: 'earache',
    name: 'Earache (Otitis)',
    description: 'Pain inside the ear.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Throbbing pain, ear red and hot; worse at night.', frequency: '2 hourly' },
      { remedy: 'Chamomilla', indication: 'Intolerable pain; child is very irritable and wants to be carried.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Pain with sensation of something crawling inside; thick discharge.', frequency: 'tds' }
    ]
  },
  {
    id: 'eczema',
    name: 'Eczema',
    description: 'Patches of skin become rough and inflamed with blisters.',
    suggestions: [
      { remedy: 'Graphites', indication: 'Eczema with honey-like, sticky discharge.', frequency: 'bd' },
      { remedy: 'Mezereum', indication: 'Intolerable itching; thick crusts with pus underneath.', frequency: 'tds' },
      { remedy: 'Petroleum', indication: 'Skin cracks and bleeds; worse in winter.', frequency: 'bd' }
    ]
  },
  {
    id: 'fever',
    name: 'Fever',
    description: 'Higher than normal body temperature.',
    suggestions: [
      { remedy: 'Aconite', indication: 'High fever with dry skin, restlessness, and anxiety.', frequency: 'hourly' },
      { remedy: 'Belladonna', indication: 'Sudden onset; face red, head hot, feet cold.', frequency: 'hourly' },
      { remedy: 'Ferrum phos.', indication: 'First stage of any inflammatory fever.', potency: '6x', frequency: 'tds' }
    ]
  },
  {
    id: 'gout',
    name: 'Gout',
    description: 'Form of arthritis characterized by severe pain and tenderness in joints.',
    suggestions: [
      { remedy: 'Colchicum', indication: 'Pain worse from least motion; cannot bear the smell of food.', frequency: 'tds' },
      { remedy: 'Lithium carb.', indication: 'Pain in small joints; associated with heart symptoms.', frequency: 'bd' },
      { remedy: 'Urtica urens', indication: 'Helps eliminate uric acid; acute attacks.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'headache',
    name: 'Headache',
    description: 'Continuous pain in the head.',
    suggestions: [
      { remedy: 'Glonoine', indication: 'Congestive headache; feels as if head will burst.', frequency: '2 hourly' },
      { remedy: 'Natrum mur.', indication: 'Chronic headache; feels like little hammers beating in head.', frequency: 'tds' },
      { remedy: 'Sanguinaria', indication: 'Right-sided migraine starting at back and settling over eye.', frequency: 'tds' }
    ]
  },
  {
    id: 'hemorrhoids',
    name: 'Hemorrhoids (Piles)',
    description: 'Swollen and inflamed veins in the rectum and anus.',
    suggestions: [
      { remedy: 'Aesculus hip.', indication: 'Blind piles; sensation of sticks in the rectum.', frequency: 'tds' },
      { remedy: 'Hamamelis', indication: 'Bleeding piles with soreness and heaviness.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Ratanhia', indication: 'Severe burning after stool; feeling of broken glass in rectum.', frequency: 'bd' }
    ]
  },
  {
    id: 'jaundice',
    name: 'Jaundice',
    description: 'Yellowing of the skin and eyes caused by excess bilirubin.',
    suggestions: [
      { remedy: 'Carduus mar.', indication: 'Liver remedy for jaundice with gallstones.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Chelidonium', indication: 'Pain under right shoulder blade; yellow tongue.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Myrica', indication: 'Jaundice with bitter taste and clay-colored stools.', frequency: 'tds' }
    ]
  },
  {
    id: 'kidneystones',
    name: 'Kidney Stones',
    description: 'Hard deposits of minerals and salts that form inside your kidneys.',
    suggestions: [
      { remedy: 'Berberis vul.', indication: 'Shooting pains radiating from kidney to bladder.', potency: 'Q', frequency: '10 drops in water' },
      { remedy: 'Lycopodium', indication: 'Red sand in urine; pain worse on right side.', frequency: 'tds' },
      { remedy: 'Pareira brava', indication: 'Constant urging; must get on hands and knees to urinate.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'menopause',
    name: 'Menopause Symptoms',
    description: 'Natural decline in reproductive hormones.',
    suggestions: [
      { remedy: 'Lachesis', indication: 'Hot flashes, palpitations, and headaches; cannot bear tight clothing.', frequency: 'bd' },
      { remedy: 'Sepia', indication: 'Bearing down sensation; mood swings and indifference to loved ones.', frequency: 'tds' },
      { remedy: 'Sulphuric acid', indication: 'Trembling feeling in whole body; hot flashes with perspiration.', frequency: 'tds' }
    ]
  },
  {
    id: 'obesity',
    name: 'Obesity',
    description: 'Complex disease involving an excessive amount of body fat.',
    suggestions: [
      { remedy: 'Fucus ves.', indication: 'Assists in weight reduction; useful for thyroid disorders.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Phytolacca berry', indication: 'One of the best remedies for weight loss and metabolism.', potency: 'Q', frequency: '15 drops tds' },
      { remedy: 'Calcarea carb.', indication: 'Suited for those who are fat, fair, and flabby.', frequency: 'bd' }
    ]
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    description: 'Condition in which skin cells build up and form scales and itchy, dry patches.',
    suggestions: [
      { remedy: 'Arsenicum iod.', indication: 'Skin is dry and scaly; large flakes; itching.', frequency: 'bd' },
      { remedy: 'Chrysarobinum', indication: 'Used locally and internally for scaly skin diseases.', potency: '3x', frequency: 'bd' },
      { remedy: 'Thyroidinum', indication: 'Dry skin with tendency to psoriasis; metabolism support.', frequency: 'bd' }
    ]
  },
  {
    id: 'sciatica',
    name: 'Sciatica',
    description: 'Pain radiating along the sciatic nerve, which runs down one or both legs from the lower back.',
    suggestions: [
      { remedy: 'Colocynth', indication: 'Left-sided sciatica; pain better by pressure and warmth.', frequency: 'tds' },
      { remedy: 'Gnaphalium', indication: 'Intense pain alternating with numbness.', frequency: 'tds' },
      { remedy: 'Hypericum', indication: 'Pain due to nerve injury or compression.', frequency: 'tds' }
    ]
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    description: 'Inflammation of the sinuses.',
    suggestions: [
      { remedy: 'Kali bich.', indication: 'Tough, stringy, yellow-green discharge; pain at root of nose.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Thick, bland discharge; better in open air.', frequency: 'tds' },
      { remedy: 'Silicea', indication: 'Chronic sinusitis; patient is very sensitive to cold.', frequency: 'bd' }
    ]
  },
  {
    id: 'sorethroat',
    name: 'Sore Throat (Tonsillitis)',
    description: 'Pain or irritation in the throat.',
    suggestions: [
      { remedy: 'Baryta carb.', indication: 'Swelling of tonsils in children; sensitive to cold.', frequency: 'bd' },
      { remedy: 'Guaiacum', indication: 'Acute tonsillitis; violent burning and sticking pains.', frequency: 'tds' },
      { remedy: 'Phytolacca', indication: 'Throat feels like a hot ball; pain radiating to ears.', frequency: 'tds' }
    ]
  },
  {
    id: 'toothache',
    name: 'Toothache',
    description: 'Pain in or around a tooth.',
    suggestions: [
      { remedy: 'Magnesia phos.', indication: 'Pain better by warm liquids and pressure.', potency: '6x', frequency: 'tds' },
      { remedy: 'Plantago', indication: 'Used as a local application for toothache and earache.', potency: 'Q', frequency: 'external' },
      { remedy: 'Staphysagria', indication: 'Teeth decay early; pain worse after eating.', frequency: 'tds' }
    ]
  },
  {
    id: 'vertigo',
    name: 'Vertigo (Dizziness)',
    description: 'Sensation of spinning or loss of balance.',
    suggestions: [
      { remedy: 'Cocculus', indication: 'Vertigo with nausea; worse from riding in a carriage or boat.', frequency: 'tds' },
      { remedy: 'Conium', indication: 'Vertigo when turning in bed or turning the head.', frequency: 'bd' },
      { remedy: 'Theridion', indication: 'Vertigo with sensitivity to noise; every sound penetrates the body.', frequency: 'tds' }
    ]
  },
  {
    id: 'warts',
    name: 'Warts',
    description: 'Small, fleshy bumps on the skin or mucous membranes.',
    suggestions: [
      { remedy: 'Antimonium crud.', indication: 'Hard, horny warts on soles of feet or hands.', frequency: 'bd' },
      { remedy: 'Causticum', indication: 'Large, jagged warts that bleed easily.', frequency: 'bd' },
      { remedy: 'Thuja', indication: 'Main remedy for warts of all kinds; cauliflower-like.', potency: '200', frequency: 'weekly' }
    ]
  },
  {
    id: 'worms',
    name: 'Worms (Intestinal)',
    description: 'Parasitic worms that live in the human gut.',
    suggestions: [
      { remedy: 'Cina', indication: 'Child is irritable; picks nose; has restless sleep.', frequency: 'tds' },
      { remedy: 'Santoninum', indication: 'Used for roundworms and threadworms.', potency: '3x', frequency: 'bd' },
      { remedy: 'Teucrium', indication: 'Unbearable itching in the anus from pinworms.', frequency: 'tds' }
    ]
  },
  {
    id: 'appetite-excessive',
    name: 'Appetite (Excessive)',
    description: 'Abnormally large desire for food, often shortly after eating.',
    suggestions: [
      { remedy: 'Cina', indication: 'Hungry soon after a full meal; associated with worms.', frequency: 'tds' },
      { remedy: 'Iodium', indication: 'Eats all the time but still loses weight.', frequency: 'bd' },
      { remedy: 'Lycopodium', indication: 'Early satiety; hungry but fills up after a few mouthfuls.', frequency: 'tds' }
    ]
  },
  {
    id: 'blood-pressure-high',
    name: 'Blood Pressure (High)',
    description: 'Condition where the force of the blood against the artery walls is too high.',
    suggestions: [
      { remedy: 'Rauwolfia', indication: 'One of the best natural remedies for high blood pressure.', potency: 'Q', frequency: '10-20 drops tds' },
      { remedy: 'Baryta mur.', indication: 'High diastolic pressure; useful for elderly patients.', frequency: 'bd' },
      { remedy: 'Glonoinum', indication: 'Sudden rise in pressure with severe headache and face flushing.', frequency: 'tds' }
    ]
  },
  {
    id: 'blood-pressure-low',
    name: 'Blood Pressure (Low)',
    description: 'Blood pressure low enough that it causes symptoms like dizziness and fainting.',
    suggestions: [
      { remedy: 'Cactus g.', indication: 'Heart remedy that helps stabilize low blood pressure.', potency: 'Q', frequency: 'tds' },
      { remedy: 'China off.', indication: 'Low pressure due to loss of vital fluids or long illness.', frequency: 'tds' },
      { remedy: 'Viscum alb.', indication: 'Helps in regulating the circulatory system.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'brain-fag',
    name: 'Brain Fag (Mental Fatigue)',
    description: 'Mental exhaustion due to overwork or stress.',
    suggestions: [
      { remedy: 'Kali phos.', indication: 'Great nerve tonic; useful for students and office workers.', potency: '6x', frequency: 'tds' },
      { remedy: 'Picric acid', indication: 'Mental exhaustion with heavy feeling in limbs.', frequency: 'bd' },
      { remedy: 'Zincum met.', indication: 'Brain fag with restless legs and twitching of muscles.', frequency: 'bd' }
    ]
  },
  {
    id: 'bruises',
    name: 'Bruises & Contusions',
    description: 'Injury causing discoloration of the skin without breakage.',
    suggestions: [
      { remedy: 'Arnica mont.', indication: 'Specific for any blunt injury or muscular soreness.', frequency: 'hourly' },
      { remedy: 'Bellis per.', indication: 'Deep tissue bruises; "Arnica of the deep tissues".', frequency: 'tds' },
      { remedy: 'Ledum pal.', indication: 'Bruises that turn black and blue and feel cold.', frequency: 'tds' }
    ]
  },
  {
    id: 'carsickness',
    name: 'Car & Motion Sickness',
    description: 'Nausea and dizziness caused by travel.',
    suggestions: [
      { remedy: 'Cocculus', indication: 'Motion sickness with vertigo and deathly nausea.', frequency: 'every 30 mins' },
      { remedy: 'Tabacum', indication: 'Nausea with cold sweat; better in open air.', frequency: 'tds' },
      { remedy: 'Petroleum', indication: 'Sickness while traveling; worse from smell of gasoline.', frequency: 'tds' }
    ]
  },
  {
    id: 'cramps',
    name: 'Cramps (Muscular)',
    description: 'Sudden, involuntary contraction of one or more muscles.',
    suggestions: [
      { remedy: 'Cuprum met.', indication: 'Severe cramps in calves and soles of feet.', frequency: 'bd' },
      { remedy: 'Mag phos.', indication: 'Cramps associated with cold and eased by warmth.', potency: '6x', frequency: 'tds' },
      { remedy: 'Viburnum op.', indication: 'Cramps in legs during pregnancy or menses.', frequency: 'bd' }
    ]
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'Mood disorder that causes a persistent feeling of sadness and loss of interest.',
    suggestions: [
      { remedy: 'Aurum met.', indication: 'Severe depression with suicidal thoughts.', frequency: 'bd' },
      { remedy: 'Ignatia', indication: 'Depression due to grief, disappointment, or emotional shock.', frequency: 'tds' },
      { remedy: 'Natrum mur.', indication: 'Introverted depression; desire for solitude; consolation aggravates.', frequency: 'bd' }
    ]
  },
  {
    id: 'dysentery',
    name: 'Dysentery',
    description: 'Infection of the intestines resulting in severe diarrhea with the presence of blood and mucus.',
    suggestions: [
      { remedy: 'Merc cor.', indication: 'Severe straining (tenesmus) with blood and mucus.', frequency: '2 hourly' },
      { remedy: 'Nux vomica', indication: 'Frequent small stools with constant urge; better after every stool.', frequency: 'tds' },
      { remedy: 'Aloe soc.', indication: 'Involuntary stool while passing wind; Jelly-like mucus.', frequency: 'tds' }
    ]
  },
  {
    id: 'epilepsy',
    name: 'Epilepsy',
    description: 'Neurological disorder marked by sudden recurrent episodes of sensory disturbance or loss of consciousness.',
    suggestions: [
      { remedy: 'Artemisia vul.', indication: 'Fits in children; especially after fright or excitement.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Cicuta vir.', indication: 'Convulsions with distorted face and fixed eyes.', frequency: 'bd' },
      { remedy: 'Cuprum met.', indication: 'Attacks start with a scream; clenched thumbs.', frequency: 'bd' }
    ]
  },
  {
    id: 'epistaxis',
    name: 'Epistaxis (Nosebleed)',
    description: 'Bleeding from the nose.',
    suggestions: [
      { remedy: 'Ferrum phos.', indication: 'Bright red blood; associated with local inflammation.', potency: '6x', frequency: 'tds' },
      { remedy: 'Hamamelis', indication: 'Dark, slow flow; nosebleed with feeling of tightness in nose.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Milli-folium', indication: 'Active, bright red bleeding from the nose or other parts.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'flatulence',
    name: 'Flatulence (Gas)',
    description: 'Accumulation of gas in the alimentary canal.',
    suggestions: [
      { remedy: 'Carbo veg.', indication: 'Gas in upper abdomen; better by belching.', frequency: 'tds' },
      { remedy: 'Lycopodium', indication: 'Gas in lower abdomen; bloating even after light meals.', frequency: 'tds' },
      { remedy: 'China off.', indication: 'Entire abdomen bloated; belching does not relieve.', frequency: 'tds' }
    ]
  },
  {
    id: 'gallstones',
    name: 'Gallstones (Biliary Colic)',
    description: 'Small, hard crystalline mass formed in the gallbladder.',
    suggestions: [
      { remedy: 'Carduus mar.', indication: 'Liver and gallbladder remedy; relieves pain and discomfort.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Chelidonium', indication: 'Pain under right shoulder blade; yellowish skin.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Cholesterinum', indication: 'Helps in dissolving cholesterol-based gallstones.', potency: '3x', frequency: 'bd' }
    ]
  },
  {
    id: 'gums-bleeding',
    name: 'Gums (Bleeding & Sore)',
    description: 'Inflammation and bleeding of the gum tissue.',
    suggestions: [
      { remedy: 'Kreosotum', indication: 'Gums bleed easily; associated with early tooth decay.', frequency: 'bd' },
      { remedy: 'Merc sol.', indication: 'Spongy, bleeding gums; offensive breath; metallic taste.', frequency: 'tds' },
      { remedy: 'Phosphorus', indication: 'Gums bleed from least touch; bright red blood.', frequency: 'tds' }
    ]
  },
  {
    id: 'hayfever',
    name: 'Hay Fever',
    description: 'Allergy caused by pollen or dust in which the mucous membranes of the eyes and nose are inflamed.',
    suggestions: [
      { remedy: 'Allium cepa', indication: 'Watery eyes and burning nasal discharge.', frequency: 'tds' },
      { remedy: 'Euphrasia', indication: 'Burning eyes and bland nasal discharge.', frequency: 'tds' },
      { remedy: 'Sabadilla', indication: 'Spasmodic sneezing with running nose.', frequency: 'tds' }
    ]
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    description: 'Highly contagious viral infection of the respiratory passages.',
    suggestions: [
      { remedy: 'Eupatorium perf.', indication: 'Deep bone pain with high fever; "Bone-break" fever.', frequency: '2 hourly' },
      { remedy: 'Gelsemium', indication: 'Dullness, dizziness, and drowsiness; chills running up the spine.', frequency: '2 hourly' },
      { remedy: 'Influenzinum', indication: 'Excellent as a preventive and curative for the flu.', potency: '200', frequency: 'once a week (preventive)' }
    ]
  },
  {
    id: 'injuries-general',
    name: 'Injuries (General)',
    description: 'Physical harm or damage to the body.',
    suggestions: [
      { remedy: 'Arnica', indication: 'For shock, bruises, and soft tissue damage.', frequency: 'tds' },
      { remedy: 'Calendula', indication: 'Cuts, scrapes, and open wounds; prevents infection.', potency: 'Q (External)', frequency: 'as needed' },
      { remedy: 'Hypericum', indication: 'Injuries to areas rich in nerves (fingertips, spine).', frequency: 'tds' }
    ]
  },
  {
    id: 'leucorrhea',
    name: 'Leucorrhea',
    description: 'Whitish or yellowish discharge of mucus from the vagina.',
    suggestions: [
      { remedy: 'Alumina', indication: 'Profuse, acrid discharge; better by cold washing.', frequency: 'bd' },
      { remedy: 'Kreosotum', indication: 'Acrid discharge that stains yellow and causes itching.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Thick, creamy, white discharge; associated with delayed menses.', frequency: 'tds' }
    ]
  },
  {
    id: 'measles',
    name: 'Measles',
    description: 'Infectious viral disease causing fever and a red rash on the skin.',
    suggestions: [
      { remedy: 'Aconite', indication: 'Early stage with high fever and dry cough.', frequency: 'hourly' },
      { remedy: 'Euphrasia', indication: 'Nasal discharge and burning eyes during measles.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Slow development of rash; dry cough at night.', frequency: 'tds' }
    ]
  },
  {
    id: 'memory-loss',
    name: 'Memory (Loss of)',
    description: 'Inability to remember events, names, or information.',
    suggestions: [
      { remedy: 'Anacardium', indication: 'Sudden loss of memory when under pressure or exams.', frequency: 'bd' },
      { remedy: 'Baryta carb.', indication: 'Memory loss in children or elderly with slow development.', frequency: 'bd' },
      { remedy: 'Kali phos.', indication: 'Mental weakness from overexertion.', potency: '6x', frequency: 'tds' }
    ]
  },
  {
    id: 'menses-irregular',
    name: 'Menses (Irregular)',
    description: 'Abnormal changes to the menstrual cycle.',
    suggestions: [
      { remedy: 'Pulsatilla', indication: 'Delayed, scanty, or changeable menses.', frequency: 'tds' },
      { remedy: 'Senecio aur.', indication: 'Menses suppressed or delayed, especially in young girls.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Thyroidinum', indication: 'Helps in regulating cycles affected by thyroid issues.', frequency: 'bd' }
    ]
  },
  {
    id: 'morning-sickness',
    name: 'Morning Sickness',
    description: 'Nausea and vomiting during pregnancy.',
    suggestions: [
      { remedy: 'Ipecac', indication: 'Constant nausea not relieved by vomiting.', frequency: 'tds' },
      { remedy: 'Symphoricarpus', indication: 'One of the best remedies for persistent vomiting in pregnancy.', frequency: 'tds' },
      { remedy: 'Tabacum', indication: 'Deathly nausea with cold sweat; better in open air.', frequency: 'tds' }
    ]
  },
  {
    id: 'neuralgia',
    name: 'Neuralgia',
    description: 'Intense, typically intermittent pain along the course of a nerve.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Face red, hot; pain comes and goes suddenly.', frequency: 'hourly' },
      { remedy: 'Mag phos.', indication: 'Shooting pains better by warmth and pressure.', potency: '6x', frequency: 'in hot water' },
      { remedy: 'Spigelia', indication: 'Left-sided facial neuralgia involving the eye.', frequency: 'tds' }
    ]
  },
  {
    id: 'modalities-thermal',
    name: 'Thermal Modalities',
    description: 'Sensitivity to heat and cold.',
    suggestions: [
      { remedy: 'Hot: Sulphur, Lachesis, Pulsatilla', indication: 'Worse by heat or in a warm room.' },
      { remedy: 'Chilly: Arsenicum, Hepar Sulph, Nux Vomica', indication: 'Very sensitive to cold and draft of air.' }
    ]
  },
  {
    id: 'modalities-motion',
    name: 'Motion Modalities',
    description: 'Symptoms affected by movement or rest.',
    suggestions: [
      { remedy: 'Worse by Motion: Bryonia, Colocynth, Belladonna', indication: 'Even slight movement aggravates the pain.' },
      { remedy: 'Better by Motion: Rhus Tox, Kali Phos, Ferrum Met', indication: 'Better by continued movement, though first step is painful.' }
    ]
  },
  {
    id: 'modalities-time',
    name: 'Time Modalities',
    description: 'Symptoms recurring at specific times of the day.',
    suggestions: [
      { remedy: 'Worse 3 AM: Arsenicum, Kali Carb, Nux Vomica', indication: 'Wakes up or gets worse around 3 AM.' },
      { remedy: 'Worse Morning: Natrum Mur, Nux Vomica, Kali Phos', indication: 'Symptoms are most intense in the morning.' },
      { remedy: 'Worse Evening: Lycopodium, Pulsatilla, Natrum Sulph', indication: 'Aggravation of symptoms as the day ends.' }
    ]
  },
  {
    id: 'modalities-weather',
    name: 'Weather Modalities',
    description: 'Sensitivity to atmospheric conditions.',
    suggestions: [
      { remedy: 'Worse Damp: Rhus Tox, Dulcamara, Calcalea Phos', indication: 'Joint pains or colds during rainy/damp weather.' },
      { remedy: 'Better Dry: Calcarea Phos, Arsenicum, Kali Bich', indication: 'Better during dry, sunny weather.' },
      { remedy: 'Worse Cold Air: Hepar Sulph, Aconite, Silicea', indication: 'Symptoms triggered by breathing cold air or exposure.' }
    ]
  },
  {
    id: 'modalities-food',
    name: 'Food & Drink Desires',
    description: 'Specific cravings or aversions and their effects.',
    suggestions: [
      { remedy: 'Craves Salt: Natrum Mur, Calcarea Phos, Kali Mur', indication: 'Strong desire for salty foods.' },
      { remedy: 'Craves Sweets: Argentum Nit, Lycopodium, Phosphorus', indication: 'Intense desire for sugar and candies.' },
      { remedy: 'Aversion to Fat: Pulsatilla, Antim Crud, Nux Vomica', indication: 'Cannot tolerate or dislikes fatty greasy food.' },
      { remedy: 'Worse Eating: Nux Vomica, Antim Crud, Lycopodium', indication: 'Stomach distress occurring immediately after meals.' }
    ]
  },
  {
    id: 'modalities-sleep',
    name: 'Sleep Postures & Problems',
    description: 'Ailments related to sleep and sleep positions.',
    suggestions: [
      { remedy: 'Sleeps on Abdomen: Medorrhinum, Cina, Kali Carb', indication: 'Prefers lying on the belly while sleeping.' },
      { remedy: 'Hands Above Head: Phosphorus, Sulphur, Lachesis', indication: 'Sleeps with arms raised above the head.' },
      { remedy: 'Before Midnight: Sulphur, Coffea, Lycopodium', indication: 'Cannot fall asleep before 12 PM; mind very active.' }
    ]
  },
  {
    id: 'modalities-mental',
    name: 'Mental & Emotional States',
    description: 'Psychological factors affecting overall health.',
    suggestions: [
      { remedy: 'Worse Consolation: Natrum Mur, Sepia, Lachesis', indication: 'Consolation or sympathy makes them feel worse or angry.' },
      { remedy: 'Better Consolation: Pulsatilla, Staphysagria, Phosphorus', indication: 'Seeks and feels better with sympathy and company.' },
      { remedy: 'Fear of Alone: Arsenicum, Calcarea Carb, Phosphorus', indication: 'Great fear of being left alone, especially at night.' }
    ]
  },
  {
    id: 'modalities-children',
    name: 'Children Specifics',
    description: 'Observations specific to pediatric cases.',
    suggestions: [
      { remedy: 'Wants to be carried: Chamomilla, Pulsatilla, Silicea', indication: 'Child is only quiet when being carried or rocked.' },
      { remedy: 'Dentition Irritable: Chamomilla, Calcarea Phos, Merc Sol', indication: 'Very cross and irritable during teething period.' }
    ]
  },
  {
    id: 'modalities-generals',
    name: 'Generals',
    description: 'Broad constitutional characteristics.',
    suggestions: [
      { remedy: 'Before Storm: Natrum Mur, Rhus Tox', indication: 'Feels a storm coming before it arrives.' },
      { remedy: 'Better Open Air: Tuberculinum, Arsenicum', indication: 'Always wants windows open or to be outside.' },
      { remedy: 'Worse Closed Room: Carbo Veg, Phosphorus', indication: 'Sensation of suffocation or anxiety in closed spaces.' }
    ]
  },
  {
    id: 'anxiety',
    name: 'Anxiety & Worry',
    description: 'Feeling of unease, such as worry or fear, that can be mild or severe.',
    suggestions: [
      { remedy: 'Aconite', indication: 'Sudden, intense anxiety with fear of death.', frequency: 'hourly' },
      { remedy: 'Arsenicum alb.', indication: 'Anxiety with restlessness; cannot stay in one place.', frequency: 'tds' },
      { remedy: 'Gelsemium', indication: 'Anxiety before an ordeal (stage fright) with trembling.', frequency: 'bd' }
    ]
  },
  {
    id: 'bladderstones',
    name: 'Bladder Stones',
    description: 'Hard masses of minerals in the bladder.',
    suggestions: [
      { remedy: 'Berberis vul.', indication: 'Stitching pains in the bladder region.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Lycopodium', indication: 'Frequent urination at night; heavy red sediment.', frequency: 'bd' },
      { remedy: 'Sarsaparilla', indication: 'Severe pain at the end of urination; urine passed in drops.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'corns',
    name: 'Corns & Calluses',
    description: 'Thick, hardened layers of skin that develop when your skin tries to protect itself against friction and pressure.',
    suggestions: [
      { remedy: 'Antimonium crud.', indication: 'Large, horny corns on the soles of feet.', frequency: 'bd' },
      { remedy: 'Ferrum picricum', indication: 'Specific remedy for corns and warts on hands or feet.', frequency: 'bd' },
      { remedy: 'Silicea', indication: 'Helps in softening and removing painful corns.', frequency: 'bd' }
    ]
  },
  {
    id: 'eardischarge',
    name: 'Ear Discharge (Otorrhea)',
    description: 'Fluid, such as pus or wax, that comes out of the ear.',
    suggestions: [
      { remedy: 'Kali mur.', indication: 'Thick, white, phlegm-like discharge.', potency: '6x', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Thick, yellow, bland discharge; non-irritating.', frequency: 'tds' },
      { remedy: 'Tellurium', indication: 'Acrid, fishy-smelling discharge; causes itching of the ear canal.', frequency: 'bd' }
    ]
  },
  {
    id: 'eyeinflammation',
    name: 'Eye Inflammation (Conjunctivitis)',
    description: 'Inflammation or infection of the transparent membrane that lines your eyelid and covers the white part of your eyeball.',
    suggestions: [
      { remedy: 'Arg nit.', indication: 'Purulent ophthalmia; heavy discharge; better by cold.', frequency: '2 hourly' },
      { remedy: 'Euphrasia', indication: 'Acrid discharge from eyes; bland from nose.', frequency: '2 hourly' },
      { remedy: 'Pulsatilla', indication: 'Thick, yellow, non-acrid discharge; stuck eyelids in morning.', frequency: 'tds' }
    ]
  },
  {
    id: 'glandular',
    name: 'Glandular Swellings',
    description: 'Inflamed or enlarged lymph nodes.',
    suggestions: [
      { remedy: 'Baryta carb.', indication: 'Swelling of submaxillary and tonsillar glands.', frequency: 'bd' },
      { remedy: 'Calcarea iod.', indication: 'For enlarged thyroid or tonsils in scrofulous children.', frequency: 'bd' },
      { remedy: 'Cistus can.', indication: 'Glands of neck swollen; extremely sensitive to cold air.', frequency: 'tds' }
    ]
  },
  {
    id: 'hernia',
    name: 'Hernia',
    description: 'Condition in which part of an organ is displaced and protrudes through the wall of the cavity containing it.',
    suggestions: [
      { remedy: 'Lycopodium', indication: 'Right-sided inguinal hernia; associated with flatulence.', frequency: 'bd' },
      { remedy: 'Nux vomica', indication: 'Strangulated hernia (initial stages); better by pressure.', frequency: '2 hourly' },
      { remedy: 'Sulphuric acid', indication: 'Left-sided inguinal hernia; weak feeling in abdomen.', frequency: 'bd' }
    ]
  },
  {
    id: 'malaria',
    name: 'Malaria & Intermittent Fever',
    description: 'Fever characterized by recurring paroxysms of chills and sweating.',
    suggestions: [
      { remedy: 'Chinimum sulph.', indication: 'Specific remedy for periodic fevers.', frequency: 'tds' },
      { remedy: 'Eupatorium perf.', indication: 'Thirst before the chill; bone-breaking pains.', frequency: 'tds' },
      { remedy: 'Natrum mur.', indication: 'Fever paroxysms around 11 AM; craving for salt.', frequency: 'bd' }
    ]
  },
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'Recurrent throbbing headache that typically affects one side of the head.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Throbbing, right-sided pain; worse from light and noise.', frequency: 'hourly' },
      { remedy: 'Iris vers.', indication: 'Migraine with blurred vision and sour vomiting.', frequency: 'tds' },
      { remedy: 'Sanguinaria', indication: 'Pain starts in neck, goes over head and settles in right eye.', frequency: 'tds' }
    ]
  },
  {
    id: 'mumps',
    name: 'Mumps',
    description: 'Viral infection that primarily affects the parotid glands.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Sudden onset; glands red, hot, and painful.', frequency: '2 hourly' },
      { remedy: 'Merc sol.', indication: 'Swelling with increased salivation and offensive breath.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Useful if mumps moves to the testicles or ovaries.', frequency: 'tds' }
    ]
  },
  {
    id: 'nightsweating',
    name: 'Night Sweating',
    description: 'Excessive sweating during sleep.',
    suggestions: [
      { remedy: 'Acid sulph.', indication: 'Profuse sweating with a feeling of internal trembling.', frequency: 'hs' },
      { remedy: 'Jaborandi', indication: 'Promotes and regulates sweat; useful for night sweats.', potency: 'Q', frequency: 'hs' },
      { remedy: 'Sulphur', indication: 'Night sweats in those who are very sensitive to heat.', frequency: 'hs' }
    ]
  },
  {
    id: 'paralysis',
    name: 'Paralysis',
    description: 'Loss of ability to move some or all of the body.',
    suggestions: [
      { remedy: 'Causticum', indication: 'Paralysis of single parts (e.g., vocal cords, bladder).', frequency: 'bd' },
      { remedy: 'Gelsemium', indication: 'Post-diphtheritic paralysis; muscular weakness.', frequency: 'tds' },
      { remedy: 'Lathyrus sat.', indication: 'Paralysis of the lower limbs; spastic gait.', potency: '3x', frequency: 'tds' }
    ]
  },
  {
    id: 'pleurisy',
    name: 'Pleurisy',
    description: 'Inflammation of the pleura, the membrane that lines the chest cavity and surrounds the lungs.',
    suggestions: [
      { remedy: 'Bryonia', indication: 'Stitching pains in the chest; worse from breathing.', frequency: 'tds' },
      { remedy: 'Kali carb.', indication: 'Sharp pains in chest; worse at 3 AM.', frequency: 'tds' },
      { remedy: 'Ranunculus bul.', indication: 'Pains in chest walls; worse from motion and cold air.', frequency: 'tds' }
    ]
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    description: 'Infection that inflames the air sacs in one or both lungs.',
    suggestions: [
      { remedy: 'Antimonium tart.', indication: 'Excessive rattling of mucus in chest; gasping for air.', frequency: 'tds' },
      { remedy: 'Chelidonium', indication: 'Right-sided pneumonia with liver symptoms.', frequency: 'tds' },
      { remedy: 'Phosphorus', indication: 'Burning in chest; worse from lying on left side.', frequency: 'tds' }
    ]
  },
  {
    id: 'polyps',
    name: 'Polyps (Nasal)',
    description: 'Soft, painless, noncancerous growths on the lining of your nasal passages or sinuses.',
    suggestions: [
      { remedy: 'Lemna minor', indication: 'Obstruction of nose; loss of smell; worse in damp weather.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Sanguinaria nit.', indication: 'Nasal polyps with chronic congestion.', frequency: 'bd' },
      { remedy: 'Teucrium', indication: 'Large polyps; frequent sneezing; crawly feeling in nose.', frequency: 'bd' }
    ]
  },
  {
    id: 'rheumatism',
    name: 'Rheumatism',
    description: 'Disease marked by inflammation and pain in the joints, muscles, or fibrous tissue.',
    suggestions: [
      { remedy: 'Actaea spic.', indication: 'Specifically for rheumatism of the small joints (fingers, toes).', frequency: 'tds' },
      { remedy: 'Caulophyllum', indication: 'Rheumatism in women; associated with uterine issues.', frequency: 'tds' },
      { remedy: 'Rhus tox.', indication: 'Worse from first movement, cold damp weather; better warmth.', frequency: 'tds' }
    ]
  },
  {
    id: 'rickets',
    name: 'Rickets',
    description: 'Softening and weakening of bones in children, usually due to inadequate vitamin D.',
    suggestions: [
      { remedy: 'Calcarea carb.', indication: 'Late dentition; large head; sweaty scalp while sleeping.', frequency: 'bd' },
      { remedy: 'Calcarea phos.', indication: 'Skull bones soft and thin; child slow to walk.', potency: '6x', frequency: 'tds' },
      { remedy: 'Silicea', indication: 'Children who are thin, delicate, and sensitive to cold.', frequency: 'bd' }
    ]
  },
  {
    id: 'ringworm',
    name: 'Ringworm (Tinea)',
    description: 'Highly contagious fungal infection of the skin or scalp.',
    suggestions: [
      { remedy: 'Bacillinum', indication: 'Tendency to ringworm and other skin infections.', potency: '200', frequency: 'weekly' },
      { remedy: 'Sepia', indication: 'Isolated spots of ringworm; worse around joints.', frequency: 'bd' },
      { remedy: 'Tellurium', indication: 'Ringworm in circular patches; very itchy.', frequency: 'bd' }
    ]
  },
  {
    id: 'urinary',
    name: 'Urinary Troubles',
    description: 'Affections related to the secretion and discharge of urine.',
    suggestions: [
      { remedy: 'Cantharis', indication: 'Constant urge to urinate; burning and cutting pain.', frequency: 'hourly' },
      { remedy: 'Sarsaparilla', indication: 'Pain at the end of urination; urine is scanty.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Solidago', indication: 'Used as a kidney tonic to improve urine flow.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'voiceloss',
    name: 'Voice (Loss of / Hoarseness)',
    description: 'Laryngitis or overuse of vocal cords.',
    suggestions: [
      { remedy: 'Arum tri.', indication: 'Voice cracks when trying to reach high notes.', frequency: 'tds' },
      { remedy: 'Causticum', indication: 'Total loss of voice after exposure to cold or overuse.', frequency: 'tds' },
      { remedy: 'Phosphorus', indication: 'Violent hoarseness; worse in evening; painless.', frequency: 'tds' }
    ]
  },
  {
    id: 'whoopingcough',
    name: 'Whooping Cough',
    description: 'Highly contagious respiratory tract infection that is easily preventable by vaccine.',
    suggestions: [
      { remedy: 'Coccus cacti', indication: 'Clear, stringy mucus; cough better by cold drinks.', frequency: 'tds' },
      { remedy: 'Corallium rub.', indication: 'Constant hawking; "Minute-gun" cough.', frequency: 'tds' },
      { remedy: 'Drosera', indication: 'Chief remedy for whooping cough; paroxysms follow rapidly.', frequency: 'tds' }
    ]
  },
  {
    id: 'abscess-chronic',
    name: 'Abscess (Chronic)',
    description: 'Slow-developing collection of pus.',
    suggestions: [
      { remedy: 'Calcarea sulph.', indication: 'Abscess that continues to discharge after opening.', frequency: 'bd' },
      { remedy: 'Silicea', indication: 'Promotes healing and resolution of old abscesses.', frequency: 'bd' }
    ]
  },
  {
    id: 'backache-chronic',
    name: 'Backache (Chronic)',
    description: 'Long-term discomfort in the spinal region.',
    suggestions: [
      { remedy: 'Calcarea fluor.', indication: 'Lower back pain with stiffness; better by heat.', potency: '12x', frequency: 'tds' },
      { remedy: 'Kali carb.', indication: 'Back feels as if it would break; better by sitting up.', frequency: 'tds' }
    ]
  },
  {
    id: 'bedsores',
    name: 'Bedsores (Decubitus)',
    description: 'Injuries to skin and underlying tissue resulting from prolonged pressure.',
    suggestions: [
      { remedy: 'Arnica', indication: 'Prevents formation of bedsores by improving circulation.', frequency: 'tds' },
      { remedy: 'Paeonia', indication: 'Ulcerated bedsores; extremely painful.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'bilious-headache',
    name: 'Bilious Headache',
    description: 'Headache associated with liver sluggishness and nausea.',
    suggestions: [
      { remedy: 'Bryonia', indication: 'Bursting headache with bitter taste in mouth.', frequency: 'tds' },
      { remedy: 'Iris vers.', indication: 'Sick headache with intense acidity and sour vomiting.', frequency: 'tds' }
    ]
  },
  {
    id: 'blisters',
    name: 'Blisters (Vesicles)',
    description: 'Small bubble on the skin filled with serum.',
    suggestions: [
      { remedy: 'Cantharis', indication: 'Burning blisters; better by cold applications.', frequency: '2 hourly' },
      { remedy: 'Rhus tox.', indication: 'Itchy blisters; better by warmth.', frequency: 'tds' }
    ]
  },
  {
    id: 'bone-pain-chronic',
    name: 'Bone Pain (Chronic)',
    description: 'Deep-seated pain in the skeletal system.',
    suggestions: [
      { remedy: 'Asafoetida', indication: 'Pains in bones of nose and legs; worse at night.', frequency: 'bd' },
      { remedy: 'Phos acid', indication: 'Pains in long bones as if scraped by a knife.', frequency: 'tds' }
    ]
  },
  {
    id: 'breath-offensive',
    name: 'Breath (Offensive)',
    description: 'Bad breath or halitosis.',
    suggestions: [
      { remedy: 'Baptisia', indication: 'Offensive breath during fever or illness.', frequency: 'tds' },
      { remedy: 'Merc sol.', indication: 'Metallic taste and foul breath with salivation.', frequency: 'tds' }
    ]
  },
  {
    id: 'bronchial-catarrh',
    name: 'Bronchial Catarrh',
    description: 'Chronic inflammation of the mucous membrane of the airways.',
    suggestions: [
      { remedy: 'Senega', indication: 'Difficult rattling mucus in old people.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Stannum met.', indication: 'Sweetish expectoration; weakness of chest.', frequency: 'tds' }
    ]
  },
  {
    id: 'burns-recovery',
    name: 'Burns (Recovery Stage)',
    description: 'Skin healing phase after burns.',
    suggestions: [
      { remedy: 'Calendula', indication: 'Promotes rapid healing of skin and prevents scarring.', potency: 'Q', frequency: 'external' },
      { remedy: 'Causticum', indication: 'For the ill effects of old, poorly healed burns.', frequency: 'bd' }
    ]
  },
  {
    id: 'chilblains',
    name: 'Chilblains',
    description: 'Small, itchy swellings on the skin that occur as a reaction to cold temperatures.',
    suggestions: [
      { remedy: 'Agaricus', indication: 'Itching and burning like fire in toes and fingers.', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Chilblains that are blue and itchy; better in open air.', frequency: 'tds' }
    ]
  },
  {
    id: 'chills',
    name: 'Chills',
    description: 'Sensation of coldness accompanied by shivering.',
    suggestions: [
      { remedy: 'Camphora', indication: 'Sudden coldness of the whole body; icy cold to touch.', frequency: '15 mins' },
      { remedy: 'Gelsemium', indication: 'Chills running up and down the spine.', frequency: 'tds' }
    ]
  },
  {
    id: 'chronic-fatigue',
    name: 'Chronic Fatigue',
    description: 'Persistent tiredness that does not go away with rest.',
    suggestions: [
      { remedy: 'Acid phos.', indication: 'Mental and physical exhaustion from grief or overwork.', frequency: 'tds' },
      { remedy: 'China off.', indication: 'Debility after loss of body fluids (sweat, blood).', frequency: 'tds' }
    ]
  },
  {
    id: 'cold-sores',
    name: 'Cold Sores (Herpes Labialis)',
    description: 'Small, fluid-filled blisters on and around the lips.',
    suggestions: [
      { remedy: 'Natrum mur.', indication: 'Best remedy for sores around the mouth; look like pearls.', frequency: 'bd' },
      { remedy: 'Rhus tox.', indication: 'Itchy, burning blisters; corner of mouth.', frequency: 'tds' }
    ]
  },
  {
    id: 'colic-infantile',
    name: 'Colic (Infantile)',
    description: 'Excessive crying in infants due to abdominal pain.',
    suggestions: [
      { remedy: 'Chamomilla', indication: 'Child is extremely irritable and wants to be rocked.', frequency: '30 mins' },
      { remedy: 'Colocynth', indication: 'Bending double relieves the pain.', frequency: '30 mins' }
    ]
  },
  {
    id: 'congestion-head',
    name: 'Congestion (Head)',
    description: 'Excessive blood or fluid in the head region.',
    suggestions: [
      { remedy: 'Belladonna', indication: 'Violent throbbing with red face and cold feet.', frequency: 'hourly' },
      { remedy: 'Glonoinum', indication: 'Feeling as if head will burst from blood rush.', frequency: 'hourly' }
    ]
  },
  {
    id: 'dehydration',
    name: 'Dehydration',
    description: 'Harmful reduction in the amount of water in the body.',
    suggestions: [
      { remedy: 'China off.', indication: 'Debility from loss of vital fluids.', frequency: 'tds' },
      { remedy: 'Veratrum alb.', indication: 'Coldness and collapse after fluid loss.', frequency: 'hourly' }
    ]
  },
  {
    id: 'dental-abscess',
    name: 'Dental Abscess',
    description: 'Collection of pus caused by a bacterial infection in the inner part of a tooth.',
    suggestions: [
      { remedy: 'Hekla lava', indication: 'Gumboil with swelling of the jaw.', frequency: 'tds' },
      { remedy: 'Silicea', indication: 'Promotes suppuration and discharge of the abscess.', frequency: 'bd' }
    ]
  },
  {
    id: 'disc-prolapse',
    name: 'Disc Prolapse (Slipped Disc)',
    description: 'Condition where a spinal disc bulges or ruptures.',
    suggestions: [
      { remedy: 'Calcarea fluor.', indication: 'Specifically for strengthening spinal ligaments.', potency: '12x', frequency: 'tds' },
      { remedy: 'Hypericum', indication: 'Severe nerve pain radiating down the limb.', frequency: 'tds' }
    ]
  },
  {
    id: 'dog-bite',
    name: 'Dog Bite',
    description: 'Injury caused by a dog\'s teeth.',
    suggestions: [
      { remedy: 'Hydrophobinum', indication: 'Specific nosode for the ill-effects of dog bites.', potency: '200', frequency: 'stat' },
      { remedy: 'Ledum pal.', indication: 'Prevents infection in puncture wounds.', frequency: 'tds' }
    ]
  },
  {
    id: 'dropsy',
    name: 'Dropsy (Edema)',
    description: 'Abnormal accumulation of fluid in the interstitium.',
    suggestions: [
      { remedy: 'Apocynum', indication: 'One of the best remedies for dropsy and water retention.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Apis mel.', indication: 'Puffy swelling with stinging pain; thirstless.', frequency: 'tds' }
    ]
  },
  {
    id: 'dyspepsia',
    name: 'Dyspepsia (Indigestion)',
    description: 'Pain or discomfort in the upper abdomen.',
    suggestions: [
      { remedy: 'Abies nig.', indication: 'Sensation of a hard-boiled egg in the stomach.', frequency: 'tds' },
      { remedy: 'Nux vomica', indication: 'Acidity and heavy feeling after eating.', frequency: 'tds' }
    ]
  },
  {
    id: 'earwax',
    name: 'Earwax (Impacted)',
    description: 'Accumulation and hardening of cerumen in the ear canal.',
    suggestions: [
      { remedy: 'Conium', indication: 'Hard, dark earwax with roaring sounds.', frequency: 'bd' },
      { remedy: 'Mullein Oil', indication: 'Used as drops to soften and remove wax.', potency: 'Q', frequency: 'local' }
    ]
  },
  {
    id: 'eye-strain',
    name: 'Eye Strain',
    description: 'Fatigue of the eyes caused by intensive use.',
    suggestions: [
      { remedy: 'Ruta grav.', indication: 'Principal remedy for eye strain from fine work/reading.', frequency: 'bd' },
      { remedy: 'Onosmodium', indication: 'Eye strain with headache and dullness.', frequency: 'bd' }
    ]
  },
  {
    id: 'facial-paralysis',
    name: 'Facial Paralysis (Bell\'s Palsy)',
    description: 'Temporary weakness or paralysis of the facial muscles.',
    suggestions: [
      { remedy: 'Causticum', indication: 'Paralysis after exposure to cold wind.', frequency: 'tds' },
      { remedy: 'Cadmium sulph.', indication: 'Facial paralysis from stroke or trauma.', frequency: 'bd' }
    ]
  },
  {
    id: 'fatty-liver',
    name: 'Fatty Liver',
    description: 'Accumulation of fat in the liver cells.',
    suggestions: [
      { remedy: 'Chelidonium', indication: 'Liver pain and jaundice symptoms.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Phosphorus', indication: 'Degeneration of liver tissue.', frequency: 'bd' }
    ]
  },
  {
    id: 'fibroids',
    name: 'Uterine Fibroids',
    description: 'Noncancerous growths in the uterus.',
    suggestions: [
      { remedy: 'Fraxinus am.', indication: 'Specific for reducing uterine fibroids.', potency: 'Q', frequency: '10 drops tds' },
      { remedy: 'Aurum mur. nat.', indication: 'Enlarged and heavy uterus due to fibroids.', frequency: 'bd' }
    ]
  },
  {
    id: 'fissures',
    name: 'Anal Fissures',
    description: 'Small tear in the lining of the anus.',
    suggestions: [
      { remedy: 'Nitric acid', indication: 'Sharp, splinter-like pain after stool.', frequency: 'tds' },
      { remedy: 'Ratanhia', indication: 'Burning like fire; better with cold water.', frequency: 'bd' }
    ]
  },
  {
    id: 'fistula',
    name: 'Anal Fistula',
    description: 'Small tunnel that develops between the end of the bowel and the skin near the anus.',
    suggestions: [
      { remedy: 'Silicea', indication: 'Promotes healing of the fistula track.', frequency: 'bd' },
      { remedy: 'Paeonia', indication: 'Painful, oozing fistula.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'fright-effects',
    name: 'Fright (Effects of)',
    description: 'Chronic symptoms resulting from a sudden scare.',
    suggestions: [
      { remedy: 'Aconite', indication: 'Acute fear and panic after a fright.', frequency: 'hourly' },
      { remedy: 'Opium', indication: 'Stupor and long-term effects of fear or fright.', frequency: 'bd' }
    ]
  },
  {
    id: 'fungal-infection',
    name: 'Fungal Infection',
    description: 'Skin disease caused by a fungus.',
    suggestions: [
      { remedy: 'Chrysarobinum', indication: 'Used for ringworm and scaly fungal patches.', potency: '3x', frequency: 'tds' },
      { remedy: 'Thuja', potency: '200', indication: 'Constitutional support for persistent infections.', frequency: 'weekly' }
    ]
  },
  {
    id: 'gangrene',
    name: 'Gangrene',
    description: 'Death of body tissue due to a lack of blood flow or a serious bacterial infection.',
    suggestions: [
      { remedy: 'Secale cor.', indication: 'Dry gangrene; better by cold applications.', frequency: 'tds' },
      { remedy: 'Arsenicum alb.', indication: 'Burning pain; better by warmth.', frequency: 'tds' }
    ]
  },
  {
    id: 'goitre',
    name: 'Goitre',
    description: 'Abnormal enlargement of the thyroid gland.',
    suggestions: [
      { remedy: 'Iodium', indication: 'Hard, enlarged thyroid; hungry but losing weight.', frequency: 'bd' },
      { remedy: 'Thyreoidinum', indication: 'Constitutional support for thyroid balance.', frequency: 'bd' }
    ]
  },
  {
    id: 'heart-palpitations',
    name: 'Palpitations',
    description: 'Sensation that the heart is racing, pounding, or skipping beats.',
    suggestions: [
      { remedy: 'Cactus g.', indication: 'Strong pulsations with a feeling of constriction.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Spigelia', indication: 'Violent palpitations that can be seen through clothes.', frequency: 'tds' }
    ]
  },
  {
    id: 'herpes-zoster',
    name: 'Herpes Zoster (Shingles)',
    description: 'Reactivation of the chickenpox virus causing a painful rash.',
    suggestions: [
      { remedy: 'Rhus tox.', indication: 'Itchy, burning blisters; better by warmth.', frequency: 'tds' },
      { remedy: 'Ranunculus bul.', indication: 'Intense neuralgic pain with the rash.', frequency: 'tds' }
    ]
  },
  {
    id: 'hypotension',
    name: 'Low Blood Pressure',
    description: 'Lower than normal blood pressure.',
    suggestions: [
      { remedy: 'Cactus g.', indication: 'Stabilizes heart action.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Gelsemium', indication: 'Weakness and dullness with low pressure.', frequency: 'tds' }
    ]
  },
  {
    id: 'impetigo',
    name: 'Impetigo',
    description: 'Contagious skin infection causing red sores that can leak and form a yellow-brown crust.',
    suggestions: [
      { remedy: 'Antimonium crud.', indication: 'Honey-colored thick crusts.', frequency: 'tds' },
      { remedy: 'Cicuta vir.', indication: 'Eruptions on the face in children.', frequency: 'tds' }
    ]
  },
  {
    id: 'kidney-pain',
    name: 'Kidney Pain (Nephralgia)',
    description: 'Pain in the area where your kidneys are located.',
    suggestions: [
      { remedy: 'Berberis vul.', indication: 'Radiating pain to the bladder.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Ocimum can.', indication: 'Pain in the right kidney with red sand in urine.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'laryngitis',
    name: 'Laryngitis',
    description: 'Inflammation of your voice box (larynx) from overuse, irritation or infection.',
    suggestions: [
      { remedy: 'Aconite', indication: 'Sudden hoarseness after exposure to cold air.', frequency: 'hourly' },
      { remedy: 'Spongia', indication: 'Dry, barking cough; worse after sleep.', frequency: 'tds' }
    ]
  },
  {
    id: 'lumbago',
    name: 'Lumbago',
    description: 'Pain in the muscles and joints of the lower back.',
    suggestions: [
      { remedy: 'Bryonia', indication: 'Pain worse for every movement.', frequency: 'tds' },
      { remedy: 'Rhus tox.', indication: 'Pain better after initial movement.', frequency: 'tds' }
    ]
  },
  {
    id: 'mastitis',
    name: 'Mastitis',
    description: 'Inflammation of breast tissue that sometimes involves an infection.',
    suggestions: [
      { remedy: 'Phytolacca', indication: 'Glands hard and painful; radiating to ears.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Belladonna', indication: 'Early stage with heat, redness, and throbbing.', frequency: 'hourly' }
    ]
  },
  {
    id: 'morning-headache',
    name: 'Morning Headache',
    description: 'Headache occurring upon waking.',
    suggestions: [
      { remedy: 'Nux vomica', indication: 'Headache from late nights or over-eating.', frequency: 'bd' },
      { remedy: 'Natrum mur.', indication: 'Hammering headache starts in the sun.', frequency: 'bd' }
    ]
  },
  {
    id: 'mouth-sores',
    name: 'Mouth Sores',
    description: 'Painful areas in the mouth and on the gums.',
    suggestions: [
      { remedy: 'Merc sol.', indication: 'Increased saliva and bad breath.', frequency: 'tds' },
      { remedy: 'Nitric acid', indication: 'Sticking pain; corners of mouth.', frequency: 'tds' }
    ]
  },
  {
    id: 'nasal-congestion',
    name: 'Nasal Congestion',
    description: 'Stuffy nose caused by inflamed blood vessels.',
    suggestions: [
      { remedy: 'Nux vomica', indication: 'Stuffy at night; running in daytime.', frequency: 'bd' },
      { remedy: 'Sambucus', indication: 'Snuffles in infants; cannot breathe through nose.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'night-terrors',
    name: 'Night Terrors',
    description: 'Episodes of screaming, intense fear and flailing while still asleep.',
    suggestions: [
      { remedy: 'Stramonium', indication: 'Screaming at night; afraid of the dark.', frequency: 'hs' },
      { remedy: 'Cina', indication: 'Irritability and restlessness in children.', frequency: 'hs' }
    ]
  },
  {
    id: 'obesity-children',
    name: 'Pediatric Obesity',
    description: 'Condition where a child is significantly overweight for their age and height.',
    suggestions: [
      { remedy: 'Calcarea carb.', indication: 'Fat, fair, and flabby children; sweaty head.', frequency: 'bd' },
      { remedy: 'Capsicum', indication: 'Indolent, chilly children who dislike exercise.', frequency: 'bd' }
    ]
  },
  {
    id: 'orchitis',
    name: 'Orchitis',
    description: 'Inflammation of one or both testicles.',
    suggestions: [
      { remedy: 'Pulsatilla', indication: 'Specifically when mumps settle in the testicles.', frequency: 'tds' },
      { remedy: 'Clematis', indication: 'Hard, painful swelling.', frequency: 'bd' }
    ]
  },
  {
    id: 'otitis-media',
    name: 'Middle Ear Infection',
    description: 'Infection of the air-filled space behind the eardrum.',
    suggestions: [
      { remedy: 'Pulsatilla', indication: 'Bland yellow discharge.', frequency: 'tds' },
      { remedy: 'Silicea', indication: 'Chronic discharge; sensitive to cold.', frequency: 'bd' }
    ]
  },
  {
    id: 'pain-after-surgery',
    name: 'Post-Surgical Pain',
    description: 'Discomfort following an operative procedure.',
    suggestions: [
      { remedy: 'Arnica', indication: 'Mechanical trauma to tissues.', frequency: 'tds' },
      { remedy: 'Staphysagria', indication: 'Pain from surgical incisions; clean cuts.', frequency: 'tds' }
    ]
  },
  {
    id: 'pharyngitis',
    name: 'Pharyngitis',
    description: 'Inflammation of the pharynx, causing a sore throat.',
    suggestions: [
      { remedy: 'Wyethia', indication: 'Intense itching in the back of the throat.', frequency: 'tds' },
      { remedy: 'Baptisia', indication: 'Painful throat with a dark red appearance.', frequency: 'tds' }
    ]
  },
  {
    id: 'pityriasis',
    name: 'Pityriasis Rosea',
    description: 'Common skin condition that causes a temporary outbreak of red, scaly patches on the body.',
    suggestions: [
      { remedy: 'Arsenicum alb.', indication: 'Scaly skin with burning.', frequency: 'bd' },
      { remedy: 'Sepia', indication: 'Circular ring-like patches.', frequency: 'bd' }
    ]
  },
  {
    id: 'prostate-enlarged',
    name: 'Enlarged Prostate (BPH)',
    description: 'Age-associated prostate gland enlargement that can cause urination difficulty.',
    suggestions: [
      { remedy: 'Sabal serr.', indication: 'Specific for prostate issues; difficult urination.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Ferrum picricum', indication: 'Senile hypertrophy of the prostate.', frequency: 'bd' }
    ]
  },
  {
    id: 'pyorrhea',
    name: 'Pyorrhea (Periodontitis)',
    description: 'Serious gum infection that damages gums and can destroy the jawbone.',
    suggestions: [
      { remedy: 'Hekla lava', indication: 'Abscesses of the gums.', potency: '3x', frequency: 'tds' },
      { remedy: 'Merc sol.', indication: 'Bleeding gums with offensive odor.', frequency: 'tds' }
    ]
  },
  {
    id: 'renal-colic',
    name: 'Renal Colic',
    description: 'Type of pain caused by kidney stones.',
    suggestions: [
      { remedy: 'Berberis vul.', indication: 'Sharp, radiating pain.', potency: 'Q', frequency: '15 mins during attack' },
      { remedy: 'Cantharis', indication: 'Intense burning with the pain.', frequency: 'hourly' }
    ]
  },
  {
    id: 'scabies',
    name: 'Scabies',
    description: 'Contagious, intensely itchy skin condition caused by a tiny, burrowing mite.',
    suggestions: [
      { remedy: 'Sulphur', indication: 'Main remedy for suppressing the itch.', potency: '200', frequency: 'weekly' },
      { remedy: 'Psorinum', indication: 'When Sulphur fails or in dirty skin states.', potency: '200', frequency: 'weekly' }
    ]
  },
  {
    id: 'sunburn',
    name: 'Sunburn',
    description: 'Type of radiation burn that affects living tissue, such as skin, which results from an overexposure to ultraviolet radiation.',
    suggestions: [
      { remedy: 'Cantharis', indication: 'Burning and blisters from the sun.', frequency: '2 hourly' },
      { remedy: 'Urtica urens', indication: 'Prickly heat and mild sunburn.', potency: 'Q', frequency: 'local/internal' }
    ]
  },
  {
    id: 'teething-diarrhea',
    name: 'Teething Diarrhea',
    description: 'Loose stools commonly seen in infants when they are cutting teeth.',
    suggestions: [
      { remedy: 'Chamomilla', indication: 'Green, chopped spinach-like stools.', frequency: 'tds' },
      { remedy: 'Calcarea phos.', indication: 'Watery, spluttering stools.', frequency: 'tds' }
    ]
  },
  {
    id: 'tenesmus',
    name: 'Tenesmus',
    description: 'Continual or recurrent inclination to evacuate the bowels, caused by inflammation.',
    suggestions: [
      { remedy: 'Merc cor.', indication: 'Urgent, painful straining.', frequency: 'hourly' },
      { remedy: 'Nux vomica', indication: 'Ineffectual urging; feels "never done".', frequency: 'tds' }
    ]
  },
  {
    id: 'tinnitus',
    name: 'Tinnitus (Ringing in Ears)',
    description: 'Ringing or buzzing noise in one or both ears that may be constant or come and go.',
    suggestions: [
      { remedy: 'Chininum sulph.', indication: 'Ringing, roaring, or buzzing in ears.', frequency: 'bd' },
      { remedy: 'Chenopodium', indication: 'Vertigo with tinnitus; deafness to high voices.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'tonsillitis-chronic',
    name: 'Chronic Tonsillitis',
    description: 'Persistent infection and swelling of the tonsils.',
    suggestions: [
      { remedy: 'Baryta carb.', indication: 'Recurring tonsillitis in children.', frequency: 'bd' },
      { remedy: 'Psorinum', indication: 'Tendency to throat infections.', potency: '200', frequency: 'monthly' }
    ]
  },
  {
    id: 'trigeminal-neuralgia',
    name: 'Trigeminal Neuralgia',
    description: 'Chronic pain condition that affects the trigeminal nerve, which carries sensation from your face to your brain.',
    suggestions: [
      { remedy: 'Spigelia', indication: 'Left-sided facial stabbing pain.', frequency: 'tds' },
      { remedy: 'Mag phos.', indication: 'Right-sided pain; better for heat.', frequency: 'tds' }
    ]
  },
  {
    id: 'typhoid-fever',
    name: 'Typhoid (Recovery)',
    description: 'Healing phase after enteric fever.',
    suggestions: [
      { remedy: 'Baptisia', indication: 'Exhaustion and dullness.', frequency: 'tds' },
      { remedy: 'Muriatic acid', indication: 'Extreme weakness; sliding down the bed.', frequency: 'tds' }
    ]
  },
  {
    id: 'urticaria',
    name: 'Urticaria (Hives)',
    description: 'Skin rash with red, raised, itchy bumps.',
    suggestions: [
      { remedy: 'Apis mel.', indication: 'Stinging, burning hives; better for cold.', frequency: 'hourly' },
      { remedy: 'Urtica urens', indication: 'Itching worse after sleep or exercise.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'vaginitis',
    name: 'Vaginitis',
    description: 'Inflammation of the vagina that can result in discharge, itching and pain.',
    suggestions: [
      { remedy: 'Kreosotum', indication: 'Acid, burning discharge.', frequency: 'tds' },
      { remedy: 'Hydrastis', indication: 'Thick, yellow, stringy discharge.', potency: 'Q', frequency: 'tds' }
    ]
  },
  {
    id: 'varicose-veins',
    name: 'Varicose Veins',
    description: 'Gnarly, enlarged veins, most commonly appearing in the legs and feet.',
    suggestions: [
      { remedy: 'Hamamelis', indication: 'Painful, bleeding or sore veins.', potency: 'Q', frequency: 'tds' },
      { remedy: 'Pulsatilla', indication: 'Heavy, aching veins; worse in heat.', frequency: 'bd' }
    ]
  },
  {
    id: 'writer-cramp',
    name: 'Writer\'s Cramp',
    description: 'Specific type of task-specific focal dystonia that affects your finger, hand, or forearm.',
    suggestions: [
      { remedy: 'Mag phos.', indication: 'Cramping from over-writing.', potency: '6x', frequency: 'tds' },
      { remedy: 'Zincum met.', indication: 'Weakness and twitching of hands.', frequency: 'bd' }
    ]
  }
];
