export interface PsychologyTopic {
  id: string;
  slug: string;
  title: string;
  category: string;
  definition: string;
  overview: string;
  organonCorrelation: {
    aphorisms: string;
    explanation: string;
  };
  keyConcepts: {
    heading: string;
    details: string;
  }[];
  clinicalRelevance: string;
  examQuestions: {
    type: 'SAQ' | 'LAQ' | 'Viva';
    question: string;
    marks?: number;
    answerKey: string;
  }[];
  takeaways: string[];
}

export const PSYCHOLOGY_TOPICS: PsychologyTopic[] = [
  {
    id: "1",
    slug: "introduction-to-psychology",
    title: "1. Introduction to Psychology & Mind Aphorisms",
    category: "BHMS Psychology & Philosophy",
    definition: "Psychology is the scientific study of human mind, mental processes, and behavior, serving as an indispensable foundation for Homoeopathic clinical case taking.",
    overview: "In Homoeopathic therapeutics, mind and body form an indivisible dynamic unity. Hahnemann emphasized in Aphorisms §210–§230 that the state of the patient's disposition and mind is the chief factor in selecting the homoeopathic remedy.",
    organonCorrelation: {
      aphorisms: "Aphorisms §210 – §213",
      explanation: "Hahnemann states in §210 that so-called mental diseases are not fundamentally distinct from physical diseases; in all diseases, the altered state of disposition (Gemüth) and mind (Geist) is primarily to be noticed."
    },
    keyConcepts: [
      {
        heading: "Scope of Psychology in BHMS",
        details: "Understanding normal human behavior, cognitive functions, emotional regulation, and personality traits enables the homoeopath to identify altered or peculiar mental symptoms during case taking."
      },
      {
        heading: "Schools of Psychology",
        details: "Covers Structuralism (Wundt), Functionalism (James), Psychoanalysis (Freud), Behaviorism (Watson), and Humanistic Psychology (Rogers & Maslow)."
      }
    ],
    clinicalRelevance: "Enables the physician to distinguish between constitutional mental traits and disease-induced alterations of disposition.",
    examQuestions: [
      {
        type: "LAQ",
        question: "Define Psychology. Discuss the relevance of psychology in Homoeopathic case taking with reference to Aphorisms §210-213.",
        marks: 10,
        answerKey: "Define psychology; explain mind-body unity; discuss Gemüth and Geist; highlight §210 rule on mental symptoms in all diseases."
      },
      {
        type: "Viva",
        question: "What did Hahnemann mean by 'Gemüth' in Organon?",
        answerKey: "Gemüth refers to the emotional disposition, feelings, and mood of the patient, distinct from Geist (intellect/mind)."
      }
    ],
    takeaways: [
      "Mind and body form a dynamic continuum in health and disease.",
      "Mental disposition (Gemüth) is paramount in remedy selection (§211)."
    ]
  },
  {
    id: "2",
    slug: "learning",
    title: "2. Psychology of Learning & Conditioning",
    category: "BHMS Psychology",
    definition: "Learning is a relatively permanent change in behavior or mental associations resulting from experience, observation, or practice.",
    overview: "Explores Classical Conditioning (Pavlov), Operant Conditioning (Skinner), Trial and Error (Thorndike), and Cognitive Insight Learning (Köhler), relating them to habit formation, phobias, and conditioned responses in patients.",
    organonCorrelation: {
      aphorisms: "Aphorisms §224 – §226",
      explanation: "Hahnemann addresses mental diseases caused by emotional shock, bad habits, or faulty education, recommending psychotherapeutic management alongside potentized remedies."
    },
    keyConcepts: [
      {
        heading: "Classical Conditioning (Pavlov)",
        details: "Unconditioned stimulus (UCS) pairing with conditioned stimulus (CS) to elicit a conditioned response (CR). Explains emotional phobias and conditioned anxiety."
      },
      {
        heading: "Operant Conditioning (Skinner)",
        details: "Reinforcement (positive and negative) and punishment shaping voluntary behavior patterns and symptom manifestation."
      }
    ],
    clinicalRelevance: "Helps homoeopaths differentiate learned maladaptive behaviors from deep miasmatic constitutional illness during case analysis.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Explain Pavlovian Classical Conditioning and its clinical applications in understanding anxiety.",
        marks: 5,
        answerKey: "Define UCS, UCR, CS, CR; draw Pavlov's experiment diagram; link conditioned stimulus to anticipatory anxiety."
      }
    ],
    takeaways: [
      "Conditioned emotional responses frequently trigger acute physical exacerbations.",
      "Psychotherapeutic re-conditioning is complementary to homoeopathic remedy action (§226)."
    ]
  },
  {
    id: "3",
    slug: "memory",
    title: "3. Human Memory Systems & Cognitive Storage",
    category: "BHMS Psychology",
    definition: "Memory is the mental faculty of encoding, storing, consolidating, and retrieving information and past experiences.",
    overview: "Covers the Information-Processing Model (Sensory, Short-Term, Long-Term Memory), forgetting theories (Decay, Interference, Repression), and memory impairment in neurological and psychiatric illness.",
    organonCorrelation: {
      aphorisms: "Aphorisms §215 – §217",
      explanation: "Evaluates intellectual faculties—including memory loss, confusion, and amnesia—as key characteristic symptoms of one-sided mental diseases."
    },
    keyConcepts: [
      {
        heading: "Stage Model of Memory (Atkinson & Shiffrin)",
        details: "Sensory Register (iconic/echoic) -> Short-Term Memory (7±2 chunks) -> Long-Term Memory (Episodic, Semantic, Procedural)."
      },
      {
        heading: "Forgetting & Repression",
        details: "Ebbinghaus Forgetting Curve; Freudian active repression of traumatic memories into the subconscious."
      }
    ],
    clinicalRelevance: "Essential for taking cases of dementia, delirium, PTSD, and pediatric learning disabilities.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Describe the Atkinson-Shiffrin Model of Memory and types of Long-Term Memory.",
        marks: 5,
        answerKey: "Outline Sensory, STM, LTM; explain Episodic vs Semantic memory with clinical examples."
      }
    ],
    takeaways: [
      "Memory alterations (e.g. absent-mindedness, amnesia) are prominent rubrics in Repertory.",
      "Repressed traumatic memories often manifest as physical somatization."
    ]
  },
  {
    id: "4",
    slug: "intelligence",
    title: "4. Intelligence & Cognitive Assessment",
    category: "BHMS Psychology",
    definition: "Intelligence is the aggregate or global capacity of the individual to act purposefully, to think rationally, and to deal effectively with their environment.",
    overview: "Examines Theories of Intelligence (Spearman's Two-Factor, Gardner's Multiple Intelligences), Intelligence Quotient (IQ), and Emotional Intelligence (EQ).",
    organonCorrelation: {
      aphorisms: "Aphorisms §211 – §212",
      explanation: "Intellectual capacity (Geist) and changes in comprehension or judgment are vital parameters for determining the constitutional state."
    },
    keyConcepts: [
      {
        heading: "Theories of Intelligence",
        details: "Spearman's g factor and s factor; Howard Gardner's 8 Multiple Intelligences (Linguistic, Logical, Spatial, Interpersonal, Intrapersonal, etc.)."
      },
      {
        heading: "Emotional Intelligence (Daniel Goleman)",
        details: "Self-awareness, self-regulation, motivation, empathy, and social skills in health maintenance."
      }
    ],
    clinicalRelevance: "Guides communication strategies during case taking according to the patient's intellectual level.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Write short notes on Emotional Intelligence (EQ) and its clinical significance.",
        marks: 5,
        answerKey: "Define EQ; list 5 components of Goleman's model; explain role in doctor-patient empathy."
      }
    ],
    takeaways: [
      "Assessing intellectual capacity helps in selecting appropriate potencies and understanding prognosis.",
      "Emotional Intelligence is critical for physician empathy and patient compliance."
    ]
  },
  {
    id: "5",
    slug: "emotion",
    title: "5. Emotion, Affect & Mind-Body Dynamics",
    category: "BHMS Psychology",
    definition: "Emotion is a complex psychological state involving three distinct components: a subjective experience, a physiological response, and a behavioral response.",
    overview: "Analyzes theories of emotion (James-Lange, Cannon-Bard, Schachter-Singer), primary vs complex emotions, and emotional dysregulation in physical illness.",
    organonCorrelation: {
      aphorisms: "Aphorisms §225 – §227",
      explanation: "Hahnemann notes in §225 that emotional diseases (grief, jealousy, mortification, anger) often originate from psychic causes and require sympathetic psychological counseling combined with dynamic remedies."
    },
    keyConcepts: [
      {
        heading: "Physiological Correlates of Emotion",
        details: "Autonomic Nervous System activation (sympathetic vs parasympathetic), limbic system, and neuroendocrine stress pathways."
      },
      {
        heading: "Ailments From Emotional Shock",
        details: "Grief (Ignatia, Natrum Mur), Suppressed Anger (Staphysagria), Anticipatory Fear (Gelsemium, Argentum Nit), Fright (Aconite, Opium)."
      }
    ],
    clinicalRelevance: "Forms the direct theoretical bridge between Hahnemannian 'Ailments From...' etiology and modern psychosomatic medicine.",
    examQuestions: [
      {
        type: "LAQ",
        question: "Describe the Theories of Emotion. Explain how suppressed emotions lead to physical disease with homoeopathic illustrations.",
        marks: 10,
        answerKey: "Compare James-Lange vs Cannon-Bard; explain psychoneuroimmunology; cite Ignatia, Staphysagria, Natrum Mur."
      }
    ],
    takeaways: [
      "Suppressed emotions are frequent exciting causes of chronic miasmatic diseases.",
      "Remedy prescription based on emotional etiology yields rapid, gentle cures."
    ]
  },
  {
    id: "6",
    slug: "motivation",
    title: "6. Human Motivation & Drives",
    category: "BHMS Psychology",
    definition: "Motivation is the internal dynamic process that initiates, guides, and maintains goal-directed behaviors.",
    overview: "Covers Biological Motives (hunger, thirst, sleep), Social Motives (achievement, affiliation, power), and Maslow's Hierarchy of Needs.",
    organonCorrelation: {
      aphorisms: "Aphorisms §5, §210",
      explanation: "Unmet psychological drives and long-standing emotional frustrations alter the vital force, creating vulnerability to chronic miasmatic expressions."
    },
    keyConcepts: [
      {
        heading: "Maslow's Hierarchy of Needs",
        details: "Physiological -> Safety -> Love/Belonging -> Esteem -> Self-Actualization."
      },
      {
        heading: "Frustration & Conflict",
        details: "Approach-Approach, Avoidance-Avoidance, and Approach-Avoidance conflicts as sources of psychological stress."
      }
    ],
    clinicalRelevance: "Uncovers hidden psychological conflicts and unfulfilled needs during in-depth case taking.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Describe Maslow's Hierarchy of Needs with a schematic diagram.",
        marks: 5,
        answerKey: "Draw 5-stage pyramid; define each level; relate self-actualization to mental equilibrium."
      }
    ],
    takeaways: [
      "Conflict between opposing desires produces mental stress and physical somatization.",
      "Identifying core motives aids in understanding the patient's constitutional type."
    ]
  },
  {
    id: "7",
    slug: "personality",
    title: "7. Theories of Personality & Miasmatic Types",
    category: "BHMS Psychology & Philosophy",
    definition: "Personality refers to enduring patterns of thinking, feeling, and behaving that characterize an individual's unique lifestyle and adaptation.",
    overview: "Explores Psychoanalytic (Freud), Type/Trait (Allport, Cattell, Big Five), and Humanistic personality theories, correlating them with Homoeopathic Constitutions and Miasmatic Stigmata.",
    organonCorrelation: {
      aphorisms: "Aphorisms §5, §80 – §84",
      explanation: "Hahnemann's evaluation of the fundamental cause (Psora, Sycosis, Syphilis) reflects the patient's underlying physical and psychological constitution."
    },
    keyConcepts: [
      {
        heading: "Freudian Psychoanalytic Structure",
        details: "Id (pleasure principle), Ego (reality principle), Superego (moral conscience); Conscious, Preconscious, and Unconscious mind."
      },
      {
        heading: "Miasmatic Personality Correlations",
        details: "Psora: Hypersensitive, anxious, intellectual, lacking stamina. Sycosis: Secretive, suspicious, fixed ideas, overgrowth. Syphilis: Destructive, suicidal, desperate, structural decay."
      }
    ],
    clinicalRelevance: "Facilitates constitutional remedy selection (e.g., Calcarea Carb, Sulphur, Lycopodium, Lachesis) matching personality structures.",
    examQuestions: [
      {
        type: "LAQ",
        question: "Discuss Freud's Psychoanalytic Theory of Personality. Correlate psychological personality types with Hahnemannian Miasms.",
        marks: 10,
        answerKey: "Detail Id/Ego/Superego; explain unconscious conflicts; map Psora, Sycosis, and Syphilis to psychological defense patterns."
      }
    ],
    takeaways: [
      "Constitutional remedy selection requires matching the patient's core personality traits.",
      "Miasmatic diagnosis provides a deep dynamic understanding of personality structure."
    ]
  },
  {
    id: "8",
    slug: "behaviour",
    title: "8. Human Behaviour & Behavioral Assessment",
    category: "BHMS Psychology",
    definition: "Behavior encompasses all observable actions, reactions, and internal mental processes exhibited by an individual in response to external and internal stimuli.",
    overview: "Examines determinants of behavior (heredity, environment, neurobiology), conscious vs unconscious motives, and behavioral assessment methods.",
    organonCorrelation: {
      aphorisms: "Aphorisms §84 – §90",
      explanation: "In case taking, Hahnemann instructs the physician to observe the patient's posture, gestures, tone, expressions, and behavioral oddities without leading questions."
    },
    keyConcepts: [
      {
        heading: "Observation in Case Taking (§84)",
        details: "The unprejudiced observer listens, observes physical gestures, speech tone, eye contact, and involuntary behavioral traits."
      },
      {
        heading: "Behavioral Disorders",
        details: "ADHD, conduct disorders, obsessive compulsive behaviors, and social withdrawal."
      }
    ],
    clinicalRelevance: "Provides objective symptoms during case taking when the patient is unable or unwilling to express subjective feelings.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Explain the role of behavioral observation in Homoeopathic Case Taking according to Aphorism §84.",
        marks: 5,
        answerKey: "Explain unprejudiced observer role; list non-verbal behavioral cues; emphasize objective symptom recording."
      }
    ],
    takeaways: [
      "Non-verbal behavioral cues often reveal deeper truths than verbal statements.",
      "Objective observations (§84) validate subjective complaints."
    ]
  },
  {
    id: "9",
    slug: "stress",
    title: "9. Psychophysiology of Stress & Psychosomatics",
    category: "BHMS Psychology",
    definition: "Stress is a physiological and psychological response to environmental demands or internal conflicts that exceed an individual's coping capacity.",
    overview: "Covers Hans Selye's General Adaptation Syndrome (GAS: Alarm, Resistance, Exhaustion), HPA axis activation, and psychosomatic disease pathways.",
    organonCorrelation: {
      aphorisms: "Aphorisms §73, §225",
      explanation: "Acute environmental stressors evoke acute miasmatic explosions (§73), while prolonged mental stress triggers latent Psoric disease."
    },
    keyConcepts: [
      {
        heading: "General Adaptation Syndrome (GAS)",
        details: "Stage 1: Alarm Reaction (Fight or Flight); Stage 2: Resistance (Coping); Stage 3: Exhaustion (Organ damage/Disease)."
      },
      {
        heading: "Psychoneuroimmunology (PNI)",
        details: "Chronic mental stress elevates cortisol and cytokines, suppressing immune surveillance and predisposing to autoimmune and malignant diseases."
      }
    ],
    clinicalRelevance: "Explains how emotional stress translates into hypertension, peptic ulcer, eczema, and asthma.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Describe Hans Selye's General Adaptation Syndrome and its stages.",
        marks: 5,
        answerKey: "Define stress; diagram Alarm, Resistance, Exhaustion; correlate with chronic disease onset."
      }
    ],
    takeaways: [
      "Psychosomatic disease is a vivid proof of Hahnemann's dynamic vital force principle.",
      "Reducing stress through lifestyle management supports homoeopathic healing."
    ]
  },
  {
    id: "10",
    slug: "mental-health",
    title: "10. Mental Health & Psychopathology Basics",
    category: "BHMS Psychology & Psychiatry",
    definition: "Mental health is a state of psychological well-being in which an individual realizes their potential, copes with normal life stresses, and functions productively.",
    overview: "Differentiates normality vs abnormality, introduces psychiatric classification (DSM-5/ICD-11), and reviews major mental disorders (Neuroses vs Psychoses).",
    organonCorrelation: {
      aphorisms: "Aphorisms §210 – §230",
      explanation: "Hahnemann classifies mental diseases into 4 categories: 1) Somatic diseases with mental symptoms, 2) Sudden mental diseases (acute), 3) Mental diseases of doubtful origin, 4) Mental diseases arising from emotional causes."
    },
    keyConcepts: [
      {
        heading: "Hahnemann's 4 Classes of Mental Diseases (§215–§227)",
        details: "Class I: Mental symptoms secondary to physical disease; Class II: Acute mania/delirium; Class III: Mental diseases from psychic causes (§225); Class IV: Latent miasmatic mental disease."
      },
      {
        heading: "Neurosis vs Psychosis",
        details: "Neurosis: Insight preserved, reality testing intact (Anxiety, Hysteria). Psychosis: Insight lost, reality testing impaired (Schizophrenia, Bipolar Mania)."
      }
    ],
    clinicalRelevance: "Essential for legal, diagnostic, and therapeutic management of psychiatric patients in BHMS practice.",
    examQuestions: [
      {
        type: "LAQ",
        question: "Classify Mental Diseases according to Hahnemann (Aphorisms §210-230) and outline their management.",
        marks: 10,
        answerKey: "Detail the 4 classes; explain role of moral treatment/psychotherapy; highlight antipsoric remedy administration."
      }
    ],
    takeaways: [
      "Hahnemann anticipated modern psychiatry by over a century in classifying mental diseases.",
      "Moral treatment (§226) and antipsoric medicines are complementary."
    ]
  },
  {
    id: "11",
    slug: "communication",
    title: "11. Physician-Patient Communication & Case Dynamics",
    category: "BHMS Psychology",
    definition: "Communication is the dynamic process of exchanging information, feelings, and meaning through verbal and non-verbal signals between physician and patient.",
    overview: "Focuses on active listening, empathy, building rapport, overcoming communication barriers, and managing transference/counter-transference during case taking.",
    organonCorrelation: {
      aphorisms: "Aphorisms §83 – §98",
      explanation: "Hahnemann's directives on case taking require absolute freedom from bias, attentive listening, and asking non-leading questions to build trust."
    },
    keyConcepts: [
      {
        heading: "Empathetic Listening in Case Taking",
        details: "Creating a non-judgmental atmosphere allows patients to reveal deeply personal mental and emotional symptoms."
      },
      {
        heading: "Avoiding Leading Questions (§88)",
        details: "Do not ask questions that suggest an answer (e.g., 'Is your pain burning?'). Instead ask open-ended questions ('Describe the sensation')."
      }
    ],
    clinicalRelevance: "Improves diagnostic accuracy, case taking depth, and patient compliance.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Discuss the rules of communication and avoiding leading questions during Homoeopathic Case Taking (§84-90).",
        marks: 5,
        answerKey: "Define non-leading questions; list guidelines for listening; describe role of relatives' observations."
      }
    ],
    takeaways: [
      "Mastering open-ended questioning is essential for uncovering peculiar characteristics (§153).",
      "Rapport built on empathy ensures complete symptom disclosure."
    ]
  },
  {
    id: "12",
    slug: "development",
    title: "12. Developmental Psychology Across Lifespan",
    category: "BHMS Psychology",
    definition: "Developmental psychology studies the physical, cognitive, emotional, and social changes that occur across the human lifespan from conception to old age.",
    overview: "Covers Piaget's Cognitive Development Stages, Erikson's Psychosocial Stages, and developmental milestones in Pediatrics and Geriatrics.",
    organonCorrelation: {
      aphorisms: "Aphorisms §5, §94",
      explanation: "Age-specific developmental vulnerabilities (infancy, puberty, menopause, old age) modify the expression of miasmatic dyscrasias."
    },
    keyConcepts: [
      {
        heading: "Piaget's Cognitive Stages",
        details: "Sensorimotor (0-2y) -> Preoperational (2-7y) -> Concrete Operational (7-11y) -> Formal Operational (11y+)."
      },
      {
        heading: "Erikson's Psychosocial Stages",
        details: "8 life crises: Trust vs Mistrust, Autonomy vs Shame, Identity vs Role Confusion, Integrity vs Despair."
      }
    ],
    clinicalRelevance: "Aids in evaluating child development disorders (autism, ADHD, delayed milestones) and age-appropriate prescribing.",
    examQuestions: [
      {
        type: "SAQ",
        question: "Describe Piaget's Stages of Cognitive Development and their pediatric significance.",
        marks: 5,
        answerKey: "List 4 stages with age ranges; describe key cognitive features (object permanence, conservation)."
      }
    ],
    takeaways: [
      "Understanding developmental stages helps distinguish normal childhood behaviors from pathological delays.",
      "Life transition points (puberty, menopause) often trigger miasmatic awakenings."
    ]
  },
  {
    id: "13",
    slug: "defence-mechanisms",
    title: "13. Ego Defence Mechanisms & Coping",
    category: "BHMS Psychology",
    definition: "Ego defence mechanisms are unconscious psychological strategies used by the individual to protect the ego from anxiety arising from unacceptable thoughts or feelings.",
    overview: "Analyzes primary defence mechanisms (Repression, Denial, Projection, Rationalization, Reaction Formation, Displacement, Sublimation, Regression, Compensation).",
    organonCorrelation: {
      aphorisms: "Aphorisms §210, §215",
      explanation: "Defensive psychological posture and rationalization during case taking can mask true mental symptoms; the homoeopath must decode the underlying defense pattern."
    },
    keyConcepts: [
      {
        heading: "Classification of Defence Mechanisms",
        details: "Narcissistic (Denial, Projection), Immature (Regression, Somatization), Neurotic (Repression, Displacement, Rationalization), Mature (Sublimation, Humor, Suppression)."
      },
      {
        heading: "Somatization as a Defence",
        details: "Converting unmanageable emotional conflict into physical symptoms (e.g. hysteria, psychogenic paralysis)."
      }
    ],
    clinicalRelevance: "Enables homoeopaths to decode masked emotions (e.g., severe anger disguised as excessive politeness - Reaction Formation).",
    examQuestions: [
      {
        type: "LAQ",
        question: "Define Ego Defence Mechanisms. Describe 8 common defence mechanisms with clinical examples. How do they affect homoeopathic symptom evaluation?",
        marks: 10,
        answerKey: "Define defence mechanisms; detail Repression, Projection, Rationalization, Sublimation, etc.; explain how masked symptoms affect remedy selection."
      }
    ],
    takeaways: [
      "Defence mechanisms alter the outward expression of mental symptoms.",
      "Recognizing subtle defenses reveals the true constitutional state."
    ]
  }
];
