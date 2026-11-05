import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Activity,
  Cpu,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import SEO from '../components/SEO';

const repertoryModules = [
  {
    title: "1. Fundamentals of Homoeopathic Repertory",
    topics: [
      "Definition, History, Philosophy, Evolution, and Scope of Repertory",
      "Need for Repertory in Homoeopathic Practice (§104, §153 of Organon)",
      "Classification of Repertories: Logic-based, Puriform, Concordance, Clinical, Card Repertories",
      "Symptom Hierarchy: General (Mental/Physical), Particular, Characteristic, Elimination Symptoms",
      "Remedy Gradations: 1st Grade (3 marks), 2nd Grade (2 marks), 3rd Grade (1 mark)"
    ]
  },
  {
    title: "2. Kent's Repertory (Detailed Study)",
    topics: [
      "Philosophical Background: Deduction from General to Particulars (Deductive Logic)",
      "Plan and Construction: 37 Chapters starting from Mind to Generalities",
      "Rubric Arrangement: Main Rubric -> Sub-rubric -> Sub-sub-rubric -> Modalities & Time",
      "Cross-references and Synonyms",
      "Methods of Repertorization: Totality Method, Eliminating Method, Synthesis Method"
    ]
  },
  {
    title: "3. Boenninghausen & Boger Repertories",
    topics: [
      "Boenninghausen's Therapeutic Pocket Book (TPB): Inductive Logic, Doctrine of Analogy & Concomitants",
      "7 Sections of TPB: Mind, Parts of Body, Sensations, Sleep, Fever, Modalities, Concordances",
      "Boger-Boenninghausen's Characteristics and Repertory (BBCR): Pathological Cleavage, Tissue Affinities",
      "Boger's Synoptic Key: Time Modalities, Regional Aggravation, Moon Phases"
    ]
  },
  {
    title: "4. Computerized & Modern Digital Repertories",
    topics: [
      "Evolution from Manual Cards to Digital Algorithms (RadarOpus, MacRepertory, Hompath)",
      "Interactive Symptom Checker & Repertorization Tools on Curiva",
      "AI-driven Repertorization: Combining Miasmatic Weights with Kentian Rubrics"
    ]
  }
];

const sampleRubrics = [
  { rubric: "MIND - ANXIETY - future, about", chapter: "Mind", remedies: "Ars, Bry, Caust, Chel, Dig, Phos, Psor" },
  { rubric: "MIND - FEAR - death, of", chapter: "Mind", remedies: "ACON, ARS, Calc, Nit-ac, Plat, Sec" },
  { rubric: "HEAD - PAIN - Sun, from exposure to", chapter: "Head", remedies: "GLON, LACH, NAT-M, Bell, Gels, Puls" },
  { rubric: "STOMACH - DESIRE - Sweets", chapter: "Stomach", remedies: "ARG-N, LYC, SULPH, Calc, China, Ign" },
  { rubric: "RESPIRATION - ASTHMATIC - 2-3 a.m.", chapter: "Respiration", remedies: "ARS, KALI-C, Samb, Spong, Nat-s" },
  { rubric: "GENERALITIES - MOTION - amel.", chapter: "Generalities", remedies: "RHUS-T, FERR, PULS, Dulc, Rhod" }
];

export default function RepertorySubject() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'rubrics' | 'comparison' | 'faqs'>('syllabus');

  const filteredRubrics = sampleRubrics.filter(r => 
    r.rubric.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.remedies.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="Repertory Study Center | Curiva Homoeopathy"
        description="Master Homoeopathic Repertory for BHMS & competitive exams. Kent Repertory, TPB, BBCR, rubric searching, and computer repertorization."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Compass className="w-4 h-4 text-blue-400" />
            Subject-Wise Study Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Homoeopathic Repertory & Case Logic
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Understand the index of symptoms, Kent&apos;s 37 chapters, Boenninghausen&apos;s concomitants, Boger&apos;s tissue affinities, and mathematical repertorization algorithms.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/symptom-checker" 
              className="inline-flex items-center gap-2 bg-white text-blue-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-50 transition-all"
            >
              Launch Interactive Repertory Tool
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/repertory" 
              className="inline-flex items-center gap-2 bg-blue-800/50 text-white border border-blue-400/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all"
            >
              Search Kent Rubrics
            </Link>
            <Link
              to="/repertory/boericke"
              className="inline-flex items-center gap-2 bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-amber-200 transition-all"
            >
              Open Boericke Repertory Index
              <BookMarked className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-border pb-4 overflow-x-auto">
        {[
          { id: 'syllabus', label: 'NCH Syllabus & Modules', icon: FileText },
          { id: 'rubrics', label: 'Classic Rubrics Explorer', icon: Search },
          { id: 'comparison', label: 'Kent vs TPB vs BBCR', icon: Layers },
          { id: 'faqs', label: 'Reference Books & FAQs', icon: HelpCircle }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:bg-primary/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: SYLLABUS */}
      {activeTab === 'syllabus' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">Repertory Academic Curriculum</h2>
              <p className="text-xs text-text-secondary">National Commission for Homoeopathy (NCH) Guidelines (3rd & 4th BHMS)</p>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
              3rd & 4th BHMS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repertoryModules.map((module, idx) => (
              <div key={idx} className="bg-bg-secondary border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                <h3 className="text-lg font-bold text-primary font-serif">{module.title}</h3>
                <ul className="space-y-2.5 text-xs text-text-secondary">
                  {module.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: RUBRICS */}
      {activeTab === 'rubrics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">High-Yield Kentian Rubrics Index</h2>
              <p className="text-xs text-text-secondary">Frequently tested rubrics with 1st and 2nd grade remedy representation</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input 
                type="text" 
                placeholder="Search rubric, chapter or remedy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRubrics.map((item, idx) => (
              <div key={idx} className="bg-bg-secondary border border-border rounded-2xl p-5 space-y-3 hover:border-primary/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded uppercase">
                    Chapter: {item.chapter}
                  </span>
                </div>
                <h3 className="font-mono font-bold text-sm text-text-primary">{item.rubric}</h3>
                <div className="bg-bg-primary p-3 rounded-xl border border-border/60 text-xs">
                  <strong className="text-primary font-bold block mb-1">Key Candidate Remedies:</strong>
                  <span className="text-text-secondary font-mono leading-relaxed">{item.remedies}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Comparative Analysis: Kent vs TPB vs BBCR</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-primary font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4">Kent&apos;s Repertory</th>
                    <th className="py-3 px-4">TPB (Boenninghausen)</th>
                    <th className="py-3 px-4">BBCR (Boger)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="py-3 px-4 font-bold text-text-primary">Philosophical Basis</td>
                    <td className="py-3 px-4">Deductive Logic (General to Particular)</td>
                    <td className="py-3 px-4">Inductive Logic & Doctrine of Analogy</td>
                    <td className="py-3 px-4">Pathological Cleavage & Tissue Affinity</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-text-primary">Primary Focus</td>
                    <td className="py-3 px-4">Mental Generals & Physical Generals</td>
                    <td className="py-3 px-4">Complete Symptom & Concomitants</td>
                    <td className="py-3 px-4">Tissue changes, Pathology, Modalities</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-text-primary">Gradation System</td>
                    <td className="py-3 px-4">3 Grades (BOLD, Italics, Roman)</td>
                    <td className="py-3 px-4">5 Grades (CAPS, Bold, Italics, Roman, Parenthesis)</td>
                    <td className="py-3 px-4">5 Grades</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: FAQS */}
      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Standard Repertory Textbooks
            </h3>
            <ul className="space-y-3 text-xs text-text-secondary">
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Repertory of the Homoeopathic Materia Medica</strong>
                By Dr. J.T. Kent — Standard reference for university exams and general practice.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Therapeutic Pocket Book</strong>
                By Dr. Boenninghausen — Masterpiece on complete symptoms and concomitants.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Fundamentals of Homoeopathic Repertory</strong>
                By Dr. B.K. Sarkar — Theoretical handbook covering history and comparative logic.
              </li>
            </ul>
          </div>

          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Repertory Exam FAQs
            </h3>
            <div className="space-y-3 text-xs text-text-secondary">
              <div className="p-3 bg-bg-primary rounded-xl border border-border/60 space-y-1">
                <strong className="text-text-primary block">What is an Eliminating Symptom?</strong>
                A prominent, well-marked general symptom (e.g., &quot;Better in open cold air&quot;) used to filter out all remedies that do not possess that modality before calculating totality.
              </div>
              <div className="p-3 bg-bg-primary rounded-xl border border-border/60 space-y-1">
                <strong className="text-text-primary block">What is a Concomitant Symptom?</strong>
                A symptom occurring simultaneously with the chief complaint without any direct physiological or anatomical relation (e.g., severe headache accompanied by profuse urination).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
