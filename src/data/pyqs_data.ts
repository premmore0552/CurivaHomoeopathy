export interface UniversityPYQ {
  id: string;
  question: string;
  subject: "Organon & Philosophy" | "Materia Medica" | "Repertory" | "Pharmacy" | "Practice of Medicine";
  year: string;
  marks: 5 | 10 | 20;
  university: string;
  answer: string;
  keyPoints: string[];
}

export const universityPYQs: UniversityPYQ[] = [
  {
    id: "PYQ-001",
    question: "Define Similia Similibus Curentur. Explain how Hahnemann discovered this therapeutic law.",
    subject: "Organon & Philosophy",
    year: "2024",
    marks: 10,
    university: "MUHS (Maharashtra University of Health Sciences)",
    answer: "Similia Similibus Curentur translates to 'Let likes be treated by likes.' It is the fundamental law of Homeopathy, stating that a medicinal substance capable of producing a specific set of symptoms in a healthy human being can cure a similar set of symptoms in a diseased individual. \n\nHahnemann discovered this law in 1790 while translating William Cullen's 'Materia Medica.' Cullen attributed the curative power of Cinchona Bark (Peruvian Bark) in malaria to its extreme bitterness and tonic effects on the stomach. Hahnemann, dissatisfied with this explanation, ingested 4 drachms of pure Cinchona juice twice daily himself. He observed that it produced symptoms identical to intermittent malarial fever (paroxysms of chills, heat, sweat, joint pains, and dry mouth). \n\nThis experiment, known as the famous Cinchona Bark Experiment, led Hahnemann to realize that the disease-curing power of a drug resides in its disease-producing power. He conducted further systematic drug provings on himself and others to formulate and establish this therapeutic law.",
    keyPoints: [
      "Similia Similibus Curentur translates to 'Let likes be treated by likes.'",
      "Discovered in 1790 during the translation of Cullen's Materia Medica.",
      "Hahnemann ingested 4 drachms of Cinchona juice and experienced malarial symptoms.",
      "Established that disease-curing power is identical to disease-producing power."
    ]
  },
  {
    id: "PYQ-002",
    question: "What is Vital Force? Discuss its role in health, disease, and cure as described in Aphorisms 9, 10, and 11.",
    subject: "Organon & Philosophy",
    year: "2023",
    marks: 20,
    university: "RGUHS (Rajiv Gandhi University of Health Sciences)",
    answer: "The Vital Force (renamed Vital Principle in the 6th edition of the Organon) is the dynamic, spiritual, autonomic, and unintelligent power that animates the material human organism in health, disease, and cure. \n\n1. Role in Health (Aphorism 9):\nIn the healthy state, the spiritual vital force rules the physical body with absolute sovereignty. It maintains all physiological functions, sensations, and chemical operations in a harmonious, balanced equilibrium (dynamic homeostasis). This allows our indwelling, reason-gifted mind to freely employ this living instrument for the higher purpose of human existence.\n\n2. Role in Disease (Aphorism 11):\nDisease is not a material entity, but rather a dynamic, morbid derangement of the Vital Force caused by hostile, inimical dynamic influences (miasms or exciting factors). When the Vital Force is dynamically deranged, it expresses its internal suffering through abnormal sensations and functions, which manifest externally as a totality of signs and symptoms.\n\n3. Role in Cure (Aphorism 12):\nCure is achieved when the morbid derangement of the Vital Force is extinguished. The administration of a dynamically active, highly similar homeopathic remedy (the Simillimum) acts upon the suffering Vital Force. By creating a slightly stronger but temporary artificial medicinal disease, the natural morbid disease is extinguished (according to Aphorism 26). The Vital Force, freed from the disease, restores physiological harmony and health.",
    keyPoints: [
      "Vital Force is dynamic, spiritual, autonomic, and animates the physical body.",
      "Aphorism 9: In health, it maintains harmony so the mind can pursue higher purposes.",
      "Aphorism 11: Disease is the dynamic derangement of this force by noxious influences.",
      "Aphorism 12: Cure is the restoration of harmony by extinguishing the morbid derangement."
    ]
  },
  {
    id: "PYQ-003",
    question: "Write short notes on Aphorism 153 and its significance in repertorization.",
    subject: "Repertory",
    year: "2025",
    marks: 5,
    university: "WBUHS (West Bengal University of Health Sciences)",
    answer: "Aphorism 153 of the Organon of Medicine instructs the practitioner on which symptoms to prioritize when searching for the homeopathic simillimum: \n\n'In this search for a homeopathic specific remedy... the more striking, singular, uncommon, and peculiar (characteristic) signs and symptoms of the case of disease are chiefly and almost solely to be kept in view.'\n\nSignificance in Repertorization:\n1. Filtration of Common Symptoms: Common pathological symptoms (e.g., headache in meningitis, pain in arthritis) are of low value in choosing a specific remedy, as they are present in almost all cases. Aphorism 153 filters these out, focusing instead on the individual's unique response.\n2. Definition of PQRS Symptoms: It defines the PQRS symptoms—Peculiar, Queer, Rare, and Singular. Examples include 'burning pain relieved by hot applications' (Arsenicum Album) or 'headache relieved by profuse urination' (Gelsemium).\n3. Repertorial Hierarchy: When constructing the repertorial totality, these highly characteristic symptoms receive the highest grade and weight, ensuring that the selected remedy matches the individual essence of the patient, rather than just the generic clinical diagnosis.",
    keyPoints: [
      "Focuses on striking, singular, uncommon, and peculiar (PQRS) symptoms.",
      "Filters out common, non-diagnostic pathological signs of disease.",
      "Provides the scientific basis for symptom evaluation and grading in repertorization.",
      "Ensures the prescription matches the individual patient rather than the clinical disease."
    ]
  },
  {
    id: "PYQ-004",
    question: "Define Drug Proving. Outline the qualities required for an ideal Homeopathic Prover.",
    subject: "Pharmacy",
    year: "2022",
    marks: 10,
    university: "BHU (Banaras Hindu University)",
    answer: "Drug Proving (Homoeopathic Pathogenetic Trial) is the systematic, scientific process of investigating the pathogenetic effects of medicinal substances by administering them to healthy human provers of both sexes under controlled conditions to record the signs and symptoms produced. \n\nAccording to Hahnemann (Aphorisms 121-142), an ideal prover must possess the following qualities:\n1. State of Healthy Equilibrium: The prover must be reasonably healthy, free from acute or active chronic diseases, and possess normal physiological functions.\n2. High Intelligence and Truthfulness: The prover must be capable of observing, identifying, and precisely describing internal sensations and mental states with accuracy and honesty.\n3. Temperate and Orderly Lifestyle: The prover must avoid excess stimulants (coffee, alcohol, spices), heavy physical labor, and mental stress that could produce misleading symptoms.\n4. Moderate Sensitivity: The prover should be sufficiently sensitive to react to the medicinal substance without being hyper-reactive or completely immune to drug action.",
    keyPoints: [
      "Drug proving is the recording of drug effects on healthy human beings.",
      "Provers must be free from active diseases and lead a temperate lifestyle.",
      "Requires high intelligence to identify and record subtle physical and mental changes.",
      "Avoids stimulants, strong spices, and excessive mental or physical strain."
    ]
  },
  {
    id: "PYQ-005",
    question: "Compare and contrast the physical and mental symptoms of Lycopodium and Sulphur.",
    subject: "Materia Medica",
    year: "2024",
    marks: 20,
    university: "MUHS (Maharashtra University of Health Sciences)",
    answer: "Lycopodium Clavatum and Sulphur are both premier anti-psoric polychrest remedies with a deep, broad sphere of action, but they present with distinct profiles:\n\n1. Mental Symptoms:\n- Lycopodium: Lacks self-confidence, has a dread of public speaking and meeting new people, yet behaves with an arrogant, dictatorial attitude to cover up his insecurity. Prone to a weak memory and is extremely irritable in the morning.\n- Sulphur: The 'ragged philosopher'. Highly egoistic, arrogant, and boasts about his intellect. Disrespects others, values ordinary things as highly precious, and is extremely untidy with an aversion to bathing.\n\n2. Physical Symptoms & Modalities:\n- Lycopodium: Deep-seated liver and kidney disorders. Symptoms move from right to left (e.g., right tonsil to left). Marked aggravation of complaints from 4 PM to 8 PM. Craves sweet foods and hot drinks, which relieve gastric complaints.\n- Sulphur: Deep skin eruptions with intense itching that burns when scratched. Marked aggravation of complaints at 11 AM (feels a weak empty sensation in stomach). Soles and palms burn at night, making him stick them out of bed. Intolerant of standing; hates warm wraps.",
    keyPoints: [
      "Lycopodium hides low self-confidence with dictatorial behavior; Sulphur is a proud, untidy philosopher.",
      "Lycopodium symptoms move right-to-left and aggravate from 4 PM to 8 PM.",
      "Sulphur has burning sensations, skin itching, and a weak sinking feeling at 11 AM.",
      "Lycopodium is relieved by warm drinks; Sulphur is intensely aggravated by warm coverings."
    ]
  },
  {
    id: "PYQ-006",
    question: "Define Potentisation. Explain the Decimal and Centesimal scales of preparation.",
    subject: "Pharmacy",
    year: "2023",
    marks: 10,
    university: "RGUHS (Rajiv Gandhi University of Health Sciences)",
    answer: "Potentisation (or Dynamisation) is the specialized physical process by which the dormant therapeutic powers of crude substances are liberated, developed, and enhanced through systematic dilution and mechanical friction (trituration for solids, succussion for liquids).\n\n1. Decimal Scale (Introduced by Dr. Constantine Hering):\n- Dilution Ratio: 1 part of active drug substance to 9 parts of vehicle (Sugar of Milk or Alcohol) to yield a ratio of 1:10.\n- Designation: Indicated by the suffix 'X' or 'D' (e.g., 1X, 3X, 6X).\n- Calculation: Each step contains 1/10th of the drug strength of the preceding potency.\n\n2. Centesimal Scale (Introduced by Dr. Samuel Hahnemann):\n- Dilution Ratio: 1 part of active drug substance to 99 parts of vehicle to yield a ratio of 1:100.\n- Designation: Indicated by the suffix 'C' or simply the number (e.g., 6C, 30C, 200C).\n- Calculation: Each step contains 1/100th of the drug strength of the preceding potency.\n\nPotentisation ensures that toxic substances are rendered harmless while their dynamic, curative footprint is amplified to act on the spiritual vital force.",
    keyPoints: [
      "Potentisation releases latent medicinal power via succussion or trituration.",
      "Decimal scale uses a 1:10 ratio, designated as 'X' or 'D'.",
      "Centesimal scale uses a 1:100 ratio, designated as 'C' or as a number.",
      "Renders toxins safe while expanding therapeutic efficiency."
    ]
  },
  {
    id: "PYQ-007",
    question: "Discuss the scope and limitations of the Homeopathic Repertory.",
    subject: "Repertory",
    year: "2024",
    marks: 10,
    university: "WBUHS (West Bengal University of Health Sciences)",
    answer: "A Homeopathic Repertory is an index or catalog of symptoms of the Materia Medica, organized systematically, showing the remedies associated with each symptom along with their clinical grades.\n\nScope of Repertory:\n1. Simillimum Selection: Speeds up the identification of matching remedies in complex cases with extensive symptoms.\n2. Case Analysis: Helps differentiate similar remedies and clarifies which rubrics are strongly represented.\n3. Avoids Bias: Prevents the practitioner from relying solely on favorite or habitual prescriptions.\n4. Symptom Comparison: Facilitates active comparison of peculiar concomitants and modalities.\n\nLimitations of Repertory:\n1. Not a Substitute: It is a tool for suggestion; the final prescription must always be verified directly against the Materia Medica.\n2. Language Differences: Different authors use archaic terminology, making rubric search difficult.\n3. Errors and Omissions: No repertory is perfectly complete; remedies may be missing from certain rubrics.\n4. Mechanical Pitfalls: Relying blindly on score values without qualitative evaluation violates individualization principles.",
    keyPoints: [
      "Repertory is a systematic index linking symptoms to grades of remedies.",
      "Scope: Speeds up case analysis, avoids memory bias, and organizes extensive rubrics.",
      "Limitation: It is an index, not a prescribing bible; must always be checked with Materia Medica.",
      "Risk of over-mechanical calculations without evaluating patient particulars."
    ]
  },
  {
    id: "PYQ-008",
    question: "Define the terms: Isopathy, Nosode, and Sarcode with clinical examples of each.",
    subject: "Pharmacy",
    year: "2025",
    marks: 5,
    university: "BHU (Banaras Hindu University)",
    answer: "These terms describe specialized classes of therapeutic remedies in Homeopathy and related dynamic fields:\n\n1. Isopathy:\nThe practice of treating a disease using the exact material agent that caused the disease (e.g., administering a highly diluted vaccine or toxin to treat injuries from that same vaccine or toxin). It follows 'aequalia aequalibus' (equal cures equal).\n\n2. Nosode:\nA homeopathic remedy prepared from diseased tissues, fluid discharges, or bacterial isolates of animals or plants, sterilized and potentised according to standard pharmacopoeia rules.\n- Examples: Psorinum (scabies vesicle), Medorrhinum (urethral discharge), Tuberculinum Bovinum (tubercular gland).\n\n3. Sarcode:\nA homeopathic remedy prepared from healthy biological organs, glands, or physiological secretions of animals or humans.\n- Examples: Thyroidinum (healthy thyroid gland), Adrenalinum (adrenal gland secretion), Cholesterinum (cholesterol substance). Sarcodes are used to support or balance corresponding physiological organ systems.",
    keyPoints: [
      "Isopathy uses the identical disease agent (equal cures equal).",
      "Nosodes are prepared from sterilized diseased materials (e.g., Psorinum, Medorrhinum).",
      "Sarcodes are prepared from healthy biological tissues and secretions (e.g., Thyroidinum)."
    ]
  },
  {
    id: "PYQ-009",
    question: "Discuss the features of a Sycotic Miasm presentation in clinical practice.",
    subject: "Organon & Philosophy",
    year: "2023",
    marks: 10,
    university: "MUHS (Maharashtra University of Health Sciences)",
    answer: "The Sycotic Miasm (often called the 'gonorrheal' or 'retentive' miasm) is one of Hahnemann's primary chronic miasms. In clinical practice, it represents states of physical excess, slow coordination, proliferation, and deep psychological suspicion.\n\nKey Clinical Features:\n1. Mental Sphere: Intense suspicion, secretiveness, low trust, anxiety about health, and a state of constant internal hurry (feels that time moves too slowly).\n2. Physical Overgrowths: Prone to warts, condylomata, skin tags, fibroids, cysts, and benign tumors of mucous membranes.\n3. Modalities: Worse in cold damp weather, before storms, and from rest; marked relief in warm dry conditions and from continuous physical movement.\n4. Discharges: Discharges are typically thick, greenish-yellow, and have a highly offensive, fish-like odor.\n5. Pain Quality: Slow, dull, heavy aching, or tearing pains in joints and bones, often shifting or alternating.\n\nCommon anti-sycotic remedies include Thuja Occidentalis, Medorrhinum, and Natrum Sulphuricum.",
    keyPoints: [
      "Sycotic miasm corresponds to excess, retentive states, and tissue overgrowths.",
      "Mentally marked by suspicion, secretiveness, and feeling in a hurry.",
      "Characterized by warts, fibroids, cysts, and fishy, thick discharges.",
      "Aggravated by damp cold; relieved by warm dry air and motion."
    ]
  },
  {
    id: "PYQ-010",
    question: "What is an Intercurrent Remedy? State the conditions under which it is prescribed in chronic treatment.",
    subject: "Organon & Philosophy",
    year: "2024",
    marks: 5,
    university: "RGUHS (Rajiv Gandhi University of Health Sciences)",
    answer: "An Intercurrent Remedy is a complementary or anti-miasmatic medicine administered temporarily during the treatment of a chronic disease to clear obstacles to cure, activate a dormant vital response, or address a sudden block.\n\nConditions for prescribing an Intercurrent Remedy:\n1. Miasmatic Block: When a carefully selected constitutional simillimum fails to act or produces only partial relief due to a strong underlying miasmatic block (e.g., giving Psorinum in an anti-psoric block, or Thuja in a sycotic block).\n2. Suppressed History: When the patient's history reveals a suppression of skin diseases, discharges, or drug poisonings that must be cleared first (e.g., administering Sulphur or Medorrhinum).\n3. Disease Exacerbation: When an acute flare-up of the chronic condition occurs that requires a short-acting acute remedy to stabilize the patient before returning to the main constitutional treatment.\n4. Non-Response of Well-Chosen Remedies: When several apparently perfect remedies fail to elicit any reaction from the Vital Force.",
    keyPoints: [
      "Intercurrent remedies clear obstacles and stimulate a stagnant vital force.",
      "Prescribed when a well-chosen Simillimum fails to act due to a miasmatic block.",
      "Used to address a history of suppressed skin eruptions or discharges.",
      "Helps clear the case so constitutional remedies can resume their curative action."
    ]
  },
  {
    id: "PYQ-011",
    question: "Discuss the indications of Arsenicum Album in Food Poisoning and Gastrointestinal disorders.",
    subject: "Materia Medica",
    year: "2024",
    marks: 10,
    university: "MUHS (Maharashtra University of Health Sciences)",
    answer: "Arsenicum Album is a paramount remedy for acute gastrointestinal irritation, gastroenteritis, and food poisoning. Its clinical picture is defined by extreme burning, anxiety, restlessness, and unique thirst modalities:\n\n1. Etiology: Ailments from eating cold fruits, ice cream, rancid or decayed meat, bad water, or fish.\n2. Key Symptoms:\n   - Burning Pain: Intense burning pain in the entire alimentary canal (stomach, esophagus, abdomen), as if from hot coals. Ironically, this burning is temporarily relieved by warm drinks or applications.\n   - Thirst: Intense thirst for cold water, but the patient can only drink in small quantities at frequent intervals (sips water frequently) because large amounts aggravate the nausea and vomiting.\n   - Vomiting and Diarrhea: Simultaneous purging and vomiting. Stools are small, dark, offensive, watery, and followed by extreme exhaustion out of proportion to the loss of fluids.\n3. Mental State: Extreme anxiety, restlessness (moves from bed to bed), fear of death (believes his illness is incurable), and fastidiousness (demands absolute cleanliness around him).\n4. Modalities: Aggravation after midnight (1 AM to 2 AM), from cold food/drinks, and from the smell or sight of food. Amelioration from heat, warm drinks, and lying down.",
    keyPoints: [
      "Indicated for acute gastroenteritis and food poisoning from decayed meat, cold fruits, or bad water.",
      "Characterized by intense burning pains in stomach and abdomen, paradoxically relieved by warmth.",
      "Thirst for cold water in small quantities (sips) at frequent intervals.",
      "Mental sphere exhibits extreme anxiety, fear of death, restlessness, and fastidiousness.",
      "Marked aggravation from midnight to 2 AM and from cold applications."
    ]
  },
  {
    id: "PYQ-012",
    question: "State and explain Aphorism 26 (The Therapeutic Law of Nature) with natural and clinical examples.",
    subject: "Organon & Philosophy",
    year: "2025",
    marks: 10,
    university: "RGUHS (Rajiv Gandhi University of Health Sciences)",
    answer: "Aphorism 26 of the Organon of Medicine presents the Therapeutic Law of Nature: 'A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (whilst differing in kind) is very similar to it in its manifestations.'\n\nExplanation:\nThis law dictates how homeopathic cure occurs. When a medicine is administered, it creates an artificial, temporary medicinal disease in the Vital Force. If this medicinal disease is extremely similar to the natural disease but slightly stronger in dynamic intensity, it occupies the same receptors on the Vital Force and permanently extinguishes (annihilates) the weaker natural disease. Once the natural disease is gone, the temporary medicinal disease naturally fades away because of the highly diluted, non-toxic nature of the potency, leaving the patient completely cured.\n\nExamples from Nature:\n1. Light: The dim light of the morning stars is permanently extinguished in our eyes by the stronger, yet similar light of the rising sun.\n2. Sound: A weaker whisper is drowned out or made imperceptible by a louder, similar sound nearby.\n3. Physical: Smallpox infection prevents or cures cowpox, and vice versa, because of their extreme similarity in cutaneous eruptions, with the stronger infection extinguishing the weaker one.",
    keyPoints: [
      "Aphorism 26 defines the natural curative law: a stronger similar dynamic disease extinguishes a weaker one.",
      "The homeopathic remedy produces a slightly stronger but temporary artificial medicinal disease.",
      "Once the weaker natural disease is extinguished, the medicinal state naturally dissolves.",
      "Natural analog: The rising sun's stronger light extinguishes the weaker starlight in our eyes."
    ]
  },
  {
    id: "PYQ-013",
    question: "Explain the construction, layout, and philosophical background of Kent's Repertory.",
    subject: "Repertory",
    year: "2024",
    marks: 20,
    university: "BHU (Banaras Hindu University)",
    answer: "Repertory of the Homoeopathic Materia Medica by Dr. James Tyler Kent is the most widely utilized classical repertory. It was first published in 1897 and is based on a structured, logical philosophy.\n\n1. Philosophical Background:\nKent's Repertory is based on the philosophy of 'Generals to Particulars' (Deductive reasoning). It aligns with Swedenborg's philosophy that 'man is the mind, and the mind is the man.' Thus, Kent prioritizes mental symptoms first, physical general symptoms (sleep, food cravings, weather reactions) second, and local particulars (headache, liver pain) last.\n\n2. Plan and Construction:\nKent's Repertory is divided into 37 distinct chapters, starting with 'Mind' and ending with 'Generals'. The layout inside each chapter follows a strict alphabetical hierarchy of sub-rubrics based on the mnemonic: Time, Circumstance (Modality), and Locality/Extension.\n\n3. Grading of Remedies:\nKent uses three distinct typographic grades to represent the clinical frequency of a remedy's action:\n- Bold (3 points): The symptom was produced by almost all provers and repeatedly verified clinically.\n- Italics (2 points): The symptom was produced by several provers and occasionally verified.\n- Roman (1 point): The symptom was produced by few provers or has minor clinical confirmations.",
    keyPoints: [
      "Based on the philosophy of Generals to Particulars (deductive reasoning).",
      "Prioritizes mental symptoms first, physical generals second, and local particulars third.",
      "Structured into 37 chapters, beginning with Mind and ending with Generals.",
      "Uses three grades of remedies: Bold (3 points), Italics (2 points), and Roman (1 point)."
    ]
  },
  {
    id: "PYQ-014",
    question: "Explain the characteristic symptoms, keynotes, and clinical modalities of Gelsemium Sempervirens.",
    subject: "Materia Medica",
    year: "2023",
    marks: 10,
    university: "WBUHS (West Bengal University of Health Sciences)",
    answer: "Gelsemium Sempervirens (Yellow Jasmine) is an outstanding remedy for nervous disorders, acute infectious fevers (influenza), and anticipatory anxiety. Its clinical profile is dominated by profound muscular and nervous prostration:\n\n1. The Three 'D's (Core Keynotes):\n   - Dullness: Complete lack of mental alertness; slow comprehension and apathy.\n   - Dizziness: Vertigo originating in the occiput, making walking difficult and unsteady.\n   - Drowsiness: Soporose sleepiness; the patient can hardly keep their heavy eyelids open (ptosis).\n2. Characteristic Physical Symptoms:\n   - Trembling: Marked muscular weakness and trembling of hands, tongue, or knees under physical or emotional exertion.\n   - Thirstlessness: Intense fever with a dry skin, yet there is absolute thirstlessness.\n   - Headache: Congestive, bursting headache starting in the neck/occiput and radiating forward to settle over the eyes, characteristically relieved by a profuse flow of pale urine.\n3. Mental Sphere: Anticipatory anxiety (stage fright, exam fear) leading to nervous diarrhea or trembling. Complete absence of fear, but a strong desire to be left alone.\n4. Modalities: Aggravation from bad news, emotional excitement, damp weather, and thinking of symptoms. Amelioration from profuse urination, open air, and continuous motion.",
    keyPoints: [
      "Characterized by the three Ds: Dullness, Dizziness, and Drowsiness with muscular trembling.",
      "Fever is accompanied by dry heat and absolute thirstlessness.",
      "Nervous diarrhea triggered by anticipatory anxiety, stage fright, or bad news.",
      "Occipital headache that spreads over the head, dramatically relieved by profuse urination."
    ]
  },
  {
    id: "PYQ-015",
    question: "Describe the preparation of Mother Tinctures under Class I of the Old Method of Homeopathic Pharmacopoeia.",
    subject: "Pharmacy",
    year: "2022",
    marks: 10,
    university: "MUHS (Maharashtra University of Health Sciences)",
    answer: "Under the Old Hahnemannian Method of preparation, Class I is designated for preparing Mother Tinctures from fresh, highly succulent plants (containing the greatest amount of plant moisture). \n\nFormula and Ratio:\nClass I uses equal parts by weight of the fresh plant juice and Strong Alcohol (1:1 drug strength ratio).\n\nStep-by-Step Procedure:\n1. Extraction of Juice: The fresh succulent plant parts are finely chopped, placed in a clean linen cloth, and pressed in a screw-press to extract the pure plant juice.\n2. Mixing: Equal parts of this freshly extracted plant juice and Strong Alcohol are mixed thoroughly in a clean, sterile glass bottle.\n3. Maceration: The bottle is tightly stoppered and kept in a cool, dark place for 8 days, shaking it vigorously twice daily to ensure complete dynamic extraction.\n4. Filtration: On the 9th day, the mixture is filtered through sterile filter paper. The resulting clear liquid is the Mother Tincture, designated as 'Ø' with a drug strength of 1/2.",
    keyPoints: [
      "Class I is used for fresh, highly succulent plants with maximum plant moisture.",
      "Employs equal parts by weight of fresh plant juice and Strong Alcohol.",
      "The mixture is macerated for 8 days with daily succussions.",
      "Filtered on the 9th day, resulting in a Mother Tincture of 1/2 drug strength."
    ]
  },
  {
    id: "PYQ-016",
    question: "Discuss the classification of Chronic Diseases as described by Samuel Hahnemann in the Organon of Medicine.",
    subject: "Organon & Philosophy",
    year: "2024",
    marks: 20,
    university: "RGUHS (Rajiv Gandhi University of Health Sciences)",
    answer: "Hahnemann defines chronic diseases as those that arise from dynamic infection by a chronic miasm, progress continuously if untreated, and gradually destroy the organism despite a healthy lifestyle (Aphorisms 72-82).\n\nHahnemann classifies Chronic Diseases into three major categories:\n\n1. Pseudo-Chronic Diseases (Aphorisms 74-77):\nThese are not true chronic diseases but rather chronic sufferings induced by maintaining causes (Causa Occasionalis), such as prolonged exposure to unhygienic environments, bad diets, alcoholism, or poor sanitation. They disappear naturally when these maintaining factors are removed, without requiring anti-miasmatic treatment.\n\n2. Artificial Chronic Diseases (Aphorisms 74-76):\nThese are severe, hard-to-cure diseases produced by the prolonged, inappropriate use of large doses of toxic allopathic drugs (e.g., steroid suppressions, heavy metals). They are often incurable because they structurally ruin the organs and vital force.\n\n3. True Chronic Diseases (Aphorisms 78-81):\nThese are caused by dynamic infection by chronic infectious miasms. They cannot be cured by the vital force alone or a healthy lifestyle. They are classified by their underlying miasm:\n   - Non-Venereal: Psora (the mother of 90% of chronic diseases, manifesting as functional irritation and skin eruptions).\n   - Venereal: Sycosis (the retentive miasm, causing warts/fibroids) and Syphilis (the destructive miasm, causing ulceration/necrosis).",
    keyPoints: [
      "Pseudo-chronic diseases are caused by maintaining factors (lifestyle) and resolve when they are removed.",
      "Artificial chronic diseases are drug-induced suppressions and are extremely difficult to treat.",
      "True chronic diseases are dynamic, miasmatic, and progress indefinitely if untreated.",
      "True chronic diseases are categorized into Psora (non-venereal), Sycosis, and Syphilis (venereal)."
    ]
  },
  {
    id: "PYQ-017",
    question: "Compare and contrast the mental states of Ignatia Amara and Natrum Muriaticum in cases of silent grief.",
    subject: "Materia Medica",
    year: "2025",
    marks: 10,
    university: "MUHS (Maharashtra University of Health Sciences)",
    answer: "Both Ignatia Amara and Natrum Muriaticum are premier remedies for silent grief, emotional shocks, and disappointed love. However, they present distinct psychological patterns in clinical practice:\n\n1. Ignatia Amara (Acute Grief):\n   - Nature of State: Ignatia represents acute, recent, or volatile grief. The emotional state is highly paradoxical, unstable, and changeable.\n   - Behavior: The patient is highly hysterical, moves rapidly from tears to laughter, sighs deeply and involuntarily, and has a constant lump in the throat (globus hystericus). They are highly artistic, easily offended, and seek solitude to weep, but their emotional outbursts are sudden.\n   - Consolation: Consolation is tolerated but does not resolve the hysterical swings.\n\n2. Natrum Muriaticum (Chronic, Deep Grief):\n   - Nature of State: Natrum Muriaticum represents chronic, old, deep-seated, and suppressed emotional wounds that have hardened over time.\n   - Behavior: The patient is highly closed, reserved, and introverted. They harbor quiet resentment, dwell constantly on past unpleasant events, and build an emotional wall to prevent getting hurt again.\n   - Consolation: Consolation is absolutely intolerable. Any attempt to console or sympathize with the patient makes them intensely angry and tearful.\n   - Concomitants: Prone to a mapped tongue, intense craving for salt, and bursting headaches worse in the sun.",
    keyPoints: [
      "Ignatia is indicated for recent, acute grief with volatile, paradoxical hysterical swings and sighing.",
      "Natrum Mur is for chronic, deep-seated, suppressed grief with silent brooding over past painful memories.",
      "Ignatia is unpredictable; Natrum Mur is highly reserved, rigid, and builds emotional barriers.",
      "Consolation is tolerated in Ignatia, but completely intolerable in Natrum Mur, provoking anger."
    ]
  },
  {
    id: "PYQ-018",
    question: "Describe the clinical features of Acute Tonsillitis and discuss the indications of Belladonna and Baryta Carbonica.",
    subject: "Practice of Medicine",
    year: "2024",
    marks: 10,
    university: "RGUHS (Rajiv Gandhi University of Health Sciences)",
    answer: "Acute Tonsillitis is the acute inflammation of the palatine tonsils, typically caused by viral or bacterial infections (Streptococcus pyogenes). Clinical features include severe sore throat, difficulty in swallowing (dysphagia), high-grade fever, tender cervical lymphadenopathy, and enlarged, erythematous tonsils with or without purulent exudates.\n\nHomeopathic Indications:\n\n1. Belladonna (Atropa Belladonna):\n   - Stage: Early, acute, sudden onset with violent congestion.\n   - Throat: Tonsils are bright red, dry, shiny, and swollen. Sensation of constriction; throat feels extremely narrow. Right-sided tonsillitis is most prominent.\n   - Swallowing: Painful swallowing, especially of liquids; patient constant throat clearing.\n   - Concomitants: High-grade fever with a hot, red face, dilated pupils, throbbing carotids, cold extremities, and absolute lack of thirst.\n\n2. Baryta Carbonica (Barium Carbonate):\n   - Stage: Subacute, chronic, or recurrent tonsillitis in children.\n   - Throat: Tonsils are chronically enlarged, hard, and prone to suppurate (quinsy) upon the slightest exposure to cold.\n   - Constitution: Children with physically and mentally stunted growth (dwarfishness, slow learning, takes a long time to comprehend). Extremely shy around strangers.\n   - Swallowing: Can only swallow liquids; solid foods cause severe pain and choking.\n   - Modalities: Aggravation from cold damp air, swallowing, and empty throat clearing.",
    keyPoints: [
      "Acute tonsillitis presents with sore throat, dysphagia, fever, and erythematous palatine swelling.",
      "Belladonna is for sudden, highly congested early stages with bright red tonsils, hot face, and no thirst.",
      "Baryta Carb is for chronic, recurrent tonsillitis in children with stunted mental or physical growth.",
      "Baryta Carb tonsils suppurate easily from cold and swallow only liquids."
    ]
  },
  {
    id: "PYQ-019",
    question: "Discuss the evaluation of symptoms according to J.T. Kent and Boenninghausen.",
    subject: "Repertory",
    year: "2023",
    marks: 10,
    university: "BHU (Banaras Hindu University)",
    answer: "Evaluation of symptoms is the process of grading and organizing symptoms hierarchically to repertorize a case. Dr. Kent and Dr. Boenninghausen utilized divergent, yet scientifically sound, methodologies:\n\n1. Kent's Evaluation (Generals to Particulars):\nKent prioritizes the patient as a whole rather than the local diseased parts. His hierarchy is:\n   - Mental Generals: The highest value. Includes Will (loves/hates, suicidal), Intellect (confusion, memory), and Morals (deceitful, cursing).\n   - Physical Generals: Reactions of the whole body to the environment. Includes weather/thermal states, food cravings/aversions, sleep/dreams, and menstruation.\n   - Particulars: Symptoms of individual organs (e.g., headache, stomach ache). Rated lowest unless they are highly peculiar (PQRS).\n\n2. Boenninghausen's Evaluation (The Complete Symptom):\nBoenninghausen focuses on reconstructing a complete symptom from fragments. He evaluates symptoms based on:\n   - Location: The specific anatomical site or organ affected.\n   - Sensation: The quality of pain or experience (e.g., burning, stitching).\n   - Modality: Aggravation or amelioration from weather, posture, time (the most crucial factor for Boenninghausen).\n   - Concomitant: Co-existing symptoms that have no pathological connection to the main complaint.",
    keyPoints: [
      "Kent prioritizes Mental Generals (Will, Intellect) followed by Physical Generals and Particulars.",
      "Boenninghausen focuses on Location, Sensation, Modality, and Concomitants.",
      "Kent values the patient's individual personality; Boenninghausen values the exact symptom qualifiers.",
      "Kent uses deductive reasoning; Boenninghausen utilizes inductive grand generalizations."
    ]
  },
  {
    id: "PYQ-020",
    question: "Define 'Doctrine of Signatures'. Provide four examples showing its historical and therapeutic relevance.",
    subject: "Pharmacy",
    year: "2024",
    marks: 10,
    university: "WBUHS (West Bengal University of Health Sciences)",
    answer: "The Doctrine of Signatures is an ancient, pre-scientific belief that the physical characteristics, colors, habitats, behaviors, or textures of natural substances contain a signature or sign from nature indicating their medicinal values.\n\nWhile Hahnemann cautioned that clinical prescription must solely rely on systematic drug provings rather than signatures, many homeopathic provings have validated these natural analogies:\n\n1. Chelidonium Majus (Celandine):\n   - Signature: The plant has a bright yellow, milky juice.\n   - Relevance: Homeopathic proving established it as a premier remedy for jaundice, liver disorders, and yellow stools, where bile flows in excess.\n2. Lachesis Mutus (Bushmaster Snake):\n   - Signature: The snake is extremely hyperactive, loquacious before striking, and constricts its prey to choke them.\n   - Relevance: Proven to treat highly loquacious patients who suffer from severe choking sensations and cannot tolerate any constriction around the neck.\n3. Bellis Perennis (Daisy):\n   - Signature: Grows flat on the ground and is repeatedly stepped on or crushed, yet rises back up undamaged.\n   - Relevance: Highly effective for deep muscular soreness, trauma, and mechanical bruising of pelvic tissues.\n4. Calcarea Carbonica (Calcium Carbonate):\n   - Signature: Obtained from the hard, protective shell of the oyster, protecting a soft, vulnerable interior.\n   - Relevance: Indicated for patients who are soft, flabby, vulnerable to stress, and build a protective mental or physical shell around themselves.",
    keyPoints: [
      "Doctrine of Signatures links a substance's physical traits or habitat to its curative effects.",
      "Hahnemann insisted that drug provings are the only scientific criteria for clinical use.",
      "Chelidonium's yellow sap matches its use in jaundice and biliary tract disorders.",
      "Lachesis's snake constriction matches its use in choking throat sensations."
    ]
  }
];
