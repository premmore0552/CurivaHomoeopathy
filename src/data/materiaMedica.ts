export interface RemedyDetail {
  id: string;
  name: string;
  commonName: string;
  family: string;
  imageUrl?: string;
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
    keynotes: [
      "Sudden onset of symptoms",
      "Great anxiety and fear of death",
      "Intolerable pains",
      "Restlessness"
    ],
    mind: [
      "State of fear and anxiety; predicts the hour of death",
      "Physical and mental restlessness",
      "Oversensitivity to light and noise"
    ],
    physical: [
      "Fever with dry, hot skin and red face",
      "Tingling, coldness and numbness",
      "Thirst for large quantities of cold water"
    ],
    modalities: {
      better: ["Open air", "Rest"],
      worse: ["Dry, cold winds", "Around midnight", "Music", "Tobacco smoke"]
    }
  },
  {
    id: "arnica",
    name: "Arnica Montana",
    commonName: "Leopard's Bane",
    family: "Compositae",
    imageUrl: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Bruised, sore feeling all over",
      "Aversion to being touched",
      "Head hot, body cool",
      "Results of trauma/injury"
    ],
    mind: [
      "Says there is nothing the matter with him",
      "Fear of being touched or approached",
      "Stupor from head injury"
    ],
    physical: [
      "Ecchymosis and hemorrhages",
      "Soreness of parts after overexertion",
      "Offensive breath and sweat"
    ],
    modalities: {
      better: ["Lying down with head low"],
      worse: ["Least touch", "Motion", "Damp builds", "Cold"]
    }
  },
  {
    id: "arsenicum-album",
    name: "Arsenicum Album",
    commonName: "White Oxide of Arsenic",
    family: "Mineral",
    imageUrl: "https://images.unsplash.com/photo-1635349704207-66a93322108b?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Burning pains relieved by heat",
      "Great prostration and weakness",
      "Anxiety about health",
      "Thirst for small sips of water frequently"
    ],
    mind: [
      "Fastidious; wants everything in its place",
      "Fear of death and being alone",
      "Despair of recovery"
    ],
    physical: [
      "Thin, acrid, excoriating discharges",
      "Periodicity of symptoms",
      "Worse after midnight (1-2 AM)"
    ],
    modalities: {
      better: ["Heat", "Hot drinks", "Head elevated"],
      worse: ["Wet weather", "After midnight", "Cold food and drinks"]
    }
  },
  {
    id: "belladonna",
    name: "Belladonna",
    commonName: "Deadly Nightshade",
    family: "Solanaceae",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Sudden, violent onset",
      "Redness, heat, and burning",
      "Throbbing pains",
      "Dilated pupils"
    ],
    mind: [
      "Hallucinations; sees monsters and animals",
      "Desire to bite and strike",
      "Acuteness of all senses"
    ],
    physical: [
      "Hot head with cold feet",
      "Right-sided symptoms",
      "Congestion of blood to parts"
    ],
    modalities: {
      better: ["Leaning against something", "Semi-erect posture"],
      worse: ["Touch", "Noise", "Light", "Lying down", "Jarring"]
    }
  },
  {
    id: "bryonia",
    name: "Bryonia Alba",
    commonName: "White Bryony",
    family: "Cucurbitaceae",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf914b9c1d?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Worse from least motion",
      "Better from absolute rest and pressure",
      "Great dryness of mucous membranes",
      "Irrability and desire for quiet"
    ],
    mind: [
      "Talks about business especially in delirium",
      "Desires to go home",
      "Very irritable; wants to be left alone"
    ],
    physical: [
      "Stitching pains",
      "Great thirst for large amounts of cold water",
      "Hard, dry stool like burnt"
    ],
    modalities: {
      better: ["Absolute rest", "Pressure", "Lying on painful side"],
      worse: ["Least motion", "Exertion", "Touch", "Warmth"]
    }
  },
  {
    id: "calc-carb",
    name: "Calcarea Carbonica",
    commonName: "Oyster Shell",
    family: "Animal (Calcium)",
    imageUrl: "https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=800",
    keynotes: [
      "Fair, fat, and flabby",
      "Easily chilled and breaks into sweat",
      "Sweat on head, especially during sleep",
      "Craves eggs and indigestible things"
    ],
    mind: [
      "Apprehensive; fears losing reason or being observed",
      "Slow and sluggish mentally",
      "Forgetful"
    ],
    physical: [
      "Cold, damp feet",
      "Swollen glands",
      "Sour smelling body and discharges"
    ],
    modalities: {
      better: ["Dry weather", "Lying on painful side"],
      worse: ["Damp builds", "Cold air", "Ascending", "Physical exertion"]
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
      "Stinging, burning pains",
      "Edema and puffiness under eyes",
      "Thirstlessness",
      "Better from cold applications"
    ],
    mind: [
      "Jealous and irritable",
      "Awkwardness; drops things",
      "Busy, restless state"
    ],
    physical: [
      "Swellings after stings or infections",
      "Ovaritis (right-sided)",
      "High-pitched screeching during sleep"
    ],
    modalities: {
      better: ["Cold air", "Cold water", "Uncovering"],
      worse: ["Heat", "Touch", "Pressure", "After sleep"]
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
      "Acrid nasal discharge, bland lacrimation",
      "Like a long thread pain in nerves",
      "Worse in warm room, better in open air"
    ],
    mind: [
      "Fear of pain",
      "Confused and forgetful"
    ],
    physical: [
      "Spring coryza",
      "Neuralgic pains following amputations",
      "Shooting pains like a thread"
    ],
    modalities: {
      better: ["Open air", "Cold room"],
      worse: ["Evening", "Warm room"]
    }
  },
  {
    id: "aloe",
    name: "Aloe Socotrina",
    commonName: "Socotrine Aloe",
    family: "Liliaceae",
    keynotes: [
      "Insecurity of rectum; 'jelly-like' stools",
      "Gurgling and rumbling in abdomen before stool",
      "Portal congestion",
      "Better from cold water applications"
    ],
    mind: [
      "Dissatisfied and angry about himself",
      "Aversion to mental labor"
    ],
    physical: [
      "Hemorrhoids like a bunch of grapes",
      "Heavy, dragging sensation in pelvis",
      "Headache alternating with diarrhea"
    ],
    modalities: {
      better: ["Cold water", "Open air", "Discharge of flatus"],
      worse: ["Early morning", "Hot weather", "After eating", "Standing"]
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
      "The 'Homeopathic Aspirin'",
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
      "Acute coryza with acrid nasal discharge and bland lachrymation",
      "Spring coryza; after damp north-easterly winds",
      "Intense sneezing on entering a warm room",
      "Neuralgic pains like a long thread"
    ],
    mind: [
      "Very sleepy",
      "Fear that the pain will become unbearable"
    ],
    physical: [
      "Nasal discharge burns the upper lip",
      "Eyes red and watering",
      "Catarrhal laryngitis; cough as if it would tear the larynx"
    ],
    modalities: {
      better: ["Cold room", "Open air"],
      worse: ["Evening", "Warm room"]
    }
  },
  {
    id: "aloe",
    name: "Aloe Socotrina",
    commonName: "Common Aloes",
    family: "Liliaceae",
    keynotes: [
      "Great insecurity of the sphincter ani; feels like stool would escape",
      "Diarrhea drives him out of bed in the morning",
      "Jelly-like mucus in stools",
      "Hemorrhoids like a bunch of grapes; relieved by cold water"
    ],
    mind: [
      "Dissatisfied and angry about himself",
      "Aversion to mental labor"
    ],
    physical: [
      "Abdomen feels bloated, heavy, and hot",
      "Pains around the navel",
      "Headache across forehead, better from cold applications"
    ],
    modalities: {
      better: ["Cold water", "Open air", "Cooling things"],
      worse: ["Early morning", "Hot weather", "After eating or drinking"]
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
  }
];
