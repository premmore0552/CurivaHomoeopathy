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
import { useRole } from '../context/RoleContext';

interface HomeWorkspaceBannerProps {
  profile: UserProfile;
}

export const HomeWorkspaceBanner: React.FC<HomeWorkspaceBannerProps> = ({ profile }) => {
  const { currentRole } = useRole();
  const profession = currentRole || profile.profession || 'Guest';
  const name = profile.displayName || 'Homoeopathy Scholar';

  // Customized details based on role
  const getRoleDetails = () => {
    switch (profession) {
      case 'Practitioner':
        return {
          badge: '🩺 Registered Practitioner (BHMS/MD)',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          title: `Dr. ${name}'s Clinical Desk`,
          description: 'Access precision Materia Medica drug pictures, clinical therapeutics, pathology indices, and remedy relationship networks.',
          shortcuts: [
            { name: 'Materia Medica A-Z', desc: 'Browse drug pictures, keynotes and modalities.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' },
            { name: 'Clinical Therapeutics', desc: 'Pathology-backed case management guides.', to: '/clinical-guides', icon: Activity, color: 'text-sky-500 bg-sky-500/5' },
            { name: 'Miasms Encyclopedia', desc: 'Deep-dive into chronic Psora, Sycosis, and Syphilis.', to: '/miasms', icon: GraduationCap, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Remedy Matrix', desc: 'Surgically compare modality & keynote details.', to: '/analysis', icon: Zap, color: 'text-amber-500 bg-amber-500/5' }
          ]
        };
      case 'Intern':
        return {
          badge: '🌿 Clinical Hospital Intern',
          badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
          title: `Internship Desk: ${name}`,
          description: 'Leverage dynamic repertory analysis, CBC blood report interpreters, and clinical case totality logs.',
          shortcuts: [
            { name: 'Symptom Repertory', desc: 'Map classical symptoms to exact rubrics.', to: '/symptom-checker', icon: Zap, color: 'text-orange-500 bg-orange-500/5' },
            { name: 'CBC Diagnostic Handbook', desc: 'Interpret hemogram lab reports.', to: '/cbc-handbook', icon: Activity, color: 'text-teal-500 bg-teal-500/5' },
            { name: 'Clinical Case Logs', desc: 'Log and track repertorized case studies.', to: '/profile', icon: FileText, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Materia Medica A-Z', desc: 'Reference classical drug books easily.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' }
          ]
        };
      case 'BHMS Student':
        return {
          badge: '🎓 BHMS Undergraduate Scholar',
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          title: `Scholar Desk: ${name}`,
          description: 'Train with 5000+ AIAPGET MCQs, review Organon aphorisms, 100+ flashcards, and NCH CBDC syllabus maps.',
          shortcuts: [
            { name: '1st BHMS Exam Prep', desc: 'Flagship revision guide for 1st BHMS.', to: '/first-bhms-crash-course', icon: Sparkles, color: 'text-purple-500 bg-purple-500/5' },
            { name: '5000+ AIAPGET MCQs', desc: 'Practice competitive entrance exam questions.', to: '/mcq-practice', icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Syllabus Tracker', desc: 'NCH competency target maps.', to: '/cbdc-syllabus', icon: GraduationCap, color: 'text-amber-500 bg-amber-500/5' },
            { name: 'Anatomy Core', desc: 'Interactive osteology & organ diagrams.', to: '/anatomy', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' }
          ]
        };
      case 'Faculty':
        return {
          badge: '📚 Academic Faculty & Professor',
          badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          title: `Faculty Portal: ${name}`,
          description: 'Access lecture planners, CBDC competency blueprints, university PYQs, and interactive teaching diagrams.',
          shortcuts: [
            { name: 'CBDC Syllabus Blueprint', desc: 'Manage NCH course hours and topics.', to: '/cbdc-syllabus', icon: GraduationCap, color: 'text-purple-500 bg-purple-500/5' },
            { name: 'Solved University PYQs', desc: 'Access 10-year question and answer templates.', to: '/student-resources', icon: FileText, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Remedy Relationship Maps', desc: 'Interactive visual connection graphs.', to: '/visualization', icon: Network, color: 'text-teal-500 bg-teal-500/5' },
            { name: 'Materia Medica Guides', desc: 'Lectures and drug pictures.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' }
          ]
        };
      case 'Researcher':
        return {
          badge: '🔬 Postgrad Researcher & Scholar',
          badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
          title: `Research Hub: ${name}`,
          description: 'Evaluate high-dilution clinical trial databases, drug proving archives, cytopathology miasmatics, and affinity matrices.',
          shortcuts: [
            { name: 'Miasms & Cytopathology', desc: 'Psora, Sycosis & Syphilis research papers.', to: '/miasms', icon: GraduationCap, color: 'text-cyan-500 bg-cyan-500/5' },
            { name: 'Remedy Affinity Analyzer', desc: 'Side-by-side concordance analysis.', to: '/analysis', icon: Activity, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Evidence Repository', desc: 'Scientific proofs & ultra-high dilution data.', to: '/public-education', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/5' },
            { name: 'Stalwarts Drug Provings', desc: 'Classical provings and historical records.', to: '/stalwarts', icon: BookOpen, color: 'text-amber-500 bg-amber-500/5' }
          ]
        };
      case 'Administrator':
        return {
          badge: '🛡️ Portal Administrator',
          badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
          title: `Admin Control Panel: ${name}`,
          description: 'Audit internal link connectivity, knowledge graph integrity, security parameters, and user case log registries.',
          shortcuts: [
            { name: 'Knowledge Graph Audit', desc: 'Inspect website link architecture.', to: '/admin/link-audit', icon: Network, color: 'text-red-500 bg-red-500/5' },
            { name: 'Case Log Registries', desc: 'Review user-logged clinical totals.', to: '/profile', icon: FileText, color: 'text-amber-500 bg-amber-500/5' },
            { name: 'CBDC Course Builder', desc: 'Configure university subject modules.', to: '/cbdc-syllabus', icon: GraduationCap, color: 'text-indigo-500 bg-indigo-500/5' },
            { name: 'Sitemaps Overview', desc: 'Audit active route registries.', to: '/public-education', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' }
          ]
        };
      case 'Public':
      case 'Guest':
      default:
        return {
          badge: '📖 Guest & Public Reader Desk',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          title: `Welcome, ${name}`,
          description: 'Accelerate your Homoeopathic learning. Explore plant remedy databases, stalwarts biographies, and ask direct questions.',
          shortcuts: [
            { name: 'Materia Medica A-Z', desc: 'Introduction to classical remedies.', to: '/materia-medica', icon: BookOpen, color: 'text-emerald-500 bg-emerald-500/5' },
            { name: 'Public Health Education', desc: 'Demystifying Homoeopathy myths.', to: '/public-education', icon: HelpCircle, color: 'text-red-500 bg-red-500/5' },
            { name: 'Free Patient eBooks', desc: 'Download wellness handbooks.', to: '/ebooks', icon: FileText, color: 'text-amber-500 bg-amber-500/5' },
            { name: 'Stalwarts Biographies', desc: 'Genesis & classical works of masters.', to: '/stalwarts', icon: GraduationCap, color: 'text-slate-500 bg-slate-500/5' }
          ]
        };
    }
  };

  const details = getRoleDetails();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/20 text-white rounded-3xl border-2 border-border/20 shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-6 md:p-10 overflow-hidden"
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
