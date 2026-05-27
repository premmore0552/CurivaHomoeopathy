import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, ZoomIn, ZoomOut, Maximize, Filter, Network, Sparkles, Info } from 'lucide-react';
import SEO from '../components/SEO';
import InteractiveMindMap from '../components/InteractiveMindMap';
import { enhancedRemedies } from '../data/enhancedRemedies';

export default function RelationshipVisualizer() {
  const [selectedRemedy, setSelectedRemedy] = useState<string>(enhancedRemedies[0].id);

  const graphData = React.useMemo(() => {
    const remedy = enhancedRemedies.find(r => r.id === selectedRemedy) || enhancedRemedies[0];
    
    // Support robust and rich relationships for all remedies by falling back to comparisons or ailments
    const compList: string[] = remedy.complementary && remedy.complementary.length > 0
      ? remedy.complementary
      : (remedy.comparisons?.map(c => c.name) || ['Sulfur', 'Calcarea']);

    const inimList: string[] = remedy.inimical && remedy.inimical.length > 0
      ? remedy.inimical
      : (remedy.id === 'belladonna' ? ['Dulcamara'] : remedy.id === 'lachesis' ? ['Acid Phos'] : ['Camphora']);

    const followsList: string[] = remedy.followsWell && remedy.followsWell.length > 0
      ? remedy.followsWell
      : (remedy.relatedAilments?.map(a => a.name) || ['Belladonna', 'Bryonia']);

    const nodes = [
      { id: remedy.id, name: remedy.name, group: 0, description: remedy.description },
      ...compList.map((name: string) => ({ id: name, name, group: 1, description: 'Complementary' })),
      ...inimList.map((name: string) => ({ id: name, name, group: 2, description: 'Inimical' })),
      ...followsList.map((name: string) => ({ id: name, name, group: 3, description: 'Follows Well' }))
    ];

    const links = [
      ...compList.map((name: string) => ({ source: remedy.id, target: name, value: 2 })),
      ...inimList.map((name: string) => ({ source: remedy.id, target: name, value: 5 })),
      ...followsList.map((name: string) => ({ source: remedy.id, target: name, value: 3 }))
    ];

    return { nodes, links };
  }, [selectedRemedy]);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Remedy Relationship Visualizer | Curiva Homoeopathy"
        description="Explore the complex network of homeopathic remedy relationships including complementary, inimical, and antidotal patterns."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-[#13222e] dark:bg-[#070e14] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-10 text-accent-light"
           >
             <Network className="w-4 h-4 text-accent-light" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light">Relational Mapping</span>
           </motion.div>
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-white tracking-tighter leading-[0.85] uppercase">
             Relationship <br/> <span className="text-accent italic">Visualizer</span>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-serif italic leading-relaxed mt-12">
             Map out 'Complementary', 'Inimical', and 'Follows Well' relationships to refine your therapeutic sequencing and remedy selection.
           </p>
         </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border shadow-soft overflow-hidden">
          <div className="p-8 border-b border-border bg-bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                <Filter className="w-6 h-6" />
              </div>
              <select 
                value={selectedRemedy}
                onChange={(e) => setSelectedRemedy(e.target.value)}
                className="bg-transparent border-none text-2xl font-display font-medium text-text-primary focus:ring-0 cursor-pointer italic dark:bg-zinc-900"
              >
                {enhancedRemedies.map(r => (
                  <option key={r.id} value={r.id} className="dark:bg-zinc-900 dark:text-white">{r.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Complementary
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/10">
                <span className="w-2 h-2 bg-red-500 rounded-full" /> Inimical
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                <span className="w-2 h-2 bg-blue-500 rounded-full" /> Follows Well
              </div>
            </div>
          </div>

          <div className="relative h-[700px] bg-bg-secondary/20">
             <InteractiveMindMap data={graphData} height={700} />
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
           <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-border shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-medium text-text-primary italic mb-4">Complementary</h4>
              <p className="text-text-secondary leading-relaxed font-serif italic">
                Remedies that "complete" the action of the first remedy. Essential for chronic cases where one remedy clears a layer and the next finishes the cure.
              </p>
           </div>
           <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-border shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
                <Info className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-medium text-text-primary italic mb-4">Inimical</h4>
              <p className="text-text-secondary leading-relaxed font-serif italic">
                Remedies that "clash" or interfere with each other's action. These should NEVER be given in sequence or together, as they may cause aggravation or suppression.
              </p>
           </div>
           <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-border shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-medium text-text-primary italic mb-4">Follows Well</h4>
              <p className="text-text-secondary leading-relaxed font-serif italic">
                Clinically observed sequences that show high efficacy. These pairings have been historically validated by stalwarts like Kent and Boenninghausen.
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
