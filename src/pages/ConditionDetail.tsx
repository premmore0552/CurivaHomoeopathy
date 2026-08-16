
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Activity, 
  BrainCircuit, 
  MessageCircle, 
  ChevronRight, 
  Layout, 
  Sparkles,
  Info,
  BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import { conditionsData } from '../data/conditionsData';
import { allBlogPosts } from '../data/blogPosts';
import { ContentNavigator } from '../components/ContentNavigator';

const ConditionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const condition = conditionsData.find(c => c.id === slug);
  const [copied, setCopied] = React.useState(false);

  const currentIndex = conditionsData.findIndex(c => c.id === slug);
  const prevCond = currentIndex > 0 ? conditionsData[currentIndex - 1] : null;
  const nextCond = currentIndex < conditionsData.length - 1 ? conditionsData[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!condition) {
    const placeholderTitle = slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return (
      <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4">
        <SEO 
          title={`${placeholderTitle} - Condition Overview | Curiva`} 
          description={`Preliminary information about ${placeholderTitle} and its Homoeopathic relationships.`}
        />
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto border border-border shadow-soft">
            <Activity className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-black text-text-primary mb-4">{placeholderTitle}</h1>
            <p className="text-text-secondary max-w-lg mx-auto leading-relaxed">
              Our clinical research on <span className="font-bold text-text-primary">{placeholderTitle}</span> is currently being compiled into clinical patterns and remedy relationships. 
              In classical homoeopathy, this condition is analyzed through individualized symptom profiles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/clinical-guides" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Clinical Guides
            </Link>
            <Link to="/materia-medica" className="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary font-bold rounded-2xl hover:bg-border transition-all">
              Browse Materia Medica <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = condition.icon;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: condition.title + ' | Curiva Homoeopathy',
          text: `Check out these Homoeopathic patterns for ${condition.title}`,
          url: window.location.href,
        });
      } catch (err: any) {
        // Silently catch the DOMException (AbortError: Share canceled or prompt dismissed)
        console.log('Unified sharing interaction: ', err.message || err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy selection failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 pb-20">
      <SEO 
        title={`${condition.title} | Pattern-Based Understanding | Curiva`} 
        description={`Learn the clinical patterns, better/worse factors, and Homoeopathic perspectives on ${condition.title}.`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-8">
              <div className="p-8 bg-bg-secondary rounded-[2.5rem] border border-border">
                <div className={`w-16 h-16 ${condition.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/5`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">{condition.category}</h4>
                <p className="text-sm font-bold text-text-secondary leading-relaxed">
                  Exploring clinical patterns and research-backed remedy relationships.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] shadow-soft">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-text-primary mb-4">On This Page</h5>
                <nav className="space-y-1">
                  <a href="#understanding" className="block px-4 py-2 hover:bg-bg-secondary text-sm font-bold text-text-secondary rounded-xl transition-colors">Explanation</a>
                  <a href="#patterns" className="block px-4 py-2 hover:bg-bg-secondary text-sm font-bold text-text-secondary rounded-xl transition-colors">Clinical Patterns</a>
                  <a href="#remedies" className="block px-4 py-2 hover:bg-bg-secondary text-sm font-bold text-text-secondary rounded-xl transition-colors">Related Remedies</a>
                  {condition.relatedBlogPosts && condition.relatedBlogPosts.length > 0 && (
                    <a href="#research" className="block px-4 py-2 hover:bg-bg-secondary text-sm font-bold text-text-secondary rounded-xl transition-colors">Research Articles</a>
                  )}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-20">
            
            {/* Hero */}
            <header id="understanding" className="scroll-mt-16">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-display font-black text-text-primary leading-tight">
                  {condition.title}
                </h1>
                <p className="text-xl text-text-secondary leading-relaxed max-w-3xl first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  {condition.description}
                </p>
                <div className="pt-2">
                  <ShareButton 
                    title={condition.title} 
                    text={`Clinical patterns and Homoeopathic perspectives on ${condition.title}`} 
                    variant="outline" 
                    label="Share Condition Notes" 
                  />
                </div>
              </div>
            </header>

            {/* Patterns */}
            <section id="patterns" className="scroll-mt-16">
              <div className="flex items-center gap-3 mb-10">
                <BrainCircuit className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-display font-black text-text-primary italic">Pattern-Based <span className="text-primary italic">Understanding</span></h2>
              </div>

              <div className="grid gap-8">
                {condition.patterns.map((pattern, idx) => (
                  <motion.div 
                    key={`${condition.id}-pattern-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-bg-secondary/50 p-10 rounded-[3.5rem] border border-border group hover:border-primary/20 transition-all shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-black text-text-primary group-hover:text-primary transition-colors italic underline underline-offset-8 decoration-primary/10">
                          {pattern.name}
                        </h3>
                        <p className="text-text-secondary font-bold leading-relaxed">
                          {pattern.tendency}
                        </p>
                      </div>
                      <div className="md:w-72 space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Characteristic Modalities</h4>
                        {pattern.modalities.map((mod, mIdx) => (
                          <div key={`${condition.id}-pattern-${idx}-mod-${mIdx}`} className="bg-white dark:bg-zinc-900/60 p-4 rounded-2xl border border-border text-[11px] font-bold text-text-primary flex items-start gap-4 shadow-soft">
                            <Sparkles className="w-4 h-4 text-primary shrink-0 opacity-40" />
                            {mod}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Related Remedies (The Connective Tissue) */}
            <section id="remedies" className="scroll-mt-16">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-bg-secondary rounded-2xl text-primary">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight">Related <span className="text-primary">Remedies</span></h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {condition.relatedRemedies.map(remedy => (
                  <Link 
                    key={`${condition.id}-remedy-${remedy.id}`}
                    to={`/remedy/${remedy.id}`}
                    className="group"
                  >
                    <div className="h-full p-8 bg-white dark:bg-zinc-900/60 border border-border rounded-[2.5rem] hover:border-primary hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all translate-x-1/2 -translate-y-1/2" />
                      <div className="relative z-10">
                        <Layout className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors mb-6" />
                        <h4 className="text-xl font-display font-black text-text-primary mb-3 group-hover:text-primary transition-all">
                          {remedy.name}
                        </h4>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary group-hover:translate-x-2 transition-transform">
                          View Materia Medica
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Related Research (Blog Posts) */}
            {condition.relatedBlogPosts && condition.relatedBlogPosts.length > 0 && (
              <section id="research" className="scroll-mt-16">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-3 bg-bg-secondary rounded-2xl text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">Clinical <span className="text-primary italic">Research Articles</span></h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {condition.relatedBlogPosts.map(postId => {
                    const post = allBlogPosts.find(p => p.id === postId);
                    if (!post) return null;
                    return (
                      <Link 
                        key={post.id}
                        to={`/read/${post.slug || post.id}`}
                        className="group p-6 bg-white border border-border rounded-[2.5rem] hover:border-primary/20 transition-all shadow-soft flex items-center gap-6"
                      >
                        <div className="w-20 h-20 bg-bg-secondary rounded-2xl overflow-hidden shrink-0">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-primary tracking-widest block mb-1">Knowledge Hub</span>
                          <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Action Section */}
            <div className="p-12 bg-primary rounded-[4rem] text-white overflow-hidden relative shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest">
                  Educational Researcher Toolkit
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-black leading-tight italic">
                  Continue Your <span className="text-primary-light italic">Clinical Research</span>
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto font-medium">
                  Each remedy relationship is based on classical Homoeopathic principles. Explore the full A-Z Encyclopedia to understand the deeper materia medica of these therapeutic agents.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    to="/materia-medica"
                    className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                  >
                    Encyclopedia A-Z
                  </Link>
                  <button 
                    onClick={handleShare}
                    className="px-8 py-4 bg-primary-light text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all border border-white/20 flex items-center gap-2 min-w-[200px] justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {copied ? 'Link Copied!' : 'Share This Research'}
                  </button>
                </div>
              </div>
            </div>

            {/* Previous / Next Condition Navigation */}
            <ContentNavigator 
              prev={prevCond ? { to: `/condition/${prevCond.id}`, title: prevCond.title, label: 'Previous Condition' } : null}
              next={nextCond ? { to: `/condition/${nextCond.id}`, title: nextCond.title, label: 'Next Condition' } : null}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionDetail;
