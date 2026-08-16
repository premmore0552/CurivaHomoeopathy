import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  BookOpen, 
  Stethoscope, 
  Activity, 
  Cpu, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Globe
} from 'lucide-react';
import { useRole, UserRole } from '../context/RoleContext';

export default function RoleOnboardingModal() {
  const { onboardingCompleted, completeOnboarding, currentRole, setCurrentRole } = useRole();
  const [isOpen, setIsOpen] = React.useState(!onboardingCompleted);

  useEffect(() => {
    setIsOpen(!onboardingCompleted);
  }, [onboardingCompleted]);

  const rolesList: {
    id: UserRole;
    title: string;
    titleShort?: string;
    description: string;
    icon: any;
    color: string;
    features: string[];
  }[] = [
    {
      id: 'Guest',
      title: 'Guest / Sandbox Visitor',
      titleShort: 'Guest',
      description: 'Explore all features, subject portals, and simulators without registration.',
      icon: User,
      color: 'border-zinc-200 bg-zinc-50/50 dark:bg-zinc-950/10 dark:border-zinc-900/30 text-zinc-600',
      features: ['Full Sandbox Access', 'Interactive Simulators', 'Universal Profile Switching']
    },
    {
      id: 'Public',
      title: 'Public / Patient',
      titleShort: 'Public',
      description: 'Enthusiasts or patients seeking simple health education & wellness eBooks.',
      icon: Globe,
      color: 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900/30 text-blue-600',
      features: ['Demystified Guides', 'Patient Wellness eBooks', 'Ask-a-Homoeopath Portal']
    },
    {
      id: 'BHMS Student',
      title: 'BHMS College Student',
      description: 'Medical students reviewing syllabus, anatomy guides, solved papers & MCQs.',
      icon: GraduationCap,
      color: 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/10 dark:border-emerald-900/30 text-emerald-600',
      features: ['1st BHMS Exam Prep', 'Subject Libraries', 'Mock AIAPGET Exams']
    },
    {
      id: 'Intern',
      title: 'Clinical Intern',
      description: 'Senior students logging simulated cases, analyzing hemograms & diagnostics.',
      icon: Activity,
      color: 'border-indigo-200 bg-indigo-50/50 dark:bg-indigo-950/10 dark:border-indigo-900/30 text-indigo-600',
      features: ['Symptom Repertorization', 'CBC Report Analyzer', 'Clinical Totality Logs']
    },
    {
      id: 'Practitioner',
      title: 'Registered Practitioner',
      description: 'Active doctors studying polychrests, chronic miasms & comparative drug matrices.',
      icon: Stethoscope,
      color: 'border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-900/30 text-amber-600',
      features: ['Comparative Remedy Analyzer', 'Concordance Drug Nexus', 'Miasms Encyclopedia']
    },
    {
      id: 'Faculty',
      title: 'Academic Faculty',
      description: 'Professors aligning NCH CBDC syllabus, lecture notes & interactive maps.',
      icon: BookOpen,
      color: 'border-purple-200 bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900/30 text-purple-600',
      features: ['Teaching Planner', 'Collegiate MCQ Compilers', 'PYQ Answer Templates']
    },
    {
      id: 'Researcher',
      title: 'Postgrad Researcher',
      description: 'Scholars evaluating clinical trials, drug provings & cytopathology papers.',
      icon: Cpu,
      color: 'border-cyan-200 bg-cyan-50/50 dark:bg-cyan-950/10 dark:border-cyan-900/30 text-cyan-600',
      features: ['Clinical Trial Databases', 'ultra-high dilution evidence', 'Affinity concordances']
    },
    {
      id: 'Administrator',
      title: 'Portal Administrator',
      description: 'System operators auditing sitemaps, link hierarchies & user registries.',
      icon: ShieldCheck,
      color: 'border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/30 text-red-600',
      features: ['Knowledge Graph & Link Audit', 'Simulated Totality Logs Review', 'Portal security parameters']
    }
  ];

  const handleSelectRole = (role: UserRole) => {
    completeOnboarding(role);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-bg-primary border border-border rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.25)] p-6 md:p-10 my-8 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,76,59,0.05),transparent_40%)] pointer-events-none" />

        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to Curiva Homoeopathy
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-primary font-light">
            Personalize Your Knowledge Portal
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            Select your medical, academic, or general profile. Curiva dynamically optimizes its homepage, sitemaps, dashboards, clinical tools, and research databases to match your learning goals perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
          {rolesList.map((role) => {
            const IconComponent = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`flex flex-col text-left p-5 border rounded-2xl transition-all duration-300 relative group overflow-hidden ${role.color} hover:shadow-lg active:scale-[0.99] hover:translate-y-[-2px] border-border/80 cursor-pointer`}
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-bg-primary shadow-sm group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>
                  <h3 className="font-bold text-text-primary text-sm leading-tight group-hover:text-primary transition-colors">{role.title}</h3>
                </div>

                <p className="text-[11px] text-text-secondary leading-relaxed flex-grow font-sans">
                  {role.description}
                </p>

                <div className="mt-4 pt-3.5 border-t border-border/40 w-full space-y-1.5">
                  {role.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[9px] font-mono text-text-secondary uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-[11px] text-text-tertiary relative z-10">
          <span>You can switch profiles instantly at any time from the account tab.</span>
          <button 
            onClick={() => handleSelectRole('Guest')}
            className="font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1"
          >
            Continue as Guest <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import { useEffect } from 'react';
