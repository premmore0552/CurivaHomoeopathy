import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
      <Link 
        to="/" 
        className="flex items-center gap-1 hover:text-primary transition-colors hover:bg-primary/5 px-2 py-1 rounded-lg"
      >
        <Home className="w-3 h-3" />
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = value.replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 opacity-30" />
            {last ? (
              <span className="text-primary italic px-2 py-1 bg-primary/5 rounded-lg border border-primary/10">
                {label}
              </span>
            ) : (
              <Link 
                to={to} 
                className="hover:text-primary transition-colors hover:bg-primary/5 px-2 py-1 rounded-lg"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
