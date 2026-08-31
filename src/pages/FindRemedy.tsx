import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { FIND_REMEDY_CONTENT } from '../data/findRemedyData';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowLeft, Search, ShieldCheck, ChevronRight, Hash, Type, AlignLeft, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RemedySection {
  title: string;
  id: string;
  content: string;
  letter: string;
}

const REMEDY_MAP: Record<string, string> = {
  'Abies nig.': 'abies-nigra',
  'Aceticum acidum': 'aceticum-acidum',
  'Ammonium carb.': 'ammonium-carbonicum',
  'Medorrhinum': 'medorrhinum',
  'Podophyllum': 'podophyllum-peltatum',
  'Stramonium': 'stramonium',
  'Ambra grisea': 'ambra-grisea',
  'Apocynum can.': 'apocynum-cannabinum',
  'Calcarea carb.': 'calcarea-carbonica',
  'Carbo veg.': 'carbo-vegetabilis',
  'Lycopodium': 'lycopodium-clavatum',
  'Magnesium phos.': 'magnesia-phosphorica',
  'Sulphur': 'sulphur',
  'Aconitum nap.': 'aconitum-napellus',
  'Aletris far.': 'aletris-farinosa',
  'Apis mel.': 'apis-mellifica',
  'Arnica mont.': 'arnica-montana',
  'Ipecacuanha': 'ipecacuanha',
  'Secale cor.': 'secale-cornutum',
  'Viburnum prun.': 'viburnum-prunifolium',
  'Belladonna': 'belladonna',
  'Hepar sulphuris': 'hepar-sulphuris-calcareum',
  'Myristica seb.': 'myristica-sebifera',
  'Silicea': 'silicea-terra',
  'Argentum nit.': 'argentum-nitricum',
  'Iris vers.': 'iris-versicolor',
  'Natrium phos.': 'natrum-phosphoricum',
  'Nux vomica': 'nux-vomica',
  'Robinia': 'robinia-pseudo-acacia',
  'Berberis aq.': 'berberis-aquifolium',
  'Kalium brom.': 'kali-bromatum',
  'Pulsatilla nig.': 'pulsatilla-nigricans',
  'Thuja occ.': 'thuja-occidentalis',
  'Agraphis nutans': 'agraphis-nutans',
  'Baryta iod.': 'baryta-iodata',
  'Calcarea phos.': 'calcarea-phosphorica',
  'Echinacea': 'echinacea-angustifolia',
  'Camphora': 'camphora',
  'Tuberculinum': 'tuberculinum-bovinum',
  'Serum anguillae': 'serum-anguillae',
  'Vesicaria': 'vesicaria-communis',
  'Acidum sulph.': 'sulphuricum-acidum',
  'Quercus': 'quercus-robur',
  'Allium cepa': 'allium-cepa',
  'Histaminum': 'histaminum-hydrochloricum',
  'Natrium mur.': 'natrum-muriaticum',
  'Acidum fluor.': 'fluoricum-acidum',
  'Phosphorus': 'phosphorus',
  'Thymus serpyllum': 'thymus-serpyllum',
  'Gossypium': 'gossypium-herbaceum',
  'Senecio aur.': 'senecio-aureus',
  'Ferrum phos.': 'ferrum-phosphoricum',
  'Lecithinum': 'lecithinum',
  'Cactus': 'cactus-grandiflorus',
  'Latrodectus mac.': 'latrodectus-mactans',
  'Terminalia arjuna': 'terminalia-arjuna',
  'Aesculus hip.': 'aesculus-hippocastanum',
  'Nitricum acidum': 'nitricum-acidum',
  'Gelsemium': 'gelsemium-sempervirens',
  'Iris tenax': 'iris-tenax',
  'Bryonia alba': 'bryonia-alba',
  'Ledum pal.': 'ledum-palustre',
  'Rhus tox.': 'rhus-toxicodendron',
  'Arsenicum alb.': 'arsenicum-album',
  'Blatta orient.': 'blatta-orientalis',
  'Berberis vulg.': 'berberis-vulgaris',
  'Lachesis': 'lachesis-muta',
  'Crataegus oxy.': 'crataegus-oxyacantha',
  'Viscum alb.': 'viscum-album',
  'Phytolacca dec.': 'phytolacca-decandra',
  'Sabal ser.': 'sabal-serrulata',
  'Asterias rub.': 'asterias-rubens',
  'Hydrastis': 'hydrastis-canadensis',
  'Scrophularia nodosa': 'scrophularia-nodosa',
  'Veratrum alb.': 'veratrum-album',
  'Allium sativum': 'allium-sativum',
  'Alumina': 'alumina',
  'Kalium mur.': 'kali-muriaticum',
  'Chenopodium': 'chenopodium-anthelminticum',
  'Aurum met.': 'aurum-metallicum',
  'Ignatia amara': 'ignatia-amara',
  'Kalium phos.': 'kali-phosphoricum',
  'Insulinum': 'insulinum',
  'Syzygium jamb.': 'syzygium-jambolanum',
  'Uranium nit.': 'uranium-nitricum',
  'Aloe soc.': 'aloe-socotrina',
  'Graphites': 'graphites',
  'Psorinum': 'psorinum',
  'Hydrocyanicum': 'hydrocyanicum-acidum',
  'Artemisia vulg.': 'artemisia-vulgaris',
  'Baptisia': 'baptisia-tinctoria',
  'Chelidonium': 'chelidonium-majus',
  'Cholesterinum': 'cholesterinum',
  'Sanguinaria': 'sanguinaria-canadensis',
  'Digitalis': 'digitalis-purpurea',
  'Hamamelis': 'hamamelis-virginiana',
  'Selenium met.': 'selenium-metallicum',
  'Damiana': 'damiana',
  'Sepia': 'sepia-succus',
  'Carduus mar.': 'carduus-marianus',
  'Ficus rel.': 'ficus-religiosa',
  'Trillium pend.': 'trillium-pendulum',
  'Phytolacca berry': 'phytolacca-decandra',
  'Fucus ves.': 'fucus-vesiculosus',
  'Causticum': 'causticum',
  'Hydrangea': 'hydrangea-arborescens',
  'Colocynthis': 'colocynthis',
  'Borax': 'borax-veneta',
  'Viburnum op.': 'viburnum-opulus',
  'Plantago': 'plantago-major',
  'Kreosotum': 'kreosotum',
  'Thyreoidinum': 'thyreoidinum',
  'Iodium': 'iodium',
  'Baryta carb.': 'baryta-carbonica',
  'Arsenicum iod.': 'arsenicum-iodatum',
  'Calcarea fluor.': 'calcarea-fluorica',
  'Cantharis': 'cantharis-vesicatoria',
  'Sarsaparilla': 'sarsaparilla-officinalis',
  'Teucrium mar.': 'teucrium-marum-verum',
  'Pareira brava': 'pareira-brava',
  'Spigelia': 'spigelia-anthelmia',
  'Bismuth': 'bismuthum-oxidatum'
};

const linkifyText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const fullBoldContent = part.slice(2, -2);
      
      let matchedId = '';
      let matchedKey = '';
      
      for (const [key, value] of Object.entries(REMEDY_MAP)) {
        if (fullBoldContent.startsWith(key)) {
          matchedId = value;
          matchedKey = key;
          break;
        }
      }

      if (matchedId) {
        const restOfContent = fullBoldContent.slice(matchedKey.length);
        return (
          <span key={i}>
            <Link 
              to={`/remedy/${matchedId}`}
              className="text-emerald-700 hover:text-amber-600 underline underline-offset-4 decoration-emerald-200 hover:decoration-amber-400 font-black transition-all inline-flex items-center gap-0.5"
            >
              {matchedKey}
              <ExternalLink className="w-2.5 h-2.5 opacity-40" />
            </Link>
            <strong className="font-bold">{restOfContent}</strong>
          </span>
        );
      }
      return <strong key={i} className="font-bold">{fullBoldContent}</strong>;
    }
    return part;
  });
};

export default function FindRemedy() {
  const [searchTerm, setSearchQuery] = useState('');
  
  const sections = useMemo(() => {
    const lines = FIND_REMEDY_CONTENT.split('\n');
    const result: RemedySection[] = [];
    let currentSection: RemedySection | null = null;
    let currentContent: string[] = [];

    lines.forEach((line) => {
      if (line.startsWith('### ')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          result.push(currentSection);
        }
        const title = line.replace('### ', '').trim();
        currentSection = {
          title,
          id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          content: '',
          letter: title[0].toUpperCase()
        };
        currentContent = [];
      } else if (currentSection) {
        currentContent.push(line);
      }
    });

    if (currentSection) {
      currentSection.content = currentContent.join('\n');
      result.push(currentSection);
    }

    return result;
  }, []);

  const alphabet = useMemo(() => {
    const letters = new Set(sections.map(s => s.letter));
    return Array.from(letters).sort();
  }, [sections]);

  const filteredSections = useMemo(() => {
    if (!searchTerm) return sections;
    const lowerSearch = searchTerm.toLowerCase();
    return sections.filter(s => 
      s.title.toLowerCase().includes(lowerSearch) || 
      s.content.toLowerCase().includes(lowerSearch)
    );
  }, [sections, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#433422] pb-24 selection:bg-primary selection:text-white">
      <SEO 
        title="Find Your Remedy | Clinical Homoeopathic Guide"
        description="Access the Illustrated Guide to Homoeopathic Treatment by Dr. Harbans Singh Khaneja. Browse alphabetically arranged remedies for various clinical conditions."
      />

      {/* Top Banner Disclaimer */}
      <div className="bg-[#134634] text-white py-2.5 px-4 text-center sticky top-0 z-50">
        <p className="text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          Educational Academic Resource Only • Not for Self-Prescription
        </p>
      </div>

      {/* Header */}
      <div className="sticky top-[35px] z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E9DFCB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-emerald-700 transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Back to Hub</span>
          </Link>
          
          <div className="flex items-center gap-3 flex-1 justify-center overflow-hidden">
            <BookOpen className="w-5 h-5 text-primary shrink-0" />
            <h1 className="font-serif text-lg md:text-xl font-black italic tracking-tight truncate">
              Find Your Remedy
            </h1>
          </div>

          <div className="relative hidden lg:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary" />
            <input 
              type="text"
              placeholder="Search clinical guide..."
              value={searchTerm}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E9DFCB] rounded-full text-xs focus:outline-none focus:border-primary shadow-inner"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: TOC & Letters */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-[120px] lg:h-[calc(100dvh-180px)] overflow-y-auto no-scrollbar pb-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/60 flex items-center gap-2 px-1">
                  <Type className="w-3.5 h-3.5" />
                  Alphabetical Navigator
                </span>
                <div className="grid grid-cols-6 gap-1.5">
                  {alphabet.map(letter => (
                    <button
                      key={letter}
                      onClick={() => {
                        const firstSection = sections.find(s => s.letter === letter);
                        if (firstSection) scrollToSection(firstSection.id);
                      }}
                      className="aspect-square flex items-center justify-center rounded-lg bg-white border border-[#E9DFCB] text-[11px] font-black hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90 shadow-sm"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#E9DFCB]">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/60 flex items-center gap-2 px-1">
                  <AlignLeft className="w-3.5 h-3.5" />
                  Jump to Section
                </span>
                <div className="space-y-1 pr-2 max-h-[40vh] overflow-y-auto no-scrollbar">
                  {sections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="w-full text-left px-3 py-2 text-[11px] font-bold text-[#5C4B37] hover:text-primary hover:bg-emerald-50 rounded-lg transition-colors truncate border border-transparent hover:border-emerald-100"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disclaimer Card */}
              <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Clinical Notice</span>
                </div>
                <p className="text-[10px] text-emerald-700/80 leading-relaxed italic">
                  Remedy matches are symptomatic. Individual case history is paramount in Homoeopathic prescribing.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-9 space-y-12">
            {/* Hero Meta Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-10 md:p-16 rounded-[3rem] bg-white border border-[#E9DFCB] shadow-soft overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative space-y-6">
                <span className="inline-block px-4 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  Digital Academic Edition
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-black leading-[1.1] text-primary">
                  Illustrated Guide to <br />
                  <span className="italic text-amber-600">Homoeopathic Treatment</span>
                </h2>
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-emerald-100" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-800/40 italic">By Dr. Harbans Singh Khaneja</span>
                  <div className="h-px flex-1 bg-emerald-100" />
                </div>
                <p className="text-sm md:text-lg font-serif italic text-[#5C4B37] max-w-2xl leading-relaxed">
                  A comprehensive clinical reference providing direct symptomatic remedy matches for practitioners, scholars, and advanced students of Homoeopathy.
                </p>
              </div>
            </motion.div>

            {/* Medical Warning Box */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-700" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-black uppercase tracking-widest text-amber-900">Important Medical Disclaimer</h4>
                <p className="text-xs md:text-sm text-amber-800 leading-relaxed font-serif italic">
                  This database is provided for <strong>academic and educational purposes only</strong>. Homoeopathic remedies are prescribed based on the totality of symptoms and individual constitution. Do not attempt self-prescription for serious, chronic, or acute clinical conditions. Always consult a registered medical professional.
                </p>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input 
                type="text"
                placeholder="Search clinical conditions..."
                value={searchTerm}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#E9DFCB] rounded-2xl text-sm focus:outline-none focus:border-primary shadow-sm"
              />
            </div>

            {/* Sections Grid */}
            <div className="space-y-10">
              <AnimatePresence mode="popLayout">
                {filteredSections.map((section, idx) => (
                  <motion.div 
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-[2.5rem] border border-[#E9DFCB] shadow-soft overflow-hidden group hover:border-primary transition-all scroll-mt-48"
                  >
                    {/* Section Header with Background */}
                    <div className="bg-emerald-50/30 border-b border-[#E9DFCB] px-6 md:px-10 py-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-serif font-black text-2xl italic shadow-md group-hover:scale-110 transition-transform">
                          {section.letter}
                        </div>
                        <div className="space-y-0.5 text-left">
                          <h3 className="text-2xl md:text-3xl font-serif font-black text-primary tracking-tight">
                            {section.title}
                          </h3>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800/40">Clinical Repertory Entry</span>
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col items-end opacity-40">
                         <span className="text-[10px] font-black uppercase tracking-widest">Index REF</span>
                         <span className="text-xl font-serif italic font-black">#{idx + 1}</span>
                      </div>
                    </div>

                    <div className="p-6 md:p-10 space-y-8">
                      <div className="space-y-6">
                        {section.content.split('\n').map((line, i) => {
                          if (line.startsWith('#### ')) {
                            return (
                              <h4 key={i} className="text-xs font-black uppercase tracking-[0.2em] text-emerald-800/70 mt-8 mb-4 flex items-center gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 w-fit">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {line.replace('#### ', '')}
                              </h4>
                            );
                          }
                          if (line.trim().startsWith('* ')) {
                            const cleanLine = line.replace('* ', '');
                            return (
                              <div key={i} className="flex gap-4 items-start bg-bg-secondary/20 p-5 rounded-2xl border border-border/40 hover:border-primary/20 transition-all hover:shadow-sm">
                                <div className="mt-1.5 shrink-0">
                                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
                                </div>
                                <div className="text-[#433422] leading-relaxed text-sm md:text-base font-serif">
                                  {linkifyText(cleanLine)}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>

                      <div className="pt-8 border-t border-[#E9DFCB]/60 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                             <Info className="w-3 h-3 text-emerald-700" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">Ref: Khaneja 3rd Ed.</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-amber-600 transition-colors"
                        >
                          Back to Top
                          <ChevronRight className="w-3 h-3 -rotate-90" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredSections.length === 0 && (
                <div className="py-20 text-center space-y-6 bg-white border border-dashed border-[#E9DFCB] rounded-[3rem]">
                  <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-10 h-10 text-text-tertiary opacity-40" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-serif font-black text-text-primary italic">No clinical matches found</p>
                    <p className="text-sm text-text-tertiary">Try searching for broader clinical terms or condition names.</p>
                  </div>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-2 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                  >
                    Clear Search Query
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Final Disclaimer */}
            <div className="p-10 md:p-16 bg-[#134634] rounded-[3.5rem] text-center space-y-8 relative overflow-hidden shadow-xl">
               {/* Decorative patterns */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              
              <div className="relative space-y-6 max-w-3xl mx-auto">
                <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
                <h4 className="text-xl md:text-2xl font-serif font-black italic text-white tracking-tight">Academic & Clinical Responsibility</h4>
                <p className="text-sm md:text-base text-emerald-50 leading-relaxed font-medium">
                  The information presented in this digital adaptation of "Find Your Remedy" is for educational and scholarly reference only. Clinical success in Homoeopathy depends on careful individualisation and adherence to the principles of the Organon of Medicine.
                </p>
                <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-6">
                  <Link to="/medical-disclaimer" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1">Full Legal Disclaimer</Link>
                  <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1">Contact Editorial Board</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
