import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { db, doc, setDoc } from '../lib/firebase';
import { userService } from '../services/userService';

export type UserRole = 
  | 'Guest' 
  | 'Public' 
  | 'General Public'
  | 'BHMS Student'
  | '1st BHMS'
  | '2nd BHMS'
  | '3rd BHMS'
  | '4th BHMS' 
  | '1st Year Student'
  | '2nd Year Student'
  | '3rd Year Student'
  | '4th Year Student'
  | 'Internship Student'
  | 'Intern' 
  | 'Practitioner' 
  | 'Faculty' 
  | 'Researcher' 
  | 'Administrator';

export interface QuickAction {
  label: string;
  to: string;
  icon: string;
  description: string;
}

export interface RecommendedResource {
  title: string;
  link: string;
  type: 'PDF' | 'eBook' | 'Syllabus' | 'Case Log' | 'Tool';
  size?: string;
  badge?: string;
  description: string;
}

export interface RoleNotification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'academic' | 'alert' | 'clinical';
  date: string;
}

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  authorizedRoles: UserRole[];
  onboardingCompleted: boolean;
  completeOnboarding: (selectedRole: UserRole) => void;
  hasAccess: (allowedRoles: UserRole[]) => boolean;
  getQuickActions: () => QuickAction[];
  getRecommendations: () => RecommendedResource[];
  getNotifications: () => RoleNotification[];
  getTone: () => 'simple' | 'academic' | 'clinical' | 'research';
  getPersonalizedSearchDefaults: () => string[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useUser();
  const [currentRole, setCurrentRoleState] = useState<UserRole>('Guest');
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
  const [authorizedRoles, setAuthorizedRoles] = useState<UserRole[]>(['Guest', 'Public']);

  // Load from profile or localStorage
  useEffect(() => {
    const allRoles: UserRole[] = [
      'Guest', 'Public', 'BHMS Student', 'Intern', 'Practitioner', 'Faculty', 'Researcher', 'Administrator'
    ];

    if (profile) {
      // Sync with signed-in profile profession/role
      const profileProf = profile.profession;
      let matchedRole: UserRole = 'Guest';
      
      if (profileProf) {
        const lowerProf = profileProf.toLowerCase();
        if (lowerProf.includes('admin')) matchedRole = 'Administrator';
        else if (lowerProf.includes('faculty') || lowerProf.includes('teacher')) matchedRole = 'Faculty';
        else if (lowerProf.includes('research')) matchedRole = 'Researcher';
        else if (lowerProf.includes('practitioner') || lowerProf.includes('doctor')) matchedRole = 'Practitioner';
        else if (lowerProf.includes('intern')) matchedRole = 'Intern';
        else if (lowerProf.includes('student') || lowerProf.includes('bhms')) matchedRole = 'BHMS Student';
        else if (lowerProf.includes('public') || lowerProf.includes('user') || lowerProf.includes('patient')) matchedRole = 'Public';
      }

      setCurrentRoleState(matchedRole);
      setOnboardingCompleted(true);
      setAuthorizedRoles(allRoles);
    } else {
      // Guest local-storage state
      const savedRole = localStorage.getItem('curiva_selected_role') as UserRole;
      const completed = localStorage.getItem('curiva_onboarding_completed') === 'true';
      
      if (savedRole) {
        setCurrentRoleState(savedRole);
      }
      setOnboardingCompleted(completed);
      setAuthorizedRoles(allRoles);
    }
  }, [profile]);

  const setCurrentRole = async (role: UserRole) => {
    setCurrentRoleState(role);
    localStorage.setItem('curiva_selected_role', role);

    // Persist to user profile if signed in
    if (profile && profile.uid) {
      try {
        await userService.updateProfession(role);
      } catch (e) {
        console.error('Error saving role selection:', e);
      }
    }
  };

  const completeOnboarding = (selectedRole: UserRole) => {
    setOnboardingCompleted(true);
    setCurrentRole(selectedRole);
    localStorage.setItem('curiva_onboarding_completed', 'true');
  };

  const hasAccess = (allowedRoles: UserRole[]) => {
    if (allowedRoles.includes('Guest')) return true;
    if (currentRole === 'Administrator') return true;
    return allowedRoles.includes(currentRole);
  };

  const getTone = (): 'simple' | 'academic' | 'clinical' | 'research' => {
    switch (currentRole) {
      case 'Public':
      case 'Guest':
        return 'simple';
      case 'BHMS Student':
      case 'Faculty':
        return 'academic';
      case 'Intern':
      case 'Practitioner':
        return 'clinical';
      case 'Researcher':
      case 'Administrator':
        return 'research';
      default:
        return 'academic';
    }
  };

  const getQuickActions = (): QuickAction[] => {
    switch (currentRole) {
      case 'Public':
      case 'Guest':
        return [
          { label: 'Public Health Library', to: '/public-education', icon: 'Globe', description: 'Understand Homoeopathic safe usages, dilutions, and scientific facts.' },
          { label: 'Patient Wellness eBooks', to: '/ebooks', icon: 'BookMarked', description: 'Download free reference eBooks for hair care and sleep hygiene.' },
          { label: 'Ask a Homoeopath', to: '/ask-Homoeopath', icon: 'HelpCircle', description: 'Submit questions directly to registered BHMS professionals.' }
        ];
      case 'BHMS Student':
        return [
          { label: '1st BHMS Exam Prep', to: '/first-bhms-crash-course', icon: 'Sparkles', description: 'Flagship revision guide for 1st BHMS university papers.' },
          { label: 'Syllabus Tracker', to: '/cbdc-syllabus', icon: 'Compass', description: 'Verify NCH competency targets and hours maps.' },
          { label: 'MCQ Practice Arena', to: '/mcq-practice', icon: 'Award', description: 'Take simulated quizzes for college finals and AIAPGET entrance exams.' },
          { label: 'Anatomy Regional Library', to: '/anatomy', icon: 'BookOpen', description: 'Review high-yield osteology and organs clinical diagrams.' }
        ];
      case 'Intern':
        return [
          { label: 'Symptom Repertorization', to: '/symptom-checker', icon: 'Cpu', description: 'Input symptoms and weigh Kent rubrics for simillimum matching.' },
          { label: 'CBC Blood Report Analyzer', to: '/cbc-handbook', icon: 'Activity', description: 'Differentiate systemic pathologies and link reports to miasms.' },
          { label: 'Log Clinical Case Totality', to: '/profile', icon: 'ClipboardList', description: 'Maintain your portfolios of mock patient consultations.' },
          { label: 'Clinical Diagnostic Handbook', to: '/clinical-handbook', icon: 'FileText', description: 'Verify diagnosis guidelines for 15 primary clinical states.' }
        ];
      case 'Practitioner':
        return [
          { label: 'Remedy Comparative Matrix', to: '/analysis', icon: 'Cpu', description: 'Surgically evaluate sister remedy characteristics side-by-side.' },
          { label: 'Miasms Encyclopedia', to: '/miasms', icon: 'GraduationCap', description: 'Deep-dive into fundamental chronic Psora, Sycosis, and Syphilis.' },
          { label: 'Pathology therapeutics Index', to: '/clinical-guides', icon: 'Stethoscope', description: 'Map conditions to high-yield clinical therapeutic remedies.' }
        ];
      case 'Faculty':
        return [
          { label: 'Lesson Planner', to: '/cbdc-syllabus', icon: 'Compass', description: 'Review hours, teaching topics, and lectures per BHMS syllabus.' },
          { label: 'Interactive Remedy Maps', to: '/visualization', icon: 'Activity', description: 'Share dynamic visual connection models during classes.' },
          { label: 'Academic MCQ Compiler', to: '/mcq-practice', icon: 'Award', description: 'Select question categories for collegiate assessments.' },
          { label: 'University Exam PYQs Hub', to: '/student-resources', icon: 'FileText', description: 'Access solved previous year question sheets and answer matrices.' }
        ];
      case 'Researcher':
        return [
          { label: 'Miasms & Pathologies', to: '/miasms', icon: 'Cpu', description: 'Audit drug affinity lists and complex miasmatic links.' },
          { label: 'Miasm Systemic Pathologies', to: '/miasms', icon: 'BookOpen', description: 'Study miasmatic correlations with modern cytopathology.' },
          { label: 'Evidence-Based Case Logs', to: '/profile', icon: 'ClipboardList', description: 'Review and evaluate simulated clinical portfolios.' },
          { label: 'Stalwarts Clinical Trials', to: '/stalwarts', icon: 'GraduationCap', description: 'Examine detailed cure methodologies of classical masters.' }
        ];
      case 'Administrator':
        return [
          { label: 'Knowledge Graph & Link Audit', to: '/admin/link-audit', icon: 'Network', description: 'Map the interconnected website ontology and eliminate orphan pages.' },
          { label: 'Simulated Case Registry', to: '/profile', icon: 'ClipboardList', description: 'Review and audit clinical totality logs saved across users.' },
          { label: 'Course Curriculum Builder', to: '/cbdc-syllabus', icon: 'Compass', description: 'Manage NCH CBDC syllabus modules and teaching parameters.' },
          { label: 'Portal Analytics Dashboard', to: '/profile', icon: 'Activity', description: 'Audit security rules, access, and overall site traffic.' }
        ];
      default:
        return [];
    }
  };

  const getRecommendations = (): RecommendedResource[] => {
    switch (currentRole) {
      case 'Public':
      case 'Guest':
        return [
          { title: 'The Layman\'s Guide to Homoeopathy', link: '/public-education', type: 'eBook', description: 'An introductory handbook demystifying dilutions and safe practices.' },
          { title: 'Hair Fall Care and Remedies Handbook', link: '/ebooks/hair-fall', type: 'eBook', description: 'A patient education eBook mapping healthy lifestyle tips and safe natural remedies.' }
        ];
      case 'BHMS Student':
        return [
          { title: '1st BHMS Exam Study Planner', link: '/first-bhms-crash-course', type: 'Syllabus', badge: 'Flagship', description: 'Curated 60-day calendar tracking Anatomy, Physiology, and Pharmacy.' },
          { title: 'AIAPGET Entrance Mock Papers', link: '/mcq-practice', type: 'Tool', badge: 'Practice', description: 'Solved previous entrance test boards with rationale explanations.' }
        ];
      case 'Intern':
        return [
          { title: 'CBC Diagnostic Handbook & Miasm Map', link: '/cbc-handbook', type: 'Tool', badge: 'High Yield', description: 'A clinical checklist explaining lab indices and constitutional mapping.' },
          { title: 'Acute Totality Interview Sheet', link: '/symptom-checker', type: 'Case Log', description: 'Standard case-taking proforma following Kentian repertory rubrics.' }
        ];
      case 'Practitioner':
        return [
          { title: 'Posology and Chronic Miasmatic Prescribing', link: '/miasms', type: 'PDF', badge: 'Advanced', description: 'Deep study of Samuel Hahnemann\'s chronic disease management rules.' },
          { title: 'Remedy Comparative Matrix Map', link: '/analysis', type: 'Tool', description: 'Surgically compare modality, keynotes, and characteristics.' }
        ];
      case 'Faculty':
        return [
          { title: 'CBDC Teaching Schedule Templates', link: '/cbdc-syllabus', type: 'Syllabus', badge: 'Curriculum', description: 'Structured teaching models aligned with NCH Guidelines.' },
          { title: 'Comparative Materia Medica Lecture Guides', link: '/analysis', type: 'PDF', description: 'Printable side-by-side matrices for classroom comparison.' }
        ];
      case 'Researcher':
        return [
          { title: 'Scientific Proofs of High Dilutions', link: '/public-education', type: 'PDF', badge: 'Evidence', description: 'Meta-analysis of clinical trials on ultra-high Homoeopathic dilutions.' },
          { title: 'Repertory rubric Concordance Index', link: '/symptom-checker', type: 'Tool', description: 'Audit mathematical models used behind Kent repertory calculations.' }
        ];
      case 'Administrator':
        return [
          { title: 'Website Interconnectedness Sitemaps', link: '/admin/link-audit', type: 'Tool', badge: 'Core System', description: 'Detailed knowledge graph visual mapping sitemaps and pages.' },
          { title: 'Firestore Security Rules Audit Spec', link: '/profile', type: 'Tool', description: 'Review granular collection schemas and email-based administration overrides.' }
        ];
      default:
        return [];
    }
  };

  const getNotifications = (): RoleNotification[] => {
    switch (currentRole) {
      case 'Public':
      case 'Guest':
        return [
          { id: 'n1', title: 'New Wellness eBook Available', content: 'Our pediatric care safety guidelines eBook is now open for public reading.', type: 'info', date: 'Just Now' }
        ];
      case 'BHMS Student':
        return [
          { id: 'n2', title: 'viva Booster Released', content: '1st BHMS Oral Viva simulator files are now added to the Crash Course hub.', type: 'academic', date: '5 min ago' },
          { id: 'n3', title: 'University Exam Alert', content: 'Collegiate exam dates for Anatomy & Physiology theory are tentatively updated.', type: 'alert', date: '2 hours ago' }
        ];
      case 'Intern':
        return [
          { id: 'n4', title: 'Symptom Repertorization Update', content: 'Added 12 new polychrest rubrics for respiratory conditions to the symptom checker.', type: 'clinical', date: '1 hour ago' },
          { id: 'n5', title: 'Clinical Log Saved', content: 'Case study CASE-81204 has been successfully uploaded to your cloud portfolio.', type: 'info', date: '1 day ago' }
        ];
      case 'Practitioner':
        return [
          { id: 'n6', title: 'Comparative Analysis Matrix Update', content: 'New comparative rubrics for mineral kingdom remedies are now active in the analyzer.', type: 'clinical', date: '30 min ago' },
          { id: 'n7', title: 'Miasm Pathological Concordance', content: 'Check the latest evidence linking Sycosic miasms to modern infiltrative lab values.', type: 'clinical', date: '1 day ago' }
        ];
      case 'Faculty':
        return [
          { id: 'n8', title: 'CBDC Syllabus Guidelines Aligned', content: 'Lesson planners now support interactive hour trackers per year guidelines.', type: 'academic', date: 'Just Now' }
        ];
      case 'Researcher':
        return [
          { id: 'n9', title: 'Homoeopathic Dilutions Clinical Review', content: 'Newly released peer-reviewed paper uploaded to high-dilution research repository.', type: 'info', date: '3 hours ago' }
        ];
      case 'Administrator':
        return [
          { id: 'n10', title: 'Knowledge Graph Health Report', content: 'Audit complete: No orphan pages detected. Links coverage at 100%.', type: 'alert', date: '10 min ago' },
          { id: 'n11', title: 'User Registrations Updated', content: 'Registered portfolio database synchronizations are operating at peak health.', type: 'info', date: '1 hour ago' }
        ];
      default:
        return [];
    }
  };

  const getPersonalizedSearchDefaults = (): string[] => {
    switch (currentRole) {
      case 'Public':
      case 'Guest':
        return [
          'Safety of Homoeopathic remedies',
          'Homoeopathy scientific validity',
          'Pediatric wellness tips',
          'What to expect in consultation'
        ];
      case 'BHMS Student':
        return [
          'Anatomy osteology guides',
          'Physiology cellular vital actions',
          'Materia Medica Sulphur Allen Keynotes',
          'Organon Aphorism 1 to 20 lectures'
        ];
      case 'Intern':
        return [
          'Kent repertorization rubrics',
          'CBC miasm report mapping',
          'Acute therapeutic keynotes',
          'Clinical condition diagnosis simulators'
        ];
      case 'Practitioner':
        return [
          'Lycopodium vs Sulphur comparison',
          'Complementary remedy concordances',
          'Psora miasm chronic posology',
          'Gynaecological therapeutics index'
        ];
      case 'Faculty':
        return [
          'NCH CBDC hour distribution',
          'Lesson planning templates',
          'Collegiate mock exams builder',
          'Solved past year papers keys'
        ];
      case 'Researcher':
        return [
          'Peer reviewed clinical trials',
          'High dilution nanostructure proofs',
          'Drug proving historical records',
          'Pathological miasms correlations'
        ];
      case 'Administrator':
        return [
          'Knowledge graph connectivity',
          'Internal link audit logs',
          'Granular access permissions',
          'Database kit logging analytics'
        ];
      default:
        return ['Materia Medica', 'Remedy comparison', 'Symptom Repertory'];
    }
  };

  return (
    <RoleContext.Provider value={{
      currentRole,
      setCurrentRole,
      authorizedRoles,
      onboardingCompleted,
      completeOnboarding,
      hasAccess,
      getQuickActions,
      getRecommendations,
      getNotifications,
      getTone,
      getPersonalizedSearchDefaults
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
