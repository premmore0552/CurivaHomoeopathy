import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  FileText, 
  Activity, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  PlusCircle, 
  Compass, 
  Printer, 
  LogOut, 
  CheckCircle2, 
  ClipboardList, 
  AlertCircle,
  HelpCircle,
  Loader2,
  Stethoscope,
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  Shield,
  BookMarked,
  Info,
  ChevronRight,
  BookOpenText,
  BadgeAlert,
  Database
} from 'lucide-react';
import { auth, signOut } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import SEO from '../components/SEO';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import StudyToolkitDashboard from '../components/StudyToolkitDashboard';
import { useRole, UserRole } from '../context/RoleContext';
import { useUser } from '../hooks/useUser';
import { userService } from '../services/userService';

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentRole, setCurrentRole, authorizedRoles } = useRole();
  const { profile } = useUser();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'planner' | 'settings'>(() => searchParams.get('tab') === 'settings' ? 'settings' : 'planner');

  useEffect(() => { if (searchParams.get('tab') === 'planner') setActiveTab('planner'); }, [searchParams]);

  // Profile fields state
  const [displayName, setDisplayName] = useState('');
  const [profession, setProfession] = useState('BHMS Student');
  const [bio, setBio] = useState('');
  const [qualifications, setQualifications] = useState('Undergraduate');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Remove legacy browser copies of health-related case/screening content. These
  // collections are blocked by Firestore rules and are no longer part of the profile.
  useEffect(() => {
    try {
      localStorage.removeItem('curiva_demo_kits');
      localStorage.removeItem('curiva_latest_assessment');
      localStorage.removeItem('curiva_guest_clinic');
    } catch {
      // The page remains usable when browser storage is unavailable.
    }
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setDisplayName(currentUser?.displayName || '');
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sync profile fields with state on change
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setProfession(profile.profession && !/admin/i.test(profile.profession) ? profile.profession : 'BHMS Student');
      setBio(profile.bio || '');
      setQualifications(profile.qualifications || 'Undergraduate');
    } else {
      const guestName = localStorage.getItem('curiva_guest_name') || '';
      const storedGuestRole = localStorage.getItem('curiva_selected_role') || 'Guest';
      const guestRole = (/admin/i.test(storedGuestRole) ? 'Guest' : storedGuestRole) as UserRole;
      const guestBio = localStorage.getItem('curiva_guest_bio') || '';
      const guestQual = localStorage.getItem('curiva_guest_qualifications') || '1st BHMS';

      setDisplayName(guestName);
      setProfession(guestRole);
      setBio(guestBio);
      setQualifications(guestQual);
    }
  }, [profile]);

  const handleSignInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Sign in failed: ", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {
      console.error("Sign out failed: ", e);
    }
  };

  // Save Settings Form
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus(null);
    try {
      const targetRole = (/admin/i.test(profession) ? 'BHMS Student' : profession) as UserRole;
      if (user) {
        await userService.updateProfileSettings({
          displayName,
          bio,
          qualifications,
          profession: targetRole
        });
        await setCurrentRole(targetRole);
      } else {
        localStorage.setItem('curiva_guest_name', displayName);
        localStorage.setItem('curiva_selected_role', targetRole);
        localStorage.setItem('curiva_guest_bio', bio);
        localStorage.setItem('curiva_guest_qualifications', qualifications);
        await setCurrentRole(targetRole);
      }
      setSaveStatus({ type: 'success', message: `Account profile updated. Active workspace role: ${targetRole}.` });
      setTimeout(() => setSaveStatus(null), 5000);
    } catch (err: any) {
      console.error(err);
      setSaveStatus({ type: 'error', message: 'Failed to update practitioner credentials. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <h2 className="text-sm font-display uppercase tracking-widest text-text-secondary">Loading BHMS Portal</h2>
      </div>
    );
  }

  // Define some high-yield Clinical Pearls
  const clinicalPearls = [
    { title: "Aphorism 153", content: "Focus on striking, singular, uncommon, and peculiar (characteristic) signs. Common diagnostic physical symptoms carry minor weight in choosing the simillimum remedy." },
    { title: "Mental Primacy", content: "Emotional disposition, will, and intellect alterations are the ultimate guides. If the remedy contradicts the patient's thermal or mental totality, it will fail." },
    { title: "Miasmatic Cleansing", content: "If a patient's case stalls despite well-selected constitutional remedies, investigate the latent miasm. A single dose of Psorinum or Medorrhinum often unlocks the totality." }
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-24 font-sans text-text-primary selection:bg-primary/20 selection:text-primary">
      <SEO 
        title="Practitioner Portfolio & Study Tracker | Curiva"
        description="Access and track your simulated case repertorizations, review active recall boards, university past papers scores, and organize study schedules."
      />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-text-tertiary mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3 h-3 text-text-tertiary" />
          <span className="text-text-secondary font-semibold">Practitioner Portfolio</span>
        </nav>

        {/* Banner Headers - Redesigned for visual logic & negative space */}
        <div className="relative bg-bg-secondary text-text-primary rounded-2xl border border-border/80 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 overflow-hidden shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.03)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" /> Academic Workspace: {currentRole}
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-light text-primary">
              {user ? `Welcome, ${displayName || user.displayName || 'Practitioner'}` : "BHMS Sandbox Portfolio"}
            </h1>
            <p className="text-text-secondary max-w-2xl text-xs md:text-sm leading-relaxed">
              {user 
                ? "Track simulated repertorizations, review university entrance exam marks, and organize study timelines. Your data is synced automatically with your secure database."
                : "Sign in with Google to synchronize your clinical repertorizations and academic records securely, or use the local sandbox below."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 self-start md:self-center">
            {!user ? (
              <button
                onClick={handleSignInGoogle}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow hover:shadow-lg shadow-primary/10 cursor-pointer"
              >
                Sign In with Google
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="px-5 py-2.5 bg-bg-tertiary hover:bg-red-500/10 border border-border hover:border-red-500/20 text-text-primary hover:text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Guest Demo Notice */}
        {!user && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4.5 mb-8 flex gap-3.5 items-center">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-text-secondary">
              <strong className="text-text-primary font-bold">Local Sandbox Profile:</strong> You are using a browser-local study workspace. It clears when this tab/session ends. Do not enter patient names, medical record numbers, clinical histories, reports, or any identifiable health information.
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-border mb-10 overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'planner', label: 'BHMS Study Planner', icon: Compass },
            { id: 'settings', label: 'Practitioner Credentials', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  active 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-text-tertiary hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="space-y-10">
          
          {/* Shared Curiva Study Toolkit dashboard */}
          {activeTab === 'planner' && (
            <div className="space-y-4 animate-fadeIn">
              <StudyToolkitDashboard />
            </div>
          )}

          {/* Practitioner Credentials Tab */}
          {activeTab === 'settings' && (
            <div className="bg-bg-secondary border border-border rounded-2xl p-6 md:p-10 shadow-soft space-y-8 animate-fadeIn max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-display text-primary font-bold">Account Profile</h3>
                <p className="text-xs text-text-tertiary leading-normal mt-0.5">Only basic display and learning-role information is stored in your Curiva account. Do not add patient or clinical details here.</p>
              </div>

              {saveStatus && (
                <div className={`p-4 rounded-xl border text-xs ${
                  saveStatus.type === 'success' 
                    ? 'bg-green-500/5 border-green-500/20 text-green-800' 
                    : 'bg-red-500/5 border-red-500/20 text-red-800'
                }`}>
                  {saveStatus.message}
                </div>
              )}

              <form onSubmit={handleSaveSettingsSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Official Display Name</label>
                    <input 
                      type="text" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dr. Johnchand More"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Academic Email Address</label>
                    <input 
                      type="email" 
                      value={user ? (user.email || '') : 'guest_simulation@curiva.co'}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs opacity-60 cursor-not-allowed font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Professional Role / Active Workspace Role</label>
                    <select 
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                    >
                      <option value="Guest">Guest - Guest Visitor / Sandbox User</option>
                      <option value="Public">Public - Public Reader / Patient</option>
                      <option value="BHMS Student">BHMS Student - BHMS College Student</option>
                      <option value="Intern">Intern - Hospital / Clinical Intern</option>
                      <option value="Practitioner">Practitioner - Registered Practitioner (BHMS/MD)</option>
                      <option value="Faculty">Faculty - Faculty Member / Professor</option>
                      <option value="Researcher">Researcher - Homoeopathic Researcher / Scholar</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">BHMS Academic Level</label>
                    <select 
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                    >
                      <option value="1st BHMS">1st Year BHMS (Human Anatomy, Human Physiology, Homoeopathic Pharmacy, Organon Of Medicine, Homoeopathic Materia Medica)</option>
                      <option value="2nd BHMS">2nd Year BHMS (Pathology, Forensic Medicine And Toxicology, Organon Of Medicine, Materia Medica)</option>
                      <option value="3rd BHMS">3rd Year BHMS (Surgery, GYN, Organon Of Medicine, Materia Medica)</option>
                      <option value="4th BHMS">4th Year BHMS (Practice Of Medicine, Repertory, Organon Of Medicine, Materia Medica)</option>
                      <option value="Graduated">Graduated / Intern / Practitioner</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary">Short Professional Bio</label>
                  <textarea 
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Homoeopathic Reader, BHMS scholar focusing on comparative Materia Medica and classical repertory methods."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow hover:shadow-lg shadow-primary/10"
                  >
                    Save Portfolio Settings
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Academic FAQs & Study Resource Section */}
        <section className="mt-20 border-t border-border/60 pt-12 space-y-8">
          <div>
            <h2 className="text-xl font-display text-primary font-bold">Frequently Asked Questions</h2>
            <p className="text-xs text-text-tertiary">Privacy-first account settings and academic study workspace guidance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-accent" /> How is my study workspace stored?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Tasks, notes, flashcards, reading logs and reflections are stored only in the current browser tab session. They are not sent to Firestore. Never enter real patient information; use only fictional academic examples.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-accent" /> How does the active workspace role switcher work?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Curiva Homoeopathy uses role-personalized layouts to adjust content density and tool suggestions automatically. Swapping your credentials dynamically changes your quick action guides, search recommendations, and reading difficulty indicators.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-accent" /> Are patient records supported?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                No. Curiva's general study workspace is not a patient-record system. It has no approved clinical-record workflow, access controls, retention policy or clinical governance for patient data.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-accent" /> Are the records compliant with NCH standards?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Our portfolio aligns with the competency-based dynamic curriculum (CBDC) outline recommended by the National Commission for Homoeopathy (NCH), helping you track practical study competencies seamlessly.
              </p>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section className="mt-16 border-t border-border/60 pt-10 text-[11px] text-text-tertiary space-y-3">
          <div className="flex items-center gap-1 font-bold text-text-secondary">
            <BookOpenText className="w-3.5 h-3.5 text-primary" /> Core Academic References:
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 leading-relaxed">
            <li>Hahnemann, S. (1921). <i>Organon of Medicine</i> (6th ed.). Standard therapeutic guidelines on acute and chronic miasmatic diseases.</li>
            <li>Kent, J. T. (1905). <i>Repertory of the Homoeopathic Materia Medica</i>. Chicago: Ehrhart & Karl.</li>
            <li>Boericke, W. (1927). <i>Pocket Manual of Homoeopathic Materia Medica</i> (9th ed.). Philadelphia: Boericke & Runyon.</li>
            <li>National Commission for Homoeopathy (NCH) Guidelines for Competency-Based Dynamic Curriculum (CBDC) in Homoeopathy.</li>
          </ul>
        </section>

        {/* Medical Reviewer Notice */}
        <div className="mt-8 pt-4 border-t border-border/40 flex flex-wrap justify-between items-center text-[10px] text-text-tertiary gap-4">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-accent" /> Content medically verified by standard BHMS Curriculum Experts
          </span>
          <span>Last Updated: July 2026</span>
        </div>

        {/* Legal and Educational Disclaimer */}
        <div className="mt-6 bg-bg-secondary border border-border/60 rounded-xl p-4 flex gap-3">
          <Info className="w-4 h-4 text-text-tertiary shrink-0 mt-0.5" />
          <p className="text-[10px] text-text-secondary leading-relaxed">
            <strong>Educational Sandbox Disclaimer:</strong> This workspace, simulated case logs (mapped safely via cloud database structures), and study scheduler function exclusively as academic and educational resources for BHMS scholars. All logs, clinical scoring evaluations, and remedy selections are simulated sandbox outputs. They do not constitute actual medical diagnoses or recommendations. Patients seeking healthcare must consult certified registered homoeopathic practitioners.
          </p>
        </div>

      </div>
    </div>
  );
}
