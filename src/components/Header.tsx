import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Explore', to: '/articles' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const handleLinkClick = (to: string) => {
    setIsMenuOpen(false);
    if (to.startsWith('/#')) {
      const id = to.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (to === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center overflow-hidden shadow-md">
              <svg 
                viewBox="0 0 100 100" 
                className="w-8 h-8 text-white" 
                fill="currentColor"
              >
                {/* Simplified Caduceus SVG */}
                <path d="M50 10c-1.1 0-2 .9-2 2v76c0 1.1.9 2 2 2s2-.9 2-2V12c0-1.1-.9-2-2-2z" />
                <path d="M50 25c-8.3 0-15 6.7-15 15 0 5.1 2.5 9.6 6.4 12.4-3.9 2.8-6.4 7.3-6.4 12.4 0 8.3 6.7 15 15 15s15-6.7 15-15c0-5.1-2.5-9.6-6.4-12.4 3.9-2.8 6.4-7.3 6.4-12.4 0-8.3-6.7-15-15-15zm0 50c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0-25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
                <path d="M30 20c0-5.5 4.5-10 10-10h20c5.5 0 10 4.5 10 10s-4.5 10-10 10H40c-5.5 0-10-4.5-10-10z" opacity="0.3" />
                <path d="M20 30c0-5.5 13.4-10 30-10s30 4.5 30 10-13.4 10-30 10-30-4.5-30-10z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-script text-primary leading-none">
                Curiva
              </span>
              <span className="text-lg font-display font-bold text-gray-800 leading-none -mt-1">
                Homoeopathy
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-gray-500 font-bold mt-1">
                TINY DOSES. TRUE SHIFTS.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => handleLinkClick(link.to)}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all"
            />
            <Search className="absolute left-3.5 text-gray-400 w-4 h-4" />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg">
          <div className="flex items-center relative mb-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3.5 text-gray-400 w-4 h-4" />
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-600 hover:text-primary font-medium text-lg px-2"
                onClick={() => handleLinkClick(link.to)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
