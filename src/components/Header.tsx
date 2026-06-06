import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight, Home, ArrowRight, Globe, Sun, Moon, Sparkles, ShoppingBag, Library, Crown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { trackEvent } from '../lib/analytics';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import AuthButton from './AuthButton';
import Logo from './Logo';
import { useUser } from '../hooks/useUser';

import SearchAutocomplete from './SearchAutocomplete';

const MobileNavLink = ({ link, isActive, itemVariants, handleLinkClick, location }: any) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const hasDropdown = 'dropdown' in link;

  if (hasDropdown) {
    return (
      <motion.div 
        key={link.name} 
        variants={itemVariants}
        className="space-y-2"
      >
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className={`flex items-center justify-between w-full p-5 rounded-3xl font-black transition-all border group ${
            isActive || link.dropdown?.some((d: any) => location.pathname === d.to)
            ? 'bg-primary/5 text-primary border-primary/20' 
            : 'bg-bg-secondary text-text-primary border-transparent shadow-sm'
          }`}
        >
          <span className="text-lg leading-tight">{link.name}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <AnimatePresence>
          {isSubMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pl-4 pr-1 py-1 space-y-3"
            >
              {link.dropdown.map((sub: any) => {
                const isSubActive = location.pathname === sub.to;
                const hasHighlight = link.isGlossary && sub.highlight;
                return (
                  <Link
                    key={sub.name}
                    to={sub.to}
                    onClick={() => handleLinkClick(sub.to)}
                    className={`flex flex-col items-start p-4.5 rounded-2xl text-sm border font-bold transition-all ${
                      isSubActive
                      ? 'bg-primary text-white border-primary shadow-md'
                      : hasHighlight
                        ? `${sub.highlight} border hover:shadow-soft active:scale-[0.99]`
                        : 'bg-bg-secondary text-text-secondary border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-black ${isSubActive ? 'text-white' : ''}`}>{sub.name}</span>
                        {sub.badge && (
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${
                            isSubActive 
                            ? 'bg-white/20 border-white/30 text-white' 
                            : 'bg-current/10 border-current/20 text-current'
                          }`}>
                            {sub.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className={`w-4 h-4 opacity-50 ${isSubActive ? 'text-white' : ''}`} />
                    </div>
                    {sub.desc && (
                      <span className={`text-xs mt-1.5 font-serif italic font-medium leading-relaxed text-left ${isSubActive ? 'text-white/80' : 'text-text-tertiary'}`}>
                        {sub.desc}
                      </span>
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key={link.name} 
      variants={itemVariants}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={link.to}
        className={`flex items-center justify-between p-5 rounded-3xl font-black transition-all border group ${
          isActive 
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
          : 'bg-bg-secondary text-text-primary border-transparent hover:border-primary/20 shadow-sm'
        }`}
        onClick={() => handleLinkClick(link.to)}
      >
        {link.isProfile ? (
          <div className="flex items-center gap-3">
            <img 
              src={link.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&q=80'} 
              alt="User Portrait" 
              className="w-7 h-7 rounded-lg object-cover border border-white/20 shrink-0" 
            />
            <span className="text-lg leading-tight">Dashboard</span>
          </div>
        ) : (
          <span className="text-lg leading-tight">{link.name}</span>
        )}
        <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-text-secondary'}`} />
      </Link>
    </motion.div>
  );
};

const Header: React.FC = () => {
  const { profile } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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



  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Materia Medica', to: '/materia-medica' },
    { name: 'Clinical Guides', to: '/clinical-guides' },
    { 
      name: 'Glossary', 
      to: '/glossary',
      isGlossary: true,
      dropdown: [
        { 
          name: 'Organon & Philosophy', 
          to: '/glossary/philosophy', 
          category: 'Organon',
          highlight: 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/20 text-amber-700 dark:text-amber-400',
          badge: 'Organon',
          desc: 'Explore Hahnemannian principles & philosophies'
        },
        { 
          name: 'Materia Medica (Remedies)', 
          to: '/glossary/all', 
          category: 'Materia',
          highlight: 'bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500/20 text-emerald-700 dark:text-emerald-400',
          badge: 'Materia',
          desc: 'Comprehensive A-Z homeopathic drug pictures'
        },
        { 
          name: 'Clinical & Therapeutics', 
          to: '/glossary/clinical', 
          category: 'Clinical',
          highlight: 'bg-sky-500/10 hover:bg-sky-500/15 border-sky-500/20 text-sky-700 dark:text-sky-400',
          badge: 'Clinical',
          desc: 'Diagnostic guides & therapeutic protocols'
        },
        { 
          name: 'Historical Archives', 
          to: '/glossary/historical', 
          category: 'Historical',
          highlight: 'bg-slate-500/10 hover:bg-slate-500/15 border-slate-500/20 text-slate-700 dark:text-slate-400',
          badge: 'History',
          desc: 'The genesis and evolution of homeopathy'
        }
      ]
    },
    { name: 'Research', to: '/research' },
    { 
      name: 'Stalwarts', 
      to: '/stalwarts',
      dropdown: [
        { name: 'Samuel Hahnemann', to: '/stalwarts/hahnemann' },
        { name: 'J.T. Kent', to: '/stalwarts/kent' },
        { name: 'C.M. Boger', to: '/stalwarts/boger' },
        { name: 'Richard Hughes', to: '/stalwarts/hughes' },
        { name: 'Boenninghausen', to: '/stalwarts/boenninghausen' },
        { name: 'Constantine Hering', to: '/stalwarts/hering' },
      ]
    },
    { 
      name: 'Analysis', 
      to: '/analysis',
      dropdown: [
        { name: 'Comparison Tool', to: '/analysis' },
        { name: 'Repertory Tool', to: '/repertory' },
        { name: 'Relationship Map', to: '/relationships' },
        { name: 'Visualizer', to: '/visualization' },
      ]
    },
    { name: 'Ask Expert', to: '/ask-homeopath' },
    { name: 'Library', to: '/library' },
  ];

  const userNavLinks = [...navLinks] as any[];
  if (profile) {
    userNavLinks.push({
      name: 'Dashboard',
      to: '/profile',
      isProfile: true,
      photoURL: profile.photoURL
    });
  }

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
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
      ? 'bg-bg-primary/80 backdrop-blur-2xl border-b border-border shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-20' 
      : 'bg-bg-primary border-b border-transparent h-24'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 h-full">
        <div className="flex justify-between items-center h-full gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('/')} 
              className="flex items-center hover:scale-105 transition-transform"
              aria-label="Home"
            >
              <Logo size={isScrolled ? "xs" : "sm"} />
            </Link>

            <div className="hidden lg:block w-px h-8 bg-border/50" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {userNavLinks.map((link: any, idx) => {
                const isActive = location.pathname === link.to;
                const hasDropdown = 'dropdown' in link;
                
                if (hasDropdown) {
                  return (
                    <div key={link.name || idx} className="relative group/nav-item">
                      <button
                        aria-haspopup="true"
                        aria-expanded="false"
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border border-transparent ${
                          isActive || link.dropdown?.some((d: any) => location.pathname === d.to)
                          ? 'text-primary bg-primary/5 border-primary/10' 
                          : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-3 h-3 transition-transform group-hover/nav-item:rotate-180 opacity-50" />
                      </button>
                      <div className={`absolute top-full left-0 mt-3 bg-bg-primary border border-border rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-3.5 opacity-0 invisible group-hover/nav-item:opacity-100 group-hover/nav-item:visible transition-all duration-500 z-50 translate-y-4 group-hover/nav-item:translate-y-0 ${
                        link.isGlossary ? 'w-80' : 'w-64'
                      }`}>
                        <div className="grid gap-1.5 font-sans">
                          {link.dropdown?.map((sub: any) => {
                            const isSubActive = location.pathname === sub.to;
                            const hasHighlight = link.isGlossary && sub.highlight;
                            return (
                              <Link
                                key={sub.name}
                                to={sub.to}
                                aria-current={isSubActive ? 'page' : undefined}
                                className={`flex flex-col items-start px-5 py-3 rounded-2xl transition-all border group/sub text-left ${
                                  isSubActive 
                                  ? 'text-primary bg-primary/5 border-primary/20 shadow-sm' 
                                  : hasHighlight 
                                    ? `${sub.highlight} border hover:shadow-soft hover:scale-[1.01]`
                                    : 'text-text-secondary hover:text-primary hover:bg-bg-secondary border-transparent'
                                }`}
                                onClick={() => {
                                  trackEvent('nav_click', { link_name: sub.name, link_to: sub.to });
                                  handleLinkClick(sub.to);
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black uppercase tracking-wider leading-none whitespace-nowrap">{sub.name}</span>
                                    {sub.badge && (
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-current/10 border border-current/20">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0 transition-all text-current" />
                                </div>
                                {sub.desc && (
                                  <span className="text-[10px] text-text-tertiary mt-1 group-hover/sub:text-current font-serif italic font-medium leading-tight text-left">
                                    {sub.desc}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={link.name || idx} className="relative">
                    <Link
                      to={link.to}
                      onClick={() => {
                        const trackLabel = (typeof link.name === 'string' ? link.name : 'Unknown');
                        trackEvent('nav_click', { link_name: trackLabel, link_to: link.to });
                        handleLinkClick(link.to);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all relative group whitespace-nowrap border border-transparent ${
                        isActive 
                        ? 'text-primary bg-primary/5 border-primary/10' 
                        : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
                      }`}
                    >
                      {link.isProfile ? (
                        <div className="flex items-center gap-1.5">
                          <img 
                            src={link.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&q=80'} 
                            alt="User Accent" 
                            className="w-4.5 h-4.5 rounded-full object-cover border border-primary/20 shrink-0" 
                          />
                          <span>Dashboard</span>
                        </div>
                      ) : (
                        link.name
                      )}
                      {link.isNew && (
                        <span className="px-1.5 py-0.5 rounded-md bg-primary text-[7px] text-white font-black uppercase tracking-widest absolute -top-1 -right-1 shadow-sm">New</span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center bg-bg-secondary h-12 px-2 rounded-full border border-border shadow-inner">
               <SearchAutocomplete />
            </div>

            <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-border/50">
               <ThemeToggle />
               <AuthButton />
               
               <Link
                to="/my-library"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all relative group shadow-sm border ${
                  location.pathname === '/my-library'
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-bg-secondary text-text-tertiary border-border hover:text-primary hover:border-primary/50 hover:bg-white'
                }`}
                title="My Library"
              >
                <Library className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-bg-primary"></span>
                </span>
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-3">
               <ThemeToggle />
               <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-2xl bg-primary text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 relative z-[60] active:scale-95"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>



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
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-2 italic">
                  Navigation
                </h3>
                <nav className="space-y-2">
                  {userNavLinks.map((link: any, idx) => (
                    <MobileNavLink
                      key={link.name || idx}
                      link={link}
                      isActive={location.pathname === link.to}
                      itemVariants={itemVariants}
                      handleLinkClick={handleLinkClick}
                      location={location}
                    />
                  ))}
                </nav>
              </div>

              {/* Account Portal */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-2 italic">
                  Account Portal & Workspace
                </h3>
                <div className="px-2 flex justify-start">
                  <AuthButton />
                </div>
              </motion.div>

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
