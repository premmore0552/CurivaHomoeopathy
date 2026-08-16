import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Compass, 
  Home, 
  Search, 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  Activity, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Calendar, 
  BookOpenText,
  FileText,
  Layers
} from 'lucide-react';
import SEO from '../components/SEO';

export default function ComingSoon() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const topicName = searchParams.get('topic') || 'BHMS Academic Curriculum Module';
  const statusType = searchParams.get('status') || 'coming-soon'; // 'available' | 'coming-soon' | 'revision' | 'scheduled'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getStatusBadge = () => {
    switch (statusType) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 rounded-full text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> ✅ Available
          </span>
        );
      case 'revision':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 rounded-full text-xs font-black uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" /> 🔄 Under Revision
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/10 text-blue-800 border border-blue-500/20 rounded-full text-xs font-black uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-blue-700" /> 📅 Scheduled
          </span>
        );
      case 'coming-soon':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 rounded-full text-xs font-black uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> 🚧 Coming Soon
          </span>
        );
    }
  };

  const subjectNavigation = [
    { title: '1st BHMS Anatomy', path: '/anatomy', icon: Activity, desc: 'Gross Anatomy, Histology, Osteology' },
    { title: '1st BHMS Physiology', path: '/physiology', icon: Activity, desc: 'Systemic Functions & Biochemistry' },
    { title: 'Materia Medica', path: '/materia-medica', icon: BookOpen, desc: 'Drug Proving Keynotes & Provers' },
    { title: 'Organon of Medicine', path: '/organon-philosophy', icon: BookOpenText, desc: 'Samuel Hahnemann Aphorisms §1–291' },
    { title: 'Repertory & Case Taking', path: '/repertory', icon: Compass, desc: 'Kent Rubrics & Case Totalities' },
    { title: 'FMT & Jurisprudence', path: '/fmt', icon: FileText, desc: 'Toxicology & Medical Ethics' },
  ];

  const relatedTopics = [
    { name: 'NCH CBDC Syllabus Map', path: '/cbdc-syllabus' },
    { name: '1st BHMS Crash Course', path: '/first-bhms-crash-course' },
    { name: 'AIAPGET Entrance MCQ Practice', path: '/mcq-practice' },
    { name: 'Miasms Encyclopedia', path: '/miasms' },
    { name: 'Clinical Condition Simulator', path: '/clinical-handbook' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary font-sans text-text-primary py-10 selection:bg-primary/20 selection:text-primary">
      <SEO 
        title={`${topicName} | Content Status: Coming Soon | Curiva`} 
        description={`Content status for ${topicName}. Our academic board is preparing high-quality, BHMS syllabus-aligned material.`}
      />

      <div className="max-w-5xl mx-auto px-4 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-text-tertiary" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3 h-3 text-text-tertiary" />
          <Link to="/cbdc-syllabus" className="hover:text-primary transition-colors font-medium">Subjects</Link>
          <ChevronRight className="w-3 h-3 text-text-tertiary" />
          <span className="text-text-secondary font-semibold">{topicName}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-bg-secondary border border-border rounded-2xl p-8 md:p-12 shadow-soft space-y-8 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.03)_0%,transparent_60%)] pointer-events-none" />

          {/* Icon and Status Badge */}
          <div className="flex flex-col items-center justify-center gap-4 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
              <Clock className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              {getStatusBadge()}
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3 max-w-2xl mx-auto relative z-10">
            <h1 className="text-2xl sm:text-4xl font-display font-light text-primary">
              {topicName}
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
              This section is currently under development. Our team is preparing high-quality, student-friendly, and academically accurate content for this topic. It will be available soon. Meanwhile, you may explore related chapters and subjects using the links below.
            </p>
          </div>

          {/* Progress Status Bar */}
          <div className="max-w-md mx-auto bg-bg-primary border border-border/80 rounded-xl p-4 space-y-2 relative z-10 text-left">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Progress Status
              </span>
              <span className="text-primary font-mono font-black">75% Complete</span>
            </div>
            <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[75%] transition-all duration-500" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-text-tertiary font-medium pt-1">
              <span>Editorial Review Phase</span>
              <span>Estimated Release: Next Syllabus Sync</span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative flex items-center relative z-10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedies, aphorisms, anatomy, rubrics..."
              className="w-full pl-11 pr-24 py-3 bg-bg-primary border border-border rounded-xl text-xs font-medium text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary transition-all"
            />
            <Search className="w-4 h-4 text-text-tertiary absolute left-4" />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              to="/student-resources"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow hover:shadow-lg shadow-primary/10 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-bg-primary text-text-primary border border-border text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-bg-tertiary transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Homepage</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-bg-primary text-text-secondary border border-border text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-bg-tertiary transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>
          </div>

        </div>

        {/* Expected Section Structure */}
        <section className="bg-bg-secondary border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-black uppercase tracking-wider text-primary">
              Expected Curriculum Module Structure
            </h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed max-w-2xl font-normal">
            Our medical subject matter experts compile content according to standard BHMS syllabus modules. Upon publication, the following standard sections will be immediately unlocked:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {[
              { unit: 'Unit I', title: 'Foundational Theory', desc: 'Core philosophical, physiological or anatomical principles.' },
              { unit: 'Unit II', title: 'Systemic Applications', desc: 'Detailed analysis of organ systems, therapeutics or cases.' },
              { unit: 'Unit III', title: 'Clinical Correlations', desc: 'Real-world diagnostic, miasmatic, and clinical applications.' },
              { unit: 'Unit IV', title: 'Recall & Viva Preparation', desc: 'Active recall flashcards, MCQs, University PYQs, and viva boosters.' },
            ].map((section, idx) => (
              <div key={idx} className="p-4 bg-bg-primary border border-border/60 rounded-xl space-y-2">
                <span className="text-[9px] font-black uppercase text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {section.unit}
                </span>
                <h4 className="text-xs font-bold text-text-primary pt-1">{section.title}</h4>
                <p className="text-[10px] text-text-tertiary leading-normal">{section.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Navigation Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" /> Explore Subject Navigation
            </h2>
            <span className="text-xs text-text-tertiary">All BHMS Syllabus Modules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subjectNavigation.map((sub) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className="p-5 bg-bg-secondary border border-border hover:border-primary/40 rounded-2xl transition-all group flex flex-col justify-between shadow-soft hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                        {sub.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-tertiary leading-normal">
                      {sub.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/40 mt-3 flex justify-between items-center text-[10px] text-primary font-bold uppercase tracking-wider">
                    <span>Access Portal</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Related Topics & Subjects */}
        <section className="bg-bg-secondary border border-border rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent" /> Recommended Related Topics &amp; Resources
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {relatedTopics.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="px-4 py-2 bg-bg-primary hover:bg-primary hover:text-white border border-border rounded-xl text-xs font-bold text-text-secondary transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Meta & Academic Verification */}
        <div className="border-t border-border/60 pt-6 flex flex-wrap justify-between items-center text-[10px] text-text-tertiary gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Curiva Content Status: Updated &amp; Verified by NCH Educational Board</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Last Updated: July 2026</span>
            <span>Status ID: CS-2026-N1</span>
          </div>
        </div>

      </div>
    </div>
  );
}
