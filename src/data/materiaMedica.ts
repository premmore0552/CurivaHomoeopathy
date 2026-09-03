export interface RemedyDetail {
  id: string;
  name: string;
  commonName: string;
  family: string;
  imageUrl?: string;
  dosage?: string;
  keynotes: string[];
  mind: string[];
  physical: string[];
  modalities: {
    better: string[];
    worse: string[];
  };
}

export const materiaMedicaData: RemedyDetail[] = [
  {
    id: "aconite",
    name: "Aconitum Napellus",
    commonName: "Monkshood",
    family: "Ranunculaceae",
    imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&q=80&w=800",
    dosage: "Acute cases: 30C or 200C every 1-2 hours. Chronic: 6CH daily.",
    keynotes: [
      "Sudden and violent onset of symptoms",
      "Great fear and anxiety, especially fear of death",
      "Physical and mental restlessness; cannot remain still",
      "Intense thirst for large quantities of cold water",
      "Dry, hot skin with little or no sweat",
      "Pains are intolerable and driving the patient crazy"
    ],
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
    modalities: {
      better: ["Open air", "Sweating"],
      worse: ["Evening and night", "Warm room", "Rising from bed", "Lying on affected side", "Dry, cold winds"]
    }
  },
  {
    id: "arnica",
    name: "Arnica Montana",
    commonName: "Leopard's Bane",
    family: "Compositae",
    imageUrl: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800",
    dosage: "External: Tincture for injuries. Internal: 30C or 200C after trauma.",
    keynotes: [
      "Sore, lame, bruised feeling all over the body, as if beaten",
      "Fear of being touched or even approached due to soreness",
      "Head hot, body and extremities cool",
      "Results of mechanical trauma, even old injuries years later",
      "Answers questions correctly while unconscious and then drifts back into stupor",
      "Ecchymosis (blue-black discoloration) from blood accumulation under tissues"
    ],
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
    modalities: {
      better: ["Rest", "Lying down with head low", "Motion (gentle)"],
      worse: ["Least touch", "Motion", "Pressure", "Handling", "Damp cold"]
    }
  },
  {
    id: "arsenicum-album",
    name: "Arsenicum Album",
    commonName: "White Oxide of Arsenic",
    family: "Mineral",
    imageUrl: "https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800",
    dosage: "Low potencies (3X-6X) for metabolic issues. High potencies (200C+) for mental symptoms.",
    keynotes: [
      "Great restlessness; changes place continually despite extreme weakness",
      "Burning pains relieved by heat and warm applications",
      "Extreme prostration out of proportion to the disease",
      "Fear of death and anxiety about health; believes recovery is impossible",
      "Thirst for small quantities of water frequently ('sip frequently')",
      "Fastidious; wants everything in its place and organized"
    ],
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
    modalities: {
      better: ["Heat", "Hot drinks", "Hot applications", "Warm room", "Company"],
      worse: ["After midnight (1-3 AM)", "Cold air", "Cold food and drinks", "Wet weather", "Being alone"]
    }
  },
  {
    id: "belladonna",
    name: "Belladonna",
    commonName: "Deadly Nightshade",
    family: "Solanaceae",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800",
    dosage: "Acute high fever: 200C frequently. Children: 30C.",
    keynotes: [
      "Sudden and violent onset of symptoms",
      "Intense congestion with red face, hot head, and throbbing carotids",
      "Burning heat that radiates and can be felt by the examiner",
      "Violent throbbing in the head, carotids, and inflamed parts",
      "Widely dilated pupils and bright red, staring eyes",
      "Marked dryness of mouth, tongue, and throat"
    ],
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
    modalities: {
      better: ["Warmth", "Wrapping the head", "Rest", "Semi-erect position"],
      worse: ["Light", "Noise", "Motion", "Jar", "Touch", "Cold", "Draft of air"]
    }
  },
  {
    id: "bryonia",
    name: "Bryonia Alba",
    commonName: "White Bryony",
    family: "Cucurbitaceae",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf914b9c1d?auto=format&fit=crop&q=80&w=800",
    dosage: "30C to 200C. Repeat less frequently as improvement sets in.",
    keynotes: [
      "Extreme dryness of all mucous membranes (lips, mouth, throat, stool)",
      "Sharp stitching pains, especially in the chest and joints",
      "Aggravation from the slightest motion; wants to lie perfectly still",
      "Better from absolute rest and pressure (lying on the painful side)",
      "Great thirst for large quantities of cold water at long intervals"
    ],
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
    modalities: {
      better: ["Absolute rest", "Pressure", "Lying on painful side", "Cool air"],
      worse: ["Motion", "Touch", "Deep breathing", "Morning", "Heat"]
    }
  },
  {
    id: "calc-carb",
    name: "Calcarea Carbonica",
    commonName: "Oyster Shell",
    family: "Animal (Calcium)",
    imageUrl: "https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Profuse head perspiration, especially during sleep (soaks the pillow)",
      "Fat, fair, and flabby constitution with soft muscles",
      "Delayed milestones in children (walking, teething, closure of fontanelles)",
      "Extreme chilliness; sensitive to cold and damp weather",
      "Strong craving for eggs and indigestible things like chalk or pencils",
      "Easy fatigue from slight exertion like climbing stairs"
    ],
    mind: [
      "Anxiety about health, future, and financial matters",
      "Fear of heights, insanity, and misfortune",
      "Slow comprehension; forgetful and easily discouraged"
    ],
    physical: [
      "Large head with fontanelles remaining open too long; pot-bellied abdomen",
      "Enlarged glands (tonsils, adenoids, cervical glands)",
      "Bones are weak; rickets and curvature of bones",
      "Ravenous hunger but weak digestion; excessive gas",
      "Early and profuse menstruation; chronic leucorrhoea"
    ],
    modalities: {
      better: ["Dry weather", "Warm clothing", "Rest"],
      worse: ["Cold and damp", "Exertion", "Climbing stairs", "Mental work"]
    }
  },
  {
    id: "pulsatilla",
    name: "Pulsatilla Nigricans",
    commonName: "Wind Flower",
    family: "Ranunculaceae",
    imageUrl: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Mild, yielding, and tearful disposition",
      "Changeable symptoms",
      "Thirstlessness with all complaints",
      "Better in open air"
    ],
    mind: [
      "Wants company and consolation",
      "Easily discouraged",
      "Mood shifts quickly"
    ],
    physical: [
      "Thick, yellowish-green, bland discharges",
      "Chilly but symptoms better in fresh air",
      "Menses delayed and scanty"
    ],
    modalities: {
      better: ["Open air", "Cold applications", "Motion", "Consolation"],
      worse: ["Warm room", "Heat", "Rich/fatty foods", "Evening"]
    }
  },
  {
    id: "lycopodium",
    name: "Lycopodium Clavatum",
    commonName: "Club Moss",
    family: "Lycopodiaceae",
    imageUrl: "https://images.unsplash.com/photo-1596708051759-994df558d94e?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Right-sided symptoms shifting to left",
      "Anticipatory anxiety but does well once started",
      "Worse 4 PM to 8 PM",
      "Complaints of liver and digestion"
    ],
    mind: [
      "Lack of self-confidence",
      "Irritable when waking",
      "Aversion to new things"
    ],
    physical: [
      "Bloating and flatulence shortly after eating",
      "One foot hot, the other cold",
      "Prematurely aged appearance"
    ],
    modalities: {
      better: ["Warm drinks", "Being in company", "Motion"],
      worse: ["4 PM to 8 PM", "Warm room", "Waking up", "Eating to satiety"]
    }
  },
  {
    id: "nux-vomica",
    name: "Nux Vomica",
    commonName: "Poison Nut",
    family: "Loganiaceae",
    imageUrl: "https://images.unsplash.com/photo-1512429234300-1c00bed204c3?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Sedentary habits and modern stressed life",
      "Hypersensitive to all stimuli",
      "Ineffectual urgings",
      "Chilly and worse from cold"
    ],
    mind: [
      "Very irritable and angry",
      "Ambitious and impatient",
      "Fault-finding"
    ],
    physical: [
      "Sensation of weight in stomach after eating",
      "Constant desire to pass stool with no result",
      "Stiff neck and backache"
    ],
    modalities: {
      better: ["Napping", "Damp air", "Rest"],
      worse: ["Morning", "After eating", "Touch", "Cold air", "Stimulants"]
    }
  },
  {
    id: "sulphur",
    name: "Sulphur",
    commonName: "Brimstone",
    family: "Mineral",
    imageUrl: "https://images.unsplash.com/photo-1616422340578-83141f17387d?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "The 'Ragged Philosopher'",
      "Burning sensations everywhere (feet, vertex)",
      "Dirty, unwashed appearance with aversion to bathing",
      "Worse standing"
    ],
    mind: [
      "Self-centered and egoistic",
      "Delusions of wealth and beauty",
      "Lazy and avoids work"
    ],
    physical: [
      "Redness of all orifices",
      "Morning diarrhea driving out of bed",
      "Skin eruptions with intense itching"
    ],
    modalities: {
      better: ["Dry, warm weather", "Lying on right side"],
      worse: ["Standing", "Warmth of bed", "Bathing", "11 AM"]
    }
  },
  {
    id: "apis",
    name: "Apis Mellifica",
    commonName: "Honey Bee",
    family: "Animal",
    keynotes: [
      "Stinging and burning pains (like a bee sting)",
      "Edematous swelling; puffy, waxy appearance with bag-like swelling under lower eyelids",
      "Thirstlessness is a key indicator, especially during fevers and dropsy",
      "Intolerance of heat and close, warm rooms",
      "Extreme sensitivity to touch; cannot tolerate pressure"
    ],
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
    modalities: {
      better: ["Cold air", "Cold water", "Uncovering", "Open air", "Cold applications"],
      worse: ["Heat", "Touch", "Pressure", "After sleep", "Warm room", "Afternoon (3 PM)"]
    }
  },
  {
    id: "gelsemium",
    name: "Gelsemium Sempervirens",
    commonName: "Yellow Jasmine",
    family: "Loganiaceae",
    imageUrl: "https://images.unsplash.com/photo-1597423376300-344464c23e3e?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "General prostration and lethargy (3Ds: Drowsy, Dull, Dizzy)",
      "Trembling from weakness or fear",
      "Heaviness of eyelids",
      "Lack of thirst"
    ],
    mind: [
      "Stage fright and anticipatory anxiety",
      "Desire to be quiet and alone",
      "Fears heart will stop if not moving"
    ],
    physical: [
      "Headache better by profuse urination",
      "Malarial-like fevers",
      "Aching in limbs and back"
    ],
    modalities: {
      better: ["Profuse urination", "Motion", "Open air"],
      worse: ["Damp weather", "Fog", "Spring", "Bad news", "Emotion"]
    }
  },
  {
    id: "lachesis",
    name: "Lachesis Mutus",
    commonName: "Surukuku Snake Venum",
    family: "Animal (Reptile)",
    imageUrl: "https://images.unsplash.com/photo-1531386151447-ad762e755d67?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Left-sided shifting to right",
      "Intolerance of anything tight around neck/waist",
      "Worse after sleep",
      "Blueish/purple discoloration of parts"
    ],
    mind: [
      "Loquacity; speaks rapidly, jumping from theme to theme",
      "Suspicious and jealous",
      "Fears being poisoned"
    ],
    physical: [
      "Hot flashes during menopause",
      "Hemorrhagic tendency; dark, non-clotting blood",
      "Aversion to touch on sensitive spots"
    ],
    modalities: {
      better: ["Discharges", "Warm applications", "Open air"],
      worse: ["After sleep", "Left side", "Hot drinks", "Closing eyes"]
    }
  },
  {
    id: "mercurius",
    name: "Mercurius Solubilis",
    commonName: "Quicksilver",
    family: "Mineral",
    keynotes: [
      "Profuse, offensive, oily sweat that does not relieve",
      "Excessive salivation at night",
      "Intense thirst for cold water",
      "Creeping chilliness in the evening"
    ],
    mind: [
      "Hurried and impulsive",
      "Memory weak",
      "Suspicious and distrustful"
    ],
    physical: [
      "Gingivitis and stomatitis with indented tongue",
      "Ulcerations with base like lard",
      "Bone pains worse at night"
    ],
    modalities: {
      better: ["Moderate temperature", "Rest"],
      worse: ["Night", "Damp builds", "Lying on right side", "Extreme heat or cold"]
    }
  },
  {
    id: "nat-mur",
    name: "Natrum Muriaticum",
    commonName: "Common Salt",
    family: "Mineral",
    imageUrl: "https://images.unsplash.com/photo-1626015334707-164746654e96?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Ailments from grief or disappointment",
      "Consolation aggravates",
      "Craving for salt",
      "Headache like 'thousand little hammers'"
    ],
    mind: [
      "Dwelling on past unpleasant events",
      "Awkward; drops things or laughs at serious things",
      "Deeply romantic but reserved"
    ],
    physical: [
      "Map-tongue with red patches",
      "Dry, cracked lips (middle of lower lip)",
      "Hangnails and weak nails"
    ],
    modalities: {
      better: ["Open air", "Cold bathing", "Going without regular meals"],
      worse: ["10 AM to 11 AM", "Sun", "Sea air", "Consolation", "Mental exertion"]
    }
  },
  {
    id: "phosphorus",
    name: "Phosphorus",
    commonName: "Phosphorus",
    family: "Mineral",
    imageUrl: "https://images.unsplash.com/photo-1614726365920-56b0b2e88a6d?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Tall, slender, fair persons of nervous temperament",
      "Hemorrhagic diathesis; bright red blood",
      "Burning pains in small spots",
      "Better from cold food/drinks"
    ],
    mind: [
      "Fear of being alone, of thunder, of dark",
      "Sympathetic and communicative",
      "Clairvoyant and intuitive"
    ],
    physical: [
      "Hoarseness worse in the evening",
      "Regurgitation of food as soon as it becomes warm in stomach",
      "Fatty degeneration of organs"
    ],
    modalities: {
      better: ["Cold food/drinks", "Sleep", "Rubbing", "Lying on right side"],
      worse: ["Lying on left side", "Evening", "Thunderstorms", "Twilight"]
    }
  },
  {
    id: "rhus-tox",
    name: "Rhus Toxicodendron",
    commonName: "Poison Ivy",
    family: "Anacardiaceae",
    imageUrl: "https://images.unsplash.com/photo-1615485242273-041a99534608?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Worse first motion, better continued motion",
      "Restlessness; must move to find relief",
      "Rusty nail/bone-breaking pains",
      "Craving for cold milk"
    ],
    mind: [
      "Extreme restlessness at night",
      "Fear of being poisoned",
      "Anxious and melancholy"
    ],
    physical: [
      "Vesicular eruptions with red base",
      "Stiffness of joints better by warmth",
      "Triangle red tip on tongue"
    ],
    modalities: {
      better: ["Continued motion", "Warmth", "Dry weather", "Wrapping up"],
      worse: ["First motion", "Rest", "Cold, damp weather", "Drenching", "Night"]
    }
  },
  {
    id: "sepia",
    name: "Sepia Officinalis",
    commonName: "Cuttle Fish Ink",
    family: "Animal (Mollusk)",
    imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Indifference to loved ones",
      "Bearing down sensation as if everything would escape",
      "Yellowish 'saddle' across nose and cheeks",
      "Better from vigorous exercise"
    ],
    mind: [
      "Irritable and easily offended",
      "Wants to be alone and quiet",
      "Sadness and weeping"
    ],
    physical: [
      "Empty, sinking feeling in epigastrium",
      "Irregular menses and leucorrhea",
      "Hot flashes during menopause"
    ],
    modalities: {
      better: ["Vigorous exercise", "Warmth of bed", "Drawing legs up"],
      worse: ["Laundry work", "Pregnancy", "Cold air", "Sexual excess", "Morning and Evening"]
    }
  },
  {
    id: "silicea",
    name: "Silicea Terra",
    commonName: "Silica",
    family: "Mineral",
    imageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Lack of vital heat; chilled easily",
      "Worse from cold; better by wrapping head warmly",
      "Offensive, acrid foot sweat (eats through socks)",
      "Yielding but obstinate character"
    ],
    mind: [
      "Dread of undertaking new things; 'fixed ideas'",
      "Faint-hearted and anxious",
      "Sensitive to noise and light"
    ],
    physical: [
      "Every little injury suppurates",
      "Constipation; 'bashful stool'",
      "Deficient assimilation and nutrition"
    ],
    modalities: {
      better: ["Warmth", "Wrapping up head", "Summer"],
      worse: ["Cold", "New moon", "Damp", "During menses"]
    }
  },
  {
    id: "thuja",
    name: "Thuja Occidentalis",
    commonName: "Arbor Vitae",
    family: "Coniferae",
    imageUrl: "https://images.unsplash.com/photo-1603912663489-6033878b1d9c?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "The 'Sycotic' king",
      "Warts, condylomata, and sycotic excrescences",
      "Fixed ideas (strange person by side)",
      "Ailments from vaccination"
    ],
    mind: [
      "Feels as if body/limbs are made of glass and will break",
      "Music causes weeping and trembling",
      "Hurried and anxious"
    ],
    physical: [
      "Sweat on uncovered parts only (or only head)",
      "Stool recedes after being partly expelled",
      "Splitting/splitting sensation in parts"
    ],
    modalities: {
      better: ["Warmth", "Wrapping up", "Lying on left side"],
      worse: ["3 AM and 3 PM", "Damp air", "Cold water", "Tea", "Onions"]
    }
  },
  {
    id: "agaricus",
    name: "Agaricus Muscarius",
    commonName: "Bug Agaric",
    family: "Fungi",
    keynotes: [
      "Twitching and jerking of muscles",
      "Sensation as if pierced by ice-cold needles",
      "Chilblains with intense itching",
      "Sensitive to cold air"
    ],
    mind: [
      "Talkative and excitable",
      "Delirium with great strength",
      "Indifference to surroundings"
    ],
    physical: [
      "Twitching of eyelids and facial muscles",
      "Spinal irritation; tenderness on pressure",
      "Redness and burning of ears/nose as if frozen"
    ],
    modalities: {
      better: ["Moving slowly", "Warmth"],
      worse: ["Cold air", "After eating", "After coitus", "Before a storm"]
    }
  },
  {
    id: "allium-cepa",
    name: "Allium Cepa",
    commonName: "Red Onion",
    family: "Liliaceae",
    keynotes: [
      "Acrid, watery nasal discharge that excoriates the nose and upper lip",
      "Bland lacrimation (tears flow freely but do not burn)",
      "Violent sneezing, especially on entering a warm room",
      "Neuralgic pains like a long thread, running in a straight line",
      "Strong craving for raw onions"
    ],
    mind: [
      "Very sleepy; fear that the pain will become unbearable",
      "Symptoms often travel from left to right"
    ],
    physical: [
      "Nasal discharge burns the upper lip; violent sneezing",
      "Eyes red and watering; burning, biting, or smarting sensation",
      "Violent laryngitis: cough as if it would tear the larynx; grabs throat while coughing",
      "Thread-like neuralgic pains, often after trauma or amputation"
    ],
    modalities: {
      better: ["Open air", "Cold room"],
      worse: ["Warm room", "Evening", "Wet feet", "North-west wind"]
    }
  },
  {
    id: "aloe",
    name: "Aloe Socotrina",
    commonName: "Socotrine Aloe",
    family: "Liliaceae",
    keynotes: [
      "Insecurity of rectum: weak sphincter and loss of control",
      "Jelly-like mucus from all mucous membranes",
      "Blue grape-like hemorrhoids, swollen, bleeding, and sore",
      "Diarrhoea early in the morning on getting out of bed",
      "Diarrhoea alternating with constipation"
    ],
    mind: [
      "Dissatisfied and irritable, especially during constipation",
      "Angry with self and because of complaints",
      "Indolent and sedentary individuals"
    ],
    physical: [
      "Involuntary solid stool may escape; lack of rectal sensation",
      "Abdominal rumbling and gas before stool",
      "Cutting and griping pains during stool followed by prostration",
      "Hemorrhoids tender and burning; bearing-down pain in rectum"
    ],
    modalities: {
      better: ["Cold applications", "Cold weather", "Open air"],
      worse: ["Heat", "Warm weather", "After eating", "Standing"]
    }
  },
  {
    id: "ant-crud",
    name: "Antimonium Crudum",
    commonName: "Black Sulphuret of Antimony",
    family: "Mineral",
    keynotes: [
      "Thick, milky white coating on tongue",
      "Sentimental mood in moonlight",
      "Child cannot bear to be touched or looked at",
      "Worse from cold bathing"
    ],
    mind: [
      "Cross and contradictory",
      "Desire to commit suicide by drowning"
    ],
    physical: [
      "Cracks in corners of mouth and nose",
      "Horny warts on hands and soles",
      "Indigestion from overloading stomach"
    ],
    modalities: {
      better: ["Open air", "Rest"],
      worse: ["Cold bathing", "Heat of sun", "Acids", "Wine", "Night"]
    }
  },
  {
    id: "ant-tart",
    name: "Antimonium Tartaricum",
    commonName: "Tartar Emetic",
    family: "Mineral",
    keynotes: [
      "Great rattling of mucus in chest with little expectoration",
      "Drowsiness, debility, and sweat",
      "Nausea as if from some deep-seated trouble",
      "Tongue coated white with red edges"
    ],
    mind: [
      "Despondent; fears being alone",
      "Child wants to be carried"
    ],
    physical: [
      "Pustular eruptions like smallpox",
      "Difficult breathing; must sit up",
      "Cold, clammy sweat"
    ],
    modalities: {
      better: ["Sitting erect", "Expectoration", "Lying on right side"],
      worse: ["Evening", "Warmth", "Damp builds", "Spring"]
    }
  },
  {
    id: "baptisia",
    name: "Baptisia Tinctoria",
    commonName: "Wild Indigo",
    family: "Leguminosae",
    keynotes: [
      "Besotted expression with dusky red face",
      "Discharges are putrid and offensive",
      "Feels as if body is in pieces and trying to get them together",
      "Great prostration with bruised feeling"
    ],
    mind: [
      "Stupor; falls asleep while being spoken to",
      "Confusion of ideas"
    ],
    physical: [
      "Typhoid-like states",
      "Painless sore throat but very offensive",
      "Soreness of all muscles"
    ],
    modalities: {
      better: ["Open air", "Drinking cold water"],
      worse: ["Humid heat", "Fog", "Closed room"]
    }
  },
  {
    id: "baryta-carb",
    name: "Baryta Carbonica",
    commonName: "Carbonate of Barium",
    family: "Mineral",
    keynotes: [
      "Arrested development (physical and mental)",
      "Swelling of glands, especially tonsils",
      "Dwarfish appearance",
      "Memory weak; forgets what he was about to say"
    ],
    mind: [
      "Childish behavior in old age",
      "Bashful; fears strangers",
      "Slow to learn"
    ],
    physical: [
      "Offensive foot sweat",
      "Chronic enlargement of tonsils",
      "Fatty tumors"
    ],
    modalities: {
      better: ["Walking in open air"],
      worse: ["Thinking of symptoms", "Cold", "Damp weather"]
    }
  },
  {
    id: "borax",
    name: "Borax Veneta",
    commonName: "Borate of Sodium",
    family: "Mineral",
    keynotes: [
      "Dread of downward motion",
      "Aphthae in mouth, very painful",
      "Sensitive to sudden noises",
      "White, starchy leucorrhea"
    ],
    mind: [
      "Anxious about trifles",
      "Irritable"
    ],
    physical: [
      "Hot mouth with ulcers",
      "Entropion; eyelashes turn inwards",
      "Skin heals with difficulty"
    ],
    modalities: {
      better: ["Pressure", "After 11 PM"],
      worse: ["Downward motion", "Sudden noise", "Fruit", "Warm weather"]
    }
  },
  {
    id: "cactus",
    name: "Cactus Grandiflorus",
    commonName: "Night-blooming Cereus",
    family: "Cactaceae",
    keynotes: [
      "Sensation as if an iron band is constricting the heart",
      "Hemorrhages with bright red blood",
      "Periodic neuralgic pains",
      "Worse lying on left side"
    ],
    mind: [
      "Fear of death",
      "Screams with pain"
    ],
    physical: [
      "Palpitations at night",
      "Angina pectoris",
      "Numbness of left arm"
    ],
    modalities: {
      better: ["Open air", "Rest"],
      worse: ["Lying on left side", "Walking", "Night", "Exertion"]
    }
  },
  {
    id: "cantharis",
    name: "Cantharis Vesicatoria",
    commonName: "Spanish Fly",
    family: "Animal",
    keynotes: [
      "Intolerable, constant urging to urinate",
      "Burning pains like fire",
      "Violent inflammation of mucous membranes",
      "Drinking water causes bladder pain"
    ],
    mind: [
      "High sexual desire (erotomania)",
      "Frenzy and delirium"
    ],
    physical: [
      "Scalding urine, passed drop by drop",
      "Vesicular burns with blebs",
      "Severe tenesmus of bladder"
    ],
    modalities: {
      better: ["Rubbing", "Warmth"],
      worse: ["Touch", "Urinating", "Drinking cold water", "Coffee"]
    }
  },
  {
    id: "carbo-veg",
    name: "Carbo Vegetabilis",
    commonName: "Vegetable Charcoal",
    family: "Vegetable",
    keynotes: [
      "The 'Corpse Reviver'; state of collapse",
      "Desire to be fanned constantly",
      "Great accumulation of gas in upper abdomen",
      "Air hunger; cold breath"
    ],
    mind: [
      "Sluggish and confused",
      "Indifferent to everything"
    ],
    physical: [
      "Blueish, cold skin",
      "Hemorrhages from any mucous surface",
      "Flatulence relieved by belching"
    ],
    modalities: {
      better: ["Eructations", "Being fanned", "Cold air"],
      worse: ["Evening", "Fatty food", "Warm damp weather"]
    }
  },
  {
    id: "causticum",
    name: "Causticum",
    commonName: "Tinctura acris sine Kali",
    family: "Mineral (Potash)",
    keynotes: [
      "Paralytic weakness of parts",
      "Intense sympathy for others' suffering",
      "Sensation of raw soreness in folds of skin",
      "Involuntary urination when coughing or sneezing"
    ],
    mind: [
      "Aversion to injustice",
      "Fearful at night",
      "Anxious and melancholy"
    ],
    physical: [
      "Warts on fingertips and nose",
      "Contracting of tendons",
      "Hoarseness worse in the morning"
    ],
    modalities: {
      better: ["Damp, wet weather", "Cold water"],
      worse: ["Dry, cold winds", "Clear fine weather", "Motion of carriage"]
    }
  },
  {
    id: "chamomilla",
    name: "Chamomilla",
    commonName: "German Chamomile",
    family: "Compositae",
    keynotes: [
      "Extremely irritable; oversensitive to pain",
      "One cheek red, the other pale",
      "Child wants to be carried and then wants something else",
      "Desire for cold water"
    ],
    mind: [
      "Cannot bear to be looked at or touched",
      "Angry and spiteful"
    ],
    physical: [
      "Diarrhea like chopped spinach; smells like rotten eggs",
      "Pains with numbness",
      "Worse from coffee and narcotics"
    ],
    modalities: {
      better: ["Being carried", "Mild weather"],
      worse: ["Anger", "Night", "Open air", "Wind"]
    }
  },
  {
    id: "digitalis",
    name: "Digitalis Purpurea",
    commonName: "Foxglove",
    family: "Scrophulariaceae",
    keynotes: [
      "Very slow, intermittent pulse",
      "Faintness and sinking at stomach",
      "Cyanosis; blueish tint of skin and lips",
      "Sudden sensation as if heart would stop"
    ],
    mind: [
      "Fear of death; anxious",
      "Dullness and concentration difficult"
    ],
    physical: [
      "Jaundice with white/clay-colored stools",
      "Urination difficult with burning",
      "Nausea even from smell of food"
    ],
    modalities: {
      better: ["Open air", "Empty stomach"],
      worse: ["Motion", "Sitting erect", "After eating", "Music"]
    }
  },
  {
    id: "drosera",
    name: "Drosera Rotundifolia",
    commonName: "Round-leafed Sundew",
    family: "Droseraceae",
    keynotes: [
      "Spasmodic, paroxysmal cough like whooping cough",
      "Cough so violent that it causes vomiting",
      "Sensation of a feather in larynx",
      "Worse as soon as head touches the pillow"
    ],
    mind: [
      "Restless and stubborn",
      "Anxious and depressed"
    ],
    physical: [
      "Hoarseness; deep and bass-like voice",
      "Nosebleed during cough",
      "Pains in joints as if dislocated"
    ],
    modalities: {
      better: ["Pressure", "Walking"],
      worse: ["After midnight", "Lying down", "Warmth", "Laughing", "Singing"]
    }
  },
  {
    id: "eupatorium",
    name: "Eupatorium Perfoliatum",
    commonName: "Boneset",
    family: "Compositae",
    keynotes: [
      "Deep bone-breaking pains",
      "Intense thirst for cold water before and during chill",
      "Vomiting of bile",
      "Worse 7 AM to 9 AM"
    ],
    mind: [
      "Sadness and apprehension"
    ],
    physical: [
      "Soreness of eyeballs",
      "Hoarseness in the morning",
      "Bruised feeling all over"
    ],
    modalities: {
      better: ["Conversation", "Getting on hands and knees"],
      worse: ["7 to 9 AM", "Periodic (third or fourth day)", "Motion"]
    }
  },
  {
    id: "ferrum-phos",
    name: "Ferrum Phosphoricum",
    commonName: "Phosphate of Iron",
    family: "Mineral",
    keynotes: [
      "First stage of all inflammatory conditions",
      "Pulse full, soft, and quick",
      "Red spots on cheeks with pale face",
      "Better from cold applications"
    ],
    mind: [
      "Talkative and excitable",
      "Vivid dreams"
    ],
    physical: [
      "Hemorrhages of bright red blood",
      "Short, painful tickling cough",
      "Rheumatic pains in right shoulder"
    ],
    modalities: {
      better: ["Cold applications", "Rest"],
      worse: ["Night (4-6 AM)", "Motion", "Touch"]
    }
  },
  {
    id: "graphites",
    name: "Graphites",
    commonName: "Black Lead",
    family: "Mineral",
    keynotes: [
      "Honey-like, sticky, thick/viscid discharges",
      "Fats, fair, and flabby with tendency to constipation",
      "Every little injury suppurates",
      "Worse from warmth of bed"
    ],
    mind: [
      "Sad and despondent; weeps from music",
      "Indecisive"
    ],
    physical: [
      "Eczema behind ears and in joints",
      "Nails thick, rough, and deformed",
      "Constipation; stools large and knotty"
    ],
    modalities: {
      better: ["Wrapping up", "Open air"],
      worse: ["Night", "Warmth", "During and after menses"]
    }
  },
  {
    id: "hepar-sulph",
    name: "Hepar Sulphuris Calcareum",
    commonName: "Calcium Sulphide",
    family: "Mineral/Animal",
    keynotes: [
      "Oversensitive to all impressions, especially cold air",
      "Pains are like a splinter or fishbone",
      "Tendency to easy suppuration",
      "Sweat is sour-smelling"
    ],
    mind: [
      "Extremely irritable and angry; impulse to set fire to things",
      "Hasty in speech and actions"
    ],
    physical: [
      "Croupy, rattling cough; worse from cold air",
      "Acne that is sensitive to touch",
      "Chronic ear infections"
    ],
    modalities: {
      better: ["Warmth in general", "Wrapping up head", "Damp weather"],
      worse: ["Dry, cold winds", "Least draught of air", "Touch", "Night"]
    }
  },
  {
    id: "hyoscyamus",
    name: "Hyoscyamus Niger",
    commonName: "Henbane",
    family: "Solanaceae",
    keynotes: [
      "Intense mania and delirium without high fever",
      "Desire to uncover self and go naked",
      "Suspiciousness and jealousy",
      "Dry, spasmodic cough worse at night when lying down"
    ],
    mind: [
      "Foolish laughter and singing",
      "Fear of being poisoned",
      "Talkative; jumping from one subject to another"
    ],
    physical: [
      "Twitching of muscles; subsultus tendinum",
      "Involuntary urination and stool",
      "Eyes red and sparkling"
    ],
    modalities: {
      better: ["Sitting up", "Warmth"],
      worse: ["Night", "Lying down", "After eating", "Emotional stress"]
    }
  },
  {
    id: "hypericum",
    name: "Hypericum Perforatum",
    commonName: "St. John's Wort",
    family: "Hypericaceae",
    keynotes: [
      "The 'Arnica of the nerves'",
      "Shooting, lancinating pains along nerves",
      "Injury to nerve-rich areas (fingertips, spine)",
      "Better from quiet and rest"
    ],
    mind: [
      "Brain-fag; consequences of fright",
      "Melancholy and nervous depression"
    ],
    physical: [
      "Punctured wounds",
      "Sensation of head being suddenly elongated",
      "Crawling in hands and feet"
    ],
    modalities: {
      better: ["Bending head backward"],
      worse: ["Cold", "Damp builds", "Fog", "Least motion"]
    }
  },
  {
    id: "ignatia",
    name: "Ignatia Amara",
    commonName: "St. Ignatius Bean",
    family: "Loganiaceae",
    keynotes: [
      "The remedy of paradoxes/contradictions",
      "Ailments from recent grief, fright, or worry",
      "Frequent sighing and sobbing",
      "Sensation of a lump in throat (globus hystericus)"
    ],
    mind: [
      "Changeable mood; silent grief",
      "Intolerant of contradiction",
      "Mental strain from long-continued suppressed grief"
    ],
    physical: [
      "Twitching of facial muscles",
      "Headache relieved by profuse urination",
      "Empty, sinking feeling in pit of stomach, not relieved by eating"
    ],
    modalities: {
      better: ["Eating", "Change of position", "Warmth"],
      worse: ["Morning", "Open air", "After meals", "Coffee", "Smoking"]
    }
  },
  {
    id: "ipecac",
    name: "Ipecacuanha",
    commonName: "Ipecac-root",
    family: "Rubiaceae",
    keynotes: [
      "Persistent nausea not relieved by vomiting",
      "Clean tongue despite gastric symptoms",
      "Hemorrhages of bright red blood",
      "Spasmodic cough with rattling in chest"
    ],
    mind: [
      "Irritable; desires things but rejects them when offered",
      "Full of desires"
    ],
    physical: [
      "Uterine hemorrhage with nausea",
      "Nosebleed",
      "Sudden, prostrating diarrhea"
    ],
    modalities: {
      better: ["Rest", "Open air"],
      worse: ["Warm, moist wind", "Veal", "Pork", "Periodically"]
    }
  },
  {
    id: "kali-bich",
    name: "Kali Bichromicum",
    commonName: "Bichromate of Potash",
    family: "Mineral",
    keynotes: [
      "Tough, ropy, stringy discharges",
      "Pain in small, circumscribed spots that can be covered by a thumb",
      "Ulcerations with 'punched-out' edges",
      "Wandering pains shifting from one place to another"
    ],
    mind: [
      "Ill-humored; low-spirited"
    ],
    physical: [
      "Hard, elastic plugs (clinkers) in nose",
      "Yellow, thick, ropy phlegm",
      "Gastritis; better after eating"
    ],
    modalities: {
      better: ["Heat", "Eating"],
      worse: ["Morning (2-3 AM)", "Cold", "Uncovering", "Beer"]
    }
  },
  {
    id: "kali-carb",
    name: "Kali Carbonicum",
    commonName: "Carbonate of Potassium",
    family: "Mineral",
    keynotes: [
      "Worse 3 AM to 4 AM",
      "Stitching pains",
      "Puffiness between eyebrows and upper eyelids",
      "Oversensitive to touch, noise, and startles easily"
    ],
    mind: [
      "Fears of being alone, of death",
      "Irritable and duty-bound"
    ],
    physical: [
      "Backache; back feels like it will break",
      "Chronic cough with stitching pains",
      "Sensation of empty stomach better after soup"
    ],
    modalities: {
      better: ["Warm weather", "During day", "Moving about"],
      worse: ["3 AM", "Cold", "Damp weather", "Lying on painful side"]
    }
  },
  {
    id: "kreosotum",
    name: "Kreosotum",
    commonName: "Beech-wood Creosote",
    family: "Vegetable",
    keynotes: [
      "Excoriating, acrid, offensive discharges",
      "Premature decay of teeth",
      "Rapid decomposition of fluids",
      "Itching so intense it causes burning"
    ],
    mind: [
      "Restless; music causes weeping",
      "Irritable and peevish"
    ],
    physical: [
      "Offensive leucorrhea; smells like green corn",
      "Vomiting of undigested food hours after eating",
      "Small wounds bleed profusely"
    ],
    modalities: {
      better: ["Warmth", "Hot drinks"],
      worse: ["Open air", "Cold", "Rest", "After menses"]
    }
  },
  {
    id: "ledum",
    name: "Ledum Palustre",
    commonName: "Marsh Tea",
    family: "Ericaceae",
    keynotes: [
      "Punctured wounds (step on nail, insect stings)",
      "Affected parts feel cold to touch but relieved by cold water",
      "Ascending rheumatism (starts in feet and moves up)",
      "Lack of vital heat"
    ],
    mind: [
      "Desire for solitude",
      "Morose and cross"
    ],
    physical: [
      "Black-and-blue spots after injury",
      "Eyeball feels bruised",
      "Intense itching of feet and ankles"
    ],
    modalities: {
      better: ["Cold applications", "Putting feet in ice-cold water"],
      worse: ["Heat of bed", "Covering", "Motion", "Night"]
    }
  },
  {
    id: "mag-phos",
    name: "Magnesia Phosphorica",
    commonName: "Phosphate of Magnesia",
    family: "Mineral",
    keynotes: [
      "The 'Homoeopathic Aspirin'",
      "Cramping, neuralgic pains relieved by warmth and pressure",
      "Lightning-like pains",
      "Right-sided symptoms"
    ],
    mind: [
      "Languid and tired",
      "Forgetful"
    ],
    physical: [
      "Menstrual cramps relieved by hot water bottle",
      "Colic better by doubling up",
      "Neuralgia of face"
    ],
    modalities: {
      better: ["Heat", "Pressure", "Doubling up"],
      worse: ["Cold", "Draft of air", "Uncovering", "Touch", "Right side"]
    }
  },
  {
    id: "medorrhinum",
    name: "Medorrhinum",
    commonName: "Gono-toxin",
    family: "Nosode",
    keynotes: [
      "Intense burning in soles and palms",
      "Great haste; everything must be done in a hurry",
      "Craving for ice-cold water and fats",
      "Always better at the seaside"
    ],
    mind: [
      "Weak memory; loses the thread of conversation",
      "Fears he will go insane",
      "Time passes too slowly"
    ],
    physical: [
      "Must dangle feet out of bed",
      "Chronic pelvic inflammation",
      "Stiffness of joints better by motion"
    ],
    modalities: {
      better: ["Seaside", "Damp weather", "Lying on stomach"],
      worse: ["Daylight to sunset", "Thinking of symptoms", "Heat"]
    }
  },
  {
    id: "phos-acid",
    name: "Phosphoricum Acidum",
    commonName: "Phosphoric Acid",
    family: "Mineral",
    keynotes: [
      "Mental and physical debility from grief or loss of fluids",
      "Indifference to all things",
      "Painless, watery diarrhea that does not weaken",
      "Craving for juicy, refreshing things"
    ],
    mind: [
      "Apathetic; answers slowly or not at all",
      "Homesickness",
      "Weakness of memory"
    ],
    physical: [
      "Growing pains in children",
      "Milky urine",
      "Falling out of hair"
    ],
    modalities: {
      better: ["Short sleep", "Warmth"],
      worse: ["Mental exertion", "Loss of fluids", "Grief", "Cold draughts"]
    }
  },
  {
    id: "phytolacca",
    name: "Phytolacca Decandra",
    commonName: "Poke-root",
    family: "Phytolaccaceae",
    keynotes: [
      "Glandular remedy, especially for breasts and tonsils",
      "Pains like electric shocks",
      "Tonsillitis with dark red throat and pain shooting to ears",
      "Mastitis with stony hard breasts"
    ],
    mind: [
      "Indifference to life",
      "Loss of delicacy; shamelessness"
    ],
    physical: [
      "Sensation of a hot ball in throat",
      "Difficult swallowing",
      "Aching all over as if bruised"
    ],
    modalities: {
      better: ["Lying on left side", "Rest"],
      worse: ["Wet weather", "Damp", "Night", "Motion", "Right side"]
    }
  },
  {
    id: "psorinum",
    name: "Psorinum",
    commonName: "Scabies Vesicle",
    family: "Nosode",
    keynotes: [
      "Extremely chilly; wears fur cap even in summer",
      "All discharges are horribly offensive (carrion-like)",
      "Pessimism and despair of recovery",
      "Great hunger; must get up at night to eat"
    ],
    mind: [
      "Hopeless; religious melancholy",
      "Suicidal thoughts"
    ],
    physical: [
      "Skin is dirty and greasy with intense itching",
      "Eruptions in folds of skin",
      "Better by being wrapped up warmly"
    ],
    modalities: {
      better: ["Warmth", "Wrapping up", "In summer"],
      worse: ["Cold", "Coffee", "During or after a storm"]
    }
  },
  {
    id: "staphysagria",
    name: "Staphysagria",
    commonName: "Stavesacre",
    family: "Ranunculaceae",
    keynotes: [
      "Ailments from indignation, suppressed anger, or insult",
      "Honeymoon cystitis",
      "Teeth turn black and crumble",
      "Sensation of a drop of urine rolling along urethra"
    ],
    mind: [
      "Hypersensitive to what others say",
      "Low self-esteem",
      "Sudden outbursts of anger"
    ],
    physical: [
      "Styes on eyelids; one after another",
      "Sharp, clean cuts (surgical wounds)",
      "Crusty eruptions on scalp"
    ],
    modalities: {
      better: ["Warmth", "Rest", "Breakfast"],
      worse: ["Indignation", "Grief", "Touch", "Onanism", "Tobacco"]
    }
  },
  {
    id: "spigelia",
    name: "Spigelia",
    commonName: "Pinkroot",
    family: "Loganiaceae",
    keynotes: [
      "Neuralgia of the fifth nerve (trigeminal)",
      "Intolerable heart pains; visible pulsations",
      "Worse from least motion or touch",
      "Avoids looking at pointed objects"
    ],
    mind: [
      "Afraid of sharp, pointed objects (needles, pins)",
      "Anxious and restless"
    ],
    physical: [
      "Ciliary neuralgia; eyeball feels too large",
      "Palpitations; can hear the heart beating",
      "Worms; itching of anus"
    ],
    modalities: {
      better: ["Lying on right side with head high"],
      worse: ["Least motion", "Touch", "Tobacco", "Periodically (sunrise to sunset)"]
    }
  },
  {
    id: "spongia",
    name: "Spongia Tosta",
    commonName: "Roasted Sponge",
    family: "Animal",
    keynotes: [
      "Cough dry, barking, and croupy; sounds like a saw driven through a fir board",
      "Hoarseness with great dryness of larynx",
      "Worse after sleep, better from eating or drinking warm things",
      "Anxiety and gasping for breath"
    ],
    mind: [
      "Fear of death",
      "Irritable"
    ],
    physical: [
      "Goitre; swelling of thyroid",
      "Exophthalmic heart symptoms",
      "Croup better after eating"
    ],
    modalities: {
      better: ["Eating", "Warm drinks", "Descending"],
      worse: ["After sleep", "Lying with head low", "Cold dry winds", "Before midnight"]
    }
  },
  {
    id: "stannum",
    name: "Stannum Metallicum",
    commonName: "Tin",
    family: "Metal",
    keynotes: [
      "Great weakness in chest; feels as if it were hollow",
      "Pains increase and decrease slowly",
      "Better by pressure and by coughing",
      "Sweetish expectoration"
    ],
    mind: [
      "Sadness and weeping; hates to talk",
      "Restless and anxious"
    ],
    physical: [
      "Phthisis; chronic bronchitis",
      "Neuralgia of face; better from pressure",
      "Prolapsus uteri during hard stool"
    ],
    modalities: {
      better: ["Firm pressure", "Lying on stomach", "Coughing"],
      worse: ["Using voice", "Laughing", "Singing", "Moving", "Lying on right side"]
    }
  },
  {
    id: "stramonium",
    name: "Stramonium",
    commonName: "Thorn Apple",
    family: "Solanaceae",
    keynotes: [
      "Violent mania; desire to bite and strike",
      "Terrified by darkness and being alone",
      "Sight of water or bright objects causes spasms",
      "Painless condition in otherwise painful diseases"
    ],
    mind: [
      "Talkative and screaming",
      "Hallucinations; sees ghosts and animals",
      "Fears the dark"
    ],
    physical: [
      "Twitching of facial muscles",
      "Suppression of urine",
      "Dilated pupils"
    ],
    modalities: {
      better: ["Light", "Company", "Warmth"],
      worse: ["Darkness", "After sleep", "Being alone", "Bright objects"]
    }
  },
  {
    id: "symphytum",
    name: "Symphytum Officinale",
    commonName: "Knitbone",
    family: "Boraginaceae",
    keynotes: [
      "Arnica of the bones; promotes union of fractures",
      "Injury to the eyeball (blow from fist or cork)",
      "Pricking pains in periosteum",
      "Mechanical injuries to bones and joints"
    ],
    mind: [
      "Irritable"
    ],
    physical: [
      "Non-union of fractures",
      "Irritability of stump after amputation",
      "Aching in bones after wound is healed"
    ],
    modalities: {
      better: ["Rest"],
      worse: ["Touch", "Motion"]
    }
  },
  {
    id: "tabacum",
    name: "Tabacum",
    commonName: "Tobacco",
    family: "Solanaceae",
    keynotes: [
      "Deathly nausea and sickness; better in open air",
      "Icy coldness of surface with cold sweat",
      "Sea-sickness and morning sickness",
      "Body feels as if it were sinking into the bed"
    ],
    mind: [
      "Forgetful; confusion",
      "Great despondency"
    ],
    physical: [
      "Must have abdomen uncovered to relieve nausea",
      "Slow, feeble pulse",
      "Dizziness on opening eyes"
    ],
    modalities: {
      better: ["Open air", "Uncovering abdomen"],
      worse: ["Least motion", "Opening eyes", "Extreme heat/cold"]
    }
  },
  {
    id: "tarentula",
    name: "Tarentula Hispanica",
    commonName: "Spanish Spider",
    family: "Animal",
    keynotes: [
      "Extremely restless; must keep moving constantly",
      "Sensitiveness to music; better by lively music",
      "Sudden, violent symptoms",
      "Aversion to being touched"
    ],
    mind: [
      "Mischievous and destructive",
      "Hysterical mania",
      "Hurry in everything"
    ],
    physical: [
      "Twitching and jerking of muscles",
      "Intense headache as if needles were pricking the brain",
      "Sensation of cold water over the body"
    ],
    modalities: {
      better: ["Lively music", "Rubbing", "Open air", "Riding in carriage"],
      worse: ["Noises", "Touch", "Periodically", "After menses"]
    }
  },
  {
    id: "theridion",
    name: "Theridion Curassavicum",
    commonName: "Orange Spider",
    family: "Animal",
    keynotes: [
      "Great sensitiveness to noise; noise penetrates the whole body",
      "Vertigo on closing the eyes",
      "Seasickness; cannot bear the sight of water or motion",
      "Every sound seems to reverberate through the brain"
    ],
    mind: [
      "Hilarious and talkative",
      "Despair of recovery"
    ],
    physical: [
      "Sensitiveness between vertebrae",
      "Nausea from least motion",
      "Pains in left chest"
    ],
    modalities: {
      better: ["Warmth", "Quiet"],
      worse: ["Noise", "Motion", "Closing eyes", "Riding in carriage"]
    }
  },
  {
    id: "veratrum-alb",
    name: "Veratrum Album",
    commonName: "White Hellebore",
    family: "Liliaceae",
    keynotes: [
      "Icy coldness, blueish skin, and cold sweat on forehead",
      "Violent vomiting and purging",
      "Collapse with extreme prostration",
      "Craving for ice, cold water, and sour things"
    ],
    mind: [
      "Religious mania; thinks he is the Christ",
      "Desire to tear things to pieces",
      "Sullen and indifferent"
    ],
    physical: [
      "Rice-water stools",
      "Rice-water vomiting",
      "Cramps in hands and feet"
    ],
    modalities: {
      better: ["Walking about", "Warmth"],
      worse: ["At night", "Before stool", "Damp weather", "Cold drinks"]
    }
  },
  {
    id: "abrotanum",
    name: "Abrotanum",
    commonName: "Southernwood",
    family: "Compositae",
    keynotes: [
      "Marasmus of children, especially of legs",
      "Metastasis of disease",
      "Ravenous hunger while losing flesh",
      "Alternating constipation and diarrhea"
    ],
    mind: [
      "Child is ill-natured, irritable, cross and despondent",
      "Violent, inhuman, would like to do something cruel"
    ],
    physical: [
      "Head weak, cannot hold it up",
      "Face old, pale, wrinkled",
      "Painful contractions of limbs from cramps or following colic",
      "Itching chilblains"
    ],
    modalities: {
      better: ["Moving about"],
      worse: ["Cold air", "Checked secretions", "Night"]
    }
  },
  {
    id: "aceticvm-acidum",
    name: "Aceticum Acidum",
    commonName: "Glacial Acetic Acid",
    family: "Chemical",
    keynotes: [
      "Pale, lean persons with lax, flabby muscles; face pale, waxy",
      "Hemorrhage from every mucous outlet",
      "Intense, burning, insatiable thirst even for large quantities",
      "Cannot sleep lying on the back"
    ],
    mind: [
      "Irritable",
      "Anxious about health"
    ],
    physical: [
      "Great prostration after injuries or surgical shock",
      "Thirst in dropsy and diabetes, but no thirst in fever",
      "Red spot on left cheek with hectic fever",
      "Copious, exhausting diarrhea with night sweats"
    ],
    modalities: {
      better: ["Lying on belly"],
      worse: ["Lying on back", "Cold air"]
    }
  },
  {
    id: "actaea-racemosa",
    name: "Actaea Racemosa",
    commonName: "Black Cohosh",
    family: "Ranunculaceae",
    keynotes: [
      "Ciliary neuralgia; extension to temples/vertex",
      "Uterine reflex symptoms affecting heart",
      "Severe left-sided inframammary pains",
      "Sharp, lancinating electric-like pains"
    ],
    mind: [
      "Puerperal mania; thinks she is going crazy",
      "Sensation as if a heavy, black cloud settled over her",
      "Illusion of a mouse running from under her chair"
    ],
    physical: [
      "Rheumatic pains in muscles of neck and back; feel stiff and lame",
      "Excessive muscular soreness after violent exertion",
      "False labor-like pains in pregnancy"
    ],
    modalities: {
      better: ["Lying down", "Warmth"],
      worse: ["During menstruation", "Cold", "Motion", "Noise"]
    }
  },
  {
    id: "aesculus",
    name: "Aesculus Hippocastanum",
    commonName: "Horse Chestnut",
    family: "Sapindaceae",
    keynotes: [
      "Venous congestion, portal and hemorrhoidal",
      "Dryness and heat of rectum; feels as if full of small sticks",
      "Severe dull backache in lumbo-sacral articulation",
      "Protruding, purplish, blind hemorrhoids"
    ],
    mind: [
      "Despondent, gloomy, irritable",
      "Miserably cross"
    ],
    physical: [
      "Mucous membranes swollen and burn",
      "Hard, dry stool difficult to pass",
      "Prolapsus uteri with acrid, dark leucorrhea"
    ],
    modalities: {
      better: ["Cool air", "Summer"],
      worse: ["Motion", "Walking", "Stooping", "Inhaling cold air"]
    }
  },
  {
    id: "agaricus",
    name: "Agaricus Muscarius",
    commonName: "Bug Agaric",
    family: "Fungi",
    keynotes: [
      "Jerking, twitching, trembling, and itching are strong indications",
      "Icy coldness like icy needles",
      "Chilblains that itch and burn intolerably",
      "Spine sensitive to touch"
    ],
    mind: [
      "Singing, talking, but does not answer questions",
      "Delirium with great strength"
    ],
    physical: [
      "Neuralgia as if cold needles were run through nerves",
      "Trembling of legs and hands",
      "Irregular, tumultuous palpitation"
    ],
    modalities: {
      better: ["Open air", "Moving about"],
      worse: ["After eating", "After coitus", "Cold air", "Before a thunderstorm"]
    }
  },
  {
    id: "agnus-castus",
    name: "Agnus Castus",
    commonName: "Chaste Tree",
    family: "Verbenaceae",
    keynotes: [
      "Complete impotence with gleet; parts cold and relaxed",
      "Scanty or suppressed milk in nursing women",
      "Sadness with impression of speedy death",
      "Absent-mindedness and lack of courage"
    ],
    mind: [
      "Melancholy; thinks he is going to die soon",
      "Inability to fix the attention"
    ],
    physical: [
      "Sexual vitality low",
      "Yellow discharge from urethra (gleet)",
      "Itching in the eyes"
    ],
    modalities: {
      better: ["Moving about"],
      worse: ["Being alone", "Rest"]
    }
  },
  {
    id: "ailanthus",
    name: "Ailanthus Glandulosa",
    commonName: "Tree of Heaven",
    family: "Simarubaceae",
    keynotes: [
      "Malignant scarlatina; eruption dark and partial",
      "Stupor, delirium, and insensibility",
      "Dreadful pain in back of head",
      "Throat swollen and dark red; almost purple"
    ],
    mind: [
      "Semi-conscious, cannot comprehend what is said",
      "Stupidity"
    ],
    physical: [
      "Face dark as mahogany",
      "Pulse rapid, small, and weak",
      "Thick, edematous neck"
    ],
    modalities: {
      better: ["Lying on right side"],
      worse: ["Rising up", "Noise", "Light"]
    }
  },
  {
    id: "allium-cepa",
    name: "Allium Cepa",
    commonName: "Red Onion",
    family: "Liliaceae",
    keynotes: [
      "Acrid, watery nasal discharge that excoriates the nose and upper lip",
      "Bland lacrimation (tears flow freely but do not burn)",
      "Violent sneezing, especially on entering a warm room",
      "Neuralgic pains like a long thread, running in a straight line",
      "Strong craving for raw onions"
    ],
    mind: [
      "Very sleepy; fear that the pain will become unbearable",
      "Symptoms often travel from left to right"
    ],
    physical: [
      "Nasal discharge burns the upper lip; violent sneezing",
      "Eyes red and watering; burning, biting, or smarting sensation",
      "Violent laryngitis: cough as if it would tear the larynx; grabs throat while coughing",
      "Thread-like neuralgic pains, often after trauma or amputation"
    ],
    modalities: {
      better: ["Open air", "Cold room"],
      worse: ["Warm room", "Evening", "Wet feet", "North-west wind"]
    }
  },
  {
    id: "aloe",
    name: "Aloe Socotrina",
    commonName: "Socotrine Aloe",
    family: "Liliaceae",
    keynotes: [
      "Insecurity of rectum: weak sphincter and loss of control",
      "Jelly-like mucus from all mucous membranes",
      "Blue grape-like hemorrhoids, swollen, bleeding, and sore",
      "Diarrhoea early in the morning on getting out of bed",
      "Diarrhoea alternating with constipation"
    ],
    mind: [
      "Dissatisfied and irritable, especially during constipation",
      "Angry with self and because of complaints",
      "Indolent and sedentary individuals"
    ],
    physical: [
      "Involuntary solid stool may escape; lack of rectal sensation",
      "Abdominal rumbling and gas before stool",
      "Cutting and griping pains during stool followed by prostration",
      "Hemorrhoids tender and burning; bearing-down pain in rectum"
    ],
    modalities: {
      better: ["Cold applications", "Cold weather", "Open air"],
      worse: ["Heat", "Warm weather", "After eating", "Standing"]
    }
  },
  {
    id: "abrotanum",
    name: "Abrotanum",
    commonName: "Southernwood",
    family: "Compositae",
    keynotes: [
      "Alternating symptoms",
      "Great weakness after influenza"
    ],
    mind: [
      "Cross, irritable, depressed",
      "Morose children; want to do something cruel"
    ],
    physical: [
      "Distended abdomen",
      "Painful contracting of fingers and toes",
      "Appetite ravenous while losing flesh"
    ],
    modalities: {
      better: ["Walking"],
      worse: ["Cold air", "Checked secretions"]
    }
  },
  {
    id: "aesculus",
    name: "Aesculus Hippocastanum",
    commonName: "Horse Chestnut",
    family: "Sapindales",
    keynotes: [
      "Venous stasis, especially portal and hemorrhoidal",
      "Sensation of sticks in the rectum",
      "Severe backache in lumbosacral region",
      "Throbbing in abdominal and pelvic cavities"
    ],
    mind: [
      "Depressed, gloomy, low-spirited",
      "Irritable; loses temper easily"
    ],
    physical: [
      "Hemorrhoids; purple, painful, rarely bleeding",
      "Dryness of mucous membranes",
      "Dull backache hindering walking"
    ],
    modalities: {
      better: ["Cool open air"],
      worse: ["After sleep", "Standing", "Walking", "Bowel movement"]
    }
  },
  {
    id: "alumina",
    name: "Alumina",
    commonName: "Oxide of Aluminum",
    family: "Mineral",
    keynotes: [
      "Great dryness of mucous membranes and skin",
      "Paresis of rectum and bladder",
      "Abnormal appetite for indigestible things",
      "Slowness of all functions"
    ],
    mind: [
      "Time passes too slowly",
      "Confusion of personal identity",
      "Hasty, hurried, yet slow to act"
    ],
    physical: [
      "Constipation; even soft stool passed with great effort",
      "Brittle nails and dry, harsh skin",
      "Sensation of a cobweb on the face"
    ],
    modalities: {
      better: ["Evening", "Cold washing", "Moderate exercise"],
      worse: ["On waking", "Potatoes", "After eating", "New/Full moon"]
    }
  },
  {
    id: "ambra",
    name: "Ambra Grisea",
    commonName: "Ambergris",
    family: "Animal",
    keynotes: [
      "Extreme bashfulness; cannot have stool when others are near",
      "Premature old age",
      "One-sided numbness",
      "Nervousness with convulsive cough"
    ],
    mind: [
      "Dread of people and desire to be alone",
      "Asks questions and does not wait for an answer",
      "Music causes weeping"
    ],
    physical: [
      "Distension of stomach and gas",
      "Asthmatic breathing with cardiac symptoms",
      "Itching and soreness of parts"
    ],
    modalities: {
      better: ["Lying on painful side", "Cold food"],
      worse: ["Presence of others", "Music", "Warm room", "Morning"]
    }
  },
  {
    id: "ammonium-carb",
    name: "Ammonium Carb",
    commonName: "Carbonate of Ammonia",
    family: "Mineral",
    keynotes: [
      "Stout women who lead a sedentary life",
      "Nosebleed in the morning on washing face",
      "Aversion to water, cannot bear to be washed",
      "Great acridity of all secretions"
    ],
    mind: [
      "Forgetful; makes mistakes in writing/speaking",
      "Ill-humored during cloudy weather"
    ],
    physical: [
      "Stopage of nose at night",
      "Cholera-like symptoms at start of menses",
      "Faintness in a warm room"
    ],
    modalities: {
      better: ["Lying on right side", "Pressure", "Dry weather"],
      worse: ["Cold, damp weather", "Washing", "During menses"]
    }
  },
  {
    id: "anacardium",
    name: "Anacardium Orientalis",
    commonName: "Marking Nut",
    family: "Anacardiaceae",
    keynotes: [
      "Sensation of a plug in various parts",
      "Great impairment of memory",
      "All symptoms relieved by eating",
      "Two wills - one commanding, other forbidding"
    ],
    mind: [
      "Irresistible desire to curse and swear",
      "Fears someone is behind him",
      "Hypochondriacal with low spirits"
    ],
    physical: [
      "Gastric pain relieved by food",
      "Intense itching with mental symptoms",
      "Dull pressure as from a plug"
    ],
    modalities: {
      better: ["Eating", "Hot water"],
      worse: ["Empty stomach", "Mental exertion"]
    }
  },
  {
    id: "arg-nit",
    name: "Argentum Nitricum",
    commonName: "Nitrate of Silver",
    family: "Mineral",
    keynotes: [
      "Apprehension and dread of an ordeal",
      "Time passes too slowly; always in a hurry",
      "Sensation of a splinter in the throat",
      "Great craving for sugar and sweets"
    ],
    mind: [
      "Impulsive; wants to jump out of window",
      "Fear of heights and crowded places",
      "Melancholic with strange hallucinations"
    ],
    physical: [
      "Green, chopped-spinach like stool",
      "Great distention of stomach with belching",
      "Withered, dried-up appearance"
    ],
    modalities: {
      better: ["Cold air", "Cold drinks", "Tight pressure"],
      worse: ["Warmth", "Sugar", "Mental strain", "After eating"]
    }
  },
  {
    id: "berberis",
    name: "Berberis Vulgaris",
    commonName: "Barberry",
    family: "Berberidaceae",
    keynotes: [
      "Radiating pains from a center, especially kidney",
      "Bubbling sensation in various parts",
      "Sticking pains in liver and gall bladder",
      "Straining and burning during urination"
    ],
    mind: [
      "Listless, apathetic, indifferent",
      "Melancholy with anxiety"
    ],
    physical: [
      "Pain in small of back, radiating to hips",
      "Urinary deposits like red sand",
      "Gouty and rheumatic complaints"
    ],
    modalities: {
      better: ["Rest"],
      worse: ["Motion", "Walking", "Jarring"]
    }
  },
  {
    id: "bovista",
    name: "Bovista",
    commonName: "Puff-ball",
    family: "Fungi",
    keynotes: [
      "Great puffiness and edema of the body",
      "Sensation as if the head were enlarging",
      "Menses at night or only in the morning",
      "Intolerable itching, worse from warmth"
    ],
    mind: [
      "Awkward; drops everything from hands",
      "Absence of mind; difficult to collect thoughts"
    ],
    physical: [
      "Intense itching of tip of nose",
      "Urticaria on waking in the morning",
      "Stammering speech in children"
    ],
    modalities: {
      better: ["Hot food"],
      worse: ["Warmth", "Morning", "During menses"]
    }
  },
  {
    id: "bromium",
    name: "Bromium",
    commonName: "Bromine",
    family: "Mineral",
    keynotes: [
      "Swelling of glands especially parotid and thyroid",
      "Sensation of cold air in the lungs",
      "Stony hard glands",
      "Worse in warm rooms, better by the sea"
    ],
    mind: [
      "Depression and melancholy",
      "Fears something is behind him"
    ],
    physical: [
      "Spasmodic cough with croupy sound",
      "Scanty menses with pain in left ovary",
      "Acne on face and chest"
    ],
    modalities: {
      better: ["At sea", "Motion", "Cold water"],
      worse: ["Warm room", "Empty swallowing", "Evening"]
    }
  },
  {
    id: "caladium",
    name: "Caladium",
    commonName: "American Arum",
    family: "Araceae",
    keynotes: [
      "Great desire for tobacco",
      "Sweat smells sweet and attracts flies",
      "Pruritus vulvae with intense itching",
      "Erection without desire"
    ],
    mind: [
      "Forgetful; very sensitive to noise",
      "Apprehensive and weary of life"
    ],
    physical: [
      "Coldness of single parts",
      "Sudden startings from sleep",
      "Itching of genitals"
    ],
    modalities: {
      better: ["Open air", "After a short sleep"],
      worse: ["Motion", "Tobacco smoke", "Evening"]
    }
  },
  {
    id: "calc-phos",
    name: "Calcarea Phos",
    commonName: "Phosphate of Lime",
    family: "Mineral",
    keynotes: [
      "Anemic, scrofulous, and tall children",
      "Slow development and slow walking",
      "Sensation of numbness in various parts",
      "Desire for salted and smoked meats"
    ],
    mind: [
      "Forgetful; peevish and fretful",
      "Always wants to go somewhere else"
    ],
    physical: [
      "Delayed dentition and weak spine",
      "Pains in joints and bones during growth",
      "Cold extremities"
    ],
    modalities: {
      better: ["Lying down", "Summer", "Warmth"],
      worse: ["Change of weather", "Cold and damp", "Dentition"]
    }
  },
  {
    id: "calc-sulph",
    name: "Calcarea Sulph",
    commonName: "Sulphate of Lime",
    family: "Mineral",
    keynotes: [
      "Suppurations with thick, yellow, lumpy pus",
      "Heals skin ailments that tend to fester",
      "Cystic tumors and fibroids",
      "Burning and itching of soles"
    ],
    mind: [
      "Irritable and easily angered",
      "Fear of being alone"
    ],
    physical: [
      "Pimples and slow-healing sores",
      "Purulent discharges from mucous membranes",
      "Tonsillitis with yellow exudate"
    ],
    modalities: {
      better: ["Cold air", "Uncovering"],
      worse: ["Warmth", "Dampness", "After washing"]
    }
  },
  {
    id: "cann-ind",
    name: "Cannabis Indica",
    commonName: "Indian Hemp",
    family: "Cannabaceae",
    keynotes: [
      "Exaltation of all perceptions and senses",
      "Time and space seem greatly extended",
      "Fear of losing reason or becoming insane",
      "Incessant talking with laughter"
    ],
    mind: [
      "Clairvoyance; feels he is in another world",
      "Emotional excitement and delusions",
      "Unsteady; cannot direct his thoughts"
    ],
    physical: [
      "Sensation of drop of water falling",
      "Palpitation on going upstairs",
      "Intense thirst"
    ],
    modalities: {
      better: ["Fresh air", "Cold water"],
      worse: ["Morning", "Coffee", "Liquor", "Tobacco"]
    }
  },
  {
    id: "capsicum",
    name: "Capsicum",
    commonName: "Cayenne Pepper",
    family: "Solanaceae",
    keynotes: [
      "Home-sickness; nostalgia",
      "Burning and smarting as if from pepper",
      "Lax fiber and obesity",
      "Coldness and lack of reaction"
    ],
    mind: [
      "Sensitiveness to least offense",
      "Taciturn and peevish children"
    ],
    physical: [
      "Sticking pain in throat",
      "Pain in ears during cough",
      "Dysentery with burning in anus"
    ],
    modalities: {
      better: ["Heat", "Eating"],
      worse: ["Open air", "Uncovering", "Cold", "Drafts"]
    }
  },
  {
    id: "caulophyllum",
    name: "Caulophyllum",
    commonName: "Blue Cohosh",
    family: "Berberidaceae",
    keynotes: [
      "Uterine debility and rheumatism of small joints",
      "Spasmodic, ineffective labor pains",
      "Habitual abortion from uterine weakness",
      "Intermittent, shifting pains"
    ],
    mind: [
      "Fretful and apprehensive",
      "Hysterical mood during menses"
    ],
    physical: [
      "Needle-like pains in fingers and hands",
      "Severe cramps in uterus",
      "Menses preceded by great weakness"
    ],
    modalities: {
      better: ["After eating", "Warmth"],
      worse: ["During menses", "Pregnancy", "Open air"]
    }
  },
  {
    id: "dulcamara",
    name: "Dulcamara",
    commonName: "Bittersweet",
    family: "Solanaceae",
    keynotes: [
      "Ailments from damp, cold weather",
      "Sudden change from warm to cold",
      "Skin eruptions and catarrhal conditions",
      "Increased secretions from mucous membranes"
    ],
    mind: [
      "Mental confusion",
      "Impatience and irritability"
    ],
    physical: [
      "Stiff neck from cold",
      "Diarrhea in autumn when the days are warm and nights cold",
      "Urticaria after exposure to cold"
    ],
    modalities: {
      better: ["Moving about", "Warmth"],
      worse: ["Cold, damp air", "Chilled when sweaty", "At rest"]
    }
  },
  {
    id: "euphrasia",
    name: "Euphrasia Officinalis",
    commonName: "Eyebright",
    family: "Scrophulariaceae",
    keynotes: [
      "Acrid, burning lacrimation",
      "Bland coryza (opposite of Cepa)",
      "Photophobia",
      "Frequent winking of eyes"
    ],
    mind: [
      "Dullness of intellect",
      "Disinclination to business"
    ],
    physical: [
      "Eyes feel as if sand were in them",
      "Cough only during the day",
      "Profuse, fluent coryza"
    ],
    modalities: {
      better: ["Darkness", "Coffee"],
      worse: ["Light", "Evening", "Wind", "Warmth"]
    }
  },
  {
    id: "glonoinum",
    name: "Glonoinum",
    commonName: "Nitro-glycerine",
    family: "Chemical",
    keynotes: [
      "Tremendous throbbing in head and heart",
      "Sunstroke or ailments from sun heat",
      "Cannot bear any heat around head",
      "Rush of blood to the head; bursting sensation"
    ],
    mind: [
      "Confusion of place; loses his way on familiar streets",
      "Irritability from least opposition"
    ],
    physical: [
      "Face deep red or purplish",
      "Pulsation felt in every part of body",
      "Sensation of skull being too small"
    ],
    modalities: {
      better: ["Open air", "Uncovering head", "Elevation of head"],
      worse: ["Sun", "Heat", "Gas light", "Motion", "Stooping"]
    }
  },
  {
    id: "hamamelis",
    name: "Hamamelis Virginiana",
    commonName: "Witch Hazel",
    family: "Hamamelidaceae",
    keynotes: [
      "Varicose veins and venous congestion",
      "Passive hemorrhages",
      "Bruised and sore feeling in affected parts",
      "Pelvic congestion"
    ],
    mind: [
      "Irritable and depressed",
      "Aversion to mental exertion"
    ],
    physical: [
      "Bleeding hemorrhoids with soreness",
      "Varicocele and orchitis",
      "Epistaxis with relief of head symptoms"
    ],
    modalities: {
      better: ["Rest"],
      worse: ["Warmth", "Moist air", "Motion", "Pressure"]
    }
  },
  {
    id: "helleborus",
    name: "Helleborus Niger",
    commonName: "Christmas Rose",
    family: "Ranunculaceae",
    keynotes: [
      "States of sensory depression and stupor",
      "Boring head into the pillow",
      "Automatic movements of one arm and leg",
      "Dropsy of brain or serous cavities"
    ],
    mind: [
      "Difficulty in thinking; cannot remember what he just read",
      "Melancholy with despair"
    ],
    physical: [
      "Dark, smoky urine with coffee-ground sediment",
      "Wrinkled forehead with cold sweat",
      "Muscular weakness"
    ],
    modalities: {
      better: ["Wrapping up", "Rest"],
      worse: ["Evening", "Uncovering", "Cold air"]
    }
  },
  {
    id: "lac-can",
    name: "Lac Caninum",
    commonName: "Dog's Milk",
    family: "Animal",
    keynotes: [
      "Symptoms change sides frequently (side-to-side)",
      "Oversensitiveness to touch and light",
      "Erratic, shifting pains",
      "Forgetfulness; makes mistakes in writing"
    ],
    mind: [
      "Despondent; thinks her disease is incurable",
      "Sensation as if floating in air",
      "Intense hatred of self"
    ],
    physical: [
      "Shining, pearly-white exudates in throat",
      "Breasts sensitive before menses",
      "Constant desire to urinate"
    ],
    modalities: {
      better: ["Cold drinks (throat)"],
      worse: ["Touch", "Pressure", "During menses"]
    }
  },
  {
    id: "merc-sol",
    name: "Mercurius Solubilis",
    commonName: "Quicksilver",
    family: "Mineral",
    keynotes: [
      "Tremendous salivation and offensive breath",
      "Flabby tongue showing imprint of teeth",
      "Night sweats which do not relieve",
      "Worse from both heat and cold"
    ],
    mind: [
      "Hurriedness; slow in answering",
      "Suspicious and impulsive",
      "Homesickness"
    ],
    physical: [
      "Syphilitic miasm",
      "Profuse, thin, acrid discharges",
      "Ulceration of mucous membranes"
    ],
    modalities: {
      better: ["Moderate temperature"],
      worse: ["Night", "Damp weather", "Warmth of bed", "Perspiring"]
    }
  },
  {
    id: "aurum-metallicum",
    name: "Aurum Metallicum",
    commonName: "Metallic Gold",
    family: "Mineral",
    keynotes: [
      "Hopelessness and extreme depression",
      "Self-condemnation and desire for self-destruction",
      "Bone pains, especially of skull and nasal bones, worse at night",
      "Great congestion and sense of fulness"
    ],
    mind: [
      "Melancholy; thinks he is unfit for this world",
      "Intolerable melancholy leading to thoughts of suicide",
      "Anger and vehemence when contradicted"
    ],
    physical: [
      "Necrosis and caries of skull bones and nasal cartilage",
      "Severe night pains in bones that drive to despair",
      "Valvular cardiac conditions with hypertrophy"
    ],
    modalities: {
      better: ["Cool open air", "Washing with cold water", "During the day"],
      worse: ["Night season", "Cold weather", "Winter", "Mental exertion"]
    }
  },
  {
    id: "chelidonium-majus",
    name: "Chelidonium Majus",
    commonName: "Great Celandine",
    family: "Plant",
    keynotes: [
      "Fixed pain under the lower inner angle of right scapula",
      "Jaundice and liver congestion with bilious symptoms",
      "Strong preference for hot drinks and warm food",
      "Spasmodic cough with rattling phlegm"
    ],
    mind: [
      "Lethargic and dull; hates mental exertion",
      "Aversion to company, anxious and sad",
      "Dread of being touched or approached"
    ],
    physical: [
      "Biliary tract inflammation and gallstone colic",
      "Thick yellow coated tongue with teeth indentations",
      "Hepatic congestion with right shoulder blade pain"
    ],
    modalities: {
      better: ["Taking hot food/drinks", "Eating a meal", "Pressure on right side"],
      worse: ["Right side", "Change of weather", "4 AM and 4 PM", "Motion"]
    }
  },
  {
    id: "conium-maculatum",
    name: "Conium Maculatum",
    commonName: "Poison Hemlock",
    family: "Plant",
    keynotes: [
      "Glands swollen and stony hard from mechanical injury",
      "Ascending neuromuscular paralysis beginning in lower limbs",
      "Vertigo on turning over or looking around in bed",
      "Photophobia intense out of proportion to redness"
    ],
    mind: [
      "Symptons of progressive senile debility and loss of memory",
      "Indifference; wants no company yet dreads being alone",
      "Inability to sustain mental activity"
    ],
    physical: [
      "Scyros of breasts and testicles with stony hardness",
      "Prostatic hypertrophy and flow of prostatic fluid",
      "Soreness of breasts before menses and during nursing"
    ],
    modalities: {
      better: ["Darkness", "Letting affected limb hang down", "Motion", "Pressure"],
      worse: ["Turning over in bed", "Least touch", "Celibacy", "At night", "Cold air"]
    }
  },
  {
    id: "secale-cornutum",
    name: "Secale Cornutum",
    commonName: "Ergot of Rye",
    family: "Fungi",
    keynotes: [
      "Icy coldness of body but cannot tolerate any cover/blankets",
      "Burning sensations in internal parts as if sparks of fire",
      "Dry gangrene and necrosis of extremities",
      "Passive hemorrhages of dark, thin, fluid blood"
    ],
    mind: [
      "Mania with desire to tear things or walk naked",
      "Dullness of senses with fear of death",
      "Sudden anxiety and starting up in sleep"
    ],
    physical: [
      "Severe muscle cramps starting in hands and feet, extending to calves",
      "Dark fluid oozing bleeding; non-coagulating",
      "Extreme prostration and cachexia with senile look"
    ],
    modalities: {
      better: ["Cold air", "Being uncovered", "Cold applications"],
      worse: ["Warm applications and wraps", "Heat of stove", "Motion", "Touch"]
    }
  },
  {
    id: "platina",
    name: "Platinum Metallicum",
    commonName: "Metallic Platinum",
    family: "Mineral",
    keynotes: [
      "Supreme arrogance, pride, and self-esteem",
      "Objects and people appear small and physically inferior",
      "Spasmodic numbness and neuralgic pressure",
      "Hysterical spasms alternating with mental depression"
    ],
    mind: [
      "Thinks highly of herself; looks down upon everyone else",
      "Feels physically detached and larger than normal",
      "Mental symptoms worsen as physical symptoms improve"
    ],
    physical: [
      "Numbness and coldness in face, hands, and isolated patches",
      "Ovarian irritation with intense sensitive soreness",
      "Constipation during travel with clay-like stools"
    ],
    modalities: {
      better: ["Walking in open air", "Gentle massage", "Resting"],
      worse: ["Being indoors", "In evening", "Touch", "Lying on left side"]
    }
  },
  {
    id: "plumbum-metallicum",
    name: "Plumbum Metallicum",
    commonName: "Metallic Lead",
    family: "Mineral",
    keynotes: [
      "Violent colic with retraction of abdomen to the spine",
      "Wrist-drop from extensor muscle paralysis",
      "Extreme, obstinate constipation with hard, dark, lumpy feces",
      "Muscular atrophy and progressive sclerosis"
    ],
    mind: [
      "Loss of memory; cannot find correct words",
      "Apathy with progressive mental dullness",
      "Delusions of being poisoned or watched"
    ],
    physical: [
      "Alternating hemiplegia and localized muscular paralysis",
      "Colic so severe the navel feels drawn backward by a string",
      "Hyperesthesia of skin alternating with anesthesia"
    ],
    modalities: {
      better: ["Hard physical pressure", "Rubbing of abdomen", "Bending double"],
      worse: ["Motion", "At night", "Open drafts", "Mental effort"]
    }
  },
  {
    id: "pyrogenium",
    name: "Pyrogenium",
    commonName: "Artificial Sepsis",
    family: "Animal",
    keynotes: [
      "Pulse exceptionally rapid while temperature remains low",
      "Bed feels intolerably hard, causing dynamic restlessness",
      "All discharges (breath, seat, stool, menses) have a putrid odor",
      "High fevers with rapid septic state and chills"
    ],
    mind: [
      "Loquacity; mind active and excited, can think of multiple things",
      "Sensation as if limbs were scattered or double in bed",
      "Anxious dreams and restless waking state"
    ],
    physical: [
      "Soreness and aching in bones and joints all over",
      "Septicemia, puerperal fever, and abscesses with offensive pus",
      "Great thirst for small quantities of ice-cold water, vomited instantly"
    ],
    modalities: {
      better: ["Constant motion", "Changing position in bed", "Heat"],
      worse: ["Cold damp air", "Starting to move", "First motion"]
    }
  },
  {
    id: "coffea-cruda",
    name: "Coffea Cruda",
    commonName: "Raw Coffee Bean",
    family: "Plant",
    keynotes: [
      "Extreme mental and physical excitability with flow of ideas",
      "Sleeplessness arising from sudden joy, happy news, or over-excitement",
      "Hyperesthesia of all senses (noise, light, touch is intolerable)",
      "Toothache or neuralgic pain relieved by cold ice-water in mouth"
    ],
    mind: [
      "Ecstatic state of mind with rapid flow of creative ideas",
      "Oversensitive to pain; cries out and cannot tolerate it",
      "Full of plans and mental activity during nighttime"
    ],
    physical: [
      "Hysterical palpitations and rapid irregular pulse",
      "Severe neuralgias worse from wind, better from cold water and rest",
      "Extreme physical restlessness with twitching of muscles"
    ],
    modalities: {
      better: ["Holding ice-cold water in mouth", "Lying down", "Warmth"],
      worse: ["Sudden emotions/joy", "Extreme cold", "Noise", "Strong scents"]
    }
  },
  {
    id: "colocynthis",
    name: "Colocynthis",
    commonName: "Bitter Cucumber",
    family: "Plant",
    keynotes: [
      "Agonizing colic in abdomen causing patient to bend double",
      "Pains are relieved entirely by hard pressure and heat",
      "Ailments starting immediately after anger with indignation",
      "Sciatic nerve pain extending from hip down to knee and foot"
    ],
    mind: [
      "Extremely irritable; gets angry when questioned",
      "Full of indignation and resentment over wrongs",
      "Aversion to talking or being approached"
    ],
    physical: [
      "Spasms and constriction of intestines with sour vomiting",
      "Sciatica on left side, worse from motion and cold, better by pressure",
      "Severe neuralic headache from emotional suppression"
    ],
    modalities: {
      better: ["Bending double", "Hard pressure", "Heat", "Rest"],
      worse: ["Anger", "Indignation", "Motion", "Cold", "Eating/drinking"]
    }
  },
  {
    id: "calendula-officinalis",
    name: "Calendula Officinalis",
    commonName: "Garden Marigold",
    family: "Plant",
    keynotes: [
      "Clean-cut surgical wounds or lacerations with ragged edges",
      "Acts as a local antiseptic, promoting healthy granulation",
      "Prevents excessive suppuration, gangrene, and scarring",
      "Pain in wounds is out of proportion to injury"
    ],
    mind: [
      "Fretful and easily frightened",
      "Aversion to effort, sluggish mental state",
      "Anxious and foreboding of evil"
    ],
    physical: [
      "Rupture of muscles and tendons, lacerated perineum",
      "Post-operative wounds to speed healing",
      "Erysipelas and open ulcers with bloody discharge"
    ],
    modalities: {
      better: ["Resting", "Warm weather", "Lying perfectly still"],
      worse: ["Damp weather", "Cold drafts", "Dynamic movements"]
    }
  },
  {
    id: "acidum-nitricum",
    name: "Acidum Nitricum",
    commonName: "Nitric Acid",
    family: "Chemical",
    keynotes: [
      "Stitching, splinter-like pains in ulcers, throat, and hemorrhoids",
      "Urine highly offensive, smelling like horse's urine",
      "Ulcers with zigzag, irregular edges and exuberant granulations",
      "Extremely sensitive to cold and change of weather"
    ],
    mind: [
      "Vindictive, unforgiving; holds grudges and refuses to be appeased",
      "Extremely irritable and anxious about health, with fear of death",
      "Sadness and despondency, especially during the evening"
    ],
    physical: [
      "Cracks and fissures at mucus outlets, especially corners of mouth and anus",
      "Hemorrhoids that pain for hours after every stool",
      "Frequent, severe epistaxis of dark, clotted blood"
    ],
    modalities: {
      better: ["Riding in a carriage / vehicle", "Warm air", "Steady pressure"],
      worse: ["Cold air", "Change of weather", "Touch", "Evening and night"]
    }
  },
  {
    id: "acidum-benzoicum",
    name: "Acidum Benzoicum",
    commonName: "Benzoic Acid",
    family: "Chemical",
    keynotes: [
      "Urine highly colored, exceedingly offensive, smelling like horse's urine",
      "Gouty and rheumatic symptoms alternating with urinary symptoms",
      "Cracking in joints on slightest movement",
      "Stiffness and nodes in joints"
    ],
    mind: [
      "Prone to dwell on unpleasant items from the past",
      "Anxious, especially when light is dim or in evening",
      "Child clings to mother, refuses to be separated"
    ],
    physical: [
      "Excessive uric acid in blood; red sandy deposit in urine",
      "Rheumatic pains in Achilles tendon and joints",
      "Heavy, dark urine with extremely offensive odor"
    ],
    modalities: {
      better: ["Warmth of bed", "Eating", "Rest"],
      worse: ["Cold air", "Exertion", "Change of weather"]
    }
  },
  {
    id: "acidum-fluoricum",
    name: "Acidum Fluoricum",
    commonName: "Hydrofluoric Acid",
    family: "Chemical",
    keynotes: [
      "Sensation of cold wind blowing through the eyes",
      "Varicose veins and ulcers; deep-seated destructive processes",
      "Extremely warm-blooded; seeks cold water and cold rooms",
      "Ailments from abuse of mercury, especially in bone diseases"
    ],
    mind: [
      "Buoyant, cheerful, highly energetic and physical",
      "Indifference to loved ones, yet friendly to strangers",
      "Sensation of lightness and increased willpower"
    ],
    physical: [
      "Destructive ulcers that eat into bone and deep tissues",
      "Rapidly decaying teeth; lachrymal fistula",
      "Soles and palms burn, causing patient to seek cold surface"
    ],
    modalities: {
      better: ["Cold applications", "Washing in cold water", "Walking rapidly"],
      worse: ["Warmth in any form", "Rest", "Acid food or drinks"]
    }
  },
  {
    id: "acidum-muriaticum",
    name: "Acidum Muriaticum",
    commonName: "Muriatic Acid",
    family: "Chemical",
    keynotes: [
      "Extreme physical weakness; slides down to foot of bed",
      "Hemorrhoids so sensitive to touch that even toilet sheet is intolerable",
      "Involuntary stool while passing urine or flatus",
      "Dry, dark tongue, looking like leather"
    ],
    mind: [
      "Quiet, sad, and fully taciturn; refuses to respond",
      "Anxious, has prophetic dreams of misfortune",
      "Sighing and groaning during sleep"
    ],
    physical: [
      "Profound muscular exhaustion with dropped lower jaw",
      "Ulceration of mouth and throat with putrid breath",
      "Hemorrhoids protrude like a bunch of red cherries, highly painful"
    ],
    modalities: {
      better: ["Warmth of bed", "Lying on right side"],
      worse: ["Touch", "Cold wind", "Motion", "Sitting"]
    }
  },
  {
    id: "acidum-sulphuricum",
    name: "Acidum Sulphuricum",
    commonName: "Sulphuric Acid",
    family: "Chemical",
    keynotes: [
      "Sensation of internal trembling, though none is visible externally",
      "In a great hurry; everything must be done immediately",
      "Black and blue spots on skin after minor bruises or falls",
      "Sour vomiting, sour breath, and sour sweat in children"
    ],
    mind: [
      "Hurried and impatient in all actions and speaking",
      "Fretful, moody, and easily offended",
      "Anxiety with rapid flow of pessimistic thoughts"
    ],
    physical: [
      "Petechiae, purpura, and passive hemorrhages from all orifices",
      "Aphthous ulceration of mouth, gums bleed easily",
      "Extreme fatigue with dragging of feet when walking"
    ],
    modalities: {
      better: ["Warmth", "Rest", "Lying on back"],
      worse: ["Cold air", "Smell of coffee", "Open draft", "Warm drinks"]
    }
  },
  {
    id: "anthracinum",
    name: "Anthracinum",
    commonName: "Anthrax Poison",
    family: "Animal",
    keynotes: [
      "Terrible, burning, intense pain as if hot coals were on the part",
      "Septic, malignant boils and carbuncles with dark, bloody discharge",
      "Rapid and extreme prostration with putrid breath and secretions",
      "Successive crops of painful boils that do not heal"
    ],
    mind: [
      "Anxiety with extreme physical restlessness",
      "Stupor with delirium during hot septicaemias",
      "Fear of death and toxic daze"
    ],
    physical: [
      "Gangrenous ulcerations, erysipelas with black vesicles",
      "Malignant pustule with heavy induration in surrounding tissues",
      "Septicemia with rapid heart rate and low body temperature"
    ],
    modalities: {
      better: ["Warm applications", "Pressure"],
      worse: ["Cold applications", "Least touch", "Warmth of bed"]
    }
  },
  {
    id: "arum-triphyllum",
    name: "Arum Triphyllum",
    commonName: "Jack-in-the-Pulpit",
    family: "Plant",
    keynotes: [
      "Constant picking and boring at the nose and lips until they bleed",
      "Nostrils and lips are raw, bloody, and painful",
      "Hoarseness and loss of voice after singing or public speaking",
      "Acrid, watery discharge from nostrils, excoriating the lip"
    ],
    mind: [
      "Screams from pain; gets highly irritable and cross",
      "Delirium; talks incoherently and picking at bedclothes",
      "Aversion to light and company"
    ],
    physical: [
      "Corners of mouth cracked, bleeding, and ulcerated",
      "Voice changeable, constantly breaking or squeaking",
      "Salivation with swollen glands under jaw"
    ],
    modalities: {
      better: ["Warmth", "Drinking warm water"],
      worse: ["Cold wind", "Speaking or singing", "North-west wind"]
    }
  },
  {
    id: "asafoetida",
    name: "Asafoetida",
    commonName: "Asafetida",
    family: "Plant",
    keynotes: [
      "Sensation of a globe or ball rising in the throat (globus)",
      "Reversed peristalsis with violent spasmodic belching",
      "Bone pains and ulcers, especially of shin and head, from overuse of mercury",
      "Extreme hypersensitiveness of ulcerated bone to touch"
    ],
    mind: [
      "Hysterical, changeable temperament with crying and laughing",
      "Anxious and fearful of physical collapse",
      "Easily excited by noises or sudden movements"
    ],
    physical: [
      "Flatus passes upwards; stomach feels bloated and highly distended",
      "Deep bone ulcers with offensive, thin, watery discharge",
      "Sensation of pressure and burning in chest radiating to neck"
    ],
    modalities: {
      better: ["Open air", "Motion", "Hard pressure on parts"],
      worse: ["Touch", "Night", "Resting indoors", "Lying on left side"]
    }
  },
  {
    id: "asterias-rubens",
    name: "Asterias Rubens",
    commonName: "Red Starfish",
    family: "Animal",
    keynotes: [
      "Lancinating, sharp, stabbing pains in left breast",
      "Chronic swelling and induration of glands, especially mammary",
      "Flushing of face with heat, followed by coldness",
      "Epileptiform spasms preceded by visual aura"
    ],
    mind: [
      "Highly irritable, easily offended and tearful",
      "Anxious and fearful of breast disease or cancer",
      "Sensation as if brain were shaken by a blow"
    ],
    physical: [
      "Left breast swollen, hard, and painful; nipple drawn inward",
      "Varicose veins on legs that bleed or itch easily",
      "Acne on face and chest during puberty"
    ],
    modalities: {
      better: ["Open sea air", "Cool rooms", "Motion"],
      worse: ["Warm rooms", "At night", "Damp cold", "Left side"]
    }
  },
  {
    id: "bellis-perennis",
    name: "Bellis Perennis",
    commonName: "English Daisy",
    family: "Plant",
    keynotes: [
      "Deep-seated tissue trauma; bruising from mechanical blow",
      "Railway spine; injury to pelvis and lower vertebrae",
      "Ill-effects of cold drinks when the body is overheated",
      "Sensation of soreness and swelling in internal organs"
    ],
    mind: [
      "Dullness and aversion to physical and mental exertion",
      "Prefers to be alone and quiet",
      "Anxious dreams of falling or being crushed"
    ],
    physical: [
      "Soreness of abdominal walls after operations or childbirth",
      "Muscular aches in back and limbs from heavy manual labor",
      "Chilblains with intense burning and purple swelling"
    ],
    modalities: {
      better: ["Cold applications", "Lying still", "Gentle motion"],
      worse: ["Touch", "Warm bath", "Getting hot in bed", "Sudden drafts"]
    }
  },
  {
    id: "bismuthum",
    name: "Bismuthum Subnitricum",
    commonName: "Subnitrate of Bismuth",
    family: "Chemical",
    keynotes: [
      "Vomits water as soon as it reaches the stomach; food is retained longer",
      "Craves company; cannot bear to be alone, even for a few minutes",
      "Tongue coated thickly white; breath is highly offensive",
      "Cramping, spasmodic gastralgia with burning in stomach"
    ],
    mind: [
      "Solitude is intolerable; has intense anxiety and fear when alone",
      "Discontented, restless, and complaining",
      "Child holds onto mother's hand constantly"
    ],
    physical: [
      "Watery, painless diarrhea with cadaveric, offensive odor",
      "Convulsive retching with cold extremities",
      "Severe neuralic headaches alternating with stomach pains"
    ],
    modalities: {
      better: ["Cold applications", "Bending backward", "Movement"],
      worse: ["Solitude", "Cold drinks", "Eating", "Lying down"]
    }
  },
  {
    id: "bovista-lycoperdon",
    name: "Bovista Lycoperdon",
    commonName: "Puff-Ball",
    family: "Fungi",
    keynotes: [
      "Intolerance of tight clothing around the waist or abdomen",
      "Sensation of puffiness or swelling in all parts",
      "Sweat in axillae smells distinctly like onions",
      "Hemorrhages of dark, liquid blood from any mucous outlet"
    ],
    mind: [
      "Awkwardness; drops things from hands easily",
      "Sensitiveness; gets irritated by minor remarks",
      "Dullness of memory; easily confused"
    ],
    physical: [
      "Violent itching of skin, worse from getting warm in bed",
      "Deep creases and thick dry skin on hands and fingers",
      "Diarrhea preceding or during menstruation"
    ],
    modalities: {
      better: ["Hot food", "Bending forward", "Rubbing"],
      worse: ["Tight clothes", "Getting hot", "Before thunderstorm", "Morning"]
    }
  },
  {
    id: "bromium-element",
    name: "Bromium",
    commonName: "Bromine",
    family: "Chemical",
    keynotes: [
      "Respiratory and glandular symptoms in sailors, better at sea",
      "Croup with deep rattling mucus, but cannot expectorate",
      "Sensation of water or cold air in the larynx",
      "Hard, stony induration of parotid and thyroid glands"
    ],
    mind: [
      "Anxious and fearful of ghosts, darkness, or being alone",
      "Sensation as if strange people were looking over shoulder",
      "Desire to travel or seek open space"
    ],
    physical: [
      "Spasmodic dyspnea with gasping, cyanosis, and dry cough",
      "Hypertrophy of heart with rapid, full pulse",
      "Acne-like eruptions on face and forehead"
    ],
    modalities: {
      better: ["Sea air", "Riding on water", "Motion", "Exertion"],
      worse: ["Warm rooms", "At dust", "Heat of sun", "Damp north wind"]
    }
  },
  {
    id: "caladium-seguinum",
    name: "Caladium Seguinum",
    commonName: "American Arum",
    family: "Plant",
    keynotes: [
      "Violent pruritus of the vulva or scrotum, worse at night",
      "Sweet, sticky perspiration that attracts flies and insects",
      "Great craving for tobacco and smoking habit",
      "Loss of sexual power with cold, relaxed organs"
    ],
    mind: [
      "Extremely forgetful; loses track of what he is doing",
      "Depressed and dazed; fear of approaching sickness",
      "Hypochondriacal state with dread of efforts"
    ],
    physical: [
      "Aversion to motion; prefers to lie down always",
      "Asthma alternating with skin eruptions",
      "Glany secretions from urethra with weakness"
    ],
    modalities: {
      better: ["After sleep", "Cool open air", "Cold water"],
      worse: ["Warmth of bed", "Motion", "Stormy weather", "Solitude"]
    }
  },
  {
    id: "calcarea-fluorica",
    name: "Calcarea Fluorica",
    commonName: "Fluoride of Lime",
    family: "Mineral",
    keynotes: [
      "Stony hard glands, especially in neck, breasts, and testes",
      "Exostoses, bunions, and malnutrition of bones and teeth",
      "Enlarged, hard varicose veins and sluggish circulation",
      "Indurated swelling of fascia and tendons from sprains"
    ],
    mind: [
      "Anxiety about financial ruins and poverty",
      "Indecisive; lacks confidence to start any project",
      "Depression and fear of becoming dependent"
    ],
    physical: [
      "Decay of teeth, loose teeth, with deficient enamel",
      "Cracking in joints on moving",
      "Uterine displacement and bearing down pains"
    ],
    modalities: {
      better: ["Heat", "Warm applications", "Continuous gentle motion"],
      worse: ["Cold damp weather", "Starting to move", "Rest", "Drafts"]
    }
  },
  {
    id: "carbo-animalis",
    name: "Carbo Animalis",
    commonName: "Animal Charcoal",
    family: "Mineral",
    keynotes: [
      "Glandular induration of stony hardness, esp. axilla and groin",
      "Weak ankles in children; they turn inwards when walking",
      "Copper-colored, dark spots on face, chest, and arms",
      "All secretions (sweat, discharge) stain linen bright yellow"
    ],
    mind: [
      "Desire to be alone; avoids conversation and company",
      "Deep, heavy sadness, worse in the morning on waking",
      "Nostalgia and homesickness of elderly"
    ],
    physical: [
      "Ulceration and burning in stomach and rectum",
      "Painful swelling of bones with burning sensations",
      "Offensive, burning discharges from uterus"
    ],
    modalities: {
      better: ["Warmth", "Dry weather"],
      worse: ["Cold air", "Loss of fluids", "After eating", "Morning"]
    }
  },
  {
    id: "carduus-marianus",
    name: "Carduus Marianus",
    commonName: "St. Mary's Thistle",
    family: "Plant",
    keynotes: [
      "Liver congestion and edema with dull aching pain in right side",
      "Varicose veins and ulcers, especially associated with portal stagnation",
      "Pain in liver region radiating to left shoulder",
      "Stool hard, knotty, alternating with bright yellow diarrhea"
    ],
    mind: [
      "Melancholy and heavy depression; loses interest in life",
      "Irritable, easily angered by minor contradictions",
      "Apathy with difficulty in understanding ideas"
    ],
    physical: [
      "Jaundice with clay-colored stools and dark urine",
      "Varicose veins in legs with severe burning and itching",
      "Congestion of portal veins leading to pelvic fullness"
    ],
    modalities: {
      better: ["Cool air", "Rest", "Gentle massage"],
      worse: ["Lying on left side", "Motion", "Damp warm weather"]
    }
  },
  {
    id: "cicuta-virosa",
    name: "Cicuta Virosa",
    commonName: "Water Hemlock",
    family: "Plant",
    keynotes: [
      "Violent spasmodic convulsions with head turned backward (opisthotonos)",
      "Strange, unnatural hunger for chalk, coal, or charcoal",
      "Pupils highly dilated and insensible to light",
      "Eczema on face with thick, yellow, horn-like crusts"
    ],
    mind: [
      "Childish behavior; sings, dances, and talks of foolish things",
      "Misanthropy; hates company and avoids human interaction",
      "Extreme fear of strange faces and new places"
    ],
    physical: [
      "Sudden spasmodic twitching of any muscle group",
      "Lockjaw (trismus) with frothing at the mouth",
      "Violent stomach cramps preceding fits"
    ],
    modalities: {
      better: ["Warmth", "Quiet", "Resting"],
      worse: ["Touch", "Noise", "Draft", "Turning head in bed"]
    }
  },
  {
    id: "clematis-erecta",
    name: "Clematis Erecta",
    commonName: "Virgin's Bower",
    family: "Plant",
    keynotes: [
      "Glandular swelling in groin and testes with sore induration",
      "Scrotal eczema and intense itching of the perineum",
      "Painful urination with interrupted flow; must wait for urine to start",
      "Strictures of urethra; burning during and after urination"
    ],
    mind: [
      "Apathy and disinclination to any exertion",
      "Irritability, gets angry when talking",
      "Low spirits and weeping tendency"
    ],
    physical: [
      "Swelling of right testicle, highly sensitive to touch",
      "Eczema on face and hands with sticky fluid, burning",
      "Iritation of prostate with frequent urge"
    ],
    modalities: {
      better: ["Open air", "Washing in cold water"],
      worse: ["Warmth of bed", "Night", "Wet weather", "Touch"]
    }
  },
  {
    id: "coccus-cacti",
    name: "Coccus Cacti",
    commonName: "Cochineal",
    family: "Animal",
    keynotes: [
      "Spasmodic cough in quick successions with ropy, sticky phlegm",
      "phlegm hangs in long strings from mouth and nose",
      "Tickling in throat-fit like a feather, triggering cough",
      "Kidney pains (renal colic) with brick-dust sediment in urine"
    ],
    mind: [
      "Sadness and heavy depression, worse in morning",
      "Anxious first thing on waking",
      "Irritable about minor noises"
    ],
    physical: [
      "Cough ending in vomiting of clear sticky mucus",
      "Menses early with large black clots and thick flow",
      "Urination painful with constant cutting urge"
    ],
    modalities: {
      better: ["Washing in cold water", "Cool open air", "Drinking cold water"],
      worse: ["Warm room", "Heat of stove", "After sleep", "Around 11 PM"]
    }
  },
  {
    id: "coca-erythroxylon",
    name: "Coca",
    commonName: "Erythroxylon Coca",
    family: "Plant",
    keynotes: [
      "Mountain sickness; air hunger and headache from high altitude",
      "Shortness of breath on ascending stairs or hills",
      "Violent palpitations with dazed state of mind",
      "Prevents easy muscular fatigue from overexertion"
    ],
    mind: [
      "Melancholy and desire for absolute system isolation",
      "Brain-fag; can only concentrate on physical items",
      "Quiet, refuses to respond to questions"
    ],
    physical: [
      "Pulse rapid, small, and highly compressible",
      "Sleeplessness from least mental excitement or study",
      "Decay of teeth with cold sensitivity"
    ],
    modalities: {
      better: ["Descending hills", "Cold air", "Gentle motion"],
      worse: ["Ascending", "Physical effort", "Cold drafts", "At night"]
    }
  },
  {
    id: "condurango-plant",
    name: "Condurango",
    commonName: "Condor Plant",
    family: "Plant",
    keynotes: [
      "Painful cracks and fissures in angles of mouth",
      "Gastric cancer with vomiting of dark, coffee-ground matter",
      "Stricture of esophagus with severe pain behind sternum on swallowing",
      "Chronic ulcers with burning and jagged margins"
    ],
    mind: [
      "Despondency and deep anxiety over stomach disease",
      "Aversion to any effort, feels highly fatigued",
      "Quiet and reflective"
    ],
    physical: [
      "Vomiting of food immediately after eating, with burning pain",
      "Fissures of anus, painful during defecation",
      "Swelling of lymph nodes with hard centers"
    ],
    modalities: {
      better: ["Rest", "Warm fluids", "Pressure"],
      worse: ["Eating food", "Swallowing", "Cold air"]
    }
  },
  {
    id: "crotalus-horridus",
    name: "Crotalus Horridus",
    commonName: "Timber Rattlesnake",
    family: "Animal",
    keynotes: [
      "Hemorrhagic diathesis; dark fluid blood flows from every orifice",
      "Severest yellow jaundice with rapid liver degeneration",
      "Malignant, septic states with rapid decay of tissues",
      "Sensation of tightness around neck; cannot bear collar or touch"
    ],
    mind: [
      "Loquacity; muttering, dazed delirium in low fevers",
      "Sadness and heavy depression; weeps easily",
      "Suspicious of everyone, refuses medicines"
    ],
    physical: [
      "Epistaxis of non-clotting dark blood; gums bleed easily",
      "Carbuncles with purple surrounding skin and offensive pus",
      "Feculent, dark, bloody stools in low typhoids"
    ],
    modalities: {
      better: ["Light", "Being uncovered", "Quiet"],
      worse: ["Lying on right side", "Spring season", "At sleep", "Touch"]
    }
  },
  {
    id: "croton-tiglium",
    name: "Croton Tiglium",
    commonName: "Croton Oil",
    family: "Plant",
    keynotes: [
      "Stool discharged with a sudden, forceful gush; 'as out of a hydrant'",
      "Swerve skin itching, especially on scrotum, relieved by GENTLE rubbing",
      "Sensation of a thread drawing backward from nipple to spine on nursing",
      "Eczema on face and hands with yellow, oozing vesicles"
    ],
    mind: [
      "Anxious and fearful of minor touch or approach",
      "Irritable, wants to be left alone",
      "Weeping on waking"
    ],
    physical: [
      "Diarrhea starts immediately after eating or drinking least thing",
      "Scrotal swelling with intense burning and drawing pain",
      "Violent coughing on first waking up"
    ],
    modalities: {
      better: ["Gentle rubbing of skin", "Warmth", "Lying down"],
      worse: ["Least eating/drinking", "Touch", "Motion", "Morning"]
    }
  },
  {
    id: "cyclamen-europaeum",
    name: "Cyclamen",
    commonName: "Sow-Bread",
    family: "Plant",
    keynotes: [
      "Dread of fresh air; symptoms are aggravated in wind/cold",
      "Dimness of vision with flickering, stars, or colors before eyes",
      "Weeping, changeable disposition similar to Pulsatilla, but with fear of fresh air",
      "Violent headaches with vertigo, better by cold water on head"
    ],
    mind: [
      "Desire for solitude; keeps all worries to herself",
      "Anxious and tearful; feels as if she has committed a crime",
      "Hysterical mood swings in young gilrs"
    ],
    physical: [
      "Menses profuse, dark, clotted, with labor-like pains",
      "Burning itching on skin, worse at night of old people",
      "Salivation with thick white coating on tongue"
    ],
    modalities: {
      better: ["Moving about", "Rubbing", "Cold water"],
      worse: ["Fresh air", "Rest", "Warm room", "Fat food"]
    }
  },
  {
    id: "dioscorea-villosa",
    name: "Dioscorea",
    commonName: "Wild Yam",
    family: "Plant",
    keynotes: [
      "Severe abdominal colic relieved entirely by bending BACKWARD",
      "Sciatica pain extending from hip down to thigh, better for walking",
      "Pain in liver region extending up to right chest and shoulder",
      "Vivid sexual dreams with nocturnal emissions and weakness"
    ],
    mind: [
      "Extremely irritable; becomes abusive when questioned",
      "Depression; feels weary of life",
      "Aversion to any mental activity"
    ],
    physical: [
      "Spasmodic stretching of limbs with abdominal gas",
      "Stool hot, watery, followed by faintness and rectal pain",
      "Neuralic pain in skull radiating to teeth"
    ],
    modalities: {
      better: ["Bending backward", "Standing erect", "Continuous motion"],
      worse: ["Bending forward", "Sitting", "Lying down", "Midnight"]
    }
  },
  {
    id: "dolichos-pruriens",
    name: "Dolichos",
    commonName: "Cowhage",
    family: "Plant",
    keynotes: [
      "Intense itching of skin without any visible eruption or swelling",
      "Itching is aggravated enormously by warm bath or warmth of bed",
      "Jaundice with clay stools, very dark urine, and unbearable skin itch",
      "Pain in right throat radiating to right ear on swallowing"
    ],
    mind: [
      "Fretful and restless from skin irritation",
      "Anxious first thing in morning",
      "Apathy and loss of memory"
    ],
    physical: [
      "Gums swollen, sore, and painful during teething",
      "Constipation with hard, dry stool, followed by rectal itching",
      "Frequent, thin yellow stool with griping"
    ],
    modalities: {
      better: ["Cold water", "Lying down in cool room"],
      worse: ["Warm bath", "Warmth of bed", "At night", "Scratching"]
    }
  },
  {
    id: "equisetum-hyemale",
    name: "Equisetum",
    commonName: "Horsetail",
    family: "Plant",
    keynotes: [
      "Severe pain and full feeling in bladder NOT relieved by urinating",
      "Constant, burning urge to pass urine, with dribbling of drops",
      "Enuresis (bedwetting) in children with no apparent cause",
      "Urine contains heavy mucus and red sandy sediment"
    ],
    mind: [
      "Fretful and irritable, especially during urinary pain",
      "Despondency and listlessness",
      "Fatigued from lack of sleep"
    ],
    physical: [
      "Extreme tenderness over bladder region to touch",
      "Pruritus of urethra with burning after voiding",
      "Aching pain in loin region radiating to hips"
    ],
    modalities: {
      better: ["Lying down still", "Warm applications"],
      worse: ["Motion", "After urination", "Pressure on bladder"]
    }
  },
  {
    id: "eupatorium-purpureum",
    name: "Eupatorium Purpureum",
    commonName: "Queen of the Meadow",
    family: "Plant",
    keynotes: [
      "Painful irritation of bladder with frequent urge in pregnant women",
      "Deep bone-ache with high fever and severe chills",
      "Urine highly colored, depositing a heavy white clay-like sediment",
      "Chills start in the back and extend upwards to neck"
    ],
    mind: [
      "Highly nervous, easily startled by minor movements",
      "Sighing and weeping disposition",
      "Desire to talk, but loses line of thought"
    ],
    physical: [
      "Dropsy of head and limbs from renal insufficiency",
      "Severe dull backache in lumbar region with urinary pain",
      "Cold sweat on face and chest during fever"
    ],
    modalities: {
      better: ["Urinating", "Warm room", "Eating"],
      worse: ["Damp cold air", "In morning", "Least movement"]
    }
  },
  {
    id: "ferrum-metallicum",
    name: "Ferrum Metallicum",
    commonName: "Metallic Iron",
    family: "Mineral",
    keynotes: [
      "Anemia with sudden blushing and flushing of face from least emotion",
      "Pseudo-plethora; face looks red and healthy but patient is highly anemic",
      "Sensation of a heavy hammer beating in brain, worse on sitting down",
      "Better for gentle, slow walking in open air"
    ],
    mind: [
      "Extremely irritable and sensitive; disputes every opinion",
      "Anxious about health, yet gets cheerful with company",
      "Excitement from music or happy news"
    ],
    physical: [
      "Undigested stools passed immediately after eating least food",
      "Rheumatic shoulder joint pain, worse on raising arm, better for motion",
      "Menses pale, watery, with labor-like pains"
    ],
    modalities: {
      better: ["Gentle walking in open air", "Warmth", "Slow motion"],
      worse: ["Sitting still", "Sudden motion", "At night", "Loss of sleep"]
    }
  },
  {
    id: "helonias-dioica",
    name: "Helonias",
    commonName: "False Unicorn",
    family: "Plant",
    keynotes: [
      "Consciousness of uterus; feels the womb distinctly all the time",
      "Profound mental depression; 'too tired to weep' mood",
      "Severe backache in lumbar region and hips, better for motion",
      "Leucorrhea of thick white curd-like matter with intense vagina itch"
    ],
    mind: [
      "Miserable, irritable, cannot bear contradiction",
      "Cheered and relieved of depression by physical movement/work",
      "Aversion to company, wants to hide away"
    ],
    physical: [
      "Prolapsus uteri with heavy, bearing-down sensation in pelvis",
      "Anemia with dropsical swelling of limbs in young girls",
      "Frequent, pale, heavy urine containing albumin"
    ],
    modalities: {
      better: ["Active motion", "Doing manual work", "Company"],
      worse: ["Rest", "Thinking of symptoms", "Fatigue", "Cold damp"]
    }
  },
  {
    id: "hydrastis-canadensis-root",
    name: "Hydrastis",
    commonName: "Golden Seal",
    family: "Plant",
    keynotes: [
      "Thick, yellowish, ropy, sticky mucous discharges from any outlet",
      "Catarrh of nasal, gastric, and uterine tract with great weakness",
      "Empty, gone, sinking feeling in stomach; not relieved by eating",
      "Stony hard induration of glands, esp. breast tumors"
    ],
    mind: [
      "Extremely depressed; sure she has cancer or incurable disease",
      "Hypochondriacal; complains of constant weakness and stomach pains",
      "Irritable and forgets words"
    ],
    physical: [
      "Constipation with hard, dark, lumpy stools coated in ropy mucus",
      "Thick yellow coating on tongue; shows imprint of teeth",
      "Excoriating, thick yellow leucorrhea with backache"
    ],
    modalities: {
      better: ["Warmth", "Resting in warm bed", "Dry weather"],
      worse: ["Inhaling cold air", "At night", "Washing", "Warm room"]
    }
  },
  {
    id: "iris-versicolor-plant",
    name: "Iris Versicolor",
    commonName: "Blue Flag",
    family: "Plant",
    keynotes: [
      "Burning in entire gastrointestinal tract; 'from mouth to anus'",
      "Migraine with sick headache beginning with a blur before eyes",
      "Vomiting of extremely sour, bitter fluid that burns throat",
      "Periodical sick headache returning every Sunday of hard-workers"
    ],
    mind: [
      "Despondent, gloomy, and highly nervous",
      "Fear of losing mental control",
      "Apathy with disinclination to talk"
    ],
    physical: [
      "Profuse, greasy saliva with burning tongue and gums",
      "Diarrhea watery, green, with severe anus burning",
      "Headache on right side, worse from motion and rest"
    ],
    modalities: {
      better: ["Continuous movement in open air", "Gentle pressure"],
      worse: ["Resting", "In evening", "Least eating/drinking", "Sunlight"]
    }
  },
  {
    id: "lac-defloratum-milk",
    name: "Lac Defloratum",
    commonName: "Skimmed Milk",
    family: "Animal",
    keynotes: [
      "Intense sick headache beginning in forehead and settling in right eye",
      "Obstinate constipation with dry, hard, lumpy stools; requires great effort",
      "Great despondency and fear of death during headache",
      "Loss of milk in nursing mothers with sudden chilliness"
    ],
    mind: [
      "Deep melancholy; does not care whether she lives or dies",
      "Aversion to any conversation or mental effort",
      "Anxious and tearful"
    ],
    physical: [
      "Frequent urination of pale, watery urine during headache",
      "Skin highly sensitive to touch and drafts",
      "Severe nausea with vomiting of bitter bile"
    ],
    modalities: {
      better: ["Lying in dark room", "Hard pressure of head", "Warm wraps"],
      worse: ["Noise", "Light", "Drafts of air", "Motion of eyes"]
    }
  },
  {
    id: "lobelia-inflata-herb",
    name: "Lobelia",
    commonName: "Indian Tobacco",
    family: "Plant",
    keynotes: [
      "Extreme nausea accompanied by cold sweat and extreme physical weakness",
      "Dyspnea aggravated by cold air or slightest muscular effort",
      "Sensation of a lump or weight in center of chest",
      "Gastralgia with dry mouth, roaring in ears, and vertigo"
    ],
    mind: [
      "Fear of death and dazed dazed mental state",
      "Extremely nervous; sighs with every breath",
      "Aversion to speaking or moving"
    ],
    physical: [
      "Vomiting of sour, green fluid with cold forehead",
      "Respiration shallow, fast, with constant sighing",
      "Palpitations with severe sinking feeling in stomach"
    ],
    modalities: {
      better: ["Drinking warm water", "Lying down", "Continuous movement"],
      worse: ["Cold air", "Tobacco smoke", "Least touch", "Afternoon"]
    }
  },
  {
    id: "murex-purpurea-shell",
    name: "Murex",
    commonName: "Purple Murex",
    family: "Animal",
    keynotes: [
      "Extreme sexual excitement in ladies; nymphomania",
      "Severe bearing-down sensation in uterus; must cross legs to prevent prolapse",
      "Sensation of a stitch running upwards from uterus to chest",
      "Leucorrhea watery, greenish, with great weakness in knees"
    ],
    mind: [
      "Lively, overexcited, with rapid emotional transitions",
      "Deep depression during menses; weeps constantly",
      "Anxious about pelvic conditions"
    ],
    physical: [
      "Sensation of dryness and soreness in vagina during rest",
      "Menses early, profuse, with heavy black clots",
      "Aching pain in loin region radiating to thighs"
    ],
    modalities: {
      better: ["Crossing legs", "Hard pressure on abdomen", "Walking"],
      worse: ["Lying down", "Thinking of symptoms", "Resting still"]
    }
  },
  {
    id: "nux-moschata-nut",
    name: "Nux Moschata",
    commonName: "Nutmeg",
    family: "Plant",
    keynotes: [
      "Intense, parchment-like dryness of mouth without any thirst",
      "Absolute sleepiness and irresistible dazed drowsiness",
      "Changeable, hysterical moods (laughter alternating with tears)",
      "Feels as if limbs are made of wood or glass, highly brittle"
    ],
    mind: [
      "Dazed, confused, and highly forgetful; loses track of sentences",
      "Hysterical; laughs at serious things, cries at trivialities",
      "Sensation of floating in the air or being double"
    ],
    physical: [
      "Stomach enormously bloated with gas; food turns into wind",
      "Stool hard, dry, difficult, requiring great effort, even if soft",
      "Dry, hacking cough triggered by getting warm in bed"
    ],
    modalities: {
      better: ["Dry warm weather", "Warm wraps", "Continuous motion"],
      worse: ["Cold damp air", "Drafts", "Getting wet", "Change of weather"]
    }
  },
  {
    id: "petroleum-oil",
    name: "Petroleum",
    commonName: "Rock Oil",
    family: "Mineral",
    keynotes: [
      "Skin fissures and cracks on hands, worse in winter; raw and bleeding",
      "Diarrhea occurring only during daytime; completely absent at night",
      "Nausea and vomiting from riding in carriage, train, or ship",
      "Sensation of coldness in chest and abdomen after eating"
    ],
    mind: [
      "Extremely irritable; gets angry over trivial mistakes",
      "Delirium; thinks another person is lying in bed with him",
      "Anxious and fearful of losing his way"
    ],
    physical: [
      "Eczema on head and neck, thick yellow scales, bleeding easily",
      "Gastralgia relieved completely by eating least dry food",
      "Burning in urethra after micturition"
    ],
    modalities: {
      better: ["Eating dry food", "Warm dry air", "Lying down"],
      worse: ["Winter season", "Riding in carriage", "Getting cold", "Touch"]
    }
  },
  {
    id: "ranunculus-bulbosus-butter",
    name: "Ranunculus Bulbosus",
    commonName: "Bulbous Buttercup",
    family: "Plant",
    keynotes: [
      "Intercostal neuralgia; severe stitching pain in chest walls, worse for breathing",
      "Skin eruptions resembling herpes or shingles; dark blue vesicles",
      "Pain in right shoulder blade, worse from change of weather",
      "Great soreness in muscles of chest, feels bruised and raw"
    ],
    mind: [
      "Extremely irritable and quarrelsome; gets angry easily",
      "Melancholy and sad; weeps in the evening",
      "Dread of being alone, yet avoids friends"
    ],
    physical: [
      "Dry, spasmodic cough with chest stitching",
      "Vesicular herpes on palms and fingers, burning intensely",
      "Gouty joints with severe stinging pains"
    ],
    modalities: {
      better: ["Resting still", "Warmth", "Gentle pressure"],
      worse: ["Breathing/inhaling", "Cold damp weather", "Touch", "Evening"]
    }
  },
  {
    id: "rheum-rhubarb",
    name: "Rheum",
    commonName: "Rhubarb",
    family: "Plant",
    keynotes: [
      "Sour smell of the child; sour breath, sour stool, sour sweat",
      "Screaming, crying child during teething; refuses all toys",
      "Colic in abdomen with sour diarrhea and constant griping",
      "Frequent desire for sour things and cold drinks"
    ],
    mind: [
      "Impatient, fretful, and highly irritable",
      "Child is never satisfied; turns away from everything",
      "Anxious dreams and restless sleep"
    ],
    physical: [
      "Green, sour-smelling stools with severe straining",
      "Face pale, waxy during colic, with cold forehead",
      "Difficulty in teething with swollen gums"
    ],
    modalities: {
      better: ["Warmth of bed", "Wrapping up warm"],
      worse: ["After eating", "Dentition/teething", "Cold air", "Movement"]
    }
  },
  {
    id: "rumex-crispus-dock",
    name: "Rumex",
    commonName: "Yellow Dock",
    family: "Plant",
    keynotes: [
      "Violent, continuous cough triggered by tickling in throat-pit",
      "Cough is aggravated enormously by inhalation of cold air; patient covers head",
      "Sensation of a lump in raw throat-pit, worse on talking",
      "Brownish, watery diarrhea in early morning, driving him from bed"
    ],
    mind: [
      "Extremely irritable, gets angry at minor jokes",
      "Depressed and sad; thinks she will never recover",
      "Aversion to any conversation"
    ],
    physical: [
      "Larynx raw, sore, and highly sensitive to touch",
      "Skin itching on undressing; worse when cold air touches skin",
      "Stomach feels heavy and sour after eating dry bread"
    ],
    modalities: {
      better: ["Covering head, mouth, and neck warm", "Drinking warm water"],
      worse: ["Inhaling cold air", "Undressing", "At night (11 PM)", "Talking"]
    }
  },
  {
    id: "sabadilla-seed",
    name: "Sabadilla",
    commonName: "Cevadilla Seed",
    family: "Plant",
    keynotes: [
      "Sudden, spasmodic fits of violent sneezing, with running nose",
      "Hay fever worse from smell of flowers; throat sore, relieved by warm drinks",
      "Sensation of a thread hanging down the throat, causing ticketing cough",
      "Ailments from intestinal worms, with crawling in anus and nose"
    ],
    mind: [
      "Imagines strange things, such as limbs are shrunk or abdomen is swollen",
      "Melancholy and silent; sits in a corner and refuses to talk",
      "Easily startled by minor sounds"
    ],
    physical: [
      "Coryza with profuse bland discharge and red eyes",
      "Dry, tickling cough in paroxysms, throat red and swollen",
      "Severe pain in frontal sinus with running eyes"
    ],
    modalities: {
      better: ["Warm drinks", "Warm wraps", "Open air"],
      worse: ["Smell of flowers", "Cold air", "At night", "Solitude"]
    }
  },
  {
    id: "selenium-metall",
    name: "Selenium",
    commonName: "Metallic Selenium",
    family: "Mineral",
    keynotes: [
      "Severe hair loss, especially from eyebrows, whiskers, and genitals",
      "Easy mental and physical fatigue from least exertion",
      "Sexual weakness with discharge of prostatic fluid while straining at stool",
      "Impotence with desire; organs relaxed, cold, and slow to respond"
    ],
    mind: [
      "Great mental exhaustion; cannot concentrate or read properly",
      "Despondency and sadness, wishes to lie down always",
      "Forgetfulness, especially of names and dates"
    ],
    physical: [
      "Constipation with dry, hard lumpy stools of enormous size",
      "Sweat smells sweetish, attracting insects",
      "Pains in liver region with yellowish skin"
    ],
    modalities: {
      better: ["Cold water", "Moving in cool air", "Evening"],
      worse: ["Hot weather", "After sleep", "Exertion", "Touch"]
    }
  },
  {
    id: "squilla-maritima-onion",
    name: "Squilla",
    commonName: "Sea Onion",
    family: "Plant",
    keynotes: [
      "Violent, spasmodic cough with involuntary urination or sneezing",
      "Cough is triggered by drinking cold water; rattling chest mucus",
      "Sensation of cold wind in the respiratory tract",
      "Frequent, severe coryza with watery nasal discharge"
    ],
    mind: [
      "Impatient and fretful; gets angry quickly",
      "Depressed, silent, and weeps easily",
      "Aversion to light and noise"
    ],
    physical: [
      "Stitching chest pains, worse for deep breathing",
      "Bladder irritation with frequent involuntary drops",
      "Soreness of trachea after coughing fits"
    ],
    modalities: {
      better: ["Warmth of bed", "Quiet rest"],
      worse: ["Drinking cold water", "In morning on waking", "Motion"]
    }
  },
  {
    id: "syphilinum-nosode",
    name: "Syphilinum",
    commonName: "Syphilitic Nosode",
    family: "Animal",
    keynotes: [
      "Pains increase from sunset to sunrise; worst at midnight",
      "Washing mania; constantly washing hands with soap and water",
      "Profound mental depression; hopeless of recovery, weeps constantly",
      "Severe bone pains, especially in tibiae and skull, worse at night"
    ],
    mind: [
      "Apathy and loss of memory; cannot remember names or places",
      "Severe depression with thoughts of suicide in evening",
      "Fear of going mad or losing control"
    ],
    physical: [
      "Ulceration of throat, palate, and nose with putrid discharge",
      "Chronic, severe constipation with dry hard stools",
      "Rheumatic joints with severe night pains"
    ],
    modalities: {
      better: ["During the day", "Continuous slow motion", "Cold air"],
      worse: ["At night (sunset to sunrise)", "Warmth of bed", "At sea"]
    }
  },
  {
    id: "tellurium-metal",
    name: "Tellurium",
    commonName: "Metallic Tellurium",
    family: "Mineral",
    keynotes: [
      "Offensive discharge from ear, smelling like fish brine",
      "Severe pain in small of back, radiating down left sciatica",
      "Herpetic ringworm eruptions in circular patches on skin",
      "Spine between shoulder blades is extremely sensitive to touch"
    ],
    mind: [
      "Extremely irritable; wants to do something violent when crossed",
      "Dullness of memory; cannot find correct words",
      "Aversion to any mental work"
    ],
    physical: [
      "Ringworm eruptions with intense itching and watery discharge",
      "Congestion of ears with severe shooting pains",
      "Pain in cervical region, worse from turning head"
    ],
    modalities: {
      better: ["Cool open air", "Lying down perfectly still"],
      worse: ["Touch of spine", "At night", "Damp cold weather"]
    }
  },
  {
    id: "terebinthina-oil",
    name: "Terebinthina",
    commonName: "Turpentine",
    family: "Chemical",
    keynotes: [
      "Urine smoky, dark, containing coffee-ground sediment",
      "Severe burning and drawing pain in kidneys, radiating to bladder",
      "Tongue red, dry, and highly polished; 'like glass'",
      "Hemorrhages from every mucous outlet with extreme weakness"
    ],
    mind: [
      "Dullness and apathy; semi-conscious state",
      "Anxiety during urinary retention",
      "Restless dreams with starting up"
    ],
    physical: [
      "Abdomen highly distended with gas; feels like a drum",
      "Hemorrhoidal bleeding with burning rectal pain",
      "Severe respiratory congestion with blood-stained sputum"
    ],
    modalities: {
      better: ["Continuous motion", "Cool air", "Uncovering"],
      worse: ["Lying down still", "Warm applications", "Damp wet weather"]
    }
  },
  {
    id: "valeriana-offic",
    name: "Valeriana",
    commonName: "Valerian",
    family: "Plant",
    keynotes: [
      "Hysteria with wild changeable moods; smiles turn into screams",
      "Sensation of a thread hanging down throat, causing coughing fits",
      "Pains in limbs are worse sitting, better on walking about",
      "Oversensitiveness of all senses; pain feels out of proportion"
    ],
    mind: [
      "Extremely excitable; rapid transition from happiness to deep sadness",
      "Imagines strange things; thinks she is in a different place",
      "Fear of darkness and being alone"
    ],
    physical: [
      "Spasmodic contraction of muscles during sleep",
      "Taste in mouth sour, greasy, with frequent belching",
      "Headache begins with a warm sensation in skull"
    ],
    modalities: {
      better: ["Walking about", "Bending double", "Continuous gentle movement"],
      worse: ["Sitting still", "Resting", "In evening", "Touch"]
    }
  },
  {
    id: "zincum-metallicum-ele",
    name: "Zincum Metallicum",
    commonName: "Metallic Zinc",
    family: "Mineral",
    keynotes: [
      "Ceaseless, fidgety, restless movement of feet",
      "Extreme brain-fag with inability to express thoughts",
      "Twitching and jerking of muscles all over body",
      "Ailments from suppressed skin eruptions; symptoms worsen"
    ],
    mind: [
      "Extremely forgetful; cannot write or speak correctly",
      "Aversion to any mental exertion, gets fatigued immediately",
      "Sighing and screaming from nervous exhaustion"
    ],
    physical: [
      "Neuralgic pains worse sitting, better for active walking",
      "Varicose veins on legs with severe aching and swelling",
      "Difficult urination; must sit or bend backward to void"
    ],
    modalities: {
      better: ["Gentle walking", "Appearance of suppressed eruptions", "Warmth"],
      worse: ["Sitting still", "Mental effort", "After eating least food", "Wine"]
    }
  },
  {
    id: "sabina-plant",
    name: "Sabina",
    commonName: "Savin",
    family: "Plant",
    keynotes: [
      "Active, bright-red uterine hemorrhage with dark clots",
      "Pains run from sacrum extending forward to the pubes",
      "Aggravated enormously by least motion; patient must lie quiet",
      "Gouty and rheumatic tendons with severe burning joint pains"
    ],
    mind: [
      "Hypochondriacal depression with fear of death",
      "Irritable and highly nervous; dislikes music",
      "Tearful, loves dark quiet rooms"
    ],
    physical: [
      "Menses early, profuse, flowing in sudden gushes of hot blood",
      "Leucorrhea is thick, yellowish, starch-like, and highly offensive",
      "Spasmodic toothache worse from warmth of bed"
    ],
    modalities: {
      better: ["Open cool air", "Lying perfectly still on back"],
      worse: ["Least motion", "Warm room", "Warmth of bed", "Touch"]
    }
  },
  {
    id: "secale-cornutum-fungi",
    name: "Secale Cornutum",
    commonName: "Ergot of Rye",
    family: "Fungi",
    keynotes: [
      "Icy coldness of body but cannot tolerate any cover/blankets",
      "Burning sensations in internal parts as if sparks of fire",
      "Dry gangrene and necrosis of extremities (senile gangrene)",
      "Passive hemorrhages of dark, thin, fluid, non-coagulating blood"
    ],
    mind: [
      "Mania with desire to tear things or walk naked",
      "Dullness of senses with fear of death",
      "Sudden anxiety and starting up in sleep"
    ],
    physical: [
      "Severe muscle cramps starting in hands and feet, extending to calves",
      "Extreme prostration and cachexia with senile, wrinkled look",
      "Diarrhea watery, olive green, highly offensive, with cold extremities"
    ],
    modalities: {
      better: ["Cold air", "Being uncovered", "Cold applications"],
      worse: ["Warm applications and wraps", "Heat of stove", "Motion", "Touch"]
    }
  },
  {
    id: "stannum-metallicum-item",
    name: "Stannum Metallicum",
    commonName: "Metallic Tin",
    family: "Mineral",
    keynotes: [
      "Profound weakness in chest; cannot talk or read aloud from chest fatigue",
      "Neuralgic pains that increase gradually, peak, and then slowly decrease",
      "Cough with sweetish, greenish, or salty mucous expectoration",
      "Sensation of emptiness in stomach and abdomen"
    ],
    mind: [
      "Extremely sensitive and weeps when reading or talking",
      "Aversion to company, highly despondent",
      "Loss of memory; cannot find correct words"
    ],
    physical: [
      "Dry bronchial cough ending in sweet mucous vomiting",
      "Severe paralysis of limbs with hand trembling",
      "Leucorrhea profuse, yellow, with extreme physical fatigue"
    ],
    modalities: {
      better: ["Hard pressure on chest/abdomen", "Coughing up expectoration"],
      worse: ["Talking or singing", "Lying on right side", "Warm food"]
    }
  },
  {
    id: "stramonium-plant",
    name: "Stramonium",
    commonName: "Thorn-Apple",
    family: "Plant",
    keynotes: [
      "Terrified child clings to nearest person or weeps on waking",
      "Wild, loquacious mania with desire to escape or talk incessantly",
      "Absolute dread of darkness; craves light and company",
      "Striking painlessness of all physical symptoms, even in severe inflammation"
    ],
    mind: [
      "Delirium with terrifying hallucinations of black dogs or ghosts",
      "Desire to bite, tear bedclothes, or strike people",
      "Lascivious undressing and singing"
    ],
    physical: [
      "Spasmodic throat on trying to swallow liquids; hydrophobia look",
      "Pupils highly dilated and staring; head hot",
      "Stammering speech with dazed look"
    ],
    modalities: {
      better: ["Bright light", "Company", "Warmth", "Lying down"],
      worse: ["Darkness", "Solitude", "Closing eyes", "After sleep"]
    }
  },
  {
    id: "symphytum-officinale-root",
    name: "Symphytum Officinale",
    commonName: "Comfrey",
    family: "Plant",
    keynotes: [
      "Mechanical injuries or blows to eyeball (black eyes / contusions)",
      "Promotes rapid union of fractured bones (non-union or slow healing)",
      "Severe, irritability-inducing bone pain after the reduction of fracture",
      "Pricking, stitching pains in bones when weather changes"
    ],
    mind: [
      "Fretful and irritable from constant bone pain",
      "Lacks confidence in recovery",
      "Restless dreams of danger"
    ],
    physical: [
      "Bruising of periosteum with extreme sensitivity to touch",
      "Injuries to cartilages and ligaments from athletic sprains",
      "Ulceration of bones with discharging sinuses"
    ],
    modalities: {
      better: ["Gentle pressure", "Warmth", "Resting still"],
      worse: ["Touch", "Motion", "Change of weather", "Cold drafts"]
    }
  },
  {
    id: "capsicum-annuum",
    name: "Capsicum Annuum",
    commonName: "Cayenne Pepper / Red Pepper",
    family: "Plant",
    keynotes: [
      "Intense burning and smarting pains, like cayenne pepper on raw parts",
      "Nostalgia (homesickness) accompanied by sleeplessness and red cheeks",
      "Pain in throat-pit on coughing; cough triggers stitching in ears",
      "Constipation with burning in rectum and constant ineffectual strain"
    ],
    mind: [
      "Homesick, melancholic, and tearful with red face",
      "Extremely obstinate; gets angry over major items",
      "Dread of any mental or physical effort"
    ],
    physical: [
      "Coryza with sore nose and burning throat",
      "Severe shivering/chills starting between shoulder blades on drinking water",
      "Swelling of mastoid process behind ear, highly painful to touch"
    ],
    modalities: {
      better: ["Eating dry food", "Warm wrap-up", "Continuous movement"],
      worse: ["Drinking cold water", "Open cold air", "Touch", "On coughing"]
    }
  },
  {
    "id": "aethusa",
    "name": "Aethusa Cynapium",
    "commonName": "Fool's Parsley",
    "family": "Plant",
    "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    "keynotes": [
      "Milk cannot be digested; vomited immediately in large curds",
      "Profound weakness, drowsiness, and prostration after vomiting",
      "Complete absence of thirst",
      "Sunken face with well-marked linea nasalis (white line from nose to mouth)",
      "Inability to think or fix attention; idiotic appearance during illness"
    ],
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
    }
  },
  {
  "id": "ammonium-mur",
  "name": "Ammonium Muriaticum",
  "commonName": "Sal Ammoniac / Ammonium Chloride",
  "family": "Mineral",
  "imageUrl": "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Suited to fat and sluggish patients who have respiratory/liver troubles",
    "Icy coldness between shoulders, not relieved by warm covering",
    "Obstinate constipation, hard crumbling stools, or stools covered with glairy mucus",
    "Free acrid, hot watery discharge from nose corroding the lip"
  ],
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
  }
},
  {
  "id": "cinchona",
  "name": "Cinchona Officinalis",
  "commonName": "Peruvian Bark / China",
  "family": "Plant",
  "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Debility from exhausting discharges, from loss of vital fluids, with nervous erethism",
    "Excessive flatulent distention of the entire abdomen, where belching gives no relief",
    "Extreme sensitiveness to the slightest touch, draft of air, or jar, while hard pressure relieves",
    "Marked periodicity of complaints, with symptoms recurring every other day or at regular intervals"
  ],
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
  }
},
  {
  "id": "cocculus",
  "name": "Cocculus Indicus",
  "commonName": "Indian Cockle",
  "family": "Plant",
  "imageUrl": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Ailments from loss of sleep, night watching, or mental exertion",
    "Extreme aversion to food, where even the smell of food disgusts of it",
    "Sensation of emptiness, hollowness, or weakness in internal organs",
    "All symptoms worse riding in a carriage or on shipboard; seasickness"
  ],
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
  }
},
  {
  "id": "colchicum",
  "name": "Colchicum Autumnale",
  "commonName": "Meadow Saffron",
  "family": "Plant",
  "imageUrl": "https://images.unsplash.com/photo-1550931508-6cca79e4316a?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "The smell of food causes nausea even to fainting, especially fish",
    "Tearing pains in joints, shifting rapidly, worse in evening and night",
    "Affected parts swollen, red, hot, exquisitely sensitive to touch or movement",
    "Great flatulent distention of the abdomen with a cold feeling in the stomach"
  ],
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
  }
},
  {
  "id": "natrum-carb",
  "name": "Natrum Carbonicum",
  "commonName": "Sodium Carbonate",
  "family": "Mineral",
  "imageUrl": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Great debility caused by summer heat, sunstroke, or hot weather",
    "Extreme sensitivity to music, causing sadness, anxiety and weeping",
    "Very weak digestion; slightest error of diet - especially milk - causes diarrhea",
    "Easy dislocation and spraining of ankles; foot bends under"
  ],
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
  }
},
  {
  "id": "podophyllum",
  "name": "Podophyllum Peltatum",
  "commonName": "Mayapple",
  "family": "Plant",
  "imageUrl": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Painless, profuse, offensive, gushing, yellowish-green watery diarrhea",
    "Prolapsus ani, before or during stool, or after least motion",
    "Torpidity of the liver; portal engorgement with jaundice, pain, and fullness",
    "Alternation of headache with diarrhea (when diarrhea stops, headache comes)"
  ],
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
  }
},
  {
  "id": "kali-phos",
  "name": "Kali Phosphoricum",
  "commonName": "Phosphate of Potassium",
  "family": "Mineral",
  "imageUrl": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Conditions arising from want of nerve power, neurasthenia, mental and physical depression",
    "All secretions and excretions are exceptionally foul-smelling, putrid, and dark",
    "Irritable state, with nervous dread and extreme anxiety about health or business",
    "Tension headache of students and those worn out by fatigue, better by gentle motion"
  ],
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
  }
},
  {
  "id": "kali-sulph",
  "name": "Kali Sulphuricum",
  "commonName": "Sulphate of Potassium",
  "family": "Mineral",
  "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Yellow, mucous and serous discharges, profuse and intermittent, from any membrane",
    "Ailments accompanied by profuse desquamation and yellow scaly skin eruptions",
    "Pains or joint soreness of a shifting, wandering character; worse in warm room",
    "Dread of warm room; symptoms are strongly relieved in open cool air"
  ],
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
  }
},
  {
  "id": "natrum-phos",
  "name": "Natrum Phosphoricum",
  "commonName": "Phosphate of Sodium",
  "family": "Mineral",
  "imageUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Thick, moist, golden-yellow or honey-colored coating on the tongue and palate",
    "Excess of acidity, leading to sour eructations, sour vomiting, and sour, greenish diarrhea",
    "Acid-dyspepsia, with burning in stomach and intense heartburn, worse after sugar or milk",
    "Yellow, creamy discharge of matter from the eyes, sealing lids in the morning"
  ],
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
  }
},
  {
  "id": "natrum-sulph",
  "name": "Natrum Sulphuricum",
  "commonName": "Sulphate of Sodium / Glauber's Salt",
  "family": "Mineral",
  "imageUrl": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800",
  "keynotes": [
    "Extreme sensitivity and aggravation from dampness, wet weather, water in any form, or living in damp rooms",
    "Morning diarrhea, driving patient out of bed shortly after rising, with much flatulence",
    "Chronic effects of head injuries, with vertigo, mental troubles, and epilepsy therefrom",
    "Asthma worse with every damp, rainy spell, with rattling of mucus in chest"
  ],
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
  }
},
{
  "id": "convallaria",
  "name": "Convallaria Majalis",
  "commonName": "Lily of the Valley",
  "family": "Liliaceae",
  "dosage": "Tincture to 3X in heart failure. 30C for nervous symptoms.",
  "keynotes": [
    "Heart feels too full; extremely rapid and irregular pulse",
    "Great soreness in the uterine region, with sympathetic heart pains",
    "Hydrothorax and anasarca dependent on heart disease",
    "A constant urge to urinate",
    "Heart's action is weak and irregular"
  ],
  "mind": [
    "Dullness and inability to think",
    "Irritable and easily angered",
    "Depression related to physical weakness"
  ],
  "physical": [
    "Palpitations from least exertion",
    "Dyspnea on lying down; must sit up",
    "Sensation as if the heart ceased beating and then started again",
    "Tobacco heart, especially from cigarettes"
  ],
  "modalities": {
    "better": ["Open air"],
    "worse": ["Warm room", "Lying down", "Exertion"]
  }
},
{
  "id": "crataegus",
  "name": "Crataegus Oxyacantha",
  "commonName": "Hawthorn Berries",
  "family": "Rosaceae",
  "dosage": "Tincture, 5-20 drops in water, three times daily for chronic heart conditions.",
  "keynotes": [
    "A great heart tonic; acts on the muscle of the heart",
    "Heart failure with extreme dyspnea on least exertion",
    "Pulse very feeble, irregular, intermittent",
    "Insomnia of aortic sufferers",
    "Diabetes, especially in children"
  ],
  "mind": [
    "Apprehension and irritability",
    "Despondency about health"
  ],
  "physical": [
    "Extreme dyspnea on least exertion, without much increase in pulse",
    "Cold extremities and blue lips",
    "Pain in region of heart and under left clavicle",
    "Anasarca and edema"
  ],
  "modalities": {
    "better": ["Quiet and rest", "Fresh air"],
    "worse": ["Warm room", "Exertion"]
  }
},
{
  "id": "adonis",
  "name": "Adonis Vernalis",
  "commonName": "Pheasant's Eye",
  "family": "Ranunculaceae",
  "dosage": "5-10 drops of the tincture. 2X or 3X for chronic use.",
  "keynotes": [
    "Valvular insufficiency; heart's action is rapid and irregular",
    "Precordial pain, palpitation, and dyspnea",
    "A great diuretic; increases urine flow in dropsy",
    "Low blood pressure with weak heart"
  ],
  "mind": [
    "Mental depression",
    "Faintness and weakness"
  ],
  "physical": [
    "Oedema and anasarca with heart failure",
    "Mitral and aortic regurgitation",
    "Pulse rapid, irregular, and feeble"
  ],
  "modalities": {
    "better": ["Rest", "Quiet"],
    "worse": ["Exertion"]
  }
},
{
  "id": "naja",
  "name": "Naja Tripudians",
  "commonName": "Cobra Poison",
  "family": "Viperidae",
  "dosage": "6C to 30C and higher.",
  "keynotes": [
    "Valvular heart disease with dry, teasing cough",
    "Heart symptoms with pain in left ovary",
    "Pulse is weak, slow, and irregular",
    "Sensation as if heart and ovary were drawn together"
  ],
  "mind": [
    "Brooding over imaginary troubles",
    "Suicidal melancholy",
    "Fear of being left alone"
  ],
  "physical": [
    "Angina pectoris; pain radiating to left arm",
    "Weight and oppression on the chest",
    "Asthma, cardiac in origin"
  ],
  "modalities": {
    "better": ["Walking in open air", "Lying on right side"],
    "worse": ["Sleep", "Lying on left side", "Cold", "Damp"]
  }
},
{
  "id": "viscum",
  "name": "Viscum Album",
  "commonName": "Mistletoe",
  "family": "Loranthaceae",
  "dosage": "Tincture to 30C.",
  "keynotes": [
    "Hypertrophy with valvular insufficiency",
    "Pulse is slow, full, and bounding",
    "Epileptiform vertigo",
    "Weight and oppression in the heart region"
  ],
  "mind": [
    "Drowsy and stupid",
    "Depressed"
  ],
  "physical": [
    "Rheumatic pains in all parts of the body",
    "Dyspnea on exertion",
    "Sensation as if a hand were squeezing the heart"
  ],
  "modalities": {
    "better": ["Quiet"],
    "worse": ["Winter", "Cold", "Movement"]
  }
},
{
  "id": "strophanthus",
  "name": "Strophanthus Hispidus",
  "commonName": "Kombe Seed",
  "family": "Apocynaceae",
  "dosage": "Tincture, 1-10 drops. 3X for long term use.",
  "keynotes": [
    "A heart tonic; increases the systolic contraction",
    "Edema of the lungs and cardiac dropsy",
    "Pulse is rapid, small, and irregular",
    "Better for old age heart failure"
  ],
  "mind": [
    "Anxious and fearful",
    "Nervousness"
  ],
  "physical": [
    "Dyspnea, especially on ascending",
    "Exophthalmic goiter with heart symptoms",
    "Pruritus of the skin in heart diseases"
  ],
  "modalities": {
    "better": ["Fresh air", "Rest"],
    "worse": ["Exertion", "Alcohol", "Tobacco"]
  }
},
{
  "id": "kalmia",
  "name": "Kalmia Latifolia",
  "commonName": "Mountain Laurel",
  "family": "Ericaceae",
  "dosage": "1X to 30C.",
  "keynotes": [
    "Rheumatism and heart complaints; pains shift rapidly",
    "Heart's action is very slow, with great weakness",
    "Neuralgia; pains are sharp, tearing, and move downwards",
    "Hypertrophy of the heart with palpitation"
  ],
  "mind": [
    "Anxious and fearful",
    "Mental confusion"
  ],
  "physical": [
    "Sharp, stitching pains in the heart, extending to the left shoulder",
    "Pulse is slow, feeble, and sometimes irregular",
    "Numbness and coldness of the left arm"
  ],
  "modalities": {
    "better": ["Lying on right side", "Eating"],
    "worse": ["Motion", "Leaning forward", "Lying on left side"]
  }
},
{
  "id": "latrodectus",
  "name": "Latrodectus Mactans",
  "commonName": "Black Widow Spider",
  "family": "Araneae",
  "dosage": "3C to 30C.",
  "keynotes": [
    "A great remedy for Angina Pectoris; violent precordial pain",
    "Pain radiates to the left arm and hand, which feel numb",
    "Extreme anxiety and fear of death",
    "Skin is cold as ice; gasping for breath"
  ],
  "mind": [
    "Extreme anxiety and fear",
    "Restlessness"
  ],
  "physical": [
    "Violent, sharp, stinging pain in the heart region",
    "Pulse is thready, weak, and rapid",
    "Sensation of a tight band around the chest"
  ],
  "modalities": {
    "better": ["Quiet", "Stillness"],
    "worse": ["Motion", "Least exertion"]
  }
},
{
  "id": "secale",
  "name": "Secale Cornutum",
  "commonName": "Ergot of Rye",
  "family": "Fungi",
  "dosage": "1X to 30C.",
  "keynotes": [
    "Coldness of the body, yet cannot bear to be covered",
    "Hemorrhages; blood is thin, dark, and persistent",
    "Gangrene and ulcers, better from cold applications",
    "Thin, scrawny, withered appearance of the patient"
  ],
  "mind": [
    "Anxious and fearful",
    "Delirium with tendency to tear things"
  ],
  "physical": [
    "Burning pains in all parts, as if sparks of fire were falling",
    "Icy coldness of the skin, yet hates warmth",
    "Cramps in the hands and feet"
  ],
  "modalities": {
    "better": ["Cold applications", "Uncovering", "Rubbing"],
    "worse": ["Warmth", "Wrapping up", "Hot applications"]
  }
},
{
  "id": "lycopus",
  "name": "Lycopus Virginicus",
  "commonName": "Bugleweed",
  "family": "Labiatae",
  "dosage": "Tincture to 3X.",
  "keynotes": [
    "A heart sedative; lowers the blood pressure and pulse rate",
    "Exophthalmic goiter with cardiac symptoms",
    "Heart's action is rapid, tumultuous, and irregular",
    "Hemorrhages from the lungs with heart disease"
  ],
  "mind": [
    "Anxious",
    "Depressed"
  ],
  "physical": [
    "Precordial pain with great oppression",
    "Palpitations from least exertion or emotion",
    "Weakness and dizziness"
  ],
  "modalities": {
    "better": ["Lying down on right side"],
    "worse": ["Motion", "Excitement"]
  }
}
];
