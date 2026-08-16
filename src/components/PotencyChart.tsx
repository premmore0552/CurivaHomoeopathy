import React, { useState } from 'react';
import { Info, AlertCircle, Sparkles, ChevronRight, Sliders, Activity, HelpCircle, RefreshCw } from 'lucide-react';

const POTENCIES = [
  { scale: 'Decimal (x)', description: 'Low concentration, for local symptoms.', common: '6x, 12x, 30x', focus: 'Physical/Structural' },
  { scale: 'Centesimal (c)', description: 'Standard potency, versatile usage.', common: '6c, 30c, 200c', focus: 'General/Functional' },
  { scale: 'LM Potencies', description: 'Gentle, frequent dosing for chronic deep-acting conditions.', common: 'LM1 to LM30', focus: 'Miasmatic/Chronic' },
  { scale: 'High Potency', description: 'Deep acting, emotional and constitutional layers.', common: '1M, 10M, CM', focus: 'Mental/Emotional' },
];

export default function PotencyChart() {
  // Simulator States
  const [vitalForce, setVitalForce] = useState(3); // 1 = Low, 5 = High
  const [pathology, setPathology] = useState(1);   // 1 = Minimal/Functional, 5 = Severe/Organic
  const [similarity, setSimilarity] = useState(3); // 1 = Partial Simillimum, 5 = Absolute Simillimum

  const getEstimatorResult = () => {
    // Logic based on classical Homoeopathic clinical tenets (e.g. Kent, Hahnemann, Close)
    if (pathology >= 4) {
      return {
        potency: '6C to 30C or LM1 - LM6 (Low & Gentle)',
        rationale: 'Advanced organic pathology with significant structural tissue changes exists. To prevent severe, irreversible pathogenetic aggravations, low potencies or gentle LM microdoses must be used.',
        rule: 'Rule of Safety: Organic/Structural lesions strictly declare low or LM potencies.',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
      };
    }
    
    if (vitalForce <= 2) {
      return {
        potency: '6C, 12C, or gradual LM1 (Very Gentle)',
        rationale: 'The patient\'s Vital Force is severely depleted, showing low reactive susceptibility. High potencies could exhaust the remaining vitality. Give low potencies with moderate repetition to stimulate reactions slowly.',
        rule: 'Rule of Depletion: Low Vitality cannot mount secondary curative reactions against heavy potencies.',
        color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
      };
    }

    if (similarity >= 4 && vitalForce >= 4) {
      return {
        potency: '200C, 1M, or 10M (Constitutional / High)',
        rationale: 'Abundant vitality combined with an unmistakable similarity of mental, general, and physical symptoms allows for deep-seated cures. This constitutional layer responds best to sporadic high potencies.',
        rule: 'Rule of Simillimum: High similarity paired with strong vitality demands high and deep-acting centesimals.',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
      };
    }

    if (similarity <= 2) {
      return {
        potency: '30C (Medium / Explorative)',
        rationale: 'Symptom matching is partial or superficial. Do not prescribe high potencies on partial sims. A moderate 30C potency acts gently, clarifies the case, and allows the true constitutional picture to unfold.',
        rule: 'Rule of Precaution: Vague or incomplete totalities should be addressed with 30C or below.',
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      };
    }

    // Default stable functional match
    return {
      potency: '30C to 200C (Standard Therapeutic)',
      rationale: 'Balanced case: Stable vital force, minimal organic disease, and good symptom alignment. Standard clinical guidelines support initiating centesimal remedies in 30C or 200C doses with careful observation.',
      rule: 'Rule of Balance: Stable chronic or acute symptoms with healthy reactors thrive under standard centesimals.',
      color: 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20'
    };
  };

  const currentRecommendation = getEstimatorResult();

  const resetEstimator = () => {
    setVitalForce(3);
    setPathology(1);
    setSimilarity(3);
  };

  return (
    <div className="space-y-12">
      {/* Reference cards */}
      <div className="bg-bg-secondary p-8 md:p-12 rounded-[3.5rem] border border-border shadow-soft relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <Sparkles className="w-64 h-64 text-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="max-w-xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
                 <Info className="w-3 h-3" /> Educational Framework
               </div>
               <h3 className="text-3xl md:text-4xl font-display font-medium text-text-primary leading-tight tracking-tight italic mb-4">
                 Potency <span className="text-primary italic">Reference</span> Guide
               </h3>
               <p className="text-text-secondary text-base font-serif italic leading-relaxed">
                 A structured overview of Homoeopathic scales used in clinical practice and pharmaceutical preparation.
               </p>
            </div>
            <div className="flex items-center gap-4 p-6 bg-bg-primary/50 backdrop-blur-xl border border-border rounded-3xl shrink-0">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                 <AlertCircle className="w-6 h-6" />
               </div>
               <div>
                  <span className="text-xs font-black uppercase tracking-widest text-text-primary block">Clinical Safety</span>
                  <span className="text-[10px] font-medium text-text-secondary uppercase">Consult a practitioner</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POTENCIES.map((p, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-bg-primary border border-border rounded-[2.5rem] hover:border-primary transition-all duration-500 hover:shadow-xl group/card relative"
              >
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 block border-b border-primary/10 pb-4">
                  Scale {idx + 1}
                </div>
                <h4 className="text-xl font-display font-medium text-text-primary mb-3 group-hover/card:text-primary transition-colors italic">
                  {p.scale}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed mb-8">
                  {p.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="px-4 py-3 bg-bg-secondary rounded-2xl border border-border/50">
                     <div className="text-[9px] font-black uppercase tracking-widest text-text-primary/40 mb-1">Common Examples</div>
                     <div className="text-sm font-bold text-text-primary">{p.common}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6 border-t border-border mt-auto">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                   <span className="text-xs font-black uppercase tracking-widest text-text-primary italic">{p.focus}</span>
                </div>

                <ChevronRight className="absolute bottom-8 right-8 w-4 h-4 text-primary opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all" />
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
             <p className="text-[11px] font-bold text-primary uppercase tracking-widest leading-loose max-w-2xl mx-auto">
               Note: Selection of potency requires individualization based on the "susceptibility", "nature of symptoms", and "history of the case" as per Arndt-Schulz Law.
             </p>
          </div>
        </div>
      </div>

      {/* Interactive Potency Estimator Tool */}
      <div 
        id="potency-estimator-tool" 
        className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-border shadow-soft relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            
            {/* Input Sliders Panel */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-wider mb-4">
                  <Sliders className="w-3 h-3" /> Interactive Clinic Tool
                </div>
                <h3 className="text-3xl font-display font-medium text-text-primary italic">
                  Hahnemannian <span className="text-primary italic">Potency Estimator</span>
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  Adjust patient & pathology indicators based on Organon of Medicine guidelines to estimate potency.
                </p>
              </div>

              {/* Slider 1: Vital Force Strength */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-primary flex items-center gap-1.5">
                    1. Patient Vital Force
                  </span>
                  <span className="text-xs font-black text-primary uppercase tracking-wider">
                    {vitalForce === 1 && '1 - Highly Depleted'}
                    {vitalForce === 2 && '2 - Deficient'}
                    {vitalForce === 3 && '3 - Balanced / Normal'}
                    {vitalForce === 4 && '4 - Strong Susceptibility'}
                    {vitalForce === 5 && '5 - High / Hyper-Reactive'}
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={vitalForce}
                  onChange={(e) => setVitalForce(Number(e.target.value))}
                  className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-text-secondary italic">
                  <span>Weak / Deficient</span>
                  <span>Average / Robust</span>
                  <span>Hyper-Sensitive</span>
                </div>
              </div>

              {/* Slider 2: Pathological Tissue Change */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-primary">
                    2. Pathological Organic Damage?
                  </span>
                  <span className="text-xs font-black text-rose-500 uppercase tracking-wider">
                    {pathology === 1 && '1 - Minimal / Functional Only'}
                    {pathology === 2 && '2 - Reversible Catarrhal'}
                    {pathology === 3 && '3 - Moderate Inflammatory'}
                    {pathology === 4 && '4 - Advanced Organic Change'}
                    {pathology === 5 && '5 - Severe / Irreversible'}
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={pathology}
                  onChange={(e) => setPathology(Number(e.target.value))}
                  className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-text-secondary italic">
                  <span>Functional (Safe)</span>
                  <span>Inflammatory</span>
                  <span>Organic Change (Lesions)</span>
                </div>
              </div>

              {/* Slider 3: Simillimum Synergy / Similarity */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-primary">
                    3. Symptom Totality Match
                  </span>
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-wider">
                    {similarity === 1 && '1 - Vague / Superficial'}
                    {similarity === 2 && '2 - Weak Similarity'}
                    {similarity === 3 && '3 - Reasonable Simillimum'}
                    {similarity === 4 && '4 - Clear Keynote Match'}
                    {similarity === 5 && '5 - Absolute Simillimum'}
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={similarity}
                  onChange={(e) => setSimilarity(Number(e.target.value))}
                  className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-text-secondary italic">
                  <span>Vague (Lower Match)</span>
                  <span>Good Totality Fit</span>
                  <span>Unmistakable Simillimum</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetEstimator}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#10b981] hover:text-[#059669] transition-colors cursor-pointer select-none"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Estimation Knobs
                </button>
              </div>
            </div>

            {/* Recommendation Display Panel */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 bg-bg-secondary border border-border rounded-[2.5rem] relative">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block">Computed Result</span>
                  <div className={`mt-2 p-4 px-6 border rounded-2xl text-lg font-black tracking-tight flex items-center gap-3 ${currentRecommendation.color}`}>
                    <Activity className="w-5 h-5 shrink-0 animate-pulse" />
                    <span>{currentRecommendation.potency}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block">Classical Theorem</span>
                  <p className="text-sm font-bold text-text-primary leading-normal italic">
                    "{currentRecommendation.rule}"
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary block">Clinical Rationale</span>
                  <p className="text-xs text-text-primary font-medium leading-relaxed font-serif italic">
                    {currentRecommendation.rationale}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-start gap-3 text-text-secondary">
                <AlertCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[10px] uppercase font-black tracking-wider leading-relaxed">
                  Disclaimer: This simulator demonstrates classical Homoeopathic laws and is structured for academic training. It does not replace clinical evaluation or medical diagnosis.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
