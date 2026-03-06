import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MedicalDisclaimer from './pages/MedicalDisclaimer';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-primary/20 selection:text-primary flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </Router>
  );
}
