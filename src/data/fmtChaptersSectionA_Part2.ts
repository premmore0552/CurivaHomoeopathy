import { FMTChapterDetail } from './fmtDetailedChapters';

export const FMT_SECTION_A_CHAPTERS_PART2: FMTChapterDetail[] = [
  {
    id: 'regional-injuries-head-neck-chest-abdomen',
    chapterNumber: 11,
    title: 'Regional Injuries - Head, Neck, Chest, Abdomen & Spine',
    section: 'Section A: Forensic Medicine',
    readTime: '28 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Master Head Injuries: Scalp hematomas (Caput succedaneum, Cephalhematoma, Subgaleal hematoma), Skull fractures (Fissured, Depressed, Pond, Ring fracture, Hinge fracture).',
      'Master Intracranial Hemorrhages: Extradural Hemorrhage (EDH / Middle Meningeal Artery / Lucid Interval), Subdural Hemorrhage (SDH / Bridging veins), Subarachnoid Hemorrhage (SAH / Berry aneurysm rupture / Thunderclap headache), Intracerebral Hemorrhage (ICH).',
      'Master Brain Injuries: Concussion vs Contusion vs Laceration, Coup vs Contrecoup injury mechanism.',
      'Understand Regional Trauma: Chest (Flail chest, Tension pneumothorax, Cardiac tamponade), Abdomen (Spleen rupture - Delayed splenic rupture, Liver laceration), Spine (Whiplash injury).'
    ],
    introduction: `Regional trauma represents a primary domain of clinical forensic medicine and autopsy practice. Head injuries account for over 60% of trauma fatalities in road traffic accidents (RTAs) across India. Meticulous differentiation of intracranial hematomas, skull fracture mechanics, and abdominal organ ruptures is essential for determining cause of death and legal intent under IPC 300 / 302 / 304A.`,
    whyThisMatters: `Extradural Hemorrhage (EDH) exhibits a classic "Lucid Interval" (temporary regain of consciousness followed by rapid coma) due to middle meningeal artery rupture; immediate neurosurgical burr-hole evacuation is lifesaving. Spleen is the most commonly ruptured solid abdominal organ in blunt trauma.`,
    simpleExplanation: `Head injuries are classified into scalp, skull fracture, intracranial hemorrhage, and brain damage. EDH (Extradural Hemorrhage) involves Middle Meningeal Artery tearing; the patient faints, wakes up feeling normal (Lucid Interval!), then rapidly collapses into coma from arterial pressure. SDH (Subdural Hemorrhage) involves tearing of delicate Bridging Veins; slow venous bleeding causes gradual memory loss or coma over days/weeks in elderly or alcoholics. SAH (Subarachnoid Hemorrhage) occurs in space containing CSF due to Berry Aneurysm rupture, causing sudden "worst headache of life". Spleen is the #1 abdominal organ ruptured in blunt impact, sometimes showing "delayed splenic rupture" days later!`,
    keyTerms: [
      { term: 'Lucid Interval', definition: 'A period of temporary mental clarity and apparent recovery between two episodes of unconsciousness, classically seen in arterial Extradural Hemorrhage (EDH).', simpleExplanation: 'Clear window of consciousness between fainting and collapsing into coma in EDH.' },
      { term: 'Coup vs Contrecoup Injury', definition: 'Coup injury occurs directly beneath the site of impact on the skull; Contrecoup injury occurs on the brain surface diametrically opposite to the point of impact due to brain acceleration-deceleration forces.', simpleExplanation: 'Coup is brain injury under impact site; Contrecoup is injury on opposite side.' },
      { term: 'Ring Fracture', definition: 'A circular fracture around the Foramen Magnum at the skull base produced by heavy vertical impact on top of the head or heavy fall landing on feet/buttocks.', simpleExplanation: 'Circular skull base fracture around the spinal opening.' },
      { term: 'Hinge Fracture (Motorcyclist Fracture)', definition: 'Transverse fracture extending completely across the middle cranial fossa, splitting the skull base into anterior and posterior halves, typical in heavy motorcycle crashes.', simpleExplanation: 'Transverse skull base fracture splitting base in two.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Intracranial Hemorrhage Autopsy Diagnosis Protocol', description: 'Incise scalp from mastoid to mastoid. Reflect scalp anteriorly and posteriorly. Inspect subgaleal space. Refract calvarium. Check EDH (dural surface, convex shape). Incise dura to inspect SDH (crescentic shape) and SAH (blood in subarachnoid space coating gyri).', keyTakeaway: 'Layered scalp dissection and careful dura reflection differentiate EDH, SDH, and SAH.' }
    ],
    importantConcepts: [{ title: 'Differentiating EDH vs SDH vs SAH', content: '1. EDH: Arterial origin (Middle Meningeal Artery), Biconvex / Lens shape on CT, Lucid Interval present, does NOT cross cranial sutures. 2. SDH: Venous origin (Bridging Veins), Crescentic shape on CT, slow onset, crosses sutures. 3. SAH: Arterial (Berry Aneurysm / Circle of Willis), fills sulci and basal cisterns, thunderclap headache.', type: 'info' }],
    flowcharts: [{ title: 'Intracranial Hemorrhage Diagnostic Flowchart', description: 'Pathological and CT distinction.', steps: [{ label: '1. Head Trauma / Sudden Collapse', description: 'Perform non-contrast CT Head or Autopsy examination.' }, { label: '2. Biconvex / Lens Shape CT', description: 'Extradural Hemorrhage (EDH) -> Middle Meningeal Artery tear.' }, { label: '3. Crescentic Shape CT', description: 'Subdural Hemorrhage (SDH) -> Bridging Vein tear.' }, { label: '4. Blood in Sulci & Cisterns', description: 'Subarachnoid Hemorrhage (SAH) -> Berry Aneurysm rupture.' }] }],
    tables: [{ title: 'Extradural (EDH) vs Subdural (SDH) Hemorrhage Comparison', headers: ['Feature', 'Extradural Hemorrhage (EDH)', 'Subdural Hemorrhage (SDH)'], rows: [['Vessel Involved', 'Middle Meningeal Artery (90%)', 'Bridging Cortical Veins'], ['Anatomical Location', 'Between Skull inner table and Dura Mater', 'Between Dura Mater and Arachnoid Mater'], ['CT Scan Appearance', 'Biconvex (Hyperdense Lens-shaped)', 'Crescentic (Concavo-convex)'], ['Clinical Hallmark', 'Classic Lucid Interval present', 'Gradual onset (Fluctuating consciousness)'], ['Crosses Suture Lines', 'NO (bound by dural attachments)', 'YES (spreads freely over hemisphere)']] }],
    clinicalExamples: [{ title: 'Road Accident Victim with Lucid Interval', scenario: 'A 25-year-old motorcyclist hits his head, faints briefly, wakes up, walks home feeling fine, but 3 hours later develops severe headache, vomiting, and collapses unconscious with a dilated pupil.', analysis: 'Classic presentation of Extradural Hemorrhage (EDH) with Middle Meningeal Artery tear exhibiting a Lucid Interval. Emergency CT shows biconvex hematoma; emergency burr-hole evacuation saves his life.', takeaway: 'Lucid Interval requires urgent CT head to rule out fatal EDH.' }],
    medicolegalImportance: ['Differentiates accidental, homicidal, and natural head injury causes.', 'Establishes cause of death in RTA and blunt trauma homicides.', 'Evaluates medical negligence in delayed diagnosis of EDH.'],
    mnemonics: [{ title: 'Intracranial Hemorrhages - "E-S-A"', phrase: 'EDH (Artery/Lens), SDH (Vein/Crescent), SAH (Aneurysm/Sulci)', breakdown: [{ letter: 'E', word: 'EDH', meaning: 'Extradural: Middle Meningeal Artery, Lens shape' }] }],
    commonMistakes: [{ mistake: 'Assuming a head injury patient who regains full consciousness in casualty is safe for discharge without observation.', whyWrong: 'Patients with Middle Meningeal Artery rupture may experience a Lucid Interval where they appear completely normal before sudden fatal brain herniation.', correctConcept: 'Observe head injury patients for at least 24 hours or obtain CT head.' }],
    highYieldPoints: ['EDH = Middle Meningeal Artery = Biconvex/Lens shape = Lucid Interval.', 'SDH = Bridging Veins = Crescent shape = Common in elderly/alcoholics.', 'SAH = Ruptured Berry Aneurysm = Thunderclap headache = Blood in sulci.', 'Most common organ ruptured in blunt abdominal trauma = Spleen.', 'Ring Fracture = Skull base circular fracture around Foramen Magnum.', 'Whiplash injury = Acceleration-deceleration cervical spine hyperextension.'],
    previousExamQuestions: [{ question: 'Discuss Intracranial Hemorrhages: Differentiate EDH, SDH, and SAH. Detail skull fractures and Lucid Interval.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is the Lucid Interval and in which intracranial hemorrhage is it classically seen?', answer: 'Temporary period of mental clarity between initial unconsciousness and secondary coma, classically seen in Extradural Hemorrhage (EDH) due to arterial bleeding.', clinicalPearl: 'Classic neurosurgery and forensic viva question.' }],
    shortNotes: [{ title: 'Lucid Interval', answer: 'Temporary window of consciousness between trauma-induced fainting and secondary coma, typical of Extradural Hemorrhage (EDH).' }],
    longQuestions: [{ title: 'Discuss Head Injuries and Intracranial Hemorrhages.', outline: ['Classification of scalp and skull fractures', 'EDH vs SDH vs SAH mechanisms and CT findings', 'Lucid interval definition and pathophysiology', 'Coup vs contrecoup brain injury'] }],
    mcqs: [{ id: 1, question: 'Biconvex hyperdense lens-shaped hematoma on non-contrast CT head is pathognomonic of:', options: ['Subdural Hemorrhage', 'Extradural Hemorrhage', 'Subarachnoid Hemorrhage', 'Intracerebral Hemorrhage'], correctIndex: 1, explanation: 'EDH is constrained by dural suture attachments, forming a biconvex lens shape.' }],
    caseBasedQuestions: [{ id: 1, title: 'Motorcyclist Head Trauma', scenario: 'Rider faints, wakes up normal, then collapses comatose 4 hours later with CT showing lens-shaped hematoma.', questions: ['Diagnosis? Vessel involved? Key clinical sign?'], solution: 'Extradural Hemorrhage (EDH); Middle Meningeal Artery; Lucid Interval.', legalSections: ['Regional Trauma'] }],
    summary: 'Chapter 11 covers scalp injuries, skull fractures (ring/hinge), EDH (middle meningeal artery, biconvex, lucid interval), SDH (bridging veins, crescent), SAH (berry aneurysm), coup-contrecoup, and spleen rupture.',
    revisionSheet: ['EDH = Middle meningeal artery + Biconvex + Lucid interval.', 'SDH = Bridging veins + Crescent.', 'SAH = Berry aneurysm.', 'Spleen = #1 blunt abdominal organ ruptured.'],
    flashcards: [{ id: 1, front: 'Which vessel is most commonly ruptured in Extradural Hemorrhage (EDH)?', back: 'Middle Meningeal Artery.', category: 'Head Injuries' }]
  },
  {
    id: 'thermal-injuries-burns-scalds-lightning',
    chapterNumber: 12,
    title: 'Thermal Injuries - Dry Heat (Burns), Moist Heat (Scalds), Electrical & Lightning Injuries',
    section: 'Section A: Forensic Medicine',
    readTime: '26 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Classify Thermal Injuries: Dry Heat Burns (Flame, Radiant heat, Contact) vs Moist Heat Scalds (Boiling liquids, Steam).',
      'Classify Burn Severity: Wilson\'s / Dupuytren\'s / Jackson\'s Burn Zones, Rule of Nines (Wallace Rule for adult body surface area).',
      'Master Antemortem vs Postmortem Burns: Soot in respiratory tract, Carboxyhemoglobin (COHb >20%), Line of redness / vital reaction, Blister fluid composition.',
      'Understand Heat Effects: Pugilistic Attitude (Heat hematoma / Heat rigor / Coagulation of muscle proteins).',
      'Master Electrical Injuries: Joule burn (electric entry mark), Flash burns, Arcing.',
      'Master Lightning Injuries: Lichtenberg figures (Arborescent / Fern-like / Feathering patterns).'
    ],
    introduction: `Thermal injuries comprise a significant percentage of unnatural fatalities in India, particularly in dowry death investigations (Sec 304B IPC / Sec 80 BNS) and industrial accidents. Distinguishing antemortem live burning from postmortem body destruction by fire is a paramount forensic requirement. Electrical and lightning trauma produce pathognomonic cutaneous lesions.`,
    whyThisMatters: `Presence of black soot in trachea/bronchi and blood Carboxyhemoglobin (COHb >20%) conclusively proves antemortem live fire exposure. Lichtenberg figures (feather-like skin marks) are pathognomonic of lightning strike.`,
    simpleExplanation: `Burns are caused by dry heat (flame/hot metal); Scalds are caused by moist heat (boiling water/steam). Scalds do NOT singe hair or cause skin blackening/charring! Rule of Nines calculates burn area (Head=9%, Each Arm=9%, Front=18%, Back=18%, Each Leg=18%, Perineum=1%). The crucial question in burned bodies: WAS THE PERSON ALIVE DURING THE FIRE? Antemortem signs: Black soot inside trachea/lungs, Carboxyhemoglobin (COHb) in blood (>20%), and Line of Redness at burn borders. Postmortem Heat Rigor causes "Pugilistic Attitude" (boxer-like posture due to muscle protein cookery). Electrical burns leave "Joule burns" at entry site. Lightning leaves fern-like "Lichtenberg figures" on skin!`,
    keyTerms: [
      { term: 'Pugilistic Attitude (Boxer\'s Stance)', definition: 'Involuntary flexed posture of arms, legs, and neck assumed by a burned corpse due to heat coagulation and contraction of muscle proteins.', simpleExplanation: 'Boxer-like flexed posture assumed by burned body due to muscle heat cooking.' },
      { term: 'Lichtenberg Figures (Arborescent Marks)', definition: 'Transient, reddish, fern-like or feather-like branching skin patterns produced by extravasation of RBCs in cutaneous capillaries struck by lightning.', simpleExplanation: 'Fern-like branching skin marks pathognomonic of lightning strike.' },
      { term: 'Joule Burn (Electrical Mark)', definition: 'Crater-like skin entry lesion with central pale crater, raised firm hyperemic margin, and nuclear streaming on histology caused by electric current heat.', simpleExplanation: 'Characteristic electrical entry mark with pale center and raised rim.' },
      { term: 'Rule of Nines (Wallace)', definition: 'Method estimating total body surface area (TBSA) burned in adults by dividing body into anatomical areas representing 9% or multiples of 9%.', simpleExplanation: 'Formula dividing adult body into 9% sections to calculate burn percent.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Antemortem vs Postmortem Burn Determination Protocol', description: 'Open larynx, trachea, and primary bronchi. Inspect for black soot/carbon particles. Collect femoral blood for Carboxyhemoglobin (COHb) level. Inspect blister floor for line of redness and neutrophil infiltration on histopathology.', keyTakeaway: 'Airway soot + COHb >20% + Histological vital reaction = Conclusive live burning.' }
    ],
    importantConcepts: [{ title: 'Differentiating Antemortem vs Postmortem Burns', content: '1. Antemortem Burns: Black soot in respiratory tract, Blood COHb >20%, Line of redness (inflammatory hyperemic zone) at burn edge, Blisters rich in protein and PMN cells. 2. Postmortem Burns: No airway soot, COHb normal (<5%), No line of redness, Blisters contain air/scanty fluid with no protein/PMNs.', type: 'info' }],
    flowcharts: [{ title: 'Antemortem Live Fire vs Postmortem Burning Workflow', description: 'Autopsy decision tree.', steps: [{ label: '1. Burned Body Autopsy', description: 'Dissect respiratory tract and collect blood.' }, { label: '2. Respiratory Tract Soot Check', description: 'Black soot in trachea/bronchi = Respiration during fire (Antemortem).' }, { label: '3. Blood COHb Analysis', description: 'COHb >20% = Live fire exposure.' }, { label: '4. Border Line of Redness', description: 'Inflammatory hyperemic line = Vital reaction.' }] }],
    tables: [{ title: 'Dry Flame Burns vs Moist Scalds', headers: ['Feature', 'Dry Flame Burns', 'Moist Scalds'], rows: [['Causative Agent', 'Direct flame, radiant heat, hot solid metal', 'Boiling water, steam, hot oil, hot liquid'], ['Singeing of Hair', 'PRESENT (singed, charred, curled)', 'ABSENT (hair unaffected)'], ['Blisters', 'Flat, dark, ruptured or dry', 'Prominent, tense, filled with fluid'], ['Blackening / Charring', 'PRESENT', 'ABSENT'], ['Line of Redness', 'Present at burn border', 'Present around scald area']] }],
    clinicalExamples: [{ title: 'Dowry Burn Scene Investigation', scenario: 'A young bride is found burned to death in a kitchen. In-laws claim kitchen accident. Police suspect dowry murder followed by burning.', analysis: 'Autopsy reveals soot particles in trachea, COHb of 35% in blood, and no traumatic skull/internal organ injuries, proving she was alive during fire.', takeaway: 'Airway soot and elevated COHb confirm live burning.' }],
    medicolegalImportance: ['Differentiates homicidal burning from suicidal or accidental fire.', 'Proves ante-mortem live fire exposure vs post-mortem body burning.', 'Aids investigation in dowry deaths (Sec 304B IPC / Sec 80 BNS).'],
    mnemonics: [{ title: 'Rule of Nines for Adult Burns - "9-9-18-18-18-18-1"', phrase: 'Head, Arms, Front, Back, Left-Leg, Right-Leg, Perineum', breakdown: [{ letter: '9', word: 'Head & Neck', meaning: '9% total area' }, { letter: '9', word: 'Each Arm', meaning: '9% x 2 = 18%' }, { letter: '18', word: 'Front Trunk', meaning: '18% chest + abdomen' }, { letter: '18', word: 'Back Trunk', meaning: '18% upper + lower back' }, { letter: '18', word: 'Each Leg', meaning: '18% x 2 = 36%' }, { letter: '1', word: 'Perineum', meaning: '1% genital area' }] }],
    commonMistakes: [{ mistake: 'Misinterpreting Pugilistic Stance as proof of defensive struggle before death.', whyWrong: 'Pugilistic attitude is a purely physical heat phenomenon caused by muscle protein thermal coagulation, occurring in any body exposed to high heat.', correctConcept: 'Pugilistic stance is a postmortem heat artifact.' }],
    highYieldPoints: ['Soot in trachea + COHb >20% = Proof of antemortem live burning.', 'Pugilistic stance = Postmortem heat artifact from muscle protein coagulation.', 'Lichtenberg figures = Fern-like skin marks pathognomonic of lightning.', 'Scalds do NOT singe hair or cause skin charring/blackening.', 'Joule burn = Crater-like electrical entry mark.'],
    previousExamQuestions: [{ question: 'Discuss Thermal Injuries: Differentiate Burns and Scalds, detail Antemortem vs Postmortem burn signs, Rule of Nines, and Lichtenberg figures.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What skin feature is pathognomonic of a lightning strike?', answer: 'Lichtenberg figures (arborescent/fern-like red branching marks).', clinicalPearl: 'Classic dermatology and forensic viva sign.' }],
    shortNotes: [{ title: 'Lichtenberg Figures', answer: 'Transient, fern-like branching red skin marks pathognomonic of lightning strike.' }],
    longQuestions: [{ title: 'Discuss Thermal and Electrical Injuries.', outline: ['Classification of burns vs scalds', 'Antemortem vs postmortem burn criteria', 'Rule of Nines calculation', 'Electrical Joule burn and lightning Lichtenberg figures'] }],
    mcqs: [{ id: 1, question: 'Transient fern-like or arborescent red branching skin patterns are pathognomonic of injury caused by:', options: ['High voltage electricity', 'Lightning strike', 'Boiling water scald', 'Radiant flame burn'], correctIndex: 1, explanation: 'Lichtenberg figures are pathognomonic of lightning strikes.' }],
    caseBasedQuestions: [{ id: 1, title: 'Burned Body Autopsy', scenario: 'Corpse in kitchen fire shows soot in primary bronchi and 40% COHb in blood.', questions: ['Alive or dead when fire started? Key proof?'], solution: 'Alive (Antemortem fire exposure); Soot in trachea and 40% COHb.', legalSections: ['Sec 304B IPC'] }],
    summary: 'Chapter 12 covers burns vs scalds, Wallace Rule of Nines, antemortem vs postmortem burn signs (soot, COHb, line of redness), pugilistic attitude, electrical joule burns, and lightning Lichtenberg figures.',
    revisionSheet: ['Airway soot + COHb >20% = Antemortem fire.', 'Scalds = No singeing, no charring.', 'Lichtenberg figures = Lightning.', 'Pugilistic stance = Heat artifact.'],
    flashcards: [{ id: 1, front: 'What is the minimum COHb level in blood proving antemortem fire exposure?', back: 'COHb > 20%.', category: 'Thermal Injuries' }]
  },
  {
    id: 'starvation-hypothermia-hyperthermia',
    chapterNumber: 13,
    title: 'Starvation, Deaths from Cold (Hypothermia) & Heat Hyperthermia',
    section: 'Section A: Forensic Medicine',
    readTime: '22 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Master Starvation: Acute vs Chronic starvation, Postmortem features (Loss of subcutaneous fat, Brown atrophy of heart, Gallbladder distension, Emaciation), Legal aspects (IPC 304A / 317 / 302).',
      'Master Hypothermia (Cold Exposure): Hide-and-Seek Dying (Terminal burrowing), Paradoxical undressing, Wischnewsky spots (gastric mucosal erosions), Frostbite.',
      'Master Heat Hyperthermia: Heat Stroke vs Heat Exhaustion vs Heat Cramps, Core temperature >40°C, Anhidrosis, Central nervous system dysfunction.'
    ],
    introduction: `Environmental extremes and nutritional deprivation represent important forensic starvation and temperature-related deaths. Starvation inquiries occur in cases of child neglect, elder abuse, dowry harassment, or custody deaths. Hypothermia produces bizarre behavioral phenomena like terminal burrowing and paradoxical undressing before death.`,
    whyThisMatters: `Wischnewsky spots (multiple small dark brown gastric mucosal erosions) are a characteristic autopsy finding in fatal Hypothermia. Paradoxical undressing occurs when terminal vasodilation makes hypothermic victims feel falsely hot.`,
    simpleExplanation: `Starvation is prolonged lack of food. Autopsy signs: Total loss of body fat, severe emaciation, paper-thin intestines, distended gallbladder (filled with dark bile), and Brown Atrophy of the heart! Hypothermia (Cold Death) occurs when body temperature drops below 35°C. Strange phenomena: 1. Paradoxical Undressing (dying cold victims strip off clothes because paralyzing skin blood vessels suddenly dilate, giving a false hot feeling). 2. Hide-and-Seek Dying (terminal burrowing into corners/closets). Autopsy sign: Wischnewsky spots (black/brown spots on stomach lining). Heat Stroke occurs when body temperature exceeds 40°C, causing sweating shutdown (anhidrosis) and coma.`,
    keyTerms: [
      { term: 'Wischnewsky Spots', definition: 'Multiple small, blackish-brown mucosal hemorrhages and erosions along gastric mucosal folds pathognomonic of fatal hypothermia.', simpleExplanation: 'Dark stomach lining spots found in hypothermia autopsies.' },
      { term: 'Paradoxical Undressing', definition: 'Terminal behavior in severe hypothermia where freezing victims remove their clothing due to sudden cutaneous vasodilation producing a false sensation of extreme heat.', simpleExplanation: 'Freezing victims stripping off clothes due to false heat sensation.' },
      { term: 'Hide-and-Seek Dying (Terminal Burrowing)', definition: 'Primitive brainstem-driven behavior in hypothermia where victims crawl into small, enclosed spaces (under beds, furniture) before death.', simpleExplanation: 'Freezing victims crawling into tight enclosed spaces before death.' },
      { term: 'Brown Atrophy of Heart', definition: 'Reduction in cardiac weight with lipofuscin pigment accumulation in myocardial cells seen in chronic starvation and marasmus.', simpleExplanation: 'Shrunken brown heart seen in chronic starvation.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Hypothermia Autopsy Inspection Protocol', description: 'Inspect body exterior for paradoxical undressing and frostbite. Dissect stomach lining to inspect for Wischnewsky spots. Check pinkish postmortem lividity (due to oxyhemoglobin retention in cold tissues).', keyTakeaway: 'Wischnewsky spots + paradoxical undressing + bright pink lividity confirm hypothermia.' }
    ],
    importantConcepts: [{ title: 'Differentiating Heat Stroke vs Heat Exhaustion', content: '1. Heat Stroke: Medical emergency, Core temp >40°C, Hot dry anhidrotic skin (no sweating), Confusion/Coma. 2. Heat Exhaustion: Water/Salt depletion, Core temp normal or slightly elevated (<39°C), Profuse sweating, Cold clammy skin.', type: 'info' }],
    flowcharts: [{ title: 'Hypothermia Pathophysiology & Behavioral Artifacts', description: 'Mechanism of death.', steps: [{ label: '1. Core Temperature Drops <30°C', description: 'Depression of central nervous system and thermoregulation.' }, { label: '2. Terminal Cutaneous Vasodilation', description: 'Paralysis of vasomotor center -> Sudden hot flushing sensation.' }, { label: '3. Paradoxical Undressing & Burrowing', description: 'Stripping clothes and crawling into tight spaces.' }, { label: '4. Autopsy Confirmation', description: 'Wischnewsky gastric spots + Bright pink lividity.' }] }],
    tables: [{ title: 'Heat Stroke vs Heat Exhaustion Comparison', headers: ['Feature', 'Heat Stroke', 'Heat Exhaustion'], rows: [['Core Body Temperature', '> 40°C (Extreme Hyperthermia)', 'Normal to moderately elevated (< 39°C)'], ['Skin State', 'Hot, RED, DRY (Anhidrosis / Sweating stopped)', 'Cold, pale, CLAMMY (Profuse sweating)'], ['Mental Status', 'Delirium, seizures, coma', 'Intact (Dizziness, nausea, faintness)'], ['Pathophysiology', 'Failure of hypothalamic thermoregulation', 'Water and sodium salt depletion'], ['Treatment Priority', 'Rapid active ice-water cooling', 'Oral/IV rehydration in cool room']] }],
    clinicalExamples: [{ title: 'Elderly Person Found Dead in Cold Room', scenario: 'An elderly homeless man is found dead in an unheated room during winter. Body is found partially unclothed under a bed.', analysis: 'Classic hypothermia scene showing paradoxical undressing and terminal burrowing. Autopsy reveals bright pink lividity and Wischnewsky spots on gastric mucosa.', takeaway: 'Paradoxical undressing and Wischnewsky spots define hypothermia.' }],
    medicolegalImportance: ['Differentiates accidental hypothermia from sexual assault/murder scenes (paradoxical undressing).', 'Investigates starvation deaths in child abuse and custodial neglect.', 'Evaluates occupational heat stroke fatalities.'],
    mnemonics: [{ title: 'Hypothermia Autopsy Hallmarks - "W-I-S-C"', phrase: 'Wischnewsky spots, Inappropriate undressing, Snow burrowing, Cold pink lividity', breakdown: [{ letter: 'W', word: 'Wischnewsky', meaning: 'Wischnewsky gastric spots' }] }],
    commonMistakes: [{ mistake: 'Assuming a partially unclothed body found in a cold environment was a victim of sexual assault.', whyWrong: 'Severe hypothermia induces paradoxical undressing where victims strip off clothes due to false heat sensation from terminal vasodilation.', correctConcept: 'Check for hypothermia before assuming sexual crime.' }],
    highYieldPoints: ['Wischnewsky spots = Gastric mucosal spots pathognomonic of hypothermia.', 'Paradoxical undressing = Stripping clothes due to false heat flush in freezing cold.', 'Terminal burrowing = Crawling into tight spaces before cold death.', 'Starvation autopsy = Brown atrophy of heart + Distended gallbladder.', 'Heat Stroke = Temp >40°C + Dry skin (Anhidrosis) + Coma.'],
    previousExamQuestions: [{ question: 'Discuss Hypothermia: Describe Wischnewsky spots, Paradoxical undressing, and terminal burrowing. Differentiate Heat Stroke and Heat Exhaustion.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What are Wischnewsky spots?', answer: 'Multiple blackish-brown gastric mucosal erosions found at autopsy in fatal hypothermia cases.', clinicalPearl: 'Classic hypothermia autopsy sign.' }],
    shortNotes: [{ title: 'Wischnewsky Spots', answer: 'Black-brown gastric mucosal erosion spots characteristic of hypothermia death.' }],
    longQuestions: [{ title: 'Discuss Deaths from Temperature Extremes.', outline: ['Hypothermia mechanisms and behavioral phenomena', 'Wischnewsky spots autopsy findings', 'Heat stroke vs heat exhaustion pathophysiology and treatment', 'Starvation autopsy features'] }],
    mcqs: [{ id: 1, question: 'Multiple blackish-brown gastric mucosal erosions seen at autopsy (Wischnewsky spots) are pathognomonic of:', options: ['Heat Stroke', 'Fatal Hypothermia', 'Acute Arsenic Poisoning', 'Starvation'], correctIndex: 1, explanation: 'Wischnewsky spots are characteristic gastric mucosal lesions in hypothermia.' }],
    caseBasedQuestions: [{ id: 1, title: 'Freezing Death Scene', scenario: 'Unclothed corpse found under bed in freezing winter with brown gastric spots.', questions: ['Diagnosis? Name of behavioral sign? Name of stomach sign?'], solution: 'Hypothermia; Paradoxical Undressing / Terminal Burrowing; Wischnewsky Spots.', legalSections: ['Temperature Extremes'] }],
    summary: 'Chapter 13 covers starvation signs (brown heart atrophy, distended gallbladder), hypothermia (Wischnewsky spots, paradoxical undressing, terminal burrowing), and heat stroke vs heat exhaustion.',
    revisionSheet: ['Wischnewsky spots = Hypothermia.', 'Paradoxical undressing = Freezing death.', 'Heat stroke = Temp >40°C + Dry skin.', 'Starvation = Brown heart atrophy.'],
    flashcards: [{ id: 1, front: 'What are Wischnewsky spots indicative of at autopsy?', back: 'Fatal Hypothermia.', category: 'Temperature Extremes' }]
  },
  {
    id: 'anaesthetic-operative-deaths',
    chapterNumber: 14,
    title: 'Medicolegal Investigation of Anaesthetic & Operative Deaths',
    section: 'Section A: Forensic Medicine',
    readTime: '20 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Understand Anaesthetic & Operative Deaths definition and classification.',
      'Master Anaesthetic Causes: Airway misplacement (Esophageal intubation), Hypoxia, Anaphylaxis, Overdose, Malignant Hyperthermia, Mendelson\'s syndrome.',
      'Master Surgical Causes: Massive hemorrhage, Air embolism, Organ perforation.',
      'Master Medicolegal Protocol: Intimation to police, Sealing OT drugs and equipment, Autopsy rules (Leaving ET tube and IV lines in situ).'
    ],
    introduction: `Deaths occurring on the operating table or during anaesthesia induction represent high-stakes medicolegal emergencies. Determining whether death resulted from underlying disease, surgical accident, or anaesthetic negligence requires strict adherence to investigation protocols.`,
    whyThisMatters: `Leaving endotracheal tubes and IV lines in situ during post-mortem examination is mandatory to verify proper airway placement and rule out malpositioning.`,
    simpleExplanation: `An OT death occurs during or immediately after surgery. Causes are divided into Anaesthetic (hypoxia, wrong intubation into esophagus, drug anaphylaxis, Mendelson syndrome) and Surgical (bleeding, air embolism). Protocol: Seal all drugs and machines, inform police, and conduct autopsy. CRITICAL AUTOPSY RULE: All tubes (Endotracheal tube, IV lines, drains) MUST be left in place (in situ) to prove proper placement!`,
    keyTerms: [
      { term: 'Mendelson\'s Syndrome', definition: 'Chemical pneumonitis caused by pulmonary aspiration of acidic gastric contents during general anaesthesia induction.', simpleExplanation: 'Lungs damaged by inhaling acidic stomach contents during anaesthesia.' },
      { term: 'In Situ Autopsy Rule', definition: 'Medicolegal mandate requiring all endotracheal tubes, IV catheters, and surgical drains to remain untouched in position for post-mortem inspection.', simpleExplanation: 'Leaving all tubes inside body for autopsy to verify correct placement.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Immediate Post-Event Protocol', description: 'Seal all drug ampoules, IV fluid bags, anaesthesia machine settings, and endotracheal tubes. Intimate police SHO immediately.', keyTakeaway: 'Preserve physical OT exhibits without altering settings.' }
    ],
    importantConcepts: [{ title: 'Autopsy Rules in OT Deaths', content: 'Must check endotracheal tube placement, inspect for venous air embolism, and perform histopathology and toxicological analysis of blood.', type: 'legal' }],
    flowcharts: [{ title: 'OT Death Investigation Workflow', description: 'Steps following an operative collapse.', steps: [{ label: '1. Resuscitation & Seal', description: 'Attempt CPR; seal all drug vials and equipment.' }, { label: '2. Intimation', description: 'Notify police and medical director.' }, { label: '3. Autopsy', description: 'Conduct thorough autopsy checking airway, air embolism, and drug levels.' }] }],
    tables: [{ title: 'Anaesthetic vs Surgical Causes of OT Death', headers: ['Category', 'Anaesthetic Causes', 'Surgical Causes'], rows: [['Primary Issue', 'Hypoxia, overdose, intubation failure, anaphylaxis', 'Massive hemorrhage, organ perforation, air embolism']] }],
    clinicalExamples: [{ title: 'Mendelson Syndrome Aspiration', scenario: 'Unfasted emergency surgery patient aspirates gastric fluid during induction.', analysis: 'Autopsy reveals severe chemical pneumonitis.', takeaway: 'Pre-op fasting reduces aspiration pneumonitis risk.' }],
    medicolegalImportance: ['Resolves medical negligence claims in surgical deaths.'],
    mnemonics: [{ title: 'OT Death Causes - "H-A-V-O-C"', phrase: 'Hypoxia, Anaphylaxis, Venous embolism, Overdose, Cardiac arrest', breakdown: [{ letter: 'H', word: 'Hypoxia', meaning: 'Failure of oxygen delivery or airway' }] }],
    commonMistakes: [{ mistake: 'Removing endotracheal tube before medicolegal autopsy.', whyWrong: 'Removing tube prevents confirming correct tracheal placement vs accidental esophageal intubation.', correctConcept: 'Leave all lines and tubes in situ for autopsy.' }],
    highYieldPoints: ['Leave endotracheal tube in situ for autopsy.', 'Mendelson syndrome = Gastric aspiration pneumonitis.', 'Malignant hyperthermia = Triggered by succinylcholine/halothane.'],
    previousExamQuestions: [{ question: 'Discuss medicolegal investigation of Anaesthetic Deaths.', year: '2021', marks: 5 }],
    vivaQuestions: [{ id: 1, question: 'Why should IV lines and ET tubes be left in situ for autopsy in OT deaths?', answer: 'To verify proper placement and rule out misplacement or air embolism.', clinicalPearl: 'Never remove lines before PM exam.' }],
    shortNotes: [{ title: 'Mendelson Syndrome', answer: 'Chemical pneumonitis due to aspiration of acidic stomach contents (pH < 2.5) during anaesthesia induction.' }],
    longQuestions: [{ title: 'Discuss Anaesthetic and Operative Deaths.', outline: ['Causes', 'OT protocols', 'Autopsy procedure', 'Medicolegal aspects'] }],
    mcqs: [{ id: 1, question: 'In an OT death autopsy, endotracheal tube should be:', options: ['Removed immediately', 'Left in situ', 'Replaced', 'Discarded'], correctIndex: 1, explanation: 'Must be left in situ to confirm correct tracheal intubation.' }],
    caseBasedQuestions: [{ id: 1, title: 'OT Collapse', scenario: 'Patient dies on OT table. Doctor removes ET tube before police arrive.', questions: ['Is this correct?'], solution: 'No, tube must remain in situ for PM exam.', legalSections: ['Anaesthetic Deaths'] }],
    summary: 'Chapter 14 covers OT death investigation, anaesthetic causes, Mendelson syndrome, and autopsy rules.',
    revisionSheet: ['Leave ET tube in situ.', 'Mendelson syndrome = Aspiration pneumonitis.'],
    flashcards: [{ id: 1, front: 'What should be done with ET tubes and IV lines before autopsy in OT deaths?', back: 'Leave them in situ.', category: 'Anaesthetic Deaths' }]
  },
  {
    id: 'impotence-sterility-assisted-reproduction',
    chapterNumber: 15,
    title: 'Impotence, Sterility, Sterilization, ART & Surrogacy Act 2021',
    section: 'Section A: Forensic Medicine',
    readTime: '24 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Define Impotence vs Sterility in males and females.',
      'Understand causes of organic vs psychic impotence.',
      'Master medicolegal aspects of Impotence & Sterility: Nullity of marriage (Section 12 Hindu Marriage Act), Rape defense, Paternity disputed cases.',
      'Master Assisted Reproductive Technology (ART) Regulation Act 2021 & Surrogacy (Regulation) Act 2021: Ban on commercial surrogacy, Altruistic surrogacy rules, Eligibility criteria.'
    ],
    introduction: `Impotence and sterility carry profound implications in matrimonial disputes, criminal defense, and family law. Under the Hindu Marriage Act 1955, impotence at the time of marriage constitutes valid grounds for annulment (nullity) of marriage. The Surrogacy Regulation Act 2021 and ART Act 2021 completely revamped reproductive laws in India.`,
    whyThisMatters: `Impotence (inability to perform intercourse) IS valid grounds for nullity of marriage under Sec 12 HMA, whereas Sterility (inability to procreate) is NOT grounds for nullity. Commercial surrogacy is strictly banned in India.`,
    simpleExplanation: `Impotence means inability to perform sexual intercourse (copulation). Sterility means inability to produce children (procreation). Key legal rule: Impotence IS grounds for cancellation (nullity) of marriage under Section 12 Hindu Marriage Act; Sterility is NOT grounds for nullity! Surrogacy Regulation Act 2021: Commercial surrogacy (paying a surrogate mother) is STRICTLY BANNED in India! Only Altruistic Surrogacy (no monetary payment except medical insurance) is permitted for legally married infertile Indian couples.`,
    keyTerms: [
      { term: 'Impotence', definition: 'Inability to perform the sexual act (copulation) effectively.', simpleExplanation: 'Inability to perform sexual intercourse.' },
      { term: 'Sterility', definition: 'Inability to procreate or reproduce offspring, despite normal capability for sexual intercourse.', simpleExplanation: 'Inability to have children.' },
      { term: 'Altruistic Surrogacy', definition: 'Surrogacy involving no monetary compensation, reward, or remuneration to the surrogate mother, except medical expenses and insurance cover.', simpleExplanation: 'Surrogacy without paying money to the surrogate mother.' },
      { term: 'Surrogacy Regulation Act 2021', definition: 'Indian law banning commercial surrogacy, regulating altruistic surrogacy, and establishing National and State Surrogacy Boards.', simpleExplanation: 'Indian law banning commercial surrogacy.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Medicolegal Examination Protocol for Male Impotence', description: 'Perform detailed physical exam (secondary sexual characteristics, testes, penis), nocturnal penile tumescence (NPT) testing, Doppler vascular studies, and semen analysis.', keyTakeaway: 'NPT testing differentiates organic from psychic impotence.' }
    ],
    importantConcepts: [{ title: 'Surrogacy Regulation Act 2021 India', content: 'Bans commercial surrogacy completely. Allows ONLY altruistic surrogacy for Indian legally married infertile couples (husband 26-55 yrs, wife 23-50 yrs). Surrogate must be a willing relative.', type: 'legal' }],
    flowcharts: [{ title: 'Impotence Differentiating Workflow', description: 'NPT test to separate organic from psychic causes.', steps: [{ label: 'Nocturnal Penile Tumescence (NPT)', description: 'Spontaneous sleep erections present = Psychic Impotence; Absent = Organic Impotence.' }] }],
    tables: [{ title: 'Impotence vs Sterility', headers: ['Feature', 'Impotence', 'Sterility'], rows: [['Core Defect', 'Inability to perform copulation (intercourse)', 'Inability to procreate (produce offspring)'], ['Grounds for Marriage Nullity', 'YES (Sec 12 Hindu Marriage Act)', 'NO (not grounds for nullity)']] }],
    clinicalExamples: [{ title: 'Annulment of Marriage under Sec 12 HMA', scenario: 'A wife files for nullity claiming husband was impotent at time of marriage.', analysis: 'Medical board confirms organic erectile dysfunction. Court grants decree of nullity.', takeaway: 'Impotence at marriage is grounds for nullity.' }],
    medicolegalImportance: ['Grounds for nullity of marriage (Sec 12 HMA).', 'Defence against rape accusation.', 'Ensures compliance with ART & Surrogacy Acts 2021.'],
    mnemonics: [{ title: 'ART & Surrogacy Key Rules - "A-N-N-U-L"', phrase: 'Altruistic, No money, Native Indian, Unmarried banned, Legal age', breakdown: [{ letter: 'A', word: 'Altruistic', meaning: 'Only altruistic surrogacy permitted' }] }],
    commonMistakes: [{ mistake: 'Confusing sterility with impotence in marriage nullity petitions.', whyWrong: 'Sterility is NOT grounds for nullity of marriage under Indian law.', correctConcept: 'Only Impotence is grounds for nullity.' }],
    highYieldPoints: ['Impotence = Cannot copulate; Sterility = Cannot procreate.', 'Impotence IS grounds for marriage nullity (Sec 12 HMA); Sterility is NOT.', 'Commercial surrogacy is BANNED in India under 2021 Act.', 'NPT test differentiates organic vs psychic impotence.'],
    previousExamQuestions: [{ question: 'Differentiate Impotence and Sterility. Discuss medicolegal aspects and Surrogacy Act 2021.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'Is sterility grounds for nullity of marriage in India?', answer: 'No, sterility is NOT grounds for nullity. Only impotence is.', clinicalPearl: 'Important distinction in matrimonial law.' }],
    shortNotes: [{ title: 'Surrogacy Regulation Act 2021', answer: 'Bans commercial surrogacy, permits altruistic surrogacy for eligible infertile Indian couples with strict age and medical conditions.' }],
    longQuestions: [{ title: 'Discuss Impotence, Sterility, and Assisted Reproduction.', outline: ['Definitions', 'Causes', 'Examination protocol', 'Legal aspects and Surrogacy Act 2021'] }],
    mcqs: [{ id: 1, question: 'Under Indian law, which condition is valid grounds for nullity of marriage?', options: ['Sterility', 'Impotence', 'Azoospermia', 'Frigidity'], correctIndex: 1, explanation: 'Section 12 Hindu Marriage Act specifies Impotence as grounds for nullity.' }],
    caseBasedQuestions: [{ id: 1, title: 'Marriage Nullity Petition', scenario: 'Wife files for nullity due to husband\'s sterility.', questions: ['Will court grant nullity?'], solution: 'No, sterility is not grounds for nullity.', legalSections: ['Sec 12 HMA', 'Impotence'] }],
    summary: 'Chapter 15 covers impotence, sterility, ART Act 2021, and Surrogacy Regulation Act 2021.',
    revisionSheet: ['Impotence = Cannot intercourse; Sterility = Cannot reproduce.', 'Impotence grounds for nullity.', 'Commercial surrogacy banned.'],
    flashcards: [{ id: 1, front: 'Is sterility grounds for marriage nullity?', back: 'No, only impotence is grounds for nullity under Sec 12 HMA.', category: 'Matrimonial Law' }]
  },
  {
    id: 'virginity-pregnancy-delivery',
    chapterNumber: 16,
    title: 'Virginity, Pregnancy, Delivery & Legitimacy',
    section: 'Section A: Forensic Medicine',
    readTime: '20 min study',
    difficulty: 'Intermediate',
    learningObjectives: [
      'Understand signs of Virginity (Hymenal types) and Defloration.',
      'Recognize signs of Pregnancy in living vs dead women.',
      'Understand signs of Recent vs Remote Delivery.',
      'Understand legal rules on Legitimacy, Presumption of Legitimacy (Sec 112 IEA / BSA), and DNA Paternity testing.'
    ],
    introduction: `Virginity, pregnancy, delivery, and legitimacy are central topics in civil and criminal jurisprudence. Questions regarding virginity arise in rape, nullity of marriage, and defamation. Pregnancy and delivery examinations occur in concealment of birth, infanticide, abortion, and maternity disputes. Presumption of legitimacy protects children born during valid wedlock.`,
    whyThisMatters: `The two-finger test (finger test) for virginity/sexual activity is strictly banned and illegal in India by Supreme Court rulings. Presumption of legitimacy under Section 112 IEA / Section 117 BSA protects children unless non-access is proven.`,
    simpleExplanation: `Virginity refers to never having had sexual intercourse, indicated by an intact hymen. However, hymenal rupture can occur accidentally (sports, horseback riding). The Supreme Court has strictly banned the 'Two-finger test'. Under Section 112 IEA / 117 BSA, a child born during marriage or within 280 days of divorce is legally presumed legitimate.`,
    keyTerms: [
      { term: 'Defloration', definition: 'Rupture or tearing of the hymen resulting from first sexual intercourse.', simpleExplanation: 'Hymenal tearing from first sexual intercourse.' },
      { term: 'Presumption of Legitimacy (Sec 112 IEA / Sec 117 BSA)', definition: 'Conclusive legal presumption that a child born during valid wedlock or within 280 days of dissolution is the legitimate child of the husband, unless non-access is proved.', simpleExplanation: 'Legal rule that a child born during marriage is presumed to be the husband\'s child.' },
      { term: 'Linea Nigra & Striae Gravidarum', definition: 'Hyperpigmented abdominal midline line and stretch marks on abdomen/breasts indicating current or past pregnancy.', simpleExplanation: 'Dark abdominal line and stretch marks from pregnancy.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Examination of Hymen', description: 'Inspect shape (annular, semilunar, septate, cribriform) and location of tears. Fresh tears have red edges; old tears heal as carunculae myrtiformes after delivery.', keyTakeaway: 'Two-finger test is strictly banned by Supreme Court.' }
    ],
    importantConcepts: [{ title: 'Supreme Court Ban on Two-Finger Test', content: 'The Supreme Court of India held that the "two-finger test" violates a woman\'s right to privacy, dignity, and integrity. Conducting it constitutes misconduct.', type: 'legal' }],
    flowcharts: [{ title: 'Presumption of Legitimacy Timeline', description: 'Section 112 IEA / Sec 117 BSA rule.', steps: [{ label: 'Born During Marriage', description: 'Conclusive proof of legitimacy.' }, { label: 'Born Within 280 Days of Divorce', description: 'Mother remaining unmarried = Presumed legitimate.' }, { label: 'Rebuttal', description: 'Proving absolute non-access between husband and wife at time of conception.' }] }],
    tables: [{ title: 'Signs of Recent Delivery in Living Woman', headers: ['Anatomical Site', 'Findings (1 to 2 Weeks Post-Delivery)'], rows: [['Uterus', 'Palpable abdominally, involuting gradually'], ['Lochia', 'Rubra (red, 1-4 days) -> Serosa (pink, 5-9 days) -> Alba (white, 10-14 days)'], ['Cervix', 'Soft, dilated, admits tips of fingers; transverse tear'], ['Breasts', 'Engorged, primary/secondary areola, colostrum secretion']] }],
    clinicalExamples: [{ title: 'Disputed Paternity DNA Testing', scenario: 'A husband denies paternity of a child born during marriage and demands DNA testing.', analysis: 'Under Sec 112 IEA / 117 BSA, legal presumption favors child\'s legitimacy unless husband proves non-access or court orders DNA test based on strong prima facie evidence.', takeaway: 'Presumption of legitimacy is a strong legal protection for children.' }],
    medicolegalImportance: ['Resolves legitimacy and inheritance disputes.', 'Evidence in infanticide and concealed pregnancy trials.', 'Protects female patient dignity under Supreme Court mandates.'],
    mnemonics: [{ title: 'Lochia Discharge Stages - "R-S-A"', phrase: 'Rubra, Serosa, Alba', breakdown: [{ letter: 'R', word: 'Rubra', meaning: 'Red discharge (Days 1-4)' }, { letter: 'S', word: 'Serosa', meaning: 'Pinkish/brown discharge (Days 5-9)' }, { letter: 'A', word: 'Alba', meaning: 'White/yellow discharge (Days 10-14)' }] }],
    commonMistakes: [{ mistake: 'Performing or documenting a "two-finger test" in sexual assault or virginity cases.', whyWrong: 'Strictly illegal and banned by Supreme Court of India.', correctConcept: 'Never perform two-finger test.' }],
    highYieldPoints: ['Two-finger test is ILLEGAL and banned by Supreme Court.', 'Sec 112 IEA / 117 BSA = Presumption of legitimacy (280 days rule).', 'Carunculae myrtiformes = Remains of hymen after childbirth.', 'Gestational age = 280 days (10 lunar months / 40 weeks).'],
    previousExamQuestions: [{ question: 'Discuss Presumption of Legitimacy under Sec 112 IEA. List signs of recent delivery.', year: '2022', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is the status of the "two-finger test" in India?', answer: 'Strictly banned and declared illegal by Supreme Court as a violation of women\'s dignity.', clinicalPearl: 'Never perform or mention it in report.' }],
    shortNotes: [{ title: 'Presumption of Legitimacy (Sec 112 IEA / Sec 117 BSA)', answer: 'Conclusive proof of legitimacy if child is born during valid marriage or within 280 days of dissolution, unless non-access is proven.' }],
    longQuestions: [{ title: 'Discuss Virginity, Pregnancy, Delivery, and Legitimacy.', outline: ['Signs of virginity', 'Two-finger test ban', 'Signs of recent delivery', 'Legitimacy rules'] }],
    mcqs: [{ id: 1, question: 'The legal period of gestation for presumption of legitimacy under Sec 112 IEA is:', options: ['240 days', '280 days', '300 days', '365 days'], correctIndex: 1, explanation: '280 days (10 lunar months) is the statutory period.' }],
    caseBasedQuestions: [{ id: 1, title: 'Disputed Paternity', scenario: 'Child born 250 days after husband\'s death.', questions: ['Legitimate?'], solution: 'Yes, within 280 days window.', legalSections: ['Sec 112 IEA / 117 BSA'] }],
    summary: 'Chapter 16 covers virginity, two-finger test ban, signs of delivery, lochia stages, and presumption of legitimacy.',
    revisionSheet: ['Two-finger test = BANNED.', 'Sec 112 IEA = Presumption of legitimacy.', 'Carunculae myrtiformes = Postpartum hymen.'],
    flashcards: [{ id: 1, front: 'What is the legal presumption period of legitimacy after dissolution of marriage under Sec 112 IEA?', back: '280 Days.', category: 'Legitimacy' }]
  },
  {
    id: 'mechanical-asphyxia-drowning-hanging',
    chapterNumber: 17,
    title: 'Mechanical Asphyxia - Hanging, Strangulation, Suffocation & Drowning',
    section: 'Section A: Forensic Medicine',
    readTime: '30 min study',
    difficulty: 'Advanced',
    learningObjectives: [
      'Master Asphyxia Pathophysiology: Tardieu spots, Cyanosis, Congestion, Edema, Dark fluid blood.',
      'Master Hanging: Complete vs Incomplete, Typical vs Atypical, Ligature mark (Inverted V shape, non-continuous, above thyroid cartilage, parchmentized floor), Fracture of hyoid/thyroid cartilage.',
      'Master Strangulation: Manual (Throttling) vs Ligature Strangulation vs Garrotting vs Bansdola, Ligature mark (Horizontal, continuous, below thyroid cartilage), Hyoid fracture frequency.',
      'Master Suffocation: Smothering, Gagging, Choking, Overlaying, Traumatic Asphyxia (Burking).',
      'Master Drowning: Wet Drowning (Freshwater vs Saltwater mechanisms) vs Dry Drowning, Gettler test, Diatom test, Froth at mouth/nostrils, Cadaveric spasm.'
    ],
    introduction: `Mechanical asphyxia results from violent interference with atmospheric air entry into the lungs or mechanical obstruction of cerebral blood vessels. Asphyxial deaths—especially hanging, strangulation, and drowning—are among the most frequently encountered violent deaths in Indian forensic practice.`,
    whyThisMatters: `Differentiating suicidal Hanging from homicidal Strangulation is a crucial courtroom requirement. Hanging shows an inverted-V non-continuous ligature mark above thyroid cartilage; Strangulation shows a continuous horizontal ligature mark below thyroid cartilage. Diatom test in bone marrow proves live drowning.`,
    simpleExplanation: `Asphyxia is oxygen starvation. Hanging is usually suicidal: weight of body pulls ligature around neck, leaving an INVERTED V-SHAPED, NON-CONTINUOUS ligature mark HIGH in the neck (above thyroid cartilage). Strangulation is usually homicidal: external force tightens ligature or hands (Throttling), leaving a HORIZONTAL, CONTINUOUS ligature mark LOW in the neck (below thyroid cartilage). Drowning occurs when liquid enters airways: produces fine white persistent froth at mouth/nose, Washerwoman\'s hands (wrinkled skin), and Diatoms in bone marrow! The Diatom Test proves live drowning because living heart pumps microscopic silica algae (diatoms) from drowning water into systemic circulation and bone marrow!`,
    keyTerms: [
      { term: 'Diatom Test', definition: 'Forensic test detecting microscopic silica-walled unicellular algae (diatoms) in closed long bone marrow (femur/tibia) to confirm antemortem drowning in water.', simpleExplanation: 'Microscopic algae test in bone marrow proving live drowning.' },
      { term: 'Tardieu Spots', definition: 'Subpleural, subpericardial, and conjunctival petechial hemorrhages produced by acute capillary rupture due to sudden elevated venous pressure in mechanical asphyxia.', simpleExplanation: 'Pinpoint blood spots on eyes and lungs in asphyxia.' },
      { term: 'Parchmentization', definition: 'Drying and parchment-like yellow-brown hardening of abraded skin floor in hanging ligature marks due to postmortem desiccation.', simpleExplanation: 'Dry yellow-brown hardening of skin under hanging rope.' },
      { term: 'Washerwoman\'s Skin', definition: 'Wrinkling, bleaching, and sodden thickening of epidermis on palms and soles caused by prolonged water immersion (drowning or submersed corpse).', simpleExplanation: 'Wrinkled bleached skin on fingers and soles from water immersion.' }
    ],
    stepByStep: [
      { stepNumber: 1, title: 'Hanging vs Strangulation Autopsy Protocol', description: 'Inspect ligature mark position, direction, and continuity. Dissect neck in layers in a bloodless field (after removing chest and brain). Inspect hyoid bone (greater cornua fractures in strangulation/hanging) and carotid arteries (Amussat\'s sign - intimal tear).', keyTakeaway: 'Layer-by-layer neck dissection in bloodless field identifies hemorrhages and fractures.' }
    ],
    importantConcepts: [{ title: 'Differentiating Hanging vs Ligature Strangulation', content: '1. Hanging: Mostly Suicidal, Ligature mark HIGH (above thyroid cartilage), Inverted V-shape, Non-continuous (gap at knot), Floor parchmentized, Less bruising. 2. Ligature Strangulation: Mostly Homicidal, Ligature mark LOW (below thyroid cartilage), Horizontal, Continuous completely around neck, Extensive local neck muscle bruising.', type: 'info' }],
    flowcharts: [{ title: 'Neck Compression Asphyxia Differential Algorithm', description: 'Autopsy decision tree.', steps: [{ label: '1. Inspect Neck Ligature Mark', description: 'Examine trajectory, level, and continuity.' }, { label: '2. High Neck + Inverted V + Non-Continuous', description: 'HANGING (Presume Suicidal).' }, { label: '3. Low Neck + Horizontal + Continuous', description: 'LIGATURE STRANGULATION (Presume Homicidal).' }, { label: '4. Finger Bruises + Nails Marks', description: 'MANUAL STRANGULATION / THROTTLING (Homicidal).' }] }],
    tables: [{ title: 'Hanging vs Ligature Strangulation Summary', headers: ['Feature', 'Hanging', 'Ligature Strangulation'], rows: [['Motive / Manner', 'Suicidal in vast majority', 'Homicidal in vast majority'], ['Ligature Mark Direction', 'Oblique, non-horizontal, ascending towards knot', 'Horizontal, transverse completely around neck'], ['Ligature Mark Continuity', 'NON-CONTINUOUS (gap at knot site)', 'CONTINUOUS all around neck'], ['Mark Position', 'HIGH in neck (above thyroid cartilage)', 'LOW in neck (below thyroid cartilage)'], ['Floor of Mark', 'Parchmentized, dry, yellowish-brown', 'Soft, moist, reddish-brown'], ['Neck Muscle Hemorrhage', 'Rare and superficial', 'Common and deep into strap muscles'], ['Hyoid Bone Fracture', 'Inward fracture of greater cornua (less common)', 'Outward/Inward fracture (more common)']] }],
    clinicalExamples: [{ title: 'Suspicious Neck Mark in Domestic Fatality', scenario: 'A young married woman is found dead at home. In-laws claim suicidal hanging; family suspects homicidal strangulation.', analysis: 'Autopsy reveals a continuous horizontal ligature mark below the thyroid cartilage, deep neck muscle contusions, and outward fracture of hyoid bone. Proves homicidal strangulation.', takeaway: 'Horizontal continuous mark below thyroid cartilage indicates homicidal strangulation.' }],
    medicolegalImportance: ['Differentiates suicidal hanging from homicidal strangulation.', 'Proves antemortem drowning using Diatom test in bone marrow.', 'Investigates asphyxial dowry homicides (Sec 304B IPC).'],
    mnemonics: [{ title: 'Hanging vs Strangulation Mark - "H-I-G-H vs L-O-W"', phrase: 'Hanging (Inverted-V, Gap, High), Strangulation (Low, Continuous, Horizontal)', breakdown: [{ letter: 'H', word: 'Hanging', meaning: 'High, Inverted-V, Gap at knot' }] }],
    commonMistakes: [{ mistake: 'Assuming presence of diatoms in drowning water alone proves drowning.', whyWrong: 'Diatoms must be demonstrated inside CLOSED bone marrow (femur) to prove antemortem drowning, as water diatoms can enter open organs passively postmortem.', correctConcept: 'Diatoms in intact bone marrow confirm live drowning.' }],
    highYieldPoints: ['Hanging mark = Oblique, inverted V, non-continuous, above thyroid cartilage.', 'Strangulation mark = Horizontal, continuous, below thyroid cartilage.', 'Diatom test in femur bone marrow proves antemortem drowning.', 'Washerwoman\'s skin = Epidermal wrinkling from water immersion.', 'Parchmentization = Hardened yellow-brown floor of hanging mark.', 'Amussat\'s sign = Intimal tear of carotid artery in hanging.'],
    previousExamQuestions: [{ question: 'Discuss Mechanical Asphyxia: Differentiate Hanging and Ligature Strangulation. Detail Drowning mechanism and Diatom test.', year: '2023', marks: 10 }],
    vivaQuestions: [{ id: 1, question: 'What is the Diatom Test and why is bone marrow used?', answer: 'Detection of microscopic algae in closed bone marrow (femur); proves living heart pumped drowning water with diatoms from lungs into bone marrow.', clinicalPearl: 'Gold standard test for antemortem drowning.' }],
    shortNotes: [{ title: 'Diatom Test', answer: 'Forensic test detecting diatoms in closed bone marrow to confirm antemortem drowning.' }],
    longQuestions: [{ title: 'Discuss Mechanical Asphyxia.', outline: ['Classification of asphyxial deaths', 'Hanging vs Ligature strangulation differential', 'Drowning mechanisms and autopsy findings', 'Diatom test execution and validity'] }],
    mcqs: [{ id: 1, question: 'A horizontal, continuous ligature mark located below the thyroid cartilage is characteristic of:', options: ['Suicidal Hanging', 'Ligature Strangulation', 'Smothering', 'Choking'], correctIndex: 1, explanation: 'Ligature strangulation produces a horizontal continuous mark below the thyroid cartilage.' }],
    caseBasedQuestions: [{ id: 1, title: 'Drowning Body Autopsy', scenario: 'Corpse recovered from river with fine persistent froth at mouth and diatoms in femur bone marrow.', questions: ['Cause of death? Key test?'], solution: 'Antemortem Drowning; Diatom Test in bone marrow.', legalSections: ['Mechanical Asphyxia'] }],
    summary: 'Chapter 17 covers asphyxia pathophysiology, hanging (inverted V, non-continuous, above thyroid), strangulation (horizontal, continuous, below thyroid), suffocation, and drowning (froth, diatom test in femur).',
    revisionSheet: ['Hanging = Inverted V, non-continuous, high neck.', 'Strangulation = Horizontal, continuous, low neck.', 'Drowning = Froth + Femur Diatom test.'],
    flashcards: [{ id: 1, front: 'Where must diatoms be detected at autopsy to confirm antemortem drowning?', back: 'Inside intact closed bone marrow (e.g. Femur).', category: 'Mechanical Asphyxia' }]
  }
];
