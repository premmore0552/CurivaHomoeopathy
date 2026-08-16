import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  AlertCircle, 
  Heart, 
  Activity, 
  Sparkles, 
  FileText, 
  Stethoscope, 
  ArrowRight,
  RefreshCw,
  Clock,
  Printer,
  ShieldAlert,
  ClipboardList,
  Layers,
  Award
} from 'lucide-react';
import SEO from '../components/SEO';
import PremiumTable from '../components/PremiumTable';

interface CaseInputs {
  mentalState: string;
  thermalPreference: string;
  thirstLevel: string;
  sideAffinity: string;
  aggravationFactor: string;
  chiefComplaint: string;
}

interface RemedyScore {
  name: string;
  fullName: string;
  symptomsMatched: string[];
  totalPoints: number;
  grade: string;
  keynotes: string;
}

export default function SymptomChecker() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Homoeopathic Case State
  const [caseData, setCaseData] = useState<CaseInputs>({
    mentalState: '',
    thermalPreference: '',
    thirstLevel: '',
    sideAffinity: '',
    aggravationFactor: '',
    chiefComplaint: ''
  });

  const [repertorizationResult, setRepertorizationResult] = useState<RemedyScore[]>([]);

  const handleStart = () => {
    if (!acceptedDisclaimer) return;
    setHasStarted(true);
  };

  const handleSelectValue = (field: keyof CaseInputs, value: string) => {
    setCaseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateRepertorization();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateRepertorization = () => {
    setIsSubmitting(true);
    
    // Simulate real clinical algorithm latency
    setTimeout(() => {
      const remedies: RemedyScore[] = [
        {
          name: "Nux Vomica",
          fullName: "Nux Vomica (Poison Nut)",
          symptomsMatched: [],
          totalPoints: 0,
          grade: "Polychrest - Gastrointestinal & Nervous Driver",
          keynotes: "Intense irritability, workaholic tendencies, extremely chilly, constant ineffectual urge for stool, hyper-sensitiveness to noise, light, and drafts."
        },
        {
          name: "Pulsatilla",
          fullName: "Pulsatilla Pratensis (Wind Flower)",
          symptomsMatched: [],
          totalPoints: 0,
          grade: "Polychrest - Venous & Mucosal Driver",
          keynotes: "Mild, yielding disposition, weeping tendencies, craves fresh air, intensely hot / warm, completely thirstless with dry mouth, shifting symptoms."
        },
        {
          name: "Arsenicum Album",
          fullName: "Arsenicum Album (White Oxide of Arsenic)",
          symptomsMatched: [],
          totalPoints: 0,
          grade: "Polychrest - Immune & Epithelial Driver",
          keynotes: "Severe anxiety with restlessness, fastidious cleanliness, deeply chilly, burning pains temporarily relieved by heat, thirst for small sips of cold water at short intervals."
        },
        {
          name: "Lycopodium",
          fullName: "Lycopodium Clavatum (Club Moss)",
          symptomsMatched: [],
          totalPoints: 0,
          grade: "Polychrest - Hepatic & Nutritive Driver",
          keynotes: "Intellectual with lack of confidence, right-sided symptoms moving to left, hot, craves warm drinks and sweets, flatulence, aggravated 4 PM to 8 PM."
        },
        {
          name: "Rhus Tox",
          fullName: "Rhus Toxicodendron (Poison Ivy)",
          symptomsMatched: [],
          totalPoints: 0,
          grade: "Polychrest - Fibrous Tissue & Locomotor Driver",
          keynotes: "Physical restlessness, chilly, tearing joint pains aggravated by initial motion and cold damp air, significantly relieved by continuous moderate motion."
        },
        {
          name: "Bryonia Alba",
          fullName: "Bryonia Alba (Wild Hops)",
          symptomsMatched: [],
          totalPoints: 0,
          grade: "Polychrest - Serous Membrane Driver",
          keynotes: "Extremely irritable, craves absolute quiet, aggravated by the slightest physical movement, relieved by firm pressure, intense thirst for large quantities of cold water."
        }
      ];

      // Scored matrix based on Kent's Repertory grading (3 = Bold Red, 2 = Italic, 1 = Plain)
      const { mentalState, thermalPreference, thirstLevel, sideAffinity, aggravationFactor, chiefComplaint } = caseData;

      remedies.forEach(rem => {
        // Mental state mapping
        if (mentalState === 'irritable_ambitious') {
          if (rem.name === 'Nux Vomica') { rem.symptomsMatched.push("Irritable & Ambitious (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Bryonia Alba') { rem.symptomsMatched.push("Irritable & Ambitious (Grade 2)"); rem.totalPoints += 2; }
          if (rem.name === 'Lycopodium') { rem.symptomsMatched.push("Irritable & Ambitious (Grade 1)"); rem.totalPoints += 1; }
        } else if (mentalState === 'mild_yielding') {
          if (rem.name === 'Pulsatilla') { rem.symptomsMatched.push("Mild, Yielding & Weeping (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Rhus Tox') { rem.symptomsMatched.push("Mild & Restless (Grade 1)"); rem.totalPoints += 1; }
        } else if (mentalState === 'anxious_fastidious') {
          if (rem.name === 'Arsenicum Album') { rem.symptomsMatched.push("Anxious & Fastidious (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Nux Vomica') { rem.symptomsMatched.push("Anxious & Fastidious (Grade 2)"); rem.totalPoints += 2; }
        } else if (mentalState === 'reserved_intellectual') {
          if (rem.name === 'Lycopodium') { rem.symptomsMatched.push("Intellectual with Lack of Confidence (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Bryonia Alba') { rem.symptomsMatched.push("Reserved & Quiet (Grade 2)"); rem.totalPoints += 2; }
        }

        // Thermal mapping
        if (thermalPreference === 'chilly') {
          if (rem.name === 'Nux Vomica' || rem.name === 'Arsenicum Album' || rem.name === 'Rhus Tox') {
            rem.symptomsMatched.push("Highly Chilly (Grade 3)"); rem.totalPoints += 3;
          }
        } else if (thermalPreference === 'hot') {
          if (rem.name === 'Pulsatilla' || rem.name === 'Lycopodium') {
            rem.symptomsMatched.push("Warm / Hot (Grade 2)"); rem.totalPoints += 2;
          }
          if (rem.name === 'Bryonia Alba') {
            rem.symptomsMatched.push("Warm (Grade 1)"); rem.totalPoints += 1;
          }
        }

        // Thirst mapping
        if (thirstLevel === 'thirstless') {
          if (rem.name === 'Pulsatilla') { rem.symptomsMatched.push("Thirstless (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Nux Vomica') { rem.symptomsMatched.push("Thirstless (Grade 1)"); rem.totalPoints += 1; }
        } else if (thirstLevel === 'sips') {
          if (rem.name === 'Arsenicum Album') { rem.symptomsMatched.push("Thirst for small sips often (Grade 3)"); rem.totalPoints += 3; }
        } else if (thirstLevel === 'large_amounts') {
          if (rem.name === 'Bryonia Alba') { rem.symptomsMatched.push("Thirst for large quantities (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Lycopodium') { rem.symptomsMatched.push("Thirst for warm liquids (Grade 2)"); rem.totalPoints += 2; }
          if (rem.name === 'Rhus Tox') { rem.symptomsMatched.push("Thirst for cold water (Grade 2)"); rem.totalPoints += 2; }
        }

        // Side affinity
        if (sideAffinity === 'right') {
          if (rem.name === 'Lycopodium') { rem.symptomsMatched.push("Right-sided affinity (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Nux Vomica') { rem.symptomsMatched.push("Right-sided affinity (Grade 1)"); rem.totalPoints += 1; }
        } else if (sideAffinity === 'left') {
          if (rem.name === 'Arsenicum Album') { rem.symptomsMatched.push("Left-sided affinity (Grade 1)"); rem.totalPoints += 1; }
        }

        // Aggravations
        if (aggravationFactor === 'cold_draft') {
          if (rem.name === 'Nux Vomica' || rem.name === 'Arsenicum Album' || rem.name === 'Rhus Tox') {
            rem.symptomsMatched.push("Aggravated by Cold Drafts (Grade 3)"); rem.totalPoints += 3;
          }
        } else if (aggravationFactor === 'warm_room') {
          if (rem.name === 'Pulsatilla') { rem.symptomsMatched.push("Aggravated by Warm Room (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Lycopodium') { rem.symptomsMatched.push("Aggravated by Warm Room (Grade 1)"); rem.totalPoints += 1; }
        } else if (aggravationFactor === 'slight_motion') {
          if (rem.name === 'Bryonia Alba') { rem.symptomsMatched.push("Aggravated by slightest movement (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Nux Vomica') { rem.symptomsMatched.push("Aggravated by motion (Grade 2)"); rem.totalPoints += 2; }
        } else if (aggravationFactor === 'rest_initial_motion') {
          if (rem.name === 'Rhus Tox') { rem.symptomsMatched.push("Aggravated by rest, relieved by movement (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Pulsatilla') { rem.symptomsMatched.push("Aggravated by rest (Grade 2)"); rem.totalPoints += 2; }
        }

        // Chief Complaints mapped to therapeutic affinities
        if (chiefComplaint === 'gastrointestinal') {
          if (rem.name === 'Nux Vomica' || rem.name === 'Lycopodium') {
            rem.symptomsMatched.push("Gastric organ affinity (Grade 3)"); rem.totalPoints += 3;
          }
          if (rem.name === 'Pulsatilla' || rem.name === 'Arsenicum Album') {
            rem.symptomsMatched.push("Gastric organ affinity (Grade 2)"); rem.totalPoints += 2;
          }
        } else if (chiefComplaint === 'respiratory') {
          if (rem.name === 'Arsenicum Album') { rem.symptomsMatched.push("Respiratory/Asthma affinity (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Pulsatilla') { rem.symptomsMatched.push("Mucous congestion (Grade 2)"); rem.totalPoints += 2; }
        } else if (chiefComplaint === 'locomotor') {
          if (rem.name === 'Rhus Tox') { rem.symptomsMatched.push("Joints/Tendons affinity (Grade 3)"); rem.totalPoints += 3; }
          if (rem.name === 'Bryonia Alba') { rem.symptomsMatched.push("Articular/Serous affinity (Grade 3)"); rem.totalPoints += 3; }
        } else if (chiefComplaint === 'febrile') {
          if (rem.name === 'Arsenicum Album' || rem.name === 'Nux Vomica') {
            rem.symptomsMatched.push("Fever/Chill cycle affinity (Grade 3)"); rem.totalPoints += 3;
          }
          if (rem.name === 'Pulsatilla' || rem.name === 'Bryonia Alba') {
            rem.symptomsMatched.push("Fever heat affinity (Grade 2)"); rem.totalPoints += 2;
          }
        }
      });

      // Sort by total points descending
      const sorted = remedies
        .filter(r => r.symptomsMatched.length > 0)
        .sort((a, b) => b.totalPoints - a.totalPoints);

      setRepertorizationResult(sorted);
      setIsSubmitting(false);
      setShowResult(true);
    }, 1200);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.warn("Direct window.print() failed inside iframe", err);
    }
  };

  const restartSimulator = () => {
    setCaseData({
      mentalState: '',
      thermalPreference: '',
      thirstLevel: '',
      sideAffinity: '',
      aggravationFactor: '',
      chiefComplaint: ''
    });
    setRepertorizationResult([]);
    setCurrentStep(1);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-12 pb-24 font-sans text-text-primary selection:bg-primary/20 selection:text-primary">
      <SEO 
        title="Clinical Case Repertorizer & Patient Simulator"
        description="Interactive clinical case taking and symptom repertorization sandbox. Grade polychrests based on physical modalities and constitutional mentals using Kent's methods."
      />

      <div className="max-w-4xl mx-auto px-4 mt-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary animate-pulse">
              <Stethoscope className="w-6.5 h-6.5" />
            </div>
            <div>
              <h1 id="symptom-checker-title" className="text-xl md:text-2xl font-display font-medium text-primary">Case Repertorizer Simulator</h1>
              <p className="text-xs text-text-tertiary">Interactive student simulator for Homoeopathic case taking &amp; repertory matrices</p>
            </div>
          </div>
          <Link to="/student-resources" className="text-xs text-primary hover:text-accent font-bold transition-colors">
            Access study cards
          </Link>
        </div>

        {!hasStarted ? (
          /* Introduction Screen */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-950 border border-border rounded-3xl p-8 space-y-6 shadow-soft text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto">
              <ClipboardList className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-primary">Clinical Modal Repertorizer</h2>
              <p className="text-xs text-text-secondary leading-relaxed max-w-lg mx-auto">
                Train your clinical judgment. Enter an active patient's constitutional temperament, thermal states, precise physical modalities, and chief complaints to generate a real Kentian-style repertorization grid.
              </p>
            </div>

            {/* Disclaimer Callout */}
            <div className="bg-amber-500/5 border border-amber-500/15 p-4 rounded-2xl flex items-start gap-3.5 text-left text-xs text-amber-800 dark:text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Academic Educational Sandbox Only</p>
                <p className="leading-relaxed opacity-90">
                  This simulator is designed exclusively as an educational study tool for BHMS students and Homoeopathic scholars. It does not replace professional clinical diagnosis or medical consultations.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex flex-col items-center gap-4">
              <label className="flex items-center gap-3 text-xs font-bold text-text-secondary select-none cursor-pointer">
                <input 
                  type="checkbox"
                  checked={acceptedDisclaimer}
                  onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4.5 h-4.5"
                />
                I certify that I am a BHMS student, scholar, or practitioner.
              </label>

              <button
                disabled={!acceptedDisclaimer}
                onClick={handleStart}
                className={`px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all flex items-center gap-2 ${
                  acceptedDisclaimer ? 'bg-primary hover:bg-primary-dark cursor-pointer' : 'bg-primary/40 cursor-not-allowed'
                }`}
              >
                Launch Patient Simulator
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : !showResult ? (
          /* Multi-step Case Entry */
          <div className="bg-white dark:bg-gray-950 border border-border rounded-3xl p-6 sm:p-8 space-y-8 shadow-soft">
            {/* Step indicators */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center">
                  {currentStep}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {currentStep === 1 && "1. Constitutional Mentals"}
                  {currentStep === 2 && "2. Physical Generals"}
                  {currentStep === 3 && "3. Modalities & Aggravations"}
                  {currentStep === 4 && "4. Chief Pathology Affinity"}
                </span>
              </div>
              <span className="text-xs font-mono font-black text-text-tertiary">
                STEP {currentStep} OF 4
              </span>
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-primary">Select Patient's Prominent Mental State</h3>
                    <p className="text-xs text-text-secondary">Homoeopathic remedy prescription is highly dependent on psychological traits and emotional expressions.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { val: 'irritable_ambitious', label: 'Irritable, Ambitious, Angry, Workaholic', desc: 'Highly driven, angry when contradicted, seeks stimulants (Nux V, Bry)' },
                      { val: 'mild_yielding', label: 'Mild, Yielding, Weeping, Desires Sympathy', desc: 'Gentle, weeps easily while explaining symptoms, desires consolation (Puls, Rhus-t)' },
                      { val: 'anxious_fastidious', label: 'Anxious, Restless, Fastidious', desc: 'Intense anxiety about health, absolute fastidious neatness (Ars, Nux)' },
                      { val: 'reserved_intellectual', label: 'Reserved, Quiet, Lacks Confidence', desc: 'Highly intellectual, reserved, dreads public speaking but performs well (Lyc, Bry)' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectValue('mentalState', opt.val)}
                        className={`p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          caseData.mentalState === opt.val 
                            ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                            : 'border-border hover:border-primary/45 bg-bg-primary text-text-primary'
                        }`}
                      >
                        <h4 className="text-xs font-bold">{opt.label}</h4>
                        <p className="text-[10px] text-text-tertiary mt-1 font-medium leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-display font-bold text-primary">Core Physical General Symptoms</h3>
                    
                    {/* Thermal selection */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-text-tertiary">A. Thermal Reactions (Reaction to Heat/Cold):</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'chilly', label: 'Chilly Patient', desc: 'Extremely sensitive to cold drafts, cold climate, and warm coverings feel comforting.' },
                          { val: 'hot', label: 'Hot / Warm Patient', desc: 'Cannot tolerate warm rooms or thick blankets, deeply craves fresh open air.' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => handleSelectValue('thermalPreference', opt.val)}
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                              caseData.thermalPreference === opt.val 
                                ? 'border-primary bg-primary/5 text-primary shadow-sm font-bold' 
                                : 'border-border hover:border-primary/40 bg-bg-primary text-text-primary'
                            }`}
                          >
                            <span className="text-xs block font-bold">{opt.label}</span>
                            <span className="text-[9px] text-text-tertiary font-medium block mt-1 leading-normal">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Thirst selection */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-text-tertiary">B. Thirst Characteristics:</h4>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { val: 'thirstless', label: 'Thirstless', desc: 'Completely absent thirst even with dry mouth.' },
                          { val: 'sips', label: 'Small Sips Often', desc: 'Thirst for tiny quantities of cold water very frequently.' },
                          { val: 'large_amounts', label: 'Large Amounts', desc: 'Thirst for huge quantities of cold water at long intervals.' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => handleSelectValue('thirstLevel', opt.val)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              caseData.thirstLevel === opt.val 
                                ? 'border-primary bg-primary/5 text-primary shadow-sm font-bold' 
                                : 'border-border hover:border-primary/40 bg-bg-primary text-text-primary'
                            }`}
                          >
                            <span className="text-xs block font-bold">{opt.label}</span>
                            <span className="text-[9px] text-text-tertiary font-medium block mt-1 leading-snug">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-display font-bold text-primary">Chief Modalities &amp; Side Affinities</h3>
                    
                    {/* Aggravation factor */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-text-tertiary">A. Leading Aggravating/Ameliorating Modality:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'cold_draft', label: 'Aggravation by Cold Draft / Damp', desc: 'Symptoms significantly worsen when exposed to cold winter drafts or damp rain.' },
                          { val: 'warm_room', label: 'Aggravation by Warm / Stuffy Room', desc: 'Feelings of constriction, respiratory distress, or headache in a heated unventilated room.' },
                          { val: 'slight_motion', label: 'Aggravation by Slightest Motion', desc: 'Any physical shift or joint motion triggers acute agony; absolute rest is demanded.' },
                          { val: 'rest_initial_motion', label: 'Aggravation by Rest / Initial Motion', desc: 'Stiffness worsens during absolute rest. Relieved by continuous moderate movement.' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => handleSelectValue('aggravationFactor', opt.val)}
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                              caseData.aggravationFactor === opt.val 
                                ? 'border-primary bg-primary/5 text-primary shadow-sm font-bold' 
                                : 'border-border hover:border-primary/40 bg-bg-primary text-text-primary'
                            }`}
                          >
                            <span className="text-xs block font-bold">{opt.label}</span>
                            <span className="text-[9px] text-text-tertiary font-medium block mt-1 leading-normal">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Side affinity selection */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-text-tertiary">B. Side of Body Affinity:</h4>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { val: 'right', label: 'Right Sided', desc: 'Symptoms begin on or affect the right side.' },
                          { val: 'left', label: 'Left Sided', desc: 'Symptoms begin on or affect the left side.' },
                          { val: 'symmetrical', label: 'No Specific Affinity', desc: 'Symmetrical general symptoms.' }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => handleSelectValue('sideAffinity', opt.val)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              caseData.sideAffinity === opt.val 
                                ? 'border-primary bg-primary/5 text-primary shadow-sm font-bold' 
                                : 'border-border hover:border-primary/40 bg-bg-primary text-text-primary'
                            }`}
                          >
                            <span className="text-xs block font-bold">{opt.label}</span>
                            <span className="text-[9px] text-text-tertiary font-medium block mt-1 leading-snug">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-primary">Chief Clinical Pathology Selection</h3>
                    <p className="text-xs text-text-secondary">Determine which primary diagnostic sphere of the patient matches the current consultation focus.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { val: 'gastrointestinal', label: 'Gastrointestinal & Gastric Disorders', desc: 'Sour eructations, burning peptic cramps, dyspeptic flatulence, constipation or spasmodic colic.' },
                      { val: 'respiratory', label: 'Respiratory & Coryza Congestions', desc: 'Acute watery coryza, sneezing fits, dyspnea, suffocative dry cough in stuffy atmospheres.' },
                      { val: 'locomotor', label: 'Locomotor & Rheumatic Joint Pain', desc: 'Inflammatory articular flares, fibrositis, muscular aches, bone pains matching climate shifts.' },
                      { val: 'febrile', label: 'Febrile Cycles & Heat/Cold Stages', desc: 'Febrile states, acute matching chill cycles, thirst patterns accompanying temperature flares.' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectValue('chiefComplaint', opt.val)}
                        className={`p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          caseData.chiefComplaint === opt.val 
                            ? 'border-primary bg-primary/5 text-primary shadow-sm' 
                            : 'border-border hover:border-primary/45 bg-bg-primary text-text-primary'
                        }`}
                      >
                        <h4 className="text-xs font-bold">{opt.label}</h4>
                        <p className="text-[10px] text-text-tertiary mt-1 font-medium leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Footer Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-border">
              <button
                disabled={currentStep === 1}
                onClick={handlePrevStep}
                className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  currentStep === 1 
                    ? 'border-border/30 text-text-tertiary/40 cursor-not-allowed' 
                    : 'border-border hover:border-primary hover:text-primary cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              <button
                onClick={handleNextStep}
                disabled={
                  isSubmitting ||
                  (currentStep === 1 && !caseData.mentalState) ||
                  (currentStep === 2 && (!caseData.thermalPreference || !caseData.thirstLevel)) ||
                  (currentStep === 3 && (!caseData.aggravationFactor || !caseData.sideAffinity)) ||
                  (currentStep === 4 && !caseData.chiefComplaint)
                }
                className={`px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Repertorizing...
                  </>
                ) : currentStep === 4 ? (
                  <>
                    Generate Repertory Grid <Activity className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next Step <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Repertorization Grid and Case Study Results */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 print:bg-white print:text-black"
          >
            {/* Main Result Sheet Card */}
            <div className="bg-white dark:bg-gray-950 border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft relative overflow-hidden print:border-none print:shadow-none">
              
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-border pb-6">
                <div>
                  <span className="text-[9px] font-mono uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded font-black print:hidden">
                    Repertorization Matrix Sheet
                  </span>
                  <h2 className="text-xl font-display font-bold text-primary mt-1">Homoeopathic Simillimum Scorecard</h2>
                  <p className="text-xs text-text-tertiary">Assembled based on Kent's Evaluation Principles</p>
                </div>

                <div className="flex gap-2 print:hidden">
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 border border-border hover:border-primary rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-text-secondary" /> Print Report
                  </button>
                  <button 
                    onClick={restartSimulator}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset Case
                  </button>
                </div>
              </div>

              {/* Case Summary Panel */}
              <div className="bg-bg-primary dark:bg-gray-900 border border-border p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-black text-primary uppercase tracking-wider">Matched Patient Modalities:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium">
                  <div>
                    <span className="text-text-tertiary block text-[10px] uppercase font-bold">Mental temperament:</span>
                    <span className="capitalize">{caseData.mentalState.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block text-[10px] uppercase font-bold">Thermals:</span>
                    <span className="capitalize">{caseData.thermalPreference}</span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block text-[10px] uppercase font-bold">Thirst levels:</span>
                    <span className="capitalize">{caseData.thirstLevel.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block text-[10px] uppercase font-bold">Body side affinity:</span>
                    <span className="capitalize">{caseData.sideAffinity}</span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block text-[10px] uppercase font-bold">Worse (Aggravation):</span>
                    <span className="capitalize">{caseData.aggravationFactor.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-text-tertiary block text-[10px] uppercase font-bold">Main pathology focus:</span>
                    <span className="capitalize">{caseData.chiefComplaint}</span>
                  </div>
                </div>
              </div>

              {/* Kent's Repertorization Matrix Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-primary uppercase tracking-wider">Kentian Repertory Scoring Grid:</h3>
                <PremiumTable
                  headers={[
                    "Remedy / Polychrest",
                    "Covered Modalities & Grades",
                    "Aggregate Score",
                    "Matched Status"
                  ]}
                  headerAligns={['left', 'left', 'center', 'right']}
                  data={repertorizationResult.map((rem, idx) => [
                    <div key={rem.name}>
                      <span className="block font-bold text-primary">{rem.name}</span>
                      <span className="text-[9px] text-text-tertiary font-medium block truncate max-w-[120px]">{rem.fullName}</span>
                    </div>,
                    <div className="flex flex-wrap gap-1.5" key={`${rem.name}-sym`}>
                      {rem.symptomsMatched.map((s, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 bg-bg-secondary text-[9.5px] border border-border rounded font-semibold text-text-secondary">
                          {s}
                        </span>
                      ))}
                    </div>,
                    <span className="font-black text-sm text-primary" key={`${rem.name}-pts`}>{rem.totalPoints}</span>,
                    <div className="text-right" key={`${rem.name}-status`}>
                      {idx === 0 ? (
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-black text-[9px] uppercase tracking-wider border border-emerald-500/20">
                          Simillimum Candidate
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-primary/5 text-primary rounded-full font-bold text-[9px] uppercase tracking-wider border border-primary/10">
                          Match Grade {3 - idx > 0 ? 3 - idx : 1}
                        </span>
                      )}
                    </div>
                  ])}
                />
              </div>

              {/* Detailed Prescription Notes */}
              <div className="space-y-4 pt-3 border-t border-border">
                <h3 className="text-xs font-black text-primary uppercase tracking-wider">Active Remedy Therapeutics:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repertorizationResult.slice(0, 2).map((rem, i) => (
                    <div key={rem.name} className="bg-bg-primary dark:bg-gray-900 border border-border p-5 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center border-b border-border/40 pb-2">
                        <h4 className="text-xs font-black text-primary">{rem.fullName}</h4>
                        <span className="text-[9px] font-mono text-accent uppercase font-bold">
                          {i === 0 ? "Lead Prescription" : "Secondary Prescription"}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        {rem.keynotes}
                      </p>
                      <div className="text-[10px] font-bold text-text-tertiary">
                        {rem.grade}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Quiz Redirect Footer */}
              <div className="bg-emerald-500/5 border border-emerald-500/15 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 print:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-200">Repertorization Complete</h4>
                    <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80">Practised case studies help with post-graduate BHMS board questions.</p>
                  </div>
                </div>
                <Link 
                  to="/student-resources"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  Take Practice MCQs
                </Link>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
