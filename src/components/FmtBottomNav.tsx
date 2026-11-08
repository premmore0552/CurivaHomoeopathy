import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      const focusable = moreDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      focusable?.[0]?.focus();
    }, 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = moreDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
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
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [moreOpen]);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[60] flex h-16 items-center justify-around border-t border-border/60 bg-white/95 px-2 backdrop-blur-xl dark:bg-zinc-950/95 md:hidden" aria-label="FMT mobile navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/fmt'}
            className={({ isActive }) => `flex min-w-0 flex-col items-center gap-1 rounded-xl px-3 py-1 transition-all ${
              isActive ? 'scale-105 text-primary' : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))}
        <button ref={moreButtonRef} type="button" onClick={() => setMoreOpen(true)} className="flex flex-col items-center gap-1 rounded-xl px-3 py-1 text-text-tertiary transition-all hover:text-text-secondary" aria-label="Open more FMT options">
          <Menu className="h-5 w-5" />
          <span className="text-[10px] font-black uppercase tracking-tighter">More</span>
        </button>
      </nav>

      {moreOpen && (
        <div ref={moreDialogRef} className="fixed inset-0 z-[80] flex items-end bg-black/40 md:hidden" role="dialog" aria-modal="true" aria-label="More FMT options" onClick={() => setMoreOpen(false)}>
          <div className="w-full rounded-t-3xl bg-bg-primary p-5 pb-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">FMT workspace</p>
                <h2 className="mt-1 text-lg font-bold text-text-primary">More learning tools</h2>
              </div>
              <button type="button" onClick={() => setMoreOpen(false)} className="rounded-xl p-2 hover:bg-bg-secondary" aria-label="Close more options"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-2">
              {moreItems.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setMoreOpen(false)} className="flex items-center justify-between rounded-2xl border border-border p-4 hover:bg-bg-secondary">
                  <span><span className="block text-sm font-bold text-text-primary">{item.label}</span><span className="mt-0.5 block text-xs text-text-secondary">{item.description}</span></span>
                  <Library className="h-4 w-4 text-primary" />
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
