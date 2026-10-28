import React, { useState, useEffect, useMemo } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight, Home, ArrowRight, Globe, Sun, Moon, Sparkles, ShoppingBag, Library, Crown, Activity, HelpCircle, Cpu, BookOpen, GraduationCap, User, ShieldCheck, Brain } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useRole } from '../context/RoleContext';
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
import ProfileSwitch from './ProfileSwitch';

const MobileNavLink = ({ link, isActive, itemVariants, handleLinkClick, location }: any) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const hasDropdown = 'dropdown' in link || 'megaMenu' in link;
  const LinkIcon = link.icon ? (Icons as any)[link.icon] : null;

  const dropdownItems = useMemo(() => {
    if (link.dropdown) return link.dropdown;
    const items = [];
    if (link.popular) items.push(...link.popular);
    if (link.pinned) items.push(...link.pinned);
    return items;
  }, [link.dropdown, link.popular, link.pinned]);

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
            isActive || dropdownItems.some((d: any) => location.pathname === d.to)
            ? 'bg-primary/5 text-primary border-primary/20' 
            : 'bg-bg-secondary text-text-primary border-transparent shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            {LinkIcon && <LinkIcon className="w-5 h-5 text-accent shrink-0" />}
            <span className="text-lg leading-tight">{link.name}</span>
          </div>
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
              {dropdownItems.map((sub: any) => {
                const isSubActive = location.pathname === sub.to;
                const hasHighlight = link.isGlossary && sub.highlight;
                const isExternal = typeof sub.to === 'string' && sub.to.startsWith('http');
                const LinkComponent = (isExternal ? 'a' : Link) as any;
                const linkProps = isExternal 
                  ? { href: sub.to, target: "_blank", rel: "noopener noreferrer" }
                  : { to: sub.to };

                return (
                  <LinkComponent
                    key={sub.name}
                    {...linkProps}
                    onClick={() => {
                      if (!isExternal) handleLinkClick(sub.to);
                    }}
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
                  </LinkComponent>
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
      {(() => {
        const isExternal = typeof link.to === 'string' && link.to.startsWith('http');
        const LinkComponent = (isExternal ? 'a' : Link) as any;
        const linkProps = isExternal 
          ? { href: link.to, target: "_blank", rel: "noopener noreferrer" }
          : { to: link.to };

        return (
          <LinkComponent
            {...linkProps}
            className={`flex items-center justify-between p-5 rounded-3xl font-black transition-all border group ${
              isActive 
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
              : 'bg-bg-secondary text-text-primary border-transparent hover:border-primary/20 shadow-sm'
            }`}
            onClick={() => {
              if (!isExternal) handleLinkClick(link.to);
            }}
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
              <div className="flex items-center gap-3">
                {LinkIcon && <LinkIcon className="w-5 h-5 text-accent shrink-0" />}
                <span className="text-lg leading-tight">{link.name}</span>
              </div>
            )}
            <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-text-secondary'}`} />
          </LinkComponent>
        );
      })()}
    </motion.div>
  );
};

const Header: React.FC = () => {
  const { profile } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [showEduBanner, setShowEduBanner] = useState(() => {
    return localStorage.getItem('curiva_edu_banner_dismissed') !== 'true';
  });

  const handleDismissEduBanner = () => {
    localStorage.setItem('curiva_edu_banner_dismissed', 'true');
    setShowEduBanner(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const drawer = document.getElementById('curiva-mobile-navigation');
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusTimer = window.setTimeout(() => {
      drawer?.querySelector<HTMLElement>('button[aria-label="Close menu"]')?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector))
        .filter((item) => item.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
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



  const { currentRole, setCurrentRole, authorizedRoles } = useRole();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Define full links list with granular role requirements (allowedRoles)
  const navLinks = [
    {
      name: 'Syllabus',
      to: '/student-resources',
      icon: 'GraduationCap',
      megaMenu: true,
      dropdownWidth: 'w-[920px]',
      tooltip: 'Hierarchical BHMS syllabus progression from 1st to 4th Year.',
      allowedRoles: ['BHMS Student', 'Intern', 'Faculty', 'Administrator'],
      featured: {
        name: 'BHMS Curriculum Overview',
        to: '/cbdc-syllabus',
        desc: 'Complete NCH CBDC competency-based curriculum mapping for all professional years.',
        badge: 'Official',
        icon: 'Compass'
      },
      popular: [
        { name: '1st BHMS Portal', to: '/portal/1st-bhms', desc: 'Anatomy, Physiology, Pharmacy, MM & Organon', badge: 'Foundations', icon: 'BookOpen' },
        { name: '2nd BHMS Portal', to: '/portal/2nd-bhms', desc: 'Pathology, FMT, MM, Organon, Surgery, ObGyn & PM', badge: 'Active Hub', icon: 'Layers' },
        { name: '3rd BHMS Portal', to: '/portal/3rd-bhms', desc: 'Surgery, OBG, MM & Organon', badge: 'Clinical Mastery', icon: 'Heart' },
        { name: '4th BHMS Portal', to: '/portal/4th-bhms', desc: 'Medicine, Repertory, MM & Organon', badge: 'Practice & Rep', icon: 'ShieldCheck' }
      ],
      pinned: [
        { name: '1st BHMS Crash Course', to: '/first-bhms-crash-course', desc: 'Flagship exam preparation for 1st Year', badge: 'Flagship', icon: 'Zap' },
        { name: 'Anatomy Library', to: '/anatomy', desc: 'Regional & clinical anatomy modules', icon: 'Activity' },
        { name: 'Physiology Hub', to: '/physiology', desc: 'Vital systems & biochemistry', icon: 'Cpu' },
        { name: 'Organon Philosophy', to: '/organon-philosophy', desc: 'The Art of Healing (§1–294)', icon: 'BookOpenText' }
      ]
    },
    {
      name: 'Clinical Hub',
      to: '/clinical-guides',
      icon: 'Activity',
      megaMenu: true,
      dropdownWidth: 'w-[840px]',
      tooltip: 'Remedy profiles, miasms, and clinical diagnostic handbooks.',
      allowedRoles: ['BHMS Student', 'Intern', 'Practitioner', 'Faculty', 'Researcher', 'Administrator'],
      featured: {
        name: 'Materia Medica Search',
        to: '/materia-medica',
        desc: 'Advanced search through 150+ classical remedies with keynotes and modalities.',
        badge: 'Reference',
        icon: 'Search'
      },
      popular: [
        { name: 'Find Your Remedy', to: '/find-your-remedy', desc: 'Symptomatic remedy match guide', badge: 'New', icon: 'BookOpen' },
        { name: 'Disease Library', to: '/clinical-handbook', desc: 'Diagnostic criteria & therapeutic maps', icon: 'Heart' },
        { name: 'Miasms Encyclopedia', to: '/miasms', desc: 'Psora, Sycosis & Syphilis study', icon: 'Sparkles' },
        { name: 'Symptom Repertory', to: '/symptom-checker', desc: 'Repertorization tools & case logs', icon: 'Compass' }
      ],
      pinned: [
        { name: 'Conditions Explained', to: '/conditions', desc: 'Understanding clinical patterns in common ailments', icon: 'BookOpenText' },
        { name: 'CBC Hemogram Tool', to: '/cbc-handbook', desc: 'Interactive blood report analyzer', icon: 'Activity' },
        { name: 'Clinical Therapeutics', to: '/clinical-guides', desc: 'Condition-wise remedy mapping', icon: 'BookOpen' }
      ]
    },
    {
      name: 'Materia Medica',
      to: '/materia-medica',
      icon: 'Library',
      columns: 1,
      dropdownWidth: 'w-72',
      align: 'left',
      tooltip: 'Materia Medica resources, case repertories, and diagnostic guides.',
      allowedRoles: ['Guest', 'General Public', 'BHMS Student', 'Intern', 'Practitioner', 'Faculty', 'Researcher', 'Administrator'],
      dropdown: [
        { name: 'Materia Medica', to: '/materia-medica', desc: 'Search through 150+ classical remedies' },
        { name: 'Repertory Tools', to: '/repertory', desc: 'Case analysis and symptoms mapping' },
        { name: 'Clinical Guides', to: '/clinical-guides', desc: 'Condition-wise therapeutic references' }
      ]
    },
    {
      name: 'Academy',
      to: '/student-resources',
      icon: 'Sparkles',
      megaMenu: true,
      dropdownWidth: 'w-[840px]',
      align: 'right',
      tooltip: 'Exam prep, MCQs, and active recall study modules.',
      allowedRoles: ['BHMS Student', 'Intern', 'Faculty', 'Administrator'],
      featured: {
        name: 'MCQ Practice Board',
        to: '/mcq-practice',
        desc: '5,000+ solved entrance exam and university mock questions.',
        badge: 'Exam Prep',
        icon: 'Award'
      },
      popular: [
        { name: 'Study Hub Portal', to: '/student-resources', desc: 'Unified study plans & revision notes', icon: 'GraduationCap' },
        { name: 'Interactive Quizzes', to: '/quizzes', desc: 'Short, engaging knowledge checks', badge: 'New', icon: 'Brain' },
        { name: '20-Feature Study Toolkit', to: '/study-toolkit', desc: 'Focus timer, planner, notes, flashcards and revision tracking', badge: 'New', icon: 'Target' },
        { name: 'Visual Node Maps', to: '/visualization', desc: 'Interactive remedy relationship maps', icon: 'Compass' }
      ],
      pinned: [
        { name: 'University PYQs', to: '/student-resources', desc: 'Solved previous year papers', icon: 'Award' },
        { name: 'Viva Oral Booster', to: '/student-resources', desc: 'Oral examination keys & definitions', icon: 'Clock' }
      ]
    },
    {
      name: 'Resources',
      to: '/about',
      icon: 'Info',
      columns: 1,
      dropdownWidth: 'w-72',
      align: 'right',
      tooltip: 'Historical lineage, stalwarts, and public health guides.',
      allowedRoles: ['Guest', 'General Public', 'BHMS Student', 'Intern', 'Practitioner', 'Faculty', 'Researcher', 'Administrator'],
      dropdown: [
        { name: 'About Curiva', to: '/about', desc: 'Our vision & academic board', icon: 'Info' },
        { name: 'Interactive Quizzes', to: '/quizzes', desc: 'Test your homoeopathic knowledge', icon: 'Brain' },
        { name: 'Stalwarts Gallery', to: '/stalwarts', desc: 'Biographies of the masters', icon: 'Award' },
        { name: 'Historical Timeline', to: '/lexicon/historical', desc: 'Evolution of Homoeopathy', icon: 'Clock' },
        { name: 'Patient Education', to: '/public-education', desc: 'Public health guides & FAQs', icon: 'Globe' }
      ]
    }
  ];

  // Keep the patient navigation deliberately separate from academic and practitioner workspaces.
  // This is presentation-level navigation only; protected data must still be authorized by the backend.
  const patientNavigation = [
    {
      name: 'Health Education',
      to: '/public-education',
      icon: 'Heart',
      columns: 1,
      dropdownWidth: 'w-72',
      align: 'left',
      tooltip: 'Plain-language health education and patient information.',
      allowedRoles: ['Guest', 'Public', 'General Public'],
      dropdown: [
        { name: 'Patient Education', to: '/public-education', desc: 'Accessible health information', icon: 'Heart' },
        { name: 'Condition Guides', to: '/conditions', desc: 'Learn about common health topics', icon: 'BookOpen' },
        { name: 'Health eBooks', to: '/ebooks', desc: 'Browse patient education reading', icon: 'BookMarked' },
        { name: 'Frequently Asked Questions', to: '/faq', desc: 'Answers about Curiva', icon: 'HelpCircle' }
      ]
    },
    {
      name: 'Ask a Question',
      to: '/ask-Homoeopath',
      icon: 'HelpCircle',
      tooltip: 'Learn how to submit an education or support question.',
      allowedRoles: ['Guest', 'Public', 'General Public']
    },
    {
      name: 'Support',
      to: '/support',
      icon: 'Info',
      tooltip: 'Get assistance with Curiva.',
      allowedRoles: ['Guest', 'Public', 'General Public']
    }
  ];

  // Public/Patient roles use a dedicated navigation; student and practitioner roles retain their specialist menus.
  const isPatientWorkspace = ['Guest', 'Public', 'General Public'].includes(currentRole);
  const roleFilteredLinks = isPatientWorkspace
    ? patientNavigation
    : navLinks.filter(link => link.allowedRoles.includes(currentRole));

  const userNavLinks = [...roleFilteredLinks] as any[];
  const half = Math.ceil(userNavLinks.length / 2);
  const leftLinks = userNavLinks.slice(0, half);
  const rightLinks = userNavLinks.slice(half);
  if (profile) {
    userNavLinks.push({
      name: 'Dashboard',
      to: '/profile',
      isProfile: true,
      photoURL: profile.photoURL,
      allowedRoles: ['Guest', 'General Public', 'BHMS Student', 'Intern', 'Practitioner', 'Faculty', 'Researcher', 'Administrator']
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
    <>
      {showEduBanner && (
        <div className="hidden sm:flex bg-gradient-to-r from-emerald-950 via-zinc-950 to-emerald-950 text-white border-b border-emerald-500/10 py-3 px-4 text-center relative z-[60] flex-col md:flex-row items-center justify-center gap-3 shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center gap-2 relative z-10 text-[11px] md:text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-[#10B981] animate-pulse shrink-0" />
            <span className="text-[#a7f3d0] font-black uppercase tracking-widest text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">Academic Portal</span>
            <p className="text-zinc-200 font-sans tracking-tight text-center md:text-left">
              All BHMS study notes, preparations, and Materia Medica references are unified in our local <strong>Student Resources</strong> guides!
            </p>
          </div>
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <Link 
              to="/student-resources" 
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[9px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-1 group"
            >
              <span>Visit Guides</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button 
              onClick={handleDismissEduBanner}
              className="p-1 text-zinc-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
          ? 'bg-bg-primary/80 backdrop-blur-2xl border-b border-border shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-14' 
          : 'bg-bg-primary border-b border-transparent h-16'
        }`}
      >
      <div className="max-w-7xl mx-auto h-full w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full w-full min-w-0 items-center justify-between gap-2 sm:gap-4">
          
          {/* Desktop Navigation Left */}
          <nav className="hidden xl:flex items-center gap-1.5 flex-1 overflow-hidden" aria-label="Main Navigation Left">
            {leftLinks.map((link: any, idx: number) => {
              const isActive = location.pathname === link.to;
              const hasDropdown = 'dropdown' in link || 'megaMenu' in link;
              const isDropdownActive = hasDropdown && (
                (link.dropdown && link.dropdown.some((d: any) => location.pathname === d.to)) ||
                (link.popular && link.popular.some((d: any) => location.pathname === d.to)) ||
                (link.pinned && link.pinned.some((d: any) => location.pathname === d.to))
              );
              const LinkIcon = link.icon ? (Icons as any)[link.icon] : null;
              const isHovered = hoveredIndex === idx;
              
              return (
                <div 
                  key={link.name || idx} 
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(idx)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoveredIndex(null);
                  }}
                >
                  <Link
                    to={link.to}
                    onClick={() => {
                      trackEvent('nav_click', { link_name: link.name, link_to: link.to });
                      handleLinkClick(link.to);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border relative overflow-hidden group/nav ${
                      isActive || isDropdownActive
                      ? 'text-primary bg-primary/5 border-primary/10' 
                      : isHovered 
                        ? 'text-primary bg-bg-secondary border-transparent' 
                        : 'text-text-secondary border-transparent hover:text-primary'
                    }`}
                  >
                    {LinkIcon && <LinkIcon className="w-4 h-4 text-accent shrink-0" />}
                    <span>{link.name}</span>
                    {hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />}
                    
                    {/* Active/Hover Indicator Line */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ${isActive || isDropdownActive || isHovered ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}`} />
                  </Link>

                  <AnimatePresence>
                    {isHovered && hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute top-full left-0 mt-3 bg-white dark:bg-zinc-950 border border-border dark:border-zinc-800 rounded-3xl shadow-2xl p-6 z-50 ${link.dropdownWidth || 'w-64'}`}
                      >
                         {/* MegaMenu content is rendered dynamically based on link.megaMenu boolean */}
                         {link.megaMenu ? (
                           <div className="grid grid-cols-12 gap-8">
                             <div className="col-span-4 border-r border-border pr-6 flex flex-col justify-between">
                               <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                                      {React.createElement((Icons as any)[link.icon] || Icons.BookOpen, { className: 'w-5 h-5' })}
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary">{link.name}</h4>
                                  </div>
                                  <p className="text-[11px] text-text-secondary leading-relaxed">{link.tooltip}</p>
                               </div>
                               {link.featured && (
                                 <Link to={link.featured.to} className="mt-6 p-5 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all block group">
                                   <span className="px-2 py-1 rounded bg-primary text-white text-[8px] font-black uppercase tracking-widest mb-3 inline-block">{link.featured.badge}</span>
                                   <h5 className="text-xs font-black uppercase tracking-wider mb-1 group-hover:text-primary">{link.featured.name}</h5>
                                   <p className="text-[10px] text-text-secondary leading-relaxed">{link.featured.desc}</p>
                                 </Link>
                               )}
                             </div>
                             <div className="col-span-4 space-y-4">
                               <h4 className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Progression Path</h4>
                               <div className="space-y-2">
                                 {link.popular?.map((sub: any) => (
                                   <Link key={sub.name} to={sub.to} className="flex flex-col p-3 rounded-2xl hover:bg-bg-secondary border border-transparent hover:border-border transition-all">
                                     <span className="text-[11px] font-black uppercase tracking-wider mb-1">{sub.name}</span>
                                     <span className="text-[10px] text-text-tertiary font-serif italic">{sub.desc}</span>
                                   </Link>
                                 ))}
                               </div>
                             </div>
                             <div className="col-span-4 space-y-4">
                               <h4 className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Quick Links</h4>
                               <div className="space-y-2">
                                 {link.pinned?.map((sub: any) => (
                                   <Link key={sub.name} to={sub.to} className="flex flex-col p-3 rounded-2xl hover:bg-bg-secondary border border-transparent hover:border-border transition-all">
                                     <span className="text-[11px] font-black uppercase tracking-wider mb-1">{sub.name}</span>
                                     <span className="text-[10px] text-text-tertiary font-serif italic">{sub.desc}</span>
                                   </Link>
                                 ))}
                               </div>
                             </div>
                           </div>
                         ) : (
                           <div className="space-y-1">
                             {link.dropdown?.map((sub: any) => (
                               <Link key={sub.name} to={sub.to} className="flex flex-col p-3 rounded-2xl hover:bg-bg-secondary border border-transparent hover:border-border transition-all">
                                 <span className="text-[11px] font-black uppercase tracking-wider mb-1">{sub.name}</span>
                                 <span className="text-[10px] text-text-tertiary font-serif italic">{sub.desc}</span>
                               </Link>
                             ))}
                           </div>
                         )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Mobile brand is independent of desktop navigation geometry. */}
          <div className="flex min-w-0 flex-1 items-center xl:hidden">
            <Link to="/" onClick={() => handleLinkClick('/')} aria-label="Curiva home" className="inline-flex min-w-0 items-center">
              <Logo size="sm" className="max-w-full" />
            </Link>
          </div>

          {/* Desktop Logo Center */}
          <div className="hidden xl:flex justify-center px-2 sm:px-4 lg:px-6 flex-shrink-0">
            <Link 
              to="/" 
              onClick={() => handleLinkClick('/')} 
              className="flex flex-col items-center hover:scale-105 transition-transform group"
              aria-label="Home"
            >
              <div className="flex min-w-0 items-center justify-center">
                <Logo size="md" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Right */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-1.5 xl:flex">
            <nav className="flex items-center gap-1.5" aria-label="Main Navigation Right">
              {rightLinks.map((link: any, idx: number) => {
                const actualIdx = idx + half;
                const isActive = location.pathname === link.to;
                const hasDropdown = 'dropdown' in link || 'megaMenu' in link;
                const isDropdownActive = hasDropdown && (
                  (link.dropdown && link.dropdown.some((d: any) => location.pathname === d.to)) ||
                  (link.popular && link.popular.some((d: any) => location.pathname === d.to)) ||
                  (link.pinned && link.pinned.some((d: any) => location.pathname === d.to))
                );
                const isHovered = hoveredIndex === actualIdx;
                const LinkIcon = link.icon ? (Icons as any)[link.icon] : null;

                return (
                  <div 
                    key={link.name || actualIdx} 
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(actualIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(actualIdx)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoveredIndex(null);
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => handleLinkClick(link.to)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border relative overflow-hidden group/nav ${
                        isActive || isDropdownActive
                        ? 'text-primary bg-primary/5 border-primary/10' 
                        : isHovered 
                          ? 'text-primary bg-bg-secondary border-transparent' 
                          : 'text-text-secondary border-transparent hover:text-primary'
                      }`}
                    >
                      {LinkIcon && <LinkIcon className="w-4 h-4 text-accent shrink-0" />}
                      <span>{link.name}</span>
                      {hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />}
                      
                      {/* Active/Hover Indicator Line */}
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ${isActive || isDropdownActive || isHovered ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}`} />
                    </Link>

                    <AnimatePresence>
                      {isHovered && hasDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className={`absolute top-full right-0 mt-3 bg-white dark:bg-zinc-950 border border-border dark:border-zinc-800 rounded-3xl shadow-2xl p-6 z-50 ${link.dropdownWidth || 'w-64'}`}
                        >
                          {link.megaMenu ? (
                             <div className="grid grid-cols-12 gap-8">
                               <div className="col-span-4 border-r border-border pr-6 flex flex-col justify-between">
                                 <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 bg-primary/10 rounded-xl text-primary">
                                        {React.createElement((Icons as any)[link.icon] || Icons.Sparkles, { className: 'w-5 h-5' })}
                                      </div>
                                      <h4 className="text-xs font-black uppercase tracking-widest text-primary">{link.name}</h4>
                                    </div>
                                    <p className="text-[11px] text-text-secondary leading-relaxed">{link.tooltip}</p>
                                 </div>
                               </div>
                               <div className="col-span-8 grid grid-cols-2 gap-4">
                                 <div className="space-y-4">
                                   <h4 className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Resources</h4>
                                   <div className="space-y-2">
                                     {link.popular?.map((sub: any) => (
                                       <Link key={sub.name} to={sub.to} className="flex flex-col p-3 rounded-2xl hover:bg-bg-secondary border border-transparent hover:border-border transition-all">
                                         <span className="text-[11px] font-black uppercase tracking-wider mb-1">{sub.name}</span>
                                         <span className="text-[10px] text-text-tertiary font-serif italic">{sub.desc}</span>
                                       </Link>
                                     ))}
                                   </div>
                                 </div>
                                 <div className="space-y-4">
                                   <h4 className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Pinned</h4>
                                   <div className="space-y-2">
                                     {link.pinned?.map((sub: any) => (
                                       <Link key={sub.name} to={sub.to} className="flex flex-col p-3 rounded-2xl hover:bg-bg-secondary border border-transparent hover:border-border transition-all">
                                         <span className="text-[11px] font-black uppercase tracking-wider mb-1">{sub.name}</span>
                                         <span className="text-[10px] text-text-tertiary font-serif italic">{sub.desc}</span>
                                       </Link>
                                     ))}
                                   </div>
                                 </div>
                               </div>
                             </div>
                          ) : (
                            <div className="space-y-1">
                              {link.dropdown?.map((sub: any) => (
                                <Link key={sub.name} to={sub.to} className="flex flex-col p-3 rounded-2xl hover:bg-bg-secondary border border-transparent hover:border-border transition-all">
                                  <span className="text-[11px] font-black uppercase tracking-wider mb-1">{sub.name}</span>
                                  <span className="text-[10px] text-text-tertiary font-serif italic">{sub.desc}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
            <div className="w-px h-8 bg-border/50" />
            <div className="flex items-center gap-3">
              <Link
                to="/find-your-remedy"
                className="hidden 2xl:flex items-center gap-2 px-4 py-2 bg-[#134634] hover:bg-[#BF8F02] text-white rounded-full font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm group"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Find Remedy</span>
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <ThemeToggle />
              <ProfileSwitch />
              <AuthButton />
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 xl:hidden">
             <ThemeToggle />
             <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg active:scale-95 transition-transform"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="curiva-mobile-navigation"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Small screens use thumb-first navigation; desktop retains full mega menus. */}
      <nav aria-label="Mobile quick navigation" className="xl:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-primary/95 backdrop-blur-xl px-2 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
          <Link to="/" onClick={() => handleLinkClick('/')} aria-current={location.pathname === '/' ? 'page' : undefined} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl bg-primary/5 text-primary text-[10px] font-bold transition-colors">
            <Home className="h-5 w-5" aria-hidden="true" /><span>Home</span>
          </Link>
          <Link to={isPatientWorkspace ? '/public-education' : (currentRole === 'Practitioner' || currentRole === 'Researcher' ? '/clinical-guides' : '/student-resources')} onClick={() => setIsMenuOpen(false)} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold text-text-secondary hover:bg-bg-secondary transition-colors">
            <BookOpen className="h-5 w-5" aria-hidden="true" /><span>Explore</span>
          </Link>
          <button type="button" onClick={() => { setIsMenuOpen(true); window.setTimeout(() => document.querySelector<HTMLInputElement>('#curiva-mobile-navigation input')?.focus(), 180); }} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold text-text-secondary hover:bg-bg-secondary transition-colors">
            <Search className="h-5 w-5" aria-hidden="true" /><span>Search</span>
          </button>
          <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open full navigation menu" className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold text-text-secondary hover:bg-bg-secondary transition-colors">
            <Menu className="h-5 w-5" aria-hidden="true" /><span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            id="curiva-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="xl:hidden fixed inset-0 z-[60] w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-bg-primary shadow-2xl flex flex-col"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] sm:p-6 border-b border-border">
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

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 pb-8 sm:p-6 space-y-7 sm:space-y-10">
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

              {/* Account Portal & Mobile Role Switcher */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-2 italic">
                  Active Workspace Profile
                </h3>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {authorizedRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setCurrentRole(role);
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-2 border rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-all ${
                        currentRole === role
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-secondary text-text-secondary border-transparent'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-2 italic pt-2">
                  Account Portal
                </h3>
                <div className="px-2 flex justify-start w-full">
                  <AuthButton isMobile={true} onCloseMenu={() => setIsMenuOpen(false)} />
                </div>
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
  </>
  );
};

export default Header;
