export interface Flashcard {
  term: string;
  subType: "Materia Medica" | "Philosophy & Organon" | "Repertory" | "Pharmacy";
  definition: string;
  clinicalSignificance: string;
}

export const HomoeopathicFlashcards: Flashcard[] = [
  {
    term: "Polychrest Remedy",
    subType: "Materia Medica",
    definition: "A remedy of deep, broad action covering numerous symptoms across multiple systems with extensive provings.",
    clinicalSignificance: "Examples: Sulphur, Lycopodium, Calcarea Carbonica, Pulsatilla. Ideal for constitutional chronic treatment."
  },
  {
    term: "Simillimum",
    subType: "Philosophy & Organon",
    definition: "The most precisely matching Homoeopathic remedy corresponding to the totality of symptoms, initiating a curative reaction.",
    clinicalSignificance: "Requires deep case taking, mental/physical generals evaluation, and repertorization."
  },
  {
    term: "Primary Action",
    subType: "Philosophy & Organon",
    definition: "The immediate, direct effect of an external medicinal substance upon the living organism's Vital Force (Aphorisms 59-63).",
    clinicalSignificance: "Designed to trigger a similar, temporary artificial state, prompting the secondary reaction."
  },
  {
    term: "Secondary Action",
    subType: "Philosophy & Organon",
    definition: "The natural, reactive response of the Vital Force to restore physiological Homoeostasis after a primary action.",
    clinicalSignificance: "Homoeopathic cure relies entirely on this reaction of the vital force clearing symptoms permanently."
  },
  {
    term: "Causa Occasionalis",
    subType: "Philosophy & Organon",
    definition: "The exciting or maintaining cause of a disease, such as poor sanitation, bad habits, or exposure to damp cold.",
    clinicalSignificance: "Must be removed or corrected first before constitutional Homoeopathic remedies can work successfully (Aphorism 7)."
  },
  {
    term: "LM Potency",
    subType: "Pharmacy",
    definition: "Fifty-Millesimal scale of dilution (1:50,000, designated as 0/1, 0/2, etc.) introduced in the 6th edition of Organon.",
    clinicalSignificance: "Allows frequent daily repetition with minimal risk of Homoeopathic aggravation, ideal for hypersensitive chronic cases."
  },
  {
    term: "Keynote",
    subType: "Materia Medica",
    definition: "A peculiar, characteristic, or highly unique symptom of a remedy that serves as a pivotal indicator for its selection.",
    clinicalSignificance: "Introduced by Dr. H.N. Guernsey; simplifies selection by highlighting the most characteristic features."
  },
  {
    term: "Miasm",
    subType: "Philosophy & Organon",
    definition: "A fundamental chronic infectious force or dynamic predisposition underlying all chronic diseases.",
    clinicalSignificance: "The three primary classical miasms identified by Hahnemann are Psora, Sycosis, and Syphilis."
  },
  {
    term: "Psora",
    subType: "Philosophy & Organon",
    definition: "The 'itch miasm', considered by Hahnemann as the mother of all chronic diseases, presenting as functional disturbances and hypersensitivity.",
    clinicalSignificance: "Characterized by functional irritation, dry skin eruptions, physiological deficiency, and anxiety."
  },
  {
    term: "Sycosis",
    subType: "Philosophy & Organon",
    definition: "The 'fig-wart miasm', characterized by excessive proliferation, coordination failures, overgrowth, and fluid retention.",
    clinicalSignificance: "Key remedies: Thuja, Medorrhinum, Natrum Sulphuricum. Indicated in warts, fibroids, and catarrhs."
  },
  {
    term: "Syphilis Miasm",
    subType: "Philosophy & Organon",
    definition: "The destructive chronic miasm, characterized by ulceration, structural disintegration, degeneration, and necrosis.",
    clinicalSignificance: "Key remedies: Mercurius Solubilis, Aurum Metallicum, Syphilinum. Corresponds to structural decay."
  },
  {
    term: "Totality of Symptoms",
    subType: "Philosophy & Organon",
    definition: "The logically organized, complete picture of the patient's devitalized state, including mental, physical, and general characteristics.",
    clinicalSignificance: "The sole guide for selecting the Homoeopathic simillimum, as defined in Aphorism 7."
  },
  {
    term: "Idiosyncrasy",
    subType: "Philosophy & Organon",
    definition: "A highly peculiar, individual hypersensitivity to specific substances or environmental conditions.",
    clinicalSignificance: "Homoeopathic remedies act deeply on idiosyncratic individuals, requiring careful potency selection."
  },
  {
    term: "Drug Proving",
    subType: "Philosophy & Organon",
    definition: "The systematic process of testing medicinal substances on healthy human provers to record their pathogenesis (Aphorisms 105-145).",
    clinicalSignificance: "Provides the raw scientific data for the Homoeopathic Materia Medica."
  },
  {
    term: "Isopathy",
    subType: "Philosophy & Organon",
    definition: "The treatment of disease with the identical causative agent, rather than a similar one (e.g., giving a toxin for the same toxin).",
    clinicalSignificance: "Distinct from Homoeopathy (like cures like); often useful in nosode preparations."
  },
  {
    term: "Nosode",
    subType: "Pharmacy",
    definition: "A Homoeopathic preparation made from diseased tissues, secretions, or bacterial culture isolates.",
    clinicalSignificance: "Examples: Psorinum, Medorrhinum, Tuberculinum, Syphilinum. Used as deep intercurrent remedies."
  },
  {
    term: "Sarcode",
    subType: "Pharmacy",
    definition: "A Homoeopathic preparation derived from healthy animal tissues, endocrine glands, or physiological secretions.",
    clinicalSignificance: "Examples: Thyroidinum, Thyroid extract, Adrenalinum, Cholesterinum."
  },
  {
    term: "Imponderabilia",
    subType: "Pharmacy",
    definition: "Remedies prepared from natural or artificial energy forces, such as magnetism, electricity, X-rays, or sunlight.",
    clinicalSignificance: "Examples: Magnetis Poli Ambo, Sol, X-Ray. Prepared using specialized exposure techniques."
  },
  {
    term: "Succussion",
    subType: "Pharmacy",
    definition: "The systematic mechanical shaking or downward striking of a liquid dilution with a resilient surface to release latent therapeutic energy.",
    clinicalSignificance: "Essential part of the potentisation process for soluble substances."
  },
  {
    term: "Trituration",
    subType: "Pharmacy",
    definition: "The systematic grinding of insoluble crude substances with lactose (sugar of milk) in a mortar and pestle for 1 hour.",
    clinicalSignificance: "Renders insoluble materials soluble up to 3C, after which they can be succussed in liquid form."
  },
  {
    term: "Anamnesis",
    subType: "Philosophy & Organon",
    definition: "The patient's comprehensive medical history, lifestyle profile, and chronic timeline gathered during case taking.",
    clinicalSignificance: "Critical for understanding the evolution of chronic miasmatic diseases."
  },
  {
    term: "Aphorism 26",
    subType: "Philosophy & Organon",
    definition: "The Therapeutic Law of Nature: 'A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter is very similar.'",
    clinicalSignificance: "The natural scientific law upon which the entire practice of Homoeopathic cure is based."
  },
  {
    term: "Doctrine of Signatures",
    subType: "Philosophy & Organon",
    definition: "The ancient belief that the physical appearance, behavior, or habitat of a substance indicates its medicinal utility.",
    clinicalSignificance: "Often provides clinical clues (e.g., Lachesis snake venom and high-speed constriction symptoms), but must always be verified by drug provings."
  },
  {
    term: "Individualization",
    subType: "Philosophy & Organon",
    definition: "The clinical process of identifying what is uniquely characteristic about a particular patient compared to other patients with the same pathology.",
    clinicalSignificance: "Two patients with cholera may receive completely different remedies (e.g., Camphora vs Veratrum Album) based on individualization."
  },
  {
    term: "Genius of Remedy",
    subType: "Materia Medica",
    definition: "The essential spirit, core theme, or general character that unifies all the physical and mental symptoms of a medicine.",
    clinicalSignificance: "Helps the practitioner recognize the remedy in its clinical presentation beyond disconnected symptoms."
  },
  {
    term: "Rubric",
    subType: "Repertory",
    definition: "A standardized symptom heading in a Homoeopathic repertory under which corresponding remedies are indexed.",
    clinicalSignificance: "The structural foundation of repertories, enabling systematic cross-referencing."
  },
  {
    term: "Sub-Rubric",
    subType: "Repertory",
    definition: "A specialized sub-heading that qualifies a primary rubric with specific modalities, times, locations, or side affinities.",
    clinicalSignificance: "E.g., rubric 'Head pain' having a sub-rubric 'warm application relieves' to pinpoint exact matches."
  },
  {
    term: "Grading of Remedies",
    subType: "Repertory",
    definition: "The typographic representation of the frequency and intensity with which a remedy produced or cured a symptom in provings/clinical trials.",
    clinicalSignificance: "In Kent: 1st Grade (Bold = 3 points), 2nd Grade (Italics = 2 points), 3rd Grade (Roman = 1 point)."
  },
  {
    term: "Anacardium Mental State",
    subType: "Materia Medica",
    definition: "A striking mental state of contradiction, characterized by 'having two wills', sudden loss of memory, and extreme cursing tendencies.",
    clinicalSignificance: "Symptoms are temporarily relieved by eating. Essential for psychological disorders and stress."
  },
  {
    term: "Lycopodium Modalities",
    subType: "Materia Medica",
    definition: "Right-sided complaints moving to the left, with characteristically intense aggravation from 4 PM to 8 PM.",
    clinicalSignificance: "Better from warm drinks, worse from cold applications and gas-forming foods."
  },
  {
    term: "Pulsatilla Mentals",
    subType: "Materia Medica",
    definition: "Mild, gentle, yielding disposition; weeps easily; seeks consolation and open air.",
    clinicalSignificance: "Intensely thirstless with dry mouth. Symptoms are highly changeable."
  },
  {
    term: "Nux Vomica Mentals",
    subType: "Materia Medica",
    definition: "Arrogant, irritable, impatient, workaholic, easily offended, and highly competitive.",
    clinicalSignificance: "Extremely chilly, sensitive to noise/light, and prone to ineffectual urging for stool."
  },
  {
    term: "Sulphur Keynotes",
    subType: "Materia Medica",
    definition: "The 'ragged philosopher'; burning in soles, palms, and vertex; aggravation at 11 AM with a weak empty stomach.",
    clinicalSignificance: "Aversion to bathing; standing is the most uncomfortable position."
  },
  {
    term: "Silicea Keynotes",
    subType: "Materia Medica",
    definition: "Chilly, lacking vital heat; sweat of feet is highly offensive and causes soreness; promotes expulsion of foreign bodies.",
    clinicalSignificance: "The 'Homoeopathic scalpel'; sensitive to cold drafts; has a dread of pins/needles."
  },
  {
    term: "Arsenicum Album Thirst",
    subType: "Materia Medica",
    definition: "Thirst for small quantities of cold water, taken frequently at short intervals.",
    clinicalSignificance: "Peculiar keynote: burning pains relieved by heat, coupled with intense anxiety and restlessness."
  },
  {
    term: "Apis Mellifica Thirst",
    subType: "Materia Medica",
    definition: "Characteristically thirstless in almost all febrile, dropsical, and inflammatory states.",
    clinicalSignificance: "Soreness, stinging pains, puffy bag-like swellings under eyes, worse from heat."
  },
  {
    term: "Bryonia Alba Modalities",
    subType: "Materia Medica",
    definition: "Absolute aggravation from the slightest movement; significant relief from firm pressure and lying on the painful side.",
    clinicalSignificance: "Dry mucous membranes, intense thirst for large quantities of cold water at long intervals."
  },
  {
    term: "Rhus Tox Modalities",
    subType: "Materia Medica",
    definition: "Severe aggravation from initial movement and rest; marked relief from continuous moderate motion.",
    clinicalSignificance: "Tearing pains in tendons and ligaments; highly sensitive to cold damp weather; has a triangular red tip on tongue."
  },
  {
    term: "Lachesis Sleep Modality",
    subType: "Materia Medica",
    definition: "Great aggravation of all physical and mental symptoms after sleeping ('sleeps into an aggravation').",
    clinicalSignificance: "Intolerance of tight collars, belts, or anything tight around the neck/waist."
  },
  {
    term: "Gelsemium Triple A",
    subType: "Materia Medica",
    definition: "The key mental/physical state: Apathy, Dullness, and Trembling (Apathy, Dullness, Trembling).",
    clinicalSignificance: "Complete thirstlessness, heavy eyelids, headache relieved by profuse urination."
  },
  {
    term: "Aconitum Acute State",
    subType: "Materia Medica",
    definition: "Sudden, violent onset of febrile symptoms triggered by exposure to dry, cold winds, accompanied by extreme fear of death.",
    clinicalSignificance: "Predicts the hour of death; hot skin, unquenchable thirst for cold water."
  },
  {
    term: "Belladonna Congestion",
    subType: "Materia Medica",
    definition: "Sudden, violent, throbbing congestions with hot, red skin, dilated pupils, and wild delirium.",
    clinicalSignificance: "Complaints appear and disappear suddenly; better in a semi-erect position, worse from light and noise."
  },
  {
    term: "Glonoine Headaches",
    subType: "Materia Medica",
    definition: "Violent, congestive, bursting headaches that sync with the heartbeat; cannot bear the heat of the sun.",
    clinicalSignificance: "The patient feels as if the skull is too small for the expanding brain."
  },
  {
    term: "Secale Cornutum Thermals",
    subType: "Materia Medica",
    definition: "Cold to the touch, but feels internally burning hot and refuses to be covered.",
    clinicalSignificance: "Prone to gangrene, thin skin, and severe burning in extremities."
  },
  {
    term: "Camphora Collapse",
    subType: "Materia Medica",
    definition: "Icy coldness of the entire body, blue lips and skin, yet refuses all warm coverings or blankets.",
    clinicalSignificance: "Indicated in sudden, severe collapse states with cold sweat."
  },
  {
    term: "Veratrum Album Collapse",
    subType: "Materia Medica",
    definition: "Cold sweat on the forehead, with icy coldness of the body, rapid vomiting, and purging.",
    clinicalSignificance: "Rapid exhaustion with profound physical debility and a craving for cold acid drinks."
  },
  {
    term: "Carbo Vegetabilis Status",
    subType: "Materia Medica",
    definition: "The 'corpse reviver'; profound collapse, cold skin, air hunger demanding to be fanned rapidly from a close distance.",
    clinicalSignificance: "Extreme flatulence in the upper abdomen, relieved by eructations."
  },
  {
    term: "Antonium Tart Cough",
    subType: "Materia Medica",
    definition: "Great rattling of mucus in the chest, but very little is expectorated due to physical weakness.",
    clinicalSignificance: "Drowsiness, debility, and sweating; cyanotic lips; relieved by sitting upright."
  },
  {
    term: "Ipecacuanha Nausea",
    subType: "Materia Medica",
    definition: "Persistent, constant, severe nausea and vomiting with a clean, moisture-rich tongue.",
    clinicalSignificance: "Spasmodic cough with choking, hemorrhage of bright red fluid blood."
  },
  {
    term: "Baptisia Septic State",
    subType: "Materia Medica",
    definition: "Profound septic state where the patient feels scattered and tries to gather the scattered parts of their body.",
    clinicalSignificance: "All discharges (sweat, breath, stool) are highly offensive; face is dark red with a besotted expression."
  },
  {
    term: "Pyrogenium Action",
    subType: "Materia Medica",
    definition: "Great discordance between pulse rate and temperature (e.g., high pulse with low temp, or vice-versa).",
    clinicalSignificance: "A highly effective Homoeopathic antiseptic, prepared from rotten lean beef."
  },
  {
    term: "Staphysagria Mentals",
    subType: "Materia Medica",
    definition: "Diseases arising from suppressed anger, indignation, mortification, or silent grief.",
    clinicalSignificance: "Extremely sensitive to the least word; clean-cut surgical wounds; styes on eyelids."
  },
  {
    term: "Chamomilla Pediatrics",
    subType: "Materia Medica",
    definition: "Child is extremely cross, irritable, and can only be quieted when carried or held constantly.",
    clinicalSignificance: "One cheek is red and hot, the other is pale and cold; warm drinks aggravate."
  },
  {
    term: "Cina Pediatrics",
    subType: "Materia Medica",
    definition: "Child is cross, wants to be rocked, and constantly picks or rubs their nose; has a pale face with blue rings around the eyes.",
    clinicalSignificance: "Associated with intestinal worms, night terrors, and grinding of teeth during sleep."
  },
  {
    term: "Phytolacca Throat",
    subType: "Materia Medica",
    definition: "Severe tonsillitis or pharyngitis where pain shoots to the ears upon swallowing.",
    clinicalSignificance: "Throat feels full and hot; dark red tonsils; child has an irresistible urge to bite their teeth together."
  },
  {
    term: "Mercurius Solubilis Mouth",
    subType: "Materia Medica",
    definition: "Heavy salivation with an offensive, metallic-tasting breath and a flabby tongue showing indents of the teeth.",
    clinicalSignificance: "Ulcerations; skin complaints are worse at night and from both heat and cold."
  },
  {
    term: "Nitric Acid Pain",
    subType: "Materia Medica",
    definition: "Sticking, splinter-like pains in mucous outlets (throat, anus) that appear and disappear suddenly.",
    clinicalSignificance: "Urine is highly offensive, smelling like horse urine; fissures at mucocutaneous junctions."
  },
  {
    term: "Sepia Hormonals",
    subType: "Materia Medica",
    definition: "Extreme indifference to loved ones, family, and domestic affairs, accompanied by a bearing-down sensation in the pelvis.",
    clinicalSignificance: "Yellow saddle-like pigmentation across the nose and cheeks; better from hard exercise/motion."
  },
  {
    term: "Graphites Skin",
    subType: "Materia Medica",
    definition: "Rough, dry, cracked skin that oozes a thick, sticky, honey-like, gelatinous fluid.",
    clinicalSignificance: "Suited to individuals who are 'stout, fair, and chilly'; prone to stubborn constipation."
  },
  {
    term: "Mezereum Neuralgia",
    subType: "Materia Medica",
    definition: "Severe post-herpetic neuralgic pains that worsen from touch or cold air, with thick crusts forming over skin lesions.",
    clinicalSignificance: "Crusts cover a thick white pus; burning neuralgic pains in cheek bones."
  },
  {
    term: "Arnica Injury",
    subType: "Materia Medica",
    definition: "Sore, bruised, beaten feeling throughout the body; head is hot while the rest of the body is cold; says nothing is wrong when ill.",
    clinicalSignificance: "Excellent for mechanical injuries, concussion, contusions, and preventatively before surgeries."
  },
  {
    term: "Hypericum Nerve Injury",
    subType: "Materia Medica",
    definition: "The 'arnica of nerves'; indicated for injuries to parts rich in nerves (fingertips, spine, coccyx) with radiating pains.",
    clinicalSignificance: "Puncture wounds, animal bites, and lancinating pains shooting along nerve pathways."
  },
  {
    term: "Symphytum Bone Injury",
    subType: "Materia Medica",
    definition: "Facilitates the rapid union of fractured bones; excellent for mechanical injuries to the eyeball.",
    clinicalSignificance: "Known as 'knit-bone'; relieves pain of fractures and periosteal irritability."
  },
  {
    term: "Ruta Graveolens Affinity",
    subType: "Materia Medica",
    definition: "Deep affinity for periosteum, cartilages, tendons, and flexor muscles; feeling as if bruised or sprained.",
    clinicalSignificance: "Indicated in eye strain from close work, wrist ganglion, and sprains."
  },
  {
    term: "Thuja Occidentalis",
    subType: "Materia Medica",
    definition: "The king of sycotic remedies; presents with soft fleshy warts, oily skin, split nails, and fixed ideas.",
    clinicalSignificance: "Thinks that the body is fragile like glass, or that a living animal is in the stomach."
  },
  {
    term: "Medorrhinum Affinity",
    subType: "Materia Medica",
    definition: "A powerful sycotic nosode; state of intense hurry, time passes too slowly; craves ice, salt, and sweet foods.",
    clinicalSignificance: "Sleeps in the knee-chest position; chronic pelvic inflammatory disorders; relieved by seaside air."
  },
  {
    term: "Psorinum Sensation",
    subType: "Materia Medica",
    definition: "Deeply chilly, wears fur hats in summer; body and all discharges have a highly offensive odor.",
    clinicalSignificance: "Feels unusually well the day before a disease attack; skin is dirty, greasy, and has intense itching."
  },
  {
    term: "Tuberculinum State",
    subType: "Materia Medica",
    definition: "Rapidly changing symptoms; physical and mental restlessness; constant desire to travel or change jobs/surroundings.",
    clinicalSignificance: "Prone to taking cold easily; rapid emargination despite a ravenous appetite."
  },
  {
    term: "Syphilinum Pains",
    subType: "Materia Medica",
    definition: "Severe bone and head pains that begin at sunset, reach their peak at midnight, and gradually subside at sunrise.",
    clinicalSignificance: "The syphilis nosode; chronic destructive ulcerations; extreme dread of infections."
  },
  {
    term: "Calcarea Carbonica",
    subType: "Materia Medica",
    definition: "Flesh is soft and flabby; sweats profusely on the back of the neck and head during sleep; cold damp feet.",
    clinicalSignificance: "Suited to 'fat, fair, and flabby' individuals who crave boiled eggs and indigestible things (chalk, clay)."
  },
  {
    term: "Baryta Carbonica",
    subType: "Materia Medica",
    definition: "Arrested physical and mental development; dwarfism; swollen glands, especially the tonsils, which suppurate easily.",
    clinicalSignificance: "Elderly patients with senility; children who are bashful and hide behind furniture when strangers arrive."
  },
  {
    term: "Silicea Terra Grit",
    subType: "Materia Medica",
    definition: "Lacks physical stamina, grit, and self-confidence, but is mentally highly obstinate and headstrong once decided.",
    clinicalSignificance: "Cold feet with offensive sweat; head feels better when wrapped warmly; thin, pale, and fine-skinned."
  },
  {
    term: "Phosphorus Hemorrhage",
    subType: "Materia Medica",
    definition: "Frequent, profuse hemorrhages of bright red blood from any mucous outlet; craves icy cold drinks which are vomited once they warm in the stomach.",
    clinicalSignificance: "Tall, slender, narrow-chested individuals; highly sensitive to light, sound, and electrical storms."
  },
  {
    term: "Kali Carbonicum Backache",
    subType: "Materia Medica",
    definition: "Severe, sharp stitching pains in the lower back and chest, with complaints characteristically worse from 3 AM to 4 AM.",
    clinicalSignificance: "Puffy swelling in the inner corner of upper eyelids (like a little bag); extremely sensitive to touch."
  },
  {
    term: "Plumbum Metallicum",
    subType: "Materia Medica",
    definition: "Abdomen feels drawn to the spine by a string; stubborn constipation with hard black ball-like stools.",
    clinicalSignificance: "Severe lead colic; localized muscular atrophy; blue line along the gums."
  },
  {
    term: "Chelidonium Liver",
    subType: "Materia Medica",
    definition: "Constant, dull, fixed pain under the lower angle of the right scapula, radiating to the chest and liver.",
    clinicalSignificance: "Yellow coated tongue; jaundice; craves hot drinks which relieve all gastric distress."
  },
  {
    term: "Carduus Marianus",
    subType: "Materia Medica",
    definition: "Excellent liver and venous remedy; painful engorgement of the liver and gall bladder with varicose veins.",
    clinicalSignificance: "Prone to biliary calculi, jaundice, and pelvic congestions."
  },
  {
    term: "Digitalis Pulse",
    subType: "Materia Medica",
    definition: "Very slow, weak, irregular pulse, with a sensation as if the heart would stop beating if the patient moved.",
    clinicalSignificance: "Faintness, cyanosis, cold skin, and liver complications with white ash-colored stools."
  },
  {
    term: "Cactus Grandiflorus",
    subType: "Materia Medica",
    definition: "Sensation of constriction around the heart, as if gripped tightly by an iron band or wire.",
    clinicalSignificance: "Severe angina pectoris, hemorrhages of black blood, better from quiet rest."
  },
  {
    term: "Spigelia Anthelmia",
    subType: "Materia Medica",
    definition: "Violent palpitation of the heart, which can be seen and heard through the clothing; left-sided neuralgic headaches.",
    clinicalSignificance: "Neuralgia centering on the left eye, worse from touch, motion, or looking down."
  },
  {
    term: "Crataegus Oxyacantha",
    subType: "Materia Medica",
    definition: "A supreme cardiac tonic; supports heart muscle health in chronic valvular diseases and general heart failure.",
    clinicalSignificance: "Acts on the myocardium; dyspnea on minimal exertion; cold extremities."
  },
  {
    term: "Adonis Vernalis",
    subType: "Materia Medica",
    definition: "Indicated in cardiac dropsy with a rapid, feeble, irregular pulse and severe congestive dyspnea.",
    clinicalSignificance: "Acts as a diuretic and increases the efficiency of the myocardium."
  },
  {
    term: "Sticta Pulmonaria",
    subType: "Materia Medica",
    definition: "Sensation of extreme dryness and fullness at the root of the nose; continuous dry barking cough that worsens at night.",
    clinicalSignificance: "Influenza; joint pain alternating with respiratory symptoms; feeling as if legs are floating."
  },
  {
    term: "Rumex Crispus",
    subType: "Materia Medica",
    definition: "Dry, teasing cough triggered by the least inhalation of cold air or when uncovered.",
    clinicalSignificance: "Patient covers their mouth with a blanket to keep the air warm; throat-pit tickling."
  },
  {
    term: "Drosera Rotundifolia",
    subType: "Materia Medica",
    definition: "Spasmodic, paroxysmal cough that succeeds in rapid succession, taking away the breath; worse after midnight.",
    clinicalSignificance: "Cough is so violent that the patient holds their chest with their hands; hoarseness."
  },
  {
    term: "Spongia Tosta",
    subType: "Materia Medica",
    definition: "Dry, barking, hollow cough that sounds like a saw cutting through a pine board; throat is highly dry.",
    clinicalSignificance: "Aggravation before midnight, better from eating or warm drinks."
  },
  {
    term: "Sanguinaria Canadensis",
    subType: "Materia Medica",
    definition: "Right-sided congestive headaches that begin in the occiput, rise over the head, and settle in the right eye.",
    clinicalSignificance: "Headaches occur periodically every seventh day; red burning cheeks; better from sleep and quiet."
  },
  {
    term: "Spigelia Headaches",
    subType: "Materia Medica",
    definition: "Left-sided congestive headaches that begin in the morning at sunrise, peak at noon, and gradually decline at sunset.",
    clinicalSignificance: "Pain focuses in and around the left eye, with a sensation as if the eye is too large."
  },
  {
    term: "Natrum Muriaticum",
    subType: "Materia Medica",
    definition: "Headaches that feel as if a thousand tiny hammers are beating inside the skull; worse from sunrise to sunset.",
    clinicalSignificance: "Prone to silent grief, avoids consolation; craves salt; map-like tongue."
  },
  {
    term: "Ignatia Amara",
    subType: "Materia Medica",
    definition: "The remedy of contradictions; rapid, dramatic changes of mood; deep, involuntary sighing; silent grief from romance/loss.",
    clinicalSignificance: "Sore throat relieved by swallowing solid food; hysterical convulsions; globus hystericus."
  },
  {
    term: "Aurum Metallicum",
    subType: "Materia Medica",
    definition: "Profound suicidal melancholy, with feelings of self-condemnation and worthlessness; relieved by music.",
    clinicalSignificance: "Severe bone pains worse at night; arterial hypertension; liver cirrhosis."
  },
  {
    term: "Anacardium Sensation",
    subType: "Materia Medica",
    definition: "Sensation of a plug or band tightly pressing in various parts of the body.",
    clinicalSignificance: "Loss of memory; severe dyspepsia temporarily relieved by eating."
  },
  {
    term: "Ignatia Sensation",
    subType: "Materia Medica",
    definition: "Sensation of a lump or ball in the throat (globus hystericus) that cannot be swallowed.",
    clinicalSignificance: "Grief, sob, sigh, and paradoxical modalities (e.g. pain in ear relieved by music)."
  },
  {
    term: "Lycopodium Sensation",
    subType: "Materia Medica",
    definition: "Sensation of fullness and satiety in the stomach immediately after taking the first mouthful of food.",
    clinicalSignificance: "Aggravated 4-8 PM; flatulence; right to left movement of symptoms."
  },
  {
    term: "Sulfur Sensation",
    subType: "Materia Medica",
    definition: "Sensation of burning heat on the vertex, palms of the hands, and soles of the feet.",
    clinicalSignificance: "Wants to put feet out of the bed to cool them; weak empty stomach at 11 AM."
  },
  {
    term: "Lilium Tigrinum",
    subType: "Materia Medica",
    definition: "Sensation as if the pelvic organs would escape through the vulva, relieved by firm pressure with the hands.",
    clinicalSignificance: "Prone to severe uterine displacements, wild thoughts, and cardiac palpitations."
  },
  {
    term: "Murex Purpurea",
    subType: "Materia Medica",
    definition: "Sensation of bearing down in the pelvis, accompanied by highly elevated, obsessive sexual desire.",
    clinicalSignificance: "Distinct from Sepia (which has loss of sexual desire and indifference)."
  },
  {
    term: "Sarsaparilla Urine",
    subType: "Materia Medica",
    definition: "Severe, excruciating pain at the conclusion of urination, with gravel or sand in the urine.",
    clinicalSignificance: "Child screams before and during urination; dry, flabby skin."
  },
  {
    term: "Lycopodium Urine",
    subType: "Materia Medica",
    definition: "Red sandy sediment in the urine; child cries before urinating due to renal colic.",
    clinicalSignificance: "Right-sided kidney stones; flatulence; aggravated 4 PM to 8 PM."
  },
  {
    term: "Cantharis Vesicatoria",
    subType: "Materia Medica",
    definition: "Intense, violent, cutting burning pain in the bladder before, during, and after urination, passed drop by drop.",
    clinicalSignificance: "Severe cystitis, hematuria, and aphthae in the mouth with burning."
  },
  {
    term: "Terebinthina Urine",
    subType: "Materia Medica",
    definition: "Urine has a strong odor of violets and appears dark, smoky, and mixed with blood.",
    clinicalSignificance: "Severe nephritis with abdominal flatulence and hemorrhages."
  },
  {
    term: "Berberis Vulgaris",
    subType: "Materia Medica",
    definition: "Sharp, stitching, radiating pains that shoot outward from the kidneys into the ureters, hips, and thighs.",
    clinicalSignificance: "Excellent for renal and biliary calculi; pains change location rapidly."
  },
  {
    term: "Urtica Urens",
    subType: "Materia Medica",
    definition: "Severe hives and skin itching that burn like nettles, alternating with gouty joint pain.",
    clinicalSignificance: "Promotes expulsion of uric acid; skin burns and stings when touched."
  },
  {
    term: "Secale Cornutum Gangrene",
    subType: "Materia Medica",
    definition: "Dry senile gangrene in extremities; parts feel cold but burn internally, aggravated by heat.",
    clinicalSignificance: "Hemolytic hemorrhages; skinny, dark, and wrinkled constitution."
  },
  {
    term: "Anthracinum Sensation",
    subType: "Materia Medica",
    definition: "Insupportable, burning, tearing pains in malignant boils, carbuncles, or cellulitis.",
    clinicalSignificance: "A powerful nosode prepared from anthrax poison; septicemia."
  },
  {
    term: "Boger's Synoptic Key",
    subType: "Repertory",
    definition: "A concise repertorial work by Dr. C.M. Boger focusing on pathological generalities, clinical rubrics, and time modalities.",
    clinicalSignificance: "Highly effective for rapid bedside prescribing when complete subjective symptoms are missing."
  },
  {
    term: "Centesimal Scale",
    subType: "Pharmacy",
    definition: "The dilution scale introduced by Hahnemann where the first potency (1C) contains 1 part of medicine and 99 parts of vehicle (1:100).",
    clinicalSignificance: "Denoted by 'C' or 'CH'. The most widely used potency scale globally."
  },
  {
    term: "Decimal Scale",
    subType: "Pharmacy",
    definition: "The dilution scale introduced by Dr. Constantine Hering based on the ratio of 1 part medicine to 9 parts vehicle (1:10).",
    clinicalSignificance: "Denoted by 'X' or 'D'. Common in low-potency physical organ therapeutics."
  },
  {
    term: "Alternation of Remedies",
    subType: "Philosophy & Organon",
    definition: "The un-Hahnemannian practice of prescribing two remedies alternately at short intervals.",
    clinicalSignificance: "Prohibited in classical practice (Aphorism 272) as it disrupts clean secondary action tracking."
  },
  {
    term: "Intercurrent Remedy",
    subType: "Philosophy & Organon",
    definition: "A remedy prescribed to clear chronic miasmatic blocks, susceptibility stagnations, or constitutional drug-storing barriers.",
    clinicalSignificance: "Often a nosode like Psorinum, Sulphur, or Thuja to restart reaction to the primary remedy."
  },
  {
    term: "Boenninghausen's Repertory",
    subType: "Repertory",
    definition: "The Therapeutic Pocket Book, based on the doctrine of grand generalization, structured into Location, Sensation, Modality, and Concomitants.",
    clinicalSignificance: "Allows transferring a modality from one part of the body to another to build complete symptoms."
  },
  {
    term: "Hering's Law of Cure",
    subType: "Philosophy & Organon",
    definition: "The direction of cure: From above downwards, from within outwards, from more important to less important organs, and symptoms disappear in reverse order of appearance.",
    clinicalSignificance: "The ultimate yardstick to distinguish genuine curative response from mere suppression."
  },
  {
    term: "Vital Force",
    subType: "Philosophy & Organon",
    definition: "The spiritual, autocratic, dynamic, and unintelligent force that animates the physical human body in health and disease (Aphorisms 9-10).",
    clinicalSignificance: "Diseases originate dynamically in the Vital Force, and dynamic Homoeopathic remedies cure through it."
  },
  {
    term: "Apis Mellifica",
    subType: "Materia Medica",
    definition: "Prepared from the honey bee; characterized by stinging, burning pains, swelling, bag-like puffiness under eyes, and thirstlessness.",
    clinicalSignificance: "Worse from heat and touch; better from cold applications and cool air. Prone to severe anaphylaxis."
  },
  {
    term: "Lachesis Mutus",
    subType: "Materia Medica",
    definition: "Prepared from bushmaster snake venom; symptoms are left-sided, worse after sleep, and intolerant to any tight constriction around throat/waist.",
    clinicalSignificance: "Prone to severe jealousy, loquacity, and hot flushes. Highly effective for menopausal disorders."
  },
  {
    term: "Gelsemium Drowsiness",
    subType: "Materia Medica",
    definition: "The three 'D's: Dullness, Dizziness, and Drowsiness. Extreme physical weakness, muscular relaxation, and trembling.",
    clinicalSignificance: "Anticipatory anxiety; thirstless; headache relieved by copious urination."
  },
  {
    term: "Plumbum Metallicum",
    subType: "Materia Medica",
    definition: "Severe, violent abdominal colic radiating in all directions, with a sensation as if the navel were pulled back by a string.",
    clinicalSignificance: "Lead poisoning symptoms: constipation with sheep-dung stools, local paralysis of extensors (wrist drop)."
  },
  {
    term: "Silicea Suppuration",
    subType: "Materia Medica",
    definition: "The 'Homoeopathic lancet'. Promotes the rapid suppuration and expulsion of foreign bodies (splinters, needles) from tissues.",
    clinicalSignificance: "Chilly, sweats on feet (highly offensive), lacks self-confidence, but highly headstrong. Worse in cold."
  },
  {
    term: "Hepar Sulphur Sensitivity",
    subType: "Materia Medica",
    definition: "Extreme, hyper-sensitiveness to cold air, drafts, pain, and touch. Prone to easy suppuration and sour-smelling sweat.",
    clinicalSignificance: "Patient is irritable, violent, and chilly (wants to be wrapped up to the chin). Splinter-like pains."
  },
  {
    term: "Conium Maculatum",
    subType: "Materia Medica",
    definition: "Induration and stony hardness of glands (especially breasts and testicles) following mechanical bruising or injury.",
    clinicalSignificance: "Characteristic ascending paralysis; photophobia; vertigo when turning over in bed."
  },
  {
    term: "Phytolacca Decandra",
    subType: "Materia Medica",
    definition: "Prepared from poke root; intensive sore throat with a dark red or bluish appearance, pain shooting to ears on swallowing.",
    clinicalSignificance: "Severe mastitis with stony-hard breasts; aching all over like bruises; better from cold."
  },
  {
    term: "Kali Carbonicum",
    subType: "Materia Medica",
    definition: "Stitching pains in chest or kidneys, independent of motion; puffiness or bag-like swelling between upper eyelid and eyebrow.",
    clinicalSignificance: "Chilly, weak-backed, highly conservative, and aggravated characteristically at 3 AM."
  },
  {
    term: "Chamomilla Irritability",
    subType: "Materia Medica",
    definition: "Extremely sensitive, irritable, and angry state. Child demands toys only to throw them away; relieved only when carried.",
    clinicalSignificance: "One cheek red and hot, the other pale and cold. Pains are unbearable and accompanied by numbness."
  },
  {
    term: "Colocynthis Colic",
    subType: "Materia Medica",
    definition: "Agonizing cutting pain in the abdomen, causing the patient to bend double or press firmly against something hard for relief.",
    clinicalSignificance: "Brought on by anger or indignation. Relief from warmth and strong physical pressure."
  },
  {
    term: "Digitalis Purpurea Pulse",
    subType: "Materia Medica",
    definition: "Extremely slow, weak, irregular pulse, with a constant feeling as if the heart would stop beating if the patient moved.",
    clinicalSignificance: "Prone to cardiac failure, dropsy, and bluish discoloration of skin (cyanosis)."
  },
  {
    term: "Tuberculinum Bovinum",
    subType: "Materia Medica",
    definition: "Deep dynamic nosode; patient has a constant desire to travel, changes jobs, and catches cold very easily.",
    clinicalSignificance: "Indicated in hereditary tubercular histories; symptoms fluctuate rapidly; rapid weight loss despite good appetite."
  },
  {
    term: "Psorinum Chilly State",
    subType: "Materia Medica",
    definition: "Extremely chilly patient; wears a warm fur cap in summer. All excretions (sweat, stool, skin discharge) have an intensely filthy, offensive odor.",
    clinicalSignificance: "Pessimistic, hopeless of recovery, with severe dry skin itching worse from warmth of bed."
  },
  {
    term: "Graphites Constipation",
    subType: "Materia Medica",
    definition: "Constipation with large, knotty stools united by mucus threads. Skin is dry, rough, and oozes a sticky, honey-like gelatinous fluid.",
    clinicalSignificance: "Suits fleshy, chilly, constipated women with delayed menses who are prone to skin cracks."
  },
  {
    term: "Carbo Vegetabilis Flatulence",
    subType: "Materia Medica",
    definition: "The 'corpse reviver'. Extreme flatulence with upper abdominal distension, relieved by loud belching. Patient craves to be fanned rapidly.",
    clinicalSignificance: "Coldness of skin, cold breath, and complete collapse from oxygen hunger."
  },
  {
    term: "Repertory Synthesis",
    subType: "Repertory",
    definition: "A modern, comprehensive repertory edited by Dr. Frederik Schroyens, based on Kent's Repertory but updated with clinical additions.",
    clinicalSignificance: "Widely used in digital Homoeopathy software for precise cross-referencing and structural clarity."
  },
  {
    term: "Kent's Repertory",
    subType: "Repertory",
    definition: "The monumental work by Dr. J.T. Kent, structured hierarchically from Generals (Mind, Generals) to Particulars (Head, Eyes, Chest, etc.).",
    clinicalSignificance: "Serves as the gold standard for constitutional repertorization in classical Homoeopathy."
  },
  {
    term: "Boericke's Repertory",
    subType: "Repertory",
    definition: "A pocket clinical repertory attached to Boericke's Materia Medica, organized indexically by clinical conditions and organs.",
    clinicalSignificance: "Extremely practical for quick, physiological or pathology-based remedy selection in acute situations."
  },
  {
    term: "Miasmatic Cleansing",
    subType: "Philosophy & Organon",
    definition: "The clinical process of prescribing anti-miasmatic remedies to clear genetic blocks, inherited diseases, or chronic suppressions.",
    clinicalSignificance: "Restores standard susceptibility so constitutional remedies can execute their curative action."
  },
  {
    term: "External Applications",
    subType: "Pharmacy",
    definition: "The use of Homoeopathic mother tinctures or low potencies in ointments/lotions (e.g. Arnica, Calendula) on local tissues.",
    clinicalSignificance: "Authorized only for external mechanical injuries with unbroken skin (Aphorism 285)."
  }
];
