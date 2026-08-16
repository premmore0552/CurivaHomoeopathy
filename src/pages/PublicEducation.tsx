import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  History, 
  HelpCircle, 
  ChevronDown, 
  Compass, 
  Info, 
  AlertTriangle,
  Flame,
  Wind,
  Droplets,
  Activity,
  HeartCrack,
  FileText,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';

interface DiseaseEdu {
  id: string;
  name: string;
  system: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  whenToSeekCare: string;
  remedies: string[];
}

const PUBLIC_FAQS = [
  {
    q: "What is Homoeopathy?",
    a: "Homoeopathy is a system of alternative medicine founded in 1796 by German physician Samuel Hahnemann. It is based on the principle of 'like cures like' (Similia Similibus Curentur), meaning that a substance that causes symptoms in a healthy person can, when prepared in extremely micro-diluted doses, stimulate the body's natural defense systems to resolve similar symptoms in a sick person."
  },
  {
    q: "How are homoeopathic remedies made?",
    a: "Remedies are prepared from natural sources, including plants, minerals, and organic substances. They undergo a specialized process of serial dilution and vigorous shaking (potentization or succussion). This process is believed by practitioners to minimize toxicity while maximizing the healing properties of the raw substance."
  },
  {
    q: "Is homoeopathy safe for children and pregnant individuals?",
    a: "Homoeopathic remedies are generally considered safe and non-toxic because of their highly diluted nature. However, it is essential to consult with a qualified professional before starting any treatment. Self-prescribing without proper diagnosis can lead to delayed medical attention for serious conditions."
  },
  {
    q: "What are 'Modalities' in Homoeopathic selection?",
    a: "Modalities are factors that make a patient's symptoms feel better or worse. Examples include temperature (feeling better from warm wraps), time (worse at 3 AM), posture (better sitting upright), and weather (worse in damp humidity). Modalities help the Homoeopathic practitioner individualize the prescription to the unique presentation of the patient."
  }
];

const DISEASE_EDUCATION_DATA: DiseaseEdu[] = [
  {
    id: "allergic-rhinitis",
    name: "Allergic Rhinitis (Hay Fever)",
    system: "Respiratory System",
    overview: "Allergic rhinitis is an inflammation of the nasal passages caused by an overreaction of the immune system to environmental allergens such as pollen, dust mites, pet dander, or mold.",
    symptoms: [
      "Frequent sneezing, particularly in the morning.",
      "Clear, watery nasal discharge (coryza).",
      "Itchy, watery, red eyes.",
      "Nasal congestion and post-nasal drip."
    ],
    causes: [
      "Exposure to seasonal pollens (grass, trees, weeds).",
      "Perennial exposure to indoor dust, mold, or dander.",
      "Genetic predisposition to atopic conditions (asthma, eczema)."
    ],
    prevention: [
      "Keep windows closed during high pollen seasons.",
      "Use allergen-proof covers on pillows and mattresses.",
      "Wash hands and face immediately after coming indoors."
    ],
    whenToSeekCare: "Consult a medical professional if you experience difficulty breathing, chest tightness, high fever, or severe facial pain suggesting acute sinusitis.",
    remedies: ["Allium Cepa", "Arsenicum Album", "Sabadilla", "Euphrasia"]
  },
  {
    id: "irritable-bowel",
    name: "Irritable Bowel Syndrome (IBS)",
    system: "Gastrointestinal System",
    overview: "IBS is a common chronic disorder of the digestive tract characterized by abdominal pain, bloating, cramping, and altered bowel habits (constipation, diarrhea, or both).",
    symptoms: [
      "Abdominal pain or cramping, often relieved after bowel movements.",
      "Bloating and excessive flatulence.",
      "Alternating episodes of diarrhea and constipation.",
      "Sensation of incomplete bowel evacuation."
    ],
    causes: [
      "Hypersensitive gut walls and abnormal intestinal contractions.",
      "Mental stress, anxiety, and depression affecting gut-brain interactions.",
      "Certain food sensitivities or gut microbiome imbalances."
    ],
    prevention: [
      "Eat regular, balanced meals slowly and avoid skipping.",
      "Keep a food diary to identify and avoid individual trigger foods.",
      "Practice stress-management techniques such as meditation or yoga."
    ],
    whenToSeekCare: "Seek immediate medical evaluation if you notice rectal bleeding, unexplained weight loss, persistent fever, or constant abdominal pain unrelieved by passing gas.",
    remedies: ["Nux Vomica", "Lycopodium", "Carbo Vegetabilis", "Colocynth"]
  },
  {
    id: "rheumatoid-arthritis",
    name: "Chronic Joint Pain & Osteoarthritis",
    system: "Musculoskeletal System",
    overview: "Chronic joint pain and osteoarthritis represent degenerative changes in the joint cartilage and bones, resulting in stiffness, discomfort, and reduced mobility.",
    symptoms: [
      "Joint stiffness in the morning or after periods of rest.",
      "Pain that worsens with cold, damp weather or heavy exertion.",
      "Swelling, cracking, or tenderness around major joints.",
      "Decreased flexibility and pain on starting to move."
    ],
    causes: [
      "Age-related wear and tear of joint cartilage.",
      "Prior joint injuries, structural stress, or obesity.",
      "Constitutional predisposition to joint stiffness."
    ],
    prevention: [
      "Maintain a healthy body weight to reduce stress on knee and hip joints.",
      "Perform low-impact regular exercises like swimming or walking.",
      "Keep joints warm and protected during damp or cold seasons."
    ],
    whenToSeekCare: "Seek physician care if a joint is hot, intensely red, severely swollen, or accompanied by a high fever, indicating possible joint infection or acute flare.",
    remedies: ["Rhus Toxicodendron", "Bryonia Alba", "Ruta Graveolens", "Calcarea Carbonica"]
  }
];

export default function PublicEducation() {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>("allergic-rhinitis");

  const selectedDisease = DISEASE_EDUCATION_DATA.find(d => d.id === selectedDiseaseId) || DISEASE_EDUCATION_DATA[0];

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Public Education & Wellness Center | Curiva Homoeopathy"
        description="Learn the basics of homoeopathy, its core principles, FAQs, and read safe, evidence-based disease education guides."
      />

      {/* Hero Header */}
      <header className="relative pt-32 pb-36 md:pt-40 md:pb-40 overflow-hidden bg-bg-secondary border-b border-border text-text-primary text-center mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-[#10B981] mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> General Public Resource
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-text-primary tracking-tighter uppercase">
            Understanding <span className="text-primary italic">Homoeopathy</span>
          </h1>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Welcome to Curiva’s Public Education Hub. Explore how classical homoeopathy works, read disease education guides, and find answers to common questions about holistic natural health.
          </p>
        </div>
      </header>

      {/* Public Health eBook Feature Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <Link 
          to="/ebooks"
          className="group p-6 bg-gradient-to-r from-primary/10 via-bg-secondary to-accent/10 border border-primary/20 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft hover:border-primary/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary block">Official Curiva Publications</span>
              <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                Public Health eBook Reader
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Read comprehensive evidence-based medical eBooks on PCOS, Diabetes, High Blood Pressure, and Hair Loss.
              </p>
            </div>
          </div>
          <div className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-2 shrink-0 group-hover:bg-primary-strong transition-all">
            <span>Read eBooks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Disclaimer Alert banner */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl flex gap-4 items-start shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-black text-amber-800 uppercase tracking-wider">Educational Disclosure &amp; Medical Disclaimer</h4>
            <p className="text-xs text-amber-800/80 leading-relaxed font-medium">
              Curiva provides alternative medicine educational materials for academic and research purposes only. The information provided here does not constitute medical advice, diagnosis, treatment, or cure claims. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Core Pillars / Principles */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Foundation Pillars</span>
            <h2 className="text-3xl font-display font-medium text-text-primary">Three Core Laws of Healing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-soft space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">1. Law of Similars</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                The cornerstone concept of <em>"Like Cures Like"</em> (Similia Similibus Curentur). A substance that causes a specific set of symptoms in healthy testers can stimulate recovery in a sick person displaying identical patterns.
              </p>
            </div>

            <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-soft space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-accent">2. Individualization</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                No two prescriptions are the same. Homoeopaths treat the entire individual, assessing mental characteristics, emotional reactions, food preferences, and temperature responses alongside physical complaints.
              </p>
            </div>

            <div className="p-8 bg-white border border-border rounded-[2.5rem] shadow-soft space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-emerald-600">3. The Minimum Dose</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                Remedies are prepared in highly diluted micro-doses through a precise serial potentization process. This maximizes natural restorative energy while ensuring safe, non-toxic outcomes without common chemical side effects.
              </p>
            </div>
          </div>
        </section>

        {/* Disease Education Pages (Selectable Tabs) */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Clinical Ailments</span>
            <h2 className="text-3xl font-display font-medium text-text-primary">Condition Education Guides</h2>
            <p className="text-xs text-text-secondary">Learn about common conditions, their physical causes, prevention steps, and the classical homoeopathic perspective.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar selector */}
            <div className="lg:col-span-1 space-y-2">
              {DISEASE_EDUCATION_DATA.map((disease) => {
                const isSelected = disease.id === selectedDiseaseId;
                return (
                  <button
                    key={disease.id}
                    onClick={() => setSelectedDiseaseId(disease.id)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-primary border-primary text-white shadow-lg' 
                        : 'bg-bg-secondary border-border/60 text-text-secondary hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    <span>{disease.name}</span>
                    <ChevronDown className={`w-4 h-4 opacity-65 ${isSelected ? '-rotate-90 text-white' : 'rotate-90 text-text-tertiary'}`} />
                  </button>
                );
              })}
            </div>

            {/* Detail viewport */}
            <div className="lg:col-span-3 p-8 md:p-12 bg-white border border-border rounded-[3rem] shadow-soft space-y-8">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">
                  {selectedDisease.system}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mt-1">
                  {selectedDisease.name}
                </h3>
                <p className="text-xs md:text-sm text-text-secondary mt-3 leading-relaxed">
                  {selectedDisease.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border/50">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-accent" /> Typical Symptoms
                  </h4>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {selectedDisease.symptoms.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-accent" /> Environmental Causes
                  </h4>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {selectedDisease.causes.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border/50">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Prevention Steps
                  </h4>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {selectedDisease.prevention.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-emerald-600">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#10B981]" /> Common Homoeopathic Remedies
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedDisease.remedies.map((r, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/5 text-primary rounded-xl text-xs font-bold border border-primary/10">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strict safety boundary */}
              <div className="p-5 bg-red-500/5 border border-red-500/15 rounded-2xl flex gap-3.5 items-start mt-6">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-red-700 uppercase tracking-wider block">Important Safety Rule</span>
                  <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                    {selectedDisease.whenToSeekCare}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Public Support</span>
            <h2 className="text-3xl font-display font-medium text-text-primary">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {PUBLIC_FAQS.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaqIdx(prev => prev === idx ? null : idx)}
                    className="w-full px-6 py-5 text-left font-bold text-xs md:text-sm text-text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-bg-primary/20"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-text-secondary leading-relaxed border-t border-border/40 animate-slideDown">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
