import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import ReadingProgressBar from './components/ReadingProgressBar';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import RouteScrollToTop from './components/RouteScrollToTop';
import ScrollToTop from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
// removed CookieConsent import
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Articles = lazy(() => import('./pages/Articles'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const MedicalDisclaimer = lazy(() => import('./pages/MedicalDisclaimer'));
const Contact = lazy(() => import('./pages/Contact'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AilmentDetail = lazy(() => import('./pages/AilmentDetail'));
const ComparisonTool = lazy(() => import('./pages/ComparisonTool'));
const RepertoryTool = lazy(() => import('./pages/RepertoryTool'));
const RelationshipVisualizer = lazy(() => import('./pages/RelationshipVisualizer'));
const Encyclopedia = lazy(() => import('./pages/Encyclopedia'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TreatmentsPage = lazy(() => import('./pages/TreatmentsPage'));
const MythsAndFacts = lazy(() => import('./pages/MythsAndFacts'));
const UnderstandingHomeopathy = lazy(() => import('./pages/UnderstandingHomeopathy'));
const ConditionDetail = lazy(() => import('./pages/ConditionDetail'));
const RemedyDetail = lazy(() => import('./pages/RemedyDetail'));
const OrganonMedicine = lazy(() => import('./pages/OrganonMedicine'));
const ResourceStore = lazy(() => import('./pages/ResourceStore'));
const MyLibrary = lazy(() => import('./pages/MyLibrary'));
const StudentResources = lazy(() => import('./pages/StudentResources'));
const StudyTool = lazy(() => import('./pages/StudyTool'));
const Stalwarts = lazy(() => import('./pages/Stalwarts'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const MCQPractice = lazy(() => import('./pages/MCQPractice'));
const ClinicalGuides = lazy(() => import('./pages/ClinicalGuides'));
const DiseaseHub = lazy(() => import('./pages/DiseaseHub'));
const SymptomChecker = lazy(() => import('./pages/SymptomChecker'));
const HairFallGuide = lazy(() => import('./pages/HairFallGuide'));
const Miasms = lazy(() => import('./pages/Miasms'));
const PublicEducation = lazy(() => import('./pages/PublicEducation'));
const CbcHandbook = lazy(() => import('./pages/CbcHandbook'));
const ClinicalHandbook = lazy(() => import('./pages/ClinicalHandbook'));

import MedicalDisclaimerModal from './components/MedicalDisclaimerModal';
import GuidedTour from './components/GuidedTour';
// removed PWAInstallBanner import
import Logo from './components/Logo';
import QuickNav from './components/QuickNav';

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full min-h-screen flex flex-col"
    >
      <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6">
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
      <ScrollToTopButton />
      <QuickNav />
      <MedicalDisclaimerModal />
      <GuidedTour />
      <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-primary/20 selection:text-primary flex flex-col transition-colors duration-300">
        <Header />
        <Breadcrumbs />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                
                {/* Lexicon (formerly Glossary) Routes */}
                <Route path="/lexicon" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/lexicon/all" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/lexicon/philosophy" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
                <Route path="/lexicon/clinical" element={<PageWrapper><TreatmentsPage /></PageWrapper>} />
                <Route path="/lexicon/historical" element={<PageWrapper><UnderstandingHomeopathy /></PageWrapper>} />
                
                {/* Legacy redirects for Glossary */}
                <Route path="/glossary" element={<Navigate to="/lexicon" replace />} />
                <Route path="/glossary/all" element={<Navigate to="/lexicon/all" replace />} />
                <Route path="/glossary/philosophy" element={<Navigate to="/lexicon/philosophy" replace />} />
                <Route path="/glossary/clinical" element={<Navigate to="/lexicon/clinical" replace />} />
                <Route path="/glossary/historical" element={<Navigate to="/lexicon/historical" replace />} />
                
                {/* Research & Tools */}
                <Route path="/research" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
                <Route path="/repertory" element={<PageWrapper><RepertoryTool /></PageWrapper>} />
                <Route path="/nexus" element={<PageWrapper><RelationshipVisualizer /></PageWrapper>} />
                <Route path="/relationships" element={<Navigate to="/nexus" replace />} />
                <Route path="/visualization" element={<PageWrapper><StudyTool /></PageWrapper>} />
                <Route path="/analysis" element={<PageWrapper><ComparisonTool /></PageWrapper>} />
                <Route path="/symptom-checker" element={<PageWrapper><SymptomChecker /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
                <Route path="/library" element={<PageWrapper><MyLibrary /></PageWrapper>} />
                <Route path="/mcq-practice" element={<PageWrapper><MCQPractice /></PageWrapper>} />
                
                {/* Stalwarts Gallery */}
                <Route path="/stalwarts" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                <Route path="/stalwarts/:slug" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                
                {/* Account & Support */}
                <Route path="/subscription" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/account" element={<PageWrapper><MyLibrary /></PageWrapper>} />
                <Route path="/support" element={<PageWrapper><Contact /></PageWrapper>} />

                {/* Legacy & Internal Page Routes */}
                <Route path="/articles" element={<PageWrapper><Articles /></PageWrapper>} />
                <Route path="/remedy/:remedyId" element={<PageWrapper><RemedyDetail /></PageWrapper>} />
                <Route path="/read/hair-loss-homeopathy" element={<PageWrapper><HairFallGuide /></PageWrapper>} />
                <Route path="/read/:slug" element={<PageWrapper><Articles /></PageWrapper>} />
                <Route path="/materia-medica/:slug" element={<PageWrapper><Articles /></PageWrapper>} />
                <Route path="/conditions/:slug" element={<PageWrapper><ConditionDetail /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
                <Route path="/disclaimer" element={<PageWrapper><MedicalDisclaimer /></PageWrapper>} />
                <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
                <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                <Route path="/marketplace" element={<PageWrapper><ResourceStore /></PageWrapper>} />
                <Route path="/feedback" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/community" element={<PageWrapper><Profile /></PageWrapper>} />
                
                {/* Redirects */}
                <Route path="/remedy" element={<Navigate to="/materia-medica" replace />} />
                <Route path="/pro-plans" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/student-resources" element={<PageWrapper><StudentResources /></PageWrapper>} />
                <Route path="/materia-medica" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/clinical-guides" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/disease-hub" element={<PageWrapper><DiseaseHub /></PageWrapper>} />
                <Route path="/organon-philosophy" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
                <Route path="/miasms" element={<PageWrapper><Miasms /></PageWrapper>} />
                <Route path="/public-education" element={<PageWrapper><PublicEducation /></PageWrapper>} />
                <Route path="/cbc-handbook" element={<PageWrapper><CbcHandbook /></PageWrapper>} />
                <Route path="/clinical-handbook" element={<PageWrapper><ClinicalHandbook /></PageWrapper>} />
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
    // 1.5 seconds smooth startup spinner
    const timer = setTimeout(() => {
      setInitiallyLoading(false);
    }, 1500);
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
              {/* Spinning path ring surrounding the Curiva Logo */}
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
