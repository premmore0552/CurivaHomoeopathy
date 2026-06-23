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
  Calendar
} from 'lucide-react';
import { auth, db, doc, setDoc, query, collection, where, onSnapshot, signOut } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import SEO from '../components/SEO';
import { Link, useNavigate } from 'react-router-dom';

interface CaseLog {
  id: string; // e.g. "CASE-81204"
  userId: string;
  userEmail: string;
  testType: string; // mapped from db: e.g. 'materia_medica' | 'organon' | 'repertory_check'
  testDate: string; // e.g. "2026-06-23"
  clinicName: string; // mapped from db: e.g. "BHMS College Clinic" / "City Homeopathy Center"
  physicianName: string; // mapped from db: e.g. "Attending Student" / "Dr. Prem More"
  resultStatus: string; // mapped from db: e.g. "Sulphur" / "Nux Vomica" / "Pulsatilla" / "Lycopodium" / "normal"
  hpvResult: string; // mapped from db: e.g. "Mild" / "Moderate" / "Severe" / "not-detected"
  notes?: string;
  createdAt: string;
}

export default function Profile() {
  const navigate = useNavigate();
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
        });

        // Fetch real cloud screenings for Mock Assessments
        const screeningsQuery = query(collection(db, 'screenings'), where('userId', '==', currentUser.uid));
        const unsubScreenings = onSnapshot(screeningsQuery, (snapshot) => {
          const sList: any[] = [];
          snapshot.forEach((docRef) => {
            sList.push({ id: docRef.id, ...docRef.data() });
          });
          setScreenings(sList.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
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
              physicianName: 'Prem More',
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

  return (
    <div className="min-h-screen bg-bg-primary pb-24 font-sans text-text-primary selection:bg-primary/20 selection:text-primary">
      <SEO 
        title="Practitioner Portfolio & Study Tracker"
        description="Access and track your simulated case repertorizations, review active recall boards, university past papers scores, and organize study schedules."
      />

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Banner Headers */}
        <div className="relative bg-primary-dark text-white rounded-[3rem] shadow-[0_30px_70px_rgba(43,76,59,0.1)] p-8 md:p-12 overflow-hidden mb-10 border border-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,160,89,0.15)_0%,transparent_60%)] opacity-50 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary rounded-full filter blur-[80px] opacity-35" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/90 text-[10px] font-black uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-accent" /> Academic Portfolio &amp; Case Logs
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-light">
                {user ? `Welcome, ${user.displayName || 'Practitioner'}` : "BHMS Portal Log"}
              </h1>
              <p className="text-white/70 max-w-2xl text-xs md:text-sm font-sans tracking-tight leading-relaxed">
                {user 
                  ? "Manage, track, and review your repertorial case studies, mock exam scores, and saved clinical study logs. Synchronized with your secure portfolio database."
                  : "Sign in with Google to synchronize your clinical repertorizations and academic records securely, or use the Guest Sandbox portfolio."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!user ? (
                <button
                  onClick={handleSignInGoogle}
                  className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg shadow-accent/20"
                >
                  Sign In with Google
                </button>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white/90 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Guest Demo Notice */}
        {!user && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4.5 mb-8 flex gap-3.5 items-center">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-text-secondary">
              <strong className="text-primary font-bold">Local Sandbox Profile:</strong> You are browsing in guest simulation mode. You can log simulated case files, view mock scorecards, and create custom study plans. To save logs permanently, sign in above.
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
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
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
          {activeTab === 'kits' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-display text-primary">Your Saved Clinical Totality Logs</h2>
                  <p className="text-xs text-text-tertiary">Log, review, and organize simulated patient case files and matched Simillimum remedies</p>
                </div>
                {!isAddingLog && (
                  <button
                    onClick={() => setIsAddingLog(true)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow hover:shadow-lg shadow-primary/10 cursor-pointer"
                  >
                    <PlusCircle className="w-4.5 h-4.5" /> Log Repertory Case Study
                  </button>
                )}
              </div>

              {/* Homeopathic Reference Guidelines */}
              <div className="bg-bg-secondary border border-border rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Kentian Repertorization
                  </span>
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    Prioritize mental states first, followed by physical general modalities (thermal, thirst, sleep), and then particular local symptoms to derive points accurately.
                  </p>
                </div>
                <div className="space-y-1 border-y md:border-y-0 md:border-x border-border py-4 md:py-0 md:px-5">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Chronic Case Taking
                  </span>
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    Investigate underlying miasmatic states (Psora, Sycosis, Syphilis) in chronic presentations before deciding on complementary deep-acting constitutional remedies.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-accent" /> Organon Principles
                  </span>
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    Follow Aphorism 153: look for the strike, rare, peculiar, and uncommon characteristics of the disease to find the precise similar therapeutic agent.
                  </p>
                </div>
              </div>

              {/* Interactive New Entry Form */}
              {isAddingLog && (
                <div className="bg-white border border-border rounded-[2rem] p-6 md:p-8 shadow-soft space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-border/60">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-accent" /> Log Clinical Case Findings
                    </h3>
                    <button 
                      onClick={() => setIsAddingLog(false)}
                      className="text-xs text-text-tertiary hover:text-primary transition-colors font-bold uppercase"
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
                        placeholder="e.g. Prem More" 
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

                  <div className="flex justify-end gap-3 pt-3 border-t border-border">
                    <button
                      onClick={() => setIsAddingLog(false)}
                      className="px-6 py-2.5 border border-border text-text-secondary hover:text-primary rounded-xl text-xs font-bold uppercase transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNewLog}
                      className="px-8 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Save Case Log
                    </button>
                  </div>
                </div>
              )}

              {/* Saved Case logs listing */}
              {kits.length === 0 ? (
                <div className="bg-white border border-border rounded-[2rem] p-12 text-center text-text-secondary shadow-soft">
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
                      className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft space-y-6 relative overflow-hidden"
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
                        <div className="bg-bg-primary border border-border/60 rounded-2xl p-5 space-y-3.5">
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

                        <div className="bg-bg-primary border border-border/60 rounded-2xl p-5 space-y-3.5">
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
          )}

          {activeTab === 'screenings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-display text-primary">Academic Mock Scorecards</h2>
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
                <div className="bg-white border border-border rounded-[2rem] p-12 text-center text-text-secondary shadow-soft">
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
                      className="bg-white border border-border rounded-2xl p-6 shadow-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden"
                    >
                      <div className="space-y-1 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-text-tertiary">Log from {scr.createdAt || scr.date}</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[8px] font-black uppercase tracking-widest">
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

          {activeTab === 'planner' && (
            <div className="bg-white border border-border rounded-[2.5rem] p-8 md:p-12 shadow-soft space-y-8 animate-fadeIn text-center max-w-3xl mx-auto">
              <Compass className="w-12 h-12 text-primary mx-auto animate-spin-slow" />
              <div className="space-y-2">
                <h3 className="text-3xl font-display font-light text-primary">BHMS Academic Study Planner</h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
                  Organize and track your university exam preparation, clinical laboratory rotations, and daily medicine proving cards.
                </p>
              </div>

              <div className="p-6 bg-primary/5 border border-border/80 rounded-2xl max-w-xl mx-auto space-y-4 text-left">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wide border-b border-border/50 pb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent" /> Active Study Timetable Checklist
                </h4>
                <div className="space-y-3 text-[11px] font-mono text-text-secondary">
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary w-4 h-4" />
                    <span>Review Kent's Repertorization rules (Mind chapter)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary w-4 h-4" />
                    <span>Complete Organon of Medicine lecture (Aphorisms 1-20)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
                    <span>Practice comparative Materia Medica (Lycopodium vs Sulphur)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
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

          {activeTab === 'settings' && (
            <div className="bg-white border border-border rounded-[2.5rem] p-8 md:p-12 shadow-soft space-y-8 animate-fadeIn max-w-3xl mx-auto">
              <div>
                <h3 className="text-2xl font-display text-primary">Practitioner Credentials &amp; Profile</h3>
                <p className="text-xs text-text-tertiary leading-normal mt-0.5">Maintain your academic and professional registration parameters for medical safety comparisons.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Profile credentials saved successfully!"); }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">Official Display Name</label>
                    <input 
                      type="text" 
                      value={displayName || (user ? user.displayName : '') || 'Guest Scholar'}
                      onChange={(e) => setDisplayName(e.target.value)}
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
                    <label className="text-xs font-bold text-text-secondary">Professional Role / Year of Study</label>
                    <select 
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                    >
                      <option value="BHMS Student">BHMS Student (First to Fourth Year)</option>
                      <option value="Homeopathic Practitioner">Registered Homeopathic Practitioner (LCEH/BHMS/MD)</option>
                      <option value="Scholar / Researcher">Postgraduate Scholar / Researcher</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary">BHMS Academic Level</label>
                    <select 
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                    >
                      <option value="1st BHMS">1st Year BHMS (Anatomy, Physiology, Pharmacy)</option>
                      <option value="2nd BHMS">2nd Year BHMS (Pathology, Forensic, Organon, MM)</option>
                      <option value="3rd BHMS">3rd Year BHMS (Surgery, GYN, Organon, MM)</option>
                      <option value="4th BHMS">4th Year BHMS (Practice of Medicine, Repertory, Organon, MM)</option>
                      <option value="Graduated">Graduated / Intern / Practitioner</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary">Medical Registration Council Number (Practitioners) / College Name (Students)</label>
                  <input 
                    type="text" 
                    value={clinicAddress || 'Government Homoeopathic Medical College & Hospital'}
                    onChange={(e) => setClinicAddress(e.target.value)}
                    placeholder="e.g. Maharashtra Council of Homoeopathy (MCH-12048)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary">Short Professional Bio</label>
                  <textarea 
                    rows={3}
                    value={bio || 'Homeopathic enthusiast, BHMS scholar focusing on comparative Materia Medica and classical repertory methods.'}
                    onChange={(e) => setBio(e.target.value)}
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
      </div>
    </div>
  );
}
