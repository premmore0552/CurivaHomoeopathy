import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import CookieConsent from './components/CookieConsent';
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
const Subscription = lazy(() => import('./pages/Subscription'));
const StudyTool = lazy(() => import('./pages/StudyTool'));
const Stalwarts = lazy(() => import('./pages/Stalwarts'));
const AskHomeopath = lazy(() => import('./pages/AskHomeopath'));
const Profile = lazy(() => import('./pages/Profile'));
const CaseSimulation = lazy(() => import('./pages/CaseSimulation'));
const MCQPractice = lazy(() => import('./pages/MCQPractice'));

import MedicalDisclaimerModal from './components/MedicalDisclaimerModal';
import GuidedTour from './components/GuidedTour';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
       <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
         className="mb-6"
       >
         <Loader2 className="w-12 h-12 text-primary" />
       </motion.div>
       <h2 className="text-xl font-display font-black text-text-primary uppercase tracking-tight italic">
         Loading <span className="text-primary italic">Curiva</span>
       </h2>
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

import TrialIndicator from './components/TrialIndicator';
import Breadcrumbs from './components/Breadcrumbs';

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ReadingProgressBar />
      <RouteScrollToTop />
      <ScrollToTop />
      <ScrollToTopButton />
      <CookieConsent />
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
                
                {/* Glossary Routes */}
                <Route path="/glossary" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/glossary/all" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/glossary/philosophy" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
                <Route path="/glossary/clinical" element={<PageWrapper><TreatmentsPage /></PageWrapper>} />
                <Route path="/glossary/historical" element={<PageWrapper><UnderstandingHomeopathy /></PageWrapper>} />
                
                {/* Research & Tools */}
                <Route path="/research" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
                <Route path="/repertory" element={<PageWrapper><RepertoryTool /></PageWrapper>} />
                <Route path="/relationships" element={<PageWrapper><RelationshipVisualizer /></PageWrapper>} />
                <Route path="/visualization" element={<PageWrapper><StudyTool /></PageWrapper>} />
                <Route path="/analysis" element={<PageWrapper><ComparisonTool /></PageWrapper>} />
                <Route path="/ask-homeopath" element={<PageWrapper><AskHomeopath /></PageWrapper>} />
                <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
                <Route path="/library" element={<PageWrapper><MyLibrary /></PageWrapper>} />
                <Route path="/mcq-practice" element={<PageWrapper><MCQPractice /></PageWrapper>} />
                <Route path="/case-simulation" element={<PageWrapper><CaseSimulation /></PageWrapper>} />
                
                {/* Stalwarts Gallery */}
                <Route path="/stalwarts" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                <Route path="/stalwarts/:slug" element={<PageWrapper><Stalwarts /></PageWrapper>} />
                
                {/* Account & Support */}
                <Route path="/subscription" element={<PageWrapper><Subscription /></PageWrapper>} />
                <Route path="/account" element={<PageWrapper><MyLibrary /></PageWrapper>} />
                <Route path="/support" element={<PageWrapper><Contact /></PageWrapper>} />

                {/* Legacy & Internal Page Routes */}
                <Route path="/remedy/:remedyId" element={<PageWrapper><RemedyDetail /></PageWrapper>} />
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
                <Route path="/community" element={<PageWrapper><Subscription /></PageWrapper>} />
                
                {/* Redirects */}
                <Route path="/pro-plans" element={<PageWrapper><Subscription /></PageWrapper>} />
                <Route path="/student-resources" element={<PageWrapper><StudentResources /></PageWrapper>} />
                <Route path="/materia-medica" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
                <Route path="/organon-philosophy" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
        <Newsletter />
        <Footer />
        <TrialIndicator />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
