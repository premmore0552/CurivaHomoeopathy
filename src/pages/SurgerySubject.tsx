import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scissors, 
  Search, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText,
  Layers,
  Activity,
  ShieldAlert,
  BookMarked
} from 'lucide-react';
import SEO from '../components/SEO';

const surgeryModules = [
  {
    title: "1. General Surgery Principles & Perioperative Care",
    topics: [
      "Wound Care, Hemorrhage, Hemostasis, Shock, Blood Transfusion & Fluid Electrolyte Balance",
      "Surgical Infections: Abscess, Cellulitis, Erysipelas, Carbuncle, Gas Gangrene, Tetanus",
      "Ulcers & Gangrene: Classification of Ulcers, Arterial vs Venous vs Diabetic Ulcer",
      "Burns & Scalds: Rule of Nines, Fluid Resuscitation (Parkland Formula)",
      "Pre-operative and Post-operative Homoeopathic Management (§185–§203 of Organon)"
    ]
  },
  {
    title: "2. Systemic Surgery & GI Surgery",
    topics: [
      "Gastrointestinal: Acute Appendicitis, Intestinal Obstruction, Hernias (Inguinal, Femoral, Umbilical)",
      "Hepatobiliary: Cholecystitis, Cholelithiasis, Obstructive Jaundice, Acute Pancreatitis",
      "Proctology: Hemorrhoids, Anal Fissure, Fistula-in-ano, Anorectal Abscess",
      "Thyroid & Breast: Goitre, Thyroiditis, Carcinoma Thyroid, Fibroadenoma, Carcinoma Breast"
    ]
  },
  {
    title: "3. Specialised Branches: ENT, Ophthalmology & Orthopaedics",
    topics: [
      "ENT: Otitis Media (ASOM/CSOM), Tonsillitis, Sinusitis, Deviated Nasal Septum (DNS), Nasal Polyps",
      "Ophthalmology: Cataract, Glaucoma, Conjunctivitis, Hordeolum (Stye), Chalazion, Pterygium",
      "Orthopaedics: Fractures & Dislocations, Osteomyelitis, Osteoarthritis, Cervical Spondylosis, Bone Tumors"
    ]
  },
  {
    title: "4. Homoeopathic Surgical Therapeutics & Emergency Remedies",
    topics: [
      "Post-operative Atony & Shock: Arnica, Hypericum, Staphisagria, Strontia Carb",
      "Suppuration & Abscess Management: Hepar Sulph, Silicea, Myristica Sebifera, Belladonna",
      "Anal Fissure & Fistula Remedies: Nitric Acid, Ratanhia, Paeonia, Silicea, Thuja",
      "Surgical Miasmatics: Mechanical injuries vs Chronic miasmatic expression in surgical conditions"
    ]
  }
];

export default function SurgerySubject() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'therapeutics' | 'faqs'>('syllabus');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <SEO 
        title="Surgery & Homoeopathic Therapeutics Study Center | Curiva Homoeopathy"
        description="Comprehensive Surgery study center for 3rd BHMS. General surgery, systemic surgery, ENT, Ophthalmology, Orthopaedics, and Homoeopathic surgical therapeutics."
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Scissors className="w-4 h-4 text-blue-400" />
            Subject-Wise Study Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            Surgery & Homoeopathic Therapeutics
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Master general and systemic surgical diagnosis, ENT, Ophthalmology, Orthopaedics, and pre/post-operative Homoeopathic therapeutics to avoid unnecessary surgical interventions where indicated.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              to="/portal/3rd-bhms" 
              className="inline-flex items-center gap-2 bg-white text-blue-950 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-50 transition-all"
            >
              Go to 3rd BHMS Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-border pb-4 overflow-x-auto">
        {[
          { id: 'syllabus', label: '3rd BHMS Syllabus', icon: FileText },
          { id: 'therapeutics', label: 'Surgical Therapeutics', icon: Activity },
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
              <h2 className="text-2xl font-serif font-bold text-text-primary">Surgery Academic Modules</h2>
              <p className="text-xs text-text-secondary">National Commission for Homoeopathy (NCH) 3rd BHMS Curriculum</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-full">
              3rd BHMS Core
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surgeryModules.map((module, idx) => (
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

      {/* TAB 2: THERAPEUTICS */}
      {activeTab === 'therapeutics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-border rounded-3xl p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Key Surgical Remedies in Homoeopathy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-secondary">
              <div className="p-4 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-primary font-bold text-sm block mb-1">Staphisagria</strong>
                Indicated for clean surgical incised wounds, catheterisation trauma, and post-operative urinary retention.
              </div>
              <div className="p-4 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-primary font-bold text-sm block mb-1">Hypericum Perforatum</strong>
                The &quot;Arnica of the nerves&quot; — Punctured wounds rich in sentient nerves (fingertips, matrix of nails, tailbone injuries).
              </div>
              <div className="p-4 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-primary font-bold text-sm block mb-1">Hepar Sulphuris</strong>
                Extreme sensitivity to cold air and touch. Promotes suppuration in early boils/abscesses when given in low potency (3X/6X).
              </div>
              <div className="p-4 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-primary font-bold text-sm block mb-1">Silicea Terra</strong>
                Promotes expulsion of foreign bodies (splinters, fishbones, needles) and resolves chronic fistulous tracts.
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
                <strong className="text-text-primary block text-sm">Bailey & Love&apos;s Short Practice of Surgery</strong>
                The premier surgical textbook for clinical signs, operative procedures, and pathology.
              </li>
              <li className="p-3 bg-bg-primary rounded-xl border border-border/60">
                <strong className="text-text-primary block text-sm">Homoeopathic Therapeutics in Surgery</strong>
                By Dr. J.G. Gilchrist — Classical manual on non-operative and surgical Homoeopathic care.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
