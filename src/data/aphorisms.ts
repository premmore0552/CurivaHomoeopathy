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
    quoted: "If the physician clearly perceives what is to be cured in diseases... if he clearly perceives what is curative in medicines... and if he knows how to adapt, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient... then he understands how to treat judiciously and rationally, and he is a true practitioner of the healing art."
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
    id: 7,
    text: "The totality of symptoms is the only guide to the choice of the remedy.",
    theme: 'Logic',
    quoted: "In a word, the totality of the symptoms must be the principal, indeed the only thing the physician has to take note of in every case of disease and to remove by means of his art, in order that it shall be cured and transformed into health."
  },
  {
    id: 8,
    text: "If the symptoms are removed, the disease is cured.",
    theme: 'Clinical',
    quoted: "It is not conceivable, nor can it be proved by any experience in the world, that, after removal of all the symptoms of the disease and of the entire collection of the perceptible phenomena, there should or could remain anything else besides health."
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
    id: 11,
    text: "The spiritual vital force is primarily deranged in disease.",
    theme: 'VitalForce',
    quoted: "When a person falls ill, it is only this spiritual, self-acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic influence upon it of a morbific agent inimical to life."
  },
  {
    id: 12,
    text: "The vital force expresses its derangement through symptoms.",
    theme: 'VitalForce',
    quoted: "It is only the spiritual vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease."
  },
  {
    id: 13,
    text: "Disease is not a material object but a dynamic derangement.",
    theme: 'VitalForce',
    quoted: "Therefore disease... is not a something separate from the living whole... it is not (as the old school imagined) a thing... but a dynamic derangement of the vital force."
  },
  {
    id: 26,
    text: "The Nature's Law of Cure: A weaker dynamic affection is permanently extinguished by a stronger similar one.",
    theme: 'Logic',
    quoted: "A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (whilst differing in kind) is very similar to it in its manifestations."
  },
  {
    id: 27,
    text: "The curative power of medicines depends on their symptoms being similar to the disease.",
    theme: 'Therapeutics',
    quoted: "The curative power of medicines, therefore, depends on their symptoms, which are similar to the disease but superior to it in strength, so that each individual case of disease is most surely, radically, rapidly and permanently annihilated and removed only by a medicine capable of producing (in the human system) in the most similar and complete manner the totality of its symptoms."
  },
  {
    id: 28,
    text: "Scientific explanation of why similarity cures.",
    theme: 'Logic',
    quoted: "As this natural law of cure manifests itself in every pure experiment and every true observation in the world, the fact is consequently established; it matters little what may be the scientific explanation of how it takes place."
  },
  {
    id: 29,
    text: "The disease is dynamic, and the medicine acts dynamically on the vital force.",
    theme: 'VitalForce',
    quoted: "As every disease (not strictly belonging to the domain of surgery) depends solely on a peculiar morbid derangement of our vital force... so in every homoeopathic cure this vital force... is dynamically affected by the medicine."
  },
  {
    id: 50,
    text: "Nature itself is a poor healer compared to the homeopathic art.",
    theme: 'Logic',
    quoted: "Great is the difference between the accidental and unskillful clinical results of nature and the steady, certain, and scientific results of the medicinal art of homoeopathy."
  },
  {
    id: 71,
    text: "The three points necessary for curing.",
    theme: 'Clinical',
    quoted: "As it is now no longer a matter of doubt that the diseases of mankind consist merely of groups of certain symptoms... it follows that the business of the physician is: 1) To investigate the disease; 2) To investigate the effects of medicines; 3) To apply the medicines to the disease."
  },
  {
    id: 72,
    text: "General view of diseases: Acute and Chronic.",
    theme: 'ChronicDisease',
    quoted: "The diseases to which man is liable are either rapid morbid processes... (acute); or they are diseases of such a character that... dynamically derange the living organism (chronic)."
  },
  {
    id: 80,
    text: "Psora is the true fundamental cause of most chronic diseases.",
    theme: 'ChronicDisease',
    quoted: "Psora is the real fundamental cause and generator of all the other many formless diseases... which constitute the true natural chronic diseases."
  },
  {
    id: 83,
    text: "Requirements for case taking: Freedom from prejudice and sound senses.",
    theme: 'Clinical',
    quoted: "This individualizing examination of a case of disease... demands of the physician nothing but freedom from prejudice and sound senses, attention in observing and fidelity in tracing the picture of the disease."
  },
  {
    id: 104,
    text: "The record of the case ensures the choice of the remedy.",
    theme: 'Clinical',
    quoted: "When the totality of the symptoms that specially mark and distinguish the case of disease... has been once accurately sketched out, the difficulty of the task is half overcome."
  },
  {
    id: 105,
    text: "The search for the specific medicinal powers of medicines: Drug Proving.",
    theme: 'DrugProving',
    quoted: "The whole pathogenetic effects of the several medicines must be known... before we can hope to be able to find among them... the homoeopathic remedies appropriate to the cure of the several natural diseases."
  },
  {
    id: 111,
    text: "Medicines act according to fixed, eternal laws of nature.",
    theme: 'DrugProving',
    quoted: "The agreement of my observations on the pure effects of medicines... with those of older authors... shows that medicinal substances... act according to fixed, eternal laws of nature."
  },
  {
    id: 118,
    text: "Each medicine has a special and unique action.",
    theme: 'DrugProving',
    quoted: "Every medicine exhibits peculiar actions on the human frame, which are not produced in exactly the same manner by any other medicinal substance of a different kind."
  },
  {
    id: 119,
    text: "Similar medicines do not act identically.",
    theme: 'DrugProving',
    quoted: "As certainly as every species of plant differs in its external form, mode of life and growth, its taste and smell from every other species... so certainly do they all differ from one another in their pathogenetic effects."
  },
  {
    id: 141,
    text: "The best provings are those made by the physician on himself.",
    theme: 'DrugProving',
    quoted: "But the most appropriate person for this purpose is the healthy, unprejudiced and sensitive physician himself."
  },
  {
    id: 147,
    text: "The specific remedy is the one that corresponds most closely to the totality of symptoms.",
    theme: 'Therapeutics',
    quoted: "Whichever of these medicines has been found to contain in the symptoms produced by it on healthy bodies the greatest similarity to the totality of the symptoms of a given natural disease... this medicine will and must be the most suitable... it is the specific remedy in this case of disease."
  },
  {
    id: 153,
    text: "Characteristic symptoms are the most important for the choice of the remedy.",
    theme: 'Logic',
    quoted: "In this search for a homoeopathic specific remedy... the more striking, singular, uncommon and peculiar (characteristic) signs and symptoms of the case of disease should bear the closest similarity to the chosen medicine."
  },
  {
    id: 154,
    text: "The most similar remedy cures without significant suffering.",
    theme: 'Therapeutics',
    quoted: "The most similar remedy... cures the natural disease without any of its symptoms being significantly increased... any slight homeopathic aggravation is a sign of a good choice."
  },
  {
    id: 161,
    text: "Homeopathic aggravation explained.",
    theme: 'Therapeutics',
    quoted: "This slight homeopathic aggravation during the first hours is a very good prognostic that the acute disease will probably yield to the first dose."
  },
  {
    id: 210,
    text: "Mental diseases are also subject to the same laws of cure.",
    theme: 'Clinical',
    quoted: "Of all the diseases that attack the human system, there are none so remarkable for their variety and for the difficulty of their treatment as the many types of mental diseases... which are however also subject to the same laws of cure."
  },
  {
    id: 211,
    text: "The state of the patient's mind is of the first importance in case taking.",
    theme: 'Clinical',
    quoted: "This holds good to such an extent, that the state of the disposition of the patient often chiefly determines the selection of the homoeopathic remedy, as being a decidedly characteristic symptom."
  },
  {
    id: 245,
    text: "The repetition of the dose according to the new method (6th Edition).",
    theme: 'Therapeutics',
    quoted: "In both cases (acute and chronic)... every perceptibly progressive and strikingly increasing amelioration during treatment is a condition which, as long as it lasts, completely precludes every repetition of the administration of any medicine whatsoever."
  },
  {
    id: 246,
    text: "Shortening the time of cure by repeated doses (50-millesimal).",
    theme: 'Therapeutics',
    quoted: "But if the medicine be chosen with every regard to its homoeopathic similarity... and if the degree of its potency be properly modified... then the cure of even the most chronic diseases may be remarkably shortened."
  },
  {
    id: 269,
    text: "The process of potentization of medicines: Dynamization.",
    theme: 'Therapeutics',
    quoted: "The homoeopathic system of medicine develops for its use... the spirit-like medicinal powers... by means of a process peculiar to it (friction and succussion)."
  },
  {
    id: 270,
    text: "Preparation of LM (50-millesimal) potencies.",
    theme: 'Therapeutics',
    quoted: "In order to best obtain this development of power, a small part of the substance... is dissolved in 100 drops of diluted alcohol... giving it 100 strong succussions... This is the 50-millesimal scale."
  },
  {
    id: 272,
    text: "Only one single medicine at a time.",
    theme: 'Logic',
    quoted: "In no case of cure is it requisite to employ more than one single, simple medicinal substance at a time."
  },
  {
    id: 273,
    text: "Complexity of mixtures is avoided.",
    theme: 'Logic',
    quoted: "It is not permissible to employ more than one single medicine at a time... It is inconceivable how the slightest doubt can exist as to whether it is more in according with nature... to prescribe only a single well-known remedy at one time."
  },
  {
    id: 280,
    text: "The sensitivity of the patient to the dose.",
    theme: 'Clinical',
    quoted: "The dose of the homeopathically selected remedy can never be prepared so small that it shall not be stronger than the natural disease and able to diminish, or even to cure it."
  },
  {
    id: 284,
    text: "Internal and external application of medicines.",
    theme: 'Therapeutics',
    quoted: "In addition to the internal administration of medicines, the external application... is only admissible when the disease is purely local."
  },
  {
    id: 288,
    text: "Mesmerism (Animal Magnetism).",
    theme: 'Clinical',
    quoted: "I find it necessary to say here a few words about mesmerism... a marvelous gift of God... which can dynamically flow into the patient's system."
  },
  {
    id: 289,
    text: "Positive and negative mesmerism.",
    theme: 'Clinical',
    quoted: "Mesmerism may be applied in two ways: one is the positive, which is the most common... the other is the negative, which is useful in cases of over-excitement."
  },
  {
    id: 290,
    text: "Massage and its role in healing.",
    theme: 'Clinical',
    quoted: "The various ways of applying it to the human body... massage... is of great service in the restoration of health."
  },
  {
    id: 291,
    text: "Baths and hygiene in homoeopathy.",
    theme: 'Clinical',
    quoted: "The use of baths, of various temperatures... and of hygiene in general... are valuable adjuncts to the homoeopathic treatment."
  }
];
