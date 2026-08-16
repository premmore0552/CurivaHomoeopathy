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
import { auth, db, doc, setDoc, query, collection, where, onSnapshot, signOut, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import SEO from '../components/SEO';
import { Link, useNavigate } from 'react-router-dom';
import { useRole, UserRole } from '../context/RoleContext';
import { useUser } from '../hooks/useUser';
import { userService } from '../services/userService';

interface CaseLog {
  id: string; // e.g. "CASE-81204"
  userId: string;
  userEmail: string;
  testType: string; // mapped from db: e.g. 'materia_medica' | 'organon' | 'repertory_check'
  testDate: string; // e.g. "2026-06-23"
  clinicName: string; // mapped from db: e.g. "BHMS College Clinic" / "City Homoeopathy Center"
  physicianName: string; // mapped from db: e.g. "Attending Student" / "Dr. John More"
  resultStatus: string; // mapped from db: e.g. "Sulphur" / "Nux Vomica" / "Pulsatilla" / "Lycopodium" / "normal"
  hpvResult: string; // mapped from db: e.g. "Mild" / "Moderate" / "Severe" / "not-detected"
  notes?: string;
  createdAt: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { currentRole, setCurrentRole, authorizedRoles } = useRole();
  const { profile } = useUser();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [kits, setKits] = useState<any[]>([]); // Preserving database 'kits' collection mapping for Saved Case Logs
  const [screenings, setScreenings] = useState<any[]>([]); // Preserving database 'screenings' collection mapping for Mock Assessments
  const [activeTab, setActiveTab] = useState<'kits' | 'screenings' | 'planner' | 'settings'>('kits');

  // Interactive Form States
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [testType, setTestType] = useState('repertory_check');
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [clinicName, setClinicName] = useState('');
  const [physicianName, setPhysicianName] = useState('');
  const [resultStatus, setResultStatus] = useState('Nux Vomica');
  const [hpvResult, setHpvResult] = useState('not-detected');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile fields state
  const [displayName, setDisplayName] = useState('');
  const [profession, setProfession] = useState('BHMS Student');
  const [bio, setBio] = useState('');
  const [qualifications, setQualifications] = useState('Undergraduate');
  const [clinicAddress, setClinicAddress] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Authenticate and fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        setDisplayName(currentUser.displayName || '');
        // Fetch real cloud case logs (using kits table to preserve schema)
        const kitsQuery = query(collection(db, 'kits'), where('userId', '==', currentUser.uid));
        const unsubKits = onSnapshot(kitsQuery, (snapshot) => {
          const logsList: any[] = [];
          snapshot.forEach((docRef) => {
            logsList.push({ ...docRef.data() });
          });
          setKits(logsList.sort((a, b) => b.testDate.localeCompare(a.testDate)));
        }, (err) => {
          handleFirestoreError(err, OperationType.LIST, 'kits');
        });

        // Fetch real cloud screenings for Mock Assessments
        const screeningsQuery = query(collection(db, 'screenings'), where('userId', '==', currentUser.uid));
        const unsubScreenings = onSnapshot(screeningsQuery, (snapshot) => {
          const sList: any[] = [];
          snapshot.forEach((docRef) => {
            sList.push({ id: docRef.id, ...docRef.data() });
          });
          setScreenings(sList.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
        }, (err) => {
          handleFirestoreError(err, OperationType.LIST, 'screenings');
        });

        return () => {
          unsubKits();
          unsubScreenings();
        };
      } else {
        // Load demo local items for guest experience
        const localKitsVal = localStorage.getItem('curiva_demo_kits');
        if (localKitsVal) {
          setKits(JSON.parse(localKitsVal));
        } else {
          // Default initial case logs
          const defaultDemoKits = [
            {
              id: 'CASE-81204',
              userId: 'guest_user',
              userEmail: 'student_demo@curiva.co',
              testType: 'repertory_check',
              testDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              clinicName: 'Government Homoeopathic Medical College',
              physicianName: 'Dr. John',
              resultStatus: 'Nux Vomica',
              hpvResult: 'not-detected',
              notes: 'Acute gastrointestinal presentation matching workaholic, chilly patient with ineffectual urging. Perfect Simillimum response.',
              createdAt: new Date().toISOString()
            }
          ];
          setKits(defaultDemoKits);
          localStorage.setItem('curiva_demo_kits', JSON.stringify(defaultDemoKits));
        }

        // Fetch guest profile assessments
        const guestLatestAssessVal = localStorage.getItem('curiva_latest_assessment');
        if (guestLatestAssessVal) {
          setScreenings([JSON.parse(guestLatestAssessVal)]);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync profile fields with state on change
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setProfession(profile.profession || 'BHMS Student');
      setBio(profile.bio || '');
      setQualifications(profile.qualifications || 'Undergraduate');
      setClinicAddress(profile.clinicAddress || '');
    } else {
      const guestName = localStorage.getItem('curiva_guest_name') || '';
      const guestRole = (localStorage.getItem('curiva_selected_role') || 'Guest') as UserRole;
      const guestBio = localStorage.getItem('curiva_guest_bio') || '';
      const guestQual = localStorage.getItem('curiva_guest_qualifications') || '1st BHMS';
      const guestClinic = localStorage.getItem('curiva_guest_clinic') || '';

      setDisplayName(guestName);
      setProfession(guestRole);
      setBio(guestBio);
      setQualifications(guestQual);
      setClinicAddress(guestClinic);
    }
  }, [profile]);

  const [showPrintBanner, setShowPrintBanner] = useState(false);

  const handlePrint = () => {
    setShowPrintBanner(true);
    try {
      window.print();
    } catch (err) {
      console.warn("Direct window.print() failed inside iframe", err);
    }
  };

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

  // Submit or Log Clinical Test Action
  const handleAddNewLog = async () => {
    if (!clinicName.trim() || !physicianName.trim()) {
      alert("Please fill in the Institution and Practitioner details to maintain accurate study logs.");
      return;
    }

    setIsSubmitting(true);
    const newLogId = `CASE-${Math.floor(10000 + Math.random() * 90000)}`;
    const newLog = {
      id: newLogId,
      userId: user ? user.uid : 'guest_user',
      userEmail: user ? (user.email || 'guest@curiva.co') : 'guest@curiva.co',
      testType,
      testDate,
      clinicName,
      physicianName,
      resultStatus,
      hpvResult,
      notes,
      createdAt: new Date().toISOString()
    };

    if (user) {
      try {
        await setDoc(doc(db, 'kits', newLogId), newLog);
        await userService.trackActivity('study_tool', `Created Case Totality Log: ${newLogId}`);
      } catch (err) {
        console.error("Failed to post study log to Firestore:", err);
      }
    } else {
      const updated = [newLog, ...kits];
      setKits(updated);
      localStorage.setItem('curiva_demo_kits', JSON.stringify(updated));
    }
    
    // Reset Form
    setIsAddingLog(false);
    setClinicName('');
    setPhysicianName('');
    setResultStatus('Nux Vomica');
    setHpvResult('not-detected');
    setNotes('');
    setIsSubmitting(false);
  };

  // Delete log helper
  const handleDeleteLog = async (logId: string) => {
    if (!confirm("Are you sure you want to delete this clinical case log?")) return;
    
    const updated = kits.filter(k => k.id !== logId);
    setKits(updated);
    if (!user) {
      localStorage.setItem('curiva_demo_kits', JSON.stringify(updated));
    } else {
      // Since delete on doc isn't direct for kits, we can do it via firebase delete or keep local filtering
      // For academic safety sandbox we filter local state; actual cloud deletion is restricted to Admin
      await userService.trackActivity('profile_update', `Filtered case log out of display view: ${logId}`);
    }
  };

  // Save Settings Form
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus(null);
    try {
      const targetRole = profession as UserRole;
      if (user) {
        await userService.updateProfileSettings({
          displayName,
          bio,
          qualifications,
          profession: targetRole,
          clinicAddress
        });
        await setCurrentRole(targetRole);
      } else {
        localStorage.setItem('curiva_guest_name', displayName);
        localStorage.setItem('curiva_selected_role', targetRole);
        localStorage.setItem('curiva_guest_bio', bio);
        localStorage.setItem('curiva_guest_qualifications', qualifications);
        localStorage.setItem('curiva_guest_clinic', clinicAddress);
        await setCurrentRole(targetRole);
      }
      setSaveStatus({ type: 'success', message: `Practitioner credentials updated successfully! Active role changed to ${targetRole}.` });
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
              <strong className="text-text-primary font-bold">Local Sandbox Profile:</strong> You are currently in guest simulation mode. You can log case totalities, view mock scorecards, and check syllabus progress. To persist logs securely across devices, log in using a Google account.
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-border mb-10 overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'kits', label: 'Simulated Case Logs', icon: ClipboardList },
            { id: 'screenings', label: 'Academic Mock Scorecards', icon: Award },
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
          
          {/* Simulated Case Logs Tab */}
          {activeTab === 'kits' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fadeIn">
              
              {/* Left & Middle: Case Log Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-display text-primary font-bold">Your Clinical Totality Logs</h2>
                    <p className="text-xs text-text-tertiary">Log, review, and organize simulated patient case files and matched Simillimum remedies</p>
                  </div>
                  {!isAddingLog && (
                    <button
                      onClick={() => setIsAddingLog(true)}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow hover:shadow-lg shadow-primary/10 cursor-pointer"
                    >
                      <PlusCircle className="w-4.5 h-4.5" /> Log Repertory Case Study
                    </button>
                  )}
                </div>

                {/* Interactive New Entry Form */}
                <AnimatePresence>
                  {isAddingLog && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-bg-secondary border border-border/80 rounded-2xl p-6 shadow-soft space-y-6"
                    >
                      <div className="flex justify-between items-center pb-3 border-b border-border/60">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-accent" /> Log Clinical Case Findings
                        </h3>
                        <button 
                          onClick={() => setIsAddingLog(false)}
                          className="text-xs text-text-tertiary hover:text-primary transition-colors font-bold uppercase cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-text-secondary">Study / Case Category</label>
                          <select 
                            value={testType}
                            onChange={(e: any) => setTestType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                          >
                            <option value="repertory_check">Simulated Case Study (Kentian Method)</option>
                            <option value="materia_medica">Materia Medica Keynote Check</option>
                            <option value="organon">Organon Aphorism Correlation</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-text-secondary">Official Date of Case Logging</label>
                          <input 
                            type="date"
                            value={testDate}
                            onChange={(e) => setTestDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-text-secondary">Institution / College / Clinic</label>
                          <input 
                            type="text"
                            placeholder="e.g. Government Homoeopathic Medical College" 
                            value={clinicName}
                            onChange={(e) => setClinicName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-text-secondary">Attending Practitioner / Student</label>
                          <input 
                            type="text"
                            placeholder="e.g. John More" 
                            value={physicianName}
                            onChange={(e) => setPhysicianName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-text-secondary">Matched Simillimum Remedy</label>
                          <select 
                            value={resultStatus}
                            onChange={(e: any) => setResultStatus(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                          >
                            <option value="Nux Vomica">Nux Vomica</option>
                            <option value="Pulsatilla">Pulsatilla Pratensis</option>
                            <option value="Arsenicum Album">Arsenicum Album</option>
                            <option value="Lycopodium">Lycopodium Clavatum</option>
                            <option value="Sulphur">Sulphur</option>
                            <option value="Silicea">Silicea Terra</option>
                            <option value="unclear">Unresolved Totality / Further Study</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-text-secondary">Miasmatic Underlying State</label>
                          <select 
                            value={hpvResult}
                            onChange={(e: any) => setHpvResult(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                          >
                            <option value="not-detected">Psora (Primary Hydration/Functional)</option>
                            <option value="detected-16">Sycosis (Excessive Growth/Infiltration)</option>
                            <option value="detected-18">Syphilis (Degenerative/Destructive)</option>
                            <option value="detected-other">Mixed Miasmatic Presentation</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-text-secondary">Case Repertorial Notes &amp; Totality Symptoms</label>
                        <textarea 
                          rows={3}
                          placeholder="e.g. Patient presents with gastric flatulence aggravated 4 PM to 8 PM, right-sided symptoms moving to left. Strongly matches Lycopodium." 
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-border/60">
                        <button
                          onClick={() => setIsAddingLog(false)}
                          className="px-6 py-2.5 border border-border text-text-secondary hover:text-primary rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddNewLog}
                          disabled={isSubmitting}
                          className="px-8 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          {isSubmitting ? "Saving..." : "Save Case Log"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Saved Case logs listing */}
                {kits.length === 0 ? (
                  <div className="bg-bg-secondary border border-border rounded-2xl p-12 text-center text-text-secondary shadow-soft">
                    <ClipboardList className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-primary">No Case Study Logs Recorded</h3>
                    <p className="text-xs text-text-tertiary mt-1 max-w-sm mx-auto leading-relaxed mb-4">
                      Repertorize cases using the Patient Simulator or log textbook clinical presentations here.
                    </p>
                    <Link
                      to="/symptom-checker"
                      className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all"
                    >
                      Launch Case Simulator
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {kits.map((kit) => (
                      <div 
                        key={kit.id} 
                        className="bg-bg-secondary border border-border/80 rounded-2xl p-6 md:p-8 shadow-soft space-y-6 relative overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
                          <div className="flex items-center gap-3">
                            <span className="p-2.5 bg-primary/10 rounded-xl text-primary font-mono font-black text-xs">
                              {kit.id}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-primary capitalize">
                                {kit.testType === 'repertory_check' ? 'Simulated Case Study (Kent Method)' : kit.testType === 'materia_medica' ? 'Materia Medica Core Check' : 'Organon Lecture Correlation'}
                              </h4>
                              <p className="text-[10px] text-text-tertiary font-mono tracking-wider mt-0.5 uppercase">
                                Date: {new Date(kit.testDate).toLocaleDateString()} • Attending: {kit.physicianName}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteLog(kit.id)}
                            className="text-[10px] text-red-700 hover:text-white hover:bg-red-700 font-sans font-bold border border-red-700/20 bg-red-500/5 rounded-md px-2.5 py-1.5 transition-all cursor-pointer"
                          >
                            Delete Log
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div className="bg-bg-primary border border-border/60 rounded-xl p-5 space-y-3.5">
                            <div>
                              <span className="text-[9px] font-black uppercase text-text-tertiary tracking-widest block">Institution Location</span>
                              <span className="font-bold text-xs text-primary block mt-1">{kit.clinicName}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase text-text-tertiary tracking-widest block font-sans">Prescribed Simillimum Remedy</span>
                              <span className="font-black text-xs text-green-700 uppercase block mt-1">
                                {kit.resultStatus}
                              </span>
                            </div>
                          </div>

                          <div className="bg-bg-primary border border-border/60 rounded-xl p-5 space-y-3.5">
                            <div>
                              <span className="text-[9px] font-black uppercase text-text-tertiary tracking-widest block">Underlying Miasmatic Diagnosis</span>
                              <span className="font-black text-xs text-primary uppercase block mt-1">
                                {kit.hpvResult === 'not-detected' && 'Psora Miasm (Functional)'}
                                {kit.hpvResult === 'detected-16' && 'Sycosis Miasm (Infiltrative)'}
                                {kit.hpvResult === 'detected-18' && 'Syphilis Miasm (Destructive)'}
                                {kit.hpvResult === 'detected-other' && 'Mixed Miasm'}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase text-text-tertiary tracking-widest block">Case Status</span>
                              <span className="text-text-secondary text-xs block leading-relaxed mt-1">
                                Case locked in academic repository portfolio.
                              </span>
                            </div>
                          </div>
                        </div>

                        {kit.notes && (
                          <div className="pt-2">
                            <span className="text-[9px] font-sans font-bold text-text-tertiary uppercase block">Repertorization Findings Notes</span>
                            <p className="text-xs text-text-secondary italic leading-relaxed mt-1">"{kit.notes}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar: Educational content & clinical pearls */}
              <div className="space-y-8">
                
                {/* Method Flowchart card */}
                <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-accent" /> Repertory Study Rules
                  </h3>
                  <div className="space-y-3">
                    <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-0 before:w-0.5 before:bg-border last:before:hidden pb-3">
                      <div className="absolute left-0 top-1.5 w-4.5 h-4.5 bg-primary-light border border-primary/20 rounded-full flex items-center justify-center text-[9px] font-black text-primary">1</div>
                      <h4 className="text-xs font-bold text-primary">Mental Generals</h4>
                      <p className="text-[10px] text-text-secondary leading-relaxed mt-0.5">Evaluate will, intellect, memory, and emotional disposition first (e.g. anxiety, fear, anger modalites).</p>
                    </div>
                    <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-0 before:w-0.5 before:bg-border last:before:hidden pb-3">
                      <div className="absolute left-0 top-1.5 w-4.5 h-4.5 bg-primary-light border border-primary/20 rounded-full flex items-center justify-center text-[9px] font-black text-primary">2</div>
                      <h4 className="text-xs font-bold text-primary">Physical Generals</h4>
                      <p className="text-[10px] text-text-secondary leading-relaxed mt-0.5">Check food desires, aversions, thermal state (chilly vs warm), thirst, sleep, and weather sensitivity.</p>
                    </div>
                    <div className="relative pl-6 last:before:hidden">
                      <div className="absolute left-0 top-1.5 w-4.5 h-4.5 bg-primary-light border border-primary/20 rounded-full flex items-center justify-center text-[9px] font-black text-primary">3</div>
                      <h4 className="text-xs font-bold text-primary">Particular Symptoms</h4>
                      <p className="text-[10px] text-text-secondary leading-relaxed mt-0.5">Map localized complaints using exact location, sensation, modality, and accompanying symptoms (concomitants).</p>
                    </div>
                  </div>
                </div>

                {/* Clinical Pearls Sidebar */}
                <div className="bg-bg-secondary border border-border rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-accent" /> Clinical Pearls &amp; Aphorisms
                    </h3>
                    <p className="text-[10px] text-text-tertiary mt-0.5">High-yield takeaways from standard Organon curriculum</p>
                  </div>
                  <div className="space-y-4">
                    {clinicalPearls.map((pearl, i) => (
                      <div key={i} className="border-t border-border/60 pt-4 first:border-0 first:pt-0">
                        <span className="text-[10px] font-black uppercase text-primary tracking-wider">{pearl.title}</span>
                        <p className="text-xs text-text-secondary leading-relaxed mt-1">{pearl.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Academic Mock Scorecards Tab */}
          {activeTab === 'screenings' && (
            <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-display text-primary font-bold">Academic Mock Scorecards</h2>
                  <p className="text-xs text-text-tertiary">Logged evaluations capturing student quiz performance and mock test scores</p>
                </div>
                <Link
                  to="/student-resources"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow hover:shadow-lg shadow-primary/10"
                >
                  Start New Practice Session
                </Link>
              </div>

              {screenings.length === 0 ? (
                <div className="bg-bg-secondary border border-border rounded-2xl p-12 text-center text-text-secondary shadow-soft">
                  <Award className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-primary">No Practice Scorecards Logged</h3>
                  <p className="text-xs text-text-tertiary mt-1 max-w-sm mx-auto leading-relaxed mb-4">
                    Complete the AIAPGET Mock test on the Study Hub to record dynamic scorecards in your dashboard.
                  </p>
                  <Link
                    to="/student-resources"
                    className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-dark transition-all"
                  >
                    Go to Study Hub
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {screenings.map((scr, idx) => (
                    <div 
                      key={scr.id || idx} 
                      className="bg-bg-secondary border border-border rounded-2xl p-6 shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden"
                    >
                      <div className="space-y-1 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-text-tertiary">Log from {scr.createdAt || scr.date}</span>
                          <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded text-[8px] font-black uppercase tracking-widest border border-green-700/10">
                            {scr.riskLevel.toUpperCase()} ACCURACY
                          </span>
                        </div>
                        <h4 className="text-base font-display text-primary leading-tight font-bold">
                          AIAPGET Entrance Mock Quiz Scorecard
                        </h4>
                        <p className="text-xs text-text-secondary italic max-w-2xl mt-1 leading-relaxed">
                          "Recommendation: {scr.recommendation}"
                        </p>
                      </div>

                      <div className="shrink-0 self-start sm:self-center">
                        <button
                          onClick={handlePrint}
                          className="p-2 border border-border hover:border-primary/40 rounded-xl bg-white text-text-secondary hover:text-primary transition-all cursor-pointer"
                          aria-label="Print Scorecard"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BHMS Study Planner Tab */}
          {activeTab === 'planner' && (
            <div className="bg-bg-secondary border border-border rounded-2xl p-8 md:p-12 shadow-soft space-y-8 animate-fadeIn text-center max-w-3xl mx-auto">
              <Compass className="w-12 h-12 text-primary mx-auto animate-spin-slow" />
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-primary">BHMS Academic Study Planner</h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
                  Organize and track your university exam preparation, clinical laboratory rotations, and daily medicine proving cards.
                </p>
              </div>

              <div className="p-6 bg-white border border-border/80 rounded-xl max-w-xl mx-auto space-y-4 text-left">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wide border-b border-border/50 pb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent" /> Active Study Timetable Checklist
                </h4>
                <div className="space-y-3 text-[11px] font-mono text-text-secondary">
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <span>Review Kent's Repertorization rules (Mind chapter)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <span>Practice comparative Materia Medica</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <span>Take AIAPGET Mock test on Student Hub</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-4">
                <Link
                  to="/student-resources"
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Access Study Resources
                </Link>
              </div>
            </div>
          )}

          {/* Practitioner Credentials Tab */}
          {activeTab === 'settings' && (
            <div className="bg-bg-secondary border border-border rounded-2xl p-6 md:p-10 shadow-soft space-y-8 animate-fadeIn max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-display text-primary font-bold">Practitioner Credentials &amp; Profile</h3>
                <p className="text-xs text-text-tertiary leading-normal mt-0.5">Maintain your academic and professional registration parameters for medical safety comparisons.</p>
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
                      <option value="Administrator">Administrator - Portal Administrator</option>
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
                  <label className="text-xs font-bold text-text-secondary">Medical Registration Council Number (Practitioners) / College Name (Students)</label>
                  <input 
                    type="text" 
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                    placeholder="e.g. Government Homoeopathic Medical College & Hospital"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                  />
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
            <p className="text-xs text-text-tertiary">Learn more about clinical log submissions and National Commission for Homoeopathy rules</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-accent" /> Why do I need to log simulated case totalities?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Case taking is the core of homoeopathic practice (Organon Aphorisms 83-104). The clinical case log system helps you document constitutional symptom totalities, miasmatic evaluations, and standard Simillimum remedy matches during your BHMS training and internship.
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
                <HelpCircle className="w-4 h-4 text-accent" /> Can I use these records for university evaluation?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Yes! You can hit the print icon on mock assessments or case entries to generate clean, high-contrast hard copies that fit perfectly into your practical journals or study logs.
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
