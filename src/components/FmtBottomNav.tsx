import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Home, Library, Menu, Search, X, Zap } from 'lucide-react';

const navItems = [
  { to: '/fmt', icon: Home, label: 'Home' },
  { to: '/fmt/learn', icon: BookOpen, label: 'Learn' },
  { to: '/fmt/search', icon: Search, label: 'Search' },
  { to: '/fmt/quick-revision', icon: Zap, label: 'Revision' }
];

const moreItems = [
  { to: '/fmt/viva', label: 'Viva questions', description: 'Practice oral examination answers' },
  { to: '/fmt/mcq', label: 'MCQ practice', description: 'Test recall by topic' },
  { to: '/student-resources', label: 'Study dashboard', description: 'Open your wider learning plan' },
  { to: '/library', label: 'Library', description: 'Return to saved resources' }
];

export default function FmtBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMoreOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [moreOpen]);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[60] flex h-16 items-center justify-around border-t border-border/60 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl dark:bg-zinc-950/95 md:hidden" aria-label="FMT mobile navigation">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/fmt'}
            aria-label={item.label}
            className={({ isActive }) => 'flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-3 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ' + (
              isActive ? 'scale-105 text-primary' : 'text-text-tertiary hover:text-text-secondary'
            )}
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))}
        <button type="button" onClick={() => setMoreOpen(true)} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-3 py-1 text-text-tertiary transition-colors hover:text-text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label="Open more FMT options" aria-expanded={moreOpen}>
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] font-black uppercase tracking-tighter">More</span>
        </button>
      </nav>

      {moreOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end bg-black/40 md:hidden"
          role="presentation"
          onMouseDown={event => { if (event.target === event.currentTarget) setMoreOpen(false); }}
        >
          <section
            ref={panelRef}
            className="w-full rounded-t-3xl border border-border bg-bg-primary p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fmt-more-title"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">FMT workspace</p>
                <h2 id="fmt-more-title" className="mt-1 text-lg font-bold text-text-primary">More learning tools</h2>
              </div>
              <button ref={closeRef} type="button" onClick={() => setMoreOpen(false)} className="flex min-h-11 min-w-11 items-center justify-center rounded-xl hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label="Close more options">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid gap-2">
              {moreItems.map(item => (
                <NavLink key={item.to} to={item.to} onClick={() => setMoreOpen(false)} className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-border p-4 transition-colors hover:bg-bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  <span><span className="block text-sm font-bold text-text-primary">{item.label}</span><span className="mt-0.5 block text-xs text-text-secondary">{item.description}</span></span>
                  <Library className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                </NavLink>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
