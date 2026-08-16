import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, AlertTriangle, CheckSquare, Square, RefreshCcw, ArrowRight, Activity, BookOpen, Heart, HelpCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Symptom {
  id: string;
  label: string;
  category: 'mental' | 'head_eyes' | 'digestive' | 'general';
}

interface RemedyWeight {
  remedyId: string;
  remedyName: string;
  commonName: string;
  description: string;
  weight: number;
}

const SYMPTOMS: Symptom[] = [
  // Mental
  { id: 'm_irritable', label: 'Highly anxious, irritable, over-sensitive to noise or odors', category: 'mental' },
  { id: 'm_panic', label: 'Sudden intense fear of death, extreme restlessness, anxiety', category: 'mental' },
  { id: 'm_shock', label: 'Mental lethargy, declaring "I am fine" while physically shocked', category: 'mental' },
  { id: 'm_fog', label: 'Mental fog, absent-mindedness, memory loss from exhaustion', category: 'mental' },
  
  // Head & Eyes
  { id: 'h_throbbing', label: 'Violent throbbing headache, flushed face, hot skin', category: 'head_eyes' },
  { id: 'h_watery', label: 'Red, burning watery eyes with sudden onset of symptoms', category: 'head_eyes' },
  { id: 'h_twitch', label: 'Involuntary twitching of the eyelids, face, or limb tremors', category: 'head_eyes' },
  { id: 'h_neuralgia', label: 'Neuralgia feeling like cold needles run through nerves', category: 'head_eyes' },
  
  // Digestive
  { id: 'd_heartburn', label: 'Heartburn, flatulence, indigestion with ineffectual urging for stool', category: 'digestive' },
  { id: 'd_flatulent', label: 'Excessive flatulent distention of the abdomen, belching gives no relief', category: 'digestive' },
  { id: 'd_sluggish', label: 'Sluggish digestion, feels cold and relaxed following excesses', category: 'digestive' },
  
  // Generalities
  { id: 'g_bruised', label: 'Sensation of bruising and intense soreness over the whole body', category: 'general' },
  { id: 'g_touch_sensitive_slight', label: 'Extreme sensitivity to the slightest touch, draft of air, or jar (hard pressure relieves)', category: 'general' },
  { id: 'g_draft', label: 'Worse from sudden exposure to cold, dry wind drafts', category: 'general' },
  { id: 'g_burning_soles', label: 'Burning sensations, especially on the soles of feet at night (uncovers feet)', category: 'general' },
  { id: 'g_itching', label: 'Skin skin rashes with intolerable burning/itching, worse from warmth of bed', category: 'general' },
  { id: 'g_exhaustion', label: 'Debility and total exhaustion from loss of vital fluids or chronic discharge', category: 'general' }
];

// Map symptom ids to remedy dynamic scores
const REMEDY_MAP: Record<string, RemedyWeight[]> = {
  m_irritable: [
    { remedyId: 'nux-vomica', remedyName: 'Nux Vomica', commonName: 'Poison Nut', description: 'Irritable, impatient, highly nervous and easily angered.', weight: 3 },
    { remedyId: 'arnica', remedyName: 'Arnica Montana', commonName: 'Leopard\'s Bane', description: 'Over-sensitive to touch and irritable due to shock.', weight: 1 }
  ],
  m_panic: [
    { remedyId: 'aconite', remedyName: 'Aconitum Napellus', commonName: 'Monkshood', description: 'Characterized by extreme panic, fear of death, and restless tossing.', weight: 4 },
    { remedyId: 'belladonna', remedyName: 'Belladonna', commonName: 'Deadly Nightshade', description: 'Sudden delirium or high anxiety with intense congestive states.', weight: 2 }
  ],
  m_shock: [
    { remedyId: 'arnica', remedyName: 'Arnica Montana', commonName: 'Leopard\'s Bane', description: 'The absolute premier remedy for physical trauma or emotional shock.', weight: 4 }
  ],
  m_fog: [
    { remedyId: 'agnus-castus', remedyName: 'Agnus Castus', commonName: 'Chaste Tree', description: 'Excellent remedy for mental despondency combined with profound mental exhaustion.', weight: 3.5 },
    { remedyId: 'agaricus', remedyName: 'Agaricus Muscarius', commonName: 'Bug Agaric', description: 'Indicated for dazed mental states accompanying physical spasms.', weight: 2 }
  ],
  h_throbbing: [
    { remedyId: 'belladonna', remedyName: 'Belladonna', commonName: 'Deadly Nightshade', description: 'First-line remedy for rapid-onset throbbing headaches and congestions.', weight: 4 },
    { remedyId: 'aconite', remedyName: 'Aconitum Napellus', commonName: 'Monkshood', description: 'Congestive headache with acute anxiety.', weight: 2 }
  ],
  h_watery: [
    { remedyId: 'belladonna', remedyName: 'Belladonna', commonName: 'Deadly Nightshade', description: 'Dilated pupils and injected, burning eyes.', weight: 3 },
    { remedyId: 'aconite', remedyName: 'Aconitum Napellus', commonName: 'Monkshood', description: 'Conjunctivitis with sudden irritation from cold winds.', weight: 2 }
  ],
  h_twitch: [
    { remedyId: 'agaricus', remedyName: 'Agaricus Muscarius', commonName: 'Bug Agaric', description: 'Celebrated for involuntary muscle jerking and twitching of eyelids.', weight: 4.5 }
  ],
  h_neuralgia: [
    { remedyId: 'agaricus', remedyName: 'Agaricus Muscarius', commonName: 'Bug Agaric', description: 'A primary keynote is neurological pain resembling cold, piercing needles.', weight: 4 }
  ],
  d_heartburn: [
    { remedyId: 'nux-vomica', remedyName: 'Nux Vomica', commonName: 'Poison Nut', description: 'Classic remedy for sour stomach, bloating and spasmodic indigestion.', weight: 4.5 }
  ],
  d_flatulent: [
    { remedyId: 'china', remedyName: 'China Officinalis', commonName: 'Peruvian Bark / Cinchona', description: 'Massive abdomen distention of gas where passing gas gives no relief.', weight: 4 }
  ],
  d_sluggish: [
    { remedyId: 'agnus-castus', remedyName: 'Agnus Castus', commonName: 'Chaste Tree', description: 'Sluggish digestive state reflecting extremely low vital reaction.', weight: 3 }
  ],
  g_bruised: [
    { remedyId: 'arnica', remedyName: 'Arnica Montana', commonName: 'Leopard\'s Bane', description: 'The absolute hallmark of Arnica: "everything feels bruised and sore."', weight: 5.5 }
  ],
  g_touch_sensitive_slight: [
    { remedyId: 'china', remedyName: 'China Officinalis', commonName: 'Peruvian Bark / Cinchona', description: 'High hypersensitivity to lightest touch, but relieved by deep pressure.', weight: 4 },
    { remedyId: 'arnica', remedyName: 'Arnica Montana', commonName: 'Leopard\'s Bane', description: 'Fear of being touched because areas feel extremely sore.', weight: 3 }
  ],
  g_draft: [
    { remedyId: 'aconite', remedyName: 'Aconitum Napellus', commonName: 'Monkshood', description: 'Ailments occurring immediately after dry cold wind exposure.', weight: 4 },
    { remedyId: 'nux-vomica', remedyName: 'Nux Vomica', commonName: 'Poison Nut', description: 'Highly chilly, symptoms worsen in cold air drafts.', weight: 2 },
    { remedyId: 'belladonna', remedyName: 'Belladonna', commonName: 'Deadly Nightshade', description: 'Extremely vulnerable to cold drafts to the head.', weight: 2 }
  ],
  g_burning_soles: [
    { remedyId: 'sulphur', remedyName: 'Sulphur', commonName: 'Brimstone', description: 'Key symptom of Sulphur: burning heat of soles of feet at night, causing them to thrust them out from under bedcovers.', weight: 5.5 }
  ],
  g_itching: [
    { remedyId: 'sulphur', remedyName: 'Sulphur', commonName: 'Brimstone', description: 'Indolent skin conditions, rashes, or eczema with burning itching.', weight: 4.5 },
    { remedyId: 'agaricus', remedyName: 'Agaricus Muscarius', commonName: 'Bug Agaric', description: 'Specifically for reddish, burning chilblains that itch intolerably.', weight: 3 }
  ],
  g_exhaustion: [
    { remedyId: 'china', remedyName: 'China Officinalis', commonName: 'Peruvian Bark / Cinchona', description: 'Profound weakness following exhausting discharges, sweat, loss of fluids.', weight: 4.5 },
    { remedyId: 'agnus-castus', remedyName: 'Agnus Castus', commonName: 'Chaste Tree', description: 'Complete general relaxation of tissues, premature old age and debility.', weight: 3 }
  ]
};

export default function RemedyFinder() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showDetailedRemedy, setShowDetailedRemedy] = useState<string | null>(null);

  // Filter symptoms by category
  const categoriesMap = {
    mental: { label: 'Mental & Emotional State', desc: 'Inner reactions and emotional keynotes' },
    head_eyes: { label: 'Head, Face & Eyes', desc: 'Congestions, tremors, and local symptoms' },
    digestive: { label: 'Stomach & Abdomen', desc: 'Indigestion, gas, flatulence and patterns' },
    general: { label: 'Generalities & Modalities', desc: 'Sensations of pains, temperature and sensitivities' }
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(id)) {
        return prev.filter(sId => sId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setShowDetailedRemedy(null);
  };

  // Perform dynamic weight matching algorithm
  const matchingRemedies = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];

    const scores: Record<string, {
      remedyId: string;
      remedyName: string;
      commonName: string;
      points: number;
      matchedBy: Array<{ symptom: string; explanation: string; weight: number }>;
    }> = {};

    selectedSymptoms.forEach(sId => {
      const weights = REMEDY_MAP[sId] || [];
      const symptomLabel = SYMPTOMS.find(s => s.id === sId)?.label || '';

      weights.forEach(w => {
        if (!scores[w.remedyId]) {
          scores[w.remedyId] = {
            remedyId: w.remedyId,
            remedyName: w.remedyName,
            commonName: w.commonName,
            points: 0,
            matchedBy: []
          };
        }
        scores[w.remedyId].points += w.weight;
        scores[w.remedyId].matchedBy.push({
          symptom: symptomLabel,
          explanation: w.description,
          weight: w.weight
        });
      });
    });

    return Object.values(scores)
      .sort((a, b) => b.points - a.points)
      .map(item => {
        // Compute relative matching strength
        const maxScorePossible = selectedSymptoms.reduce((acc, sId) => {
          const weights = REMEDY_MAP[sId] || [];
          const remediesWeights = weights.map(w => w.weight);
          const maxInSymptom = remediesWeights.length > 0 ? Math.max(...remediesWeights) : 0;
          return acc + maxInSymptom;
        }, 0);

        const matchPercent = maxScorePossible > 0 
          ? Math.round((item.points / maxScorePossible) * 100) 
          : 0;

        return {
          ...item,
          matchPercent
        };
      });
  }, [selectedSymptoms]);

  return (
    <div className="space-y-12" id="remedy-finder-tool">
      
      {/* EXTREMELY VISIBLE MANDATORY MEDICAL DISCLAIMER BANNER */}
      <div className="bg-red-500/10 border-2 border-red-500/30 rounded-3xl p-6 md:p-8 flex items-start gap-5 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-red-500">
          <ShieldAlert className="w-32 h-32" />
        </div>
        <div className="p-3 bg-red-500 text-white rounded-2xl shrink-0 shadow-lg shadow-red-500/10">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-black uppercase tracking-[0.25em] text-red-600">
            Mandatory Medical Disclaimer
          </h4>
          <p className="text-base font-serif italic text-text-primary leading-relaxed">
            <strong>Educational use only.</strong> This interactive symptom matching finder is built purely to explain historical and clinical Materia Medica correlations. It does <strong>not</strong> diagnose medical conditions, deliver clinical evaluation, or prescribe treatment. Homoeopathic medicine requires individualized assessment of holistic constitutions. Do not use this tool as a substitute for professional medical advice or clinical consultations. Always consult a certified Homoeopath or qualified medical practitioner regarding any health concerns.
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-12">
        
        {/* LEFT COLUMN: Symptom Selector Panel */}
        <div className="flex-1 space-y-8">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/25 font-sans">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Symptom Configuration Portal
            </span>
            <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic">
              Select Your <span className="text-primary">Clinical Indicators</span>
            </h3>
            <p className="text-sm font-serif italic text-text-secondary">
              Check all indicators currently felt. Our dynamic logic weighs active modalites and mental attributes.
            </p>
          </div>

          <div className="grid gap-8">
            {Object.entries(categoriesMap).map(([catKey, catInfo]) => {
              const catSymptoms = SYMPTOMS.filter(s => s.category === catKey);
              return (
                <div key={catKey} className="bg-white rounded-[2rem] border border-border pb-8 overflow-hidden shadow-soft">
                  <div className="px-8 py-5 border-b border-border bg-bg-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-display font-extrabold text-text-primary tracking-tight uppercase">{catInfo.label}</h4>
                      <p className="text-[10px] text-text-tertiary font-serif italic">{catInfo.desc}</p>
                    </div>
                    <span className="px-3 py-1 bg-white text-text-tertiary border border-border rounded-xl text-[9px] font-black uppercase tracking-wider w-fit">
                      {catSymptoms.length} indications
                    </span>
                  </div>

                  <div className="p-6 md:p-8 grid gap-4">
                    {catSymptoms.map(symptom => {
                      const isChecked = selectedSymptoms.includes(symptom.id);
                      return (
                        <button
                          key={symptom.id}
                          onClick={() => toggleSymptom(symptom.id)}
                          className={`flex items-start text-left gap-4 p-5 border rounded-2xl transition-all hover:scale-[1.01] cursor-pointer ${
                            isChecked
                              ? 'bg-primary/5 border-primary text-text-primary shadow-sm'
                              : 'border-border hover:border-primary/20 bg-white text-text-secondary'
                          }`}
                        >
                          <div className={`mt-0.5 shrink-0 transition-colors ${isChecked ? 'text-primary' : 'text-text-tertiary'}`}>
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5" />
                            ) : (
                              <Square className="w-5 h-5 opacity-40" />
                            )}
                          </div>
                          <span className="text-sm md:text-base font-medium leading-relaxed font-serif">
                            {symptom.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Matching suggestions lists */}
        <div className="w-full xl:w-[480px] space-y-8">
          <div className="bg-bg-secondary p-8 rounded-[2rem] border border-border sticky top-28 space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <h4 className="text-lg font-display font-black text-text-primary uppercase tracking-tight italic">
                  Suggested <span className="text-primary">Remedies</span>
                </h4>
                <p className="text-[10px] text-text-secondary font-serif italic mt-0.5">Dynamic weights-to-symptom resolution</p>
              </div>

              {selectedSymptoms.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:border-red-200 hover:text-red-500 border border-border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  <RefreshCcw className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {selectedSymptoms.length === 0 ? (
              <div className="p-12 text-center text-text-tertiary italic font-serif flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-border/20 flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 opacity-60" />
                </div>
                <div>
                   <p className="font-semibold text-lg text-text-secondary not-italic font-display uppercase tracking-tight">No symptoms active</p>
                   <p className="text-sm mt-1">Select one or more symptoms on the left to resolve related Homoeopathic remedies immediately.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <AnimatePresence mode="popLayout">
                  {matchingRemedies.map((match, idx) => (
                    <motion.div
                      key={match.remedyId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="p-5 bg-white rounded-2xl border border-border hover:border-primary/20 hover:shadow-soft transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h5 className="font-display font-extrabold text-lg text-text-primary leading-tight">
                            {match.remedyName}
                          </h5>
                          <span className="text-[10px] text-text-tertiary font-serif italic font-medium leading-none block mt-1">
                            {match.commonName}
                          </span>
                        </div>

                        {/* Match strength ring badge */}
                        <div className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 text-center">
                          {match.matchPercent}% Match
                        </div>
                      </div>

                      <p className="text-xs text-text-secondary font-serif italic leading-relaxed">
                        Matches {match.matchedBy.length} selected indicator{match.matchedBy.length > 1 ? 's' : ''}.
                      </p>

                      <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
                        <button
                          onClick={() => setShowDetailedRemedy(match.remedyId)}
                          className="text-[9px] font-black uppercase tracking-wider text-text-tertiary hover:text-primary transition-colors cursor-pointer"
                        >
                          View Matching Factors
                        </button>
                        
                        <Link
                          to={`/read/${match.remedyId}`}
                          className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-primary group"
                        >
                          Read Pictures <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MATCHING FACTORS DETAILED EXPLANATION BOTTOM MODAL/PANE */}
      <AnimatePresence>
        {showDetailedRemedy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDetailedRemedy(null)}
          >
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-primary border border-border w-full max-w-2xl rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary border-b border-border flex items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary block leading-none mb-2">Matching Breakdown</span>
                  <h4 className="text-2.5xl font-display font-medium text-text-primary tracking-tight leading-none italic">
                    {matchingRemedies.find(r => r.remedyId === showDetailedRemedy)?.remedyName}
                  </h4>
                  <p className="text-xs text-text-secondary font-serif italic mt-1.5">
                    ({matchingRemedies.find(r => r.remedyId === showDetailedRemedy)?.commonName})
                  </p>
                </div>
                
                <button
                  onClick={() => setShowDetailedRemedy(null)}
                  className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center hover:bg-border transition-colors border border-border cursor-pointer"
                >
                  <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  </svg>
                </button>
              </div>

              {/* Factors */}
              <div className="p-8 space-y-6 max-h-[50vh] overflow-y-auto">
                <p className="text-sm text-text-secondary font-serif italic">This remedy showed high congruence with your selected profile indicators because of the following Materia Medica profiles:</p>
                
                <div className="space-y-4">
                  {matchingRemedies.find(r => r.remedyId === showDetailedRemedy)?.matchedBy.map((factor, fIdx) => (
                    <div key={fIdx} className="p-5 bg-white border border-border rounded-2xl flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20 text-[10px] font-black">
                        {fIdx + 1}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary block leading-none">For Selected Symptom:</span>
                        <p className="text-sm font-bold text-text-primary leading-normal my-1">{factor.symptom}</p>
                        <p className="text-xs text-text-secondary font-serif italic leading-relaxed pt-1.5 border-t border-dashed border-border">{factor.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="p-6 bg-bg-secondary/50 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[10px] text-text-tertiary font-serif italic max-w-xs leading-tight">We recommend clicking "Explore Remedy" to inspect its thorough keynote profile.</span>
                <Link
                  to={`/read/${showDetailedRemedy}`}
                  className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-103 cursor-pointer inline-flex items-center gap-2 w-fit"
                  onClick={() => setShowDetailedRemedy(null)}
                >
                  <BookOpen className="w-4 h-4" /> Explore Remedy Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
