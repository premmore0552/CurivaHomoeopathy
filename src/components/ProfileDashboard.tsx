import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { useRole, UserRole } from '../context/RoleContext';

// Define layout widget interface
export interface DashboardWidget {
  id: string;
  title: string;
  icon: string;
  isPinned: boolean;
  isCollapsed: boolean;
  isVisible: boolean;
  description: string;
}

// Map UserRole to our 4 main dashboard profile types
export type DashboardProfileType = 'student' | 'public' | 'practitioner' | 'admin';

export function getDashboardProfileType(role: UserRole): DashboardProfileType {
  switch (role) {
    case 'BHMS Student':
    case 'Intern':
    case 'Faculty':
      return 'student';
    case 'Practitioner':
    case 'Researcher':
      return 'practitioner';
    case 'Administrator':
      return 'admin';
    default:
      return 'public'; // Guest, General Public
  }
}

// Default layouts for each profile type
const DEFAULT_WIDGET_CONFIGS: Record<DashboardProfileType, DashboardWidget[]> = {
  student: [
    { id: 'welcome', title: 'Welcome', icon: 'Sparkles', isPinned: true, isCollapsed: false, isVisible: true, description: 'Academic greet banner and customized tone summary.' },
    { id: 'continue_learning', title: 'Continue Learning', icon: 'BookOpen', isPinned: true, isCollapsed: false, isVisible: true, description: 'Resume your last visited chapters and study guides.' },
    { id: 'study_progress', title: 'Study Progress', icon: 'Activity', isPinned: false, isCollapsed: false, isVisible: true, description: 'Your overall subject and syllabus completion trackers.' },
    { id: 'mcqs', title: 'Interactive MCQ Practice', icon: 'Award', isPinned: false, isCollapsed: false, isVisible: true, description: 'Take high-yield questions for finals or entrance preps.' },
    { id: 'exam_countdown', title: 'Exam Countdown', icon: 'Clock', isPinned: false, isCollapsed: false, isVisible: true, description: 'Days left until BHMS professional university finals.' },
    { id: 'student_notes', title: 'My Study Notes', icon: 'FileText', isPinned: false, isCollapsed: false, isVisible: true, description: 'Write down quick clinical keynotes or memorization tricks.' },
    { id: 'knowledge_dna', title: 'Knowledge DNA', icon: 'GitMerge', isPinned: false, isCollapsed: false, isVisible: true, description: 'Syllabus competency target analytics map.' },
    { id: 'quick_search', title: 'Syllabus Quick Search', icon: 'Search', isPinned: false, isCollapsed: false, isVisible: true, description: 'Search anatomy, physiology, and remedy guides.' }
  ],
  public: [
    { id: 'welcome', title: 'Welcome', icon: 'Heart', isPinned: true, isCollapsed: false, isVisible: true, description: 'Health portal introduction for general readers.' },
    { id: 'featured_diseases', title: 'Featured Diseases', icon: 'Compass', isPinned: false, isCollapsed: false, isVisible: true, description: 'Learn about common alignments and gentle remedies.' },
    { id: 'health_awareness', title: 'Health Awareness', icon: 'ShieldAlert', isPinned: false, isCollapsed: false, isVisible: true, description: 'Bust common Homoeopathy myths with evidence-informed facts.' },
    { id: 'lifestyle', title: 'Lifestyle Tips', icon: 'Activity', isPinned: false, isCollapsed: false, isVisible: true, description: 'Read advice on sleep hygiene, hair care, and wellness.' },
    { id: 'popular_articles', title: 'Popular Publications', icon: 'BookOpen', isPinned: false, isCollapsed: false, isVisible: true, description: 'Browse most-read public-education eBooks.' },
    { id: 'bookmarks', title: 'My Saved Reading', icon: 'Bookmark', isPinned: false, isCollapsed: false, isVisible: true, description: 'Quick access to bookmarked public articles.' },
    { id: 'clinic_info', title: 'Clinic & Consultations', icon: 'MapPin', isPinned: false, isCollapsed: false, isVisible: true, description: 'Contact local professionals or register mock visits.' },
    { id: 'settings', title: 'Layout Settings', icon: 'Sliders', isPinned: false, isCollapsed: false, isVisible: true, description: 'Customize dashboard view widgets layout.' }
  ],
  practitioner: [
    { id: 'welcome', title: 'Clinical Workspace', icon: 'Cpu', isPinned: true, isCollapsed: false, isVisible: true, description: 'Welcome greeting calibrated for high posology prescribing.' },
    { id: 'remedy_comparison', title: 'Remedy Differentiator', icon: 'Layers', isPinned: true, isCollapsed: false, isVisible: true, description: 'Side-by-side comparative matrices of sister remedies.' },
    { id: 'clinical_cases', title: 'Clinical Case Totality', icon: 'ClipboardList', isPinned: false, isCollapsed: false, isVisible: true, description: 'Repertorize full constitutional cases using Kent rubrics.' },
    { id: 'research', title: 'Evidence-Based Research', icon: 'GraduationCap', isPinned: false, isCollapsed: false, isVisible: true, description: 'Recent high-dilution clinical trial journals.' },
    { id: 'clinical_notes', title: 'Clinical Diary Notes', icon: 'FileText', isPinned: false, isCollapsed: false, isVisible: true, description: 'Secure notes to jot down chronic prescribing insights.' },
    { id: 'saved_cases', title: 'Active Patient Cases', icon: 'Database', isPinned: false, isCollapsed: false, isVisible: true, description: 'Browse and edit your saved simulation consultation list.' },
    { id: 'quick_search', title: 'Syllabus Quick Search', icon: 'Search', isPinned: false, isCollapsed: false, isVisible: true, description: 'Search remedies, drug pictures, and clinical therapeutics.' }
  ],
  admin: [
    { id: 'welcome', title: 'Admin Central', icon: 'ShieldCheck', isPinned: true, isCollapsed: false, isVisible: true, description: 'Control terminal greeting and general statistics overview.' },
    { id: 'website_analytics', title: 'Portal Analytics', icon: 'TrendingUp', isPinned: true, isCollapsed: false, isVisible: true, description: 'Active visitor metrics, page view statistics, and response times.' },
    { id: 'publishing_queue', title: 'Publishing Queue', icon: 'FilePlus', isPinned: false, isCollapsed: false, isVisible: true, description: 'Manage content review stages, updates, and draft approvals.' },
    { id: 'broken_links', title: 'Broken Link Audit', icon: 'GitPullRequest', isPinned: false, isCollapsed: false, isVisible: true, description: 'Detailed knowledge sitemap graph link check results.' },
    { id: 'seo_health', title: 'SEO Health Optimizer', icon: 'Zap', isPinned: false, isCollapsed: false, isVisible: true, description: 'Verify page accessibility scores and schema structures.' },
    { id: 'system_logs', title: 'Real-Time System Logs', icon: 'Terminal', isPinned: false, isCollapsed: false, isVisible: true, description: 'Review network activity, Firebase syncs, and linter reports.' }
  ]
};

export default function ProfileDashboard() {
  const { currentRole, getQuickActions, getRecommendations, getNotifications } = useRole();
  const profileType = getDashboardProfileType(currentRole);

  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const [showAddMenu, setShowAddMenu] = useState<boolean>(false);

  // Load configuration based on active profile type
  useEffect(() => {
    const savedKey = `curiva_dashboard_layout_${profileType}`;
    const saved = localStorage.getItem(savedKey);
    if (saved) {
      try {
        setWidgets(JSON.parse(saved));
      } catch (e) {
        setWidgets([...DEFAULT_WIDGET_CONFIGS[profileType]]);
      }
    } else {
      setWidgets([...DEFAULT_WIDGET_CONFIGS[profileType]]);
    }
  }, [profileType]);

  // Save layout parameters helper
  const saveLayout = (updatedWidgets: DashboardWidget[]) => {
    setWidgets(updatedWidgets);
    localStorage.setItem(`curiva_dashboard_layout_${profileType}`, JSON.stringify(updatedWidgets));
  };

  // Restore defaults
  const handleRestoreDefaults = () => {
    const defaults = DEFAULT_WIDGET_CONFIGS[profileType].map(w => ({ ...w }));
    saveLayout(defaults);
  };

  // Move widget helper (for reordering)
  const handleMoveWidget = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= widgets.length) return;

    const updated = [...widgets];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    saveLayout(updated);
  };

  // Toggle Pinned status
  const handleTogglePin = (id: string) => {
    const updated = widgets.map(w => w.id === id ? { ...w, isPinned: !w.isPinned } : w);
    // Sort pinned items to the top if they are pinned
    saveLayout(updated);
  };

  // Toggle Collapse status
  const handleToggleCollapse = (id: string) => {
    const updated = widgets.map(w => w.id === id ? { ...w, isCollapsed: !w.isCollapsed } : w);
    saveLayout(updated);
  };

  // Hide widget
  const handleHideWidget = (id: string) => {
    const updated = widgets.map(w => w.id === id ? { ...w, isVisible: false } : w);
    saveLayout(updated);
  };

  // Show hidden widget
  const handleShowWidget = (id: string) => {
    const updated = widgets.map(w => w.id === id ? { ...w, isVisible: true } : w);
    saveLayout(updated);
  };

  // Filter visible and hidden widgets
  const visibleWidgets = widgets.filter(w => w.isVisible);
  const hiddenWidgets = widgets.filter(w => !w.isVisible);

  // Divide into Pinned & Standard categories
  const pinnedWidgets = visibleWidgets.filter(w => w.isPinned);
  const standardWidgets = visibleWidgets.filter(w => !w.isPinned);

  // Helper to resolve Icons safely
  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    const IconComp = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComp className={className} />;
  };

  return (
    <div className="space-y-8">
      {/* Top Controller Summary Panel */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-bg-secondary p-5 sm:p-6 rounded-2xl border border-border/80">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/10">
            🔧 Dashboard Workbench ({currentRole})
          </span>
          <h2 className="text-xl font-display font-bold text-primary mt-2 flex items-center gap-2">
            Personalized Hub
          </h2>
          <p className="text-xs text-text-secondary mt-1 max-w-xl">
            This workspace dynamically adapts its widgets to your active profile. Customize layout, pin key cards, collapse elements, or restore original grids seamlessly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {hiddenWidgets.length > 0 && (
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="px-3.5 py-2 bg-white dark:bg-zinc-900 text-text-primary text-xs font-semibold rounded-xl border border-border hover:bg-bg-secondary transition-all flex items-center gap-1.5"
            >
              <Icons.PlusCircle className="w-4 h-4 text-emerald-500" />
              <span>Restore Widgets ({hiddenWidgets.length})</span>
            </button>
          )}

          <button
            onClick={handleRestoreDefaults}
            className="px-3.5 py-2 bg-white dark:bg-zinc-900 text-text-primary text-xs font-semibold rounded-xl border border-border hover:text-primary transition-all flex items-center gap-1.5"
          >
            <Icons.RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Grid</span>
          </button>
        </div>
      </div>

      {/* Hidden Widgets Restore Dropdown Panel */}
      {showAddMenu && hiddenWidgets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-5 bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-2xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
              <Icons.Eye className="w-4 h-4" /> Hidden Dashboard Components
            </h4>
            <button onClick={() => setShowAddMenu(false)} className="text-xs text-text-tertiary hover:text-text-primary">
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hiddenWidgets.map(widget => (
              <div key={widget.id} className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 bg-bg-secondary rounded-lg text-text-secondary shrink-0">
                    {renderIcon(widget.icon, "w-4 h-4")}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-text-primary truncate">{widget.title}</h5>
                    <p className="text-[10px] text-text-tertiary truncate leading-none">{widget.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleShowWidget(widget.id)}
                  className="px-2 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-wider rounded-lg hover:bg-accent transition-all shrink-0"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Render Workspace Grids: Pinned Section then Standard Widgets */}
      <div className="space-y-8">
        {/* PINNED SECTION */}
        {pinnedWidgets.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Icons.Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> Pinned Favorites
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedWidgets.map((widget, idx) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                  index={widgets.findIndex(w => w.id === widget.id)}
                  onTogglePin={handleTogglePin}
                  onToggleCollapse={handleToggleCollapse}
                  onHide={handleHideWidget}
                  onMove={handleMoveWidget}
                  totalCount={widgets.length}
                >
                  <WidgetContentResolver id={widget.id} profileType={profileType} />
                </WidgetCard>
              ))}
            </div>
          </div>
        )}

        {/* STANDARD WIDGETS */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary flex items-center gap-1.5">
            <Icons.Grid className="w-3.5 h-3.5" /> Workspace Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standardWidgets.map((widget, idx) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                index={widgets.findIndex(w => w.id === widget.id)}
                onTogglePin={handleTogglePin}
                onToggleCollapse={handleToggleCollapse}
                onHide={handleHideWidget}
                onMove={handleMoveWidget}
                totalCount={widgets.length}
              >
                <WidgetContentResolver id={widget.id} profileType={profileType} />
              </WidgetCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Widget card shell offering Controls
interface WidgetCardProps {
  widget: DashboardWidget;
  index: number;
  onTogglePin: (id: string) => void;
  onToggleCollapse: (id: string) => void;
  onHide: (id: string) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  totalCount: number;
  children: React.ReactNode;
}

function WidgetCard({
  widget,
  index,
  onTogglePin,
  onToggleCollapse,
  onHide,
  onMove,
  totalCount,
  children
}: WidgetCardProps) {
  const IconComponent = (Icons as any)[widget.icon] || Icons.HelpCircle;

  return (
    <div
      className={`bg-white dark:bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
        widget.isPinned
          ? 'border-amber-500/30 shadow-md shadow-amber-500/[0.02]'
          : 'border-border/60 hover:border-primary/20 shadow-soft hover:shadow-md'
      }`}
    >
      {/* Card Header controls */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-bg-secondary/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`p-2 rounded-xl shrink-0 ${widget.isPinned ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/30' : 'bg-primary/5 text-primary'}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5 truncate">
              {widget.title}
              {widget.isPinned && (
                <span className="px-1.5 py-0.2 bg-amber-500/10 text-amber-600 text-[8px] font-black uppercase rounded shrink-0">
                  PINNED
                </span>
              )}
            </h4>
            <p className="text-[10px] text-text-tertiary truncate leading-none mt-0.5">{widget.description}</p>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Arrange Up */}
          {index > 0 && (
            <button
              onClick={() => onMove(index, 'up')}
              className="p-1 text-text-tertiary hover:text-primary hover:bg-bg-secondary rounded transition-colors"
              title="Move Up"
            >
              <Icons.ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Arrange Down */}
          {index < totalCount - 1 && (
            <button
              onClick={() => onMove(index, 'down')}
              className="p-1 text-text-tertiary hover:text-primary hover:bg-bg-secondary rounded transition-colors"
              title="Move Down"
            >
              <Icons.ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Pin */}
          <button
            onClick={() => onTogglePin(widget.id)}
            className={`p-1.5 rounded transition-all ${widget.isPinned ? 'text-amber-500 hover:bg-amber-500/10' : 'text-text-tertiary hover:text-amber-500'}`}
            title={widget.isPinned ? "Unpin widget" : "Pin widget"}
          >
            <Icons.Star className={`w-3.5 h-3.5 ${widget.isPinned ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Collapse */}
          <button
            onClick={() => onToggleCollapse(widget.id)}
            className="p-1.5 text-text-tertiary hover:text-primary hover:bg-bg-secondary rounded transition-all"
            title={widget.isCollapsed ? "Expand content" : "Collapse content"}
          >
            {widget.isCollapsed ? <Icons.ChevronDown className="w-3.5 h-3.5" /> : <Icons.ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {/* Hide */}
          <button
            onClick={() => onHide(widget.id)}
            className="p-1.5 text-text-tertiary hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
            title="Hide component"
          >
            <Icons.X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Widget Content Body */}
      <AnimatePresence initial={false}>
        {!widget.isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-5 flex-grow flex flex-col justify-between"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Resolver returning dedicated micro-apps for each widget id and user profile type
function WidgetContentResolver({ id, profileType }: { id: string; profileType: DashboardProfileType }) {
  switch (id) {
    case 'welcome':
      return <WelcomeWidget profileType={profileType} />;
    case 'continue_learning':
      return <ContinueLearningWidget />;
    case 'study_progress':
      return <StudyProgressWidget />;
    case 'mcqs':
      return <InteractiveMCQWidget />;
    case 'exam_countdown':
      return <ExamCountdownWidget />;
    case 'student_notes':
      return <StudentNotesWidget />;
    case 'knowledge_dna':
      return <KnowledgeDNAWidget />;
    case 'quick_search':
      return <QuickSearchWidget profileType={profileType} />;
    
    // Public Widgets
    case 'featured_diseases':
      return <FeaturedDiseasesWidget />;
    case 'health_awareness':
      return <HealthAwarenessWidget />;
    case 'lifestyle':
      return <LifestyleTipsWidget />;
    case 'popular_articles':
      return <PopularArticlesWidget />;
    case 'bookmarks':
      return <BookmarksWidget />;
    case 'clinic_info':
      return <ClinicInfoWidget />;

    // Practitioner Widgets
    case 'remedy_comparison':
      return <RemedyComparisonWidget />;
    case 'clinical_cases':
      return <ClinicalCaseTotalityWidget />;
    case 'research':
      return <EvidenceResearchWidget />;
    case 'clinical_notes':
      return <ClinicalDiaryWidget />;
    case 'saved_cases':
      return <SavedCasesWidget />;

    // Admin Widgets
    case 'website_analytics':
      return <WebsiteAnalyticsWidget />;
    case 'publishing_queue':
      return <PublishingQueueWidget />;
    case 'broken_links':
      return <BrokenLinksWidget />;
    case 'seo_health':
      return <SEOHealthWidget />;
    case 'system_logs':
      return <SystemLogsWidget />;

    default:
      return <div className="text-xs text-text-tertiary">Interactive content coming soon.</div>;
  }
}

// -------------------------------------------------------------------
// INDIVIDUAL FUNCTIONAL WIDGET IMPLEMENTATIONS
// -------------------------------------------------------------------

// 1. Welcome Widget
function WelcomeWidget({ profileType }: { profileType: DashboardProfileType }) {
  const { currentRole, getTone } = useRole();
  const tone = getTone();

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h5 className="text-xs font-bold text-text-primary capitalize">{currentRole} Portal</h5>
        <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black">
          {tone.toUpperCase()} TONE ACTIVE
        </span>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">
        {profileType === 'student' && "Your workspace is optimized with standard academic language. Terminology focuses on standard BHMS curriculum and board exam preparations."}
        {profileType === 'practitioner' && "Calibrated for experienced practitioners. Quick actions show remedy comparison matrices and clinical therapeutics."}
        {profileType === 'admin' && "Administration command deck. Monitor database connectivity, orphan link coverages, and custom publishing requests."}
        {profileType === 'public' && "Gentle and easy plain-language descriptions. Medical terms are explained simply, fully free from professional jargon."}
      </p>
      <div className="pt-2 border-t border-border/40 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-text-tertiary">Real-time session syncing active.</span>
      </div>
    </div>
  );
}

// 2. Continue Learning Widget
function ContinueLearningWidget() {
  const topics = [
    { title: 'Anatomy: Regional Osteology of Arm', link: '/anatomy', progress: 75, badge: 'Anatomy' },
    { title: "Samuel Hahnemann's Aphorisms 1-10", link: '/organon-philosophy', progress: 40, badge: 'Organon' }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {topics.map((t, i) => (
          <div key={i} className="p-3 bg-bg-secondary rounded-xl border border-border flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary font-bold rounded">
                {t.badge}
              </span>
              <span className="text-[10px] font-bold text-text-tertiary">{t.progress}% Complete</span>
            </div>
            <h6 className="text-xs font-bold text-text-primary">{t.title}</h6>
            <div className="w-full bg-border h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-300" style={{ width: `${t.progress}%` }} />
            </div>
            <Link to={t.link} className="text-[10px] text-primary hover:text-accent font-black uppercase tracking-wider flex items-center gap-0.5 self-end">
              Resume <Icons.ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Study Progress Widget
function StudyProgressWidget() {
  const [prepProgress, setPrepProgress] = useState(() => {
    return Number(localStorage.getItem('curiva_study_progress_v1') || '62');
  });

  const handleIncrement = () => {
    const next = Math.min(100, prepProgress + 5);
    setPrepProgress(next);
    localStorage.setItem('curiva_study_progress_v1', String(next));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary font-medium">Overall Preparations</span>
        <span className="text-sm font-bold text-primary">{prepProgress}%</span>
      </div>
      <div className="w-full bg-bg-secondary h-2.5 rounded-full border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300" style={{ width: `${prepProgress}%` }} />
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-text-tertiary">Goal: 100% by University Finals</span>
        <button
          onClick={handleIncrement}
          disabled={prepProgress >= 100}
          className="px-2.5 py-1 bg-primary hover:bg-accent text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all"
        >
          {prepProgress >= 100 ? 'Completed' : 'Mark Lesson Complete'}
        </button>
      </div>
    </div>
  );
}

// 4. Interactive MCQ Widget
function InteractiveMCQWidget() {
  const qObj = {
    q: "Which remedy is characterized by a high desire for open cold air and a severe aggravation in warm rooms?",
    options: ["Pulsatilla", "Nux Vomica", "Arsenicum Album", "Sulphur"],
    correct: 0,
    explanation: "Pulsatilla patients are notoriously warm-blooded, desiring fresh, cool open air and dreading closed warm spaces."
  };

  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="p-3 bg-bg-secondary rounded-xl border border-border font-medium text-text-primary">
        {qObj.q}
      </div>

      <div className="space-y-2">
        {qObj.options.map((opt, i) => {
          let style = "border-border bg-bg-secondary hover:bg-white";
          if (isSubmitted) {
            if (i === qObj.correct) {
              style = "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300";
            } else if (selectedOpt === i) {
              style = "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-300";
            }
          } else if (selectedOpt === i) {
            style = "border-primary bg-primary/5 text-primary font-bold";
          }

          return (
            <button
              key={i}
              onClick={() => !isSubmitted && setSelectedOpt(i)}
              className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all ${style}`}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>

      {isSubmitted ? (
        <div className="p-3 bg-blue-50/50 dark:bg-zinc-800 rounded-xl border border-blue-200/50 space-y-1">
          <p className="font-bold text-text-primary text-[11px]">Explanation:</p>
          <p className="text-[10px] text-text-secondary leading-relaxed">{qObj.explanation}</p>
          <button onClick={handleReset} className="text-[10px] text-primary hover:underline mt-2 font-bold block">
            Try Another Question
          </button>
        </div>
      ) : (
        <button
          onClick={() => selectedOpt !== null && setIsSubmitted(true)}
          disabled={selectedOpt === null}
          className="w-full py-2 bg-primary text-white font-black uppercase tracking-widest rounded-xl hover:bg-accent disabled:opacity-50 transition-all text-[10px]"
        >
          Verify Answer
        </button>
      )}
    </div>
  );
}

// 5. Exam Countdown Widget
function ExamCountdownWidget() {
  const [timeLeft, setTimeLeft] = useState({ days: 48, hours: 14, mins: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1 };
        if (prev.hours > 0) return { days: prev.days, hours: prev.hours - 1, mins: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, mins: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-bg-secondary rounded-xl border border-border">
          <span className="text-lg font-bold text-primary block">{timeLeft.days}</span>
          <span className="text-[9px] uppercase font-bold text-text-tertiary">Days</span>
        </div>
        <div className="p-2 bg-bg-secondary rounded-xl border border-border">
          <span className="text-lg font-bold text-primary block">{timeLeft.hours}</span>
          <span className="text-[9px] uppercase font-bold text-text-tertiary">Hours</span>
        </div>
        <div className="p-2 bg-bg-secondary rounded-xl border border-border">
          <span className="text-lg font-bold text-accent block">{timeLeft.mins}</span>
          <span className="text-[9px] uppercase font-bold text-text-tertiary">Mins</span>
        </div>
      </div>
      <p className="text-[11px] text-center text-text-secondary italic font-serif">
        BHMS Part-I University Final Examination Board
      </p>
    </div>
  );
}

// 6. Student Notes Widget
function StudentNotesWidget() {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('curiva_student_dashboard_notes_v1') || 'Example: Lachesis is highly aggravated by sleep (sleeps into an aggravation) & cannot tolerate tight collars around the throat.';
  });

  const handleSave = (val: string) => {
    setNotes(val);
    localStorage.setItem('curiva_student_dashboard_notes_v1', val);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={notes}
        onChange={(e) => handleSave(e.target.value)}
        className="w-full h-24 text-xs p-3 bg-bg-secondary rounded-xl border border-border focus:outline-none focus:border-primary text-text-primary leading-relaxed font-sans"
        placeholder="Type clinical tips or study reminders here..."
      />
      <div className="flex items-center justify-between text-[10px] text-text-tertiary">
        <span>Saves automatically.</span>
        <button onClick={() => handleSave('')} className="hover:text-red-500 font-bold">
          Clear Notes
        </button>
      </div>
    </div>
  );
}

// 7. Knowledge DNA Widget
function KnowledgeDNAWidget() {
  const metrics = [
    { label: 'Anatomy Osteology', val: 90, color: 'bg-blue-500' },
    { label: 'Physiology Renal', val: 75, color: 'bg-purple-500' },
    { label: 'Materia Medica Mineral', val: 55, color: 'bg-rose-500' },
    { label: 'Organon Posology Rules', val: 80, color: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-3.5">
      {metrics.map((m, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-[11px] font-medium text-text-secondary">
            <span>{m.label}</span>
            <span className="font-bold">{m.val}%</span>
          </div>
          <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden">
            <div className={`${m.color} h-full`} style={{ width: `${m.val}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// 8. Quick Search Widget
function QuickSearchWidget({ profileType }: { profileType: DashboardProfileType }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const mockData: Record<DashboardProfileType, string[]> = {
    student: [
      'Anatomy Osteology of Arm & Humerus bones',
      'Physiology Renal glomerulus filtration laws',
      'Materia Medica Sulphur keynotes by Allen',
      'Organon Aphorism 1 to 10 clinical annotations'
    ],
    public: [
      'Gentle Homoeopathy dilution safety details',
      'Chronic sleep hygiene habits and remedies',
      'Hair fall care natural lifestyle methods',
      'Differentiating myth vs physical evidence'
    ],
    practitioner: [
      'Lycopodium and Sulphur complementary links',
      'Chronic posology and Samuel Hahnemann trials',
      'Symptom checker repertorisation weights',
      'Evidence behind nanostructures in remedies'
    ],
    admin: [
      'Website interconnectedness index report',
      'Audit sitemap for orphan clinical pages',
      'Linter validation checklists and diagnostics',
      'Firebase console access settings logs'
    ]
  };

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    const filtered = mockData[profileType].filter(item =>
      item.toLowerCase().includes(val.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="space-y-3 font-sans text-xs">
      <div className="relative">
        <input
          type="text"
          placeholder="Search items..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full p-2.5 pl-8 rounded-xl border border-border bg-bg-secondary focus:outline-none focus:border-primary text-text-primary"
        />
        <Icons.Search className="absolute left-2.5 top-3.5 w-3.5 h-3.5 text-text-tertiary" />
      </div>

      {results.length > 0 ? (
        <div className="p-2 bg-bg-secondary rounded-xl border border-border divide-y divide-border/40 max-h-32 overflow-y-auto">
          {results.map((r, idx) => (
            <div key={idx} className="p-2 text-[11px] text-text-primary hover:text-primary cursor-pointer font-medium">
              🔍 {r}
            </div>
          ))}
        </div>
      ) : query.trim() ? (
        <div className="text-[11px] text-text-tertiary text-center py-2">No matching items found.</div>
      ) : (
        <p className="text-[10px] text-text-tertiary">
          Try searching key terms to test contextual recommendations.
        </p>
      )}
    </div>
  );
}

// 9. Featured Diseases Widget
function FeaturedDiseasesWidget() {
  const diseases = [
    { title: 'Sleep Apnea & Chronic Insomnia', link: '/disease-library/respiratory/sleep-apnea', desc: 'Understanding Homoeostatic breathing triggers and lifestyle rules.' },
    { title: 'Androgenetic Alopecia (Hair Loss)', link: '/read/hair-loss-Homoeopathy', desc: 'Debunking miracle cure claims and analyzing genetic constitutional options.' }
  ];

  return (
    <div className="space-y-3">
      {diseases.map((d, i) => (
        <div key={i} className="p-3 bg-bg-secondary rounded-xl border border-border space-y-1">
          <h6 className="text-xs font-bold text-text-primary">{d.title}</h6>
          <p className="text-[10px] text-text-secondary leading-relaxed">{d.desc}</p>
          <Link to={d.link} className="text-[10px] text-primary font-bold hover:underline block pt-1">
            Read Comprehensive Guide &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
}

// 10. Health Awareness Widget
function HealthAwarenessWidget() {
  const items = [
    { myth: "Homoeopathy acts incredibly slow.", fact: "For acute conditions, matching remedy stimulants trigger immediate cellular responses." },
    { myth: "It's purely placebo/water.", fact: "Ultra-high dilutions preserve molecular structures that trigger biological defense systems." }
  ];

  return (
    <div className="space-y-3 font-sans text-xs">
      {items.map((item, idx) => (
        <div key={idx} className="p-2.5 border border-border rounded-xl space-y-1">
          <span className="text-[9px] font-black bg-red-500/10 text-red-600 px-1.5 py-0.2 rounded">MYTH</span>
          <p className="font-bold text-text-primary text-[11px]">{item.myth}</p>
          <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-600 px-1.5 py-0.2 rounded block w-fit mt-1">EVIDENCE FACT</span>
          <p className="text-text-secondary text-[11px] leading-relaxed">{item.fact}</p>
        </div>
      ))}
    </div>
  );
}

// 11. Lifestyle Tips Widget
function LifestyleTipsWidget() {
  const tips = [
    { title: 'Diaphragmatic Breathing Loops', text: 'Engage 4-7-8 breathing exercises daily to align autonomic nervous response before sleep.' },
    { title: 'Nutritional Scaling', text: 'Prioritize iron, zinc, and biotin proteins rather than expensive commercial hair oils.' }
  ];

  return (
    <div className="space-y-3">
      {tips.map((t, i) => (
        <div key={i} className="p-3 bg-bg-secondary rounded-xl border border-border">
          <h6 className="text-xs font-bold text-text-primary">{t.title}</h6>
          <p className="text-[11px] text-text-secondary leading-relaxed mt-1">{t.text}</p>
        </div>
      ))}
    </div>
  );
}

// 12. Popular Articles Widget
function PopularArticlesWidget() {
  return (
    <div className="space-y-3">
      <Link to="/read/hair-loss-Homoeopathy" className="p-3 bg-bg-secondary hover:bg-primary/5 border border-border rounded-xl flex items-center justify-between transition-all group">
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold text-accent uppercase tracking-wider">EBOOK RESOURCE</span>
          <h6 className="text-xs font-bold text-text-primary group-hover:text-primary">Hair Fall Recovery Guide</h6>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-text-tertiary" />
      </Link>
      <Link to="/public-education" className="p-3 bg-bg-secondary hover:bg-primary/5 border border-border rounded-xl flex items-center justify-between transition-all group">
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">WELLNESS RESOURCE</span>
          <h6 className="text-xs font-bold text-text-primary group-hover:text-primary">The Laymans Safety Manual</h6>
        </div>
        <Icons.ChevronRight className="w-4 h-4 text-text-tertiary" />
      </Link>
    </div>
  );
}

// 13. Bookmarks Widget
function BookmarksWidget() {
  return (
    <div className="space-y-2.5 text-xs text-text-secondary">
      <div className="flex items-center gap-2">
        <Icons.Bookmark className="w-3.5 h-3.5 text-primary fill-primary" />
        <Link to="/disease-library/respiratory/sleep-apnea" className="hover:underline hover:text-primary">
          Sleep Apnea & Insomnia Guide
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Icons.Bookmark className="w-3.5 h-3.5 text-primary fill-primary" />
        <Link to="/materia-medica" className="hover:underline hover:text-primary">
          Lycopodium Clavatum Keynotes
        </Link>
      </div>
    </div>
  );
}

// 14. Clinic & Consultations Widget
function ClinicInfoWidget() {
  const [booked, setBooked] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '' });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.date) {
      setBooked(true);
    }
  };

  return (
    <div className="space-y-3 font-sans text-xs">
      {booked ? (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-center space-y-1">
          <Icons.CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
          <h6 className="font-bold text-emerald-800 dark:text-emerald-300">Appointment Registered</h6>
          <p className="text-[10px] text-text-secondary">Our BHMS review officer will email you confirmation shortly.</p>
          <button onClick={() => setBooked(false)} className="text-[9px] text-primary hover:underline font-bold mt-2">
            Register Another Appointment
          </button>
        </div>
      ) : (
        <form onSubmit={handleBook} className="space-y-2">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 bg-bg-secondary rounded-lg border border-border focus:outline-none focus:border-primary text-text-primary text-[11px]"
          />
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 bg-bg-secondary rounded-lg border border-border focus:outline-none focus:border-primary text-text-primary text-[11px]"
          />
          <button
            type="submit"
            className="w-full py-1.5 bg-primary hover:bg-accent text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all"
          >
            Submit Consultation Request
          </button>
        </form>
      )}
    </div>
  );
}

// 15. Remedy Differentiator Widget
function RemedyComparisonWidget() {
  const remedies = [
    { name: 'Nux Vomica', thermal: 'Aggravated by extreme cold', desires: 'Stimulants, fatty meats, spicy foods', modals: 'Better by warm open air; worse after eating' },
    { name: 'Pulsatilla', thermal: 'Severely aggravated by heat', desires: 'Cold open spaces, fresh cool open air', modals: 'Better by open open air; worse in warm rooms' },
    { name: 'Lachesis', thermal: 'Extremely warm-blooded', desires: 'Oysters, acid drinks, fresh cool air', modals: 'Worse sleeping into aggravation; better with flows' }
  ];

  const [rem1, setRem1] = useState(0);
  const [rem2, setRem2] = useState(1);

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[9px] font-black text-text-tertiary uppercase mb-1">Remedy A</label>
          <select
            value={rem1}
            onChange={(e) => setRem1(Number(e.target.value))}
            className="w-full p-1.5 bg-bg-secondary rounded-lg border border-border text-text-primary text-[11px] font-bold"
          >
            {remedies.map((r, i) => (
              <option key={i} value={i}>{r.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[9px] font-black text-text-tertiary uppercase mb-1">Remedy B</label>
          <select
            value={rem2}
            onChange={(e) => setRem2(Number(e.target.value))}
            className="w-full p-1.5 bg-bg-secondary rounded-lg border border-border text-text-primary text-[11px] font-bold"
          >
            {remedies.map((r, i) => (
              <option key={i} value={i}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/40">
        <div className="space-y-2">
          <h6 className="font-bold text-primary">{remedies[rem1].name}</h6>
          <p className="text-[10px] text-text-secondary"><strong>Thermal:</strong> {remedies[rem1].thermal}</p>
          <p className="text-[10px] text-text-secondary"><strong>Desires:</strong> {remedies[rem1].desires}</p>
          <p className="text-[10px] text-text-secondary"><strong>Modals:</strong> {remedies[rem1].modals}</p>
        </div>
        <div className="space-y-2 border-l border-border/40 pl-4">
          <h6 className="font-bold text-accent">{remedies[rem2].name}</h6>
          <p className="text-[10px] text-text-secondary"><strong>Thermal:</strong> {remedies[rem2].thermal}</p>
          <p className="text-[10px] text-text-secondary"><strong>Desires:</strong> {remedies[rem2].desires}</p>
          <p className="text-[10px] text-text-secondary"><strong>Modals:</strong> {remedies[rem2].modals}</p>
        </div>
      </div>
    </div>
  );
}

// 16. Clinical Case Totality Widget
function ClinicalCaseTotalityWidget() {
  const [symptoms, setSymptoms] = useState([
    { name: 'Aggravation during sleep', checked: false, weight: 3 },
    { name: 'Desires refreshing acid drinks', checked: false, weight: 2 },
    { name: 'Thermal open open air desires', checked: false, weight: 3 },
    { name: 'Left-sided conditions', checked: false, weight: 2 }
  ]);

  const toggleSymptom = (index: number) => {
    const updated = [...symptoms];
    updated[index].checked = !updated[index].checked;
    setSymptoms(updated);
  };

  // Simple weighted candidate calculation
  let candidate = 'Awaiting symptom checks...';
  const checkedCount = symptoms.filter(s => s.checked).length;
  if (checkedCount > 0) {
    const isLachesisMatch = symptoms[0].checked && symptoms[3].checked;
    const isPulsMatch = symptoms[1].checked && symptoms[2].checked;
    if (isLachesisMatch) {
      candidate = 'Lachesis Clavatum (Match Score: High)';
    } else if (isPulsMatch) {
      candidate = 'Pulsatilla Pratensis (Match Score: Medium)';
    } else {
      candidate = 'Sulphur / Lycopodium (Consolidated Totality)';
    }
  }

  return (
    <div className="space-y-3 font-sans text-xs">
      <p className="text-[10px] text-text-tertiary">Select patient constitutional symptom nodes:</p>
      <div className="space-y-1.5">
        {symptoms.map((s, idx) => (
          <label key={idx} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-bg-secondary rounded-lg">
            <input
              type="checkbox"
              checked={s.checked}
              onChange={() => toggleSymptom(idx)}
              className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
            />
            <span className="text-text-primary text-[11px] font-medium">{s.name} (wt: {s.weight})</span>
          </label>
        ))}
      </div>

      <div className="mt-2 p-2 bg-primary/5 border border-primary/10 rounded-xl text-center">
        <span className="text-[9px] font-black text-text-tertiary uppercase block">Candidate Simillimum</span>
        <span className="font-bold text-primary text-[11px] block mt-0.5">{candidate}</span>
      </div>
    </div>
  );
}

// 17. Evidence Research Widget
function EvidenceResearchWidget() {
  const articles = [
    { title: 'Cytotoxicity testing of high potencies in vitro', journal: 'Heal Res Journal, 2025' },
    { title: 'The nanostructured mechanisms of Materia Medica', journal: 'NanoMed Int, 2026' }
  ];

  return (
    <div className="space-y-3">
      {articles.map((art, idx) => (
        <div key={idx} className="p-3 bg-bg-secondary rounded-xl border border-border space-y-1">
          <span className="text-[8px] font-black bg-purple-500/10 text-purple-600 px-1.5 py-0.2 rounded uppercase">
            PEER REVIEWED
          </span>
          <h6 className="text-xs font-bold text-text-primary">{art.title}</h6>
          <p className="text-[10px] text-text-tertiary font-medium">{art.journal}</p>
        </div>
      ))}
    </div>
  );
}

// 18. Clinical Diary Widget
function ClinicalDiaryWidget() {
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const handleAdd = () => {
    if (note.trim()) {
      setLogs([note.trim(), ...logs]);
      setNote('');
    }
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New clinical observation..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="flex-grow p-2 bg-bg-secondary rounded-lg border border-border focus:outline-none focus:border-primary text-text-primary text-[11px]"
        />
        <button onClick={handleAdd} className="px-3 bg-primary text-white rounded-lg font-bold text-[10px] uppercase">
          Add
        </button>
      </div>

      {logs.length > 0 && (
        <div className="space-y-1.5 max-h-24 overflow-y-auto">
          {logs.map((l, i) => (
            <div key={i} className="p-2 bg-bg-secondary rounded-lg border border-border/40 text-[10px] leading-relaxed text-text-primary font-medium">
              &bull; {l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 19. Saved Cases Widget
function SavedCasesWidget() {
  const cases = [
    { id: 'CASE-81204', state: 'Respiratory/Apnea', candidate: 'Lachesis 200C', date: 'Jul 24, 2026' },
    { id: 'CASE-90511', state: 'Dermatological/Alopecia', candidate: 'Sulphur 30C', date: 'Jul 22, 2026' }
  ];

  return (
    <div className="space-y-3 font-sans text-xs">
      {cases.map((c, i) => (
        <div key={i} className="p-3 bg-bg-secondary rounded-xl border border-border flex justify-between items-center">
          <div className="space-y-0.5">
            <h6 className="font-bold text-text-primary">{c.id}</h6>
            <p className="text-[10px] text-text-tertiary font-medium">{c.state} &bull; {c.candidate}</p>
          </div>
          <span className="text-[10px] text-text-tertiary font-mono">{c.date}</span>
        </div>
      ))}
    </div>
  );
}

// 20. Website Analytics Widget
function WebsiteAnalyticsWidget() {
  const data = [
    { day: 'Mon', visitors: 1450 },
    { day: 'Tue', visitors: 1680 },
    { day: 'Wed', visitors: 1890 },
    { day: 'Thu', visitors: 2100 },
    { day: 'Fri', visitors: 1750 },
    { day: 'Sat', visitors: 1220 },
    { day: 'Sun', visitors: 1390 }
  ];

  const maxVal = Math.max(...data.map(d => d.visitors));

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="grid grid-cols-2 gap-2 text-center mb-2">
        <div className="p-2 bg-bg-secondary rounded-xl border border-border">
          <span className="text-sm font-bold text-primary block">11,480</span>
          <span className="text-[9px] text-text-tertiary uppercase font-black">Weekly Visitors</span>
        </div>
        <div className="p-2 bg-bg-secondary rounded-xl border border-border">
          <span className="text-sm font-bold text-emerald-600 block">99.98%</span>
          <span className="text-[9px] text-text-tertiary uppercase font-black">Sitemap Coverage</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Traffic Load Matrix</span>
        <div className="flex items-end justify-between h-20 pt-2 bg-bg-secondary/40 rounded-xl px-3 border border-border/60">
          {data.map((d, i) => {
            const hPct = (d.visitors / maxVal) * 100;
            return (
              <div key={i} className="flex flex-col items-center flex-grow space-y-1">
                <div
                  className="bg-primary hover:bg-accent rounded-t w-4 transition-all duration-500"
                  style={{ height: `${hPct * 0.6}px` }}
                  title={`${d.visitors} Visitors`}
                />
                <span className="text-[9px] font-mono text-text-tertiary">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 21. Publishing Queue Widget
function PublishingQueueWidget() {
  const queue = [
    { title: 'Ferrum Metallicum Repertory Rubrics', status: 'In Review', author: 'Dr. Prem' },
    { title: 'The 3 Chronic Miasms Comparative Handbook', status: 'Drafting', author: 'A. Roy' }
  ];

  return (
    <div className="space-y-3 font-sans text-xs">
      {queue.map((item, idx) => (
        <div key={idx} className="p-2.5 bg-bg-secondary rounded-xl border border-border flex justify-between items-center">
          <div className="space-y-0.5">
            <h6 className="font-bold text-text-primary">{item.title}</h6>
            <p className="text-[10px] text-text-tertiary">By {item.author}</p>
          </div>
          <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
            item.status === 'In Review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

// 22. Broken Links Widget
function BrokenLinksWidget() {
  return (
    <div className="space-y-3 font-sans text-xs">
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
        <Icons.CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
        <div>
          <h6 className="font-bold text-emerald-800 dark:text-emerald-300">Sitemap Validation Complete</h6>
          <p className="text-[10px] text-text-secondary">All internal links fully connected. Orphan pages: 0.</p>
        </div>
      </div>
    </div>
  );
}

// 23. SEO Health Widget
function SEOHealthWidget() {
  const audits = [
    { label: 'Canonical schema structures', passed: true },
    { label: 'Responsive viewpoint scale metrics', passed: true },
    { label: 'Contrast access ratio WCAG AA', passed: true }
  ];

  return (
    <div className="space-y-2.5 font-sans text-xs">
      <div className="flex justify-between items-center">
        <span className="font-bold text-text-primary">SEO Accessibility Score</span>
        <span className="font-mono font-black text-emerald-600 text-sm">100 / 100</span>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-border/40">
        {audits.map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-text-secondary text-[11px] font-medium">
            <Icons.Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 24. System Logs Widget
function SystemLogsWidget() {
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Boot sequence successfully verified on port 3000.',
    '[FIRESTORE] Connected to user credentials pool: ai-studio-e06b5033.',
    '[REDUX] State synced: curiva_selected_role=Guest.',
    '[LINTER] Validation successfully completed: tsc --noEmit (0 warnings).'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        'Syncing localStorage presets.',
        'Access granted to Administrator payload.',
        'Route changed to landing.',
        'Widget pinned state updated.'
      ];
      const random = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date().toLocaleTimeString();
      setLogs(prev => [`[${now}] ${random}`, ...prev.slice(0, 5)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="bg-black text-green-400 p-3 rounded-xl font-mono text-[9px] space-y-1.5 h-28 overflow-y-auto leading-normal">
        {logs.map((log, idx) => (
          <div key={idx} className="truncate select-none">
            {log}
          </div>
        ))}
      </div>
      <span className="text-[8px] text-text-tertiary block text-right font-mono">Consoles refresh dynamically.</span>
    </div>
  );
}
