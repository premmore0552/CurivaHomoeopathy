
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
  Search
} from 'lucide-react';
import SEO from '../components/SEO';
import { enhancedRemedies, RemedyDetailData } from '../data/enhancedRemedies';
import { comparisonRemedies, ComparisonData } from '../data/comparisonData';
import { allBlogPosts } from '../data/blogPosts';

export default function RemedyDetail() {
  const { remedyId } = useParams<{ remedyId: string }>();
  
  // Try to find in enhanced remedies first
  const enhancedRemedy = enhancedRemedies.find(r => r.id === remedyId);
  
  // Fallback to comparisonRemedies
  const comparisonRemedy = comparisonRemedies.find(r => r.id === remedyId);

  // Convert comparisonRemedy to RemedyDetailData structure if enhanced is missing
  const remedy: RemedyDetailData | null = enhancedRemedy || (comparisonRemedy ? {
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

  const sections = [
    { id: 'overview', name: 'Overview', icon: Info },
    { id: 'characteristics', name: 'Characteristics', icon: Activity },
    { id: 'modalities', name: 'Modalities', icon: Thermometer },
    { id: 'clinical', name: 'Clinical Use', icon: Stethoscope },
    { id: 'comparisons', name: 'Comparisons', icon: Layers },
    { id: 'research', name: 'Related Research', icon: Sparkles },
    { id: 'related', name: 'Related Ailments', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 pb-20">
      <SEO 
        title={`${remedy.name} | Remedies Library | Curiva`}
        description={remedy.description}
      />

      {/* Breadcrumbs */}
      <nav className="pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/encyclopedia" className="hover:text-primary transition-colors">Encyclopedia</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{remedy.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Floating Sidebar Index */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Quick Navigation</h4>
              <nav className="space-y-1">
                {sections.map(section => {
                  const Icon = section.icon;
                  return (
                    <a 
                      key={section.id} 
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-bg-secondary text-text-secondary hover:text-primary font-bold transition-all group"
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      <span className="text-sm">{section.name}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-12 p-6 bg-primary rounded-3xl text-white shadow-xl shadow-primary/20">
                <Leaf className="w-8 h-8 mb-4 opacity-50" />
                <h5 className="font-display font-bold mb-2">Remedy Family</h5>
                <p className="text-xs text-white/80 leading-relaxed">
                  Member of the <span className="font-black underline decoration-white/30">{remedy.family}</span> family. Origin: {remedy.origin}
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-24">
            
            {/* Hero Section */}
            <header id="overview" className="scroll-mt-32">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0 border border-primary/20 text-primary">
                  <Activity className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {remedy.family}
                    </span>
                    <span className="px-3 py-1 bg-bg-secondary text-text-secondary text-[10px] font-black uppercase tracking-widest rounded-full border border-border">
                      {remedy.thermal} Thermal
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary leading-tight">
                    {remedy.name}
                  </h1>
                  {remedy.latinName && <p className="text-xl text-primary font-bold italic">({remedy.latinName})</p>}
                  <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                    {remedy.description}
                  </p>
                </div>
              </div>
            </header>

            {/* Key Characteristics */}
            <section id="characteristics" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-bg-secondary rounded-2xl text-primary">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Key <span className="text-primary">Characteristics</span></h2>
              </div>
              <div className="grid gap-4">
                {remedy.keyCharacteristics.map((char, idx) => (
                  <div key={`${remedy.id}-char-${idx}`} className="flex items-start gap-4 p-6 bg-bg-secondary/50 rounded-3xl border border-border hover:border-primary/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                    <p className="text-text-primary font-bold leading-relaxed">{char}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Modalities */}
            <section id="modalities" className="scroll-mt-32">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-emerald-500/5 p-8 rounded-[3rem] border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600">
                      <Thermometer className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-display font-black text-emerald-800 uppercase tracking-tight">Better From</h3>
                  </div>
                  <ul className="space-y-4">
                    {remedy.modalities.better.map((m, idx) => (
                      <li key={`${remedy.id}-better-${idx}`} className="flex items-center gap-3 font-black text-emerald-700/80 text-sm">
                        <ChevronRight className="w-4 h-4 text-emerald-500" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-500/5 p-8 rounded-[3rem] border border-rose-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600">
                      <Thermometer className="w-6 h-6 rotate-180" />
                    </div>
                    <h3 className="text-2xl font-display font-black text-rose-800 uppercase tracking-tight">Worse From</h3>
                  </div>
                  <ul className="space-y-4">
                    {remedy.modalities.worse.map((m, idx) => (
                      <li key={`${remedy.id}-worse-${idx}`} className="flex items-center gap-3 font-black text-rose-700/80 text-sm">
                        <ChevronRight className="w-4 h-4 text-rose-500" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex flex-col sm:flex-row items-center gap-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-border">
                  <Droplet className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">Thirst Pattern</h4>
                  <p className="text-sm font-bold text-text-primary leading-relaxed">{remedy.thirst}</p>
                </div>
              </div>
            </section>

            {/* Clinical Applications */}
            <section id="clinical" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-12">
                <div className="p-3 bg-bg-secondary rounded-2xl text-primary">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Clinical <span className="text-primary">Applications</span></h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {remedy.clinicalApplications.map((app, idx) => (
                    <div key={`${remedy.id}-app-${idx}`} className="px-6 py-4 bg-white border border-border rounded-2xl font-bold flex items-center gap-3 shadow-soft group hover:border-primary/50 transition-all">
                      <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {app}
                  </div>
                ))}
              </div>
            </section>

            {/* Comparisons */}
            <section id="comparisons" className="scroll-mt-32 bg-bg-secondary p-10 rounded-[3.5rem] border border-border">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-white rounded-2xl text-primary shadow-soft">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">Differential <span className="text-primary italic">Diagnosis</span></h2>
              </div>
              <div className="grid gap-6">
                {remedy.comparisons.map((comp) => (
                  <div key={`${remedy.id}-comp-${comp.id}`} className="bg-white p-6 rounded-3xl border border-border flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Link 
                      to={`/remedy/${comp.id}`}
                      className="px-4 py-2 bg-primary/10 text-primary font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                    >
                      Compare with {comp.name}
                    </Link>
                    <p className="text-sm font-medium text-text-secondary">{comp.keyDifference}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Research (Blog Posts) */}
            {remedy.relatedBlogPosts && remedy.relatedBlogPosts.length > 0 && (
              <section id="research" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-bg-secondary rounded-2xl text-primary">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Related <span className="text-primary">Research</span></h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {remedy.relatedBlogPosts.map(postId => {
                    const post = allBlogPosts.find(p => p.id === postId);
                    if (!post) return null;
                    return (
                      <Link 
                        key={post.id}
                        to={`/read/${post.slug || post.id}`}
                        className="group p-6 bg-bg-secondary rounded-3xl border border-border hover:border-primary/20 transition-all flex gap-4 items-center"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                          <span className="text-[10px] uppercase font-black text-primary tracking-widest mt-1 block">Full Article</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Related Ailments (Bidirectional) */}
            <section id="related" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-bg-secondary rounded-2xl text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Related <span className="text-primary">Ailments</span></h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remedy.relatedAilments.map(ailment => (
                  <Link 
                    key={ailment.id}
                    to={`/conditions/${ailment.id}`}
                    className="group p-8 bg-white border border-border rounded-[2.5rem] hover:border-primary hover:shadow-xl transition-all duration-300"
                  >
                    <Layout className="w-8 h-8 text-primary/30 group-hover:text-primary transition-colors mb-4" />
                    <h4 className="text-xl font-display font-black text-text-primary mb-2 lowercase first-letter:uppercase group-hover:text-primary transition-all">
                      {ailment.name}
                    </h4>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest opacity-60">Explore Clinical Pattern</p>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
