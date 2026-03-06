import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#D12B81] rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-6 h-6 text-white" 
                  fill="currentColor"
                >
                  {/* Simplified Caduceus SVG */}
                  <path d="M50 10c-1.1 0-2 .9-2 2v76c0 1.1.9 2 2 2s2-.9 2-2V12c0-1.1-.9-2-2-2z" />
                  <path d="M50 25c-8.3 0-15 6.7-15 15 0 5.1 2.5 9.6 6.4 12.4-3.9 2.8-6.4 7.3-6.4 12.4 0 8.3 6.7 15 15 15s15-6.7 15-15c0-5.1-2.5-9.6-6.4-12.4 3.9-2.8 6.4-7.3 6.4-12.4 0-8.3-6.7-15-15-15zm0 50c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0-25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
                  <path d="M30 20c0-5.5 4.5-10 10-10h20c5.5 0 10 4.5 10 10s-4.5 10-10 10H40c-5.5 0-10-4.5-10-10z" opacity="0.3" />
                  <path d="M20 30c0-5.5 13.4-10 30-10s30 4.5 30 10-13.4 10-30 10-30-4.5-30-10z" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">
                Curiva <span className="text-primary-light">Homoeopathy</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Dedicated to spreading awareness about homoeopathy and holistic healing through 
              evidence-based educational content for students and patients worldwide.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/curivahomoeopathy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/curivahomoeopathy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/#blog" className="hover:text-primary transition-colors">Educational Blog</Link></li>
              <li><Link to="/medical-disclaimer" className="hover:text-primary transition-colors">Medical Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Blog Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Homoeopathic Remedies</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Disease & Conditions</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Materia Medica</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Student Resources</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Natural Lifestyle</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">Connect With Us</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a 
                  href="https://www.instagram.com/curivahomoeopathy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Instagram size={20} className="text-primary" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/curivahomoeopathy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Facebook size={20} className="text-primary" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Curiva Homoeopathy. All rights reserved.
          </p>
          <p className="text-gray-500 text-[10px] max-w-md text-center md:text-right italic">
            Disclaimer: The information on this blog is for educational purposes only and not intended as medical advice. 
            Always consult with a qualified health professional.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
