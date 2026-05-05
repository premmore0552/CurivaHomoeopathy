import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, BookOpen, Activity, Zap, Wind, Brain, Shield, HeartPulse, Stethoscope, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { remedyDatabase, ConditionData } from '../data/remedyDatabase';
import { comparisonRemedies } from '../data/comparisonData';

const categoryIcons: Record<string, React.ReactNode> = {
  digestive: <HeartPulse className="w-5 h-5" />,
  acidity: <Stethoscope className="w-5 h-5" />,
  acne: <Activity className="w-5 h-5" />,
  allergy: <Wind className="w-5 h-5" />,
  asthma: <Wind className="w-5 h-5" />,
  backache: <Shield className="w-5 h-5" />,
  bones: <Activity className="w-5 h-5" />,
  heart: <Zap className="w-5 h-5" />,
  insomnia: <Brain className="w-5 h-5" />
};

export default function RemedyExplorer() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<ConditionData | null>(null);

  const filteredConditions = useMemo(() => {
    if (!searchTerm) return remedyDatabase;
    return remedyDatabase.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.suggestions.some(s => s.remedy.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="remedy-explorer">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
        <div className="flex-1">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Educational Reference</h2>
          <h3 className="text-4xl font-display font-black text-text-primary uppercase tracking-tighter italic">
            Remedy Connection <span className="text-primary">Library</span>
          </h3>
        </div>
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text"
            placeholder="Search ailments or remedies..."
            className="w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-[10px] placeholder:uppercase placeholder:font-black placeholder:tracking-widest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Sidebar - Condition List */}
        <div className="lg:col-span-4 space-y-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
          {filteredConditions.map((condition) => (
            <motion.button
              key={condition.id}
              onClick={() => setSelectedCondition(condition)}
              className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group ${
                selectedCondition?.id === condition.id 
                ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' 
                : 'bg-bg-secondary border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${selectedCondition?.id === condition.id ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                  {categoryIcons[condition.id] || <Activity className="w-5 h-5" />}
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">{condition.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${selectedCondition?.id === condition.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
            </motion.button>
          ))}
          {filteredConditions.length === 0 && (
            <div className="text-center py-10 text-text-secondary italic font-medium opacity-50">
              No matching records found
            </div>
          )}
        </div>

        {/* content Area */}
        <div className="lg:col-span-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {selectedCondition ? (
              <motion.div
                key={selectedCondition.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-bg-secondary rounded-[3rem] p-8 md:p-12 border border-border h-full"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    {categoryIcons[selectedCondition.id] || <Activity className="w-6 h-6" />}
                  </div>
                  <h4 className="text-3xl font-display font-black text-text-primary uppercase tracking-tighter italic">
                    {selectedCondition.name}
                  </h4>
                </div>
                
                <p className="text-text-secondary text-lg font-medium leading-relaxed mb-10 border-l-4 border-primary pl-6">
                  {selectedCondition.description}
                </p>

                <div className="space-y-6">
                  <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Clinical Suggestions
                  </h5>
                  <div className="grid gap-4">
                    {selectedCondition.suggestions.map((s, idx) => (
                      <motion.div 
                        key={`${s.remedy}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-6 bg-bg-primary rounded-3xl border border-border hover:border-primary/30 transition-all hover:shadow-lg group"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                          <button 
                            onClick={() => {
                              const normalizeRemedy = (name: string) => {
                                const mapping: Record<string, string> = {
                                  'carbo veg.': 'carbo-vegetabilis',
                                  'merc sol.': 'mercurius-solubilis',
                                  'rhus tox.': 'rhus-toxicodendron',
                                  'arsenicum alb.': 'arsenicum-album',
                                  'acid phos.': 'phosphoric-acid',
                                  'calc carb.': 'calcarea-carbonica',
                                  'mag phos.': 'magnesia-phosphorica',
                                  'kali phos.': 'kali-phosphoricum',
                                  'ferrum phos.': 'ferrum-phosphoricum',
                                  'acid fluor.': 'fluoric-acid',
                                  'apis mel.': 'apis-mellifica',
                                  'ipecac': 'ipecacuanha',
                                  'hepar sulph.': 'hepar-sulphuris',
                                  'argentum nit.': 'argentum-nitricum',
                                  'china off.': 'cinchona-officinalis',
                                  'natrum mur.': 'natrum-muriaticum',
                                  'acidum phos.': 'phosphoric-acid',
                                  'acidum sulph.': 'sulphuric-acid',
                                  'arg nit.': 'argentum-nitricum',
                                  'natrum carb.': 'natrum-carbonicum',
                                  'natrum sulph.': 'natrum-sulphuricum',
                                  'kali bich.': 'kali-bichromicum',
                                  'kali carb.': 'kali-carbonicum',
                                  'merc cor.': 'mercurius-corrosivus'
                                };
                                const lower = name.toLowerCase().trim();
                                if (mapping[lower]) return mapping[lower];
                                if (mapping[lower.replace(/\.$/, '')]) return mapping[lower.replace(/\.$/, '')];
                                return null;
                              };

                              const mappedId = normalizeRemedy(s.remedy);
                              const remedyId = mappedId || comparisonRemedies.find(r => 
                                r.name.toLowerCase().includes(s.remedy.toLowerCase()) || 
                                s.remedy.toLowerCase().includes(r.name.toLowerCase())
                              )?.id || s.remedy.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
                              
                              navigate(`/remedy/${remedyId}`);
                            }}
                            className="text-lg font-black text-text-primary hover:text-primary transition-colors flex items-center gap-2 group/link cursor-pointer text-left"
                          >
                            {s.remedy} {s.potency && <span className="text-sm font-mono text-text-secondary/60 ml-2">{s.potency}</span>}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </button>
                          {s.frequency && (
                            <div className="px-3 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase rounded-lg border border-primary/10">
                              {s.frequency}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed font-medium">
                          {s.indication}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-bg-secondary rounded-[3rem] p-12 border border-border border-dashed h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-primary opacity-20" />
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary mb-4 uppercase tracking-widest">Select a condition</h4>
                <p className="text-text-secondary max-w-sm font-medium leading-relaxed">
                  Start your exploration by selecting a clinical category from the research database to view associated homeopathic patterns and academic summaries.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
