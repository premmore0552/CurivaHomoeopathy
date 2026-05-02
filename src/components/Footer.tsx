import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import LeadCapture from './LeadCapture';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lead Capture Section */}
        <div className="mb-20">
          <LeadCapture />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center">
              <Logo size="sm" />
            </Link>
            <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-sm">
              Exploring the potential of homoeopathy and holistic healing through 
              evidence-based educational content for students and conscious individuals worldwide.
            </p>
            <div className="flex gap-4">
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
                  className="w-11 h-11 rounded-2xl bg-bg-primary border border-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all transform hover:-translate-y-1 shadow-sm"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-display font-black mb-8 italic text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/organon" className="text-primary hover:text-primary active:scale-95 transition-all flex items-center gap-2">Organon of Medicine <Sparkles className="w-3 h-3" /></Link></li>
              <li><Link to="/topics" className="text-text-secondary hover:text-primary transition-colors italic">Research Database</Link></li>
              <li><Link to="/learn" className="text-text-secondary hover:text-primary transition-colors">Journal & Guides</Link></li>
              <li><Link to="/explore-symptoms" className="text-text-secondary hover:text-primary transition-colors">Symptom Library</Link></li>
              <li><Link to="/understanding-homeopathy" className="text-text-secondary hover:text-primary transition-colors">Our Methodology</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-text-primary font-display font-black mb-8 italic text-sm uppercase tracking-widest">Organization</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/about" className="text-text-secondary hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/guidance" className="text-text-secondary hover:text-primary transition-colors">Feedback & Research</Link></li>
              <li><Link to="/faq" className="text-text-secondary hover:text-primary transition-colors">FAQ Center</Link></li>
              <li><Link to="/disclaimer" className="text-text-secondary hover:text-primary transition-colors italic text-primary/70">Legal Notice</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-display font-black mb-8 italic text-sm uppercase tracking-widest">Connect</h4>
            <ul className="space-y-6 text-sm font-bold">
              <li>
                <div className="flex items-center gap-3 text-text-secondary group">
                  <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border flex items-center justify-center">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <span>hello@curiva.in</span>
                </div>
              </li>
              <li>
                <div className="px-4 py-3 bg-bg-primary border border-border rounded-xl text-[10px] font-black text-primary uppercase tracking-widest leading-tight">
                  Educational Resource Only<br/>
                  <span className="text-text-secondary opacity-60">No Live Consultations</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary text-xs font-black uppercase tracking-widest">
              © {new Date().getFullYear()} Curiva Homoeopathy. Built for Education.
            </p>
            <div className="flex flex-wrap gap-6 text-[10px] text-text-secondary/60 font-bold uppercase tracking-wider">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/medical-disclaimer" className="hover:text-primary transition-colors">Medical Disclaimer</Link>
            </div>
          </div>
          <div className="bg-bg-primary p-6 rounded-3xl border border-border max-w-2xl shadow-sm">
            <p className="text-text-secondary text-[11px] font-medium leading-relaxed italic">
              <strong className="text-text-primary not-italic text-primary">Educational Disclosure:</strong> Curiva is an informational platform managed by a BHMS student. We provide research insights into clinical patterns for educational purposes only. We do not provide medical diagnosis, treatment, or professional consultations via this site. Always consult a qualified physician for health concerns.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
