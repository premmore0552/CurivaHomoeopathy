import React, { useEffect, useState } from 'react';

const tocItems = [
  { id: 'glance', label: '1. Disease at a Glance' },
  { id: 'definition', label: '2. Definition' },
  { id: 'epidemiology', label: '3. Epidemiology' },
  { id: 'etiology', label: '4. Etiology' },
  { id: 'risk-factors', label: '5. Risk Factors' },
  { id: 'pathophysiology', label: '6. Pathophysiology' },
  { id: 'classification', label: '7. Classification' },
  { id: 'clinical-features', label: '8. Clinical Features' },
  { id: 'red-flags', label: '9. Red Flags' },
  { id: 'investigations', label: '10. Investigations' },
  { id: 'diagnosis', label: '11. Diagnosis' },
  { id: 'differential-diagnosis', label: '12. Differential Diagnosis' },
  { id: 'complications', label: '13. Complications' },
  { id: 'management', label: '14. Conventional Management' },
  { id: 'homoeopathy', label: '15. Homoeopathic Approach' },
  { id: 'remedies', label: '16. Relevant Remedies' },
  { id: 'differentials', label: '17. Remedy Differentials' },
  { id: 'case', label: '18. Clinical Case' },
  { id: 'exam', label: '19. BHMS Exam Corner' },
  { id: 'revision', label: '20. One-Minute Revision' },
  { id: 'related', label: '21. Related Topics' },
];

export const DiseaseTOC: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0% -80% 0%' }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-24 w-full bg-zinc-50 dark:bg-zinc-900/50 border border-border rounded-2xl p-6 hidden lg:block">
      <h3 className="text-xs font-black uppercase tracking-widest text-text-primary mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        Table of Contents
      </h3>
      <ul className="space-y-3">
        {tocItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-[10px] font-black uppercase tracking-widest text-left transition-all duration-300 hover:text-primary ${
                activeId === item.id ? 'text-primary translate-x-1' : 'text-text-secondary'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
