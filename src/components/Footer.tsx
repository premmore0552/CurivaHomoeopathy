import React from 'react';
import { Facebook, Instagram, Mail, ShieldAlert, FileText, ArrowUpRight, GraduationCap, Sparkles, BookOpen, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import LeadCapture from './LeadCapture';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-primary border-t border-border pt-24 pb-12 transition-colors duration-300 relative overflow-hidden" id="curiva-footer">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary/[0.03] to-transparent pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lead Capture Section */}
        <div className="mb-20">
          <LeadCapture />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block transform hover:scale-102 transition-transform">
              <Logo size="sm" />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm opacity-85 font-sans">
              Evolving BHMS education and clinical practice through structured pattern-based learning, digital academic handbooks, and clinical-grade intelligence tools.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, href: "https://www.facebook.com/curivahomoeopathy/", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/curivahomoeopathy/", label: "Instagram" },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-bg-secondary border border-border flex items-center justify-center text-text-tertiary hover:bg-primary hover:text-white hover:border-primary hover:shadow-soft transition-all transform hover:-translate-y-0.5"
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Curriculum Subjects */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-2 text-text-tertiary">
              <GraduationCap className="w-4 h-4 text-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] font-sans">Study Center Subjects</h4>
            </div>
            <ul className="grid grid-cols-1 gap-2.5 text-[11px] font-bold uppercase tracking-wider text-left font-sans">
              <li><Link to="/subject/organon" className="text-text-secondary hover:text-primary transition-colors">Organon of Medicine</Link></li>
              <li><Link to="/subject/materia-medica" className="text-text-secondary hover:text-primary transition-colors">Materia Medica</Link></li>
              <li><Link to="/subject/repertory" className="text-text-secondary hover:text-primary transition-colors">Repertory</Link></li>
              <li><Link to="/subject/pharmacy" className="text-text-secondary hover:text-primary transition-colors">Homoeopathic Pharmacy</Link></li>
              <li><Link to="/subject/anatomy" className="text-text-secondary hover:text-primary transition-colors">Anatomy</Link></li>
              <li><Link to="/subject/physiology" className="text-text-secondary hover:text-primary transition-colors">Physiology & Biochemistry</Link></li>
              <li><Link to="/subject/forensic-medicine" className="text-text-secondary hover:text-primary transition-colors">Forensic Medicine & Toxicology</Link></li>
              <li><Link to="/subject/pathology" className="text-text-secondary hover:text-primary transition-colors">Pathology & Microbiology</Link></li>
              <li><Link to="/subject/surgery" className="text-text-secondary hover:text-primary transition-colors">Surgery & Therapeutics</Link></li>
              <li><Link to="/subject/gynecology-obstetrics" className="text-text-secondary hover:text-primary transition-colors">Gynecology & Obst.</Link></li>
              <li><Link to="/subject/practice-of-medicine" className="text-text-secondary hover:text-primary transition-colors">Practice of Medicine</Link></li>
            </ul>
          </div>

          {/* Column 2: BHMS Portals & Exam Tools */}
          <div className="lg:col-span-2.5 space-y-5">
            <div className="flex items-center gap-2 text-text-tertiary">
              <HeartPulse className="w-4 h-4 text-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] font-sans">BHMS Portals & Tools</h4>
            </div>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-left font-sans">
              <li><Link to="/portal/1st-bhms" className="text-text-secondary hover:text-primary transition-colors">1st BHMS Portal</Link></li>
              <li><Link to="/portal/2nd-bhms" className="text-text-secondary hover:text-primary transition-colors">2nd BHMS Portal</Link></li>
              <li><Link to="/portal/3rd-bhms" className="text-text-secondary hover:text-primary transition-colors">3rd BHMS Portal</Link></li>
              <li><Link to="/portal/4th-bhms" className="text-text-secondary hover:text-primary transition-colors">4th BHMS Portal</Link></li>
              <li className="pt-2"><Link to="/university-blueprints" className="text-primary hover:underline">University Blueprints & Answers</Link></li>
              <li><Link to="/flashcards" className="text-primary hover:underline">100+ Homoeopathic Flashcards</Link></li>
              <li><Link to="/aiapget-mcq-simulator" className="text-primary hover:underline">5000+ AIAPGET MCQ Simulator</Link></li>
              <li><Link to="/clinical-therapeutics" className="text-primary hover:underline">Clinical Therapeutics</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Legal */}
          <div className="lg:col-span-2.5 space-y-5">
            <div className="flex items-center gap-2 text-text-tertiary">
              <BookOpen className="w-4 h-4 text-primary" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] font-sans">Resources & Legal</h4>
            </div>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider text-left font-sans">
              <li><Link to="/about" className="text-text-secondary hover:text-primary transition-colors">Our Philosophy</Link></li>
              <li><Link to="/public-education" className="text-text-secondary hover:text-primary transition-colors">Public Learning Hub</Link></li>
              <li><Link to="/contact" className="text-text-secondary hover:text-primary transition-colors">Support & Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-text-secondary hover:text-primary transition-colors">Terms of Service</Link></li>
              <li>
                <Link to="/disclaimer" className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 font-black uppercase tracking-widest text-[9.5px]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Medical Disclaimer</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Legal Disclaimer Area */}
        <div className="pt-8 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <p className="text-text-tertiary text-[10px] font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Curiva Homoeopathy. Built with Clinical Intelligence.
            </p>
          </div>
          <div className="bg-bg-secondary/40 p-6 rounded-2xl border border-border/80 max-w-2xl transform hover:scale-[1.01] transition-all">
            <p className="text-text-secondary text-[11px] font-medium leading-[1.7] italic opacity-85 font-serif text-left">
              <strong className="text-primary not-italic font-black block mb-1 uppercase tracking-widest text-[9.5px] font-sans">Academic Disclosure:</strong> Curiva is an informational learning portal designed and maintained by BHMS students. We catalog academic material for syllabus education and pattern-based research. We strictly do not deliver medical diagnoses, physical examinations, treatment recommendations, or clinical consults.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
