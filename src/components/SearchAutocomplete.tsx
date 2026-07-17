import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Zap, BookOpen, Activity, Sparkles, GraduationCap, Compass, BookMarked, History } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { allBlogPosts } from '../data/blogPosts';
import { enhancedRemedies } from '../data/enhancedRemedies';
import { conditionsData } from '../data/conditionsData';

interface InstantResult {
  title: string;
  link: string;
  reason: string;
  type: string;
}

const localSemanticSearch = (q: string): InstantResult[] => {
  const queryLower = q.toLowerCase();
  const index: { keywords: string[]; title: string; link: string; reason: string; type: string }[] = [
    {
      keywords: ["miasm", "psora", "sycosis", "syphilis", "tubercular", "chronic disease", "cancer miasm"],
      title: "Miasms Encyclopedia Portal",
      link: "/miasms",
      reason: "Explore Samuel Hahnemann's chronic miasms (Psora, Sycosis, Syphilis) in deep clinical detail.",
      type: "guide"
    },
    {
      keywords: ["public", "education", "faq", "beginner", "introduction", "safe", "principles", "what is homeopathy"],
      title: "Public Education Center",
      link: "/public-education",
      reason: "Beginner-friendly introductory guides, core therapeutic principles, and safety FAQs.",
      type: "guide"
    },
    {
      keywords: ["organon", "aphorism", "philosophy", "vital force", "dynamis", "hahnemann", "mission", "primary action", "secondary action"],
      title: "Organon of Medicine",
      link: "/organon-philosophy",
      reason: "Full lookup of all 294 Aphorisms with prefaces, footnotes, and custom study aids.",
      type: "philosophy"
    },
    {
      keywords: ["remedy", "materia medica", "polychrest", "remedies", "symptoms", "allen", "boericke", "kent"],
      title: "Materia Medica Canvas",
      link: "/lexicon/all",
      reason: "Interactive workspace covering Allen's Keynotes and Boericke's medical descriptions.",
      type: "remedy"
    },
    {
      keywords: ["mcq", "quiz", "exam", "aiapget", "pyq", "practice", "questions", "blueprint", "test", "subject"],
      title: "MCQ & Subject Study Center",
      link: "/student-resources",
      reason: "Complete BHMS subject-wise blueprints, important questions, and mock practice boards.",
      type: "quiz"
    },
    {
      keywords: ["symptom", "checker", "symptomatology", "modalities", "rubric", "aggravation", "amelioration"],
      title: "Interactive Symptom Checker",
      link: "/symptom-checker",
      reason: "Input custom patient symptoms to cross-reference matching remedies and modalities dynamically.",
      type: "clinical"
    },
    {
      keywords: ["repertory", "kent repertory", "repertorization", "rubrics", "synthesis"],
      title: "Kent's Repertory Portal",
      link: "/repertory",
      reason: "Search clinical rubrics by chapter to calculate relative remedy values for case sheets.",
      type: "clinical"
    },
    {
      keywords: ["clinical", "therapeutics", "guides", "case taking", "disease guide"],
      title: "Clinical Therapeutics Guide",
      link: "/clinical-guides",
      reason: "High-yield therapeutic manuals mapped by diseases and organ systems for quick practice reference.",
      type: "clinical"
    },
    {
      keywords: ["stalwart", "pioneers", "founders", "history", "milestones", "hering", "lippe", "clarke"],
      title: "Historical Pioneers Gallery",
      link: "/stalwarts",
      reason: "Biographies and medical contributions of the prominent founding fathers of Homeopathy.",
      type: "historical"
    }
  ];

  return index
    .filter(item => item.keywords.some(k => queryLower.includes(k) || k.includes(queryLower)))
    .map(item => ({
      title: item.title,
      link: item.link,
      reason: item.reason,
      type: item.type
    }));
};

interface GroupedResult {
  category: string;
  items: {
    title: string;
    link: string;
    desc?: string;
    type: string;
  }[];
}

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [groupedResults, setGroupedResults] = useState<GroupedResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length < 2) {
      setGroupedResults([]);
      return;
    }

    const queryLower = query.toLowerCase();

    // 1. Guides & Philosophy (Local semantic match)
    const guides = localSemanticSearch(query).map(item => ({
      title: item.title,
      link: item.link,
      desc: item.reason,
      type: item.type
    }));

    // 2. Remedies (Materia Medica)
    const remedies = enhancedRemedies
      .filter(r => r.name.toLowerCase().includes(queryLower) || r.id.toLowerCase().includes(queryLower))
      .slice(0, 3)
      .map(r => ({
        title: r.name,
        link: `/remedy/${r.id}`,
        desc: r.latinName || r.origin || 'Materia Medica Keynotes',
        type: 'remedy'
      }));

    // 3. Diseases (Ailments)
    const diseases = conditionsData
      .filter(c => c.title.toLowerCase().includes(queryLower) || (c.category && c.category.toLowerCase().includes(queryLower)))
      .slice(0, 3)
      .map(c => ({
        title: c.title,
        link: `/conditions/${c.id}`,
        desc: c.category || 'Therapeutics Guide',
        type: 'ailment'
      }));

    // 4. Articles
    const articles = allBlogPosts
      .filter(p => p.title.toLowerCase().includes(queryLower))
      .slice(0, 3)
      .map(p => ({
        title: p.title,
        link: `/read/${p.slug}`,
        desc: 'Research Publication',
        type: 'article'
      }));

    const groups: GroupedResult[] = [];

    if (guides.length > 0) {
      groups.push({ category: 'Organon, Philosophy & Tools', items: guides });
    }
    if (remedies.length > 0) {
      groups.push({ category: 'Materia Medica Remedies', items: remedies });
    }
    if (diseases.length > 0) {
      groups.push({ category: 'Diseases & Clinical Ailments', items: diseases });
    }
    if (articles.length > 0) {
      groups.push({ category: 'Research Articles', items: articles });
    }

    setGroupedResults(groups);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/materia-medica?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'remedy': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'ailment': return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'article': return <BookOpen className="w-4 h-4 text-sky-500" />;
      case 'philosophy': return <BookMarked className="w-4 h-4 text-primary" />;
      case 'quiz': return <GraduationCap className="w-4 h-4 text-purple-500" />;
      case 'historical': return <History className="w-4 h-4 text-zinc-500" />;
      case 'clinical': return <Compass className="w-4 h-4 text-teal-500" />;
      default: return <Sparkles className="w-4 h-4 text-primary" />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'remedy': return 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20';
      case 'ailment': return 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20';
      case 'article': return 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20';
      case 'philosophy': return 'bg-primary/10 text-primary dark:bg-primary/20';
      case 'quiz': return 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20';
      case 'historical': return 'bg-zinc-500/10 text-zinc-600 dark:bg-zinc-500/20';
      case 'clinical': return 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/20';
      default: return 'bg-primary/10 text-primary dark:bg-primary/20';
    }
  };

  return (
    <div ref={containerRef} className="relative group w-full md:w-64 lg:w-80">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search portals, remedies, diseases..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="w-full pl-11 pr-12 py-2.5 bg-bg-secondary border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium dark:text-white"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary w-4 h-4" />
      </form>

      <AnimatePresence>
        {isOpen && groupedResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-3 bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden z-[100] max-h-[500px] overflow-y-auto"
          >
            <div className="p-2.5 space-y-4">
              {groupedResults.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <div className="px-3 text-[10px] font-black uppercase tracking-widest text-text-tertiary select-none">
                    {group.category}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item, idx) => (
                      <Link
                        key={`${item.type}-${idx}`}
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start gap-3 p-2.5 bg-bg-primary hover:bg-white dark:hover:bg-bg-tertiary rounded-xl transition-all border border-transparent hover:border-border hover:-translate-y-0.5 hover:shadow-sm group/item"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getTypeStyle(item.type)}`}>
                          {getIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-text-primary group-hover/item:text-primary transition-colors truncate">
                            {item.title}
                          </div>
                          {item.desc && (
                            <div className="text-[10px] text-text-secondary line-clamp-1 mt-0.5 font-normal">
                              {item.desc}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-text-tertiary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all mt-2 self-center" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
