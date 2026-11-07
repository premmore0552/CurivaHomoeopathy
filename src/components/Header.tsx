import React, { useEffect, useState } from 'react';
import {
  BookOpen, Brain, ChevronDown, ChevronRight, GraduationCap, Library,
  Menu, Search, ShieldCheck, Sparkles, Stethoscope, X
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

type MenuItem = { label: string; description: string; to: string };
type NavigationGroup = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  items: MenuItem[];
};

const navigation: NavigationGroup[] = [
  {
    label: 'Learn',
    to: '/subjects',
    icon: GraduationCap,
    description: 'Follow your BHMS syllabus and continue where you left off.',
    items: [
      { label: 'All subjects', description: 'Browse the complete learning map', to: '/subjects' },
      { label: 'BHMS years', description: 'Open your professional-year portal', to: '/student-resources' },
      { label: 'Study toolkit', description: 'Plan focused study sessions', to: '/study-toolkit' },
      { label: 'Free books', description: 'Read curated learning resources', to: '/free-books' }
    ]
  },
  {
    label: 'Practice',
    to: '/quizzes',
    icon: Brain,
    description: 'Build recall through questions, flashcards and exam preparation.',
    items: [
      { label: 'Question practice', description: 'Test understanding by subject', to: '/quizzes' },
      { label: 'MCQ simulator', description: 'Prepare with exam-style questions', to: '/aiapget-mcq-simulator' },
      { label: 'Flashcards', description: 'Review concepts with active recall', to: '/flashcards' },
      { label: 'Visual study maps', description: 'See relationships between topics', to: '/visualization' }
    ]
  },
  {
    label: 'Library',
    to: '/materia-medica',
    icon: Library,
    description: 'Search the reference library for study and health-education content.',
    items: [
      { label: 'Materia Medica', description: 'Explore remedy references and keynotes', to: '/materia-medica' },
      { label: 'Repertory', description: 'Study rubrics and symptom relationships', to: '/repertory' },
      { label: 'Public education', description: 'Read plain-language health guides', to: '/public-education' },
      { label: 'My library', description: 'Return to saved learning resources', to: '/library' }
    ]
  },
  {
    label: 'Guidance',
    to: '/about',
    icon: Stethoscope,
    description: 'Understand Curiva, its learning standards and support options.',
    items: [
      { label: 'About Curiva', description: 'Learn about the platform', to: '/about' },
      { label: 'Learning support', description: 'Find answers and study guidance', to: '/faq' },
      { label: 'Privacy', description: 'Review how account information is handled', to: '/privacy-policy' },
      { label: 'Medical disclaimer', description: 'Read the educational-use boundary', to: '/disclaimer' }
    ]
  }
];

function isGroupActive(pathname: string, group: NavigationGroup) {
  return pathname === group.to || group.items.some((item) => pathname === item.to);
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>('Learn');
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const cleaned = query.trim();
    if (!cleaned) return;
    navigate('/articles?search=' + encodeURIComponent(cleaned));
    setQuery('');
    setMobileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-[70] border-b transition-all duration-300 ${
      scrolled ? 'border-border bg-bg-primary/92 shadow-sm backdrop-blur-xl' : 'border-transparent bg-bg-primary'
    }`}>
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="Curiva home">
          <Logo size="sm" />
        </Link>

        <nav className="ml-3 hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((group) => {
            const Icon = group.icon;
            const active = isGroupActive(location.pathname, group);
            const expanded = openMenu === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(group.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  to={group.to}
                  onFocus={() => setOpenMenu(group.label)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                    active || expanded ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                  }`}
                  aria-expanded={expanded}
                >
                  <Icon className="h-4 w-4" />
                  {group.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </Link>

                {expanded && (
                  <div className="absolute left-0 top-full mt-2 w-[560px] rounded-2xl border border-border bg-bg-primary p-5 shadow-2xl">
                    <div className="mb-4 flex items-start gap-3 border-b border-border pb-4">
                      <div className="rounded-xl bg-primary/10 p-2.5 text-primary"><Icon className="h-5 w-5" /></div>
                      <div>
                        <p className="font-bold text-text-primary">{group.label}</p>
                        <p className="mt-0.5 text-sm text-text-secondary">{group.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {group.items.map((item) => (
                        <Link key={item.label} to={item.to} className="group rounded-xl p-3 transition-colors hover:bg-bg-secondary">
                          <span className="flex items-center justify-between text-sm font-semibold text-text-primary">
                            {item.label}<ChevronRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-text-secondary">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                    <Link to="/profile" className="mt-4 flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
                      Continue learning <Sparkles className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 xl:block" role="search">
          <label className="sr-only" htmlFor="curiva-search">Search Curiva</label>
          <div className="flex items-center rounded-xl border border-border bg-bg-secondary px-3 focus-within:border-primary">
            <Search className="h-4 w-4 shrink-0 text-text-tertiary" />
            <input
              id="curiva-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lessons and articles"
              className="w-full bg-transparent px-2 py-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
          </div>
        </form>

        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <AuthButton />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex rounded-xl p-2 text-text-primary hover:bg-bg-secondary lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-bg-primary lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Logo size="sm" />
              <button type="button" className="rounded-xl p-2 hover:bg-bg-secondary" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={submitSearch} className="border-b border-border p-4" role="search">
              <label className="sr-only" htmlFor="curiva-mobile-search">Search Curiva</label>
              <div className="flex items-center rounded-xl border border-border bg-bg-secondary px-3">
                <Search className="h-4 w-4 text-text-tertiary" />
                <input
                  id="curiva-mobile-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search lessons and articles"
                  className="w-full bg-transparent px-2 py-3 text-base outline-none"
                  autoFocus
                />
              </div>
            </form>
            <div className="flex-1 overflow-y-auto p-4">
              <Link to="/profile" className="mb-4 flex items-center justify-between rounded-2xl bg-primary p-4 text-white">
                <span><span className="block text-xs font-semibold uppercase tracking-wide text-white/75">Learning workspace</span><span className="mt-1 block font-bold">Continue learning</span></span>
                <Sparkles className="h-5 w-5" />
              </Link>
              <div className="space-y-2">
                {navigation.map((group) => {
                  const Icon = group.icon;
                  const expanded = mobileGroup === group.label;
                  return (
                    <section key={group.label} className="overflow-hidden rounded-2xl border border-border">
                      <button
                        type="button"
                        onClick={() => setMobileGroup(expanded ? null : group.label)}
                        className="flex w-full items-center justify-between p-4 text-left"
                        aria-expanded={expanded}
                      >
                        <span className="flex items-center gap-3 font-bold text-text-primary"><Icon className="h-5 w-5 text-primary" />{group.label}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                      {expanded && (
                        <div className="border-t border-border bg-bg-secondary p-2">
                          <Link to={group.to} className="mb-1 block rounded-xl px-3 py-2 text-sm font-semibold text-primary">Open {group.label}</Link>
                          {group.items.map((item) => (
                            <Link key={item.label} to={item.to} className="block rounded-xl px-3 py-3 hover:bg-bg-primary">
                              <span className="block text-sm font-semibold text-text-primary">{item.label}</span>
                              <span className="mt-0.5 block text-xs text-text-secondary">{item.description}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border p-4">
              <ThemeToggle />
              <AuthButton isMobile onCloseMenu={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
