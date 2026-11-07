import React, { useEffect, useRef, useState } from 'react';
import {
  Activity, BookOpen, Brain, ChevronDown, ChevronRight, GraduationCap, Home,
  Library, Menu, Search, ShieldCheck, Sparkles, Stethoscope, X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AuthButton from './AuthButton';
import Logo from './Logo';
import SearchAutocomplete from './SearchAutocomplete';
import ThemeToggle from './ThemeToggle';
import ProfileSwitch from './ProfileSwitch';
import { useRole } from '../context/RoleContext';
import { navigationGroups, type NavigationGroup } from '../navigation/navigationConfig';

const groupIcons: Record<NavigationGroup['label'], LucideIcon> = {
  Learn: GraduationCap,
  Practice: Brain,
  Library,
  Guidance: Stethoscope
};

const isActiveRoute = (pathname: string, target: string) =>
  pathname === target || (target !== '/' && pathname.startsWith(target + '/'));

const openGlobalSearch = () => window.dispatchEvent(new Event('open-command-palette'));

export default function Header() {
  const location = useLocation();
  const { currentRole, setCurrentRole, authorizedRoles } = useRole();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState('Learn');
  const [scrolled, setScrolled] = useState(false);
  const desktopNavRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    const activeGroup = navigationGroups.find(group =>
      isActiveRoute(location.pathname, group.to) ||
      group.items.some(item => isActiveRoute(location.pathname, item.to))
    );
    setMobileGroup(activeGroup?.label ?? 'Learn');
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null);
        menuTriggerRefs.current[openMenu]?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(element => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [mobileOpen]);

  const closeMobileNavigation = () => setMobileOpen(false);
  const isFmtExperience = location.pathname.startsWith('/fmt');

  return (
    <>
      <header className={'sticky top-0 z-[70] border-b transition-[background-color,box-shadow,border-color] duration-200 ' + (scrolled
        ? 'border-border bg-bg-primary/95 shadow-sm backdrop-blur-xl'
        : 'border-transparent bg-bg-primary')}>
        <div className="mx-auto flex min-h-[68px] max-w-7xl items-center gap-3 px-3 sm:px-5 lg:px-8">
          <Link to="/" className="shrink-0" aria-label="Curiva home">
            <Logo size="sm" />
          </Link>

          <nav ref={desktopNavRef} className="ml-2 hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navigationGroups.map(group => {
              const Icon = groupIcons[group.label];
              const expanded = openMenu === group.label;
              const active = isActiveRoute(location.pathname, group.to) ||
                group.items.some(item => isActiveRoute(location.pathname, item.to));
              const panelId = 'curiva-nav-' + group.label.toLowerCase();
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(group.label)}
                  onMouseLeave={event => {
                    if (!event.currentTarget.contains(document.activeElement)) {
                      setOpenMenu(current => current === group.label ? null : current);
                    }
                  }}
                  onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenMenu(current => current === group.label ? null : current);
                    }
                  }}
                >
                  <button
                    ref={node => { menuTriggerRefs.current[group.label] = node; }}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={expanded ? panelId : undefined}
                    onClick={() => setOpenMenu(expanded ? null : group.label)}
                    onFocus={() => setOpenMenu(group.label)}
                    className={'inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' + (active || expanded
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary')}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {group.label}
                    <ChevronDown className={'h-3.5 w-3.5 transition-transform ' + (expanded ? 'rotate-180' : '')} aria-hidden="true" />
                  </button>

                  {expanded && (
                    <section
                      id={panelId}
                      aria-label={group.label + ' navigation'}
                      className="absolute left-0 top-full z-[80] mt-2 max-h-[min(75vh,42rem)] w-[min(42rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-border bg-bg-primary p-5 shadow-2xl"
                    >
                      <div className="mb-4 flex items-start gap-3 border-b border-border pb-4">
                        <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-text-primary">{group.label}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">{group.description}</p>
                        </div>
                        <Link to={group.to} onClick={() => setOpenMenu(null)} className="ml-auto inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg px-3 text-xs font-bold text-primary hover:bg-primary/10">
                          View all <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {group.items.map(item => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setOpenMenu(null)}
                            aria-current={isActiveRoute(location.pathname, item.to) ? 'page' : undefined}
                            className="group min-h-[76px] rounded-xl p-3 transition-colors hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                          >
                            <span className="flex items-center justify-between gap-2 text-sm font-semibold text-text-primary">
                              {item.label}
                              <ChevronRight className="h-4 w-4 shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-text-secondary">{item.description}</span>
                          </Link>
                        ))}
                      </div>
                      <Link to="/profile" onClick={() => setOpenMenu(null)} className="mt-4 flex min-h-11 items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
                        Continue learning <Sparkles className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </section>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto relative w-0 min-w-0 overflow-visible md:w-[min(30vw,15rem)] xl:max-w-xs">
            <SearchAutocomplete triggerClassName="hidden md:block !w-full" />
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <Link
              to="/find-your-remedy"
              className="hidden min-h-10 items-center gap-2 rounded-full bg-primary px-3 text-xs font-bold text-white transition-opacity hover:opacity-90 2xl:inline-flex"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Find a remedy
            </Link>
            <ProfileSwitch />
            <ThemeToggle />
            <AuthButton />
          </div>

          <div className="ml-auto flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? "curiva-mobile-navigation" : undefined}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-text-primary hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {!isFmtExperience && !location.pathname.startsWith('/admin/') && (
        <nav aria-label="Mobile quick navigation" className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-5 border-t border-border bg-bg-primary/95 px-1 pt-1 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl pb-[env(safe-area-inset-bottom)] xl:hidden">
          <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined} className={"flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold " + (location.pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-primary')}>
            <Home className="h-5 w-5" aria-hidden="true" /><span>Home</span>
          </Link>
          <Link to="/subjects" aria-current={isActiveRoute(location.pathname, '/subjects') ? 'page' : undefined} className={"flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold " + (isActiveRoute(location.pathname, '/subjects') ? 'text-primary' : 'text-text-secondary hover:text-primary')}>
            <GraduationCap className="h-5 w-5" aria-hidden="true" /><span>Learn</span>
          </Link>
          <Link to="/quizzes" aria-current={isActiveRoute(location.pathname, '/quizzes') ? 'page' : undefined} className={"flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold " + (isActiveRoute(location.pathname, '/quizzes') ? 'text-primary' : 'text-text-secondary hover:text-primary')}>
            <Brain className="h-5 w-5" aria-hidden="true" /><span>Practice</span>
          </Link>
          <button type="button" onClick={openGlobalSearch} className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold text-text-secondary hover:text-primary">
            <Search className="h-5 w-5" aria-hidden="true" /><span>Search</span>
          </button>
          <button type="button" onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} className={"flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold " + (mobileOpen ? 'text-primary' : 'text-text-secondary hover:text-primary')}>
            <Menu className="h-5 w-5" aria-hidden="true" /><span>More</span>
          </button>
        </nav>
      )}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-sm xl:hidden"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeMobileNavigation();
          }}
        >
          <div
            id="curiva-mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Curiva navigation"
            className="ml-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden border-l border-border bg-bg-primary shadow-2xl"
          >
            <div className="flex min-h-16 items-center justify-between border-b border-border px-4 py-3">
              <Link to="/" onClick={closeMobileNavigation} aria-label="Curiva home"><Logo size="sm" /></Link>
              <button ref={closeButtonRef} type="button" onClick={closeMobileNavigation} aria-label="Close navigation menu" className="flex min-h-11 min-w-11 items-center justify-center rounded-xl hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="border-b border-border p-4">
              <button type="button" onClick={() => { closeMobileNavigation(); openGlobalSearch(); }} className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-border bg-bg-secondary px-4 text-left text-sm text-text-secondary">
                <Search className="h-4 w-4" aria-hidden="true" />
                Search lessons, subjects and references
                <span className="ml-auto text-xs text-text-tertiary">Search</span>
              </button>
              <Link to="/profile" onClick={closeMobileNavigation} className="mt-3 flex min-h-14 items-center justify-between rounded-xl bg-primary px-4 py-3 text-white">
                <span><span className="block text-[10px] font-semibold uppercase tracking-wider text-white/75">Learning workspace</span><span className="mt-0.5 block text-sm font-bold">Continue learning</span></span>
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto overscroll-contain p-4">
              {navigationGroups.map(group => {
                const Icon = groupIcons[group.label];
                const expanded = mobileGroup === group.label;
                const active = isActiveRoute(location.pathname, group.to) || group.items.some(item => isActiveRoute(location.pathname, item.to));
                const panelId = 'curiva-mobile-' + group.label.toLowerCase();
                return (
                  <section key={group.label} className={'overflow-hidden rounded-2xl border ' + (active ? 'border-primary/30' : 'border-border')}>
                    <button type="button" onClick={() => setMobileGroup(expanded ? '' : group.label)} aria-expanded={expanded} aria-controls={expanded ? panelId : undefined} className="flex min-h-14 w-full items-center justify-between px-4 py-3 text-left">
                      <span className="flex items-center gap-3 font-bold text-text-primary">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        {group.label}
                        {active && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">Current</span>}
                      </span>
                      <ChevronDown className={'h-5 w-5 text-text-tertiary transition-transform ' + (expanded ? 'rotate-180' : '')} aria-hidden="true" />
                    </button>
                    {expanded && (
                      <div id={panelId} className="border-t border-border bg-bg-secondary p-2">
                        <Link to={group.to} onClick={closeMobileNavigation} className="mb-1 block min-h-11 rounded-lg px-3 py-3 text-sm font-bold text-primary">Open {group.label}</Link>
                        {group.items.map(item => (
                          <Link key={item.to} to={item.to} onClick={closeMobileNavigation} aria-current={isActiveRoute(location.pathname, item.to) ? 'page' : undefined} className="block min-h-12 rounded-lg px-3 py-3 hover:bg-bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                            <span className="block text-sm font-semibold text-text-primary">{item.label}</span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
              <Link to="/faq" onClick={closeMobileNavigation} className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-text-secondary hover:bg-bg-secondary">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Help and safety information
              </Link>
              <Link to="/clinical-guides" onClick={closeMobileNavigation} className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-text-secondary hover:bg-bg-secondary">
                <Activity className="h-4 w-4" aria-hidden="true" /> Clinical learning guides
              </Link>

              <section className="mt-3 rounded-2xl border border-border p-3" aria-label="Active workspace profile">
                <h3 className="px-1 text-xs font-bold text-text-secondary">Active workspace profile</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {authorizedRoles.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setCurrentRole(role)}
                      aria-pressed={currentRole === role}
                      className={'min-h-10 rounded-xl border px-2 py-2 text-[11px] font-bold transition-colors ' + (currentRole === role
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-bg-secondary text-text-secondary hover:border-primary/40')}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </section>

            </div>

            <div className="border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between gap-3">
                <ThemeToggle />
              </div>
              <div className="mt-3">
                <AuthButton isMobile onCloseMenu={closeMobileNavigation} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
