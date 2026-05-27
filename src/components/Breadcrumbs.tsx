import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // List of top-level tool dashboards & portal pages with custom hero sections where breadcrumbs are redundant/misaligned
  const hiddenRoutes = [
    '/',
    '/repertory',
    '/relationships',
    '/visualization',
    '/analysis',
    '/ask-homeopath',
    '/mcq-practice',
    '/stalwarts',
    '/research',
    '/glossary',
    '/glossary/all',
    '/glossary/philosophy',
    '/glossary/clinical',
    '/glossary/historical'
  ];

  // Don't show breadcrumbs on the homepage or major landing portals
  if (
    pathnames.length === 0 || 
    hiddenRoutes.includes(location.pathname) || 
    location.pathname.startsWith('/stalwarts/')
  ) {
    return null;
  }

  // Map of path segments to friendly readable displays
  const getBreadcrumbName = (segment: string) => {
    const map: Record<string, string> = {
      'materia-medica': 'Materia Medica',
      'remedy-comparator': 'Remedy Comparison',
      'organon-philosophy': 'Organon Philosophy',
      'principles': 'Core Principles',
      'about-us': 'About Curiva',
      'feedback': 'Get in Touch',
      'faq': 'Help Center',
      'privacy-policy': 'Privacy Policy',
      'medical-disclaimer': 'Medical Disclaimer',
      'terms-of-service': 'Terms of Service',
      'topics': 'Research Database',
      'student-resources': 'Student Resources',
      'glossary': 'Glossary',
      'philosophy': 'Philosophy',
      'clinical': 'Clinical',
      'historical': 'Historical',
      'all': 'All Remedies',
      'remedy': 'Remedy',
      'conditions': 'Ailment',
      'explore-symptoms': 'Ailments',
      'repertory': 'Repertory Tool',
      'relationships': 'Relationship Map',
      'visualization': 'Visualizer',
      'library': 'Library',
      'profile': 'Profile',
      'subscription': 'Subscription',
      'ask-homeopath': 'Ask Expert',
      'mcq-practice': 'MCQ Practice'
    };
    return map[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary select-none">
      <Link 
        to="/" 
        className="flex items-center gap-1.5 hover:text-primary transition-colors hover:bg-primary/5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-primary/10"
      >
        <Home className="w-3.5 h-3.5" />
        Home
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = getBreadcrumbName(value);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 opacity-40 shrink-0 text-text-secondary" />
            {last ? (
              <span className="text-primary font-black px-2.5 py-1.5 bg-primary/5 rounded-lg border border-primary/10 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {label}
              </span>
            ) : (
              <Link 
                to={to} 
                className="hover:text-primary transition-colors hover:bg-primary/5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-primary/10 truncate max-w-[124px] sm:max-w-xs"
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
