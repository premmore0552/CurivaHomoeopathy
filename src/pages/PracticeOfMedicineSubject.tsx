import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Activity,
  HeartPulse,
  BookMarked
} from 'lucide-react';
import SEO from '../components/SEO';

const pomModules = [
  {
    title: "1. Respiratory, Cardiovascular & GI Medicine",
    topics: [
      "Respiratory: Asthma, Chronic Bronchitis, Emphysema, Bronchiectasis, Pneumonia, Pleural Effusion, Pulmonary TB",
      "Cardiovascular: Hypertension, Ischemic Heart Disease (Angina/MI), Rheumatic Fever, Infective Endocarditis, Heart Failure",
      "Gastrointestinal: GERD, Peptic Ulcer Disease, Inflammatory Bowel Disease (Ulcerative Colitis, Crohn's), Cirrhosis of Liver, Jaundice"
    ]
  },
  {
    title: "2. Renal, Neurological, Endocrine & Dermatology",
    topics: [
      "Renal: Acute Kidney Injury (AKI), Chronic Kidney Disease (CKD), Glomerulonephritis, Nephrotic Syndrome, UTI",
      "Neurology: Cerebrovascular Accident (Stroke), Epilepsy, Parkinsonism, Meningitis, Peripheral Neuropathies",
      "Endocrinology & Metabolism: Diabetes Mellitus (Type 1 & 2), Thyroid Disorders (Hypo/Hyper), Gout, Obesity",
      "Dermatology: Eczema, Psoriasis, Urticaria, Acne Vulgaris, Fungal Infections, Vitiligo, Lichen Planus"
    ]
  },
  {
    title: "3. Tropical Diseases, Infectious Fevers & Psychiatry",
    topics: [
      "Infectious Fevers: Typhoid, Malaria, Dengue, Chickungunya, Influenza, Measles, Mumps, Chickenpox",
      "Psychiatry: Depression, Anxiety Disorders, OCD, Schizophrenia, Bipolar Affective Disorder, Somatoform Disorders"
    ]
  },
  {
    title: "4. Homoeopathic Clinical Therapeutics & Miasmatic Prescribing",
    topics: [
      "Miasmatic Diagnosis in Disease: Identifying dominant active miasm (Psora, Sycosis, Syphilis, Tubercular)",
      "Acute vs Chronic Prescribing Rules (§172–§209 of Organon)",
      "Potency Selection Guidelines based on Susceptibility, Age, Pathology & Miasmatic depth"
    ]
  }
];

export default function PracticeOfMedicineSubject() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'therapeutics' | 'faqs'>('syllabus');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="Practice of Medicine Study Center | Curiva Homoeopathy"
        description="Comprehensive Practice of Medicine study center for 4th BHMS & Final Year. Internal medicine, system-wise diagnostics, and Homoeopathic therapeutics."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            Subject-Wise Study Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Practice of Medicine & Homoeopathic Therapeutics
          </h1>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Master internal medicine clinical examination, system-wise clinical diagnostics, and individualized Homoeopathic therapeutics for acute and chronic systemic diseases.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/clinical-guides" 
              className="inline-flex items-center gap-2 bg-white text-emerald-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-50 transition-all"
            >
              Explore Disease & Clinical Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/portal/4th-bhms" 
              className="inline-flex items-center gap-2 bg-emerald-800/50 text-white border border-emerald-400/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-800 transition-all"
            >
              4th BHMS Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-border pb-4 overflow-x-auto">
        {[
          { id: 'syllabus', label: '4th BHMS Syllabus', icon: FileText },
          { id: 'therapeutics', label: 'Systemic Therapeutics', icon: Activity },
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
              <h2 className="text-2xl font-serif font-bold text-text-primary">Practice of Medicine Modules</h2>
              <p className="text-xs text-text-secondary">National Commission for Homoeopathy (NCH) 4th BHMS Curriculum</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              4th BHMS Core
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pomModules.map((module, idx) => (
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

      {/* TAB 2: THERAPEUTICS */}
      {activeTab === 'therapeutics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Systemic Therapeutics Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-secondary">
              <div className="p-4 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-primary font-bold text-sm block mb-1">Bronchial Asthma</strong>
                Arsenicum Album (anxiety, 1-2 am aggravation), Natrum Sulphuricum (damp weather aggravation, morning green sputum), Blatta Orientalis (acute dyspnea from dust).
              </div>
              <div className="p-4 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-primary font-bold text-sm block mb-1">Hypertension & Angina</strong>
                Rauwolfia Serpentina (mother tincture for blood pressure regulation), Glonoinum (throbbing carotid pulsation, sun aggravation), Cactus Grandiflorus (constriction as if iron band).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAQS */}
      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-serif font-bold text-text-primary flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Standard Reference Textbooks
            </h3>
            <ul className="space-y-3 text-xs text-text-secondary">
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Davidson&apos;s Principles and Practice of Medicine</strong>
                Gold standard internal medicine reference for clinical presentation and pathology.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Practice of Medicine with Homoeopathic Therapeutics</strong>
                By Dr. K.N. Mathur — Comprehensive clinical manual matching medical conditions to remedies.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
