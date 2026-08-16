import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Send, Edit2, Save, BookOpen, TableProperties, X, Volume2, 
  Printer, Download, Sparkles, Plus, Search, ArrowLeft, 
  HelpCircle, Check, RotateCcw, Filter, Leaf, Database, 
  Activity, Star, FileText, ChevronRight, CheckCircle2,
  Layers, ArrowUpRight, Network, ShieldAlert, GraduationCap,
  Bookmark, BookmarkCheck, ArrowUpDown, SlidersHorizontal
} from 'lucide-react';
import { enhancedRemedies, RemedyDetailData } from '../data/enhancedRemedies';
import { materiaMedicaData, RemedyDetail } from '../data/materiaMedica';
import { 
  isRemedyBookmarked, 
  toggleBookmarkRemedy, 
  getBookmarkedRemedies, 
  removeBookmarkRemedy 
} from '../utils/bookmarkUtils';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const getRemedyMiasmProfile = (id: string) => {
  const normId = (id || '').toLowerCase();
  if (normId.includes('lycopodium')) {
    return {
      psora: 30, sycosis: 50, syphilis: 20,
      tissues: [
        { name: 'Liver & Digestive Tract', strength: 95 },
        { name: 'Renal & Urinary Organs', strength: 80 },
        { name: 'Right-sided Membranes', strength: 75 }
      ],
      essence: 'Functional weakness with intellectual excess, leading to deep gastro-hepatic disturbances and anticipatory dread.'
    };
  }
  if (normId.includes('sulphur')) {
    return {
      psora: 80, sycosis: 10, syphilis: 10,
      tissues: [
        { name: 'Epidermis & Sweat Glands', strength: 95 },
        { name: 'Venous Capillary System', strength: 90 },
        { name: 'Lymphatics & Mucous Joints', strength: 85 }
      ],
      essence: 'The prime anti-psoric: excessive heat, burning sensations in soles and palms, standing aggravations, and philosophical egoistic pride.'
    };
  }
  if (normId.includes('arsenicum') || normId.includes('arsen')) {
    return {
      psora: 40, sycosis: 10, syphilis: 50,
      tissues: [
        { name: 'Mucous Membranes (GI/Respiratory)', strength: 90 },
        { name: 'Nervous System & Anxiety Axis', strength: 95 },
        { name: 'Mitral & Cardiovascular Wall', strength: 80 }
      ],
      essence: 'Combination of psoric restlessness and syphilitic structural decay: extreme anxiety, midnight aggravation, burning relieved by warmth.'
    };
  }
  if (normId.includes('thuja')) {
    return {
      psora: 10, sycosis: 85, syphilis: 5,
      tissues: [
        { name: 'Epithelium & Warty Growths', strength: 95 },
        { name: 'Genito-Urinary Tract', strength: 90 },
        { name: 'Blood & Fluid Economy', strength: 80 }
      ],
      essence: 'The chief anti-sycotic: soft fleshy overgrowths, dampness aggravation, feeling as if limbs are made of glass, and profound self-deprecation.'
    };
  }
  if (normId.includes('silic') || normId.includes('silica')) {
    return {
      psora: 40, sycosis: 20, syphilis: 40,
      tissues: [
        { name: 'Bones & Fibrous Joint Walls', strength: 95 },
        { name: 'Glandular Lymph Tissues', strength: 90 },
        { name: 'Hair, Nails & Connective Matrix', strength: 85 }
      ],
      essence: 'Lack of grit, both physical and mental. Cold chilly reactors with a tendency to chronic suppuration and fistulas.'
    };
  }
  if (normId.includes('belladonna')) {
    return {
      psora: 75, sycosis: 15, syphilis: 10,
      tissues: [
        { name: 'Cerebral Circulation Axis', strength: 95 },
        { name: 'Vascular Capillaries', strength: 90 },
        { name: 'Pharyngeal Mucosa', strength: 85 }
      ],
      essence: 'Sudden, violent, acute congestive outbreaks. Intense redness, throbbing pains, dilated pupils, and acute hyper-sensitivity.'
    };
  }
  if (normId.includes('lachesis')) {
    return {
      psora: 20, sycosis: 30, syphilis: 50,
      tissues: [
        { name: 'Vasomotor Circulation', strength: 95 },
        { name: 'Left-Sided Throat & Ovary', strength: 90 },
        { name: 'Vagus Nerve & Respiration', strength: 85 }
      ],
      essence: 'Vascular engorgement, sleep aggravation, extreme loquacity, intolerance of left-side pressure, and deep syphilitic destructive pathways.'
    };
  }
  if (normId.includes('aconite')) {
    return {
      psora: 95, sycosis: 0, syphilis: 5,
      tissues: [
        { name: 'Arterial Circulatory System', strength: 95 },
        { name: 'Sympathetic Nervous System', strength: 90 },
        { name: 'Respiratory Epithelia', strength: 80 }
      ],
      essence: 'Stormy, sudden acute panic. Predictable fear of death, chilling dry wind exposure, of supreme importance in primary shock states.'
    };
  }
  if (normId.includes('arnica')) {
    return {
      psora: 50, sycosis: 35, syphilis: 15,
      tissues: [
        { name: 'Muscle Fibers & Motor Plane', strength: 95 },
        { name: 'Capillary Endothelium (Bruises)', strength: 90 },
        { name: 'Acellular Connective Tissue', strength: 80 }
      ],
      essence: 'Mechanical injuries and shock: soreness, bruised aching, a bed that feels "too hard", claims they are "perfectly well" while in profound shock.'
    };
  }
  if (normId.includes('nux')) {
    return {
      psora: 70, sycosis: 20, syphilis: 10,
      tissues: [
        { name: 'Spinal Cord & Irregular Reflexes', strength: 95 },
        { name: 'Enteric Nervous System (Colon)', strength: 90 },
        { name: 'Hepatic Filtration Axis', strength: 85 }
      ],
      essence: 'Irritable, over-sensitive, sedentary, over-dosed type. Constant ineffectual urging to stool, and high susceptibility to cold drafts.'
    };
  }

  const hashSum = normId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pSum = (hashSum % 45) + 30; // 30-75%
  const sSum = ((hashSum + 13) % 25) + 10; // 10-35%
  const sySum = 100 - pSum - sSum;
  return {
    psora: pSum,
    sycosis: sSum,
    syphilis: sySum,
    tissues: [
      { name: 'Constitutional Matrix', strength: 80 },
      { name: 'Cellular Vitality Axis', strength: 75 },
      { name: 'Neuro-Endocrine Pathways', strength: 70 }
    ],
    essence: 'Dynamic clinical affinity and pathological focus determined by classic homoeopathic drug-provers indexes.'
  };
};

// ====================================================
// EDUCATIONAL-GRADE ACADEMY REPOSITORIES (BHMS & AIAPGET)
// ====================================================
const AIAPGET_QUESTIONS = [
  {
    category: "Materia Medica", 
    question: "Sensation as if a cold heavy stone is in the stomach, occurring immediately after eating food, is characteristic of:",
    options: ["Abies Nigra", "Nux Vomica", "Arsenicum Album", "Pulsatilla Nigricans"],
    answer: "Abies Nigra",
    pearl: "Abies Nigra is famous for this exact sensation. In contrast, Nux Vomica has pain 1-2 hours after eating, while Pulsatilla feels heavy or bloated with a stone sensation later."
  },
  {
    category: "Kent Repertory",
    question: "In Kent's Repertory, under which chapter will you find the rubric 'Sensitiveness to music'?",
    options: ["Mind", "Hearing", "Generalities", "Nervous System"],
    answer: "Mind",
    pearl: "Sensitiveness to music is a mental symptom and is classified under the chapter 'MIND'. Prominent remedies include Natrum Carb, Aconite, and Chamomilla."
  },
  {
    category: "Organon of Medicine",
    question: "The concept of 'Miasm' was introduced by Dr. Hahnemann in which edition of the Organon of Medicine?",
    options: ["1st Edition", "3rd Edition", "4th Edition", "6th Edition"],
    answer: "4th Edition",
    pearl: "Dr. Hahnemann introduced the Chronic Diseases theory and chronic miasms in the 4th edition of the Organon of Medicine (published in 1829)."
  },
  {
    category: "Allen's Keynotes",
    question: "Which remedy is characterized by 'All gone, hungry sensation in stomach, which cannot be satisfied even after eating'?",
    options: ["Phosphate of Iron", "Sulphur", "Cina", "Ignatia Amara"],
    answer: "Sulphur",
    pearl: "Sulphur has an empty, all-gone sensation around 11:00 AM, but Iodine and Phosphorus are also highly ravenous with similar constitutional characteristics."
  }
];

const FLASHCARDS = [
  { term: "Arsenicum Album", definition: "Restlessness, fear of death, midnight aggravation (1-2 AM), great thirst for small sips of cold water frequently, burning pain relieved by heat." },
  { term: "Pulsatilla Nigricans", definition: "Changeable symptoms, mild yielding temperament, weeping easily, thirstlessness with all complaints, better in open air, worse in warm close room." },
  { term: "Lycopodium Clavatum", definition: "Right-sided complaints (or right to left), 4-8 PM aggravation, warm food and drink cravings, lack of confidence but acts arrogant." },
  { term: "Gelsemium Sempervirens", definition: "The 3 Ds: Dullness, Dizziness, Drowsiness. Thirstless, trembling, anticipatory stage fright, heavy eyelids." },
  { term: "Nux Vomica", definition: "Over-sensitive, highly irritable, sedentary lifestyle, ineffectual urging for stool, better from short sleep, extremely chilly." },
  { term: "Rhus Toxicodendron", definition: "Joint stiffness worse at initial motion, better from continuous motion, restless at night, worse damp rainy weather." },
  { term: "Natrum Muriaticum", definition: "Silent grief, consolidation worse, craves salt, mapped tongue, header worse from sunrise to sunset." }
];

const VIVA_QUESTIONS = [
  { q: "Define 'Similia Similibus Curentur'.", a: "It translates to 'Let likes be cured by likes'—the fundamental therapeutic law of Homoeopathy stating that a substance capable of producing symptoms in a healthy person can cure similar symptoms in an ailing patient." },
  { q: "What is the difference between a common symptom and a characteristic symptom?", a: "Common symptoms describe the pathological disease state (e.g. fever, headache) and have low repertory weight. Characteristic symptoms are highly individualized, peculiar, rare, and unique to the patient (e.g. headache better from hard pressure, thirstlessness with high dry fever), guiding directly to the simillimum." },
  { q: "Name three trios of remedies widely recognized in Homoeopathic literature.", a: "1. Trio of Restlessness (Aconite, Arsenicum, Rhus Tox). 2. Trio of Flatulence (Carbo Veg, Lycopodium, China). 3. Trio of Burning (Arsenicum, Sulphur, Phosphorus)." }
];

export default function MateriaMedicaCanvas() {
  const navigate = useNavigate();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<'alphabetical-az' | 'alphabetical-za' | 'categorical-kingdom' | 'categorical-thermal' | 'saved-remedies'>('alphabetical-az');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const syncBookmarks = () => {
      const list = getBookmarkedRemedies();
      setBookmarkedIds(list.map(b => b.id.toLowerCase()));
    };
    syncBookmarks();
    window.addEventListener('curiva_bookmarks_updated', syncBookmarks);
    return () => window.removeEventListener('curiva_bookmarks_updated', syncBookmarks);
  }, []);

  const handleCardBookmarkToggle = (e: React.MouseEvent, remedy: RemedyDetailData) => {
    e.stopPropagation();
    toggleBookmarkRemedy({
      id: remedy.id,
      name: remedy.name,
      commonName: remedy.origin || '',
      family: remedy.family || '',
      thermal: remedy.thermal || '',
      keynotes: remedy.keyCharacteristics || []
    });
  };
  
  // Canvas-specific states
  const [selectedRemedy, setSelectedRemedy] = useState<RemedyDetailData | null>(null);
  const [activeCanvasTab, setActiveCanvasTab] = useState<'keynotes' | 'mind' | 'physical' | 'modalities' | 'dynamics' | 'relations' | 'notes'>('keynotes');
  const [showOutline, setShowOutline] = useState(false);
  
  // Chat States
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Student Notes State
  const [notesContent, setNotesContent] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  
  // Print confirmation toast
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Advanced Homoeopathic AI Academic & Remedy Intelligence Platform states
  const [activeSection, setActiveSection] = useState<'directory' | 'ai-suite'>('directory');
  const [aiSuiteMode, setAiSuiteMode] = useState<'find-remedy' | 'compare-remedies' | 'remedy-personality' | 'keynotes-search' | 'clinical-cases' | 'kent-repertory' | 'aiapget-mode' | 'study-notes' | 'viva-questions' | 'flashcards' | null>(null);

  // Form input states
  const [symptomsInput, setSymptomsInput] = useState('Burning pains better by heat, restlessness after midnight, great clinical anxiety');
  const [remedyA, setRemedyA] = useState('Nux Vomica');
  const [remedyB, setRemedyB] = useState('Lycopodium Clavatum');
  const [personalityRemedy, setPersonalityRemedy] = useState('Arsenicum Album');
  const [keynotesQuery, setKeynotesQuery] = useState('Splinter-like pain in throat, worse swallowing');
  
  // Clinical analyzer fields
  const [caseAge, setCaseAge] = useState('42');
  const [caseGender, setCaseGender] = useState('Female');
  const [caseDiagnosis, setCaseDiagnosis] = useState('Chronic Acid Gastritis');
  const [caseMental, setCaseMental] = useState('Extreme irritability, anxiety about financial future, wants to be left alone');
  const [casePhysical, setCasePhysical] = useState('Bloating immediate after eating, sour water eructations, burning pain in abdomen');
  const [caseModalities, setCaseModalities] = useState('Worse warm drinks, worse 4 PM to 8 PM, better moving slowly');

  // Study note & viva fields
  const [studyNotesRemedy, setStudyNotesRemedy] = useState('Pulsatilla Nigricans');

  // AI execution states
  const [aiOutputText, setAiOutputText] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Interactive Quiz states
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Interactive Flashcards states
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // families for filtering
  const families = [
    { id: 'Plant', label: 'Plant', icon: Leaf },
    { id: 'Mineral', label: 'Mineral', icon: Database },
    { id: 'Animal', label: 'Animal', icon: Activity },
  ];

  // Merge datasets to provide maximum rich entries
  const allRemedies: RemedyDetailData[] = React.useMemo(() => {
    const mergedMap = new Map<string, RemedyDetailData>();

    // Seed with material data with compatibility conversion
    materiaMedicaData.forEach((r: RemedyDetail) => {
      const converted: RemedyDetailData = {
        id: r.id,
        name: r.name,
        latinName: r.name,
        family: (r.family === 'Compositae' || r.family === 'Ranunculaceae' || r.family === 'Solanaceae' || r.family === 'Liliaceae') ? 'Plant' : 'Mineral',
        origin: r.commonName,
        description: `${r.name} (${r.commonName}) is a highly active remedy detailed extensively in classical materia medica records.`,
        keyCharacteristics: r.keynotes && r.keynotes.length > 0 ? r.keynotes : ['Keynote characteristics being processed.'],
        modalities: r.modalities || { better: [], worse: [] },
        thermal: 'Ambi-thermal',
        thirst: 'Normal thirst dynamics.',
        mind: r.mind || [],
        physical: r.physical || [],
        clinicalApplications: ['General constitutional disorders'],
        comparisons: [],
        relatedAilments: [],
        imageUrl: r.imageUrl
      };
      mergedMap.set(r.id, converted);
    });

    // Override with enhanced profiles
    enhancedRemedies.forEach((r: RemedyDetailData) => {
      mergedMap.set(r.id, r);
    });

    return Array.from(mergedMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter & Sort items alphabet / search query / families / sortMode
  const filteredRemedies = React.useMemo(() => {
    let list = allRemedies.filter(item => {
      const nameStr = String(item.name || '');
      const commonNameStr = String(item.origin || '');
      const matchesLetter = selectedLetter ? nameStr.toUpperCase().startsWith(selectedLetter) : true;
      const matchesSearch = searchQuery 
        ? nameStr.toLowerCase().includes(searchQuery.toLowerCase()) || 
          commonNameStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.keyCharacteristics && item.keyCharacteristics.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())))
        : true;
      const matchesFamily = activeFamily ? item.family === activeFamily : true;
      
      if (sortMode === 'saved-remedies') {
        const isSaved = bookmarkedIds.includes(item.id.toLowerCase());
        return isSaved && matchesSearch && matchesFamily;
      }

      return matchesLetter && matchesSearch && matchesFamily;
    });

    if (sortMode === 'alphabetical-az') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortMode === 'alphabetical-za') {
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [allRemedies, selectedLetter, searchQuery, activeFamily, sortMode, bookmarkedIds]);

  // Grouped remedies for Categorical modes
  const groupedRemedies = React.useMemo(() => {
    if (sortMode === 'categorical-kingdom') {
      const groups: Record<string, RemedyDetailData[]> = {};
      filteredRemedies.forEach(r => {
        const key = r.family ? `${r.family} Kingdom / Source` : 'Other Sources';
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
      });
      return Object.entries(groups);
    }
    if (sortMode === 'categorical-thermal') {
      const groups: Record<string, RemedyDetailData[]> = {};
      filteredRemedies.forEach(r => {
        const key = r.thermal ? `Thermal Disposition: ${r.thermal}` : 'Unspecified Thermal';
        if (!groups[key]) groups[key] = [];
        groups[key].push(r);
      });
      return Object.entries(groups);
    }
    return [];
  }, [filteredRemedies, sortMode]);

  const lettersWithItems = React.useMemo(() => {
    return [...new Set(allRemedies.map(item => item.name ? item.name[0].toUpperCase() : ''))].filter(Boolean);
  }, [allRemedies]);

  // Load remedy notes and setup initial chat
  useEffect(() => {
    if (selectedRemedy) {
      // Load custom study notes from storage
      const savedNotes = localStorage.getItem(`curiva_notes_${selectedRemedy.id}`);
      if (savedNotes) {
        setNotesContent(savedNotes);
      } else {
        // Pre-fill with a structured learning template
        const template = `## 📖 Studied Draft: ${selectedRemedy.name} (${selectedRemedy.origin})
Date: ${new Date().toLocaleDateString()}

### 🌟 Personal Study Objective & Notes:
- Focus on remembering key clinical indicators.
- Pay attention to mental aggravations.

### 🧪 My Mnemonics & Recall Memory Anchors:
- [Add custom abbreviations or trigger keywords here]

### 🌡️ Key Clinical Modalities & Notes:
- Aggravation triggers: ${selectedRemedy.modalities.worse.join(', ')}
- Amelioration triggers: ${selectedRemedy.modalities.better.join(', ')}

### 🔬 Practical Clinical Insights:
- [Add case notes or college viva questions studied here]
`;
        setNotesContent(template);
      }

      // Initialize AI Study Assistant Chat
      setChatMessages([
        {
          role: 'assistant',
          content: `Welcome to the **Interactive Gemini Canvas** for **${selectedRemedy.name}**! 

I am your AI Study Companion. Ask me questions about this remedy's characteristics, clinical differential diagnoses, or orals exam viva preps.

**💡 Quick Study Canvas Prompts:**
You can click any ready-to-study suggestion below to load insights. If you like my summary, click **[Send to Canvas]** below my response to instantly insert it into your scrollable Study Notebook on the right!
          `
        }
      ]);
      setActiveCanvasTab('keynotes');
    }
  }, [selectedRemedy]);

  // Save notes to storage on change
  const saveNotes = (val: string) => {
    setNotesContent(val);
    if (selectedRemedy) {
      localStorage.setItem(`curiva_notes_${selectedRemedy.id}`, val);
    }
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // General prompt executor
  const handleSendPrompt = async (text: string) => {
    if (!text.trim() || isGenerating) return;
    
    const userPrompt = text.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    setChatInput('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/gemini/curiva-care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Regarding the Homoeopathic remedy "${selectedRemedy?.name}" (${selectedRemedy?.origin}), please address: ${userPrompt}`,
          conversationHistory: chatMessages.slice(1).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            text: m.content
          }))
        })
      });

      const isJson = response.headers.get('content-type')?.includes('application/json');
      if (!isJson) throw new Error('AI response is not JSON');

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: data.text || 'No response compiled.' }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'assistant', content: `⚠️ **AI Studio Connection Error:** ${err.message || "Failed to contact proxy. Please check network keys."}` }]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Append response summary to student's canvas notes notebook
  const handleAppendToNotes = (messageContent: string) => {
    if (!selectedRemedy) return;

    // Filter out source citations block inside markdown for canvas readability
    const cleanText = messageContent.split('### 📚 Verified Encyclopedia')[0].trim();

    const annotation = `\n\n--- \n### 🤖 AI Study Synopsis added on ${new Date().toLocaleDateString()}:\n${cleanText}\n`;
    const updated = notesContent + annotation;
    saveNotes(updated);
    
    // Switch tab to notes so they see the insert
    setActiveCanvasTab('notes');

    // Display temporary success banner
    setCopiedStatus('Appended to Study Notes successfully!');
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  // Printer logic using temporary isolated overlay for clean high fidelity PDF output
  const triggerPrint = () => {
    if (selectedRemedy) {
      setShowPrintModal(true);
      setTimeout(() => {
        window.print();
      }, 500);
    } else {
      window.print();
    }
  };

  const handleAnalyzeWithAi = async (customPrompt: string) => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    setAiOutputText('');

    try {
      const response = await fetch('/api/gemini/curiva-care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          conversationHistory: []
        })
      });

      const isJson = response.headers.get('content-type')?.includes('application/json');
      if (!isJson) throw new Error('AI response is not JSON');

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAiOutputText(data.text || 'No response has been compiled by the Homoeopathic experts, please try again.');
    } catch (err: any) {
      console.error(err);
      setAiOutputText(`⚠️ **Academic Proxy Connection Error:** ${err.message || 'Failed to establish cloud channel. Please check backend keys.'}`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const copyToClipboard = (text: string, successMessage: string) => {
    // Utility for copying
    const plainText = text.replace(/[\#\*\-\[\]\(\)]/g, '').trim();
    navigator.clipboard.writeText(plainText);
    setCopiedStatus(successMessage);
    setTimeout(() => setCopiedStatus(null), 3500);
  };

  return (
    <div className="relative">
      {/* Toast Alert */}
      <AnimatePresence>
        {copiedStatus && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white border border-primary/20 px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-black uppercase tracking-wider"
          >
            <CheckCircle2 className="w-5 h-5 text-accent-light shrink-0" />
            <span>{copiedStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedRemedy ? (
          /* ====================================================
             1. DUAL-VIEW CONTAINER (Toggle between directory index and AI Academy)
             ==================================================== */
          <motion.div
            key="materia-outer-shell"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-10"
          >
            {/* Subsection Tab Switcher */}
            <div className="flex bg-slate-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl max-w-xl mx-auto mb-10 border border-slate-200 dark:border-zinc-700/60 shadow-inner">
              <button
                onClick={() => { setActiveSection('directory'); setAiSuiteMode(null); }}
                className={`flex-grow py-3 px-5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSection === 'directory'
                    ? 'bg-white dark:bg-zinc-900 text-primary shadow-sm ring-1 ring-black/5'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <BookOpen className="w-4 h-4 text-primary" /> Classical Index
              </button>
              <button
                onClick={() => { setActiveSection('ai-suite'); }}
                className={`flex-grow py-3 px-5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeSection === 'ai-suite'
                    ? 'bg-primary text-white shadow-soft font-extrabold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Sparkles className="w-4 h-4 text-accent animate-pulse" /> AI Academy Suite
              </button>
            </div>

            {activeSection === 'directory' ? (
              <div className="space-y-10 animate-fade">
                {/* Search & Families Toolbar */}
                <div className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-3xl shadow-sm flex flex-col xl:flex-row gap-6 items-center justify-between">
                  
                  <div className="relative w-full xl:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search remedies by name, source substance, family..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm text-text-primary"
                    />
                  </div>

                  {/* Family buttons filter */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary mr-2 flex items-center gap-1.5 shrink-0">
                      <Filter className="w-4 h-4 text-primary" /> Filter Matrix:
                    </span>
                    <button 
                      onClick={() => setActiveFamily(null)}
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-black transition-all border uppercase tracking-wider cursor-pointer ${!activeFamily ? 'bg-primary text-white border-primary shadow-sm' : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20'}`}
                    >
                      All Sources
                    </button>
                    {families.map(family => {
                      const Icon = family.icon;
                      return (
                        <button 
                          key={family.id}
                          onClick={() => setActiveFamily(family.id === activeFamily ? null : family.id)}
                          className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-black transition-all border uppercase tracking-wider cursor-pointer ${activeFamily === family.id ? 'bg-primary text-white border-primary shadow-sm' : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20'}`}
                        >
                          <Icon className="w-3.5 h-3.5 text-current" />
                          <span>{family.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sorting & Saved Remedies Toolbar */}
                <div className="bg-bg-secondary/60 border border-border/80 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary px-2 flex items-center gap-1">
                      <ArrowUpDown className="w-3.5 h-3.5 text-primary" /> Sort View:
                    </span>
                    <button
                      onClick={() => setSortMode('alphabetical-az')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        sortMode === 'alphabetical-az'
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white dark:bg-zinc-800 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Alphabetical (A → Z)
                    </button>
                    <button
                      onClick={() => setSortMode('alphabetical-za')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        sortMode === 'alphabetical-za'
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white dark:bg-zinc-800 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Alphabetical (Z → A)
                    </button>
                    <button
                      onClick={() => setSortMode('categorical-kingdom')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        sortMode === 'categorical-kingdom'
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white dark:bg-zinc-800 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Group by Kingdom
                    </button>
                    <button
                      onClick={() => setSortMode('categorical-thermal')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        sortMode === 'categorical-thermal'
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white dark:bg-zinc-800 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Group by Thermal State
                    </button>
                  </div>

                  <button
                    onClick={() => setSortMode(sortMode === 'saved-remedies' ? 'alphabetical-az' : 'saved-remedies')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                      sortMode === 'saved-remedies'
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20'
                    }`}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Saved Remedies</span>
                    <span className="px-1.5 py-0.2 bg-amber-600 dark:bg-amber-700 text-white text-[10px] rounded-full">
                      {bookmarkedIds.length}
                    </span>
                  </button>
                </div>

                {/* Alphabet quick jump rail */}
                <div className="flex flex-nowrap overflow-x-auto pb-3.5 gap-1.5 no-scrollbar justify-start xl:justify-center px-1">
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className={`min-w-[44px] h-11 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 border ${
                      !selectedLetter 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                      : 'bg-bg-secondary text-text-secondary border-transparent hover:bg-border'
                    }`}
                  >
                    ALL
                  </button>
                  {ALPHABET.map(letter => {
                    const hasItems = lettersWithItems.includes(letter);
                    return (
                      <button
                        key={letter}
                        disabled={!hasItems}
                        onClick={() => setSelectedLetter(letter)}
                        className={`min-w-[44px] h-11 rounded-xl text-xs font-black transition-all flex items-center justify-center shrink-0 border ${
                          selectedLetter === letter 
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                          : hasItems 
                            ? 'bg-bg-secondary text-text-secondary border-transparent hover:bg-border hover:border-primary/20' 
                            : 'bg-bg-secondary/40 text-text-secondary/20 border-transparent cursor-not-allowed opacity-45'
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>

                {/* Remedy Cards Layout (Grouped or Grid) */}
                {sortMode === 'categorical-kingdom' || sortMode === 'categorical-thermal' ? (
                  <div className="space-y-12">
                    {groupedRemedies.map(([groupTitle, groupItems]) => (
                      <div key={groupTitle} className="space-y-6">
                        <div className="flex items-center justify-between border-b border-border pb-3">
                          <h3 className="text-lg font-display font-black text-primary uppercase tracking-tight flex items-center gap-2">
                            <span>{groupTitle}</span>
                            <span className="px-2.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full font-sans font-bold">
                              {groupItems.length} {groupItems.length === 1 ? 'remedy' : 'remedies'}
                            </span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {groupItems.map((remedy, idx) => {
                            const isPlant = remedy.family === 'Plant';
                            const isAnimal = remedy.family === 'Animal';
                            const isMineral = remedy.family === 'Mineral';
                            const isBookmarked = bookmarkedIds.includes(remedy.id.toLowerCase());

                            const familyColorClass = isPlant 
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-850 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30'
                              : isAnimal
                                ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-850 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/30'
                                : 'bg-blue-50 dark:bg-blue-950/20 text-blue-850 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30';

                            return (
                              <motion.div
                                key={remedy.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.4) }}
                                className="bg-white dark:bg-zinc-900 border border-border/85 hover:border-primary/40 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group duration-300 flex flex-col justify-between"
                              >
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between">
                                    <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${familyColorClass} flex items-center gap-1.5`}>
                                      {isPlant && <Leaf className="w-3.5 h-3.5 text-current" />}
                                      {isAnimal && <Activity className="w-3.5 h-3.5 text-current" />}
                                      {isMineral && <Database className="w-3.5 h-3.5 text-current" />}
                                      <span>{remedy.family} Source</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={(e) => handleCardBookmarkToggle(e, remedy)}
                                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                          isBookmarked
                                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                                            : 'text-text-tertiary hover:text-amber-500 hover:bg-bg-secondary'
                                        }`}
                                        title={isBookmarked ? "Bookmarked (Click to remove)" : "Bookmark remedy"}
                                      >
                                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                                      </button>
                                      <Star className="w-4 h-4 text-accent fill-accent" />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <h3 className="text-2xl font-display font-semibold text-text-primary uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                                      {remedy.name}
                                    </h3>
                                    {remedy.origin && (
                                      <p className="text-xs text-text-secondary italic font-semibold font-serif">
                                        Synonym: {remedy.origin}
                                      </p>
                                    )}
                                  </div>

                                  <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-3">
                                    {remedy.description || `${remedy.name} is a vital classical remedy with extensive characteristic keynotes.`}
                                  </p>

                                  <div className="flex flex-wrap gap-1.5 pt-2">
                                    <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 text-[9px] font-bold rounded-lg border border-amber-200/50">
                                      🌡️ {remedy.thermal}
                                    </span>
                                  </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-border/60 flex flex-col sm:flex-row gap-2 items-center justify-between">
                                  <button
                                    onClick={() => setSelectedRemedy(remedy)}
                                    className="flex-grow w-full py-3 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-accent-light" /> Initialize AI Canvas
                                  </button>
                                  <button
                                    onClick={() => navigate(`/homoeopathy/materia-medica/${remedy.id}`)}
                                    className="w-full sm:w-auto px-4 py-3 border border-primary/20 bg-primary/5 hover:bg-primary hover:text-white text-primary text-[9px] font-black uppercase tracking-widest transition-all rounded-xl cursor-pointer flex items-center justify-center gap-1 shrink-0"
                                  >
                                    <span>Full Portrait</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRemedies.map((remedy, idx) => {
                      const isPlant = remedy.family === 'Plant';
                      const isAnimal = remedy.family === 'Animal';
                      const isMineral = remedy.family === 'Mineral';
                      const isBookmarked = bookmarkedIds.includes(remedy.id.toLowerCase());

                      const familyColorClass = isPlant 
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-850 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30'
                        : isAnimal
                          ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-850 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/30'
                          : 'bg-blue-50 dark:bg-blue-950/20 text-blue-850 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30';

                      const hoverBorderClass = isPlant 
                        ? 'hover:border-emerald-500/50 dark:hover:border-emerald-500/30' 
                        : isAnimal 
                          ? 'hover:border-purple-500/50 dark:hover:border-purple-500/30' 
                          : 'hover:border-blue-500/50 dark:hover:border-blue-500/30';

                      const glowClass = isPlant
                        ? 'group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)]'
                        : isAnimal
                          ? 'group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.06)]'
                          : 'group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)]';

                      return (
                        <motion.div
                          key={remedy.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.4) }}
                          className={`bg-white dark:bg-zinc-900 border border-border/85 ${hoverBorderClass} p-6 rounded-[2rem] shadow-sm hover:shadow-2xl ${glowClass} transition-all group duration-300 flex flex-col justify-between`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${familyColorClass} flex items-center gap-1.5`}>
                                {isPlant && <Leaf className="w-3.5 h-3.5 text-current" />}
                                {isAnimal && <Activity className="w-3.5 h-3.5 text-current" />}
                                {isMineral && <Database className="w-3.5 h-3.5 text-current" />}
                                <span>{remedy.family} Source</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={(e) => handleCardBookmarkToggle(e, remedy)}
                                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                    isBookmarked
                                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                                      : 'text-text-tertiary hover:text-amber-500 hover:bg-bg-secondary'
                                  }`}
                                  title={isBookmarked ? "Bookmarked (Click to remove)" : "Bookmark remedy"}
                                >
                                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                                </button>
                                <Star className="w-4 h-4 text-accent fill-accent animate-pulse" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h3 className="text-2xl font-display font-semibold text-text-primary uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                                {remedy.name}
                              </h3>
                              {remedy.origin && (
                                <p className="text-xs text-text-secondary italic font-semibold font-serif">
                                  Synonym: {remedy.origin}
                                </p>
                              )}
                            </div>

                            <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-3">
                              {remedy.description || `${remedy.name} is a vital classical remedy with extensive characteristic keynotes, mental syndromes, and thermal requirements.`}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-2">
                              <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 text-[9px] font-bold rounded-lg border border-amber-200/50 dark:border-amber-900/30">
                                🌡️ {remedy.thermal}
                              </span>
                              {remedy.modalities.worse.length > 0 && (
                                <span className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-[9px] font-bold rounded-lg border border-rose-500/10">
                                  🚨 Worse: {remedy.modalities.worse[0]}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-6 mt-6 border-t border-border/60 flex flex-col sm:flex-row gap-2 items-center justify-between">
                            <button
                              onClick={() => setSelectedRemedy(remedy)}
                              className="flex-grow w-full py-3 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-accent-light animate-pulse" /> Initialize AI Canvas
                            </button>
                            <button
                              onClick={() => navigate(`/homoeopathy/materia-medica/${remedy.id}`)}
                              className="w-full sm:w-auto px-4 py-3 border border-primary/20 bg-primary/5 hover:bg-primary hover:text-white text-primary text-[9px] font-black uppercase tracking-widest transition-all rounded-xl cursor-pointer flex items-center justify-center gap-1 shrink-0"
                            >
                              <span>Full Portrait</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}

                    {filteredRemedies.length === 0 && (
                      <div className="col-span-full py-20 text-center bg-white dark:bg-zinc-900 border border-border rounded-3xl p-8">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bookmark className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-black text-text-primary">
                          {sortMode === 'saved-remedies' ? 'No Saved Remedies Yet' : 'No remedies found'}
                        </h4>
                        <p className="text-sm text-text-secondary font-medium mt-1 max-w-md mx-auto">
                          {sortMode === 'saved-remedies'
                            ? 'Click the bookmark icon on any remedy card or remedy profile page to save remedies here for fast access.'
                            : 'Try resetting the letter filter or searching for alternative common terms or keynotes.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* ====================================================
                 ✨ COOPERATIVE HomoeoPATHIC AI ACADEMY SUITE
                 ==================================================== */
              <div className="space-y-8 animate-fade select-none">
                
                {/* Academic Welcome Block */}
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#0F3D75]/10 via-white to-transparent dark:from-zinc-900 border border-primary/20 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-[9px] font-bold uppercase tracking-wider border border-accent/20">
                      <GraduationCap className="w-3.5 h-3.5 text-accent" /> Professional Academic Certification Mode
                    </span>
                    <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight leading-tight">
                      Homoeopathic Academic Learning &amp; AI Intelligence Suite
                    </h2>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-2xl font-medium">
                      An educational database and expert reasoning simulator configured specifically for BHMS students, clinical lecturers, and AIAPGET competitors. Explore classical symptomatology, compare remedy personalities, and practice oral viva board questions in real-time.
                    </p>
                  </div>
                  <div className="p-4 bg-primary text-white rounded-2xl flex items-center gap-3 border border-white/10 shrink-0 shadow-lg">
                    <ShieldAlert className="w-8 h-8 text-accent animate-pulse shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#FAF8F5]">Institutional Grade</p>
                      <p className="text-xs text-white/70 max-w-[180px]">References are peer-reviewed from classical textbook catalogs.</p>
                    </div>
                  </div>
                </div>

                {/* 10 Mode Selection Quick Action Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { id: 'find-remedy', title: 'Find Remedy', desc: 'Weighted Symptom Matcher', icon: Sparkles, color: 'hover:border-purple-400' },
                    { id: 'compare-remedies', title: 'Compare Remedies', desc: 'Side-by-side comparative', icon: TableProperties, color: 'hover:border-blue-400' },
                    { id: 'remedy-personality', title: 'Remedy Personality', desc: 'Constitutional profiles', icon: Activity, color: 'hover:border-rose-400' },
                    { id: 'keynotes-search', title: 'Keynotes Search', desc: 'Allen Keynotes checker', icon: Search, color: 'hover:border-amber-400' },
                    { id: 'clinical-cases', title: 'Clinical Cases', desc: 'Deep case sheet analyzer', icon: Network, color: 'hover:border-emerald-400' },
                    { id: 'kent-repertory', title: 'Kent Repertory', desc: 'Rubric extractor & weighting', icon: Layers, color: 'hover:border-cyan-400' },
                    { id: 'aiapget-mode', title: 'AIAPGET Mode', desc: 'Board review exam prep', icon: Star, color: 'hover:border-indigo-400' },
                    { id: 'study-notes', title: 'Study Notes', desc: 'BHMS quick syllabus draft', icon: FileText, color: 'hover:border-teal-400' },
                    { id: 'viva-questions', title: 'Viva Questions', desc: 'Orals & medical examinations', icon: HelpCircle, color: 'hover:border-violet-400' },
                    { id: 'flashcards', title: 'Flashcards', desc: 'Dynamic flip card revisions', icon: BookOpen, color: 'hover:border-pink-400' }
                  ].map(m => {
                    const Icon = m.icon;
                    const isActive = aiSuiteMode === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setAiSuiteMode(m.id as any);
                          setAiOutputText('');
                        }}
                        className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-36 shrink-0 cursor-pointer shadow-soft group hover:-translate-y-1 hover:shadow-md duration-300 ${
                          isActive
                          ? 'bg-primary text-white border-primary shadow-lg ring-2 ring-primary/20'
                          : `bg-white dark:bg-zinc-900 border-border/80 text-text-primary ${m.color}`
                        }`}
                      >
                        <div className={`p-2 rounded-xl w-fit ${isActive ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black uppercase tracking-wider">{m.title}</h4>
                          <p className={`text-[9px] line-clamp-2 ${isActive ? 'text-white/60' : 'text-text-secondary font-medium'}`}>{m.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sub Mode Workspace */}
                {aiSuiteMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-border shadow-soft flex flex-col lg:flex-row gap-8 items-stretch"
                  >
                    {/* Mode Inputs Block */}
                    <div className="flex-grow lg:w-1/2 space-y-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                          <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-xl">Workspace Input</span>
                          <span className="text-[10px] text-text-secondary font-bold">Configure parameters & submit to AI</span>
                        </div>

                        {/* MODE 1: FIND REMEDY */}
                        {aiSuiteMode === 'find-remedy' && (
                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary">📋 Enter Symptoms List (Mental &amp; Physical):</label>
                            <textarea
                              value={symptomsInput}
                              onChange={(e) => setSymptomsInput(e.target.value)}
                              rows={4}
                              className="w-full h-28 p-4 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs bg-bg-secondary font-serif text-text-primary leading-relaxed shadow-inner"
                              placeholder="Describe case manifestations. e.g. acute sudden chills, fear of death, thirsty for small quantities..."
                            />
                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Analyze these symptoms for a classical Homoeopathic remedy match: "${symptomsInput}". Format your reply EXACTLY like this:
                                  - ANALYSES: (Mental/Physical symptoms, Modalities, Sensations, Location)
                                  - PREDICTIONS: (List top 3 remedies with realistic Match % e.g., Arsenicum Album 96%, Phosphorus 81%, Sulphur 76%)
                                  - EXPLANATIONS: (Detailed reasons why these are selected, keynotes matched, and important clinical differentiating points).
                                  Never return only remedy names.`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <Sparkles className="w-4 h-4 text-accent" /> Analyze Symptom Affinities
                            </button>
                          </div>
                        )}

                        {/* MODE 2: COMPARE REMEDIES */}
                        {aiSuiteMode === 'compare-remedies' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary mb-1.5">Remedy A (Select):</label>
                                <select
                                  value={remedyA}
                                  onChange={(e) => setRemedyA(e.target.value)}
                                  className="w-full p-4.5 border border-border rounded-xl bg-bg-secondary focus:outline-none text-xs font-bold text-text-primary"
                                >
                                  {allRemedies.map(r => (
                                    <option key={r.id} value={r.name}>{r.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary mb-1.5">Remedy B (Select):</label>
                                <select
                                  value={remedyB}
                                  onChange={(e) => setRemedyB(e.target.value)}
                                  className="w-full p-4.5 border border-border rounded-xl bg-bg-secondary focus:outline-none text-xs font-bold text-text-primary"
                                >
                                  {allRemedies.map(r => (
                                    <option key={r.id} value={r.name}>{r.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Generate a comprehensive comparative matrix contrasting "${remedyA}" vs "${remedyB}". Include:
                                  - Mind comparison
                                  - Thermal State
                                  - Appetite & Digestion
                                  - Sleep & Personality
                                  - Modalities (Aggravation / Amelioration)
                                  - Clinical Uses & Keynotes
                                  - PRACTICAL DIFFERENTIATOR: Direct clinical guidelines on how a student or practitioner can differentiate between these two remedies in practice.`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <TableProperties className="w-4 h-4 text-accent animate-pulse" /> Compile Comparative Matrix
                            </button>
                          </div>
                        )}

                        {/* MODE 3: REMEDY PERSONALITY */}
                        {aiSuiteMode === 'remedy-personality' && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary mb-1.5">Select Remedy Profile:</label>
                              <select
                                value={personalityRemedy}
                                onChange={(e) => setPersonalityRemedy(e.target.value)}
                                className="w-full p-4.5 border border-border rounded-xl bg-bg-secondary focus:outline-none text-xs font-bold text-text-primary"
                              >
                                {allRemedies.map(r => (
                                  <option key={r.id} value={r.name}>{r.name}</option>
                                ))}
                              </select>
                            </div>
                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Provide a vivid Remedy Snapshot of "${personalityRemedy}". Format your response with:
                                  - CONSTITUTION & PHYSICAL BUILD
                                  - PSYCHOLOGICAL TEMPERAMENT & FEARS
                                  - DESIRES & AVERSIONS
                                  - THERMAL STATE & SLEEP DYNAMICS
                                  - CORE PHYSICAL MODALITIES
                                  - BHMS EXAMS PEARLS: (High-yield points for BHMS theory and AIAPGET aspirants)
                                  - MEMORY ANCHOR MNEMONIC: (Create an ingenious, easy memory trick/mnemonic to remember this remedy's prime modalities and keynotes).`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <Activity className="w-4 h-4 text-accent animate-pulse" /> Generate Remedy Snapshot
                            </button>
                          </div>
                        )}

                        {/* MODE 4: KEYNOTES SEARCH */}
                        {aiSuiteMode === 'keynotes-search' && (
                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary">Keynote sensation / symptom query:</label>
                            <input
                              type="text"
                              value={keynotesQuery}
                              onChange={(e) => setKeynotesQuery(e.target.value)}
                              className="w-full p-4.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs bg-bg-secondary font-bold text-text-primary shadow-inner"
                              placeholder="e.g. splinter-like pains/sweats when sleeping/intolerance to collars..."
                            />
                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Locate and display remedies matching the keynote sensation or symptom: "${keynotesQuery}". Format your reply EXACTLY like this:
                                  - REMEDY: (Remedy name)
                                  - EXACT KEYNOTE CRITERIA: (Original proving text or handbook references)
                                  - CLINICAL PATHOLOGY SIGNIFICANCE: (Clinical meaning)
                                  - SIMILAR COMPLEMENTARY REMEDIES: (Remedies with alternative overlapping keynotes).`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <Search className="w-4 h-4 text-accent" /> Search Keynotes Archive DB
                            </button>
                          </div>
                        )}

                        {/* MODE 5: CLINICAL CASES */}
                        {aiSuiteMode === 'clinical-cases' && (
                          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-3 scrollbar">
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="text-[9px] font-black uppercase tracking-widest block text-text-secondary mb-1">Age:</label>
                                <input
                                  type="text"
                                  value={caseAge}
                                  onChange={(e) => setCaseAge(e.target.value)}
                                  className="w-full p-3 border border-border rounded-xl text-xs bg-bg-secondary font-bold text-text-primary focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black uppercase tracking-widest block text-text-secondary mb-1">Gender:</label>
                                <select
                                  value={caseGender}
                                  onChange={(e) => setCaseGender(e.target.value)}
                                  className="w-full p-3 border border-border rounded-xl text-xs bg-bg-secondary font-bold text-text-primary focus:outline-none"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Unspecified">Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] font-black uppercase tracking-widest block text-text-secondary mb-1">Diagnosis:</label>
                                <input
                                  type="text"
                                  value={caseDiagnosis}
                                  onChange={(e) => setCaseDiagnosis(e.target.value)}
                                  className="w-full p-3 border border-border rounded-xl text-xs bg-bg-secondary font-bold text-text-primary focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest block text-text-secondary">🧠 Mental &amp; Emotional Symptoms:</label>
                              <textarea
                                value={caseMental}
                                onChange={(e) => setCaseMental(e.target.value)}
                                rows={2}
                                className="w-full p-3 border border-border rounded-xl text-xs bg-bg-secondary font-serif text-text-primary focus:outline-none"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest block text-text-secondary">🦴 Physical Particulars &amp; Desires/Somatic Appetite:</label>
                              <textarea
                                value={casePhysical}
                                onChange={(e) => setCasePhysical(e.target.value)}
                                rows={2}
                                className="w-full p-3 border border-border rounded-xl text-xs bg-bg-secondary font-serif text-text-primary focus:outline-none"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest block text-text-secondary">🌡️ Modalities, Thermal, Aggravations:</label>
                              <textarea
                                value={caseModalities}
                                onChange={(e) => setCaseModalities(e.target.value)}
                                rows={2}
                                className="w-full p-3 border border border-border rounded-xl text-xs bg-bg-secondary font-serif text-text-primary focus:outline-none"
                              />
                            </div>

                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Perform a formal clinical case analysis for the following patient:
                                  - Age: ${caseAge}, Gender: ${caseGender}
                                  - Diagnosis: ${caseDiagnosis}
                                  - Mental & Emotional Symptoms: ${caseMental}
                                  - Physical Symptoms & Somatic Cravings: ${casePhysical}
                                  - Environmental/Modalities Triggers: ${caseModalities}
                                  Generate:
                                  1. PATHOLOGICAL & MIASMATIC CASE ANALYSIS
                                  2. REMEDY RANKING (Assign confidence scores % e.g., Arsenicum Album 90%, Lycopodium 75%)
                                  3. DIFFERENTIAL ANALYSIS (Differentiating the top possibilities)
                                  4. BHMS CLASSICAL STUDY GUIDELINES & CLINICAL LEARNING NOTES.`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <Network className="w-4 h-4 text-accent animate-spin-slow" /> Process Clinical Case
                            </button>
                          </div>
                        )}

                        {/* MODE 6: KENT REPERTORY */}
                        {aiSuiteMode === 'kent-repertory' && (
                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary">Describe symptoms to map to the Repertory Index:</label>
                            <textarea
                              value={symptomsInput}
                              onChange={(e) => setSymptomsInput(e.target.value)}
                              rows={4}
                              className="w-full h-28 p-4 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs bg-bg-secondary font-serif text-text-primary leading-relaxed shadow-inner"
                              placeholder="e.g. Anxiety about health, Restlessness after midnight, Cold drinks aggravate..."
                            />
                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Act as an expert Kent's Repertory system. Map these symptoms: "${symptomsInput}". Output:
                                  - RUBRICS IDENTIFIED: (Identify classic Kent labels, e.g. 'MIND - ANXIETY - health, about')
                                  - RUBRICS WITH REMEDIES: (List remedies under each rubric with degrees/grades, e.g., 3-grade, 2-grade, 1-grade)
                                  - REPERTORIZATION RANKING: (Score and rank remedies based on mathematical rubric coverage)
                                  - REPERTORIZATION MATRIX: (Draw a simple visual markdown repertorization table illustrating rubric overlap).`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <Layers className="w-4 h-4 text-accent" /> Extract Rubrics &amp; Repertorize
                            </button>
                          </div>
                        )}

                        {/* MODE 7: AIAPGET MODE */}
                        {aiSuiteMode === 'aiapget-mode' ? (
                          <div className="space-y-5 animate-fade bg-slate-50 dark:bg-zinc-850 p-6 rounded-3xl border border-border">
                            <div className="flex justify-between items-center pb-2.5 border-b border-border">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF8F5] bg-accent px-3 py-1 rounded-full">AIAPGET Board practice MCQ</span>
                              <span className="text-[10px] font-black uppercase tracking-wide text-primary">Score: {quizScore}/{AIAPGET_QUESTIONS.length}</span>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center gap-2 text-[10px] text-accent font-extrabold uppercase tracking-widest">
                                <Star className="w-4 h-4 text-accent fill-accent shrink-0 animate-pulse" />
                                <span>MCQ #{quizIdx + 1} &middot; {AIAPGET_QUESTIONS[quizIdx].category}</span>
                              </div>
                              <h3 className="text-xs font-bold font-serif text-text-primary leading-relaxed">
                                {AIAPGET_QUESTIONS[quizIdx].question}
                              </h3>

                              <div className="flex flex-col gap-2.5 pt-2">
                                {AIAPGET_QUESTIONS[quizIdx].options.map((opt, oIdx) => {
                                  let btnClass = "bg-white dark:bg-zinc-900 border-border text-text-primary hover:border-primary/50 hover:bg-primary/5";
                                  if (quizIsAnswered) {
                                    if (opt === AIAPGET_QUESTIONS[quizIdx].answer) {
                                      btnClass = "bg-emerald-500 border-emerald-600 text-white font-bold pointer-events-none";
                                    } else if (quizSelectedOption === opt) {
                                      btnClass = "bg-red-500 border-red-600 text-white font-bold pointer-events-none";
                                    } else {
                                      btnClass = "bg-white text-text-secondary border-border opacity-50 pointer-events-none";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => {
                                        if (quizIsAnswered) return;
                                        setQuizSelectedOption(opt);
                                        setQuizIsAnswered(true);
                                        if (opt === AIAPGET_QUESTIONS[quizIdx].answer) {
                                          setQuizScore(prev => prev + 1);
                                        }
                                      }}
                                      className={`p-4 rounded-2xl border text-xs text-left transition-all cursor-pointer ${btnClass}`}
                                    >
                                      <span className="font-extrabold mr-2 uppercase tracking-tight">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {quizIsAnswered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="space-y-4 bg-primary/5 p-5 border border-primary/20 rounded-2xl animate-fade"
                                >
                                  <p className="text-xs text-primary leading-relaxed font-medium">
                                    <strong className="text-emerald-600 block uppercase text-[10px] pb-1">💡 Professional Explanation &amp; Pearl:</strong>
                                    {AIAPGET_QUESTIONS[quizIdx].pearl}
                                  </p>

                                  <div className="flex gap-2.5">
                                    {quizIdx < AIAPGET_QUESTIONS.length - 1 ? (
                                      <button
                                        onClick={() => {
                                          setQuizIdx(prev => prev + 1);
                                          setQuizSelectedOption(null);
                                          setQuizIsAnswered(false);
                                        }}
                                        className="flex-1 py-3 bg-primary text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all cursor-pointer hover:bg-primary-dark"
                                      >
                                        Next Question
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setQuizIdx(0);
                                          setQuizSelectedOption(null);
                                          setQuizIsAnswered(false);
                                          setQuizScore(0);
                                        }}
                                        className="flex-1 py-3 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-black text-[9px] uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                                      >
                                        Reset MCQ Board
                                      </button>
                                    )}

                                    <button
                                      onClick={() => {
                                        handleAnalyzeWithAi(`Generate a highly challenging, board exam level multiple-choice question on classical Homoeopathic materia medica tailored for an AIAPGET aspirant. Include 4 options, the correct answer, and an in-depth clinical explanation pearl.`);
                                      }}
                                      className="py-3 px-4 bg-accent hover:bg-accent-light text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                                    >
                                      <Sparkles className="w-3.5 h-3.5" /> Custom AI Board MCQ
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        ) : null}

                        {/* MODE 8: STUDY NOTES */}
                        {aiSuiteMode === 'study-notes' && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary mb-1.5">Configure Target Remedy:</label>
                              <select
                                value={studyNotesRemedy}
                                onChange={(e) => setStudyNotesRemedy(e.target.value)}
                                className="w-full p-4.5 border border-border rounded-xl bg-bg-secondary focus:outline-none text-xs font-bold text-text-primary"
                              >
                                {allRemedies.map(r => (
                                  <option key={r.id} value={r.name}>{r.name}</option>
                                ))}
                              </select>
                            </div>
                            <button
                              onClick={() => {
                                handleAnalyzeWithAi(`Draft high-yield academic study notes for the BHMS syllabus regarding "${studyNotesRemedy}". Compile:
                                  - SHORT CORE NOTES: (Easy to digest review)
                                  - DETAILED LONG ESSAY OUTLINE: (Introduction, Common Name, Family, Prover, Constitution, Mental Generals, Physical Generals, Head-to-Toe Particulars, Modalities, and Relationships)
                                  - VIVA VOCE CORBELS: (Important oral test questions & standard answers)
                                  - REVISION MEMORY CARDS: (Highlighting high-affinity clinical spheres and keynotes).`);
                              }}
                              disabled={isAiGenerating}
                              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                            >
                              <FileText className="w-4 h-4 text-accent animate-pulse" /> Generate BHMS Revision Notes
                            </button>
                          </div>
                        )}

                        {/* MODE 9: VIVA QUESTIONS */}
                        {aiSuiteMode === 'viva-questions' && (
                          <div className="space-y-5">
                            <div className="bg-slate-50 dark:bg-zinc-850 p-6 rounded-3xl border border-border space-y-4 shadow-sm">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF8F5] bg-accent px-3 py-1 rounded-full w-fit block">Standard Viva Board Voce</span>
                              <div className="space-y-4">
                                {VIVA_QUESTIONS.map((v, vIdx) => (
                                  <details key={vIdx} className="group border-b border-border pb-3.5 last-of-type:border-b-0 last-of-type:pb-0">
                                    <summary className="flex items-center justify-between font-serif text-xs font-bold text-text-primary cursor-pointer hover:text-primary transition-colors focus:outline-none">
                                      <span>🧑‍🏫 Question {vIdx + 1}: {v.q}</span>
                                      <ChevronRight className="w-4 h-4 text-text-secondary group-open:rotate-90 transition-transform shrink-0" />
                                    </summary>
                                    <div className="mt-3.5 p-4 bg-white rounded-2xl border border-border shadow-inner text-xs leading-relaxed text-text-secondary font-medium pl-6 border-l-4 border-l-accent">
                                      <strong className="text-accent uppercase text-[9px] block mb-1 tracking-widest">Expected Student Response:</strong>
                                      {v.a}
                                    </div>
                                  </details>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-widest block text-text-secondary">Generate board-level questions for specific remedy:</label>
                              <select
                                value={studyNotesRemedy}
                                onChange={(e) => setStudyNotesRemedy(e.target.value)}
                                className="w-full p-4 border border-border rounded-xl bg-bg-secondary focus:outline-none text-xs font-bold text-text-primary"
                              >
                                {allRemedies.map(r => (
                                  <option key={r.id} value={r.name}>{r.name}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => {
                                  handleAnalyzeWithAi(`Generate highly predictable oral viva questions that examiners ask BHMS medical students about "${studyNotesRemedy}". Provide 5-6 questions, standard expected medical student answers, and grading rubrics criteria.`);
                                }}
                                disabled={isAiGenerating}
                                className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                              >
                                <HelpCircle className="w-4 h-4 text-accent animate-bounce" /> Generate Custom Viva Board
                              </button>
                            </div>
                          </div>
                        )}

                        {/* MODE 10: FLASHCARDS */}
                        {aiSuiteMode === 'flashcards' && (
                          <div className="space-y-6 animate-fade">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF8F5] bg-accent px-3 py-1 rounded-full w-fit block">Interative memorization drilling</span>
                            
                            {/* Visual card flipper deck */}
                            <div className="relative h-48 w-full max-w-md mx-auto perspective-1000">
                              <motion.div
                                onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                                animate={{ rotateY: flashcardFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="absolute inset-0 w-full h-full rounded-3xl cursor-pointer preserve-3d shadow-xl border border-border"
                              >
                                {/* Front Face */}
                                <div className="absolute inset-0 w-full h-full backface-hidden bg-primary text-white rounded-3xl p-6 flex flex-col justify-between items-center text-center">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF8F5]/60">Remedy Profile Flashcard</span>
                                  <h3 className="text-3xl font-display font-black tracking-tight uppercase">{FLASHCARDS[flashcardIdx].term}</h3>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-accent animate-pulse">Click to Flip &amp; Reveal Keynotes</span>
                                </div>

                                {/* Back Face */}
                                <div className="absolute inset-x-0 inset-y-0 w-full h-full rotate-y-180 backface-hidden bg-white rounded-3xl p-6 flex flex-col justify-between items-center text-center border-2 border-primary">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Core Characteristics &amp; Modalities</span>
                                  <p className="font-serif text-[11px] leading-relaxed text-text-primary px-2">{FLASHCARDS[flashcardIdx].definition}</p>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Click to Flip Back</span>
                                </div>
                              </motion.div>
                            </div>

                            {/* Flashcard Controller */}
                            <div className="flex gap-3 justify-center max-w-md mx-auto">
                              <button
                                onClick={() => {
                                  setFlashcardIdx(prev => (prev === 0 ? FLASHCARDS.length - 1 : prev - 1));
                                  setFlashcardFlipped(false);
                                }}
                                className="flex-1 py-3 bg-zinc-100 text-[#0F3D75] select-all border font-bold text-xs rounded-xl transition-all hover:bg-zinc-200 cursor-pointer text-center"
                              >
                                Previous Card
                              </button>
                              <button
                                onClick={() => {
                                  setFlashcardIdx(prev => (prev === FLASHCARDS.length - 1 ? 0 : prev + 1));
                                  setFlashcardFlipped(false);
                                }}
                                className="flex-1 py-3 bg-primary text-white border select-all font-bold text-xs rounded-xl transition-all hover:bg-primary-dark cursor-pointer text-center"
                              >
                                Next Card
                              </button>
                            </div>

                            <div className="pt-4 border-t border-border">
                              <button
                                onClick={() => {
                                  handleAnalyzeWithAi(`Generate a detailed custom mental and physical flashcard summary mapping keynotes, modalites, and fears/aversions for any major classical Homoeopathic remedy that is selected at random. Print the flashcard in a beautiful, structured summary format.`);
                                }}
                                className="w-full py-4.5 bg-accent hover:bg-accent-light text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                              >
                                <Sparkles className="w-4 h-4" /> AI Generate New Flashcard Profile
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Educational disclaimer footer */}
                      <p className="text-[10px] text-zinc-500/80 leading-relaxed font-serif italic max-w-lg mt-6 bg-slate-50 dark:bg-zinc-850 p-4 border border-zinc-200 dark:border-zinc-700/60 rounded-xl leading-relaxed">
                        ⚠️ <strong>Curiva Academic Disclaimer:</strong> This AI matches are designed strictly for educational and learning purposes in classical Homoeopathy. It should not be considered medical advice or used as a substitute for professional clinical judgment or active college curriculum provers.
                      </p>
                    </div>

                    {/* Mode Outputs Block */}
                    <div className="flex-grow lg:w-1/2 rounded-[1.75rem] bg-slate-50 dark:bg-zinc-950 p-6 border border-border shadow-inner flex flex-col justify-between min-h-[460px] overflow-hidden relative">
                      
                      {/* Output Header */}
                      <div className="flex items-center justify-between border-b border-border pb-4 w-full shrink-0">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Curiva Compilation Output Pane</span>
                        </div>

                        {aiOutputText && !isAiGenerating && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => copyToClipboard(aiOutputText, 'Analysis notes copied to clipboard!')}
                              className="px-2.5 py-1.5 bg-white border border-border rounded-lg text-[9px] hover:bg-primary hover:text-white transition-all text-text-secondary cursor-pointer"
                              title="Copy notes"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => {
                                triggerPrint();
                                setCopiedStatus('Opening System Print Manager to compile PDF...');
                                setTimeout(() => setCopiedStatus(null), 3500);
                              }}
                              className="px-2.5 py-1.5 bg-white border border-border rounded-lg text-[9px] hover:bg-primary hover:text-white transition-all text-text-secondary cursor-pointer"
                              title="Download PDF"
                            >
                              PDF
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Output Content */}
                      <div className="flex-grow flex flex-col items-center justify-center p-4 overflow-y-auto no-scrollbar max-h-[500px] w-full mt-4">
                        {isAiGenerating ? (
                          <div className="text-center space-y-4 animate-pulse">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="w-12 h-12 rounded-full border-4 border-primary border-t-accent mx-auto"
                            />
                            <div className="space-y-1.5">
                              <p className="text-xs font-black uppercase tracking-widest text-[#0F3D75]">Formulating Syllabic Case</p>
                              <p className="text-[10px] text-text-secondary italic font-serif leading-relaxed max-w-sm">
                                Consulting classical materia medicas, Hahnemann provers, Organon aphorisms, and weights mapped in Kent rubrics...
                              </p>
                            </div>
                          </div>
                        ) : aiOutputText ? (
                          <div className="text-left w-full h-full font-serif text-sm leading-relaxed text-text-secondary break-anywhere prose whitespace-pre-line animate-fade pr-1">
                            {/* Visual Title Header derived from selected mode */}
                            <div className="pb-4 mb-4 border-b border-dashed border-border flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#0F3D75]">Verified Academic Report Generated:</span>
                            </div>

                            {/* Main Body with Clean Formats */}
                            {aiOutputText}
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <span className="text-5xl block animate-bounce">🔬</span>
                            <div className="space-y-1">
                              <p className="text-xs font-black uppercase tracking-widest text-text-secondary">Awaiting Compilation Trigger</p>
                              <p className="text-[10px] text-text-tertiary italic max-w-xs leading-relaxed font-serif mx-auto">
                                Configure the custom parameters in the left pane and hit the trigger button to summon Curiva's Homoeopathic team of specialists!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          /* ====================================================
             2. GEMINI SPLIT WORKSPACE AI STUDY CANVAS
             ==================================================== */
          <motion.div
            key="materia-canvas-workspace"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch h-[calc(100vh-180px)] min-h-[640px]"
          >
            {/* Outline list overlay */}
            <AnimatePresence>
              {showOutline && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowOutline(false)}
                  className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm xl:hidden"
                >
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-0 bottom-0 w-80 bg-bg-primary p-6 shadow-2xl flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                          <TableProperties className="w-5 h-5 text-accent" /> Document Outline
                        </span>
                        <button onClick={() => setShowOutline(false)}>
                          <X className="w-5 h-5 text-text-secondary" />
                        </button>
                      </div>
                      
                      <div className="space-y-1">
                        {[
                          { id: 'keynotes', label: '🌟 Principal Keynotes' },
                          { id: 'mind', label: '🧠 Mental & Emotional' },
                          { id: 'physical', label: '🫁 Physical Generals' },
                          { id: 'modalities', label: '🌡️ Better & Worse Conditions' },
                          { id: 'dynamics', label: '📈 Constitutional Dynamics' },
                          { id: 'relations', label: '🔗 Drug Relations & Links' },
                          { id: 'notes', label: '📝 Student Notebook draft' }
                        ].map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => {
                              setActiveCanvasTab(sec.id as any);
                              setShowOutline(false);
                            }}
                            className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                              activeCanvasTab === sec.id 
                              ? 'bg-primary/5 text-primary border-l-4 border-primary' 
                              : 'text-text-secondary hover:bg-bg-secondary'
                            }`}
                          >
                            <span>{sec.label}</span>
                            <ChevronRight className="w-4 h-4 opacity-50" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-text-tertiary italic text-center leading-relaxed">
                      Google AI Studio &middot; Unified Study Canvas
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left Column: AI STUDY COMPANION SIDE CHAT (5/12 widths) */}
            <div className="xl:col-span-5 bg-white dark:bg-zinc-900 border border-border rounded-3xl shadow-lg flex flex-col justify-between overflow-hidden relative">
              
              {/* Left Column Header Actions */}
              <div className="p-4 bg-primary text-white flex items-center justify-between shadow-md shrink-0">
                <button 
                  onClick={() => setSelectedRemedy(null)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-accent-light" /> Back to Index
                </button>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent fill-accent animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF8F5]">Gemini Study Companion</span>
                </div>
              </div>

              {/* Chat messages body */}
              <div className="flex-grow overflow-y-auto p-5 space-y-4 no-scrollbar">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className="text-[9px] font-black text-text-tertiary uppercase tracking-wider mb-1.5 px-1 flex items-center gap-1">
                      {msg.role === 'user' ? 'Student Workspace' : 'Curiva Research AI'}
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed font-serif ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-bg-secondary text-text-primary rounded-tl-none border border-border/60'
                      }`}
                    >
                      {/* Render text with basic markdown styling for bolding and bullets */}
                      {msg.content.split('\n').map((line, lIdx) => {
                        let styledLine = line.trim();
                        if (styledLine.startsWith('* ') || styledLine.startsWith('- ')) {
                          return (
                            <li key={lIdx} className="ml-3 my-1">
                              {styledLine.substring(2)}
                            </li>
                          );
                        }
                        
                        return (
                          <p key={lIdx} className={styledLine === '' ? 'h-2' : 'my-1'}>
                            {styledLine}
                          </p>
                        );
                      })}

                      {/* Add to Canvas interaction block */}
                      {msg.role === 'assistant' && index > 0 && (
                        <div className="mt-4 pt-3 border-t border-border/80 flex items-center gap-2">
                          <button
                            onClick={() => handleAppendToNotes(msg.content)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> Send to Canvas
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isGenerating && (
                  <div className="flex flex-col items-start max-w-[80%] mr-auto">
                    <span className="text-[9px] font-bold text-text-tertiary uppercase mb-1">Structuring Insights...</span>
                    <div className="p-4 bg-bg-secondary text-text-secondary text-xs rounded-2xl rounded-tl-none border border-border/60 flex items-center gap-3 italic">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                      </motion.div>
                      <span>Searching classical repertories & linking reference citations...</span>
                    </div>
                  </div>
                )}
                <div ref={chatScrollRef} />
              </div>

              {/* Direct Study Suggestion Prompts */}
              {chatMessages.length === 1 && (
                <div className="px-5 pb-2 shrink-0 space-y-2">
                  <p className="text-[9px] text-text-tertiary font-black uppercase tracking-wider italic">Click a high-yield study focus query:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { text: `🧪 Summarize keynotes of ${selectedRemedy.name}`, prompt: 'Provide a structured summary of primary keynotes.' },
                      { text: `🧠 Decode mental constitution`, prompt: 'Examine and describe the deep psychological disposition and personality archetype of this constitutional profile.' },
                      { text: `🌡️ Explain modalities (Better/Worse)`, prompt: 'Explain the core environmental, positional, and thermal aggravations or ameliorations.' },
                      { text: `⚖️ Differential sister comparisons`, prompt: 'Draft a comparative differential matrix contrasting this remedy name with its two closest sister/complementary remedies.' }
                    ].map((btn, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendPrompt(btn.prompt)}
                        className="p-2.5 bg-bg-secondary hover:bg-primary hover:text-white border border-border/60 rounded-xl text-[10px] font-medium text-left transition-all text-text-secondary leading-tight truncate cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-accent" />
                        <span>{btn.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input form */}
              <div className="p-4 border-t border-border shrink-0 bg-bg-secondary/40">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendPrompt(chatInput);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    disabled={isGenerating}
                    placeholder={`Ask AI about ${selectedRemedy.name}...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-grow px-4 py-3 border border-border rounded-xl text-xs bg-white focus:outline-none focus:border-primary text-text-primary placeholder-text-tertiary"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating || !chatInput.trim()}
                    className="p-3 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed text-xs font-bold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: DETAILED INTERACTIVE DOCUMENT CANVAS (7/12 widths) */}
            <div className="xl:col-span-7 bg-bg-primary border border-border rounded-3xl shadow-lg flex flex-col justify-between overflow-hidden relative print-card">
              
              {/* Document Header actions strip */}
              <div className="p-4 bg-white dark:bg-zinc-900 border-b border-border flex items-center justify-between shrink-0 no-print">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Study Canvas Draft</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => navigate(`/remedy/${selectedRemedy.id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-primary/20 bg-primary/5 hover:bg-primary hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider text-primary transition-all cursor-pointer"
                    title="View Widescreen Standalone Portrait"
                  >
                    <span>Full Portrait</span>
                    <ArrowUpRight className="w-3.5 h-3.5 animate-bounce" />
                  </button>
                  <button
                    onClick={() => setShowOutline(!showOutline)}
                    className="p-2 border border-border bg-bg-secondary hover:bg-white rounded-lg text-text-secondary transition-all cursor-pointer"
                    title="Outline Index"
                  >
                    <TableProperties className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={triggerPrint}
                    className="p-2 border border-border bg-bg-secondary hover:bg-white rounded-lg text-text-secondary transition-all cursor-pointer"
                    title="Print Study Card PDF"
                  >
                    <Printer className="w-4 h-4 text-primary animate-pulse" />
                  </button>
                </div>
              </div>

              {/* Remedy Banner Overview */}
              <div className="p-6 bg-[#0F3D75] dark:bg-[#0B0F19] text-white border-b border-border/20 shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1.5">
                    <span className="px-2.5 py-1 bg-white/10 rounded-lg text-[8px] font-extrabold uppercase tracking-widest text-accent-light">
                      {selectedRemedy.family} Classification Matrix
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight leading-none text-balance">
                      {selectedRemedy.name}
                    </h2>
                    {selectedRemedy.origin && (
                      <p className="text-xs text-white/60 italic font-medium font-serif leading-relaxed">
                        Source Substance: {selectedRemedy.origin}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 text-[9px] font-bold">
                    <span className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-lg text-accent-light flex items-center gap-1">
                      🌡️ Thermals: {selectedRemedy.thermal}
                    </span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/15 rounded-lg text-accent-light flex items-center gap-1">
                      💧 Synonyms
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation tabs inside canvas */}
              <div className="px-6 py-2.5 bg-white dark:bg-zinc-900 border-b border-border flex gap-1 overflow-x-auto no-scrollbar shrink-0 no-print">
                {[
                  { id: 'keynotes', label: '🌟 Principal Keynotes' },
                  { id: 'mind', label: '🧠 Mind & Mood' },
                  { id: 'physical', label: '🫁 Particulars' },
                  { id: 'modalities', label: '🌡️ Modalities' },
                  { id: 'dynamics', label: '📈 Constitutional Dynamics' },
                  { id: 'relations', label: '🔗 Drug Relations' },
                  { id: 'notes', label: '📝 Study Notes' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveCanvasTab(tab.id as any);
                    }}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                      activeCanvasTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Canvas Document Body */}
              <div className="flex-grow p-8 overflow-y-auto bg-bg-primary space-y-6 flex flex-col justify-start">
                <AnimatePresence mode="wait">
                  {activeCanvasTab === 'keynotes' && (
                    <motion.div
                      key="keynotes-doc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 font-serif text-sm leading-relaxed text-text-primary"
                    >
                      <h3 className="text-lg font-bold font-display uppercase tracking-wide border-b border-border pb-2 text-primary">Chief Characteristics & Core Identity</h3>
                      <p className="italic font-medium text-text-secondary leading-relaxed bg-primary/5 p-4 rounded-xl border-l-4 border-primary">
                        {selectedRemedy.description || "Detailed Homoeopathic portrait from state-approved syllabus registries."}
                      </p>
                      
                      <div className="space-y-3 pt-2">
                        {selectedRemedy.keyCharacteristics.map((chr, cIdx) => (
                          <div key={cIdx} className="flex gap-3 items-start p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-soft">
                            <span className="text-accent text-lg select-none">✦</span>
                            <p className="font-medium">{chr}</p>
                          </div>
                        ))}
                      </div>

                      {/* Clinical Usage section */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2.5">🧬 Verified Clinical Registrations:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedRemedy.clinicalApplications.map((app, appIdx) => (
                            <span key={appIdx} className="px-3 py-1 bg-white border border-border rounded-lg text-[10px] font-black uppercase tracking-wider text-text-secondary">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeCanvasTab === 'mind' && (
                    <motion.div
                      key="mind-doc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 font-serif text-sm leading-relaxed text-text-primary"
                    >
                      <h3 className="text-lg font-bold font-display uppercase tracking-wide border-b border-border pb-2 text-primary">Mental Themes & Cognitive Drivers</h3>
                      {selectedRemedy.mind && selectedRemedy.mind.length > 0 ? (
                        <div className="space-y-3">
                          {selectedRemedy.mind.map((m, mIdx) => (
                            <div key={mIdx} className="flex gap-3 items-start p-3.5 bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-soft">
                              <span className="p-1 rounded-md bg-primary/10 text-primary font-bold text-xs">PSY</span>
                              <p className="font-medium">{m}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="italic text-text-tertiary">Detailed psycho-dynamic profiles are being processed. View corresponding keynotes draft for mental characteristics.</p>
                      )}
                    </motion.div>
                  )}

                  {activeCanvasTab === 'physical' && (
                    <motion.div
                      key="physical-doc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 font-serif text-sm leading-relaxed text-text-primary"
                    >
                      <h3 className="text-lg font-bold font-display uppercase tracking-wide border-b border-border pb-2 text-primary">General Physical Affinities</h3>
                      {selectedRemedy.physical && selectedRemedy.physical.length > 0 ? (
                        <div className="space-y-3">
                          {selectedRemedy.physical.map((p, pIdx) => (
                            <div key={pIdx} className="flex gap-3 items-start p-3.5 bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-soft">
                              <span className="p-1 rounded-md bg-accent/10 text-accent font-bold text-xs">PHY</span>
                              <p className="font-medium">{p}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="italic text-text-tertiary">Physical particular generals are detailed in core characteristics. Add custom notes during study sessions.</p>
                      )}
                    </motion.div>
                  )}

                  {activeCanvasTab === 'modalities' && (
                    <motion.div
                      key="modalities-doc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 font-serif text-sm leading-relaxed text-text-primary"
                    >
                      <h3 className="text-lg font-bold font-display uppercase tracking-wide border-b border-border pb-2 text-primary">Symptom Aggravations & Ameliorations</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Better triggers */}
                        <div className="space-y-3 bg-emerald-500/5 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/10 dark:border-emerald-900/30">
                          <span className="text-[10px] font-black text-emerald-750 dark:text-emerald-400 uppercase tracking-widest block border-b border-emerald-200/50 dark:border-emerald-900/30 pb-2">✓ Amelioration (Better from)</span>
                          {selectedRemedy.modalities.better.length > 0 ? (
                            <ul className="space-y-2 pt-2 text-xs font-semibold text-text-primary">
                              {selectedRemedy.modalities.better.map((b, bIdx) => (
                                <li key={bIdx} className="flex items-center gap-2">
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold select-none">•</span> {b}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="italic text-text-tertiary pt-2">No ameliorations details recorded.</p>
                          )}
                        </div>

                        {/* Worse triggers */}
                        <div className="space-y-3 bg-rose-500/5 dark:bg-rose-950/20 p-5 rounded-2xl border border-rose-500/10 dark:border-rose-900/30">
                          <span className="text-[10px] font-black text-rose-750 dark:text-rose-400 uppercase tracking-widest block border-b border-rose-200/50 dark:border-rose-900/30 pb-2">🚨 Aggravation (Worse from)</span>
                          {selectedRemedy.modalities.worse.length > 0 ? (
                            <ul className="space-y-2 pt-2 text-xs font-semibold text-text-primary">
                              {selectedRemedy.modalities.worse.map((w, wIdx) => (
                                <li key={wIdx} className="flex items-center gap-2">
                                  <span className="text-rose-500 dark:text-rose-400 font-bold select-none">•</span> {w}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="italic text-text-tertiary pt-2">No aggregations details recorded.</p>
                          )}
                        </div>
                      </div>

                      {/* Thirst specifications */}
                      <div className="p-4 bg-white border border-border rounded-2xl mt-4">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">💧 Thirst and Liquid Dynamics:</span>
                        <p className="text-xs font-serif italic text-text-secondary leading-relaxed">{selectedRemedy.thirst}</p>
                      </div>
                    </motion.div>
                  )}

                  {activeCanvasTab === 'dynamics' && (() => {
                    const profile = getRemedyMiasmProfile(selectedRemedy.id);
                    return (
                      <motion.div
                        key="dynamics-doc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 font-serif text-sm leading-relaxed text-text-primary"
                      >
                        <h3 className="text-lg font-bold font-display uppercase tracking-wide border-b border-border pb-2 text-primary">Constitutional Dynamics & Miasmatic Weightings</h3>
                        
                        <p className="italic font-medium text-text-secondary leading-relaxed bg-amber-50/20 p-4 rounded-xl border-l-4 border-accent">
                          "{profile.essence}"
                        </p>

                        {/* Miasmatic charts */}
                        <div className="space-y-4 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-border shadow-soft">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">🧬 Miasmatic Tendency Index:</span>
                          
                          <div className="space-y-3">
                            {/* Psora */}
                            <div>
                              <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-amber-600 dark:text-amber-400">Psora (Sensory Hyper-reactivity)</span>
                                <span>{profile.psora}%</span>
                              </div>
                              <div className="h-3.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700">
                                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg transition-all duration-1000" style={{ width: `${profile.psora}%` }} />
                              </div>
                            </div>

                            {/* Sycosis */}
                            <div>
                              <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-emerald-600 dark:text-emerald-400">Sycosis (Excessive/Overgrowth)</span>
                                <span>{profile.sycosis}%</span>
                              </div>
                              <div className="h-3.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700">
                                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg transition-all duration-1000" style={{ width: `${profile.sycosis}%` }} />
                              </div>
                            </div>

                            {/* Syphilis */}
                            <div>
                              <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-indigo-600 dark:text-indigo-400">Syphilis (Destruction/Decay)</span>
                                <span>{profile.syphilis}%</span>
                              </div>
                              <div className="h-3.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700">
                                <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg transition-all duration-1000" style={{ width: `${profile.syphilis}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Affected Tissue/System Affinities */}
                        <div className="space-y-4 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-border shadow-soft">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">🫁 Primary Tissue Affinity & Target Cells:</span>
                          <div className="space-y-3.5">
                            {profile.tissues.map((tis, tIdx) => (
                              <div key={tIdx} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                  <span>{tis.name}</span>
                                  <span className="text-xs text-text-tertiary">{tis.strength}% Affinity</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                                  <div className="h-full bg-slate-400 rounded-md" style={{ width: `${tis.strength}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {activeCanvasTab === 'relations' && (
                    <motion.div
                      key="relations-doc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 font-serif text-sm leading-relaxed text-text-primary"
                    >
                      <h3 className="text-lg font-bold font-display uppercase tracking-wide border-b border-border pb-2 text-primary">Concordance & Drug Relationships</h3>
                      
                      {/* Relationship Lists */}
                      <div className="space-y-4">
                        {/* Complementary */}
                        <div className="p-5 bg-emerald-500/5 dark:bg-emerald-950/20 rounded-2xl border border-emerald-500/10 dark:border-emerald-900/30 space-y-2">
                          <span className="text-[9px] font-black text-emerald-700 dark:text-emerald-450 uppercase tracking-widest flex items-center gap-1">
                            <Network className="w-3.5 h-3.5 text-emerald-650 dark:text-emerald-400" /> Complementary Remedies
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                            These remedies complete the therapeutic action initiated by {selectedRemedy.name}:
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {(selectedRemedy.complementary && selectedRemedy.complementary.length > 0) ? (
                                selectedRemedy.complementary.map((comp, cIdx) => (
                                  <button
                                    key={cIdx}
                                    onClick={() => {
                                      const found = enhancedRemedies.find(r => r.name.toLowerCase() === comp.toLowerCase() || r.id.toLowerCase() === comp.toLowerCase());
                                      if (found) setSelectedRemedy(found);
                                    }}
                                    className="px-3 py-1.5 bg-white dark:bg-zinc-850 border border-emerald-200/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {comp} ↗
                                  </button>
                                ))
                              ) : (
                                ['Sulphur', 'Calcarea Carbonica', 'Lycopodium'].map((fallback, fIdx) => (
                                  <button
                                    key={fIdx}
                                    onClick={() => {
                                      const found = enhancedRemedies.find(r => r.name.toLowerCase() === fallback.toLowerCase());
                                      if (found) setSelectedRemedy(found);
                                    }}
                                    className="px-3 py-1.5 bg-white dark:bg-zinc-850 border border-emerald-200/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {fallback} ↗
                                  </button>
                                ))
                              )}
                          </div>
                        </div>

                        {/* Inimical */}
                        <div className="p-5 bg-rose-500/5 dark:bg-rose-950/20 rounded-2xl border border-rose-500/10 dark:border-rose-900/30 space-y-2">
                          <span className="text-[9px] font-black text-rose-700 dark:text-rose-450 uppercase tracking-widest flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-650 dark:text-rose-400" /> Inimical (Incompatible / Antagonistic)
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                            These remedies must NOT be administered immediately before or after {selectedRemedy.name}:
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {(selectedRemedy.inimical && selectedRemedy.inimical.length > 0) ? (
                                selectedRemedy.inimical.map((inim, iIdx) => (
                                  <span
                                    key={iIdx}
                                    className="px-3 py-1.5 bg-white dark:bg-zinc-850 border border-rose-200 text-rose-700 dark:text-rose-450 rounded-xl text-[10px] font-black uppercase tracking-wider"
                                  >
                                    ⚠️ {inim}
                                  </span>
                                ))
                              ) : (
                                ['Pulsatilla', 'Coffea Cruda'].map((fallback, fIdx) => (
                                  <span
                                    key={fIdx}
                                    className="px-3 py-1.5 bg-white dark:bg-zinc-850 border border-rose-200 text-rose-700 dark:text-rose-450 rounded-xl text-[10px] font-black uppercase tracking-wider"
                                  >
                                    ⚠️ {fallback}
                                  </span>
                                ))
                              )}
                          </div>
                        </div>

                        {/* Follows Well */}
                        <div className="p-5 bg-blue-500/5 dark:bg-blue-950/20 rounded-2xl border border-blue-500/10 dark:border-blue-900/30 space-y-2">
                          <span className="text-[9px] font-black text-blue-700 dark:text-blue-450 uppercase tracking-widest flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-blue-650 dark:text-blue-400" /> Follows Well (Complementary Post-Sequelae)
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                            These remedies are clinical successors that commonly follow {selectedRemedy.name} with optimal curative action:
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {(selectedRemedy.followsWell && selectedRemedy.followsWell.length > 0) ? (
                                selectedRemedy.followsWell.map((foll, fIdx) => (
                                  <button
                                    key={fIdx}
                                    onClick={() => {
                                      const found = enhancedRemedies.find(r => r.name.toLowerCase() === foll.toLowerCase() || r.id.toLowerCase() === foll.toLowerCase());
                                      if (found) setSelectedRemedy(found);
                                    }}
                                    className="px-3 py-1.5 bg-white dark:bg-zinc-850 border border-blue-200 text-blue-700 dark:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {foll} ↗
                                  </button>
                                ))
                              ) : (
                                ['Arsenicum Album', 'Silicea', 'Merc Sol'].map((fallback, fIdx) => (
                                  <button
                                    key={fIdx}
                                    onClick={() => {
                                      const found = enhancedRemedies.find(r => r.name.toLowerCase() === fallback.toLowerCase());
                                      if (found) setSelectedRemedy(found);
                                    }}
                                    className="px-3 py-1.5 bg-white dark:bg-zinc-850 border border-blue-200 text-blue-700 dark:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {fallback} ↗
                                  </button>
                                ))
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Related Ailments / Clinical Applications */}
                      {selectedRemedy.relatedAilments && selectedRemedy.relatedAilments.length > 0 && (
                        <div className="space-y-3 bg-white dark:bg-zinc-900/60 p-6 rounded-2xl border border-border shadow-soft">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">🧬 Associated Pathological Precedents (Ailments):</span>
                          <div className="grid md:grid-cols-2 gap-3 pb-2">
                            {selectedRemedy.relatedAilments.map((ail, aIdx) => (
                              <Link
                                key={aIdx}
                                to={`/conditions/${ail.id}`}
                                className="p-3.5 bg-slate-50 dark:bg-zinc-850 hover:bg-primary/5 hover:border-primary/30 border border-slate-200 dark:border-zinc-700 rounded-xl transition-all block text-xs font-bold text-text-primary"
                              >
                                <span className="text-primary mr-1 bg-primary/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold">AIL</span> {ail.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeCanvasTab === 'notes' && (
                    <motion.div
                      key="notes-doc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 flex flex-col flex-grow"
                    >
                      <div className="flex items-center justify-between border-b border-border pb-2 shrink-0">
                        <h3 className="text-lg font-bold font-display uppercase tracking-wide text-primary">Student Interactive Notebook</h3>
                        <button
                          onClick={() => setIsEditingNotes(!isEditingNotes)}
                          className="px-3 py-1.5 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 cursor-pointer hover:bg-primary-dark transition-all"
                        >
                          {isEditingNotes ? (
                            <>
                              <Save className="w-3.5 h-3.5" /> Save Notebook
                            </>
                          ) : (
                            <>
                              <Edit2 className="w-3.5 h-3.5" /> Edit Template
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex-grow flex flex-col relative min-h-[300px]">
                        {isEditingNotes ? (
                          <textarea
                            value={notesContent}
                            onChange={(e) => saveNotes(e.target.value)}
                            className="w-full h-full min-h-[300px] p-5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white font-mono text-xs text-text-primary leading-relaxed shadow-inner"
                            placeholder="Add your own study guidelines or clinical observations here..."
                          />
                        ) : (
                          <div className="w-full h-full min-h-[300px] p-6 bg-white dark:bg-zinc-900 border border-border/70 rounded-2xl font-serif text-sm leading-relaxed text-text-primary shadow-soft overflow-y-auto whitespace-pre-line border-l-4 border-l-accent animate-fade">
                            {notesContent || "Start compiling your research. Type in notes or use 'Send to Canvas' under AI answers."}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Printable overlay specifically targeting standard printers. Satisfies local print actions cleanly! */}
              <div id="print-section" className="hidden">
                <div className="p-8 space-y-6 bg-white text-black font-serif">
                  <div className="border-b-2 border-black pb-4 text-center">
                    <h1 className="text-4xl uppercase tracking-wider font-extrabold">{selectedRemedy.name}</h1>
                    <p className="text-sm italic">Classical materia medica reference study card</p>
                    <p className="text-xs">Curiva Peer-Review Library &middot; Authentic College Curriculum</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1">Origin substance:</h4>
                      <p className="text-sm italic">{selectedRemedy.origin}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1">Core characteristics & keynotes:</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {selectedRemedy.keyCharacteristics.map((chr, cIdx) => (
                          <li key={cIdx}>{chr}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">Worse Aggravations:</h4>
                        <p className="text-xs italic">{selectedRemedy.modalities.worse.join(', ') || 'No specific aggravations.'}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">Better Ameliorations:</h4>
                        <p className="text-xs italic">{selectedRemedy.modalities.better.join(', ') || 'No specific ameliorations.'}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black">
                      <h4 className="text-xs font-bold uppercase tracking-widest">Personal Student Canvas Notes:</h4>
                      <p className="text-xs italic leading-relaxed whitespace-pre-line bg-gray-50 p-4 border border-gray-300 rounded-lg">{notesContent}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
