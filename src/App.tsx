import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { useReading } from './context/ReadingContext';
import ReadingProgressBar from './components/ReadingProgressBar';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import RouteScrollToTop from './components/RouteScrollToTop';
import ScrollToTop from './components/ScrollToTop';
import { Loader2 } from 'lucide-react';

function lazyLoad<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      console.warn('Dynamic import failed, retrying...', error);
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        return await factory();
      } catch (retryError) {
        const key = 'curiva_chunk_reload_timestamp';
        const lastReload = sessionStorage.getItem(key);
        if (!lastReload || Date.now() - Number(lastReload) > 10000) {
          sessionStorage.setItem(key, String(Date.now()));
          window.location.reload();
        }
        throw retryError;
      }
    }
  });
}

const Home = lazyLoad(() => import('./pages/Home'));
const Articles = lazyLoad(() => import('./pages/Articles'));
const CategoriesPage = lazyLoad(() => import('./pages/CategoriesPage'));
const About = lazyLoad(() => import('./pages/About'));
const PrivacyPolicy = lazyLoad(() => import('./pages/PrivacyPolicy'));
const MedicalDisclaimer = lazyLoad(() => import('./pages/MedicalDisclaimer'));
const Contact = lazyLoad(() => import('./pages/Contact'));
const TermsOfService = lazyLoad(() => import('./pages/TermsOfService'));
const AilmentDetail = lazyLoad(() => import('./pages/AilmentDetail'));
const ComparisonTool = lazyLoad(() => import('./pages/ComparisonTool'));
const RepertoryTool = lazyLoad(() => import('./pages/RepertoryTool'));
const Encyclopedia = lazyLoad(() => import('./pages/Encyclopedia'));
const FAQPage = lazyLoad(() => import('./pages/FAQPage'));
const TreatmentsPage = lazyLoad(() => import('./pages/TreatmentsPage'));
const MythsAndFacts = lazyLoad(() => import('./pages/MythsAndFacts'));
const UnderstandingHomoeopathy = lazyLoad(() => import('./pages/UnderstandingHomoeopathy'));
const ConditionDetail = lazyLoad(() => import('./pages/ConditionDetail'));
const RemedyDetail = lazyLoad(() => import('./pages/RemedyDetail'));
const OrganonMedicine = lazyLoad(() => import('./pages/OrganonMedicine'));
const ResourceStore = lazyLoad(() => import('./pages/ResourceStore'));
const MyLibrary = lazyLoad(() => import('./pages/MyLibrary'));
const StudentResources = lazyLoad(() => import('./pages/StudentResources'));
const StudyTool = lazyLoad(() => import('./pages/StudyTool'));
const Stalwarts = lazyLoad(() => import('./pages/Stalwarts'));
const Profile = lazyLoad(() => import('./pages/Profile'));
const Auth = lazyLoad(() => import('./pages/Auth'));
const MCQPractice = lazyLoad(() => import('./pages/MCQPractice'));
const ClinicalGuides = lazyLoad(() => import('./pages/ClinicalGuides'));
const DiseaseHub = lazyLoad(() => import('./pages/DiseaseHub'));
const SymptomChecker = lazyLoad(() => import('./pages/SymptomChecker'));
const HairFallGuide = lazyLoad(() => import('./pages/HairFallGuide'));
const Miasms = lazyLoad(() => import('./pages/Miasms'));
const PublicEducation = lazyLoad(() => import('./pages/PublicEducation'));
const PublicHealthEBook = lazyLoad(() => import('./pages/PublicHealthEBook'));
const CbcHandbook = lazyLoad(() => import('./pages/CbcHandbook'));
const ClinicalHandbook = lazyLoad(() => import('./pages/ClinicalHandbook'));
const CbdcSyllabus = lazyLoad(() => import('./pages/CbdcSyllabus'));
const AnatomyLibrary = lazyLoad(() => import('./pages/AnatomyLibrary'));
const AnatomyTopicDetail = lazyLoad(() => import('./pages/AnatomyTopicDetail'));
const PhysiologyLibrary = lazyLoad(() => import('./pages/PhysiologyLibrary'));
const PhysiologyTopicDetail = lazyLoad(() => import('./pages/PhysiologyTopicDetail'));
const FmtLibrary = lazyLoad(() => import('./pages/FmtLibrary'));
const FmtTopicDetail = lazyLoad(() => import('./pages/FmtTopicDetail'));
const AskHomoeopath = lazyLoad(() => import('./pages/AskHomoeopath'));
const FirstBhmsCrashCourse = lazyLoad(() => import('./pages/FirstBhmsCrashCourse'));
const AdminLinkAudit = lazyLoad(() => import('./pages/AdminLinkAudit'));
const ComingSoon = lazyLoad(() => import('./pages/ComingSoon'));
const NotFound = lazyLoad(() => import('./pages/NotFound'));

// New Subject & Feature Pages
const MateriaMedicaSubject = lazyLoad(() => import('./pages/MateriaMedicaSubject'));
const RepertorySubject = lazyLoad(() => import('./pages/RepertorySubject'));
const PharmacySubject = lazyLoad(() => import('./pages/PharmacySubject'));
const PathologySubject = lazyLoad(() => import('./pages/PathologySubject'));
const SurgerySubject = lazyLoad(() => import('./pages/SurgerySubject'));
const GynecologyObstetricsSubject = lazyLoad(() => import('./pages/GynecologyObstetricsSubject'));
const PracticeOfMedicineSubject = lazyLoad(() => import('./pages/PracticeOfMedicineSubject'));
const CellInjuryMasterPage = lazyLoad(() => import('./pages/CellInjuryMasterPage'));
const UniversityBlueprints = lazyLoad(() => import('./pages/UniversityBlueprints'));
const FlashcardsPage = lazyLoad(() => import('./pages/FlashcardsPage'));
const AiapgetMcqSimulator = lazyLoad(() => import('./pages/AiapgetMcqSimulator'));
const ClinicalTherapeuticsPage = lazyLoad(() => import('./pages/ClinicalTherapeuticsPage'));

// New Syllabus Portals
const FirstBhmsPortal = lazyLoad(() => import('./pages/FirstBhmsPortal'));
const SecondBhmsPortal = lazyLoad(() => import('./pages/SecondBhmsPortal'));
const ThirdBhmsPortal = lazyLoad(() => import('./pages/ThirdBhmsPortal'));
const FourthBhmsPortal = lazyLoad(() => import('./pages/FourthBhmsPortal'));

import MedicalDisclaimerModal from './components/MedicalDisclaimerModal';
import Logo from './components/Logo';
import FloatingQuickActions from './components/FloatingQuickActions';

function LoadingScreen() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-6">
       <div className="relative">
         <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-125 animate-pulse" />
         <motion.div
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
           className="w-20 h-20 rounded-full border-2 border-primary/10 border-t-primary"
         />
         <div className="absolute inset-0 flex items-center justify-center">
           <Logo size="xs" className="scale-110 transform pointer-events-none select-none" />
         </div>
       </div>
       <div className="text-center space-y-1">
         <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
           Loading Content
         </h4>
         <div className="w-12 h-1 bg-primary/10 rounded-full mx-auto overflow-hidden relative">
           <motion.div
             initial={{ left: "-100%" }}
             animate={{ left: "100%" }}
             transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
             className="absolute inset-y-0 w-1/2 bg-primary rounded-full"
           />
         </div>
       </div>
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const readingContext = useReading();

  const isReaderPage = 
    location.pathname.includes('/remedy/') ||
    location.pathname.includes('/read/') ||
    location.pathname.includes('/materia-medica') ||
    location.pathname.includes('/anatomy') ||
    location.pathname.includes('/physiology') ||
    location.pathname.includes('/fmt') ||
    location.pathname.includes('/clinical-guides') ||
    location.pathname.includes('/miasms') ||
    location.pathname.includes('/syllabus') ||
    location.pathname.includes('/subject/') ||
    location.pathname.includes('/portal/') ||
    location.pathname.includes('/handbook') ||
    location.pathname.includes('/disclaimer') ||
    location.pathname.includes('/privacy-policy') ||
    location.pathname.includes('/terms-of-service');

  const { fontSize, readingWidth, lineSpacing, readerTheme } = readingContext;

  const getFontSizeClass = (sz: typeof fontSize) => {
    switch (sz) {
      case 'sm': return 'text-sm [&_p]:text-sm [&_li]:text-sm [&_h2]:text-2xl [&_h3]:text-xl [&_div]:text-sm';
      case 'md': return 'text-base [&_p]:text-base [&_li]:text-base [&_h2]:text-3xl [&_h3]:text-2xl';
      case 'lg': return 'text-lg [&_p]:text-lg [&_li]:text-lg [&_h2]:text-4xl [&_h3]:text-3xl';
      case 'xl': return 'text-xl [&_p]:text-xl [&_li]:text-xl [&_h2]:text-5xl [&_h3]:text-4xl';
    }
  };

  const getWidthClass = (w: typeof readingWidth) => {
    switch (w) {
      case 'narrow': return '[&_p]:max-w-2xl [&_li]:max-w-2xl [&_p]:mx-auto [&_li]:mx-auto';
      case 'medium': return '[&_p]:max-w-4xl [&_li]:max-w-4xl [&_p]:mx-auto [&_li]:mx-auto';
      case 'wide': return '[&_p]:max-w-full [&_li]:max-w-full';
    }
  };

  const getLineSpacingClass = (ls: typeof lineSpacing) => {
    switch (ls) {
      case 'compact': return '[&_p]:leading-normal [&_li]:leading-normal';
      case 'normal': return '[&_p]:leading-relaxed [&_li]:leading-relaxed';
      case 'relaxed': return '[&_p]:leading-loose [&_li]:leading-loose';
    }
  };

  const getThemeClass = (t: typeof readerTheme) => {
    switch (t) {
      case 'sepia': return 'bg-[#FAF6EE] dark:bg-[#FAF6EE] text-[#433422] dark:text-[#433422] p-4 md:p-10 rounded-[2rem] border border-[#E9DFCB] shadow-inner [&_.text-text-primary]:text-[#433422] [&_.text-text-secondary]:text-[#5C4B37] [&_.text-text-tertiary]:text-[#7A6B56] [&_.bg-white]:bg-[#F4EFE6] [&_.border-border]:border-[#DFD3C3]';
      case 'dark-contrast': return 'bg-[#121212] dark:bg-[#121212] text-[#F1F1F1] dark:text-[#F1F1F1] p-4 md:p-10 rounded-[2rem] border border-zinc-800 shadow-inner [&_.text-text-primary]:text-[#F1F1F1] [&_.text-text-secondary]:text-[#A0A0A0] [&_.text-text-tertiary]:text-[#707070] [&_.bg-white]:bg-[#1E1E1E] [&_.border-border]:border-zinc-800';
      default: return '';
    }
  };

  const readerClasses = isReaderPage 
    ? `${getFontSizeClass(fontSize)} ${getWidthClass(readingWidth)} ${getLineSpacingClass(lineSpacing)} ${getThemeClass(readerTheme)}`
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full min-h-screen flex flex-col transition-all duration-300 ${readerClasses}`}
    >
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.div>
  );
}

import Breadcrumbs from './components/Breadcrumbs';

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ReadingProgressBar />
      <RouteScrollToTop />
      <ScrollToTop />
      <FloatingQuickActions />
      <MedicalDisclaimerModal />
      <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-primary/20 selection:text-primary flex flex-col transition-colors duration-300">
        <Header />
        <Breadcrumbs />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                
                {/* Subject-Wise Study Center Routes */}
                <Route path="/subject/organon" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
                <Route path="/subject/materia-medica" element={<PageWrapper><MateriaMedicaSubject /></PageWrapper>} />
                <Route path="/subject/repertory" element={<PageWrapper><RepertorySubject /></PageWrapper>} />
                <Route path="/subject/pharmacy" element={<PageWrapper><PharmacySubject /></PageWrapper>} />
                <Route path="/subject/anatomy" element={<PageWrapper><AnatomyLibrary /></PageWrapper>} />
                <Route path="/subject/physiology" element={<PageWrapper><PhysiologyLibrary /></PageWrapper>} />
                <Route path="/subject/forensic-medicine" element={<PageWrapper><FmtLibrary /></PageWrapper>} />
                <Route path="/subject/pathology/cell-injury" element={<PageWrapper><CellInjuryMasterPage /></PageWrapper>} />
                <Route path="/pathology/cell-injury" element={<Navigate to="/subject/pathology/cell-injury" replace />} />
                <Route path="/subject/pathology" element={<PageWrapper><PathologySubject /></PageWrapper>} />
                <Route path="/pathology" element={<Navigate to="/subject/pathology" replace />} />
                <Route path="/pathology/*" element={<Navigate to="/subject/pathology" replace />} />
                <Route path="/subject/surgery" element={<PageWrapper><SurgerySubject /></PageWrapper>} />
                <Route path="/subject/gynecology-obstetrics" element={<PageWrapper><GynecologyObstetricsSubject /></PageWrapper>} />
                <Route path="/subject/practice-of-medicine" element={<PageWrapper><PracticeOfMedicineSubject /></PageWrapper>} />

                {/* University Blueprints, Flashcards, AIAPGET MCQ & Therapeutics */}
                <Route path="/blueprints" element={<PageWrapper><UniversityBlueprints /></PageWrapper>} />
                <Route path="/university-blueprints" element={<PageWrapper><UniversityBlueprints /></PageWrapper>} />
                <Route path="/flashcards" element={<PageWrapper><FlashcardsPage /></PageWrapper>} />
                <Route path="/aiapget-mcq-simulator" element={<PageWrapper><AiapgetMcqSimulator /></PageWrapper>} />
                <Route path="/clinical-therapeutics" element={<PageWrapper><ClinicalTherapeuticsPage /></PageWrapper>} />

                {/* Syllabus Oriented BHMS Portals */}
                <Route path="/portal/1st-bhms" element={<PageWrapper><FirstBhmsPortal /></PageWrapper>} />
                <Route path="/portal/2nd-bhms" element={<PageWrapper><SecondBhmsPortal /></PageWrapper>} />
                <Route path="/portal/3rd-bhms" element={<PageWrapper><ThirdBhmsPortal /></PageWrapper>} />
                <Route path="/portal/4th-bhms" element={<PageWrapper><FourthBhmsPortal /></PageWrapper>} />
                <Route path="/bhms-portal/1st" element={<Navigate to="/portal/1st-bhms" replace />} />
                <Route path="/bhms-portal/2nd" element={<Navigate to="/portal/2nd-bhms" replace />} />
                <Route path="/bhms-portal/3rd" element={<Navigate to="/portal/3rd-bhms" replace />} />
                <Route path="/bhms-portal/4th" element={<Navigate to="/portal/4th-bhms" replace />} />

                {/* BHMS Course Hierarchical Routes */}
                <Route path="/bhms-course" element={<PageWrapper><StudentResources /></PageWrapper>} />
                <Route path="/bhms-course/first-bhms" element={<PageWrapper><FirstBhmsPortal /></PageWrapper>} />
                <Route path="/bhms-course/second-bhms" element={<PageWrapper><SecondBhmsPortal /></PageWrapper>} />
                <Route path="/bhms-course/third-bhms" element={<PageWrapper><ThirdBhmsPortal /></PageWrapper>} />
                <Route path="/bhms-course/final-bhms" element={<PageWrapper><FourthBhmsPortal /></PageWrapper>} />
                <Route path="/bhms-course/first-bhms-crash-course" element={<PageWrapper><FirstBhmsCrashCourse /></PageWrapper>} />
                <Route path="/first-bhms-crash-course" element={<PageWrapper><FirstBhmsCrashCourse /></PageWrapper>} />
                <Route path="/crash-course" element={<PageWrapper><FirstBhmsCrashCourse /></PageWrapper>} />

                {/* Homoeopathy Hierarchical Routes */}
                <Route path="/homoeopathy" element={<PageWrapper><UnderstandingHomoeopathy /></PageWrapper>} />
                <Route path="/homoeopathy/materia-medica" element={<PageWrapper><MateriaMedicaSubject /></PageWrapper>} />
                <Route path="/homoeopathy/materia-medica/:remedyId" element={<PageWrapper><RemedyDetail /></PageWrapper>} />
                <Route path="/homoeopathy/miasms" element={<PageWrapper><Miasms /></PageWrapper>} />

                {/* Disease Library Hierarchical Routes */}
                <Route path="/disease-library" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/disease-library/:category" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/disease-library/:category/:slug" element={<PageWrapper><ConditionDetail /></PageWrapper>} />

                {/* Student Academy Hierarchical Routes */}
                <Route path="/student-academy" element={<PageWrapper><StudentResources /></PageWrapper>} />
                <Route path="/student-academy/mcq-practice" element={<PageWrapper><AiapgetMcqSimulator /></PageWrapper>} />
                <Route path="/student-academy/viva-questions" element={<PageWrapper><StudentResources /></PageWrapper>} />
                <Route path="/student-academy/cheat-sheets" element={<PageWrapper><StudentResources /></PageWrapper>} />

                {/* Knowledge Base & Research Routes */}
                <Route path="/knowledge-base" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/research-updates" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
                <Route path="/categories" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
                <Route path="/categories/*" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
                <Route path="/historic-pioneers" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                <Route path="/historic-pioneers/:slug" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                <Route path="/clinical-cases" element={<PageWrapper><ClinicalHandbook /></PageWrapper>} />
                <Route path="/ask-Homoeopath" element={<PageWrapper><AskHomoeopath /></PageWrapper>} />
                <Route path="/ask-expert" element={<Navigate to="/ask-Homoeopath" replace />} />

                {/* Lexicon Routes */}
                <Route path="/lexicon" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/lexicon/all" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/lexicon/philosophy" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
                <Route path="/lexicon/clinical" element={<PageWrapper><TreatmentsPage /></PageWrapper>} />
                <Route path="/lexicon/historical" element={<PageWrapper><UnderstandingHomoeopathy /></PageWrapper>} />
                
                {/* Legacy redirects */}
                <Route path="/glossary" element={<Navigate to="/lexicon" replace />} />
                
                {/* Research & Tools */}
                <Route path="/research" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
                <Route path="/repertory" element={<PageWrapper><RepertoryTool /></PageWrapper>} />
                <Route path="/visualization" element={<PageWrapper><StudyTool /></PageWrapper>} />
                <Route path="/analysis" element={<PageWrapper><ComparisonTool /></PageWrapper>} />
                <Route path="/symptom-checker" element={<PageWrapper><SymptomChecker /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
                <Route path="/library" element={<PageWrapper><MyLibrary /></PageWrapper>} />
                <Route path="/my-library" element={<Navigate to="/library" replace />} />
                <Route path="/mcq-practice" element={<PageWrapper><AiapgetMcqSimulator /></PageWrapper>} />
                
                {/* Stalwarts Gallery */}
                <Route path="/stalwarts" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                <Route path="/stalwarts/:slug" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                
                {/* Account & Support */}
                <Route path="/subscription" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/account" element={<PageWrapper><MyLibrary /></PageWrapper>} />
                <Route path="/support" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

                {/* Legacy & Internal Page Routes */}
                <Route path="/articles" element={<PageWrapper><Articles /></PageWrapper>} />
                <Route path="/remedy/:remedyId" element={<PageWrapper><RemedyDetail /></PageWrapper>} />
                <Route path="/read/hair-loss-Homoeopathy" element={<PageWrapper><HairFallGuide /></PageWrapper>} />
                <Route path="/read/:slug" element={<PageWrapper><Articles /></PageWrapper>} />
                <Route path="/materia-medica/:remedyId" element={<PageWrapper><RemedyDetail /></PageWrapper>} />
                <Route path="/conditions/:slug" element={<PageWrapper><ConditionDetail /></PageWrapper>} />
                <Route path="/explore-symptoms" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
                <Route path="/disclaimer" element={<PageWrapper><MedicalDisclaimer /></PageWrapper>} />
                <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
                <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                <Route path="/marketplace" element={<PageWrapper><ResourceStore /></PageWrapper>} />
                
                {/* Redirects & Top Portals */}
                <Route path="/remedy" element={<Navigate to="/materia-medica" replace />} />
                <Route path="/student-resources" element={<PageWrapper><StudentResources /></PageWrapper>} />
                <Route path="/anatomy" element={<PageWrapper><AnatomyLibrary /></PageWrapper>} />
                <Route path="/anatomy/:topicId" element={<PageWrapper><AnatomyTopicDetail /></PageWrapper>} />
                <Route path="/physiology" element={<PageWrapper><PhysiologyLibrary /></PageWrapper>} />
                <Route path="/physiology/:topicId" element={<PageWrapper><PhysiologyTopicDetail /></PageWrapper>} />
                <Route path="/fmt" element={<PageWrapper><FmtLibrary /></PageWrapper>} />
                <Route path="/fmt/:chapterId" element={<PageWrapper><FmtTopicDetail /></PageWrapper>} />
                <Route path="/forensic-medicine" element={<Navigate to="/fmt" replace />} />
                <Route path="/materia-medica" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/clinical-guides" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/disease-hub" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/organon-philosophy" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
                <Route path="/miasms" element={<PageWrapper><Miasms /></PageWrapper>} />
                <Route path="/public-education" element={<PageWrapper><PublicEducation /></PageWrapper>} />
                <Route path="/public-education/ebooks" element={<PageWrapper><PublicHealthEBook /></PageWrapper>} />
                <Route path="/ebooks" element={<PageWrapper><PublicHealthEBook /></PageWrapper>} />
                <Route path="/cbc-handbook" element={<PageWrapper><CbcHandbook /></PageWrapper>} />
                <Route path="/clinical-handbook" element={<PageWrapper><ClinicalHandbook /></PageWrapper>} />
                <Route path="/cbdc-syllabus" element={<PageWrapper><CbdcSyllabus /></PageWrapper>} />
                <Route path="/syllabus" element={<Navigate to="/cbdc-syllabus" replace />} />
                <Route path="/coming-soon" element={<PageWrapper><ComingSoon /></PageWrapper>} />
                <Route path="/admin/link-audit" element={<PageWrapper><AdminLinkAudit /></PageWrapper>} />

                {/* Catch-all Wildcard Route */}
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [initiallyLoading, setInitiallyLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitiallyLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {initiallyLoading ? (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-secondary"
          >
            <div className="flex flex-col items-center max-w-sm text-center p-8 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-125 animate-pulse" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-2 border-primary/10 border-t-primary"
                />
                <div className="absolute inset-0 flex items-center justify-center scale-[1.1]">
                  <Logo size="xs" className="scale-125 transform pointer-events-none select-none" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-display font-semibold text-primary tracking-wide uppercase">
                  Curiva
                </h3>
                <p className="text-xs text-text-secondary">
                  Loading safe, natural healing paths...
                </p>
                <div className="w-20 h-1 bg-primary/10 rounded-full mx-auto overflow-hidden relative">
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-1/2 bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <AppRoutes key="app-main" />
        )}
      </AnimatePresence>
    </Router>
  );
}
