import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, BookOpen, Clock, Award, HelpCircle, ShieldAlert, CheckCircle, 
  ChevronRight, Sparkles, AlertCircle, FileText, Compass, List, HeartPulse, 
  MapPin, HelpCircle as QuestionIcon, RefreshCw, PenTool, Layout, Layers, CheckSquare, X
} from 'lucide-react';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import { getAnatomyModule } from '../data/anatomyModulesData';
import { ANATOMY_TOPICS, ALL_TOPICS } from './AnatomyLibrary';
import KnowledgeDNA from '../components/KnowledgeDNA';
import { ContentNavigator } from '../components/ContentNavigator';

const CLINICAL_CONCEPTS_MAP: Record<string, {
  title: string;
  concepts: {
    name: string;
    quickFact: string;
    significance: string;
  }[];
}> = {
  'clavicle': {
    title: "Clavicle Clinical Correlations",
    concepts: [
      {
        name: "Clavicular Fracture",
        quickFact: "Most commonly fractured bone in the body, typically at the junction of the medial 2/3 and lateral 1/3 (the weakest transition point).",
        significance: "Often caused by falling on an outstretched hand (FOOSH). The lateral fragment is pulled downward by gravity and the deltoid, while the medial fragment is elevated by the sternocleidomastoid muscle."
      },
      {
        name: "Cleidocranial Dysostosis",
        quickFact: "A rare hereditary condition marked by defective membranous ossification, leading to hypoplastic or completely absent clavicles.",
        significance: "Patients can bring their shoulders together anteriorly in the midline of the chest. It is often associated with dental anomalies and delayed closure of skull fontanelles."
      }
    ]
  },
  'humerus': {
    title: "Humerus Clinical Correlations",
    concepts: [
      {
        name: "Surgical Neck Fracture",
        quickFact: "A common site of fracture in elderly osteoporotic individuals, risking injury to the closely related Axillary Nerve.",
        significance: "Damage to the axillary nerve leads to paralysis of the deltoid muscle (loss of arm abduction from 15 to 90 degrees) and sensory loss over the 'regimental badge' area."
      },
      {
        name: "Radial Groove Fracture",
        quickFact: "Mid-shaft fractures of the humerus run directly along the spiral/radial groove, threatening the Radial Nerve.",
        significance: "Results in 'wrist drop' due to paralysis of wrist and finger extensors, accompanied by sensory loss in the first dorsal web space."
      },
      {
        name: "Supracondylar Fracture",
        quickFact: "Very common in children who fall on an outstretched hand, risking compression of the Median Nerve and Brachial Artery.",
        significance: "Can lead to Volkmann's Ischemic Contracture (claw-like flexion deformity of fingers and wrist due to muscle necrosis and fibrosis from ischemia)."
      }
    ]
  },
  'scapula': {
    title: "Scapula Clinical Correlations",
    concepts: [
      {
        name: "Winging of Scapula",
        quickFact: "Caused by injury to the Long Thoracic Nerve of Bell (C5-C7) or paralysis of the Serratus Anterior muscle.",
        significance: "When the patient attempts to push against a wall, the medial border of the scapula protrudes backward like a wing. The patient is unable to abduct the arm above 90 degrees (overhead abduction)."
      },
      {
        name: "Sprengel's Deformity",
        quickFact: "A congenital failure of the scapula to descend to its normal position in the thorax during embryonic development.",
        significance: "Results in a high, small, rotated scapula on one side, which limits shoulder joint movement and causes aesthetic neck asymmetry."
      }
    ]
  },
  'radius': {
    title: "Radius Clinical Correlations",
    concepts: [
      {
        name: "Colles' Fracture",
        quickFact: "A fracture of the distal end of the radius (within 2.5 cm of the wrist) caused by a fall on an outstretched hand, especially in postmenopausal women.",
        significance: "Presents with a characteristic 'dinner fork deformity' where the distal bone fragment is displaced posteriorly and superiorly."
      },
      {
        name: "Smith's Fracture",
        quickFact: "Often referred to as a 'reverse Colles' fracture,' this occurs from a fall on a flexed wrist.",
        significance: "The distal radial fragment is displaced anteriorly (volarly), causing a 'garden spade deformity' requiring distinct reduction maneuvers."
      }
    ]
  },
  'ulna': {
    title: "Ulna Clinical Correlations",
    concepts: [
      {
        name: "Monteggia Fracture-Dislocation",
        quickFact: "A fracture of the proximal third of the ulnar shaft accompanied by dislocation of the head of the radius.",
        significance: "Caused by direct trauma or forced pronation. Immediate surgical alignment is crucial to protect the deep branch of the radial nerve."
      },
      {
        name: "Galeazzi Fracture-Dislocation",
        quickFact: "A fracture of the distal third of the radius accompanied by dislocation of the distal radioulnar joint (DRUJ).",
        significance: "Often results from a fall on an outstretched arm with forced pronation, requiring open reduction internal fixation (ORIF)."
      }
    ]
  },
  'carpal-bones': {
    title: "Carpal Bones Clinical Correlations",
    concepts: [
      {
        name: "Scaphoid Fracture",
        quickFact: "The most commonly fractured carpal bone, typically presenting with deep pain and tenderness in the anatomical snuffbox.",
        significance: "The blood supply enters from the distal pole. A fracture through the waist can cut off blood to the proximal pole, leading to avascular necrosis (AVN) and non-union."
      },
      {
        name: "Lunate Dislocation",
        quickFact: "The lunate is the most commonly dislocated carpal bone, typically displacing anteriorly into the carpal tunnel.",
        significance: "Anterior lunate displacement directly compresses the Median Nerve, causing acute carpal tunnel syndrome, pain, and paresthesia in the lateral 3.5 digits."
      }
    ]
  },
  'mammary-gland': {
    title: "Mammary Gland Clinical Correlations",
    concepts: [
      {
        name: "Peau d'orange Appearance",
        quickFact: "A classic sign of advanced breast cancer where the skin of the breast resembles an orange peel.",
        significance: "Infiltration of cancer cells blocks the superficial lymphatics, leading to localized lymphedema, while hair follicles remain tethered, creating a dimpled texture."
      },
      {
        name: "Skin Dimpling",
        quickFact: "Infiltration of the suspensory ligaments of Cooper by a malignant breast tumor.",
        significance: "This causes shortening or contraction of Cooper's ligaments, pulling the skin inward and resulting in fixed dimpling over the tumor site."
      },
      {
        name: "Nipple Retraction",
        quickFact: "Occurs when a tumor grows in the center of the breast or invades the lactiferous ducts.",
        significance: "Fibrosis and shortening of these ducts pull the nipple inward (retraction or inversion), a key diagnostic warning sign."
      }
    ]
  },
  'brachial-plexus': {
    title: "Brachial Plexus Clinical Correlations",
    concepts: [
      {
        name: "Erb's Palsy",
        quickFact: "Caused by damage to the upper trunk of the brachial plexus at Erb's point (C5-C6 junction) due to traction during birth or shoulder trauma.",
        significance: "Presents as 'Policeman's tip' or 'waiter's tip' hand: arm hangs limply by the side, adducted and medially rotated, with the forearm extended and pronated."
      },
      {
        name: "Klumpke's Palsy",
        quickFact: "Caused by injury to the lower trunk of the brachial plexus (C8-T1), typically due to hyperabduction of the arm (e.g., clutching a tree branch while falling).",
        significance: "Leads to 'claw hand' (paralysis of all intrinsic hand muscles) and Horner's Syndrome (if T1 sympathetic fibers are torn, causing ptosis, miosis, and anhidrosis)."
      }
    ]
  },
  'shoulder-joint': {
    title: "Shoulder Joint Clinical Correlations",
    concepts: [
      {
        name: "Anterior Dislocation",
        quickFact: "The shoulder is the most commonly dislocated joint in the body; anterior/inferior dislocations account for over 95% of cases.",
        significance: "The joint is weakest inferiorly due to lack of rotator cuff support. Dislocation risks injuring the Axillary Nerve, leading to flat-shoulder deformity."
      },
      {
        name: "Rotator Cuff Tendinitis",
        quickFact: "Chronic inflammation of the SITS muscle tendons (primarily Supraspinatus) as they pass under the coracoacromial arch.",
        significance: "Presents as 'painful arc syndrome' where the patient feels sharp pain during active abduction of the arm between 60 and 120 degrees."
      }
    ]
  },
  'elbow-joint': {
    title: "Elbow Joint Clinical Correlations",
    concepts: [
      {
        name: "Pulled Elbow (Nursemaid's Elbow)",
        quickFact: "Subluxation of the radial head out of the annular ligament, highly common in children under 5 years.",
        significance: "Occurs when a child's arm is suddenly pulled while pronated. The child holds the elbow slightly flexed and pronated, refusing to use the arm."
      },
      {
        name: "Student's Elbow (Miners' Elbow)",
        quickFact: "Subcutaneous olecranon bursitis caused by repeated friction or resting the elbows on hard desks.",
        significance: "Presents as a fluctuant, tender swelling over the olecranon process, which may require aspiration if infected."
      }
    ]
  },
  'wrist-joint': {
    title: "Wrist Joint Clinical Correlations",
    concepts: [
      {
        name: "Wrist Osteoarthritis",
        quickFact: "Typically secondary to trauma, such as old untreated scaphoid fractures or scapholunate advanced collapse (SLAC).",
        significance: "Causes progressive hand grip weakness, chronic wrist stiffness, and localized swelling at the radiocarpal junction."
      }
    ]
  },
  'axilla': {
    title: "Axilla Clinical Correlations",
    concepts: [
      {
        name: "Axillary Lymphadenopathy",
        quickFact: "Enlargement of the axillary lymph nodes, which drain the breast, pectoral region, and upper extremity.",
        significance: "Infectious pathogens or metastatic breast cancer cells migrate through these nodes, requiring surgical clearance (axillary dissection)."
      }
    ]
  },
  'axillary-artery': {
    title: "Axillary Artery Clinical Correlations",
    concepts: [
      {
        name: "Axillary Artery Aneurysm",
        quickFact: "Saccular dilation of the axillary artery, common in baseball pitchers due to rapid overhead throwing.",
        significance: "Can compress the surrounding cords of the brachial plexus, causing neurological pain, numbness, and motor weakness down the arm."
      }
    ]
  },
  'median-nerve': {
    title: "Median Nerve Clinical Correlations",
    concepts: [
      {
        name: "Carpal Tunnel Syndrome",
        quickFact: "Compression of the Median Nerve within the fibro-osseous carpal tunnel beneath the flexor retinaculum.",
        significance: "Presents with tingling, numbness, and burning pain in the lateral 3.5 digits, along with thenar muscle wasting (ape thumb deformity) in late stages."
      },
      {
        name: "Ape Thumb Deformity",
        quickFact: "Severe compression or injury to the median nerve at the wrist or elbow, paralyzing the thenar muscles.",
        significance: "The thumb is held in adduction and extension, aligned with the fingers, preventing opposition and limiting precision grip."
      }
    ]
  },
  'ulnar-nerve': {
    title: "Ulnar Nerve Clinical Correlations",
    concepts: [
      {
        name: "Cubital Tunnel Syndrome",
        quickFact: "Compression of the Ulnar Nerve as it passes behind the medial epicondyle of the humerus (the 'funny bone' area).",
        significance: "Causes paresthesia in the medial 1.5 digits (little and ring fingers) and intrinsic hand muscle weakness."
      },
      {
        name: "Ulnar Claw Hand",
        quickFact: "Hyperextension of the MCP joints and flexion of the IP joints of the 4th and 5th digits due to ulnar nerve injury.",
        significance: "Loss of lumbrical muscles to the ring and little fingers leads to unopposed extensor digitorum and flexor digitorum profundus action. The 'ulnar paradox' dictates that lower lesions cause more prominent clawing."
      }
    ]
  },
  'radial-nerve': {
    title: "Radial Nerve Clinical Correlations",
    concepts: [
      {
        name: "Saturday Night Palsy",
        quickFact: "Compressive radial nerve injury in the axilla or spiral groove, often from falling asleep with an arm draped over the back of a chair.",
        significance: "Presents as immediate 'wrist drop' and inability to extend the fingers, thumb, or wrist, with sensory loss in the dorsum of the hand."
      },
      {
        name: "Crutch Paralysis",
        quickFact: "Repeated pressure in the axilla from poorly adjusted crutches compressing the radial nerve.",
        significance: "Leads to weakness of the triceps (loss of elbow extension) and forearm extensors, mimicking high radial nerve lesions."
      }
    ]
  },
  'pectoral-region': {
    title: "Pectoral Region Clinical Correlations",
    concepts: [
      {
        name: "Poland Syndrome",
        quickFact: "A rare congenital condition characterized by unilateral underdevelopment or complete absence of the pectoralis major muscle.",
        significance: "Often accompanied by symbrachydactyly (short, webbed fingers) on the ipsilateral side and chest wall asymmetry."
      }
    ]
  },
  'cubital-fossa': {
    title: "Cubital Fossa Clinical Correlations",
    concepts: [
      {
        name: "Median Cubital Vein Varicosity",
        quickFact: "The primary site for venipuncture and intravenous access due to its superficial position and stabilization by the bicipital aponeurosis.",
        significance: "The bicipital aponeurosis acts as a protective shield, separating the median cubital vein from the underlying brachial artery and median nerve during needle insertion."
      }
    ]
  },
  'palmar-aponeurosis': {
    title: "Palmar Aponeurosis Clinical Correlations",
    concepts: [
      {
        name: "Dupuytren's Contracture",
        quickFact: "Progressive shortening, thickening, and fibrotic nodule formation within the palmar aponeurosis.",
        significance: "Leads to a fixed flexion deformity, pulling the ring and little fingers towards the palm, restricting hand opening."
      }
    ]
  },
  'femur': {
    title: "Femur Clinical Correlations",
    concepts: [
      {
        name: "Fracture Neck of Femur",
        quickFact: "Common in elderly women with osteoporosis; disrupts the blood supply to the head of the femur.",
        significance: "Leads to Avascular Necrosis (AVN) of the femoral head. Clinically presents with a shortened and externally rotated limb."
      },
      {
        name: "Coxa Vara and Coxa Valga",
        quickFact: "Changes in the angle of inclination (normally 125 degrees) between the neck and shaft.",
        significance: "Coxa Vara (<120°) increases the risk of neck fractures; Coxa Valga (>135°) can lead to subluxation or dislocation of the hip."
      }
    ]
  },
  'hip-joint': {
    title: "Hip Joint Clinical Correlations",
    concepts: [
      {
        name: "Congenital Dislocation of Hip (CDH)",
        quickFact: "Failure of the acetabulum to develop properly, making it shallow.",
        significance: "Common in female infants; diagnosed by Ortolani and Barlow tests. If untreated, it leads to a characteristic 'waddling gait'."
      },
      {
        name: "Shenton's Line",
        quickFact: "A radiological curve formed by the superior pubic ramus and the medial femoral neck.",
        significance: "Interruption of this line on an X-ray is a key sign of hip dislocation or femoral neck fracture."
      }
    ]
  },
  'knee-joint': {
    title: "Knee Joint Clinical Correlations",
    concepts: [
      {
        name: "Unhappy Triad (O'Donoghue's Triad)",
        quickFact: "Simultaneous injury to the ACL, MCL, and Medial Meniscus.",
        significance: "Often occurs in athletes when the foot is fixed and a lateral force is applied to the knee (valgus stress)."
      },
      {
        name: "Housemaid's Knee",
        quickFact: "Prepatellar bursitis caused by frequent kneeling.",
        significance: "Inflammation of the bursa between the skin and the patella, causing pain and swelling at the front of the knee."
      }
    ]
  },
  'abdominal-wall': {
    title: "Abdominal Wall Clinical Correlations",
    concepts: [
      {
        name: "Caput Medusae",
        quickFact: "Radiating veins around the umbilicus due to portal-systemic anastomosis.",
        significance: "A classic sign of portal hypertension (often due to liver cirrhosis), where paraumbilical veins provide a bypass route."
      },
      {
        name: "Divarication of Recti",
        quickFact: "Separation of the two rectus abdominis muscles in the midline.",
        significance: "Common after multiple pregnancies or in obese individuals; causes a midline bulge when the patient attempts to sit up."
      }
    ]
  },
  'inguinal-canal': {
    title: "Inguinal Region Clinical Correlations",
    concepts: [
      {
        name: "Indirect Inguinal Hernia",
        quickFact: "The most common type of hernia, where abdominal contents enter the deep ring lateral to the inferior epigastric artery.",
        significance: "Often congenital (patent processus vaginalis). The hernia sac can descend into the scrotum."
      },
      {
        name: "Direct Inguinal Hernia",
        quickFact: "Occurs through a weakness in the posterior wall of the inguinal canal (Hesselbach's triangle).",
        significance: "Common in elderly males; the sac is medial to the inferior epigastric artery and rarely enters the scrotum."
      }
    ]
  }
};

export default function AnatomyTopicDetail() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'gross' | 'clinical' | 'viva' | 'drawing'>('overview');
  const [revealedVivas, setRevealedVivas] = useState<Record<number, boolean>>({});
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Progress tracker state
  const [isCompleted, setIsCompleted] = useState(false);
  const [isClinicalDrawerOpen, setIsClinicalDrawerOpen] = useState(false);

  const detailContainerRef = useRef<HTMLDivElement>(null);

  // Retrieve current topic module
  const topicData = getAnatomyModule(topicId || '');

  // Track completion on load
  useEffect(() => {
    if (topicId) {
      const saved = localStorage.getItem('curiva_anatomy_progress');
      if (saved) {
        try {
          const list = JSON.parse(saved);
          setIsCompleted(list.includes(topicId));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [topicId]);

  // Handle completion toggle
  const toggleCompleted = () => {
    if (!topicId) return;
    const saved = localStorage.getItem('curiva_anatomy_progress');
    let list: string[] = [];
    if (saved) {
      try { list = JSON.parse(saved); } catch (e) {}
    }
    
    let updated: string[];
    if (list.includes(topicId)) {
      updated = list.filter(id => id !== topicId);
      setIsCompleted(false);
    } else {
      updated = [...list, topicId];
      setIsCompleted(true);
    }
    localStorage.setItem('curiva_anatomy_progress', JSON.stringify(updated));
  };

  // Scroll Progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!topicData || !topicId) {
    return (
      <div className="py-12 text-center max-w-xl mx-auto space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-text-primary">Competency Module Not Found</h2>
        <p className="text-sm text-text-secondary">We couldn't locate the anatomy topic you're searching for. It might be in development or under a different code.</p>
        <Link to="/anatomy" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-strong transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Anatomy Library
        </Link>
      </div>
    );
  }

  // Find next topic in ALL_TOPICS list to suggest for "Continue Learning"
  const currentIndex = ALL_TOPICS.findIndex(t => t.id === topicId);
  const nextTopic = currentIndex !== -1 && currentIndex < ALL_TOPICS.length - 1 
    ? ALL_TOPICS[currentIndex + 1] 
    : ALL_TOPICS[0];

  const toggleViva = (index: number) => {
    setRevealedVivas(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Facts', icon: Compass },
    { id: 'gross', label: 'Gross Anatomy', icon: Layout },
    { id: 'clinical', label: 'Applied Clinical', icon: HeartPulse },
    { id: 'viva', label: 'Vivas & PYQs', icon: FileText },
    { id: 'drawing', label: 'Illustration Blueprint', icon: PenTool },
  ] as const;

  return (
    <div className="relative pb-24" ref={detailContainerRef}>
      <SEO 
        title={`${topicData.title} | 1st BHMS Anatomy Master Module`} 
        description={`Syllabus-oriented notes for ${topicData.title} under NCH CBDC syllabus. Structured anatomical descriptions, applied pathology, mnemonics, and viva questions.`}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-zinc-900 z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Action Bar / Breadcrumb Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4 mb-6 pt-2">
        <Link 
          to="/anatomy" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-primary transition-colors py-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Anatomy Library
        </Link>

        <div className="flex items-center gap-3">
          <ShareButton 
            title={topicData.title} 
            text={`1st BHMS Anatomy Master Module: ${topicData.title}`} 
            variant="outline" 
            label="Share" 
          />
          <button
            onClick={toggleCompleted}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isCompleted 
                ? "bg-green-500/10 text-green-600 border-green-500/20" 
                : "bg-bg-secondary text-text-secondary border-border/80 hover:bg-bg-primary"
            }`}
          >
            <CheckSquare className={`w-4 h-4 ${isCompleted ? "fill-green-600 text-green-600" : ""}`} />
            {isCompleted ? "Topic Completed" : "Mark as Completed"}
          </button>
        </div>
      </div>

      {/* Hero Visual Card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-slate-800 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-primary/20 text-blue-300 border border-primary/30">
                Syllabus Code: {topicData.nchCompetency.split(' - ')[0]}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-white/10 text-slate-200">
                {topicData.bodyRegion}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-display font-black tracking-tight text-white leading-tight">
              {topicData.title}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 italic font-serif">
              "{topicData.introduction}"
            </p>

            <p className="text-[10px] text-slate-400">
              <strong>NCH Syllabus Specification:</strong> {topicData.nchCompetency}
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 shrink-0 self-stretch md:self-center justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-slate-300">
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Study Time</span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" /> {topicData.studyTime}
              </span>
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Difficulty</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${
                topicData.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                topicData.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {topicData.difficulty}
              </span>
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Exam Rank</span>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-0.5">
                {topicData.importance}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-bg-secondary border border-border rounded-2xl mb-8 no-scrollbar scroll-smooth">
        {tabs.map((t) => {
          const IconComp = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all shrink-0 ${
                activeTab === t.id 
                  ? "bg-white dark:bg-zinc-950 text-primary shadow-sm border border-border" 
                  : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
              }`}
            >
              <IconComp className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              
              {/* TAB 1: OVERVIEW & QUICK FACTS */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Curiva Key Definition */}
                  <div className="bg-bg-secondary border-4 border-double border-primary/40 rounded-[2rem] p-6 text-center space-y-3 relative">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
                      Official Anatomical Definition
                    </span>
                    <p className="text-sm md:text-base font-serif italic text-text-primary leading-relaxed max-w-2xl mx-auto pt-2">
                      "{topicData.definitionText}"
                    </p>
                  </div>

                  {/* Learning Objectives block */}
                  <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2rem] p-6 shadow-soft space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-blue-500" />
                      What You'll Master (Learning Objectives)
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topicData.learningObjectives.map((obj, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curiva Quick Facts Deck */}
                  <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-[2.5rem] p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">
                        Curiva Quick Facts Deck
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1 p-4 bg-white/40 dark:bg-zinc-900/40 border border-border/30 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase text-amber-600 block">Clinical Definition</span>
                        <p className="text-xs text-text-primary leading-relaxed">{topicData.quickFacts.definition}</p>
                      </div>

                      <div className="space-y-1 p-4 bg-white/40 dark:bg-zinc-900/40 border border-border/30 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase text-amber-600 block">Primary Location</span>
                        <p className="text-xs text-text-primary leading-relaxed">{topicData.quickFacts.location}</p>
                      </div>

                      <div className="space-y-1 p-4 bg-white/40 dark:bg-zinc-900/40 border border-border/30 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase text-amber-600 block">Physiological Function</span>
                        <p className="text-xs text-text-primary leading-relaxed">{topicData.quickFacts.function}</p>
                      </div>

                      <div className="space-y-1 p-4 bg-white/40 dark:bg-zinc-900/40 border border-border/30 rounded-2xl">
                        <span className="text-[10px] font-bold uppercase text-amber-600 block">Surgical Importance</span>
                        <p className="text-xs text-text-primary leading-relaxed">{topicData.quickFacts.clinicalImportance}</p>
                      </div>
                    </div>

                    <div className="border-t border-amber-500/10 pt-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-amber-600 block mb-1">One-Line Rapid Revision</span>
                      <p className="text-xs text-amber-800 dark:text-amber-300 font-medium italic">
                        "{topicData.quickFacts.oneLineRevision}"
                      </p>
                    </div>
                  </div>

                  {/* Academic Knowledge DNA Profile */}
                  <KnowledgeDNA
                    difficulty="Year 1"
                    examYieldScore={topicData.importance.includes('★★★') ? 95 : topicData.importance.includes('★★') ? 85 : 75}
                    clinicalAffinityTags={[topicData.bodyRegion, "Anatomical Axis", "Applied Surgery"]}
                    miasmaWeights={{ psora: 65, sycosis: 20, syphilis: 15 }}
                    learningObjectives={topicData.learningObjectives}
                    clinicalPearls={[topicData.clinicalCorrelation]}
                    category="Anatomy"
                  />
                </div>
              )}

              {/* TAB 2: GROSS ANATOMY & STRUCTURE */}
              {activeTab === 'gross' && (
                <div className="space-y-8">
                  {/* Detailed Gross Anatomy Content */}
                  <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2rem] p-6 md:p-8 shadow-soft space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <Layout className="w-5 h-5 text-blue-500" />
                      Detailed Gross Anatomy Specifications
                    </h3>

                    <div className="space-y-6">
                      {/* Parts/Features */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2 border-b border-border/50 pb-1.5">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          Structural Features &amp; Partitions
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {topicData.grossAnatomy.parts.map((p, i) => (
                            <div key={i} className="text-xs text-text-secondary bg-bg-secondary p-3 rounded-xl border border-border/40 leading-relaxed">
                              {p}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Relations */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2 border-b border-border/50 pb-1.5">
                          <Layers className="w-4 h-4 text-purple-500" />
                          Surrounding Spatial Relations
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {topicData.grossAnatomy.relations.map((r, i) => (
                            <div key={i} className="text-xs text-text-secondary bg-bg-secondary p-3.5 rounded-xl border border-border/40 flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Micro features */}
                      {topicData.grossAnatomy.anatomicalFeatures && topicData.grossAnatomy.anatomicalFeatures.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary flex items-center gap-2 border-b border-border/50 pb-1.5">
                            <Compass className="w-4 h-4 text-teal-500" />
                            Notable Micro-Features
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {topicData.grossAnatomy.anatomicalFeatures.map((f, i) => (
                              <div key={i} className="text-xs text-text-secondary bg-bg-secondary p-3.5 rounded-xl border border-border/40">
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Neurovascular Supplies */}
                  <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2rem] p-6 md:p-8 shadow-soft space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-rose-500" />
                      Anatomy Supply Liners (Neurovascular &amp; Lymphatics)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-bg-secondary border border-border/60 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide block">Blood Supply</span>
                        <p className="text-xs text-text-secondary leading-relaxed">{topicData.bloodSupply}</p>
                      </div>

                      <div className="p-4 bg-bg-secondary border border-border/60 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide block">Nerve Supply (Hilton's Rule)</span>
                        <p className="text-xs text-text-secondary leading-relaxed">{topicData.nerveSupply}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: APPLIED CLINICAL ANATOMY */}
              {activeTab === 'clinical' && (
                <div className="space-y-8">
                  {/* Applied Anatomy Details */}
                  <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-[2.5rem] p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
                        Clinical Correlation &amp; Pathology
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-indigo-900 dark:text-indigo-300 leading-relaxed font-serif">
                      {topicData.appliedAnatomy}
                    </p>
                  </div>

                  {/* Curiva Clinical Pearl */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-l-4 border-blue-500 rounded-r-3xl p-6 space-y-3">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                      <HeartPulse className="w-5 h-5" />
                      <h4 className="text-xs font-black uppercase tracking-widest">Curiva Clinical Pearl</h4>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <strong>Pathological Application:</strong> {topicData.clinicalCorrelation}
                    </p>
                  </div>

                  {/* Frequently Confused / Common Mistake Warning */}
                  {topicData.frequentlyConfused && topicData.frequentlyConfused.length > 0 && (
                    <div className="bg-rose-500/[0.02] border border-rose-500/10 rounded-[2rem] p-6 shadow-soft space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-rose-600 flex items-center gap-2">
                        <AlertCircle className="w-4.5 h-4.5" />
                        Examiner Trap Alert: Frequently Confused
                      </h4>
                      <div className="space-y-3">
                        {topicData.frequentlyConfused.map((item, idx) => (
                          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono font-bold bg-slate-100 text-text-secondary px-2 py-0.5 rounded uppercase">Concept A</span>
                              <h5 className="text-xs font-bold text-text-primary">{item.conceptA}</h5>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono font-bold bg-rose-500/10 text-rose-700 px-2 py-0.5 rounded uppercase">Concept B</span>
                              <h5 className="text-xs font-bold text-text-primary">{item.conceptB}</h5>
                              <p className="text-[11px] text-text-secondary leading-relaxed pt-1">{item.explanation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Data Tables */}
                  {topicData.tables && topicData.tables.length > 0 && (
                    <div className="space-y-4">
                      {topicData.tables.map((t, tid) => (
                        <div key={tid} className="bg-white dark:bg-zinc-950 border border-border rounded-3xl overflow-hidden shadow-soft">
                          <div className="bg-bg-secondary px-5 py-4 border-b border-border">
                            <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">
                              {t.title}
                            </h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-bg-primary border-b border-border/80">
                                  {t.headers.map((h, i) => (
                                    <th key={i} className="px-5 py-3 font-bold text-text-primary uppercase tracking-wider text-[10px]">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {t.rows.map((row, rid) => (
                                  <tr key={rid} className="border-b border-border/40 last:border-0 hover:bg-bg-secondary/50">
                                    {row.map((cell, cid) => (
                                      <td key={cid} className="px-5 py-3.5 text-text-secondary">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pathogenesis Flowcharts */}
                  {topicData.flowchartSteps && (
                    <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft space-y-6">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2.5 py-0.5 rounded-full uppercase">Visual Pathogenesis</span>
                        <h4 className="text-base font-bold text-text-primary">
                          {topicData.flowchartSteps.title}
                        </h4>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                        {topicData.flowchartSteps.steps.map((s, idx) => (
                          <div key={idx} className="flex-1 p-4 bg-bg-secondary border border-border/50 rounded-2xl relative flex flex-col justify-between gap-2">
                            <div className="space-y-1">
                              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <h5 className="text-xs font-bold text-text-primary pt-1">{s.label}</h5>
                              <p className="text-[10px] text-text-secondary leading-relaxed">{s.desc}</p>
                            </div>
                            {idx < (topicData.flowchartSteps?.steps.length || 0) - 1 && (
                              <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white border border-border rotate-45 border-l-0 border-b-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: VIVAS & UNIVERSITY PYQS */}
              {activeTab === 'viva' && (
                <div className="space-y-8">
                  {/* Mnemonics box */}
                  {topicData.mnemonics && topicData.mnemonics.length > 0 && (
                    <div className="bg-purple-500/[0.02] border border-purple-500/20 rounded-[2rem] p-6 space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                        Anatomy Mnemonic Vault
                      </h4>
                      <div className="space-y-4">
                        {topicData.mnemonics.map((m, idx) => (
                          <div key={idx} className="p-4 bg-white dark:bg-zinc-900 border border-purple-500/10 rounded-2xl space-y-2">
                            <p className="text-sm font-black text-purple-700 dark:text-purple-300 font-serif">
                              "{m.phrase}"
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              <strong>How it works:</strong> {m.meaning}
                            </p>
                            <p className="text-[11px] text-text-tertiary">
                              <em>Concept mapped:</em> {m.concept}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Viva Q&A Simulator */}
                  <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft space-y-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-0.5 rounded-full uppercase">Active Recall Booster</span>
                      <h3 className="text-lg font-bold text-text-primary">
                        Interactive Viva Voce Simulator
                      </h3>
                      <p className="text-xs text-text-secondary">
                        Click on any question below to test your recall. Seasoned medical college examiners frequently ask these questions in the practical hall.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {topicData.vivaQuestions.map((v, idx) => {
                        const isOpen = !!revealedVivas[idx];
                        return (
                          <div 
                            key={idx} 
                            onClick={() => toggleViva(idx)}
                            className={`border rounded-2xl cursor-pointer transition-all p-4 select-none ${
                              isOpen 
                                ? "border-green-500 bg-green-500/[0.01]" 
                                : "border-border hover:border-text-secondary hover:bg-bg-secondary"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="text-xs font-bold text-text-primary flex items-start gap-2 leading-relaxed">
                                <span className="w-4.5 h-4.5 rounded-md bg-green-500/10 text-green-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">Q</span>
                                <span>{v.q}</span>
                              </h4>
                              <button className="text-[9px] font-bold text-primary uppercase tracking-wider shrink-0 mt-0.5">
                                {isOpen ? "Hide" : "Reveal"}
                              </button>
                            </div>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t border-border/40 mt-3 pt-3 flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                                    <span className="w-4.5 h-4.5 rounded-md bg-green-500 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">A</span>
                                    <span>{v.a}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* University Question Blueprint */}
                  <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-zinc-950 text-white rounded-[2.5rem] p-6 md:p-8 border border-slate-800 shadow-xl space-y-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full uppercase">Syllabus Exam Blueprints</span>
                      <h3 className="text-lg font-bold">University Paper Blueprints</h3>
                      <p className="text-xs text-slate-300">How this specific competency will be queried in First BHMS theory exams.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">Long Answer Questions (10-20m)</span>
                        <div className="space-y-2">
                          {topicData.universityQuestions.longQuestions && topicData.universityQuestions.longQuestions.length > 0 ? (
                            topicData.universityQuestions.longQuestions.map((q, idx) => (
                              <p key={idx} className="text-xs text-slate-300 leading-relaxed font-serif">"{q}"</p>
                            ))
                          ) : (
                            <p className="text-xs text-slate-400 italic">No direct long-form essay is expected for this micro-topic.</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">Short Notes (5m)</span>
                        <div className="space-y-1.5">
                          {topicData.universityQuestions.shortNotes.map((q, idx) => (
                            <li key={idx} className="text-xs text-slate-300 list-disc list-inside">{q}</li>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">Very Short Questions (2m)</span>
                        <div className="space-y-1.5">
                          {topicData.universityQuestions.veryShortQuestions.map((q, idx) => (
                            <li key={idx} className="text-xs text-slate-300 list-disc list-inside">{q}</li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ORIGINAL ILLUSTRATION BLUEPRINT */}
              {activeTab === 'drawing' && (
                <div className="space-y-8">
                  {/* Diagram Concept Blueprint Card */}
                  <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft space-y-6">
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-600 border border-purple-500/20">
                        <PenTool className="w-3.5 h-3.5" />
                        Curiva Original Sketchpad Blueprint
                      </span>
                      <h3 className="text-lg font-bold text-text-primary">
                        How to Draw a 2-Minute Exam-Friendly Diagram
                      </h3>
                      <p className="text-xs text-text-secondary">
                        Indian anatomy examiners prioritize neat schematics. Use this step-by-step layer system to draft the exact illustration needed in your answer booklets under pressure.
                      </p>
                    </div>

                    {topicData.visualPlans && topicData.visualPlans.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-center">
                        <div className="space-y-4">
                          <div className="space-y-1 p-4 bg-purple-500/[0.02] border border-purple-500/10 rounded-2xl">
                            <h4 className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                              Proposed Diagram Title:
                            </h4>
                            <p className="text-sm font-bold text-text-primary">{topicData.visualPlans[0].title}</p>
                            <p className="text-xs text-text-secondary pt-1">{topicData.visualPlans[0].description}</p>
                          </div>

                          {/* Layer outline guide */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Drawing Instructions:</span>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                                <span className="w-5 h-5 rounded-md bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                <span><strong>Pencil Sketch:</strong> Map the general bones or boundary margins first. Keep it light so you can trace cleanly.</span>
                              </div>
                              <div className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                                <span className="w-5 h-5 rounded-md bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                <span><strong>Red / Muscular Layer:</strong> Mark the origins of muscles in bright red, insertions in blue, and arteries with wavy red lines.</span>
                              </div>
                              <div className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                                <span className="w-5 h-5 rounded-md bg-yellow-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                <span><strong>Yellow / Neural Layer:</strong> Sketch related nerves as dashed yellow or purple lines wrapping around landmarks (e.g. spiral groove).</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Visual Mock-up Box */}
                        <div className="bg-bg-secondary border border-border/80 rounded-3xl p-6 text-center space-y-4 flex flex-col justify-center items-center aspect-[4/3] border-dashed relative">
                          <PenTool className="w-12 h-12 text-text-tertiary" />
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-text-primary">Curiva Examination Concept Drawing</p>
                            <p className="text-[11px] text-text-secondary max-w-xs mx-auto">
                              Trace the draft outlines of <em>"{topicData.visualPlans[0].title}"</em> with proper anatomical colors. Always label from one side using ruled lines.
                            </p>
                          </div>
                          <span className="text-[9px] font-mono font-bold bg-bg-primary text-text-tertiary px-3 py-1 rounded-full border border-border border-double">
                            Recommended Exam Schematic
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-text-tertiary">
                        <PenTool className="w-8 h-8 mx-auto mb-2 text-text-tertiary" />
                        <p className="text-xs">Visual blueprint detail is in progress for this minor topic.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Curiva One-Minute Revision Panel */}
              <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <RefreshCw className="w-4.5 h-4.5 text-blue-500 animate-spin-slow" />
                  Curiva One-Minute Rapid Revision Panel
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {topicData.oneMinuteRevision.map((rev, idx) => (
                    <div key={idx} className="p-3 bg-bg-secondary rounded-xl text-xs text-text-secondary border border-border/40 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{rev}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Previous / Next Navigation */}
          <ContentNavigator 
            prev={currentIndex > 0 ? { to: `/anatomy/topic/${ALL_TOPICS[currentIndex - 1].id}`, title: ALL_TOPICS[currentIndex - 1].title, label: 'Previous Topic' } : null}
            next={currentIndex < ALL_TOPICS.length - 1 ? { to: `/anatomy/topic/${ALL_TOPICS[currentIndex + 1].id}`, title: ALL_TOPICS[currentIndex + 1].title, label: 'Next Topic' } : null}
          />
        </div>

        {/* Sticky Desktop Right Column: Table of Contents & Study Desk */}
        <div className="lg:col-span-3 sticky top-6 space-y-6 hidden lg:block">
          
          {/* Table of Contents card */}
          <div className="bg-white dark:bg-zinc-950 border border-border rounded-[2rem] p-5 shadow-soft space-y-4">
            <div className="space-y-0.5">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                <List className="w-4.5 h-4.5" />
                Topic Navigation
              </h4>
              <p className="text-[10px] text-text-tertiary">Quick jump to any section of the module</p>
            </div>

            <hr className="border-border/40" />

            <div className="flex flex-col gap-1">
              {tabs.map((t) => {
                const IconComp = t.icon;
                const isSelected = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-primary/5 text-primary" 
                        : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isSelected ? "text-primary" : "text-text-tertiary"}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Clinical Correlation Card */}
          {(() => {
            const clinicalInfo = CLINICAL_CONCEPTS_MAP[topicId || ''] || {
              title: `${topicData.title} Clinical Connection`,
              concepts: [
                {
                  name: "Applied Anatomy",
                  quickFact: "Core clinical and functional relationships of this anatomical structure.",
                  significance: topicData.appliedAnatomy
                }
              ]
            };
            return (
              <div className="bg-gradient-to-br from-red-500/10 to-rose-600/10 border border-red-500/20 rounded-[2rem] p-5 shadow-soft space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-red-500/20 text-red-600 rounded-lg">
                    <HeartPulse className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-red-600">
                      Clinical Highlights
                    </h4>
                    <p className="text-[10px] text-text-tertiary">Real-world medical applications</p>
                  </div>
                </div>

                <hr className="border-red-500/10" />

                <div className="space-y-4">
                  {clinicalInfo.concepts.slice(0, 2).map((concept, idx) => (
                    <div key={idx} className="space-y-1">
                      <h5 className="text-xs font-black text-text-primary flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {concept.name}
                      </h5>
                      <p className="text-[10.5px] text-text-secondary leading-relaxed bg-white/50 dark:bg-zinc-900/50 p-2.5 rounded-xl border border-border/40">
                        <strong className="text-red-600/95 dark:text-red-400 font-bold block mb-0.5">Quick Fact:</strong>
                        {concept.quickFact}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsClinicalDrawerOpen(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-[11px] font-black hover:from-red-600 hover:to-rose-700 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <HeartPulse className="w-3.5 h-3.5" />
                  Explore Full Clinical Case
                </button>
              </div>
            );
          })()}

          {/* Quick study guidance */}
          <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-[2rem] p-5 border border-slate-800 shadow-xl space-y-3">
            <h5 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Syllabus Alignment
            </h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              This module covers the <strong>{topicData.bodyRegion}</strong> subtopics requested in the latest National Commission for Homoeopathy (NCH) CBDC curriculum guide.
            </p>
          </div>
        </div>

      </div>

      {/* Continue Learning Footer Banner */}
      <section className="bg-white dark:bg-zinc-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-wider text-text-tertiary block">Continuous Learning Flow</span>
          <h4 className="text-base font-bold text-text-primary">
            Ready to explore the next competency?
          </h4>
          <p className="text-xs text-text-secondary">
            Keep up your study momentum by moving to <strong>{nextTopic?.title}</strong>.
          </p>
        </div>

        <Link
          to={`/anatomy/${nextTopic?.id}`}
          onClick={() => {
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-xs font-bold hover:bg-primary-strong shadow-md hover:shadow-lg transition-all self-stretch md:self-auto text-center justify-center cursor-pointer"
        >
          Study: {nextTopic?.title.split(' (')[0]}
          <ChevronRight className="w-4.5 h-4.5" />
        </Link>
      </section>

      {/* Floating Clinical Correlation Trigger Button */}
      <button
        onClick={() => setIsClinicalDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4.5 py-3 bg-gradient-to-r from-red-500 via-rose-500 to-rose-600 text-white rounded-full font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-xs border border-white/15 group"
      >
        <HeartPulse className="w-5 h-5 animate-pulse group-hover:scale-110 transition-transform" />
        <span className="relative font-display tracking-wide uppercase font-black text-[10px]">
          Clinical Pearls
          <span className="absolute -top-1 -right-2 w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-rose-500 animate-ping" />
        </span>
      </button>

      {/* Clinical Correlation Slide-over Drawer */}
      <AnimatePresence>
        {isClinicalDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsClinicalDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 cursor-pointer"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white dark:bg-zinc-950 shadow-2xl z-50 flex flex-col border-l border-border overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-border bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-red-500 text-white rounded-xl shadow-md">
                    <HeartPulse className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-red-600">
                      Applied Clinical Correlation
                    </h3>
                    <p className="text-[10px] text-text-tertiary">Real-world medical applications & diagnosis</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsClinicalDrawerOpen(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-text-secondary transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                
                {/* Intro banner */}
                <div className="p-4.5 bg-red-500/5 border border-red-500/10 rounded-2xl space-y-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-500/10 px-2.5 py-0.5 rounded-full">
                    <ShieldAlert className="w-3.5 h-3.5" /> High-Yield Clinical Focus
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Connecting direct gross anatomical structures to hospital diagnoses, surgical risks, and typical university exam Clinical Case studies.
                  </p>
                </div>

                {/* Concepts list */}
                {(() => {
                  const clinicalInfo = CLINICAL_CONCEPTS_MAP[topicId || ''] || {
                    title: `${topicData.title} Clinical Correlation`,
                    concepts: [
                      {
                        name: "Applied Clinical Anatomy",
                        quickFact: "Clinical relation and pathology of the structure.",
                        significance: topicData.appliedAnatomy
                      },
                      {
                        name: "Extended Case Significance",
                        quickFact: "Extended diagnostic significance.",
                        significance: topicData.clinicalCorrelation
                      }
                    ]
                  };

                  return (
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary border-b border-border/60 pb-2">
                        {clinicalInfo.title}
                      </h4>

                      {clinicalInfo.concepts.map((concept, idx) => (
                        <div 
                          key={idx} 
                          className="p-5 bg-bg-secondary hover:bg-bg-primary border border-border/80 hover:border-red-500/30 rounded-2.5xl transition-all space-y-3 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-text-primary">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                              {concept.name}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider font-bold bg-red-500/10 text-red-600 px-2.5 py-0.5 rounded-full">
                              Concept 0{idx + 1}
                            </span>
                          </div>

                          <div className="space-y-2.5 pt-1">
                            <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-border/40 space-y-1.5">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-red-600/90 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> Quick Fact Check:
                              </span>
                              <p className="text-xs text-text-secondary font-medium leading-relaxed">
                                {concept.quickFact}
                              </p>
                            </div>

                            <div className="p-3.5 bg-red-500/[0.02] dark:bg-rose-500/[0.01] rounded-xl border border-red-500/10 space-y-1.5">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-text-secondary flex items-center gap-1">
                                <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Clinical Significance & Presentation:
                              </span>
                              <p className="text-xs text-text-secondary leading-relaxed">
                                {concept.significance}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Homoeopathic Clinical Note Section */}
                <div className="p-5 bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] border border-indigo-500/10 rounded-2.5xl space-y-3">
                  <h5 className="text-xs font-black uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Homoeopathic Therapeutics Connection
                  </h5>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    In homoeopathic case-taking, nerve-related trauma (e.g., radial or ulnar nerve injury, Saturday night palsy) calls for deep-acting nervous system remedies such as <strong>Hypericum Perforatum</strong> (the 'arnica of nerves'), while bone fractures (like clavicular fracture) call for bone union acceleration remedies like <strong>Symphytum Officinale</strong> and <strong>Calcarea Phosphorica</strong>.
                  </p>
                  <p className="text-[10px] text-indigo-500/90 italic font-semibold">
                    *Always cross-refer with the Clinical Homoeopathy and Materia Medica modules.
                  </p>
                </div>

              </div>

              {/* Footer */}
              <div className="p-5 border-t border-border bg-bg-secondary flex justify-end">
                <button
                  onClick={() => setIsClinicalDrawerOpen(false)}
                  className="px-5 py-2.5 bg-text-primary text-bg-primary hover:bg-text-secondary rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Dismiss Clinical Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
