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
  X,
  ChevronRight, 
  ArrowRight,
  Info,
  Layers,
  Thermometer,
  CloudLightning,
  Sparkles,
  Award,
  CheckCircle as LucideCheckCircle,
  Quote,
  Network
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { aphorisms as fullAphorisms } from '../data/aphorisms';

const AphorismTree = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const themeColors: Record<string, string> = {
    'Logic': 'bg-blue-500',
    'VitalForce': 'bg-purple-500',
    'DrugProving': 'bg-emerald-500',
    'ChronicDisease': 'bg-red-500',
    'Therapeutics': 'bg-amber-500',
    'Clinical': 'bg-primary'
  };

  const getAphorismTheme = (id: number): string => {
    if (id <= 70) return 'Philosophy & Vital Force';
    if (id <= 104) return 'Classification of Diseases';
    if (id <= 145) return 'Drug Proving';
    if (id <= 271) return 'Healing & Preparation';
    if (id <= 291) return 'Single Remedy & Dose';
    return 'Auxiliary Methods';
  };

  const filteredAphorisms = fullAphorisms.filter(a => 
    a.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.id.toString() === searchTerm
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight italic">Aphorism <span className="text-primary">Architecture</span></h3>
            <p className="text-xs text-text-secondary font-bold uppercase tracking-widest opacity-60">Full sequence of the 6th Edition (§1 - §294)</p>
          </div>
        </div>
        
        <div className="relative max-w-xs w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
           <input 
             type="text" 
             placeholder="Search by ID or keywords..."
             className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-[10px] placeholder:uppercase placeholder:font-bold"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      {/* Grid of all 294 Aphorisms */}
      <div className="mb-20">
         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-8 opacity-40">Complete Logical Index</h4>
         <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
            {Array.from({ length: 294 }, (_, i) => i + 1).map(id => {
              const data = fullAphorisms.find(a => a.id === id);
              const isSelected = selectedId === id;
              const hasData = !!data;

              return (
                <button
                  key={id}
                  onClick={() => setSelectedId(isSelected ? null : id)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-black transition-all border ${
                    isSelected 
                    ? 'bg-primary text-white border-primary scale-110 z-10 shadow-lg shadow-primary/40' 
                    : hasData 
                      ? 'bg-bg-secondary text-text-primary border-primary/20 hover:border-primary' 
                      : 'bg-bg-secondary text-text-secondary/30 border-border hover:border-text-secondary/20'
                  }`}
                  title={`Aphorism §${id}: ${getAphorismTheme(id)}`}
                >
                  {id}
                </button>
              );
            })}
         </div>
         <div className="mt-4 flex items-center gap-4 text-[8px] font-black uppercase tracking-widest opacity-40">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-primary/20" /> Annotated</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded border border-border" /> Index Only</div>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedId && (
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-10 bg-bg-secondary rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 text-[10rem] font-black text-primary/5 italic pointer-events-none">
              §{selectedId}
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 block">
                {getAphorismTheme(selectedId)}
              </span>
              
              {fullAphorisms.find(a => a.id === selectedId) ? (
                <div className="space-y-8">
                  <h4 className="text-3xl font-display font-black text-text-primary leading-tight max-w-3xl">
                    {fullAphorisms.find(a => a.id === selectedId)?.text}
                  </h4>
                  <div className="flex gap-4 p-8 bg-bg-primary rounded-3xl border border-border">
                    <Quote className="w-10 h-10 text-primary/20 shrink-0" />
                    <p className="text-lg text-text-secondary italic leading-relaxed font-serif">
                      "{fullAphorisms.find(a => a.id === selectedId)?.quoted}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-text-primary italic">Detail coming from the 6th Edition Research Repository.</h4>
                  <p className="text-text-secondary leading-relaxed max-w-2xl">
                    Aphorism §{selectedId} continues the logical exploration of {getAphorismTheme(selectedId).toLowerCase()}. 
                    In clinical practice, this section provides guidance on the systematic application of homeopathic law.
                  </p>
                  <button className="px-6 py-3 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">
                    Request Full Translation
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
        <div className="p-8 bg-primary/5 rounded-[3rem] border border-primary/10">
           <h4 className="flex items-center gap-3 text-lg font-bold mb-4">
              <Info className="w-5 h-5 text-primary" />
              The Logic of the Grid
           </h4>
           <div className="space-y-3">
              {[
                { r: "§1-70", l: "Doctrinal part: Vital force, Law of Similia." },
                { r: "§71-291", l: "Practical part: Case taking, proving, administration." },
                { r: "§292-294", l: "Auxiliary: Mesmerism and dietetics." }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-medium">
                   <span className="font-black text-primary uppercase tracking-tighter">{item.r}</span>
                   <span className="text-text-secondary italic">{item.l}</span>
                </div>
              ))}
           </div>
        </div>
        
        <div className="p-8 bg-zinc-900 rounded-[3rem] text-white">
           <h4 className="flex items-center gap-3 text-lg font-bold mb-4">
              <Sparkles className="w-5 h-5 text-primary-light" />
              6th Edition Discovery
           </h4>
           <p className="text-sm text-white/60 leading-relaxed italic">
              "In the new edition, the treatment of chronic diseases is brought to such perfection that they can be cured with almost certain success." — Hahnemann, 1842.
           </p>
        </div>
      </div>
    </div>
  );
};

const OrganonMedicine = () => {
  const [activePart, setActivePart] = useState(0);

  const parts = [
    {
      title: "Philosophy",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <section className="bg-primary/5 p-8 md:p-12 rounded-[4rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none animate-pulse">
               <Sparkles className="w-48 h-48" />
            </div>
            <h2 className="text-4xl font-black text-text-primary mb-6 italic">What is <span className="text-primary italic">Organon?</span></h2>
            <p className="text-xl text-text-secondary italic border-l-4 border-primary pl-8 py-4 mb-8 leading-relaxed max-w-2xl">
              "Homeopathy; Not a theory of disease, but theory of cure" — Stuart Close.
            </p>
            <div className="prose prose-lg max-w-none text-text-secondary leading-loose">
              <p>
                Organon of Medicine is a fundamental scientific treatise written by Samuel Hahnemann, the founder of Homoeopathy. 
                It contains the guiding principles, the logic, and the practical application of the Law of Similars.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 mb-4">
                <div className="p-8 bg-bg-primary rounded-[3rem] border border-border shadow-soft text-center group hover:scale-105 transition-all">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Similia</div>
                  <div className="text-3xl font-black italic">Similibus</div>
                </div>
                <div className="text-4xl font-black text-primary italic">Curantur</div>
              </div>
            </div>
          </section>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-10 bg-bg-secondary rounded-[3rem] border border-border">
                <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                   <Award className="w-6 h-6 text-primary" />
                   Core Tenets
                </h3>
                <ul className="space-y-6">
                   {[
                     { t: "Similia Similibus Curantur", d: "Let likes be treated by likes." },
                     { t: "The Law of Simplex", d: "Administration of single simple remedy." },
                     { t: "The Law of Minimum", d: "Smallest dose for maximum reaction." }
                   ].map((tenet, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0" />
                        <div>
                           <div className="font-black text-sm uppercase tracking-tight">{tenet.t}</div>
                           <div className="text-sm text-text-secondary font-medium">{tenet.d}</div>
                        </div>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="p-10 bg-bg-secondary rounded-[3rem] border border-border">
                <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
                   <Database className="w-6 h-6 text-secondary" />
                   Historical Timeline
                </h3>
                <div className="space-y-4">
                   {[
                     { y: "1810", e: "1st Edition", c: "Leipzig" },
                     { y: "1819", e: "2nd Edition", c: "Augmented" },
                     { y: "1833", e: "5th Edition", c: "Final in Life" },
                     { y: "1921", e: "6th Edition", c: "Posthumous" }
                   ].map((ed, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-bg-primary rounded-2xl border border-border group hover:border-primary/40 transition-colors">
                        <div className="flex flex-col">
                           <span className="text-xs font-black text-primary">{ed.y}</span>
                           <span className="text-sm font-bold">{ed.e}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{ed.c}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "The Architecture",
      icon: <Network className="w-5 h-5" />,
      content: <AphorismTree />
    },
    {
       title: "Stalwarts",
       icon: <User className="w-5 h-5" />,
       content: (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                n: 'Samuel Hahnemann', 
                r: 'Founder of Homeopathy', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Samuel_Hahnemann_portrait.jpg/440px-Samuel_Hahnemann_portrait.jpg',
                bio: 'Author of Organon of Medicine and Chronic Diseases. Discovered Similia principle in 1790.'
              },
              { 
                n: 'James Tyler Kent', 
                r: 'Materia Medica & Repertory', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/James_Tyler_Kent.jpg/440px-James_Tyler_Kent.jpg',
                bio: 'Proposed the hierarchy of symptoms: Mental, Physical General, and Particulars.'
              },
              { 
                n: 'C.v. Boenninghausen', 
                r: 'Therapeutic Pocket Book', 
                img: 'https://www.homeopathyworldcommunity.com/wp-content/uploads/2018/03/Boenninghausen.jpg',
                bio: 'Pioneer of the Complete Symptom concept (Location, Sensation, Modality, Concomitant).'
              },
              { 
                n: 'Constantine Hering', 
                r: 'Father of American Homeopathy', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Constantine_Hering.jpg/440px-Constantine_Hering.jpg',
                bio: 'Author of "Guiding Symptoms". Discovered Hering\'s Law of Cure.'
              },
              { 
                n: 'C.M. Boger', 
                r: 'Synoptic Key', 
                img: 'https://homeopathyresource.org/wp-content/uploads/2021/04/C-M-Boger.jpg',
                bio: 'Emphasized pathological generals and clinical observations.'
              },
              { 
                n: 'E.B. Nash', 
                r: 'Leaders in Homeopathic Therapeutics', 
                img: 'https://www.nature.com/articles/nm0102_13_1.jpg',
                bio: 'Famous for "Trio of Burning" and "Trio of Flatulence" remedies.'
              },
              { 
                n: 'T.F. Allen', 
                r: 'Encyclopedia of Pure Materia Medica', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Timothy_Field_Allen.jpg',
                bio: 'Compiled 10 volumes of drug provings and clinical symptoms.'
              },
              { 
                n: 'Carroll Dunham', 
                r: 'The Science of Therapeutics', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Carroll_Dunham.jpg/440px-Carroll_Dunham.jpg',
                bio: 'Defender of pure homeopathy during the scientific transition.'
              }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative bg-bg-secondary rounded-[3rem] border border-border p-2 overflow-hidden hover:shadow-2xl transition-all"
              >
                 <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 relative">
                    <img src={s.img} alt={s.n} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 right-6">
                       <h4 className="text-xl font-display font-black text-white italic tracking-tight">{s.n}</h4>
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{s.r}</p>
                    </div>
                 </div>
                 <div className="p-6 pt-0">
                    <p className="text-sm text-text-secondary font-medium leading-relaxed italic line-clamp-3">
                       {s.bio}
                    </p>
                 </div>
              </motion.div>
            ))}
         </div>
       )
    }
  ];

  return (
    <div className="bg-bg-primary min-h-screen pb-20 selection:bg-primary/20 selection:text-primary">
      <Helmet>
        <title>Philosophy & Organon | Systematic Study Guide | Curiva</title>
        <meta name="description" content="A scientific study of Hahnemann's Organon: architectural study of aphorisms and historical context." />
      </Helmet>

      {/* Modern Hero */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-radial from-primary/10 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <Book className="w-96 h-96 text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mx-auto">
               <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light">Core Philosophy</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8] uppercase flex flex-col items-center">
              <span>Organon</span>
              <span className="text-primary italic lg:ml-24 -mt-4 opacity-100">Medicine</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/60 max-w-4xl mx-auto font-medium leading-tight tracking-tight">
              Master the logic of healing through Samuel Hahnemann's definitive work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
         <div className="flex flex-wrap justify-center gap-4 p-4 bg-bg-secondary rounded-[3rem] border border-border shadow-soft sticky top-24 z-40 backdrop-blur-xl">
            {parts.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePart(i)}
                className={`px-8 py-4 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                  activePart === i 
                  ? 'bg-primary text-white shadow-xl shadow-primary/30 -translate-y-1' 
                  : 'text-text-secondary hover:bg-bg-primary hover:text-primary'
                }`}
              >
                {p.icon}
                {p.title}
              </button>
            ))}
         </div>
      </section>

      {/* Dynamic Content */}
      <section className="max-w-7xl mx-auto px-4">
         <AnimatePresence mode="wait">
            <motion.div
              key={activePart}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
               {parts[activePart].content}
            </motion.div>
         </AnimatePresence>
      </section>
      
      {/* Visual Quote */}
      <section className="max-w-5xl mx-auto px-4 mt-40">
         <div className="p-20 rounded-[5rem] bg-text-primary text-white text-center relative overflow-hidden group">
            <Quote className="absolute top-10 left-10 w-40 h-40 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 space-y-8">
               <h3 className="text-4xl font-display font-black italic tracking-tight leading-tight">
                 "The truth we mortals need... <br/>The all-wise slightly covered over, <br/>but did not bury deep."
               </h3>
               <div className="w-20 h-1 bg-primary mx-auto" />
               <p className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Dr. Samuel Hahnemann</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default OrganonMedicine;
