import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Activity,
  Droplets,
  Scale,
  BookMarked
} from 'lucide-react';
import SEO from '../components/SEO';

const pharmacyModules = [
  {
    title: "1. Fundamentals & Branches of Pharmacy",
    topics: [
      "Definition, History, Branches (Official, Galenical, Extemporaneous, Industrial Pharmacy)",
      "Sources of Homoeopathic Drugs: Vegetable, Mineral, Animal, Sarcodes, Nosodes, Imponderabilia, Synthetic",
      "Pharmacopoeias: Homoeopathic Pharmacopoeia of India (HPI), HPUS, GHP, British Pharmacopoeia",
      "Standard Lab Instruments & Apparatus: Percolator, Mortar & Pestle, Hydrometer, Pycnometer",
      "Collection of Drug Substances (Seasonal timing, flowering stage, roots, minerals)"
    ]
  },
  {
    title: "2. Vehicles & Potentisation (Dynamisation)",
    topics: [
      "Solid Vehicles: Sugar of Milk (Saccharum Lactis), Globules, Cane Sugar Tablets",
      "Liquid Vehicles: Purified Water, Alcohol (Absolute, Strong, Dispensing Alcohol), Oils",
      "Semi-solid Vehicles: Vaseline, Lanolin, Spermaceti, Prepared Lard",
      "Scale of Potentisation: Decimal (1X, 3X, 6X), Centesimal (1C, 30C, 200C, 1M), 50-Millesimal (LM/0/1 to 0/30)",
      "Process of Trituration (3-stage, 60 minutes rule) & Succussion (10 powerful strokes)"
    ]
  },
  {
    title: "3. Prescription Writing & Posology",
    topics: [
      "Anatomy of a Prescription: Superscription (Rx), Inscription, Subscription, Signatura",
      "Standard Latin Abbreviations: q.s., t.i.d., b.i.d., h.s., stat, p.c., a.c.",
      "Posology: Definition, Selection of Potency (§275–§283), Repeat Dose Rules, Aggravation vs Amelioration",
      "External Applications: Ointments, Liniments, Lotions, Glyceroles, Poultices"
    ]
  },
  {
    title: "4. Quality Control, Legislation & Drug Proving",
    topics: [
      "Drugs and Cosmetics Act & Rules (Schedule M1, Labeling standards, Expiry dates)",
      "Standardization of Mother Tinctures: Dry Crude Material vs Fresh Juice calculations",
      "Drug Proving on Healthy Human Volunteers (§105–§145 of Organon)"
    ]
  }
];

const potencyComparison = [
  { scale: "Decimal Scale (X / D)", ratio: "1 : 9", introducedBy: "Dr. Constantine Hering", symbol: "X or D", example: "6X, 12X, 30X" },
  { scale: "Centesimal Scale (C / CH)", ratio: "1 : 99", introducedBy: "Dr. Samuel Hahnemann (5th Ed Organon)", symbol: "C or CH", example: "30C, 200C, 1M" },
  { scale: "50-Millesimal Scale (LM / Q)", ratio: "1 : 50,000", introducedBy: "Dr. Samuel Hahnemann (6th Ed Organon §270)", symbol: "LM or 0/1", example: "0/1, 0/2, 0/6" }
];

export default function PharmacySubject() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'potency' | 'abbreviations' | 'faqs'>('syllabus');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="Homoeopathic Pharmacy Study Center | Curiva Homoeopathy"
        description="Comprehensive study center for Homoeopathic Pharmacy (1st BHMS). Potentisation scales, Sugar of Milk, HPI pharmacopoeia, and prescription writing."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <FlaskConical className="w-4 h-4 text-amber-400" />
            Subject-Wise Study Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Homoeopathic Pharmacy
          </h1>
          <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
            Master the art and science of preparing, preserving, compounding, and standardizing Homoeopathic medicines from crude natural sources into potentized doses.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/portal/1st-bhms" 
              className="inline-flex items-center gap-2 bg-white text-amber-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-amber-50 transition-all"
            >
              Go to 1st BHMS Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-border pb-4 overflow-x-auto">
        {[
          { id: 'syllabus', label: '1st BHMS Syllabus', icon: FileText },
          { id: 'potency', label: 'Potentisation Scales', icon: Scale },
          { id: 'abbreviations', label: 'Latin Prescription Terms', icon: Layers },
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

      {/* TAB 1: SYLLABUS */}
      {activeTab === 'syllabus' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary">Homoeopathic Pharmacy Syllabus Breakdown</h2>
              <p className="text-xs text-text-secondary">National Commission for Homoeopathy (NCH) 1st BHMS Curriculum</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full">
              1st BHMS Core
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pharmacyModules.map((module, idx) => (
              <div key={idx} className="bg-bg-secondary border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                <h3 className="text-lg font-bold text-primary font-serif">{module.title}</h3>
                <ul className="space-y-2.5 text-xs text-text-secondary">
                  {module.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: POTENTISATION SCALES */}
      {activeTab === 'potency' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Comparison of Potentisation Scales</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-primary font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Scale</th>
                    <th className="py-3 px-4">Medicinal Ratio</th>
                    <th className="py-3 px-4">Introduced By</th>
                    <th className="py-3 px-4">Notation</th>
                    <th className="py-3 px-4">Common Examples</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-text-secondary">
                  {potencyComparison.map((p, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-bold text-text-primary">{p.scale}</td>
                      <td className="py-3 px-4 font-mono">{p.ratio}</td>
                      <td className="py-3 px-4">{p.introducedBy}</td>
                      <td className="py-3 px-4 font-bold text-amber-600">{p.symbol}</td>
                      <td className="py-3 px-4 font-mono">{p.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LATIN ABBREVIATIONS */}
      {activeTab === 'abbreviations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-3">
            <h3 className="font-serif font-bold text-lg text-primary">Prescription Latin Terms</h3>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li className="p-2.5 bg-bg-primary rounded-lg border border-border/60">
                <strong className="text-text-primary font-mono">q.s. (quantum sufficiat)</strong> — As much as is sufficient
              </li>
              <li className="p-2.5 bg-bg-primary rounded-lg border border-border/60">
                <strong className="text-text-primary font-mono">t.i.d. (ter in die)</strong> — Three times a day
              </li>
              <li className="p-2.5 bg-bg-primary rounded-lg border border-border/60">
                <strong className="text-text-primary font-mono">b.i.d. (bis in die)</strong> — Twice a day
              </li>
              <li className="p-2.5 bg-bg-primary rounded-lg border border-border/60">
                <strong className="text-text-primary font-mono">h.s. (hora somni)</strong> — At bedtime
              </li>
              <li className="p-2.5 bg-bg-primary rounded-lg border border-border/60">
                <strong className="text-text-primary font-mono">stat (statim)</strong> — Immediately
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: FAQS */}
      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Standard Textbooks for Pharmacy
            </h3>
            <ul className="space-y-3 text-xs text-text-secondary">
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">A Text Book of Homoeopathic Pharmacy</strong>
                By Dr. Sumit Goel — Preferred textbook for 1st BHMS university examinations.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Homoeopathic Pharmacopoeia of India (HPI)</strong>
                Published by Ministry of AYUSH, Govt of India — Official legal standard for raw materials and potencies.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
