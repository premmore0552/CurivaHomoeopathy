export interface NchGynaeCompetency {
  code: string;
  topic: string;
  unit: 'Unit 1: Gynaecology' | 'Unit 2: Obstetrics & Newborn Care';
  specificLearningObjective: string;
  domain: 'Cognitive' | 'Psychomotor' | 'Affective';
  level: 'K' | 'KH' | 'SH' | 'P'; // Knows, Knows How, Shows How, Performs
  core: boolean;
  teachingLearningMethods: string[];
  assessmentMethods: string[];
  horizontalIntegration?: string[];
  verticalIntegration?: string[];
  homoeopathicTherapeuticsLink?: string;
}

export interface GynaeUnitChapter {
  id: string;
  number: string;
  title: string;
  unit: 'Unit 1: Gynaecology' | 'Unit 2: Obstetrics & Newborn Care';
  theoryHours: number;
  clinicalHours: number;
  summary: string;
  coreTopics: string[];
  clinicalPearls: string[];
  examQuestions: {
    type: 'LAQ' | 'SAQ' | 'VIVA' | 'MCQ';
    question: string;
    marks?: number;
    keyPoints?: string[];
  }[];
  therapeuticsHighlight?: {
    remedy: string;
    indication: string;
    miasm?: string;
  }[];
}

export interface ExaminationScheme {
  paper: string;
  title: string;
  marks: number;
  duration: string;
  sections: {
    sectionName: string;
    marks: number;
    questionTypes: string;
    topicsCovered: string[];
  }[];
}

export const nchGynaeCourseDetails = {
  subjectName: "Gynaecology and Obstetrics",
  subjectCode: "HomUG-ObGy-I",
  professionalLevel: "Second Professional BHMS (BHMS II)",
  revisionDate: "Revised 18-05-2024 (Official NCH CBDC)",
  governingBody: "National Commission for Homoeopathy (NCH), New Delhi",
  totalTheoryHours: 150,
  totalPracticalHours: 150,
  totalClinicalPostingWeeks: 12,
  totalMarks: 300,
  preamble: `Gynaecology and Obstetrics in the BHMS curriculum represents a pivotal clinical science that bridges reproductive anatomy, maternal-fetal physiology, and specialized clinical diagnostics with the art and science of classical Homoeopathic therapeutics. The curriculum aims to produce a primary care homoeopathic physician who possesses sound scientific knowledge of the female reproductive system across the lifecycle, antenatal care, physiological labor, postpartum care, and neonatology. Crucially, the student is trained to identify obstetric emergencies, high-risk pregnancies, and gynaecological malignancies early, administer essential life-saving first-aid, and execute timely medical referrals while managing non-emergency, physiological, and chronic ailments through holistic Homoeopathic constitutional and clinical prescribing.`
};

export const nchGynaeCourseOutcomes = [
  {
    code: "CO 1",
    title: "Anatomical, Physiological & Pathological Foundations",
    description: "Describe the normal and abnormal structure, physiological regulation, and pathological deviations of the female reproductive system, pregnancy, labor, puerperium, and the neonatal period."
  },
  {
    code: "CO 2",
    title: "Clinical History & Physical Examination",
    description: "Conduct systematic gynaecological and obstetrical history taking, general physical examination, abdominal palpation (Leopold maneuvers), speculum, and bimanual pelvic examination with strict adherence to patient dignity, privacy, and aseptic precautions."
  },
  {
    code: "CO 3",
    title: "Diagnostic Reasoning & Investigations",
    description: "Formulate rational differential diagnoses and interpret relevant diagnostic modalities including pelvic ultrasonography, CTG/fetal monitoring, Pap smears, hormonal assays, and routine antenatal laboratory profiles."
  },
  {
    code: "CO 4",
    title: "Homoeopathic Therapeutics & Holistic Management",
    description: "Apply principles of Homoeopathy, Materia Medica, Organon of Medicine, and Repertory in managing physiological discomforts of pregnancy, normal puerperium, functional menstrual irregularities, benign pelvic disorders, and neonatal care."
  },
  {
    code: "CO 5",
    title: "High-Risk Screening & Emergency Referral Protocols",
    description: "Promptly recognize obstetric emergencies (APH, PPH, Eclampsia, Ruptured Ectopic, Cord Prolapse, Obstructed Labor), serious neonatal asphyxia/distress, and gynaecological malignancies, initiate immediate stabilization, and execute safe, prompt tertiary referrals."
  },
  {
    code: "CO 6",
    title: "Preventive, Maternal & Child Health Counseling",
    description: "Counsel women and families on maternal nutrition, antenatal care schedules, exclusive breastfeeding, family planning/contraception, vaccination, cervical/breast cancer screening, and public health programs (MCH, RMNCH+A)."
  }
];

export const teachingHoursBreakdown = {
  theory: [
    { component: "Unit 1: Gynaecology (Lectures & Interactive Tutorials)", hours: 75 },
    { component: "Unit 2: Obstetrics, Neonatology & Puerperium (Lectures)", hours: 75 },
    { component: "Total Minimum Lecture Hours", hours: 150 }
  ],
  practical: [
    { component: "Clinical Postings in OPD / IPD (Gyne & ANC Clinics)", hours: 90 },
    { component: "Labour Room Postings & Delivery Observation / Assistance", hours: 30 },
    { component: "Skill Lab, DOAP sessions, Dummy & Pelvis Simulations", hours: 15 },
    { component: "Seminars, Case Presentations & Problem-Based Learning (PBL)", hours: 15 },
    { component: "Total Non-Lecture / Clinical / Practical Hours", hours: 150 }
  ],
  grandTotal: 300
};

export const gynaeUnit1Chapters: GynaeUnitChapter[] = [
  {
    id: "gyn-1",
    number: "1.1",
    unit: "Unit 1: Gynaecology",
    title: "Anatomy, Embryology & Congenital Anomalies of Female Genital Tract",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Surgical and applied anatomy of the vulva, vagina, cervix, uterus, fallopian tubes, and ovaries. Pelvic floor supports, perineal body, pelvic cellular tissue, blood supply, lymphatic drainage, and embryological development (Müllerian ducts, urogenital sinus) with clinical anomalies.",
    coreTopics: [
      "Pelvic diaphragm, perineal body, and ligaments of the uterus (cardinal, uterosacral, round ligaments)",
      "Embryology: Development of Müllerian (Paramesonephric) duct system & Wolffian remnants",
      "Congenital uterine malformations: Septate, bicornuate, unicornuate, arcuate, and didelphys uterus",
      "Müllerian Agenesis (Mayer-Rokitansky-Küster-Hauser / MRKH Syndrome) vs Androgen Insensitivity Syndrome (AIS)",
      "Imperforate hymen, transverse vaginal septum, and Haematocolpos / Haematometra clinical management"
    ],
    clinicalPearls: [
      "In primary amenorrhea with normal secondary sexual characteristics and cyclic pelvic pain, always examine the hymen for a bluish bulging membrane indicating imperforate hymen.",
      "Uterine septum is the most common congenital anomaly associated with recurrent first-trimester miscarriages."
    ],
    examQuestions: [
      { type: "SAQ", question: "Describe the supports of the uterus and clinical significance of cardinal ligaments.", marks: 5 },
      { type: "SAQ", question: "Differentiate between MRKH syndrome and Androgen Insensitivity Syndrome (Testicular Feminization).", marks: 5 },
      { type: "VIVA", question: "What are the structures piercing the pelvic diaphragm?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Pulsatilla", indication: "Delayed menarche in mild, yielding girls with sluggish circulation and pelvic heaviness.", miasm: "Psora / Sycosis" },
      { remedy: "Calcarea Phosphorica", indication: "Delayed puberty and poor physical development in tall, anemic, delicate adolescents.", miasm: "Tubercular" }
    ]
  },
  {
    id: "gyn-2",
    number: "1.2",
    unit: "Unit 1: Gynaecology",
    title: "Physiology of Menstruation, HPO Axis & Pubertal Development",
    theoryHours: 8,
    clinicalHours: 4,
    summary: "Endocrine orchestration of the Hypothalamic-Pituitary-Ovarian (HPO) axis, pulsatile GnRH, FSH/LH surges, follicular recruitment, steroidogenesis (estrogens & progesterone), endometrial cyclic phases (proliferative, secretory, menstrual), and physiology of normal puberty.",
    coreTopics: [
      "Hypothalamic-Pituitary-Ovarian-Endometrial axis feedback mechanisms",
      "Folliculogenesis, dominant follicle selection, Graafian follicle rupture, and Corpus Luteum function",
      "Endometrial histology: Proliferative phase (Estrogenic) vs Secretory phase (Progestogenic)",
      "Cervical mucus changes across the cycle (Ferning, Spinnbarkeit, Bill's ovulation method)",
      "Pubertal milestones: Thelarche, Adrenarche/Pubarche, Growth Spurt, Menarche (Tanner Staging)",
      "Precocious Puberty (Central vs Peripheral) and Delayed Puberty etiology"
    ],
    clinicalPearls: [
      "Luteal phase duration is virtually fixed at 14 ± 2 days; cycle variability is dictated almost entirely by the length of the follicular phase.",
      "The pre-ovulatory LH surge occurs 24-36 hours prior to follicular rupture, triggered by sustained high estradiol levels (>200 pg/ml for >48h)."
    ],
    examQuestions: [
      { type: "LAQ", question: "Explain the Hypothalamic-Pituitary-Ovarian axis. Detail the hormonal changes during the menstrual cycle.", marks: 10 },
      { type: "SAQ", question: "Describe Tanner staging for female pubertal development.", marks: 5 },
      { type: "MCQ", question: "Which hormone is directly responsible for ovulation? (A) FSH (B) LH (C) Progesterone (D) Inhibin", keyPoints: ["B - LH surge"] }
    ],
    therapeuticsHighlight: [
      { remedy: "Senecio Aureus", indication: "Functional amenorrhea or vicarious menstruation (epistaxis/cough) before puberty with backache.", miasm: "Psora" },
      { remedy: "Natrum Muriaticum", indication: "Delayed or irregular menses in anemic young girls after grief; dry vaginal mucosa.", miasm: "Psora / Sycosis" }
    ]
  },
  {
    id: "gyn-3",
    number: "1.3",
    unit: "Unit 1: Gynaecology",
    title: "Gynaecological Evaluation, Diagnostic Procedures & Imaging",
    theoryHours: 6,
    clinicalHours: 14,
    summary: "Methodology of gynaecological case history, general and pelvic physical examination (inspection of vulva, Sims speculum, Cusco bivalve speculum, bimanual palpation). Indications, technique, and interpretation of Pap smear, cervical biopsy, endometrial sampling, TVS, HSG, and diagnostic hysterolaparoscopy.",
    coreTopics: [
      "Systematic gynaecological history taking: Menstrual history, obstetric history, contraceptive history, sexual history",
      "Techniques of Pelvic Examination: Asepsis, chaperone, positioning (lithotomy/dorsal), speculum & bimanual examination",
      "Cervical cytology: Conventional Pap smear vs Liquid Based Cytology (LBC), Bethesda reporting system",
      "Endometrial sampling methods: Pipelle biopsy, Dilatation & Curettage (D&C), Fractional curettage",
      "Imaging in Gynaecology: Transvaginal Sonography (TVS), Hysterosalpingography (HSG), Saline Infusion Sonohysterography (SIS), Pelvic MRI",
      "Endoscopic procedures: Diagnostic and operative Hysteroscopy and Laparoscopy indications & complications"
    ],
    clinicalPearls: [
      "Never perform a speculum or digital vaginal examination without informed consent, presence of a female chaperone, and ensuring empty bladder.",
      "Transvaginal ultrasound (TVS) provides superior resolution for early intrauterine gestation, ectopic pregnancy, endometrial thickness, and ovarian follicular tracking."
    ],
    examQuestions: [
      { type: "SAQ", question: "Discuss the technique and Bethesda classification system for cervical Pap smear.", marks: 5 },
      { type: "SAQ", question: "Mention indications and contraindications of Hysterosalpingography (HSG).", marks: 5 },
      { type: "VIVA", question: "What is the normal post-menopausal endometrial thickness on TVS?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Platina", indication: "Extreme hyperesthesia of pelvic organs; cannot bear the least touch or speculum examination.", miasm: "Sycosis / Syphilis" },
      { remedy: "Lilium Tigrinum", indication: "Severe pelvic congestion, bearing down with palpitations; tender ovaries on palpation.", miasm: "Psora / Sycosis" }
    ]
  },
  {
    id: "gyn-4",
    number: "1.4",
    unit: "Unit 1: Gynaecology",
    title: "Menstrual Disorders & Abnormal Uterine Bleeding (AUB)",
    theoryHours: 10,
    clinicalHours: 8,
    summary: "Classification of menstrual irregularities. FIGO PALM-COEIN classification system for Abnormal Uterine Bleeding. Amenorrhoea (Primary & Secondary diagnostic algorithms), Dysmenorrhoea (Primary spasmodic vs Secondary congestive), Premenstrual Syndrome (PMS / PMDD), and Menorrhagia/Metrorrhagia.",
    coreTopics: [
      "FIGO PALM-COEIN Classification: Structural (Polyp, Adenomyosis, Leiomyoma, Malignancy) vs Non-structural (Coagulopathy, Ovulatory dysfunction, Endometrial, Iatrogenic, Not classified)",
      "Primary Amenorrhea: Diagnostic workup based on presence/absence of secondary sexual characteristics and uterus",
      "Secondary Amenorrhea: Workup flowchart (Beta-hCG -> TSH/Prolactin -> Progestin challenge -> Estrogen-Progestin challenge -> FSH/LH)",
      "Dysmenorrhea: Primary (prostaglandin F2a mediated) vs Secondary (Endometriosis, Adenomyosis, PID, Fibroids)",
      "Premenstrual Syndrome (PMS) & Premenstrual Dysphoric Disorder (PMDD): Pathophysiology, diagnostic criteria, lifestyle modifications",
      "Acute AUB management in reproductive and perimenopausal age groups"
    ],
    clinicalPearls: [
      "Any episode of post-menopausal bleeding is considered Endometrial Carcinoma until proven otherwise by endometrial biopsy.",
      "A positive Progestin Withdrawal Bleeding test confirms adequate endogenous estrogen priming and a patent outflow tract (suggesting anovulation)."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Abnormal Uterine Bleeding. Classify AUB according to the FIGO PALM-COEIN system and give its homoeopathic management.", marks: 10 },
      { type: "SAQ", question: "Give the diagnostic flowchart for a patient presenting with secondary amenorrhea.", marks: 5 },
      { type: "SAQ", question: "Differentiate Primary Dysmenorrhea from Secondary Dysmenorrhea.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Magnesia Phosphorica", indication: "Sharp, spasmodic neuralgic dysmenorrhea relieved by warmth, bending double, and hard pressure.", miasm: "Psora" },
      { remedy: "Colocynthis", indication: "Violent cramping pelvic pains causing patient to double up, worse after anger or emotional vexation.", miasm: "Psora" },
      { remedy: "Sabina", indication: "Protracted menorrhagia/metrorrhagia; bright red blood with dark clots, pain shooting from sacrum to pubis.", miasm: "Sycosis" },
      { remedy: "Thlaspi Bursa Pastoris", indication: "Exhausting metrorrhagia with barely recovery before next period begins; dark clotted flow.", miasm: "Sycosis" }
    ]
  },
  {
    id: "gyn-5",
    number: "1.5",
    unit: "Unit 1: Gynaecology",
    title: "Polycystic Ovarian Syndrome (PCOS), Endometriosis & Adenomyosis",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Pathophysiology, diagnostic criteria, clinical presentation, metabolic complications, and integrated management of PCOS (Rotterdam criteria). Endometriosis (pathogenesis, staging, chocolate cysts, deep infiltrating endometriosis) and Adenomyosis (diffuse vs focal).",
    coreTopics: [
      "PCOS: Rotterdam 2003 criteria (Oligo/anovulation, Clinical/biochemical Hyperandrogenism, Polycystic ovaries on ultrasound)",
      "PCOS Metabolic sequelae: Insulin resistance, Metabolic syndrome, Type 2 Diabetes risk, Endometrial hyperplasia/carcinoma risk",
      "Endometriosis: Pathogenesis (Sampson's retrograde menstruation, Coelomic metaplasia, Halban's vascular dissemination, Immune defect)",
      "Endometriosis Clinical triad: Dysmenorrhea, Dyspareunia, Dyschezia, and Subfertility; physical findings (fixed retroverted uterus, nodularity in pouch of Douglas)",
      "Adenomyosis: Endometrial glands in myometrium, globoid enlarged tender uterus, menorrhagia and progressive dysmenorrhea",
      "Ovarian Endometrioma ('Chocolate Cyst') imaging characteristics and complications"
    ],
    clinicalPearls: [
      "In Endometriosis, disease severity and anatomical staging (rASRM) often correlate poorly with the degree of pelvic pain reported by the patient.",
      "In PCOS, lifestyle modification with 5-10% body weight reduction can restore spontaneous ovulatory cycles and improve insulin sensitivity."
    ],
    examQuestions: [
      { type: "LAQ", question: "Describe the etiopathogenesis, clinical features, diagnostic criteria, and homoeopathic management of PCOS.", marks: 10 },
      { type: "SAQ", question: "Explain the pathogenesis and clinical triad of Endometriosis.", marks: 5 },
      { type: "SAQ", question: "Differentiate between Endometriosis and Adenomyosis.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Sepia Officinalis", indication: "PCOS with irregular menses, hirsutism, yellowish chloasma across nose/cheeks, bearing-down sensation, indifference.", miasm: "Psora / Sycosis" },
      { remedy: "Oophorinum / Ovinum", indication: "Ovarian dysregulation, cystic degeneration of ovaries, hot flushes and menstrual irregulars.", miasm: "Sycosis" },
      { remedy: "Apis Mellifica", indication: "Right-sided ovarian cyst/enlargement with stinging, burning pains, worse heat, no thirst.", miasm: "Sycosis" },
      { remedy: "Medorrhinum", indication: "Endometriosis and chronic pelvic congestion with sycotic diathesis, burning feet, better lying on abdomen.", miasm: "Sycosis" }
    ]
  },
  {
    id: "gyn-6",
    number: "1.6",
    unit: "Unit 1: Gynaecology",
    title: "Infections of the Female Genital Tract & Pelvic Inflammatory Disease (PID)",
    theoryHours: 7,
    clinicalHours: 6,
    summary: "Lower genital tract infections (Candidiasis, Trichomoniasis, Bacterial Vaginosis), Cervicitis, and Upper genital tract infections (Pelvic Inflammatory Disease / Salpingo-oophoritis, Tubo-ovarian abscess, Genital Tuberculosis, Toxic Shock Syndrome).",
    coreTopics: [
      "Vulvovaginitis Differential: Candida albicans (curdy white, severe pruritus, pH < 4.5) vs Trichomonas vaginalis (frothy greenish-yellow, strawberry cervix, pH > 4.5) vs Bacterial Vaginosis (Amsel's criteria: clue cells, fishy amine odor with 10% KOH, thin greyish discharge)",
      "Pelvic Inflammatory Disease (PID): Causative organisms (N. gonorrhoeae, C. trachomatis, anaerobes, polymicrobial)",
      "PID Clinical criteria (CDC): Uterine/cervical motion tenderness, adnexal tenderness; systemic signs (fever, elevated ESR/CRP)",
      "Complications of untreated PID: Tubo-ovarian abscess (TOA), chronic pelvic pain, ectopic pregnancy, tubal factor infertility, Fitz-Hugh-Curtis syndrome (perihepatitis)",
      "Female Genital Tuberculosis: Mode of spread, lead-pipe rigid fallopian tubes, Asherman's syndrome, diagnostic workup (GeneXpert, endometrial biopsy)",
      "Toxic Shock Syndrome (TSS): S. aureus TSST-1 toxin, tampon association, multiorgan shock signs"
    ],
    clinicalPearls: [
      "Cervical Motion Tenderness ('Chandelier Sign') on bimanual examination is the hallmark clinical sign of acute Pelvic Inflammatory Disease.",
      "Genital TB is a silent cause of primary infertility in endemic areas; the fallopian tubes are involved in nearly 100% of cases."
    ],
    examQuestions: [
      { type: "SAQ", question: "Tabulate the differential diagnosis of common types of vaginitis (Candida, Trichomonas, Bacterial Vaginosis).", marks: 5 },
      { type: "SAQ", question: "Discuss the diagnostic criteria and long-term sequelae of Pelvic Inflammatory Disease (PID).", marks: 5 },
      { type: "VIVA", question: "What is Amsel's criteria for Bacterial Vaginosis?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Kreosotum", indication: "Acrid, corrosive, offensive yellowish leucorrhea causing excoriation of thighs; pruritus vulvae.", miasm: "Syphilis" },
      { remedy: "Mercurius Solubilis", indication: "Purulent, greenish, excoriating vaginal discharge with nocturnal aggravation and night sweats.", miasm: "Syphilis" },
      { remedy: "Pulsatilla", indication: "Thick, creamy, bland, milky leucorrhea with weeping disposition, worse in warm room.", miasm: "Psora" },
      { remedy: "Hydrastis Canadensis", indication: "Tenacious, ropy, stringy yellow leucorrhea with cervical erosion and faint, sinking sensation at epigastrium.", miasm: "Psora" }
    ]
  },
  {
    id: "gyn-7",
    number: "1.7",
    unit: "Unit 1: Gynaecology",
    title: "Benign & Premalignant Lesions of the Genital Tract (Fibroids, CIN, Ovarian Cysts)",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Uterine Leiomyomas / Fibroids (types: submucous, intramural, subserous, cervical; secondary degenerative changes like hyaline, cystic, red degeneration in pregnancy). Cervical intraepithelial neoplasia (CIN / SIL). Benign ovarian tumors (Follicular, Corpus luteum, Dermoid / Mature cystic teratoma, Serous/Mucinous cystadenoma).",
    coreTopics: [
      "Uterine Leiomyoma (Fibroid): Histogenesis, classification (submucosal, intramural, subserosal, pedunculated, parasitic)",
      "Fibroid Degenerations: Hyaline, cystic, calcification, fatty, sarcomatous (<0.5%), and Red Degeneration (Carneous) during pregnancy",
      "Clinical manifestations of Fibroids: Menorrhagia, pelvic pressure, frequency of micturition, infertility, recurrent abortions",
      "Cervical Intraepithelial Neoplasia (CIN 1, 2, 3) / Bethesda Low-grade vs High-grade SIL; Colposcopy (acetic acid & Lugol's iodine testing)",
      "Benign Ovarian Cysts & Tumors: Functional cysts vs Neoplastic (Serous, Mucinous, Dermoid cyst / Teratoma, Fibroma, Brenner tumor)",
      "Torsion of Ovarian Cyst: Acute surgical abdomen presentation, ultrasound Doppler findings, emergency management"
    ],
    clinicalPearls: [
      "Submucosal fibroids (even if small, <2 cm) are the most symptomatic, causing profound menorrhagia and preventing embryo implantation.",
      "Red degeneration of fibroid typically occurs in the 2nd trimester of pregnancy due to rapid growth outstripping blood supply and aseptic necrosis."
    ],
    examQuestions: [
      { type: "LAQ", question: "Classify Uterine Fibroids. Discuss clinical features, secondary degenerations, and homoeopathic therapeutics.", marks: 10 },
      { type: "SAQ", question: "Describe the clinical features and management of acute torsion of an ovarian cyst.", marks: 5 },
      { type: "SAQ", question: "Explain the role of colposcopy in evaluating abnormal cervical cytology.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Fraxinus Americana", indication: "Uterine fibroids with heavy bearing-down sensation, enlargement of uterus, watery non-irritating leucorrhea.", miasm: "Sycosis" },
      { remedy: "Aurum Muriaticum Natronatum", indication: "Induration of uterus, fibroids, ovarian induration with high blood pressure and depressive mood.", miasm: "Syphilis" },
      { remedy: "Thlaspi Bursa Pastoris", indication: "Fibroid uterus with continuous, exhausting menorrhagia and metrorrhagia.", miasm: "Sycosis" },
      { remedy: "Calcarea Carbonica", indication: "Uterine fibroids in fair, fat, flabby women who sweat profusely on head at night; menses too early, too profuse.", miasm: "Psora" }
    ]
  },
  {
    id: "gyn-8",
    number: "1.8",
    unit: "Unit 1: Gynaecology",
    title: "Gynaecological Malignancies & Screening (Cervix, Endometrium, Ovary, GTD)",
    theoryHours: 8,
    clinicalHours: 4,
    summary: "Etiopathogenesis, risk factors, clinical features, staging (FIGO), screening strategies, and multidisciplinary management of Carcinoma Cervix, Endometrial Carcinoma, Epithelial & Germ Cell Ovarian Cancers, and Gestational Trophoblastic Disease (Hydatidiform mole, Choriocarcinoma).",
    coreTopics: [
      "Carcinoma of Cervix: High-risk HPV (Types 16, 18, 31, 33, 45), risk factors, post-coital bleeding, FIGO staging, HPV vaccination (bivalent, quadrivalent, nonavalent)",
      "Screening for Carcinoma Cervix: Visual Inspection with Acetic Acid (VIA), Pap smear, HPV DNA testing, guidelines and algorithm",
      "Endometrial Carcinoma: Type 1 (Estrogen-dependent, PTEN mutation, obesity) vs Type 2 (Estrogen-independent, p53 mutation, aggressive); postmenopausal bleeding protocol",
      "Ovarian Malignancies: Epithelial ovarian cancer, Germ cell tumors (dysgerminoma, yolk sac), Sex cord stromal tumors (Granulosa cell tumor, Sertoli-Leydig)",
      "Tumor markers in Gynaecology: CA-125, HE4, Beta-hCG, Alpha-fetoprotein (AFP), Inhibin, LDH",
      "Gestational Trophoblastic Neoplasia (GTN): Complete vs Partial Hydatidiform Mole (p57 expression, karyotype 46XX vs 69XXY), Choriocarcinoma presentation and surveillance"
    ],
    clinicalPearls: [
      "Any women over 40 presenting with persistent, irregular post-coital bleeding or foul, blood-stained discharge requires urgent speculum inspection and cervical biopsy.",
      "CA-125 is elevated in epithelial ovarian cancer but can also be elevated in benign conditions like endometriosis, PID, fibroids, and menstruation."
    ],
    examQuestions: [
      { type: "LAQ", question: "Discuss the risk factors, clinical presentation, screening methods, and staging of Carcinoma Cervix.", marks: 10 },
      { type: "SAQ", question: "Differentiate between Complete and Partial Hydatidiform Mole.", marks: 5 },
      { type: "SAQ", question: "Write a short note on the diagnostic evaluation of post-menopausal bleeding.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Conium Maculatum", indication: "Stony hard indurations of glands and cervix; cancer following mechanical trauma; piercing pains.", miasm: "Syphilis" },
      { remedy: "Carbo Animalis", indication: "Malignant ulcerations of cervix with burning pains, indurated tissues, exhaustion and offensive discharges.", miasm: "Syphilis" },
      { remedy: "Arsenicum Album", indication: "Burning pelvic pains relieved by heat, severe prostration, offensive discharges, midnight restlessness.", miasm: "Psora / Syphilis" }
    ]
  },
  {
    id: "gyn-9",
    number: "1.9",
    unit: "Unit 1: Gynaecology",
    title: "Pelvic Organ Prolapse & Genital Displacements",
    theoryHours: 6,
    clinicalHours: 6,
    summary: "Etiopathogenesis, predisposing factors, degrees (1st, 2nd, 3rd degree, Procidentia), clinical presentation, Baden-Walker & POP-Q staging systems, associated defects (Cystocele, Rectocele, Enterocele), conservative management (pessaries, pelvic floor muscle training), and surgical principles (Fothergill, Ward-Mayo, sling surgeries).",
    coreTopics: [
      "Etiology: Multiparity, instrumental delivery, prolonged 2nd stage, menopause (estrogen deficiency), chronic cough/constipation, heavy lifting",
      "Degrees of Uterine Prolapse: 1st degree (within vagina), 2nd degree (at introitus), 3rd degree (outside introitus), Procidentia (complete eversion of vagina)",
      "Anterior compartment defects: Cystocele, Urethrocele, stress urinary incontinence (SUI)",
      "Posterior compartment defects: Rectocele, Enterocele (herniation of pouch of Douglas)",
      "Decubitus ulcer on procidentia: Pathogenesis (venous stasis), prevention, and preoperative preparation",
      "Conservative management: Kegel's pelvic floor exercises, Ring / Gellhorn pessary indications and complications"
    ],
    clinicalPearls: [
      "In procidentia with decubitus ulcer, before any surgical intervention, the prolapse must be reduced and packed with estrogen cream/glycerine acriflavine packs until the ulcer heals.",
      "Stress Urinary Incontinence must be distinguished from Urge Incontinence (Overactive Bladder) through history and urodynamic testing."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Uterine Prolapse. Discuss its etiology, clinical features, degrees, and homoeopathic management.", marks: 10 },
      { type: "SAQ", question: "Write a short note on conservative management of pelvic organ prolapse using pessaries.", marks: 5 },
      { type: "VIVA", question: "What is a decubitus ulcer and how is it managed?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Sepia Officinalis", indication: "Sensation of heaviness and bearing down in pelvis as if everything would escape through vulva; must cross limbs.", miasm: "Psora / Sycosis" },
      { remedy: "Lilium Tigrinum", indication: "Bearing-down sensation in pelvis, must hold pelvis with hands; heart palpitation, hurried manner.", miasm: "Psora / Sycosis" },
      { remedy: "Murex Purpurea", indication: "Violent bearing-down sensation with intense sexual desire and consciousness of uterus.", miasm: "Sycosis" },
      { remedy: "Helonias Dioica", indication: "Sensation of uterine weight and consciousness of womb; anemic, tired women who feel better with mental distraction.", miasm: "Psora" }
    ]
  },
  {
    id: "gyn-10",
    number: "1.10",
    unit: "Unit 1: Gynaecology",
    title: "Infertility & Assisted Reproductive Technologies (ART)",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Definition, epidemiological factors, evaluation of male factor (Semen analysis WHO 2021 criteria) and female factors (ovulatory, tubal, uterine, peritoneal, cervical). Stepwise diagnostic protocols, ovulation induction, and principles of Assisted Reproductive Technology (IUI, IVF-ET, ICSI, PGT).",
    coreTopics: [
      "Definition: Inability to conceive after 12 months of regular unprotected intercourse (6 months if female partner is >=35 years)",
      "Male factor assessment: Semen analysis (WHO 2021 lower reference limits: volume >=1.4 ml, sperm concentration >=16 million/ml, total motility >=42%, normal morphology >=4%)",
      "Female ovulatory assessment: Basal Body Temperature, Mid-luteal serum Progesterone (day 21), TVS Folliculometry, AMH (Antral Follicle Count)",
      "Female tubal patency evaluation: Hysterosalpingography (HSG), Sonosalpingography (SSG), Diagnostic Laparoscopy with chromopertubation (Gold standard)",
      "Unexplained Infertility workup and management protocol",
      "Basics of ART: Intrauterine Insemination (IUI), In Vitro Fertilization (IVF), Intracytoplasmic Sperm Injection (ICSI), Oocyte donation, Surrogacy regulations in India"
    ],
    clinicalPearls: [
      "Always evaluate the male partner with a standard semen analysis early in the infertility workup before undertaking invasive tests for the female partner.",
      "Serum Anti-Müllerian Hormone (AMH) and Antral Follicle Count (AFC) on TVS reflect ovarian reserve and do not fluctuate significantly across the menstrual cycle."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Infertility. Outline the stepwise investigation protocol for an infertile couple and discuss homoeopathic constitutional approaches.", marks: 10 },
      { type: "SAQ", question: "Enumerate WHO criteria for normal semen analysis.", marks: 5 },
      { type: "SAQ", question: "Describe the indications and steps of Intrauterine Insemination (IUI).", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Agnus Castus", indication: "Sexual debility, loss of libido, depression, anovulation, male impotence with cold relaxed genitals.", miasm: "Psora / Sycosis" },
      { remedy: "Natrum Carbonicum", indication: "Sterility due to acidic, corrosive vaginal secretions destroying spermatozoa; emaciation.", miasm: "Psora" },
      { remedy: "Borax Veneta", indication: "Sterility with acrid, hot leucorrhea, dread of downward motion, aphthae in mouth.", miasm: "Psora" },
      { remedy: "Aurum Metallicum", indication: "Uterine induration, tubal block, depression with suicidal thoughts, syco-syphilitic dyscrasia.", miasm: "Syphilis" }
    ]
  },
  {
    id: "gyn-11",
    number: "1.11",
    unit: "Unit 1: Gynaecology",
    title: "Menopause, Climacteric & Postmenopausal Health",
    theoryHours: 5,
    clinicalHours: 4,
    summary: "Definition of Menopause (retrospective diagnosis after 12 months amenorrhea), Climacteric phases, endocrine changes (elevated FSH, decreased estradiol), acute vasomotor symptoms (hot flushes, night sweats), psychological changes, Genitourinary Syndrome of Menopause (GSM / Atrophic vaginitis), osteoporosis, and cardiovascular risks.",
    coreTopics: [
      "Definitions: Perimenopause, Menopause, Premature Ovarian Insufficiency (POI / Menopause <40 years), Postmenopause",
      "Endocrine shifts: Ovarian follicular exhaustion, cessation of inhibin B, marked rise in FSH (>30-40 IU/L) and LH, fall in estradiol",
      "Vasomotor symptoms: Pathophysiology of hot flushes and night sweats (narrowed hypothalamic thermoregulatory zone)",
      "Genitourinary Syndrome of Menopause (GSM): Vaginal dryness, dyspareunia, recurrent UTIs, loss of vaginal rugae, elevated vaginal pH",
      "Postmenopausal Osteoporosis: Pathophysiology of bone resorption, DEXA scan T-score interpretation, calcium & vitamin D prophylaxis",
      "Hormone Replacement Therapy (HRT): Indications, contraindications (breast/endometrial Ca, thromboembolism, liver disease), risks (WHI trial findings)"
    ],
    clinicalPearls: [
      "In a perimenopausal woman, elevated FSH levels can fluctuate; therefore, diagnosis of menopause is primarily clinical based on 12 consecutive months of amenorrhea.",
      "Premature Ovarian Insufficiency (POI) requires continuous estrogen-progestin therapy until the average age of natural menopause (approx. 50 years) to protect bone and cardiovascular health."
    ],
    examQuestions: [
      { type: "SAQ", question: "Describe the clinical features and non-hormonal management of menopausal syndrome.", marks: 5 },
      { type: "SAQ", question: "Explain Genitourinary Syndrome of Menopause (GSM) and its clinical assessment.", marks: 5 },
      { type: "VIVA", question: "What is the criteria for defining Premature Ovarian Insufficiency (POI)?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Lachesis Muta", indication: "Violent hot flushes, vertex headaches, palpitations, cannot bear tight clothing around neck/waist, loquacity, jealousy.", miasm: "Syphilis" },
      { remedy: "Sepia", indication: "Hot flushes followed by chills and perspiration, extreme irritability, bearing-down sensation, vaginal dryness.", miasm: "Psora / Sycosis" },
      { remedy: "Sulphur", indication: "Hot flushes with burning soles of feet (must stick them out of bed), burning at vertex of head, sinking at 11 AM.", miasm: "Psora" },
      { remedy: "Graphites", indication: "Menopause in obese, chilly, constipated women with delayed menses and dry, cracked skin eruptions.", miasm: "Psora" }
    ]
  },
  {
    id: "gyn-12",
    number: "1.12",
    unit: "Unit 1: Gynaecology",
    title: "Contraception & Medical Termination of Pregnancy (MTP Act 2021)",
    theoryHours: 6,
    clinicalHours: 4,
    summary: "Temporary and permanent family planning methods: Natural/barrier, Combined Oral Contraceptive Pills (COCPs), Progestin-only Pills (POPs), Intrauterine Devices (Cu-T 380A, LNG-IUS / Mirena), Injectables (DMPA), Emergency Contraception. Permanent methods: Laparoscopic tubectomy, Minilap, No-Scalpel Vasectomy (NSV). Medical Termination of Pregnancy (MTP Act 2021 amendments, indications, legal limits).",
    coreTopics: [
      "Classification of Contraception: Spacing (temporary) vs Terminal (permanent) methods",
      "Intrauterine Devices (IUD): Copper T 380A mechanism, duration (10 years), insertion timing, side effects (pain, bleeding), LNG-IUS (Mirena) benefits in AUB/adenomyosis",
      "Combined Oral Contraceptive Pills (COCP): Mechanism (inhibition of ovulation by suppressing FSH/LH), non-contraceptive health benefits, absolute contraindications (deep vein thrombosis, breast cancer, severe hypertension, heavy smoking >35 yrs)",
      "Emergency Contraception: Levonorgestrel 1.5 mg within 72 hours, Ulipristal acetate within 120 hours, Copper-T insertion within 5 days",
      "Medical Termination of Pregnancy (MTP Act 2021): Gestational limits (up to 20 weeks on 1 RMP opinion, up to 24 weeks for special categories on 2 RMP opinions, no limit for substantial fetal abnormalities approved by Medical Board)",
      "Medical abortion regimen: Mifepristone 200 mg orally followed 24-48 hours later by Misoprostol 800 mcg buccally/vaginally up to 9 weeks (63 days)"
    ],
    clinicalPearls: [
      "The Pearl Index measures contraceptive failure rate per 100 woman-years of use; implants, IUDs, and sterilization have the lowest failure rates (<1%).",
      "Mifepristone is a synthetic antiprogestogen that sensitizes the myometrium to prostaglandins, causing decidual necrosis and cervical softening."
    ],
    examQuestions: [
      { type: "SAQ", question: "Classify Intrauterine Contraceptive Devices (IUCDs). Describe mechanism of action and complications of Cu-T 380A.", marks: 5 },
      { type: "SAQ", question: "Explain the salient features and recent amendments of the MTP Act 2021 in India.", marks: 5 },
      { type: "MCQ", question: "What is the primary mechanism of action of Combined Oral Contraceptives? (A) Tubal motility increase (B) Inhibition of ovulation (C) Cervical mucus liquefaction (D) Endometrial hyperproliferation", keyPoints: ["B - Inhibition of ovulation via HPO suppression"] }
    ],
    therapeuticsHighlight: [
      { remedy: "China Officinalis", indication: "Debility, exhaustion, and dizziness following acute blood loss after abortion or menorrhagia.", miasm: "Psora" },
      { remedy: "Arnica Montana", indication: "Sore, bruised, traumatized feeling of pelvic organs following mechanical instrumentation or MTP.", miasm: "Psora" }
    ]
  }
];

export const gynaeUnit2Chapters: GynaeUnitChapter[] = [
  {
    id: "obs-1",
    number: "2.1",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Maternal Physiological Adaptations to Pregnancy",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Systemic maternal anatomical, physiological, and biochemical adaptations during gestation: Cardiovascular (increased cardiac output, physiological hemodilution), Haematological (physiological anemia), Respiratory (hyperventilation, compensated respiratory alkalosis), Renal (increased GFR, glycosuria), Gastrointestinal, Endocrine (placental hormones, thyroid, insulin resistance), and Reproductive tract adaptations (Goodell's, Hegar's, Chadwick's/Jacquemier's signs).",
    coreTopics: [
      "Cardiovascular System: Plasma volume expansion (+40-50%), RBC mass increase (+20-30%), physiological hemodilution, cardiac output peak in late 2nd trimester, Supine Hypotensive Syndrome (inferior vena cava compression)",
      "Haematological System: Physiological anemia criteria (Hb < 11 g/dL in 1st/3rd trimester, < 10.5 g/dL in 2nd trimester), hypercoagulable state (increased fibrinogen, factors VII, VIII, X)",
      "Renal System: Renal blood flow and GFR increase by 50%, decreased serum creatinine/BUN, physiological hydronephrosis (right > left due to dextrorotated uterus)",
      "Endocrine & Placental Hormones: Human Chorionic Gonadotropin (hCG - peaks at 8-10 weeks), Human Placental Lactogen (hPL - insulin antagonist), Estrogens, Progesterone, Relaxin",
      "Local Pelvic changes: Goodell sign (cervical softening), Hegar sign (lower uterine segment softening), Chadwick/Jacquemier sign (bluish discoloration of vagina/cervix), Osiander sign (increased lateral pulsation)"
    ],
    clinicalPearls: [
      "Supine Hypotensive Syndrome occurs when the gravid uterus compresses the inferior vena cava in the supine position; it is immediately relieved by turning the patient to the left lateral decubitus position.",
      "Placental alpha and beta-hCG subunits: Beta subunit is unique to hCG, while the alpha subunit is identical to LH, FSH, and TSH."
    ],
    examQuestions: [
      { type: "LAQ", question: "Describe the cardiovascular and haematological changes during normal pregnancy. Explain physiological anemia.", marks: 10 },
      { type: "SAQ", question: "Enumerate the signs of pregnancy in the first trimester (Hegar's, Goodell's, Chadwick's signs).", marks: 5 },
      { type: "VIVA", question: "Why is the right kidney more dilated than the left in pregnancy?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Ferrum Metallicum", indication: "Physiological anemia with pseudo-plethora, face flushing easily on least excitement or exertion; pale mucous membranes.", miasm: "Psora / Tubercular" },
      { remedy: "Aletris Farinosa", indication: "Extreme fatigue, muscular weakness, digestive sluggishness, and tendency to abortion from uterine atony.", miasm: "Psora" }
    ]
  },
  {
    id: "obs-2",
    number: "2.2",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Diagnosis of Pregnancy, Antenatal Care & Assessment of Fetal Wellbeing",
    theoryHours: 8,
    clinicalHours: 12,
    summary: "Trimester-wise diagnosis of pregnancy (clinical, immunological, sonographic). Antenatal Care (ANC) goals, WHO antenatal care model (minimum 8 contacts), routine antenatal investigations, maternal nutrition, screening for high-risk pregnancies, abdominal examination (fundal height calculation, Leopold grips), and fetal surveillance (Kick chart, Non-Stress Test / NST, Biophysical Profile / BPP, Doppler ultrasonography).",
    coreTopics: [
      "Diagnosis by Trimester: 1st (amenorrhea, morning sickness, urinary frequency, breast tenderness, positive beta-hCG, gestational sac on TVS at 4.5-5 wks), 2nd (quickening at 18-20 wks, fundal height, fetal heart sound by Doppler/Pinard, anomaly scan at 18-20 wks), 3rd (Braxton Hicks contractions, lightening)",
      "Calculating Expected Date of Delivery (EDD): Naegele's rule (LMP + 9 months + 7 days or LMP + 1 year - 3 months + 7 days)",
      "Antenatal Examination: Fundal height (McDonald's rule), Leopold's 4 Obstetric Maneuvers (Fundal grip, Lateral/Umbilical grip, Pawlik's grip / 1st pelvic, 2nd pelvic grip)",
      "Routine Antenatal Investigations: Complete blood count, blood grouping & Rh typing, urine routine/microscopy, VDRL/RPR, HBsAg, HIV, HCV, Thyroid profile, Blood sugar (DIPSI test)",
      "Immunization & Supplementation: Td/Tetanus Toxoid schedule, Iron & Folic Acid (IFA) 60 mg elemental iron + 500 mcg folic acid daily, Calcium 1g daily, Albendazole in 2nd trimester",
      "Assessment of Fetal Wellbeing: Daily Fetal Movement Count (DFMC / Cardiff count-to-ten), Non-Stress Test (reactive vs non-reactive NST criteria), Modified Biophysical Profile (NST + AFI), Manning's Biophysical Profile (Score /10: FBM, FM, Tone, AFI, NST), Umbilical artery Doppler"
    ],
    clinicalPearls: [
      "At 12 weeks the uterus becomes pelvic-abdominal; at 20 weeks it is at the lower border of the umbilicus; at 24 weeks it reaches the umbilicus; at 36 weeks it reaches the xiphisternum.",
      "A reactive Non-Stress Test (NST) requires at least 2 fetal heart rate accelerations of >=15 bpm lasting >=15 seconds within a 20-minute recording window."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Antenatal Care. Describe the schedule of antenatal visits, routine investigations, and Leopold's maneuvers.", marks: 10 },
      { type: "SAQ", question: "Explain the Non-Stress Test (NST) and Biophysical Profile (BPP) for fetal surveillance.", marks: 5 },
      { type: "SAQ", question: "Calculate EDD for a woman with LMP on 15th August 2024. Describe Naegele's rule.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Ipecacuanha", indication: "Persistent nausea and vomiting during early pregnancy; clean tongue, continuous salivation, nausea not relieved by vomiting.", miasm: "Psora" },
      { remedy: "Symphoricarpus Racemosus", indication: "Stubborn morning sickness of pregnancy with gastric distress, aversion to all food, nausea on movement.", miasm: "Psora" },
      { remedy: "Colchicum Autumnale", indication: "Intense nausea and disgust even at the thought or smell of food, especially fish, meat, or eggs.", miasm: "Psora / Sycosis" },
      { remedy: "Nux Vomica", indication: "Morning sickness in irritable, impatient women; constant nausea with fruitless retching in the morning.", miasm: "Psora" }
    ]
  },
  {
    id: "obs-3",
    number: "2.3",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Normal Labor, Delivery Mechanisms & Intrapartum Monitoring (Partograph)",
    theoryHours: 10,
    clinicalHours: 16,
    summary: "Definition of labor, triggers of labor onset, stages of labor (1st, 2nd, 3rd, 4th stages). Clinical physiology of cervical dilatation and effacement. Detailed step-by-step mechanism of labor in vertex occipito-anterior position (Engagement, Descent, Flexion, Internal rotation, Crowning, Extension, Restitution, External rotation, Expulsion). Intrapartum monitoring, modified WHO Partograph, Active Management of the Third Stage of Labor (AMTSL), and Episiotomy.",
    coreTopics: [
      "Stages of Labor: 1st stage (Onset of true labor to full cervical dilatation 10 cm; Latent and Active phases), 2nd stage (Full dilatation to expulsion of fetus; Propulsive and Expulsive phases), 3rd stage (Expulsion of fetus to delivery of placenta and membranes), 4th stage (First hour of postpartum observation)",
      "Mechanism of Labor for Vertex (LOA/ROA): 1. Engagement (biparietal diameter passes pelvic inlet), 2. Descent, 3. Flexion, 4. Internal rotation of head (1/8th of circle to bring occiput under pubic symphysis), 5. Crowning, 6. Extension (delivery of head over perineum), 7. Restitution, 8. External rotation of head / internal rotation of shoulders, 9. Lateral flexion / expulsion of trunk",
      "Intrapartum Assessment: Vaginal examination landmarks (cervical dilatation, effacement, station in relation to ischial spines, membrane status, presenting part, position)",
      "Modified WHO Partograph: Maternal wellbeing, fetal heart rate, cervical dilatation curve (Alert Line and Action Line 4 hours apart), descent of head, uterine contractions, drugs/oxytocin administered",
      "Active Management of the Third Stage of Labor (AMTSL): 1. Administration of uterotonic (Oxytocin 10 IU IM within 1 minute of birth), 2. Controlled Cord Traction (Brandt-Andrews technique) with countertraction, 3. Uterine massage every 15 minutes for 2 hours",
      "Episiotomy: Indications, timing (when perineum is stretched and head crowns), types (Mediolateral vs Median), anatomical structures divided, layered repair technique"
    ],
    clinicalPearls: [
      "In the WHO Partograph, crossing the Alert Line indicates prolonged labor requiring transfer/senior review; crossing the Action Line mandates urgent intervention to expedite delivery.",
      "The cardinal signs of placental separation are: 1. Uterine fundus becomes firm and globoid, rising above the umbilicus, 2. Lengthening of the umbilical cord at the vulva, 3. Sudden gush of blood."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Normal Labor. Describe the step-by-step mechanism of labor in Left Occipito-Anterior (LOA) presentation with neat diagrams.", marks: 10 },
      { type: "LAQ", question: "Explain the Active Management of the Third Stage of Labor (AMTSL). Why is it critical in preventing PPH?", marks: 10 },
      { type: "SAQ", question: "Draw and explain the components of a modified WHO Partograph. Differentiate Alert and Action lines.", marks: 5 },
      { type: "SAQ", question: "Describe the indications, types, and technique of Episiotomy.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Caulophyllum Thalictroides", indication: "False, erratic, spasmodic labor pains; rigid os uteri with lack of progress; exhaustion and needle-like pains flying to distant parts.", miasm: "Psora / Sycosis" },
      { remedy: "Actaea Racemosa (Cimicifuga)", indication: "Intense, violent, unendurable labor pains darting across lower abdomen from hip to hip; nervous shuddering, despair.", miasm: "Psora / Syphilis" },
      { remedy: "Gelsemium Sempervirens", indication: "Rigid, unyielding os uteri; labor pains cease from emotional excitement or fright; complete motor paralysis and weakness.", miasm: "Psora" },
      { remedy: "Belladonna", indication: "Rapidly dilating, spastically rigid, hot dry os with throbbing carotid arteries, flushed face, intolerance to light/jarring.", miasm: "Psora" }
    ]
  },
  {
    id: "obs-4",
    number: "2.4",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Normal Puerperium, Lactation & Postpartum Care",
    theoryHours: 6,
    clinicalHours: 8,
    summary: "Anatomical and physiological changes during puerperium (uterine involution, lochia characteristics: rubra, serosa, alba). Physiology of lactation (Mammogenesis, Lactogenesis, Galactokinesis, Galactopoiesis). Technique and benefits of early exclusive breastfeeding, management of common puerperal and breast complications (engorgement, cracked nipples, mastitis, breast abscess, puerperal pyrexia).",
    coreTopics: [
      "Puerperium definition: 6-week period following childbirth during which maternal pelvic organs revert toward their pre-pregnant state",
      "Involution of the Uterus: Fundus descends at approx. 1-1.25 cm per day, becoming non-palpable abdominally by day 10-12",
      "Lochia: Lochia rubra (days 1-4, red, blood/decidua), Lochia serosa (days 5-9, pinkish-brown, leukocytes/mucus), Lochia alba (days 10-15, yellowish-white, decidual cells/cholesterol/bacteria); clinical significance of foul odor or prolonged rubra",
      "Physiology of Lactation: Prolactin (milk production / Lactogenesis) and Oxytocin (milk ejection / Let-down reflex / Galactokinesis); Prolactin-inhibiting hormone (Dopamine)",
      "Breastfeeding: Ten Steps to Successful Breastfeeding (Baby-Friendly Hospital Initiative), attachment signs (chin touching breast, mouth wide open, lower lip everted, more areola visible above than below)",
      "Postpartum Complications: Puerperal pyrexia (temp >=38.0°C / 100.4°F on any 2 of the first 10 days excluding day 1), Puerperal sepsis (etiology, prophylaxis), Breast engorgement vs Mastitis vs Breast abscess"
    ],
    clinicalPearls: [
      "In puerperal pyrexia, always systematically examine the '5 Ws': Wind (Atelectasis/Pneumonia), Water (UTI), Wound (Episiotomy/Cesarean site infection), Womb (Endometritis/Puerperal Sepsis), and Walk (Deep Vein Thrombosis).",
      "Mastitis can be safely continued with breastfeeding from both breasts unless a fluctuant breast abscess has formed requiring surgical incision and drainage."
    ],
    examQuestions: [
      { type: "SAQ", question: "Describe the characteristics, phases, and clinical significance of Lochia during the puerperium.", marks: 5 },
      { type: "SAQ", question: "Explain the hormonal control of lactation and steps to manage acute breast engorgement.", marks: 5 },
      { type: "SAQ", question: "Define Puerperal Sepsis. Enumerate its predisposing causes and preventive measures.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Phytolacca Decandra", indication: "Mastitis with stony hard, hot, swollen breasts; pain radiates all over body when nursing; cracked nipples.", miasm: "Syphilis" },
      { remedy: "Bryonia Alba", indication: "Stony hard, hot, painful breasts at initiation of lactation; stitching pain worse from least movement, relieved by firm support.", miasm: "Psora" },
      { remedy: "Agnus Castus", indication: "Suppression or total deficiency of milk (agalactia) accompanied by extreme depression, apathy, and grief.", miasm: "Psora" },
      { remedy: "Pyrogenium", indication: "Puerperal sepsis with high fever, rapid pulse disproportionate to temperature, offensive lochia, aching all over.", miasm: "Tubercular / Syphilis" }
    ]
  },
  {
    id: "obs-5",
    number: "2.5",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Normal Newborn Care, Neonatology & Resuscitation (NRP)",
    theoryHours: 8,
    clinicalHours: 8,
    summary: "Immediate assessment and care of the normal newborn at birth. APGAR scoring (1 and 5 minutes), vital signs, thermal control (Kangaroo Mother Care / KMC), umbilical cord care, eye prophylaxis, screening for congenital anomalies, physiological vs pathological neonatal jaundice, primitive neonatal reflexes (Moro, sucking, grasp, rooting, Babinski), and Neonatal Resuscitation Program (NRP) basic T-A-B-C algorithm.",
    coreTopics: [
      "Immediate Care at Birth: Drying, warming under radiant warmer, clearing airway if needed, early skin-to-skin contact, delayed cord clamping (1-3 minutes)",
      "APGAR Scoring System: 5 parameters evaluated at 1 and 5 minutes: Activity (Muscle tone), Pulse (Heart rate), Grimace (Reflex irritability), Appearance (Skin color), Respiration (Total score 0-10)",
      "Neonatal Physical Examination: Head circumference (33-35 cm), anterior and posterior fontanelles, Caput Succedaneum vs Cephalhematoma, gestational maturity assessment (New Ballard Score)",
      "Neonatal Jaundice: Physiological jaundice (appears after 24 hrs, peaks at 3-5 days, serum bilirubin <15 mg/dL, resolves by 10-14 days) vs Pathological jaundice (appears within 24 hrs, rapid rise >5 mg/dL/day, direct bilirubin >2 mg/dL, Rh/ABO incompatibility, phototherapy indications)",
      "Neonatal Reflexes: Moro reflex, Palmar and Plantar grasp, Sucking and Rooting reflexes, Asymmetric Tonic Neck Reflex (ATNR), Babinski sign",
      "Neonatal Resuscitation Program (NRP): Initial steps (Warm, dry, position, clear airway, stimulate) -> If HR <100 bpm or gasping/apneic: Positive Pressure Ventilation (PPV) with 21% oxygen -> If HR <60 bpm despite effective PPV: Chest compressions (3:1 ratio) and Epinephrine"
    ],
    clinicalPearls: [
      "Cephalhematoma is a subperiosteal bleed that never crosses suture lines and takes weeks to resolve; Caput Succedaneum is subcutaneous edema that crosses suture lines and resolves within 48-72 hours.",
      "Any jaundice appearing within the first 24 hours of life is strictly PATHOLOGICAL until proven otherwise, mandating immediate serum bilirubin and blood group testing."
    ],
    examQuestions: [
      { type: "SAQ", question: "Tabulate the components of the APGAR score. What is the clinical significance of a 5-minute APGAR score?", marks: 5 },
      { type: "SAQ", question: "Differentiate between Physiological Jaundice and Pathological Jaundice in a newborn.", marks: 5 },
      { type: "SAQ", question: "Differentiate Caput Succedaneum from Cephalhematoma.", marks: 5 },
      { type: "VIVA", question: "What are the initial steps of neonatal resuscitation according to NRP guidelines?" }
    ],
    therapeuticsHighlight: [
      { remedy: "Aconitum Napellus", indication: "Neonatal asphyxia or retention of urine in newborn after a sudden, frightful or prolonged labor.", miasm: "Psora" },
      { remedy: "Antimonium Tartaricum", indication: "Neonatal asphyxia with pale, cyanotic skin, rattling mucus in trachea that infant cannot expectorate.", miasm: "Tubercular" },
      { remedy: "Chamomilla", indication: "Extremely irritable, fretful infant; wants to be carried constantly; green watery diarrhea like chopped spinach during dentition.", miasm: "Psora" },
      { remedy: "Borax Veneta", indication: "Oral thrush in infants; white fungal patches on tongue/cheeks; infant cries and starts when being put down in bed.", miasm: "Psora" }
    ]
  },
  {
    id: "obs-6",
    number: "2.6",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Complications of Early Pregnancy (Hyperemesis, Abortions, Ectopic, Moles)",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Etiopathogenesis, clinical types, diagnosis, and management of early pregnancy complications: Hyperemesis Gravidarum (electrolyte derangements, Wernicke's encephalopathy). Abortions (Threatened, Inevitable, Incomplete, Complete, Missed, Septic, Recurrent Pregnancy Loss / RPL). Ectopic Pregnancy (Tubal ectopic sites, unruptured vs ruptured presentation, emergency laparotomy). Gestational Trophoblastic Disease (Hydatidiform mole).",
    coreTopics: [
      "Hyperemesis Gravidarum: Severe intractable vomiting with weight loss >5%, dehydration, ketonuria, hypokalemia, metabolic alkalosis, Wernicke encephalopathy (Thiamine deficiency)",
      "Abortions / Miscarriage: Definition (loss of fetus before viability, <20-24 weeks or <500 g). Clinical differentiation of Threatened (closed os, viable fetus), Inevitable (open os, inevitable loss), Incomplete (retained products of conception), Complete, Missed (fetal demise without expulsion), and Septic abortion",
      "Recurrent Pregnancy Loss (RPL): Definition (>=2 consecutive clinical miscarriages), etiologies (chromosomal, uterine anomalies, antiphospholipid antibody syndrome / APLS, endocrinopathies, thrombophilias)",
      "Ectopic Pregnancy: Sites (Ampulla 70%, Isthmus 12%, Fimbria 11%, Interstitial 2-3%, Ovarian, Abdominal, Cervical). Classic triad (amenorrhea, abdominal pain, irregular vaginal bleeding). Ruptured ectopic: Acute peritonitis, hemoperitoneum, Cullen sign, hemorrhagic shock",
      "Diagnostic criteria for Ectopic: Transvaginal Ultrasound discriminatory zone (Serum beta-hCG >=1500-2000 IU/L without intrauterine gestational sac), 'Blob' or 'Bagel' adnexal sign",
      "Hydatidiform Mole: 'Snowstorm' appearance on ultrasound, beta-hCG markedly elevated (>100,000 IU/L), theca lutein cysts, high risk of choriocarcinoma transformation"
    ],
    clinicalPearls: [
      "In any woman of reproductive age presenting with acute lower abdominal pain and fainting, always perform a urine pregnancy test to rule out ruptured ectopic pregnancy regardless of menstrual history.",
      "In threatened abortion, internal cervical os remains CLOSED and fetal cardiac activity is preserved on ultrasound; strict bed rest and avoiding digital exams are indicated."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Ectopic Pregnancy. Discuss its sites, clinical features of ruptured ectopic pregnancy, diagnostic modalities, and emergency management.", marks: 10 },
      { type: "SAQ", question: "Tabulate the clinical features differentiating Threatened, Inevitable, and Incomplete abortion.", marks: 5 },
      { type: "SAQ", question: "Describe the clinical features, biochemical abnormalities, and complications of Hyperemesis Gravidarum.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Sabina", indication: "Threatened abortion at 3rd month; pain flying from sacrum to pubis; bright red blood mixed with dark clots; worse least motion.", miasm: "Sycosis" },
      { remedy: "Secale Cornutum", indication: "Threatened abortion at 3rd-4th month in thin, scrawny, cachectic women; dark, thin, foul hemorrhages; body cold but uncovers.", miasm: "Syphilis" },
      { remedy: "Viburnum Opulus", indication: "Spasmodic bearing-down pains in pelvis radiating down thighs; habitual abortion in early weeks.", miasm: "Psora" },
      { remedy: "Arnica Montana", indication: "Threatened abortion following a fall, mechanical injury, physical over-exertion or trauma to abdomen.", miasm: "Psora" }
    ]
  },
  {
    id: "obs-7",
    number: "2.7",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Complications of Late Pregnancy & High-Risk Pregnancy (Hypertension, APH, IUGR, Rh Isoimmunization)",
    theoryHours: 10,
    clinicalHours: 8,
    summary: "Hypertensive disorders of pregnancy (Gestational HTN, Preeclampsia, Severe Preeclampsia, HELLP syndrome, Eclampsia & Magnesium Sulphate regimens). Antepartum Hemorrhage (Placenta Previa vs Abruptio Placentae). Intrauterine Growth Restriction (IUGR / FGR: Symmetrical vs Asymmetrical). Multiple Gestation, Rh Incompatibility & Isoimmunization (Indirect Coombs test, Anti-D prophylaxis).",
    coreTopics: [
      "Hypertensive Disorders in Pregnancy: Gestational Hypertension (BP >=140/90 after 20 wks without proteinuria), Preeclampsia (BP >=140/90 with proteinuria >=300 mg/24h or organ dysfunction), Severe Preeclampsia criteria (BP >=160/110, thrombocytopenia <100,000, elevated transaminases, serum Cr >1.1, pulmonary edema, cerebral/visual disturbances)",
      "Eclampsia Management: Tonic-clonic convulsions in preeclampsia; Magnesium Sulphate Pritchard Regimen (Loading dose: 4g IV 20% + 10g IM 50%; Maintenance dose: 5g IM every 4h). Monitoring signs of Mg toxicity (Patellar reflex, Respiration >=16/min, Urine output >=30 ml/h; Antidote: 10% Calcium Gluconate 10 ml IV)",
      "Antepartum Hemorrhage (APH): Bleeding from genital tract after 28 weeks before birth of baby. Placenta Previa (Painless, causeless, recurrent bright red bleeding, uterus soft non-tender, presenting part high) vs Abruptio Placentae / Accidental Hemorrhage (Painful, dark bleeding, uterus tense, woody, tender, fetal distress / Couvelaire uterus)",
      "Fetal Growth Restriction (FGR): Symmetrical (early onset, intrinsic fetal cause like aneuploidy/TORCH) vs Asymmetrical (late onset, uteroplacental insufficiency, brain-sparing effect on Doppler)",
      "Rh Isoimmunization: Pathogenesis of fetomaternal hemorrhage, Indirect Coombs Test (ICT), MCA Doppler peak systolic velocity for fetal anemia, Anti-D Immunoglobulin administration (300 mcg at 28 wks and within 72 hrs of delivery of Rh+ infant)",
      "Amniotic Fluid Disorders: Polyhydramnios (AFI >24 cm / single deepest pocket >8 cm; maternal diabetes, GI atresia, anencephaly) vs Oligohydramnios (AFI <5 cm / deepest pocket <2 cm; renal agenesis / Potter sequence, PROM, placental insufficiency)"
    ],
    clinicalPearls: [
      "In any patient presenting with third-trimester vaginal bleeding (suspected Antepartum Hemorrhage), DIGITAL VAGINAL EXAMINATION IS STRICTLY FORBIDDEN until Placenta Previa has been ruled out by ultrasound (risk of torrential fatal hemorrhage).",
      "During Magnesium Sulphate infusion for Eclampsia, always verify that the deep tendon (knee jerk) reflex is present before administering each maintenance dose."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Preeclampsia. Discuss clinical features of Severe Preeclampsia and detail the management of Eclampsia with Magnesium Sulphate.", marks: 10 },
      { type: "LAQ", question: "Define Antepartum Hemorrhage. Tabulate the clinical differences between Placenta Previa and Abruptio Placentae.", marks: 10 },
      { type: "SAQ", question: "Explain the pathogenesis, investigation, and prophylaxis of Rh Isoimmunization.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Lachesis Muta", indication: "Toxemia of pregnancy, high blood pressure with purplish face, throbbing headache, worse waking from sleep, intolerance to tightness.", miasm: "Syphilis" },
      { remedy: "Belladonna", indication: "Impending eclampsia with flushed red face, dilated pupils, throbbing carotids, violent cerebral congestion, sensitivity to light/noise.", miasm: "Psora" },
      { remedy: "Gelsemium", indication: "Preeclamptic headache beginning in occiput spreading to forehead; dullness, dizziness, drowsiness, albuminuria.", miasm: "Psora" },
      { remedy: "Phosphorus", indication: "Threatened hemorrhage, bright red bleeding, hemorrhagic diathesis, fatty degeneration of liver/placenta in toxemia.", miasm: "Tubercular / Syphilis" }
    ]
  },
  {
    id: "obs-8",
    number: "2.8",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Abnormal Labor (Dystocia), Malpositions, Malpresentations & Obstetric Emergencies",
    theoryHours: 10,
    clinicalHours: 8,
    summary: "Etiology and classification of Dystocia (abnormal power, passenger, or passage). Malpositions (Occipito-Posterior) and Malpresentations (Breech: types, mechanisms, delivery techniques; Face, Brow, Shoulder / Transverse lie). Obstetric emergencies: Postpartum Hemorrhage (PPH - Primary & Secondary; 4 Ts: Tone, Tissue, Trauma, Thrombin), Cord Prolapse, Obstructed Labor, Rupture of Uterus, Shoulder Dystocia (HELPERR algorithm), and Amniotic Fluid Embolism.",
    coreTopics: [
      "Dystocia causes: 3 Ps (Abnormal Power: uterine inertia/hypertonic contractions; Abnormal Passenger: macrosomia, malpresentation, hydrocephalus; Abnormal Passage: contracted pelvis, pelvic tumor)",
      "Occipito-Posterior Position (ROP/LOP): Mechanism, long rotation (3/8th circle), short rotation to direct OP, deep transverse arrest, persistent OP management",
      "Breech Presentation: Types (Frank/extended, Complete/flexed, Footling/incomplete), external cephalic version (ECV) at 36-37 wks, assisted breech delivery (Pinard maneuver for legs, Lovset maneuver for extended arms, Mauriceau-Smellie-Veit / Burns-Marshall technique for aftercoming head)",
      "Postpartum Hemorrhage (PPH): Definition (blood loss >=500 ml after vaginal delivery or >=1000 ml after Cesarean section, or any amount causing hemodynamic instability). Primary (within 24 hrs) vs Secondary PPH. The 4 Ts: Tone (Uterine Atony 70-80%), Tissue (Retained placenta/cotyledons), Trauma (Cervical/vaginal/perineal tears, uterine rupture), Thrombin (Coagulopathy)",
      "Emergency Management of Atonic PPH: Stepwise protocol: 1. Uterine massage & bimanual compression, 2. Uterotonics (Oxytocin 20-40 IU infusion, Methylergometrine 0.2 mg IM, Carboprost / PGF2a 250 mcg IM, Misoprostol 800 mcg PR), 3. Tranexamic acid 1g IV, 4. Uterine balloon tamponade (Bakri balloon), 5. Surgical (B-Lynch brace suture, uterine artery ligation, internal iliac artery ligation, emergency peripartum hysterectomy)",
      "Cord Prolapse vs Cord Presentation: Emergency management (Patient in steep Trendelenburg / knee-chest position, manual elevation of presenting part off the cord, immediate emergency Cesarean delivery)",
      "Shoulder Dystocia: HELPERR mnemonics: Help, Episiotomy, Legs hyperflexed (McRoberts maneuver), Pressure suprapubic, Enter internal maneuvers (Rubin/Woods screw), Remove posterior arm, Roll to hands and knees (Gaskin maneuver)"
    ],
    clinicalPearls: [
      "In Shoulder Dystocia, FUNDAL PRESSURE IS STRICTLY CONTRAINDICATED as it impacts the anterior shoulder further behind the pubic symphysis and increases the risk of uterine rupture and brachial plexus injury.",
      "The McRoberts maneuver (hyperflexing the maternal hips against the abdomen) successfully resolves over 40-50% of shoulder dystocias by flattening the lumbar spine and rotating the pubic symphysis cephalad."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Postpartum Hemorrhage (PPH). Classify PPH and detail the etiology, preventive measures, and emergency medical/surgical management of Atonic PPH.", marks: 10 },
      { type: "LAQ", question: "Discuss Breech Presentation: classification, diagnostic maneuvers, mechanisms, and techniques of delivering the aftercoming head.", marks: 10 },
      { type: "SAQ", question: "Describe the emergency management protocol for Umbilical Cord Prolapse.", marks: 5 },
      { type: "SAQ", question: "Explain the McRoberts maneuver and suprapubic pressure in managing Shoulder Dystocia.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "China Officinalis (Cinchona)", indication: "Acute severe exhaustion, dizziness, fainting, tinnitus, and pallor following massive hemorrhage during or after labor.", miasm: "Psora" },
      { remedy: "Secale Cornutum", indication: "Passive, atonic postpartum hemorrhage; thin, dark, blackish blood; uterus relaxed, flabby, fails to contract.", miasm: "Syphilis" },
      { remedy: "Millefolium", indication: "Painless, continuous gushing flow of bright red, arterial blood after mechanical injury, exertion, or delivery.", miasm: "Psora / Sycosis" },
      { remedy: "Erigeron Canadense", indication: "Profuse bright red arterial hemorrhage from uterus with painful urination and violent irritation of bladder/rectum.", miasm: "Psora" }
    ]
  },
  {
    id: "obs-9",
    number: "2.9",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Medical Disorders in Pregnancy (Anemia, Diabetes, Heart Disease, Infections)",
    theoryHours: 8,
    clinicalHours: 6,
    summary: "Impact of systemic maternal medical co-morbidities on pregnancy and vice-versa: Anemia in pregnancy (Iron deficiency, Megaloblastic), Gestational Diabetes Mellitus (GDM / DIPSI criteria, fetal macrosomia, neonatal hypoglycemia), Cardiac Disease in pregnancy (NYHA functional classification, Mitral stenosis, peripartum cardiomyopathy), Thyroid dysfunction, and Perinatal infections (TORCH panel, Hepatitis B, HIV / PPTCT protocol, COVID-19).",
    coreTopics: [
      "Anemia in Pregnancy: Definition (Hb <11 g/dL in 1st/3rd trimester, <10.5 g/dL in 2nd trimester; severe anemia <7 g/dL, very severe <4 g/dL). Microcytic hypochromic (Iron deficiency - low ferritin, high TIBC) vs Macrocytic (Folate/B12 deficiency). Maternal risks (PPH, heart failure, sepsis) and fetal risks (IUGR, prematurity, stillbirth)",
      "Gestational Diabetes Mellitus (GDM): Diagnostic criteria (DIPSI: 75g non-fasting oral glucose load with 2-hour plasma glucose >=140 mg/dL; or IADPSG fasting >=92, 1h >=180, 2h >=153 mg/dL). Maternal complications (polyhydramnios, preeclampsia, operative delivery) and fetal/neonatal risks (macrosomia, shoulder dystocia, respiratory distress syndrome, neonatal hypoglycemia, polycythemia, hyperbilirubinemia)",
      "Heart Disease in Pregnancy: NYHA Functional Classes (I to IV). High-risk conditions (Eisenmenger syndrome, severe pulmonary hypertension, severe aortic stenosis). Hemodynamic crises during labor and immediately postpartum (autotransfusion of 500 ml blood upon placental delivery)",
      "Thyroid Disorders: Hypothyroidism in pregnancy (maternal thyroxine essential for fetal neurodevelopment; goal TSH <2.5 in 1st trim, <3.0 in 2nd/3rd trim)",
      "Perinatal Infections (TORCH): Toxoplasmosis (hydrocephalus, chorioretinitis, intracranial calcifications), Rubella (congenital cataract, PDA, sensorineural deafness), CMV (periventricular calcifications, microcephaly), Herpes Simplex (active genital lesions -> elective Cesarean indication), HIV PPTCT protocol (lifelong ART for mother, infant Nevirapine/Zidovudine prophylaxis)"
    ],
    clinicalPearls: [
      "In pregnant women with cardiac disease, the most perilous hemodynamic moment is immediately after delivery of the placenta, when uterine contraction autotransfuses approx. 500 mL of blood back into maternal systemic circulation, precipitating acute congestive heart failure.",
      "Neonatal hypoglycemia in infants of diabetic mothers occurs due to fetal hyperinsulinemia (in response to maternal hyperglycemia), which persists after the umbilical cord is clamped."
    ],
    examQuestions: [
      { type: "LAQ", question: "Define Gestational Diabetes Mellitus (GDM). Discuss screening criteria (DIPSI), maternal and fetal complications, and management principles.", marks: 10 },
      { type: "SAQ", question: "Describe the classification, clinical features, and management of Iron Deficiency Anemia in pregnancy.", marks: 5 },
      { type: "SAQ", question: "Discuss the congenital rubella syndrome triad and prevention of mother-to-child transmission of HIV.", marks: 5 }
    ],
    therapeuticsHighlight: [
      { remedy: "Ferrum Phosphoricum", indication: "Early anemia in pregnancy with flushed face, soft compressible pulse, low-grade inflammatory states.", miasm: "Psora" },
      { remedy: "Syzygium Jambolanum", indication: "Supportive therapeutics in metabolic dysglycemia with excessive thirst, weakness, and glycosuria.", miasm: "Sycosis" },
      { remedy: "Thyroidinum", indication: "Gestational hypothyroidism with profound chilliness, puffy face, dry skin, fatigue, and sluggish circulation.", miasm: "Psora / Tubercular" },
      { remedy: "Digitalis Purpurea", indication: "Cardiac debility in pregnant women with slow, irregular, or intermittent pulse, faintness, cyanosis.", miasm: "Psora / Syphilis" }
    ]
  },
  {
    id: "obs-10",
    number: "2.10",
    unit: "Unit 2: Obstetrics & Newborn Care",
    title: "Operative Obstetrics, Obstetric Instruments & Procedures",
    theoryHours: 7,
    clinicalHours: 10,
    summary: "Indications, prerequisites, technique, and complications of major operative obstetric interventions: Forceps Delivery (Wrigley's, Simpson's, Kielland's), Vacuum Extraction / Ventouse (indications, contraindications, chignon formation), Caesarean Section (Lower Segment Caesarean Section / LSCS - indications, surgical steps, complications), Vaginal Birth After Caesarean (VBAC criteria & risks), Dilatation & Evacuation (D&E), Manual Vacuum Aspiration (MVA), and Cervical Cerclage (McDonald vs Shirodkar). Identification, parts, and clinical uses of standard obstetric and gynaecological instruments.",
    coreTopics: [
      "Forceps Delivery: Classification (Outlet, Low, Mid-forceps). Essential Prerequisites (FORCEPS: Fully dilated cervix, Occiput/vertex presenting, Ruptured membranes, Cephalopelvic disproportion excluded, Engaged head, Position known, Sized pelvis / Sponge empty bladder). Maternal and fetal complications",
      "Vacuum Extraction (Ventouse): Mechanism (traction on artificial chignon), cup types (Malmström rigid vs Silc soft cups), advantages over forceps, contraindications (prematurity <34 wks, face/breech presentation, unengaged head)",
      "Caesarean Section: Lower Segment Caesarean Section (LSCS) vs Classical Caesarean. Absolute indications (placenta previa major, extreme CPD, transverse lie, obstructed labor, pelvic tumor blocking birth canal) vs Relative indications. Steps: Pfannenstiel / midline incision, visceral peritoneum incision, lower segment transverse hysterotomy, delivery of head, placenta removal, 2-layer closure",
      "Vaginal Birth After Caesarean (VBAC / TOLAC): Patient selection criteria, contraindications (prior classical incision, prior uterine rupture, >2 previous LSCS), monitoring for scar dehiscence / impending rupture (loss of station, breakthrough scar pain, fetal bradycardia)",
      "Obstetric & Gynaecological Instruments: Sims double-bladed speculum, Cusco bivalve speculum, Ayre spatula, Hegar cervical dilators, Anterior vaginal wall retractor, Vulsellum forceps, Tenaculum, Sponge-holding forceps, Green-Armytage hemostatic clamp, Doyen retractor, Ovum forceps, Blunt & sharp uterine curettes, Episiotomy scissors, Umbilical cord clamp, Wrigley's obstetric forceps, Ventouse cup"
    ],
    clinicalPearls: [
      "The Green-Armytage clamp is specifically designed to grasp and compress the vascular bleeding edges of the lower uterine segment hysterotomy incision during LSCS without crushing surrounding tissue.",
      "In VBAC monitoring, the most reliable and consistent earliest sign of impending uterine scar rupture is sudden, persistent FETAL HEART RATE ABNORMALITY (variable or prolonged bradycardia)."
    ],
    examQuestions: [
      { type: "SAQ", question: "Enumerate the prerequisites and contraindications for Forceps Delivery.", marks: 5 },
      { type: "SAQ", question: "What are the indications, prerequisites, and complications of Vacuum Extraction (Ventouse)?", marks: 5 },
      { type: "SAQ", question: "Mention indications for LSCS and criteria for offering a trial of labor after cesarean (TOLAC / VBAC).", marks: 5 },
      { type: "VIVA", question: "Identify the parts and uses of a Sims speculum vs Cusco speculum." }
    ],
    therapeuticsHighlight: [
      { remedy: "Arnica Montana", indication: "Routine post-operative care following LSCS, forceps delivery, or perineal tear; bruised soreness, promotes tissue healing.", miasm: "Psora" },
      { remedy: "Staphysagria", indication: "Severe sharp, stinging pains in surgical incisional wounds (LSCS / episiotomy / lacerations) or after catheterization.", miasm: "Psora / Sycosis" },
      { remedy: "Hypericum Perforatum", indication: "Intense nerve injury pain following instrumental delivery, coccyx injury during childbirth, or perineal trauma.", miasm: "Psora" },
      { remedy: "Calendula Officinalis", indication: "Topical and internal remedy for clean healing of perineal lacerations, episiotomy wounds, and prevention of sepsis.", miasm: "Psora" }
    ]
  }
];

export const nchGynaeCompetencies: NchGynaeCompetency[] = [
  {
    code: "OG 1.1",
    topic: "Anatomy of Pelvis & Reproductive Organs",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Describe the structural anatomy, ligamentous supports, blood supply, lymphatic drainage, and relations of female pelvic organs with clinical relevance to displacements and surgeries.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Lecture", "Dissection video", "Small group tutorial", "Pelvic model demonstration"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Viva Voce", "OSPE"],
    horizontalIntegration: ["Anatomy (Pelvis and Perineum)", "Physiology"],
    verticalIntegration: ["Surgery", "Practice of Medicine"],
    homoeopathicTherapeuticsLink: "Sepia, Lilium Tig, Murex for pelvic support laxity"
  },
  {
    code: "OG 1.2",
    topic: "Embryology & Congenital Malformations",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Explain the embryological development of the Müllerian and Wolffian duct systems and classify congenital anomalies (MRKH, septate uterus, imperforate hymen) with their clinical presentation.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Lecture", "Case-based learning", "Clinical photograph analysis"],
    assessmentMethods: ["Written examination (SAQ)", "Viva Voce"],
    horizontalIntegration: ["Embryology / Anatomy"],
    verticalIntegration: ["Paediatrics", "Reproductive Genetics"]
  },
  {
    code: "OG 2.1",
    topic: "Physiology of Menstruation & HPO Axis",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Explain the endocrine feedback regulation of the Hypothalamic-Pituitary-Ovarian axis, ovarian cycle, endometrial phases, and hormonal control of puberty and ovulation.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Interactive lecture", "Physiological flowchart workshop", "Tutorial"],
    assessmentMethods: ["Written examination (LAQ)", "Viva Voce", "MCQ"],
    horizontalIntegration: ["Physiology (Endocrinology & Reproduction)", "Biochemistry"],
    verticalIntegration: ["Materia Medica (Folliculinum, Pituitaria, Pulsatilla)"]
  },
  {
    code: "OG 2.2",
    topic: "Gynaecological Case History & Examination",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Perform a comprehensive, empathetic gynaecological history taking and demonstrate the steps of speculum (Sims/Cusco) and bimanual pelvic examination on a simulation mannequin adhering to ethical and aseptic standards.",
    domain: "Psychomotor",
    level: "SH",
    core: true,
    teachingLearningMethods: ["Bedside clinical posting", "DOAP (Demonstrate, Observe, Assist, Perform) session", "Simulated patient"],
    assessmentMethods: ["OSCE", "Clinical Long/Short Case", "Logbook evaluation"],
    horizontalIntegration: ["Communication Skills", "Organon of Medicine (Aphorisms 83-104 on Case Taking)"],
    verticalIntegration: ["Clinical Examination Skills"]
  },
  {
    code: "OG 3.1",
    topic: "Abnormal Uterine Bleeding (AUB) & Amenorrhea",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Classify AUB using the FIGO PALM-COEIN classification and outline the diagnostic flowchart and management for primary and secondary amenorrhoea including homoeopathic constitutional approach.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Clinical lecture", "Case presentation", "PBL session"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Clinical Case discussion", "Viva Voce"],
    horizontalIntegration: ["Pathology (Endometrial pathology)", "General Medicine"],
    verticalIntegration: ["Materia Medica (Sabina, Thlaspi, Senecio, Pulsatilla)", "Repertory (Female Genitalia rubrics)"]
  },
  {
    code: "OG 3.2",
    topic: "PCOS, Endometriosis & Adenomyosis",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Describe the etiopathogenesis, diagnostic criteria (Rotterdam), clinical presentation, metabolic complications, and integrated homoeopathic management of PCOS and Endometriosis.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Integrated lecture", "Bedside clinic", "Seminar"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Viva Voce"],
    horizontalIntegration: ["Pathology", "Biochemistry (Insulin resistance, Lipid profile)"],
    verticalIntegration: ["Materia Medica (Sepia, Apis, Medorrhinum, Oophorinum)"]
  },
  {
    code: "OG 4.1",
    topic: "Genital Infections & Pelvic Inflammatory Disease",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Diagnose common lower genital tract infections (Candida, Trichomonas, Bacterial vaginosis) and assess Pelvic Inflammatory Disease (PID) and its long-term sequelae with homoeopathic therapeutics.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Clinical lecture", "Microscopy wet-mount demonstration", "Bedside clinic"],
    assessmentMethods: ["Written examination (SAQ)", "Viva Voce", "OSPE"],
    horizontalIntegration: ["Microbiology (Bacteriology, Mycology, Parasitology)", "Pathology"],
    verticalIntegration: ["Materia Medica (Kreosotum, Merc Sol, Hydrastis, Sepia)"]
  },
  {
    code: "OG 4.2",
    topic: "Benign & Premalignant Pelvic Tumors (Fibroids, CIN)",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Classify Uterine Fibroids and describe their clinical manifestations, secondary degenerations, cervical premalignant screening (Pap smear/Colposcopy), and homoeopathic management.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Lecture", "Gross specimen & histopathology demonstration", "Hospital OPD postings"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Specimen Viva", "OSPE"],
    horizontalIntegration: ["Pathology (Neoplasia, Histopathology)", "Radiology (USG pelvis)"],
    verticalIntegration: ["Materia Medica (Fraxinus, Aurum Mur Nat, Calc Carb, Thlaspi)"]
  },
  {
    code: "OG 5.1",
    topic: "Gynaecological Malignancies & Screening",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Explain the risk factors, HPV screening, clinical features, and staging of Carcinoma Cervix and Endometrial Ca, emphasizing red flag identification and timely oncological referral.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Lecture", "Case-based learning", "Community screening video"],
    assessmentMethods: ["Written examination (SAQ)", "Viva Voce"],
    horizontalIntegration: ["Pathology (Oncology, Cytology)", "Community Medicine (Cervical Ca Screening Programs)"],
    verticalIntegration: ["Oncology / Radiotherapy Referral protocols"]
  },
  {
    code: "OG 5.2",
    topic: "Pelvic Organ Prolapse & Infertility Workup",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Grade pelvic organ prolapse, demonstrate non-surgical pessary placement, and formulate a rational, stepwise investigation protocol for an infertile couple.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Clinical case discussion", "Bedside demonstration", "Semen analysis review"],
    assessmentMethods: ["Clinical Long/Short Case", "Written examination (LAQ/SAQ)", "Viva Voce"],
    horizontalIntegration: ["Physiology", "Pathology (Semen analysis)"],
    verticalIntegration: ["Materia Medica (Sepia, Lilium, Agnus Castus, Borax)"]
  },
  {
    code: "OG 6.1",
    topic: "Contraception, Family Planning & MTP Act",
    unit: "Unit 1: Gynaecology",
    specificLearningObjective: "Counsel women on spacing and permanent contraceptive methods (IUDs, COCPs, barrier, sterilization) and explain the legal framework of the MTP Act 2021 in India.",
    domain: "Affective",
    level: "SH",
    core: true,
    teachingLearningMethods: ["Role-play counseling session", "Dummy IUD insertion DOAP", "Tutorial"],
    assessmentMethods: ["OSCE (Counseling station)", "Written examination (SAQ)", "Viva Voce"],
    horizontalIntegration: ["Community Medicine / Family Welfare", "Forensic Medicine & Toxicology (MTP Act, Consent)"],
    verticalIntegration: ["Primary Healthcare Practice"]
  },
  {
    code: "OG 7.1",
    topic: "Maternal Physiology & Diagnosis of Pregnancy",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Describe maternal systemic and genital anatomical and physiological adaptations during pregnancy and demonstrate diagnostic skills for confirming pregnancy across trimesters.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Lecture", "Interactive case presentation", "Clinical postings"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Viva Voce"],
    horizontalIntegration: ["Physiology (Cardiovascular, Renal, Endocrine adaptations)", "Biochemistry"],
    verticalIntegration: ["Materia Medica (Ipecac, Symphoricarpus, Colchicum, Nux Vom)"]
  },
  {
    code: "OG 7.2",
    topic: "Antenatal Care & Obstetric Palpation (Leopold Maneuvers)",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Demonstrate accurate abdominal palpation on an antenatal mannequin or patient (fundal height calculation, Leopold's 4 grips, fetal heart sound auscultation) and formulate an ANC plan.",
    domain: "Psychomotor",
    level: "P",
    core: true,
    teachingLearningMethods: ["Antenatal clinic bedside posting", "DOAP session on obstetric mannequin", "Small group clinical demonstration"],
    assessmentMethods: ["Clinical Long Case", "OSPE (Obstetric Palpation station)", "Logbook"],
    horizontalIntegration: ["Community Medicine (MCH Programs, Pradhan Mantri Surakshit Matritva Abhiyan)", "General Physical Examination"],
    verticalIntegration: ["Obstetric Clinical Practice"]
  },
  {
    code: "OG 8.1",
    topic: "Mechanism of Normal Labor & Partograph Monitoring",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Explain the step-by-step mechanism of labor in vertex presentation on a dummy-pelvis simulator and plot maternal-fetal intrapartum parameters on a modified WHO Partograph.",
    domain: "Psychomotor",
    level: "SH",
    core: true,
    teachingLearningMethods: ["Dummy & Pelvis simulation workshop", "Partograph plotting exercise", "Labour room posting"],
    assessmentMethods: ["OSPE (Mechanism of Labor on Pelvis)", "Partograph Case Exercise", "Written examination (LAQ)"],
    horizontalIntegration: ["Anatomy (Bony pelvis & fetal skull)", "Physiology (Uterine contractions)"],
    verticalIntegration: ["Materia Medica (Caulophyllum, Cimicifuga, Gelsemium, Pulsatilla)"]
  },
  {
    code: "OG 8.2",
    topic: "Active Management of Third Stage of Labor (AMTSL)",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Demonstrate the three components of AMTSL (Uterotonic administration, Controlled Cord Traction, Uterine massage) to prevent postpartum hemorrhage.",
    domain: "Psychomotor",
    level: "SH",
    core: true,
    teachingLearningMethods: ["DOAP session in skill lab", "Labour room active delivery observation", "Simulation video"],
    assessmentMethods: ["OSCE", "Labour Room Logbook check", "Viva Voce"],
    horizontalIntegration: ["Emergency Obstetric Skills", "Pharmacology (Uterotonics: Oxytocin, Ergometrine, Misoprostol)"],
    verticalIntegration: ["Life Saving Skills in Primary Healthcare"]
  },
  {
    code: "OG 9.1",
    topic: "Normal Puerperium, Lactation & Neonatal Care",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Assess maternal uterine involution, evaluate lochia, promote exclusive breastfeeding technique, perform APGAR scoring, and examine a normal newborn for reflexes and vitals.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Postnatal ward posting", "Newborn nursery demonstration", "Lactation counseling tutorial"],
    assessmentMethods: ["Clinical Short Case", "OSCE (APGAR / Newborn exam)", "Viva Voce"],
    horizontalIntegration: ["Physiology (Lactation reflex)", "Paediatrics (Newborn development)"],
    verticalIntegration: ["Materia Medica (Phytolacca, Agnus Castus, Chamomilla, Borax, Aconite)"]
  },
  {
    code: "OG 9.2",
    topic: "Complications of Early Pregnancy (Abortions, Ectopic)",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Differentiate clinical types of abortion and identify life-threatening signs of Ruptured Ectopic Pregnancy, providing emergency stabilization and immediate surgical referral.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["Emergency room / Gynae OPD case discussion", "Clinical vignette seminar", "Lecture"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Viva Voce", "Emergency triage OSCE"],
    horizontalIntegration: ["Pathology", "General Surgery (Acute abdomen triage)"],
    verticalIntegration: ["Materia Medica (Sabina, Secale, Viburnum Op, Arnica)"]
  },
  {
    code: "OG 10.1",
    topic: "Preeclampsia, Eclampsia & Antepartum Hemorrhage (APH)",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Identify severe preeclampsia, administer emergency Magnesium Sulphate Pritchard regimen for eclampsia, differentiate Placenta Previa from Abruptio Placentae, and adhere to the strict prohibition of digital examination in APH.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["High-risk antenatal clinic", "Clinical emergency simulation drill", "Lecture"],
    assessmentMethods: ["Written examination (LAQ)", "Viva Voce", "Emergency protocol OSPE"],
    horizontalIntegration: ["Internal Medicine (Hypertension, Coagulopathies)", "Pathology (HELLP syndrome)"],
    verticalIntegration: ["Materia Medica (Lachesis, Belladonna, Gelsemium, Phosphorus)"]
  },
  {
    code: "OG 10.2",
    topic: "Postpartum Hemorrhage (PPH) & Obstetric Emergencies",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Demonstrate emergency stepwise resuscitation for Atonic PPH (bimanual uterine compression, uterotonics, tranexamic acid, balloon tamponade) and manage Shoulder Dystocia (HELPERR algorithm).",
    domain: "Psychomotor",
    level: "SH",
    core: true,
    teachingLearningMethods: ["PPH emergency drill in skill lab", "Simulation mannequin practice", "Interactive case study"],
    assessmentMethods: ["OSCE (PPH Drill)", "Written examination (LAQ/SAQ)", "Viva Voce"],
    horizontalIntegration: ["Critical Care & Resuscitation", "Blood Transfusion protocols"],
    verticalIntegration: ["Materia Medica (China, Secale, Millefolium, Arnica)"]
  },
  {
    code: "OG 11.1",
    topic: "Medical Co-Morbidities in Pregnancy (Anemia, GDM, Heart Disease)",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Screen for Gestational Diabetes Mellitus (DIPSI test), classify maternal anemia, and assess cardiac risk during pregnancy and the immediate post-placental delivery phase.",
    domain: "Cognitive",
    level: "KH",
    core: true,
    teachingLearningMethods: ["High-risk ANC posting", "Joint Medicine-Obstetrics clinic case presentation"],
    assessmentMethods: ["Written examination (LAQ/SAQ)", "Clinical Case Discussion"],
    horizontalIntegration: ["General Medicine", "Biochemistry (Glucose tolerance, HbA1c)"],
    verticalIntegration: ["Materia Medica (Ferrum Phos, Syzygium, Thyroidinum, Digitalis)"]
  },
  {
    code: "OG 11.2",
    topic: "Operative Obstetrics & Instrument Identification",
    unit: "Unit 2: Obstetrics & Newborn Care",
    specificLearningObjective: "Identify standard obstetric and gynaecological instruments (Sims speculum, Cusco speculum, Wrigley's forceps, Green-Armytage, Doyen retractor, Hegar dilators, Curettes), state their indications, parts, and sterilization methods.",
    domain: "Cognitive",
    level: "SH",
    core: true,
    teachingLearningMethods: ["Instrument table practical demonstration", "Labour room / OT observer postings"],
    assessmentMethods: ["Practical Spotting & Instrument Viva", "OSPE"],
    horizontalIntegration: ["Surgery (Surgical instruments & Asepsis)", "Microbiology (Sterilization & Disinfection)"],
    verticalIntegration: ["Operative Care & Post-op Recovery (Arnica, Staphysagria, Calendula)"]
  }
];

export const nchGynaeExaminationScheme: ExaminationScheme[] = [
  {
    paper: "Paper I",
    title: "Gynaecology and Homoeopathic Therapeutics",
    marks: 100,
    duration: "3 Hours",
    sections: [
      {
        sectionName: "Section A: Gynaecology",
        marks: 50,
        questionTypes: "MCQs (10 marks) + SAQs (4 x 5 = 20 marks) + LAQ (2 x 10 = 20 marks)",
        topicsCovered: [
          "Anatomy, Embryology & Congenital Anomalies of Female Genital Tract",
          "Physiology of Menstruation & HPO Axis",
          "Gynaecological Evaluation & Diagnostic Procedures",
          "Menstrual Disorders, FIGO AUB, Amenorrhoea, Dysmenorrhoea",
          "PCOS, Endometriosis & Adenomyosis",
          "Pelvic Infections & Pelvic Inflammatory Disease (PID)",
          "Benign, Premalignant & Malignant Neoplasms (Fibroids, CIN, Carcinoma Cervix)",
          "Pelvic Organ Prolapse & Infertility Workup",
          "Menopause & Postmenopausal Health",
          "Contraception & MTP Act 2021"
        ]
      },
      {
        sectionName: "Section B: Homoeopathic Therapeutics in Gynaecology",
        marks: 50,
        questionTypes: "MCQs (10 marks) + SAQs (4 x 5 = 20 marks) + LAQ (2 x 10 = 20 marks)",
        topicsCovered: [
          "Homoeopathic management of Menstrual disorders (AUB, Dysmenorrhea, Amenorrhea)",
          "Therapeutics of Leucorrhea and Genital infections",
          "Therapeutics of Uterine Fibroids, PCOS, and Endometriosis",
          "Therapeutics of Pelvic Organ Prolapse and Bearing-down sensations",
          "Therapeutics of Climacteric and Menopausal complaints",
          "Repertorial rubrics and case analysis in Gynaecological conditions"
        ]
      }
    ]
  },
  {
    paper: "Paper II",
    title: "Obstetrics, Infant Care & Homoeopathic Therapeutics",
    marks: 100,
    duration: "3 Hours",
    sections: [
      {
        sectionName: "Section A: Obstetrics & Neonatology",
        marks: 50,
        questionTypes: "MCQs (10 marks) + SAQs (4 x 5 = 20 marks) + LAQ (2 x 10 = 20 marks)",
        topicsCovered: [
          "Maternal Physiological Adaptations to Pregnancy",
          "Diagnosis of Pregnancy & Antenatal Care (ANC)",
          "Normal Labor, Mechanism of Labor & Partograph",
          "Normal Puerperium & Lactation Physiology",
          "Normal Newborn Care, APGAR Scoring & NRP Resuscitation",
          "Complications of Early Pregnancy (Hyperemesis, Abortions, Ectopic)",
          "High-Risk Pregnancy (Preeclampsia, Eclampsia, APH, IUGR, Rh Isoimmunization)",
          "Abnormal Labor (Dystocia, Malpresentations, PPH, Obstetric Emergencies)",
          "Medical Disorders in Pregnancy (Anemia, GDM, Heart disease)",
          "Operative Obstetrics & Obstetric Instruments"
        ]
      },
      {
        sectionName: "Section B: Homoeopathic Therapeutics in Obstetrics & Neonatology",
        marks: 50,
        questionTypes: "MCQs (10 marks) + SAQs (4 x 5 = 20 marks) + LAQ (2 x 10 = 20 marks)",
        topicsCovered: [
          "Homoeopathic therapeutics of Hyperemesis Gravidarum and Morning Sickness",
          "Therapeutics of Threatened, Habitual, and Incomplete Abortions",
          "Therapeutics of Labor Disorders (Rigid Os, Ineffective Pains, False Labor)",
          "Therapeutics of Postpartum Hemorrhage and Retained Placenta",
          "Therapeutics of Puerperal Sepsis, Subinvolution, and Mastitis",
          "Therapeutics of Lactation disorders (Agalactia, Engorgement, Cracked Nipples)",
          "Therapeutics of Neonatal Disorders (Neonatal asphyxia, Jaundice, Ophthalmia, Thrush)"
        ]
      }
    ]
  }
];

export const practicalExaminationScheme = {
  title: "Practical / Clinical Examination & Viva Voce",
  totalMarks: 100,
  breakdown: [
    { component: "Long Case (Obstetric or Gynaecological Patient Examination & Case Taking)", marks: 40 },
    { component: "Short Case (Specific problem / Antenatal palpation / Postnatal check)", marks: 20 },
    { component: "Instruments, Specimen & Pelvis Demonstration (Spotting)", marks: 10 },
    { component: "OSPE (Objective Structured Practical Examination) / Dummy & Pelvis Mechanism", marks: 10 },
    { component: "Practical Clinical Logbook & Case Record Portfolio", marks: 10 },
    { component: "Grand Viva Voce (Oral examination by External and Internal Examiners)", marks: 10 }
  ],
  passingCriteria: "Minimum 50% aggregate in Theory (Paper I + Paper II with at least 40% in each individual paper) and Minimum 50% in Practical / Clinical & Viva Voce combined."
};

export const recommendedTextbooks = {
  modernMedical: [
    {
      title: "DC Dutta's Textbook of Obstetrics (Including Perinatology and Contraception)",
      author: "Hiralal Konar",
      edition: "9th / 10th Edition",
      description: "Gold-standard textbook for undergraduate obstetrics, mechanism of labor diagrams, antenatal protocols, and operative techniques."
    },
    {
      title: "DC Dutta's Textbook of Gynecology (Including Contraception)",
      author: "Hiralal Konar",
      edition: "8th / 9th Edition",
      description: "Authoritative clinical guide for gynaecological pathologies, endocrinology, HPO axis, surgical principles, and FIGO staging."
    },
    {
      title: "Shaw's Textbook of Gynaecology",
      author: "V.G. Padubidri & Shirish N. Daftary",
      edition: "17th Edition",
      description: "Renowned textbook with lucid explanations of pelvic anatomy, menstrual physiology, benign/malignant tumors, and surgical interventions."
    },
    {
      title: "Williams Obstetrics",
      author: "F. Gary Cunningham et al.",
      edition: "26th Edition",
      description: "Premier international reference text for maternal-fetal medicine, high-risk pregnancies, and critical obstetric emergencies."
    },
    {
      title: "OP Ghai Essential Pediatrics (Neonatology Section)",
      author: "Vinod K. Paul & Arvind Bagga",
      edition: "9th / 10th Edition",
      description: "Essential reference for normal newborn assessment, neonatal resuscitation, jaundice, and infant feeding."
    }
  ],
  homoeopathicTherapeutics: [
    {
      title: "The Accoucheur's Emergency Manual",
      author: "Dr. W.A. Yingling",
      description: "Classic pocket clinical therapeutics guide specifically designed for bedside management of labor disorders, abnormal pains, and obstetric emergencies."
    },
    {
      title: "The Application of the Principles and Practice of Homoeopathy to Obstetrics and the Disorders Peculiar to Women and Young Children",
      author: "Dr. Henry N. Guernsey",
      description: "Monumental classical text detailing keynote symptoms and repertorial indications for pregnancy, labor, puerperium, and female diseases."
    },
    {
      title: "A Text-Book of Gynaecology",
      author: "Dr. A.C. Cowperthwaite",
      description: "Comprehensive blend of gynaecological pathology with exhaustive homoeopathic therapeutics, remedy comparisons, and dosage guidelines."
    },
    {
      title: "Diseases of the Uterus",
      author: "Dr. J. Compton Burnett",
      description: "Specialized clinical treatise on non-surgical homoeopathic resolution of uterine indurations, tumors, displacements, and chronic ailments."
    },
    {
      title: "Repertory of the Homoeopathic Materia Medica (Genitalia Female, Pregnancy, Parturition, Lactation)",
      author: "Dr. J.T. Kent",
      description: "Essential repertorial chapters for systematic repertorization of female reproductive, antenatal, and postpartum symptomatology."
    }
  ]
};

export const emergencyReferralSafetyGuidelines = {
  title: "Clinical Safety & Mandatory Specialist Referral Protocols",
  importance: "CRITICAL LIFE-SAFETY DIRECTIVE (NCH CBDC COMPLIANCE)",
  guidelines: [
    {
      category: "Obstetric Emergencies (Immediate Tertiary Hospital Referral)",
      triggers: [
        "Antepartum Hemorrhage (Placenta Previa, Abruptio Placentae) — Strict prohibition of digital vaginal examination; immediate IV access, fluid resuscitation, and emergency transfer.",
        "Eclampsia / Impending Eclampsia — Convulsions, BP >=160/110 with hyperreflexia, visual blurring; administer loading dose of Magnesium Sulphate and transfer.",
        "Ruptured Ectopic Pregnancy — Acute peritonitis, syncope, Cullen's sign, hemorrhagic shock; immediate surgical resuscitation.",
        "Postpartum Hemorrhage (PPH) refractory to initial bimanual compression and uterotonics; balloon tamponade and urgent surgical transfer.",
        "Umbilical Cord Prolapse — Patient in knee-chest position, manual elevation of presenting part off the cord, immediate emergency Cesarean delivery.",
        "Obstructed Labor / Impending Uterine Rupture (Bandl's ring, persistent scar pain in VBAC)."
      ]
    },
    {
      category: "Neonatal Emergencies",
      triggers: [
        "Severe Birth Asphyxia (5-minute APGAR < 4, non-responsive to initial NRP steps).",
        "Respiratory Distress Syndrome (Grunting, severe subcostal retractions, cyanosis on room air).",
        "Early Neonatal Sepsis / Meningitis (Hypothermia/fever, lethargy, refusal to feed, bulging fontanelle).",
        "Pathological Jaundice within first 24 hours or rapid rise >5 mg/dL/day (risk of Bilirubin Encephalopathy / Kernicterus)."
      ]
    },
    {
      category: "Gynaecological Red Flags",
      triggers: [
        "Post-Menopausal Bleeding — Mandatory transvaginal sonography and endometrial histopathology to rule out Endometrial Carcinoma.",
        "Suspicious cervical growth, hard irregular ulcer, or contact bleeding — Urgent colposcopy and cervical biopsy.",
        "Acute abdomen due to Torsion of Ovarian Cyst or Tubo-ovarian Abscess rupture — Emergency surgical intervention."
      ]
    }
  ]
};
