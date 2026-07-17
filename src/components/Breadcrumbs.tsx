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
    '/nexus',
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
    '/glossary/historical',
    '/lexicon',
    '/lexicon/all',
    '/lexicon/philosophy',
    '/lexicon/clinical',
    '/lexicon/historical'
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
      'glossary': 'Homeopathic Encyclopedia',
      'lexicon': 'Homeopathic Encyclopedia',
      'philosophy': 'Philosophy',
      'clinical': 'Clinical',
      'historical': 'Historical',
      'all': 'All Remedies',
      'remedy': 'Remedy',
      'conditions': 'Ailment',
      'explore-symptoms': 'Ailments',
      'repertory': 'Repertory Tool',
      'relationships': 'Remedy Nexus',
      'nexus': 'Remedy Nexus',
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
    <nav className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1 flex items-center flex-wrap gap-1 text-xs font-medium text-text-secondary select-none" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-bg-secondary"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="font-sans">Home</span>
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        let to = `/${pathnames.slice(0, index + 1).join('/')}`;
        if (to === '/remedy') {
          to = '/materia-medica';
        } else if (to === '/conditions') {
          to = '/explore-symptoms';
        }
        const label = getBreadcrumbName(value);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-text-tertiary opacity-60 shrink-0 mx-0.5" />
            <Link 
              to={to} 
              className={`py-1 px-2 rounded-md transition-colors truncate max-w-[150px] sm:max-w-xs ${
                last 
                  ? 'text-primary font-semibold bg-primary-light/40 border border-primary/10 hover:bg-primary-light/60' 
                  : 'text-text-secondary hover:text-primary hover:bg-bg-secondary'
              }`}
            >
              {label}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
