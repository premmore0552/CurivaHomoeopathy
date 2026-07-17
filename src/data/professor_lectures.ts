import { organonData } from './organon_data';

export interface ProfessorLecture {
  id: number;
  seoTitle: string;
  metaDesc: string;
  simpleExplanation: string;
  detailedUnderstanding: string;
  importantConcepts: string[];
  clinicalRelevance: string;
  practicalExample: string;
  keyTakeaways: string[];
  examNotes: string;
  conceptExplained?: {
    concept: string;
    analogy: string;
    simplified: string;
    visualSuggestion: string;
  };
  relatedIds: number[];
}

const keyConceptMap = (id: number): string[] => {
  if (id === 1 || id === 2) return ["Physician's Mission"];
  if (id === 3) return ["Physician's Mission", "Individualization", "Potency"];
  if (id === 4) return ["Physician's Mission"];
  if (id === 5) return ["Miasms", "Chronic Diseases"];
  if (id === 6) return ["Individualization", "Case Taking"];
  if (id >= 7 && id <= 8) return ["Vital Force", "Individualization"];
  if (id >= 9 && id <= 18) return ["Vital Force", "Susceptibility"];
  if (id >= 19 && id <= 21) return ["Drug Proving"];
  if (id >= 22 && id <= 26) return ["Potency", "Repetition of Remedy"];
  if (id >= 71 && id <= 72) return ["Case Taking", "Drug Proving", "Miasms"];
  if (id >= 73 && id <= 82) return ["Chronic Diseases", "Miasms"];
  if (id >= 83 && id <= 104) return ["Case Taking", "Individualization"];
  if (id >= 105 && id <= 145) return ["Drug Proving"];
  if (id >= 146 && id <= 244) return ["Repetition of Remedy", "Potency"];
  if (id >= 245 && id <= 285) return ["Potency", "Repetition of Remedy"];
  return ["Individualization", "Potency"];
};

const getRelatedIds = (id: number): number[] => {
  const defaults: Record<number, number[]> = {
    1: [2, 3, 4],
    2: [1, 26, 71],
    3: [71, 105, 146],
    4: [5, 74, 77],
    5: [72, 73, 80],
    6: [83, 84, 98],
    9: [10, 11, 15],
    26: [2, 27, 28]
  };
  return defaults[id] || [1, 2, 3].filter(x => x !== id);
};

export const getProfessorLecture = (id: number): ProfessorLecture => {
  const aph = organonData.find(a => a.id === id);
  const originalText = aph?.versions[0]?.content || "Original text available in standard edition.";
  
  // Specific detailed lecture nodes for high-yield aphorisms
  const lectures: Record<number, Partial<ProfessorLecture>> = {
    1: {
      seoTitle: "Aphorism 1 Study Guide: The Physician's High and Only Mission",
      metaDesc: "Master Aphorism 1 of Samuel Hahnemann's Organon of Medicine. Simple explanation, clinical importance, and BHMS exam notes on the true mission of a physician.",
      simpleExplanation: "The sole duty of a doctor is to make sick people healthy again. They should not waste time building speculative philosophical theories about how diseases originate inside the body.",
      detailedUnderstanding: "Hahnemann begins his masterpiece with a revolutionary declaration of medical utility. He separates the practical healer from the scholastic academic. At the time, medicine was dominated by abstract theories (such as excess humors, noxious vapors, and spiritual disharmonious elements) leading to violent therapies like bloodletting and purging. Hahnemann asserts that medical science must be judged purely by its clinical utility—its capacity to restore health. Any medical system that prioritizes complex, unprovable nomenclature over the actual relief of patient suffering is a failure of its primary purpose.",
      importantConcepts: ["Physician's Mission", "Individualization"],
      clinicalRelevance: "Your clinical focus should always remain on treating the active, observable symptom presentation of the patient, rather than getting distracted by speculative diagnostic names or constructing ungrounded physiological hypotheses.",
      practicalExample: "Imagine a fire fighter arriving at a burning house. Their 'high and only mission' is to put out the fire and save the occupants. If they instead stand outside writing a theoretical thesis on the chemical composition of the flames while the house burns down, they have failed. The firefighter must act, not speculate.",
      keyTakeaways: [
        "The highest goal of a physician is to restore health to the sick, which is defined as a 'cure'.",
        "Avoid building theoretical or speculative systems that explain diseases with unintelligible words.",
        "Clinical practice must be grounded in sensory-based observation and practical results."
      ],
      conceptExplained: {
        concept: "The 'Mission' vs. 'Theoretic Medicine'",
        simplified: "A physician's mission is a sacred mandate of active cure. Theoretic medicine relies on unprovable laboratory theories and terminology that sounds learned but leaves the patient suffering.",
        analogy: "Like a mechanic who focuses on actually tuning your car engine to run smoothly, rather than spending hours lecturing you on the molecular physics of combustion while your car remains broken.",
        visualSuggestion: "Draw a simple balance scale. On one side, place 'Theoretic Speculations' (heavy but useless words). On the other, place 'Cure of the Sick' (light, simple, and restorative). Highlight the second side."
      },
      examNotes: "Highly repeating 5-mark question. Students must explain footnote 1, specifically criticizing 'theoretical medicine' and how it deceives suffering humanity. Explain the difference between 'Mission' (what is assigned to do) and 'Task/Ambition' (personal pursuits)."
    },
    2: {
      seoTitle: "Aphorism 2 Study Guide: The Highest Ideal of Cure",
      metaDesc: "Comprehensive study aid for Aphorism 2 of the Organon. Learn the components of the highest ideal of cure: rapid, gentle, and permanent restoration of health.",
      simpleExplanation: "The perfect treatment is one that restores health quickly, gently, and permanently. It must remove the disease completely, in the safest and most harmless way, based on clear and logical principles.",
      detailedUnderstanding: "This aphorism establishes the qualitative parameters of the 'cure' mentioned in Aphorism 1. A true homeopathic cure is not just a temporary suppression of symptoms. It must fulfill three strict criteria: (1) Rapid: Action must be timely without prolonged suffering. (2) Gentle: It must avoid painful, toxic side effects or secondary damages. (3) Permanent: The root cause of the susceptibility must be cleared, preventing recurrence. Furthermore, the selection of the remedy must be guided by easily comprehensible and scientific principles (Similia Similibus Curantur), rather than blind trial and error.",
      importantConcepts: ["Physician's Mission", "Potency"],
      clinicalRelevance: "If a treatment protocol causes severe healing crises, toxic side-effects, or local suppression followed by new symptoms elsewhere, it violates the 'gentle' requirement and cannot be called a true cure.",
      practicalExample: "If a child has a skin eruption, applying a strong chemical steroid cream might clear the skin quickly, but it often drives the inflammation deeper into the lungs, causing asthma. This is not gentle or permanent. A homeopathic remedy like Sulphur clears the skin from within, permanently restoring overall health without side-effects.",
      keyTakeaways: [
        "A true cure must be rapid, gentle, and permanent.",
        "Symptom suppression is the polar opposite of a scientific cure.",
        "The curative principles must be logical, easily comprehensible, and scientifically reproducible."
      ],
      conceptExplained: {
        concept: "The Highest Ideal of Cure",
        simplified: "A standard of therapeutic perfection. If a treatment removes a headache but leaves the patient with stomach ulcers, it is not an ideal cure because it is not harmless.",
        analogy: "Like removing weeds from a garden. Cutting the leaves off is rapid, but they grow back. Pulling the roots out completely, without ruining the surrounding flowers, is a permanent, gentle, and ideal cure.",
        visualSuggestion: "Create a Venn Diagram with three overlapping circles labeled: 'Rapid', 'Gentle', and 'Permanent'. The central overlapping region represents the 'Highest Ideal of Cure'."
      },
      examNotes: "Crucial definition. Frequently asked as a 5-mark short note or 2-mark definition. You must write the exact phrasing: 'rapid, gentle and permanent restoration of health...' and detail the scientific principles of similia."
    },
    3: {
      seoTitle: "Aphorism 3 Study Guide: The True Knowledge of a Practitioner",
      metaDesc: "Explore Aphorism 3 of Organon of Medicine. Detailed analysis of the four-fold knowledge required by every homeopathic physician to achieve a cure.",
      simpleExplanation: "To cure, a doctor must know: (1) what is curable in diseases, (2) what is curative in medicines, (3) how to match the medicine to the disease in terms of dose, selection, and repetition, and (4) how to remove obstacles to recovery.",
      detailedUnderstanding: "Aphorism 3 is the blueprint of clinical competency. It outlines a systematic approach that bridges diagnostics and therapeutics. First, the physician must perceive the curable indications in each unique patient (individualized symptoms). Second, they must understand the therapeutic powers of each drug (obtained via scientific drug proving). Third, they must master the application of this knowledge: selecting the exact similar remedy (Simillimum), the correct strength (Potency), and the proper interval of repetition. Finally, they must identify and remove external obstacles (such as poor hygiene, toxic diet, or stressful environments) that prevent the patient's recovery.",
      importantConcepts: ["Physician's Mission", "Individualization", "Potency"],
      clinicalRelevance: "This aphorism demands that we do not prescribe mechanically. We must evaluate every case uniquely, recognize when a disease is past the point of reversibility, and master the secondary rules of dosage and hygienic modifications.",
      practicalExample: "A patient with chronic migraines is given the correct constitutional remedy, but they continue to drink heavy alcohol and sleep only 3 hours a night. The alcohol and sleep deprivation are 'obstacles to recovery'. The physician must recognize this and guide the patient to change their lifestyle so the remedy can act.",
      keyTakeaways: [
        "Knowledge of disease: Identifying what needs to be cured in the specific patient.",
        "Knowledge of medicine: Knowing the precise curative powers of our natural remedies.",
        "Obstacles to recovery: Recognizing and removing environmental or dietary factors that block healing."
      ],
      conceptExplained: {
        concept: "The Four-Fold Knowledge of the Healer",
        simplified: "A complete framework of action. Knowing what is wrong, knowing what tool to use, knowing how to apply that tool, and clearing the path for the tool to work.",
        analogy: "A master mechanic knows exactly what sound indicates a loose spark plug (disease), knows what socket wrench fits it (medicine), knows how much force to apply to tighten it (potency/dose), and cleans away rust blocks (obstacles to recovery).",
        visualSuggestion: "Draw a simple quadrant box: 1. Knowledge of Disease | 2. Knowledge of Medicine | 3. Knowledge of Application (Dose/Repetition) | 4. Removal of Obstacles. Label it 'The Roadmap of Cure'."
      },
      examNotes: "Extremely important. The most frequent 10-mark or 20-mark essay question in Organon exams. You must elaborate on all four pillars: Knowledge of Disease, Medicine, Dose, and Obstacles."
    },
    4: {
      seoTitle: "Aphorism 4 Study Guide: The Preserver of Health",
      metaDesc: "Master Aphorism 4 of the Organon of Medicine. Learn how the homeopathic physician acts as a preserver of health by removing obstacles to recovery.",
      simpleExplanation: "A doctor is also a preserver of health. To keep people healthy, they must understand what causes diseases, how to prevent them, and how to maintain the body's natural hygiene and strength.",
      detailedUnderstanding: "Hahnemann expands the role of the physician from cure to prevention. He asserts that a true medical professional must understand the etiology of health, not just pathology. By identifying exciting causes (environmental stress, pathogens, toxins, occupational hazards) and maintaining appropriate dietetic and hygienic standards, the physician helps healthy people maintain their vitality. This aligns homeopathy with modern preventive medicine, sanitation, and public health guidelines.",
      importantConcepts: ["Physician's Mission"],
      clinicalRelevance: "In practice, you must advise patients on clean drinking water, proper ventilation, balanced nutrition, and stress reduction. These are crucial to preserving health and reinforcing the vital force.",
      practicalExample: "If a patient works in a damp, unventilated basement and develops chronic bronchitis, the physician must advise them to improve ventilation or change their workspace. No amount of remedies will permanently cure them if they continue to live in the exciting cause.",
      keyTakeaways: [
        "The physician has a duty to prevent diseases, not just cure them.",
        "Understand the healthy state and the exciting causes of disease.",
        "Emphasize hygiene, sanitation, and healthy lifestyle choices."
      ],
      examNotes: "Common 5-mark short note. Relate this directly to Aphorism 3 (obstacles to recovery). Discuss Hahnemann's historical role in pioneer hygiene and isolation during cholera epidemics."
    },
    5: {
      seoTitle: "Aphorism 5 Study Guide: Exciting and Fundamental Causes",
      metaDesc: "Aphorism 5 of the Organon of Medicine explained simply. Learn about exciting causes in acute illnesses and fundamental causes (miasms) in chronic diseases.",
      simpleExplanation: "To treat a patient, find out the 'exciting cause' for sudden, acute illnesses, and the deep 'fundamental cause' (which is usually a chronic miasm) for long-term chronic diseases.",
      detailedUnderstanding: "This aphorism is the entry point for Hahnemann's revolutionary theory of Miasms. He categorizes diseases into two groups: (1) Acute: Self-limiting diseases triggered by a specific exciting cause (such as sudden cold exposure, bad food, or emotional trauma). (2) Chronic: Long-term diseases that progress slowly, rooted in deep fundamental causes called Chronic Miasms (Psora, Sycosis, Syphilis). The physician must thoroughly investigate the patient's complete physical constitution, mental character, occupation, habits, social relations, and medical history to map this underlying fundamental cause.",
      importantConcepts: ["Miasms", "Chronic Diseases", "Individualization"],
      clinicalRelevance: "For an acute cough, you prescribe on the immediate exciting cause (e.g., cold wind - Aconite). But for chronic asthma, you must analyze the patient's complete pedigree and miasmatic background to choose a deep-acting constitutional antipsoric remedy.",
      practicalExample: "A spark (exciting cause) can set off a pile of dry gunpowder (fundamental susceptibility). If you blow on the spark, it goes out (acute treatment). But if the house is full of dry gunpowder, you must clean it up (miasmatic chronic treatment) so sparks don't cause an explosion.",
      keyTakeaways: [
        "Exciting Cause triggers acute, sudden diseases.",
        "Fundamental Cause is the chronic miasmatic background of the patient.",
        "A complete case taking must investigate physical, emotional, social, and genetic factors."
      ],
      conceptExplained: {
        concept: "Exciting vs. Fundamental Cause",
        simplified: "An exciting cause is the immediate trigger. A fundamental cause is the pre-existing inner weakness or susceptibility that allows the trigger to take hold.",
        analogy: "Slipping on ice and spraining an ankle. The ice is the exciting cause. The osteoporosis (weak bones) that causes it to fracture instead of just bruise is the fundamental cause.",
        visualSuggestion: "Draw an iceberg. The small tip above water represents the 'Exciting Cause' (acute symptoms). The massive body submerged represents the 'Fundamental Cause' (Chronic Miasm)."
      },
      examNotes: "Highly important for second and third-year BHMS. 10-mark question on chronic miasms and physical constitution. Must detail the parameters Hahnemann outlines for chronic case investigation."
    },
    6: {
      seoTitle: "Aphorism 6 Study Guide: The Unprejudiced Observer",
      metaDesc: "Detailed guide for Aphorism 6 of Organon of Medicine. Learn the definition of an unprejudiced observer and how to record the symptom portrait.",
      simpleExplanation: "A homeopathic doctor must observe the patient without any preconceived biases. They must only record the actual changes in the mind and body that they can see, hear, or feel, or that are reported by others.",
      detailedUnderstanding: "Hahnemann warning against the medical bias of his time. When a physician approaches a case with a rigid diagnosis in mind, they tend to bend the patient's symptoms to fit that diagnosis. Hahnemann demands that the physician must be an 'unprejudiced observer' (Unbefangener Beobachter). They should observe only alterations in health that are perceptible through the senses. These alterations make up the 'Portrait of the Disease' (Symptom-Gesamtheit), which is the only reliable guide to selecting the remedy.",
      importantConcepts: ["Individualization", "Case Taking"],
      clinicalRelevance: "Do not prescribe on a diagnostic label like 'Migraine' or 'Eczema'. Instead, record the unique sensations, modalities, and emotional changes of the patient. Let these sensory facts guide you to the remedy.",
      practicalExample: "If a doctor assumes all cases of arthritis need Bryonia because it's a cold damp winter, they are prejudiced. If they listen closely, they might discover the patient feels better by cold applications and slow motion, which leads to Pulsatilla. Being unprejudiced saves the patient.",
      keyTakeaways: [
        "An unprejudiced observer records facts without letting diagnostic biases interfere.",
        "Disease is known to us clinically only through the totality of symptoms.",
        "Avoid speculative pathology; focus on what can be perceived by the senses."
      ],
      conceptExplained: {
        concept: "The Unprejudiced Observer",
        simplified: "The ability to observe and record symptoms exactly as they are, without trying to force them into pre-existing scientific classifications or biases.",
        analogy: "A fair judge in a courtroom who listens to all witnesses and reads all evidence without having decided who is guilty beforehand.",
        visualSuggestion: "Draw a pair of spectacles. On one lens, write 'Biases/Labels' (foggy and blurred). On the other lens, write 'Sensory Facts' (crystal clear). Highlight the clear lens as the unprejudiced observer's view."
      },
      examNotes: "A classic 5-mark short note topic. Define 'Unbefangener Beobachter'. Explain why Hahnemann condemned speculative pathology and how this protects the patient from wrong treatments."
    },
    9: {
      seoTitle: "Aphorism 9 Study Guide: The Spirit-like Vital Force",
      metaDesc: "Deep study of Aphorism 9 of Samuel Hahnemann's Organon. Learn about the spiritual, self-acting Vital Force (Dynamis) that animates the healthy body.",
      simpleExplanation: "In a healthy state, a spiritual, invisible force (called the Vital Force or Dynamis) animates our material body. It maintains all functions and sensations in a perfect, harmonious balance, allowing our higher mind to use the body for our life's purpose.",
      detailedUnderstanding: "Aphorism 9 introduces the spiritualist foundation of homeopathic physiology. Hahnemann asserts that life is not just a chemical machine or mechanical construct. There is an immaterial, dynamic energy—the Vital Force (Lebenskraft)—that maintains physiological homeostasis. It governs all automatic sensations and functions of the physical body. In health, this vital force maintains a harmonious dynamic equilibrium, enabling the human spirit to freely employ this living instrument for the higher, intellectual purposes of existence.",
      importantConcepts: ["Vital Force", "Susceptibility"],
      clinicalRelevance: "We do not treat the physical organs in isolation. We treat the dynamic, spirit-like vital force. Because diseases are dynamic derangements of this force, our remedies must also be dynamized (potentized) to reach this subtle level of life.",
      practicalExample: "Think of an acoustic guitar. The wood and strings are the physical body. The music produced in perfect harmony is health. The guitarist who tunes and vibrates the strings is the Vital Force. Without the guitarist, the guitar is a silent, dead object.",
      keyTakeaways: [
        "The Vital Force is immaterial, spiritual, and self-acting (autocratic).",
        "It maintains harmonious sensation and function in health.",
        "The physical body is a passive instrument animated by this dynamic force."
      ],
      conceptExplained: {
        concept: "The Vital Force (Dynamis)",
        simplified: "The invisible energy grid or life-force that keeps our heart beating, cells dividing, and organs communicating in complete harmony.",
        analogy: "Like the software operating system running on a laptop. The laptop screen and keyboard are physical, but they are useless without the dynamic operating system coordinating them.",
        visualSuggestion: "Draw a glowing outline around a human body silhouette, with radiating energy lines representing the 'Vital Force'. Label the physical body as 'Material Instrument' and the energy as 'Harmonious Dynamis'."
      },
      examNotes: "Highly recurring exam topic. 10-mark or 20-mark essay on the concept of Vital Force in health, disease, and cure. Memorize the exact characteristics: spiritual, automatic, autocratic, unconscious."
    },
    26: {
      seoTitle: "Aphorism 26 Study Guide: The Therapeutic Law of Nature",
      metaDesc: "Master Aphorism 26 of Organon of Medicine. Learn about the Therapeutic Law of Nature and how Similia Similibus Curantur operates.",
      simpleExplanation: "A weaker dynamic illness is permanently wiped out in the living body by a stronger, similar illness, if the stronger one is caused by a different source (like a homeopathic medicine).",
      detailedUnderstanding: "Aphorism 26 is the core scientific justification for the Law of Similars. Hahnemann outlines how cures occur in nature. When two dynamic affections meet in the body, they do not merge; rather, the stronger, similar one extinguishes the weaker, similar one. Since homeopathic remedies are prepared in dynamic potencies, they act as a slightly stronger, artificial disease. When administered to a patient with a similar natural disease, this artificial disease occupies the vital force, displacing and extinguishing the natural disease. The vital force then easily overcomes the brief artificial drug effect, leaving the patient completely free and cured.",
      importantConcepts: ["Potency", "Repetition of Remedy"],
      clinicalRelevance: "This is why your remedy must match the patient's symptoms as closely as possible. It is this similarity that allows the artificial drug disease to perfectly displace and extinguish the natural disease on the vital plane.",
      practicalExample: "If you are in a quiet room and someone whispers, you can hear it (natural disease). If someone else suddenly speaks slightly louder in a very similar tone, the whisper is completely drowned out and disappears (remedy action).",
      keyTakeaways: [
        "This is the Therapeutic Law of Nature: a stronger similar dynamic affection extinguishes the weaker.",
        "Homeopathic remedies act as controlled, safe, artificial drug diseases.",
        "Cure is a process of dynamic displacement, not chemical combat."
      ],
      conceptExplained: {
        concept: "The Therapeutic Law of Nature",
        simplified: "The rule that two very similar dynamic feelings cannot exist in the same space; the stronger one will always push out and replace the weaker one.",
        analogy: "If you stub your toe, rubbing it firmly (which creates a similar, stronger sensory input) relieves the pain. Or, looking at stars: they disappear from the sky when the sun (a stronger similar source of light) rises.",
        visualSuggestion: "Draw a dark cloud (Natural Disease) being completely pushed out and replaced by a slightly brighter, matching cloud (Artificial Remedy Disease) which then fades away, leaving a clear blue sky (Cure)."
      },
      examNotes: "A major 10-mark question. Must write the exact wording of Aphorism 26. Explain the dynamic process of displacement, and how it differs from antipathic (contraria) or allopathic principles."
    }
  };

  const selectedLecture = lectures[id];
  const keys = keyConceptMap(id);
  const related = getRelatedIds(id);

  if (selectedLecture) {
    return {
      id,
      seoTitle: selectedLecture.seoTitle || `Aphorism §${id} Study Center`,
      metaDesc: selectedLecture.metaDesc || `Comprehensive BHMS study guide for Aphorism §${id}.`,
      simpleExplanation: selectedLecture.simpleExplanation || "",
      detailedUnderstanding: selectedLecture.detailedUnderstanding || "",
      importantConcepts: keys,
      clinicalRelevance: selectedLecture.clinicalRelevance || "",
      practicalExample: selectedLecture.practicalExample || "",
      keyTakeaways: selectedLecture.keyTakeaways || [],
      examNotes: selectedLecture.examNotes || "",
      conceptExplained: selectedLecture.conceptExplained,
      relatedIds: related
    };
  }

  // Smart dynamic generator fallback for other aphorisms
  let sectionName = "Doctrinal Philosophy";
  let actionAdvice = "Ensure thorough constitutional evaluation of the client.";
  let examNoteContent = "Focus on the definition and relative aphorism cross-references.";
  let analogyText = "A precise key unlocking a custom lock.";
  let simplExplanationText = `Aphorism §${id} provides essential administrative and clinical instructions, helping practitioners refine their application of homeopathic principles.`;
  let detailedText = `In Aphorism §${id}, Samuel Hahnemann clarifies the detailed administrative and scientific rules of homeopathic practice. He emphasizes that the restoration of health must follow strict natural laws rather than arbitrary treatments or theoretical speculation. This paragraph plays a critical role in establishing the systematic and scientific approach of classic homeopathy, building a bridge between theoretical principles and actual clinical results. It addresses the exact duties of the physician during therapy and the proper observation of dynamic reactions.`;

  if (id >= 71 && id <= 104) {
    sectionName = "Clinical Case Taking";
    actionAdvice = "Carefully record all objective and subjective changes without leading the patient's answers.";
    examNoteContent = "Typically asked in questions regarding the rules of Case Taking (§83-104) and the preservation of the patient's exact expressions.";
    analogyText = "A painter painting a portrait of a subject. Every tiny mole and color shade must be faithfully reproduced without drawing what isn't there.";
    simplExplanationText = "To understand a patient's illness, the doctor must conduct a systematic, unbiased interview, recording their exact words and symptoms without interrupting or leading.";
    detailedText = `This section of the Organon outlines the exact, practical steps of homeopathic case-taking. Hahnemann stresses the importance of listening without interruption, recording symptoms in the patient's own vernacular, and carefully observing non-verbal physical signs. This methodology prevents the physician from introducing subjective biases and ensures that the resulting 'portrait of the disease' is a pure, unadulterated representation of the patient's unique dynamic susceptibility.`;
  } else if (id >= 105 && id <= 145) {
    sectionName = "Drug Proving & Pathogenetic Powers";
    actionAdvice = "Always test medicinal substances on healthy human beings of different ages and constitutions to map their pure effects.";
    examNoteContent = "Crucial for questions about Drug Proving rules, qualities of a good prover, and why animals cannot be used for proving.";
    analogyText = "Testing a new musical instrument by playing it in a silent room to hear its pure, natural sound before using it in an orchestra.";
    simplExplanationText = "Medicines must be tested on healthy people of all ages and constitutions to discover their true, natural curative powers before they are used to treat sick people.";
    detailedText = `Hahnemann explains that the curative powers of medicines are completely hidden in their natural state and can only be discovered by observing the alterations in health they produce when administered to healthy human volunteers. This process, known as 'Drug Proving' (Homöopathische Arzneimittelprüfung), provides a scientific and objective record of each medicine's pathogenetic spectrum, which is subsequently matched with similar natural diseases during treatment.`;
  } else if (id >= 146 && id <= 244) {
    sectionName = "Practical Administration & Posology";
    actionAdvice = "Match the remedy with absolute similarity and administer in the minimum dose, observing the subsequent dynamic vital reaction.";
    examNoteContent = "Frequently asked in questions on remedy selection, managing homeopathic aggravations, and the concept of the similar remedy.";
    analogyText = "An elegant key that perfectly fits a security lock. Only the matching cut turns the tumbler effortlessly without breaking the mechanism.";
    simplExplanationText = "After finding the similar remedy, the doctor must administer it in a carefully selected minimal dose, allowing the vital force to respond without causing unnecessary distress.";
    detailedText = `This chapter details the clinical application of the simillimum. Once the remedy is chosen, the physician must manage the dosage, monitor for homeopathic aggravations (which are mild, transient intensifications of symptoms showing that the remedy has hit its target), and determine when it is appropriate to repeat or change the remedy based on the movement of the vital force.`;
  } else if (id >= 245 && id <= 285) {
    sectionName = "Potency & Pharmacoproxy";
    actionAdvice = "Use the LM or Centesimal scale to potentize remedies, reducing material toxicity while raising dynamic curative power.";
    examNoteContent = "Essential for questions on dynamic potentization, the 50-millesimal (LM) scale, and the mechanical process of succussion.";
    analogyText = "Striking a tuning fork. The physical strike is brief, but the sound waves travel dynamically through the air, causing other similar tuning forks to vibrate in harmony.";
    simplExplanationText = "Medicines should be prepared through serial dilution and succussion (shaking), which removes their physical poison and releases their inner, spiritual healing energy.";
    detailedText = `Hahnemann explains the science of potentization (dynamization). By diluting a medicinal substance and subjecting it to mechanical succussion or trituration, the material toxicity is systematically removed, while its spirit-like curative power is unlocked and amplified. This allows the remedy to communicate directly with the spirit-like vital force of the sick patient.`;
  }

  const keysForDynamic = keyConceptMap(id);

  return {
    id,
    seoTitle: `Aphorism §${id} Study Guide: ${sectionName} | BHMS Professor Lectures`,
    metaDesc: `Master Samuel Hahnemann's Organon of Medicine Aphorism §${id}. High-yield simplified notes, clinical relevance, and exam preparations for BHMS students.`,
    simpleExplanation: simplExplanationText,
    detailedUnderstanding: detailedText,
    importantConcepts: keysForDynamic,
    clinicalRelevance: `Ensures clinical adherence to the laws of ${sectionName.toLowerCase()}. ${actionAdvice}`,
    practicalExample: `In practice, applying Aphorism §${id} is like using ${analogyText.toLowerCase()}`,
    keyTakeaways: [
      `Aphorism §${id} establishes a core clinical pillar in the ${sectionName} section.`,
      "Helps prevent common clinical mistakes and ensures non-toxic, gentle treatment.",
      "Ensures the practitioner remains focused on the patient's natural symptoms."
    ],
    examNotes: `A critical topic for BHMS syllabus evaluations. ${examNoteContent}`,
    conceptExplained: {
      concept: sectionName,
      simplified: simplExplanationText,
      analogy: `Think of it like ${analogyText.toLowerCase()}`,
      visualSuggestion: `Draw a flowchart highlighting the relationship between raw substance potentization and its dynamic curative reaction on the patient's vital force.`
    },
    relatedIds: related
  };
};
