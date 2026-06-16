import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Activity, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  Users, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  History, 
  Award, 
  Network, 
  Zap,
  Flame, 
  Trophy, 
  CheckCircle2, 
  RefreshCw,
  TrendingUp,
  BrainCircuit,
  Lock,
  Layers
} from 'lucide-react';
import Hero from '../components/Hero';
import FeaturedArticles from '../components/FeaturedArticles';
import FeaturedQuestions from '../components/FeaturedQuestions';
import SEO from '../components/SEO';
import { BlogPost } from '../types';
import { useUser } from '../hooks/useUser';
import { HomeWorkspaceBanner } from '../components/HomeWorkspaceBanner';
import LearningPath from '../components/LearningPath';

const funnelSteps = [
  {
    id: 'organon',
    title: 'The Foundation',
    subtitle: 'Organon of Medicine',
    description: 'Master the logic and philosophy of homoeopathy. Explore 291 aphorisms with historical context and clinical insights.',
    icon: GraduationCap,
    link: '/lexicon/philosophy',
    color: 'bg-primary'
  },
  {
    id: 'materia-medica',
    title: 'The Materia Medica',
    subtitle: 'Materia Medica A-Z',
    description: 'A comprehensive alphabetical study of homoeopathic drug pictures. Explore detailed keynotes, modalities, and standard drug provers representations for all major remedies.',
    icon: BookOpen,
    link: '/materia-medica',
    color: 'bg-emerald-600'
  },
  {
    id: 'clinical-guides',
    title: 'The Therapeutics',
    subtitle: 'Clinical Materia Medica',
    description: 'Explore detailed therapeutic guides, clinical articles, and pathology-backed disease indices designed for evidence-based practice and case management.',
    icon: Activity,
    link: '/clinical-guides',
    color: 'bg-accent'
  },
  {
    id: 'repertory',
    title: 'The Analysis',
    subtitle: 'Interactive Repertory',
    description: 'Dynamic symptom-to-remedy mapping. Filter thousands of clinical indications to find the most accurate medicinal match.',
    icon: Zap,
    link: '/repertory',
    color: 'bg-orange-600'
  },
  {
    id: 'relationships',
    title: 'The Mapping',
    subtitle: 'Remedy Nexus',
    description: "Visualize 'Complementary', 'Inimical', and 'Antidotal' networks. Refine your long-term clinical strategy.",
    icon: Network,
    link: '/nexus',
    color: 'bg-indigo-600'
  },
  {
    id: 'mcq-practice',
    title: 'The Evaluation',
    subtitle: 'Competitive MCQs',
    description: 'Prepare for AIAPGET and competitive exams with 10,000+ targeted MCQs. Simulate exam conditions with timed sessions.',
    icon: ShieldCheck,
    link: '/mcq-practice',
    color: 'bg-slate-700'
  }
];

// Curated homeopathic riddles for gamification
const mysteryRiddles = [
  {
    id: 1,
    clue: "I am extremely sensitive to cold air, yet my headaches are relieved by tight bandaging. My key emotional state is intense sadness, crying when describing symptoms, but I am warm-blooded and crave fresh open air.",
    options: ["Pulsatilla", "Hepar Sulph", "Silicea"],
    correct: "Pulsatilla",
    explanation: "Pulsatilla prates of tears and wind; warm-blooded but loves open, fresh air, and feels relieved by soft open breezes."
  },
  {
    id: 2,
    clue: "I have an extraordinary craving for salt and a profound aversion to the heat of the sun. Deeply introverted, my grief is silent, and consolation only makes my anger or annoyance worse.",
    options: ["Lycopodium", "Natrum Mur", "Arsenicum Alb"],
    correct: "Natrum Mur",
    explanation: "Natrum Muriaticum is famous for mapped tongue, salt cravings, introverted grief, and aggravation from direct sun and consolation."
  },
  {
    id: 3,
    clue: "I am highly meticulous, extremely anxious about health, and neat to a fault. I feel chilly, crave sips of warm water, and experience burning pains that are paradoxically relieved by heat.",
    options: ["Arsenicum Alb", "Phosphorus", "Sulphur"],
    correct: "Arsenicum Alb",
    explanation: "Arsenicum Album exhibits classic restlessness, need for warm sips, extreme chilly nature, and burning relieved by hot applications."
  }
];

export default function Home() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { profile } = useUser();

  // Gamified States (persisted locally)
  const [xp, setXp] = useState(() => Number(localStorage.getItem('curiva_xp') || 150));
  const [level, setLevel] = useState(() => Number(localStorage.getItem('curiva_level') || 1));
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('curiva_streak') || 3));
  const [riddleIndex, setRiddleIndex] = useState(() => Number(localStorage.getItem('curiva_riddle_idx') || 0));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ success: boolean; msg: string } | null>(null);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    const raw = localStorage.getItem('curiva_badges');
    return raw ? JSON.parse(raw) : ['initiated'];
  });

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/read/${post.slug}`);
  };

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  // Persist gamified data
  useEffect(() => {
    localStorage.setItem('curiva_xp', xp.toString());
    localStorage.setItem('curiva_level', level.toString());
    localStorage.setItem('curiva_streak', streak.toString());
    localStorage.setItem('curiva_riddle_idx', riddleIndex.toString());
    localStorage.setItem('curiva_badges', JSON.stringify(unlockedBadges));
  }, [xp, level, streak, riddleIndex, unlockedBadges]);

  const awardXp = (amount: number, badgeName?: string) => {
    setXp(prev => {
      const newXp = prev + amount;
      const nextLevelThreshold = level * 1000;
      if (newXp >= nextLevelThreshold) {
        setLevel(l => l + 1);
        setQuizFeedback(f => f ? { ...f, msg: `🎉 LEVEL UP! You are now Level ${level + 1}! ${f.msg}` } : null);
        if (!unlockedBadges.includes('level_up')) {
          setUnlockedBadges(b => [...b, 'level_up']);
        }
      }
      return newXp;
    });

    if (badgeName && !unlockedBadges.includes(badgeName)) {
      setUnlockedBadges(prev => [...prev, badgeName]);
    }
  };

  const handleAnswerSubmit = (option: string) => {
    if (selectedOption) return; // Prevent secondary clicks
    setSelectedOption(option);
    const currRiddle = mysteryRiddles[riddleIndex];
    if (option === currRiddle.correct) {
      setQuizFeedback({ success: true, msg: `Excellent! ${currRiddle.explanation}` });
      awardXp(300, 'riddle_master');
      setStreak(s => s + 1);
    } else {
      setQuizFeedback({ success: false, msg: `Not quite right! That refers to another remedy. Give it another thought!` });
    }
  };

  const cycleRiddle = () => {
    setRiddleIndex(prev => (prev + 1) % mysteryRiddles.length);
    setSelectedOption(null);
    setQuizFeedback(null);
  };

  const currentRiddle = mysteryRiddles[riddleIndex];
  const rankNames = [
    'Acolyte Prescriber',
    'Repertory Disciple',
    'Miasm Combatant',
    'Therapeutic Scholar',
    'Hahnemann Stalwart'
  ];
  const rankName = rankNames[Math.min(level - 1, rankNames.length - 1)];

  return (
    <>
      <SEO 
        title="Curiva Homoeopathy | Precision Learning & Clinical Excellence"
        description="The ultimate funnel for homoeopathic mastery. From Organon principles to Materia Medica depth and historical stalwarts."
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-bg-primary"
      >
        <Hero />

        {profile && <HomeWorkspaceBanner profile={profile} />}

        {/* Dynamic Gamified Study Arena Dashboard Section */}
        <section className="py-16 bg-bg-secondary/40 border-y border-border/10">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 text-accent text-[10px] font-black uppercase tracking-widest mb-4 border border-accent/20"
              >
                <BrainCircuit className="w-4 h-4 text-accent" /> Active Study Arena
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-text-primary tracking-tight">
                Gamified <span className="text-primary italic">Learning Hub</span>
              </h2>
              <p className="text-text-secondary font-serif italic text-lg mt-3 max-w-xl mx-auto">
                Test your Materia Medica instincts, build streaks, unlock ranks, and claim classical accomplishments.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Gamified Rank Card */}
              <div className="lg:col-span-5 p-8 md:p-10 bg-gradient-to-br from-bg-secondary to-bg-primary rounded-[3rem] border border-border/30 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-accent font-black uppercase tracking-[0.2em] text-[10px]">Your Academic Rank</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-black">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> {streak} day streak
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">Level {level}</div>
                      <h3 className="text-2xl md:text-3xl font-display font-medium text-text-primary italic">
                        {rankName}
                      </h3>
                    </div>
                  </div>

                  {/* Level Progress-Bar */}
                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between text-xs font-bold text-text-secondary uppercase tracking-widest">
                      <span>XP Progress</span>
                      <span>{xp} / {level * 1000} XP</span>
                    </div>
                    <div className="h-2.5 w-full bg-border/40 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (xp / (level * 1000)) * 100)}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-primary to-[#428c68] rounded-full" 
                      />
                    </div>
                  </div>
                </div>

                {/* Achievements Showcase */}
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-[#c5a059] mb-4">Milestone Accomplishments</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`p-4 rounded-2xl border text-center transition-all ${unlockedBadges.includes('initiated') ? 'bg-primary/5 border-primary/20 text-text-primary' : 'bg-bg-primary/30 border-border/10 opacity-40'}`}>
                      <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <div className="text-[8px] font-black uppercase tracking-wider">Acolyte</div>
                    </div>
                    <div className={`p-4 rounded-2xl border text-center transition-all ${unlockedBadges.includes('riddle_master') ? 'bg-accent/10 border-accent/30 text-text-primary' : 'bg-bg-primary/30 border-border/10 opacity-40'}`}>
                      <BrainCircuit className="w-6 h-6 mx-auto mb-2 text-accent" />
                      <div className="text-[8px] font-black uppercase tracking-wider">Riddler</div>
                    </div>
                    <div className={`p-4 rounded-2xl border text-center transition-all ${unlockedBadges.includes('level_up') ? 'bg-purple-500/10 border-purple-500/20 text-text-primary' : 'bg-bg-primary/30 border-border/10 opacity-40'}`}>
                      <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                      <div className="text-[8px] font-black uppercase tracking-wider">Ascended</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Daily Riddle */}
              <div className="lg:col-span-7 p-8 md:p-10 bg-gradient-to-br from-bg-primary via-bg-secondary/40 to-bg-primary rounded-[3rem] border border-border/30 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8 border-b border-border/20 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
                      <span className="text-text-primary font-display italic text-lg font-medium">Daily Keynote Mystery</span>
                    </div>
                    <button 
                      onClick={cycleRiddle}
                      className="p-2 hover:bg-bg-secondary rounded-xl text-text-secondary hover:text-primary transition-all duration-300"
                      title="Next Riddle"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-lg text-text-primary font-serif italic leading-relaxed mb-8">
                    "{currentRiddle.clue}"
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] mb-4">Formulate Your Diagnosis</div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {currentRiddle.options.map(option => {
                      const isCorrect = option === currentRiddle.correct;
                      const isSelected = selectedOption === option;
                      let btnStyle = "bg-bg-primary border-border hover:border-primary/50 text-text-secondary";
                      
                      if (selectedOption) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300";
                        } else if (isSelected) {
                          btnStyle = "bg-red-500/10 border-red-500 text-red-700 dark:text-red-300";
                        } else {
                          btnStyle = "bg-bg-primary/25 border-border/10 opacity-50 text-text-tertiary pointer-events-none";
                        }
                      }

                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswerSubmit(option)}
                          className={`p-4 rounded-2xl border text-xs font-black uppercase tracking-widest text-center transition-all ${btnStyle}`}
                          disabled={!!selectedOption}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    {quizFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-5 rounded-2xl text-xs leading-relaxed border ${quizFeedback.success ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-serif italic' : 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400 font-serif italic'}`}
                      >
                        {quizFeedback.msg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Interactive Learning Path Skill Tree Section */}
        <section className="py-20 border-t border-border/10 bg-bg-primary">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20"
              >
                <Layers className="w-4 h-4 text-primary" /> Educational Blueprint
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-text-primary tracking-tight">
                Interactive <span className="text-primary italic">Learning Path</span>
              </h2>
              <p className="text-text-secondary font-serif italic text-lg mt-3 max-w-xl mx-auto">
                Unlock, explore, and master each classical branch of homoeopathic science. Track your real-time academic progression.
              </p>
            </div>

            <LearningPath profile={profile} />
          </div>
        </section>

        {/* Spacious Funnel Modules Container */}
        <section className="py-28 md:py-36 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-[10px] font-black uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" /> Classical Homoeopathy Curriculum
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-display font-medium text-text-primary tracking-tight leading-[0.9]">
                Evidence-Based <br/> <span className="text-primary italic">Intelligence</span>
              </h2>
            </div>

            {/* Grid Layout of Academy Paths - Upgraded for pristine spacing and layout symmetry */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {funnelSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
                  className="group relative h-full"
                >
                  <div className="flex flex-col h-full p-8 md:p-10 bg-bg-secondary/40 rounded-[2.5rem] border border-border/20 shadow-soft transition-all duration-500 hover:shadow-lg hover:border-accent/40 hover:-translate-y-1 bg-gradient-to-b from-bg-secondary/30 to-bg-primary/20">
                     <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                       <step.icon className="w-7 h-7 text-white" />
                     </div>
                     <div className="text-accent font-black uppercase tracking-[0.25em] text-[9px] mb-3">{step.title}</div>
                     <h3 className="text-2xl md:text-3xl font-display font-medium text-text-primary mb-4 italic tracking-tight leading-none">
                       {step.subtitle}
                     </h3>
                     <p className="text-base text-text-secondary leading-relaxed mb-8 flex-grow font-serif italic">
                       {step.description}
                     </p>
                     
                     <div className="pt-4 border-t border-border/10">
                       <Link 
                         to={step.link}
                         className="inline-flex items-center gap-2.5 text-primary dark:text-[#6fb291] font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all"
                       >
                         Enter Domain <ArrowRight className="w-3.5 h-3.5" />
                       </Link>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Visualizers & Community Sections */}
        <section className="py-20 border-t border-border/15 bg-bg-secondary/25">
          <FeaturedQuestions />
        </section>

        <section className="py-20">
          <FeaturedArticles onSelectPost={handleSelectPost} />
        </section>
      </motion.div>
    </>
  );
}
