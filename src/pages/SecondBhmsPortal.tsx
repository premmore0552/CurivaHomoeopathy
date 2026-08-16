import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Microscope, 
  ShieldAlert, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Award,
  Stethoscope,
  Scissors,
  Baby,
  BookMarked
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SecondBhmsPortal() {
  const secondYearSubjects = [
    {
      code: "HomUG-Path-M",
      title: "Pathology & Microbiology",
      description: "General Pathology, Systemic Pathology, Bacteriology, Virology, Parasitology, Mycology & Clinical Pathology Laboratory diagnostics.",
      theoryHours: 200,
      nonLectureHours: 80,
      totalHours: 280,
      examType: "Final University Exam (2 Papers)",
      marks: "400 Marks (200M Theory + 80M Practical + 100M Viva + 20M IA)",
      badge: "University Exam Subject",
      badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      icon: Microscope,
      iconColor: "p-3 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
      link: "/subject/pathology",
      topics: [
        "Cell Injury, Inflammation, Repair, Hemodynamic Disorders & Neoplasia",
        "Systemic Pathology (CVS, RS, GIT, Liver, Renal, Reproductive, Blood)",
        "General Microbiology, Sterilization, Culture Media & Staining",
        "Gram +ve/-ve Bacteria, Acid Fast Bacilli, Spirochaetes & Mycology",
        "Protozoa, Helminths, DNA/RNA Viruses & Emerging Infections",
        "CBC Analysis, LFT, RFT, Stool/Urine Microscopy & Histopathology"
      ]
    },
    {
      code: "HomUG-FMT",
      title: "Forensic Medicine & Toxicology",
      description: "Medical Jurisprudence, Thanatology, Injuries, Autopsy, Forensic Psychiatry, Toxicology, Legal Acts (Bhartiya Nyaya Sanhita) & Homoeopathic Antidotes.",
      theoryHours: 120,
      nonLectureHours: 50,
      totalHours: 170,
      examType: "Final University Exam (1 Paper)",
      marks: "200 Marks (100M Theory + 50M Practical + 40M Viva + 10M IA)",
      badge: "University Exam Subject",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      icon: ShieldAlert,
      iconColor: "p-3 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      link: "/subject/forensic-medicine",
      topics: [
        "Medical Ethics, Professional Misconduct, Negligence & Code of Ethics",
        "Legal Procedures, Inquests, Courts, Evidence & Dying Declaration",
        "Thanatology: Somatic/Molecular Death, Post-Mortem Changes & Autopsy",
        "Mechanical, Thermal, Firearm & Regional Injuries, Ballistics",
        "Forensic Psychiatry, Delusions, Illusions, Hallucinations & Mental Health Act",
        "General & Clinical Toxicology (Corrosives, Irritants, Neurotics, Antidotes)"
      ]
    },
    {
      code: "HomUG-HMM-II",
      title: "Homoeopathic Materia Medica - II",
      description: "Comprehensive drug pictures of 48 polychrest & clinical remedies integrated with Pathology, Toxicology, Surgery, ObGyn, and comparative analysis.",
      theoryHours: 150,
      nonLectureHours: 100,
      totalHours: 250,
      examType: "Final University Exam (1 Paper)",
      marks: "200 Marks (100M Theory + 50M Practical + 40M Viva + 10M IA)",
      badge: "University Exam Subject",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      icon: BookOpen,
      iconColor: "p-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
      link: "/subject/materia-medica",
      topics: [
        "48 Core Remedies (Acetic Acid to Veratrum Album)",
        "Term I (22 Remedies) & Term II (26 Remedies) Distribution",
        "Constitutional Pictures, Temperaments, Keynotes & Modalities",
        "Pathological Correlations & Organ Affinities",
        "Comparative Drug Study & Remedy Relationships",
        "Doctrine of Signatures & Clinical Therapeutics"
      ]
    },
    {
      code: "HomUG-OM-II",
      title: "Organon of Medicine - II",
      description: "Hahnemannian philosophy (§28–§104), Therapeutic Law of Nature, Classification of Diseases, Miasms, Case Taking, Systems of Medicine & Suppression.",
      theoryHours: 150,
      nonLectureHours: 100,
      totalHours: 250,
      examType: "Final University Exam (1 Paper)",
      marks: "200 Marks (100M Theory + 50M Practical + 40M Viva + 10M IA)",
      badge: "University Exam Subject",
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      icon: Layers,
      iconColor: "p-3 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
      link: "/subject/organon",
      topics: [
        "Natural vs Artificial Disease (§28–33) & Therapeutic Law (§34–51)",
        "Hahnemannian Classification of Diseases & Miasms (§71–82)",
        "Homoeopathic Case Taking Principles & Guidelines (§83–103)",
        "Record Keeping (§104) & Systems of Medicine (§52–70)",
        "Symptomatology, Analysis, Evaluation & Totality Construction",
        "Causation, Individuality, Anamnesis, Disease Progress & Suppression"
      ]
    },
    {
      code: "HomUG-R-II",
      title: "Homoeopathic Repertory & Case Taking - II",
      description: "Structure, plan & rubric hunting in Boericke's Repertory, acute/chronic case taking, pathology representation in Kent & Boericke, and miasmatic rubrics.",
      theoryHours: 50,
      nonLectureHours: 30,
      totalHours: 80,
      examType: "Internal Assessment (PA & TT)",
      marks: "Marks integrated into 3rd BHMS University Examination",
      badge: "Clinical Internal Assessment",
      badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      icon: BookMarked,
      iconColor: "p-3 bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
      link: "/subject/repertory",
      topics: [
        "Case Taking Instructions in Acute & Chronic Diseases (§83–103)",
        "Introduction to Boericke's Repertory: Structure, Plan & Rubric Hunting",
        "Pathology & Pathogenesis Representation in Boericke & Kent",
        "Miasms, Constitution, Diathesis & Susceptibility in Repertory Rubrics",
        "Practical Rubric Searching & Clinical Case Totality Construction"
      ]
    },
    {
      code: "HomUG PM-I",
      title: "Practice of Medicine - I",
      description: "Clinico-pathological evaluation of common signs/symptoms, Immunity & Susceptibility, Medical Genetics, and 35 Infectious/Tropical diseases with Therapeutics.",
      theoryHours: 80,
      nonLectureHours: 24,
      totalHours: 104,
      examType: "Internal Assessment (PA & TT)",
      marks: "Marks integrated into 4th BHMS University Examination",
      badge: "Clinical Internal Assessment",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      icon: Stethoscope,
      iconColor: "p-3 bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
      link: "/subject/practice-of-medicine",
      topics: [
        "Clinico-Pathological Evaluation: Pain, Fever, Neurological, Respiratory, GIT, Renal, Hematology",
        "Immunity & Susceptibility: Primary/Secondary Immunodeficiency, Hypersensitivity I-IV, Autoimmunity",
        "Medical Genetics: Down's, Turner's, Klinefelter's, Cystic Fibrosis, Huntington's, Marfan's, PKD",
        "35 Infectious Diseases: Typhoid, Dengue, COVID-19, Malaria, TB, Cholera, Rabies, Measles, H1N1",
        "Bedside History Taking, Physical Examinations & Homoeopathic Therapeutics"
      ]
    },
    {
      code: "HomUG-Sur-I",
      title: "Surgery - I",
      description: "General Surgery principles, Trauma, Head/Chest/Abdominal Injuries, Wound Healing, Shock, Fluids, Burns, Infections, Tumours, Hernias & Ulcers.",
      theoryHours: 92,
      nonLectureHours: 24,
      totalHours: 116,
      examType: "Internal Assessment (PA & TT)",
      marks: "Marks integrated into 3rd BHMS University Examination",
      badge: "Clinical Internal Assessment",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      icon: Scissors,
      iconColor: "p-3 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
      link: "/subject/surgery",
      topics: [
        "Trauma & Emergency Care: RTA, Head Injury (GCS), Chest & Abdominal Blunt Trauma",
        "Wounds, Healing Phases, Surgical Site Infections, Suturing & Wound Dressing",
        "Haemorrhage, Blood Transfusion, Shock Types & Fluid/Electrolyte Balance",
        "Burns (Rule of Nines), Skin Grafting, Nutrition in Surgical Patients",
        "Common & Special Surgical Infections: Boil, Carbuncle, Abscess, Cellulitis, TB, Syphilis, Gangrene",
        "Tumours (Benign/Malignant), Cysts, Hernias (Inguinal, Femoral, Umbilical), Ulcers, Sinus & Fistula"
      ]
    },
    {
      code: "HomUG-ObGy-I",
      title: "Gynaecology & Obstetrics - I",
      description: "Applied Anatomy & Physiology, Menstrual Disorders, AUB, Menopause, Displacements, Intersexuality, Pregnancy Diagnosis, Antenatal Care & Normal Labour.",
      theoryHours: 100,
      nonLectureHours: 24,
      totalHours: 124,
      examType: "Internal Assessment (PA & TT)",
      marks: "Marks integrated into 3rd BHMS University Examination",
      badge: "Clinical Internal Assessment",
      badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      icon: Baby,
      iconColor: "p-3 bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      link: "/subject/gynecology-obstetrics",
      topics: [
        "Unit 1 Gynaecology: Applied Anatomy, Developmental Anomalies, HPO Axis, Puberty & Menstruation",
        "Amenorrhea, Dysmenorrhea, AUB, Postmenopausal Bleeding, Menopause & Uterine Displacements",
        "Unit 2 Obstetrics: Gametogenesis, Fertilization, Placenta, Foetal Circulation & Foetal Skull",
        "Diagnosis of Pregnancy, Physiological Changes, Antenatal Care & Common Ailments",
        "Normal Labour: Causes of Onset, Stages I-IV, Mechanism, Episiotomy & Homoeopathic Management",
        "Postnatal/Puerperal Care, Newborn Assessment (APGAR Score) & Homoeopathic Therapeutics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="2nd BHMS Academic Portal | Curiva Homoeopathy"
        description="Dedicated academic portal for 2nd BHMS students based on NCH CBDC syllabus. Pathology & Microbiology, FMT, Materia Medica, Organon, Repertory, Practice of Medicine, Surgery, and ObGyn."
      />

      <Breadcrumbs />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-950 via-rose-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-red-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <GraduationCap className="w-4 h-4 text-red-400" />
            National Commission for Homoeopathy (NCH) CBDC Manual
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            2nd Professional BHMS Academic Portal
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            The official Competency Based Dynamic Curriculum (CBDC) hub for 2nd BHMS students. Master Pathology & Microbiology, Forensic Medicine & Toxicology, 48 Materia Medica remedies, Organon miasmatic philosophy, Repertory Boericke analysis, Practice of Medicine I, Surgery I, and Gynaecology & Obstetrics I.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xl font-bold text-white">8 Subjects</div>
              <div className="text-[10px] text-red-200 uppercase font-semibold">NCH CBDC Syllabus</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xl font-bold text-white">992 Hours</div>
              <div className="text-[10px] text-red-200 uppercase font-semibold">Total Teaching Hours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xl font-bold text-white">48 Remedies</div>
              <div className="text-[10px] text-red-200 uppercase font-semibold">HMM-II Catalog</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xl font-bold text-white">4 University Exams</div>
              <div className="text-[10px] text-red-200 uppercase font-semibold">4 Clinical IA Subjects</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/cbdc-syllabus" 
              className="inline-flex items-center gap-2 bg-white text-red-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-red-50 transition-all"
            >
              Explore Full CBDC Syllabus Map
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/student-resources" 
              className="inline-flex items-center gap-2 bg-red-800/50 text-white border border-red-400/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-800 transition-all"
            >
              2nd BHMS Solved PYQs & Blueprints
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-3 text-xs sm:text-sm text-text-primary leading-relaxed">
        <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
            Official NCH CBDC Assessment Rule for 2nd Professional BHMS:
          </strong>
          In the 2nd BHMS curriculum, <strong>Pathology & Microbiology (HomUG-Path-M)</strong>, <strong>Forensic Medicine & Toxicology (HomUG-FMT)</strong>, <strong>Homoeopathic Materia Medica - II (HomUG-HMM-II)</strong>, and <strong>Organon of Medicine - II (HomUG-OM-II)</strong> undergo Final University Examinations (FUE). Clinical subjects—<strong>Repertory - II</strong>, <strong>Practice of Medicine - I</strong>, <strong>Surgery - I</strong>, and <strong>Gynaecology & Obstetrics - I</strong>—are assessed via continuous Periodical Assessments (PA) and Terminal Tests (TT), with their cumulative marks integrated into 3rd / 4th BHMS University Examinations.
        </div>
      </div>

      {/* 8 CBDC Subjects Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-text-primary">2nd BHMS Subject Modules</h2>
            <p className="text-xs text-text-secondary">Complete competency-mapped syllabus across all 8 Professional Courses</p>
          </div>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit">
            Batch 2022-2023 Onwards
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondYearSubjects.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <div 
                key={idx} 
                className="bg-bg-secondary border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={sub.iconColor + " rounded-2xl shrink-0"}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block font-bold">
                          {sub.code}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-text-primary">{sub.title}</h3>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${sub.badgeColor} shrink-0`}>
                      {sub.badge}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {sub.description}
                  </p>

                  {/* Hours & Marks */}
                  <div className="grid grid-cols-3 gap-2 bg-bg-primary p-3 rounded-2xl border border-border/60 text-center text-xs">
                    <div>
                      <div className="text-text-tertiary text-[10px] uppercase font-bold">Theory</div>
                      <div className="font-bold text-text-primary">{sub.theoryHours} hrs</div>
                    </div>
                    <div>
                      <div className="text-text-tertiary text-[10px] uppercase font-bold">Practical/Non-Lec</div>
                      <div className="font-bold text-text-primary">{sub.nonLectureHours} hrs</div>
                    </div>
                    <div>
                      <div className="text-text-tertiary text-[10px] uppercase font-bold">Total Hours</div>
                      <div className="font-bold text-primary">{sub.totalHours} hrs</div>
                    </div>
                  </div>

                  {/* Core Topics Checklist */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                      Key Competency Syllabus Topics:
                    </div>
                    <ul className="space-y-1.5 text-xs text-text-secondary">
                      {sub.topics.map((top, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-text-tertiary font-medium">
                    {sub.marks}
                  </span>
                  <Link 
                    to={sub.link} 
                    className="inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:underline bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl transition-all"
                  >
                    Open Subject Hub <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

