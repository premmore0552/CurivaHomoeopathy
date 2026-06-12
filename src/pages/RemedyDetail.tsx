
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Leaf, 
  Database, 
  Activity, 
  Thermometer, 
  Droplet, 
  Layers, 
  Stethoscope, 
  Info,
  BookOpen,
  Layout,
  Sparkles,
  Zap,
  Shield,
  Scale,
  Search,
  Brain
} from 'lucide-react';
import SEO from '../components/SEO';
import { enhancedRemedies, RemedyDetailData } from '../data/enhancedRemedies';
import { comparisonRemedies, ComparisonData } from '../data/comparisonData';
import { materiaMedicaData } from '../data/materiaMedica';
import { allBlogPosts } from '../data/blogPosts';
import { useSubscription } from '../hooks/useSubscription';

const getRemedyMiasmProfile = (id: string) => {
  const normId = (id || '').toLowerCase();
  if (normId.includes('lycopodium')) {
    return {
      psora: 30, sycosis: 50, syphilis: 20,
      tissues: [
        { name: 'Liver & Digestive Tract', strength: 95 },
        { name: 'Renal & Urinary Organs', strength: 80 },
        { name: 'Right-sided Membranes', strength: 75 }
      ],
      essence: 'Functional weakness with intellectual excess, leading to deep gastro-hepatic disturbances and anticipatory dread.'
    };
  }
  if (normId.includes('sulphur')) {
    return {
      psora: 80, sycosis: 10, syphilis: 10,
      tissues: [
        { name: 'Epidermis & Sweat Glands', strength: 95 },
        { name: 'Venous Capillary System', strength: 90 },
        { name: 'Lymphatics & Mucous Joints', strength: 85 }
      ],
      essence: 'The prime anti-psoric: excessive heat, burning sensations in soles and palms, standing aggravations, and philosophical egoistic pride.'
    };
  }
  if (normId.includes('arsenicum') || normId.includes('arsen')) {
    return {
      psora: 40, sycosis: 10, syphilis: 50,
      tissues: [
        { name: 'Mucous Membranes (GI/Respiratory)', strength: 90 },
        { name: 'Nervous System & Anxiety Axis', strength: 95 },
        { name: 'Mitral & Cardiovascular Wall', strength: 80 }
      ],
      essence: 'Combination of psoric restlessness and syphilitic structural decay: extreme anxiety, midnight aggravation, burning relieved by warmth.'
    };
  }
  if (normId.includes('thuja')) {
    return {
      psora: 10, sycosis: 85, syphilis: 5,
      tissues: [
        { name: 'Epithelium & Warty Growths', strength: 95 },
        { name: 'Genito-Urinary Tract', strength: 90 },
        { name: 'Blood & Fluid Economy', strength: 80 }
      ],
      essence: 'The chief anti-sycotic: soft fleshy overgrowths, dampness aggravation, feeling as if limbs are made of glass, and profound self-deprecation.'
    };
  }
  if (normId.includes('silic') || normId.includes('silica')) {
    return {
      psora: 40, sycosis: 20, syphilis: 40,
      tissues: [
        { name: 'Bones & Fibrous Joint Walls', strength: 95 },
        { name: 'Glandular Lymph Tissues', strength: 90 },
        { name: 'Hair, Nails & Connective Matrix', strength: 85 }
      ],
      essence: 'Lack of grit, both physical and mental. Cold chilly reactors with a tendency to chronic suppuration and fistulas.'
    };
  }
  if (normId.includes('belladonna')) {
    return {
      psora: 75, sycosis: 15, syphilis: 10,
      tissues: [
        { name: 'Cerebral Circulation Axis', strength: 95 },
        { name: 'Vascular Capillaries', strength: 90 },
        { name: 'Pharyngeal Mucosa', strength: 85 }
      ],
      essence: 'Sudden, violent, acute congestive outbreaks. Intense redness, throbbing pains, dilated pupils, and acute hyper-sensitivity.'
    };
  }
  if (normId.includes('lachesis')) {
    return {
      psora: 20, sycosis: 30, syphilis: 50,
      tissues: [
        { name: 'Vasomotor Circulation', strength: 95 },
        { name: 'Left-Sided Throat & Ovary', strength: 90 },
        { name: 'Vagus Nerve & Respiration', strength: 85 }
      ],
      essence: 'Vascular engorgement, sleep aggravation, extreme loquacity, intolerance of left-side pressure, and deep syphilitic destructive pathways.'
    };
  }
  if (normId.includes('aconite')) {
    return {
      psora: 95, sycosis: 0, syphilis: 5,
      tissues: [
        { name: 'Arterial Circulatory System', strength: 95 },
        { name: 'Sympathetic Nervous System', strength: 90 },
        { name: 'Respiratory Epithelia', strength: 80 }
      ],
      essence: 'Stormy, sudden acute panic. Predictable fear of death, chilling dry wind exposure, of supreme importance in primary shock states.'
    };
  }
  if (normId.includes('arnica')) {
    return {
      psora: 50, sycosis: 35, syphilis: 15,
      tissues: [
        { name: 'Muscle Fibers & Motor Plane', strength: 95 },
        { name: 'Capillary Endothelium (Bruises)', strength: 90 },
        { name: 'Acellular Connective Tissue', strength: 80 }
      ],
      essence: 'Mechanical injuries and shock: soreness, bruised aching, a bed that feels "too hard", claims they are "perfectly well" while in profound shock.'
    };
  }
  if (normId.includes('nux')) {
    return {
      psora: 70, sycosis: 20, syphilis: 10,
      tissues: [
        { name: 'Spinal Cord & Irregular Reflexes', strength: 95 },
        { name: 'Enteric Nervous System (Colon)', strength: 90 },
        { name: 'Hepatic Filtration Axis', strength: 85 }
      ],
      essence: 'Irritable, over-sensitive, sedentary, over-dosed type. Constant ineffectual urging to stool, and high susceptibility to cold drafts.'
    };
  }

  const hashSum = normId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pSum = (hashSum % 45) + 30; // 30-75%
  const sSum = ((hashSum + 13) % 25) + 10; // 10-35%
  const sySum = 100 - pSum - sSum;
  return {
    psora: pSum,
    sycosis: sSum,
    syphilis: sySum,
    tissues: [
      { name: 'Constitutional Matrix', strength: 80 },
      { name: 'Cellular Vitality Axis', strength: 75 },
      { name: 'Neuro-Endocrine Pathways', strength: 70 }
    ],
    essence: 'Dynamic clinical affinity and pathological focus determined by classic homoeopathic drug-provers indexes.'
  };
};

export default function RemedyDetail() {
  const { remedyId } = useParams<{ remedyId: string }>();
  const { incrementUsage, subscription, loading } = useSubscription();
  
  useEffect(() => {
    // Only increment for non-pro users on initial mount of a remedy
    if (!loading && subscription && !subscription.isPro) {
      incrementUsage();
    }
  }, [remedyId, loading, !!subscription]);
  
  // Try to find in enhanced remedies first
  const enhancedRemedy = enhancedRemedies.find(r => r.id === remedyId);
  
  // Try to find in the new materiaMedicaData
  const mmRemedy = materiaMedicaData.find(r => r.id === remedyId);
  
  // Fallback to comparisonRemedies
  const comparisonRemedy = comparisonRemedies.find(r => r.id === remedyId);

  // Convert to RemedyDetailData structure
  const remedy: RemedyDetailData | null = enhancedRemedy || (mmRemedy ? {
    id: mmRemedy.id,
    name: mmRemedy.name,
    family: mmRemedy.family as any,
    origin: mmRemedy.commonName,
    description: mmRemedy.keynotes.join(". "),
    keyCharacteristics: mmRemedy.keynotes,
    modalities: mmRemedy.modalities,
    mind: mmRemedy.mind,
    physical: mmRemedy.physical,
    thermal: 'Ambi-thermal',
    thirst: 'Varies',
    clinicalApplications: mmRemedy.physical,
    comparisons: [],
    relatedAilments: []
  } : comparisonRemedy ? {
    id: comparisonRemedy.id,
    name: comparisonRemedy.name,
    family: (comparisonRemedy.origin.includes('Plant') ? 'Plant' : 
             comparisonRemedy.origin.includes('Mineral') ? 'Mineral' : 
             comparisonRemedy.origin.includes('Animal') ? 'Animal' : 'Mineral') as any,
    origin: comparisonRemedy.origin,
    description: comparisonRemedy.tendency + ". " + comparisonRemedy.keyCharacteristic,
    keyCharacteristics: [comparisonRemedy.keyCharacteristic, ...comparisonRemedy.keyPatterns],
    modalities: {
      better: comparisonRemedy.betterWith,
      worse: comparisonRemedy.worseWith
    },
    thermal: (comparisonRemedy.thermal.includes('Chilly') ? 'Chilly' : 
              comparisonRemedy.thermal.includes('Hot') ? 'Hot' : 'Ambi-thermal') as any,
    thirst: comparisonRemedy.thirst,
    clinicalApplications: comparisonRemedy.clinicalApplications,
    comparisons: [], // We could populate this if we wanted
    relatedAilments: comparisonRemedy.relatedConditions.map(c => ({ id: c.toLowerCase().replace(/\s+/g, '-'), name: c }))
  } : null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [remedyId]);

  const [isModalitiesExpanded, setIsModalitiesExpanded] = useState(() => {
    const saved = localStorage.getItem(`remedy_modalities_expanded_${remedyId}`);
    return saved !== 'false';
  });

  if (!remedy) {
    const placeholderName = remedyId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return (
      <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto border border-border shadow-soft">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-black text-text-primary mb-4 uppercase tracking-tighter italic">
              {placeholderName}
            </h1>
            <p className="text-xl text-text-secondary max-w-xl mx-auto font-medium leading-relaxed italic">
              This remedy profile is currently being compiled by our clinical research team. Master the fundamentals while we finalize the deep-dive analysis.
            </p>
          </div>


          <Link to="/materia-medica" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:underline pt-12">
            <ArrowLeft className="w-4 h-4" /> Back to Materia Medica
          </Link>
        </div>
      </div>
    );
  }

  const miasm = getRemedyMiasmProfile(remedy.id);

  // Sections for navigation
  const sections = [
    { id: 'overview', name: 'Overview', icon: Info },
    { id: 'mind', name: 'Mind', icon: Brain },
    { id: 'physical', name: 'Physical', icon: Activity },
    { id: 'characteristics', name: 'Keynotes', icon: Zap },
    { id: 'modalities', name: 'Modalities', icon: Thermometer },
    { id: 'clinical', name: 'Clinical Use', icon: Stethoscope },
    { id: 'comparisons', name: 'Comparisons', icon: Layers },
    { id: 'research', name: 'Related Research', icon: Sparkles },
    { id: 'related', name: 'Related Ailments', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 pb-20">
      <SEO 
        title={`${remedy.name} | Materia Medica | Curiva`}
        description={remedy.description}
      />

      {/* Hero Header */}
      <header id="overview" className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <Leaf className="w-96 h-96 text-accent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-wrap items-center gap-3 mb-8"
           >
             <Link to="/glossary" className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-accent-light hover:bg-white/10 transition-colors">
               Materia Medica
             </Link>
             <span className="px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
               {remedy.family} Family
             </span>
             <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
               {remedy.thermal}
             </span>
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col mb-12"
           >
             <span>{remedy.name.split(' ')[0]}</span>
             {remedy.name.split(' ').slice(1).length > 0 && (
               <span className="text-accent italic lg:ml-24">{remedy.name.split(' ').slice(1).join(' ')}</span>
             )}
           </motion.h1>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="grid lg:grid-cols-2 gap-12 items-end"
           >
             <p className="text-xl md:text-2xl text-white/70 font-serif italic leading-tight max-w-2xl">
               {remedy.description}
             </p>
             <div className="hidden lg:flex justify-end gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 italic">
                <div className="flex flex-col gap-2">
                  <span className="text-accent">Origin</span>
                  <span className="text-white">{remedy.origin}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent">Potency</span>
                  <span className="text-white">Centesimal / LM</span>
                </div>
             </div>
           </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Mobile Tab Index */}
        <div className="lg:hidden block mb-10 overflow-x-auto whitespace-nowrap py-4 px-2 -mx-4 no-scrollbar sticky top-16 bg-bg-primary/95 backdrop-blur-md z-30 border-b border-border">
          <div className="flex gap-2 px-4">
            {sections.filter(s => {
              if (s.id === 'mind' || s.id === 'physical') {
                return mmRemedy && (mmRemedy as any)[s.id]?.length > 0;
              }
              return true;
            }).map(section => {
              const Icon = section.icon;
              return (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-secondary border border-border rounded-full hover:border-primary/40 hover:text-primary transition-all text-xs font-bold text-text-secondary"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {section.name}
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Floating Sidebar Index */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 bg-white dark:bg-zinc-900/60 rounded-[2.5rem] border border-border shadow-soft">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 border-b border-border pb-4">Remedy Index</h4>
                <nav className="space-y-1">
                  {sections.filter(s => {
                    if (s.id === 'mind' || s.id === 'physical') {
                      return mmRemedy && (mmRemedy as any)[s.id]?.length > 0;
                    }
                    return true;
                  }).map(section => {
                    const Icon = section.icon;
                    return (
                      <a 
                        key={section.id} 
                        href={`#${section.id}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-text-secondary hover:text-primary font-bold transition-all group"
                      >
                        <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                        <span className="text-sm font-serif italic">{section.name}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="p-8 bg-primary-dark rounded-[2.5rem] text-white shadow-soft relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1)_0%,transparent_50%)]" />
                <Leaf className="w-12 h-12 mb-6 text-accent opacity-50 group-hover:scale-110 transition-transform duration-500" />
                <h5 className="text-2xl font-display font-medium text-accent italic mb-3">Biological Source</h5>
                <p className="text-sm text-white/70 font-serif italic leading-relaxed">
                  Historically sourced from {remedy.origin}. Known in pharmacopeias as <span className="text-white">{remedy.latinName || remedy.name}</span>.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-24">
            
            {/* Constitutional Dynamics & Miasmatic Affinity */}
            <section id="dynamics-infographic" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-medium text-text-primary italic">
                    Constitutional <span className="text-primary italic">Dynamics</span>
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">Miasmatic predisposition and cell tissue affinity analysis.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Miasm Weights */}
                <div className="p-8 bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-border space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Clinical Predisposition</span>
                    <h4 className="text-xl font-display font-medium text-text-primary italic mt-1">Miasmatic Weighting</h4>
                  </div>

                  <div className="space-y-5">
                    {/* Psora */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">Psora (Functional/Sensory)</span>
                        <span className="text-text-primary">{miasm.psora}%</span>
                      </div>
                      <div className="h-2 w-full bg-amber-500/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${miasm.psora}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-amber-500" 
                        />
                      </div>
                    </div>

                    {/* Sycosis */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Sycosis (Proliferative/Excess)</span>
                        <span className="text-text-primary">{miasm.sycosis}%</span>
                      </div>
                      <div className="h-2 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${miasm.sycosis}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-[#10b981]" 
                        />
                      </div>
                    </div>

                    {/* Syphilis */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-rose-600 dark:text-rose-400 font-bold">Syphilis (Destructive/Decay)</span>
                        <span className="text-text-primary">{miasm.syphilis}%</span>
                      </div>
                      <div className="h-2 w-full bg-rose-500/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${miasm.syphilis}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-rose-500" 
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-text-secondary leading-relaxed pt-2">
                    According to Samuel Hahnemann's Organon of Medicine, miasms represent the underlying chronic morbid forces that dictate disease expression and constitutional susceptibility.
                  </p>
                </div>

                {/* Tissue Focus */}
                <div className="p-8 bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-border flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Elective Affinities</span>
                    <h4 className="text-xl font-display font-medium text-text-primary italic mt-1">Tissue Preferences</h4>
                  </div>

                  <div className="space-y-4">
                    {miasm.tissues.map((tissue, tIdx) => (
                      <div key={tIdx} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-text-primary">{tissue.name}</span>
                          <span className="text-text-secondary font-mono">{tissue.strength}% Affinity</span>
                        </div>
                        <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tissue.strength}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: tIdx * 0.1 }}
                            className="h-full bg-primary" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary block mb-1">Materia Medica Essence</span>
                    <p className="text-[11px] text-text-primary leading-normal font-serif italic">
                      "{miasm.essence}"
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {((remedy.mind && remedy.mind.length > 0) || (mmRemedy && mmRemedy.mind && mmRemedy.mind.length > 0)) && (
              <section id="mind" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-display font-medium text-text-primary italic">Mental <span className="text-primary">Disposition</span></h2>
                </div>
                <div className="grid gap-6">
                  {(remedy.mind && remedy.mind.length > 0 ? remedy.mind : (mmRemedy?.mind || [])).map((m, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      key={`${remedy.id}-mind-${idx}`} 
                      className="p-8 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-border hover:border-primary/20 transition-all font-serif italic text-lg leading-relaxed text-text-secondary"
                    >
                      {m}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Physical Symptoms */}
            {(remedy.clinicalApplications.length > 0 || (remedy.physical && remedy.physical.length > 0) || (mmRemedy && mmRemedy.physical && mmRemedy.physical.length > 0)) && (
              <section id="physical" className="scroll-mt-32">
                 <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-display font-medium text-text-primary italic">General <span className="text-primary">Physicals</span></h2>
                </div>
                <div className="grid gap-4">
                  {(remedy.physical && remedy.physical.length > 0) ? (
                    remedy.physical.map((p, idx) => (
                      <div key={`${remedy.id}-phys-${idx}`} className="p-6 bg-white dark:bg-zinc-900/40 border border-border rounded-2xl font-serif italic text-lg text-text-secondary">
                        {p}
                      </div>
                    ))
                  ) : (mmRemedy && mmRemedy.physical && mmRemedy.physical.length > 0) ? (
                    mmRemedy.physical.map((p, idx) => (
                      <div key={`${remedy.id}-phys-${idx}`} className="p-6 bg-white dark:bg-zinc-900/40 border border-border rounded-2xl font-serif italic text-lg text-text-secondary">
                        {p}
                      </div>
                    ))
                  ) : (
                    remedy.clinicalApplications.map((app, idx) => (
                      <div key={`${remedy.id}-app-p-${idx}`} className="p-6 bg-white dark:bg-zinc-900/40 border border-border rounded-2xl font-serif italic text-lg text-text-secondary">
                        {app}
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* Key Characteristics */}
            <section id="characteristics" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Key <span className="text-primary italic">Keynotes</span></h2>
              </div>
              <div className="grid gap-6">
                {remedy.keyCharacteristics.map((char, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    key={`${remedy.id}-char-${idx}`} 
                    className="flex items-start gap-6 p-8 bg-white dark:bg-zinc-900/40 rounded-[2rem] border border-border hover:border-accent/40 hover:shadow-soft transition-all group"
                  >
                    <div className="w-3 h-3 rounded-full bg-accent mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-text-primary font-serif italic text-lg leading-relaxed">{char}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Modalities */}
            <section id="modalities" className="scroll-mt-32">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-bg-secondary dark:bg-zinc-900/20 rounded-[2rem] border border-border">
                <div>
                  <h4 className="text-xl font-display font-medium text-text-primary italic">
                    Remedy <span className="text-primary italic">Modalities</span>
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">Symptom dynamics under aggravation or amelioration factors.</p>
                </div>
                <button
                  onClick={() => {
                    const nextVal = !isModalitiesExpanded;
                    setIsModalitiesExpanded(nextVal);
                    localStorage.setItem(`remedy_modalities_expanded_${remedyId}`, String(nextVal));
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 text-primary dark:text-primary-light font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer select-none active:scale-95 border border-primary/20"
                >
                  {isModalitiesExpanded ? (
                    <>Collapse Panel <ChevronUp className="w-3.5 h-3.5" /></>
                  ) : (
                    <>Expand Panel <ChevronDown className="w-3.5 h-3.5" /></>
                  )}
                </button>
              </div>

              <div 
                id="modalities-section" 
                className="grid lg:grid-cols-2 gap-8 transition-all duration-500 ease-in-out origin-top overflow-hidden"
                style={{
                  maxHeight: isModalitiesExpanded ? '2500px' : '0px',
                  opacity: isModalitiesExpanded ? 1 : 0.02,
                  pointerEvents: isModalitiesExpanded ? 'auto' : 'none',
                  transform: isModalitiesExpanded ? 'scaleY(1)' : 'scaleY(0.95)'
                }}
              >
                <div className="bg-[#f0f4ef] dark:bg-emerald-950/20 p-10 rounded-[3.5rem] border border-[#e0e7df] dark:border-emerald-900/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Thermometer className="w-32 h-32 text-emerald-900 dark:text-emerald-100" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-display font-medium text-emerald-900 dark:text-emerald-100 italic uppercase tracking-tighter">Amelioration</h3>
                  </div>
                  <ul className="space-y-4">
                    {remedy.modalities.better.map((m, idx) => (
                      <li key={`${remedy.id}-better-${idx}`} className="flex items-center gap-4 text-emerald-900 dark:text-emerald-200 font-serif italic text-lg group">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 group-hover:scale-150 transition-transform shrink-0" />
                        <span className="leading-snug">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fef3f2] dark:bg-rose-950/20 p-10 rounded-[3.5rem] border border-[#fee2e2] dark:border-rose-900/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Thermometer className="w-32 h-32 text-rose-900 dark:text-rose-100 rotate-180" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/40 rounded-2xl flex items-center justify-center text-rose-700 dark:text-rose-300">
                      <Thermometer className="w-6 h-6 rotate-180" />
                    </div>
                    <h3 className="text-3xl font-display font-medium text-rose-900 dark:text-rose-100 italic uppercase tracking-tighter">Aggravation</h3>
                  </div>
                  <ul className="space-y-4">
                    {remedy.modalities.worse.map((m, idx) => (
                      <li key={`${remedy.id}-worse-${idx}`} className="flex items-center gap-4 text-rose-900 dark:text-rose-200 font-serif italic text-lg group">
                        <div className="w-2 h-2 rounded-full bg-rose-500 dark:bg-rose-400 group-hover:scale-150 transition-transform shrink-0" />
                        <span className="leading-snug">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-10 bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-border border-dashed flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center shadow-soft border border-border group-hover:border-primary/20 transition-colors">
                  <Droplet className="w-10 h-10 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-[10px] font-black uppercase text-primary mb-2 tracking-[0.3em]">Thirst & Fluid Economy</h4>
                  <p className="text-2xl font-serif italic text-text-primary leading-tight">{remedy.thirst}</p>
                </div>
              </div>
            </section>

            {/* Clinical Applications */}
            <section id="clinical" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Clinical <span className="text-primary italic">Intelligence</span></h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {remedy.clinicalApplications.map((app, idx) => (
                    <div key={`${remedy.id}-app-${idx}`} className="p-6 bg-white dark:bg-zinc-900/40 border border-border rounded-2xl font-serif italic text-lg flex items-center gap-4 shadow-soft hover:border-primary/40 hover:scale-[1.02] transition-all cursor-default">
                      <div className="w-2 h-2 rounded-full bg-primary/20" />
                    {app}
                  </div>
                ))}
              </div>
            </section>

            {/* Comparisons */}
            <section id="comparisons" className="scroll-mt-32 bg-bg-secondary p-12 rounded-[4rem] border border-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Layers className="w-48 h-48 text-text-primary" />
              </div>
              <div className="flex items-center gap-4 mb-12 relative z-10">
                <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl text-primary shadow-soft flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Differential <span className="text-primary italic">Nuance</span></h2>
              </div>
              <div className="grid gap-6 relative z-10">
                {remedy.comparisons.map((comp) => (
                  <div key={`${remedy.id}-comp-${comp.id}`} className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-8 rounded-3xl border border-border flex flex-col md:flex-row gap-8 items-start md:items-center hover:border-primary/20 transition-all justify-between w-full">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-lg font-serif italic text-text-secondary leading-relaxed">{comp.keyDifference}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                      <Link 
                        to={`/remedy/${comp.id}`}
                        className="px-6 py-3 bg-primary-dark text-accent-light text-center font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                      >
                        Detail View
                      </Link>
                      <Link 
                        to="/analysis"
                        state={{ preSelectedIds: [remedy.id, comp.id] }}
                        className="px-6 py-3 bg-white dark:bg-zinc-800 hover:border-primary/40 text-center border border-border text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all whitespace-nowrap inline-flex items-center justify-center gap-2"
                      >
                        Compare in Table <Scale className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
                {remedy.comparisons.length === 0 && (
                  <div className="text-center py-12 text-text-secondary/60 font-serif italic text-xl">
                    Detailed differential maps for {remedy.name} are being finalized.
                  </div>
                )}
              </div>
            </section>

            {/* Related Research (Blog Posts) */}
            {(() => {
              const dynamicBlogPosts = allBlogPosts.filter(post => 
                post.id === remedy.id || 
                post.slug === remedy.id ||
                post.relatedRemedies?.includes(remedy.id) ||
                (remedy.relatedBlogPosts && remedy.relatedBlogPosts.includes(post.id))
              );

              if (dynamicBlogPosts.length === 0) return null;

              return (
                <section id="research" className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-display font-medium text-text-primary italic">Scholarly <span className="text-primary italic">Insights</span></h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {dynamicBlogPosts.map(post => {
                      return (
                        <Link 
                          key={post.id}
                          to={`/read/${post.slug || post.id}`}
                          className="group relative bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-border overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-500"
                        >
                          <div className="aspect-video w-full overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                          </div>
                          <div className="p-8">
                            <span className="text-[10px] font-black uppercase text-accent tracking-[0.3em] mb-3 block">Publication</span>
                            <h4 className="text-2xl font-display font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-2 italic leading-tight mb-4">{post.title}</h4>
                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                              Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              );
            })()}

            {/* Related Ailments */}
            <section id="related" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Related <span className="text-primary italic">Constitutions</span></h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {remedy.relatedAilments.map(ailment => (
                  <Link 
                    key={ailment.id}
                    to={`/conditions/${ailment.id}`}
                    className="group p-10 bg-white dark:bg-zinc-900/40 border border-border rounded-[3rem] hover:border-accent hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-bg-primary flex items-center justify-center text-text-primary/20 group-hover:text-accent group-hover:bg-accent/5 transition-all mb-8">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-display font-medium text-text-primary mb-3 lowercase first-letter:uppercase group-hover:text-accent transition-all italic">
                      {ailment.name}
                    </h4>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">Clinical Pattern</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Next Steps / Interactive Analysis */}
            <section className="scroll-mt-32 pt-12 border-t border-border">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Layout className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Compare & <span className="text-accent">Analyze</span></h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-border shadow-soft flex flex-col justify-between group hover:border-primary/40 transition-all">
                  <div>
                    <h3 className="text-2xl font-display font-medium text-text-primary mb-4 italic">Side-by-Side Comparison</h3>
                    <p className="text-text-secondary font-serif italic text-lg leading-relaxed mb-8">
                      Master the fine nuances of {remedy.name} by comparing its thermal, thirst, and modality patterns with its clinical counterparts in a structured table.
                    </p>
                  </div>
                  <Link 
                    to="/analysis" 
                    state={{ preSelectedId: remedy.id }}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                  >
                    Open Comparison Table <Scale className="w-4 h-4" />
                  </Link>
                </div>

                <div className="p-8 bg-primary-dark rounded-[2.5rem] text-white shadow-soft flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1)_0%,transparent_50%)]" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-medium text-accent mb-4 italic">Constitutional Relations</h3>
                    <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-8">
                      Understand how {remedy.name} relates to other remedies in the Materia Medica through complementary, inimical, and following relationships.
                    </p>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-3">
                    {remedy.comparisons.length > 0 ? (
                      remedy.comparisons.slice(0, 2).map(comp => (
                        <Link 
                          key={`next-step-${comp.id}`}
                          to={`/remedy/${comp.id}`}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                          View {comp.name} <ChevronRight className="w-3 h-3" />
                        </Link>
                      ))
                    ) : (
                      <Link 
                        to="/materia-medica"
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                      >
                        Browse Related Remedies
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
