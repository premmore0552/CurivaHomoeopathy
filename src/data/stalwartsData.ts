export interface Stalwart {
  id: string;
  name: string;
  title: string;
  years: string;
  description: string;
  contributions: string[];
  imageUrl: string;
  quote?: string;
}

export const stalwartsData: Stalwart[] = [
  {
    id: "hahnemann",
    name: "Samuel Hahnemann",
    title: "Founder of Homoeopathy",
    years: "1755 - 1843",
    description: "Christian Friedrich Samuel Hahnemann was a German physician, best known for creating the system of alternative medicine called homeopathy. He discovery the Law of Similars and authored the Organon of Medicine.",
    contributions: [
      "Discovery of the Law of Similars",
      "Authored the Organon of Medicine",
      "Developed the process of Potentization",
      "Conducted the first drug provings"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Samuel_Hahnemann_portrait.jpg/800px-Samuel_Hahnemann_portrait.jpg",
    quote: "Aude Sapere (Dare to be wise)."
  },
  {
    id: "boenninghausen",
    name: "Clemens von Bönninghausen",
    title: "The Pioneer of Repertory",
    years: "1785 - 1864",
    description: "A close friend of Hahnemann, he was a lawyer and botanist before becoming a homeopath. He developed the first reliable repertory and the Doctrine of Analogies.",
    contributions: [
      "Created the Therapeutic Pocketbook",
      "Developed the Doctrine of Analogies",
      "Emphasized the importance of Modalities and Concomitants"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Clemens_Maria_Franz_von_B%C3%B6nninghausen.jpg",
    quote: "The totality of symptoms is the only guide to the remedy."
  },
  {
    id: "hering",
    name: "Constantine Hering",
    title: "The Father of American Homoeopathy",
    years: "1800 - 1880",
    description: "Originally tasked with writing a book to disprove homeopathy, he became its greatest advocate instead after a personal cure. He is famous for Hering's Law of Cure.",
    contributions: [
      "Hering's Law of Cure",
      "Proved Lachesis and many other remedies",
      "Founded the first homeopathic medical college in the US"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Constantine_Hering.jpg/800px-Constantine_Hering.jpg",
    quote: "If I find the truth, I must follow it."
  },
  {
    id: "kent",
    name: "James Tyler Kent",
    title: "The Master of Philosophy",
    years: "1849 - 1916",
    description: "Known for his high-potency practice and deep philosophical insights. His repertory remains one of the most widely used in the world today.",
    contributions: [
      "Authorship of 'Lectures on Homoeopathic Philosophy'",
      "Created the massive Kent's Repertory",
      "Standardized the use of high potencies"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/James_Tyler_Kent.jpg/800px-James_Tyler_Kent.jpg",
    quote: "Treat the patient, not the disease."
  },
  {
    id: "boger",
    name: "C.M. Boger",
    title: "Creator of BBCR",
    years: "1861 - 1935",
    description: "Cyrus Maxwell Boger was an American physician who made significant contributions to the study of Boenninghausen's methods and clinical symptoms.",
    contributions: [
      "Authored Boger Boenninghausen's Characteristics and Repertory (BBCR)",
      "Synoptic Key to the Materia Medica",
      "Developed the concept of the 'Pathological General'"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cyrus_Maxwell_Boger.jpg/640px-Cyrus_Maxwell_Boger.jpg",
    quote: "Individualize each case."
  },
  {
    id: "hughes",
    name: "Richard Hughes",
    title: "The Physiological Schools Advocate",
    years: "1836 - 1902",
    description: "A prominent English homeopath who emphasized the physiological action of drugs and a more scientific approach to Materia Medica.",
    contributions: [
      "Authored 'A Manual of Pharmacodynamics'",
      "Co-editor of the 'Cyclopaedia of Drug Pathogenesy'",
      "Promoted lower potencies and pathological indicators"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Richard_Hughes_%28physician%29.jpg",
    quote: "The pathogenesis is the primary guide."
  },
  {
    id: "allen-tf",
    name: "Timothy Field Allen",
    title: "The Encyclopedia Master",
    years: "1837 - 1902",
    description: "Famous for compiling the ten-volume Encyclopedia of Pure Materia Medica, which remains a cornerstone of homeopathic literature.",
    contributions: [
      "Encyclopedia of Pure Materia Medica",
      "Handbook of Materia Medica and Homoeopathic Therapeutics",
      "Editor of the North American Journal of Homoeopathy"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Timothy_Field_Allen.jpg",
    quote: "Accuracy is the first law of science."
  },
  {
    id: "clarke",
    name: "John Henry Clarke",
    title: "The Dictionary Compiler",
    years: "1853 - 1931",
    description: "A prolific English author and homeopath, known for his 'Dictionary of Practical Materia Medica' and for being a leading figure in the British Homoeopathic Society.",
    contributions: [
      "Dictionary of Practical Materia Medica",
      "The Prescriber",
      "Editor of the Homeopathic World for 25 years"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/John_Henry_Clarke.jpg",
    quote: "Homeopathy is a system of precision."
  },
  {
    id: "nash",
    name: "E.B. Nash",
    title: "The Leader of Leaders",
    years: "1838 - 1917",
    description: "Eugene Beauharnais Nash was an American physician who wrote the classic 'Leaders in Homoeopathic Therapeutics', focusing on keynote symptoms.",
    contributions: [
      "Leaders in Homoeopathic Therapeutics",
      "Regional Leaders",
      "The Testimony of the Clinic"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Eugene_Beauharnais_Nash.jpg",
    quote: "The keynote is the key to the case."
  },
  {
    id: "boericke",
    name: "William Boericke",
    title: "The Pocket Manual Author",
    years: "1849 - 1929",
    description: "Known worldwide for his 'Pocket Manual of Homoeopathic Materia Medica', which is a constant companion for many practitioners.",
    contributions: [
      "Pocket Manual of Homoeopathic Materia Medica",
      "Translated the 6th edition of the Organon",
      "Professor of Materia Medica at the University of California"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/William_Boericke.jpg",
    quote: "The remedy must be known in its clinical context."
  },
  {
    id: "stuart-close",
    name: "Stuart Close",
    title: "The Genius of Homoeopathy",
    years: "1860 - 1929",
    description: "A profound philosopher of homoeopathy who bridged the gap between Hahnemannian principles and modern science in his time.",
    contributions: [
      "Authored 'The Genius of Homoeopathy'",
      "Expert in clinical philosophy",
      "Founder of the New York Homoeopathic Union"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Stuart_Close.jpg/400px-Stuart_Close.jpg",
    quote: "Homoeopathy is the science and art of healing by parallels."
  },
  {
    id: "herbert-roberts",
    name: "Herbert A. Roberts",
    title: "Principles of Homoeopathy",
    years: "1868 - 1950",
    description: "A clear voice in the 20th century who synthesized the principles and art of cure for the modern practitioner.",
    contributions: [
      "Authored 'The Principles and Art of Cure by Homoeopathy'",
      "Editor of 'Homeopathic Recorder'",
      "Developed the concept of the 'Vital Force' in modern terms"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Herbert_A_Roberts.jpg/400px-Herbert_A_Roberts.jpg",
    quote: "The law of cure is absolute."
  },
  {
    id: "margaret-tyler",
    name: "Margaret Tyler",
    title: "The Drug Pictures Master",
    years: "1857 - 1943",
    description: "An English physician who brought vivid life to remedies through her legendary drug pictures, making MM accessible to all.",
    contributions: [
      "Authored 'Homoeopathic Drug Pictures'",
      "Pioneer in high potency prescribing in the UK",
      "Advocated for better education of homoeopaths"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Margaret_Lucy_Tyler.jpg/400px-Margaret_Lucy_Tyler.jpg",
    quote: "Remedies are like people: each has its own character."
  },
  {
    id: "burnett",
    name: "J. Compton Burnett",
    title: "The Organopathy Pioneer",
    years: "1840 - 1901",
    description: "Famous for his 'organopathic' approach and his success in treating complex, localized pathological conditions.",
    contributions: [
      "Authored over 20 specialized monographs",
      "Pioneered the use of Bacillinum and other nosodes",
      "Expert in 'Eight-Day' clinical trials"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/James_Compton_Burnett.jpg/400px-James_Compton_Burnett.jpg",
    quote: "Pathology and homoeopathy are not enemies."
  },
  {
    id: "vithoulkas",
    name: "George Vithoulkas",
    title: "The Modern Stalwart",
    years: "1932 - Present",
    description: "A Right Livelihood Award winner who revitalized classical homoeopathy globally and developed the Levels of Health theory.",
    contributions: [
      "Authored 'The Science of Homoeopathy'",
      "Established the International Academy of Classical Homeopathy",
      "Developed the theory of 'Levels of Health'"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/George_Vithoulkas.jpg/400px-George_Vithoulkas.jpg",
    quote: "Homoeopathy is the medicine of the future."
  }
];
