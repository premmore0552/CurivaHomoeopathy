import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck2, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Award,
  Download,
  BookMarked,
  Filter,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Building2,
  Clock,
  Printer
} from 'lucide-react';
import SEO from '../components/SEO';
import { universityPYQs, UniversityPYQ } from '../data/pyqs_data';

const blueprintsData = [
  {
    year: "1st BHMS",
    subjects: [
      {
        name: "Anatomy Paper I & II",
        code: "HomUG-Anat",
        totalMarks: 200,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 10 = 50), Very Short / Clinical Spotters (2 Marks x 15 = 30)",
        highYieldTopics: [
          "Upper Limb: Brachial Plexus formation & palsies, Axillary Artery branches, Shoulder Joint & Rotator Cuff, Radial Nerve course",
          "Thorax: Heart External & Internal Chambers, Coronary Circulation & Anastomosis, Bronchopulmonary Segments of Lungs",
          "Head & Neck: Cavernous Sinus relations & thrombosis, Cranial Nerves V (Trigeminal), VII (Facial), IX, X, Thyroid Gland blood supply",
          "Neuroanatomy: Cerebellum, Internal Capsule fibers & blood supply, Circle of Willis cerebral arterial circle",
          "Abdomen & Pelvis: Inguinal Canal boundaries & hernias, Stomach bed, Liver histology, Peritoneal pouches"
        ]
      },
      {
        name: "Physiology & Biochemistry Paper I & II",
        code: "HomUG-Physio",
        totalMarks: 200,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 10 = 50), Very Short (2 Marks x 15 = 30)",
        highYieldTopics: [
          "Cardiovascular: Cardiac Cycle events & pressure curves, Regulation of Cardiac Output, Short/Long term Blood Pressure control",
          "Renal: Juxtaglomerular Apparatus, Counter-Current Multiplier and Exchanger, GFR regulation & Clearance tests",
          "Endocrinology: Anterior Pituitary hormones, Thyroid hormone synthesis and feedback, Diabetes Insipidus vs. Mellitus",
          "Respiratory: Oxygen-Hemoglobin Dissociation Curve, Neural & Chemical regulation of respiration, Surfactant function",
          "Biochemistry: Citric Acid (Krebs) Cycle, Glycolysis energetics, Vitamin D synthesis & activation, Hemoglobin synthesis"
        ]
      },
      {
        name: "Homoeopathic Pharmacy",
        code: "HomUG-Pharm",
        totalMarks: 100,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 8 = 40), Very Short (2 Marks x 20 = 40)",
        highYieldTopics: [
          "Trituration 3-stage process for insoluble medicinal substances (Hahnemannian & modern method)",
          "Vehicles: Sugar of Milk (Saccharum Lactis) preparation, purification tests, Alcohol grades, Globules standards",
          "50-Millesimal LM Potency preparation method (§270, 6th edition of Organon)",
          "Differences between Hahnemannian Old Methods (Classes I to IX) and Modern Maceration/Percolation",
          "Drugs and Cosmetics Act 1940: Rules & Schedule M1 standards for Homoeopathic manufacturing"
        ]
      }
    ]
  },
  {
    year: "2nd BHMS",
    subjects: [
      {
        name: "Pathology & Microbiology Paper I & II",
        code: "HomUG-Path-M",
        totalMarks: 200,
        pattern: "Paper I (General & Systemic Pathology): LAQ (10M x 2 = 20), SAQ (5M x 10 = 50), Short Answers (3M x 10 = 30). Paper II (Microbiology, Parasitology & Lab): Same pattern.",
        highYieldTopics: [
          "General Pathology: Reversible vs. Irreversible Cell Injury, Necrosis types vs. Apoptosis, Vascular & Cellular events in Acute Inflammation, Tissue Repair",
          "Neoplasia: Differences between Benign & Malignant tumors, Carcinogenesis pathways, Oncogenes, TNM clinical staging, Tumor Markers",
          "Systemic Pathology: Myocardial Infarction, Pneumonia (Lobar vs. Broncho), Peptic Ulcer, Cirrhosis, Glomerulonephritis",
          "Microbiology & Parasitology: Staphylococcus aureus, Streptococcus, Mycobacterium tuberculosis (Ziehl-Neelsen staining), Malaria (Plasmodium vivax vs. falciparum), Amoebiasis",
          "Clinical Hematology: CBC Hemogram interpretation (Microcytic vs. Macrocytic anemia, Leukemoid reaction vs. CML), Urine & Stool microscopy"
        ]
      },
      {
        name: "Forensic Medicine & Toxicology (FMT)",
        code: "HomUG-FMT",
        totalMarks: 100,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 10 = 50), Short Answers (3 Marks x 10 = 30)",
        highYieldTopics: [
          "Thanatology: Rigor Mortis vs. Cadaveric Spasm, Post-mortem Lividity distribution, Putrefaction timeline & Autopsy rules",
          "Medical Jurisprudence: Bhartiya Nyaya Sanhita (BNS 2023), Informed Consent, Medical Negligence (Bolam test, Res Ipsa Loquitur), Professional Misconduct",
          "Traumatology & Asphyxia: Mechanical injuries (Abrasion, Contusion, Laceration, Incised, Chop wounds), Firearm wound ballistics, Hanging vs. Strangulation",
          "Toxicology: Arsenic poisoning (Acute vs. Chronic, Marsh test), Lead poisoning (Plumbism), Snakebite management (Vasotoxic vs. Neurotoxic), Plant poisons & Homoeopathic antidotes"
        ]
      },
      {
        name: "Homoeopathic Materia Medica - II",
        code: "HomUG-HMM-II",
        totalMarks: 100,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 10 = 50), Short Answers (3 Marks x 10 = 30)",
        highYieldTopics: [
          "Detailed drug picture of 48 polychrest & clinical remedies (Acetic Acid to Veratrum Album)",
          "Constitutional & Thermal prescribing affinities (Hot vs. Chilly polychrests)",
          "Comparative drug study: Bryonia vs. Rhus Tox in joint disorders, Nux Vomica vs. Pulsatilla in dyspepsia, Arsenicum vs. Phosphorus in respiratory diseases",
          "Miasmatic cleavage: Psora, Sycosis, and Syphilis indications in polychrests"
        ]
      },
      {
        name: "Organon of Medicine - II",
        code: "HomUG-OM-II",
        totalMarks: 100,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 10 = 50), Short Answers (3 Marks x 10 = 30)",
        highYieldTopics: [
          "Hahnemannian Classification of Diseases (§71–82): Acute (Individual, Sporadic, Epidemic) & Chronic (Pseudo, Artificial, True)",
          "Theory of Chronic Miasms: Psora as the primary fundamental cause, Sycosis, and Syphilis manifestations",
          "Homoeopathic Case Taking Principles & Unprejudiced Observer requirements (§83–104)",
          "Drug Proving on healthy human beings: Qualifications of Prover, Doses, and Recording (§105–145)"
        ]
      }
    ]
  },
  {
    year: "3rd BHMS",
    subjects: [
      {
        name: "Surgery & Homoeopathic Therapeutics (Paper I & II)",
        code: "HomUG-Surg",
        totalMarks: 200,
        pattern: "Paper I (General Surgery, Wounds, Shock, Burns, Pre/Post-Op): 100M. Paper II (Systemic, ENT, Eye, Ortho): 100M.",
        highYieldTopics: [
          "General Surgery: Wound healing stages, Shock management, Burns assessment (Rule of Nines) & fluid replacement",
          "Acute Abdomen: Appendicitis differential diagnosis, Alvarado score, Inguinal hernia repair",
          "ENT & Eye: CSOM (Safe vs. Unsafe) & complications, Tonsillitis, Cataract & Glaucoma",
          "Orthopaedics: Fracture healing phases, complications of fractures, Osteomyelitis",
          "Surgical Homoeopathy: Pre & Post-operative care (Arnica, Staphysagria, Hypericum, Calendula, Symphytum)"
        ]
      },
      {
        name: "Obstetrics & Gynecology (OBG) (Paper I & II)",
        code: "HomUG-OBG",
        totalMarks: 200,
        pattern: "Paper I (Obstetrics, Antenatal Care, Labor, Puerperium): 100M. Paper II (Gynecology, Menstrual Disorders, Infertility, Therapeutics): 100M.",
        highYieldTopics: [
          "Obstetrics: Mechanism of Normal Labor (Vertex presentation), Partogram monitoring, Preeclampsia & Eclampsia management, Postpartum Hemorrhage (4 Ts)",
          "Gynecology: Abnormal Uterine Bleeding (AUB) classification (PALM-COEIN), PCOS Rotterdam criteria, Endometriosis & Pelvic Inflammatory Disease",
          "Infertility: Diagnostic workup and ovulation induction protocols",
          "Obstetric Therapeutics: Threatened Abortion (Sabina, Secale, Trillium), Dysmenorrhea (Mag Phos, Colocynth, Chamomilla), Labor dystocia (Caulophyllum, Cimicifuga)"
        ]
      }
    ]
  },
  {
    year: "4th BHMS",
    subjects: [
      {
        name: "Practice of Medicine & Homoeopathic Therapeutics (Paper I & II)",
        code: "HomUG-PM",
        totalMarks: 200,
        pattern: "Paper I (CVS, RS, GIT, Hepatic, Renal, Endocrine): 100M. Paper II (Neurology, Rheumatology, Skin, Infections, Psychiatry): 100M.",
        highYieldTopics: [
          "Cardiovascular & Respiratory: Myocardial Infarction, Bronchial Asthma acute/chronic protocols, COPD, Hypertension",
          "Gastrointestinal & Hepatic: Peptic Ulcer, Cirrhosis of Liver & Ascites, Ulcerative Colitis vs. Crohn's disease",
          "Endocrinology & Renal: Diabetes Mellitus Type 1 & 2 microvascular complications, Chronic Kidney Disease, Nephrotic Syndrome",
          "Rheumatology & Skin: Rheumatoid Arthritis vs. Osteoarthritis, Eczema, Psoriasis, Gout",
          "Clinical Therapeutics: Cactus, Crataegus, Syzygium, Chelidonium, Rhus Tox, Causticum, Lycopodium"
        ]
      },
      {
        name: "Repertory & Repertorisation",
        code: "HomUG-Rep",
        totalMarks: 100,
        pattern: "LAQ (10 Marks x 2 = 20), SAQ (5 Marks x 8 = 40), Very Short (2 Marks x 20 = 40)",
        highYieldTopics: [
          "Kent's Repertory: Plan, construction, 37 chapters, and typographic grading (1, 2, 3)",
          "Boenninghausen's Therapeutic Pocket Book (TPB): Doctrine of Analogy, Complete Symptom, and Concomitants",
          "Boger's BBCR: Pathological general, tissue affinities, and Synoptic Key",
          "Methods of Repertorisation: Kentian (General to Particular), Boenninghausen (Particular to General), Boger method",
          "Aphorism 153 PQRS symptom valuation and computerized repertorisation algorithms (RADAR, Synthesis)"
        ]
      }
    ]
  }
];

export default function UniversityBlueprints() {
  const [activeTab, setActiveTab] = useState<'blueprints' | 'pyqs'>('blueprints');
  const [selectedYear, setSelectedYear] = useState<string>('1st BHMS');
  
  // PYQ Filter states
  const [pyqSearch, setPyqSearch] = useState('');
  const [selectedPyqSubject, setSelectedPyqSubject] = useState<string>('All');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All');
  const [selectedMarks, setSelectedMarks] = useState<string>('All');
  const [expandedPyqId, setExpandedPyqId] = useState<string | null>(null);

  const activeBlueprint = blueprintsData.find(b => b.year === selectedYear);

  const filteredPyqs = useMemo(() => {
    return universityPYQs.filter(pyq => {
      const q = pyqSearch.toLowerCase().trim();
      const matchesSearch = !q || 
        pyq.question.toLowerCase().includes(q) ||
        pyq.answer.toLowerCase().includes(q) ||
        pyq.university.toLowerCase().includes(q) ||
        pyq.keyPoints.some(kp => kp.toLowerCase().includes(q));

      const matchesSubject = selectedPyqSubject === 'All' || pyq.subject === selectedPyqSubject;
      const matchesUniversity = selectedUniversity === 'All' || pyq.university.toLowerCase().includes(selectedUniversity.toLowerCase());
      const matchesMarks = selectedMarks === 'All' || String(pyq.marks) === selectedMarks;

      return matchesSearch && matchesSubject && matchesUniversity && matchesMarks;
    });
  }, [pyqSearch, selectedPyqSubject, selectedUniversity, selectedMarks]);

  const uniqueSubjects = useMemo(() => {
    const subs = new Set<string>();
    universityPYQs.forEach(p => subs.add(p.subject));
    return Array.from(subs);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <SEO 
        title="University Exam Blueprints & Solved Model Answer Keys | Curiva Homoeopathy"
        description="Official NCH BHMS University exam paper blueprints, mark distributions, 10-mark LAQs, 5-mark SAQs, and verified model answer keys across 1st, 2nd, 3rd, and 4th BHMS."
      />

      {/* Top Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/subjects" className="hover:text-primary transition-colors">Subjects</Link>
          <span>/</span>
          <span className="text-primary font-bold">University Blueprints &amp; Solved Answers</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <FileCheck2 className="w-4 h-4 text-blue-400" />
              NCH University Examination System
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              University Blueprints &amp; Solved PYQs
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed">
              Review NCH competency blueprints, question paper patterns, 10-mark Long Answer Questions (LAQs), 5-mark Short Answer Questions (SAQs), and verified step-by-step model answer keys for MUHS, WBUHS, RGUHS, KUHS, and all central health universities.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Blueprints vs. Solved PYQ Database */}
      <div className="flex items-center justify-center">
        <div className="bg-bg-secondary p-1.5 rounded-2xl border border-border flex items-center gap-2 shadow-sm">
          <button
            onClick={() => setActiveTab('blueprints')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'blueprints'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-primary hover:bg-bg-primary'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Subject-Wise Exam Blueprints</span>
          </button>
          <button
            onClick={() => setActiveTab('pyqs')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pyqs'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-primary hover:bg-bg-primary'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Solved University PYQs &amp; Answers</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white">
              {universityPYQs.length}
            </span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: BLUEPRINTS --- */}
      {activeTab === 'blueprints' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Year Selector */}
          <div className="flex items-center gap-3 border-b border-border pb-4 overflow-x-auto">
            {blueprintsData.map(b => (
              <button
                key={b.year}
                onClick={() => setSelectedYear(b.year)}
                className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  selectedYear === b.year
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-bg-secondary text-text-secondary hover:bg-primary/10 border border-border'
                }`}
              >
                {b.year} Exam Blueprints
              </button>
            ))}
          </div>

          {/* Active Year Details */}
          {activeBlueprint && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary">
                    {activeBlueprint.year} Subject-Wise Exam Blueprints
                  </h2>
                  <p className="text-xs text-text-tertiary">
                    Official NCH Paper Blueprints, Marks Allocation &amp; High-Yield Units
                  </p>
                </div>
                <Link
                  to={`/subjects?year=${encodeURIComponent(activeBlueprint.year)}`}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>Open {activeBlueprint.year} Subjects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeBlueprint.subjects.map((sub, idx) => (
                  <div key={idx} className="bg-bg-secondary border border-border rounded-3xl p-6 shadow-sm hover:border-primary/30 transition-all space-y-5">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10 mr-2">
                          {sub.code}
                        </span>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-primary inline">
                          {sub.name}
                        </h3>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-lg shrink-0">
                        {sub.totalMarks} Marks
                      </span>
                    </div>

                    <div className="space-y-2">
                      <strong className="text-xs text-text-primary font-bold uppercase tracking-wider block">Question Paper Pattern:</strong>
                      <p className="text-xs text-text-secondary font-mono bg-bg-primary p-3 rounded-xl border border-border/60 leading-relaxed">
                        {sub.pattern}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <strong className="text-xs text-text-primary font-bold uppercase tracking-wider block">High-Yield Exam Topics:</strong>
                      <ul className="space-y-2 text-xs text-text-secondary">
                        {sub.highYieldTopics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 bg-bg-primary p-2.5 rounded-xl border border-border/60">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: SOLVED UNIVERSITY PYQS & MODEL ANSWERS --- */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Bar */}
          <div className="bg-bg-secondary border border-border rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                value={pyqSearch}
                onChange={(e) => setPyqSearch(e.target.value)}
                placeholder="Search questions, topics, aphorisms, or remedies (e.g. 'Similia', 'Vital Force', 'Aphorism 153', 'MUHS')..."
                className="w-full pl-11 pr-4 py-3 bg-bg-primary rounded-2xl border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-text-primary"
              />
              {pyqSearch && (
                <button
                  onClick={() => setPyqSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary hover:text-text-primary px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                  Subject:
                </label>
                <select
                  value={selectedPyqSubject}
                  onChange={(e) => setSelectedPyqSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none"
                >
                  <option value="All">All Subjects</option>
                  {uniqueSubjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                  University:
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none"
                >
                  <option value="All">All Universities</option>
                  <option value="MUHS">MUHS (Maharashtra)</option>
                  <option value="WBUHS">WBUHS (West Bengal)</option>
                  <option value="RGUHS">RGUHS (Karnataka)</option>
                  <option value="KUHS">KUHS (Kerala)</option>
                  <option value="NCH">NCH Central Pattern</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary block mb-1">
                  Question Marks:
                </label>
                <select
                  value={selectedMarks}
                  onChange={(e) => setSelectedMarks(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-primary border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none"
                >
                  <option value="All">All Marks (5M, 10M, 20M)</option>
                  <option value="5">5 Marks (Short Answer - SAQ)</option>
                  <option value="10">10 Marks (Long Essay - LAQ)</option>
                  <option value="20">20 Marks (Comprehensive LAQ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-text-tertiary px-1">
              <span>Found {filteredPyqs.length} Solved University Questions</span>
              <span>Showing step-by-step model answers</span>
            </div>

            {filteredPyqs.map((pyq) => {
              const isExpanded = expandedPyqId === pyq.id;

              return (
                <div
                  key={pyq.id}
                  className="bg-bg-secondary border border-border rounded-3xl p-5 sm:p-6 space-y-4 hover:border-primary/40 transition-all shadow-sm"
                >
                  {/* Header metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {pyq.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-bg-primary border border-border text-text-secondary">
                        {pyq.subject}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        {pyq.marks} Marks
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{pyq.university} • {pyq.year}</span>
                    </div>
                  </div>

                  {/* Question text */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-text-primary leading-snug">
                      {pyq.question}
                    </h3>
                    <button
                      onClick={() => setExpandedPyqId(isExpanded ? null : pyq.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                        isExpanded
                          ? 'bg-primary text-white'
                          : 'bg-bg-primary text-text-secondary hover:text-primary border border-border'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide Model Answer' : 'View Model Answer'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* High Yield Key Takeaways */}
                  <div className="bg-bg-primary p-3.5 rounded-2xl border border-border/60 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block">
                      Key Scoring Highlights:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-text-secondary">
                      {pyq.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expanded Full Model Answer */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-border space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>Verified University Model Answer (100% Marks Rubric)</span>
                        </span>
                      </div>
                      <div className="bg-bg-primary p-5 rounded-2xl border border-border/80 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans whitespace-pre-line space-y-3">
                        {pyq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredPyqs.length === 0 && (
              <div className="p-12 text-center bg-bg-secondary rounded-3xl border border-border space-y-3">
                <Search className="w-8 h-8 text-text-tertiary mx-auto opacity-50" />
                <h3 className="text-base font-bold text-text-primary">No PYQs match your filter</h3>
                <p className="text-xs text-text-secondary">
                  Try adjusting the university, subject, or search term.
                </p>
                <button
                  onClick={() => {
                    setPyqSearch('');
                    setSelectedPyqSubject('All');
                    setSelectedUniversity('All');
                    setSelectedMarks('All');
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
