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
  }
];
