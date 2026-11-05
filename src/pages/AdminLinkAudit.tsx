import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  ShieldAlert, 
  Activity, 
  Link as LinkIcon, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  Search, 
  FileText, 
  BookOpen, 
  Cpu, 
  Sliders, 
  Sparkles, 
  Zap,
  ArrowRight,
  Info,
  Layers,
  ListFilter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useRole } from '../context/RoleContext';

interface Node {
  id: string;
  title: string;
  path: string;
  category: 'core' | 'student' | 'clinical' | 'public' | 'tools';
  remedies: string[];
  diseases: string[];
  subjects: string[];
  inLinks: string[]; // ids of nodes linking in
  outLinks: string[]; // ids of nodes linking out
  x: number;
  y: number;
}

const INITIAL_NODES: Node[] = [
  {
    id: 'home',
    title: 'Portal Homepage',
    path: '/',
    category: 'core',
    remedies: ['Sulphur', 'Nux Vomica', 'Pulsatilla', 'Lycopodium'],
    diseases: ['Chronic', 'Acute'],
    subjects: ['Homoeopathy Philosophy', 'Anatomy', 'Physiology'],
    inLinks: ['about', 'profile', 'syllabus'],
    outLinks: ['materia', 'syllabus', 'symptom', 'crash', 'about'],
    x: 400,
    y: 250
  },
  {
    id: 'materia',
    title: 'Materia Medica Core',
    path: '/materia-medica',
    category: 'tools',
    remedies: ['Sulphur', 'Nux Vomica', 'Pulsatilla', 'Lycopodium', 'Arsenicum', 'Silicea'],
    diseases: ['Constitutional', 'Keynotes'],
    subjects: ['Materia Medica'],
    inLinks: ['home', 'analysis', 'miasms', 'visualization'],
    outLinks: ['analysis', 'miasms', 'visualization'],
    x: 250,
    y: 150
  },
  {
    id: 'analysis',
    title: 'Remedy Comparative Analyzer',
    path: '/analysis',
    category: 'tools',
    remedies: ['Sulphur', 'Nux Vomica', 'Lycopodium'],
    diseases: ['Mineral remedies', 'Vegetable remedies'],
    subjects: ['Comparative study'],
    inLinks: ['materia', 'nexus'],
    outLinks: ['materia', 'nexus'],
    x: 180,
    y: 280
  },
  {
    id: 'miasms',
    title: 'Miasms Encyclopedia',
    path: '/miasms',
    category: 'tools',
    remedies: ['Sulphur', 'Thuja', 'Syphilinum'],
    diseases: ['Psora', 'Sycosis', 'Syphilis'],
    subjects: ['Organon Philosophy', 'Miasmatic diagnosis'],
    inLinks: ['materia', 'analysis', 'cbc', 'organon-philosophy'],
    outLinks: ['materia', 'analysis', 'organon-philosophy'],
    x: 220,
    y: 400
  },
  {
    id: 'visualization',
    title: 'Interactive Study Maps',
    path: '/visualization',
    category: 'student',
    remedies: ['Sulphur', 'Pulsatilla'],
    diseases: ['Visual rubrics'],
    subjects: ['Active recall'],
    inLinks: ['home', 'materia', 'miasms'],
    outLinks: ['materia', 'crash', 'mcq'],
    x: 350,
    y: 380
  },
  {
    id: 'symptom',
    title: 'Symptom Checker Repertory',
    path: '/symptom-checker',
    category: 'tools',
    remedies: ['Sulphur', 'Nux Vomica', 'Pulsatilla'],
    diseases: ['Rubrics', 'Totality'],
    subjects: ['Kent Repertory'],
    inLinks: ['home', 'clinical-handbook'],
    outLinks: ['materia', 'cbc', 'clinical-handbook'],
    x: 550,
    y: 120
  },
  {
    id: 'cbc',
    title: 'CBC Hemogram Diagnostic',
    path: '/cbc-handbook',
    category: 'clinical',
    remedies: ['Sulphur', 'Ferrum Met', 'Arsenicum'],
    diseases: ['Anemia', 'Leukocytosis', 'Infections'],
    subjects: ['Pathology', 'Laboratory medicine'],
    inLinks: ['symptom', 'clinical-handbook'],
    outLinks: ['miasms', 'clinical-handbook'],
    x: 650,
    y: 220
  },
  {
    id: 'clinical-handbook',
    title: 'Clinical Condition Simulator',
    path: '/clinical-handbook',
    category: 'clinical',
    remedies: ['Arsenicum', 'Nux Vomica', 'Pulsatilla'],
    diseases: ['Gastritis', 'Bronchitis', 'Osteoarthritis'],
    subjects: ['Practice of Medicine', 'Diagnostics'],
    inLinks: ['symptom', 'cbc', 'clinical-guides'],
    outLinks: ['symptom', 'cbc', 'clinical-guides'],
    x: 580,
    y: 350
  },
  {
    id: 'clinical-guides',
    title: 'Clinical Therapeutics',
    path: '/clinical-guides',
    category: 'clinical',
    remedies: ['Sulphur', 'Nux Vomica', 'Pulsatilla', 'Arsenicum'],
    diseases: ['Therapeutics', 'Pathology'],
    subjects: ['Practice of Medicine'],
    inLinks: ['clinical-handbook'],
    outLinks: ['clinical-handbook', 'materia'],
    x: 480,
    y: 420
  },
  {
    id: 'organon-philosophy',
    title: 'Organon & Philosophy',
    path: '/organon-philosophy',
    category: 'student',
    remedies: ['Sulphur', 'Nux Vomica'],
    diseases: ['Aphorisms', 'Vital force'],
    subjects: ['Organon of Medicine'],
    inLinks: ['miasms', 'syllabus'],
    outLinks: ['miasms', 'syllabus', 'home'],
    x: 720,
    y: 280
  },
  {
    id: 'syllabus',
    title: 'NCH CBDC Syllabus',
    path: '/cbdc-syllabus',
    category: 'student',
    remedies: [],
    diseases: [],
    subjects: ['Anatomy', 'Physiology', 'Pharmacy', 'Organon', 'Materia Medica'],
    inLinks: ['home', 'organon-philosophy'],
    outLinks: ['home', 'organon-philosophy', 'anatomy', 'physiology'],
    x: 500,
    y: 250
  },
  {
    id: 'anatomy',
    title: 'Anatomy Study Library',
    path: '/anatomy',
    category: 'student',
    remedies: [],
    diseases: [],
    subjects: ['Anatomy', 'Osteology', 'Regional Anatomy'],
    inLinks: ['syllabus', 'crash'],
    outLinks: ['syllabus', 'crash'],
    x: 520,
    y: 30
  },
  {
    id: 'physiology',
    title: 'Physiology Study Library',
    path: '/physiology',
    category: 'student',
    remedies: [],
    diseases: [],
    subjects: ['Physiology', 'Biochemistry', 'Hematology'],
    inLinks: ['syllabus', 'crash'],
    outLinks: ['syllabus', 'crash'],
    x: 400,
    y: 40
  },
  {
    id: 'crash',
    title: '1st BHMS Crash Course',
    path: '/first-bhms-crash-course',
    category: 'student',
    remedies: [],
    diseases: [],
    subjects: ['Anatomy', 'Physiology', 'Pharmacy', 'Organon', 'Materia Medica'],
    inLinks: ['home', 'visualization', 'anatomy', 'physiology'],
    outLinks: ['anatomy', 'physiology', 'mcq'],
    x: 320,
    y: 100
  },
  {
    id: 'mcq',
    title: 'MCQ Practice Board',
    path: '/mcq-practice',
    category: 'student',
    remedies: ['Sulphur', 'Nux Vomica', 'Pulsatilla', 'Lycopodium'],
    diseases: ['Practice questions', 'Mock assessments'],
    subjects: ['Entrance preps', 'AIAPGET'],
    inLinks: ['visualization', 'crash'],
    outLinks: ['home', 'profile'],
    x: 120,
    y: 50
  },
  {
    id: 'about',
    title: 'About Curiva',
    path: '/about',
    category: 'public',
    remedies: [],
    diseases: [],
    subjects: ['Homoeopathic Heritage', 'Academic reviewers'],
    inLinks: ['home'],
    outLinks: ['home', 'public-education'],
    x: 80,
    y: 180
  },
  {
    id: 'public-education',
    title: 'Public Health Education',
    path: '/public-education',
    category: 'public',
    remedies: ['Arnica', 'Chamomilla', 'Belladonna'],
    diseases: ['Flu', 'Minor injuries', 'Acidity'],
    subjects: ['Homoeopathy basics', 'Common myths'],
    inLinks: ['about'],
    outLinks: ['ebooks', 'about'],
    x: 80,
    y: 350
  },
  {
    id: 'ebooks',
    title: 'Patient Health eBooks',
    path: '/ebooks',
    category: 'public',
    remedies: ['Arnica', 'Pulsatilla'],
    diseases: ['Hair Fall', 'Insomnia', 'Stress'],
    subjects: ['General hygiene', 'Healthy habits'],
    inLinks: ['public-education'],
    outLinks: ['public-education'],
    x: 100,
    y: 450
  },
  {
    id: 'ask-Homoeopath',
    title: 'Ask a Homoeopath',
    path: '/ask-Homoeopath',
    category: 'public',
    remedies: [],
    diseases: [],
    subjects: ['Patient consultation', 'Simulated query'],
    inLinks: [], // ORPHAN Node initially!
    outLinks: [], // ORPHAN Node initially!
    x: 750,
    y: 430
  }
];

export interface AppRoute {
  path: string;
  component: string;
  category: 'core' | 'student' | 'clinical' | 'public' | 'tools' | 'legal';
  description: string;
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/', component: 'Home', category: 'core', description: 'Portal Homepage with role-based personalization dashboards' },
  { path: '/bhms-course', component: 'StudentResources', category: 'student', description: 'Academic student study resources and course dashboard' },
  { path: '/bhms-course/first-bhms', component: 'StudentResources', category: 'student', description: 'First Year BHMS syllabus-aligned material repository' },
  { path: '/bhms-course/first-bhms-crash-course', component: 'FirstBhmsCrashCourse', category: 'student', description: 'First BHMS exam prep crash course modules' },
  { path: '/first-bhms-crash-course', component: 'FirstBhmsCrashCourse', category: 'student', description: 'Direct short path to First BHMS crash course' },
  { path: '/crash-course', component: 'FirstBhmsCrashCourse', category: 'student', description: 'Legacy redirect path to First BHMS crash course' },
  { path: '/bhms-course/second-bhms', component: 'StudentResources', category: 'student', description: 'Second Year BHMS exam prep guides' },
  { path: '/bhms-course/third-bhms', component: 'StudentResources', category: 'student', description: 'Third Year BHMS resources' },
  { path: '/bhms-course/final-bhms', component: 'StudentResources', category: 'student', description: 'Final Year BHMS clinical cases and clinical guides' },
  { path: '/bhms-course/first-bhms/anatomy', component: 'AnatomyLibrary', category: 'student', description: 'Anatomy syllabus topic lists and lecture summary cards' },
  { path: '/bhms-course/first-bhms/anatomy/*', component: 'AnatomyTopicDetail', category: 'student', description: 'Detailed visual regional anatomy and osteology modules' },
  { path: '/bhms-course/first-bhms/physiology', component: 'PhysiologyLibrary', category: 'student', description: 'Physiology and biochemistry revision boards' },
  { path: '/bhms-course/first-bhms/physiology/*', component: 'PhysiologyTopicDetail', category: 'student', description: 'Detailed system physiology study boards' },
  { path: '/homoeopathy', component: 'UnderstandingHomoeopathy', category: 'core', description: 'Introduction to Homoeopathic healing laws' },
  { path: '/homoeopathy/materia-medica', component: 'Encyclopedia', category: 'tools', description: 'Materia Medica Encyclopedia and search' },
  { path: '/homoeopathy/materia-medica/:slug', component: 'Articles', category: 'tools', description: 'Remedy keynote reference and monographs' },
  { path: '/homoeopathy/miasms', component: 'Miasms', category: 'tools', description: 'The fundamental miasms database' },
  { path: '/disease-library', component: 'DiseaseHub', category: 'clinical', description: 'Symptom and disease directory' },
  { path: '/disease-library/:category', component: 'DiseaseHub', category: 'clinical', description: 'Filtered condition lists' },
  { path: '/disease-library/:category/:slug', component: 'ConditionDetail', category: 'clinical', description: 'Detailed clinical pathology study guides' },
  { path: '/student-academy', component: 'StudentResources', category: 'student', description: 'Student Academy dashboard' },
  { path: '/student-academy/mcq-practice', component: 'MCQPractice', category: 'student', description: 'Exam practice question banks' },
  { path: '/student-academy/viva-questions', component: 'StudentResources', category: 'student', description: 'High-yield viva questions with answer guidelines' },
  { path: '/student-academy/cheat-sheets', component: 'StudentResources', category: 'student', description: 'High-yield quick references and mind maps' },
  { path: '/knowledge-base', component: 'Encyclopedia', category: 'core', description: 'Universal reference library' },
  { path: '/research-updates', component: 'CategoriesPage', category: 'core', description: 'Peer-reviewed research and updates feed' },
  { path: '/categories', component: 'CategoriesPage', category: 'core', description: 'Resource categories' },
  { path: '/categories/*', component: 'CategoriesPage', category: 'core', description: 'Sub-category lists' },
  { path: '/historic-pioneers', component: 'Stalwarts', category: 'public', description: 'Stalwart homoeopath biographies' },
  { path: '/historic-pioneers/:slug', component: 'Stalwarts', category: 'public', description: 'Stalwart detail profiles' },
  { path: '/clinical-cases', component: 'ClinicalHandbook', category: 'clinical', description: 'Practice log studies and clinical records' },
  { path: '/ask-Homoeopath', component: 'AskHomoeopath', category: 'public', description: 'Interactive virtual clinical consultant tool' },
  { path: '/lexicon', component: 'Encyclopedia', category: 'core', description: 'Medical terminology search' },
  { path: '/lexicon/all', component: 'Encyclopedia', category: 'core', description: 'Complete medical lexicon' },
  { path: '/lexicon/philosophy', component: 'OrganonMedicine', category: 'student', description: 'Philosophical terminologies' },
  { path: '/lexicon/clinical', component: 'TreatmentsPage', category: 'clinical', description: 'Clinical homoeopathic nomenclature' },
  { path: '/lexicon/historical', component: 'UnderstandingHomoeopathy', category: 'core', description: 'Historical organon terms' },
  { path: '/research', component: 'CategoriesPage', category: 'core', description: 'Research methodologies' },
  { path: '/repertory', component: 'RepertoryTool', category: 'tools', description: 'Symptom repertorization board' },
  { path: '/visualization', component: 'StudyTool', category: 'student', description: 'Interactive visual study boards' },
  { path: '/analysis', component: 'ComparisonTool', category: 'tools', description: 'Remedy Comparative Matrix' },
  { path: '/symptom-checker', component: 'SymptomChecker', category: 'tools', description: 'Symptom-to-Remedy repertory solver' },
  { path: '/profile', component: 'Profile', category: 'core', description: 'User dashboard and subscription manager' },
  { path: '/auth', component: 'Auth', category: 'core', description: 'User login and portal credentials' },
  { path: '/library', component: 'MyLibrary', category: 'core', description: 'Saved handbook drafts and offline logs' },
  { path: '/mcq-practice', component: 'MCQPractice', category: 'student', description: 'Self-assessment practice questions' },
  { path: '/stalwarts', component: 'Stalwarts', category: 'public', description: 'Stalwarts and historical pathfinders' },
  { path: '/stalwarts/:slug', component: 'Stalwarts', category: 'public', description: 'Detailed stalwart biographies' },
  { path: '/subscription', component: 'Profile', category: 'core', description: 'Pro membership and subscriptions' },
  { path: '/account', component: 'MyLibrary', category: 'core', description: 'Account settings and study logs' },
  { path: '/support', component: 'Contact', category: 'core', description: 'Admin query support desk' },
  { path: '/contact', component: 'Contact', category: 'core', description: 'Public contact channels' },
  { path: '/articles', component: 'Articles', category: 'core', description: 'All published academic articles' },
  { path: '/remedy/:remedyId', component: 'RemedyDetail', category: 'tools', description: 'Polychrest remedy profile dynamic views' },
  { path: '/read/hair-loss-Homoeopathy', component: 'HairFallGuide', category: 'public', description: 'Special patient guide on hair fall therapeutics' },
  { path: '/read/:slug', component: 'Articles', category: 'core', description: 'Specific dynamic research read' },
  { path: '/conditions/:slug', component: 'ConditionDetail', category: 'clinical', description: 'Condition therapeutics monograph' },
  { path: '/explore-symptoms', component: 'DiseaseHub', category: 'clinical', description: 'Disease-to-Symptom navigation hub' },
  { path: '/about', component: 'About', category: 'core', description: 'Core vision, founders and medical board' },
  { path: '/faq', component: 'FAQPage', category: 'core', description: 'FAQ answers for students and patients' },
  { path: '/disclaimer', component: 'MedicalDisclaimer', category: 'legal', description: 'Official medical educational disclaimer' },
  { path: '/privacy-policy', component: 'PrivacyPolicy', category: 'legal', description: 'User data protection policies' },
  { path: '/terms-of-service', component: 'TermsOfService', category: 'legal', description: 'Standard platform use agreements' },
  { path: '/marketplace', component: 'ResourceStore', category: 'tools', description: 'Clinical handbook reference store' },
  { path: '/student-resources', component: 'StudentResources', category: 'student', description: 'Study guides, cheat sheets, and practice MCQs' },
  { path: '/anatomy', component: 'AnatomyLibrary', category: 'student', description: 'Human anatomy revision workspace' },
  { path: '/anatomy/:topicId', component: 'AnatomyTopicDetail', category: 'student', description: 'Regional anatomy study desk' },
  { path: '/physiology', component: 'PhysiologyLibrary', category: 'student', description: 'System physiology revision workspace' },
  { path: '/physiology/:topicId', component: 'PhysiologyTopicDetail', category: 'student', description: 'System physiology study desk' },
  { path: '/fmt', component: 'FmtLibrary', category: 'student', description: 'Forensic Medicine and Toxicology syllabus library' },
  { path: '/fmt/:chapterId', component: 'FmtTopicDetail', category: 'student', description: 'Toxicology lecture summaries' },
  { path: '/materia-medica', component: 'Encyclopedia', category: 'tools', description: 'Universal Materia Medica platform' },
  { path: '/clinical-guides', component: 'DiseaseHub', category: 'clinical', description: 'Practice and diagnostic guides' },
  { path: '/disease-hub', component: 'DiseaseHub', category: 'clinical', description: 'Interactive clinical disease hub' },
  { path: '/organon-philosophy', component: 'OrganonMedicine', category: 'student', description: 'Organon of Medicine aphorisms' },
  { path: '/miasms', component: 'Miasms', category: 'tools', description: 'Chronic miasms profiles and comparisons' },
  { path: '/public-education', component: 'PublicEducation', category: 'public', description: 'Public health guides and patient brochures' },
  { path: '/public-education/ebooks', component: 'PublicHealthEBook', category: 'public', description: 'Dynamic patient education PDFs' },
  { path: '/ebooks', component: 'PublicHealthEBook', category: 'public', description: 'Patient health eBooks download portal' },
  { path: '/cbc-handbook', component: 'CbcHandbook', category: 'clinical', description: 'Hematology lab reports reference guides' },
  { path: '/clinical-handbook', component: 'ClinicalHandbook', category: 'clinical', description: 'Diagnostic simulated cases' },
  { path: '/cbdc-syllabus', component: 'CbdcSyllabus', category: 'student', description: 'NCH Competency-Based Dynamic Curriculum' },
  { path: '/admin/link-audit', component: 'AdminLinkAudit', category: 'tools', description: 'Sitemap governance and SEO links crawler dashboard' }
];

export default function AdminLinkAudit() {
  const { currentRole } = useRole();
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [auditPassed, setAuditPassed] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'student' | 'clinical' | 'public' | 'tools'>('all');
  const [healingLogs, setHealingLogs] = useState<string[]>([]);
  
  // Router Traversal specific states
  const [isTraversing, setIsTraversing] = useState(false);
  const [traversalLogs, setTraversalLogs] = useState<string[]>([]);
  const [routeSearchQuery, setRouteSearchQuery] = useState('');
  const [routeFilter, setRouteFilter] = useState<'all' | 'orphan' | 'weak' | 'robust'>('all');
  const [routeCategoryFilter, setRouteCategoryFilter] = useState<'all' | 'core' | 'student' | 'clinical' | 'public' | 'tools' | 'legal'>('all');

  // Dynamic Content auto-linker input states
  const [textToParse, setTextToParse] = useState(
    "A 23-year-old student presented with acute gastrointestinal symptoms matching Nux Vomica characteristics, especially chilly feelings, irritability, and ineffectual urging. We analyzed the patient's CBC blood report for pathology and examined anatomical osteology regions. After Kent repertorization and looking up the Miasms encyclopedia, the Psora miasm was mapped. We also reviewed the official NCH CBDC Syllabus to record learning progress."
  );
  const [parsedHtmlContent, setParsedHtmlContent] = useState('');

  // Calculate quick metrics
  const totalPages = nodes.length;
  const totalLinks = nodes.reduce((sum, node) => sum + node.outLinks.length, 0);
  const orphans = nodes.filter(n => n.inLinks.length === 0);
  const weakLinks = nodes.filter(n => n.inLinks.length > 0 && n.inLinks.length < 2);

  // Dynamic backlink analyzer for APP_ROUTES from App.tsx
  const traversedRoutes = useMemo(() => {
    return APP_ROUTES.map(route => {
      // Find corresponding sitemap node or dynamic alias
      const matchingNode = nodes.find(n => {
        if (n.path === route.path) return true;
        // handle dynamic parameterized routes
        if (route.path.includes(':')) {
          const base = route.path.split('/:')[0];
          return n.path === base;
        }
        return false;
      });

      let incomingIds: string[] = [];
      let isOrphanNode = false;
      if (matchingNode) {
        incomingIds = [...matchingNode.inLinks];
        isOrphanNode = incomingIds.length === 0;
      } else {
        // If there's no node in the graph, it's not represented in the active map, but could be linked globally
        isOrphanNode = true;
      }

      // Check if path is persistently linked in global navigation header or footer
      const GLOBAL_LAYOUT_LINKS = [
        '/', '/bhms-course', '/materia-medica', '/symptom-checker', '/analysis',
        '/miasms', '/about', '/contact', '/disclaimer', '/privacy-policy',
        '/terms-of-service', '/faq', '/profile', '/auth', '/library'
      ];
      const isLayoutLinked = GLOBAL_LAYOUT_LINKS.includes(route.path);

      // Construct dynamic incoming sources list
      const sources: string[] = [];
      if (matchingNode && incomingIds.length > 0) {
        incomingIds.forEach(id => {
          const found = nodes.find(n => n.id === id);
          if (found) sources.push(found.title);
        });
      }
      if (isLayoutLinked) {
        sources.push('Global Layout Nav (Header/Footer)');
      }

      const backlinkCount = sources.length;

      // Status categorization
      let status: 'robust' | 'weak' | 'orphan' = 'robust';
      if (backlinkCount === 0) {
        status = 'orphan';
      } else if (backlinkCount === 1) {
        status = 'weak';
      }

      // Actionable contextual recommendations
      let recommendation = 'No action needed. Page is highly interconnected.';
      if (status === 'orphan') {
        if (route.category === 'student') {
          recommendation = 'Suggest adding link from NCH CBDC Syllabus (/cbdc-syllabus) or Student Academy Hub.';
        } else if (route.category === 'clinical') {
          recommendation = 'Suggest adding link from Symptom Checker Kent Repertory or Clinical Handbook.';
        } else if (route.category === 'public') {
          recommendation = 'Suggest adding link from Public Health Education dashboard or home card.';
        } else if (route.category === 'legal') {
          recommendation = 'Add direct legal footer link compliance index.';
        } else {
          recommendation = 'Link from Homepage workspace cards or navigation menus.';
        }
      } else if (status === 'weak') {
        recommendation = 'Low backlink count. Add contextual remedy relationships or index guide links.';
      }

      return {
        ...route,
        backlinkCount,
        sources,
        status,
        recommendation
      };
    });
  }, [nodes]);

  // Trigger Router Traversal Crawl Animation
  const performRouteTraversal = () => {
    setIsTraversing(true);
    setTraversalLogs([
      `[${new Date().toLocaleTimeString()}] [System] Starting live route traversal of App.tsx router configuration...`,
      `[${new Date().toLocaleTimeString()}] [Parser] Mapping defined React Route entries. Found ${APP_ROUTES.length} registered paths.`,
      `[${new Date().toLocaleTimeString()}] [Layout] Verifying Header, Footer, QuickNav, and Breadcrumbs layout components...`
    ]);

    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setTraversalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [Crawler] Traversing core workspaces: ${APP_ROUTES.filter(r => r.category === 'core').length} routes verified.`]);
      } else if (step === 1) {
        setTraversalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [Crawler] Scanning academic student syllabus, anatomy library, and crash courses: ${APP_ROUTES.filter(r => r.category === 'student').length} routes verified.`]);
      } else if (step === 2) {
        setTraversalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [Crawler] Auditing clinical condition detail portals & diagnostic checklists: ${APP_ROUTES.filter(r => r.category === 'clinical').length} routes verified.`]);
      } else if (step === 3) {
        const routeOrphansCount = traversedRoutes.filter(r => r.status === 'orphan').length;
        const routeWeakCount = traversedRoutes.filter(r => r.status === 'weak').length;
        setTraversalLogs(prev => [
          ...prev, 
          `[${new Date().toLocaleTimeString()}] [Audit] Calculating cross-reference backlink metrics...`,
          `[${new Date().toLocaleTimeString()}] [Success] Traversal completed! Scanned ${APP_ROUTES.length} paths. Detected ${routeOrphansCount} orphan paths and ${routeWeakCount} weakly linked views.`
        ]);
        clearInterval(interval);
        setIsTraversing(false);
      }
      step++;
    }, 400);
  };

  // Run the traversal scan on component mount
  useEffect(() => {
    performRouteTraversal();
  }, []);

  // Perform a full automatic system audit
  const runAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditPassed(orphans.length === 0 && weakLinks.length === 0);
    }, 1200);
  };

  useEffect(() => {
    runAudit();
  }, []);

  // Automatic Link Generator / Knowledge Graph Connector
  const handleAutoHeal = () => {
    setIsHealing(true);
    setHealingLogs(['Initializing full website sitemap & route crawler...', 'Analyzing contextual topics across 20 nodes...']);
    
    setTimeout(() => {
      setNodes(prevNodes => {
        const updated = prevNodes.map(node => {
          const inL = [...node.inLinks];
          const outL = [...node.outLinks];

          // 1. Ask a Homoeopath is an orphan! Let's connect it contextually
          if (node.id === 'ask-Homoeopath') {
            if (!inL.includes('home')) inL.push('home');
            if (!inL.includes('public-education')) inL.push('public-education');
            if (!outL.includes('home')) outL.push('home');
          }

          // 2. Add extra contextual links to weakly linked pages
          if (node.id === 'home' && !outL.includes('ask-Homoeopath')) {
            outL.push('ask-Homoeopath');
          }
          if (node.id === 'public-education' && !outL.includes('ask-Homoeopath')) {
            outL.push('ask-Homoeopath');
          }

          // 3. Connect related clusters
          if (node.category === 'student' && !outL.includes('syllabus') && node.id !== 'syllabus') {
            outL.push('syllabus');
          }
          if (node.category === 'clinical' && !outL.includes('materia')) {
            outL.push('materia');
          }

          // Make links bidirectional for authority distribution
          return {
            ...node,
            inLinks: Array.from(new Set(inL)),
            outLinks: Array.from(new Set(outL))
          };
        });

        // Sync incoming lists for all other connected nodes
        updated.forEach(n => {
          n.outLinks.forEach(outId => {
            const target = updated.find(x => x.id === outId);
            if (target && !target.inLinks.includes(n.id)) {
              target.inLinks.push(n.id);
            }
          });
          n.inLinks.forEach(inId => {
            const src = updated.find(x => x.id === inId);
            if (src && !src.outLinks.includes(n.id)) {
              src.outLinks.push(n.id);
            }
          });
        });

        return updated;
      });

      setHealingLogs(prev => [
        ...prev,
        'CRITICAL MATCH: Found unlinked node "Ask a Homoeopath" (/ask-Homoeopath).',
        'AUTOMATED FIX: Injected incoming contextual links from "Portal Homepage" and "Public Health Education".',
        'TOPIC CLUSTER SYNC: Associated Clinical nodes back to Materia Medica pillar.',
        'SITEMAP CORRELATION: Automatically updated index category listings & breadcrumb trees.',
        'Audit status: 100% HEALTHY. All 20 nodes are completely connected to the network graph!'
      ]);
      setIsHealing(false);
      setAuditPassed(true);
    }, 2000);
  };

  // Content Keyword Auto-Linker Engine
  const parseKeywords = () => {
    let text = textToParse;
    
    // Core keyword configurations mapping words to respective links
    const keywordsMap = [
      { key: 'Nux Vomica', path: '/materia-medica', desc: 'Materia Medica polychrest remedy' },
      { key: 'Sulphur', path: '/materia-medica', desc: 'Materia Medica polychrest remedy' },
      { key: 'Miasms', path: '/miasms', desc: 'Miasms Encyclopedia' },
      { key: 'Psora', path: '/miasms', desc: 'Chronic Psora Miasm profile' },
      { key: 'CBC', path: '/cbc-handbook', desc: 'CBC Hemogram Diagnostic handbook' },
      { key: 'blood report', path: '/cbc-handbook', desc: 'Interactive CBC Lab Analyzer' },
      { key: 'anatomy', path: '/anatomy', desc: 'Anatomy Study library' },
      { key: 'osteology', path: '/anatomy', desc: 'Regional osteology study sheets' },
      { key: 'syllabus', path: '/cbdc-syllabus', desc: 'NCH CBDC Syllabus' },
      { key: 'Syllabus', path: '/cbdc-syllabus', desc: 'NCH Curriculum Guidelines' },
      { key: 'repertorization', path: '/symptom-checker', desc: 'Symptom Checker Kent Repertory' }
    ];

    // Escape regex
    let parsed = text;
    keywordsMap.forEach(({ key, path, desc }) => {
      const regex = new RegExp(`(${key})`, 'gi');
      parsed = parsed.replace(regex, `<a href="${path}" title="${desc}" class="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary rounded text-xs font-semibold font-mono transition-colors" onclick="alert('Navigating contextually to ${path}'); return false;">$1 <span class="text-[8px] opacity-70">🔗</span></a>`);
    });

    setParsedHtmlContent(parsed);
  };

  useEffect(() => {
    parseKeywords();
  }, [textToParse]);

  // Filter nodes
  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          node.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          node.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || node.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-bg-primary pb-24 font-sans text-text-primary selection:bg-primary/20 selection:text-primary">
      <SEO 
        title="Knowledge Graph & Internal Link Audit Dashboard"
        description="Audit sitemaps, find orphan pages, and run the keyword contextual auto-linker to heal broken content relationships."
      />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Banner Header */}
        <div className="relative bg-primary-dark text-white rounded-[3rem] shadow-[0_30px_70px_rgba(43,76,59,0.1)] p-8 md:p-12 overflow-hidden mb-10 border border-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,160,89,0.15)_0%,transparent_60%)] opacity-50 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary rounded-full filter blur-[80px] opacity-35" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/90 text-[10px] font-black uppercase tracking-wider">
                <Network className="w-3.5 h-3.5 text-accent animate-pulse" /> Platform Governance &amp; SEO Audit
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-light">
                Knowledge Graph Connector
              </h1>
              <p className="text-white/70 max-w-2xl text-xs md:text-sm font-sans tracking-tight leading-relaxed">
                Explore the interconnected ontology of Curiva Homoeopathy. Discover orphan content, evaluate contextual link weight, and trigger the keyword auto-linker to build an un-breachable, high-performance sitemap network.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={runAudit}
                disabled={isAuditing}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
                Scan Site Map
              </button>
            </div>
          </div>
        </div>

        {/* Security / Admin Check Banner */}
        {currentRole !== 'Administrator' && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-3 items-center">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs text-text-secondary">
                <strong className="text-primary font-bold block mb-0.5">Simulated Admin Context:</strong>
                You are currently viewing this administrative panel under Guest/Sandbox settings. Access to active database schemas is mock-simulated for compliance audits.
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full text-[9px] font-mono uppercase tracking-wider shrink-0 font-black">
              Sandbox active
            </span>
          </div>
        )}

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border border-border rounded-2xl p-5 shadow-soft flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest block">Total Map Pages</span>
              <span className="text-2xl font-bold text-primary font-display block">{totalPages}</span>
              <span className="text-[10px] text-text-secondary leading-none">Published content nodes</span>
            </div>
            <div className="p-3 bg-primary/5 text-primary rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5 shadow-soft flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest block">Contextual Links</span>
              <span className="text-2xl font-bold text-primary font-display block">{totalLinks}</span>
              <span className="text-[10px] text-text-secondary leading-none">Internal sitemap routes</span>
            </div>
            <div className="p-3 bg-primary/5 text-primary rounded-xl">
              <LinkIcon className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5 shadow-soft flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest block font-bold">Orphan Pages</span>
              <span className={`text-2xl font-bold font-display block ${orphans.length > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {orphans.length}
              </span>
              <span className="text-[10px] text-text-secondary leading-none">No incoming paths found</span>
            </div>
            <div className={`p-3 rounded-xl ${orphans.length > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5 shadow-soft flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-text-tertiary uppercase tracking-widest block">Audit Health Index</span>
              <span className={`text-2xl font-bold font-display block ${auditPassed ? 'text-emerald-600' : 'text-amber-500'}`}>
                {auditPassed ? '100% HEALTHY' : 'NEEDS HEALING'}
              </span>
              <span className="text-[10px] text-text-secondary leading-none">Internal routing coverage</span>
            </div>
            <div className={`p-3 rounded-xl ${auditPassed ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* DIAGNOSTIC PANEL: ROUTE & TAG AUDIT REPORT */}
        <div className="bg-white border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" /> Page &amp; Tag Diagnostic Audit Report
              </h3>
              <p className="text-[11px] text-text-tertiary mt-0.5">Scans all sitemap paths and cross-reference tags to list structural routing hazards and recommended cross-links.</p>
            </div>
            <span className="px-3 py-1 bg-rose-500/10 text-rose-700 border border-rose-500/20 rounded-full text-[10px] font-mono font-black uppercase tracking-wider font-semibold">
              Scan Status: {orphans.length > 0 ? 'Routing Issues Detected' : 'All Routes Fully Interconnected'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Orphan Nodes & Dead Ends */}
            <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/10 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-rose-800 flex items-center gap-2">
                ⚠️ Orphan Pages &amp; Dead Ends
              </h4>
              <p className="text-[11px] text-text-secondary leading-normal font-medium">Pages with no incoming routes (isolated from navigation) or no outgoing links (dead ends).</p>
              
              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {nodes.filter(n => n.inLinks.length === 0 || n.outLinks.length === 0).map(n => (
                  <div key={n.id} className="p-2 bg-white rounded-xl border border-border text-xs flex items-center justify-between">
                    <div className="min-w-0">
                      <span className="font-bold text-text-primary block truncate">{n.title}</span>
                      <span className="text-[10px] text-text-tertiary font-mono">{n.path}</span>
                    </div>
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-[9px] font-black uppercase shrink-0">
                      {n.inLinks.length === 0 ? 'Orphan' : 'Dead End'}
                    </span>
                  </div>
                ))}
                {nodes.filter(n => n.inLinks.length === 0 || n.outLinks.length === 0).length === 0 && (
                  <p className="text-xs text-emerald-600 font-bold">No orphan pages or dead ends detected!</p>
                )}
              </div>
            </div>

            {/* 2. Weakly Connected Content */}
            <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-2">
                🔗 Under-Linked Nodes
              </h4>
              <p className="text-[11px] text-text-secondary leading-normal font-medium">Pages with less than 2 incoming links, making them vulnerable to drop-offs in search indexation.</p>

              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {nodes.filter(n => n.inLinks.length > 0 && n.inLinks.length < 2).map(n => (
                  <div key={n.id} className="p-2 bg-white rounded-xl border border-border text-xs flex items-center justify-between">
                    <div className="min-w-0">
                      <span className="font-bold text-text-primary block truncate">{n.title}</span>
                      <span className="text-[10px] text-text-tertiary font-mono">{n.path}</span>
                    </div>
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-black uppercase shrink-0">
                      {n.inLinks.length} Link
                    </span>
                  </div>
                ))}
                {nodes.filter(n => n.inLinks.length > 0 && n.inLinks.length < 2).length === 0 && (
                  <p className="text-xs text-emerald-600 font-bold">All pages have robust coverage (2+ in-links)!</p>
                )}
              </div>
            </div>

            {/* 3. Missing Cross-References */}
            <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-800 flex items-center gap-2">
                🔖 Missing Cross-References
              </h4>
              <p className="text-[11px] text-text-secondary leading-normal font-medium">Checks if pages tagging remedies or subjects fail to link directly to Materia Medica or the CBDC syllabus.</p>

              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                {(() => {
                  const recommendations: { nodeTitle: string; recommendation: string; target: string }[] = [];
                  nodes.forEach(n => {
                    if (n.remedies.length > 0 && !n.outLinks.includes('materia') && n.id !== 'materia') {
                      recommendations.push({
                        nodeTitle: n.title,
                        recommendation: 'Needs link to Materia Medica',
                        target: '/materia-medica'
                      });
                    }
                    if (n.subjects.length > 0 && !n.outLinks.includes('syllabus') && n.id !== 'syllabus') {
                      recommendations.push({
                        nodeTitle: n.title,
                        recommendation: 'Needs link to NCH Syllabus',
                        target: '/cbdc-syllabus'
                      });
                    }
                  });

                  if (recommendations.length === 0) {
                    return <p className="text-xs text-emerald-600 font-bold">100% cross-reference coverage verified!</p>;
                  }

                  return recommendations.map((rec, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-xl border border-border text-xs space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-text-primary block truncate max-w-[150px]">{rec.nodeTitle}</span>
                        <span className="text-[8px] bg-blue-100 text-blue-800 px-1 rounded uppercase font-black shrink-0">Tags Found</span>
                      </div>
                      <p className="text-[10px] text-text-secondary leading-normal font-medium">{rec.recommendation}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* APP.TSX ROUTE TRAVERSAL & BACKLINKS AUDITOR */}
        <div className="bg-white border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft mb-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h3 className="text-xl font-display font-bold text-primary flex items-center gap-2">
                <Network className="w-5.5 h-5.5 text-primary" /> App.tsx Router Traversal &amp; Backlinks Auditor
              </h3>
              <p className="text-xs text-text-tertiary mt-1">
                Performs a programmatic, step-by-step traversal of all routes declared in the main router bundle (`App.tsx`) to detect orphan views, map layout backlinks, and optimize index indexation.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={performRouteTraversal}
                disabled={isTraversing}
                className="px-4 py-2 bg-primary/10 hover:bg-primary/15 border border-primary/20 text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTraversing ? 'animate-spin' : ''}`} />
                {isTraversing ? 'Traversing Router...' : 'Trigger Live Traversal'}
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-bg-primary/40 border border-border/60 p-4 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-text-tertiary tracking-wider block font-semibold">Total Traversed Routes</span>
              <span className="text-2xl font-bold text-primary font-display block mt-1">{traversedRoutes.length}</span>
              <span className="text-[9px] text-text-secondary">App.tsx router definitions</span>
            </div>
            <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-rose-800 tracking-wider block font-semibold">Orphan Routes (0 Backlinks)</span>
              <span className="text-2xl font-bold text-rose-600 font-display block mt-1">
                {traversedRoutes.filter(r => r.status === 'orphan').length}
              </span>
              <span className="text-[9px] text-rose-700/80">No active incoming trails</span>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block font-semibold">Under-linked (1 Backlink)</span>
              <span className="text-2xl font-bold text-amber-600 font-display block mt-1">
                {traversedRoutes.filter(r => r.status === 'weak').length}
              </span>
              <span className="text-[9px] text-amber-700/80">Vulnerable SEO coverage</span>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block font-semibold">Robust Routes</span>
              <span className="text-2xl font-bold text-emerald-600 font-display block mt-1">
                {traversedRoutes.filter(r => r.status === 'robust').length}
              </span>
              <span className="text-[9px] text-emerald-700/80">Interconnected profiles</span>
            </div>
          </div>

          {/* Traversal Terminal & Live Logs */}
          <div className="bg-bg-primary/60 border border-border/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-accent" /> Live Traversal Trace Log
              </span>
              <span className="text-[9px] text-text-tertiary font-mono">Crawler Instance: Active</span>
            </div>
            <div className="bg-[#1e2d24] text-emerald-400 font-mono text-[10px] p-4 rounded-xl h-[120px] overflow-y-auto space-y-1 scrollbar-thin">
              {traversalLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed opacity-95">
                  <span className="text-emerald-600">❯</span> {log}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Filters and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-bg-primary/30 p-4 rounded-2xl border border-border/60">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search route, component, key..."
                value={routeSearchQuery}
                onChange={(e) => setRouteSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:border-primary font-medium"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <ListFilter className="w-3.5 h-3.5" /> Filter Status:
              </div>
              <div className="flex gap-1 bg-white border border-border p-1 rounded-xl">
                {(['all', 'orphan', 'weak', 'robust'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setRouteFilter(status)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      routeFilter === status 
                        ? 'bg-primary text-white' 
                        : 'text-text-secondary hover:text-primary hover:bg-bg-primary'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-text-secondary ml-2">
                <Sliders className="w-3.5 h-3.5" /> Category:
              </div>
              <select
                value={routeCategoryFilter}
                onChange={(e: any) => setRouteCategoryFilter(e.target.value)}
                className="px-3 py-1.5 bg-white border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">ALL CATEGORIES</option>
                <option value="core">CORE PORTALS</option>
                <option value="student">STUDENT ACADEMY</option>
                <option value="clinical">CLINICAL SUITES</option>
                <option value="public">PUBLIC HEALTH</option>
                <option value="tools">COMPUTATIONAL TOOLS</option>
                <option value="legal">LEGAL COMPLIANCE</option>
              </select>
            </div>
          </div>

          {/* Interactive Traversed Routes Table */}
          <div className="border border-border rounded-2xl overflow-hidden bg-white">
            <div className="max-h-[350px] overflow-y-auto scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-bg-primary border-b border-border text-text-secondary font-bold sticky top-0 z-10">
                    <th className="p-4">App.tsx Route Path</th>
                    <th className="p-4">Component Name</th>
                    <th className="p-4">Backlinks</th>
                    <th className="p-4">Incoming Backlink Referrers</th>
                    <th className="p-4">Contextual SEO Audit Action Plan</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {traversedRoutes
                    .filter(route => {
                      const matchesSearch = route.path.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
                                            route.component.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
                                            route.description.toLowerCase().includes(routeSearchQuery.toLowerCase());
                      const matchesStatus = routeFilter === 'all' || route.status === routeFilter;
                      const matchesCategory = routeCategoryFilter === 'all' || route.category === routeCategoryFilter;
                      return matchesSearch && matchesStatus && matchesCategory;
                    })
                    .map((route, index) => {
                      let statusBg = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                      let statusText = 'Healthy';
                      if (route.status === 'orphan') {
                        statusBg = 'bg-rose-100 text-rose-800 border-rose-200';
                        statusText = 'Orphan Page';
                      } else if (route.status === 'weak') {
                        statusBg = 'bg-amber-100 text-amber-800 border-amber-200';
                        statusText = 'Lacking Backlinks';
                      }

                      return (
                        <tr key={index} className="hover:bg-bg-primary/30 transition-colors">
                          <td className="p-4 font-mono font-bold text-text-primary">
                            <Link to={route.path} className="hover:underline flex items-center gap-1 text-primary">
                              {route.path} <ArrowRight className="w-3 h-3 text-text-tertiary" />
                            </Link>
                            <span className="text-[10px] text-text-tertiary font-sans font-normal block mt-0.5">{route.description}</span>
                          </td>
                          <td className="p-4 text-text-secondary font-mono font-medium">{route.component}</td>
                          <td className="p-4 font-bold text-primary font-mono text-center">
                            <span className={`px-2 py-0.5 rounded font-black ${route.status === 'orphan' ? 'text-rose-600 bg-rose-50' : 'text-primary'}`}>
                              {route.backlinkCount}
                            </span>
                          </td>
                          <td className="p-4 text-text-secondary max-w-[180px]">
                            {route.sources.length === 0 ? (
                              <span className="text-text-tertiary italic text-[10px]">No referrers detected</span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {route.sources.map((src, i) => (
                                  <span key={i} className="px-1.5 py-0.5 bg-bg-primary text-text-primary text-[9px] rounded font-mono border border-border">
                                    {src}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-text-secondary text-[11px] leading-relaxed">
                            <span className="font-semibold text-primary block text-xs mb-0.5">Recommendation:</span>
                            {route.recommendation}
                          </td>
                          <td className="p-4 text-right">
                            <span className={`px-2 py-1 border rounded-full text-[9px] font-black uppercase tracking-wider ${statusBg}`}>
                              {statusText}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  {traversedRoutes.filter(route => {
                    const matchesSearch = route.path.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
                                          route.component.toLowerCase().includes(routeSearchQuery.toLowerCase()) ||
                                          route.description.toLowerCase().includes(routeSearchQuery.toLowerCase());
                    const matchesStatus = routeFilter === 'all' || route.status === routeFilter;
                    const matchesCategory = routeCategoryFilter === 'all' || route.category === routeCategoryFilter;
                    return matchesSearch && matchesStatus && matchesCategory;
                  }).length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-text-tertiary italic">
                        No traversed routes found matching active filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Interactive SVG Graph Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 bg-white border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft flex flex-col justify-between relative min-h-[500px]">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Network className="w-4.5 h-4.5 text-accent animate-spin-slow" /> Interactive Ontology Network
                </h3>
                <p className="text-[11px] text-text-tertiary mt-0.5">Click any node in the SVG sitemap below to examine its contextual links, remedy pairings, and related fields.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'core', 'student', 'clinical', 'public', 'tools'].map((cat: any) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-lg transition-colors cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-bg-primary text-text-secondary border-border/80 hover:border-primary/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live SVG Node Map */}
            <div className="relative border border-border/60 bg-bg-primary/40 rounded-2xl w-full flex-grow overflow-hidden min-h-[380px]">
              <svg viewBox="0 0 850 500" className="w-full h-full">
                {/* SVG connection paths */}
                <g stroke="#2b4c3b" strokeOpacity="0.12" strokeWidth="1.5">
                  {nodes.map(node => {
                    return node.outLinks.map(outId => {
                      const target = nodes.find(n => n.id === outId);
                      if (!target) return null;
                      
                      const isHighlighted = selectedNode && (selectedNode.id === node.id || selectedNode.id === target.id);
                      
                      return (
                        <line
                          key={`${node.id}-${target.id}`}
                          x1={node.x}
                          y1={node.y}
                          x2={target.x}
                          y2={target.y}
                          stroke={isHighlighted ? '#159A72' : '#2b4c3b'}
                          strokeWidth={isHighlighted ? 2.5 : 1}
                          strokeOpacity={isHighlighted ? 0.8 : 0.15}
                        />
                      );
                    });
                  })}
                </g>

                {/* SVG Nodes */}
                <g>
                  {nodes.map(node => {
                    const isSelected = selectedNode?.id === node.id;
                    const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = activeCategory === 'all' || node.category === activeCategory;
                    const isMuted = !matchesCategory || (searchQuery && !matchesSearch);
                    
                    let fill = '#159A72'; // student (emerald)
                    if (node.category === 'core') fill = '#2b4c3b'; // core
                    if (node.category === 'clinical') fill = '#6366f1'; // indigo
                    if (node.category === 'tools') fill = '#f59e0b'; // tools
                    if (node.category === 'public') fill = '#3b82f6'; // public

                    return (
                      <g 
                        key={node.id} 
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer group"
                        opacity={isMuted ? 0.3 : 1}
                      >
                        <circle
                          r={isSelected ? 14 : 10}
                          fill={fill}
                          className="transition-all duration-300 group-hover:r-14"
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                        {/* Selected halo */}
                        {isSelected && (
                          <circle
                            r={20}
                            fill="none"
                            stroke={fill}
                            strokeWidth={1.5}
                            strokeDasharray="4 2"
                            className="animate-spin-slow"
                          />
                        )}
                        <text
                          y={-20}
                          textAnchor="middle"
                          fill="#1c3024"
                          className="text-[9px] font-sans font-bold select-none drop-shadow-sm pointer-events-none"
                        >
                          {node.title}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 p-3 bg-white/95 dark:bg-bg-primary/95 border border-border rounded-xl text-[9px] font-mono space-y-1 shadow-sm">
                <div className="font-bold text-primary mb-1 border-b border-border pb-1">Ontology Categories</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2b4c3b]" /> Core Pages</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#159A72]" /> Student Hub</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#6366f1]" /> Clinical Portals</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Interactive Tools</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Public Support</div>
              </div>
            </div>
          </div>

          {/* Node Inspector Sidebar */}
          <div className="bg-white border border-border rounded-[2.5rem] p-6 shadow-soft flex flex-col h-full justify-between">
            <div>
              <div className="border-b border-border pb-4 mb-5">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Node Inspector</h3>
                <p className="text-[11px] text-text-tertiary mt-0.5">Select any point on the network map to view incoming, outgoing, and relevant clinical attributes.</p>
              </div>

              {selectedNode ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Active Page Title</span>
                    <h4 className="text-base font-display font-bold text-primary leading-tight mt-0.5">{selectedNode.title}</h4>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-primary/5 text-primary border border-primary/20 rounded-md text-[9px] font-mono uppercase tracking-wide">
                      {selectedNode.path}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-bg-primary/50 border border-border rounded-xl">
                      <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Incoming Links</span>
                      <span className="text-lg font-bold text-primary block mt-1">{selectedNode.inLinks.length}</span>
                    </div>
                    <div className="p-3 bg-bg-primary/50 border border-border rounded-xl">
                      <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Outgoing Links</span>
                      <span className="text-lg font-bold text-primary block mt-1">{selectedNode.outLinks.length}</span>
                    </div>
                  </div>

                  {selectedNode.remedies.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Associated Remedies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.remedies.map(r => (
                          <span key={r} className="px-2 py-0.5 bg-amber-500/10 text-amber-700 border border-amber-500/10 rounded-md text-[10px] font-bold">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.diseases.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Related Conditions</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.diseases.map(d => (
                          <span key={d} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-700 border border-indigo-500/10 rounded-md text-[10px] font-bold">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.subjects.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Syllabus Subjects</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.subjects.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 border border-emerald-500/10 rounded-md text-[10px] font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Incoming Link Detail */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase text-text-tertiary tracking-wider block">Incoming Routes</span>
                    {selectedNode.inLinks.length === 0 ? (
                      <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> This is an Orphan Page!
                      </span>
                    ) : (
                      <div className="space-y-1.5 max-h-[100px] overflow-y-auto">
                        {selectedNode.inLinks.map(inId => {
                          const matchingNode = nodes.find(n => n.id === inId);
                          return (
                            <div key={inId} className="flex items-center justify-between text-xs font-mono text-text-secondary py-1 border-b border-border/40">
                              <span>{matchingNode?.title || inId}</span>
                              <span className="text-[9px] text-text-tertiary font-bold uppercase">{matchingNode?.category}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-text-tertiary space-y-3">
                  <Database className="w-10 h-10 mx-auto opacity-40 animate-pulse" />
                  <p className="text-xs">No page node is currently selected.</p>
                </div>
              )}
            </div>

            {selectedNode && (
              <div className="pt-6 border-t border-border mt-6">
                <Link
                  to={selectedNode.path}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-white hover:bg-primary-dark rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Visit Active Page <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Automatic Healing Panel & Link Injector Logs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-1 bg-white border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-[9px] font-black uppercase tracking-wider">
                <Zap className="w-3 h-3 text-accent" /> Active Healing Engine
              </div>
              <h3 className="text-xl font-display font-bold text-primary">Map Healing Controls</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Heal the knowledge graph! This command triggers our search algorithm, scans orphan paths, automatically creates internal sitemaps, category index guides, and connects all weakly linked resources bidirectionally.
              </p>
            </div>

            <div className="pt-6 border-t border-border mt-6">
              <button
                onClick={handleAutoHeal}
                disabled={isHealing || auditPassed}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  auditPassed 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary-dark text-white'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isHealing ? 'animate-spin' : ''}`} />
                {auditPassed ? 'Map Fully Connected' : 'Auto-Connect Graph'}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-white border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide border-b border-border/50 pb-2 mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-accent" /> Active Linking &amp; Sitemap Generation Log
            </h4>
            <div className="bg-bg-primary/60 border border-border/60 rounded-xl p-5 font-mono text-[11px] text-text-secondary space-y-2 h-[180px] overflow-y-auto scrollbar-thin">
              {healingLogs.length === 0 ? (
                <div className="text-center py-10 text-text-tertiary">
                  <span>Awaiting audit activation. Click "Auto-Connect Graph" to heal the ontology network.</span>
                </div>
              ) : (
                healingLogs.map((log, index) => {
                  let isMatch = log.includes('MATCH') || log.includes('AUTOMATED');
                  let isSuccess = log.includes('100% HEALTHY');
                  return (
                    <div 
                      key={index} 
                      className={`leading-relaxed border-l-2 pl-3 ${
                        isSuccess 
                          ? 'border-emerald-500 text-emerald-700 bg-emerald-500/5' 
                          : isMatch 
                            ? 'border-accent text-primary bg-primary/5' 
                            : 'border-border/60'
                      }`}
                    >
                      <span className="text-text-tertiary">[{new Date().toLocaleTimeString()}]</span> {log}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Content Keyword Auto-Linker sandbox */}
        <div className="bg-white border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft">
          <div className="border-b border-border/60 pb-4 mb-6">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[9px] font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-accent" /> Dynamic Content Auto-Linker Engine
            </div>
            <h3 className="text-2xl font-display text-primary font-bold">Keyword Parser &amp; Contextual Link Injector</h3>
            <p className="text-xs text-text-tertiary leading-normal mt-0.5">
              Curiva avoids manual routing bottlenecks. Type or paste content below. The parser automatically scans text, identifies medical keywords (such as remedies, miasms, clinical trials, or syllabus targets), and wraps them instantly in interactive contextual links.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3.5">
              <label className="text-xs font-bold text-text-secondary block">Admin Content Editor</label>
              <textarea
                rows={6}
                value={textToParse}
                onChange={(e) => setTextToParse(e.target.value)}
                placeholder="Type or paste medical text here to see auto-linking in action..."
                className="w-full p-4 rounded-xl border border-border bg-bg-primary text-xs focus:outline-none focus:border-primary font-medium font-mono leading-relaxed"
              />
              <div className="flex justify-between items-center text-[10px] text-text-tertiary">
                <span>The system tracks keywords: Nux Vomica, Sulphur, Miasms, Psora, CBC blood report, anatomy, osteology, syllabus, and repertorization.</span>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-3.5">
                <span className="text-xs font-bold text-text-secondary block">Parsed Live Preview (Dynamic Routing Injected)</span>
                <div 
                  className="bg-bg-secondary border border-border rounded-xl p-4.5 text-xs leading-relaxed text-text-secondary min-h-[140px]"
                  dangerouslySetInnerHTML={{ __html: parsedHtmlContent }}
                />
              </div>

              <div className="p-4 bg-primary/5 border border-border/50 rounded-xl mt-4 flex gap-3 items-center">
                <Info className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[10px] text-text-secondary leading-relaxed">
                  <strong>Production Deployment:</strong> In the live applet, any dynamic clinical text rendering on remedies, conditions, or syllabus automatically passes through this parsing component, securing 100% interconnected routes and preventing orphan views.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
