
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ChevronRight, 
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
          
          <div className="bg-white dark:bg-bg-secondary p-12 rounded-[4rem] border border-border shadow-2xl max-w-2xl mx-auto">
             <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
             <h3 className="text-2xl font-black text-text-primary mb-4 italic">Unlock Premium Materia Medica</h3>
             <p className="text-text-secondary mb-8 font-medium">Get instant access to clinical cases, miasmatic analysis, and advanced differential diagnosis for 200+ remedies.</p>
             <Link 
               to="/pro-plans" 
               className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
             >
               Go Pro Now <Zap className="w-4 h-4 fill-white" />
             </Link>
          </div>

          <Link to="/encyclopedia" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:underline pt-12">
            <ArrowLeft className="w-4 h-4" /> Back to Encyclopedia
          </Link>
        </div>
      </div>
    );
  }

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
        
        {remedy.imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={remedy.imageUrl} 
              alt={remedy.name} 
              className="w-full h-full object-cover opacity-20 filter grayscale" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary-dark/60" />
          </div>
        )}
        
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
             className="text-5xl md:text-8xl lg:text-[10rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col mb-12"
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
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Floating Sidebar Index */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 bg-white rounded-[2.5rem] border border-border shadow-soft">
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
                      className="p-8 bg-white rounded-[2rem] border border-border hover:border-primary/20 transition-all font-serif italic text-lg leading-relaxed text-text-secondary"
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
                      <div key={`${remedy.id}-phys-${idx}`} className="p-6 bg-white border border-border rounded-2xl font-serif italic text-lg text-text-secondary">
                        {p}
                      </div>
                    ))
                  ) : (mmRemedy && mmRemedy.physical && mmRemedy.physical.length > 0) ? (
                    mmRemedy.physical.map((p, idx) => (
                      <div key={`${remedy.id}-phys-${idx}`} className="p-6 bg-white border border-border rounded-2xl font-serif italic text-lg text-text-secondary">
                        {p}
                      </div>
                    ))
                  ) : (
                    remedy.clinicalApplications.map((app, idx) => (
                      <div key={`${remedy.id}-app-p-${idx}`} className="p-6 bg-white border border-border rounded-2xl font-serif italic text-lg text-text-secondary">
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
                    className="flex items-start gap-6 p-8 bg-white rounded-[2rem] border border-border hover:border-accent/40 hover:shadow-soft transition-all group"
                  >
                    <div className="w-3 h-3 rounded-full bg-accent mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-text-primary font-serif italic text-lg leading-relaxed">{char}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Modalities */}
            <section id="modalities" className="scroll-mt-32">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-[#f0f4ef] p-10 rounded-[3.5rem] border border-[#e0e7df] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Thermometer className="w-32 h-32 text-emerald-900" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-display font-medium text-emerald-900 italic uppercase tracking-tighter">Amelioration</h3>
                  </div>
                  <ul className="space-y-4">
                    {remedy.modalities.better.map((m, idx) => (
                      <li key={`${remedy.id}-better-${idx}`} className="flex items-center gap-4 text-emerald-800 font-serif italic text-lg group">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fef3f2] p-10 rounded-[3.5rem] border border-[#fee2e2] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Thermometer className="w-32 h-32 text-rose-900 rotate-180" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-700">
                      <Thermometer className="w-6 h-6 rotate-180" />
                    </div>
                    <h3 className="text-3xl font-display font-medium text-rose-900 italic uppercase tracking-tighter">Aggravation</h3>
                  </div>
                  <ul className="space-y-4">
                    {remedy.modalities.worse.map((m, idx) => (
                      <li key={`${remedy.id}-worse-${idx}`} className="flex items-center gap-4 text-rose-800 font-serif italic text-lg group">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:scale-150 transition-transform" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-10 bg-white rounded-[2.5rem] border border-border border-dashed flex flex-col md:flex-row items-center gap-8 group">
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
                    <div key={`${remedy.id}-app-${idx}`} className="p-6 bg-white border border-border rounded-2xl font-serif italic text-lg flex items-center gap-4 shadow-soft hover:border-primary/40 hover:scale-[1.02] transition-all cursor-default">
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
                <div className="w-12 h-12 bg-white rounded-2xl text-primary shadow-soft flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-display font-medium text-text-primary italic">Differential <span className="text-primary italic">Nuance</span></h2>
              </div>
              <div className="grid gap-6 relative z-10">
                {remedy.comparisons.map((comp) => (
                  <div key={`${remedy.id}-comp-${comp.id}`} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-border flex flex-col md:flex-row gap-8 items-start md:items-center hover:border-primary/20 transition-all">
                    <Link 
                      to={`/remedy/${comp.id}`}
                      className="px-6 py-2.5 bg-primary-dark text-accent-light font-bold text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-primary transition-all whitespace-nowrap"
                    >
                      Compare {comp.name}
                    </Link>
                    <p className="text-lg font-serif italic text-text-secondary leading-relaxed">{comp.keyDifference}</p>
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
            {remedy.relatedBlogPosts && remedy.relatedBlogPosts.length > 0 && (
              <section id="research" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl font-display font-medium text-text-primary italic">Scholarly <span className="text-primary italic">Insights</span></h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {remedy.relatedBlogPosts.map(postId => {
                    const post = allBlogPosts.find(p => p.id === postId);
                    if (!post) return null;
                    return (
                      <Link 
                        key={post.id}
                        to={`/read/${post.slug || post.id}`}
                        className="group relative bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-500"
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
            )}

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
                    className="group p-10 bg-white border border-border rounded-[3rem] hover:border-accent hover:shadow-2xl transition-all duration-500"
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
                <div className="p-8 bg-white rounded-[2.5rem] border border-border shadow-soft flex flex-col justify-between group hover:border-primary/40 transition-all">
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
                        to="/encyclopedia"
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
