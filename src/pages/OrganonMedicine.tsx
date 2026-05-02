import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  History, 
  Search, 
  Stethoscope, 
  Database, 
  Activity, 
  User, 
  Globe,
  ChevronRight, 
  ArrowRight,
  Info,
  Layers,
  Thermometer,
  CloudLightning,
  Sparkles,
  Award,
  CheckCircle as LucideCheckCircle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const OrganonMedicine = () => {
  const [activePart, setActivePart] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const aphorisms = [
    { id: "1", sub: "Physician's high and only mission" },
    { id: "2", sub: "Highest ideal of cure & easily comprehensible principles" },
    { id: "3", sub: "Knowledge or Pre-requisite qualifications of the physician" },
    { id: "4", sub: "The physician as a preserver of health" },
    { id: "5", sub: "Exciting cause, fundamental cause, acute & chronic diseases, constitution" },
    { id: "6", sub: "The Unprejudiced observer, symptomatology" },
    { id: "7", sub: "Causa occasionalis, Totality of symptoms, Indisposition" },
    { id: "8", sub: "Removal of symptoms is the removal of disease" },
    { id: "9-18", sub: "Vital Force (Vital Principle) in health, disease and cure" },
    { id: "19-21", sub: "Knowledge of Drugs & Curative power of medicine" },
    { id: "22-25", sub: "Different therapeutic methods (Homeopathy, Allopathy, Antipathy)" },
    { id: "26", sub: "Therapeutic Law of Nature (Nature's Law of Cure)" },
    { id: "28-29", sub: "Modus Operandi of Homeopathic Cure" },
    { id: "30-34", sub: "Proofs that medicinal diseases are more powerful" },
    { id: "35-42", sub: "What happens when two dissimilar diseases meet?" },
    { id: "43-46", sub: "What happens when two similar diseases meet?" },
    { id: "50-51", sub: "Nature's clumsy attempts (Happy-go-lucky operations)" },
    { id: "52", sub: "Criminal treason against homeopathy" },
    { id: "56", sub: "Galenic Antipathy & Isopathy" },
    { id: "58", sub: "Faulty symptomatic treatment (Palliative)" },
    { id: "63-66", sub: "Primary and Secondary Action of medicines" },
    { id: "71", sub: "The three points necessary for cure" },
    { id: "72-82", sub: "Clinical classification of diseases & Miasms" },
    { id: "83-104", sub: "Directions for Individual Case Taking" },
    { id: "105-145", sub: "Healthy Human Drug Proving Methodologies" },
    { id: "146-171", sub: "Judicious employment of medicines & Aggrvations" },
    { id: "172-184", sub: "Management of One-sided diseases" },
    { id: "185-203", sub: "Local maladies and External application" },
    { id: "204-209", sub: "Investigation of Chronic Diseases" },
    { id: "210-230", sub: "Mental diseases and their treatment" },
    { id: "231-244", sub: "Intermittent and Alternating diseases" },
    { id: "245-251", sub: "Repetition of doses & Potency (6th Edition)" },
    { id: "252-256", sub: "Signs of commencement of improvement" },
    { id: "257-258", sub: "Warning against Favorite remedies" },
    { id: "259-263", sub: "Diet and Regimen in clinical practice" },
    { id: "264-271", sub: "Homoeopathic Pharmacy & 50 Millesimal scale" },
    { id: "272-274", sub: "One Single Simple Remedy (Monopharmacy)" },
    { id: "284-285", sub: "Routes for administration of remedies" },
    { id: "286-291", sub: "Therapeutic measures other than drugs (Magnetism, Mesmerism, etc.)" }
  ];

  const filteredAphorisms = aphorisms.filter(a => 
    a.sub.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.id.includes(searchTerm)
  );

  const parts = [
    {
      title: "Introduction",
      icon: <Info className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <h2 className="text-3xl font-bold text-primary mb-4">What is Organon of Medicine?</h2>
            <p className="text-lg text-text-secondary italic border-l-4 border-primary pl-6 py-2 mb-6">
              "Homeopathy; Not a theory of disease, but theory of cure" — Stuart Close.
            </p>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p>
                Organon of Medicine is a fundamental scientific treatise written by Samuel Hahnemann, the founder of Homoeopathy. 
                Written in the later years of the 18th century, it is considered a revolutionary book on medical philosophy.
              </p>
              <p>
                Practicing homoeopathy without the knowledge of Organon is like going into the sea without knowing how to swim. 
                It contains the guiding principles, the logic, and the practical application of the Law of Similars.
              </p>
              <div className="bg-bg-primary p-6 rounded-2xl border border-border mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <div className="text-primary font-black text-2xl">HOMEOPATHY</div>
                <div className="text-text-primary text-xl font-bold">=</div>
                <div className="text-secondary font-black text-2xl tracking-tighter">HOMEOS [SIMILAR]</div>
                <div className="text-text-primary text-xl font-bold">+</div>
                <div className="text-secondary font-black text-2xl tracking-tighter">PATHOS [SUFFERING]</div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-secondary p-6 rounded-3xl border border-border">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-primary" />
                Meaning of Organon
              </h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>A method of scientific investigation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>Instrument of knowledge & system of logic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>"An instrument for effecting in best manner a certain end" — Richard Hughes.</span>
                </li>
              </ul>
            </div>
            <div className="bg-bg-secondary p-6 rounded-3xl border border-border">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary" />
                Editions of Organon
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { ed: "1st", year: "1810" },
                  { ed: "2nd", year: "1819" },
                  { ed: "3rd", year: "1824" },
                  { ed: "4th", year: "1829" },
                  { ed: "5th", year: "1833" },
                  { ed: "6th", year: "1921" }
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-bg-primary rounded-xl border border-border hover:border-primary/30 transition-all">
                    <div className="font-bold text-primary">{item.ed}</div>
                    <div className="text-xs text-text-secondary">{item.year}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text-tertiary italic text-center">
                *The 6th edition is the "Posthumous Edition", completed in 1842.
              </p>
            </div>
          </section>
        </div>
      )
    },
    {
      title: "Part I: Foundation",
      icon: <History className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black tracking-tight">Historical Context</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Ancient Systems",
                  period: "2900 B.C.",
                  desc: "Egyptian, Chinese, and Indian (Ayurvedic) systems established early concepts of life-force (Qi, Tridoshas).",
                  icon: <Globe className="w-8 h-8 text-primary/40" />
                },
                {
                  title: "The Hippocratic Era",
                  period: "460 B.C.",
                  desc: "Hippocrates rejected superstition, identified natural causes, and suggested the Law of Similia for curable diseases.",
                  icon: <Award className="w-8 h-8 text-primary/40" />
                },
                {
                  title: "Galenian Era",
                  period: "130-200 A.D.",
                  desc: "Claudius Galen championed the 'Law of Dissimilia' (Antipathy), which dominated medicine for 1200 years.",
                  icon: <Layers className="w-8 h-8 text-primary/40" />
                }
              ].map((item, i) => (
                <div key={i} className="relative p-6 rounded-3xl bg-bg-secondary border border-border overflow-hidden">
                  <div className="absolute top-4 right-4">{item.icon}</div>
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">{item.period}</div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-bg-secondary rounded-[40px] p-8 border border-border">
            <h2 className="text-3xl font-black mb-8 text-center">Dr. Samuel Hahnemann (1755-1843)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="p-6 bg-bg-primary rounded-3xl border border-border shadow-soft">
                  <h4 className="text-primary font-bold mb-2">The Breakthrough (1790)</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    While translating Cullen's Materia Medica, Hahnemann questioned the claim that Cinchona bark cured malaria due to its bitterness. 
                    He experimented on himself, observing that the bark produced malaria-like symptoms in a healthy body.
                  </p>
                </div>
                <div className="p-6 bg-bg-primary rounded-3xl border border-border shadow-soft">
                  <h4 className="text-primary font-bold mb-2">The Mission</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    A master of a dozen languages and a brilliant chemist, Hahnemann was disillusioned by the cruel medical practices of his time 
                    (bloodletting, purging). He sought a "Rational Medical System" based on observable facts and logical induction.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center p-8 text-center px-4">
                  <div>
                    <p className="text-primary font-serif italic text-xl mb-4 italic leading-relaxed">
                      "Cinchona bark was to Hahnemann what the falling apple was to Newton."
                    </p>
                    <p className="text-xs text-text-tertiary font-bold uppercase tracking-widest">— R.E. Dudgeon</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 p-6 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 max-w-[200px]">
                  <p className="text-xs font-black uppercase mb-1">Aude Sapere</p>
                  <p className="text-lg font-bold">Dare to be Wise</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      title: "Part II: Knowledge",
      icon: <Stethoscope className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-primary p-8 rounded-[32px] text-white">
                <h3 className="text-2xl font-black mb-4">The Physician's Mission</h3>
                <p className="text-primary-foreground/90 font-medium italic mb-6">
                  "§ 1: The physician's high and only mission is to restore the sick to health, to cure, as it is termed."
                </p>
                <div className="space-y-4 font-bold text-xs uppercase tracking-widest opacity-90">
                  <div className="flex gap-3">
                    <LucideCheckCircle className="w-5 h-5 shrink-0" />
                    <p>Restore balance to the whole personality.</p>
                  </div>
                  <div className="flex gap-3">
                    <LucideCheckCircle className="w-5 h-5 shrink-0" />
                    <p>Be a healer and health adviser.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-bg-secondary p-6 rounded-[32px] border border-border">
                <h4 className="font-bold flex items-center gap-2 mb-4 uppercase text-xs tracking-widest">The Physician's Toolkit</h4>
                <div className="space-y-2 text-xs">
                  {["Knowledge of Disease", "Knowledge of Medicinal Powers", "Choice of Remedy", "Knowledge of Pharmacy", "Proper Dose", "Repetition of Dose", "Obstacles to Cure"].map((item, i) => (
                    <div key={i} className="px-4 py-2 bg-bg-primary rounded-xl border border-border flex items-center justify-between group cursor-default">
                      <span className="text-text-secondary group-hover:text-primary transition-colors font-medium">{item}</span>
                      <ChevronRight className="w-3 h-3 text-text-tertiary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-bg-secondary p-8 rounded-[40px] border border-border">
                <div className="flex items-center gap-3 mb-6 font-black text-2xl uppercase tracking-tight">
                  <Sparkles className="w-6 h-6 text-primary" />
                  The Vital Principle
                </div>
                <div className="prose prose-sm max-w-none text-text-secondary pb-8 border-b border-border mb-8 leading-relaxed">
                  <p>
                    The living organism is endowed with an internal regulating force called the <strong>Vital Force</strong> (or Vital Principle). 
                    This force maintains the harmonious functioning of all systems in health.
                  </p>
                  <p className="bg-bg-primary px-6 py-4 rounded-2xl border-l-4 border-primary font-medium">
                    Disease is primarily a <strong>dynamic derangement</strong> of this vital force by morbific (inimical) forces called Miasms.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-6 bg-bg-primary rounded-3xl border border-border">
                    <div className="text-2xl font-black text-text-primary mb-1 uppercase tracking-tight">UNINTELLIGENT</div>
                    <p className="text-[10px] uppercase text-text-tertiary font-black tracking-widest">Follows Natural Law Only</p>
                  </div>
                  <div className="p-6 bg-bg-primary rounded-3xl border border-border">
                    <div className="text-2xl font-black text-text-primary mb-1 uppercase tracking-tight">AUTOCRATIC</div>
                    <p className="text-[10px] uppercase text-text-tertiary font-black tracking-widest">Self-Powered Action</p>
                  </div>
                </div>
              </div>

              <div className="bg-bg-secondary p-8 rounded-[40px] border border-border">
                <div className="flex items-center gap-3 mb-6 font-black text-2xl uppercase tracking-tight">
                  <Activity className="w-6 h-6 text-secondary" />
                  Concept of Disease
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-bold text-lg text-text-primary flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Dynamic Origin
                    </h5>
                    <p className="text-sm text-text-secondary italic leading-relaxed">
                      "Disease per se" is the dynamic morbid process which always precedes pathological tissue change.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-bold text-lg text-text-primary flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Unprejudiced Observer
                    </h5>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The physician must remain neutral, free from all bias, and observe symptoms as they truly manifest in the patient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      title: "Part III: Classification",
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black tracking-tight uppercase">Disease Classification</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 bg-bg-secondary rounded-[40px] border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><CloudLightning className="w-32 h-32" /></div>
                <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Miasm Type 01</div>
                <h3 className="text-2xl font-black mb-4">Acute Diseases</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Sudden onset, rapid course, terminated quickly in recovery or death. Usually caused by a transient explosion of "Latent Psora".
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["Individual", "Sporadic", "Epidemic"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-bg-primary border border-border rounded-full text-xs font-bold text-text-secondary">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-bg-secondary rounded-[40px] border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Layers className="w-32 h-32" /></div>
                <div className="text-xs font-black text-secondary uppercase tracking-[0.2em] mb-4">Miasm Type 02</div>
                <h3 className="text-2xl font-black mb-4">Chronic Diseases</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Gradual beginning, unlimited course, no tendency to natural recovery. Caused by Chronic Miasms inherited or acquired.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["Psora", "Syphilis", "Sycosis", "Pseudo-Psora"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-bg-primary border border-secondary/20 rounded-full text-xs font-bold text-secondary">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-black border-b border-border pb-4 uppercase tracking-tighter">The Theory of Miasms</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Psora",
                    label: "The Mother Miasm",
                    char: "Functional disturbances, oversensitivity, 'Itch' miasm, non-venereal.",
                    stats: "7/8th of all diseases",
                    color: "primary"
                  },
                  {
                    name: "Syphilis",
                    label: "The Chancre Miasm",
                    char: "Destruction, ulceration, deformation, bone & tissue degeneration.",
                    stats: "Deep Pathological change",
                    color: "secondary"
                  },
                  {
                    name: "Sycosis",
                    label: "The Figwart Miasm",
                    char: "Proliferation, infiltration, overgrowths, tumors, warts.",
                    stats: "Venereal manifestation",
                    color: "emerald-500"
                  }
                ].map((m, i) => (
                  <div key={i} className="group p-8 rounded-[32px] bg-bg-secondary border border-border hover:shadow-2xl transition-all duration-500">
                    <h4 className={`text-2xl font-black mb-1 text-${m.color}`}>{m.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-6">{m.label}</p>
                    <p className="text-sm text-text-secondary leading-relaxed mb-8">{m.char}</p>
                    <div className="py-2.5 px-5 rounded-2xl bg-bg-primary text-[10px] font-black border border-border inline-block uppercase tracking-widest">
                      {m.stats}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      title: "Quick Reference",
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Aphorism Subject Index</h2>
                <p className="text-sm text-text-secondary mt-2">Quickly reference topics across the 291 Aphorisms of the 6th Edition.</p>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input 
                  type="text" 
                  placeholder="Search topic or § number..." 
                  className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-border shadow-soft bg-bg-primary">
              <div className="max-h-[600px] overflow-y-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-bg-secondary z-10">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Aphorism</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-border">Subject Matter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAphorisms.length > 0 ? (
                      filteredAphorisms.map((row, i) => (
                        <tr key={i} className="hover:bg-primary/5 transition-colors group">
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center min-w-[70px] h-8 px-3 bg-bg-secondary border border-border rounded-xl text-[10px] font-black group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all uppercase tracking-tighter italic">
                              § {row.id}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed tracking-tight">
                            {row.sub}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-8 py-20 text-center text-text-tertiary">
                          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                          <p className="font-bold">No aphorisms found matching "{searchTerm}"</p>
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-primary text-xs font-black uppercase tracking-widest hover:underline"
                          >
                            Clear Search
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )
    },
    {
      title: "Stalwarts",
      icon: <Award className="w-5 h-5" />,
      content: (
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight flex items-center justify-center gap-3">
              <div className="w-12 h-[1px] bg-border" />
              The Historical Pioneers
              <div className="w-12 h-[1px] bg-border" />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "James Tyler Kent", years: "1849-1916", feat: "Triad of Homeopathy" },
                { name: "C. Von Boenninghausen", years: "1785-1864", feat: "Therapeutic Pocket Book" },
                { name: "Constantine Hering", years: "1800-1880", feat: "Father of American Homeopathy" },
                { name: "Richard Hughes", years: "1836-1902", feat: "Manual of Pharmaco-dynamics" },
                { name: "Cyrus Maxwell Boger", years: "1861-1935", feat: "Synoptic Key" },
                { name: "Carroll Dunham", years: "1828-1877", feat: "Science of Therapeutics" },
                { name: "Elizabeth W. Hubbard", years: "1896-1967", feat: "Modern Pioneer" },
                { name: "Margaret Lucy Tyler", years: "1857-1943", feat: "Drug Pictures" }
              ].map((p, i) => (
                <div key={i} className="p-8 bg-bg-secondary rounded-[32px] border border-border hover:border-primary/20 hover:bg-bg-primary transition-all duration-300 text-center group shadow-soft hover:shadow-xl">
                  <div className="w-16 h-16 bg-bg-primary border border-border rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <User className="w-8 h-8 text-text-tertiary group-hover:text-primary" />
                  </div>
                  <h5 className="font-black text-sm mb-1 tracking-tight">{p.name}</h5>
                  <p className="text-[10px] text-text-tertiary font-bold mb-4">{p.years}</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-black text-primary opacity-60 leading-tight border-t border-border pt-4">
                    {p.feat}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary/5 p-12 rounded-[48px] border border-primary/10">
             <div className="max-w-3xl mx-auto space-y-8 text-center">
                <h2 className="text-4xl font-black tracking-tighter italic font-serif text-primary">Homoeopathy in India</h2>
                <div className="prose prose-sm text-text-secondary mx-auto leading-loose font-medium">
                  <p className="text-lg">
                    Homoeopathy came to India as early as 1810. Dr. John Martin Honigberger, a disciple of Hahnemann, 
                    successfully treated Maharaja Ranjit Singh in 1839.
                  </p>
                  <p>
                    The foundation in India was laid by <strong>Babu Rajendra Lal Dutt</strong> and 
                    <strong> Dr. Mahendra Lal Sircar</strong>, whose conversion in 1867 marked a turning point 
                    in the acceptance of the system.
                  </p>
                </div>
                <div className="max-w-fit mx-auto px-8 py-6 bg-white dark:bg-gray-800 rounded-3xl border border-border shadow-2xl relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">National Quote</div>
                  <p className="text-lg font-bold italic leading-relaxed text-text-primary">
                    "Homoeopathy is the latest and refined method of treating patients economically and non-violently, government must encourage and patronize it."
                  </p>
                  <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mt-4">— MAHATMA GANDHI</p>
                </div>
             </div>
          </section>
        </div>
      )
    }
  ];

  return (
    <div className="bg-bg-primary min-h-screen pb-20 selection:bg-primary/20 selection:text-primary">
      <Helmet>
        <title>Organon of Medicine | Systematic Study Guide | Curiva</title>
        <meta name="description" content="A scientific study of Hahnemann's Organon: from history and vital force to miasmatic theory and the 50 millesimal scale." />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-0 right-0 p-24 opacity-[0.03] rotate-12 pointer-events-none">
          <Book className="w-[500px] h-[500px]" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20">
                <Sparkles className="w-4 h-4" />
                The Bible of Homoeopathy
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-text-primary tracking-tighter leading-[0.9] uppercase underline decoration-primary/20 underline-offset-8">
                Organon <span className="font-serif italic lowercase text-primary/80">of</span> Medicine
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-3xl leading-relaxed font-medium">
                A systematic research study by Dr. G. Nagendra Babu, exploring Hahnemann's 
                scientific treatise in contemporary context.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-8 bg-bg-secondary rounded-[40px] border border-border shadow-soft">
               {[
                 { label: "Aphorisms", val: "291", icon: <Layers className="w-4 h-4 text-primary" /> },
                 { label: "Standard Key", val: "6th Ed", icon: <Database className="w-4 h-4 text-primary" /> },
                 { label: "Miasms", val: "Psora", icon: <Thermometer className="w-4 h-4 text-primary" /> },
                 { label: "Logic", val: "Inductive", icon: <Activity className="w-4 h-4 text-primary" /> }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center gap-1 border-r border-border last:border-none">
                   <div className="flex items-center gap-2">
                     {stat.icon}
                     <span className="text-xl font-black">{stat.val}</span>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">{stat.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Vertical Navigation Bar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-3">
              <div className="mb-6 px-4">
                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Navigation Guide</h4>
              </div>
              {parts.map((part, index) => (
                <button
                  key={index}
                  onClick={() => setActivePart(index)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-[24px] transition-all duration-500 text-left border group ${
                    activePart === index 
                    ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/20 -translate-y-1' 
                    : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/30 hover:bg-bg-primary shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors duration-500 ${activePart === index ? 'bg-white/10' : 'bg-bg-primary border border-border shadow-inner group-hover:bg-primary/5'}`}>
                      {part.icon}
                    </div>
                    <span className={`font-black text-xs uppercase tracking-widest duration-500 ${activePart === index ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>{part.title}</span>
                  </div>
                  {activePart === index && (
                    <motion.div 
                      layoutId="sidebar-active" 
                      className="absolute left-0 w-1.5 h-8 bg-white rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              
              <div className="mt-12 p-8 rounded-[40px] bg-secondary/10 border border-secondary/20 relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 p-12 opacity-5 rotate-12 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-0">
                  <Book className="w-32 h-32 text-secondary" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4">Reading Tip</h4>
                  <p className="text-[11px] font-bold text-text-secondary leading-relaxed italic">
                    "Start with the 6th Edition for the refined concept of the 50 Millesimal scale and the Vital Principle."
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Dynamic Content Main View */}
          <main className="flex-1 min-w-0">
            <div className="mb-12">
               <div className="px-10 py-3 bg-bg-secondary border border-border inline-block rounded-full text-[10px] font-black text-text-tertiary uppercase tracking-widest">
                  Current Section: {parts[activePart].title}
               </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activePart}
                initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {parts[activePart].content}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </section>

      {/* Decorative Final Quote Section */}
      <section className="max-w-5xl mx-auto px-4 mt-32">
        <div className="p-1 gap-1 bg-gradient-to-r from-primary/20 via-border to-secondary/20 rounded-[52px]">
          <div className="p-16 rounded-[48px] bg-bg-primary text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-[100px] transition-all duration-700 group-hover:scale-150" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-tl-[100px] transition-all duration-700 group-hover:scale-150" />
            
            <div className="max-w-3xl mx-auto space-y-10 relative z-10">
              <p className="text-3xl md:text-4xl font-black text-text-primary tracking-tight leading-tight uppercase">
                "The truth we mortals need, <br/>
                Us bless to make and keep, <br/>
                The all-wise slightly covered over, <br/>
                But did not bury deep."
              </p>
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-[2px] bg-primary/20 rounded-full" />
                <div className="space-y-1">
                  <div className="font-black text-primary text-xs uppercase tracking-[0.4em]">Samuel Hahnemann</div>
                  <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest italic font-serif">Aphoristic Poem from 1st Edition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganonMedicine;
