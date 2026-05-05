
export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Philosophy' | 'Pharmacy' | 'Clinical' | 'Historical';
}

export interface MateriaMedicaConcept {
  title: string;
  summary: string;
  keyPoints: string[];
}

export interface AcademicResource {
  title: string;
  description: string;
  url: string;
  type: 'Journal' | 'Study Material' | 'Database' | 'Academy' | 'Research';
}

export const glossary: GlossaryTerm[] = [
  {
    term: "Similia Similibus Curentur",
    definition: "The fundamental law of Homeopathy, meaning 'let likes be cured by likes'. It states that a substance that can cause symptoms in a healthy person can cure similar symptoms in a sick person.",
    category: 'Philosophy'
  },
  {
    term: "Vital Force",
    definition: "The spirit-like energy that animates the living organism and maintains harmony in all its parts. Disease is seen as a derangement of this vital force.",
    category: 'Philosophy'
  },
  {
    term: "Potentization",
    definition: "The process of preparing homeopathic medicines through serial dilution and succussion (vigorous shaking), which is believed to release the medicinal power of the substance.",
    category: 'Pharmacy'
  },
  {
    term: "Succussion",
    definition: "The act of vigorously shaking a homeopathic solution during the process of potentization.",
    category: 'Pharmacy'
  },
  {
    term: "Miasm",
    definition: "A fundamental susceptibility to disease, often considered a chronic state or 'taint' inherited or acquired, which leads to various pathological manifestations.",
    category: 'Philosophy'
  },
  {
    term: "Psora",
    definition: "According to Hahnemann, the 'mother of all diseases'. It represents a state of functional disturbance and hypersensitivity, typically manifesting as skin eruptions or irritation.",
    category: 'Philosophy'
  },
  {
    term: "Sycosis",
    definition: "The miasm characterized by overgrowth, proliferation, and infiltration (e.g., warts, tumors). It is often associated with the 'gonorrheal' taint.",
    category: 'Philosophy'
  },
  {
    term: "Syphilis",
    definition: "The destructive miasm, characterized by ulceration, decay, and degeneration both physically and mentally.",
    category: 'Philosophy'
  },
  {
    term: "Keynote",
    definition: "A unique, characteristic symptom that strongly indicates a particular remedy in the Materia Medica.",
    category: 'Clinical'
  },
  {
    term: "Modalities",
    definition: "Factors that make a person's symptoms better (amelioration) or worse (aggravation), such as time, position, weather, or temperature.",
    category: 'Clinical'
  },
  {
    term: "Repertory",
    definition: "An index of symptoms and the remedies associated with them, used by practitioners to select the most appropriate homeopathic medicine.",
    category: 'Clinical'
  },
  {
    term: "Aphorism",
    definition: "A concise statement of a principle, specifically referring to the numbered paragraphs in Hahnemann's 'Organon of Medicine'.",
    category: 'Historical'
  },
  {
    term: "Complementary",
    definition: "A remedy that completes the action of another remedy, often used after the previous one has done its work.",
    category: 'Clinical'
  },
  {
    term: "Inimical",
    definition: "Remedies that follow each other poorly or have contradictory actions, potentially causing discomfort if used sequentially.",
    category: 'Clinical'
  },
  {
    term: "Antidote",
    definition: "A substance or remedy that neutralizes the action of a previously administered homeopathic medicine.",
    category: 'Pharmacy'
  },
  {
    term: "Intercurrent",
    definition: "A remedy given to remove a block or a miasmatic taint to pave the way for the indicated simillimum to work more effectively.",
    category: 'Clinical'
  },
  {
    term: "Dynamization",
    definition: "The mathematical process of reducing the material quantity of a substance while increasing its medicinal power through succussion or trituration.",
    category: 'Pharmacy'
  },
  {
    term: "Trituration",
    definition: "The process of rubbing or grinding an insoluble medicinal substance with milk sugar (Lactose) in a mortar and pestle to reduce particle size and release power.",
    category: 'Pharmacy'
  },
  {
    term: "Mother Tincture",
    definition: "The basic alcoholic extract of a medicinal plant or animal substance, from which subsequent dilutions are made.",
    category: 'Pharmacy'
  },
  {
    term: "Centesimal Scale",
    definition: "A scale of potency where each step is a dilution of 1 part medicine to 99 parts vehicle (denoted as C).",
    category: 'Pharmacy'
  },
  {
    term: "Decimal Scale",
    definition: "A scale of potency where each step is a dilution of 1 part medicine to 9 parts vehicle (denoted as X or D).",
    category: 'Pharmacy'
  },
  {
    term: "LM Potency",
    definition: "The 50-millesimal scale introduced in the 6th edition of the Organon, offering moderate action with minimal aggravation.",
    category: 'Pharmacy'
  },
  {
    term: "Individualization",
    definition: "The practice of treating the person rather than the disease name, focusing on the unique set of symptoms presented by that individual.",
    category: 'Philosophy'
  },
  {
    term: "Organon",
    definition: "The book 'Organon of Medicine' by Samuel Hahnemann, outlining the philosophy and principles of Homeopathy.",
    category: 'Historical'
  },
  {
    term: "Peculiar Symptom",
    definition: "A symptom that is rare, strange, or unconventional (PQRS - Peculiar, Queer, Rare, Strange), which is highly valuable for prescription.",
    category: 'Clinical'
  },
  {
    term: "Amelioration",
    definition: "A condition or circumstance that makes a symptom feel better (symbolized as '>').",
    category: 'Clinical'
  },
  {
    term: "Aggravation",
    definition: "A condition or circumstance that makes a symptom feel worse (symbolized as '<').",
    category: 'Clinical'
  },
  {
    term: "Sycotic",
    definition: "Related to the Sycosis miasm, characterized by over-production or excessive growth.",
    category: 'Clinical'
  },
  {
    term: "Constitutional",
    definition: "Relating to the overall physical and mental makeup of a person, used to find a deep-acting remedy for chronic states.",
    category: 'Clinical'
  },
  {
    term: "Proving",
    definition: "A controlled experiment where a substance is given to healthy human 'provers' to record the symptoms it produces.",
    category: 'Philosophy'
  }
];

export const materiaMedicaConcepts: MateriaMedicaConcept[] = [
  {
    title: "The Concept of Totality",
    summary: "Totality of symptoms refers to the complete picture of the patient's state—mental, emotional, and physical—rather than just a single localized symptom.",
    keyPoints: [
      "Includes mind and disposition",
      "Considers peculiar and characteristic symptoms",
      "Forms the basis for the simillimum"
    ]
  },
  {
    title: "Remedy Modalities",
    summary: "Modalities are the modifiers of symptoms. Understanding what worsens or improves a condition is crucial for differentiating between similar remedies.",
    keyPoints: [
      "Aggravations (<): Factors that worsen",
      "Ameliorations (>): Factors that improve",
      "Environmental influences (heat, cold, dampness)"
    ]
  },
  {
    title: "Doctrine of Signatures",
    summary: "An ancient philosophy suggesting that the physical characteristics of a substance in nature give a clue to its medicinal use.",
    keyPoints: [
      "Relates shape, color, or environment to use",
      "Examples: Chelidonium (yellow juice for jaundice)",
      "Used historically to discover new remedy properties"
    ]
  },
  {
    title: "Thermal Relations",
    summary: "The distinction between 'Hot' and 'Chilly' remedies is a fundamental differential point in Materia Medica.",
    keyPoints: [
      "Chilly: Worse for cold, desires warmth",
      "Hot: Worse for heat, desires cool air",
      "Ambi-thermal: Sensitive to both extremes"
    ]
  },
  {
    title: "Miasmatic Classification",
    summary: "Remedies can be classified based on their affinity for specific miasms (Psora, Sycosis, Syphilis).",
    keyPoints: [
      "Psoric remedies: Functional disturbances",
      "Sycotic remedies: Overgrowth and fixed states",
      "Syphilitic remedies: Destruction and decay"
    ]
  },
  {
    title: "Law of Minimum Dose",
    summary: "The principle that only the minimum amount of medicine necessary to trigger a healing response should be used.",
    keyPoints: [
      "Avoids unnecessary aggravation",
      "Uses highly diluted/potentized substances",
      "Stimulates the vital force efficiently"
    ]
  },
  {
    title: "Hering's Law of Cure",
    summary: "Constantine Hering's observations on the direction of healing in a successful homeopathic treatment.",
    keyPoints: [
      "From above downwards",
      "From within outwards",
      "From more important to less important organs",
      "In reverse order of appearance of symptoms"
    ]
  }
];

export const academicLinks: AcademicResource[] = [
  {
    title: "Homeopathy Journal (Faculty of Homeopathy)",
    description: "The primary international peer-reviewed journal dedicated to research in homeopathy.",
    url: "https://www.thieme-connect.com/products/ejournals/journal/10.1055/s-00034911",
    type: 'Journal'
  },
  {
    title: "International Journal of High Dilution Research (IJHDR)",
    description: "Open-access peer-reviewed journal for experimental and theoretical high dilution research.",
    url: "https://www.highdilution.org/index.php/ijhdr",
    type: 'Journal'
  },
  {
    title: "Homeopathy Research Institute (HRI)",
    description: "An international charity providing high-quality scientific research into homeopathy.",
    url: "https://www.hri-research.org/",
    type: 'Research'
  },
  {
    title: "National Center for Homeopathy (NCH)",
    description: "Providing education and advocacy to make homeopathy a household name.",
    url: "https://www.homeopathycenter.org/",
    type: 'Study Material'
  },
  {
    title: "The Vithoulkas Academy",
    description: "The world leader in classical homeopathic training directed by Prof. George Vithoulkas.",
    url: "https://www.vithoulkas.com/",
    type: 'Academy'
  },
  {
    title: "Homeopathy UK Learning Portal",
    description: "Vast collection of articles, study guides, and clinical research for practitioners.",
    url: "https://homeopathy-uk.org/homeopathy-explained/research/",
    type: 'Study Material'
  },
  {
    title: "Encyclopedia Homeopathica (RadarOpus)",
    description: "Comprehensive database for classical texts and modern repertories.",
    url: "https://www.radaropus.com/knowledge-base",
    type: 'Database'
  }
];
