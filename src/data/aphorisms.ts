export interface Aphorism {
  id: number;
  text: string;
  theme: 'Logic' | 'VitalForce' | 'DrugProving' | 'ChronicDisease' | 'Therapeutics' | 'Clinical';
  quoted: string;
}

export const aphorisms: Aphorism[] = [
  {
    id: 1,
    text: "The physician's high and only mission is to restore the sick to health.",
    theme: 'Clinical',
    quoted: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed."
  },
  {
    id: 2,
    text: "The highest ideal of cure is rapid, gentle and permanent restoration of the health.",
    theme: 'Clinical',
    quoted: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles."
  },
  {
    id: 3,
    text: "The physician must perceive what is to be cured in diseases, and what is curative in medicines.",
    theme: 'Logic',
    quoted: "If the physician clearly perceives what is to be cured in diseases, that is to say, in every individual case of disease (knowledge of disease, indication)... if he clearly perceives what is curative in medicines, that is to say, in each individual medicine (knowledge of medical powers)..."
  },
  {
    id: 4,
    text: "The physician is likewise a preserver of health if he knows the things that derange health and how to remove them.",
    theme: 'Clinical',
    quoted: "He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health."
  },
  {
    id: 5,
    text: "The physician should search for the fundamental cause of a chronic disease and the exciting cause of acute disease.",
    theme: 'ChronicDisease',
    quoted: "Useful to the physician in assisting him to cure are the particulars of the most probable exciting cause of the acute disease, as also the most significant points in the whole history of the chronic disease, to enable him to discover its fundamental cause, which is generally due to a chronic miasm."
  },
  {
    id: 6,
    text: "The unprejudiced observer takes note of nothing in every individual disease, except the changes in the health of the body and of the mind.",
    theme: 'Logic',
    quoted: "The unprejudiced observer... takes note of nothing in every individual disease, except the changes in the health of the body and of the mind... (symptoms) which can be perceived externally by means of the senses."
  },
  {
    id: 9,
    text: "The spiritual vital force rules with unbounded sway in health.",
    theme: 'VitalForce',
    quoted: "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions."
  },
  {
    id: 10,
    text: "The material organism without the vital force is capable of no sensation.",
    theme: 'VitalForce',
    quoted: "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation; it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital principle) which animates the material organism in health and in disease."
  },
  {
    id: 26,
    text: "A weaker dynamic affection is permanently extinguished by a stronger similar one.",
    theme: 'Logic',
    quoted: "A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (whilst differing in kind) is very similar to it in its manifestations."
  },
  {
    id: 72,
    text: "General view of diseases: Acute and Chronic.",
    theme: 'ChronicDisease',
    quoted: "With respect to the first point, the following will serve as a general view. The diseases to which man is liable are either rapid morbid processes of the abnormally deranged vital force (acute)... or they are diseases of such a character that, with small, often imperceptible beginnings, dynamically derange the living organism (chronic)."
  },
  {
    id: 105,
    text: "The search for the specific medicinal powers of medicines: Drug Proving.",
    theme: 'DrugProving',
    quoted: "The whole pathogenetic effects of the several medicines must be known; that is to say, all the morbid symptoms and alterations in the health that each of them is especially capable of developing in the healthy individual must be first observed, before we can hope to be able to find among them, and to select, the homoeopathic remedies appropriate to the cure of the several natural diseases."
  },
  {
    id: 141,
    text: "The best provings are those which the physician makes on himself.",
    theme: 'DrugProving',
    quoted: "The best provings are those which the healthy, unprejudiced and sensitive physician makes on himself with all the caution and care here enjoined; he knows with the greatest certainty that which he has himself experienced."
  },
  {
    id: 153,
    text: "Characteristics for selection: Striking, Singular, Uncommon, Peculiar.",
    theme: 'Logic',
    quoted: "In this search for a homoeopathic specific remedy... the more striking, singular, uncommon and peculiar (characteristic) signs and symptoms of the case of disease are chiefly and almost solely to be kept in view; for it is more particularly these that must correspond with very similar ones in the list of symptoms of the selected medicine, in order that it may constitute the most appropriate remedy for effecting a cure."
  },
  {
    id: 210,
    text: "Mental diseases are in reality corporeal diseases.",
    theme: 'Clinical',
    quoted: "Of one-sided diseases, the so-called mental diseases form a major class. Almost all so-called mental and emotional diseases are in reality nothing more than corporeal diseases in which the symptom of the derangement of the mind and disposition peculiar to each case increased, whilst the corporeal symptoms declined (until they at length attain the most striking one-sidedness), almost as a local disease... into the corporeal, invisibly fine mental or emotional organs."
  },
  {
    id: 246,
    text: "Treatment of chronic diseases (6th Edition): 50-millesimal scale.",
    theme: 'Therapeutics',
    quoted: "In the 6th edition, that the remedy may be as little as possible liable to these primary actions... it is best to administer it in a form that is most delicate and powerful... this is best accomplished by means of the new dynamic process (LM scales)."
  },
  {
    id: 270,
    text: "Preparation of medicines (Potentization).",
    theme: 'Therapeutics',
    quoted: "In order to best obtain this development of power, a small part of the substance to be dynamized... is succussed or triturated in a specific ratio."
  },
  {
    id: 273,
    text: "The Single Remedy Rule.",
    theme: 'Therapeutics',
    quoted: "In no case is it requisite to administer more than one single, simple medicinal substance at one time."
  },
  {
    id: 280,
    text: "The dose of the homeopathically selected remedy can never be prepared so small that it shall not be stronger than the natural disease.",
    theme: 'Therapeutics',
    quoted: "The dose of the homeopathically selected remedy can never be prepared so small that it shall not be stronger than the natural disease and able to diminish, or even to cure it, at least in part, as long as it is capable of causing some, though but a slight preponderance of its own symptoms over those of the disease similar to it."
  }
];
