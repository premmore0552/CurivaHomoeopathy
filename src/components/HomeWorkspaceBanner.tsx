import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Activity, 
  GraduationCap, 
  ShieldCheck, 
  Network, 
  Zap, 
  UserCheck, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { UserProfile } from '../services/userService';

interface HomeWorkspaceBannerProps {
  profile: UserProfile;
}

export const HomeWorkspaceBanner: React.FC<HomeWorkspaceBannerProps> = ({ profile }) => {
  const profession = profile.profession || 'user';
  const name = profile.displayName || 'Homeopathy Scholar';

  // Customized details based on role
  const getRoleDetails = () => {
    switch (profession) {
      case 'doctor':
        return {
          badge: '🩺 Homoeopathy Doctor (BHMS, MD-Hom)',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          title: `Dr. ${name}'s Clinical Desk`,
          description: 'Access precision Materia Medica drug pictures, clinical therapeutics, pathology indices, and remedy relationship networks.',
          shortcuts: [
            { name: 'Materia Medica A-Z', desc: 'Browse drug pictures, keynotes and modalities.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' },
            { name: 'Clinical Therapeutics', desc: 'Pathology-backed case management guides.', to: '/clinical-guides', icon: Activity, color: 'text-sky-500 bg-sky-500/5' },
            { name: 'Remedy Nexus', desc: 'Analyze complementary/inimical remedies.', to: '/nexus', icon: Network, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'My Saved Library', desc: 'Saved clinical cases and references.', to: '/library', icon: FileText, color: 'text-amber-500 bg-amber-500/5' }
          ]
        };
      case 'practitioner':
        return {
          badge: '🌿 Clinical Practitioner',
          badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
          title: `Practitioner Workspace: ${name}`,
          description: 'Leverage dynamic repertory analysis, comparative remedy visualizers, and historical stalwarts drug provings.',
          shortcuts: [
            { name: 'Interactive Repertory', desc: 'Map classical symptoms to exact remedies.', to: '/repertory', icon: Zap, color: 'text-orange-500 bg-orange-500/5' },
            { name: 'Comparative Analysis', desc: 'Compare modality & keynote details.', to: '/analysis', icon: Activity, color: 'text-teal-500 bg-teal-500/5' },
            { name: 'Remedy Nexus', desc: 'Navigate remedy antidotes and provers.', to: '/nexus', icon: Network, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Materia Medica A-Z', desc: 'Reference classical drug books easily.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' }
          ]
        };
      case 'student':
        return {
          badge: '🎓 Academic Student / Scholar',
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          title: `Scholar Desk: ${name}`,
          description: 'Train with 10,000+ competitive Homeopathy PG MCQs, examine Organon principles and view anatomical remedy visualizers.',
          shortcuts: [
            { name: 'Targeted MCQ Practice', desc: 'Excel in PG access and BHMS tests.', to: '/mcq-practice', icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Organon & Philosophy', desc: 'Examine 291 Hahnemannian aphorisms.', to: '/lexicon/philosophy', icon: GraduationCap, color: 'text-amber-500 bg-amber-500/5' },
            { name: 'Remedy Visualizer', desc: 'Interactive organ-based remedy mapping.', to: '/visualization', icon: Sparkles, color: 'text-purple-500 bg-purple-500/5' },
            { name: 'Symptoms Repertory', desc: 'Practice study lists of symptom rubrics.', to: '/repertory', icon: Zap, color: 'text-orange-500 bg-orange-500/5' }
          ]
        };
      case 'user':
      default:
        return {
          badge: '📖 Classic Reader / Learner',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          title: `Welcome, ${name}`,
          description: 'Accelerate your homeopathic self-study. Discover organic plant-remedies database, stalwarts biography and ask direct questions.',
          shortcuts: [
            { name: 'Materia Medica Guides', desc: 'A-Z introduction to homeopathic remedies.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' },
            { name: 'Stalwarts Biography', desc: 'Learn the genesis & classical works.', to: '/stalwarts', icon: GraduationCap, color: 'text-slate-500 bg-slate-500/5' },
            { name: 'Public Education', desc: 'Learn the principles & read wellness FAQs.', to: '/public-education', icon: HelpCircle, color: 'text-red-500 bg-red-500/5' },
            { name: 'My Saved Library', desc: 'Bookmarks of useful remedies or articles.', to: '/library', icon: FileText, color: 'text-amber-500 bg-amber-500/5' }
          ]
        };
    }
  };

  const details = getRoleDetails();

  return (
    <div className="max-w-[1400px] mx-auto px-6 relative z-10 mt-8 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/20 text-white rounded-[3.5rem] border-2 border-border/20 shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-8 md:p-14 overflow-hidden"
      >
        {/* Intricate decorative outline */}
        <div className="absolute inset-0 border border-white/5 rounded-[3.4rem] pointer-events-none m-1" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-emerald-500/5 to-transparent blur-3xl opacity-60 pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`inline-flex items-center gap-2 px-4.5 py-2 rounded-full border text-[11px] font-black uppercase tracking-widest ${details.badgeColor}`}>
              <UserCheck className="w-3.5 h-3.5" />
              {details.badge}
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-none">
              {details.title}
            </h2>

            <p className="text-zinc-400 font-serif italic text-lg leading-relaxed">
              {details.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-primary-dark font-black text-[10px] uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-accent/20"
              >
                Configure My Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Shortcut Shortcuts */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {details.shortcuts.map((shortcut, index) => {
              const IconComponent = shortcut.icon;
              return (
                <motion.div
                  key={shortcut.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative"
                >
                  <Link
                    to={shortcut.to}
                    className="flex flex-col h-full justify-between p-6 bg-white/5 border border-white/10 hover:border-accent/40 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6 ${shortcut.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-display text-white font-medium italic group-hover:text-accent transition-colors">
                        {shortcut.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-2 font-serif italic leading-relaxed line-clamp-2">
                        {shortcut.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-end pt-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-accent transition-colors flex items-center gap-1.5 hover:gap-3">
                        Launch <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
