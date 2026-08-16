import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface NavItem {
  to?: string;
  title: string;
  label?: string;
  onClick?: () => void;
}

interface ContentNavigatorProps {
  prev?: NavItem | null;
  next?: NavItem | null;
  className?: string;
}

export const ContentNavigator: React.FC<ContentNavigatorProps> = ({ prev, next, className = "" }) => {
  if (!prev && !next) return null;

  const NavContent = ({ item, isPrev }: { item: NavItem, isPrev: boolean }) => (
    <>
      <div className={`flex items-center gap-2 text-text-tertiary text-[10px] font-black uppercase tracking-widest group-hover:text-primary transition-colors ${!isPrev ? 'justify-end' : ''}`}>
        {isPrev && <ChevronLeft className="w-4 h-4" />} 
        {item.label || (isPrev ? 'Previous' : 'Next')}
        {!isPrev && <ChevronRight className="w-4 h-4" />}
      </div>
      <div className={`text-xl font-display font-bold text-text-primary transition-transform ${isPrev ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
        {item.title}
      </div>
      <div className={`absolute top-0 ${isPrev ? 'left-0' : 'right-0'} w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity`} />
    </>
  );

  const cardBaseClass = "group p-8 rounded-[2.5rem] bg-bg-secondary border border-border hover:border-primary/30 transition-all flex flex-col gap-2 relative overflow-hidden";

  return (
    <div className={`mt-24 pt-16 border-t border-border ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {prev ? (
          prev.to ? (
            <Link to={prev.to} className={`${cardBaseClass} text-left`}>
              <NavContent item={prev} isPrev={true} />
            </Link>
          ) : (
            <button onClick={prev.onClick} className={`${cardBaseClass} text-left cursor-pointer`}>
              <NavContent item={prev} isPrev={true} />
            </button>
          )
        ) : <div className="hidden sm:block" />}

        {next ? (
          next.to ? (
            <Link to={next.to} className={`${cardBaseClass} text-right items-end`}>
              <NavContent item={next} isPrev={false} />
            </Link>
          ) : (
            <button onClick={next.onClick} className={`${cardBaseClass} text-right items-end cursor-pointer`}>
              <NavContent item={next} isPrev={false} />
            </button>
          )
        ) : <div className="hidden sm:block" />}
      </div>
    </div>
  );
};
