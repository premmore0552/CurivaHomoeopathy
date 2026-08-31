import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Search, Zap, Menu } from 'lucide-react';

export default function FmtBottomNav() {
  const navItems = [
    { to: '/fmt', icon: Home, label: 'Home' },
    { to: '/fmt/learn', icon: BookOpen, label: 'Learn' },
    { to: '/fmt/search', icon: Search, label: 'Search' },
    { to: '/fmt/quick-revision', icon: Zap, label: 'Revision' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-border/60 z-[60] flex items-center justify-around px-2 md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/fmt'}
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
              isActive 
                ? 'text-primary scale-110' 
                : 'text-text-tertiary hover:text-text-secondary'
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
        </NavLink>
      ))}
      <button className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-text-tertiary hover:text-text-secondary transition-all">
        <Menu className="w-5 h-5" />
        <span className="text-[10px] font-black uppercase tracking-tighter">Menu</span>
      </button>
    </nav>
  );
}
