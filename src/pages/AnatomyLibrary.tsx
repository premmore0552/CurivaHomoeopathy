import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Search, Filter, Award, Clock, ArrowRight, CheckCircle, 
  Layers, CheckCircle2, BookOpenCheck, HelpCircle, Sparkles, Network,
  GraduationCap, AlertCircle, Bookmark, CheckSquare, ListTodo, FileText
} from 'lucide-react';
import SEO from '../components/SEO';
import { getAnatomyModule } from '../data/anatomyModulesData';
import LearningSidebar from '../components/LearningSidebar';

export const ANATOMY_TOPICS = {
  upperLimb: [
    { id: 'clavicle', title: 'Clavicle (Collar Bone)', region: 'Bones', competency: 'AN1.1', desc: 'S-shaped horizontal long bone that acts as a shock transmitter and structural chest strut.' },
    { id: 'humerus', title: 'Humerus (Arm Bone)', region: 'Bones', competency: 'AN1.2', desc: 'Longest bone of the upper arm, famous for surgical neck, spiral groove, and epicondylar nerve relations.' },
    { id: 'scapula', title: 'Scapula (Shoulder Blade)', region: 'Bones', competency: 'AN1.1', desc: 'Flat triangular bone on the posterolateral chest wall, key to rotator cuff and shoulder movements.' },
    { id: 'radius', title: 'Radius Bone', region: 'Bones', competency: 'AN1.2', desc: 'Lateral forearm bone that rotates during pronation and supination; prone to Colles\' fracture.' },
    { id: 'ulna', title: 'Ulna Bone', region: 'Bones', competency: 'AN1.2', desc: 'Medial forearm bone acting as the elbow hinge stabilizer, featuring the olecranon process.' },
    { id: 'carpal-bones', title: 'Carpal Bones', region: 'Bones', competency: 'AN1.2', desc: 'Eight small wrist bones forming the carpal tunnel floor; scaphoid fracture risks avascular necrosis.' },
    { id: 'mammary-gland', title: 'Mammary Gland (Breast)', region: 'Soft Tissue', competency: 'AN2.1', desc: 'Modified sweat gland in superficial fascia; crucial lymphatic drainage pathways in cancer spread.' },
    { id: 'brachial-plexus', title: 'Brachial Plexus', region: 'Nerves', competency: 'AN3.1', desc: 'Complex somatic nerve network (C5-T1) supplying motor and sensory pathways to the entire arm.' },
    { id: 'shoulder-joint', title: 'Shoulder Joint', region: 'Joints', competency: 'AN3.3', desc: 'Highly mobile but unstable ball-and-socket synovial joint, stabilized dynamically by the SITS rotator cuff.' },
    { id: 'elbow-joint', title: 'Elbow Joint', region: 'Joints', competency: 'AN3.3', desc: 'Uniaxial hinge joint forming the elbow; features the carrying angle and nursemaid\'s subluxation.' },
    { id: 'wrist-joint', title: 'Wrist Joint', region: 'Joints', competency: 'AN3.3', desc: 'Ellipsoid joint connecting radius to scaphoid and lunate, excluding the ulna via an articular disc.' },
    { id: 'axilla', title: 'Axilla (Armpit)', region: 'Regions', competency: 'AN3.1', desc: 'Pyramidal gateway conducting the brachial plexus cords and axillary vessels from neck to arm.' },
    { id: 'axillary-artery', title: 'Axillary Artery', region: 'Vessels', competency: 'AN3.2', desc: 'Continuation of subclavian artery, divided into 3 segments by pectoralis minor, yielding 6 branches.' },
    { id: 'median-nerve', title: 'Median Nerve', region: 'Nerves', competency: 'AN4.2', desc: 'Labourer\'s nerve of precision, supplying forearm flexors and thenars; compressed in carpal tunnel.' },
    { id: 'ulnar-nerve', title: 'Ulnar Nerve', region: 'Nerves', competency: 'AN4.2', desc: 'Musician\'s nerve of fine motor dexterity, passing behind medial epicondyle; injury causes claw hand.' },
    { id: 'radial-nerve', title: 'Radial Nerve', region: 'Nerves', competency: 'AN4.2', desc: 'Nerve of arm extension running in the spiral groove; compression causes Saturday night wrist drop.' },
    { id: 'pectoral-region', title: 'Pectoral Region', region: 'Regions', competency: 'AN2.1', desc: 'Anterior chest wall muscles and clavipectoral fascia; crucial surgical and clinical landmark zone.' },
    { id: 'cubital-fossa', title: 'Cubital Fossa', region: 'Regions', competency: 'AN4.1', desc: 'Triangular depression at the front of the elbow containing crucial nerves, arteries, and venipuncture vein.' },
    { id: 'palmar-aponeurosis', title: 'Palmar Aponeurosis', region: 'Soft Tissue', competency: 'AN4.4', desc: 'Tough triangular palm fascia; fibrotic shortening results in Dupuytren\'s flexion contracture.' }
  ],
  abdomen: [
    { id: 'abdomen-overview', title: 'Abdomen Overview', region: 'General', competency: 'AN44.1', desc: 'Introduction to abdominal boundaries, 9 regions, and 4 quadrants of clinical importance.' },
    { id: 'abdominal-wall', title: 'Anterior Abdominal Wall', region: 'Regions', competency: 'AN44.2', desc: 'Layers, muscles, rectus sheath, and blood supply of the anterior abdominal wall.' },
    { id: 'inguinal-canal', title: 'Inguinal Canal & Groin', region: 'Regions', competency: 'AN44.3', desc: 'Detailed anatomy of the inguinal canal, Hesselbach\'s triangle, and hernia mechanisms.' },
    { id: 'stomach', title: 'Stomach Anatomy', region: 'Viscera', competency: 'AN47.1', desc: 'Gross anatomy, blood supply, and clinical correlations of the stomach bed.' },
    { id: 'liver', title: 'Liver & Biliary System', region: 'Viscera', competency: 'AN48.1', desc: 'Liver segments, gallbladder, and extrahepatic biliary apparatus (Calot\'s triangle).' },
    { id: 'kidneys', title: 'Kidneys & Ureters', region: 'Viscera', competency: 'AN52.1', desc: 'Renal anatomy, relations, and ureteric constrictions at clinical sites.' }
  ],
  lowerLimb: [
    { id: 'lower-limb-intro', title: 'Lower Limb Introduction', region: 'General', competency: 'AN10.1', desc: 'Overview of weight transmission and structural organization of the lower extremity.' },
    { id: 'femur', title: 'Femur (Thigh Bone)', region: 'Bones', competency: 'AN10.2', desc: 'Longest and strongest bone in the body; details of head, neck, and trochanters.' },
    { id: 'hip-joint', title: 'Hip Joint', region: 'Joints', competency: 'AN12.1', desc: 'Ball-and-socket synovial joint, stability mechanisms, and blood supply (AVN risks).' },
    { id: 'femoral-triangle', title: 'Femoral Triangle', region: 'Regions', competency: 'AN11.1', desc: 'Boundaries and contents of the femoral triangle (NAVEL mnemonic).' },
    { id: 'knee-joint', title: 'Knee Joint', region: 'Joints', competency: 'AN14.1', desc: 'Complex hinge joint involving menisci, cruciate ligaments, and locking mechanisms.' },
    { id: 'popliteal-fossa', title: 'Popliteal Fossa', region: 'Regions', competency: 'AN15.1', desc: 'Diamond-shaped space behind the knee containing popliteal vessels and nerves.' }
  ]
};

export const ALL_TOPICS = [...ANATOMY_TOPICS.upperLimb, ...ANATOMY_TOPICS.abdomen, ...ANATOMY_TOPICS.lowerLimb];

interface GraphNode {
  id: string;
  label: string;
  x: number; // Percent
  y: number; // Percent
  category: string;
  description: string;
  relatedSlug?: string;
}

interface GraphLink {
  source: string;
  target: string;
  relation: string;
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'axial', label: 'Axial Skeletal Hub', x: 50, y: 12, category: 'Central', description: 'The central bony hub (sternum/manubrium) linking the upper limb to the axial skeleton.', relatedSlug: 'clavicle' },
  { id: 'clavicle', label: 'Clavicle (Collar Bone)', x: 32, y: 24, category: 'Bone', description: 'Acts as a mobile horizontal strut keeping the limb lateral, prone to mid-shaft breaks.', relatedSlug: 'clavicle' },
  { id: 'scapula', label: 'Scapula (Shoulder Blade)', x: 68, y: 24, category: 'Bone', description: 'Flat triangular bone providing essential attachments for the dynamic rotator cuff SITS muscles.', relatedSlug: 'scapula' },
  { id: 'shoulder', label: 'Shoulder Joint', x: 84, y: 44, category: 'Joint', description: 'Highly mobile synovial ball-and-socket joint, prone to anteroinferior dislocation.', relatedSlug: 'shoulder-joint' },
  { id: 'axilla', label: 'Axilla (Gateway Space)', x: 48, y: 38, category: 'Region', description: 'Pyramidal armpit gateway conveying the brachial plexus cords and axillary vessels.', relatedSlug: 'axilla' },
  { id: 'brachial', label: 'Brachial Plexus', x: 22, y: 44, category: 'Nerves', description: 'Somatic nerve network (C5-T1) controlling motor/sensory functions of the upper extremity.', relatedSlug: 'brachial-plexus' },
  { id: 'humerus', label: 'Humerus (Arm Bone)', x: 68, y: 56, category: 'Bone', description: 'The arm lever wrapped tightly by three critical nerves (axillary, radial, ulnar).', relatedSlug: 'humerus' },
  { id: 'cubital', label: 'Cubital Fossa', x: 50, y: 72, category: 'Region', description: 'Anterocubital triangle protecting the median nerve, brachial artery, and venipuncture veins.', relatedSlug: 'cubital-fossa' },
  { id: 'nerves', label: 'Major Arm Nerves', x: 24, y: 74, category: 'Nerves', description: 'Radial, median, and ulnar nerves regulating fine muscle precision and sensory derms.', relatedSlug: 'median-nerve' },
  { id: 'radius', label: 'Radius (Forearm Pivot)', x: 38, y: 90, category: 'Bone', description: 'Lateral forearm bone rotating during pronation/supination, vulnerable to Colles fractures.', relatedSlug: 'radius' },
  { id: 'ulna', label: 'Ulna (Elbow Stabilizer)', x: 62, y: 90, category: 'Bone', description: 'Medial forearm bone serving as the elbow hinge foundation and carrying angle marker.', relatedSlug: 'ulna' }
];

const GRAPH_LINKS: GraphLink[] = [
  { source: 'axial', target: 'clavicle', relation: 'Sternoclavicular joint anchors the collar bone strut directly to the chest wall.' },
  { source: 'clavicle', target: 'scapula', relation: 'Acromioclavicular joint joins the lateral collar bone to the acromion of the scapula.' },
  { source: 'clavicle', target: 'axilla', relation: 'Subclavius muscle and subclavius nerve pass directly inferior to the clavicle.' },
  { source: 'scapula', target: 'shoulder', relation: 'Glenoid fossa of scapula forms the socket accommodating the humerus ball.' },
  { source: 'humerus', target: 'shoulder', relation: 'The head of the humerus articulates inside the glenoid cavity of the scapula.' },
  { source: 'axilla', target: 'brachial', relation: 'Cords of the brachial plexus envelope the axillary artery within the axilla space.' },
  { source: 'brachial', target: 'nerves', relation: 'Cords of the plexus directly bifurcate into the terminal ulnar, median, and radial nerves.' },
  { source: 'humerus', target: 'nerves', relation: 'Three major nerves hug the humerus: radial in radial groove, ulnar behind medial epicondyle.' },
  { source: 'humerus', target: 'cubital', relation: 'The brachial artery bifurcates into radial and ulnar branches within the cubital fossa.' },
  { source: 'cubital', target: 'radius', relation: 'The biceps brachii tendon inserts on the radial tuberosity in the cubital fossa floor.' },
  { source: 'cubital', target: 'ulna', relation: 'Median nerve passes between the pronator teres heads crossing the ulnar side.' },
  { source: 'radius', target: 'nerves', relation: 'Radial nerve runs adjacent to the radius; median nerve enters the forearm between pronator heads.' },
  { source: 'ulna', target: 'nerves', relation: 'Ulnar nerve runs adjacent to the medial side of the ulna bone down into the wrist.' }
];

export default function AnatomyLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGraphNodeId, setActiveGraphNodeId] = useState<string>('brachial');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  
  // Progress tracker state
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('curiva_anatomy_progress');
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleComplete = (topicId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (completedTopics.includes(topicId)) {
      updated = completedTopics.filter(id => id !== topicId);
    } else {
      updated = [...completedTopics, topicId];
    }
    setCompletedTopics(updated);
    localStorage.setItem('curiva_anatomy_progress', JSON.stringify(updated));
  };

  // Get module details dynamically to support filter logic
  const enrichedTopics = useMemo(() => {
    return ALL_TOPICS.map(t => {
      const details = getAnatomyModule(t.id);
      return {
        ...t,
        difficulty: details.difficulty,
        importance: details.importance,
        studyTime: details.studyTime,
        importanceRaw: details.importance.replace('⭐ ', '')
      };
    });
  }, []);

  const filteredTopics = useMemo(() => {
    return enrichedTopics.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.competency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || t.region === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
      
      let matchesImportance = true;
      if (selectedImportance !== 'All') {
        matchesImportance = t.importanceRaw.includes(selectedImportance);
      }

      return matchesSearch && matchesCategory && matchesDifficulty && matchesImportance;
    });
  }, [enrichedTopics, searchQuery, selectedCategory, selectedDifficulty, selectedImportance]);

  // Calculations for progress
  const progressPercent = useMemo(() => {
    if (ALL_TOPICS.length === 0) return 0;
    return Math.round((completedTopics.length / ALL_TOPICS.length) * 100);
  }, [completedTopics]);

  return (
    <div className="space-y-10 py-6">
      <SEO 
        title="1st BHMS Anatomy Library - NCH CBDC Syllabus" 
        description="Comprehensive, student-friendly Anatomy Library for First BHMS. Visual plans, mnemonics, clinical pearls, and exam notes aligned with the NCH CBDC syllabus."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -ml-20 -mb-10 pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/20 text-blue-300 border border-primary/30">
            <GraduationCap className="w-4 h-4" />
            First Professional BHMS Core Subject
          </span>
          
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
            Human Anatomy <span className="text-blue-400 font-serif italic">Knowledge Library</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Welcome to the ultimate learning companion for First BHMS Anatomy! Designed strictly according to the latest <strong>National Commission for Homoeopathy (NCH) CBDC Syllabus</strong>. Master osteology, arthrology, myology, neuroanatomy, and clinical correlations in simple Indian English.
          </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <BookOpenCheck className="w-4 h-4 text-blue-400" />
                {ALL_TOPICS.length} Core Curriculum Modules
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Layers className="w-4 h-4 text-purple-400" />
                Upper Limb, Abdomen & Lower Limb
              </div>
            </div>
        </div>
      </section>

      {/* Progress Tracker Card */}
      <section className="bg-white dark:bg-zinc-950 border border-border rounded-[2rem] p-6 md:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-primary" />
              Syllabus Completion Tracker
            </h3>
            <p className="text-xs text-text-secondary">
              Track your preparation progress across all {ALL_TOPICS.length} mandatory competencies. Mark topics as completed as you study to reach 100% exam readiness!
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2 text-right shrink-0">
            <div className="flex justify-between items-end">
              <span className="text-xs font-mono font-bold text-text-secondary">Your Status:</span>
              <span className="text-2xl font-black font-display text-primary">{progressPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-bg-secondary rounded-full overflow-hidden border border-border/40 relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-blue-500 rounded-full"
              />
            </div>
            <p className="text-[10px] text-text-tertiary">
              {completedTopics.length} of {ALL_TOPICS.length} competencies mastered
            </p>
          </div>
        </div>
      </section>

      {/* Main Library Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar column */}
        <div className="lg:col-span-3">
          <LearningSidebar 
            currentSubject="anatomy" 
            completedCount={completedTopics.length} 
            totalCount={ALL_TOPICS.length} 
            activeItem="overview" 
          />
        </div>

        {/* Right content column: Topics Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Horizontal Filter Deck */}
          <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2rem] p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  Syllabus Explorer Filter
                </h3>
                <p className="text-[10px] text-text-tertiary">Surgically isolate your active competencies</p>
              </div>
              {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedImportance !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setSelectedImportance('All');
                  }}
                  className="px-3 py-1 bg-rose-500/10 text-rose-600 rounded-lg text-[10px] font-bold hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Box */}
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Search Code or Title</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Clavicle, AN1.1..."
                    className="w-full pl-9 pr-3 py-2 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:border-primary text-text-primary"
                  />
                </div>
              </div>

              {/* System Category Filter */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">System Category</label>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Bones', 'Nerves', 'Joints', 'Regions', 'Soft Tissue', 'Vessels'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        selectedCategory === cat 
                          ? "bg-primary text-white shadow-sm" 
                          : "bg-bg-secondary text-text-secondary border border-border/40 hover:bg-bg-primary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/40">
              {/* Difficulty Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Difficulty Level</label>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        selectedDifficulty === diff 
                          ? "bg-primary text-white shadow-sm" 
                          : "bg-bg-secondary text-text-secondary border border-border/40 hover:bg-bg-primary"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* University Importance Filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Exam Importance</label>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Frequently Asked', 'Viva Favourite', 'High Scoring', 'Concept Based', 'Easy Marks'].map(imp => (
                    <button
                      key={imp}
                      onClick={() => setSelectedImportance(imp)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        selectedImportance === imp 
                          ? "bg-primary text-white shadow-sm" 
                          : "bg-bg-secondary text-text-secondary border border-border/40 hover:bg-bg-primary"
                      }`}
                    >
                      {imp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-text-secondary font-medium">
              Showing <span className="text-primary font-bold">{filteredTopics.length}</span> competency modules
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] text-text-tertiary flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Easy
              </span>
              <span className="text-[10px] text-text-tertiary flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium
              </span>
              <span className="text-[10px] text-text-tertiary flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Hard
              </span>
            </div>
          </div>

          {/* Competency Card Grid - Stacked Vertically */}
          <div className="flex flex-col gap-12">
            {Object.entries(ANATOMY_TOPICS).map(([sectionKey, topics]) => {
              const sectionTitle = sectionKey === 'upperLimb' ? 'Upper Limb & Thorax' : 
                                  sectionKey === 'abdomen' ? 'Abdomen & Pelvis' : 'Lower Limb';
              
              const sectionTopics = filteredTopics.filter(ft => topics.some(t => t.id === ft.id));
              
              if (sectionTopics.length === 0) return null;

              return (
                <div key={sectionKey} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-border/60" />
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="text-base font-black uppercase tracking-[0.25em] text-primary px-6 py-1.5 bg-primary/5 rounded-full border border-primary/20 shadow-sm">
                        {sectionTitle}
                      </h3>
                      <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                        {sectionTopics.length} Core Topics
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-border/60" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {sectionTopics.map((topic, index) => {
                        const isCompleted = completedTopics.includes(topic.id);
                        return (
                          <motion.div
                            key={topic.id}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                            className={`bg-white dark:bg-zinc-950 border rounded-3xl p-5 shadow-soft hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group relative overflow-hidden h-full ${
                              isCompleted ? "border-green-500/30 bg-green-500/[0.01]" : "border-border"
                            }`}
                          >
                            {/* Completion Ribbon */}
                            {isCompleted && (
                              <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1 z-10">
                                <CheckCircle2 className="w-3 h-3" />
                                Mastered
                              </div>
                            )}

                            <div className="space-y-3">
                              {/* Top Badges row */}
                              <div className="flex justify-between items-center pr-12">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary">
                                  Comp {topic.competency}
                                </span>
                                
                                <div className="flex gap-1">
                                  <span className="text-[9px] font-mono font-bold text-text-tertiary px-1.5 py-0.5 bg-bg-secondary border border-border/50 rounded uppercase">
                                    {topic.region}
                                  </span>
                                </div>
                              </div>

                              {/* Title & Description */}
                              <div className="space-y-1.5">
                                <h4 className="text-base font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                  {topic.title}
                                </h4>
                                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                  {topic.desc}
                                </p>
                              </div>

                              {/* Details pills */}
                              <div className="flex flex-wrap gap-2 pt-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-bg-secondary border border-border/40 text-text-secondary">
                                  <Clock className="w-3 h-3 text-primary" />
                                  {topic.studyTime}
                                </span>

                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold border ${
                                  topic.difficulty === 'Easy'
                                    ? "bg-green-500/10 text-green-600 border-green-500/20"
                                    : topic.difficulty === 'Medium'
                                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                    : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                                }`}>
                                  {topic.difficulty}
                                </span>

                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">
                                  {topic.importance.split(' ')[1]} {topic.importance.split(' ')[2] || ''}
                                </span>
                              </div>
                            </div>

                            {/* Bottom Actions Row */}
                            <div className="border-t border-border/40 mt-5 pt-3.5 flex justify-between items-center">
                              <button
                                onClick={(e) => toggleComplete(topic.id, e)}
                                className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                  isCompleted 
                                    ? "text-green-600 hover:text-green-700" 
                                    : "text-text-tertiary hover:text-primary"
                                }`}
                              >
                                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "fill-green-600 text-green-600" : ""}`} />
                                {isCompleted ? "Mastered" : "Mark Mastered"}
                              </button>

                              <Link
                                to={`/anatomy/${topic.id}`}
                                className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-strong transition-all"
                              >
                                Start Learning
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}

            {filteredTopics.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white dark:bg-zinc-950 border border-border border-dashed rounded-[2rem] space-y-3">
                <AlertCircle className="w-8 h-8 text-text-tertiary mx-auto" />
                <p className="text-xs text-text-secondary">No anatomy modules match your selected filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setSelectedImportance('All');
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Knowledge Path Visualizer (Interactive Graph) */}
      <section className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
              <Network className="w-3.5 h-3.5" />
              Interactive Regional Knowledge Graph
            </span>
            <h3 className="text-xl font-bold text-text-primary">
              Upper Extremity Structural Pathways
            </h3>
            <p className="text-xs text-text-secondary">
              Click any node in the network to explore how bones, joints, nerves, and clinical regions interconnect in the BHMS anatomy syllabus.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 text-[10px] font-bold">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Bone
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-400 rounded-full border border-purple-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Nerve
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-full border border-teal-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Joint
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-full border border-rose-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Region
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          
          {/* Interactive Graph Canvas */}
          <div className="xl:col-span-8 bg-bg-secondary border border-border/80 rounded-[2rem] p-4 flex items-center justify-center relative overflow-hidden min-h-[350px] md:min-h-[480px]">
            {/* Ambient grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
            
            <svg 
              viewBox="0 0 1000 600" 
              className="w-full h-auto max-h-[550px] select-none relative z-10 overflow-visible"
            >
              {/* Definition of glowing filters */}
              <defs>
                <filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render Connection Links */}
              {GRAPH_LINKS.map((link, idx) => {
                const sourceNode = GRAPH_NODES.find(n => n.id === link.source);
                const targetNode = GRAPH_NODES.find(n => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const sx = (sourceNode.x / 100) * 1000;
                const sy = (sourceNode.y / 100) * 600;
                const tx = (targetNode.x / 100) * 1000;
                const ty = (targetNode.y / 100) * 600;

                const isConnectedToActive = activeGraphNodeId === link.source || activeGraphNodeId === link.target;

                return (
                  <g key={idx}>
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      className="transition-all duration-300"
                      stroke={isConnectedToActive ? '#6366f1' : '#cbd5e1'}
                      strokeOpacity={isConnectedToActive ? 0.95 : 0.45}
                      strokeWidth={isConnectedToActive ? 3.5 : 1.5}
                      strokeDasharray={isConnectedToActive ? 'none' : '4,4'}
                      filter={isConnectedToActive ? 'url(#glow-indigo)' : undefined}
                    />
                    {isConnectedToActive && (
                      <circle
                        cx={(sx + tx) / 2}
                        cy={(sy + ty) / 2}
                        r="3.5"
                        fill="#818cf8"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {GRAPH_NODES.map((node) => {
                const nx = (node.x / 100) * 1000;
                const ny = (node.y / 100) * 600;
                const isActive = activeGraphNodeId === node.id;

                // Category styling variables
                const colorMap: Record<string, string> = {
                  'Bone': '#f59e0b',
                  'Nerves': '#8b5cf6',
                  'Joint': '#0d9488',
                  'Region': '#f43f5e',
                  'Central': '#64748b'
                };
                const bgMap: Record<string, string> = {
                  'Bone': '#fef3c7',
                  'Nerves': '#f3e8ff',
                  'Joint': '#ccfbf1',
                  'Region': '#ffe4e6',
                  'Central': '#f1f5f9'
                };
                const themeColor = colorMap[node.category] || '#6366f1';
                const themeBg = bgMap[node.category] || '#e0e7ff';

                return (
                  <g 
                    key={node.id}
                    transform={`translate(${nx}, ${ny})`}
                    className="cursor-pointer group"
                    onClick={() => setActiveGraphNodeId(node.id)}
                  >
                    {/* Glowing outer aura for active node */}
                    {isActive && (
                      <circle
                        r="32"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                        className="animate-pulse"
                        opacity="0.8"
                      />
                    )}

                    {/* Outer node background */}
                    <circle
                      r={isActive ? '22' : '17'}
                      fill={themeBg}
                      stroke={isActive ? '#6366f1' : themeColor}
                      strokeWidth={isActive ? '3' : '2'}
                      className="transition-all duration-200 group-hover:scale-110"
                    />

                    {/* Small inner node core */}
                    <circle
                      r={isActive ? '8' : '6'}
                      fill={themeColor}
                      className="transition-all duration-200"
                    />

                    {/* Node Text Label with backdrop block for 100% legibility */}
                    <rect
                      x="-85"
                      y={isActive ? '28' : '23'}
                      width="170"
                      height="18"
                      rx="4"
                      fill="#ffffff"
                      fillOpacity="0.85"
                      className="pointer-events-none stroke-border/30 stroke-[0.5px]"
                    />
                    <text
                      y={isActive ? '41' : '36'}
                      textAnchor="middle"
                      className={`text-[10px] font-bold fill-text-primary pointer-events-none ${isActive ? 'font-black' : ''}`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Connection Detail & Syllabus Explorer Card */}
          <div className="xl:col-span-4 bg-white dark:bg-zinc-950 border border-border/80 rounded-[2rem] p-5 flex flex-col justify-between shadow-soft space-y-5">
            {(() => {
              const activeNode = GRAPH_NODES.find(n => n.id === activeGraphNodeId);
              if (!activeNode) return null;

              // Find all links connected to active node
              const connectedLinks = GRAPH_LINKS.filter(l => l.source === activeNode.id || l.target === activeNode.id);

              return (
                <>
                  <div className="space-y-4 text-left">
                    {/* Header with Category Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                        {activeNode.category} Unit
                      </span>
                      <span className="text-[9px] font-mono font-bold text-text-tertiary">
                        ID: {activeNode.id.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-text-primary">
                        {activeNode.label}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {activeNode.description}
                      </p>
                    </div>

                    <hr className="border-border/60" />

                    {/* Direct Connections List */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                        Direct Syllabus Connections ({connectedLinks.length})
                      </h5>
                      
                      <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                        {connectedLinks.map((link, idx) => {
                          const otherNodeId = link.source === activeNode.id ? link.target : link.source;
                          const otherNode = GRAPH_NODES.find(n => n.id === otherNodeId);
                          return (
                            <div 
                              key={idx}
                              onClick={() => setActiveGraphNodeId(otherNodeId)}
                              className="p-2.5 bg-bg-secondary hover:bg-bg-primary border border-border/40 hover:border-indigo-500/30 rounded-xl cursor-pointer transition-all space-y-1 group text-left"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                                  ↔ {otherNode?.label}
                                </span>
                                <span className="text-[8px] font-mono font-bold text-text-tertiary">
                                  {otherNode?.category}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-text-secondary leading-relaxed font-medium">
                                {link.relation}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Call to action to jump directly to this topic */}
                  <div className="pt-4 border-t border-border/60 space-y-2.5 text-left">
                    <div className="flex items-center gap-2 bg-indigo-500/5 p-2.5 rounded-xl border border-indigo-500/10">
                      <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-indigo-700 dark:text-indigo-400 leading-relaxed font-medium">
                        Explore structures, nerve relations, and high-yield clinical questions in this specific syllabus module.
                      </p>
                    </div>

                    {activeNode.relatedSlug && (
                      <Link
                        to={`/anatomy/${activeNode.relatedSlug}`}
                        className="w-full py-3 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-strong hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpenCheck className="w-4 h-4" />
                        Open {activeNode.label.split(' (')[0]} Lecture Notes
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* BHMS University Exam Prep Guide */}
      <section className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-zinc-950 text-white rounded-[2.5rem] p-8 md:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Curiva Professor Academic Advisory
          </span>
          <h3 className="text-2xl font-bold font-display tracking-tight">
            How to Score High Marks in Anatomy Paper I
          </h3>
          <p className="text-xs text-slate-300">
            Tips from seasoned Homoeopathic Medical College examiners on securing the best marks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs">1</span>
              Diagram First Strategy
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always start essay answers (e.g. Mammary Gland, Brachial Plexus) by drawing a neat, color-coded schematic. Examiners grade drawings before scanning paragraphs. Use red for arteries, blue for veins, and yellow/purple for nerves.
            </p>
          </div>

          <div className="space-y-2 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs">2</span>
              Structure Over Text
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Format your answers strictly using standardized regional headings: Introduction, Gross Anatomy, Relations, Blood Supply, Nerve Supply, Lymphatics, and Applied Anatomy. Bullet points score significantly higher than long paragraphs.
            </p>
          </div>

          <div className="space-y-2 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h4 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs">3</span>
              Double Applied Weight
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Homoeopathic syllabus mandates clinical correlation! Always dedicate the last page of your answer booklet to "Applied Anatomy" (e.g. Erb\'s Palsy, Saturday night palsy, Volkmann\'s contracture). This demonstrates real-world diagnostic potential.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
