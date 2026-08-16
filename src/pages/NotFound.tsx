import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Home, Search, ArrowLeft, GraduationCap, BookOpen, Activity, Sparkles, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickPortals = [
    { title: 'BHMS Student Resources', path: '/student-resources', icon: GraduationCap, desc: 'Syllabus, PYQs, Flashcards, and Viva notes' },
    { title: 'Materia Medica', path: '/materia-medica', icon: BookOpen, desc: 'Keynotes & drug proving reference books' },
    { title: 'Anatomy Library', path: '/anatomy', desc: '1st BHMS Anatomy notes & clinical correlations', icon: Activity },
    { title: 'Physiology Library', path: '/physiology', desc: 'Systemic physiology & biochemistry modules', icon: Activity },
    { title: 'Disease Library', path: '/disease-hub', icon: Sparkles, desc: 'Diagnostic criteria & therapeutic remedies' },
    { title: 'Repertory Tool', path: '/repertory', icon: Compass, desc: 'Kent repertorization & symptom lookup' },
  ];

  return (
    <div className="min-h-[75vh] py-16 flex flex-col justify-center items-center relative overflow-hidden">
      <SEO 
        title="Page Not Found | Curiva Homoeopathy" 
        description="The page you requested could not be found. Explore Curiva Homoeopathy study resources, Materia Medica, and clinical tools."
      />
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto px-4 text-center relative z-10 space-y-8">
        
        {/* Header Icon */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
            404 / Route
          </div>
        </div>

        {/* Text Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-display font-black text-text-primary tracking-tight">
            Destination Moved or Under Preparation
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            The link you followed may have been updated or is currently being prepared by our BHMS editorial board. Use the search bar below or explore popular academic portals.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search remedies, aphorisms, anatomy, diseases..."
            className="w-full pl-12 pr-28 py-3.5 bg-bg-secondary border border-border rounded-2xl text-sm font-medium text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <Search className="w-5 h-5 text-text-tertiary absolute left-4" />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-strong transition-colors"
          >
            Search
          </button>
        </form>

        {/* Navigation Quick Grid */}
        <div className="pt-4">
          <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-4">
            Popular Educational Portals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
            {quickPortals.map((portal) => (
              <Link
                key={portal.path}
                to={portal.path}
                className="p-4 bg-bg-secondary hover:bg-bg-tertiary border border-border hover:border-primary/30 rounded-2xl transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <portal.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">
                    {portal.title}
                  </span>
                </div>
                <p className="text-[11px] text-text-tertiary leading-snug">
                  {portal.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-primary-strong transition-all shadow-md flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-bg-secondary text-text-primary border border-border text-xs font-bold rounded-xl hover:bg-bg-tertiary transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

      </div>
    </div>
  );
}
