import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Compass, 
  Layers, 
  HelpCircle, 
  Award, 
  Bookmark, 
  Sparkles, 
  ChevronRight,
  ChevronDown, 
  GraduationCap, 
  Activity, 
  FileText,
  BookOpenText,
  Clock,
  ArrowLeft,
  BookMarked
} from 'lucide-react';

interface LearningSidebarProps {
  currentSubject?: 'anatomy' | 'physiology' | 'fmt' | 'materia-medica' | 'organon' | 'repertory';
  completedCount?: number;
  totalCount?: number;
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export default function LearningSidebar({
  currentSubject = 'anatomy',
  completedCount = 0,
  totalCount = 10,
  activeItem = 'overview',
  onItemClick
}: LearningSidebarProps) {
  const location = useLocation();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Standard menu items for learning pages
  const primaryMenuItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen, path: '#' },
    { id: 'syllabus', label: 'Syllabus Map', icon: Compass, path: '/cbdc-syllabus' },
    { id: 'units', label: 'Units & Chapters', icon: Layers, path: '#' },
    { id: 'glossary', label: 'Medical Lexicon', icon: BookMarked, path: '/lexicon' },
    { id: 'flowcharts', label: 'Study Flowcharts', icon: Sparkles, path: '/visualization' },
  ];

  const assessmentMenuItems = [
    { id: 'mcqs', label: 'Practice MCQs', icon: HelpCircle, path: '/mcq-practice' },
    { id: 'pyqs', label: 'Solved PYQs', icon: Award, path: '/student-resources' },
    { id: 'viva', label: 'Viva Oral Booster', icon: Clock, path: '/student-resources' },
    { id: 'bookmarks', label: 'My Bookmarks', icon: Bookmark, path: '/library' },
  ];

  const subjects = [
    { id: 'anatomy', label: 'Anatomy Study', path: '/anatomy', icon: Activity, color: 'text-rose-500' },
    { id: 'physiology', label: 'Physiology Study', path: '/physiology', icon: Activity, color: 'text-sky-500' },
    { id: 'fmt', label: 'FMT & Toxicology', path: '/fmt', icon: FileText, color: 'text-emerald-500' },
    { id: 'materia-medica', label: 'Materia Medica', path: '/materia-medica', icon: BookOpen, color: 'text-amber-500' },
    { id: 'organon', label: 'Organon & Philosophy', path: '/organon-philosophy', icon: BookOpenText, color: 'text-purple-500' },
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent, path: string) => {
    if (path === '#') {
      e.preventDefault();
      if (onItemClick) {
        onItemClick(id);
      } else {
        // Fallback smooth scroll to element id if it exists
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <aside className="h-fit space-y-3 pb-10 lg:sticky lg:top-28 lg:space-y-6">
      <button
        type="button"
        onClick={() => setMobileExpanded(value => !value)}
        aria-expanded={mobileExpanded}
        aria-controls="learning-sidebar-content"
        className="flex min-h-12 w-full items-center justify-between rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm font-bold text-text-primary lg:hidden"
      >
        <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Learning navigation</span>
        <ChevronDown className={mobileExpanded ? 'h-4 w-4 rotate-180 transition-transform' : 'h-4 w-4 transition-transform'} />
      </button>
      <div id="learning-sidebar-content" className={(mobileExpanded ? 'block' : 'hidden') + ' space-y-6 lg:block'}>
      
      {/* Return Navigation */}
      <div className="flex flex-col gap-2">
        <Link
          to="/student-resources"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Progress Card Widget */}
      <div className="bg-bg-secondary border border-border rounded-2xl p-5 space-y-3 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-text-tertiary">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-primary" /> Learning Progress
          </span>
          <span className="text-primary font-mono">{progressPercent}%</span>
        </div>
        <div role="progressbar" aria-label="Learning progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent} className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden border border-border/10">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-text-secondary leading-snug font-medium">
          Completed <strong className="text-primary">{completedCount}</strong> of <strong className="text-text-primary">{totalCount}</strong> core syllabus units. Keep pushing!
        </p>
      </div>

      {/* Primary Links */}
      <div className="bg-bg-secondary border border-border rounded-2xl p-4 shadow-soft">
        <h4 className="px-3 mb-3 text-[9px] font-black uppercase tracking-widest text-text-tertiary">
          Core Navigation
        </h4>
        <nav aria-label="Learning resources" className="space-y-1">
          {primaryMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id || (item.path !== '#' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleLinkClick(item.id, e, item.path)}
                className={`w-full min-h-11 flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all font-bold group border ${
                  isActive
                    ? 'bg-primary/5 border-primary/20 text-primary'
                    : 'border-transparent text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-text-secondary'}`} />
                  <span>{item.label}</span>
                </div>
                {item.path !== '#' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Assessments & Utilities */}
      <div className="bg-bg-secondary border border-border rounded-2xl p-4 shadow-soft">
        <h4 className="px-3 mb-3 text-[9px] font-black uppercase tracking-widest text-text-tertiary">
          Recall &amp; Boards
        </h4>
        <nav aria-label="Practice and assessment" className="space-y-1">
          {assessmentMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id || (item.path !== '#' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleLinkClick(item.id, e, item.path)}
                className={`w-full min-h-11 flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all font-bold group border ${
                  isActive
                    ? 'bg-primary/5 border-primary/20 text-primary'
                    : 'border-transparent text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-tertiary group-hover:text-text-secondary'}`} />
                  <span>{item.label}</span>
                </div>
                {item.path !== '#' && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Related Subjects */}
      <div className="bg-bg-secondary border border-border rounded-2xl p-4 shadow-soft">
        <h4 className="px-3 mb-3 text-[9px] font-black uppercase tracking-widest text-text-tertiary">
          Related Core Subjects
        </h4>
        <div className="space-y-1">
          {subjects
            .filter((sub) => sub.id !== currentSubject)
            .map((sub) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.id}
                  to={sub.path}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-bg-primary text-xs font-bold text-text-secondary hover:text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg bg-bg-primary group-hover:bg-bg-secondary transition-colors`}>
                      <Icon className={`w-3.5 h-3.5 ${sub.color}`} />
                    </div>
                    <span>{sub.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-text-tertiary group-hover:translate-x-0.5 transition-transform" />
                </Link>
              );
            })}
        </div>
      </div>

          </div>
    </aside>
  );
}
