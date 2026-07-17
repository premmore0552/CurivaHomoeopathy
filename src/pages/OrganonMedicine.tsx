import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  History, 
  Search, 
  Stethoscope, 
  Database, 
  Activity, 
  User, 
  Globe,
  X,
  ChevronRight, 
  ArrowRight,
  Info,
  Layers,
  Thermometer,
  CloudLightning,
  Sparkles,
  Award,
  CheckCircle as LucideCheckCircle,
  Quote,
  Network,
  Filter
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
// Removed old aphorisms import to use full organonData structure
import { organonData, OrganonAphorism } from '../data/organon_data';
import { prefacesData, westernPhilosophyData } from '../data/prefacesData';
import { getProfessorLecture } from '../data/professor_lectures';

const getAphorismStudyAid = (id: number) => {
  const aids: Record<number, { simplified: string; clinical: string; exam: string }> = {
    1: {
      simplified: "The physician's sole duty is to heal sick people, not to waste time on speculative theories about disease inner mechanisms.",
      clinical: "Focus on observable symptom patterns and clinical outcomes rather than speculative diagnostic labels.",
      exam: "Essential five-mark question. Contrast 'Mission' (acting to cure) with theoretical 'speculative systems'."
    },
    2: {
      simplified: "A perfect cure must be rapid, gentle, permanent, and carried out through clear, logical principles.",
      clinical: "A guide for safe, non-violent therapeutics. If a treatment causes severe secondary aggravations, it fails the 'gentle' requirement.",
      exam: "Memorize the exact definition of the highest ideal of cure. Crucial for first-year BHMS exams."
    },
    3: {
      simplified: "A true practitioner must possess clear knowledge of: disease indications, curative drug powers, exact dosage, and obstacles to recovery.",
      clinical: "This aphorism outlines the complete clinical process from history-taking to remedy selection and long-term management.",
      exam: "Most common 10-mark essay question. Draw a flowchart connecting knowledge of disease, knowledge of medicine, and application of the two."
    },
    4: {
      simplified: "The physician is also a preserver of health by understanding what causes disease and how to keep healthy people well.",
      clinical: "Emphasizes hygiene, nutrition, stress management, and preventive constitutional care.",
      exam: "Short-note question. Relates closely to Hahnemann's views on sanitation and epidemics."
    },
    5: {
      simplified: "Identify exciting causes for acute complaints, and fundamental causes (which are usually chronic miasms) for chronic disease.",
      clinical: "Mandates deep constitutional history-taking to map chronic hereditary/miasmatic tendencies.",
      exam: "Discuss exciting vs. fundamental cause. Crucial for introducing the chronic miasms theory."
    },
    6: {
      simplified: "The physician must be an unprejudiced observer, recording only changes in mind and body perceived through the senses.",
      clinical: "Do not let preconceived diagnosis labels blind you to the peculiar symptom portrait of the patient.",
      exam: "What makes an observer 'unprejudiced'? Explain the role of the senses and the danger of speculative pathology."
    }
  };

  return aids[id] || {
    simplified: `Aphorism §${id} clarifies the detailed administrative and scientific rules of homeopathic practice, expanding on Hahnemann's classical system.`,
    clinical: "Apply this aphorism to ensure precise case-taking, dosage repeating, or dynamic drug testing.",
    exam: `Focus on the connection between this paragraph and Hahnemann's overarching laws of simillimum.`
  };
};

const ProfessorMasterclassPanel = ({ 
  id, 
  onNavigateToAphorism 
}: { 
  id: number; 
  onNavigateToAphorism: (relId: number) => void; 
}) => {
  const lecture = getProfessorLecture(id);
  const aph = organonData.find(a => a.id === id);
  const originalText = aph?.versions[0]?.content || "Original text available in standard edition.";

  return (
    <div className="space-y-10">
      {/* SEO Preview Panel */}
      <div className="p-6 bg-primary/[0.02] border border-primary/10 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <Globe className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">SEO Metadata & Google Search Preview</span>
        </div>
        <div className="bg-white dark:bg-[#121214] p-5 rounded-2xl border border-border shadow-inner max-w-2xl">
          <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-lg font-medium hover:underline cursor-pointer font-sans leading-snug">
            {lecture.seoTitle}
          </div>
          <div className="text-[#006621] dark:text-[#34a853] text-xs font-sans mt-0.5 flex items-center gap-1">
            <span>https://curiva.edu/organon/aphorism-{id}</span>
            <span className="text-[8px] border border-emerald-500/30 px-1 rounded uppercase font-black text-emerald-600 scale-90">SEO Friendly</span>
          </div>
          <p className="text-[#4d5156] dark:text-[#bdc1c6] text-xs font-sans mt-1.5 leading-relaxed">
            {lecture.metaDesc}
          </p>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex items-start justify-between border-b border-border pb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">BHMS Curriculum Masterclass</span>
          <h3 className="text-3xl font-display font-black text-primary mt-1 flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-serif italic text-lg shadow-md shrink-0">§{id}</span>
            Professor's Lecture Series
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end max-w-xs md:max-w-md">
          {lecture.importantConcepts.map((concept) => (
            <span 
              key={concept} 
              className="px-3 py-1 bg-primary/10 text-primary border border-primary/15 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Original Aphorism */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary italic flex items-center gap-2">
          <Quote className="w-3.5 h-3.5 text-primary" /> Verbatim Original Text (6th Edition)
        </h4>
        <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 italic font-serif text-lg md:text-xl leading-relaxed text-text-secondary text-justify relative">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/5 pointer-events-none" />
          "{originalText}"
          {aph?.versions[0]?.footnotes && aph.versions[0].footnotes.length > 0 && (
            <div className="mt-6 pt-6 border-t border-primary/10 space-y-3">
              {aph.versions[0].footnotes.map((fn) => (
                <div key={fn.id} className="text-xs text-text-secondary/70 bg-bg-secondary/50 p-4 rounded-xl border border-border/50">
                  <strong className="text-primary mr-1">Footnote {fn.id}:</strong> {fn.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout for Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simple Explanation */}
        <div className="p-8 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-[2.5rem] space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-2">
            <Book className="w-4 h-4" /> Simplified Explanation
          </h4>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-serif italic">
            {lecture.simpleExplanation}
          </p>
        </div>

        {/* Concept Explained Box */}
        {lecture.conceptExplained && (
          <div className="p-8 bg-[#10B981]/5 border border-[#10B981]/15 rounded-[2.5rem] space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#10B981] animate-pulse" />
              <h4 className="text-xs font-black text-[#10B981] uppercase tracking-wider">
                Concept Explained: {lecture.conceptExplained.concept}
              </h4>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-primary uppercase tracking-tight text-[9px] font-black block">Core Meaning:</strong>
                {lecture.conceptExplained.simplified}
              </p>
              <p className="text-xs text-text-secondary leading-relaxed italic">
                <strong className="text-emerald-600 uppercase tracking-tight text-[9px] font-black block not-italic">Everyday Analogy:</strong>
                {lecture.conceptExplained.analogy}
              </p>
              <div className="p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 block mb-1">Visual Learning Tip:</span>
                <p className="text-[11px] text-text-secondary font-medium leading-relaxed">
                  {lecture.conceptExplained.visualSuggestion}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Understanding */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary italic flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-primary" /> Professor's Detailed Commentary
        </h4>
        <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed text-justify font-sans bg-bg-secondary p-8 rounded-[2.5rem] border border-border">
          <p>{lecture.detailedUnderstanding}</p>
        </div>
      </div>

      {/* Practical and Clinical */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-blue-50/30 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/20 rounded-[2.5rem] space-y-3">
          <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 block">Clinical Importance</span>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
            {lecture.clinicalRelevance}
          </p>
        </div>
        <div className="p-8 bg-purple-50/30 dark:bg-purple-950/10 border border-purple-200/50 dark:border-purple-900/20 rounded-[2.5rem] space-y-3">
          <span className="text-[9px] font-black uppercase tracking-wider text-purple-600 block">Practical Example</span>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed italic font-serif">
            {lecture.practicalExample}
          </p>
        </div>
      </div>

      {/* Key Takeaways & Exam Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Takeaways */}
        <div className="p-8 bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-200/40 dark:border-emerald-900/20 rounded-[2.5rem] space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
            <LucideCheckCircle className="w-4 h-4 text-emerald-500" /> Key Takeaways
          </h4>
          <ul className="space-y-3">
            {lecture.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3 text-xs md:text-sm text-text-secondary leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Examination Notes */}
        <div className="p-8 bg-red-50/30 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/20 rounded-[2.5rem] space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-red-800 dark:text-red-400 flex items-center gap-2">
            <Award className="w-4 h-4 text-red-500" /> BHMS Examination Focus
          </h4>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-semibold bg-white dark:bg-[#15151a] p-5 rounded-2xl border border-red-500/15 border-l-4 border-l-red-500 shadow-sm">
            {lecture.examNotes}
          </p>
        </div>
      </div>

      {/* Related Aphorisms mapping */}
      {lecture.relatedIds.length > 0 && (
        <div className="pt-8 border-t border-border">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 italic">Relational Node Navigation</h5>
          <div className="flex flex-wrap gap-3">
            {lecture.relatedIds.map(relId => (
              <button
                key={relId}
                onClick={() => onNavigateToAphorism(relId)}
                className="px-6 py-3.5 bg-bg-secondary border border-border hover:border-primary rounded-2xl flex items-center gap-3 transition-all group cursor-pointer shadow-sm hover:shadow-md"
              >
                <Network className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-black text-text-primary">Study Related Aphorism §{relId}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AphorismItem = ({ 
  aphorism, 
  isOpen, 
  onToggle 
}: { 
  aphorism: OrganonAphorism; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => {
  const [activeVersion, setActiveVersion] = useState(0);
  const aid = getAphorismStudyAid(aphorism.id);

  return (
    <div className={`border rounded-3xl overflow-hidden mb-4 bg-bg-secondary group transition-all ${isOpen ? 'border-primary shadow-xl ring-4 ring-primary/5' : 'border-border hover:border-primary/30'}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm italic transition-all ${isOpen ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-bg-primary text-primary'}`}>
            §{aphorism.id}
          </div>
          <div>
            <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">
              {aphorism.versions[activeVersion]?.content.substring(0, 80)}...
            </h4>
            <div className="flex gap-2 mt-1">
              {aphorism.versions.map((v, i) => (
                <span key={i} className="text-[8px] font-black uppercase tracking-widest opacity-40">{v.edition}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={`p-2 rounded-xl bg-bg-primary transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronRight className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-8 pt-0 border-t border-border/50 bg-bg-primary/30">
              {aphorism.versions.length > 1 && (
                <div className="flex gap-2 mb-6 p-1 bg-bg-secondary w-fit rounded-xl border border-border">
                  {aphorism.versions.map((v, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveVersion(i); }}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeVersion === i ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-primary'}`}
                    >
                      {v.edition}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-6">
                <p className="text-lg text-text-secondary leading-relaxed font-serif italic">
                  {aphorism.versions[activeVersion]?.content}
                </p>

                {/* Highly Polished Academic Study Aid Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <span className="text-[9px] font-black uppercase tracking-wider text-primary block mb-1">Simplified Explanation</span>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {aid.simplified}
                    </p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10">
                    <span className="text-[9px] font-black uppercase tracking-wider text-accent block mb-1">Clinical Importance</span>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {aid.clinical}
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 block mb-1">Examination Notes</span>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {aid.exam}
                    </p>
                  </div>
                </div>

                {aphorism.versions[activeVersion]?.footnotes.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-border">
                    {aphorism.versions[activeVersion].footnotes.map((fn, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-bg-secondary/50 rounded-2xl border border-border/30">
                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">
                          {fn.id}
                        </span>
                        <p className="text-xs text-text-secondary leading-relaxed opacity-80 italic">
                          {fn.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AphorismTree = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<OrganonAphorism['category'] | 'All'>('All');
  const [viewMode, setViewViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredData = organonData.filter(a => {
    const matchesSearch = a.versions.some(v => v.content.toLowerCase().includes(searchTerm.toLowerCase())) || 
                         a.id.toString() === searchTerm;
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: (OrganonAphorism['category'] | 'All')[] = ['All', 'Philosophy', 'Clinical', 'Pharmacy', 'Historical'];

  const filteredAphorismIds = Array.from({ length: 294 }, (_, i) => i + 1).filter(id => {
    const data = organonData.find(a => a.id === id);
    const isFiltered = data && (activeCategory === 'All' || data.category === activeCategory);
    return activeCategory === 'All' || isFiltered;
  });

  const CHUNK_SIZE = 50;
  const totalSlides = Math.max(1, Math.ceil(filteredAphorismIds.length / CHUNK_SIZE));
  const currentSlide = Math.min(activeSlide, totalSlides - 1);
  const visibleIds = filteredAphorismIds.slice(currentSlide * CHUNK_SIZE, (currentSlide + 1) * CHUNK_SIZE);

  const scrollToAphorism = (id: number) => {
    setSelectedId(id);
    if (viewMode === 'list') {
      const element = document.getElementById(`aphorism-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      const itemIdx = filteredAphorismIds.indexOf(id);
      if (itemIdx !== -1) {
        const targetSl = Math.floor(itemIdx / CHUNK_SIZE);
        setActiveSlide(targetSl);
      }
      setTimeout(() => {
        const element = document.getElementById('active-aphorism-content');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 relative">
      {/* Sidebar Navigation */}
      <aside className="lg:w-80 space-y-8 lg:sticky lg:top-40 h-fit transition-all duration-500">
        <div className="bg-bg-secondary p-8 rounded-[3.5rem] border border-border shadow-soft space-y-10">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 italic flex items-center gap-2">
              <Search className="w-3 h-3" /> Search Logic
            </h4>
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="Find principle or §..."
                 className="w-full px-6 py-4 bg-bg-primary border border-border rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-[9px] placeholder:uppercase placeholder:font-black text-sm font-bold"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 italic flex items-center gap-2">
              <Filter className="w-3 h-3 text-emerald-500" /> Categories
            </h4>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group ${
                    activeCategory === cat 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
                    : 'bg-bg-primary text-text-secondary hover:bg-white hover:text-primary border border-border/50 hover:border-primary/30'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                    {cat}
                  </span>
                  {activeCategory === cat && <LucideCheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 italic flex items-center gap-2">
              <Layers className="w-3 h-3 text-blue-500" /> Layout
            </h4>
            <div className="flex p-1.5 bg-bg-primary rounded-2xl border border-border shadow-inner">
               <button 
                 onClick={() => setViewViewMode('grid')}
                 className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-text-tertiary hover:text-primary'}`}
               >
                 Compact
               </button>
               <button 
                 onClick={() => setViewViewMode('list')}
                 className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'text-text-tertiary hover:text-primary'}`}
               >
                 Detailed
               </button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-primary/5 rounded-[3rem] border border-primary/10 relative overflow-hidden group">
           <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
              <Award className="w-24 h-24" />
           </div>
           <p className="text-[11px] font-medium text-text-secondary italic leading-relaxed relative z-10">
             Explore the systematic architecture of Hahnemann's logic. Each aphorism is a node in the network of clinical truth.
           </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h3 className="text-4xl font-display font-black text-text-primary uppercase tracking-tighter italic leading-none">
              Aphorism <br /> <span className="text-primary not-italic tracking-widest text-lg md:text-xl">Interactive Browser.</span>
            </h3>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#15803d] dark:text-[#a7f3d0] bg-[#dcfce7] dark:bg-[#064e3b]/50 px-3 py-1 rounded-full border border-[#bbf7d0] dark:border-[#064e3b]">
                <Database className="w-3.5 h-3.5 text-primary" />
                {filteredData.length} Aphorisms Found
              </div>
              <div className="w-1 h-1 bg-border rounded-full" />
              <div className="text-[10px] font-black uppercase tracking-widest text-primary italic bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                {activeCategory} Category
              </div>
            </div>
          </div>

          <div className="shrink-0 flex gap-4">
             <button className="px-6 py-3 bg-bg-secondary border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-secondary hover:border-primary/30 transition-all flex items-center gap-2">
                <Search className="w-4 h-4" /> Index View
             </button>
             <button className="px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Full Database
             </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="space-y-8">
            <div>
               {/* Segment Control Info & Slider Bar */}
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-secondary dark:bg-zinc-900 border border-border dark:border-zinc-800 p-5 rounded-[2.2rem] mb-8 shadow-sm">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-primary rounded-full animate-ping shrink-0" />
                   <span className="text-xs font-black uppercase tracking-widest text-text-primary">
                     Segment {currentSlide + 1} of {totalSlides} (Showing §{visibleIds[0] || 0} - §{visibleIds[visibleIds.length - 1] || 0})
                   </span>
                 </div>
                 
                 <div className="flex items-center gap-2">
                   <button
                     type="button"
                     disabled={currentSlide === 0}
                     onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                     className="px-4 py-2 bg-bg-primary dark:bg-zinc-800 hover:border-primary border border-border dark:border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-30"
                   >
                     &larr; Prev
                   </button>
                   
                   <div className="flex items-center gap-1.5 px-3">
                     {Array.from({ length: totalSlides }, (_, idx) => (
                       <button
                         key={idx}
                         type="button"
                         onClick={() => setActiveSlide(idx)}
                         className={`w-3.5 h-3.5 rounded-full transition-all border ${
                           currentSlide === idx 
                             ? 'bg-primary border-primary scale-125 shadow-sm shadow-primary/30' 
                             : 'bg-bg-primary dark:bg-zinc-800 border-border dark:border-zinc-700 hover:border-primary/50'
                         }`}
                         title={`Segment ${idx + 1}`}
                       />
                     ))}
                   </div>

                   <button
                     type="button"
                     disabled={currentSlide >= totalSlides - 1}
                     onClick={() => setActiveSlide(prev => Math.min(totalSlides - 1, prev + 1))}
                     className="px-4 py-2 bg-bg-primary dark:bg-zinc-800 hover:border-primary border border-border dark:border-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-30"
                   >
                     Next &rarr;
                   </button>
                 </div>
               </div>

               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-8 opacity-60 italic flex items-center gap-3">
                 <span className="w-12 h-px bg-border dark:bg-zinc-800" /> 
                 Cognitive Grid Navigation
               </h4>

               <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 xl:grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-3">
                  {visibleIds.map(id => {
                    const data = organonData.find(a => a.id === id);
                    const isSelected = selectedId === id;
                    const hasData = !!data;

                    return (
                      <button
                        key={id}
                        id={`aphorism-grid-${id}`}
                        onClick={() => {
                          setSelectedId(isSelected ? null : id);
                          if (!isSelected) {
                            setTimeout(() => {
                              const element = document.getElementById('active-aphorism-content');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }, 150);
                          }
                        }}
                        className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all border shadow-sm ${
                          isSelected 
                          ? 'bg-primary text-white border-primary scale-125 z-10 shadow-2xl shadow-primary/40 font-bold' 
                          : hasData 
                            ? 'bg-[#ecfdf5] dark:bg-[#064e3b]/30 text-[#047857] dark:text-[#34d399] border-[#a7f3d0] dark:border-[#065f46]/50 hover:bg-[#d1fae5] hover:border-[#34d399] hover:-translate-y-1' 
                            : 'bg-bg-secondary/50 text-text-secondary/20 border-border/50'
                        }`}
                        title={`Aphorism §${id}${data ? `: ${data.category}` : ''}`}
                      >
                        {id}
                      </button>
                    );
                  })}
               </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedId && (
                <motion.div
                  key={selectedId}
                  id="active-aphorism-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="p-12 md:p-16 bg-white dark:bg-bg-secondary rounded-[4rem] border border-primary/20 shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden mt-6"
                >
                  <div className="absolute top-0 right-0 p-12 text-[15rem] font-black text-primary/5 italic pointer-events-none leading-none select-none" style={{ lineHeight: '0.8' }}>
                    §{selectedId}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                       <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest italic border border-primary/20">
                         {organonData.find(a => a.id === selectedId)?.category || "Subject"} Principle
                       </span>
                       <div className="w-1.5 h-1.5 bg-border rounded-full" />
                       <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                         Logical Node §{selectedId}
                       </span>
                    </div>
                    
                    {organonData.find(a => a.id === selectedId) ? (
                      <ProfessorMasterclassPanel 
                        id={selectedId} 
                        onNavigateToAphorism={(relId) => scrollToAphorism(relId)} 
                      />
                    ) : (
                      <div className="space-y-8">
                        <h4 className="text-4xl font-display font-black text-text-primary italic tracking-tight">Logical mapping pending.</h4>
                        <p className="text-xl text-text-secondary leading-relaxed max-w-2xl font-medium italic opacity-70">
                          Aphorism §{selectedId} belongs to the {activeCategory !== 'All' ? activeCategory : "doctrinal"} section. 
                          Our research team is currently digitizing the complete cross-references for this node.
                        </p>
                        <div className="flex gap-4">
                           <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                           <div className="w-3 h-3 bg-primary/40 rounded-full animate-pulse delay-75" />
                           <div className="w-3 h-3 bg-primary/20 rounded-full animate-pulse delay-150" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-8">
             {filteredData.length > 0 ? (
               filteredData.map(aphorism => (
                 <div key={aphorism.id} id={`aphorism-${aphorism.id}`}>
                   <AphorismItem 
                     aphorism={aphorism} 
                     isOpen={selectedId === aphorism.id}
                     onToggle={() => setSelectedId(selectedId === aphorism.id ? null : aphorism.id)}
                   />
                 </div>
               ))
             ) : (
               <div className="p-32 text-center bg-bg-secondary/50 rounded-[4rem] border border-dashed border-border mt-12 opacity-80">
                  <div className="w-24 h-24 bg-bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Search className="w-8 h-8 text-text-tertiary opacity-30" />
                  </div>
                  <p className="text-sm text-text-secondary font-black uppercase tracking-[0.3em] opacity-60">No logical nodes found in {activeCategory} archives.</p>
               </div>
             )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12">
        <div className="p-8 bg-primary/5 rounded-[3rem] border border-primary/10">
           <h4 className="flex items-center gap-3 text-lg font-bold mb-4">
              <Info className="w-5 h-5 text-primary" />
              The Logic of the Grid
           </h4>
           <div className="space-y-3">
              {[
                { r: "§1-70", l: "Doctrinal part: Vital force, Law of Similia." },
                { r: "§71-291", l: "Practical part: Case taking, proving, administration." },
                { r: "§292-294", l: "Auxiliary: Mesmerism and dietetics." }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-medium">
                   <span className="font-black text-primary uppercase tracking-tighter">{item.r}</span>
                   <span className="text-text-secondary italic">{item.l}</span>
                </div>
              ))}
           </div>
        </div>
        
        <div className="p-8 bg-zinc-900 rounded-[3rem] text-white">
           <h4 className="flex items-center gap-3 text-lg font-bold mb-4">
              <Sparkles className="w-5 h-5 text-primary-light" />
              6th Edition Discovery
           </h4>
           <p className="text-sm text-white/60 leading-relaxed italic">
              "In the new edition, the treatment of chronic diseases is brought to such perfection that they can be cured with almost certain success." — Hahnemann, 1842.
           </p>
        </div>
      </div>
    </div>
  );
};

const PrefaceSection = () => {
  const [selectedPrefaceId, setSelectedPrefaceId] = useState(prefacesData[prefacesData.length - 1].id); // Default to 6th Edition Preface
  const currentPreface = prefacesData.find(p => p.id === selectedPrefaceId) || prefacesData[prefacesData.length - 1];

  return (
    <div className="space-y-12">
      {/* Selector pills */}
      <div className="flex flex-wrap gap-2 p-3 bg-bg-secondary rounded-[2.5rem] border border-border shadow-soft">
        {prefacesData.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPrefaceId(p.id)}
            className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              selectedPrefaceId === p.id 
                ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                : 'text-text-secondary hover:bg-bg-primary hover:text-primary hover:-translate-y-0.5'
            }`}
          >
            {p.title === "Translator's Preface" ? "Translator's" : p.title.replace("Preface to the ", "")}
          </button>
        ))}
      </div>

      <section className="bg-bg-secondary p-10 md:p-16 rounded-[4rem] border border-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
           <Quote className="w-64 h-64" />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">{currentPreface.title}</span>
            </div>
            <div className="text-[10px] text-text-tertiary font-black uppercase tracking-widest italic">
              {currentPreface.author} &bull; {currentPreface.date}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary italic leading-tight">
             Historical Document Verbatim
          </h2>

          <div className="p-8 bg-bg-primary rounded-3xl border border-border border-l-4 border-l-primary/60 italic font-serif text-lg leading-relaxed text-text-secondary">
             "{currentPreface.keyTakeaway}"
          </div>
          
          <div className="prose prose-lg max-w-none text-text-secondary leading-loose space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
            {currentPreface.content.map((para, idx) => (
              <p key={idx} className="font-serif italic text-base leading-relaxed text-text-secondary text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ChronologySection = () => {
  const editions = [
    { 
      year: "1810", 
      title: "1st Edition", 
      location: "Dresden/Leipzig", 
      aph: "271 Aphorisms",
      detail: "The birth of Homeopathy. Introduced the title 'Organon of the Rational Art of Healing'. Focused on Similia and proving.",
      icon: <Layers className="w-5 h-5" />
    },
    { 
      year: "1819", 
      title: "2nd Edition", 
      location: "Leipzig", 
      aph: "318 Aphorisms",
      detail: "Title changed to 'Organon of Medicine'. Vital force is introduced as a concept. Strong criticism of Allopathy.",
      icon: <Activity className="w-5 h-5" />
    },
    { 
      year: "1824", 
      title: "3rd Edition", 
      location: "Köthen", 
      aph: "320 Aphorisms",
      detail: "Refinement of clinical methods. Emphasized the spiritual nature of disease more explicitly.",
      icon: <Database className="w-5 h-5" />
    },
    { 
      year: "1829", 
      title: "4th Edition", 
      location: "Köthen", 
      aph: "292 Aphorisms",
      detail: "The 'Miasmatic' edition. Introduced the theory of Chronic Diseases (Psora, Sycosis, Syphilis).",
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />
    },
    { 
      year: "1833", 
      title: "5th Edition", 
      location: "Köthen", 
      aph: "294 Aphorisms",
      detail: "Final edition published by Hahnemann. Introduced the Vital Force and Doctrine of Drug Dynamization (Centesimal scale).",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    { 
      year: "1921", 
      title: "6th Edition", 
      location: "Paris / Seattle", 
      aph: "291 Aphorisms",
      detail: "The 'Posthumous' perfection. Published by Richard Haehl. Introduced the LM Scale and liquid dosing. The ultimate version.",
      icon: <Award className="w-5 h-5 text-primary" />
    }
  ];

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {editions.map((ed, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-bg-secondary rounded-[3rem] border border-border group hover:border-primary/40 hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-bg-primary border border-border rounded-2xl shadow-sm text-primary">
                  {ed.icon}
                </div>
                <span className="text-2xl font-black text-text-primary italic group-hover:text-primary transition-colors">{ed.year}</span>
              </div>
              
              <h4 className="text-xl font-bold text-text-primary mb-2 italic">{ed.title}</h4>
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-[9px] font-black uppercase tracking-widest text-primary italic bg-primary/10 border border-primary/20 px-2 rounded-full">{ed.location}</span>
                 <div className="w-1 h-1 rounded-full bg-border" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-[#15803d] dark:text-[#a7f3d0] bg-[#dcfce7] dark:bg-[#064e3b]/50 px-2.5 py-0.5 rounded-full border border-[#bbf7d0] dark:border-[#064e3b]">{ed.aph}</span>
              </div>
              
              <p className="text-sm text-text-secondary leading-relaxed font-serif italic line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                {ed.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-12 bg-[#0F3D75] dark:bg-[#0B0F19] text-white rounded-[4rem] text-center border-t-8 border-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
         <h4 className="text-2xl font-display font-black uppercase italic mb-4 relative z-10">The Gap of Silence</h4>
         <p className="text-white/60 max-w-3xl mx-auto italic leading-relaxed relative z-10">
           The 6th edition remained hidden with Melanie Hahnemann and later her descendants for nearly 80 years before finally being released to the world in 1921 by William Boericke and Richard Haehl.
         </p>
         <ArrowRight className="w-8 h-8 text-primary mx-auto mt-8 animate-bounce relative z-10" />
      </div>
    </div>
  );
};

const OrganonMedicine = () => {
  const [activePart, setActivePart] = useState(0);
  const [showSarkarStudy, setShowSarkarStudy] = useState(false);

  const parts = [
    {
      title: "Philosophy",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-20">
          <section className="bg-primary/5 p-8 md:p-12 rounded-[4rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none animate-pulse">
               <Sparkles className="w-48 h-48" />
            </div>
            <h2 className="text-4xl font-black text-text-primary mb-6 italic">The <span className="text-primary italic">Soul</span> of Homeopathy</h2>
            <p className="text-xl text-text-secondary italic border-l-4 border-primary pl-8 py-4 mb-8 leading-relaxed max-w-2xl">
              "Homeopathy; Not a theory of disease, but theory of cure" — Stuart Close.
            </p>
            <div className="prose prose-lg max-w-none text-text-secondary leading-loose">
              <p>
                Organon of Medicine is more than a book; it is a fundamental scientific treatise written by Samuel Hahnemann. 
                It contains the guiding principles, the logic, and the practical application of the Law of Similars. 
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 mb-4">
                <div className="p-8 bg-bg-primary rounded-[3rem] border border-border shadow-soft text-center group hover:scale-105 transition-all">
                  <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Similia</div>
                  <div className="text-3xl font-black italic">Similibus</div>
                </div>
                <div className="text-4xl font-black text-primary italic">Curantur</div>
                <p className="w-full text-center text-xs font-bold uppercase tracking-widest opacity-40 mt-4 italic">"Let likes be treated with likes"</p>
              </div>
            </div>
          </section>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-10 bg-bg-secondary rounded-[3rem] border border-border shadow-soft">
                <h3 className="text-2xl font-black italic text-text-primary flex items-center gap-3 mb-8">
                   <Award className="w-6 h-6 text-primary" />
                   Core Tenets
                </h3>
                <ul className="space-y-8">
                   {[
                     { t: "Similia Similibus Curantur", d: "Let likes be treated by likes. Nature's law of similar cure." },
                     { t: "The Law of Simplex", d: "Administration of one single, pure medicinal substance at a time." },
                     { t: "The Law of Minimum", d: "The smallest dose needed to effect the vital reaction, not more." },
                     { t: "Doctrine of Drug Proving", d: "Observation of medicinal effects on healthy human beings." }
                   ].map((tenet, i) => (
                     <li key={i} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-2xl bg-primary/20 shrink-0 flex items-center justify-center text-primary font-black italic group-hover:bg-primary group-hover:text-white transition-all">
                           {i + 1}
                        </div>
                        <div>
                           <div className="font-black text-sm uppercase tracking-tight text-text-primary mb-1 group-hover:text-primary transition-colors">{tenet.t}</div>
                           <div className="text-sm text-text-secondary font-medium italic opacity-80">{tenet.d}</div>
                        </div>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="p-10 bg-zinc-900 rounded-[3rem] text-white overflow-hidden relative shadow-soft">
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                   <Book className="w-48 h-48" />
                </div>
                <h3 className="text-2xl font-black italic text-white flex items-center gap-3 mb-8 relative z-10">
                   <Award className="w-6 h-6 text-primary-light" />
                   6th Ed. Perfection
                </h3>
                <p className="text-white/60 leading-relaxed mb-8 italic relative z-10">
                   "This edition teaches that the doses can be prepared so delicate that they will not cause any primary actions of the medicines, and yet their curative action will be more rapid than that of the coarser doses of the previous editions."
                </p>
                <div className="space-y-4 relative z-10">
                   {['Dynamization (Potentization)', 'LM Potencies (0/1 to 0/30)', 'The Healing Dynamis', 'Systematic Case Registration'].map((f, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 group hover:bg-primary hover:border-primary transition-all cursor-default">
                        <User className="w-4 h-4 text-primary-light group-hover:text-white" />
                        <span className="text-xs font-black uppercase tracking-widest">{f}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Sarkar's Critical Study Panel Toggle */}
          <div className="bg-bg-secondary p-10 md:p-16 rounded-[4rem] border border-border relative overflow-hidden group shadow-soft">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Globe className="w-64 h-64" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Academic Appendix</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-black text-text-primary italic leading-none">
                Sarkar's Critical Commentary: <br />
                <span className="text-primary not-italic uppercase tracking-widest text-xl md:text-2xl block mt-2">Evolution of Western Therapeutics</span>
              </h3>
              <p className="text-lg text-text-secondary font-medium leading-relaxed italic max-w-3xl">
                Hahnemann's clinical methodology was not born in a vacuum. It represents the pinnacle of Lord Bacon's Inductive Logic applied to biology. Revisit the historical conflict between Dogmatists, Empirics, and Methodists.
              </p>
              
              <button 
                onClick={() => setShowSarkarStudy(!showSarkarStudy)}
                className="px-8 py-4 bg-primary text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                {showSarkarStudy ? "Collapse Study" : "Explore Full Historical Study"}
                <ChevronRight className={`w-4 h-4 transition-transform ${showSarkarStudy ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {showSarkarStudy && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-8 border-t border-border mt-8 space-y-12"
                  >
                    {westernPhilosophyData.sections.map((sec, i) => (
                      <div key={i} className="space-y-6">
                        <h4 className="text-2xl font-display font-black text-primary italic border-l-4 border-primary pl-6 py-2">
                          {sec.heading}
                        </h4>
                        <div className="space-y-4">
                          {sec.paragraphs.map((p, idx) => (
                            <p key={idx} className="font-serif italic text-base leading-relaxed text-text-secondary text-justify">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Preface",
      icon: <Book className="w-5 h-5" />,
      content: <PrefaceSection />
    },
    {
      title: "Chronology",
      icon: <History className="w-5 h-5" />,
      content: <ChronologySection />
    },
    {
      title: "Architecture",
      icon: <Network className="w-5 h-5" />,
      content: <AphorismTree />
    },
    {
       title: "Stalwarts",
       icon: <User className="w-5 h-5" />,
       content: (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                n: 'Samuel Hahnemann', 
                r: 'Founder / The Master', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Samuel_Hahnemann_portrait.jpg/440px-Samuel_Hahnemann_portrait.jpg',
                bio: 'Author of Organon of Medicine and Chronic Diseases. Discovered Similia principle in 1790. His 6th edition refined the global practice.'
              },
              { 
                n: 'James Tyler Kent', 
                r: 'Repertorial Giant', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/James_Tyler_Kent.jpg/440px-James_Tyler_Kent.jpg',
                bio: 'Proposed the hierarchy of symptoms: Mental, Physico-General, and Particulars. His philosophy is the bedrock of modern study.'
              },
              { 
                n: 'C.v. Boenninghausen', 
                r: 'Pioneer of Logic', 
                img: 'https://homeopathyresource.org/wp-content/uploads/2021/04/C-v-Boenninghausen.jpg',
                bio: 'Hahnemann\'s closest disciple. Developed the concept of the Complete Symptom and the logic of Analogy.'
              },
              { 
                n: 'Constantine Hering', 
                r: 'Father of US Homeopathy', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Constantine_Hering.jpg/440px-Constantine_Hering.jpg',
                bio: 'Introduced Homeopathy to America. Discovered Hering\'s Law of Cure and proved Lachesis at great personal risk.'
              },
              { 
                n: 'C.M. Boger', 
                r: 'Clinical Precision', 
                img: 'https://homeopathyresource.org/wp-content/uploads/2021/04/C-M-Boger.jpg',
                bio: 'Synthesized Boenninghausen\'s logic with Kent\'s clinical observations. Emphasized the "Pathological General".'
              },
              { 
                n: 'H.C. Allen', 
                r: 'Keynotes Master', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Henry_Charles_Allen.jpg',
                bio: 'His "Keynotes of Materia Medica" is indispensable for quick, accurate prescribing based on mental and physical cues.'
              },
              { 
                n: 'Richard Haehl', 
                r: 'The 6th Ed. Savior', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Richard_Haehl.jpg/440px-Richard_Haehl.jpg',
                bio: 'Biographer of Hahnemann. He and William Boericke were responsible for finally bringing the 6th edition to light.'
              },
              { 
                n: 'E.A. Farrington', 
                r: 'Comparative MM', 
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ernest_Albert_Farrington.jpg/440px-Ernest_Albert_Farrington.jpg',
                bio: 'Authored "Clinical Materia Medica", one of the best studies for comparing drug families and their unique actions.'
              }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-bg-secondary rounded-[3rem] border border-border p-3 overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all"
              >
                 <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 relative shadow-inner">
                    <img 
                      src={s.img} 
                      alt={s.n} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                       <h4 className="text-xl font-display font-black text-white italic tracking-tight mb-1">{s.n}</h4>
                       <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{s.r}</p>
                    </div>
                 </div>
                 <div className="px-5 pb-5">
                    <p className="text-xs text-text-secondary font-medium leading-relaxed italic opacity-80">
                       {s.bio}
                    </p>
                 </div>
              </motion.div>
            ))}
         </div>
       )
    }
  ];

  return (
    <div className="bg-bg-primary min-h-screen pb-20 selection:bg-primary/20 selection:text-primary">
      <Helmet>
        <title>Philosophy & Organon | Systematic Study Guide | Curiva</title>
        <meta name="description" content="A scientific study of Hahnemann's Organon: architectural study of aphorisms and historical context." />
      </Helmet>

      {/* Modern Hero */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden bg-[#0F3D75] dark:bg-[#0B0F19] text-white">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-radial from-primary/10 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <Book className="w-96 h-96 text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mx-auto">
               <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light">Core Philosophy</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter leading-[0.8] uppercase flex flex-col items-center">
              <span>Organon</span>
              <span className="text-primary italic lg:ml-24 -mt-4 opacity-100">Medicine</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/60 max-w-4xl mx-auto font-medium leading-tight tracking-tight">
              Master the logic of healing through Samuel Hahnemann's definitive work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
         <div className="flex flex-wrap justify-center gap-2 p-2 bg-bg-secondary/85 backdrop-blur-xl rounded-[2.5rem] border border-border sticky top-24 z-40 shadow-xl max-w-fit mx-auto">
            {parts.map((p, i) => {
              const isActive = activePart === i;
              return (
                <button
                  key={i}
                  onClick={() => setActivePart(i)}
                  className={`relative px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 outline-none cursor-pointer ${
                    isActive 
                    ? 'text-white font-black' 
                    : 'text-text-secondary hover:text-primary font-bold'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSubTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/20 z-0"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5">
                    {p.icon}
                    {p.title}
                  </span>
                </button>
              );
            })}
         </div>
      </section>

      {/* Dynamic Content */}
      <section className="max-w-7xl mx-auto px-4">
         <AnimatePresence mode="wait">
            <motion.div
              key={activePart}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
               {parts[activePart].content}
            </motion.div>
         </AnimatePresence>
      </section>
      
      {/* Visual Quote */}
      <section className="max-w-5xl mx-auto px-4 mt-40">
         <div className="p-20 rounded-[5rem] bg-[#0F3D75] dark:bg-[#0B0F19] text-white text-center relative overflow-hidden group">
            <Quote className="absolute top-10 left-10 w-40 h-40 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 space-y-8">
               <h3 className="text-4xl font-display font-black italic tracking-tight leading-tight">
                 "The truth we mortals need... <br/>The all-wise slightly covered over, <br/>but did not bury deep."
               </h3>
               <div className="w-20 h-1 bg-primary mx-auto" />
               <p className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Dr. Samuel Hahnemann</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default OrganonMedicine;
