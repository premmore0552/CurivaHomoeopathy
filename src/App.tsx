import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeContext';
import ReadingProgressBar from './components/ReadingProgressBar';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import RouteScrollToTop from './components/RouteScrollToTop';
import ScrollToTop from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Articles from './pages/Articles';
import CategoriesPage from './pages/CategoriesPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MedicalDisclaimer from './pages/MedicalDisclaimer';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import AilmentDetail from './pages/AilmentDetail';
import ComparisonTool from './pages/ComparisonTool';
import Encyclopedia from './pages/Encyclopedia';
import FAQPage from './pages/FAQPage';
import TreatmentsPage from './pages/TreatmentsPage';
import MythsAndFacts from './pages/MythsAndFacts';
import UnderstandingHomeopathy from './pages/UnderstandingHomeopathy';
import ConditionDetail from './pages/ConditionDetail';
import RemedyDetail from './pages/RemedyDetail';
import OrganonMedicine from './pages/OrganonMedicine';
import MedicalDisclaimerModal from './components/MedicalDisclaimerModal';
import GuidedTour from './components/GuidedTour';

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full min-h-full flex flex-col"
    >
      <div className="flex-grow w-full max-w-[2000px] mx-auto px-0 sm:px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </motion.div>
  );
}

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
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/compare" element={<PageWrapper><ComparisonTool /></PageWrapper>} />
              <Route path="/encyclopedia" element={<PageWrapper><Encyclopedia /></PageWrapper>} />
              <Route path="/learn" element={<PageWrapper><Articles /></PageWrapper>} />
              <Route path="/learn/:slug" element={<PageWrapper><Articles /></PageWrapper>} />
              <Route path="/explore-symptoms" element={<PageWrapper><TreatmentsPage /></PageWrapper>} />
              <Route path="/conditions" element={<PageWrapper><TreatmentsPage /></PageWrapper>} />
              <Route path="/conditions/:slug" element={<PageWrapper><ConditionDetail /></PageWrapper>} />
              <Route path="/remedies" element={<PageWrapper><Articles /></PageWrapper>} />
              <Route path="/understanding-homeopathy" element={<PageWrapper><UnderstandingHomeopathy /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/guidance" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
              <Route path="/disclaimer" element={<PageWrapper><MedicalDisclaimer /></PageWrapper>} />
              <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
              <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
              <Route path="/topics" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
              <Route path="/guide/:ailmentId" element={<PageWrapper><AilmentDetail /></PageWrapper>} />
              <Route path="/conditions/:slug" element={<PageWrapper><ConditionDetail /></PageWrapper>} />
              <Route path="/remedy/:remedyId" element={<PageWrapper><RemedyDetail /></PageWrapper>} />
              <Route path="/organon" element={<PageWrapper><OrganonMedicine /></PageWrapper>} />
              
              {/* Fallback & Legacy Routes */}
              <Route path="/health-guides" element={<PageWrapper><TreatmentsPage /></PageWrapper>} />
              <Route path="/articles" element={<PageWrapper><Articles /></PageWrapper>} />
              <Route path="/our-story" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/get-in-touch" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/myths-and-facts" element={<PageWrapper><MythsAndFacts /></PageWrapper>} />
              <Route path="/read/:slug" element={<PageWrapper><Articles /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
