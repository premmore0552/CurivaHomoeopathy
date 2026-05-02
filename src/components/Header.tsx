import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight, Home, ArrowRight, Globe, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { trackEvent } from '../lib/analytics';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from './LanguageContext';
import AuthButton from './AuthButton';
import Logo from './Logo';

import SearchAutocomplete from './SearchAutocomplete';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (segment: string) => {
    const map: Record<string, string> = {
      'articles': 'Articles',
      'topics': 'Research Database',
      'our-story': 'Our Story',
      'privacy-policy': 'Privacy Policy',
      'medical-disclaimer': 'Medical Disclaimer',
      'get-in-touch': 'Contact',
      'terms-of-service': 'Terms of Service',
      'guide': 'Guide',
      'help-center': 'FAQ & Help Center',
      'health-guides': 'Health Guides',
      'myths-and-facts': 'Myths & Facts',
    };
    return map[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Organon', to: '/organon' },
    { 
      name: 'Explore', 
      to: '/encyclopedia',
      dropdown: [
        { name: 'Encyclopedia A-Z', to: '/encyclopedia' },
        { name: 'Comparator Tool', to: '/compare' },
        { name: 'Health Guides', to: '/explore-symptoms' },
      ]
    },
    { 
      name: 'Understanding Homeopathy', 
      to: '/understanding-homeopathy',
      dropdown: [
        { name: 'Basics', to: '/understanding-homeopathy#basics' },
        { name: 'Modalities', to: '/understanding-homeopathy#modalities' },
        { name: 'Individualization', to: '/understanding-homeopathy#individualization' },
      ]
    },
    { name: 'About', to: '/about' },
    { name: 'Feedback', to: '/guidance' },
  ];

  const handleLinkClick = (to: string) => {
    setIsMenuOpen(false);
    if (to.startsWith('/#')) {
      const id = to.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const menuVariants: Variants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
      ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border shadow-soft h-16' 
      : 'bg-bg-primary border-b border-transparent h-20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => handleLinkClick('/')} 
            className="flex items-center"
            aria-label="Home"
          >
            <Logo size={isScrolled ? "xs" : "sm"} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-nowrap" aria-label="Main Navigation">
            <div className="mr-4 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              BHMS Student Resource
            </div>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const hasDropdown = 'dropdown' in link;
              
              if (hasDropdown) {
                return (
                  <div key={link.name} className="relative group/nav-item">
                    <button
                      aria-haspopup="true"
                      aria-expanded="false"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                        isActive || link.dropdown?.some(d => location.pathname === d.to)
                        ? 'text-primary' 
                        : 'text-text-secondary hover:text-primary'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover/nav-item:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-52 bg-bg-primary border border-border rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-200 z-50">
                      {link.dropdown?.map(sub => {
                        const isSubActive = location.pathname === sub.to;
                        return (
                          <Link
                            key={sub.name}
                            to={sub.to}
                            aria-current={isSubActive ? 'page' : undefined}
                            className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                              isSubActive 
                              ? 'text-primary bg-primary/5' 
                              : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                            }`}
                            onClick={() => {
                              trackEvent('nav_click', { link_name: sub.name, link_to: sub.to });
                              handleLinkClick(sub.to);
                            }}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.name} className="relative">
                  <Link
                    to={link.to}
                    onClick={() => {
                      trackEvent('nav_click', { link_name: link.name, link_to: link.to });
                      handleLinkClick(link.to);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block px-3 py-2 rounded-xl text-sm font-bold transition-all relative group whitespace-nowrap ${
                      isActive 
                      ? 'text-primary' 
                      : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-primary/10 rounded-xl -z-10 shadow-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/30 group-hover:w-1/2 transition-all duration-300 rounded-full" />
                    )}
                  </Link>
                </div>
              );
            })}

            {/* Categories Dropdown */}
            <div className="relative ml-2">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isCategoriesOpen 
                  ? 'text-primary bg-primary/10 shadow-sm' 
                  : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                }`}
                aria-expanded={isCategoriesOpen}
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                Research Database <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-bg-primary border border-border rounded-2xl shadow-xl p-3 z-50 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map(cat => {
                        const IconComponent = (Icons as any)[cat.icon];
                        return (
                        <Link
                          key={cat.id}
                          to={`/topics#${cat.id}`}
                          className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-primary font-medium hover:bg-bg-secondary rounded-xl transition-colors group"
                          onClick={() => {
                            setIsCategoriesOpen(false);
                          }}
                        >
                          <div className="p-2 rounded-lg bg-bg-secondary group-hover:bg-primary/10 transition-colors">
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                          </div>
                          {cat.name}
                        </Link>
                      )})}
                    </div>
                    <div className="border-t border-border mt-3 pt-3 px-2">
                      <Link 
                        to="/topics" 
                        className="block text-center py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-colors text-sm"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        Browse all Topics
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="w-[1px] h-6 bg-border mx-2" />
            
            <LanguageToggle />
            
            <div className="w-[1px] h-6 bg-border mx-2" />

            <AuthButton />

            <div className="w-[1px] h-6 bg-border mx-2" />
            
            <ThemeToggle />
          </nav>

          {/* Search Bar & Mobile Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center">
              <SearchAutocomplete />
            </div>

            <ThemeToggle />
            {/* Mobile Menu Button - Animated Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 relative z-[60]"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <motion.span 
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white block rounded-full origin-center transition-all duration-300"
                />
                <motion.span 
                  animate={isMenuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: "100%" }}
                  className="w-full h-0.5 bg-white block rounded-full transition-all duration-300"
                />
                <motion.span 
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white block rounded-full origin-center transition-all duration-300"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <AnimatePresence>
        {pathnames.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-bg-secondary/50 border-b border-border py-2.5"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center space-x-2 text-xs md:text-sm text-text-secondary overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return (
                    <React.Fragment key={to}>
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                      {last ? (
                        <span className="text-primary font-medium truncate max-w-[150px] md:max-w-xs">{getBreadcrumbName(value)}</span>
                      ) : (
                        <Link to={to} className="hover:text-primary transition-colors">
                          {getBreadcrumbName(value)}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed inset-0 z-[60] w-full h-[100dvh] bg-bg-primary shadow-2xl transition-colors duration-300 flex flex-col"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Logo size="sm" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm duration-300"
                aria-label="Close menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 pt-0.5">
                  <motion.span 
                    animate={{ rotate: 45, y: 8 }}
                    className="w-full h-0.5 bg-current block rounded-full origin-center"
                  />
                  <motion.span 
                    animate={{ opacity: 0, width: 0 }}
                    className="w-full h-0.5 bg-current block rounded-full"
                  />
                  <motion.span 
                    animate={{ rotate: -45, y: -8 }}
                    className="w-full h-0.5 bg-current block rounded-full origin-center"
                  />
                </div>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              {/* Mobile Search */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">
                  Quick Search
                </h3>
                <SearchAutocomplete />
              </motion.div>
              
              {/* Mobile Links */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-2 italic">
                  Navigation
                </h3>
                <nav className="grid grid-cols-2 gap-3">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <motion.div 
                        key={link.name} 
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotateX: 10, rotateY: 5, z: 20 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Link
                          to={link.to}
                          className={`flex flex-col items-start justify-between min-h-[100px] p-5 rounded-3xl font-black transition-all border group ${
                            isActive 
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                            : 'bg-bg-secondary text-text-primary border-transparent hover:border-primary/20 shadow-sm'
                          }`}
                          onClick={() => handleLinkClick(link.to)}
                        >
                          <span className="text-lg leading-tight">{link.name}</span>
                          <ChevronRight className={`w-5 h-5 mt-auto self-end transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-text-secondary'}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] px-2 italic">
                  Preferences
                </h3>
                <motion.button
                  whileHover={{ scale: 1.02, rotateX: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTheme();
                  }}
                  className="flex items-center justify-between w-full px-4 py-4 bg-bg-secondary hover:bg-border rounded-2xl text-text-primary font-bold transition-all border border-transparent shadow-sm"
                  aria-label="Toggle theme"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-bg-primary border border-border shadow-sm">
                      {theme === 'light' ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                    </div>
                    <span>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
                  </div>
                </motion.button>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="p-6 border-t border-border bg-bg-secondary/50"
            >
              <p className="text-center text-[10px] text-text-secondary font-black uppercase tracking-widest opacity-60">
                Curiva Homoeopathy © 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
