import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Bookmark, 
  HelpCircle, 
  ChevronRight,
  FileText,
  Layers,
  Activity,
  Flame,
  Clock,
  BookMarked
} from 'lucide-react';
import SEO from '../components/SEO';

const materiaMedicaModules = [
  {
    title: "1. Fundamentals of Homoeopathic Materia Medica",
    topics: [
      "Definition, Nature, Scope and Limitations of Homoeopathic Materia Medica",
      "Sources of Homoeopathic Drugs (Plant, Mineral, Animal, Sarcodes, Nosodes, Imponderabilia)",
      "Concept of Drug Proving on Healthy Human Beings (§105–§145)",
      "Types of Materia Medica: Schema (Hering/Allen), Comparative (Farrington), Physiological (Hughes), Keynote (Guernsey)",
      "Primary and Secondary Actions of Remedies (§63–§67)"
    ]
  },
  {
    title: "2. Major Polychrest Remedies (High Yield)",
    topics: [
      "Sulphur - King of Psora, Standing Action, Thermal Aversion, Keynotes & Modalities",
      "Nux Vomica - Modern Sedentary Hypochondriac, Hypersensitivity, Ineffectual Urging",
      "Pulsatilla Nigricans - Chilly/Thirstless, Yielding Disposition, Changeable Symptoms",
      "Lachesis Mutus - Left-sided Remedy, Insecurity, Loquacity, Intolerance of Tight Bandages",
      "Lycopodium Clavatum - Right to Left, Anticipatory Anxiety, 4–8 PM Aggravation",
      "Calcarea Carbonica - Leukophlegmatic Constitution, Head Sweats, Cold Damp Feet"
    ]
  },
  {
    title: "3. Group Study of Remedies (Systemic Classification)",
    topics: [
      "Carbon Group (Calc-c, Carbo-v, Graphites) - Sluggishness, Malnutrition, Venous Stasis",
      "Kali Group (Kali-c, Kali-bi, Kali-p) - Rigidity, Sharp Stitching Pains, Loyalty",
      "Acid Group (Nit-ac, Ph-ac, Sulph-ac) - Debility, Exhaustion, Hemorrhagic Tendency",
      "Ophidia Group (Lachesis, Crotalus, Naja) - Sepsis, Blood Decomposition, Nervous Excitement",
      "Loganiaceae Family (Nux-v, Ignatia, Spigelia) - Spinal Reflex Irritability, Convulsions"
    ]
  },
  {
    title: "4. Comparative Materia Medica Matrix",
    topics: [
      "Thirstless remedies in Fever: Pulsatilla vs Apis vs Gelsemium vs Antim-tart",
      "Right-sided vs Left-sided Remedies: Lycopodium vs Lachesis vs Belladonna",
      "Thermal Generalities: Chilly vs Hot Remedy Classification Matrix",
      "Grief and Emotional Shock: Ignatia vs Natrum Mur vs Phosphoric Acid",
      "Restlessness Comparison: Arsenicum Album vs Rhus Tox vs Aconitum Napellus"
    ]
  }
];

const keyPolychrests = [
  { id: "sulphur", name: "Sulphur", family: "Mineral", temperament: "Philosophical, Ragged Philosopher", thermal: "Hot", key: "Burning sensations everywhere, standing is the worst position, dirty skin." },
  { id: "nux-vomica", name: "Nux Vomica", family: "Plant", temperament: "Irritable, Ambitious, Over-sensitive", thermal: "Chilly", key: "Involuntary urging for stool, stomach distress from spicy food & alcohol." },
  { id: "pulsatilla", name: "Pulsatilla", family: "Plant", temperament: "Mild, Weeping, Changeable", thermal: "Hot", key: "Thirstlessness with all complaints, relief in open fresh air." },
  { id: "lycopodium", name: "Lycopodium", family: "Plant", temperament: "Intellectual, Lack of Self-confidence", thermal: "Chilly", key: "Right to left progression, 4-8 PM aggravation, excessive flatulence." },
  { id: "arsenicum", name: "Arsenicum Album", family: "Mineral", temperament: "Anxious, Fastidious, Restless", thermal: "Chilly", key: "Prostration out of proportion to disease, burning pains relieved by heat." },
  { id: "lachesis", name: "Lachesis", family: "Animal", temperament: "Loquacious, Jealous, Suspicious", thermal: "Hot", key: "Left-sided, cannot bear anything tight around neck/waist, better after discharges." }
];

const faqs = [
  {
    q: "How is Homoeopathic Materia Medica constructed?",
    a: "Homoeopathic Materia Medica is constructed primarily through Drug Provings on healthy human volunteers (§105-§145 of Organon), toxicological records of accidental poisonings, clinical verifications from cured cases, and empirical observation by stalwarts."
  },
  {
    q: "What is the difference between Keynotes and Synthetic Materia Medica?",
    a: "Keynotes (such as H.C. Allen's Keynotes) focus on rare, striking, characteristic symptoms that immediately point to a remedy. Synthetic Materia Medica (like Farrington or Kent) synthesizes physiological action, constitutional types, and miasmatic linkages."
  },
  {
    q: "How should BHMS students prepare Materia Medica for University Exams?",
    a: "Students should structure remedy notes under standard heads: Common Name, Family, Prover, Miasmatic Cleavage, Guiding Symptoms, Mind, Head-to-Toe Schema, Modalities (Better/Worse), and Clinical Indications."
  }
];

export default function MateriaMedicaSubject() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'syllabus' | 'polychrests' | 'comparative' | 'references'>('syllabus');

  const filteredRemedies = keyPolychrests.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.temperament.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="Materia Medica Study Center | Curiva Homoeopathy"
        description="Comprehensive study center for Homoeopathic Materia Medica. NCH syllabus breakdown, drug provings, Allen's keynotes, Boericke notes, and comparative remedy matrix."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Subject-Wise Study Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Homoeopathic Materia Medica
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Master the vast catalog of pure drug provings, Allen&apos;s keynotes, Boericke&apos;s clinical observations, and constitutional remedy archetypes mapped to NCH BHMS competency guidelines.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/materia-medica" 
              className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-50 transition-all"
            >
              Search Full Materia Medica Index
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/analysis" 
              className="inline-flex items-center gap-2 bg-emerald-700/50 text-white border border-emerald-400/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all"
            >
              Comparative Remedy Matrix
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-border pb-4 overflow-x-auto">
        {[
          { id: 'syllabus', label: 'NCH Syllabus & Modules', icon: FileText },
          { id: 'polychrests', label: 'Key Polychrests Index', icon: Sparkles },
          { id: 'comparative', label: 'Comparative Study', icon: Layers },
          { id: 'references', label: 'Standard Textbooks & FAQs', icon: BookMarked }
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
              <h2 className="text-2xl font-serif font-bold text-text-primary">Curriculum Structure & Academic Modules</h2>
              <p className="text-xs text-text-secondary">National Commission for Homoeopathy (NCH) Competency Based Syllabus</p>
            </div>
            <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
              1st to 4th BHMS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materiaMedicaModules.map((module, idx) => (
              <div key={idx} className="bg-bg-secondary border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                <h3 className="text-lg font-bold text-primary font-serif">{module.title}</h3>
                <ul className="space-y-2.5 text-xs text-text-secondary">
                  {module.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: POLYCHRESTS */}
      {activeTab === 'polychrests' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">High-Yield Polychrest Remedy Quick-Cards</h2>
              <p className="text-xs text-text-secondary">Core remedies required for BHMS exams and clinical practice</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input 
                type="text" 
                placeholder="Search remedy or symptom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRemedies.map(remedy => (
              <div key={remedy.id} className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4 hover:border-primary/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-lg uppercase tracking-wider">
                      {remedy.family}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${remedy.thermal === 'Hot' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                      {remedy.thermal}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-text-primary">{remedy.name}</h3>
                  <p className="text-xs text-text-secondary italic">
                    <strong className="not-italic text-text-primary">Temperament:</strong> {remedy.temperament}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed bg-bg-primary p-3 rounded-xl border border-border/50">
                    <strong className="text-primary font-bold">Keynote:</strong> {remedy.key}
                  </p>
                </div>
                <Link 
                  to={`/materia-medica/${remedy.id}`} 
                  className="inline-flex items-center justify-center gap-2 w-full py-2 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-dark transition-all mt-4"
                >
                  View Full Remedy Profile
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: COMPARATIVE */}
      {activeTab === 'comparative' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Comparative Remedy Study Matrix</h2>
            <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
              In Homoeopathy, differentiating closely related remedies (sister remedies or thermal opposites) is essential for accurate prescribing. Below are classic comparative parameters commonly asked in viva and competitive exams.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-primary font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Condition / State</th>
                    <th className="py-3 px-4">Remedy A</th>
                    <th className="py-3 px-4">Remedy B</th>
                    <th className="py-3 px-4">Key Differential Feature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  <tr>
                    <td className="py-3 px-4 font-bold text-text-primary">Acute Fever Restlessness</td>
                    <td className="py-3 px-4 font-semibold text-rose-600">Aconitum Napellus</td>
                    <td className="py-3 px-4 font-semibold text-amber-600">Arsenicum Album</td>
                    <td className="py-3 px-4">Aconite: Sudden onset from cold wind, extreme fear of death. Arsenic: Restlessness from exhaustion, midnight aggravation.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-text-primary">Grief & Mental Shock</td>
                    <td className="py-3 px-4 font-semibold text-purple-600">Ignatia Amara</td>
                    <td className="py-3 px-4 font-semibold text-teal-600">Natrum Muriaticum</td>
                    <td className="py-3 px-4">Ignatia: Recent acute grief, sighing, hysterical mood swings. Natrum Mur: Chronic silent grief, consolation aggravates.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-text-primary">Sprains & Injuries</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">Arnica Montana</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">Rhus Toxicodendron</td>
                    <td className="py-3 px-4">Arnica: Sore bruised feeling, says &quot;I am well&quot;. Rhus Tox: Joint stiffness, better by continued motion.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: REFERENCES & FAQS */}
      {activeTab === 'references' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {/* Reference Books */}
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Standard Reference Textbooks
            </h3>
            <ul className="space-y-3 text-xs text-text-secondary">
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Keynotes & Characteristics</strong>
                By Dr. H.C. Allen — Essential for BHMS students & competitive entrance preparation.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Pocket Manual of Homoeopathic Materia Medica</strong>
                By Dr. William Boericke — Authoritative clinical Materia Medica and Repertory index.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Lectures on Homoeopathic Materia Medica</strong>
                By Dr. J.T. Kent — Constitutional drug pictures, thermal generalities, and mind symptoms.
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-3.5 bg-bg-primary rounded-xl border border-border/60 space-y-1.5">
                  <h4 className="font-bold text-xs text-text-primary">{faq.q}</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
