import React, { useState } from 'react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

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
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 22V2" />
                <path d="M12 7c2-1 4-1.5 6-1.5s4 .5 4 1.5-2 2.5-4 2.5-4-.5-6-2.5z" />
                <path d="M12 7c-2-1-4-1.5-6-1.5s-4 .5-4 1.5 2 2.5 4 2.5 4-.5 6-2.5z" />
                <path d="M12 12c2-1 4-1.5 6-1.5s4 .5 4 1.5-2 2.5-4 2.5-4-.5-6-2.5z" />
                <path d="M12 12c-2-1-4-1.5-6-1.5s-4 .5-4 1.5 2 2.5 4 2.5 4-.5 6-2.5z" />
                <circle cx="12" cy="2" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-script text-primary leading-none">
                Curiva
              </span>
              <span className="text-lg font-display font-bold text-text-primary leading-none -mt-1">
                Homoeopathy
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-text-secondary font-bold mt-1">
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
                className="text-text-secondary hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all dark:text-white"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
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
        <div className="lg:hidden bg-bg-primary border-t border-border py-4 px-4 space-y-4 shadow-lg transition-colors duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 bg-bg-secondary border border-border rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-bg-secondary text-text-secondary hover:bg-border transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-text-secondary hover:text-primary font-medium text-lg px-2"
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
