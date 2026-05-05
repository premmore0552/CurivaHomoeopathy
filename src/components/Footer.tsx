import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import LeadCapture from './LeadCapture';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-primary border-t border-border pt-32 pb-16 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary/5 to-transparent pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Lead Capture Section */}
        <div className="mb-32">
          <LeadCapture />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="md:col-span-2 space-y-8">
            <Link to="/" className="inline-block transform hover:scale-105 transition-transform">
              <Logo size="sm" />
            </Link>
            <p className="text-text-secondary text-lg font-medium leading-relaxed max-w-sm opacity-80">
              Curivating the future of homoeopathy through pattern-based research and clinical intelligence.
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
                  className="w-12 h-12 rounded-2xl bg-bg-secondary border border-border flex items-center justify-center text-text-tertiary hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-display font-black mb-10 italic text-[10px] uppercase tracking-[0.2em] opacity-50">Navigation</h4>
            <ul className="space-y-5 text-sm font-black uppercase tracking-tight">
              <li><Link to="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/study-tool" className="text-text-secondary hover:text-primary transition-colors">Clinical Recall Tool</Link></li>
              <li><Link to="/student-resources" className="text-text-secondary hover:text-primary transition-colors">Student Resources</Link></li>
              <li><Link to="/organon-philosophy" className="text-primary flex items-center gap-2 group">Organon <Sparkles className="w-3 h-3 group-hover:scale-125 transition-transform" /></Link></li>
              <li><Link to="/topics" className="text-text-secondary hover:text-primary transition-colors">Research Database</Link></li>
              <li><Link to="/materia-medica" className="text-text-secondary hover:text-primary transition-colors">Materia Medica</Link></li>
              <li><Link to="/marketplace" className="text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-2">Marketplace <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded-full">New</span></Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-text-primary font-display font-black mb-10 italic text-[10px] uppercase tracking-[0.2em] opacity-50">Organization</h4>
            <ul className="space-y-5 text-sm font-black uppercase tracking-tight">
              <li><Link to="/about-us" className="text-text-secondary hover:text-primary transition-colors">About Story</Link></li>
              <li><Link to="/feedback" className="text-text-secondary hover:text-primary transition-colors">Submit Feedback</Link></li>
              <li><Link to="/faq" className="text-text-secondary hover:text-primary transition-colors">FAQ Center</Link></li>
              <li><Link to="/medical-disclaimer" className="text-red-500/70 hover:text-red-500 transition-colors">Legal Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-display font-black mb-10 italic text-[10px] uppercase tracking-[0.2em] opacity-50">Connect</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-tight">
              <li>
                <div className="flex items-center gap-4 text-text-secondary group">
                  <div className="w-12 h-12 rounded-2xl bg-bg-secondary border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <span className="text-text-primary">hello@curiva.in</span>
                </div>
              </li>
              <li>
                <div className="px-5 py-4 bg-primary/5 border border-primary/20 rounded-2xl text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-relaxed italic">
                  Academic Platform Only<br/>
                  <span className="text-text-tertiary opacity-80 not-italic">Similia Similibus Curentur</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <p className="text-text-tertiary text-xs font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Curiva Homoeopathy. Built with Intelligence.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-[11px] text-text-tertiary font-bold uppercase tracking-[0.1em]">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/medical-disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            </div>
          </div>
          <div className="bg-bg-secondary/50 p-8 rounded-[2.5rem] border border-border max-w-2xl transform hover:scale-[1.02] transition-transform">
            <p className="text-text-secondary text-xs font-medium leading-[1.8] italic opacity-80">
              <strong className="text-primary not-italic font-black block mb-2 uppercase tracking-widest text-[10px]">Academic Disclosure:</strong> Curiva is an informational platform managed by BHMS students. We provide research insights into clinical patterns for educational purposes only. We do not provide medical diagnosis, treatment, or professional consultations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
